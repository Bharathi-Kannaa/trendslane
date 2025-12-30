import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  transpilePackages: ['@workspace/ui'],

  turbopack: {
    root: path.join(__dirname, '../..'),
  },

  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: 'shop.mango.com',
      },
      {
        hostname: 'images.pexels.com',
      },
      {
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
