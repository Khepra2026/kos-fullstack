import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useMultiAgentOrchestration } from '@/hooks/useMultiAgentOrchestration';
import type { AgentPool, RACIEntry, Workflow, Escalade, RegleValidation } from '@/mocks/multiAgentOrchestration';

function getStatusBadge(status: string) {
  switch (status) {
    case 'optimal': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Optimal', dot: 'bg-emerald-500' };
    case 'stable': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Stable', dot: 'bg-amber-500' };
    case 'degraded': return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', label: 'Dégradé', dot: 'bg-orange-500' };
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Critique', dot: 'bg-red-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getStepStatusStyle(status: string) {
  switch (status) {
    case 'completed': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'Terminé', dot: 'bg-emerald-500' };
    case 'in_progress': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'En cours', dot: 'bg-amber-500' };
    default: return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-500', badge: 'En attente', dot: 'bg-slate-300' };
  }
}

function getSeverityStyle(sev: string) {
  switch (sev) {
    case 'critique': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500' };
    case 'majeur': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' };
    case 'mineur': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', dot: 'bg-slate-400' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', dot: 'bg-gray-500' };
  }
}

function getRoleBadge(role: 'R' | 'A' | 'C' | 'I') {
  switch (role) {
    case 'R': return { bg: 'bg-emerald-500', label: 'R — Responsible', desc: 'Exécute' };
    case 'A': return { bg: 'bg-amber-500', label: 'A — Accountable', desc: 'Valide' };
    case 'C': return { bg: 'bg-sky-500', label: 'C — Consulted', desc: 'Consulté' };
    case 'I': return { bg: 'bg-slate-400', label: 'I — Informed', desc: 'Informé' };
  }
}

type TabId = 'overview' | 'raci' | 'workflows' | 'escalades' | 'regles' | 'kpis';

