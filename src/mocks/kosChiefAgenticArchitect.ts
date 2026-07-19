// KOS Chief Agentic Architect Command Center™ — Mock Data
// Architecte en Chef des Systèmes Agentiques & Directeur de l'IA
// 4 Piliers 2026 : ReCognitive · MCP · Einstein Trust · Auto-Apprentissage

export interface AgenticCompetence {
  id: string;
  name: string;
  icon: string;
  description: string;
  edgeFunctions: string[];
  skillLevel: 'expert' | 'advanced' | 'foundational';
  activationMode: 'autonomous' | 'on_demand' | 'triggered';
  performanceScore: number;
  invocationCount: number;
  lastInvoked: string;
  dataLineage: DataLineageEntry[];
}

export interface DataLineageEntry {
  id: string;
  source: string;
  type: 'regulatory_text' | 'scientific_paper' | 'bigfour_methodology' | 'world_bank_data' | 'iso_standard' | 'internal_knowledge';
  description: string;
  url?: string;
  lastVerified: string;
  trustScore: number;
}

export interface AutonomousAgent {
  id: string;
  name: string;
  role: string;
  icon: string;
  posture: 'observe_and_act' | 'proactive_anticipation' | 'scenario_simulation';
  planningHorizon: string;
  competencies: string[];
  edgeFunctionSlug: string;
  status: 'active' | 'learning' | 'idle';
  successRate: number;
  decisionsMade: number;
  obstaclesAnticipated: number;
  alternativeSources: string[];
  lastLongHorizonPlan: string;
}

export interface MCPSkill {
  id: string;
  name: string;
  icon: string;
  description: string;
  inputs: string[];
  outputs: string[];
  agenticOrchestration: string;
  qualityGates: QualityGate[];
  traceabilityLevel: 'full' | 'partial' | 'minimal';
  dataLineageChain: string[];
  ibmWatsonxCompliant: boolean;
  mcpVersion: string;
  invocationCount: number;
  successRate: number;
}

export interface QualityGate {
  id: string;
  name: string;
  metric: string;
  threshold: string;
  action: 'pass' | 'retry' | 'escalate';
  autoCorrect: boolean;
}

export interface TrustLayerProtocol {
  id: string;
  name: string;
  domain: 'data_isolation' | 'financial_sovereignty' | 'regulatory_alignment' | 'identity_verification' | 'audit_trail';
  description: string;
  isolationLevel: 'absolute' | 'strict' | 'standard';
  localRegulations: string[];
  enforcementMode: 'automatic' | 'supervised' | 'advisory';
  controls: TrustControl[];
  violationCount: number;
  lastViolation: string;
  einsteinLayerCompliant: boolean;
}

export interface TrustControl {
  id: string;
  name: string;
  type: 'preventive' | 'detective' | 'corrective';
  status: 'active' | 'testing' | 'planned';
  countriesApplied: string[];
  edgeFunctionSlug: string;
}

export interface InnovationAgentiqueArtifact {
  id: string;
  tag: string;
  domain: string;
  africanChallenge: string;
  contextMemoryAdjustment: string;
  bigFourStandardReference: string;
  gapAnalysis: string;
  createdAt: string;
  version: string;
  iterations: number;
  improvementScore: number;
  reusableBy: string[];
  injectedInContext: boolean;
}

export interface AgenticArchitectStats {
  totalCompetences: number;
  activeCompetences: number;
  totalAgents: number;
  autonomousAgents: number;
  totalSkills: number;
  mcpCompliantSkills: number;
  totalTrustProtocols: number;
  einsteinCompliant: number;
  totalInnovations: number;
  totalIterations: number;
  estimatedCognitiveUplift: string;
}

// ============================================================
// PILIER 1 : COMPÉTENCES AGENTIQUES — RECOGNITIVE TRANSITION
// ============================================================

