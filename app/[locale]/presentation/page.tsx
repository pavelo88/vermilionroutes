'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import {
  Calculator,
  DollarSign,
  Users,
  Award,
  Link as LinkIcon,
  Info,
  Star,
  ArrowRight,
  Shield,
  Sparkles,
  Lock,
  Percent,
  TrendingUp,
  LogIn,
  UserPlus,
  X,
  Eye,
  EyeOff,
  AtSign,
  User,
  CreditCard,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import {
  registerAffiliateInFirestore,
  isUsernameAvailable,
  getAffiliateByUsername,
  getAffiliateByEmail,
  AffiliateAccount,
} from '@/lib/affiliates';
import ForcePasswordChangeModal from '@/components/auth/ForcePasswordChangeModal';

function PresentationContent() {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const refParam = searchParams.get('vid') || searchParams.get('ref') || '';
  const loginParam = searchParams.get('login') === 'true';
  const isEs = locale === 'es';

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'register' | 'login' | 'forgot'>('register');
  const [resetIdentifier, setResetIdentifier] = useState('');

  // Simulator Sliders State
  const [tourPrice, setTourPrice] = useState(5000);
  const [personalSales, setPersonalSales] = useState(2);
  const [recruits, setRecruits] = useState(2);
  const [recruitSales, setRecruitSales] = useState(1);

  // 1. Direct Sales Volume & Commission (10% Infinite)
  const personalVolume = tourPrice * personalSales;
  const directCommission = personalVolume * 0.10;

  // 2. Team Sales Volume & Leadership Bonus (3% on direct recruits)
  const networkVolume = tourPrice * recruitSales * recruits;
  const leadershipBonus = networkVolume * 0.03;

  // 3. Global Pool Shares (6% total: 2% per pool in multiples of targets)
  const totalVolume = personalVolume + networkVolume;
  const pool1Shares = Math.floor(totalVolume / 3000);  // Every $3,000 = 1 share in Pool 1 (2%)
  const pool2Shares = Math.floor(totalVolume / 7000);  // Every $7,000 = 1 share in Pool 2 (2%)
  const pool3Shares = Math.floor(totalVolume / 15000); // Every $15,000 = 1 share in Pool 3 (2%)

  // Estimated share values based on company average volume
  const pool1Value = 60;
  const pool2Value = 140;
  const pool3Value = 450;
  const globalBonus = (pool1Shares * pool1Value) + (pool2Shares * pool2Value) + (pool3Shares * pool3Value);

  // 4. Grand Total Monthly Estimated
  const totalEarnings = directCommission + leadershipBonus + globalBonus;

  // ── AUTH FORMS STATE ───────────────────────────────────────────────────────
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [registerForm, setRegisterForm] = useState({
    name: '',
    username: '',
    email: '',
    cedula: '',
    phone: '',
    sponsorUsername: refParam,
  });

  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [authStatus, setAuthStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [loginProgressMessage, setLoginProgressMessage] = useState('');

  // Force password change modal state
  const [showForcePasswordModal, setShowForcePasswordModal] = useState(false);
  const [activeAffiliateId, setActiveAffiliateId] = useState('');

  useEffect(() => {
    if (loginParam) {
      router.replace(`/${locale}/auth`);
    }
  }, [loginParam, router, locale]);

  useEffect(() => {
    if (refParam) {
      setRegisterForm(prev => ({ ...prev, sponsorUsername: refParam }));
    }
  }, [refParam]);

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const clean = name === 'username' ? value.toLowerCase().replace(/\s/g, '') : value;
    setRegisterForm(prev => ({ ...prev, [name]: clean }));
  };

  let usernameTimer: ReturnType<typeof setTimeout>;
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/\s/g, '');
    setRegisterForm(prev => ({ ...prev, username: val }));
    clearTimeout(usernameTimer);
    if (val.length < 3) { setUsernameStatus('idle'); return; }
    setUsernameStatus('checking');
    usernameTimer = setTimeout(async () => {
      const available = await isUsernameAvailable(val);
      setUsernameStatus(available ? 'available' : 'taken');
    }, 400);
  };

  // ── HANDLE LOGIN ───────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier || !loginPassword) {
      setAuthError(isEs ? 'Ingresa tu usuario/correo y contraseña.' : 'Please enter your username/email and password.');
      setAuthStatus('error');
      return;
    }

    setAuthStatus('loading');
    setAuthError('');
    setLoginProgressMessage(isEs ? '1/3 Conectando y verificando usuario...' : '1/3 Verifying user...');

    try {
      let targetEmail = loginIdentifier.trim().toLowerCase();
      let foundAffiliate: AffiliateAccount | null = null;

      console.log('[Login] Starting login for:', targetEmail);

      if (!targetEmail.includes('@')) {
        foundAffiliate = await getAffiliateByUsername(targetEmail);
        if (!foundAffiliate || !foundAffiliate.email) {
          throw new Error(isEs ? `No encontramos ningún usuario @${targetEmail}` : `User @${targetEmail} not found`);
        }
        targetEmail = foundAffiliate.email;
        console.log('[Login] Resolved username to email:', targetEmail);
      }

      setLoginProgressMessage(isEs ? '2/3 Autenticando credenciales en Firebase...' : '2/3 Authenticating credentials in Firebase...');

      if (auth) {
        try {
          await setPersistence(auth, browserLocalPersistence);
        } catch (pErr) {
          console.warn('[Login] Persistence warning:', pErr);
        }
        const userCred = await signInWithEmailAndPassword(auth, targetEmail, loginPassword.trim());
        console.log('[Login] Firebase Auth success, user UID:', userCred.user.uid);
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

      if (foundAffiliate && foundAffiliate.forcePasswordChange) {
        setActiveAffiliateId(foundAffiliate.id);
        setAuthModalOpen(false);
        setShowForcePasswordModal(true);
        setAuthStatus('idle');
        setLoginProgressMessage('');
        return;
      }

      setAuthStatus('success');
      setLoginProgressMessage(isEs ? '✓ ¡Acceso confirmado! Abriendo tu panel...' : '✓ Access confirmed! Opening dashboard...');
      localStorage.setItem('vr_affiliate_user', targetEmail);
      setAuthModalOpen(false);
      router.push(`/${locale}/affiliates/dashboard`);
    } catch (err: any) {
      console.error('[Login Error]', err);
      setAuthStatus('error');
      setLoginProgressMessage('');
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setAuthError(isEs ? 'Contraseña o cédula incorrecta. Si es tu 1er ingreso, usa tu cédula.' : 'Incorrect credentials.');
      } else if (err.code === 'auth/user-not-found') {
        setAuthError(isEs ? 'No existe una cuenta con ese correo.' : 'Account not found.');
      } else {
        setAuthError(err.message || (isEs ? 'Error al iniciar sesión.' : 'Error signing in.'));
      }
    }
  };

  // ── HANDLE FORGOT PASSWORD ────────────────────────────────────────────────
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const idToUse = resetIdentifier.trim() || loginIdentifier.trim();
    if (!idToUse) {
      setAuthError(isEs ? 'Ingresa tu usuario o correo electrónico.' : 'Please enter your username or email.');
      setAuthStatus('error');
      return;
    }

    setAuthStatus('loading');
    setAuthError('');
    setAuthSuccess('');

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

      setAuthStatus('success');
      setAuthSuccess(isEs
        ? `Hemos enviado un enlace de recuperación a ${targetEmail}. Revisa tu bandeja de entrada o spam.`
        : `Password reset link sent to ${targetEmail}. Please check your inbox or spam folder.`
      );
    } catch (err: any) {
      console.error(err);
      setAuthStatus('error');
      if (err.code === 'auth/user-not-found') {
        setAuthError(isEs ? 'No existe una cuenta registrada con ese correo.' : 'No account found with this email.');
      } else {
        setAuthError(err.message || (isEs ? 'Error al enviar el enlace de recuperación.' : 'Error sending reset email.'));
      }
    }
  };

  // ── HANDLE REGISTER (SIN PASSWORD - CÉDULA ES CLAVE TEMPORAL) ──────────────
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.username || !registerForm.email || !registerForm.cedula) {
      setAuthError(isEs ? 'Completa todos los campos obligatorios.' : 'Fill all required fields.');
      setAuthStatus('error');
      return;
    }
    if (registerForm.username.length < 3) {
      setAuthError(isEs ? 'El usuario debe tener al menos 3 caracteres.' : 'Username min 3 chars.');
      setAuthStatus('error');
      return;
    }
    if (usernameStatus === 'taken') {
      setAuthError(isEs ? 'Ese usuario ya está en uso. Elige otro.' : 'Username taken.');
      setAuthStatus('error');
      return;
    }
    if (registerForm.cedula.trim().length < 6) {
      setAuthError(isEs ? 'La cédula/pasaporte debe tener al menos 6 caracteres.' : 'ID min 6 chars.');
      setAuthStatus('error');
      return;
    }

    setAuthStatus('loading');
    setAuthError('');
    setAuthSuccess('');

    try {
      let authUid = '';

      if (auth) {
        try {
          const userCred = await createUserWithEmailAndPassword(
            auth,
            registerForm.email.trim().toLowerCase(),
            registerForm.cedula.trim()
          );
          authUid = userCred.user.uid;
          
          try {
            await sendEmailVerification(userCred.user);
            await signOut(auth);
          } catch (mailErr) {
            console.warn('Verification email notice:', mailErr);
            await signOut(auth).catch(() => {});
          }
        } catch (authErr: any) {
          if (authErr.code === 'auth/email-already-in-use') {
            console.warn('Email already in Firebase Auth, proceeding to sync Firestore doc');
          } else {
            throw authErr;
          }
        }
      }

      const newAff = await registerAffiliateInFirestore({
        username: registerForm.username,
        email: registerForm.email,
        cedula: registerForm.cedula,
        name: registerForm.name,
        phone: registerForm.phone,
        sponsorUsername: registerForm.sponsorUsername || undefined,
        authUid,
      });

      setAuthStatus('success');
      setAuthSuccess(
        isEs
          ? `¡Cuenta creada exitosamente! Tu contraseña temporal de primer ingreso es tu cédula (${registerForm.cedula}).`
          : `Account created! Your temporary password is your ID (${registerForm.cedula}).`
      );

      // Open force password definition modal
      setActiveAffiliateId(newAff.id);
      setTimeout(() => {
        setAuthModalOpen(false);
        setShowForcePasswordModal(true);
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || (isEs ? 'Error al registrarte.' : 'Registration error.'));
      setAuthStatus('error');
    }
  };

  const usernameIndicator = () => {
    if (registerForm.username.length < 3) return null;
    if (usernameStatus === 'checking') return <span className="text-[10px] text-zinc-400">Verificando...</span>;
    if (usernameStatus === 'available') return <span className="text-[10px] text-emerald-400">✓ Disponible</span>;
    if (usernameStatus === 'taken') return <span className="text-[10px] text-rose-400">✗ Ya en uso</span>;
    return null;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-stone-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-amber-500/30 selection:text-amber-900 dark:selection:text-amber-200 transition-colors duration-300">
      
      {/* Force Password Change Modal */}
      <ForcePasswordChangeModal
        isOpen={showForcePasswordModal}
        affiliateId={activeAffiliateId}
        onSuccess={() => {
          setShowForcePasswordModal(false);
          window.location.href = `/${locale}/affiliates/dashboard`;
        }}
      />

      {/* ── MODAL DE AUTENTICACIÓN (REGISTRO & LOGIN) ─────────────────────── */}
      {authModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-950 border border-amber-500/40 dark:border-amber-500/30 rounded-[28px] sm:rounded-[32px] p-4 sm:p-8 pt-10 sm:pt-10 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo Vermilion Affiliates */}
            <div className="flex flex-col items-center justify-center mb-6">
              <img src="/images/shared/logo-vr-gold.svg" alt="Vermilion" className="h-10 object-contain drop-shadow-md mb-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <h4 className="font-serif text-sm font-light text-white tracking-widest uppercase">
                Vermilion <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">Affiliates</span>
              </h4>
            </div>

            {/* ── REGISTER FORM ───────────────────────────────────────────── */}
            {modalTab === 'register' ? (
              <form onSubmit={handleRegister} className="space-y-3">
                <div className="text-center space-y-0.5 mb-3">
                  <h3 className="font-serif text-xl font-light text-zinc-900 dark:text-white">
                    {isEs ? 'Únete como Embajador' : 'Become an Ambassador'}
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {isEs ? 'Sin contraseña inicial. Tu cédula será tu clave temporal.' : 'Your ID will be your temporary password.'}
                  </p>
                </div>

                {/* Row 1: Name */}
                <div className="space-y-0.5">
                  <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-400 flex items-center gap-1.5">
                    <User className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    {isEs ? 'Nombre Completo *' : 'Full Name *'}
                  </label>
                  <input
                    name="name"
                    required
                    value={registerForm.name}
                    onChange={handleRegisterChange}
                    placeholder="ej: Pablo Fabricio García Flores"
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900/60 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                  />
                </div>

                {/* Row 2: Username */}
                <div className="space-y-0.5">
                  <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-400 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <AtSign className="w-3 h-3 text-amber-500" />
                      {isEs ? 'Tu Usuario Único * (enlace público)' : 'Your Unique Username *'}
                    </span>
                    {usernameIndicator()}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm font-mono">@</span>
                    <input
                      name="username"
                      required
                      value={registerForm.username}
                      onChange={handleUsernameChange}
                      placeholder="pablo.g"
                      className={`w-full pl-7 pr-3 py-2 rounded-xl border bg-zinc-100 dark:bg-zinc-900/60 text-sm text-zinc-900 dark:text-white font-mono placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-1 transition-colors
                        ${usernameStatus === 'available' ? 'border-emerald-500/50 focus:ring-emerald-500/30' :
                          usernameStatus === 'taken' ? 'border-rose-500/50 focus:ring-rose-500/30' :
                          'border-zinc-300 dark:border-white/10 focus:border-amber-500/50 focus:ring-amber-500/30'}`}
                    />
                  </div>
                </div>

                {/* Row 3: Email + Cedula */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-400">
                      {isEs ? 'Correo Electrónico *' : 'Email *'}
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                      placeholder="email@ejemplo.com"
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900/60 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-400">
                      {isEs ? 'Cédula / Pasaporte *' : 'ID / Passport *'}
                    </label>
                    <input
                      name="cedula"
                      required
                      value={registerForm.cedula}
                      onChange={handleRegisterChange}
                      placeholder="1721790721"
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900/60 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 4: Phone + Sponsor */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-400">
                      {isEs ? 'WhatsApp / Teléfono' : 'Phone'}
                    </label>
                    <input
                      name="phone"
                      value={registerForm.phone}
                      onChange={handleRegisterChange}
                      placeholder="+593 98 399 2549"
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900/60 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-400">
                      {isEs ? 'Patrocinador' : 'Sponsor'}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-mono">@</span>
                      <input
                        name="sponsorUsername"
                        value={registerForm.sponsorUsername}
                        onChange={handleRegisterChange}
                        placeholder="pablo.g"
                        className="w-full pl-6 pr-3 py-2 rounded-xl border border-zinc-300 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900/60 text-sm text-zinc-900 dark:text-white font-mono placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Info box — high contrast in both light and dark */}
                <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-blue-800 dark:text-blue-300 leading-snug">
                    {isEs
                      ? 'Se enviará un correo de confirmación. Tu clave temporal de primer ingreso es tu cédula.'
                      : 'A confirmation email will be sent. Your temporary password is your ID number.'}
                  </p>
                </div>

                {authError && (
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-400 text-[11px] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {authSuccess && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[11px] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{authSuccess}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authStatus === 'loading' || usernameStatus === 'taken'}
                  className="w-full py-3 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:from-[#E5C158] hover:to-[#B59049] disabled:opacity-50 text-stone-950 font-extrabold uppercase tracking-wider text-xs rounded-2xl transition-all shadow-lg shadow-amber-900/30 cursor-pointer hover:scale-[1.01] active:scale-95 border-none flex items-center justify-center gap-2"
                >
                  {authStatus === 'loading' ? (
                    <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin inline-block" />
                  ) : (
                    <span>{isEs ? 'Crear Mi Cuenta Ahora' : 'Create My Account'}</span>
                  )}
                </button>
              </form>
            ) : modalTab === 'login' ? (
              /* ── LOGIN FORM ─────────────────────────────────────────────── */
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="text-center space-y-1 mb-4">
                  <h3 className="font-serif text-2xl font-light text-white">
                    {isEs ? 'Acceso a Embajadores' : 'Ambassador Sign In'}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {isEs ? 'Ingresa con tu usuario (@pablo.g) o correo registrado' : 'Use your username or email'}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                    <AtSign className="w-3.5 h-3.5 text-amber-500" />
                    {isEs ? 'Usuario o Correo *' : 'Username or Email *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="pablo.g o email@ejemplo.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-zinc-900/60 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-400 flex items-center justify-between">
                    <span>{isEs ? 'Contraseña o Cédula *' : 'Password or ID *'}</span>
                    <span className="text-[10px] text-zinc-500">{isEs ? '(Cédula en tu 1er ingreso)' : '(ID on 1st login)'}</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 pr-10 rounded-xl border border-white/10 bg-zinc-900/60 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
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
                        setModalTab('forgot');
                        setAuthError('');
                        setAuthSuccess('');
                        setAuthStatus('idle');
                      }}
                      className="text-[11px] text-[#D4AF37] hover:underline cursor-pointer transition-colors"
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

                {authError && (
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-900/50 text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authStatus === 'loading'}
                  className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:from-[#E5C158] hover:to-[#B59049] disabled:opacity-50 text-stone-950 font-extrabold uppercase tracking-wider text-xs rounded-2xl transition-all shadow-lg shadow-amber-900/30 mt-4 cursor-pointer hover:scale-[1.01] active:scale-95 border-none flex items-center justify-center gap-2"
                >
                  {authStatus === 'loading' ? (
                    <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin inline-block" />
                  ) : (
                    <span>{isEs ? 'Entrar a Mi Panel' : 'Sign In to My Dashboard'}</span>
                  )}
                </button>
              </form>
            ) : (
              /* ── FORGOT PASSWORD FORM ───────────────────────────────────── */
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="text-center space-y-1 mb-4">
                  <h3 className="font-serif text-2xl font-light text-white">
                    {isEs ? 'Recuperar Contraseña' : 'Reset Password'}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {isEs
                      ? 'Ingresa tu usuario (@pablo.g) o correo para enviarte un enlace de recuperación.'
                      : 'Enter your username or email to receive a recovery link.'}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                    <AtSign className="w-3.5 h-3.5 text-amber-500" />
                    {isEs ? 'Usuario o Correo *' : 'Username or Email *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={resetIdentifier}
                    onChange={(e) => setResetIdentifier(e.target.value)}
                    placeholder="pablo.g o email@ejemplo.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-zinc-900/60 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                  />
                </div>

                {authError && (
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-900/50 text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {authSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{authSuccess}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authStatus === 'loading'}
                  className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:from-[#E5C158] hover:to-[#B59049] disabled:opacity-50 text-stone-950 font-extrabold uppercase tracking-wider text-xs rounded-2xl transition-all shadow-lg shadow-amber-900/30 mt-4 cursor-pointer hover:scale-[1.01] active:scale-95 border-none flex items-center justify-center gap-2"
                >
                  {authStatus === 'loading' ? (
                    <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin inline-block" />
                  ) : (
                    <span>{isEs ? 'Enviar Enlace de Recuperación' : 'Send Recovery Link'}</span>
                  )}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setModalTab('login');
                      setAuthError('');
                      setAuthSuccess('');
                      setAuthStatus('idle');
                    }}
                    className="text-xs text-zinc-400 hover:text-white cursor-pointer transition-colors"
                  >
                    {isEs ? '← Volver a Iniciar Sesión' : '← Back to Sign In'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* ── HERO SECTION (FONDOS METÁLICOS / OBSIDIANA Y PADDING PERFECTO BAJO EL NAVBAR) ──────────────── */}
      <header className="-mt-24 sm:-mt-28 pt-36 sm:pt-44 pb-20 sm:pb-24 relative overflow-hidden bg-gradient-to-b from-[#F5EFE6] via-[#FAF8F5] to-[#FAF8F5] dark:from-stone-950 dark:via-zinc-950 dark:to-stone-950 border-b border-amber-500/20 dark:border-amber-500/10">
        
        {/* Glow de iluminación metálica dorada */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-amber-500/10 dark:bg-amber-400/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-widest shadow-xs">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> El Club de Embajadores High-Ticket
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-zinc-900 dark:text-white leading-tight">
            Monetiza tu influencia con <br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 dark:from-amber-200 dark:via-yellow-400 dark:to-amber-500 drop-shadow-xs">
              Vermilion Routes
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Forma parte de la comunidad más exclusiva de la industria turística. Comparte tu código, regala un <strong className="text-amber-700 dark:text-amber-400">10% de descuento automático</strong> a tus clientes en expediciones de lujo y obtén un <strong className="text-amber-700 dark:text-amber-400">10% de comisión directa en efectivo</strong> más participaciones en nuestro Fondo Global de utilidades.
          </p>

          {/* 2 Action Buttons in Hero con diseño metálico dorado y platino de lujo */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => { setModalTab('register'); setAuthModalOpen(true); }}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:from-[#E5C158] hover:to-[#B59049] text-stone-950 font-extrabold uppercase tracking-wider text-xs rounded-2xl transition-all duration-300 shadow-xl shadow-amber-900/30 hover:scale-[1.02] active:scale-95 cursor-pointer border-none"
            >
              <UserPlus className="w-4 h-4" />
              <span>Unirme a la Comunidad</span>
            </button>

            <button
              onClick={() => { router.push(`/${locale}/affiliates`); }}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white dark:bg-stone-900 hover:bg-slate-100 dark:hover:bg-stone-800 border border-[#D4AF37]/50 text-stone-900 dark:text-[#F3E5AB] font-bold uppercase tracking-wider text-xs rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm"
            >
              <LogIn className="w-4 h-4 text-[#D4AF37] dark:text-[#F3E5AB]" />
              <span>Acceder a Mi Panel</span>
            </button>
          </div>

        </div>
      </header>

      {/* ── HOW IT WORKS (3 PASOS) ───────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center space-y-2 mb-12">
          <h2 className="font-serif text-3xl font-light text-zinc-900 dark:text-white">Cómo Funciona el Ecosistema</h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Tres pilares que blindan tu rentabilidad y la de tus clientes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-white/5 p-6 rounded-3xl hover:border-emerald-500/40 transition-all shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-4">
                <LinkIcon className="text-emerald-600 dark:text-emerald-400 w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">1. Comparte tu Enlace</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                Obtienes un enlace único (ej. <code className="text-emerald-700 dark:text-emerald-400 font-mono bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">?ref=pablo.g</code>). Publícalo en redes sociales o compártelo directamente con clientes interesados en expediciones privadas.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-white/5 p-6 rounded-3xl hover:border-emerald-500/40 transition-all shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-4">
                <DollarSign className="text-emerald-600 dark:text-emerald-400 w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">2. Descuento Inmediato</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                Tu cliente recibe un <strong className="text-emerald-700 dark:text-emerald-400">10% de descuento automático</strong> en el checkout. La venta es irresistible porque estás entregando un ahorro de cientos de dólares en tours de alto valor.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-white/5 p-6 rounded-3xl hover:border-emerald-500/40 transition-all shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center mb-4">
                <Award className="text-teal-600 dark:text-teal-400 w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">3. Comisiones & Acciones</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                Cobras el <strong className="text-teal-700 dark:text-teal-400">10% en efectivo</strong> de cada venta directa. Además, acumulas <strong>Acciones</strong> en el Fondo Global de la empresa por cada $3,000, $7,000 y $15,000 facturados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIMULATOR SECTION ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-white/10 rounded-[36px] p-6 md:p-10 shadow-2xl backdrop-blur-xl">
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-zinc-900 dark:text-white">Simulador de Negocio Real</h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Proyecta tus ingresos mensuales con la fórmula matemática exacta.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* CONTROLES */}
            <div className="space-y-6">
              
              <div className="p-4 rounded-2xl bg-stone-100 dark:bg-black/40 border border-zinc-200/70 dark:border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Precio promedio del Tour (USD)</label>
                  <span className="text-amber-700 dark:text-amber-400 font-bold font-mono text-sm" suppressHydrationWarning>${tourPrice.toLocaleString()} USD</span>
                </div>
                <input 
                  type="range" min="1000" max="15000" step="500" 
                  value={tourPrice} onChange={(e) => setTourPrice(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-300 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-600 dark:accent-amber-500"
                />
                <p className="text-[10px] text-zinc-500">Expediciones Ecuador & Galápagos High-Ticket</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-100 dark:bg-black/40 border border-zinc-200/70 dark:border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Tus ventas directas al mes</label>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-sm">{personalSales} {personalSales === 1 ? 'Tour' : 'Tours'}</span>
                </div>
                <input 
                  type="range" min="0" max="10" step="1" 
                  value={personalSales} onChange={(e) => setPersonalSales(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-300 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-500"
                />
              </div>

              <div className="pt-4 border-t border-zinc-200/80 dark:border-white/5 space-y-4">
                <h4 className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-teal-600 dark:text-blue-400" /> Crecimiento de Equipo (Opcional)
                </h4>
                
                <div className="p-4 rounded-2xl bg-stone-100 dark:bg-black/40 border border-zinc-200/70 dark:border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">Personas invitadas (Hijos)</label>
                    <span className="text-teal-700 dark:text-blue-400 font-bold font-mono text-sm">{recruits} Socios</span>
                  </div>
                  <input 
                    type="range" min="0" max="20" step="1" 
                    value={recruits} onChange={(e) => setRecruits(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-300 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-600 dark:accent-blue-500"
                  />
                </div>

                <div className={`p-4 rounded-2xl bg-stone-100 dark:bg-black/40 border border-zinc-200/70 dark:border-white/5 space-y-2 transition-opacity duration-300 ${recruits > 0 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">Promedio de ventas de cada socio</label>
                    <span className="text-teal-700 dark:text-blue-400 font-bold font-mono text-sm">{recruitSales} Tours c/u</span>
                  </div>
                  <input 
                    type="range" min="0" max="5" step="1" 
                    value={recruitSales} onChange={(e) => setRecruitSales(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-300 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-600 dark:accent-blue-500"
                  />
                </div>
              </div>

            </div>

            {/* RESULTADOS */}
            <div className="bg-stone-900 dark:bg-black/70 border border-stone-800 dark:border-white/10 text-white rounded-3xl p-6 flex flex-col justify-between shadow-xl">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-6 text-center">
                  Proyección Mensual Estimada
                </h3>
                
                <div className="space-y-3">
                  
                  <div className="flex justify-between items-center p-3.5 bg-zinc-900/60 border border-white/5 rounded-2xl">
                    <div className="flex items-center gap-2.5">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-zinc-300">Venta Directa (10% Infinito)</span>
                    </div>
                    <span className="font-bold font-mono text-emerald-400 text-sm">${directCommission.toLocaleString()}</span>
                  </div>

                  <div className={`flex justify-between items-center p-3.5 bg-zinc-900/60 border border-white/5 rounded-2xl ${leadershipBonus > 0 ? '' : 'opacity-50'}`}>
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-teal-400" />
                      <span className="text-xs text-zinc-300">Liderazgo Red (3% de socios)</span>
                    </div>
                    <span className="font-bold font-mono text-teal-400 text-sm">${leadershipBonus.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center p-3.5 bg-zinc-900/60 border border-white/5 rounded-2xl">
                    <div className="flex items-center gap-2.5">
                      <Award className="w-4 h-4 text-amber-400" />
                      <div>
                        <span className="text-xs text-zinc-300 block">Fondo Global (Acciones 6%)</span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          P1 ($3k): {pool1Shares} acc. | P2 ($7k): {pool2Shares} acc. | P3 ($15k): {pool3Shares} acc.
                        </span>
                      </div>
                    </div>
                    <span className="font-bold font-mono text-amber-400 text-sm">${globalBonus.toLocaleString()}</span>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs text-zinc-400">
                    <span>Volumen Total Facturado</span>
                    <span className="font-mono text-white font-bold">${totalVolume.toLocaleString()} USD</span>
                  </div>

                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-br from-emerald-950/60 via-stone-900 to-black border border-emerald-500/30 rounded-2xl text-center space-y-3">
                <p className="text-emerald-300 text-xs font-semibold uppercase tracking-wider">Tu Ingreso Total Estimado</p>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">${totalEarnings.toLocaleString()} <span className="text-sm font-light text-zinc-400">USD/mes</span></h2>
                
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button
                    onClick={() => { setModalTab('register'); setAuthModalOpen(true); }}
                    className="flex-1 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold uppercase tracking-wider text-xs py-3.5 px-4 rounded-xl transition-all flex justify-center items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/50 border-none"
                  >
                    <span>Quiero ser Embajador</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => { setModalTab('login'); setAuthModalOpen(true); }}
                    className="bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-bold uppercase tracking-wider text-xs py-3.5 px-4 rounded-xl transition-all cursor-pointer"
                  >
                    <span>Acceder</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── EJEMPLO MATEMÁTICO REAL DE LAS PISCINAS ──────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="p-8 rounded-[32px] bg-emerald-500/5 dark:bg-amber-500/5 border border-emerald-500/20 dark:border-amber-500/20 space-y-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-amber-400" />
            <div>
              <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">
                Ejemplo Real: ¿Cómo se calculan y pagan las Piscinas Globales?
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                La empresa destina exactamente el 2% de sus ventas globales para cada piscina. Quien más vende, más acciones acumula.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-white dark:bg-black/50 border border-zinc-200/90 dark:border-white/5 space-y-2 shadow-sm">
              <span className="text-emerald-700 dark:text-amber-400 font-bold uppercase tracking-wider block">Paso 1: Emisión de Acciones</span>
              <p className="text-zinc-700 dark:text-zinc-300">
                • <strong>Persona A</strong> vende <strong>$6,000 USD</strong> = Recibe <strong>2 Acciones</strong> ($6,000 / $3,000 = 2).<br />
                • <strong>Persona B</strong> vende <strong>$3,000 USD</strong> = Recibe <strong>1 Acción</strong> ($3,000 / $3,000 = 1).<br />
                • <strong>Total de Acciones emitidas</strong> = 3 acciones.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-black/50 border border-zinc-200/90 dark:border-white/5 space-y-2 shadow-sm">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block">Paso 2: Valor de cada Acción</span>
              <p className="text-zinc-700 dark:text-zinc-300">
                • <strong>Total Ventas Globales</strong> = $9,000 USD.<br />
                • <strong>Fondo del 2% (Piscina 1)</strong> = <strong>$180 USD</strong>.<br />
                • <strong>Valor por Acción</strong> = $180 / 3 acciones = <strong>$60 USD por acción</strong>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-black/50 border border-zinc-200/90 dark:border-white/5 space-y-2 shadow-sm">
              <span className="text-teal-600 dark:text-blue-400 font-bold uppercase tracking-wider block">Paso 3: Reparto Exacto al Centavo</span>
              <p className="text-zinc-700 dark:text-zinc-300">
                • <strong>Persona A</strong> cobra: 2 × $60 = <strong>$120 USD</strong>.<br />
                • <strong>Persona B</strong> cobra: 1 × $60 = <strong>$60 USD</strong>.<br />
                • <strong>Total pagado</strong> = <strong>$180 USD</strong> (Exacto, cero sobregiro financiero).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-black/60 border border-zinc-200/90 dark:border-white/10 text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-3 shadow-xs">
            <Shield className="w-5 h-5 text-emerald-600 dark:text-amber-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>🛡️ Blindaje Financiero & Regla de Excedente:</strong> Si en un mes nadie califica a una piscina (ej. nadie alcanzó los $15,000 para la Piscina 3), o si quedan comisiones no reclamadas en la red, <strong>el 100% de ese valor no cobrado pasa automáticamente a Pablo (`pablo.g` - Usuario Raíz / Fundador)</strong>. ¡La empresa jamás gasta ni un centavo más del presupuesto!
            </p>
          </div>
        </div>
      </section>

      {/* ── PLAN DE COMPENSACIÓN DETALLADO ─────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-amber-400">Ecosistema High-Ticket Inquebrantable</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-zinc-900 dark:text-white">Plan de Compensación Oficial</h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Transparencia total. Un modelo diseñado para premiar a los verdaderos constructores, eliminando estructuras piramidales ficticias.
          </p>
        </div>

        {/* Repartición Base & 10-3-2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-white/5 space-y-4 shadow-md">
            <div className="flex items-center gap-3">
              <Percent className="w-5 h-5 text-emerald-600 dark:text-amber-400" />
              <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">1. Repartición de Capital</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-amber-500 mt-1.5 shrink-0" />
                <span><strong>80% Fondo Operativo:</strong> Intocable. Cubre proveedores de lujo, logística y utilidad neta garantizada de Vermilion Routes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-amber-500 mt-1.5 shrink-0" />
                <span><strong>20% Ganancia de Red:</strong> Es el pastel comisionable destinado a pagar a vendedores y líderes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span><strong>10% Descuento Cliente:</strong> Todo cliente que compra con tu enlace (?ref=usuario) recibe 10% OFF automático.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-white/5 space-y-4 shadow-md">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-600 dark:text-amber-400" />
              <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">2. Regla "10-3-2 Limitada"</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span><strong>Vendedor (Nivel 0 - 10%):</strong> Infinito. Cobras el 10% de absolutamente todas tus ventas.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-blue-500 mt-1.5 shrink-0" />
                <span><strong>Padre (Nivel 1 - 3%):</strong> Cobras sobre los primeros $10,000 USD que venda ese hijo específico.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                <span><strong>Abuelo (Nivel 2 - 2%):</strong> Cobras sobre el 1er $1,000 incondicional, y hasta $5,000 si estás Activo ($1,000 VP cada 60 días).</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Compresión Inversa & Fondo Global */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-white/5 space-y-4 shadow-md">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-amber-400" />
              <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">3. Compresión Inversa (Orfandad)</h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              El dinero del esfuerzo se queda en quien trabaja. Si el Padre o Abuelo no existen, están inactivos o superaron sus topes, <strong>la comisión no cobrada baja y la absorbe el Vendedor</strong>. Un vendedor sin líderes activos arriba absorbe todo y cobra el <strong>15% íntegro</strong> de sus ventas.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-white/5 space-y-4 shadow-md">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-emerald-600 dark:text-amber-400" />
              <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">4. Fondo Global (6% Profit-Sharing)</h3>
            </div>
            <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex justify-between border-b border-zinc-200/80 dark:border-white/5 pb-1">
                <span>Piscina 1 (Negocio - 2%)</span>
                <span className="font-mono text-zinc-900 dark:text-white font-bold">Cada $3,000 USD = 1 Acción</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200/80 dark:border-white/5 pb-1">
                <span>Piscina 2 (Líder - 2%)</span>
                <span className="font-mono text-zinc-900 dark:text-white font-bold">Cada $7,000 USD = 1 Acción</span>
              </div>
              <div className="flex justify-between">
                <span>Piscina 3 (Premium - 2%)</span>
                <span className="font-mono text-zinc-900 dark:text-white font-bold">Cada $15,000 USD = 1 Acción</span>
              </div>
            </div>
          </div>

        </div>

        {/* Candados de Seguridad */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/30 border border-zinc-200/90 dark:border-white/5 space-y-4 shadow-md">
          <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600 dark:text-amber-500" /> Candados de Seguridad y Antifraude
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-black/40 border border-zinc-200/70 dark:border-white/5 space-y-1">
              <p className="font-bold text-zinc-900 dark:text-white">Regla del 50%</p>
              <p>Ninguna rama puede aportar más del 50% de la meta requerida para calificar a las piscinas.</p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-black/40 border border-zinc-200/70 dark:border-white/5 space-y-1">
              <p className="font-bold text-zinc-900 dark:text-white">Comisiones Diferidas</p>
              <p>El saldo pasa a disponible cuando el turista inicia su viaje, protegiendo ante cancelaciones.</p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-black/40 border border-zinc-200/70 dark:border-white/5 space-y-1">
              <p className="font-bold text-zinc-900 dark:text-white">Excedentes a Pablo</p>
              <p>Cualquier fondo no calificado o comisión no reclamada fluye al usuario raíz (<code className="text-emerald-700 dark:text-amber-400 font-bold">pablo.g</code>).</p>
            </div>
          </div>
        </div>

      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="max-w-5xl mx-auto px-6 pb-20">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-stone-900 to-black border border-stone-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xl">
          <div>
            <h4 className="font-serif text-2xl font-bold text-white">¿Listo para unirte al club?</h4>
            <p className="text-xs text-zinc-400 mt-1">Regístrate gratis o accede a tu panel de control de embajador.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setModalTab('register'); setAuthModalOpen(true); }}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer border-none"
            >
              Crear Cuenta Gratis
            </button>
            <button
              onClick={() => { setModalTab('login'); setAuthModalOpen(true); }}
              className="px-6 py-3.5 bg-zinc-800 hover:bg-zinc-700 border border-white/15 text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              Acceder
            </button>
          </div>
        </div>
      </footer>
      
    </div>
  );
}

export default function PresentationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] dark:bg-stone-950 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PresentationContent />
    </Suspense>
  );
}
