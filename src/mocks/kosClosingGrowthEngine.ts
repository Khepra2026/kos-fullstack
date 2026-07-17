// ============================================================================
// KOS CLOSING & GROWTH ENGINE™ — BLOC AUTONOME DE CLÔTURE
// 3 Systèmes Interconnectés :
//   1. Lead Magnet Engine — Aimant à Leads Dynamique
//   2. AI Closing Trigger — Déclencheur Intelligent 3 Niveaux
//   3. Auto-Evolution Engine — Moteur Auto-Évolutif
// Zéro dépendance API externe. Zéro dépendance Readdy AI.
// ============================================================================

// ═══════════════════════════════════════════════════════════════════
// TYPES — LEAD MAGNET ENGINE
// ═══════════════════════════════════════════════════════════════════

export type LeadMagnetType =
  | 'score-conformite'
  | 'diagnostic-agrement'
  | 'cartographie-risques'
  | 'modele-lcbft'
  | 'checklist-inspection'
  | 'simulateur-maturite'
  | 'rapport-benchmark'
  | 'roadmap-agrement';

export type VisitorSegment = 'banque' | 'sfd' | 'emf' | 'fintech' | 'assurance' | 'pme' | 'groupe' | 'institutionnel';

export type OutputFormat = 'pdf' | 'dashboard' | 'rapport' | 'plan-action';

export interface LeadMagnetRecommendation {
  id: string;
  type: LeadMagnetType;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  format: OutputFormat;
  timeToGenerate: string;
  questions: number;
  targetSegment: VisitorSegment[];
  conversionRate: number;
  avgScore: number;
  priority: 'P0' | 'P1' | 'P2';
  isActive: boolean;
  benefits: string[];
  deliverableDescription: string;
  kpiImpact: string;
}

export interface VisitorProfile {
  sessionId: string;
  segment: VisitorSegment;
  country: string;
  jurisdiction: 'UEMOA' | 'CEMAC' | 'OHADA' | 'Autre';
  pagesVisited: string[];
  timeOnSite: number;
  leadMagnetsDownloaded: string[];
  engagementScore: number;
  recommendedMagnets: string[];
  lastActive: string;
}

export interface LeadMagnetConversion {
  magnetId: string;
  magnetType: LeadMagnetType;
  views: number;
  downloads: number;
  conversionRate: number;
  leadsGenerated: number;
  avgTimeToConvert: string;
  revenueImpact: number;
  trend: 'up' | 'down' | 'stable';
}

// ═══════════════════════════════════════════════════════════════════
// TYPES — AI CLOSING TRIGGER
// ═══════════════════════════════════════════════════════════════════

export type ClosingLevel = 'niveau-1' | 'niveau-2' | 'niveau-3';
export type AlertAction = 'diagnostic-express' | 'entretien-strategique' | 'opportunite-crm' | 'notification-partner' | 'proposition-commerciale';

export interface ClosingTriggerRule {
  level: ClosingLevel;
  levelName: string;
  conditions: string[];
  thresholdTimeMinutes: number;
  thresholdPages: number;
  thresholdEngagement: number;
  thresholdDownloads: number;
  action: AlertAction;
  actionDescription: string;
  priority: 'P0' | 'P1' | 'P2';
  kpiTarget: string;
  icon: string;
  color: string;
}

export interface ClosingAlert {
  id: string;
  leadId: string;
  fullName: string;
  organization: string;
  sector: string;
  country: string;
  level: ClosingLevel;
  triggeredAt: string;
  conditionsMet: string[];
  engagementScore: number;
  pagesVisited: number;
  timeOnSiteMinutes: number;
  leadMagnetsDownloaded: number;
  action: AlertAction;
  actionStatus: 'pending' | 'executed' | 'converted' | 'dismissed';
  dealValue: number;
  assignedTo: string;
  notes: string;
  isNew: boolean;
}

export interface ClosingKPIs {
  visitorsToLeads: number;
  leadsToMeetings: number;
  meetingsToProposals: number;
  proposalsToSignature: number;
  totalLeadsThisMonth: number;
  totalMeetingsScheduled: number;
  totalProposalsSent: number;
  totalDealsClosed: number;
  pipelineValue: number;
  avgDealSize: number;
  avgTimeToClose: string;
}

// ═══════════════════════════════════════════════════════════════════
// TYPES — AUTO-EVOLUTION ENGINE
// ═══════════════════════════════════════════════════════════════════

export type ObservationSource =
  | 'logs-visiteurs'
  | 'crm'
  | 'analytics'
  | 'formulaires'
  | 'chatbots'
  | 'reseaux-sociaux'
  | 'veille-reglementaire'
  | 'oqs';

export type EvolutionPhase =
  | 'collecte'
  | 'analyse'
  | 'priorisation'
  | 'generation'
  | 'validation'
  | 'deploiement'
  | 'mesure'
  | 'reapprentissage';

export interface ObservationPayload {
  typeOpportunite: string;
  secteur: string;
  juridiction: string;
  scoreBusiness: number;
  scoreConversion: number;
  impactRevenu: number;
  actionsRecommandees: string[];
}

export interface EvolutionMutation {
  id: string;
  timestamp: string;
  source: ObservationSource;
  trigger: string;
  payload: ObservationPayload;
  phase: EvolutionPhase;
  status: 'pending' | 'approved' | 'deployed' | 'measured' | 'rolled_back';
  impact: {
    leadsGenerated: number;
    conversionLift: number;
    revenueImpact: number;
    seoImpact: number;
  };
  governance: {
    logged: boolean;
    versioned: boolean;
    audited: boolean;
    reversible: boolean;
    approvedBy: string;
    approvalDate: string;
  };
  fileChanges: string[];
  rollbackScript: string;
}

export interface EvolutionCycle {
  id: string;
  startDate: string;
  endDate: string;
  observationsCollected: number;
  mutationsGenerated: number;
  mutationsDeployed: number;
  conversionLift: number;
  revenueImpact: number;
  seoImpact: number;
  topInsight: string;
}

