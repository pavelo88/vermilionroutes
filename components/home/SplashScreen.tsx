'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ShieldCheck } from 'lucide-react';
import { useLocale } from 'next-intl';

const SPLASH_TEXTS: Record<string, {
  rating: string;
  headline: string;
  subheadline: string;
  worlds: [string, string, string, string];
}> = {
  es: {
    rating: '5.0 Excelencia en TripAdvisor & Google',
    headline: 'Los Mejores Tours Privados y a Medida de Ecuador & Galápagos',
    subheadline: 'Guías Nativos Certificados • Expediciones Exclusivas',
    worlds: ['Galápagos', 'Andes', 'Amazonas', 'Pacífico']
  },
  en: {
    rating: '5.0 Rating Excellence on TripAdvisor & Google',
    headline: 'The Best Private & Tailor-Made Tours in Ecuador & Galapagos',
    subheadline: 'Certified Native Guides • Exclusive Expeditions',
    worlds: ['Galapagos', 'Andes', 'Amazon', 'Pacific']
  },
  fr: {
    rating: '5.0 Excellence sur TripAdvisor & Google',
    headline: 'Les Meilleurs Circuits Privés & Sur Mesure en Équateur et Galapagos',
    subheadline: 'Guides Locaux Certifiés • Expéditions Exclusives',
    worlds: ['Galapagos', 'Andes', 'Amazonie', 'Pacifique']
  },
  de: {
    rating: '5.0 Spitzenbewertung auf TripAdvisor & Google',
    headline: 'Die besten privaten & maßgeschneiderten Touren in Ecuador & Galapagos',
    subheadline: 'Zertifizierte einheimische Guides • Exklusive Expeditionen',
    worlds: ['Galapagos', 'Anden', 'Amazonas', 'Pazifik']
  },
  it: {
    rating: '5.0 Eccellenza su TripAdvisor & Google',
    headline: 'I Migliori Tour Privati e su Misura in Ecuador e Galapagos',
    subheadline: 'Guide Locali Certificate • Spedizioni Esclusive',
    worlds: ['Galapagos', 'Ande', 'Amazzonia', 'Pacifico']
  },
  pt: {
    rating: '5.0 Excelência no TripAdvisor & Google',
    headline: 'Os Melhores Passeios Privados e Sob Medida no Equador e Galápagos',
    subheadline: 'Guias Nativos Certificados • Expedições Exclusivas',
    worlds: ['Galápagos', 'Andes', 'Amazonas', 'Pacífico']
  },
  ja: {
    rating: 'TripAdvisor & Googleで5.0評価の卓越性',
    headline: 'エクアドル＆ガラパゴス最高のプライベート＆オーダーメイドツアー',
    subheadline: '認定ネイティブガイド • 特別なプライベート探検',
    worlds: ['ガラパゴス', 'アンデス', 'アマゾン', '太平洋']
  },
  zh: {
    rating: 'TripAdvisor与Google获5.0满分卓越好评',
    headline: '厄瓜多尔与加拉帕戈斯顶级私人定制旅行',
    subheadline: '专业持证本地向导 • 专属尊贵探险',
    worlds: ['加拉帕戈斯', '安第斯', '亚马逊', '太平洋']
  }
};

export function SplashScreen() {
  const locale = useLocale();
  const text = SPLASH_TEXTS[locale] || SPLASH_TEXTS.en;

  return (
    <div
      id="splash-screen"
      className="fixed inset-0 z-[1000] w-full h-[100svh] bg-zinc-950 overflow-hidden flex items-center justify-center pointer-events-auto"
    >
      {/* Background Image with Slow Cinematic Zoom */}
      <Image
        id="splash-bg-image"
        src="/splash-4-worlds.png"
        alt="Vermilion Routes Welcome"
        fill
        priority
        className="object-cover scale-[1.03] transition-transform duration-[5000ms] ease-out"
      />

      {/* Deep cinematic vignette & dark gradient */}
      <div
        id="splash-bg-gradient"
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/60 backdrop-blur-[1px]"
      />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto">

        {/* Top VIP Trust Badge */}
        <div
          id="splash-top-badge"
          className="mb-4 sm:mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold shadow-2xl animate-fade-in"
        >
          <div className="flex items-center gap-0.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-zinc-200">|</span>
          <span className="tracking-wide">{text.rating}</span>
        </div>

        {/* "ALL YOU NEED IS" Colorful Vibrant Typo */}
        <div id="splash-text-content" className="flex flex-col items-center justify-center mb-4 sm:mb-6">
          <div className="flex gap-3 sm:gap-5 md:gap-6 font-oswald font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            {/* ALL */}
            <div className="flex">
              <span style={{ color: '#FDB913' }}>A</span>
              <span style={{ color: '#F58220' }}>L</span>
              <span style={{ color: '#F05A28' }}>L</span>
            </div>
            {/* YOU */}
            <div className="flex">
              <span style={{ color: '#EF4136' }}>Y</span>
              <span style={{ color: '#ED1C24' }}>O</span>
              <span style={{ color: '#E6007E' }}>U</span>
            </div>
            {/* NEED */}
            <div className="flex">
              <span style={{ color: '#D21B7E' }}>N</span>
              <span style={{ color: '#B12285' }}>E</span>
              <span style={{ color: '#9C27B0' }}>E</span>
              <span style={{ color: '#673AB7' }}>D</span>
            </div>
            {/* IS */}
            <div className="flex">
              <span style={{ color: '#3F51B5' }}>I</span>
              <span style={{ color: '#2196F3' }}>S</span>
            </div>
          </div>
        </div>

        {/* Logo Card with Glassmorphism & Subtle Glow */}
        <div
          id="splash-glass-card"
          className="relative w-[280px] h-[105px] sm:w-[380px] sm:h-[135px] md:w-[480px] md:h-[160px] mb-6 sm:mb-8 bg-gradient-to-r from-emerald-950/40 via-cyan-900/30 to-emerald-950/40 backdrop-blur-lg rounded-full p-4 sm:p-5 border border-white/30 shadow-[0_12px_40px_rgba(0,0,0,0.7)] flex items-center justify-center transition-all"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/logo_inicio.png"
              alt="Vermilion Routes"
              fill
              className="object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
              priority
            />
          </div>
        </div>

        {/* Middle Impact Headline */}
        <div id="splash-headline" className="mb-4 space-y-1">
          <p className="text-sm sm:text-base md:text-lg font-serif font-bold text-white tracking-wide drop-shadow-md">
            {text.headline}
          </p>
          <p className="text-xs sm:text-sm text-emerald-300 font-medium tracking-wider uppercase flex items-center justify-center gap-2 drop-shadow">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{text.subheadline}</span>
          </p>
        </div>

        {/* 4 Worlds Subtext Pills */}
        <div
          id="splash-subtext"
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-white/90 font-medium tracking-[0.2em] uppercase text-[10px] sm:text-xs drop-shadow-md pt-2 border-t border-white/15"
        >
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{text.worlds[0]}</span>
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{text.worlds[1]}</span>
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{text.worlds[2]}</span>
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{text.worlds[3]}</span>
        </div>

      </div>
    </div>
  );
}
