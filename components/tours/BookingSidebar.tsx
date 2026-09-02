'use client';

import React, { useState } from 'react';
import { Tour } from '@/types';
import { Button } from '@/components/ui/Button';
import { createBookingInFirestore } from '@/lib/bookings';
import { TravelDatePicker } from '@/components/booking/TravelDatePicker';
import { filterPhoneInput, isValidEmail, isValidPhone, sanitizeText } from '@/lib/validation';
import { useLocale, useTranslations } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';
import { useLuxury } from '@/components/providers/LuxuryThemeProvider';
import { getStoredAffiliateRef } from '@/components/affiliates/AffiliateTracker';
import {
  Star,
  Clock,
  Calendar,
  Users,
  ShieldCheck,
  Send,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Zap,
  User,
  Mail,
  Phone,
  AlertCircle
} from 'lucide-react';

interface BookingSidebarProps {
  tour: Tour;
}

export function BookingSidebar({ tour }: BookingSidebarProps) {
  const locale = useLocale();
  const t = useTranslations('tours');
  const tourTitle = getLocalizedText(tour.title, locale);
  const tourDuration = getLocalizedText(tour.duration, locale);
  const tourDestination = getLocalizedText(tour.destination, locale);

  const [hotelClass, setHotelClass] = useState<'premium' | 'luxury'>('premium');
  const { setLuxuryMode } = useLuxury();

  const handleClassChange = (type: 'premium' | 'luxury') => {
    setHotelClass(type);
    setLuxuryMode(type === 'luxury');
  };

  const displayPrice = hotelClass === 'luxury' && tour.price4Star ? tour.price4Star : (tour.price3Star || tour.price || 1000);




  const tourTitleStr = tourTitle;
  const tourDurationStr = tourDuration;
  const whatsappMessage = encodeURIComponent(
    `Hello Vermilion Routes! I am interested in the tour "${tourTitleStr}" (${tourDurationStr}). Could you please send me a custom quote and departure availability?`
  );

  return (
    <>
      <div className="bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl p-6 sm:p-7 space-y-6">
        {/* Top Price Header */}
        <div className="space-y-4 pb-5 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
              Starting Price
            </span>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200/60 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{tour.rating}</span>
              {tour.reviewsCount && <span className="text-zinc-500">({tour.reviewsCount})</span>}
            </div>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="font-serif font-bold text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-50 transition-all duration-300" suppressHydrationWarning>
              ${displayPrice.toLocaleString('en-US')}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">USD / per person</span>
          </div>

          {/* Hotel Class Toggle */}
          <div className="bg-zinc-100/80 dark:bg-zinc-900/80 p-1 rounded-xl flex items-center relative overflow-hidden mt-2 z-10">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 transition-all duration-300 ease-out z-0 ${
                hotelClass === 'premium' ? 'left-1' : 'left-[calc(50%+4px)] bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-800/20 border-amber-200/60 dark:border-amber-700/50 shadow-amber-900/5'
              }`}
            />
            <button
              type="button"
              onClick={() => handleClassChange('premium')}
              className={`relative z-10 w-1/2 py-2 text-xs font-bold transition-colors uppercase cursor-pointer ${
                hotelClass === 'premium' ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
              }`}
            >
              {t('premium')}
            </button>
            <button
              type="button"
              onClick={() => handleClassChange('luxury')}
              className={`relative z-10 w-1/2 py-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                hotelClass === 'luxury' 
                ? 'font-serif italic text-[16px] tracking-wider drop-shadow-sm text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-300 dark:to-amber-100 font-bold' 
                : 'text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 hover:text-amber-700 dark:hover:text-amber-300'
              }`}
              style={hotelClass === 'luxury' ? { WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } : {}}
            >
              <Sparkles className={`w-3.5 h-3.5 shrink-0 ${hotelClass === 'luxury' ? 'text-amber-500 dark:text-amber-300' : 'hidden'}`} />
              {t('luxury')}
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold pt-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Duration: {tourDuration}</span>
          </div>
        </div>

      <div className="space-y-4">
        <button
          onClick={() => {
            window.location.href = `/${locale}/booking?addTour=${tour.id}`;
          }}
          className="w-full gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:from-[#E5C158] hover:to-[#B59049] text-stone-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-900/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer border-none flex items-center justify-center"
        >
          <Sparkles className="w-4 h-4" />
          <span>{locale === 'es' ? 'Añadir a mi Expedición' : 'Add to Expedition'}</span>
        </button>

        {/* Quick WhatsApp Inquiry */}
        <a
          href={`https://wa.me/593994048458?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors text-xs font-bold"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>Instant WhatsApp Inquiry</span>
        </a>
      </div>

      {/* Trust Badges */}
      <div className="pt-4 border-t border-zinc-100 space-y-2.5 text-xs text-zinc-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>100% Flexible booking & no hidden fees</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Guaranteed specialist response under 2 hours</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>24/7 Concierge support throughout your trip</span>
        </div>
      </div>

      {/* ── 1. Senior Travel Designer Concierge Card ── */}
      <div className="pt-5 border-t border-zinc-100 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-700 text-white font-serif font-bold text-base flex items-center justify-center shadow-md shadow-emerald-950/20 shrink-0">
            VR
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 block">
              Direct Travel Specialist
            </span>
            <h5 className="font-serif font-bold text-sm text-zinc-900">
              Byron Ortiz &amp; Expedition Team
            </h5>
            <p className="text-[11px] text-zinc-500">Quito &amp; Galápagos Direct Operator</p>
          </div>
        </div>

        <p className="text-xs text-zinc-600 leading-relaxed">
          Need custom modifications, date flexibility, or exclusive cruise upgrades? Speak directly with our destination designer.
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={`https://wa.me/593994048458?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-sm transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <a
            href="tel:+593994048458"
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[11px] font-bold transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-zinc-600" />
            <span>Call Direct</span>
          </a>
        </div>
      </div>

      {/* ── 2. Official TripAdvisor Trust Box ── */}
      <a
        href="https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html"
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/50 border border-emerald-200/80 hover:border-emerald-400 text-zinc-900 transition-all group shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-emerald-600">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
            ))}
          </div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
            5.0 EXCELLENT
          </span>
        </div>
        <p className="text-xs font-bold text-zinc-900 mt-2">
          TripAdvisor Travelers' Choice 2026 Winner
        </p>
        <p className="text-[11px] text-zinc-600 mt-0.5">
          100% verified 5-star reviews from international travelers.
        </p>
      </a>
    </div>

    {/* Mobile Sticky Bottom Bar (Visible only on small screens when sidebar is out of view) */}
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-xl border-t border-zinc-200 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-bold text-zinc-500">From</span>
        <span className="font-serif font-bold text-xl text-zinc-900">${displayPrice.toLocaleString('en-US')}</span>
      </div>
      <a
        href="#booking-form"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-emerald-600/20 text-sm transition-transform active:scale-95"
      >
        Check Availability
      </a>
    </div>
    </>
  );
}
