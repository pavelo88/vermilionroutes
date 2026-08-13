'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Award, Heart, Compass, ArrowRight } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

export function AboutSection() {
  const { settings } = useSettings();
  const locale = useLocale();

  return (
    <section id="about-us" className="w-full">
      <div className="flex flex-col gap-8 items-start">
        {/* Text Content */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-800">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>{getLocalizedText(settings?.about?.subtitle, locale) || 'About Vermilion Routes'}</span>
            </div>
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Certified Destination Operator</span>
            </div>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight">
            {getLocalizedText(settings?.about?.title, locale) || 'Crafting Unforgettable Expeditions in the Heart of South America'}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            {getLocalizedText(settings?.about?.paragraph1, locale) || 'Vermilion Routes was founded with a passion to elevate how discerning global travelers discover Ecuador, the Galapagos, and the Amazon. We craft bespoke journeys that manage every logistical detail seamlessly—pairing boutique exclusivity with deep, respectful cultural and wildlife immersion.'}
          </p>

          <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
            {getLocalizedText(settings?.about?.paragraph2, locale) || ''}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 shadow-sm space-y-1">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>{getLocalizedText(settings?.about?.metric1Lbl, locale) || 'Guaranteed & Flexible Travel'}</span>
              </div>
              <p className="text-xs text-zinc-500">
                {getLocalizedText(settings?.about?.metric1Val, locale) || 'Book with confidence knowing you have 100% flexible booking policies.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 shadow-sm space-y-1">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>{getLocalizedText(settings?.about?.metric2Lbl, locale) || 'Sustainable Local Impact'}</span>
              </div>
              <p className="text-xs text-zinc-500">
                {getLocalizedText(settings?.about?.metric2Val, locale) || 'We actively support indigenous artisan communities and ecological projects.'}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <a href="#contact">
              <Button variant="primary" size="md" className="gap-2">
                <span>Speak with a Travel Specialist</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
