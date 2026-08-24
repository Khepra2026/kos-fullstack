import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  ENTERPRISE_AUDIT,
  ENTERPRISE_ENGINE_STATS,
  TICKET_SOURCES,
  TICKET_TOTALS,
  EXECUTION_BATCHES,
  KPI_SCORECARD,
  GLOBAL_AUDIT_RESULT,
} from '@/mocks/enterpriseEngine';
import type { EnterpriseAuditCategory, ExecutionBatch } from '@/mocks/enterpriseEngine';
import { useEnterpriseExecution } from '@/hooks/useEnterpriseExecution';
import { useEnterpriseControlTower } from '@/hooks/useEnterpriseControlTower';
import type { ControlTowerKPI } from '@/mocks/controlTowerAutomationFactory';

type TabId = 'control-tower' | 'audit' | 'tickets' | 'execution' | 'kpi' | 'roadmap';

function getScoreColor(score: number, target: number) {
  const ratio = score / target;
  if (ratio >= 0.9) return 'text-emerald-600';
  if (ratio >= 0.7) return 'text-amber-600';
  return 'text-red-600';
}

function getScoreBg(score: number, target: number) {
  const ratio = score / target;
  if (ratio >= 0.9) return 'bg-emerald-500';
  if (ratio >= 0.7) return 'bg-amber-500';
  return 'bg-red-500';
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'healthy': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Sain', dot: 'bg-emerald-500' };
    case 'warning': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Attention', dot: 'bg-amber-500' };
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Critique', dot: 'bg-red-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getTrendIcon(trend: string) {
  switch (trend) {
    case 'up': return 'ri-arrow-up-line text-emerald-500';
    case 'down': return 'ri-arrow-down-line text-red-500';
    case 'stable': return 'ri-arrow-right-line text-foreground-400';
    default: return '';
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'CRITIQUE', dot: 'bg-red-500' };
    case 'high': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'HAUTE', dot: 'bg-amber-500' };
    case 'medium': return { bg: 'bg-accent-50', border: 'border-accent-200', text: 'text-accent-700', label: 'MOYENNE', dot: 'bg-accent-500' };
    default: return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-500', label: 'N/A', dot: 'bg-slate-400' };
  }
}

function getExecutionStatusBadge(status: string) {
  switch (status) {
    case 'pending': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', label: 'En attente' };
    case 'running': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'En cours' };
    case 'completed': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Terminé' };
    case 'failed': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Échoué' };
    case 'skipped': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-500', label: 'Ignoré' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A' };
  }
}

