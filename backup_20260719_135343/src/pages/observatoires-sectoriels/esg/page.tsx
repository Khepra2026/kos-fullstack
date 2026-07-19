import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';
import { useSectorKpis } from '@/hooks/useSectorKpis';
import { useSectorQuarterlyKpis } from '@/hooks/useSectorQuarterlyKpis';
import { useSectorPdfExport } from '@/hooks/useSectorPdfExport';
import ObservatoireTranslationBar, { useObservatoireTranslation } from '@/components/feature/ObservatoireTranslationBar';
import {
  SectorKpiGrid,
  SectorScoreCard,
  SectorQuarterSelector,
  SectorInsightCard,
  SectorIndiceCard,
  QuarterlyKpisSection,
  type SectorKpiData,
} from '@/components/feature/SectorKpiInline';

const TRIMESTRIEL_ESG = [
  { label: 'T1 2026', status: 'completed' as const, desc: 'Rapport T1 — ESG Regulatory Update Q1 2026 publié' },
  { label: 'T2 2026', status: 'completed' as const, desc: 'Benchmark — Notation ESG 89 entités panafricaines' },
  { label: 'T3 2026', status: 'planned' as const, desc: 'Baromètre — Finance Durable + Obligations vertes Afrique' },
  { label: 'T4 2026', status: 'planned' as const, desc: 'Rapport annuel — Synthèse ESG + Taxonomy Verte Africaine' },
];

const RECENT_INSIGHTS = [
  { icon: 'ri-file-chart-line', title: 'Rapport T2 2026 — ESG Regulatory Update panafricain', date: '18 Juin 2026', tag: 'Rapport' },
  { icon: 'ri-bar-chart-box-line', title: 'Benchmark — Notation ESG : 89 entités notées, scores par secteur', date: 'En cours', tag: 'Benchmark' },
  { icon: 'ri-lightbulb-line', title: 'Baromètre — Obligations durables : 4,2Mds€ émis en 2026', date: 'En préparation', tag: 'Baromètre' },
  { icon: 'ri-article-line', title: 'Article — Taxonomie verte africaine : harmonisation en cours', date: '12 Juin 2026', tag: 'Article' },
];

const ESG_COLOR = '#d4a82a';

