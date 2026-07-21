import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?? ''
  )

  const { data, error } = await supabase
    .from('kos_mrr_dashboard')
    .select('*')
    .limit(1)
    .maybeSingle()

  if (error) return new Response(JSON.stringify({ error: error.message }), {
    headers: {...corsHeaders, 'Content-Type': 'application/json' },
    status: 500,
  })

  if (!data) return new Response(JSON.stringify({ 
    error: "No healthcheck data yet",
    hint: "Wait for job 94 to run or insert test data",
    timestamp: new Date().toISOString(),
    system_status: "INITIALIZING",
    compliance: "BCEAO_COBAC_BIG_FOUR"
  }), {
    headers: {...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })

  return new Response(JSON.stringify(data, null, 2), {
    headers: {...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
})