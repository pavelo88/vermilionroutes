'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Tour } from '@/types';
import { TourCard } from '@/components/ui/TourCard';
import { ChevronLeft, ChevronRight, Sparkles, MapPin } from 'lucide-react';

interface TourCarouselProps {
  tours: Tour[];
}

export function TourCarousel({ tours }: TourCarouselProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Touch Swipe handlers state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const categories = [
    { id: 'all', label: 'All Expeditions' },
    { id: 'Galapagos', label: 'Galapagos Islands' },
    { id: 'Ecuador', label: 'Mainland Ecuador' },
    { id: 'Peru', label: 'Cusco & Peru' },
  ];

  const filteredTours =
    activeFilter === 'all'
      ? tours
      : tours.filter((tour) => {
          const dest = tour.destination.toLowerCase();
          if (activeFilter === 'Galapagos') return dest.includes('galapagos');
          if (activeFilter === 'Ecuador') return dest.includes('ecuador');
          if (activeFilter === 'Peru') return dest.includes('peru');
          return false;
        });

  const total = filteredTours.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  useEffect(() => {
    if (isHovered || total <= 1) return;
    
    const interval = setInterval(() => {
      if (document.body.style.overflow === 'hidden') return;
      handleNext();
    }, 4500); 
    
    return () => clearInterval(interval);
  }, [total, isHovered]);

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

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setCurrentIndex(0);
  };

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
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
    setIsHovered(false);
  };

  if (total === 0) {
    return (
      <div className="text-center py-12 text-zinc-500">
        No tours available for this category.
      </div>
    );
  }

  // Calculate indices for 3D layout
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  return (
    <div className="space-y-2">
      {/* Filter Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilterChange(cat.id)}
            suppressHydrationWarning
            className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
              activeFilter === cat.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105'
                : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200/80 dark:border-zinc-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Strict 1-by-1 Infinite Carousel Stage */}
      <div 
        className="relative group/carousel w-full h-[520px] sm:h-[550px] overflow-hidden flex items-center justify-center mt-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full max-w-[350px] h-full mx-auto">
          {filteredTours.map((tour, idx) => {
            // Determine position
            const isCurrent = idx === currentIndex;
            const isPrev = idx === (currentIndex - 1 + total) % total;
            const isNext = idx === (currentIndex + 1) % total;
            
            // Default: hidden far right
            let positionClass = "translate-x-[200%] opacity-0 z-0 scale-90 pointer-events-none";
            
            if (isCurrent) {
              positionClass = "translate-x-0 opacity-100 z-20 scale-100";
            } else if (isPrev) {
              positionClass = "-translate-x-[110%] sm:-translate-x-[115%] opacity-40 z-10 scale-95 pointer-events-none";
            } else if (isNext) {
              positionClass = "translate-x-[110%] sm:translate-x-[115%] opacity-40 z-10 scale-95 pointer-events-none";
            }

            return (
              <div
                key={`${tour.id}-${idx}`}
                className={`absolute top-0 left-0 w-full h-full transform transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${positionClass}`}
              >
                <TourCard tour={tour} className="h-full" />
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows for Desktop */}
        <button 
          onClick={handlePrev}
          className="absolute left-2 sm:left-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-zinc-900/90 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:bg-emerald-600 hover:text-white hover:scale-110 transition-all z-30 opacity-0 group-hover/carousel:opacity-100 hidden sm:flex"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-2 sm:right-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-zinc-900/90 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:bg-emerald-600 hover:text-white hover:scale-110 transition-all z-30 opacity-0 group-hover/carousel:opacity-100 hidden sm:flex"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Tour Counter */}
      <div className="text-center text-xs text-zinc-500 dark:text-zinc-400 font-medium pt-4">
        Showing <span className="font-bold text-zinc-800 dark:text-zinc-200">{filteredTours.length}</span> journeys matching your criteria
      </div>
    </div>
  );
}
