'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function NetworkRedirect() {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    router.replace(`/${locale}/affiliates/network`);
  }, [router, locale]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center text-zinc-400">
      <span className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mr-3" />
      <span>Redirigiendo a tu red de afiliados...</span>
    </div>
  );
}
