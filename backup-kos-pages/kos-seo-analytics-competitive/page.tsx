import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  SEO_OVERVIEW,
  RANKING_KEYWORDS,
  SEO_COMPETITORS,
  GAP_ANALYSIS,
  TRAFFIC_SOURCES,
  TRAFFIC_LANDING_PAGES,
  SEO_OPPORTUNITIES,
  REVENUE_FORECAST,
} from '@/mocks/seoAnalyticsCompetitive';
import type { SEORankingKeyword, SEOCompetitor, SEOTrafficSource, SEOTrafficLandingPage, SEOOpportunity, SEORevenueForecast } from '@/mocks/seoAnalyticsCompetitive';

type TabId = 'overview' | 'rankings' | 'competitors' | 'traffic' | 'opportunities' | 'roi';

function scoreColor(score: number): string {
  if (score >= 85) return 'text-emerald-600';
  if (score >= 70) return 'text-amber-600';
  if (score >= 50) return 'text-orange-600';
  return 'text-red-600';
}

function priorityBadge(p: string) {
  if (p === 'critique') return 'bg-red-50 border-red-200 text-red-700';
  if (p === 'haute') return 'bg-amber-50 border-amber-200 text-amber-700';
  if (p === 'moyenne') return 'bg-background-100 border-background-200 text-foreground-500';
  return 'bg-background-50 border-background-200 text-foreground-400';
}

function trendIcon(trend: string): string {
  if (trend === 'up') return 'ri-arrow-up-line text-emerald-500';
  if (trend === 'down') return 'ri-arrow-down-line text-red-500';
  return 'ri-subtract-line text-foreground-400';
}

function formatFCFA(val: number): string {
  if (val >= 1000000000) return (val / 1000000000).toFixed(1) + ' Md';
  if (val >= 1000000) return (val / 1000000).toFixed(1) + ' M';
  if (val >= 1000) return (val / 1000).toFixed(0) + ' K';
  return String(val);
}

function formatNumber(val: number): string {
  if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
  if (val >= 1000) return (val / 1000).toFixed(1) + 'K';
  return String(val);
}

const COMPETITOR_COLORS: Record<string, string> = {
  'khepraexperts.com': '#86BC25',
  'deloitte.com/fr-fr': '#4A7A1E',
  'pwc.fr': '#D97757',
  'ey.com': '#CA8A04',
  'kpmg.com': '#2C7BE5',
  'fadoul-afrique.com': '#9B7B2C',
  'audit-afrique.fr': '#A0A0A0',
  'regtech-sa.fr': '#C05A3A',
};

