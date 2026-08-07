'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { SmartSearch } from '@/components/home/SmartSearch';
import { useSettings } from '@/hooks/useSettings';
import { Sparkles, Users, CheckCircle2 } from 'lucide-react';

// Subtle Sparkle particle component
const SparkleOverlay = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-amber-200/80 rounded-full animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export function HeroSection() {
  const { settings } = useSettings();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Get background images array
  const bgImages = settings?.hero?.backgroundImages && settings.hero.backgroundImages.length > 0 
    ? settings.hero.backgroundImages 
    : (settings?.hero?.backgroundImage ? [settings.hero.backgroundImage] : ['/images/hero/hero_galapagos.png', '/images/hero/hero_machu_picchu.png']);

  useEffect(() => {
    if (bgImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [bgImages.length]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20; // max 20px displacement
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const hasBg = bgImages.length > 0;

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[75vh] flex flex-col justify-center pt-8 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden bg-zinc-950"
    >
      {/* Background Carousel */}
      {hasBg && bgImages.map((src, idx) => (
        <div
          key={idx}
          className="absolute inset-[-2%] w-[104%] h-[104%] transition-opacity duration-1000 ease-in-out z-0"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: idx === currentImageIndex ? 1 : 0,
            transform: `translate3d(${mousePos.x * -1}px, ${mousePos.y * -1}px, 0) scale(1.02)`,
            transition: idx === currentImageIndex ? 'transform 0.2s ease-out' : 'opacity 1s ease-in-out',
          }}
        />
      ))}

      {/* Dark Overlay for contrast */}
      {hasBg && <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none" />}
      
      {/* Sparkles / Escarchas */}
      {hasBg && <SparkleOverlay />}

      {/* Parallax Content Container */}
      <div 
        className="max-w-6xl mx-auto text-center space-y-8 relative z-10 w-full pt-4 transition-transform duration-200 ease-out"
        style={{
          transform: hasBg ? `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)` : 'none'
        }}
      >
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-emerald-500/30 shadow-sm text-xs sm:text-sm font-medium text-emerald-100 mx-auto">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>{settings?.hero?.badge || 'Boutique Travel Agency • Galapagos, Ecuador & Peru Specialists'}</span>
        </div>

        {/* Hero Title */}
        <h1 className={`font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] ${hasBg ? 'text-white [text-shadow:0_4px_12px_rgba(0,0,0,0.5)]' : 'text-zinc-900'}`}>
          {settings?.hero?.title || 'Tailor-Made Premium Expeditions'} <br />
          <span className="bg-gradient-to-r from-emerald-400 via-amber-200 to-emerald-300 bg-clip-text text-transparent relative z-10">
            {settings?.hero?.titleColored || 'Crafted for Extraordinary Travel'}
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className={`text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed ${hasBg ? 'text-zinc-200 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]' : 'text-zinc-600'}`}>
          {settings?.hero?.subtitle || 'Cruise the enchanted Galapagos Islands, trek the volcanic spine of the high Andes, explore the deep Amazon rainforest, and uncover the mysteries of Machu Picchu.'}
        </p>

        {/* Smart Search Bar Component */}
        <div className="pt-2 drop-shadow-2xl">
          <SmartSearch />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a href="#contact">
            <Button variant="outline" size="lg" className="gap-2 bg-white/90 text-zinc-900 border-zinc-200 hover:bg-white shadow">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Request Custom Itinerary</span>
            </Button>
          </a>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs sm:text-sm font-medium text-zinc-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Certified Multilingual Naturalist Guides</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>24/7 Dedicated On-Trip Concierge</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Best Direct Operator Rate Guarantee</span>
          </div>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-zinc-200/85 shadow-sm text-center space-y-1">
            <p className="font-serif text-3xl font-bold text-emerald-700">100%</p>
            <p className="text-xs text-zinc-600 font-medium">Bespoke Tailor-Made</p>
          </div>
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-zinc-200/85 shadow-sm text-center space-y-1">
            <p className="font-serif text-3xl font-bold text-emerald-700">+15 Yrs</p>
            <p className="text-xs text-zinc-600 font-medium">Field Travel Expertise</p>
          </div>
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-zinc-200/85 shadow-sm text-center space-y-1">
            <p className="font-serif text-3xl font-bold text-emerald-700">4.9 / 5 ★</p>
            <p className="text-xs text-zinc-600 font-medium">Guest Satisfaction</p>
          </div>
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-zinc-200/85 shadow-sm text-center space-y-1">
            <p className="font-serif text-3xl font-bold text-emerald-700">24 / 7</p>
            <p className="text-xs text-zinc-600 font-medium">En-Route Concierge</p>
          </div>
        </div>
      </div>
    </section>
  );
}

