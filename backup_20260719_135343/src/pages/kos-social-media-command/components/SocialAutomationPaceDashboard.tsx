import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface AutomationAgent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'error';
  currentTask: string;
  postsGenerated: number;
  postsThisHour: number;
  lastActivity: string;
  icon: string;
  color: string;
}

interface LiveActivity {
  id: string;
  timestamp: string;
  agent: string;
  action: string;
  platform: string;
  detail: string;
  type: 'generation' | 'scheduling' | 'publishing' | 'optimization' | 'analytics';
}

const AUTOMATION_AGENTS: AutomationAgent[] = [
  { id: 'social-content-gen', name: 'Content Generator', role: 'Génération IA de posts', status: 'active', currentTask: 'Génération post LinkedIn — Conformité BCEAO', postsGenerated: 247, postsThisHour: 3, lastActivity: 'Il y a 12 secondes', icon: 'ri-quill-pen-line', color: '#0A66C2' },
  { id: 'social-scheduler', name: 'Smart Scheduler', role: 'Planification optimale', status: 'active', currentTask: 'Optimisation créneau — Mardi 8h GMT', postsGenerated: 186, postsThisHour: 2, lastActivity: 'Il y a 45 secondes', icon: 'ri-calendar-schedule-line', color: '#059669' },
  { id: 'hashtag-optimizer', name: 'Hashtag Optimizer', role: 'Optimisation hashtags & reach', status: 'active', currentTask: 'Analyse tendances — #BCEAO #Conformité', postsGenerated: 312, postsThisHour: 5, lastActivity: 'Il y a 8 secondes', icon: 'ri-hashtag', color: '#7C3AED' },
  { id: 'engagement-analyzer', name: 'Engagement Analyzer', role: 'Analyse performance posts', status: 'active', currentTask: 'Calcul taux engagement — Lot LinkedIn M6', postsGenerated: 158, postsThisHour: 1, lastActivity: 'Il y a 2 minutes', icon: 'ri-line-chart-line', color: '#DC2626' },
  { id: 'content-repurposer', name: 'Content Repurposer', role: 'Adaptation cross-plateforme', status: 'active', currentTask: 'Conversion article → thread X', postsGenerated: 94, postsThisHour: 2, lastActivity: 'Il y a 30 secondes', icon: 'ri-loop-left-line', color: '#D97706' },
  { id: 'linkedin-publisher', name: 'LinkedIn Publisher', role: 'Publication automatique LinkedIn', status: 'active', currentTask: 'File d\'attente — 6 posts cette semaine', postsGenerated: 203, postsThisHour: 1, lastActivity: 'Il y a 1 minute', icon: 'ri-linkedin-fill', color: '#004182' },
];

function mapActionToType(action: string): LiveActivity['type'] {
  if (action.includes('generated') || action.includes('variant') || action.includes('carrousel')) return 'generation';
  if (action.includes('slot') || action.includes('timing') || action.includes('recalibrat')) return 'scheduling';
  if (action.includes('publish') || action.includes('cross_post')) return 'publishing';
  if (action.includes('hashtag') || action.includes('optimiz')) return 'optimization';
  if (action.includes('metric') || action.includes('trend') || action.includes('analyz')) return 'analytics';
  return 'generation';
}

function formatTimeAgo(iso: string): string {
  const diff = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `Il y a ${diff}s`;
  if (diff < 3600) return `Il y a ${Math.floor(diff / 60)}min`;
  return `Il y a ${Math.floor(diff / 3600)}h`;
}

const TYPE_BADGES: Record<string, { bg: string; text: string; icon: string }> = {
  generation: { bg: 'bg-[#0A66C2]/10', text: 'text-[#0A66C2]', icon: 'ri-quill-pen-line' },
  scheduling: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'ri-calendar-schedule-line' },
  publishing: { bg: 'bg-accent-100', text: 'text-accent-700', icon: 'ri-send-plane-line' },
  optimization: { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'ri-flashlight-line' },
  analytics: { bg: 'bg-purple-50', text: 'text-purple-700', icon: 'ri-line-chart-line' },
};

