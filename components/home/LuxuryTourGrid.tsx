'use client';

import React, { useState, useRef, useMemo } from 'react';
import { Tour } from '@/types';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Image from 'next/image';
import { Sparkles, ArrowRight, Clock, MapPin, Star, Compass } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';
import { TourModal } from '@/components/tours/TourModal';

interface LuxuryTourGridProps {
  tours: Tour[];
}

// 3D Background Topography Mesh (Pure R3F - Zero external weight)
function BackgroundTopography() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.z = t * 0.04;
      meshRef.current.rotation.x = -Math.PI / 4 + Math.sin(t * 0.3) * 0.1;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]} rotation={[-Math.PI / 4, 0, 0]}>
      <torusKnotGeometry args={[5, 1.2, 80, 20]} />
      <meshBasicMaterial color="#8F1010" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

export function LuxuryTourGrid({ tours }: LuxuryTourGridProps) {
  const t = useTranslations('tours');
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  const CATEGORIES = [
    { id: 'all', label: t('filter.all') },
    { id: 'Ecuador', label: `🏔️ ${t('filter.ecuador')}` },
    { id: 'Galapagos', label: `🐢 ${t('filter.galapagos')}` },
    { id: 'Combined', label: `✨ ${t('filter.combined')}` },
    { id: 'FullDay', label: `☀️ ${t('filter.fullday')}` },
  ];

  const filteredTours = useMemo(() => {
    if (activeFilter === 'all') return tours;
    return tours.filter((tour) => {
      const dest = (typeof tour.destination === 'string' ? tour.destination : (tour.destination as any)?.en || (tour.destination as any)?.es || '').toLowerCase();
      const id = (tour.id || '').toLowerCase();
      const durationDays = tour.durationDays ?? (typeof tour.duration === 'string' && (tour.duration.includes('1 DAY') || tour.duration.includes('1 DÍA')) ? 1 : 0);
      const isDaily = durationDays === 1 || id.includes('quito-city') || id.includes('otavalo') || id.includes('papallacta') || id.includes('mindo') || id.includes('antisana') || id.includes('cotopaxi') || id.includes('quilotoa') || dest.includes('full') || dest.includes('daily');

      if (activeFilter === 'FullDay') return isDaily;
      if (activeFilter === 'Ecuador') return !isDaily && (dest.includes('ecuador') || id.includes('volcanoes') || id.includes('andes') || id.includes('snow') || id.includes('fantastic')) && !dest.includes('galapagos');
      if (activeFilter === 'Galapagos') return !isDaily && (dest.includes('galapagos') || id.includes('galapagos')) && !dest.includes('ecuador');
      if (activeFilter === 'Combined') return !isDaily && (id.includes('ecuador-galapagos') || (dest.includes('galapagos') && dest.includes('ecuador')) || dest.includes('&'));
      return false;
    });
  }, [tours, activeFilter]);

  return (
    <section className="relative bg-[#222326] text-[#EEEFEB] py-20 px-4 sm:px-6 lg:px-12 rounded-3xl overflow-hidden shadow-2xl my-8 border border-white/5">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 overflow-hidden">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true, powerPreference: 'low-power' }}>
          <ambientLight intensity={0.6} />
          <BackgroundTopography />
        </Canvas>
      </div>

      {/* Header & Filter Pills */}
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8F1010]/20 border border-[#8F1010]/40 text-xs font-semibold text-red-200 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#8F1010]" />
            <span>Colección Editorial</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Expediciones & <span className="text-[#8F1010] italic">Destinos de Autor</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {CATEGORIES.map((cat) => (
              <button
                suppressHydrationWarning
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat.id
                    ? 'bg-[#8F1010] text-white shadow-lg shadow-[#8F1010]/40 scale-105'
                    : 'bg-[#1C1D1E] text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric 12-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 pt-6">
          {filteredTours.map((tour, index) => {
            const isWide = index % 3 === 0;
            const colSpan = isWide ? 'md:col-span-7' : 'md:col-span-5';
            const rawTitle = getLocalizedText(tour.title, locale);
            const rawDest = getLocalizedText(tour.destination, locale);
            const rawDuration = getLocalizedText(tour.duration, locale);
            const rawDesc = getLocalizedText(tour.description, locale);
            const imageSrc = tour.desktopImage || tour.imageUrl || '/images/tours/16-9/cotopaxi-volcano-16-9.jpg';

            return (
              <article
                key={tour.id}
                onClick={() => setSelectedTour(tour)}
                className={`group relative ${colSpan} bg-[#1C1D1E] rounded-2xl overflow-hidden cursor-pointer border border-white/5 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#8F1010]/40`}
                style={{
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6)',
                }}
              >
                {/* Image Container with Parallax Zoom */}
                <div className={`relative w-full overflow-hidden ${isWide ? 'aspect-[16/10]' : 'aspect-[4/5]'}`}>
                  <Image
                    src={imageSrc}
                    alt={rawTitle}
                    fill
                    sizes={isWide ? '(max-width: 768px) 100vw, 60vw' : '(max-width: 768px) 100vw, 40vw'}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    unoptimized
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1D1E] via-[#1C1D1E]/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/30 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {rawDuration}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8F1010] text-white shadow-md">
                      ${tour.price} USD
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 space-y-3 bg-[#1C1D1E]">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#C5A880] tracking-wider uppercase">
                    <MapPin className="w-3.5 h-3.5 text-[#8F1010]" />
                    <span>{rawDest}</span>
                    <span className="text-zinc-600">•</span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{tour.rating || 5}.0</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-red-200 transition-colors line-clamp-2 leading-snug">
                    {rawTitle}
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed font-sans">
                    {rawDesc}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs">
                    <span className="text-zinc-500 font-sans">
                      {tour.reviewsCount || 30}+ opiniones verificadas
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#C5A880] font-semibold group-hover:translate-x-1 transition-transform">
                      Ver Itinerario Completo
                      <ArrowRight className="w-3.5 h-3.5 text-[#8F1010]" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedTour && (
        <TourModal tour={selectedTour} isOpen={!!selectedTour} onClose={() => setSelectedTour(null)} />
      )}
    </section>
  );
}
