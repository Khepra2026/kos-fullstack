import type { DiagnosticToolConfig } from '';
import {
  AGREEMENT_AXES,
  getAgreementScoreColor,
  getAgreementScoreLabel,
  getAgreementMaturity,
  getAgreementReadiness,
  getAgreementRisks,
  getAgreementRecommendations,
} from '';

const FORM_URL = 'https://readdy.ai/api/form/d8uggnlu37m8lq7g358g';

export const agreementConfig: DiagnosticToolConfig = {
  toolId: 'scorecard-agrement-readiness',
  toolNameFr: 'Agrément Readiness Scorecard KHEPRA™',
  toolNameEn: 'License Readiness Scorecard KHEPRA™',
  toolSubtitleFr: 'Évaluez votre préparation à l\'agrément bancaire/fintech/EMF. Score J0-J270, Gap list, Roadmap 6 piliers.',
  toolSubtitleEn: 'Assess your banking/fintech/MFI licensing readiness. J0-J270 Score, Gap list, 6-pillar Roadmap.',

  seoTitleFr: 'Scorecard Agrément Readiness | Score J0-J270 BCEAO/COBAC Gratuit',
  seoTitleEn: 'License Readiness Scorecard | Free J0-J270 BCEAO/COBAC Score',
  seoDescriptionFr: 'Évaluez gratuitement votre maturité d\'agrément : gouvernance, KYC, capital, IT, contrôle interne. Score J0-J270, gaps identifiés, roadmap 6 piliers.',
  seoDescriptionEn: 'Assess your licensing maturity for free: governance, KYC, capital, IT, internal control. J0-J270 score, identified gaps, 6-pillar roadmap.',
  seoKeywordsFr: 'agrément bancaire, readiness scorecard, BCEAO, COBAC, agrément fintech, agrément EMF, conformité réglementaire, dossier agrément',
  seoKeywordsEn: 'banking license, readiness scorecard, BCEAO, COBAC, fintech license, MFI license, regulatory compliance, license application',
  canonicalPath: '/tools/scorecard-agrement-readiness',

  axes: AGREEMENT_AXES,

  howToNameFr: 'Agrément Readiness Scorecard KHEPRA™',
  howToNameEn: 'License Readiness Scorecard KHEPRA™',
  howToDescriptionFr: 'Évaluez votre maturité en 15 questions sur 6 piliers : gouvernance, LBC/FT, capital, SI, contrôle interne, documentation. Score J-270 à J-30, gaps identifiés, plan d\'action.',
  howToDescriptionEn: 'Assess your maturity in 15 questions across 6 pillars: governance, AML/CFT, capital, IS, internal control, documentation. J-270 to J-30 score, gaps identified, action plan.',
  howToTotalTime: 'PT6M',
  howToSteps: AGREEMENT_AXES.map(a => ({ name: a.titleFr, text: a.descriptionFr })),

  getScoreColor: getAgreementScoreColor,
  getScoreLabel: getAgreementScoreLabel,
  getMaturityLevel: getAgreementMaturity,
  getReadinessIndicator: getAgreementReadiness,

  getRisks: (pa, gs, l) => getAgreementRisks(pa, gs, l),
  getRecommendations: (pa, gs, l) => getAgreementRecommendations(pa, gs, l),

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

  hashtags: ['AgrementBancaire', 'BCEAO', 'Conformite', 'FintechAfrique'],

  showRadarChart: true,
  renderRadarChart: (size, perAxis, axes, isFr) => {
    const center = size / 2;
    const radius = 90;
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
              <polygon points={ptsStr} fill="rgba(15, 118, 110, 0.12)" stroke="#0f766e" strokeWidth="2" />
              {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill="#0f766e" stroke="white" strokeWidth="2" />)}
            </>
          );
        })()}
        {axes.map((a, i) => {
          const lp = getPoint(i, 118);
          const short = (isFr ? a.titleFr : a.titleEn).substring(0, 12);
          return <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="600" fill="#374151">{short}</text>;
        })}
      </svg>
    );
  },

  badgeIcon: 'ri-bank-card-line',
  badgeTextFr: '6 piliers d\'agrément · 15 questions · 6 min',
  badgeTextEn: '6 licensing pillars · 15 questions · 6 min',

  expertCTA: {
    titleFr: 'Prêt à accélérer votre agrément ?',
    titleEn: 'Ready to accelerate your licensing?',
    descriptionFr: 'KHEPRA EXPERTS a accompagné 15+ institutions dans leur processus d\'agrément BCEAO/COBAC. Contactez-nous pour un diagnostic flash gratuit et un plan d\'action personnalisé.',
    descriptionEn: 'KHEPRA EXPERTS has supported 15+ institutions in their BCEAO/COBAC licensing process. Contact us for a free flash diagnosis and a personalized action plan.',
    ctaFr: 'Demander un diagnostic flash',
    ctaEn: 'Request a flash diagnosis',
    ctaLink: '/contact',
  },
};



