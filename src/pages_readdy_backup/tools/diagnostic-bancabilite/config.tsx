import type { DiagnosticToolConfig } from '';
import {
  BANCABILITE_AXES,
  getBancabiliteScoreColor,
  getBancabiliteScoreLabel,
  getBancabiliteLevel,
  getBancabiliteInterpretation,
  getBancabiliteRisks,
  getBancabiliteRecommendations,
} from '';

const FORM_URL = 'https://readdy.ai/api/form/d8m5qti1heuq7aefig60';

export const bancabiliteConfig: DiagnosticToolConfig = {
  toolId: 'diagnostic-bancabilite',
  toolNameFr: 'Indice de Bancabilité KHEPRA™',
  toolNameEn: 'Bankability Index KHEPRA™',
  toolSubtitleFr:
    '9 projets africains sur 10 échouent avant même la première réunion avec un investisseur. Évaluez la bancabilité de votre projet sur 5 axes : stratégie, équipe, finances, due diligence et structuration.',
  toolSubtitleEn:
    '9 out of 10 African projects fail before the first meeting with an investor. Assess your project\'s bankability across 5 axes: strategy, team, finance, due diligence and investment structuring.',

  seoTitleFr: 'Indice de Bancabilité KHEPRA™ | KHEPRA EXPERTS',
  seoTitleEn: 'Bankability Index KHEPRA™ | KHEPRA EXPERTS',
  seoDescriptionFr:
    'Évaluez gratuitement la bancabilité de votre projet africain. 25 questions sur 5 axes : stratégie, équipe, finances, due diligence et structuration. 5 niveaux de bancabilité avec recommandations.',
  seoDescriptionEn:
    'Free assessment of your African project\'s bankability. 25 questions across 5 axes: strategy, team, finance, due diligence and structuring. 5 bankability levels with recommendations.',
  seoKeywordsFr:
    'bancabilité, due diligence investisseur, levée de fonds Afrique, préparation investisseur, valorisation entreprise, business plan, gouvernance, Afrique',
  seoKeywordsEn:
    'bankability, investor due diligence, Africa fundraising, investor readiness, company valuation, business plan, governance, Africa',
  canonicalPath: '/tools/diagnostic-bancabilite',

  axes: BANCABILITE_AXES,

  howToNameFr: 'Indice de Bancabilité KHEPRA™',
  howToNameEn: 'Bankability Index KHEPRA™',
  howToDescriptionFr:
    'Mesurez la bancabilité de votre projet en 25 questions sur 5 axes : stratégie, équipe, finances, due diligence et structuration. 5 niveaux de bancabilité, recommandations personnalisées pour investisseurs.',
  howToDescriptionEn:
    'Measure your project\'s bankability in 25 questions across 5 axes: strategy, team, finance, due diligence and structuring. 5 bankability levels, personalized recommendations for investors.',
  howToTotalTime: '8M',
  howToSteps: [
    { name: 'Stratégie & Business Model', text: 'Analysez votre business model, marché adressable, avantage concurrentiel, modèle de revenus et stratégie de scaling.' },
    { name: 'Gouvernance & Équipe Dirigeante', text: 'Évaluez la qualité de l\'équipe, le track record, la gouvernance, la rétention des talents et la répartition du capital.' },
    { name: 'Performance Financière & Projections', text: 'Examinez l\'historique financier, les projections, les unit economics, la rentabilité et les besoins de financement.' },
    { name: 'Due Diligence & Conformité', text: 'Vérifiez la documentation juridique, la conformité réglementaire, la propriété intellectuelle et la cartographie des risques.' },
    { name: 'Structuration de l\'Investissement', text: 'Préparez la valorisation, le term sheet, le pacte d\'actionnaires, la stratégie de sortie et le reporting investisseur.' },
  ],

  getScoreColor: getBancabiliteScoreColor,
  getScoreLabel: getBancabiliteScoreLabel,
  getMaturityLevel: getBancabiliteLevel,
  getReadinessIndicator: getBancabiliteInterpretation,

  getRisks: (perAxis, globalScore, lang) => getBancabiliteRisks(perAxis, globalScore, lang),
  getRecommendations: (perAxis, globalScore, lang) => getBancabiliteRecommendations(perAxis, globalScore, lang),

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

  hashtags: ['Bancabilite', 'LeveeDeFonds', 'DueDiligence', 'Investissement', 'Afrique'],

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
          const short = words.length > 4 ? words.slice(0, 3).join(' ') : label;
          return (
            <text key={i} x={labelPos.x} y={labelPos.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="600" fill="#374151">
              {short}
            </text>
          );
        })}
      </svg>
    );
  },

  badgeIcon: 'ri-hand-coin-line',
  badgeTextFr: '5 axes · 25 questions · 8 min',
  badgeTextEn: '5 axes · 25 questions · 8 min',

  expertCTA: {
    titleFr: 'Transformez votre projet en opportunité d\'investissement irresistible',
    titleEn: 'Transform your project into an irresistible investment opportunity',
    descriptionFr:
      'Nos experts en due diligence investisseur vous accompagnent de la structuration du business plan à la data room virtuelle, en passant par la valorisation, le term sheet et la préparation aux Q&A investisseurs.',
    descriptionEn:
      'Our investor due diligence experts support you from business plan structuring to virtual data room, through valuation, term sheet and investor Q&A preparation.',
    ctaFr: 'Planifier un rendez-vous',
    ctaEn: 'Schedule a meeting',
    ctaLink: '/contact',
  },
};



