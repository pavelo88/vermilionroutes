import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/data/blogData';
import { getLocalizedText } from '@/utils/i18nHelper';
import { BlogIndexClient } from '@/components/blog/BlogIndexClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return {
    title: isEs
      ? 'Vermilion Routes | Guías de Viaje y Expediciones de Lujo'
      : 'Vermilion Routes | Luxury Travel Guides & Ecuador Insights',
    description: isEs
      ? 'Guías de viaje expertas y consejos exclusivos para explorar Galápagos, los Andes y la Amazonía ecuatoriana con la asesoría de lujo de Vermilion Routes 24/7.'
      : 'Expert luxury travel guides, wildlife insights and expedition tips for Galapagos, the Amazon and Ecuador. Plan your bespoke adventure with local experts 24/7.',
    alternates: {
      canonical: `https://www.vermilionroutes.com/${locale}/blog`,
    },
    openGraph: {
      title: isEs
        ? 'Vermilion Routes | Guías de Viaje y Expediciones de Lujo'
        : 'Vermilion Routes | Luxury Travel Guides & Ecuador Insights',
      description: isEs
        ? 'Guías de viaje expertas y consejos exclusivos para explorar Galápagos, los Andes y la Amazonía ecuatoriana con la asesoría de lujo de Vermilion Routes 24/7.'
        : 'Expert luxury travel guides, wildlife insights and expedition tips for Galapagos, the Amazon and Ecuador. Plan your bespoke adventure with local experts 24/7.',
      url: `https://www.vermilionroutes.com/${locale}/blog`,
      images: ['https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg'],
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === 'es';

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isEs ? 'Guías de Viaje y Expediciones Vermilion' : 'Vermilion Luxury Travel Guides & Insights',
    description: isEs
      ? 'Artículos editoriales, guías de expedición y consejos de expertos para viajar por Ecuador y Galápagos.'
      : 'Curated luxury travel guides, itineraries, and wildlife insights for Galapagos and Ecuador.',
    url: `https://www.vermilionroutes.com/${locale}/blog`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: BLOG_POSTS.map((post, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'BlogPosting',
          headline: getLocalizedText(post.title, locale),
          description: getLocalizedText(post.excerpt, locale),
          url: `https://www.vermilionroutes.com/${locale}/blog/${post.slug}`,
          image: `https://www.vermilionroutes.com${post.imageUrl}`,
          datePublished: post.publishedAt,
          author: {
            '@type': 'Person',
            name: post.author.name,
          },
        },
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isEs ? 'Inicio' : 'Home',
          item: `https://www.vermilionroutes.com/${locale}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: isEs ? 'Blog' : 'Travel Guides',
          item: `https://www.vermilionroutes.com/${locale}/blog`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-emerald-700 font-semibold animate-pulse">Cargando guías de viaje...</div>}>
        <BlogIndexClient />
      </Suspense>
    </>
  );
}
