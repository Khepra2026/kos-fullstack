import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import {
  SEO_GEO_STATS, SEO_PROGRAMMATIC_TEMPLATES, SEO_KEYWORDS_CLUSTERS,
  SEO_GEO_AEO_METRICS, SEO_ROADMAP_PHASES, SEO_BACKLINKS_OPPORTUNITIES,
  SEO_KPI_TARGETS,
} from '@/mocks/kosSeoGeoEeat';

type Tab = 'cockpit' | 'templates' | 'keywords' | 'geo_aeo' | 'roadmap' | 'backlinks';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'cockpit', label: 'Cockpit GSC', icon: 'ri-google-line' },
  { id: 'templates', label: 'Templates ISR', icon: 'ri-pages-line' },
  { id: 'keywords', label: 'Clusters KW', icon: 'ri-search-line' },
  { id: 'geo_aeo', label: 'GEO / AEO', icon: 'ri-brain-line' },
  { id: 'roadmap', label: 'Roadmap J+60', icon: 'ri-road-map-line' },
  { id: 'backlinks', label: 'Backlinks', icon: 'ri-link-m' },
];

function ProgressBar({ value, max, color = 'bg-primary-500' }: { value: number; max: number; color?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full bg-background-200 rounded-full h-1.5 overflow-hidden">
      <div className={`h-1.5 rounded-full transition-all ${color}`} style={{ width: `${pct}%` }}></div>
    </div>
  );
}

