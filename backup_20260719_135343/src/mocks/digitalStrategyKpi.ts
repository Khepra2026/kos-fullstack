// =============================================================================
// KHEPRA EXPERTS — KPIs, CALENDRIER DE DÉPLOIEMENT ET STACK TECHNIQUE
// =============================================================================

export interface KPI {
  category: 'seo' | 'leads' | 'conversion' | 'ia-visibility' | 'linkedin' | 'revenue';
  metric: string;
  target: string;
  current?: string;
  timeline: string;
  measurementMethod: string;
}

export const KPIS: KPI[] = [
  {
    category: 'seo',
    metric: 'Trafic organique mensuel',
    target: '5 000 visiteurs/mois',
    current: '0',
    timeline: 'T0+12 mois',
    measurementMethod: 'Google Analytics 4 — canal organique',
  },
  {
    category: 'seo',
    metric: 'Mots-clés positionnés top 10',
    target: '10 mots-clés',
    current: '0',
    timeline: 'T0+12 mois',
    measurementMethod: 'Google Search Console + SEMrush',
  },
  {
    category: 'seo',
    metric: 'Score Core Web Vitals',
    target: 'Good sur les 3 indicateurs',
    current: 'À mesurer',
    timeline: 'T0+3 mois',
    measurementMethod: 'PageSpeed Insights + Search Console',
  },
  {
    category: 'leads',
    metric: 'Leads qualifiés générés/mois',
    target: '40 leads/mois',
    current: '0',
    timeline: 'T0+12 mois',
    measurementMethod: 'Formulaires + CRM (HubSpot)',
  },
  {
    category: 'leads',
    metric: 'Coût d\'acquisition lead (CAC)',
    target: '< €15 par lead',
    current: 'N/A',
    timeline: 'T0+12 mois',
    measurementMethod: 'Coût marketing / nombre de leads',
  },
  {
    category: 'leads',
    metric: 'Diagnostics gratuits complétés/mois',
    target: '100/mois',
    current: '0',
    timeline: 'T0+6 mois',
    measurementMethod: 'Analytics outils interactifs',
  },
  {
    category: 'conversion',
    metric: 'Taux de conversion visiteur → lead',
    target: '3%',
    current: '0%',
    timeline: 'T0+6 mois',
    measurementMethod: 'Leads / Visiteurs uniques',
  },
  {
    category: 'conversion',
    metric: 'Taux de conversion lead → appel découverte',
    target: '25%',
    current: '0%',
    timeline: 'T0+9 mois',
    measurementMethod: 'Appels / Leads qualifiés',
  },
  {
    category: 'conversion',
    metric: 'Taux de conversion appel → mission',
    target: '30%',
    current: '0%',
    timeline: 'T0+12 mois',
    measurementMethod: 'Missions signées / Propositions envoyées',
  },
  {
    category: 'ia-visibility',
    metric: 'Citations dans les réponses IA',
    target: '10 citations/mois',
    current: '0',
    timeline: 'T0+12 mois',
    measurementMethod: 'Monitoring manuel ChatGPT/Perplexity + tools',
  },
  {
    category: 'ia-visibility',
    metric: 'Pages GEO indexées',
    target: '6 pages FAQ/guides',
    current: '0',
    timeline: 'T0+6 mois',
    measurementMethod: 'Google Search Console',
  },
  {
    category: 'linkedin',
    metric: 'Followers LinkedIn',
    target: '5 000 followers',
    current: '0',
    timeline: 'T0+12 mois',
    measurementMethod: 'LinkedIn Analytics',
  },
  {
    category: 'linkedin',
    metric: 'Impressions/semaine',
    target: '10 000/semaine',
    current: '0',
    timeline: 'T0+6 mois',
    measurementMethod: 'LinkedIn Creator Analytics',
  },
  {
    category: 'linkedin',
    metric: 'Taux d\'engagement moyen',
    target: '4%',
    current: '0%',
    timeline: 'T0+6 mois',
    measurementMethod: '(Likes + Comments + Partages) / Impressions',
  },
  {
    category: 'revenue',
    metric: 'Revenus liés au digital (pipeline)',
    target: '€500K/an',
    current: '€0',
    timeline: 'T0+12 mois',
    measurementMethod: 'CRM — source "digital"',
  },
  {
    category: 'revenue',
    metric: 'Valeur moyenne des missions (ACV)',
    target: '€45K',
    current: '€0',
    timeline: 'T0+12 mois',
    measurementMethod: 'Chiffre d\'affaires / nombre de missions',
  },
];