export interface EvolutionCapability {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  lastExecuted: string;
  frequency: string;
  impact: string;
  icon: string;
}

// ═══════════════════════════════════════════════════════════════════
// MOCK DATA — LEAD MAGNET ENGINE
// ═══════════════════════════════════════════════════════════════════

export const LEAD_MAGNET_RECOMMENDATIONS: LeadMagnetRecommendation[] = [
  {
    id: 'lm-score-conformite',
    type: 'score-conformite',
    title: 'Score de Conformité Réglementaire Instantané',
    subtitle: 'Votre score BCEAO/COBAC/BCRG en 8 minutes — 22 questions calibrées sur les dernières circulaires',
    description: 'Évaluez instantanément votre niveau de conformité réglementaire sur 5 piliers : Gouvernance, Ratios Prudentiels, LBC/FT, Cyber-résilience, et Reporting. Score sur 100 avec matrice comparative par secteur et juridiction.',
    icon: 'ri-shield-check-line',
    format: 'dashboard',
    timeToGenerate: '8 min',
    questions: 22,
    targetSegment: ['banque', 'sfd', 'emf', 'fintech'],
    conversionRate: 24.5,
    avgScore: 68,
    priority: 'P0',
    isActive: true,
    benefits: [
      'Score global sur 100 avec benchmark sectoriel',
      'Matrice 5×5 des risques par pilier',
      'Comparaison avec 250+ institutions de votre zone',
      'Plan d\'action priorisé automatiquement',
      'Rapport PDF exécutif prêt pour le COMEX',
    ],
    deliverableDescription: 'Dashboard interactif avec score global, heatmap des risques, benchmark sectoriel, et plan d\'action 90 jours téléchargeable en PDF.',
    kpiImpact: '+24.5% conversion visiteur → lead',
  },
  {
    id: 'lm-diagnostic-agrement',
    type: 'diagnostic-agrement',
    title: 'Diagnostic IA de Préparation à l\'Agrément',
    subtitle: 'Votre dossier d\'agrément est-il prêt ? 18 questions — scoring automatique des 6 domaines COBAC/BCEAO',
    description: 'Simulez le processus d\'évaluation de votre dossier d\'agrément avant de le déposer. 18 questions sur 6 domaines : Capital, Gouvernance, Business Plan, Procédures, LBC/FT, Infrastructure. Scoring par domaine avec pourcentage de complétude.',
    icon: 'ri-file-check-line',
    format: 'rapport',
    timeToGenerate: '10 min',
    questions: 18,
    targetSegment: ['sfd', 'emf', 'fintech'],
    conversionRate: 31.2,
    avgScore: 52,
    priority: 'P0',
    isActive: true,
    benefits: [
      'Évaluation 6 domaines avec score de complétude',
      'Détection automatique des pièces manquantes',
      'Checklist documentaire personnalisée',
      'Estimation du délai de recevabilité',
      'Recommandations par ordre de priorité réglementaire',
    ],
    deliverableDescription: 'Rapport de diagnostic personnalisé avec matrice de complétude 6 domaines, checklist documentaire, et feuille de route 90 jours.',
    kpiImpact: '+31.2% conversion visiteur → lead',
  },
  {
    id: 'lm-cartographie-risques',
    type: 'cartographie-risques',
    title: 'Cartographie des Risques Réglementaires',
    subtitle: 'Visualisez votre exposition en 12 minutes — Heatmap interactive 6×6 avec 36 scénarios de risques',
    description: 'Cartographiez automatiquement votre exposition aux risques réglementaires sur 6 catégories (Gouvernance, Conformité, Opérationnel, Crédit, Liquidité, Réputation) croisées avec 6 niveaux de sévérité. Heatmap interactive avec plans de mitigation.',
    icon: 'ri-radar-line',
    format: 'dashboard',
    timeToGenerate: '12 min',
    questions: 24,
    targetSegment: ['banque', 'sfd', 'assurance', 'institutionnel'],
    conversionRate: 19.8,
    avgScore: 45,
    priority: 'P1',
    isActive: true,
    benefits: [
      'Matrice 6×6 des risques avec scoring Probabilité × Impact',
      'Heatmap interactive avec zoom par catégorie',
      '36 scénarios de risques avec plans de mitigation',
      'Évolution du profil de risque sur 12 mois',
      'Export PDF prêt pour le Conseil d\'Administration',
    ],
    deliverableDescription: 'Dashboard interactif avec heatmap 6×6, 36 scénarios de risques documentés, tendances 12 mois, et plans de mitigation priorisés.',
    kpiImpact: '+19.8% conversion visiteur → lead',
  },
  {
    id: 'lm-modele-lcbft',
    type: 'modele-lcbft',
    title: 'Modèle de Politique LCB/FT',
    subtitle: 'Générez votre politique LCB/FT en 5 minutes — Template conforme GAFI/GIABA/GABAC + 12 pays',
    description: 'Générez automatiquement une politique LCB/FT adaptée à votre juridiction et type d\'institution. Template complet couvrant KYC, surveillance des transactions, déclarations de soupçons, formation, audit, et gouvernance LCB/FT.',
    icon: 'ri-file-text-line',
    format: 'pdf',
    timeToGenerate: '5 min',
    questions: 12,
    targetSegment: ['banque', 'sfd', 'emf', 'fintech', 'assurance'],
    conversionRate: 35.6,
    avgScore: 78,
    priority: 'P0',
    isActive: true,
    benefits: [
      'Template complet 45 pages prêt à l\'emploi',
      'Adapté à 12 juridictions UEMOA et CEMAC',
      'Conforme GAFI 40 Recommandations + GIABA/GABAC',
      'Checklist d\'auto-évaluation intégrée',
      'Mise à jour automatique lors des nouvelles directives',
    ],
    deliverableDescription: 'Document PDF de 45 pages incluant politique LCB/FT complète, procédures KYC, matrice d\'évaluation des risques, et plan de formation.',
    kpiImpact: '+35.6% conversion visiteur → lead',
  },
  {
    id: 'lm-checklist-inspection',
    type: 'checklist-inspection',
    title: 'Checklist d\'Inspection COBAC/BCEAO/BCRG',
    subtitle: 'Anticipez votre inspection — 127 points de contrôle couvrant 100% du périmètre d\'audit réglementaire',
    description: 'Checklist exhaustive de 127 points alignée sur les grilles d\'inspection officielles de la BCEAO (UEMOA), COBAC (CEMAC), et BCRG (Guinée). Auto-évaluez chaque point avec scoring et identification des gaps critiques.',
    icon: 'ri-clipboard-line',
    format: 'pdf',
    timeToGenerate: '15 min',
    questions: 30,
    targetSegment: ['banque', 'sfd', 'emf'],
    conversionRate: 28.4,
    avgScore: 61,
    priority: 'P0',
    isActive: true,
    benefits: [
      '127 points de contrôle structurés par domaine',
      'Alignement grilles officielles BCEAO/COBAC/BCRG',
      'Scoring automatique avec seuils d\'alerte',
      'Identification des points bloquants (rejet automatique)',
      'Plan de remédiation avec jalons réglementaires',
    ],
    deliverableDescription: 'Checklist PDF de 32 pages avec 127 points de contrôle, scoring automatique, gaps critiques identifiés, et plan de remédiation 45 jours.',
    kpiImpact: '+28.4% conversion visiteur → lead',
  },
  {
    id: 'lm-simulateur-maturite',
    type: 'simulateur-maturite',
    title: 'Simulateur de Maturité Conformité',
    subtitle: 'Où se situe votre institution ? 25 questions, 5 niveaux de maturité — Benchmark vs 500+ institutions',
    description: 'Évaluez votre maturité conformité sur une échelle de 1 à 5 (Initial → Optimisé) à travers 5 axes : Organisation, Processus, Technologie, Compétences, Culture. Benchmark automatique avec 500+ institutions de votre zone.',
    icon: 'ri-bar-chart-2-line',
    format: 'dashboard',
    timeToGenerate: '10 min',
    questions: 25,
    targetSegment: ['banque', 'sfd', 'fintech', 'assurance', 'pme'],
    conversionRate: 22.1,
    avgScore: 3.2,
    priority: 'P1',
    isActive: true,
    benefits: [
      'Score de maturité 1-5 sur 5 axes',
      'Benchmark avec 500+ institutions africaines',
      'Roadmap de progression par niveau',
      'Écart à la cible réglementaire calculé',
      'Recommandations personnalisées par axe',
    ],
    deliverableDescription: 'Dashboard interactif avec radar 5 axes, score de maturité global, benchmark sectoriel, et roadmap de progression.',
    kpiImpact: '+22.1% conversion visiteur → lead',
  },
  {
    id: 'lm-rapport-benchmark',
    type: 'rapport-benchmark',
    title: 'Rapport Benchmark Big Four vs Votre Institution',
    subtitle: 'Comment votre conformité se compare-t-elle aux standards Deloitte/PwC/EY/KPMG ? Analyse comparative détaillée',
    description: 'Rapport comparatif évaluant votre institution selon les 8 critères utilisés par les cabinets Big Four pour auditer la conformité réglementaire. Score comparé avec benchmarks anonymisés de 200+ institutions.',
    icon: 'ri-scales-3-line',
    format: 'rapport',
    timeToGenerate: '15 min',
    questions: 28,
    targetSegment: ['banque', 'sfd', 'institutionnel', 'groupe'],
    conversionRate: 18.7,
    avgScore: 55,
    priority: 'P2',
    isActive: true,
    benefits: [
      '8 critères Big Four de conformité évalués',
      'Comparaison avec 200+ institutions africaines',
      'Analyse des écarts avec recommandations',
      'Score de préparation à un audit Big Four',
      'Rapport exécutif 25 pages format cabinet',
    ],
    deliverableDescription: 'Rapport PDF exécutif 25 pages avec analyse comparative 8 critères, benchmark, écarts documentés, et plan d\'alignement Big Four.',
    kpiImpact: '+18.7% conversion visiteur → lead',
  },
  {
    id: 'lm-roadmap-agrement',
    type: 'roadmap-agrement',
    title: 'Roadmap d\'Agrément 90 Jours',
    subtitle: 'Votre plan d\'action personnalisé pour l\'agrément — De la constitution du dossier au dépôt officiel',
    description: 'Générez une roadmap séquencée sur 90 jours pour constituer et déposer votre dossier d\'agrément. Planning hebdomadaire avec livrables, jalons réglementaires, et alertes d\'échéance. Adapté à votre juridiction et type d\'institution.',
    icon: 'ri-road-map-line',
    format: 'plan-action',
    timeToGenerate: '8 min',
    questions: 15,
    targetSegment: ['sfd', 'emf', 'fintech'],
    conversionRate: 33.9,
    avgScore: 71,
    priority: 'P0',
    isActive: true,
    benefits: [
      'Roadmap 90 jours séquencée semaine par semaine',
      'Liste exhaustive des documents requis',
      'Jalons réglementaires avec dates butoirs',
      'Modèles et templates pour chaque livrable',
      'Alertes automatiques avant chaque échéance',
    ],
    deliverableDescription: 'Plan d\'action PDF 18 pages avec planning Gantt 90 jours, checklist documentaire, modèles, et calendrier des échéances réglementaires.',
    kpiImpact: '+33.9% conversion visiteur → lead',
  },
];

