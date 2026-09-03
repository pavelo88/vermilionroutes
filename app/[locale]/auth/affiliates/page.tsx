'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { auth, db } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AtSign,
  Phone,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  getAffiliateByUsername,
  getAffiliateByEmail,
  isUsernameAvailable,
  registerAffiliateInFirestore,
  AffiliateAccount,
} from '@/lib/affiliates';
import ForcePasswordChangeModal from '@/components/auth/ForcePasswordChangeModal';

function AffiliatesAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isEs = locale === 'es';

  // Tabs: 'login' | 'register' | 'forgot'
  const initialTab = searchParams.get('tab');
  const [tab, setTab] = useState<'login' | 'register' | 'forgot'>(
    initialTab === 'register' ? 'register' : initialTab === 'forgot' ? 'forgot' : 'login'
  );

  // Login state
  const [loginEmailOrUser, setLoginEmailOrUser] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register state (Correo primero como pidió el usuario)
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regCedula, setRegCedula] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regSponsor, setRegSponsor] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Force Password Change Modal
  const [showForcePasswordModal, setShowForcePasswordModal] = useState(false);
  const [activeAffiliateId, setActiveAffiliateId] = useState('');
  const [activeUserEmail, setActiveUserEmail] = useState('');

  // Listen to Auth State
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        try {
          const aff = await getAffiliateByEmail(user.email);
          if (aff && aff.forcePasswordChange) {
            setActiveAffiliateId(aff.id);
            setActiveUserEmail(user.email);
            setShowForcePasswordModal(true);
          } else if (aff) {
            router.replace(`/${locale}/affiliates/dashboard`);
          }
        } catch {}
      }
    });
    return () => unsubscribe();
  }, [locale, router]);

  // Auto-suggest username when user types email (so no popup interrupts before email is added)
  const handleEmailChange = (val: string) => {
    setRegEmail(val);
    if (!regUsername && val.includes('@')) {
      const suggested = val.split('@')[0].toLowerCase().replace(/[^a-z0-9._-]/g, '');
      setRegUsername(suggested);
      checkUsername(suggested);
    }
  };

  const checkUsername = async (u: string) => {
    if (u.length < 3) {
      setUsernameStatus('idle');
      return;
    }
    setUsernameStatus('checking');
    try {
      const avail = await isUsernameAvailable(u);
      setUsernameStatus(avail ? 'available' : 'taken');
    } catch {
      setUsernameStatus('idle');
    }
  };

  // ── 1. LOGIN HANDLER ──────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginEmailOrUser || !loginPassword) {
      setErrorMsg(isEs ? 'Ingresa tu correo (o usuario) y contraseña.' : 'Please enter your email/username and password.');
      return;
    }

    setLoading(true);

    try {
      let targetEmail = loginEmailOrUser.trim().toLowerCase();
      let foundAffiliate: AffiliateAccount | null = null;

      // Si no es un correo con @, buscamos el correo por nombre de usuario
      if (!targetEmail.includes('@')) {
        foundAffiliate = await getAffiliateByUsername(targetEmail);
        if (!foundAffiliate || !foundAffiliate.email) {
          throw new Error(isEs ? `No encontramos ningún embajador con el usuario @${targetEmail}` : `User @${targetEmail} not found`);
        }
        targetEmail = foundAffiliate.email;
      }

      if (auth) {
        try {
          await setPersistence(auth, browserLocalPersistence);
        } catch {}
        await signInWithEmailAndPassword(auth, targetEmail, loginPassword.trim());
      }

      // Buscar perfil de afiliado
      let attempts = 0;
      while (attempts < 3) {
        if (!foundAffiliate) {
          foundAffiliate = await getAffiliateByEmail(targetEmail);
        }
        if (foundAffiliate) break;
        attempts++;
        if (attempts < 3) await new Promise(r => setTimeout(r, 600));
      }

      // Si requiere primer cambio de clave
      if (foundAffiliate && foundAffiliate.forcePasswordChange) {
        setActiveAffiliateId(foundAffiliate.id);
        setActiveUserEmail(targetEmail);
        setShowForcePasswordModal(true);
        setLoading(false);
        return;
      }

      localStorage.setItem('vr_affiliate_user', targetEmail);
      router.push(`/${locale}/affiliates/dashboard`);
    } catch (err: any) {
      console.error('[Login Error]', err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setErrorMsg(isEs ? 'Contraseña o cédula incorrecta. Si es tu 1er ingreso, tu clave es tu cédula.' : 'Incorrect credentials.');
      } else if (err.code === 'auth/user-not-found') {
        setErrorMsg(isEs ? 'No existe una cuenta registrada con este correo.' : 'No account found with this email.');
      } else {
        setErrorMsg(err.message || (isEs ? 'Error al iniciar sesión.' : 'Error signing in.'));
      }
    } finally {
      setLoading(false);
    }
  };

  // ── 2. REGISTER HANDLER ───────────────────────────────────────────────────
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!regFullName || !regEmail || !regUsername || !regCedula) {
      setErrorMsg(isEs ? 'Por favor completa todos los campos requeridos.' : 'Please fill all required fields.');
      return;
    }

    if (regCedula.trim().length < 6) {
      setErrorMsg(isEs ? 'La cédula/pasaporte debe tener al menos 6 dígitos.' : 'ID must be at least 6 digits.');
      return;
    }

    if (usernameStatus === 'taken') {
      setErrorMsg(isEs ? 'El usuario elegido ya está en uso. Por favor elige otro.' : 'Username already taken.');
      return;
    }

    setLoading(true);

    try {
      let authUid = '';
      const cleanEmail = regEmail.trim().toLowerCase();
      const cleanCedula = regCedula.trim();

      if (auth) {
        try {
          const userCred = await createUserWithEmailAndPassword(auth, cleanEmail, cleanCedula);
          authUid = userCred.user.uid;

          // Enviar correo de verificación (sin desloguear!)
          try {
            await sendEmailVerification(userCred.user);
          } catch (mErr) {
            console.warn('Notice sending verification email:', mErr);
          }
        } catch (authErr: any) {
          if (authErr.code === 'auth/email-already-in-use') {
            console.warn('Email already in Firebase Auth, linking profile...');
          } else {
            throw authErr;
          }
        }
      }

      // Guardar en Firestore con forcePasswordChange: true
      const newAff = await registerAffiliateInFirestore({
        username: regUsername.trim().toLowerCase(),
        email: cleanEmail,
        cedula: cleanCedula,
        name: regFullName.trim(),
        phone: regPhone.trim(),
        sponsorUsername: regSponsor.trim() || undefined,
        authUid,
      });

      setSuccessMsg(
        isEs
          ? '¡Cuenta creada! Tu sesión está activa. Ahora define tu contraseña definitiva.'
          : 'Account created! Please set your definitive password now.'
      );

      // Abrir modal de definición de contraseña definitiva con sesión activa
      setActiveAffiliateId(newAff.id);
      setActiveUserEmail(cleanEmail);
      setTimeout(() => {
        setShowForcePasswordModal(true);
      }, 500);

    } catch (err: any) {
      console.error('[Register Error]', err);
      setErrorMsg(err.message || (isEs ? 'Error al crear la cuenta.' : 'Error creating account.'));
    } finally {
      setLoading(false);
    }
  };

  // ── 3. FORGOT PASSWORD HANDLER ────────────────────────────────────────────
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!forgotEmail) {
      setErrorMsg(isEs ? 'Ingresa tu correo electrónico registrado.' : 'Please enter your registered email.');
      return;
    }

    setLoading(true);
    try {
      let targetEmail = forgotEmail.trim().toLowerCase();
      if (!targetEmail.includes('@')) {
        const found = await getAffiliateByUsername(targetEmail);
        if (found && found.email) targetEmail = found.email;
      }

      if (auth) {
        await sendPasswordResetEmail(auth, targetEmail);
      }

      setSuccessMsg(
        isEs
          ? `Enviamos un enlace de recuperación a ${targetEmail}. Revisa tu bandeja de entrada o spam.`
          : `Password reset link sent to ${targetEmail}. Check your inbox or spam.`
      );
    } catch (err: any) {
      console.error('[Reset Error]', err);
      setErrorMsg(err.message || (isEs ? 'Error al enviar correo de recuperación.' : 'Error sending reset email.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07110B] text-zinc-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Top Header */}
      <header className="p-6 flex items-center justify-between max-w-6xl mx-auto w-full z-10">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/10">
            <div className="w-full h-full bg-[#07130C] rounded-[14px] flex items-center justify-center">
              <Image src="/icon.png" alt="Vermilion" width={24} height={24} className="object-contain" />
            </div>
          </div>
          <div>
            <span className="font-serif text-lg font-bold tracking-tight text-white block">
              VERMILION <span className="text-[#C9A84C] font-normal">{isEs ? 'EMBAJADORES' : 'AMBASSADORS'}</span>
            </span>
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">
              {isEs ? 'Portal Oficial de Afiliación & Ventas' : 'Official Affiliate & Sales Portal'}
            </span>
          </div>
        </Link>

        <Link
          href={`/${locale}`}
          className="text-xs text-zinc-400 hover:text-amber-400 transition-colors uppercase tracking-wider font-semibold"
        >
          {isEs ? '← Volver al Sitio' : '← Back to Website'}
        </Link>
      </header>

      {/* Main Card */}
      <main className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-md bg-[#0B1A12]/80 backdrop-blur-2xl border border-[#1B3C28] rounded-[32px] p-8 sm:p-10 shadow-2xl shadow-emerald-950/60 space-y-6">
          
          {/* Brand Icon Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto p-2.5 shadow-lg shadow-amber-500/10">
              <Image src="/icon.png" alt="Vermilion Icon" width={36} height={36} className="object-contain" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-white tracking-tight">
              {tab === 'login' && (isEs ? 'Acceso de Embajadores' : 'Ambassador Sign In')}
              {tab === 'register' && (isEs ? 'Únete como Embajador' : 'Become an Ambassador')}
              {tab === 'forgot' && (isEs ? 'Recuperar Contraseña' : 'Reset Password')}
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {tab === 'login' && (isEs ? 'Ingresa tus credenciales para acceder a tu panel y comisiones.' : 'Sign in to access your commission dashboard.')}
              {tab === 'register' && (isEs ? 'Sin contraseña inicial. Tu cédula será tu clave temporal.' : 'Your national ID will be your temporary password.')}
              {tab === 'forgot' && (isEs ? 'Te enviaremos un enlace seguro a tu correo verificado.' : 'We will send a reset link to your verified email.')}
            </p>
          </div>

          {/* Tab Selector Buttons */}
          {tab !== 'forgot' && (
            <div className="flex rounded-2xl bg-black/40 p-1 border border-zinc-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => { setTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex-1 py-2.5 rounded-xl transition-all ${
                  tab === 'login'
                    ? 'bg-amber-500 text-black shadow-md font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {isEs ? 'Iniciar Sesión' : 'Sign In'}
              </button>
              <button
                type="button"
                onClick={() => { setTab('register'); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex-1 py-2.5 rounded-xl transition-all ${
                  tab === 'register'
                    ? 'bg-amber-500 text-black shadow-md font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {isEs ? 'Crear Cuenta' : 'Register'}
              </button>
            </div>
          )}

          {/* Feedback messages */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-600/40 text-rose-300 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-600/40 text-emerald-300 text-xs flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ── TAB 1: LOGIN FORM ────────────────────────────────────────── */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isEs ? 'Correo Electrónico (o Usuario) *' : 'Email or Username *'}</span>
                </label>
                <input
                  type="text"
                  required
                  value={loginEmailOrUser}
                  onChange={(e) => setLoginEmailOrUser(e.target.value)}
                  placeholder="ej: pablofgarciaf@gmail.com o pablo.g"
                  className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isEs ? 'Contraseña o Cédula *' : 'Password or ID *'}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => { setTab('forgot'); setErrorMsg(''); setSuccessMsg(''); }}
                    className="text-[11px] text-amber-400/80 hover:text-amber-300 underline"
                  >
                    {isEs ? '¿Olvidaste tu contraseña?' : 'Forgot password?'}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder={isEs ? 'Tu contraseña (o cédula si es tu 1er ingreso)' : 'Password or national ID'}
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[10px] text-zinc-500 block">
                  {isEs ? '💡 Nota: Si aún no has cambiado tu contraseña, tu clave de acceso es tu Cédula.' : '💡 If first login, use your national ID.'}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase tracking-wider text-xs shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isEs ? 'Entrar a mi Panel' : 'Access Dashboard'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ── TAB 2: REGISTER FORM (Correo reemplaza y va primero) ─────── */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
              {/* 1. Nombre Completo */}
              <div className="space-y-1">
                <label className="font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isEs ? 'Nombre Completo *' : 'Full Name *'}</span>
                </label>
                <input
                  type="text"
                  required
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="ej: Pablo Fabricio García Flores"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* 2. Correo Electrónico (PRIMERO antes del usuario para evitar ventanas prematuras) */}
              <div className="space-y-1">
                <label className="font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isEs ? 'Correo Electrónico *' : 'Email Address *'}</span>
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="ej: tu_correo@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* 3. Usuario Único */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                    <AtSign className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isEs ? 'Usuario Único (enlace público) *' : 'Unique Username *'}</span>
                  </label>
                  {usernameStatus === 'checking' && <span className="text-[10px] text-zinc-500">Comprobando...</span>}
                  {usernameStatus === 'available' && <span className="text-[10px] text-emerald-400 font-bold">✓ Disponible</span>}
                  {usernameStatus === 'taken' && <span className="text-[10px] text-rose-400 font-bold">✕ En uso</span>}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-mono">@</span>
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={(e) => {
                      const val = e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, '');
                      setRegUsername(val);
                      checkUsername(val);
                    }}
                    placeholder="pablo.g"
                    className="w-full pl-8 pr-3.5 py-2.5 bg-black/40 border border-zinc-700 rounded-xl text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* 4. Cédula + Teléfono */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-300 uppercase tracking-wider block">
                    {isEs ? 'Cédula / Pasaporte *' : 'ID / Passport *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={regCedula}
                    onChange={(e) => setRegCedula(e.target.value)}
                    placeholder="172179..."
                    className="w-full px-3 py-2.5 bg-black/40 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-300 uppercase tracking-wider block">
                    {isEs ? 'WhatsApp / Teléfono' : 'Phone'}
                  </label>
                  <input
                    type="text"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+593 99..."
                    className="w-full px-3 py-2.5 bg-black/40 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* 5. Patrocinador */}
              <div className="space-y-1">
                <label className="font-bold text-zinc-400 uppercase tracking-wider block">
                  {isEs ? 'Patrocinador (Opcional)' : 'Sponsor (Optional)'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 font-mono">@</span>
                  <input
                    type="text"
                    value={regSponsor}
                    onChange={(e) => setRegSponsor(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
                    placeholder="pablo.g"
                    className="w-full pl-8 pr-3.5 py-2 bg-black/40 border border-zinc-800 rounded-xl text-zinc-300 font-mono placeholder:text-zinc-700 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase tracking-wider text-xs shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-3"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>{isEs ? 'CREAR MI CUENTA AHORA' : 'CREATE MY ACCOUNT'}</span>
                )}
              </button>
            </form>
          )}

          {/* ── TAB 3: FORGOT PASSWORD ───────────────────────────────────── */}
          {tab === 'forgot' && (
            <form onSubmit={handleResetPassword} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isEs ? 'Correo Electrónico Registrado *' : 'Registered Email *'}</span>
                </label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="ej: tu_correo@gmail.com"
                  className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => { setTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
                  className="text-zinc-400 hover:text-white underline"
                >
                  {isEs ? '← Volver al Login' : '← Back to Login'}
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase tracking-wider text-xs shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>{isEs ? 'Enviar Enlace' : 'Send Link'}</span>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-[10px] text-zinc-600 z-10">
        {isEs
          ? '© 2026 Vermilion Routes South America. Todos los derechos reservados.'
          : '© 2026 Vermilion Routes South America. All rights reserved.'}
      </footer>

      {/* ── MODAL DE PRIMER CAMBIO DE CLAVE (ROBUSTO CON SESIÓN ACTIVA) ── */}
      <ForcePasswordChangeModal
        isOpen={showForcePasswordModal}
        affiliateId={activeAffiliateId}
        email={activeUserEmail}
        onSuccess={() => {
          setShowForcePasswordModal(false);
          router.push(`/${locale}/affiliates/dashboard`);
        }}
      />

    </div>
  );
}

export default function AffiliatesAuthPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#07110B] flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AffiliatesAuthContent />
    </React.Suspense>
  );
}