export const AGENTIC_COMPETENCES: AgenticCompetence[] = [
  {
    id: 'comp-001',
    name: '[AUDIT-ISO] Audit International Standards',
    icon: 'ri-search-eye-line',
    description: 'Compétence agentique de conduite d\'audits complets selon les standards ISO (37301, 27001, 22301, 31000, 9001) avec posture "Observe and Act" — planification autonome du long horizon, anticipation des gaps documentaires.',
    edgeFunctions: ['kos-senior-compliance-auditor', 'kos-compliance-factory-engine', 'kos-regulatory-quality-assurance'],
    skillLevel: 'expert',
    activationMode: 'autonomous',
    performanceScore: 96.3,
    invocationCount: 1427,
    lastInvoked: '2026-06-27T09:00:00Z',
    dataLineage: [
      { id: 'dl-001a', source: 'ISO 37301:2021', type: 'iso_standard', description: 'Systèmes de management de la conformité — Exigences et recommandations', url: 'https://www.iso.org/standard/75080.html', lastVerified: '2026-06-01', trustScore: 99 },
      { id: 'dl-001b', source: 'ISO 27001:2022', type: 'iso_standard', description: 'Sécurité de l\'information, cybersécurité et protection de la vie privée', url: 'https://www.iso.org/standard/27001', lastVerified: '2026-06-01', trustScore: 99 },
      { id: 'dl-001c', source: 'COSO Internal Control Framework', type: 'bigfour_methodology', description: 'Cadre intégré de contrôle interne — 17 principes', lastVerified: '2026-05-15', trustScore: 98 },
    ],
  },
  {
    id: 'comp-002',
    name: '[REGULATION-BCEAO] Maîtrise Réglementaire UEMOA',
    icon: 'ri-bank-line',
    description: 'Compétence agentique experte sur l\'ensemble du corpus réglementaire BCEAO : instructions aux SFD, circulaires bancaires, dispositif prudentiel, LCB/FT. Capacité autonome d\'anticipation des évolutions réglementaires.',
    edgeFunctions: ['kos-regulatory-brain', 'kos-regulatory-scout', 'kos-knowledge-manager'],
    skillLevel: 'expert',
    activationMode: 'triggered',
    performanceScore: 97.8,
    invocationCount: 3891,
    lastInvoked: '2026-06-27T08:45:00Z',
    dataLineage: [
      { id: 'dl-002a', source: 'Instruction BCEAO 008-05-2015', type: 'regulatory_text', description: 'Dispositif prudentiel applicable aux SFD de l\'UMOA', lastVerified: '2026-06-26', trustScore: 100 },
      { id: 'dl-002b', source: 'Circulaire BCEAO 01-2017/CB/C', type: 'regulatory_text', description: 'Gouvernance des établissements de crédit UMOA', lastVerified: '2026-06-26', trustScore: 100 },
      { id: 'dl-002c', source: 'Loi Uniforme UMOA sur la LCB/FT', type: 'regulatory_text', description: 'Cadre juridique LCB/FT zone UEMOA', lastVerified: '2026-05-20', trustScore: 100 },
    ],
  },
  {
    id: 'comp-003',
    name: '[FINANCE-MODEL] Modélisation Financière Big Four',
    icon: 'ri-line-chart-line',
    description: 'Compétence de construction autonome de modèles financiers complexes (business plans, stress tests, projections IFRS 9, valorisations) avec benchmarks Big Four. Anticipation proactive des scénarios de stress.',
    edgeFunctions: ['kos-financial-analysis-engine', 'kos-kpi-recalculation-engine', 'kos-executive-research-engine'],
    skillLevel: 'expert',
    activationMode: 'on_demand',
    performanceScore: 94.1,
    invocationCount: 856,
    lastInvoked: '2026-06-26T16:30:00Z',
    dataLineage: [
      { id: 'dl-003a', source: 'IFRS 9 Financial Instruments', type: 'iso_standard', description: 'Instruments financiers — Classement, évaluation, dépréciation', lastVerified: '2026-06-01', trustScore: 99 },
      { id: 'dl-003b', source: 'Banque Mondiale — Africa Pulse 2026', type: 'world_bank_data', description: 'Données macroéconomiques Afrique subsaharienne', url: 'https://www.worldbank.org/en/region/afr/publication/africas-pulse', lastVerified: '2026-06-15', trustScore: 95 },
      { id: 'dl-003c', source: 'Deloitte Financial Modelling Standards', type: 'bigfour_methodology', description: 'Best practices modélisation financière', lastVerified: '2026-04-10', trustScore: 94 },
    ],
  },
  {
    id: 'comp-004',
    name: '[GOV-RISK] Gouvernance & Risk Management',
    icon: 'ri-shield-line',
    description: 'Compétence agentique d\'architecture de gouvernance : cartographie des risques, matrice RACI, comités spécialisés, dispositif de contrôle interne. Planification autonome du cycle annuel de gouvernance.',
    edgeFunctions: ['kos-enterprise-risk-engine', 'kos-policy-governance-engine', 'kos-enterprise-governance-command'],
    skillLevel: 'advanced',
    activationMode: 'autonomous',
    performanceScore: 91.5,
    invocationCount: 672,
    lastInvoked: '2026-06-27T07:00:00Z',
    dataLineage: [
      { id: 'dl-004a', source: 'ISO 31000:2018', type: 'iso_standard', description: 'Management du risque — Lignes directrices', lastVerified: '2026-06-01', trustScore: 99 },
      { id: 'dl-004b', source: 'COSO ERM 2017', type: 'bigfour_methodology', description: 'Enterprise Risk Management — Integrating Strategy', lastVerified: '2026-05-01', trustScore: 97 },
      { id: 'dl-004c', source: 'Circulaire COBAC R-2019/01', type: 'regulatory_text', description: 'Gouvernance établissements CEMAC', lastVerified: '2026-06-20', trustScore: 100 },
    ],
  },
  {
    id: 'comp-005',
    name: '[COMPLIANCE-LCBFT] LCB/FT & Conformité GAFI',
    icon: 'ri-fingerprint-line',
    description: 'Compétence agentique de conformité LCB/FT experte : évaluation nationale des risques, KYC/CDD renforcé, détection PEP, screening sanctions, reporting TRACFIN/CENTIF. Anticipation des évolutions GAFI.',
    edgeFunctions: ['kos-ai-compliance-fraud-intelligence', 'kos-senior-compliance-auditor', 'kos-security-logger'],
    skillLevel: 'expert',
    activationMode: 'triggered',
    performanceScore: 95.7,
    invocationCount: 2103,
    lastInvoked: '2026-06-27T09:30:00Z',
    dataLineage: [
      { id: 'dl-005a', source: 'GAFI Recommandations 2024', type: 'regulatory_text', description: '40 Recommandations GAFI révisées', lastVerified: '2026-06-01', trustScore: 99 },
      { id: 'dl-005b', source: 'Règlement CEMAC 01/03-CEMAC-UMAC', type: 'regulatory_text', description: 'LCB/FT zone CEMAC', lastVerified: '2026-06-20', trustScore: 100 },
      { id: 'dl-005c', source: 'Wolfsberg Group Standards', type: 'bigfour_methodology', description: 'Principes de gestion des risques de criminalité financière', lastVerified: '2026-05-01', trustScore: 97 },
    ],
  },
  {
    id: 'comp-006',
    name: '[STRATEGY-AFRICA] Stratégie & Intelligence Économique Afrique',
    icon: 'ri-global-line',
    description: 'Compétence agentique d\'intelligence stratégique panafricaine : analyse des marchés, veille concurrentielle, études d\'implantation, due diligence. Posture "Observe and Act" avec simulation de scénarios alternatifs basés sur benchmarks Big Four.',
    edgeFunctions: ['kos-market-intelligence-center', 'kos-competitive-intelligence', 'kos-strategic-planning-engine'],
    skillLevel: 'advanced',
    activationMode: 'autonomous',
    performanceScore: 89.2,
    invocationCount: 534,
    lastInvoked: '2026-06-26T14:00:00Z',
    dataLineage: [
      { id: 'dl-006a', source: 'BAD — Perspectives Économiques Afrique 2026', type: 'world_bank_data', description: 'Rapport annuel Banque Africaine de Développement', url: 'https://www.afdb.org/en/knowledge/publications/african-economic-outlook', lastVerified: '2026-06-10', trustScore: 96 },
      { id: 'dl-006b', source: 'FMI — Regional Economic Outlook Afrique Subsaharienne', type: 'world_bank_data', description: 'Perspectives économiques régionales FMI', lastVerified: '2026-06-01', trustScore: 97 },
      { id: 'dl-006c', source: 'McKinsey Africa Insights 2026', type: 'bigfour_methodology', description: 'Analyses sectorielles et géographiques Afrique', lastVerified: '2026-05-15', trustScore: 93 },
    ],
  },
  {
    id: 'comp-007',
    name: '[KNOWLEDGE-RAG] Capitalisation & RAG Knowledge',
    icon: 'ri-brain-line',
    description: 'Compétence agentique de capitalisation des connaissances : capture automatique des livrables, extraction des insights, vectorisation, indexation RAG. Architecture de compétences MCP : chaque agent appelle cette compétence comme un service standardisé.',
    edgeFunctions: ['kos-knowledge-manager', 'rag-semantic-search', 'kos-rag-source-enricher'],
    skillLevel: 'expert',
    activationMode: 'autonomous',
    performanceScore: 98.2,
    invocationCount: 6789,
    lastInvoked: '2026-06-27T10:00:00Z',
    dataLineage: [
      { id: 'dl-007a', source: 'KHEPRA Knowledge Operating System™', type: 'internal_knowledge', description: 'Architecture KOS de capitalisation intellectuelle', lastVerified: '2026-06-27', trustScore: 100 },
      { id: 'dl-007b', source: 'Qdrant Vector Database', type: 'internal_knowledge', description: 'Base vectorielle RAG KOS', lastVerified: '2026-06-27', trustScore: 100 },
    ],
  },
  {
    id: 'comp-008',
    name: '[CLOSING-ENTERPRISE] Closing & Négociation Grands Comptes',
    icon: 'ri-hand-heart-line',
    description: 'Compétence agentique de closing commercial niveau Big Four : structuration offres 3 niveaux, ROI calculator, ancrage valeur, gestion cycle long Afrique, négociation institutionnelle. Anticipation proactive des objections.',
    edgeFunctions: ['kos-closing-growth-engine', 'kos-lead-scoring', 'kos-proposal-generator'],
    skillLevel: 'advanced',
    activationMode: 'on_demand',
    performanceScore: 87.8,
    invocationCount: 423,
    lastInvoked: '2026-06-26T18:00:00Z',
    dataLineage: [
      { id: 'dl-008a', source: 'KHEPRA Growth Engine Playbook', type: 'internal_knowledge', description: 'Méthodologie closing Khepra Experts', lastVerified: '2026-06-15', trustScore: 100 },
      { id: 'dl-008b', source: 'McKinsey B2B Sales Playbook', type: 'bigfour_methodology', description: 'Best practices vente B2B', lastVerified: '2026-04-01', trustScore: 91 },
    ],
  },
];

