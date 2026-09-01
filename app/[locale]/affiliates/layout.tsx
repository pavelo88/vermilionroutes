'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import AffiliatesSidebar from '@/components/affiliates/AffiliatesSidebar';

/**
 * Layout privado y protegido para la zona de afiliados.
 * - Si NO está autenticado: Bloquea el acceso y redirige a /presentation?login=true.
 * - Si ESTÁ autenticado: Muestra el Sidebar Izquierdo con los datos reales del usuario.
 */
export default function AffiliatesLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (!user) {
        // Redirige al portal público de presentación y login si no hay sesión
        router.replace(`/${locale}/presentation?login=true`);
      }
    });
    return () => unsubscribe();
  }, [router, locale]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-zinc-400 space-y-4">
        <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-widest font-mono text-zinc-500">Verificando Credenciales de Embajador...</p>
      </div>
    );
  }

  // Si no está autenticado, no renderiza nada mientras Next.js ejecuta la redirección
  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-stone-950 text-zinc-900 dark:text-zinc-100 flex flex-col lg:flex-row">
      <AffiliatesSidebar />
      <main className="flex-1 lg:pl-72 pt-16 lg:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