export const VISITOR_PROFILES: VisitorProfile[] = [
  {
    sessionId: 'sess-001',
    segment: 'banque',
    country: 'Côte d\'Ivoire',
    jurisdiction: 'UEMOA',
    pagesVisited: ['/industries/microfinance', '/blog/reforme-ratio-solvabilite-uemoa-2026', '/conformite-cemac', '/services/audit-pre-inspection-bceao', '/lead-magnets/checklist-conformite-bceao-cobac'],
    timeOnSite: 487,
    leadMagnetsDownloaded: ['checklist-conformite-bceao-cobac'],
    engagementScore: 82,
    recommendedMagnets: ['lm-checklist-inspection', 'lm-score-conformite', 'lm-rapport-benchmark'],
    lastActive: '2026-06-25T09:32:00Z',
  },
  {
    sessionId: 'sess-002',
    segment: 'sfd',
    country: 'Cameroun',
    jurisdiction: 'CEMAC',
    pagesVisited: ['/industries/microfinance', '/lead-magnets/simulateur-agrement-microfinance-cemac', '/cobac'],
    timeOnSite: 312,
    leadMagnetsDownloaded: [],
    engagementScore: 65,
    recommendedMagnets: ['lm-diagnostic-agrement', 'lm-roadmap-agrement', 'lm-modele-lcbft'],
    lastActive: '2026-06-25T10:15:00Z',
  },
  {
    sessionId: 'sess-003',
    segment: 'fintech',
    country: 'Sénégal',
    jurisdiction: 'UEMOA',
    pagesVisited: ['/blog/regulation-fintech-uemoa-2026-2027', '/services/agrement-fintech-etablissement-paiement', '/bceao', '/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026', '/tools/evaluation-maturite-fintech'],
    timeOnSite: 623,
    leadMagnetsDownloaded: ['diagnostic-flash-conformite-bceao-cobac-2026'],
    engagementScore: 91,
    recommendedMagnets: ['lm-roadmap-agrement', 'lm-simulateur-maturite', 'lm-cartographie-risques'],
    lastActive: '2026-06-25T08:45:00Z',
  },
  {
    sessionId: 'sess-004',
    segment: 'emf',
    country: 'Gabon',
    jurisdiction: 'CEMAC',
    pagesVisited: ['/industries/microfinance', '/cobac', '/conformite-gabac'],
    timeOnSite: 245,
    leadMagnetsDownloaded: [],
    engagementScore: 48,
    recommendedMagnets: ['lm-checklist-inspection', 'lm-diagnostic-agrement'],
    lastActive: '2026-06-25T11:02:00Z',
  },
  {
    sessionId: 'sess-005',
    segment: 'banque',
    country: 'Bénin',
    jurisdiction: 'UEMOA',
    pagesVisited: ['/bceao', '/blog/lbcft-nouvelles-exigences-gafi-2026', '/services/controle-interne-bancaire', '/lead-magnets/guide-bceao-2026', '/lead-magnets/simulation-risque-reglementaire', '/offre-commerciale'],
    timeOnSite: 745,
    leadMagnetsDownloaded: ['guide-bceao-2026', 'simulation-risque-reglementaire'],
    engagementScore: 95,
    recommendedMagnets: ['lm-modele-lcbft', 'lm-cartographie-risques', 'lm-score-conformite'],
    lastActive: '2026-06-25T09:58:00Z',
  },
  {
    sessionId: 'sess-006',
    segment: 'institutionnel',
    country: 'Burkina Faso',
    jurisdiction: 'UEMOA',
    pagesVisited: ['/gafi', '/ohada', '/services/regtech-regulatory-engineering'],
    timeOnSite: 198,
    leadMagnetsDownloaded: [],
    engagementScore: 38,
    recommendedMagnets: ['lm-rapport-benchmark', 'lm-simulateur-maturite'],
    lastActive: '2026-06-25T07:20:00Z',
  },
];

