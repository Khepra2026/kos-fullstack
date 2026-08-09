 /** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/v1/:path*', destination: 'https://kos-khepra-api.fly.dev/v1/:path*' },
      { source: '/health', destination: 'https://kos-khepra-api.fly.dev/health' },
    ]
  }
}
module.exports = nextConfig
