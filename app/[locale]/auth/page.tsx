'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from 'firebase/auth';
import {
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  AtSign,
  LogIn,
} from 'lucide-react';
import {
  getAffiliateByUsername,
  getAffiliateByEmail,
  AffiliateAccount,
} from '@/lib/affiliates';
import ForcePasswordChangeModal from '@/components/auth/ForcePasswordChangeModal';

export default function AuthPage() {
  const router = useRouter();
  const locale = useLocale();
  const isEs = locale === 'es';

  const [authMode, setAuthMode] = useState<'login' | 'forgot'>('login');
  const [resetIdentifier, setResetIdentifier] = useState('');
  const [loginProgressMessage, setLoginProgressMessage] = useState('');

  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [showForcePasswordModal, setShowForcePasswordModal] = useState(false);
  const [activeAffiliateId, setActiveAffiliateId] = useState('');

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        try {
          const aff = await getAffiliateByEmail(user.email);
          if (aff && aff.forcePasswordChange) {
            setActiveAffiliateId(aff.id);
            setShowForcePasswordModal(true);
          } else if (aff) {
            router.replace(`/${locale}/affiliates/dashboard`);
          }
        } catch {
          // ignore
        }
      }
    });
    return () => unsubscribe();
  }, [locale, router]);

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

      if (!targetEmail.includes('@')) {
        foundAffiliate = await getAffiliateByUsername(targetEmail);
        if (!foundAffiliate || !foundAffiliate.email) {
          throw new Error(isEs ? `No encontramos ningún usuario @${targetEmail}` : `User @${targetEmail} not found`);
        }
        targetEmail = foundAffiliate.email;
      }

      setLoginProgressMessage(isEs ? '2/3 Autenticando credenciales...' : '2/3 Authenticating credentials...');

      if (auth) {
        try {
          await setPersistence(auth, browserLocalPersistence);
        } catch (pErr) {
          console.warn('[Login] Persistence warning:', pErr);
        }
        await signInWithEmailAndPassword(auth, targetEmail, loginPassword.trim());
      }

      setLoginProgressMessage(isEs ? '3/3 Sincronizando datos de embajador...' : '3/3 Syncing ambassador profile...');

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
        setShowForcePasswordModal(true);
        setStatus('idle');
        setLoginProgressMessage('');
        return;
      }

      setStatus('success');
      setLoginProgressMessage(isEs ? '✓ ¡Acceso confirmado! Abriendo tu panel...' : '✓ Access confirmed! Opening dashboard...');
      localStorage.setItem('vr_affiliate_user', targetEmail);
      
      console.log('[Auth Gossip] Login success! Redirecting via router.push to prevent page reload drop.');
      router.push(`/${locale}/affiliates/dashboard`);
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

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center p-4 selection:bg-amber-500 selection:text-white relative">
      <ForcePasswordChangeModal
        isOpen={showForcePasswordModal}
        affiliateId={activeAffiliateId}
        onSuccess={() => {
          setShowForcePasswordModal(false);
          router.push(`/${locale}/affiliates/dashboard`);
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/[0.02] backdrop-blur-xl rounded-[32px] border border-amber-500/20 shadow-2xl p-8 sm:p-10 relative z-10">
        {authMode === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-center space-y-1 mb-6 flex flex-col items-center">
              <img 
                src="/images/shared/logo-vr-gold.svg" 
                alt="Vermilion" 
                className="h-12 object-contain drop-shadow-md mb-2" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }} 
              />
              <h4 className="font-serif text-sm font-light text-white tracking-widest uppercase mb-4">
                Vermilion <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">Affiliates</span>
              </h4>
              <h3 className="font-serif text-2xl font-light text-white">
                {isEs ? 'Ingresa a tu Panel' : 'Access Your Portal'}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
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
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
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
                  className="w-full px-4 py-3 pr-10 rounded-xl border border-white/10 bg-black/40 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
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
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] disabled:opacity-50 text-black font-extrabold uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg hover:opacity-95 flex items-center justify-center gap-2 cursor-pointer"
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
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
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
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
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
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] disabled:opacity-50 text-black font-extrabold uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg hover:opacity-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              {status === 'loading' ? (
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>{isEs ? 'Enviar Enlace de Recuperación' : 'Send Recovery Link'}</span>
              )}
            </button>

            <div className="text-center pt-4">
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
        )}
      </div>
    </div>
  );
}
