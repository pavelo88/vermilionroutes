'use client';

import React, { useState, useEffect } from 'react';
import { Award, Shield, Globe, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSettings } from '@/hooks/useSettings';
import { useLocale, useTranslations } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

export function StatsSection() {
  const [mounted, setMounted] = useState(false);
  const { settings } = useSettings();
  const locale = useLocale();
  const t = useTranslations('hero'); // Assuming you might need translations for static texts like 'Explore Tours'

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

  if (!mounted) return null;

  return (
    <section className="bg-zinc-950 border-b border-zinc-900 relative z-10 w-full py-4 px-4 sm:px-6 lg:px-8 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">

        {/* Compact Stat 1 */}
        <div className="flex-1 min-w-[140px] flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Globe className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-white font-oswald font-bold text-lg leading-none mb-1">{getLocalizedText(settings?.about?.metric1Val, locale) || '+500'}</div>
            <p className="text-[10px] text-zinc-400 uppercase tracking-wider leading-none">{getLocalizedText(settings?.about?.metric1Lbl, locale) || 'Curated Expeditions'}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-zinc-800" />

        {/* Compact Stat 2 */}
        <div className="flex-1 min-w-[140px] flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Award className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-white font-oswald font-bold text-lg leading-none mb-1">{getLocalizedText(settings?.about?.metric2Val, locale) || '+10'}</div>
            <p className="text-[10px] text-zinc-400 uppercase tracking-wider leading-none">{getLocalizedText(settings?.about?.metric2Lbl, locale) || 'Years of Expertise'}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-zinc-800" />

        {/* Compact Stat 3 (Clickable) */}
        <div
          onClick={scrollToReviews}
          role="button"
          tabIndex={0}
          className="flex-1 min-w-[140px] flex items-center gap-3 p-2 rounded-lg hover:bg-emerald-900/30 transition-colors group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Users className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-emerald-400 font-oswald font-bold text-lg leading-none mb-1">{getLocalizedText(settings?.about?.metric3Val, locale) || '99%'}</div>
            <p className="text-[10px] text-emerald-100/70 uppercase tracking-wider leading-none">{getLocalizedText(settings?.about?.metric3Lbl, locale) || '5-Star Satisfaction'}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-zinc-800" />

        {/* Compact Stat 4 */}
        <div className="flex-1 min-w-[140px] flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-white font-oswald font-bold text-lg leading-none mb-1">{getLocalizedText(settings?.about?.metric4Val, locale) || '100%'}</div>
            <p className="text-[10px] text-zinc-400 uppercase tracking-wider leading-none">{getLocalizedText(settings?.about?.metric4Lbl, locale) || 'Secure Payments'}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-8 bg-zinc-800" />

        {/* Action Button */}
        <div className="flex-1 min-w-[200px] flex justify-center lg:justify-end mt-2 lg:mt-0">
          <Button
            onClick={scrollToTours}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-8 py-6 uppercase tracking-widest text-xs font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] gap-2 group"
          >
            {t('exploreTours') || 'Explore Tours'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

      </div>
    </section>
  );
}
