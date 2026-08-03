'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { SmartSearch } from '@/components/home/SmartSearch';
import { useSettings } from '@/hooks/useSettings';
import {
  Sparkles,
  Users,
  CheckCircle2
} from 'lucide-react';

export function HeroSection() {
  const { settings } = useSettings();

  const bgStyle = settings?.hero?.backgroundImage
    ? { backgroundImage: `url(${settings.hero.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};

  return (
    <section
      style={bgStyle}
      className="relative min-h-[90vh] flex flex-col justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Dark Overlay for better contrast when background image is active */}
      {settings?.hero?.backgroundImage && (
        <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />
      )}
      
      {/* Decorative Blur Orbs (Only shown if no bg image to keep it clean) */}
      {!settings?.hero?.backgroundImage && (
        <>
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 -right-20 w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10 w-full pt-4">
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-emerald-200/60 shadow-sm text-xs sm:text-sm font-medium text-emerald-800 mx-auto">
          <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>{settings?.hero?.badge || 'Boutique Travel Agency • Galapagos, Ecuador & Peru Specialists'}</span>
        </div>

        {/* Hero Title */}
        <h1 className={`font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] ${settings?.hero?.backgroundImage ? 'text-white' : 'text-zinc-900'}`}>
          {settings?.hero?.title || 'Tailor-Made Luxury Expeditions'} <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 bg-clip-text text-transparent">
            {settings?.hero?.titleColored || 'Crafted for Extraordinary Travel'}
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className={`text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed ${settings?.hero?.backgroundImage ? 'text-zinc-200' : 'text-zinc-600'}`}>
          {settings?.hero?.subtitle || 'Cruise the enchanted Galapagos Islands, trek the volcanic spine of the high Andes, explore the deep Amazon rainforest, and uncover the mysteries of Machu Picchu.'}
        </p>

        {/* Smart Search Bar Component */}
        <div className="pt-2">
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
        <div className={`flex flex-wrap items-center justify-center gap-6 pt-6 text-xs sm:text-sm font-medium ${settings?.hero?.backgroundImage ? 'text-zinc-300' : 'text-zinc-600'}`}>
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