export const LEAD_MAGNET_CONVERSIONS: LeadMagnetConversion[] = [
  {
    magnetId: 'lm-modele-lcbft',
    magnetType: 'modele-lcbft',
    views: 845,
    downloads: 301,
    conversionRate: 35.6,
    leadsGenerated: 287,
    avgTimeToConvert: '4 min 32s',
    revenueImpact: 142500000,
    trend: 'up',
  },
  {
    magnetId: 'lm-roadmap-agrement',
    magnetType: 'roadmap-agrement',
    views: 612,
    downloads: 207,
    conversionRate: 33.9,
    leadsGenerated: 198,
    avgTimeToConvert: '6 min 15s',
    revenueImpact: 98500000,
    trend: 'up',
  },
  {
    magnetId: 'lm-diagnostic-agrement',
    magnetType: 'diagnostic-agrement',
    views: 723,
    downloads: 226,
    conversionRate: 31.2,
    leadsGenerated: 214,
    avgTimeToConvert: '7 min 48s',
    revenueImpact: 112300000,
    trend: 'up',
  },
  {
    magnetId: 'lm-checklist-inspection',
    magnetType: 'checklist-inspection',
    views: 534,
    downloads: 152,
    conversionRate: 28.4,
    leadsGenerated: 145,
    avgTimeToConvert: '9 min 12s',
    revenueImpact: 87400000,
    trend: 'stable',
  },
  {
    magnetId: 'lm-score-conformite',
    magnetType: 'score-conformite',
    views: 891,
    downloads: 218,
    conversionRate: 24.5,
    leadsGenerated: 198,
    avgTimeToConvert: '5 min 45s',
    revenueImpact: 105200000,
    trend: 'up',
  },
  {
    magnetId: 'lm-simulateur-maturite',
    magnetType: 'simulateur-maturite',
    views: 467,
    downloads: 103,
    conversionRate: 22.1,
    leadsGenerated: 97,
    avgTimeToConvert: '7 min 03s',
    revenueImpact: 52300000,
    trend: 'up',
  },
  {
    magnetId: 'lm-cartographie-risques',
    magnetType: 'cartographie-risques',
    views: 398,
    downloads: 79,
    conversionRate: 19.8,
    leadsGenerated: 74,
    avgTimeToConvert: '9 min 38s',
    revenueImpact: 41600000,
    trend: 'stable',
  },
  {
    magnetId: 'lm-rapport-benchmark',
    magnetType: 'rapport-benchmark',
    views: 312,
    downloads: 58,
    conversionRate: 18.7,
    leadsGenerated: 52,
    avgTimeToConvert: '10 min 54s',
    revenueImpact: 31800000,
    trend: 'up',
  },
];

