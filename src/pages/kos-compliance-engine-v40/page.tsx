import { useState, useEffect, useCallback } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';

// ─── Types v4.0 ───
interface QuadrupleAncrage {
  isComplete: boolean;
  L1: boolean;
  L2: boolean;
  L3: boolean;
  L4: boolean;
  missingLayers: string[];
}

interface ArchitectureV40 {
  totalSources: number;
  layers: {
    L1_REGULATEURS: number;
    L2_NORMALISATEURS: number;
    L3_ACADEMIQUE: number;
    L4_REVUES_PRO: number;
  };
  quadrupleAncrage: QuadrupleAncrage;
}

interface KpiMetricsV40 {
  totalSources: number;
  sourcesAccessibles: number;
  sourcesBloquees: number;
  sourcesObsoletes: number;
  sourcesPeerReviewed: number;
  sourcesPeerValidated: number;
  peerReviewRate: number;
  totalLineageChunks: number;
  isae3402Conformite: number;
  fraicheurTextes: number;
  couvertureSources: number;
  tempsReponseMoyen: number;
  scoreQualiteGlobal: number;
}

interface LayerSummary {
  layer: string;
  label: string;
  icon: string;
  total: number;
  ok: number;
  peerReviewed: number;
  peerValidated: number;
  obsolete: number;
  texts: number;
}

interface CrawlDetail {
  layer: string;
  sourceId: string;
  sourceName: string;
  category: string;
  httpStatus: number;
  contentAvailable: boolean;
  totalTextsFound: number;
  peerReviewed: boolean;
  peerReviewValidated: boolean;
  doisFoundCount: number;
  isObsolete: boolean;
  diffSummary: string;
  errors: string[];
}

interface CrawlSummaryV40 {
  crawlId: string;
  version: string;
  date: string;
  architecture: ArchitectureV40;
  kpis: KpiMetricsV40;
  totalTextsDetected: number;
  totalNewTexts: number;
  qualityAssessment: string;
  layerSummaries: LayerSummary[];
  details: CrawlDetail[];
  recommendations: string[];
}

const LAYER_CONFIG: Record<string, { label: string; icon: string; color: string; description: string }> = {
  L1_REGULATEUR: { label: 'Régulateurs', icon: 'ri-government-line', color: '#CA8A04', description: 'Source de vérité légale — BCEAO, COBAC, BCBS...' },
  L2_NORMALISATEUR: { label: 'Normalisateurs', icon: 'ri-file-settings-line', color: '#059669', description: 'Standards techniques — IFRS, ISO, IFAC...' },
  L3_ACADEMIQUE: { label: 'Académique QS200', icon: 'ri-graduation-cap-line', color: '#7C3AED', description: 'Doctrines, working papers — HBS, Stanford, LSE...' },
  L4_REVUE_PRO: { label: 'Revues Pro', icon: 'ri-book-open-line', color: '#DC2626', description: 'Peer-reviewed — JBF, RFS, TAR, JFE, MS...' },
};

