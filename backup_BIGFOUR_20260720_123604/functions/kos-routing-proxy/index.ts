import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const TIMEOUT_MS = 1500
const HEALTH_CHECK_TIMEOUT_MS = 500
const MAX_ERRORS = 3

async function logRouting(
  supabase: any,
  functionName: string,
  providerUsed: string,
  latencyMs: number,
  status: string,
  isFailover: boolean,
  failoverTimeMs: number | null,
  errorMessage?: string,
) {
  await supabase.from('kos_routing_log').insert({
    function_name: functionName,
    provider_used: providerUsed,
    latency_ms: Math.round(latencyMs),
    status,
    is_failover: isFailover,
    failover_time_ms: failoverTimeMs ? Math.round(failoverTimeMs) : null,
    error_message: errorMessage ?? null,
  })
}

async function callFallback(route: any, payload: any, start: number, supabase: any) {
  const fallbackStart = performance.now()
  const { data, error } = await supabase.functions.invoke(route.edge_function_name, { body: payload })

  const latency = performance.now() - start
  await logRouting(
    supabase,
    route.function_name,
    'edge_function',
    latency,
    error ? 'error' : 'success',
    true,
    latency - (fallbackStart - start),
    error?.message,
  )

  return new Response(
    JSON.stringify(error ? { error: error.message } : { data }),
    {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'X-Routing-Latency': Math.round(latency).toString(),
        'X-Routing-Provider': 'edge_function',
        'X-Routing-Primary': route.primary_provider,
        'X-Routing-Failover': 'true',
      },
    },
  )
}

serve(async (req: Request) => {
  const start = performance.now()

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  let functionName = ''
  let payload: any = {}

  try {
    const body = await req.json()
    functionName = body.function_name
    payload = body.payload ?? {}
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON body. Expected { function_name, payload }' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }

  if (!functionName) {
    return new Response(
      JSON.stringify({ error: 'Missing required field: function_name' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  // 1. Lire routing + circuit breaker via v_kos_active_routing
  const { data: route, error: routeError } = await supabase
    .from('v_kos_active_routing')
    .select('*')
    .eq('function_name', functionName)
    .single()

  if (routeError || !route) {
    const latency = performance.now() - start
    await logRouting(supabase, functionName, 'not_found', latency, 'error', false, null, 'Function not found in routing table')
    return new Response(
      JSON.stringify({
        error: `Function '${functionName}' not found in routing table`,
        provider_used: 'not_found',
        latency_ms: Math.round(latency),
      }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }

  const maxErrors = route.max_errors_before_fallback ?? MAX_ERRORS

  // Circuit breaker : error_count >= max → 503 direct
  if (route.error_count >= maxErrors) {
    const latency = performance.now() - start
    await logRouting(supabase, functionName, 'circuit_open', latency, 'error', false, null, `Circuit open: ${route.error_count}/${maxErrors} errors`)
    return new Response(
      JSON.stringify({
        error: 'Circuit open',
        detail: `${route.error_count}/${maxErrors} consecutive failures — all providers exhausted`,
        provider_used: 'circuit_open',
        latency_ms: Math.round(latency),
      }),
      { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }

  // 2. Health check upstream AVANT appel — 150%
  const healthUrl = route.current_provider === 'n8n'
    ? `${route.n8n_webhook_url}/health`
    : 'http://vllm:8000/health'

  try {
    const health = await fetch(healthUrl, { signal: AbortSignal.timeout(HEALTH_CHECK_TIMEOUT_MS) })
    if (!health.ok) throw new Error('unhealthy')
  } catch {
    // Failover immédiat sans attendre 502
    await supabase.from('kos_function_routing')
      .update({ error_count: (route.error_count ?? 0) + 1 })
      .eq('function_name', functionName)

    return await callFallback(route, payload, start, supabase)
  }

  // 3. Appel normal avec timeout 150%
  try {
    const res = await fetch(route.n8n_webhook_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()
    const latency = performance.now() - start

    await supabase.from('kos_function_routing')
      .update({ error_count: 0, last_routed_at: new Date().toISOString() })
      .eq('function_name', functionName)

    await logRouting(supabase, functionName, 'n8n', latency, 'success', false, null)

    return new Response(
      JSON.stringify({ data }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'X-Routing-Latency': Math.round(latency).toString(),
          'X-Routing-Provider': 'n8n',
          'X-Routing-Primary': route.primary_provider,
          'X-Routing-Failover': 'false',
        },
      },
    )
  } catch (e) {
    const errMsg = e instanceof Error ? e.message : String(e)
    console.error(`[KOS Routing] Primary n8n FAILED for ${functionName}:`, errMsg.slice(0, 200))

    // 4. Auto-failover <1.5s
    await supabase.from('kos_function_routing')
      .update({ error_count: (route.error_count ?? 0) + 1 })
      .eq('function_name', functionName)

    return await callFallback(route, payload, start, supabase)
  }
})