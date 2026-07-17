export interface KOSHubRegistryEntry {
  id: number;
  slug: string;
  name: string;
  path: string;
  icon: string;
  category: 'gouvernance' | 'operations' | 'qualite' | 'intelligence' | 'conformite' | 'orchestration';
  status: 'nominal' | 'degrade' | 'critical' | 'maintenance';
  score: number;
  target: number;
  agents: number;
  lastScan: number;
  alerts: number;
  maturity: number;
  description: string;
}

export interface KOSUnifiedGlobalState {
  totalHubs: number;
  nominalHubs: number;
  degradedHubs: number;
  criticalHubs: number;
  totalAgents: number;
  activeAgents: number;
  totalAlerts: number;
  criticalAlerts: number;
  globalHealthScore: number;
  targetHealthScore: number;
  totalOperations24h: number;
  totalCorrectionsAuto: number;
  uptime30d: string;
  dataSource: 'supabase' | 'mock';
  generatedAt: number;
}

export interface KOSCrossSystemAlert {
  id: string;
  severity: 'critical' | 'major' | 'minor';
  title: string;
  description: string;
  affectedHubs: string[];
  detectedAt: number;
  recommendedAction: string;
  status: 'open' | 'acknowledged' | 'resolved';
}

export interface KOSSystemLink {
  source: string;
  target: string;
  type: 'data-flow' | 'command' | 'feedback' | 'dependency';
  status: 'active' | 'degraded' | 'broken';
  throughput: string;
}

export interface KOSResourceAllocation {
  hubName: string;
  cpu: number;
  memory: number;
  apiCalls: number;
  storage: number;
  costMonthly: number;
}

