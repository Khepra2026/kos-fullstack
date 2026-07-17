import type { DiagnosticToolConfig } from '../components/types';
import {
  RH_PILLARS,
  getScoreColor,
  getScoreLabel,
  getMaturityLevel,
  getReadinessIndicator,
  getBenchmarkPosition,
  getRisks,
  getRecommendations,
  getUltraClosingMessage,
  saveBaseline,
  getBaseline,
  getDeltaLabel,
  getDeltaColor,
  getDeltaIcon,
} from './data';

const FORM_URL = 'https://readdy.ai/api/form/d8m5qva1heuq7aefig7g';

export const rhStrategiqueConfig: DiagnosticToolConfig = {
  toolId: 'diagnostic-rh-strategique',
  toolNameFr: 'Diagnostic RH Stratégique KHEPRA™',
  toolNameEn: 'Strategic HR Diagnostic KHEPRA™',
  toolSubtitleFr:
    'Capital Humain & Alignement Stratégique, Pilotage Social, Culture. Score sur 100. Benchmarking marché africain.',
  toolSubtitleEn:
    'Human Capital & Strategic Alignment, HR Analytics, Culture. Score out of 100. African market benchmarking.',

  seoTitleFr: 'Diagnostic RH Stratégique Gratuit | KHEPRA EXPERTS',
  seoTitleEn: 'Free Strategic HR Diagnostic | KHEPRA EXPERTS',
  seoDescriptionFr:
    'Évaluez gratuitement la maturité RH de votre organisation : gouvernance, recrutement, performance, compétences, administration et climat social. Score sur 100 avec benchmarking.',
  seoDescriptionEn:
    'Free HR maturity assessment: governance, recruitment, performance, skills, administration and social climate. Score out of 100 with benchmarking.',
  seoKeywordsFr:
    'diagnostic RH, ressources humaines Afrique, maturité RH, gestion talents, audit RH, climat social, recrutement, formation',
  seoKeywordsEn:
    'HR diagnostic, human resources Africa, HR maturity, talent management, HR audit, social climate, recruitment, training',
  canonicalPath: '/tools/diagnostic-rh-strategique',

  axes: RH_PILLARS.map((p) => ({ ...p, weight: p.weight })),

  howToNameFr: 'Diagnostic RH Stratégique KHEPRA™',
  howToNameEn: 'Strategic HR Diagnostic KHEPRA™',
  howToDescriptionFr:
    'Évaluez votre maturité RH en 18 questions sur 6 piliers : gouvernance, recrutement, performance, compétences, administration et climat social. Score sur 100, benchmarking marché africain, recommandations.',
  howToDescriptionEn:
    'Assess your HR maturity in 18 questions across 6 pillars: governance, recruitment, performance, skills, administration and social climate. Score out of 100, African market benchmarking, recommendations.',
  howToTotalTime: '6M',
  howToSteps: [
    { name: 'Gouvernance RH', text: 'Politique RH, alignement stratégique et rôle de la direction.' },
    { name: 'Recrutement & Attractivité', text: 'Processus de recrutement structuré, marque employeur et qualité des profils.' },
    { name: 'Gestion des Performances', text: 'Objectifs clairs, système d\'évaluation et suivi des KPIs RH.' },
    { name: 'Développement des Compétences', text: 'Formation, plans de carrière et gestion des talents.' },
    { name: 'Administration RH', text: 'Contrats, conformité légale et gestion de la paie.' },
    { name: 'Climat Social & Engagement', text: 'Motivation, turnover et communication interne.' },
  ],

  getScoreColor,
  getScoreLabel,
  getMaturityLevel,
  getReadinessIndicator,

  getRisks: (perAxis, globalScore, lang) => getRisks(globalScore, perAxis, lang),
  getRecommendations: (perAxis, globalScore, lang) => getRecommendations(perAxis, globalScore, lang),

  getOptionStyle: (value, isSelected) => {
    if (value === 100) return isSelected ? 'border-primary-500 bg-primary-50' : 'border-secondary-200 hover:border-primary-300';
    if (value === 75) return isSelected ? 'border-teal-500 bg-teal-50' : 'border-secondary-200 hover:border-teal-300';
    if (value === 50) return isSelected ? 'border-accent-500 bg-accent-50' : 'border-secondary-200 hover:border-accent-300';
    if (value === 25) return isSelected ? 'border-orange-500 bg-orange-50' : 'border-secondary-200 hover:border-orange-300';
    if (value === 0) return isSelected ? 'border-red-500 bg-red-50' : 'border-secondary-200 hover:border-red-300';
    return isSelected ? 'border-gray-500 bg-gray-50' : 'border-secondary-200 hover:border-secondary-300';
  },
  getOptionIcon: (value) => {
    if (value === 100) return 'ri-check-double-line';
    if (value === 75) return 'ri-check-line';
    if (value === 50) return 'ri-subtract-line';
    if (value === 25) return 'ri-close-line';
    if (value === 0) return 'ri-close-circle-line';
    return 'ri-subtract-line';
  },
  getOptionColor: (value) => {
    if (value === 100) return 'text-primary-600';
    if (value === 75) return 'text-teal-600';
    if (value === 50) return 'text-accent-600';
    if (value === 25) return 'text-orange-600';
    if (value === 0) return 'text-red-600';
    return 'text-foreground-500';
  },

  showLeadForm: true,
  formUrl: FORM_URL,

  hashtags: ['RessourcesHumaines', 'DiagnosticRH', 'CapitalHumain', 'Afrique'],

  showRadarChart: true,
  renderRadarChart: (size, perAxis, axes, isFr) => {
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
          const labelPos = getPoint(i, 125);
          const label = isFr ? axis.titleFr : axis.titleEn;
          const words = label.split(' ');
          const short = words.length > 3 ? words.slice(0, 2).join(' ') : label;
          return (
            <text key={i} x={labelPos.x} y={labelPos.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="600" fill="#374151">
              {short}
            </text>
          );
        })}
      </svg>
    );
  },

  badgeIcon: 'ri-team-line',
  badgeTextFr: '6 piliers · 18 questions · 6 min',
  badgeTextEn: '6 pillars · 18 questions · 6 min',

  comparison: {
    storageKey: 'khepra_diagnostic_rh_baseline',
    getDeltaLabel,
    getDeltaColor,
    getDeltaIcon,
  },

  ultraClosing: {
    getMessage: (score, lang) => getUltraClosingMessage(score, lang),
  },

  expertCTA: {
    titleFr: 'Votre capital humain est votre actif le plus précieux',
    titleEn: 'Your human capital is your most valuable asset',
    descriptionFr:
      'Nos experts RH vous accompagnent dans la structuration de votre politique RH, la digitalisation de vos processus et la mise en place d\'un pilotage stratégique de vos talents. Bénéficiez d\'un diagnostic approfondi et d\'un plan d\'action personnalisé.',
    descriptionEn:
      'Our HR experts support you in structuring your HR policy, digitizing your processes and implementing strategic talent management. Benefit from an in-depth diagnostic and personalized action plan.',
    ctaFr: 'Demander un diagnostic RH approfondi',
    ctaEn: 'Request an in-depth HR diagnostic',
    ctaLink: '/contact',
  },
};