import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import {
  pmeStartupKPIs,
  startupsAfricaines,
  indicateursPME,
  financementPME,
  actualitesPME,
  faqsPME,
} from '@/mocks/observatoirePMEStartups';

const TRIMESTRIEL_PME = [
  { label: 'T1 2026', status: 'planned' as const, desc: 'Cadrage — Échantillon de 150 PME, 5 pays pilotes + 20 startups' },
  { label: 'T2 2026', status: 'completed' as const, desc: 'Rapport semestriel PME & Startups — 340 entreprises notées, focus FinTech' },
  { label: 'T3 2026', status: 'planned' as const, desc: 'Benchmark — ESG PME & Startups par secteur et pays' },
  { label: 'T4 2026', status: 'planned' as const, desc: 'Guide — Due Diligence Investisseurs + Rapport annuel + Startup Africa Index™' },
];

const RECENT_INSIGHTS = [
  { icon: 'ri-file-chart-line', title: 'Rapport T2 2026 — Santé Financière PME : 340 entreprises notées', date: '5 Juillet 2026', tag: 'Rapport' },
  { icon: 'ri-rocket-line', title: 'Startup Africa Index™ — 65 startups, 5 secteurs, 12 pays', date: 'En cours', tag: 'Indice' },
  { icon: 'ri-bar-chart-box-line', title: 'Benchmark — Maturité ESG PME : +6 pts, énergie en tête', date: '25 Juin 2026', tag: 'Benchmark' },
  { icon: 'ri-lightbulb-line', title: 'Note — Financement PME : panorama 6 guichets, 4.05 milliards FCFA', date: '18 Juin 2026', tag: 'Note' },
  { icon: 'ri-article-line', title: 'Guide — Due Diligence Investisseurs pour PME Africaines', date: 'En préparation', tag: 'Guide' },
  { icon: 'ri-smartphone-line', title: 'Focus FinTech — 18 startups paiement mobile, 1.86 milliard FCFA levés', date: '12 Juin 2026', tag: 'Focus' },
];

const PME_COLOR = '#378e1d';
const STARTUP_COLOR = '#d4a82a';

