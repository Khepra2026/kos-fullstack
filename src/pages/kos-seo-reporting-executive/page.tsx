import { useState, useMemo } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  seoExecutiveOverview,
  monthlyTrends,
  executiveKPIs,
  competitorBenchmark,
  seoAlerts,
  executiveReports,
  roiSummary,
} from '@/mocks/seoReportingExecutive';

type TabId = 'overview' | 'kpis' | 'trends' | 'competitors' | 'alerts' | 'reports';

function formatNumber(val: number): string {
  if (val >= 1000000) return (val / 1000000).toFixed(1) + ' M';
  if (val >= 1000) return (val / 1000).toFixed(1) + ' K';
  return String(val);
}

function formatFCFA(val: number): string {
  if (val >= 1000) return (val / 1000).toFixed(0) + ' Md';
  return val + ' M';
}

function alertTypeBadge(type: string) {
  if (type === 'Critique') return 'bg-red-100 text-red-700 border-red-200';
  if (type === 'Haute') return 'bg-amber-100 text-amber-700 border-amber-200';
  if (type === 'Moyenne') return 'bg-background-100 text-foreground-500 border-background-200';
  return 'bg-emerald-100 text-emerald-700 border-emerald-200';
}

export default function KOSSeoReportingExecutivePage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [kpiView, setKpiView] = useState<'all' | 'On Track' | 'Needs Attention'>('all');
  const [alertFilter, setAlertFilter] = useState<'all' | 'Critique' | 'Haute'>('all');

  const overview = seoExecutiveOverview;
  const roi = roiSummary;

  const filteredKPIs = useMemo(() => {
    if (kpiView === 'all') return executiveKPIs;
    return executiveKPIs.filter(k => k.status === kpiView);
  }, [kpiView]);

  const filteredAlerts = useMemo(() => {
    if (alertFilter === 'all') return seoAlerts;
    return seoAlerts.filter(a => a.type === alertFilter);
  }, [alertFilter]);

  const maxTraffic = Math.max(...monthlyTrends.map(t => t.traffic));
  const maxImpressions = Math.max(...monthlyTrends.map(t => t.impressions));

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'overview', label: 'Résumé Exécutif', icon: 'ri-dashboard-line', count: `${overview.globalSeoScore}/100` },
    { id: 'kpis', label: 'KPIs Stratégiques', icon: 'ri-bar-chart-grouped-line', count: String(executiveKPIs.length) },
    { id: 'trends', label: 'Tendances 6 Mois', icon: 'ri-line-chart-line', count: '+18%' },
    { id: 'competitors', label: 'Concurrents', icon: 'ri-sword-line', count: String(competitorBenchmark.length) },
    { id: 'alerts', label: 'Alertes', icon: 'ri-notification-3-line', count: String(seoAlerts.filter(a => a.type === 'Critique').length) },
    { id: 'reports', label: 'Rapports', icon: 'ri-file-text-line', count: String(executiveReports.length) },
  ];

  return (
    <KOSHubLayout hubId={75}>
      <SeoHead
        title="KOS SEO Reporting & Executive Command — Dashboard Stratégique SEO | KHEPRA EXPERTS"
        description="Reporting SEO Executif : Score global 74/100, 23,500 sessions/mois, 342 KW top 10, DA 52, 105 leads/mois, ROI 3135%. KPIs, tendances, benchmark concurrents, alertes. KHEPRA EXPERTS."
        keywords="SEO reporting, executive dashboard SEO, SEO KPIs, benchmark concurrents SEO, rapport SEO, ROI SEO, KHEPRA EXPERTS"
        canonicalPath="/kos-seo-reporting-executive"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 via-transparent to-accent-100/30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-bold mb-4">
                <i className="ri-bar-chart-grouped-line" />
                SEO Executive Report — Juin 2026 · Score Global {overview.globalSeoScore}/100 · Trafic {formatNumber(overview.trafficMonthly)}/mois
              </div>
              <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground-950 tracking-tight">
                SEO Reporting & Executive Command — Le tableau de bord stratégique du SEO
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Score Global <strong className="text-foreground-950">{overview.globalSeoScore}/100</strong> (cible <strong className="text-emerald-600">{overview.targetScore}/100</strong>) ·{' '}
                <strong className="text-emerald-600">{formatNumber(overview.trafficMonthly)} sessions/mois</strong> (+18%) ·{' '}
                <strong className="text-foreground-950">{overview.keywordsTop10} KW top 10</strong> ·{' '}
                DA <strong className="text-accent-600">{overview.domainAuthority}</strong> ({overview.daGrowth}) ·{' '}
                ROI <strong className="text-emerald-600">{roi.roiOrganic}%</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-bold">
                  <i className="ri-funds-line" />{formatFCFA(roi.organicRevenue)} FCFA/mois organique
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-100 border border-accent-300 text-accent-700 text-xs font-bold">
                  <i className="ri-user-add-line" />{roi.leadsFromOrganic} leads/mois (+{roi.leadsGrowth})
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-bold">
                  <i className="ri-alert-line" />{seoAlerts.filter(a => !a.acknowledged).length} alertes non acquittées
                </span>
              </div>
            </div>
            {/* Score Gauge */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke={overview.globalSeoScore >= 80 ? '#86BC25' : overview.globalSeoScore >= 65 ? '#F59E0B' : '#DC2626'} strokeWidth="8"
                    strokeDasharray={`${(overview.globalSeoScore / 100) * 264} 264`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold font-heading text-foreground-950">{overview.globalSeoScore}</span>
                </div>
              </div>
              <span className="text-[10px] text-foreground-400 mt-1">Score Global SEO</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                }`}>
                <i className={`${tab.icon} text-base`} />
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* === TAB: OVERVIEW === */}
      {activeTab === 'overview' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* SEO Health Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
              {[
                { label: 'On-Page', value: overview.onPageScore, color: '#86BC25' },
                { label: 'Schema', value: overview.schemaScore, color: '#CA8A04' },
                { label: 'Content', value: overview.contentScore, color: '#D97757' },
                { label: 'CWV', value: overview.coreWebVitalsPass, color: '#4285F4' },
                { label: 'E-E-A-T', value: overview.eeatScore, color: '#F59E0B' },
                { label: 'CRO', value: overview.croScore, color: '#9B7B2C' },
                { label: 'Local', value: overview.localSeoScore, color: '#C05A3A' },
              ].map((dim) => (
                <div key={dim.label} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                  <div className="relative w-14 h-14 mx-auto mb-2">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="6" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke={dim.color} strokeWidth="6"
                        strokeDasharray={`${(dim.value / 100) * 251} 251`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold font-heading">{dim.value}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-foreground-700">{dim.label}</span>
                </div>
              ))}
            </div>

            {/* KPI Big Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {[
                { label: 'Trafic Mensuel', value: formatNumber(overview.trafficMonthly), trend: '+18%', icon: 'ri-line-chart-line', color: '#86BC25' },
                { label: 'Keywords Top 10', value: String(overview.keywordsTop10), trend: `+${overview.keywordsTop10 - 295}`, icon: 'ri-search-line', color: '#F59E0B' },
                { label: 'Domain Authority', value: String(overview.domainAuthority), trend: `+${overview.daGrowth}`, icon: 'ri-global-line', color: '#CA8A04' },
                { label: 'Pages Indexées', value: `${overview.pagesIndexed}/${overview.totalPages}`, trend: `${overview.indexationRate}%`, icon: 'ri-file-list-3-line', color: '#D97757' },
                { label: 'Leads Organiques', value: '105/mois', trend: '+23%', icon: 'ri-user-add-line', color: '#9B7B2C' },
                { label: 'Revenue Organique', value: formatFCFA(roi.organicRevenue) + ' FCFA', trend: roi.revenueGrowth, icon: 'ri-funds-line', color: '#EAB308' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                    <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
                  </div>
                  <span className="block text-lg font-bold text-foreground-950">{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                  <span className="block text-[10px] text-emerald-600 font-bold mt-0.5">{s.trend}</span>
                </div>
              ))}
            </div>

            {/* ROI Summary */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Résumé ROI SEO</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center"><span className="block text-2xl font-bold text-emerald-600">{roi.roiOrganic}%</span><span className="text-[10px] text-foreground-500">ROI Organique</span></div>
                <div className="text-center"><span className="block text-2xl font-bold text-foreground-950">{roi.costPerLead.toLocaleString()} FCFA</span><span className="text-[10px] text-foreground-500">Coût par Lead</span></div>
                <div className="text-center"><span className="block text-2xl font-bold text-accent-600">{formatFCFA(roi.avgDealValue)} FCFA</span><span className="text-[10px] text-foreground-500">Deal Moyen</span></div>
                <div className="text-center"><span className="block text-2xl font-bold text-foreground-950">{roi.conversionRate}</span><span className="text-[10px] text-foreground-500">Taux Conversion</span></div>
              </div>
              <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700">
                <i className="ri-information-line mr-1" />
                Pipeline total généré par le SEO : <strong>{formatFCFA(roi.totalPipeline)} FCFA</strong>. Investissement : <strong>{roi.totalInvestment} {roi.investmentCurrency}</strong>. Chaque 1 FCFA investi en SEO génère <strong>{Math.round(roi.roiOrganic / 100)} FCFA</strong> de pipeline.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: KPIs === */}
      {activeTab === 'kpis' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">KPIs Stratégiques — {executiveKPIs.length} Indicateurs</h2>
                <p className="text-foreground-600 text-sm">{executiveKPIs.filter(k => k.status === 'On Track').length} on track · {executiveKPIs.filter(k => k.status === 'Needs Attention').length} à surveiller</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Statut :</span>
                {(['all', 'On Track', 'Needs Attention'] as const).map((s) => (
                  <button key={s} onClick={() => setKpiView(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${kpiView === s ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {s === 'all' ? 'Tous' : s}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {filteredKPIs.map((kpi) => (
                <div key={kpi.id} className={`rounded-2xl border p-5 ${kpi.status === 'Needs Attention' ? 'border-amber-200 bg-amber-50/10' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-3 min-w-0 lg:w-64 flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${kpi.color}15` }}>
                        <i className={`${kpi.icon} text-lg`} style={{ color: kpi.color }} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-foreground-950">{kpi.metric}</h4>
                        <span className="text-[10px] text-foreground-400">{kpi.owner}</span>
                      </div>
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-lg font-bold text-foreground-950">{kpi.value}</span>
                          <span className="text-[10px] text-foreground-400">Cible: {kpi.target}</span>
                        </div>
                        <div className="w-full bg-background-200 rounded-full h-2">
                          <div className="h-2 rounded-full" style={{ width: `${kpi.progress}%`, backgroundColor: kpi.color }} />
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-2">
                        <span className={`text-xs font-bold ${kpi.trend.startsWith('+') ? 'text-emerald-600' : kpi.trend.startsWith('-') ? 'text-red-500' : 'text-foreground-500'}`}>{kpi.trend}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${kpi.status === 'On Track' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                          {kpi.status === 'On Track' ? 'On Track' : '⚠ Attention'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: TRENDS === */}
      {activeTab === 'trends' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Tendances 6 Mois — Janvier → Juin 2026</h2>
              <p className="text-foreground-600 text-sm">Trafic : {formatNumber(monthlyTrends[0].traffic)} → {formatNumber(monthlyTrends[5].traffic)} (+{Math.round(((monthlyTrends[5].traffic - monthlyTrends[0].traffic) / monthlyTrends[0].traffic) * 100)}%) · Leads : {monthlyTrends[0].leads} → {monthlyTrends[5].leads}</p>
            </div>
            {/* Bar Chart — Traffic */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 mb-6">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Trafic Organique (sessions/mois)</h3>
              <div className="flex items-end gap-2 h-48">
                {monthlyTrends.map((t) => (
                  <div key={t.month} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[9px] font-bold text-foreground-700">{formatNumber(t.traffic)}</span>
                    <div className="w-full bg-emerald-500 rounded-t-lg" style={{ height: `${(t.traffic / maxTraffic) * 100}%`, minHeight: '8px' }} />
                    <span className="text-[9px] text-foreground-400 whitespace-nowrap">{t.month.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Grid — KPIs Trends */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {monthlyTrends.map((t) => (
                <div key={t.month} className="rounded-xl bg-background-50 border border-background-200/70 p-4">
                  <span className="text-[10px] font-bold text-foreground-500">{t.month}</span>
                  <div className="mt-2 space-y-1.5">
                    <div className="flex justify-between text-[10px]"><span className="text-foreground-400">KW Top 10</span><span className="font-bold text-foreground-950">{t.keywords}</span></div>
                    <div className="flex justify-between text-[10px]"><span className="text-foreground-400">Backlinks</span><span className="font-bold text-foreground-950">{t.backlinks}</span></div>
                    <div className="flex justify-between text-[10px]"><span className="text-foreground-400">Leads</span><span className="font-bold text-foreground-950">{t.leads}</span></div>
                    <div className="flex justify-between text-[10px]"><span className="text-foreground-400">Revenue</span><span className="font-bold text-emerald-600">{formatFCFA(t.revenue)} FCFA</span></div>
                    <div className="flex justify-between text-[10px]"><span className="text-foreground-400">CWV Pass</span><span className="font-bold text-foreground-950">{t.cwv}%</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: COMPETITORS === */}
      {activeTab === 'competitors' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Benchmark Concurrents — {competitorBenchmark.length} Acteurs</h2>
              <p className="text-foreground-600 text-sm">Khepra DA {overview.domainAuthority} · Position #4 en KW · Croissance DA la plus rapide du marché</p>
            </div>
            <div className="space-y-3">
              {competitorBenchmark.map((comp) => (
                <div key={comp.id} className={`rounded-2xl border p-5 ${comp.id === 'CPT-08' ? 'border-emerald-400 bg-emerald-50/30 ring-2 ring-emerald-300' : comp.threatLevel === 'Élevé' ? 'border-red-200 bg-red-50/20' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex items-start gap-3 min-w-0 lg:w-72 flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs" style={{ backgroundColor: comp.id === 'CPT-08' ? '#DCFCE7' : '#F3F4F6', color: comp.id === 'CPT-08' ? '#16A34A' : '#6B7280' }}>
                        {comp.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div className="min-w-0">
                        {comp.id === 'CPT-08' && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold">VOUS</span>}
                        <h4 className="text-sm font-bold text-foreground-950">{comp.name}</h4>
                        <span className="text-[10px] text-foreground-500">{comp.domain} · {comp.country}</span>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">DA</span><span className="text-xs font-bold text-foreground-950">{comp.daBaselineLaunch}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">KW Top 10</span><span className="text-xs font-bold text-foreground-950">{comp.keywordsTop10}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Trafic Est.</span><span className="text-xs font-bold text-foreground-950">{comp.trafficEstimate}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Menace</span><span className={`text-xs font-bold ${comp.threatLevel === 'Élevé' ? 'text-red-500' : comp.threatLevel === 'Moyen' ? 'text-amber-500' : comp.threatLevel === '—' ? 'text-emerald-600' : 'text-foreground-400'}`}>{comp.threatLevel}</span></div>
                    </div>
                    <div className="lg:w-64 flex-shrink-0">
                      <div className="text-[10px] text-foreground-600">
                        <span className="block text-emerald-600 font-bold">{comp.strengths.split(',')[0]}</span>
                        <span className="block text-red-500 mt-0.5">{comp.weaknesses}</span>
                        {comp.id !== 'CPT-08' && <span className="block text-foreground-400 mt-0.5">Overlap: {comp.marketOverlap}%</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: ALERTS === */}
      {activeTab === 'alerts' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Alertes SEO — {seoAlerts.length} Actives</h2>
                <p className="text-foreground-600 text-sm">{seoAlerts.filter(a => !a.acknowledged).length} non acquittées · {seoAlerts.filter(a => a.type === 'Critique').length} critiques</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Type :</span>
                {(['all', 'Critique', 'Haute'] as const).map((f) => (
                  <button key={f} onClick={() => setAlertFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${alertFilter === f ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {f === 'all' ? 'Toutes' : f}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className={`rounded-2xl border p-5 ${alert.type === 'Critique' ? 'border-red-200 bg-red-50/20' : alert.type === 'Haute' ? 'border-amber-200 bg-amber-50/10' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: alert.type === 'Critique' ? '#FEE2E2' : alert.type === 'Haute' ? '#FEF3C7' : '#F3F4F6' }}>
                      <i className={`text-lg ${alert.type === 'Critique' ? 'ri-alert-fill text-red-600' : alert.type === 'Haute' ? 'ri-error-warning-fill text-amber-500' : 'ri-information-line text-foreground-400'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${alertTypeBadge(alert.type)}`}>{alert.type}</span>
                        <span className="text-xs font-bold text-foreground-950">{alert.title}</span>
                        {!alert.acknowledged && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">Non acquittée</span>}
                      </div>
                      <p className="text-xs text-foreground-600 mb-2">{alert.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-[10px] text-foreground-500">
                        <span className="text-foreground-700 font-bold">Action : {alert.action}</span>
                        <span className="text-foreground-400">Source : {alert.source}</span>
                        <span className="text-foreground-400">{alert.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: REPORTS === */}
      {activeTab === 'reports' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Rapports SEO — {executiveReports.length} Documents</h2>
              <p className="text-foreground-600 text-sm">{executiveReports.filter(r => r.status === 'Finalisé').length} finalisés · {executiveReports.reduce((s, r) => s + r.pages, 0)} pages cumulées</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {executiveReports.map((rpt) => (
                <div key={rpt.id} className={`rounded-2xl border p-5 ${rpt.status === 'En Cours' ? 'border-amber-200 bg-amber-50/10' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: rpt.type === 'Monthly' ? '#DCFCE7' : rpt.type === 'Quarterly' ? '#FEF3C7' : '#E0E7FF' }}>
                      <i className={`text-lg ${rpt.type === 'Monthly' ? 'ri-calendar-check-line text-emerald-600' : rpt.type === 'Quarterly' ? 'ri-calendar-2-line text-amber-600' : 'ri-calendar-todo-line text-accent-600'}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-foreground-950">{rpt.title}</h4>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${rpt.status === 'Finalisé' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>{rpt.status}</span>
                      </div>
                      <span className="text-[10px] text-foreground-500">{rpt.type} · {rpt.pages} pages · {rpt.author} · {rpt.date}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-foreground-600 bg-background-100 rounded-lg p-2">{rpt.highlights}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {rpt.cwvScore > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-200 text-foreground-500">CWV {rpt.cwvScore}</span>}
                    {rpt.schemaScore > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-200 text-foreground-500">Schema {rpt.schemaScore}</span>}
                    {rpt.contentScore > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-200 text-foreground-500">Content {rpt.contentScore}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cross-link Ecosystem */}
      <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème KOS — SEO Reporting & Executive Command</h2>
            <p className="text-foreground-600">Le hub Reporting centralise tous les KPIs SEO pour le COMEX.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'SEO Reporting', path: '/kos-seo-reporting-executive', icon: 'ri-bar-chart-grouped-line', color: '#86BC25', current: true },
              { label: 'SEO Analytics', path: '/kos-seo-analytics-competitive', icon: 'ri-line-chart-line', color: '#F59E0B' },
              { label: 'Content Strategy', path: '/kos-seo-content-strategy', icon: 'ri-book-open-line', color: '#CA8A04' },
              { label: 'Performance SEO', path: '/kos-performance-seo-command', icon: 'ri-speed-line', color: '#4285F4' },
              { label: 'Backlink Intelligence', path: '/kos-backlink-intelligence-audit', icon: 'ri-link', color: '#D97757' },
              { label: 'CRO & Conversion', path: '/kos-seo-cro-conversion', icon: 'ri-funds-line', color: '#9B7B2C' },
              { label: 'AI Visibility', path: '/kos-ai-visibility-command', icon: 'ri-cpu-line', color: '#C05A3A' },
              { label: 'Dashboard Central', path: '/kos-dashboard', icon: 'ri-dashboard-line', color: '#4A7A1E' },
            ].map((link) => (
              <a key={link.path + link.label} href={link.path}
                className={`rounded-xl border p-4 text-center cursor-pointer block transition-all ${link.current ? 'border-emerald-300 bg-emerald-50/40 ring-2 ring-emerald-400' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'}`}>
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                {link.current && <span className="block text-[10px] text-emerald-600 font-bold mt-1">Actif — En cours</span>}
              </a>
            ))}
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}