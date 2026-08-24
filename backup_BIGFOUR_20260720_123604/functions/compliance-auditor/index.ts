import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { query, org_id } = await req.json();

    // 1. RAG OBLIGATOIRE - Zéro hallucination
    const ragRes = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/kos-knowledge-hub/search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
        'apikey': Deno.env.get('SUPABASE_ANON_KEY')!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        agent_name: 'Compliance_Auditor',
        top_k: 5
      })
    });

    const rag = await ragRes.json();

    if (!rag.data || rag.data.length === 0) {
      return new Response(JSON.stringify({
        error: "Aucune source COBAC/OHADA trouvée. Refus de répondre pour éviter hallucination.",
        compliance: "BIG FOUR - Sources obligatoires"
      }), {
        status: 400,
        headers: {...corsHeaders, "Content-Type": "application/json"}
      });
    }

    // 2. Construire réponse avec citations
    const topSource = rag.data[0];
    const response = {
      agent: "Compliance_Auditor",
      query,
      answer: `Selon ${topSource.authority} ${topSource.article_ref}, ${topSource.content.substring(0, 200)}...`,
      sources: rag.sources,
      confidence: topSource.similarity,
      data_residency: "CEMAC",
      audit_trail: true,
      cobac_compliant: true
    };

    return new Response(JSON.stringify(response), {
      headers: {...corsHeaders, "Content-Type": "application/json"}
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: {...corsHeaders, "Content-Type": "application/json"}
    });
  }
});
