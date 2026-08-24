import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface searchSource {
  title: string
  source: string
  score: number
  metadata: Record<string, unknown>
}

interface searchResult {
  answer: string
  sources: searchSource[]
  model: string
  latency_ms: number
  confidence: number
}

export function useKOSSearch() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<searchResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const search = async (query: string, useClaude = true) => {
    setLoading(true)
    setError(null)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { data, error: invokeError } = await supabase.functions.invoke('kos-ai-router-v2', {
        body: { query, user_id: user?.id, use_claude: useClaude }
      })
      if (invokeError) throw invokeError
      setResult(data as searchResult)
      return data as searchResult
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la recherche KOS AI'
      setError(message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { search, loading, result, error }
}



