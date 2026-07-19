// ============================================================================
// KOS AGENTIC DECOMPOSITION — PILLAR 3 Agentic Development
// Blueprint de décomposition tâches complexes → sous-agents
// Via KOS Orchestrator Engine existant — 0 nouvelle table, 0 nouvelle edge function
// ============================================================================

export interface DecompositionBlueprint {
  id: string;
  missionType: string;
  missionExample: string;
  complexity: 'low' | 'medium' | 'high' | 'extreme';
  estimatedDurationMin: number;
  phases: DecompositionPhase[];
  crossValidationStrategy: string;
  contradictionsResolution: 'auto' | 'semi_auto' | 'human_required';
  successRateHistorical: number;
  totalDecompositions: number;
}

export interface DecompositionPhase {
  order: number;
  name: string;
  durationPct: number;
  subTasks: SubTask[];
  dependencies: number[]; // phase orders this phase depends on
}

export interface SubTask {
  id: string;
  title: string;
  assignedAgentId: string;
  assignedAgentName: string;
  agentDomain: string;
  inputFrom: string[]; // subTask IDs this depends on
  outputTo: string[]; // subTask IDs that depend on this
  estimatedDurationMin: number;
  criticalPath: boolean;
  tools: string[];
  validationCheck: string;
}

export interface AgentCapability {
  agentId: string;
  agentName: string;
  domain: string;
  skills: string[];
  maxParallelTasks: number;
  avgLatencyMs: number;
  reliabilityScore: number;
  subTaskTypes: string[];
}

export interface DecompositionStats {
  totalBlueprints: number;
  missionsDecomposed: number;
  avgSubTasksPerMission: number;
  avgPhasesPerMission: number;
  criticalPathOptimizationRate: number;
  parallelExecutionRate: number;
  agentUtilizationRate: number;
}

// --- AGENT CAPABILITIES CHART ---

export const agentCapabilities: AgentCapability[] = [
  {
    agentId: 'AG7-Audit',
    agentName: 'Audit AI',
    domain: 'Audit',
    skills: ['Analyse états financiers', 'Tests de contrôle', 'Échantillonnage', 'Revue qualité', 'ISA compliance'],
    maxParallelTasks: 3,
    avgLatencyMs: 4200,
    reliabilityScore: 96,
    subTaskTypes: ['audit_analysis', 'control_testing', 'quality_review'],
  },
  {
    agentId: 'AG3-Compliance',
    agentName: 'Compliance AI',
    domain: 'Compliance',
    skills: ['Vérification réglementaire', 'Matrice conformité', 'Gap analysis', 'Recommandations correctives', 'BCEAO/COBAC expertise'],
    maxParallelTasks: 4,
    avgLatencyMs: 2800,
    reliabilityScore: 97,
    subTaskTypes: ['regulatory_check', 'gap_analysis', 'compliance_matrix'],
  },
  {
    agentId: 'AG4-AML',
    agentName: 'AML AI',
    domain: 'AML/CFT',
    skills: ['Analyse LBC/FT', 'Due diligence client', 'Transaction monitoring', 'Déclaration soupçon', 'GAFI compliance'],
    maxParallelTasks: 2,
    avgLatencyMs: 5100,
    reliabilityScore: 94,
    subTaskTypes: ['aml_analysis', 'kyc_due_diligence', 'transaction_screening'],
  },
  {
    agentId: 'AG2-Risk',
    agentName: 'Risk AI',
    domain: 'Risk',
    skills: ['Cartographie risques', 'Risk assessment', 'Stress testing', 'KRI monitoring', 'COSO framework'],
    maxParallelTasks: 3,
    avgLatencyMs: 3800,
    reliabilityScore: 93,
    subTaskTypes: ['risk_mapping', 'risk_assessment', 'stress_test'],
  },
  {
    agentId: 'AG1-Strategy',
    agentName: 'Strategy AI',
    domain: 'Strategy',
    skills: ['Analyse stratégique', 'Benchmarking', 'Due diligence', 'Business plan', 'Scenario planning'],
    maxParallelTasks: 2,
    avgLatencyMs: 5600,
    reliabilityScore: 91,
    subTaskTypes: ['strategy_analysis', 'benchmarking', 'scenario_planning'],
  },
  {
    agentId: 'AG6-Tax',
    agentName: 'Tax AI',
    domain: 'Tax',
    skills: ['Analyse fiscale', 'Prix transfert', 'BEPS compliance', 'Optimisation fiscale', 'Documentation TP'],
    maxParallelTasks: 2,
    avgLatencyMs: 4500,
    reliabilityScore: 95,
    subTaskTypes: ['tax_analysis', 'transfer_pricing', 'tax_optimization'],
  },
  {
    agentId: 'AG5-TP',
    agentName: 'Transfer Pricing AI',
    domain: 'Transfer Pricing',
    skills: ['Étude comparables', 'Analyse fonctionnelle', 'Documentation Master/Local File', 'CbCR', 'APA negotiation'],
    maxParallelTasks: 1,
    avgLatencyMs: 6200,
    reliabilityScore: 92,
    subTaskTypes: ['tp_comparables', 'tp_documentation', 'tp_analysis'],
  },
  {
    agentId: 'AG8-Knowledge',
    agentName: 'Knowledge AI',
    domain: 'Knowledge',
    skills: ['Capitalisation', 'RAG enrichment', 'Cross-linking', 'Knowledge graph', 'Taxonomie'],
    maxParallelTasks: 5,
    avgLatencyMs: 1200,
    reliabilityScore: 98,
    subTaskTypes: ['knowledge_capture', 'rag_indexing', 'cross_linking'],
  },
  {
    agentId: 'AG12-Proposal',
    agentName: 'Proposal AI',
    domain: 'Proposal',
    skills: ['Rédaction offre', 'Chiffrage', 'Méthodologie', 'CV projet', 'Références'],
    maxParallelTasks: 2,
    avgLatencyMs: 8900,
    reliabilityScore: 90,
    subTaskTypes: ['proposal_drafting', 'pricing', 'methodology'],
  },
  {
    agentId: 'AG11-BD',
    agentName: 'Business Dev AI',
    domain: 'Business Development',
    skills: ['Lead scoring', 'Pipeline management', 'Prospection', 'Closing', 'CRM enrichment'],
    maxParallelTasks: 3,
    avgLatencyMs: 1800,
    reliabilityScore: 89,
    subTaskTypes: ['lead_scoring', 'pipeline', 'prospecting'],
  },
];

