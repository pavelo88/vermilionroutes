import React from 'react';
import Image from 'next/image';
import { getLocalizedText } from '@/utils/i18nHelper';
import { SlideData } from '@/types';
import { Award, Star, ShieldCheck } from 'lucide-react';

interface HeroDetailsProps {
  initialData: SlideData;
  locale: string;
}

const SPLASH_TEXTS: Record<string, {
  rating: string;
  headline: string;
  subheadline: string;
  worlds: [string, string, string, string];
}> = {
  es: {
    rating: '5.0 Excelencia en TripAdvisor',
    headline: 'Los Mejores Tours Privados y a Medida de Ecuador & Galápagos',
    subheadline: 'Guías Nativos Certificados • Expediciones Exclusivas',
    worlds: ['Galápagos', 'Andes', 'Amazonas', 'Pacífico']
  },
  en: {
    rating: '5.0 Rating Excellence on TripAdvisor',
    headline: 'The Best Private & Tailor-Made Tours in Ecuador & Galapagos',
    subheadline: 'Certified Native Guides • Exclusive Expeditions',
    worlds: ['Galapagos', 'Andes', 'Amazon', 'Pacific']
  },
  fr: {
    rating: '5.0 Excellence sur TripAdvisor',
    headline: 'Les Meilleurs Circuits Privés & Sur Mesure en Équateur et Galapagos',
    subheadline: 'Guides Locaux Certifiés • Expéditions Exclusives',
    worlds: ['Galapagos', 'Andes', 'Amazonie', 'Pacifique']
  },
  de: {
    rating: '5.0 Spitzenbewertung auf TripAdvisor',
    headline: 'Die besten privaten & maßgeschneiderten Touren in Ecuador & Galapagos',
    subheadline: 'Zertifizierte einheimische Guides • Exklusive Expeditionen',
    worlds: ['Galapagos', 'Anden', 'Amazonas', 'Pazifik']
  },
  it: {
    rating: '5.0 Eccellenza su TripAdvisor',
    headline: 'I Migliori Tour Privati e su Misura in Ecuador e Galapagos',
    subheadline: 'Guide Locali Certificate • Spedizioni Esclusive',
    worlds: ['Galapagos', 'Ande', 'Amazzonia', 'Pacifico']
  },
  pt: {
    rating: '5.0 Excelência no TripAdvisor ',
    headline: 'Os Melhores Passeios Privados e Sob Medida no Equador e Galápagos',
    subheadline: 'Guias Nativos Certificados • Expedições Exclusivas',
    worlds: ['Galápagos', 'Andes', 'Amazonas', 'Pacífico']
  },
  ja: {
    rating: 'TripAdvisor で5.0評価の卓越性',
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

export function getStandardTemplateHTML(slide: SlideData, locale: string): string {
  const place = getLocalizedText(slide.place, locale);
  const title = getLocalizedText(slide.title, locale);
  const title2 = getLocalizedText(slide.title2, locale);
  const desc = getLocalizedText(slide.description, locale);

  return `
    <a
      href="https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html"
      target="_blank"
      rel="noopener noreferrer"
      class="pointer-events-auto hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 mb-2 rounded-full bg-black/60 hover:bg-emerald-950/90 backdrop-blur-md border border-emerald-500/50 hover:border-emerald-400 text-white transition-all shadow-xl hover:shadow-emerald-950/60 group cursor-pointer"
    >
      <svg class="w-3.5 h-3.5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
      <div class="flex items-center gap-0.5 text-emerald-400">
        <svg class="w-2.5 h-2.5 fill-emerald-400 text-emerald-400" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <svg class="w-2.5 h-2.5 fill-emerald-400 text-emerald-400" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <svg class="w-2.5 h-2.5 fill-emerald-400 text-emerald-400" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <svg class="w-2.5 h-2.5 fill-emerald-400 text-emerald-400" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <svg class="w-2.5 h-2.5 fill-emerald-400 text-emerald-400" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      </div>
      <span class="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-emerald-200 group-hover:text-white transition-colors">
        TripAdvisor 5.0 • Travelers' Choice
      </span>
    </a>

    <div class="h-auto mb-1.5 pt-6 sm:pt-8 md:pt-0">
      <div class="text text-white font-medium tracking-widest uppercase text-base md:text-sm pt-1 relative flex flex-col items-center text-center md:items-start md:text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
        <div class="w-8 h-[2px] bg-white rounded-full mb-2 mx-auto md:mx-0"></div>
        <span class="notranslate">${place}</span>
      </div>
    </div>

    <div class="h-auto md:min-h-[50px] lg:min-h-[60px] mt-1 flex flex-col items-center text-center md:items-start md:text-left">
      <h2 class="title-1 font-oswald font-extrabold text-[36px] sm:text-[46px] md:text-4xl lg:text-5xl xl:text-[64px] uppercase leading-[0.95] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] whitespace-normal md:whitespace-nowrap m-0 p-0 text-center md:text-left">
        <span class="notranslate">${title}</span>
      </h2>
    </div>

    <div class="h-auto md:min-h-[50px] lg:min-h-[60px] mt-1 flex flex-col items-center text-center md:items-start md:text-left">
      <h3 class="title-2 font-oswald font-extrabold text-[36px] sm:text-[46px] md:text-4xl lg:text-5xl xl:text-[64px] uppercase leading-[0.95] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] whitespace-normal md:whitespace-nowrap m-0 p-0 text-center md:text-left">
        <span class="notranslate">${title2}</span>
      </h3>
    </div>

    <div class="h-auto mt-3 md:mt-4 flex flex-col items-center text-center md:items-start md:text-left w-full max-w-lg mx-auto md:mx-0">
      <div class="desc flex flex-col items-center text-center md:items-start md:text-left w-full">
        <p class="hero-desc-text text-[17px] sm:text-[19px] lg:text-[20px] text-white/95 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-medium text-center md:text-left mx-auto md:mx-0">
          ${desc}
        </p>
      </div>
    </div>
  `;
}

export function HeroDetails({ initialData, locale }: HeroDetailsProps) {
  const welcomeText = SPLASH_TEXTS[locale] || SPLASH_TEXTS.en;

  return (
    <>
      {[0, 1].map((isOdd) => {
        const id = isOdd ? 'details-odd' : 'details-even';
        const isWelcomeSlide = !isOdd && initialData.isWelcome;
        const opacityClass = isOdd ? 'opacity-0 z-[12]' : 'opacity-100 z-[22]';

        return (
          <div
            key={id}
            id={id}
            className={`absolute left-0 w-full px-4 sm:px-6 md:px-0 md:w-auto md:left-[30px] lg:left-[60px] top-[145px] sm:top-[160px] md:top-[105px] lg:top-[115px] xl:top-[125px] flex flex-col items-center text-center md:items-start md:text-left pointer-events-none max-w-xl ${opacityClass}`}
          >
            {isWelcomeSlide ? (
              /* ── BIENVENIDA EXCLUSIVA (Centrada en móvil, a la izquierda en desktop) ── */
              <div className="welcome-container flex flex-col items-center text-center md:items-start md:text-left w-full">
                {/* VIP Trust Badge - Centered on desktop */}
                <div className="welcome-badge mb-2.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold shadow-2xl mx-auto md:mx-0 md:ml-[100px] lg:ml-[115px] xl:ml-[125px]">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-zinc-200">|</span>
                  <span className="tracking-wide">{welcomeText.rating}</span>
                </div>

                {/* "ALL YOU NEED IS" Vibrant Oswald H1 - Larger & High-Contrast NEED */}
                <h1 className="welcome-title flex flex-col items-center justify-center md:items-start mb-2.5">
                  <span className="flex gap-2 sm:gap-3 md:gap-4 font-oswald font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] [text-shadow:0_3px_10px_rgba(0,0,0,0.9)]">
                    <span className="flex">
                      <span style={{ color: '#FDB913' }}>A</span>
                      <span style={{ color: '#F58220' }}>L</span>
                      <span style={{ color: '#F05A28' }}>L</span>
                    </span>
                    <span className="flex">
                      <span style={{ color: '#EF4136' }}>Y</span>
                      <span style={{ color: '#ED1C24' }}>O</span>
                      <span style={{ color: '#E6007E' }}>U</span>
                    </span>
                    <span className="flex">
                      <span style={{ color: '#E91E63' }}>N</span>
                      <span style={{ color: '#F06292' }}>E</span>
                      <span style={{ color: '#CE93D8' }}>E</span>
                      <span style={{ color: '#AB47BC' }}>D</span>
                    </span>
                    <span className="flex">
                      <span style={{ color: '#42A5F5' }}>I</span>
                      <span style={{ color: '#29B6F6' }}>S</span>
                    </span>
                  </span>
                  <span className="sr-only">Vermilion Routes — {welcomeText.headline}</span>
                </h1>

                {/* Logo Glass Card - Centered under ALL YOU NEED IS */}
                <div className="welcome-logo-card relative w-[230px] h-[78px] sm:w-[290px] sm:h-[98px] md:w-[340px] md:h-[112px] mb-3 bg-gradient-to-r from-emerald-950/45 via-cyan-900/35 to-emerald-950/45 backdrop-blur-lg rounded-full p-2.5 sm:p-3 border border-white/35 shadow-[0_12px_40px_rgba(0,0,0,0.75)] flex items-center justify-center mx-auto md:mx-0 md:ml-[82px] lg:ml-[95px] xl:ml-[105px]">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src="/logo_inicio.png"
                      alt="Vermilion Routes"
                      fill
                      className="object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]"
                      priority
                    />
                  </div>
                </div>

                {/* Headline & Subheadline */}
                <div className="welcome-headline mb-3 space-y-0.5 text-center md:text-left max-w-lg mx-auto md:mx-0">
                  <p className="text-sm sm:text-base md:text-lg font-serif font-bold text-white tracking-wide drop-shadow-md">
                    {welcomeText.headline}
                  </p>
                  <p className="text-xs sm:text-sm text-emerald-300 font-medium tracking-wider uppercase flex items-center justify-center md:justify-start gap-2 drop-shadow">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{welcomeText.subheadline}</span>
                  </p>
                </div>

                {/* 4 Worlds Pills */}
                <div className="welcome-worlds flex flex-wrap items-center justify-center md:justify-start gap-2 text-white/90 font-medium tracking-[0.18em] uppercase text-[10px] sm:text-xs drop-shadow-md pt-2 border-t border-white/15 max-w-lg mx-auto md:mx-0">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{welcomeText.worlds[0]}</span>
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{welcomeText.worlds[1]}</span>
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{welcomeText.worlds[2]}</span>
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{welcomeText.worlds[3]}</span>
                </div>
              </div>
            ) : (
              /* ── MOLDE ESTÁNDAR (Con clases estándar para GSAP, vacío en inicio) ── */
              <>
                {/* TripAdvisor Rating Badge Pill (Visible on Desktop) */}
                <a
                  href="https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 mb-2 rounded-full bg-black/60 hover:bg-emerald-950/90 backdrop-blur-md border border-emerald-500/50 hover:border-emerald-400 text-white transition-all shadow-xl hover:shadow-emerald-950/60 group cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <div className="flex items-center gap-0.5 text-emerald-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-emerald-400 text-emerald-400" />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-emerald-200 group-hover:text-white transition-colors">
                    TripAdvisor 5.0 • Travelers' Choice
                  </span>
                </a>

                {/* Destino Subtítulo */}
                <div className="h-auto mb-1.5 pt-6 sm:pt-8 md:pt-0">
                  <div className="text text-white font-medium tracking-widest uppercase text-base md:text-sm pt-1 relative flex flex-col items-center text-center md:items-start md:text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    <div className="w-8 h-[2px] bg-white rounded-full mb-2 mx-auto md:mx-0" />
                    <span className="notranslate"></span>
                  </div>
                </div>

                {/* Line 1 (title - h2 tour slide title) */}
                <div className="h-auto md:min-h-[50px] lg:min-h-[60px] mt-1 flex flex-col items-center text-center md:items-start md:text-left">
                  <h2 className="title-1 font-oswald font-extrabold text-[36px] sm:text-[46px] md:text-4xl lg:text-5xl xl:text-[64px] uppercase leading-[0.95] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] whitespace-normal md:whitespace-nowrap m-0 p-0 text-center md:text-left">
                    <span className="notranslate"></span>
                  </h2>
                </div>

                {/* Line 2 (title2 - h3 tour slide subtitle) */}
                <div className="h-auto md:min-h-[50px] lg:min-h-[60px] mt-1 flex flex-col items-center text-center md:items-start md:text-left">
                  <h3 className="title-2 font-oswald font-extrabold text-[36px] sm:text-[46px] md:text-4xl lg:text-5xl xl:text-[64px] uppercase leading-[0.95] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] whitespace-normal md:whitespace-nowrap m-0 p-0 text-center md:text-left">
                    <span className="notranslate"></span>
                  </h3>
                </div>

                <div className="h-auto mt-3 md:mt-4 flex flex-col items-center text-center md:items-start md:text-left w-full max-w-lg mx-auto md:mx-0">
                  <div className="desc flex flex-col items-center text-center md:items-start md:text-left w-full">
                    <p className="hero-desc-text text-[17px] sm:text-[19px] lg:text-[20px] text-white/95 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-medium text-center md:text-left mx-auto md:mx-0"></p>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}
