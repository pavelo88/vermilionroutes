import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BLOG_POSTS, BlogPost } from '@/data/blogData';
import { mockTours } from '@/data/mock';
import { getLocalizedText } from '@/utils/i18nHelper';
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
  ShieldCheck
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

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Back Link */}
        <div>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Travel Guides</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold uppercase tracking-wider">
              {getLocalizedText(post.category, locale)}
            </span>
            <span className="flex items-center gap-1 text-zinc-400">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" /> {post.publishedAt}
            </span>
            <span className="text-zinc-600">&bull;</span>
            <span className="flex items-center gap-1 text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white leading-tight tracking-tight">
            {getLocalizedText(post.title, locale)}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
            {getLocalizedText(post.subtitle, locale)}
          </p>

          {/* Author info & Social */}
          <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-700">
                <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{post.author.name}</p>
                <p className="text-xs text-zinc-400">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="font-semibold text-zinc-300">Share:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(getLocalizedText(post.title, locale))} - https://vermilionroutes.com/${locale}/blog/${post.slug}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-emerald-900/60 border border-zinc-800 text-zinc-300 hover:text-white transition-all"
                title="Share on WhatsApp"
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(getLocalizedText(post.title, locale))}&url=https://vermilionroutes.com/${locale}/blog/${post.slug}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-emerald-900/60 border border-zinc-800 text-zinc-300 hover:text-white transition-all"
                title="Share on Twitter"
              >
                X / Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-72 sm:h-96 lg:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
          <Image
            src={post.imageUrl}
            alt={getLocalizedText(post.title, locale)}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-invert prose-emerald max-w-none text-zinc-300 text-sm sm:text-base leading-relaxed space-y-6">
          {contentText.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-2xl sm:text-3xl font-bold font-serif text-white pt-4 pb-2 border-b border-zinc-800">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl sm:text-2xl font-bold text-emerald-400 pt-3 pb-1">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('* ')) {
              const items = paragraph.split('\n* ').map((i) => i.replace('* ', ''));
              return (
                <ul key={idx} className="space-y-2 list-disc list-inside pl-2 text-zinc-300">
                  {items.map((it, iIdx) => (
                    <li key={iIdx} dangerouslySetInnerHTML={{ __html: it.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                  ))}
                </ul>
              );
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ')) {
              return (
                <div key={idx} className="space-y-2 pl-2 text-zinc-300" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\n/g, '<br />') }} />
              );
            }
            return (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-zinc-500 font-semibold">Related Topics:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Tour Recommendation Box */}
        {relatedTour && (
          <div className="bg-gradient-to-r from-emerald-950/90 to-zinc-900 border border-emerald-800/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-900/60 pb-5">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Recommended Expedition for this Guide
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                  {getLocalizedText(relatedTour.title, locale)}
                </h3>
                <p className="text-xs text-zinc-300 mt-1">
                  {getLocalizedText(relatedTour.duration, locale)} &bull; Private Naturalist Guide &bull; Luxury Accommodations
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs text-zinc-400 block">From</span>
                <span className="text-2xl font-extrabold text-emerald-400 font-serif">
                  ${relatedTour.price.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">USD</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <p className="text-xs text-zinc-300 leading-relaxed max-w-md">
                Experience this destination in complete comfort with customized private transport, VIP airport assistance, and 24/7 concierge.
              </p>

              <div className="flex gap-3 w-full sm:w-auto">
                <Link
                  href={`/${locale}/booking?tourId=${relatedTour.id}`}
                  className="flex-1 sm:flex-initial px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Book Expedition</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
