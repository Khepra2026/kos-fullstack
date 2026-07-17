import type { DiagnosticToolConfig } from '../components/types';
import {
  SOLVABILITY_RATIOS,
  getSolvabilityScoreColor,
  getSolvabilityScoreLabel,
  getSolvabilityMaturityLevel,
  getSolvabilityReadiness,
  getSolvabilityRisks,
  getSolvabilityRecommendations,
} from './data';

const FORM_URL = 'https://readdy.ai/api/form/d8uggnlu37m8lq7g358g';

export const solvabilityConfig: DiagnosticToolConfig = {
  toolId: 'simulateur-solvabilite-uemoa',
  toolNameFr: 'Simulateur Solvabilité UEMOA 2026 KHEPRA™',
  toolNameEn: 'UEMOA 2026 Solvency Simulator KHEPRA™',
  toolSubtitleFr: 'Simulez vos 8 ratios prudentiels BCEAO. Obtenez votre écart vs seuils réglementaires, 3 actions correctives et votre score global sur 100.',
  toolSubtitleEn: 'Simulate your 8 BCEAO prudential ratios. Get your gap vs regulatory thresholds, 3 corrective actions and your global score out of 100.',

  seoTitleFr: 'Simulateur Solvabilité UEMOA 2026 | 8 Ratios BCEAO Gratuit',
  seoTitleEn: 'UEMOA 2026 Solvency Simulator | 8 BCEAO Ratios Free',
  seoDescriptionFr: 'Simulez gratuitement votre conformité prudentielle BCEAO : ratio de solvabilité, liquidité, grands risques, créances en souffrance, couverture, levier. Score instantané + actions correctives.',
  seoDescriptionEn: 'Simulate your BCEAO prudential compliance for free: solvency, liquidity, large exposures, NPL, coverage, leverage ratios. Instant score + corrective actions.',
  seoKeywordsFr: 'simulateur solvabilité, ratios prudentiels BCEAO, ratio solvabilité UEMOA, Bâle III, conformité bancaire, fonds propres, créances en souffrance',
  seoKeywordsEn: 'solvency simulator, BCEAO prudential ratios, UEMOA solvency, Basel III, banking compliance, capital adequacy, NPL ratio',
  canonicalPath: '/tools/simulateur-solvabilite-uemoa',

  axes: SOLVABILITY_RATIOS,

  howToNameFr: 'Simulateur Solvabilité UEMOA 2026 KHEPRA™',
  howToNameEn: 'UEMOA 2026 Solvency Simulator KHEPRA™',
  howToDescriptionFr: 'Simulez vos 8 ratios prudentiels BCEAO en répondant à des questions sur votre bilan. Obtenez votre score, votre écart vs seuils réglementaires et 3 actions correctives prioritaires.',
  howToDescriptionEn: 'Simulate your 8 BCEAO prudential ratios by answering questions about your balance sheet. Get your score, gap vs regulatory thresholds and 3 priority corrective actions.',
  howToTotalTime: 'PT5M',
  howToSteps: SOLVABILITY_RATIOS.map(r => ({ name: r.titleFr, text: r.descriptionFr })),

  getScoreColor: getSolvabilityScoreColor,
  getScoreLabel: getSolvabilityScoreLabel,
  getMaturityLevel: getSolvabilityMaturityLevel,
  getReadinessIndicator: getSolvabilityReadiness,

  getRisks: (pa, gs, l) => getSolvabilityRisks(pa, gs, l),
  getRecommendations: (pa, gs, l) => getSolvabilityRecommendations(pa, gs, l),

  getOptionStyle: (value, isSelected) => {
    if (value === 100) return isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-secondary-200 hover:border-emerald-300';
    if (value === 75) return isSelected ? 'border-sky-500 bg-sky-50' : 'border-secondary-200 hover:border-sky-300';
    if (value === 50) return isSelected ? 'border-accent-500 bg-accent-50' : 'border-secondary-200 hover:border-accent-300';
    return isSelected ? 'border-red-500 bg-red-50' : 'border-secondary-200 hover:border-red-300';
  },
  getOptionIcon: (value) => {
    if (value === 100) return 'ri-check-double-line';
    if (value === 75) return 'ri-check-line';
    if (value === 50) return 'ri-subtract-line';
    return 'ri-close-line';
  },
  getOptionColor: (value) => {
    if (value === 100) return 'text-emerald-600';
    if (value === 75) return 'text-sky-600';
    if (value === 50) return 'text-accent-600';
    return 'text-red-600';
  },

  showLeadForm: true,
  formUrl: FORM_URL,

  hashtags: ['SolvabiliteUEMOA', 'BCEAO', 'ConformitePrudentielle', 'SimulateurGratuit'],

  showRadarChart: true,
  renderRadarChart: (size, perAxis, axes, isFr) => {
    const center = size / 2;
    const radius = 95;
    const axisCount = axes.length;
    const angleStep = (2 * Math.PI) / axisCount;
    const startAngle = -Math.PI / 2;

    const getPoint = (idx: number, score: number) => {
      const angle = startAngle + idx * angleStep;
      const r = (score / 100) * radius;
      return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
    };

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
        {[20, 40, 60, 80, 100].map(level => {
          const points = axes.map((_, i) => { const p = getPoint(i, level); return `${p.x},${p.y}`; }).join(' ');
          return <polygon key={level} points={points} fill="none" stroke="#e5e7eb" strokeWidth="1" />;
        })}
        {axes.map((_, i) => { const end = getPoint(i, 100); return <line key={i} x1={center} y1={center} x2={end.x} y2={end.y} stroke="#e5e7eb" strokeWidth="1" />; })}
        {(() => {
          const pts = axes.map((a, i) => getPoint(i, perAxis[a.id] ?? 0));
          const ptsStr = pts.map(p => `${p.x},${p.y}`).join(' ');
          return (
            <>
              <polygon points={ptsStr} fill="rgba(5, 150, 105, 0.12)" stroke="#059669" strokeWidth="2" />
              {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill="#059669" stroke="white" strokeWidth="2" />)}
            </>
          );
        })()}
        {axes.map((a, i) => {
          const lp = getPoint(i, 118);
          const short = (isFr ? a.titleFr : a.titleEn).split(' ').slice(0, 2).join(' ');
          return <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="600" fill="#374151">{short}</text>;
        })}
      </svg>
    );
  },

  badgeIcon: 'ri-bank-line',
  badgeTextFr: '8 ratios prudentiels BCEAO · 14 questions · 5 min',
  badgeTextEn: '8 BCEAO prudential ratios · 14 questions · 5 min',

  expertCTA: {
    titleFr: 'Besoin d\'un audit prudentiel complet BCEAO ?',
    titleEn: 'Need a complete BCEAO prudential audit?',
    descriptionFr: 'Nos experts en régulation bancaire vous accompagnent pour un diagnostic approfondi de votre conformité prudentielle et un plan d\'action sur mesure.',
    descriptionEn: 'Our banking regulation experts support you with an in-depth prudential compliance diagnosis and a tailored action plan.',
    ctaFr: 'Planifier un diagnostic',
    ctaEn: 'Schedule a diagnostic',
    ctaLink: '/contact',
  },
};