import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import {
  GROWTH_AGENTS,
  ORCHESTRATOR_GLOBAL_KPIS,
  GROWTH_WORKFLOWS,
  ORCHESTRATOR_STATS,
  type GrowthAgent,
} from '@/mocks/kosAutonomousGrowthOrchestrator';

const CATEGORY_LABELS: Record<string, string> = {
  leadership: 'Leadership',
  marketing: 'Marketing',
  social: 'Social Media',
  llm: 'LLMO',
  sales: 'Sales',
};

const CATEGORY_COLORS: Record<string, string> = {
  leadership: 'bg-blue-950 text-blue-300 border-blue-700',
  marketing: 'bg-purple-950 text-purple-300 border-purple-700',
  social: 'bg-cyan-950 text-cyan-300 border-cyan-700',
  llm: 'bg-emerald-950 text-emerald-300 border-emerald-700',
  sales: 'bg-amber-950 text-amber-300 border-amber-700',
};

const STATUS_COLORS: Record<string, string> = {
  active: 'text-emerald-400 bg-emerald-950 border-emerald-700',
  initializing: 'text-amber-400 bg-amber-950 border-amber-700',
  standby: 'text-foreground-950/40 bg-background-200 border-background-300',
};

const STATUS_LABELS: Record<string, string> = {
  active: 'Actif',
  initializing: 'Initialisation',
  standby: 'Standby',
};

function AgentCard({ agent, onSelect }: { agent: GrowthAgent; onSelect: (a: GrowthAgent) => void }) {
  return (
    <div
      onClick={() => onSelect(agent)}
      className="group rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 border bg-background-100 border-primary-400/8 hover:border-primary-400/20 flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ backgroundColor: `${agent.color}18`, border: `1px solid ${agent.color}30` }}
          >
            <i className={`${agent.icon} text-lg`} style={{ color: agent.color }} />
          </div>
          <div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${CATEGORY_COLORS[agent.category]}`}>
              {agent.code}
            </span>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_COLORS[agent.status]}`}>
          {STATUS_LABELS[agent.status]}
        </span>
      </div>

      {/* Name + Role */}
      <h3 className="text-sm font-bold mb-1 text-foreground-950 leading-snug group-hover:text-primary-600 transition-colors">{agent.name}</h3>
      <p className="text-xs text-foreground-950/50 leading-relaxed mb-4 flex-1 line-clamp-2">{agent.role}</p>

      {/* Autonomy */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-semibold text-foreground-950/50">Autonomie</span>
          <span className="text-xs font-bold" style={{ color: agent.color }}>{agent.autonomyLevel}%</span>
        </div>
        <div className="h-1.5 bg-background-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${agent.autonomyLevel}%`, backgroundColor: agent.color }}
          />
        </div>
      </div>

      {/* Mini KPIs */}
      <div className="grid grid-cols-2 gap-2">
        {agent.kpis.slice(0, 2).map((kpi, i) => (
          <div key={i} className="rounded-lg px-2.5 py-1.5 bg-background-50 border border-primary-400/5">
            <div className="text-[10px] text-foreground-950/40 mb-0.5">{kpi.label}</div>
            <div className="text-sm font-bold text-foreground-950">{kpi.value} <span className="text-[9px] font-normal text-foreground-950/35">{kpi.unit}</span></div>
          </div>
        ))}
      </div>

      {/* Tasks */}
      <div className="mt-3 pt-3 border-t border-primary-400/5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-foreground-950/45">
          <i className="ri-check-double-line text-primary-400 text-sm" />
          <span>{agent.tasksCompleted} tâches réalisées</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-foreground-950/35">{agent.tasksActive} actives</span>
        </div>
      </div>
    </div>
  );
}

