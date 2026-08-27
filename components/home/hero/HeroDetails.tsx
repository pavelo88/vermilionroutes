import React from 'react';
import { getLocalizedText } from '@/utils/i18nHelper';
import { SlideData } from '@/types';
import { Award, Star } from 'lucide-react';

interface HeroDetailsProps {
  initialData: SlideData;
  locale: string;
}

export function HeroDetails({ initialData, locale }: HeroDetailsProps) {
  return (
    <>
      {[0, 1].map((isOdd) => {
        const id = isOdd ? 'details-odd' : 'details-even';
        {/* 🎨 AJUSTE POSICIÓN HERO TEXTOS:
            - En Celular: top-[26svh] sm:top-[28svh]
            - En Escritorio: md:top-[115px] lg:top-[125px] xl:top-[135px] */}
        return (
          <div
            key={id}
            id={id}
            className="absolute left-0 w-full px-4 sm:px-6 md:px-0 md:w-auto md:left-[30px] lg:left-[60px] top-[18svh] sm:top-[20svh] md:top-[115px] lg:top-[125px] xl:top-[135px] z-[22] flex flex-col items-center md:items-start text-center md:text-left pointer-events-none"
          >
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
            <div className="h-auto mb-1.5">
              <div className="text text-white font-medium tracking-widest uppercase text-base md:text-sm pt-1 relative flex flex-col items-center md:items-start drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                <div className="w-8 h-[2px] bg-white rounded-full mb-2" />
                <span className="notranslate">{getLocalizedText(initialData.place, locale)}</span>
              </div>
            </div>

            {/* Line 1 (title - h2 tour slide title) */}
            <div className="h-auto md:min-h-[50px] lg:min-h-[60px] mt-1 flex flex-col items-center md:items-start">
              <h2 className="title-1 font-oswald font-extrabold text-[40px] sm:text-[46px] md:text-4xl lg:text-5xl xl:text-[64px] uppercase leading-[0.95] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] whitespace-normal md:whitespace-nowrap m-0 p-0">
                <span className="notranslate">{getLocalizedText(initialData.title, locale)}</span>
              </h2>
            </div>

            {/* Line 2 (title2 - h3 tour slide subtitle) */}
            <div className="h-auto md:min-h-[50px] lg:min-h-[60px] mt-1 flex flex-col items-center md:items-start">
              <h3 className="title-2 font-oswald font-extrabold text-[40px] sm:text-[46px] md:text-4xl lg:text-5xl xl:text-[64px] uppercase leading-[0.95] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] whitespace-normal md:whitespace-nowrap m-0 p-0">
                <span className="notranslate">{getLocalizedText(initialData.title2, locale)}</span>
              </h3>
            </div>

            <div className="h-auto mt-3 md:mt-4 flex flex-col items-center md:items-start w-full max-w-lg">
              <div className="desc flex flex-col items-center md:items-start w-full">
                <p className="hero-desc-text text-sm sm:text-base text-white/95 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-medium">
                  {getLocalizedText(initialData.description, locale)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
