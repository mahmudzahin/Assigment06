
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Export Next.js as a static website
  output: 'export',

  // GitHub Pages
  basePath: '/Assigment06',

  assetPrefix: '/Assigment06/',

  // GitHub Pages does not support Next.js image optimization
  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.magnific.com',
      },
    ],
  },

  // Generate /workout/1/ instead of /workout/1
  trailingSlash: true,
};

export default nextConfig;

