import { useState, useMemo } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  croOverview,
  landingPagePerformance,
  ctaAnalysis,
  formOptimization,
  userJourneys,
  abTests,
  quickWinsCRO,
} from '@/mocks/seoCROConversion';

type TabId = 'overview' | 'landing' | 'cta' | 'forms' | 'journeys' | 'abtests' | 'quickwins';

function formatNumber(val: number): string {
  if (val >= 1000000) return (val / 1000000).toFixed(1) + ' M';
  if (val >= 1000) return (val / 1000).toFixed(1) + ' K';
  return String(val);
}

function priorityBadge(p: string) {
  if (p === 'Critique') return 'bg-red-50 border-red-200 text-red-700';
  if (p === 'Haute') return 'bg-amber-50 border-amber-200 text-amber-700';
  if (p === 'Moyenne') return 'bg-background-100 border-background-200 text-foreground-500';
  return 'bg-background-50 border-background-200 text-foreground-400';
}

function scoreColor(score: number, threshold: number): string {
  if (score >= threshold * 0.8) return 'text-emerald-600';
  if (score >= threshold * 0.5) return 'text-amber-600';
  return 'text-red-600';
}

export default function KOSSeoCROConversionPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [sortLanding, setSortLanding] = useState<'conversion' | 'sessions'>('conversion');
  const [ctaFilter, setCtaFilter] = useState<'all' | 'Diagnostic' | 'Lead Magnet' | 'Calendly' | 'Newsletter' | 'Premium Content' | 'Contact' | 'Tool' | 'Navigation'>('all');
  const [journeySort, setJourneySort] = useState<'conversion' | 'value'>('conversion');

  const overview = croOverview;

  const sortedLanding = useMemo(() => {
    return [...landingPagePerformance].sort((a, b) => {
      if (sortLanding === 'conversion') return b.conversionRate - a.conversionRate;
      return b.sessions - a.sessions;
    });
  }, [sortLanding]);

  const filteredCTA = useMemo(() => {
    if (ctaFilter === 'all') return ctaAnalysis;
    return ctaAnalysis.filter(c => c.type === ctaFilter);
  }, [ctaFilter]);

  const sortedJourneys = useMemo(() => {
    return [...userJourneys].sort((a, b) => {
      if (journeySort === 'conversion') return b.conversionRate - a.conversionRate;
      return parseInt(b.valuePerJourney.replace(/\D/g, '')) - parseInt(a.valuePerJourney.replace(/\D/g, ''));
    });
  }, [journeySort]);

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', count: `${overview.totalConversionRate}%` },
    { id: 'landing', label: 'Landing Pages', icon: 'ri-pages-line', count: String(landingPagePerformance.length) },
    { id: 'cta', label: 'Analyse CTA', icon: 'ri-cursor-line', count: String(ctaAnalysis.length) },
    { id: 'forms', label: 'Formulaires', icon: 'ri-survey-line', count: `${overview.formCompletionRate}%` },
    { id: 'journeys', label: 'Parcours Utilisateur', icon: 'ri-route-line', count: String(userJourneys.length) },
    { id: 'abtests', label: 'Tests A/B', icon: 'ri-test-tube-line', count: String(abTests.filter(a => a.status === 'Terminé').length) },
    { id: 'quickwins', label: 'Quick Wins', icon: 'ri-flashlight-line', count: String(quickWinsCRO.filter(q => q.impact === 'Critique').length) },
  ];

  return (
    <KOSHubLayout hubId={72}>
      <SeoHead
        title="KOS SEO CRO & Conversion Optimization — Optimisation du taux de conversion organique | KHEPRA EXPERTS"
        description="SEO CRO & Conversion Rate Optimization : 2.8% taux conversion, 12 landing pages, 8 CTAs, 6 formulaires, 6 parcours, 6 tests A/B. KHEPRA EXPERTS."
        keywords="SEO CRO, conversion rate optimization, landing page optimization, CTA analysis, form optimization, A/B testing, user journey, KHEPRA EXPERTS"
        canonicalPath="/kos-seo-cro-conversion"
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
                CRO SEO — {overview.totalConversionRate}% Taux Conversion · {overview.revenuePerSession} / session · {formatNumber(overview.goalCompletionsMonthly)} goals/mois
              </div>
              <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground-950 tracking-tight">
                SEO CRO & Conversion Optimization — Du trafic organique aux leads qualifiés
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                <strong className="text-foreground-950">{formatNumber(overview.totalSessionsMonthly)} sessions/mois</strong> ·{' '}
                <strong className="text-emerald-600">{overview.totalConversionRate}% taux de conversion</strong> (cible <strong className="text-emerald-600">{overview.targetConversionRate}%</strong>) ·{' '}
                Gap de conversion : <strong className="text-red-500">{overview.conversionGap} points</strong>.{' '}
                Taux de rebond : <strong className="text-amber-600">{overview.bounceRate}%</strong> ·{' '}
                Durée moyenne : <strong className="text-foreground-950">{overview.avgSessionDuration}</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 border border-red-300 text-red-700 text-xs font-bold">
                  <i className="ri-arrow-down-circle-line" />{overview.conversionGap} pts gap — cible {overview.targetConversionRate}%
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-bold">
                  <i className="ri-close-circle-line" />Bounce {overview.bounceRate}%
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-bold">
                  <i className="ri-money-dollar-circle-line" />{overview.revenuePerSession}/session
                </span>
              </div>
            </div>
            {/* Score Gauge */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke={overview.totalConversionRate >= 4 ? '#86BC25' : overview.totalConversionRate >= 2.5 ? '#F59E0B' : '#DC2626'} strokeWidth="8"
                    strokeDasharray={`${(overview.totalConversionRate / overview.targetConversionRate) * 264} 264`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold font-heading text-foreground-950">{overview.totalConversionRate}%</span>
                </div>
              </div>
              <span className="text-[10px] text-foreground-400 mt-1">Conversion</span>
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
                { label: 'Taux Conversion', value: `${overview.totalConversionRate}%`, sub: `Cible ${overview.targetConversionRate}%`, icon: 'ri-percent-line', color: '#86BC25' },
                { label: 'Bounce Rate', value: `${overview.bounceRate}%`, sub: 'Taux de rebond', icon: 'ri-arrow-go-back-line', color: '#F59E0B' },
                { label: 'Pages/Session', value: String(overview.pagesPerSession), sub: 'Profondeur visite', icon: 'ri-stack-line', color: '#CA8A04' },
                { label: 'Durée Session', value: overview.avgSessionDuration, sub: 'Temps moyen', icon: 'ri-timer-line', color: '#D97757' },
                { label: 'Goals/mois', value: formatNumber(overview.goalCompletionsMonthly), sub: `${overview.revenuePerSession}/sess.`, icon: 'ri-flag-line', color: '#9B7B2C' },
                { label: 'CTA Click Rate', value: `${overview.ctaClickRate}%`, sub: 'Taux de clic CTA', icon: 'ri-cursor-line', color: '#4A7A1E' },
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

            {/* Conversion Funnel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-5 flex items-center gap-2">
                  <i className="ri-filter-3-line text-emerald-500" />Entonnoir de Conversion — Trafic Organique
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Sessions', value: overview.totalSessionsMonthly, pct: 100, color: '#3B82F6' },
                    { label: 'Pages vues (>10s)', value: Math.round(overview.totalSessionsMonthly * (1 - overview.bounceRate / 100)), pct: Math.round(100 - overview.bounceRate), color: '#F59E0B' },
                    { label: 'Clics CTA', value: Math.round(overview.totalSessionsMonthly * overview.ctaClickRate / 100), pct: Math.round(overview.ctaClickRate), color: '#D97757' },
                    { label: 'Conversions (Goals)', value: overview.goalCompletionsMonthly, pct: Math.round(overview.totalConversionRate), color: '#86BC25' },
                  ].map((step) => (
                    <div key={step.label}>
                      <div className="flex items-center justify-between mb-1 text-xs">
                        <span className="text-foreground-600">{step.label}</span>
                        <span className="font-bold" style={{ color: step.color }}>{formatNumber(step.value)} ({step.pct}%)</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-background-100 overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${step.pct}%`, backgroundColor: step.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Impact */}
              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-5 flex items-center gap-2">
                  <i className="ri-funds-line text-amber-500" />Impact Financier du Gap de Conversion
                </h3>
                <div className="space-y-4">
                  <div className="rounded-xl bg-amber-50/50 border border-amber-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <i className="ri-error-warning-line text-amber-600 text-lg" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-foreground-950 block">{overview.conversionGap} points de conversion perdus</span>
                        <span className="text-xs text-foreground-500 mt-1 block">
                          À {overview.targetConversionRate}%, le site générerait <strong className="text-emerald-600">{Math.round(overview.totalSessionsMonthly * overview.targetConversionRate / 100)} leads/mois</strong> au lieu de <strong className="text-red-500">{overview.goalCompletionsMonthly}</strong>.
                        </span>
                        <span className="text-xs text-foreground-500 mt-0.5 block">
                          Soit <strong className="text-foreground-950">+{Math.round(overview.totalSessionsMonthly * overview.targetConversionRate / 100) - overview.goalCompletionsMonthly} leads/mois</strong> supplémentaires.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-emerald-50/50 border border-emerald-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <i className="ri-money-dollar-circle-line text-emerald-600 text-lg" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-foreground-950 block">Revenue potentiel non capturé</span>
                        <span className="text-xs text-foreground-500 mt-1 block">
                          En estimant une valeur lead moyenne de <strong>2.5 M FCFA</strong>, le manque à gagner mensuel est de <strong className="text-red-500">~6.9 M FCFA</strong>.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Alertes & Priorités CRO</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl bg-red-50/50 border border-red-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><i className="ri-survey-line text-red-600" /></div>
                    <span className="font-bold text-red-800 text-sm">Formulaire 38% complétion</span>
                  </div>
                  <p className="text-xs text-red-700">Formulaire Audit Personnalisé — 8 champs, 35% dropoff sur Budget. À réduire à 5 champs</p>
                </div>
                <div className="rounded-xl bg-amber-50/50 border border-amber-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center"><i className="ri-smartphone-line text-amber-600" /></div>
                    <span className="font-bold text-amber-800 text-sm">Mobile 58% CRO desktop</span>
                  </div>
                  <p className="text-xs text-amber-700">62% trafic mobile mais formulaires non optimisés — sticky CTA manquant sur blog</p>
                </div>
                <div className="rounded-xl bg-emerald-50/50 border border-emerald-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center"><i className="ri-check-double-line text-emerald-600" /></div>
                    <span className="font-bold text-emerald-800 text-sm">3 A/B tests terminés</span>
                  </div>
                  <p className="text-xs text-emerald-700">Lift moyen +24.7% — déploiement en cours des variants gagnants</p>
                </div>
                <div className="rounded-xl bg-accent-50/50 border border-accent-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center"><i className="ri-lightbulb-line text-accent-600" /></div>
                    <span className="font-bold text-accent-800 text-sm">{quickWinsCRO.filter(q => q.impact === 'Critique').length} quick wins critiques</span>
                  </div>
                  <p className="text-xs text-accent-700">{quickWinsCRO[0].action.substring(0, 60)}... — impact {quickWinsCRO[0].expectedLift}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: LANDING PAGES === */}
      {activeTab === 'landing' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Landing Pages — {landingPagePerformance.length} Pages Analysées</h2>
                <p className="text-foreground-600 text-sm">Meilleure conversion : {Math.max(...landingPagePerformance.map(l => l.conversionRate))}% · Pire : {Math.min(...landingPagePerformance.map(l => l.conversionRate))}% · Sessions totales : {formatNumber(landingPagePerformance.reduce((s, l) => s + l.sessions, 0))}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Trier :</span>
                {[
                  { key: 'conversion', label: 'Conversion' },
                  { key: 'sessions', label: 'Sessions' },
                ].map((o) => (
                  <button key={o.key} onClick={() => setSortLanding(o.key as typeof sortLanding)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${sortLanding === o.key ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
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
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Sessions</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Bounce</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Conv.</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Temps</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Scroll</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Clics CTA</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Goals</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedLanding.map((lp) => (
                      <tr key={lp.id} className="border-t border-background-100 hover:bg-background-50/70">
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold text-foreground-950 block max-w-[250px] truncate">{lp.title}</span>
                          <span className="text-[9px] text-foreground-400 block font-mono truncate max-w-[250px]">{lp.url}</span>
                        </td>
                        <td className="px-4 py-3 text-xs font-bold text-foreground-700">{formatNumber(lp.sessions)}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold ${lp.bounceRate <= 55 ? 'text-emerald-600' : lp.bounceRate <= 60 ? 'text-amber-600' : 'text-red-500'}`}>{lp.bounceRate}%</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-12 h-2 rounded-full bg-background-200 overflow-hidden">
                              <div className={`h-full rounded-full ${lp.conversionRate >= 4 ? 'bg-emerald-500' : lp.conversionRate >= 2.5 ? 'bg-amber-500' : 'bg-red-400'}`} style={{ width: `${Math.min(lp.conversionRate * 15, 100)}%` }} />
                            </div>
                            <span className="text-xs font-bold text-foreground-700">{lp.conversionRate}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-foreground-600">{lp.avgTimeOnPage}</td>
                        <td className="px-4 py-3 text-xs text-foreground-600">{lp.scrollDepth}%</td>
                        <td className="px-4 py-3 text-xs text-foreground-600">{lp.ctaClicks}</td>
                        <td className="px-4 py-3 text-xs font-bold text-emerald-600">{lp.goalCompletions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: CTA === */}
      {activeTab === 'cta' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Analyse CTA — {ctaAnalysis.length} Call-to-Actions</h2>
                <p className="text-foreground-600 text-sm">{ctaAnalysis.reduce((s, c) => s + c.clicks, 0)} clics · {ctaAnalysis.reduce((s, c) => s + c.conversions, 0)} conversions · CTR moyen : {overview.ctaClickRate}%</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Type :</span>
                <select value={ctaFilter} onChange={(e) => setCtaFilter(e.target.value as typeof ctaFilter)}
                  className="px-3 py-1.5 rounded-full text-xs font-bold bg-background-50 border border-background-200 text-foreground-600 cursor-pointer outline-none">
                  <option value="all">Tous</option>
                  {['Diagnostic', 'Lead Magnet', 'Calendly', 'Newsletter', 'Premium Content', 'Contact', 'Tool', 'Navigation'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-3">
              {filteredCTA.map((cta) => (
                <div key={cta.id} className="rounded-2xl border border-background-200/70 bg-background-50 p-5">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex items-start gap-3 min-w-0 lg:w-80 flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: cta.conversionRate >= 10 ? '#DCFCE7' : cta.conversionRate >= 7 ? '#FEF3C7' : '#FEE2E2' }}>
                        <i className={`text-lg ${cta.conversionRate >= 10 ? 'ri-check-double-line text-emerald-600' : cta.conversionRate >= 7 ? 'ri-check-line text-amber-600' : 'ri-close-line text-red-500'}`} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-foreground-950 block">{cta.id}</span>
                        <span className="text-sm font-semibold text-foreground-800 block mt-0.5">{cta.label}</span>
                        <span className="text-[10px] text-foreground-400">{cta.type} · {cta.placement}</span>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Impressions</span><span className="text-xs font-bold text-foreground-700">{formatNumber(cta.impressions)}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Clics / CTR</span><span className="text-xs font-bold text-foreground-700">{cta.clicks} ({cta.clickRate}%)</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Conversions</span><span className="text-xs font-bold text-emerald-600">{cta.conversions} ({cta.conversionRate}%)</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Placement</span><span className="text-xs font-bold text-foreground-700">{cta.placement}</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: FORMS === */}
      {activeTab === 'forms' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Optimisation Formulaires — {formOptimization.length} Formulaires</h2>
              <p className="text-foreground-600 text-sm">Taux complétion moyen : {overview.formCompletionRate}% · Meilleur : {Math.max(...formOptimization.map(f => f.completionRate))}% · Pire : {Math.min(...formOptimization.map(f => f.completionRate))}%</p>
            </div>
            <div className="space-y-3">
              {formOptimization.map((form) => (
                <div key={form.id} className={`rounded-2xl border p-5 ${form.completionRate < 50 ? 'border-red-200 bg-red-50/20' : form.completionRate < 70 ? 'border-amber-200 bg-amber-50/10' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex items-start gap-3 min-w-0 lg:w-80 flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: form.completionRate >= 80 ? '#DCFCE7' : form.completionRate >= 60 ? '#FEF3C7' : '#FEE2E2' }}>
                        <span className="text-lg font-bold font-heading" style={{ color: form.completionRate >= 80 ? '#16A34A' : form.completionRate >= 60 ? '#D97706' : '#DC2626' }}>{form.completionRate}%</span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-foreground-950">{form.id}</span>
                        <h4 className="text-sm font-bold text-foreground-950 mt-1">{form.name}</h4>
                        <span className="text-[10px] text-foreground-500">{form.fields.length} champs · {form.avgTimeToComplete} min</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {form.fields.map((f) => (
                          <span key={f} className={`text-[10px] px-2 py-1 rounded-full border font-bold ${f === form.dropoffField ? 'bg-red-50 border-red-300 text-red-700' : 'bg-background-100 border-background-200 text-foreground-500'}`}>
                            {f}{f === form.dropoffField ? ' ⚠️' : ''}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-foreground-500">
                        <span>Dropoff : <strong className="text-red-600">{form.dropoffField} ({form.dropoffRate}%)</strong></span>
                        <span>Mobile : <strong className={form.mobileCompletion >= 60 ? 'text-emerald-600' : 'text-amber-600'}>{form.mobileCompletion}%</strong></span>
                        <span>Temps : <strong className="text-foreground-700">{form.avgTimeToComplete}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: JOURNEYS === */}
      {activeTab === 'journeys' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Parcours Utilisateur — {userJourneys.length} Chemins de Conversion</h2>
                <p className="text-foreground-600 text-sm">Meilleur taux : {Math.max(...userJourneys.map(j => j.conversionRate))}% · Sessions totales : {formatNumber(userJourneys.reduce((s, j) => s + j.sessions, 0))}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Trier :</span>
                {[
                  { key: 'conversion', label: 'Conversion' },
                  { key: 'value', label: 'Valeur' },
                ].map((o) => (
                  <button key={o.key} onClick={() => setJourneySort(o.key as typeof journeySort)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${journeySort === o.key ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {sortedJourneys.map((j) => (
                <div key={j.id} className="rounded-2xl border border-background-200/70 bg-background-50 p-5">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex items-start gap-3 min-w-0 lg:w-80 flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: j.conversionRate >= 15 ? '#DCFCE7' : j.conversionRate >= 8 ? '#FEF3C7' : '#FEE2E2' }}>
                        <i className={`text-lg ${j.entryPage === 'Direct' ? 'ri-shield-star-line text-emerald-600' : j.entryPage === 'LinkedIn' ? 'ri-linkedin-box-line text-blue-500' : 'ri-google-line text-foreground-600'}`} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-foreground-950 block">{j.id}</span>
                        <span className="text-sm text-foreground-700 block mt-0.5">{j.path}</span>
                        <span className="text-[10px] text-foreground-400">{j.sessions} sessions · {j.avgSteps} étapes moy.</span>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="text-center bg-background-100 rounded-lg p-2">
                        <span className="block text-[9px] text-foreground-400">Conversion</span>
                        <span className={`text-xs font-bold ${j.conversionRate >= 15 ? 'text-emerald-600' : j.conversionRate >= 8 ? 'text-amber-600' : 'text-foreground-700'}`}>{j.conversionRate}%</span>
                      </div>
                      <div className="text-center bg-background-100 rounded-lg p-2">
                        <span className="block text-[9px] text-foreground-400">Valeur/Parcours</span>
                        <span className="text-xs font-bold text-accent-600">{j.valuePerJourney}</span>
                      </div>
                      <div className="text-center bg-background-100 rounded-lg p-2">
                        <span className="block text-[9px] text-foreground-400">Entrée</span>
                        <span className="text-xs font-bold text-foreground-700">{j.entryPage}</span>
                      </div>
                      <div className="text-center bg-background-100 rounded-lg p-2">
                        <span className="block text-[9px] text-foreground-400">Sortie Principale</span>
                        <span className="text-xs font-bold text-red-500">{j.topExit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: A/B TESTS === */}
      {activeTab === 'abtests' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Tests A/B — {abTests.length} Tests</h2>
              <p className="text-foreground-600 text-sm">{abTests.filter(a => a.status === 'Terminé').length} terminés · Lift moyen +24.7% · {abTests.filter(a => a.status === 'En cours').length} en cours</p>
            </div>
            <div className="space-y-3">
              {abTests.map((ab) => (
                <div key={ab.id} className={`rounded-2xl border p-5 ${ab.status === 'En cours' ? 'border-amber-200 bg-amber-50/10' : ab.lift.includes('+') && parseInt(ab.lift.replace(/\D/g, '')) >= 20 ? 'border-emerald-200 bg-emerald-50/20' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex items-start gap-3 min-w-0 lg:w-80 flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: ab.status === 'Terminé' ? '#DCFCE7' : '#FEF3C7' }}>
                        <i className={`text-lg ${ab.status === 'Terminé' ? 'ri-check-double-line text-emerald-600' : 'ri-timer-line text-amber-600'}`} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-foreground-950 block">{ab.id}</span>
                        <span className="text-sm font-semibold text-foreground-800 block mt-0.5">{ab.name}</span>
                        <span className="text-[10px] text-foreground-400">{ab.page} · {ab.status}</span>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <div className="text-center bg-background-100 rounded-lg p-2">
                        <span className="block text-[9px] text-foreground-400">Vainqueur</span>
                        <span className="text-xs font-bold text-emerald-600">{ab.winnerLabel}</span>
                      </div>
                      <div className="text-center bg-background-100 rounded-lg p-2">
                        <span className="block text-[9px] text-foreground-400">Lift</span>
                        <span className={`text-xs font-bold ${ab.lift.includes('+') ? 'text-emerald-600' : 'text-foreground-400'}`}>{ab.lift}</span>
                      </div>
                      <div className="text-center bg-background-100 rounded-lg p-2">
                        <span className="block text-[9px] text-foreground-400">Confiance</span>
                        <span className={`text-xs font-bold ${ab.confidence >= 95 ? 'text-emerald-600' : ab.confidence >= 90 ? 'text-amber-600' : 'text-foreground-400'}`}>{ab.confidence > 0 ? `${ab.confidence}%` : '—'}</span>
                      </div>
                    </div>
                    <div className="lg:w-72 flex-shrink-0 bg-background-100 rounded-xl p-3">
                      <p className="text-[10px] text-foreground-600"><strong className="text-foreground-800">Insight :</strong> {ab.insight}</p>
                      <p className="text-[10px] text-foreground-500 mt-1"><strong className="text-foreground-700">Action :</strong> {ab.recommendation}</p>
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
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Quick Wins CRO — {quickWinsCRO.length} Actions Prioritaires</h2>
              <p className="text-foreground-600 text-sm">{quickWinsCRO.filter(q => q.impact === 'Critique').length} critiques · {quickWinsCRO.filter(q => q.impact === 'Haute').length} hautes · Effort total : {quickWinsCRO.reduce((s, q) => { const h = parseInt(q.effort) || 0; return s + h; }, 0)}h</p>
            </div>
            <div className="space-y-3">
              {quickWinsCRO.map((qw) => (
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
                      <p className="text-[10px] text-foreground-500 mt-1">{qw.detail}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] text-foreground-500">
                        <span><i className="ri-timer-line mr-1" />{qw.effort}</span>
                        <span className="text-emerald-600 font-bold"><i className="ri-line-chart-line mr-1" />{qw.expectedLift}</span>
                        <span className="text-amber-600 font-semibold"><i className="ri-money-dollar-circle-line mr-1" />{qw.expectedRevenue}</span>
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
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème KOS — CRO & Conversion SEO</h2>
            <p className="text-foreground-600">Le hub CRO transforme le trafic SEO en leads qualifiés — connecté à l'écosystème d'audit.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'CRO & Conversion', path: '/kos-seo-cro-conversion', icon: 'ri-line-chart-line', color: '#86BC25', current: true },
              { label: 'SEO Analytics & Comp.', path: '/kos-seo-analytics-competitive', icon: 'ri-bar-chart-2-line', color: '#F59E0B' },
              { label: 'Content Strategy', path: '/kos-seo-content-strategy', icon: 'ri-file-text-line', color: '#D97757' },
              { label: 'SEO On-Page', path: '/kos-seo-onpage-content', icon: 'ri-file-search-line', color: '#CA8A04' },
              { label: 'Social SEO', path: '/kos-seo-social-authority', icon: 'ri-share-line', color: '#4A7A1E' },
              { label: 'Lead Scoring', path: '/kos-lead-scoring-command', icon: 'ri-brain-line', color: '#9B7B2C' },
              { label: 'Growth Engine', path: '/kos-khepra-growth-engine', icon: 'ri-funds-line', color: '#C05A3A' },
              { label: 'A/B Tests Lab', path: '/kos-seo-cro-conversion', icon: 'ri-test-tube-line', color: '#4285F4' },
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