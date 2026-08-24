import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useKOS120Upg2Execution } from '@/hooks/useKOS120Upg2Execution';

type TabId = 'tasks' | 'timeline' | 'agents' | 'risks';

interface TabInfo {
  id: TabId;
  label: string;
  icon: string;
  color: 'primary' | 'accent' | 'secondary';
}

const tabs: TabInfo[] = [
  { id: 'tasks', label: 'Tâches', icon: 'ri-list-check-3', color: 'primary' },
  { id: 'timeline', label: 'Timeline', icon: 'ri-timeline-view', color: 'accent' },
  { id: 'agents', label: 'Agents', icon: 'ri-robot-3-line', color: 'secondary' },
  { id: 'risks', label: 'Risques', icon: 'ri-alert-line', color: 'primary' },
];

function CircularGauge({ value, size = 48, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : 'stroke-primary-500';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <span className="absolute text-xs font-bold text-foreground-950">{value}%</span>
    </div>
  );
}

function ProgressBar({ value, max = 100, color = 'primary', showPct = true }: { value: number; max?: number; color?: string; showPct?: boolean }) {
  const pct = Math.round((value / max) * 100);
  const barColor = color === 'accent' ? 'bg-accent-500' : color === 'secondary' ? 'bg-secondary-500' : 'bg-primary-500';
  return (
    <div className="w-full flex items-center gap-2">
      <div className="flex-1 h-2 bg-background-200 rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
      {showPct && <span className="text-xs font-bold text-foreground-950 w-9 text-right">{pct}%</span>}
    </div>
  );
}

