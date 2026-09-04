'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Review } from '@/types';
import { mockReviews } from '@/data/mock';
import { Star, ShieldCheck, Award, Sparkles, Quote, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const TRIPADVISOR_URL = "https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html";

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

  const total = reviews.length;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full space-y-8">
      {/* Header with TripAdvisor Badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-8">
        <div className="space-y-3 max-w-2xl">
          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 transition-colors group cursor-pointer"
          >
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>TripAdvisor Travelers' Choice 2026 Winner</span>
            <ExternalLink className="w-3 h-3 text-emerald-600 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {title}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* TripAdvisor Overall Score Banner (Clickable) */}
        <a
          href={TRIPADVISOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white dark:bg-zinc-900/80 p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800/90 shadow-md hover:shadow-xl hover:border-emerald-500/80 dark:hover:border-emerald-500/80 flex items-center gap-4 shrink-0 transition-all group cursor-pointer"
          title="Ver perfil oficial en TripAdvisor"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
            5.0
          </div>
          <div>
            <div className="flex items-center gap-1 text-emerald-600">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              ))}
            </div>
            <p className="text-xs font-bold text-zinc-900 dark:text-white mt-1 flex items-center gap-1">
              TripAdvisor Verified Rating (5.0 / 5.0)
              <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
            </p>
            <p className="text-[11px] text-zinc-500">51 Reviews • #85 of 678 in Quito</p>
          </div>
        </a>
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
      <div className="relative">
        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline uppercase tracking-wider cursor-pointer"
          >
            Ver todas las opiniones en TripAdvisor
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
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

        {/* Carousel Cards Layout: Horizontal scroll snap container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((rev, idx) => {
            return (
              <div
                key={rev.id}
                className="bg-white dark:bg-zinc-900/90 backdrop-blur-xl p-7 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm transition-all duration-300 flex flex-col justify-between space-y-6 relative group w-full md:w-[calc(50%-12px)] shrink-0 snap-center"
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
                      <a
                        href={TRIPADVISOR_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200/80 dark:border-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Verificado en TripAdvisor
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </a>
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
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between gap-3.5 mt-auto relative z-10">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-emerald-500/30 shadow-sm bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-bold text-sm">
                      {rev.avatarUrl ? (
                        <Image
                          src={rev.avatarUrl}
                          alt={rev.author || 'Reviewer'}
                          fill
                          sizes="44px"
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span>{rev.author ? rev.author.charAt(0).toUpperCase() : 'G'}</span>
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <p className="font-semibold text-sm text-zinc-900 dark:text-white leading-tight">
                        {rev.author}
                      </p>
                      <p className="text-[11px] text-zinc-500">{rev.location}</p>
                      <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                        {rev.tourTitle} • {rev.date}
                      </p>
                    </div>
                  </div>

                  <a
                    href={TRIPADVISOR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
                  >
                    TripAdvisor ↗
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


