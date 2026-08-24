import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  intlSeoOverview,
  hreflangAudit,
  countryPerformance,
  translationQuality,
  geoTargetingContent,
  internationalQuickWins,
  multilingualKpis,
} from '@/mocks/seoInternationalMultilingual';

type TabId = 'overview' | 'hreflang' | 'countries' | 'translations' | 'geo' | 'quickwins';

function formatNumber(val: number): string {
  if (val >= 1000000) return (val / 1000000).toFixed(1) + ' M';
  if (val >= 1000) return (val / 1000).toFixed(1) + ' K';
  return String(val);
}

function statusBadge(status: string) {
  if (status.includes('✅')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  if (status.includes('⚠️')) return 'bg-amber-100 text-amber-700 border-amber-200';
  if (status.includes('❌')) return 'bg-red-100 text-red-700 border-red-200';
  return 'bg-background-100 text-foreground-500 border-background-200';
}

function priorityBadge(p: string) {
  if (p === 'Critique') return 'bg-red-50 border-red-200 text-red-700';
  if (p === 'Haute') return 'bg-amber-50 border-amber-200 text-amber-700';
  if (p === 'Moyenne') return 'bg-background-100 border-background-200 text-foreground-500';
  return 'bg-background-50 border-background-200 text-foreground-400';
}

export default function seoInternationalMultilingualPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [hreflangFilter, setHreflangFilter] = useState<'all' | 'Critique' | 'Haute' | 'Moyenne'>('all');
  const [regionFilter, setRegionFilter] = useState<'all' | 'UEMOA' | 'CEMAC' | 'EU'>('all');
  const [geoSort, setGeoSort] = useState<'traffic' | 'priority'>('traffic');

  const overview = intlSeoOverview;
  const kpis = multilingualKpis;

  const filteredHreflang = useMemo(() => {
    if (hreflangFilter === 'all') return hreflangAudit;
    return hreflangAudit.filter(h => h.priority === hreflangFilter);
  }, [hreflangFilter]);

  const filteredCountries = useMemo(() => {
    if (regionFilter === 'all') return countryPerformance;
    return countryPerformance.filter(c => c.region === regionFilter);
  }, [regionFilter]);

  const sortedGeo = useMemo(() => {
    if (geoSort === 'traffic') return [...geoTargetingContent].sort((a, b) => b.trafficByGeo - a.trafficByGeo);
    const priorityOrder: Record<string, number> = { 'Critique': 0, 'Haute': 1, 'Moyenne': 2 };
    return [...geoTargetingContent].sort((a, b) => (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3));
  }, [geoSort]);

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-global-line', count: `${overview.globalScore}/100` },
    { id: 'hreflang', label: 'Hreflang & Tags', icon: 'ri-code-box-line', count: `${overview.hreflangErrors}` },
    { id: 'countries', label: 'Performance Pays', icon: 'ri-earth-line', count: String(countryPerformance.length) },
    { id: 'translations', label: 'Qualité Traduction', icon: 'ri-translate', count: `${Math.round(translationQuality.reduce((s, t) => s + t.qualityScore, 0) / translationQuality.length)}` },
    { id: 'geo', label: 'Contenu Géo-Ciblé', icon: 'ri-map-pin-line', count: `${overview.geoPerformanceScore}%` },
    { id: 'quickwins', label: 'Quick Wins', icon: 'ri-flashlight-line', count: String(internationalQuickWins.filter(q => q.impact === 'Critique').length) },
  ];

  return (
    <hubLayout hubId={74}>
      <SeoHead
        title="KOS International & Multilingual SEO — SEO Multilingue UEMOA/CEMAC | KHEPRA EXPERTS"
        description="International SEO : Score 54/100, 3 langues, 14 pays, 342 hreflang tags, 187 pages traduites. Audit hreflang, performance par pays, qualité traduction, contenu géo-ciblé. KHEPRA EXPERTS."
        keywords="SEO international, multilingual SEO, hreflang audit, SEO multilingue, géo-ciblage, SEO UEMOA, SEO CEMAC, traduction SEO, KHEPRA EXPERTS"
        canonicalPath="/kos-seo-international-multilingual"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 via-transparent to-accent-100/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-bold mb-4">
                <i className="ri-global-line" />
                International SEO — Score {overview.globalScore}/100 · {overview.activeLanguages} Langues · {overview.activeCountries}/{overview.countries} Pays · {overview.hreflangErrors} Erreurs Hreflang
              </div>
              <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground-950 tracking-tight">
                SEO International & Multilingue — Dominer les marchés UEMOA/CEMAC dans toutes les langues
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Score International <strong className="text-foreground-950">{overview.globalScore}/100</strong> (cible <strong className="text-emerald-600">{overview.targetScore}/100</strong>) ·{' '}
                <strong className="text-foreground-950">{overview.languages} langues</strong> actives ·{' '}
                <strong className="text-emerald-600">{overview.translatedPages}/{overview.totalPages}</strong> pages traduites ·{' '}
                <strong className="text-red-500">{overview.hreflangErrors} erreurs hreflang</strong> à corriger ·{' '}
                Couverture traduction <strong className="text-amber-500">{overview.translationCoverage}%</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 border border-red-300 text-red-700 text-xs font-bold">
                  <i className="ri-error-warning-line" />{overview.hreflangErrors} erreurs hreflang
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-bold">
                  <i className="ri-file-copy-line" />{overview.duplicateContentRisk} risques duplicate
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-bold">
                  <i className="ri-check-double-line" />{overview.translatedPages} pages traduites
                </span>
              </div>
            </div>
            {/* Score Gauge */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke={overview.globalScore >= 75 ? '#86BC25' : overview.globalScore >= 55 ? '#F59E0B' : '#DC2626'} strokeWidth="8"
                    strokeDasharray={`${(overview.globalScore / 100) * 264} 264`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold font-heading text-foreground-950">{overview.globalScore}</span>
                </div>
              </div>
              <span className="text-[10px] text-foreground-400 mt-1">Score International</span>
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
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {[
                { label: 'Santé Hreflang', value: `${kpis.hreflangHealth}%`, icon: 'ri-global-line', color: '#86BC25' },
                { label: 'Qualité Traduction', value: `${kpis.translationQualityAvg}/100`, icon: 'ri-translate', color: '#F59E0B' },
                { label: 'Couverture Géo', value: `${kpis.geoPageCoverage}%`, icon: 'ri-map-pin-line', color: '#CA8A04' },
                { label: 'Marchés Actifs', value: kpis.countryMarketsActive, icon: 'ri-earth-line', color: '#D97757' },
                { label: 'Trafic International', value: kpis.organicTrafficIntl, icon: 'ri-line-chart-line', color: '#9B7B2C' },
                { label: 'Position Moyenne', value: kpis.avgPositionIntl, icon: 'ri-search-line', color: '#4285F4' },
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

            {/* Dimensions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-3">Langues Actives</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground-800">🇫🇷 Français</span>
                    <span className="text-xs text-foreground-500">Langue primaire · 220 pages</span>
                  </div>
                  <div className="w-full bg-background-200 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '89%' }} /></div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground-800">🇬🇧 Anglais</span>
                    <span className="text-xs text-foreground-500">Langue secondaire · 187 pages</span>
                  </div>
                  <div className="w-full bg-background-200 rounded-full h-2"><div className="bg-accent-500 h-2 rounded-full" style={{ width: '76%' }} /></div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground-800">🇵🇹 Portugais</span>
                    <span className="text-xs text-foreground-500">Partiel · 12 pages</span>
                  </div>
                  <div className="w-full bg-background-200 rounded-full h-2"><div className="bg-amber-500 h-2 rounded-full" style={{ width: '5%' }} /></div>
                </div>
              </div>
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-3">Top Marchés par Trafic</h3>
                <div className="space-y-2">
                  {countryPerformance.slice(0, 5).map(c => (
                    <div key={c.id} className="flex items-center justify-between text-xs">
                      <span className="font-bold text-foreground-800">{c.country}</span>
                      <span className="text-foreground-500">{formatNumber(c.organicTraffic)} sess. · {c.growth}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-3">Risques Détectés</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs"><i className="ri-error-warning-line text-red-500" /><span className="text-foreground-700">28 erreurs hreflang bloquantes</span></div>
                  <div className="flex items-center gap-2 text-xs"><i className="ri-file-copy-line text-amber-500" /><span className="text-foreground-700">12 risques de contenu dupliqué</span></div>
                  <div className="flex items-center gap-2 text-xs"><i className="ri-link-unlink text-red-500" /><span className="text-foreground-700">8 erreurs canonical multilingues</span></div>
                  <div className="flex items-center gap-2 text-xs"><i className="ri-map-pin-line text-amber-500" /><span className="text-foreground-700">5 pays sans page géo dédiée</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: HREFLANG === */}
      {activeTab === 'hreflang' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Audit Hreflang — {hreflangAudit.length} Pages Auditées</h2>
                <p className="text-foreground-600 text-sm">{overview.hreflangTags} tags · {overview.hreflangErrors} erreurs · {overview.canonicalErrors} erreurs canonical</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Priorité :</span>
                {(['all', 'Critique', 'Haute', 'Moyenne'] as const).map((f) => (
                  <button key={f} onClick={() => setHreflangFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${hreflangFilter === f ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {f === 'all' ? 'Toutes' : f}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {filteredHreflang.map((h) => (
                <div key={h.id} className={`rounded-2xl border p-5 ${h.status.includes('❌') ? 'border-red-200 bg-red-50/20' : h.status.includes('⚠️') ? 'border-amber-200 bg-amber-50/10' : 'border-emerald-200 bg-emerald-50/10'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex items-start gap-3 min-w-0 lg:w-80 flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: h.status.includes('✅') ? '#DCFCE7' : h.status.includes('⚠️') ? '#FEF3C7' : '#FEE2E2' }}>
                        <i className={`text-lg ${h.status.includes('✅') ? 'ri-check-line text-emerald-600' : h.status.includes('⚠️') ? 'ri-error-warning-line text-amber-500' : 'ri-close-line text-red-500'}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-foreground-950">{h.id}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${statusBadge(h.status)}`}>{h.status}</span>
                        </div>
                        <h4 className="text-sm font-bold text-foreground-950 mt-1 font-mono">{h.page}</h4>
                        <span className="text-[10px] text-foreground-500">{h.languages} langues · Trafic: {formatNumber(h.traffic)} sessions</span>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] px-2 py-1 rounded-full border font-bold ${priorityBadge(h.priority)}`}>{h.priority}</span>
                      {h.errors > 0 && <span className="text-[10px] px-2 py-1 rounded-full bg-red-100 text-red-700 border border-red-200 font-bold">{h.errors} erreurs</span>}
                      <span className="text-[10px] text-foreground-400">Vérifié le {h.lastVerified}</span>
                    </div>
                    {h.issue && <p className="text-[10px] text-red-600 bg-red-50 px-3 py-1.5 rounded-lg">{h.issue}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: COUNTRIES === */}
      {activeTab === 'countries' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Performance par Pays — {countryPerformance.length} Marchés</h2>
                <p className="text-foreground-600 text-sm">Trafic total : {formatNumber(countryPerformance.reduce((s, c) => s + c.organicTraffic, 0))} sessions/mois · {countryPerformance.reduce((s, c) => s + c.topKeywords, 0)} KW locaux</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Région :</span>
                {(['all', 'UEMOA', 'CEMAC', 'EU'] as const).map((r) => (
                  <button key={r} onClick={() => setRegionFilter(r)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${regionFilter === r ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {r === 'all' ? 'Toutes' : r}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {filteredCountries.map((c) => (
                <div key={c.id} className="rounded-2xl border border-background-200/70 bg-background-50 p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-3 min-w-0 lg:w-64 flex-shrink-0">
                      <span className="text-2xl">{c.code === 'CI' ? '🇨🇮' : c.code === 'SN' ? '🇸🇳' : c.code === 'BJ' ? '🇧🇯' : c.code === 'CM' ? '🇨🇲' : c.code === 'GA' ? '🇬🇦' : c.code === 'BF' ? '🇧🇫' : c.code === 'ML' ? '🇲🇱' : c.code === 'TG' ? '🇹🇬' : c.code === 'CG' ? '🇨🇬' : c.code === 'NE' ? '🇳🇪' : c.code === 'FR' ? '🇫🇷' : '🇬🇧'}</span>
                      <div className="min-w-0">
                        <span className="text-xs text-foreground-400">{c.region}</span>
                        <h4 className="text-sm font-bold text-foreground-950">{c.country}</h4>
                        <span className="text-[10px] text-foreground-500">{c.language} · {c.geoPages} pages géo</span>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-3 sm:grid-cols-6 gap-2">
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Trafic</span><span className="text-xs font-bold text-foreground-950">{formatNumber(c.organicTraffic)}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">KW Top</span><span className="text-xs font-bold text-foreground-950">{c.topKeywords}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Position</span><span className="text-xs font-bold text-foreground-950">{c.avgPosition}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Part Marché</span><span className="text-xs font-bold text-foreground-950">{c.marketShare}%</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Croissance</span><span className={`text-xs font-bold ${c.growth.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>{c.growth}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Pages Géo</span><span className="text-xs font-bold text-foreground-950">{c.geoPages}</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: TRANSLATIONS === */}
      {activeTab === 'translations' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Qualité Traduction — {translationQuality.length} Pages Évaluées</h2>
              <p className="text-foreground-600 text-sm">Score moyen {Math.round(translationQuality.reduce((s, t) => s + t.qualityScore, 0) / translationQuality.length)}/100 · {translationQuality.reduce((s, t) => s + t.issues, 0)} issues détectées</p>
            </div>
            <div className="space-y-3">
              {translationQuality.map((t) => (
                <div key={t.id} className={`rounded-2xl border p-5 ${t.qualityScore >= 85 ? 'border-emerald-200 bg-emerald-50/10' : t.qualityScore >= 70 ? 'border-amber-200 bg-amber-50/10' : 'border-red-200 bg-red-50/20'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex items-start gap-3 min-w-0 lg:w-72 flex-shrink-0">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="6" />
                          <circle cx="50" cy="50" r="42" fill="none" stroke={t.qualityScore >= 85 ? '#86BC25' : t.qualityScore >= 70 ? '#F59E0B' : '#DC2626'} strokeWidth="6"
                            strokeDasharray={`${(t.qualityScore / 100) * 264} 264`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold font-heading text-foreground-950">{t.qualityScore}</span>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-foreground-950">{t.id}</span>
                        <h4 className="text-[11px] font-bold text-foreground-800 mt-1 font-mono">{t.source}</h4>
                        <span className="text-[9px] text-foreground-400 block mt-0.5 font-mono">→ {t.targetEN}</span>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] px-2 py-1 rounded-full bg-background-100 text-foreground-500 border border-background-200">{t.type}</span>
                      <span className="text-[10px] px-2 py-1 rounded-full bg-background-100 text-foreground-500 border border-background-200">{t.translator}</span>
                      <span className="text-[10px] text-foreground-400">MAJ {t.lastUpdated}</span>
                      {t.issues > 0 && <span className="text-[10px] px-2 py-1 rounded-full bg-red-100 text-red-700 border border-red-200 font-bold">{t.issues} issues</span>}
                    </div>
                    <div className="lg:w-80 flex-shrink-0">
                      {t.issue1 && <p className="text-[10px] text-red-600 bg-red-50 px-2 py-1 rounded mb-1">{t.issue1}</p>}
                      {t.issue2 && <p className="text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded">{t.issue2}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: GEO === */}
      {activeTab === 'geo' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Contenu Géo-Ciblé — {geoTargetingContent.length} Pays</h2>
                <p className="text-foreground-600 text-sm">{geoTargetingContent.reduce((s, g) => s + g.pagesDeployed, 0)} pages déployées sur {geoTargetingContent.reduce((s, g) => s + g.targetPages, 0)} cibles · {geoTargetingContent.reduce((s, g) => s + g.gapPages, 0)} gaps</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Trier :</span>
                {[
                  { key: 'traffic', label: 'Trafic' },
                  { key: 'priority', label: 'Priorité' },
                ].map((o) => (
                  <button key={o.key} onClick={() => setGeoSort(o.key as typeof geoSort)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${geoSort === o.key ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {sortedGeo.map((g) => (
                <div key={g.id} className={`rounded-2xl border p-5 ${g.priority === 'Critique' ? 'border-red-200 bg-red-50/20' : g.priority === 'Haute' ? 'border-amber-200 bg-amber-50/10' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-3 min-w-0 lg:w-64 flex-shrink-0">
                      <span className="text-2xl">{g.id === 'GEO-01' ? '🇨🇮' : g.id === 'GEO-02' ? '🇸🇳' : g.id === 'GEO-03' ? '🇨🇲' : g.id === 'GEO-04' ? '🇧🇯' : g.id === 'GEO-05' ? '🇧🇫' : g.id === 'GEO-06' ? '🇹🇬' : g.id === 'GEO-07' ? '🇲🇱' : '🇬🇦'}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-foreground-950">{g.country}</h4>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${priorityBadge(g.priority)}`}>{g.priority}</span>
                        </div>
                        <span className="text-[10px] text-foreground-500">{g.localKW} KW locaux · GBP {g.gbpScore}/100</span>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Pages</span><span className="text-xs font-bold text-foreground-950">{g.pagesDeployed}/{g.targetPages}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Trafic Géo</span><span className="text-xs font-bold text-foreground-950">{formatNumber(g.trafficByGeo)}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Map Pack</span><span className={`text-xs font-bold ${g.mapPackPresence.includes('✅') ? 'text-emerald-600' : g.mapPackPresence.includes('⚠️') ? 'text-amber-500' : 'text-red-500'}`}>{g.mapPackPresence.includes('✅') ? 'Présent' : g.mapPackPresence.includes('⚠️') ? 'Intermittent' : 'Absent'}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">GBP</span><span className="text-xs font-bold text-foreground-950">{g.gbpScore}/100</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Gaps</span><span className="text-xs font-bold text-red-500">{g.gapPages}</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: QUICK WINS === */}
      {activeTab === 'quickwins' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Quick Wins International — {internationalQuickWins.length} Actions</h2>
              <p className="text-foreground-600 text-sm">{internationalQuickWins.filter(q => q.impact === 'Critique').length} critiques · Effort total : {internationalQuickWins.reduce((s, q) => { const h = parseInt(q.effort) || 0; return s + h; }, 0)}h</p>
            </div>
            <div className="space-y-3">
              {internationalQuickWins.map((qw) => (
                <div key={qw.id} className={`rounded-2xl border p-5 ${qw.impact === 'Critique' ? 'border-red-200 bg-red-50/20' : qw.impact === 'Haute' ? 'border-amber-200 bg-amber-50/10' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: qw.impact === 'Critique' ? '#FEE2E2' : qw.impact === 'Haute' ? '#FEF3C7' : '#F3F4F6' }}>
                      <i className={`text-lg ${qw.impact === 'Critique' ? 'ri-flashlight-fill text-red-600' : 'ri-flashlight-line text-amber-500'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-bold text-foreground-950">{qw.id}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${priorityBadge(qw.impact)}`}>{qw.impact}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent-100 text-accent-700">{qw.type}</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground-950">{qw.action}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] text-foreground-500">
                        <span><i className="ri-timer-line mr-1" />{qw.effort}</span>
                        <span className="text-emerald-600 font-bold"><i className="ri-arrow-up-circle-line mr-1" />{qw.expectedImpact}</span>
                        <span className="text-foreground-500">{qw.detail}</span>
                      </div>
                    </div>
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
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème KOS — International & Multilingual SEO</h2>
            <p className="text-foreground-600">Le hub International SEO pilote la stratégie multilingue UEMOA/CEMAC.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'International SEO', path: '/kos-seo-international-multilingual', icon: 'ri-global-line', color: '#86BC25', current: true },
              { label: 'Local SEO & GEO', path: '/kos-seo-local-geo', icon: 'ri-map-pin-line', color: '#F59E0B' },
              { label: 'SEO On-Page', path: '/kos-seo-onpage-content', icon: 'ri-file-search-line', color: '#CA8A04' },
              { label: 'Schema.org Audit', path: '/kos-schema-org-audit', icon: 'ri-code-box-line', color: '#D97757' },
              { label: 'Content Strategy', path: '/kos-seo-content-strategy', icon: 'ri-book-open-line', color: '#9B7B2C' },
              { label: 'E-E-A-T & Authority', path: '/kos-seo-eeat-authority', icon: 'ri-medal-line', color: '#C05A3A' },
              { label: 'SEO Analytics', path: '/kos-seo-analytics-competitive', icon: 'ri-line-chart-line', color: '#4285F4' },
              { label: 'Performance SEO', path: '/kos-performance-seo-command', icon: 'ri-speed-line', color: '#4A7A1E' },
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
    </hubLayout>
  );
}





