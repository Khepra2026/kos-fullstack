import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  SEO_ONPAGE_OVERVIEW,
  HN_STRUCTURE_PAGES,
  META_TAG_PAGES,
  KEYWORD_POSITIONS,
  CANNIBALIZATION_PAIRS,
  CONTENT_QUALITY_PAGES,
  ONPAGE_QUICK_WINS,
} from '@/mocks/seoOnPageContent';
import type { HnStructurePage, MetaTagPage, KeywordPosition, CannibalizationPair, ContentQualityPage } from '@/mocks/seoOnPageContent';

type TabId = 'overview' | 'hn' | 'meta' | 'keywords' | 'content' | 'quickwins';

function scoreColor(score: number): string {
  if (score >= 85) return 'text-emerald-600';
  if (score >= 70) return 'text-amber-600';
  if (score >= 50) return 'text-orange-600';
  return 'text-red-600';
}
function scoreBg(score: number): string {
  if (score >= 85) return 'bg-emerald-50 border-emerald-200';
  if (score >= 70) return 'bg-amber-50 border-amber-200';
  if (score >= 50) return 'bg-orange-50 border-orange-200';
  return 'bg-red-50 border-red-200';
}
function trendIcon(trend: 'up' | 'down' | 'stable'): string {
  if (trend === 'up') return 'ri-arrow-up-line text-emerald-500';
  if (trend === 'down') return 'ri-arrow-down-line text-red-500';
  return 'ri-subtract-line text-foreground-400';
}
function priorityBadge(p: string) {
  if (p === 'critique') return 'bg-red-50 border-red-200 text-red-700';
  if (p === 'haute') return 'bg-amber-50 border-amber-200 text-amber-700';
  return 'bg-background-100 border-background-200 text-foreground-500';
}

