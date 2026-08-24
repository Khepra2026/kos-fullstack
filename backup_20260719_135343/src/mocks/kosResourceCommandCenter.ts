// ============================================================
// KOS Resource Command Center — Unified Agent Registry
// 48 agents across 8 engines · Activation tracking · Resource metrics
// ============================================================

export interface engineResource {
  id: string;
  name: string;
  path: string;
  icon: string;
  color: string;
  agentsCount: number;
  activeAgents: number;
  partialAgents: number;
  gapAgents: number;
  cpuUsage: number;
  memoryUsage: number;
  lastScan: string;
  status: 'healthy' | 'degraded' | 'critical';
}

export interface unifiedAgent {
  id: string;
  name: string;
  engine: string;
  engineName: string;
  layer: string;
  number: string;
  mission: string;
  icon: string;
  color: string;
  status: 'active' | 'partial' | 'gap';
  score: number;
  lastScan: string;
  resourceUsage: {
    cpu: number;
    memory: number;
    queries: number;
    uptime: number;
  };
  kpis: { label: string; current: string; target: string; icon: string }[];
  deploymentVersion: string;
  charter: string;
  autoDeploy: boolean;
  alerts: { severity: 'critical' | 'major' | 'minor'; message: string; date: string }[];
}

export interface systemHealth {
  generatedAt: string;
  totalAgents: number;
  activeAgents: number;
  partialAgents: number;
  gapAgents: number;
  totalEngines: number;
  healthyEngines: number;
  degradedEngines: number;
  criticalEngines: number;
  globalCpuUsage: number;
  globalMemoryUsage: number;
  totalQueries24h: number;
  avgResponseTime: number;
  globalScore: number;
  targetScore: number;
  autoDeployEnabled: number;
  autoDeployDisabled: number;
  alertsActive: number;
  alertsCritical: number;
}

export interface ResourceOptimization {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  agentsAffected: string[];
  estimatedGain: string;
  action: string;
  icon: string;
  color: string;
}

export interface DeploymentAction {
  id: string;
  agentId: string;
  agentName: string;
  action: 'activate' | 'optimize' | 'update' | 'patch';
  priority: 'critical' | 'major' | 'minor';
  description: string;
  estimatedTime: string;
  autoApplicable: boolean;
  applied: boolean;
}

// ============================================================
// 8 KOS ENGINES
// ============================================================
export const KOS_ENGINES: engineResource[] = [
  {
    id: 'orchestrator-engine',
    name: 'Orchestrator Engine™',
    path: '/kos-orchestrator-engine',
    icon: 'ri-git-branch-line',
    color: '#4F46E5',
    agentsCount: 9,
    activeAgents: 6,
    partialAgents: 3,
    gapAgents: 0,
    cpuUsage: 42,
    memoryUsage: 38,
    lastScan: '2026-06-12T08:00:00Z',
    status: 'healthy',
  },
  {
    id: 'unified-autopilot',
    name: 'Unified Autopilot™',
    path: '/kos-unified-autopilot',
    icon: 'ri-cpu-line',
    color: '#86BC25',
    agentsCount: 9,
    activeAgents: 4,
    partialAgents: 5,
    gapAgents: 0,
    cpuUsage: 67,
    memoryUsage: 72,
    lastScan: '2026-06-12T07:30:00Z',
    status: 'degraded',
  },
  {
    id: 'quality-system',
    name: 'Quality System™',
    path: '/kos-autonomous-quality-system',
    icon: 'ri-shield-check-line',
    color: '#8B3040',
    agentsCount: 6,
    activeAgents: 4,
    partialAgents: 2,
    gapAgents: 0,
    cpuUsage: 35,
    memoryUsage: 28,
    lastScan: '2026-06-12T07:00:00Z',
    status: 'healthy',
  },
  {
    id: 'growth-orchestrator',
    name: 'Growth Orchestrator™',
    path: '/kos-growth-orchestrator',
    icon: 'ri-radar-line',
    color: '#0D7B5F',
    agentsCount: 24,
    activeAgents: 4,
    partialAgents: 9,
    gapAgents: 11,
    cpuUsage: 55,
    memoryUsage: 60,
    lastScan: '2026-06-12T06:00:00Z',
    status: 'critical',
  },
  {
    id: 'content-correction',
    name: 'Content Correction™',
    path: '/kos-content-correction-engine',
    icon: 'ri-quill-pen-line',
    color: '#4A7A1E',
    agentsCount: 3,
    activeAgents: 1,
    partialAgents: 2,
    gapAgents: 0,
    cpuUsage: 28,
    memoryUsage: 32,
    lastScan: '2026-06-11T22:00:00Z',
    status: 'degraded',
  },
  {
    id: 'corrective-execution',
    name: 'Corrective Execution™',
    path: '/kos-corrective-execution-engine',
    icon: 'ri-tools-line',
    color: '#E8C547',
    agentsCount: 3,
    activeAgents: 2,
    partialAgents: 1,
    gapAgents: 0,
    cpuUsage: 22,
    memoryUsage: 25,
    lastScan: '2026-06-12T05:00:00Z',
    status: 'healthy',
  },
  {
    id: 'cyber-tech',
    name: 'Cyber & Tech Correction™',
    path: '/kos-cyber-tech-correction-engine',
    icon: 'ri-shield-flash-line',
    color: '#C05A3A',
    agentsCount: 3,
    activeAgents: 1,
    partialAgents: 2,
    gapAgents: 0,
    cpuUsage: 45,
    memoryUsage: 50,
    lastScan: '2026-06-11T20:00:00Z',
    status: 'degraded',
  },
  {
    id: 'digital-growth',
    name: 'Digital Growth™',
    path: '/kos-digital-growth-correction-engine',
    icon: 'ri-line-chart-line',
    color: '#9B7B2C',
    agentsCount: 3,
    activeAgents: 1,
    partialAgents: 2,
    gapAgents: 0,
    cpuUsage: 30,
    memoryUsage: 35,
    lastScan: '2026-06-11T18:00:00Z',
    status: 'degraded',
  },
];

