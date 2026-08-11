/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async rewrites(){
    return [
      {source:'/health',destination:'https://kos-khepra-api.fly.dev/health'},
      {source:'/ready',destination:'https://kos-khepra-api.fly.dev/ready'},
      {source:'/v1',destination:'https://kos-khepra-api.fly.dev/v1'},
      {source:'/v1/:path*',destination:'https://kos-khepra-api.fly.dev/v1/:path*'},
      {source:'/docs',destination:'https://kos-khepra-api.fly.dev/docs'},
      {source:'/docs/:path*',destination:'https://kos-khepra-api.fly.dev/docs/:path*'},
      {source:'/openapi.json',destination:'https://kos-khepra-api.fly.dev/openapi.json'}
    ]
  }
}
module.exports = nextConfig
