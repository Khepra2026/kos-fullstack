// ============================================================================
// KOS PROCEDURAL KOs — PILLAR 2 Auto-Learning
// Générés par feedback loop sur kos_execution_logs + orchestration_logs
// 0 nouvelle table — stockage via lessons_learned + best_practices existants
// ============================================================================

export interface ProceduralKO {
  id: string;
  title: string;
  type: 'skill' | 'workflow_pattern' | 'reusable_component' | 'decision_rule' | 'error_recovery';
  sourceLogIds: string[];
  sourceAgentName: string;
  sourceDomain: string;
  inducedFrom: string; // e.g. "12 successful executions of kos-regulatory-scout"
  confidenceScore: number;
  usageCount: number;
  status: 'proposed' | 'validated' | 'promoted' | 'deprecated';
  description: string;
  procedure: string[];
  preconditions: string[];
  expectedOutcome: string;
  costSavingsFCFA: number;
  latencyReductionMs: number;
  qualityImprovement: number;
  applicableAgents: string[];
  contradictionsResolved: number;
  lastValidated: string;
  promotedTo: string | null; // table name if promoted to best_practices or knowledge_capsules
}

export interface FeedbackLoopCycle {
  id: string;
  startedAt: string;
  completedAt: string;
  logsAnalyzed: number;
  patternsDetected: number;
  generated: number;
  promoted: number;
  contradictionsFlagged: number;
  domainsCovered: string[];
  status: 'running' | 'completed' | 'failed';
  executionLogIds: string[];
  orchestrationLogIds: string[];
  summary: string;
}

export interface ExecutionPattern {
  id: string;
  patternName: string;
  frequency: number;
  successRate: number;
  avgLatencyMs: number;
  agentChain: string[];
  typicalMission: string;
  detectedFrom: 'execution_logs' | 'orchestration_logs' | 'both';
  sampleLogIds: string[];
  candidate: boolean;
  suggestedKO: string;
}

// --- PROCEDURAL KOs (générés par feedback loop) ---

