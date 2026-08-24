import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    // 1. CONTRAT UNIFIE BIG FOUR
    const body = await req.json().catch(() => ({}))
    const prompt = body.prompt?? body.query?? ''
    const organization = body.organization?? body.org_id?? 'khepra-production'

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'BIGFOUR_CONTRACT: prompt or query required' }),
        { status: 400, headers: {...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // 2. SUPABASE CLIENT - Auto injecté, pas de secret custom
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // 3. AUDIT LOG ISO27001 A.12.4.1 + COBAC 7 ans
    await supabase.from('kos_audit_log').insert({
      agent: 'cybersec',
      org_id: organization,
      action: 'EXECUTE',
      payload_hash: Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(prompt)))).map(b => b.toString(16).padStart(2, '0')).join(''),
      ts: new Date().toISOString()
    }).then(({ error }) => { if (error) console.error('AUDIT_LOG_FAIL', error) })

    // 4. LOGIQUE METIER PLACEHOLDER - A REMPLACER PAR VRAI CODE
    const result = {
      agent: 'cybersec',
      status: 'SUCCESS',
      organization,
      analysis: `Big Four response for: ${prompt}`,
      timestamp: new Date().toISOString(),
      bigfour_certified: true
    }

    return new Response(JSON.stringify(result), {
      headers: {...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (e) {
    console.error('BIGFOUR_CRASH cybersec:', e.message, e.stack)
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      agent: 'cybersec',
      detail: e.message
    }), {
      status: 500,
      headers: {...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
