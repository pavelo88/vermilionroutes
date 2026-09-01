'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { auth, db } from '@/lib/firebase';
import { signOut, updatePassword, reauthenticateWithCredential, EmailAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import {
  UserCircle,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { getAffiliateByEmail, AffiliateAccount } from '@/lib/affiliates';

export default function ProfilePage() {
  const router = useRouter();
  const locale = useLocale();
  const isEs = locale === 'es';

  const [affiliate, setAffiliate] = useState<AffiliateAccount | null>(null);
  const [loading, setLoading] = useState(true);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: 'Ecuador',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        try {
          const aff = await getAffiliateByEmail(user.email);
          if (aff) {
            setAffiliate(aff);
            setForm(prev => ({
              ...prev,
              name: aff.name || '',
              phone: aff.phone || '',
              address: aff.address || 'Ecuador',
            }));
          }
        } catch {
          // ignore
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMsg('');

    // If changing password, validate all 3 fields
    if (form.newPassword || form.currentPassword || form.confirmPassword) {
      if (!form.currentPassword) {
        setStatus('error');
        setMsg(isEs ? 'Debes ingresar tu contraseña actual para cambiarla.' : 'Please enter your current password.');
        return;
      }

      if (form.newPassword.length < 8) {
        setStatus('error');
        setMsg(isEs ? 'La nueva contraseña debe tener al menos 8 caracteres.' : 'New password must be at least 8 characters.');
        return;
      }

      if (form.newPassword !== form.confirmPassword) {
        setStatus('error');
        setMsg(isEs ? 'Las nuevas contraseñas no coinciden.' : 'New passwords do not match.');
        return;
      }

      // Reauthenticate & update Firebase Auth password
      if (auth && auth.currentUser && auth.currentUser.email) {
        try {
          const credential = EmailAuthProvider.credential(auth.currentUser.email, form.currentPassword);
          await reauthenticateWithCredential(auth.currentUser, credential);
          await updatePassword(auth.currentUser, form.newPassword);
        } catch (err: any) {
          console.error(err);
          setStatus('error');
          if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
            setMsg(isEs ? 'La contraseña actual es incorrecta.' : 'Current password is incorrect.');
          } else {
            setMsg(err.message || (isEs ? 'Error actualizando contraseña.' : 'Error updating password.'));
          }
          return;
        }
      }
    }

    // Update Firestore contact information
    if (db && affiliate) {
      try {
        const docRef = doc(db, 'affiliates', affiliate.id);
        await updateDoc(docRef, {
          name: form.name,
          phone: form.phone,
          address: form.address,
        });
      } catch (err) {
        console.warn('Error updating profile in firestore:', err);
      }
    }

    setStatus('success');
    setMsg(isEs ? 'Perfil actualizado exitosamente.' : 'Profile updated successfully.');
    setForm(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    setTimeout(() => {
      setStatus('idle');
      setMsg('');
    }, 4000);
  };

  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn('Sign out error', e);
      }
    }
    router.push(`/${locale}/presentation?login=true`);
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-zinc-400">
        <span className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin inline-block mr-2" />
        <span>Cargando tu perfil...</span>
      </div>
    );
  }

  const displayName = affiliate?.name || 'Embajador VIP';
  const displayUsername = affiliate?.username || 'embajador';
  const displayEmail = affiliate?.email || '';
  const displayRank = affiliate?.rank || 'Embajador';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="p-6 sm:p-8 max-w-2xl mx-auto space-y-8">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-light text-zinc-900 dark:text-white">Mi Perfil</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Configuración y seguridad de tu cuenta.</p>
        </div>

        {/* Logout button */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 text-xs font-bold transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>{isEs ? 'Cerrar Sesión' : 'Sign Out'}</span>
        </button>
      </div>

      {/* Avatar & identity (read-only) */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-black font-bold text-2xl shrink-0 shadow-md shadow-amber-500/20">
          {initial}
        </div>
        <div>
          <p className="font-semibold text-zinc-900 dark:text-white text-lg">{displayName}</p>
          <p className="text-sm text-amber-600 dark:text-amber-400 font-mono">@{displayUsername}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{displayEmail}</p>
        </div>
        <div className="ml-auto">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            {displayRank}
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 space-y-6">

        {/* Personal info */}
        <div>
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Información Personal</h2>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <UserCircle className="w-3.5 h-3.5 text-amber-500" />
                Nombre Completo
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/50 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  WhatsApp / Teléfono
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+593 98 000 0000"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/50 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  País / Ciudad
                </label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Ecuador"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/50 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Change password */}
        <div className="border-t border-zinc-200 dark:border-white/5 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              Cambiar Contraseña
            </h2>
            <span className="text-[10px] text-zinc-400">Opcional (solo si deseas cambiarla)</span>
          </div>

          <div className="space-y-4">
            {/* Current password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Contraseña Actual (Anterior)
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                  placeholder="Ingresa tu contraseña actual"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/50 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-amber-500/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New password + confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  Nueva Contraseña (mín. 8)
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pr-10 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/50 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-amber-500/50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/50 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {msg && (
          <div className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
            status === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400'
              : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-400'
          }`}>
            {status === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{msg}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-md cursor-pointer"
        >
          {status === 'loading' ? 'Guardando...' : 'Guardar Cambios'}
        </button>

      </form>

    </div>
  );
}
