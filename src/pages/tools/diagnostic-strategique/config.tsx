import type { DiagnosticToolConfig } from '../components/types';
import {
  STRATEGIC_AXES,
  getScoreColor,
  getScoreLabel,
  getMaturityLevel,
  getReadinessIndicator,
  getRecommendations,
  getRisks,
} from './data';

const FORM_URL = 'https://readdy.ai/api/form/d8m5jng80ubi47thlocg';

export const strategicConfig: DiagnosticToolConfig = {
  toolId: 'diagnostic-strategique',
  toolNameFr: 'Diagnostic Stratégique',
  toolNameEn: 'Strategic Diagnostic',
  toolSubtitleFr:
    'Vision & Direction, Positionnement & Marché, Modèle Économique. Obtenez un score sur 100 et un plan d\'action personnalisé.',
  toolSubtitleEn:
    'Vision & Direction, Market Positioning, Business Model. Get a score out of 100 and a personalized action plan.',

  seoTitleFr: 'Diagnostic Stratégique Gratuit | KHEPRA EXPERTS',
  seoTitleEn: 'Free Strategic Diagnostic | KHEPRA EXPERTS',
  seoDescriptionFr:
    'Évaluez gratuitement la maturité stratégique de votre organisation : vision, marché, modèle économique. Score instantané, graphique radar, rapport PDF téléchargeable.',
  seoDescriptionEn:
    'Assess your organization\'s strategic maturity for free: vision, market, business model. Instant score, radar chart, downloadable PDF report.',
  seoKeywordsFr:
    'diagnostic stratégique, maturité stratégique, évaluation stratégie, conseil stratégique Afrique, vision entreprise, modèle économique, croissance PME',
  seoKeywordsEn:
    'strategic diagnostic, strategic maturity, strategy assessment, Africa strategic consulting, business vision, business model, SME growth',
  canonicalPath: '/tools/diagnostic-strategique',

  axes: STRATEGIC_AXES,

  howToNameFr: 'Diagnostic Stratégique KHEPRA™',
  howToNameEn: 'Strategic Diagnostic KHEPRA™',
  howToDescriptionFr:
    'Évaluez la maturité stratégique de votre organisation en 15 questions sur 3 axes : Vision & Direction, Positionnement & Marché, Modèle Économique. Score instantané sur 100, graphique radar et rapport PDF.',
  howToDescriptionEn:
    'Assess your organization\'s strategic maturity in 15 questions across 3 axes: Vision & Direction, Market Positioning, Business Model. Instant score out of 100, radar chart and PDF report.',
  howToTotalTime: '5M',
  howToSteps: [
    {
      name: 'Vision & Direction Stratégique',
      text: 'Évaluez la clarté de votre vision, votre plan stratégique, vos objectifs SMART et votre culture d\'innovation.',
    },
    {
      name: 'Positionnement & Marché',
      text: 'Analysez votre connaissance clients, avantage concurrentiel, veille sectorielle et stratégie de croissance.',
    },
    {
      name: 'Modèle Économique & Performance',
      text: 'Examinez la viabilité financière, la diversification des revenus, la rentabilité et la structure des coûts.',
    },
  ],

  getScoreColor,
  getScoreLabel,
  getMaturityLevel,
  getReadinessIndicator,

  getRisks: (_, globalScore, lang) => getRisks(globalScore, lang),
  getRecommendations: (perAxis, globalScore, lang) => getRecommendations(perAxis, globalScore, lang),

  getOptionStyle: (value, isSelected) => {
    if (value === 100) return isSelected ? 'border-primary-500 bg-primary-50' : 'border-secondary-200 hover:border-primary-300';
    if (value === 50) return isSelected ? 'border-accent-500 bg-accent-50' : 'border-secondary-200 hover:border-accent-300';
    if (value === 0) return isSelected ? 'border-red-500 bg-red-50' : 'border-secondary-200 hover:border-red-300';
    return isSelected ? 'border-secondary-500 bg-background-100' : 'border-secondary-200 hover:border-secondary-300';
  },
  getOptionIcon: (value) => {
    if (value === 100) return 'ri-check-double-line';
    if (value === 50) return 'ri-check-line';
    if (value === 0) return 'ri-close-line';
    return 'ri-subtract-line';
  },
  getOptionColor: (value) => {
    if (value === 100) return 'text-primary-600';
    if (value === 50) return 'text-accent-600';
    if (value === 0) return 'text-red-600';
    return 'text-foreground-500';
  },

  showLeadForm: true,
  formUrl: FORM_URL,

  hashtags: ['DiagnosticStrategique', 'MaturiteStrategique', 'ConseilStrategique'],

  showRadarChart: true,
  renderRadarChart: (size, perAxis, axes) => {
    const center = size / 2;
    const radius = 100;
    const axisCount = axes.length;
    const angleStep = (2 * Math.PI) / axisCount;
    const startAngle = -Math.PI / 2;

    const getPoint = (idx: number, score: number) => {
      const angle = startAngle + idx * angleStep;
      const r = (score / 100) * radius;
      return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
    };

    const gridLevels = [20, 40, 60, 80, 100];

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
        {gridLevels.map((level) => {
          const points = axes.map((_, i) => {
            const p = getPoint(i, level);
            return `${p.x},${p.y}`;
          }).join(' ');
          return <polygon key={level} points={points} fill="none" stroke="#e5e7eb" strokeWidth="1" />;
        })}
        {axes.map((_, i) => {
          const end = getPoint(i, 100);
          return <line key={i} x1={center} y1={center} x2={end.x} y2={end.y} stroke="#e5e7eb" strokeWidth="1" />;
        })}
        {(() => {
          const dataPoints = axes.map((axis, i) => getPoint(i, perAxis[axis.id] ?? 0));
          const pointsStr = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');
          return (
            <>
              <polygon points={pointsStr} fill="rgba(15, 118, 110, 0.15)" stroke="#0f766e" strokeWidth="2" />
              {dataPoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="5" fill="#0f766e" stroke="white" strokeWidth="2" />)}
            </>
          );
        })()}
        {axes.map((axis, i) => {
          const labelPos = getPoint(i, 118);
          const shortLabel = axis.titleFr.split(' ').slice(0, 2).join(' ');
          return (
            <text key={i} x={labelPos.x} y={labelPos.y} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="600" fill="#374151">
              {shortLabel}
            </text>
          );
        })}
      </svg>
    );
  },

  badgeIcon: 'ri-compass-3-line',
  badgeTextFr: 'Diagnostic en 3 axes · 15 questions · 5 min',
  badgeTextEn: '3-axis diagnostic · 15 questions · 5 min',

  expertCTA: {
    titleFr: 'Besoin d\'un accompagnement stratégique ?',
    titleEn: 'Need strategic support?',
    descriptionFr:
      'Nos consultants stratégiques vous accompagnent dans la définition de votre vision, l\'analyse de marché et la construction d\'un plan de croissance durable.',
    descriptionEn:
      'Our strategic consultants support you in defining your vision, market analysis and building a sustainable growth plan.',
    ctaFr: 'Planifier un rendez-vous',
    ctaEn: 'Schedule a meeting',
    ctaLink: '/contact',
  },
};