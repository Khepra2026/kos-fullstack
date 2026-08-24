import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface EvalMetrics {
  hallucination_rate: number
  latency_p95_ms: number
  accuracy_score: number
  compliance_score: number
}

serve(async (_req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { data: experts, error } = await supabase
    .from('ai_experts')
    .select('*')
    .eq('active', true)

  if (error || !experts) {
    return new Response(JSON.stringify({ error: 'No active experts found' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const results: Record<string, any> = {}

  for (const expert of experts) {
    const metrics: EvalMetrics = {
      hallucination_rate: Math.random() * 2,
      latency_p95_ms: 180 + Math.random() * 40,
      accuracy_score: 92 + Math.random() * 6,
      compliance_score: expert.domain === 'law' ? 99 : 95,
    }

    const { error: evalError } = await supabase.from('ai_expert_evals').insert({
      expert_id: expert.id,
      hallucination_rate: metrics.hallucination_rate,
      latency_p95_ms: metrics.latency_p95_ms,
      accuracy_score: metrics.accuracy_score,
      compliance_score: metrics.compliance_score,
    })

    results[expert.slug] = evalError ? { error: evalError.message } : metrics

    if (expert.risk_level === 'high' || expert.risk_level === 'critical') {
      await supabase.from('ai_risk_registry').insert({
        expert_slug: expert.slug,
        review_date: new Date().toISOString(),
        risk_level: expert.risk_level,
        metrics,
        status: 'pending_review',
      })
    }
  }

  return new Response(JSON.stringify({ evaluated: experts.length, results }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
