import { useState } from 'react';
import SeoHead from '@/components/feature/SeoHead';
import hubLayout from '@/components/feature/hubLayout';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { useGlobalVisibilityCommand } from '@/hooks/useGlobalVisibilityCommand';
import type { LanguageSEOStats, AcademicPublication, MediaPartnership, AIPlatformVisibility, MonthlyVisibilityObjective, MonthlyVisibilityKPI } from '@/mocks/globalVisibilityCommand';

type TabId = 'cockpit' | 'seo-multilingue' | 'publications' | 'medias' | 'ia-generatives' | 'plan-visibilite' | 'kpis';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'cockpit', label: 'Cockpit', icon: 'ri-dashboard-3-line' },
  { id: 'seo-multilingue', label: 'SEO Multilingue', icon: 'ri-global-line' },
  { id: 'publications', label: 'Publications', icon: 'ri-book-open-line' },
  { id: 'medias', label: 'Partenariats Médias', icon: 'ri-newspaper-line' },
  { id: 'ia-generatives', label: 'IA Génératives', icon: 'ri-robot-2-line' },
  { id: 'plan-visibilite', label: 'Plan Visibilité', icon: 'ri-road-map-line' },
  { id: 'kpis', label: 'KPIs Mensuels', icon: 'ri-bar-chart-grouped-line' },
];

function formatNumber(val: number): string {
  if (val >= 1000000) return (val / 1000000).toFixed(1) + ' M';
  if (val >= 1000) return (val / 1000).toFixed(1) + ' K';
  return String(val);
}

function formatFCFA(val: number): string {
  if (val >= 1000000000) return (val / 1000000000).toFixed(2) + ' Md';
  if (val >= 1000000) return (val / 1000000).toFixed(1) + ' M';
  return (val / 1000).toFixed(0) + ' K';
}

function scoreColor(score: number): string {
  if (score >= 85) return 'text-accent-600';
  if (score >= 70) return 'text-secondary-600';
  if (score >= 50) return 'text-amber-500';
  return 'text-red-500';
}

function scoreBg(score: number): string {
  if (score >= 85) return 'bg-accent-500';
  if (score >= 70) return 'bg-secondary-500';
  if (score >= 50) return 'bg-amber-500';
  return 'bg-red-500';
}

function statusBadge(status: string): string {
  switch (status) {
    case 'excellence': return 'bg-accent-100 text-accent-700 border-accent-200';
    case 'avance': return 'bg-secondary-100 text-secondary-700 border-secondary-200';
    case 'intermediaire': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'emergent': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'critique': return 'bg-red-100 text-red-700 border-red-200';
    case 'optimisé': return 'bg-accent-100 text-accent-700 border-accent-200';
    case 'bon': return 'bg-secondary-100 text-secondary-700 border-secondary-200';
    case 'ameliorer': return 'bg-amber-100 text-amber-700 border-amber-200';
    default: return 'bg-background-100 text-foreground-500 border-background-200';
  }
}

