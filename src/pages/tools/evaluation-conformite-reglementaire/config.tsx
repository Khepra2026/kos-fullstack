import type { DiagnosticToolConfig } from '../components/types';
import {
  COMPLIANCE_SECTIONS,
  getScoreColor,
  getScoreLabel,
  getMaturityLevel,
  getReadinessIndicator,
  getRecommendations,
  getRisks,
} from './data';

const FORM_URL = 'https://readdy.ai/api/form/d8m7qf0jb57qogjbh7pg';

function getAxisColor(idx: number): string {
  const colors = ['#0f766e', '#0e7490', '#b45309', '#7c3aed', '#be123c', '#4d7c0f', '#b91c1c', '#1e40af'];
  return colors[idx % colors.length];
}

function getAxisIcon(idx: number): string {
  const icons = ['ri-building-line', 'ri-user-search-line', 'ri-shield-flash-line', 'ri-global-line', 'ri-scales-3-line', 'ri-shield-user-line', 'ri-settings-3-line', 'ri-bar-chart-grouped-line'];
  return icons[idx % icons.length];
}

export const evaluationConformiteConfig: DiagnosticToolConfig = {
  toolId: 'evaluation-conformite-reglementaire',
  toolNameFr: 'Évaluation Conformité Réglementaire',
  toolNameEn: 'Regulatory Compliance Assessment',
  toolSubtitleFr: 'Évaluez gratuitement la conformité de votre organisation aux normes BCEAO, BEAC, COBAC et OHADA. Questionnaire en 8 sections, scoring instantané, rapport PDF téléchargeable.',
  toolSubtitleEn: 'Assess your organization\'s compliance with BCEAO, BEAC, COBAC and OHADA standards for free. 8-section questionnaire, instant scoring, downloadable PDF report.',

  seoTitleFr: 'Évaluation Conformité Réglementaire UEMOA/CEMAC | KHEPRA EXPERTS',
  seoTitleEn: 'Regulatory Compliance Assessment UEMOA/CEMAC | KHEPRA EXPERTS',
  seoDescriptionFr: 'Évaluez gratuitement la conformité de votre organisation aux normes BCEAO, BEAC, COBAC et OHADA. Questionnaire en 8 sections, scoring instantané, rapport PDF téléchargeable.',
  seoDescriptionEn: 'Assess your organization\'s compliance with BCEAO, BEAC, COBAC and OHADA standards for free. 8-section questionnaire, instant scoring, downloadable PDF report.',
  seoKeywordsFr: 'conformité réglementaire, BCEAO, BEAC, COBAC, OHADA, audit conformité, évaluation conformité, UEMOA, CEMAC, LAB FT, KYC, FATCA, CRS',
  seoKeywordsEn: 'regulatory compliance, BCEAO, BEAC, COBAC, OHADA, compliance audit, compliance assessment, UEMOA, CEMAC, AML CFT, KYC, FATCA, CRS',
  canonicalPath: '/tools/evaluation-conformite-reglementaire',

  axes: COMPLIANCE_SECTIONS.map((section, idx) => ({
    id: section.id,
    titleFr: section.titleFr,
    titleEn: section.titleEn,
    descriptionFr: section.descriptionFr,
    descriptionEn: section.descriptionEn,
    icon: getAxisIcon(idx),
    color: getAxisColor(idx),
    questions: section.questions.map((q) => ({
      id: q.id,
      questionFr: q.questionFr,
      questionEn: q.questionEn,
      options: q.options.filter((o) => o.value >= 0).map((o) => ({
        value: o.value,
        labelFr: o.labelFr,
        labelEn: o.labelEn,
      })),
      axisId: section.id,
    })),
  })),

  howToNameFr: 'Évaluation Conformité Réglementaire BCEAO/BEAC/COBAC/OHADA',
  howToNameEn: 'BCEAO/BEAC/COBAC/OHADA Regulatory Compliance Assessment',
  howToDescriptionFr: 'Évaluez la conformité de votre organisation en 8 sections : Gouvernance, KYC, LAB/FT, FATCA/CRS, Déontologie, Protection Clientèle, Dispositifs Transverses et Pilotage. Score /100, recommandations personnalisées.',
  howToDescriptionEn: 'Assess your organization\'s compliance in 8 sections: Governance, KYC, AML/CFT, FATCA/CRS, Ethics, Customer Protection, Cross-cutting Systems and Management. Score /100, personalized recommendations.',
  howToTotalTime: '10M',
  howToSteps: [
    { name: 'Gouvernance & Organisation', text: 'Évaluez votre Conseil d\'Administration, la séparation des pouvoirs, les conflits d\'intérêts et le manuel de procédures.' },
    { name: 'KYC — Connaissance Client', text: 'Vérifiez vos procédures d\'identification, la due diligence renforcée et le filtrage des listes de sanctions.' },
    { name: 'LAB/FT — Lutte Anti-Blanchiment', text: 'Examinez votre manuel LAB/FT, la surveillance des transactions, les déclarations de soupçon et l\'évaluation des risques.' },
    { name: 'FATCA / CRS', text: 'Analysez votre classification FATCA/CRS, l\'identification des comptes et les auto-certifications clients.' },
    { name: 'Déontologie & Éthique', text: 'Auditez votre code de déontologie, la prévention anti-corruption et le canal de signalement des lanceurs d\'alerte.' },
    { name: 'Protection de la Clientèle', text: 'Vérifiez l\'information précontractuelle, le traitement des réclamations et la protection des données clients.' },
    { name: 'Dispositifs Transverses', text: 'Évaluez votre cartographie des risques, le PCA/PRA, la cybersécurité et l\'audit externe annuel.' },
    { name: 'Pilotage & Reporting', text: 'Examinez vos tableaux de bord de conformité, le reporting réglementaire et le suivi des recommandations d\'audit.' },
  ],

  getScoreColor,
  getScoreLabel,
  getMaturityLevel,
  getReadinessIndicator,

  getRisks: (perAxis, globalScore, lang) => getRisks(globalScore, lang),
  getRecommendations: (perAxis, globalScore, lang) => getRecommendations(perAxis, globalScore, lang),

  getOptionStyle: (value, isSelected) => {
    if (value === 100) return isSelected ? 'border-primary-500 bg-primary-50' : 'border-secondary-200 hover:border-primary-300';
    if (value === 50) return isSelected ? 'border-accent-500 bg-accent-50' : 'border-secondary-200 hover:border-accent-300';
    if (value === 0) return isSelected ? 'border-red-500 bg-red-50' : 'border-secondary-200 hover:border-red-300';
    return isSelected ? 'border-gray-500 bg-gray-50' : 'border-secondary-200 hover:border-secondary-300';
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

  hashtags: ['ConformiteReglementaire', 'BCEAO', 'OHADA', 'UEMOA', 'CEMAC'],

  showRadarChart: false,

  badgeIcon: 'ri-shield-check-line',
  badgeTextFr: '8 axes · 37 questions · 10 min',
  badgeTextEn: '8 axes · 37 questions · 10 min',

  expertCTA: {
    titleFr: 'Besoin d\'un accompagnement expert ?',
    titleEn: 'Need expert support?',
    descriptionFr: 'Nos consultants certifiés vous accompagnent dans la mise en conformité BCEAO, BEAC, COBAC et OHADA. Diagnostic approfondi, plan d\'action priorisé et suivi de mise en œuvre.',
    descriptionEn: 'Our certified consultants support you in achieving BCEAO, BEAC, COBAC and OHADA compliance. In-depth diagnosis, prioritized action plan and implementation follow-up.',
    ctaFr: 'Planifier un diagnostic',
    ctaEn: 'Schedule a diagnosis',
    ctaLink: '/contact',
  },
};