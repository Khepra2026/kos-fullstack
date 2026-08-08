/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/health', destination: '/api/health' },
      { source: '/rag/query', destination: '/api/rag/query' },
      { source: '/rag/health', destination: '/api/rag/health' },
      { source: '/rag-query', destination: '/api/rag-query' },
    ];
  },
};
module.exports = nextConfig;
