'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Tour } from '@/types';
import { TourCard } from '@/components/ui/TourCard';
import { ChevronLeft, ChevronRight, Compass, ChevronDown } from 'lucide-react';

import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

interface TourCarouselProps {
  tours: Tour[];
}

export function TourCarousel({ tours }: TourCarouselProps) {
  const t = useTranslations('tours');
  const locale = useLocale();

  const CATEGORIES = [
    { id: 'all', label: t('filter.all') },
    { id: 'Ecuador', label: `🏔️ ${t('filter.ecuador')}` },
    { id: 'Galapagos', label: `🐢 ${t('filter.galapagos')}` },
    { id: 'Combined', label: `✨ ${t('filter.combined')}` },
    { id: 'FullDay', label: `☀️ ${t('filter.fullday')}` },
  ];
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const rawFiltered =
    activeFilter === 'all'
      ? tours
      : tours.filter((tour) => {
          const dest = (typeof tour.destination === 'string' ? tour.destination : (tour.destination as any)?.en || (tour.destination as any)?.es || '').toLowerCase();
          const title = (typeof tour.title === 'string' ? tour.title : (tour.title as any)?.es || (tour.title as any)?.en || '').toLowerCase();
          const id = (tour.id || '').toLowerCase();
          const durationDays = tour.durationDays ?? (typeof tour.duration === 'string' && (tour.duration.includes('1 DAY') || tour.duration.includes('1 DÍA')) ? 1 : 0);
          const isDaily = durationDays === 1 || id.includes('quito-city') || id.includes('otavalo') || id.includes('papallacta') || id.includes('mindo') || id.includes('antisana') || id.includes('cotopaxi') || id.includes('quilotoa') || dest.includes('full') || dest.includes('daily');

          if (activeFilter === 'FullDay') {
            return isDaily;
          }
          if (activeFilter === 'Ecuador') {
            return !isDaily && (dest.includes('ecuador') || id.includes('volcanoes') || id.includes('andes') || id.includes('snow') || id.includes('fantastic')) && !dest.includes('galapagos') && !id.includes('galapagos');
          }
          if (activeFilter === 'Galapagos') {
            return !isDaily && (dest.includes('galapagos') || id.includes('galapagos')) && !dest.includes('ecuador') && !id.includes('ecuador-galapagos');
          }
          if (activeFilter === 'Combined') {
            return !isDaily && (id.includes('ecuador-galapagos') || (dest.includes('galapagos') && dest.includes('ecuador')) || dest.includes('&') || dest.includes('combin'));
          }
          return false;
        });

  const filteredTours = rawFiltered;

  const total = filteredTours.length;

  const goTo = useCallback((idx: number) => {
    if (isAnimating || total === 0) return;
    setIsAnimating(true);
    setCurrentIndex(((idx % total) + total) % total);
    setTimeout(() => setIsAnimating(false), 520);
  }, [isAnimating, total]);

  const handlePrev = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);
  const handleNext = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);

  // Auto-play
  useEffect(() => {
    if (total <= 1) return;
    autoPlayRef.current = setInterval(() => {
      if (!document.hidden) handleNext();
    }, 3300);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [handleNext, total]);

  // Listen for filter events from DestinationsGrid
  useEffect(() => {
    const handleSelectFilter = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setActiveFilter(customEvent.detail);
        setCurrentIndex(0);
      }
    };
    window.addEventListener('selectDestinationFilter', handleSelectFilter);
    return () => window.removeEventListener('selectDestinationFilter', handleSelectFilter);
  }, []);

  // Reset index when filter changes
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setCurrentIndex(0);
  };

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsHovered(true);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
    setIsHovered(false);
  };

  if (total === 0) {
    return (
      <div className="text-center py-20 text-zinc-500 dark:text-zinc-400">
        <Compass className="w-12 h-12 mx-auto mb-4 opacity-30" />
        <p className="font-semibold">No expeditions found for this destination.</p>
        <p className="text-sm mt-1">Try a different filter above.</p>
      </div>
    );
  }

  // Visible card indices: prev, current, next (3 at once on desktop)
  const prevIdx = (currentIndex - 1 + total) % total;
  const nextIdx = (currentIndex + 1) % total;

  return (
    <div className="space-y-6">
      {/* ── Filter Category Tabs ── */}
      <div className="px-4">
        {/* Desktop View */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterChange(cat.id)}
              suppressHydrationWarning
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-[transform,opacity,color,background-color,border-color] duration-300 cursor-pointer border ${
                activeFilter === cat.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105 border-emerald-600'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-emerald-400 dark:hover:border-emerald-500'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Mobile View (Dropdown List) */}
        <div className="md:hidden relative w-full mb-2">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 py-3 px-5 rounded-xl text-sm font-bold shadow-sm"
            >
              <span>{CATEGORIES.find(c => c.id === activeFilter)?.label || 'Filtros'}</span>
              <ChevronDown className={`w-5 h-5 text-emerald-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      handleFilterChange(cat.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3 text-sm transition-colors border-b border-zinc-100 dark:border-zinc-800 last:border-0 ${
                      activeFilter === cat.id 
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold' 
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
        </div>
      </div>

      {/* ── Carousel Stage ── */}
      <div
        className="relative group/carousel overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 🎨 AJUSTE ESCENARIO CARRUSEL ESCRITORIO:
            - h-[510px]: Alto total del contenedor del carrusel */}
        {/* Desktop View */}
        {total <= 3 ? (
          <div className="hidden md:flex flex-row justify-center items-center gap-6 w-full py-4 min-h-[490px]">
            {filteredTours.map((tour) => (
              <div key={tour.id} className="w-[320px] lg:w-[340px]">
                <TourCard
                  tour={tour}
                  className="h-[470px] rounded-3xl drop-shadow-xl border border-zinc-200/50 dark:border-zinc-800/80"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="hidden md:block relative w-full h-[510px] perspective-[1400px]">
            {filteredTours.map((tour, idx) => {
              let diff = idx - currentIndex;
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;

              if (Math.abs(diff) > 2) return null;

              const isCurrent = diff === 0;
              const zIndex = 50 - Math.abs(diff);
              const translateX = diff === 0 
                ? 0 
                : Math.sign(diff) * (68 + (Math.abs(diff) - 1) * 57);
              const translateZ = Math.abs(diff) * -65;
              const scale = diff === 0 ? 1 : 1 - Math.abs(diff) * 0.06;
              const opacity = 1 - Math.abs(diff) * 0.18;
              const rotateY = diff * -12;

              return (
                <div
                  key={tour.id}
                  onClick={() => !isCurrent && goTo(idx)}
                  className={`absolute top-0 left-1/2 -ml-[160px] lg:-ml-[175px] w-[320px] lg:w-[350px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    !isCurrent ? 'cursor-pointer group' : ''
                  }`}
                  style={{
                    zIndex,
                    transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                  }}
                >
                  <div className={`transition-transform duration-500 rounded-3xl overflow-hidden ${!isCurrent ? 'group-hover:scale-105 pointer-events-none' : ''}`}>
                    <TourCard
                      tour={tour}
                      className={`h-[470px] rounded-3xl ${isCurrent ? 'ring-2 ring-emerald-500/50 ring-offset-4 ring-offset-transparent drop-shadow-2xl pointer-events-auto' : 'drop-shadow-lg'}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile: single card with CSS slide */}
        <div className="md:hidden relative w-full max-w-[340px] mx-auto h-[490px]">
          {filteredTours.map((tour, idx) => {
            const isCurrent = idx === currentIndex;
            const isPrev = idx === prevIdx;
            const isNext = idx === nextIdx;
            let cls = 'translate-x-[150%] opacity-0 z-0 scale-90 pointer-events-none';
            if (isCurrent) cls = 'translate-x-0 opacity-100 z-20 scale-100';
            else if (isPrev) cls = '-translate-x-[115%] opacity-70 z-10 scale-95 pointer-events-none';
            else if (isNext) cls = 'translate-x-[115%] opacity-70 z-10 scale-95 pointer-events-none';
            return (
              <div
                key={`${tour.id}-${idx}`}
                className={`absolute top-0 left-0 w-full h-full transform transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${cls}`}
              >
                <TourCard tour={tour} className="h-full" />
              </div>
            );
          })}
        </div>

        {/* ── Navigation Arrows (Only shown when > 1 tour) ── */}
        {total > 1 && (
          <>
            <button
              onClick={handlePrev}
              suppressHydrationWarning
              aria-label="Previous expedition"
              className={`absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 dark:bg-zinc-900/95 rounded-full shadow-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:scale-110 transition-[transform,opacity,color,background-color,border-color] duration-200 z-30 opacity-0 group-hover/carousel:opacity-100 cursor-pointer ${
                total <= 3 ? 'md:hidden' : ''
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              suppressHydrationWarning
              aria-label="Next expedition"
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 dark:bg-zinc-900/95 rounded-full shadow-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:scale-110 transition-[transform,opacity,color,background-color,border-color] duration-200 z-30 opacity-0 group-hover/carousel:opacity-100 cursor-pointer ${
                total <= 3 ? 'md:hidden' : ''
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* ── Dot Indicators + Counter ── */}
      <div className="flex flex-col items-center gap-3">
        {/* Dot track */}
        <div className={`flex items-center gap-1 ${total <= 3 ? 'md:hidden' : ''}`}>
          {filteredTours.map((_, idx) => (
            <button
              key={idx}
              type="button"
              suppressHydrationWarning
              onClick={() => goTo(idx)}
              aria-label={`Go to expedition ${idx + 1}`}
              className="p-3 flex items-center justify-center cursor-pointer -m-1"
            >
              <span
                className={`rounded-full transition-colors duration-300 ${
                  idx === currentIndex
                    ? 'w-6 h-2 bg-emerald-600'
                    : 'w-2 h-2 bg-zinc-300 dark:bg-zinc-600 hover:bg-emerald-400'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Counter */}
        <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium tracking-wide">
          <span className={`font-bold text-zinc-700 dark:text-zinc-300 ${total <= 3 ? 'md:hidden' : ''}`}>{currentIndex + 1}</span>
          <span className={`mx-1 ${total <= 3 ? 'md:hidden' : ''}`}>/</span>
          <span className={total <= 3 ? 'md:hidden' : ''}>{total}</span>
          <span className={`mx-2 text-zinc-300 ${total <= 3 ? 'md:hidden' : ''}`}>·</span>
          <span>{filteredTours.length} {filteredTours.length === 1 ? 'expedition' : 'expeditions'} available</span>
        </p>
      </div>
    </div>
  );
}