export const proceduralKOs: ProceduralKO[] = [
  {
    id: 'proko-001',
    title: 'Pipeline Validation Réglementaire BCEAO — 6 Checkpoints',
    type: 'workflow_pattern',
    sourceLogIds: ['el-0047', 'el-0089', 'el-0124', 'el-0198', 'el-0234', 'el-0287', 'el-0312', 'el-0356', 'el-0401', 'el-0445', 'el-0489', 'el-0532'],
    sourceAgentName: 'KOS Regulatory Scout',
    sourceDomain: 'Compliance',
    inducedFrom: '12 exécutions réussies de kos-regulatory-scout avec score > 95%',
    confidenceScore: 97,
    usageCount: 12,
    status: 'validated',
    description: 'Pattern de validation extrait des 12 exécutions réussies du Regulatory Scout. Enchaînement déterministe de 6 vérifications : source → date → numéro → citation → périmètre → disclaimer.',
    procedure: [
      '1. Vérifier que la source du texte est une publication officielle (JO UEMOA, site BCEAO, etc.)',
      '2. Confirmer que la date du texte correspond à la version en vigueur',
      '3. Valider le numéro d\'instruction/circulaire/décision avec le format attendu',
      '4. Vérifier que la citation est exacte (guillemets, pagination, article)',
      '5. Contrôler le périmètre d\'application (UEMOA, CEMAC, national)',
      '6. Ajouter le disclaimer réglementaire automatique si requis',
    ],
    preconditions: [
      'Document source accessible via URL officielle',
      'Référentiel BCEAO/COBAC chargé dans le Knowledge Repository',
      'Edge function kos-regulatory-scout opérationnelle',
    ],
    expectedOutcome: 'Validation réglementaire avec 97%+ de confiance, 0 faux positif',
    costSavingsFCFA: 45000,
    latencyReductionMs: 3200,
    qualityImprovement: 12,
    applicableAgents: ['AG3-Compliance', 'AG4-AML', 'AG7-Audit'],
    contradictionsResolved: 3,
    lastValidated: '2026-06-26',
    promotedTo: 'best_practices',
  },
  {
    id: 'proko-002',
    title: 'Cross-Linking Automatique — Pattern 3 Niveaux',
    type: 'reusable_component',
    sourceLogIds: ['el-0156', 'el-0234', 'el-0298', 'el-0367', 'el-0412', 'el-0478', 'el-0523', 'el-0589'],
    sourceAgentName: 'KOS Content Publication Gate',
    sourceDomain: 'SEO',
    inducedFrom: '8 exécutions du cross-linking avec CTR +18% moyen',
    confidenceScore: 94,
    usageCount: 8,
    status: 'validated',
    description: 'Pattern de cross-linking interne extrait du Content Publication Gate. 3 niveaux de liens : sémantiques (même sujet) → contextuels (même domaine) → stratégiques (entonnoir conversion).',
    procedure: [
      '1. Détection des entités nommées dans le contenu (NER)',
      '2. Matching sémantique avec les articles existants (TF-IDF cosine > 0.7)',
      '3. Sélection top-3 liens sémantiques (même cluster thématique)',
      '4. Ajout 2 liens contextuels (même pilier stratégique)',
      '5. Insertion 1 lien stratégique (page service ou lead magnet)',
      '6. Vérification ancres optimisées SEO (pas de "cliquez ici")',
    ],
    preconditions: [
      'Articles indexés dans le Knowledge Graph',
      'Clusters thématiques définis',
      'Pages service et lead magnets mappées',
    ],
    expectedOutcome: 'Liens internes pertinents, CTR +15-20%, temps session +40%',
    costSavingsFCFA: 0,
    latencyReductionMs: 850,
    qualityImprovement: 8,
    applicableAgents: ['AG8-Knowledge', 'KOS SEO Engine'],
    contradictionsResolved: 0,
    lastValidated: '2026-06-25',
    promotedTo: 'knowledge_capsules',
  },
  {
    id: 'proko-003',
    title: 'Récupération sur Erreur — Circuit Breaker Pattern',
    type: 'error_recovery',
    sourceLogIds: ['el-0012', 'el-0045', 'el-0078', 'el-0134', 'el-0189', 'el-0223'],
    sourceAgentName: 'KOS Orchestrator Engine',
    sourceDomain: 'Infrastructure',
    inducedFrom: '6 récupérations automatiques réussies via Circuit Breaker',
    confidenceScore: 99,
    usageCount: 6,
    status: 'promoted',
    description: 'Pattern de récupération extrait de l\'Orchestrator Engine. En cas de failure consécutif > seuil : ouvre circuit breaker → attend cooldown → retente avec backoff exponentiel → si toujours failure → DLQ.',
    procedure: [
      '1. Détecter N échecs consécutifs sur même pipeline (seuil = 5)',
      '2. Ouvrir Circuit Breaker — bloquer nouvelles tentatives pendant 60s',
      '3. Logger l\'événement dans pipeline_events avec code erreur',
      '4. Après cooldown, retenter avec backoff exponentiel (1s, 2s, 4s)',
      '5. Si succès : reset compteur, fermer circuit, logger recovery_completed',
      '6. Si échec après 3 retries : envoyer vers Dead Letter Queue',
    ],
    preconditions: [
      'Pipeline state initialisé dans pipeline_state',
      'State transitions configurées dans state_transitions',
      'Circuit breaker thresholds définis',
    ],
    expectedOutcome: '99%+ de récupération automatique, MTTR < 5 minutes',
    costSavingsFCFA: 120000,
    latencyReductionMs: 45000,
    qualityImprovement: 15,
    applicableAgents: ['KOS Orchestrator Engine', 'KOS SysOps Health Scan'],
    contradictionsResolved: 0,
    lastValidated: '2026-06-27',
    promotedTo: 'best_practices',
  },
  {
    id: 'proko-004',
    title: 'Génération Article Big Four — Section par Section',
    type: 'skill',
    sourceLogIds: ['el-0201', 'el-0256', 'el-0312', 'el-0368', 'el-0423'],
    sourceAgentName: 'KOS LLM Content Generator',
    sourceDomain: 'Content',
    inducedFrom: '5 générations d\'articles > 2000 mots avec qualité > 90%',
    confidenceScore: 93,
    usageCount: 5,
    status: 'validated',
    description: 'Skill de génération article long extrait du Content Generator. Pattern section par section avec validation intermédiaire au lieu d\'un seul appel LLM. Réduction hallucinations de 90%.',
    procedure: [
      '1. Générer le plan structuré (5-7 sections) avec le prompt "article-big-four-v5"',
      '2. Pour chaque section : générer contenu (800-1200 mots) avec contexte des sections précédentes',
      '3. Après chaque section : passer le Quality Gate (6 dimensions)',
      '4. Si score < 75 : régénérer la section avec feedback correctif',
      '5. Assembler les sections avec transitions',
      '6. Générer résumé extractif via Automaton TF-IDF',
      '7. Insérer cross-links automatiques',
      '8. Ajouter disclaimer réglementaire',
    ],
    preconditions: [
      'Prompt "article-big-four-v5" validé',
      'Knowledge Repository BCEAO/COBAC chargé',
      'Quality Gate Engine opérationnel',
    ],
    expectedOutcome: 'Article 2500+ mots, qualité > 90%, hallucinations < 0.5%',
    costSavingsFCFA: 280,
    latencyReductionMs: 0,
    qualityImprovement: 22,
    applicableAgents: ['KOS LLM Content Generator', 'KOS Content Publication Gate'],
    contradictionsResolved: 2,
    lastValidated: '2026-06-25',
    promotedTo: null,
  },
  {
    id: 'proko-005',
    title: 'Rule: n8n First — External Last',
    type: 'decision_rule',
    sourceLogIds: ['el-0001', 'el-0056', 'el-0102', 'el-0155', 'el-0208'],
    sourceAgentName: 'KOS Self-Evolution Engine',
    sourceDomain: 'Orchestration',
    inducedFrom: '5 décisions d\'arbitrage avec 100% de réutilisation interne',
    confidenceScore: 98,
    usageCount: 5,
    status: 'promoted',
    description: 'Règle de décision : avant tout appel externe (API, LLM, SaaS), vérifier les 5 niveaux de résolution interne. Promu comme règle systémique dans le Decision Engine.',
    procedure: [
      '1. Le besoin peut-il être résolu par n8n natif ? (HTTP, Code, Switch, Merge) → OUI = GO',
      '2. Un workflow existant similaire existe-t-il ? → OUI = GO',
      '3. Des sous-workflows réutilisables peuvent-ils être chaînés ? → OUI = GO',
      '4. Un prompt LLM validé + modèle économique existe-t-il ? → OUI = GO',
      '5. Créer un nouveau composant réutilisable dans la bibliothèque interne',
    ],
    preconditions: [
      'Decision Engine chargé avec les 5 règles',
      'Bibliothèque de capacités indexée',
      'Cost Guardian actif',
    ],
    expectedOutcome: 'Taux de réutilisation > 75%, économies > 1.5M FCFA/mois',
    costSavingsFCFA: 1876000,
    latencyReductionMs: 5800,
    qualityImprovement: 10,
    applicableAgents: ['Tous les agents KOS'],
    contradictionsResolved: 1,
    lastValidated: '2026-06-27',
    promotedTo: 'best_practices',
  },
  {
    id: 'proko-006',
    title: 'Enrichissement Lead — n8n Déterministe',
    type: 'workflow_pattern',
    sourceLogIds: ['el-0088', 'el-0145', 'el-0199', 'el-0255'],
    sourceAgentName: 'KOS Lead Scoring Engine',
    sourceDomain: 'CRM',
    inducedFrom: '4 exécutions lead scoring avec enrichissement 100% n8n',
    confidenceScore: 96,
    usageCount: 4,
    status: 'validated',
    description: 'Workflow d\'enrichissement lead 100% déterministe via n8n. Zéro appel LLM, zéro latence externe. Scoring + qualification + segmentation + notification en < 50ms.',
    procedure: [
      '1. Réception webhook lead (formulaire, LinkedIn, téléchargement)',
      '2. Scoring via règles métier (secteur + poste + activité + source)',
      '3. Qualification automatique (MQL si score > 70, SQL si > 85)',
      '4. Segmentation par BU/pilier/service',
      '5. Enrichissement avec données CRM (historique, entreprise)',
      '6. Notification Slack/Email à l\'équipe commerciale',
    ],
    preconditions: [
      'n8n workflow "enrichissement-leads-n8n" déployé',
      'Table leads dans Supabase',
      'Règles de scoring définies par BU',
    ],
    expectedOutcome: 'Lead enrichi et notifié en < 50ms, coût 0 FCFA',
    costSavingsFCFA: 45000,
    latencyReductionMs: 12400,
    qualityImprovement: 6,
    applicableAgents: ['AG11-BD', 'KOS Lead Scoring Engine'],
    contradictionsResolved: 0,
    lastValidated: '2026-06-24',
    promotedTo: null,
  },
];

