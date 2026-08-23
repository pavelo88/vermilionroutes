'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Compass, ShieldCheck, Heart, Quote, CheckCircle2, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { useTranslations } from 'next-intl';
import { mockReviews } from '@/data/mock';

function TripAdvisorSvg({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2.4c1.8 0 3.4.6 4.7 1.6-1.2.8-2.9 1.4-4.7 1.4s-3.5-.6-4.7-1.4C8.6 5 10.2 4.4 12 4.4zM6.8 9.2c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2S3.6 14.2 3.6 12.4s1.4-3.2 3.2-3.2zm10.4 0c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.2-1.4-3.2-3.2 1.4-3.2 3.2-3.2zm-10.4 1.6c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zm10.4 0c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zM12 11.5c.8 0 1.5.4 1.7 1.1-.5.3-1.1.4-1.7.4s-1.2-.1-1.7-.4c.2-.7.9-1.1 1.7-1.1z" />
    </svg>
  );
}

export function CombinedExperienceSection() {
  const { settings } = useSettings();
  const t = useTranslations('experience');
  const reviews = mockReviews;
  const total = reviews.length;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const tripAdvisorUrl = 'https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html';

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
  }, [total, isHovered, currentIndex]);

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
    if (distance > 40) handleNext();
    else if (distance < -40) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
    setIsHovered(false);
  };

  return (
    <section id="experience" className="relative py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto border-t border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
      {/* Subtle animated background mesh to remove flatness */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-200/50 dark:bg-emerald-900/40 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-teal-200/50 dark:bg-teal-900/40 blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      {/* TripAdvisor Reviews Carousel with Experience Card */}
      <div className="w-full space-y-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-5">
          <div className="space-y-2 max-w-2xl">
            <a
              href={tripAdvisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200/80 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:scale-105 transition-transform"
            >
              <TripAdvisorSvg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>TripAdvisor Travelers' Choice 2026 Winner ↗</span>
            </a>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white leading-tight">
              {t('reviewsTitle') || 'Guest Stories & TripAdvisor Excellence'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={tripAdvisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm shrink-0 hover:border-emerald-500/50 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-white text-lg group-hover:scale-105 transition-transform">
                5.0
              </div>
              <div>
                <div className="flex gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  <TripAdvisorSvg className="w-3.5 h-3.5 text-emerald-600" />
                  <span>TripAdvisor Rating ↗</span>
                </div>
                <div className="text-[10px] text-zinc-500">Based on 120+ 5-Star Reviews</div>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous review"
                className="p-2 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                suppressHydrationWarning
              >
                <ChevronLeft className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next review"
                className="p-2 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                suppressHydrationWarning
              >
                <ChevronRight className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* FIXED LEFT CARD: The Experience Text */}
          <div className="w-full lg:w-[360px] xl:w-[380px] shrink-0 flex flex-col">
            <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 p-5 sm:p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-4 relative group flex-1 border border-emerald-700/50 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-600/50 text-xs font-semibold text-emerald-200 backdrop-blur-sm">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{t('badge')}</span>
                </div>
                
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                  {t('title')}
                </h3>
                
                <p className="text-emerald-50/90 text-xs sm:text-sm leading-relaxed">
                  {t('text')}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 relative z-10 pt-4 mt-auto border-t border-emerald-700/50">
                <div className="flex items-center gap-1.5 text-emerald-200 font-bold text-xs bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-700/50">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t('certified')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-200 font-bold text-xs bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-700/50">
                  <Heart className="w-3.5 h-3.5" />
                  <span>{t('sustainable')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: TripAdvisor Reviews 2-Card Stage (Zero Cut-off) */}
          <div 
            className="flex-1 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 h-full">
              {[0, 1].map((offset) => {
                const revIndex = (currentIndex + offset) % total;
                const rev = reviews[revIndex];

                return (
                  <div
                    key={`${rev.id}-${currentIndex}-${offset}`}
                    className={`bg-white dark:bg-zinc-900/90 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-3 relative group animate-fade-in ${
                      offset === 1 ? 'hidden sm:flex' : 'flex'
                    }`}
                  >
                    <Quote className="w-7 h-7 text-emerald-100 dark:text-emerald-950/80 absolute top-5 right-5 pointer-events-none group-hover:text-emerald-200 transition-colors" />

                    <div className="space-y-2.5 relative z-10 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <a 
                          href={tripAdvisorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                        >
                          <TripAdvisorSvg className="w-3.5 h-3.5" />
                          <span>TripAdvisor ↗</span>
                        </a>
                      </div>
                      
                      <h4 className="font-serif text-sm sm:text-base font-bold text-zinc-900 dark:text-white leading-snug line-clamp-2">
                        "{rev.title}"
                      </h4>
                      
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed italic line-clamp-4">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 relative z-10 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 mt-auto shrink-0">
                      <div className="w-9 h-9 rounded-full bg-zinc-200 overflow-hidden shrink-0">
                        <img src={rev.avatarUrl} alt={rev.author} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-zinc-900 dark:text-white">{rev.author}</div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                          {rev.location}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
