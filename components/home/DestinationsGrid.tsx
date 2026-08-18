'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Compass, ArrowRight, ChevronLeft, ChevronRight, Play, Pause, MapPin } from 'lucide-react';
import { useDestinationsData } from '@/hooks/useDestinationsData';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

const SLIDE_DURATION = 4500; // 4.5s autoplay

export function DestinationsGrid() {
  const { destinations } = useDestinationsData();
  const t = useTranslations('destinations');
  const tTour = useTranslations('tours');
  const locale = useLocale();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = destinations.length;

  const goToSlide = useCallback((index: number) => {
    if (total === 0) return;
    const newIdx = ((index % total) + total) % total;
    setCurrentIndex(newIdx);
    setProgress(0);
  }, [total]);

  const handlePrev = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const handleNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  // Autoplay and Progress Bar
  useEffect(() => {
    if (!isPlaying || isHovered || total <= 1) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const stepMs = 50;
    const increment = (stepMs / SLIDE_DURATION) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, isHovered, total, handleNext, currentIndex]);

  // Touch Swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) handleNext();
    else if (distance < -40) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleDestinationClick = (destId: string) => {
    const filterMap: Record<string, string> = {
      ecuador: 'Ecuador',
      galapagos: 'Galapagos',
      combined: 'Combined',
      'full-day': 'FullDay',
    };
    const targetFilter = filterMap[destId.toLowerCase()] || 'all';
    window.dispatchEvent(new CustomEvent('selectDestinationFilter', { detail: targetFilter }));
    const toursSection = document.getElementById('tours');
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!destinations || destinations.length === 0) return null;

  return (
    <section
      id="destinations"
      className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-500/30 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="tracking-wide uppercase text-[11px] font-bold">{t('badge')}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {t('title')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xl">
            {t('subtitle')}
          </p>
        </div>

        {/* Controls: Counter + Play/Pause + Nav Arrows */}
        <div className="flex items-center gap-2.5 self-start md:self-end shrink-0">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">0{currentIndex + 1}</span>
            <span className="text-zinc-400">/</span>
            <span>0{total}</span>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pausar carrusel' : 'Reanudar carrusel'}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 transition-colors shadow-sm cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handlePrev}
            aria-label="Anterior destino"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white transition-all shadow-sm cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Siguiente destino"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white transition-all shadow-sm cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Seamless 3-Card Continuous Stage (Zero Blank Spaces Ever) ── */}
      <div
        className="relative select-none touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {[0, 1, 2].map((offset) => {
            const destIndex = (currentIndex + offset) % total;
            const dest = destinations[destIndex];
            const isPrimary = offset === 0;

            return (
              <div
                key={`${dest.id}-${currentIndex}-${offset}`}
                id={dest.id.toLowerCase()}
                onClick={() => handleDestinationClick(dest.id)}
                className={`group relative h-[400px] sm:h-[420px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border transition-all duration-500 flex flex-col justify-between p-6 sm:p-7 cursor-pointer animate-fade-in-up ${
                  offset === 2 ? 'hidden lg:flex' : offset === 1 ? 'hidden sm:flex' : 'flex'
                } ${
                  isPrimary
                    ? 'border-emerald-500/80 ring-2 ring-emerald-500/30'
                    : 'border-zinc-200/80 dark:border-zinc-800/80 hover:-translate-y-1'
                }`}
              >
                {/* Image */}
                <Image
                  src={dest.imageUrl}
                  alt={getLocalizedText(dest.name, locale)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />

                {/* Top Bar inside Card */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30">
                    {dest.toursCount} {tTour('journeys')}
                  </span>

                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-mono font-bold border border-white/20">
                    0{destIndex + 1}
                  </span>
                </div>

                {/* Bottom Content inside Card */}
                <div className="relative z-10 space-y-2 text-white">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight">
                    {getLocalizedText(dest.name, locale)}
                  </h3>

                  <p className="text-xs font-medium text-emerald-200 line-clamp-1">
                    {getLocalizedText(dest.subtitle, locale)}
                  </p>

                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed font-normal">
                    {getLocalizedText(dest.description, locale)}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      <span>{t('cta')}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </span>

                    <span className="text-[11px] font-medium text-emerald-300/80 group-hover:text-emerald-300 transition-colors">
                      Ver tours →
                    </span>
                  </div>
                </div>

                {/* Active Live Progress Line (top of card) */}
                {isPrimary && isPlaying && !isHovered && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 overflow-hidden z-20">
                    <div
                      className="h-full bg-emerald-400 transition-all ease-linear"
                      style={{ width: `${progress}%`, transitionDuration: '50ms' }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Interactive Progress Dots & Direct Selector Pills ── */}
      <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Destination Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {destinations.map((dest, idx) => {
            const isCurrent = currentIndex === idx;
            return (
              <button
                key={dest.id}
                onClick={() => {
                  goToSlide(idx);
                  handleDestinationClick(dest.id);
                }}
                className={`text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
                }`}
              >
                {getLocalizedText(dest.name, locale)}
              </button>
            );
          })}
        </div>

        {/* Jump link to tours */}
        <a
          href="#tours"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors"
        >
          <span>Ver todas las expediciones</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}




