import { useState, useMemo } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSBigFourGovOKR } from '@/hooks/useKOSBigFourGovOKR';

type TabId = 'executive' | 'okrs' | 'kpis' | 'corrections' | 'alerts' | 'reports' | 'ecosystem';

function getScoreColor(score: number, target: number): string {
  const pct = (score / target) * 100;
  if (pct >= 95) return '#86BC25';
  if (pct >= 85) return '#0D7B5F';
  if (pct >= 70) return '#E8C547';
  if (pct >= 50) return '#E8943A';
  return '#C2410C';
}

function getStatusBadge(status: string) {
  const map: Record<string, string> = {
    active: 'bg-red-50 text-red-700 border-red-200',
    en_cours: 'bg-amber-50 text-amber-700 border-amber-200',
    in_progress: 'bg-amber-50 text-amber-700 border-amber-200',
    resolue: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    live: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };
  return map[status] || 'bg-slate-50 text-slate-600 border-slate-200';
}

export default function KOSBigFourGovOKRPage() {
  const {
    okrs,
    kpiTargets,
    reports,
    filteredAlerts,
    autoMetrics,
    crossLinks,
    summary,
    loading,
    alertFilter,
    setAlertFilter,
    alertStatusFilter,
    setAlertStatusFilter,
    criticalAlertsCount,
    activeAlertsCount,
    okrsOnTrack,
    refresh,
  } = useKOSBigFourGovOKR();

  const [activeTab, setActiveTab] = useState<TabId>('executive');
  const [expandedOKR, setExpandedOKR] = useState<string | null>(null);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  const overallScore = summary.overall_score;
  const overallColor = getScoreColor(overallScore, 100);

  const tabs: { id: TabId; label: string; icon: string; badge: string }[] = [
    { id: 'executive', label: 'Vue Exécutive', icon: 'ri-dashboard-line', badge: `${overallScore}/100` },
    { id: 'okrs', label: 'OKR Framework', icon: 'ri-focus-2-line', badge: `${okrsOnTrack}/${summary.okrs_total}` },
    { id: 'kpis', label: 'KPIs Cibles', icon: 'ri-speed-line', badge: `${summary.kpis_at_target}/${summary.kpis_total}` },
    { id: 'corrections', label: 'Auto-Correction', icon: 'ri-tools-line', badge: `${autoMetrics.auto_fix_rate}%` },
    { id: 'alerts', label: 'Alertes', icon: 'ri-alert-line', badge: `${activeAlertsCount}` },
    { id: 'reports', label: 'Rapports Trim.', icon: 'ri-file-chart-line', badge: `GRI/ISSB` },
    { id: 'ecosystem', label: 'Écosystème', icon: 'ri-git-branch-line', badge: `${crossLinks.length}` },
  ];

  const okrWeightedAvg = useMemo(() => {
    const totalWeight = okrs.reduce((s, o) => s + o.weight, 0);
    return Math.round(okrs.reduce((s, o) => s + o.progress * o.weight, 0) / totalWeight);
  }, [okrs]);

  return (
    <KOSHubLayout hubId={401}>
      <SeoHead
        title="KOS Big Four Governance OKR & Reporting Command Center™ — Pilotage Stratégique 2026 | KHEPRA EXPERTS"
        description="Cockpit de gouvernance unifié Big Four : 8 OKRs, 22 KPIs cibles, reporting trimestriel GRI/ISSB/ISO, auto-correction IA, alertes proactives. Score global 92/100 — AAA. KHEPRA EXPERTS."
        keywords="Big Four governance OKR, KPI dashboard, GRI ISSB ISO reporting, gouvernance Big Four, KHEPRA EXPERTS, zero défaut"
        canonicalPath="/kos-big-four-gov-okr"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-18 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Monumental%20cinematic%20abstract%20governance%20command%20center%20with%20interconnected%20geometric%20frameworks%20representing%20OKR%20objectives%20and%20key%20results%2C%20emerald%20and%20warm%20amber%20data%20streams%20flowing%20through%20crystalline%20pillars%2C%20sophisticated%20institutional%20aesthetic%20with%20precise%20lines%20and%20nodes%20forming%20a%20unified%20control%20architecture%2C%20dark%20atmospheric%20background%20with%20dramatic%20volumetric%20golden%20light%20rays%2C%20hyper%20realistic%208K%20render%2C%20no%20text%20no%20human%20figures%2C%20editorial%20quality%20with%20deep%20shadows&width=1920&height=700&seq=kos-bfgov-hero-2026&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-12"
            width="1920"
            height="700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/30 border border-accent-400/40 backdrop-blur-sm">
                  <i className="ri-vip-crown-line text-accent-400 text-sm" />
                  <span className="text-sm font-semibold text-accent-300 uppercase tracking-wider">KOS Big Four Governance OKR & Reporting™</span>
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">MODE LIVE</span>
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Gouvernance Big Four.
                <span className="block text-accent-400 mt-2">OKRs. KPIs. Reporting GRI/ISSB/ISO.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
                <strong className="text-white">{summary.okrs_total} Objectifs & Résultats Clés</strong> pilotés en temps réel ·{' '}
                <strong className="text-white">{summary.kpis_total} KPIs</strong> cibles suivis ·{' '}
                <strong className="text-white">{summary.quarterly_reports_published}/{summary.quarterly_reports_total} rapports</strong> trimestriels publiés.
                Score Global : <strong className="text-accent-400">{overallScore}/100 — Grade {summary.overall_grade}</strong>.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-500/20 border border-accent-400/30 text-xs text-accent-300 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
                  {okrsOnTrack}/{summary.okrs_total} OKRs On Track
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs text-emerald-300 font-bold">
                  <i className="ri-check-double-line text-xs" />
                  {summary.kpis_at_target}/{summary.kpis_total} KPIs Cible
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-400/30 text-xs text-red-300 font-bold">
                  <i className="ri-alert-line text-xs" />
                  {criticalAlertsCount} Critiques
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-500/20 border border-secondary-400/30 text-xs text-secondary-300 font-bold">
                  <i className="ri-tools-line text-xs" />
                  Auto-fix {autoMetrics.auto_fix_rate}%
                </span>
              </div>
            </div>

            {/* Score Card */}
            <div className="flex-shrink-0 w-full lg:w-64 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Governance Score</span>
              <div className="relative inline-flex mt-3 mb-2">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke={overallColor} strokeWidth="5"
                    strokeDasharray={`${(overallScore / 100) * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white font-heading">{overallScore}</span>
                  <span className="text-[9px] text-gray-400">/100</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: `${overallColor}20`, color: overallColor, border: `1px solid ${overallColor}40` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: overallColor }} />
                GRADE {summary.overall_grade}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-3 bg-foreground-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {[
              { label: 'OKRs On Track', value: `${okrsOnTrack}/${summary.okrs_total}`, icon: 'ri-focus-2-line', color: '#86BC25' },
              { label: 'OKR Score', value: `${okrWeightedAvg}%`, icon: 'ri-radar-line', color: overallColor },
              { label: 'KPIs Cible', value: `${summary.kpis_at_target}/${summary.kpis_total}`, icon: 'ri-speed-line', color: '#0D7B5F' },
              { label: 'Auto-Fix', value: `${autoMetrics.auto_fix_rate}%`, icon: 'ri-tools-line', color: '#8B5CF6' },
              { label: 'Critiques', value: String(criticalAlertsCount), icon: 'ri-alert-line', color: '#DC2626' },
              { label: 'Actives', value: String(activeAlertsCount), icon: 'ri-error-warning-line', color: '#EA580C' },
              { label: 'Rapports', value: `${summary.quarterly_reports_published}/${summary.quarterly_reports_total}`, icon: 'ri-file-chart-line', color: '#059669' },
              { label: 'Tickets', value: String(autoMetrics.total_tickets), icon: 'ri-ticket-line', color: '#6366F1' },
              { label: 'Hubs', value: String(crossLinks.length), icon: 'ri-git-branch-line', color: '#D97757' },
              { label: 'Grade', value: summary.overall_grade, icon: 'ri-medal-line', color: overallColor },
            ].map((stat, i) => (
              <div key={i} className="text-center py-1.5 rounded-lg bg-white/5 border border-white/5">
                <i className={`${stat.icon} text-[10px] mb-0.5 block`} style={{ color: stat.color }} />
                <span className="block text-sm font-bold text-white font-heading">{stat.value}</span>
                <span className="text-[9px] text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-white'
                    : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
                }`}
              >
                <i className={`${tab.icon} text-xs`} />
                {tab.label}
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>
                  {tab.badge}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXECUTIVE OVERVIEW ===== */}
      {activeTab === 'executive' && (
        <section className="py-10 sm:py-14 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* OKR Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {okrs.map(okr => {
                const sc = getScoreColor(okr.progress, okr.target);
                return (
                  <div key={okr.id} className="rounded-xl bg-white border border-background-200 p-5 hover:border-background-300 transition-colors cursor-pointer" onClick={() => { setActiveTab('okrs'); setExpandedOKR(okr.id); }}>
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-[9px] text-foreground-400 font-bold">{okr.id}</span>
                      <span className="text-xs font-bold text-foreground-500">{okr.weight}%</span>
                    </div>
                    <h4 className="text-xs font-bold text-foreground-950 mb-3 line-clamp-2">{okr.objective}</h4>
                    <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden mb-2">
                      <div className="h-full rounded-full transition-all" style={{ width: `${(okr.progress / okr.target) * 100}%`, backgroundColor: sc }} />
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="font-bold" style={{ color: sc }}>{okr.progress}%</span>
                      <span className="text-foreground-400">Cible {okr.target}%</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* KPI Targets Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white border border-background-200 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-speed-line text-accent-500" /> KPIs Critiques — État Cible
                </h3>
                <div className="space-y-3">
                  {kpiTargets.flatMap(cat => cat.kpis.filter(k => k.trend !== 'stable')).slice(0, 8).map(kpi => {
                    const pct = kpi.inverted ? ((kpi.current as number) <= (kpi.target as number) ? 100 : Math.max(0, ((kpi.target as number) / (kpi.current as number)) * 100)) : ((kpi.current as number) / (kpi.target as number)) * 100;
                    const color = pct >= 95 ? '#86BC25' : pct >= 85 ? '#0D7B5F' : pct >= 70 ? '#E8C547' : '#C2410C';
                    return (
                      <div key={kpi.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-background-50">
                        <span className="text-xs font-medium text-foreground-700 flex-1 min-w-0 truncate">{kpi.name}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="w-16 h-1.5 bg-background-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }} />
                          </div>
                          <span className="text-xs font-bold w-14 text-right" style={{ color }}>{kpi.current}{kpi.unit}</span>
                          <span className="text-[10px] text-foreground-400">/ {kpi.target}{kpi.unit}</span>
                          <i className={`text-xs ${kpi.trend === 'improving' ? 'ri-arrow-up-circle-line text-emerald-500' : 'ri-arrow-down-circle-line text-amber-500'}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Alerts Quick View */}
              <div className="rounded-2xl bg-white border border-red-200 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-alert-line text-red-500" /> Alertes Actives ({activeAlertsCount})
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredAlerts.filter(a => a.status === 'active').map(alert => {
                    const sevColor = alert.severity === 'critical' ? '#DC2626' : alert.severity === 'high' ? '#EA580C' : alert.severity === 'medium' ? '#E8C547' : '#6366F1';
                    return (
                      <div key={alert.id} className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: `${sevColor}08`, border: `1px solid ${sevColor}20` }}>
                        <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: sevColor }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <span className="text-xs font-bold text-foreground-800">{alert.title}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold text-white" style={{ backgroundColor: sevColor }}>
                              {alert.severity.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-foreground-600 line-clamp-2">{alert.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-foreground-400">{alert.assigned_to}</span>
                            {alert.auto_fix_available && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent-100 text-accent-700 font-bold">AUTO-FIX</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Auto-Correction Mini Dashboard */}
            <div className="rounded-2xl bg-white border border-background-200 p-6">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-tools-line text-secondary-500" /> Auto-Correction — Dernières 24h
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                {autoMetrics.categories.slice(0, 6).map(cat => {
                  const rate = Math.round((cat.fixed_auto / cat.total) * 100);
                  return (
                    <div key={cat.name} className="rounded-lg bg-background-50 p-3 text-center">
                      <span className="text-[10px] text-foreground-500">{cat.name}</span>
                      <div className="text-lg font-bold text-foreground-950">{cat.fixed_auto}/{cat.total}</div>
                      <div className="text-[10px] text-emerald-600 font-bold">{rate}% auto</div>
                    </div>
                  );
                })}
              </div>
              <div className="space-y-2">
                {autoMetrics.recent_fixes.slice(0, 5).map(fix => (
                  <div key={fix.id} className="flex items-center gap-2 p-2 rounded-lg bg-background-50 text-xs">
                    <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <i className="ri-check-line text-xs" />
                    </span>
                    <span className="flex-1 text-foreground-700">{fix.title}</span>
                    <span className="text-emerald-600 font-bold whitespace-nowrap">{fix.impact}</span>
                    <span className="text-foreground-400">{new Date(fix.resolved_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quarterly Reports */}
            <div className="rounded-2xl bg-white border border-background-200 p-6">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-file-chart-line text-accent-500" /> Rapports Trimestriels GRI/ISSB/ISO
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map(r => (
                  <div key={r.id} className={`rounded-xl border p-4 ${r.status === 'published' ? 'bg-emerald-50/30 border-emerald-200' : 'bg-amber-50/30 border-amber-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground-950">{r.period}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${getStatusBadge(r.status)} border`}>
                          {r.status === 'published' ? 'PUBLIÉ' : 'EN COURS'}
                        </span>
                      </div>
                      {r.status === 'published' && (
                        <span className="text-lg font-bold" style={{ color: getScoreColor(r.score, 100) }}>{r.score}/100</span>
                      )}
                    </div>
                    <p className="text-xs text-foreground-500 mb-2">{r.quarter}</p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {r.frameworks.map(fw => (
                        <span key={fw} className="text-[9px] px-2 py-0.5 rounded-full bg-background-200 text-foreground-500 font-medium">{fw}</span>
                      ))}
                    </div>
                    {r.status === 'published' && (
                      <div className="space-y-0.5">
                        {r.highlights.slice(0, 3).map((h, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[10px] text-foreground-600">
                            <i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0" />
                            {h}
                          </div>
                        ))}
                      </div>
                    )}
                    {r.status === 'in_progress' && (
                      <div className="flex items-center gap-2 text-[10px] text-amber-600">
                        <i className="ri-loader-4-line animate-spin" />Publication prévue Q3 2026
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button onClick={refresh} className="px-6 py-2.5 rounded-full bg-background-100 text-foreground-600 text-sm font-bold hover:bg-background-200 transition-colors cursor-pointer flex items-center gap-2 mx-auto">
                <i className="ri-refresh-line" />Rafraîchir le Dashboard
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ===== OKR FRAMEWORK ===== */}
      {activeTab === 'okrs' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                OKR Framework — {summary.okrs_total} Objectifs, {okrs.reduce((s, o) => s + o.key_results.length, 0)} Résultats Clés
              </h2>
              <p className="text-foreground-600">Score pondéré OKR : {okrWeightedAvg}% · {okrsOnTrack}/{summary.okrs_total} On Track · Grade {summary.overall_grade}</p>
            </div>

            <div className="space-y-4">
              {okrs.map(okr => {
                const isExpanded = expandedOKR === okr.id;
                const sc = getScoreColor(okr.progress, okr.target);
                const statusEmoji = okr.progress >= 95 ? '🟢' : okr.progress >= 85 ? '🟡' : okr.progress >= 70 ? '🟠' : '🔴';
                return (
                  <div key={okr.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedOKR(isExpanded ? null : okr.id)} className="w-full p-5 text-left cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${sc}15` }}>
                          <span className="text-xl">{statusEmoji}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 font-bold">{okr.id}</span>
                            <span className="text-sm font-bold text-foreground-950">{okr.objective}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-bold">{okr.weight}%</span>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex-1 h-2 bg-background-200 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all" style={{ width: `${(okr.progress / okr.target) * 100}%`, backgroundColor: sc }} />
                            </div>
                            <span className="text-sm font-bold" style={{ color: sc }}>{okr.progress}%</span>
                          </div>
                          <p className="text-[10px] text-foreground-400 mt-1">Owner : {okr.owner}</p>
                        </div>
                        <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg mt-2`} />
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-100 pt-4">
                        <div className="space-y-2">
                          {okr.key_results.map(kr => {
                            const pct = Math.min((kr.current / kr.target) * 100, 100);
                            const krColor = kr.color === 'accent' ? 'oklch(var(--accent-500))' : kr.color === 'primary' ? 'oklch(var(--primary-500))' : 'oklch(var(--secondary-500))';
                            return (
                              <div key={kr.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-background-50">
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-200 text-foreground-500 font-bold flex-shrink-0">{kr.id}</span>
                                <span className="text-xs text-foreground-700 flex-1 min-w-0">{kr.description}</span>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <div className="w-16 h-1.5 bg-background-200 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: krColor }} />
                                  </div>
                                  <span className="text-xs font-bold w-16 text-right">{kr.current}{kr.unit}</span>
                                  <span className="text-[10px] text-foreground-400">/ {kr.target}{kr.unit}</span>
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

      {/* ===== KPIS CIBLES ===== */}
      {activeTab === 'kpis' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                {summary.kpis_total} KPIs Cibles — Big Four Standard
              </h2>
              <p className="text-foreground-600">{summary.kpis_at_target}/{summary.kpis_total} à la cible · 4 catégories</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {kpiTargets.map(cat => {
                const catOnTarget = cat.kpis.filter(k => {
                  const pct = k.inverted ? ((k.current as number) <= (k.target as number) ? 100 : 0) : ((k.current as number) >= (k.target as number) ? 100 : 0);
                  return pct >= 100;
                }).length;
                return (
                  <div key={cat.category} className="rounded-2xl bg-white border border-background-200 p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: cat.color === 'accent' ? 'oklch(var(--accent-500) / 0.15)' : cat.color === 'primary' ? 'oklch(var(--primary-500) / 0.15)' : 'oklch(var(--secondary-500) / 0.15)' }}>
                        <i className={`${cat.icon} text-lg`} style={{ color: cat.color === 'accent' ? 'oklch(var(--accent-500))' : cat.color === 'primary' ? 'oklch(var(--primary-500))' : 'oklch(var(--secondary-500))' }} />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-bold text-foreground-950">{cat.category}</h3>
                        <p className="text-xs text-foreground-500">{catOnTarget}/{cat.kpis.length} à la cible</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {cat.kpis.map(kpi => {
                        const pct = kpi.inverted
                          ? ((kpi.current as number) <= (kpi.target as number) ? 100 : Math.max(0, ((kpi.target as number) / (kpi.current as number)) * 100))
                          : ((kpi.current as number) / (kpi.target as number)) * 100;
                        const color = pct >= 95 ? '#86BC25' : pct >= 85 ? '#0D7B5F' : pct >= 70 ? '#E8C547' : '#C2410C';
                        return (
                          <div key={kpi.name} className="p-3 rounded-lg bg-background-50">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-medium text-foreground-700">{kpi.name}</span>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold" style={{ color }}>{kpi.current}{kpi.unit}</span>
                                <span className="text-[9px] text-foreground-400">/ {kpi.target}{kpi.unit}</span>
                                <i className={`text-xs ${kpi.trend === 'improving' ? 'ri-arrow-up-circle-line text-emerald-500' : kpi.trend === 'stable' ? 'ri-checkbox-blank-circle-line text-foreground-400' : 'ri-arrow-down-circle-line text-amber-500'}`} />
                              </div>
                            </div>
                            <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== AUTO-CORRECTION ===== */}
      {activeTab === 'corrections' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                Auto-Correction Engine — {autoMetrics.auto_fix_rate}% Automatisé
              </h2>
              <p className="text-foreground-600">
                {autoMetrics.total_tickets} tickets · {autoMetrics.resolved_auto} auto-résolus · {autoMetrics.pending} en attente · Délai moyen {autoMetrics.avg_resolution_time_minutes}min
              </p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="rounded-xl bg-white border border-background-200 p-4 text-center">
                <div className="text-2xl font-bold text-foreground-950">{autoMetrics.total_tickets}</div>
                <div className="text-xs text-foreground-500">Tickets Totaux</div>
              </div>
              <div className="rounded-xl bg-white border border-emerald-200 p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600">{autoMetrics.resolved_auto}</div>
                <div className="text-xs text-foreground-500">Auto-Résolus</div>
              </div>
              <div className="rounded-xl bg-white border border-amber-200 p-4 text-center">
                <div className="text-2xl font-bold text-amber-600">{autoMetrics.resolved_manual}</div>
                <div className="text-xs text-foreground-500">Résolus Manuel</div>
              </div>
              <div className="rounded-xl bg-white border border-red-200 p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{autoMetrics.pending}</div>
                <div className="text-xs text-foreground-500">En Attente</div>
              </div>
            </div>

            {/* Auto-Fix Rate Gauge */}
            <div className="rounded-2xl bg-white border border-background-200 p-6 mb-6 text-center">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Taux Auto-Fix vs Cible</h3>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="relative w-28 h-28 mx-auto">
                    <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(var(--background-200) / 1)" strokeWidth="6" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#8B5CF6" strokeWidth="6"
                        strokeDasharray={`${(autoMetrics.auto_fix_rate / 100) * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
                        strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-foreground-950">{autoMetrics.auto_fix_rate}%</span>
                    </div>
                  </div>
                  <span className="text-xs text-foreground-500">Actuel</span>
                </div>
                <div className="text-4xl text-foreground-300">→</div>
                <div className="text-center">
                  <div className="w-28 h-28 rounded-full border-4 border-dashed border-secondary-300 flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-secondary-500">{autoMetrics.target_auto_fix_rate}%</span>
                  </div>
                  <span className="text-xs text-foreground-500">Cible</span>
                </div>
              </div>
            </div>

            {/* Per Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {autoMetrics.categories.map(cat => {
                const rate = Math.round((cat.fixed_auto / cat.total) * 100);
                const color = rate >= 85 ? '#86BC25' : rate >= 70 ? '#E8C547' : '#C2410C';
                return (
                  <div key={cat.name} className="rounded-xl bg-white border border-background-200 p-4">
                    <h4 className="text-sm font-bold text-foreground-950 mb-3">{cat.name}</h4>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground-500">Auto</span>
                      <span className="font-bold" style={{ color }}>{rate}%</span>
                    </div>
                    <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden mb-2">
                      <div className="h-full rounded-full" style={{ width: `${(cat.fixed_auto / cat.total) * 100}%`, backgroundColor: '#8B5CF6' }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-foreground-400">
                      <span>{cat.fixed_auto} auto</span>
                      <span>{cat.fixed_manual} manuel</span>
                      <span>{cat.pending} en attente</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Fixes */}
            <div className="rounded-2xl bg-white border border-background-200 p-6">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Dernières Corrections Auto</h3>
              <div className="space-y-2">
                {autoMetrics.recent_fixes.map(fix => (
                  <div key={fix.id} className="flex items-center gap-3 p-3 rounded-lg bg-background-50">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <i className="ri-check-line" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-foreground-950">{fix.title}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent-100 text-accent-700">{fix.ticket}</span>
                      </div>
                      <span className="text-[10px] text-foreground-400">{new Date(fix.resolved_at).toLocaleString('fr-FR')}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 whitespace-nowrap">{fix.impact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== ALERTS ===== */}
      {activeTab === 'alerts' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <select
                value={alertFilter}
                onChange={(e) => setAlertFilter(e.target.value)}
                className="px-4 py-2.5 rounded-full bg-white border border-background-200 text-sm text-foreground-700 cursor-pointer"
              >
                <option value="all">Toutes sévérités</option>
                <option value="critical">Critique</option>
                <option value="high">Haute</option>
                <option value="medium">Moyenne</option>
              </select>
              <select
                value={alertStatusFilter}
                onChange={(e) => setAlertStatusFilter(e.target.value)}
                className="px-4 py-2.5 rounded-full bg-white border border-background-200 text-sm text-foreground-700 cursor-pointer"
              >
                <option value="all">Tous statuts</option>
                <option value="active">Active</option>
                <option value="in_progress">En cours</option>
                <option value="resolved">Résolue</option>
              </select>
              <button onClick={refresh} className="px-4 py-2.5 rounded-full bg-background-100 text-foreground-600 text-sm font-medium hover:bg-background-200 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap">
                <i className="ri-refresh-line" />Rafraîchir
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3 bg-red-50/50 rounded-lg border border-red-200 text-center">
                <div className="text-lg font-bold text-red-700">{filteredAlerts.filter(a => a.severity === 'critical').length}</div>
                <div className="text-xs text-foreground-500">Critiques</div>
              </div>
              <div className="p-3 bg-orange-50/50 rounded-lg border border-orange-200 text-center">
                <div className="text-lg font-bold text-orange-700">{filteredAlerts.filter(a => a.severity === 'high').length}</div>
                <div className="text-xs text-foreground-500">Hautes</div>
              </div>
              <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-200 text-center">
                <div className="text-lg font-bold text-amber-700">{filteredAlerts.filter(a => a.severity === 'medium').length}</div>
                <div className="text-xs text-foreground-500">Moyennes</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200 text-center">
                <div className="text-lg font-bold text-foreground-700">{filteredAlerts.filter(a => a.auto_fix_available).length}</div>
                <div className="text-xs text-foreground-500">Avec Auto-Fix</div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredAlerts.map(alert => {
                const sevColor = alert.severity === 'critical' ? '#DC2626' : alert.severity === 'high' ? '#EA580C' : '#E8C547';
                const sevIcon = alert.severity === 'critical' ? 'ri-error-warning-line' : alert.severity === 'high' ? 'ri-alert-line' : 'ri-information-line';
                return (
                  <div key={alert.id} className="rounded-2xl border p-5" style={{ backgroundColor: `${sevColor}06`, borderColor: `${sevColor}30` }}>
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${sevColor}20` }}>
                        <i className={`${sevIcon} text-lg`} style={{ color: sevColor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold text-white" style={{ backgroundColor: sevColor }}>
                            {alert.severity.toUpperCase()}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${getStatusBadge(alert.status)}`}>
                            {alert.status === 'active' ? 'ACTIVE' : alert.status === 'in_progress' ? 'EN COURS' : 'RÉSOLUE'}
                          </span>
                          {alert.auto_fix_available && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-bold">AUTO-FIX DISPONIBLE</span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-foreground-950">{alert.title}</h4>
                        <p className="text-xs text-foreground-600 mt-1">{alert.description}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] text-foreground-400">
                          <span><i className="ri-radar-line mr-1" />{alert.source}</span>
                          <span><i className="ri-calendar-line mr-1" />{new Date(alert.detected_at).toLocaleString('fr-FR')}</span>
                          <span><i className="ri-user-line mr-1" />{alert.assigned_to}</span>
                          {alert.resolution_deadline && (
                            <span className="text-amber-600 font-bold"><i className="ri-timer-line mr-1" />{new Date(alert.resolution_deadline).toLocaleDateString('fr-FR')}</span>
                          )}
                        </div>
                        {alert.affected_urls.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {alert.affected_urls.slice(0, 5).map((url, i) => (
                              <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-200 text-foreground-500">{url}</span>
                            ))}
                            {alert.affected_urls.length > 5 && (
                              <span className="text-[9px] text-foreground-400">+{alert.affected_urls.length - 5} autres</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== RAPPORTS TRIMESTRIELS ===== */}
      {activeTab === 'reports' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                Rapports Trimestriels — GRI / ISSB / ISO
              </h2>
              <p className="text-foreground-600">
                {summary.quarterly_reports_published}/{summary.quarterly_reports_total} rapports publiés · Alignement GRI 2021, ISSB IFRS S1/S2, ISO 26000, ISO 27001
              </p>
            </div>

            <div className="space-y-6">
              {reports.map(r => {
                const isExpanded = expandedReport === r.id;
                return (
                  <div key={r.id} className={`rounded-2xl border transition-all ${r.status === 'published' ? 'bg-white border-emerald-200' : 'bg-white border-amber-200'} ${isExpanded ? 'shadow-lg' : ''}`}>
                    <button onClick={() => setExpandedReport(isExpanded ? null : r.id)} className="w-full p-6 text-left cursor-pointer">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                            r.status === 'published' ? 'bg-emerald-100' : 'bg-amber-100'
                          }`}>
                            <i className={`${r.status === 'published' ? 'ri-file-chart-line text-emerald-600' : 'ri-loader-4-line text-amber-600 animate-spin'} text-2xl`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="text-lg font-bold text-foreground-950">{r.period}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getStatusBadge(r.status)}`}>
                                {r.status === 'published' ? 'PUBLIÉ' : 'EN PRÉPARATION'}
                              </span>
                            </div>
                            <p className="text-sm text-foreground-500">{r.quarter}</p>
                          </div>
                        </div>
                        {r.status === 'published' && (
                          <div className="flex items-center gap-4">
                            <div className="text-center px-4 py-2 bg-emerald-50 rounded-lg">
                              <div className="text-xl font-bold" style={{ color: getScoreColor(r.score, 100) }}>{r.score}/100</div>
                              <div className="text-[9px] text-foreground-500">Score Global</div>
                            </div>
                            <div className="text-center px-4 py-2 bg-background-50 rounded-lg">
                              <div className="text-xl font-bold text-foreground-950">{r.gaps_closed}</div>
                              <div className="text-[9px] text-foreground-500">Gaps Fermés</div>
                            </div>
                          </div>
                        )}
                        <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-6 border-t border-background-100 pt-5">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {r.frameworks.map(fw => (
                            <span key={fw} className="text-[10px] px-2.5 py-1 rounded-full bg-accent-100 text-accent-700 font-bold border border-accent-200">{fw}</span>
                          ))}
                        </div>

                        <h4 className="text-sm font-bold text-foreground-950 mb-3">Faits Marquants</h4>
                        <div className="space-y-1.5 mb-4">
                          {r.highlights.map((h, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                              <i className="ri-check-double-line text-emerald-500 mt-0.5 flex-shrink-0" />
                              {h}
                            </div>
                          ))}
                        </div>

                        {r.status === 'published' && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="p-3 bg-emerald-50 rounded-lg text-center">
                              <div className="text-sm font-bold text-emerald-700">{r.gaps_closed}</div>
                              <div className="text-[10px] text-foreground-500">Gaps Fermés</div>
                            </div>
                            <div className="p-3 bg-amber-50 rounded-lg text-center">
                              <div className="text-sm font-bold text-amber-700">{r.gaps_remaining}</div>
                              <div className="text-[10px] text-foreground-500">Gaps Restants</div>
                            </div>
                            <div className="p-3 bg-background-50 rounded-lg text-center">
                              <div className="text-sm font-bold text-foreground-950">{r.frameworks.length}</div>
                              <div className="text-[10px] text-foreground-500">Référentiels</div>
                            </div>
                            <div className="p-3 bg-background-50 rounded-lg text-center">
                              <div className="text-sm font-bold text-foreground-950">{new Date(r.published_at!).toLocaleDateString('fr-FR')}</div>
                              <div className="text-[10px] text-foreground-500">Publié le</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== ECOSYSTEM ===== */}
      {activeTab === 'ecosystem' && (
        <section className="py-10 sm:py-14 bg-white border-t border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème Big Four KOS</h2>
              <p className="text-foreground-600">Accès direct aux {crossLinks.length} hubs connectés de gouvernance, performance, conformité et correction.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {crossLinks.map(link => {
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    className="rounded-xl border border-background-200 bg-background-50 p-4 hover:border-foreground-200 hover:shadow-sm transition-all cursor-pointer block"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: link.color === 'accent' ? 'oklch(var(--accent-500) / 0.15)' : link.color === 'primary' ? 'oklch(var(--primary-500) / 0.15)' : 'oklch(var(--secondary-500) / 0.15)' }}>
                        <i className={`${link.icon} text-xs`} style={{ color: link.color === 'accent' ? 'oklch(var(--accent-500))' : link.color === 'primary' ? 'oklch(var(--primary-500))' : 'oklch(var(--secondary-500))' }} />
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">{link.status.toUpperCase()}</span>
                    </div>
                    <h4 className="text-xs font-bold text-foreground-950 mb-1">{link.hub}</h4>
                    <span className="text-[10px] text-foreground-400">{link.kpi}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </KOSHubLayout>
  );
}