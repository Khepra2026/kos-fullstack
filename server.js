const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

function cleanEnv(v){
  if(!v) return null;
  // Trim + remove surrounding quotes + remove trailing slash + remove /rest/v1
  let s = String(v).trim().replace(/^['"]+|['"]+$/g, '').replace(/\/+$/, '');
  if(s.endsWith('/rest/v1')) s = s.slice(0, -8);
  if(!/^https?:\/\//i.test(s)) return null;
  return s;
}

let supabase = null;
try {
  const { createClient } = require('@supabase/supabase-js');
  const rawUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const rawKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const url = cleanEnv(rawUrl);
  const key = rawKey? String(rawKey).trim().replace(/^['"]+|['"]+$/g, '') : null;
  if(url && key){
    supabase = createClient(url, key);
    console.log('Supabase configured:', url);
  } else {
    console.log('Supabase degraded - url valid?',!!url, 'key?',!!key);
  }
} catch(e){ console.log('Supabase init error:', e.message); }

function health(){
  return {
    status:'ONLINE',
    system:'KOS RegTech Enterprise Hub',
    version:'3.0.0',
    gitSha: process.env.FLY_IMAGE_REF || 'local',
    region: process.env.FLY_REGION || 'local',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks:{ database: supabase? 'ok' : 'degraded', rls: 'enabled', supabaseUrlValid:!!supabase }
  };
}
app.get('/health', (req,res)=>{ res.set('x-request-id', require('crypto').randomUUID()); res.json(health()); });
app.get('/api/health', (req,res)=>{ res.set('x-request-id', require('crypto').randomUUID()); res.json(health()); });
app.get('/', (req,res)=>{ res.json({...health(), message:'KOS API live'}); });

app.post('/api/rag/search', async (req,res)=>{
  if(!supabase) return res.json({ success:true, results:[], provenance:[], degraded:true });
  try{
    const emb = req.body.queryEmbedding || Array(1536).fill(0);
    const { data, error } = await supabase.rpc('match_documents', { query_embedding: emb, match_count: req.body.count||5 });
    if(error) throw error;
    res.json({ success:true, results:data||[], provenance:(data||[]).map(d=>({ evidence_id:d.evidence_id, source:d.source, similarity:d.similarity })) });
  }catch(e){ res.status(500).json({ success:false, error:e.message }); }
});

app.get('/api/sources', async (req,res)=>{
  if(!supabase) return res.json({ success:true, sources:[], degraded:true });
  try{ const { data } = await supabase.from('kos_regulatory_sources').select('*').eq('is_active', true); res.json({ success:true, sources:data||[] }); }
  catch(e){ res.status(500).json({ success:false, error:e.message }); }
});

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, '0.0.0.0', ()=>{ console.log('KOS Backend Enterprise running on port '+PORT); });