function AgentDetailModal({ agent, onClose }: { agent: GrowthAgent; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl shadow-2xl bg-background-50"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-background-50/95 backdrop-blur-md border-b border-primary-400/8 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-xl"
              style={{ backgroundColor: `${agent.color}18`, border: `1px solid ${agent.color}30` }}
            >
              <i className={`${agent.icon} text-lg`} style={{ color: agent.color }} />
            </div>
            <div>
              <div className="text-xs font-bold text-primary-400 uppercase tracking-wider">{agent.code} — {CATEGORY_LABELS[agent.category]}</div>
              <div className="text-sm font-bold text-foreground-950">{agent.name}</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-200 transition-colors cursor-pointer">
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Role */}
          <div className="p-4 rounded-xl bg-primary-400/4 border border-primary-400/8">
            <div className="text-xs font-bold uppercase tracking-wider text-primary-400 mb-1">Mission</div>
            <p className="text-sm text-foreground-950/70 leading-relaxed">{agent.role}</p>
          </div>

          {/* KPIs */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-foreground-950/40 mb-3">KPIs</div>
            <div className="grid grid-cols-2 gap-3">
              {agent.kpis.map((kpi, i) => (
                <div key={i} className="rounded-xl p-3 bg-background-100 border border-primary-400/6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-foreground-950/45">{kpi.label}</span>
                    <i className={`${kpi.trend === 'up' ? 'ri-arrow-up-line text-emerald-400' : kpi.trend === 'down' ? 'ri-arrow-down-line text-amber-400' : 'ri-arrow-right-line text-foreground-950/30'} text-xs`} />
                  </div>
                  <div className="text-lg font-bold text-foreground-950">{kpi.value} <span className="text-xs font-normal text-foreground-950/35">{kpi.unit}</span></div>
                </div>
              ))}
            </div>
          </div>

          {/* Autonomy bar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-foreground-950/50">Niveau d'autonomie</span>
              <span className="text-sm font-bold" style={{ color: agent.color }}>{agent.autonomyLevel}/100</span>
            </div>
            <div className="h-2 bg-background-200 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${agent.autonomyLevel}%`, backgroundColor: agent.color }} />
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-foreground-950/40 mb-3">Capacités activées</div>
            <div className="space-y-2">
              {agent.capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: `${agent.color}15` }}>
                    <i className="ri-check-line text-xs" style={{ color: agent.color }} />
                  </div>
                  <span className="text-sm text-foreground-950/65">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next action */}
          <div className="p-4 rounded-xl border bg-accent-400/4 border-accent-400/10">
            <div className="text-xs font-bold uppercase tracking-wider text-accent-500 mb-1">Prochaine action</div>
            <p className="text-sm font-semibold text-foreground-950">{agent.nextAction}</p>
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-foreground-950/35 pt-2 border-t border-primary-400/5">
            <span>Activé le {new Date(agent.activationDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            <span>{agent.tasksCompleted} tâches réalisées — {agent.tasksActive} actives</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const WORKFLOW_STATUS_COLORS: Record<string, string> = {
  running: 'text-emerald-400 bg-emerald-950/50 border-emerald-700',
  scheduled: 'text-cyan-400 bg-cyan-950/50 border-cyan-700',
  completed: 'text-primary-400 bg-primary-950/50 border-primary-700',
};

const WORKFLOW_STATUS_LABELS: Record<string, string> = {
  running: 'En cours',
  scheduled: 'Planifié',
  completed: 'Terminé',
};

export default function KOSGrowthOrchestratorPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedAgent, setSelectedAgent] = useState<GrowthAgent | null>(null);
  const [activeTab, setActiveTab] = useState<'agents' | 'workflows'>('agents');

  const categories = ['all', 'leadership', 'marketing', 'social', 'llm', 'sales'];

  const filtered = activeFilter === 'all'
    ? GROWTH_AGENTS
    : GROWTH_AGENTS.filter(a => a.category === activeFilter);

  return (
    <KOSHubLayout hubId={91}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-400/8 border border-primary-400/15">
                  <i className="ri-robot-2-line text-lg text-primary-400" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-primary-400">{ORCHESTRATOR_STATS.version}</div>
                  <div className="text-xs text-foreground-950/40">Activé le {new Date(ORCHESTRATOR_STATS.activationDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground-950 mb-2">KOS Autonomous Growth Orchestrator</h1>
              <p className="text-sm text-foreground-950/55 max-w-3xl leading-relaxed">{ORCHESTRATOR_STATS.missionStatement}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/30 border border-emerald-700/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-bold text-emerald-400">{ORCHESTRATOR_STATS.totalAgentsActive} Agents Actifs</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-primary-400/5 border border-primary-400/10">
                <span className="text-sm font-bold text-primary-400">{ORCHESTRATOR_STATS.globalAutonomyScore}% Autonomie</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {ORCHESTRATOR_GLOBAL_KPIS.map(kpi => (
            <div key={kpi.id} className="rounded-xl p-4 bg-background-100 border border-primary-400/6 text-center">
              <i className={`${kpi.icon} text-xl mb-2 block text-primary-400`} />
              <div className="text-lg font-bold text-foreground-950 leading-none mb-1">{kpi.value} <span className="text-[10px] font-normal text-foreground-950/35">{kpi.unit}</span></div>
              <div className="text-[10px] text-foreground-950/45 leading-tight">{kpi.label}</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <i className="ri-arrow-up-line text-[10px] text-emerald-400" />
                <span className="text-[10px] text-emerald-400">Nouveau</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-background-100 border border-primary-400/6 mb-6 w-fit">
          {(['agents', 'workflows'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === tab ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-950/50 hover:text-foreground-950/70'}`}
            >
              {tab === 'agents' ? `9 Agents (${GROWTH_AGENTS.length})` : `Workflows (${GROWTH_WORKFLOWS.length})`}
            </button>
          ))}
        </div>

        {/* ── AGENTS TAB ── */}
        {activeTab === 'agents' && (
          <>
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeFilter === cat ? 'bg-primary-500 text-white' : 'bg-background-100 border border-primary-400/8 text-foreground-950/55 hover:border-primary-400/20'}`}
                >
                  {cat === 'all' ? 'Tous (9)' : CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            {/* Agents grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(agent => (
                <AgentCard key={agent.id} agent={agent} onSelect={setSelectedAgent} />
              ))}
            </div>
          </>
        )}

        {/* ── WORKFLOWS TAB ── */}
        {activeTab === 'workflows' && (
          <div className="space-y-4">
            {GROWTH_WORKFLOWS.map((wf, i) => (
              <div key={wf.id} className="rounded-2xl p-5 bg-background-100 border border-primary-400/6 hover:border-primary-400/12 transition-all">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-400/6 border border-primary-400/10 flex-shrink-0 text-sm font-bold text-primary-400">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-sm font-bold text-foreground-950">{wf.name}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${WORKFLOW_STATUS_COLORS[wf.status]}`}>
                          {WORKFLOW_STATUS_LABELS[wf.status]}
                        </span>
                      </div>
                      <p className="text-xs text-foreground-950/55 leading-relaxed mb-3">{wf.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {wf.agents.map(code => (
                          <span key={code} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-400/5 text-primary-500 border border-primary-400/10">{code}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {[
                          { label: 'Déclencheur', value: wf.trigger, icon: 'ri-flashlight-line' },
                          { label: 'Fréquence', value: wf.frequency, icon: 'ri-repeat-line' },
                          { label: 'Dernier run', value: wf.lastRun ? new Date(wf.lastRun).toLocaleDateString('fr-FR') : '—', icon: 'ri-history-line' },
                          { label: 'Livrable', value: wf.outputType, icon: 'ri-file-list-3-line' },
                        ].map((item, ii) => (
                          <div key={ii} className="rounded-lg px-2.5 py-1.5 bg-background-50 border border-primary-400/5">
                            <div className="flex items-center gap-1 mb-0.5">
                              <i className={`${item.icon} text-[10px] text-primary-400`} />
                              <span className="text-[9px] text-foreground-950/40 font-semibold uppercase tracking-wider">{item.label}</span>
                            </div>
                            <p className="text-[10px] text-foreground-950/65 font-medium leading-tight">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mission Stats footer */}
        <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-primary-950/30 to-accent-950/30 border border-primary-400/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Tâches totales réalisées', value: ORCHESTRATOR_STATS.totalTasksCompleted.toLocaleString('fr-FR'), icon: 'ri-check-double-line' },
              { label: 'Tâches actives maintenant', value: ORCHESTRATOR_STATS.totalTasksActive, icon: 'ri-loader-4-line' },
              { label: 'Capacités activées', value: ORCHESTRATOR_STATS.totalCapabilities, icon: 'ri-cpu-line' },
              { label: 'Workflows automatisés', value: ORCHESTRATOR_STATS.totalWorkflows, icon: 'ri-git-branch-line' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-400/8">
                    <i className={`${stat.icon} text-sm text-primary-400`} />
                  </div>
                </div>
                <div className="text-xl font-bold text-foreground-950">{stat.value}</div>
                <div className="text-xs text-foreground-950/45">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <AgentDetailModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}
    </KOSHubLayout>
  );
}