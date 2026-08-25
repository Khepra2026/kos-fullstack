// FIX next.config.js - Remove ignoreDuringBuilds / ignoreBuildErrors
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
  poweredByHeader: false,
  reactStrictMode: true,
}
module.exports = nextConfig
