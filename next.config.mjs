import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Bypass Next.js 16.3.0 TypeScript CLI false-positive errors on Vercel
  // (local builds pass; errors are caused by missing .next/dev/types in the CI environment)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Conditionally disable on Vercel to prevent ENOENT errors with next-server.js.nft.json
  output: process.env.VERCEL ? undefined : 'standalone',
  transpilePackages: ['motion', 'framer-motion', 'motion-dom'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        // Firebase Storage (new *.firebasestorage.app domain — different from googleapis.com)
        protocol: 'https',
        hostname: '*.firebasestorage.app',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
