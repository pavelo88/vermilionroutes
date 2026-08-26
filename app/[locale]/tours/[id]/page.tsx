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
import { DownloadPDFButton } from '@/components/tours/DownloadPDFButton';
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
  HelpCircle,
  MessageCircle
} from 'lucide-react';

interface TourDetailPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

import { mockTours } from '@/data/mock';
import { getLocalizedText } from '@/utils/i18nHelper';

// Allow dynamic params so new tours can be loaded, and revalidate every 60 seconds
// to fetch fresh prices from Firestore.
export const dynamicParams = true;
export const revalidate = 60;

const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'zh'];

export async function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const tour of mockTours) {
      params.push({ locale, id: tour.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: TourDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tour = await getTourByIdFromFirestore(resolvedParams.id);

  if (!tour) {
    return {
      title: 'Tour Package Not Found | Vermilion Routes',
    };
  }

  const title = getLocalizedText(tour.title, resolvedParams.locale);
  const description = getLocalizedText(tour.description || tour.shortDescription, resolvedParams.locale);
  const days = getLocalizedText(tour.durationDays || tour.duration, resolvedParams.locale);
  const dest = getLocalizedText(tour.destination, resolvedParams.locale);

  return {
    title: `${title} (${days}) | Vermilion Routes`,
    description: typeof description === 'string' ? description.slice(0, 160) : '',
    openGraph: {
      title: `${title} - ${dest}`,
      description: typeof description === 'string' ? description.slice(0, 160) : '',
      images: [
        {
          url: tour.mainImage || tour.imageUrl,
          width: 1200,
          height: 630,
          alt: title,
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
  const { locale, id } = resolvedParams;
  const tour = await getTourByIdFromFirestore(id);

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

  const title = getLocalizedText(tour.title, locale);
  const dest = getLocalizedText(tour.destination, locale);
  const duration = getLocalizedText(tour.duration, locale);
  const category = getLocalizedText(tour.category, locale);

  // Gallery array preparation
  const galleryImages = tour.gallery && tour.gallery.length > 0
    ? tour.gallery
    : [tour.imageUrl];

  // Schema.org TouristTrip & Product JSON-LD
  const tourJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['TouristTrip', 'Product'],
    name: title,
    description: getLocalizedText(tour.description || tour.shortDescription, locale),
    image: [tour.mainImage || tour.imageUrl, ...galleryImages],
    touristType: ['Luxury Traveler', 'Eco-Tourist', 'Family Adventure'],
    itinerary: tour.itinerary?.map((day) => ({
      '@type': 'City',
      name: getLocalizedText(day.title, locale),
      description: getLocalizedText(day.description, locale),
    })),
    offers: {
      '@type': 'Offer',
      price: Number((tour.priceFromUSD || tour.price || 1000).toString().replace(/[^0-9.]/g, '')),
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
    <div className="pt-36 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourJsonLd) }}
      />

      {/* Hero Title & Actions Header (Clean, Direct & Elegant) */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{duration}</span>
              </div>

              <div className="flex items-center gap-1 font-semibold text-zinc-900 dark:text-zinc-100">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{tour.rating}</span>
                {tour.reviewsCount && (
                  <span className="text-zinc-500 dark:text-zinc-400 font-normal">
                    ({tour.reviewsCount} {locale === 'es' ? 'opiniones verificadas' : 'verified guest reviews'})
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action CTAs: Contact Us + Download Itinerary */}
          <div className="flex items-center gap-2.5 shrink-0 pt-1 md:pt-0">
            <a
              href={`https://wa.me/593994048458?text=${encodeURIComponent(
                locale === 'es'
                  ? `Hola Vermilion Routes, deseo información personalizada y reservar el tour: ${title}`
                  : `Hello Vermilion Routes, I would like custom information and book the tour: ${title}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{locale === 'es' ? 'Contáctanos' : 'Contact Us'}</span>
            </a>
            <DownloadPDFButton tour={tour} variant="outline" size="md" />
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Main Content Col */}
        <div className="lg:col-span-8 space-y-12">
          {/* Photo Gallery */}
          <TourGallery images={galleryImages} title={title} />

          {/* Tour Overview with Category Badges */}
          {tour.description && (
            <div className="space-y-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
              {/* Badges moved elegantly to overview */}
              <div className="flex flex-wrap items-center gap-2 pb-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{dest}</span>
                </span>

                {category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                    {category}
                  </span>
                )}

                {tour.isPopular && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>Best Seller</span>
                  </span>
                )}

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{locale === 'es' ? 'Guía Privado Certificado' : 'Certified Private Guide'}</span>
                </span>
              </div>

              <h2 className="font-serif font-bold text-2xl text-zinc-900 dark:text-white">
                {locale === 'es' ? 'Descripción de la Expedición' : 'Expedition Overview'}
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-emerald-800 dark:first-letter:text-emerald-400 first-letter:leading-none">
                {getLocalizedText(tour.description, locale)}
              </p>
            </div>
          )}

          {/* Expedition Technical Sheet ("At a Glance") */}
          <ExpeditionFacts 
            tourId={tour.id} 
            destination={tour.destination} 
            duration={tour.duration} 
          />

          {/* Highlights */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div className="bg-emerald-950/5 dark:bg-emerald-950/20 p-6 sm:p-8 rounded-3xl border border-emerald-200/60 dark:border-emerald-800/40 space-y-4">
              <h2 className="font-serif font-bold text-xl text-emerald-950 dark:text-emerald-300 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Key Itinerary Highlights</span>
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-emerald-900 dark:text-emerald-200">
                {tour.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      ✓
                    </div>
                    <span className="font-medium">{getLocalizedText(item, locale)}</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            {/* Inclusions */}
            {tour.inclusions && tour.inclusions.length > 0 && (
              <div className="bg-white dark:bg-zinc-900/90 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
                <h4 className="font-serif font-bold text-lg text-emerald-900 dark:text-emerald-400 flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>What is Included?</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  {tour.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{getLocalizedText(inc, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exclusions */}
            {tour.exclusions && tour.exclusions.length > 0 && (
              <div className="bg-white dark:bg-zinc-900/90 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
                <h4 className="font-serif font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
                  <X className="w-5 h-5 text-rose-500" />
                  <span>What is NOT Included?</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  {tour.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{getLocalizedText(exc, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Sticky Sidebar Col */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start space-y-6">
          <BookingSidebar tour={tour} />
        </div>
      </div>

      {/* Verified Guest Reviews */}
      <div className="pt-10 border-t border-zinc-200/80 dark:border-zinc-800">
        <TripAdvisorReviews
          title={`Verified Guest Reviews for ${title}`}
          subtitle="Discover what recent travelers say about our personalized service, expert guides, and luxury stays."
        />
      </div>
    </div>
  );
}


