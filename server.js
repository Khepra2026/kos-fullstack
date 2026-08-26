const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

let supabase = null;
try {
  const { createClient } = require('@supabase/supabase-js');
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key) {
    supabase = createClient(url, key);
    console.log('Supabase configured');
  } else {
    console.log('Supabase env missing - running in degraded mode');
  }
} catch(e) { console.log('Supabase init skipped:', e.message); }

function health(){ return { status:'ONLINE', system:'KOS RegTech Enterprise Hub', version:'3.0.0', timestamp:new Date().toISOString(), uptime: process.uptime(), checks:{ database: supabase?'ok':'degraded' } }; }
app.get('/health', (req,res)=>{ res.json(health()); });
app.get('/api/health', (req,res)=>{ res.json(health()); });
app.get('/', (req,res)=>{ res.json(health()); });
app.post('/api/rag/search', async (req,res)=>{
  if(!supabase) return res.json({ success:true, results:[], provenance:[], degraded:true });
  try {
    const { data } = await supabase.rpc('match_documents', { query_embedding: req.body.queryEmbedding || Array(1536).fill(0), match_count: 5 });
    res.json({ success:true, results:data||[] });
  } catch(e){ res.status(500).json({ success:false, error:e.message }); }
});
const PORT = process.env.PORT || 4000;
app.listen(PORT,'0.0.0.0',()=>{ console.log('KOS running on '+PORT); });
