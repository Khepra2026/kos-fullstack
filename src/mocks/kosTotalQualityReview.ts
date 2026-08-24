export interface SystemComponent {
  id: string;
  name: string;
  category: 'hub' | 'table' | 'edge_function' | 'cron_job' | 'agent' | 'mock' | 'hook';
  status: 'optimal' | 'stable' | 'degraded' | 'critical';
  healthScore: number;
  lastScan: string;
  issues: string[];
  autoHealEnabled: boolean;
}

export interface SystemHealthOverview {
  totalComponents: number;
  scannedComponents: number;
  overallHealthScore: number;
  targetScore: number;
  scanTimestamp: string;
  componentsByCategory: {
    hubs: { total: number; optimal: number; stable: number; degraded: number; critical: number };
    tables: { total: number; live: number; empty: number; businessReady: number };
    edgeFunctions: { total: number; active: number; degraded: number; failed: number };
    cronJobs: { total: number; active: number; failed: number };
    agents: { total: number; supraOptimal: number; optimal: number; stable: number; degraded: number };
    mocks: { total: number; reducible: number; critical: number };
    hooks: { total: number; hybrid: number; mockOnly: number };
  };
  certifications: { name: string; score: number; target: number; status: string }[];
}

export interface AutoHealingEngine {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'partial' | 'inactive';
  totalEvents: number;
  autoResolved: number;
  manualRequired: number;
  mttrMinutes: number;
  targetMttrMinutes: number;
  circuitBreakers: { total: number; open: number; closed: number; halfOpen: number };
  retryStats: { totalRetries: number; successfulRetries: number; failedRetries: number; avgRetryDelayMs: number };
  deadLetterQueue: { total: number; critical: number; high: number; medium: number };
  recentRecoveries: { id: string; component: string; issue: string; detectedAt: string; recoveredAt: string; method: string; durationMs: number }[];
  healingCapabilities: { name: string; description: string; status: 'enabled' | 'partial' | 'disabled'; autoFixRate: number }[];
}

export interface AutoExpansionEngine {
  totalDomains: number;
  autoLearnedDomains: number;
  domainsInPipeline: number;
  academyStats: { modules: number; learners: number; certifications: number; completionRate: number };
  contentPipeline: { articles: number; whitepapers: number; studies: number; publications: number };
  expansionVelocity: { domainsPerWeek: number; articlesPerWeek: number; certificationsPerWeek: number };
  newDomains: { name: string; source: string; absorbedAt: string; score: number; status: string }[];
  expansionRoadmap: { phase: string; milestone: string; target: string; progress: number; deadline: string }[];
}

export interface AccelerationMetrics {
  currentVelocity: number;
  targetVelocity: number;
  compressionFactor: number;
  activeBoosts: { name: string; description: string; impact: string; status: string }[];
  bottlenecks: { id: string; location: string; severity: string; description: string; resolution: string; estimatedGain: string }[];
  timelineCompression: { from: string; to: string; factor: number; tasksCompressed: number };
}

export interface QualityGap {
  id: string;
  component: string;
  category: string;
  severity: 'critical' | 'major' | 'minor';
  description: string;
  impact: string;
  autoFixable: boolean;
  status: 'open' | 'in_progress' | 'fixed' | 'accepted';
  assignedTo: string;
  detectedAt: string;
  estimatedEffort: string;
}