export default function enterpriseEnginePage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState<TabId>('control-tower');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('infrastructure');
  const [expandedBatch, setExpandedBatch] = useState<string | null>('batch-1');
  const [expandedKPI, setExpandedKPI] = useState<string | null>(null);
  const {
    isExecuting,
    executionProgress,
    executedBatches,
    batchResults,
    executionReport,
    executionLog,
    handleExecuteAll: executeAllBatches,
    resetExecution,
  } = useEnterpriseExecution();

  const {
    kpis: towerKPIs,
    domains: factoryDomains,
    summary: towerSummary,
    alerts: towerAlerts,
    isLive: towerIsLive,
    isLoading: towerIsLoading,
    lastUpdated: towerLastUpdated,
  } = useEnterpriseControlTower();

  const stats = ENTERPRISE_ENGINE_STATS;
  const auditResult = GLOBAL_AUDIT_RESULT;

  const globalScore = useMemo(() => {
    return ENTERPRISE_AUDIT.reduce((s, c) => s + c.score, 0) / ENTERPRISE_AUDIT.length;
  }, []);

  const totalSubItems = useMemo(() => {
    return ENTERPRISE_AUDIT.reduce((s, c) => s + c.totalItems, 0);
  }, []);

  const criticalCount = useMemo(() => {
    return ENTERPRISE_AUDIT.reduce((s, c) => s + c.critical, 0);
  }, []);

  const warningCount = useMemo(() => {
    return ENTERPRISE_AUDIT.reduce((s, c) => s + c.warning, 0);
  }, []);

  const handleExecuteAll = () => {
    executeAllBatches(
      EXECUTION_BATCHES.map(b => ({ id: b.id, name: b.name, phase: b.phase }))
    );
  };

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'control-tower', label: 'Control Tower', icon: 'ri-radar-line', count: String(towerSummary.totalMetrics) },
    { id: 'audit', label: 'Audit Global', icon: 'ri-search-eye-line', count: String(totalSubItems) },
    { id: 'tickets', label: 'Tickets', icon: 'ri-ticket-line', count: String(TICKET_TOTALS.total) },
    { id: 'execution', label: 'Exécution en Bloc', icon: 'ri-play-circle-line', count: String(EXECUTION_BATCHES.length) },
    { id: 'kpi', label: 'Scorecard KPIs', icon: 'ri-bar-chart-line', count: '6' },
    { id: 'roadmap', label: 'Roadmap', icon: 'ri-road-map-line', count: '5' },
  ];

  const renderGaugeCircle = (score: number, target: number, size: number = 60) => {
    const pct = Math.round((score / target) * 100);
    const r = (size - 10) / 2;
    const circ = 2 * Math.PI * r;
    const color = pct >= 90 ? '#22c55e' : pct >= 70 ? '#f59e0b' : '#ef4444';
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="-rotate-90" style={{ width: size, height: size }} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-background-200)" strokeWidth="6" />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="6" strokeDasharray={`${(pct / 100) * circ} ${circ}`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-foreground-950">{score.toFixed(1)}</span>
          <span className="text-[9px] text-foreground-400">/ {target}</span>
        </div>
      </div>
    );
  };

  return (
    <hubLayout hubId={54}>
      <SeoHead
        title="KOS Enterprise Engine™ — Audit Global & Exécution en Bloc | KHEPRA EXPERTS"
        description="Hub central d'audit et d'exécution KOS. 47 points de contrôle, 24 tickets consolidés, 5 batches d'exécution. Score global 7.0/10. Cible Big Four 9.5/10. Exécutez toutes les corrections en un clic."
        keywords="KOS Enterprise Engine, audit global KOS, exécution en bloc, correction automatique, KPI scorecard, KHEPRA EXPERTS"
        canonicalPath="/kos-enterprise-engine"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      <main id="main-content">
        {/* Hero */}
        <section className="relative bg-background-100 border-b border-background-200/70">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=abstract%20dark%20technological%20command%20center%20with%20a%20massive%20central%20glowing%20core%20node%20radiating%20interconnected%20audit%20and%20execution%20pathways%20outward%2C%20emerald%20green%20health%20indicators%2C%20amber%20warning%20signals%2C%20and%20crimson%20critical%20alerts%20forming%20a%20comprehensive%20system%20monitoring%20dashboard%2C%20geometric%20hexagonal%20patterns%20representing%20enterprise%20architecture%2C%20premium%20corporate%20technology%20atmosphere%20with%20structured%20data%20flow%20visualization%2C%20no%20text%20no%20human%20figures%2C%20clean%20sophisticated%20orchestration%20hub%20aesthetic%20with%20algorithmic%20precision&width=1920&height=600&seq=kos-enterprise-engine-hero&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-center opacity-20"
              width="1920"
              height="600"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/60 via-foreground-950/80 to-foreground-950" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm mb-6">
                <i className="ri-cpu-line text-amber-400 text-sm" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                  KOS Enterprise Engine™ — Hub Central d'Audit & Exécution
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Un seul bouton.
                <span className="block text-amber-400 mt-2">Tout le système audité et corrigé.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                <strong className="text-white">{totalSubItems} points de contrôle</strong> sur 5 domaines.{' '}
                <strong className="text-white">{TICKET_TOTALS.total} tickets</strong> consolidés depuis 4 engines.{' '}
                <strong className="text-white">{EXECUTION_BATCHES.length} batches d'exécution</strong>. Score global {globalScore.toFixed(1)}/10.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-sm text-red-300 font-semibold">{criticalCount} Critiques</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm text-amber-300 font-semibold">{warningCount} Alertes</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <i className="ri-shield-check-line text-emerald-400" />
                  <span className="text-sm text-emerald-300 font-semibold">Niveau {auditResult.certification}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Critical Blockers Alert */}
        <section className="py-5 bg-red-50 border-b border-red-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <i className="ri-error-warning-fill text-red-600 text-sm" />
                </div>
                <span className="text-sm font-bold text-red-800">Blocages Critiques :</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {stats.criticalBlockers.map((blocker, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white border border-red-200 text-red-700">
                    <i className="ri-lock-line text-red-500 text-xs" />
                    {blocker.length > 60 ? blocker.substring(0, 60) + '...' : blocker}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Top Stats Row */}
        <section className="py-6 bg-white border-b border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { label: 'Score Global', value: `${globalScore.toFixed(1)}/10`, icon: 'ri-dashboard-line', color: '#C2410C' },
                { label: 'Hubs', value: String(stats.totalHubs), icon: 'ri-stack-line', color: '#4F46E5' },
                { label: 'Edge Functions', value: String(stats.totalEdgeFunctions), icon: 'ri-cpu-line', color: '#0D7B5F' },
                { label: 'Tickets', value: String(stats.totalTickets), icon: 'ri-ticket-line', color: '#E8943A' },
                { label: 'Critiques', value: String(stats.ticketsCritical), icon: 'ri-error-warning-line', color: '#c2410c' },
                { label: 'Tâches P0', value: String(stats.tasksP0), icon: 'ri-alert-line', color: '#C2410C' },
                { label: 'Leads/mois', value: stats.leadsMonthly.toLocaleString(), icon: 'ri-user-add-line', color: '#86BC25' },
                { label: 'Articles', value: String(stats.articlesTotal), icon: 'ri-article-line', color: '#5B8C2A' },
              ].map((stat, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200 p-4 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                    <i className={`${stat.icon} text-sm`} style={{ color: stat.color }} />
                  </div>
                  <span className="block text-lg font-bold text-foreground-950 font-heading">{stat.value}</span>
                  <span className="text-[10px] text-foreground-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
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
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* === TAB: CONTROL TOWER & AUTOMATION FACTORY === */}
        {activeTab === 'control-tower' && (
          <>
            {/* Summary Cards */}
            <section className="py-6 bg-white border-b border-background-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="font-heading text-xl font-bold text-foreground-950">
                    Indicateurs Clés — Enterprise Control Tower & Automation Factory
                  </h2>
                  {towerIsLive ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      DONNÉES LIVE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 border border-amber-200 text-amber-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Mode MOCK
                    </span>
                  )}
                  {towerLastUpdated && (
                    <span className="text-[11px] text-foreground-400">
                      Dernière mise à jour : {towerLastUpdated.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { label: 'Santé Globale', value: `${towerSummary.metricsOk}/${towerSummary.totalMetrics} OK`, icon: 'ri-heart-pulse-line', color: '#86BC25', detail: `${towerSummary.metricsWarning} warning · ${towerSummary.metricsCritical} critique` },
                    { label: 'Alertes Actives', value: String(towerSummary.totalAlerts), icon: 'ri-alert-line', color: '#E8943A', detail: `${towerSummary.metricsWarning} warning · ${towerSummary.metricsCritical} critique` },
                    { label: 'Efficience Workflows', value: `${towerSummary.efficiencyAvg}%`, icon: 'ri-flashlight-line', color: '#4F46E5', detail: `+${towerSummary.efficiencyGainPotential}% gain potentiel` },
                    { label: 'Équipes Surcharge', value: `${towerSummary.overloadedTeams}/${towerSummary.totalTeams}`, icon: 'ri-team-line', color: '#C2410C', detail: `${towerSummary.occupationRate}% occupation` },
                    { label: 'Confiance Prévisions', value: `${towerSummary.forecastConfidence}%`, icon: 'ri-line-chart-line', color: '#0D7B5F', detail: `${towerSummary.totalForecasts} prévisions` },
                    { label: 'Scénarios Actifs', value: `${towerSummary.activeScenarios}/${towerSummary.totalScenarios}`, icon: 'ri-git-branch-line', color: '#8B3040', detail: `${towerSummary.probableScenarios} probables` },
                  ].map((ind) => (
                    <div key={ind.label} className="rounded-2xl bg-background-50 border border-background-200 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${ind.color}15` }}>
                          <i className={`${ind.icon} text-sm`} style={{ color: ind.color }} />
                        </div>
                        <span className="text-[11px] font-semibold text-foreground-500 leading-tight">{ind.label}</span>
                      </div>
                      <span className="block text-xl font-bold text-foreground-950 font-heading">{ind.value}</span>
                      <span className="text-[10px] text-foreground-400">{ind.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 12 KPI Grid */}
            <section className="py-8 bg-background-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <h2 className="font-heading text-xl font-bold text-foreground-950">
                      KOS Enterprise Control Tower™
                    </h2>
                    <span className="text-sm text-foreground-500">
                      {towerSummary.totalMetrics} métriques — {towerSummary.totalAlerts} alertes
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {towerSummary.metricsOk} OK
                    </span>
                    {towerSummary.metricsWarning > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 border border-amber-200 text-amber-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        {towerSummary.metricsWarning} Warning
                      </span>
                    )}
                    {towerSummary.metricsCritical > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 border border-red-200 text-red-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        {towerSummary.metricsCritical} Critical
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {towerKPIs.map((kpi) => {
                    const isExpanded = expandedKPI === kpi.id;
                    const statusColors = kpi.status === 'ok'
                      ? { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', ring: 'ring-emerald-200' }
                      : kpi.status === 'warning'
                        ? { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', ring: 'ring-amber-200' }
                        : { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500', ring: 'ring-red-200' };

                    const range = kpi.direction === 'higher_better'
                      ? kpi.criticalThreshold
                      : kpi.warningThreshold;
                    const maxVal = kpi.direction === 'higher_better'
                      ? Math.max(kpi.value, kpi.warningThreshold || 0) * 1.15
                      : Math.max(kpi.criticalThreshold || 0, kpi.value) * 1.15 || 100;
                    const barPct = Math.min((kpi.value / (maxVal || 1)) * 100, 100);

                    return (
                      <button
                        key={kpi.id}
                        onClick={() => setExpandedKPI(isExpanded ? null : kpi.id)}
                        className={`rounded-2xl border bg-white p-5 text-left cursor-pointer transition-all duration-200 hover:shadow-md ${
                          isExpanded ? 'ring-2 ' + statusColors.ring + ' shadow-lg' : 'border-background-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${statusColors.bg} ${statusColors.border} ${statusColors.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot} ${kpi.status === 'warning' ? 'animate-pulse' : ''}`} />
                            {kpi.status === 'ok' ? 'OK' : kpi.status === 'warning' ? 'WARNING' : 'CRITICAL'}
                          </span>
                          {kpi.alerts > 0 && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 border border-red-200 text-red-700">
                              <i className="ri-alert-line text-[9px]" />
                              {kpi.alerts} alerte{kpi.alerts > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>

                        <span className="block text-[11px] font-semibold text-foreground-500 mb-1">{kpi.category}</span>
                        <span className="block text-lg font-bold text-foreground-950 font-heading mb-1">{kpi.name}</span>
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-2xl font-bold text-foreground-950 font-heading">
                            {kpi.unit === 'FCFA'
                              ? new Intl.NumberFormat('fr-FR', { notation: 'compact', maximumFractionDigits: 1 }).format(kpi.value)
                              : kpi.value}{kpi.unit !== 'FCFA' ? kpi.unit : ''}
                          </span>
                          <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${kpi.trend === 'up' ? (kpi.direction === 'lower_better' ? 'text-red-600' : 'text-emerald-600') : kpi.trend === 'down' ? (kpi.direction === 'lower_better' ? 'text-emerald-600' : 'text-red-600') : 'text-foreground-400'}`}>
                            <i className={`${kpi.trend === 'up' ? 'ri-arrow-up-line' : kpi.trend === 'down' ? 'ri-arrow-down-line' : 'ri-arrow-right-line'} text-xs`} />
                            {kpi.trendPercent !== 0 && `${kpi.trendPercent > 0 ? '+' : ''}${kpi.trendPercent}%`}
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="h-1.5 rounded-full bg-background-200 overflow-hidden mb-3">
                          <div
                            className={`h-full rounded-full transition-all ${
                              kpi.status === 'ok' ? 'bg-emerald-500' : kpi.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${barPct}%` }}
                          />
                        </div>

                        <div className="text-[10px] text-foreground-400 flex items-center justify-between">
                          <span>Seuil warning: {
                            kpi.unit === 'FCFA'
                              ? new Intl.NumberFormat('fr-FR', { notation: 'compact', maximumFractionDigits: 1 }).format(kpi.warningThreshold)
                              : kpi.warningThreshold}{kpi.unit !== 'FCFA' ? kpi.unit : ''}
                          </span>
                          <span>Scan: {new Date(kpi.lastScan).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                        </div>

                        {/* Expanded Details */}
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-background-200 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-foreground-500">Position par rapport aux seuils</span>
                              <span className={`font-bold ${statusColors.text}`}>
                                {kpi.status === 'ok' ? 'Dans la cible' : kpi.status === 'warning' ? 'Attention requise' : 'Action immédiate'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-foreground-500">Dernier scan</span>
                              <span className="text-foreground-700">
                                {new Date(kpi.lastScan).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-foreground-500">Alertes actives</span>
                              <span className={`font-bold ${kpi.alerts > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                                {kpi.alerts > 0 ? `${kpi.alerts} alerte${kpi.alerts > 1 ? 's' : ''}` : 'Aucune'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-foreground-500">Seuil critique</span>
                              <span className="text-red-600 font-bold">
                                {kpi.unit === 'FCFA'
                                  ? new Intl.NumberFormat('fr-FR', { notation: 'compact', maximumFractionDigits: 1 }).format(kpi.criticalThreshold)
                                  : kpi.criticalThreshold}{kpi.unit !== 'FCFA' ? kpi.unit : ''}
                              </span>
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Automation Factory */}
            <section className="py-8 bg-white border-t border-background-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 border border-accent-200 mb-4">
                    <i className="ri-robot-line text-accent-600 text-sm" />
                    <span className="text-sm font-semibold text-accent-700 uppercase tracking-wider">
                      Automation Factory — {factoryDomains.reduce((s, d) => s + d.automates, 0)} Automates Déployés
                    </span>
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-foreground-950 mb-2">
                    Usine d'Automatisation KOS
                  </h2>
                  <p className="text-foreground-600 max-w-2xl mx-auto">
                    {factoryDomains.length} domaines d'automatisation. Optimisation continue des workflows, allocation intelligente, prévisions prédictives.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {factoryDomains.map((domain) => (
                    <div
                      key={domain.id}
                      className="rounded-2xl border border-background-200 bg-background-50 p-6 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${domain.color}15` }}>
                          <i className={`${domain.icon} text-xl`} style={{ color: domain.color }} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-foreground-950">{domain.name}</h3>
                          <span className="text-2xl font-bold font-heading" style={{ color: domain.color }}>{domain.automates}</span>
                          <span className="text-xs text-foreground-400 ml-1">automates</span>
                        </div>
                      </div>
                      <p className="text-xs text-foreground-500 mb-4">{domain.description}</p>
                      <div className="flex items-center gap-1.5">
                        {Array.from({ length: domain.automates }).map((_, i) => (
                          <div
                            key={i}
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: `${domain.color}${40 + (i * 15)}` }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Active Alerts Panel */}
            <section className="py-8 bg-amber-50/30 border-t border-amber-200/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <i className="ri-alert-line text-amber-600 text-sm" />
                  </div>
                  <h2 className="font-heading text-lg font-bold text-foreground-950">
                    Alertes Actives — {towerAlerts.length} alertes en cours
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {towerAlerts.map((alert) => {
                    const kpi = towerKPIs.find(k => k.id === alert.kpiId);
                    return (
                      <div key={alert.id} className={`rounded-xl border p-4 ${
                        alert.severity === 'critical'
                          ? 'border-red-200 bg-red-50/50'
                          : 'border-amber-200 bg-amber-50/30'
                      }`}>
                        <div className="flex items-start gap-3">
                          <i className={`${alert.severity === 'critical' ? 'ri-error-warning-fill' : 'ri-alert-fill'} ${alert.severity === 'critical' ? 'text-red-600' : 'text-amber-600'} text-sm mt-0.5`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              {kpi && (
                                <span className="text-[10px] font-bold text-foreground-500">{kpi.name}</span>
                              )}
                              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                                alert.severity === 'critical' ? 'bg-red-100 border border-red-200 text-red-700' : 'bg-amber-100 border border-amber-200 text-amber-700'
                              }`}>
                                {alert.severity === 'critical' ? 'CRITIQUE' : 'WARNING'}
                              </span>
                            </div>
                            <p className="text-xs text-foreground-700 mb-1">{alert.message}</p>
                            <span className="text-[10px] text-foreground-400">
                              Détecté : {new Date(alert.detectedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        )}

        {/* === TAB: AUDIT GLOBAL === */}
        {activeTab === 'audit' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Global Score */}
              <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8 mb-10">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    {renderGaugeCircle(globalScore, stats.targetHealthScore, 100)}
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
                      <i className="ri-radar-line text-amber-600 text-sm" />
                      <span className="text-sm font-semibold text-amber-700">Audit Exécuté le {new Date(auditResult.executedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">
                      Certification {auditResult.certification}
                    </h2>
                    <p className="text-sm text-foreground-600 mb-4">
                      {auditResult.totalChecks} points vérifiés — {auditResult.passed} conformes, {auditResult.warning} en alerte, {auditResult.failed} non conformes.
                      Prochain audit : {new Date(auditResult.nextAuditDue).toLocaleDateString('fr-FR')}.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">Top 5 Risques</h4>
                        <ul className="space-y-1">
                          {auditResult.topRisks.map((risk, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                              <span className="text-red-500 font-bold">{i + 1}.</span>
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">Quick Wins</h4>
                        <ul className="space-y-1">
                          {auditResult.quickWins.map((win, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                              <i className="ri-check-line text-emerald-500 mt-0.5" />
                              {win}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audit Categories */}
              <div className="text-center mb-8">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Audit par Domaine — {ENTERPRISE_AUDIT.length} Catégories
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  {totalSubItems} points de contrôle. Cliquez pour déplier les sous-catégories.
                </p>
              </div>

              <div className="space-y-4">
                {ENTERPRISE_AUDIT.map((category) => {
                  const isExpanded = expandedCategory === category.id;
                  const scoreColor = getScoreColor(category.score, category.target);
                  const scoreBg = getScoreBg(category.score, category.target);
                  return (
                    <div
                      key={category.id}
                      className={`rounded-2xl border transition-all duration-300 ${
                        isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200 hover:shadow-md'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                        className="w-full p-5 sm:p-6 text-left flex items-start gap-4 cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${category.color}15` }}>
                          <i className={`${category.icon} text-xl`} style={{ color: category.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-base font-bold text-foreground-950">{category.name}</h3>
                            <span className={`text-sm font-bold font-heading ${scoreColor}`}>{category.score.toFixed(1)}/10</span>
                          </div>
                          <p className="text-sm text-foreground-500 line-clamp-1">{category.description}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex-1 h-1.5 bg-background-200 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${scoreBg}`} style={{ width: `${Math.round((category.score / category.target) * 100)}%` }} />
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-foreground-500">{category.healthy}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-amber-500" />
                                <span className="text-foreground-500">{category.warning}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                <span className="text-foreground-500">{category.critical}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 pt-1">
                          <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="px-6 pb-6 border-t border-background-200 pt-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {category.subcategories.map((sub) => {
                              const subBadge = getStatusBadge(sub.status);
                              return (
                                <div key={sub.name} className="p-3 rounded-xl bg-background-50 border border-background-100">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-semibold text-foreground-800">{sub.name}</span>
                                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${subBadge.bg} ${subBadge.border} ${subBadge.text}`}>
                                      <span className={`w-1 h-1 rounded-full ${subBadge.dot}`} />
                                      {subBadge.label}
                                    </span>
                                  </div>
                                  <p className="text-xs text-foreground-600 mb-1">{sub.detail}</p>
                                  <div className="flex items-center justify-between text-[10px]">
                                    <span className="text-foreground-500">KPI: {sub.kpi}</span>
                                    <i className={getTrendIcon(sub.trend)} />
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

        {/* === TAB: TICKETS CONSOLIDÉS === */}
        {activeTab === 'tickets' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Tickets Consolidés — {TICKET_TOTALS.total} Tickets, 4 Engines
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  {TICKET_TOTALS.critical} critiques · {TICKET_TOTALS.high} haute priorité · {TICKET_TOTALS.open} ouverts · {TICKET_TOTALS.inProgress} en cours · {TICKET_TOTALS.resolved} résolus
                </p>
              </div>

              {/* Global Ticket Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {[
                  { label: 'Total', value: TICKET_TOTALS.total, icon: 'ri-ticket-line', color: '#4F46E5' },
                  { label: 'Ouverts', value: TICKET_TOTALS.open, icon: 'ri-error-warning-line', color: '#C2410C' },
                  { label: 'En cours', value: TICKET_TOTALS.inProgress, icon: 'ri-loader-4-line', color: '#E8943A' },
                  { label: 'Résolus', value: TICKET_TOTALS.resolved, icon: 'ri-check-double-line', color: '#86BC25' },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-white border border-background-200 p-5 text-center">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                      <i className={`${s.icon} text-lg`} style={{ color: s.color }} />
                    </div>
                    <span className="block text-3xl font-bold text-foreground-950 font-heading">{s.value}</span>
                    <span className="text-xs text-foreground-400">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Engine Sources */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TICKET_SOURCES.map((source) => (
                  <a
                    key={source.engine}
                    href={source.enginePath}
                    className="rounded-2xl border border-background-200 bg-white p-5 hover:shadow-md transition-all cursor-pointer block"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${source.engineColor}15` }}>
                        <i className={`${source.engineIcon} text-lg`} style={{ color: source.engineColor }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground-950">{source.engine}</h3>
                        <p className="text-xs text-foreground-500">{source.total} tickets</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-red-50 border border-red-100 text-center">
                        <span className="block text-lg font-bold text-red-700">{source.critical}</span>
                        <span className="text-red-500">Critiques</span>
                      </div>
                      <div className="p-2 rounded-lg bg-amber-50 border border-amber-100 text-center">
                        <span className="block text-lg font-bold text-amber-700">{source.high}</span>
                        <span className="text-amber-500">Haute priorité</span>
                      </div>
                      <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-center">
                        <span className="block text-lg font-bold text-emerald-700">{source.resolved}</span>
                        <span className="text-emerald-500">Résolus</span>
                      </div>
                      <div className="p-2 rounded-lg bg-accent-50 border border-accent-100 text-center">
                        <span className="block text-lg font-bold text-accent-700">{source.inProgress}</span>
                        <span className="text-accent-500">En cours</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-end mt-3 text-xs text-foreground-400">
                      <span>Voir détails <i className="ri-arrow-right-line" /></span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Cross-link to all 4 engines */}
              <div className="mt-8 rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white text-center">
                <h3 className="font-heading text-xl font-bold mb-4">Accéder aux Engines de Correction</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Corrective Execution', path: '/kos-corrective-execution-engine', color: '#C2410C' },
                    { label: 'Content Correction', path: '/kos-content-correction-engine', color: '#4A7A1E' },
                    { label: 'Cyber & Tech', path: '/kos-cyber-tech-correction-engine', color: '#0891B2' },
                    { label: 'Digital Growth', path: '/kos-digital-growth-correction-engine', color: '#C05A3A' },
                  ].map((link) => (
                    <a
                      key={link.path}
                      href={link.path}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap"
                      style={{ backgroundColor: `${link.color}25`, border: `1px solid ${link.color}40`, color: '#fff' }}
                    >
                      <i className="ri-external-link-line text-xs" />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* === TAB: EXÉCUTION EN BLOC === */}
        {activeTab === 'execution' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Exécution en Bloc — {EXECUTION_BATCHES.length} Batches
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  {EXECUTION_BATCHES.reduce((s, b) => s + b.tasks.length, 0)} actions correctives.{' '}
                  {EXECUTION_BATCHES.filter(b => b.parallelizable).length} parallélisables.{' '}
                  Estimation totale : {stats.estimatedExecutionTime}.
                </p>
              </div>

              {/* Execute All Button */}
              <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 mb-10 text-center">
                {!isExecuting && executedBatches.length === 0 ? (
                  <>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 mb-6">
                      <i className="ri-flashlight-line text-amber-400 text-sm" />
                      <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">PRÊT À EXÉCUTER</span>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-4">
                      {EXECUTION_BATCHES.reduce((s, b) => s + b.tasks.length, 0)} actions prêtes à être exécutées
                    </h3>
                    <p className="text-gray-300 mb-6 max-w-xl mx-auto text-sm">
                      Cette opération audite tous les engines, applique les corrections automatiques et génère un rapport complet.
                      Certaines actions nécessitent une intervention manuelle (clés API).
                    </p>
                    <button
                      onClick={handleExecuteAll}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-amber-500 text-foreground-950 font-bold text-lg hover:bg-amber-400 transition-all duration-300 cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-play-circle-fill text-2xl" />
                      EXÉCUTER TOUT EN BLOC
                    </button>
                    <p className="text-xs text-gray-500 mt-4">{stats.estimatedExecutionTime}</p>
                  </>
                ) : isExecuting ? (
                  <>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 mb-6">
                      <i className="ri-loader-4-line text-amber-400 text-sm animate-spin" />
                      <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">EXÉCUTION EN COURS...</span>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-4">
                      Progression : {executionProgress}%
                    </h3>
                    <div className="w-full max-w-lg mx-auto h-3 bg-white/10 rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-700"
                        style={{ width: `${executionProgress}%` }}
                      />
                    </div>
                    <p className="text-gray-300 text-sm">
                      {executedBatches.length}/{EXECUTION_BATCHES.length} batches exécutés
                    </p>
                  </>
                ) : (
                  <>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-6">
                      <i className="ri-check-double-line text-emerald-400 text-sm" />
                      <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">EXÉCUTION TERMINÉE</span>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">
                      {EXECUTION_BATCHES.reduce((s, b) => s + b.tasks.length, 0)} actions exécutées avec succès
                    </h3>
                    <p className="text-gray-300 text-sm mb-6">
                      Score système estimé post-exécution : {KPI_SCORECARD[0].postExecutionScore}/10
                    </p>
                    {executionReport && (
                      <div className="grid grid-cols-3 gap-3 mb-6 max-w-lg mx-auto">
                        <div className="rounded-xl bg-white/10 border border-white/20 p-3 text-center">
                          <span className="block text-xl font-bold text-emerald-400">{executionReport.completedBatches}</span>
                          <span className="text-[10px] text-gray-400">Réussis</span>
                        </div>
                        <div className="rounded-xl bg-white/10 border border-white/20 p-3 text-center">
                          <span className="block text-xl font-bold text-red-400">{executionReport.failedBatches}</span>
                          <span className="text-[10px] text-gray-400">Avertissements</span>
                        </div>
                        <div className="rounded-xl bg-white/10 border border-white/20 p-3 text-center">
                          <span className="block text-xl font-bold text-amber-400">+{executionReport.estimatedScoreGain.toFixed(1)}</span>
                          <span className="text-[10px] text-gray-400">Score gagné</span>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={resetExecution}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-refresh-line" />
                      Réinitialiser
                    </button>
                  </>
                )}
              </div>

              {/* Live Execution Log */}
              {executionLog.length > 0 && (
                <div className="rounded-2xl border border-foreground-800 bg-foreground-950 p-5 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Journal d&apos;Exécution — Supabase Edge Functions</span>
                  </div>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {executionLog.map((log, i) => (
                      <p key={i} className={`text-xs font-mono ${
                        log.includes('✅') ? 'text-emerald-400' :
                        log.includes('❌') ? 'text-red-400' :
                        log.includes('⚠️') ? 'text-amber-400' :
                        log.includes('🚀') || log.includes('🏁') ? 'text-amber-300 font-bold' :
                        'text-gray-400'
                      }`}>{log}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Execution Batches */}
              <div className="space-y-4">
                {EXECUTION_BATCHES.map((batch) => {
                  const isExpanded = expandedBatch === batch.id;
                  const isDone = executedBatches.includes(batch.id);
                  return (
                    <div
                      key={batch.id}
                      className={`rounded-2xl border transition-all duration-300 ${
                        isDone ? 'border-emerald-300 bg-emerald-50/10' :
                        isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200 hover:shadow-md'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedBatch(isExpanded ? null : batch.id)}
                        className="w-full p-5 text-left flex items-start gap-4 cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${batch.color}15` }}>
                          {isDone ? (
                            <i className="ri-check-fill text-emerald-500 text-lg" />
                          ) : (
                            <span className="text-lg font-bold" style={{ color: batch.color }}>{batch.phase}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-base font-bold text-foreground-950">{batch.name}</h3>
                            {isDone && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                                <i className="ri-check-line text-xs" />Terminé
                              </span>
                            )}
                            {batch.parallelizable && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-50 border border-accent-200 text-accent-700">
                                <i className="ri-git-branch-line text-xs" />Parallélisable
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-foreground-500 line-clamp-1">{batch.description}</p>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-foreground-400">
                            <span><i className="ri-time-line mr-1" />{batch.estimatedDuration}</span>
                            <span>{batch.tasks.length} tâches</span>
                            {batch.dependencies.length > 0 && (
                              <span>Dépend de : {batch.dependencies.join(', ')}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0 pt-1">
                          <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="px-6 pb-5 border-t border-background-200 pt-4">
                          <div className="space-y-2">
                            {batch.tasks.map((task) => {
                              const taskBadge = getExecutionStatusBadge(isDone ? 'completed' : task.status);
                              const priBadge = getPriorityBadge(task.priority);
                              return (
                                <div key={task.id} className="flex items-start gap-3 p-3 rounded-xl bg-background-50 border border-background-100">
                                  <div className="flex-shrink-0 pt-0.5">
                                    {isDone ? (
                                      <i className="ri-checkbox-circle-fill text-emerald-500 text-sm" />
                                    ) : (
                                      <i className="ri-checkbox-blank-circle-line text-foreground-300 text-sm" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                      <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${priBadge.bg} ${priBadge.border} ${priBadge.text}`}>
                                        {priBadge.label}
                                      </span>
                                      {task.autoApplicable && (
                                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                                          <i className="ri-robot-line text-[9px]" />Auto
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-foreground-700">{task.action}</p>
                                    <div className="flex items-center gap-3 mt-1 text-[10px] text-foreground-400">
                                      <a href={task.enginePath} className="hover:text-accent-600 cursor-pointer">{task.engine}</a>
                                      <span className="text-foreground-300">{task.impact}</span>
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

        {/* === TAB: KPI SCORECARD === */}
        {activeTab === 'kpi' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  KPI Scorecard — Avant / Après Exécution
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  6 domaines mesurés. Score actuel → Score cible → Score post-exécution estimé.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {KPI_SCORECARD.map((scorecard) => {
                  const currentPct = Math.round((scorecard.currentScore / scorecard.targetScore) * 100);
                  const postPct = Math.round((scorecard.postExecutionScore / scorecard.targetScore) * 100);
                  return (
                    <div key={scorecard.category} className="rounded-2xl border border-background-200 bg-white p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${scorecard.color}15` }}>
                          <i className={`${scorecard.icon} text-lg`} style={{ color: scorecard.color }} />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-foreground-950">{scorecard.category}</h3>
                          <p className="text-xs text-foreground-500">Score {scorecard.currentScore} → {scorecard.postExecutionScore}/10</p>
                        </div>
                      </div>

                      {/* Score comparison */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-foreground-500">Actuel</span>
                          <span className="text-foreground-500">Post-exécution</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full bg-red-100 overflow-hidden relative">
                            <div className="h-full bg-red-400 rounded-full" style={{ width: `${currentPct}%` }} />
                          </div>
                          <i className="ri-arrow-right-line text-foreground-400 text-sm" />
                          <div className="flex-1 h-2 rounded-full bg-emerald-100 overflow-hidden relative">
                            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${postPct}%` }} />
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[10px] mt-1">
                          <span className="font-bold text-red-600">{scorecard.currentScore}/10</span>
                          <span className="text-foreground-400">Cible: {scorecard.targetScore}</span>
                          <span className="font-bold text-emerald-600">{scorecard.postExecutionScore}/10</span>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 gap-2">
                        {scorecard.metrics.map((metric) => (
                          <div key={metric.label} className="p-2 rounded-lg bg-background-50 border border-background-100">
                            <span className="text-[10px] text-foreground-400 block">{metric.label}</span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-sm font-bold text-foreground-950">{metric.current}</span>
                              <span className="text-[10px] text-foreground-400">→ {metric.target} {metric.unit}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* === TAB: ROADMAP === */}
        {activeTab === 'roadmap' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Roadmap d'Exécution — 5 Phases
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  De la sécurisation immédiate au blindage complet. {EXECUTION_BATCHES.reduce((s, b) => s + b.tasks.length, 0)} actions, {stats.estimatedExecutionTime}.
                </p>
              </div>

              {/* Score Progression */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
                {[
                  { label: 'Actuel', value: '7.0/10', color: '#c2410c', icon: 'ri-emotion-sad-line' },
                  { label: 'Phase 1', value: '7.8/10', color: '#e8c547', icon: 'ri-emotion-normal-line' },
                  { label: 'Phase 2', value: '8.3/10', color: '#9B7B2C', icon: 'ri-emotion-happy-line' },
                  { label: 'Phase 3', value: '8.8/10', color: '#86BC25', icon: 'ri-emotion-happy-line' },
                  { label: 'Phase 5', value: '9.2/10', color: '#22c55e', icon: 'ri-emotion-laugh-line' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white border border-background-200 p-5 text-center">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                      <i className={`${item.icon} text-lg`} style={{ color: item.color }} />
                    </div>
                    <span className="block text-2xl font-bold font-heading" style={{ color: item.color }}>{item.value}</span>
                    <span className="text-xs text-foreground-500">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="space-y-6">
                {EXECUTION_BATCHES.map((batch, i) => (
                  <div key={batch.id} className="relative">
                    {i < EXECUTION_BATCHES.length - 1 && (
                      <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-background-200 hidden md:block" />
                    )}
                    <div className="rounded-3xl bg-white border border-background-200 overflow-hidden">
                      <div className="px-6 py-4 flex items-center gap-4" style={{ backgroundColor: `${batch.color}10`, borderBottom: `2px solid ${batch.color}30` }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: batch.color }}>
                          <span className="text-white font-bold font-heading text-lg">{batch.phase}</span>
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-bold text-foreground-950">{batch.name}</h3>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="font-semibold" style={{ color: batch.color }}>{batch.estimatedDuration}</span>
                            <span className="text-foreground-400">{batch.tasks.length} tâches</span>
                            {batch.parallelizable && (
                              <span className="px-2 py-0.5 rounded-full bg-accent-50 border border-accent-200 text-accent-700 text-[10px] font-bold">Parallèle</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-sm text-foreground-600 mb-4">{batch.description}</p>
                        <div className="space-y-2">
                          {batch.tasks.map((task) => {
                            const priBadge = getPriorityBadge(task.priority);
                            return (
                              <div key={task.id} className="flex items-start gap-2 p-2 rounded-lg bg-background-50 text-xs">
                                <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold flex-shrink-0 ${priBadge.bg} ${priBadge.border} ${priBadge.text}`}>
                                  {priBadge.label}
                                </span>
                                <span className="text-foreground-700">{task.action}</span>
                                {task.autoApplicable && (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] bg-emerald-50 border border-emerald-200 text-emerald-700 flex-shrink-0">
                                    Auto
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {batch.dependencies.length > 0 && (
                          <p className="text-[10px] text-foreground-400 mt-3">
                            <i className="ri-git-merge-line mr-1" />
                            Dépend de : {batch.dependencies.join(' → ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Cross-link to Ecosystem */}
        <section className="py-12 sm:py-16 bg-white border-t border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                Écosystème KOS — Tous les Engines Connectés
              </h2>
              <p className="text-foreground-600">Le KOS Enterprise Engine pilote l'ensemble du système.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <a href="/kos-enterprise-engine" className="rounded-xl border-2 border-amber-300 bg-amber-50/30 p-4 text-center hover:shadow-md transition-all cursor-pointer block">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-amber-100 flex items-center justify-center">
                  <i className="ri-cpu-line text-amber-600 text-lg" />
                </div>
                <span className="text-sm font-bold text-amber-800">Enterprise Engine</span>
                <span className="block text-[10px] text-amber-600 mt-1">← Hub Central</span>
              </a>
              {[
                { label: 'Corrective Execution', path: '/kos-corrective-execution-engine', icon: 'ri-tools-line', color: '#C2410C' },
                { label: 'Auto-Task Orchestrator', path: '/kos-auto-task-orchestrator', icon: 'ri-list-check', color: '#4F46E5' },
                { label: 'Quality System', path: '/kos-autonomous-quality-system', icon: 'ri-shield-check-line', color: '#8B3040' },
                { label: 'KOS Dashboard', path: '/kos-dashboard', icon: 'ri-dashboard-line', color: '#0D7B5F' },
                { label: 'Orchestrator Engine', path: '/kos-orchestrator-engine', icon: 'ri-git-branch-line', color: '#4F46E5' },
                { label: 'Enterprise Brain OS', path: '/kos-enterprise-brain-os', icon: 'ri-brain-line', color: '#9B7B2C' },
                { label: 'Enterprise OS Core', path: '/kos-enterprise-os-core-command', icon: 'ri-cpu-line', color: '#5B8C2A' },
              ].map((link) => (
                <a key={link.path} href={link.path} className="rounded-xl border border-background-200 bg-background-50 p-4 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                    <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                  </div>
                  <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

    </hubLayout>
  );
}



