import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { mockTours } from '@/data/mock';
import { dailyTours } from '@/data/dailyToursData';
import { ToursBackgroundSlider } from '@/components/tours/ToursBackgroundSlider';
import { StatsSection } from '@/components/home/StatsSection';
import { TourCarousel } from '@/components/home/TourCarousel';
import { getLocalizedText } from '@/utils/i18nHelper';
import {
  Compass,
  Star,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';

export default async function ToursPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === 'es';

  // ── Categorización de Tours ────────────────────────────────────────────────
  // 1. Galápagos (3 tours)
  const galapagosTours = mockTours.filter((t) => {
    const dest = (typeof t.destination === 'string' ? t.destination : (t.destination as any)?.en || '').toLowerCase();
    const id = t.id.toLowerCase();
    return (dest.includes('galapagos') || id.includes('galapagos')) && !id.includes('combined') && !id.includes('ecuador-galapagos') && (t.durationDays ?? 4) > 1;
  }).slice(0, 3);

  // 2. Continental (4 tours)
  const continentalTours = mockTours.filter((t) => {
    const dest = (typeof t.destination === 'string' ? t.destination : (t.destination as any)?.en || '').toLowerCase();
    const id = t.id.toLowerCase();
    return (dest.includes('ecuador') || dest.includes('mainland') || id.includes('andes') || id.includes('volcanoes') || id.includes('amazon')) &&
      !dest.includes('galapagos') && !id.includes('galapagos') && (t.durationDays ?? 4) > 1;
  }).slice(0, 4);

  // 3. Combinados (2 tours)
  const combinedTours = mockTours.filter((t) => {
    const id = t.id.toLowerCase();
    const dest = (typeof t.destination === 'string' ? t.destination : (t.destination as any)?.en || '').toLowerCase();
    return id.includes('combined') || id.includes('ecuador-galapagos') || (dest.includes('galapagos') && dest.includes('ecuador'));
  }).slice(0, 2);

  // Si no hay combinados explícitos, tomamos los tours más largos que toquen ambos destinos
  const finalCombined = combinedTours.length >= 2 ? combinedTours : mockTours.filter(t => (t.durationDays ?? 0) >= 8).slice(0, 2);

  // Fallbacks si falta alguno en la lista
  const finalGalapagos = galapagosTours.length > 0 ? galapagosTours : mockTours.slice(0, 3);
  const finalContinental = continentalTours.length > 0 ? continentalTours : mockTours.slice(2, 6);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#07130C] text-zinc-900 dark:text-zinc-100 -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-[120px] font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300 relative">
      
      {/* ── HERO REVISTA (EDITORIAL LUXURY) ────────────────────────────────── */}
      <section className="relative pt-[146px] sm:pt-40 pb-32 border-b border-zinc-200 dark:border-white/10">
        <ToursBackgroundSlider />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/75 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/50 backdrop-blur-md border border-white/10 text-emerald-300 text-xs font-bold uppercase tracking-widest shadow-xl">
              <Compass className="w-3.5 h-3.5" />
              <span>{isEs ? 'Catálogo de Expediciones Exclusivas' : 'Exclusive Expedition Catalog'}</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl font-light text-white tracking-tight leading-tight drop-shadow-xl">
              {isEs ? (
                <>Colección de <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">Viajes Boutique</span></>
              ) : (
                <>Bespoke <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">Expeditions</span></>
              )}
            </h1>

            <p className="text-lg text-zinc-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg font-medium">
              {isEs
                ? 'Itinerarios de autor diseñados a medida por guías naturalistas en Ecuador y Galápagos. Descubre tu próxima aventura inolvidable.'
                : 'Bespoke naturalist-crafted journeys across Ecuador and the Galápagos Archipelago. Discover your next unforgettable journey.'}
            </p>

            {/* Quick anchors - MOVED DOWN */}
            <div className="flex flex-wrap justify-center gap-3 pt-8">
              <a href="#galapagos" className="px-6 py-2.5 rounded-full bg-zinc-900/60 backdrop-blur-md hover:bg-emerald-600/80 border border-white/10 hover:border-emerald-400/50 text-sm font-semibold text-white transition-all shadow-lg">
                🐢 {isEs ? 'Islas Galápagos (3)' : 'Galapagos Islands (3)'}
              </a>
              <a href="#continental" className="px-6 py-2.5 rounded-full bg-zinc-900/60 backdrop-blur-md hover:bg-emerald-600/80 border border-white/10 hover:border-emerald-400/50 text-sm font-semibold text-white transition-all shadow-lg">
                🏔️ {isEs ? 'Ecuador Continental (4)' : 'Mainland Ecuador (4)'}
              </a>
              <a href="#combinados" className="px-6 py-2.5 rounded-full bg-zinc-900/60 backdrop-blur-md hover:bg-emerald-600/80 border border-white/10 hover:border-emerald-400/50 text-sm font-semibold text-white transition-all shadow-lg">
                ✨ {isEs ? 'Viajes Combinados (2)' : 'Combined Journeys (2)'}
              </a>
              <a href="#diarios" className="px-6 py-2.5 rounded-full bg-zinc-900/60 backdrop-blur-md hover:bg-emerald-600/80 border border-white/10 hover:border-emerald-400/50 text-sm font-semibold text-white transition-all shadow-lg">
                ☀️ {isEs ? 'Excursiones Full Day' : 'Full-Day Tours'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section exactly like landing page (overlaps the hero via -mt-12) */}
      <StatsSection />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl space-y-28">

        {/* ── SECCIÓN 1: ISLAS GALÁPAGOS (3 TOURS) ─────────────────────────── */}
        <section id="galapagos" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
                <span>🐢</span> {isEs ? 'Archipiélago Encantado' : 'Enchanted Archipelago'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-zinc-900 dark:text-white">
                {isEs ? 'Expediciones en Galápagos' : 'Galapagos Expeditions'}
              </h2>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
                {isEs
                  ? 'Hoteles boutique frente al mar, navegación entre islas deshabitadas y encuentros con fauna única en el planeta.'
                  : 'Boutique oceanfront stays, uninhabited island yacht hops, and intimate wildlife encounters.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {finalGalapagos.map((tour) => {
              const title = getLocalizedText(tour.title, locale);
              const duration = getLocalizedText(tour.duration, locale);
              const desc = getLocalizedText(tour.description, locale);
              const price = tour.price3Star || tour.price || 1590;

              return (
                <div
                  key={tour.id}
                  className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={tour.imageUrl || '/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg'}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-white/10">
                        {duration}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-emerald-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
                        <Star className="w-3.5 h-3.5 fill-emerald-400" />
                        <span>{tour.rating || 5}.0</span>
                      </div>
                      <p className="font-serif text-2xl font-bold text-white">
                        ${price.toLocaleString()} <span className="text-xs font-normal text-zinc-300">USD</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {title}
                      </h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 mt-2 leading-relaxed">
                        {desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between gap-3">
                      <Link
                        href={`/${locale}/tours/${tour.id}`}
                        className="flex-1 py-3 px-4 rounded-2xl border-2 border-emerald-500/30 bg-transparent text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-500 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md text-center flex items-center justify-center group"
                      >
                        <span className="group-hover:scale-105 transition-transform">{isEs ? 'Ver Itinerario' : 'View Itinerary'}</span>
                      </Link>
                      <Link
                        href={`/${locale}/booking?tourId=${tour.id}`}
                        className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-900/30 text-center flex items-center justify-center hover:scale-[1.02] active:scale-95"
                      >
                        {isEs ? 'Reservar' : 'Book Now'}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SECCIÓN 2: ECUADOR CONTINENTAL (4 TOURS) ────────────────────── */}
        <section id="continental" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
                <span>🏔️</span> {isEs ? 'Andes & Amazonía' : 'Andes & Amazon'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-zinc-900 dark:text-white">
                {isEs ? 'Ecuador Continental' : 'Mainland Ecuador'}
              </h2>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
                {isEs
                  ? 'Avenida de los Volcanes, lagunas de cráter, haciendas coloniales y la exuberante selva del Amazonas.'
                  : 'Avenue of Volcanoes, crater lakes, colonial haciendas, and dense Amazon rainforest.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {finalContinental.map((tour) => {
              const title = getLocalizedText(tour.title, locale);
              const duration = getLocalizedText(tour.duration, locale);
              const price = tour.price3Star || tour.price || 1200;

              return (
                <div
                  key={tour.id}
                  className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 flex flex-col group shadow-lg"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={tour.imageUrl || '/images/tours/16-9/cotopaxi-volcano-16-9.jpg'}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-white/10">
                        {duration}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                    <div>
                      <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {title}
                      </h3>
                      <p className="font-serif text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                        ${price.toLocaleString()} <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">USD</span>
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between gap-2">
                      <Link
                        href={`/${locale}/tours/${tour.id}`}
                        className="flex-1 py-2.5 px-3 rounded-xl border-2 border-emerald-500/30 bg-transparent text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-500 font-bold text-[11px] uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md text-center flex items-center justify-center group"
                      >
                        <span className="group-hover:scale-105 transition-transform">{isEs ? 'Detalles' : 'Details'}</span>
                      </Link>
                      <Link
                        href={`/${locale}/booking?tourId=${tour.id}`}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold text-[11px] uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-900/30 text-center flex items-center justify-center hover:scale-[1.02] active:scale-95"
                      >
                        {isEs ? 'Reservar' : 'Book'}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SECCIÓN 3: VIAJES COMBINADOS (2 GRANDES TOURS) ───────────────── */}
        <section id="combinados" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
                <span>✨</span> {isEs ? 'La Experiencia Definitiva' : 'The Ultimate Experience'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-zinc-900 dark:text-white">
                {isEs ? 'Viajes Combinados' : 'Combined Journeys'}
              </h2>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
                {isEs
                  ? 'Lo mejor de dos mundos en un solo viaje: la majestuosidad de los Andes y la magia de las Islas Galápagos.'
                  : 'The best of both worlds in a single seamless itinerary: the Andean highlands and the Galápagos Islands.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {finalCombined.map((tour) => {
              const title = getLocalizedText(tour.title, locale);
              const duration = getLocalizedText(tour.duration, locale);
              const desc = getLocalizedText(tour.description, locale);
              const price = tour.price3Star || tour.price || 2890;

              return (
                <div
                  key={tour.id}
                  className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 rounded-[32px] overflow-hidden hover:border-blue-500/30 transition-all duration-300 flex flex-col group shadow-xl"
                >
                  <div className="relative h-72 w-full overflow-hidden">
                    <Image
                      src={tour.imageUrl || '/images/tours/16-9/galapagos-snorkeling-16-9.jpg'}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
                        {duration}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                      <span className="text-xs text-blue-300 font-semibold bg-black/60 px-3 py-1 rounded-full">
                        Andes + Galápagos VIP
                      </span>
                      <p className="font-serif text-3xl font-bold text-zinc-900 dark:text-white">
                        ${price.toLocaleString()} <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">USD</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1 justify-between space-y-6">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {title}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed line-clamp-3">
                        {desc}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-zinc-200 dark:border-white/5 flex items-center justify-between gap-4">
                      <Link
                        href={`/${locale}/tours/${tour.id}`}
                        className="flex-1 py-3.5 px-4 rounded-2xl border-2 border-emerald-500/30 bg-transparent text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-500 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md text-center flex items-center justify-center group"
                      >
                        <span className="group-hover:scale-105 transition-transform">{isEs ? 'Ver Itinerario Completo' : 'Full Itinerary'}</span>
                      </Link>
                      <Link
                        href={`/${locale}/booking?tourId=${tour.id}`}
                        className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-900/30 text-center flex items-center justify-center hover:scale-[1.02] active:scale-95"
                      >
                        {isEs ? 'Reservar Expedición' : 'Book Expedition'}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SECCIÓN 4: EXCURSIONES FULL DAY / DIARIAS (3D CAROUSEL) ──────── */}
        <section id="diarios" className="scroll-mt-24 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center justify-center gap-1.5">
              <span>☀️</span> {isEs ? 'Salidas Diarias' : 'Daily Departures'}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
              {isEs ? 'Excursiones Full Day' : 'Full-Day Excursions'}
            </h2>
            <p className="text-sm text-zinc-400">
              {isEs
                ? 'Escapadas de un día desde Quito a los destinos más icónicos del Ecuador.'
                : 'One-day getaways departing from Quito to Ecuador\'s most iconic landscapes.'}
            </p>
          </div>

          {/* Carrusel 3D interactivo */}
          <div className="pt-6">
            <TourCarousel tours={dailyTours} />
          </div>
        </section>

      </div>
    </div>
  );
}
