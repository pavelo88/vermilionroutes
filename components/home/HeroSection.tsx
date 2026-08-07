'use client';

import React, { useState, useEffect } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { ChevronLeft, ChevronRight, Bookmark, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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
    place: 'Cusco - Peru',
    title: 'SACRED',
    title2: 'VALLEY',
    description: 'Journey into the heart of the Inca Empire. Traverse terraced hillsides, discover ancient citadels hidden in the mist, and connect with the timeless heritage of the Andean people.',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2752&q=80'
  }
];

export function HeroSection() {
  const { settings } = useSettings();
  const validSlides = settings?.hero?.slides?.filter((s: any) => s.image && s.title);
  const slidesData = validSlides?.length ? validSlides : DEFAULT_DATA;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
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
    <div className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-zinc-950 font-sans text-white">
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
              transform: idx === currentIndex ? 'scale(1.1)' : 'scale(1)',
              transitionDuration: '5000ms'
            }}
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        </div>
      ))}

      {/* Main Content Area */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 lg:px-24">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between w-full h-full pt-32">
          
          {/* Left Text Content */}
          <div className="flex-1 max-w-2xl mb-12 lg:mb-0 transition-all duration-700 transform translate-y-0 opacity-100 animate-in slide-in-from-bottom-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[2px] bg-emerald-500" />
              <h3 className="text-sm md:text-base font-medium tracking-widest uppercase text-emerald-400">
                {currentSlide.place}
              </h3>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[100px] font-oswald font-bold leading-[0.9] mb-6 uppercase tracking-tight text-white drop-shadow-2xl">
              {currentSlide.title} <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">{currentSlide.title2}</span>
            </h1>
            
            <p className="text-sm md:text-lg text-zinc-300 max-w-xl mb-8 leading-relaxed drop-shadow-md border-l-2 border-emerald-500/50 pl-4">
              {currentSlide.description}
            </p>
            
            <div className="flex items-center gap-4">
              <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 transition-colors">
                <Bookmark className="w-5 h-5 text-white" />
              </button>
              <Button 
                onClick={scrollToTours}
                className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-8 py-6 uppercase tracking-wider text-sm font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all flex items-center gap-2"
              >
                Explore Destinations
                <ArrowDown className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right side Thumbnail Cards */}
          <div className="hidden lg:flex gap-4 items-end pb-8">
            {slidesData.map((slide: any, idx: number) => {
              // Only show 3 thumbnails max (exclude current or just show next 3)
              if (idx === currentIndex) return null;
              
              return (
                <div 
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="w-[180px] h-[260px] rounded-2xl overflow-hidden relative group cursor-pointer border-2 border-white/10 hover:border-emerald-500/50 transition-all shadow-xl"
                >
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${slide.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider mb-1 line-clamp-1">{slide.place}</p>
                    <h4 className="text-white font-oswald text-xl uppercase leading-tight">{slide.title}</h4>
                  </div>
                </div>
              );
            }).slice(0, 3)}
          </div>

        </div>

      </div>

      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/60 to-transparent z-20 flex items-center justify-between px-6 md:px-16 lg:px-24">
        
        {/* Navigation Arrows */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 hover:border-white transition-colors backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 hover:border-white transition-colors backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Progress Line */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
          <div className="h-[2px] w-full bg-white/20 relative rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-emerald-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${((currentIndex + 1) / slidesData.length) * 100}%` }}
            />
          </div>
          <span className="text-white font-oswald text-2xl font-bold">
            {currentIndex + 1}
          </span>
        </div>
      </div>

    </div>
  );
}
