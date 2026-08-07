'use client';

import React from 'react';
import { Award, Shield, Globe, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function StatsSection() {
  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('reviews-section');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden transition-colors border-b border-zinc-200 dark:border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 4 Stat Widgets in a row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          
          {/* Quick Stat 1 */}
          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center text-center group hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors shadow-sm dark:shadow-none">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-2xl md:text-3xl font-oswald font-bold text-zinc-900 dark:text-white mb-1">+500</div>
            <p className="text-[10px] md:text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Curated Expeditions</p>
          </div>

          {/* Quick Stat 2 */}
          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center text-center group hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors shadow-sm dark:shadow-none">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-2xl md:text-3xl font-oswald font-bold text-zinc-900 dark:text-white mb-1">+10</div>
            <p className="text-[10px] md:text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Years of Expertise</p>
          </div>

          {/* Quick Stat 3 (Clickable) */}
          <button 
            onClick={scrollToReviews}
            className="bg-white dark:bg-zinc-900/50 border border-emerald-200 dark:border-emerald-900/30 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center text-center group hover:bg-emerald-50 dark:hover:bg-zinc-900 transition-colors shadow-sm dark:shadow-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-2xl md:text-3xl font-oswald font-bold text-emerald-600 dark:text-emerald-400 mb-1">99%</div>
            <p className="text-[10px] md:text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Client Satisfaction</p>
          </button>

          {/* Quick Stat 4 */}
          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center text-center group hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors shadow-sm dark:shadow-none">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-2xl md:text-3xl font-oswald font-bold text-zinc-900 dark:text-white mb-1">100%</div>
            <p className="text-[10px] md:text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Secure Payments</p>
          </div>

        </div>

        {/* Minimal TripAdvisor Link Below */}
        <div className="mt-8 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 text-[#00aa6c] fill-[#00aa6c]" />
            ))}
          </div>
          <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
            Consistently rated <span className="font-bold text-zinc-900 dark:text-white">5 Stars</span> on Tripadvisor.
          </p>
          <button 
            onClick={scrollToReviews}
            className="mt-2 text-xs md:text-sm text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
          >
            Read stories from our guests
          </button>
        </div>

      </div>
    </section>
  );
}
