import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

serve(async (req) => {
  const start = performance.now()
  const { query, user_id, use_claude = true } = await req.json()

  // 1. RAG KOS Natif : scrape la base kos_knowledge_base
  const { data: ragResults } = await supabase.rpc('kos_local_rag_v2', {
    p_query: query,
    p_limit: 5
  })

  const sources = ragResults?.sources || []
  const context = sources.map((s: any) =>
    `[${s.source}] ${s.title}: ${s.content}`
  ).join('\n\n')

  let answer = ''
  let model_used = 'kos-automaton-native'
  let tokens_in = 0, tokens_out = 0

  // 2. Si Claude activé ET sources trouvées → Synthèse Claude avec citations KOS
  if (use_claude && sources.length > 0 && ANTHROPIC_API_KEY) {
    const claudeResp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: `Tu es KOS AI, expert RegTech UEMOA. Réponds en français avec citations exactes.

Contexte KOS vérifié :
${context}

Question : ${query}

Instructions :
1. Cite les sources entre [Nom Source]
2. Sois précis sur les chiffres/dates
3. Si info manquante, dis-le
4. Structure : Résumé → Détails → Recommandations`
        }]
      })
    })

    const claudeData = await claudeResp.json()
    answer = claudeData.content?.[0]?.text || ragResults.answer
    model_used = 'claude-3-5-sonnet'
    tokens_in = claudeData.usage?.input_tokens || 0
    tokens_out = claudeData.usage?.output_tokens || 0
  } else {
    answer = ragResults.answer
  }

  const latency = Math.round(performance.now() - start)

  // 3. Log ISO 42001 A.9
  await supabase.from('kos_search_logs').insert({
    user_id,
    query,
    rag_sources: sources,
    model_used,
    latency_ms: latency,
    tokens_input: tokens_in,
    tokens_output: tokens_out,
    quality_score: ragResults.confidence
  })

  return new Response(JSON.stringify({
    answer,
    sources,
    model: model_used,
    latency_ms: latency,
    confidence: ragResults.confidence
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
})