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
        return (
          <div key={`card-wrap-${idx}`}>
            <div
              className={`card card-${idx} absolute top-0 left-0 shadow-2xl overflow-hidden ${idx === 0
                ? 'w-full h-full inset-0 z-10 opacity-100'
                : 'w-[180px] h-[260px] opacity-0'
                }`}
            >
              {slide.mobileImage && (
                <Image
                  src={slide.mobileImage}
                  alt={getLocalizedText(slide.place, locale) || 'Vermilion Routes'}
                  fill
                  priority={idx === 0}
                  fetchPriority={idx === 0 ? "high" : "auto"}
                  quality={95}
                  className="object-cover object-center md:hidden"
                  sizes={idx === 0 ? "100vw" : "30vw"}
                />
              )}

              {/* 💻 FOTO HORIZONTAL 16:9 PARA PANTALLAS GRANDES */}
                <Image
                  src={slide.desktopImage || slide.image || slide.imageUrl || '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg'}
                  alt={getLocalizedText(slide.place, locale) || 'Vermilion Routes'}
                  fill
                  priority={idx === 0}
                  fetchPriority={idx === 0 ? "high" : "auto"}
                  quality={95}
                  className={`object-cover object-top ${slide.mobileImage ? 'hidden md:block' : 'block'}`}
                  sizes={idx === 0 ? "100vw" : "60vw"}
                />

              <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none transition-opacity duration-300" />

              <button
                type="button"
                aria-label={`View ${getLocalizedText(slide.place, locale) || 'slide'} ${idx + 1}`}
                className="absolute inset-0 cursor-pointer z-10"
                onClick={() => {
                  const placeName = (getLocalizedText(slide.place, 'en') || '').toLowerCase();
                  let destSlug = 'continental';
                  if (placeName.includes('galapagos')) destSlug = 'galapagos';
                  if (placeName.includes('amazon')) destSlug = 'amazon';
                  
                  // Si tiene window.__activeSlideIdx y somos el slide activo (o el index 0 si no se ha seteado)
                  const currentActive = (window as any).__activeSlideIdx ?? 0;
                  if (idx === currentActive || ((window as any).jumpToSlide === undefined && idx === 0)) {
                     window.location.href = `/${locale}/tours#${destSlug}`;
                  } else {
                     (window as any).jumpToSlide?.(idx);
                  }
                }}
              />
            </div>

            <div className={`card-content card-content-${idx} absolute left-0 top-0 text-white w-[180px] h-[260px] pointer-events-none opacity-0`}>
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="block text-xs font-oswald font-semibold tracking-wider uppercase leading-tight drop-shadow-md notranslate text-white">
                  {getLocalizedText(slide.title, locale)}
                </span>
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