export default function ObservatoirePMEPage() {
  const navigate = useNavigate();
  const { kpis, loading: kpiLoading, fromSupabase, refresh } = useSectorKpis('pme');
  const { quarterlyKpis, loading: qLoading, fromSupabase: qFromSupabase } = useSectorQuarterlyKpis('pme');
  const { exportPdf } = useSectorPdfExport();
  const [autoRefresh, setAutoRefresh] = useState(true);

  const { isEn, translateBatch } = useObservatoireTranslation();
  const [translatedItems, setTranslatedItems] = useState<Record<string, string>>({});
  const [translatingAll, setTranslatingAll] = useState(false);
  const [activeTab, setActiveTab] = useState<'pme' | 'startups' | 'financement'>('pme');

  const translatableTotal = RECENT_INSIGHTS.length + 3;
  const translatedCount = Object.keys(translatedItems).length;

  const handleTranslateAll = useCallback(async () => {
    if (!isEn) return; setTranslatingAll(true);
    const batch: string[] = []; const keys: string[] = [];
    for (const i of RECENT_INSIGHTS) { if (!translatedItems[`insight-${i.title}`]) { batch.push(i.title); keys.push(`insight-${i.title}`); } }
    const idxDescs = [
      'KOS SME Health Index™ — Évalue la santé financière des PME : liquidité, solvabilité, rentabilité, structure de capital, qualité de la gouvernance.',
      'KOS Investment Readiness Score™ — Mesure la capacité d\'une PME à attirer des investisseurs : due diligence, business plan, valorisation, conformité réglementaire.',
      'KOS SME ESG Maturity™ — Notation ESG adaptée aux PME : empreinte carbone, conditions de travail, chaîne d\'approvisionnement, gouvernance.',
    ];
    for (const d of idxDescs) { if (!translatedItems[`idx-${d.slice(0, 30)}`]) { batch.push(d); keys.push(`idx-${d.slice(0, 30)}`); } }
    if (batch.length === 0) { setTranslatingAll(false); return; }
    try { const t = await translateBatch(batch); const n = { ...translatedItems }; t.forEach((x, i) => { n[keys[i]] = x; }); setTranslatedItems(n); } catch { /* noop */ }
    setTranslatingAll(false);
  }, [isEn, translatedItems, translateBatch]);

  const tInsight = useCallback((title: string) => isEn && translatedItems[`insight-${title}`] ? translatedItems[`insight-${title}`] : title, [isEn, translatedItems]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => { refresh(); }, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, refresh]);

  const handleExportPdf = useCallback(() => {
    exportPdf({
      sectorName: 'PME & Startups — Afrique Francophone',
      sectorIcon: 'ri-store-2-line',
      sectorColor: '#378e1d',
      zone: '12 pays UEMOA/CEMAC — 340 entreprises',
      score: 62,
      scoreLabel: 'KOS SME & Startup Score™',
      scoreBreakdown: indicateursPME.scoreSante.breakdown,
      kpis,
      quarterlyKpis,
      indices: [
        { name: 'KOS SME Health Index™', score: 68, desc: 'Santé financière des PME.' },
        { name: 'KOS Investment Readiness Score™', score: 62, desc: 'Capacité à attirer des investisseurs.' },
        { name: 'KOS SME ESG Maturity™', score: 55, desc: 'Notation ESG adaptée aux PME.' },
      ],
      insights: RECENT_INSIGHTS.map(i => ({ title: i.title, date: i.date, tag: i.tag })),
      quarters: TRIMESTRIEL_PME.map(q => ({ label: q.label, status: q.status, desc: q.desc })),
    });
  }, [exportPdf, kpis, quarterlyKpis]);

  return (
    <>
      <SeoHead
        title="Observatoire PME & Startups — Santé Financière, ESG, Investissement, Innovation — KOS Afrique"
        description="Observatoire PME & Startups Afrique Francophone : 340 entreprises suivies dont 65 startups dans 5 secteurs (FinTech, AgriTech, HealthTech, EdTech, CleanTech). Indices KOS SME Health™, Investment Readiness™, ESG Maturity™. Financement, garantie FAGACE, due diligence. Accès institutionnel."
        keywords="PME Afrique, startups Afrique, FinTech Afrique, santé financière PME, ESG PME UEMOA, investment readiness, due diligence PME, startups francophones, KOS SME Health, Khepra"
        canonicalPath="/observatoires-sectoriels/pme/"
        ogType="website"
      />
      <div className="min-h-screen bg-background-50">
        <Navigation />

        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: 'linear-gradient(160deg, #f7faf4 0%, #eef5e8 40%, #f4f8f0 100%)' }}>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(55,142,29,0.12), transparent)' }} />
            <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,168,42,0.10), transparent)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-5">
              <BigFourSubtitleBar label="Observatoire Sectoriel KOS" variant="centered-pillars" icon="ri-store-2-line" accentColor="primary" />
            </div>
            <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl" style={{ background: 'rgba(55,142,29,0.1)', border: '1px solid rgba(55,142,29,0.2)' }}>
                <i className="ri-store-2-line text-2xl" style={{ color: '#378e1d' }} />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground-950 leading-tight">
                PME{' '}
                <span style={{ color: '#378e1d' }}>&</span>{' '}
                <span style={{ color: '#d4a82a' }}>Startups</span>
              </h1>
            </div>
            <p className="text-xl text-foreground-600 mb-3 max-w-3xl mx-auto text-center leading-relaxed">
              340 entreprises suivies en Afrique francophone — dont 65 startups innovantes dans 5 secteurs clés. Financement, due diligence investisseurs, conformité ESG et accès aux marchés.
            </p>
            <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#378e1d' }}>{pmeStartupKPIs.pmeClassiques} PME</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#d4a82a' }}>{pmeStartupKPIs.startups} Startups</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ color: '#378e1d', background: 'rgba(55,142,29,0.1)' }}>{pmeStartupKPIs.paysActifs} pays</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ color: '#378e1d', background: 'rgba(55,142,29,0.1)' }}>{pmeStartupKPIs.secteurs} secteurs</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ObservatoireTranslationBar translatedCount={translatedCount} translatableTotal={translatableTotal} onTranslateAll={handleTranslateAll} translatingAll={translatingAll} />
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer transition-all hover:scale-105 text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #2d7518, #378e1d)' }}>
                <i className="ri-mail-send-line" /> Demander un accès
              </button>
              <button onClick={handleExportPdf} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer border transition-all hover:-translate-y-0.5 whitespace-nowrap" style={{ color: '#378e1d', borderColor: 'rgba(55,142,29,0.3)', background: 'rgba(55,142,29,0.04)' }}>
                <i className="ri-file-pdf-line" /> Exporter PDF
              </button>
            </div>
          </div>
        </section>

        {/* Tab Switcher */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center gap-1.5 bg-white border border-background-200/70 rounded-full p-1 w-fit mx-auto shadow-sm">
            {[
              { id: 'pme' as const, label: 'PME & ETI', icon: 'ri-building-2-line', count: pmeStartupKPIs.pmeClassiques },
              { id: 'startups' as const, label: 'Startups', icon: 'ri-rocket-line', count: pmeStartupKPIs.startups },
              { id: 'financement' as const, label: 'Financement', icon: 'ri-bank-line', count: 6 },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id ? 'text-white shadow-sm' : 'text-foreground-500 hover:bg-background-100'
                }`}
                style={activeTab === tab.id ? { background: tab.id === 'startups' ? 'linear-gradient(135deg, #d4a82a, #e8b84b)' : 'linear-gradient(135deg, #2d7518, #4a9e5b)' } : {}}
              >
                <i className={`${tab.icon} text-xs`} />
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200 text-foreground-500'}`}>{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* KPI Dashboard */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* KPI Top Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-8">
            {[
              { label: 'Entreprises', value: pmeStartupKPIs.totalEntreprises, icon: 'ri-store-2-line' },
              { label: 'Score Santé', value: `${pmeStartupKPIs.scoreSanteMoyen}/100`, icon: 'ri-heart-pulse-line' },
              { label: 'Inv. Readiness', value: `${pmeStartupKPIs.scoreInvestmentReadiness}/100`, icon: 'ri-funds-line' },
              { label: 'ESG Maturity', value: `${pmeStartupKPIs.scoreESGMaturite}/100`, icon: 'ri-leaf-line' },
              { label: 'Financement', value: pmeStartupKPIs.financementTotal, icon: 'ri-money-dollar-circle-line' },
              { label: 'Fiabilité KOS', value: `${pmeStartupKPIs.indiceFiabilite}/100`, icon: 'ri-check-double-line' },
            ].map((s, i) => (
              <div key={i} className="p-3 rounded-xl bg-white border border-background-200 text-center">
                <i className={`${s.icon} text-emerald-600 text-base mb-1 block`}></i>
                <div className="text-lg font-bold text-foreground-950">{s.value}</div>
                <div className="text-[10px] text-foreground-500">{s.label}</div>
              </div>
            ))}
          </div>

          {/* PME Tab */}
          {activeTab === 'pme' && (
            <>
              <div className="mb-6">
                <BigFourSubtitleBar label="Dashboard — KPI PME & ETI" variant="left-accent" icon="ri-dashboard-line" accentColor="primary" />
              </div>
              <SectorKpiGrid kpis={kpis} color={PME_COLOR} hoverBorderClass="hover:border-emerald-300" />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <SectorScoreCard score={indicateursPME.scoreSante.value} label={indicateursPME.scoreSante.label} color={PME_COLOR} breakdown={indicateursPME.scoreSante.breakdown} />
                <div className="bg-white rounded-xl p-6 border border-background-200 lg:col-span-2">
                  <SectorQuarterSelector quarters={TRIMESTRIEL_PME} />
                </div>
              </div>

              {/* 3 indices */}
              <div className="mt-8 bg-white rounded-xl border border-background-200 p-6">
                <div className="mb-5">
                  <BigFourSubtitleBar label="Indices KOS™ PME" variant="left-accent" icon="ri-bar-chart-line" accentColor="primary" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    { name: indicateursPME.scoreSante.label, score: indicateursPME.scoreSante.value, desc: 'Évalue la santé financière des PME : liquidité, solvabilité, rentabilité, structure de capital, qualité de la gouvernance.', color: PME_COLOR },
                    { name: indicateursPME.scoreInvestment.label, score: indicateursPME.scoreInvestment.value, desc: 'Mesure la capacité d\'une PME à attirer des investisseurs : due diligence, business plan, valorisation, conformité réglementaire.', color: '#d4a82a' },
                    { name: indicateursPME.scoreESG.label, score: indicateursPME.scoreESG.value, desc: 'Notation ESG adaptée aux PME : empreinte carbone, conditions de travail, chaîne d\'approvisionnement, gouvernance.', color: '#5ba832' },
                  ].map(idx => (
                    <SectorIndiceCard key={idx.name} name={idx.name} score={idx.score} desc={idx.desc} color={idx.color} />
                  ))}
                </div>
              </div>

              <QuarterlyKpisSection quarterlyKpis={quarterlyKpis} color={PME_COLOR} progressColor="#059669" loading={qLoading} fromSupabase={qFromSupabase} />
            </>
          )}

          {/* Startups Tab */}
          {activeTab === 'startups' && (
            <>
              <div className="mb-6">
                <BigFourSubtitleBar label="Startups Africaines — 65 entreprises innovantes" variant="left-accent" icon="ri-rocket-line" accentColor="accent" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {startupsAfricaines.map(s => (
                  <div key={s.id} className="bg-white rounded-xl border border-background-200 overflow-hidden hover:shadow-md transition-all group cursor-pointer">
                    <div className="px-5 py-3 border-b border-background-100 flex items-center gap-3" style={{ background: `${s.couleur}08` }}>
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl text-white font-bold text-sm" style={{ background: s.couleur }}>
                        {s.nom.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-foreground-950 truncate">{s.nom}</div>
                        <div className="flex items-center gap-1.5 text-[10px] text-foreground-500">
                          <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">{s.secteur}</span>
                          <span>{s.pays}</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-5 py-3">
                      <p className="text-xs text-foreground-600 leading-relaxed mb-3 line-clamp-2">{s.description}</p>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="text-center p-2 rounded-lg bg-background-100">
                          <div className="text-sm font-bold text-foreground-950">{s.employes}</div>
                          <div className="text-[9px] text-foreground-400">employés</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-background-100">
                          <div className="text-sm font-bold text-foreground-950">{s.financement}</div>
                          <div className="text-[9px] text-foreground-400">levés</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-background-100">
                          <div className="text-sm font-bold text-foreground-950">{s.stade}</div>
                          <div className="text-[9px] text-foreground-400">stade</div>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-foreground-500">Santé</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-background-200 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${s.scoreSante}%` }} />
                            </div>
                            <span className="font-bold text-foreground-700">{s.scoreSante}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-foreground-500">Invest.</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-background-200 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-amber-500" style={{ width: `${s.scoreInvestment}%` }} />
                            </div>
                            <span className="font-bold text-foreground-700">{s.scoreInvestment}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-foreground-500">ESG</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-background-200 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-green-500" style={{ width: `${s.scoreESG}%` }} />
                            </div>
                            <span className="font-bold text-foreground-700">{s.scoreESG}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats aggregate startups */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl p-5 border border-background-200 text-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mx-auto mb-3" style={{ background: 'rgba(212,168,42,0.1)' }}>
                    <i className="ri-funds-line text-lg" style={{ color: '#d4a82a' }} />
                  </div>
                  <div className="text-2xl font-bold text-foreground-950">3.78B FCFA</div>
                  <div className="text-xs text-foreground-500">Total levé par les startups</div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-background-200 text-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mx-auto mb-3" style={{ background: 'rgba(55,142,29,0.1)' }}>
                    <i className="ri-team-line text-lg" style={{ color: '#378e1d' }} />
                  </div>
                  <div className="text-2xl font-bold text-foreground-950">180</div>
                  <div className="text-xs text-foreground-500">Emplois créés (moyenne 2.8/startup)</div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-background-200 text-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mx-auto mb-3" style={{ background: 'rgba(91,168,50,0.1)' }}>
                    <i className="ri-global-line text-lg" style={{ color: '#5ba832' }} />
                  </div>
                  <div className="text-2xl font-bold text-foreground-950">{pmeStartupKPIs.paysActifs}</div>
                  <div className="text-xs text-foreground-500">Pays représentés</div>
                </div>
              </div>
            </>
          )}

          {/* Financement Tab */}
          {activeTab === 'financement' && (
            <>
              <div className="mb-6">
                <BigFourSubtitleBar label="Guichets de Financement — PME & Startups" variant="left-accent" icon="ri-bank-line" accentColor="primary" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {financementPME.map(f => (
                  <div key={f.source} className="bg-white rounded-xl p-5 border border-background-200 hover:border-emerald-300 transition-all group cursor-pointer" style={{ borderLeft: `4px solid ${f.couleur}` }}>
                    <h3 className="text-base font-bold text-foreground-950 mb-2">{f.source}</h3>
                    <p className="text-xs text-foreground-600 leading-relaxed mb-4">{f.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-background-100 text-center">
                        <div className="text-sm font-bold" style={{ color: f.couleur }}>{f.montant}</div>
                        <div className="text-[10px] text-foreground-400">mobilisés</div>
                      </div>
                      <div className="p-3 rounded-lg bg-background-100 text-center">
                        <div className="text-sm font-bold text-foreground-950">{f.projets}</div>
                        <div className="text-[10px] text-foreground-400">projets financés</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Actualités */}
          <div className="mt-8">
            <div className="mb-5">
              <BigFourSubtitleBar label="Actualités PME & Startups" variant="left-accent" icon="ri-book-open-line" accentColor="accent" />
            </div>
            <div className="space-y-3">
              {actualitesPME.map(a => (
                <div key={a.id} className="p-4 rounded-xl bg-white border border-background-200 flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className={`text-[10px] px-2 py-1 rounded-full border font-bold whitespace-nowrap ${
                    a.impact === 'Critique' ? 'bg-red-100 text-red-700 border-red-200' :
                    a.impact === 'Élevé' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                    'bg-foreground-100 text-foreground-600 border-foreground-200'
                  }`}>{a.impact}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground-950">{a.titre}</p>
                    <p className="text-xs text-foreground-500 mt-0.5">{a.resume}</p>
                  </div>
                  <span className="text-[11px] text-foreground-400 whitespace-nowrap">{new Date(a.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Publications récentes */}
          <div className="mt-8">
            <div className="mb-5">
              <BigFourSubtitleBar label="Publications & Insights" variant="left-accent" icon="ri-book-open-line" accentColor="accent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {RECENT_INSIGHTS.map((insight, i) => (
                <SectorInsightCard key={i} title={tInsight(insight.title)} date={insight.date} tag={insight.tag} icon={insight.icon} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <BigFourSubtitleBar label="Questions Fréquentes" variant="left-accent" icon="ri-question-line" accentColor="primary" />
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqsPME.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-background-200 overflow-hidden">
                  <details className="group">
                    <summary className="p-5 cursor-pointer list-none flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-foreground-950">{faq.q}</span>
                      <i className="ri-add-line text-foreground-400 group-open:rotate-45 transition-transform"></i>
                    </summary>
                    <div className="px-5 pb-5"><p className="text-sm text-foreground-600 leading-relaxed">{faq.a}</p></div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Méthodologie */}
        <section className="py-16 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="Méthodologie Big Four" variant="left-accent" icon="ri-scales-3-line" accentColor="accent" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground-950 mb-3">Standards ISA/IFRS — ISO 27001</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {[
                { step: '01', title: 'Collecte terrain', desc: 'Données financières de 340 entreprises, états certifiés, registres OHADA, données FAGACE/ARIZ/BOAD/BDEAC, enquêtes terrain, pitch decks startups.' },
                { step: '02', title: 'Analyse quantitative', desc: 'Ratios financiers, scoring ESG PME, matrices investment readiness, due diligence startups, benchmarks sectoriels, valorisations VC.' },
                { step: '03', title: 'Validation & publication', desc: 'Revue Big Four, vérification croisée, anonymisation des données, audit trail ISO 27001, publication multilingue FR/EN/PT.' },
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
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-6" style={{ background: 'rgba(55,142,29,0.15)', border: '1px solid rgba(55,142,29,0.25)' }}>
              <i className="ri-rocket-line text-2xl" style={{ color: '#4a9e5b' }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Accédez au premier observatoire PME & Startups d'Afrique francophone</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto">340 entreprises, 65 startups, 3 indices KOS™, 6 guichets de financement. Contrat institutionnel sur devis.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer transition-all hover:scale-105 text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #2d7518, #378e1d)' }}>
                <i className="ri-mail-send-line" /> Demander un devis
              </button>
              <Link to="/observatoires-sectoriels/" className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer border border-white/30 text-white hover:bg-white/10 transition-all whitespace-nowrap">
                <i className="ri-stack-line" /> Tous les observatoires
              </Link>
              <Link to="/hub-reglementations-nationales/" className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer border border-white/30 text-white hover:bg-white/10 transition-all whitespace-nowrap">
                <i className="ri-government-line" /> Hub Réglementations Nationales
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}