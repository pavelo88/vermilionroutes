'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Compass, ArrowRight, Menu } from 'lucide-react';
import { mockDestinations } from '@/data/mock';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

// Curated high-resolution image pools per destination category (Vertical 9:16 aspect ratio)
const DESTINATION_IMAGE_POOLS: Record<string, string[]> = {
  ecuador: [
    '/images/tours/9-16/cajas-national-park-9-16.jpg',
    '/images/tours/9-16/pailon-diablo-9-16.jpg',
    '/images/tours/9-16/chimborazo-9-16.jpg',
    '/images/tours/9-16/amazon-waterfall-9-16.jpg',
    '/images/tours/9-16/cuenca-colonial-9-16.jpg',
  ],
  galapagos: [
    '/images/tours/9-16/galapagos-tortuga-gigante-9-16.jpg',
    '/images/tours/9-16/galapagos-snorkeling-9-16.jpg',
    '/images/tours/9-16/galapagos-loberia-9-16.jpg',
    '/images/tours/9-16/galapagos-piquero-patas-azules-9-16.jpg',
    '/images/tours/9-16/galapagos-las-grietas-9-16.jpg',
  ],
  combined: [
    '/images/tours/9-16/cotopaxi-9-16.jpg',
    '/images/tours/9-16/galapagos-piquero-patas-azules-9-16.jpg',
    '/images/tours/9-16/galapagos-snorkeling-9-16.jpg',
    '/images/tours/9-16/chimborazo-9-16.jpg',
    '/images/tours/9-16/galapagos-tortuga-gigante-9-16.jpg',
  ],
  'full-day': [
    '/images/tours/9-16/quito-centro-historico.jpg',
    '/images/tours/9-16/quilotoa-9-16.jpg',
    '/images/tours/9-16/otavalo-market-9-16.jpg',
    '/images/tours/9-16/mindo-9-16.jpg',
    '/images/tours/9-16/cotopaxi-9-16.jpg',
  ],
};

export function DestinationsGrid() {
  const destinations = mockDestinations;
  const t = useTranslations('destinations');
  const tTour = useTranslations('tours');
  const locale = useLocale();

  const [activeDestId, setActiveDestId] = useState<string>('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Track active image index per destination card
  const [cardImageIndices, setCardImageIndices] = useState<Record<string, number>>({
    ecuador: 0,
    galapagos: 0,
    combined: 0,
    'full-day': 0,
  });

  const stepRef = useRef<number>(0);

  // Staggered interval: alternates one destination card every 2.4 seconds
  useEffect(() => {
    if (!destinations || destinations.length === 0) return;

    const interval = setInterval(() => {
      if (document.hidden) return;

      const cardOrder = ['ecuador', 'galapagos', 'combined', 'full-day'];
      const targetCardId = cardOrder[stepRef.current % cardOrder.length];
      stepRef.current += 1;

      setCardImageIndices((prev) => {
        const pool = DESTINATION_IMAGE_POOLS[targetCardId] || [];
        if (pool.length === 0) return prev;
        const nextIdx = ((prev[targetCardId] || 0) + 1) % pool.length;
        return {
          ...prev,
          [targetCardId]: nextIdx,
        };
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [destinations]);

  const handleDestinationClick = (destId: string) => {
    setActiveDestId(destId);
    const filterMap: Record<string, string> = {
      ecuador: 'Ecuador',
      galapagos: 'Galapagos',
      combined: 'Combined',
      'full-day': 'FullDay',
    };
    const targetFilter = filterMap[destId.toLowerCase()] || 'all';
    window.dispatchEvent(new CustomEvent('selectDestinationFilter', { detail: targetFilter }));
    const toursSection = document.getElementById('tours');
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!destinations || destinations.length === 0) return null;

  return (
    <section
      id="destinations"
      className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-500/30 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="tracking-wide uppercase text-[11px] font-bold">{t('badge')}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {t('title')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xl">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3.5 py-1.5 rounded-full border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs self-start sm:self-end">
          <span>{destinations.length} {locale === 'es' ? 'Destinos Exclusivos' : 'Signature Regions'}</span>
        </div>
      </div>

      {/* ── Visual Destinations 4-Grid Stage with Staggered Dynamic Images ── */}
      <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
        {destinations.map((dest, destIndex) => {
          const pool = DESTINATION_IMAGE_POOLS[dest.id] || [dest.imageUrl];
          const activeIndex = cardImageIndices[dest.id] ?? 0;

          return (
            <div
              key={dest.id}
              id={dest.id.toLowerCase()}
              onClick={() => handleDestinationClick(dest.id)}
              className="group relative h-[420px] sm:h-[440px] md:h-[460px] w-[290px] xs:w-[320px] md:w-auto shrink-0 snap-center rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-500/80 transition-all duration-500 flex flex-col justify-between p-5 sm:p-6 cursor-pointer hover:-translate-y-1 bg-zinc-950"
            >
              {/* Dynamic Layered Images with Seamless Crossfade & Subtle Ken Burns Zoom */}
              {pool.map((imgSrc, imgIdx) => {
                const isCurrent = imgIdx === activeIndex;
                return (
                  <div
                    key={`${dest.id}-img-${imgIdx}-${imgSrc}`}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      isCurrent
                        ? 'opacity-100 scale-100 z-0 pointer-events-none'
                        : 'opacity-0 scale-105 pointer-events-none -z-10'
                    }`}
                  >
                    <Image
                      src={imgSrc}
                      alt={getLocalizedText(dest.name, locale)}
                      fill
                      quality={95}
                      priority={destIndex < 2 && imgIdx === 0}
                      sizes="(max-width: 640px) 320px, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                );
              })}

              {/* Luxury Cinematic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 z-[1] pointer-events-none" />

              {/* Top Badge Info */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 shadow-sm">
                  {dest.toursCount} {tTour('journeys')}
                </span>

                <div className="flex items-center gap-1.5">
                  {/* Subtle dots showing image rotation progress */}
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                    {pool.map((_, dotIdx) => (
                      <span
                        key={`dot-${dotIdx}`}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                          dotIdx === activeIndex
                            ? 'bg-emerald-400 w-3'
                            : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-mono font-bold border border-white/20">
                    0{destIndex + 1}
                  </span>
                </div>
              </div>

              {/* Bottom Content inside Card */}
              <div className="relative z-10 space-y-2 text-white">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight drop-shadow-md">
                  {getLocalizedText(dest.name, locale)}
                </h3>

                <p className="text-xs sm:text-sm font-medium text-emerald-300 line-clamp-1 drop-shadow">
                  {getLocalizedText(dest.subtitle, locale)}
                </p>

                <p className="text-xs text-zinc-200 line-clamp-5 leading-relaxed font-normal drop-shadow">
                  {getLocalizedText(dest.description, locale)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}

