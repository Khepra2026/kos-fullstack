import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  seoContentOverview,
  editorialCalendar,
  contentGaps,
  contentPerformance,
  topicClusters,
  contentRefresh,
  quickWinsContent,
} from '@/mocks/seoContentStrategy';

type TabId = 'overview' | 'calendar' | 'gaps' | 'performance' | 'clusters' | 'refresh' | 'quickwins';

function scoreColor(score: number): string {
  if (score >= 85) return 'text-emerald-600';
  if (score >= 70) return 'text-amber-600';
  if (score >= 50) return 'text-orange-600';
  return 'text-red-600';
}

function priorityBadge(p: string) {
  if (p === 'Critique') return 'bg-red-50 border-red-200 text-red-700';
  if (p === 'Haute') return 'bg-amber-50 border-amber-200 text-amber-700';
  if (p === 'Moyenne') return 'bg-background-100 border-background-200 text-foreground-500';
  return 'bg-background-50 border-background-200 text-foreground-400';
}

function formatNumber(val: number): string {
  if (val >= 1000000) return (val / 1000000).toFixed(1) + ' M';
  if (val >= 1000) return (val / 1000).toFixed(1) + ' K';
  return String(val);
}

function statusIcon(s: string): string {
  if (s === 'Publié' || s === 'En révision') return 'ri-checkbox-circle-line text-emerald-500';
  if (s === 'En rédaction') return 'ri-edit-line text-amber-500';
  if (s === 'Planifié') return 'ri-calendar-line text-foreground-400';
  if (s === 'Idée') return 'ri-lightbulb-line text-foreground-300';
  return 'ri-question-line text-foreground-300';
}

