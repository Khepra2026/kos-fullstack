/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  async rewrites(){
    return [
      {source:'/v1/:path*',destination:'https://kos-khepra-api.fly.dev/v1/:path*'},
      {source:'/health',destination:'https://kos-khepra-api.fly.dev/health'}
    ]
  }
}
module.exports = nextConfig
