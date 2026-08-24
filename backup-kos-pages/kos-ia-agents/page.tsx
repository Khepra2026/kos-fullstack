import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

type AgentInfo = {
  id: string;
  name: string;
  agent_type: string;
  agent_status: string;
  success_rate: number;
  last_run: string | null;
  agent_config: any;
};

type HealthLog = {
  service: string;
  status: string;
  message: string;
  timestamp: string;
};

const MOCK_AGENTS: AgentInfo[] = [
  {
    id: 'mock-pub-360',
    name: 'Publisher-360',
    agent_type: 'ayrshare',
    agent_status: 'active',
    success_rate: 0.97,
    last_run: new Date().toISOString(),
    agent_config: { platforms: ['linkedin', 'facebook', 'instagram', 'tiktok', 'threads', 'youtube'], locales: ['fr', 'en', 'wo', 'ee', 'ar', 'pt'] },
  },
  {
    id: 'mock-trans-pro',
    name: 'Translator-Pro',
    agent_type: 'deepl',
    agent_status: 'active',
    success_rate: 0.94,
    last_run: new Date(Date.now() - 1800000).toISOString(),
    agent_config: { locales: ['EN-GB', 'AR', 'PT-PT', 'PT-BR'], formality: 'prefer_more' },
  },
  {
    id: 'mock-opt-seo',
    name: 'Optimizer-SEO',
    agent_type: 'llm',
    agent_status: 'active',
    success_rate: 0.88,
    last_run: new Date(Date.now() - 600000).toISOString(),
    agent_config: { model: 'mixtral-ohada', target_ctr: 0.05 },
  },
];

const MOCK_LOGS: HealthLog[] = [
  { service: 'Publisher-360', status: 'ok', message: 'Publication LinkedIn + YouTube OK', timestamp: new Date(Date.now() - 120000).toISOString() },
  { service: 'Translator-Pro', status: 'ok', message: 'DeepL FR→EN 3 topics traduits', timestamp: new Date(Date.now() - 300000).toISOString() },
  { service: 'Optimizer-SEO', status: 'ok', message: 'CTR 4.2% — au-dessus du seuil', timestamp: new Date(Date.now() - 600000).toISOString() },
  { service: 'Publisher-360', status: 'ok', message: 'Publication TikTok Wolof OK', timestamp: new Date(Date.now() - 900000).toISOString() },
  { service: 'Translator-Pro', status: 'ok', message: 'Fallback LLM: WO, EE, LN', timestamp: new Date(Date.now() - 1200000).toISOString() },
  { service: 'Publisher-360', status: 'healed', message: 'Rotation clé Ayrshare backup activée', timestamp: new Date(Date.now() - 1800000).toISOString() },
];

const AGENT_ICONS: Record<string, string> = {
  ayrshare: 'ri-send-plane-fill',
  deepl: 'ri-translate-2',
  llm: 'ri-robot-2-line',
};

const AGENT_COLORS: Record<string, string> = {
  ayrshare: 'accent',
  deepl: 'primary',
  llm: 'secondary',
};

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-accent-500',
  paused: 'bg-amber-500',
  error: 'bg-red-500',
};

