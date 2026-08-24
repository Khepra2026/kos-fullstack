import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface RouterRequest {
  prompt_name: string
  variables: Record<string, any>
  user_id?: string
  session_id?: string
  force_provider?: string
}

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { prompt_name, variables, user_id, session_id, force_provider }: RouterRequest = await req.json()

  // 1. Charger prompt + provider chain
  const { data: prompt } = await supabase
    .from('ai_prompts')
    .select('*')
    .eq('name', prompt_name)
    .eq('active', true)
    .single()

  if (!prompt) return new Response(JSON.stringify({ error: 'Prompt not found' }), { status: 404 })

  let { data: providers } = await supabase
    .from('ai_providers')
    .select('*')
    .eq('enabled', true)
    .order('priority', { ascending: true })

  if (force_provider && providers) {
    providers = providers.filter(p => p.provider === force_provider)
  }

  // 2. Reset quotas quotidiens
  await supabase.rpc('reset_ai_quotas_daily')

  // 3. Remplacer variables dans prompt
  let finalPrompt = prompt.prompt
  if (prompt.variables && Array.isArray(prompt.variables)) {
    for (const key of prompt.variables) {
      finalPrompt = finalPrompt.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), variables[key] ?? '')
    }
  }

  // 4. Essayer chaque provider par priorite
  for (const provider of providers || []) {
    // Check quota
    if (provider.daily_quota && provider.used_today >= provider.daily_quota) continue

    const start = Date.now()
    let answer: string
    let input_tokens = 0
    let output_tokens = 0
    let cost = 0

    try {
      if (provider.provider === 'anthropic') {
        const apiKey = Deno.env.get(provider.api_key_secret_name!)
        if (!apiKey) throw new Error(`Missing secret: ${provider.api_key_secret_name}`)
        const res = await fetch(`${provider.base_url}/messages`, {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            model: provider.model,
            max_tokens: provider.max_tokens || 4096,
            temperature: Number(provider.temperature) || 0.3,
            messages: [{ role: 'user', content: finalPrompt }]
          })
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error?.message || `Anthropic HTTP ${res.status}`)
        input_tokens = json.usage?.input_tokens || 0
        output_tokens = json.usage?.output_tokens || 0
        cost = (input_tokens * 0.003 + output_tokens * 0.015) / 1000
        answer = json.content?.[0]?.text || ''

      } else if (provider.provider === 'openai') {
        const apiKey = Deno.env.get(provider.api_key_secret_name!)
        if (!apiKey) throw new Error(`Missing secret: ${provider.api_key_secret_name}`)
        const res = await fetch(`${provider.base_url}/chat/completions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            model: provider.model,
            temperature: Number(provider.temperature) || 0.3,
            messages: [{ role: 'user', content: finalPrompt }]
          })
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error?.message || `OpenAI HTTP ${res.status}`)
        input_tokens = json.usage?.prompt_tokens || 0
        output_tokens = json.usage?.completion_tokens || 0
        cost = (input_tokens * 0.005 + output_tokens * 0.015) / 1000
        answer = json.choices?.[0]?.message?.content || ''

      } else if (provider.provider === 'mistral') {
        const apiKey = Deno.env.get(provider.api_key_secret_name!)
        if (!apiKey) throw new Error(`Missing secret: ${provider.api_key_secret_name}`)
        const res = await fetch(`${provider.base_url}/chat/completions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            model: provider.model,
            temperature: Number(provider.temperature) || 0.3,
            messages: [{ role: 'user', content: finalPrompt }]
          })
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error?.message || `Mistral HTTP ${res.status}`)
        input_tokens = json.usage?.prompt_tokens || 0
        output_tokens = json.usage?.completion_tokens || 0
        cost = (input_tokens * 0.002 + output_tokens * 0.006) / 1000
        answer = json.choices?.[0]?.message?.content || ''

      } else if (provider.provider === 'kos-automaton') {
        // Fallback 100% local via kos_local_rag_v2 (kos_knowledge_base native)
        const { data: rag } = await supabase.rpc('kos_local_rag_v2', { p_query: variables.question || finalPrompt })
        answer = rag?.answer || 'Donnee non disponible dans KOS local'
        input_tokens = Math.ceil(finalPrompt.length / 4)
        output_tokens = Math.ceil(answer.length / 4)

      } else {
        throw new Error(`Provider ${provider.provider} non supporte`)
      }

      // 5. Log succes + update quota
      await supabase.from('ai_inference_logs').insert({
        provider: provider.provider,
        model: provider.model,
        prompt_id: prompt.id,
        input_tokens,
        output_tokens,
        latency_ms: Date.now() - start,
        cost_usd: cost,
        status: 'success',
        user_id,
        session_id
      })

      await supabase.from('ai_providers')
        .update({ used_today: (provider.used_today || 0) + input_tokens + output_tokens })
        .eq('id', provider.id)

      return new Response(JSON.stringify({
        answer,
        provider: provider.provider,
        model: provider.model,
        cost_usd: cost,
        tokens: { input: input_tokens, output: output_tokens, total: input_tokens + output_tokens },
        latency_ms: Date.now() - start
      }), { headers: { 'Content-Type': 'application/json' } })

    } catch (e: any) {
      // Log erreur et essayer le provider suivant
      await supabase.from('ai_inference_logs').insert({
        provider: provider.provider,
        model: provider.model,
        prompt_id: prompt.id,
        latency_ms: Date.now() - start,
        status: 'error',
        error_message: e.message,
        user_id,
        session_id
      })
      continue
    }
  }

  return new Response(JSON.stringify({
    error: 'All providers failed',
    answer: 'Tous les fournisseurs IA sont indisponibles. Le systeme de secours local est epuise egalement.'
  }), { status: 503 })
})