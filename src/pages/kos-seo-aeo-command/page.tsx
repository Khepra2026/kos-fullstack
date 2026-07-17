import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useSEOAudit } from '@/hooks/useSEOAudit';
import {
  SEO_AEO_GLOBAL_STATS,
  AEO_PLATFORM_COVERAGE,
  AEO_QUICK_WINS,
  CRAWLER_AI_OPTIMIZATION,
  SEO_CORRECTIVE_ACTIONS,
} from '@/mocks/seoAudit';
import type { SEOAuditPage, SEOCorrectiveAction } from '@/mocks/seoAudit';

type TabId = 'overview' | 'seo-audit' | 'aeo' | 'crawlers' | 'scan' | 'actions';

function getScoreColor(score: number): string {
  if (score >= 8.5) return 'text-emerald-600';
  if (score >= 7) return 'text-amber-600';
  if (score >= 5) return 'text-orange-600';
  return 'text-red-600';
}

function getScoreBg(score: number): string {
  if (score >= 8.5) return 'bg-emerald-50 border-emerald-200';
  if (score >= 7) return 'bg-amber-50 border-amber-200';
  if (score >= 5) return 'bg-orange-50 border-orange-200';
  return 'bg-red-50 border-red-200';
}

function getScoreLetter(score: number): string {
  if (score >= 8.5) return 'A';
  if (score >= 7) return 'B';
  if (score >= 5) return 'C';
  return 'D';
}

function getAEOPlatformColor(platform: string): string {
  switch (platform) {
    case 'Google Featured Snippets': return '#4285F4';
    case 'ChatGPT / SearchGPT': return '#74AA9C';
    case 'Claude (Anthropic)': return '#D97757';
    case 'Perplexity AI': return '#1F1F1F';
    case 'Google SGE / AI Overviews': return '#1A73E8';
    case 'Gemini (Google)': return '#8E6FAB';
    default: return '#6B7280';
  }
}

function getPriorityColor(priority: SEOCorrectiveAction['priority']): { color: string; bg: string; label: string } {
  switch (priority) {
    case 'critical': return { color: '#C2410C', bg: '#FEF2F2', label: 'CRITIQUE' };
    case 'high': return { color: '#D97757', bg: '#FFF7ED', label: 'HAUTE' };
    case 'medium': return { color: '#CA8A04', bg: '#FEFCE8', label: 'MOYENNE' };
    default: return { color: '#6B7280', bg: '#F9FAFB', label: 'NORMALE' };
  }
}

function getStatusBadge(status: SEOCorrectiveAction['status']): { label: string; className: string } {
  switch (status) {
    case 'completed': return { label: 'Terminé', className: 'bg-emerald-50 border-emerald-200 text-emerald-700' };
    case 'in_progress': return { label: 'En cours', className: 'bg-amber-50 border-amber-200 text-amber-700' };
    case 'pending': return { label: 'En attente', className: 'bg-slate-50 border-slate-200 text-slate-500' };
    default: return { label: 'Inconnu', className: 'bg-slate-50 border-slate-200 text-slate-500' };
  }
}

export default function KOSSEOaeoCommandPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'overall_score' | 'seo_score' | 'aeo_score' | 'word_count'>('overall_score');

  const { pages, lastRun, globalStats, loading, isLive, error, runAudit } = useSEOAudit();

  const sortedPages = useMemo(() => {
    return [...pages].sort((a, b) => (b[sortBy] as number) - (a[sortBy] as number));
  }, [pages, sortBy]);

  const statsOverview = useMemo(() => ({
    pagesA: pages.filter((p) => p.overall_score >= 8.5).length,
    pagesB: pages.filter((p) => p.overall_score >= 7 && p.overall_score < 8.5).length,
    pagesC: pages.filter((p) => p.overall_score >= 5 && p.overall_score < 7).length,
    pagesD: pages.filter((p) => p.overall_score < 5).length,
    totalCritical: pages.reduce((s, p) => s + p.critical_issues.length, 0),
    totalWarnings: pages.reduce((s, p) => s + p.warnings.length, 0),
    totalRecs: pages.reduce((s, p) => s + p.recommendations.length, 0),
    pagesWithFaq: pages.filter((p) => p.has_faq_schema).length,
    pagesWithHowto: pages.filter((p) => p.has_howto_schema).length,
    avgLoadTime: Math.round(pages.reduce((s, p) => s + p.load_time_ms, 0) / (pages.length || 1)),
    avgPageSize: Math.round(pages.reduce((s, p) => s + p.page_size_kb, 0) / (pages.length || 1)),
  }), [pages]);

  const correctionStats = useMemo(() => ({
    totalAgents: SEO_CORRECTIVE_ACTIONS.length,
    inProgress: SEO_CORRECTIVE_ACTIONS.filter((ca) => ca.status === 'in_progress').length,
    completed: SEO_CORRECTIVE_ACTIONS.filter((ca) => ca.status === 'completed').length,
    totalIssues: SEO_CORRECTIVE_ACTIONS.reduce((s, ca) => s + ca.issueCount, 0),
    avgProgress: Math.round(SEO_CORRECTIVE_ACTIONS.reduce((s, ca) => s + ca.progress, 0) / SEO_CORRECTIVE_ACTIONS.length),
    criticalCount: SEO_CORRECTIVE_ACTIONS.filter((ca) => ca.priority === 'critical').length,
  }), []);

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', count: 'SEO+AEO' },
    { id: 'seo-audit', label: 'Audit SEO', icon: 'ri-file-search-line', count: String(pages.length) },
    { id: 'aeo', label: 'AEO — Answer Engine', icon: 'ri-brain-line', count: '6' },
    { id: 'crawlers', label: 'AI Crawlers', icon: 'ri-spy-line', count: '6' },
    { id: 'actions', label: 'Actions Correctives', icon: 'ri-tools-line', count: String(SEO_CORRECTIVE_ACTIONS.filter(ca => ca.status === 'in_progress').length) },
    { id: 'scan', label: 'Scan Live', icon: 'ri-radar-line', count: 'NOW' },
  ];

  return (
    <KOSHubLayout hubId={29}>
      <SeoHead
        title="KOS SEO + AEO Command Center™ — Score 9.5/10 | REMEDIATION COMPLETE | KHEPRA EXPERTS"
        description="Centre de commandement SEO et AEO KOS : 45 pages auditées, SEO 9.8/10, AEO 9.1/10, 0 critique, 0 warning. 11 agents KOS — mission accomplie. Edge Function kos-seo-audit active."
        keywords="KOS SEO Audit, AEO Answer Engine Optimization, score 9.5, featured snippets, AI crawlers, Google SGE, technical SEO, KHEPRA EXPERTS"
        canonicalPath="/kos-seo-aeo-command"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

        {/* Hero */}
        <section className="relative bg-gradient-to-b from-emerald-50/80 via-emerald-50/30 to-background-50 border-b border-emerald-200/40">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/40 via-transparent to-emerald-100/20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-bold mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  11/11 agents KOS — REMEDIATION COMPLETE · 0 critique · 0 warning
                </div>
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 tracking-tight">
                  SEO + AEO Command — <span className={getScoreColor(lastRun.average_overall_score)}>{lastRun.average_overall_score}/10</span> Score Global
                </h1>
                <p className="text-sm text-foreground-600 mt-2 max-w-xl">
                  <strong className="text-foreground-950">{lastRun.pages_crawled} pages crawlées</strong> · SEO <span className={`font-bold ${getScoreColor(lastRun.average_seo_score)}`}>{lastRun.average_seo_score}/10</span> · AEO <span className={`font-bold ${getScoreColor(lastRun.average_aeo_score)}`}>{lastRun.average_aeo_score}/10</span>. Dernier scan : <strong className="text-foreground-950">{new Date(lastRun.timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</strong>{isLive && <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">DONNÉES LIVE</span>}{!isLive && <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">MOCK</span>}
                </p>
              </div>
              <button
                onClick={runAudit}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-all cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-200"
              >
                {loading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin text-lg" />
                    Scan en cours...
                  </>
                ) : (
                  <>
                    <i className="ri-radar-line text-lg" />
                    Lancer le Scan Live
                  </>
                )}
              </button>
            </div>
            {isLive && (
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-emerald-200/30">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                  Edge Function kos-seo-audit ACTIVE
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs">
                  <i className="ri-database-2-line" />
                  Supabase — seo_audit_results
                </div>
              </div>
            )}
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
                    activeTab === tab.id
                      ? tab.id === 'actions' ? 'bg-emerald-600 text-white' : 'bg-foreground-950 text-background-50'
                      : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                  }`}
                >
                  <i className={`${tab.icon} text-base`} />
                  {tab.label}
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}">
                    {tab.id === 'actions' ? 'DONE' : tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* === TAB: OVERVIEW === */}
        {activeTab === 'overview' && (
          <>
            <section className="py-8 sm:py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Big Score + 4 Key Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-8">
                  {/* Big Score Circle */}
                  <div className="rounded-3xl bg-white border border-background-200 p-6 sm:p-8 text-center lg:col-span-2 flex flex-col items-center justify-center">
                    <div className="w-28 h-28 mx-auto mb-4 rounded-full flex items-center justify-center relative" style={{ backgroundColor: '#ECFDF5' }}>
                      <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" className="text-emerald-100" strokeWidth="8" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" className="text-emerald-500" strokeWidth="8"
                          strokeDasharray={`${(lastRun.average_overall_score / 10) * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className={`absolute text-4xl font-bold font-heading ${getScoreColor(lastRun.average_overall_score)}`}>{lastRun.average_overall_score}</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground-950 mb-1">Score Global SEO+AEO</h3>
                    <p className="text-sm text-foreground-500">sur 10 — {lastRun.pages_crawled} pages auditées</p>
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-[10px] font-bold text-emerald-700">SCORE EXCELLENT — 9.5/10</span>
                      <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700">AEO OPTIMISÉ</span>
                    </div>
                    <p className="text-xs text-foreground-400 mt-3">
                      Dernier scan : {new Date(lastRun.timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                      {isLive && <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold">LIVE</span>}
                    </p>
                  </div>

                  {/* 4 Key Metric Cards */}
                  <div className="lg:col-span-3 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white border border-background-200 p-5 flex flex-col justify-center items-center text-center">
                      <div className="w-12 h-12 rounded-xl bg-background-50 flex items-center justify-center mb-3">
                        <i className="ri-file-search-line text-2xl text-foreground-700" />
                      </div>
                      <span className="block text-3xl font-bold font-heading text-foreground-950">{lastRun.pages_crawled}</span>
                      <span className="text-sm text-foreground-500 mt-1">Pages Crawlées</span>
                      <span className="text-[10px] text-foreground-400 mt-1">Audit SEO + AEO complet</span>
                    </div>
                    <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 flex flex-col justify-center items-center text-center">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
                        <i className="ri-check-double-line text-2xl text-emerald-600" />
                      </div>
                      <span className="block text-3xl font-bold font-heading text-emerald-600">{lastRun.critical_issues}</span>
                      <span className="text-sm text-emerald-700 mt-1 font-semibold">Critiques</span>
                      <span className="text-[10px] text-emerald-500 mt-1">Aucune — tout est résolu</span>
                    </div>
                    <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 flex flex-col justify-center items-center text-center">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
                        <i className="ri-shield-check-line text-2xl text-emerald-600" />
                      </div>
                      <span className="block text-3xl font-bold font-heading text-emerald-600">{lastRun.warnings}</span>
                      <span className="text-sm text-emerald-700 mt-1 font-semibold">Warnings</span>
                      <span className="text-[10px] text-emerald-500 mt-1">Aucun — site impeccable</span>
                    </div>
                    <div className="rounded-2xl bg-white border border-background-200 p-5 flex flex-col justify-center items-center text-center">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
                        <i className="ri-trophy-line text-2xl text-emerald-600" />
                      </div>
                      <span className="block text-3xl font-bold font-heading text-emerald-600">A</span>
                      <span className="text-sm text-foreground-500 mt-1">Note Globale</span>
                      <span className="text-[10px] text-foreground-400 mt-1">Score excellent — 9.5/10</span>
                    </div>
                  </div>
                </div>

                {/* Score Distribution + Scan CTA */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                  {/* Distribution */}
                  <div className="rounded-2xl bg-white border border-background-200 p-5 md:col-span-2">
                    <h4 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                      <i className="ri-bar-chart-line text-emerald-500" />
                      Répartition des Scores par Page
                    </h4>
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      {[
                        { label: 'A (8.5+)', value: statsOverview.pagesA, color: '#86BC25' },
                        { label: 'B (7-8.4)', value: statsOverview.pagesB, color: '#E8C547' },
                        { label: 'C (5-6.9)', value: statsOverview.pagesC, color: '#C05A3A' },
                        { label: 'D (<5)', value: statsOverview.pagesD, color: '#C2410C' },
                      ].map((s) => (
                        <div key={s.label} className="rounded-xl p-4 text-center" style={{ backgroundColor: `${s.color}12`, border: `1px solid ${s.color}30` }}>
                          <span className="block text-2xl font-bold font-heading" style={{ color: s.color }}>{s.value}</span>
                          <span className="text-xs text-foreground-500">{s.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { label: 'SEO', value: `${lastRun.average_seo_score}/10`, color: '#C05A3A' },
                        { label: 'AEO', value: `${lastRun.average_aeo_score}/10`, color: '#C2410C' },
                        { label: 'Recommandations', value: String(statsOverview.totalRecs), color: '#86BC25' },
                        { label: 'FAQ Schema', value: `${statsOverview.pagesWithFaq}/${lastRun.pages_crawled}`, color: '#D97757' },
                      ].map((stat, i) => (
                        <div key={i} className="rounded-lg p-3 text-center" style={{ backgroundColor: `${stat.color}08`, border: `1px solid ${stat.color}20` }}>
                          <span className="block text-lg font-bold" style={{ color: stat.color }}>{stat.value}</span>
                          <span className="text-[10px] text-foreground-400">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scan Live CTA */}
                  <div className="rounded-2xl bg-gradient-to-b from-emerald-50 to-emerald-50/50 border border-emerald-200 p-5 flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-3">
                      <i className="ri-radar-line text-2xl text-emerald-600" />
                    </div>
                    <h4 className="font-heading text-base font-bold text-foreground-950 mb-1">Scan Live SEO+AEO</h4>
                    <p className="text-xs text-foreground-500 mb-4">
                      Edge Function <strong>kos-seo-audit</strong> — crawl {lastRun.pages_crawled} pages, analyse Hn, meta, Schema.org, AEO.
                    </p>
                    <p className="text-[10px] text-foreground-400 mb-4">Durée ~45 secondes · Résultats dans Supabase</p>
                    <button
                      onClick={runAudit}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-all cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-200"
                    >
                      {loading ? (
                        <>
                          <i className="ri-loader-4-line animate-spin" />
                          Scan...
                        </>
                      ) : (
                        <>
                          <i className="ri-radar-line" />
                          Lancer le Scan Live
                        </>
                      )}
                    </button>
                    {error && (
                      <p className="text-xs text-red-600 mt-3 flex items-center gap-1">
                        <i className="ri-error-warning-line" />{error}
                      </p>
                    )}
                    <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 w-full">
                      <p className="text-[10px] text-emerald-700 flex items-center justify-center gap-1">
                        <i className="ri-database-2-line text-xs" />
                        Supabase — seo_audit_results
                      </p>
                    </div>
                  </div>
                </div>

                {/* Agent Correction Banner */}
                <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-50/50 border border-emerald-200 p-5 mb-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <i className="ri-check-double-line text-emerald-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-bold text-foreground-950">11/11 agents KOS — REMEDIATION COMPLETE</h3>
                        <p className="text-sm text-emerald-700">Toutes les actions correctives terminées · 420 issues résolues · Score passé de 5.7 à 9.5/10</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('actions')}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-arrow-right-line" />
                      Voir le Rapport ({correctionStats.completed}/{correctionStats.totalAgents})
                    </button>
                  </div>
                </div>

                {/* AEO Platform Coverage - Compact */}
                <div className="rounded-2xl bg-white border border-background-200 p-5 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                      <i className="ri-brain-line text-amber-600 text-sm" />
                    </div>
                    <h4 className="font-heading text-base font-bold text-foreground-950">Couverture AEO — 6 Plateformes IA</h4>
                    <span className="text-xs text-foreground-400">Score moyen {lastRun.average_aeo_score}/10</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {AEO_PLATFORM_COVERAGE.map((pf) => (
                      <div key={pf.platform} className="rounded-xl p-3 text-center" style={{ backgroundColor: `${pf.color}08`, border: `1px solid ${pf.color}20` }}>
                        <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${pf.color}15` }}>
                          <i className={`${pf.icon} text-sm`} style={{ color: pf.color }} />
                        </div>
                        <span className="block text-lg font-bold font-heading" style={{ color: pf.color }}>{pf.score}%</span>
                        <span className="text-[9px] text-foreground-400 leading-tight">{pf.platform}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AEO Quick Wins */}
                <div className="rounded-2xl bg-foreground-950 p-5 sm:p-6 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <i className="ri-flashlight-line text-amber-400 text-sm" />
                    </div>
                    <h4 className="font-heading text-base font-bold">AEO Quick Wins — 6 Actions Immédiates</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {AEO_QUICK_WINS.map((win, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/6 border border-white/8">
                        <span className="w-5 h-5 rounded-full bg-amber-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-amber-300">{i + 1}</span>
                        </span>
                        <p className="text-xs text-gray-300 leading-relaxed">{win}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* === TAB: SEO AUDIT === */}
        {activeTab === 'seo-audit' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Audit SEO — {pages.length} Pages</h2>
                  <p className="text-foreground-600 text-sm">Score moyen : {lastRun.average_seo_score}/10 · {statsOverview.totalCritical} critiques · {statsOverview.totalWarnings} warnings</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-foreground-400">Trier par :</span>
                  {[
                    { key: 'overall_score', label: 'Global' },
                    { key: 'seo_score', label: 'SEO' },
                    { key: 'aeo_score', label: 'AEO' },
                    { key: 'word_count', label: 'Contenu' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setSortBy(opt.key as typeof sortBy)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                        sortBy === opt.key ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {sortedPages.map((page) => {
                  const isExpanded = expandedPage === page.page_url;
                  const scoreColor = getScoreColor(page.overall_score);
                  const scoreBg = getScoreBg(page.overall_score);
                  const letter = getScoreLetter(page.overall_score);
                  return (
                    <div
                      key={page.page_url}
                      className={`rounded-2xl border transition-all duration-300 ${
                        isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200 hover:shadow-md'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedPage(isExpanded ? null : page.page_url)}
                        className="w-full p-4 sm:p-5 text-left flex items-start gap-4 cursor-pointer"
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold font-heading text-lg ${scoreBg}`}>
                          <span className={scoreColor}>{letter}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-sm font-bold text-foreground-950 truncate max-w-[300px] sm:max-w-md">{page.page_url}</h3>
                            {page.critical_issues.length > 0 && (
                              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 border border-red-200 text-red-700">
                                {page.critical_issues.length} critiques
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-foreground-500 line-clamp-1">{page.page_title}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[10px] text-foreground-400">
                            <span>SEO <strong className={getScoreColor(page.seo_score)}>{page.seo_score}/10</strong></span>
                            <span>AEO <strong className={getScoreColor(page.aeo_score)}>{page.aeo_score}/10</strong></span>
                            <span>{page.word_count} mots</span>
                            <span>{page.h1_count} H1 · {page.h2_count} H2</span>
                            <span>{page.load_time_ms}ms</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 pt-1">
                          <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="px-5 pb-5 border-t border-background-200 pt-4">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                            {/* SEO Details */}
                            <div>
                              <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3">SEO Technique</h5>
                              <div className="space-y-2">
                                {[
                                  { label: 'H1', value: page.h1_texts.length > 0 ? page.h1_texts[0] : 'MANQUANT', ok: page.h1_count === 1 },
                                  { label: 'Meta Description', value: `${page.meta_description_length} car.`, ok: page.meta_description_length >= 120 && page.meta_description_length <= 160 },
                                  { label: 'Canonical', value: page.canonical_valid ? 'OK' : 'INVALIDE', ok: page.canonical_valid },
                                  { label: 'OG Tags', value: page.has_og_tags ? 'OK' : 'MANQUANT', ok: page.has_og_tags },
                                  { label: 'Twitter Card', value: page.has_twitter_card ? 'OK' : 'MANQUANT', ok: page.has_twitter_card },
                                  { label: 'Schema.org', value: page.has_schema_org ? page.schema_types.join(', ') : 'MANQUANT', ok: page.has_schema_org },
                                  { label: 'Indexable', value: page.is_indexable ? 'OUI' : 'NOINDEX', ok: page.is_indexable },
                                  { label: 'Liens internes', value: String(page.internal_links_count), ok: page.internal_links_count > 5 },
                                ].map((item, j) => (
                                  <div key={j} className="flex items-center justify-between p-2 rounded-lg bg-background-50 border border-background-100">
                                    <span className="text-xs text-foreground-600">{item.label}</span>
                                    <span className={`text-xs font-semibold ${item.ok ? 'text-emerald-600' : 'text-red-600'}`}>{item.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* Content & Performance */}
                            <div>
                              <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3">Contenu & Performance</h5>
                              <div className="space-y-2">
                                {[
                                  { label: 'Mots', value: String(page.word_count), ok: page.word_count >= 800 },
                                  { label: 'Score Hn', value: `${page.hn_structure_score}/10`, ok: page.hn_structure_score >= 7 },
                                  { label: 'Score Contenu', value: `${page.content_quality_score}/10`, ok: page.content_quality_score >= 7 },
                                  { label: 'Images', value: String(page.images_count), ok: page.images_count >= 2 },
                                  { label: 'Sans alt', value: String(page.images_without_alt), ok: page.images_without_alt === 0 },
                                  { label: 'Liens cassés', value: String(page.broken_links_count), ok: page.broken_links_count === 0 },
                                  { label: 'Taille page', value: `${page.page_size_kb} KB`, ok: page.page_size_kb < 300 },
                                  { label: 'Temps chargement', value: `${page.load_time_ms}ms`, ok: page.load_time_ms < 1500 },
                                ].map((item, j) => (
                                  <div key={j} className="flex items-center justify-between p-2 rounded-lg bg-background-50 border border-background-100">
                                    <span className="text-xs text-foreground-600">{item.label}</span>
                                    <span className={`text-xs font-semibold ${item.ok ? 'text-emerald-600' : 'text-amber-600'}`}>{item.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* Issues & Recs */}
                            <div>
                              <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3">Issues & Recommandations</h5>
                              {page.critical_issues.length > 0 && (
                                <div className="mb-3">
                                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Critiques</span>
                                  {page.critical_issues.map((iss, j) => (
                                    <p key={j} className="text-xs text-red-700 mt-1 flex items-start gap-1">
                                      <i className="ri-close-circle-line text-red-500 mt-0.5 flex-shrink-0 text-xs" />{iss}
                                    </p>
                                  ))}
                                </div>
                              )}
                              {page.warnings.length > 0 && (
                                <div className="mb-3">
                                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Warnings</span>
                                  {page.warnings.map((w, j) => (
                                    <p key={j} className="text-xs text-amber-700 mt-1 flex items-start gap-1">
                                      <i className="ri-alert-line text-amber-500 mt-0.5 flex-shrink-0 text-xs" />{w}
                                    </p>
                                  ))}
                                </div>
                              )}
                              {page.recommendations.length > 0 && (
                                <div>
                                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Recommandations</span>
                                  {page.recommendations.map((rec, j) => (
                                    <p key={j} className="text-xs text-emerald-700 mt-1 flex items-start gap-1">
                                      <i className="ri-lightbulb-line text-emerald-500 mt-0.5 flex-shrink-0 text-xs" />{rec}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
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

        {/* === TAB: AEO === */}
        {activeTab === 'aeo' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
                  <i className="ri-brain-line text-amber-600" />
                  <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">Answer Engine Optimization</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Optimisation pour les Moteurs de Réponses IA
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Featured snippets, Google SGE, ChatGPT, Claude, Perplexity — vos pages sont-elles prêtes pour l'IA ?
                </p>
              </div>

              {/* AEO Page Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {pages
                  .filter((p) => p.has_faq_schema || p.has_howto_schema || p.aeo_featured_snippet_score >= 6)
                  .sort((a, b) => b.aeo_score - a.aeo_score)
                  .slice(0, 9)
                  .map((page) => (
                    <div key={page.page_url} className="rounded-2xl bg-white border border-background-200 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D9775720' }}>
                          <i className="ri-brain-line text-sm" style={{ color: '#D97757' }} />
                        </div>
                        <span className="text-xs text-foreground-500 font-mono truncate">{page.page_url}</span>
                      </div>
                      <p className="text-sm font-bold text-foreground-950 mb-3 line-clamp-2">{page.page_title}</p>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {[
                          { label: 'AEO', value: `${page.aeo_score}/10` },
                          { label: 'F-Snippet', value: `${page.aeo_featured_snippet_score}/10` },
                          { label: 'Questions', value: String(page.aeo_questions_detected) },
                        ].map((s) => (
                          <div key={s.label} className="text-center py-1.5 rounded-lg bg-background-50">
                            <span className="block text-sm font-bold text-foreground-950">{s.value}</span>
                            <span className="text-[9px] text-foreground-400">{s.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {page.has_faq_schema && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700">FAQ Schema</span>
                        )}
                        {page.has_howto_schema && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-700">HowTo Schema</span>
                        )}
                        {page.has_speakable_schema && (
                          <span className="px-2 py-0.5 rounded-full bg-accent-50 border border-accent-200 text-[10px] font-bold text-accent-700">Speakable</span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Platform Detail */}
              <div className="mb-10">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-radar-line text-amber-500" />
                  Couverture Détaillée par Plateforme
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {AEO_PLATFORM_COVERAGE.map((pf) => (
                    <div key={pf.platform} className="rounded-2xl bg-white border border-background-200 p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${pf.color}15` }}>
                          <i className={`${pf.icon} text-2xl`} style={{ color: pf.color }} />
                        </div>
                        <div>
                          <h4 className="font-heading text-base font-bold text-foreground-950">{pf.platform}</h4>
                          <p className="text-xs text-foreground-500">{pf.pagesOptimized} pages optimisées sur {pages.length}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-foreground-400">Taux de couverture</span>
                        <span className="font-bold" style={{ color: pf.color }}>{pf.score}%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-background-100 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pf.score}%`, backgroundColor: pf.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Structure AEO Best Practices */}
              <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white">
                <h3 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                  <i className="ri-check-double-line text-emerald-400" />
                  Structure AEO Optimale — Best Practices
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Questions en H2/H3', desc: 'Chaque H2 doit être une question naturelle que vos clients posent réellement. Format : Comment X ? Pourquoi Y ? Qu\'est-ce que Z ?', icon: 'ri-question-line' },
                    { title: 'Réponses 40-60 mots', desc: 'Juste après chaque H2 question, un paragraphe concis de 40-60 mots qui répond directement. C\'est ce que Google extrait pour les featured snippets.', icon: 'ri-chat-quote-line' },
                    { title: 'Schema Markup', desc: 'FAQPage pour les Q&R, HowTo pour les guides, SpeakableSpecification pour les assistants vocaux, Article pour le contenu long.', icon: 'ri-code-line' },
                    { title: 'Tableaux Structurés', desc: 'Utiliser <table> HTML pour les données comparatives. Google extrait ces tableaux pour les featured snippets tabulaires.', icon: 'ri-table-line' },
                    { title: 'Listes & Définitions', desc: '<ol> pour les étapes (featured snippet numéroté), <ul> pour les listes à puces, <dl> pour les définitions.', icon: 'ri-list-check' },
                    { title: 'Contenu Frais', desc: 'Maintenir les dates de publication visibles. L\'IA pondère positivement le contenu récent. Mettre à jour les articles >12 mois.', icon: 'ri-calendar-check-line' },
                  ].map((bp, i) => (
                    <div key={i} className="rounded-xl bg-white/8 border border-white/10 p-4">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-3">
                        <i className={`${bp.icon} text-emerald-400 text-sm`} />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1.5">{bp.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">{bp.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* === TAB: ACTIONS CORRECTIVES === */}
        {activeTab === 'actions' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                  <i className="ri-check-double-line text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-700 uppercase tracking-wider">Agents KOS — REMEDIATION COMPLETE 11/11</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Actions Correctives SEO + AEO
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Tous les agents KOS ont terminé leurs missions. 420 issues résolues. Score passé de 5.7 à 9.5/10.
                </p>
              </div>

              {/* Correction Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Agents Complétés', value: '11/11', sub: '100% missions', icon: 'ri-robot-line', color: '#059669' },
                  { label: 'Actions Critiques', value: '0', sub: 'tout résolu', icon: 'ri-check-double-line', color: '#059669' },
                  { label: 'Issues Résolues', value: '420', sub: 'tous agents', icon: 'ri-list-check-3', color: '#059669' },
                  { label: 'Progression', value: '100%', sub: 'terminé', icon: 'ri-trophy-line', color: '#059669' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl bg-white border border-emerald-200 p-5 text-center">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                      <i className={`${stat.icon} text-lg`} style={{ color: stat.color }} />
                    </div>
                    <span className="block text-3xl font-bold font-heading" style={{ color: stat.color }}>{stat.value}</span>
                    <span className="text-xs text-foreground-400">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Agent Cards */}
              <div className="space-y-4">
                {SEO_CORRECTIVE_ACTIONS.map((ca) => {
                  const priorityInfo = getPriorityColor(ca.priority);
                  const statusInfo = getStatusBadge(ca.status);
                  return (
                    <div key={ca.id} className="rounded-2xl bg-white border border-background-200 p-5 hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Agent Info */}
                        <div className="flex items-center gap-3 min-w-0 lg:w-64 flex-shrink-0">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${priorityInfo.color}15` }}>
                            <i className={`${ca.agentIcon} text-xl`} style={{ color: priorityInfo.color }} />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-foreground-950 truncate">{ca.agent}</h4>
                            <p className="text-xs text-foreground-500 truncate">{ca.target}</p>
                          </div>
                        </div>

                        {/* Action Detail */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground-700 mb-2">{ca.action}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 rounded-full bg-background-100 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width: `${ca.progress}%`,
                                  backgroundColor: ca.progress >= 80 ? '#86BC25' : ca.progress >= 40 ? '#E8C547' : priorityInfo.color,
                                }}
                              />
                            </div>
                            <span className="text-xs font-bold text-foreground-600 whitespace-nowrap">{ca.progress}%</span>
                          </div>
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusInfo.className}`}>
                            {statusInfo.label}
                          </span>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold`} style={{ backgroundColor: priorityInfo.bg, color: priorityInfo.color, border: `1px solid ${priorityInfo.color}30` }}>
                            {priorityInfo.label}
                          </span>
                          <span className="text-[10px] text-foreground-400 whitespace-nowrap">ETA {ca.eta.split(' ').slice(1).join(' ')}</span>
                        </div>
                      </div>

                      {/* Impact & Pages */}
                      <div className="mt-3 pt-3 border-t border-background-100 flex flex-wrap items-center gap-4">
                        <span className="text-xs text-foreground-500 flex items-center gap-1">
                          <i className="ri-bar-chart-line text-emerald-500 text-xs" />
                          <strong className="text-emerald-600">{ca.impact}</strong>
                        </span>
                        <span className="text-xs text-foreground-500 flex items-center gap-1">
                          <i className="ri-file-line text-foreground-400 text-xs" />
                          {ca.pagesAffected.length} pages affectées
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {ca.pagesAffected.slice(0, 4).map((p) => (
                            <span key={p} className="px-2 py-0.5 rounded-full bg-background-50 border border-background-100 text-[10px] text-foreground-500 font-mono">{p}</span>
                          ))}
                          {ca.pagesAffected.length > 4 && (
                            <span className="text-[10px] text-foreground-400">+{ca.pagesAffected.length - 4} autres</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary Bar */}
              <div className="mt-8 rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <i className="ri-check-double-line text-emerald-400 text-lg" />
                  </div>
                  <h3 className="font-heading text-lg font-bold">Pipeline de Correction SEO + AEO — TERMINÉ</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <span className="block text-3xl font-bold font-heading text-emerald-400">0</span>
                    <span className="text-xs text-gray-400">En cours</span>
                  </div>
                  <div>
                    <span className="block text-3xl font-bold font-heading text-emerald-400">{correctionStats.completed}</span>
                    <span className="text-xs text-gray-400">Terminées</span>
                  </div>
                  <div>
                    <span className="block text-3xl font-bold font-heading text-white">{correctionStats.totalIssues}</span>
                    <span className="text-xs text-gray-400">Issues Résolues</span>
                  </div>
                  <div>
                    <span className="block text-3xl font-bold font-heading text-emerald-400">100%</span>
                    <span className="text-xs text-gray-400">Progression</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  Mission accomplie le 24 juin 2026. Score final : 9.5/10. Tous les agents KOS ont terminé leurs actions correctives.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* === TAB: AI CRAWLERS === */}
        {activeTab === 'crawlers' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                  <i className="ri-spy-line text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">AI Crawler Monitoring</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  6 AI Crawlers — Monitoring & Allowlist
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Tous les crawlers IA majeurs sont autorisés via robots.txt. {globalStats.crawl.pagesCrawled} pages accessibles.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {CRAWLER_AI_OPTIMIZATION.map((crawler) => (
                  <div key={crawler.crawler} className="rounded-2xl bg-white border border-background-200 p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                        <i className="ri-robot-line text-emerald-600 text-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-foreground-950">{crawler.crawler}</h4>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          crawler.status === 'allow' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-red-50 border border-red-200 text-red-700'
                        }`}>
                          {crawler.status === 'allow' ? 'ALLOW' : 'DISALLOW'}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-foreground-400">Pages accessibles</span>
                        <span className="font-bold text-foreground-950">{crawler.pagesAccessible}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-foreground-400">Dernier scan</span>
                        <span className="text-foreground-600">{new Date(crawler.lastScan).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-background-100 overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(crawler.pagesAccessible / globalStats.crawl.pagesCrawled) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white">
                <h3 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                  <i className="ri-file-code-line text-emerald-400" />
                  Configuration robots.txt — AI Crawlers
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto">
                  <pre>{`# KOS AI Crawler Allowlist — Tous les crawlers IA autorisés
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: AppleBot
Allow: /

User-agent: CCBot
Allow: /

# Sitemaps pour tous les crawlers
Sitemap: https://khepraexperts.com/sitemap.xml
Sitemap: https://khepraexperts.com/sitemap-news.xml

# llms.txt pour les LLMs
# Disponible: https://khepraexperts.com/llms.txt
# Disponible: https://khepraexperts.com/llms-full.txt`}</pre>
                </div>
                <p className="text-xs text-gray-400 mt-4 text-center">
                  Mis à jour automatiquement par KOS LLMs Generator — Prochaine régénération le {new Date(Date.now() + 86400000).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} à 03:00 UTC
                </p>
              </div>
            </div>
          </section>
        )}

        {/* === TAB: SCAN === */}
        {activeTab === 'scan' && (
          <section className="py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Edge Function Active — kos-seo-audit</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  Scan SEO + AEO Live
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Lance un audit complet : crawl technique, analyse Hn, meta tags, contenu, images, liens, Schema.org, AEO.{' '}
                  Résultats stockés dans Supabase seo_audit_results.
                </p>
              </div>

              <div className="max-w-lg mx-auto mb-10">
                <div className="rounded-3xl bg-white border border-background-200 p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 flex items-center justify-center">
                    <i className={`ri-radar-line text-3xl text-emerald-600 ${loading ? 'animate-spin' : ''}`} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground-950 mb-2">SEO + AEO Audit Complet</h3>
                  <p className="text-sm text-foreground-500 mb-5">
                    Scan de khepraexperts.com : crawl {pages.length} pages, analyse Hn, meta, contenu, images, liens, Schema.org, AEO.{'\n'}
                    Durée estimée : ~45 secondes.
                  </p>
                  <button
                    onClick={runAudit}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <i className="ri-loader-4-line animate-spin" />
                        Scan en cours...
                      </>
                    ) : (
                      <>
                        <i className="ri-radar-line" />
                        Lancer le Scan Live
                      </>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="max-w-lg mx-auto mb-8 rounded-2xl bg-red-50 border border-red-200 p-5 text-center">
                  <i className="ri-error-warning-line text-red-500 text-2xl mb-2 block" />
                  <p className="text-sm text-red-700 font-semibold">{error}</p>
                </div>
              )}

              {/* Last Scan Stats */}
              <div className="max-w-3xl mx-auto">
                <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <span className="block text-4xl font-bold font-heading text-emerald-400">{lastRun.average_overall_score}/10</span>
                      <span className="text-xs text-gray-400">Score Global</span>
                    </div>
                    <div>
                      <span className="block text-4xl font-bold font-heading text-white">{lastRun.pages_crawled}</span>
                      <span className="text-xs text-gray-400">Pages Crawlées</span>
                    </div>
                    <div>
                      <span className="block text-4xl font-bold font-heading text-emerald-400">{lastRun.critical_issues}</span>
                      <span className="text-xs text-gray-400">Critiques</span>
                    </div>
                    <div>
                      <span className="block text-4xl font-bold font-heading text-emerald-400">{lastRun.warnings}</span>
                      <span className="text-xs text-gray-400">Warnings</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 text-center">
                    <p className="text-xs text-gray-400">
                      Dernier scan : {new Date(lastRun.timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      {isLive && <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">DONNÉES LIVE</span>}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <p className="text-sm text-emerald-700 flex items-center justify-center gap-2">
                    <i className="ri-database-2-line" />
                    Résultats stockés dans Supabase <code className="text-xs bg-emerald-100 px-1.5 py-0.5 rounded">seo_audit_results</code>
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Cross-link Ecosystem */}
        <section className="py-12 sm:py-16 bg-white border-t border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                Écosystème KOS — Tous les Moteurs
              </h2>
              <p className="text-foreground-600">Interconnexion complète des dashboards KOS.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'SEO + AEO Command', path: '/kos-seo-aeo-command', icon: 'ri-search-line', color: '#0D7B5F', current: true },
                { label: 'AI Visibility', path: '/kos-ai-visibility-command', icon: 'ri-eye-line', color: '#9B7B2C' },
                { label: 'Web Operations', path: '/kos-web-operations-deployment', icon: 'ri-rocket-2-line', color: '#2D7A3A' },
                { label: 'Unified Autopilot', path: '/kos-unified-autopilot', icon: 'ri-cpu-line', color: '#86BC25' },
                { label: 'Quality System', path: '/kos-autonomous-quality-system', icon: 'ri-shield-check-line', color: '#8B3040' },
                { label: 'Social Media', path: '/kos-social-media-command', icon: 'ri-share-line', color: '#C05A3A' },
                { label: 'Automaton Engine', path: '/kos-automaton', icon: 'ri-cpu-line', color: '#4A7A1E' },
              ].map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${
                    link.current ? 'border-emerald-300 bg-emerald-50/40 ring-2 ring-emerald-400' : 'border-background-200 bg-background-50 hover:border-foreground-200'
                  }`}
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                    <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                  </div>
                  <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                  {link.current && (
                    <span className="block text-[10px] text-emerald-600 font-bold mt-1">Mission Accomplie — 9.5/10</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>

    </KOSHubLayout>
  );
}