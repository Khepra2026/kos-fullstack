// =============================================================================
// KHEPRA EXPERTS — STRATÉGIE LINKEDIN, FUNNEL & BRANDING
// =============================================================================

export interface LinkedInPostPlan {
  week: number;
  day: 'lundi' | 'mercredi' | 'vendredi';
  type: 'insight-marche' | 'analyse-projet' | 'erreur-investisseur' | 'etude-cas' | 'tendance' | 'positionnement';
  title: string;
  hook: string;
  bodyStructure: string[];
  cta: string;
  hashtag: string[];
  estimatedEngagement: 'high' | 'medium' | 'low';
}

export const LINKEDIN_PLAN: LinkedInPostPlan[] = [
  {
    week: 1,
    day: 'lundi',
    type: 'insight-marche',
    title: 'Les 3 pays UEMOA où investir en 2026',
    hook: 'J\'ai passé 22 ans à évaluer des projets en Afrique francophone. Voici les 3 pays où je placerais mon propre argent en 2026.',
    bodyStructure: [
      '1. Côte d\'Ivoire : stabilité macro + hub régional',
      '2. Sénégal : écosystème fintech + gouvernance pro-investisseur',
      '3. Bénin : réformes fiscales + agriculture structurée',
      'Données chiffrées : PIB, inflation, climat des affaires',
      'Attention : chaque pays a ses pièges spécifiques',
    ],
    cta: 'Quel pays vous intéresse ? Dites-moi en commentaire.',
    hashtag: ['#InvestirEnAfrique', '#UEMOA', '#PrivateEquity', '#KhepraExperts'],
    estimatedEngagement: 'high',
  },
  {
    week: 1,
    day: 'mercredi',
    type: 'analyse-projet',
    title: 'Pourquoi ce projet agro a été financé à €12M',
    hook: 'Un promoteur nous a confié un projet agro au Sénégal. 6 mois plus tard, il levait €12M. Voici ce qui a fait la différence.',
    bodyStructure: [
      'Problème initial : projet intéressant mais mal structuré',
      'Étape 1 : étude de faisabilité intégrée',
      'Étape 2 : structuration juridique (SPV, contrats, licences)',
      'Étape 3 : preparation investisseurs (data room, teaser, roadshow)',
      'Résultat : 3 term sheets, closing à €12M en 4 mois',
    ],
    cta: 'Vous avez un projet à structurer ? Parlons-en en privé.',
    hashtag: ['#ProjectFinance', '#AgroBusiness', '#Sénégal', '#KhepraExperts'],
    estimatedEngagement: 'high',
  },
  {
    week: 1,
    day: 'vendredi',
    type: 'erreur-investisseur',
    title: 'L\'erreur de DD qui a coûté €3M à un fonds',
    hook: 'Un fonds PE a investi €8M dans une entreprise ouest-africaine. 18 mois plus tard, ils découvraient un passif caché de €3M.',
    bodyStructure: [
      'Ce que la due diligence a manqué : un litige fiscal latent',
      'Pourquoi : l\'audit légal n\'a pas couvert les 5 dernières années',
      'Leçon : une DD en Afrique doit être pluridisciplinaire ET terrain',
      'Notre méthode : 4 axes + réseau local',
      'ROI d\'une bonne DD : 1€ investi en DD = 10€ de risques évités',
    ],
    cta: 'Ne laissez pas un passif caché détruire votre investissement.',
    hashtag: ['#DueDiligence', '#PrivateEquity', '#InvestirEnAfrique', '#KhepraExperts'],
    estimatedEngagement: 'high',
  },
  {
    week: 2,
    day: 'lundi',
    type: 'tendance',
    title: 'L\'impact investing dépasse le private equity traditionnel en Afrique',
    hook: 'En 2025, l\'impact investing a représenté 42% des flux d\'investissement en Afrique francophone. Voici pourquoi ça change tout.',
    bodyStructure: [
      'Chiffre clé : 42% des flux vs 31% pour le PE traditionnel',
      '3 facteurs : ESG, blended finance, fonds bilatéraux',
      'Conséquence : les projets doivent intégrer l\'ESG dès la conception',
      'Opportunité : projets agro et énergie sont les plus bankables',
      'Risque : greenwashing des projets mal structurés',
    ],
    cta: 'Votre projet est-il "impact-ready" ? Testez-le gratuitement.',
    hashtag: ['#ImpactInvesting', '#ESG', '#Afrique', '#KhepraExperts'],
    estimatedEngagement: 'medium',
  },
  {
    week: 2,
    day: 'mercredi',
    type: 'insight-marche',
    title: 'Le taux de rejet des dossiers de levée en Afrique : 70%',
    hook: '7 startups sur 10 échouent à lever des fonds en Afrique francophone. Ce n\'est pas un problème de marché. C\'est un problème de readiness.',
    bodyStructure: [
      'Stat : 70% des dossiers rejetés dès le premier screening',
      '3 raisons : gouvernance faible, financial model bancal, ESG absente',
      'Solution : investment readiness program en 90-180 jours',
      'Résultat clients Khepra : taux de conversion 3x supérieur',
      'Levée moyenne : €1.2M en 120 jours après readiness',
    ],
    cta: 'Testez votre readiness gratuitement. 10 minutes. Résultat immédiat.',
    hashtag: ['#LevéeDeFonds', '#StartupAfrique', '#InvestmentReadiness', '#KhepraExperts'],
    estimatedEngagement: 'high',
  },
  {
    week: 2,
    day: 'vendredi',
    type: 'positionnement',
    title: 'Pourquoi nous avons refusé 12 missions cette année',
    hook: 'Nous avons refusé 12 missions cette année. Pas par manque de temps. Par choix stratégique. Voici pourquoi.',
    bodyStructure: [
      'Khepra n\'est pas un cabinet généraliste',
      '4 offres uniquement : DD, études de faisabilité, structuration, readiness',
      'Chaque refus = un projet en dehors de notre zone d\'excellence',
      'Résultat : 100% de satisfaction client, 0 litige',
      'Notre promesse : on ne prend que ce qu\'on excelle',
    ],
    cta: 'Votre projet correspond à nos 4 offres ? Parlons-en.',
    hashtag: ['#ConseilStratégique', '#BoutiqueAdvisory', '#KhepraExperts'],
    estimatedEngagement: 'medium',
  },
  {
    week: 3,
    day: 'lundi',
    type: 'analyse-projet',
    title: 'Le modèle financier qui a convaincu un comité de crédit en 48h',
    hook: 'Un promoteur nous a présenté un modèle financier Excel de 200 lignes. Le comité de crédit l\'a approuvé en 48h. Voici la structure exacte.',
    bodyStructure: [
      'Erreur classique : modèles trop complexes ou trop simplistes',
      'Structure gagnante : 12 onglets, 3 scénarios, sensibilité intégrée',
      '3 ratios critiques : VAN, TRI, DSCR',
      'ESG : coût de conformité intégré dans le modèle',
      'Livrable clé : résumé exécutif 2 pages pour le comité',
    ],
    cta: 'Téléchargez notre template de modèle financier (gratuit).',
    hashtag: ['#ModélisationFinancière', '#ProjectFinance', '#ComitéDeCrédit', '#KhepraExperts'],
    estimatedEngagement: 'high',
  },
  {
    week: 3,
    day: 'mercredi',
    type: 'erreur-investisseur',
    title: 'Le piège de la "bonne affaire" en Afrique',
    hook: 'Un investisseur m\'a appelé : "J\'ai trouvé une entreprise à 3x EBITDA, c\'est une affaire en or". 3 semaines plus tard, il m\'a remercié de l\'avoir dissuadé.',
    bodyStructure: [
      'Le multiple EBITDA ne suffit pas en Afrique',
      '5 facteurs à vérifier : gouvernance, conformité, ESG, concentration clients, dette cachée',
      'Notre méthode : scoring sur 15 critères avant même la DD',
      'Résultat : 40% des "bonnes affaires" sont des pièges',
      'Investir en Afrique = expertise terrain + rigueur méthodologique',
    ],
    cta: 'Avant de signer, faites un Flash Diagnostic. 15 min. Gratuit.',
    hashtag: ['#InvestirEnAfrique', '#DueDiligence', '#PrivateEquity', '#KhepraExperts'],
    estimatedEngagement: 'high',
  },
  {
    week: 3,
    day: 'vendredi',
    type: 'etude-cas',
    title: 'Comment une PME a optimisé sa trésorerie de 35% en 90 jours',
    hook: 'Une PME camerounaise perdait 20% de sa marge à cause de fuites de trésorerie. 90 jours plus tard, sa marge avait augmenté de 35%.',
    bodyStructure: [
      'Diagnostic : BFR excessif, délais clients trop longs, stocks mal gérés',
      'Action 1 : renégociation délais fournisseurs (+15 jours)',
      'Action 2 : mise en place d\'un scoring client',
      'Action 3 : optimisation des stocks just-in-time local',
      'Résultat : +€180K de trésorerie libérée, marge +35%',
    ],
    cta: 'Votre trésorerie est-elle optimisée ? Diagnostic gratuit.',
    hashtag: ['#Trésorerie', '#PMEAfrique', '#Cameroun', '#KhepraExperts'],
    estimatedEngagement: 'medium',
  },
];