// --- FEEDBACK LOOP CYCLES ---

export const feedbackLoopCycles: FeedbackLoopCycle[] = [
  {
    id: 'flc-001',
    startedAt: '2026-06-27T02:00:00Z',
    completedAt: '2026-06-27T02:08:34Z',
    logsAnalyzed: 247,
    patternsDetected: 14,
    generated: 6,
    promoted: 2,
    contradictionsFlagged: 3,
    domainsCovered: ['Compliance', 'SEO', 'Infrastructure', 'Content', 'Orchestration', 'CRM'],
    status: 'completed',
    executionLogIds: ['el-0001' ,'el-0056','el-0102','el-0155','el-0208','el-0255','el-0312','el-0367','el-0423','el-0478'],
    orchestrationLogIds: ['ol-1', 'ol-3', 'ol-5', 'ol-7', 'ol-9'],
    summary: 'Cycle nocturne — 247 logs d\'exécution analysés. 14 patterns détectés, 6 KOs procéduraux générés dont 2 promus en best_practices. 3 contradictions inter-agents résolues.',
  },
  {
    id: 'flc-002',
    startedAt: '2026-06-26T14:00:00Z',
    completedAt: '2026-06-26T14:05:12Z',
    logsAnalyzed: 198,
    patternsDetected: 9,
    generated: 3,
    promoted: 1,
    contradictionsFlagged: 1,
    domainsCovered: ['Content', 'SEO', 'Compliance'],
    status: 'completed',
    executionLogIds: ['el-0201', 'el-0256', 'el-0312', 'el-0368', 'el-0423'],
    orchestrationLogIds: ['ol-2', 'ol-4', 'ol-6'],
    summary: 'Cycle après-midi — focus Content/SEO. Pattern section-par-section identifié et promu en skill procédural.',
  },
  {
    id: 'flc-003',
    startedAt: '2026-06-27T08:00:00Z',
    completedAt: '',
    logsAnalyzed: 0,
    patternsDetected: 0,
    generated: 0,
    promoted: 0,
    contradictionsFlagged: 0,
    domainsCovered: [],
    status: 'running',
    executionLogIds: [],
    orchestrationLogIds: [],
    summary: 'Cycle en cours — analyse des logs du matin...',
  },
];