// ============================================================
// PILIER 1.5 : AGENTS AUTONOMES — POSTURE "OBSERVE AND ACT"
// ============================================================

export const AUTONOMOUS_AGENTS: AutonomousAgent[] = [
  {
    id: 'agent-001',
    name: 'KOS Chief Strategy Agent',
    role: 'Stratège Autonome — Marchés Financiers Africains',
    icon: 'ri-robot-2-line',
    posture: 'observe_and_act',
    planningHorizon: 'Trimestriel (90 jours)',
    competencies: ['[REGULATION-BCEAO]', '[STRATEGY-AFRICA]', '[FINANCE-MODEL]'],
    edgeFunctionSlug: 'kos-strategic-reasoning-engine',
    status: 'active',
    successRate: 93.4,
    decisionsMade: 1247,
    obstaclesAnticipated: 389,
    alternativeSources: ['Rapports FMI non publiés → simulations basées sur tendances', 'Données BCEAO partielles → extrapolation Big Four', 'Absence bilans SFD → benchmark ratios prudentiels'],
    lastLongHorizonPlan: 'Plan trimestriel Q3 2026 — Expansion CEMAC + Fintech (généré le 2026-06-25)',
  },
  {
    id: 'agent-002',
    name: 'KOS Autonomous Compliance Agent',
    role: 'Agent de Conformité Autonome — Supervision Réglementaire',
    icon: 'ri-shield-check-line',
    posture: 'proactive_anticipation',
    planningHorizon: 'Semestriel (180 jours)',
    competencies: ['[COMPLIANCE-LCBFT]', '[REGULATION-BCEAO]', '[AUDIT-ISO]'],
    edgeFunctionSlug: 'kos-autonomous-compliance-pipeline',
    status: 'active',
    successRate: 96.1,
    decisionsMade: 893,
    obstaclesAnticipated: 567,
    alternativeSources: ['Texte COBAC non numérisé → OCR + parsing IA', 'Absence jurisprudence → doctrine académique africaine', 'Silence régulateur → benchmark autres juridictions UEMOA/CEMAC'],
    lastLongHorizonPlan: 'Planning audits Q3-Q4 2026 — 47 entités sous surveillance (généré le 2026-06-20)',
  },
  {
    id: 'agent-003',
    name: 'KOS Growth Intelligence Agent',
    role: 'Agent de Croissance Autonome — Pipeline & Revenue',
    icon: 'ri-line-chart-fill',
    posture: 'scenario_simulation',
    planningHorizon: 'Mensuel (30 jours, rolling)',
    competencies: ['[CLOSING-ENTERPRISE]', '[STRATEGY-AFRICA]', '[FINANCE-MODEL]'],
    edgeFunctionSlug: 'kos-autonomous-growth-team',
    status: 'active',
    successRate: 88.9,
    decisionsMade: 2156,
    obstaclesAnticipated: 432,
    alternativeSources: ['Cycle décisionnel ralenti → nurturing intensifié', 'Perte champion interne → activation réseau alumni', 'Budgets gelés Q4 → offre modulaire allégée'],
    lastLongHorizonPlan: 'Pipeline Q3 2026 — 42M FCFA cible, 18 comptes prioritaires (généré le 2026-06-27)',
  },
  {
    id: 'agent-004',
    name: 'KOS Knowledge Synthesis Agent',
    role: 'Agent de Synthèse Cognitive — Capitalisation Continue',
    icon: 'ri-loop-left-line',
    posture: 'observe_and_act',
    planningHorizon: 'Continu (temps réel)',
    competencies: ['[KNOWLEDGE-RAG]', '[AUDIT-ISO]', '[REGULATION-BCEAO]'],
    edgeFunctionSlug: 'kos-knowledge-manager',
    status: 'learning',
    successRate: 97.8,
    decisionsMade: 4567,
    obstaclesAnticipated: 156,
    alternativeSources: ['Document propriétaire non structuré → LLM parsing', 'Connaissance tacite expert → capture structurée', 'Article non indexé → crawling manuel'],
    lastLongHorizonPlan: 'Plan capitalisation Q3 — 500+ livrables clients → RAG (généré le 2026-06-26)',
  },
];

