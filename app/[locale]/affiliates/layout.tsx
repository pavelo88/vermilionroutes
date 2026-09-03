'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { getAffiliateByEmail } from '@/lib/affiliates';
import AffiliatesSidebar from '@/components/affiliates/AffiliatesSidebar';

/**
 * Layout privado y protegido para la zona de afiliados con RBAC estricto.
 * - Si NO está autenticado: Redirige a /[locale]/auth/affiliates.
 * - Si el ROL no es 'affiliate' o 'founder': Bloquea, cierra sesión y redirige con error=invalid_role.
 * - Si la cuenta está SUSPENDIDA o INACTIVA: Bloquea, cierra sesión y redirige con error=suspended.
 * - Si requiere CAMBIO DE CLAVE: Redirige a /[locale]/auth/affiliates para que cambie su contraseña.
 * - Si es 'super' admin en colección 'usuarios': Permite el paso con fines de auditoría.
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

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!isMounted) return;

      if (!firebaseUser || !firebaseUser.email) {
        console.warn('[RBAC Affiliates] No hay sesión activa. Redirigiendo a /auth/affiliates...');
        setLoading(false);
        router.replace(`/${locale}/auth/affiliates`);
        return;
      }

      const cleanEmail = firebaseUser.email.toLowerCase().trim();

      try {
        // 1. Verificar si es Super Admin con permisos maestros de auditoría
        let isSuperAdmin = false;
        if (db) {
          try {
            const userSnap = await getDoc(doc(db, 'usuarios', cleanEmail));
            if (userSnap.exists() && userSnap.data()?.role === 'super') {
              isSuperAdmin = true;
            }
          } catch (superErr) {
            console.warn('[RBAC Affiliates] Super check notice:', superErr);
          }
        }

        // 2. Obtener documento de afiliado
        const aff = await getAffiliateByEmail(cleanEmail);

        if (!aff && !isSuperAdmin) {
          console.error('[RBAC Affiliates] Cuenta no registrada en la colección affiliates:', cleanEmail);
          await signOut(auth);
          setLoading(false);
          router.replace(`/${locale}/auth/affiliates?error=not_found`);
          return;
        }

        if (aff && !isSuperAdmin) {
          // 3. Validación estricta del campo ROLE (prevención anti-adulteración)
          const rawRole = String((aff as any).role || '').toLowerCase().trim();
          const isAuthorizedRole = rawRole === 'affiliate' || rawRole === 'founder';

          if (!isAuthorizedRole) {
            console.error(`[RBAC Affiliates SECURITY ALERT] Rol no autorizado: "${rawRole}". Expulsando de inmediato.`);
            await signOut(auth);
            setLoading(false);
            router.replace(`/${locale}/auth/affiliates?error=invalid_role`);
            return;
          }

          // 4. Validación de estado de cuenta (status)
          const status = String((aff as any).status || '').toLowerCase().trim();
          if (status === 'suspended' || status === 'blocked' || status === 'inactive') {
            console.error(`[RBAC Affiliates SECURITY ALERT] Cuenta de embajador inactiva/suspendida: "${status}". Expulsando.`);
            await signOut(auth);
            setLoading(false);
            router.replace(`/${locale}/auth/affiliates?error=suspended`);
            return;
          }

          // 5. Validación de cambio obligatorio de clave
          if (aff.forcePasswordChange) {
            console.warn('[RBAC Affiliates] Embajador requiere cambio de contraseña inicial. Redirigiendo...');
            setLoading(false);
            router.replace(`/${locale}/auth/affiliates`);
            return;
          }
        }

        // Todas las validaciones de seguridad superadas
        setCurrentUser(firebaseUser);
        setLoading(false);
      } catch (err) {
        console.error('[RBAC Affiliates] Error en verificación de seguridad:', err);
        await signOut(auth).catch(() => {});
        setLoading(false);
        router.replace(`/${locale}/auth/affiliates?error=security_check_failed`);
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