// --- EXECUTION PATTERNS DÉTECTÉS ---

export const executionPatterns: ExecutionPattern[] = [
  {
    id: 'pat-001',
    patternName: 'Validation 6 checkpoints BCEAO',
    frequency: 12,
    successRate: 97,
    avgLatencyMs: 3400,
    agentChain: ['KOS Regulatory Scout', 'KOS Regulatory Quality Assurance'],
    typicalMission: 'Vérification conformité réglementaire',
    detectedFrom: 'execution_logs',
    sampleLogIds: ['el-0047', 'el-0089', 'el-0198'],
    candidate: true,
    suggestedKO: 'proko-001',
  },
  {
    id: 'pat-002',
    patternName: 'Cross-linking 3 niveaux',
    frequency: 8,
    successRate: 94,
    avgLatencyMs: 850,
    agentChain: ['KOS Content Publication Gate', 'KOS Knowledge Graph'],
    typicalMission: 'Publication article avec liens internes',
    detectedFrom: 'both',
    sampleLogIds: ['el-0156', 'el-0234', 'el-0298'],
    candidate: true,
    suggestedKO: 'proko-002',
  },
  {
    id: 'pat-003',
    patternName: 'Circuit Breaker Recovery',
    frequency: 6,
    successRate: 99,
    avgLatencyMs: 45000,
    agentChain: ['KOS Orchestrator Engine'],
    typicalMission: 'Récupération automatique après échec pipeline',
    detectedFrom: 'execution_logs',
    sampleLogIds: ['el-0012', 'el-0045', 'el-0078'],
    candidate: true,
    suggestedKO: 'proko-003',
  },
  {
    id: 'pat-004',
    patternName: 'Article section-par-section',
    frequency: 5,
    successRate: 93,
    avgLatencyMs: 28500,
    agentChain: ['KOS LLM Content Generator', 'KOS Content Publication Gate', 'KOS Quality Engine'],
    typicalMission: 'Génération article long > 2000 mots',
    detectedFrom: 'both',
    sampleLogIds: ['el-0201', 'el-0256', 'el-0312'],
    candidate: true,
    suggestedKO: 'proko-004',
  },
  {
    id: 'pat-005',
    patternName: 'n8n Enrichissement Lead',
    frequency: 4,
    successRate: 96,
    avgLatencyMs: 48,
    agentChain: ['KOS Lead Scoring Engine', 'KOS CRM Engine'],
    typicalMission: 'Enrichissement et scoring lead',
    detectedFrom: 'execution_logs',
    sampleLogIds: ['el-0088', 'el-0145', 'el-0199'],
    candidate: true,
    suggestedKO: 'proko-006',
  },
  {
    id: 'pat-006',
    patternName: 'Orchestration Multi-Agent Audit',
    frequency: 7,
    successRate: 91,
    avgLatencyMs: 12400,
    agentChain: ['Audit AI', 'Compliance AI', 'AML AI', 'Risk AI'],
    typicalMission: 'Mission d\'audit multi-agent',
    detectedFrom: 'orchestration_logs',
    sampleLogIds: ['ol-1', 'ol-2', 'ol-3'],
    candidate: false,
    suggestedKO: '',
  },
];

// --- FEEDBACK LOOP STATS ---

export const feedbackLoopStats = {
  totalCycles: 247,
  activeCycles: 1,
  totalLogsAnalyzed: 18423,
  totalPatternsDetected: 512,
  totalKOsGenerated: 89,
  totalKOsPromoted: 34,
  totalKOsValidated: 45,
  totalKOsDeprecated: 10,
  contradictionsResolved: 127,
  averageCycleDurationMs: 312000,
  domainsCovered: 12,
  byType: {
    skill: 23,
    workflow_pattern: 31,
    reusable_component: 18,
    decision_rule: 10,
    error_recovery: 7,
  },
  topAgentSources: [
    { agent: 'KOS Regulatory Scout', generated: 15 },
    { agent: 'KOS Orchestrator Engine', generated: 12 },
    { agent: 'KOS Content Publication Gate', generated: 10 },
    { agent: 'KOS Lead Scoring Engine', generated: 8 },
    { agent: 'KOS LLM Content Generator', generated: 7 },
  ],
};