export interface FunnelStage {
  stage: 1 | 2 | 3 | 4;
  name: string;
  description: string;
  tactics: string[];
  tools: string[];
  cta: string;
  conversionRate: string;
  metrics: string[];
}

export const FUNNEL: FunnelStage[] = [
  {
    stage: 1,
    name: 'Attraction',
    description: 'Contenu LinkedIn / SEO qui attire l\'attention des investisseurs et promoteurs',
    tactics: [
      '3 posts LinkedIn/semaine (insights marché, analyses projets, erreurs investisseurs)',
      '2 articles blog/semaine optimisés SEO',
      'GEO content (FAQ expertes, guides complets) pour les IA',
      'Présence dans les newsletters sectorielles',
    ],
    tools: [
      'LinkedIn Creator Mode',
      'Blog Khepra avec schema.org',
      'Pages FAQ expertes optimisées IA',
      'Newsletter Insights mensuelle',
    ],
    cta: 'Suivre Khepra sur LinkedIn / S\'abonner aux insights',
    conversionRate: '15% vers Étape 2',
    metrics: [
      'Visiteurs uniques blog/mois',
      'Impressions LinkedIn/semaine',
      'Taux d\'engagement LinkedIn',
      'Classement SEO mots-clés prioritaires',
    ],
  },
  {
    stage: 2,
    name: 'Lead Magnet',
    description: 'Conversion des visiteurs en leads via outils gratuits à forte valeur',
    tactics: [
      'Flash Diagnostic (15 min, gratuit)',
      'Conformity Scorecard (10 min, gratuit)',
      'ESG Quick Scan (12 min, gratuit)',
      'Investment Readiness Score (10 min, gratuit)',
      'Checklist investisseurs (PDF téléchargeable)',
      'Template modèle financier (Excel téléchargeable)',
    ],
    tools: [
      '/tools/diagnostic-strategique',
      '/tools/evaluation-conformite-reglementaire',
      '/tools/diagnostic-esg-impact',
      '/tools/investment-readiness',
      'PDF checklist investisseurs',
      'Excel template modèle financier',
    ],
    cta: 'Obtenir mon diagnostic gratuit / Télécharger la checklist',
    conversionRate: '25% vers Étape 3',
    metrics: [
      'Nombre de diagnostics complétés/mois',
      'Taux de conversion visiteur → lead',
      'Coût d\'acquisition lead (CAC)',
      'Qualification des leads (score)',
    ],
  },
  {
    stage: 3,
    name: 'Services d\'Appel',
    description: 'Conversion des leads qualifiés vers des services payants à faible friction',
    tactics: [
      'Pré-Due Diligence (3-5 jours, sur devis)',
      'Project Viability Scan (5-7 jours, sur devis)',
      'ESG Quick Scan approfondi (sur devis)',
      'Financial Health Check (2-3 jours, sur devis)',
      'Appel découverte personnalisé (30 min, gratuit)',
    ],
    tools: [
      '/diagnostic-flash',
      '/tools/diagnostic-strategique',
      '/tools/diagnostic-esg-impact',
      '/tools/simulateur-financier',
      'Calendly appel découverte',
    ],
    cta: 'Réserver mon appel découverte / Commander mon pré-diagnostic',
    conversionRate: '30% vers Étape 4',
    metrics: [
      'Nombre d\'appels découverte/mois',
      'Taux de conversion lead → appel',
      'Taux de conversion appel → service d\'appel',
      'Revenus des services d\'appel',
    ],
  },
  {
    stage: 4,
    name: 'Conversion Premium',
    description: 'Conversion vers les 4 offres principales à valeur élevée',
    tactics: [
      'Due Diligence & Évaluation (mission complète)',
      'Études de Faisabilité Intégrées',
      'Structuration de Projets',
      'Investment Readiness (programme complet)',
      'Executive Advisory (rétainer mensuel)',
    ],
    tools: [
      '/services/due-diligence',
      '/services/etudes-faisabilite',
      '/services/structuration-projets',
      '/services/investment-readiness',
      'Proposition commerciale personnalisée',
    ],
    cta: 'Demander une proposition personnalisée',
    conversionRate: '40% de closing',
    metrics: [
      'Nombre de propositions envoyées/mois',
      'Taux de conversion proposition → mission',
      'Valeur moyenne des missions (ACV)',
      'Revenus mensuels récurrents (MRR)',
      'Lifetime Value client (LTV)',
    ],
  },
];

