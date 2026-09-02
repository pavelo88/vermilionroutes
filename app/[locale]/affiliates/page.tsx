'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import {
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Percent,
  Eye,
  EyeOff,
  AtSign,
  User,
  Phone,
  Users,
  LogIn,
  UserPlus,
  Mail,
  ArrowRight,
  TrendingUp,
  Award,
} from 'lucide-react';
import {
  registerAffiliateInFirestore,
  isUsernameAvailable,
  getAffiliateByUsername,
  getAffiliateByEmail,
  AffiliateAccount,
  RATES,
} from '@/lib/affiliates';
import ForcePasswordChangeModal from '@/components/auth/ForcePasswordChangeModal';

export default function AffiliatesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isEs = locale === 'es';

  // Sponsor referral capture from URL (?vid=pablo.g, with legacy ?ref= support)
  const refFromUrl = searchParams.get('vid') || searchParams.get('ref') || '';

  // Auth mode: default to 'login' in affiliates portal
  const [authMode, setAuthMode] = useState<'register' | 'login' | 'forgot'>('login');
  const [resetIdentifier, setResetIdentifier] = useState('');
  const [loginProgressMessage, setLoginProgressMessage] = useState('');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    cedula: '',
    phone: '',
    sponsorUsername: refFromUrl,
  });

  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Force password change modal state
  const [showForcePasswordModal, setShowForcePasswordModal] = useState(false);
  const [activeAffiliateId, setActiveAffiliateId] = useState('');

  useEffect(() => {
    if (refFromUrl) {
      setForm(prev => ({ ...prev, sponsorUsername: refFromUrl }));
    }
  }, [refFromUrl]);

  // Session detection on mount
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        try {
          const aff = await getAffiliateByEmail(user.email);
          if (aff) {
            if (aff.forcePasswordChange) {
              setActiveAffiliateId(aff.id);
              setShowForcePasswordModal(true);
            } else {
              router.replace(`/${locale}/affiliates/dashboard`);
            }
          }
        } catch {
          // ignore
        }
      }
    });
    return () => unsubscribe();
  }, [locale, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const clean = name === 'username' ? value.toLowerCase().replace(/\s/g, '') : value;
    setForm(prev => ({ ...prev, [name]: clean }));
  };

  // Real-time username availability check
  let usernameTimer: ReturnType<typeof setTimeout>;
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/\s/g, '');
    setForm(prev => ({ ...prev, username: val }));
    clearTimeout(usernameTimer);
    if (val.length < 3) { setUsernameStatus('idle'); return; }
    setUsernameStatus('checking');
    usernameTimer = setTimeout(async () => {
      const available = await isUsernameAvailable(val);
      setUsernameStatus(available ? 'available' : 'taken');
    }, 400);
  };

  // ── HANDLE LOGIN ────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier || !loginPassword) {
      setErrorMsg(isEs ? 'Ingresa tu usuario/correo y contraseña.' : 'Please enter your username/email and password.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');
    setLoginProgressMessage(isEs ? '1/3 Verificando usuario...' : '1/3 Verifying user...');

    try {
      let targetEmail = loginIdentifier.trim().toLowerCase();
      let foundAffiliate: AffiliateAccount | null = null;

      // If it's a username (no @), look up their email in Firestore
      if (!targetEmail.includes('@')) {
        foundAffiliate = await getAffiliateByUsername(targetEmail);
        if (!foundAffiliate || !foundAffiliate.email) {
          throw new Error(isEs ? `No encontramos ningún usuario @${targetEmail}` : `User @${targetEmail} not found`);
        }
        targetEmail = foundAffiliate.email;
      }

      setLoginProgressMessage(isEs ? '2/3 Autenticando credenciales...' : '2/3 Authenticating credentials...');

      // Authenticate with Firebase Auth
      if (auth) {
        try {
          await setPersistence(auth, browserLocalPersistence);
        } catch (pErr) {
          console.warn('[Login] Persistence warning:', pErr);
        }
        await signInWithEmailAndPassword(auth, targetEmail, loginPassword.trim());
      }

      setLoginProgressMessage(isEs ? '3/3 Sincronizando datos de embajador...' : '3/3 Syncing ambassador profile...');

      // Triple verification delay (Energyengine pattern)
      let attempts = 0;
      const maxAttempts = 3;
      while (attempts < maxAttempts) {
        if (!foundAffiliate) {
          foundAffiliate = await getAffiliateByEmail(targetEmail);
        }
        if (foundAffiliate) break;
        attempts++;
        if (attempts < maxAttempts) {
          await new Promise((res) => setTimeout(res, 800));
        }
      }

      // Check if force password change is needed
      if (foundAffiliate && foundAffiliate.forcePasswordChange) {
        setActiveAffiliateId(foundAffiliate.id);
        setShowForcePasswordModal(true);
        setStatus('idle');
        setLoginProgressMessage('');
        return;
      }

      setStatus('success');
      setLoginProgressMessage(isEs ? '✓ ¡Acceso confirmado! Abriendo tu panel...' : '✓ Access confirmed! Opening dashboard...');
      localStorage.setItem('vr_affiliate_user', targetEmail);
      window.location.href = `/${locale}/affiliates/dashboard`;
    } catch (err: any) {
      console.error('[Login Error]', err);
      setStatus('error');
      setLoginProgressMessage('');
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setErrorMsg(isEs ? 'Contraseña o cédula incorrecta. Si es tu primer ingreso, tu clave es tu cédula.' : 'Incorrect password or ID. If first login, use your ID number.');
      } else if (err.code === 'auth/user-not-found') {
        setErrorMsg(isEs ? 'No existe una cuenta con ese correo.' : 'No account found with this email.');
      } else {
        setErrorMsg(err.message || (isEs ? 'Error al iniciar sesión.' : 'Error signing in.'));
      }
    }
  };

  // ── HANDLE FORGOT PASSWORD ──────────────────────────────────────────────────
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const idToUse = resetIdentifier.trim() || loginIdentifier.trim();
    if (!idToUse) {
      setErrorMsg(isEs ? 'Ingresa tu usuario o correo electrónico.' : 'Please enter your username or email.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');
    setSuccessMsg('');

    try {
      let targetEmail = idToUse.toLowerCase();
      if (!targetEmail.includes('@')) {
        const found = await getAffiliateByUsername(targetEmail);
        if (!found || !found.email) {
          throw new Error(isEs ? `No encontramos ningún usuario @${targetEmail}` : `User @${targetEmail} not found`);
        }
        targetEmail = found.email;
      }

      if (auth) {
        await sendPasswordResetEmail(auth, targetEmail);
      }

      setStatus('success');
      setSuccessMsg(isEs
        ? `Hemos enviado un enlace de recuperación a ${targetEmail}. Revisa tu bandeja de entrada o spam.`
        : `Password reset link sent to ${targetEmail}. Please check your inbox or spam folder.`
      );
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      if (err.code === 'auth/user-not-found') {
        setErrorMsg(isEs ? 'No existe una cuenta registrada con ese correo.' : 'No account found with this email.');
      } else {
        setErrorMsg(err.message || (isEs ? 'Error al enviar el enlace de recuperación.' : 'Error sending reset email.'));
      }
    }
  };

  // ── HANDLE REGISTER (SIN PASSWORD - CÉDULA ES CLAVE TEMPORAL) ───────────────
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.username || !form.email || !form.cedula) {
      setErrorMsg(isEs ? 'Completa todos los campos requeridos.' : 'Please fill in all required fields.');
      setStatus('error');
      return;
    }
    if (form.username.length < 3) {
      setErrorMsg(isEs ? 'El usuario debe tener al menos 3 caracteres.' : 'Username must be at least 3 characters.');
      setStatus('error');
      return;
    }
    if (usernameStatus === 'taken') {
      setErrorMsg(isEs ? 'Ese usuario ya está tomado. Elige otro.' : 'That username is taken. Choose another.');
      setStatus('error');
      return;
    }
    if (form.cedula.trim().length < 6) {
      setErrorMsg(isEs ? 'La cédula debe tener al menos 6 dígitos.' : 'ID must be at least 6 digits.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');
    setSuccessMsg('');

    try {
      let authUid = '';

      // 1. Create Firebase Auth user with initial password = cedula
      if (auth) {
        try {
          const userCred = await createUserWithEmailAndPassword(auth, form.email.trim().toLowerCase(), form.cedula.trim());
          authUid = userCred.user.uid;
          
          try {
            await sendEmailVerification(userCred.user);
          } catch (mailErr) {
            console.warn('Verification email notice:', mailErr);
          }
        } catch (authErr: any) {
          if (authErr.code === 'auth/email-already-in-use') {
            console.warn('Email already in Firebase Auth, proceeding to sync Firestore doc');
          } else {
            throw authErr;
          }
        }
      }

      // 2. Save in Firestore
      const newAff = await registerAffiliateInFirestore({
        username: form.username,
        email: form.email,
        cedula: form.cedula,
        name: form.name,
        phone: form.phone,
        sponsorUsername: form.sponsorUsername || undefined,
        authUid,
      });

      setStatus('success');
      setSuccessMsg(
        isEs
          ? `¡Cuenta creada exitosamente! Te hemos enviado un correo de confirmación. Tu contraseña inicial para ingresar es tu cédula (${form.cedula}).`
          : `Account created successfully! Verification email sent. Your initial login password is your ID (${form.cedula}).`
      );

      // Trigger first-login password definition modal
      setActiveAffiliateId(newAff.id);
      setTimeout(() => {
        setShowForcePasswordModal(true);
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || (isEs ? 'Error al registrarte. Intenta de nuevo.' : 'Registration error. Please try again.'));
      setStatus('error');
    }
  };

  const usernameIndicator = () => {
    if (form.username.length < 3) return null;
    if (usernameStatus === 'checking') return <span className="text-[10px] text-zinc-400">Verificando...</span>;
    if (usernameStatus === 'available') return <span className="text-[10px] text-emerald-400">✓ Disponible</span>;
    if (usernameStatus === 'taken') return <span className="text-[10px] text-rose-400">✗ Ya en uso</span>;
    return null;
  };

  return (
    <div className="min-h-screen bg-stone-950 text-zinc-300 pt-10 pb-24 font-sans selection:bg-amber-500 selection:text-white relative">
      
      {/* Force Password Change Modal (EnergyEngine Pattern) */}
      <ForcePasswordChangeModal
        isOpen={showForcePasswordModal}
        affiliateId={activeAffiliateId}
        onSuccess={() => {
          setShowForcePasswordModal(false);
          router.push(`/${locale}/affiliates/dashboard`);
        }}
      />

      {/* Ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6 pb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isEs ? 'Embajadores VIP • Plan High-Ticket' : 'VIP Ambassadors • High-Ticket Plan'}</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight">
          {isEs ? (
            <>Club de <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Embajadores Vermilion</span></>
          ) : (
            <><span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Vermilion</span> Ambassadors Club</>
          )}
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          {isEs
            ? 'Monetiza tu influencia con el modelo más justo de la industria turística. Comparte tu código, regala un 10% de descuento a tus clientes en tours de lujo y accede a comisiones directas y participaciones del Fondo Global.'
            : 'Monetize your influence with the fairest model in luxury travel. Share your code, gift 10% off to your clients, and access direct commissions and global pool shares.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={`/${locale}/affiliates/presentation`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all"
          >
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Ver Simulador & Plan de Compensación</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── PORTAL DE ACCESO: LOGIN / REGISTRO ─────────────────────────────── */}
      <section id="portal" className="px-4 sm:px-6 lg:px-8 max-w-xl mx-auto relative z-10 scroll-mt-24">
        <div className="bg-black/50 backdrop-blur-xl rounded-[32px] border border-white/10 shadow-2xl p-8 sm:p-10 space-y-6">

          {/* Toggle Tabs */}
          <div className="grid grid-cols-2 p-1 bg-zinc-900/90 rounded-2xl border border-white/5">
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setErrorMsg(''); setStatus('idle'); }}
              className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                authMode === 'login'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-900/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>{isEs ? 'Iniciar Sesión' : 'Sign In'}</span>
            </button>

            <button
              type="button"
              onClick={() => { setAuthMode('register'); setErrorMsg(''); setStatus('idle'); }}
              className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                authMode === 'register'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-900/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>{isEs ? 'Crear Cuenta' : 'Register'}</span>
            </button>
          </div>

          {/* ── LOGIN FORM ────────────────────────────────────────────────── */}
          {authMode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4 pt-2">
              <div className="text-center space-y-1 mb-6">
                <h3 className="font-serif text-2xl font-light text-white">
                  {isEs ? 'Ingresa a tu Panel' : 'Access Your Portal'}
                </h3>
                <p className="text-xs text-zinc-400">
                  {isEs ? 'Usa tu usuario (@pablo.g) o correo registrado' : 'Use your username or registered email'}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                  <AtSign className="w-3.5 h-3.5 text-amber-500" />
                  {isEs ? 'Usuario o Correo Electrónico *' : 'Username or Email *'}
                </label>
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="ej: pablo.g o tu correo"
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-zinc-900/50 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400 flex items-center justify-between">
                  <span>{isEs ? 'Contraseña o Cédula *' : 'Password or ID *'}</span>
                  <span className="text-[10px] text-zinc-500">{isEs ? '(Cédula en tu 1er ingreso)' : '(National ID on 1st login)'}</span>
                </label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-white/10 bg-zinc-900/50 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setResetIdentifier(loginIdentifier);
                      setAuthMode('forgot');
                      setErrorMsg('');
                      setSuccessMsg('');
                      setStatus('idle');
                    }}
                    className="text-xs text-amber-400 hover:underline cursor-pointer transition-colors"
                  >
                    {isEs ? '¿Olvidaste tu contraseña?' : 'Forgot your password?'}
                  </button>
                </div>
              </div>

              {loginProgressMessage && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5 animate-pulse">
                  <span className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin shrink-0" />
                  <span>{loginProgressMessage}</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-900/50 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-black font-bold uppercase tracking-widest text-xs rounded-2xl transition-all shadow-md shadow-amber-900/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                {status === 'loading' ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>{isEs ? 'Entrar a Mi Panel' : 'Sign In to Dashboard'}</span>
                  </>
                )}
              </button>
            </form>
            ) : authMode === 'forgot' ? (
              /* ── FORGOT PASSWORD FORM ───────────────────────────────────── */
              <form onSubmit={handleResetPassword} className="space-y-4 pt-2">
                <div className="text-center space-y-1 mb-6">
                  <h3 className="font-serif text-2xl font-light text-white">
                    {isEs ? 'Recuperar Contraseña' : 'Reset Password'}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {isEs ? 'Ingresa tu usuario (@pablo.g) o correo para enviarte un enlace de recuperación.' : 'Enter your username or email to receive a recovery link.'}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                    <AtSign className="w-3.5 h-3.5 text-amber-500" />
                    {isEs ? 'Usuario o Correo Electrónico *' : 'Username or Email *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={resetIdentifier}
                    onChange={(e) => setResetIdentifier(e.target.value)}
                    placeholder="ej: pablo.g o tu correo"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-zinc-900/50 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-900/50 text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-black font-bold uppercase tracking-widest text-xs rounded-2xl transition-all shadow-md shadow-amber-900/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  {status === 'loading' ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>{isEs ? 'Enviar Enlace de Recuperación' : 'Send Recovery Link'}</span>
                  )}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMsg('');
                      setSuccessMsg('');
                      setStatus('idle');
                    }}
                    className="text-xs text-zinc-400 hover:text-white cursor-pointer transition-colors"
                  >
                    {isEs ? '← Volver a Iniciar Sesión' : '← Back to Sign In'}
                  </button>
                </div>
              </form>
            ) : (
            /* ── REGISTER FORM (SIN PASSWORD - CÉDULA ES CLAVE TEMPORAL) ────── */
            <form onSubmit={handleRegister} className="space-y-4 pt-2">
              <div className="text-center space-y-1 mb-6">
                <h3 className="font-serif text-2xl font-light text-white">
                  {isEs ? 'Únete como Embajador' : 'Become an Ambassador'}
                </h3>
                <p className="text-xs text-zinc-400">
                  {isEs ? 'Sin contraseña inicial. Tu cédula será tu clave temporal de 1er ingreso.' : 'No initial password required. Your ID is your temporary password.'}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  {isEs ? 'Nombre Completo *' : 'Full Name *'}
                </label>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={isEs ? 'Pablo Fabricio García Flores' : 'Your full name'}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-zinc-900/50 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <AtSign className="w-3 h-3 text-amber-500" />
                    {isEs ? 'Tu Usuario Único * (enlace público)' : 'Your Unique Username *'}
                  </span>
                  {usernameIndicator()}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm font-mono">@</span>
                  <input
                    name="username"
                    required
                    value={form.username}
                    onChange={handleUsernameChange}
                    placeholder="pablo.g"
                    className={`w-full pl-8 pr-4 py-3 rounded-xl border bg-zinc-900/50 text-sm text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:ring-1 transition-colors
                      ${usernameStatus === 'available' ? 'border-emerald-500/50 focus:ring-emerald-500/30' :
                        usernameStatus === 'taken' ? 'border-rose-500/50 focus:ring-rose-500/30' :
                        'border-white/10 focus:border-amber-500/50 focus:ring-amber-500/30'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-400">
                    {isEs ? 'Correo Electrónico *' : 'Email Address *'}
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="pablofgarciaf@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-zinc-900/50 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-400 flex items-center justify-between">
                    <span>{isEs ? 'Cédula / Pasaporte *' : 'ID / Passport *'}</span>
                  </label>
                  <input
                    name="cedula"
                    required
                    value={form.cedula}
                    onChange={handleChange}
                    placeholder="1721790721"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-zinc-900/50 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400">
                  {isEs ? 'WhatsApp / Teléfono' : 'Phone'}
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+593 98 399 2549"
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-zinc-900/50 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3 h-3" />
                    {isEs ? 'Usuario Patrocinador (Opcional)' : 'Sponsor Username (Optional)'}
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm font-mono">@</span>
                  <input
                    name="sponsorUsername"
                    value={form.sponsorUsername}
                    onChange={handleChange}
                    placeholder="ej: pablo.g"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-white/10 bg-zinc-900/50 text-sm text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                  />
                </div>
              </div>

              {/* Info notice about initial password */}
              <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-900/40 text-blue-300 text-xs flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Te enviaremos un correo de confirmación. Tu clave temporal de primer ingreso es tu <strong>cédula</strong>. En tu 1er acceso se te pedirá definir tu contraseña permanente.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-900/50 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || usernameStatus === 'taken'}
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold uppercase tracking-widest text-xs rounded-2xl transition-all shadow-md shadow-amber-900/20 flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                {status === 'loading' ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{isEs ? 'Crear Mi Cuenta Ahora' : 'Create My Account Now'}</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>
      </section>
    </div>
  );
}