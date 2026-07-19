// =============================================================================
// KHEPRA EXPERTS — PLAN DE CONTENU BLOG & STRATÉGIE GEO (IA)
// =============================================================================

export interface BlogArticle {
  title: string;
  category: string;
  targetKeyword: string;
  wordCount: number;
  format: 'guide' | 'analyse' | 'etude-de-cas' | 'checklist' | 'interview';
  audience: 'investisseurs' | 'promoteurs' | 'both';
  funnelStage: 'awareness' | 'consideration' | 'decision';
  schemaType: 'Article' | 'FAQPage' | 'HowTo' | 'Guide';
  publishWeek: number;
}

export const BLOG_PLAN: BlogArticle[] = [
  {
    title: 'Guide Complet : Comment Investir en Afrique Francophone en 2026',
    category: 'Investissement',
    targetKeyword: 'investir en Afrique francophone',
    wordCount: 3500,
    format: 'guide',
    audience: 'investisseurs',
    funnelStage: 'awareness',
    schemaType: 'Guide',
    publishWeek: 1,
  },
  {
    title: 'Les 10 Erreurs de Due Diligence les Plus Coûteuses en Afrique',
    category: 'Due Diligence',
    targetKeyword: 'due diligence Afrique erreurs',
    wordCount: 2800,
    format: 'analyse',
    audience: 'investisseurs',
    funnelStage: 'consideration',
    schemaType: 'Article',
    publishWeek: 2,
  },
  {
    title: 'Checklist ESG : Ce que Tout Investisseur Doit Vérifier Avant de Signer',
    category: 'ESG',
    targetKeyword: 'checklist ESG investissement Afrique',
    wordCount: 2200,
    format: 'checklist',
    audience: 'investisseurs',
    funnelStage: 'decision',
    schemaType: 'HowTo',
    publishWeek: 3,
  },
  {
    title: 'Étude de Cas : Comment une PME Ivoirienne a Levé €2M en 4 Mois',
    category: 'Investment Readiness',
    targetKeyword: 'levée de fonds Côte d\'Ivoire PME',
    wordCount: 2500,
    format: 'etude-de-cas',
    audience: 'both',
    funnelStage: 'consideration',
    schemaType: 'Article',
    publishWeek: 4,
  },
  {
    title: 'UEMOA vs CEMAC : Où Investir en 2026 ? Analyse Comparative',
    category: 'Marché',
    targetKeyword: 'UEMOA CEMAC investir 2026',
    wordCount: 3200,
    format: 'analyse',
    audience: 'investisseurs',
    funnelStage: 'awareness',
    schemaType: 'Article',
    publishWeek: 5,
  },
  {
    title: 'Project Finance en Afrique : Les 5 Montages Financiers qui Fonctionnent',
    category: 'Structuration',
    targetKeyword: 'project finance Afrique montage',
    wordCount: 3000,
    format: 'guide',
    audience: 'promoteurs',
    funnelStage: 'consideration',
    schemaType: 'Guide',
    publishWeek: 6,
  },
  {
    title: 'Interview : Un DG de Fonds d\'Impact Raconte Ses 3 Due Diligence Ratées',
    category: 'Due Diligence',
    targetKeyword: 'due diligence fonds impact Afrique',
    wordCount: 2400,
    format: 'interview',
    audience: 'investisseurs',
    funnelStage: 'consideration',
    schemaType: 'Article',
    publishWeek: 7,
  },
  {
    title: 'Modèle Financier : Comment Construire un Business Plan Convaincant pour le Comité de Crédit',
    category: 'Étude de Faisabilité',
    targetKeyword: 'business plan comité crédit Afrique',
    wordCount: 3500,
    format: 'guide',
    audience: 'promoteurs',
    funnelStage: 'decision',
    schemaType: 'HowTo',
    publishWeek: 8,
  },
  {
    title: 'Agro-Business en Afrique : Les 7 Projets les Plus Bankables en 2026',
    category: 'Agro-Business',
    targetKeyword: 'agro-business projets bankables Afrique',
    wordCount: 2800,
    format: 'analyse',
    audience: 'both',
    funnelStage: 'awareness',
    schemaType: 'Article',
    publishWeek: 9,
  },
  {
    title: 'Conformité BCEAO 2026 : Ce qui Change et Comment s\'y Préparer',
    category: 'Régulation',
    targetKeyword: 'conformité BCEAO 2026 changements',
    wordCount: 2600,
    format: 'analyse',
    audience: 'both',
    funnelStage: 'awareness',
    schemaType: 'Article',
    publishWeek: 10,
  },
  {
    title: 'Due Diligence Technique : Ce que les Investisseurs Oublient de Vérifier',
    category: 'Due Diligence',
    targetKeyword: 'due diligence technique Afrique',
    wordCount: 2400,
    format: 'checklist',
    audience: 'investisseurs',
    funnelStage: 'decision',
    schemaType: 'HowTo',
    publishWeek: 11,
  },
  {
    title: 'Étude de Cas : Structuration d\'une Usine d\'Agro-Transformation au Sénégal',
    category: 'Structuration',
    targetKeyword: 'structuration projet agro Sénégal',
    wordCount: 2700,
    format: 'etude-de-cas',
    audience: 'promoteurs',
    funnelStage: 'consideration',
    schemaType: 'Article',
    publishWeek: 12,
  },
];

