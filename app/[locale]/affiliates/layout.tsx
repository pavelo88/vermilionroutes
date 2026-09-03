'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { getAffiliateByEmail } from '@/lib/affiliates';
import AffiliatesSidebar from '@/components/affiliates/AffiliatesSidebar';

/**
 * Layout privado y protegido para la zona de afiliados (Copia fiel de la lógica Energyengine).
 * - Si NO está autenticado: Bloquea el acceso y redirige a /[locale]/auth/affiliates.
 * - Si ESTÁ autenticado pero requiere cambio de contraseña: Redirige a /[locale]/auth/affiliates.
 * - Si ESTÁ autenticado y verificado: Permite el acceso y muestra el Sidebar oficial.
 */
export default function AffiliatesLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const isEs = locale === 'es';

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Páginas públicas que no requieren verificación estricta de sesión
  const isPublicPage =
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
      router.replace(`/${locale}/auth/affiliates`);
      return;
    }

    let isMounted = true;

    // Listener reactivo de Firebase Auth idéntico al patrón Energyengine
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!isMounted) return;

      if (!firebaseUser) {
        console.warn('[Affiliates Layout] No hay sesión activa. Redirigiendo a /auth/affiliates...');
        setLoading(false);
        router.replace(`/${locale}/auth/affiliates`);
        return;
      }

      // Usuario autenticado en Firebase
      try {
        if (firebaseUser.email) {
          const aff = await getAffiliateByEmail(firebaseUser.email);
          if (aff && aff.forcePasswordChange) {
            console.warn('[Affiliates Layout] Usuario requiere cambio de contraseña inicial. Redirigiendo a /auth/affiliates...');
            setLoading(false);
            router.replace(`/${locale}/auth/affiliates`);
            return;
          }
        }

        setCurrentUser(firebaseUser);
        setLoading(false);
      } catch (err) {
        console.warn('[Affiliates Layout] Error verificando perfil de embajador:', err);
        setCurrentUser(firebaseUser);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [router, locale, isPublicPage]);

  if (isPublicPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07110B] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] uppercase tracking-[0.25em] font-sans text-amber-400 font-semibold">
          {isEs ? 'Verificando Sesión de Embajador...' : 'Verifying Ambassador Session...'}
        </p>
      </div>
    );
  }

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
