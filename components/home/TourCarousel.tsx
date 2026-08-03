'use client';

import React, { useState, useRef } from 'react';
import { Tour } from '@/types';
import { TourCard } from '@/components/ui/TourCard';
import { ChevronLeft, ChevronRight, Sparkles, MapPin } from 'lucide-react';

interface TourCarouselProps {
  tours: Tour[];
}

export function TourCarousel({ tours }: TourCarouselProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Touch Swipe handlers state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Expeditions' },
    { id: 'Galapagos', label: 'Galapagos Islands' },
    { id: 'Ecuador', label: 'Mainland Ecuador' },
    { id: 'Peru', label: 'Cusco & Peru' },
  ];

  const filteredTours =
    activeFilter === 'all'
      ? tours
      : tours.filter((tour) =>
          tour.destination.toLowerCase().includes(activeFilter.toLowerCase())
        );

  const total = filteredTours.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setCurrentIndex(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
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
    <div className="space-y-8">
      {/* Filter Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilterChange(cat.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
              activeFilter === cat.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105'
                : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/80'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3D Carousel Stage */}
      <div
        className="relative min-h-[580px] flex items-center justify-center overflow-hidden py-6 px-2 sm:px-6"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Prev Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous tour"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/90 backdrop-blur-xl border border-zinc-200 shadow-xl flex items-center justify-center text-zinc-800 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next tour"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/90 backdrop-blur-xl border border-zinc-200 shadow-xl flex items-center justify-center text-zinc-800 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Desktop 3D Cards Layout (3 cards visible with perspective) */}
        <div className="w-full max-w-6xl mx-auto hidden md:grid md:grid-cols-12 items-center gap-4 relative">
          {/* Left Card (Previous) */}
          <div
            onClick={() => setCurrentIndex(prevIndex)}
            className="col-span-3 transform transition-all duration-500 ease-out opacity-60 hover:opacity-90 scale-90 -rotate-2 cursor-pointer pointer-events-auto filter blur-[0.3px]"
          >
            <div className="pointer-events-none">
              <TourCard tour={filteredTours[prevIndex]} />
            </div>
          </div>

          {/* Center Card (Active & Prominent) */}
          <div className="col-span-6 z-30 transform transition-all duration-500 ease-out scale-100 lg:scale-105 shadow-2xl rounded-3xl ring-2 ring-emerald-500/40">
            <TourCard tour={filteredTours[currentIndex]} />
          </div>

          {/* Right Card (Next) */}
          <div
            onClick={() => setCurrentIndex(nextIndex)}
            className="col-span-3 transform transition-all duration-500 ease-out opacity-60 hover:opacity-90 scale-90 rotate-2 cursor-pointer pointer-events-auto filter blur-[0.3px]"
          >
            <div className="pointer-events-none">
              <TourCard tour={filteredTours[nextIndex]} />
            </div>
          </div>
        </div>

        {/* Mobile Single Card Layout with Smooth Slide Effect */}
        <div className="w-full max-w-sm mx-auto md:hidden relative z-30 transition-all duration-300">
          <TourCard tour={filteredTours[currentIndex]} />
        </div>
      </div>

      {/* Pagination Dot Controls */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {filteredTours.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === idx
                ? 'w-8 bg-emerald-600 shadow-sm shadow-emerald-600/50'
                : 'w-2.5 bg-zinc-300 hover:bg-zinc-400'
            }`}
          />
        ))}
      </div>

      {/* Tour Counter */}
      <div className="text-center text-xs text-zinc-500 font-medium">
        Showing <span className="font-bold text-zinc-800">{currentIndex + 1}</span> of{' '}
        <span className="font-bold text-zinc-800">{total}</span> journeys
      </div>
    </div>
  );
}