export default function multiAgentOrchestrationPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [expandedPool, setExpandedPool] = useState<string | null>(null);
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(null);
  const [selectedPool, setSelectedPool] = useState<string>('all');

  const { pools, raci, workflows, escalades, regles, kpis, kpisByCategorie, stats, loading } = useMultiAgentOrchestration();

  const filteredPools = useMemo(() => {
    if (selectedPool === 'all') return pools;
    return pools.filter(p => p.id === selectedPool);
  }, [selectedPool, pools]);

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
    { id: 'raci', label: 'Matrice RACI', icon: 'ri-grid-line' },
    { id: 'workflows', label: 'Workflows', icon: 'ri-git-branch-line' },
    { id: 'escalades', label: 'Escalades', icon: 'ri-alert-line' },
    { id: 'regles', label: 'Règles de Validation', icon: 'ri-shield-check-line' },
    { id: 'kpis', label: 'KPIs Consolidés', icon: 'ri-bar-chart-box-line' },
  ];

  return (
    <hubLayout hubId={70}>
      <SeoHead
        title="KOS Multi-Agent Orchestration Framework™ — 7 Pools, 51 Agents | KHEPRA EXPERTS"
        description="Framework d'orchestration multi-agent KOS. 7 pools d'agents (Veille, Recherche, SEO/GEO, Formation, AO, Conformité, Qualité), matrice RACI, 5 workflows, 5 niveaux d'escalade, 12 règles de validation, KPIs consolidés Big Four."
        keywords="KOS Multi-Agent Orchestration, orchestration agents IA, pools agents KOS, matrice RACI, workflows orchestration, escalades, règles validation, KPIs Big Four, KHEPRA EXPERTS"
        canonicalPath="/kos-multi-agent-orchestration"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=abstract%20dark%20technological%20enterprise%20orchestration%20hub%20visualization%20with%20seven%20interconnected%20glowing%20node%20clusters%20forming%20an%20orchestration%20mesh%20each%20cluster%20radiating%20distinct%20warm%20color%20temperature%20emerald%20amber%20violet%20cyan%20gold%20rose%20and%20teal%20against%20a%20deep%20charcoal%20gradient%20background%20the%20nodes%20connected%20by%20precise%20geometric%20data%20flow%20lines%20representing%20multi%20agent%20coordination%20in%20a%20premium%20corporate%20operations%20center%20aesthetic%20no%20text%20no%20human%20figures&width=1920&height=600&seq=kos-orchestration-hub-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-20"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm mb-6">
              <i className="ri-cpu-line text-emerald-400 text-sm" />
              <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                KOS Multi-Agent Orchestration Framework™ — Big Four Standard
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              7 Pools. 51 Agents.
              <span className="block text-emerald-400 mt-2">Une orchestration unifiée.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              <strong className="text-white">{stats.totalPools} pools d'agents spécialisés</strong> orchestrés en temps réel.{' '}
              Matrice RACI complète, <strong className="text-white">{stats.workflowsActifs} workflows</strong> documentés,{' '}
              <strong className="text-white">{stats.niveauxEscalade} niveaux d'escalade</strong>,{' '}
              <strong className="text-white">{stats.reglesValidation} règles de validation</strong> strictes.{' '}
              Score Big Four moyen : <strong className="text-emerald-300">{stats.scoreBigFourMoyen}/100</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <i className="ri-stack-line text-emerald-400" />
                <span className="text-sm text-emerald-300 font-semibold">{stats.totalPools} Pools</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-400/30 backdrop-blur-sm">
                <i className="ri-robot-line text-violet-400" />
                <span className="text-sm text-violet-300 font-semibold">{stats.totalAgents} Agents</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <i className="ri-verified-badge-line text-amber-400" />
                <span className="text-sm text-amber-300 font-semibold">Score {stats.scoreQualiteMoyen}/100</span>
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

      {/* === TAB: OVERVIEW === */}
      {activeTab === 'overview' && (
        <>
          {/* Stats Row */}
          <section className="py-8 bg-white border-b border-background-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {[
                  { label: 'Pools', value: String(stats.totalPools), icon: 'ri-stack-line', color: '#0891B2' },
                  { label: 'Agents', value: String(stats.totalAgents), icon: 'ri-robot-line', color: '#7C3AED' },
                  { label: 'Workflows', value: String(stats.workflowsActifs), icon: 'ri-git-branch-line', color: '#0D7B5F' },
                  { label: 'Escalades', value: String(stats.niveauxEscalade), icon: 'ri-alert-line', color: '#C2410C' },
                  { label: 'Règles', value: String(stats.reglesValidation), icon: 'ri-shield-check-line', color: '#8B3040' },
                  { label: 'Score Big Four', value: String(stats.scoreBigFourMoyen), icon: 'ri-medal-line', color: '#9B7B2C' },
                  { label: 'Score Qualité', value: String(stats.scoreQualiteMoyen), icon: 'ri-verified-badge-line', color: '#5B21B6' },
                  { label: 'Livrables/mois', value: String(stats.livrablesMensuels), icon: 'ri-stack-line', color: '#E8943A' },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl bg-background-50 border border-background-200 p-4 text-center">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                      <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
                    </div>
                    <span className="block text-lg font-bold text-foreground-950 font-heading">{s.value}</span>
                    <span className="text-[10px] text-foreground-400">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7 Pools Overview */}
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Les 7 Pools d'Agents KOS™
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Chaque pool est une unité autonome d'agents spécialisés, avec ses propres KPIs, responsables et domaines d'expertise.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {pools.map((pool) => {
                  const badge = getStatusBadge(pool.statut);
                  const isExpanded = expandedPool === pool.id;
                  return (
                    <div
                      key={pool.id}
                      className={`rounded-2xl border transition-all duration-300 ${
                        isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200 hover:shadow-md'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedPool(isExpanded ? null : pool.id)}
                        className="w-full p-5 text-left flex items-start gap-4 cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${pool.color}15` }}>
                          <i className={`${pool.icon} text-xl`} style={{ color: pool.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-heading text-base font-bold text-foreground-950">{pool.name}</h3>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.bg} ${badge.border} ${badge.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />{badge.label}
                            </span>
                          </div>
                          <p className="text-sm text-foreground-500 line-clamp-1">{pool.mission}</p>
                          <div className="flex items-center gap-3 mt-1.5 text-xs">
                            <span className="text-foreground-400">{pool.agentCount} agents</span>
                            <span className="font-bold font-heading" style={{ color: pool.color }}>Big Four {pool.scoreBigFour}/100</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 pt-1">
                          <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="px-5 pb-5 border-t border-background-200 pt-4">
                          <p className="text-sm text-foreground-600 mb-4">{pool.description}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <div>
                              <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Domaines</h5>
                              <div className="flex flex-wrap gap-1">
                                {pool.domaines.map(d => (
                                  <span key={d} className="px-2 py-1 rounded-full text-[10px] font-medium bg-background-50 border border-background-200 text-foreground-600 whitespace-nowrap">{d}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Responsables</h5>
                              <div className="space-y-1">
                                {pool.responsables.map(r => (
                                  <p key={r} className="text-[10px] text-foreground-500">{r}</p>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">KPIs</h5>
                              <div className="space-y-1">
                                {pool.kpis.map(kpi => (
                                  <div key={kpi.label} className="flex items-center justify-between p-1 rounded bg-background-50">
                                    <span className="text-[10px] text-foreground-500">{kpi.label}</span>
                                    <span className="text-[10px] font-bold text-foreground-800">{kpi.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Agents ({pool.agentCount})</h5>
                          <div className="flex flex-wrap gap-1">
                            {pool.agents.map(a => (
                              <span key={a} className="px-2 py-1 rounded-full text-[10px] font-medium border whitespace-nowrap" style={{ backgroundColor: `${pool.color}10`, borderColor: `${pool.color}30`, color: pool.color }}>{a}</span>
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
        </>
      )}

      {/* === TAB: RACI === */}
      {activeTab === 'raci' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                Matrice RACI — 10 Activités, 4 Rôles
              </h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">
                Chaque activité KOS a un pool <strong>Responsible</strong> (R — exécute), un pool <strong>Accountable</strong> (A — valide), des pools <strong>Consulted</strong> (C) et <strong>Informed</strong> (I). Modèle Big Four.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {(['R', 'A', 'C', 'I'] as const).map(role => {
                  const rb = getRoleBadge(role);
                  return (
                    <div key={role} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-background-200">
                      <span className={`w-3 h-3 rounded-full ${rb.bg}`} />
                      <span className="text-xs font-bold text-foreground-700">{rb.label}</span>
                      <span className="text-xs text-foreground-400">({rb.desc})</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              {raci.map((entry) => (
                <div key={entry.activiteId} className="rounded-2xl bg-white border border-background-200 p-5 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-xs font-bold text-foreground-400 bg-background-100 px-2 py-1 rounded-lg flex-shrink-0">{entry.domaine}</span>
                    <div className="flex-1">
                      <h3 className="font-heading text-base font-bold text-foreground-950 mb-1">{entry.activite}</h3>
                      <div className="flex flex-wrap gap-2">
                        {entry.pools.map(p => {
                          const pool = pools.find(pp => pp.id === p.poolId);
                          const rb = getRoleBadge(p.role);
                          return (
                            <div
                              key={p.poolId}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-background-200 bg-background-50"
                            >
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white ${rb.bg}`}>{p.role}</span>
                              {pool && <i className={`${pool.icon} text-xs`} style={{ color: pool.color }} />}
                              <div>
                                <span className="text-xs font-bold text-foreground-700">{pool?.shortName || p.poolId}</span>
                                <span className="hidden sm:inline text-xs text-foreground-400 ml-2">{p.description}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: WORKFLOWS === */}
      {activeTab === 'workflows' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                {workflows.length} Workflows d'Orchestration
              </h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">
                Chaque workflow orchestre plusieurs pools en séquence. Traçabilité complète, contrôles à chaque étape, livrables standardisés.
              </p>
            </div>

            <div className="space-y-8">
              {workflows.map((wf) => {
                const isExpanded = expandedWorkflow === wf.id;
                return (
                  <div key={wf.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white'}`}>
                    <button
                      onClick={() => setExpandedWorkflow(isExpanded ? null : wf.id)}
                      className="w-full p-5 text-left cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-foreground-950 flex items-center justify-center flex-shrink-0">
                          <i className="ri-git-branch-line text-white text-xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-lg font-bold text-foreground-950 mb-1">{wf.nom}</h3>
                          <p className="text-sm text-foreground-500 line-clamp-1">{wf.description}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-foreground-400">
                            <span><i className="ri-flashlight-line mr-1" />{wf.trigger}</span>
                            <span><i className="ri-timer-line mr-1" />{wf.dureeTotale}</span>
                            <span><i className="ri-loop-left-line mr-1" />{wf.frequence}</span>
                            <span className="font-bold text-foreground-600 ml-auto">{wf.etapes.length} étapes</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 pt-1">
                          <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                        </div>
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200 pt-4">
                        <div className="space-y-3">
                          {wf.etapes.map((step, idx) => {
                            const statusStyle = getStepStatusStyle(step.statut);
                            return (
                              <div key={step.id} className="relative">
                                {idx < wf.etapes.length - 1 && (
                                  <div className="absolute left-[22px] top-12 bottom-0 w-0.5 bg-background-200" />
                                )}
                                <div className={`rounded-xl border p-4 ${statusStyle.bg} ${statusStyle.border}`}>
                                  <div className="flex items-start gap-3">
                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${step.poolColor}15` }}>
                                      <span className="font-heading font-bold text-sm" style={{ color: step.poolColor }}>{step.numero}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h4 className="text-sm font-bold text-foreground-950">{step.nom}</h4>
                                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}`}>
                                          <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />{statusStyle.badge}
                                        </span>
                                      </div>
                                      <p className="text-xs text-foreground-500 mb-2">{step.description}</p>
                                      <div className="flex flex-wrap items-center gap-3 text-[10px]">
                                        <span className="flex items-center gap-1 text-foreground-400">
                                          <i className="ri-timer-line" />{step.duree}
                                        </span>
                                        <span className="flex items-center gap-1 text-foreground-400">
                                          <i className="ri-stack-line" />{step.livrable}
                                        </span>
                                        {step.controles.map((c, ci) => (
                                          <span key={ci} className="px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-medium whitespace-nowrap">
                                            <i className="ri-checkbox-circle-line mr-0.5" />{c}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
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

      {/* === TAB: ESCALADES === */}
      {activeTab === 'escalades' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                {escalades.length} Niveaux d'Escalade
              </h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">
                Du correctif automatique (N1) à l'activation de la cellule de crise suprême (N5). Chaque niveau a des seuils de déclenchement, des délais maximums et des acteurs précis.
              </p>
            </div>

            <div className="space-y-5">
              {escalades.map((esc) => (
                <div key={esc.id} className="rounded-2xl border border-background-200 bg-white overflow-hidden hover:shadow-md transition-all">
                  <div className="flex items-stretch">
                    <div className="w-16 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${esc.couleur}10` }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${esc.couleur}20` }}>
                        <span className="font-heading font-bold text-xl" style={{ color: esc.couleur }}>N{esc.niveau}</span>
                      </div>
                    </div>
                    <div className="flex-1 p-5">
                      <h3 className="font-heading text-lg font-bold text-foreground-950 mb-1">{esc.nom}</h3>
                      <p className="text-sm text-foreground-500 mb-3">{esc.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-lg bg-background-50 p-3">
                          <p className="text-xs font-bold text-foreground-500 uppercase mb-1">Seuil de déclenchement</p>
                          <p className="text-xs text-foreground-700">{esc.seuilDeclenchement}</p>
                        </div>
                        <div className="rounded-lg bg-background-50 p-3">
                          <p className="text-xs font-bold text-foreground-500 uppercase mb-1">Délai maximum</p>
                          <p className="text-xs font-bold" style={{ color: esc.niveau >= 4 ? '#C2410C' : esc.couleur }}>{esc.delaiMax}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs font-bold text-foreground-400 uppercase mb-2">Acteurs</p>
                        <div className="flex flex-wrap gap-1.5">
                          {esc.acteurs.map(a => (
                            <span key={a} className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-background-50 border border-background-200 text-foreground-600 whitespace-nowrap">{a}</span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs font-bold text-foreground-400 uppercase mb-2">Actions</p>
                        <div className="space-y-1">
                          {esc.actions.map((a, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                              <i className="ri-arrow-right-s-line text-foreground-400 flex-shrink-0 mt-px" />
                              {a}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: RÈGLES DE VALIDATION === */}
      {activeTab === 'regles' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                {regles.length} Règles de Validation Strictes
              </h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">
                Chaque règle est non-négociable. Le non-respect déclenche une conséquence automatique, du blocage de diffusion à l'escalade COMEX.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regles.map((rv) => {
                const sev = getSeverityStyle(rv.severite);
                return (
                  <div key={rv.id} className={`rounded-2xl border ${sev.bg} ${sev.border} p-5 hover:shadow-md transition-all`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-sm text-white ${sev.dot}`}>
                        {String(rv.numero).padStart(2, '0')}
                      </span>
                      <span className="text-xs font-bold text-foreground-400 bg-white/60 px-2 py-0.5 rounded-full">{rv.domaine}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ml-auto ${sev.bg} ${sev.border} ${sev.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} />
                        {rv.severite.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-heading text-sm font-bold text-foreground-950 mb-2">{rv.regle}</h3>
                    <p className="text-xs text-foreground-600 leading-relaxed mb-3">{rv.description}</p>
                    <div className="space-y-2">
                      <div className="rounded-lg bg-white/80 p-2.5">
                        <p className="text-[10px] font-bold text-foreground-400 uppercase mb-0.5">Seuil</p>
                        <p className="text-xs text-foreground-700 font-bold">{rv.seuil}</p>
                      </div>
                      <div className={`rounded-lg p-2.5 ${rv.severite === 'critique' ? 'bg-red-100/80 border border-red-200' : 'bg-amber-100/80 border border-amber-200'}`}>
                        <p className="text-[10px] font-bold text-foreground-400 uppercase mb-0.5">Conséquence en cas de non-respect</p>
                        <p className="text-xs text-foreground-700">{rv.consequence}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: KPIs === */}
      {activeTab === 'kpis' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                KPIs Consolidés — 18 Indicateurs
              </h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">
                6 KPIs Temps · 6 KPIs Qualité · 6 KPIs Productivité. Mesure continue de la performance des 7 pools d'agents.
              </p>
            </div>

            {/* KPI Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {[
                { label: 'Temps réponse moyen', value: stats.tempsReponseMoyen, icon: 'ri-timer-line', color: '#0891B2' },
                { label: 'Score qualité', value: `${stats.scoreQualiteMoyen}/100`, icon: 'ri-verified-badge-line', color: '#5B21B6' },
                { label: 'Taux automatisation', value: `${stats.tauxAutomatisation}%`, icon: 'ri-cpu-line', color: '#0D7B5F' },
                { label: 'SLA respectés', value: stats.slaRespectes, icon: 'ri-check-double-line', color: '#86BC25' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-foreground-950 text-white p-5 text-center">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.color}25` }}>
                    <i className={`${s.icon} text-lg`} style={{ color: s.color }} />
                  </div>
                  <span className="block text-2xl font-bold font-heading">{s.value}</span>
                  <span className="text-xs text-gray-400">{s.label}</span>
                </div>
              ))}
            </div>

            {/* 3 KPI Categories */}
            {(['temps', 'qualite', 'productivite'] as const).map((cat) => {
              const catKPIs = kpisByCategorie[cat];
              const catLabels = { temps: 'Temps de Traitement', qualite: 'Qualité', productivite: 'Productivité' };
              const catColors = { temps: '#0891B2', qualite: '#5B21B6', productivite: '#86BC25' };
              return (
                <div key={cat} className="mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${catColors[cat]}15` }}>
                      <i className={`${cat === 'temps' ? 'ri-timer-line' : cat === 'qualite' ? 'ri-verified-badge-line' : 'ri-cpu-line'} text-lg`} style={{ color: catColors[cat] }} />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground-950">{catLabels[cat]} ({catKPIs.length} KPIs)</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catKPIs.map((kpi) => {
                      const pool = kpi.poolId !== 'all' ? pools.find(p => p.id === kpi.poolId) : null;
                      const trendUp = kpi.tendance.startsWith('+');
                      const trendColor = trendUp ? '#86BC25' : '#C2410C';
                      return (
                        <div key={kpi.id} className="rounded-2xl border border-background-200 bg-white p-5 hover:shadow-md transition-all">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${catColors[cat]}15` }}>
                              <i className={`${kpi.icon} text-sm`} style={{ color: catColors[cat] }} />
                            </div>
                            {pool && (
                              <span className="text-[10px] text-foreground-400 bg-background-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <i className={`${pool.icon} text-xs`} style={{ color: pool.color }} />{pool.shortName}
                              </span>
                            )}
                          </div>
                          <div className="flex items-baseline justify-between mb-1">
                            <span className="text-2xl font-bold font-heading text-foreground-950">{kpi.valeurActuelle}</span>
                            <span className="text-xs text-foreground-400">Cible <span className="font-bold text-foreground-600">{kpi.cible}</span></span>
                          </div>
                          <p className="text-xs font-bold text-foreground-700 mb-1">{kpi.nom}</p>
                          <p className="text-xs text-foreground-500 leading-relaxed mb-2">{kpi.description}</p>
                          <span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: trendColor }}>
                            <i className={trendUp ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} />
                            {kpi.tendance} {kpi.unite}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Cross-link */}
      <section className="py-12 sm:py-16 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              Écosystème KOS — Orchestration & Performance
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'Global Agent Scan', path: '/kos-global-agent-performance', icon: 'ri-radar-line', color: '#4F46E5' },
              { label: 'Orchestrator Engine', path: '/kos-orchestrator-engine', icon: 'ri-git-branch-line', color: '#0D7B5F' },
              { label: 'Auto-Task Orchestrator', path: '/kos-auto-task-orchestrator', icon: 'ri-cpu-line', color: '#86BC25' },
              { label: 'AI Governance', path: '/kos-ai-governance-ethics', icon: 'ri-robot-line', color: '#5B21B6' },
              { label: 'KPI Tower', path: '/kos-enterprise-kpi-command', icon: 'ri-bar-chart-grouped-line', color: '#9B7B2C' },
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





