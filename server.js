const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();

// --- MIDDLEWARES ---
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '2mb' }));

// --- PATHS ---
const publicDir = path.join(__dirname, 'public');
console.log(`[BOOT] publicDir ${publicDir} exists? ${fs.existsSync(publicDir)} files:`, fs.existsSync(publicDir) ? fs.readdirSync(publicDir).slice(0, 20) : 'MISSING');

// --- SUPABASE (optional, activé si secrets présents) ---
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

// --- HEALTH ---
app.get('/health', (req, res) => res.json({
  status: 'ONLINE',
  system: 'KOS RegTech Enterprise Hub',
  version: '3.0.0-bigfour',
  region: process.env.FLY_REGION || 'cdg',
  uptime: process.uptime(),
  supabase: supabase ? 'connected' : 'mock',
  timestamp: new Date().toISOString()
}));

// --- SOURCES ---
const MOCK_SOURCES = [
  { authority: 'BCEAO', official_url: 'https://www.bceao.int', count: 128, description: 'Banque Centrale des Etats de l\'Afrique de l\'Ouest' },
  { authority: 'COBAC', official_url: 'https://www.beac.int', count: 96, description: 'Commission Bancaire Afrique Centrale - R-2018-04 LBC/FT' },
  { authority: 'OHADA', official_url: 'https://www.ohada.org', count: 212, description: 'Acte Uniforme Sociétés & Sûretés' },
  { authority: 'GAFI', official_url: 'https://www.fatf-gafi.org', count: 84, description: 'Recommandations 40 GAFI' },
  { authority: 'ISSB', official_url: 'https://www.ifrs.org', count: 57, description: 'IFRS S1/S2 Durabilité' }
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

// --- RAG SEARCH 1024-dim ---
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
    // MOCK RAG pour tests sans vecteurs
    const mockResults = [
      { authority: 'COBAC', title: 'Règlement COBAC R-2018-04 LBC/FT Art. 12', content: 'Les assujettis doivent mettre en place un dispositif de vigilance constante...', similarity: 0.94, official_url: 'https://www.beac.int' },
      { authority: 'OHADA', title: 'Acte Uniforme OHADA Art. 831 - Blanchiment', content: 'Constitue un acte de blanchiment...', similarity: 0.91, official_url: 'https://www.ohada.org' },
      { authority: 'BCEAO', title: 'Instruction BCEAO 01/2023 LBC/FT', content: 'Dispositions relatives à la lutte contre le blanchiment...', similarity: 0.89, official_url: 'https://www.bceao.int' }
    ].slice(0, count);
    res.json({ results: query ? mockResults : [], query, mode: 'mock' });
  } catch (e) {
    console.error('[RAG] error', e.message);
    res.status(500).json({ results: [], error: e.message, query });
  }
});

// --- STATIC ---
app.use(express.static(publicDir, { maxAge: '1h', etag: true }));

// --- SPA FALLBACK ---
app.get('*', (req, res) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/health')) {
    return res.status(404).json({ error: 'API not found: ' + req.path });
  }
  const indexPath = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) return res.sendFile(indexPath);
  res.status(404).send(`Not Found - public/index.html missing: ${fs.existsSync(publicDir) ? fs.readdirSync(publicDir).join(', ') : 'public dir not found'}`);
});

// --- START ---
const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, '0.0.0.0', () => console.log(`[READY] KOS v3.0.0-bigfour running on 0.0.0.0:${PORT} • publicDir=${publicDir}`));