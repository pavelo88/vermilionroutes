'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Compass, ArrowRight, Menu } from 'lucide-react';
import { mockDestinations } from '@/data/mock';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

export function DestinationsGrid() {
  const destinations = mockDestinations;
  const t = useTranslations('destinations');
  const tTour = useTranslations('tours');
  const locale = useLocale();

  const [activeDestId, setActiveDestId] = useState<string>('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

      {/* ── Visual Destinations 4-Grid Stage ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {destinations.map((dest, destIndex) => {
          return (
            <div
              key={dest.id}
              id={dest.id.toLowerCase()}
              onClick={() => handleDestinationClick(dest.id)}
              className="group relative h-[420px] sm:h-[440px] md:h-[460px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-500/80 transition-all duration-500 flex flex-col justify-between p-5 sm:p-6 cursor-pointer hover:-translate-y-1"
            >
              {/* Background Image with Zoom on Hover */}
              <Image
                src={dest.imageUrl}
                alt={getLocalizedText(dest.name, locale)}
                fill
                quality={90}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Luxury Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

              {/* Top Badge Info */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 shadow-sm">
                  {dest.toursCount} {tTour('journeys')}
                </span>

                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-mono font-bold border border-white/20">
                  0{destIndex + 1}
                </span>
              </div>

              {/* Bottom Content inside Card */}
              <div className="relative z-10 space-y-2 text-white">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight drop-shadow-md">
                  {getLocalizedText(dest.name, locale)}
                </h3>

                <p className="text-xs sm:text-sm font-medium text-emerald-300 line-clamp-1 drop-shadow">
                  {getLocalizedText(dest.subtitle, locale)}
                </p>

                <p className="text-xs text-zinc-200 line-clamp-2 leading-relaxed font-normal drop-shadow">
                  {getLocalizedText(dest.description, locale)}
                </p>

                <div className="pt-2.5 flex items-center justify-between border-t border-white/10 mt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    <span>{t('cta')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>

                  <span className="text-[11px] font-medium text-emerald-300/90 group-hover:text-emerald-300 transition-colors">
                    {locale === 'es' ? 'Ver tours →' : locale === 'fr' ? 'Voir circuits →' : locale === 'de' ? 'Touren ansehen →' : locale === 'it' ? 'Vedi tour →' : locale === 'pt' ? 'Ver passeios →' : 'View tours →'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Interactive Progress Dots & Direct Selector Pills ── */}
      <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Destination Selector Pills (Desktop) & Dropdown (Mobile) */}
        <div className="flex w-full sm:w-auto flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-2 relative">
          
          {/* Custom Mobile Dropdown */}
          <div className="sm:hidden relative w-full mb-1">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 py-3 px-5 rounded-xl text-sm font-bold shadow-sm"
            >
              <span>{destinations.find(d => d.id === activeDestId) ? getLocalizedText(destinations.find(d => d.id === activeDestId)!.name, locale) : (locale === 'es' ? 'Busca tu destino' : 'Explore by region')}</span>
              <Menu className="w-5 h-5 text-emerald-600" />
            </button>
            
            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                {destinations.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => {
                      handleDestinationClick(dest.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3 text-sm transition-colors border-b border-zinc-100 dark:border-zinc-800 last:border-0 ${
                      activeDestId === dest.id 
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold' 
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {getLocalizedText(dest.name, locale)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden sm:flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {destinations.map((dest) => {
              const isCurrent = activeDestId === dest.id;
              return (
                <button
                  suppressHydrationWarning
                  key={dest.id}
                  onClick={() => {
                    handleDestinationClick(dest.id);
                  }}
                  className={`text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold shadow-sm ring-1 ring-emerald-500/30'
                      : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {getLocalizedText(dest.name, locale)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explore All Expeditions Button */}
        <a
          href="#tours"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors"
        >
          <span>Ver todas las expediciones</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
