import { useState } from 'react';
import { useKOSTestsParBloc } from '@/hooks/useKOSTestsParBloc';
import { AnimatedCounter } from '@/components/base/AnimatedCounter';
import hubLayout from '@/components/feature/hubLayout';
import type { TestBloc, TestFinding, CorrectifAction } from '@/mocks/testsParBloc';

const STATUS_CONFIG: Record<string, { label: string; className: string; dot: string }> = {
  optimal: { label: 'Optimal', className: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  conforme: { label: 'Conforme', className: 'bg-secondary-100 text-secondary-700 border-secondary-200', dot: 'bg-secondary-500' },
  surveillance: { label: 'Surveillance', className: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  critique: { label: 'Critique', className: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500' },
};

const SEVERITY_CONFIG: Record<string, { label: string; className: string }> = {
  critical: { label: 'Critique', className: 'bg-red-100 text-red-700' },
  high: { label: 'Élevé', className: 'bg-amber-100 text-amber-700' },
  medium: { label: 'Moyen', className: 'bg-secondary-100 text-secondary-700' },
  low: { label: 'Faible', className: 'bg-background-200 text-foreground-600' },
};

const PRIORITY_CONFIG: Record<string, string> = {
  P0: 'bg-red-100 text-red-700',
  P1: 'bg-amber-100 text-amber-700',
  P2: 'bg-secondary-100 text-secondary-700',
};

const TYPE_CONFIG: Record<string, string> = {
  auto: 'bg-emerald-100 text-emerald-700',
  'semi-auto': 'bg-accent-100 text-accent-700',
  manual: 'bg-background-200 text-foreground-600',
};

const CORRECTIF_STATUS_CONFIG: Record<string, string> = {
  pending: 'bg-background-200 text-foreground-600',
  running: 'bg-accent-100 text-accent-700',
  completed: 'bg-emerald-100 text-emerald-700',
  blocked: 'bg-red-100 text-red-700',
};

const CATEGORY_LABELS: Record<string, string> = {
  conformite: 'Conformité',
  harmonie: 'Harmonie',
  'qualite-ressources': 'Qualité Ressources',
  seo: 'SEO',
  geo: 'GEO',
  'ai-visibility': 'AI Visibility',
  faq: 'FAQ',
  backlink: 'Backlink',
  nurturing: 'Nurturing',
  'big-four-150': '150% Big Four',
};

const CATEGORY_ICONS: Record<string, string> = {
  conformite: 'ri-scales-3-line',
  harmonie: 'ri-puzzle-2-line',
  'qualite-ressources': 'ri-database-2-line',
  seo: 'ri-search-eye-line',
  geo: 'ri-radar-line',
  'ai-visibility': 'ri-robot-2-line',
  faq: 'ri-question-answer-line',
  backlink: 'ri-link-m',
  nurturing: 'ri-heart-pulse-line',
  'big-four-150': 'ri-rocket-2-line',
};

function RadialGauge({ value, target, size = 56, strokeWidth = 5 }: { value: number; target: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const pct = Math.min(value / target, 1);
  const offset = circumference - pct * circumference;
  const color = value >= 85 ? '#86BC25' : value >= 72 ? '#9B7B2C' : value >= 60 ? '#EA580C' : '#DC2626';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <span className="absolute text-sm font-bold text-foreground-950">{value}</span>
    </div>
  );
}

function TrendBadge({ trend, value }: { trend: 'up' | 'stable' | 'down'; value: number }) {
  if (trend === 'up') return <span className="text-xs text-emerald-600 font-medium flex items-center gap-0.5"><i className="ri-arrow-up-line text-xs"></i>+{value}</span>;
  if (trend === 'down') return <span className="text-xs text-red-600 font-medium flex items-center gap-0.5"><i className="ri-arrow-down-line text-xs"></i>-{value}</span>;
  return <span className="text-xs text-foreground-500 font-medium">—</span>;
}

export default function testsParBlocPage() {
  const {
    meta, kpis, blocs, selectedBloc, setSelectedBloc,
    activeTab, setActiveTab, categoryFilter, setCategoryFilter,
    filteredBlocs, allFindings, allCorrectifs,
    severityFilter, setSeverityFilter, correctifFilter, setCorrectifFilter,
    filteredFindings, filteredCorrectifs,
    loading, scanning, runAllTests, lastScanResult,
  } = useKOSTestsParBloc();
  const [expandedBloc, setExpandedBloc] = useState<string | null>(null);

  if (loading) {
    return (
      <hubLayout hubId={0} activeTab="overview" tabLabel="Tests par Bloc">
        <div className="min-h-screen bg-background-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-foreground-700 text-sm">Scan des 10 blocs en cours...</p>
          </div>
        </div>
      </hubLayout>
    );
  }

  const tabs = [
    { id: 'overview' as const, label: 'Vue d\'Ensemble', icon: 'ri-dashboard-3-line' },
    { id: 'detail' as const, label: 'Détail par Bloc', icon: 'ri-stack-line' },
    { id: 'correctifs' as const, label: 'Correctifs', icon: 'ri-tools-line' },
    { id: 'tous' as const, label: 'Tous les Findings', icon: 'ri-file-list-3-line' },
  ];

  return (
    <hubLayout hubId={0} activeTab={activeTab} tabLabel="Tests par Bloc">
      <div className="min-h-screen bg-background-50">
        {/* ============ HEADER ============ */}
        <div className="bg-gradient-to-b from-background-100 to-background-50 border-b border-background-200/70">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-6 md:py-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary-500 flex items-center justify-center flex-shrink-0">
                  <i className="ri-shield-check-line text-xl text-background-50"></i>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl md:text-2xl font-heading font-bold text-foreground-950">
                      KOS Tests par Bloc Correctifs
                    </h1>
                    <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-2 py-0.5 rounded-full">150% Big Four</span>
                  </div>
                  <p className="text-xs md:text-sm text-foreground-600 mt-0.5">
                    {meta.assessor} — {meta.auditDate.split('T')[0]}
                  </p>
                </div>
              </div>
              <button
                onClick={runAllTests}
                disabled={scanning}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-background-50 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap"
              >
                <i className={`${scanning ? 'ri-loader-4-line animate-spin' : 'ri-play-circle-line'}`}></i>
                {scanning ? 'Scan en cours...' : 'Lancer Tous les Tests'}
              </button>
            </div>
            {lastScanResult && (
              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 flex items-center gap-2">
                <i className="ri-check-double-line"></i>
                {lastScanResult}
              </div>
            )}
            {scanning && (
              <div className="mt-3 flex items-center gap-3 text-sm text-foreground-600">
                <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                Exécution parallèle des 10 blocs — {Math.floor(Math.random() * 90 + 10)}%...
              </div>
            )}

            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mt-5">
              <div className="bg-background-50 rounded-xl border border-background-200/70 p-3 text-center">
                <div className="text-xl md:text-2xl font-bold text-foreground-950">
                  <AnimatedCounter value={kpis.globalScore} decimals={1} />
                </div>
                <div className="text-[10px] md:text-xs text-foreground-600 mt-0.5">Score Global</div>
              </div>
              <div className="bg-background-50 rounded-xl border border-background-200/70 p-3 text-center">
                <div className="text-xl md:text-2xl font-bold text-foreground-950">{kpis.blocsOptimal}/{kpis.blocsTotal}</div>
                <div className="text-[10px] md:text-xs text-foreground-600 mt-0.5">Blocs Optimaux</div>
              </div>
              <div className="bg-background-50 rounded-xl border border-background-200/70 p-3 text-center">
                <div className="text-xl md:text-2xl font-bold text-red-600">{kpis.blocsCritique + kpis.blocsSurveillance}</div>
                <div className="text-[10px] md:text-xs text-foreground-600 mt-0.5">Sous Surveillance</div>
              </div>
              <div className="bg-background-50 rounded-xl border border-background-200/70 p-3 text-center">
                <div className="text-xl md:text-2xl font-bold text-foreground-950">{kpis.totalTests.toLocaleString()}</div>
                <div className="text-[10px] md:text-xs text-foreground-600 mt-0.5">Tests Exécutés</div>
              </div>
              <div className="bg-background-50 rounded-xl border border-background-200/70 p-3 text-center">
                <div className="text-xl md:text-2xl font-bold text-red-600">{kpis.findingsCritical}</div>
                <div className="text-[10px] md:text-xs text-foreground-600 mt-0.5">Critiques</div>
              </div>
              <div className="bg-background-50 rounded-xl border border-background-200/70 p-3 text-center">
                <div className="text-xl md:text-2xl font-bold text-foreground-950">{kpis.totalCorrectifs}</div>
                <div className="text-[10px] md:text-xs text-foreground-600 mt-0.5">Correctifs</div>
              </div>
              <div className="bg-background-50 rounded-xl border border-background-200/70 p-3 text-center">
                <div className="text-xl md:text-2xl font-bold text-accent-600">{kpis.averageBigFourAlignment}%</div>
                <div className="text-[10px] md:text-xs text-foreground-600 mt-0.5">Align. Big Four</div>
              </div>
            </div>
          </div>
        </div>

        {/* ============ TABS ============ */}
        <div className="border-b border-background-200/70 bg-background-50 sticky top-0 z-10">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6">
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
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

        {/* ============ CONTENT ============ */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* ========== OVERVIEW TAB ========== */}
          {activeTab === 'overview' && (
            <div>
              {/* Blocs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {blocs.map(bloc => (
                  <div
                    key={bloc.id}
                    onClick={() => { setSelectedBloc(bloc); setActiveTab('detail'); }}
                    className="bg-background-50 rounded-xl border border-background-200/70 p-5 hover:border-background-300/60 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: bloc.color + '18' }}>
                          <i className={`${bloc.icon} text-base`} style={{ color: bloc.color }}></i>
                        </div>
                        <span className="text-sm font-semibold text-foreground-950">{bloc.shortName}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${STATUS_CONFIG[bloc.status].className}`}>
                        {STATUS_CONFIG[bloc.status].label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <RadialGauge value={bloc.score} target={bloc.targetScore} size={52} strokeWidth={4} />
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-1">
                          <TrendBadge trend={bloc.trend} value={bloc.trendValue} />
                        </div>
                        <div className="flex gap-2 text-[10px] text-foreground-500">
                          <span>{bloc.testsExecution.toLocaleString()} tests</span>
                          <span>·</span>
                          <span>{bloc.agents} agents</span>
                        </div>
                        <div className="flex gap-2 text-[10px] mt-0.5">
                          <span className="text-red-600">{bloc.findings.filter(f => f.severity === 'critical').length} crit.</span>
                          <span className="text-amber-600">{bloc.findings.filter(f => f.severity === 'high').length} élevés</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-1.5 bg-background-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${bloc.score}%`, backgroundColor: bloc.color }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-foreground-500 mt-1.5">
                      <span>Score: {bloc.score}</span>
                      <span>Cible: {bloc.targetScore}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Score Distribution + Findings Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6">
                  <h3 className="text-sm font-semibold text-foreground-950 mb-4">Distribution des Scores</h3>
                  <div className="space-y-3">
                    {blocs.sort((a, b) => b.score - a.score).map(bloc => (
                      <div key={bloc.id} className="flex items-center gap-3">
                        <span className="text-xs font-medium text-foreground-800 w-24 whitespace-nowrap truncate">{bloc.shortName}</span>
                        <div className="flex-1 flex items-center gap-2">
                          <div className="flex-1 h-2 bg-background-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${bloc.score}%`, backgroundColor: bloc.color }}></div>
                          </div>
                          <span className="text-xs font-bold text-foreground-950 w-7 text-right">{bloc.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6">
                  <h3 className="text-sm font-semibold text-foreground-950 mb-4">Synthèse Findings — Tous Blocs</h3>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="bg-red-50 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-red-600">{kpis.findingsCritical}</div>
                      <div className="text-[10px] text-red-600">Critiques</div>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-amber-600">{kpis.findingsHigh}</div>
                      <div className="text-[10px] text-amber-600">Élevés</div>
                    </div>
                    <div className="bg-secondary-50 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-foreground-950">{kpis.findingsMedium}</div>
                      <div className="text-[10px] text-foreground-600">Moyens</div>
                    </div>
                    <div className="bg-background-100 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-foreground-950">{kpis.findingsLow}</div>
                      <div className="text-[10px] text-foreground-600">Faibles</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-background-100/50 rounded-lg p-3">
                      <span className="text-foreground-600">Tests réussis</span>
                      <div className="font-bold text-emerald-600 text-lg">{kpis.testsPassed.toLocaleString()}</div>
                    </div>
                    <div className="bg-background-100/50 rounded-lg p-3">
                      <span className="text-foreground-600">Tests échoués</span>
                      <div className="font-bold text-red-600 text-lg">{kpis.testsFailed.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Correctifs Summary */}
              <div className="mt-6 bg-background-50 rounded-2xl border border-background-200/70 p-6">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4">État des Correctifs</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div className="text-center p-3 bg-background-100/50 rounded-xl">
                    <div className="text-lg font-bold text-foreground-950">{kpis.totalCorrectifs}</div>
                    <div className="text-[10px] text-foreground-600">Total</div>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded-xl">
                    <div className="text-lg font-bold text-emerald-600">{kpis.correctifsRunning}</div>
                    <div className="text-[10px] text-emerald-600">En cours</div>
                  </div>
                  <div className="text-center p-3 bg-background-100/50 rounded-xl">
                    <div className="text-lg font-bold text-foreground-950">{kpis.correctifsPending}</div>
                    <div className="text-[10px] text-foreground-600">En attente</div>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded-xl">
                    <div className="text-lg font-bold text-emerald-600">{kpis.correctifsAuto}</div>
                    <div className="text-[10px] text-emerald-600">Auto</div>
                  </div>
                  <div className="text-center p-3 bg-accent-50 rounded-xl">
                    <div className="text-lg font-bold text-accent-600">{kpis.correctifsSemiAuto}</div>
                    <div className="text-[10px] text-accent-600">Semi-Auto</div>
                  </div>
                  <div className="text-center p-3 bg-background-100/50 rounded-xl">
                    <div className="text-lg font-bold text-foreground-950">{kpis.correctifsManual}</div>
                    <div className="text-[10px] text-foreground-600">Manuels</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== DETAIL TAB ========== */}
          {activeTab === 'detail' && (
            <div>
              {selectedBloc ? (
                <div>
                  {/* Back Button */}
                  <button
                    onClick={() => setSelectedBloc(null)}
                    className="flex items-center gap-1.5 text-sm text-foreground-600 hover:text-foreground-900 mb-6 cursor-pointer"
                  >
                    <i className="ri-arrow-left-line"></i>
                    Retour à la vue d'ensemble
                  </button>

                  {/* Bloc Header */}
                  <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: selectedBloc.color + '18' }}>
                          <i className={`${selectedBloc.icon} text-2xl`} style={{ color: selectedBloc.color }}></i>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-xl font-bold text-foreground-950">{selectedBloc.name}</h2>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_CONFIG[selectedBloc.status].className}`}>
                              {STATUS_CONFIG[selectedBloc.status].label}
                            </span>
                          </div>
                          <p className="text-sm text-foreground-600 mt-1">{selectedBloc.keyInsight}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground-500 mt-2">
                            <span>Dernier scan: {new Date(selectedBloc.lastScan).toLocaleString('fr-FR')}</span>
                            <span>·</span>
                            <span>{selectedBloc.frequency}</span>
                            <span>·</span>
                            <span>{selectedBloc.agents} agents</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center flex-shrink-0">
                        <RadialGauge value={selectedBloc.score} target={selectedBloc.targetScore} size={72} strokeWidth={6} />
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <TrendBadge trend={selectedBloc.trend} value={selectedBloc.trendValue} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sub-Blocs */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-foreground-950 mb-3">Sous-Blocs — Détail des Tests</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {selectedBloc.subBlocs.map(sb => (
                        <div key={sb.name} className="bg-background-50 rounded-xl border border-background-200/70 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground-950">{sb.name}</span>
                            <span className={`text-sm font-bold ${sb.score >= 85 ? 'text-emerald-600' : sb.score >= 72 ? 'text-foreground-950' : sb.score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{sb.score}</span>
                          </div>
                          <div className="h-1.5 bg-background-200 rounded-full overflow-hidden mb-2">
                            <div className="h-full rounded-full" style={{ width: `${sb.score}%`, backgroundColor: selectedBloc.color }}></div>
                          </div>
                          <div className="flex justify-between text-[10px] text-foreground-500">
                            <span className="text-emerald-600">{sb.passed} réussis</span>
                            <span className="text-red-600">{sb.failed} échoués</span>
                            <span>/ {sb.tests} tests</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Findings */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-foreground-950">Findings — {selectedBloc.findings.length} problèmes</h3>
                      <div className="flex gap-1.5 flex-wrap">
                        {['all', 'critical', 'high', 'medium', 'low'].map(s => (
                          <button
                            key={s}
                            onClick={() => setSeverityFilter(s)}
                            className={`text-[10px] px-2 py-1 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                              severityFilter === s ? 'bg-primary-500 text-background-50' : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                            }`}
                          >
                            {s === 'all' ? 'Tous' : SEVERITY_CONFIG[s].label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      {filteredFindings.map(finding => (
                        <FindingCard key={finding.id} finding={finding} />
                      ))}
                    </div>
                  </div>

                  {/* Correctifs */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground-950 mb-3">Correctifs — {selectedBloc.correctifs.length} actions</h3>
                    <div className="space-y-3">
                      {selectedBloc.correctifs.map(c => (
                        <CorrectifCard key={c.id} correctif={c} />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* No bloc selected — show all with expand */
                <div>
                  <h2 className="text-lg font-semibold text-foreground-950 mb-4">Détail par Bloc — Sélectionnez un bloc ou développez</h2>
                  <div className="space-y-4">
                    {blocs.map(bloc => (
                      <div key={bloc.id} className="bg-background-50 rounded-2xl border border-background-200/70 overflow-hidden">
                        <button
                          onClick={() => setExpandedBloc(expandedBloc === bloc.id ? null : bloc.id)}
                          className="w-full flex items-center justify-between p-5 hover:bg-background-100/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bloc.color + '18' }}>
                              <i className={`${bloc.icon} text-lg`} style={{ color: bloc.color }}></i>
                            </div>
                            <div className="text-left">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-foreground-950">{bloc.name}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${STATUS_CONFIG[bloc.status].className}`}>{STATUS_CONFIG[bloc.status].label}</span>
                              </div>
                              <div className="text-xs text-foreground-600 mt-0.5">{bloc.testsExecution.toLocaleString()} tests · {bloc.findings.length} findings · {bloc.correctifs.length} correctifs</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <RadialGauge value={bloc.score} target={bloc.targetScore} size={44} strokeWidth={4} />
                            <i className={`ri-${expandedBloc === bloc.id ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-600`}></i>
                          </div>
                        </button>
                        {expandedBloc === bloc.id && (
                          <div className="px-5 pb-5 border-t border-background-200/70 pt-4">
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
                              {bloc.subBlocs.slice(0, 5).map(sb => (
                                <div key={sb.name} className="text-center p-3 bg-background-100/50 rounded-xl">
                                  <div className={`text-sm font-bold ${sb.score >= 85 ? 'text-emerald-600' : sb.score >= 70 ? 'text-foreground-950' : 'text-red-600'}`}>{sb.score}</div>
                                  <div className="text-[10px] text-foreground-600 leading-tight mt-0.5">{sb.name}</div>
                                </div>
                              ))}
                            </div>
                            <div className="bg-background-100/50 rounded-xl p-4 text-sm">
                              <div className="flex items-start gap-2 mb-2">
                                <i className="ri-lightbulb-line text-amber-600 mt-0.5"></i>
                                <span className="text-foreground-700">{bloc.keyInsight}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <i className="ri-rocket-line text-accent-500 mt-0.5"></i>
                                <span className="text-foreground-700">{bloc.recommendation}</span>
                              </div>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedBloc(bloc); }}
                              className="mt-3 text-xs text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1 cursor-pointer"
                            >
                              Voir le détail complet <i className="ri-arrow-right-line"></i>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========== CORRECTIFS TAB ========== */}
          {activeTab === 'correctifs' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-lg font-semibold text-foreground-950">File d'Attente des Correctifs</h2>
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: 'Tous' },
                    { id: 'pending', label: 'En attente' },
                    { id: 'running', label: 'En cours' },
                    { id: 'auto', label: 'Auto/Semi-Auto' },
                    { id: 'p0', label: 'P0 — Critiques' },
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setCorrectifFilter(f.id)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                        correctifFilter === f.id ? 'bg-primary-500 text-background-50' : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {filteredCorrectifs.map(c => (
                  <CorrectifCard key={c.id} correctif={c} />
                ))}
              </div>
            </div>
          )}

          {/* ========== TOUS TAB ========== */}
          {activeTab === 'tous' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-lg font-semibold text-foreground-950">Tous les Findings — {kpis.totalFindings} problèmes</h2>
                <div className="flex gap-1.5 flex-wrap">
                  {['all', 'critical', 'high', 'medium', 'low'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSeverityFilter(s)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                        severityFilter === s ? 'bg-primary-500 text-background-50' : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                      }`}
                    >
                      {s === 'all' ? 'Tous' : SEVERITY_CONFIG[s].label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {filteredFindings.map(finding => (
                  <FindingCard key={finding.id} finding={finding} />
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
              <span>Prochain scan: {kpis.nextScheduledScan.split('T')[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}

/* ============ SUB-COMPONENTS ============ */

function FindingCard({ finding }: { finding: TestFinding }) {
  const sev = SEVERITY_CONFIG[finding.severity];
  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 hover:border-background-300/60 transition-colors">
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${sev.className}`}>
          <i className={`${finding.severity === 'critical' ? 'ri-alert-fill' : finding.severity === 'high' ? 'ri-error-warning-fill' : finding.severity === 'medium' ? 'ri-information-fill' : 'ri-checkbox-circle-fill'} text-sm`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-semibold text-foreground-950">{finding.title}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${sev.className}`}>{sev.label}</span>
            {finding.autoFixable && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Auto-fixable</span>
            )}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              finding.status === 'open' ? 'bg-red-100 text-red-700' : finding.status === 'in_progress' ? 'bg-accent-100 text-accent-700' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {finding.status === 'open' ? 'Ouvert' : finding.status === 'in_progress' ? 'En cours' : 'Corrigé'}
            </span>
          </div>
          <p className="text-xs text-foreground-600 mb-2">{finding.description}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-foreground-500">
            <span><i className="ri-folder-line mr-1"></i>{finding.location}</span>
            <span>Détecté: {finding.detectedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CorrectifCard({ correctif }: { correctif: CorrectifAction }) {
  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 p-4">
      <div className="flex items-start gap-4">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${TYPE_CONFIG[correctif.type]}`}>
          <i className={`${correctif.type === 'auto' ? 'ri-robot-2-line' : correctif.type === 'semi-auto' ? 'ri-user-settings-line' : 'ri-user-line'} text-base`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-semibold text-foreground-950">{correctif.title}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${PRIORITY_CONFIG[correctif.priority]}`}>{correctif.priority}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${TYPE_CONFIG[correctif.type]}`}>
              {correctif.type === 'auto' ? 'Auto' : correctif.type === 'semi-auto' ? 'Semi-Auto' : 'Manuel'}
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${CORRECTIF_STATUS_CONFIG[correctif.status]}`}>
              {correctif.status === 'pending' ? 'En attente' : correctif.status === 'running' ? 'En cours' : correctif.status === 'completed' ? 'Terminé' : 'Bloqué'}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground-600 mb-2">
            <span><i className="ri-time-line mr-1"></i>{correctif.effort}</span>
            <span><i className="ri-flashlight-line mr-1"></i>{correctif.impact}</span>
            <span><i className="ri-user-3-line mr-1"></i>{correctif.assignedAgent}</span>
          </div>
          {correctif.status === 'running' && (
            <div>
              <div className="h-2 bg-background-200 rounded-full overflow-hidden">
                <div className="h-full bg-accent-500 rounded-full" style={{ width: `${correctif.progress}%` }}></div>
              </div>
              <div className="text-[10px] text-foreground-500 mt-1">{correctif.progress}%</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



