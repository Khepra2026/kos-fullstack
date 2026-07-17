import type { DiagnosticToolConfig } from '../components/types';
import {
  INSPECTION_AXES,
  getInspectionScoreColor,
  getInspectionScoreLabel,
  getInspectionRiskClass,
  getInspectionReadiness,
  getInspectionRisks,
  getInspectionRecommendations,
} from './data';

const FORM_URL = 'https://readdy.ai/api/form/d8m5s5ojb57qogjbh76g';

export const preInspectionConfig: DiagnosticToolConfig = {
  toolId: 'diagnostic-pre-inspection-bceao-cobac',
  toolNameFr: 'Diagnostic Pré-Inspection BCEAO/COBAC',
  toolNameEn: 'BCEAO/COBAC Pre-Inspection Diagnostic',
  toolSubtitleFr:
    'Les 25 constats qui conduisent le plus souvent aux sanctions BCEAO et COBAC. Évaluez votre préparation en 5 axes : gouvernance, contrôle interne, conformité LBC/FT, gestion des risques, cybersécurité.',
  toolSubtitleEn:
    'The 25 findings that most often lead to BCEAO and COBAC sanctions. Assess your readiness across 5 axes: governance, internal control, AML/CFT compliance, risk management, cybersecurity.',

  seoTitleFr: 'Diagnostic Pré-Inspection BCEAO/COBAC KHEPRA™ | KHEPRA EXPERTS',
  seoTitleEn: 'BCEAO/COBAC Pre-Inspection Diagnostic KHEPRA™ | KHEPRA EXPERTS',
  seoDescriptionFr:
    'Évaluez gratuitement votre préparation aux inspections BCEAO/COBAC. 25 constats clés, classification de risque (Faible/Modéré/Élevé/Critique), plan d\'action prioritaire.',
  seoDescriptionEn:
    'Free assessment of your BCEAO/COBAC inspection readiness. 25 key findings, risk classification (Low/Moderate/High/Critical), priority action plan.',
  seoKeywordsFr:
    'inspection BCEAO, inspection COBAC, diagnostic pré-inspection, conformité prudentielle, gouvernance bancaire, contrôle interne, LBC/FT, cybersécurité, PCA/PRA, Afrique',
  seoKeywordsEn:
    'BCEAO inspection, COBAC inspection, pre-inspection diagnostic, prudential compliance, banking governance, internal control, AML/CFT, cybersecurity, BCP/DRP, Africa',
  canonicalPath: '/tools/diagnostic-pre-inspection-bceao-cobac',

  axes: INSPECTION_AXES,

  howToNameFr: 'Diagnostic Pré-Inspection BCEAO/COBAC KHEPRA™',
  howToNameEn: 'BCEAO/COBAC Pre-Inspection Diagnostic KHEPRA™',
  howToDescriptionFr:
    'Évaluez votre préparation à une inspection en 25 constats sur 5 axes : gouvernance, contrôle interne, conformité LBC/FT, gestion des risques et cybersécurité. Classification de risque et plan d\'action prioritaire.',
  howToDescriptionEn:
    'Assess your inspection readiness in 25 findings across 5 axes: governance, internal control, AML/CFT compliance, risk management and cybersecurity. Risk classification and priority action plan.',
  howToTotalTime: '8M',
  howToSteps: [
    { name: 'Gouvernance & Organisation', text: 'Évaluez la conformité de votre Conseil d\'Administration, la séparation des pouvoirs, les comités spécialisés et le plan de relève.' },
    { name: 'Contrôle Interne & Audit', text: 'Vérifiez l\'indépendance de votre audit interne, le dispositif de contrôle permanent et le mécanisme de remontée d\'alerte.' },
    { name: 'Conformité & LBC/FT', text: 'Examinez votre dispositif KYC, la déclaration de soupçon, la formation des équipes et la conservation des données.' },
    { name: 'Gestion des Risques', text: 'Analysez votre cartographie des risques, l\'appétit au risque, le dispositif ALM et les ratios prudentiels.' },
    { name: 'Cybersécurité & PCA', text: 'Auditez votre politique de sécurité SI, votre PCA/PRA, vos sauvegardes et la gestion des incidents.' },
  ],

  getScoreColor: getInspectionScoreColor,
  getScoreLabel: getInspectionScoreLabel,
  getMaturityLevel: getInspectionRiskClass,
  getReadinessIndicator: getInspectionReadiness,

  getRisks: (perAxis, globalScore, lang) => getInspectionRisks(perAxis, globalScore, lang),
  getRecommendations: (perAxis, globalScore, lang) => getInspectionRecommendations(perAxis, globalScore, lang),

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

  hashtags: ['BCEAO', 'COBAC', 'Conformite', 'Gouvernance', 'InspectionBancaire'],

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
          const points = axes.map((_, i) => { const p = getPoint(i, level); return `${p.x},${p.y}`; }).join(' ');
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
          return <text key={i} x={labelPos.x} y={labelPos.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="600" fill="#374151">{short}</text>;
        })}
      </svg>
    );
  },

  badgeIcon: 'ri-search-eye-line',
  badgeTextFr: '5 axes · 25 constats · 8 min',
  badgeTextEn: '5 axes · 25 findings · 8 min',

  expertCTA: {
    titleFr: 'Besoin d\'un accompagnement pour préparer votre inspection ?',
    titleEn: 'Need support to prepare for your inspection?',
    descriptionFr:
      'Nos experts en conformité prudentielle vous accompagnent dans la préparation aux inspections BCEAO/COBAC : diagnostic approfondi, remédiation des constats, simulation d\'inspection et formation des équipes.',
    descriptionEn:
      'Our prudential compliance experts support you in preparing for BCEAO/COBAC inspections: in-depth diagnostic, finding remediation, inspection simulation and team training.',
    ctaFr: 'Planifier un rendez-vous',
    ctaEn: 'Schedule a meeting',
    ctaLink: '/contact',
  },
};