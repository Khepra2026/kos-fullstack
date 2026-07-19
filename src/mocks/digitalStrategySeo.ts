// =============================================================================
// KHEPRA EXPERTS — STRATÉGIE SEO : MOTS-CLÉS ET ARCHITECTURE DE PAGES
// =============================================================================

export interface Keyword {
  keyword: string;
  searchIntent: 'informational' | 'transactional' | 'navigational';
  difficulty: 'low' | 'medium' | 'high';
  volumeEstimate: string;
  landingPage: string;
  priority: 1 | 2 | 3;
}

export const SEO_KEYWORDS: Keyword[] = [
  {
    keyword: 'due diligence Afrique',
    searchIntent: 'transactional',
    difficulty: 'medium',
    volumeEstimate: '1 200/mois',
    landingPage: '/services/due-diligence-acquisition',
    priority: 1,
  },
  {
    keyword: 'étude de faisabilité projet industriel Afrique',
    searchIntent: 'transactional',
    difficulty: 'low',
    volumeEstimate: '800/mois',
    landingPage: '/services/conseil-strategique',
    priority: 1,
  },
  {
    keyword: 'investment readiness Afrique',
    searchIntent: 'transactional',
    difficulty: 'low',
    volumeEstimate: '400/mois',
    landingPage: '/services/levee-de-fonds',
    priority: 1,
  },
  {
    keyword: 'structuration projet agro-business Afrique',
    searchIntent: 'transactional',
    difficulty: 'low',
    volumeEstimate: '350/mois',
    landingPage: '/services/gestion-de-projets',
    priority: 1,
  },
  {
    keyword: 'levée de fonds Afrique francophone',
    searchIntent: 'transactional',
    difficulty: 'medium',
    volumeEstimate: '900/mois',
    landingPage: '/services/levee-de-fonds',
    priority: 1,
  },
  {
    keyword: 'cabinet conseil investisseurs Afrique',
    searchIntent: 'transactional',
    difficulty: 'medium',
    volumeEstimate: '600/mois',
    landingPage: '/investisseurs',
    priority: 1,
  },
  {
    keyword: 'ESG advisory Afrique',
    searchIntent: 'transactional',
    difficulty: 'low',
    volumeEstimate: '300/mois',
    landingPage: '/services/structuration-projets',
    priority: 2,
  },
  {
    keyword: 'due diligence préalable startup Afrique',
    searchIntent: 'transactional',
    difficulty: 'low',
    volumeEstimate: '250/mois',
    landingPage: '/tools/diagnostic-strategique',
    priority: 2,
  },
  {
    keyword: 'conformité BCEAO BEAC OHADA',
    searchIntent: 'informational',
    difficulty: 'medium',
    volumeEstimate: '1 500/mois',
    landingPage: '/tools/evaluation-conformite-reglementaire',
    priority: 2,
  },
  {
    keyword: 'project finance Afrique',
    searchIntent: 'transactional',
    difficulty: 'high',
    volumeEstimate: '700/mois',
    landingPage: '/projets-industriels',
    priority: 2,
  },
  {
    keyword: 'étude de marché Afrique de l\'Ouest',
    searchIntent: 'transactional',
    difficulty: 'medium',
    volumeEstimate: '550/mois',
    landingPage: '/services/conseil-strategique',
    priority: 2,
  },
  {
    keyword: 'valuation entreprise Afrique',
    searchIntent: 'transactional',
    difficulty: 'medium',
    volumeEstimate: '450/mois',
    landingPage: '/services/due-diligence-acquisition',
    priority: 2,
  },
  {
    keyword: 'financement projet industriel UEMOA',
    searchIntent: 'transactional',
    difficulty: 'low',
    volumeEstimate: '280/mois',
    landingPage: '/projets-industriels',
    priority: 3,
  },
  {
    keyword: 'impact investing Afrique',
    searchIntent: 'informational',
    difficulty: 'medium',
    volumeEstimate: '500/mois',
    landingPage: '/investisseurs',
    priority: 3,
  },
  {
    keyword: 'audit social financier Afrique',
    searchIntent: 'transactional',
    difficulty: 'medium',
    volumeEstimate: '320/mois',
    landingPage: '/services/due-diligence',
    priority: 3,
  },
];

