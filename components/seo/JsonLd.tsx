'use client';

import React from 'react';
import { Tour } from '@/types';
import { getLocalizedText } from '@/utils/i18nHelper';

interface TourJsonLdProps {
  tour: Tour;
  locale: string;
}

export function TourJsonLd({ tour, locale }: TourJsonLdProps) {
  const title = getLocalizedText(tour.title, locale);
  const description = getLocalizedText(tour.description || tour.shortDescription, locale) || title;
  const duration = getLocalizedText(tour.duration, locale);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': ['TouristTrip', 'Product'],
    name: title,
    description: description,
    image: `https://www.vermilionroutes.com${tour.imageUrl}`,
    touristType: ['Luxury Traveler', 'Eco-Tourist', 'Wildlife Enthusiast'],
    offers: {
      '@type': 'Offer',
      price: tour.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://www.vermilionroutes.com/${locale}/tours/${tour.id}`,
      validFrom: '2026-01-01',
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Vermilion Routes - Agencia de Viajes Vermilion',
      url: 'https://www.vermilionroutes.com',
      telephone: '+593994048458',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: (tour.rating || 5).toString(),
      reviewCount: (tour.reviewsCount || 32).toString(),
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

interface FAQJsonLdProps {
  faqs: { question: string; answer: string }[];
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
