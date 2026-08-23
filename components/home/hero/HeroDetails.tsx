import React from 'react';
import { getLocalizedText } from '@/utils/i18nHelper';
import { SlideData } from '@/types';

interface HeroDetailsProps {
  initialData: SlideData;
  locale: string;
}

export function HeroDetails({ initialData, locale }: HeroDetailsProps) {
  return (
    <>
      {[0, 1].map((isOdd) => {
        const id = isOdd ? 'details-odd' : 'details-even';
        return (
          <div
            key={id}
            id={id}
            className="absolute left-0 w-full px-5 sm:px-6 md:px-0 md:w-auto md:left-[30px] lg:left-[60px] top-[120px] sm:top-[120px] md:top-[90px] lg:top-[95px] z-[22] flex flex-col items-center md:items-start text-center md:text-left"
          >
            {/* AJUSTE AQUI: Mover textos arriba/abajo en celular cambiando top-[120px] a top-[130px] o top-[110px] */}
            <div className="h-auto mb-1.5">
              <div className="text text-white font-medium tracking-widest uppercase text-base md:text-sm pt-2 relative flex flex-col items-center md:items-start drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                <div className="w-8 h-[2px] bg-white rounded-full mb-2" />
                <span className="notranslate">{getLocalizedText(initialData.place, locale)}</span>
              </div>
            </div>

            {/* Line 1 (title) */}
            <div className="h-auto md:min-h-[46px] lg:min-h-[54px] mt-1 flex flex-col items-center md:items-start">
              <h1 className="title-1 font-oswald font-extrabold text-[28px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-[54px] uppercase leading-[0.95] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] whitespace-normal md:whitespace-nowrap m-0 p-0">
                <span className="notranslate">{getLocalizedText(initialData.title, locale)}</span>
              </h1>
            </div>

            {/* Line 2 (title2) */}
            <div className="h-auto md:min-h-[46px] lg:min-h-[54px] mt-1 flex flex-col items-center md:items-start">
              <h2 className="title-2 font-oswald font-extrabold text-[28px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-[54px] uppercase leading-[0.95] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] whitespace-normal md:whitespace-nowrap m-0 p-0">
                <span className="notranslate">{getLocalizedText(initialData.title2, locale)}</span>
              </h2>
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
