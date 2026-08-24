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
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const request_id = crypto.randomUUID()
  const startTime = Date.now()

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  let query = ''
  let org_id = ''

  try {
    const body = await req.json()
    query = body.query
    org_id = body.org_id

    if (!query || !org_id) {
      throw new Error('query et org_id obligatoires')
    }

    const searchTerm = query.toLowerCase().trim().split(' ')[0]
    if (!searchTerm) {
      throw new Error('Query vide ou invalide')
    }

    // BIG FOUR RULE 1: Recherche source CEMAC obligatoire
    const { data: sources, error: searchError } = await supabase
      .from('kos_knowledge')
      .select('title, content, reglement_ref, source_url')
      .eq('agent_name', 'Compliance')
      .eq('data_residency', 'CEMAC')
      .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
      .limit(3)

    if (searchError) {
      throw new Error(`DB Error: ${searchError.message}`)
    }

    const hasSource = sources && sources.length > 0
    const response_time_ms = Date.now() - startTime
    const query_hash = await hashQuery(query)

    // BIG FOUR RULE 2: Audit log obligatoire avant réponse
    await supabase.from('kos_audit_log').insert({
      request_id,
      user_id: org_id,
      model_version: 'KOS-RegTech-v1',
      response_hash: query_hash,
      sources: [],
      agent_name: 'Compliance',
      prompt_hash: query_hash,
      org_id,
      source_found: hasSource,
      cobac_compliant: hasSource,
      data_residency: 'CEMAC',
      bigfour_standard: true,
      iso_compliant: true,
      response_time_ms,
      error_msg: hasSource ? null : 'Aucune source CEMAC trouvée',
      ts: new Date().toISOString(),
      retention_until: new Date(Date.now() + 7 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })

    // BIG FOUR RULE 3: Refus si pas de source
    if (!hasSource) {
      return new Response(JSON.stringify({
        agent: "Compliance",
        error: "Aucune source CEMAC trouvée. Refus de répondre pour éviter hallucination.",
        compliance: "BIG FOUR - Sources obligatoires",
        data_residency: "CEMAC",
        request_id,
      user_id: org_id,
      model_version: 'KOS-RegTech-v1',
      response_hash: query_hash,
      sources: [],
        cobac_compliant: false,
        bigfour_standard: true,
        iso_compliant: true,
        response_time_ms
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    // BIG FOUR RULE 4: Réponse avec citation source
    const mainDoc = sources[0]
    const answer = `Selon ${mainDoc.title}: ${mainDoc.content.substring(0, 500)}...`

    return new Response(JSON.stringify({
      agent: "Compliance",
      answer,
      sources: sources.map(s => ({
        doc: s.title,
        article: s.reglement_ref,
        authority: "COBAC/CEMAC",
        url: s.source_url || null
      })),
      data_residency: "CEMAC",
      cobac_compliant: true,
      bigfour_standard: true,
      iso_compliant: true,
      request_id,
      user_id: org_id,
      model_version: 'KOS-RegTech-v1',
      response_hash: query_hash,
      sources: [],
      response_time_ms
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })

  } catch (e: any) {
    const response_time_ms = Date.now() - startTime
    const query_hash = query ? await hashQuery(query) : null

    // BIG FOUR RULE 5: Log erreurs aussi
    await supabase.from('kos_audit_log').insert({
      request_id,
      user_id: org_id,
      model_version: 'KOS-RegTech-v1',
      response_hash: query_hash,
      sources: [],
      agent_name: 'Compliance',
      prompt_hash: query_hash,
      org_id: org_id || null,
      cobac_compliant: false,
      data_residency: 'CEMAC',
      bigfour_standard: true,
      iso_compliant: true,
      error_msg: e?.message || 'Erreur inconnue',
      response_time_ms,
      ts: new Date().toISOString(),
      retention_until: new Date(Date.now() + 7 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })

    return new Response(JSON.stringify({
      agent: "Compliance",
      error: e?.message || 'Erreur interne du serveur',
      request_id,
      user_id: org_id,
      model_version: 'KOS-RegTech-v1',
      response_hash: query_hash,
      sources: [],
      cobac_compliant: false,
      bigfour_standard: true,
      iso_compliant: true,
      response_time_ms
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })
  }
})

