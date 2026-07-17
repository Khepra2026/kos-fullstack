import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';
import { CrossSectorHeatmap, type CrossSectorHeatmapSector, type CrossSectorHeatmapDimension } from '@/components/feature/CrossSectorHeatmap';

interface SectorBenchmark {
  id: string;
  name: string;
  icon: string;
  color: string;
  zone: string;
  score: number;
  scoreLabel: string;
  breakdown: { label: string; val: number }[];
  topKpis: { name: string; value: number; unit: string; trend: string; change: string }[];
  indices: { name: string; score: number }[];
  trendGlobal: 'up' | 'down' | 'stable';
  trendChange: string;
}

const SECTORS: SectorBenchmark[] = [
  {
    id: 'banques',
    name: 'Banques & Établissements de Crédit',
    icon: 'ri-bank-line',
    color: '#2d7518',
    zone: 'UEMOA + CEMAC — 15 pays',
    score: 76,
    scoreLabel: 'KOS Banking Sector Score™',
    breakdown: [
      { label: 'Conformité Réglementaire', val: 82 },
      { label: 'Gouvernance', val: 76 },
      { label: 'Risque de Crédit', val: 71 },
      { label: 'Couverture Pays', val: 88 },
      { label: 'Publications', val: 100 },
    ],
    topKpis: [
      { name: 'Banking Compliance', value: 82, unit: '/100', trend: 'up', change: '+4' },
      { name: 'Bank Governance', value: 76, unit: '/100', trend: 'up', change: '+3' },
      { name: 'Credit Risk Barometer', value: 71, unit: '/100', trend: 'down', change: '-2' },
      { name: 'Banques Suivies', value: 52, unit: '', trend: 'up', change: '+8' },
    ],
    indices: [
      { name: 'KOS Banking Compliance Index™', score: 82 },
      { name: 'KOS Bank Governance Score™', score: 76 },
      { name: 'KOS Credit Risk Barometer™', score: 71 },
    ],
    trendGlobal: 'up',
    trendChange: '+3',
  },
  {
    id: 'fintechs',
    name: 'FinTechs & Établissements de Paiement',
    icon: 'ri-smartphone-line',
    color: '#d4a82a',
    zone: 'UEMOA + CEMAC + Diaspora — 12 pays',
    score: 67,
    scoreLabel: 'KOS FinTech Sector Score™',
    breakdown: [
      { label: 'Maturité FinTech', val: 68 },
      { label: 'Open Banking Readiness', val: 54 },
      { label: 'Paiements Digitaux', val: 78 },
      { label: 'Couverture Pays', val: 71 },
      { label: 'Publications', val: 75 },
    ],
    topKpis: [
      { name: 'FinTech Maturity', value: 68, unit: '/100', trend: 'up', change: '+5' },
      { name: 'Open Banking Readiness', value: 54, unit: '/100', trend: 'up', change: '+7' },
      { name: 'Digital Payment Tracker', value: 78, unit: '/100', trend: 'up', change: '+6' },
      { name: 'FinTechs Suivies', value: 34, unit: '', trend: 'up', change: '+11' },
    ],
    indices: [
      { name: 'KOS FinTech Maturity Index™', score: 68 },
      { name: 'KOS Open Banking Readiness™', score: 54 },
      { name: 'KOS Digital Payment Tracker™', score: 78 },
    ],
    trendGlobal: 'up',
    trendChange: '+5',
  },
  {
    id: 'energie',
    name: 'Énergie & Infrastructures',
    icon: 'ri-flashlight-line',
    color: '#5ba832',
    zone: 'UEMOA + CEMAC + CEDEAO — 14 pays',
    score: 73,
    scoreLabel: 'KOS Energy Sector Score™',
    breakdown: [
      { label: 'Viabilité Projets', val: 72 },
      { label: 'Conformité Extractives', val: 84 },
      { label: 'Performance ESG', val: 68 },
      { label: 'Couverture Pays', val: 82 },
      { label: 'Publications', val: 75 },
    ],
    topKpis: [
      { name: 'Project Viability', value: 72, unit: '/100', trend: 'up', change: '+3' },
      { name: 'Extractives Compliance', value: 84, unit: '/100', trend: 'up', change: '+5' },
      { name: 'Infrastructure ESG', value: 68, unit: '/100', trend: 'up', change: '+4' },
      { name: 'PPP Pipeline', value: 47, unit: '', trend: 'up', change: '+12' },
    ],
    indices: [
      { name: 'KOS Energy Project Viability™', score: 72 },
      { name: 'KOS Extractives Compliance™', score: 84 },
      { name: 'KOS Infrastructure ESG Score™', score: 68 },
    ],
    trendGlobal: 'up',
    trendChange: '+4',
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Agro-Industrie',
    icon: 'ri-plant-line',
    color: '#2d7518',
    zone: 'UEMOA + CEMAC + CEDEAO — 10 pays',
    score: 65,
    scoreLabel: 'KOS Agriculture Sector Score™',
    breakdown: [
      { label: 'Chaînes de Valeur', val: 64 },
      { label: 'Risque Climatique', val: 58 },
      { label: 'Conformité Foncière', val: 71 },
      { label: 'Couverture Pays', val: 59 },
      { label: 'Publications', val: 50 },
    ],
    topKpis: [
      { name: 'Agri Value Chain', value: 64, unit: '/100', trend: 'up', change: '+5' },
      { name: 'Climate Risk', value: 58, unit: '/100', trend: 'up', change: '+3' },
      { name: 'Land Compliance', value: 71, unit: '/100', trend: 'up', change: '+4' },
      { name: 'Filières Couvertes', value: 8, unit: '', trend: 'up', change: '+2' },
    ],
    indices: [
      { name: 'KOS Agri Value Chain Index™', score: 64 },
      { name: 'KOS Climate Risk Score™', score: 58 },
      { name: 'KOS Land Compliance Index™', score: 71 },
    ],
    trendGlobal: 'up',
    trendChange: '+3',
  },
  {
    id: 'pme',
    name: 'PME & ETI',
    icon: 'ri-store-2-line',
    color: '#378e1d',
    zone: '17 pays UEMOA/CEMAC',
    score: 62,
    scoreLabel: 'KOS SME Sector Score™',
    breakdown: [
      { label: 'Santé PME', val: 68 },
      { label: 'Investment Readiness', val: 62 },
      { label: 'Maturité ESG', val: 55 },
      { label: 'Couverture Pays', val: 71 },
      { label: 'Publications', val: 75 },
    ],
    topKpis: [
      { name: 'SME Health', value: 68, unit: '/100', trend: 'up', change: '+4' },
      { name: 'Investment Readiness', value: 62, unit: '/100', trend: 'up', change: '+5' },
      { name: 'ESG Maturity', value: 55, unit: '/100', trend: 'up', change: '+6' },
      { name: 'PME Suivies', value: 210, unit: '', trend: 'up', change: '+34' },
    ],
    indices: [
      { name: 'KOS SME Health Index™', score: 68 },
      { name: 'KOS Investment Readiness Score™', score: 62 },
      { name: 'KOS SME ESG Maturity™', score: 55 },
    ],
    trendGlobal: 'up',
    trendChange: '+4',
  },
  {
    id: 'esg',
    name: 'ESG & Développement Durable',
    icon: 'ri-leaf-line',
    color: '#d4a82a',
    zone: 'Panafricain — 54 pays',
    score: 67,
    scoreLabel: 'KOS ESG Sector Score™',
    breakdown: [
      { label: 'Conformité ESG', val: 79 },
      { label: 'Finance Durable', val: 64 },
      { label: 'Supply Chain ESG', val: 58 },
      { label: 'Couverture Pays', val: 100 },
      { label: 'Publications', val: 100 },
    ],
    topKpis: [
      { name: 'ESG Compliance', value: 79, unit: '/100', trend: 'up', change: '+5' },
      { name: 'Green Finance Tracker', value: 64, unit: '/100', trend: 'up', change: '+7' },
      { name: 'Supply Chain ESG', value: 58, unit: '/100', trend: 'up', change: '+4' },
      { name: 'Entités Notées', value: 89, unit: '', trend: 'up', change: '+15' },
    ],
    indices: [
      { name: 'KOS ESG Compliance Score™', score: 79 },
      { name: 'KOS Green Finance Tracker™', score: 64 },
      { name: 'KOS Supply Chain ESG™', score: 58 },
    ],
    trendGlobal: 'up',
    trendChange: '+5',
  },
  {
    id: 'microfinance',
    name: 'Microfinance & Inclusion Financière',
    icon: 'ri-hand-heart-line',
    color: '#378e1d',
    zone: 'UEMOA — 8 pays',
    score: 62,
    scoreLabel: 'KOS Microfinance Sector Score™',
    breakdown: [
      { label: 'Santé Financière SFD', val: 74 },
      { label: 'Inclusion Financière', val: 61 },
      { label: 'Digitalisation', val: 52 },
      { label: 'Couverture Pays', val: 100 },
      { label: 'Publications', val: 100 },
    ],
    topKpis: [
      { name: 'SFD Health', value: 74, unit: '/100', trend: 'up', change: '+6' },
      { name: 'Financial Inclusion', value: 61, unit: '/100', trend: 'up', change: '+5' },
      { name: 'Digital MFI Readiness', value: 52, unit: '/100', trend: 'up', change: '+8' },
      { name: 'SFD Suivis', value: 186, unit: '', trend: 'up', change: '+23' },
    ],
    indices: [
      { name: 'KOS SFD Health Score™', score: 74 },
      { name: 'KOS Financial Inclusion Index™', score: 61 },
      { name: 'KOS Digital MFI Readiness™', score: 52 },
    ],
    trendGlobal: 'up',
    trendChange: '+4',
  },
];

