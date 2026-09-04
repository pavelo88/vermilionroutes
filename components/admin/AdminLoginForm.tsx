'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Mail, KeyRound, Eye, EyeOff, ShieldCheck, ArrowLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export function AdminLoginForm() {
  const locale = useLocale();
  const isEs = locale === 'es';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Forgot password states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState('');
  const [resetError, setResetError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setAuthError('');

    const targetEmail = (email || '').trim().toLowerCase();
    const targetPassword = (password || '').trim();
    const masterEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@vermilionroutes.com').trim().toLowerCase();
    const masterPassword = (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Vermilion2026*').trim();

    // Fast check for master credentials (with or without trailing asterisk)
    const isMasterEmail = targetEmail === masterEmail || targetEmail === 'admin@vermilionroutes.com';
    const isMasterPass = targetPassword === masterPassword || targetPassword === 'Vermilion2026' || targetPassword === 'Vermilion2026*';

    if (isMasterEmail && isMasterPass) {
      localStorage.setItem('vermilion_admin_session', 'true');
      window.dispatchEvent(new Event('storage'));
      window.location.reload();
      return;
    }

    try {
      console.log('🕵️‍♂️ [CHISMOSO ADMIN LOGIN] Autenticando en Firebase Auth:', targetEmail);
      const cred = await signInWithEmailAndPassword(auth, targetEmail, targetPassword);
      const loggedEmail = cred.user.email?.toLowerCase().trim();
      console.log('🕵️‍♂️ [CHISMOSO ADMIN LOGIN] Firebase Auth exitoso para:', loggedEmail);

      // Los fundadores tienen pase directo garantizado como Super Admins
      const isFounder =
        loggedEmail === 'pablofgarciaf@gmail.com' ||
        loggedEmail === 'info@vermilionroutes.com' ||
        loggedEmail === masterEmail;

      if (isFounder) {
        console.log('🕵️‍♂️ [CHISMOSO ADMIN LOGIN] ✅ Fundador / Super Admin verificado:', loggedEmail);
        return;
      }

      // Verificar rol en colección 'usuarios' para otros colaboradores
      if (loggedEmail && db) {
        const uSnap = await getDoc(doc(db, 'usuarios', loggedEmail));
        if (!uSnap.exists()) {
          if (auth) await signOut(auth).catch(() => {});
          setAuthError(isEs ? 'Acceso denegado (403): Tu cuenta no dispone de permisos para acceder a cPanel.' : 'Access denied: not authorized for cPanel.');
          return;
        }

        const role = String(uSnap.data()?.role || '').toLowerCase().trim();
        if (role !== 'super' && role !== 'editor') {
          if (auth) await signOut(auth).catch(() => {});
          setAuthError(
            isEs
              ? 'Acceso denegado (403): Tu cuenta no dispone de permisos para acceder a cPanel.'
              : 'Access denied (403): Your account is not authorized for cPanel.'
          );
          return;
        }
      }
    } catch (err: any) {
      console.error('[Admin Login Error]', err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setAuthError(isEs ? 'Contraseña incorrecta. Verifica tus credenciales.' : 'Invalid password.');
      } else if (err.code === 'auth/user-not-found') {
        setAuthError(isEs ? 'No existe cuenta registrada con ese correo.' : 'User not found.');
      } else {
        setAuthError(err.message || (isEs ? 'Error al iniciar sesión.' : 'Error signing in.'));
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetLoading(true);
    setResetError('');
    setResetSuccess('');

    try {
      await sendPasswordResetEmail(auth, resetEmail.trim().toLowerCase());
      setResetSuccess(
        isEs
          ? '¡Correo de recuperación enviado! Revisa tu bandeja de entrada o spam.'
          : 'Password reset email sent! Please check your inbox or spam folder.'
      );
    } catch (err: any) {
      setResetError(
        isEs
          ? 'No se pudo enviar el correo de recuperación. Verifica la dirección.'
          : 'Could not send reset email. Please verify the address.'
      );
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8 glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-3">
          {/* Brand Icon (Not Logo) */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-2.5 mb-2 shadow-inner">
            <Image
              src="/icon.png"
              alt="Vermilion Routes Icon"
              width={44}
              height={44}
              className="object-contain"
              priority
            />
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {isEs ? 'Portal cPanel Vermilion' : 'Vermilion Routes Portal'}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {isEs
              ? 'Gestión de Contenidos y Configuración del Sitio'
              : 'Administrative Management & Content Portal'}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {authError && (
            <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs text-center font-medium">
              {authError}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              {isEs ? 'Correo Electrónico' : 'Admin Email'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vermilionroutes.com"
                className="w-full pl-10 pr-4 py-3 glass-input rounded-2xl text-sm placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                {isEs ? 'Contraseña' : 'Password'}
              </label>
              <button
                type="button"
                onClick={() => {
                  setResetEmail(email);
                  setShowForgotModal(true);
                }}
                className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                {isEs ? '¿Olvidaste tu contraseña?' : 'Forgot password?'}
              </button>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-3 glass-input rounded-2xl text-sm placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={loginLoading}
            className="w-full py-3.5 text-sm font-semibold rounded-2xl gap-2 shadow-lg shadow-emerald-900/30 mt-2"
          >
            {loginLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{isEs ? 'Autenticando en Firebase...' : 'Authenticating with Firebase...'}</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{isEs ? 'Iniciar Sesión en cPanel' : 'Sign In to Portal'}</span>
              </span>
            )}
          </Button>
        </form>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isEs ? 'Volver al Sitio Web' : 'Back to Public Website'}</span>
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal - Deluxe Design */}
      {showForgotModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-[#07130C]/95 dark:bg-[#07130C]/95 border border-[#1A3826] p-8 sm:p-10 rounded-[32px] space-y-6 shadow-2xl relative overflow-hidden text-center">
            {/* Glow accent */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Brand Icon Header */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-2.5 shadow-inner">
              <Image
                src="/icon.png"
                alt="Vermilion Routes Icon"
                width={44}
                height={44}
                className="object-contain"
                priority
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
                {isEs ? 'Recuperar Contraseña' : 'Reset Password'}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                {isEs
                  ? 'Ingresa tu correo para recibir un enlace oficial de restablecimiento desde Firebase.'
                  : 'Enter your email to receive an official password reset link directly from Firebase.'}
              </p>
            </div>

            {resetSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-600/80 text-emerald-200 text-xs flex items-center gap-2.5 text-left shadow-lg">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>{resetSuccess}</span>
              </div>
            )}

            {resetError && (
              <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-700/80 text-rose-200 text-xs flex items-center gap-2.5 text-left shadow-lg">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                <span>{resetError}</span>
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-5 text-left">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  {isEs ? 'Correo Electrónico' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="admin@vermilionroutes.com"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-2xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setResetSuccess('');
                    setResetError('');
                  }}
                  className="w-1/2 py-3 rounded-2xl border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-colors"
                >
                  {isEs ? 'Cancelar' : 'Cancel'}
                </button>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={resetLoading}
                  className="w-1/2 py-3 rounded-2xl text-xs font-semibold gap-2 shadow-lg shadow-emerald-950/50"
                >
                  {resetLoading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{isEs ? 'Enviar Enlace' : 'Send Link'}</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
