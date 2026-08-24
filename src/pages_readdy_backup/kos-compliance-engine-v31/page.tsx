import { useState, useEffect, useCallback } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';

// ─── Types v3.1 ───
interface KpiMetrics {
  totalSources: number;
  sourcesAccessibles: number;
  sourcesBloquees: number;
  blocageUrlsInvalides: number;
  blocageSourcesNonListees: number;
  blocageTextesAbroges: number;
  isae3402Conformite: number;
  fraicheurTextes: number;
  couvertureSources: number;
  tempsReponseMoyen: number;
  scoreQualiteGlobal: number;
}

interface CategorySummary {
  category: string;
  total: number;
  ok: number;
  texts: number;
}

interface CrawlDetail {
  regulator: string;
  rootUrl: string;
  category: string;
  httpStatus: number;
  contentAvailable: boolean;
  totalTextsFound: number;
  diffSummary: string;
  errors: string[];
  blocages: string[];
  newTexts: string[];
  modifiedTexts: string[];
  abrogatedTexts: string[];
}

interface CrawlSummary {
  crawlId: string;
  version: string;
  date: string;
  kpis: KpiMetrics;
  totalTextsDetected: number;
  totalNewTexts: number;
  totalModifiedTexts: number;
  totalAbrogatedTexts: number;
  qualityAssessment: string;
  categories: CategorySummary[];
  details: CrawlDetail[];
  recommendations: string[];
}

const CATEGORY_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  bancaire: { label: 'Bancaire UMOA/CEMAC', icon: 'ri-bank-line', color: '#CA8A04' },
  assurance: { label: 'Assurance', icon: 'ri-shield-line', color: '#059669' },
  marches: { label: 'Marchés Financiers', icon: 'ri-line-chart-line', color: '#2563EB' },
  comptabilite: { label: 'Comptabilité & IFRS', icon: 'ri-calculator-line', color: '#7C3AED' },
  audit: { label: 'Audit & Qualité', icon: 'ri-file-search-line', color: '#DC2626' },
  gouvernance: { label: 'Gouvernance', icon: 'ri-government-line', color: '#0891B2' },
  international: { label: 'International', icon: 'ri-global-line', color: '#EA580C' },
};

const CATEGORY_ORDER = ['bancaire', 'assurance', 'marches', 'comptabilite', 'audit', 'gouvernance', 'international'];

