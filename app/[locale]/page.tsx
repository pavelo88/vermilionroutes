import React from 'react';
import dynamic from 'next/dynamic';
import { HeroSlider } from '@/components/home/HeroSlider';
import { StatsSection } from '@/components/home/StatsSection';
import { DestinationsGrid } from '@/components/home/DestinationsGrid';
import { CombinedExperienceSection } from '@/components/home/CombinedExperienceSection';
import { FeaturedTours } from '@/components/home/FeaturedTours';
import { HomeBlogSection } from '@/components/home/HomeBlogSection';
import { AlsoAskedFaq } from '@/components/home/AlsoAskedFaq';
import { ContactSection } from '@/components/home/ContactSection';

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
        <StatsSection />
      </div>

      {/* 2. Top Destinations Grid (Direct SSR - 0.00 CLS) */}
      <DestinationsGrid />

      {/* 3. Combined Trust & Expertise Section (Direct SSR - 0.00 CLS) */}
      <CombinedExperienceSection />

      {/* 4. Featured Tours Carousel (Direct SSR - 0.00 CLS) */}
      <FeaturedTours />

      {/* 5. Travel Blog & Video Expeditions (Direct SSR - 0.00 CLS) */}
      <HomeBlogSection />

      {/* 6. Frequently Asked Questions (Direct SSR - 0.00 CLS) */}
      <AlsoAskedFaq />

      {/* 7. Contact & Tailor-Made Quotation Form (Direct SSR - 0.00 CLS) */}
      <ContactSection />
    </div>
  );
}
