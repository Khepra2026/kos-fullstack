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

const TRIMESTRIEL_MFI = [
  { label: 'T1 2026', status: 'completed' as const, desc: 'Rapport T1 — Secteur SFD UEMOA : 186 entités analysées' },
  { label: 'T2 2026', status: 'completed' as const, desc: 'Benchmark — Performance SFD + Baromètre Inclusion Financière' },
  { label: 'T3 2026', status: 'planned' as const, desc: 'Rapport T3 — Secteur SFD + Digital MFI Readiness Update' },
  { label: 'T4 2026', status: 'planned' as const, desc: 'Rapport annuel — Synthèse Microfinance UEMOA + Perspectives 2027' },
];

const RECENT_INSIGHTS = [
  { icon: 'ri-file-chart-line', title: 'Rapport T2 2026 — Secteur SFD : 186 entités UEMOA', date: '22 Juin 2026', tag: 'Rapport' },
  { icon: 'ri-bar-chart-box-line', title: 'Benchmark — Performance SFD : ratios prudentiels 2026', date: 'En cours', tag: 'Benchmark' },
  { icon: 'ri-lightbulb-line', title: 'Baromètre — Inclusion Financière : 8 pays comparés', date: 'En préparation', tag: 'Baromètre' },
  { icon: 'ri-article-line', title: 'Article — Digitalisation SFD : nouveau modèle BCEAO', date: '8 Juin 2026', tag: 'Article' },
];

const MFI_COLOR = '#378e1d';

