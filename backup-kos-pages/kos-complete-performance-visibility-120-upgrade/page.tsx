import { useState } from 'react';
import { useKOSCompletePerformanceVisibility120Upgrade } from '@/hooks/useKOSCompletePerformanceVisibility120Upgrade';
import { AnimatedCounter } from '@/components/base/AnimatedCounter';

const TABS = [
  { id: 'overview' as const, label: 'Vue d\'Ensemble', icon: 'ri-dashboard-3-line' },
  { id: 'performance' as const, label: 'Performance', icon: 'ri-speed-line' },
  { id: 'marketing' as const, label: 'Marketing Digital', icon: 'ri-megaphone-line' },
  { id: 'lead-magnets' as const, label: 'Lead Magnets', icon: 'ri-download-2-line' },
  { id: 'ami-ao' as const, label: 'AMI/AO', icon: 'ri-radar-line' },
  { id: 'upgrade' as const, label: 'Upgrade 120%', icon: 'ri-rocket-2-line' },
  { id: 'timeline' as const, label: 'Timeline', icon: 'ri-timeline-view' },
];

const STATUS_ICONS: Record<string, string> = {
  excellence: 'ri-star-line text-accent-500',
  avance: 'ri-arrow-up-circle-fill text-foreground-950',
  intermediaire: 'ri-check-double-line text-secondary-500',
  emergent: 'ri-error-warning-line text-amber-600',
  critique: 'ri-alert-fill text-red-600',
};

const STATUS_LABELS: Record<string, string> = {
  excellence: 'Excellence',
  avance: 'Avancé',
  intermediaire: 'Intermédiaire',
  emergent: 'Émergent',
  critique: 'Critique',
};

const SEVERITY_COLORS: Record<string, string> = {
  critical: 'bg-red-100 text-red-900',
  high: 'bg-amber-100 text-amber-900',
  medium: 'bg-secondary-100 text-secondary-900',
  low: 'bg-accent-100 text-accent-900',
};

const CHANNEL_STATUS: Record<string, string> = {
  actif: 'bg-accent-100 text-accent-900',
  partiel: 'bg-amber-100 text-amber-900',
  bloque: 'bg-red-100 text-red-900',
  planifie: 'bg-secondary-100 text-secondary-900',
};

const LEAD_STATUS: Record<string, string> = {
  optimal: 'bg-accent-100 text-accent-900',
  stable: 'bg-secondary-100 text-secondary-900',
  ameliorer: 'bg-amber-100 text-amber-900',
  critique: 'bg-red-100 text-red-900',
};

const LEAD_STATUS_LABELS: Record<string, string> = {
  optimal: 'Optimal',
  stable: 'Stable',
  ameliorer: 'À Améliorer',
  critique: 'Critique',
};

const TENDER_STATUS: Record<string, string> = {
  critique: 'bg-red-100 text-red-900',
  elevee: 'bg-amber-100 text-amber-900',
  evaluer: 'bg-secondary-100 text-secondary-900',
  surveiller: 'bg-background-200 text-foreground-700',
};

const TENDER_STATUS_LABELS: Record<string, string> = {
  critique: 'CRITIQUE',
  elevee: 'ÉLEVÉE',
  evaluer: 'ÉVALUER',
  surveiller: 'SURVEILLER',
};

const PRIORITY_COLORS: Record<string, string> = {
  P0: 'bg-red-100 text-red-900',
  P1: 'bg-amber-100 text-amber-900',
  P2: 'bg-secondary-100 text-secondary-900',
};

const ACTION_STATUS_COLORS: Record<string, string> = {
  completed: 'bg-accent-100 text-accent-900',
  in_progress: 'bg-secondary-100 text-secondary-900',
  pending: 'bg-background-200 text-foreground-700',
  blocked: 'bg-red-100 text-red-900',
};

const ACTION_STATUS_LABELS: Record<string, string> = {
  completed: 'Terminé',
  in_progress: 'En cours',
  pending: 'Planifié',
  blocked: 'Bloqué',
};

const MILESTONE_STATUS_COLORS: Record<string, string> = {
  completed: 'bg-accent-500',
  in_progress: 'bg-secondary-500',
  upcoming: 'bg-background-200',
};

