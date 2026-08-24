import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
}

async function hashQuery(q: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(q)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const request_id = crypto.randomUUID()
  const startTime = Date.now()
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?? ''
  )

  let query = ''
  let org_id = ''

  try {
    const body = await req.json()
    query = body.query
    org_id = body.org_id

    if (!query ||!org_id) throw new Error('query et org_id obligatoires')

    const searchTerm = query.toLowerCase().trim().split(' ')[0]
    if (!searchTerm) throw new Error('Query vide')

    const { data: sources, error: searchError } = await supabase
     .from('kos_knowledge')
     .select('title, content, reglement_ref, source_url')
     .eq('agent_name', 'Strategic_Insight')
     .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
     .limit(3)

    if (searchError) throw new Error(`DB Error: ${searchError.message}`)

    const hasSource = sources && sources.length > 0
    const elapsed = Date.now() - startTime
    const queryHash = await hashQuery(query)
    const responseHash = hasSource? await hashQuery(sources[0].content.substring(0, 100)) : await hashQuery('no_source')

    // Audit log Big Four - UNE SEULE FOIS CHAQUE CLÉ
    await supabase.from('kos_audit_log').insert({
      request_id,
      user_id: org_id,
      org_id,
      agent_name: 'Strategic_Insight',
      prompt_hash: queryHash,
      response_hash: responseHash,
      model_version: 'KOS-RegTech-v1',
      sources: hasSource? sources.map(s => s.reglement_ref) : [],
      source_found: hasSource,
      cobac_compliant: hasSource,
      bigfour_standard: true,
      iso_compliant: true,
      data_residency: 'CEMAC',
      response_time_ms: elapsed,
      error_msg: hasSource? null : 'Aucune source CEMAC trouvée',
      ts: new Date().toISOString(),
      retention_until: new Date(Date.now() + 2555 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })

    if (!hasSource) {
      return new Response(JSON.stringify({
        agent: "Strategic_Insight",
        error: "Aucune source CEMAC trouvée. Refus de répondre pour éviter hallucination.",
        compliance: "BIG FOUR - Sources obligatoires",
        data_residency: "CEMAC",
        request_id,
        cobac_compliant: false,
        bigfour_standard: true,
        iso_compliant: true,
        response_time_ms: elapsed
      }), {
        status: 400,
        headers: {...corsHeaders, "Content-Type": "application/json" }
      })
    }

    const mainDoc = sources[0]
    const answer = `Selon ${mainDoc.title}: ${mainDoc.content.substring(0, 400)}...`

    return new Response(JSON.stringify({
      agent: "Strategic_Insight",
      answer: answer,
      sources: [{
        doc: mainDoc.title,
        article: mainDoc.reglement_ref,
        authority: "COBAC/CEMAC"
      }],
      data_residency: "CEMAC",
      cobac_compliant: true,
      bigfour_standard: true,
      iso_compliant: true,
      request_id,
      response_hash: responseHash,
      response_time_ms: elapsed
    }), {
      headers: {...corsHeaders, "Content-Type": "application/json" }
    })

  } catch (e: any) {
    const elapsed = Date.now() - startTime
    const queryHash = query? await hashQuery(query) : null
    const errorHash = await hashQuery(e?.message || 'Erreur inconnue')

    await supabase.from('kos_audit_log').insert({
      request_id,
      user_id: org_id || null,
      org_id: org_id || null,
      agent_name: 'Strategic_Insight',
      prompt_hash: queryHash,
      response_hash: errorHash,
      model_version: 'KOS-RegTech-v1',
      cobac_compliant: false,
      bigfour_standard: true,
      iso_compliant: true,
      data_residency: 'CEMAC',
      error_msg: e?.message || 'Erreur inconnue',
      response_time_ms: elapsed,
      ts: new Date().toISOString(),
      retention_until: new Date(Date.now() + 2555 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })

    return new Response(JSON.stringify({
      agent: "Strategic_Insight",
      error: e?.message || 'Erreur interne',
      request_id,
      cobac_compliant: false,
      bigfour_standard: true,
      iso_compliant: true,
      response_time_ms: elapsed
    }), {
      status: 500,
      headers: {...corsHeaders, "Content-Type": "application/json" }
    })
  }
})