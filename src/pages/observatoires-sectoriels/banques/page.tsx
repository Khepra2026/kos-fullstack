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

const TRIMESTRIEL_BANKS = [
  { label: 'T1 2026', status: 'completed' as const, desc: 'Rapport T1 — Conformité Bancaire UEMOA/CEMAC publié' },
  { label: 'T2 2026', status: 'completed' as const, desc: 'Benchmark — Ratios Prudentiels 52 banques + Baromètre Gouvernance' },
  { label: 'T3 2026', status: 'planned' as const, desc: 'Rapport T3 — Conformité Bancaire + Stress Tests Pilier 2' },
  { label: 'T4 2026', status: 'planned' as const, desc: 'Rapport annuel — Synthèse Bancaire + Benchmark IFRS 9' },
];

const RECENT_INSIGHTS = [
  { icon: 'ri-file-chart-line', title: 'Rapport T2 2026 — Conformité Bancaire 52 banques', date: '15 Juin 2026', tag: 'Rapport' },
  { icon: 'ri-bar-chart-box-line', title: 'Benchmark — Ratios Prudentiels UEMOA vs CEMAC', date: 'En cours', tag: 'Benchmark' },
  { icon: 'ri-lightbulb-line', title: 'Baromètre — Gouvernance Bancaire : 4 indicateurs clés', date: 'En préparation', tag: 'Baromètre' },
  { icon: 'ri-article-line', title: 'Article — Réforme ratio solvabilité UEMOA 2026 : impact', date: '10 Mai 2026', tag: 'Article' },
];

const BANKS_COLOR = '#2d7518';