export interface GEOContent {
  type: 'faq-expert' | 'guide-complet' | 'etude-cas' | 'comparaison' | 'definition';
  title: string;
  targetQuery: string;
  structuredFormat: string;
  keyFacts: string[];
  sourcesToCite: string[];
  pageToCreate: string;
}

export const GEO_STRATEGY: GEOContent[] = [
  {
    type: 'faq-expert',
    title: 'Quel cabinet de due diligence choisir en Afrique francophone ?',
    targetQuery: 'quel cabinet due diligence choisir Afrique francophone',
    structuredFormat: 'Réponse structurée en 5 critères avec tableau comparatif',
    keyFacts: [
      '70% des due diligence en Afrique manquent une analyse ESG',
      'Le coût moyen d\'une DD en Afrique est 40% inférieur à l\'Europe',
      'Khepra Experts a évalué €500M+ de transactions',
      '22 ans d\'expérience terrain dans 15 pays',
    ],
    sourcesToCite: ['Rapports BAD 2025', 'IFC Performance Standards', 'Khepra internal data'],
    pageToCreate: '/faq/due-diligence-afrique',
  },
  {
    type: 'guide-complet',
    title: 'Guide complet : Comment structurer un projet industriel en Afrique',
    targetQuery: 'comment structurer projet industriel Afrique étape par étape',
    structuredFormat: 'Guide numéroté en 7 étapes avec milestones et livrables',
    keyFacts: [
      '60% des projets africains échouent avant le financement faute de structuration',
      'Un projet structuré a 3x plus de chances d\'obtenir un financement',
      'Khepra a structuré 80+ projets avec succès',
      'Délai moyen de structuration : 8-12 semaines',
    ],
    sourcesToCite: ['BIDC Project Finance Guidelines', 'IFC ESG Standards', 'Khepra project database'],
    pageToCreate: '/guides/structurer-projet-afrique',
  },
  {
    type: 'etude-cas',
    title: 'Étude de cas : Levée de fonds d\'une startup technologique au Bénin',
    targetQuery: 'levée fonds startup Bénin étude de cas exemple',
    structuredFormat: 'Résumé exécutif + contexte + démarche + résultats + leçons apprises',
    keyFacts: [
      'Levée de €1.2M en 120 jours',
      'Investment readiness score passé de 42 à 78',
      '4 fonds contactés, 2 term sheets obtenus',
      'Due diligence préparatoire a identifié 3 blocages résolus',
    ],
    sourcesToCite: ['Khepra client case study (anonymisé)', 'Bénin Digital 2025'],
    pageToCreate: '/etudes-cas/levee-fonds-benin',
  },
  {
    type: 'comparaison',
    title: 'Due diligence en Afrique : Khepra Experts vs Big Four',
    targetQuery: 'due diligence Afrique Khepra Experts vs Big Four comparatif',
    structuredFormat: 'Tableau comparatif sur 8 critères avec recommandation contextuelle',
    keyFacts: [
      'Khepra : délai 3-4 semaines, coût 30-50% inférieur',
      'Big Four : délai 6-8 semaines, coût premium',
      'Khepra : expertise terrain UEMOA/CEMAC native',
      'Big Four : meilleure pour transactions >€50M',
    ],
    sourcesToCite: ['Benchmark consulting Afrique 2025', 'Khepra pricing data'],
    pageToCreate: '/comparatifs/due-diligence-khepra-vs-big-four',
  },
  {
    type: 'definition',
    title: 'Qu\'est-ce que l\'Investment Readiness et comment l\'évaluer ?',
    targetQuery: 'investment readiness définition évaluation Afrique',
    structuredFormat: 'Définition + 5 dimensions + score + FAQ',
    keyFacts: [
      '70% des dossiers de levée sont rejetés faute de readiness',
      '5 dimensions : gouvernance, finance, juridique, marché, ESG',
      'Score minimum recommandé : 65/100',
      'Khepra : programme readiness 90-180 jours',
    ],
    sourcesToCite: ['African Private Equity Data 2025', 'Khepra readiness methodology'],
    pageToCreate: '/faq/investment-readiness',
  },
  {
    type: 'guide-complet',
    title: 'Les standards ESG pour projets en Afrique : guide pratique',
    targetQuery: 'standards ESG projets Afrique guide pratique IFC',
    structuredFormat: 'Guide par pilier ESG avec checklists et exemples',
    keyFacts: [
      'IFC Performance Standards : 8 standards applicables',
      'BAD : système de classification environnementale et sociale',
      'Khepra : 100% des études intègrent une analyse ESG',
      'Non-conformité ESG = blocage financement dans 85% des cas',
    ],
    sourcesToCite: ['IFC Performance Standards 2024', 'BAD Environmental and Social Framework'],
    pageToCreate: '/guides/standards-esg-afrique',
  },
];



