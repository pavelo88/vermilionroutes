'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function OperatorPage() {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    // Redirección canónica al nuevo centro unificado de operaciones en /admin
    router.replace(`/${locale}/admin?tab=operations`);
  }, [router, locale]);

  return (
    <div className="min-h-screen bg-[#07110B] flex flex-col items-center justify-center space-y-3">
      <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      <p className="text-xs text-zinc-400 font-mono tracking-wider uppercase">
        Conectando con el Centro de Mando Vermilion...
      </p>
    </div>
  );
}
