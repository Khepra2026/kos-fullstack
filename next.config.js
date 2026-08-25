/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GIT_SHA: process.env.GIT_SHA || 'unknown',
    BUILD_TIME: process.env.BUILD_TIME || new Date().toISOString(),
  },
  output: 'standalone',
}
module.exports = nextConfig