export default function ObservatoireESGPage() {
  const navigate = useNavigate();
  const { kpis, loading: kpiLoading, fromSupabase, refresh, lastRefresh } = useSectorKpis('esg');
  const { quarterlyKpis, loading: qLoading, fromSupabase: qFromSupabase } = useSectorQuarterlyKpis('esg');
  const { exportPdf } = useSectorPdfExport();
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Translation
  const { isEn, translateBatch } = useObservatoireTranslation();
  const [translatedItems, setTranslatedItems] = useState<Record<string, string>>({});
  const [translatingAll, setTranslatingAll] = useState(false);
  const translatableTotal = RECENT_INSIGHTS.length + 3;
  const translatedCount = Object.keys(translatedItems).length;
  const handleTranslateAll = useCallback(async () => {
    if (!isEn) return; setTranslatingAll(true);
    const batch: string[] = []; const keys: string[] = [];
    for (const i of RECENT_INSIGHTS) { if (!translatedItems[`insight-${i.title}`]) { batch.push(i.title); keys.push(`insight-${i.title}`); } }
    const idxDescs = ['KOS ESG Compliance Score™ — Notation de conformité ESG basée sur ISSB/IFRS S1-S2 : divulgation climatique (35%), gouvernance ESG (25%), métriques sociales (20%), biodiversité (20%). 89 entités notées sur 54 pays.','KOS Green Finance Tracker™ — Traçage des instruments de finance durable : obligations vertes, sociales et durables, prêts à impact, fonds ESG. Volume, distribution géographique, conformité ICMA Green Bond Principles.','KOS Supply Chain ESG™ — Évaluation ESG des chaînes d\'approvisionnement africaines : due diligence droits humains, Scope 3 carbone, traçabilité, conformité EU CSDDD et lois nationales.'];
    for (const d of idxDescs) { if (!translatedItems[`idx-${d.slice(0,30)}`]) { batch.push(d); keys.push(`idx-${d.slice(0,30)}`); } }
    if (batch.length === 0) { setTranslatingAll(false); return; }
    try { const t = await translateBatch(batch); const n = { ...translatedItems }; t.forEach((x,i) => { n[keys[i]] = x; }); setTranslatedItems(n); } catch {}
    setTranslatingAll(false);
  }, [isEn, translatedItems, translateBatch]);
  const tInsight = useCallback((title: string) => isEn && translatedItems[`insight-${title}`] ? translatedItems[`insight-${title}`] : title, [isEn, translatedItems]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      refresh();
    }, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, refresh]);

  const handleManualRefresh = useCallback(() => {
    refresh();
  }, [refresh]);

  const handleExportPdf = useCallback(() => {
    exportPdf({
      sectorName: 'ESG & Développement Durable',
      sectorIcon: 'ri-leaf-line',
      sectorColor: '#d4a82a',
      zone: 'Panafricain — 54 pays — 89 entités',
      score: 67,
      scoreLabel: 'KOS ESG Sector Score™',
      scoreBreakdown: [
        { label: 'Conformité ESG', val: 79 },
        { label: 'Finance Durable', val: 64 },
        { label: 'Supply Chain ESG', val: 58 },
        { label: 'Couverture Pays', val: 100 },
        { label: 'Publications', val: 100 },
      ],
      kpis,
      quarterlyKpis,
      indices: [
        { name: 'KOS ESG Compliance Score™', score: 79, desc: 'Conformité ISSB/IFRS S1-S2.' },
        { name: 'KOS Green Finance Tracker™', score: 64, desc: 'Traçage de la finance durable.' },
        { name: 'KOS Supply Chain ESG™', score: 58, desc: 'ESG chaîne d\'approvisionnement.' },
      ],
      insights: RECENT_INSIGHTS.map(i => ({ title: i.title, date: i.date, tag: i.tag })),
      quarters: TRIMESTRIEL_ESG.map(q => ({ label: q.label, status: q.status, desc: q.desc })),
    });
  }, [exportPdf, kpis, quarterlyKpis]);

  return (
    <>
      <SeoHead
        title="Observatoire ESG & Développement Durable — Notation, ISSB, Finance Verte — KOS"
        description="Observatoire sectoriel ESG : 89 entités notées, 54 pays africains, KPI conformité ISSB/IFRS et finance durable. Rapports trimestriels, benchmarks, indices KOS™. Accès institutionnel."
        keywords="ESG Afrique, notation ESG panafricaine, ISSB IFRS S1 S2, finance durable Afrique, taxonomie verte, obligations durables, KOS ESG Compliance"
        canonicalPath="/observatoires-sectoriels/esg/"
        ogType="website"
      />
      <div className="min-h-screen bg-background-50">
        <Navigation />

        <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdfaf2 0%, #f7f3e5 40%, #faf7ee 100%)' }}>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,168,42,0.12), transparent)' }} />
            <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,168,42,0.08), transparent)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-5">
              <BigFourSubtitleBar label="Observatoire Sectoriel KOS" variant="centered-pillars" icon="ri-leaf-line" accentColor="accent" />
            </div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl" style={{ background: 'rgba(212,168,42,0.1)', border: '1px solid rgba(212,168,42,0.2)' }}>
                <i className="ri-leaf-line text-2xl" style={{ color: '#d4a82a' }} />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground-950 leading-tight">
                ESG{' '}
                <span style={{ color: '#d4a82a' }}>&</span>{' '}
                Développement Durable
              </h1>
            </div>
            <p className="text-xl text-foreground-600 mb-3 max-w-3xl mx-auto text-center leading-relaxed">
              Notation ESG, conformité ISSB/IFRS S1-S2, taxonomie verte, obligations durables, due diligence chaîne d'approvisionnement et reporting extra-financier — couverture panafricaine.
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#d4a82a' }}>Panafricain</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ color: '#d4a82a', background: 'rgba(212,168,42,0.1)' }}>54 pays</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ color: '#d4a82a', background: 'rgba(212,168,42,0.1)' }}>89 entités</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ObservatoireTranslationBar translatedCount={translatedCount} translatableTotal={translatableTotal} onTranslateAll={handleTranslateAll} translatingAll={translatingAll} />
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer transition-all hover:scale-105 text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #b8941f, #d4a82a)' }}>
                <i className="ri-mail-send-line" /> Demander un accès
              </button>
              <button onClick={handleManualRefresh} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer border transition-all hover:-translate-y-0.5 whitespace-nowrap" style={{ color: '#d4a82a', borderColor: 'rgba(212,168,42,0.3)', background: 'rgba(212,168,42,0.04)' }}>
                <i className="ri-refresh-line" /> Rafraîchir KPI
              </button>
              <button onClick={handleExportPdf} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer border transition-all hover:-translate-y-0.5 whitespace-nowrap" style={{ color: '#d4a82a', borderColor: 'rgba(212,168,42,0.3)', background: 'rgba(212,168,42,0.04)' }}>
                <i className="ri-file-pdf-line" /> Exporter PDF
              </button>
              <label className="flex items-center gap-2 text-xs text-foreground-500 cursor-pointer">
                <span className={`w-8 h-4 rounded-full relative transition-colors ${autoRefresh ? 'bg-emerald-500' : 'bg-foreground-300'}`}>
                  <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${autoRefresh ? 'left-4' : 'left-0.5'}`} />
                </span>
                Auto-refresh 30s
              </label>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-6">
            <BigFourSubtitleBar label="Dashboard — KPI ESG & Développement Durable" variant="left-accent" icon="ri-dashboard-line" accentColor="accent" />
          </div>
          <div className="flex items-center justify-between mb-2">
            {fromSupabase && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 flex items-center gap-1"><i className="ri-database-2-line" /> Supabase</span>}
            {kpiLoading && <span className="text-[10px] text-foreground-400 flex items-center gap-1"><i className="ri-loader-4-line animate-spin" /> Chargement...</span>}
          </div>
          <SectorKpiGrid kpis={kpis} color={ESG_COLOR} hoverBorderClass="hover:border-amber-300" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <SectorScoreCard
              score={67}
              label="KOS ESG Sector Score™"
              color={ESG_COLOR}
              breakdown={[
                { label: 'Conformité ESG', val: 79 },
                { label: 'Finance Durable', val: 64 },
                { label: 'Supply Chain ESG', val: 58 },
                { label: 'Couverture Pays', val: 100 },
                { label: 'Publications', val: 100 },
              ]}
            />

            <div className="bg-white rounded-xl p-6 border border-background-200 lg:col-span-2">
              <SectorQuarterSelector quarters={TRIMESTRIEL_ESG} activeBgClass="border-amber-500 bg-amber-50" activeTextClass="text-amber-700" />
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-5">
              <BigFourSubtitleBar label="Publications & Insights" variant="left-accent" icon="ri-book-open-line" accentColor="accent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {RECENT_INSIGHTS.map((insight, i) => (
                <SectorInsightCard key={i} title={tInsight(insight.title)} date={insight.date} tag={insight.tag} icon={insight.icon} hoverTextClass="group-hover:text-amber-700" />
              ))}
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl border border-background-200 p-6">
            <div className="mb-5">
              <BigFourSubtitleBar label="Indices KOS™ ESG" variant="left-accent" icon="ri-bar-chart-line" accentColor="accent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: 'KOS ESG Compliance Score™', score: 79, desc: 'Notation de conformité ESG basée sur ISSB/IFRS S1-S2 : divulgation climatique (35%), gouvernance ESG (25%), métriques sociales (20%), biodiversité (20%). 89 entités notées sur 54 pays.' },
                { name: 'KOS Green Finance Tracker™', score: 64, desc: 'Traçage des instruments de finance durable : obligations vertes, sociales et durables, prêts à impact, fonds ESG. Volume, distribution géographique, conformité ICMA Green Bond Principles.' },
                { name: 'KOS Supply Chain ESG™', score: 58, desc: 'Évaluation ESG des chaînes d\'approvisionnement africaines : due diligence droits humains, Scope 3 carbone, traçabilité, conformité EU CSDDD et lois nationales.' },
              ].map(idx => {
                const td = isEn && translatedItems[`idx-${idx.desc.slice(0, 30)}`] ? translatedItems[`idx-${idx.desc.slice(0, 30)}`] : undefined;
                return (
                <SectorIndiceCard key={idx.name} name={idx.name} score={idx.score} desc={td || idx.desc} color={ESG_COLOR} />
              );})}
            </div>
          </div>

          <QuarterlyKpisSection
            quarterlyKpis={quarterlyKpis}
            color={ESG_COLOR}
            progressColor="#b8941f"
            loading={qLoading}
            fromSupabase={qFromSupabase}
          />
        </section>

        <section className="py-16 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="Méthodologie Big Four" variant="left-accent" icon="ri-scales-3-line" accentColor="accent" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground-950 mb-3">Standards ISSB/IFRS — ISO 27001</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {[
                { step: '01', title: 'Collecte ESG', desc: 'Données extra-financières, rapports ESG, notations agences (Sustainalytics, MSCI, ISS), données CDP, bases IFRS Foundation. Couverture 54 pays africains.' },
                { step: '02', title: 'Analyse & scoring', desc: 'Matrice de matérialité ISSB S1, scoring Scope 1-2-3, analyse taxonomie verte, benchmarks ISSB/CSRD, stress tests climatiques NGFS.' },
                { step: '03', title: 'Validation & diffusion', desc: 'Revue Big Four, vérification croisée ISSB, audit trail ISO 27001, publication multilingue FR/EN/PT avec SEO optimisé.' },
              ].map(m => (
                <div key={m.step} className="bg-white rounded-xl p-6 border border-background-200">
                  <div className="text-2xl font-display font-bold mb-2" style={{ color: '#d4a82a' }}>{m.step}</div>
                  <h3 className="text-base font-bold text-foreground-950 mb-2">{m.title}</h3>
                  <p className="text-sm text-foreground-600 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20" style={{ background: 'linear-gradient(160deg, #1a1508 0%, #0f0d05 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-6" style={{ background: 'rgba(212,168,42,0.15)', border: '1px solid rgba(212,168,42,0.25)' }}>
              <i className="ri-leaf-line text-2xl" style={{ color: '#d4a82a' }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Accédez à l'intelligence ESG panafricaine</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto">89 entités notées, 54 pays, 3 indices KOS™. Contrat institutionnel sur devis — nos experts vous accompagnent.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer transition-all hover:scale-105 text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #b8941f, #d4a82a)' }}>
                <i className="ri-mail-send-line" /> Demander un devis
              </button>
              <button onClick={() => navigate('/observatoires-sectoriels/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer border border-white/30 text-white hover:bg-white/10 transition-all whitespace-nowrap">
                <i className="ri-stack-line" /> Tous les observatoires
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}