export const LEAD_MAGNET_ENGINE_STATS = {
  totalViews: 4782,
  totalDownloads: 1344,
  avgConversionRate: 26.8,
  totalLeadsGenerated: 1265,
  totalRevenueImpact: 681500000,
  activeMagnets: 8,
  avgTimeToGenerate: '9 min 30s',
  topPerformer: 'lm-modele-lcbft',
  topConversionRate: 35.6,
  engineStatus: 'ACTIVE' as const,
  lastOptimization: '2026-06-25T06:00:00Z',
  segmentsCovered: 8,
  jurisdictionsCovered: 4,
};

// ═══════════════════════════════════════════════════════════════════
// MOCK DATA — AI CLOSING TRIGGER
// ═══════════════════════════════════════════════════════════════════

export const CLOSING_TRIGGER_RULES: ClosingTriggerRule[] = [
  {
    level: 'niveau-1',
    levelName: 'Prospect Qualifié',
    conditions: [
      'Temps passé > 4 minutes',
      '3 pages stratégiques consultées',
      'Téléchargement d\'un lead magnet',
    ],
    thresholdTimeMinutes: 4,
    thresholdPages: 3,
    thresholdEngagement: 50,
    thresholdDownloads: 1,
    action: 'diagnostic-express',
    actionDescription: 'Invitation automatique à une session Diagnostic Express — email + popup contextuel',
    priority: 'P2',
    kpiTarget: '15-25% conversion visiteur → lead',
    icon: 'ri-user-star-line',
    color: '#c9a227',
  },
  {
    level: 'niveau-2',
    levelName: 'Prospect à Forte Intention',
    conditions: [
      'Score d\'engagement > 70%',
      'Consultation des offres réglementaires',
      'Retour sur le site dans les 7 jours',
    ],
    thresholdTimeMinutes: 8,
    thresholdPages: 5,
    thresholdEngagement: 70,
    thresholdDownloads: 1,
    action: 'entretien-strategique',
    actionDescription: 'Proposition automatique d\'entretien stratégique avec un Partner — Calendly + email personnalisé',
    priority: 'P1',
    kpiTarget: '40-60% lead → rendez-vous',
    icon: 'ri-calendar-check-line',
    color: '#b45309',
  },
  {
    level: 'niveau-3',
    levelName: 'Opportunité Prioritaire',
    conditions: [
      'Demande d\'agrément ou projet de transformation',
      'Consultation répétée des pages conformité',
      'Score d\'engagement > 85%',
    ],
    thresholdTimeMinutes: 12,
    thresholdPages: 7,
    thresholdEngagement: 85,
    thresholdDownloads: 2,
    action: 'opportunite-crm',
    actionDescription: 'Création automatique d\'opportunité CRM + notification Partner + préparation proposition commerciale',
    priority: 'P0',
    kpiTarget: '60-80% rendez-vous → proposition, 30-50% proposition → signature',
    icon: 'ri-fire-line',
    color: '#dc2626',
  },
];

export const CLOSING_ALERTS: ClosingAlert[] = [
  {
    id: 'alert-001',
    leadId: 'lead-sess-005',
    fullName: 'Marcel GANDAHO',
    organization: 'Banque Atlantique Bénin',
    sector: 'Banque',
    country: 'Bénin',
    level: 'niveau-3',
    triggeredAt: '2026-06-25T09:58:12Z',
    conditionsMet: [
      'Score d\'engagement 95%',
      '6 pages stratégiques visitées',
      '2 lead magnets téléchargés',
      'Consultation offre commerciale',
    ],
    engagementScore: 95,
    pagesVisited: 6,
    timeOnSiteMinutes: 12.4,
    leadMagnetsDownloaded: 2,
    action: 'opportunite-crm',
    actionStatus: 'pending',
    dealValue: 385000000,
    assignedTo: 'KOS Account Executive Agent™',
    notes: 'Prospect niveau 3 — A visité offre commerciale + 2 lead magnets + article LBC/FT. Proposition en cours de génération.',
    isNew: true,
  },
  {
    id: 'alert-002',
    leadId: 'lead-sess-003',
    fullName: 'Aminata SOW',
    organization: 'WavePay Technologies',
    sector: 'FinTech',
    country: 'Sénégal',
    level: 'niveau-2',
    triggeredAt: '2026-06-25T08:45:30Z',
    conditionsMet: [
      'Score d\'engagement 91%',
      '5 pages stratégiques visitées',
      'Diagnostic Flash téléchargé',
      'Retour site dans les 7 jours',
    ],
    engagementScore: 91,
    pagesVisited: 5,
    timeOnSiteMinutes: 10.4,
    leadMagnetsDownloaded: 1,
    action: 'entretien-strategique',
    actionStatus: 'executed',
    dealValue: 145000000,
    assignedTo: 'Dr. Jean-Marc BOKA',
    notes: 'Calendly envoyé — 3 créneaux proposés semaine du 30 Juin. Relance J+3 si pas de réponse.',
    isNew: false,
  },
  {
    id: 'alert-003',
    leadId: 'lead-sess-001',
    fullName: 'Dr. Amadou KONÉ',
    organization: 'SFD Avenir Plus CI',
    sector: 'Microfinance',
    country: 'Côte d\'Ivoire',
    level: 'niveau-1',
    triggeredAt: '2026-06-25T09:32:45Z',
    conditionsMet: [
      'Temps passé 8.1 min',
      '5 pages stratégiques visitées',
      'Lead magnet checklist téléchargé',
    ],
    engagementScore: 82,
    pagesVisited: 5,
    timeOnSiteMinutes: 8.1,
    leadMagnetsDownloaded: 1,
    action: 'diagnostic-express',
    actionStatus: 'executed',
    dealValue: 210000000,
    assignedTo: 'KOS Lead Nurturing Agent™',
    notes: 'Invitation Diagnostic Express envoyée. Proposition score conformité BCEAO. Relance J+5.',
    isNew: false,
  },
  {
    id: 'alert-004',
    leadId: 'lead-sess-002',
    fullName: 'Jean-Marc NDONG',
    organization: 'EMF Avenir Gabon',
    sector: 'Microfinance',
    country: 'Gabon',
    level: 'niveau-1',
    triggeredAt: '2026-06-25T10:15:22Z',
    conditionsMet: [
      'Temps passé 5.2 min',
      '3 pages stratégiques visitées',
      'Pages agrément COBAC consultées',
    ],
    engagementScore: 65,
    pagesVisited: 3,
    timeOnSiteMinutes: 5.2,
    leadMagnetsDownloaded: 0,
    action: 'diagnostic-express',
    actionStatus: 'pending',
    dealValue: 95000000,
    assignedTo: 'KOS Lead Nurturing Agent™',
    notes: 'Intérêt agrément CEMAC détecté. Lead magnet simulateur agrément recommandé. Email nurturing en cours.',
    isNew: true,
  },
  {
    id: 'alert-005',
    leadId: 'lead-ext-001',
    fullName: 'Fatoumata DIALLO',
    organization: 'Groupe Bancaire Panafricain',
    sector: 'Banque',
    country: 'Sénégal',
    level: 'niveau-3',
    triggeredAt: '2026-06-24T16:45:00Z',
    conditionsMet: [
      'Score d\'engagement 92%',
      '8 pages stratégiques visitées',
      '3 lead magnets téléchargés',
      '3 retours en 7 jours',
      'Demande d\'audit LBC/FT',
    ],
    engagementScore: 92,
    pagesVisited: 8,
    timeOnSiteMinutes: 18.2,
    leadMagnetsDownloaded: 3,
    action: 'proposition-commerciale',
    actionStatus: 'executed',
    dealValue: 520000000,
    assignedTo: 'Ibrahim KONE — Partner BU1',
    notes: 'Opportunité CRM créée. Proposition LBC/FT + Audit Conformité envoyée. RDV COMEX planifié 28 Juin.',
    isNew: false,
  },
  {
    id: 'alert-006',
    leadId: 'lead-ext-002',
    fullName: 'Pierre-Claver OUEDRAOGO',
    organization: 'Ministère des Finances Burkina Faso',
    sector: 'Public',
    country: 'Burkina Faso',
    level: 'niveau-2',
    triggeredAt: '2026-06-24T14:20:00Z',
    conditionsMet: [
      'Score d\'engagement 78%',
      '7 pages stratégiques visitées',
      'Retour site dans les 7 jours',
      'Pages OHADA + régulation consultées',
    ],
    engagementScore: 78,
    pagesVisited: 7,
    timeOnSiteMinutes: 11.5,
    leadMagnetsDownloaded: 1,
    action: 'entretien-strategique',
    actionStatus: 'converted',
    dealValue: 320000000,
    assignedTo: 'Dr. Célestine KOFFI — Partner BU4',
    notes: 'Entretien stratégique converti. Mandat transformation digitale reporting signé. Démarrage 1er Juillet.',
    isNew: false,
  },
];

