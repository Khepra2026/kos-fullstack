export interface OperatingSOP {
  num: number;
  title: string;
  icon: string;
  items: string[];
  note?: string;
  steps?: string[];
  inputs?: string[];
  output?: string;
  example?: string;
  triggers?: string[];
  structure?: string[];
  types?: string[];
  process?: string[];
  actions?: string[];
  sources?: string[];
  frequency?: string;
  criteria?: string[];
  validation?: string;
  formats?: string[];
  cycle?: string[];
  livrables?: string[];
  content?: string[];
  mesures?: string[];
  kpis?: string[];
  niveaux?: { level: string; desc: string }[];
}

export const operatingManualIntro = {
  title: 'KOS Operating Manual™',
  subtitle: 'Manuel Opérationnel Global',
  version: 'VERSION EXECUTION – BIG FOUR STANDARD',
  preamble: 'Ce manuel définit les procédures opérationnelles standard (SOP) permettant à KOS de fonctionner comme un système de conseil autonome structuré. Il transforme les moteurs KOS, les agents experts et l\'architecture technique en processus exécutables.',
};

export const operationalLayers: { num: number; title: string; icon: string; desc: string }[] = [
  { num: 1, title: 'Acquisition', icon: 'ri-user-add-line', desc: 'Leads et requêtes entrantes' },
  { num: 2, title: 'Qualification', icon: 'ri-filter-line', desc: 'Scoring et diagnostic' },
  { num: 3, title: 'Analyse', icon: 'ri-brain-line', desc: 'Traitement multi-agents' },
  { num: 4, title: 'Production', icon: 'ri-file-list-3-line', desc: 'Rapports et recommandations' },
  { num: 5, title: 'Conversion', icon: 'ri-hand-heart-line', desc: 'RDV et offres' },
  { num: 6, title: 'Capitalisation', icon: 'ri-archive-line', desc: 'Knowledge base' },
];

