'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Clock, Star, MessageCircle } from 'lucide-react';
import { DownloadPDFButton } from './DownloadPDFButton';
import { Tour } from '@/types';

interface TourSubNavProps {
  title: string;
  duration: string;
  tour: Tour;
  locale: string;
}

export function TourSubNav({ title, duration, tour, locale }: TourSubNavProps) {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const node = document.getElementById('tour-subnav-portal');
    if (node) {
      setPortalNode(node);
    }
  }, []);

  if (!portalNode) return null;

  return createPortal(
    <div className="w-full bg-[#FAF8F5]/90 dark:bg-stone-950/90 backdrop-blur-2xl border-b border-zinc-200/80 dark:border-white/10 py-3.5 transition-all shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-serif text-xl sm:text-2xl font-light text-zinc-900 dark:text-white tracking-tight">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37] dark:text-[#F3E5AB]" />
                <span>{duration}</span>
              </div>

              <div className="flex items-center gap-1 font-semibold text-zinc-900 dark:text-zinc-100">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                <span>{tour.rating}</span>
                {tour.reviewsCount && (
                  <span className="text-zinc-500 dark:text-zinc-400 font-normal">
                    ({tour.reviewsCount} {locale === 'es' ? 'opiniones verificadas' : 'verified reviews'})
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/593994048458?text=${encodeURIComponent(
                locale === 'es'
                  ? `Hola Vermilion Routes, deseo información personalizada y reservar el tour: ${title}`
                  : `Hello Vermilion Routes, I would like custom information and book the tour: ${title}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:from-[#E5C158] hover:to-[#B59049] text-stone-950 shadow-md shadow-amber-900/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer border-none"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{locale === 'es' ? 'Contáctanos' : 'Contact Us'}</span>
            </a>
            <DownloadPDFButton tour={tour} variant="outline" size="md" />
          </div>
        </div>
      </div>
    </div>,
    portalNode
  );
}