export default function seoAnalyticsCompetitivePage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('deloitte.com/fr-fr');
  const [sortKw, setSortKw] = useState<'position' | 'volume' | 'trend'>('position');
  const [opportunityFilter, setOpportunityFilter] = useState<'all' | 'critique' | 'haute' | 'moyenne'>('all');

  const overview = SEO_OVERVIEW;
  const khepra = SEO_COMPETITORS.find(c => c.domain === 'khepraexperts.com')!;

  const sortedKeywords = useMemo(() => {
    return [...RANKING_KEYWORDS].sort((a, b) => {
      if (sortKw === 'position') return a.position - b.position;
      if (sortKw === 'volume') return b.search_volume - a.search_volume;
      return 0;
    });
  }, [sortKw]);

  const selectedComp = useMemo(() => {
    return SEO_COMPETITORS.find(c => c.domain === selectedCompetitor) || SEO_COMPETITORS.find(c => c.domain === 'deloitte.com/fr-fr')!;
  }, [selectedCompetitor]);

  const filteredOpportunities = useMemo(() => {
    if (opportunityFilter === 'all') return SEO_OPPORTUNITIES;
    return SEO_OPPORTUNITIES.filter(o => o.priority === opportunityFilter);
  }, [opportunityFilter]);

  const totalRevenueYTD = REVENUE_FORECAST.filter(r => r.revenue_fcfa > 0).reduce((s, r) => s + r.revenue_fcfa, 0);
  const totalRevenueForecast = REVENUE_FORECAST.reduce((s, r) => s + r.revenue_forecast_fcfa, 0);
  const avgTrafficChange = overview.organic_traffic_30d > 0 && overview.organic_traffic_prev_30d > 0
    ? (((overview.organic_traffic_30d - overview.organic_traffic_prev_30d) / overview.organic_traffic_prev_30d) * 100).toFixed(1)
    : '0';

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', count: `${overview.share_of_voice}% SoV` },
    { id: 'rankings', label: 'Classements', icon: 'ri-bar-chart-2-line', count: String(RANKING_KEYWORDS.length) },
    { id: 'competitors', label: 'Analyse Concurrentielle', icon: 'ri-sword-line', count: String(overview.competitors_tracked) },
    { id: 'traffic', label: 'Trafic Organique', icon: 'ri-line-chart-line', count: formatNumber(overview.organic_traffic_30d) },
    { id: 'opportunities', label: 'Opportunités SEO', icon: 'ri-lightbulb-flash-line', count: String(SEO_OPPORTUNITIES.filter(o => o.priority === 'critique').length) },
    { id: 'roi', label: 'ROI & Forecast', icon: 'ri-funds-line', count: `${overview.seo_roi_pct}%` },
  ];

  return (
    <hubLayout hubId={70}>
      <SeoHead
        title="KOS SEO Analytics & Competitive Intelligence — Rankings, Trafic, Opportunités | KHEPRA EXPERTS"
        description="SEO Analytics & Competitive Intelligence : 2 450 mots-clés trackés, 8 concurrents analysés, 42 opportunités SEO identifiées, 12 580 sessions/mois. KHEPRA EXPERTS."
        keywords="SEO analytics, competitive intelligence, keyword rankings, SEO performance, trafic organique, SEO ROI, KHEPRA EXPERTS"
        canonicalPath="/kos-seo-analytics-competitive"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/30 via-transparent to-amber-100/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-bold mb-4">
                <i className="ri-line-chart-line" />
                SEO ANALYTICS — {formatNumber(overview.total_organic_keywords)} Mots-Clés · {overview.competitors_tracked} Concurrents · {overview.opportunities_identified} Opportunités
              </div>
              <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground-950 tracking-tight">
                SEO Analytics & Competitive Intelligence — Mesurer, Analyser, Dominer
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                <strong className="text-foreground-950">2 450 mots-clés trackés</strong> · <strong className="text-emerald-600">{overview.keywords_top3} en top 3</strong> ·{' '}
                <strong className="text-emerald-600">Share of Voice {(overview.share_of_voice)}%</strong> ({(overview.share_of_voice - overview.share_of_voice_prev > 0 ? '+' : '')}{(overview.share_of_voice - overview.share_of_voice_prev).toFixed(1)} pts).{' '}
                Trafic : <strong className="text-emerald-600 font-bold">{formatNumber(overview.organic_traffic_30d)} sessions/mois</strong> (+{avgTrafficChange}%).{' '}
                <strong>ROI SEO : {overview.seo_roi_pct}%</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-bold">
                  <i className="ri-funds-line" />{formatFCFA(overview.seo_revenue_30d_fcfa)} FCFA/mois
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-bold">
                  <i className="ri-search-line" />DA {overview.domain_authority} → {overview.domain_authority_target}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold">
                  <i className="ri-star-line" />{overview.featured_snippets} Featured Snippets
                </span>
              </div>
            </div>
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
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                }`}
              >
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
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {[
                { label: 'Mots-Clés Top 3', value: String(overview.keywords_top3), sub: `sur ${formatNumber(overview.total_organic_keywords)}`, icon: 'ri-trophy-line', color: '#86BC25' },
                { label: 'Trafic 30j', value: formatNumber(overview.organic_traffic_30d), sub: `+${avgTrafficChange}%`, icon: 'ri-line-chart-line', color: '#4A7A1E' },
                { label: 'Share of Voice', value: `${overview.share_of_voice}%`, sub: `${(overview.share_of_voice - overview.share_of_voice_prev > 0 ? '+' : '') + (overview.share_of_voice - overview.share_of_voice_prev).toFixed(1)} pts`, icon: 'ri-pie-chart-line', color: '#D97757' },
                { label: 'Domain Authority', value: String(overview.domain_authority), sub: `Cible ${overview.domain_authority_target}`, icon: 'ri-shield-line', color: '#CA8A04' },
                { label: 'Featured Snippets', value: String(overview.featured_snippets), sub: `+${overview.people_also_ask} PAA`, icon: 'ri-star-line', color: '#9B7B2C' },
                { label: 'ROI SEO', value: `${overview.seo_roi_pct}%`, sub: formatFCFA(overview.seo_revenue_30d_fcfa) + ' FCFA/mois', icon: 'ri-funds-line', color: '#C05A3A' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                    <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
                  </div>
                  <span className="block text-lg font-bold text-foreground-950">{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                  <span className="block text-[9px] text-foreground-400 mt-0.5">{s.sub}</span>
                </div>
              ))}
            </div>

            {/* Performance Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Keyword Distribution */}
              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-5 flex items-center gap-2">
                  <i className="ri-bar-chart-2-line text-amber-500" />Distribution des Mots-Clés
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Top 3', value: overview.keywords_top3, pct: (overview.keywords_top3 / overview.total_organic_keywords * 100).toFixed(1), color: '#86BC25' },
                    { label: 'Top 10', value: overview.keywords_top10 - overview.keywords_top3, pct: ((overview.keywords_top10 - overview.keywords_top3) / overview.total_organic_keywords * 100).toFixed(1), color: '#4A7A1E' },
                    { label: 'Top 30', value: overview.keywords_top30 - overview.keywords_top10, pct: ((overview.keywords_top30 - overview.keywords_top10) / overview.total_organic_keywords * 100).toFixed(1), color: '#CA8A04' },
                    { label: '31-100', value: overview.total_organic_keywords - overview.keywords_top30, pct: ((overview.total_organic_keywords - overview.keywords_top30) / overview.total_organic_keywords * 100).toFixed(1), color: '#D97757' },
                  ].map((p) => (
                    <div key={p.label}>
                      <div className="flex items-center justify-between mb-1 text-xs">
                        <span className="text-foreground-600">{p.label}</span>
                        <span className="font-bold" style={{ color: p.color }}>{p.value} ({p.pct}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-background-100 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${p.pct}%`, backgroundColor: p.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trend Summary */}
              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-5 flex items-center gap-2">
                  <i className="ri-arrow-up-down-line text-emerald-500" />Tendances & Évolution
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Position Moyenne', value: overview.avg_position.toFixed(1), prev: overview.avg_position_prev.toFixed(1), better: 'down' },
                    { label: 'Trafic 30j', value: formatNumber(overview.organic_traffic_30d), prev: formatNumber(overview.organic_traffic_prev_30d), better: 'up' },
                    { label: 'Share of Voice', value: overview.share_of_voice + '%', prev: overview.share_of_voice_prev + '%', better: 'up' },
                    { label: 'Featured Snippets', value: String(overview.featured_snippets), prev: '—', better: 'up' },
                  ].map((t, i) => (
                    <div key={i} className="rounded-xl bg-background-100 p-4 text-center">
                      <span className="text-[10px] text-foreground-400 block mb-1">{t.label}</span>
                      <span className="text-xl font-bold text-foreground-950 block">{t.value}</span>
                      {t.prev !== '—' && (
                        <span className={`text-[10px] font-semibold ${t.better === 'up' && parseFloat(t.value) > parseFloat(t.prev) ? 'text-emerald-600' : t.better === 'down' && parseFloat(t.value) < parseFloat(t.prev) ? 'text-emerald-600' : 'text-red-500'}`}>
                          Précédent : {t.prev}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Health Section */}
            <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-5">Santé SEO — {overview.indexed_pages} Pages Indexées</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Pages Indexées', value: `${overview.indexed_pages}/${overview.indexed_pages_target}`, icon: 'ri-file-list-3-line', color: '#4A7A1E' },
                  { label: 'Crawl Budget', value: `${overview.crawl_budget_used_pct}%`, icon: 'ri-search-eye-line', color: '#CA8A04' },
                  { label: 'CWV Pass Rate', value: `${overview.core_web_vitals_pass_rate}%`, icon: 'ri-speed-line', color: '#86BC25' },
                  { label: 'Mobile Score', value: `${overview.mobile_usability_score}/100`, icon: 'ri-smartphone-line', color: '#D97757' },
                ].map((h, i) => (
                  <div key={i} className="rounded-xl bg-background-100 p-4 text-center">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${h.color}15` }}>
                      <i className={`${h.icon} text-lg`} style={{ color: h.color }} />
                    </div>
                    <span className="block text-lg font-bold text-foreground-950">{h.value}</span>
                    <span className="text-[10px] text-foreground-400">{h.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: RANKINGS === */}
      {activeTab === 'rankings' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Classements — {RANKING_KEYWORDS.length} Mots-Clés Trackés</h2>
                <p className="text-foreground-600 text-sm">{RANKING_KEYWORDS.filter(k => k.position <= 3).length} en top 3 · {RANKING_KEYWORDS.filter(k => k.position <= 10).length} en top 10 · Featured Snippets : {RANKING_KEYWORDS.filter(k => k.serp_features.includes('featured_snippet')).length}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Trier :</span>
                {[
                  { key: 'position', label: 'Position' },
                  { key: 'volume', label: 'Volume' },
                ].map((o) => (
                  <button key={o.key} onClick={() => setSortKw(o.key as typeof sortKw)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${sortKw === o.key ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rankings Table */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Mot-Clé</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">URL</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Pos.</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Volume</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Diff.</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">CTR</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Tendance</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">SERP Features</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Trafic Est.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedKeywords.map((kw) => (
                      <tr key={kw.keyword} className="border-t border-background-100 hover:bg-background-50/70">
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold text-foreground-950">{kw.keyword}</span>
                          <span className="block text-[9px] text-foreground-400">{kw.intent}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] text-foreground-500 font-mono truncate block max-w-[180px]">{kw.landing_page}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold ${kw.position <= 3 ? 'text-emerald-600' : kw.position <= 10 ? 'text-amber-600' : 'text-red-500'}`}>
                            #{kw.position} {kw.position < kw.previous_position && <i className="ri-arrow-up-s-line text-emerald-500 text-sm" />}
                            {kw.position > kw.previous_position && <i className="ri-arrow-down-s-line text-red-500 text-sm" />}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-foreground-700">{kw.search_volume}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-8 h-1.5 rounded-full bg-background-200 overflow-hidden">
                              <div className="h-full rounded-full bg-amber-500" style={{ width: `${kw.difficulty}%` }} />
                            </div>
                            <span className="text-[10px] text-foreground-400">{kw.difficulty}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-foreground-700">{kw.ctr_estimate}%</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <i className={trendIcon(kw.trend_3m)} />
                            <span className="text-[10px] text-foreground-500">{kw.trend_3m === 'up' ? '▲' : kw.trend_3m === 'down' ? '▼' : '—'}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {kw.serp_features.includes('featured_snippet') && <span className="text-[10px] px-1 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700" title="Featured Snippet">★</span>}
                            {kw.serp_features.includes('people_also_ask') && <span className="text-[10px] px-1 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700" title="PAA">?</span>}
                            {kw.serp_features.includes('knowledge_panel') && <span className="text-[10px] px-1 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700" title="Knowledge Panel">☰</span>}
                            {kw.serp_features.length === 0 && <span className="text-[10px] text-foreground-300">—</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] font-semibold text-foreground-700">{kw.traffic_estimate}/mois</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: COMPETITORS === */}
      {activeTab === 'competitors' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Analyse Concurrentielle — {overview.competitors_tracked} Concurrents</h2>
              <p className="text-foreground-600 text-sm">Share of Voice KHEPRA : {overview.share_of_voice}% · Deloitte : 24.5% · EY : 28.2% · PwC : 19.8% · KPMG : 21.5%</p>
            </div>

            {/* Competitor Selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              {SEO_COMPETITORS.filter(c => c.domain !== 'khepraexperts.com').map((comp) => (
                <button
                  key={comp.domain}
                  onClick={() => setSelectedCompetitor(comp.domain)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-all ${
                    selectedCompetitor === comp.domain ? 'bg-foreground-950 text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:bg-background-100'
                  }`}
                >
                  <i className="ri-building-line text-sm" />
                  {comp.name}
                </button>
              ))}
            </div>

            {/* Head-to-Head KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {[
                { label: 'DA', k: String(khepra.domain_authority), c: String(selectedComp.domain_authority), unit: '/100' },
                { label: 'Mots-Clés Top 10', k: formatNumber(khepra.keywords_in_top10), c: formatNumber(selectedComp.keywords_in_top10), unit: '' },
                { label: 'Trafic /mois', k: formatNumber(khepra.traffic_estimate), c: formatNumber(selectedComp.traffic_estimate), unit: '' },
                { label: 'Backlinks', k: formatNumber(khepra.backlinks), c: formatNumber(selectedComp.backlinks), unit: '' },
                { label: 'Domaines Réf.', k: String(khepra.referring_domains), c: String(selectedComp.referring_domains), unit: '' },
                { label: 'Pages Indexées', k: formatNumber(khepra.content_pages_indexed), c: formatNumber(selectedComp.content_pages_indexed), unit: '' },
              ].map((m, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                  <span className="text-[10px] text-foreground-400 block mb-1">{m.label}</span>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="font-bold text-emerald-600">{m.k}{m.unit}</span>
                    <span className="text-foreground-300 text-xs">vs</span>
                    <span className="font-bold text-foreground-950">{m.c}{m.unit}</span>
                  </div>
                  <span className="text-[9px] text-foreground-400 block mt-1">
                    KHEPRA vs {selectedComp.name.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>

            {/* Gap Analysis */}
            <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6 mb-8">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-5 flex items-center gap-2">
                <i className="ri-scales-line text-amber-500" />Gap Analysis — KHEPRA vs Big Four
              </h3>
              <div className="space-y-4">
                {GAP_ANALYSIS.map((g) => {
                  const maxVal = Math.max(g.khepra, g.deloitte, g.pwc, g.ey, g.kpmg, g.target);
                  return (
                    <div key={g.metric}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-foreground-600">{g.metric}</span>
                        <span className="text-xs font-bold text-foreground-950">
                          KHEPRA <span className="text-emerald-600">{g.khepra}{g.unit}</span> → Cible <span className="text-amber-600">{g.target}{g.unit}</span>
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-background-100 overflow-hidden relative">
                        <div className="h-full rounded-full bg-emerald-500/80" style={{ width: `${(g.khepra / maxVal) * 100}%` }} />
                        <div className="absolute inset-y-0" style={{ left: `${(g.target / maxVal) * 100}%` }}>
                          <div className="w-0.5 h-4 bg-amber-500 absolute -top-0.5" />
                        </div>
                      </div>
                      <div className="flex justify-between text-[9px] text-foreground-400 mt-1">
                        <span>K: {g.khepra}{g.unit}</span>
                        <span>D: {g.deloitte}{g.unit} · P: {g.pwc}{g.unit} · E: {g.ey}{g.unit} · KPMG: {g.kpmg}{g.unit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Competitor Detail */}
            <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">{selectedComp.name} — Analyse Détaillée</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Forces</h4>
                  {selectedComp.strengths.map((s, i) => (
                    <p key={i} className="text-xs text-foreground-700 mb-1 flex items-start gap-1">
                      <i className="ri-check-line text-emerald-500 mt-0.5" />{s}
                    </p>
                  ))}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">Faiblesses</h4>
                  {selectedComp.weaknesses.map((w, i) => (
                    <p key={i} className="text-xs text-foreground-700 mb-1 flex items-start gap-1">
                      <i className="ri-close-line text-red-500 mt-0.5" />{w}
                    </p>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Top Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedComp.top_keywords.map((k, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-background-100 border border-background-200 text-xs text-foreground-600">{k}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: TRAFFIC === */}
      {activeTab === 'traffic' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Trafic Organique — {formatNumber(overview.organic_traffic_30d)} Sessions (30j)</h2>
              <p className="text-foreground-600 text-sm">{TRAFFIC_SOURCES.length} sources analysées · TCAC : +{(((overview.organic_traffic_30d / 8500) - 1) * 100).toFixed(1)}%</p>
            </div>

            {/* Source Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 rounded-3xl bg-background-50 border border-background-200/70 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Répartition par Source</h3>
                <div className="space-y-3">
                  {TRAFFIC_SOURCES.map((src) => (
                    <div key={src.source}>
                      <div className="flex items-center justify-between mb-1 text-xs">
                        <span className="text-foreground-600 font-medium">{src.source}</span>
                        <span className="font-bold text-foreground-950 whitespace-nowrap">{formatNumber(src.sessions)} ({src.pct_of_total}%)</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-background-100 overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-500/80" style={{ width: `${src.pct_of_total}%` }} />
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-[9px] text-foreground-400">
                        <span>Taux rebond {src.bounce_rate}%</span>
                        <span>{src.avg_session_duration_sec}s</span>
                        <span>{src.pages_per_session} p./session</span>
                        <span className={src.conversion_rate_pct >= 5 ? 'text-emerald-600 font-bold' : 'text-foreground-500'}>{src.conversion_rate_pct}% conv.</span>
                        <i className={trendIcon(src.trend)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Organic Summary */}
              <div className="rounded-3xl bg-foreground-950 p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <i className="ri-search-line text-emerald-400 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold">Recherche Organique</h3>
                    <p className="text-xs text-gray-400">62.4% du trafic total</p>
                  </div>
                </div>
                <div className="space-y-4 mt-4">
                  <div className="text-center">
                    <span className="block text-3xl font-bold font-heading text-emerald-400">{formatNumber(overview.organic_traffic_30d)}</span>
                    <span className="text-xs text-gray-400">sessions / 30 jours</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center"><span className="block text-sm font-bold">{overview.organic_ctr_avg}%</span><span className="text-[9px] text-gray-400">CTR moyen</span></div>
                    <div className="text-center"><span className="block text-sm font-bold">3.2</span><span className="text-[9px] text-gray-400">pages/session</span></div>
                    <div className="text-center"><span className="block text-sm font-bold">4.8%</span><span className="text-[9px] text-gray-400">conversion</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Landing Pages */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden">
              <div className="p-5 border-b border-background-100">
                <h3 className="font-heading text-base font-bold text-foreground-950">Top Landing Pages Organiques</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Page</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Sessions</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">KW Rankés</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Pos. Moy.</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Rebond</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Conv.</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Tendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRAFFIC_LANDING_PAGES.map((lp) => (
                      <tr key={lp.page_url} className="border-t border-background-100 hover:bg-background-50/70">
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold text-foreground-950">{lp.page_url}</span>
                          <span className="block text-[9px] text-foreground-400 truncate max-w-[250px]">{lp.page_title}</span>
                        </td>
                        <td className="px-4 py-3 text-xs font-bold text-emerald-600">{lp.sessions}</td>
                        <td className="px-4 py-3 text-xs text-foreground-700">{lp.keywords_ranking}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold ${lp.avg_position <= 10 ? 'text-emerald-600' : lp.avg_position <= 20 ? 'text-amber-600' : 'text-red-500'}`}>{lp.avg_position}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs ${lp.bounce_rate <= 45 ? 'text-emerald-600' : lp.bounce_rate <= 55 ? 'text-amber-600' : 'text-red-500'}`}>{lp.bounce_rate}%</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold ${lp.conversion_rate_pct >= 8 ? 'text-emerald-600' : lp.conversion_rate_pct >= 3 ? 'text-amber-600' : 'text-foreground-500'}`}>{lp.conversion_rate_pct}%</span>
                        </td>
                        <td className="px-4 py-3"><i className={trendIcon(lp.traffic_trend)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: OPPORTUNITIES === */}
      {activeTab === 'opportunities' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Opportunités SEO — {SEO_OPPORTUNITIES.length} Identifiées</h2>
                <p className="text-foreground-600 text-sm">{SEO_OPPORTUNITIES.filter(o => o.priority === 'critique').length} critiques · {SEO_OPPORTUNITIES.filter(o => o.priority === 'haute').length} hautes · Potentiel trafic : {SEO_OPPORTUNITIES.reduce((s, o) => s + o.potential_traffic, 0)} sessions/mois</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Filtrer :</span>
                {[
                  { key: 'all', label: 'Toutes' },
                  { key: 'critique', label: 'Critiques' },
                  { key: 'haute', label: 'Hautes' },
                  { key: 'moyenne', label: 'Moyennes' },
                ].map((f) => (
                  <button key={f.key} onClick={() => setOpportunityFilter(f.key as typeof opportunityFilter)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${opportunityFilter === f.key ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredOpportunities.map((opp) => (
                <div key={opp.id} className={`rounded-2xl border p-5 ${opp.priority === 'critique' ? 'border-red-200 bg-red-50/30' : opp.priority === 'haute' ? 'border-amber-200 bg-amber-50/20' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex items-start gap-3 min-w-0 lg:w-72 flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: opp.priority === 'critique' ? '#FEE2E2' : opp.priority === 'haute' ? '#FEF3C7' : '#F3F4F6' }}>
                        <span className="text-lg font-bold font-heading" style={{ color: opp.priority === 'critique' ? '#DC2626' : opp.priority === 'haute' ? '#D97706' : '#6B7280' }}>{opp.impact_score}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-foreground-950">{opp.id}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${priorityBadge(opp.priority)}`}>{opp.priority.toUpperCase()}</span>
                        </div>
                        <h4 className="text-sm font-bold text-foreground-950 mt-1">{opp.keyword_cluster}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] text-foreground-500">
                          <span>Vol. {opp.search_volume}</span>
                          <span>·</span>
                          <span>Diff. {opp.difficulty}/100</span>
                          <span>·</span>
                          <span className="text-emerald-600 font-semibold">{opp.potential_traffic} sessions/mois potentielles</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground-700 mb-2"><strong>Action :</strong> {opp.action}</p>
                      <p className="text-xs text-foreground-500 mb-2"><i className="ri-lightbulb-line text-amber-500" /> {opp.content_recommendation}</p>
                      <div className="flex flex-wrap items-center gap-3 text-[10px] text-foreground-400">
                        <span><i className="ri-timer-line mr-1" />{opp.effort}</span>
                        <span>Concurrent : {opp.competitor_ranking || 'Aucun (niche non couverte)'}</span>
                        <span>Position actuelle : <strong className="text-red-500">#{opp.current_position}</strong> → <strong className="text-emerald-600">#{opp.target_position}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: ROI & FORECAST === */}
      {activeTab === 'roi' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">ROI SEO & Forecast — Projection 12 Mois</h2>
              <p className="text-foreground-600 text-sm">ROI actuel : {overview.seo_roi_pct}% · CA généré (YTD) : {formatFCFA(totalRevenueYTD)} FCFA · Forecast S2 : {formatFCFA(REVENUE_FORECAST.filter(r => r.revenue_fcfa === 0).reduce((s, r) => s + r.revenue_forecast_fcfa, 0))} FCFA</p>
            </div>

            {/* ROI KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {[
                { label: 'CA YTD (Réalisé)', value: formatFCFA(totalRevenueYTD), icon: 'ri-funds-line', color: '#86BC25' },
                { label: 'Forecast S2 2026', value: formatFCFA(REVENUE_FORECAST.filter(r => r.revenue_fcfa === 0).reduce((s, r) => s + r.revenue_forecast_fcfa, 0)), icon: 'ri-line-chart-line', color: '#4A7A1E' },
                { label: 'ROI SEO', value: `${overview.seo_roi_pct}%`, icon: 'ri-percent-line', color: '#D97757' },
                { label: 'Leads/mois (moy.)', value: String(Math.round((TRAFFIC_SOURCES.find(s => s.source === 'Recherche Organique')?.sessions ?? 0) * 0.048)), icon: 'ri-user-add-line', color: '#CA8A04' },
                { label: 'CA/Lead (moy.)', value: formatFCFA(Math.round(totalRevenueYTD / 6 / ((TRAFFIC_SOURCES.find(s => s.source === 'Recherche Organique')?.sessions ?? 1) * 0.048))), icon: 'ri-money-dollar-circle-line', color: '#9B7B2C' },
                { label: 'Confiance S2 (moy.)', value: `${Math.round(REVENUE_FORECAST.filter(r => r.revenue_fcfa === 0).reduce((s, r) => s + r.confidence_pct, 0) / 6)}%`, icon: 'ri-shield-check-line', color: '#C05A3A' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-4 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                    <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
                  </div>
                  <span className="block text-lg font-bold text-foreground-950">{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Revenue Forecast Chart */}
            <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6 mb-8">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-5">Revenue Forecast — 2026</h3>
              <div className="space-y-3">
                {REVENUE_FORECAST.map((rf) => {
                  const isActual = rf.revenue_fcfa > 0;
                  const displayVal = isActual ? rf.revenue_fcfa : rf.revenue_forecast_fcfa;
                  const maxVal = Math.max(...REVENUE_FORECAST.map(r => r.revenue_forecast_fcfa || r.revenue_fcfa));
                  return (
                    <div key={rf.month}>
                      <div className="flex items-center justify-between mb-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground-600 font-medium">{rf.month} {rf.year}</span>
                          {!isActual && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700">Forecast ({rf.confidence_pct}% conf.)</span>}
                          {isActual && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">Réalisé</span>}
                        </div>
                        <span className="font-bold text-foreground-950">{formatFCFA(displayVal)} FCFA</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-background-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${isActual ? 'bg-emerald-500' : 'bg-amber-400/60 border-r-2 border-dashed border-amber-600'}`}
                          style={{ width: `${(displayVal / maxVal) * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-[9px] text-foreground-400">
                        <span>Sessions : {isActual ? formatNumber(rf.organic_sessions) : formatNumber(rf.organic_sessions_forecast)}</span>
                        <span>Leads : {isActual ? rf.leads_generated : rf.leads_forecast}</span>
                        <span>Conv. : {isActual ? rf.conversions : rf.conversions_forecast}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-foreground-950 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <i className="ri-funds-line text-emerald-400" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold">Projection Annuelle</span>
                    <span className="text-xs text-gray-400">{formatFCFA(totalRevenueForecast)} FCFA ({REVENUE_FORECAST.length} mois)</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  Croissance projetée du trafic SEO : 8 500 → 22 000 sessions/mois (+159% sur 12 mois). Le pipeline commercial SEO devrait générer {formatFCFA(totalRevenueForecast - totalRevenueYTD)} FCFA additionnels au S2 2026. Confiance moyenne S2 : {Math.round(REVENUE_FORECAST.filter(r => r.revenue_fcfa === 0).reduce((s, r) => s + r.confidence_pct, 0) / 6)}% — des actions sur les 42 opportunités SEO identifiées amélioreront la précision du forecast.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cross-link Ecosystem */}
      <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème KOS — SEO Analytics & Performance</h2>
            <p className="text-foreground-600">Le hub SEO Analytics est interconnecté avec tous les autres hubs d'audit SEO.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'SEO Analytics & Comp.', path: '/kos-seo-analytics-competitive', icon: 'ri-line-chart-line', color: '#86BC25', current: true },
              { label: 'SEO + AEO Command', path: '/kos-seo-aeo-command', icon: 'ri-search-line', color: '#C05A3A' },
              { label: 'Schema.org Audit', path: '/kos-schema-org-audit', icon: 'ri-code-box-line', color: '#4A7A1E' },
              { label: 'SEO On-Page & Content', path: '/kos-seo-onpage-content', icon: 'ri-file-search-line', color: '#D97757' },
              { label: 'Backlink Intelligence', path: '/kos-backlink-intelligence-audit', icon: 'ri-link', color: '#CA8A04' },
              { label: 'Core Web Vitals', path: '/kos-performance-seo-command', icon: 'ri-speed-line', color: '#9B7B2C' },
              { label: 'SEO Autopilot', path: '/kos-seo-autopilot', icon: 'ri-cpu-line', color: '#4A7A1E' },
              { label: 'GSC Command', path: '/kos-gsc-command', icon: 'ri-google-line', color: '#4285F4' },
            ].map((link) => (
              <a key={link.path} href={link.path}
                className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${link.current ? 'border-emerald-300 bg-emerald-50/40 ring-2 ring-emerald-400' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'}`}>
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
    </hubLayout>
  );
}