export const CLOSING_KPIS: ClosingKPIs = {
  visitorsToLeads: 22.8,
  leadsToMeetings: 48.5,
  meetingsToProposals: 72.3,
  proposalsToSignature: 42.1,
  totalLeadsThisMonth: 347,
  totalMeetingsScheduled: 42,
  totalProposalsSent: 28,
  totalDealsClosed: 15,
  pipelineValue: 2150000000,
  avgDealSize: 143333333,
  avgTimeToClose: '18 jours',
};

export const CLOSING_ENGINE_STATS = {
  engineStatus: 'ACTIVE' as const,
  alertsToday: 6,
  newAlerts: 2,
  alertsPending: 2,
  alertsExecuted: 3,
  alertsConverted: 1,
  level1Alerts: 2,
  level2Alerts: 2,
  level3Alerts: 2,
  totalDealValueTracked: 1675000000,
  conversionLiftSinceActivation: 34.2,
  avgResponseTime: '2 min 45s',
  lastScan: '2026-06-25T11:30:00Z',
};

// ═══════════════════════════════════════════════════════════════════
// MOCK DATA — AUTO-EVOLUTION ENGINE
// ═══════════════════════════════════════════════════════════════════

export const OBSERVATION_SOURCES: { id: ObservationSource; name: string; icon: string; isActive: boolean; eventsPerDay: number; lastSync: string; dataPoints: number }[] = [
  { id: 'logs-visiteurs', name: 'Logs Visiteurs', icon: 'ri-eye-line', isActive: true, eventsPerDay: 8450, lastSync: '2026-06-25T11:30:00Z', dataPoints: 287000 },
  { id: 'crm', name: 'CRM HubSpot', icon: 'ri-database-2-line', isActive: true, eventsPerDay: 1240, lastSync: '2026-06-25T11:25:00Z', dataPoints: 45200 },
  { id: 'analytics', name: 'Google Analytics', icon: 'ri-bar-chart-line', isActive: true, eventsPerDay: 12800, lastSync: '2026-06-25T11:28:00Z', dataPoints: 458000 },
  { id: 'formulaires', name: 'Formulaires Site', icon: 'ri-survey-line', isActive: true, eventsPerDay: 380, lastSync: '2026-06-25T11:30:00Z', dataPoints: 12400 },
  { id: 'chatbots', name: 'Chatbots KOS', icon: 'ri-chat-3-line', isActive: true, eventsPerDay: 520, lastSync: '2026-06-25T11:29:00Z', dataPoints: 18900 },
  { id: 'reseaux-sociaux', name: 'Réseaux Sociaux', icon: 'ri-share-line', isActive: true, eventsPerDay: 2150, lastSync: '2026-06-25T11:15:00Z', dataPoints: 78200 },
  { id: 'veille-reglementaire', name: 'Veille Réglementaire', icon: 'ri-scales-line', isActive: true, eventsPerDay: 85, lastSync: '2026-06-25T11:00:00Z', dataPoints: 3200 },
  { id: 'oqs', name: 'Observatoire Qualité Services', icon: 'ri-radar-line', isActive: true, eventsPerDay: 420, lastSync: '2026-06-25T11:30:00Z', dataPoints: 15400 },
];

