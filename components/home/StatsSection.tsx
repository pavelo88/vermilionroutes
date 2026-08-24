'use client';

import React, { useState, useEffect } from 'react';
import { Award, Shield, Globe, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSettings } from '@/hooks/useSettings';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

export function StatsSection() {
  const [mounted, setMounted] = useState(false);
  const { settings } = useSettings();
  const locale = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('experience');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTours = () => {
    const el = document.getElementById('tours');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const defaultLabels: Record<string, [string, string, string, string]> = {
    es: ['Expediciones a Medida', 'Años de Experiencia', 'Satisfacción 5 Estrellas', 'Atención Concierge 24/7'],
    en: ['Bespoke & Tailor-Made', 'Field Travel Expertise', '5-Star Satisfaction', 'On-Trip Concierge Care'],
    zh: ['100% 量身定制', '15+ 年专业路线经验', '99% 客户满意度', '24/7 礼宾关怀'],
    fr: ['Sur Mesure & Personnalisé', 'Années d\'Expertise', 'Satisfaction 5 Étoiles', 'Service Concierge 24/7'],
    de: ['Maßgeschneiderte Reisen', 'Jahrelange Erfahrung', '5-Sterne-Zufriedenheit', '24/7 Concierge-Betreuung'],
    it: ['Su Misura e Personalizzato', 'Anni di Esperienza', 'Soddisfazione a 5 Stelle', 'Assistenza Concierge 24/7'],
    pt: ['Sob Medida & Personalizado', 'Anos de Experiência', 'Satisfação 5 Estrelas', 'Atendimento Concierge 24/7'],
    ja: ['100% オーダーメイド', '長年の専門知識', '五つ星の満足度', '24/7 コンシェルジュケア']
  };

  const labels = defaultLabels[locale] || defaultLabels['en'];

  const getLabel = (settingVal: any, fallbackIdx: number) => {
    if (settingVal && typeof settingVal === 'object') {
      return getLocalizedText(settingVal, locale);
    }
    return labels[fallbackIdx];
  };

  return (
    <section className="bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-900 relative z-10 w-full py-3.5 px-3 sm:px-6 lg:px-8 shadow-xl">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:flex md:items-center md:justify-between gap-2.5 md:gap-4">

        {/* 🌟 1. MOBILE TOP FULL WIDTH / DESKTOP STAT 3: TRIPADVISOR 5.0 (SÚPER RESALTADO) 🌟 */}
        <a
          href="https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-2 md:col-span-1 order-1 md:order-3 flex items-center justify-between sm:justify-start gap-3 p-3 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-emerald-500/25 dark:from-emerald-500/25 dark:via-teal-500/20 dark:to-emerald-500/30 border border-emerald-500/50 hover:border-emerald-400 shadow-md shadow-emerald-950/20 transition-all hover:scale-102 group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-600/40">
              <svg className="w-5 h-5 fill-white text-white" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2.4c1.8 0 3.4.6 4.7 1.6-1.2.8-2.9 1.4-4.7 1.4s-3.5-.6-4.7-1.4C8.6 5 10.2 4.4 12 4.4zM6.8 9.2c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2S3.6 14.2 3.6 12.4s1.4-3.2 3.2-3.2zm10.4 0c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.2-1.4-3.2-3.2 1.4-3.2 3.2-3.2zm-10.4 1.6c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zm10.4 0c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zM12 11.5c.8 0 1.5.4 1.7 1.1-.5.3-1.1.4-1.7.4s-1.2-.1-1.7-.4c.2-.7.9-1.1 1.7-1.1z" />
              </svg>
            </div>
            <div>
              <div className="text-emerald-800 dark:text-emerald-300 font-oswald font-bold text-lg leading-none mb-1 flex items-center gap-1.5">
                <span>5.0 / 5.0</span>
                <span className="text-[10px] font-sans font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-700 text-white shadow-xs">
                  TripAdvisor
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-amber-500 font-bold tracking-tight">★★★★★</span>
                <p className="text-[10px] font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider leading-none">
                  Travelers' Choice 2026 Winner
                </p>
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:translate-x-1 transition-transform" />
        </a>

        {/* Divider (Desktop) */}
        <div className="hidden md:block w-px h-8 bg-zinc-200 dark:bg-zinc-800 order-2" />

        {/* 2. STAT IZQUIERDA: +15 AÑOS DE EXPERIENCIA */}
        <div className="col-span-1 order-2 md:order-2 flex items-center gap-2.5 sm:gap-3 p-2.5 rounded-xl bg-zinc-50 dark:bg-white/5 md:bg-transparent md:dark:bg-transparent hover:bg-zinc-100/70 dark:hover:bg-white/10 transition-colors group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="text-zinc-900 dark:text-white font-oswald font-bold text-base sm:text-lg leading-none mb-1">
              {getLocalizedText(settings?.about?.metric2Val, locale) || '+15 Yrs'}
            </div>
            <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider leading-none">
              {getLabel(settings?.about?.metric2Lbl, 1)}
            </p>
          </div>
        </div>

        {/* Divider (Desktop) */}
        <div className="hidden md:block w-px h-8 bg-zinc-200 dark:bg-zinc-800 order-2" />

        {/* 3. STAT DERECHA: 24/7 EXPEDICIONES & ATENCIÓN A MEDIDA */}
        <div className="col-span-1 order-3 md:order-4 flex items-center gap-2.5 sm:gap-3 p-2.5 rounded-xl bg-zinc-50 dark:bg-white/5 md:bg-transparent md:dark:bg-transparent hover:bg-zinc-100/70 dark:hover:bg-white/10 transition-colors group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="text-zinc-900 dark:text-white font-oswald font-bold text-base sm:text-lg leading-none mb-1">
              {getLocalizedText(settings?.about?.metric4Val, locale) || '24/7'}
            </div>
            <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider leading-none">
              {locale === 'es' ? 'Expediciones a Medida' : 'Bespoke Journeys Care'}
            </p>
          </div>
        </div>

        {/* 4. STAT 100% BESPOKE (DESKTOP ONLY) */}
        <div className="hidden md:flex items-center gap-2.5 sm:gap-3 p-2.5 rounded-xl hover:bg-zinc-100/70 dark:hover:bg-white/10 transition-colors group order-1">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="text-zinc-900 dark:text-white font-oswald font-bold text-base sm:text-lg leading-none mb-1">
              {getLocalizedText(settings?.about?.metric1Val, locale) || '100%'}
            </div>
            <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider leading-none">
              {getLabel(settings?.about?.metric1Lbl, 0)}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
