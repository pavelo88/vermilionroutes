import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { CurrencyProvider } from '@/context/CurrencyContext';
import '../globals.css';
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('title') || 'Vermilion Routes | Tailor-Made Luxury Travel in Galapagos & Ecuador',
    description: t('description') || 'Experience South America with bespoke travel itineraries, Galapagos luxury cruises, and Andean volcanic treks.',
    keywords: [
      'Galapagos luxury cruises',
      'Ecuador travel agency',
      'South America luxury expeditions',
      'Tailor-made itineraries Galapagos',
      'Bespoke travel Ecuador Galapagos',
      'Vermilion Routes',
    ],
    authors: [{ name: 'Vermilion Routes' }],
    creator: 'Vermilion Routes',
    publisher: 'Vermilion Routes',
    metadataBase: new URL('https://vermilionroutes.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': 'https://vermilionroutes.com/en',
        'es': 'https://vermilionroutes.com/es',
        'fr': 'https://vermilionroutes.com/fr',
        'de': 'https://vermilionroutes.com/de',
        'zh': 'https://vermilionroutes.com/zh',
        'it': 'https://vermilionroutes.com/it',
        'pt': 'https://vermilionroutes.com/pt',
        'ja': 'https://vermilionroutes.com/ja',
      },
    },
    openGraph: {
      title: t('title') || 'Vermilion Routes | Tailor-Made Luxury Travel in Galapagos & Ecuador',
      description: t('description') || 'Experience South America with bespoke travel itineraries.',
      url: `https://vermilionroutes.com/${locale}`,
      siteName: 'Vermilion Routes',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
          width: 1200,
          height: 630,
          alt: 'Vermilion Routes Luxury Galapagos Expedition',
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title') || 'Vermilion Routes | Tailor-Made Luxury Travel in Galapagos & Ecuador',
      description: t('description') || 'Experience Ecuador with bespoke travel itineraries.',
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
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Vermilion Routes - Agencia de Viajes Vermilion',
    alternateName: 'Vermilion Routes Luxury & Bespoke Travel',
    legalName: 'Agencia de Viajes Vermilion Cia. Ltda.',
    taxID: '1711992808001',
    description:
      'Premier luxury boutique tour operator specializing in bespoke travel itineraries, Galapagos island cruises, Amazon lodges, and Andean expeditions in Ecuador.',
    url: 'https://vermilionroutes.com',
    logo: 'https://vermilionroutes.com/logo.png',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    telephone: '+593994048458',
    email: 'info@vermilionroutes.com',
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Alangasí Oe 1 – 210 Simón Bolívar and Juan León Mera',
      addressLocality: 'Quito',
      addressRegion: 'Pichincha',
      postalCode: '170150',
      addressCountry: 'EC',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-0.3015',
      longitude: '-78.4172',
    },
    areaServed: ['Galapagos Islands', 'Ecuador', 'Mainland Ecuador', 'Amazon Rainforest', 'Andes Mountains'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '148',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html',
      'https://www.instagram.com/vermilionroutes',
      'https://www.tiktok.com/@vermilionsaroutes',
      'https://www.facebook.com/vermilionroutes',
    ],
  };

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} scroll-smooth`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="paper-bg text-zinc-900 dark:text-zinc-50 font-sans antialiased selection:bg-emerald-600 selection:text-white flex flex-col min-h-screen" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <CurrencyProvider>
            <NextIntlClientProvider messages={messages} locale={locale}>
              <Navbar />
              <main className="flex-1 w-full relative">{children}</main>
              <ConciergeWidget />
              <ConditionalFooter />
            </NextIntlClientProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
