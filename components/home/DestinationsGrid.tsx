'use client';

import React from 'react';
import Image from 'next/image';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';
import { useDestinationsData } from '@/hooks/useDestinationsData';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

export function DestinationsGrid() {
  const { destinations } = useDestinationsData();
  const t = useTranslations('destinations');
  const tTour = useTranslations('tours');
  const locale = useLocale();

  const handleDestinationClick = (destId: string) => {
    const filterMap: Record<string, string> = {
      galapagos: 'Galapagos',
      ecuador: 'Ecuador',
      peru: 'Peru',
    };
    const targetFilter = filterMap[destId.toLowerCase()] || 'all';
    window.dispatchEvent(new CustomEvent('selectDestinationFilter', { detail: targetFilter }));
    const toursSection = document.getElementById('tours');
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="destinations" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-800">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('badge')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {t('title')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <a href="#tours" className="shrink-0">
          <button suppressHydrationWarning className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-300">
            <span suppressHydrationWarning>{t('cta')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            id={dest.id.toLowerCase()}
            onClick={() => handleDestinationClick(dest.id)}
            className="group relative h-[420px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-end p-8 border border-zinc-200/50 cursor-pointer"
          >
            <Image
              src={dest.imageUrl}
              alt={getLocalizedText(dest.name, locale)}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10 space-y-3 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 inline-block">
                {dest.toursCount} {tTour('journeys')}
              </span>

              <h3 className="font-serif text-3xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                {getLocalizedText(dest.name, locale)}
              </h3>

              <p className="text-xs font-medium text-emerald-200">{getLocalizedText(dest.subtitle, locale)}</p>

              <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed font-normal">
                {getLocalizedText(dest.description, locale)}
              </p>

              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {t('cta')} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