export default function KosSeoGeoEeatPage() {
  const [activeTab, setActiveTab] = useState<Tab>('cockpit');

  return (
    <KOSHubLayout hubId={123}>
      <div>
        {/* Hero */}
        <div className="bg-background-100 border-b border-background-200/70 px-4 md:px-6 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-secondary-100 flex-shrink-0">
                <i className="ri-search-eye-line text-2xl text-secondary-600"></i>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary-100 text-secondary-700 font-body">P3 — SEO GEO EEAT</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 font-body">Gap P11 — EN COURS</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 font-body">Cible J+60</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading">
                  KOS SEO GEO EEAT™ — 100 000 Pages Indexables
                </h1>
                <p className="text-sm text-foreground-600 font-body mt-1 max-w-2xl">
                  Passer DA {SEO_GEO_STATS.da_current}→{SEO_GEO_STATS.da_target}. 
                  {SEO_GEO_STATS.pages_indexees_gsc.toLocaleString()} pages → 
                  {(SEO_GEO_STATS.pages_indexables_target/1000).toFixed(0)}K pages indexées GSC en J+60. 
                  Templates ISR 24h, FAQ Schema, GEO moteurs IA. Éligibilité SGE Google.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-4 pt-4 border-t border-background-200/70">
              {[
                { v: SEO_GEO_STATS.pages_indexees_gsc.toLocaleString(), l: 'Pages GSC' },
                { v: `${SEO_GEO_STATS.da_current}`, l: 'DA Actuel' },
                { v: SEO_GEO_STATS.traffic_organic_monthly.toLocaleString(), l: 'Trafic/mois' },
                { v: SEO_GEO_STATS.keywords_top10.toLocaleString(), l: 'KW Top 10' },
                { v: SEO_GEO_STATS.featured_snippets, l: 'Featured Snippets' },
                { v: SEO_GEO_STATS.backlinks_active, l: 'Backlinks Actifs' },
              ].map(s => (
                <div key={s.l} className="text-center">
                  <div className="text-lg font-bold text-foreground-950 font-heading">{s.v}</div>
                  <div className="text-[10px] text-foreground-500 font-body">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-background-200/70 bg-background-50 px-4 md:px-6">
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <div className="flex gap-1 py-2 min-w-max">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-secondary-100 text-secondary-700 font-semibold'
                      : 'text-foreground-500 hover:text-foreground-700 hover:bg-background-200'
                  }`}
                >
                  <i className={`${tab.icon} text-sm`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">

          {activeTab === 'cockpit' && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(SEO_KPI_TARGETS).map(([key, kpi]) => {
                  const progress = Math.min(100, Math.round((kpi.current / kpi.target) * 100));
                  return (
                    <div key={key} className="bg-background-50 rounded-lg border border-background-200/70 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-foreground-700 font-heading capitalize">{key.replace(/_/g, ' ')}</span>
                        <span className="text-xs text-foreground-400 font-body">{progress}%</span>
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-xl font-bold text-foreground-950 font-heading">{kpi.current.toLocaleString()}</span>
                        <span className="text-xs text-foreground-400 font-body">→ {kpi.target.toLocaleString()} {kpi.unit}</span>
                      </div>
                      <ProgressBar value={kpi.current} max={kpi.target} color={progress >= 80 ? 'bg-emerald-500' : progress >= 40 ? 'bg-amber-500' : 'bg-red-400'} />
                    </div>
                  );
                })}
              </div>

              {/* GSC Quick Stats */}
              <div className="bg-background-100 rounded-xl p-5 border border-background-200/70">
                <h3 className="text-sm font-bold text-foreground-800 mb-4 font-heading">
                  GSC Données Réelles — 7 Derniers Jours
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Impressions', value: SEO_GEO_STATS.gsc_impressions_7d.toLocaleString() },
                    { label: 'Clics', value: SEO_GEO_STATS.gsc_clicks_7d.toLocaleString() },
                    { label: 'CTR Moyen', value: `${SEO_GEO_STATS.gsc_ctr_avg}%` },
                    { label: 'Position Moy.', value: SEO_GEO_STATS.gsc_position_avg.toString() },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <div className="text-2xl font-bold text-foreground-950 font-heading">{s.value}</div>
                      <div className="text-xs text-foreground-500 font-body">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-4">
              <p className="text-xs text-foreground-500 font-body">
                {SEO_PROGRAMMATIC_TEMPLATES.reduce((s, t) => s + t.pages_potentielles, 0).toLocaleString()} pages potentielles — 
                {SEO_PROGRAMMATIC_TEMPLATES.reduce((s, t) => s + t.pages_deployees, 0)} déployées — 
                Revalidation ISR chaque {SEO_PROGRAMMATIC_TEMPLATES[0].revalidate_hours}h
              </p>
              {SEO_PROGRAMMATIC_TEMPLATES.map(tpl => (
                <div key={tpl.id} className="bg-background-50 rounded-lg border border-background-200/70 p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <code className="text-sm font-semibold text-foreground-800 font-body">{tpl.slug_pattern}</code>
                      <p className="text-xs text-foreground-500 font-body mt-0.5">{tpl.description}</p>
                    </div>
                    <span className="flex-shrink-0 text-xs font-semibold text-primary-700 font-body bg-primary-50 px-2 py-1 rounded">
                      {tpl.pages_potentielles.toLocaleString()} pages
                    </span>
                  </div>
                  <code className="text-xs text-foreground-400 font-body block mb-3">Ex: {tpl.exemple}</code>
                  <div className="flex items-center gap-2 flex-wrap">
                    {tpl.schema_types.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-md text-[10px] bg-emerald-50 text-emerald-700 font-body">{s}</span>
                    ))}
                    <span className="px-2 py-0.5 rounded-md text-[10px] bg-background-200 text-foreground-500 font-body">
                      ISR {tpl.revalidate_hours}h
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] bg-amber-50 text-amber-700 font-body">
                      {tpl.pages_deployees} déployées
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'keywords' && (
            <div className="space-y-4">
              {SEO_KEYWORDS_CLUSTERS.map(cluster => (
                <div key={cluster.cluster} className="bg-background-50 rounded-lg border border-background-200/70 p-5">
                  <div className="flex items-start justify-between mb-3 gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-foreground-800 font-heading">{cluster.cluster}</h3>
                      <p className="text-xs text-foreground-400 font-body mt-0.5 italic">{cluster.exemples.slice(0, 2).join(' · ')}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-sm font-bold text-foreground-950 font-heading">{cluster.keywords.toLocaleString()} KW</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-body ${cluster.competition === 'faible' ? 'bg-emerald-100 text-emerald-700' : cluster.competition === 'moyenne' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                        Concurrence {cluster.competition}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {[
                      { label: 'Top 10', value: cluster.keywords_top10 },
                      { label: 'Trafic/mois', value: cluster.traffic_monthly.toLocaleString() },
                      { label: 'Score Opp.', value: `${cluster.opportunity_score}/10` },
                    ].map(s => (
                      <div key={s.label} className="text-center bg-background-100 rounded-lg p-2">
                        <div className="text-base font-bold text-foreground-950 font-heading">{s.value}</div>
                        <div className="text-[10px] text-foreground-500 font-body">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <ProgressBar value={cluster.opportunity_score} max={10} color="bg-accent-500" />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'geo_aeo' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'ChatGPT', value: SEO_GEO_AEO_METRICS.chatgpt_visibility, icon: 'ri-openai-line' },
                  { label: 'Perplexity', value: SEO_GEO_AEO_METRICS.perplexity_visibility, icon: 'ri-search-2-line' },
                  { label: 'Google AI Overviews', value: SEO_GEO_AEO_METRICS.google_ai_overviews, icon: 'ri-google-line' },
                  { label: 'Claude', value: SEO_GEO_AEO_METRICS.claude_visibility, icon: 'ri-robot-2-line' },
                  { label: 'Gemini', value: SEO_GEO_AEO_METRICS.gemini_visibility, icon: 'ri-sparkling-2-line' },
                  { label: 'Copilot', value: SEO_GEO_AEO_METRICS.copilot_visibility, icon: 'ri-microsoft-line' },
                ].map(m => (
                  <div key={m.label} className="bg-background-50 rounded-lg border border-background-200/70 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <i className={`${m.icon} text-base text-foreground-500`}></i>
                      <span className="text-xs font-semibold text-foreground-700 font-heading">{m.label}</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground-950 font-heading mb-1">{m.value}<span className="text-sm font-normal text-foreground-400">/100</span></div>
                    <ProgressBar value={m.value} max={100} color={m.value >= 80 ? 'bg-emerald-500' : m.value >= 60 ? 'bg-amber-500' : 'bg-red-400'} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'llms.txt Déployé', value: SEO_GEO_AEO_METRICS.llms_txt_deployed ? '✓ Oui' : 'Non', color: 'text-emerald-600' },
                  { label: 'Speakable Schema', value: `${SEO_GEO_AEO_METRICS.speakable_schema_pages} pages`, color: 'text-foreground-950' },
                  { label: 'FAQ Schema', value: `${SEO_GEO_AEO_METRICS.faq_schema_pages} pages`, color: 'text-foreground-950' },
                ].map(s => (
                  <div key={s.label} className="bg-background-100 rounded-lg p-4 text-center">
                    <div className={`text-xl font-bold font-heading ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-foreground-500 font-body">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="space-y-5">
              {SEO_ROADMAP_PHASES.map((phase, pi) => (
                <div key={pi} className={`rounded-xl border p-5 ${phase.done ? 'bg-emerald-50 border-emerald-200' : 'bg-background-50 border-background-200/70'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold font-body ${phase.done ? 'bg-emerald-500 text-white' : 'bg-background-200 text-foreground-500'}`}>
                      {phase.done ? <i className="ri-check-line text-xs"></i> : pi + 1}
                    </div>
                    <h3 className="text-sm font-bold text-foreground-800 font-heading">{phase.phase}</h3>
                  </div>
                  <div className="space-y-2">
                    {phase.actions.map((action, ai) => (
                      <div key={ai} className={`flex items-start gap-3 text-xs font-body p-2 rounded-lg ${action.status === 'done' ? 'bg-emerald-100/50' : action.status === 'in_progress' ? 'bg-amber-50' : 'bg-background-100'}`}>
                        <i className={`flex-shrink-0 mt-0.5 ${action.status === 'done' ? 'ri-checkbox-circle-line text-emerald-600' : action.status === 'in_progress' ? 'ri-loader-4-line text-amber-500' : 'ri-time-line text-foreground-400'}`}></i>
                        <div>
                          <span className="font-semibold text-foreground-800">{action.action}</span>
                          <span className="mx-2 text-foreground-300">—</span>
                          <span className="text-foreground-500">{action.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'backlinks' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-body">
                <thead>
                  <tr className="border-b border-background-200/70">
                    {['Source', 'DR', 'Type', 'Trafic Estimé', 'Statut'].map(h => (
                      <th key={h} className="text-left py-2 pr-4 text-foreground-500 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SEO_BACKLINKS_OPPORTUNITIES.map(b => (
                    <tr key={b.source} className="border-b border-background-100 hover:bg-background-50">
                      <td className="py-3 pr-4 font-semibold text-foreground-800">{b.source}</td>
                      <td className="pr-4">
                        <span className={`font-bold ${b.dr >= 80 ? 'text-emerald-600' : b.dr >= 60 ? 'text-amber-600' : 'text-foreground-500'}`}>{b.dr}</span>
                      </td>
                      <td className="pr-4 text-foreground-500">{b.type}</td>
                      <td className="pr-4 text-foreground-700">{b.estimated_traffic.toLocaleString()} vis/mois</td>
                      <td>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${b.status === 'done' ? 'bg-emerald-100 text-emerald-700' : b.status === 'in_progress' ? 'bg-amber-100 text-amber-700' : 'bg-background-200 text-foreground-500'}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </KOSHubLayout>
  );
}