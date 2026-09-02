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
  const isEs = locale === 'es';
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

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
      setAuthError('Firebase Auth no está inicializado.');
      return;
    }

    let isSubscribed = true;
    let attempts = 0;
    const maxAttempts = 3;

    const checkSession = async () => {
      // 1. Direct check
      if (auth.currentUser) {
        if (isSubscribed) {
          setCurrentUser(auth.currentUser);
          setLoading(false);
          setAuthError(null);
        }
        return;
      }

      // 2. Listener with retry buffer
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          if (isSubscribed) {
            setCurrentUser(user);
            setLoading(false);
            setAuthError(null);
          }
        } else {
          attempts++;
          if (attempts < maxAttempts) {
            // Wait and retry before concluding no session exists
            await new Promise((res) => setTimeout(res, 600));
            if (auth.currentUser && isSubscribed) {
              setCurrentUser(auth.currentUser);
              setLoading(false);
              setAuthError(null);
            }
          } else {
            if (isSubscribed) {
              setLoading(false);
              setAuthError(
                isEs
                  ? 'No se detectó una sesión activa en este navegador. Inicia sesión para continuar.'
                  : 'No active session detected in this browser. Please sign in.'
              );
              console.warn('[Affiliates Layout] Auth state check concluded: no active user session.');
            }
          }
        }
      });

      return () => unsubscribe();
    };

    const cleanupPromise = checkSession();

    return () => {
      isSubscribed = false;
      cleanupPromise.then((unsub) => unsub && unsub());
    };
  }, [router, locale, isPublicPage, isEs]);

  if (isPublicPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0A0A0F] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#A9A9A9]">
          {isEs ? 'Verificando Sesión de Embajador...' : 'Verifying Ambassador Session...'}
        </p>
      </div>
    );
  }

  // Si no está autenticado, muestra la pantalla informativa visible con botón en lugar de rebotar
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md bg-white/[0.03] border border-amber-500/30 rounded-[24px] p-8 shadow-2xl backdrop-blur-md space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 font-bold text-xl">
            🔒
          </div>
          <div>
            <h2 className="font-serif text-2xl font-light text-white">
              {isEs ? 'Acceso al Panel de Embajadores' : 'Ambassador Portal Access'}
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              {authError || (isEs ? 'Se requiere iniciar sesión para acceder a tus comisiones y red.' : 'Authentication required.')}
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                window.location.href = `/${locale}/affiliates`;
              }}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-95 transition-all shadow-lg cursor-pointer"
            >
              {isEs ? 'Iniciar Sesión' : 'Sign In'}
            </button>
            <button
              onClick={() => {
                window.location.href = `/${locale}`;
              }}
              className="w-full py-3 px-4 bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white font-medium text-xs rounded-xl hover:bg-zinc-800 transition-all cursor-pointer"
            >
              {isEs ? 'Volver a la Portada' : 'Return to Home'}
            </button>
          </div>
        </div>
      </div>
    );
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
