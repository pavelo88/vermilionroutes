'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Compass, ShieldCheck, Heart, Quote, CheckCircle2, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { mockReviews } from '@/data/mock';

export function CombinedExperienceSection() {
  const { settings } = useSettings();
  const reviews = mockReviews;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const duplicatedReviews = Array(20).fill(reviews).flat();
  const total = duplicatedReviews.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 < total ? prev + 1 : 0));
  };

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardElement = container.children[0] as HTMLElement;
    if (cardElement) {
      // Card width + gap (24px)
      const scrollAmount = cardElement.offsetWidth + 24;
      container.scrollTo({
        left: currentIndex * scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto border-t border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
      {/* Subtle animated background mesh to remove flatness */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-200/50 dark:bg-emerald-900/40 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-teal-200/50 dark:bg-teal-900/40 blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>
      {/* TripAdvisor Reviews Carousel with Experience Card */}
      <div className="w-full space-y-8 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>TripAdvisor Travelers' Choice 2026 Winner</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
              Guest Stories & TripAdvisor Excellence
            </h2>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm shrink-0">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-white text-xl">
              5.0
            </div>
            <div>
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                ))}
              </div>
              <div className="text-xs font-bold text-zinc-900 dark:text-white">TripAdvisor Verified Rating</div>
              <div className="text-[10px] text-zinc-500">Based on 120+ 5-Star Reviews</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous review"
              className="p-2.5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              suppressHydrationWarning
            >
              <ChevronLeft className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next review"
              className="p-2.5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              suppressHydrationWarning
            >
              <ChevronRight className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* FIXED LEFT CARD: The Experience Text */}
          <div className="w-full lg:w-[400px] xl:w-[420px] shrink-0 flex flex-col">
            <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 relative group flex-1 border border-emerald-700/50 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-600/50 text-xs font-semibold text-emerald-200 backdrop-blur-sm">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Acerca de Vermilion Routes</span>
                </div>
                
                <h4 className="font-serif text-3xl font-bold text-white leading-snug">
                  Experiencia inigualable, excelencia sin concesiones
                </h4>
                
                <p className="text-emerald-50/90 text-sm sm:text-base leading-relaxed">
                  En Vermilion Routes, no solo reservamos tours. Creamos expediciones únicas e inolvidables, totalmente personalizadas, a través de los espectaculares paisajes de Ecuador, Galápagos y Perú. Como operadores locales directos, combinamos el conocimiento de la región con una excelencia sin concesiones.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 relative z-10 pt-6 mt-auto border-t border-emerald-700/50">
                <div className="flex items-center gap-1.5 text-emerald-200 font-bold text-xs bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-700/50">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Operador certificado</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-200 font-bold text-xs bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-700/50">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Impacto sostenible</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: TripAdvisor Reviews Carousel */}
          <div className="flex-1 overflow-hidden relative">
            {/* The carousel container */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-hidden scroll-smooth pb-8 pt-2 px-2 h-full items-stretch"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {duplicatedReviews.map((rev, idx) => (
                <div
                  key={`${rev.id}-${idx}`}
                  className="bg-white dark:bg-zinc-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 relative group w-[85vw] sm:w-[340px] xl:w-[350px] shrink-0"
                >
                  <Quote className="w-8 h-8 text-emerald-100 absolute top-6 right-6 pointer-events-none group-hover:text-emerald-200 transition-colors" />

                  <div className="space-y-4 relative z-10 flex-1">
                    <div className="flex gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 dark:text-white leading-snug">
                      "{rev.title}"
                    </h4>
                    
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed italic line-clamp-6">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 relative z-10 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 mt-auto shrink-0">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden shrink-0">
                      <img src={rev.avatarUrl} alt={rev.author} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-zinc-900 dark:text-white">{rev.author}</div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                        {rev.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