export default function completePerformanceVisibility120UpgradePage() {
  const {
    meta, kpis, domains, perfMetrics, marketingChannels,
    leadMagnets, leadMagnetAggregated, tenders, tenderSystem,
    upgradeActions, milestones,
    loading, activeTab, setActiveTab,
    perfFilter, setPerfFilter, filteredPerfMetrics,
    upgradeFilter, setUpgradeFilter, filteredUpgradeActions,
    dataSource, error, refresh,
  } = useKOSCompletePerformanceVisibility120Upgrade();

  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  const [expandedUpgrade, setExpandedUpgrade] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground-700 text-sm">Scan complet Performance · Visibilité · Marketing · Lead Magnets · AMI/AO · Upgrade 120% en cours...</p>
          <p className="text-foreground-600 text-xs mt-2">Analyse 38 agents · 93 actions · 5 domaines</p>
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

  const getScoreBar = (score: number) => {
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
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center shrink-0">
                <i className="ri-rocket-2-line text-2xl text-background-50"></i>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground-950">
                  Complete Performance · Visibilité · Marketing · Lead Magnets · AMI/AO & Upgrade 120%
                </h1>
                <p className="text-sm text-foreground-600">
                  {meta.consortium} — {meta.auditDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-background-50 rounded-xl border border-background-200/70 px-4 py-2 shrink-0">
              <span className="text-xs text-foreground-600">Cockpit</span>
              <span className="text-sm font-bold text-primary-500">{meta.cockpitId}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={refresh}
                className="w-8 h-8 rounded-lg bg-background-100 hover:bg-background-200 flex items-center justify-center cursor-pointer transition-colors"
                title="Rafraîchir les données"
              >
                <i className="ri-refresh-line text-foreground-700"></i>
              </button>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                dataSource === 'live'
                  ? 'bg-accent-100 text-accent-900'
                  : 'bg-amber-100 text-amber-900'
              }`}>
                <i className={`${dataSource === 'live' ? 'ri-database-2-line' : 'ri-file-copy-line'} mr-1`}></i>
                {dataSource === 'live' ? 'Live DB' : 'Mock'}
              </span>
              {error && (
                <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-1 rounded-full hidden sm:inline">
                  {error}
                </span>
              )}
            </div>
          </div>

          {/* Global KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className={`text-3xl font-bold ${getScoreColor(kpis.globalScore)}`}>
                <AnimatedCounter value={kpis.globalScore} />
              </div>
              <div className="text-xs text-foreground-600 mt-1">Score Global /{kpis.globalTarget}</div>
              <div className="text-[10px] text-accent-500 mt-0.5">+{kpis.globalTrend}%</div>
            </div>
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className="text-3xl font-bold text-foreground-950">{kpis.totalDomains}</div>
              <div className="text-xs text-foreground-600 mt-1">Domaines</div>
            </div>
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className="text-3xl font-bold text-foreground-950">{kpis.totalAgents}</div>
              <div className="text-xs text-foreground-600 mt-1">Agents IA</div>
            </div>
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className="text-3xl font-bold text-accent-500">{kpis.totalCompleted}/{kpis.totalActions}</div>
              <div className="text-xs text-foreground-600 mt-1">Actions Complétées</div>
            </div>
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className="text-3xl font-bold text-red-600">{kpis.totalCriticalFindings}</div>
              <div className="text-xs text-foreground-600 mt-1">Critiques Ouverts</div>
            </div>
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
              <div className="text-lg font-bold text-foreground-950">{kpis.totalBudget}</div>
              <div className="text-xs text-foreground-600 mt-1">Budget Total</div>
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
        {/* ==================== OVERVIEW TAB ==================== */}
        {activeTab === 'overview' && (
          <div>
            {/* Domain Cards */}
            <h2 className="text-lg font-semibold text-foreground-950 mb-4">Score par Domaine</h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
              {domains.map(domain => (
                <div
                  key={domain.domainId}
                  className="bg-background-50 rounded-2xl border border-background-200/70 p-5 hover:border-background-300/60 transition-colors cursor-pointer"
                  onClick={() => setExpandedDomain(expandedDomain === domain.domainId ? null : domain.domainId)}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-background-100 flex items-center justify-center">
                      <i className={`${domain.icon} text-sm text-foreground-950`}></i>
                    </div>
                    <span className="text-xs font-medium text-foreground-950 leading-tight flex-1">{domain.domainName}</span>
                  </div>
                  <div className="flex items-end justify-between mb-3">
                    <span className={`text-2xl font-bold ${getScoreColor(domain.score)}`}>
                      <AnimatedCounter value={domain.score} />
                    </span>
                    <span className="text-xs text-foreground-600">/ {domain.target}</span>
                  </div>
                  <div className="h-1.5 bg-background-200 rounded-full overflow-hidden mb-3">
                    <div className="h-full rounded-full transition-all" style={{
                      width: `${(domain.score / domain.target) * 100}%`,
                      backgroundColor: getScoreBar(domain.score),
                    }}></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-foreground-600">
                    <span>{domain.agents} agents</span>
                    <span>{domain.completed}/{domain.actions} actions</span>
                    <span className="text-red-600">{domain.criticalFindings} critiques</span>
                  </div>
                  {expandedDomain === domain.domainId && (
                    <div className="mt-4 pt-4 border-t border-background-200/70">
                      <div className="text-xs text-foreground-700 mb-2">
                        <span className="text-foreground-600">Budget: </span>{domain.budget}
                      </div>
                      <div className="text-xs text-foreground-700 mb-2">
                        <span className="text-foreground-600">Deadline: </span>{domain.deadline}
                      </div>
                      <div className="text-xs text-foreground-700">
                        <span className="text-foreground-600">Tendance: </span>
                        <span className="text-accent-500 font-medium">+{domain.trend}%</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Global Radar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-1 bg-background-50 rounded-2xl border border-background-200/70 p-6">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4">Score Global Qualité</h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-52 h-52">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8" className="text-background-200" />
                      <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8"
                        strokeDasharray={`${(kpis.globalScore / kpis.globalTarget) * 327} 327`}
                        strokeLinecap="round"
                        style={{ color: getScoreBar(kpis.globalScore) }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-4xl font-bold ${getScoreColor(kpis.globalScore)}`}>
                        <AnimatedCounter value={kpis.globalScore} />
                      </span>
                      <span className="text-xs text-foreground-600">/ {kpis.globalTarget}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center text-xs text-foreground-600">
                  Progression: <span className="font-medium text-foreground-950">{((kpis.globalScore / kpis.globalTarget) * 100).toFixed(1)}%</span>
                </div>
              </div>

              <div className="lg:col-span-2 bg-background-50 rounded-2xl border border-background-200/70 p-6">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4">Résumé Exécutif</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-accent-50 rounded-xl">
                    <div className="text-xl font-bold text-accent-500">{domains.filter(d => d.status === 'excellence').length}</div>
                    <div className="text-xs text-foreground-600 mt-0.5">Excellence</div>
                  </div>
                  <div className="text-center p-3 bg-secondary-50 rounded-xl">
                    <div className="text-xl font-bold text-foreground-950">{domains.filter(d => d.status === 'avance').length}</div>
                    <div className="text-xs text-foreground-600 mt-0.5">Avancé</div>
                  </div>
                  <div className="text-center p-3 bg-amber-50 rounded-xl">
                    <div className="text-xl font-bold text-amber-600">{domains.filter(d => d.status === 'emergent' || d.status === 'intermediaire').length}</div>
                    <div className="text-xs text-foreground-600 mt-0.5">Émergent/Inter.</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-xl">
                    <div className="text-xl font-bold text-red-600">{domains.filter(d => d.status === 'critique').length}</div>
                    <div className="text-xs text-foreground-600 mt-0.5">Critique</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-foreground-600">ROI Projeté: </span>
                    <span className="font-semibold text-accent-500">{kpis.roiProjected}</span>
                  </div>
                  <div>
                    <span className="text-foreground-600">Complétion Projetée: </span>
                    <span className="font-semibold text-foreground-950">{kpis.projectedCompletion}</span>
                  </div>
                  <div>
                    <span className="text-foreground-600">Mandat: </span>
                    <span className="font-semibold text-foreground-950">{kpis.mandate}</span>
                  </div>
                  <div>
                    <span className="text-foreground-600">Méthodologie: </span>
                    <span className="font-semibold text-foreground-950 truncate block">{kpis.methodology}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== PERFORMANCE TAB ==================== */}
        {activeTab === 'performance' && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-foreground-950">Performance & Visibilité Publique — Score {domains[0].score}/95</h2>
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'all', label: 'Toutes' },
                  { id: 'critical', label: 'Critiques' },
                  { id: 'high', label: 'Élevées' },
                  { id: 'medium', label: 'Moyennes' },
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setPerfFilter(f.id)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                      perfFilter === f.id ? 'bg-primary-500 text-background-50' : 'bg-background-100 text-foreground-700 hover:bg-background-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {filteredPerfMetrics.map(metric => (
                <div key={metric.metric} className="bg-background-50 rounded-2xl border border-background-200/70 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-background-100 flex items-center justify-center shrink-0">
                        <i className={`${metric.icon} text-lg text-foreground-950`}></i>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-semibold text-foreground-950">{metric.metric}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${SEVERITY_COLORS[metric.severity]}`}>
                            {metric.severity === 'critical' ? 'Critique' : metric.severity === 'high' ? 'Élevé' : metric.severity === 'medium' ? 'Moyen' : 'Faible'}
                          </span>
                        </div>
                        <p className="text-xs text-foreground-600 mt-1">{metric.detail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-center">
                        <div className="text-xs text-foreground-600">Actuel</div>
                        <div className="text-sm font-bold text-red-600">{metric.current}</div>
                      </div>
                      <i className="ri-arrow-right-line text-foreground-600"></i>
                      <div className="text-center">
                        <div className="text-xs text-foreground-600">Cible</div>
                        <div className="text-sm font-bold text-accent-500">{metric.target}</div>
                      </div>
                      <div className="text-center min-w-[50px]">
                        <div className={`text-lg font-bold ${getScoreColor(metric.score)}`}>{metric.score}</div>
                        <div className="text-[10px] text-foreground-600">/100</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-background-100/50 rounded-xl p-3 flex flex-col sm:flex-row gap-3 text-xs">
                    <div className="flex items-start gap-2 flex-1">
                      <i className="ri-rocket-line text-accent-500 mt-0.5 shrink-0"></i>
                      <span className="text-foreground-700">{metric.action}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <i className="ri-calendar-line text-foreground-600"></i>
                      <span className="text-foreground-600">{metric.deadline}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== MARKETING DIGITAL TAB ==================== */}
        {activeTab === 'marketing' && (
          <div>
            <h2 className="text-lg font-semibold text-foreground-950 mb-6">Marketing Digital & Social Selling</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {marketingChannels.map(channel => (
                <div key={channel.channel} className="bg-background-50 rounded-2xl border border-background-200/70 p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-background-100 flex items-center justify-center">
                        <i className={`${channel.icon} text-lg text-foreground-950`}></i>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground-950">{channel.channel}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${CHANNEL_STATUS[channel.status]}`}>
                            {channel.status === 'actif' ? 'Actif' : channel.status === 'partiel' ? 'Partiel' : channel.status === 'bloque' ? 'Bloqué' : 'Planifié'}
                          </span>
                          <span className="text-xs text-foreground-600">{channel.postsPerMonth} posts/mois</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${getScoreColor(channel.score)}`}>{channel.score}</div>
                      <div className="text-[10px] text-foreground-600">/ {channel.target}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3 text-xs">
                    <div>
                      <div className="text-foreground-600">Audience</div>
                      <div className="font-semibold text-foreground-950">{channel.audience.toLocaleString()}</div>
                      <div className="text-[10px] text-foreground-600">cible {channel.targetAudience.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-foreground-600">Engagement</div>
                      <div className="font-semibold text-foreground-950">{channel.engagement}%</div>
                    </div>
                    <div>
                      <div className="text-foreground-600">Budget</div>
                      <div className="font-semibold text-foreground-950 text-xs">{channel.budget}</div>
                    </div>
                  </div>
                  <div className="bg-background-100/50 rounded-xl p-3 text-xs">
                    <div className="flex items-start gap-2 mb-2">
                      <i className="ri-error-warning-line text-amber-600 mt-0.5 shrink-0"></i>
                      <span className="text-foreground-700">{channel.keyIssue}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <i className="ri-lightbulb-line text-accent-500 mt-0.5 shrink-0"></i>
                      <span className="text-foreground-700">{channel.recommendation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== LEAD MAGNETS TAB ==================== */}
        {activeTab === 'lead-magnets' && (
          <div>
            {/* Aggregated KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
                <div className="text-xl font-bold text-foreground-950">{leadMagnetAggregated.totalDownloads.toLocaleString()}</div>
                <div className="text-xs text-foreground-600 mt-1">Downloads / {leadMagnetAggregated.targetDownloads.toLocaleString()}</div>
              </div>
              <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
                <div className="text-xl font-bold text-foreground-950">{leadMagnetAggregated.totalLeads.toLocaleString()}</div>
                <div className="text-xs text-foreground-600 mt-1">Leads / {leadMagnetAggregated.targetLeads.toLocaleString()}</div>
              </div>
              <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
                <div className="text-xl font-bold text-accent-500">{leadMagnetAggregated.qualifiedLeads.toLocaleString()}</div>
                <div className="text-xs text-foreground-600 mt-1">Leads Qualifiés</div>
              </div>
              <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
                <div className="text-xl font-bold text-foreground-950">{leadMagnetAggregated.avgConversionRate}%</div>
                <div className="text-xs text-foreground-600 mt-1">Conv. / {leadMagnetAggregated.targetConversionRate}%</div>
              </div>
              <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
                <div className="text-lg font-bold text-accent-500">{leadMagnetAggregated.pipelineValue}</div>
                <div className="text-xs text-foreground-600 mt-1">Pipeline</div>
              </div>
              <div className="bg-background-50 rounded-xl border border-background-200/70 p-4 text-center">
                <div className="text-lg font-bold text-foreground-950">{leadMagnetAggregated.projectedRevenueImpact}</div>
                <div className="text-xs text-foreground-600 mt-1">Impact Projeté</div>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-foreground-950 mb-4">Performance Lead Magnets</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {leadMagnets.map(lm => (
                <div key={lm.id} className="bg-background-50 rounded-2xl border border-background-200/70 p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-background-100 flex items-center justify-center">
                        <i className={`${lm.icon} text-lg text-foreground-950`}></i>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground-950">{lm.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-background-200 text-foreground-700">{lm.category}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${LEAD_STATUS[lm.status]}`}>{LEAD_STATUS_LABELS[lm.status]}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${getScoreColor(lm.score)}`}>{lm.score}</div>
                      <div className="text-[10px] text-foreground-600">/100</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                    <div>
                      <div className="text-foreground-600">Downloads</div>
                      <div className="font-semibold text-foreground-950">{lm.downloads.toLocaleString()} / {lm.targetDownloads.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-foreground-600">Conversion</div>
                      <div className="font-semibold text-foreground-950">{lm.conversionRate}% / {lm.targetConversion}%</div>
                    </div>
                    <div>
                      <div className="text-foreground-600">Leads Générés</div>
                      <div className="font-semibold text-foreground-950">{lm.leadsGenerated} ({lm.qualifiedLeads} qualifiés)</div>
                    </div>
                    <div>
                      <div className="text-foreground-600">Pipeline</div>
                      <div className="font-semibold text-accent-500">{lm.pipelineValue}</div>
                    </div>
                  </div>
                  <div className="bg-background-100/50 rounded-xl p-3 text-xs">
                    <div className="flex items-start gap-2 mb-2">
                      <i className="ri-error-warning-line text-amber-600 mt-0.5 shrink-0"></i>
                      <span className="text-foreground-700">{lm.gap}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <i className="ri-rocket-line text-accent-500 mt-0.5 shrink-0"></i>
                      <span className="text-foreground-700">{lm.optimization}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== AMI/AO TAB ==================== */}
        {activeTab === 'ami-ao' && (
          <div>
            {/* Tender Detection System */}
            <div className="bg-background-50 rounded-2xl border border-background-200/70 p-5 mb-6">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4">Système de Détection & Notification</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-background-100 rounded-xl">
                  <div className="text-lg font-bold text-foreground-950">{tenderSystem.sourcesActive}/{tenderSystem.sourcesTarget}</div>
                  <div className="text-xs text-foreground-600 mt-0.5">Sources Actives</div>
                </div>
                <div className="text-center p-3 bg-background-100 rounded-xl">
                  <div className="text-lg font-bold text-foreground-950">{tenderSystem.tendersDetectedThisMonth}/{tenderSystem.tendersDetectedTarget}</div>
                  <div className="text-xs text-foreground-600 mt-0.5">AO/AMI/mois</div>
                </div>
                <div className="text-center p-3 bg-background-100 rounded-xl">
                  <div className="text-lg font-bold text-amber-600">{tenderSystem.alertsDelivered}/{tenderSystem.alertsDeliveryTarget}</div>
                  <div className="text-xs text-foreground-600 mt-0.5">Alertes Livrées</div>
                </div>
                <div className="text-center p-3 bg-background-100 rounded-xl">
                  <div className="text-lg font-bold text-foreground-950">{tenderSystem.notificationLatency}</div>
                  <div className="text-xs text-foreground-600 mt-0.5">Latence / &lt; {tenderSystem.targetLatency}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-xs mb-4">
                <div><span className="text-foreground-600">Pipeline Total: </span><span className="font-semibold text-accent-500">{tenderSystem.pipelineValue}</span></div>
                <div><span className="text-foreground-600">Win Rate: </span><span className="font-semibold text-foreground-950">{tenderSystem.winRate}</span></div>
                <div><span className="text-foreground-600">Cron Jobs: </span><span className="font-semibold text-red-600">{tenderSystem.cronJobsFailing} échecs</span></div>
              </div>
              <div className="bg-red-50 rounded-xl p-3 text-xs flex items-start gap-2">
                <i className="ri-alert-fill text-red-600 mt-0.5 shrink-0"></i>
                <div>
                  <span className="font-medium text-red-900">Gap Critique: </span>
                  <span className="text-red-800">{tenderSystem.kritikalGap}</span>
                  <div className="mt-1 text-red-700">Action: {tenderSystem.fixAction} — Budget: {tenderSystem.fixBudget}</div>
                </div>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-foreground-950 mb-4">Appels d'Offres & Manifestations d'Intérêt Actifs</h3>
            <div className="space-y-3">
              {tenders.map(tender => (
                <div key={tender.id} className="bg-background-50 rounded-2xl border border-background-200/70 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-3 h-3 rounded-full shrink-0 ${
                        tender.status === 'critique' ? 'bg-red-500' :
                        tender.status === 'elevee' ? 'bg-amber-500' :
                        tender.status === 'evaluer' ? 'bg-secondary-500' : 'bg-background-300'
                      }`}></div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-foreground-950">{tender.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-foreground-600 flex-wrap">
                          <span className="flex items-center gap-1"><i className="ri-building-line"></i>{tender.source}</span>
                          <span className="flex items-center gap-1"><i className="ri-money-dollar-circle-line"></i>{tender.budget}</span>
                          <span className="flex items-center gap-1"><i className="ri-calendar-line"></i>{tender.deadline}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${TENDER_STATUS[tender.status]}`}>
                        {TENDER_STATUS_LABELS[tender.status]}
                      </span>
                      <span className="text-sm font-bold text-foreground-950">{tender.score}%</span>
                      {tender.notified && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-900 flex items-center gap-1">
                          <i className="ri-notification-3-line text-[10px]"></i>Notifié
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-background-200/70 text-xs text-foreground-700 flex items-center gap-2">
                    <i className="ri-file-list-3-line text-foreground-600"></i>
                    {tender.actions}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== UPGRADE 120% TAB ==================== */}
        {activeTab === 'upgrade' && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-foreground-950">Plan Upgrade 120% Standards Big Four — 8 Axes</h2>
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'all', label: 'Toutes' },
                  { id: 'P0', label: 'P0' },
                  { id: 'P1', label: 'P1' },
                  { id: 'P2', label: 'P2' },
                  { id: 'in_progress', label: 'En cours' },
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setUpgradeFilter(f.id)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                      upgradeFilter === f.id ? 'bg-primary-500 text-background-50' : 'bg-background-100 text-foreground-700 hover:bg-background-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {filteredUpgradeActions.map(action => (
                <div key={action.id} className="bg-background-50 rounded-2xl border border-background-200/70 overflow-hidden">
                  <button
                    onClick={() => setExpandedUpgrade(expandedUpgrade === action.id ? null : action.id)}
                    className="w-full flex flex-col sm:flex-row sm:items-center gap-4 justify-between p-5 hover:bg-background-100/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-background-100 flex items-center justify-center shrink-0">
                        <i className={`${action.axeIcon} text-lg text-foreground-950`}></i>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[action.priority]}`}>{action.priority}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${ACTION_STATUS_COLORS[action.status]}`}>{ACTION_STATUS_LABELS[action.status]}</span>
                          <span className="text-xs text-foreground-600">Phase {action.phase}</span>
                        </div>
                        <h3 className="text-sm font-semibold text-foreground-950 mt-1">{action.title}</h3>
                        <div className="text-xs text-foreground-600 mt-0.5">{action.axe}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-center hidden sm:block">
                        <div className="text-xs text-foreground-600">Progression</div>
                        <div className="text-sm font-bold text-foreground-950">{action.progress}%</div>
                      </div>
                      <div className="w-16 h-1.5 bg-background-200 rounded-full overflow-hidden hidden sm:block">
                        <div className="h-full rounded-full" style={{
                          width: `${action.progress}%`,
                          backgroundColor: action.progress >= 80 ? '#86BC25' : action.progress >= 40 ? '#9B7B2C' : action.progress > 0 ? '#EA580C' : '#DC2626',
                        }}></div>
                      </div>
                      <i className={`ri-${expandedUpgrade === action.id ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-600`}></i>
                    </div>
                  </button>
                  {expandedUpgrade === action.id && (
                    <div className="px-5 pb-5 border-t border-background-200/70 pt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="bg-background-100/50 rounded-xl p-3">
                          <div className="text-xs text-foreground-600">Avant</div>
                          <div className="text-sm font-medium text-red-600">{action.kpiBefore}</div>
                        </div>
                        <div className="bg-background-100/50 rounded-xl p-3">
                          <div className="text-xs text-foreground-600">Après</div>
                          <div className="text-sm font-medium text-accent-500">{action.kpiAfter}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                        <div>
                          <span className="text-foreground-600">Effort: </span>
                          <span className="font-medium text-foreground-950">{action.effort}</span>
                        </div>
                        <div>
                          <span className="text-foreground-600">Budget: </span>
                          <span className="font-medium text-foreground-950">{action.budget}</span>
                        </div>
                        <div>
                          <span className="text-foreground-600">Impact: </span>
                          <span className="font-medium text-accent-500">{action.impact}</span>
                        </div>
                        <div>
                          <span className="text-foreground-600">Deadline: </span>
                          <span className="font-medium text-foreground-950">{action.deadline}</span>
                        </div>
                      </div>
                      <div className="text-xs text-foreground-600 flex items-center gap-1">
                        <i className="ri-robot-3-line"></i>
                        Agent: <span className="font-medium text-foreground-950">{action.agent}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TIMELINE TAB ==================== */}
        {activeTab === 'timeline' && (
          <div>
            <h2 className="text-lg font-semibold text-foreground-950 mb-6">Timeline Unifiée — Jalons 2026-2027</h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-background-200 hidden sm:block"></div>

              <div className="space-y-6">
                {milestones.map((milestone, idx) => (
                  <div key={idx} className="flex gap-4 sm:gap-8">
                    {/* Timeline dot */}
                    <div className="hidden sm:flex flex-col items-center shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${MILESTONE_STATUS_COLORS[milestone.status]}`}>
                        <i className={`${
                          milestone.status === 'completed' ? 'ri-check-line text-background-50' :
                          milestone.status === 'in_progress' ? 'ri-loader-4-line text-background-50' :
                          'ri-time-line text-foreground-600'
                        } text-lg`}></i>
                      </div>
                    </div>

                    <div className="flex-1 bg-background-50 rounded-2xl border border-background-200/70 p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full sm:hidden ${MILESTONE_STATUS_COLORS[milestone.status]}`}></span>
                          <span className="text-xs font-bold text-primary-500">{milestone.date}</span>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-700">{milestone.domain}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground-950">{milestone.label}</h4>
                      <p className="text-xs text-foreground-600 mt-1">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Meta */}
        <div className="mt-12 pt-6 border-t border-background-200/70">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-foreground-600">
            <span>Scan ID: <span className="font-mono text-foreground-950">{meta.scanId}</span></span>
            <span>Assessor: {meta.consortium}</span>
            <span>Mandat: {meta.mandate}</span>
            <span>Complétion: {meta.projectedCompletion}</span>
          </div>
        </div>
      </div>
    </div>
  );
}





