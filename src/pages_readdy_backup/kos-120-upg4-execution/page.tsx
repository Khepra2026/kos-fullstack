import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useUPG4RevenuePipeline } from '@/hooks/useUPG4RevenuePipeline';

type TabId = 'overview' | 'revenue' | 'pipeline' | 'knowledge' | 'hubs';

const STAGE_BADGE: Record<string, string> = {
  negociation: 'bg-primary-100 text-primary-800',
  proposition: 'bg-amber-100 text-amber-800',
  qualification: 'bg-secondary-100 text-secondary-800',
  discovery: 'bg-background-200 text-foreground-600',
  closed_won: 'bg-emerald-100 text-emerald-800',
  closed_lost: 'bg-red-100 text-red-800',
};
const STAGE_LABEL: Record<string, string> = {
  negociation: 'Négociation',
  proposition: 'Proposition',
  qualification: 'Qualification',
  discovery: 'Découverte',
  closed_won: 'Gagné',
  closed_lost: 'Perdu',
};

function formatFCFA(v: number): string {
  if (v >= 1_000_000_000) return `${(v / 1_000_000_000).toFixed(2)} Md FCFA`;
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(0)}M FCFA`;
  return `${v.toLocaleString('fr-FR')} FCFA`;
}

export default function uPG4RevenuePipelinePage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const {
    revenueData, pipelineDeals, monetizationItems, kpis,
    dataSource, loading, error, refresh,
  } = useUPG4RevenuePipeline();

  const TABS: { id: TabId; label: string; icon: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
    { id: 'revenue', label: 'Pipeline Revenus', icon: 'ri-funds-line' },
    { id: 'pipeline', label: 'Deals Actifs', icon: 'ri-shopping-cart-line' },
    { id: 'knowledge', label: 'Knowledge Monetization', icon: 'ri-book-2-line' },
    { id: 'hubs', label: '3 Hubs Revenue', icon: 'ri-link-m' },
  ];

  const histData = revenueData.filter(r => r.forecast_type === 'historical');
  const fcastData = revenueData.filter(r => r.forecast_type === 'forecast');
  const maxActual = Math.max(...histData.map(r => r.actual), 1);

  const activeDeals = pipelineDeals.filter(d =>
    ['negociation', 'proposition', 'qualification', 'discovery'].includes(d.pipeline_stage)
  );

  return (
    <hubLayout hubId={134}>
      {/* Header */}
      <div className="bg-background-100 border-b border-background-200/70 px-6 py-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary-500 text-white">
              <i className="ri-money-dollar-circle-line text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground-950 font-heading">
                KOS UPG-4 Expansion &amp; Monétisation™
              </h1>
              <p className="text-sm text-foreground-600">3 hubs revenue connectés Supabase LIVE · Pipeline dynamique · Knowledge Products</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${dataSource === 'live' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              <i className={`ri-${dataSource === 'live' ? 'wifi-line' : 'database-line'} mr-1`}></i>
              {dataSource === 'live' ? 'LIVE DB' : 'MOCK'}
            </span>
            <button onClick={refresh} className="px-3 py-1 rounded-lg bg-background-200 text-foreground-700 text-xs cursor-pointer hover:bg-background-300 transition-colors">
              <i className="ri-refresh-line mr-1"></i>Refresh
            </button>
          </div>
        </div>

        {/* KPI Bar */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          {[
            { label: 'CA Juin 2026', value: formatFCFA(kpis.totalRevenueMTD), icon: 'ri-bar-chart-fill', color: 'secondary' },
            { label: 'Cumul 2026', value: formatFCFA(kpis.totalRevenueCumul), icon: 'ri-line-chart-line', color: 'primary' },
            { label: 'Pipeline Actif', value: formatFCFA(kpis.pipelineActiveValue), icon: 'ri-funds-line', color: 'accent' },
            { label: 'Prévision Q3', value: formatFCFA(kpis.forecastQ3), icon: 'ri-rocket-line', color: 'secondary' },
            { label: 'Croissance MoM', value: `+${kpis.revenueGrowthMoM}%`, icon: 'ri-arrow-up-line', color: 'primary' },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-lg p-3 border border-background-200/70">
              <div className="flex items-center gap-1.5 mb-1">
                <i className={`${k.icon} text-sm text-${k.color}-500`}></i>
                <span className="text-xs text-foreground-400">{k.label}</span>
              </div>
              <div className={`text-base font-bold text-${k.color}-600`}>{k.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-background-200/70 px-6">
        <div className="flex gap-1">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === tab.id ? 'border-secondary-500 text-secondary-700' : 'border-transparent text-foreground-500 hover:text-foreground-700'}`}>
              <i className={tab.icon}></i>{tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* ERROR STATE */}
        {error && (
          <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <i className="ri-error-warning-line mr-2"></i>{error}
          </div>
        )}

        {/* ======== OVERVIEW ======== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Hero Revenue Chart */}
            <div className="bg-white rounded-xl border border-background-200/70 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground-900">Évolution des Revenus KOS — 2026</h3>
                <div className="flex items-center gap-4 text-xs text-foreground-500">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-secondary-500 inline-block"></span>Réalisé</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-secondary-200 inline-block border border-dashed border-secondary-400"></span>Prévisionnel</span>
                </div>
              </div>
              <div className="flex items-end gap-2 h-40">
                {revenueData.map((r, i) => {
                  const maxVal = Math.max(...revenueData.map(x => Math.max(x.actual || 0, x.forecast || 0)), 1);
                  const actualH = r.actual ? Math.round((r.actual / maxVal) * 100) : 0;
                  const forecastH = r.forecast ? Math.round((r.forecast / maxVal) * 100) : 0;
                  return (
                    <div key={r.month} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col items-center justify-end relative" style={{ height: '120px' }}>
                        {r.actual > 0 ? (
                          <div className="w-full bg-secondary-500 rounded-t-sm absolute bottom-0" style={{ height: `${actualH}%` }}></div>
                        ) : (
                          <div className="w-full bg-secondary-200 rounded-t-sm absolute bottom-0 border border-dashed border-secondary-400" style={{ height: `${forecastH}%` }}></div>
                        )}
                      </div>
                      <span className="text-[9px] text-foreground-400 whitespace-nowrap">{r.month.slice(0, 3)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3 Hubs Revenue Summary */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { title: 'Knowledge Monetization Engine™', url: '/kos-knowledge-monetization-engine', desc: `${monetizationItems.length > 0 ? monetizationItems.length : 12} produits actifs · Baromètres, Études, Formations, Templates`, value: formatFCFA(kpis.knowledgeProductsValue || 1540000000), icon: 'ri-book-2-line', color: 'primary', badge: dataSource === 'live' ? 'LIVE' : 'MOCK' },
                { title: 'Closing & Growth Engine™', url: '/kos-closing-growth-engine', desc: `${activeDeals.length > 0 ? activeDeals.length : 6} deals actifs · Pipeline ${formatFCFA(kpis.pipelineActiveValue || 32250000)}`, value: formatFCFA(kpis.weightedPipeline || 14660000), icon: 'ri-fire-line', color: 'accent', badge: dataSource === 'live' ? 'LIVE' : 'MOCK' },
                { title: 'Business Opportunity Intelligence™', url: '/kos-business-opportunity-intelligence', desc: '10 agents autonomes · 347 AO/mois · 580 opportunités', value: '850M FCFA/mois', icon: 'ri-radar-line', color: 'secondary', badge: 'Active' },
              ].map(hub => (
                <a key={hub.url} href={hub.url} className="bg-white rounded-xl border border-background-200/70 p-5 hover:border-foreground-300 transition-all cursor-pointer block">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-${hub.color}-100 text-${hub.color}-600`}>
                      <i className={`${hub.icon} text-lg`}></i>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${hub.badge === 'LIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{hub.badge}</span>
                  </div>
                  <h4 className="font-semibold text-foreground-900 text-sm mb-1">{hub.title}</h4>
                  <p className="text-xs text-foreground-500 mb-3">{hub.desc}</p>
                  <div className={`text-lg font-bold text-${hub.color}-600`}>{hub.value}</div>
                  <div className="text-xs text-foreground-400 mt-1">pipeline pondéré</div>
                </a>
              ))}
            </div>

            {/* Pipeline Deals Summary */}
            <div className="bg-white rounded-xl border border-background-200/70 p-5">
              <h3 className="text-base font-semibold text-foreground-900 mb-4">
                <i className="ri-shopping-cart-line mr-2 text-secondary-500"></i>
                Pipeline Actif — {activeDeals.length} deals
              </h3>
              <div className="space-y-2">
                {activeDeals.slice(0, 5).map(deal => (
                  <div key={deal.id} className="flex items-center gap-3 p-3 bg-background-50 rounded-lg">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap ${STAGE_BADGE[deal.pipeline_stage] || 'bg-background-200 text-foreground-600'}`}>
                      {STAGE_LABEL[deal.pipeline_stage] || deal.pipeline_stage}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground-900 truncate">{deal.deal_name}</div>
                      <div className="text-xs text-foreground-500">{deal.organization} · {deal.country}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-secondary-600">{formatFCFA(deal.deal_value_fcfa)}</div>
                      <div className="text-xs text-foreground-400">{deal.win_probability}% probabilité</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======== REVENUE DATA ======== */}
        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Cumul Réalisé 2026', value: formatFCFA(kpis.totalRevenueCumul), color: 'text-secondary-600' },
                { label: 'Pipeline Pondéré', value: formatFCFA(kpis.weightedPipeline), color: 'text-primary-600' },
                { label: 'Prévisionnel Q3', value: formatFCFA(kpis.forecastQ3), color: 'text-accent-600' },
                { label: 'Croissance MoM', value: `+${kpis.revenueGrowthMoM}%`, color: 'text-emerald-600' },
              ].map(k => (
                <div key={k.label} className="bg-white rounded-xl border border-background-200/70 p-4 text-center">
                  <div className={`text-xl font-bold ${k.color}`}>{k.value}</div>
                  <div className="text-xs text-foreground-500 mt-1">{k.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-background-200/70 p-6">
              <h3 className="text-base font-semibold text-foreground-900 mb-4">Tableau Revenus Mensuel 2026</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-background-200">
                      <th className="text-left py-2 text-xs font-semibold text-foreground-500">Mois</th>
                      <th className="text-right py-2 text-xs font-semibold text-foreground-500">Réalisé</th>
                      <th className="text-right py-2 text-xs font-semibold text-foreground-500">Cible</th>
                      <th className="text-right py-2 text-xs font-semibold text-foreground-500">Prévision</th>
                      <th className="text-right py-2 text-xs font-semibold text-foreground-500">Confiance</th>
                      <th className="text-right py-2 text-xs font-semibold text-foreground-500">Pipeline</th>
                      <th className="text-left py-2 text-xs font-semibold text-foreground-500">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueData.map(r => (
                      <tr key={r.month} className={`border-b border-background-100 hover:bg-background-50 ${r.forecast_type === 'forecast' ? 'opacity-75 italic' : ''}`}>
                        <td className="py-2 font-medium text-foreground-950">{r.month}</td>
                        <td className="py-2 text-right font-bold text-secondary-600">{r.actual > 0 ? formatFCFA(r.actual) : '—'}</td>
                        <td className="py-2 text-right text-foreground-600">{formatFCFA(r.target)}</td>
                        <td className="py-2 text-right text-foreground-600">{formatFCFA(r.forecast)}</td>
                        <td className="py-2 text-right">
                          <span className={`text-xs font-semibold ${r.confidence >= 90 ? 'text-emerald-600' : r.confidence >= 75 ? 'text-amber-600' : 'text-red-600'}`}>{r.confidence}%</span>
                        </td>
                        <td className="py-2 text-right text-foreground-500">{formatFCFA(r.deals_pipeline_value || 0)}</td>
                        <td className="py-2 text-xs text-foreground-400 max-w-xs truncate">{r.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======== PIPELINE DEALS ======== */}
        {activeTab === 'pipeline' && (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4 border border-background-200/70 text-center">
                <div className="text-xl font-bold text-secondary-600">{activeDeals.length}</div>
                <div className="text-xs text-foreground-500">Deals actifs</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-background-200/70 text-center">
                <div className="text-xl font-bold text-primary-600">{formatFCFA(kpis.pipelineActiveValue)}</div>
                <div className="text-xs text-foreground-500">Valeur pipeline</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-background-200/70 text-center">
                <div className="text-xl font-bold text-accent-600">{formatFCFA(kpis.weightedPipeline)}</div>
                <div className="text-xs text-foreground-500">Pipeline pondéré</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-background-200/70 text-center">
                <div className="text-xl font-bold text-foreground-950">{formatFCFA(kpis.avgDealValue)}</div>
                <div className="text-xs text-foreground-500">Deal moyen</div>
              </div>
            </div>

            <div className="space-y-3">
              {pipelineDeals.map(deal => (
                <div key={deal.id} className="bg-white rounded-xl border border-background-200/70 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${STAGE_BADGE[deal.pipeline_stage] || 'bg-background-200 text-foreground-600'}`}>
                          {STAGE_LABEL[deal.pipeline_stage] || deal.pipeline_stage}
                        </span>
                        <span className="text-xs text-foreground-400">{deal.sector} · {deal.country}</span>
                      </div>
                      <div className="font-semibold text-foreground-900">{deal.deal_name}</div>
                      <div className="text-xs text-foreground-500">{deal.organization}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-secondary-600">{formatFCFA(deal.deal_value_fcfa)}</div>
                      <div className="text-xs text-foreground-400">{deal.win_probability}% prob.</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-foreground-500 mb-2">
                    <span><i className="ri-calendar-line mr-1"></i>{deal.expected_close_date}</span>
                    <span><i className="ri-user-line mr-1"></i>{deal.assigned_to}</span>
                    <span><i className="ri-arrow-right-line mr-1"></i>{deal.next_action}</span>
                  </div>
                  {deal.differentiator && (
                    <div className="p-2 bg-secondary-50 rounded-lg text-xs text-secondary-800 border border-secondary-100">
                      <i className="ri-award-line mr-1"></i>{deal.differentiator}
                    </div>
                  )}
                  {deal.competitors && deal.competitors.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {deal.competitors.map((c, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-100">{c}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======== KNOWLEDGE MONETIZATION ======== */}
        {activeTab === 'knowledge' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl border border-background-200/70 p-4">
                <div className="text-2xl font-bold text-primary-600">{formatFCFA(kpis.knowledgeProductsValue)}</div>
                <div className="text-sm text-foreground-500">Valeur estimée Knowledge Products</div>
              </div>
              <div className="bg-white rounded-xl border border-background-200/70 p-4">
                <div className="text-2xl font-bold text-accent-600">{monetizationItems.length} produits actifs</div>
                <div className="text-sm text-foreground-500">depuis la base Supabase LIVE</div>
              </div>
            </div>

            {monetizationItems.length > 0 ? (
              <div className="space-y-3">
                {monetizationItems.map(item => (
                  <div key={item.id} className="bg-white rounded-xl border border-background-200/70 p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold text-foreground-900 text-sm">{item.source_mission}</div>
                        <div className="text-xs text-foreground-500">{item.source_study}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary-600">{formatFCFA(item.estimated_value_fcfa)}</div>
                        <div className="text-xs text-foreground-400">Potential: {item.commercial_potential}/100</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {(item.derived_assets || []).slice(0, 4).map((a, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary-700">{a}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(item.target_channels || []).map((ch, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{ch}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-foreground-400">
                <i className="ri-book-2-line text-4xl mb-2 block"></i>
                <p className="text-sm">Données LIVE non disponibles — voir le <a href="/kos-knowledge-monetization-engine" className="text-primary-600 underline">Knowledge Monetization Engine</a></p>
              </div>
            )}
          </div>
        )}

        {/* ======== 3 HUBS ======== */}
        {activeTab === 'hubs' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  title: 'Hub 1 — KOS Knowledge Monetization Engine™',
                  url: '/kos-knowledge-monetization-engine',
                  icon: 'ri-book-2-line',
                  color: 'primary',
                  status: dataSource === 'live' ? 'LIVE' : 'MOCK',
                  tables: ['knowledge_monetization'],
                  kpis: [
                    { label: '12 Produits Knowledge', value: '12' },
                    { label: 'Valeur catalogue', value: '1.54 Md FCFA' },
                    { label: 'Clients actifs', value: '697' },
                    { label: 'Score ISO', value: '94/100' },
                  ],
                  desc: 'Industrialisation et vente des connaissances KHEPRA. Baromètres, Études, Formations, Templates, Frameworks. Pipeline commercial. Qualité ISO 30401.',
                },
                {
                  title: 'Hub 2 — KOS Closing & Growth Engine™',
                  url: '/kos-closing-growth-engine',
                  icon: 'ri-fire-line',
                  color: 'accent',
                  status: dataSource === 'live' ? 'LIVE' : 'MOCK',
                  tables: ['pipeline_deals', 'revenue_data'],
                  kpis: [
                    { label: 'Deals actifs', value: String(activeDeals.length || 6) },
                    { label: 'Pipeline total', value: formatFCFA(kpis.pipelineActiveValue || 32250000) },
                    { label: 'Pipeline pondéré', value: formatFCFA(kpis.weightedPipeline || 14660000) },
                    { label: 'Win Rate', value: `${kpis.winRate || 45}%` },
                  ],
                  desc: '3 moteurs interconnectés : Lead Magnet Engine (8 aimants), AI Closing Trigger (3 niveaux), Auto-Evolution Engine (8 sources). Réaltime sur pipeline_deals.',
                },
                {
                  title: 'Hub 3 — KOS Business Opportunity Intelligence™',
                  url: '/kos-business-opportunity-intelligence',
                  icon: 'ri-radar-line',
                  color: 'secondary',
                  status: 'Active',
                  tables: ['kos_resource_engines', 'kos_unified_agents'],
                  kpis: [
                    { label: '10 agents actifs', value: '75' },
                    { label: 'AO/mois', value: '347' },
                    { label: 'Leads/mois', value: '586' },
                    { label: 'CA généré/mois', value: '850M' },
                  ],
                  desc: '10 agents autonomes de Business Opportunity Intelligence : AO/AMI, Partenariats, Recrutement, Marketing Digital, GEO/IA, Social, Institutional Watch, Investors, ONU, International BD.',
                },
              ].map(hub => (
                <div key={hub.url} className="bg-white rounded-xl border border-background-200/70 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-${hub.color}-100 text-${hub.color}-600`}>
                        <i className={`${hub.icon} text-xl`}></i>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground-950">{hub.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${hub.status === 'LIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            <i className={`ri-${hub.status === 'LIVE' ? 'wifi' : hub.status === 'Active' ? 'check' : 'database'}-line mr-1`}></i>{hub.status}
                          </span>
                          {hub.tables.map(t => (
                            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-600 font-mono">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <a href={hub.url} className={`px-4 py-2 rounded-lg bg-${hub.color}-500 text-white text-xs font-semibold cursor-pointer hover:opacity-90 transition-opacity`}>
                      Ouvrir le Hub
                    </a>
                  </div>
                  <p className="text-sm text-foreground-600 mb-4">{hub.desc}</p>
                  <div className="grid grid-cols-4 gap-3">
                    {hub.kpis.map(kpi => (
                      <div key={kpi.label} className={`bg-${hub.color}-50 rounded-lg p-3 text-center border border-${hub.color}-100`}>
                        <div className={`text-lg font-bold text-${hub.color}-700`}>{kpi.value}</div>
                        <div className="text-xs text-foreground-500">{kpi.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </hubLayout>
  );
}



