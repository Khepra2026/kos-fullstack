import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOS120BigFourUpgrade } from '@/hooks/useKOS120BigFourUpgrade';

const AXIS_COLORS: Record<string, string> = {
  'AXE-1': '#86BC25', 'AXE-2': '#0A66C2', 'AXE-3': '#DC2626', 'AXE-4': '#EA580C',
  'AXE-5': '#7C3AED', 'AXE-6': '#0891B2', 'AXE-7': '#CA8A04', 'AXE-8': '#059669',
};

export default function KOS120BigFourUpgradePage() {
  const { loading, overview, axes, roadmap, stats, executionMode, totalTasks, criticalTasks } = useKOS120BigFourUpgrade();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [expandedAxis, setExpandedAxis] = useState<string | null>(null);

  if (loading || !stats) {
    return (
      <hubLayout hubId={83}>
        <div className="min-h-screen bg-background-50 flex items-center justify-center">
          <div className="text-center">
            <i className="ri-rocket-2-line text-4xl text-foreground-200 animate-pulse" />
            <p className="mt-4 text-foreground-500">Chargement du Command Center 120%...</p>
          </div>
        </div>
      </hubLayout>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', count: '8 axes' },
    { id: 'axes', label: '8 Axes 120%', icon: 'ri-stack-line', count: '24 tâches' },
    { id: 'roadmap', label: 'Roadmap', icon: 'ri-road-map-line', count: '5 phases' },
    { id: 'kpis', label: 'KPIs Cibles', icon: 'ri-bar-chart-line', count: '24' },
    { id: 'execution', label: 'Exécution', icon: 'ri-play-circle-line', count: 'GO' },
  ];

  return (
    <hubLayout hubId={83}>
      <SeoHead
        title="KOS 120% Big Four Upgrade Command™ — Au-delà de l'Excellence | KHEPRA EXPERTS"
        description="KOS 120% Big Four Upgrade Command — Dépasser le standard Big Four de 20%. 8 axes d'amélioration, 24 tâches, 150 agents IA cible. Certification AAAA+ Big Four Transcendant."
        keywords="KOS 120%, Big Four upgrade, excellence opérationnelle, transcendance, KHEPRA EXPERTS, automatisation anticipative"
        canonicalPath="/kos-120-big-four-upgrade"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero — 120% Command Banner */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[900px] h-[900px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #CA8A04 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #EA580C 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CA8A04]/15 text-[#CA8A04] text-xs font-semibold mb-4 backdrop-blur-sm border border-[#CA8A04]/20">
              <i className="ri-rocket-2-line" />
              <span className="w-2 h-2 rounded-full bg-[#CA8A04] animate-pulse" />
              KOS 120% Big Four Upgrade Command™
            </div>
            <h1 className="font-heading text-2xl md:text-4xl font-bold text-white tracking-tight">
              {overview.title}
            </h1>
            <p className="text-sm md:text-base text-gray-400 mt-3 max-w-2xl">
              <strong>{overview.currentState}</strong> → <strong className="text-[#CA8A04]">{overview.targetState}</strong>. 8 axes d&apos;amélioration, 24 tâches critiques, 150 agents IA cible, 54 pays. 40 semaines pour transcender le standard Big Four.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {['AAAA+ TRANSCENDANT', '120%', '150 AGENTS', '54 PAYS', '40 SEMAINES'].map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white/70">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KPI Super Bar */}
      <section className="bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { label: 'Axes', value: `${stats.axes_atteints}/${stats.axes_total}`, sub: 'atteints', color: '#86BC25' },
              { label: 'Tâches', value: `${stats.taches_completees}/${stats.taches_totales}`, sub: 'complétées', color: '#0A66C2' },
              { label: 'Critiques', value: criticalTasks, sub: 'priorité max', color: '#DC2626' },
              { label: 'Phases', value: `${stats.phases_completees}/${stats.phases_totales}`, sub: 'complétées', color: '#EA580C' },
              { label: 'Agents Cible', value: stats.agents_cible, sub: `${stats.agents_actuels} actuels`, color: '#7C3AED' },
              { label: 'Pays Cible', value: stats.pays_cible, sub: `${stats.pays_actuels} actuels`, color: '#0891B2' },
              { label: 'Pipeline', value: stats.pipeline_cible, sub: `${stats.pipeline_actuel} actuel`, color: '#CA8A04' },
              { label: 'Score Cible', value: '12.0', sub: '10.0 actuel', color: '#059669' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-3 text-center">
                <span className="block text-base font-bold text-foreground-950">{s.value}</span>
                <span className="text-[10px] text-foreground-400">{s.label}</span>
                <p className="text-[9px] text-foreground-400">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
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

      {/* ═══════════════ VUE D'ENSEMBLE ═══════════════ */}
      {activeTab === 'overview' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Vision Statement */}
            <div className="rounded-2xl bg-foreground-950 p-6 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full opacity-[0.08]" style={{ background: 'radial-gradient(circle, #CA8A04 0%, transparent 70%)' }} />
              </div>
              <div className="relative">
                <h2 className="font-heading text-2xl font-bold text-white mb-4">{overview.slogan}</h2>
                <p className="text-gray-400 text-sm max-w-3xl mb-4">
                  Le système KOS a atteint le standard Big Four — <strong className="text-white">100% sur tous les indicateurs</strong>. L&apos;objectif 120% consiste à redéfinir chaque KPI au-delà du standard, à anticiper plutôt que réagir, à prédire plutôt qu&apos;analyser. C&apos;est le passage de l&apos;<strong className="text-white">excellence</strong> à la <strong className="text-[#CA8A04]">transcendance opérationnelle</strong>.
                </p>
                <div className="flex items-center gap-4">
                  <span className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-bold">100% → 120%</span>
                  <span className="text-gray-500 text-sm">sur tous les axes</span>
                </div>
              </div>
            </div>

            {/* 8 Axes Summary */}
            <div className="mb-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3">Les 8 Axes de Transcendance</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {axes.map((axis) => (
                  <div key={axis.id} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${AXIS_COLORS[axis.id]}15` }}>
                      <i className={`${axis.icon} text-lg`} style={{ color: AXIS_COLORS[axis.id] }} />
                    </div>
                    <p className="text-[11px] font-bold text-foreground-950 leading-tight mb-1">{axis.name.split(' ').slice(0, 3).join(' ')}</p>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-[10px] font-bold text-foreground-500">{axis.currentScore}%</span>
                      <i className="ri-arrow-right-line text-[10px] text-foreground-400" />
                      <span className="text-[10px] font-bold" style={{ color: AXIS_COLORS[axis.id] }}>{axis.targetScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Engine + Pipeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3">Moteur de Décision 120%</h3>
                <div className="bg-foreground-950 rounded-xl p-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    {['Transcendance', 'Anticipation', 'Prédiction', 'Expansion', 'Legacy'].map((p, i) => (
                      <div key={p} className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{
                          backgroundColor: i === 0 ? '#CA8A04' : i === 1 ? '#86BC25' : i === 2 ? '#0A66C2' : i === 3 ? '#EA580C' : '#7C3AED',
                          color: '#fff',
                        }}>{p}</span>
                        {i < 4 && <span className="text-gray-500 text-sm">&gt;</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3">Pipeline d&apos;Excellence — 8 Étapes</h3>
                <div className="flex flex-wrap items-center gap-1.5">
                  {overview.pipeline.split(' → ').map((step, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-background-100 text-[10px] font-bold text-foreground-700 whitespace-nowrap">{step}</span>
                      {i < 7 && <i className="ri-arrow-right-line text-foreground-300 text-[10px]" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Principles */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3">Principes Fondateurs 120%</h3>
              <div className="space-y-2">
                {overview.principles.map((p) => (
                  <div key={p} className="flex items-center gap-3 px-4 py-2 rounded-lg bg-background-100">
                    <div className="w-5 h-5 rounded-full bg-[#CA8A04] flex items-center justify-center flex-shrink-0">
                      <i className="ri-check-line text-white text-[10px]" />
                    </div>
                    <span className="text-sm font-bold text-foreground-950">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ 8 AXES 120% ═══════════════ */}
      {activeTab === 'axes' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">8 Axes de Transcendance — 100% → 120%</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Chaque axe passe du standard Big Four (100%) au niveau transcendant (120%). Cliquez sur un axe pour déployer les tâches.
              </p>
            </div>

            <div className="space-y-4">
              {axes.map((axis) => {
                const isExpanded = expandedAxis === axis.id;
                return (
                  <div key={axis.id} className={`rounded-xl border transition-all bg-background-50 ${isExpanded ? 'border-foreground-300 shadow-sm' : 'border-background-200/70 hover:border-foreground-200'}`}>
                    <button
                      onClick={() => setExpandedAxis(isExpanded ? null : axis.id)}
                      className="w-full p-5 text-left flex items-start gap-4 cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${AXIS_COLORS[axis.id]}15` }}>
                        <i className={`${axis.icon} text-2xl`} style={{ color: AXIS_COLORS[axis.id] }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${AXIS_COLORS[axis.id]}15`, color: AXIS_COLORS[axis.id] }}>{axis.id}</span>
                          <h3 className="text-sm font-bold text-foreground-950">{axis.name}</h3>
                        </div>
                        <p className="text-xs text-foreground-500 mb-2">{axis.description}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 rounded-full bg-background-200 overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: '83%', backgroundColor: AXIS_COLORS[axis.id] }} />
                          </div>
                          <span className="text-xs font-bold text-foreground-950">{axis.currentScore}% → <span style={{ color: AXIS_COLORS[axis.id] }}>{axis.targetScore}%</span></span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-foreground-400">
                          <span>{axis.tasks.length} tâches</span>
                          <span>·</span>
                          <span>{axis.tasks.filter((t) => t.priority === 'CRITIQUE').length} critiques</span>
                          <span>·</span>
                          <span>{axis.tasks.filter((t) => t.priority === 'HAUTE').length} hautes</span>
                        </div>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-xl flex-shrink-0 mt-2`} />
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4 animate-fade-in">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                          <div className="rounded-lg bg-background-100 p-4">
                            <span className="text-[9px] font-bold text-foreground-400 uppercase tracking-wider">Capacité Actuelle</span>
                            <p className="text-xs text-foreground-700 mt-1">{axis.currentCapability}</p>
                          </div>
                          <div className="rounded-lg p-4" style={{ backgroundColor: `${AXIS_COLORS[axis.id]}08` }}>
                            <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: AXIS_COLORS[axis.id] }}>Capacité Cible 120%</span>
                            <p className="text-xs text-foreground-700 mt-1">{axis.targetCapability}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider mb-2 block">Tâches requises</span>
                        <div className="space-y-2 mb-4">
                          {axis.tasks.map((task) => (
                            <div key={task.id} className="rounded-lg bg-background-100 p-3 flex items-start gap-3">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                task.priority === 'CRITIQUE' ? 'bg-red-100 text-red-600' : task.priority === 'HAUTE' ? 'bg-amber-100 text-amber-600' : 'bg-background-200 text-foreground-400'
                              }`}>
                                <i className={`${task.priority === 'CRITIQUE' ? 'ri-alert-fill' : 'ri-arrow-up-circle-fill'} text-xs`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="text-[10px] font-bold text-foreground-400">{task.id}</span>
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                                    task.priority === 'CRITIQUE' ? 'bg-red-100 text-red-700' : task.priority === 'HAUTE' ? 'bg-amber-100 text-amber-700' : 'bg-background-200 text-foreground-500'
                                  }`}>{task.priority}</span>
                                </div>
                                <p className="text-xs font-bold text-foreground-950">{task.name}</p>
                                <div className="flex items-center gap-3 mt-1 text-[10px] text-foreground-400">
                                  <span>Effort : {task.effort}</span>
                                  <span>Impact : {task.impact}</span>
                                </div>
                              </div>
                              <span className={`text-[9px] font-bold px-2 py-1 rounded-full flex-shrink-0 ${
                                task.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-background-200 text-foreground-400'
                              }`}>{task.status === 'completed' ? 'FAIT' : 'EN ATTENTE'}</span>
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider mb-2 block">KPIs Cibles</span>
                        <div className="grid grid-cols-3 gap-2">
                          {axis.kpis.map((kpi) => (
                            <div key={kpi.name} className="rounded-lg bg-background-100 p-3 text-center">
                              <span className="block text-xs font-bold text-foreground-950">{kpi.current} → <span style={{ color: AXIS_COLORS[axis.id] }}>{kpi.target}</span></span>
                              <span className="text-[9px] text-foreground-400">{kpi.name} ({kpi.unit})</span>
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

      {/* ═══════════════ ROADMAP ═══════════════ */}
      {activeTab === 'roadmap' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Roadmap 120% — {roadmap.totalWeeks} Semaines</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Déploiement en 5 phases sur 40 semaines. {roadmap.totalTasks} tâches au total, certification AAAA+ Big Four Transcendant 120%.
              </p>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 mb-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Chronologie de Déploiement</h3>
              <div className="space-y-4">
                {roadmap.phases.map((phase, i) => (
                  <div key={phase.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                        phase.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-background-200 text-foreground-400'
                      }`}>
                        {phase.status === 'completed' ? <i className="ri-check-line" /> : phase.id.replace('UPG-', '')}
                      </div>
                      {i < roadmap.phases.length - 1 && (
                        <div className={`w-0.5 h-10 ${phase.status === 'completed' ? 'bg-emerald-300' : 'bg-background-200'}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-foreground-950">{phase.name}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          phase.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-background-200 text-foreground-400'
                        }`}>
                          {phase.status === 'completed' ? 'COMPLÉTÉ' : 'PLANIFIÉ'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-foreground-400 mt-0.5">
                        <span>{phase.date}</span>
                        <span>{phase.weeks} semaines</span>
                        <span>{phase.tasks_total} tâches</span>
                      </div>
                      <p className="text-xs text-foreground-500 mt-1">{phase.description}</p>
                      <div className="mt-2 h-1.5 rounded-full bg-background-200 overflow-hidden">
                        <div className="h-full rounded-full bg-[#CA8A04]" style={{ width: `${phase.status === 'completed' ? 100 : 0}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Go-Live Criteria */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Critères Go-Live 120% — 10/10 requis</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {roadmap.goLiveCriteria.map((criterion, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background-100">
                    <div className="w-5 h-5 rounded-full bg-[#CA8A04]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-[#CA8A04]">{i + 1}</span>
                    </div>
                    <span className="text-xs font-bold text-foreground-950">{criterion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ KPIS CIBLES ═══════════════ */}
      {activeTab === 'kpis' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">KPIs Cibles 120% — 24 Indicateurs</h2>
            </div>

            {axes.map((axis) => (
              <div key={axis.id} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${AXIS_COLORS[axis.id]}15`, color: AXIS_COLORS[axis.id] }}>{axis.id}</span>
                  <h3 className="text-sm font-bold text-foreground-950">{axis.name}</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {axis.kpis.map((kpi) => (
                    <div key={kpi.name} className="rounded-xl bg-background-50 border border-background-200/70 p-4">
                      <span className="text-[10px] text-foreground-400 uppercase tracking-wider">{kpi.name}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-bold text-foreground-950">{kpi.current}</span>
                        <i className="ri-arrow-right-line text-foreground-400 text-sm" />
                        <span className="text-lg font-bold" style={{ color: AXIS_COLORS[axis.id] }}>{kpi.target}</span>
                      </div>
                      <span className="text-[10px] text-foreground-400">{kpi.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════ EXÉCUTION ═══════════════ */}
      {activeTab === 'execution' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Execution Mode */}
            <div className="rounded-2xl bg-foreground-950 border border-[#CA8A04]/30 p-8 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #CA8A04 0%, transparent 70%)' }} />
              </div>
              <div className="relative text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#CA8A04]/20 text-[#CA8A04] text-sm font-bold mb-6 border border-[#CA8A04]/30">
                  <span className="w-3 h-3 rounded-full bg-[#CA8A04] animate-pulse" />
                  KOS 120% UPGRADE — PRÊT POUR EXÉCUTION
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                  Lancement de l&apos;Upgrade 120% Big Four
                </h2>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto mb-8">
                  {executionMode.trigger}. Mode d&apos;exécution : <strong className="text-white">{executionMode.mode}</strong>. {executionMode.governance}.
                </p>

                {/* Execution Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-8">
                  {[
                    { label: 'Axes', value: `${stats.axes_total}`, sub: '8 à déployer', color: '#86BC25' },
                    { label: 'Tâches', value: `${totalTasks}`, sub: `${criticalTasks} critiques`, color: '#DC2626' },
                    { label: 'Durée', value: '40 sem.', sub: '5 phases', color: '#EA580C' },
                    { label: 'Score Cible', value: '12.0/10', sub: 'Transcendant', color: '#CA8A04' },
                  ].map((m) => (
                    <div key={m.label} className="rounded-xl bg-white/5 p-3 text-center">
                      <span className="block text-xl font-bold" style={{ color: m.color }}>{m.value}</span>
                      <span className="text-[10px] text-gray-400">{m.label}</span>
                      <p className="text-[9px] text-gray-500">{m.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Execution Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-left">
                  <div className="rounded-xl bg-white/5 p-4">
                    <i className="ri-settings-3-line text-lg text-[#EA580C] mb-2 block" />
                    <h4 className="text-xs font-bold text-white mb-1">Auto-Recovery</h4>
                    <p className="text-[10px] text-gray-400">{executionMode.autoRecovery}</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4">
                    <i className="ri-file-chart-line text-lg text-[#0A66C2] mb-2 block" />
                    <h4 className="text-xs font-bold text-white mb-1">Reporting</h4>
                    <p className="text-[10px] text-gray-400">{executionMode.reporting}</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4">
                    <i className="ri-arrow-go-back-line text-lg text-[#86BC25] mb-2 block" />
                    <h4 className="text-xs font-bold text-white mb-1">Rollback</h4>
                    <p className="text-[10px] text-gray-400">{executionMode.rollback}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System State ASCII */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">État du Système — Pré-Upgrade 120%</h3>
              <pre className="text-[9px] text-foreground-600 font-mono leading-tight whitespace-pre overflow-x-auto bg-background-100 rounded-xl p-4">
{`███████████████████████████████████████████████████████████████████████████████
██                                                                           ██
██   KOS — 120% BIG FOUR UPGRADE COMMAND™                                   ██
██   KHEPRA EXPERTS — TRANSCENDANCE OPÉRATIONNELLE                           ██
██                                                                           ██
██   Certification Actuelle : AAAA — BIG FOUR SUPREME 100%                   ██
██   Certification Cible   : AAAA+ — BIG FOUR TRANSCENDANT 120%             ██
██   Mode : PRÊT POUR EXÉCUTION                                              ██
██   Date : 22 Juin 2026                                                     ██
██                                                                           ██
██   8 AXES • 24 TÂCHES • 5 PHASES • 40 SEMAINES                            ██
██   75 → 150 AGENTS IA • 17 → 54 PAYS                                       ██
██   3.77 Md → 15 Md FCFA PIPELINE                                            ██
██   100K → 1M DOCUMENTS KNOWLEDGE GRAPH                                      ██
██   SCORE : 10.0/10 → 12.0/10                                               ██
██                                                                           ██
██   ████████████░░░░░░░░ 0% — PRÊT POUR EXÉCUTION                           ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████`}
              </pre>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <section className="py-8 border-t border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-foreground-950 p-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CA8A04]/15 text-[#CA8A04] text-xs font-semibold mb-3 border border-[#CA8A04]/20">
              <i className="ri-rocket-2-line" />KOS 120% Big Four Upgrade Command™
            </div>
            <p className="text-white font-bold text-lg mb-2">
              {overview.slogan}
            </p>
            <p className="text-gray-400 text-sm max-w-xl mx-auto mb-4">
              {executionMode.trigger}. Pipeline complet : {overview.pipeline}. Certification cible : <strong className="text-[#CA8A04]">{overview.targetState}</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {overview.principles.slice(0, 4).map((p) => (
                <span key={p} className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/10 text-white/70">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





