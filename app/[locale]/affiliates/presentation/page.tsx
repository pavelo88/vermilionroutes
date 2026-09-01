'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function AffiliatesPresentationRedirect() {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');

  useEffect(() => {
    const target = `/${locale}/presentation${ref ? `?ref=${ref}` : ''}`;
    router.replace(target);
  }, [router, locale, ref]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center text-zinc-400">
      <span className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mr-3" />
      <span>Cargando Plan de Pagos & Presentación...</span>
    </div>
  );
}
