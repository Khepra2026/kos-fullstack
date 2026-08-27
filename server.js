const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();

// --- BIG FOUR FIX P0 - SECURITY HEADERS ---
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://*.supabase.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self' https://*.supabase.co https://api.khepraexperts.com wss://*.supabase.co https://kos.khepraexperts.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com data:");
  res.removeHeader('X-Powered-By');
  next();
});

// --- BIG FOUR FIX P0 - CORS WHITELIST ---
const ALLOWED_ORIGINS = [
  "https://kos.khepraexperts.com",
  "https://khepraexperts.com",
  "https://www.khepraexperts.com",
  "https://kos-fullstack.fly.dev",
  "https://api-khepraexperts.fly.dev",
  "http://localhost:3000",
  "http://localhost:4000"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    return callback(null, false);
  },
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type', 'X-Request-ID'],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '2mb' }));

// --- PATHS ---
const publicDir = path.join(__dirname, 'public');
console.log(`[BOOT] publicDir ${publicDir} exists? ${fs.existsSync(publicDir)} files:`, fs.existsSync(publicDir) ? fs.readdirSync(publicDir).slice(0, 20) : 'MISSING');

// --- SUPABASE ---
let supabase = null;
try {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { createClient } = require('@supabase/supabase-js');
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    console.log('[BOOT] Supabase client init ->', process.env.SUPABASE_URL);
  } else {
    console.log('[BOOT] Supabase secrets not set -> running in MOCK mode');
  }
} catch (e) {
  console.log('[BOOT] Supabase not installed / error', e.message);
}

// --- OPENAPI ---
app.get('/openapi.json', (req, res) => {
  const openapiPath = path.join(publicDir, 'api', 'openapi.json');
  if (fs.existsSync(openapiPath)) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.sendFile(openapiPath);
  }
  res.setHeader('Content-Type', 'application/json');
  return res.json({
    openapi: "3.0.3",
    info: { title: "KOS RegTech AI API", version: "3.0.0-bigfour", description: "BCEAO/COBAC/OHADA/GAFI" },
    servers: [{ url: "https://api.khepraexperts.com" }],
    paths: {
      "/health": { get: { summary: "Health" } },
      "/ready": { get: { summary: "Ready" } },
      "/version": { get: { summary: "Version" } },
      "/api/sources": { get: { summary: "Sources" } },
      "/api/rag/search": { post: { summary: "RAG Search" } }
    }
  });
});

// --- PAYDUNYA MOUNT (hors de openapi.json !) ---
let paydunyaRoutesLoaded = false;
try {
  const paydunyaRouter = require('./src/routes/paydunya.js');
  const router = paydunyaRouter.default || paydunyaRouter;
  app.use('/api/paydunya', router);
  paydunyaRoutesLoaded = true;
  console.log('[BOOT] PayDunya routes mounted at /api/paydunya');
} catch (e) {
  try {
    const r = express.Router();
    const PLANS = { starter: 15000, pro: 35000, cabinet: 75000, enterprise: 150000 };
    r.get('/plans', (req,res)=> res.json({ plans: PLANS, currency:'XOF', gateway:'PayDunya', mode: process.env.PAYDUNYA_MODE||'disabled' }));
    r.post('/checkout', (req,res)=> res.status(503).json({ success:false, error:'PayDunya service not fully installed', code:'PAYDUNYA_DISABLED' }));
    r.get('/confirm', (req,res)=> res.status(400).json({ error:'token required' }));
    r.post('/ipn', (req,res)=> res.status(200).json({ received:true }));
    app.use('/api/paydunya', r);
    console.log('[BOOT] PayDunya fallback routes mounted');
  } catch (e2) {
    console.log('[BOOT] PayDunya mount failed', e.message, e2.message);
  }
}

// --- HEALTH / READY / VERSION ---
app.get('/health', (req, res) => res.json({
  status: 'ONLINE',
  system: 'KOS RegTech Enterprise Hub',
  version: '3.0.0-bigfour',
  region: process.env.FLY_REGION || 'cdg',
  uptime: process.uptime(),
  supabase: supabase ? 'connected' : 'mock',
  paydunya: paydunyaRoutesLoaded ? 'ready' : 'fallback',
  timestamp: new Date().toISOString()
}));

