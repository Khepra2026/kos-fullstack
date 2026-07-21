import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { Link } from 'react-router-dom';
import {
  seoAutopilotPillars,
  seoAutomations,
  seoContentPipeline,
  seoExecutiveKPIs,
  seoQuickWins,
  seoEcosystemLinks,
  seoMonitoringSources,
  seoMonitoringDetections,
  seoContentProduction,
  seoInternalLinking,
  seoCoreWebVitals,
  seoAEO,
  seoSchemaOrg,
} from '@/mocks/seoAutopilot';

type Tab = 'dashboard' | 'pillars' | 'automations' | 'pipeline' | 'monitoring' | 'ecosystem' | 'cwv' | 'aeo' | 'schema';

const pillarColorMap: Record<string, { bg: string; text: string; bar: string; border: string }> = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', bar: 'bg-emerald-500', border: 'border-emerald-200' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-700', bar: 'bg-teal-500', border: 'border-teal-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', bar: 'bg-amber-500', border: 'border-amber-200' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', bar: 'bg-rose-500', border: 'border-rose-200' },
};

function getPillarColor(color: string) {
  return pillarColorMap[color] || pillarColorMap.emerald;
}

function getStatusBadge(status: string) {
  if (status === 'Actif') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (status === 'Avancé') return 'bg-amber-50 text-amber-700 border-amber-200';
  if (status === 'En production') return 'bg-teal-50 text-teal-700 border-teal-200';
  if (status === 'Planifié') return 'bg-background-100 text-foreground-500 border-background-200';
  if (status === 'En cours') return 'bg-primary-50 text-primary-700 border-primary-200';
  return 'bg-background-100 text-foreground-500 border-background-200';
}

