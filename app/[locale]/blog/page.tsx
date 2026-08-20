'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { BLOG_POSTS } from '@/data/blogData';
import { getLocalizedText } from '@/utils/i18nHelper';
import {
  Compass,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Sparkles,
  BookOpen,
  Send,
  Tag
} from 'lucide-react';

export default function BlogIndexPage() {
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Galapagos Expeditions',
    'Andean Adventures',
    'Amazon Rainforest',
    'Cultural Heritage',
    'Travel Planning'
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const postCategory = typeof post.category === 'object' ? post.category.en : post.category;
    const postTitle = (typeof post.title === 'object' ? post.title[locale as keyof typeof post.title] || post.title.en : post.title).toLowerCase();
    const postExcerpt = (typeof post.excerpt === 'object' ? post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.en : post.excerpt).toLowerCase();

    const matchesCategory = selectedCategory === 'All' || postCategory === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      postTitle.includes(searchQuery.toLowerCase()) ||
      postExcerpt.includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Vermilion Travel Insights &amp; Guides</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
            Journeys, Nature &amp; Expert Guides
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Curated articles, wildlife migration calendars, expedition packing tips, and inspiring travel stories across Ecuador and the Galapagos.
          </p>
        </div>

        {/* Featured Hero Article */}
        {featuredPost && (
          <div className="relative rounded-3xl overflow-hidden border border-emerald-900/40 bg-zinc-900 shadow-2xl group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[450px] overflow-hidden">
                <Image
                  src={featuredPost.imageUrl}
                  alt={getLocalizedText(featuredPost.title, locale)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent lg:hidden" />
              </div>
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-4">
                <div className="flex items-center gap-3 text-xs">
                  <span className="px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-800 text-emerald-300 font-semibold uppercase tracking-wider">
                    {getLocalizedText(featuredPost.category, locale)}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-400">
                    <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white group-hover:text-emerald-400 transition-colors leading-tight">
                  <Link href={`/${locale}/blog/${featuredPost.slug}`}>
                    {getLocalizedText(featuredPost.title, locale)}
                  </Link>
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 line-clamp-3 leading-relaxed">
                  {getLocalizedText(featuredPost.subtitle || featuredPost.excerpt, locale)}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-emerald-800">
                      <Image src={featuredPost.author.avatar} alt={featuredPost.author.name} fill className="object-cover" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-white">{featuredPost.author.name}</p>
                      <p className="text-[10px] text-zinc-400">{featuredPost.publishedAt}</p>
                    </div>
                  </div>
                  <Link
                    href={`/${locale}/blog/${featuredPost.slug}`}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search & Category Filter Bar */}
        <div className="space-y-4 pt-4 border-t border-zinc-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-zinc-900/80 border border-zinc-800/80 hover:border-emerald-700/60 rounded-3xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={getLocalizedText(post.title, locale)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider font-semibold text-emerald-400">
                  {getLocalizedText(post.category, locale)}
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-400" /> {post.publishedAt}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-400" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      {getLocalizedText(post.title, locale)}
                    </Link>
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {getLocalizedText(post.excerpt, locale)}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden border border-zinc-700">
                      <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                    </div>
                    <span className="text-zinc-300 font-medium text-[11px]">{post.author.name}</span>
                  </div>

                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="text-emerald-400 group-hover:text-emerald-300 font-semibold flex items-center gap-1 hover:underline"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter & Club CTA Box */}
        <div className="bg-gradient-to-r from-emerald-950 via-zinc-900 to-zinc-950 border border-emerald-800/60 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              Exclusive Galapagos &amp; Ecuador Travel Club
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Get Seasonal Expedition Perks &amp; 10% OFF
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Join over 2,500 travelers receiving curated luxury cruise offers, wildlife migration alerts, and private itinerary inspirations.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
