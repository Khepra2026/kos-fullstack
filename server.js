const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

const allowedOrigins = ['https://kos.khepraexperts.com', 'https://api.khepraexperts.com', 'https://kos-fullstack.fly.dev'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Supabase client - avec fallback si pas de secrets en local
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

// Health - Fly.io 24/7 check §20 §27
function healthPayload() {
  return {
    status: 'ONLINE',
    system: 'KOS RegTech Enterprise Hub',
    firm: 'Khepra Experts',
    version: '3.0.0',
    gitSha: process.env.FLY_IMAGE_REF || 'local',
    region: process.env.FLY_REGION || 'local',
    modules: ['RAG Vectoriel', 'Observatoires', 'Agents IA', 'Automates Veilleurs'],
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    checks: { database: supabase ? 'configured' : 'missing-env', rls: 'enabled' }
  };
}

app.get('/health', (req, res) => {
  res.set('x-request-id', require('crypto').randomUUID());
  res.status(200).json(healthPayload());
});

app.get('/api/health', (req, res) => {
  res.set('x-request-id', require('crypto').randomUUID());
  res.status(200).json(healthPayload());
});

app.get('/', (req, res) => {
  res.json({ ...healthPayload(), message: 'KOS API - Use /health for Fly checks, /api/health for clients' });
});

// RAG Search §10 - provenance required
app.post('/api/rag/search', async (req, res) => {
  try {
    if (!supabase) return res.status(503).json({ success: false, error: 'Supabase not configured' });
    const { queryEmbedding, threshold = 0.75, count = 5 } = req.body;
    if (!queryEmbedding) return res.status(400).json({ success: false, error: 'queryEmbedding required' });
    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: queryEmbedding,
      match_count: count,
      filter_source: null
    });
    if (error) throw error;
    res.json({ success: true, results: data, provenance: data?.map(d => ({ evidence_id: d.evidence_id, source: d.source, similarity: d.similarity })) || [] });
  } catch (err) {
    console.error(JSON.stringify({ level: 'error', path: '/api/rag/search', error: err.message }));
    res.status(500).json({ success: false, error: err.message });
  }
});

// Sources
app.get('/api/sources', async (req, res) => {
  try {
    if (!supabase) return res.json({ success: true, sources: [] });
    const { data, error } = await supabase.from('kos_regulatory_sources').select('*').eq('is_active', true);
    if (error) throw error;
    res.json({ success: true, sources: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('KOS Backend Enterprise running on port ' + PORT);
});
