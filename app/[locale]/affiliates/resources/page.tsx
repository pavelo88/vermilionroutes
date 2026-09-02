'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getAffiliateByEmail, AffiliateAccount } from '@/lib/affiliates';
import { LinkGenerator } from '@/components/affiliates/LinkGenerator';
import { Image as ImageIcon, Download } from 'lucide-react';

const VISUAL_ASSETS = [
  {
    id: 'asset-1',
    titleEs: 'Dossier Vermilion Routes (PDF)',
    descEs: 'Presentación completa de nuestros tours para enviar a clientes potenciales.',
    titleEn: 'Vermilion Routes Dossier (PDF)',
    descEn: 'Complete presentation of our tours to send to potential clients.',
    url: '/assets/vermilion-dossier-2026.pdf', // placeholder
  },
  {
    id: 'asset-2',
    titleEs: 'Pack de Fotos de Alta Resolución',
    descEs: 'Imágenes profesionales de Galápagos y los Andes para tus redes sociales.',
    titleEn: 'High-Resolution Photo Pack',
    descEn: 'Professional images of Galápagos and the Andes for your social media.',
    url: '/assets/vermilion-photo-pack.zip', // placeholder
  },
];

export default function ResourcesPage() {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [affiliate, setAffiliate] = useState<AffiliateAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        try {
          const aff = await getAffiliateByEmail(user.email);
          setAffiliate(aff);
        } catch { /* ignore */ }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const username = affiliate?.username || 'embajador';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" />
          <span className="text-[10px] text-[#A9A9A9] tracking-widest uppercase">
            {isEs ? 'Cargando recursos...' : 'Loading resources...'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-gradient-to-r from-[#C9A84C] to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-medium">
            {isEs ? 'Portal de Embajadores' : 'Ambassador Portal'}
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight">
          {isEs ? 'Recursos de Venta' : 'Sales Resources'}
        </h1>
        <p className="text-sm text-[#6B6B6B] mt-2 font-light">
          {isEs
            ? 'Herramientas de conversión premium para creadores.'
            : 'Premium conversion tools for creators.'}
        </p>
      </div>

      {/* 1. Link Generator */}
      <div>
        <h2 className="text-[11px] font-semibold text-[#A9A9A9] uppercase tracking-[0.15em] mb-4">
          {isEs ? 'Herramientas de Enlace' : 'Link Tools'}
        </h2>
        <LinkGenerator username={username} />
      </div>

      {/* 2. Visual Assets */}
      <div>
        <h2 className="text-[11px] font-semibold text-[#A9A9A9] uppercase tracking-[0.15em] mb-4 mt-8">
          {isEs ? 'Material Visual' : 'Visual Assets'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VISUAL_ASSETS.map((asset) => (
            <div
              key={asset.id}
              className="p-5 rounded-[20px] bg-white/[0.03] border border-white/8 backdrop-blur-sm group hover:border-[#C9A84C]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <ImageIcon className="w-4.5 h-4.5 text-[#A9A9A9]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#C9A84C] transition-colors">
                    {isEs ? asset.titleEs : asset.titleEn}
                  </h3>
                  <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                    {isEs ? asset.descEs : asset.descEn}
                  </p>
                </div>
              </div>
              <button
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/5 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#C9A84C]" />
                {isEs ? 'Descargar (Próximamente)' : 'Download (Coming Soon)'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
