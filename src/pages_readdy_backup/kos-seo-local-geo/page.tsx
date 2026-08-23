import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  seoLocalGeoOverview,
  countrySEO,
  geoPages,
  gbpProfiles,
  napCitations,
  localQuickWins,
  localGeoAlerts,
} from '@/mocks/seoLocalGeo';

type TabId = 'overview' | 'countries' | 'geopages' | 'gbp' | 'nap' | 'quickwins';

function formatNumber(val: number): string {
  if (val >= 1000000) return (val / 1000000).toFixed(1) + ' M';
  if (val >= 1000) return (val / 1000).toFixed(1) + ' K';
  return String(val);
}

function priorityBadge(p: string) {
  if (p === 'Critique' || p === 'Critique — Refresh') return 'bg-red-50 border-red-200 text-red-700';
  if (p === 'Haute') return 'bg-amber-50 border-amber-200 text-amber-700';
  if (p === 'Moyenne') return 'bg-background-100 border-background-200 text-foreground-500';
  return 'bg-background-50 border-background-200 text-foreground-400';
}

function severityBadge(s: string) {
  if (s === 'Critique') return 'bg-red-50 border-red-200 text-red-700';
  if (s === 'Haute') return 'bg-amber-50 border-amber-200 text-amber-700';
  if (s === 'Moyenne') return 'bg-background-100 border-background-200 text-foreground-500';
  return 'bg-background-50 text-foreground-400';
}