// ============================================================
// 48 UNIFIED AGENTS ACROSS ALL 8 ENGINES
// ============================================================
export const KOS_UNIFIED_AGENTS: unifiedAgent[] = [
  // ============ ENGINE: Orchestrator Engine (9 agents) ============
  {
    id: 'orchestrator-governance', name: 'Governance Agent', engine: 'orchestrator-engine', engineName: 'Orchestrator Engine™', layer: 'Orchestration', number: 'OE-01', mission: 'Supervision globale, arbitrage, KPI et reporting exécutif. Gestion du portefeuille projets.', icon: 'ri-government-line', color: '#4F46E5', status: 'active', score: 9.2, lastScan: '2026-06-12T08:00:00Z',
    resourceUsage: { cpu: 12, memory: 8, queries: 1240, uptime: 99.98 },
    kpis: [{ label: 'Taux de complétion', current: '94', target: '95', icon: 'ri-check-double-line' },{ label: 'Délai décision', current: '4.2h', target: '3h', icon: 'ri-time-line' },{ label: 'Satisfaction', current: '9.1', target: '9.5', icon: 'ri-star-line' }],
    deploymentVersion: 'v2.4.1', charter: 'KHEPRA_MASTER_ORCHESTRATOR_CHARTER.md', autoDeploy: true,
    alerts: [{ severity: 'minor', message: 'Délai décision en légère hausse (+0.3h vs semaine dernière)', date: '2026-06-11T18:30:00Z' }],
  },
  {
    id: 'orchestrator-seo', name: 'SEO Agent', engine: 'orchestrator-engine', engineName: 'Orchestrator Engine™', layer: 'Orchestration', number: 'OE-02', mission: 'Audit SEO technique, maillage interne, sitemap, robots.txt, indexation, détection 404.', icon: 'ri-search-line', color: '#0D7B5F', status: 'active', score: 7.8, lastScan: '2026-06-12T07:45:00Z',
    resourceUsage: { cpu: 18, memory: 14, queries: 3420, uptime: 99.95 },
    kpis: [{ label: 'Pages indexées', current: '312', target: '350', icon: 'ri-pages-line' },{ label: 'Erreurs crawl', current: '14', target: '0', icon: 'ri-error-warning-line' },{ label: 'Score SEO', current: '87', target: '95', icon: 'ri-bar-chart-line' }],
    deploymentVersion: 'v1.8.3', charter: 'KHEPRA_KNOWLEDGE_GRAPH_AI_CHARTER.md', autoDeploy: true,
    alerts: [{ severity: 'major', message: '14 erreurs crawl non résolues — risque indexation', date: '2026-06-12T06:00:00Z' }],
  },
  {
    id: 'orchestrator-geo', name: 'GEO Agent', engine: 'orchestrator-engine', engineName: 'Orchestrator Engine™', layer: 'Orchestration', number: 'OE-03', mission: 'Visibilité IA génératives, optimisation entités, FAQ optimisées IA.', icon: 'ri-globe-line', color: '#0891B2', status: 'partial', score: 5.5, lastScan: '2026-06-11T16:00:00Z',
    resourceUsage: { cpu: 8, memory: 6, queries: 890, uptime: 97.20 },
    kpis: [{ label: 'Citations IA', current: '23', target: '100', icon: 'ri-robot-line' },{ label: 'Pages GEO-opt.', current: '34', target: '80', icon: 'ri-file-text-line' },{ label: 'GEO Score', current: '42', target: '75', icon: 'ri-radar-line' }],
    deploymentVersion: 'v0.9.2', charter: 'KHEPRA_GROWTH_INFLUENCE_AI_CHARTER.md', autoDeploy: false,
    alerts: [{ severity: 'critical', message: 'GEO Score 42/100 — activation urgente requise', date: '2026-06-10T09:00:00Z' },{ severity: 'major', message: 'Couverture moteurs IA insuffisante (1/5)', date: '2026-06-09T14:00:00Z' }],
  },
  {
    id: 'orchestrator-content', name: 'Content Agent', engine: 'orchestrator-engine', engineName: 'Orchestrator Engine™', layer: 'Orchestration', number: 'OE-04', mission: 'Génération, réécriture, amélioration qualité, harmonisation ton.', icon: 'ri-quill-pen-line', color: '#4A7A1E', status: 'active', score: 7.5, lastScan: '2026-06-12T07:00:00Z',
    resourceUsage: { cpu: 15, memory: 12, queries: 2150, uptime: 99.90 },
    kpis: [{ label: 'Score qualité', current: '7.8', target: '9.0', icon: 'ri-star-line' },{ label: 'Articles/mois', current: '18', target: '24', icon: 'ri-article-line' },{ label: 'Taux conformité', current: '82', target: '95', icon: 'ri-check-line' }],
    deploymentVersion: 'v2.1.0', charter: 'KHEPRA_QUALITY_REVIEW_AI_CHARTER.md', autoDeploy: true,
    alerts: [],
  },
  {
    id: 'orchestrator-thinktank', name: 'Think Tank Agent', engine: 'orchestrator-engine', engineName: 'Orchestrator Engine™', layer: 'Orchestration', number: 'OE-05', mission: 'Rapports sectoriels, études, livres blancs, notes stratégiques.', icon: 'ri-lightbulb-line', color: '#9B7B2C', status: 'partial', score: 6.2, lastScan: '2026-06-11T20:00:00Z',
    resourceUsage: { cpu: 10, memory: 9, queries: 1450, uptime: 98.50 },
    kpis: [{ label: 'Publications/mois', current: '4', target: '8', icon: 'ri-file-text-line' },{ label: 'Citations vérifiées', current: '96', target: '100', icon: 'ri-double-quotes-l' },{ label: 'Score méthodo', current: '7.5', target: '9.0', icon: 'ri-flask-line' }],
    deploymentVersion: 'v1.3.1', charter: 'KHEPRA_CEO_COPILOT_CHARTER.md', autoDeploy: false,
    alerts: [{ severity: 'major', message: 'Cadence publications 50% sous objectif', date: '2026-06-08T10:00:00Z' }],
  },
  {
    id: 'orchestrator-legal', name: 'Legal Compliance Agent', engine: 'orchestrator-engine', engineName: 'Orchestrator Engine™', layer: 'Orchestration', number: 'OE-06', mission: 'Vérification risques juridiques, conformité marques, droits d\'auteur, allégations marketing.', icon: 'ri-scales-3-line', color: '#8B3040', status: 'active', score: 8.8, lastScan: '2026-06-12T05:00:00Z',
    resourceUsage: { cpu: 8, memory: 6, queries: 980, uptime: 99.99 },
    kpis: [{ label: 'Conformité', current: '97', target: '100', icon: 'ri-shield-check-line' },{ label: 'Risques détectés', current: '2', target: '0', icon: 'ri-alert-line' },{ label: 'Temps résolution', current: '3.5h', target: '2h', icon: 'ri-time-line' }],
    deploymentVersion: 'v2.0.0', charter: 'KHEPRA_REGULATORY_INTELLIGENCE_AI_CHARTER.md', autoDeploy: true,
    alerts: [],
  },
  {
    id: 'orchestrator-reputation', name: 'Reputation Agent', engine: 'orchestrator-engine', engineName: 'Orchestrator Engine™', layer: 'Orchestration', number: 'OE-07', mission: 'Cohérence institutionnelle, image de marque, cohérence éditoriale.', icon: 'ri-shield-star-line', color: '#6B4A3A', status: 'partial', score: 6.8, lastScan: '2026-06-11T22:00:00Z',
    resourceUsage: { cpu: 7, memory: 5, queries: 720, uptime: 98.80 },
    kpis: [{ label: 'Cohérence branding', current: '78', target: '95', icon: 'ri-palette-line' },{ label: 'Liens sociaux valides', current: '91', target: '99', icon: 'ri-link' },{ label: 'Score réputation', current: '84', target: '92', icon: 'ri-heart-line' }],
    deploymentVersion: 'v1.5.0', charter: 'KHEPRA_GROWTH_INFLUENCE_AI_CHARTER.md', autoDeploy: false,
    alerts: [{ severity: 'minor', message: '6 liens sociaux obsolètes détectés', date: '2026-06-10T15:00:00Z' }],
  },
  {
    id: 'orchestrator-security', name: 'Security Agent', engine: 'orchestrator-engine', engineName: 'Orchestrator Engine™', layer: 'Orchestration', number: 'OE-08', mission: 'Audit cybersécurité, scan OWASP Top 10, revue configuration, recommandations sécurité.', icon: 'ri-shield-flash-line', color: '#C2410C', status: 'active', score: 8.5, lastScan: '2026-06-12T04:00:00Z',
    resourceUsage: { cpu: 20, memory: 16, queries: 4100, uptime: 99.97 },
    kpis: [{ label: 'Score sécurité', current: '87', target: '95', icon: 'ri-shield-check-line' },{ label: 'Vulns critiques', current: '0', target: '0', icon: 'ri-close-circle-line' },{ label: 'Headers conformes', current: '8', target: '9', icon: 'ri-list-check' }],
    deploymentVersion: 'v3.1.2', charter: 'KHEPRA_AUDIT_AI_CHARTER.md', autoDeploy: true,
    alerts: [{ severity: 'major', message: 'CSP header manquant — déploiement en cours', date: '2026-06-11T08:00:00Z' }],
  },
  {
    id: 'orchestrator-quality', name: 'Quality Agent', engine: 'orchestrator-engine', engineName: 'Orchestrator Engine™', layer: 'Orchestration', number: 'OE-09', mission: 'Validation finale livrables, scoring qualité, conformité livrables.', icon: 'ri-verified-badge-line', color: '#5B21B6', status: 'active', score: 9.0, lastScan: '2026-06-12T08:00:00Z',
    resourceUsage: { cpu: 10, memory: 7, queries: 1600, uptime: 99.99 },
    kpis: [{ label: 'Taux approbation', current: '92', target: '98', icon: 'ri-check-double-line' },{ label: 'Délai validation', current: '2.1h', target: '1.5h', icon: 'ri-time-line' },{ label: 'Score qualité', current: '8.3', target: '9.0', icon: 'ri-medal-line' }],
    deploymentVersion: 'v2.2.0', charter: 'KHEPRA_QUALITY_REVIEW_AI_CHARTER.md', autoDeploy: true,
    alerts: [],
  },
  // ============ ENGINE: Unified Autopilot (9 agents) ============
  {
    id: 'autopilot-soc-monitoring', name: 'SOC Monitoring Agent', engine: 'unified-autopilot', engineName: 'Unified Autopilot™', layer: 'SOC', number: 'UA-01', mission: 'Analyse logs, détection intrusion, monitoring uptime, détection malware.', icon: 'ri-radar-line', color: '#C2410C', status: 'active', score: 8.2, lastScan: '2026-06-12T07:30:00Z',
    resourceUsage: { cpu: 28, memory: 22, queries: 8900, uptime: 99.97 },
    kpis: [{ label: 'Uptime', current: '99.97', target: '99.99', icon: 'ri-server-line' },{ label: 'Incidents', current: '3', target: '0', icon: 'ri-error-warning-line' },{ label: 'Temps réponse', current: '6.5m', target: '2m', icon: 'ri-timer-line' }],
    deploymentVersion: 'v4.0.1', charter: 'KHEPRA_AML_AI_CHARTER.md', autoDeploy: true,
    alerts: [{ severity: 'minor', message: 'Scan SSH bloqué — IP ukrainienne bannie', date: '2026-06-10T03:15:00Z' }],
  },
  {
    id: 'autopilot-vuln-detection', name: 'Vulnerability Detection', engine: 'unified-autopilot', engineName: 'Unified Autopilot™', layer: 'SOC', number: 'UA-02', mission: 'Scan OWASP Top 10, headers HTTP, HTTPS/HSTS, Content-Security-Policy.', icon: 'ri-shield-flash-line', color: '#8B3040', status: 'active', score: 7.5, lastScan: '2026-06-11T22:00:00Z',
    resourceUsage: { cpu: 32, memory: 28, queries: 6700, uptime: 99.50 },
    kpis: [{ label: 'Vulns critiques', current: '0', target: '0', icon: 'ri-shield-check-line' },{ label: 'Score sécurité', current: '82', target: '95', icon: 'ri-shield-line' },{ label: 'Headers conformes', current: '7', target: '9', icon: 'ri-list-check-2' }],
    deploymentVersion: 'v3.0.0', charter: 'KHEPRA_AUDIT_AI_CHARTER.md', autoDeploy: true,
    alerts: [{ severity: 'critical', message: 'CSP absent — 175 pages exposées XSS', date: '2026-06-09T08:00:00Z' }],
  },
  {
    id: 'autopilot-incident-response', name: 'Incident Response', engine: 'unified-autopilot', engineName: 'Unified Autopilot™', layer: 'SOC', number: 'UA-03', mission: 'Classification incident, plan correction, patch suggestions.', icon: 'ri-surgical-mask-line', color: '#E8C547', status: 'partial', score: 6.8, lastScan: '2026-06-12T05:00:00Z',
    resourceUsage: { cpu: 15, memory: 12, queries: 3200, uptime: 97.80 },
    kpis: [{ label: 'Incidents classifiés', current: '12', target: '12', icon: 'ri-file-list-line' },{ label: 'Temps classification', current: '4m', target: '1m', icon: 'ri-time-line' },{ label: 'Automatisation', current: '65', target: '95', icon: 'ri-robot-line' }],
    deploymentVersion: 'v1.7.0', charter: 'KHEPRA_DATA_ANALYTICS_AI_CHARTER.md', autoDeploy: false,
    alerts: [{ severity: 'major', message: 'Pas de playbook automatisé incidents critiques', date: '2026-06-10T11:00:00Z' }],
  },
  {
    id: 'autopilot-seo-intel', name: 'SEO Intelligence', engine: 'unified-autopilot', engineName: 'Unified Autopilot™', layer: 'SEO/GEO/AEO', number: 'UA-04', mission: 'Audit SEO technique, backlinks, meta data, clustering sémantique, Core Web Vitals.', icon: 'ri-search-line', color: '#0D7B5F', status: 'active', score: 7.0, lastScan: '2026-06-12T06:00:00Z',
    resourceUsage: { cpu: 25, memory: 20, queries: 5400, uptime: 99.80 },
    kpis: [{ label: 'Trafic organique', current: '8,420', target: '15,000', icon: 'ri-global-line' },{ label: 'Impressions', current: '124K', target: '300K', icon: 'ri-eye-line' },{ label: 'CTR', current: '3.2', target: '5.5', icon: 'ri-cursor-line' }],
    deploymentVersion: 'v2.5.0', charter: 'KHEPRA_KNOWLEDGE_GRAPH_AI_CHARTER.md', autoDeploy: true,
    alerts: [{ severity: 'major', message: '12 pages orphelines sans lien interne entrant', date: '2026-06-05T08:00:00Z' }],
  },
  {
    id: 'autopilot-geo-visibility', name: 'GEO Visibility', engine: 'unified-autopilot', engineName: 'Unified Autopilot™', layer: 'SEO/GEO/AEO', number: 'UA-05', mission: 'Optimisation moteurs IA, structuration entités, contenus extractibles.', icon: 'ri-brain-line', color: '#6B4A3A', status: 'partial', score: 4.5, lastScan: '2026-06-11T18:00:00Z',
    resourceUsage: { cpu: 10, memory: 8, queries: 1100, uptime: 95.20 },
    kpis: [{ label: 'Pages GEO-opt.', current: '20', target: '100', icon: 'ri-file-text-line' },{ label: 'Citations IA', current: '5', target: '50', icon: 'ri-chat-3-line' },{ label: 'Moteurs couverts', current: '1', target: '5', icon: 'ri-stack-line' }],
    deploymentVersion: 'v0.8.1', charter: 'KHEPRA_GROWTH_INFLUENCE_AI_CHARTER.md', autoDeploy: false,
    alerts: [{ severity: 'critical', message: '0 contenu optimisé ChatGPT — 300M+ utilisateurs IA inaccessibles', date: '2026-06-05T08:00:00Z' },{ severity: 'major', message: 'Aucun entity markup Schema.org', date: '2026-06-07T10:00:00Z' }],
  },
  {
    id: 'autopilot-aeo', name: 'AEO Engine', engine: 'unified-autopilot', engineName: 'Unified Autopilot™', layer: 'SEO/GEO/AEO', number: 'UA-06', mission: 'Réponses courtes, FAQ Schema.org, Featured Snippets, recherche vocale.', icon: 'ri-question-answer-line', color: '#9B7B2C', status: 'partial', score: 5.0, lastScan: '2026-06-11T16:00:00Z',
    resourceUsage: { cpu: 12, memory: 10, queries: 1800, uptime: 96.50 },
    kpis: [{ label: 'FAQ Schema.org', current: '15', target: '50', icon: 'ri-question-line' },{ label: 'Featured Snippets', current: '3', target: '25', icon: 'ri-file-copy-line' },{ label: 'PAA capturés', current: '8', target: '40', icon: 'ri-chat-1-line' }],
    deploymentVersion: 'v0.6.0', charter: 'KHEPRA_INNOVATION_LAB_AI_CHARTER.md', autoDeploy: false,
    alerts: [{ severity: 'major', message: '82% des articles sans FAQ Schema.org', date: '2026-06-06T11:00:00Z' }],
  },
  {
    id: 'autopilot-content-strategy', name: 'Content Strategy', engine: 'unified-autopilot', engineName: 'Unified Autopilot™', layer: 'Content AI', number: 'UA-07', mission: 'POV stratégiques, structuration thèses, storytelling institutionnel.', icon: 'ri-lightbulb-flash-line', color: '#4A7A1E', status: 'partial', score: 6.8, lastScan: '2026-06-11T20:00:00Z',
    resourceUsage: { cpu: 8, memory: 6, queries: 850, uptime: 98.20 },
    kpis: [{ label: 'POV stratégiques', current: '5', target: '15', icon: 'ri-lightbulb-line' },{ label: 'Frameworks', current: '4', target: '12', icon: 'ri-layout-masonry-line' },{ label: 'Thèses structurées', current: '8', target: '25', icon: 'ri-git-branch-line' }],
    deploymentVersion: 'v1.2.0', charter: 'KHEPRA_CEO_COPILOT_CHARTER.md', autoDeploy: false,
    alerts: [{ severity: 'major', message: '75% articles sans POV distinctif', date: '2026-06-05T09:00:00Z' }],
  },
  {
    id: 'autopilot-content-production', name: 'Content Production', engine: 'unified-autopilot', engineName: 'Unified Autopilot™', layer: 'Content AI', number: 'UA-08', mission: 'Génération articles, posts LinkedIn, rapports, white papers multi-canal.', icon: 'ri-quill-pen-line', color: '#C05A3A', status: 'active', score: 7.5, lastScan: '2026-06-12T04:00:00Z',
    resourceUsage: { cpu: 18, memory: 14, queries: 2800, uptime: 99.70 },
    kpis: [{ label: 'Articles/mois', current: '12', target: '25', icon: 'ri-article-line' },{ label: 'Posts LinkedIn', current: '8', target: '30', icon: 'ri-linkedin-line' },{ label: 'Score qualité', current: '7.2', target: '9.5', icon: 'ri-file-check-line' }],
    deploymentVersion: 'v2.0.1', charter: 'KHEPRA_PROPOSAL_AI_CHARTER.md', autoDeploy: true,
    alerts: [{ severity: 'major', message: 'Cadencement éditorial irrégulier', date: '2026-06-06T08:00:00Z' }],
  },
  {
    id: 'autopilot-conversion', name: 'Conversion Content', engine: 'unified-autopilot', engineName: 'Unified Autopilot™', layer: 'Content AI', number: 'UA-09', mission: 'CTA contextuels, lead magnets, funnel marketing, scoring leads.', icon: 'ri-download-2-line', color: '#5B8C2A', status: 'partial', score: 6.0, lastScan: '2026-06-11T22:00:00Z',
    resourceUsage: { cpu: 10, memory: 8, queries: 1500, uptime: 97.40 },
    kpis: [{ label: 'Leads/mois', current: '1,263', target: '3,000', icon: 'ri-user-add-line' },{ label: 'Taux capture', current: '8', target: '15', icon: 'ri-percent-line' },{ label: 'Lead magnets', current: '10', target: '25', icon: 'ri-download-cloud-line' }],
    deploymentVersion: 'v1.4.0', charter: 'KHEPRA_BUSINESS_DEV_AI_CHARTER.md', autoDeploy: false,
    alerts: [{ severity: 'critical', message: '60% articles sans CTA — 5,000+ visiteurs non convertis', date: '2026-06-05T08:00:00Z' }],
  },
  // ============ ENGINE: Quality System (6 agents) ============
  {
    id: 'quality-url-integrity', name: 'URL Integrity Agent', engine: 'quality-system', engineName: 'Quality System™', layer: 'Quality', number: 'QS-01', mission: 'Scanner liens internes/externes, 404/500, redirections cassées, correction auto URLs internes.', icon: 'ri-link', color: '#0D7B5F', status: 'active', score: 8.5, lastScan: '2026-06-12T07:45:00Z',
    resourceUsage: { cpu: 20, memory: 15, queries: 5100, uptime: 99.90 },
    kpis: [{ label: 'Liens valides', current: '97.7', target: '99.5', icon: 'ri-check-double-line' },{ label: '404 détectés', current: '53', target: '0', icon: 'ri-error-warning-line' },{ label: 'Temps correction', current: '4.2h', target: '1h', icon: 'ri-time-line' }],
    deploymentVersion: 'v2.3.0', charter: 'KHEPRA_DATA_ANALYTICS_AI_CHARTER.md', autoDeploy: true,
    alerts: [{ severity: 'critical', message: 'Lien cassé /ancien-service-conseil — 14 jours non résolu', date: '2026-05-29T10:15:00Z' }],
  },
  {
    id: 'quality-seo-indexing', name: 'SEO & Indexing Agent', engine: 'quality-system', engineName: 'Quality System™', layer: 'Quality', number: 'QS-02', mission: 'Robots.txt, sitemap.xml, indexation GSC, pages non indexables, balisage sémantique.', icon: 'ri-search-eye-line', color: '#9B7B2C', status: 'active', score: 7.2, lastScan: '2026-06-12T06:30:00Z',
    resourceUsage: { cpu: 14, memory: 10, queries: 3400, uptime: 99.60 },
    kpis: [{ label: 'Pages indexées', current: '175', target: '300', icon: 'ri-global-line' },{ label: 'Erreurs exploration', current: '23', target: '0', icon: 'ri-bug-line' },{ label: 'Pages orphelines', current: '12', target: '0', icon: 'ri-link-unlink' }],
    deploymentVersion: 'v1.9.1', charter: 'KHEPRA_KNOWLEDGE_GRAPH_AI_CHARTER.md', autoDeploy: true,
    alerts: [{ severity: 'critical', message: '12 pages orphelines — crawl budget gaspillé', date: '2026-06-05T08:00:00Z' }],
  },
  {
    id: 'quality-core-web-vitals', name: 'Core Web Vitals Agent', engine: 'quality-system', engineName: 'Quality System™', layer: 'Quality', number: 'QS-03', mission: 'LCP, CLS, INP, scripts bloquants, optimisation performance, temps chargement.', icon: 'ri-speed-up-line', color: '#C05A3A', status: 'active', score: 8.0, lastScan: '2026-06-12T07:00:00Z',
    resourceUsage: { cpu: 12, memory: 9, queries: 2200, uptime: 99.80 },
    kpis: [{ label: 'PageSpeed', current: '82', target: '95', icon: 'ri-flashlight-line' },{ label: 'LCP', current: '2.8s', target: '2.5s', icon: 'ri-timer-line' },{ label: 'CLS', current: '0.08', target: '0.1', icon: 'ri-layout-line' }],
    deploymentVersion: 'v3.0.0', charter: 'KHEPRA_TECHNOLOGY_PARTNER_CHARTER.md', autoDeploy: true,
    alerts: [{ severity: 'major', message: 'TBT 450ms sur page /tools — scripts bloquants', date: '2026-06-09T10:00:00Z' }],
  },
  {
    id: 'quality-content', name: 'Content Quality Agent', engine: 'quality-system', engineName: 'Quality System™', layer: 'Quality', number: 'QS-04', mission: 'Grammaire, incohérences éditoriales, contenu non pro, ton institutionnel.', icon: 'ri-quill-pen-line', color: '#6B4A3A', status: 'partial', score: 6.5, lastScan: '2026-06-11T18:00:00Z',
    resourceUsage: { cpu: 10, memory: 7, queries: 1800, uptime: 97.90 },
    kpis: [{ label: 'Score qualité', current: '7.5', target: '9.5', icon: 'ri-file-check-line' },{ label: 'Erreurs gramma.', current: '87', target: '0', icon: 'ri-edit-line' },{ label: 'Ton conforme', current: '78', target: '100', icon: 'ri-contrast-2-line' }],
    deploymentVersion: 'v1.6.2', charter: 'KHEPRA_QUALITY_REVIEW_AI_CHARTER.md', autoDeploy: false,
    alerts: [{ severity: 'critical', message: 'Article prix-transfert : ton trop académique', date: '2026-06-05T09:00:00Z' }],
  },
  {
    id: 'quality-legal', name: 'Legal & Brand Agent', engine: 'quality-system', engineName: 'Quality System™', layer: 'Quality', number: 'QS-05', mission: 'Usage marques, fausses affirmations, promesses non vérifiables, neutralité juridique.', icon: 'ri-scales-line', color: '#8B3040', status: 'active', score: 8.8, lastScan: '2026-06-12T05:00:00Z',
    resourceUsage: { cpu: 6, memory: 4, queries: 750, uptime: 99.99 },
    kpis: [{ label: 'Conformité légale', current: '96', target: '100', icon: 'ri-shield-check-line' },{ label: 'Contenus à risque', current: '3', target: '0', icon: 'ri-error-warning-line' },{ label: 'Fausses claims', current: '0', target: '0', icon: 'ri-forbid-line' }],
    deploymentVersion: 'v2.0.0', charter: 'KHEPRA_REGULATORY_INTELLIGENCE_AI_CHARTER.md', autoDeploy: true,
    alerts: [],
  },
  {
    id: 'quality-reputation', name: 'Reputation & Social Agent', engine: 'quality-system', engineName: 'Quality System™', layer: 'Quality', number: 'QS-06', mission: 'Liens réseaux sociaux, cohérence URLs, branding cross-platform, OG images.', icon: 'ri-share-circle-line', color: '#5B8C2A', status: 'partial', score: 6.0, lastScan: '2026-06-11T20:00:00Z',
    resourceUsage: { cpu: 8, memory: 5, queries: 900, uptime: 96.80 },
    kpis: [{ label: 'Liens sociaux', current: '87.5', target: '100', icon: 'ri-check-double-line' },{ label: 'Cohérence', current: '72', target: '100', icon: 'ri-palette-line' },{ label: 'OG images', current: '35', target: '50', icon: 'ri-image-line' }],
    deploymentVersion: 'v1.2.0', charter: 'KHEPRA_GROWTH_INFLUENCE_AI_CHARTER.md', autoDeploy: false,
    alerts: [{ severity: 'major', message: '6 articles partagent URL canonique incorrecte LinkedIn', date: '2026-06-06T12:00:00Z' }],
  },
  // ============ ENGINE: Growth Orchestrator — only key agents for Resource view (10 sampled from 24) ============
  {
    id: 'growth-ceo', name: 'CEO Agent', engine: 'growth-orchestrator', engineName: 'Growth Orchestrator™', layer: 'Direction', number: 'GO-01', mission: 'CEO Copilot — Synthèse exécutive & Pilotage stratégique.', icon: 'ri-vip-crown-line', color: '#1A1A2E', status: 'active', score: 9.0, lastScan: '2026-06-12T07:00:00Z',
    resourceUsage: { cpu: 8, memory: 5, queries: 650, uptime: 99.99 },
    kpis: [{ label: 'KPIs consolidés', current: '12', target: '20', icon: 'ri-bar-chart-line' },{ label: 'Notes exécutives', current: '8', target: '12', icon: 'ri-file-text-line' }],
    deploymentVersion: 'v1.0.0', charter: 'KHEPRA_CEO_COPILOT_CHARTER.md', autoDeploy: true,
    alerts: [],
  },
  {
    id: 'growth-bd', name: 'Business Dev. Director', engine: 'growth-orchestrator', engineName: 'Growth Orchestrator™', layer: 'Commercial', number: 'GO-04', mission: 'Prospection, Lead Scoring & Pipeline commercial.', icon: 'ri-user-search-line', color: '#5C6B7A', status: 'active', score: 7.5, lastScan: '2026-06-12T06:30:00Z',
    resourceUsage: { cpu: 12, memory: 8, queries: 1800, uptime: 99.80 },
    kpis: [{ label: 'Leads qualifiés', current: '442', target: '800', icon: 'ri-user-add-line' },{ label: 'Pipeline', current: '31', target: '60', icon: 'ri-hand-heart-line' }],
    deploymentVersion: 'v1.3.0', charter: 'KHEPRA_BUSINESS_DEV_AI_CHARTER.md', autoDeploy: true,
    alerts: [],
  },
  {
    id: 'growth-proposal', name: 'Proposal Manager', engine: 'growth-orchestrator', engineName: 'Growth Orchestrator™', layer: 'Commercial', number: 'GO-07', mission: 'Offres techniques & Propositions commerciales.', icon: 'ri-draft-line', color: '#5B8C2A', status: 'active', score: 8.0, lastScan: '2026-06-12T05:30:00Z',
    resourceUsage: { cpu: 10, memory: 7, queries: 1200, uptime: 99.60 },
    kpis: [{ label: 'Propositions/mois', current: '42', target: '60', icon: 'ri-file-text-line' },{ label: 'Taux closing', current: '35', target: '50', icon: 'ri-percent-line' }],
    deploymentVersion: 'v1.1.0', charter: 'KHEPRA_PROPOSAL_AI_CHARTER.md', autoDeploy: true,
    alerts: [],
  },
  {
    id: 'growth-content-dir', name: 'Content Director', engine: 'growth-orchestrator', engineName: 'Growth Orchestrator™', layer: 'Marketing', number: 'GO-09', mission: 'SEO, GEO, AEO & Stratégie de Contenu — direction marketing.', icon: 'ri-article-line', color: '#7A9B2A', status: 'partial', score: 6.5, lastScan: '2026-06-11T20:00:00Z',
    resourceUsage: { cpu: 8, memory: 6, queries: 900, uptime: 97.50 },
    kpis: [{ label: 'Articles/mois', current: '12', target: '25', icon: 'ri-article-line' },{ label: 'Posts LinkedIn', current: '8', target: '30', icon: 'ri-linkedin-line' }],
    deploymentVersion: 'v0.9.0', charter: null, autoDeploy: false,
    alerts: [{ severity: 'major', message: 'Cadencement éditorial 50% sous cible', date: '2026-06-06T08:00:00Z' }],
  },
  {
    id: 'growth-pr', name: 'PR Director', engine: 'growth-orchestrator', engineName: 'Growth Orchestrator™', layer: 'Communication', number: 'GO-15', mission: 'Relations Presse & Influence institutionnelle.', icon: 'ri-newspaper-line', color: '#C05A3A', status: 'partial', score: 5.5, lastScan: '2026-06-11T18:00:00Z',
    resourceUsage: { cpu: 5, memory: 3, queries: 400, uptime: 94.20 },
    kpis: [{ label: 'Mentions presse', current: '2', target: '12', icon: 'ri-newspaper-line' },{ label: 'Citations média', current: '5', target: '25', icon: 'ri-double-quotes-l' }],
    deploymentVersion: 'v0.5.0', charter: 'KHEPRA_GROWTH_INFLUENCE_AI_CHARTER.md', autoDeploy: false,
    alerts: [{ severity: 'critical', message: '0 couverture médiatique dernier trimestre', date: '2026-06-04T09:00:00Z' }],
  },
  {
    id: 'growth-chatgpt', name: 'SearchGPT Opt. Agent', engine: 'growth-orchestrator', engineName: 'Growth Orchestrator™', layer: 'IA Génératives', number: 'GO-17', mission: 'Optimisation visibilité pour moteurs IA (SearchGPT, Perplexity).', icon: 'ri-search-eye-line', color: '#10A37F', status: 'gap', score: 2.0, lastScan: '2026-06-01T00:00:00Z',
    resourceUsage: { cpu: 2, memory: 1, queries: 50, uptime: 85.00 },
    kpis: [{ label: 'Citations ChatGPT', current: '0', target: '30', icon: 'ri-robot-line' },{ label: 'Pages optimisées', current: '0', target: '50', icon: 'ri-file-text-line' }],
    deploymentVersion: '—', charter: null, autoDeploy: false,
    alerts: [{ severity: 'critical', message: 'Agent non déployé — GAP critique IA générative', date: '2026-06-01T00:00:00Z' }],
  },
  {
    id: 'growth-research', name: 'Research Director', engine: 'growth-orchestrator', engineName: 'Growth Orchestrator™', layer: 'Think Tank', number: 'GO-22', mission: 'Recherche, Publications & Études sectorielles.', icon: 'ri-quill-pen-line', color: '#B8543A', status: 'partial', score: 6.0, lastScan: '2026-06-11T16:00:00Z',
    resourceUsage: { cpu: 8, memory: 5, queries: 650, uptime: 97.00 },
    kpis: [{ label: 'Publications', current: '8', target: '20', icon: 'ri-book-2-line' },{ label: 'Études sectorielles', current: '3', target: '10', icon: 'ri-bar-chart-box-line' }],
    deploymentVersion: 'v0.7.0', charter: 'KHEPRA_INNOVATION_LAB_AI_CHARTER.md', autoDeploy: false,
    alerts: [{ severity: 'major', message: 'Pipeline recherche 40% sous objectif', date: '2026-06-08T14:00:00Z' }],
  },
  // ============ ENGINE: Content Correction (3 agents) ============
  {
    id: 'content-gen', name: 'Content Generator', engine: 'content-correction', engineName: 'Content Correction™', layer: 'Content AI', number: 'CC-01', mission: 'Génération automatique articles, posts, rapports multi-format.', icon: 'ri-robot-line', color: '#4A7A1E', status: 'active', score: 7.2, lastScan: '2026-06-11T22:00:00Z',
    resourceUsage: { cpu: 15, memory: 12, queries: 2400, uptime: 99.50 },
    kpis: [{ label: 'Générés/mois', current: '45', target: '80', icon: 'ri-file-list-line' },{ label: 'Score qualité', current: '7.2', target: '9.0', icon: 'ri-star-line' }],
    deploymentVersion: 'v2.1.0', charter: 'KHEPRA_PROPOSAL_AI_CHARTER.md', autoDeploy: true,
    alerts: [],
  },
  {
    id: 'content-optimizer', name: 'Content Optimizer', engine: 'content-correction', engineName: 'Content Correction™', layer: 'Content AI', number: 'CC-02', mission: 'Réécriture, amélioration qualité, enforcement du ton institutionnel.', icon: 'ri-edit-line', color: '#C05A3A', status: 'partial', score: 6.5, lastScan: '2026-06-11T20:00:00Z',
    resourceUsage: { cpu: 10, memory: 7, queries: 1500, uptime: 98.00 },
    kpis: [{ label: 'Optimisés/mois', current: '28', target: '50', icon: 'ri-file-check-line' },{ label: 'Taux correction', current: '72', target: '95', icon: 'ri-percent-line' }],
    deploymentVersion: 'v1.5.0', charter: 'KHEPRA_QUALITY_REVIEW_AI_CHARTER.md', autoDeploy: false,
    alerts: [{ severity: 'major', message: '28% des contenus corrigés manuellement', date: '2026-06-09T15:00:00Z' }],
  },
  {
    id: 'content-converter', name: 'Conversion Optimizer', engine: 'content-correction', engineName: 'Content Correction™', layer: 'Content AI', number: 'CC-03', mission: 'Injection CTA intelligents, lead magnets contextuels, funnel automatique.', icon: 'ri-download-2-line', color: '#5B8C2A', status: 'partial', score: 5.8, lastScan: '2026-06-11T18:00:00Z',
    resourceUsage: { cpu: 8, memory: 5, queries: 900, uptime: 96.50 },
    kpis: [{ label: 'CTA actifs', current: '35', target: '100', icon: 'ri-download-cloud-line' },{ label: 'Taux clic CTA', current: '2.1', target: '8', icon: 'ri-cursor-line' }],
    deploymentVersion: 'v1.0.0', charter: 'KHEPRA_BUSINESS_DEV_AI_CHARTER.md', autoDeploy: false,
    alerts: [{ severity: 'critical', message: '65% pages sans CTA — conversion perdue', date: '2026-06-05T08:00:00Z' }],
  },
  // ============ ENGINE: Corrective Execution (3 agents) ============
  {
    id: 'corrective-scheduler', name: 'Correction Scheduler', engine: 'corrective-execution', engineName: 'Corrective Execution™', layer: 'Execution', number: 'CE-01', mission: 'Priorisation actions correctives, planification sprints, allocation ressources.', icon: 'ri-calendar-todo-line', color: '#E8C547', status: 'active', score: 8.0, lastScan: '2026-06-12T05:00:00Z',
    resourceUsage: { cpu: 8, memory: 5, queries: 1100, uptime: 99.70 },
    kpis: [{ label: 'Actions planifiées', current: '18', target: '18', icon: 'ri-list-check' },{ label: 'Délai planif.', current: '2h', target: '30m', icon: 'ri-time-line' }],
    deploymentVersion: 'v1.8.0', charter: null, autoDeploy: true,
    alerts: [],
  },
  {
    id: 'corrective-executor', name: 'Auto-Executor', engine: 'corrective-execution', engineName: 'Corrective Execution™', layer: 'Execution', number: 'CE-02', mission: 'Exécution automatique corrections, rollback safe, tests post-correction.', icon: 'ri-tools-line', color: '#0D7B5F', status: 'active', score: 7.8, lastScan: '2026-06-12T06:00:00Z',
    resourceUsage: { cpu: 12, memory: 9, queries: 2800, uptime: 99.50 },
    kpis: [{ label: 'Auto-corrections', current: '14', target: '25', icon: 'ri-flashlight-line' },{ label: 'Taux succès', current: '92', target: '99', icon: 'ri-check-line' }],
    deploymentVersion: 'v2.0.0', charter: null, autoDeploy: true,
    alerts: [{ severity: 'minor', message: '2 rollbacks mineurs ce mois (faux positifs)', date: '2026-06-07T11:00:00Z' }],
  },
  {
    id: 'corrective-validator', name: 'Post-Correction Validator', engine: 'corrective-execution', engineName: 'Corrective Execution™', layer: 'Execution', number: 'CE-03', mission: 'Vérification post-correction, re-test, rapport de validation, fermeture tickets.', icon: 'ri-check-double-line', color: '#86BC25', status: 'partial', score: 6.5, lastScan: '2026-06-11T20:00:00Z',
    resourceUsage: { cpu: 6, memory: 4, queries: 700, uptime: 97.00 },
    kpis: [{ label: 'Corrections validées', current: '26', target: '35', icon: 'ri-checkbox-circle-line' },{ label: 'Taux re-test', current: '75', target: '100', icon: 'ri-refresh-line' }],
    deploymentVersion: 'v0.9.0', charter: null, autoDeploy: false,
    alerts: [{ severity: 'major', message: '25% corrections non re-testées — risque régression', date: '2026-06-08T16:00:00Z' }],
  },
  // ============ ENGINE: Cyber & Tech Correction (3 agents) ============
  {
    id: 'cyber-owasp', name: 'OWASP Scanner', engine: 'cyber-tech', engineName: 'Cyber & Tech Correction™', layer: 'SOC', number: 'CT-01', mission: 'Scan OWASP Top 10 automatisé, headers HTTP, vulnérabilités dépendances.', icon: 'ri-shield-flash-line', color: '#C2410C', status: 'active', score: 7.5, lastScan: '2026-06-11T20:00:00Z',
    resourceUsage: { cpu: 22, memory: 18, queries: 4500, uptime: 99.50 },
    kpis: [{ label: 'Vulns détectées', current: '7', target: '0', icon: 'ri-bug-line' },{ label: 'Score OWASP', current: '82', target: '95', icon: 'ri-shield-line' }],
    deploymentVersion: 'v3.2.0', charter: 'KHEPRA_AUDIT_AI_CHARTER.md', autoDeploy: true,
    alerts: [{ severity: 'critical', message: 'CSP + X-Frame-Options manquants', date: '2026-06-09T08:00:00Z' }],
  },
  {
    id: 'cyber-headers', name: 'Headers Compliance', engine: 'cyber-tech', engineName: 'Cyber & Tech Correction™', layer: 'SOC', number: 'CT-02', mission: 'Headers HTTP sécurité, HSTS, CORS, Referrer-Policy, Permissions-Policy.', icon: 'ri-file-code-line', color: '#8B3040', status: 'partial', score: 6.0, lastScan: '2026-06-11T18:00:00Z',
    resourceUsage: { cpu: 10, memory: 7, queries: 1800, uptime: 97.50 },
    kpis: [{ label: 'Headers conformes', current: '5', target: '9', icon: 'ri-list-check' },{ label: 'Score headers', current: '56', target: '100', icon: 'ri-file-code-line' }],
    deploymentVersion: 'v1.2.0', charter: null, autoDeploy: false,
    alerts: [{ severity: 'major', message: 'Referrer-Policy configuré à unsafe-url', date: '2026-06-10T10:30:00Z' }],
  },
  {
    id: 'cyber-monitor', name: 'Threat Monitor', engine: 'cyber-tech', engineName: 'Cyber & Tech Correction™', layer: 'SOC', number: 'CT-03', mission: 'Monitoring menaces temps réel, alertes, tableau de bord sécurité continu.', icon: 'ri-radar-line', color: '#E8C547', status: 'partial', score: 5.5, lastScan: '2026-06-11T16:00:00Z',
    resourceUsage: { cpu: 18, memory: 14, queries: 3600, uptime: 96.80 },
    kpis: [{ label: 'Alertes/24h', current: '42', target: '10', icon: 'ri-alert-line' },{ label: 'Faux positifs', current: '28', target: '5', icon: 'ri-error-warning-line' }],
    deploymentVersion: 'v0.8.0', charter: null, autoDeploy: false,
    alerts: [{ severity: 'major', message: 'Taux faux positifs 67% — calibration requise', date: '2026-06-05T12:00:00Z' }],
  },
  // ============ ENGINE: Digital Growth Correction (3 agents) ============
  {
    id: 'digital-seo-corr', name: 'SEO Corrector', engine: 'digital-growth', engineName: 'Digital Growth™', layer: 'SEO', number: 'DG-01', mission: 'Correction SEO technique, meta data, canonical, maillage interne, rich snippets.', icon: 'ri-search-line', color: '#0D7B5F', status: 'active', score: 7.0, lastScan: '2026-06-11T18:00:00Z',
    resourceUsage: { cpu: 14, memory: 10, queries: 3200, uptime: 99.30 },
    kpis: [{ label: 'Corrections/mois', current: '32', target: '50', icon: 'ri-tools-line' },{ label: 'Score SEO', current: '72', target: '95', icon: 'ri-bar-chart-line' }],
    deploymentVersion: 'v1.6.0', charter: null, autoDeploy: true,
    alerts: [{ severity: 'major', message: '15 canonical manquantes non résolues', date: '2026-06-09T12:00:00Z' }],
  },
  {
    id: 'digital-geo-corr', name: 'GEO Corrector', engine: 'digital-growth', engineName: 'Digital Growth™', layer: 'GEO', number: 'DG-02', mission: 'Optimisation GEO, entités Schema.org, FAQ IA-ready, llms.txt.', icon: 'ri-brain-line', color: '#6B4A3A', status: 'partial', score: 4.0, lastScan: '2026-06-11T16:00:00Z',
    resourceUsage: { cpu: 8, memory: 5, queries: 800, uptime: 94.50 },
    kpis: [{ label: 'Pages GEO', current: '8', target: '50', icon: 'ri-folder-line' },{ label: 'Entités', current: '12', target: '50', icon: 'ri-node-tree' }],
    deploymentVersion: 'v0.5.0', charter: null, autoDeploy: false,
    alerts: [{ severity: 'critical', message: 'GEO Score 40/100 — déploiement urgent requis', date: '2026-06-04T10:00:00Z' }],
  },
  {
    id: 'digital-analytics', name: 'Analytics Optimizer', engine: 'digital-growth', engineName: 'Digital Growth™', layer: 'Analytics', number: 'DG-03', mission: 'Tracking analytics, KPI dashboards, optimisation taux conversion, A/B testing.', icon: 'ri-line-chart-line', color: '#9B7B2C', status: 'partial', score: 5.5, lastScan: '2026-06-11T14:00:00Z',
    resourceUsage: { cpu: 10, memory: 7, queries: 1600, uptime: 96.00 },
    kpis: [{ label: 'Dashboards actifs', current: '6', target: '12', icon: 'ri-dashboard-line' },{ label: 'Tests A/B', current: '0', target: '8', icon: 'ri-contrast-line' }],
    deploymentVersion: 'v0.6.0', charter: 'KHEPRA_DATA_ANALYTICS_AI_CHARTER.md', autoDeploy: false,
    alerts: [{ severity: 'major', message: '0 test A/B actif — optimisation conversion bloquée', date: '2026-06-03T09:00:00Z' }],
  },
];

