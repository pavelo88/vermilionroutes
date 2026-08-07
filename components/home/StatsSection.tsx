'use client';

import React, { useState, useEffect } from 'react';
import { Award, Shield, Globe, Star, Users } from 'lucide-react';

export function StatsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('experience');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) return null; // Avoid hydration mismatch completely

  return (
    <section className="py-8 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden transition-colors border-b border-zinc-200 dark:border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 4 Premium Stat Widgets in a row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          
          {/* Quick Stat 1 */}
          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center group hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-2xl md:text-3xl font-oswald font-bold text-zinc-900 dark:text-white mb-1">+500</div>
            <p className="text-[10px] md:text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Curated Expeditions</p>
          </div>

          {/* Quick Stat 2 */}
          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center group hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-2xl md:text-3xl font-oswald font-bold text-zinc-900 dark:text-white mb-1">+10</div>
            <p className="text-[10px] md:text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Years of Expertise</p>
          </div>

          {/* Quick Stat 3 (Clickable Div instead of Button to avoid hydration issues) */}
          <div 
            onClick={scrollToReviews}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if(e.key === 'Enter') scrollToReviews(); }}
            className="bg-white dark:bg-zinc-900/40 border-2 border-emerald-500/20 dark:border-emerald-500/30 rounded-2xl p-5 flex flex-col items-center justify-center text-center group hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all duration-300 shadow-sm hover:shadow-emerald-900/20 hover:-translate-y-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
              <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-2xl md:text-3xl font-oswald font-bold text-emerald-600 dark:text-emerald-400 mb-1 relative z-10">99%</div>
            <p className="text-[10px] md:text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest relative z-10">Client Satisfaction</p>
          </div>

          {/* Quick Stat 4 */}
          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center group hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
          <div 
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if(e.key === 'Enter') scrollToReviews(); }}
            onClick={scrollToReviews}
            className="mt-2 text-xs md:text-sm text-emerald-600 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
          >
            Read stories from our guests
          </div>
        </div>

      </div>
    </section>
  );
}
