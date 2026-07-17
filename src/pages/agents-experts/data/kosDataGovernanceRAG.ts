export interface DataGovernancePrinciple {
  num: number;
  title: string;
  subtitle: string;
  icon: string;
}

export interface DataSource {
  name: string;
  items: string[];
  icon: string;
  color: string;
}

export interface IngestionStep {
  num: number;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface RAGLayer {
  title: string;
  description: string;
  icon: string;
  technologies?: string[];
  functions?: string[];
  relations?: string[];
}

export interface AntiHallucinationRule {
  num: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface ConfidenceLevel {
  range: string;
  label: string;
  color: string;
  icon: string;
  description: string;
}

export interface DataClassification {
  level: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  examples: string[];
}

export interface QualityDimension {
  name: string;
  icon: string;
  description: string;
}

export interface LifecycleStep {
  num: number;
  title: string;
  icon: string;
  description: string;
}

export interface GovernanceRule {
  num: number;
  title: string;
  icon: string;
  description: string;
}

export interface RAGResponseStep {
  num: number;
  title: string;
  icon: string;
  description: string;
}

export interface PerformanceMetric {
  label: string;
  value: string;
  icon: string;
  color: string;
}

export const ragFrameworkIntro = {
  title: 'KOS Data Governance & RAG Framework™',
  subtitle: 'Cadre de Gouvernance des Données & Intelligence Augmentée',
  version: 'VERSION PRODUCTION – BIG FOUR AI STANDARD',
  objective: 'Ce framework définit les règles de gestion, d\'ingestion, de validation, de transformation et d\'exploitation des données dans KOS. Il garantit que toute réponse produite par KOS est factuelle, traçable, vérifiable, contextualisée et à jour.',
  finalObjective: 'Transformer KOS en système grounded in truth, data-driven, auditable, scalable et enterprise-grade.',
};

export const dataGovernancePrinciples: DataGovernancePrinciple[] = [
  {
    num: 1,
    title: 'Truth-First Principle™',
    subtitle: 'Aucune réponse ne doit être générée sans base informationnelle fiable.',
    icon: 'ri-scales-3-line',
  },
  {
    num: 2,
    title: 'No Source, No Claim™',
    subtitle: 'Sans source vérifiée → aucune affirmation factuelle.',
    icon: 'ri-file-search-line',
  },
  {
    num: 3,
    title: 'Traceability Principle™',
    subtitle: 'Chaque information doit pouvoir être reliée à une source.',
    icon: 'ri-git-branch-line',
  },
  {
    num: 4,
    title: 'Multi-Layer Validation™',
    subtitle: 'Toute donnée critique est validée sur plusieurs sources indépendantes.',
    icon: 'ri-stack-line',
  },
  {
    num: 5,
    title: 'Continuous Refresh™',
    subtitle: 'Les connaissances doivent être mises à jour en continu.',
    icon: 'ri-refresh-line',
  },
];

export const dataSources: DataSource[] = [
  {
    name: 'Sources primaires',
    items: ['Lois et régulations officielles', 'Normes internationales (ISO, IFRS, etc.)', 'Institutions publiques', 'Organisations multilatérales'],
    icon: 'ri-government-line',
    color: 'from-emerald-600 to-emerald-700',
  },
  {
    name: 'Sources secondaires',
    items: ['Cabinets Big Four', 'Think tanks', 'Publications académiques', 'Rapports sectoriels'],
    icon: 'ri-building-2-line',
    color: 'from-sky-600 to-sky-700',
  },
  {
    name: 'Sources internes',
    items: ['Knowledge base KOS', 'Historique client', 'Rapports internes validés'],
    icon: 'ri-database-2-line',
    color: 'from-amber-600 to-amber-700',
  },
];

export const ingestionPipeline: IngestionStep[] = [
  {
    num: 1,
    title: 'Collecte',
    description: 'Sources structurées et non structurées',
    icon: 'ri-download-cloud-2-line',
    details: ['PDF', 'APIs', 'Sites web', 'Bases de données', 'Documents clients'],
  },
  {
    num: 2,
    title: 'Nettoyage',
    description: 'Préparation et normalisation',
    icon: 'ri-filter-line',
    details: ['Suppression duplicats', 'Normalisation format', 'Correction structurelle'],
  },
  {
    num: 3,
    title: 'Enrichissement',
    description: 'Contextualisation sémantique',
    icon: 'ri-sparkling-2-line',
    details: ['Tagging', 'Classification', 'Contextualisation', 'Metadata injection'],
  },
  {
    num: 4,
    title: 'Validation',
    description: 'Vérification croisée',
    icon: 'ri-check-double-line',
    details: ['Vérification source', 'Cross-check multi-sources', 'Scoring fiabilité'],
  },
  {
    num: 5,
    title: 'Indexation',
    description: 'Stockage multi-couches',
    icon: 'ri-stack-line',
    details: ['Stockage vectoriel', 'Stockage relationnel', 'Stockage documentaire'],
  },
];

export const ragArchitectureLayers: RAGLayer[] = [
  {
    title: 'Vector Database Layer',
    description: 'Embedding des documents, recherche sémantique et ranking contextuel',
    icon: 'ri-database-2-line',
    technologies: ['Qdrant', 'Pinecone', 'Weaviate', 'pgvector'],
    functions: ['Embedding des documents', 'Recherche sémantique', 'Ranking contextuel'],
  },
  {
    title: 'Knowledge Graph Layer',
    description: 'Relations structurées entre entités métier',
    icon: 'ri-git-branch-line',
    relations: ['Entreprise ↔ Secteur', 'Risque ↔ Réglementation', 'Stratégie ↔ Performance', 'Client ↔ Historique'],
  },
  {
    title: 'Hybrid Retrieval',
    description: 'Combinaison de trois méthodes de recherche',
    icon: 'ri-flow-chart',
    functions: ['Recherche vectorielle', 'Recherche keyword', 'Graph traversal'],
  },
];

export const ragPipelineSteps: string[] = [
  'User Query',
  'Query Understanding',
  'Semantic Search (Vector DB)',
  'Knowledge Graph Expansion',
  'Context Assembly',
  'Multi-Agent Reasoning',
  'Response Generation',
  'Quality Control',
];

export const antiHallucinationRules: AntiHallucinationRule[] = [
  {
    num: 1,
    title: 'Detection Rules',
    description: 'Bloquer si : aucune source, incohérence multi-sources, données non vérifiables',
    icon: 'ri-spy-line',
    color: 'from-rose-600 to-rose-700',
  },
  {
    num: 2,
    title: 'Confidence Scoring',
    description: 'Échelle 0–100 : chaque réponse est scorée automatiquement',
    icon: 'ri-bar-chart-2-line',
    color: 'from-amber-600 to-amber-700',
  },
  {
    num: 3,
    title: 'Safe Response Rule',
    description: 'Si incertitude : « Je ne sais pas avec suffisamment de certitude. »',
    icon: 'ri-shield-check-line',
    color: 'from-emerald-600 to-emerald-700',
  },
];

export const confidenceLevels: ConfidenceLevel[] = [
  { range: '> 90', label: 'Réponse validée', color: 'bg-emerald-500', icon: 'ri-check-double-line', description: 'Diffusion autorisée sans restriction' },
  { range: '70–90', label: 'Réponse acceptable avec prudence', color: 'bg-amber-500', icon: 'ri-alert-line', description: 'Diffusion avec mention « sous réserve »' },
  { range: '< 70', label: 'Reformulation ou refus', color: 'bg-rose-500', icon: 'ri-close-circle-line', description: 'Bloquée — reformulation obligatoire' },
];

export const dataClassifications: DataClassification[] = [
  {
    level: 'Niveau 1',
    label: 'Public',
    description: 'Données ouvertes, contenus marketing',
    icon: 'ri-globe-line',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-200',
    examples: ['Données ouvertes', 'Contenus marketing'],
  },
  {
    level: 'Niveau 2',
    label: 'Interne',
    description: 'Méthodologies, SOP',
    icon: 'ri-building-line',
    color: 'text-sky-600',
    bgColor: 'bg-sky-50 border-sky-200',
    examples: ['Méthodologies', 'SOP'],
  },
  {
    level: 'Niveau 3',
    label: 'Confidentiel',
    description: 'Analyses clients, diagnostics',
    icon: 'ri-lock-line',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 border-amber-200',
    examples: ['Analyses clients', 'Diagnostics'],
  },
  {
    level: 'Niveau 4',
    label: 'Restreint',
    description: 'Données financières sensibles, données juridiques',
    icon: 'ri-shield-keyhole-line',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    examples: ['Données financières sensibles', 'Données juridiques'],
  },
  {
    level: 'Niveau 5',
    label: 'Critique',
    description: 'Gouvernance, décisions stratégiques',
    icon: 'ri-shield-star-line',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 border-rose-200',
    examples: ['Gouvernance', 'Décisions stratégiques'],
  },
];

export const qualityDimensions: QualityDimension[] = [
  { name: 'Exactitude', icon: 'ri-crosshair-line', description: 'Conformité aux faits vérifiés' },
  { name: 'Complétude', icon: 'ri-checkbox-circle-line', description: 'Couverture complète du sujet' },
  { name: 'Cohérence', icon: 'ri-git-branch-line', description: 'Alignement interne et externe' },
  { name: 'Fraîcheur', icon: 'ri-timer-line', description: 'Actualité des données utilisées' },
  { name: 'Pertinence', icon: 'ri-focus-3-line', description: 'Adéquation au contexte utilisateur' },
];

export const knowledgeLifecycle: LifecycleStep[] = [
  { num: 1, title: 'Création', icon: 'ri-pencil-line', description: 'Production de la connaissance' },
  { num: 2, title: 'Validation', icon: 'ri-check-double-line', description: 'Vérification multi-sources' },
  { num: 3, title: 'Utilisation', icon: 'ri-play-circle-line', description: 'Exploitation par les agents' },
  { num: 4, title: 'Feedback', icon: 'ri-feedback-line', description: 'Retour d\'expérience' },
  { num: 5, title: 'Mise à jour', icon: 'ri-refresh-line', description: 'Actualisation continue' },
  { num: 6, title: 'Archivage', icon: 'ri-archive-line', description: 'Préservation et traçabilité' },
];

export const updateFrequencies: { label: string; frequency: string; icon: string; color: string }[] = [
  { label: 'Réglementaire', frequency: 'Quotidienne', icon: 'ri-calendar-check-line', color: 'from-rose-600 to-rose-700' },
  { label: 'Sectorielle', frequency: 'Hebdomadaire', icon: 'ri-calendar-line', color: 'from-amber-600 to-amber-700' },
  { label: 'Macroéconomique', frequency: 'Mensuelle', icon: 'ri-calendar-2-line', color: 'from-sky-600 to-sky-700' },
];

export const dataGovernanceRules: GovernanceRule[] = [
  { num: 1, title: 'No Autonomous Publishing Without Validation', icon: 'ri-shield-check-line', description: 'Aucune publication sans contrôle qualité préalable.' },
  { num: 2, title: 'Audit Trail Mandatory', icon: 'ri-file-search-line', description: 'Chaque donnée entrante et sortante doit être traçable de bout en bout.' },
  { num: 3, title: 'Version Control', icon: 'ri-git-branch-line', description: 'Toute connaissance doit être versionnée avec historique complet.' },
];

export const ragResponseStructure: RAGResponseStep[] = [
  { num: 1, title: 'Contexte utilisateur', icon: 'ri-user-line', description: 'Compréhension de la problématique' },
  { num: 2, title: 'Données récupérées', icon: 'ri-database-2-line', description: 'Sources extraites du Knowledge Hub' },
  { num: 3, title: 'Analyse multi-sources', icon: 'ri-stack-line', description: 'Croisement et validation' },
  { num: 4, title: 'Synthèse agentielle', icon: 'ri-brain-line', description: 'Raisonnement IA augmenté' },
  { num: 5, title: 'Recommandation', icon: 'ri-lightbulb-line', description: 'Plan d\'action précis' },
  { num: 6, title: 'Niveau de confiance', icon: 'ri-bar-chart-2-line', description: 'Score 0–100 documenté' },
];

export const performanceMetrics: PerformanceMetric[] = [
  { label: 'Précision récupération', value: '≥ 98%', icon: 'ri-crosshair-line', color: 'from-emerald-600 to-emerald-700' },
  { label: 'Hallucination rate', value: '≈ 0%', icon: 'ri-shield-check-line', color: 'from-rose-600 to-rose-700' },
  { label: 'Pertinence contextuelle', value: '≥ 95%', icon: 'ri-focus-3-line', color: 'from-amber-600 to-amber-700' },
  { label: 'Latence', value: '< 3s', icon: 'ri-timer-line', color: 'from-sky-600 to-sky-700' },
];