// ============================================================
// SYSTEM HEALTH OVERVIEW
// ============================================================
export const SYSTEM_HEALTH: systemHealth = {
  generatedAt: '2026-06-12T09:00:00Z',
  totalAgents: 48,
  activeAgents: 22,
  partialAgents: 19,
  gapAgents: 7,
  totalEngines: 8,
  healthyEngines: 3,
  degradedEngines: 4,
  criticalEngines: 1,
  globalCpuUsage: 42.8,
  globalMemoryUsage: 38.5,
  totalQueries24h: 78450,
  avgResponseTime: 320,
  globalScore: 6.8,
  targetScore: 9.5,
  autoDeployEnabled: 22,
  autoDeployDisabled: 26,
  alertsActive: 34,
  alertsCritical: 9,
};

// ============================================================
// RESOURCE OPTIMIZATION RECOMMENDATIONS
// ============================================================
export const RESOURCE_OPTIMIZATIONS: ResourceOptimization[] = [
  {
    id: 'opt-1',
    title: 'Activer les 7 agents en GAP critique',
    description: '7 agents ne sont pas déployés : ChatGPT Opt, Claude Opt, Gemini Opt, Perplexity Opt, Copilot Opt, COO, Account Exec, CMO, Social Media, Econ Intelligence. Impact direct sur la couverture IA générative et commerciale.',
    impact: 'high',
    agentsAffected: ['growth-chatgpt', 'growth-claude', 'growth-gemini', 'growth-perplexity', 'growth-copilot', 'growth-coo', 'growth-ae'],
    estimatedGain: '+2.4 pts score global · +350% couverture IA',
    action: 'Déployer les chartes manquantes et activer les agents en mode auto-deploy',
    icon: 'ri-user-add-line',
    color: '#C2410C',
  },
  {
    id: 'opt-2',
    title: 'Déployer CSP + Headers sécurité manquants',
    description: 'Content-Security-Policy, X-Frame-Options et Permissions-Policy absents sur 175 pages. Score OWASP bloqué à 82/100.',
    impact: 'high',
    agentsAffected: ['autopilot-vuln-detection', 'cyber-headers', 'cyber-owasp'],
    estimatedGain: '+13 pts score OWASP · 175 pages sécurisées',
    action: 'Déployer CSP via Netlify _headers + edge function',
    icon: 'ri-shield-flash-line',
    color: '#C2410C',
  },
  {
    id: 'opt-3',
    title: 'Optimiser les 26 agents sans auto-deploy',
    description: '26 agents sur 48 (54%) ne sont pas en mode auto-deploy. Cela bloque la boucle d\'amélioration continue et nécessite des interventions manuelles.',
    impact: 'high',
    agentsAffected: ['orchestrator-geo', 'orchestrator-reputation', 'autopilot-geo-visibility', 'autopilot-aeo', 'autopilot-content-strategy', 'autopilot-conversion', 'quality-content', 'quality-reputation'],
    estimatedGain: 'Réduction 70% interventions manuelles · +1.8 pts score global',
    action: 'Activer auto-deploy avec seuils de validation quality-controlled',
    icon: 'ri-refresh-line',
    color: '#E8C547',
  },
  {
    id: 'opt-4',
    title: 'Réduire taux de faux positifs Threat Monitor',
    description: '67% des alertes SOC sont des faux positifs — 28 alertes/jour inutiles. Calibration des seuils de détection requise.',
    impact: 'medium',
    agentsAffected: ['cyber-monitor'],
    estimatedGain: '-67% bruit alertes · focus sur 14 vraies alertes/jour',
    action: 'Recalibrer seuils de détection avec ML sur 30 jours d\'historique',
    icon: 'ri-filter-off-line',
    color: '#E8C547',
  },
  {
    id: 'opt-5',
    title: 'Connecter pages orphelines au maillage interne',
    description: '12 pages orphelines gaspillent le crawl budget. Aucun lien interne entrant. Impact SEO direct.',
    impact: 'medium',
    agentsAffected: ['quality-seo-indexing', 'autopilot-seo-intel'],
    estimatedGain: '+12 pages indexables · +8% trafic organique estimé',
    action: 'Ajouter liens depuis articles piliers et pages services',
    icon: 'ri-link',
    color: '#0D7B5F',
  },
  {
    id: 'opt-6',
    title: 'Augmenter couverture CTA sur le blog',
    description: '60% des articles (45/75) n\'ont aucun CTA. 5,000+ visiteurs/mois non convertis en leads.',
    impact: 'medium',
    agentsAffected: ['content-converter', 'autopilot-conversion'],
    estimatedGain: '+640 leads/mois estimés · +50% taux capture',
    action: 'Déployer CTA contextuels + lead magnets sur 45 articles',
    icon: 'ri-download-cloud-line',
    color: '#5B8C2A',
  },
];