export default function globalVisibilityCommandPage() {
  const [activeTab, setActiveTab] = useState<TabId>('cockpit');
  const data = useGlobalVisibilityCommand();

  return (
    <hubLayout hubId={85}>
      <SeoHead
        title="KOS Global Visibility Command — Visibilité Globale | KHEPRA EXPERTS"
        description="Centre de commandement unifié de la visibilité globale KOS. SEO multilingue FR/EN/PT, publications académiques, partenariats médias internationaux, optimisation IA génératives (ChatGPT, Gemini, Copilot). Score 56/100 → cible 88/100. Plan 12 mois."
        canonical="/kos-global-visibility-command"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-18">
          <ScrollReveal>
            <Breadcrumb items={[
              { label: 'Accueil', href: '/' },
              { label: 'KOS Global Visibility Command', href: '/kos-global-visibility-command' },
            ]} />
            <div className="mt-6 flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-200">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="text-xs font-semibold text-amber-700">SCORE GLOBAL : {data.overview.overall}/100 — CIBLE {data.overview.target}/100</span>
                  </span>
                  <span className="text-xs text-foreground-400">
                    Dernier audit : {data.overview.assessmentDate}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground-950 leading-tight">
                  KOS Global Visibility Command
                </h1>
                <p className="mt-4 text-lg text-foreground-600 max-w-2xl">
                  Centre de commandement unifié de la visibilité globale KOS. Quatre piliers interconnectés — <strong className="text-foreground-800">SEO multilingue, publications académiques, partenariats médias internationaux et optimisation pour IA génératives</strong>. Un plan de visibilité sur 12 mois avec 48 actions correctives pour un budget total de 248 M FCFA.
                </p>
                <p className="mt-3 text-sm text-foreground-500">
                  Évalué par le consortium PwC · Deloitte · EY · KPMG — Practice Digital Visibility
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0">
                {data.metrics.map((m) => (
                  <div key={m.category} className="bg-background-50 border border-background-200 rounded-xl p-3 text-center min-w-[100px]">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center bg-background-100">
                      <i className={`${m.icon} text-foreground-600 text-sm`}></i>
                    </div>
                    <p className={`text-xl font-bold ${scoreColor(m.score)}`}>{m.score}</p>
                    <p className="text-[10px] text-foreground-400 leading-tight">{m.category.split('(')[0].trim()}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-md border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'text-foreground-600 hover:bg-background-100'
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
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {activeTab === 'cockpit' && <CockpitTab data={data} />}
        {activeTab === 'seo-multilingue' && <SEOMultilingueTab data={data} />}
        {activeTab === 'publications' && <PublicationsTab data={data} />}
        {activeTab === 'medias' && <MediasTab data={data} />}
        {activeTab === 'ia-generatives' && <IAGenerativesTab data={data} />}
        {activeTab === 'plan-visibilite' && <PlanVisibiliteTab data={data} />}
        {activeTab === 'kpis' && <KPIsTab data={data} />}
      </div>
    </hubLayout>
  );
}

// ================================================================
// TAB 1 : COCKPIT
// ================================================================
function CockpitTab({ data }: { data: ReturnType<typeof useGlobalVisibilityCommand> }) {
  return (
    <div className="space-y-10">
      {/* Score global + radar */}
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-background-50 border border-background-200 rounded-xl p-8 text-center">
            <h2 className="text-lg font-semibold text-foreground-950 mb-6">Score Global de Visibilité</h2>
            <div className="relative w-40 h-40 mx-auto mb-4">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="68" fill="none" stroke="var(--background-200)" strokeWidth="12" />
                <circle cx="80" cy="80" r="68" fill="none" stroke="var(--accent-500)" strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={`${(data.overview.overall / 100) * 427} 427`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold text-foreground-950">{data.overview.overall}</span>
                <span className="text-xs text-foreground-400">/100</span>
              </div>
            </div>
            <p className="text-sm text-foreground-500">Cible : <strong className="text-accent-600">{data.overview.target}/100</strong></p>
            <p className="text-sm text-foreground-500">Tendance : <strong className="text-accent-600">+{data.overview.trend} pts</strong></p>
          </div>
          <div className="lg:col-span-2 bg-background-50 border border-background-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground-950 mb-5">Radar de Visibilité — 4 Piliers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {data.metrics.map((m) => (
                <div key={m.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground-800">{m.category.split('(')[0].trim()}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${scoreColor(m.score)}`}>{m.score}/100</span>
                      <span className="text-xs text-accent-600">+{m.trend}</span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-background-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${scoreBg(m.score)}`}
                      style={{ width: `${m.score}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-foreground-400">
                    <span>Cible : {m.target}</span>
                    <span className="px-1.5 py-0.5 rounded-full border text-[10px] font-medium ${statusBadge(m.status)}">{m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Résumé exécutif */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground-950 mb-4">Résumé Exécutif — Consortium Big Four</h2>
          <p className="text-sm text-foreground-600 leading-relaxed">{data.overview.executiveSummary}</p>
        </div>
      </ScrollReveal>

      {/* Quick stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
          {[
            { label: 'Pages Indexées', value: data.overview.quickStats.totalPagesIndexed, icon: 'ri-file-text-line' },
            { label: 'Backlinks', value: formatNumber(data.overview.quickStats.totalBacklinks), icon: 'ri-link' },
            { label: 'Domain Rating', value: data.overview.quickStats.domainRating, icon: 'ri-bar-chart-line' },
            { label: 'Trafic Mensuel', value: formatNumber(data.overview.quickStats.organicTrafficMonthly), icon: 'ri-line-chart-line' },
            { label: 'White Papers', value: data.overview.quickStats.whitepapersPublished, icon: 'ri-book-open-line' },
            { label: 'Partenariats', value: data.overview.quickStats.mediaPartnershipsActive, icon: 'ri-newspaper-line' },
            { label: 'Score GEO', value: `${data.overview.quickStats.geoScore}/100`, icon: 'ri-robot-2-line' },
          ].map((s) => (
            <div key={s.label} className="bg-background-50 border border-background-200 rounded-xl p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center bg-background-100">
                <i className={`${s.icon} text-foreground-600 text-sm`}></i>
              </div>
              <p className="text-xl font-bold text-foreground-950">{s.value}</p>
              <p className="text-[10px] text-foreground-400">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Alerte critique */}
      <ScrollReveal>
        <div className="border border-red-200 bg-red-50/30 rounded-xl p-5">
          <h3 className="font-semibold text-red-800 flex items-center gap-2 mb-2">
            <i className="ri-alert-line"></i> Alertes Prioritaires — 4 Gaps Critiques
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-red-700">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-600">1</span>
              <span><strong>Publications académiques (48/100)</strong> — Seulement 8 white papers publiés, 0 papier académique dans un journal à comité de lecture. Urgence absolue.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-600">2</span>
              <span><strong>Partenariats médias (52/100)</strong> — 5 partenariats actifs mais absence de couverture broadcast (BBC, CNBC) et agence (Reuters) non finalisée.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-600">3</span>
              <span><strong>Contenu PT (12 pages)</strong> — Quasi-inexistant. Marché PALOP (5 pays, 60M+ habitants) totalement sous-exploité. Score SEO 28/100.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-600">4</span>
              <span><strong>Visibilité Claude/Anthropic (38/100)</strong> — Plus forte croissance (+35%) mais score absolu le plus bas. Contenu long format EN insuffisant.</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 2 : SEO MULTILINGUE
// ================================================================
function SEOMultilingueTab({ data }: { data: ReturnType<typeof useGlobalVisibilityCommand> }) {
  const [selectedLang, setSelectedLang] = useState<'FR' | 'EN' | 'PT'>('FR');

  const currentLang: LanguageSEOStats = selectedLang === 'FR' ? data.frSEO : selectedLang === 'EN' ? data.enSEO : data.ptSEO;

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Audit SEO Multilingue — FR / EN / PT</h2>
        <p className="text-sm text-foreground-500">
          {data.multilingual.reduce((s, l) => s + l.pages, 0)} pages indexées · Trafic combiné {formatNumber(data.multilingual.reduce((s, l) => s + l.trafic, 0))} sessions/mois · Gap total {formatNumber(data.multilingual.reduce((s, l) => s + l.gapPages, 0))} pages
        </p>
      </ScrollReveal>

      {/* Langue selector */}
      <ScrollReveal>
        <div className="flex items-center gap-3">
          {(['FR', 'EN', 'PT'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedLang === lang
                  ? 'border-foreground-950 bg-foreground-950 text-white'
                  : 'border-background-200 bg-background-50 text-foreground-600 hover:border-foreground-300'
              }`}
            >
              <span className="text-lg">{lang === 'FR' ? '🇫🇷' : lang === 'EN' ? '🇬🇧' : '🇵🇹'}</span>
              {lang === 'FR' ? 'Français' : lang === 'EN' ? 'English' : 'Português'}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedLang === lang ? 'bg-white/20' : 'bg-background-100'}`}>
                {lang === 'FR' ? data.frSEO.scoreSEO : lang === 'EN' ? data.enSEO.scoreSEO : data.ptSEO.scoreSEO}/100
              </span>
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Language details */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{selectedLang === 'FR' ? '🇫🇷' : selectedLang === 'EN' ? '🇬🇧' : '🇵🇹'}</span>
            <div>
              <h3 className="text-xl font-bold text-foreground-950">{selectedLang === 'FR' ? 'Français' : selectedLang === 'EN' ? 'English' : 'Português'}</h3>
              <p className="text-sm text-foreground-500">Score SEO {currentLang.scoreSEO}/100 · {currentLang.pages} pages indexées</p>
            </div>
            <div className="ml-auto">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="var(--background-200)" strokeWidth="6" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke={currentLang.scoreSEO >= 85 ? 'var(--accent-500)' : currentLang.scoreSEO >= 60 ? 'var(--secondary-500)' : 'var(--red-500)'}
                    strokeWidth="6" strokeDasharray={`${(currentLang.scoreSEO / 100) * 264} 264`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-foreground-950">{currentLang.scoreSEO}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-background-100 rounded-lg p-3 text-center">
              <span className="text-[10px] text-foreground-400">Pages</span>
              <p className="text-lg font-bold text-foreground-950">{currentLang.pages}<span className="text-xs text-foreground-400 font-normal">/{currentLang.targetPages}</span></p>
            </div>
            <div className="bg-background-100 rounded-lg p-3 text-center">
              <span className="text-[10px] text-foreground-400">Trafic</span>
              <p className="text-lg font-bold text-foreground-950">{formatNumber(currentLang.trafic)}<span className="text-xs text-foreground-400 font-normal">/{formatNumber(currentLang.targetTrafic)}</span></p>
            </div>
            <div className="bg-background-100 rounded-lg p-3 text-center">
              <span className="text-[10px] text-foreground-400">KW Top 3</span>
              <p className="text-lg font-bold text-accent-600">{currentLang.motsClesTop3}</p>
            </div>
            <div className="bg-background-100 rounded-lg p-3 text-center">
              <span className="text-[10px] text-foreground-400">KW Top 10</span>
              <p className="text-lg font-bold text-accent-600">{currentLang.motsClesTop10}</p>
            </div>
            <div className="bg-background-100 rounded-lg p-3 text-center">
              <span className="text-[10px] text-foreground-400">Featured Snippets</span>
              <p className="text-lg font-bold text-accent-600">{currentLang.featuredSnippets}</p>
            </div>
          </div>

          {/* Top Keywords */}
          <h4 className="text-sm font-semibold text-foreground-950 mb-3">Top 5 Mots-Clés</h4>
          <div className="space-y-2">
            {currentLang.topKeywords.map((kw) => (
              <div key={kw.kw} className="flex items-center justify-between bg-background-100 rounded-lg px-4 py-2.5">
                <span className="text-sm text-foreground-800 truncate max-w-[60%]">{kw.kw}</span>
                <div className="flex items-center gap-4 text-xs">
                  <span className="font-bold text-foreground-950">#{kw.position}</span>
                  <span className="text-foreground-500">{formatNumber(kw.volume)} vol.</span>
                  <span className="text-accent-600 font-medium">+{kw.evolution}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-foreground-400">
            <span>hreflang : {currentLang.hreflangOK ? <span className="text-accent-600 font-medium">OK</span> : <span className="text-red-500 font-medium">Erreurs</span>}</span>
            <span>·</span>
            <span>Original : {currentLang.contenuOriginal}</span>
            <span>·</span>
            <span>Traduit : {currentLang.contenuTraduit}</span>
            <span>·</span>
            <span>Gap : <span className="text-red-500 font-medium">{currentLang.gapPages} pages</span></span>
          </div>
        </div>
      </ScrollReveal>

      {/* Comparatif 3 langues */}
      <ScrollReveal>
        <h3 className="text-lg font-bold text-foreground-950 mb-4">Comparatif Multilingue</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.multilingual.map((lang) => (
            <div key={lang.langue} className={`bg-background-50 border rounded-xl p-5 ${lang.langue === 'FR' ? 'border-accent-200' : lang.langue === 'EN' ? 'border-secondary-200' : 'border-amber-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-foreground-950">{lang.langue === 'FR' ? '🇫🇷 Français' : lang.langue === 'EN' ? '🇬🇧 English' : '🇵🇹 Português'}</span>
                <span className={`text-xl font-bold ${scoreColor(lang.scoreSEO)}`}>{lang.scoreSEO}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-foreground-500">Pages</span><span className="font-medium">{lang.pages}/{lang.targetPages}</span></div>
                <div className="flex justify-between"><span className="text-foreground-500">Trafic</span><span className="font-medium">{formatNumber(lang.trafic)}</span></div>
                <div className="flex justify-between"><span className="text-foreground-500">KW Top 10</span><span className="font-medium">{lang.motsClesTop10}</span></div>
                <div className="flex justify-between"><span className="text-foreground-500">Snippets</span><span className="font-medium">{lang.featuredSnippets}</span></div>
                <div className="flex justify-between"><span className="text-foreground-500">Gap</span><span className="font-medium text-red-500">{lang.gapPages} pages</span></div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 3 : PUBLICATIONS ACADÉMIQUES
// ================================================================
function PublicationsTab({ data }: { data: ReturnType<typeof useGlobalVisibilityCommand> }) {
  const [filter, setFilter] = useState<'tous' | 'publié' | 'planifié'>('tous');

  const filteredPubs: AcademicPublication[] = filter === 'tous'
    ? data.publications
    : data.publications.filter(p => p.statut === filter);

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground-950 mb-1">Publications Académiques & White Papers</h2>
            <p className="text-sm text-foreground-500">
              {data.publishedPapers.length} publiés · {data.plannedPapers.length} planifiés · {data.publications.reduce((s, p) => s + p.citations, 0)} citations cumulées · {formatNumber(data.publications.reduce((s, p) => s + p.telechargements, 0))} téléchargements
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(['tous', 'publié', 'planifié'] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                  filter === f ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'
                }`}>
                {f === 'tous' ? 'Tous' : f === 'publié' ? 'Publiés' : 'Planifiés'}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <div className="space-y-4">
        {filteredPubs.map((pub) => (
          <ScrollReveal key={pub.id}>
            <div className={`bg-background-50 border rounded-xl p-5 transition-colors ${
              pub.statut === 'publié' ? 'border-background-200 hover:border-background-300' :
              pub.statut === 'planifié' ? 'border-amber-200 bg-amber-50/10' :
              'border-secondary-200 bg-secondary-50/10'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                      pub.type === 'white_paper' ? 'bg-accent-100 text-accent-700 border-accent-200' :
                      pub.type === 'barometer' ? 'bg-secondary-100 text-secondary-700 border-secondary-200' :
                      pub.type === 'research_report' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                      'bg-background-100 text-foreground-500 border-background-200'
                    }`}>
                      {pub.type === 'white_paper' ? 'White Paper' : pub.type === 'barometer' ? 'Baromètre' : pub.type === 'research_report' ? 'Rapport Recherche' : pub.type === 'policy_paper' ? 'Policy Paper' : 'Article Académique'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200">
                      {pub.langue === 'FR' ? '🇫🇷 FR' : pub.langue === 'EN' ? '🇬🇧 EN' : '🇵🇹 PT'}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                      pub.statut === 'publié' ? 'bg-accent-100 text-accent-700 border-accent-200' :
                      pub.statut === 'planifié' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                      'bg-secondary-100 text-secondary-700 border-secondary-200'
                    }`}>{pub.statut}</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground-950 mb-2">{pub.titre}</h3>
                  <p className="text-xs text-foreground-500 mb-3 line-clamp-2">{pub.abstract}</p>
                  <div className="flex items-center gap-4 text-xs text-foreground-400 flex-wrap">
                    <span>{pub.pages} pages</span>
                    <span>·</span>
                    <span>{pub.datePublication}</span>
                    <span>·</span>
                    <span>{pub.auteurs.join(', ')}</span>
                    {pub.journal && <><span>·</span><span className="text-foreground-600">{pub.journal}</span></>}
                  </div>
                </div>
                {pub.statut === 'publié' && (
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-center">
                      <p className="text-lg font-bold text-accent-600">{pub.citations}</p>
                      <p className="text-[10px] text-foreground-400">Citations</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground-950">{formatNumber(pub.telechargements)}</p>
                      <p className="text-[10px] text-foreground-400">Téléch.</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-accent-600">{pub.backlinksGeneres}</p>
                      <p className="text-[10px] text-foreground-400">Backlinks</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// TAB 4 : PARTENARIATS MÉDIAS
// ================================================================
function MediasTab({ data }: { data: ReturnType<typeof useGlobalVisibilityCommand> }) {
  const [mediaFilter, setMediaFilter] = useState<'tous' | 'actif' | 'negociation' | 'cible'>('tous');

  const filteredMedias: MediaPartnership[] = mediaFilter === 'tous'
    ? data.medias
    : data.medias.filter(m => m.statut === mediaFilter);

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground-950 mb-1">Partenariats Médias Internationaux</h2>
            <p className="text-sm text-foreground-500">
              {data.activeMedias.length} actifs · {data.negotiatingMedias.length} en négociation · {data.targetMedias.length} ciblés · {data.activeMedias.reduce((s, m) => s + m.mentionsMensuelles, 0)} mentions/mois
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(['tous', 'actif', 'negociation', 'cible'] as const).map((f) => (
              <button key={f} onClick={() => setMediaFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                  mediaFilter === f ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'
                }`}>
                {f === 'tous' ? 'Tous' : f === 'actif' ? 'Actifs' : f === 'negociation' ? 'En Négociation' : 'Cibles'}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <div className="space-y-4">
        {filteredMedias.map((media) => (
          <ScrollReveal key={media.id}>
            <div className={`bg-background-50 border rounded-xl p-5 transition-colors ${
              media.statut === 'actif' ? 'border-accent-200 hover:border-accent-300' :
              media.statut === 'negociation' ? 'border-secondary-200 bg-secondary-50/10' :
              'border-amber-200 bg-amber-50/10'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-3 min-w-0 lg:w-72 flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    media.niveau === 'premium' ? 'bg-accent-100' : media.niveau === 'standard' ? 'bg-secondary-100' : 'bg-background-100'
                  }`}>
                    <i className={`${media.logo} text-xl ${
                      media.niveau === 'premium' ? 'text-accent-600' : media.niveau === 'standard' ? 'text-secondary-600' : 'text-foreground-500'
                    }`}></i>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-foreground-950">{media.media}</h3>
                    <p className="text-[11px] text-foreground-500">{media.type === 'presse_eco' ? 'Presse Éco' : media.type === 'agence' ? 'Agence' : media.type === 'broadcast' ? 'Broadcast' : media.type === 'digital' ? 'Digital' : 'Académique'} · {media.region}</p>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="text-center bg-background-100 rounded-lg p-2">
                    <span className="block text-[9px] text-foreground-400">Audience</span>
                    <span className="text-xs font-bold text-foreground-950">{formatNumber(media.audience)}</span>
                  </div>
                  <div className="text-center bg-background-100 rounded-lg p-2">
                    <span className="block text-[9px] text-foreground-400">Mentions/mois</span>
                    <span className="text-xs font-bold text-foreground-950">{media.mentionsMensuelles}</span>
                  </div>
                  <div className="text-center bg-background-100 rounded-lg p-2">
                    <span className="block text-[9px] text-foreground-400">Valeur</span>
                    <span className="text-xs font-bold text-foreground-950">{formatFCFA(media.valeurFCFA)}</span>
                  </div>
                  <div className="text-center bg-background-100 rounded-lg p-2">
                    <span className="block text-[9px] text-foreground-400">Statut</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      media.statut === 'actif' ? 'bg-accent-100 text-accent-700' :
                      media.statut === 'negociation' ? 'bg-secondary-100 text-secondary-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>{media.statut}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-background-200 flex flex-wrap items-center gap-3 text-[10px] text-foreground-400">
                <span><strong className="text-foreground-600">Contenu :</strong> {media.typeContenu}</span>
                <span>·</span>
                <span><strong className="text-foreground-600">Contact :</strong> {media.contactStatus}</span>
                {media.derniereMention !== '—' && <><span>·</span><span><strong className="text-foreground-600">Dernière mention :</strong> {media.derniereMention}</span></>}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// TAB 5 : IA GÉNÉRATIVES
// ================================================================
function IAGenerativesTab({ data }: { data: ReturnType<typeof useGlobalVisibilityCommand> }) {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground-950 mb-1">Visibilité sur les IA Génératives</h2>
        <p className="text-sm text-foreground-500">
          5 plateformes monitorées · Score GEO moyen {Math.round(data.aiPlatforms.reduce((s, p) => s + p.scoreVisibilite, 0) / data.aiPlatforms.length)}/100 · {data.aiPlatforms.reduce((s, p) => s + p.citations, 0)} citations cumulées
        </p>
      </ScrollReveal>

      <div className="space-y-6">
        {data.aiPlatforms.map((platform) => (
          <ScrollReveal key={platform.plateforme}>
            <div className={`bg-background-50 border rounded-xl p-6 ${
              platform.statut === 'optimisé' ? 'border-accent-200' :
              platform.statut === 'bon' ? 'border-secondary-200' :
              'border-amber-200'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      platform.statut === 'optimisé' ? 'bg-accent-100' :
                      platform.statut === 'bon' ? 'bg-secondary-100' :
                      'bg-amber-100'
                    }`}>
                      <i className={`${platform.logo} text-xl ${
                        platform.statut === 'optimisé' ? 'text-accent-600' :
                        platform.statut === 'bon' ? 'text-secondary-600' :
                        'text-amber-600'
                      }`}></i>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground-950">{platform.plateforme}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${statusBadge(platform.statut)}`}>{platform.statut}</span>
                    </div>
                    <div className="ml-auto text-right">
                      <p className={`text-3xl font-bold ${scoreColor(platform.scoreVisibilite)}`}>{platform.scoreVisibilite}</p>
                      <p className="text-[10px] text-foreground-400">/100 · Cible {platform.targetScore}</p>
                    </div>
                  </div>

                  <div className="w-full h-2.5 bg-background-200 rounded-full overflow-hidden mb-4">
                    <div className={`h-full rounded-full transition-all duration-700 ${scoreBg(platform.scoreVisibilite)}`}
                      style={{ width: `${platform.scoreVisibilite}%` }}></div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-background-100 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-foreground-950">{platform.citations}</p>
                      <p className="text-[10px] text-foreground-400">Citations</p>
                    </div>
                    <div className="bg-background-100 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-foreground-950">{platform.featuredSnippets}</p>
                      <p className="text-[10px] text-foreground-400">Featured Snippets</p>
                    </div>
                    <div className="bg-background-100 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-accent-600">+{platform.tendances}%</p>
                      <p className="text-[10px] text-foreground-400">Tendance</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-semibold text-accent-700 mb-2">Points Forts</h4>
                      <ul className="space-y-1">
                        {platform.pointsForts.map((pf) => (
                          <li key={pf} className="flex items-start gap-2 text-xs text-foreground-600">
                            <i className="ri-check-line text-accent-500 mt-0.5 flex-shrink-0"></i>
                            {pf}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-red-600 mb-2">Points Faibles</h4>
                      <ul className="space-y-1">
                        {platform.pointsFaibles.map((pf) => (
                          <li key={pf} className="flex items-start gap-2 text-xs text-foreground-600">
                            <i className="ri-close-line text-red-400 mt-0.5 flex-shrink-0"></i>
                            {pf}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-background-200">
                    <h4 className="text-xs font-semibold text-foreground-700 mb-2">Actions Recommandées</h4>
                    <div className="flex flex-wrap gap-2">
                      {platform.actionsRecommandees.map((a) => (
                        <span key={a} className="text-[10px] px-2 py-1 rounded-full bg-accent-50 text-accent-700 border border-accent-200">{a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// TAB 6 : PLAN DE VISIBILITÉ
// ================================================================
function PlanVisibiliteTab({ data }: { data: ReturnType<typeof useGlobalVisibilityCommand> }) {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground-950 mb-1">Plan de Visibilité — 12 Mois</h2>
            <p className="text-sm text-foreground-500">
              12 objectifs mensuels · {data.plan.length} mois · Budget total {formatFCFA(data.totalBudgetPlan)} FCFA · Score 56 → {data.overview.target}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-background-200 hidden md:block"></div>
        <div className="space-y-5">
          {data.plan.map((mois: MonthlyVisibilityObjective, idx) => (
            <ScrollReveal key={mois.mois}>
              <div className="relative flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="hidden md:flex items-start gap-3 flex-shrink-0 w-48">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${
                    idx < 3 ? 'bg-red-100' : idx < 6 ? 'bg-amber-100' : idx < 9 ? 'bg-secondary-100' : 'bg-accent-100'
                  }`}>
                    <span className="text-sm font-bold text-foreground-800">{idx + 1}</span>
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-bold text-foreground-950">{mois.mois}</p>
                    <p className="text-xs text-foreground-500">{mois.label}</p>
                  </div>
                </div>
                <div className="md:hidden flex items-center gap-2 mb-2">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    idx < 3 ? 'bg-red-100 text-red-700' : idx < 6 ? 'bg-amber-100 text-amber-700' : idx < 9 ? 'bg-secondary-100 text-secondary-700' : 'bg-accent-100 text-accent-700'
                  }`}>{idx + 1}</span>
                  <span className="text-sm font-bold text-foreground-950">{mois.mois} — {mois.label}</span>
                </div>
                <div className="flex-1 bg-background-50 border border-background-200 rounded-xl p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-accent-100 text-accent-700 font-semibold">{mois.axePrincipal}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-background-100 text-foreground-500">{formatFCFA(mois.budgetFCFA)} FCFA</span>
                    <span className="text-xs text-foreground-400">{mois.responsable}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    {mois.kpis.map((kpi) => (
                      <div key={kpi.nom} className="bg-background-100 rounded-lg p-2 text-center">
                        <span className="text-[9px] text-foreground-400 block">{kpi.nom}</span>
                        <span className="text-xs font-bold text-foreground-950">{kpi.actuel} → {kpi.cible} <span className="text-[10px] text-foreground-400">{kpi.unite}</span></span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground-700 mb-2">Livrables</h4>
                    <ul className="space-y-1">
                      {mois.livrables.map((l) => (
                        <li key={l} className="flex items-start gap-2 text-xs text-foreground-600">
                          <i className="ri-checkbox-circle-line text-accent-500 mt-0.5 flex-shrink-0"></i>
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Budget summary */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-foreground-950 mb-4">Synthèse Budgétaire</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center"><p className="text-2xl font-bold text-accent-600">{formatFCFA(data.totalBudgetPlan)}</p><p className="text-xs text-foreground-400">Budget Total 12 mois</p></div>
            <div className="text-center"><p className="text-2xl font-bold text-foreground-950">48</p><p className="text-xs text-foreground-400">Actions Correctives</p></div>
            <div className="text-center"><p className="text-2xl font-bold text-foreground-950">{data.stats.publicationsPlanifiees}</p><p className="text-xs text-foreground-400">Publications Planifiées</p></div>
            <div className="text-center"><p className="text-2xl font-bold text-accent-600">{formatFCFA(1490000000)}</p><p className="text-xs text-foreground-400">ROI Projeté</p></div>
          </div>
          <p className="text-xs text-foreground-500">{data.stats.roiProjete}</p>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 7 : KPIs MENSUELS
// ================================================================
function KPIsTab({ data }: { data: ReturnType<typeof useGlobalVisibilityCommand> }) {
  const maxScore = 100;
  const maxTrafic = 110000;
  const maxCitations = 1300;

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground-950 mb-1">Tableau de Bord KPIs Mensuels</h2>
            <p className="text-sm text-foreground-500">
              13 mois de suivi · {data.kpis[0].mois} → {data.kpis[data.kpis.length - 1].mois} · Score {data.kpis[0].scoreGlobal} → {data.kpis[data.kpis.length - 1].scoreGlobal}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Score global evolution chart */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-5">Évolution du Score Global de Visibilité</h3>
          <div className="flex items-end gap-2 h-40">
            {data.kpis.map((kpi: MonthlyVisibilityKPI) => (
              <div key={kpi.mois} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                <span className="text-[10px] font-bold text-foreground-800">{kpi.scoreGlobal}</span>
                <div
                  className="w-full rounded-t-md transition-all duration-700"
                  style={{
                    height: `${(kpi.scoreGlobal / maxScore) * 140}px`,
                    backgroundColor: kpi.scoreGlobal >= 85 ? 'var(--accent-500)' : kpi.scoreGlobal >= 70 ? 'var(--secondary-500)' : kpi.scoreGlobal >= 55 ? 'oklch(0.75 0.12 80)' : 'oklch(0.6 0.18 25)',
                  }}
                ></div>
                <span className="text-[8px] text-foreground-400 whitespace-nowrap">{kpi.mois.split('-')[1]}/{kpi.mois.split('-')[0].slice(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Detailed table */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-background-200 bg-background-100">
                  <th className="text-left p-3 text-[10px] font-semibold text-foreground-500 uppercase whitespace-nowrap">Mois</th>
                  <th className="text-center p-3 text-[10px] font-semibold text-foreground-500 uppercase">Score Global</th>
                  <th className="text-center p-3 text-[10px] font-semibold text-foreground-500 uppercase">SEO Multi.</th>
                  <th className="text-center p-3 text-[10px] font-semibold text-foreground-500 uppercase">Publications</th>
                  <th className="text-center p-3 text-[10px] font-semibold text-foreground-500 uppercase">Médias</th>
                  <th className="text-center p-3 text-[10px] font-semibold text-foreground-500 uppercase">IA Gén.</th>
                  <th className="text-center p-3 text-[10px] font-semibold text-foreground-500 uppercase">Sessions</th>
                  <th className="text-center p-3 text-[10px] font-semibold text-foreground-500 uppercase">Backlinks</th>
                  <th className="text-center p-3 text-[10px] font-semibold text-foreground-500 uppercase">Citations IA</th>
                  <th className="text-left p-3 text-[10px] font-semibold text-foreground-500 uppercase">Commentaire</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-background-200">
                {data.kpis.map((kpi: MonthlyVisibilityKPI) => (
                  <tr key={kpi.mois} className="hover:bg-background-100 transition-colors">
                    <td className="p-3 font-semibold text-foreground-950 whitespace-nowrap">{kpi.mois}</td>
                    <td className={`p-3 text-center font-bold ${scoreColor(kpi.scoreGlobal)}`}>{kpi.scoreGlobal}</td>
                    <td className={`p-3 text-center font-medium ${scoreColor(kpi.seoMultilingue)}`}>{kpi.seoMultilingue}</td>
                    <td className={`p-3 text-center font-medium ${scoreColor(kpi.publications)}`}>{kpi.publications}</td>
                    <td className={`p-3 text-center font-medium ${scoreColor(kpi.medias)}`}>{kpi.medias}</td>
                    <td className={`p-3 text-center font-medium ${scoreColor(kpi.iaGeneratives)}`}>{kpi.iaGeneratives}</td>
                    <td className="p-3 text-center font-medium text-foreground-800">{formatNumber(kpi.sessionsOrganiques)}</td>
                    <td className="p-3 text-center font-medium text-foreground-800">{formatNumber(kpi.backlinks)}</td>
                    <td className="p-3 text-center font-medium text-foreground-800">{kpi.citationsIA}</td>
                    <td className="p-3 text-foreground-500 max-w-[180px] truncate">{kpi.commentaire}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

      {/* Cible finale */}
      <ScrollReveal>
        <div className="bg-accent-50 border border-accent-200 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-accent-500 flex items-center justify-center">
              <i className="ri-trophy-line text-white text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-accent-800">Cible Q2 2027 — Score Global {data.overview.target}/100</h3>
              <p className="text-sm text-accent-700">
                {data.stats.pagesMultilinguesCible} pages multilingues · {formatNumber(data.stats.traficOrganiqueCible)} sessions/mois · {data.stats.partenariatsCibles} partenariats médias · Certification {data.stats.certificationVisee}
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}