function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const bgMap: Record<string, string> = {
    CRITIQUE: 'bg-red-100 text-red-700 border-red-200',
    HAUTE: 'bg-amber-100 text-amber-700 border-amber-200',
    MOYENNE: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    FAIBLE: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    in_progress: 'bg-accent-100 text-accent-700 border-accent-200',
    pending: 'bg-slate-100 text-slate-600 border-slate-200',
    completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    ÉLEVÉ: 'bg-red-100 text-red-700 border-red-200',
    MOYEN: 'bg-amber-100 text-amber-700 border-amber-200',
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    milestone: 'bg-primary-100 text-primary-700 border-primary-200',
    progress: 'bg-accent-100 text-accent-700 border-accent-200',
    incident: 'bg-red-100 text-red-700 border-red-200',
    monitored: 'bg-accent-100 text-accent-700 border-accent-200',
    mitigated: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    accepted: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    current: 'bg-primary-100 text-primary-700 border-primary-200',
    upcoming: 'bg-slate-100 text-slate-600 border-slate-200',
  };
  const classes = bgMap[variant] || 'bg-background-200 text-foreground-700 border-background-200';
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${classes}`}>{label}</span>;
}

export default function KOS120Upg2ExecutionPage() {
  const { overview, tasks, timeline, agents, risks, stats, loading, error } = useKOS120Upg2Execution();
  const [activeTab, setActiveTab] = useState<TabId>('tasks');
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  if (loading) {
    return (
      <hubLayout hubId={86} activeTab="tasks" tabLabel="Tâches">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-foreground-600 text-sm">Chargement du cockpit UPG-2...</p>
        </div>
      </hubLayout>
    );
  }

  if (error) {
    return (
      <hubLayout hubId={86} activeTab="tasks" tabLabel="Tâches">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <i className="ri-error-warning-line text-red-600 text-xl"></i>
          </div>
          <p className="text-foreground-950 font-semibold mb-2">Erreur de chargement</p>
          <p className="text-foreground-600 text-sm">{error}</p>
        </div>
      </hubLayout>
    );
  }

  return (
    <hubLayout hubId={86} activeTab={activeTab} tabLabel={tabs.find(t => t.id === activeTab)?.label}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">KOS UPG-2 Cockpit</span>
            <span className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse"></span>
              Phase Active — Jour {overview.daysElapsed}
            </span>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Mode MOCK</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">KOS UPG-2 — Expansion Intelligence&trade;</h1>
          <div className="flex flex-wrap items-center gap-3 mt-3 mb-1">
            <span className="inline-flex items-center gap-1.5 text-xs bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full font-medium">
              <i className="ri-brain-2-line text-sm"></i>
              Knowledge Graph Universal&trade;
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs bg-accent-100 text-accent-700 px-2.5 py-1 rounded-full font-medium">
              <i className="ri-database-2-line text-sm"></i>
              {stats.docsIngested}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs bg-secondary-100 text-secondary-700 px-2.5 py-1 rounded-full font-medium">
              <i className="ri-link-m text-sm"></i>
              {stats.sourcesConnected}
            </span>
          </div>
          <p className="text-foreground-600 mt-3 max-w-4xl text-sm md:text-base leading-relaxed">
            {overview.commanderIntent}
          </p>
        </div>

        {/* Global Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Progression</p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-foreground-950">{overview.progressPercent}%</span>
              <CircularGauge value={overview.progressPercent} size={36} strokeWidth={3} color="accent" />
            </div>
            <div className="text-[10px] text-foreground-400">Sprint Velocity {overview.sprintVelocity}/sem.</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Tâches</p>
            <span className="text-xl font-bold text-foreground-950">{stats.tasksInProgress}<span className="text-xs text-foreground-500 font-normal">/6 en cours</span></span>
            <div className="text-[10px] text-emerald-600">0 bloquée</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Sous-tâches</p>
            <span className="text-xl font-bold text-foreground-950">{stats.subTasksInProgress}<span className="text-xs text-foreground-500 font-normal">/26 actives</span></span>
            <div className="text-[10px] text-foreground-400">22 en cours</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Agents</p>
            <span className="text-xl font-bold text-foreground-950">{stats.agentsActive}<span className="text-xs text-foreground-500 font-normal">/6 actifs</span></span>
            <div className="text-[10px] text-emerald-600">Tous opérationnels</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Risques</p>
            <span className="text-xl font-bold text-foreground-950">{stats.risksTotal}<span className="text-xs text-foreground-500 font-normal"> actifs</span></span>
            <div className="text-[10px] text-emerald-600">{stats.risksMitigated} mitigé</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Fin estimée</p>
            <span className="text-xl font-bold text-foreground-950">{timeline.endDate}</span>
            <div className="text-[10px] text-emerald-600">{stats.estimatedCompletion}</div>
          </div>
        </div>

        {/* Secondary KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
            <CircularGauge value={stats.docsPct} size={42} strokeWidth={4} color="primary" />
            <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Documents</p><p className="text-sm font-bold text-foreground-950">{stats.docsIngested}</p></div>
          </div>
          <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
            <CircularGauge value={stats.embeddingsPct} size={42} strokeWidth={4} color="accent" />
            <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Embeddings</p><p className="text-sm font-bold text-foreground-950">{stats.embeddingsGenerated}</p></div>
          </div>
          <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
            <CircularGauge value={stats.sourcesPct} size={42} strokeWidth={4} color="secondary" />
            <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Sources</p><p className="text-sm font-bold text-foreground-950">{stats.sourcesConnected}</p></div>
          </div>
          <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
            <CircularGauge value={stats.sprintVelocity * 20} size={42} strokeWidth={4} color="primary" />
            <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Vélocité</p><p className="text-sm font-bold text-foreground-950">{stats.sprintVelocity} tâches/sem.</p></div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${
                activeTab === t.id
                  ? t.color === 'accent' ? 'bg-accent-500 text-background-50 border-accent-500' : t.color === 'secondary' ? 'bg-secondary-500 text-background-50 border-secondary-500' : 'bg-primary-500 text-background-50 border-primary-500'
                  : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'
              }`}
            >
              <i className={`${t.icon} text-sm`}></i>
              {t.label}
            </button>
          ))}
        </div>

        {/* ============================================ */}
        {/* ONGLET 1 — TÂCHES */}
        {/* ============================================ */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {tasks.map(task => {
              const isExpanded = expandedTask === task.id;
              return (
                <div key={task.id} className={`bg-background-50 border rounded-lg overflow-hidden transition-all ${
                  task.priority === 'CRITIQUE' ? 'border-red-200/60' : task.priority === 'HAUTE' ? 'border-amber-200/60' : 'border-background-200/60'
                }`}>
                  {/* Task Header */}
                  <div
                    onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                    className="p-4 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        task.priority === 'CRITIQUE' ? 'bg-red-100 text-red-700' : task.priority === 'HAUTE' ? 'bg-amber-100 text-amber-700' : 'bg-secondary-100 text-secondary-700'
                      }`}>
                        <i className={`${task.axe.includes('Knowledge') ? 'ri-brain-2-line' : 'ri-stack-line'} text-lg`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm font-semibold text-foreground-950">{task.name}</span>
                          <Badge label={task.priority} variant={task.priority} />
                          <Badge label={task.status === 'in_progress' ? 'En cours' : task.status} variant={task.status} />
                          <span className="text-[10px] text-foreground-400 ml-auto">{task.effort}</span>
                        </div>
                        <p className="text-xs text-foreground-600 line-clamp-2 leading-relaxed mb-2">{task.description}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <ProgressBar value={task.progress} color={task.priority === 'CRITIQUE' ? 'accent' : 'primary'} />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5 text-[10px] text-foreground-500">
                          <span className="flex items-center gap-1"><i className="ri-robot-3-line text-xs"></i>{task.agent}</span>
                          <span className="flex items-center gap-1 ml-auto"><i className="ri-arrow-down-s-line text-xs"></i>{isExpanded ? 'Réduire' : 'Détails'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Task Expanded Detail */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-background-200/50 pt-4 ml-14 space-y-4">
                      {/* Sous-tâches */}
                      <div>
                        <p className="text-xs font-semibold text-foreground-950 mb-2">Sous-tâches ({task.subTasks.length})</p>
                        <div className="space-y-1.5">
                          {task.subTasks.map(st => (
                            <div key={st.id} className="flex items-center gap-2 bg-background-100 rounded-md px-3 py-2">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                st.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : st.status === 'in_progress' ? 'bg-accent-100 text-accent-600' : 'bg-slate-100 text-slate-400'
                              }`}>
                                <i className={`${st.status === 'completed' ? 'ri-check-line' : st.status === 'in_progress' ? 'ri-loader-4-line animate-spin' : 'ri-time-line'} text-xs`}></i>
                              </div>
                              <span className="text-xs text-foreground-700 flex-1">{st.name}</span>
                              <span className="text-[10px] font-bold text-foreground-500">{st.progress}%</span>
                              <div className="w-16 h-1.5 bg-background-200 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${st.progress >= 50 ? 'bg-emerald-500' : 'bg-accent-500'}`} style={{ width: `${st.progress}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Métriques */}
                      <div>
                        <p className="text-xs font-semibold text-foreground-950 mb-2">Métriques Clés</p>
                        <div className="grid grid-cols-3 gap-2">
                          {task.metrics.map((m, i) => (
                            <div key={i} className="bg-background-100 rounded-lg p-3 text-center">
                              <p className="text-lg font-bold text-foreground-950">{m.current}</p>
                              <p className="text-[9px] text-foreground-500">{m.name}</p>
                              <div className="mt-1">
                                <ProgressBar value={m.pct} color="accent" showPct={false} />
                              </div>
                              <p className="text-[9px] text-foreground-400 mt-0.5">Cible : {m.target} {m.unit}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Logs */}
                      <div>
                        <p className="text-xs font-semibold text-foreground-950 mb-2">Journal ({task.logs.length} entrées)</p>
                        <div className="space-y-1.5">
                          {task.logs.map((log, i) => (
                            <div key={i} className="flex items-start gap-2 bg-background-50 rounded-md px-2.5 py-1.5 border border-background-200/40">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                log.type === 'milestone' ? 'bg-primary-100 text-primary-600' : log.type === 'incident' ? 'bg-red-100 text-red-600' : 'bg-accent-100 text-accent-600'
                              }`}>
                                <i className={`${log.type === 'milestone' ? 'ri-flag-line' : log.type === 'incident' ? 'ri-alert-line' : 'ri-arrow-right-circle-line'} text-xs`}></i>
                              </div>
                              <div>
                                <span className="text-[10px] text-foreground-400">{log.date}</span>
                                <p className="text-xs text-foreground-700">{log.event}</p>
                              </div>
                              <Badge label={log.type} variant={log.type} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Critical Path */}
            <div className="bg-amber-50/50 border border-amber-200/60 rounded-lg p-4 mt-6">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-git-branch-line text-amber-600"></i>
                <span className="text-xs font-semibold text-foreground-950">Chemin Critique</span>
                <Badge label={stats.criticalPath.status} variant="active" />
                <Badge label={`Risque ${stats.criticalPath.riskLevel}`} variant="monitored" />
              </div>
              <p className="text-xs text-foreground-700">{stats.criticalPath.path}</p>
              <div className="flex gap-3 mt-2 text-[10px] text-foreground-500">
                <span className="flex items-center gap-1"><i className="ri-calendar-check-line"></i>Fin estimée : {stats.criticalPath.estimatedEnd}</span>
                <span className="flex items-center gap-1"><i className="ri-restart-line text-emerald-600"></i>Auto-recoveries : {stats.criticalPath.autoRecoveries}</span>
                <span className="flex items-center gap-1"><i className="ri-shield-flash-line text-amber-500"></i>Circuit breakers : {stats.criticalPath.circuitBreakersTriggered}</span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* ONGLET 2 — TIMELINE */}
        {/* ============================================ */}
        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-calendar-line text-accent-600"></i>
                <span className="text-sm font-semibold text-foreground-950">Roadmap UPG-2 — {timeline.startDate} → {timeline.endDate}</span>
                <span className="text-xs text-foreground-500 ml-auto">{timeline.weeksTotal} semaines &bull; Semaine {timeline.currentWeek}/8</span>
              </div>
              <div className="relative">
                {/* Progress bar background */}
                <div className="h-2 bg-background-200 rounded-full mb-6">
                  <div className="h-full bg-accent-500 rounded-full transition-all duration-700" style={{ width: '25%' }}></div>
                </div>
                {/* Milestones */}
                <div className="space-y-0">
                  {timeline.milestones.map((ms, i) => {
                    const isCompleted = ms.status === 'completed';
                    const isCurrent = ms.status === 'current';
                    const isUpcoming = ms.status === 'upcoming';
                    const leftPos = (i / (timeline.milestones.length - 1)) * 100;
                    return (
                      <div key={i} className="relative flex items-start gap-3 pb-6 last:pb-0">
                        {/* Connector line */}
                        {i < timeline.milestones.length - 1 && (
                          <div className="absolute left-3 top-6 w-0.5 h-full bg-background-200" style={{ left: '12px' }}></div>
                        )}
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 z-10 ${
                          isCompleted ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-accent-500 text-white ring-4 ring-accent-200' : 'bg-background-200 text-foreground-400'
                        }`}>
                          <i className={`${isCompleted ? 'ri-check-line' : isCurrent ? 'ri-play-fill' : 'ri-time-line'} text-xs`}></i>
                        </div>
                        <div className={`flex-1 min-w-0 bg-background-100 rounded-lg p-3 ${
                          isCurrent ? 'border border-accent-300/60 ring-1 ring-accent-200/50' : ''
                        }`}>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-xs font-semibold text-foreground-950">{ms.label}</span>
                            <span className="text-[10px] text-foreground-400">{ms.date}</span>
                            <Badge label={isCompleted ? 'Terminé' : isCurrent ? 'En cours' : 'À venir'} variant={ms.status} />
                          </div>
                          {isCurrent && (
                            <div className="flex items-center gap-1 text-xs text-accent-600 mt-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse"></span>
                              Nous sommes ici — Semaine 2
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* ONGLET 3 — AGENTS */}
        {/* ============================================ */}
        {activeTab === 'agents' && (
          <div className="space-y-4">
            {agents.map(agent => (
              <div key={agent.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                    agent.performance >= 90 ? 'bg-primary-100 text-primary-700' : 'bg-accent-100 text-accent-700'
                  }`}>
                    <i className={`${agent.icon} text-xl`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-sm font-semibold text-foreground-950">{agent.name}</span>
                      <Badge label={agent.status === 'active' ? 'Actif' : agent.status} variant={agent.status} />
                      <span className="text-[10px] text-foreground-400 ml-auto">Charge {agent.load}%</span>
                    </div>
                    <p className="text-xs text-foreground-600 mb-2">{agent.description}</p>
                    <div className="flex items-center gap-2 text-[10px] text-foreground-500 mb-2">
                      <span className="flex items-center gap-1"><i className="ri-user-star-line text-xs"></i>{agent.role}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {agent.tasks.map((t, i) => (
                        <span key={i} className="text-[10px] bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full border border-primary-200">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <ProgressBar value={agent.performance} color={agent.performance >= 90 ? 'primary' : 'accent'} />
                      </div>
                      <span className="text-xs font-bold text-foreground-950">{agent.performance}%</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <CircularGauge value={agent.performance} size={52} strokeWidth={4} color={agent.performance >= 90 ? 'primary' : 'accent'} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* ONGLET 4 — RISQUES */}
        {/* ============================================ */}
        {activeTab === 'risks' && (
          <div className="space-y-4">
            {/* Risk Matrix Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="bg-red-50/50 border border-red-200/60 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-red-700">{risks.filter(r => r.severity === 'ÉLEVÉ').length}</p>
                <p className="text-[10px] uppercase text-red-600">Élevés</p>
              </div>
              <div className="bg-amber-50/50 border border-amber-200/60 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-amber-700">{risks.filter(r => r.severity === 'MOYEN').length}</p>
                <p className="text-[10px] uppercase text-amber-600">Moyens</p>
              </div>
              <div className="bg-emerald-50/50 border border-emerald-200/60 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-emerald-700">{risks.filter(r => r.status === 'mitigated').length}</p>
                <p className="text-[10px] uppercase text-emerald-600">Mitigés</p>
              </div>
              <div className="bg-secondary-50/50 border border-secondary-200/60 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-secondary-700">{risks.filter(r => r.status === 'accepted').length}</p>
                <p className="text-[10px] uppercase text-secondary-600">Acceptés</p>
              </div>
            </div>

            {risks.map(risk => (
              <div key={risk.id} className={`bg-background-50 border rounded-lg p-4 ${
                risk.severity === 'ÉLEVÉ' ? 'border-red-200/60' : risk.severity === 'MOYEN' ? 'border-amber-200/60' : 'border-background-200/60'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      risk.severity === 'ÉLEVÉ' ? 'bg-red-100 text-red-600' : risk.severity === 'MOYEN' ? 'bg-amber-100 text-amber-600' : 'bg-secondary-100 text-secondary-600'
                    }`}>
                      <i className="ri-alert-line"></i>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-foreground-950">{risk.name}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Badge label={risk.severity} variant={risk.severity} />
                        <Badge label={risk.status === 'mitigated' ? 'Mitigé' : risk.status === 'monitored' ? 'Surveillé' : 'Accepté'} variant={risk.status} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-right flex-shrink-0">
                    <div>
                      <p className="text-[10px] text-foreground-500">Probabilité</p>
                      <p className="text-sm font-bold text-foreground-950">{risk.probability}%</p>
                    </div>
                    <span className="text-foreground-400">×</span>
                    <div>
                      <p className="text-[10px] text-foreground-500">Impact</p>
                      <p className="text-sm font-bold text-foreground-950">{risk.impact}/10</p>
                    </div>
                    <div className="ml-3">
                      <p className="text-[10px] text-foreground-500">Score</p>
                      <p className={`text-lg font-bold ${risk.probability * risk.impact > 300 ? 'text-red-600' : risk.probability * risk.impact > 150 ? 'text-amber-600' : 'text-emerald-600'}`}>{risk.probability * risk.impact}</p>
                    </div>
                  </div>
                </div>
                <div className="ml-10">
                  <p className="text-xs text-foreground-600 leading-relaxed"><strong>Mitigation :</strong> {risk.mitigation}</p>
                  <p className="text-[10px] text-foreground-400 mt-1 flex items-center gap-1"><i className="ri-user-line text-xs"></i>{risk.owner}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-brain-2-line text-accent-700 text-lg"></i>
            <span className="text-sm font-semibold text-accent-900">KOS UPG-2 — Expansion Intelligence&trade; — En Cours</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-[10px] text-accent-800/70">
            <span><strong>{overview.progressPercent}%</strong> progression</span>
            <span><strong>{stats.tasksInProgress}/6</strong> tâches en cours</span>
            <span><strong>{stats.agentsActive}</strong> agents actifs</span>
            <span><strong>{stats.docsIngested}</strong> docs</span>
            <span><strong>{stats.sourcesConnected}</strong> sources</span>
            <span><strong>Fin : {timeline.endDate}</strong></span>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}





