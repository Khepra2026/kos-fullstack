import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

type AgentMetadata = {
  agent_type?: string
  risk_level?: 'low' | 'medium' | 'high' | 'critical'
  status?: string
  tools?: string[]
  frameworks?: string[]
  [key: string]: unknown
}

type Agent = {
  id: string
  name: string
  agent_code: string
  agent_role: string
  system_prompt: string
  model: string
  version: number
  metadata: AgentMetadata
  knowledge_domains: string[]
}

type RoutingTrace = {
  query: string
  target: string
  reason: string
  timestamp: string
}

export function AutonomousOrchestrator() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [trace, setTrace] = useState<RoutingTrace[]>([])
  const [response, setResponse] = useState<string | null>(null)
  const [routing, setRouting] = useState(false)

  const loadAgents = useCallback(async () => {
    const { data, error } = await supabase
      .from('kos_agents')
      .select('id, name, agent_code, agent_role, system_prompt, model, version, metadata, knowledge_domains')
      .in('agent_code', [
        'hermes-orchestrator',
        'genora-cfo',
        'bigfour-soc2',
        'bigfour-iso27001',
        'bigfour-iso42001',
        'bigfour-rgpd',
        'kos-research-lead',
      ])
      .order('name')

    if (!error && data) {
      setAgents(data as Agent[])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadAgents()
  }, [loadAgents])

  const routeQuery = async () => {
    if (!query.trim()) return

    setRouting(true)
    setResponse(null)

    const { data, error } = await supabase.functions.invoke('hermes-router', {
      body: {
        query,
        context: {
          user_id: (await supabase.auth.getUser()).data.user?.id,
        },
      },
    })

    if (error) {
      setTrace((prev) => [
        ...prev,
        {
          query,
          target: 'ERROR',
          reason: error.message,
          timestamp: new Date().toISOString(),
        },
      ])
      setResponse(`Erreur Hermes: ${error.message}`)
    } else {
      setTrace((prev) => [
        ...prev,
        {
          query,
          target: data.agent_code || data.agent_name,
          reason: data.reason,
          timestamp: new Date().toISOString(),
        },
      ])
      setResponse(data.output)
    }

    setRouting(false)
  }

  const getRiskBadge = (level?: string) => {
    const colors: Record<string, string> = {
      low: 'bg-emerald-100 text-emerald-800',
      medium: 'bg-amber-100 text-amber-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800',
    }
    return colors[level || 'low'] || colors.low
  }

  const getRoleIcon = (role: string) => {
    const icons: Record<string, string> = {
      Director: 'ri-vip-crown-line',
      'Compliance Officer': 'ri-shield-check-line',
      'Risk Officer': 'ri-alert-line',
      'AI Officer': 'ri-robot-line',
      Researcher: 'ri-search-eye-line',
    }
    return icons[role] || 'ri-user-line'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-2 border-foreground-200 border-t-foreground-950 rounded-full"></div>
      </div>
    )
  }

  const criticalCount = agents.filter(
    (a) => a.metadata?.risk_level === 'critical' || a.metadata?.risk_level === 'high'
  ).length

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground-950">KOS AI Autonome — Centre de Commande</h1>
        <p className="mt-2 text-foreground-600 text-sm">
          Orchestrateur multi-agents Hermes · {agents.length} agents actifs · {criticalCount} critiques
        </p>
      </div>

      {/* Hermes Query Box */}
      <div className="bg-background-100 rounded-lg border border-background-200/70 p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500 text-background-50">
            <i className="ri-flashlight-line text-lg"></i>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground-950">Hermes Orchestrator</h2>
            <p className="text-xs text-foreground-600">Routez votre requete vers l&apos;agent specialise</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && routeQuery()}
            placeholder="Posez une question Big Four, Finance, R&amp;D, Compliance..."
            className="flex-1 px-4 py-3 bg-background-50 border border-background-200/70 rounded-md text-sm text-foreground-950 placeholder-foreground-400 focus:outline-none focus:border-primary-500 transition-colors"
          />
          <button
            onClick={routeQuery}
            disabled={routing || !query.trim()}
            className="px-6 py-3 bg-primary-500 text-background-50 rounded-md text-sm font-medium hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap cursor-pointer"
          >
            {routing ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin w-4 h-4 border-2 border-background-50/30 border-t-background-50 rounded-full"></span>
                Routage...
              </span>
            ) : (
              'Router via Hermes'
            )}
          </button>
        </div>
        {response && (
          <div className="mt-4 p-4 bg-background-50 border border-background-200/70 rounded-md">
            <p className="text-sm text-foreground-700 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>

      {/* Agents Grid */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground-950 mb-4">Agents Specialises</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-background-100 border border-background-200/70 rounded-lg p-5 hover:border-background-300/60 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-700">
                    <i className={`${getRoleIcon(agent.agent_role)} text-base`}></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground-950">{agent.name}</h3>
                    <p className="text-xs text-foreground-600">{agent.agent_role}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRiskBadge(agent.metadata?.risk_level)}`}
                >
                  {agent.metadata?.risk_level || 'low'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {agent.knowledge_domains?.slice(0, 3).map((domain) => (
                  <span
                    key={domain}
                    className="px-2 py-0.5 bg-background-50 border border-background-200/70 rounded text-xs text-foreground-600"
                  >
                    {domain}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground-500">
                <span className="flex items-center gap-1">
                  <i className="ri-cpu-line"></i> {agent.model}
                </span>
                <span>·</span>
                <span>v{agent.version}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Trail */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground-950">Trace d&apos;Audit Temps Reel</h2>
          <span className="text-xs text-foreground-600">{trace.length} decisions</span>
        </div>
        {trace.length === 0 ? (
          <div className="bg-background-100 border border-background-200/70 rounded-lg p-8 text-center">
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-secondary-100 text-secondary-500 mb-3">
              <i className="ri-history-line text-xl"></i>
            </div>
            <p className="text-sm text-foreground-600">Aucune trace pour le moment. Soumettez une requete via Hermes.</p>
          </div>
        ) : (
          <div className="bg-background-100 border border-background-200/70 rounded-lg overflow-hidden">
            <div className="max-h-[300px] overflow-y-auto">
              {trace.map((t, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-4 py-3 border-b border-background-200/70 last:border-0"
                >
                  <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-600 mt-0.5">
                    <i className="ri-arrow-right-line text-xs"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-foreground-950 truncate">{t.query}</p>
                    <p className="text-xs text-foreground-500 mt-0.5">
                      Hermes → <span className="font-medium text-accent-600">{t.target}</span>
                      <span className="mx-1">·</span>
                      {t.reason}
                    </p>
                    <p className="text-xs text-foreground-400 mt-0.5">
                      {new Date(t.timestamp).toLocaleTimeString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AutonomousOrchestrator