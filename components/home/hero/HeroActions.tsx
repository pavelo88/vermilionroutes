import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface HeroActionsProps {
  exploreLabel: string;
  planLabel: string;
}

export function HeroActions({ exploreLabel, planLabel }: HeroActionsProps) {
  return (
    <div
      id="hero-action-buttons"
      className="absolute inset-x-0 bottom-[55px] sm:bottom-[65px] md:bottom-auto md:inset-x-auto md:left-[30px] lg:left-[60px] z-30 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2.5 sm:gap-3.5 px-4 pointer-events-auto"
    >
      <button
        suppressHydrationWarning
        className="w-[270px] sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest text-xs md:text-sm rounded-full transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 active:scale-95 cursor-pointer text-center shrink-0"
        onClick={() => {
          const el = document.getElementById('tours');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span>{exploreLabel}</span>
        <ArrowRight className="w-4 h-4 transition-transform" />
      </button>

      <button
        suppressHydrationWarning
        className="w-[270px] sm:w-auto px-6 py-3 bg-black/60 hover:bg-black/80 text-white font-bold uppercase tracking-widest text-xs md:text-sm rounded-full transition-all flex items-center justify-center gap-2 border border-white/30 active:scale-95 cursor-pointer backdrop-blur-md shadow-xl text-center shrink-0"
        onClick={() => {
          window.dispatchEvent(new CustomEvent('open-concierge-chat'));
        }}
      >
        <MessageCircle className="w-4 h-4 text-emerald-400" />
        <span>{planLabel}</span>
      </button>
    </div>
  );
}