export default function seoContentStrategyPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [calendarFilter, setCalendarFilter] = useState<string>('all');
  const [gapFilter, setGapFilter] = useState<'all' | 'Critique' | 'Haute' | 'Moyenne' | 'Basse'>('all');
  const [selectedCluster, setSelectedCluster] = useState<number>(0);
  const [sortPerf, setSortPerf] = useState<'traffic' | 'trend'>('traffic');

  const overview = seoContentOverview;

  const months = ['Juillet 2026', 'Août 2026', 'Septembre 2026', 'Octobre 2026', 'Novembre 2026', 'Décembre 2026'];
  const filteredCalendar = useMemo(() => {
    if (calendarFilter === 'all') return editorialCalendar;
    return editorialCalendar.filter(e => e.month === calendarFilter);
  }, [calendarFilter]);

  const filteredGaps = useMemo(() => {
    if (gapFilter === 'all') return contentGaps;
    return contentGaps.filter(g => g.priority === gapFilter);
  }, [gapFilter]);

  const sortedPerformance = useMemo(() => {
    return [...contentPerformance].sort((a, b) => {
      if (sortPerf === 'traffic') return b.traffic - a.traffic;
      return b.trendPercent - a.trendPercent;
    });
  }, [sortPerf]);

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', count: `${overview.totalContentScore}/100` },
    { id: 'calendar', label: 'Calendrier Éditorial', icon: 'ri-calendar-2-line', count: String(editorialCalendar.length) },
    { id: 'gaps', label: 'Gap Analysis', icon: 'ri-search-eye-line', count: String(contentGaps.filter(g => g.priority === 'Critique').length) },
    { id: 'performance', label: 'Performance Contenu', icon: 'ri-line-chart-line', count: formatNumber(overview.monthlyTraffic) },
    { id: 'clusters', label: 'Topic Clusters', icon: 'ri-node-tree', count: String(topicClusters.length) },
    { id: 'refresh', label: 'Content Refresh', icon: 'ri-refresh-line', count: String(contentRefresh.filter(r => r.priority === 'Critique').length) },
    { id: 'quickwins', label: 'Quick Wins', icon: 'ri-flashlight-line', count: String(quickWinsContent.filter(q => q.impact === 'Critique').length) },
  ];

  const cluster = topicClusters[selectedCluster];

  return (
    <hubLayout hubId={71}>
      <SeoHead
        title="KOS SEO Content Strategy & Editorial Command — Stratégie, Calendrier, Performance | KHEPRA EXPERTS"
        description="SEO Content Strategy & Editorial Command : 247 pages, 1 850 mots-clés, 28 gaps identifiés, 5 topic clusters, pipeline éditorial 6 mois. KHEPRA EXPERTS."
        keywords="SEO content strategy, editorial calendar, content gap analysis, topic clusters, content performance, content refresh, KHEPRA EXPERTS"
        canonicalPath="/kos-seo-content-strategy"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 via-transparent to-emerald-100/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-bold mb-4">
                <i className="ri-file-text-line" />
                CONTENT STRATEGY — {overview.pagesPublished} Pages · {formatNumber(overview.keywordsTargeted)} KW · {overview.contentGaps} Gaps
              </div>
              <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground-950 tracking-tight">
                SEO Content Strategy & Editorial Command — Du mot-clé au contenu qui convertit
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                <strong className="text-foreground-950">{overview.pagesPublished} pages publiées</strong> · <strong className="text-emerald-600">{overview.pagesIndexed} indexées</strong> ·{' '}
                <strong className="text-amber-600">{overview.contentGaps} gaps identifiés</strong> dont <strong className="text-red-500">{overview.criticalGaps} critiques</strong>.{' '}
                Score contenu : <strong className="text-foreground-950">{overview.totalContentScore}/100</strong> (cible {overview.targetScore}).{' '}
                Trafic : <strong className="text-emerald-600">{formatNumber(overview.monthlyTraffic)} sessions/mois</strong>, ROI contenu <strong className="text-emerald-600">{overview.contentROI}%</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-bold">
                  <i className="ri-article-line" />{overview.avgWordCount} mots/page (moy.)
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-bold">
                  <i className="ri-contrast-line" />Lisibilité {overview.avgReadability}/100
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground-950 text-background-50 text-xs font-semibold">
                  <i className="ri-line-chart-line" />{overview.conversionRate}% conversion
                </span>
              </div>
            </div>
            {/* Score Gauge */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#F59E0B" strokeWidth="8"
                    strokeDasharray={`${(overview.totalContentScore / 100) * 264} 264`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold font-heading text-foreground-950">{overview.totalContentScore}</span>
                </div>
              </div>
              <span className="text-[10px] text-foreground-400 mt-1">Score Contenu</span>
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
                { label: 'Pages Publiées', value: String(overview.pagesPublished), sub: `${overview.pagesIndexed} indexées`, icon: 'ri-article-line', color: '#F59E0B' },
                { label: 'Mots-Clés Ciblés', value: formatNumber(overview.keywordsTargeted), sub: `${formatNumber(overview.keywordsInTop10)} en top 10`, icon: 'ri-key-2-line', color: '#86BC25' },
                { label: 'Gaps Identifiés', value: String(overview.contentGaps), sub: `${overview.criticalGaps} critiques`, icon: 'ri-search-eye-line', color: '#DC2626' },
                { label: 'Mots/Page Moyen', value: String(overview.avgWordCount), sub: `Lisibilité ${overview.avgReadability}`, icon: 'ri-file-text-line', color: '#D97757' },
                { label: 'Trafic Mensuel', value: formatNumber(overview.monthlyTraffic), sub: `${overview.conversionRate}% conv.`, icon: 'ri-line-chart-line', color: '#CA8A04' },
                { label: 'ROI Contenu', value: `${overview.contentROI}%`, sub: 'Retour sur invest.', icon: 'ri-funds-line', color: '#9B7B2C' },
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

            {/* Production Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-5 flex items-center gap-2">
                  <i className="ri-bar-chart-2-line text-amber-500" />Production de Contenu — 6 Mois
                </h3>
                <div className="space-y-3">
                  {overview.months.map((m) => {
                    const maxPub = Math.max(...overview.months.map(o => o.published));
                    return (
                      <div key={m.month}>
                        <div className="flex items-center justify-between mb-1 text-xs">
                          <span className="text-foreground-600">{m.month}</span>
                          <span className="font-bold text-foreground-950">{m.published} pages</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-background-100 overflow-hidden">
                          <div className="h-full rounded-full bg-amber-500/80" style={{ width: `${(m.published / maxPub) * 100}%` }} />
                        </div>
                        <span className="text-[9px] text-foreground-400 mt-0.5 block">{formatNumber(m.traffic)} sessions</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Content Type Distribution */}
              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-5 flex items-center gap-2">
                  <i className="ri-pie-chart-line text-emerald-500" />Pipeline Éditorial — Par Statut
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Publié', value: editorialCalendar.filter(e => e.status === 'Publié').length, color: '#86BC25' },
                    { label: 'En rédaction', value: editorialCalendar.filter(e => e.status === 'En rédaction').length, color: '#F59E0B' },
                    { label: 'En révision', value: editorialCalendar.filter(e => e.status === 'En révision').length, color: '#D97757' },
                    { label: 'Planifié', value: editorialCalendar.filter(e => e.status === 'Planifié').length, color: '#9B7B2C' },
                    { label: 'Idée', value: editorialCalendar.filter(e => e.status === 'Idée').length, color: '#A0A0A0' },
                  ].map((s) => {
                    const total = editorialCalendar.length;
                    const pct = ((s.value / total) * 100).toFixed(0);
                    return (
                      <div key={s.label}>
                        <div className="flex items-center justify-between mb-1 text-xs">
                          <span className="text-foreground-600">{s.label}</span>
                          <span className="font-bold" style={{ color: s.color }}>{s.value} ({pct}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-background-100 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: s.color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Alerts Summary */}
            <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Alertes & Priorités</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl bg-red-50/50 border border-red-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><i className="ri-error-warning-line text-red-600" /></div>
                    <span className="font-bold text-red-800 text-sm">{overview.criticalGaps} gaps critiques</span>
                  </div>
                  <p className="text-xs text-red-700">ICAAP ILAAP · Ratios Solvabilité · LBC/FT UEMOA — contenus inexistants sur des requêtes à fort volume</p>
                </div>
                <div className="rounded-xl bg-amber-50/50 border border-amber-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center"><i className="ri-time-line text-amber-600" /></div>
                    <span className="font-bold text-amber-800 text-sm">{contentRefresh.filter(r => r.priority === 'Critique').length} refreshes urgents</span>
                  </div>
                  <p className="text-xs text-amber-700">Prix de Transfert (7 mois) · RegTech (9 mois) — perte de rankings en cours</p>
                </div>
                <div className="rounded-xl bg-emerald-50/50 border border-emerald-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center"><i className="ri-check-double-line text-emerald-600" /></div>
                    <span className="font-bold text-emerald-800 text-sm">{overview.pagesIndexed}/{overview.pagesPublished} pages indexées</span>
                  </div>
                  <p className="text-xs text-emerald-700">Taux d'indexation {(overview.pagesIndexed / overview.pagesPublished * 100).toFixed(1)}% — 16 pages non indexées à investiguer</p>
                </div>
                <div className="rounded-xl bg-accent-50/50 border border-accent-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center"><i className="ri-lightbulb-line text-accent-600" /></div>
                    <span className="font-bold text-accent-800 text-sm">{quickWinsContent.filter(q => q.impact === 'Critique').length} quick wins critiques</span>
                  </div>
                  <p className="text-xs text-accent-700">{quickWinsContent[0].action} — impact immédiat {quickWinsContent[0].expectedTraffic} sessions/mois</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: CALENDAR === */}
      {activeTab === 'calendar' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Calendrier Éditorial — {editorialCalendar.length} Contenus Planifiés</h2>
                <p className="text-foreground-600 text-sm">Pipeline Q3-Q4 2026 · {editorialCalendar.filter(e => e.priority === 'Critique').length} critiques · {editorialCalendar.filter(e => e.status === 'En rédaction').length} en rédaction</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Mois :</span>
                <select
                  value={calendarFilter}
                  onChange={(e) => setCalendarFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-full text-xs font-bold bg-background-50 border border-background-200 text-foreground-600 cursor-pointer outline-none"
                >
                  <option value="all">Tous les mois</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredCalendar.map((item) => (
                <div key={item.id} className={`rounded-2xl border p-5 ${item.priority === 'Critique' ? 'border-red-200 bg-red-50/20' : item.priority === 'Haute' ? 'border-amber-200 bg-amber-50/10' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex items-start gap-3 min-w-0 lg:w-72 flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: item.priority === 'Critique' ? '#FEE2E2' : item.priority === 'Haute' ? '#FEF3C7' : '#F3F4F6' }}>
                        <span className="text-lg font-bold font-heading" style={{ color: item.priority === 'Critique' ? '#DC2626' : item.priority === 'Haute' ? '#D97706' : '#6B7280' }}>
                          {item.volume >= 2000 ? '🔥' : item.volume >= 1000 ? '⭐' : '📝'}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-foreground-950">{item.id}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${priorityBadge(item.priority)}`}>{item.priority}</span>
                        </div>
                        <h4 className="text-sm font-bold text-foreground-950 mt-1 leading-snug">{item.topic}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] text-foreground-500">
                          <span><i className="ri-calendar-line mr-1" />{item.month}</span>
                          <span>·</span>
                          <span className="font-semibold text-foreground-700">{item.contentType}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="text-center">
                        <span className="block text-[9px] text-foreground-400">Volume KW</span>
                        <span className="text-sm font-bold text-emerald-600">{item.volume}</span>
                      </div>
                      <div className="text-center">
                        <span className="block text-[9px] text-foreground-400">Difficulté</span>
                        <span className="text-sm font-bold text-amber-600">{item.difficulty}/100</span>
                      </div>
                      <div className="text-center">
                        <span className="block text-[9px] text-foreground-400">Mots Cible</span>
                        <span className="text-sm font-bold text-foreground-950">{formatNumber(item.wordCountTarget)}</span>
                      </div>
                      <div className="text-center">
                        <span className="block text-[9px] text-foreground-400">Pilier</span>
                        <span className="text-sm font-bold text-accent-600">{item.pillar}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <i className={statusIcon(item.status)} />
                      <span className="text-xs text-foreground-500">{item.status}</span>
                      <span className="text-[10px] text-foreground-400 ml-2">— {item.writer}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: GAPS === */}
      {activeTab === 'gaps' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Content Gap Analysis — {contentGaps.length} Gaps Identifiés</h2>
                <p className="text-foreground-600 text-sm">{contentGaps.filter(g => g.priority === 'Critique').length} critiques · Volume potentiel : {formatNumber(contentGaps.reduce((s, g) => s + g.volume, 0))} · Trafic estimé : {contentGaps.reduce((s, g) => s + g.potentialTraffic, 0)} sessions/mois</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Filtrer :</span>
                {(['all', 'Critique', 'Haute', 'Moyenne', 'Basse'] as const).map((f) => (
                  <button key={f} onClick={() => setGapFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${gapFilter === f ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {f === 'all' ? 'Tous' : f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredGaps.map((gap) => (
                <div key={gap.id} className={`rounded-2xl border p-5 ${gap.priority === 'Critique' ? 'border-red-200 bg-red-50/20' : gap.priority === 'Haute' ? 'border-amber-200 bg-amber-50/10' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex items-start gap-3 min-w-0 lg:w-80 flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: gap.priority === 'Critique' ? '#FEE2E2' : gap.priority === 'Haute' ? '#FEF3C7' : '#F3F4F6' }}>
                        <span className="text-sm font-bold" style={{ color: gap.priority === 'Critique' ? '#DC2626' : gap.priority === 'Haute' ? '#D97706' : '#6B7280' }}>{gap.potentialTraffic}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-foreground-950">{gap.id}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${priorityBadge(gap.priority)}`}>{gap.priority.toUpperCase()}</span>
                        </div>
                        <h4 className="text-sm font-bold text-foreground-950 mt-1">{gap.keyword}</h4>
                        <p className="text-[10px] text-foreground-500 mt-0.5">
                          Concurrent <strong>{gap.competitorDomain}</strong> est #{gap.competitorRanking} — nous sommes {gap.currentPosition === 0 ? 'non classés' : `#${gap.currentPosition}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Volume</span><span className="text-xs font-bold text-emerald-600">{gap.volume}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Difficulté</span><span className="text-xs font-bold text-amber-600">{gap.difficulty}/100</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Potentiel</span><span className="text-xs font-bold text-red-700">{gap.potentialTraffic} sess./mois</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Type recommandé</span><span className="text-xs font-bold text-accent-600">{gap.recommendedType}</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: PERFORMANCE === */}
      {activeTab === 'performance' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Performance Contenu — Top {contentPerformance.length} Pages</h2>
                <p className="text-foreground-600 text-sm">Trafic total : {formatNumber(contentPerformance.reduce((s, p) => s + p.traffic, 0))} sessions · {contentPerformance.reduce((s, p) => s + p.keywords, 0)} mots-clés rankés · {contentPerformance.reduce((s, p) => s + p.backlinks, 0)} backlinks</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Trier :</span>
                {[
                  { key: 'traffic', label: 'Trafic' },
                  { key: 'trend', label: 'Tendance' },
                ].map((o) => (
                  <button key={o.key} onClick={() => setSortPerf(o.key as typeof sortPerf)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${sortPerf === o.key ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Page</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Trafic</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Mots-Clés</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Backlinks</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Mots</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Lisibilité</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Mis à Jour</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Tendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedPerformance.map((cp) => (
                      <tr key={cp.id} className="border-t border-background-100 hover:bg-background-50/70">
                        <td className="px-4 py-3">
                          <a href={cp.url} className="text-xs font-semibold text-foreground-950 hover:text-accent-600 block max-w-[280px] truncate">{cp.url}</a>
                          <span className="text-[9px] text-foreground-400 block truncate max-w-[280px]">{cp.title}</span>
                        </td>
                        <td className="px-4 py-3 text-xs font-bold text-emerald-600">{cp.traffic}</td>
                        <td className="px-4 py-3 text-xs text-foreground-700">{cp.keywords}</td>
                        <td className="px-4 py-3 text-xs text-foreground-700">{cp.backlinks}</td>
                        <td className="px-4 py-3 text-xs text-foreground-700">{formatNumber(cp.wordCount)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-10 h-1.5 rounded-full bg-background-200 overflow-hidden">
                              <div className={`h-full rounded-full ${cp.readability >= 60 ? 'bg-emerald-500' : cp.readability >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${cp.readability}%` }} />
                            </div>
                            <span className="text-[10px] text-foreground-500">{cp.readability}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[10px] text-foreground-500">{cp.lastUpdated}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold ${cp.trend === 'up' ? 'text-emerald-600' : cp.trend === 'down' ? 'text-red-500' : 'text-foreground-400'}`}>
                            {cp.trend === 'up' ? '▲' : cp.trend === 'down' ? '▼' : '—'} {cp.trendPercent > 0 ? '+' : ''}{cp.trendPercent}%
                          </span>
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

      {/* === TAB: CLUSTERS === */}
      {activeTab === 'clusters' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Topic Clusters — {topicClusters.length} Piliers Stratégiques</h2>
              <p className="text-foreground-600 text-sm">Score de couverture moyen : {Math.round(topicClusters.reduce((s, c) => s + c.coverageScore, 0) / topicClusters.length)}/100 · {topicClusters.reduce((s, c) => s + c.publishedClusters, 0)} clusters publiés · {topicClusters.reduce((s, c) => s + c.gapClusters, 0)} gaps</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {topicClusters.map((tc, i) => (
                <button key={tc.id} onClick={() => setSelectedCluster(i)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-all ${
                    selectedCluster === i ? 'bg-foreground-950 text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:bg-background-100'
                  }`}>
                  <i className="ri-node-tree text-sm" />
                  {tc.name}
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/15">{tc.coverageScore}%</span>
                </button>
              ))}
            </div>

            {cluster && (
              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-6">
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-bold text-foreground-950 mb-1">{cluster.name}</h3>
                    <a href={cluster.pillarURL} className="text-xs text-accent-600 hover:underline">{cluster.pillarURL}</a>
                    <p className="text-sm text-foreground-500 mt-2">Pilier : <strong className="text-foreground-950">{formatNumber(cluster.pillarTraffic)} sessions/mois</strong></p>
                  </div>
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <div className="text-center">
                      <div className="relative w-16 h-16 mx-auto">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="6" />
                          <circle cx="50" cy="50" r="42" fill="none" stroke={
                            cluster.coverageScore >= 75 ? '#86BC25' : cluster.coverageScore >= 50 ? '#F59E0B' : '#DC2626'
                          } strokeWidth="6" strokeDasharray={`${(cluster.coverageScore / 100) * 264} 264`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-bold font-heading text-foreground-950">{cluster.coverageScore}%</span>
                        </div>
                      </div>
                      <span className="text-[9px] text-foreground-400">Couverture</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div><span className="block text-lg font-bold text-emerald-600">{cluster.publishedClusters}</span><span className="text-[9px] text-foreground-400">Publiés</span></div>
                      <div><span className="block text-lg font-bold text-amber-600">{cluster.plannedClusters}</span><span className="text-[9px] text-foreground-400">Planifiés</span></div>
                      <div><span className="block text-lg font-bold text-red-500">{cluster.gapClusters}</span><span className="text-[9px] text-foreground-400">Gaps</span></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {cluster.clusters.map((c, i) => (
                    <div key={i} className={`flex items-center justify-between rounded-xl p-3 ${c.status === 'Publié' ? 'bg-background-100' : c.status === 'Planifié' ? 'bg-amber-50/50' : 'bg-red-50/30'}`}>
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.status === 'Publié' ? 'bg-emerald-500' : c.status === 'Planifié' ? 'bg-amber-500' : 'bg-red-400'}`} />
                        <span className="text-xs text-foreground-700 truncate">{c.title}</span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {c.url ? (
                          <a href={c.url} className="text-[10px] text-accent-600 hover:underline font-mono truncate max-w-[200px]">{c.url}</a>
                        ) : (
                          <span className="text-[10px] text-foreground-300 italic">—</span>
                        )}
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          c.status === 'Publié' ? 'bg-emerald-100 text-emerald-700' : c.status === 'Planifié' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                        }`}>{c.status}</span>
                        {c.traffic > 0 && <span className="text-[10px] text-foreground-500 font-semibold">{formatNumber(c.traffic)} sess.</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* === TAB: REFRESH === */}
      {activeTab === 'refresh' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Content Refresh — {contentRefresh.length} Pages à Mettre à Jour</h2>
              <p className="text-foreground-600 text-sm">{contentRefresh.filter(r => r.priority === 'Critique').length} critiques · Perte de trafic cumulée : {contentRefresh.reduce((s, r) => s + r.trafficDrop, 0)} sessions</p>
            </div>

            <div className="space-y-3">
              {contentRefresh.map((rf) => (
                <div key={rf.id} className={`rounded-2xl border p-5 ${rf.priority === 'Critique' ? 'border-red-200 bg-red-50/20' : rf.priority === 'Haute' ? 'border-amber-200 bg-amber-50/10' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex items-start gap-3 min-w-0 lg:w-80 flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: rf.priority === 'Critique' ? '#FEE2E2' : rf.priority === 'Haute' ? '#FEF3C7' : '#F3F4F6' }}>
                        <i className={`text-lg ${rf.positionChange <= -10 ? 'ri-arrow-down-circle-fill text-red-600' : 'ri-arrow-down-line text-red-500'}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-foreground-950">{rf.id}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${priorityBadge(rf.priority)}`}>{rf.priority}</span>
                        </div>
                        <span className="text-xs text-foreground-700 font-semibold block mt-1">{rf.keyword}</span>
                        <a href={rf.url} className="text-[10px] text-accent-600 hover:underline font-mono block mt-0.5 truncate">{rf.url}</a>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Position</span><span className="text-xs font-bold text-red-600">{rf.positionChange < 0 ? rf.positionChange : '+' + rf.positionChange} → #{rf.currentPosition}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Inchangé depuis</span><span className="text-xs font-bold text-foreground-950">{rf.monthsSinceUpdate} mois</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Trafic perdu</span><span className="text-xs font-bold text-red-600">{rf.trafficDrop} sess.</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Dernière MAJ</span><span className="text-xs font-bold text-foreground-700">{rf.lastUpdated}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Effort estimé</span><span className="text-xs font-bold text-foreground-700">{rf.effort}</span></div>
                    </div>
                    <div className="lg:w-64 flex-shrink-0 bg-background-100 rounded-xl p-3">
                      <p className="text-[10px] text-foreground-600"><strong className="text-foreground-800">Action :</strong> {rf.action}</p>
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
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Quick Wins — {quickWinsContent.length} Actions Prioritaires</h2>
              <p className="text-foreground-600 text-sm">{quickWinsContent.filter(q => q.impact === 'Critique').length} critiques · Trafic additionnel estimé : {quickWinsContent.reduce((s, q) => s + q.expectedTraffic, 0)} sessions/mois · Effort total : {quickWinsContent.reduce((s, q) => { const h = parseInt(q.effort) || 0; return s + h; }, 0)}h</p>
            </div>

            <div className="space-y-3">
              {quickWinsContent.map((qw) => (
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
                        <span className="text-emerald-600 font-bold"><i className="ri-line-chart-line mr-1" />+{qw.expectedTraffic} sessions/mois</span>
                        <span className="text-amber-600 font-semibold"><i className="ri-key-2-line mr-1" />+{qw.expectedKeywords} mots-clés</span>
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
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème KOS — Content Strategy & SEO</h2>
            <p className="text-foreground-600">Le hub Content Strategy est interconnecté avec les autres hubs d'audit SEO.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Content Strategy', path: '/kos-seo-content-strategy', icon: 'ri-file-text-line', color: '#F59E0B', current: true },
              { label: 'SEO On-Page & Content', path: '/kos-seo-onpage-content', icon: 'ri-file-search-line', color: '#D97757' },
              { label: 'SEO Analytics & Comp.', path: '/kos-seo-analytics-competitive', icon: 'ri-line-chart-line', color: '#86BC25' },
              { label: 'SEO + AEO Command', path: '/kos-seo-aeo-command', icon: 'ri-search-line', color: '#C05A3A' },
              { label: 'Backlink Intelligence', path: '/kos-backlink-intelligence-audit', icon: 'ri-link', color: '#CA8A04' },
              { label: 'Schema.org Audit', path: '/kos-schema-org-audit', icon: 'ri-code-box-line', color: '#4A7A1E' },
              { label: 'SEO Autopilot', path: '/kos-seo-autopilot', icon: 'ri-cpu-line', color: '#4A7A1E' },
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





