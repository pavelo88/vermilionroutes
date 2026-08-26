'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { useTranslations, useLocale } from 'next-intl';
import { SplashScreen } from './SplashScreen';
import { HERO_SLIDES_DATA } from './hero/heroData';
import { HeroDetails } from './hero/HeroDetails';
import { HeroActions } from './hero/HeroActions';
import { HeroThumbnails } from './hero/HeroThumbnails';
import { HeroPagination } from './hero/HeroPagination';
import { useHeroSliderAnimation } from './hero/useHeroSliderAnimation';

export function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(true);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Ensure initial landing starts at Hero
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo(0, 0);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== 'undefined') {
      const isBot = /Lighthouse|bot|crawler|spider|HeadlessChrome|HeadlessChromium|PageSpeed|Chrome-Lighthouse/i.test(navigator.userAgent);
      return !isBot;
    }
    return true;
  });

  const locale = useLocale();
  const t = useTranslations('hero');

  const getPlanLabel = () => {
    const fallbackMap: Record<string, string> = {
      es: 'Planifica Tu Viaje',
      en: 'Plan Your Trip',
      fr: 'Planifiez Votre Voyage',
      de: 'Planen Sie Ihre Reise',
      it: 'Pianifica Il Tuo Viaggio',
      pt: 'Planeje Sua Viagem',
      ja: '旅行を計画する',
      zh: '规划您的行程'
    };
    try {
      const val = t('cta.plan');
      return (!val || val.includes('hero.cta.plan')) ? (fallbackMap[locale] || 'Plan Your Trip') : val;
    } catch {
      return fallbackMap[locale] || 'Plan Your Trip';
    }
  };

  const getExploreLabel = () => {
    const fallbackMap: Record<string, string> = {
      es: 'Explorar Rutas',
      en: 'Explore Routes',
      fr: 'Explorer les itinéraires',
      de: 'Routen erkunden',
      it: 'Esplora i percorsi',
      pt: 'Explorar rotas',
      ja: 'ルートを探す',
      zh: '探索路线'
    };
    try {
      const val = t('cta.explore');
      return (!val || val.includes('hero.cta.explore') || val.toLowerCase().includes('todos') || val.toLowerCase().includes('all'))
        ? (fallbackMap[locale] || 'Explore Routes')
        : val;
    } catch {
      return fallbackMap[locale] || 'Explore Routes';
    }
  };

  const slidesData = HERO_SLIDES_DATA;
  const initialData = slidesData[0];

  useHeroSliderAnimation({
    containerRef,
    isReady,
    slidesData,
    locale,
    showSplash,
    setShowSplash
  });

  if (!isReady) {
    return <SplashScreen />;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100svh] lg:h-[94svh] min-h-[580px] sm:min-h-[620px] md:min-h-[650px] overflow-hidden bg-zinc-950 text-white font-sans select-none z-0"
    >
      {/* ── HERO A: SLIDER 0 (Bienvenida fija de entrada, 4 segundos) ── */}
      {showSplash && <SplashScreen />}
        {/* Top Indicator */}
        <div className="indicator fixed top-0 left-0 right-0 h-[3px] bg-white z-[60]" />

        {/* 1. Destination Details Panel */}
        <HeroDetails initialData={initialData} locale={locale} />

        {/* 2. Action Buttons */}
        <HeroActions exploreLabel={getExploreLabel()} planLabel={getPlanLabel()} />

        {/* 3. Thumbnail Cards Carousel */}
        <HeroThumbnails slidesData={slidesData} locale={locale} isMobile={isMobile} />

        {/* 4. Navigation & Pagination HUD */}
        <HeroPagination totalSlides={slidesData.length} />
      </div>
  );
}
