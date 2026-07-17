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
} from '@/components/feature/SectorKpiInline';

const TRIMESTRIEL_ENERGY = [
  { label: 'T1 2026', status: 'completed' as const, desc: 'Cadrage méthodologique — 5 projets pilotes' },
  { label: 'T2 2026', status: 'completed' as const, desc: 'Rapport semestriel Énergie & Infrastructures publié' },
  { label: 'T3 2026', status: 'planned' as const, desc: 'Benchmark — ESG Projets Extractifs UEMOA/CEMAC' },
  { label: 'T4 2026', status: 'planned' as const, desc: 'Baromètre PPP & Financement + Rapport annuel' },
];

const RECENT_INSIGHTS = [
  { icon: 'ri-file-chart-line', title: 'Rapport T2 2026 — Énergie & Infrastructures UEMOA/CEMAC', date: '15 Juin 2026', tag: 'Rapport' },
  { icon: 'ri-bar-chart-box-line', title: 'Benchmark — ESG Projets Extractifs : 47 projets notés', date: 'En cours', tag: 'Benchmark' },
  { icon: 'ri-lightbulb-line', title: 'Baromètre PPP : 12 nouveaux partenariats public-privé recensés', date: 'En préparation', tag: 'Baromètre' },
  { icon: 'ri-article-line', title: 'Article — Financement des infrastructures énergétiques en zone CFA', date: '5 Mai 2026', tag: 'Article' },
];

const ENERGY_COLOR = '#5ba832';

