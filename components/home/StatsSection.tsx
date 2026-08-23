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
    <section className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-900 relative z-10 w-full py-4 px-4 sm:px-6 lg:px-8 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">

        {/* Compact Stat 1 */}
        <div className="flex-1 min-w-[140px] flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-100/50 dark:hover:bg-white/5 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="text-zinc-900 dark:text-white font-oswald font-bold text-lg leading-none mb-1">{getLocalizedText(settings?.about?.metric1Val, locale) || '100%'}</div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider leading-none">{getLabel(settings?.about?.metric1Lbl, 0)}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-zinc-200 dark:bg-zinc-800" />

        {/* Compact Stat 2 */}
        <div className="flex-1 min-w-[140px] flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-100/50 dark:hover:bg-white/5 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="text-zinc-900 dark:text-white font-oswald font-bold text-lg leading-none mb-1">{getLocalizedText(settings?.about?.metric2Val, locale) || '+15 Yrs'}</div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider leading-none">{getLabel(settings?.about?.metric2Lbl, 1)}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-zinc-200 dark:bg-zinc-800" />

        {/* Compact Stat 3 (Clickable TripAdvisor Score) */}
        <div
          onClick={scrollToReviews}
          role="button"
          tabIndex={0}
          className="flex-1 min-w-[140px] flex items-center gap-3 p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.2)] dark:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2.4c1.8 0 3.4.6 4.7 1.6-1.2.8-2.9 1.4-4.7 1.4s-3.5-.6-4.7-1.4C8.6 5 10.2 4.4 12 4.4zM6.8 9.2c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2S3.6 14.2 3.6 12.4s1.4-3.2 3.2-3.2zm10.4 0c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.2-1.4-3.2-3.2 1.4-3.2 3.2-3.2zm-10.4 1.6c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zm10.4 0c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zM12 11.5c.8 0 1.5.4 1.7 1.1-.5.3-1.1.4-1.7.4s-1.2-.1-1.7-.4c.2-.7.9-1.1 1.7-1.1z" />
            </svg>
          </div>
          <div>
            <div className="text-emerald-600 dark:text-emerald-400 font-oswald font-bold text-lg leading-none mb-1 flex items-center gap-1">
              <span>{getLocalizedText(settings?.about?.metric3Val, locale) || '4.9/5'}</span>
              <span className="text-[10px] font-sans font-semibold text-emerald-700 dark:text-emerald-300">TripAdvisor</span>
            </div>
            <p className="text-[10px] text-emerald-700/80 dark:text-emerald-100/70 uppercase tracking-wider leading-none">{getLabel(settings?.about?.metric3Lbl, 2)}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-zinc-200 dark:bg-zinc-800" />

        {/* Compact Stat 4 */}
        <div className="flex-1 min-w-[140px] flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-100/50 dark:hover:bg-white/5 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="text-zinc-900 dark:text-white font-oswald font-bold text-lg leading-none mb-1">{getLocalizedText(settings?.about?.metric4Val, locale) || '24/7'}</div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider leading-none">{getLabel(settings?.about?.metric4Lbl, 3)}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