export const EVOLUTION_MUTATIONS: EvolutionMutation[] = [
  {
    id: 'MUT-2026-06-25-001',
    timestamp: '2026-06-25T06:15:00Z',
    source: 'oqs',
    trigger: 'Hausse 340% trafic CEMAC + Microfinance — Taux rebond 68%',
    payload: {
      typeOpportunite: 'Lead Magnet CEMAC',
      secteur: 'Microfinance',
      juridiction: 'CEMAC',
      scoreBusiness: 92,
      scoreConversion: 88,
      impactRevenu: 245000000,
      actionsRecommandees: [
        'Créer simulateur agrément microfinance CEMAC',
        'Ajouter section CEMAC dédiée page microfinance',
        'Générer 3 articles SEO zone CEMAC',
        'Cross-linker depuis page COBAC',
      ],
    },
    phase: 'mesure',
    status: 'deployed',
    impact: {
      leadsGenerated: 214,
      conversionLift: 22.5,
      revenueImpact: 245000000,
      seoImpact: 15.2,
    },
    governance: {
      logged: true,
      versioned: true,
      audited: true,
      reversible: true,
      approvedBy: 'KOS Auto-Evolution Engine™',
      approvalDate: '2026-06-25T06:18:00Z',
    },
    fileChanges: [
      'src/mocks/leadMagnets.ts',
      'src/pages/lead-magnets/simulateur-agrement-microfinance-cemac/page.tsx',
      'src/pages/industries/microfinance/page.tsx',
      'src/pages/lead-magnets/page.tsx',
    ],
    rollbackScript: 'git revert MUT-2026-06-25-001',
  },
  {
    id: 'MUT-2026-06-24-003',
    timestamp: '2026-06-24T14:30:00Z',
    source: 'analytics',
    trigger: 'Taux rebond page services 62% — CTA non visible sur mobile',
    payload: {
      typeOpportunite: 'Optimisation UX Mobile',
      secteur: 'Services Financiers',
      juridiction: 'UEMOA',
      scoreBusiness: 65,
      scoreConversion: 78,
      impactRevenu: 85000000,
      actionsRecommandees: [
        'Repositionner CTA en sticky footer mobile',
        'Réduire temps chargement page services',
        'Ajouter preuve sociale au-dessus CTA',
      ],
    },
    phase: 'mesure',
    status: 'deployed',
    impact: {
      leadsGenerated: 87,
      conversionLift: 12.8,
      revenueImpact: 85000000,
      seoImpact: 4.5,
    },
    governance: {
      logged: true,
      versioned: true,
      audited: true,
      reversible: true,
      approvedBy: 'KOS Auto-Evolution Engine™',
      approvalDate: '2026-06-24T14:35:00Z',
    },
    fileChanges: [
      'src/pages/services/page.tsx',
      'src/components/feature/StickyFloatingCTA.tsx',
    ],
    rollbackScript: 'git revert MUT-2026-06-24-003',
  },
  {
    id: 'MUT-2026-06-24-001',
    timestamp: '2026-06-24T09:00:00Z',
    source: 'veille-reglementaire',
    trigger: 'Nouvelle directive COBAC 2027 — Résilience Opérationnelle publiée',
    payload: {
      typeOpportunite: 'Contenu SEO Urgent',
      secteur: 'Banque',
      juridiction: 'CEMAC',
      scoreBusiness: 95,
      scoreConversion: 72,
      impactRevenu: 185000000,
      actionsRecommandees: [
        'Article cybersécurité bancaire COBAC 2027',
        'Lead magnet checklist résilience opérationnelle',
        'Mise à jour page COBAC avec nouvelle directive',
        'LinkedIn post + newsletter regulatory pulse',
      ],
    },
    phase: 'mesure',
    status: 'deployed',
    impact: {
      leadsGenerated: 156,
      conversionLift: 18.3,
      revenueImpact: 185000000,
      seoImpact: 24.8,
    },
    governance: {
      logged: true,
      versioned: true,
      audited: true,
      reversible: true,
      approvedBy: 'KOS Auto-Evolution Engine™',
      approvalDate: '2026-06-24T09:03:00Z',
    },
    fileChanges: [
      'src/pages/blog/cybersecurite-bancaire-directive-cobac-2027-resilience-operationnelle/page.tsx',
      'src/pages/cobac/page.tsx',
    ],
    rollbackScript: 'git revert MUT-2026-06-24-001',
  },
  {
    id: 'MUT-2026-06-23-002',
    timestamp: '2026-06-23T11:45:00Z',
    source: 'formulaires',
    trigger: 'Formulaire contact — 45% abandons au champ téléphone',
    payload: {
      typeOpportunite: 'Optimisation Formulaire',
      secteur: 'Tous',
      juridiction: 'Tous',
      scoreBusiness: 55,
      scoreConversion: 92,
      impactRevenu: 42000000,
      actionsRecommandees: [
        'Rendre champ téléphone optionnel',
        'Réduire formulaire de 7 à 5 champs',
        'Ajouter indicateur de progression',
      ],
    },
    phase: 'mesure',
    status: 'deployed',
    impact: {
      leadsGenerated: 124,
      conversionLift: 28.5,
      revenueImpact: 42000000,
      seoImpact: 0,
    },
    governance: {
      logged: true,
      versioned: true,
      audited: true,
      reversible: true,
      approvedBy: 'KOS Auto-Evolution Engine™',
      approvalDate: '2026-06-23T11:48:00Z',
    },
    fileChanges: [
      'src/pages/contact/page.tsx',
      'src/components/feature/ServiceContactForm.tsx',
    ],
    rollbackScript: 'git revert MUT-2026-06-23-002',
  },
  {
    id: 'MUT-2026-06-25-002',
    timestamp: '2026-06-25T08:00:00Z',
    source: 'chatbots',
    trigger: '72% questions chatbots portent sur « agrément microfinance » — aucun lead magnet lié',
    payload: {
      typeOpportunite: 'Lead Magnet + Page',
      secteur: 'Microfinance',
      juridiction: 'UEMOA',
      scoreBusiness: 88,
      scoreConversion: 85,
      impactRevenu: 158000000,
      actionsRecommandees: [
        'Créer guide FAQ agrément microfinance UEMOA',
        'Lier chatbot → lead magnet agrément',
        'Ajouter popup contextuel page microfinance',
      ],
    },
    phase: 'generation',
    status: 'approved',
    impact: {
      leadsGenerated: 0,
      conversionLift: 0,
      revenueImpact: 158000000,
      seoImpact: 8.2,
    },
    governance: {
      logged: true,
      versioned: true,
      audited: true,
      reversible: true,
      approvedBy: 'KOS Auto-Evolution Engine™',
      approvalDate: '2026-06-25T08:02:00Z',
    },
    fileChanges: [
      'En attente de génération — src/pages/lead-magnets/guide-agrement-microfinance-uemoa/page.tsx',
    ],
    rollbackScript: 'git revert MUT-2026-06-25-002',
  },
];

