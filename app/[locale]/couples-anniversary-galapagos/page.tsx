import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, Clock, MessageCircle, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { mockTours } from '@/data/mock';
import { getLocalizedText } from '@/utils/i18nHelper';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Viajes Romanticos y Aniversarios en Galapagos | Vermilion Routes' : 'Romantic Getaways & Anniversary Trips Galapagos Ecuador | Vermilion Routes',
    description: isEs ? 'Viajes privados a medida para parejas y aniversarios en Galapagos y Ecuador. Amanecer sobre volcanes, playas virgenes, hoteles boutique exclusivos y cenas privadas bajo las estrellas.' : 'Bespoke private travel for couples and anniversary trips in Galapagos & Ecuador. Sunrise over volcanoes, pristine beaches, exclusive boutique hotels and private starlit dinners.',
    keywords: ['romantic Galapagos trip', 'couples Ecuador travel', 'anniversary Galapagos', 'honeymoon Ecuador', 'romantic Ecuador vacation'],
    alternates: { canonical: "https://vermilionroutes.com/" + locale + "/couples-anniversary-galapagos" },
  };
}

const COUPLES_TOUR_IDS = ['ecuador-galapagos-12days', 'ecuador-galapagos-11days', 'galapagos-6days', 'galapagos-5days', 'snow-volcanoes-6days'];

export default async function CouplesAnniversaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === 'es';
  const couplesTours = mockTours.filter(t => COUPLES_TOUR_IDS.includes(t.id));
  const waMsg = isEs ? 'Hola Vermilion Routes, quiero planificar un viaje romantico/aniversario en Galapagos o Ecuador para una pareja.' : 'Hello Vermilion Routes, I want to plan a romantic/anniversary trip in Galapagos or Ecuador for a couple.';

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#07130C] text-zinc-900 dark:text-zinc-100">
      <section className="relative min-h-[85vh] flex items-end pb-20 pt-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/tours/9-16/galapagos-las-grietas-9-16.jpg" alt={isEs ? 'Las Grietas Galapagos atardecer romantico' : 'Las Grietas Galapagos romantic sunset'} fill className="object-cover" priority quality={90} sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto w-full space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>{isEs ? 'Parejas y Aniversarios' : 'Couples & Anniversaries'}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {isEs ? 'Escapes Romanticos e Itinerarios de Aniversario' : 'Romantic Escapes & Anniversary Itineraries'}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
            {isEs ? 'Momentos unicos e irrepetibles para parejas: amaneceres sobre volcanes andinos, playas virgenes en Galapagos y hoteles boutique con vistas de sueno.' : "Unrepeatable moments for couples: Andean volcano sunrises, pristine Galapagos beaches, and dream-view boutique hotels."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={"https://wa.me/593994048458?text=" + encodeURIComponent(waMsg)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all hover:scale-105 shadow-lg">
              <MessageCircle className="w-4 h-4" />
              {isEs ? 'Planificar Nuestro Viaje' : 'Plan Our Trip'}
            </a>
            <Link href={"/" + locale + "#tours"} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white font-semibold text-sm transition-all">
              {isEs ? 'Ver Todos los Tours' : 'View All Tours'} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { icon: Heart, en: 'Private Rooms with Volcanic Views', es: 'Habitaciones Privadas con Vistas Volcanicas' },
            { icon: Sparkles, en: 'Surprise Experiences & Private Dinners', es: 'Experiencias Sorpresa y Cenas Privadas' },
            { icon: ShieldCheck, en: '100% Private — No Shared Groups', es: '100% Privado — Sin Grupos Compartidos' },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900/80 rounded-2xl p-8 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/40 flex items-center justify-center mx-auto">
                <item.icon className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              </div>
              <p className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">{isEs ? item.es : item.en}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">{isEs ? 'Itinerarios para Parejas' : 'Itineraries for Couples'}</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">{isEs ? 'Cada viaje puede personalizarse al 100% para vuestra ocasion especial.' : 'Every journey can be 100% personalised for your special occasion.'}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {couplesTours.slice(0, 3).map((tour) => {
            const titleText = getLocalizedText(tour.title, locale);
            const cleanTitle = titleText.replace(/\s*[-]\s*\d+[\s\w]+/gi, '').trim() || titleText;
            const durationText = getLocalizedText(tour.duration, locale);
            return (
              <Link key={tour.id} href={"/" + locale + "/tours/" + tour.id} className="group relative block rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-zinc-200/60 dark:border-zinc-800/60">
                <div className="relative h-72">
                  <Image src={tour.mobileImage || tour.imageUrl} alt={cleanTitle} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" quality={90} />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1.5 text-white/80 text-xs mb-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" /><span>{durationText}</span>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 ml-2" /><span className="font-bold text-white">{tour.rating}</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-white leading-tight">{cleanTitle}</h3>
                    <p className="text-emerald-300 font-bold text-sm mt-1">${tour.price.toLocaleString('en-US')} {isEs ? '/ persona' : '/ person'}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5" /><span>{isEs ? 'Celebra Algo Especial' : 'Celebrate Something Special'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">{isEs ? 'Haz Inolvidable Vuestra Ocasion Especial' : 'Make Your Special Occasion Unforgettable'}</h2>
          <p className="text-zinc-600 dark:text-zinc-400">{isEs ? 'Disenamos cada detalle: aniversarios, lunas de miel, propuestas de matrimonio o simplemente el viaje de vuestra vida.' : "We design every detail: anniversaries, honeymoons, proposals, or simply the trip of your life."}</p>
          <a href={"https://wa.me/593994048458?text=" + encodeURIComponent(waMsg)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base transition-all hover:scale-105 shadow-xl">
            <MessageCircle className="w-5 h-5" />
            {isEs ? 'Disenar Nuestro Escape Perfecto' : 'Design Our Perfect Escape'}
          </a>
        </div>
      </section>
    </div>
  );
}