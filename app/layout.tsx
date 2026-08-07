import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ReactNode } from 'react';
import GTranslateWrapper from '@/components/ui/GTranslateWrapper';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { ConditionalFooter } from '@/components/layout/ConditionalFooter';
import { ConciergeWidget } from '@/components/ui/ConciergeWidget';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vermilion Routes | Tailor-Made Luxury Travel in Galapagos, Ecuador & Peru',
  description:
    'Experience South America with bespoke travel itineraries, luxury Galapagos island cruises, Amazon rainforest expeditions, and Andean volcano treks.',
  keywords: [
    'Galapagos luxury cruises',
    'Ecuador travel agency',
    'Machu Picchu private tours',
    'South America luxury expeditions',
    'Tailor-made itineraries Galapagos',
    'Bespoke travel Ecuador Peru',
    'Vermilion Routes',
  ],
  authors: [{ name: 'Vermilion Routes' }],
  creator: 'Vermilion Routes',
  publisher: 'Vermilion Routes',
  metadataBase: new URL('https://vermilionroutes.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': 'https://vermilionroutes.com/en',
      'es-EC': 'https://vermilionroutes.com/es',
    },
  },
  openGraph: {
    title: 'Vermilion Routes | Luxury Journeys in Galapagos, Ecuador & Peru',
    description:
      'Discover bespoke travel, luxury cruises, certified naturalist guides, and 24/7 concierge support across Ecuador, the Galapagos, and Peru.',
    url: 'https://vermilionroutes.com',
    siteName: 'Vermilion Routes',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Vermilion Routes Luxury Galapagos Expedition',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vermilion Routes | Tailor-Made Luxury Travel',
    description:
      'Exclusive Galapagos cruises, private Andean treks, and Machu Picchu expeditions tailored to perfection.',
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Vermilion Routes',
    description:
      'Premier luxury boutique tour operator specializing in bespoke travel itineraries, Galapagos island cruises, Amazon lodges, and Andean expeditions in Ecuador and Peru.',
    url: 'https://vermilionroutes.com',
    logo: 'https://vermilionroutes.com/logo.png',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    telephone: '+593994048458',
    email: 'info@vermilionroutes.com',
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Quito',
      addressCountry: 'EC',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-0.180653',
      longitude: '-78.467838',
    },
    areaServed: ['Galapagos Islands', 'Ecuador', 'Peru', 'Cusco', 'Machu Picchu'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '124',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.tripadvisor.com',
      'https://www.instagram.com',
      'https://www.facebook.com',
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="paper-bg text-zinc-900 dark:text-zinc-50 font-sans antialiased selection:bg-emerald-600 selection:text-white flex flex-col min-h-screen" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <GTranslateWrapper />
          <Navbar />
          <main className="flex-1 w-full relative">{children}</main>
          <ConciergeWidget />
          <ConditionalFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