export default function complianceEngineV31Page() {
  const [crawlData, setCrawlData] = useState<CrawlSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastCrawlTime, setLastCrawlTime] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'ok' | 'ko' | 'blocage'>('all');

  // ─── Invoke Crawler ───
  const invokeCrawler = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabaseUrl = (window as any).ENV?.VITE_PUBLIC_SUPABASE_URL || '';
      const supabaseAnonKey = (window as any).ENV?.VITE_PUBLIC_SUPABASE_ANON_KEY || '';

      const response = await fetch(
        `${supabaseUrl}/functions/v1/kos-compliance-daily-crawler`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const result = await response.json();
      setCrawlData(result.summary);
      setLastCrawlTime(new Date().toLocaleString('fr-FR'));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── Auto-load on mount ───
  useEffect(() => {
    invokeCrawler();
  }, [invokeCrawler]);

  // ─── Filter regulators ───
  const filteredDetails = crawlData?.details.filter(d => {
    if (activeFilter === 'ok') return d.contentAvailable && d.blocages.length === 0;
    if (activeFilter === 'ko') return !d.contentAvailable;
    if (activeFilter === 'blocage') return d.blocages.length > 0;
    return true;
  }) || [];

  return (
    <hubLayout hubId={66}>
      <SeoHead
        title="KOS Compliance Engine™ v3.1 — 23+ Régulateurs | KHEPRA EXPERTS"
        description="Dashboard de conformité réglementaire v3.1 : 23+ régulateurs (BCBS, IOSCO, IAIS, IFRS, ISO, IFAC, FMI, IFC, AMF-UMOA, AMF-UEMOA, CIMA), 5 KPIs ISAE 3402, triple blocage. Banque + Assurance + Marchés + Comptabilité + Audit + Gouvernance."
        keywords="KOS Compliance Engine v3.1, conformité réglementaire, ISAE 3402, BCBS, IOSCO, IAIS, IFRS, ISO, IFAC, BCEAO, COBAC, KHEPRA EXPERTS"
        canonicalPath="/kos-compliance-engine-v31"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20sophisticated%20regulatory%20compliance%20control%20center%20aesthetic%20with%20deep%20emerald%20and%20warm%20bronze%20and%20steel%20blue%20tones%2C%20elegant%20geometric%20network%20patterns%20representing%20global%20financial%20regulatory%20interconnectedness%20across%20Basel%20IOSCO%20IAIS%20IFRS%20ISO%20standards%2C%20premium%20institutional%20atmosphere%20with%20layered%20translucent%20shield%20motifs%20and%20concentric%20data%20rings%20suggesting%20multi-jurisdictional%20governance%20frameworks%2C%20dark%20luxurious%20background%20with%20subtle%20world%20map%20grid%20and%20regulatory%20constellation%20patterns%2C%20Big%20Four%20consulting%20firm%20grade%20visual%20identity%20with%20ISAE%203402%20audit%20trail%20elements&width=1920&height=480&seq=kos-comp-v31-hero-2026&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-top opacity-10"
            width="1920"
            height="480"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/80 via-foreground-950/90 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <i className="ri-shield-check-line text-emerald-400 text-sm" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                  KOS Compliance Engine™ v3.1
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                  23+ Régulateurs — ISAE 3402
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/20 border border-sky-400/30 backdrop-blur-sm">
                <i className="ri-global-line text-sky-400 text-sm" />
                <span className="text-sm font-semibold text-sky-300 uppercase tracking-wider">
                  Banque + Assurance + Marchés + IFRS
                </span>
              </div>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              Compliance Engine v3.1.
              <span className="block text-emerald-400 mt-2">23+ régulateurs. Une seule plateforme. Grade ISAE 3402.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
              Crawler quotidien 02:00 GMT. Triple blocage qualité.{' '}
              Portée étendue : <strong className="text-white">Banque + Assurance + Marchés financiers + Comptabilité IFRS + Audit ISO + Gouvernance</strong>.
            </p>

            <button
              onClick={invokeCrawler}
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 text-white text-base font-bold hover:bg-emerald-600 transition-all cursor-pointer whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-lg" />
                  Crawl en cours...
                </>
              ) : (
                <>
                  <i className="ri-radar-line text-lg" />
                  Lancer le Crawl Complet (23+ Régulateurs)
                </>
              )}
            </button>

            {lastCrawlTime && (
              <p className="text-xs text-gray-400 mt-3">
                <i className="ri-check-double-line mr-1 text-emerald-400" />
                Dernier crawl : {lastCrawlTime} · Cron automatique : 02:00 GMT
              </p>
            )}

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm max-w-lg mx-auto">
                <i className="ri-error-warning-line mr-1" />{error}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* KPIs Dashboard */}
      {crawlData && (
        <>
          {/* ISAE 3402 KPIs */}
          <section className="py-10 sm:py-14 bg-background-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">
                  KPIs ISAE 3402 Type II — {crawlData.qualityAssessment}
                </h2>
                <p className="text-foreground-600 text-sm">
                  Métriques de conformité globale sur les {crawlData.kpis.totalSources} sources réglementaires
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                {[
                  { label: 'Score ISAE 3402', value: `${crawlData.kpis.isae3402Conformite}%`, icon: 'ri-verified-badge-line', color: crawlData.kpis.isae3402Conformite >= 90 ? '#059669' : crawlData.kpis.isae3402Conformite >= 75 ? '#CA8A04' : '#DC2626' },
                  { label: 'Fraîcheur Textes', value: `${crawlData.kpis.fraicheurTextes}%`, icon: 'ri-refresh-line', color: crawlData.kpis.fraicheurTextes >= 90 ? '#059669' : '#CA8A04' },
                  { label: 'Couverture Sources', value: `${crawlData.kpis.couvertureSources}%`, icon: 'ri-global-line', color: crawlData.kpis.couvertureSources >= 85 ? '#059669' : '#CA8A04' },
                  { label: 'Temps Réponse', value: `${crawlData.kpis.tempsReponseMoyen}ms`, icon: 'ri-timer-line', color: crawlData.kpis.tempsReponseMoyen < 5000 ? '#059669' : '#CA8A04' },
                  { label: 'Score Global', value: `${crawlData.kpis.scoreQualiteGlobal}/100`, icon: 'ri-bar-chart-line', color: crawlData.kpis.scoreQualiteGlobal >= 85 ? '#059669' : '#CA8A04' },
                ].map((kpi, i) => (
                  <div key={i} className="rounded-2xl bg-background-50 border border-background-200/70 p-5 text-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15` }}>
                      <i className={`${kpi.icon} text-xl`} style={{ color: kpi.color }} />
                    </div>
                    <span className="block text-3xl font-bold font-heading text-foreground-950">{kpi.value}</span>
                    <span className="text-xs text-foreground-400 mt-1">{kpi.label}</span>
                  </div>
                ))}
              </div>

              {/* Blocages */}
              <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <i className="ri-shield-flash-line text-red-400 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold">Triple Blocage Qualité — Rapport</h3>
                    <p className="text-xs text-gray-400">URL invalide · Source non listée · Texte abrogé</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'URLs Invalides', value: crawlData.kpis.blocageUrlsInvalides, icon: 'ri-link-unlink', desc: 'Sources injoignables ou 404' },
                    { label: 'Sources Non Listées', value: crawlData.kpis.blocageSourcesNonListees, icon: 'ri-forbid-line', desc: 'Hors liste 23 régulateurs' },
                    { label: 'Textes Abrogés', value: crawlData.kpis.blocageTextesAbroges, icon: 'ri-file-close-line', desc: 'Textes plus en vigueur' },
                  ].map((b, i) => (
                    <div key={i} className="p-5 rounded-xl bg-white/8 border border-white/10 text-center">
                      <div className="w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center bg-red-500/20">
                        <i className={`${b.icon} text-red-400 text-lg`} />
                      </div>
                      <span className="block text-3xl font-bold text-red-400">{b.value}</span>
                      <span className="block text-sm font-bold text-white mt-1">{b.label}</span>
                      <span className="text-[10px] text-gray-400">{b.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Global Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Régulateurs', value: crawlData.kpis.totalSources, icon: 'ri-building-line', color: '#D97757' },
                  { label: 'Accessibles', value: crawlData.kpis.sourcesAccessibles, icon: 'ri-check-double-line', color: '#059669' },
                  { label: 'Bloqués', value: crawlData.kpis.sourcesBloquees, icon: 'ri-close-circle-line', color: '#DC2626' },
                  { label: 'Textes Détectés', value: crawlData.totalTextsDetected, icon: 'ri-file-text-line', color: '#2563EB' },
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
            </div>
          </section>

          {/* Categories Overview */}
          <section className="py-10 sm:py-14 bg-background-100/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-6 text-center">
                Couverture par Domaine — 7 Catégories
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {crawlData.categories.map(cat => {
                  const catInfo = CATEGORY_LABELS[cat.category] || { label: cat.category, icon: 'ri-folder-line', color: '#64748B' };
                  const pct = cat.total > 0 ? Math.round((cat.ok / cat.total) * 100) : 0;
                  return (
                    <div key={cat.category} className="rounded-2xl bg-background-50 border border-background-200/70 p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${catInfo.color}15` }}>
                          <i className={`${catInfo.icon} text-lg`} style={{ color: catInfo.color }} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-foreground-950">{catInfo.label}</h3>
                          <span className="text-[10px] text-foreground-400">{cat.total} sources</span>
                        </div>
                      </div>
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-2xl font-bold font-heading" style={{ color: catInfo.color }}>{pct}%</span>
                        <span className="text-xs text-foreground-400 mb-1">{cat.ok}/{cat.total} OK</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-background-100 overflow-hidden mb-2">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: catInfo.color }} />
                      </div>
                      <span className="text-[10px] text-foreground-400">{cat.texts} textes détectés</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Regulator Grid */}
          <section className="py-10 sm:py-14 bg-background-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground-950">
                    Statut des {crawlData.kpis.totalSources} Régulateurs — Détail
                  </h2>
                  <p className="text-sm text-foreground-500">
                    +{crawlData.totalNewTexts} nouveaux · ~{crawlData.totalModifiedTexts} modifiés · -{crawlData.totalAbrogatedTexts} abrogés
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {[
                    { key: 'all', label: 'Tous' },
                    { key: 'ok', label: 'OK' },
                    { key: 'ko', label: 'HS' },
                    { key: 'blocage', label: 'Blocages' },
                  ].map(f => (
                    <button
                      key={f.key}
                      onClick={() => setActiveFilter(f.key as typeof activeFilter)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-colors ${
                        activeFilter === f.key ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grouped by category */}
              {CATEGORY_ORDER.map(catKey => {
                const catResults = filteredDetails.filter(d => d.category === catKey);
                if (catResults.length === 0) return null;
                const catInfo = CATEGORY_LABELS[catKey] || { label: catKey, icon: 'ri-folder-line', color: '#64748B' };
                const isExpanded = expandedCategory === catKey;

                return (
                  <div key={catKey} className="mb-4">
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : catKey)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-background-100 border border-background-200/70 hover:border-foreground-200 transition-colors cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${catInfo.color}15` }}>
                        <i className={`${catInfo.icon} text-base`} style={{ color: catInfo.color }} />
                      </div>
                      <span className="text-sm font-bold text-foreground-950 flex-1 text-left">
                        {catInfo.label} <span className="text-foreground-400 font-normal">({catResults.length} sources)</span>
                      </span>
                      <span className="text-xs text-foreground-400">
                        {catResults.filter(d => d.contentAvailable).length}/{catResults.length} OK
                      </span>
                      <i className={`ri-${isExpanded ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-400`} />
                    </button>

                    {isExpanded && (
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {catResults.map(detail => (
                          <div
                            key={detail.regulator}
                            className={`rounded-xl border p-4 transition-all ${
                              detail.contentAvailable && detail.blocages.length === 0
                                ? 'border-emerald-200/70 bg-emerald-50/40'
                                : detail.contentAvailable
                                ? 'border-amber-200/70 bg-amber-50/40'
                                : 'border-red-200/70 bg-red-50/40'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                                detail.contentAvailable && detail.blocages.length === 0 ? 'bg-emerald-500' :
                                detail.contentAvailable ? 'bg-amber-500' : 'bg-red-500'
                              }`} />
                              <h4 className="text-sm font-bold text-foreground-950 truncate">{detail.regulator}</h4>
                            </div>
                            <a
                              href={detail.rootUrl}
                              target="_blank"
                              rel="nofollow noopener noreferrer"
                              className="text-[10px] text-foreground-400 truncate block mb-2 hover:text-accent-500"
                            >
                              <i className="ri-external-link-line mr-1" />{detail.rootUrl}
                            </a>
                            <div className="flex items-center gap-2 text-xs mb-2">
                              <span className="font-bold text-foreground-800">{detail.totalTextsFound} textes</span>
                              <span className="text-foreground-400">HTTP {detail.httpStatus}</span>
                            </div>
                            {detail.diffSummary && detail.diffSummary !== 'Aucun changement' && (
                              <p className="text-[10px] text-accent-600 font-bold mb-1">{detail.diffSummary}</p>
                            )}
                            {detail.blocages.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {detail.blocages.map((b, j) => (
                                  <span key={j} className="block text-[10px] text-red-600 font-bold">
                                    <i className="ri-error-warning-line mr-1" />{b}
                                  </span>
                                ))}
                              </div>
                            )}
                            {detail.errors.length > 0 && !detail.contentAvailable && (
                              <p className="text-[10px] text-red-500 mt-1 truncate">{detail.errors[0]}</p>
                            )}
                            {detail.newTexts.length > 0 && (
                              <p className="text-[10px] text-emerald-600 font-bold mt-1">
                                +{detail.newTexts.length} nouveaux textes
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Recommendations */}
          {crawlData.recommendations.length > 0 && (
            <section className="py-10 sm:py-14 bg-background-100/70 border-t border-background-200/70">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-6 text-center">
                  Recommandations — Plan d'Action
                </h2>
                <div className="max-w-3xl mx-auto space-y-3">
                  {crawlData.recommendations.map((rec, i) => (
                    <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-200/70 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                        <i className="ri-lightbulb-line text-amber-600 text-sm" />
                      </div>
                      <p className="text-sm text-foreground-800">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Footer Info */}
          <section className="py-10 bg-foreground-950 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <i className="ri-shield-check-line text-emerald-400 text-2xl" />
                <span className="font-heading text-xl font-bold">KOS Compliance Engine™ v3.1</span>
              </div>
              <p className="text-sm text-gray-400 max-w-2xl mx-auto mb-4">
                Exécution conforme au Protocole Zéro Défaut Réglementaire™. Triple blocage actif.{' '}
                Crawler automatique 02:00 GMT avec diff J-1 et health check complet.{' '}
                ISAE 3402 Type II ready.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
                <span><i className="ri-calendar-line mr-1" />Crawl ID : {crawlData.crawlId}</span>
                <span><i className="ri-git-branch-line mr-1" />Version : {crawlData.version}</span>
                <span><i className="ri-time-line mr-1" />Prochain crawl : 02:00 GMT</span>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Loading State */}
      {!crawlData && loading && (
        <section className="py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 flex items-center justify-center">
              <i className="ri-loader-4-line animate-spin text-emerald-600 text-3xl" />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground-950 mb-2">Crawl en cours...</h2>
            <p className="text-sm text-foreground-400">
              Scan des 23+ régulateurs officiels. Triple validation qualité en cours.
            </p>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!crawlData && !loading && !error && (
        <section className="py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-background-100 flex items-center justify-center">
              <i className="ri-radar-line text-foreground-400 text-3xl" />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground-950 mb-2">Prêt pour le scan</h2>
            <p className="text-sm text-foreground-400 mb-4">
              Cliquez sur le bouton ci-dessus pour lancer le crawl complet des 23+ régulateurs.
            </p>
          </div>
        </section>
      )}
    </hubLayout>
  );
}