export const operatingSOPs: OperatingSOP[] = [
  {
    num: 1,
    title: 'Traitement d\'une Demande Utilisateur',
    icon: 'ri-chat-3-line',
    items: [],
    steps: [
      'Identification du besoin',
      'Classification (stratégique / opérationnel / urgent)',
      'Attribution des agents',
      'Activation du Knowledge Graph',
      'Génération de réponse structurée',
      'Vérification qualité ≥ 95',
      'Proposition de prochaine étape',
    ],
  },
  {
    num: 2,
    title: 'Qualification Lead',
    icon: 'ri-user-search-line',
    items: [],
    inputs: ['Secteur', 'Taille', 'Problématique', 'Urgence', 'Budget estimé'],
    process: ['Lead Scoring Engine — calcul du score 0-100', 'Classification Cold / Warm / Hot', 'Détection d\'opportunité commerciale'],
    output: 'Fiche prospect enrichie · Score 0-100 · Recommandation d\'action',
  },
  {
    num: 3,
    title: 'Routage Multi-Agents',
    icon: 'ri-git-branch-line',
    items: [
      'Une demande complexe active plusieurs agents',
      'Chaque agent produit une analyse indépendante',
      'Le Global Orchestrator consolide',
    ],
    example: 'Demande financement → Finance Agent + Legal Agent + Tax Agent + Strategy Agent',
  },
  {
    num: 4,
    title: 'Production d\'un Diagnostic',
    icon: 'ri-stethoscope-line',
    items: [],
    structure: ['Contexte', 'Analyse', 'Benchmark', 'Risques', 'Opportunités', 'Recommandations', 'Plan d\'action'],
    note: 'Standard : Cabinet Big Four.',
  },
  {
    num: 5,
    title: 'Génération de Rapport',
    icon: 'ri-file-text-line',
    items: [],
    types: ['Audit Report', 'Financial Report', 'ESG Report', 'Risk Report', 'Strategy Report'],
    structure: ['Executive Summary', 'Findings', 'Analysis', 'Recommendations', 'Appendices'],
  },
  {
    num: 6,
    title: 'Conversion en Rendez-Vous',
    icon: 'ri-calendar-line',
    items: [],
    triggers: ['Diagnostic complet fourni', 'Valeur démontrée', 'Problème identifié'],
    note: '« Souhaitez-vous approfondir ce diagnostic avec un expert Khepra ? » — Proposition douce, jamais imposée.',
  },
  {
    num: 7,
    title: 'Mise à Jour Connaissances',
    icon: 'ri-refresh-line',
    items: [],
    sources: ['Institutions officielles', 'Normes internationales', 'Cabinets reconnus', 'Publications académiques'],
    frequency: 'Quotidienne',
  },
  {
    num: 8,
    title: 'Contrôle Qualité',
    icon: 'ri-check-double-line',
    items: [],
    criteria: ['Exactitude', 'Clarté', 'Pertinence', 'Actionnabilité', 'Conformité'],
    validation: 'Score ≥ 95 obligatoire. Tout livrable inférieur est bloqué.',
  },
  {
    num: 9,
    title: 'Gestion des Risques',
    icon: 'ri-alert-line',
    items: [],
    process: ['Identification du risque', 'Classification', 'Évaluation impact/probabilité', 'Plan de mitigation'],
  },
  {
    num: 10,
    title: 'Production de Contenu',
    icon: 'ri-megaphone-line',
    items: [],
    formats: ['Articles', 'Études', 'Posts LinkedIn', 'Newsletters', 'Rapports'],
    note: 'Standard : Think Tank + Cabinet international.',
  },
  {
    num: 11,
    title: 'Gestion Client',
    icon: 'ri-user-heart-line',
    items: [],
    cycle: ['Acquisition', 'Onboarding', 'Mission', 'Livraison', 'Suivi'],
  },
  {
    num: 12,
    title: 'Gestion Documentaire',
    icon: 'ri-folder-open-line',
    items: [],
    actions: ['Classification', 'Indexation', 'Stockage', 'Versioning', 'Récupération'],
  },
  {
    num: 13,
    title: 'Escalade',
    icon: 'ri-arrow-up-circle-line',
    items: [],
    niveaux: [
      { level: 'Niveau 1', desc: 'Agent IA — Résolution autonome' },
      { level: 'Niveau 2', desc: 'Multi-agents — Collaboration' },
      { level: 'Niveau 3', desc: 'Orchestrateur — Arbitrage' },
      { level: 'Niveau 4', desc: 'Governance Council — Décision suprême' },
    ],
  },
  {
    num: 14,
    title: 'Gestion Incident',
    icon: 'ri-shield-flash-line',
    items: [],
    types: ['Erreur IA', 'Données incorrectes', 'Incohérence', 'Faille logique'],
    note: 'Action immédiate : blocage + correction + audit.',
  },
  {
    num: 15,
    title: 'Capitalisation Connaissance',
    icon: 'ri-lightbulb-flash-line',
    items: [
      'Un apprentissage documenté',
      'Une mise à jour de la knowledge base',
      'Une amélioration des prompts',
    ],
    note: 'Chaque interaction enrichit le système.',
  },
  {
    num: 16,
    title: 'Préparation RDV Client',
    icon: 'ri-user-voice-line',
    items: [],
    livrables: ['Fiche client', 'Enjeux identifiés', 'Risques', 'Opportunités', 'Questions stratégiques'],
  },
  {
    num: 17,
    title: 'Proposition Commerciale',
    icon: 'ri-file-list-2-line',
    items: [],
    content: ['Scope', 'Méthodologie', 'Livrables', 'Planning', 'ROI estimé'],
  },
  {
    num: 18,
    title: 'Suivi Post-Mission',
    icon: 'ri-bar-chart-2-line',
    items: [],
    mesures: ['Satisfaction client', 'ROI mesuré', 'Valeur créée', 'Recommandations futures'],
  },
  {
    num: 19,
    title: 'Reporting Management',
    icon: 'ri-dashboard-line',
    items: [],
    frequency: 'Hebdomadaire / Mensuelle',
    kpis: ['Leads', 'Conversion', 'Satisfaction', 'Qualité'],
  },
  {
    num: 20,
    title: 'Auto-Optimisation Système',
    icon: 'ri-loop-left-line',
    items: [],
    process: ['Analyse performance', 'Identification des gaps', 'Correction des prompts', 'Mise à jour des agents'],
  },
];

export const manualGlobalStandard = {
  title: 'Standard Global',
  items: [
    'Rigueur Big Four',
    'Logique d\'audit',
    'Précision juridique',
    'Clarté stratégique',
    'Orientation résultat',
  ],
};

export const manualFinalObjective = 'Transformer KOS en système de conseil autonome, plateforme d\'intelligence stratégique, moteur de diagnostic entreprise, générateur de valeur mesurable et infrastructure de gouvernance numérique.';