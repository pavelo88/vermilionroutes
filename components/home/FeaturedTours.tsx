'use client';

import React from 'react';
import { useToursData } from '@/hooks/useToursData';
import { TourCarousel } from '@/components/home/TourCarousel';
import { Button } from '@/components/ui/Button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Link from 'next/link';
import { useLocale } from 'next-intl';

export function FeaturedTours() {
  const { tours } = useToursData();
  const t = useTranslations('tours');
  const locale = useLocale();

  return (
    <section id="tours" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-800">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t('badge')}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
          {t('title')}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      {/* 3D Tour Carousel */}
      <TourCarousel tours={tours} />

      {/* Ver Todos los Tours Button */}
      <div className="flex justify-center pt-2">
        <Link
          href={`/${locale}/tours`}
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded-2xl transition-all duration-300 shadow-xl shadow-emerald-900/30 hover:scale-[1.02] active:scale-95 group border-none"
        >
          <span>Ver Todos los Tours</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

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