export default function seoLocalGeoPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [gbpFilter, setGbpFilter] = useState<'all' | 'claimed' | 'unclaimed'>('all');
  const [pageSort, setPageSort] = useState<'traffic' | 'date'>('traffic');

  const overview = seoLocalGeoOverview;

  const regions = ['all', 'UEMOA', 'CEMAC'];
  const filteredCountries = useMemo(() => {
    if (countryFilter === 'all') return countrySEO;
    return countrySEO.filter(c => c.region === countryFilter);
  }, [countryFilter]);

  const filteredGbp = useMemo(() => {
    if (gbpFilter === 'all') return gbpProfiles;
    if (gbpFilter === 'claimed') return gbpProfiles.filter(g => g.claimed);
    return gbpProfiles.filter(g => !g.claimed);
  }, [gbpFilter]);

  const sortedPages = useMemo(() => {
    if (pageSort === 'traffic') return [...geoPages].sort((a, b) => b.traffic - a.traffic);
    return [...geoPages].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
  }, [pageSort]);

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', count: `${overview.totalScore}/100` },
    { id: 'countries', label: 'Pays', icon: 'ri-global-line', count: `${overview.countriesOptimized}/${overview.countriesTargeted}` },
    { id: 'geopages', label: 'Pages Géo', icon: 'ri-pages-line', count: `${overview.geoPagesPublished}/${overview.geoPagesTarget}` },
    { id: 'gbp', label: 'Google Business', icon: 'ri-store-2-line', count: `${overview.gbpScore}/100` },
    { id: 'nap', label: 'Citations NAP', icon: 'ri-list-check', count: `${overview.napConsistency}%` },
    { id: 'quickwins', label: 'Quick Wins', icon: 'ri-flashlight-line', count: String(localQuickWins.filter(q => q.impact === 'Critique').length) },
  ];

  return (
    <hubLayout hubId={72}>
      <SeoHead
        title="KOS Local SEO & GEO Visibility — SEO Local UEMOA/CEMAC, GBP, NAP | KHEPRA EXPERTS"
        description="Local SEO & GEO Visibility : 14 pays UEMOA/CEMAC, 28 pages géo-ciblées, Google Business Profile, NAP citations. Score local : 38/100. KHEPRA EXPERTS."
        keywords="local SEO, GEO visibility, Google Business Profile, NAP citations, SEO UEMOA, SEO CEMAC, pages géo-ciblées, KHEPRA EXPERTS"
        canonicalPath="/kos-seo-local-geo"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/30 via-transparent to-amber-100/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-bold mb-4">
                <i className="ri-global-line" />
                LOCAL SEO — {overview.countriesTargeted} Pays · {overview.geoPagesPublished} Pages Géo · Score {overview.totalScore}/100
              </div>
              <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground-950 tracking-tight">
                Local SEO & GEO Visibility — Dominez les recherches locales UEMOA/CEMAC
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                <strong className="text-foreground-950">{overview.countriesOptimized}/{overview.countriesTargeted} pays optimisés</strong> ·{' '}
                <strong className="text-red-600">{overview.countriesTargeted - overview.countriesOptimized} pays à activer</strong> ·{' '}
                <strong className="text-amber-600">{overview.citationsActive}/{overview.citationsTarget} citations</strong>.{' '}
                Map Pack : <strong className="text-foreground-950">{overview.mapPackAppearances}/{overview.mapPackTarget} apparitions</strong>.{' '}
                Trafic local : <strong className="text-emerald-600">{formatNumber(overview.localTrafficMonthly)} sessions/mois</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 border border-red-300 text-red-700 text-xs font-bold">
                  <i className="ri-error-warning-line" />{gbpProfiles.filter(g => !g.claimed).length} GBP non réclamés
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-bold">
                  <i className="ri-list-check" />NAP {overview.napConsistency}% cohérent
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground-950 text-background-50 text-xs font-semibold">
                  <i className="ri-map-pin-line" />{overview.mapPackAppearances} Map Pack
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#D97706" strokeWidth="8"
                    strokeDasharray={`${(overview.totalScore / 100) * 264} 264`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold font-heading text-foreground-950">{overview.totalScore}</span>
                </div>
              </div>
              <span className="text-[10px] text-foreground-400 mt-1">Score Local</span>
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
                { label: 'Pays Ciblés', value: `${overview.countriesOptimized}/${overview.countriesTargeted}`, sub: 'Optimisés', icon: 'ri-global-line', color: '#D97706' },
                { label: 'Pages Géo', value: `${overview.geoPagesPublished}/${overview.geoPagesTarget}`, sub: 'Publiées', icon: 'ri-pages-line', color: '#86BC25' },
                { label: 'Score GBP', value: `${overview.gbpScore}/100`, sub: 'Google Business', icon: 'ri-store-2-line', color: '#4285F4' },
                { label: 'NAP Cohérence', value: `${overview.napConsistency}%`, sub: 'Citations', icon: 'ri-list-check', color: '#C05A3A' },
                { label: 'Map Pack', value: `${overview.mapPackAppearances}`, sub: `Cible ${overview.mapPackTarget}`, icon: 'ri-map-pin-line', color: '#DC2626' },
                { label: 'Trafic Local', value: formatNumber(overview.localTrafficMonthly), sub: 'sessions/mois', icon: 'ri-line-chart-line', color: '#CA8A04' },
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

            {/* Region Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {['UEMOA', 'CEMAC'].map(region => {
                const countries = countrySEO.filter(c => c.region === region);
                const totalTraffic = countries.reduce((s, c) => s + c.trafficMonthly, 0);
                const totalPotential = countries.reduce((s, c) => s + c.potentialTraffic, 0);
                const avgGBP = Math.round(countries.reduce((s, c) => s + c.gbpScore, 0) / countries.length);
                return (
                  <div key={region} className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
                    <h3 className="font-heading text-base font-bold text-foreground-950 mb-4 flex items-center gap-2">
                      <i className={region === 'UEMOA' ? 'ri-flag-line text-emerald-500' : 'ri-flag-line text-amber-500'} />
                      Zone {region} — {countries.length} pays
                    </h3>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[
                        { label: 'Trafic', value: formatNumber(totalTraffic), sub: `/${formatNumber(totalPotential)}`, color: '#86BC25' },
                        { label: 'GBP Moyen', value: `${avgGBP}/100`, sub: 'Score', color: '#4285F4' },
                        { label: 'Optimisés', value: `${countries.filter(c => c.gbpOptimized).length}/${countries.length}`, sub: 'OK', color: '#D97706' },
                      ].map((k, i) => (
                        <div key={i} className="text-center bg-background-100 rounded-xl p-3">
                          <span className="block text-lg font-bold" style={{ color: k.color }}>{k.value}</span>
                          <span className="text-[10px] text-foreground-500">{k.label}</span>
                          <span className="block text-[9px] text-foreground-400">{k.sub}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1.5">
                      {countries.slice(0, 3).map(c => (
                        <div key={c.code} className="flex items-center justify-between text-xs">
                          <span className="text-foreground-600">{c.country} ({c.city})</span>
                          <span className={`font-bold ${c.priority === 'Critique' ? 'text-red-600' : c.priority === 'Haute' ? 'text-amber-600' : 'text-foreground-700'}`}>
                            {c.gbpScore}/100 · {c.trafficMonthly} sess.
                          </span>
                        </div>
                      ))}
                      {countries.length > 3 && <span className="text-[10px] text-foreground-400">+{countries.length - 3} autres</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Alerts */}
            <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Alertes GEO & Local</h3>
              <div className="space-y-2">
                {localGeoAlerts.map(alt => (
                  <div key={alt.id} className={`flex items-start gap-3 rounded-xl p-3 ${alt.severity === 'Critique' ? 'bg-red-50/60 border border-red-200' : alt.severity === 'Haute' ? 'bg-amber-50/60 border border-amber-200' : 'bg-background-100 border border-background-200'}`}>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${severityBadge(alt.severity)}`}>{alt.severity}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground-700"><strong>{alt.type}</strong> — {alt.country}</p>
                      <p className="text-xs text-foreground-600 mt-0.5">{alt.message}</p>
                    </div>
                    <span className="text-[10px] text-foreground-500 flex-shrink-0 whitespace-nowrap">{alt.action}</span>
                  </div>
                ))}
              </div>
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
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Audit par Pays — {countrySEO.length} Marchés</h2>
                <p className="text-foreground-600 text-sm">Volume local total : {formatNumber(countrySEO.reduce((s, c) => s + c.localVolume, 0))} · Trafic : {formatNumber(countrySEO.reduce((s, c) => s + c.trafficMonthly, 0))} sessions/mois</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Zone :</span>
                {regions.map(r => (
                  <button key={r} onClick={() => setCountryFilter(r)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${countryFilter === r ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {r === 'all' ? 'Tous' : r}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Pays</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Zone</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-500">Volume Local</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-500">KW Rankés</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-500">Top 3</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-500">GBP</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-500">NAP</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-500">Map Pack</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-500">Trafic</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-500">Priorité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCountries.map((c) => (
                      <tr key={c.code} className="border-t border-background-100 hover:bg-background-50/70">
                        <td className="px-4 py-3">
                          <span className="text-xs font-bold text-foreground-950">{c.country}</span>
                          <span className="text-[10px] text-foreground-400 block">{c.city}</span>
                        </td>
                        <td className="px-4 py-3"><span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{c.region}</span></td>
                        <td className="px-4 py-3 text-center text-xs font-bold text-emerald-600">{formatNumber(c.localVolume)}</td>
                        <td className="px-4 py-3 text-center text-xs text-foreground-700">{c.kwRanked}</td>
                        <td className="px-4 py-3 text-center text-xs font-bold text-emerald-600">{c.top3}</td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${c.gbpOptimized ? 'bg-emerald-500' : 'bg-red-400'}`} />
                            <span className="text-xs text-foreground-700">{c.gbpScore}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="w-12 h-1.5 mx-auto rounded-full bg-background-200 overflow-hidden">
                            <div className={`h-full rounded-full ${c.napConsistency >= 70 ? 'bg-emerald-500' : c.napConsistency >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${c.napConsistency}%` }} />
                          </div>
                          <span className="text-[10px] text-foreground-500">{c.napConsistency}%</span>
                        </td>
                        <td className="px-4 py-3 text-center text-xs text-foreground-700">{c.mapPackAppearances}</td>
                        <td className="px-4 py-3 text-center text-xs text-foreground-700">{c.trafficMonthly}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border font-bold ${priorityBadge(c.priority)}`}>{c.priority}</span>
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

      {/* === TAB: GEO PAGES === */}
      {activeTab === 'geopages' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Pages Géo-Ciblées — {geoPages.length} Pages</h2>
                <p className="text-foreground-600 text-sm">Trafic total : {geoPages.reduce((s, p) => s + p.traffic, 0)} sessions · {geoPages.reduce((s, p) => s + p.kwRanked, 0)} mots-clés rankés</p>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { key: 'traffic', label: 'Trafic' },
                  { key: 'date', label: 'Date MAJ' },
                ].map(o => (
                  <button key={o.key} onClick={() => setPageSort(o.key as typeof pageSort)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${pageSort === o.key ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {sortedPages.map((pg) => (
                <div key={pg.id} className={`rounded-2xl border p-5 ${pg.priority === 'Critique — Refresh' ? 'border-red-200 bg-red-50/20' : pg.priority === 'Optimiser' ? 'border-amber-200 bg-amber-50/10' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex items-start gap-3 min-w-0 lg:w-72 flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: pg.priority === 'Critique — Refresh' ? '#FEE2E2' : pg.priority === 'Optimiser' ? '#FEF3C7' : '#F3F4F6' }}>
                        <i className={`text-lg ${pg.priority === 'Critique — Refresh' ? 'ri-error-warning-fill text-red-600' : 'ri-map-pin-line text-amber-500'}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-foreground-950">{pg.id}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${priorityBadge(pg.priority)}`}>{pg.priority}</span>
                        </div>
                        <h4 className="text-sm font-bold text-foreground-950 mt-1 leading-snug">{pg.title}</h4>
                        <p className="text-[10px] text-foreground-500">{pg.country} · {pg.city} · MAJ {pg.lastUpdated}</p>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Trafic</span><span className="text-xs font-bold text-emerald-600">{pg.traffic}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">KW Rankés</span><span className="text-xs font-bold text-foreground-700">{pg.kwRanked}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">CTR</span><span className="text-xs font-bold text-amber-600">{pg.ctr}%</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Conversion</span><span className="text-xs font-bold text-accent-600">{pg.conversionRate}%</span></div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-foreground-500">{pg.status}</span>
                      <span className="text-[10px] text-foreground-400">{pg.backlinks} backlinks</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: GBP === */}
      {activeTab === 'gbp' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Google Business Profile — {gbpProfiles.length} Profils</h2>
                <p className="text-foreground-600 text-sm">{gbpProfiles.filter(g => g.claimed).length} réclamés · {gbpProfiles.filter(g => g.verified).length} vérifiés · Score moyen {Math.round(gbpProfiles.reduce((s, g) => s + g.score, 0) / gbpProfiles.length)}/100</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Filtrer :</span>
                {(['all', 'claimed', 'unclaimed'] as const).map(f => (
                  <button key={f} onClick={() => setGbpFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${gbpFilter === f ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {f === 'all' ? 'Tous' : f === 'claimed' ? 'Réclamés' : 'Non Réclamés'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGbp.map((gbp) => (
                <div key={gbp.id} className={`rounded-2xl border p-5 ${!gbp.claimed ? 'border-red-200 bg-red-50/20' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${gbp.claimed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                        <i className={`${gbp.claimed ? 'ri-store-2-fill' : 'ri-store-2-line'} text-sm`} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground-950">{gbp.country}</h4>
                        <span className="text-[10px] text-foreground-500">{gbp.city}</span>
                      </div>
                    </div>
                    <div className="relative w-10 h-10">
                      <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
                        <circle cx="20" cy="20" r="16" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                        <circle cx="20" cy="20" r="16" fill="none" stroke={gbp.score >= 60 ? '#86BC25' : gbp.score >= 40 ? '#F59E0B' : '#DC2626'} strokeWidth="4"
                          strokeDasharray={`${(gbp.score / 100) * 100} 100`} strokeLinecap="round" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-foreground-950">{gbp.score}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-2 text-center">
                    <div className="bg-background-100 rounded-lg p-2"><span className="block text-sm font-bold text-foreground-950">{gbp.reviews}</span><span className="text-[9px] text-foreground-500">Avis</span></div>
                    <div className="bg-background-100 rounded-lg p-2"><span className="block text-sm font-bold text-foreground-950">{gbp.avgRating}</span><span className="text-[9px] text-foreground-500">★ Note</span></div>
                    <div className="bg-background-100 rounded-lg p-2"><span className="block text-sm font-bold text-foreground-950">{gbp.postsMonth}</span><span className="text-[9px] text-foreground-500">Posts/mois</span></div>
                  </div>
                  <p className="text-[10px] text-foreground-500">{gbp.insights}</p>
                  <div className="mt-2 pt-2 border-t border-background-200/50">
                    <p className="text-[9px] text-foreground-400">Dernière optimisation : {gbp.lastOptimized}</p>
                    {gbp.issues.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {gbp.issues.map((iss, i) => (
                          <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">{iss}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: NAP === */}
      {activeTab === 'nap' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Citations NAP — {napCitations.length} Annuaires</h2>
              <p className="text-foreground-600 text-sm">Cohérence Name-Address-Phone : {overview.napConsistency}% · {napCitations.reduce((s, n) => s + n.accurate, 0)} fiches exactes sur {napCitations.reduce((s, n) => s + n.listed, 0)} listées</p>
            </div>

            <div className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Annuaire</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-500">Pays Cibles</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-500">Listés</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-500">Exacts</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-foreground-500">Priorité</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {napCitations.map((nap) => (
                      <tr key={nap.id} className="border-t border-background-100 hover:bg-background-50/70">
                        <td className="px-4 py-3 text-xs font-bold text-foreground-950">{nap.directory}</td>
                        <td className="px-4 py-3 text-center text-xs text-foreground-600">{nap.countries}</td>
                        <td className="px-4 py-3 text-center text-xs font-bold text-emerald-600">{nap.listed}</td>
                        <td className="px-4 py-3 text-center text-xs font-bold text-foreground-700">
                          <span className={nap.accurate >= nap.listed * 0.8 ? 'text-emerald-600' : nap.accurate >= nap.listed * 0.5 ? 'text-amber-600' : 'text-red-600'}>{nap.accurate}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border font-bold ${priorityBadge(nap.priority)}`}>{nap.priority}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-foreground-600">{nap.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: QUICK WINS === */}
      {activeTab === 'quickwins' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Quick Wins — {localQuickWins.length} Actions Prioritaires</h2>
              <p className="text-foreground-600 text-sm">{localQuickWins.filter(q => q.impact === 'Critique').length} critiques · Trafic additionnel estimé : {localQuickWins.reduce((s, q) => s + q.expectedTraffic, 0)} sessions/mois · Coût total : 0 FCFA</p>
            </div>

            <div className="space-y-3">
              {localQuickWins.map((qw) => (
                <div key={qw.id} className={`rounded-2xl border p-5 ${qw.impact === 'Critique' ? 'border-red-200 bg-red-50/20' : qw.impact === 'Haute' ? 'border-amber-200 bg-amber-50/10' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: qw.impact === 'Critique' ? '#FEE2E2' : qw.impact === 'Haute' ? '#FEF3C7' : '#F3F4F6' }}>
                      <i className={`text-lg ${qw.impact === 'Critique' ? 'ri-flashlight-fill text-red-600' : 'ri-flashlight-line text-amber-500'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-bold text-foreground-950">{qw.id}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${priorityBadge(qw.impact)}`}>{qw.impact}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">{qw.country}</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground-950">{qw.action}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] text-foreground-500">
                        <span><i className="ri-timer-line mr-1" />{qw.effort}</span>
                        <span className="text-emerald-600 font-bold"><i className="ri-line-chart-line mr-1" />+{qw.expectedTraffic} sessions/mois</span>
                        <span className="text-foreground-400">{qw.cost}</span>
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
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème KOS — Local SEO & GEO</h2>
            <p className="text-foreground-600">Interconnexion avec les autres hubs SEO et visibilité.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Local SEO & GEO', path: '/kos-seo-local-geo', icon: 'ri-global-line', color: '#D97706', current: true },
              { label: 'SEO On-Page & Content', path: '/kos-seo-onpage-content', icon: 'ri-file-search-line', color: '#D97757' },
              { label: 'Backlink Intelligence', path: '/kos-backlink-intelligence-audit', icon: 'ri-link', color: '#CA8A04' },
              { label: 'Content Strategy', path: '/kos-seo-content-strategy', icon: 'ri-file-text-line', color: '#F59E0B' },
              { label: 'SEO Analytics', path: '/kos-seo-analytics-competitive', icon: 'ri-line-chart-line', color: '#86BC25' },
              { label: 'Institutional Visibility', path: '/kos-institutional-visibility', icon: 'ri-building-2-line', color: '#4A7A1E' },
              { label: 'SEO + AEO Command', path: '/kos-seo-aeo-command', icon: 'ri-search-line', color: '#C05A3A' },
              { label: 'GSC Command', path: '/kos-gsc-command', icon: 'ri-google-line', color: '#4285F4' },
            ].map((link) => (
              <a key={link.path} href={link.path}
                className={`rounded-xl border p-4 text-center cursor-pointer block transition-all ${link.current ? 'border-amber-300 bg-amber-50/40 ring-2 ring-amber-400' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'}`}>
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                {link.current && <span className="block text-[10px] text-amber-600 font-bold mt-1">Actif — En cours</span>}
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}



