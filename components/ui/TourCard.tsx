'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tour } from '@/types';
import { Button } from '@/components/ui/Button';
import { TourModal } from '@/components/tours/TourModal';
import { Star, Clock, MapPin, ArrowRight, Check } from 'lucide-react';

import { SparkleEffect } from '@/components/ui/SparkleEffect';

interface TourCardProps {
  tour: Tour;
  className?: string;
}

export function TourCard({ tour, className = '' }: TourCardProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsModalOpen(true);
          }
        }}
        className={`group bg-white dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-2xl hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 flex flex-col overflow-hidden relative text-left outline-none cursor-pointer ${className}`}
      >
      {/* Image Banner Container */}
      <div className="relative h-64 w-full overflow-hidden bg-zinc-100">
        <Image
          src={tour.imageUrl}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-zinc-900 shadow-sm border border-white/40">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            {tour.destination}
          </span>

          {tour.isPopular && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
              Best Seller
            </span>
          )}
        </div>

        {/* Bottom Image Overlay: Duration & Rating */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium z-10">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{tour.duration}</span>
          </div>

          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold">{tour.rating}</span>
            {tour.reviewsCount && (
              <span className="text-zinc-300 text-[10px]">({tour.reviewsCount})</span>
            )}
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {tour.category && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">
              {tour.category}
            </span>
          )}

          <div>
            <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
              {tour.title}
            </h3>
          </div>

          {/* Highlights List */}
          {tour.highlights && tour.highlights.length > 0 && (
            <ul className="space-y-1.5 pt-1">
              {tour.highlights.slice(0, 3).map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Price & Action */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3 mt-auto">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-medium text-zinc-400 block">
              From
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif font-bold text-2xl text-zinc-900 dark:text-white">
                ${tour.price.toLocaleString('en-US')}
              </span>
              <span className="text-xs text-zinc-500 font-normal">/ person</span>
            </div>
          </div>

          <Button 
            variant="primary" 
            size="sm" 
            className="gap-1.5 text-xs shrink-0 pointer-events-none"
            tabIndex={-1}
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
      </div>

      {/* Premium Popup Modal */}
      <TourModal 
        tour={tour} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
