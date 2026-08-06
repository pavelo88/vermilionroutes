'use client';

import React from 'react';
import Image from 'next/image';
import { mockDestinations } from '@/data/mock';
import { Button } from '@/components/ui/Button';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';

export function DestinationsGrid() {
  const handleDestinationClick = (destId: string) => {
    const filterMap: Record<string, string> = {
      galapagos: 'Galapagos',
      ecuador: 'Ecuador',
      peru: 'Peru',
    };
    const targetFilter = filterMap[destId.toLowerCase()] || 'all';
    window.dispatchEvent(new CustomEvent('selectDestinationFilter', { detail: targetFilter }));
    const toursSection = document.getElementById('tours');
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="destinations" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-800">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Must-Visit Destinations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Explore South America’s Most Extraordinary Regions
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            From the unmatched evolutionary wonder of the Galapagos Archipelago to the dramatic Andean volcanism in Ecuador and ancient Inca sanctuaries in Peru.
          </p>
        </div>

        <a href="#tours" className="shrink-0">
          <Button variant="outline" className="gap-2">
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mockDestinations.map((dest) => (
          <div
            key={dest.id}
            id={dest.id.toLowerCase()}
            onClick={() => handleDestinationClick(dest.id)}
            className="group relative h-[420px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-end p-8 border border-zinc-200/50 cursor-pointer"
          >
            <Image
              src={dest.imageUrl}
              alt={dest.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10 space-y-3 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 inline-block">
                {dest.toursCount} Custom Itineraries Available
              </span>

              <h3 className="font-serif text-3xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                {dest.name}
              </h3>

              <p className="text-xs font-medium text-emerald-200">{dest.subtitle}</p>

              <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed font-normal">
                {dest.description}
              </p>

              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  Explore Expeditions <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