export const KOS_HUB_REGISTRY: KOSHubRegistryEntry[] = [
  {
    id: 1,
    slug: 'executive-command',
    name: 'Executive Command Center',
    path: '/kos-executive-command',
    icon: 'ri-dashboard-3-line',
    category: 'gouvernance',
    status: 'nominal',
    score: 9.2,
    target: 10,
    agents: 10,
    lastScan: Date.now() - 300000,
    alerts: 2,
    maturity: 95,
    description: 'Gouvernance temps réel, 10 dimensions, synthèse stratégique quotidienne',
  },
  {
    id: 2,
    slug: 'control-tower',
    name: 'KOS Control Tower',
    path: '/kos-control-tower',
    icon: 'ri-radar-line',
    category: 'operations',
    status: 'nominal',
    score: 8.7,
    target: 10,
    agents: 75,
    lastScan: Date.now() - 900000,
    alerts: 5,
    maturity: 88,
    description: 'SEO, Leads, Revenus, Pipeline, Missions, Risques, Conformité, IA',
  },
  {
    id: 3,
    slug: 'unified-autopilot',
    name: 'Unified Autopilot System',
    path: '/kos-unified-autopilot',
    icon: 'ri-cpu-line',
    category: 'orchestration',
    status: 'nominal',
    score: 8.5,
    target: 10,
    agents: 9,
    lastScan: Date.now() - 3600000,
    alerts: 3,
    maturity: 90,
    description: 'SOC, SEO/GEO/AEO, Content AI Factory — 5 phases, boucle autonome 24h',
  },
  {
    id: 4,
    slug: 'esg-regulatory',
    name: 'ESG & Regulatory Alignment',
    path: '/kos-esg-regulatory',
    icon: 'ri-scales-3-line',
    category: 'conformite',
    status: 'nominal',
    score: 8.9,
    target: 10,
    agents: 4,
    lastScan: Date.now() - 7200000,
    alerts: 1,
    maturity: 87,
    description: 'OHADA, ISO 37301, CSRD, ESG — 4 piliers, 17 actions trimestrielles',
  },
  {
    id: 5,
    slug: 'quality-system',
    name: 'Autonomous Quality System',
    path: '/kos-autonomous-quality-system',
    icon: 'ri-shield-check-line',
    category: 'qualite',
    status: 'nominal',
    score: 9.0,
    target: 10,
    agents: 6,
    lastScan: Date.now() - 1800000,
    alerts: 1,
    maturity: 92,
    description: 'Contrôle qualité automatique, correction autonome, scoring Big Four',
  },
  {
    id: 6,
    slug: 'orchestrator-engine',
    name: 'Multi-Agent Orchestrator',
    path: '/kos-orchestrator-engine',
    icon: 'ri-git-branch-line',
    category: 'orchestration',
    status: 'nominal',
    score: 9.1,
    target: 10,
    agents: 12,
    lastScan: Date.now() - 600000,
    alerts: 0,
    maturity: 94,
    description: 'Coordination centrale KOS, routage intelligent, priorisation multi-agents',
  },
  {
    id: 7,
    slug: 'resource-command',
    name: 'Resource Command Center',
    path: '/kos-resource-command-center',
    icon: 'ri-server-line',
    category: 'operations',
    status: 'nominal',
    score: 8.3,
    target: 10,
    agents: 8,
    lastScan: Date.now() - 3600000,
    alerts: 2,
    maturity: 82,
    description: 'CPU, mémoire, stockage, API — monitoring et optimisation des ressources',
  },
  {
    id: 8,
    slug: 'task-orchestrator',
    name: 'Auto Task Orchestrator',
    path: '/kos-auto-task-orchestrator',
    icon: 'ri-list-check-3',
    category: 'operations',
    status: 'degrade',
    score: 7.8,
    target: 10,
    agents: 5,
    lastScan: Date.now() - 7200000,
    alerts: 4,
    maturity: 76,
    description: 'Orchestration des tâches automatiques, priorisation, scheduling',
  },
  {
    id: 9,
    slug: 'tender-intelligence',
    name: 'Tender Intelligence Engine',
    path: '/kos-tender-intelligence',
    icon: 'ri-file-search-line',
    category: 'intelligence',
    status: 'nominal',
    score: 8.6,
    target: 10,
    agents: 4,
    lastScan: Date.now() - 14400000,
    alerts: 1,
    maturity: 84,
    description: 'Veille appels d\'offres, matching automatique, réponses IA',
  },
  {
    id: 10,
    slug: 'competitive-intelligence',
    name: 'Competitive Intelligence',
    path: '/kos-competitive-intelligence',
    icon: 'ri-line-chart-line',
    category: 'intelligence',
    status: 'nominal',
    score: 8.4,
    target: 10,
    agents: 3,
    lastScan: Date.now() - 21600000,
    alerts: 0,
    maturity: 81,
    description: 'Veille concurrentielle, analyse marché, positionnement stratégique',
  },
  {
    id: 11,
    slug: 'autonomous-quality',
    name: 'Contrôle Qualité Autonome',
    path: '/kos-quality-assurance-authority',
    icon: 'ri-award-line',
    category: 'qualite',
    status: 'nominal',
    score: 9.3,
    target: 10,
    agents: 7,
    lastScan: Date.now() - 600000,
    alerts: 0,
    maturity: 96,
    description: 'QA Authority — relecture senior, scoring, humanisation',
  },
  {
    id: 12,
    slug: 'self-improvement',
    name: 'Self-Improvement Engine',
    path: '/kos-self-improvement',
    icon: 'ri-loop-left-line',
    category: 'orchestration',
    status: 'degrade',
    score: 7.5,
    target: 10,
    agents: 3,
    lastScan: Date.now() - 43200000,
    alerts: 3,
    maturity: 72,
    description: 'Amélioration continue autonome, rétroaction, optimisation itérative',
  },
];