export default function ObservatoireBanquesPage() {
  const navigate = useNavigate();
  const { kpis, loading: kpiLoading, fromSupabase, refresh, lastRefresh } = useSectorKpis('banques');
  const { quarterlyKpis, loading: qLoading, fromSupabase: qFromSupabase } = useSectorQuarterlyKpis('banques');
  const { exportPdf } = useSectorPdfExport();
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Translation
  const { isEn, translateBatch } = useObservatoireTranslation();
  const [translatedItems, setTranslatedItems] = useState<Record<string, string>>({});
  const [translatingAll, setTranslatingAll] = useState(false);

  const translatableTotal = RECENT_INSIGHTS.length + 3; // insights titles + index descriptions
  const translatedCount = Object.keys(translatedItems).length;

  const handleTranslateAll = useCallback(async () => {
    if (!isEn) return;
    setTranslatingAll(true);
    const batch: string[] = [];
    const keys: string[] = [];
    for (const insight of RECENT_INSIGHTS) {
      if (!translatedItems[`insight-${insight.title}`]) { batch.push(insight.title); keys.push(`insight-${insight.title}`); }
    }
    const idxDescs = [
      'KOS Banking Compliance Index™ — Évalue la conformité globale des banques aux exigences BCEAO/COBAC : ratios prudentiels, LCB/FT, reporting réglementaire, contrôle interne. Pondération : solvabilité (35%), liquidité (25%), gouvernance (25%), LCB/FT (15%).',
      'KOS Bank Governance Score™ — Mesure la qualité de la gouvernance bancaire : indépendance du Conseil, comités spécialisés, transparence, gestion des conflits d\'intérêts, plan de succession.',
      'KOS Credit Risk Barometer™ — Baromètre du risque de crédit agrégé par juridiction : NPL ratios, provisionnement IFRS 9, concentration sectorielle, stress tests Pilier 2.',
    ];
    for (const desc of idxDescs) {
      if (!translatedItems[`idx-${desc.slice(0, 30)}`]) { batch.push(desc); keys.push(`idx-${desc.slice(0, 30)}`); }
    }
    if (batch.length === 0) { setTranslatingAll(false); return; }
    try {
      const translated = await translateBatch(batch);
      const newItems = { ...translatedItems };
      translated.forEach((t, i) => { newItems[keys[i]] = t; });
      setTranslatedItems(newItems);
    } catch { /* silent */ }
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
      sectorName: 'Banques & Établissements de Crédit',
      sectorIcon: 'ri-bank-line',
      sectorColor: '#2d7518',
      zone: 'UEMOA + CEMAC — 15 pays — 52 banques',
      score: 76,
      scoreLabel: 'KOS Banking Sector Score™',
      scoreBreakdown: [
        { label: 'Conformité Réglementaire', val: 82 },
        { label: 'Gouvernance', val: 76 },
        { label: 'Risque de Crédit', val: 71 },
        { label: 'Couverture Pays', val: 88 },
        { label: 'Publications', val: 100 },
      ],
      kpis,
      quarterlyKpis,
      indices: [
        { name: 'KOS Banking Compliance Index™', score: 82, desc: 'Conformité globale des banques aux exigences BCEAO/COBAC.' },
        { name: 'KOS Bank Governance Score™', score: 76, desc: 'Qualité de la gouvernance bancaire.' },
        { name: 'KOS Credit Risk Barometer™', score: 71, desc: 'Baromètre du risque de crédit agrégé par juridiction.' },
      ],
      insights: RECENT_INSIGHTS.map(i => ({ title: i.title, date: i.date, tag: i.tag })),
      quarters: TRIMESTRIEL_BANKS.map(q => ({ label: q.label, status: q.status, desc: q.desc })),
    });
  }, [exportPdf, kpis, quarterlyKpis]);

  return (
    <>
      <SeoHead
        title="Observatoire Banques & Établissements de Crédit — Conformité, Ratios, Gouvernance — KOS"
        description="Observatoire sectoriel Banques : 52 banques suivies, 15 pays UEMOA/CEMAC, KPI conformité et gouvernance bancaire. Rapports trimestriels, benchmarks ratios prudentiels, indices KOS™. Accès institutionnel."
        keywords="banques UEMOA, conformité bancaire CEMAC, ratios prudentiels BCEAO, gouvernance bancaire Afrique, stress tests bancaires, KOS Banking Compliance"
        canonicalPath="/observatoires-sectoriels/banques/"
        ogType="website"
      />
      <div className="min-h-screen bg-background-50">
        <Navigation />

        <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: 'linear-gradient(160deg, #f6faf2 0%, #edf5e5 40%, #f2f7ee 100%)' }}>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(45,117,24,0.12), transparent)' }} />
            <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(55,142,29,0.08), transparent)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-5">
              <BigFourSubtitleBar label="Observatoire Sectoriel KOS" variant="centered-pillars" icon="ri-bank-line" accentColor="primary" />
            </div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl" style={{ background: 'rgba(45,117,24,0.1)', border: '1px solid rgba(45,117,24,0.2)' }}>
                <i className="ri-bank-line text-2xl" style={{ color: '#2d7518' }} />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground-950 leading-tight">
                Banques{' '}
                <span style={{ color: '#2d7518' }}>&</span>{' '}
                Établissements de Crédit
              </h1>
            </div>
            <p className="text-xl text-foreground-600 mb-3 max-w-3xl mx-auto text-center leading-relaxed">
              Suivi des agréments, ratios prudentiels, gouvernance, conformité LCB/FT, IFRS 9, stress tests et transformation digitale des banques commerciales africaines.
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#2d7518' }}>UEMOA + CEMAC</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ color: '#2d7518', background: 'rgba(45,117,24,0.1)' }}>15 pays</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ color: '#2d7518', background: 'rgba(45,117,24,0.1)' }}>52 banques</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ObservatoireTranslationBar
                translatedCount={translatedCount}
                translatableTotal={translatableTotal}
                onTranslateAll={handleTranslateAll}
                translatingAll={translatingAll}
              />
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer transition-all hover:scale-105 text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #2d7518, #4a9e5b)' }}>
                <i className="ri-mail-send-line" /> Demander un accès
              </button>
              <button onClick={handleManualRefresh} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer border transition-all hover:-translate-y-0.5 whitespace-nowrap" style={{ color: '#2d7518', borderColor: 'rgba(45,117,24,0.3)', background: 'rgba(45,117,24,0.04)' }}>
                <i className="ri-refresh-line" /> Rafraîchir KPI
              </button>
              <button onClick={handleExportPdf} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer border transition-all hover:-translate-y-0.5 whitespace-nowrap" style={{ color: '#2d7518', borderColor: 'rgba(45,117,24,0.3)', background: 'rgba(45,117,24,0.04)' }}>
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
            <BigFourSubtitleBar label="Dashboard — KPI Banques & Établissements de Crédit" variant="left-accent" icon="ri-dashboard-line" accentColor="primary" />
          </div>
          <div className="flex items-center justify-between mb-2">
            {fromSupabase && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 flex items-center gap-1"><i className="ri-database-2-line" /> Supabase</span>}
            {kpiLoading && <span className="text-[10px] text-foreground-400 flex items-center gap-1"><i className="ri-loader-4-line animate-spin" /> Chargement...</span>}
          </div>
          <SectorKpiGrid kpis={kpis} color={BANKS_COLOR} hoverBorderClass="hover:border-emerald-300" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <SectorScoreCard
              score={76}
              label="KOS Banking Sector Score™"
              color={BANKS_COLOR}
              breakdown={[
                { label: 'Conformité Réglementaire', val: 82 },
                { label: 'Gouvernance', val: 76 },
                { label: 'Risque de Crédit', val: 71 },
                { label: 'Couverture Pays', val: 88 },
                { label: 'Publications', val: 100 },
              ]}
            />

            <div className="bg-white rounded-xl p-6 border border-background-200 lg:col-span-2">
              <SectorQuarterSelector quarters={TRIMESTRIEL_BANKS} />
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-5">
              <BigFourSubtitleBar label="Publications & Insights" variant="left-accent" icon="ri-book-open-line" accentColor="accent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {RECENT_INSIGHTS.map((insight, i) => (
                <SectorInsightCard
                  key={i}
                  title={tInsight(insight.title)}
                  date={insight.date}
                  tag={insight.tag}
                  icon={insight.icon}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl border border-background-200 p-6">
            <div className="mb-5">
              <BigFourSubtitleBar label="Indices KOS™ Banques" variant="left-accent" icon="ri-bar-chart-line" accentColor="primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: 'KOS Banking Compliance Index™', score: 82, desc: 'Évalue la conformité globale des banques aux exigences BCEAO/COBAC : ratios prudentiels, LCB/FT, reporting réglementaire, contrôle interne. Pondération : solvabilité (35%), liquidité (25%), gouvernance (25%), LCB/FT (15%).' },
                { name: 'KOS Bank Governance Score™', score: 76, desc: 'Mesure la qualité de la gouvernance bancaire : indépendance du Conseil, comités spécialisés, transparence, gestion des conflits d\'intérêts, plan de succession.' },
                { name: 'KOS Credit Risk Barometer™', score: 71, desc: 'Baromètre du risque de crédit agrégé par juridiction : NPL ratios, provisionnement IFRS 9, concentration sectorielle, stress tests Pilier 2.' },
              ].map(idx => {
                const translatedDesc = isEn && translatedItems[`idx-${idx.desc.slice(0, 30)}`] ? translatedItems[`idx-${idx.desc.slice(0, 30)}`] : undefined;
                return (
                <SectorIndiceCard key={idx.name} name={idx.name} score={idx.score} desc={translatedDesc || idx.desc} color={BANKS_COLOR} />
              );})}
            </div>
          </div>

          <QuarterlyKpisSection
            quarterlyKpis={quarterlyKpis}
            color={BANKS_COLOR}
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
                { step: '01', title: 'Collecte réglementaire', desc: 'Données BCEAO, COBAC, états financiers IFRS, rapports annuels, notations agences, benchmarks FMI/Banque Mondiale sur 52 banques.' },
                { step: '02', title: 'Analyse quantitative', desc: 'Scoring ISA 315/330, matrices de risques, calcul ratios prudentiels (solvabilité, liquidité, concentration), stress tests, projections IFRS 9.' },
                { step: '03', title: 'Validation & diffusion', desc: 'Revue Big Four, vérification croisée, audit trail ISO 27001, publication multilingue FR/EN/PT avec SEO optimisé.' },
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
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-6" style={{ background: 'rgba(45,117,24,0.15)', border: '1px solid rgba(45,117,24,0.25)' }}>
              <i className="ri-bank-line text-2xl" style={{ color: '#4a9e5b' }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Accédez à l'intelligence du secteur bancaire</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto">52 banques suivies, 15 pays, 3 indices KOS™. Contrat institutionnel sur devis — nos experts vous accompagnent.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer transition-all hover:scale-105 text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #2d7518, #4a9e5b)' }}>
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