export const BRANDING = {
  positioning: {
    fr: 'Investment & ESG Advisory Boutique',
    en: 'Investment & ESG Advisory Boutique',
  },
  tagline: {
    fr: 'Vos décisions valent des millions. Structurez-les.',
    en: 'Your decisions are worth millions. Structure them.',
  },
  promise: {
    fr:
      'Du diagnostic au closing, nous sécurisons chaque décision d\'investissement et chaque projet en Afrique francophone. Spécialisés, pas généralistes. Terrain, pas théorie.',
    en:
      'From diagnosis to closing, we secure every investment decision and every project in Francophone Africa. Specialized, not generalist. Field-tested, not theoretical.',
  },
  differentiation: [
    {
      fr: 'Spécialisé investisseurs & projets — 4 offres uniquement',
      en: 'Specialized in investors & projects — 4 offers only',
    },
    {
      fr: '22 ans de terrain en Afrique francophone (UEMOA/CEMAC)',
      en: '22 years of field experience in Francophone Africa (WAEMU/CEMAC)',
    },
    {
      fr: 'Méthodologie Big Four adaptée au contexte africain',
      en: 'Big Four methodology adapted to the African context',
    },
    {
      fr: 'ROI mesurable dès le premier échange (diagnostics gratuits)',
      en: 'Measurable ROI from the first interaction (free diagnostics)',
    },
    {
      fr: 'Confidentialité absolue et indépendance totale',
      en: 'Absolute confidentiality and total independence',
    },
  ],
  toneOfVoice: [
    'Direct et sans jargon',
    'Orienté résultats et chiffres',
    'Expert mais accessible',
    'Confiant sans être arrogant',
    'Terrain avant théorie',
  ],
};