export const systemHealthOverview: SystemHealthOverview = {
  totalComponents: 683,
  scannedComponents: 683,
  overallHealthScore: 9.2,
  targetScore: 10.0,
  scanTimestamp: '2026-06-27T14:30:00Z',
  componentsByCategory: {
    hubs: { total: 120, optimal: 108, stable: 10, degraded: 2, critical: 0 },
    tables: { total: 335, live: 321, empty: 0, businessReady: 335 },
    edgeFunctions: { total: 101, active: 99, degraded: 2, failed: 0 },
    cronJobs: { total: 32, active: 32, failed: 0 },
    agents: { total: 75, supraOptimal: 72, optimal: 3, stable: 0, degraded: 0 },
    mocks: { total: 230, reducible: 69, critical: 4 },
    hooks: { total: 160, hybrid: 156, mockOnly: 4 },
  },
  certifications: [
    { name: 'ISO 27001:2022', score: 92, target: 100, status: 'En cours — 5/5 gaps fermés' },
    { name: 'ISO 42001 AI', score: 88, target: 95, status: 'Pré-audit validé' },
    { name: 'ISO 9001:2015', score: 90, target: 95, status: '12/12 processus documentés' },
    { name: 'AAAA Big Four Supreme', score: 100, target: 100, status: 'Certifié' },
  ],
};

export const qualityGaps: QualityGap[] = [
  { id: 'GAP-001', component: 'Edge Function: kos-memory-engine', category: 'Infrastructure', severity: 'critical', description: 'Code prêt mais déploiement bloqué — plan Supabase saturé (101/101)', impact: 'Moteur de mémorisation réglementaire non opérationnel', autoFixable: false, status: 'open', assignedTo: 'KOS Infrastructure Agent™', detectedAt: '2026-06-25T22:00:00Z', estimatedEffort: 'Upgrade plan Supabase' },
  { id: 'GAP-002', component: 'Edge Function: kos-mock-to-live-governance', category: 'Infrastructure', severity: 'critical', description: 'Code prêt — déploiement bloqué plan Supabase saturé', impact: 'Gouvernance migration mock→live indisponible', autoFixable: false, status: 'open', assignedTo: 'KOS Infrastructure Agent™', detectedAt: '2026-06-25T22:00:00Z', estimatedEffort: 'Upgrade plan Supabase' },
  { id: 'GAP-003', component: '4 hooks pure-mock restants', category: 'Data', severity: 'major', description: '4 hooks sur 160 n\'ont pas de fallback Supabase', impact: 'Données mock-only sur 4 modules critiques', autoFixable: true, status: 'in_progress', assignedTo: 'KOS Hook Migration Agent™', detectedAt: '2026-06-27T10:00:00Z', estimatedEffort: '4h' },
  { id: 'GAP-004', component: 'Docker/n8n (10 services)', category: 'Infrastructure', severity: 'major', description: 'Docker Compose configuré mais non déployé en production', impact: 'Souveraineté locale non activée', autoFixable: false, status: 'open', assignedTo: 'KOS DevOps Agent™', detectedAt: '2026-06-25T23:00:00Z', estimatedEffort: '8h' },
  { id: 'GAP-005', component: '178 citations réglementaires', category: 'Réglementaire', severity: 'minor', description: 'Cible 200 citations — 22 restantes', impact: 'Score crédibilité réglementaire 89%', autoFixable: true, status: 'in_progress', assignedTo: 'KOS Regulatory Scout™', detectedAt: '2026-06-27T12:00:00Z', estimatedEffort: 'Cron hebdomadaire' },
  { id: 'GAP-006', component: 'Auto-correction tickets (34 ouverts)', category: 'Qualité', severity: 'major', description: '34 tickets non résolus dans le système de correction', impact: 'Liens cassés, erreurs SEO, contenu non conforme', autoFixable: true, status: 'in_progress', assignedTo: 'KOS Auto-Correction Agent™', detectedAt: '2026-06-27T08:00:00Z', estimatedEffort: 'Auto-fix 48h' },
  { id: 'GAP-007', component: 'Certification ISO 27001 audit externe', category: 'Certification', severity: 'major', description: 'Audit externe Phase 3/3 non enclenché', impact: 'Certification officielle manquante', autoFixable: false, status: 'open', assignedTo: 'KOS Compliance Agent™', detectedAt: '2026-06-27T00:00:00Z', estimatedEffort: 'Planifié Q4 2026' },
  { id: 'GAP-008', component: 'Hub SEO + AEO (hub 29)', category: 'Performance', severity: 'major', description: 'Score AEO 3.1/10 — 45 questions sans réponse optimisée', impact: 'Visibilité IA générative limitée', autoFixable: true, status: 'in_progress', assignedTo: 'KOS SEO AEO Agent™', detectedAt: '2026-06-15T00:00:00Z', estimatedEffort: '25h' },
  { id: 'GAP-009', component: 'Triple certification ISO', category: 'Certification', severity: 'minor', description: 'ISO 27001+42001+9001 non certifiées formellement', impact: 'Crédibilité due diligence réduite', autoFixable: false, status: 'open', assignedTo: 'KOS Governance Agent™', detectedAt: '2026-06-27T00:00:00Z', estimatedEffort: 'Q1 2027' },
];

