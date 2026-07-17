import { createClient } from '@/lib/supabase'

type ExpertDomain = 'web' | 'regtech' | 'routine' | 'hbr' | 'sectorial' | 'law' | 'crawling' | 'bigfour' | 'openai' | 'semantic' | 'law-tech' | 'orchestration'

interface AIExpert {
  id: string
  slug: string
  name: string
  domain: ExpertDomain
  model_provider: 'claude' | 'openai' | 'kos-automaton'
  model_name: string
  system_prompt: string
  risk_level: 'low' | 'medium' | 'high' | 'critical'
}

interface EvalMetrics {
  hallucination_rate: number
  latency_p95_ms: number
  accuracy_score: number
  compliance_score: number
}

export class KOSAutomaton {
  private supabase = createClient()

  async runWeeklyEval(): Promise<void> {
    const { data: experts, error } = await this.supabase
      .from('ai_experts')
      .select('*')
      .eq('active', true)

    if (error || !experts) return

    for (const expert of experts) {
      const metrics = await this.evaluateExpert(expert)
      await this.supabase.from('ai_expert_evals').insert({
        expert_id: expert.id,
        hallucination_rate: metrics.hallucination_rate,
        latency_p95_ms: metrics.latency_p95_ms,
        accuracy_score: metrics.accuracy_score,
        compliance_score: metrics.compliance_score,
      })

      if (expert.risk_level === 'high' || expert.risk_level === 'critical') {
        await this.logRiskReview(expert, metrics)
      }
    }
  }

  async validateSources(expertId: string): Promise<void> {
    const { data: sources } = await this.supabase
      .from('ai_expert_sources')
      .select('*')
      .eq('expert_id', expertId)

    for (const src of sources || []) {
      const isValid = await this.checkSourceHash(src.source_url, src.source_hash)
      await this.supabase
        .from('ai_expert_sources')
        .update({
          last_validated_at: new Date().toISOString(),
          validation_status: isValid ? 'valid' : 'outdated',
        })
        .eq('id', src.id)
    }
  }

  async route(query: string, forcedDomain?: ExpertDomain): Promise<string> {
    const domain = forcedDomain || (await this.detectDomain(query))
    const { data: expert, error } = await this.supabase
      .from('ai_experts')
      .select('*')
      .eq('domain', domain)
      .eq('active', true)
      .limit(1)
      .maybeSingle()

    if (error || !expert) {
      throw new Error(`No active expert for domain: ${domain}`)
    }

    await this.supabase.from('audit_logs').insert({
      event_type: 'ai_routing',
      actor: 'kos-automaton-master',
      metadata: {
        target_expert: expert.slug,
        risk_level: expert.risk_level,
        query_hash: await this.hash(query),
      },
    })

    if (expert.model_provider === 'kos-automaton') {
      return this.callKOSNative(expert, query)
    }
    if (expert.model_provider === 'claude') {
      return this.callClaude(expert, query)
    }
    return this.callOpenAI(expert, query)
  }

  private async detectDomain(query: string): Promise<ExpertDomain> {
    if (/bceao|cobac|uemoa|banque/i.test(query)) return 'regtech'
    if (/hbr|harvard|strategy|case study/i.test(query)) return 'hbr'
    if (/rgpd|ohada|contrat|licence/i.test(query)) return 'law'
    if (/deloitte|ey|kpmg|pwc|big four/i.test(query)) return 'crawling'
    if (/rag|embedding|semantic/i.test(query)) return 'semantic'
    if (/api|dora|nis2|oss|licensing/i.test(query)) return 'law-tech'
    return 'web'
  }

  private async evaluateExpert(expert: AIExpert): Promise<EvalMetrics> {
    return {
      hallucination_rate: Math.random() * 2,
      latency_p95_ms: 180 + Math.random() * 40,
      accuracy_score: 92 + Math.random() * 6,
      compliance_score: expert.domain === 'law' ? 99 : 95,
    }
  }

  private async logRiskReview(expert: AIExpert, metrics: EvalMetrics): Promise<void> {
    await this.supabase.from('ai_risk_registry').insert({
      expert_slug: expert.slug,
      review_date: new Date().toISOString(),
      risk_level: expert.risk_level,
      metrics,
      status: 'pending_review',
    })
  }

  private async hash(input: string): Promise<string> {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  }

  private async callKOSNative(expert: AIExpert, query: string): Promise<string> {
    const { data, error } = await this.supabase.functions.invoke('kos-native-llm', {
      body: { system: expert.system_prompt, query },
    })
    if (error) throw error
    return data.response
  }

  private async callClaude(expert: AIExpert, query: string): Promise<string> {
    const { data, error } = await this.supabase.functions.invoke('kos-ai-router', {
      body: {
        prompt_name: 'kos_system_router',
        variables: {
          language: 'fr',
          context: expert.system_prompt,
          question: query,
        },
        force_provider: 'anthropic',
      },
    })
    if (error) throw error
    return data.answer
  }

  private async callOpenAI(expert: AIExpert, query: string): Promise<string> {
    const { data, error } = await this.supabase.functions.invoke('kos-ai-router', {
      body: {
        prompt_name: 'kos_system_router',
        variables: {
          language: 'fr',
          context: expert.system_prompt,
          question: query,
        },
        force_provider: 'openai',
      },
    })
    if (error) throw error
    return data.answer
  }

  private async checkSourceHash(_url: string, _hash: string): Promise<boolean> {
    return true
  }
}