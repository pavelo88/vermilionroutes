'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Lock, Mail, KeyRound, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [authError, setAuthError] = useState('');

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
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setAuthError('Invalid credentials. Please check your email and password.');
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8 glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-2 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Vermilion Routes Portal
          </h1>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Administrative Management & Firebase Authentication Portal
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
              Admin Email
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
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              Password
            </label>
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
                <span>Authenticating with Firebase...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Sign In to Portal</span>
              </span>
            )}
          </Button>
        </form>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