export const autoHealingEngine: AutoHealingEngine = {
  id: 'KOS-AH-001',
  name: 'KOS Auto-Healing Engine™',
  description: 'Moteur d\'auto-guérison autonome — Circuit Breakers, Retry Exponentiel, Dead Letter Queue, Auto-Recovery, Rollback',
  status: 'active',
  totalEvents: 847,
  autoResolved: 796,
  manualRequired: 51,
  mttrMinutes: 0.8,
  targetMttrMinutes: 1.0,
  circuitBreakers: { total: 12, open: 0, closed: 11, halfOpen: 1 },
  retryStats: { totalRetries: 2341, successfulRetries: 2187, failedRetries: 154, avgRetryDelayMs: 3200 },
  deadLetterQueue: { total: 8, critical: 2, high: 3, medium: 3 },
  recentRecoveries: [
    { id: 'REC-001', component: 'Edge Function: kos-gsc-monitor', issue: 'Timeout API Google — circuit ouvert 60s', detectedAt: '2026-06-27T06:02:00Z', recoveredAt: '2026-06-27T06:03:12Z', method: 'Circuit Breaker auto-reset + retry exponentiel', durationMs: 72000 },
    { id: 'REC-002', component: 'Pipeline YouTube — voice_generation', issue: 'Échec ElevenLabs TTS — timeout réseau', detectedAt: '2026-06-27T05:38:00Z', recoveredAt: '2026-06-27T05:39:45Z', method: 'Retry exponentiel 3 tentatives (1s → 4s → 16s)', durationMs: 105000 },
    { id: 'REC-003', component: 'Cron Job: kos-rag-daily-ingest', issue: 'Erreur parsing PDF — document corrompu', detectedAt: '2026-06-27T04:05:00Z', recoveredAt: '2026-06-27T04:05:32Z', method: 'DLQ + reprise programmée 1h', durationMs: 32000 },
    { id: 'REC-004', component: 'Table: kos_agent_performance', issue: 'Contention verrou — deadlock détecté', detectedAt: '2026-06-27T03:45:00Z', recoveredAt: '2026-06-27T03:45:28Z', method: 'Rollback automatique + retry', durationMs: 28000 },
    { id: 'REC-005', component: 'Hub: kos-dashboard', issue: 'Chargement lent — bundle > 500ms', detectedAt: '2026-06-27T02:30:00Z', recoveredAt: '2026-06-27T02:30:41Z', method: 'Cache warming auto', durationMs: 41000 },
  ],
  healingCapabilities: [
    { name: 'Circuit Breaker Auto-Reset', description: 'Détection automatique des pannes API externes, circuit ouvert 60s, retry automatique', status: 'enabled', autoFixRate: 96 },
    { name: 'Retry Exponentiel', description: '3 tentatives max avec délais croissants 1s → 4s → 16s, jitter aléatoire', status: 'enabled', autoFixRate: 94 },
    { name: 'Dead Letter Queue Recovery', description: 'Reprise programmée des jobs échoués après délai, catégorisation par failure_category', status: 'enabled', autoFixRate: 78 },
    { name: 'Auto-Rollback', description: 'Retour à l\'état précédent en cas d\'échec de transition, validation via state_transitions', status: 'enabled', autoFixRate: 99 },
    { name: 'Stuck Job Detection', description: 'Scan des jobs en RUNNING depuis >10min sans heartbeat, kill + restart automatique', status: 'enabled', autoFixRate: 88 },
    { name: 'Health Check Auto-Recovery', description: '7 composants monitorés toutes les heures, redémarrage automatique si unhealthy', status: 'enabled', autoFixRate: 92 },
    { name: 'Mock-to-Live Migration', description: 'Migration automatique des données mock vers Supabase, fallback automatique si erreur', status: 'partial', autoFixRate: 65 },
    { name: 'Regulatory Scout Auto-Fix', description: 'Vérification hebdomadaire des citations, correction automatique des références obsolètes', status: 'partial', autoFixRate: 72 },
  ],
};

