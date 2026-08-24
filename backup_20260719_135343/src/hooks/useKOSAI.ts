import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface AIRequest {
  prompt_name: string
  variables: Record<string, any>
  force_provider?: 'anthropic' | 'openai' | 'mistral' | 'kos-automaton'
}

interface AIResponse {
  answer: string
  provider: string
  model: string
  cost_usd: number
  tokens: { input: number; output: number; total: number }
  latency_ms: number
}

export function useKOSAI() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastResponse, setLastResponse] = useState<AIResponse | null>(null)

  const ask = async ({ prompt_name, variables, force_provider }: AIRequest): Promise<AIResponse | null> => {
    setLoading(true)
    setError(null)
    try {
      const { data: userData } = await supabase.auth.getUser()
      const { data, error: fnError } = await supabase.functions.invoke('kos-ai-router', {
        body: {
          prompt_name,
          variables,
          force_provider,
          user_id: userData.user?.id,
          session_id: crypto.randomUUID()
        }
      })
      if (fnError) throw fnError
      setLastResponse(data as AIResponse)
      return data as AIResponse
    } catch (e: any) {
      const message = e.message || 'Erreur inconnue'
      setError(message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => setError(null)

  return { ask, loading, error, lastResponse, clearError }
}



