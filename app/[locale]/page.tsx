import React from 'react';
import dynamic from 'next/dynamic';
import { HeroSlider } from '@/components/home/HeroSlider';
import { StatsSection } from '@/components/home/StatsSection';

// Carga diferida (next/dynamic) de componentes debajo del fold para optimizar Core Web Vitals (TBT, CLS y LCP)
const DestinationsGrid = dynamic(
  () => import('@/components/home/DestinationsGrid').then((m) => m.DestinationsGrid),
  {
    loading: () => <div className="py-12 max-w-7xl mx-auto min-h-[300px]" />,
  }
);

const CombinedExperienceSection = dynamic(
  () => import('@/components/home/CombinedExperienceSection').then((m) => m.CombinedExperienceSection),
  {
    loading: () => <div className="py-12 max-w-7xl mx-auto min-h-[400px]" />,
  }
);

const FeaturedTours = dynamic(
  () => import('@/components/home/FeaturedTours').then((m) => m.FeaturedTours),
  {
    loading: () => <div className="py-12 max-w-7xl mx-auto min-h-[500px]" />,
  }
);

const AlsoAskedFaq = dynamic(
  () => import('@/components/home/AlsoAskedFaq').then((m) => m.AlsoAskedFaq),
  {
    loading: () => <div className="py-12 max-w-7xl mx-auto min-h-[300px]" />,
  }
);

const ContactSection = dynamic(
  () => import('@/components/home/ContactSection').then((m) => m.ContactSection),
  {
    loading: () => <div className="py-12 max-w-7xl mx-auto min-h-[400px]" />,
  }
);

const HomeBlogSection = dynamic(
  () => import('@/components/home/HomeBlogSection').then((m) => m.HomeBlogSection),
  {
    loading: () => <div className="py-12 max-w-7xl mx-auto min-h-[350px]" />,
  }
);

const FluidBackgroundCursor = dynamic(
  () => import('@/components/home/FluidBackgroundCursor'),
  {
    loading: () => null,
  }
);

export default function Home() {
  return (
    <div className="space-y-8 pb-12 relative">
      {/* Dynamic Fluid WebGL Shader Background & Custom Mouse Cursor */}
      <FluidBackgroundCursor />

      {/* 1. Critical Above-the-Fold Viewport */}
      <div>
        <HeroSlider />
        <div className="hidden md:block">
          <StatsSection />
        </div>
      </div>

      {/* 2. Top Destinations Grid (Diferido) */}
      <DestinationsGrid />

      {/* 3. Combined Trust & Expertise Section (Diferido) */}
      <CombinedExperienceSection />

      {/* 4. Featured Tours Carousel (Diferido) */}
      <FeaturedTours />

      {/* 5. Travel Blog & Video Expeditions (Diferido) */}
      <HomeBlogSection />

      {/* 6. Frequently Asked Questions (Diferido) */}
      <AlsoAskedFaq />

      {/* 7. Contact & Tailor-Made Quotation Form (Diferido) */}
      <ContactSection />
    </div>
  );
}
