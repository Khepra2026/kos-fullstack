import type { DiagnosticToolConfig } from '../components/types';
import { INCLUSION_FINANCIERE_AXES, getInclusionFinanciereScoreColor, getInclusionFinanciereScoreLabel, getInclusionFinanciereLevel, getInclusionFinanciereReadiness, getInclusionFinanciereRisks, getInclusionFinanciereRecommendations } from './data';

const FORM_URL = 'https://readdy.ai/api/form/d8pg05fij7vns5otj9h0';
const PRIMARY = '#059669';

export const inclusionFinanciereConfig: DiagnosticToolConfig = {
  toolId: 'audit-inclusion-financiere',
  toolNameFr: 'Audit Inclusion Financière KHEPRA™',
  toolNameEn: 'Financial Inclusion Audit KHEPRA™',
  toolSubtitleFr: 'Évaluez votre conformité BCEAO/UEMOA en inclusion financière sur 4 axes : conformité réglementaire, accessibilité, protection clients et impact social.',
  toolSubtitleEn: 'Assess your BCEAO/UEMOA financial inclusion compliance across 4 axes: regulatory compliance, accessibility, client protection and social impact.',

  seoTitleFr: 'Audit Inclusion Financière Gratuit | KHEPRA EXPERTS',
  seoTitleEn: 'Free Financial Inclusion Audit | KHEPRA EXPERTS',
  seoDescriptionFr: 'Évaluez votre conformité BCEAO/UEMOA en inclusion financière. 20 questions sur 4 axes : conformité, accessibilité, protection clients, impact social. Rapport avec recommandations.',
  seoDescriptionEn: 'Assess your BCEAO/UEMOA financial inclusion compliance. 20 questions across 4 axes: compliance, accessibility, client protection, social impact. Report with recommendations.',
  seoKeywordsFr: 'audit inclusion financière, conformité BCEAO, conformité UEMOA, microfinance Afrique, protection clients, impact social',
  seoKeywordsEn: 'financial inclusion audit, BCEAO compliance, UEMOA compliance, Africa microfinance, client protection, social impact',
  canonicalPath: '/tools/audit-inclusion-financiere',

  axes: INCLUSION_FINANCIERE_AXES,

  howToNameFr: 'Audit Inclusion Financière KHEPRA™',
  howToNameEn: 'Financial Inclusion Audit KHEPRA™',
  howToDescriptionFr: 'Évaluez votre conformité BCEAO/UEMOA en inclusion financière sur 4 axes : conformité réglementaire, accessibilité des services, protection des clients et impact social. Score et recommandations personnalisées.',
  howToDescriptionEn: 'Assess your BCEAO/UEMOA financial inclusion compliance across 4 axes: regulatory compliance, service accessibility, client protection and social impact. Score and personalized recommendations.',
  howToTotalTime: '9M',
  howToSteps: INCLUSION_FINANCIERE_AXES.map((a) => ({
    name: a.titleFr,
    text: a.descriptionFr,
  })),

  getScoreColor: getInclusionFinanciereScoreColor,
  getScoreLabel: getInclusionFinanciereScoreLabel,
  getMaturityLevel: getInclusionFinanciereLevel,
  getReadinessIndicator: getInclusionFinanciereReadiness,

  getRisks: (perAxis, globalScore, lang) => getInclusionFinanciereRisks(perAxis, globalScore, lang),
  getRecommendations: (perAxis, globalScore, lang) => getInclusionFinanciereRecommendations(perAxis, globalScore, lang),

  getOptionStyle: (value, isSelected) => {
    if (value === 100) return isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-secondary-200 hover:border-emerald-300';
    if (value === 60) return isSelected ? 'border-sky-500 bg-sky-50' : 'border-secondary-200 hover:border-sky-300';
    if (value === 25) return isSelected ? 'border-accent-500 bg-accent-50' : 'border-secondary-200 hover:border-accent-300';
    if (value === 0) return isSelected ? 'border-red-500 bg-red-50' : 'border-secondary-200 hover:border-red-300';
    return isSelected ? 'border-secondary-500 bg-background-100' : 'border-secondary-200 hover:border-secondary-300';
  },
  getOptionIcon: (value) => {
    if (value === 100) return 'ri-check-double-line';
    if (value === 60) return 'ri-check-line';
    if (value === 25) return 'ri-subtract-line';
    if (value === 0) return 'ri-close-line';
    return 'ri-subtract-line';
  },
  getOptionColor: (value) => {
    if (value === 100) return 'text-emerald-600';
    if (value === 60) return 'text-sky-600';
    if (value === 25) return 'text-accent-600';
    if (value === 0) return 'text-red-600';
    return 'text-foreground-500';
  },

  showLeadForm: true,
  formUrl: FORM_URL,

  hashtags: ['InclusionFinanciere', 'Microfinance', 'BCEAO', 'ConformiteUEMOA'],

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
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
        {[20, 40, 60, 80, 100].map((level) => {
          const points = axes.map((_, i) => { const p = getPoint(i, level); return `${p.x},${p.y}`; }).join(' ');
          return <polygon key={level} points={points} fill="none" stroke="#e5e7eb" strokeWidth="1" />;
        })}
        {axes.map((_, i) => { const end = getPoint(i, 100); return <line key={i} x1={center} y1={center} x2={end.x} y2={end.y} stroke="#e5e7eb" strokeWidth="1" />; })}
        {(() => {
          const dataPoints = axes.map((axis, i) => getPoint(i, perAxis[axis.id] ?? 0));
          const pointsStr = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');
          return (
            <>
              <polygon points={pointsStr} fill="rgba(5,150,105,0.15)" stroke={PRIMARY} strokeWidth="2" />
              {dataPoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="5" fill={PRIMARY} stroke="white" strokeWidth="2" />)}
            </>
          );
        })()}
        {axes.map((axis, i) => {
          const lp = getPoint(i, 125);
          const words = (isFr ? axis.titleFr : axis.titleEn).split(' ');
          const label = words.length > 2 ? words.slice(0, 2).join(' ') : words.join(' ');
          return <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="600" fill="#374151">{label}</text>;
        })}
      </svg>
    );
  },

  badgeIcon: 'ri-heart-3-line',
  badgeTextFr: '4 axes · 20 questions · 9 min',
  badgeTextEn: '4 axes · 20 questions · 9 min',

  expertCTA: {
    titleFr: 'Besoin d\'accompagnement en inclusion financière ?',
    titleEn: 'Need financial inclusion support?',
    descriptionFr: 'Nos experts vous accompagnent dans la mise en conformité BCEAO/UEMOA et le renforcement de votre impact social.',
    descriptionEn: 'Our experts support you in achieving BCEAO/UEMOA compliance and strengthening your social impact.',
    ctaFr: 'Planifier un rendez-vous',
    ctaEn: 'Schedule a meeting',
    ctaLink: '/contact',
  },
};