function getImpactBadge(impact: string) {
  if (impact.includes('Très Élevé')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (impact.includes('Élevé')) return 'bg-teal-50 text-teal-700 border-teal-200';
  return 'bg-background-100 text-foreground-500 border-background-200';
}

function renderGauge(value: number, max: number, size: number = 52, strokeColor: string = '#10b981') {
  const pct = Math.min((value / max) * 100, 100);
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="-rotate-90" style={{ width: size, height: size }} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={strokeColor}
          strokeWidth="5"
          strokeDasharray={`${(pct / 100) * circ} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-foreground-950">{Math.round(pct)}%</span>
      </div>
    </div>
  );
}

function renderProgressBar(value: number, max: number, colorClass: string = 'bg-accent-500') {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold text-foreground-950 whitespace-nowrap">{value}/{max}</span>
    </div>
  );
}

function formatFCFA(val: number): string {
  if (val >= 1000000000) return `${(val / 1000000000).toFixed(1)} Md`;
  if (val >= 1000000) return `${(val / 1000000).toFixed(0)} M`;
  return val.toLocaleString('fr-FR');
}

function formatNumber(val: number): string {
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
  return val.toLocaleString('fr-FR');
}

export default function seoAutopilotPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [selectedPillar, setSelectedPillar] = useState(seoAutopilotPillars[0]);
  const [selectedAutomation, setSelectedAutomation] = useState(seoAutomations[0]);
  const [selectedPipeline, setSelectedPipeline] = useState(seoContentPipeline[0]);

  const totalPublished = useMemo(() => seoAutopilotPillars.reduce((s, p) => s + p.articles_published, 0), []);
  const totalTarget = useMemo(() => seoAutopilotPillars.reduce((s, p) => s + p.article_target, 0), []);
  const totalBacklinks = useMemo(() => seoAutopilotPillars.reduce((s, p) => s + p.backlinks_acquired, 0), []);
  const totalTraffic = useMemo(() => seoAutopilotPillars.reduce((s, p) => s + p.avg_traffic_monthly, 0), []);
  const avgConversion = useMemo(() => {
    const sum = seoAutopilotPillars.reduce((s, p) => s + p.conversion_rate, 0);
    return (sum / seoAutopilotPillars.length).toFixed(1);
  }, []);
  const activeAutomations = useMemo(() => seoAutomations.filter(a => a.status === 'Actif').length, []);
  const totalAlerts = useMemo(() => seoAutomations.reduce((s, a) => s + a.alerts_generated, 0), []);
  const pipelineTotal = useMemo(() => seoContentPipeline.reduce((s, c) => s + c.count_published + c.count_in_progress + c.count_planned, 0), []);

  const tabs: { id: Tab; label: string; icon: string; badge: string }[] = [
    { id: 'dashboard', label: 'Dashboard Exécutif', icon: 'ri-dashboard-3-line', badge: 'KPIs' },
    { id: 'pillars', label: '8 Piliers Stratégiques', icon: 'ri-stack-line', badge: `${totalPublished}/${totalTarget}` },
    { id: 'automations', label: 'Automatisations', icon: 'ri-cpu-line', badge: `${activeAutomations}/9` },
    { id: 'pipeline', label: 'Pipeline Contenu', icon: 'ri-file-list-3-line', badge: String(pipelineTotal) },
    { id: 'monitoring', label: 'Veille & Monitoring', icon: 'ri-radar-line', badge: `${seoMonitoringSources.length} sources` },
    { id: 'cwv', label: 'Core Web Vitals', icon: 'ri-speed-line', badge: `${seoCoreWebVitals.overall_pass_rate_pct}%` },
    { id: 'aeo', label: 'AEO / GEO', icon: 'ri-robot-2-line', badge: `${seoAEO.overall_score}/100` },
    { id: 'schema', label: 'Schema.org', icon: 'ri-code-box-line', badge: `${seoSchemaOrg.schema_coverage_pct}%` },
    { id: 'ecosystem', label: 'Écosystème SEO', icon: 'ri-global-line', badge: '7 hubs' },
  ];

  return (
    <hubLayout hubId={50} activeTab={activeTab} tabLabel={tabs.find(t => t.id === activeTab)?.label}>
      {/* Header */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold mb-4">
                <i className="ri-search-line"></i>KOS SEO AUTOPILOT™ — Moteur de Croissance Organique
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                KOS SEO Autopilot™
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Moteur SEO autonome — 500 pages expertes, 8 piliers thématiques, 9 automatisations, production de contenu à grande échelle.
                Pipeline éditorial intelligent, veilles réglementaires automatisées, maillage interne optimisé.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{formatNumber(seoExecutiveKPIs.traffic.monthly_organic)}</div>
                <div className="text-xs text-foreground-500">Trafic/mois</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{totalPublished}/{totalTarget}</div>
                <div className="text-xs text-foreground-500">Pages</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-primary-500">{seoExecutiveKPIs.leads.monthly_leads}</div>
                <div className="text-xs text-foreground-500">Leads/mois</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-background-50'
                    : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
                <span className="text-xs opacity-60">{tab.badge}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ============ TAB 1: EXECUTIVE DASHBOARD ============ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Top KPI Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { label: 'Trafic Organique', value: formatNumber(seoExecutiveKPIs.traffic.monthly_organic), sub: `/mois — cible ${formatNumber(seoExecutiveKPIs.traffic.monthly_organic_target)}`, icon: 'ri-line-chart-line', color: 'emerald' },
                { label: 'Leads Mensuels', value: String(seoExecutiveKPIs.leads.monthly_leads), sub: `${seoExecutiveKPIs.leads.conversion_rate_pct}% conversion`, icon: 'ri-user-add-line', color: 'teal' },
                { label: 'Backlinks', value: String(seoExecutiveKPIs.backlinks.total_backlinks), sub: `+${seoExecutiveKPIs.backlinks.backlinks_last_30d} ce mois`, icon: 'ri-link-m', color: 'amber' },
                { label: 'Domain Authority', value: String(seoExecutiveKPIs.backlinks.domain_authority), sub: `Cible ${seoExecutiveKPIs.backlinks.target_domain_authority}`, icon: 'ri-global-line', color: 'rose' },
                { label: 'Pages Publiées', value: String(seoExecutiveKPIs.content.total_pages_published), sub: `Cible ${seoExecutiveKPIs.content.target_pages}`, icon: 'ri-file-text-line', color: 'emerald' },
                { label: 'Téléchargements', value: String(seoExecutiveKPIs.downloads.monthly_downloads), sub: `${seoExecutiveKPIs.downloads.conversion_to_lead_pct}% → leads`, icon: 'ri-download-line', color: 'teal' },
                { label: 'Top 10 Google', value: String(seoExecutiveKPIs.traffic.pages_in_top_10), sub: `${seoExecutiveKPIs.traffic.pages_in_top_3} en top 3`, icon: 'ri-google-line', color: 'amber' },
                { label: 'Revenus SEO', value: formatFCFA(seoExecutiveKPIs.revenue.monthly_revenue_fcfa), sub: `${seoExecutiveKPIs.revenue.missions_from_seo} missions`, icon: 'ri-money-dollar-circle-line', color: 'rose' },
              ].map((kpi, i) => {
                const colorInfo = getPillarColor(kpi.color);
                return (
                  <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center ${colorInfo.bg}`}>
                      <i className={`${kpi.icon} text-sm ${colorInfo.text}`}></i>
                    </div>
                    <span className="block text-lg font-bold text-foreground-950">{kpi.value}</span>
                    <span className="text-[10px] text-foreground-400">{kpi.label}</span>
                    <span className="block text-[9px] text-foreground-300 mt-0.5">{kpi.sub}</span>
                  </div>
                );
              })}
            </div>

            {/* Growth Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <i className="ri-line-chart-line text-lg"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950">Croissance du Trafic</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-3xl font-bold text-emerald-600">+{seoExecutiveKPIs.traffic.growth_12m_pct}%</div>
                    <div className="text-xs text-foreground-500 mt-1">12 mois</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-3xl font-bold text-teal-600">+{seoExecutiveKPIs.traffic.growth_6m_pct}%</div>
                    <div className="text-xs text-foreground-500 mt-1">6 mois</div>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground-500">Progression vers cible 150k/mois</span>
                      <span className="text-xs font-bold text-foreground-950">{Math.round((seoExecutiveKPIs.traffic.monthly_organic / seoExecutiveKPIs.traffic.monthly_organic_target) * 100)}%</span>
                    </div>
                    {renderProgressBar(seoExecutiveKPIs.traffic.monthly_organic, seoExecutiveKPIs.traffic.monthly_organic_target, 'bg-emerald-500')}
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground-500">Progression vers 500 pages</span>
                      <span className="text-xs font-bold text-foreground-950">{Math.round((seoExecutiveKPIs.content.total_pages_published / seoExecutiveKPIs.content.target_pages) * 100)}%</span>
                    </div>
                    {renderProgressBar(seoExecutiveKPIs.content.total_pages_published, seoExecutiveKPIs.content.target_pages, 'bg-accent-500')}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    <i className="ri-money-dollar-circle-line text-lg"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950">Performance Commerciale SEO</h3>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{seoExecutiveKPIs.leads.monthly_leads}</div>
                    <div className="text-[10px] text-foreground-500">Leads/mois</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-accent-500">{formatFCFA(seoExecutiveKPIs.leads.pipeline_value_fcfa)}</div>
                    <div className="text-[10px] text-foreground-500">Pipeline</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-primary-500">+{seoExecutiveKPIs.revenue.revenue_growth_6m_pct}%</div>
                    <div className="text-[10px] text-foreground-500">Croissance 6m</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground-500">Taux de conversion lead</span>
                      <span className="text-xs font-bold text-foreground-950">{seoExecutiveKPIs.leads.conversion_rate_pct}%</span>
                    </div>
                    {renderProgressBar(seoExecutiveKPIs.leads.conversion_rate_pct, 15, 'bg-amber-500')}
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground-500">Lead → Mission</span>
                      <span className="text-xs font-bold text-foreground-950">{seoExecutiveKPIs.leads.lead_to_mission_rate_pct}%</span>
                    </div>
                    {renderProgressBar(seoExecutiveKPIs.leads.lead_to_mission_rate_pct, 20, 'bg-accent-500')}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Wins */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <i className="ri-flashlight-line text-accent-400 text-lg"></i>
                </div>
                <h3 className="font-heading text-lg font-bold">Quick Wins — 6 Actions Prioritaires</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {seoQuickWins.map((qw) => (
                  <div key={qw.id} className="flex items-start gap-3 p-4 rounded-xl bg-white/8 border border-white/10">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      qw.status === 'En cours' ? 'bg-accent-500/30' : 'bg-white/10'
                    }`}>
                      <i className={`${qw.status === 'En cours' ? 'ri-play-circle-line text-accent-400' : 'ri-time-line text-gray-400'} text-sm`}></i>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold ${getImpactBadge(qw.impact)}`}>
                          {qw.impact}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold ${getStatusBadge(qw.status)}`}>
                          {qw.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-200 leading-relaxed mb-1">{qw.action}</p>
                      <div className="flex items-center gap-3 text-[10px] text-gray-400">
                        <span><i className="ri-timer-line mr-1"></i>{qw.effort}</span>
                        <span className="text-accent-400">{qw.kpi_impact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB 2: 8 PILIERS STRATÉGIQUES ============ */}
        {activeTab === 'pillars' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                  <i className="ri-stack-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">Architecture Silo — 8 Piliers</h3>
                  <p className="text-xs text-foreground-500">{totalPublished}/{totalTarget} pages — {formatNumber(totalTraffic)} visites/mois</p>
                </div>
              </div>
              {seoAutopilotPillars.map((pillar) => {
                const c = getPillarColor(pillar.color);
                const isSelected = selectedPillar.id === pillar.id;
                return (
                  <div
                    key={pillar.id}
                    onClick={() => setSelectedPillar(pillar)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      isSelected ? `${c.border} ${c.bg}` : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 flex items-center justify-center rounded ${c.bg}`}>
                          <i className={`${pillar.icon} text-sm ${c.text}`}></i>
                        </div>
                        <span className="text-sm font-semibold text-foreground-950">{pillar.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getStatusBadge(pillar.status)}`}>
                        {pillar.status}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-foreground-400">Pages</span>
                        <span className="text-[10px] font-bold text-foreground-950">{pillar.articles_published}/{pillar.article_target}</span>
                      </div>
                      {renderProgressBar(pillar.articles_published, pillar.article_target, c.bar)}
                    </div>
                    <div className="flex items-center justify-between mt-2 text-[10px] text-foreground-400">
                      <span>{formatNumber(pillar.avg_traffic_monthly)} visites/mois</span>
                      <span>{pillar.conversion_rate}% conv.</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${getPillarColor(selectedPillar.color).bg}`}>
                    <i className={`${selectedPillar.icon} text-lg ${getPillarColor(selectedPillar.color).text}`}></i>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground-950">{selectedPillar.name}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getStatusBadge(selectedPillar.status)}`}>
                      {selectedPillar.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-foreground-600 mb-6">{selectedPillar.description}</p>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedPillar.articles_published}/{selectedPillar.article_target}</div>
                    <div className="text-[10px] text-foreground-500">Pages</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{formatNumber(selectedPillar.avg_traffic_monthly)}</div>
                    <div className="text-[10px] text-foreground-500">Trafic/mois</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedPillar.conversion_rate}%</div>
                    <div className="text-[10px] text-foreground-500">Conversion</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedPillar.backlinks_acquired}</div>
                    <div className="text-[10px] text-foreground-500">Backlinks</div>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground-500">Progression contenu</span>
                    </div>
                    {renderProgressBar(selectedPillar.articles_published, selectedPillar.article_target, getPillarColor(selectedPillar.color).bar)}
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground-500">Taux de conversion</span>
                    </div>
                    {renderProgressBar(selectedPillar.conversion_rate, 10, 'bg-amber-500')}
                  </div>
                </div>
                <div className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                  <h4 className="text-xs font-semibold text-foreground-950 mb-2">Mots-clés stratégiques</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPillar.top_keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-1 rounded-full bg-background-50 border border-background-200/70 text-[10px] text-foreground-600">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB 3: AUTOMATISATIONS ============ */}
        {activeTab === 'automations' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <i className="ri-cpu-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">9 Moteurs d'Automatisation</h3>
                  <p className="text-xs text-foreground-500">{activeAutomations}/9 actifs — {totalAlerts} alertes</p>
                </div>
              </div>
              {seoAutomations.map((auto) => (
                <div
                  key={auto.id}
                  onClick={() => setSelectedAutomation(auto)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedAutomation.id === auto.id
                      ? 'border-primary-300 bg-primary-50/50'
                      : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 flex items-center justify-center rounded bg-primary-50">
                        <i className={`${auto.icon} text-sm text-primary-600`}></i>
                      </div>
                      <span className="text-sm font-semibold text-foreground-950">{auto.name}</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold ${getStatusBadge(auto.status)}`}>
                      {auto.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-foreground-400 mt-1">
                    <span>{auto.articles_produced} articles</span>
                    <span>{auto.alerts_generated} alertes</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                    <i className={`${selectedAutomation.icon} text-lg`}></i>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground-950">{selectedAutomation.name}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getStatusBadge(selectedAutomation.status)}`}>
                      {selectedAutomation.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-foreground-600 mb-6">{selectedAutomation.description}</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedAutomation.articles_produced}</div>
                    <div className="text-[10px] text-foreground-500">Articles Produits</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedAutomation.alerts_generated}</div>
                    <div className="text-[10px] text-foreground-500">Alertes</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-xs font-bold text-foreground-950">{selectedAutomation.frequency}</div>
                    <div className="text-[10px] text-foreground-500">Fréquence</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-2">Sources</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedAutomation.sources.map((src, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-background-50 border border-background-200/70 text-[10px] text-foreground-500">
                          {src}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-2">Dernière exécution</h4>
                    <p className="text-xs text-foreground-600">
                      {new Date(selectedAutomation.last_run).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-background-200/70">
                  <span className="text-xs text-foreground-500">Automatisation KOS</span>
                  <span className="text-xs font-semibold text-primary-600">{activeAutomations}/9 moteurs actifs</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB 4: PIPELINE CONTENU ============ */}
        {activeTab === 'pipeline' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                  <i className="ri-file-list-3-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">Pipeline Éditorial</h3>
                  <p className="text-xs text-foreground-500">{pipelineTotal} contenus — 6 formats</p>
                </div>
              </div>
              {seoContentPipeline.map((pipe) => (
                <div
                  key={pipe.id}
                  onClick={() => setSelectedPipeline(pipe)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedPipeline.id === pipe.id
                      ? 'border-teal-300 bg-teal-50/50'
                      : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 flex items-center justify-center rounded bg-teal-50">
                        <i className={`${pipe.icon} text-sm text-teal-600`}></i>
                      </div>
                      <span className="text-sm font-semibold text-foreground-950">{pipe.type}</span>
                    </div>
                    <span className="text-xs font-bold text-foreground-950">{pipe.count_published}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-foreground-400">
                    <span className="text-emerald-600">{pipe.count_published} publiés</span>
                    <span className="text-amber-600">{pipe.count_in_progress} en cours</span>
                    <span className="text-foreground-400">{pipe.count_planned} planifiés</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                    <i className={`${selectedPipeline.icon} text-lg`}></i>
                  </div>
                  <h2 className="text-lg font-bold text-foreground-950">{selectedPipeline.type}</h2>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-emerald-600">{selectedPipeline.count_published}</div>
                    <div className="text-[10px] text-foreground-500">Publiés</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-amber-600">{selectedPipeline.count_in_progress}</div>
                    <div className="text-[10px] text-foreground-500">En cours</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-400">{selectedPipeline.count_planned}</div>
                    <div className="text-[10px] text-foreground-500">Planifiés</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedPipeline.avg_quality_score}</div>
                    <div className="text-[10px] text-foreground-500">Score Qualité</div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-foreground-500">Score qualité moyen</span>
                  </div>
                  {renderProgressBar(selectedPipeline.avg_quality_score, 10, 'bg-teal-500')}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-1">Délai moyen de publication</h4>
                    <p className="text-lg font-bold text-foreground-950">{selectedPipeline.avg_time_to_publish_days} <span className="text-xs font-normal text-foreground-400">jours</span></p>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-1">Trafic Top Performer</h4>
                    <p className="text-lg font-bold text-foreground-950">{formatNumber(selectedPipeline.top_performer_traffic)} <span className="text-xs font-normal text-foreground-400">visites</span></p>
                  </div>
                </div>
                <div className="p-4 bg-teal-50/50 rounded-lg border border-teal-100">
                  <h4 className="text-xs font-semibold text-foreground-950 mb-1">Top Performer</h4>
                  <p className="text-sm text-foreground-600 leading-relaxed">{selectedPipeline.top_performer}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB 5: VEILLE & MONITORING ============ */}
        {activeTab === 'monitoring' && (
          <div className="space-y-8">
            {/* Monitoring Sources Grid */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <i className="ri-radar-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">Sources Surveillées — {seoMonitoringSources.length} Autorités & Institutions</h3>
                  <p className="text-xs text-foreground-500">Détection automatique des nouvelles publications, réglementations et consultations</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {seoMonitoringSources.map((src) => {
                  const c = getPillarColor(src.color);
                  return (
                    <div key={src.id} className="rounded-xl border bg-background-50 border-background-200/70 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-7 h-7 flex items-center justify-center rounded-lg ${c.bg}`}>
                          <i className={`${src.icon} text-sm ${c.text}`}></i>
                        </div>
                        <span className="text-sm font-semibold text-foreground-950">{src.name}</span>
                      </div>
                      <div className="text-[10px] text-foreground-400 mb-2">{src.category}</div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-foreground-500">{src.frequency}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold ${getStatusBadge(src.status)}`}>
                          {src.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-background-100">
                        <div className={`w-6 h-6 flex items-center justify-center rounded ${c.bg}`}>
                          <span className={`text-[10px] font-bold ${c.text}`}>{src.detections_30d}</span>
                        </div>
                        <span className="text-[10px] text-foreground-400">détections / 30 jours</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Latest Detections */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-700">
                  <i className="ri-notification-3-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">12 Dernières Détections</h3>
                  <p className="text-xs text-foreground-500">Publications, réglementations, consultations détectées automatiquement</p>
                </div>
              </div>
              <div className="rounded-xl border border-background-200/70 overflow-hidden bg-background-50">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-background-100">
                      <tr>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Source</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Détection</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Type</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Date</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Impact</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Action</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seoMonitoringDetections.map((det) => (
                        <tr key={det.id} className="border-t border-background-100 hover:bg-background-50/70 transition-colors">
                          <td className="px-4 py-3">
                            <span className="text-xs font-semibold text-foreground-950">{det.source}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-foreground-700 line-clamp-2 max-w-xs">{det.title}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200/70 whitespace-nowrap">{det.type}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-foreground-500 whitespace-nowrap">{new Date(det.date).toLocaleDateString('fr-FR')}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold whitespace-nowrap ${getImpactBadge(det.impact)}`}>
                              {det.impact}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-foreground-600 whitespace-nowrap">{det.action}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold whitespace-nowrap ${det.status === 'Traité' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : det.status === 'En cours' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-background-100 text-foreground-500 border-background-200'}`}>
                              {det.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-foreground-400">
                <span>12 détections — juin 2026</span>
                <span>4 traitées · 4 en cours · 4 planifiées</span>
              </div>
            </div>

            {/* Content Production + Internal Linking */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Production Stats */}
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                    <i className="ri-file-edit-line text-lg"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950">Production de Contenu</h3>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{seoContentProduction.daily_avg}</div>
                    <div className="text-[10px] text-foreground-500">Articles/jour</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{seoContentProduction.monthly_avg}</div>
                    <div className="text-[10px] text-foreground-500">Articles/mois</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-accent-500">{seoContentProduction.ai_generated_pct}%</div>
                    <div className="text-[10px] text-foreground-500">Générés par IA</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground-500">En cours de rédaction</span>
                    <span className="text-xs font-bold text-foreground-950">{seoContentProduction.articles_in_draft}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground-500">En revue qualité</span>
                    <span className="text-xs font-bold text-foreground-950">{seoContentProduction.articles_in_review}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground-500">Score qualité moyen</span>
                    <span className="text-xs font-bold text-teal-600">{seoContentProduction.quality_score_avg}/10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground-500">Contributeurs actifs</span>
                    <span className="text-xs font-bold text-foreground-950">{seoContentProduction.contributors_active}</span>
                  </div>
                </div>
              </div>

              {/* Internal Linking Stats */}
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    <i className="ri-link-m text-lg"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950">Maillage Interne</h3>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{formatNumber(seoInternalLinking.total_internal_links)}</div>
                    <div className="text-[10px] text-foreground-500">Liens Internes</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{seoInternalLinking.avg_links_per_page}</div>
                    <div className="text-[10px] text-foreground-500">Liens/Page</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className={`text-lg font-bold ${seoInternalLinking.orphan_pages > 0 ? 'text-red-500' : 'text-emerald-600'}`}>{seoInternalLinking.orphan_pages}</div>
                    <div className="text-[10px] text-foreground-500">Pages Orphelines</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground-500">Taux de circulation</span>
                      <span className="text-xs font-bold text-foreground-950">{seoInternalLinking.circulation_rate_pct}%</span>
                    </div>
                    {renderProgressBar(seoInternalLinking.circulation_rate_pct, 100, 'bg-amber-500')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground-500">Silos optimisés</span>
                    <span className="text-xs font-bold text-foreground-950">{seoInternalLinking.silos_optimized}/{seoInternalLinking.silos_total}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground-500">Liens cassés</span>
                    <span className="text-xs font-bold text-red-500">{seoInternalLinking.broken_links} ({seoInternalLinking.broken_links_resolved} résolus)</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-background-100">
                  <h4 className="text-[10px] font-semibold text-foreground-500 mb-2">Pages les plus liées</h4>
                  {seoInternalLinking.top_linked_pages.map((page, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs text-foreground-600 mb-1">
                      <span className="text-foreground-400">#{i + 1}</span>
                      <span className="truncate">{page}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Production Pipeline */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <i className="ri-file-copy-line text-accent-400 text-lg"></i>
                </div>
                <h3 className="font-heading text-lg font-bold">Pipeline Éditorial Automatisé</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
                {[
                  { label: 'Détection', value: `${seoMonitoringDetections.length}`, sub: '/mois', icon: 'ri-radar-line' },
                  { label: 'Briefing IA', value: `${seoContentProduction.articles_in_draft}`, sub: 'en attente', icon: 'ri-file-edit-line' },
                  { label: 'Rédaction', value: `${seoContentProduction.articles_in_draft - seoContentProduction.articles_in_review}`, sub: 'en cours', icon: 'ri-article-line' },
                  { label: 'Revue Qualité', value: String(seoContentProduction.articles_in_review), sub: `score ${seoContentProduction.quality_score_avg}`, icon: 'ri-check-double-line' },
                  { label: 'Publication', value: String(seoContentProduction.current_month), sub: 'ce mois', icon: 'ri-send-plane-line' },
                  { label: 'Indexation', value: `${seoExecutiveKPIs.traffic.pages_in_top_10}`, sub: 'top 10', icon: 'ri-google-line' },
                  { label: 'Leads', value: String(seoExecutiveKPIs.leads.monthly_leads), sub: '/mois', icon: 'ri-user-add-line' },
                ].map((step, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/8 border border-white/10">
                    <i className={`${step.icon} text-accent-400 text-lg mb-2 block`}></i>
                    <span className="block text-lg font-bold font-heading">{step.value}</span>
                    <span className="text-[10px] text-gray-400">{step.label}</span>
                    <span className="text-[10px] text-gray-500">{step.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB: CORE WEB VITALS ============ */}
        {activeTab === 'cwv' && (
          <div className="space-y-8">
            {/* CWV Overview Hero */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <i className="ri-speed-line text-accent-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Core Web Vitals — Score Global</h3>
                  <p className="text-xs text-gray-400">Dernier scan : {new Date(seoCoreWebVitals.last_scan).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-3xl font-bold font-heading text-accent-400">{seoCoreWebVitals.overall_pass_rate_pct}%</div>
                  <div className="text-[10px] text-gray-400 mt-1">Pages OK</div>
                  <div className="text-[10px] text-gray-500">{seoCoreWebVitals.pages_passing}/{seoCoreWebVitals.pages_scanned}</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-3xl font-bold font-heading text-amber-400">{seoCoreWebVitals.pages_needing_improvement}</div>
                  <div className="text-[10px] text-gray-400 mt-1">À améliorer</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-3xl font-bold font-heading text-red-400">{seoCoreWebVitals.pages_poor}</div>
                  <div className="text-[10px] text-gray-400 mt-1">Mauvaises</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-3xl font-bold font-heading text-emerald-400">{seoCoreWebVitals.target_pass_rate_pct}%</div>
                  <div className="text-[10px] text-gray-400 mt-1">Cible</div>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between mb-1 text-xs text-gray-400">
                  <span>Progression vers 98%</span>
                  <span className="text-accent-400 font-bold">{seoCoreWebVitals.overall_pass_rate_pct}%</span>
                </div>
                {renderProgressBar(seoCoreWebVitals.overall_pass_rate_pct, 100, 'bg-accent-500')}
              </div>
            </div>

            {/* Mobile vs Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { label: 'Mobile', data: seoCoreWebVitals.mobile, icon: 'ri-smartphone-line', color: 'emerald' },
                { label: 'Desktop', data: seoCoreWebVitals.desktop, icon: 'ri-computer-line', color: 'teal' },
              ].map((device) => {
                const colorInfo = getPillarColor(device.color);
                return (
                  <div key={device.label} className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${colorInfo.bg}`}>
                        <i className={`${device.icon} text-lg ${colorInfo.text}`}></i>
                      </div>
                      <h3 className="text-sm font-bold text-foreground-950">{device.label}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-background-100 rounded-lg text-center">
                        <div className={`text-2xl font-bold ${device.data.lcp_avg_seconds <= (device.data as any).lcp_target_seconds ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {device.data.lcp_avg_seconds}s
                        </div>
                        <div className="text-[10px] text-foreground-500">LCP</div>
                        <div className="text-[9px] text-foreground-400">{device.data.lcp_pass_pct}% pass</div>
                      </div>
                      <div className="p-4 bg-background-100 rounded-lg text-center">
                        <div className={`text-2xl font-bold ${device.data.inp_pass_pct >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {device.data.inp_avg_ms}ms
                        </div>
                        <div className="text-[10px] text-foreground-500">INP</div>
                        <div className="text-[9px] text-foreground-400">{device.data.inp_pass_pct}% pass</div>
                      </div>
                      <div className="p-4 bg-background-100 rounded-lg text-center">
                        <div className={`text-2xl font-bold ${device.data.cls_avg <= 0.1 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {device.data.cls_avg}
                        </div>
                        <div className="text-[10px] text-foreground-500">CLS</div>
                        <div className="text-[9px] text-foreground-400">{device.data.cls_pass_pct}% pass</div>
                      </div>
                      <div className="p-4 bg-background-100 rounded-lg text-center">
                        <div className="text-2xl font-bold text-foreground-950">{device.data.tbt_avg_ms}ms</div>
                        <div className="text-[10px] text-foreground-500">TBT</div>
                        <div className="text-[9px] text-foreground-400">FCP {device.data.fcp_avg_seconds}s</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Historical Trend (Text-based bar chart) */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                  <i className="ri-line-chart-line text-lg"></i>
                </div>
                <h3 className="text-sm font-bold text-foreground-950">Progression Mensuelle — Taux de Passage CWV</h3>
              </div>
              <div className="flex items-end gap-4 h-48">
                {seoCoreWebVitals.historical.map((h) => (
                  <div key={h.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs font-bold text-foreground-950">{h.pass_rate}%</span>
                    <div className="w-full bg-accent-500 rounded-t-md transition-all" style={{ height: `${h.pass_rate * 1.5}px` }}></div>
                    <span className="text-[10px] text-foreground-400">{h.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top & Worst Performers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <i className="ri-trophy-line text-lg"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950">Top 5 — Meilleures Pages</h3>
                </div>
                <div className="space-y-3">
                  {seoCoreWebVitals.top_performers.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-background-100 rounded-lg">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-foreground-700 truncate">{p.page}</p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-foreground-400">
                          <span>LCP {p.lcp}s</span>
                          <span>·</span>
                          <span>INP {p.inp}ms</span>
                          <span>·</span>
                          <span>CLS {p.cls}</span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-emerald-600 ml-3">{p.score}/100</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-700">
                    <i className="ri-error-warning-line text-lg"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950">Pages à Corriger</h3>
                </div>
                <div className="space-y-3">
                  {seoCoreWebVitals.worst_performers.map((p, i) => (
                    <div key={i} className="p-3 bg-background-100 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-foreground-700 truncate flex-1">{p.page}</p>
                        <span className="text-sm font-bold text-red-500 ml-3">{p.score}/100</span>
                      </div>
                      <p className="text-[10px] text-red-600">{p.issue}</p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-foreground-400">
                        <span>LCP {p.lcp}s</span>
                        <span>·</span>
                        <span>INP {p.inp}ms</span>
                        <span>·</span>
                        <span>CLS {p.cls}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Improvement Actions */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <i className="ri-tools-line text-lg"></i>
                </div>
                <h3 className="text-sm font-bold text-foreground-950">Plan d'Amélioration CWV</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Action</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Impact</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Pages</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seoCoreWebVitals.improvement_actions.map((act, i) => (
                      <tr key={i} className="border-t border-background-100">
                        <td className="px-4 py-3 text-xs text-foreground-700">{act.action}</td>
                        <td className="px-4 py-3 text-xs font-semibold text-emerald-600">{act.impact}</td>
                        <td className="px-4 py-3 text-xs text-foreground-500">{act.pages_affected}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold whitespace-nowrap ${
                            act.status === 'Terminé' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            act.status === 'En cours' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            'bg-background-100 text-foreground-500 border-background-200'
                          }`}>{act.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB: AEO / GEO ============ */}
        {activeTab === 'aeo' && (
          <div className="space-y-8">
            {/* AEO Overview */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <i className="ri-robot-2-line text-accent-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Answer Engine Optimization — Score Global</h3>
                  <p className="text-xs text-gray-400">Visibilité sur moteurs IA, Featured Snippets, People Also Ask, Knowledge Graph</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-accent-400">{seoAEO.overall_score}</div>
                  <div className="text-[10px] text-gray-400">Score AEO</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-emerald-400">{seoAEO.featured_snippets.won}</div>
                  <div className="text-[10px] text-gray-400">Featured Snippets</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-teal-400">{seoAEO.people_also_ask.positions_held}</div>
                  <div className="text-[10px] text-gray-400">PAA Positions</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-amber-400">{seoAEO.knowledge_graph.entities_claimed}/{seoAEO.knowledge_graph.total_entities}</div>
                  <div className="text-[10px] text-gray-400">KG Entities</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-rose-400">{seoAEO.zero_click.pct_of_searches}%</div>
                  <div className="text-[10px] text-gray-400">Zero-Click</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-accent-400">{seoAEO.overall_target_score}</div>
                  <div className="text-[10px] text-gray-400">Cible</div>
                </div>
              </div>
            </div>

            {/* AI Engines Visibility */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                  <i className="ri-brain-line text-lg"></i>
                </div>
                <h3 className="text-sm font-bold text-foreground-950">Visibilité sur Moteurs IA — 6 Moteurs</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {seoAEO.ai_engines.map((eng) => {
                  const c = getPillarColor(eng.color);
                  return (
                    <div key={eng.engine} className="p-4 rounded-xl border bg-background-50 border-background-200/70">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 flex items-center justify-center rounded-lg ${c.bg}`}>
                            <i className={`ri-search-eye-line text-sm ${c.text}`}></i>
                          </div>
                          <span className="text-xs font-semibold text-foreground-950">{eng.engine}</span>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold ${
                          eng.trend === 'up' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-background-100 text-foreground-500 border-background-200'
                        }`}>{eng.trend === 'up' ? '▲' : '—'}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-foreground-950">{eng.visibility_score}</span>
                        <span className="text-[10px] text-foreground-400">/100</span>
                      </div>
                      {renderProgressBar(eng.visibility_score, 100, c.bar)}
                      <div className="mt-3 flex items-center justify-between text-[10px] text-foreground-400">
                        <span className="flex items-center gap-1"><i className="ri-chat-quote-line"></i>{eng.citations_last_30d} citations</span>
                        <span>30 jours</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Featured Snippets + PAA */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <i className="ri-file-copy-2-line text-lg"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950">Featured Snippets</h3>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-emerald-600">{seoAEO.featured_snippets.won}</div>
                    <div className="text-[10px] text-foreground-500">Gagnés</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-500">{seoAEO.featured_snippets.lost}</div>
                    <div className="text-[10px] text-foreground-500">Perdus</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{seoAEO.featured_snippets.win_rate_pct}%</div>
                    <div className="text-[10px] text-foreground-500">Win Rate</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs text-foreground-500">
                    <span>Taux de conquête</span>
                    <span className="font-bold">{seoAEO.featured_snippets.win_rate_pct}%</span>
                  </div>
                  {renderProgressBar(seoAEO.featured_snippets.win_rate_pct, 100, 'bg-emerald-500')}
                </div>
              </div>

              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                    <i className="ri-question-answer-line text-lg"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950">People Also Ask</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-teal-600">{seoAEO.people_also_ask.positions_held}</div>
                    <div className="text-[10px] text-foreground-500">Positions</div>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg text-center">
                    <div className="text-2xl font-bold text-foreground-950">{seoAEO.people_also_ask.coverage_pct}%</div>
                    <div className="text-[10px] text-foreground-500">Couverture</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs text-foreground-500">
                    <span>Couverture PAA</span>
                    <span className="font-bold">{seoAEO.people_also_ask.coverage_pct}%</span>
                  </div>
                  {renderProgressBar(seoAEO.people_also_ask.coverage_pct, 100, 'bg-teal-500')}
                </div>
              </div>
            </div>

            {/* Top FAQ Keywords */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <i className="ri-hashtag text-lg"></i>
                </div>
                <h3 className="text-sm font-bold text-foreground-950">Top 5 — Mots-Clés avec Rich Results</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Mot-Clé</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Position</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Rich Type</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Impressions/mois</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seoAEO.top_faq_keywords.map((kw, i) => (
                      <tr key={i} className="border-t border-background-100">
                        <td className="px-4 py-3 text-xs text-foreground-700">{kw.keyword}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold ${kw.position === 1 ? 'text-emerald-600' : kw.position <= 3 ? 'text-amber-600' : 'text-foreground-500'}`}>#{kw.position}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent-100 text-accent-700 border border-accent-200 whitespace-nowrap">{kw.rich_type}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-foreground-500">{formatNumber(kw.monthly_impressions)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Wins AEO */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <i className="ri-flashlight-line text-accent-400 text-lg"></i>
                </div>
                <h3 className="font-heading text-lg font-bold">Quick Wins AEO — 4 Actions Prioritaires</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {seoAEO.quick_wins_aeo.map((qw, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/8 border border-white/10">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      qw.status === 'En cours' ? 'bg-accent-500/30' : 'bg-white/10'
                    }`}>
                      <i className={`${qw.status === 'En cours' ? 'ri-play-circle-line text-accent-400' : 'ri-time-line text-gray-400'} text-sm`}></i>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-200 leading-relaxed mb-1">{qw.action}</p>
                      <div className="flex items-center gap-3 text-[10px] text-gray-400">
                        <span className="text-accent-400 font-semibold">{qw.impact}</span>
                        <span><i className="ri-timer-line mr-1"></i>{qw.effort}</span>
                        <span className={`px-1.5 py-0.5 rounded-full border text-[9px] ${qw.status === 'En cours' ? 'text-accent-300 border-accent-500/30' : 'text-gray-400 border-gray-500/30'}`}>{qw.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB: SCHEMA.ORG ============ */}
        {activeTab === 'schema' && (
          <div className="space-y-8">
            {/* Schema Overview */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <i className="ri-code-box-line text-accent-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Schema.org — Gouvernance des Données Structurées</h3>
                  <p className="text-xs text-gray-400">{seoSchemaOrg.total_types_deployed} types déployés sur {seoSchemaOrg.total_pages_with_schema} pages</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-accent-400">{seoSchemaOrg.total_types_deployed}</div>
                  <div className="text-[10px] text-gray-400">Types</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-emerald-400">{seoSchemaOrg.schema_coverage_pct}%</div>
                  <div className="text-[10px] text-gray-400">Couverture</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-rose-400">{seoSchemaOrg.rich_results_active}</div>
                  <div className="text-[10px] text-gray-400">Rich Results</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-red-400">{seoSchemaOrg.validation_errors}</div>
                  <div className="text-[10px] text-gray-400">Erreurs</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-amber-400">{seoSchemaOrg.validation_warnings}</div>
                  <div className="text-[10px] text-gray-400">Warnings</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-accent-400">{seoSchemaOrg.total_pages_without_schema}</div>
                  <div className="text-[10px] text-gray-400">Sans Schema</div>
                </div>
              </div>
            </div>

            {/* Schema Types Grid */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <i className="ri-layout-grid-line text-lg"></i>
                </div>
                <h3 className="text-sm font-bold text-foreground-950">12 Types Schema.org Déployés</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {seoSchemaOrg.types.map((t) => (
                  <div key={t.type} className={`p-4 rounded-lg border ${t.valid ? 'bg-background-50 border-background-200/70' : 'bg-red-50/50 border-red-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {t.rich_result && <span className="text-[9px] px-1 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">★</span>}
                        <span className="text-xs font-semibold text-foreground-950">{t.type}</span>
                      </div>
                      <span className={`w-2 h-2 rounded-full ${t.valid ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                    </div>
                    <p className="text-[10px] text-foreground-400 mb-2">{t.description}</p>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-foreground-400">{t.pages} pages</span>
                      {t.errors > 0 && <span className="text-red-500">{t.errors} erreurs</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rich Results Performance */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <i className="ri-bar-chart-grouped-line text-lg"></i>
                </div>
                <h3 className="text-sm font-bold text-foreground-950">Performance Rich Results — Google SERP</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Type Rich Result</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Impressions</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Clics</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">CTR</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Position Moy.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seoSchemaOrg.rich_results_performance.map((rr, i) => (
                      <tr key={i} className="border-t border-background-100">
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold text-foreground-950">{rr.type}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-foreground-700">{formatNumber(rr.impressions)}</td>
                        <td className="px-4 py-3 text-xs text-foreground-700">{formatNumber(rr.clicks)}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-bold text-emerald-600">{rr.ctr_pct}%</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold ${rr.avg_position <= 2 ? 'text-emerald-600' : rr.avg_position <= 4 ? 'text-amber-600' : 'text-foreground-500'}`}>{rr.avg_position}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Missing Opportunities + Critical Fixes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                    <i className="ri-lightbulb-line text-lg"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950">Opportunités Schema Manquantes</h3>
                </div>
                <div className="space-y-3">
                  {seoSchemaOrg.missing_opportunities.map((opp, i) => (
                    <div key={i} className="flex items-start justify-between p-3 bg-background-100 rounded-lg">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-foreground-950">{opp.schema}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${
                            opp.priority === 'Haute' ? 'bg-red-50 text-red-700 border border-red-200' :
                            opp.priority === 'Moyenne' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-background-200 text-foreground-500'
                          }`}>{opp.priority}</span>
                        </div>
                        <p className="text-[10px] text-foreground-400">{opp.benefit} — {opp.pages_eligible} pages éligibles</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-700">
                    <i className="ri-error-warning-line text-lg"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950">Correctifs Critiques</h3>
                </div>
                <div className="space-y-3">
                  {seoSchemaOrg.critical_fixes.map((fix, i) => (
                    <div key={i} className="p-3 bg-background-100 rounded-lg border border-background-200/70">
                      <p className="text-xs text-foreground-700 truncate mb-1">{fix.page}</p>
                      <p className="text-[10px] text-foreground-500 mb-2">{fix.issue}</p>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-semibold ${
                        fix.severity === 'Erreur' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>{fix.severity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB 6: ÉCOSYSTÈME SEO ============ */}
        {activeTab === 'ecosystem' && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <i className="ri-global-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">Écosystème KOS SEO Interconnecté</h3>
                  <p className="text-xs text-foreground-500">7 hubs SEO/GEO — Navigation unifiée</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {seoEcosystemLinks.map((hub) => {
                  const c = getPillarColor(hub.color);
                  return (
                    <Link
                      key={hub.path}
                      to={hub.path}
                      className={`rounded-xl border p-5 hover:shadow-md transition-all cursor-pointer block bg-background-50 border-background-200/70 hover:border-background-300/60`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${c.bg}`}>
                          <i className={`${hub.icon} text-lg ${c.text}`}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-foreground-950">{hub.name}</h4>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold ${getStatusBadge(hub.status)}`}>
                            {hub.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed">{hub.description}</p>
                      <div className="flex items-center gap-1 mt-3 text-xs text-foreground-400">
                        <i className="ri-arrow-right-up-line text-sm"></i>
                        <span>Accéder au hub</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Ecosystem Stats */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <h3 className="font-heading text-lg font-bold mb-5 flex items-center gap-2">
                <i className="ri-radar-line text-accent-400"></i>
                Performance Écosystème SEO Global
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                {[
                  { label: 'Trafic Mensuel', value: formatNumber(seoExecutiveKPIs.traffic.monthly_organic), icon: 'ri-line-chart-line' },
                  { label: 'Pages Top 10', value: String(seoExecutiveKPIs.traffic.pages_in_top_10), icon: 'ri-google-line' },
                  { label: 'Backlinks', value: String(seoExecutiveKPIs.backlinks.total_backlinks), icon: 'ri-link-m' },
                  { label: 'Leads/mois', value: String(seoExecutiveKPIs.leads.monthly_leads), icon: 'ri-user-add-line' },
                  { label: 'Pages Publiées', value: `${seoExecutiveKPIs.content.total_pages_published}/${seoExecutiveKPIs.content.target_pages}`, icon: 'ri-file-text-line' },
                  { label: 'DA', value: String(seoExecutiveKPIs.backlinks.domain_authority), icon: 'ri-global-line' },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/8 border border-white/10">
                    <i className={`${stat.icon} text-accent-400 text-xl mb-2 block`}></i>
                    <span className="block text-xl font-bold font-heading">{stat.value}</span>
                    <span className="text-[10px] text-gray-400">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer KPI Bar */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Indicateurs Clés — KOS SEO Autopilot™</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Trafic Organique</div>
              <div className="text-lg font-bold text-foreground-950">{formatNumber(seoExecutiveKPIs.traffic.monthly_organic)}/mois</div>
              <div className="text-[10px] text-emerald-600 mt-1">+{seoExecutiveKPIs.traffic.growth_12m_pct}% sur 12 mois</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Leads Générés</div>
              <div className="text-lg font-bold text-accent-500">{seoExecutiveKPIs.leads.monthly_leads}/mois</div>
              <div className="text-[10px] text-foreground-400 mt-1">{seoExecutiveKPIs.leads.conversion_rate_pct}% conversion</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Backlinks</div>
              <div className="text-lg font-bold text-primary-500">{seoExecutiveKPIs.backlinks.total_backlinks}</div>
              <div className="text-[10px] text-foreground-400 mt-1">+{seoExecutiveKPIs.backlinks.backlinks_last_30d} ce mois</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Domain Authority</div>
              <div className="text-lg font-bold text-amber-600">{seoExecutiveKPIs.backlinks.domain_authority}/100</div>
              <div className="text-[10px] text-foreground-400 mt-1">Cible {seoExecutiveKPIs.backlinks.target_domain_authority}</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Pages Top 10 Google</div>
              <div className="text-lg font-bold text-emerald-600">{seoExecutiveKPIs.traffic.pages_in_top_10}</div>
              <div className="text-[10px] text-foreground-400 mt-1">{seoExecutiveKPIs.traffic.pages_in_top_3} en top 3</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Revenus SEO</div>
              <div className="text-lg font-bold text-foreground-950">{formatFCFA(seoExecutiveKPIs.revenue.monthly_revenue_fcfa)}/mois</div>
              <div className="text-[10px] text-primary-600 mt-1">+{seoExecutiveKPIs.revenue.revenue_growth_6m_pct}% sur 6 mois</div>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