export interface DeploymentPhase {
  month: number;
  name: string;
  focus: string;
  deliverables: string[];
  milestones: string[];
}

export const DEPLOYMENT_CALENDAR: DeploymentPhase[] = [
  {
    month: 1,
    name: 'Fondations',
    focus: 'Architecture technique et contenu initial',
    deliverables: [
      'Audit SEO technique complet',
      'Mise en place Google Analytics 4 + Search Console',
      'Publication des 10 pages SEO optimisées',
      'Mise en place schema.org sur toutes les pages',
      'Création compte LinkedIn Creator Mode',
    ],
    milestones: ['Site 100% indexable', 'Core Web Vitals "Good"', '10 pages live avec SEO complet'],
  },
  {
    month: 2,
    name: 'Contenu & LinkedIn',
    focus: 'Lancement production contenu et LinkedIn',
    deliverables: [
      '8 articles blog publiés',
      '12 posts LinkedIn publiés',
      'Mise en place newsletter Insights',
      'Lancement 4 outils diagnostics gratuits',
    ],
    milestones: ['1 000 visiteurs organiques/mois', '500 impressions LinkedIn/semaine', '20 leads générés'],
  },
  {
    month: 3,
    name: 'GEO & Autorité',
    focus: 'Contenu optimisé pour les IA',
    deliverables: [
      '3 pages FAQ expertes publiées',
      '2 guides complets publiés',
      '1 étude de cas détaillée',
      'Backlinks : 5 liens qualitatifs obtenus',
    ],
    milestones: ['Premières citations dans ChatGPT/Perplexity', '2 000 visiteurs organiques/mois', '50 leads générés'],
  },
  {
    month: 4,
    name: 'Conversion',
    focus: 'Optimisation du tunnel de conversion',
    deliverables: [
      'A/B testing CTAs sur les landing pages',
      'Amélioration des formulaires de capture',
      'Mise en place sequences email automation',
      'Retargeting LinkedIn + Meta',
    ],
    milestones: ['Taux de conversion visiteur → lead > 2%', '100 leads/mois', '5 appels découverte/mois'],
  },
  {
    month: 5,
    name: 'Expansion',
    focus: 'Nouveaux formats et canaux',
    deliverables: [
      'Lancement webinaires mensuels',
      'Podcast/audio content (3 épisodes)',
      'Whitepaper : "Investir en Afrique 2026"',
      'Partenariats médias 2 publications invitées',
    ],
    milestones: ['3 000 visiteurs organiques/mois', '2 000 followers LinkedIn', '150 leads/mois'],
  },
  {
    month: 6,
    name: 'Optimisation',
    focus: 'Analyse et ajustement',
    deliverables: [
      'Audit complet des KPIs T0+6',
      'Réallocation budget vers canaux performants',
      'Refonte des pages sous-performantes',
      'Lancement campagne SEA ciblée (€500/mois)',
    ],
    milestones: ['4 000 visiteurs organiques/mois', '3 000 followers LinkedIn', '200 leads/mois', '€50K pipeline digital'],
  },
  {
    month: 7,
    name: 'Événements',
    focus: 'Présence événementielle et networking',
    deliverables: [
      'Participation 2 conférences investisseurs Afrique',
      'Organisation 1 diner networking investisseurs',
      'Série "Rencontre avec un investisseur" (3 interviews)',
      'Lancement programme ambassadeur',
    ],
    milestones: ['4 500 visiteurs organiques/mois', '10 appels découverte/mois'],
  },
  {
    month: 8,
    name: 'Contenu Avancé',
    focus: 'Contenu premium et gated',
    deliverables: [
      'Lancement 2 ebooks premium (gated)',
      'Série vidéo "Les coulisses d\'une due diligence"',
      'Template premium : modèle financier avancé',
      'Benchmark sectoriel annuel',
    ],
    milestones: ['5 000 visiteurs organiques/mois', '4 000 followers LinkedIn', '250 leads/mois'],
  },
  {
    month: 9,
    name: 'Partenariats',
    focus: 'Partenariats stratégiques et co-marketing',
    deliverables: [
      'Partenariat 2 fonds d\'impact (co-content)',
      'Partenariat 1 banque régionale (co-webinaire)',
      'Guest posting 4 articles sur médias sectoriels',
      'Lancement programme referral clients',
    ],
    milestones: ['5 500 visiteurs organiques/mois', '5 000 followers LinkedIn', '300 leads/mois'],
  },
  {
    month: 10,
    name: 'International',
    focus: 'Expansion linguistique et géographique',
    deliverables: [
      'Version anglaise complète du site',
      'Contenu ciblant CEMAC (Cameroun, Gabon, Congo)',
      'SEO local : pages par pays UEMOA/CEMAC',
      'Campagne LinkedIn ciblée CEMAC',
    ],
    milestones: ['6 000 visiteurs organiques/mois', '30% trafic anglophone'],
  },
  {
    month: 11,
    name: 'Scaling',
    focus: 'Accélération et automatisation',
    deliverables: [
      'Automatisation complète du nurturing email',
      'Lancement chatbot IA qualification leads',
      'Campagnes SEA scaling (€1 500/mois)',
      'Recrutement 1 content manager',
    ],
    milestones: ['7 000 visiteurs organiques/mois', '6 000 followers LinkedIn', '400 leads/mois', '€300K pipeline digital'],
  },
  {
    month: 12,
    name: 'Excellence',
    focus: 'Consolidation et planification année 2',
    deliverables: [
      'Audit annuel complet + rapport ROI',
      'Plan stratégique année 2',
      'Lancement nouveau service (M&A Advisory)',
      'Marque personnelle fondateur : conférence TED-style',
    ],
    milestones: [
      '8 000+ visiteurs organiques/mois',
      '10 mots-clés top 10 Google',
      '500+ leads/mois',
      '€500K+ pipeline digital',
      'Leader de pensée reconnu sur LinkedIn Afrique',
    ],
  },
];