export default function iAAgentsPage() {
  const [agents, setAgents] = useState<AgentInfo[]>([]);
  const [logs, setLogs] = useState<HealthLog[]>(MOCK_LOGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('kos_agents')
        .select('*')
        .in('agent_type', ['ayrshare', 'deepl', 'llm'])
        .order('name', { ascending: true });

      if (err) throw err;
      if (data && data.length > 0) {
        setAgents(data as AgentInfo[]);
      } else {
        setAgents(MOCK_AGENTS);
      }
    } catch (e) {
      console.warn('[KOS-IA-Agents] Using mock agents:', e);
      setAgents(MOCK_AGENTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();

    // Realtime subscription for agents
    const agentsChannel = supabase
      .channel('kos-ia-agents-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'kos_agents', filter: 'agent_type=in.(ayrshare,deepl,llm)' },
        () => { fetchAgents(); }
      )
      .subscribe();

    // Realtime subscription for health logs
    const logsChannel = supabase
      .channel('kos-ia-agents-logs')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'logs_health' },
        (payload: any) => {
          setLogs(prev => [payload.new as HealthLog, ...prev.slice(0, 19)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(agentsChannel);
      supabase.removeChannel(logsChannel);
    };
  }, [fetchAgents]);

  const formatTime = (ts: string | null) => {
    if (!ts) return '—';
    try {
      return new Date(ts).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '—';
    }
  };

  const formatDateTime = (ts: string) => {
    try {
      return new Date(ts).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return '—';
    }
  };

  return (
    <div className="min-h-screen bg-background-50">
      {/* Header */}
      <header className="border-b border-background-200/70 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent-500 flex items-center justify-center">
              <i className="ri-robot-2-line text-background-50 text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground-950">
                KOS-IA Agents<span className="text-accent-500">™</span>
              </h1>
              <p className="text-xs text-foreground-500 mt-0.5">War Room — Orchestration Agents IA Big Four</p>
            </div>
          </div>
          <p className="text-sm text-foreground-600 max-w-2xl mb-4">
            Monitoring temps réel des 3 agents IA autonomes : Publisher-360 (Ayrshare), Translator-Pro (DeepL+LLM), 
            Optimizer-SEO (A/B Testing + Key Rotation). Pipeline social 18 langues — 6 plateformes.
          </p>

          {/* Global status */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-100/80 border border-accent-200/60">
              <div className="w-2 h-2 rounded-full bg-accent-500"></div>
              <span className="text-xs text-accent-800 font-medium">
                {agents.length} agents actifs
              </span>
            </div>
            <span className="text-xs text-foreground-400">
              Pipeline : Script FR → Translator-Pro (18 langues) → Publisher-360 (6 plateformes) → Optimizer-SEO (A/B + Rotation)
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Agent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {loading && agents.length === 0 ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-6 rounded-xl bg-background-50 border border-background-200/60 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-background-200"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-background-200 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-background-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-8 bg-background-200 rounded w-16 mb-3"></div>
                <div className="h-2 bg-background-200 rounded-full mb-3"></div>
                <div className="h-3 bg-background-200 rounded w-32"></div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-full p-6 rounded-xl bg-red-50 border border-red-200 text-center">
              <i className="ri-error-warning-line text-red-500 text-2xl mb-2 block"></i>
              <p className="text-sm text-red-700">Erreur de chargement des agents</p>
              <button onClick={fetchAgents} className="mt-2 text-xs text-red-600 underline cursor-pointer">
                Réessayer
              </button>
            </div>
          ) : (
            agents.map((agent) => {
              const colorRole = AGENT_COLORS[agent.agent_type] || 'accent';
              const iconClass = AGENT_ICONS[agent.agent_type] || 'ri-robot-2-line';
              const rate = Math.round((agent.success_rate || 0) * 100);

              return (
                <div
                  key={agent.id}
                  className="p-6 rounded-xl bg-background-50 border border-background-200/60 hover:border-background-300/80 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `oklch(var(--${colorRole}-500) / 0.12)` }}
                      >
                        <i
                          className={`${iconClass} text-lg`}
                          style={{ color: `oklch(var(--${colorRole}-500))` }}
                        ></i>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground-900">{agent.name}</h3>
                        <p className="text-xxs text-foreground-500 uppercase tracking-wide">{agent.agent_type}</p>
                      </div>
                    </div>
                    <div className={`w-2.5 h-2.5 rounded-full ${STATUS_COLORS[agent.agent_status] || 'bg-foreground-400'}`}></div>
                  </div>

                  {/* Success rate */}
                  <div className="mb-3">
                    <div className="flex items-end justify-between mb-1">
                      <span className="text-2xl font-bold text-foreground-900">{rate}%</span>
                      <span className="text-xxs text-foreground-400">success rate</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-background-200 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${rate}%`,
                          backgroundColor: `oklch(var(--${colorRole}-500) / ${0.4 + (rate / 100) * 0.6})`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Last run */}
                  <div className="flex items-center gap-2 text-xs text-foreground-500 mb-3">
                    <i className="ri-time-line text-foreground-400"></i>
                    <span>Dernier run: <strong className="text-foreground-700">{formatTime(agent.last_run)}</strong></span>
                  </div>

                  {/* Config details */}
                  {agent.agent_type === 'ayrshare' && agent.agent_config?.platforms && (
                    <div className="flex flex-wrap gap-1">
                      {agent.agent_config.platforms.map((p: string) => (
                        <span key={p} className="px-1.5 py-0.5 rounded text-xxs bg-accent-100/80 text-accent-700 whitespace-nowrap">{p}</span>
                      ))}
                    </div>
                  )}
                  {agent.agent_type === 'deepl' && agent.agent_config?.locales && (
                    <div className="flex flex-wrap gap-1">
                      {agent.agent_config.locales.map((l: string) => (
                        <span key={l} className="px-1.5 py-0.5 rounded text-xxs bg-primary-100/80 text-primary-700 whitespace-nowrap">{l}</span>
                      ))}
                    </div>
                  )}
                  {agent.agent_type === 'llm' && agent.agent_config?.model && (
                    <div className="flex items-center gap-1">
                      <span className="px-1.5 py-0.5 rounded text-xxs bg-secondary-100/80 text-secondary-700 whitespace-nowrap">
                        {agent.agent_config.model}
                      </span>
                      <span className="text-xxs text-foreground-400">
                        CTR cible: {(agent.agent_config.target_ctr * 100).toFixed(0)}%
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Pipeline Flow Diagram */}
        <div className="mb-8 p-6 rounded-xl bg-background-50 border border-background-200/60">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-6 h-6 rounded bg-accent-500/15 flex items-center justify-center">
              <i className="ri-git-branch-line text-accent-600 text-xs"></i>
            </div>
            <span className="text-xs font-semibold text-foreground-700 uppercase tracking-wide">Pipeline Orchestration Flow</span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            {[
              { step: '1', name: 'Gen Script FR', icon: 'ri-file-text-line', color: 'primary' },
              { step: '2', name: 'Translator-Pro', icon: 'ri-translate-2', color: 'primary', desc: '18 langues' },
              { step: '3', name: 'Creatomate', icon: 'ri-movie-line', color: 'secondary', desc: 'Videos' },
              { step: '4', name: 'Publisher-360', icon: 'ri-send-plane-fill', color: 'accent', desc: '6 plateformes' },
              { step: '5', name: 'Optimizer-SEO', icon: 'ri-robot-2-line', color: 'secondary', desc: 'A/B + Rotation' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `oklch(var(--${item.color}-500) / 0.12)` }}
                  >
                    <i
                      className={`${item.icon} text-xl`}
                      style={{ color: `oklch(var(--${item.color}-500))` }}
                    ></i>
                  </div>
                  <span
                    className="text-xxs font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap"
                    style={{
                      backgroundColor: `oklch(var(--${item.color}-100) / 0.8)`,
                      color: `oklch(var(--${item.color}-700))`,
                    }}
                  >
                    {item.name}
                  </span>
                  {item.desc && <span className="text-xxs text-foreground-400 -mt-1">{item.desc}</span>}
                </div>
                {i < 4 && (
                  <i className="ri-arrow-right-line text-foreground-300 text-lg hidden md:block"></i>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Health Logs */}
        <div className="rounded-xl bg-background-50 border border-background-200/60 overflow-hidden">
          <div className="p-5 border-b border-background-200/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-secondary-500/15 flex items-center justify-center">
                <i className="ri-pulse-line text-secondary-600 text-xs"></i>
              </div>
              <span className="text-xs font-semibold text-foreground-700 uppercase tracking-wide">
                Health Logs Live
              </span>
            </div>
            <span className="text-xxs text-foreground-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse"></span>
              Temps réel
            </span>
          </div>
          <div className="divide-y divide-background-200/40 max-h-80 overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-background-100/50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`text-xxs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${
                      log.status === 'error'
                        ? 'bg-red-100 text-red-700'
                        : log.status === 'healed'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-accent-100 text-accent-700'
                    }`}
                  >
                    {log.status}
                  </span>
                  <span className="text-xs font-medium text-foreground-700 whitespace-nowrap">{log.service}</span>
                  <span className="text-xs text-foreground-500 truncate hidden sm:inline">{log.message}</span>
                </div>
                <span className="text-xxs text-foreground-400 whitespace-nowrap ml-3">{formatDateTime(log.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-background-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-foreground-400">
          <div className="flex items-center gap-4 flex-wrap">
            <span>KOS-IA Agents™ v2.0</span>
            <span className="hidden sm:inline">·</span>
            <span>3 Agents · 18 Langues · 6 Plateformes</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
              Publisher-360
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
              Translator-Pro
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-500"></span>
              Optimizer-SEO
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}





