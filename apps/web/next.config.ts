import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
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
      {
        hostname: 'wallpapers.com',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');
export default withNextIntl(nextConfig);
