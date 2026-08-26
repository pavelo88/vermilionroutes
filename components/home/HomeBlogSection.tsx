'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { BookOpen, ArrowRight, Clock, Play, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogData';
import { getLocalizedText } from '@/utils/i18nHelper';

const VIDEO_GUIDES = [
  {
    id: 'YF8ZJuV3NGo',
    title: {
      en: "Ecuador's Amazon Adventure: Exploring the Oriente",
      es: 'Aventura en la Amazonía Ecuatoriana: Explorando el Oriente'
    },
    desc: {
      en: 'Rainforest paradise rich in biodiversity and ancestral Kichwa culture.',
      es: 'Paraíso de selva virgen con alta biodiversidad y cultura ancestral.'
    },
    thumb: 'https://img.youtube.com/vi/YF8ZJuV3NGo/maxresdefault.jpg'
  },
  {
    id: 'AYLgFKlpddM',
    title: {
      en: "Quilotoa Crater Lake: Ecuador's Hidden Gem",
      es: 'Laguna del Quilotoa: La Joya Esmeralda de los Andes'
    },
    desc: {
      en: 'Majestic turquoise volcanic caldera nestled at 3,500 meters altitude.',
      es: 'Impresionante caldera volcánica de aguas turquesa a 3.500m.'
    },
    thumb: 'https://img.youtube.com/vi/AYLgFKlpddM/maxresdefault.jpg'
  },
  {
    id: 'jkO62poRZQo',
    title: {
      en: 'Birdwatching Paradise: Exploring Galapagos Birds',
      es: 'Paraíso de Aves: Explorando las Especies de Galápagos'
    },
    desc: {
      en: 'Blue-footed boobies, Darwin finches, and flightless cormorants.',
      es: 'Piqueros de patas azules, pinzones de Darwin y cormoranes.'
    },
    thumb: 'https://img.youtube.com/vi/jkO62poRZQo/maxresdefault.jpg'
  },
  {
    id: 'u0klmckz7fg',
    title: {
      en: 'The Wonderful Ecuador & Galapagos Routes',
      es: 'El Maravilloso Ecuador y Rutas de Galápagos'
    },
    desc: {
      en: 'Boutique tailor-made expeditions designed by Vermilion Routes.',
      es: 'Expediciones privadas y a medida diseñadas por Vermilion Routes.'
    },
    thumb: 'https://img.youtube.com/vi/u0klmckz7fg/maxresdefault.jpg'
  }
];

export function HomeBlogSection() {
  const locale = useLocale();
  const featuredPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-12">

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Vermilion Travel Magazine &amp; Field Notes</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white leading-tight">
            {locale === 'es' ? 'Guías, Cultura y Experiencias de Viaje' : 'Travel Guides, Wildlife & Cultural Stories'}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            {locale === 'es'
              ? '«Operador turístico directo en Ecuador, diseñamos viajes extraordinarios con la mejor calidad de servicio para vivir experiencias inolvidables».'
              : '«Direct tour operator based in Ecuador, we design extraordinary trips with the best quality of service to live unforgettable experiences».'}
          </p>
        </div>

        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0 self-start md:self-auto"
        >
          <span>{locale === 'es' ? 'Ver Todos los Artículos' : 'Explore All Articles'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 3 Featured Blog Articles Cards */}
      <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
        {featuredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/${locale}/blog/${post.slug}`}
            className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/60 rounded-3xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center"
          >
            <div className="relative h-48 sm:h-52 w-full overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={getLocalizedText(post.title, locale)}
                fill
                quality={95}
                sizes="(max-width: 768px) 85vw, (max-width: 1200px) 33vw, 400px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-wider font-semibold text-emerald-300">
                {getLocalizedText(post.category, locale)}
              </div>
            </div>

            <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{post.publishedAt}</span>
                </div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
                  {getLocalizedText(post.title, locale)}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-2 font-light">
                  {getLocalizedText(post.excerpt, locale)}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 pt-2 group-hover:translate-x-1 transition-transform">
                <span>{locale === 'es' ? 'Leer artículo' : 'Read full guide'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Video Expedition Gallery Preview */}
      <div className="bg-zinc-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-zinc-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{locale === 'es' ? 'Videos de Expedición' : 'Expedition Videos'}</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {locale === 'es' ? 'Galápagos & Ecuador en Alta Definición' : 'Galapagos & Ecuador in Cinematic HD'}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VIDEO_GUIDES.map((vid, idx) => (
            <a
              key={vid.id}
              href={`https://www.youtube.com/watch?v=${vid.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-emerald-500 transition-all flex-col shadow-lg ${idx >= 2 ? 'hidden sm:flex' : 'flex'}`}
            >
              <div className="relative h-36 w-full overflow-hidden">
                <Image
                  src={vid.thumb}
                  alt={getLocalizedText(vid.title, locale)}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-600/90 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-3.5 space-y-1">
                <h4 className="font-sans font-bold text-xs text-zinc-100 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                  {getLocalizedText(vid.title, locale)}
                </h4>
                <p className="text-[11px] text-zinc-300 line-clamp-2">
                  {getLocalizedText(vid.desc, locale)}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="sm:hidden pt-2 flex justify-center border-t border-zinc-800">
          <a
            href="https://www.youtube.com/@VermilionSouthAmericanRoutes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-600/50 bg-emerald-950/40 text-emerald-400 text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            <span>{locale === 'es' ? 'Ver galería completa' : 'Watch all videos'}</span>
            <Play className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </section>
  );
}