// ============================================================
// DEPLOYMENT ACTIONS QUEUE
// ============================================================
export const DEPLOYMENT_ACTIONS: DeploymentAction[] = [
  { id: 'dep-1', agentId: 'growth-chatgpt', agentName: 'ChatGPT Opt. Agent', action: 'activate', priority: 'critical', description: 'Créer charte ChatGPT Optimization + déployer agent', estimatedTime: '4h', autoApplicable: false, applied: false },
  { id: 'dep-2', agentId: 'growth-claude', agentName: 'Claude Opt. Agent', action: 'activate', priority: 'critical', description: 'Créer charte Claude Optimization + déployer agent', estimatedTime: '4h', autoApplicable: false, applied: false },
  { id: 'dep-3', agentId: 'growth-gemini', agentName: 'Gemini Opt. Agent', action: 'activate', priority: 'critical', description: 'Créer charte Gemini Optimization + déployer agent', estimatedTime: '4h', autoApplicable: false, applied: false },
  { id: 'dep-4', agentId: 'autopilot-vuln-detection', agentName: 'Vulnerability Detection', action: 'patch', priority: 'critical', description: 'Déployer CSP header sur toutes les pages', estimatedTime: '2h', autoApplicable: true, applied: false },
  { id: 'dep-5', agentId: 'autopilot-geo-visibility', agentName: 'GEO Visibility', action: 'optimize', priority: 'critical', description: 'Activer auto-deploy + créer 20 pages GEO-optimisées', estimatedTime: '8h', autoApplicable: false, applied: false },
  { id: 'dep-6', agentId: 'autopilot-conversion', agentName: 'Conversion Content', action: 'optimize', priority: 'critical', description: 'Déployer CTA contextuels sur 45 articles sans conversion', estimatedTime: '6h', autoApplicable: false, applied: false },
  { id: 'dep-7', agentId: 'digital-geo-corr', agentName: 'GEO Corrector', action: 'activate', priority: 'major', description: 'Activer agent GEO Corrector + lancer premier scan', estimatedTime: '3h', autoApplicable: false, applied: false },
  { id: 'dep-8', agentId: 'cyber-headers', agentName: 'Headers Compliance', action: 'patch', priority: 'major', description: 'Corriger Referrer-Policy + ajouter Permissions-Policy', estimatedTime: '1h', autoApplicable: true, applied: false },
  { id: 'dep-9', agentId: 'quality-content', agentName: 'Content Quality Agent', action: 'optimize', priority: 'major', description: 'Activer auto-deploy + restructurer article prix-transfert', estimatedTime: '3h', autoApplicable: false, applied: false },
  { id: 'dep-10', agentId: 'cyber-monitor', agentName: 'Threat Monitor', action: 'optimize', priority: 'major', description: 'Recalibrer seuils détection — réduire faux positifs 67%', estimatedTime: '5h', autoApplicable: false, applied: false },
  { id: 'dep-11', agentId: 'orchestrator-geo', agentName: 'GEO Agent', action: 'optimize', priority: 'minor', description: 'Mettre à jour deployment v0.9.2 → v1.0 + activer auto-deploy', estimatedTime: '2h', autoApplicable: true, applied: false },
  { id: 'dep-12', agentId: 'corrective-validator', agentName: 'Post-Correction Validator', action: 'patch', priority: 'minor', description: 'Activer re-test automatique post-correction', estimatedTime: '1h', autoApplicable: true, applied: false },
];



