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

const TRIMESTRIEL_AGRICULTURE = [
  { label: 'T1 2026', status: 'planned' as const, desc: 'Lancement — Cartographie des chaînes de valeur prioritaires' },
  { label: 'T2 2026', status: 'in_progress' as const, desc: 'Premier rapport — Chaîne de valeur cacao & coton UEMOA' },
  { label: 'T3 2026', status: 'planned' as const, desc: 'Benchmark — Risques climatiques par filière' },
  { label: 'T4 2026', status: 'planned' as const, desc: 'Rapport annuel Agri-Business + Baromètre climat' },
];

const RECENT_INSIGHTS = [
  { icon: 'ri-article-line', title: 'Analyse — Chaîne de valeur cacao Côte d\'Ivoire : certification bio & commerce équitable', date: '20 Juin 2026', tag: 'Article' },
  { icon: 'ri-bar-chart-box-line', title: 'Benchmark — Résilience climatique des filières cotonnières UEMOA', date: 'En cours', tag: 'Benchmark' },
  { icon: 'ri-file-chart-line', title: 'Rapport T2 2026 — Agri-Business : 8 chaînes de valeur analysées', date: 'En préparation', tag: 'Rapport' },
  { icon: 'ri-lightbulb-line', title: 'Note — Financement agricole et mécanismes de garantie FAGACE', date: '3 Mai 2026', tag: 'Note' },
];

const AGRI_COLOR = '#2d7518';

