import type { DiagnosticToolConfig } from '../components/types';
import {
  BCEAO_AXES,
  getBCEAOScoreColor,
  getBCEAOScoreLabel,
  getBCEAORiskClass,
  getBCEAOReadiness,
  getBCEAORisks,
  getBCEAORecommendations,
} from './data';

const FORM_URL = 'https://readdy.ai/api/form/d8m5ktt0ihgem5t5p410';
const PRIMARY = '#059669';

export const bceaoPreInspectionConfig: DiagnosticToolConfig = {
  toolId: 'diagnostic-pre-inspection-bceao',
  toolNameFr: 'Diagnostic Pré-Inspection BCEAO',
  toolNameEn: 'BCEAO Pre-Inspection Diagnostic',
  toolSubtitleFr:
    'Les 20 constats clés des inspections BCEAO. Évaluez votre préparation : gouvernance, contrôle interne, LBC/FT, gestion des risques et reporting.',
  toolSubtitleEn:
    'The 20 key BCEAO inspection findings. Assess your readiness: governance, internal control, AML/CFT, risk management, reporting.',

  seoTitleFr: 'Diagnostic Pré-Inspection BCEAO | KHEPRA EXPERTS',
  seoTitleEn: 'BCEAO Pre-Inspection Diagnostic | KHEPRA EXPERTS',
  seoDescriptionFr:
    'Évaluez gratuitement votre préparation aux inspections BCEAO. 20 constats, classification de risque, plan d\'action prioritaire.',
  seoDescriptionEn:
    'Free BCEAO inspection readiness assessment. 20 findings, risk classification, priority action plan.',
  seoKeywordsFr:
    'inspection BCEAO, diagnostic pré-inspection, conformité UEMOA, gouvernance bancaire, contrôle interne, LBC/FT, gestion risques',
  seoKeywordsEn:
    'BCEAO inspection, pre-inspection diagnostic, UEMOA compliance, banking governance, internal control, AML/CFT, risk management',
  canonicalPath: '/tools/diagnostic-pre-inspection-bceao',

  axes: BCEAO_AXES,

  howToNameFr: 'Diagnostic Pré-Inspection BCEAO',
  howToNameEn: 'BCEAO Pre-Inspection Diagnostic',
  howToDescriptionFr:
    'Évaluez votre préparation BCEAO en 20 questions sur 5 axes : gouvernance, contrôle interne, gestion des risques, LBC/FT et reporting.',
  howToDescriptionEn:
    'Assess your BCEAO readiness in 20 questions across 5 axes: governance, internal control, risk management, AML/CFT and reporting.',
  howToTotalTime: '8M',
  howToSteps: BCEAO_AXES.map((a) => ({
    name: a.titleFr,
    text: a.descriptionFr,
  })),

  getScoreColor: getBCEAOScoreColor,
  getScoreLabel: getBCEAOScoreLabel,
  getMaturityLevel: getBCEAORiskClass,
  getReadinessIndicator: getBCEAOReadiness,

  getRisks: (perAxis, globalScore, lang) => getBCEAORisks(perAxis, globalScore, lang),
  getRecommendations: (perAxis, globalScore, lang) => getBCEAORecommendations(perAxis, globalScore, lang),

  getOptionStyle: (value, isSelected) => {
    if (value === 100) return isSelected ? 'border-primary-500 bg-primary-50' : 'border-secondary-200 hover:border-primary-300';
    if (value === 60) return isSelected ? 'border-accent-500 bg-accent-50' : 'border-secondary-200 hover:border-accent-300';
    if (value === 25) return isSelected ? 'border-orange-500 bg-orange-50' : 'border-secondary-200 hover:border-orange-300';
    if (value === 0) return isSelected ? 'border-red-500 bg-red-50' : 'border-secondary-200 hover:border-red-300';
    return isSelected ? 'border-secondary-500 bg-background-100' : 'border-secondary-200 hover:border-secondary-300';
  },
  getOptionIcon: () => 'ri-check-line',
  getOptionColor: (value) => {
    if (value === 100) return 'text-primary-600';
    if (value === 60) return 'text-accent-600';
    if (value === 25) return 'text-orange-600';
    if (value === 0) return 'text-red-600';
    return 'text-foreground-500';
  },

  showLeadForm: true,
  formUrl: FORM_URL,

  hashtags: ['BCEAO', 'Conformite', 'PreInspection', 'GouvernanceBancaire'],

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

  badgeIcon: 'ri-search-eye-line',
  badgeTextFr: '5 axes · 20 questions · 8 min',
  badgeTextEn: '5 axes · 20 questions · 8 min',

  expertCTA: {
    titleFr: 'Besoin d\'un accompagnement pour votre inspection BCEAO ?',
    titleEn: 'Need support for your BCEAO inspection?',
    descriptionFr:
      'Nos experts en conformité prudentielle vous accompagnent dans la préparation aux inspections BCEAO.',
    descriptionEn:
      'Our prudential compliance experts support you in preparing for BCEAO inspections.',
    ctaFr: 'Planifier un rendez-vous',
    ctaEn: 'Schedule a meeting',
    ctaLink: '/contact',
  },
};