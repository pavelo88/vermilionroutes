import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getToursFromFirestore, getTourByIdFromFirestore } from '@/lib/tours';
import { TourGallery } from '@/components/tours/TourGallery';
import { TourItinerary } from '@/components/tours/TourItinerary';
import { BookingSidebar } from '@/components/tours/BookingSidebar';
import { TripAdvisorReviews } from '@/components/home/TripAdvisorReviews';
import { Button } from '@/components/ui/Button';
import { ExpeditionFacts } from '@/components/tours/ExpeditionFacts';
import { ExpeditionRouteMap } from '@/components/tours/ExpeditionRouteMap';
import {
  MapPin,
  Clock,
  Star,
  ArrowLeft,
  Check,
  X,
  Compass,
  ShieldCheck,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface TourDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

import { mockTours } from '@/data/mock';

export async function generateStaticParams() {
  return mockTours.map((tour) => ({
    id: tour.id,
  }));
}

export async function generateMetadata({ params }: TourDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tour = await getTourByIdFromFirestore(resolvedParams.id);

  if (!tour) {
    return {
      title: 'Tour Package Not Found | Vermilion Routes',
    };
  }

  const days = tour.durationDays || tour.duration;

  return {
    title: `${tour.title} (${days}) | Vermilion Routes`,
    description: tour.shortDescription || tour.description?.slice(0, 160),
    openGraph: {
      title: `${tour.title} - ${tour.destination}`,
      description: tour.shortDescription || tour.description?.slice(0, 160),
      images: [
        {
          url: tour.mainImage || tour.imageUrl,
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
    },
    alternates: {
      canonical: `https://vermilionroutes.com/tours/${tour.id}`,
      languages: {
        'en-US': `https://vermilionroutes.com/en/tours/${tour.id}`,
        'es-EC': `https://vermilionroutes.com/es/tours/${tour.id}`,
      },
    },
  };
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const resolvedParams = await params;
  const tour = await getTourByIdFromFirestore(resolvedParams.id);

  if (!tour) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center space-y-6 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-zinc-900">
          Tour Package Not Found
        </h1>
        <p className="text-zinc-600 text-sm leading-relaxed">
          The requested travel itinerary could not be found. We invite you to explore our curated selection of exclusive journeys through Ecuador and Galapagos.
        </p>
        <Link href="/">
          <Button variant="primary" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Button>
        </Link>
      </div>
    );
  }

  // Gallery array preparation
  const galleryImages = tour.gallery && tour.gallery.length > 0
    ? tour.gallery
    : [tour.imageUrl];

  // Schema.org TouristTrip & Product JSON-LD
  const tourJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['TouristTrip', 'Product'],
    name: tour.title,
    description: tour.description || tour.shortDescription,
    image: [tour.mainImage || tour.imageUrl, ...galleryImages],
    touristType: ['Luxury Traveler', 'Eco-Tourist', 'Family Adventure'],
    itinerary: tour.itinerary?.map((day) => ({
      '@type': 'City',
      name: day.title,
      description: day.description,
    })),
    offers: {
      '@type': 'Offer',
      price: tour.priceFromUSD || tour.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://vermilionroutes.com/tours/${tour.id}`,
      validFrom: '2026-01-01',
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Vermilion Routes',
      url: 'https://vermilionroutes.com',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tour.rating,
      reviewCount: tour.reviewsCount || 24,
    },
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
        <Link href="/" className="hover:text-emerald-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <a href="/#tours" className="hover:text-emerald-600 transition-colors">
          Featured Tours
        </a>
        <span>/</span>
        <span className="text-zinc-900 font-semibold truncate max-w-xs sm:max-w-md">
          {tour.title}
        </span>
      </nav>

      {/* Hero Title & Badges Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            {tour.destination}
          </span>

          {tour.category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-800">
              {tour.category}
            </span>
          )}

          {tour.isPopular && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-sm">
              <Sparkles className="w-3 h-3" />
              Best Seller
            </span>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
          {tour.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-zinc-600 pt-1">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>{tour.duration}</span>
          </div>

          <div className="flex items-center gap-1 font-semibold text-zinc-900">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{tour.rating}</span>
            {tour.reviewsCount && (
              <span className="text-zinc-500 font-normal">({tour.reviewsCount} verified guest reviews)</span>
            )}
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Main Content Col */}
        <div className="lg:col-span-8 space-y-12">
          {/* Photo Gallery */}
          <TourGallery images={galleryImages} title={tour.title} />

          {/* Tour Overview with Editorial Drop Cap */}
          {tour.description && (
            <div className="space-y-4 pt-4 border-t border-zinc-200/80">
              <h3 className="font-serif font-bold text-2xl text-zinc-900">
                Expedition Overview
              </h3>
              <p className="text-zinc-700 text-base leading-relaxed first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-emerald-800 first-letter:leading-none">
                {tour.description}
              </p>
            </div>
          )}

          {/* Expedition Technical Sheet ("At a Glance") */}
          <ExpeditionFacts 
            tourId={tour.id} 
            destination={tour.destination} 
            duration={tour.duration} 
          />

          {/* Illustrated Expedition Route Map */}
          <ExpeditionRouteMap 
            tourId={tour.id} 
            destination={tour.destination} 
          />

          {/* Highlights */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div className="bg-emerald-950/5 p-6 sm:p-8 rounded-3xl border border-emerald-200/60 space-y-4">
              <h3 className="font-serif font-bold text-xl text-emerald-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Key Itinerary Highlights</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-emerald-900">
                {tour.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      ✓
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Day by Day Itinerary Accordion */}
          {tour.itinerary && tour.itinerary.length > 0 && (
            <TourItinerary itinerary={tour.itinerary} />
          )}

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-200">
            {/* Inclusions */}
            {tour.inclusions && tour.inclusions.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-zinc-200/80 shadow-sm space-y-4">
                <h4 className="font-serif font-bold text-lg text-emerald-900 flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>What is Included?</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-700">
                  {tour.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exclusions */}
            {tour.exclusions && tour.exclusions.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-zinc-200/80 shadow-sm space-y-4">
                <h4 className="font-serif font-bold text-lg text-zinc-900 flex items-center gap-2">
                  <X className="w-5 h-5 text-rose-500" />
                  <span>What is NOT Included?</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-600">
                  {tour.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Sticky Sidebar Col */}
        <div className="lg:col-span-4">
          <BookingSidebar tour={tour} />
        </div>
      </div>

      {/* Verified Guest Reviews */}
      <div className="pt-10 border-t border-zinc-200/80">
        <TripAdvisorReviews
          title={`Verified Guest Reviews for ${tour.title}`}
          subtitle="Discover what recent travelers say about our personalized service, expert guides, and luxury stays."
        />
      </div>
    </div>
  );
}