const RANKINGS = [
  { rank: 1, sector: 'Banques', score: 76, color: '#2d7518', icon: 'ri-bank-line' },
  { rank: 2, sector: 'Énergie', score: 73, color: '#5ba832', icon: 'ri-flashlight-line' },
  { rank: 3, sector: 'FinTechs', score: 67, color: '#d4a82a', icon: 'ri-smartphone-line' },
  { rank: 4, sector: 'ESG', score: 67, color: '#d4a82a', icon: 'ri-leaf-line' },
  { rank: 5, sector: 'Agriculture', score: 65, color: '#2d7518', icon: 'ri-plant-line' },
  { rank: 6, sector: 'PME', score: 62, color: '#378e1d', icon: 'ri-store-2-line' },
  { rank: 7, sector: 'Microfinance', score: 62, color: '#378e1d', icon: 'ri-hand-heart-line' },
];

const DIMENSIONS = [
  { key: 'conformite', label: 'Conformité', icon: 'ri-shield-check-line' },
  { key: 'gouvernance', label: 'Gouvernance', icon: 'ri-government-line' },
  { key: 'esg', label: 'ESG', icon: 'ri-leaf-line' },
  { key: 'digital', label: 'Digital', icon: 'ri-smartphone-line' },
  { key: 'couverture', label: 'Couverture', icon: 'ri-global-line' },
];

