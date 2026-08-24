import type { DiagnosticToolConfig } from '';
import {
  PERENNITE_AXES,
  getPerenniteScoreColor,
  getPerenniteScoreLabel,
  getPerenniteRating,
  getPerenniteInterpretation,
  getPerenniteRisks,
  getPerenniteRecommendations,
} from '';

const FORM_URL = 'https://readdy.ai/api/form/d8m5qva1heuq7aefig6g';

export const perenniteConfig: DiagnosticToolConfig = {
  toolId: 'diagnostic-perennite-familiale',
  toolNameFr: 'Indice de Pérennité Familiale',
  toolNameEn: 'Family Sustainability Index',
  toolSubtitleFr:
    'Pourquoi 70 % des entreprises familiales africaines ne survivent pas à la deuxième génération ? Évaluez votre Groupe Familial sur 5 axes : gouvernance, transmission, patrimoine, conflits et professionnalisation.',
  toolSubtitleEn:
    'Why 70% of African family businesses do not survive the second generation? Assess your Family Group across 5 axes: governance, transmission, wealth, conflicts and professionalization.',

  seoTitleFr: 'Indice de Pérennité Familiale KHEPRA™ | KHEPRA EXPERTS',
  seoTitleEn: 'Family Sustainability Index KHEPRA™ | KHEPRA EXPERTS',
  seoDescriptionFr:
    'Évaluez gratuitement la pérennité de votre entreprise familiale. 25 questions sur 5 axes : gouvernance, succession, patrimoine, conflits, professionnalisation. Notation sur 100 avec recommandations.',
  seoDescriptionEn:
    'Free assessment of your family business sustainability. 25 questions across 5 axes: governance, succession, wealth, conflicts, professionalization. 100-point rating with recommendations.',
  seoKeywordsFr:
    'entreprise familiale, gouvernance familiale, succession entreprise, transmission patrimoine, pérennité familiale, holding familiale, conseil de famille, constitution familiale, Afrique',
  seoKeywordsEn:
    'family business, family governance, business succession, wealth transmission, family sustainability, family holding, family council, family constitution, Africa',
  canonicalPath: '/tools/diagnostic-perennite-familiale',

  axes: PERENNITE_AXES,

  howToNameFr: 'Évaluer la pérennité de votre entreprise familiale',
  howToNameEn: 'Assess your family business sustainability',
  howToDescriptionFr:
    'Diagnostic interactif gratuit en 8 minutes. 25 questions sur 5 axes : gouvernance familiale, transmission, préservation du patrimoine, gestion des conflits et professionnalisation. Notation sur 100 avec recommandations.',
  howToDescriptionEn:
    'Free 8-minute interactive diagnostic. 25 questions across 5 axes: family governance, succession, wealth preservation, conflict management and professionalization. 100-point rating with recommendations.',
  howToTotalTime: '8M',
  howToSteps: [
    { name: 'Gouvernance Familiale', text: 'Évaluez votre Conseil de Famille, votre Constitution Familiale, la séparation des rôles et le Pacte d\'Actionnaires.' },
    { name: 'Transmission & Succession', text: 'Examinez votre plan de succession, la formation de la génération suivante et les dispositifs juridiques et fiscaux de transmission.' },
    { name: 'Préservation du Patrimoine', text: 'Analysez la structure juridique de votre patrimoine, la diversification des actifs et les mécanismes de liquidité.' },
    { name: 'Gestion des Conflits', text: 'Vérifiez vos mécanismes de résolution des conflits, la communication familiale et le principe d\'équité entre branches.' },
    { name: 'Professionnalisation', text: 'Évaluez la professionnalisation du management, la présence d\'administrateurs indépendants et les systèmes d\'information de gestion.' },
  ],

  getScoreColor: getPerenniteScoreColor,
  getScoreLabel: getPerenniteScoreLabel,
  getMaturityLevel: getPerenniteRating,
  getReadinessIndicator: getPerenniteInterpretation,

  getRisks: (perAxis, globalScore, lang) => getPerenniteRisks(perAxis, globalScore, lang),
  getRecommendations: (perAxis, globalScore, lang) => getPerenniteRecommendations(perAxis, globalScore, lang),

  getOptionStyle: (value, isSelected) => {
    if (value === 100) return isSelected ? 'border-primary-500 bg-primary-50' : 'border-secondary-200 hover:border-primary-300';
    if (value === 60) return isSelected ? 'border-accent-500 bg-accent-50' : 'border-secondary-200 hover:border-accent-300';
    if (value === 25) return isSelected ? 'border-orange-500 bg-orange-50' : 'border-secondary-200 hover:border-orange-300';
    if (value === 0) return isSelected ? 'border-red-500 bg-red-50' : 'border-secondary-200 hover:border-red-300';
    return isSelected ? 'border-gray-500 bg-gray-50' : 'border-secondary-200 hover:border-secondary-300';
  },
  getOptionIcon: (value) => {
    if (value === 100) return 'ri-check-double-line';
    if (value === 60) return 'ri-check-line';
    if (value === 25) return 'ri-subtract-line';
    if (value === 0) return 'ri-close-line';
    return 'ri-subtract-line';
  },
  getOptionColor: (value) => {
    if (value === 100) return 'text-primary-600';
    if (value === 60) return 'text-accent-600';
    if (value === 25) return 'text-orange-600';
    if (value === 0) return 'text-red-600';
    return 'text-foreground-500';
  },

  showLeadForm: true,
  formUrl: FORM_URL,

  hashtags: ['EntrepriseFamiliale', 'GouvernanceFamiliale', 'Transmission', 'Perennite', 'Afrique'],

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
              <polygon points={pointsStr} fill="rgba(180, 83, 9, 0.15)" stroke="#b45309" strokeWidth="2" />
              {dataPoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="5" fill="#b45309" stroke="white" strokeWidth="2" />)}
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

  badgeIcon: 'ri-shield-star-line',
  badgeTextFr: '5 axes · 25 questions · 8 min',
  badgeTextEn: '5 axes · 25 questions · 8 min',

  expertCTA: {
    titleFr: 'Préservez votre Groupe Familial pour les générations futures',
    titleEn: 'Preserve your Family Group for future generations',
    descriptionFr:
      'Nos experts en gouvernance familiale vous accompagnent dans la structuration de votre Conseil de Famille, la rédaction de votre Constitution Familiale, la préparation de votre succession et la professionnalisation de votre Groupe.',
    descriptionEn:
      'Our family governance experts support you in structuring your Family Council, drafting your Family Constitution, preparing your succession and professionalizing your Group.',
    ctaFr: 'Planifier un rendez-vous',
    ctaEn: 'Schedule a meeting',
    ctaLink: '/contact',
  },
};



