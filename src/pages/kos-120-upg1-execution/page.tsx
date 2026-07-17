import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOS120Upg1Execution } from '@/hooks/useKOS120Upg1Execution';

const PRIORITY_COLORS: Record<string, string> = {
  CRITIQUE: '#DC2626',
  HAUTE: '#EA580C',
  MOYENNE: '#CA8A04',
};
const STATUS_COLORS: Record<string, string> = {
  completed: '#86BC25',
  in_progress: '#0A66C2',
  pending: '#6B7280',
};

export default function KOS120Upg1ExecutionPage() {
  const {
    loading, retry, header, tasks, metrics, timeline, risks, agents, nextSteps,
    criticalTasks, blockedTasks, completedTasks, inProgressTasks,
  } = useKOS120Upg1Execution();

  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('tasks');

  if (loading) {
    return (
      <KOSHubLayout hubId={84}>
        <div className="min-h-screen bg-background-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#86BC25]/10 flex items-center justify-center">
              <i className="ri-play-circle-line text-3xl text-[#86BC25] animate-pulse" />
            </div>
            <p className="text-foreground-500 text-sm">Initialisation du Cockpit UPG-1...</p>
            <p className="text-[10px] text-foreground-400 mt-1">Connexion aux 5 agents d&apos;exécution</p>
          </div>
        </div>
      </KOSHubLayout>
    );
  }

  const tabs = [
    { id: 'tasks', label: 'Tâches', icon: 'ri-list-check-3', count: `${completedTasks.length}/${metrics.totalTasks}` },
    { id: 'timeline', label: 'Timeline', icon: 'ri-timeline-view', count: `${timeline.daysElapsed}J` },
    { id: 'agents', label: 'Agents', icon: 'ri-robot-3-line', count: `${agents.length}` },
    { id: 'risks', label: 'Risques', icon: 'ri-alert-line', count: `${risks.length}` },
  ];

  return (
    <KOSHubLayout hubId={84}>
      <SeoHead
        title="KOS UPG-1 Fondations 120% — Exécution Live | KHEPRA EXPERTS"
        description="Cockpit d'exécution UPG-1 Fondations 120%. 8 tâches en cours, Juillet 2026. Regulatory Prediction Engine, Quality Prophet Engine, Threat Prediction Engine."
        keywords="KOS UPG-1, exécution 120%, Fondations 120%, KHEPRA EXPERTS, Regulatory Prediction Engine, Quality Prophet Engine"
        canonicalPath="/kos-120-upg1-execution"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero — Phase Status Banner */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #DC2626 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-[#86BC25]/20 text-[#86BC25] text-[10px] font-bold uppercase tracking-wider border border-[#86BC25]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#86BC25] inline-block mr-1.5 animate-pulse" />
                  EN COURS
                </span>
                <span className="text-gray-500 text-[10px] font-bold">{header.phaseId} — {header.date}</span>
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                {header.phaseFullName}
              </h1>
              <p className="text-sm text-gray-400 max-w-2xl">
                {header.description} <strong className="text-white">{metrics.overallProgress}%</strong> complété. {metrics.daysRemainingInPhase} jours restants.
              </p>
            </div>
            {/* Phase Progress Ring */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#86BC25" strokeWidth="8" strokeDasharray="264" strokeDashoffset={264 - (264 * metrics.overallProgress) / 100} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-white">{metrics.overallProgress}%</span>
                  <span className="text-[9px] text-gray-400">complété</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-gray-400">
                <span>{completedTasks.length}/{metrics.totalTasks} tâches</span>
                <span className="text-gray-600">|</span>
                <span>J+{timeline.daysElapsed}</span>
              </div>
            </div>
          </div>

          {/* Mini KPI Bar */}
          <div className="mt-6 grid grid-cols-4 sm:grid-cols-8 gap-2">
            {[
              { label: 'Critiques', value: criticalTasks.length, color: '#DC2626', icon: 'ri-alert-fill' },
              { label: 'En cours', value: inProgressTasks.length, color: '#0A66C2', icon: 'ri-loader-4-line' },
              { label: 'Bloquées', value: blockedTasks.length, color: '#EA580C', icon: 'ri-forbid-line' },
              { label: 'Terminées', value: completedTasks.length, color: '#86BC25', icon: 'ri-check-double-line' },
              { label: 'Agents', value: agents.length, color: '#13a2b8', icon: 'ri-robot-3-line' },
              { label: 'Risques', value: risks.length, color: '#CA8A04', icon: 'ri-alert-line' },
              { label: 'Jours rest.', value: metrics.daysRemainingInPhase, color: '#7C3AED', icon: 'ri-calendar-line' },
              { label: 'Recoveries', value: metrics.autoRecoveryEvents, color: '#059669', icon: 'ri-heart-pulse-line' },
            ].map((m, i) => (
              <div key={i} className="rounded-lg bg-white/5 p-2.5 text-center">
                <i className={`${m.icon} text-xs mb-1 block`} style={{ color: m.color }} />
                <span className="block text-sm font-bold text-white">{m.value}</span>
                <span className="text-[9px] text-gray-400">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Nav */}
      <section className="sticky top-20 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                }`}
              >
                <i className={`${tab.icon} text-base`} />{tab.label}
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-200">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TASKS TAB ═══════════ */}
      {activeTab === 'tasks' && (
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Execution Mode Banner */}
            <div className="rounded-xl bg-foreground-950 border border-[#86BC25]/20 p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#86BC25]/15 flex items-center justify-center">
                  <i className="ri-settings-3-line text-xl text-[#86BC25]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Mode Exécution Autonome — {header.commander}</p>
                  <p className="text-[10px] text-gray-400">{header.governance}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-[#86BC25]/15 text-[#86BC25] whitespace-nowrap">
                  Sprint Velocity {metrics.sprintVelocity}
                </span>
                <span className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-[#0A66C2]/15 text-[#0A66C2] whitespace-nowrap">
                  {header.rollbackProtocol.split('—')[0].trim()}
                </span>
              </div>
            </div>

            {/* Critical Path */}
            <div className="rounded-xl bg-background-50 border border-background-200/70 p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#DC2626]/15 flex items-center justify-center">
                    <i className="ri-flag-line text-[10px] text-[#DC2626]" />
                  </div>
                  <h3 className="text-xs font-bold text-foreground-950">Chemin Critique</h3>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    metrics.criticalPath.onTrack ? 'bg-[#86BC25]/15 text-[#86BC25]' : 'bg-[#DC2626]/15 text-[#DC2626]'
                  }`}>
                    {metrics.criticalPath.onTrack ? 'ON TRACK' : 'À RISQUE'}
                  </span>
                </div>
                <span className="text-[10px] text-foreground-400">
                  Fin estimée : {new Date(metrics.criticalPath.estimatedCompletion).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {metrics.criticalPath.tasks.map((tid, i) => {
                  const t = tasks.find((x) => x.id === tid);
                  return (
                    <div key={tid} className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap" style={{
                        backgroundColor: t ? `${STATUS_COLORS[t.status]}15` : '#f3f4f6',
                        color: t ? STATUS_COLORS[t.status] : '#9ca3af',
                      }}>
                        {tid}{t ? ` (${t.progress}%)` : ''}
                      </span>
                      {i < metrics.criticalPath.tasks.length - 1 && (
                        <i className="ri-arrow-right-line text-foreground-300 text-[10px]" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {tasks.map((task) => {
                const isExpanded = expandedTask === task.id;
                const statusColor = STATUS_COLORS[task.status];
                return (
                  <div key={task.id} className={`rounded-xl border transition-all bg-background-50 ${
                    isExpanded ? 'border-foreground-300' : 'border-background-200/70 hover:border-foreground-200'
                  }`}>
                    <button
                      onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                      className="w-full p-4 text-left flex items-start gap-4 cursor-pointer"
                    >
                      {/* Status indicator */}
                      <div className="relative flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${statusColor}15` }}>
                          {task.status === 'completed' ? (
                            <i className="ri-check-fill text-sm" style={{ color: statusColor }} />
                          ) : task.status === 'in_progress' ? (
                            <svg className="w-5 h-5 -rotate-90" viewBox="0 0 32 32">
                              <circle cx="16" cy="16" r="12" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                              <circle cx="16" cy="16" r="12" fill="none" stroke={statusColor} strokeWidth="3" strokeDasharray="75.4" strokeDashoffset={75.4 - (75.4 * task.progress) / 100} strokeLinecap="round" />
                            </svg>
                          ) : (
                            <i className="ri-time-line text-sm" style={{ color: statusColor }} />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-bold text-foreground-400">{task.id}</span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{
                            backgroundColor: `${PRIORITY_COLORS[task.priority]}12`,
                            color: PRIORITY_COLORS[task.priority],
                          }}>{task.priority}</span>
                          <span className="text-[10px] text-foreground-400">{task.effort}</span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground-950 mb-0.5">{task.name}</h3>
                        <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                          <span>{task.axisName}</span>
                          <span>·</span>
                          <span>Agent : {task.assignee.split('™')[0]}™</span>
                          {task.blockers.length > 0 && (
                            <>
                              <span>·</span>
                              <span className="text-[#DC2626] font-bold">BLOQUÉE</span>
                            </>
                          )}
                        </div>
                        {/* Progress bar */}
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-background-200 overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${task.progress}%`, backgroundColor: statusColor }} />
                          </div>
                          <span className="text-[10px] font-bold text-foreground-500 w-8 text-right">{task.progress}%</span>
                        </div>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 flex-shrink-0 mt-1`} />
                    </button>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-background-200/70 pt-4 animate-fade-in">
                        {/* Description */}
                        <div className="rounded-lg bg-background-100 p-4 mb-4">
                          <span className="text-[9px] font-bold text-foreground-400 uppercase tracking-wider">Description</span>
                          <p className="text-xs text-foreground-700 mt-1">{task.description}</p>
                        </div>

                        {/* KPIs */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {Object.entries(task.kpis).map(([key, val]) => (
                            <div key={key} className="rounded-lg bg-background-100 p-2.5 text-center">
                              <span className="block text-xs font-bold text-foreground-950">{val}</span>
                              <span className="text-[9px] text-foreground-400">{key}</span>
                            </div>
                          ))}
                        </div>

                        {/* Subtasks */}
                        <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider mb-2 block">Sous-tâches</span>
                        <div className="space-y-1.5 mb-4">
                          {task.subTasks.map((st, i) => (
                            <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-background-100">
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                                st.status === 'completed' ? 'bg-[#86BC25]/15 text-[#86BC25]' :
                                st.status === 'in_progress' ? 'bg-[#0A66C2]/15 text-[#0A66C2]' :
                                'bg-background-200 text-foreground-400'
                              }`}>
                                {st.status === 'completed' ? <i className="ri-check-line text-[8px]" /> :
                                 st.status === 'in_progress' ? <i className="ri-loader-4-line text-[8px] animate-spin" /> :
                                 <i className="ri-time-line text-[8px]" />}
                              </div>
                              <span className="text-xs text-foreground-700 flex-1">{st.name}</span>
                              <span className={`text-[10px] font-bold ${
                                st.status === 'completed' ? 'text-[#86BC25]' :
                                st.status === 'in_progress' ? 'text-[#0A66C2]' :
                                'text-foreground-400'
                              }`}>{st.progress}%</span>
                            </div>
                          ))}
                        </div>

                        {/* Logs */}
                        <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider mb-2 block">Journal d&apos;exécution</span>
                        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                          {task.logs.map((log, i) => (
                            <div key={i} className="flex items-start gap-2 px-2 py-1.5 rounded text-[10px]">
                              <i className={`${
                                log.type === 'success' ? 'ri-checkbox-circle-fill text-[#86BC25]' :
                                log.type === 'warning' ? 'ri-error-warning-fill text-[#CA8A04]' :
                                'ri-information-fill text-[#0A66C2]'
                              } text-xs flex-shrink-0 mt-0.5`} />
                              <div className="flex-1 min-w-0">
                                <span className="text-foreground-400 mr-1">
                                  {new Date(log.timestamp).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <span className="text-foreground-700">{log.message}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ TIMELINE TAB ═══════════ */}
      {activeTab === 'timeline' && (
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-lg font-bold text-foreground-950">
                  Timeline UPG-1 — {timeline.daysElapsed}/{timeline.totalDays} jours
                </h2>
                <div className="flex items-center gap-2 text-[10px] text-foreground-400">
                  <span>Début : {new Date(timeline.phaseStart).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
                  <span>→</span>
                  <span>Fin : {new Date(timeline.phaseEnd).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
                </div>
              </div>
              {/* Phase Bar */}
              <div className="h-3 rounded-full bg-background-200 overflow-hidden mb-6">
                <div className="h-full rounded-full bg-[#86BC25] transition-all" style={{ width: `${(timeline.daysElapsed / timeline.totalDays) * 100}%` }} />
              </div>

              {/* Milestones */}
              <div className="space-y-0">
                {timeline.milestones.map((ms, i) => {
                  const isCompleted = ms.status === 'completed';
                  const isLast = i === timeline.milestones.length - 1;
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                          isCompleted ? 'bg-[#86BC25] text-white' : 'bg-background-200 text-foreground-400'
                        }`}>
                          {isCompleted ? <i className="ri-check-line" /> : i + 1}
                        </div>
                        {!isLast && (
                          <div className={`w-0.5 h-8 ${isCompleted ? 'bg-[#86BC25]/30' : 'bg-background-200'}`} />
                        )}
                      </div>
                      <div className="pb-4 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold ${isCompleted ? 'text-[#86BC25]' : 'text-foreground-400'}`}>
                            {new Date(ms.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            isCompleted ? 'bg-[#86BC25]/15 text-[#86BC25]' : 'bg-background-200 text-foreground-400'
                          }`}>
                            {isCompleted ? 'COMPLÉTÉ' : 'À VENIR'}
                          </span>
                        </div>
                        <p className={`text-xs mt-0.5 ${isCompleted ? 'text-foreground-900 font-bold' : 'text-foreground-500'}`}>
                          {ms.event}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ AGENTS TAB ═══════════ */}
      {activeTab === 'agents' && (
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 mb-6">
              <h2 className="font-heading text-lg font-bold text-foreground-950 mb-4">Agents Assignés — UPG-1</h2>
              <div className="space-y-3">
                {agents.map((agent) => (
                  <div key={agent.id} className="rounded-xl bg-background-100 p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                      backgroundColor: agent.load === '45%' ? '#05966915' : agent.load === '65%' ? '#0A66C215' :
                                      agent.load === '71%' ? '#7C3AED15' : agent.load === '78%' ? '#EA580C15' : '#DC262615',
                    }}>
                      <i className={`${agent.status === 'active' ? 'ri-robot-3-line' : 'ri-robot-3-line'} text-xl`}
                        style={{ color: agent.status === 'active' ? '#13a2b8' : '#6b7280' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-foreground-950">{agent.name}</h3>
                      <p className="text-[10px] text-foreground-400">Rôle : {agent.role}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-background-200 overflow-hidden">
                          <div className="h-full rounded-full" style={{
                            width: agent.load,
                            backgroundColor: agent.status === 'active' ? '#86BC25' : '#9ca3af',
                          }} />
                        </div>
                        <span className="text-[10px] font-bold text-foreground-500 w-8 text-right">{agent.load}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        agent.status === 'active' ? 'bg-[#86BC25]/15 text-[#86BC25]' : 'bg-background-200 text-foreground-400'
                      }`}>
                        {agent.status === 'active' ? 'ACTIF' : 'EN ATTENTE'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ RISKS TAB ═══════════ */}
      {activeTab === 'risks' && (
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 mb-6">
              <h2 className="font-heading text-lg font-bold text-foreground-950 mb-4">Registre des Risques — UPG-1</h2>
              <div className="space-y-2">
                {risks.map((risk) => (
                  <div key={risk.id} className="rounded-xl bg-background-100 p-4 flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      risk.severity === 'MOYEN' ? 'bg-[#CA8A04]/15 text-[#CA8A04]' : 'bg-[#9ca3af]/15 text-foreground-500'
                    }`}>
                      <i className={`${risk.severity === 'MOYEN' ? 'ri-alert-fill' : 'ri-information-fill'} text-sm`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold text-foreground-400">{risk.id}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          risk.severity === 'MOYEN' ? 'bg-[#CA8A04]/15 text-[#CA8A04]' : 'bg-background-200 text-foreground-500'
                        }`}>{risk.severity}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          risk.status === 'mitigated' ? 'bg-[#86BC25]/15 text-[#86BC25]' :
                          risk.status === 'monitored' ? 'bg-[#0A66C2]/15 text-[#0A66C2]' :
                          'bg-[#EA580C]/15 text-[#EA580C]'
                        }`}>
                          {risk.status === 'mitigated' ? 'MITIGÉ' : risk.status === 'monitored' ? 'SURVEILLÉ' : 'ACCEPTÉ'}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-foreground-950">{risk.description}</p>
                      <p className="text-[10px] text-foreground-400 mt-0.5">
                        <strong>Mitigation :</strong> {risk.mitigation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Next Steps + Footer */}
      <section className="border-t border-background-200/70 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Next Steps */}
            <div className="rounded-2xl bg-foreground-950 p-6">
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-arrow-right-circle-line text-[#CA8A04]" />
                <h3 className="text-sm font-bold text-white">Prochaines Actions</h3>
              </div>
              <div className="space-y-2">
                {nextSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#CA8A04]/20 text-[#CA8A04] text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <span className="text-xs text-gray-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase Summary */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Résumé UPG-1</h3>
              <div className="space-y-3">
                {header.objectives.map((obj, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-background-100">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      i === 0 ? 'bg-[#86BC25]/15 text-[#86BC25]' :
                      i <= 2 ? 'bg-[#0A66C2]/15 text-[#0A66C2]' :
                      'bg-background-200 text-foreground-400'
                    }`}>
                      {i === 0 ? <i className="ri-check-fill text-[10px]" /> : <i className="ri-more-fill text-[10px]" />}
                    </div>
                    <span className="text-xs font-bold text-foreground-950">{obj}</span>
                    {i === 0 && (
                      <span className="text-[9px] font-bold bg-[#86BC25]/15 text-[#86BC25] px-1.5 py-0.5 rounded-full ml-auto flex-shrink-0 whitespace-nowrap">
                        100%
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 rounded-xl bg-foreground-950">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">Fin estimée de la phase</span>
                  <span className="text-xs font-bold text-white">{metrics.phaseCompletionEstimate}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-gray-400">Auto-recoveries déclenchées</span>
                  <span className="text-xs font-bold text-[#86BC25]">{metrics.autoRecoveryEvents}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-gray-400">Circuit breakers / Rollbacks</span>
                  <span className="text-xs font-bold text-white">{metrics.circuitBreakerTriggers} / {metrics.rollbacksExecuted}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom — ASCII Banner */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <pre className="text-[9px] text-foreground-600 font-mono leading-tight whitespace-pre overflow-x-auto bg-background-100 rounded-xl p-4">
{`█████████████████████████████████████████████████████████████████████████████████████████
██                                                                                       ██
██   KOS 120% BIG FOUR UPGRADE — UPG-1 FONDATIONS 120%™                                 ██
██   EXÉCUTION EN COURS — ${metrics.overallProgress}% COMPLÉTÉ — J+${timeline.daysElapsed} — ${metrics.daysRemainingInPhase} JOURS RESTANTS           ██
██                                                                                       ██
██   ${completedTasks.length}/${metrics.totalTasks} TÂCHES  ·  ${inProgressTasks.length} EN COURS  ·  ${blockedTasks.length} BLOQUÉE  ·  ${criticalTasks.length} CRITIQUES                    ██
██   ${agents.length} AGENTS ACTIFS  ·  ${risks.length} RISQUES  ·  ${metrics.autoRecoveryEvents} AUTO-RECOVERIES  ·  0 ROLLBACK                            ██
██                                                                                       ██
██   PROCHAIN JALON : ${timeline.milestones.find((m) => m.status === 'pending')?.event || 'Fin de phase'}                     ██
██                                                                                       ██
███████████████████████████████████████████████████████████████████████████████████████████`}
          </pre>
        </div>
      </section>
    </KOSHubLayout>
  );
}