export default function KOSComplianceEngineV40Page() {
  const [crawlData, setCrawlData] = useState<CrawlSummaryV40 | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastCrawlTime, setLastCrawlTime] = useState<string | null>(null);
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'ok' | 'ko' | 'obsolete' | 'peer'>('all');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'layers' | 'lineage' | 'recommendations'>('overview');

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

  useEffect(() => { invokeCrawler(); }, [invokeCrawler]);

  // ─── Filter details ───
  const filteredDetails = crawlData?.details.filter(d => {
    if (activeFilter === 'ok') return d.contentAvailable && !d.isObsolete;
    if (activeFilter === 'ko') return !d.contentAvailable;
    if (activeFilter === 'obsolete') return d.isObsolete;
    if (activeFilter === 'peer') return d.peerReviewed;
    return true;
  }) || [];

  return (
    <KOSHubLayout hubId={66}>
      <SeoHead
        title="KOS Compliance Engine™ v4.0 — RAG Universel 285 Sources | KHEPRA EXPERTS"
        description="Dashboard de conformité réglementaire v4.0 : RAG 285 sources (L1 Régulateurs + L2 Normalisateurs + L3 Académique QS200 + L4 Revues Pro), peer-review Crossref DOI, quadruple ancrage, data lineage, ISAE 3402."
        keywords="KOS Compliance Engine v4.0, RAG universel, 285 sources, quadruple ancrage, Crossref DOI, peer-review, ISAE 3402, data lineage, KHEPRA EXPERTS"
        canonicalPath="/kos-compliance-engine-v40"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero v4.0 */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20futuristic%20regulatory%20intelligence%20hub%20with%20four%20concentric%20layers%20representing%20global%20governance%20architecture%2C%20L1%20regulatory%20core%20with%20golden%20geometric%20shield%20patterns%20representing%20BCEAO%20BCBS%20IOSCO%20IAIS%2C%20L2%20technical%20standards%20ring%20with%20emerald%20intersecting%20lines%20for%20IFRS%20ISO%20IFAC%2C%20L3%20academic%20layer%20with%20purple%20neural%20network%20nodes%20for%20QS200%20universities%20Harvard%20Stanford%20LSE%2C%20L4%20professional%20journals%20outer%20ring%20with%20crimson%20data%20streams%20for%20peer-reviewed%20publications%2C%20all%20layers%20connected%20by%20luminous%20data%20lineage%20threads%20with%20DOI%20markers%20and%20SHA256%20hash%20chains%2C%20sophisticated%20dark%20institutional%20atmosphere%20with%20ISAE%203402%20audit%20trail%20visualization%20elements%20and%20quadruple%20anchoring%20constellation%20diagram%2C%20premium%20Big%20Four%20consulting%20grade%20visual%20identity%20in%20deep%20charcoal%20and%20warm%20gold%20tones&width=1920&height=520&seq=kos-comp-v40-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-top opacity-10"
            width="1920"
            height="520"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/85 via-foreground-950/90 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <i className="ri-shield-star-line text-amber-400 text-sm" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                  KOS Compliance Engine™ v4.0
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                  RAG Universel — 285 Sources
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 backdrop-blur-sm">
                <i className="ri-stack-line text-purple-400 text-sm" />
                <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">
                  4 Couches — Quadruple Ancrage
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                <i className="ri-double-quotes-l text-red-400 text-sm" />
                <span className="text-sm font-semibold text-red-300 uppercase tracking-wider">
                  Peer-Review Crossref DOI
                </span>
              </div>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              RAG Universel v4.0.
              <span className="block text-amber-400 mt-2">285 sources. 4 couches. Quadruple ancrage ISAE 3402.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
              Architecture RAG étendue :{' '}
              <strong className="text-white">L1 Régulateurs (23) + L2 Normalisateurs (12) + L3 Académique QS200 + L4 Revues Pro (50)</strong>.
              Peer-review obligatoire via Crossref DOI. Data lineage complet. Zéro obsolète.
            </p>

            <button
              onClick={invokeCrawler}
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-500 text-foreground-950 text-base font-bold hover:bg-amber-400 transition-all cursor-pointer whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-lg" />
                  Crawl 285 sources en cours...
                </>
              ) : (
                <>
                  <i className="ri-radar-line text-lg" />
                  Lancer le Crawl RAG Universel (285 Sources)
                </>
              )}
            </button>

            {lastCrawlTime && (
              <p className="text-xs text-gray-400 mt-3">
                <i className="ri-check-double-line mr-1 text-emerald-400" />
                Dernier crawl : {lastCrawlTime} · Cron automatique : 01:00 GMT
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

      {crawlData && (
        <>
          {/* Tab Navigation */}
          <section className="bg-background-50 border-b border-background-200/70 sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-1 overflow-x-auto py-2">
                {[
                  { key: 'overview', label: 'Vue d\'ensemble', icon: 'ri-dashboard-line' },
                  { key: 'layers', label: '4 Couches', icon: 'ri-stack-line' },
                  { key: 'lineage', label: 'Data Lineage', icon: 'ri-links-line' },
                  { key: 'recommendations', label: 'Recommandations', icon: 'ri-lightbulb-line' },
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTab(tab.key as typeof selectedTab)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-colors ${
                      selectedTab === tab.key
                        ? 'bg-foreground-950 text-white'
                        : 'bg-transparent text-foreground-500 hover:bg-background-100'
                    }`}
                  >
                    <i className={`${tab.icon} text-sm`} />{tab.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <>
              {/* Quadruple Anchoring Status */}
              <section className="py-8 sm:py-10 bg-background-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        crawlData.architecture.quadrupleAncrage.isComplete
                          ? 'bg-emerald-500/20'
                          : 'bg-red-500/20'
                      }`}>
                        <i className={`${
                          crawlData.architecture.quadrupleAncrage.isComplete
                            ? 'ri-check-double-line text-emerald-400'
                            : 'ri-close-circle-line text-red-400'
                        } text-2xl`} />
                      </div>
                      <div>
                        <h2 className="font-heading text-xl font-bold">
                          Quadruple Ancrage —{' '}
                          <span className={crawlData.architecture.quadrupleAncrage.isComplete ? 'text-emerald-400' : 'text-red-400'}>
                            {crawlData.architecture.quadrupleAncrage.isComplete ? 'COMPLET' : 'INCOMPLET'}
                          </span>
                        </h2>
                        <p className="text-sm text-gray-400">
                          {crawlData.architecture.quadrupleAncrage.isComplete
                            ? 'Les 4 couches sont accessibles. LLM débloqué.'
                            : `LLM BLOQUÉ — Couches manquantes : ${crawlData.architecture.quadrupleAncrage.missingLayers.join(', ')}`}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { label: 'L1 Régulateurs', icon: 'ri-government-line', count: crawlData.architecture.layers.L1_REGULATEURS, status: crawlData.architecture.quadrupleAncrage.L1, color: '#CA8A04' },
                        { label: 'L2 Normalisateurs', icon: 'ri-file-settings-line', count: crawlData.architecture.layers.L2_NORMALISATEURS, status: crawlData.architecture.quadrupleAncrage.L2, color: '#059669' },
                        { label: 'L3 Académique', icon: 'ri-graduation-cap-line', count: crawlData.architecture.layers.L3_ACADEMIQUE, status: crawlData.architecture.quadrupleAncrage.L3, color: '#7C3AED' },
                        { label: 'L4 Revues Pro', icon: 'ri-book-open-line', count: crawlData.architecture.layers.L4_REVUES_PRO, status: crawlData.architecture.quadrupleAncrage.L4, color: '#DC2626' },
                      ].map((l, i) => (
                        <div key={i} className={`p-5 rounded-xl border text-center transition-all ${
                          l.status ? 'bg-emerald-500/5 border-emerald-400/30' : 'bg-red-500/5 border-red-400/30'
                        }`}>
                          <div className="w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: `${l.color}25` }}>
                            <i className={`${l.icon} text-lg`} style={{ color: l.color }} />
                          </div>
                          <span className="block text-2xl font-bold font-heading text-white">{l.count}</span>
                          <span className="block text-xs font-bold text-gray-300 mt-1">{l.label}</span>
                          <span className={`inline-flex items-center gap-1 mt-2 text-[10px] ${l.status ? 'text-emerald-400' : 'text-red-400'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${l.status ? 'bg-emerald-400' : 'bg-red-400'}`} />
                            {l.status ? 'Accessible' : 'Inaccessible'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ISAE 3402 KPIs */}
                  <div className="text-center mb-8">
                    <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">
                      KPIs ISAE 3402 Type II — {crawlData.qualityAssessment}
                    </h2>
                    <p className="text-foreground-600 text-sm">
                      Métriques de conformité globale sur {crawlData.architecture.totalSources} sources
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                    {[
                      { label: 'Score ISAE 3402', value: `${crawlData.kpis.isae3402Conformite}%`, icon: 'ri-verified-badge-line', color: crawlData.kpis.isae3402Conformite >= 90 ? '#059669' : crawlData.kpis.isae3402Conformite >= 75 ? '#CA8A04' : '#DC2626' },
                      { label: 'Peer-Review Rate', value: `${crawlData.kpis.peerReviewRate}%`, icon: 'ri-double-quotes-l', color: crawlData.kpis.peerReviewRate >= 80 ? '#059669' : '#CA8A04' },
                      { label: 'Fraîcheur Textes', value: `${crawlData.kpis.fraicheurTextes}%`, icon: 'ri-refresh-line', color: crawlData.kpis.fraicheurTextes >= 90 ? '#059669' : '#CA8A04' },
                      { label: 'Couverture Sources', value: `${crawlData.kpis.couvertureSources}%`, icon: 'ri-global-line', color: crawlData.kpis.couvertureSources >= 85 ? '#059669' : '#CA8A04' },
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

                  {/* Global Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Sources Totales', value: crawlData.architecture.totalSources, icon: 'ri-database-2-line', color: '#D97757' },
                      { label: 'Accessibles', value: crawlData.kpis.sourcesAccessibles, icon: 'ri-check-double-line', color: '#059669' },
                      { label: 'Bloquées', value: crawlData.kpis.sourcesBloquees, icon: 'ri-close-circle-line', color: '#DC2626' },
                      { label: 'Obsoletes', value: crawlData.kpis.sourcesObsoletes, icon: 'ri-history-line', color: '#CA8A04' },
                      { label: 'Peer-Reviewed', value: crawlData.kpis.sourcesPeerReviewed, icon: 'ri-double-quotes-l', color: '#7C3AED' },
                      { label: 'Peer-Validés', value: crawlData.kpis.sourcesPeerValidated, icon: 'ri-shield-check-line', color: '#059669' },
                      { label: 'Chunks Lineage', value: crawlData.kpis.totalLineageChunks, icon: 'ri-links-line', color: '#0891B2' },
                      { label: 'Textes Détectés', value: crawlData.totalTextsDetected, icon: 'ri-file-text-line', color: '#EA580C' },
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
            </>
          )}

          {/* Layers Tab */}
          {selectedTab === 'layers' && (
            <section className="py-8 sm:py-10 bg-background-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">
                    Architecture RAG — 4 Couches ({crawlData.architecture.totalSources} sources)
                  </h2>
                  <p className="text-foreground-600 text-sm">
                    L1 Régulateurs · L2 Normalisateurs · L3 Académique QS200 · L4 Revues Professionnelles
                  </p>
                </div>

                {/* Layer cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {crawlData.layerSummaries.map(ls => {
                    const cfg = LAYER_CONFIG[ls.layer] || { label: ls.label, icon: 'ri-folder-line', color: '#64748B', description: '' };
                    const pctOk = ls.total > 0 ? Math.round((ls.ok / ls.total) * 100) : 0;
                    const peerPct = ls.peerReviewed > 0 ? Math.round((ls.peerValidated / ls.peerReviewed) * 100) : 0;

                    return (
                      <div key={ls.layer} className="rounded-2xl bg-background-50 border border-background-200/70 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${cfg.color}15` }}>
                            <i className={`${cfg.icon} text-xl`} style={{ color: cfg.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-heading text-lg font-bold text-foreground-950">{cfg.label}</h3>
                            <p className="text-xs text-foreground-400 mt-0.5">{cfg.description}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-foreground-600">{ls.total} sources</span>
                            <span className="font-bold" style={{ color: cfg.color }}>{pctOk}% accès</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-background-200 overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${pctOk}%`, backgroundColor: cfg.color }} />
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                            <div className="p-2 rounded-lg bg-emerald-50">
                              <span className="block text-emerald-700 font-bold">{ls.ok}</span>
                              <span className="text-emerald-600">Accessibles</span>
                            </div>
                            <div className="p-2 rounded-lg bg-amber-50">
                              <span className="block text-amber-700 font-bold">{ls.obsolete}</span>
                              <span className="text-amber-600">Obsoletes</span>
                            </div>
                            {ls.peerReviewed > 0 && (
                              <>
                                <div className="p-2 rounded-lg bg-purple-50">
                                  <span className="block text-purple-700 font-bold">{ls.peerReviewed}</span>
                                  <span className="text-purple-600">Peer-Review</span>
                                </div>
                                <div className="p-2 rounded-lg bg-emerald-50">
                                  <span className="block text-emerald-700 font-bold">{peerPct}%</span>
                                  <span className="text-emerald-600">Validés Crossref</span>
                                </div>
                              </>
                            )}
                          </div>

                          <div className="text-xs text-foreground-400 pt-1">
                            <i className="ri-file-text-line mr-1" />{ls.texts} textes détectés
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Source detail grid */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <h3 className="font-heading text-xl font-bold text-foreground-950">Détail par Source</h3>
                  <div className="flex items-center gap-1.5">
                    {[
                      { key: 'all', label: 'Tous' },
                      { key: 'ok', label: 'OK' },
                      { key: 'ko', label: 'HS' },
                      { key: 'obsolete', label: 'Obsolètes' },
                      { key: 'peer', label: 'Peer-Review' },
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

                {/* Source grid grouped by layer */}
                {['L1_REGULATEUR', 'L2_NORMALISATEUR', 'L3_ACADEMIQUE', 'L4_REVUE_PRO'].map(layerKey => {
                  const layerResults = filteredDetails.filter(d => d.layer === layerKey);
                  if (layerResults.length === 0) return null;
                  const cfg = LAYER_CONFIG[layerKey] || { label: layerKey, icon: 'ri-folder-line', color: '#64748B' };
                  const isExpanded = expandedLayer === layerKey;

                  return (
                    <div key={layerKey} className="mb-4">
                      <button
                        onClick={() => setExpandedLayer(isExpanded ? null : layerKey)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-background-100 border border-background-200/70 hover:border-foreground-200 transition-colors cursor-pointer"
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cfg.color}15` }}>
                          <i className={`${cfg.icon} text-base`} style={{ color: cfg.color }} />
                        </div>
                        <span className="text-sm font-bold text-foreground-950 flex-1 text-left">
                          {cfg.label} <span className="text-foreground-400 font-normal">({layerResults.length} sources)</span>
                        </span>
                        <span className="text-xs text-foreground-400">
                          {layerResults.filter(d => d.contentAvailable).length}/{layerResults.length} OK
                        </span>
                        <i className={`ri-${isExpanded ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-400`} />
                      </button>

                      {isExpanded && (
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {layerResults.map(detail => (
                            <div
                              key={detail.sourceId}
                              className={`rounded-xl border p-4 transition-all ${
                                detail.contentAvailable && !detail.isObsolete
                                  ? detail.peerReviewValidated ? 'border-emerald-200/70 bg-emerald-50/40' : 'border-background-200/70 bg-background-50'
                                  : detail.isObsolete
                                  ? 'border-amber-200/70 bg-amber-50/40'
                                  : 'border-red-200/70 bg-red-50/40'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                                  detail.contentAvailable && !detail.isObsolete
                                    ? detail.peerReviewValidated ? 'bg-emerald-500' : 'bg-sky-500'
                                    : detail.isObsolete ? 'bg-amber-500' : 'bg-red-500'
                                }`} />
                                <h4 className="text-sm font-bold text-foreground-950 truncate">{detail.sourceName}</h4>
                              </div>
                              <div className="flex items-center gap-2 text-xs mb-2">
                                <span className="font-bold text-foreground-800">{detail.totalTextsFound} textes</span>
                                <span className="text-foreground-400">HTTP {detail.httpStatus}</span>
                                {detail.peerReviewed && (
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                    detail.peerReviewValidated ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                  }`}>
                                    {detail.peerReviewValidated ? 'Peer ✓' : 'Peer ?'}
                                  </span>
                                )}
                              </div>
                              {detail.doisFoundCount > 0 && (
                                <p className="text-[10px] text-purple-600 mb-1">
                                  <i className="ri-link mr-1" />{detail.doisFoundCount} DOI(s) Crossref
                                </p>
                              )}
                              {detail.isObsolete && (
                                <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">
                                  ⏳ Obsolète (&lt; 2020)
                                </span>
                              )}
                              {detail.diffSummary && detail.diffSummary !== 'Aucun changement' && (
                                <p className="text-[10px] text-accent-600 font-bold mt-1">{detail.diffSummary}</p>
                              )}
                              {detail.errors.length > 0 && !detail.contentAvailable && (
                                <p className="text-[10px] text-red-500 mt-1 truncate">{detail.errors[0]}</p>
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
          )}

          {/* Lineage Tab */}
          {selectedTab === 'lineage' && (
            <section className="py-8 sm:py-10 bg-background-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">
                    Data Lineage — Traçabilité Complète
                  </h2>
                  <p className="text-foreground-600 text-sm">
                    Chaque chunk = source + url + doi + page + date · {crawlData.kpis.totalLineageChunks} chunks tracés
                  </p>
                </div>

                <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                      <i className="ri-links-line text-cyan-400 text-lg" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold">Data Lineage Protocol — ISAE 3402</h3>
                      <p className="text-xs text-gray-400">sourceId + sourceUrl + doi + page + publicationDate + retrievalDate + peerReviewed + crossrefVerified + hashSha256</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Chunks Tracés', value: crawlData.kpis.totalLineageChunks, icon: 'ri-links-line', color: '#0891B2' },
                      { label: 'DOIs Crossref', value: crawlData.kpis.sourcesPeerValidated, icon: 'ri-double-quotes-l', color: '#7C3AED' },
                      { label: 'Peer-Review Rate', value: `${crawlData.kpis.peerReviewRate}%`, icon: 'ri-shield-check-line', color: '#059669' },
                      { label: 'Hash SHA256', value: 'Actif', icon: 'ri-fingerprint-line', color: '#EA580C' },
                    ].map((item, i) => (
                      <div key={i} className="p-5 rounded-xl bg-white/8 border border-white/10 text-center">
                        <div className="w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: `${item.color}25` }}>
                          <i className={`${item.icon} text-lg`} style={{ color: item.color }} />
                        </div>
                        <span className="block text-2xl font-bold text-white">{item.value}</span>
                        <span className="text-xs text-gray-400 mt-1">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Data lineage model */}
                  <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-sm font-bold text-gray-300 mb-3">Modèle Data Lineage — Structure par Chunk</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-gray-400">
                        <thead>
                          <tr className="border-b border-white/10">
                            {['Champ', 'Description', 'Exemple'].map(h => (
                              <th key={h} className="text-left py-2 px-2 font-bold text-gray-300">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ['sourceId', 'Identifiant unique de la source', 'L4-JBF'],
                            ['sourceName', 'Nom complet de la source', 'Journal of Banking & Finance'],
                            ['sourceLayer', 'Couche RAG (L1-L4)', 'L4_REVUE_PRO'],
                            ['sourceUrl', 'URL de récupération', 'https://api.crossref.org/journals/0378-4266/works'],
                            ['doi', 'DOI Crossref (si applicable)', '10.1016/j.jbankfin.2025.01.003'],
                            ['page', 'Page ou section', 'pp. 245-267'],
                            ['publicationDate', 'Date de publication', '2025-03-15'],
                            ['retrievalDate', 'Date de récupération', crawlData.date],
                            ['peerReviewed', 'Statut peer-review', 'true'],
                            ['crossrefVerified', 'Validé via Crossref API', 'true'],
                            ['hashSha256', 'Hash SHA-256 du chunk', 'sha256:a3f2b8c1...'],
                          ].map((row, i) => (
                            <tr key={i} className="border-b border-white/5">
                              <td className="py-1.5 px-2 font-mono text-cyan-400">{row[0]}</td>
                              <td className="py-1.5 px-2">{row[1]}</td>
                              <td className="py-1.5 px-2 text-foreground-950">{row[2]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Recommendations Tab */}
          {selectedTab === 'recommendations' && crawlData.recommendations.length > 0 && (
            <section className="py-8 sm:py-10 bg-background-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-6 text-center">
                  Plan d'Action — Recommandations Big Four v4.0
                </h2>
                <div className="max-w-3xl mx-auto space-y-3">
                  {crawlData.recommendations.map((rec, i) => (
                    <div key={i} className={`p-4 rounded-xl border flex items-start gap-3 ${
                      rec.includes('BLOQUÉ') ? 'bg-red-50 border-red-200' :
                      rec.includes('VIOLÉ') ? 'bg-amber-50 border-amber-200' :
                      'bg-background-50 border-background-200/70'
                    }`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        rec.includes('BLOQUÉ') ? 'bg-red-100' :
                        rec.includes('VIOLÉ') ? 'bg-amber-100' :
                        'bg-emerald-100'
                      }`}>
                        <i className={`${
                          rec.includes('BLOQUÉ') ? 'ri-close-circle-line text-red-600' :
                          rec.includes('VIOLÉ') ? 'ri-error-warning-line text-amber-600' :
                          'ri-lightbulb-line text-emerald-600'
                        } text-sm`} />
                      </div>
                      <p className="text-sm text-foreground-800">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Footer */}
          <section className="py-10 bg-foreground-950 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <i className="ri-shield-star-line text-amber-400 text-2xl" />
                <span className="font-heading text-xl font-bold">KOS Compliance Engine™ v4.0 — RAG Universel</span>
              </div>
              <p className="text-sm text-gray-400 max-w-2xl mx-auto mb-4">
                285 sources sur 4 couches. Peer-review obligatoire Crossref DOI. Quadruple ancrage. Zéro obsolète.{' '}
                Data lineage complet. ISAE 3402 Type II ready. Cron automatique 01:00 GMT.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
                <span><i className="ri-calendar-line mr-1" />Crawl ID : {crawlData.crawlId}</span>
                <span><i className="ri-git-branch-line mr-1" />Version : {crawlData.version}</span>
                <span><i className="ri-stack-line mr-1" />{crawlData.architecture.totalSources} sources</span>
                <span><i className="ri-time-line mr-1" />Prochain crawl : 01:00 GMT</span>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Loading State */}
      {!crawlData && loading && (
        <section className="py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 flex items-center justify-center">
              <i className="ri-loader-4-line animate-spin text-amber-600 text-3xl" />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground-950 mb-2">Crawl RAG Universel en cours...</h2>
            <p className="text-sm text-foreground-400">
              Scan des 285 sources sur 4 couches. Peer-review Crossref, data lineage, ISAE 3402.
            </p>
          </div>
        </section>
      )}

      {!crawlData && !loading && !error && (
        <section className="py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-background-100 flex items-center justify-center">
              <i className="ri-stack-line text-foreground-400 text-3xl" />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground-950 mb-2">RAG Universel Prêt</h2>
            <p className="text-sm text-foreground-400 mb-4">
              Lancez le crawl complet des 285 sources (L1+L2+L3+L4) avec quadruple ancrage et peer-review Crossref.
            </p>
          </div>
        </section>
      )}
    </KOSHubLayout>
  );
}