// --- DECOMPOSITION BLUEPRINTS ---

export const decompositionBlueprints: DecompositionBlueprint[] = [
  {
    id: 'bp-001',
    missionType: 'Due Diligence Acquisition — Groupe Multinational',
    missionExample: 'Due diligence réglementaire, fiscale et financière d\'un groupe bancaire panafricain opérant dans 8 pays UEMOA/CEMAC',
    complexity: 'extreme',
    estimatedDurationMin: 320,
    phases: [
      {
        order: 1,
        name: 'Phase 1 — Collecte & Analyse Documentaire',
        durationPct: 25,
        dependencies: [],
        subTasks: [
          {
            id: 'bp001-st1',
            title: 'Collecte et indexation des documents corporate',
            assignedAgentId: 'AG8-Knowledge',
            assignedAgentName: 'Knowledge AI',
            agentDomain: 'Knowledge',
            inputFrom: [],
            outputTo: ['bp001-st2', 'bp001-st3'],
            estimatedDurationMin: 30,
            criticalPath: true,
            tools: ['RAG Indexer', 'Knowledge Graph'],
            validationCheck: 'Tous les documents indexés avec métadonnées complètes',
          },
          {
            id: 'bp001-st2',
            title: 'Analyse réglementaire multi-juridictionnelle (8 pays)',
            assignedAgentId: 'AG3-Compliance',
            assignedAgentName: 'Compliance AI',
            agentDomain: 'Compliance',
            inputFrom: ['bp001-st1'],
            outputTo: ['bp001-st5', 'bp001-st7'],
            estimatedDurationMin: 60,
            criticalPath: true,
            tools: ['Regulatory Scout', 'Compliance Matrix'],
            validationCheck: 'Matrice conformité complétée pour les 8 juridictions',
          },
          {
            id: 'bp001-st3',
            title: 'Due diligence LBC/FT — historique transactions',
            assignedAgentId: 'AG4-AML',
            assignedAgentName: 'AML AI',
            agentDomain: 'AML/CFT',
            inputFrom: ['bp001-st1'],
            outputTo: ['bp001-st5', 'bp001-st7'],
            estimatedDurationMin: 45,
            criticalPath: false,
            tools: ['Transaction Monitor', 'KYC Engine'],
            validationCheck: 'Profil de risque LBC/FT établi, 0 alerte non traitée',
          },
          {
            id: 'bp001-st4',
            title: 'Analyse fiscale et prix de transfert',
            assignedAgentId: 'AG6-Tax',
            assignedAgentName: 'Tax AI',
            agentDomain: 'Tax',
            inputFrom: ['bp001-st1'],
            outputTo: ['bp001-st5', 'bp001-st7'],
            estimatedDurationMin: 50,
            criticalPath: false,
            tools: ['Tax Analyzer', 'BEPS Compliance Checker'],
            validationCheck: 'Exposition fiscale quantifiée par pays',
          },
        ],
      },
      {
        order: 2,
        name: 'Phase 2 — Évaluation Risques & Impacts',
        durationPct: 25,
        dependencies: [1],
        subTasks: [
          {
            id: 'bp001-st5',
            title: 'Cartographie consolidée des risques',
            assignedAgentId: 'AG2-Risk',
            assignedAgentName: 'Risk AI',
            agentDomain: 'Risk',
            inputFrom: ['bp001-st2', 'bp001-st3', 'bp001-st4'],
            outputTo: ['bp001-st7', 'bp001-st8'],
            estimatedDurationMin: 40,
            criticalPath: true,
            tools: ['Risk Matrix', 'COSO Framework', 'KRI Dashboard'],
            validationCheck: 'Heatmap risques couvrant compliance + AML + fiscal',
          },
          {
            id: 'bp001-st6',
            title: 'Analyse stratégique — fit et synergies',
            assignedAgentId: 'AG1-Strategy',
            assignedAgentName: 'Strategy AI',
            agentDomain: 'Strategy',
            inputFrom: ['bp001-st1'],
            outputTo: ['bp001-st8'],
            estimatedDurationMin: 35,
            criticalPath: false,
            tools: ['Strategy Analyzer', 'Benchmark Engine'],
            validationCheck: 'Matrice SWOT + synergies quantifiées',
          },
        ],
      },
      {
        order: 3,
        name: 'Phase 3 — Synthèse & Livrable',
        durationPct: 30,
        dependencies: [2],
        subTasks: [
          {
            id: 'bp001-st7',
            title: 'Rédaction rapport due diligence',
            assignedAgentId: 'AG12-Proposal',
            assignedAgentName: 'Proposal AI',
            agentDomain: 'Proposal',
            inputFrom: ['bp001-st2', 'bp001-st3', 'bp001-st4', 'bp001-st5'],
            outputTo: ['bp001-st9'],
            estimatedDurationMin: 60,
            criticalPath: true,
            tools: ['Report Generator', 'PDF Engine'],
            validationCheck: 'Rapport structuré Big Four, références réglementaires exactes',
          },
          {
            id: 'bp001-st8',
            title: 'Recommandations stratégiques et plan d\'intégration',
            assignedAgentId: 'AG1-Strategy',
            assignedAgentName: 'Strategy AI',
            agentDomain: 'Strategy',
            inputFrom: ['bp001-st5', 'bp001-st6'],
            outputTo: ['bp001-st9'],
            estimatedDurationMin: 30,
            criticalPath: false,
            tools: ['Strategic Planning Engine', 'Roadmap Generator'],
            validationCheck: 'Roadmap 100 jours post-acquisition',
          },
        ],
      },
      {
        order: 4,
        name: 'Phase 4 — Contre-Validation',
        durationPct: 10,
        dependencies: [3],
        subTasks: [
          {
            id: 'bp001-st9',
            title: 'Contre-validation inter-agents',
            assignedAgentId: 'AG3-Compliance',
            assignedAgentName: 'Compliance AI',
            agentDomain: 'Compliance',
            inputFrom: ['bp001-st7', 'bp001-st8'],
            outputTo: [],
            estimatedDurationMin: 20,
            criticalPath: true,
            tools: ['Quality Gate', 'Cross-Validation Engine'],
            validationCheck: '0 contradiction inter-agents, score qualité > 90',
          },
        ],
      },
    ],
    crossValidationStrategy: 'Chaque agent valide les outputs des agents en amont. Compliance AI contre-valide le livrable final.',
    contradictionsResolution: 'auto',
    successRateHistorical: 91,
    totalDecompositions: 14,
  },
  {
    id: 'bp-002',
    missionType: 'Audit Prudentiel Pré-Inspection BCEAO/COBAC',
    missionExample: 'Préparation à une inspection BCEAO pour une banque UEMOA — revue des 12 domaines prudentiels',
    complexity: 'high',
    estimatedDurationMin: 240,
    phases: [
      {
        order: 1,
        name: 'Phase 1 — Diagnostic Conformité',
        durationPct: 30,
        dependencies: [],
        subTasks: [
          {
            id: 'bp002-st1',
            title: 'Scan conformité 12 domaines prudentiels',
            assignedAgentId: 'AG3-Compliance',
            assignedAgentName: 'Compliance AI',
            agentDomain: 'Compliance',
            inputFrom: [],
            outputTo: ['bp002-st4', 'bp002-st6'],
            estimatedDurationMin: 45,
            criticalPath: true,
            tools: ['Regulatory Scout', 'Compliance Scanner'],
            validationCheck: 'Gap analysis complète sur les 12 domaines',
          },
          {
            id: 'bp002-st2',
            title: 'Analyse ratios prudentiels (solvabilité, liquidité, levier)',
            assignedAgentId: 'AG7-Audit',
            assignedAgentName: 'Audit AI',
            agentDomain: 'Audit',
            inputFrom: [],
            outputTo: ['bp002-st4', 'bp002-st5'],
            estimatedDurationMin: 30,
            criticalPath: false,
            tools: ['Ratio Analyzer', 'Financial Model Engine'],
            validationCheck: 'Tous les ratios calculés et comparés aux seuils réglementaires',
          },
          {
            id: 'bp002-st3',
            title: 'Évaluation dispositif LBC/FT',
            assignedAgentId: 'AG4-AML',
            assignedAgentName: 'AML AI',
            agentDomain: 'AML/CFT',
            inputFrom: [],
            outputTo: ['bp002-st4', 'bp002-st6'],
            estimatedDurationMin: 35,
            criticalPath: false,
            tools: ['AML Scanner', 'GAFI Checklist'],
            validationCheck: 'Dispositif LBC/FT noté sur grille GAFI 40 recommandations',
          },
        ],
      },
      {
        order: 2,
        name: 'Phase 2 — Évaluation Risques & Contrôle Interne',
        durationPct: 25,
        dependencies: [1],
        subTasks: [
          {
            id: 'bp002-st4',
            title: 'Cartographie risques prudentiels',
            assignedAgentId: 'AG2-Risk',
            assignedAgentName: 'Risk AI',
            agentDomain: 'Risk',
            inputFrom: ['bp002-st1', 'bp002-st2', 'bp002-st3'],
            outputTo: ['bp002-st6'],
            estimatedDurationMin: 30,
            criticalPath: true,
            tools: ['Risk Matrix', 'COSO Framework'],
            validationCheck: 'Heatmap risques avec probabilité × impact',
          },
          {
            id: 'bp002-st5',
            title: 'Revue contrôle interne (COSO 5 composantes)',
            assignedAgentId: 'AG7-Audit',
            assignedAgentName: 'Audit AI',
            agentDomain: 'Audit',
            inputFrom: ['bp002-st2'],
            outputTo: ['bp002-st6'],
            estimatedDurationMin: 25,
            criticalPath: false,
            tools: ['COSO Auditor', 'Control Matrix'],
            validationCheck: 'Matrice de contrôle notée, gaps identifiés',
          },
        ],
      },
      {
        order: 3,
        name: 'Phase 3 — Rapport & Plan Correctif',
        durationPct: 25,
        dependencies: [2],
        subTasks: [
          {
            id: 'bp002-st6',
            title: 'Rédaction rapport pré-inspection',
            assignedAgentId: 'AG12-Proposal',
            assignedAgentName: 'Proposal AI',
            agentDomain: 'Proposal',
            inputFrom: ['bp002-st1', 'bp002-st3', 'bp002-st4', 'bp002-st5'],
            outputTo: [],
            estimatedDurationMin: 50,
            criticalPath: true,
            tools: ['Report Generator', 'PDF Engine'],
            validationCheck: 'Rapport structuré, plan correctif priorisé P0→P3',
          },
        ],
      },
    ],
    crossValidationStrategy: 'Audit AI + Compliance AI cross-validate sur les seuils prudentiels',
    contradictionsResolution: 'semi_auto',
    successRateHistorical: 94,
    totalDecompositions: 22,
  },
  {
    id: 'bp-003',
    missionType: 'Documentation Prix de Transfert BEPS 2.0',
    missionExample: 'Documentation Master File + Local File pour un groupe industriel avec 5 filiales en zone UEMOA',
    complexity: 'medium',
    estimatedDurationMin: 180,
    phases: [
      {
        order: 1,
        name: 'Phase 1 — Analyse Fonctionnelle & Benchmarking',
        durationPct: 35,
        dependencies: [],
        subTasks: [
          {
            id: 'bp003-st1',
            title: 'Analyse fonctionnelle du groupe',
            assignedAgentId: 'AG5-TP',
            assignedAgentName: 'Transfer Pricing AI',
            agentDomain: 'Transfer Pricing',
            inputFrom: [],
            outputTo: ['bp003-st3', 'bp003-st4'],
            estimatedDurationMin: 35,
            criticalPath: true,
            tools: ['TP Analyzer', 'Functional Analysis Engine'],
            validationCheck: 'Chaîne de valeur documentée, fonctions/actifs/risques identifiés',
          },
          {
            id: 'bp003-st2',
            title: 'Étude de comparables (benchmarking)',
            assignedAgentId: 'AG5-TP',
            assignedAgentName: 'Transfer Pricing AI',
            agentDomain: 'Transfer Pricing',
            inputFrom: [],
            outputTo: ['bp003-st3'],
            estimatedDurationMin: 30,
            criticalPath: false,
            tools: ['Benchmarking Engine', 'Comparables DB'],
            validationCheck: 'Set de comparables validé, fourchette arm\'s length calculée',
          },
        ],
      },
      {
        order: 2,
        name: 'Phase 2 — Analyse Fiscale & BEPS',
        durationPct: 25,
        dependencies: [1],
        subTasks: [
          {
            id: 'bp003-st3',
            title: 'Analyse BEPS 2.0 — Pilier 2 impacts',
            assignedAgentId: 'AG6-Tax',
            assignedAgentName: 'Tax AI',
            agentDomain: 'Tax',
            inputFrom: ['bp003-st1', 'bp003-st2'],
            outputTo: ['bp003-st6'],
            estimatedDurationMin: 25,
            criticalPath: true,
            tools: ['BEPS Analyzer', 'Tax Engine'],
            validationCheck: 'Impact Pilier 2 quantifié, Top-Up Tax estimée',
          },
          {
            id: 'bp003-st4',
            title: 'Analyse des transactions intra-groupe',
            assignedAgentId: 'AG5-TP',
            assignedAgentName: 'Transfer Pricing AI',
            agentDomain: 'Transfer Pricing',
            inputFrom: ['bp003-st1'],
            outputTo: ['bp003-st6'],
            estimatedDurationMin: 20,
            criticalPath: false,
            tools: ['Transaction Analyzer', 'TP Documentation Engine'],
            validationCheck: 'Toutes les transactions > seuil documentées',
          },
        ],
      },
      {
        order: 3,
        name: 'Phase 3 — Documentation',
        durationPct: 30,
        dependencies: [2],
        subTasks: [
          {
            id: 'bp003-st5',
            title: 'Capitalisation dans Knowledge Repository',
            assignedAgentId: 'AG8-Knowledge',
            assignedAgentName: 'Knowledge AI',
            agentDomain: 'Knowledge',
            inputFrom: [],
            outputTo: ['bp003-st6'],
            estimatedDurationMin: 15,
            criticalPath: false,
            tools: ['RAG Indexer', 'Knowledge Graph'],
            validationCheck: 'Nouveaux précédents et comparables indexés',
          },
          {
            id: 'bp003-st6',
            title: 'Rédaction Master File + Local File',
            assignedAgentId: 'AG12-Proposal',
            assignedAgentName: 'Proposal AI',
            agentDomain: 'Proposal',
            inputFrom: ['bp003-st3', 'bp003-st4', 'bp003-st5'],
            outputTo: [],
            estimatedDurationMin: 45,
            criticalPath: true,
            tools: ['TP Documentation Engine', 'PDF Generator'],
            validationCheck: 'Master File + 5 Local Files conformes BEPS Action 13',
          },
        ],
      },
    ],
    crossValidationStrategy: 'Tax AI vérifie la cohérence Master File vs Local Files',
    contradictionsResolution: 'auto',
    successRateHistorical: 88,
    totalDecompositions: 9,
  },
];

