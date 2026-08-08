/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/hub', destination: '/funding-hub' },
      { source: '/hub-central', destination: '/hub' },
      { source: '/hubs', destination: '/hub' },
      { source: '/api-docs', destination: '/api-docs' }
    ]
  }
}

module.exports = nextConfig
