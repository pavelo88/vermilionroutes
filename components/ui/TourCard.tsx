'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tour } from '@/types';
import { Button } from '@/components/ui/Button';
import { Clock, MapPin, Star, ArrowRight, Sparkles } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

interface TourCardProps {
  tour: Tour;
  className?: string;
  priority?: boolean;
}

export function TourCard({ tour, className = '', priority = false }: TourCardProps) {
  const locale = useLocale();
  const t = useTranslations('tours');

  const rawTitle = getLocalizedText(tour.title, locale);
  // Clean card title: remove redundant duration suffix (e.g. " – 8 DÍAS / 7 NOCHES")
  // since the duration is already beautifully displayed in the clock pill above
  const title = rawTitle
    .replace(/\s*–\s*\d+\s*(?:DÍAS?|DIAS?|DAYS?)(?:\s*\/\s*\d+\s*(?:NOCHES?|NIGHTS?))?/gi, '')
    .replace(/\s*-\s*\d+\s*(?:DÍAS?|DIAS?|DAYS?)(?:\s*\/\s*\d+\s*(?:NOCHES?|NIGHTS?))?/gi, '')
    .replace(/\s*–\s*ITINERARIO DE \d+ DÍAS?/gi, '')
    .replace(/\s*-\s*\d+-DAY ITINERARY/gi, '')
    .trim() || rawTitle;

  const destination = getLocalizedText(tour.destination, locale);
  const duration = getLocalizedText(tour.duration, locale);

  {/* 🎨 AJUSTE CONTENEDOR TARJETA TOUR:
      - Sombra, bordes redondeados y efecto hover de escala suave */}
  return (
    <Link
      href={`/${locale}/tours/${tour.id}`}
      className={`group relative block w-full h-full min-h-[460px] md:min-h-[500px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 border border-zinc-200/60 dark:border-zinc-800/80 select-none ${className}`}
      suppressHydrationWarning
    >
      {/* 🖼️ FOTO PRINCIPAL DE FONDO (Optimizada a tamaño de tarjeta, súper liviana) */}
      <Image
        src={tour.mobileImage || tour.imageUrl || tour.desktopImage || '/images/tours/9-16/galapagos-tortuga-gigante-9-16.jpg'}
        alt={title || 'Tour Expedition'}
        fill
        priority={priority}
        quality={80}
        sizes="(max-width: 640px) 340px, (max-width: 1024px) 360px, 340px"
        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        referrerPolicy="no-referrer"
      />

      {/* 🎨 GRADIENTE LIGERO Y LIMPIO (Solo en la base inferior para leer el texto sin oscurecer la foto) */}
      <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

      {/* 🏷️ BADGES SUPERIORES (Destino + Bestseller) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/40 backdrop-blur-md text-white shadow-sm border border-white/20">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>{destination}</span>
        </span>
        {tour.isPopular && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-900 text-white shadow-sm border border-emerald-500/40">
            <Sparkles className="w-3 h-3 text-emerald-300" />
            <span>Best Seller</span>
          </span>
        )}
      </div>

      {/* 📝 CONTENIDO INFERIOR */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white space-y-3 z-10">
        {/* Metadatos (Duración + Calificación) */}
        <div className="flex items-center gap-4 text-xs font-medium text-white/90">
          <div className="flex items-center gap-1.5 drop-shadow-sm">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{duration}</span>
          </div>

          <div className="flex items-center gap-1 drop-shadow-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold">{tour.rating}</span>
            {tour.reviewsCount && (
              <span className="text-white/70 text-[10px]">({tour.reviewsCount})</span>
            )}
          </div>
        </div>

        {/* Título Principal */}
        <h3 className="font-serif font-bold text-lg sm:text-xl text-white group-hover:text-emerald-200 transition-colors drop-shadow-md line-clamp-2 leading-snug">
          {title}
        </h3>

        {/* Barra Inferior: Precio + Botón */}
        <div className="pt-2 flex items-end justify-between border-t border-white/15">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-white/70 block">
              {t('card.from') || 'From'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif font-bold text-2xl text-white drop-shadow-sm">
                ${tour.price.toLocaleString('en-US')}
              </span>
              <span className="text-xs text-white/70 font-normal">
                {t('card.person') || '/ person'}
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold shadow-lg shadow-emerald-950/60 transition-all group-hover:scale-105 border border-emerald-500/40">
            <span>{t('card.view') || 'View Details'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