export const KOS_UNIFIED_GLOBAL_STATE: KOSUnifiedGlobalState = {
  totalHubs: 12,
  nominalHubs: 10,
  degradedHubs: 2,
  criticalHubs: 0,
  totalAgents: 146,
  activeAgents: 142,
  totalAlerts: 22,
  criticalAlerts: 3,
  globalHealthScore: 8.7,
  targetHealthScore: 10,
  totalOperations24h: 8947,
  totalCorrectionsAuto: 623,
  uptime30d: '99.97',
  dataSource: 'mock',
  generatedAt: Date.now(),
};

export const KOS_CROSS_SYSTEM_ALERTS: KOSCrossSystemAlert[] = [
  {
    id: 'csa-001',
    severity: 'major',
    title: 'Dégradation Self-Improvement Engine',
    description: 'Le moteur d\'auto-amélioration signale une baisse de performance de 12% sur les 48 dernières heures. Le pipeline de rétroaction est ralenti.',
    affectedHubs: ['Self-Improvement Engine', 'Executive Command Center'],
    detectedAt: Date.now() - 7200000,
    recommendedAction: 'Redémarrage planifié du pipeline de rétroaction et réallocation de ressources CPU.',
    status: 'acknowledged',
  },
  {
    id: 'csa-002',
    severity: 'critical',
    title: 'Goulot d\'étranglement Task Orchestrator',
    description: 'L\'Auto Task Orchestrator accumule 147 tâches en file d\'attente. Risque de cascade sur Unified Autopilot et Control Tower.',
    affectedHubs: ['Auto Task Orchestrator', 'Unified Autopilot System', 'KOS Control Tower'],
    detectedAt: Date.now() - 3600000,
    recommendedAction: 'Activation du mode dégradé prioritaire. Réallocation de 2 agents depuis Resource Command Center.',
    status: 'open',
  },
  {
    id: 'csa-003',
    severity: 'minor',
    title: 'Désynchronisation calendrier ESG',
    description: 'Le module ESG Regulatory Alignment a détecté un décalage de 48h sur la mise à jour des indicateurs CSRD.',
    affectedHubs: ['ESG & Regulatory Alignment'],
    detectedAt: Date.now() - 86400000,
    recommendedAction: 'Resynchronisation automatique programmée au prochain cycle de scan.',
    status: 'acknowledged',
  },
];

export const KOS_SYSTEM_LINKS: KOSSystemLink[] = [
  { source: 'Executive Command', target: 'Control Tower', type: 'command', status: 'active', throughput: '127 req/s' },
  { source: 'Executive Command', target: 'Unified Autopilot', type: 'command', status: 'active', throughput: '89 req/s' },
  { source: 'Unified Autopilot', target: 'Quality System', type: 'data-flow', status: 'active', throughput: '342 req/s' },
  { source: 'Unified Autopilot', target: 'Multi-Agent Orchestrator', type: 'dependency', status: 'active', throughput: '215 req/s' },
  { source: 'Multi-Agent Orchestrator', target: 'Task Orchestrator', type: 'command', status: 'degraded', throughput: '43 req/s' },
  { source: 'Multi-Agent Orchestrator', target: 'Resource Command', type: 'command', status: 'active', throughput: '98 req/s' },
  { source: 'Control Tower', target: 'Tender Intelligence', type: 'data-flow', status: 'active', throughput: '67 req/s' },
  { source: 'Control Tower', target: 'Competitive Intelligence', type: 'data-flow', status: 'active', throughput: '52 req/s' },
  { source: 'Quality System', target: 'Self-Improvement', type: 'feedback', status: 'degraded', throughput: '18 req/s' },
  { source: 'Self-Improvement', target: 'Executive Command', type: 'feedback', status: 'degraded', throughput: '12 req/s' },
  { source: 'ESG & Regulatory', target: 'Control Tower', type: 'data-flow', status: 'active', throughput: '31 req/s' },
  { source: 'Resource Command', target: 'Unified Autopilot', type: 'dependency', status: 'active', throughput: '156 req/s' },
  { source: 'Task Orchestrator', target: 'Quality System', type: 'data-flow', status: 'degraded', throughput: '27 req/s' },
  { source: 'Competitive Intelligence', target: 'Executive Command', type: 'data-flow', status: 'active', throughput: '44 req/s' },
  { source: 'Tender Intelligence', target: 'Control Tower', type: 'data-flow', status: 'active', throughput: '38 req/s' },
];

