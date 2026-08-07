'use client';

import React, { useState, useEffect } from 'react';
import { Award, Shield, Globe, Users } from 'lucide-react';

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

  if (!mounted) return null;

  return (
    <section className="bg-zinc-950 border-b border-zinc-900 relative z-10 w-full py-4 px-4 sm:px-6 lg:px-8 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
        
        {/* Compact Stat 1 */}
        <div className="flex-1 min-w-[140px] flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Globe className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-white font-oswald font-bold text-lg leading-none mb-1">+500</div>
            <p className="text-[10px] text-zinc-400 uppercase tracking-wider leading-none">Curated Expeditions</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-zinc-800" />

        {/* Compact Stat 2 */}
        <div className="flex-1 min-w-[140px] flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Award className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-white font-oswald font-bold text-lg leading-none mb-1">+10</div>
            <p className="text-[10px] text-zinc-400 uppercase tracking-wider leading-none">Years of Expertise</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-zinc-800" />

        {/* Compact Stat 3 (Clickable) */}
        <div 
          onClick={scrollToReviews}
          role="button"
          tabIndex={0}
          className="flex-1 min-w-[140px] flex items-center gap-3 p-2 rounded-lg hover:bg-emerald-900/30 transition-colors group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Users className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-emerald-400 font-oswald font-bold text-lg leading-none mb-1">99%</div>
            <p className="text-[10px] text-emerald-100/70 uppercase tracking-wider leading-none">5-Star Satisfaction</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-zinc-800" />

        {/* Compact Stat 4 */}
        <div className="flex-1 min-w-[140px] flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-white font-oswald font-bold text-lg leading-none mb-1">100%</div>
            <p className="text-[10px] text-zinc-400 uppercase tracking-wider leading-none">Secure Payments</p>
          </div>
        </div>

      </div>
    </section>
  );
}
