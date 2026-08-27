// src/middleware/security.ts - BIG FOUR COMPLIANT - CORS whitelist + Security Headers + 404 JSON
import { Request, Response, NextFunction } from 'express';

const TRUSTED_ORIGINS = [
  'https://kos.khepraexperts.com',
  'https://www.kos.khepraexperts.com',
  'http://localhost:3000',
  'http://localhost:5173',
];

export function corsWhitelist(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin as string;
  
  // Allow trusted origins only
  if (origin && TRUSTED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else if (!origin) {
    // No origin header (curl, health checks) - allow for health
    if (req.path === '/health' || req.path === '/ready') {
      res.setHeader('Access-Control-Allow-Origin', TRUSTED_ORIGINS[0]);
    }
  }
  // evil.com, null -> no ACAO header = correctly rejected per BigFour S10

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-Correlation-ID');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
}

export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  // BigFour S11
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://*.supabase.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self' https://*.supabase.co https://api.khepraexperts.com wss://*.supabase.co https://kos.khepraexperts.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com data:");
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  res.setHeader('X-Content-Security-Policy', 'default-src self'); // legacy
  // Remove disclosure headers
  res.removeHeader('X-Powered-By');
  res.removeHeader('Server');
  
  next();
}

// 404 JSON handler for /api/* - MUST be before SPA fallback per BigFour S8
export function api404Handler(req: Request, res: Response, next: NextFunction) {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      error: 'Not Found',
      message: `API route ${req.method} ${req.path} not found`,
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: req.path
    });
  }
  next();
}

// OpenAPI route - MUST be declared BEFORE fallback with application/json
export function openApiRoute(app: any) {
  app.get('/openapi.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    // Load from file or generate
    const openapi = require('../../openapi.json'); // or generate dynamically
    res.json(openapi);
  });
  
  // Also serve /docs only if enabled (can be disabled for security per S9)
  if (process.env.ENABLE_DOCS !== 'false') {
    app.get('/docs', (req: Request, res: Response) => {
      res.redirect('/api-docs');
    });
  }
}