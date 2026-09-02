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

  const isPublicPage =
    pathname === `/${locale}/affiliates` ||
    pathname === `/${locale}/affiliates/presentation` ||
    pathname === `/${locale}/affiliates/verify` ||
    pathname === `/${locale}/presentation`;

  useEffect(() => {
    if (isPublicPage) {
      setLoading(false);
      return;
    }

    if (!auth) {
      setLoading(false);
      return;
    }

    // Check existing synchronous user
    if (auth.currentUser) {
      setCurrentUser(auth.currentUser);
      setLoading(false);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (!user && !isPublicPage) {
        // Redirige al portal público de presentación y login si no hay sesión
        router.replace(`/${locale}/presentation?login=true`);
      }
    });
    return () => unsubscribe();
  }, [router, locale, isPublicPage]);

  if (isPublicPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0A0A0F] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#A9A9A9]">Verificando Credenciales...</p>
      </div>
    );
  }

  // Si no está autenticado, no renderiza nada mientras Next.js ejecuta la redirección
  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0A0A0F] text-zinc-900 dark:text-zinc-100 flex flex-col lg:flex-row transition-colors duration-300">
      <AffiliatesSidebar />
      <main className="flex-1 lg:pl-72 pt-16 lg:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