export interface SEOPage {
  slug: string;
  titleSEO: string;
  metaDescription: string;
  h1: string;
  h2s: string[];
  keywordPrincipal: string;
  keywordSecondaires: string[];
  contentPillars: string[];
  ctaText: string;
}

export const SEO_PAGES: SEOPage[] = [
  {
    slug: '/services/due-diligence',
    titleSEO: 'Due Diligence Afrique | Cabinet Spécialisé Investisseurs — Khepra',
    metaDescription:
      'Due diligence pluridisciplinaire (financière, légale, technique, ESG) pour investisseurs en Afrique francophone. Méthodologie Big Four. Confidentialité absolue.',
    h1: 'Due Diligence en Afrique Francophone : Décidez en Toute Sécurité',
    h2s: [
      'Pourquoi la due diligence est critique en Afrique',
      'Notre méthodologie en 4 axes',
      'Ce que vous recevez : un rapport 360° avec red flags',
      'Transactions évaluées : €500M+ d\'expérience terrain',
      'Délais et confidentialité',
      'Prochaines étapes',
    ],
    keywordPrincipal: 'due diligence Afrique',
    keywordSecondaires: [
      'due diligence financière Afrique',
      'audit acquisition Afrique',
      'valuation entreprise Afrique',
    ],
    contentPillars: [
      'Méthodologie détaillée par axe',
      'Études de cas anonymisées avec métriques',
      'Comparaison avec les Big Four',
      'FAQ investisseurs sur la DD en Afrique',
      'Témoignages clients avec chiffres',
    ],
    ctaText: 'Demander une pré-évaluation confidentielle',
  },
  {
    slug: '/services/etudes-faisabilite',
    titleSEO: 'Étude de Faisabilité Projet Industriel Afrique | Khepra Experts',
    metaDescription:
      'Étude de faisabilité intégrée (technique, marché, financière, ESG) conforme BAD/BIDC/IFC. Dossier bankable pour comité de crédit en Afrique francophone.',
    h1: 'Études de Faisabilité Intégrées : Du Concept au Financement',
    h2s: [
      'Quand avez-vous besoin d\'une étude de faisabilité ?',
      'Les 4 piliers de notre étude intégrée',
      'Conformité aux standards internationaux',
      'Modélisation financière 10 ans avec sensibilité',
      '100% des études acceptées par les comités de crédit',
      'Process et livrables',
    ],
    keywordPrincipal: 'étude de faisabilité projet industriel Afrique',
    keywordSecondaires: [
      'étude de marché Afrique de l\'Ouest',
      'étude technique projet Afrique',
      'dossier bankable comité de crédit',
    ],
    contentPillars: [
      'Guide complet étapes d\'une étude de faisabilité',
      'Modèles financiers téléchargeables',
      'Cartographie des financeurs par secteur',
      'Études de cas sectoriels',
      'Checklist ESG pour projets en Afrique',
    ],
    ctaText: 'Demander une étude de faisabilité',
  },
  {
    slug: '/services/structuration-projets',
    titleSEO: 'Structuration Projet Industriel & Agro-Business Afrique | Khepra',
    metaDescription:
      'Structuration complète de projets industriels et agro-business en Afrique : montage juridique, modélisation financière, stratégie ESG IFC. Du concept au financement.',
    h1: 'Structuration de Projets : Du Concept au Financement en Afrique',
    h2s: [
      'Pourquoi 60% des projets africains échouent avant le financement',
      'Notre approche de structuration en 5 phases',
      'Montage juridique et fiscal optimisé',
      'Stratégie ESG et conformité IFC',
      '80+ projets structurés avec succès',
      'Package "Du concept au financement"',
    ],
    keywordPrincipal: 'structuration projet agro-business Afrique',
    keywordSecondaires: [
      'montage juridique projet Afrique',
      'stratégie ESG projet industriel',
      'project finance Afrique',
    ],
    contentPillars: [
      'Guide structuration juridique par pays UEMOA/CEMAC',
      'Modèles de montage financier',
      'Cartographie des fonds d\'impact par secteur',
      'Checklist readiness investisseurs',
      'Témoignages promoteurs avec métriques',
    ],
    ctaText: 'Structurer mon projet',
  },
  {
    slug: '/services/investment-readiness',
    titleSEO: 'Investment Readiness Afrique | Levée de Fonds 90-180 Jours — Khepra',
    metaDescription:
      'Préparez votre entreprise à la levée de fonds en Afrique francophone. Due diligence préparatoire, pitch deck, financial model, mise en relation investisseurs.',
    h1: 'Investment Readiness : Levez des Fonds en 90 à 180 Jours',
    h2s: [
      'Pourquoi 70% des dossiers de levée sont rejetés',
      'Notre programme readiness en 5 étapes',
      'Due diligence préparatoire complète',
      'Pitch deck et teaser investisseurs',
      'Mise en relation avec fonds PE/VC et banques',
      '€120M+ levés par nos clients',
    ],
    keywordPrincipal: 'investment readiness Afrique',
    keywordSecondaires: [
      'levée de fonds Afrique francophone',
      'pitch deck investisseurs Afrique',
      'data room structurée startup',
    ],
    contentPillars: [
      'Guide complet comment lever des fonds en Afrique',
      'Template pitch deck pour investisseurs africains',
      'Liste des fonds PE/VC actifs en Afrique francophone',
      'Étapes de la data room et documents requis',
      'Témoignages entrepreneurs avec montants levés',
    ],
    ctaText: 'Tester ma readiness gratuitement',
  },
  {
    slug: '/investisseurs',
    titleSEO: 'Cabinet Conseil Investisseurs Afrique | Due Diligence & ESG — Khepra',
    metaDescription:
      'Cabinet spécialisé pour investisseurs en Afrique francophone. Due diligence, investment readiness, études de faisabilité. Confidentialité absolue. 22 ans d\'expérience.',
    h1: 'Le Cabinet de Référence pour les Investisseurs en Afrique Francophone',
    h2s: [
      '3 offres dédiées aux investisseurs',
      'Notre process boutique en 5 étapes',
      'Confidentialité et indépendance absolues',
      '€500M+ de transactions évaluées',
      'Témoignages investisseurs',
      'Prochaines étapes',
    ],
    keywordPrincipal: 'cabinet conseil investisseurs Afrique',
    keywordSecondaires: [
      'due diligence Afrique',
      'impact investing Afrique',
      'valuation entreprise Afrique',
    ],
    contentPillars: [
      'Portrait-robot de l\'investisseur type en Afrique francophone',
      'Cartographie des risques par pays UEMOA/CEMAC',
      'Benchmark des rendements par secteur',
      'Guide investir en Afrique francophone en 2026',
      'FAQ investisseurs',
    ],
    ctaText: 'Demander un diagnostic confidentiel',
  },
  {
    slug: '/projets-industriels',
    titleSEO: 'Structuration Projets Industriels & Agro-Business Afrique | Khepra',
    metaDescription:
      'Structuration de projets industriels et agro-business en Afrique francophone. Études de faisabilité, ESG, montage juridique. Du concept au financement.',
    h1: 'Structuration de Projets Industriels & Agro-Business en Afrique',
    h2s: [
      'Pourquoi les projets africains ont besoin d\'un structurateur',
      'Notre package "Du concept au financement"',
      'Process de structuration en 5 étapes',
      'Focus ESG : conformité IFC et standards internationaux',
      '80+ projets structurés avec succès',
      'Témoignages promoteurs',
    ],
    keywordPrincipal: 'structuration projet agro-business Afrique',
    keywordSecondaires: [
      'étude de faisabilité projet industriel Afrique',
      'financement projet industriel UEMOA',
      'ESG advisory Afrique',
    ],
    contentPillars: [
      'Guide structurer un projet en Afrique étape par étape',
      'Cartographie des financeurs par secteur et pays',
      'Modèles de montage juridique SPV holding joint-venture',
      'Checklist ESG pour projets agricoles et industriels',
      'Études de cas avec montants financés',
    ],
    ctaText: 'Évaluer la viabilité de mon projet',
  },
  {
    slug: '/tools/diagnostic-strategique',
    titleSEO: 'Diagnostic Flash Stratégique Gratuit | Khepra Experts',
    metaDescription:
      'Diagnostic stratégique express gratuit. Identifiez vos forces, faiblesses et leviers de croissance en 15 minutes. Rapport synthétique avec 3 priorités actionnables.',
    h1: 'Flash Diagnostic Gratuit : Identifiez Vos Leviers de Croissance',
    h2s: [
      'En quoi consiste le Flash Diagnostic ?',
      'Les 5 dimensions analysées',
      'Ce que vous recevez : rapport synthétique en 24h',
      'Qui peut en bénéficier ?',
      'Pourquoi c\'est gratuit',
    ],
    keywordPrincipal: 'diagnostic stratégique entreprise Afrique',
    keywordSecondaires: [
      'audit rapide entreprise gratuit',
      'conseil gratuit stratégie Afrique',
    ],
    contentPillars: [
      'Méthodologie du diagnostic en 15 minutes',
      'Exemple de rapport anonymisé',
      'Témoignages utilisateurs',
      'FAQ sur le diagnostic gratuit',
    ],
    ctaText: 'Démarrer mon diagnostic gratuit',
  },
  {
    slug: '/tools/investment-readiness',
    titleSEO: 'Test Investment Readiness Gratuit | Prêt à Lever des Fonds ?',
    metaDescription:
      'Évaluez gratuitement à quel point votre entreprise est prête pour une levée de fonds. Score sur 5 dimensions + plan de préparation personnalisé. 10 minutes.',
    h1: 'Investment Readiness Score : Êtes-Vous Prêt à Lever des Fonds ?',
    h2s: [
      'Les 5 dimensions de la readiness',
      'Comment fonctionne le score ?',
      'Ce que vous recevez : score + plan personnalisé',
      'Pourquoi la readiness est critique avant une levée',
      'Témoignages entrepreneurs',
    ],
    keywordPrincipal: 'investment readiness test gratuit',
    keywordSecondaires: [
      'préparation levée fonds startup',
      'diagnostic levée fonds Afrique',
    ],
    contentPillars: [
      'Guide les 5 dimensions de la readiness expliquées',
      'Exemple de score et plan d\'action',
      'Comparaison readiness avant/après accompagnement',
      'FAQ sur la levée de fonds en Afrique',
    ],
    ctaText: 'Tester ma readiness gratuitement',
  },
  {
    slug: '/tools/evaluation-conformite-reglementaire',
    titleSEO: 'Conformité BCEAO BEAC OHADA Gratuit | Score en 10 Min — Khepra',
    metaDescription:
      'Évaluez gratuitement votre conformité BCEAO, BEAC, COBAC et OHADA en 10 minutes. Score immédiat avec écart de conformité et plan d\'action priorisé.',
    h1: 'Conformity Scorecard : Votre Conformité Réglementaire en 10 Minutes',
    h2s: [
      'Quels régulateurs sont couverts ?',
      'Comment fonctionne le scorecard ?',
      'Ce que vous recevez : score + plan d\'action',
      'Pourquoi la conformité est non-négociable',
      'Qui peut l\'utiliser ?',
    ],
    keywordPrincipal: 'conformité BCEAO BEAC OHADA',
    keywordSecondaires: [
      'audit conformité réglementaire Afrique',
      'score conformité bancaire gratuit',
    ],
    contentPillars: [
      'Guide complet des exigences BCEAO 2026',
      'Guide complet des exigences BEAC/COBAC',
      'Checklist OHADA pour entreprises',
      'Études de cas de non-conformité et sanctions',
    ],
    ctaText: 'Évaluer ma conformité gratuitement',
  },
  {
    slug: '/about',
    titleSEO: 'Khepra Experts | Cabinet Conseil Investment & ESG Advisory Afrique',
    metaDescription:
      'Khepra Experts : cabinet boutique Investment & ESG Advisory en Afrique francophone. 22 ans, 500+ missions, 15 pays, €500M+ de transactions. Spécialisé investisseurs & projets.',
    h1: 'Khepra Experts : Investment & ESG Advisory Boutique en Afrique Francophone',
    h2s: [
      'Notre histoire et notre ancrage africain',
      'Pourquoi nous sommes spécialisés investisseurs',
      'Notre équipe et nos partenaires',
      'Nos chiffres clés',
      'Notre méthodologie',
      'Nos engagements ESG',
    ],
    keywordPrincipal: 'cabinet conseil investment ESG advisory Afrique',
    keywordSecondaires: [
      'conseil investisseurs Afrique francophone',
      'cabinet boutique Afrique UEMOA CEMAC',
    ],
    contentPillars: [
      'Histoire du cabinet et fondation',
      'Portrait de l\'équipe dirigeante',
      'Cartographie des missions par pays',
      'Partenariats institutionnels BAD BIDC IFC',
      'Engagements RSE et ESG du cabinet',
    ],
    ctaText: 'Rencontrer l\'équipe',
  },
];





