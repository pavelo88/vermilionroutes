'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Review } from '@/types';
import { mockReviews } from '@/data/mock';
import { Star, ShieldCheck, Award, Sparkles, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface TripAdvisorReviewsProps {
  reviews?: Review[];
  title?: string;
  subtitle?: string;
}

export function TripAdvisorReviews({
  reviews = mockReviews,
  title = "Guest Stories & TripAdvisor Excellence",
  subtitle = "Real feedback from international travelers who experienced South America with Vermilion Routes."
}: TripAdvisorReviewsProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = reviews.length;

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === total - 1 ? 0 : prev + 1));
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
    if (distance > 40) handleNext();
    if (distance < -40) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header with TripAdvisor Badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-800">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>TripAdvisor Travelers' Choice 2026 Winner</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {title}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* TripAdvisor Overall Score Banner */}
        <div className="bg-white dark:bg-zinc-900/80 p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800/90 shadow-md flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md shadow-emerald-600/30">
            5.0
          </div>
          <div>
            <div className="flex items-center gap-1 text-emerald-600">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              ))}
            </div>
            <p className="text-xs font-bold text-zinc-900 dark:text-white mt-1">
              TripAdvisor Verified Rating
            </p>
            <p className="text-[11px] text-zinc-500">Based on 120+ 5-Star Reviews</p>
          </div>
        </div>
      </div>

      {/* AI Sentiment Highlight Box */}
      <div className="bg-gradient-to-r from-emerald-950 via-zinc-900 to-teal-950 p-6 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-emerald-800/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block">
              AI Travel Intelligence Insights
            </span>
            <p className="text-sm font-semibold text-zinc-100">
              “Guests consistently highlight private guide knowledge, seamless internal transfers, and exquisite boutique stays as standout qualities.”
            </p>
          </div>
        </div>
        <span className="text-xs font-medium text-emerald-300 bg-emerald-900/60 px-3.5 py-1.5 rounded-full border border-emerald-700/50 shrink-0">
          100% Satisfaction Record
        </span>
      </div>

      {/* Reviews Carousel Stage */}
      <div className="relative" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Review {activeIdx + 1} of {total}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous review"
              className="p-2.5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next review"
              className="p-2.5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Cards Layout: On Desktop shows all cards or active focused, on Mobile shows single card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => {
            const isCurrent = idx === activeIdx;

            return (
              <div
                key={rev.id}
                onClick={() => setActiveIdx(idx)}
                className={`bg-white dark:bg-zinc-900/90 backdrop-blur-xl p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-6 relative group cursor-pointer ${
                  isCurrent
                    ? 'border-emerald-500/80 shadow-xl ring-2 ring-emerald-500/20 scale-100 z-20'
                    : 'border-zinc-200/80 dark:border-zinc-800/80 shadow-sm opacity-80 md:opacity-100 hover:opacity-100 hidden md:flex'
                }`}
              >
                <Quote className="w-10 h-10 text-emerald-100 absolute top-6 right-6 pointer-events-none group-hover:text-emerald-200 transition-colors" />

                <div className="space-y-4 relative z-10">
                  {/* Rating & Verified Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {rev.verifiedTripAdvisor && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Title & Comment */}
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white leading-snug">
                      "{rev.title}"
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                </div>

                {/* Author Footer */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center gap-3.5 mt-auto relative z-10">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-emerald-500/30 shadow-sm">
                    <Image
                      src={rev.avatarUrl}
                      alt={rev.author}
                      fill
                      sizes="44px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <p className="font-semibold text-sm text-zinc-900 dark:text-white leading-tight">
                      {rev.author}
                    </p>
                    <p className="text-[11px] text-zinc-500">{rev.location}</p>
                    <p className="text-[10px] text-emerald-700 font-medium">
                      {rev.tourTitle} • {rev.date}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIdx === idx
                  ? 'w-8 bg-emerald-600 shadow-sm shadow-emerald-600/40'
                  : 'w-2.5 bg-zinc-300 hover:bg-zinc-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

