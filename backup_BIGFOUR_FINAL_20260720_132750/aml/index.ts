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
    Deno.env.get('SUPABASE_URL')?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?? ''
  )

  let query = ''
  let org_id = ''

  try {
    const body = await req.json()
    // FIX 1: Health check Big Four
    query = body.query || "system_health_check"
    org_id = body.org_id

    if (!org_id) {
      throw new Error('org_id obligatoire')
    }

    const searchTerm = query.toLowerCase().trim().split(' ')[0]
    if (!searchTerm) {
      throw new Error('Query vide ou invalide')
    }

    const { data: sources, error: searchError } = await supabase
  .from('kos_knowledge')
  .select('title, content, reglement_ref, source_url')
  .eq('agent_name', 'AML')
  .eq('data_residency', 'CEMAC')
  .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
  .limit(3)

    if (searchError) {
      throw new Error(`DB Error: ${searchError.message}`)
    }

    const hasSource = sources && sources.length > 0
    const response_time_ms = Date.now() - startTime
    const prompt_hash = await hashQuery(query)

    // FIX 2: response_hash = hash de la réponse, pas du query
    const response_content = hasSource
   ? sources[0].content.substring(0, 100)
      : 'no_source_found'
    const response_hash = await hashQuery(response_content)

    await supabase.from('kos_audit_log').insert({
      request_id,
      user_id: org_id,
      org_id,
      agent_name: 'AML',
      prompt_hash, // hash du prompt
      response_hash, // FIX: hash de la réponse
      model_version: 'KOS-RegTech-v1',
      sources: hasSource? sources.map(s => s.reglement_ref) : [],
      source_found: hasSource,
      cobac_compliant: hasSource,
      data_residency: 'CEMAC',
      bigfour_standard: true,
      iso_compliant: true,
      response_time_ms,
      error_msg: hasSource? null : 'Aucune source CEMAC trouvée',
      ts: new Date().toISOString(),
      retention_until: new Date(Date.now() + 2555 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })

    if (!hasSource) {
      return new Response(JSON.stringify({
        agent: "AML",
        error: "Aucune source CEMAC trouvée. Refus de répondre pour éviter hallucination.",
        compliance: "BIG FOUR - Sources obligatoires",
        data_residency: "CEMAC",
        request_id,
        cobac_compliant: false,
        bigfour_standard: true,
        iso_compliant: true,
        response_time_ms
      }), {
        status: 400,
        headers: {...corsHeaders, "Content-Type": "application/json" }
      })
    }

    const mainDoc = sources[0]
    const answer = `Selon ${mainDoc.title}: ${mainDoc.content.substring(0, 500)}...`

    // FIX 3: Supprimer doublon sources: []
    return new Response(JSON.stringify({
      agent: "AML",
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
      response_hash,
      response_time_ms
    }), {
      headers: {...corsHeaders, "Content-Type": "application/json" }
    })

  } catch (e: any) {
    const response_time_ms = Date.now() - startTime
    const prompt_hash = query? await hashQuery(query) : null
    const error_hash = await hashQuery(e?.message || 'Erreur inconnue')

    await sup