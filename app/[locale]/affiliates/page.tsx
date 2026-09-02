'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function AffiliatesRootPage() {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    // Si el usuario llega a la raíz de /affiliates y pasó el guard del layout,
    // significa que está logueado. Lo mandamos directo a su dashboard.
    router.replace(`/${locale}/affiliates/dashboard`);
  }, [router, locale]);

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}