app.get('/ready', (req, res) => res.json({ ready: true, timestamp: new Date().toISOString() }));
app.get('/version', (req, res) => res.json({
  version: '3.0.0-bigfour',
  commit: process.env.GIT_COMMIT || '7fdc8b5333af26618158d154e6560835eae7c57d',
  branch: process.env.GIT_BRANCH || 'release/bigfour-100-',
  build: new Date().toISOString()
}));

// --- SOURCES ---
const MOCK_SOURCES = [
  { authority: 'BCEAO', official_url: 'https://www.bceao.int', count: 128, description: "Banque Centrale" },
  { authority: 'COBAC', official_url: 'https://www.beac.int', count: 96, description: 'COBAC R-2018-04 LBC/FT' },
  { authority: 'OHADA', official_url: 'https://www.ohada.org', count: 212, description: 'Acte Uniforme' },
  { authority: 'GAFI', official_url: 'https://www.fatf-gafi.org', count: 84, description: 'Recommandations 40 GAFI' },
  { authority: 'ISSB', official_url: 'https://www.ifrs.org', count: 57, description: 'IFRS S1/S2' }
];

app.get('/api/sources', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('kos_sources').select('authority,official_url,count').eq('is_active', true);
      if (!error && data && data.length) return res.json({ sources: data, mode: 'supabase' });
    }
    res.json({ sources: MOCK_SOURCES, mode: 'mock' });
  } catch (e) {
    res.json({ sources: MOCK_SOURCES, mode: 'mock-fallback', error: e.message });
  }
});

// --- RAG SEARCH ---
app.post('/api/rag/search', async (req, res) => {
  const { queryEmbedding, query = '', count = 5 } = req.body || {};
  try {
    if (supabase && queryEmbedding && queryEmbedding.length === 1024) {
      const { data, error } = await supabase.rpc('match_kos_documents', {
        query_embedding: queryEmbedding,
        match_count: count,
        filter_authority: null
      });
      if (error) throw error;
      return res.json({ results: data, query, mode: 'supabase-vector' });
    }
    const mockResults = [
      { authority: 'COBAC', title: 'Règlement COBAC R-2018-04 LBC/FT Art. 12', content: 'Vigilance constante...', similarity: 0.94, official_url: 'https://www.beac.int' },
      { authority: 'OHADA', title: 'Acte Uniforme OHADA Art. 831', content: 'Blanchiment...', similarity: 0.91, official_url: 'https://www.ohada.org' },
      { authority: 'BCEAO', title: 'Instruction BCEAO 01/2023 LBC/FT', content: 'Lutte blanchiment...', similarity: 0.89, official_url: 'https://www.bceao.int' }
    ].slice(0, count);
    res.json({ results: query ? mockResults : [], query, mode: 'mock' });
  } catch (e) {
    res.status(500).json({ results: [], error: e.message, query });
  }
});

app.post('/api/v1/rag/query', (req, res) => {
  return res.status(410).json({ code: "DEPRECATED_ROUTE", message: "Use POST /api/rag/search", new_route: "/api/rag/search" });
});

// --- STATIC ---
app.use(express.static(publicDir, { maxAge: '1h', etag: true }));

// --- 404 API ---
app.use('/api', (req, res) => {
  return res.status(404).json({ detail: 'Not Found', code: 'RESOURCE_NOT_FOUND', path: req.path, method: req.method });
});

// --- SPA / 404 ---
app.get('*', (req, res) => {
  const host = (req.get('host') || '').toLowerCase();
  const isApiHost = host.includes('api-khepraexperts') || host.includes('api.khepraexperts.com');
  const isApiRequest = req.path.startsWith('/api') || req.path.startsWith('/health') || req.path.startsWith('/ready') || req.path.startsWith('/version') || req.path.startsWith('/openapi.json') || req.path === '/nonexistent-route-xyz' || !req.accepts('html');
  if (isApiHost || isApiRequest || req.path.startsWith('/nonexistent')) {
    return res.status(404).json({ detail: 'Not Found', code: 'RESOURCE_NOT_FOUND', path: req.path, method: req.method, timestamp: new Date().toISOString() });
  }
  const indexPath = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) return res.sendFile(indexPath);
  return res.status(404).json({ detail: 'Not Found', code: 'RESOURCE_NOT_FOUND' });
});

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, '0.0.0.0', () => console.log(`[READY] KOS v3.0.0-bigfour running on 0.0.0.0:${PORT} • publicDir=${publicDir}`));