'use client';

import React from 'react';
import { useToursData } from '@/hooks/useToursData';
import { TourCarousel } from '@/components/home/TourCarousel';
import { Button } from '@/components/ui/Button';
import { Sparkles, ArrowRight } from 'lucide-react';

export function FeaturedTours() {
  const { tours } = useToursData();

  return (
    <section id="tours" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-800">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Interactive 3D Carousel Showcase</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
          Featured Signature Journeys
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
          Curated experiences led by expert local naturalists with seamless logistics, handpicked boutique stays, and the ultimate balance between luxury and adventure.
        </p>
      </div>

      {/* 3D Tour Carousel */}
      <TourCarousel tours={tours} />

      {/* Tailor-Made CTA Box */}
      <div className="mt-16 bg-gradient-to-r from-zinc-900 via-zinc-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-xl relative z-10 text-center md:text-left">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
            Looking for something 100% custom?
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
            We Design Your Tailor-Made Itinerary At No Extra Cost
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Our destination specialists will customize travel dates, pacing, hotel luxury level, and private excursions tailored precisely to your preferences.
          </p>
        </div>

        <Button 
          variant="primary" 
          size="lg" 
          className="relative z-10 shrink-0 gap-2 shadow-lg shadow-emerald-600/30"
          onClick={() => window.location.href = '#contact'}
        >
          <span>Request Custom Itinerary</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}


