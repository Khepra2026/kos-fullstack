import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  eeatOverview,
  authorAuthority,
  brandMentions,
  trustSignals,
  aboutOptimization,
  externalReviews,
  quickWinsEEAT,
} from '@/mocks/seoEEATAuthority';

type TabId = 'overview' | 'authors' | 'mentions' | 'trust' | 'about' | 'reviews' | 'quickwins';

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

function sentimentBadge(s: string) {
  if (s === 'Très Positif') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  if (s === 'Positif') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
  return 'bg-background-100 text-foreground-500 border-background-200';
}

function schemaStatusBadge(status: string) {
  if (status.includes('✅')) return 'bg-emerald-100 text-emerald-700';
  if (status.includes('⚠️')) return 'bg-amber-100 text-amber-700';
  return 'bg-red-100 text-red-700';
}

export default function seoEEATAuthorityPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [authorSort, setAuthorSort] = useState<'score' | 'publications'>('score');
  const [mentionFilter, setMentionFilter] = useState<'all' | 'dofollow' | 'nofollow'>('all');
  const [trustCategory, setTrustCategory] = useState<'all' | 'Certifications' | 'Accréditations' | 'Partenariats' | 'Prix' | 'Publications' | 'Affiliations'>('all');

  const overview = eeatOverview;

  const sortedAuthors = useMemo(() => {
    return [...authorAuthority].sort((a, b) => {
      if (authorSort === 'score') return b.score - a.score;
      return b.publications - a.publications;
    });
  }, [authorSort]);

  const filteredMentions = useMemo(() => {
    if (mentionFilter === 'all') return brandMentions;
    return brandMentions.filter(m => mentionFilter === 'dofollow' ? m.dofollow : !m.dofollow);
  }, [mentionFilter]);

  const filteredTrust = useMemo(() => {
    if (trustCategory === 'all') return trustSignals;
    return trustSignals.filter(t => t.category === trustCategory);
  }, [trustCategory]);

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', count: `${overview.eeatScore}/100` },
    { id: 'authors', label: 'Auteurs Experts', icon: 'ri-user-star-line', count: String(authorAuthority.length) },
    { id: 'mentions', label: 'Mentions Marque', icon: 'ri-chat-quote-line', count: String(brandMentions.length) },
    { id: 'trust', label: 'Signaux de Confiance', icon: 'ri-shield-check-line', count: String(trustSignals.length) },
    { id: 'about', label: 'Pages À Propos', icon: 'ri-information-line', count: String(aboutOptimization.length) },
    { id: 'reviews', label: 'Avis Externes', icon: 'ri-star-line', count: String(externalReviews.length) },
    { id: 'quickwins', label: 'Quick Wins', icon: 'ri-flashlight-line', count: String(quickWinsEEAT.filter(q => q.impact === 'Critique').length) },
  ];

  return (
    <hubLayout hubId={73}>
      <SeoHead
        title="KOS SEO E-E-A-T & Brand Authority — Autorité, Confiance, Expertise | KHEPRA EXPERTS"
        description="E-E-A-T & Brand Authority : Score 62/100, 6 auteurs, 8 mentions externes, 10 signaux confiance, 6 plateformes avis, 4 pages optimisées. KHEPRA EXPERTS."
        keywords="SEO E-E-A-T, experience expertise authoritativeness trustworthiness, brand authority, author authority, trust signals, external reviews, KHEPRA EXPERTS"
        canonicalPath="/kos-seo-eeat-authority"
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
                <i className="ri-medal-line" />
                E-E-A-T — Score {overview.eeatScore}/100 · {overview.certificationsActive} Certifications · {overview.verifiedAuthors}/{overview.authorProfiles} Auteurs Vérifiés
              </div>
              <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground-950 tracking-tight">
                SEO E-E-A-T & Brand Authority — Les signaux de confiance que Google récompense
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Score E-E-A-T <strong className="text-foreground-950">{overview.eeatScore}/100</strong> (cible <strong className="text-emerald-600">{overview.targetScore}/100</strong>) ·{' '}
                <strong className="text-foreground-950">{overview.referringDomains} domaines référents</strong> ·{' '}
                <strong className="text-emerald-600">{overview.googleReviews}★</strong> Google Reviews ·{' '}
                <strong className="text-accent-600">{overview.externalCitations} citations</strong> externes.
                Expertise <strong className="text-foreground-950">{overview.expertiseScore}%</strong> ·{' '}
                Authoritativeness <strong className="text-foreground-950">{overview.authoritativenessScore}%</strong> ·{' '}
                Trust <strong className="text-red-500">{overview.trustworthinessScore}%</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 border border-red-300 text-red-700 text-xs font-bold">
                  <i className="ri-shield-cross-line" />Trust {overview.trustworthinessScore}% — plus bas
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-bold">
                  <i className="ri-user-search-line" />{overview.verifiedAuthors}/{overview.authorProfiles} auteurs vérifiés
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-bold">
                  <i className="ri-star-line" />{overview.googleReviews}★ Google ({overview.industryAwards} prix)
                </span>
              </div>
            </div>
            {/* EEAT Score Gauge */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke={overview.eeatScore >= 75 ? '#86BC25' : overview.eeatScore >= 55 ? '#F59E0B' : '#DC2626'} strokeWidth="8"
                    strokeDasharray={`${(overview.eeatScore / 100) * 264} 264`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold font-heading text-foreground-950">{overview.eeatScore}</span>
                </div>
              </div>
              <span className="text-[10px] text-foreground-400 mt-1">Score E-E-A-T</span>
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
            {/* EEAT Dimensions */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Experience', value: overview.experienceScore, target: 85, color: '#F59E0B', icon: 'ri-user-heart-line' },
                { label: 'Expertise', value: overview.expertiseScore, target: 90, color: '#86BC25', icon: 'ri-brain-line' },
                { label: 'Authoritativeness', value: overview.authoritativenessScore, target: 88, color: '#CA8A04', icon: 'ri-medal-line' },
                { label: 'Trustworthiness', value: overview.trustworthinessScore, target: 92, color: '#DC2626', icon: 'ri-shield-check-line' },
              ].map((dim) => (
                <div key={dim.label} className="rounded-xl bg-background-50 border border-background-200/70 p-5 text-center">
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="6" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke={dim.color} strokeWidth="6"
                        strokeDasharray={`${(dim.value / 100) * 264} 264`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold font-heading">{dim.value}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-foreground-800">{dim.label}</span>
                  <span className="block text-[9px] text-foreground-400 mt-0.5">/ Cible {dim.target}</span>
                </div>
              ))}
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {[
                { label: 'Domaines Référents', value: String(overview.referringDomains), icon: 'ri-link', color: '#86BC25' },
                { label: 'Backlinks', value: String(overview.totalBacklinks), icon: 'ri-chat-quote-line', color: '#F59E0B' },
                { label: 'Mentions / Mois', value: String(overview.brandMentionsMonthly), icon: 'ri-megaphone-line', color: '#CA8A04' },
                { label: 'Citations Externes', value: String(overview.externalCitations), icon: 'ri-double-quotes-l', color: '#D97757' },
                { label: 'Auteurs Vérifiés', value: `${overview.verifiedAuthors}/${overview.authorProfiles}`, icon: 'ri-user-star-line', color: '#9B7B2C' },
                { label: 'Avis Google', value: `${overview.googleReviews}★`, icon: 'ri-star-fill', color: '#EAB308' },
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

            {/* Alerts */}
            <div className="rounded-3xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">Gaps E-E-A-T Critiques</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl bg-red-50/50 border border-red-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><i className="ri-code-box-line text-red-600" /></div>
                    <span className="font-bold text-red-800 text-sm">4/6 auteurs sans Person schema</span>
                  </div>
                  <p className="text-xs text-red-700">Google ne peut pas lier les contenus à leurs auteurs — perte d'Expertise et Authoritativeness</p>
                </div>
                <div className="rounded-xl bg-amber-50/50 border border-amber-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center"><i className="ri-building-2-line text-amber-600" /></div>
                    <span className="font-bold text-amber-800 text-sm">Organization schema manquant</span>
                  </div>
                  <p className="text-xs text-amber-700">Pas de données structurées Organization sur /about — perte de rich results Knowledge Panel</p>
                </div>
                <div className="rounded-xl bg-emerald-50/50 border border-emerald-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center"><i className="ri-chat-3-line text-emerald-600" /></div>
                    <span className="font-bold text-emerald-800 text-sm">2 avis Clutch non répondus</span>
                  </div>
                  <p className="text-xs text-emerald-700">Opportunité simple de montrer de l'engagement et d'améliorer le score Trust</p>
                </div>
                <div className="rounded-xl bg-accent-50/50 border border-accent-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center"><i className="ri-lightbulb-line text-accent-600" /></div>
                    <span className="font-bold text-accent-800 text-sm">{quickWinsEEAT.filter(q => q.impact === 'Critique').length} quick wins critiques</span>
                  </div>
                  <p className="text-xs text-accent-700">Impact rapide : +27 pts EEAT en 12h d'effort</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: AUTHORS === */}
      {activeTab === 'authors' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Autorité des Auteurs — {authorAuthority.length} Profils</h2>
                <p className="text-foreground-600 text-sm">{overview.verifiedAuthors} vérifiés · Score moyen : {Math.round(authorAuthority.reduce((s, a) => s + a.score, 0) / authorAuthority.length)}/100 · {authorAuthority.reduce((s, a) => s + a.publications, 0)} publications cumulées</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Trier :</span>
                {[
                  { key: 'score', label: 'Score' },
                  { key: 'publications', label: 'Publications' },
                ].map((o) => (
                  <button key={o.key} onClick={() => setAuthorSort(o.key as typeof authorSort)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${authorSort === o.key ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {sortedAuthors.map((author) => (
                <div key={author.id} className={`rounded-2xl border p-5 ${author.score >= 75 ? 'border-emerald-200 bg-emerald-50/10' : author.score >= 50 ? 'border-amber-200 bg-amber-50/10' : 'border-red-200 bg-red-50/20'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex items-start gap-3 min-w-0 lg:w-80 flex-shrink-0">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-lg font-bold font-heading" style={{ backgroundColor: author.verified ? '#DCFCE7' : '#FEE2E2', color: author.verified ? '#16A34A' : '#DC2626' }}>
                        {author.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-foreground-950">{author.id}</span>
                          {author.verified && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold">✓ Vérifié</span>}
                        </div>
                        <h4 className="text-sm font-bold text-foreground-950 mt-1">{author.name}</h4>
                        <span className="text-[10px] text-foreground-500">{author.role}</span>
                        <span className="text-[9px] text-foreground-400 block mt-0.5">{author.credentials}</span>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Score</span><span className={`text-xs font-bold ${author.score >= 75 ? 'text-emerald-600' : author.score >= 50 ? 'text-amber-600' : 'text-red-500'}`}>{author.score}/100</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Publications</span><span className="text-xs font-bold text-foreground-700">{author.publications}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Citations</span><span className="text-xs font-bold text-foreground-700">{author.citations}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">LinkedIn</span><span className="text-xs font-bold text-foreground-700">{formatNumber(author.linkedinFollowers)}</span></div>
                      <div className="text-center bg-background-100 rounded-lg p-2"><span className="block text-[9px] text-foreground-400">Knowledge Panel</span><span className="text-xs font-bold">{author.googleKnowledgePanel}</span></div>
                    </div>
                    <div className="lg:w-48 flex-shrink-0 flex flex-col gap-1">
                      <span className={`text-[10px] px-2 py-1 rounded-lg border font-bold text-center ${schemaStatusBadge(author.schemaMarkup)}`}>{author.schemaMarkup}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: MENTIONS === */}
      {activeTab === 'mentions' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Mentions de Marque — {brandMentions.length} Citations Externes</h2>
                <p className="text-foreground-600 text-sm">{brandMentions.filter(m => m.dofollow).length} dofollow · DA moyen {Math.round(brandMentions.reduce((s, m) => s + m.domainAuthority, 0) / brandMentions.length)} · Sentiment très positif dominant</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400">Lien :</span>
                {(['all', 'dofollow', 'nofollow'] as const).map((f) => (
                  <button key={f} onClick={() => setMentionFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${mentionFilter === f ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {f === 'all' ? 'Tous' : f}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {filteredMentions.map((m) => (
                <div key={m.id} className="rounded-2xl border border-background-200/70 bg-background-50 p-5">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex items-start gap-3 min-w-0 lg:w-80 flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: m.domainAuthority >= 80 ? '#DCFCE7' : m.domainAuthority >= 65 ? '#FEF3C7' : '#F3F4F6' }}>
                        <span className="text-xs font-bold" style={{ color: m.domainAuthority >= 80 ? '#16A34A' : m.domainAuthority >= 65 ? '#D97706' : '#6B7280' }}>DA {m.domainAuthority}</span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-foreground-950 block">{m.source}</span>
                        <span className="text-sm text-foreground-700 block mt-0.5">{m.title}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold ${sentimentBadge(m.sentiment)}`}>{m.sentiment}</span>
                          <span className="text-[9px] text-foreground-400">{m.type} · {m.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-wrap items-center gap-3">
                      <span className={`text-[10px] px-2 py-1 rounded-full border font-bold ${m.dofollow ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-background-100 text-foreground-400 border-background-200'}`}>
                        {m.dofollow ? '✓ dofollow' : '✗ nofollow'}
                      </span>
                      <span className="text-[10px] text-foreground-500 font-mono">{m.anchorText}</span>
                    </div>
                    {m.url && (
                      <a href={m.url} target="_blank" rel="nofollow noopener noreferrer" className="text-[10px] text-accent-600 hover:underline font-mono flex-shrink-0 max-w-[200px] truncate">{m.url}</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: TRUST === */}
      {activeTab === 'trust' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Signaux de Confiance — {trustSignals.length} Éléments</h2>
                <p className="text-foreground-600 text-sm">{trustSignals.filter(t => t.status === 'Actif').length} actifs · {trustSignals.filter(t => t.impact === 'Très Élevé').length} impact très élevé</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-foreground-400">Catégorie :</span>
                {(['all', 'Certifications', 'Accréditations', 'Partenariats', 'Prix', 'Publications', 'Affiliations'] as const).map((c) => (
                  <button key={c} onClick={() => setTrustCategory(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${trustCategory === c ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}>
                    {c === 'all' ? 'Toutes' : c}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {filteredTrust.map((ts) => (
                <div key={ts.id} className={`rounded-2xl border p-5 ${ts.status === 'Actif' || ts.status === 'Reçu' || ts.status === 'Publié' ? 'border-emerald-200 bg-emerald-50/10' : ts.status === 'En cours' ? 'border-amber-200 bg-amber-50/10' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex items-start gap-3 min-w-0 lg:w-80 flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: ts.impact === 'Très Élevé' ? '#DCFCE7' : ts.impact === 'Élevé' ? '#FEF3C7' : '#F3F4F6' }}>
                        <i className={`text-lg ${ts.category === 'Certifications' ? 'ri-award-line' : ts.category === 'Accréditations' ? 'ri-building-4-line' : ts.category === 'Prix' ? 'ri-trophy-line' : ts.category === 'Publications' ? 'ri-book-open-line' : 'ri-group-line'} ${ts.impact === 'Très Élevé' ? 'text-emerald-600' : ts.impact === 'Élevé' ? 'text-amber-600' : 'text-foreground-400'}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-foreground-950">{ts.id}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-foreground-50 text-foreground-500 border border-foreground-200">{ts.category}</span>
                        </div>
                        <h4 className="text-sm font-bold text-foreground-950 mt-1">{ts.name}</h4>
                        <span className="text-[10px] text-foreground-500">{ts.description}</span>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] px-2 py-1 rounded-full border font-bold ${ts.status === 'Actif' || ts.status === 'Reçu' || ts.status === 'Publié' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : ts.status === 'En cours' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-background-100 text-foreground-400 border-background-200'}`}>
                        {ts.status}
                      </span>
                      <span className={`text-[10px] px-2 py-1 rounded-full border font-bold ${ts.impact === 'Très Élevé' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ts.impact === 'Élevé' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-background-50 text-foreground-400 border-background-200'}`}>
                        Impact {ts.impact}
                      </span>
                      {ts.expiry !== '—' && <span className="text-[10px] text-foreground-400">Expire : {ts.expiry}</span>}
                    </div>
                    {ts.verificationUrl && (
                      <a href={ts.verificationUrl} target="_blank" rel="nofollow noopener noreferrer" className="text-[10px] text-accent-600 hover:underline font-mono flex-shrink-0 bg-background-100 px-2 py-1 rounded-lg whitespace-nowrap">
                        <i className="ri-external-link-line mr-1" />Vérifier
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: ABOUT === */}
      {activeTab === 'about' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Optimisation Pages Institutionnelles — {aboutOptimization.length} Pages</h2>
              <p className="text-foreground-600 text-sm">Score moyen {Math.round(aboutOptimization.reduce((s, a) => s + a.currentScore, 0) / aboutOptimization.length)}/100 → cible {Math.round(aboutOptimization.reduce((s, a) => s + a.targetScore, 0) / aboutOptimization.length)}/100 · {aboutOptimization.reduce((s, a) => s + a.gaps, 0)} gaps totaux</p>
            </div>
            <div className="space-y-3">
              {aboutOptimization.map((abt) => (
                <div key={abt.id} className={`rounded-2xl border p-5 ${abt.currentScore < 70 ? 'border-red-200 bg-red-50/20' : abt.currentScore < 80 ? 'border-amber-200 bg-amber-50/10' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex items-start gap-3 min-w-0 lg:w-72 flex-shrink-0">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="6" />
                          <circle cx="50" cy="50" r="42" fill="none" stroke={abt.currentScore >= 80 ? '#86BC25' : abt.currentScore >= 65 ? '#F59E0B' : '#DC2626'} strokeWidth="6"
                            strokeDasharray={`${(abt.currentScore / 100) * 264} 264`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold font-heading text-foreground-950">{abt.currentScore}</span>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-foreground-950">{abt.id}</span>
                        <h4 className="text-sm font-bold text-foreground-950 mt-1">{abt.title}</h4>
                        <span className="text-[10px] text-foreground-400 font-mono">{abt.page}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {abt.issues.map((issue, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
                            <i className="ri-error-warning-line text-xs" />{issue}
                          </span>
                        ))}
                      </div>
                      <p className="text-[10px] text-foreground-500"><strong className="text-foreground-700">Action :</strong> {abt.actions}</p>
                    </div>
                    <div className="flex-shrink-0 text-center">
                      <span className="block text-xs font-bold text-red-500">{abt.gaps} gaps</span>
                      <span className="block text-[9px] text-foreground-400">{abt.currentScore} → {abt.targetScore}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: REVIEWS === */}
      {activeTab === 'reviews' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Avis Externes — {externalReviews.length} Plateformes</h2>
              <p className="text-foreground-600 text-sm">Note moyenne {externalReviews.reduce((s, r) => s + r.rating, 0) / externalReviews.length}★ · {externalReviews.filter(r => r.responseStatus === 'Répondu').length}/{externalReviews.length} répondus</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {externalReviews.map((rev) => (
                <div key={rev.id} className={`rounded-2xl border p-5 ${rev.responseStatus === 'Non répondu' ? 'border-red-200 bg-red-50/20' : 'border-background-200/70 bg-background-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-foreground-950">{rev.platform}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-amber-500">{rev.rating}★</span>
                      <span className="text-[10px] text-foreground-400">({rev.totalReviews})</span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-600 italic mb-3">"{rev.latestReview}"</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-foreground-500">{rev.reviewer} · {rev.date}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${rev.responseStatus === 'Répondu' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                      {rev.responseStatus}
                    </span>
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
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Quick Wins E-E-A-T — {quickWinsEEAT.length} Actions Prioritaires</h2>
              <p className="text-foreground-600 text-sm">{quickWinsEEAT.filter(q => q.impact === 'Critique').length} critiques · Impact cumulé : +63 pts EEAT · Effort total : {quickWinsEEAT.reduce((s, q) => { const h = parseInt(q.effort) || 0; return s + h; }, 0)}h</p>
            </div>
            <div className="space-y-3">
              {quickWinsEEAT.map((qw) => (
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
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème KOS — E-E-A-T & Brand Authority</h2>
            <p className="text-foreground-600">Le hub E-E-A-T renforce l'autorité et la confiance — piliers du SEO 2026.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'E-E-A-T & Authority', path: '/kos-seo-eeat-authority', icon: 'ri-medal-line', color: '#F59E0B', current: true },
              { label: 'CRO & Conversion', path: '/kos-seo-cro-conversion', icon: 'ri-line-chart-line', color: '#86BC25' },
              { label: 'Backlink Intelligence', path: '/kos-backlink-intelligence-audit', icon: 'ri-link', color: '#CA8A04' },
              { label: 'Social SEO', path: '/kos-seo-social-authority', icon: 'ri-share-line', color: '#4A7A1E' },
              { label: 'Schema.org Audit', path: '/kos-schema-org-audit', icon: 'ri-code-box-line', color: '#D97757' },
              { label: 'SEO On-Page', path: '/kos-seo-onpage-content', icon: 'ri-file-search-line', color: '#9B7B2C' },
              { label: 'AI Visibility', path: '/kos-ai-visibility-command', icon: 'ri-cpu-line', color: '#C05A3A' },
              { label: 'Performance SEO', path: '/kos-performance-seo-command', icon: 'ri-speed-line', color: '#4285F4' },
            ].map((link) => (
              <a key={link.path + link.label} href={link.path}
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





