import { MetadataRoute } from 'next';
import { mockTours } from '@/data/mock';
import { BLOG_POSTS } from '@/data/blogData';

const BASE_URL = 'https://vermilionroutes.com';
const LOCALES = ['en', 'es', 'fr', 'de', 'zh', 'it', 'pt', 'ja'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/blog', '/privacy-policy', '/terms', '/booking'];
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Static Pages for all locales
  for (const page of staticPages) {
    for (const locale of LOCALES) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : page === '/blog' ? 0.9 : 0.7,
      });
    }
  }

  // 2. All Tour itineraries
  for (const tour of mockTours) {
    for (const locale of LOCALES) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}#${tour.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  }

  // 3. All Blog Articles
  for (const post of BLOG_POSTS) {
    for (const locale of LOCALES) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return sitemapEntries;
}
