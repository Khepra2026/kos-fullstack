/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa').default || require('next-pwa');

const pwa = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.*/i,
      handler: 'NetworkFirst',
      options: { cacheName: 'api-cache', networkTimeoutSeconds: 10, expiration: { maxEntries: 100, maxAgeSeconds: 86400 } }
    },
    {
      urlPattern: /\.(?:js|css|woff2|png|jpg|jpeg|svg|gif|webp|woff)$/i,
      handler: 'CacheFirst',
      options: { cacheName: 'static-assets', expiration: { maxEntries: 300, maxAgeSeconds: 2592000 } }
    }
  ],
  fallbacks: {
    document: '/offline'
  },
  buildExcludes: [/middleware-manifest\.json$/]
});

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  env: {
    GIT_SHA: process.env.GIT_SHA || 'unknown',
    BUILD_TIME: new Date().toISOString(),
    KOS_VERSION: '2.0.0-bigfour-netflix',
    KOS_MODE: 'PWA'
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }]
  }
};

module.exports = pwa(nextConfig);
