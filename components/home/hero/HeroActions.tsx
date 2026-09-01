import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface HeroActionsProps {
  exploreLabel: string;
  planLabel: string;
}

export function HeroActions({ exploreLabel, planLabel }: HeroActionsProps) {
  {/* 🎨 AJUSTE POSICIÓN BOTONES HERO:
      - En Celular: bottom-[55px] sm:bottom-[65px] (cambia 55px para subir o bajar los botones en móvil)
      - En Escritorio: md:top-[calc(50%+148px)] md:left-[30px] lg:left-[60px] (cambia 148px para subir/bajar en desktop) */}
  return (
    <div
      id="hero-action-buttons"
      className="absolute inset-x-0 bottom-[75px] sm:bottom-[80px] md:bottom-[65px] lg:bottom-[70px] xl:bottom-[75px] md:inset-x-auto md:left-[30px] lg:left-[60px] z-30 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2.5 sm:gap-3.5 px-4 pointer-events-auto"
    >
      <button
        suppressHydrationWarning
        className="w-[270px] sm:w-auto px-6 py-4 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold uppercase tracking-wider text-xs md:text-sm rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 hover:scale-[1.02] active:scale-95 cursor-pointer text-center shrink-0 group border-none"
        onClick={() => {
          const el = document.getElementById('destinations');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span>{exploreLabel}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>

      <button
        suppressHydrationWarning
        className="w-[270px] sm:w-auto px-6 py-4 bg-black/60 hover:bg-black/80 text-white font-bold uppercase tracking-wider text-xs md:text-sm rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 border border-emerald-500/30 hover:border-emerald-500/60 active:scale-95 cursor-pointer backdrop-blur-md shadow-lg text-center shrink-0 group"
        onClick={() => {
          window.dispatchEvent(new CustomEvent('open-concierge-chat'));
        }}
      >
        <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
        <span>{planLabel}</span>
      </button>
    </div>
  );
}
