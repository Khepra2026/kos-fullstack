import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  ORCHESTRATOR_AGENTS,
  WORKFLOW_STEPS,
  SCORING_CRITERIA,
  SCORING_THRESHOLDS,
  SAMPLE_MISSIONS,
  ORCHESTRATOR_STATS,
} from '@/mocks/orchestratorEngine';
import type { OrchestratorAgent, ScoringCriteria } from '@/mocks/orchestratorEngine';

function getStatusBadge(status: string) {
  switch (status) {
    case 'active': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Activé', dot: 'bg-emerald-500' };
    case 'partial': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Partiel', dot: 'bg-amber-500' };
    case 'gap': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'GAP', dot: 'bg-red-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getStepStatusStyle(status: string) {
  switch (status) {
    case 'completed': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'Terminé', dot: 'bg-emerald-500', line: 'bg-emerald-500' };
    case 'in_progress': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'En cours', dot: 'bg-amber-500', line: 'bg-background-200' };
    default: return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-500', badge: 'En attente', dot: 'bg-slate-300', line: 'bg-background-100' };
  }
}

function getDecisionBadge(decision: string) {
  switch (decision) {
    case 'approved': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'APPROUVÉ', icon: 'ri-check-double-line', iconColor: 'text-emerald-500' };
    case 'to_correct': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'À CORRIGER', icon: 'ri-edit-line', iconColor: 'text-amber-500' };
    case 'rejected': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'REJETÉ', icon: 'ri-close-circle-line', iconColor: 'text-red-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', icon: 'ri-question-line', iconColor: 'text-gray-500' };
  }
}

type TabId = 'workflow' | 'scoring';

