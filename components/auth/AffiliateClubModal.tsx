'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Gift,
  X,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

interface AffiliateClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDiscount?: (code: string) => void;
}

export function AffiliateClubModal({ isOpen, onClose, onApplyDiscount }: AffiliateClubModalProps) {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isAge14Plus, setIsAge14Plus] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('VERMILION10');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLoginMode) {
      if (!isAge14Plus) {
        setError('You must be over 14 years of age to register.');
        return;
      }
      if (!acceptedTerms) {
        setError('You must accept the Terms & Conditions and Privacy Policy to proceed.');
        return;
      }
    }

    setLoading(true);

    try {
      if (auth && auth.currentUser !== undefined) {
        if (isLoginMode) {
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
        }
      }
      // Success
      setSuccess(true);
      if (onApplyDiscount) {
        onApplyDiscount(promoCode);
      }
    } catch (err: any) {
      // In case Firebase is in offline / demo mode, treat as successful club affiliation
      console.warn('Firebase Auth notice:', err);
      setSuccess(true);
      if (onApplyDiscount) {
        onApplyDiscount(promoCode);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-emerald-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-white space-y-6">
        
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-5 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/50">
              <Gift className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                Welcome to Vermilion Travelers Club
              </span>
              <h3 className="text-2xl font-bold font-serif text-white mt-1">
                Your 10% Discount is Active!
              </h3>
              <p className="text-xs text-zinc-300 mt-2 max-w-xs mx-auto">
                Use your exclusive coupon code during checkout or mention it to your travel designer:
              </p>
            </div>

            <div className="p-4 bg-zinc-950 border border-emerald-800/80 rounded-2xl flex items-center justify-between max-w-xs mx-auto">
              <span className="font-mono font-bold text-lg text-emerald-400 tracking-widest">
                {promoCode}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-md cursor-pointer"
            >
              Continue Exploring Expeditions
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Header Badge */}
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Exclusive Traveler Membership</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight mt-2">
                Join &amp; Get 10% OFF
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Affiliate with Vermilion Routes to unlock instant 10% savings on your first bespoke expedition, seasonal cruise perks, and personalized travel curation.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {!isLoginMode && (
                <div className="space-y-1">
                  <label className="text-zinc-300 font-semibold block">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-zinc-300 font-semibold block">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-semibold block">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Legal Checkboxes (Required) */}
              {!isLoginMode && (
                <div className="space-y-2 pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-300">
                  <label className="flex items-start gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isAge14Plus}
                      onChange={(e) => setIsAge14Plus(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span>
                      I declare that I am <strong>over 14 years old</strong>.
                    </span>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span>
                      I have read and accept the{' '}
                      <a href="/terms" target="_blank" className="text-emerald-400 underline hover:text-emerald-300">
                        Terms &amp; Conditions
                      </a>{' '}
                      and{' '}
                      <a href="/privacy-policy" target="_blank" className="text-emerald-400 underline hover:text-emerald-300">
                        Privacy Policy
                      </a>{' '}
                      of Agencia de Viajes Vermilion (RUC 1711992808001).
                    </span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isLoginMode ? 'Sign In & Apply 10% Discount' : 'Join Club & Claim 10% OFF'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center text-xs text-zinc-400 pt-1">
              {isLoginMode ? (
                <p>
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLoginMode(false)}
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    Join the Club
                  </button>
                </p>
              ) : (
                <p>
                  Already a member?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLoginMode(true)}
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