export const EVOLUTION_CYCLES: EvolutionCycle[] = [
  {
    id: 'cycle-024',
    startDate: '2026-06-18',
    endDate: '2026-06-25',
    observationsCollected: 187450,
    mutationsGenerated: 8,
    mutationsDeployed: 5,
    conversionLift: 12.4,
    revenueImpact: 557000000,
    seoImpact: 9.8,
    topInsight: 'Les contenus CEMAC convertissent 2.1x mieux que la moyenne — expansion zone prioritaire',
  },
  {
    id: 'cycle-023',
    startDate: '2026-06-11',
    endDate: '2026-06-18',
    observationsCollected: 172300,
    mutationsGenerated: 6,
    mutationsDeployed: 4,
    conversionLift: 9.2,
    revenueImpact: 385000000,
    seoImpact: 7.5,
    topInsight: 'Le format « simulateur » a un taux de complétion 3x supérieur au format « PDF statique »',
  },
];

export const EVOLUTION_CAPABILITIES: EvolutionCapability[] = [
  {
    id: 'cap-pages-sectorielles',
    name: 'Création Auto Pages Sectorielles',
    description: 'Détecte les lacunes de contenu par secteur et génère automatiquement des pages optimisées SEO/GEO',
    isActive: true,
    lastExecuted: '2026-06-25T05:00:00Z',
    frequency: 'Quotidien',
    impact: '+12 pages sectorielles/mois, +28% trafic organique',
    icon: 'ri-pages-line',
  },
  {
    id: 'cap-lead-magnets',
    name: 'Lead Magnets Spécialisés',
    description: 'Analyse les signaux OQS et génère des lead magnets ciblés par juridiction et secteur',
    isActive: true,
    lastExecuted: '2026-06-25T06:00:00Z',
    frequency: 'Hebdomadaire',
    impact: '+3 lead magnets/mois, +35% conversion',
    icon: 'ri-download-cloud-2-line',
  },
  {
    id: 'cap-seo-content',
    name: 'Génération Contenu SEO',
    description: 'Produit automatiquement des articles optimisés sur les mots-clés à fort potentiel détectés',
    isActive: true,
    lastExecuted: '2026-06-25T04:00:00Z',
    frequency: 'Quotidien',
    impact: '+25 articles/mois, +42% mots-clés Top 10',
    icon: 'ri-article-line',
  },
  {
    id: 'cap-ux-optimization',
    name: 'Optimisation UX',
    description: 'Analyse les heatmaps et comportements pour optimiser les tunnels de conversion',
    isActive: true,
    lastExecuted: '2026-06-24T18:00:00Z',
    frequency: 'Hebdomadaire',
    impact: '-28% taux rebond, +15% temps sur site',
    icon: 'ri-layout-4-line',
  },
  {
    id: 'cap-cta-improvement',
    name: 'Amélioration des CTA',
    description: 'Test A/B automatique des call-to-action avec optimisation du wording, couleur et position',
    isActive: true,
    lastExecuted: '2026-06-25T02:00:00Z',
    frequency: 'Quotidien',
    impact: '+22% taux de clic CTA',
    icon: 'ri-cursor-line',
  },
  {
    id: 'cap-menu-reorg',
    name: 'Réorganisation des Menus',
    description: 'Réorganise dynamiquement la navigation selon les patterns de navigation détectés',
    isActive: true,
    lastExecuted: '2026-06-23T12:00:00Z',
    frequency: 'Mensuel',
    impact: '+18% pages vues par session',
    icon: 'ri-menu-line',
  },
  {
    id: 'cap-gap-detection',
    name: 'Détection Lacunes d\'Offres',
    description: 'Identifie les offres manquantes par analyse des recherches internes et externes',
    isActive: true,
    lastExecuted: '2026-06-25T07:00:00Z',
    frequency: 'Quotidien',
    impact: '+4 nouvelles offres/mois',
    icon: 'ri-search-eye-line',
  },
  {
    id: 'cap-packages',
    name: 'Création Packages KHEPRA',
    description: 'Assemble automatiquement des packages de services basés sur les signaux de demande',
    isActive: true,
    lastExecuted: '2026-06-24T15:00:00Z',
    frequency: 'Mensuel',
    impact: '+2 packages/mois, +45% panier moyen',
    icon: 'ri-stack-line',
  },
];

export const AUTO_EVOLUTION_STATS = {
  engineStatus: 'ACTIVE' as const,
  totalCyclesCompleted: 24,
  totalMutationsDeployed: 147,
  totalRevenueImpact: 4250000000,
  avgConversionLift: 11.8,
  observationsProcessed: 4580000,
  activeSources: 8,
  mutationsPending: 3,
  mutationsApproved: 1,
  mutationsInGeneration: 1,
  lastFullCycle: '2026-06-25T06:00:00Z',
  nextFullCycle: '2026-06-26T06:00:00Z',
  governanceCompliance: 100,
};