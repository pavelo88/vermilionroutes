import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroPaginationProps {
  totalSlides: number;
}

export function HeroPagination({ totalSlides }: HeroPaginationProps) {
  return (
    <div id="pagination" className="absolute left-0 top-0 z-40 flex items-center pointer-events-auto opacity-0 transition-opacity duration-300">
      <div className="flex gap-3 mr-5">
        <button
          type="button"
          onClick={() => (window as any).triggerPrevSlide?.()}
          className="w-[38px] h-[38px] rounded-full border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        <button
          type="button"
          onClick={() => (window as any).triggerNextSlide?.()}
          className="w-[38px] h-[38px] rounded-full border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="w-[300px] md:w-[400px] lg:w-[500px] h-[42px] flex items-center">
        <div className="w-full h-[3px] bg-white/20 relative rounded-full overflow-hidden">
          <div className="progress-sub-foreground absolute top-0 left-0 h-full bg-white rounded-full" />
        </div>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 overflow-hidden h-[50px] w-12 hidden md:block">
        <div className="indicator absolute right-0 top-0 h-full bg-white/20" style={{ width: '100vw' }} />
        <div className="relative z-10 flex items-center justify-end h-full pr-2 text-xs font-mono font-bold text-white/80">
          01 / {totalSlides < 10 ? `0${totalSlides}` : totalSlides}
        </div>
      </div>
    </div>
  );
}
