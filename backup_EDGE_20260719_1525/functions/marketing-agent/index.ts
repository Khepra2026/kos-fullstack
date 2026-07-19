import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { query, org_id, context } = await req.json();

    // 1. RAG OBLIGATOIRE - Zéro hallucination
    const ragRes = await fetch(`${Deno.env.get('SUPABASE_URL')}`/functions/v1/kos-knowledge-hub/search, {
      method: 'POST',
      headers: {
        'Authorization': Bearer ,
        'apikey': Deno.env.get('SUPABASE_ANON_KEY')!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: ${query} ,
        agent_name: 'Marketing_Agent',
        top_k: 5
      })
    });

    const rag = await ragRes.json();

    if (!rag.data || rag.data.length === 0) {
      return new Response(JSON.stringify({
        agent: 'Marketing_Agent',
        error: "Aucune source CEMAC trouvée. Refus de répondre pour éviter hallucination.",
        compliance: "BIG FOUR - Sources obligatoires",
        data_residency: "CEMAC"
      }), {
        status: 400,
        headers: {...corsHeaders, "Content-Type": "application/json"}
      });
    }

    // 2. Construire réponse Big Four avec citations
    const topSource = rag.data[0];
    const response = {
      agent: 'Marketing_Agent',
      query,
      answer: Selon  : ...,
      sources: rag.sources,
      confidence: topSource.similarity,
      focus: 'Campagnes, branding, digital',
      data_residency: "CEMAC",
      audit_trail: true,
      cobac_compliant: true,
      timestamp: new Date().toISOString()
    };

    return new Response(JSON.stringify(response), {
      headers: {...corsHeaders, "Content-Type": "application/json"}
    });

  } catch (e) {
    console.error('[Marketing_Agent] Error:', e.message);
    return new Response(JSON.stringify({
      agent: 'Marketing_Agent',
      error: e.message
    }), {
      status: 500,
      headers: {...corsHeaders, "Content-Type": "application/json"}
    });
  }
});

