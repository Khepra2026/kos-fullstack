/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/health', destination: '/api/health' },
      { source: '/openapi.json', destination: '/api/openapi' },
      { source: '/docs', destination: '/api/openapi' },
      { source: '/rag/query', destination: '/api/rag/query' },
      { source: '/rag/health', destination: '/api/rag/health' },
      { source: '/rag/search', destination: '/api/rag/query' },
      { source: '/bceao/ask', destination: '/api/bceao/ask' },
      { source: '/compliance/check', destination: '/api/compliance/check' },
      { source: '/auth/me', destination: '/api/auth/me' },
      { source: '/v1/tenants', destination: '/api/v1/tenants' },
      { source: '/v1/audit', destination: '/api/v1/audit' },
      { source: '/status', destination: '/api/health' },
      { source: '/metrics', destination: '/api/health' },
    ];
  },
};
module.exports = nextConfig;
