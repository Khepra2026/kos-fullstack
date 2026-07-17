import type { DiagnosticToolConfig } from '../components/types';
import {
  PT_AXES,
  getPTScoreColor,
  getPTScoreLabel,
  getPTMaturityLevel,
  getPTReadiness,
  getPTRisks,
  getPTRecommendations,
} from './data';

const FORM_URL = 'https://readdy.ai/api/form/d8m5qva1heuq7aefig70';

export const prixTransfertConfig: DiagnosticToolConfig = {
  toolId: 'diagnostic-prix-transfert',
  toolNameFr: 'Diagnostic de Risque Prix de Transfert',
  toolNameEn: 'Transfer Pricing Risk Diagnostic',
  toolSubtitleFr:
    'Évaluez votre conformité BEPS OCDE : documentation, transactions intragroupe, gouvernance fiscale et exposition aux risques. Score de conformité sur 100.',
  toolSubtitleEn:
    'Assess your BEPS OECD compliance: documentation, intragroup transactions, tax governance and risk exposure. Compliance score out of 100.',

  seoTitleFr: 'Diagnostic de Risque Prix de Transfert KHEPRA™ | KHEPRA EXPERTS',
  seoTitleEn: 'Transfer Pricing Risk Diagnostic KHEPRA™ | KHEPRA EXPERTS',
  seoDescriptionFr:
    'Évaluez gratuitement votre conformité prix de transfert BEPS OCDE : Master File, Local File, management fees, financement intragroupe. Score de conformité sur 100.',
  seoDescriptionEn:
    'Free assessment of your BEPS OECD transfer pricing compliance: Master File, Local File, management fees, intragroup financing. Compliance score out of 100.',
  seoKeywordsFr:
    'prix de transfert, diagnostic prix de transfert, BEPS OCDE, documentation prix de transfert, management fees, conformité fiscale Afrique, Master File, Local File',
  seoKeywordsEn:
    'transfer pricing, transfer pricing diagnostic, BEPS OECD, transfer pricing documentation, management fees, tax compliance Africa, Master File, Local File',
  canonicalPath: '/tools/diagnostic-prix-transfert',

  axes: PT_AXES,

  howToNameFr: 'Diagnostic de Risque Prix de Transfert KHEPRA™',
  howToNameEn: 'Transfer Pricing Risk Diagnostic KHEPRA™',
  howToDescriptionFr:
    'Évaluez votre conformité BEPS OCDE en 12 questions sur 4 axes : documentation, transactions intragroupe, gouvernance fiscale et exposition au risque. Score de conformité /100.',
  howToDescriptionEn:
    'Assess your BEPS OECD compliance in 12 questions across 4 axes: documentation, intragroup transactions, tax governance and risk exposure. Compliance score /100.',
  howToTotalTime: '5M',
  howToSteps: [
    { name: 'Documentation Prix de Transfert', text: 'Vérifiez votre Master File, Local File, analyse FAR et benchmarking conforme à l\'Action 13 BEPS.' },
    { name: 'Transactions Intragroupe', text: 'Documentez les management fees, redevances, financements intragroupe et cartographiez tous les flux.' },
    { name: 'Gouvernance Fiscale', text: 'Formalisez votre politique PT, comité dédié, contrôle interne et veille réglementaire BEPS/ATAF.' },
    { name: 'Exposition au Risque', text: 'Évaluez les contrôles fiscaux passés, le provisionnement des risques et votre capacité de défense sous 30 jours.' },
  ],

  getScoreColor: getPTScoreColor,
  getScoreLabel: getPTScoreLabel,
  getMaturityLevel: getPTMaturityLevel,
  getReadinessIndicator: getPTReadiness,

  getRisks: (perAxis, globalScore, lang) => getPTRisks(perAxis, globalScore, lang),
  getRecommendations: (perAxis, globalScore, lang) => getPTRecommendations(perAxis, globalScore, lang),

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

  hashtags: ['PrixDeTransfert', 'ConformiteFiscale', 'BEPS', 'AfriqueDesAffaires'],

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
          const labelPos = getPoint(i, 120);
          const label = isFr ? axis.titleFr : axis.titleEn;
          const words = label.split(' ');
          const short = words.length > 2 ? words.slice(0, 2).join(' ') : label;
          return (
            <text key={i} x={labelPos.x} y={labelPos.y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="600" fill="#374151">
              {short}
            </text>
          );
        })}
      </svg>
    );
  },

  badgeIcon: 'ri-scales-3-line',
  badgeTextFr: '4 axes · 12 questions · 5 min',
  badgeTextEn: '4 axes · 12 questions · 5 min',

  expertCTA: {
    titleFr: 'Besoin d\'un accompagnement prix de transfert ?',
    titleEn: 'Need transfer pricing support?',
    descriptionFr:
      'Nos experts en fiscalité internationale vous accompagnent dans la structuration de votre documentation BEPS, l\'analyse économique de vos transactions et la défense de vos prix de transfert.',
    descriptionEn:
      'Our international tax experts support you in structuring your BEPS documentation, economic analysis of your transactions and transfer pricing defense.',
    ctaFr: 'Planifier un rendez-vous',
    ctaEn: 'Schedule a meeting',
    ctaLink: '/contact',
  },
};