// ============================================================
// PILIER 2 : PROTOCOLE COGNITIF UNIFIÉ — MCP SKILLS
// ============================================================

export const MCP_SKILLS: MCPSkill[] = [
  {
    id: 'mcp-001',
    name: 'MCP: Audit de Conformité BCEAO/COBAC',
    icon: 'ri-file-search-line',
    description: 'Skill MCP standardisé d\'audit complet de conformité réglementaire. Orchestré via l\'appel de compétences atomiques [AUDIT-ISO], [REGULATION-BCEAO], [COMPLIANCE-LCBFT]. Traçabilité IBM watsonx complète.',
    inputs: ['périmètre_entité', 'juridiction (UEMOA/CEMAC)', 'profondeur_audit', 'date_référence'],
    outputs: ['rapport_audit_PDF', 'matrice_conformité', 'plan_remédiation_priorisé', 'score_conformité_global'],
    agenticOrchestration: 'Workflow 4 étapes: Scan → Gap → Rapport → Remédiation. Quality gates à chaque étape avec auto-correction.',
    qualityGates: [
      { id: 'qg-mcp1-1', name: 'Couverture Textes', metric: 'Exhaustivité textes', threshold: '>95%', action: 'pass', autoCorrect: false },
      { id: 'qg-mcp1-2', name: 'Précision Citations', metric: 'Erreurs citations', threshold: '=0', action: 'retry', autoCorrect: true },
      { id: 'qg-mcp1-3', name: 'Qualité Livrable', metric: 'Score qualité Big Four', threshold: '>90/100', action: 'retry', autoCorrect: true },
    ],
    traceabilityLevel: 'full',
    dataLineageChain: ['ISO 37301:2021 → §4.1-4.4', 'Instruction BCEAO 008-05-2015 → Art. 12-18', 'Règlement COBAC R-2019/01 → Titre III', 'Méthodologie PwC Compliance Assessment'],
    ibmWatsonxCompliant: true,
    mcpVersion: '2.1.0',
    invocationCount: 487,
    successRate: 95.3,
  },
  {
    id: 'mcp-002',
    name: 'MCP: Due Diligence & Risk Assessment Afrique',
    icon: 'ri-search-2-line',
    description: 'Skill MCP standardisé de due diligence réglementaire et financière. Architecture modulaire appelant les compétences [STRATEGY-AFRICA], [FINANCE-MODEL], [COMPLIANCE-LCBFT]. Conforme standards IBM watsonx pour l\'explicabilité.',
    inputs: ['entité_cible', 'pays_implantation', 'secteur_activité', 'profondeur_analyse'],
    outputs: ['rapport_due_diligence', 'matrice_risques', 'score_risque_global', 'recommandations_stratégiques'],
    agenticOrchestration: "Pipeline: KYC/KYB → Analyse financière → Conformité réglementaire → Risques réputationnels → Synthèse COMEX. Chaque module produit sa propre data lineage.",
    qualityGates: [
      { id: 'qg-mcp2-1', name: 'Vérification KYC', metric: 'Identité vérifiée', threshold: '100%', action: 'escalate', autoCorrect: false },
      { id: 'qg-mcp2-2', name: 'Analyse Financière', metric: 'Ratios clés couverts', threshold: '>12 ratios', action: 'pass', autoCorrect: false },
      { id: 'qg-mcp2-3', name: 'Risques Identifiés', metric: 'Taux couverture risques', threshold: '>90%', action: 'retry', autoCorrect: true },
    ],
    traceabilityLevel: 'full',
    dataLineageChain: ['Banque Mondiale — Doing Business 2026', 'BAD — Perspectives Économiques', 'GAFI — Mutual Evaluation Reports', 'Sources ouvertes — Media Monitoring'],
    ibmWatsonxCompliant: true,
    mcpVersion: '1.8.0',
    invocationCount: 321,
    successRate: 92.8,
  },
  {
    id: 'mcp-003',
    name: 'MCP: Khepra Business Review (KBR) — Génération Full Auto',
    icon: 'ri-article-line',
    description: 'Skill MCP standardisé de génération automatique de KBR. Architecture agentique 4 sous-étapes avec auto-correction. Interopérabilité virtuelle : chaque agent KOS appelle cette skill comme un service standardisé.',
    inputs: ['thématique_KBR', 'juridiction_cible', 'public_cible', 'niveau_technique'],
    outputs: ['KBR_PDF_final', 'résumé_executif', 'post_LinkedIn_optimisé', 'métadonnées_SEO'],
    agenticOrchestration: 'Collecte réglementaire → Analyse comparative → Synthèse Minto → QA éditorial. Validation citations + vérification croisée.',
    qualityGates: [
      { id: 'qg-mcp3-1', name: 'Validation Sources', metric: 'Sources vérifiées', threshold: '100%', action: 'escalate', autoCorrect: false },
      { id: 'qg-mcp3-2', name: 'Score Lisibilité', metric: 'Flesch-Kincaid adapté', threshold: '>65', action: 'retry', autoCorrect: true },
      { id: 'qg-mcp3-3', name: 'Citations Exactes', metric: 'Erreurs de citation', threshold: '=0', action: 'retry', autoCorrect: true },
    ],
    traceabilityLevel: 'full',
    dataLineageChain: ['Sources réglementaires primaires (BCEAO/COBAC/OHADA)', 'Analyses Big Four (PwC/Deloitte/KPMG/EY)', 'Revues académiques africaines', 'Statistiques Banque Mondiale/BAD'],
    ibmWatsonxCompliant: true,
    mcpVersion: '2.3.0',
    invocationCount: 892,
    successRate: 94.7,
  },
  {
    id: 'mcp-004',
    name: 'MCP: Modélisation Financière Projet Afrique',
    icon: 'ri-funds-box-line',
    description: 'Skill MCP standardisé de modélisation financière pour projets africains (infrastructure, énergie, fintech, microfinance). Conforme normes IFRS, BCEAO, COBAC. Interopérabilité avec Excel/Google Sheets.',
    inputs: ['paramètres_projet', 'hypothèses_macro', 'juridiction', 'devise (FCFA/EUR/USD)'],
    outputs: ['modèle_financier_XLSX', 'analyse_sensibilité', 'stress_test_scenarios', 'résumé_exécutif_investisseurs'],
    agenticOrchestration: 'Collecte hypothèses → Modélisation base → Scénarios alternatifs → Validation ratios → Génération rapport. Simulation proactive de 3 scénarios de stress minimum.',
    qualityGates: [
      { id: 'qg-mcp4-1', name: 'Cohérence Modèle', metric: 'Équation bilan', threshold: 'Actif = Passif', action: 'retry', autoCorrect: true },
      { id: 'qg-mcp4-2', name: 'Ratios Prudentiels', metric: 'Conformité ratios', threshold: '> seuils BCEAO/COBAC', action: 'escalate', autoCorrect: false },
      { id: 'qg-mcp4-3', name: 'Stress Test', metric: 'Scénarios adverses', threshold: '≥3 scénarios', action: 'pass', autoCorrect: false },
    ],
    traceabilityLevel: 'full',
    dataLineageChain: ['IFRS 9 — Dépréciation', 'Instruction BCEAO 008-05-2015 — Ratios prudentiels', 'Hypothèses macro BAD/FMI 2026', 'Benchmarks sectoriels Big Four'],
    ibmWatsonxCompliant: true,
    mcpVersion: '1.5.0',
    invocationCount: 256,
    successRate: 91.4,
  },
  {
    id: 'mcp-005',
    name: 'MCP: Veille & Alerte Réglementaire Afrique',
    icon: 'ri-radar-line',
    description: 'Skill MCP standardisé de veille réglementaire panafricaine automatisée. Monitore 12 juridictions, 8 régulateurs. Posture proactive : anticipe les projets de texte avant publication officielle.',
    inputs: ['juridictions_surveillées', 'secteurs_ciblés', 'seuil_alerte', 'fréquence_scan'],
    outputs: ['bulletin_hebdomadaire', 'alertes_critiques_temps_réel', 'analyse_impact', 'recommandations_action'],
    agenticOrchestration: 'Scan multi-sources → Filtrage pertinence → Analyse impact → Classification criticité → Diffusion ciblée. Auto-apprentissage des patterns d\'alerte pertinents.',
    qualityGates: [
      { id: 'qg-mcp5-1', name: 'Couverture Sources', metric: 'Sources actives', threshold: '>95%', action: 'retry', autoCorrect: true },
      { id: 'qg-mcp5-2', name: 'Faux Positifs', metric: 'Taux faux positifs', threshold: '<5%', action: 'escalate', autoCorrect: false },
    ],
    traceabilityLevel: 'full',
    dataLineageChain: ['JO Sénégal/Côte d\'Ivoire/Bénin/Togo/Cameroun/Gabon', 'Sites BCEAO/COBAC/OHADA/GAFI', 'Veille parlementaire UEMOA/CEMAC'],
    ibmWatsonxCompliant: true,
    mcpVersion: '2.0.0',
    invocationCount: 2145,
    successRate: 96.9,
  },
  {
    id: 'mcp-006',
    name: 'MCP: Closing Automatisé — Cycle Afrique',
    icon: 'ri-hand-heart-line',
    description: 'Skill MCP standardisé de closing commercial adapté au cycle de décision africain. Orchestration des compétences [CLOSING-ENTERPRISE], [STRATEGY-AFRICA], [FINANCE-MODEL]. Architecture MCP : chaque étape est une skill appelable indépendamment.',
    inputs: ['profil_lead', 'historique_interactions', 'secteur_pays', 'budget_estimé'],
    outputs: ['proposition_3_niveaux', 'ROI_calculator', 'script_closing_personnalisé', 'plan_relance_90_jours'],
    agenticOrchestration: 'Qualification → Nurturing → Proposition → Négociation → Closing. Quality gate à chaque transition avec auto-routing selon score.',
    qualityGates: [
      { id: 'qg-mcp6-1', name: 'Score Lead', metric: 'Score qualification', threshold: '>70/100', action: 'pass', autoCorrect: false },
      { id: 'qg-mcp6-2', name: 'ROI Documenté', metric: 'ROI projeté', threshold: '>5x', action: 'retry', autoCorrect: true },
      { id: 'qg-mcp6-3', name: 'Personnalisation', metric: 'Taux personnalisation', threshold: '>90%', action: 'retry', autoCorrect: true },
    ],
    traceabilityLevel: 'partial',
    dataLineageChain: ['Cas clients Khepra similaires', 'Benchmarks sectoriels Big Four', 'Données macro BAD pays cible'],
    ibmWatsonxCompliant: true,
    mcpVersion: '1.3.0',
    invocationCount: 178,
    successRate: 85.9,
  },
];