export default function ObservatoireMicrofinancePage() {
  const navigate = useNavigate();
  const { kpis, loading: kpiLoading, fromSupabase, refresh, lastRefresh } = useSectorKpis('microfinance');
  const { quarterlyKpis, loading: qLoading, fromSupabase: qFromSupabase } = useSectorQuarterlyKpis('microfinance');
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
    const idxDescs = ['KOS SFD Health Score™ — Évalue la santé financière des SFD UEMOA : ratios prudentiels BCEAO (solvabilité, liquidité, division des risques), qualité du portefeuille (PAR 30/90), rentabilité opérationnelle, couverture des charges.','KOS Financial Inclusion Index™ — Mesure l\'inclusion financière par pays UEMOA : taux de bancarisation, pénétration mobile money, accès au crédit, épargne formelle, écart genre, couverture géographique.','KOS Digital MFI Readiness™ — Évalue la maturité digitale des SFD : core banking system, canaux digitaux, interopérabilité, cybersécurité, capacité d\'innovation, conformité instruction BCEAO sur la digitalisation.'];
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
      sectorName: 'Microfinance & Inclusion Financière',
      sectorIcon: 'ri-hand-heart-line',
      sectorColor: '#378e1d',
      zone: 'UEMOA — 8 pays — 186 SFD',
      score: 62,
      scoreLabel: 'KOS Microfinance Sector Score™',
      scoreBreakdown: [
        { label: 'Santé Financière SFD', val: 74 },
        { label: 'Inclusion Financière', val: 61 },
        { label: 'Digitalisation', val: 52 },
        { label: 'Couverture Pays', val: 100 },
        { label: 'Publications', val: 100 },
      ],
      kpis,
      quarterlyKpis,
      indices: [
        { name: 'KOS SFD Health Score™', score: 74, desc: 'Santé financière des SFD UEMOA.' },
        { name: 'KOS Financial Inclusion Index™', score: 61, desc: 'Indice d\'inclusion financière.' },
        { name: 'KOS Digital MFI Readiness™', score: 52, desc: 'Préparation digitale des SFD.' },
      ],
      insights: RECENT_INSIGHTS.map(i => ({ title: i.title, date: i.date, tag: i.tag })),
      quarters: TRIMESTRIEL_MFI.map(q => ({ label: q.label, status: q.status, desc: q.desc })),
    });
  }, [exportPdf, kpis, quarterlyKpis]);

  return (
    <>
      <SeoHead
        title="Observatoire Microfinance & Inclusion Financière — SFD, Ratios, Digitalisation — KOS"
        description="Observatoire sectoriel Microfinance : 186 SFD suivis, 8 pays UEMOA, KPI santé financière et inclusion. Rapports trimestriels, benchmarks ratios prudentiels BCEAO, indices KOS™. Accès institutionnel."
        keywords="microfinance UEMOA, SFD BCEAO, inclusion financière Afrique, ratios prudentiels SFD, digitalisation microfinance, KOS SFD Health"
        canonicalPath="/observatoires-sectoriels/microfinance/"
        ogType="website"
      />
      <div className="min-h-screen bg-background-50">
        <Navigation />

        <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: 'linear-gradient(160deg, #f6faf2 0%, #edf5e5 40%, #f2f7ee 100%)' }}>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(55,142,29,0.12), transparent)' }} />
            <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(55,142,29,0.08), transparent)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-5">
              <BigFourSubtitleBar label="Observatoire Sectoriel KOS" variant="centered-pillars" icon="ri-hand-heart-line" accentColor="primary" />
            </div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl" style={{ background: 'rgba(55,142,29,0.1)', border: '1px solid rgba(55,142,29,0.2)' }}>
                <i className="ri-hand-heart-line text-2xl" style={{ color: '#378e1d' }} />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground-950 leading-tight">
                Microfinance{' '}
                <span style={{ color: '#378e1d' }}>&</span>{' '}
                Inclusion Financière
              </h1>
            </div>
            <p className="text-xl text-foreground-600 mb-3 max-w-3xl mx-auto text-center leading-relaxed">
              Agréments SFD, ratios prudentiels BCEAO, digitalisation, finance islamique, protection des clients et inclusion financière en zone UEMOA — 186 SFD suivis.
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#378e1d' }}>UEMOA — 8 pays</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ color: '#378e1d', background: 'rgba(55,142,29,0.1)' }}>186 SFD</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ color: '#378e1d', background: 'rgba(55,142,29,0.1)' }}>22 instructions BCEAO</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ObservatoireTranslationBar translatedCount={translatedCount} translatableTotal={translatableTotal} onTranslateAll={handleTranslateAll} translatingAll={translatingAll} />
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer transition-all hover:scale-105 text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #2d7518, #378e1d)' }}>
                <i className="ri-mail-send-line" /> Demander un accès
              </button>
              <button onClick={handleManualRefresh} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer border transition-all hover:-translate-y-0.5 whitespace-nowrap" style={{ color: '#378e1d', borderColor: 'rgba(55,142,29,0.3)', background: 'rgba(55,142,29,0.04)' }}>
                <i className="ri-refresh-line" /> Rafraîchir KPI
              </button>
              <button onClick={handleExportPdf} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer border transition-all hover:-translate-y-0.5 whitespace-nowrap" style={{ color: '#378e1d', borderColor: 'rgba(55,142,29,0.3)', background: 'rgba(55,142,29,0.04)' }}>
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
            <BigFourSubtitleBar label="Dashboard — KPI Microfinance & Inclusion Financière" variant="left-accent" icon="ri-dashboard-line" accentColor="primary" />
          </div>
          <div className="flex items-center justify-between mb-2">
            {fromSupabase && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 flex items-center gap-1"><i className="ri-database-2-line" /> Supabase</span>}
            {kpiLoading && <span className="text-[10px] text-foreground-400 flex items-center gap-1"><i className="ri-loader-4-line animate-spin" /> Chargement...</span>}
          </div>
          <SectorKpiGrid kpis={kpis} color={MFI_COLOR} hoverBorderClass="hover:border-emerald-300" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <SectorScoreCard
              score={62}
              label="KOS Microfinance Sector Score™"
              color={MFI_COLOR}
              breakdown={[
                { label: 'Santé Financière SFD', val: 74 },
                { label: 'Inclusion Financière', val: 61 },
                { label: 'Digitalisation', val: 52 },
                { label: 'Couverture Pays', val: 100 },
                { label: 'Publications', val: 100 },
              ]}
            />

            <div className="bg-white rounded-xl p-6 border border-background-200 lg:col-span-2">
              <SectorQuarterSelector quarters={TRIMESTRIEL_MFI} />
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-5">
              <BigFourSubtitleBar label="Publications & Insights" variant="left-accent" icon="ri-book-open-line" accentColor="accent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {RECENT_INSIGHTS.map((insight, i) => (
                <SectorInsightCard key={i} title={tInsight(insight.title)} date={insight.date} tag={insight.tag} icon={insight.icon} />
              ))}
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl border border-background-200 p-6">
            <div className="mb-5">
              <BigFourSubtitleBar label="Indices KOS™ Microfinance" variant="left-accent" icon="ri-bar-chart-line" accentColor="primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: 'KOS SFD Health Score™', score: 74, desc: 'Évalue la santé financière des SFD UEMOA : ratios prudentiels BCEAO (solvabilité, liquidité, division des risques), qualité du portefeuille (PAR 30/90), rentabilité opérationnelle, couverture des charges.' },
                { name: 'KOS Financial Inclusion Index™', score: 61, desc: 'Mesure l\'inclusion financière par pays UEMOA : taux de bancarisation, pénétration mobile money, accès au crédit, épargne formelle, écart genre, couverture géographique.' },
                { name: 'KOS Digital MFI Readiness™', score: 52, desc: 'Évalue la maturité digitale des SFD : core banking system, canaux digitaux, interopérabilité, cybersécurité, capacité d\'innovation, conformité instruction BCEAO sur la digitalisation.' },
              ].map(idx => {
                const td = isEn && translatedItems[`idx-${idx.desc.slice(0, 30)}`] ? translatedItems[`idx-${idx.desc.slice(0, 30)}`] : undefined;
                return (
                <SectorIndiceCard key={idx.name} name={idx.name} score={idx.score} desc={td || idx.desc} color={MFI_COLOR} />
              );})}
            </div>
          </div>

          <QuarterlyKpisSection
            quarterlyKpis={quarterlyKpis}
            color={MFI_COLOR}
            progressColor="#059669"
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
              <h2 className="text-3xl font-display font-bold text-foreground-950 mb-3">Standards ISA/IFRS — ISO 27001</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {[
                { step: '01', title: 'Collecte réglementaire', desc: 'Données BCEAO, rapports CO SFD, états financiers RCS, rapports commissaires aux comptes, instructions BCEAO (22 textes), données AMF-UEMOA. 186 SFD agréés UEMOA.' },
                { step: '02', title: 'Analyse prudentielle', desc: 'Calcul ratios prudentiels (solvabilité, liquidité, division des risques, couverture des immobilisations), scoring qualité portefeuille PAR 30/90, analyse rentabilité, benchmarks régionaux.' },
                { step: '03', title: 'Validation & diffusion', desc: 'Revue Big Four, vérification croisée régulateurs, audit trail ISO 27001, publication multilingue FR/EN/PT avec SEO optimisé.' },
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

        <section className="py-20" style={{ background: 'linear-gradient(160deg, #0d1f0a 0%, #081a05 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-6" style={{ background: 'rgba(55,142,29,0.15)', border: '1px solid rgba(55,142,29,0.25)' }}>
              <i className="ri-hand-heart-line text-2xl" style={{ color: '#4a9e5b' }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Accédez à l'intelligence du secteur Microfinance</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto">186 SFD suivis, 8 pays UEMOA, 3 indices KOS™. Contrat institutionnel sur devis — nos experts vous accompagnent.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer transition-all hover:scale-105 text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #2d7518, #378e1d)' }}>
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