export const autoExpansionEngine: AutoExpansionEngine = {
  totalDomains: 20,
  autoLearnedDomains: 5,
  domainsInPipeline: 8,
  academyStats: { modules: 8, learners: 2080, certifications: 1310, completionRate: 67 },
  contentPipeline: { articles: 100, whitepapers: 30, studies: 50, publications: 750 },
  expansionVelocity: { domainsPerWeek: 0.3, articlesPerWeek: 3.5, certificationsPerWeek: 45 },
  newDomains: [
    { name: 'Finance Islamique UEMOA/CEMAC', source: 'Instructions BCEAO 003/004/005-2018', absorbedAt: '2026-06-24', score: 150, status: 'absorbed' },
    { name: 'Cyber Résilience Bancaire DORA-COBAC', source: 'Directive COBAC 2027, Règlement R-2024/01', absorbedAt: '2026-06-24', score: 150, status: 'absorbed' },
    { name: 'Tokenisation & Actifs Numériques', source: 'Sandbox UEMOA, AMF-UMOA', absorbedAt: '2026-06-24', score: 150, status: 'absorbed' },
    { name: 'Climate Stress Testing Pilier 2', source: 'NGFS, BCEAO, COBAC, ISSB', absorbedAt: '2026-06-24', score: 150, status: 'absorbed' },
    { name: 'MNBC — Monnaie Numérique Banque Centrale', source: 'e-CFA BCEAO, BEAC CBDC', absorbedAt: '2026-06-24', score: 150, status: 'absorbed' },
    { name: 'Assurance Digitale CIMA', source: 'Code CIMA, FANAF Digital', absorbedAt: '', score: 0, status: 'in_pipeline' },
    { name: 'Marchés Financiers UEMOA/CEMAC', source: 'AMF-UEMOA, COSUMAF, BRVM, BVMAC', absorbedAt: '', score: 0, status: 'in_pipeline' },
    { name: 'Protection Données Santé Afrique', source: 'RGPD, Convention Malabo, OMS', absorbedAt: '', score: 0, status: 'in_pipeline' },
  ],
  expansionRoadmap: [
    { phase: 'Q3 2026', milestone: 'Université 20 modules', target: '3000 apprenants', progress: 42, deadline: '2026-09-30' },
    { phase: 'Q3 2026', milestone: 'Observatoire Réglementaire Unifié', target: '8 régulateurs', progress: 15, deadline: '2026-09-30' },
    { phase: 'Q4 2026', milestone: 'Hub Agréments Afrique', target: '6 types agrément', progress: 5, deadline: '2026-12-31' },
    { phase: 'Q4 2026', milestone: 'Certification ISO 27001 externe', target: 'Audit Phase 3/3', progress: 60, deadline: '2026-12-31' },
    { phase: 'Q1 2027', milestone: 'Triple ISO certifiée', target: '27001+42001+9001', progress: 30, deadline: '2027-03-31' },
    { phase: 'Q1 2027', milestone: 'Docker/n8n 10 services', target: 'Production', progress: 35, deadline: '2027-03-31' },
  ],
};

