import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface HeroActionsProps {
  exploreLabel: string;
  planLabel: string;
}

export function HeroActions({ exploreLabel, planLabel }: HeroActionsProps) {
  return (
    <>
      {/* AJUSTE AQUI: Mover botones arriba/abajo en celular cambiando bottom-[85px] o bottom-[60px] */}
      <div
        id="hero-action-buttons"
        className="flex absolute left-0 md:left-[30px] lg:left-[60px] w-full md:w-auto px-4 md:px-0 bottom-[85px] md:bottom-auto z-30 items-center justify-center md:justify-start gap-3 sm:gap-4 flex-wrap"
      >
      <button
        className="px-6 sm:px-7 py-2.5 sm:py-3 bg-emerald-600 text-white font-bold uppercase tracking-widest text-xs md:text-sm rounded-full transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/50 active:scale-95 cursor-pointer"
        onClick={() => {
          const el = document.getElementById('tours');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span>{exploreLabel}</span>
        <ArrowRight className="w-4 h-4 transition-transform" />
      </button>

      <button
        className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 text-white font-bold uppercase tracking-widest text-xs md:text-sm rounded-full transition-all flex items-center gap-2 border border-white/30 active:scale-95 cursor-pointer backdrop-blur-sm"
        onClick={() => {
          window.dispatchEvent(new CustomEvent('open-concierge-chat'));
        }}
      >
        <MessageCircle className="w-4 h-4" />
        <span>{planLabel}</span>
      </button>
    </div>
    </>
  );
}
