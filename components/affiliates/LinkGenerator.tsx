'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Copy, Check, ExternalLink, LinkIcon, Globe, Map, CalendarCheck, Compass } from 'lucide-react';
import { mockTours } from '@/data/mock';

const TOURS_LIST = mockTours
  .filter(t => (t.durationDays ?? 0) > 1)
  .map(t => ({
    id: t.id,
    label: typeof t.title === 'string' ? t.title : (t.title as any)?.en || t.id,
    labelEs: typeof t.title === 'string' ? t.title : (t.title as any)?.es || t.id,
  }))
  .slice(0, 9); // top 9 multi-day tours

type LinkType = 'home' | 'tours' | 'booking' | 'tour';

interface LinkGeneratorProps {
  username: string;
}

export function LinkGenerator({ username }: LinkGeneratorProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const BASE = 'https://vermilionroutes.com';

  const [linkType, setLinkType] = useState<LinkType>('booking');
  const [selectedTour, setSelectedTour] = useState(TOURS_LIST[0]?.id || '');
  const [copied, setCopied] = useState(false);

  const generatedUrl = (() => {
    switch (linkType) {
      case 'home':    return `${BASE}/${locale}?vid=${username}`;
      case 'tours':   return `${BASE}/${locale}/tours?vid=${username}`;
      case 'booking': return `${BASE}/${locale}/booking?vid=${username}`;
      case 'tour':    return `${BASE}/${locale}/booking?tourId=${selectedTour}&vid=${username}`;
    }
  })();

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const TYPE_OPTIONS: { id: LinkType; labelEs: string; labelEn: string; icon: React.ComponentType<{ className?: string }>; desc: string; descEs: string }[] = [
    {
      id: 'booking',
      icon: CalendarCheck,
      labelEs: 'Reserva Directa',
      labelEn: 'Direct Booking',
      desc: 'Best conversion rate. Opens the booking wizard directly.',
      descEs: 'Máxima conversión. Abre el cotizador directamente.',
    },
    {
      id: 'tours',
      icon: Map,
      labelEs: 'Catálogo de Tours',
      labelEn: 'Tours Catalog',
      desc: 'Great for inspiration. Shows the full magazine-style tour catalog.',
      descEs: 'Ideal para inspirar. Muestra la revista de expediciones.',
    },
    {
      id: 'tour',
      icon: Compass,
      labelEs: 'Tour Específico',
      labelEn: 'Specific Tour',
      desc: 'Best for warm leads. Opens booking with your chosen tour pre-selected.',
      descEs: 'Para leads calientes. El tour queda pre-seleccionado en el cotizador.',
    },
    {
      id: 'home',
      icon: Globe,
      labelEs: 'Página Principal',
      labelEn: 'Homepage',
      desc: 'Cookie saved for 30 days. Great for social media bios.',
      descEs: 'Cookie de 30 días. Perfecto para bios y redes sociales.',
    },
  ];

  const selected = TYPE_OPTIONS.find(o => o.id === linkType)!;

  return (
    <div className="rounded-[24px] border border-white/8 bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="h-px w-6 bg-gradient-to-r from-[#C9A84C] to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#C9A84C]">
            {isEs ? 'Herramienta de Embajador' : 'Ambassador Tool'}
          </span>
        </div>
        <h2 className="text-lg font-serif font-light text-white flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-[#C9A84C]" />
          {isEs ? 'Generador de Enlace Inteligente' : 'Smart Link Generator'}
        </h2>
        <p className="text-xs text-[#6B6B6B] mt-1">
          {isEs
            ? 'Crea el enlace perfecto para cada situación. Tu ID queda guardado en la cookie del cliente por 30 días.'
            : 'Create the perfect link for every situation. Your ID is stored in the client\'s cookie for 30 days.'}
        </p>
      </div>

      {/* Step 1: Type selection */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">
          {isEs ? '1. Elige el destino del enlace' : '1. Choose link destination'}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {TYPE_OPTIONS.map(opt => {
            const Icon = opt.icon;
            const isActive = linkType === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setLinkType(opt.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl border text-left text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#C9A84C] to-[#8B6914] border-[#C9A84C]/50 text-[#0A0A0F] shadow-lg shadow-[#C9A84C]/20'
                    : 'border-white/8 bg-white/[0.03] text-[#A9A9A9] hover:border-[#C9A84C]/30 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0A0A0F]' : 'text-[#C9A84C]'}`} />
                <span>{isEs ? opt.labelEs : opt.labelEn}</span>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-[#5A5A5A] pl-1 italic">
          {isEs ? selected.descEs : selected.desc}
        </p>
      </div>

      {/* Step 2: Tour selector */}
      {linkType === 'tour' && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">
            {isEs ? '2. Selecciona el tour' : '2. Select the tour'}
          </p>
          <select
            value={selectedTour}
            onChange={e => setSelectedTour(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#C9A84C]/50 transition-colors cursor-pointer"
          >
            {TOURS_LIST.map(t => (
              <option key={t.id} value={t.id} className="bg-zinc-900 text-white">
                {isEs ? t.labelEs : t.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Generated Link */}
      <div className="space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">
          {isEs ? 'Tu enlace generado' : 'Your generated link'}
        </p>

        <div className="bg-[#050508] rounded-2xl p-4 border border-[#C9A84C]/15 relative overflow-hidden">
          {/* Subtle gold shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
          <p className="font-mono text-xs text-[#C9A84C] break-all leading-relaxed tracking-wide">{generatedUrl}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-3 bg-gradient-to-r from-[#C9A84C] via-[#F5D78A] to-[#B8860B] hover:from-[#D4AF37] hover:to-[#9A6E0A] text-[#0A0A0F] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (isEs ? '¡Copiado!' : 'Copied!') : (isEs ? 'Copiar Enlace' : 'Copy Link')}</span>
          </button>
          <a
            href={generatedUrl}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl border border-white/10 bg-white/[0.03] text-[#6B6B6B] hover:text-white hover:border-[#C9A84C]/30 transition-all"
            title={isEs ? 'Probar enlace' : 'Test link'}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