// --- DECOMPOSITION STATS ---

export const decompositionStats: DecompositionStats = {
  totalBlueprints: 12,
  missionsDecomposed: 67,
  avgSubTasksPerMission: 9.4,
  avgPhasesPerMission: 3.2,
  criticalPathOptimizationRate: 34,
  parallelExecutionRate: 62,
  agentUtilizationRate: 78,
};

// --- ACTIVE DECOMPOSITIONS (en cours via Orchestrator Engine) ---

export interface ActiveDecomposition {
  id: string;
  blueprintId: string;
  missionDescription: string;
  startedAt: string;
  estimatedCompletion: string;
  progress: number;
  phasesCompleted: number;
  totalPhases: number;
  subTasksCompleted: number;
  totalSubTasks: number;
  agentsActive: string[];
  orchestratorExecutionId: string;
  status: 'queued' | 'running' | 'paused' | 'completed' | 'failed';
  currentBottleneck: string | null;
}

export const activeDecompositions: ActiveDecomposition[] = [
  {
    id: 'ad-001',
    blueprintId: 'bp-001',
    missionDescription: 'Due diligence acquisition FinTech CEMAC — 3 entités',
    startedAt: '2026-06-27T06:00:00Z',
    estimatedCompletion: '2026-06-27T11:20:00Z',
    progress: 42,
    phasesCompleted: 1,
    totalPhases: 4,
    subTasksCompleted: 4,
    totalSubTasks: 9,
    agentsActive: ['AG3-Compliance', 'AG4-AML', 'AG6-Tax', 'AG2-Risk'],
    orchestratorExecutionId: 'EXEC-due-diligence-1719475200-a7b2c9',
    status: 'running',
    currentBottleneck: null,
  },
  {
    id: 'ad-002',
    blueprintId: 'bp-002',
    missionDescription: 'Pré-inspection BCEAO — Banque UEMOA Top 5',
    startedAt: '2026-06-27T07:30:00Z',
    estimatedCompletion: '2026-06-27T11:30:00Z',
    progress: 28,
    phasesCompleted: 0,
    totalPhases: 3,
    subTasksCompleted: 2,
    totalSubTasks: 7,
    agentsActive: ['AG3-Compliance', 'AG7-Audit', 'AG4-AML'],
    orchestratorExecutionId: 'EXEC-pre-inspection-1719480600-d4e8f3',
    status: 'running',
    currentBottleneck: 'AG7-Audit — attente données ratios prudentiels',
  },
  {
    id: 'ad-003',
    blueprintId: 'bp-003',
    missionDescription: 'Documentation TP — Groupe Industriel 5 filiales',
    startedAt: '',
    estimatedCompletion: '',
    progress: 0,
    phasesCompleted: 0,
    totalPhases: 3,
    subTasksCompleted: 0,
    totalSubTasks: 7,
    agentsActive: [],
    orchestratorExecutionId: '',
    status: 'queued',
    currentBottleneck: null,
  },
];

export const orchestratorHealth = {
  status: 'healthy',
  activePipelines: 2,
  queuedPipelines: 1,
  failedPipelines24h: 0,
  avgExecutionTimeMs: 485000,
  autoRecoveryRate: 97,
  circuitBreakersOpen: 0,
  dlqSize: 3,
  lastHealthCheck: '2026-06-27T10:15:00Z',
};



