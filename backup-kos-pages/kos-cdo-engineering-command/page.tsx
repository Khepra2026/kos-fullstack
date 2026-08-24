import { useState, useMemo } from 'react';
import SeoHead from '@/components/feature/SeoHead';
import hubLayout from '@/components/feature/hubLayout';
import {
  cdoWeeklyReport,
  technicalLatencyFixes,
  targetHighValueKeywords,
  structuredDataInjectionLogs,
  croMetrics,
  executiveSummary,
  cdoKpiSnapshot,
} from '@/mocks/cDOEngineeringCommand';

type TabKey = 'executive' | 'latency' | 'keywords' | 'structuredData' | 'cro';

function CircularGauge({ value, size = 56, strokeWidth = 5, color = 'emerald' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorMap: Record<string, string> = {
    emerald: 'stroke-emerald-500',
    amber: 'stroke-amber-500',
    red: 'stroke-red-500',
    primary: 'stroke-primary-500',
    secondary: 'stroke-secondary-500',
    accent: 'stroke-accent-500',
  };
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorMap[color] || 'stroke-emerald-500'} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <span className="absolute text-sm font-bold text-foreground-950">{value}</span>
    </div>
  );
}

function formatFCFA(v: number): string {
  if (v >= 1000000000) return `${(v / 1000000000).toFixed(1)} Md FCFA`;
  if (v >= 1000000) return `${(v / 1000000).toFixed(0)} M FCFA`;
  return `${v.toLocaleString('fr-FR')} FCFA`;
}
function formatNum(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return n.toLocaleString('fr-FR');
}

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'executive', label: 'Résumé Exécutif', icon: 'ri-file-chart-line' },
  { key: 'latency', label: 'Performance & Latence', icon: 'ri-speed-up-line' },
  { key: 'keywords', label: 'Keywords & Sémantique', icon: 'ri-search-eye-line' },
  { key: 'structuredData', label: 'Schema.org & Rich Results', icon: 'ri-code-s-slash-line' },
  { key: 'cro', label: 'CRO & Maillage Interne', icon: 'ri-line-chart-line' },
];

