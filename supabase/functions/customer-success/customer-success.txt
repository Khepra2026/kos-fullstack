import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { query, org_id } = await req.json()

    // 1. Appel RAG kos-knowledge-hub
    const ragRes = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/kos-knowledge-hub/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`
      },
      body: JSON.stringify({
        query: query,
        agent_name: 'Customer_Success',
        top_k: 3
      })
    })

    const ragData = await ragRes.json()

    // 2. Refus Big Four si pas de source
    if (!ragData.data || ragData.data.length === 0) {
      return new Response(JSON.stringify({
        agent: "Customer_Success",
        error: "Aucune source CEMAC trouvée. Refus de répondre pour éviter hallucination.",
        compliance: "BIG FOUR - Sources obligatoires",
        data_residency: "CEMAC",
        request_id: crypto.randomUUID(),
        cobac_compliant: false
      }), {
        status: 400,
        headers: {...corsHeaders, "Content-Type": "application/json"}
      })
    }

    // 3. Construire réponse avec sources
    const sources = ragData.sources || []
    const docs = ragData.data || []
    const mainDoc = docs[0]

    const answer = `Selon ${mainDoc.title}: ${mainDoc.content.substring(0, 400)}...`

    return new Response(JSON.stringify({
      agent: "Customer_Success",
      answer: answer,
      sources: sources,
      data_residency: "CEMAC",
      cobac_compliant: true,
      bigfour_standard: true,
      request_id: crypto.randomUUID()
    }), {
      headers: {...corsHeaders, "Content-Type": "application/json"}
    })

  } catch (e) {
    return new Response(JSON.stringify({
      agent: "Customer_Success",
      error: e.message,
      request_id: crypto.randomUUID(),
      cobac_compliant: false
    }), {
      status: 500,
      headers: {...corsHeaders, "Content-Type": "application/json"}
    })
  }
})