// ============================================================
// PILIER 3 : EINSTEIN TRUST LAYER — SÉCURITÉ & CONFIANCE EXTRÊME
// ============================================================

export const TRUST_LAYER_PROTOCOLS: TrustLayerProtocol[] = [
  {
    id: 'trust-001',
    name: 'Isolement Absolu — Données Financières FCFA',
    domain: 'financial_sovereignty',
    description: "Protocole d'isolement extrême des données financières libellées en FCFA. Étanchéité absolue : aucune donnée de montant, pipeline, valorisation ou salaire ne transite hors de l'infrastructure KOS sans chiffrement bout-en-bout et consentement explicite.",
    isolationLevel: 'absolute',
    localRegulations: ['BCEAO — Secret professionnel bancaire', 'COBAC — Confidentialité des données', 'RGPD Art. 32 — Sécurité du traitement'],
    enforcementMode: 'automatic',
    controls: [
      { id: 'tc-001a', name: 'Chiffrement AES-256 FCFA at-rest', type: 'preventive', status: 'active', countriesApplied: ['UEMOA', 'CEMAC'], edgeFunctionSlug: 'kos-security-logger' },
      { id: 'tc-001b', name: 'Masquage automatique données sensibles logs', type: 'preventive', status: 'active', countriesApplied: ['Tous'], edgeFunctionSlug: 'kos-security-logger' },
      { id: 'tc-001c', name: 'Audit trimestriel flux FCFA', type: 'detective', status: 'active', countriesApplied: ['UEMOA', 'CEMAC'], edgeFunctionSlug: 'kos-universal-audit-log' },
    ],
    violationCount: 0,
    lastViolation: '—',
    einsteinLayerCompliant: true,
  },
  {
    id: 'trust-002',
    name: 'Domaines d\'Isolement — Secrets Industriels Projets',
    domain: 'data_isolation',
    description: "Protocole de cloisonnement strict des secrets industriels (quarrying, énergie, fintech propriétaire). Chaque projet client est isolé dans un tenant logique distinct. Principe du 'besoin d'en connaître' appliqué automatiquement.",
    isolationLevel: 'absolute',
    localRegulations: ['OHADA — Secret des affaires', 'CDP Sénégal Loi 2008-12', 'APDP Bénin Loi 2017-20'],
    enforcementMode: 'automatic',
    controls: [
      { id: 'tc-002a', name: 'Tenant isolation logique par projet', type: 'preventive', status: 'active', countriesApplied: ['Tous'], edgeFunctionSlug: 'kos-platform-credentials' },
      { id: 'tc-002b', name: 'Need-to-know access control', type: 'preventive', status: 'active', countriesApplied: ['Tous'], edgeFunctionSlug: 'kos-admin-auth' },
      { id: 'tc-002c', name: 'Purge automatique données après mission', type: 'corrective', status: 'active', countriesApplied: ['Tous'], edgeFunctionSlug: 'kos-backup-automation' },
    ],
    violationCount: 0,
    lastViolation: '—',
    einsteinLayerCompliant: true,
  },
  {
    id: 'trust-003',
    name: 'Alignement Régulateurs Locaux — Instance par Instance',
    domain: 'regulatory_alignment',
    description: "Protocole de validation de chaque flux de décision agentique au regard des instances de protection des données d'Afrique francophone. Filtrage automatique par juridiction avant toute action autonome.",
    isolationLevel: 'strict',
    localRegulations: ['CDP Sénégal', 'APDP Bénin', 'ARTCI Côte d\'Ivoire', 'ANPDP Togo', 'CNIL Burkina Faso', 'CNDP Mali', 'HAPDP Niger'],
    enforcementMode: 'automatic',
    controls: [
      { id: 'tc-003a', name: 'Filtre juridictionnel automatique', type: 'preventive', status: 'active', countriesApplied: ['Sénégal', 'Bénin', 'Côte d\'Ivoire', 'Togo', 'Burkina Faso', 'Mali', 'Niger'], edgeFunctionSlug: 'kos-legal-ai-governance' },
      { id: 'tc-003b', name: 'Validation base légale par pays', type: 'detective', status: 'active', countriesApplied: ['Tous'], edgeFunctionSlug: 'kos-regulatory-citation-validator' },
      { id: 'tc-003c', name: 'Registre traitement localisé (12 pays)', type: 'corrective', status: 'testing', countriesApplied: ['Tous UEMOA/CEMAC'], edgeFunctionSlug: 'kos-data-governance' },
    ],
    violationCount: 2,
    lastViolation: '2026-06-15 — Flux non filtré détecté (corrigé en 4 min)',
    einsteinLayerCompliant: true,
  },
  {
    id: 'trust-004',
    name: 'Chaîne de Custody — Décisions IA Auditable',
    domain: 'audit_trail',
    description: "Protocole de traçabilité complète des décisions agentiques. Chaque recommandation stratégique KOS est chaînée à sa source, son agent, sa date, et sa validation humaine si nécessaire. Conforme exigences régulateurs africains.",
    isolationLevel: 'standard',
    localRegulations: ['ISO 27001 A.12.4', 'COSO Principle 12', 'BCEAO Dispositif Contrôle Interne'],
    enforcementMode: 'automatic',
    controls: [
      { id: 'tc-004a', name: 'kos_ai_decision_log — immuable', type: 'detective', status: 'active', countriesApplied: ['Tous'], edgeFunctionSlug: 'kos-universal-audit-log' },
      { id: 'tc-004b', name: 'Data lineage automatique par décision', type: 'detective', status: 'active', countriesApplied: ['Tous'], edgeFunctionSlug: 'kos-knowledge-manager' },
      { id: 'tc-004c', name: 'Validation humaine requise (décisions > 50M FCFA)', type: 'preventive', status: 'active', countriesApplied: ['Tous'], edgeFunctionSlug: 'kos-executive-command-center' },
    ],
    violationCount: 1,
    lastViolation: '2026-05-28 — Décision non documentée (ajout rétroactif + amélioration process)',
    einsteinLayerCompliant: true,
  },
  {
    id: 'trust-005',
    name: 'Identité & Vérification — KYC/KYB Fintech',
    domain: 'identity_verification',
    description: "Protocole de vérification d'identité et d'âge pour les services financiers régulés. Architecture prête pour l'intégration de solutions KYC locales africaines. Conforme exigences BCEAO et COBAC pour les Fintechs.",
    isolationLevel: 'strict',
    localRegulations: ['GAFI R.10 — Devoir de vigilance', 'BCEAO Instruction 008-05-2015', 'COBAC Règlement COBAC R-2018/01'],
    enforcementMode: 'supervised',
    controls: [
      { id: 'tc-005a', name: 'Schéma données KYC BCEAO', type: 'preventive', status: 'testing', countriesApplied: ['UEMOA'], edgeFunctionSlug: 'kos-compliance-factory-engine' },
      { id: 'tc-005b', name: 'OCR documents identité', type: 'detective', status: 'planned', countriesApplied: ['UEMOA', 'CEMAC'], edgeFunctionSlug: 'kos-ai-compliance-fraud-intelligence' },
      { id: 'tc-005c', name: 'Screening PEP/Sanctions (temps réel)', type: 'detective', status: 'planned', countriesApplied: ['Tous'], edgeFunctionSlug: 'kos-security-scan' },
    ],
    violationCount: 0,
    lastViolation: '—',
    einsteinLayerCompliant: false,
  },
];

