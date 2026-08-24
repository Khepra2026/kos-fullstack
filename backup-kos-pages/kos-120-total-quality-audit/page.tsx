import { useState } from 'react';
import { useKOS120TotalQualityAudit } from '@/hooks/useKOS120TotalQualityAudit';
import { AnimatedCounter } from '@/components/base/AnimatedCounter';

const TABS = [
  { id: 'overview' as const, label: 'Vue d\'Ensemble', icon: 'ri-dashboard-3-line' },
  { id: 'blocks' as const, label: 'Audit Blocs', icon: 'ri-stack-line' },
  { id: 'automates' as const, label: 'Automates Qualité', icon: 'ri-robot-3-line' },
  { id: 'optimization' as const, label: 'Optimisation Système', icon: 'ri-rocket-2-line' },
  { id: 'certification' as const, label: 'Certification 120%', icon: 'ri-award-line' },
];

const STATUS_COLORS: Record<string, string> = {
  optimal: 'bg-accent-100 text-accent-900',
  stable: 'bg-secondary-100 text-secondary-900',
  degraded: 'bg-amber-100 text-amber-900',
  critical: 'bg-red-100 text-red-900',
};

const STATUS_LABELS: Record<string, string> = {
  optimal: 'Optimal',
  stable: 'Stable',
  degraded: 'Dégradé',
  critical: 'Critique',
};

const PRIORITY_COLORS: Record<string, string> = {
  P0: 'bg-red-100 text-red-900',
  P1: 'bg-amber-100 text-amber-900',
  P2: 'bg-secondary-100 text-secondary-900',
};

const SEVERITY_ICONS: Record<string, string> = {
  critical: 'ri-alert-fill text-red-600',
  high: 'ri-error-warning-fill text-amber-600',
  medium: 'ri-information-fill text-secondary-500',
  low: 'ri-checkbox-circle-fill text-accent-500',
};

const CERT_STATUS_LABELS: Record<string, string> = {
  certified: 'Certifié',
  in_progress: 'En Cours',
  planned: 'Planifié',
  blocked: 'Bloqué',
};

const CERT_STATUS_COLORS: Record<string, string> = {
  certified: 'bg-accent-100 text-accent-900',
  in_progress: 'bg-secondary-100 text-secondary-900',
  planned: 'bg-background-200 text-foreground-700',
  blocked: 'bg-red-100 text-red-900',
};