export default function orchestratorEnginePage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState<TabId>('workflow');
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [showThresholdInfo, setShowThresholdInfo] = useState<string | null>(null);

  const stats = ORCHESTRATOR_STATS;

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'workflow', label: 'Workflow d\'Orchestration', icon: 'ri-git-branch-line' },
    { id: 'scoring', label: 'Système de Scoring', icon: 'ri-bar-chart-box-line' },
  ];

  return (
    <hubLayout hubId={39}>
      <SeoHead
        title="KOS Orchestrator Engine™ — Scoring & Orchestration | KHEPRA EXPERTS"
        description="Module de scoring global (5 critères pondérés) et workflow d'orchestration 10 étapes. 9 agents KOS. Décision : Approuvé / À corriger / Rejeté. Conformité règles strictes."
        keywords="KOS Orchestrator Engine, scoring system, workflow orchestration, multi-agent system, quality scoring, KHEPRA EXPERTS"
        canonicalPath="/kos-orchestrator-engine"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

        {/* Hero */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-foreground-950">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=dark%20abstract%20technological%20command%20center%20with%20intricate%20connected%20nodes%20forming%20a%20decision%20tree%20architecture%20glowing%20interconnected%20pathways%20in%20warm%20amber%20and%20emerald%20tones%20representing%20intelligent%20workflow%20orchestration%20no%20text%20no%20human%20figures%20premium%20corporate%20data%20center%20visualization&width=1920&height=600&seq=kos-orchestrator-hero&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-center opacity-20"
              width="1920"
              height="600"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/50 via-foreground-950/70 to-foreground-950" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm mb-6">
                <i className="ri-cpu-line text-amber-400 text-sm" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                  KOS Orchestrator Engine™ — Scoring & Workflow
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Orchestrer. Évaluer.
                <span className="block text-amber-400 mt-2">Décider. En autonomie.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                9 agents KOS · 10 étapes de workflow · 5 critères de scoring pondérés.{' '}
                <strong className="text-white">Chaque mission analysée, scorée, et une décision rendue : Approuvé, À corriger ou Rejeté.</strong>
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <i className="ri-check-double-line text-emerald-400" />
                  <span className="text-sm text-emerald-300 font-semibold">{stats.approvedMissions} Approuvées</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <i className="ri-edit-line text-amber-400" />
                  <span className="text-sm text-amber-300 font-semibold">{stats.toCorrectMissions} À corriger</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                  <i className="ri-close-circle-line text-red-400" />
                  <span className="text-sm text-red-300 font-semibold">{stats.rejectedMissions} Rejetées</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-20 z-30 bg-white border-b border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto py-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-foreground-950 text-white'
                      : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                  }`}
                >
                  <i className={`${tab.icon} text-base`} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* === TAB: WORKFLOW === */}
        {activeTab === 'workflow' && (
          <>
            {/* Stats row */}
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
                  {[
                    { label: 'Étapes totales', value: String(stats.totalSteps), icon: 'ri-list-check', color: '#4F46E5' },
                    { label: 'Terminées', value: String(stats.completedSteps), icon: 'ri-check-line', color: '#86BC25' },
                    { label: 'En cours', value: String(stats.inProgressSteps), icon: 'ri-loader-4-line', color: '#E8C547' },
                    { label: 'En attente', value: String(stats.pendingSteps), icon: 'ri-time-line', color: '#9B7B2C' },
                    { label: 'Temps estimé', value: '~54 min', icon: 'ri-timer-line', color: '#0D7B5F' },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                        <i className={`${stat.icon} text-sm`} style={{ color: stat.color }} />
                      </div>
                      <span className="block text-lg font-bold text-foreground-950 font-heading">{stat.value}</span>
                      <span className="text-[10px] text-foreground-400">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {/* 10-Step Workflow */}
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-2">
                    Workflow d'Orchestration — 10 Étapes
                  </h2>
                  <p className="text-foreground-600 max-w-2xl mx-auto">
                    De la réception de la mission à la production du rapport exécutif. Chaque étape est tracée, mesurée et auditée.
                  </p>
                </div>

                <div className="space-y-3">
                  {WORKFLOW_STEPS.map((step, i) => {
                    const statusStyle = getStepStatusStyle(step.status);
                    return (
                      <div key={i} className="relative">
                        {i < WORKFLOW_STEPS.length - 1 && (
                          <div className={`absolute left-[26px] top-16 bottom-0 w-0.5 hidden md:block ${statusStyle.line}`} />
                        )}
                        <div className={`rounded-2xl border overflow-hidden transition-all ${statusStyle.bg} ${statusStyle.border}`}>
                          <div className="p-4 sm:p-5 flex flex-col md:flex-row items-start gap-4">
                            <div className="flex flex-col items-center flex-shrink-0">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${step.status === 'in_progress' ? 'animate-pulse' : ''}`} style={{ backgroundColor: `${step.color}15` }}>
                                <i className={`${step.icon} text-xl`} style={{ color: step.color }} />
                              </div>
                              <span className="text-2xl font-bold font-heading mt-1.5" style={{ color: step.color }}>{step.step}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                                <h3 className="font-heading text-base font-bold text-foreground-950">{step.name}</h3>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                                  {statusStyle.badge}
                                </span>
                              </div>
                              <p className="text-sm text-foreground-600 leading-relaxed">{step.description}</p>
                              <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs">
                                <span className="flex items-center gap-1 text-foreground-400">
                                  <i className="ri-time-line" />
                                  {step.duration}
                                </span>
                                <span className="flex items-center gap-1 text-foreground-400">
                                  <i className="ri-user-line" />
                                  {step.agents.join(', ')}
                                </span>
                                <span className="flex items-center gap-1 text-foreground-500 font-medium bg-white/60 px-2 py-0.5 rounded-full">
                                  <i className="ri-file-text-line text-[10px]" />
                                  {step.output}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 9 Agents Summary */}
            <section className="py-10 sm:py-14 bg-white border-t border-background-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-2">
                    9 Agents KOS — Équipe d'Orchestration
                  </h2>
                  <p className="text-foreground-600 max-w-2xl mx-auto">
                    {stats.activeAgents} agents activés, {stats.partialAgents} en déploiement partiel. Chaque agent a des responsabilités, contrôles et livrables spécifiques.
                  </p>
                </div>
                <div className="space-y-3">
                  {ORCHESTRATOR_AGENTS.map((agent) => {
                    const badge = getStatusBadge(agent.status);
                    const isExpanded = expandedAgent === agent.id;
                    const scoreColor = agent.score >= 8 ? '#86BC25' : agent.score >= 6 ? '#e8c547' : '#c2410c';
                    return (
                      <div
                        key={agent.id}
                        className={`rounded-2xl border transition-all duration-300 ${
                          isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200 hover:shadow-md'
                        }`}
                      >
                        <button
                          onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
                          className="w-full p-4 sm:p-5 text-left flex items-start gap-4 cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${agent.color}15` }}>
                            <span className="text-base font-bold font-heading" style={{ color: agent.color }}>{agent.number}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="text-sm font-bold text-foreground-950">{agent.name}</h3>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${badge.bg} ${badge.border} ${badge.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                                {badge.label}
                              </span>
                            </div>
                            <p className="text-xs text-foreground-500 line-clamp-1">{agent.mission}</p>
                            <div className="flex items-center gap-3 mt-1.5 text-xs">
                              <span className="flex items-center gap-1">
                                <span className="font-bold font-heading text-sm" style={{ color: scoreColor }}>{agent.score.toFixed(1)}</span>
                                <span className="text-foreground-400">/10</span>
                              </span>
                              <span className="text-foreground-400">
                                <i className="ri-file-list-3-line mr-1" />{agent.deliverables.length} livrables
                              </span>
                              <span className="text-foreground-400">
                                <i className="ri-check-double-line mr-1" />{agent.controls.length} contrôles
                              </span>
                            </div>
                          </div>
                          <div className="flex-shrink-0 pt-1">
                            <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                          </div>
                        </button>
                        {isExpanded && (
                          <div className="px-5 pb-5 border-t border-background-200 pt-4">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                              <div>
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Responsabilités</h5>
                                <ul className="space-y-1.5">
                                  {agent.responsibilities.map((r, j) => (
                                    <li key={j} className="flex items-start gap-2 text-xs text-foreground-600">
                                      <i className="ri-arrow-right-s-line text-foreground-400 flex-shrink-0 mt-px" />
                                      {r}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Contrôles</h5>
                                <ul className="space-y-1.5">
                                  {agent.controls.map((c, j) => (
                                    <li key={j} className="flex items-start gap-2 text-xs text-foreground-600">
                                      <i className="ri-checkbox-circle-line text-emerald-500 flex-shrink-0 mt-px" />
                                      {c}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">KPIs</h5>
                                <div className="space-y-1.5">
                                  {agent.kpis.map((kpi, j) => (
                                    <div key={j} className="flex items-center justify-between p-1.5 rounded-lg bg-background-50 border border-background-100">
                                      <div className="flex items-center gap-1.5">
                                        <i className={`${kpi.icon} text-[10px]`} style={{ color: agent.color }} />
                                        <span className="text-[10px] text-foreground-500">{kpi.label}</span>
                                      </div>
                                      <div className="flex items-baseline gap-0.5">
                                        <span className="text-xs font-bold text-foreground-950">{kpi.current}</span>
                                        <span className="text-[9px] text-foreground-400">/ {kpi.target}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        )}

        {/* === TAB: SCORING === */}
        {activeTab === 'scoring' && (
          <>
            {/* Scoring System Overview */}
            <section className="py-10 sm:py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                    Système de Scoring Global
                  </h2>
                  <p className="text-foreground-600 max-w-2xl mx-auto">
                    5 critères pondérés. Chaque mission reçoit un score sur 100. Le score détermine la décision finale.
                  </p>
                </div>

                {/* 5 Scoring Criteria */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
                  {SCORING_CRITERIA.map((criterion) => (
                    <div key={criterion.id} className="rounded-2xl bg-white border border-background-200 p-5 text-center hover:shadow-md transition-all">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${criterion.color}15` }}>
                        <i className={`${criterion.icon} text-xl`} style={{ color: criterion.color }} />
                      </div>
                      <h3 className="font-heading text-base font-bold text-foreground-950 mb-1">{criterion.name}</h3>
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-2" style={{ backgroundColor: `${criterion.color}12`, color: criterion.color }}>
                        {criterion.weight}%
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed">{criterion.description}</p>
                    </div>
                  ))}
                </div>

                {/* Scoring Formula */}
                <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white text-center mb-12">
                  <h3 className="font-heading text-xl font-bold mb-4">Formule de Calcul</h3>
                  <div className="flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base">
                    <span className="text-white font-bold">Score Global</span>
                    <span className="text-gray-400">=</span>
                    {SCORING_CRITERIA.map((c, i) => (
                      <span key={c.id} className="flex items-center gap-1">
                        <span className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ backgroundColor: `${c.color}25`, color: c.color }}>
                          {c.name} × {c.weight}%
                        </span>
                        {i < SCORING_CRITERIA.length - 1 && <span className="text-gray-500">+</span>}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs mt-4">Score sur 100 = moyenne pondérée des 5 critères. Arrondi à 1 décimale.</p>
                </div>

                {/* Thresholds */}
                <div className="mb-12">
                  <h3 className="font-heading text-xl font-bold text-foreground-950 mb-6 text-center">Seuils de Décision</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {SCORING_THRESHOLDS.map((threshold) => (
                      <div
                        key={threshold.range}
                        className={`rounded-2xl border p-5 cursor-pointer transition-all hover:shadow-md ${threshold.badgeBg} ${threshold.badgeBorder}`}
                        onMouseEnter={() => setShowThresholdInfo(threshold.range)}
                        onMouseLeave={() => setShowThresholdInfo(null)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-3xl font-bold font-heading" style={{ color: threshold.color }}>{threshold.range}</span>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${threshold.badgeBg} ${threshold.badgeBorder} ${threshold.badgeText}`}>
                            {threshold.action}
                          </span>
                        </div>
                        <h4 className="font-heading text-base font-bold text-foreground-950 mb-1">{threshold.label}</h4>
                        <p className="text-xs text-foreground-500 leading-relaxed">{showThresholdInfo === threshold.range ? threshold.description : threshold.description.substring(0, 60) + '...'}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Missions */}
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground-950 mb-6 text-center">Missions Récentes — Scoring Appliqué</h3>
                  <div className="space-y-4">
                    {SAMPLE_MISSIONS.map((mission) => {
                      const decisionBadge = getDecisionBadge(mission.decision);
                      const isSelected = selectedMission === mission.id;
                      const scoreColor = mission.globalScore >= 9 ? '#86BC25' : mission.globalScore >= 8 ? '#E8C547' : mission.globalScore >= 7 ? '#E8943A' : '#C2410C';
                      return (
                        <div
                          key={mission.id}
                          className={`rounded-2xl border transition-all duration-300 ${
                            isSelected ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200 hover:shadow-md'
                          }`}
                        >
                          <button
                            onClick={() => setSelectedMission(isSelected ? null : mission.id)}
                            className="w-full p-5 text-left cursor-pointer"
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${scoreColor}15` }}>
                                <span className="text-xl font-bold font-heading" style={{ color: scoreColor }}>{mission.globalScore.toFixed(1)}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="text-xs font-semibold text-foreground-400">{mission.id}</span>
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-background-100 text-foreground-500">{mission.type}</span>
                                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${decisionBadge.bg} ${decisionBadge.border} ${decisionBadge.text}`}>
                                    <i className={`${decisionBadge.icon} text-[10px] ${decisionBadge.iconColor}`} />
                                    {decisionBadge.label}
                                  </span>
                                </div>
                                <h4 className="text-sm font-bold text-foreground-950 mb-1">{mission.title}</h4>
                                <p className="text-xs text-foreground-500 line-clamp-2">{mission.description}</p>
                                <div className="flex items-center gap-3 mt-2 text-[10px] text-foreground-400">
                                  <span>{new Date(mission.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                                  <span><i className="ri-user-line mr-1" />{mission.agentsAssigned.length} agents</span>
                                </div>
                              </div>
                              <div className="flex-shrink-0 pt-2">
                                <i className={`ri-${isSelected ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                              </div>
                            </div>
                          </button>
                          {isSelected && (
                            <div className="px-5 pb-5 border-t border-background-200 pt-4">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <div>
                                  <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3">Détail des Scores</h5>
                                  <div className="space-y-2">
                                    {mission.scores.map((s) => {
                                      const crit = SCORING_CRITERIA.find((c) => c.id === s.criteriaId);
                                      if (!crit) return null;
                                      const barColor = s.score >= 9 ? '#86BC25' : s.score >= 7 ? '#E8C547' : '#C2410C';
                                      return (
                                        <div key={s.criteriaId} className="flex items-center gap-3">
                                          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${crit.color}15` }}>
                                            <i className={`${crit.icon} text-xs`} style={{ color: crit.color }} />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                              <span className="text-xs font-medium text-foreground-600">{crit.name} ({crit.weight}%)</span>
                                              <span className="text-xs font-bold" style={{ color: barColor }}>{s.score}/10</span>
                                            </div>
                                            <div className="w-full h-1.5 rounded-full bg-background-100 overflow-hidden">
                                              <div className="h-full rounded-full" style={{ width: `${s.score * 10}%`, backgroundColor: barColor }} />
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                                <div>
                                  <div className="mb-4">
                                    <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Risques Identifiés</h5>
                                    <ul className="space-y-1">
                                      {mission.risks.map((risk, j) => (
                                        <li key={j} className="flex items-start gap-1.5 text-xs text-foreground-600">
                                          <i className="ri-alert-line text-amber-500 flex-shrink-0 mt-px text-xs" />
                                          {risk}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Actions Correctives</h5>
                                    <ul className="space-y-1">
                                      {mission.actions.map((action, j) => (
                                        <li key={j} className="flex items-start gap-1.5 text-xs text-foreground-600">
                                          <i className="ri-checkbox-circle-line text-emerald-500 flex-shrink-0 mt-px text-xs" />
                                          {action}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* Rules Section */}
            <section className="py-10 sm:py-14 bg-white border-t border-background-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                    Règles Strictes du Scoring
                  </h2>
                  <p className="text-foreground-600">Deux règles absolues encadrent toutes les évaluations.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-2xl bg-red-50/40 border border-red-200 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                        <i className="ri-forbid-line text-red-600 text-lg" />
                      </div>
                      <h3 className="font-heading text-base font-bold text-red-800">Règle Absolue N°1</h3>
                    </div>
                    <p className="text-sm text-red-700 leading-relaxed mb-2">
                      Le système ne doit jamais inventer des faits, références, études, partenariats, certifications, clients ou résultats.
                    </p>
                    <p className="text-xs text-red-500 italic">
                      En cas d'incertitude : "Information non vérifiée — validation requise."
                    </p>
                  </div>
                  <div className="rounded-2xl bg-amber-50/40 border border-amber-200 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                        <i className="ri-shield-cross-line text-amber-600 text-lg" />
                      </div>
                      <h3 className="font-heading text-base font-bold text-amber-800">Règle Absolue N°2</h3>
                    </div>
                    <p className="text-sm text-amber-700 leading-relaxed mb-2">
                      Le système ne doit jamais revendiquer une affiliation, certification ou partenariat sans preuve. Les comparaisons avec les Big Four sont présentées comme benchmark méthodologique uniquement.
                    </p>
                    <p className="text-xs text-amber-500 italic">
                      Jamais comme : partenariat, affiliation ou validation.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Cross-link to other KOS Engines */}
        <section className="py-12 sm:py-16 bg-white border-t border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                Écosystème KOS Complet
              </h2>
              <p className="text-foreground-600">Les 8 moteurs autonomes interconnectés.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Unified Autopilot', path: '/kos-unified-autopilot', icon: 'ri-cpu-line', color: '#86BC25' },
                { label: 'Quality System', path: '/kos-autonomous-quality-system', icon: 'ri-shield-check-line', color: '#8B3040' },

              ].map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className="rounded-xl border border-background-200 bg-background-50 p-4 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block"
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                    <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                  </div>
                  <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

    </hubLayout>
  );
}





