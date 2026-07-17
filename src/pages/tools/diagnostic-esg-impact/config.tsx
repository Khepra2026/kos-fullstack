import type { DiagnosticToolConfig } from '../components/types';
import {
  ESG_PILLARS,
  getESGScoreColor,
  getESGScoreLabel,
  getESGMaturityLevel,
  getESGReadinessIndicator,
  getESGRisks,
  getESGRecommendations,
  getESGUltraClosingMessage,
  getESGDeltaLabel,
  getESGDeltaColor,
  getESGDeltaIcon,
} from './data';

export const esgImpactConfig: DiagnosticToolConfig = {
  toolId: 'diagnostic-esg-impact',
  toolNameFr: 'Diagnostic ESG & Impact Social',
  toolNameEn: 'ESG & Social Impact Diagnostic',
  toolSubtitleFr:
    'Évaluez la maturité de votre démarche ESG : environnement, social, gouvernance et impact social mesurable. Obtenez un score sur 100 et un plan d\'action priorisé.',
  toolSubtitleEn:
    'Assess your ESG approach maturity: environment, social, governance and measurable social impact. Get a score out of 100 and a prioritized action plan.',

  seoTitleFr: 'Diagnostic ESG & Impact Social Gratuit | KHEPRA EXPERTS',
  seoTitleEn: 'Free ESG & Social Impact Diagnostic | KHEPRA EXPERTS',
  seoDescriptionFr:
    'Évaluez gratuitement votre maturité ESG : environnement, social, gouvernance, impact social mesurable. Score instantané, rapport PDF, recommandations pour entreprises africaines.',
  seoDescriptionEn:
    'Assess your ESG maturity for free: environment, social, governance, measurable social impact. Instant score, PDF report, recommendations for African companies.',
  seoKeywordsFr:
    'diagnostic ESG, maturité ESG, impact social, RSE Afrique, gouvernance responsable, durabilité, investissement d\'impact, conseil ESG',
  seoKeywordsEn:
    'ESG diagnostic, ESG maturity, social impact, CSR Africa, responsible governance, sustainability, impact investing, ESG consulting',
  canonicalPath: '/tools/diagnostic-esg-impact',

  axes: ESG_PILLARS,

  howToNameFr: 'Diagnostic ESG & Impact Social KHEPRA™',
  howToNameEn: 'ESG & Social Impact Diagnostic KHEPRA™',
  howToDescriptionFr:
    'Évaluez votre maturité ESG en 12 questions sur 4 piliers : Environnement, Social & Droits Humains, Gouvernance & Éthique, Impact Social Mesurable. Score /100, rapport PDF.',
  howToDescriptionEn:
    'Assess your ESG maturity in 12 questions across 4 pillars: Environment, Social & Human Rights, Governance & Ethics, Measurable Social Impact. Score /100, PDF report.',
  howToTotalTime: '5M',
  howToSteps: [
    {
      name: 'Environnement',
      text: 'Évaluez votre empreinte carbone, gestion des ressources, biodiversité et intégration environnementale dans la chaîne de valeur.',
    },
    {
      name: 'Social & Droits Humains',
      text: 'Analysez le respect des droits des travailleurs, la diversité, l\'inclusion, la santé-sécurité et l\'impact communautaire.',
    },
    {
      name: 'Gouvernance & Éthique',
      text: 'Examinez la transparence, la lutte anti-corruption, la conformité et la diversité du conseil d\'administration.',
    },
    {
      name: 'Impact Social Mesurable',
      text: 'Mesurez l\'emploi local, la chaîne de valeur inclusive, l\'innovation sociale et le reporting d\'impact.',
    },
  ],

  getScoreColor: getESGScoreColor,
  getScoreLabel: getESGScoreLabel,
  getMaturityLevel: getESGMaturityLevel,
  getReadinessIndicator: getESGReadinessIndicator,

  getRisks: (perAxis, globalScore, lang) => getESGRisks(globalScore, perAxis, lang),
  getRecommendations: (perAxis, globalScore, lang) => getESGRecommendations(perAxis, globalScore, lang),

  getOptionStyle: (value, isSelected) => {
    if (value >= 80) return isSelected ? 'border-primary-500 bg-primary-50' : 'border-secondary-200 hover:border-primary-300';
    if (value >= 50) return isSelected ? 'border-accent-500 bg-accent-50' : 'border-secondary-200 hover:border-accent-300';
    if (value >= 25) return isSelected ? 'border-primary-500 bg-primary-50' : 'border-secondary-200 hover:border-primary-300';
    return isSelected ? 'border-red-500 bg-red-50' : 'border-secondary-200 hover:border-red-300';
  },
  getOptionIcon: (value) => {
    if (value >= 80) return 'ri-check-double-line';
    if (value >= 50) return 'ri-check-line';
    if (value >= 25) return 'ri-subtract-line';
    return 'ri-close-line';
  },
  getOptionColor: (value) => {
    if (value >= 80) return 'text-primary-600';
    if (value >= 50) return 'text-accent-600';
    if (value >= 25) return 'text-primary-600';
    return 'text-red-600';
  },

  showLeadForm: false,

  hashtags: ['ESG', 'ImpactSocial', 'RSE', 'Durabilite', 'AfriqueESG'],

  showRadarChart: false,

  badgeIcon: 'ri-leaf-line',
  badgeTextFr: 'Diagnostic en 4 piliers · 12 questions · 5 min',
  badgeTextEn: '4-pillar diagnostic · 12 questions · 5 min',

  userInfoPreQuestionnaire: true,

  comparison: {
    storageKey: 'khepra_diagnostic_esg_baseline_v2',
    getDeltaLabel: getESGDeltaLabel,
    getDeltaColor: getESGDeltaColor,
    getDeltaIcon: getESGDeltaIcon,
  },

  ultraClosing: {
    getMessage: getESGUltraClosingMessage,
  },

  expertCTA: {
    titleFr: 'Besoin d\'un accompagnement ESG sur mesure ?',
    titleEn: 'Need tailored ESG support?',
    descriptionFr:
      'Nos consultants ESG certifiés vous accompagnent dans la structuration de votre démarche : audit, reporting, certification et attractivité auprès des investisseurs d\'impact.',
    descriptionEn:
      'Our certified ESG consultants support you in structuring your approach: audit, reporting, certification and attractiveness to impact investors.',
    ctaFr: 'Planifier un rendez-vous',
    ctaEn: 'Schedule a meeting',
    ctaLink: '/contact',
  },
};