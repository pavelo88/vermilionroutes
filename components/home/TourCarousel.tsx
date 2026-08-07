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

  // Create a massive continuous track to simulate infinite looping
  const duplicatedTours = Array(20).fill(filteredTours).flat();
  const total = duplicatedTours.length;

  useEffect(() => {
    if (isHovered || total <= 1) return;
    
    const interval = setInterval(() => {
      // Pause if a modal is open (TourModal sets body overflow to hidden)
      if (document.body.style.overflow === 'hidden') return;
      if (scrollContainerRef.current) {
        const cardElement = scrollContainerRef.current.children[0] as HTMLElement;
        if (cardElement) {
          const scrollAmount = cardElement.offsetWidth + 24;
          scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 4500); 
    
    return () => clearInterval(interval);
  }, [total, isHovered]);

  useEffect(() => {
    const handleSelectFilter = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setActiveFilter(customEvent.detail);
        if (scrollContainerRef.current) scrollContainerRef.current.scrollTo({ left: 0 });
      }
    };
    window.addEventListener('selectDestinationFilter', handleSelectFilter);
    return () => window.removeEventListener('selectDestinationFilter', handleSelectFilter);
  }, []);

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTo({ left: 0 });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
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

      {/* Scrollable Carousel Stage */}
      <div 
        className="relative group/carousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory py-6 px-2 sm:px-6 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {duplicatedTours.map((tour, idx) => (
            <div
              key={`${tour.id}-${idx}`}
              className="w-[85vw] sm:w-[320px] md:w-[350px] snap-center shrink-0 transform transition-all duration-300 hover:-translate-y-2"
            >
              <TourCard tour={tour} />
            </div>
          ))}
        </div>

        {/* Floating Gradient Edges for scroll indication */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white dark:from-[#04080F] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white dark:from-[#04080F] to-transparent pointer-events-none" />
      </div>

      {/* Tour Counter */}
      <div className="text-center text-xs text-zinc-500 dark:text-zinc-400 font-medium pt-4">
        Showing <span className="font-bold text-zinc-800 dark:text-zinc-200">{filteredTours.length}</span> journeys matching your criteria
      </div>
    </div>
  );
}
