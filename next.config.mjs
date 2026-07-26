import { withContentlayer } from 'next-contentlayer2';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Scope remote images to the hosts actually used (GitHub stat embeds),
    // instead of allowing every https host.
    remotePatterns: [
      { protocol: 'https', hostname: 'github-readme-streak-stats.herokuapp.com' },
      { protocol: 'https', hostname: 'ghchart.rshah.org' },
    ],
  },
  async headers() {
    const securityHeaders = [
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
    ];
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default withContentlayer(nextConfig);