export default function cDOEngineeringCommandPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('executive');

  const kpiColor = (score: number) => score >= 90 ? 'emerald' : score >= 80 ? 'amber' : 'red';
  const latencyTrajectory = useMemo(() => technicalLatencyFixes.performanceTrajectory, []);

  return (
    <>
      <SeoHead
        title="KOS CDO & Growth Engineering Command — Rapport Hebdomadaire W26 2026 | KHEPRA EXPERTS"
        description="Cockpit Chief Digital Officer : latence sub-500ms, 1 800 mots-clés Top 10, 12 types Schema.org, CRO 7.6%. Performance 89/100 — cible 95. Pipeline SEO 680M FCFA."
        canonicalPath="/kos-cdo-engineering-command"
        noIndex={true}
      />
      <hubLayout hubId={72} activeTab="cockpit" tabLabel="CDO & Growth Engineering">

        {/* Hero Header */}
        <section className="bg-background-100 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-accent-100 text-accent-700 shrink-0">
                  <i className="ri-rocket-2-line text-2xl"></i>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-accent-100 text-accent-800 font-body tracking-wide">
                      CDO & GROWTH ENGINEERING
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 font-body tracking-wide">
                      RAPPORT W26 — 16-20 Juin 2026
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 font-body tracking-wide">
                      SCORE {cdoWeeklyReport.overallHealthScore}/100 — CIBLE {cdoWeeklyReport.targetHealthScore}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 font-body tracking-wide">
                      {cdoWeeklyReport.certification}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading">
                    CDO & Growth Engineering Command™ — Rapport Hebdomadaire
                  </h1>
                  <p className="text-sm text-foreground-600 mt-1.5 max-w-3xl font-body">
                    Cockpit unifié Chief Digital Officer. 4 piliers : Latence sub-500ms · Mapping sémantique 8 autorités (BCEAO, BEAC, COBAC, OHADA, UEMOA, GAFI, BEPS, ISSB) · 12 types Schema.org · CRO funnel. Pipeline SEO → missions : <strong className="text-accent-700">{formatFCFA(croMetrics.revenueImpact.monthlyPipelineFromSEO)}/mois</strong>. ROI <strong className="text-emerald-600">{croMetrics.revenueImpact.seoROI}×</strong>.
                  </p>
                </div>
              </div>

              {/* KPI Snapshot */}
              <div className="flex items-center gap-5 shrink-0">
                <div className="text-center">
                  <CircularGauge value={cdoWeeklyReport.overallHealthScore} size={84} strokeWidth={7} color={kpiColor(cdoWeeklyReport.overallHealthScore)} />
                  <span className="text-[10px] font-medium text-foreground-600 font-body">Santé CDO</span>
                </div>
                <div className="flex flex-col gap-2">
                  {Object.entries(cdoKpiSnapshot).map(([key, v]) => (
                    <div key={key} className="flex items-center gap-1.5 text-xs">
                      <span className={`w-2 h-2 rounded-full ${v.score >= 90 ? 'bg-emerald-500' : v.score >= 80 ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                      <span className="text-foreground-600 font-body capitalize">{key === 'seoKeywords' ? 'SEO Keywords' : key === 'structuredData' ? 'Schema' : key === 'croConversion' ? 'CRO' : key === 'internalLinking' ? 'Maillage' : key === 'geoVisibility' ? 'GEO' : 'Performance'}</span>
                      <span className="font-semibold text-foreground-900">{v.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Switcher */}
        <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-none">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${activeTab === tab.key ? 'bg-primary-500 text-background-50' : 'text-foreground-600 hover:text-foreground-900 hover:bg-background-100'}`}
                  type="button"
                >
                  <i className={`${tab.icon} text-sm`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

          {/* ===== TAB: EXECUTIVE SUMMARY ===== */}
          {activeTab === 'executive' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Achievements */}
                <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                  <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
                    <i className="ri-trophy-line text-emerald-600"></i>Top Achievements — W26
                  </h3>
                  <div className="space-y-3">
                    {executiveSummary.topAchievements.map((a, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100/50">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                        <p className="text-xs text-foreground-700 leading-relaxed">{a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risks */}
                <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                  <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
                    <i className="ri-error-warning-line text-red-600"></i>Risques & Gaps — W26
                  </h3>
                  <div className="space-y-3">
                    {executiveSummary.topRisks.map((r, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-red-50/50 border border-red-100/50">
                        <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                        <p className="text-xs text-foreground-700 leading-relaxed">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Priorities Next Week */}
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-arrow-right-circle-line text-primary-600"></i>Priorités — Semaine Prochaine (W27)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-background-200">
                        <th className="text-left py-2 px-2 text-foreground-500 font-medium">Action</th>
                        <th className="text-left py-2 px-2 text-foreground-500 font-medium">Responsable</th>
                        <th className="text-left py-2 px-2 text-foreground-500 font-medium">Deadline</th>
                        <th className="text-left py-2 px-2 text-foreground-500 font-medium">Impact Estimé</th>
                      </tr>
                    </thead>
                    <tbody>
                      {executiveSummary.nextWeekPriorities.map((p, i) => (
                        <tr key={i} className="border-b border-background-100 hover:bg-background-50">
                          <td className="py-1.5 px-2 font-medium text-foreground-900">{p.action}</td>
                          <td className="py-1.5 px-2 text-foreground-600">{p.owner}</td>
                          <td className="py-1.5 px-2 text-foreground-600 font-medium">{p.deadline}</td>
                          <td className="py-1.5 px-2 text-emerald-700 font-medium">{p.impact}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Revenue Impact */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: 'Pipeline SEO/mois', value: formatFCFA(croMetrics.revenueImpact.monthlyPipelineFromSEO), icon: 'ri-funds-line', color: 'emerald' },
                  { label: 'Leads Hebdo', value: String(croMetrics.revenueImpact.weeklyLeadsValue), icon: 'ri-user-add-line', color: 'primary' },
                  { label: 'Mission Moy.', value: formatFCFA(croMetrics.revenueImpact.avgMissionValue), icon: 'ri-briefcase-line', color: 'accent' },
                  { label: 'ROI SEO', value: `${croMetrics.revenueImpact.seoROI}×`, icon: 'ri-line-chart-line', color: 'emerald' },
                  { label: 'CA Mensuel Projeté', value: formatFCFA(croMetrics.revenueImpact.projectedMonthlyRevenueFromSEO), icon: 'ri-money-dollar-circle-line', color: 'secondary' },
                  { label: 'Rich Results', value: String(structuredDataInjectionLogs.richResultsActive), icon: 'ri-star-line', color: 'amber' },
                ].map((m, i) => (
                  <div key={i} className={`bg-background-50 border border-background-200/60 rounded-lg p-4 text-center`}>
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center bg-background-100">
                      <i className={`${m.icon} text-sm text-foreground-600`}></i>
                    </div>
                    <span className="block text-lg font-bold text-foreground-950">{m.value}</span>
                    <span className="text-[10px] text-foreground-500">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== TAB: LATENCY ===== */}
          {activeTab === 'latency' && (
            <div className="space-y-6">
              {/* Current vs Target */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: 'TTFB', current: `${technicalLatencyFixes.currentTTFB}ms`, target: `${technicalLatencyFixes.targetTTFB}ms`, ok: technicalLatencyFixes.currentTTFB <= technicalLatencyFixes.targetTTFB },
                  { label: 'LCP', current: `${technicalLatencyFixes.currentLCP}ms`, target: `${technicalLatencyFixes.targetLCP}ms`, ok: technicalLatencyFixes.currentLCP <= technicalLatencyFixes.targetLCP },
                  { label: 'FCP', current: `${technicalLatencyFixes.currentFCP}ms`, target: `${technicalLatencyFixes.targetFCP}ms`, ok: technicalLatencyFixes.currentFCP <= technicalLatencyFixes.targetFCP },
                  { label: 'CLS', current: technicalLatencyFixes.currentCLS.toFixed(2), target: technicalLatencyFixes.targetCLS.toFixed(2), ok: technicalLatencyFixes.currentCLS <= technicalLatencyFixes.targetCLS },
                  { label: 'TBT', current: `${technicalLatencyFixes.currentTBT}ms`, target: `${technicalLatencyFixes.targetTBT}ms`, ok: technicalLatencyFixes.currentTBT <= technicalLatencyFixes.targetTBT },
                  { label: 'CWV Pass Rate', current: `${technicalLatencyFixes.cwvPassRate}%`, target: `${technicalLatencyFixes.targetCWVPassRate}%`, ok: technicalLatencyFixes.cwvPassRate >= technicalLatencyFixes.targetCWVPassRate },
                ].map((m, i) => (
                  <div key={i} className={`rounded-lg border p-4 text-center ${m.ok ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
                    <span className="text-[10px] uppercase tracking-wider text-foreground-500">{m.label}</span>
                    <span className={`block text-xl font-bold mt-1 ${m.ok ? 'text-emerald-700' : 'text-amber-700'}`}>{m.current}</span>
                    <span className="text-[9px] text-foreground-400">Cible: {m.target}</span>
                  </div>
                ))}
              </div>

              {/* CWV Trajectory */}
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-pulse-line text-amber-600"></i>Trajectoire Core Web Vitals — 7 Semaines
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {(['cwvPassRate', 'lcp', 'ttfb'] as const).map((metric) => (
                    <div key={metric}>
                      <h4 className="text-xs font-semibold text-foreground-500 mb-2 uppercase tracking-wider">
                        {metric === 'cwvPassRate' ? 'CWV Pass Rate (%)' : metric === 'lcp' ? 'LCP (ms)' : 'TTFB (ms)'}
                      </h4>
                      <div className="flex items-end gap-1 h-24">
                        {latencyTrajectory.map((w) => {
                          const maxVal = Math.max(...latencyTrajectory.map(x => metric === 'cwvPassRate' ? x[metric] : metric === 'ttfb' ? 800 : 3500));
                          const minVal = metric === 'cwvPassRate' ? 50 : metric === 'ttfb' ? 100 : 500;
                          const range = maxVal - minVal;
                          const val = w[metric];
                          const h = metric === 'cwvPassRate' ? ((val - minVal) / range) * 100 : ((maxVal - val) / range) * 100;
                          const isFuture = w.week === 'W27' || w.week === 'W28';
                          return (
                            <div key={w.week} className="flex-1 flex flex-col items-center gap-1 group relative">
                              <span className="text-[8px] text-foreground-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5">{metric === 'cwvPassRate' ? `${val}%` : `${val}ms`}</span>
                              <div className={`w-full rounded-t-md transition-all ${isFuture ? 'bg-amber-200 border border-dashed border-amber-400' : metric === 'cwvPassRate' ? 'bg-emerald-400' : 'bg-amber-400'}`} style={{ height: `${Math.max(h, 4)}%` }}></div>
                              <span className="text-[8px] text-foreground-400">{w.week}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Fixes */}
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-tools-line text-foreground-600"></i>Fixes Récents — W25-W26
                </h3>
                <div className="space-y-2">
                  {technicalLatencyFixes.recentFixes.map((f) => (
                    <div key={f.id} className="flex items-start justify-between gap-4 p-3 rounded-lg border border-background-100 bg-background-100/50">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span className={`w-2.5 h-2.5 mt-1.5 rounded-full shrink-0 ${f.status === 'resolved' ? 'bg-emerald-500' : f.status === 'in_progress' ? 'bg-amber-500 animate-pulse' : 'bg-background-300'}`}></span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-foreground-900">{f.issue}</p>
                          <p className="text-xs text-foreground-600 mt-0.5">{f.action}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 text-right">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${f.status === 'resolved' ? 'bg-emerald-50 text-emerald-700' : f.status === 'in_progress' ? 'bg-amber-50 text-amber-700' : 'bg-background-100 text-foreground-500'}`}>
                          {f.status === 'resolved' ? 'Résolu' : f.status === 'in_progress' ? 'En cours' : 'Planifié'}
                        </span>
                        <span className="text-xs text-emerald-700 font-medium whitespace-nowrap">{f.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Edge Cache Hit Rate', value: `${technicalLatencyFixes.edgeCacheHitRate}%`, icon: 'ri-hard-drive-2-line' },
                  { label: 'Uptime 30j', value: `${technicalLatencyFixes.uptime}%`, icon: 'ri-cloud-line' },
                  { label: 'DNS Propagation', value: 'Global', icon: 'ri-global-line' },
                  { label: 'HTTP/3 Ready', value: 'Actif', icon: 'ri-rocket-line' },
                ].map((inf, i) => (
                  <div key={i} className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center">
                    <i className={`${inf.icon} text-lg text-emerald-600 mb-1`}></i>
                    <span className="block text-base font-bold text-foreground-950">{inf.value}</span>
                    <span className="text-[10px] text-foreground-500">{inf.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== TAB: KEYWORDS ===== */}
          {activeTab === 'keywords' && (
            <div className="space-y-6">
              {/* Authority Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {targetHighValueKeywords.regulatoryAuthorities.map((auth) => (
                  <div key={auth.authority} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-foreground-950">{auth.authority}</h4>
                      <CircularGauge value={(auth.top10 / auth.keywordsTracked) * 100} size={36} strokeWidth={3} color={auth.top10 / auth.keywordsTracked > 0.9 ? 'emerald' : 'amber'} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div className="bg-background-100 rounded p-2 text-center"><span className="block text-lg font-bold text-foreground-950">{formatNum(auth.keywordsTracked)}</span><span className="text-[9px] text-foreground-500">Trackés</span></div>
                      <div className="bg-emerald-50 rounded p-2 text-center"><span className="block text-lg font-bold text-emerald-700">{auth.top3}</span><span className="text-[9px] text-emerald-600">Top 3</span></div>
                    </div>
                    <p className="text-[10px] text-foreground-500 mb-2">Position moyenne : <strong className="text-foreground-900">{auth.avgPosition}</strong></p>
                    <div className="flex flex-wrap gap-1">
                      {auth.trendingTopics.slice(0, 3).map((topic, j) => (
                        <span key={j} className="px-2 py-0.5 rounded-full bg-background-200/70 text-[9px] text-foreground-600 font-medium whitespace-nowrap">{topic}</span>
                      ))}
                      {auth.trendingTopics.length > 3 && <span className="text-[9px] text-foreground-400">+{auth.trendingTopics.length - 3}</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Semantic Mapping */}
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-git-branch-line text-accent-600"></i>Agentic Semantic Mapping — BCEAO/BEAC/COBAC → Pages
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-background-200">
                        <th className="text-left py-2 px-2 text-foreground-500 font-medium">Nœud Source</th>
                        <th className="text-left py-2 px-2 text-foreground-500 font-medium">Pages Mappées</th>
                        <th className="text-center py-2 px-2 text-foreground-500 font-medium">Score</th>
                        <th className="text-left py-2 px-2 text-foreground-500 font-medium">Dernier Mapping</th>
                      </tr>
                    </thead>
                    <tbody>
                      {targetHighValueKeywords.semanticMapping.map((m) => (
                        <tr key={m.sourceNode} className="border-b border-background-100 hover:bg-background-50">
                          <td className="py-1.5 px-2 font-semibold text-foreground-900">{m.sourceNode}</td>
                          <td className="py-1.5 px-2">
                            <div className="flex flex-wrap gap-1">
                              {m.mappedPages.map((p) => (
                                <a key={p} href={p} className="px-1.5 py-0.5 rounded bg-primary-50 text-primary-700 text-[9px] font-medium hover:bg-primary-100 cursor-pointer whitespace-nowrap">{p.split('/').pop() || p}</a>
                              ))}
                            </div>
                          </td>
                          <td className="py-1.5 px-2 text-center">
                            <span className={`inline-flex w-8 h-6 rounded items-center justify-center text-[10px] font-bold ${m.relevanceScore >= 95 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{m.relevanceScore}</span>
                          </td>
                          <td className="py-1.5 px-2 text-foreground-500">{m.lastMapped}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* GEO Visibility */}
              <div className="bg-foreground-950 rounded-xl p-5 text-white">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <i className="ri-robot-2-line text-amber-400"></i>Visibilité IA Générative (GEO) — Share of Voice
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { platform: 'ChatGPT', score: targetHighValueKeywords.geoVisibility.chatgptVisibility, color: '#74AA9C' },
                    { platform: 'Gemini', score: targetHighValueKeywords.geoVisibility.geminiVisibility, color: '#8E6FAB' },
                    { platform: 'Perplexity', score: targetHighValueKeywords.geoVisibility.perplexityVisibility, color: '#1F1F1F' },
                    { platform: 'Claude', score: targetHighValueKeywords.geoVisibility.claudeVisibility, color: '#D97757' },
                    { platform: 'Copilot', score: targetHighValueKeywords.geoVisibility.copilotVisibility, color: '#4285F4' },
                  ].map((p) => (
                    <div key={p.platform} className="text-center p-3 rounded-lg bg-white/6 border border-white/8">
                      <span className="block text-2xl font-bold" style={{ color: p.color }}>{p.score}%</span>
                      <span className="text-[10px] text-gray-400">{p.platform}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                  <span>Share of Voice global : <strong className="text-white">{targetHighValueKeywords.geoVisibility.shareOfVoice}%</strong></span>
                  <span>Cible : <strong className="text-amber-400">{targetHighValueKeywords.geoVisibility.targetSOV}%</strong></span>
                  <span>Citations IA/mois : <strong className="text-emerald-400">{formatNum(targetHighValueKeywords.geoVisibility.citationsPerMonth)}</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* ===== TAB: STRUCTURED DATA ===== */}
          {activeTab === 'structuredData' && (
            <div className="space-y-6">
              {/* Schema Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: 'Pages avec Schema', value: `${structuredDataInjectionLogs.totalPagesWithSchema}`, sub: 'pages', color: 'emerald' },
                  { label: 'Couverture', value: `${structuredDataInjectionLogs.coveragePercent}%`, sub: `cible ${structuredDataInjectionLogs.targetCoveragePercent}%`, color: structuredDataInjectionLogs.coveragePercent >= 95 ? 'emerald' : 'amber' },
                  { label: 'Rich Results', value: String(structuredDataInjectionLogs.richResultsActive), sub: 'actifs', color: 'emerald' },
                  { label: 'Impressions/mois', value: formatNum(structuredDataInjectionLogs.richResultsImpressions), sub: '', color: 'primary' },
                  { label: 'Clics/mois', value: formatNum(structuredDataInjectionLogs.richResultsClicks), sub: '', color: 'accent' },
                  { label: 'CTR', value: `${structuredDataInjectionLogs.richResultsCTR}%`, sub: '', color: 'secondary' },
                ].map((s, i) => (
                  <div key={i} className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center">
                    <span className={`block text-xl font-bold ${s.color === 'emerald' ? 'text-emerald-700' : s.color === 'amber' ? 'text-amber-700' : s.color === 'primary' ? 'text-primary-700' : s.color === 'accent' ? 'text-accent-700' : 'text-secondary-700'}`}>{s.value}</span>
                    <span className="text-[10px] text-foreground-500">{s.label}</span>
                    {s.sub && <span className="block text-[9px] text-foreground-400 mt-0.5">{s.sub}</span>}
                  </div>
                ))}
              </div>

              {/* Schema Types */}
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-code-s-slash-line text-primary-600"></i>12 Types Schema.org — Déploiement par Type
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-background-200">
                        <th className="text-left py-2 px-2 text-foreground-500 font-medium">Type</th>
                        <th className="text-center py-2 px-2 text-foreground-500 font-medium">Pages</th>
                        <th className="text-center py-2 px-2 text-foreground-500 font-medium">Rich Results</th>
                        <th className="text-right py-2 px-2 text-foreground-500 font-medium">Impressions</th>
                        <th className="text-right py-2 px-2 text-foreground-500 font-medium">Clics</th>
                        <th className="text-center py-2 px-2 text-foreground-500 font-medium">CTR</th>
                        <th className="text-center py-2 px-2 text-foreground-500 font-medium">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {structuredDataInjectionLogs.schemaTypesDeployed.map((st) => (
                        <tr key={st.type} className="border-b border-background-100 hover:bg-background-50">
                          <td className="py-1.5 px-2 font-semibold text-foreground-900">{st.type}</td>
                          <td className="py-1.5 px-2 text-center text-foreground-700">{st.pagesCount}</td>
                          <td className="py-1.5 px-2 text-center text-foreground-700">{st.richResults}</td>
                          <td className="py-1.5 px-2 text-right text-foreground-600">{formatNum(st.impressions)}</td>
                          <td className="py-1.5 px-2 text-right text-foreground-600">{formatNum(st.clicks)}</td>
                          <td className="py-1.5 px-2 text-center font-semibold text-emerald-700">{st.ctr}%</td>
                          <td className="py-1.5 px-2 text-center">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-medium">{st.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Injections */}
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-inbox-unarchive-line text-accent-600"></i>Injections Récentes — W25-W26
                </h3>
                <div className="space-y-2">
                  {structuredDataInjectionLogs.recentInjections.map((inj) => (
                    <div key={inj.id} className="flex items-center justify-between p-3 rounded-lg bg-background-100/50 border border-background-100">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-foreground-900 truncate">{inj.page}</p>
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {inj.schemasAdded.map((s) => <span key={s} className="px-1.5 py-0.5 rounded bg-primary-50 text-primary-700 text-[9px] font-medium">{s}</span>)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] text-foreground-500">{inj.date}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-medium">{inj.richResults} rich results</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Schemas Queue */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-amber-800 mb-4 flex items-center gap-2">
                  <i className="ri-timer-line"></i>File d'Attente — Schemas Manquants
                </h3>
                <div className="space-y-2">
                  {structuredDataInjectionLogs.missingSchemasQueue.map((mq) => (
                    <div key={mq.page} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/70 border border-amber-100">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground-900">{mq.page}</p>
                        <p className="text-[10px] text-foreground-500">Manquant : {mq.missingSchemas.join(', ')}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${mq.priority === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{mq.priority}</span>
                        <span className="text-[10px] text-emerald-700 font-medium whitespace-nowrap">{mq.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== TAB: CRO ===== */}
          {activeTab === 'cro' && (
            <div className="space-y-6">
              {/* Traffic Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: 'Trafic Mensuel', value: formatNum(croMetrics.monthlyTraffic), trend: `${croMetrics.monthlyTrafficTrend > 0 ? '+' : ''}${croMetrics.monthlyTrafficTrend}%`, trendUp: croMetrics.monthlyTrafficTrend > 0 },
                  { label: 'Taux de Rebond', value: `${croMetrics.bounceRate}%`, trend: `${croMetrics.bounceRateTrend > 0 ? '+' : ''}${croMetrics.bounceRateTrend}%`, trendUp: false },
                  { label: 'Durée Session', value: `${Math.floor(croMetrics.avgSessionDuration / 60)}m${croMetrics.avgSessionDuration % 60}s`, trend: `+${croMetrics.avgSessionDurationTrend}s`, trendUp: true },
                  { label: 'Pages/Session', value: croMetrics.pagesPerSession.toFixed(1), trend: `+${croMetrics.pagesPerSessionTrend}`, trendUp: true },
                  { label: 'Leads Hebdo', value: String(croMetrics.leadQualityMetrics.totalLeadsThisWeek), trend: '', trendUp: true },
                  { label: 'Missions Signées', value: String(croMetrics.conversionFunnel.signedMissions), trend: '', trendUp: true },
                ].map((t, i) => (
                  <div key={i} className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center">
                    <span className="block text-xl font-bold text-foreground-950">{t.value}</span>
                    <span className="text-[10px] text-foreground-500">{t.label}</span>
                    {t.trend && <span className={`block text-[10px] font-semibold mt-0.5 ${t.trendUp ? 'text-emerald-600' : 'text-red-600'}`}>{t.trend}</span>}
                  </div>
                ))}
              </div>

              {/* Conversion Funnel */}
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-filter-3-line text-accent-600"></i>Funnel de Conversion — KHEPRA
                </h3>
                <div className="flex items-end gap-3">
                  {[
                    { label: 'Visiteurs', value: croMetrics.conversionFunnel.visitors, rate: 100 },
                    { label: 'Articles', value: croMetrics.conversionFunnel.articleViews, rate: croMetrics.conversionRates.visitorToArticle },
                    { label: 'CTA Vues', value: croMetrics.conversionFunnel.ctaViews, rate: croMetrics.conversionRates.articleToCTA },
                    { label: 'CTA Clics', value: croMetrics.conversionFunnel.ctaClicks, rate: croMetrics.conversionRates.ctaToLandingPage },
                    { label: 'Diagnostics', value: croMetrics.conversionFunnel.diagnosticStarts, rate: croMetrics.conversionRates.landingToDiagnostic },
                    { label: 'Leads', value: croMetrics.conversionFunnel.leadFormSubmissions, rate: croMetrics.conversionRates.diagnosticToLead },
                    { label: 'Consult.', value: croMetrics.conversionFunnel.consultationRequests, rate: croMetrics.conversionRates.leadToConsultation },
                    { label: 'Missions', value: croMetrics.conversionFunnel.signedMissions, rate: croMetrics.conversionRates.consultationToMission },
                  ].map((step, i) => {
                    const maxVal = croMetrics.conversionFunnel.visitors;
                    const h = (step.value / maxVal) * 100;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-xs font-bold text-foreground-900">{formatNum(step.value)}</span>
                        <div className="w-full rounded-t-md bg-accent-200 transition-all" style={{ height: `${Math.max(h * 3, 16)}px`, minHeight: '16px' }}>
                          <div className="h-full w-full rounded-t-md bg-accent-500" style={{ height: `${h}%` }}></div>
                        </div>
                        <span className="text-[9px] text-foreground-500 text-center leading-tight">{step.label}</span>
                        <span className="text-[9px] font-bold text-accent-700">{step.rate}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top CTAs */}
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-cursor-line text-primary-600"></i>Top 5 CTAs — Performance
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-background-200">
                        <th className="text-left py-2 px-2 text-foreground-500 font-medium">Emplacement</th>
                        <th className="text-center py-2 px-2 text-foreground-500 font-medium">Type</th>
                        <th className="text-right py-2 px-2 text-foreground-500 font-medium">Impressions</th>
                        <th className="text-right py-2 px-2 text-foreground-500 font-medium">Clics</th>
                        <th className="text-center py-2 px-2 text-foreground-500 font-medium">CTR</th>
                        <th className="text-right py-2 px-2 text-foreground-500 font-medium">Conversions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {croMetrics.topPerformingCTAs.map((cta, i) => (
                        <tr key={i} className="border-b border-background-100 hover:bg-background-50">
                          <td className="py-1.5 px-2 font-medium text-foreground-900">{cta.location}</td>
                          <td className="py-1.5 px-2 text-center"><span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 text-[10px]">{cta.type}</span></td>
                          <td className="py-1.5 px-2 text-right text-foreground-600">{formatNum(cta.impressions)}</td>
                          <td className="py-1.5 px-2 text-right text-foreground-600">{formatNum(cta.clicks)}</td>
                          <td className="py-1.5 px-2 text-center font-bold text-emerald-700">{cta.ctr}%</td>
                          <td className="py-1.5 px-2 text-right text-foreground-600">{cta.conversions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Internal Linking Health */}
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-link-m text-secondary-600"></i>Santé Maillage Interne
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Total Liens Internes', value: formatNum(croMetrics.internalLinkingHealth.totalInternalLinks), icon: 'ri-link', color: 'emerald' },
                    { label: 'Moyenne/Page', value: croMetrics.internalLinkingHealth.avgLinksPerPage.toFixed(1), icon: 'ri-bar-chart-line', color: 'primary' },
                    { label: 'Pages Orphelines', value: '0', icon: 'ri-error-warning-line', color: 'emerald' },
                    { label: 'Liens Cassés', value: '0', icon: 'ri-close-circle-line', color: 'emerald' },
                  ].map((ih, i) => (
                    <div key={i} className="bg-background-100 rounded-lg p-3 text-center">
                      <span className="block text-lg font-bold text-foreground-950">{ih.value}</span>
                      <span className="text-[10px] text-foreground-500">{ih.label}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-3">Pages Cibles — Distribution d'Autorité</h4>
                <div className="space-y-2">
                  {croMetrics.internalLinkingHealth.targetPages.filter(p => p.status !== 'optimal').map((tp) => (
                    <div key={tp.page} className="flex items-center justify-between p-3 rounded-lg border border-background-100 bg-background-100/50">
                      <div className="flex-1 min-w-0">
                        <a href={tp.page} className="text-xs font-semibold text-foreground-900 hover:text-primary-600 cursor-pointer">{tp.page}</a>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {tp.anchorTexts.map((a) => <span key={a} className="px-1.5 py-0.5 rounded bg-background-200 text-[9px] text-foreground-500">{a}</span>)}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-foreground-600">{tp.internalLinksIn} / {tp.target} liens</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${tp.status === 'critical' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
                          {tp.status === 'critical' ? 'CRITIQUE' : 'AMÉLIORER'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead Source Attribution */}
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-pie-chart-line text-secondary-600"></i>Attribution Leads — Sources
                </h3>
                <div className="space-y-3">
                  {croMetrics.leadQualityMetrics.sourceAttribution.map((src) => (
                    <div key={src.source} className="flex items-center gap-3">
                      <span className="w-28 text-xs font-medium text-foreground-700 text-right shrink-0">{src.source}</span>
                      <div className="flex-1 h-5 rounded-full bg-background-200 overflow-hidden">
                        <div className="h-full rounded-full bg-accent-500 flex items-center justify-end pr-2" style={{ width: `${src.percent}%` }}>
                          <span className="text-[9px] font-bold text-white">{src.leads} leads</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-foreground-500 w-12 text-right">{src.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Bar */}
        <footer className="border-t border-background-200/70 bg-background-100 mt-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-[10px] text-foreground-500 font-body">
                <span>Rapport généré : {cdoWeeklyReport.generatedAt.replace('T', ' à ').replace('Z', ' GMT')}</span>
                <span>Période : {cdoWeeklyReport.period}</span>
                <span>Rapport ID : {cdoWeeklyReport.reportId}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-foreground-400 font-body">
                <i className="ri-shield-check-line text-emerald-500 text-xs"></i>
                <span>Certification {cdoWeeklyReport.certification} — Prochain rapport W27 : 27 Juin 2026 08:00 GMT</span>
              </div>
            </div>
          </div>
        </footer>
      </hubLayout>
    </>
  );
}