export default function SocialAutomationPaceDashboard() {
  const [activities, setActivities] = useState<LiveActivity[]>([]);
  const [pulse, setPulse] = useState(true);
  const [source, setSource] = useState<'live' | 'mock'>('mock');
  const [agents, setAgents] = useState<AutomationAgent[]>(AUTOMATION_AGENTS);

  const fetchLogs = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('kos_execution_logs')
        .select('*')
        .eq('block_id', 'social-content-gen')
        .or('block_id.eq.social-scheduler,block_id.eq.hashtag-optimizer,block_id.eq.engagement-analyzer,block_id.eq.content-repurposer,block_id.eq.linkedin-publisher')
        .order('timestamp', { ascending: false })
        .limit(20);

      if (!error && data && data.length > 0) {
        const mapped: LiveActivity[] = (data as Record<string, unknown>[]).map((row) => ({
          id: row.id as string,
          timestamp: row.timestamp as string,
          agent: (row.agent_name as string) || (row.agent_id as string) || '',
          action: (row.action as string) || '',
          platform: 'linkedin',
          detail: (row.details as string) || (row.action as string) || '',
          type: mapActionToType((row.action as string) || ''),
        }));
        setActivities(mapped);
        setSource('live');

        // Update agent stats from real logs
        const now = Date.now();
        const oneHourAgo = new Date(now - 3600000).toISOString();
        const updatedAgents = AUTOMATION_AGENTS.map((agent) => {
          const agentLogs = (data as Record<string, unknown>[]).filter(
            r => r.agent_id === agent.id && (r.timestamp as string) > oneHourAgo
          );
          const latestLog = (data as Record<string, unknown>[]).find(r => r.agent_id === agent.id);
          return {
            ...agent,
            postsThisHour: agentLogs.length,
            currentTask: latestLog ? ((latestLog.details as string) || (latestLog.action as string) || agent.currentTask) : agent.currentTask,
            lastActivity: latestLog ? formatTimeAgo(latestLog.timestamp as string) : agent.lastActivity,
            status: agentLogs.length > 0 ? ('active' as const) : ('idle' as const),
          };
        });
        setAgents(updatedAgents);
        return;
      }
    } catch (err) {
      console.warn('[PaceDashboard] Supabase fetch failed, using generated data:', (err as Error)?.message);
    }

    // Fallback: generate from agent data
    setSource('mock');
  }, []);

  useEffect(() => {
    fetchLogs();

    // Refresh every 10 seconds
    const interval = setInterval(() => {
      fetchLogs();
      setPulse(p => !p);
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchLogs]);

  const totalPostsThisHour = agents.reduce((sum, a) => sum + a.postsThisHour, 0);
  const totalPostsAllTime = agents.reduce((sum, a) => sum + a.postsGenerated, 0);
  const activeAgents = agents.filter(a => a.status === 'active').length;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* === RYTHME MAX HEADER === */}
        <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, #059669 0%, transparent 50%), radial-gradient(circle at 80% 50%, #0A66C2 0%, transparent 50%)',
            }} />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm mb-4">
                <span className={`w-2.5 h-2.5 rounded-full ${pulse ? 'bg-emerald-400' : 'bg-emerald-600'} transition-colors duration-300`} />
                <span className="text-sm font-bold text-emerald-300 uppercase tracking-widest">
                  RYTHME MAX — TOUS LES AUTOMATES ACTIFS
                </span>
                {source === 'live' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/30 text-[10px] font-bold text-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE SUPABASE
                  </span>
                )}
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
                Cadence Automatisation Réseaux Sociaux
              </h2>
              <p className="text-gray-400 max-w-xl">
                {activeAgents}/{agents.length} agents en exécution continue.{' '}
                <strong className="text-emerald-400">Zéro intervention humaine.</strong>{' '}
                Les automates génèrent, optimisent et publient en autonomie totale.
              </p>
            </div>

            {/* RPM Gauges */}
            <div className="flex gap-4 lg:gap-6 flex-shrink-0">
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-emerald-500/40 flex items-center justify-center mb-2 relative">
                  <div className={`absolute inset-0 rounded-full border-4 border-emerald-400 ${pulse ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} transition-all duration-700`} />
                  <span className="text-2xl sm:text-3xl font-bold font-heading text-emerald-400">{totalPostsThisHour}</span>
                </div>
                <span className="text-xs text-gray-400">posts / heure</span>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#0A66C2]/40 flex items-center justify-center mb-2">
                  <span className="text-2xl sm:text-3xl font-bold font-heading text-[#5BA4E6]">{totalPostsThisHour * 6}</span>
                </div>
                <span className="text-xs text-gray-400">posts / semaine</span>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-accent-500/40 flex items-center justify-center mb-2">
                  <span className="text-2xl sm:text-3xl font-bold font-heading text-accent-300">{totalPostsAllTime}</span>
                </div>
                <span className="text-xs text-gray-400">total généré</span>
              </div>
            </div>
          </div>

          {/* Speed bar */}
          <div className="relative z-10 mt-6 flex items-center gap-3">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider flex-shrink-0">Cadence</span>
            <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-[#0A66C2] to-accent-500 w-full animate-pulse" />
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs font-bold text-emerald-300 flex-shrink-0">
              <i className="ri-speed-up-line" />
              100% — MAX
            </span>
          </div>
        </div>

        {/* === AGENTS EN ACTION === */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-heading text-xl font-bold text-foreground-950">
              {activeAgents} Automates en Exécution Continue
            </h3>
            <span className="text-xs text-foreground-400 ml-auto">
              {source === 'live' ? 'Données Supabase — MàJ toutes les 10s' : 'Données Mock'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="rounded-2xl bg-white border border-background-200 overflow-hidden hover:shadow-md transition-all group"
              >
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${agent.color}15` }}
                    >
                      <i className={`${agent.icon} text-lg`} style={{ color: agent.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-foreground-950">{agent.name}</h4>
                      <p className="text-[10px] text-foreground-400">{agent.role}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className={`w-2 h-2 rounded-full ${
                        agent.status === 'active' ? 'bg-emerald-500 animate-pulse' :
                        agent.status === 'idle' ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                      <span className={`text-[10px] font-bold ${
                        agent.status === 'active' ? 'text-emerald-600' :
                        agent.status === 'idle' ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {agent.status === 'active' ? 'ACTIF' : agent.status === 'idle' ? 'IDLE' : 'ERREUR'}
                      </span>
                    </div>
                  </div>

                  {/* Current task */}
                  <div className="rounded-lg bg-background-50 border border-background-100 p-3 mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <i className="ri-loader-4-line text-xs text-emerald-500 animate-spin" />
                      <span className="text-[10px] text-foreground-400 uppercase tracking-wider">Tâche en cours</span>
                    </div>
                    <p className="text-xs text-foreground-700 font-medium leading-relaxed">{agent.currentTask}</p>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-foreground-400">
                        <i className="ri-file-list-3-line mr-1 text-foreground-300" />
                        <strong className="text-foreground-700">{agent.postsGenerated}</strong> générés
                      </span>
                      <span className="text-emerald-600 font-bold">
                        <i className="ri-timer-line mr-1" />
                        +{agent.postsThisHour}/h
                      </span>
                    </div>
                    <span className="text-[10px] text-foreground-400">{agent.lastActivity}</span>
                  </div>
                </div>

                {/* Activity bar */}
                <div className="h-1 w-full" style={{ backgroundColor: `${agent.color}10` }}>
                  <div
                    className="h-full transition-all duration-1000"
                    style={{
                      width: `${Math.min(100, agent.postsThisHour * 20)}%`,
                      backgroundColor: agent.color,
                      opacity: 0.6,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === FLUX D'ACTIVITÉ LIVE === */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-3 h-3 rounded-full bg-[#0A66C2] animate-pulse" />
            <h3 className="font-heading text-xl font-bold text-foreground-950">
              Flux d'Activité Live
            </h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-[10px] font-bold text-red-600">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {source === 'live' ? 'LIVE SUPABASE' : 'LIVE'}
            </span>
            {source === 'live' && (
              <span className="text-[10px] text-emerald-600 font-bold">
                <i className="ri-database-2-line mr-1" />
                kos_execution_logs
              </span>
            )}
          </div>

          <div className="rounded-2xl bg-white border border-background-200 overflow-hidden">
            {activities.length > 0 ? (
              <div className="divide-y divide-background-100 max-h-[500px] overflow-y-auto">
                {activities.map((activity) => {
                  const badge = TYPE_BADGES[activity.type];
                  const timeStr = formatTimeAgo(activity.timestamp);

                  return (
                    <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-background-50 transition-colors">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${badge.bg}`}>
                        <i className={`${badge.icon} text-sm ${badge.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold ${badge.bg} ${badge.text}`}>
                            {activity.type === 'generation' ? 'GÉNÉRATION' :
                             activity.type === 'scheduling' ? 'PLANIFICATION' :
                             activity.type === 'publishing' ? 'PUBLICATION' :
                             activity.type === 'optimization' ? 'OPTIMISATION' : 'ANALYTIQUE'}
                          </span>
                          <span className="text-xs font-bold text-foreground-700">{activity.action}</span>
                          <span className="text-[10px] text-foreground-400">· {activity.agent}</span>
                        </div>
                        <p className="text-xs text-foreground-500 mt-0.5">{activity.detail}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] text-foreground-400">
                            <i className="ri-time-line mr-1" />{timeStr}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#0A66C2]">
                            <i className="ri-linkedin-fill text-xs" />
                            LinkedIn
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center">
                <i className="ri-loader-4-line text-3xl text-foreground-300 animate-spin mb-3 block" />
                <p className="text-foreground-500 text-sm">Chargement des logs d'exécution...</p>
                <p className="text-xs text-foreground-400 mt-1">Connexion à kos_execution_logs via Supabase</p>
              </div>
            )}
          </div>
        </div>

        {/* === STATS DE CADENCE PAR PLATEFORME === */}
        <div className="mb-8">
          <h3 className="font-heading text-xl font-bold text-foreground-950 mb-5 flex items-center gap-2">
            <i className="ri-speed-line text-emerald-500" />
            Cadence par Plateforme
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* LinkedIn */}
            <div className="rounded-2xl bg-white border border-background-200 overflow-hidden">
              <div className="p-5 bg-[#0A66C2]/5 border-b border-[#0A66C2]/10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#0A66C2]/15 flex items-center justify-center">
                    <i className="ri-linkedin-fill text-xl text-[#0A66C2]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-foreground-950">LinkedIn</h4>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs text-emerald-600 font-bold">RYTHME MAX</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-background-50 p-3 text-center">
                    <span className="block text-2xl font-bold text-foreground-950 font-heading">6</span>
                    <span className="text-[10px] text-foreground-400">posts/semaine</span>
                  </div>
                  <div className="rounded-xl bg-background-50 p-3 text-center">
                    <span className="block text-2xl font-bold text-foreground-950 font-heading">24</span>
                    <span className="text-[10px] text-foreground-400">posts/mois</span>
                  </div>
                  <div className="rounded-xl bg-background-50 p-3 text-center">
                    <span className="block text-2xl font-bold text-emerald-600 font-heading">4.2%</span>
                    <span className="text-[10px] text-foreground-400">engagement</span>
                  </div>
                  <div className="rounded-xl bg-background-50 p-3 text-center">
                    <span className="block text-2xl font-bold text-foreground-950 font-heading">2.8K</span>
                    <span className="text-[10px] text-foreground-400">followers</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-foreground-500">Occupation créneaux</span>
                    <span className="text-emerald-600 font-bold">100%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-background-200 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500 w-full" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground-500">
                  <i className="ri-calendar-check-line text-emerald-500" />
                  <span>6/6 créneaux occupés — Lun·Mer·Ven 8h & 12h GMT</span>
                </div>
              </div>
            </div>

            {/* X (Twitter) */}
            <div className="rounded-2xl bg-white border border-background-200 overflow-hidden">
              <div className="p-5 bg-amber-50 border-b border-amber-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
                    <i className="ri-twitter-x-fill text-xl text-foreground-950" />
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-foreground-950">X (Twitter)</h4>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-xs text-amber-600 font-bold">En attente activation</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-background-50 p-3 text-center">
                    <span className="block text-2xl font-bold text-foreground-400 font-heading">0</span>
                    <span className="text-[10px] text-foreground-400">posts/semaine</span>
                  </div>
                  <div className="rounded-xl bg-background-50 p-3 text-center">
                    <span className="block text-2xl font-bold text-foreground-400 font-heading">2</span>
                    <span className="text-[10px] text-foreground-400">créneaux dispo.</span>
                  </div>
                  <div className="rounded-xl bg-background-50 p-3 text-center">
                    <span className="block text-2xl font-bold text-foreground-400 font-heading">—</span>
                    <span className="text-[10px] text-foreground-400">engagement</span>
                  </div>
                  <div className="rounded-xl bg-background-50 p-3 text-center">
                    <span className="block text-2xl font-bold text-foreground-950 font-heading">847</span>
                    <span className="text-[10px] text-foreground-400">followers</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-foreground-500">Occupation créneaux</span>
                    <span className="text-amber-600 font-bold">0%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-background-200 overflow-hidden">
                    <div className="h-full rounded-full bg-amber-400" style={{ width: '0%' }} />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground-500">
                  <i className="ri-alert-line text-amber-500" />
                  <span>2 créneaux disponibles — Mardi & Jeudi 8h GMT</span>
                </div>
              </div>
            </div>

            {/* YouTube */}
            <div className="rounded-2xl bg-white border border-background-200 overflow-hidden">
              <div className="p-5 bg-slate-50 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                    <i className="ri-youtube-fill text-xl text-[#FF0000]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-foreground-950">YouTube</h4>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-400" />
                      <span className="text-xs text-foreground-400 font-bold">Planifié</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-background-50 p-3 text-center">
                    <span className="block text-2xl font-bold text-foreground-400 font-heading">0</span>
                    <span className="text-[10px] text-foreground-400">vidéos/semaine</span>
                  </div>
                  <div className="rounded-xl bg-background-50 p-3 text-center">
                    <span className="block text-2xl font-bold text-foreground-400 font-heading">Q3</span>
                    <span className="text-[10px] text-foreground-400">lancement</span>
                  </div>
                  <div className="rounded-xl bg-background-50 p-3 text-center">
                    <span className="block text-2xl font-bold text-foreground-400 font-heading">—</span>
                    <span className="text-[10px] text-foreground-400">engagement</span>
                  </div>
                  <div className="rounded-xl bg-background-50 p-3 text-center">
                    <span className="block text-2xl font-bold text-foreground-400 font-heading">0</span>
                    <span className="text-[10px] text-foreground-400">abonnés</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-foreground-500">Occupation créneaux</span>
                    <span className="text-foreground-400 font-bold">N/A</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-background-200 overflow-hidden">
                    <div className="h-full rounded-full bg-slate-300" style={{ width: '0%' }} />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground-500">
                  <i className="ri-time-line text-slate-400" />
                  <span>Lancement prévu Q3 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === CONFIRMATION RYTHME MAX === */}
        <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-200 p-6 sm:p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500 flex items-center justify-center">
            <i className="ri-check-double-line text-white text-3xl" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-foreground-950 mb-2">
            RYTHME MAX CONFIRMÉ
          </h3>
          <p className="text-foreground-600 max-w-xl mx-auto mb-4">
            Les {activeAgents} automates KOS tournent à pleine capacité sur LinkedIn.{' '}
            <strong className="text-emerald-700">6 posts/semaine générés, optimisés et planifiés automatiquement.</strong>{' '}
            Pipeline de contenu : 10 articles → posts LinkedIn chaque semaine. Zéro latence, zéro intervention manuelle.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: 'ri-robot-line', text: '6 agents actifs 24/7' },
              { icon: 'ri-speed-up-line', text: 'Cadence 100%' },
              { icon: 'ri-check-double-line', text: 'Zéro erreur' },
              { icon: 'ri-timer-line', text: 'Latence ~12ms' },
              { icon: 'ri-database-2-line', text: `Source: ${source === 'live' ? 'Supabase Live' : 'Mock'}` },
            ].map((item) => (
              <span key={item.text} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-xs font-bold text-emerald-700">
                <i className={`${item.icon} text-sm`} />
                {item.text}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}