export const accelerationMetrics: AccelerationMetrics = {
  currentVelocity: 4.2,
  targetVelocity: 8.0,
  compressionFactor: 365,
  activeBoosts: [
    { name: 'KOS Auto-Compression Engine™', description: 'Compression temporelle 365x — 4 trimestres en 1 session', impact: '+53.8 pts Self-Development', status: 'activated' },
    { name: 'KOS Cross-Domain Learning™', description: 'Absorption instantanée de nouveaux domaines réglementaires', impact: '5 nouveaux domaines absorbés', status: 'activated' },
    { name: 'KOS Auto-Healing Loop™', description: 'Boucle de guérison continue — MTTH 0.8min', impact: '94% auto-résolution', status: 'activated' },
    { name: 'KOS Mock-to-Live Acceleration™', description: 'Migration accélérée mock→Supabase LIVE', impact: '97.5% hooks hybrides', status: 'activated' },
    { name: 'KOS Content Pipeline Boost™', description: 'Cadencement éditorial ×2.5', impact: '3.5 articles/semaine', status: 'activated' },
  ],
  bottlenecks: [
    { id: 'BN-001', location: 'Plan Supabase', severity: 'critical', description: '101/101 Edge Functions — limite plan atteinte', resolution: 'Upgrade plan Supabase → débloquer +50 Edge Functions', estimatedGain: '+2 Edge Functions critiques (memory-engine, mock-to-live-governance)' },
    { id: 'BN-002', location: 'Docker/n8n non déployé', severity: 'major', description: '10 services Docker configurés mais non actifs en production', resolution: 'Déploiement Docker + Qdrant + n8n sur serveur', estimatedGain: 'Souveraineté locale 100%, -50% coûts Supabase' },
    { id: 'BN-003', location: '4 hooks pure-mock', severity: 'minor', description: 'Derniers hooks sans connexion Supabase', resolution: 'Migration pattern hybride standard', estimatedGain: '100% hooks hybrides' },
  ],
  timelineCompression: { from: 'Q3 2026 → Q2 2027', to: 'Session unique 24 Juin 2026', factor: 365, tasksCompressed: 24 },
};

export const systemScanResults = {
  scanId: 'SCAN-2026-06-27-001',
  scannedAt: '2026-06-27T14:30:00Z',
  duration: '18 minutes',
  totalAssets: 683,
  results: {
    hubs: {
      total: 120,
      details: [
        { status: 'optimal', count: 108, percentage: 90 },
        { status: 'stable', count: 10, percentage: 8.3 },
        { status: 'degraded', count: 2, percentage: 1.7 },
        { status: 'critical', count: 0, percentage: 0 },
      ],
      degradedList: ['kos-seo-aeo-command (SEO/AEO 3.1)', 'kos-mdp-automator (LinkedIn MDP)'],
    },
    tables: {
      total: 335,
      live: 321,
      empty: 0,
      businessReady: 335,
      criticalTables: ['regulatory_register', 'rag_embeddings', 'kos_memory_engine', 'evidence_library'],
    },
    edgeFunctions: {
      total: 101,
      active: 99,
      degraded: 2,
      blocked: ['kos-memory-engine', 'kos-mock-to-live-governance'],
    },
    agents: {
      total: 75,
      supraOptimal: 72,
      optimal: 3,
      stabilityRate: 100,
      topPerformers: ['KOS Automaton Engine™', 'KOS Regulatory Scout™', 'KOS State Engine™', 'KOS Knowledge Graph™', 'KOS Growth Engine™'],
    },
  },
};

export const autoHealLiveMetrics = {
  activeHealingLoops: 6,
  healedLast24h: 47,
  preventedIncidents: 12,
  uptimeImpact: '+0.009%',
  mttrImprovement: '-3.0 min',
  selfHealingRate: 94,
};

export const globalKpiSnapshot = {
  scoreSante: 9.2,
  scoreBigFour: 97.2,
  hubsOptimal: 108,
  agentsSupraOptimal: 72,
  hookHybridRate: 97.5,
  citationCount: 178,
  tableBusinessReady: 100,
  edgeFunctionActive: 98,
  cronJobSuccess: 100,
  uptime30j: 99.99,
};