const QUARTERS = ['T1 2026', 'T2 2026', 'T3 2026', 'T4 2026'];

function applyQuarterFactor(data: typeof SECTORS, quarter: number): typeof SECTORS {
  if (quarter === 1) return data;
  const factors = [0.92, 1.0, 1.05, 1.11];
  const factor = factors[quarter] || 1.0;
  return data.map(s => ({
    ...s,
    score: Math.min(Math.round(s.score * factor), 100),
    breakdown: s.breakdown.map(b => ({ ...b, val: Math.min(Math.round(b.val * factor), 100) })),
    topKpis: s.topKpis.map(k => ({ ...k, value: Math.min(Math.round(k.value * factor), 100) })),
    indices: s.indices.map(i => ({ ...i, score: Math.min(Math.round(i.score * factor), 100) })),
  }));
}

function generateBatchPdfHtml(sectors: SectorBenchmark[], quarter: number): string {
  const dateStr = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  const qLabel = QUARTERS[quarter] || 'T2 2026';
  let html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Rapport Batch 7 Secteurs — ${qLabel} — KOS Authority</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; color: #1a1a1a; background: #fff; padding: 30px 40px; font-size: 10px; line-height: 1.4; }
  .cover { text-align: center; padding: 80px 0 50px; border-bottom: 4px solid #2d7518; margin-bottom: 30px; }
  .cover h1 { font-size: 32px; font-weight: 800; margin-bottom: 6px; }
  .cover .subtitle { font-size: 14px; color: #555; }
  .cover .date { font-size: 12px; color: #888; margin-top: 10px; }
  .cover .badges { display: flex; justify-content: center; gap: 8px; margin-top: 15px; flex-wrap: wrap; }
  .cover .badge { padding: 4px 14px; border-radius: 20px; font-size: 10px; font-weight: 700; color: #fff; background: #2d7518; }
  .toc { margin-bottom: 30px; page-break-after: always; }
  .toc h2 { font-size: 16px; margin-bottom: 10px; color: #2d7518; }
  .toc ol { padding-left: 20px; }
  .toc li { font-size: 12px; padding: 4px 0; color: #444; }
  .sector-page { page-break-before: always; margin-bottom: 20px; }
  .sector-header { border-bottom: 2px solid #ccc; padding-bottom: 8px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; }
  .sector-header h2 { font-size: 18px; font-weight: 800; }
  .score-box { text-align: center; padding: 12px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 10px; }
  .score-box .big { font-size: 36px; font-weight: 800; }
  .score-box .label { font-size: 10px; color: #666; }
  .breakdown { display: flex; gap: 6px; margin-bottom: 10px; flex-wrap: wrap; }
  .breakdown-item { flex: 1; min-width: 120px; padding: 6px 8px; background: #f8f8f8; border-radius: 6px; }
  .breakdown-item .bl { font-size: 8px; color: #666; }
  .breakdown-item .bar { height: 4px; background: #eee; border-radius: 2px; overflow: hidden; margin: 3px 0; }
  .breakdown-item .bar-inner { height: 100%; border-radius: 2px; }
  .breakdown-item .bv { font-size: 10px; font-weight: 700; }
  .kpi-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 6px; margin-bottom: 10px; }
  .kpi-card { padding: 8px; border: 1px solid #e5e5e5; border-radius: 6px; }
  .kpi-card .kn { font-size: 8px; color: #666; }
  .kpi-card .kv { font-size: 16px; font-weight: 800; }
  .kpi-card .kt { font-size: 8px; color: #999; }
  .footer { margin-top: 20px; padding-top: 12px; border-top: 1px solid #eee; text-align: center; font-size: 8px; color: #999; }
  @media print { body { padding: 15px 25px; } }
</style>
</head>
<body>
<div class="cover">
  <h1>KOS Authority — Benchmark 7 Secteurs</h1>
  <div class="subtitle">Rapport Trimestriel Big Four — ${qLabel}</div>
  <div class="date">Généré le ${dateStr} — Classification : Usage Interne</div>
  <div class="badges">
    <span class="badge">UEMOA + CEMAC</span>
    <span class="badge">ISA 315/330</span>
    <span class="badge">ISO 27001</span>
    <span class="badge">IFRS</span>
  </div>
</div>
<div class="toc">
  <h2>Sommaire</h2>
  <ol>`;
  sectors.forEach(s => { html += `<li>${s.name} — Score ${s.score}/100</li>`; });
  html += `</ol></div>`;
  sectors.forEach(s => {
    html += `<div class="sector-page">
  <div class="sector-header"><i class="${s.icon}" style="font-size:18px;color:${s.color}"></i><h2 style="color:${s.color}">${s.name}</h2></div>
  <div class="score-box"><div class="big" style="color:${s.color}">${s.score}</div><div class="label">/100 — ${s.scoreLabel} | ${s.zone}</div></div>
  <div class="breakdown">${s.breakdown.map(b => `<div class="breakdown-item"><div class="bl">${b.label}</div><div class="bar"><div class="bar-inner" style="width:${b.val}%;background:${b.val>=80?'#059669':b.val>=60?'#d97706':'#dc2626'}"></div></div><div class="bv">${b.val}/100</div></div>`).join('')}</div>
  <div class="kpi-grid">${s.topKpis.map(k => `<div class="kpi-card"><div class="kn">${k.name}</div><div class="kv" style="color:${s.color}">${k.value}${k.unit}</div><div class="kt">${k.trend==='up'?'+'+k.change:k.change}</div></div>`).join('')}</div></div>`;
  });
  html += `<div class="footer"><strong>KOS Authority — Observatoires Sectoriels Afrique Francophone</strong><br>Rapport batch généré automatiquement — ${qLabel} — Méthodologie Standards ISA 315/330, IFRS, ISO/IEC 27001:2022.</div></body></html>`;
  return html;
}

export default function ComparatifSectorielPage() {
  const navigate = useNavigate();
  const [selectedQuarter, setSelectedQuarter] = useState(1);

  const quarterlySectors = applyQuarterFactor(SECTORS, selectedQuarter);
  const quarterLabel = QUARTERS[selectedQuarter] || 'T2 2026';

  const maxScore = Math.max(...quarterlySectors.map(s => s.score));
  const avgScore = Math.round(quarterlySectors.reduce((sum, sec) => sum + sec.score, 0) / quarterlySectors.length);

  const quarterlyRankings = [...RANKINGS].map(r => {
    const sectorData = quarterlySectors.find(s => s.id === (r.sector === 'Banques' ? 'banques' : r.sector === 'FinTechs' ? 'fintechs' : r.sector === 'Énergie' ? 'energie' : r.sector === 'ESG' ? 'esg' : r.sector === 'Agriculture' ? 'agriculture' : r.sector === 'PME' ? 'pme' : 'microfinance'));
    return { ...r, score: sectorData?.score ?? r.score };
  }).sort((a, b) => b.score - a.score).map((r, i) => ({ ...r, rank: i + 1 }));

  const handleBatchExport = useCallback(() => {
    const html = generateBatchPdfHtml(quarterlySectors, selectedQuarter);
    const w = window.open('', '_blank', 'width=1000,height=800');
    if (!w) return;
    w.document.write(html);
    w.document.close();
    w.onload = () => { setTimeout(() => w.print(), 500); };
  }, [quarterlySectors, selectedQuarter]);

  const heatmapDimensions: CrossSectorHeatmapDimension[] = DIMENSIONS;
  const heatmapSectors: CrossSectorHeatmapSector[] = quarterlySectors.map(s => ({
    id: s.id,
    name: s.name,
    icon: s.icon,
    color: s.color,
    score: s.score,
    breakdown: s.breakdown,
  }));

  return (
    <>
      <SeoHead
        title="Benchmark Comparatif 7 Secteurs — Scores, KPIs, Tendances — KOS Observatoires Sectoriels"
        description="Tableau croisé comparatif des 7 observatoires sectoriels KOS : Banques, FinTechs, Énergie, Agriculture, PME, ESG, Microfinance. Scores globaux, KPIs par secteur, tendances trimestrielles, classement Big Four. Benchmark UEMOA/CEMAC."
        keywords="comparatif secteurs Afrique, benchmark sectoriel UEMOA, scores KOS, KPIs banques fintechs PME, tendances trimestrielles Afrique, KOS Big Four benchmark"
        canonicalPath="/observatoires-sectoriels/comparatif/"
        ogType="website"
      />
      <div className="min-h-screen bg-background-50">
        <Navigation />

        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdfaf5 0%, #f7f3ec 40%, #faf7f1 100%)' }}>
          <div className="absolute inset-0 opacity-25">
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(45,117,24,0.10), transparent)' }} />
            <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,168,42,0.08), transparent)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-5">
              <BigFourSubtitleBar label="KOS Authority — Benchmark Global" variant="centered-pillars" icon="ri-bar-chart-grouped-line" accentColor="primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground-950 mb-6 text-center leading-tight">
              Comparatif{' '}
              <span style={{ color: '#2d7518' }}>7 Secteurs</span>
            </h1>
            <p className="text-xl text-foreground-600 mb-3 max-w-3xl mx-auto text-center leading-relaxed">
              Tableau croisé des scores, KPIs, tendances et indices KOS™ pour les 7 observatoires sectoriels. La vue synthétique pour toute décision d'investissement ou de conformité. <strong className="text-foreground-900">Mis à jour {quarterLabel}.</strong>
            </p>
            <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: '#2d7518' }}>Score moyen : {avgScore}/100</span>
              <span className="px-4 py-1.5 rounded-full text-xs font-bold" style={{ color: '#2d7518', background: 'rgba(45,117,24,0.1)' }}>7 secteurs</span>
              <span className="px-4 py-1.5 rounded-full text-xs font-bold" style={{ color: '#2d7518', background: 'rgba(45,117,24,0.1)' }}>21 indices KOS™</span>
              <span className="px-4 py-1.5 rounded-full text-xs font-bold" style={{ color: '#2d7518', background: 'rgba(45,117,24,0.1)' }}>{quarterLabel}</span>
            </div>
            {/* ── Quarter Selector ── */}
            <div className="flex items-center justify-center mt-6">
              <div className="flex items-center gap-1.5 bg-white border border-background-200/70 rounded-full p-1 shadow-sm">
                <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-widest px-3 flex items-center gap-1.5">
                  <i className="ri-calendar-check-line text-xs" /> Période
                </span>
                {QUARTERS.map((q, i) => (
                  <button
                    key={q}
                    onClick={() => setSelectedQuarter(i)}
                    className={`text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                      selectedQuarter === i
                        ? 'text-white shadow-sm'
                        : 'text-foreground-500 hover:bg-background-100'
                    }`}
                    style={selectedQuarter === i ? { background: 'linear-gradient(135deg, #2d7518, #4a9e5b)' } : {}}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Classement */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <BigFourSubtitleBar label="Classement Global — Score Big Four par Secteur" variant="left-accent" icon="ri-trophy-line" accentColor="primary" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {quarterlyRankings.map((r) => (
              <div
                key={r.sector}
                className="bg-white rounded-xl p-5 border border-background-200 text-center cursor-pointer hover:border-foreground-300 transition-all group"
                onClick={() => navigate(`/observatoires-sectoriels/${r.sector === 'Banques' ? 'banques' : r.sector === 'FinTechs' ? 'fintechs' : r.sector === 'Énergie' ? 'energie' : r.sector === 'ESG' ? 'esg' : r.sector === 'Agriculture' ? 'agriculture' : r.sector === 'PME' ? 'pme' : 'microfinance'}/`)}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full mx-auto mb-3 text-white font-bold text-sm" style={{ background: r.color }}>
                  {r.rank}
                </div>
                <i className={`${r.icon} text-2xl mb-2 block`} style={{ color: r.color }} />
                <div className="text-sm font-bold text-foreground-950 mb-1 leading-tight">{r.sector}</div>
                <div className="text-2xl font-bold" style={{ color: r.color }}>{r.score}</div>
                <div className="text-[10px] text-foreground-500">/100</div>
              </div>
            ))}
          </div>
        </section>

        {/* Tableau croisé : Scores */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="mb-8">
            <BigFourSubtitleBar label="Tableau Croisé — Scores & KPIs" variant="left-accent" icon="ri-table-line" accentColor="accent" />
          </div>
          <div className="bg-white rounded-xl border border-background-200 overflow-x-auto">
            <div className="min-w-[1024px]">
              {/* Header row */}
              <div className="grid grid-cols-[180px_repeat(7,1fr)] border-b border-background-200 bg-background-100">
                <div className="px-4 py-3 text-xs font-bold text-foreground-500 uppercase tracking-wider">Indicateur</div>
                {quarterlySectors.map(s => (
                  <div key={s.id} className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-0.5">
                      <i className={`${s.icon} text-xs`} style={{ color: s.color }} />
                      <span className="text-[10px] font-bold text-foreground-700 whitespace-nowrap">{s.name}</span>
                    </div>
                    <div className="text-2xl font-bold" style={{ color: s.color }}>{s.score}</div>
                    <div className="text-[10px] text-foreground-400">/100</div>
                  </div>
                ))}
              </div>

              {/* Trend row */}
              <div className="grid grid-cols-[180px_repeat(7,1fr)] border-b border-background-100">
                <div className="px-4 py-2.5 text-xs font-bold text-foreground-500">Tendance {quarterLabel}</div>
                {quarterlySectors.map(s => (
                  <div key={s.id} className="px-4 py-2.5 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      s.trendGlobal === 'up'
                        ? 'text-emerald-600 bg-emerald-50'
                        : s.trendGlobal === 'down'
                          ? 'text-red-600 bg-red-50'
                          : 'text-foreground-600 bg-foreground-100'
                    }`}>
                      <i className={s.trendGlobal === 'up' ? 'ri-arrow-up-line' : s.trendGlobal === 'down' ? 'ri-arrow-down-line' : 'ri-arrow-right-line'} />
                      {s.trendChange}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown rows */}
              {DIMENSIONS.map(dim => {
                const dimIdx = DIMENSIONS.findIndex(d => d.key === dim.key);
                return (
                  <div key={dim.key} className="grid grid-cols-[180px_repeat(7,1fr)] border-b border-background-100">
                    <div className="px-4 py-2.5 text-xs font-bold text-foreground-500 flex items-center gap-1.5">
                      <i className={`${dim.icon} text-xs`} style={{ color: '#2d7518' }} />
                      {dim.label}
                    </div>
                    {quarterlySectors.map(s => {
                      const b = s.breakdown[dimIdx];
                      const val = b?.val ?? 0;
                      const barColor = val >= 80 ? '#059669' : val >= 60 ? '#d97706' : '#dc2626';
                      return (
                        <div key={s.id} className="px-4 py-2.5 text-center">
                          <div className="flex items-center gap-2 justify-center">
                            <div className="flex-1 max-w-24 h-1.5 bg-background-200 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${val}%`, background: barColor }} />
                            </div>
                            <span className="text-xs font-bold text-foreground-700 w-6 text-right">{val}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {/* Zone row */}
              <div className="grid grid-cols-[180px_repeat(7,1fr)] border-b border-background-100">
                <div className="px-4 py-2.5 text-xs font-bold text-foreground-500 flex items-center gap-1.5">
                  <i className="ri-global-line text-xs" style={{ color: '#2d7518' }} /> Zone
                </div>
                {quarterlySectors.map(s => (
                  <div key={s.id} className="px-4 py-2.5 text-center">
                    <span className="text-[10px] text-foreground-600">{s.zone}</span>
                  </div>
                ))}
              </div>

              {/* Top KPI row */}
              <div className="grid grid-cols-[180px_repeat(7,1fr)] border-b border-background-200 bg-background-50">
                <div className="px-4 py-2.5 text-xs font-bold text-foreground-500">Top KPI #1</div>
                {quarterlySectors.map(s => (
                  <div key={s.id} className="px-4 py-2.5 text-center">
                    <div className="text-xs font-bold text-foreground-800">{s.topKpis[0].name}</div>
                    <div className="flex items-center justify-center gap-1.5 mt-0.5">
                      <span className="text-sm font-bold" style={{ color: s.color }}>{s.topKpis[0].value}{s.topKpis[0].unit}</span>
                      <span className={`text-[9px] font-bold ${s.topKpis[0].trend === 'up' ? 'text-emerald-600' : s.topKpis[0].trend === 'down' ? 'text-red-600' : 'text-foreground-500'}`}>
                        {s.topKpis[0].change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Indices KOS™ row */}
              <div className="grid grid-cols-[180px_repeat(7,1fr)]">
                <div className="px-4 py-2.5 text-xs font-bold text-foreground-500">Indices KOS™</div>
                {quarterlySectors.map(s => (
                  <div key={s.id} className="px-4 py-2.5 text-center">
                    <div className="flex flex-wrap justify-center gap-1">
                      {s.indices.map(idx => (
                        <span key={idx.name} className="px-1.5 py-0.5 rounded text-[8px] font-bold" style={{ background: `${s.color}15`, color: s.color }}>
                          {idx.score}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Matrice détaillée KPIs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="mb-8">
            <BigFourSubtitleBar label="Matrice KPIs — Top 4 par Secteur" variant="left-accent" icon="ri-bar-chart-box-line" accentColor="primary" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {quarterlySectors.map(s => (
              <div
                key={s.id}
                className="bg-white rounded-xl border border-background-200 overflow-hidden cursor-pointer hover:shadow-md transition-all group"
                onClick={() => navigate(`/observatoires-sectoriels/${s.id}/`)}
              >
                <div className="px-5 py-3 border-b border-background-100 flex items-center gap-3" style={{ background: `${s.color}08` }}>
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: `${s.color}18` }}>
                    <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-foreground-950 leading-tight">{s.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-lg font-bold" style={{ color: s.color }}>{s.score}</span>
                      <span className="text-[10px] text-foreground-400">/100</span>
                      <span className={`inline-flex items-center gap-0.5 text-[9px] font-bold ml-1 ${s.trendGlobal === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                        <i className={s.trendGlobal === 'up' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} />
                        {s.trendChange}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-3 space-y-2">
                  {s.topKpis.map((kpi, ki) => (
                    <div key={ki} className="flex items-center justify-between">
                      <span className="text-[11px] text-foreground-600">{kpi.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-foreground-900">{kpi.value}{kpi.unit}</span>
                        <span className={`text-[9px] font-bold ${kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-foreground-500'}`}>
                          {kpi.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-2 border-t border-background-100 text-right">
                  <span className="text-[10px] font-bold flex items-center justify-end gap-1 group-hover:opacity-80 transition-opacity" style={{ color: s.color }}>
                    Dashboard détaillé <i className="ri-arrow-right-line text-xs" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Radar synthétique — Heatmap visuelle */}
        <CrossSectorHeatmap
          sectors={heatmapSectors}
          dimensions={heatmapDimensions}
          quarter={selectedQuarter}
        />

        {/* Méthodologie */}
        <section className="py-16 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="Méthodologie Big Four" variant="left-accent" icon="ri-scales-3-line" accentColor="accent" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground-950 mb-3">Standards ISA/IFRS — ISO 27001</h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">Le benchmark comparatif applique les méthodologies d'audit Big Four, les normes IFRS et les standards de gouvernance des données ISO/IEC 27001:2022.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {[
                { title: 'Collecte & Normalisation', icon: 'ri-database-2-line', desc: 'Données harmonisées des 7 observatoires sectoriels, étalonnées sur une échelle 0-100. Validation croisée ISA 315/330, sources réglementaires BCEAO/COBAC.' },
                { title: 'Analyse Comparative', icon: 'ri-bar-chart-box-line', desc: 'Scoring Big Four multi-dimensions : conformité, gouvernance, ESG, digital, couverture. Pondération uniforme par secteur pour comparabilité équitable.' },
                { title: 'Publication & Diffusion', icon: 'ri-send-plane-line', desc: 'Mise à jour trimestrielle, publication multilingue FR/EN/PT, SEO optimisé, diffusion LinkedIn/YouTube/TikTok, citations académiques, backlinks institutionnels.' },
              ].map((m, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-background-200 text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl mx-auto mb-4" style={{ background: 'rgba(212,168,42,0.1)', border: '1px solid rgba(212,168,42,0.2)' }}>
                    <i className={`${m.icon} text-lg`} style={{ color: '#d4a82a' }} />
                  </div>
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
              <i className="ri-bar-chart-grouped-line text-2xl" style={{ color: '#4a9e5b' }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Accédez au benchmark complet des 7 secteurs</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto">Rapport détaillé 40 pages, matrices de risques, projections T3-T4 2026. Contrat institutionnel sur devis — nos experts vous accompagnent.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer transition-all hover:scale-105 text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #2d7518, #4a9e5b)' }}>
                <i className="ri-mail-send-line" /> Demander un devis
              </button>
              <button onClick={handleBatchExport} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer border border-white/30 text-white hover:bg-white/10 transition-all whitespace-nowrap">
                <i className="ri-file-pdf-2-line" /> Exporter les 7 rapports ({quarterLabel})
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