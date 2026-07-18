import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };

async function getEmbedding(text: string) {
  const JINA_KEY = Deno.env.get('JINA_API_KEY');
  if (!JINA_KEY) {
    console.error('JINA_API_KEY missing in env');
    throw new Error('JINA_API_KEY missing');
  }

  console.log('Jina call start. Text len:', text.length);

  const res = await fetch('https://api.jina.ai/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${JINA_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ input: [text], model: 'jina-embeddings-v3' })
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Jina HTTP error:', res.status, err);
    throw new Error(`Jina API error: ${res.status} - ${err}`);
  }

  const data = await res.json();
  console.log('Jina success. Embedding dim:', data.data[0].embedding.length);
  return data.data[0].embedding;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  // SERVICE_ROLE_KEY bypass RLS
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const url = new URL(req.url);
  const action = url.pathname.split('/').pop();
  console.log('=== REQUEST ===', req.method, action);

  try {
    if (action === 'update') {
      const body = await req.json();
      console.log('Update:', body.title, body.authority);

      const embedding = await getEmbedding(body.content);

      const { data, error } = await supabase.from('knowledge_base').insert({
        title: body.title,
        content: body.content,
        article_ref: body.article_ref,
        authority: body.authority,
        agent_name: body.agent_name,
        embedding,
        data_residency: 'CEMAC'
      }).select();

      if (error) {
        console.error('DB Error:', error);
        throw new Error(`DB: ${error.message}`);
      }

      console.log('Insert OK id:', data[0].id);
      return new Response(JSON.stringify({ action: 'update', status: 'ok', id: data[0].id }), {
        headers: {...corsHeaders, "Content-Type": "application/json"}
      });
    }

    if (action === 'search') {
      const { query, agent_name, top_k = 5 } = await req.json();
      console.log('Search:', query, 'agent:', agent_name);

      const embedding = await getEmbedding(query);

      const { data, error } = await supabase.rpc('match_documents', {
        query_embedding: embedding,
        match_count: top_k,
        filter: agent_name? { agent_name } : {}
      });

      if (error) {
        console.error('RPC Error:', error);
        throw new Error(`RPC: ${error.message}`);
      }

      console.log('Found:', data.length, 'docs');
      return new Response(JSON.stringify({
        action: 'search',
        status: 'ok',
        data,
        sources: data.map((d: any) => ({
          doc: d.title,
          article: d.article_ref,
          authority: d.authority
        }))
      }), { headers: {...corsHeaders, "Content-Type": "application/json"} });
    }

    return new Response('kos-knowledge-hub ready', { headers: corsHeaders });

  } catch (e) {
    console.error('=== ERROR ===', e.message);
    return new Response(JSON.stringify({
      error: e.message,
      details: e.stack
    }), {
      status: 500,
      headers: {...corsHeaders, "Content-Type": "application/json"}
    });
  }
});
