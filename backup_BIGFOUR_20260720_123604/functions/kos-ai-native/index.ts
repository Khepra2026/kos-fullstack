import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

serve(async (req) => {
  const start = performance.now()
  const { query, user_id } = await req.json()

  const { data: ragResults, error } = await supabase.rpc('kos_local_rag_v3', {
    p_query: query,
    p_limit: 5
  })

  if (error) throw error

  const latency = Math.round(performance.now() - start)

  await supabase.from('kos_search_logs').insert({
    user_id,
    query,
    rag_sources: ragResults.sources,
    model_used: 'kos-automaton-native-v3',
    latency_ms: latency,
    tokens_input: 0,
    tokens_output: 0,
    quality_score: ragResults.confidence
  })

  return new Response(JSON.stringify({
    answer: ragResults.answer,
    sources: ragResults.sources,
    model: ragResults.model,
    latency_ms: latency,
    confidence: ragResults.confidence,
    api_calls: 0,
    cost_usd: 0.0
  }), {
    headers: { 'Content-Type': 'application/json', 'X-KOS-Engine': 'Native-v3' }
  })
})