function HnTree({ node, depth }: { node: { tag: string; text: string; issues: string[]; children: { tag: string; text: string; issues: string[]; children: any[] }[] }; depth: number }) {
  const indent = depth * 20;
  const tagColors: Record<string, string> = {
    h1: 'border-l-4 border-red-400 bg-red-50/60',
    h2: 'border-l-4 border-amber-400 bg-amber-50/40',
    h3: 'border-l-4 border-teal-400 bg-teal-50/30',
    h4: 'border-l-2 border-background-300 bg-background-50',
  };
  const tagLabels: Record<string, string> = {
    h1: 'H1',
    h2: 'H2',
    h3: 'H3',
    h4: 'H4',
  };
  return (
    <div>
      <div className={`flex items-start gap-2 py-1.5 px-3 rounded-r-lg ml-[${indent}px] ${tagColors[node.tag] || 'bg-background-50'}`} style={{ marginLeft: indent }}>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${node.tag === 'h1' ? 'bg-red-100 text-red-700' : node.tag === 'h2' ? 'bg-amber-100 text-amber-700' : 'bg-teal-100 text-teal-700'}`}>
          {tagLabels[node.tag]}
        </span>
        <span className="text-xs text-foreground-800 flex-1 leading-relaxed">{node.text}</span>
        {node.issues.length > 0 && (
          <span className="flex items-center gap-0.5 text-[10px] text-red-600 flex-shrink-0">
            <i className="ri-error-warning-line text-xs" />{node.issues.length}
          </span>
        )}
      </div>
      {node.issues.length > 0 && (
        <div style={{ marginLeft: indent + 36 }}>
          {node.issues.map((iss, j) => (
            <p key={j} className="text-[10px] text-red-500 pl-4 py-0.5 flex items-start gap-1">
              <i className="ri-close-circle-line mt-0.5 flex-shrink-0" />{iss}
            </p>
          ))}
        </div>
      )}
      {node.children.map((child, i) => (
        <HnTree key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function seoOnPageContentPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  const [sortKw, setSortKw] = useState<'position' | 'volume' | 'trend'>('position');

  const overview = SEO_ONPAGE_OVERVIEW;

  const sortedKeywords = useMemo(() => {
    return [...KEYWORD_POSITIONS].sort((a, b) => {
      if (sortKw === 'position') return a.position - b.position;
      if (sortKw === 'volume') return b.search_volume - a.search_volume;
      return 0;
    });
  }, [sortKw]);

  const keywordStats = useMemo(() => ({
    top3: KEYWORD_POSITIONS.filter(k => k.position <= 3).length,
    top10: KEYWORD_POSITIONS.filter(k => k.position <= 10).length,
    improved: KEYWORD_POSITIONS.filter(k => k.trend === 'up').length,
    declined: KEYWORD_POSITIONS.filter(k => k.trend === 'down').length,
    featured: KEYWORD_POSITIONS.filter(k => k.featured_snippet).length,
    avgPosition: (KEYWORD_POSITIONS.reduce((s, k) => s + k.position, 0) / KEYWORD_POSITIONS.length).toFixed(1),
  }), []);

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', count: `${overview.overall_onpage_score}/100` },
    { id: 'hn', label: 'Audit Hn', icon: 'ri-list-check', count: String(HN_STRUCTURE_PAGES.length) },
    { id: 'meta', label: 'Meta Tags', icon: 'ri-code-s-slash-line', count: String(overview.meta_critical_issues) },
    { id: 'keywords', label: 'Mots-Clés', icon: 'ri-key-2-line', count: String(KEYWORD_POSITIONS.length) },
    { id: 'content', label: 'Qualité Contenu', icon: 'ri-file-text-line', count: String(overview.thin_content_pages) },
    { id: 'quickwins', label: 'Quick Wins', icon: 'ri-flashlight-line', count: String(ONPAGE_QUICK_WINS.filter(q => q.status === 'in_progress').length) },
  ];

  return (
    <hubLayout hubId={30}>
      <SeoHead
        title="KOS SEO On-Page & Content Quality — Audit Hn, Meta, Mots-Clés | KHEPRA EXPERTS"
        description="Audit SEO On-Page complet KOS : 18 pages analysées, score 71/100, 85 mots-clés trackés, Hn structure, meta tags, qualité de contenu. 8 quick wins identifiés."
        keywords="SEO On-Page, audit Hn, meta tags, mots-clés, qualité contenu, content quality, KHEPRA EXPERTS, optimisation SEO"
        canonicalPath="/kos-seo-onpage-content"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-amber-50/60 border-b border-amber-200/60">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/40 via-transparent to-orange-100/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-bold mb-4">
                <i className="ri-file-search-line" />
                AUDIT SEO ON-PAGE — 18 Pages · 85 Mots-Clés · Score {overview.overall_onpage_score}/100
              </div>
              <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground-950 tracking-tight">
                SEO On-Page & Content Quality — Optimisation Chaque Page Compte
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                <strong className="text-foreground-950">{overview.total_pages_analyzed} pages auditées</strong>. Score on-page moyen : <strong className="text-amber-600 font-bold">{overview.overall_onpage_score}/100</strong>.{' '}
                <strong className="text-red-600">{overview.meta_critical_issues} issues meta</strong> ·{' '}
                <strong className="text-red-600">{overview.hn_critical_issues} problèmes Hn</strong> ·{' '}
                <strong className="text-red-600">{overview.content_critical_issues} faiblesses contenu</strong>.{' '}
                <strong>{overview.keywords_top3} mots-clés en top 3</strong> · <strong>{overview.featured_snippets_won} featured snippets</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 border border-red-300 text-red-700 text-xs font-bold">
                  <i className="ri-error-warning-line" />{overview.cannibalization_pairs} Cannibalisations
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-bold">
                  <i className="ri-file-warning-line" />{overview.thin_content_pages} Pages Thin Content
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold">
                  <i className="ri-key-2-line" />{keywordStats.featured} Featured Snippets
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
            {/* Global Score */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-8">
              <div className="rounded-3xl bg-background-50 border border-amber-200 p-6 sm:p-7 text-center lg:col-span-1">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center relative">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" className="text-amber-100" strokeWidth="6" />
                    <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" className="text-amber-500" strokeWidth="6"
                      strokeDasharray={`${(overview.overall_onpage_score / 100) * 2 * Math.PI * 34} ${2 * Math.PI * 34}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-2xl font-bold text-amber-600 font-heading">{overview.overall_onpage_score}</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-1">Score SEO On-Page</h3>
                <p className="text-sm text-foreground-500">/100 — {overview.total_pages_analyzed} pages</p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-[10px] font-bold text-amber-700">AMÉLIORABLE — Cible 85+</span>
              </div>
              <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6 sm:p-7 lg:col-span-3">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-5 flex items-center gap-2">
                  <i className="ri-pie-chart-line text-amber-500" />Répartition des Scores par Pilier
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Structure Hn', score: overview.hn_average_score, max: 10, color: '#D97757' },
                    { label: 'Meta Tags', score: overview.meta_average_score, max: 10, color: '#CA8A04' },
                    { label: 'Qualité Contenu', score: overview.content_average_score, max: 10, color: '#4A7A1E' },
                  ].map((p) => (
                    <div key={p.label}>
                      <div className="flex items-center justify-between mb-1 text-xs">
                        <span className="text-foreground-600">{p.label}</span>
                        <span className="font-bold" style={{ color: p.color }}>{p.score}/{p.max}</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-background-100 overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${(p.score / p.max) * 100}%`, backgroundColor: p.color }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Mots-Clés Trackés', value: String(overview.keywords_tracked), icon: 'ri-key-2-line', color: '#4A7A1E' },
                    { label: 'Top 3 Google', value: String(overview.keywords_top3), icon: 'ri-trophy-line', color: '#86BC25' },
                    { label: 'Featured Snippets', value: String(overview.featured_snippets_won), icon: 'ri-star-line', color: '#D97757' },
                    { label: 'Cannibalisations', value: String(overview.cannibalization_pairs), icon: 'ri-error-warning-line', color: '#C2410C' },
                  ].map((s, i) => (
                    <div key={i} className="rounded-xl bg-background-100 p-3 text-center">
                      <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                        <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
                      </div>
                      <span className="block text-lg font-bold text-foreground-950">{s.value}</span>
                      <span className="text-[10px] text-foreground-400">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Issue Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { title: 'Meta Tags', icon: 'ri-code-s-slash-line', critical: overview.meta_critical_issues, color: '#D97757', desc: 'Title trop longs, OG manquants, H1 courts' },
                { title: 'Structure Hn', icon: 'ri-list-check', critical: overview.hn_critical_issues, color: '#CA8A04', desc: 'H2 non-questions, hiérarchie plate, H1 génériques' },
                { title: 'Qualité Contenu', icon: 'ri-file-text-line', critical: overview.content_critical_issues, color: '#C05A3A', desc: 'Thin content, duplicate, fraîcheur faible' },
              ].map((iss, i) => (
                <div key={i} className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${iss.color}15` }}>
                      <i className={`${iss.icon} text-lg`} style={{ color: iss.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">{iss.title}</h3>
                      <span className="text-[10px] text-foreground-400">{iss.desc}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold font-heading" style={{ color: iss.color }}>{iss.critical}</span>
                    <span className="text-xs text-foreground-500">issues critiques</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cannibalization Alert */}
            {CANNIBALIZATION_PAIRS.length > 0 && (
              <div className="rounded-3xl bg-red-50 border border-red-200 p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <i className="ri-alert-line text-red-600 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-foreground-950">{overview.cannibalization_pairs} Cannibalisations Détectées</h3>
                    <p className="text-sm text-red-700">Plusieurs pages en compétition sur les mêmes mots-clés — dilution du ranking</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {CANNIBALIZATION_PAIRS.map((cp, i) => (
                    <div key={i} className="rounded-xl bg-white border border-red-100 p-4">
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                        <span className="text-sm font-bold text-foreground-950">{cp.keyword}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${priorityBadge(cp.severity)}`}>{cp.severity.toUpperCase()}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {cp.pages.map((p, j) => (
                          <span key={j} className="text-[10px] px-2 py-1 rounded-full bg-background-100 border border-background-200 text-foreground-600">
                            #{p.position} {p.url}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-foreground-500"><i className="ri-lightbulb-line text-amber-500 mr-1" />{cp.recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* === TAB: AUDIT Hn === */}
      {activeTab === 'hn' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Audit Structure Hn — {HN_STRUCTURE_PAGES.length} Pages</h2>
                <p className="text-foreground-600 text-sm">Score Hn moyen : {overview.hn_average_score}/10 · {overview.hn_critical_issues} problèmes critiques</p>
              </div>
            </div>

            {/* Hn Score Distribution */}
            <div className="grid grid-cols-4 gap-3 mb-8">
              {[
                { label: 'A (9+)', value: HN_STRUCTURE_PAGES.filter(p => p.hn_score >= 9).length, color: '#86BC25' },
                { label: 'B (7-8.9)', value: HN_STRUCTURE_PAGES.filter(p => p.hn_score >= 7 && p.hn_score < 9).length, color: '#E8C547' },
                { label: 'C (5-6.9)', value: HN_STRUCTURE_PAGES.filter(p => p.hn_score >= 5 && p.hn_score < 7).length, color: '#D97757' },
                { label: 'D (<5)', value: HN_STRUCTURE_PAGES.filter(p => p.hn_score < 5).length, color: '#C2410C' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-4 text-center" style={{ backgroundColor: `${s.color}12`, border: `1px solid ${s.color}30` }}>
                  <span className="block text-2xl font-bold font-heading" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-xs text-foreground-500">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Hn Trees */}
            <div className="space-y-4">
              {HN_STRUCTURE_PAGES.map((page) => {
                const isExpanded = expandedPage === page.page_url;
                return (
                  <div key={page.page_url} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-background-50 shadow-lg' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedPage(isExpanded ? null : page.page_url)} className="w-full p-4 sm:p-5 text-left flex items-start gap-4 cursor-pointer">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold font-heading text-lg ${scoreBg(page.hn_score * 10)}`}>
                        <span className={scoreColor(page.hn_score * 10)}>{page.hn_score}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-foreground-950 truncate">{page.page_url}</h3>
                        <p className="text-xs text-foreground-500 line-clamp-1">{page.page_title}</p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-foreground-400">
                          <span className="text-red-500">{page.hn_issues.length} problèmes</span>
                          <span>·</span>
                          <span className="text-emerald-500">{page.hn_quick_wins.length} quick wins</span>
                        </div>
                      </div>
                      <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4">
                        <div className="mb-4 p-4 rounded-xl bg-background-100 border border-background-200/70 overflow-x-auto">
                          <HnTree node={page.tree} depth={0} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">Problèmes</h5>
                            {page.hn_issues.map((iss, j) => (
                              <p key={j} className="text-xs text-red-700 mb-1 flex items-start gap-1">
                                <i className="ri-close-circle-line text-red-500 mt-0.5 flex-shrink-0" />{iss}
                              </p>
                            ))}
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Quick Wins</h5>
                            {page.hn_quick_wins.map((qw, j) => (
                              <p key={j} className="text-xs text-emerald-700 mb-1 flex items-start gap-1">
                                <i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0" />{qw}
                              </p>
                            ))}
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

      {/* === TAB: META TAGS === */}
      {activeTab === 'meta' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Audit Meta Tags — {META_TAG_PAGES.length} Pages</h2>
              <p className="text-foreground-600 text-sm">Score Meta moyen : {overview.meta_average_score}/10 · {overview.meta_critical_issues} issues critiques</p>
            </div>

            {/* Meta Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
              {[
                { label: 'Title >60 car.', value: String(META_TAG_PAGES.filter(p => !p.title_ok).length), icon: 'ri-text-spacing', color: '#C2410C' },
                { label: 'H1 <20 car.', value: String(META_TAG_PAGES.filter(p => !p.h1_ok).length), icon: 'ri-heading', color: '#D97757' },
                { label: 'OG Manquant', value: String(META_TAG_PAGES.filter(p => !p.og_image).length), icon: 'ri-image-line', color: '#CA8A04' },
                { label: 'Twitter Card', value: String(META_TAG_PAGES.filter(p => !p.twitter_card).length), icon: 'ri-twitter-line', color: '#4A7A1E' },
                { label: 'Meta OK', value: String(META_TAG_PAGES.filter(p => p.meta_desc_ok).length), icon: 'ri-check-line', color: '#86BC25' },
                { label: 'Canonical OK', value: String(META_TAG_PAGES.filter(p => p.canonical_ok).length), icon: 'ri-link', color: '#86BC25' },
                { label: 'Indexables', value: String(META_TAG_PAGES.filter(p => p.robots_index).length), icon: 'ri-search-line', color: '#86BC25' },
                { label: 'Score ≥ 8', value: String(META_TAG_PAGES.filter(p => p.meta_score >= 8).length), icon: 'ri-trophy-line', color: '#4A7A1E' },
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

            {/* Per Page Table */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Page</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Title (car.)</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Meta (car.)</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">H1</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">OG</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Twitter</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Score</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Issues</th>
                    </tr>
                  </thead>
                  <tbody>
                    {META_TAG_PAGES.map((page) => {
                      const issues: string[] = [];
                      if (page.title_issue) issues.push(page.title_issue);
                      if (page.meta_desc_issue) issues.push(page.meta_desc_issue);
                      if (page.h1_issue) issues.push(page.h1_issue);
                      if (!page.og_image) issues.push('OG Image manquante');
                      if (!page.twitter_card) issues.push('Twitter Card manquante');
                      return (
                        <tr key={page.page_url} className="border-t border-background-100 hover:bg-background-50/70">
                          <td className="px-4 py-3">
                            <span className="text-xs font-semibold text-foreground-950">{page.page_url}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs ${page.title_ok ? 'text-emerald-600' : 'text-red-600 font-bold'}`}>{page.title_length}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs ${page.meta_desc_ok ? 'text-emerald-600' : 'text-amber-600 font-bold'}`}>{page.meta_desc_length}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs ${page.h1_ok ? 'text-emerald-600' : 'text-red-600 font-bold'}`}>{page.h1_length}</span>
                          </td>
                          <td className="px-4 py-3">
                            {page.og_title && page.og_description && page.og_image ? (
                              <i className="ri-check-line text-emerald-500" />
                            ) : (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-700 font-bold">MANQUANT</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {page.twitter_card ? (
                              <i className="ri-check-line text-emerald-500" />
                            ) : (
                              <i className="ri-close-line text-red-500" />
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-bold ${scoreColor(page.meta_score * 10)}`}>{page.meta_score}/10</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-[10px] text-red-600">{issues.length > 0 ? `${issues.length} issues` : 'OK'}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: MOTS-CLÉS === */}
      {activeTab === 'keywords' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Analyse Mots-Clés — {KEYWORD_POSITIONS.length} Trackés</h2>
                <p className="text-foreground-600 text-sm">{keywordStats.top3} en top 3 · {keywordStats.top10} en top 10 · {keywordStats.featured} featured snippets · Position moyenne {keywordStats.avgPosition}</p>
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

            {/* Keyword Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {[
                { label: 'Top 3', value: String(keywordStats.top3), icon: 'ri-trophy-line', color: '#86BC25' },
                { label: 'Top 10', value: String(keywordStats.top10), icon: 'ri-medal-line', color: '#4A7A1E' },
                { label: 'En Hausse', value: String(keywordStats.improved), icon: 'ri-arrow-up-line', color: '#86BC25' },
                { label: 'En Baisse', value: String(keywordStats.declined), icon: 'ri-arrow-down-line', color: '#C2410C' },
                { label: 'Featured Snippets', value: String(keywordStats.featured), icon: 'ri-star-line', color: '#D97757' },
                { label: 'Pos. Moyenne', value: keywordStats.avgPosition, icon: 'ri-bar-chart-line', color: '#CA8A04' },
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

            {/* Keywords Table */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Mot-Clé</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">URL</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Pos.</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Volume</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Difficulté</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Tendance</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Featured</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Densité</th>
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
                          <span className="text-[10px] text-foreground-500 font-mono truncate block max-w-[200px]">{kw.url}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold ${kw.position <= 3 ? 'text-emerald-600' : kw.position <= 10 ? 'text-amber-600' : 'text-red-500'}`}>#{kw.position}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-foreground-700">{kw.search_volume}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-10 h-1.5 rounded-full bg-background-200 overflow-hidden">
                              <div className="h-full rounded-full bg-amber-500" style={{ width: `${kw.difficulty}%` }} />
                            </div>
                            <span className="text-[10px] text-foreground-400">{kw.difficulty}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <i className={trendIcon(kw.trend)} />
                            <span className="text-[10px] text-foreground-500">
                              {kw.previous_position === kw.position ? '—' : kw.previous_position > kw.position ? `+${kw.previous_position - kw.position}` : `${kw.position - kw.previous_position}`}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {kw.featured_snippet ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold">★</span>
                          ) : (
                            <span className="text-[10px] text-foreground-300">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-semibold ${kw.density_pct >= 1.5 ? 'text-emerald-600' : kw.density_pct >= 0.5 ? 'text-amber-600' : 'text-red-500'}`}>{kw.density_pct}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cannibalization Recap */}
            <div className="mt-8 rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <i className="ri-alert-line text-red-400 text-lg" />
                </div>
                <h3 className="font-heading text-lg font-bold">{CANNIBALIZATION_PAIRS.length} Cannibalisations — Impact SERP</h3>
              </div>
              <div className="space-y-3">
                {CANNIBALIZATION_PAIRS.map((cp, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/8 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold">{cp.keyword}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${cp.severity === 'critique' ? 'text-red-300 border-red-500/50' : cp.severity === 'élevée' ? 'text-amber-300 border-amber-500/50' : 'text-gray-300 border-gray-500/50'}`}>{cp.severity}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {cp.pages.map((p, j) => (
                        <span key={j} className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-gray-300">#{p.position} — {p.url}</span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">{cp.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: QUALITÉ CONTENU === */}
      {activeTab === 'content' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Qualité Contenu — {CONTENT_QUALITY_PAGES.length} Pages</h2>
              <p className="text-foreground-600 text-sm">Score contenu moyen : {overview.content_average_score}/10 · {overview.thin_content_pages} pages thin content · {overview.content_critical_issues} issues critiques</p>
            </div>

            {/* Content Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {[
                { label: 'Thin Content', value: String(CONTENT_QUALITY_PAGES.filter(p => p.thin_content).length), icon: 'ri-file-warning-line', color: '#C2410C' },
                { label: 'Sans TOC', value: String(CONTENT_QUALITY_PAGES.filter(p => !p.has_toc).length), icon: 'ri-list-unordered', color: '#D97757' },
                { label: 'Flesch < 50', value: String(CONTENT_QUALITY_PAGES.filter(p => !p.flesch_ok).length), icon: 'ri-font-size', color: '#CA8A04' },
                { label: 'Fraîcheur > 90j', value: String(CONTENT_QUALITY_PAGES.filter(p => !p.freshness_ok).length), icon: 'ri-calendar-line', color: '#D97757' },
                { label: 'Duplication', value: String(CONTENT_QUALITY_PAGES.filter(p => !p.duplicate_ok).length), icon: 'ri-file-copy-line', color: '#CA8A04' },
                { label: 'Score ≥ 8', value: String(CONTENT_QUALITY_PAGES.filter(p => p.content_score >= 8).length), icon: 'ri-trophy-line', color: '#86BC25' },
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

            {/* Content Quality per Page */}
            <div className="space-y-4">
              {CONTENT_QUALITY_PAGES.map((page) => (
                <div key={page.page_url} className={`rounded-2xl border bg-background-50 ${page.content_score < 5 ? 'border-red-200' : page.content_score < 7 ? 'border-amber-200' : 'border-background-200/70'} p-5`}>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-3 min-w-0 lg:w-52 flex-shrink-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${scoreBg(page.content_score * 10)}`}>
                        <span className={scoreColor(page.content_score * 10)}>{page.content_score}</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-foreground-950 truncate">{page.page_url}</h4>
                        <p className="text-[10px] text-foreground-500">{page.word_count} mots</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 flex-1">
                      {!page.word_count_ok && <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-700 font-bold">Thin Content</span>}
                      {!page.flesch_ok && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold">Lisibilité faible</span>}
                      {!page.freshness_ok && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold">{page.content_freshness_days}j sans màj</span>}
                      {!page.duplicate_ok && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold">Duplicate {page.duplicate_risk_pct}%</span>}
                      {page.has_toc && <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">TOC</span>}
                      {page.has_tables && <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">Tableaux</span>}
                    </div>

                    <span className={`text-lg font-bold font-heading flex-shrink-0 ${scoreColor(page.content_score * 10)}`}>{page.content_score}/10</span>
                  </div>

                  {page.recommendations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-background-100 flex flex-wrap items-start gap-2">
                      <i className="ri-lightbulb-line text-amber-500 mt-0.5 text-xs" />
                      {page.recommendations.map((rec, j) => (
                        <span key={j} className="text-xs text-foreground-600">{rec}{j < page.recommendations.length - 1 ? ' · ' : ''}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Thin Content Alert */}
            <div className="mt-8 rounded-3xl bg-red-50 border border-red-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <i className="ri-file-warning-line text-red-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground-950">{overview.thin_content_pages} Pages Thin Content (&lt;800 mots)</h3>
                  <p className="text-sm text-red-700">Google pénalise le contenu insuffisant — ces pages risquent de perdre leur ranking</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {CONTENT_QUALITY_PAGES.filter(p => p.thin_content).map((p) => (
                  <span key={p.page_url} className="px-3 py-1.5 rounded-full bg-white border border-red-100 text-xs text-red-700 font-semibold">{p.page_url} ({p.word_count} mots)</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: QUICK WINS === */}
      {activeTab === 'quickwins' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
                <i className="ri-flashlight-line text-amber-600" />
                <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">Quick Wins — Actions Prioritaires</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                {ONPAGE_QUICK_WINS.length} Actions pour Améliorer le SEO On-Page
              </h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">
                {ONPAGE_QUICK_WINS.filter(q => q.status === 'in_progress').length} en cours · {ONPAGE_QUICK_WINS.filter(q => q.status === 'pending').length} en attente
              </p>
            </div>

            <div className="space-y-3">
              {ONPAGE_QUICK_WINS.map((qw) => {
                const catColors: Record<string, string> = {
                  hn: '#D97757',
                  meta: '#CA8A04',
                  keywords: '#4A7A1E',
                  content: '#C05A3A',
                };
                const statusBadge = qw.status === 'in_progress'
                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                  : 'bg-background-100 border-background-200 text-foreground-400';
                return (
                  <div key={qw.id} className="rounded-2xl bg-background-50 border border-background-200/70 p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex items-center gap-3 min-w-0 lg:w-52 flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${catColors[qw.category]}15` }}>
                          {qw.category === 'hn' && <i className="ri-list-check text-lg" style={{ color: catColors[qw.category] }} />}
                          {qw.category === 'meta' && <i className="ri-code-s-slash-line text-lg" style={{ color: catColors[qw.category] }} />}
                          {qw.category === 'keywords' && <i className="ri-key-2-line text-lg" style={{ color: catColors[qw.category] }} />}
                          {qw.category === 'content' && <i className="ri-file-text-line text-lg" style={{ color: catColors[qw.category] }} />}
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${priorityBadge(qw.priority)}`}>{qw.priority.toUpperCase()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground-800 mb-1.5">{qw.action}</p>
                        <div className="flex flex-wrap items-center gap-3 text-[10px] text-foreground-400">
                          <span><i className="ri-timer-line mr-1" />{qw.effort}</span>
                          <span className="text-emerald-600 font-semibold"><i className="ri-bar-chart-line mr-1" />{qw.kpi_impact}</span>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${statusBadge}`}>
                        {qw.status === 'in_progress' ? 'En cours' : 'En attente'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <i className="ri-tools-line text-amber-400 text-lg" />
                </div>
                <h3 className="font-heading text-lg font-bold">Pipeline SEO On-Page</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <span className="block text-3xl font-bold font-heading text-amber-400">{ONPAGE_QUICK_WINS.filter(q => q.status === 'in_progress').length}</span>
                  <span className="text-xs text-gray-400">En cours</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold font-heading text-red-400">{ONPAGE_QUICK_WINS.filter(q => q.priority === 'critique').length}</span>
                  <span className="text-xs text-gray-400">Critiques</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold font-heading text-emerald-400">{ONPAGE_QUICK_WINS.filter(q => q.status === 'completed').length}</span>
                  <span className="text-xs text-gray-400">Terminées</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold font-heading text-white">{ONPAGE_QUICK_WINS.length}</span>
                  <span className="text-xs text-gray-400">Total</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                Temps total estimé : 10h30 · Gain SEO On-Page estimé : +23 points (71 → 94)
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Cross-link Ecosystem */}
      <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème KOS — SEO & Performance</h2>
            <p className="text-foreground-600">Navigation rapide vers les hubs SEO connectés.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'SEO On-Page & Content', path: '/kos-seo-onpage-content', icon: 'ri-file-search-line', color: '#D97757', current: true },
              { label: 'SEO + AEO Command', path: '/kos-seo-aeo-command', icon: 'ri-search-line', color: '#C05A3A' },
              { label: 'Schema.org Audit', path: '/kos-schema-org-audit', icon: 'ri-code-box-line', color: '#4A7A1E' },
              { label: 'Core Web Vitals', path: '/kos-performance-seo-command', icon: 'ri-speed-line', color: '#CA8A04' },
              { label: 'SEO Autopilot', path: '/kos-seo-autopilot', icon: 'ri-cpu-line', color: '#86BC25' },
              { label: 'AI Visibility', path: '/kos-ai-visibility-command', icon: 'ri-eye-line', color: '#9B7B2C' },
              { label: 'GSC Command', path: '/kos-gsc-command', icon: 'ri-google-line', color: '#4285F4' },
            ].map((link) => (
              <a key={link.path} href={link.path}
                className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${link.current ? 'border-amber-300 bg-amber-50/40 ring-2 ring-amber-400' : 'border-background-200/70 bg-background-50 hover:border-foreground-200'}`}>
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