export const KOS_RESOURCE_ALLOCATIONS: KOSResourceAllocation[] = [
  { hubName: 'Executive Command Center', cpu: 22, memory: 34, apiCalls: 12700, storage: 8.2, costMonthly: 340 },
  { hubName: 'KOS Control Tower', cpu: 31, memory: 48, apiCalls: 28400, storage: 15.7, costMonthly: 620 },
  { hubName: 'Unified Autopilot System', cpu: 45, memory: 62, apiCalls: 52100, storage: 22.3, costMonthly: 890 },
  { hubName: 'ESG & Regulatory', cpu: 12, memory: 18, apiCalls: 4100, storage: 4.1, costMonthly: 180 },
  { hubName: 'Autonomous Quality', cpu: 28, memory: 38, apiCalls: 18900, storage: 9.8, costMonthly: 470 },
  { hubName: 'Multi-Agent Orchestrator', cpu: 18, memory: 26, apiCalls: 31200, storage: 12.4, costMonthly: 520 },
  { hubName: 'Resource Command', cpu: 8, memory: 14, apiCalls: 6200, storage: 6.5, costMonthly: 220 },
  { hubName: 'Auto Task Orchestrator', cpu: 35, memory: 42, apiCalls: 18700, storage: 7.8, costMonthly: 380 },
  { hubName: 'Tender Intelligence', cpu: 9, memory: 15, apiCalls: 3400, storage: 5.2, costMonthly: 160 },
  { hubName: 'Competitive Intelligence', cpu: 7, memory: 11, apiCalls: 2800, storage: 3.8, costMonthly: 130 },
  { hubName: 'Quality Assurance Authority', cpu: 16, memory: 22, apiCalls: 14200, storage: 6.9, costMonthly: 310 },
  { hubName: 'Self-Improvement Engine', cpu: 24, memory: 31, apiCalls: 9800, storage: 4.5, costMonthly: 260 },
];

export const KOS_COMMANDERS_FINAL_INTENT = {
  date: new Date().toISOString().split('T')[0],
  author: 'Directeur Général — KHEPRA EXPERTS',
  summary: 'Consolidation finale du système KOS en architecture unifiée. Tous les hubs sont interconnectés via le Multi-Agent Orchestrator. L\'Executive Command Center pilote l\'ensemble. La boucle autonome tourne en continu : Scan Global → Diagnostic → Correction → Optimisation → Feedback. Prochaine étape : migration complète vers Supabase (70% complété) et activation du mode 100% autonome.',
  priorityActions: [
    'Résoudre le goulot d\'étranglement Task Orchestrator (critique)',
    'Restaurer le pipeline de feedback Self-Improvement → Executive Command',
    'Finaliser l\'intégration Supabase des 2 hubs restants',
    'Activer le monitoring prédictif sur les 12 hubs',
    'Lancer le cycle d\'audit trimestriel système complet',
  ],
  decisionsRequired: [
    'Validation du budget infrastructure Q4 2026 pour passage à l\'échelle',
    'Approbation du plan de redondance multi-région (Abidjan, Dakar, Paris)',
    'Nomination du KOS System Architect pour la gouvernance transverse',
  ],
};

export const KOS_SYSTEM_HEALTH_HISTORY = [
  { date: '2026-01', score: 6.8 },
  { date: '2026-02', score: 7.2 },
  { date: '2026-03', score: 7.5 },
  { date: '2026-04', score: 7.9 },
  { date: '2026-05', score: 8.1 },
  { date: '2026-06', score: 8.3 },
  { date: '2026-07', score: 8.5 },
  { date: '2026-08', score: 8.7 },
];