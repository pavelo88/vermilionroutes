'use client';

import React, { useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { ShieldCheck, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, KeyRound } from 'lucide-react';

interface ForcePasswordChangeModalProps {
  isOpen: boolean;
  affiliateId: string;
  onSuccess: () => void;
}

export default function ForcePasswordChangeModal({
  isOpen,
  affiliateId,
  onSuccess,
}: ForcePasswordChangeModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentPassword) {
      setError('Por favor, ingresa tu contraseña actual (Cédula).');
      return;
    }
    if (newPassword.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (!/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      setError('La contraseña debe contener letras y números para mayor seguridad.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      if (auth && auth.currentUser && auth.currentUser.email) {
        // Re-authenticate to ensure 'recent-login' requirement is strictly met
        const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
        await reauthenticateWithCredential(auth.currentUser, credential);

        // Update password
        await updatePassword(auth.currentUser, newPassword);
      } else {
        throw new Error("Sesión no encontrada.");
      }

      if (db && affiliateId) {
        const docRef = doc(db, 'affiliates', affiliateId.toLowerCase());
        await updateDoc(docRef, {
          forcePasswordChange: false,
          updatedAt: new Date().toISOString(),
        });
      }

      onSuccess();
    } catch (err: any) {
      console.error('Error updating initial password:', err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('La contraseña actual es incorrecta.');
      } else if (err.code === 'auth/requires-recent-login') {
        setError('Por favor vuelve a iniciar sesión para continuar.');
      } else {
        setError(err.message || 'Error al actualizar la contraseña.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-stone-950 border border-amber-500/30 rounded-[32px] p-8 sm:p-10 shadow-2xl shadow-amber-500/10 space-y-6">
        
        {/* Header Icon */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
            <KeyRound className="w-7 h-7 text-amber-400" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Primer Ingreso de Seguridad
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
            Por tu seguridad, define tu <strong>contraseña definitiva</strong> para acceder a tu panel de embajador.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Current Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              Contraseña Actual (Tu Cédula) *
            </label>
            <div className="relative">
              <input
                type={showCurrentPass ? 'text' : 'password'}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors pr-10"
                placeholder="Ingresa tu cédula"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPass(!showCurrentPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              Nueva Contraseña Segura *
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors pr-10"
                placeholder="Mínimo 8 caracteres (letras y números)"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              Confirmar Nueva Contraseña *
            </label>
            <div className="relative">
              <input
                type={showConfirmPass ? 'text' : 'password'}
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors pr-10"
                placeholder="Repite tu nueva contraseña"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-950/40 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full relative overflow-hidden group bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            <div className="flex items-center justify-center gap-2 relative z-10">
              {loading ? (
                <span className="w-4 h-4 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
              <span>GUARDAR Y ENTRAR A MI PANEL</span>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