export const TOOLS_STACK = {
  analytics: [
    { name: 'Google Analytics 4', usage: 'Trafic, comportement, conversions' },
    { name: 'Google Search Console', usage: 'Indexation, mots-clés, Core Web Vitals' },
    { name: 'Google Tag Manager', usage: 'Gestion des tags et événements' },
  ],
  seo: [
    { name: 'SEMrush', usage: 'Recherche de mots-clés, audit, suivi positions' },
    { name: 'Screaming Frog', usage: 'Audit technique SEO' },
    { name: 'PageSpeed Insights', usage: 'Performance web' },
  ],
  social: [
    { name: 'LinkedIn Creator Mode', usage: 'Publication et analytics natifs' },
    { name: 'Canva Pro', usage: 'Création visuelle posts LinkedIn' },
    { name: 'Buffer / Hootsuite', usage: 'Planification posts' },
  ],
  crm: [
    { name: 'HubSpot CRM (gratuit)', usage: 'Gestion leads, nurturing, pipeline' },
    { name: 'Calendly', usage: 'Rendez-vous appels découverte' },
    { name: 'Typeform', usage: 'Formulaires diagnostics et captures' },
  ],
  content: [
    { name: 'Notion', usage: 'Planification éditoriale et knowledge base' },
    { name: 'Grammarly', usage: 'Correction et optimisation copy' },
    { name: 'Loom', usage: 'Vidéos explicatives et personnalisées' },
  ],
  ai: [
    { name: 'ChatGPT / Claude', usage: 'Idéation contenu, optimisation SEO' },
    { name: 'Perplexity', usage: 'Recherche et vérification faits' },
    { name: 'Surfer SEO', usage: 'Optimisation contenu on-page' },
  ],
};