export const SIMPLIFIED_OFFERS = [
  {
    id: 'due-diligence',
    name: { fr: 'Due Diligence & Évaluation', en: 'Due Diligence & Valuation' },
    tagline: { fr: 'Décidez en toute sécurité', en: 'Decide with full confidence' },
    slug: '/services/due-diligence',
    target: { fr: 'Investisseurs PE/VC, fonds d\'impact, acquéreurs', en: 'PE/VC investors, impact funds, acquirers' },
    description: {
      fr: 'Due diligence pluridisciplinaire (financière, légale, technique, ESG) avec méthodologie Big Four adaptée au contexte africain.',
      en: 'Multidisciplinary due diligence with Big Four methodology adapted to the African context.',
    },
    icon: 'ri-search-eye-line',
    color: '#22a05a',
  },
  {
    id: 'feasibility',
    name: { fr: 'Études de Faisabilité Intégrées', en: 'Integrated Feasibility Studies' },
    tagline: { fr: 'Dossier clé-en-main pour comité de crédit', en: 'Turnkey package for credit committee' },
    slug: '/services/etudes-faisabilite',
    target: { fr: 'Investisseurs, fonds d\'impact, promoteurs de projets', en: 'Investors, impact funds, project developers' },
    description: {
      fr: 'Étude de faisabilité intégrée (technique, marché, financière, ESG) conforme aux standards BAD, BIDC et IFC.',
      en: 'Integrated feasibility study compliant with AfDB, BIDC and IFC standards.',
    },
    icon: 'ri-file-chart-line',
    color: '#c9a227',
  },
  {
    id: 'structuring',
    name: { fr: 'Structuration de Projets', en: 'Project Structuring' },
    tagline: { fr: 'Du concept au financement', en: 'From concept to financing' },
    slug: '/services/structuration-projets',
    target: { fr: 'Promoteurs industriels, agro-business, projets à fort impact', en: 'Industrial developers, agribusiness, high-impact projects' },
    description: {
      fr: 'Structuration complète de A à Z : montage juridique, modélisation financière, stratégie ESG, préparation au financement.',
      en: 'Complete structuring from A to Z: legal framework, financial modeling, ESG strategy, financing preparation.',
    },
    icon: 'ri-building-2-line',
    color: '#c9a227',
  },
  {
    id: 'readiness',
    name: { fr: 'Investment Readiness', en: 'Investment Readiness' },
    tagline: { fr: 'Levez des fonds en 90 à 180 jours', en: 'Raise funds in 90 to 180 days' },
    slug: '/services/investment-readiness',
    target: { fr: 'Startups en croissance, PME, entrepreneurs', en: 'Growing startups, SMEs, entrepreneurs' },
    description: {
      fr: 'Préparation complète à la levée de fonds : due diligence préparatoire, pitch deck, financial model, mise en relation investisseurs.',
      en: 'Complete fundraising preparation: preparatory due diligence, pitch deck, financial model, investor introductions.',
    },
    icon: 'ri-funds-line',
    color: '#22a05a',
  },
];