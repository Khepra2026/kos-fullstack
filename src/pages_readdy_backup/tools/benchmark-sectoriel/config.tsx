import type { DiagnosticToolConfig } from '';
import { BENCHMARK_SECTORIEL_AXES, getBenchmarkSectorielScoreColor, getBenchmarkSectorielScoreLabel, getBenchmarkSectorielLevel, getBenchmarkSectorielReadiness, getBenchmarkSectorielRisks, getBenchmarkSectorielRecommendations } from '';

const FORM_URL = 'https://readdy.ai/api/form/d8pg05fij7vns5otj9hg';
const PRIMARY = '#0f766e';

export const benchmarkSectorielConfig: DiagnosticToolConfig = {
  toolId: 'benchmark-sectoriel',
  toolNameFr: 'Benchmark Sectoriel KHEPRA™',
  toolNameEn: 'Sector Benchmark KHEPRA™',
  toolSubtitleFr: 'Comparez votre performance à celle de votre secteur sur 4 axes : finances, marché, opérations et innovation.',
  toolSubtitleEn: 'Compare your performance to your sector across 4 axes: finance, market, operations and innovation.',

  seoTitleFr: 'Benchmark Sectoriel Gratuit | KHEPRA EXPERTS',
  seoTitleEn: 'Free Sector Benchmark | KHEPRA EXPERTS',
  seoDescriptionFr: 'Comparez votre performance financière, positionnement marché, efficacité opérationnelle et innovation à votre secteur. Rapport avec écarts et recommandations.',
  seoDescriptionEn: 'Compare your financial performance, market positioning, operational efficiency and innovation to your sector. Report with gaps and recommendations.',
  seoKeywordsFr: 'benchmark sectoriel, performance financière, positionnement marché, analyse concurrentielle, compétitivité, Afrique',
  seoKeywordsEn: 'sector benchmark, financial performance, market positioning, competitive analysis, competitiveness, Africa',
  canonicalPath: '/tools/benchmark-sectoriel',

  axes: BENCHMARK_SECTORIEL_AXES,

  howToNameFr: 'Benchmark Sectoriel KHEPRA™',
  howToNameEn: 'Sector Benchmark KHEPRA™',
  howToDescriptionFr: 'Comparez votre organisation aux standards de votre secteur sur 4 axes : performance financière, positionnement marché, efficacité opérationnelle, innovation.',
  howToDescriptionEn: 'Compare your organization to sector standards across 4 axes: financial performance, market positioning, operational efficiency, innovation.',
  howToTotalTime: '8M',
  howToSteps: BENCHMARK_SECTORIEL_AXES.map((a) => ({ name: a.titleFr, text: a.descriptionFr })),

  getScoreColor: getBenchmarkSectorielScoreColor,
  getScoreLabel: getBenchmarkSectorielScoreLabel,
  getMaturityLevel: getBenchmarkSectorielLevel,
  getReadinessIndicator: getBenchmarkSectorielReadiness,

  getRisks: (perAxis, globalScore, lang) => getBenchmarkSectorielRisks(perAxis, globalScore, lang),
  getRecommendations: (perAxis, globalScore, lang) => getBenchmarkSectorielRecommendations(perAxis, globalScore, lang),

  getOptionStyle: (value, isSelected) => {
    if (value === 100) return isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-secondary-200 hover:border-emerald-300';
    if (value === 60) return isSelected ? 'border-sky-500 bg-sky-50' : 'border-secondary-200 hover:border-sky-300';
    if (value === 25) return isSelected ? 'border-accent-500 bg-accent-50' : 'border-secondary-200 hover:border-accent-300';
    if (value === 0) return isSelected ? 'border-red-500 bg-red-50' : 'border-secondary-200 hover:border-red-300';
    return isSelected ? 'border-secondary-500 bg-background-100' : 'border-secondary-200 hover:border-secondary-300';
  },
  getOptionIcon: (value) => { if (value === 100) return 'ri-check-double-line'; if (value === 60) return 'ri-check-line'; if (value === 25) return 'ri-subtract-line'; return 'ri-close-line'; },
  getOptionColor: (value) => { if (value === 100) return 'text-emerald-600'; if (value === 60) return 'text-sky-600'; if (value === 25) return 'text-accent-600'; return 'text-red-600'; },

  showLeadForm: true,
  formUrl: FORM_URL,

  hashtags: ['Benchmark', 'PerformanceFinanciere', 'Strategie', 'Competitivite'],
  showRadarChart: true,
  renderRadarChart: (size, perAxis, axes, isFr) => {
    const center = size / 2; const radius = 100; const axisCount = axes.length; const angleStep = (2 * Math.PI) / axisCount; const startAngle = -Math.PI / 2;
    const getPoint = (idx: number, score: number) => { const angle = startAngle + idx * angleStep; const r = (score / 100) * radius; return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) }; };
    return (<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">{[20,40,60,80,100].map((level) => { const points = axes.map((_,i) => { const p=getPoint(i,level); return `${p.x},${p.y}`; }).join(' '); return <polygon key={level} points={points} fill="none" stroke="#e5e7eb" strokeWidth="1" />; })}{axes.map((_,i) => { const end=getPoint(i,100); return <line key={i} x1={center} y1={center} x2={end.x} y2={end.y} stroke="#e5e7eb" strokeWidth="1" />; })}{(()=>{ const dataPoints=axes.map((axis,i)=>getPoint(i,perAxis[axis.id]??0)); const pointsStr=dataPoints.map((p)=>`${p.x},${p.y}`).join(' '); return (<><polygon points={pointsStr} fill="rgba(15,118,110,0.15)" stroke={PRIMARY} strokeWidth="2" />{dataPoints.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="5" fill={PRIMARY} stroke="white" strokeWidth="2" />)}</>); })()}{axes.map((axis,i)=>{ const lp=getPoint(i,125); const words=(isFr?axis.titleFr:axis.titleEn).split(' '); const label=words.length>2?words.slice(0,2).join(' '):words.join(' '); return <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="600" fill="#374151">{label}</text>; })}</svg>);
  },

  badgeIcon: 'ri-bar-chart-grouped-line',
  badgeTextFr: '4 axes · 14 questions · 8 min',
  badgeTextEn: '4 axes · 14 questions · 8 min',
  expertCTA: { titleFr: 'Besoin d\'une analyse concurrentielle approfondie ?', titleEn: 'Need an in-depth competitive analysis?', descriptionFr: 'Nos experts réalisent des benchmarks sectoriels complets avec analyse des écarts et plan d\'action.', descriptionEn: 'Our experts produce complete sector benchmarks with gap analysis and action plan.', ctaFr: 'Planifier un rendez-vous', ctaEn: 'Schedule a meeting', ctaLink: '/contact' },
};



