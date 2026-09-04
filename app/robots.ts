import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'GPTBot',
          'ChatGPT-User',
          'anthropic-ai',
          'ClaudeBot',
          'PerplexityBot',
          'Google-Extended',
          'Applebot',
        ],
        allow: '/',
      },
      {
        userAgent: ['HTTrack', 'Wget', 'Scrapy'],
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/cpanel/', '/auth/', '/api/'],
      },
    ],
    sitemap: 'https://www.vermilionroutes.com/sitemap.xml',
  };
}
