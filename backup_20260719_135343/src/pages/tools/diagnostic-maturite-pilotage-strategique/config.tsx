import type { DiagnosticToolConfig } from '';
import {
  MATURITE_AXES,
  getMaturiteScoreColor,
  getMaturiteScoreLabel,
  getMaturiteLevel,
  getMaturiteInterpretation,
  getMaturiteRisks,
  getMaturiteRecommendations,
} from '';

const FORM_URL = 'https://readdy.ai/api/form/d8m5s5ojb57qogjbh78g';

export const maturiteConfig: DiagnosticToolConfig = {
  toolId: 'diagnostic-maturite-pilotage-strategique',
  toolNameFr: 'Diagnostic Maturité Pilotage Stratégique',
  toolNameEn: 'Strategic Steering Maturity Diagnostic',
  toolSubtitleFr:
    'Niveau 1 à 5 — du Pilotage Rudimentaire à l\'Excellence Stratégique. 5 axes : pilotage, gouvernance, risques, performance, décision.',
  toolSubtitleEn:
    'Level 1 to 5 — from Rudimentary Steering to Strategic Excellence. 5 axes: steering, governance, risk, performance, decision-making.',

  seoTitleFr: 'Diagnostic Maturité Pilotage Stratégique | KHEPRA EXPERTS',
  seoTitleEn: 'Strategic Steering Maturity Diagnostic | KHEPRA EXPERTS',
  seoDescriptionFr:
    'Évaluez la maturité de votre pilotage stratégique en 25 questions sur 5 axes. Niveau 1 à 5, de Rudimentaire à Excellence. Score /100, recommandations.',
  seoDescriptionEn:
    'Assess your strategic steering maturity in 25 questions across 5 axes. Level 1 to 5, from Rudimentary to Excellence. Score /100, recommendations.',
  seoKeywordsFr:
    'pilotage stratégique, maturité stratégique, gouvernance, gestion des risques, performance, prise de décision, création de valeur',
  seoKeywordsEn:
    'strategic steering, strategic maturity, governance, risk management, performance, decision-making, value creation',
  canonicalPath: '/tools/diagnostic-maturite-pilotage-strategique',

  axes: MATURITE_AXES,

  howToNameFr: 'Diagnostic Maturité Pilotage Stratégique',
  howToNameEn: 'Strategic Steering Maturity Diagnostic',
  howToDescriptionFr:
    'Évaluez la maturité de votre pilotage stratégique en 25 questions sur 5 axes : pilotage stratégique, gouvernance, gestion des risques, performance et prise de décision. Score /100, 5 niveaux de maturité.',
  howToDescriptionEn:
    'Assess your strategic steering maturity in 25 questions across 5 axes: strategic steering, governance, risk management, performance and decision-making. Score /100, 5 maturity levels.',
  howToTotalTime: '8M',
  howToSteps: [
    { name: 'Pilotage Stratégique', text: 'Évaluez votre plan stratégique, la déclinaison opérationnelle, le comité stratégique, la veille et les business cases.' },
    { name: 'Gouvernance', text: 'Examinez le rôle du CA, les comités spécialisés, la séparation des pouvoirs, les conflits d\'intérêts et la transparence.' },
    { name: 'Gestion des Risques', text: 'Analysez la cartographie des risques, l\'appétence au risque, le contrôle interne, le PCA et la veille réglementaire.' },
    { name: 'Performance & Pilotage', text: 'Vérifiez les tableaux de bord, le processus budgétaire, l\'évaluation, la création de valeur et les revues de performance.' },
    { name: 'Prise de Décision & Agilité', text: 'Auditez le processus décisionnel, l\'exploitation des données, l\'innovation, le leadership et l\'agilité stratégique.' },
  ],

  getScoreColor: getMaturiteScoreColor,
  getScoreLabel: getMaturiteScoreLabel,
  getMaturityLevel: getMaturiteLevel,
  getReadinessIndicator: getMaturiteInterpretation,

  getRisks: (perAxis, globalScore, lang) => getMaturiteRisks(perAxis, globalScore, lang),
  getRecommendations: (perAxis, globalScore, lang) => getMaturiteRecommendations(perAxis, globalScore, lang),

  getOptionStyle: (value, isSelected) => {
    if (value === 100) return isSelected ? 'border-primary-500 bg-primary-50' : 'border-secondary-200 hover:border-primary-300';
    if (value === 67) return isSelected ? 'border-sky-500 bg-sky-50' : 'border-secondary-200 hover:border-sky-300';
    if (value === 33) return isSelected ? 'border-accent-500 bg-accent-50' : 'border-secondary-200 hover:border-accent-300';
    if (value === 0) return isSelected ? 'border-red-500 bg-red-50' : 'border-secondary-200 hover:border-red-300';
    return isSelected ? 'border-gray-500 bg-gray-50' : 'border-secondary-200 hover:border-secondary-300';
  },
  getOptionIcon: (value) => {
    if (value === 100) return 'ri-check-double-line';
    if (value === 67) return 'ri-check-line';
    if (value === 33) return 'ri-subtract-line';
    if (value === 0) return 'ri-close-line';
    return 'ri-subtract-line';
  },
  getOptionColor: (value) => {
    if (value === 100) return 'text-primary-600';
    if (value === 67) return 'text-sky-600';
    if (value === 33) return 'text-accent-600';
    if (value === 0) return 'text-red-600';
    return 'text-foreground-500';
  },

  showLeadForm: true,
  formUrl: FORM_URL,

  hashtags: ['PilotageStrategique', 'MaturiteStrategique', 'Gouvernance', 'Performance'],

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
          const pts = axes.map((_, i) => { const p = getPoint(i, level); return `${p.x},${p.y}`; }).join(' ');
          return <polygon key={level} points={pts} fill="none" stroke="#e5e7eb" strokeWidth="1" />;
        })}
        {axes.map((_, i) => { const end = getPoint(i, 100); return <line key={i} x1={center} y1={center} x2={end.x} y2={end.y} stroke="#e5e7eb" strokeWidth="1" />; })}
        {(() => {
          const dp = axes.map((a, i) => getPoint(i, perAxis[a.id] ?? 0));
          const ps = dp.map((p) => `${p.x},${p.y}`).join(' ');
          return (<><polygon points={ps} fill="rgba(15, 118, 110, 0.15)" stroke="#0f766e" strokeWidth="2" />{dp.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="5" fill="#0f766e" stroke="white" strokeWidth="2" />)}</>);
        })()}
        {axes.map((a, i) => {
          const lp = getPoint(i, 125);
          const w = (isFr ? a.titleFr : a.titleEn).split(' ');
          const s = w.length > 3 ? w.slice(0, 2).join(' ') : w.join(' ');
          return <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="600" fill="#374151">{s}</text>;
        })}
      </svg>
    );
  },

  badgeIcon: 'ri-compass-3-line',
  badgeTextFr: '5 axes · 25 questions · 8 min',
  badgeTextEn: '5 axes · 25 questions · 8 min',

  expertCTA: {
    titleFr: 'Besoin d\'un CEO Advisory Board ?',
    titleEn: 'Need a CEO Advisory Board?',
    descriptionFr:
      'Nos experts en pilotage stratégique et gouvernance vous accompagnent dans la montée en maturité de votre organisation : structuration du plan stratégique, renforcement de la gouvernance et installation des tableaux de bord de performance.',
    descriptionEn:
      'Our strategic steering and governance experts support you in increasing your organization\'s maturity: strategic plan structuring, governance strengthening and performance dashboard installation.',
    ctaFr: 'Planifier un rendez-vous',
    ctaEn: 'Schedule a meeting',
    ctaLink: '/contact',
  },
};



