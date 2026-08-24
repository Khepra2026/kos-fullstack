import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const request_id = crypto.randomUUID()

  try {
    const { query, org_id } = await req.json()

    if (!query) {
      throw new Error("Le paramètre 'query' est obligatoire")
    }

    const ragRes = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/kos-knowledge-hub/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`
      },
      body: JSON.stringify({
        query: query,
        agent_name: 'Data_Protection',
        top_k: 3
      })
    })

    const ragData = await ragRes.json()

    if (!ragData.data || ragData.data.length === 0) {
      return new Response(JSON.stringify({
        agent: "Data_Protection",
        error: "Aucune source CEMAC trouvée. Refus de répondre pour éviter hallucination.",
        compliance: "BIG FOUR - Sources obligatoires",
        data_residency: "CEMAC",
        request_id,
        cobac_compliant: false,
        bigfour_standard: true
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    const mainDoc = ragData.data[0]
    const answer = `Selon ${mainDoc.title}: ${mainDoc.content.substring(0, 400)}...`

    return new Response(JSON.stringify({
      agent: "Data_Protection",
      answer: answer,
      sources: ragData.sources || [],
      data_residency: "CEMAC",
      cobac_compliant: true,
      bigfour_standard: true,
      request_id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })

  } catch (e: any) {
    return new Response(JSON.stringify({
      agent: "Data_Protection",
      error: e?.message || 'Erreur interne du serveur',
      request_id,
      cobac_compliant: false,
      bigfour_standard: true
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })
  }
})
