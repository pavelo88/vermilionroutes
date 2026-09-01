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
    <div className="w-full bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-200/50 dark:border-white/5 py-4 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{duration}</span>
              </div>

              <div className="flex items-center gap-1 font-semibold text-zinc-900 dark:text-zinc-100">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{tour.rating}</span>
                {tour.reviewsCount && (
                  <span className="text-zinc-500 dark:text-zinc-400 font-normal">
                    ({tour.reviewsCount} {locale === 'es' ? 'opiniones verificadas' : 'verified guest reviews'})
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`https://wa.me/593994048458?text=${encodeURIComponent(
                locale === 'es'
                  ? `Hola Vermilion Routes, deseo información personalizada y reservar el tour: ${title}`
                  : `Hello Vermilion Routes, I would like custom information and book the tour: ${title}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
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