export default function KOS120TotalQualityAuditPage() {
  const {
    meta, kpis, blocks, automates, optimizations, certifications,
    loading, activeTab, setActiveTab,
    filteredOptimizations, optimizationFilter, setOptimizationFilter,
  } = useKOS120TotalQualityAudit();
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);
  const [expandedOpt, setExpandedOpt] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground-700 text-sm">Scan qualité totale en cours...</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-accent-500';
    if (score >= 75) return 'text-foreground-950';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-accent-500';
    if (score >= 75) return 'bg-foreground-950';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getBlockRingColor = (score: number) => {
    if (score >= 90) return '#86BC25';
    if (score >= 75) return '#9B7B2C';
    if (score >= 60) return '#EA580C';
    return '#DC2626';
  };

  return (
    <div className="min-h-screen bg-background-50">
      {/* Header */}
      <div className="bg-gradient-to-b from-background-100 to-background-50 border-b border-background-200/70">
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
              <i className="ri-shield-check-line text-xl text-background-50"></i>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground-950">
                Audit Qualité Totale 120% Big Four
              </h1>
              <p className="text-sm text-foreground-600">
                {meta.assessor} — {meta.auditDate}
              </p>
            </div>
          </div>

          {/* KPIs Row */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mt-6">
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className={`text-3xl font-bold ${getScoreColor(kpis.globalQualityScore)}`}>
                <AnimatedCounter value={kpis.globalQualityScore} decimals={1} />
              </div>
              <div className="text-xs text-foreground-600 mt-1">Score Qualité Global</div>
            </div>
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className="text-3xl font-bold text-foreground-950">{kpis.blocksScanned}</div>
              <div className="text-xs text-foreground-600 mt-1">Blocs Scannés</div>
            </div>
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className="text-3xl font-bold text-red-600">{kpis.criticalOpen}</div>
              <div className="text-xs text-foreground-600 mt-1">Critiques Ouverts</div>
            </div>
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className="text-3xl font-bold text-accent-500">{kpis.totalFixed}</div>
              <div className="text-xs text-foreground-600 mt-1">Corrections Appliquées</div>
            </div>
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className="text-3xl font-bold text-foreground-950">{kpis.optimizationsIdentified}</div>
              <div className="text-xs text-foreground-600 mt-1">Optimisations Identifiées</div>
            </div>
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className="text-3xl font-bold text-accent-500">{kpis.certificationsAchieved}/{kpis.certificationsTotal}</div>
              <div className="text-xs text-foreground-600 mt-1">Certifications</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-background-200/70 bg-background-50 sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-foreground-600 hover:text-foreground-900'
                }`}
              >
                <i className={`${tab.icon} text-base`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-8">
        {/* ========== OVERVIEW TAB ========== */}
        {activeTab === 'overview' && (
          <div>
            {/* Global Radar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-1 bg-background-50 rounded-2xl border border-background-200/70 p-6">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4">Score Qualité Global</h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8" className="text-background-200" />
                      <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8"
                        strokeDasharray={`${(kpis.globalQualityScore / 100) * 327} 327`}
                        strokeLinecap="round"
                        className={getScoreColor(kpis.globalQualityScore).replace('text-', 'text-').replace('text-', '')}
                        style={{ color: kpis.globalQualityScore >= 90 ? '#86BC25' : kpis.globalQualityScore >= 75 ? '#9B7B2C' : kpis.globalQualityScore >= 60 ? '#EA580C' : '#DC2626' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-4xl font-bold ${getScoreColor(kpis.globalQualityScore)}`}>
                        <AnimatedCounter value={kpis.globalQualityScore} decimals={1} />
                      </span>
                      <span className="text-xs text-foreground-600">/100</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 bg-background-50 rounded-2xl border border-background-200/70 p-6">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4">Distribution des Blocs</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-accent-50 rounded-xl">
                    <div className="text-2xl font-bold text-accent-500">{kpis.blocksOptimal}</div>
                    <div className="text-xs text-foreground-600 mt-1">Optimaux</div>
                  </div>
                  <div className="text-center p-4 bg-secondary-50 rounded-xl">
                    <div className="text-2xl font-bold text-foreground-950">{kpis.blocksStable}</div>
                    <div className="text-xs text-foreground-600 mt-1">Stables</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-xl">
                    <div className="text-2xl font-bold text-amber-600">{kpis.blocksDegraded}</div>
                    <div className="text-xs text-foreground-600 mt-1">Dégradés</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-xl">
                    <div className="text-2xl font-bold text-red-600">{kpis.blocksCritical}</div>
                    <div className="text-xs text-foreground-600 mt-1">Critiques</div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-foreground-600 mb-1">Effort Total Estimé</div>
                    <div className="text-lg font-semibold text-foreground-950">{kpis.estimatedTotalEffort}</div>
                  </div>
                  <div>
                    <div className="text-xs text-foreground-600 mb-1">Budget Total Estimé</div>
                    <div className="text-lg font-semibold text-foreground-950">{kpis.estimatedTotalBudget}</div>
                  </div>
                  <div>
                    <div className="text-xs text-foreground-600 mb-1">Complétion Projetée</div>
                    <div className="text-lg font-semibold text-foreground-950">{kpis.projectedCompletion}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Block Summary Cards */}
            <h3 className="text-sm font-semibold text-foreground-950 mb-4">Synthèse par Bloc</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {blocks.map(block => (
                <div key={block.blockId} className="bg-background-50 rounded-xl border border-background-200/70 p-5 hover:border-background-300/60 transition-colors cursor-pointer"
                  onClick={() => { setActiveTab('blocks'); setExpandedBlock(block.blockId); }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: block.color + '15' }}>
                        <i className={`${block.icon} text-sm`} style={{ color: block.color }}></i>
                      </div>
                      <span className="text-sm font-medium text-foreground-950">{block.blockName}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[block.status]}`}>
                      {STATUS_LABELS[block.status]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="h-2 bg-background-200 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{
                          width: `${block.overallScore}%`,
                          backgroundColor: getBlockRingColor(block.overallScore),
                        }}></div>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${getScoreColor(block.overallScore)}`}>
                      {block.overallScore}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-foreground-600">
                    <span>{block.agents} agents</span>
                    <span>·</span>
                    <span className="text-red-600">{block.findings.critical} crit.</span>
                    <span>·</span>
                    <span className="text-amber-600">{block.findings.major} maj.</span>
                    <span>·</span>
                    <span className="text-accent-500">{block.fixed} fix</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== BLOCKS TAB ========== */}
        {activeTab === 'blocks' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground-950">Audit Intégrité par Bloc</h2>
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-500"></span> Optimal ({kpis.blocksOptimal})</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-foreground-950"></span> Stable ({kpis.blocksStable})</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600"></span> Critique ({kpis.blocksCritical})</span>
              </div>
            </div>
            <div className="space-y-4">
              {blocks.map(block => (
                <div key={block.blockId} className="bg-background-50 rounded-2xl border border-background-200/70 overflow-hidden">
                  <button
                    onClick={() => setExpandedBlock(expandedBlock === block.blockId ? null : block.blockId)}
                    className="w-full flex items-center justify-between p-5 hover:bg-background-100/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: block.color + '15' }}>
                        <i className={`${block.icon} text-lg`} style={{ color: block.color }}></i>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground-950">{block.blockName}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[block.status]}`}>
                            {STATUS_LABELS[block.status]}
                          </span>
                        </div>
                        <div className="text-xs text-foreground-600 mt-0.5">{block.agents} agents · Score Big Four: {block.bigFourAlignment}%</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <div className="flex gap-3 text-xs">
                          <span className="text-red-600">{block.findings.critical} critiques</span>
                          <span className="text-amber-600">{block.findings.major} majeurs</span>
                          <span className="text-accent-500">{block.fixed} corrigés</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold ${getScoreColor(block.overallScore)}`}>{block.overallScore}%</span>
                        <i className={`ri-${expandedBlock === block.blockId ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-600`}></i>
                      </div>
                    </div>
                  </button>
                  {expandedBlock === block.blockId && (
                    <div className="px-5 pb-5 border-t border-background-200/70 pt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4">
                        {[
                          { label: 'Intégrité', value: block.integrityScore },
                          { label: 'Qualité', value: block.qualityScore },
                          { label: 'Conformité', value: block.complianceScore },
                          { label: 'Performance', value: block.performanceScore },
                          { label: 'Align. Big Four', value: block.bigFourAlignment },
                        ].map(metric => (
                          <div key={metric.label} className="text-center p-3 bg-background-100/50 rounded-xl">
                            <div className={`text-lg font-bold ${getScoreColor(metric.value)}`}>{metric.value}%</div>
                            <div className="text-xs text-foreground-600 mt-0.5">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-background-100/50 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <i className="ri-error-warning-line text-amber-600 mt-0.5"></i>
                          <div>
                            <div className="text-sm font-medium text-foreground-950 mb-1">Problème Clé</div>
                            <div className="text-sm text-foreground-700">{block.keyIssue}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 mt-3">
                          <i className="ri-lightbulb-line text-accent-500 mt-0.5"></i>
                          <div>
                            <div className="text-sm font-medium text-foreground-950 mb-1">Recommandation</div>
                            <div className="text-sm text-foreground-700">{block.recommendation}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== AUTOMATES TAB ========== */}
        {activeTab === 'automates' && (
          <div>
            <h2 className="text-lg font-semibold text-foreground-950 mb-6">Audit des Automates Qualité & Conformité</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {automates.map(auto => (
                <div key={auto.id} className="bg-background-50 rounded-xl border border-background-200/70 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-900">
                          {auto.system === 'regulatory' ? 'Réglementaire' : 'Qualité'}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          auto.status === 'deployed' ? 'bg-accent-100 text-accent-900' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {auto.status === 'deployed' ? 'Déployé' : 'Partiel'}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground-950">{auto.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getScoreColor(auto.score)}`}>{auto.score}%</div>
                      <div className="text-xs text-foreground-600">Big Four: {auto.bigFourScore}%</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3 text-xs">
                    <div><span className="text-foreground-600">Audits:</span> <span className="font-medium text-foreground-950">{auto.auditsCompleted.toLocaleString()}</span></div>
                    <div><span className="text-foreground-600">NC:</span> <span className="font-medium text-foreground-950">{auto.nonConformities}</span></div>
                    <div><span className="text-foreground-600">Effort:</span> <span className="font-medium text-foreground-950">{auto.effort}</span></div>
                  </div>
                  <div className="bg-background-100/50 rounded-lg p-3 text-xs">
                    <div className="flex items-start gap-2 mb-1">
                      <i className="ri-error-warning-line text-amber-600 mt-0.5"></i>
                      <span className="text-foreground-700">{auto.gap}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <i className="ri-rocket-line text-accent-500 mt-0.5"></i>
                      <span className="text-foreground-700">{auto.optimization} — {auto.impact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== OPTIMIZATION TAB ========== */}
        {activeTab === 'optimization' && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-foreground-950">Plan d'Optimisation Système</h2>
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'all', label: 'Toutes' },
                  { id: 'p0', label: 'P0 — Critiques' },
                  { id: 'in_progress', label: 'En Cours' },
                  { id: 'security', label: 'Sécurité' },
                  { id: 'compliance', label: 'Conformité' },
                  { id: 'performance', label: 'Performance' },
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setOptimizationFilter(f.id)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                      optimizationFilter === f.id
                        ? 'bg-primary-500 text-background-50'
                        : 'bg-background-100 text-foreground-700 hover:bg-background-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {filteredOptimizations.map(opt => (
                <div key={opt.id} className="bg-background-50 rounded-2xl border border-background-200/70 overflow-hidden">
                  <button
                    onClick={() => setExpandedOpt(expandedOpt === opt.id ? null : opt.id)}
                    className="w-full flex items-center justify-between p-5 hover:bg-background-100/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[opt.priority]}`}>
                          {opt.priority}
                        </span>
                        {opt.status === 'in_progress' && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-900">En cours</span>
                        )}
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <div className="text-sm font-medium text-foreground-950 truncate">{opt.title}</div>
                        <div className="text-xs text-foreground-600 mt-0.5">{opt.block} · {opt.effort} · {opt.budget}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <div className="text-right hidden sm:block">
                        <div className="text-xs text-accent-500 font-medium">{opt.roi}</div>
                      </div>
                      <i className={`ri-${expandedOpt === opt.id ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-600`}></i>
                    </div>
                  </button>
                  {expandedOpt === opt.id && (
                    <div className="px-5 pb-5 border-t border-background-200/70 pt-4">
                      <p className="text-sm text-foreground-700 mb-4">{opt.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="bg-background-100/50 rounded-xl p-3">
                          <div className="text-xs text-foreground-600">Avant</div>
                          <div className="text-sm font-medium text-red-600">{opt.kpiBefore}</div>
                        </div>
                        <div className="bg-background-100/50 rounded-xl p-3">
                          <div className="text-xs text-foreground-600">Après</div>
                          <div className="text-sm font-medium text-accent-500">{opt.kpiAfter}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-foreground-600">
                        <span>Deadline: <span className="font-medium text-foreground-950">{opt.deadline}</span></span>
                        <span>·</span>
                        <span>Assigné: <span className="font-medium text-foreground-950">{opt.assigned}</span></span>
                        {opt.dependencies.length > 0 && (
                          <>
                            <span>·</span>
                            <span>Dépend de: <span className="font-medium text-amber-600">{opt.dependencies.join(', ')}</span></span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== CERTIFICATION TAB ========== */}
        {activeTab === 'certification' && (
          <div>
            <h2 className="text-lg font-semibold text-foreground-950 mb-6">Progression Certification 120% Big Four</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {certifications.map(cert => (
                <div key={cert.certificationId} className="bg-background-50 rounded-xl border border-background-200/70 p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-background-100 flex items-center justify-center">
                        <i className={`${cert.icon} text-lg text-foreground-950`}></i>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground-950">{cert.name}</h3>
                        <div className="text-xs text-foreground-600">{cert.issuer} · Deadline: {cert.deadline}</div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${CERT_STATUS_COLORS[cert.status]}`}>
                      {CERT_STATUS_LABELS[cert.status]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1">
                      <div className="h-2.5 bg-background-200 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{
                          width: `${(cert.currentScore / cert.targetScore) * 100}%`,
                          backgroundColor: cert.status === 'certified' ? '#86BC25' : cert.currentScore >= 80 ? '#9B7B2C' : cert.currentScore >= 60 ? '#EA580C' : '#DC2626',
                        }}></div>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${cert.status === 'certified' ? 'text-accent-500' : getScoreColor(cert.currentScore)}`}>
                      {cert.currentScore}/{cert.targetScore}
                    </span>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span className="text-red-600">{cert.gaps} gaps</span>
                    <span className="text-foreground-600">·</span>
                    <span className="text-accent-500">{cert.resolved} résolus</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Meta */}
        <div className="mt-12 pt-6 border-t border-background-200/70">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-foreground-600">
            <span>Audit ID: <span className="font-mono text-foreground-950">{meta.auditId}</span></span>
            <span>Scope: {meta.scope}</span>
            <span>Méthodologie: {meta.methodology}</span>
            <span>Prochain audit: {meta.nextAuditScheduled}</span>
          </div>
        </div>
      </div>
    </div>
  );
}