export default function ObservatoireEnergiePage() {
  const navigate = useNavigate();
  const { kpis, loading: kpiLoading, fromSupabase, refresh } = useSectorKpis('energie');
  const { quarterlyKpis, loading: qLoading, fromSupabase: qFromSupabase } = useSectorQuarterlyKpis('energie');
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
    const idxDescs = ['KOS Energy Project Viability™ — Évalue la viabilité technique, financière et réglementaire des projets énergétiques. Pondération : financement (40%), cadre légal (30%), impact ESG (30%).','KOS Extractives Compliance™ — Mesure la conformité aux normes ITIE, directives minières UEMOA/CEMAC et standards environnementaux applicables au secteur extractif.','KOS Infrastructure ESG Score™ — Notation ESG spécifique aux infrastructures : Scope 1-2-3, impact communautaire, durabilité des matériaux, résilience climatique.'];
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
      sectorName: 'Énergie & Infrastructures',
      sectorIcon: 'ri-flashlight-line',
      sectorColor: '#5ba832',
      zone: 'UEMOA + CEMAC + CEDEAO — 14 pays — 47 projets',
      score: 73,
      scoreLabel: 'KOS Energy Sector Score™',
      scoreBreakdown: [
        { label: 'Viabilité Projets', val: 72 },
        { label: 'Conformité Extractives', val: 84 },
        { label: 'Performance ESG', val: 68 },
        { label: 'Couverture Pays', val: 82 },
        { label: 'Publications', val: 75 },
      ],
      kpis,
      quarterlyKpis,
      indices: [
        { name: 'KOS Energy Project Viability™', score: 72, desc: 'Viabilité technique, financière et réglementaire.' },
        { name: 'KOS Extractives Compliance™', score: 84, desc: 'Conformité normes ITIE et directives minières.' },
        { name: 'KOS Infrastructure ESG Score™', score: 68, desc: 'Notation ESG spécifique aux infrastructures.' },
      ],
      insights: RECENT_INSIGHTS.map(i => ({ title: i.title, date: i.date, tag: i.tag })),
      quarters: TRIMESTRIEL_ENERGY.map(q => ({ label: q.label, status: q.status, desc: q.desc })),
    });
  }, [exportPdf, kpis, quarterlyKpis]);

  return (
    <>
      <SeoHead
        title="Observatoire Énergie & Infrastructures — Projets, PPP, ESG Extractif — KOS Afrique"
        description="Observatoire sectoriel Énergie & Infrastructures : 47 projets suivis, 14 pays UEMOA/CEMAC/CEDEAO, KPI viabilité projet et conformité ESG. Rapports semestriels, benchmarks, indices KOS™. Accès institutionnel."
        keywords="énergie Afrique, infrastructures PPP UEMOA, observatoire énergie CEMAC, ESG projets extractifs, financement infrastructures Afrique, KOS Energy Project Viability"
        canonicalPath="/observatoires-sectoriels/energie/"
        ogType="website"
      />
      <div className="min-h-screen bg-background-50">
        <Navigation />

        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: 'linear-gradient(160deg, #f6faf2 0%, #edf5e5 40%, #f2f7ee 100%)' }}>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(91,168,50,0.12), transparent)' }} />
            <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(45,117,24,0.08), transparent)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-5">
              <BigFourSubtitleBar label="Observatoire Sectoriel KOS" variant="centered-pillars" icon="ri-flashlight-line" accentColor="primary" />
            </div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl" style={{ background: 'rgba(91,168,50,0.1)', border: '1px solid rgba(91,168,50,0.2)' }}>
                <i className="ri-flashlight-line text-2xl" style={{ color: '#5ba832' }} />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground-950 leading-tight">
                Énergie{' '}
                <span style={{ color: '#5ba832' }}>&</span>{' '}
                Infrastructures
              </h1>
            </div>
            <p className="text-xl text-foreground-600 mb-3 max-w-3xl mx-auto text-center leading-relaxed">
              Projets énergétiques, PPP, financement d'infrastructures, due diligence ESG et conformité réglementaire du secteur extractif en Afrique francophone.
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#5ba832' }}>UEMOA + CEMAC + CEDEAO</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ color: '#5ba832', background: 'rgba(91,168,50,0.1)' }}>14 pays</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ color: '#5ba832', background: 'rgba(91,168,50,0.1)' }}>47 projets</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ObservatoireTranslationBar translatedCount={translatedCount} translatableTotal={translatableTotal} onTranslateAll={handleTranslateAll} translatingAll={translatingAll} />
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer transition-all hover:scale-105 text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #378e1d, #5ba832)' }}>
                <i className="ri-mail-send-line" /> Demander un accès
              </button>
              <button onClick={handleManualRefresh} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer border transition-all hover:-translate-y-0.5 whitespace-nowrap" style={{ color: '#5ba832', borderColor: 'rgba(91,168,50,0.3)', background: 'rgba(91,168,50,0.04)' }}>
                <i className="ri-refresh-line" /> Rafraîchir KPI
              </button>
              <button onClick={handleExportPdf} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer border transition-all hover:-translate-y-0.5 whitespace-nowrap" style={{ color: '#5ba832', borderColor: 'rgba(91,168,50,0.3)', background: 'rgba(91,168,50,0.04)' }}>
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

        {/* KPI Dashboard */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-6">
            <BigFourSubtitleBar label="Dashboard — KPI Énergie & Infrastructures" variant="left-accent" icon="ri-dashboard-line" accentColor="primary" />
          </div>
          <div className="flex items-center justify-between mb-2">
            {fromSupabase && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 flex items-center gap-1"><i className="ri-database-2-line" /> Supabase</span>}
            {kpiLoading && <span className="text-[10px] text-foreground-400 flex items-center gap-1"><i className="ri-loader-4-line animate-spin" /> Chargement...</span>}
          </div>
          <SectorKpiGrid kpis={kpis} color={ENERGY_COLOR} hoverBorderClass="hover:border-emerald-300" />

          {/* Score Global & Synthèse */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <SectorScoreCard score={73} label="KOS Energy Sector Score™" color={ENERGY_COLOR} breakdown={[{ label: 'Viabilité Projets', val: 72 },{ label: 'Conformité Réglementaire', val: 84 },{ label: 'Performance ESG', val: 68 },{ label: 'Couverture Pays', val: 82 },{ label: 'Publications', val: 75 }]} />

            <div className="bg-white rounded-xl p-6 border border-background-200 lg:col-span-2">
              <SectorQuarterSelector quarters={TRIMESTRIEL_ENERGY} />
            </div>
          </div>

          {/* Publications récentes */}
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

          {/* Indices KOS™ */}
          <div className="mt-8 bg-white rounded-xl border border-background-200 p-6">
            <div className="mb-5">
              <BigFourSubtitleBar label="Indices KOS™ Énergie" variant="left-accent" icon="ri-bar-chart-line" accentColor="primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: 'KOS Energy Project Viability™', score: 72, desc: 'Évalue la viabilité technique, financière et réglementaire des projets énergétiques. Pondération : financement (40%), cadre légal (30%), impact ESG (30%).' },
                { name: 'KOS Extractives Compliance™', score: 84, desc: 'Mesure la conformité aux normes ITIE, directives minières UEMOA/CEMAC et standards environnementaux applicables au secteur extractif.' },
                { name: 'KOS Infrastructure ESG Score™', score: 68, desc: 'Notation ESG spécifique aux infrastructures : Scope 1-2-3, impact communautaire, durabilité des matériaux, résilience climatique.' },
              ].map(idx => {
                const td = isEn && translatedItems[`idx-${idx.desc.slice(0, 30)}`] ? translatedItems[`idx-${idx.desc.slice(0, 30)}`] : undefined;
                return (
                <SectorIndiceCard key={idx.name} name={idx.name} score={idx.score} desc={td || idx.desc} color={ENERGY_COLOR} />
              );})}
            </div>
          </div>

          <QuarterlyKpisSection
            quarterlyKpis={quarterlyKpis}
            color={ENERGY_COLOR}
            progressColor="#059669"
            loading={qLoading}
            fromSupabase={qFromSupabase}
          />
        </section>

        {/* Méthodologie Big Four */}
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
                { step: '01', title: 'Collecte terrain', desc: 'Données primaires des 47 projets suivis, états financiers, rapports d\'impact, données régulateurs BCEAO/BEAC.' },
                { step: '02', title: 'Analyse quantitative', desc: 'Scoring multicritères, matrices risques, modèles financiers DCF, stress tests climatiques, benchmarks internationaux (IFC, SFI).' },
                { step: '03', title: 'Validation & publication', desc: 'Revue Big Four, vérification croisée, audit trail ISO 27001, publication multilingue FR/EN/PT avec SEO optimisé.' },
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

        {/* CTA */}
        <section className="py-20" style={{ background: 'linear-gradient(160deg, #0d1f0a 0%, #081a05 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-6" style={{ background: 'rgba(91,168,50,0.15)', border: '1px solid rgba(91,168,50,0.25)' }}>
              <i className="ri-flashlight-line text-2xl" style={{ color: '#5ba832' }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Accédez à l'intelligence du secteur Énergie</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto">47 projets suivis, 14 pays, 3 indices KOS™. Contrat institutionnel sur devis — nos experts vous accompagnent.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer transition-all hover:scale-105 text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #378e1d, #5ba832)' }}>
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