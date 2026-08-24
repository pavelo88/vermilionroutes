import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BLOG_POSTS, BlogPost } from '@/data/blogData';
import { mockTours } from '@/data/mock';
import { getLocalizedText } from '@/utils/i18nHelper';
import { LeadMagnetBanner } from '@/components/home/LeadMagnetBanner';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  Sparkles,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Compass,
  MessageCircle
} from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return { title: 'Article Not Found | Vermilion Routes' };
  }

  const title = getLocalizedText(post.title, locale);
  const description = getLocalizedText(post.excerpt, locale);

  return {
    title: `${title} | Vermilion Routes Travel Insights`,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: post.imageUrl }],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedTour = post.relatedTourId
    ? mockTours.find((t) => t.id === post.relatedTourId)
    : mockTours[0];

  const contentText = locale === 'es' ? post.content.es : post.content.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: getLocalizedText(post.title, locale),
    description: getLocalizedText(post.excerpt, locale),
    image: `https://vermilionroutes.com${post.imageUrl}`,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vermilion Routes',
      logo: {
        '@type': 'ImageObject',
        url: 'https://vermilionroutes.com/logo.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: `https://vermilionroutes.com/${locale}/blog/${post.slug}`,
  };

  const backLabel = locale === 'es' ? 'Volver a todas las Guías' : 'Back to All Travel Guides';
  const shareLabel = locale === 'es' ? 'Compartir:' : 'Share:';
  const relatedLabel = locale === 'es' ? 'Expedición Recomendada para esta Guía' : 'Recommended Expedition for this Guide';
  const fromLabel = locale === 'es' ? 'Desde' : 'From';
  const bookLabel = locale === 'es' ? 'Reservar Expedición' : 'Book Expedition';

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#07130C] text-zinc-900 dark:text-zinc-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Back Link */}
        <div>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider shadow-sm">
              {getLocalizedText(post.category, locale)}
            </span>
            <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {post.publishedAt}
            </span>
            <span className="text-zinc-400 dark:text-zinc-600">&bull;</span>
            <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-zinc-900 dark:text-white leading-tight tracking-tight">
            {getLocalizedText(post.title, locale)}
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
            {getLocalizedText(post.subtitle, locale)}
          </p>

          {/* Author info & Social */}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-600 dark:border-emerald-700">
                <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">{post.author.name}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">{shareLabel}</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(getLocalizedText(post.title, locale))} - https://vermilionroutes.com/${locale}/blog/${post.slug}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-emerald-50 dark:hover:bg-emerald-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all font-medium shadow-sm flex items-center gap-1.5"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(getLocalizedText(post.title, locale))}&url=https://vermilionroutes.com/${locale}/blog/${post.slug}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-emerald-50 dark:hover:bg-emerald-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all font-medium shadow-sm"
                title="Share on Twitter"
              >
                X / Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-72 sm:h-96 lg:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
          <Image
            src={post.imageUrl}
            alt={getLocalizedText(post.title, locale)}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="space-y-6 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          {contentText.split('\n\n').map((paragraph, idx) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-2xl sm:text-3xl font-bold font-serif text-zinc-900 dark:text-white pt-6 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl sm:text-2xl font-bold text-emerald-800 dark:text-emerald-400 pt-4 pb-1">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }
            if (trimmed.startsWith('#### ')) {
              return (
                <h4 key={idx} className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white pt-3 pb-1 border-l-4 border-emerald-600 pl-3">
                  {trimmed.replace('#### ', '')}
                </h4>
              );
            }
            if (trimmed.startsWith('* ')) {
              const items = trimmed.split('\n* ').map((i) => i.replace(/^\*\s*/, ''));
              return (
                <ul key={idx} className="space-y-2 list-disc list-inside pl-2 text-zinc-700 dark:text-zinc-300">
                  {items.map((it, iIdx) => (
                    <li key={iIdx} dangerouslySetInnerHTML={{ __html: it.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-zinc-900 dark:text-white">$1</strong>') }} />
                  ))}
                </ul>
              );
            }
            if (/^\d+\.\s/.test(trimmed)) {
              return (
                <div key={idx} className="space-y-2 pl-2 text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-zinc-900 dark:text-white">$1</strong>').replace(/\n/g, '<br />') }} />
              );
            }
            if (trimmed.startsWith('---')) {
              return <hr key={idx} className="border-zinc-200 dark:border-zinc-800 my-6" />;
            }
            return (
              <p key={idx} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-zinc-900 dark:text-white">$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
            );
          })}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-zinc-500 font-semibold">{locale === 'es' ? 'Temas Relacionados:' : 'Related Topics:'}</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 font-medium shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Tour Recommendation Box */}
        {relatedTour && (
          <div className="bg-gradient-to-r from-emerald-900 via-zinc-900 to-zinc-950 border border-emerald-700/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/60 pb-5">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {relatedLabel}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                  {getLocalizedText(relatedTour.title, locale)}
                </h3>
                <p className="text-xs text-zinc-300 mt-1">
                  {getLocalizedText(relatedTour.duration, locale)} &bull; {locale === 'es' ? 'Guía Naturalista Privado · Hotelería Exclusiva' : 'Private Naturalist Guide · Luxury Accommodations'}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs text-zinc-400 block">{fromLabel}</span>
                <span className="text-2xl font-extrabold text-emerald-400 font-serif" suppressHydrationWarning>
                  ${relatedTour.price.toLocaleString('en-US')} <span className="text-xs text-zinc-400 font-normal">USD</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <p className="text-xs text-zinc-300 leading-relaxed max-w-md">
                {locale === 'es'
                  ? 'Vive esta experiencia en total confort con transporte privado personalizado, asistencia VIP en aeropuertos y conserjería 24/7.'
                  : 'Experience this destination in complete comfort with customized private transport, VIP airport assistance, and 24/7 concierge.'}
              </p>

              <div className="flex gap-3 w-full sm:w-auto">
                <Link
                  href={`/${locale}/booking?tourId=${relatedTour.id}`}
                  className="flex-1 sm:flex-initial px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>{bookLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Lead Magnet: Free Packing Guide Download */}
        <LeadMagnetBanner />

      </div>
    </div>
  );
}