// ============================================================
// PILIER 4 : AUTO-APPRENTISSAGE — INNOVATION AGENTIQUE CONTINUE
// ============================================================

export const INNOVATION_AGENTIQUE_ARTIFACTS: InnovationAgentiqueArtifact[] = [
  {
    id: 'ia-001',
    tag: 'INNOVATION-AGENTIQUE',
    domain: 'Autonomie Long Horizon — Prospection Réglementaire',
    africanChallenge: "Les textes réglementaires africains sont souvent publiés avec retard ou dans des formats non structurés (PDF scanné). L'agent doit anticiper les publications avant leur disponibilité officielle.",
    contextMemoryAdjustment: "Ajout au prompt système : « En cas d'indisponibilité d'un texte officiel, simule 3 scénarios basés sur les tendances réglementaires des 24 derniers mois dans la même juridiction. Documente explicitement le caractère simulé de l'analyse. »",
    bigFourStandardReference: 'Méthodologie PwC Regulatory Horizon Scanning',
    gapAnalysis: "Écart initial : l'agent attendait passivement les publications. Après 3 cycles : l'agent anticipe proactivement avec un taux de précision de 87% sur les scénarios simulés.",
    createdAt: '2026-06-15',
    version: '2.1.0',
    iterations: 3,
    improvementScore: 34,
    reusableBy: ['KOS Regulatory Scout', 'KOS Compliance Factory', 'KOS Legislative Analyst'],
    injectedInContext: true,
  },
  {
    id: 'ia-002',
    tag: 'INNOVATION-AGENTIQUE',
    domain: 'Négociation Grands Comptes — Cycle Afrique',
    africanChallenge: "Le cycle de décision en Afrique francophone intègre des dimensions informelles (réseaux, recommandations, validation hiérarchique étendue) que les modèles occidentaux ne capturent pas.",
    contextMemoryAdjustment: "Ajout au prompt système : « Intègre une phase de 'validation sociale' dans le pipeline de closing. Pour chaque compte > 50M FCFA, identifie 3 parties prenantes informelles à engager avant la proposition formelle. »",
    bigFourStandardReference: 'McKinsey — Winning in Africa\'s B2B Markets (2025)',
    gapAnalysis: "Écart initial : taux de closing 24%. Après ajustement : 38%. L'ajout du réseau informel a débloqué 6 comptes majeurs sur 8 tentatives.",
    createdAt: '2026-05-20',
    version: '1.8.0',
    iterations: 5,
    improvementScore: 58,
    reusableBy: ['KOS Closing Growth Engine', 'KOS Growth Orchestrator', 'KOS Proposal Generator'],
    injectedInContext: true,
  },
  {
    id: 'ia-003',
    tag: 'INNOVATION-AGENTIQUE',
    domain: 'Data Lineage — Explicabilité Régulateurs',
    africanChallenge: "Les régulateurs africains (BCEAO, COBAC, ARTCI) exigent de plus en plus l'explicabilité des décisions automatisées. Les agents doivent produire une piste d'audit complète et compréhensible.",
    contextMemoryAdjustment: "Ajout au prompt système : « Pour chaque recommandation, génère systématiquement une section 'Pourquoi cette décision' listant les 3 sources principales avec leur score de confiance et la date de dernière vérification. Format standardisé KOS Data Lineage. »",
    bigFourStandardReference: 'IBM watsonx.governance — Model Risk Management',
    gapAnalysis: "Écart initial : 23% des décisions sans data lineage complète. Après ajustement : 98% avec lineage complet. Acceptation régulateur améliorée de 40%.",
    createdAt: '2026-06-01',
    version: '2.0.0',
    iterations: 4,
    improvementScore: 45,
    reusableBy: ['TOUS les agents KOS', 'KOS AI Governance Council', 'KOS Regulatory Citation Validator'],
    injectedInContext: true,
  },
  {
    id: 'ia-004',
    tag: 'INNOVATION-AGENTIQUE',
    domain: 'Souveraineté FCFA — Filtrage Automatique',
    africanChallenge: "Les données financières en FCFA étaient parfois exposées dans des logs ou des appels API tiers non filtrés, créant un risque de conformité avec le secret bancaire UEMOA/CEMAC.",
    contextMemoryAdjustment: "Ajout au prompt système : « Avant tout appel API externe ou écriture de log, applique le filtre FCFA_SOVEREIGNTY_CHECK qui masque automatiquement les montants, pipelines et valorisations. En cas de doute, bloque l'appel et demande confirmation. »",
    bigFourStandardReference: 'Deloitte — Financial Data Sovereignty Framework',
    gapAnalysis: "Écart initial : 7 incidents d'exposition FCFA en 3 mois. Après ajustement : 0 incident en 2 mois. Conformité renforcée auprès des régulateurs.",
    createdAt: '2026-06-10',
    version: '1.2.0',
    iterations: 2,
    improvementScore: 100,
    reusableBy: ['TOUS les agents manipulant des données FCFA', 'KOS Security Logger', 'KOS Compliance Factory'],
    injectedInContext: true,
  },
  {
    id: 'ia-005',
    tag: 'INNOVATION-AGENTIQUE',
    domain: 'Knowledge Gap — Synthèse à partir de Données Partielles',
    africanChallenge: "Absence fréquente de données statistiques sectorielles actualisées en Afrique francophone. Les agents doivent produire des analyses stratégiques malgré des données incomplètes.",
    contextMemoryAdjustment: "Ajout au prompt système : « Si une donnée statistique sectorielle est manquante ou datée de plus de 18 mois : (1) cherche 3 proxies dans les bases BAD/BM/FMI, (2) documente le niveau d'incertitude, (3) propose une fourchette plutôt qu'un point. »",
    bigFourStandardReference: 'KPMG — Data-Driven Decision Making in Emerging Markets',
    gapAnalysis: "Écart initial : 31% des KBR contenaient des données obsolètes. Après ajustement : 8%. La méthode des proxies a augmenté la confiance des lecteurs de 55%.",
    createdAt: '2026-04-25',
    version: '2.5.0',
    iterations: 6,
    improvementScore: 72,
    reusableBy: ['KOS Strategic Intelligence', 'KOS Market Intelligence', 'KOS Executive Research Engine'],
    injectedInContext: true,
  },
  {
    id: 'ia-006',
    tag: 'INNOVATION-AGENTIQUE',
    domain: 'Interopérabilité Régulateurs — Multi-Juridiction',
    africanChallenge: "Les clients opérant dans plusieurs juridictions (UEMOA + CEMAC + OHADA) nécessitent des analyses de conformité multi-régulateurs. Les agents devaient traiter chaque juridiction séquentiellement.",
    contextMemoryAdjustment: "Ajout au prompt système : « Pour les analyses multi-juridictionnelles, exécute en parallèle l'analyse par juridiction, puis fusionne les résultats en identifiant les conflits normatifs potentiels. Priorise la norme la plus contraignante en cas de divergence. »",
    bigFourStandardReference: 'EY — Cross-Border Regulatory Compliance Framework',
    gapAnalysis: "Écart initial : traitement séquentiel (4h par juridiction). Après ajustement : parallélisation (1.5h total pour 3 juridictions). Détection proactive de 12 conflits normatifs sur 47 analyses.",
    createdAt: '2026-06-20',
    version: '1.0.0',
    iterations: 1,
    improvementScore: 67,
    reusableBy: ['KOS Regulatory Intelligence', 'KOS Compliance Factory', 'KOS Africa Intelligence Command'],
    injectedInContext: true,
  },
];

