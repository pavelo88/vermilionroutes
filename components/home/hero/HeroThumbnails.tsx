'use client';

import React from 'react';
import Image from 'next/image';
import { getLocalizedText } from '@/utils/i18nHelper';
import { SlideData } from '@/types';

interface HeroThumbnailsProps {
  slidesData: SlideData[];
  locale: string;
  isMobile?: boolean;
}

export function HeroThumbnails({ slidesData, locale, isMobile }: HeroThumbnailsProps) {
  return (
    <>
      {slidesData.map((slide: any, idx: number) => {
        const imageSrc = isMobile && slide.mobileImage
          ? slide.mobileImage
          : (slide.desktopImage || slide.image || slide.imageUrl || '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg');

        return (
          <div key={`card-wrap-${idx}`}>
            <div
              className={`card card-${idx} absolute top-0 left-0 shadow-2xl overflow-hidden w-[180px] h-[260px]`}
            >
              <Image
                src={imageSrc}
                alt={getLocalizedText(slide.place, locale) || 'Vermilion Routes'}
                fill
                priority={idx === 0}
                className="object-cover"
                sizes={idx === 0 ? "100vw" : "(max-width: 768px) 180px, 200px"}
              />

              <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none transition-opacity duration-300" />

              <button
                type="button"
                aria-label={`View ${getLocalizedText(slide.place, locale) || 'slide'} ${idx + 1}`}
                className="absolute inset-0 cursor-pointer z-10"
                onClick={() => (window as any).jumpToSlide?.(idx)}
              />
            </div>

            <div className={`card-content card-content-${idx} absolute left-0 top-0 text-white w-[180px] h-[260px] pointer-events-none`}>
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <h4 className="text-xs font-oswald font-semibold tracking-wider uppercase leading-tight drop-shadow-md notranslate text-white">
                  {getLocalizedText(slide.title, locale)}
                </h4>
                {slide.title2 && (
                  <p className="text-sm font-oswald font-bold tracking-wide uppercase text-emerald-300 drop-shadow notranslate mt-0.5">
                    {getLocalizedText(slide.title2, locale)}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
