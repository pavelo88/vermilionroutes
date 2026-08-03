import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { DestinationsGrid } from '@/components/home/DestinationsGrid';
import { FeaturedTours } from '@/components/home/FeaturedTours';
import { AboutSection } from '@/components/home/AboutSection';
import { TripAdvisorReviews } from '@/components/home/TripAdvisorReviews';
import { AlsoAskedFaq } from '@/components/home/AlsoAskedFaq';
import { ContactSection } from '@/components/home/ContactSection';

export default function Home() {
  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero Section with Banner and Search Widget */}
      <HeroSection />

      {/* 2. Top Destinations Grid */}
      <DestinationsGrid />

      {/* 3. Featured Tours with Mock Data */}
      <FeaturedTours />

      {/* 4. About Us & Credentials */}
      <AboutSection />

      {/* 5. TripAdvisor & AI Guest Reviews */}
      <TripAdvisorReviews />

      {/* 6. Frequently Asked Questions (Also Asked) */}
      <AlsoAskedFaq />

      {/* 7. Contact & Tailor-Made Quotation Form */}
      <ContactSection />
    </div>
  );
}

