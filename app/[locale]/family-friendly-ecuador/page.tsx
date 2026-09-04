import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, MessageCircle, ArrowRight, Users, ShieldCheck, Smile } from 'lucide-react';
import { mockTours } from '@/data/mock';
import { getLocalizedText } from '@/utils/i18nHelper';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return {
    title: isEs
      ? 'Vermilion Routes | Aventuras Familiares en Ecuador 24/7'
      : 'Vermilion Routes | Family Adventures in Ecuador & Galapagos',
    description: isEs
      ? 'Expediciones familiares en Galápagos y Ecuador: tortugas gigantes, snorkel y selva amazónica. Viajes seguros e inolvidables con atención personalizada 24/7.'
      : 'Bespoke luxury family adventures in Galapagos and Ecuador: giant tortoises, sea-lion snorkeling and Amazon jungle lodges with 24/7 dedicated concierge service.',
    keywords: ['family Galapagos trip', 'family Ecuador vacation', 'Galapagos with kids', 'Ecuador family adventure', 'family-friendly Galapagos'],
    alternates: { canonical: "https://vermilionroutes.com/" + locale + "/family-friendly-ecuador" },
  };
}

const FAMILY_TOUR_IDS = ['galapagos-4days', 'galapagos-5days', 'ecuador-fantastic-8days', 'andes-amazon-7days', 'ecuador-galapagos-12days'];

export default async function FamilyFriendlyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === 'es';
  const familyTours = mockTours.filter(t => FAMILY_TOUR_IDS.includes(t.id));
  const waMsg = isEs ? 'Hola Vermilion Routes, quiero planificar una aventura familiar en Ecuador y/o Galapagos.' : 'Hello Vermilion Routes, I want to plan a family adventure in Ecuador and/or Galapagos.';

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#07130C] text-zinc-900 dark:text-zinc-100">
      <section className="relative min-h-[85vh] flex items-end pb-20 pt-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/tours/9-16/galapagos-tortuga-gigante-9-16.jpg" alt={isEs ? 'Tortuga gigante Galapagos familia' : 'Giant tortoise Galapagos family'} fill className="object-cover" priority quality={90} sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto w-full space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isEs ? 'Aventuras Familiares' : 'Family Adventures'}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {isEs ? 'Aventuras Familiares en Ecuador y Galapagos' : 'Family Adventures in Ecuador & Galapagos'}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
            {isEs ? 'Descubrid juntos tortugas gigantes, leones marinos, volcanes nevados y selva amazonica. Expediciones disenadas para todas las edades, 100% privadas y a vuestro ritmo.' : "Discover giant tortoises, sea lions, snowy volcanoes and Amazon jungle together. Expeditions designed for all ages, 100% private and at your pace."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={"https://wa.me/593994048458?text=" + encodeURIComponent(waMsg)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all hover:scale-105 shadow-lg">
              <MessageCircle className="w-4 h-4" />
              {isEs ? 'Planificar Nuestra Aventura' : 'Plan Our Family Adventure'}
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
            { icon: ShieldCheck, en: 'Certified Child-Safe Guides', es: 'Guias Certificados para Familias' },
            { icon: Smile, en: 'Kid-Friendly Activities at Every Stop', es: 'Actividades para Ninos en Cada Parada' },
            { icon: Users, en: '100% Private — Your Family Only', es: '100% Privado — Solo Vuestra Familia' },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900/80 rounded-2xl p-8 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center mx-auto">
                <item.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">{isEs ? item.es : item.en}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">{isEs ? 'Tours Aptos para Familias' : 'Family-Friendly Tours'}</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">{isEs ? 'Seleccionados por su seguridad, actividades para ninos y flexibilidad de ritmo.' : 'Selected for safety, kid-friendly activities, and flexible pacing.'}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {familyTours.slice(0, 3).map((tour) => {
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
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">{isEs ? 'El Viaje Familiar que Siempre Sonasteis' : 'The Family Trip You Have Always Dreamed Of'}</h2>
          <p className="text-zinc-600 dark:text-zinc-400">{isEs ? 'Cada aventura es 100% privada y adaptada a las edades y ritmos de vuestra familia.' : "Every adventure is 100% private and adapted to your family's ages and pace."}</p>
          <a href={"https://wa.me/593994048458?text=" + encodeURIComponent(waMsg)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base transition-all hover:scale-105 shadow-xl">
            <MessageCircle className="w-5 h-5" />
            {isEs ? 'Disenar Nuestra Aventura Familiar' : 'Design Our Family Adventure'}
          </a>
        </div>
      </section>
    </div>
  );
}