export default function ObservatoireAgriculturePage() {
  const navigate = useNavigate();
  const { kpis, loading: kpiLoading, fromSupabase, refresh } = useSectorKpis('agriculture');
  const { quarterlyKpis, loading: qLoading, fromSupabase: qFromSupabase } = useSectorQuarterlyKpis('agriculture');
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
    const idxDescs = ['KOS Agri Value Chain Index™ — Évalue la performance des chaînes de valeur agricoles : productivité, transformation locale, accès aux marchés internationaux et certification.','KOS Climate Risk Score™ — Mesure l\'exposition des filières agricoles aux risques climatiques : sécheresse, inondations, variabilité des rendements, adaptation.','KOS Land Compliance Index™ — Conformité foncière : titres de propriété, normes OHADA, directives UEMOA sur le foncier rural, conflits d\'usage et sécurisation.'];
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
      sectorName: 'Agriculture & Agro-Industrie',
      sectorIcon: 'ri-plant-line',
      sectorColor: '#2d7518',
      zone: 'UEMOA + CEMAC + CEDEAO — 10 pays — 8 filières',
      score: 65,
      scoreLabel: 'KOS Agriculture Sector Score™',
      scoreBreakdown: [
        { label: 'Chaînes de Valeur', val: 64 },
        { label: 'Risque Climatique', val: 58 },
        { label: 'Conformité Foncière', val: 71 },
        { label: 'Couverture Pays', val: 59 },
        { label: 'Publications', val: 50 },
      ],
      kpis,
      quarterlyKpis,
      indices: [
        { name: 'KOS Agri Value Chain Index™', score: 64, desc: 'Performance des chaînes de valeur agricoles.' },
        { name: 'KOS Climate Risk Score™', score: 58, desc: 'Exposition des filières aux risques climatiques.' },
        { name: 'KOS Land Compliance Index™', score: 71, desc: 'Conformité foncière OHADA et directives UEMOA.' },
      ],
      insights: RECENT_INSIGHTS.map(i => ({ title: i.title, date: i.date, tag: i.tag })),
      quarters: TRIMESTRIEL_AGRICULTURE.map(q => ({ label: q.label, status: q.status, desc: q.desc })),
    });
  }, [exportPdf, kpis, quarterlyKpis]);

  return (
    <>
      <SeoHead
        title="Observatoire Agriculture & Agro-Industrie — Chaînes de Valeur, Climat, Foncier — KOS Afrique"
        description="Observatoire sectoriel Agriculture & Agro-Industrie : 8 chaînes de valeur, 10 pays UEMOA/CEMAC/CEDEAO, KPI risque climatique et conformité foncière. Indices KOS Agri Value Chain™, Climate Risk Score™. Accès institutionnel."
        keywords="agriculture Afrique, agro-industrie UEMOA, chaînes de valeur Afrique, risque climatique agriculture, conformité foncière UEMOA, KOS Agri Value Chain"
        canonicalPath="/observatoires-sectoriels/agriculture/"
        ogType="website"
      />
      <div className="min-h-screen bg-background-50">
        <Navigation />

        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: 'linear-gradient(160deg, #faf7f0 0%, #f5f0e4 40%, #f8f4eb 100%)' }}>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(45,117,24,0.10), transparent)' }} />
            <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,168,42,0.08), transparent)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-5">
              <BigFourSubtitleBar label="Observatoire Sectoriel KOS" variant="centered-pillars" icon="ri-plant-line" accentColor="primary" />
            </div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl" style={{ background: 'rgba(45,117,24,0.1)', border: '1px solid rgba(45,117,24,0.2)' }}>
                <i className="ri-plant-line text-2xl" style={{ color: '#2d7518' }} />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground-950 leading-tight">
                Agriculture{' '}
                <span style={{ color: '#2d7518' }}>&</span>{' '}
                Agro-Industrie
              </h1>
            </div>
            <p className="text-xl text-foreground-600 mb-3 max-w-3xl mx-auto text-center leading-relaxed">
              Financement agricole, chaînes de valeur, certification bio et commerce équitable, gestion des risques climatiques, conformité foncière et ESG.
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#2d7518' }}>UEMOA + CEMAC + CEDEAO</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ color: '#2d7518', background: 'rgba(45,117,24,0.1)' }}>10 pays</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ color: '#2d7518', background: 'rgba(45,117,24,0.1)' }}>8 filières</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ObservatoireTranslationBar translatedCount={translatedCount} translatableTotal={translatableTotal} onTranslateAll={handleTranslateAll} translatingAll={translatingAll} />
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

        {/* KPI Dashboard */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-6">
            <BigFourSubtitleBar label="Dashboard — KPI Agriculture & Agro-Industrie" variant="left-accent" icon="ri-dashboard-line" accentColor="primary" />
          </div>
          <div className="flex items-center justify-between mb-2">
            {fromSupabase && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 flex items-center gap-1"><i className="ri-database-2-line" /> Supabase</span>}
            {kpiLoading && <span className="text-[10px] text-foreground-400 flex items-center gap-1"><i className="ri-loader-4-line animate-spin" /> Chargement...</span>}
          </div>
          <SectorKpiGrid kpis={kpis} color={AGRI_COLOR} hoverBorderClass="hover:border-emerald-300" />

          {/* Score Global & Synthèse */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <SectorScoreCard score={65} label="KOS Agriculture Sector Score™" color={AGRI_COLOR} breakdown={[{ label: 'Chaînes de Valeur', val: 64 },{ label: 'Risque Climatique', val: 58 },{ label: 'Conformité Foncière', val: 71 },{ label: 'Couverture Pays', val: 59 },{ label: 'Publications', val: 50 }]} />

            <div className="bg-white rounded-xl p-6 border border-background-200 lg:col-span-2">
              <SectorQuarterSelector quarters={TRIMESTRIEL_AGRICULTURE} />
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
              <BigFourSubtitleBar label="Indices KOS™ Agriculture" variant="left-accent" icon="ri-bar-chart-line" accentColor="primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: 'KOS Agri Value Chain Index™', score: 64, desc: 'Évalue la performance des chaînes de valeur agricoles : productivité, transformation locale, accès aux marchés internationaux et certification.' },
                { name: 'KOS Climate Risk Score™', score: 58, desc: 'Mesure l\'exposition des filières agricoles aux risques climatiques : sécheresse, inondations, variabilité des rendements, adaptation.' },
                { name: 'KOS Land Compliance Index™', score: 71, desc: 'Conformité foncière : titres de propriété, normes OHADA, directives UEMOA sur le foncier rural, conflits d\'usage et sécurisation.' },
              ].map(idx => {
                const td = isEn && translatedItems[`idx-${idx.desc.slice(0, 30)}`] ? translatedItems[`idx-${idx.desc.slice(0, 30)}`] : undefined;
                return (
                <SectorIndiceCard key={idx.name} name={idx.name} score={idx.score} desc={td || idx.desc} color={AGRI_COLOR} />
              );})}
            </div>
          </div>

          <QuarterlyKpisSection
            quarterlyKpis={quarterlyKpis}
            color={AGRI_COLOR}
            progressColor="#059669"
            loading={qLoading}
            fromSupabase={qFromSupabase}
          />
        </section>

        {/* Méthodologie */}
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
                { step: '01', title: 'Collecte terrain', desc: 'Données des 8 filières, coopératives, instituts de recherche agronomique, données satellites climatiques, registres fonciers OHADA.' },
                { step: '02', title: 'Analyse quantitative', desc: 'Modèles rendement/climat, scoring ESG agricole, analyse chaînes de valeur, benchmarks internationaux (FAO, Banque Mondiale, IFAD).' },
                { step: '03', title: 'Validation & publication', desc: 'Revue Big Four, vérification croisée, audit trail ISO 27001, publication multilingue FR/EN/PT avec diffusion ciblée.' },
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
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-6" style={{ background: 'rgba(45,117,24,0.15)', border: '1px solid rgba(45,117,24,0.25)' }}>
              <i className="ri-plant-line text-2xl" style={{ color: '#4a9e5b' }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Accédez à l'intelligence du secteur agricole africain</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto">8 filières, 3 indices KOS™, données climatiques et foncières. Contrat institutionnel sur devis.</p>
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



