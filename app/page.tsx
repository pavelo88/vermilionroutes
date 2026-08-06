import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { DestinationsGrid } from '@/components/home/DestinationsGrid';
import { FeaturedTours } from '@/components/home/FeaturedTours';
import { CombinedExperienceSection } from '@/components/home/CombinedExperienceSection';
import { TikTokFeed } from '@/components/home/TikTokFeed';
import { AlsoAskedFaq } from '@/components/home/AlsoAskedFaq';
import { ContactSection } from '@/components/home/ContactSection';

export default function Home() {
  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero Section with Banner and Search Widget */}
      <HeroSection />

      {/* 2. Top Destinations Grid */}
      <DestinationsGrid />

      {/* 3. Combined Trust & Expertise Section */}
      <CombinedExperienceSection />

      {/* 4. Featured Tours */}
      <FeaturedTours />

      {/* 5. TikTok Social Showcase */}
      <TikTokFeed />

      {/* 6. Frequently Asked Questions (Also Asked) */}
      <AlsoAskedFaq />

      {/* 7. Contact & Tailor-Made Quotation Form */}
      <ContactSection />
    </div>
  );
}

