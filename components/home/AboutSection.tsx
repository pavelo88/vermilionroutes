'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Award, Heart, Compass, ArrowRight } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

export function AboutSection() {
  const { settings } = useSettings();

  return (
    <section id="about-us" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200/60">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column Image Mosaic */}
        <div className="relative">
          <div className="relative h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-zinc-200">
            <Image
              src={settings?.about?.imageUrl || "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1200&q=80"}
              alt="Vermilion Routes Expedition"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Floating Glass Card */}
          <div className="absolute -bottom-6 -right-2 sm:right-6 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-zinc-200/80 max-w-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
              <Award className="w-5 h-5" />
              <span>Certified Destination Operator</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Official Ministry of Tourism license and international credentials to operate in protected National Parks.
            </p>
          </div>
        </div>

        {/* Right Column Content */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-800">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>{settings?.about?.subtitle || 'About Vermilion Routes'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
            {settings?.about?.title || 'Crafting Unforgettable Expeditions in the Heart of South America'}
          </h2>

          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            {settings?.about?.paragraph1 || 'Vermilion Routes was founded with a passion to elevate how discerning global travelers discover Ecuador, the Galapagos, and Peru. We craft bespoke journeys that manage every logistical detail seamlessly—pairing boutique luxury with deep, respectful cultural and wildlife immersion.'}
          </p>

          <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
            {settings?.about?.paragraph2 || ''}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-sm space-y-1">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>{settings?.about?.metric1Lbl || 'Guaranteed & Flexible Travel'}</span>
              </div>
              <p className="text-xs text-zinc-500">
                {settings?.about?.metric1Val || 'Book with confidence knowing you have 100% flexible booking policies.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-sm space-y-1">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>{settings?.about?.metric2Lbl || 'Sustainable Local Impact'}</span>
              </div>
              <p className="text-xs text-zinc-500">
                {settings?.about?.metric2Val || 'We actively support indigenous artisan communities and ecological projects.'}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <a href="#contact">
              <Button variant="primary" size="md" className="gap-2">
                <span>Speak with a Travel Specialist</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