// ============================================================
// STATISTIQUES GLOBALES
// ============================================================

export const AGENTIC_ARCHITECT_STATS: AgenticArchitectStats = {
  totalCompetences: 8,
  activeCompetences: 8,
  totalAgents: 4,
  autonomousAgents: 4,
  totalSkills: 6,
  mcpCompliantSkills: 6,
  totalTrustProtocols: 5,
  einsteinCompliant: 4,
  totalInnovations: 6,
  totalIterations: 21,
  estimatedCognitiveUplift: '+340% autonomie agentique · -85% erreurs · +12M FCFA/mois · Confiance régulateurs: +65%',
};

// ============================================================
// LOGS LIVE
// ============================================================

export interface AgenticArchitectLog {
  id: string;
  timestamp: string;
  pillar: string;
  action: string;
  status: 'success' | 'warning' | 'error' | 'info';
  detail: string;
  edgeFunction: string;
}

export const INITIAL_AGENTIC_LOGS: AgenticArchitectLog[] = [
  {
    id: 'aa-001', timestamp: '2026-06-27T10:30:00Z', pillar: 'ReCognitive',
    action: 'Agent KOS Chief Strategy — Observe & Act',
    status: 'success',
    detail: 'Plan trimestriel Q3 généré : expansion CEMAC priorisée, 3 obstacles anticipés (données manquantes Cameroun → proxies BAD), 2 scénarios alternatifs simulés.',
    edgeFunction: 'kos-strategic-reasoning-engine',
  },
  {
    id: 'aa-002', timestamp: '2026-06-27T10:15:00Z', pillar: 'MCP',
    action: 'Skill [AUDIT-ISO] invoquée par Agent Compliance',
    status: 'success',
    detail: 'Skill MCP Audit BCEAO/COBAC exécutée : 4 quality gates passées, data lineage 12 sources, score conformité 94/100.',
    edgeFunction: 'kos-senior-compliance-auditor',
  },
  {
    id: 'aa-003', timestamp: '2026-06-27T10:00:00Z', pillar: 'Einstein Trust',
    action: 'Filtre Souveraineté FCFA — Contrôle automatique',
    status: 'success',
    detail: '0 violation FCFA détectée sur 24h. 342 appels API filtrés. Chiffrement AES-256 actif. Conformité régulateurs UEMOA/CEMAC maintenue.',
    edgeFunction: 'kos-security-logger',
  },
  {
    id: 'aa-004', timestamp: '2026-06-27T09:45:00Z', pillar: 'Auto-Apprentissage',
    action: '[INNOVATION-AGENTIQUE] IA-004 Réinjecté',
    status: 'info',
    detail: 'Filtre FCFA v1.2.0 injecté dans le contexte de 8 agents. 100% des agents KOS désormais protégés contre l\'exposition de données financières.',
    edgeFunction: 'kos-knowledge-manager',
  },
  {
    id: 'aa-005', timestamp: '2026-06-27T09:30:00Z', pillar: 'ReCognitive',
    action: 'Anticipation proactive — Nouvelle circulaire COBAC',
    status: 'warning',
    detail: 'Circulaire COBAC anticipée (projet détecté via veille). Publication officielle prévue sous 72h. 3 scénarios de conformité pré-calculés.',
    edgeFunction: 'kos-regulatory-scout',
  },
  {
    id: 'aa-006', timestamp: '2026-06-27T09:00:00Z', pillar: 'MCP',
    action: 'Skill MCP KBR invoquée — Full Auto',
    status: 'success',
    detail: 'KBR générée en 34 min. 4 étapes, 3 quality gates passées. Score qualité Big Four : 96/100. Data lineage complet (8 sources).',
    edgeFunction: 'kos-orchestrator-engine',
  },
  {
    id: 'aa-007', timestamp: '2026-06-27T08:30:00Z', pillar: 'Einstein Trust',
    action: 'Alignement régulateur — Filtrage juridictionnel',
    status: 'success',
    detail: '7 juridictions filtrées automatiquement. 2 alertes ARTCI Côte d\'Ivoire transmises au DPO. Registre traitement mis à jour.',
    edgeFunction: 'kos-legal-ai-governance',
  },
  {
    id: 'aa-008', timestamp: '2026-06-27T08:00:00Z', pillar: 'Auto-Apprentissage',
    action: 'Boucle apprentissage — Gap KBR vs Standard Big Four',
    status: 'info',
    detail: 'Analyse écart KBR-0347 : score initial 88/100 → 96/100 après 2 itérations. Leçon injectée dans le prompt de contexte.',
    edgeFunction: 'kos-knowledge-manager',
  },
];





