'use client';

import React, { useState } from 'react';
import { useToursData } from '@/hooks/useToursData';
import { TourCarousel } from '@/components/home/TourCarousel';
import { LuxuryTourGrid } from '@/components/home/LuxuryTourGrid';
import { Button } from '@/components/ui/Button';
import { Sparkles, ArrowRight, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function FeaturedTours() {
  const { tours } = useToursData();
  const t = useTranslations('tours');
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');

  return (
    <section id="tours" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* View Switcher Bar */}
      <div className="flex items-center justify-end gap-2 max-w-7xl mx-auto px-2">
        <button
          suppressHydrationWarning
          onClick={() => setViewMode('grid')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            viewMode === 'grid'
              ? 'bg-[#8F1010] text-white shadow-md'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Vista Editorial</span>
        </button>
        <button
          suppressHydrationWarning
          onClick={() => setViewMode('carousel')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            viewMode === 'carousel'
              ? 'bg-[#8F1010] text-white shadow-md'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Vista Carrusel</span>
        </button>
      </div>

      {viewMode === 'grid' ? (
        <LuxuryTourGrid tours={tours} />
      ) : (
        <>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200/80 dark:border-red-900/50 text-xs font-semibold text-[#8F1010] dark:text-red-300">
              <Sparkles className="w-3.5 h-3.5 text-[#8F1010]" />
              <span>{t('badge')}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {t('title')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
          <TourCarousel tours={tours} />
        </>
      )}

      {/* Tailor-Made CTA Box */}
      <div className="mt-16 bg-gradient-to-r from-zinc-900 via-zinc-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-xl relative z-10 text-center md:text-left">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
            {t('cta.label')}
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
            {t('cta.title')}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {t('cta.subtitle')}
          </p>
        </div>

        <Button 
          variant="primary" 
          size="lg" 
          className="relative z-10 shrink-0 gap-2 shadow-lg shadow-emerald-600/30"
          onClick={() => window.location.href = '#contact'}
        >
          <span>{t('cta.button')}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}


