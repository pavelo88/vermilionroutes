'use client';

import React, { useState, useEffect } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

const DEFAULT_DATA = [
  {
    place: 'Galapagos - Archipelago',
    title: 'ENCHANTED',
    title2: 'ISLANDS',
    description: 'A pristine natural sanctuary where sea lions, blue-footed boobies, and giant tortoises thrive in absolute harmony. Sail across volcanic landscapes and dive into an immersive, unforgettable experience.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Cotopaxi - Andes',
    title: 'MAJESTIC',
    title2: 'VOLCANO',
    description: 'The perfect snow-capped cone rising proudly over the Ecuadorian Andes. Walk among mystical paramo highlands, witness the condor\'s flight, and behold the grandeur of the Avenue of the Volcanoes.',
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Amazon - Orellana',
    title: 'YASUNÍ',
    title2: 'RAINFOREST',
    description: 'The most biodiverse spot on Earth. Navigate winding rivers surrounded by untouched jungle, spot pink dolphins, and let the mystical magic of the deep Amazon captivate your senses.',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Manabí - Pacific Coast',
    title: 'FRAILES',
    title2: 'BEACH',
    description: 'A hidden jewel of crystal-clear waters and white sands within the Machalilla National Park. Surrounded by rugged cliffs and dry forests, it remains one of South America\'s most pristine coastal retreats.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Pichincha - Quito',
    title: 'HISTORIC',
    title2: 'CENTER',
    description: 'The first World Cultural Heritage site. Cobblestone streets, colonial monasteries, and baroque cathedrals perched at 2,800 meters under the monumental shadow of the high Andes.',
    image: 'https://images.unsplash.com/photo-1616089308119-971c2ba244d2?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Cusco - Peru',
    title: 'SACRED',
    title2: 'VALLEY',
    description: 'Journey into the heart of the Inca Empire. Traverse terraced hillsides, discover ancient citadels hidden in the mist, and connect with the timeless heritage of the Andean people.',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Patagonia - Argentina',
    title: 'PERITO',
    title2: 'MORENO',
    description: 'A colossal river of blue ice advancing into Lake Argentino. Listen to the thunderous roar of calving ice blocks in one of the most breathtaking natural spectacles on the planet.',
    image: 'https://images.unsplash.com/photo-1549449179-8cb1f414e8c1?auto=format&fit=crop&w=2752&q=80'
  },
  {
    place: 'Potosí - Bolivia',
    title: 'UYUNI',
    title2: 'SALT FLATS',
    description: 'The world\'s largest salt flat, where the earth meets the sky in a mirror-like illusion. A surreal landscape of blinding white expanses, colorful lagoons, and dormant volcanoes.',
    image: 'https://images.unsplash.com/photo-1533083161350-9c2f6d0fba75?auto=format&fit=crop&w=2752&q=80'
  }
];

export function HeroSection() {
  const { settings } = useSettings();
  const locale = useLocale();
  const validSlides = settings?.hero?.slides?.filter((s: any) => s.image && s.title);
  const slidesData = validSlides?.length ? validSlides : DEFAULT_DATA;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex, slidesData.length]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentSlide = slidesData[currentIndex];

  const scrollToTours = () => {
    const el = document.getElementById('tours');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // [MODIFICA ESTO] Para cambiar el alto del Hero:
    // h-[95svh] controla el alto en celulares (95% de la pantalla)
    // lg:h-[75svh] controla el alto en pantallas grandes/PC (75% de la pantalla)
    <div className="relative w-full h-[95svh] lg:h-[75svh] min-h-[600px] overflow-hidden bg-zinc-950 font-sans text-white">
      {/* Background Image with crossfade and Ken Burns slow zoom */}
      {slidesData.map((slide: any, idx: number) => (
        <div
          key={idx}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100 z-[1]' : 'opacity-0 z-0'}`}
        >
          {/* The image div with the slow zoom */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform ease-out"
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: idx === currentIndex ? 'scale(1.05)' : 'scale(1)',
              transitionDuration: '4000ms'
            }}
          />
          {/* Subtle Gradients for contrast */}
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />
        </div>
      ))}

      {/* Main Content Area */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-32">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between w-full relative">

          {/* Left Text Content - Key forces React to recreate DOM, preventing Google Translate glitches */}
          <div key={currentIndex} className="flex-1 max-w-2xl mb-12 lg:mb-0 transition-all duration-700 animate-in fade-in slide-in-from-bottom-4">
            <div className="mb-4">
              <div className="w-10 h-[2px] bg-white mb-3" />
              <h3 className="text-sm md:text-base font-semibold tracking-widest uppercase text-white/90">
                {getLocalizedText(currentSlide.place, locale)}
              </h3>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[90px] font-oswald font-extrabold leading-[0.9] mb-6 uppercase tracking-tight text-white drop-shadow-2xl">
              <span>{getLocalizedText(currentSlide.title, locale)}</span> <br />
              <span>{getLocalizedText(currentSlide.title2, locale)}</span>
            </h1>

            <p className="text-sm md:text-lg text-white/90 max-w-xl mb-8 leading-relaxed drop-shadow-md">
              <span>{getLocalizedText(currentSlide.description, locale)}</span>
            </p>

            <div className="flex items-center gap-4">
              <button className="w-12 h-12 rounded-full border border-white/50 hover:bg-white hover:text-black flex items-center justify-center transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
              <Button
                onClick={scrollToTours}
                className="bg-transparent border border-white hover:bg-white hover:text-black text-white rounded-full px-8 py-6 uppercase tracking-widest text-xs font-bold transition-colors"
              >
                EXPLORE DESTINATIONS
              </Button>
            </div>
          </div>

          {/* Right side Thumbnail Cards (Hard Cut layout) */}
          <div className="hidden lg:flex gap-4 absolute right-0 bottom-0 w-[768px] translate-x-[90px]">
            {[1, 2, 3, 4].map((offset) => {
              const idx = (currentIndex + offset) % slidesData.length;
              const slide = slidesData[idx];

              return (
                <div
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="w-[180px] h-[260px] rounded-2xl overflow-hidden relative group cursor-pointer border border-white/20 hover:border-white transition-all flex-shrink-0 bg-black"
                >
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" style={{ backgroundImage: `url(${slide.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5 text-left">
                    <div className="w-4 h-[2px] bg-white mb-2" />
                    <p className="text-[9px] uppercase font-bold text-white/80 tracking-widest mb-1 line-clamp-1">{getLocalizedText(slide.place, locale)}</p>
                    <h4 className="text-white font-oswald text-xl uppercase leading-none tracking-wide">{getLocalizedText(slide.title, locale)}</h4>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-6 left-0 w-full z-20 flex items-center justify-between px-6 md:px-16 lg:px-24">

        {/* Navigation Arrows */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-black text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-black text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Line */}
        <div className="hidden md:flex items-center gap-6 flex-1 max-w-md mx-8">
          <div className="h-[2px] w-full bg-white/20 relative rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-white transition-all duration-500 ease-out rounded-full"
              style={{ width: `${((currentIndex + 1) / slidesData.length) * 100}%` }}
            />
          </div>
          <span className="text-white font-oswald text-xl font-bold tracking-widest">
            {currentIndex + 1}
          </span>
        </div>
      </div>

    </div>
  );
}
