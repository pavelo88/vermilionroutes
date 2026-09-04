'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { ShieldAlert, LogOut, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const locale = useLocale();
  const isEs = locale === 'es';

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      setDenied(true);
      return;
    }

    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!isMounted) return;

      if (!firebaseUser || !firebaseUser.email) {
        setLoading(false);
        setDenied(true);
        return;
      }

      const cleanEmail = firebaseUser.email.toLowerCase().trim();

      try {
        if (!db) {
          setLoading(false);
          setDenied(true);
          return;
        }

        // Fundadores y administradores maestros tienen pase directo garantizado
        const isMaster =
          cleanEmail === 'pablofgarciaf@gmail.com' ||
          cleanEmail === 'info@vermilionroutes.com' ||
          cleanEmail === (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@vermilionroutes.com').toLowerCase().trim();

        if (isMaster) {
          console.log('🕵️‍♂️ [CHISMOSO ADMIN LAYOUT] ✅ Fundador / Super Admin verificado:', cleanEmail);
          setUserRole('super');
          setCurrentUser(firebaseUser);
          setDenied(false);
          return;
        }

        const userSnap = await getDoc(doc(db, 'usuarios', cleanEmail));
        if (!userSnap.exists()) {
          console.error('🕵️‍♂️ [CHISMOSO ADMIN LAYOUT] Usuario no encontrado en colección usuarios:', cleanEmail);
          setDenied(true);
          setLoading(false);
          return;
        }

        const userData = userSnap.data();
        const role = String(userData?.role || '').toLowerCase().trim();
        setUserRole(role);

        // Permite acceso a todo el personal corporativo de la empresa
        const allowedInternalRoles = ['super', 'admin', 'operator', 'sales', 'financial', 'concierge', 'editor'];
        if (allowedInternalRoles.includes(role)) {
          console.log('🕵️‍♂️ [CHISMOSO ADMIN LAYOUT] ✅ Personal autorizado. Rol:', role);
          setCurrentUser(firebaseUser);
          setDenied(false);
        } else {
          console.error(`🕵️‍♂️ [CHISMOSO ADMIN LAYOUT] Acceso denegado a rol no corporativo: "${role}"`);
          setDenied(true);
        }
      } catch (err) {
        console.error('[Admin Guard Error]', err);
        setDenied(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [router, locale]);

  const handleLogout = async () => {
    if (auth) await signOut(auth).catch(() => {});
    router.replace(`/${locale}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07110B] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] uppercase tracking-[0.25em] font-sans text-emerald-400 font-semibold">
          {isEs ? 'Verificando Credenciales de Gestión...' : 'Verifying Management Credentials...'}
        </p>
      </div>
    );
  }

  if (denied) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] text-zinc-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-zinc-950/80 border border-rose-900/40 rounded-3xl p-8 text-center space-y-6 shadow-2xl shadow-rose-950/50">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold">
              Error 403 · Forbidden
            </span>
            <h2 className="font-serif text-2xl font-bold text-white">
              {isEs ? 'Acceso Restringido' : 'Restricted Access'}
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {isEs
                ? 'Este módulo empresarial está reservado exclusivamente para personal corporativo autorizado.'
                : 'This enterprise module is strictly restricted to authorized staff.'}
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{isEs ? 'Cerrar Sesión' : 'Sign Out'}</span>
            </button>
            <Link
              href={`/${locale}`}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors py-2 flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isEs ? 'Volver al Sitio Principal' : 'Back to Main Site'}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
