export interface KOSRuntimeComponent {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: 'operational' | 'degraded' | 'critical' | 'planned';
  health_score: number;
  category: 'orchestration' | 'integration' | 'communication' | 'execution' | 'registry' | 'monitoring';
  architecture_layer: string;
  dependencies: string[];
  dependents: string[];
  edge_functions: string[];
  metrics: KOSRuntimeMetric[];
  config: KOSRuntimeConfig;
  last_incident: string | null;
  uptime_30d: number;
}

export interface KOSRuntimeMetric {
  name: string;
  value: string;
  unit: string;
  target: string;
  trend: 'up' | 'down' | 'stable';
  status: 'ok' | 'warning' | 'critical';
}

export interface KOSRuntimeConfig {
  scaling_policy: string;
  timeout_ms: number;
  retry_policy: string;
  circuit_breaker: string;
  rate_limit: string;
}

export interface KOSEventType {
  name: string;
  category: string;
  producers: string[];
  consumers: string[];
  volume_24h: number;
  avg_latency_ms: number;
  schema_version: string;
}

export interface KOSAgentRegistryEntry {
  agent_id: string;
  agent_name: string;
  hub: string;
  status: 'running' | 'idle' | 'error' | 'maintenance';
  version: string;
  runtime_env: string;
  memory_mb: number;
  uptime_hours: number;
  last_deploy: string;
  health_checks: { name: string; status: string; last_check: string }[];
}

export interface KOSRuntimeBloc4 {
  bloc_id: string;
  bloc_name: string;
  version: string;
  target_maturity: number;
  current_maturity: number;
  architecture_version: string;
  executive_summary: string;
  components: KOSRuntimeComponent[];
  event_types: KOSEventType[];
  agent_registry: KOSAgentRegistryEntry[];
  infrastructure_stats: {
    total_edge_functions: number;
    total_agents: number;
    total_tables: number;
    avg_latency_ms: number;
    events_24h: number;
    uptime_30d: number;
    deployments_30d: number;
    incidents_30d: number;
  };
}

export const KOS_RUNTIME_DATA: KOSRuntimeBloc4 = {
  bloc_id: 'BLOC-004',
  bloc_name: 'KOS Runtime™',
  version: 'v1.0',
  target_maturity: 95,
  current_maturity: 95,
  architecture_version: 'v3.2 — Event-Driven Microservices',
  executive_summary: 'Moteur central du KOS Enterprise Intelligence OS™ orchestrant 75 agents IA, 98 edge functions, 244 tables Supabase à travers une architecture event-driven avec Orchestrateur, API Gateway, Event Bus, Workflow Engine, Agent Registry et Monitoring unifié. Chaque composant est monitoré en temps réel avec health scoring et circuit breakers.',
  infrastructure_stats: {
    total_edge_functions: 98,
    total_agents: 75,
    total_tables: 244,
    avg_latency_ms: 187,
    events_24h: 124500,
    uptime_30d: 99.97,
    deployments_30d: 34,
    incidents_30d: 0,
  },
  components: [
    {
      id: 'RT-001',
      name: 'KOS Master Orchestrator',
      icon: 'ri-magic-line',
      description: 'Orchestrateur central coordonnant les 75 agents IA. Route les tâches, gère les dépendances inter-agents, assure la validation multi-agents et le Quality Gate avant publication.',
      status: 'operational',
      health_score: 94,
      category: 'orchestration',
      architecture_layer: 'Layer 1 — Core Orchestration',
      dependencies: ['Event Bus', 'API Gateway', 'Agent Registry'],
      dependents: ['Consulting Factory', 'Audit Intelligence', 'SEO Autopilot', 'Growth Engine', 'Tender Intelligence', 'Knowledge Graph', 'Proposal Generator', 'Due Diligence Engine', 'Risk Engine', 'Compliance Engine', 'Financial Analysis', 'Learning Engine'],
      edge_functions: ['kos-multi-agent-orchestrator', 'kos-automaton-engine', 'kos-quality-assurance', 'kos-executive-command-center'],
      last_incident: '2026-06-12 — Latence spike 450ms résolu en 8 min',
      uptime_30d: 99.92,
      metrics: [
        { name: 'Tâches/jour', value: '2 847', unit: 'tâches', target: '< 3 000', trend: 'up', status: 'ok' },
        { name: 'Latence moyenne', value: '187', unit: 'ms', target: '< 200ms', trend: 'stable', status: 'ok' },
        { name: 'Validation multi-agents', value: '99.7', unit: '%', target: '> 99.5%', trend: 'up', status: 'ok' },
        { name: 'Quality Gate rejets', value: '12', unit: '/jour', target: '< 15', trend: 'down', status: 'ok' },
      ],
      config: {
        scaling_policy: 'Auto-scale 2-8 instances selon charge',
        timeout_ms: 30000,
        retry_policy: 'Exponential backoff, max 3 retries',
        circuit_breaker: '50% failures in 60s → open 120s',
        rate_limit: '500 req/s par agent',
      },
    },
    {
      id: 'RT-002',
      name: 'API Gateway',
      icon: 'ri-git-branch-line',
      description: 'Point d\'entrée unique pour toutes les requêtes KOS. Gère l\'authentification JWT, le rate limiting, la transformation des requêtes, le load balancing et le caching des réponses.',
      status: 'operational',
      health_score: 96,
      category: 'integration',
      architecture_layer: 'Layer 1 — Core Orchestration',
      dependencies: ['Supabase Auth', 'Rate Limiter'],
      dependents: ['Tous les agents', 'Tous les edge functions', 'Frontend SPA', 'API externes'],
      edge_functions: ['kos-enterprise-os', 'kos-executive-dashboard-engine'],
      last_incident: null,
      uptime_30d: 99.98,
      metrics: [
        { name: 'Requêtes/jour', value: '342 000', unit: 'requêtes', target: '< 500K', trend: 'up', status: 'ok' },
        { name: 'Latence p95', value: '89', unit: 'ms', target: '< 100ms', trend: 'stable', status: 'ok' },
        { name: 'Cache hit rate', value: '78.4', unit: '%', target: '> 75%', trend: 'up', status: 'ok' },
        { name: 'Rate limit blocks', value: '234', unit: '/jour', target: '< 500', trend: 'stable', status: 'ok' },
      ],
      config: {
        scaling_policy: 'Auto-scale 4-16 instances',
        timeout_ms: 15000,
        retry_policy: 'Idempotent only, max 2 retries',
        circuit_breaker: '30% failures in 30s → open 60s',
        rate_limit: '1000 req/s global',
      },
    },
    {
      id: 'RT-003',
      name: 'Event Bus',
      icon: 'ri-exchange-line',
      description: 'Bus d\'événements central assurant la communication asynchrone entre les 75 agents. Architecture pub/sub avec 42 types d\'événements, dead letter queues, et garantie de livraison at-least-once.',
      status: 'operational',
      health_score: 91,
      category: 'communication',
      architecture_layer: 'Layer 2 — Communication',
      dependencies: ['Supabase Realtime', 'Webhook System'],
      dependents: ['Tous les agents', 'Workflow Engine', 'Notification System', 'Audit Ledger'],
      edge_functions: ['kos-multi-agent-orchestrator', 'kos-executive-command-center', 'kos-enterprise-os'],
      last_incident: '2026-06-08 — Dead letter queue spike, résolu en 12 min',
      uptime_30d: 99.85,
      metrics: [
        { name: 'Événements/jour', value: '124 500', unit: 'événements', target: '< 200K', trend: 'up', status: 'ok' },
        { name: 'Latence livraison', value: '42', unit: 'ms', target: '< 50ms', trend: 'stable', status: 'ok' },
        { name: 'Taux livraison', value: '99.94', unit: '%', target: '> 99.9%', trend: 'stable', status: 'ok' },
        { name: 'DLQ backlog', value: '18', unit: 'messages', target: '< 50', trend: 'down', status: 'ok' },
      ],
      config: {
        scaling_policy: 'Partitionnement par type d\'event',
        timeout_ms: 5000,
        retry_policy: 'At-least-once, max 5 retries',
        circuit_breaker: 'DLQ threshold 100 → alert',
        rate_limit: '5000 events/s',
      },
    },
    {
      id: 'RT-004',
      name: 'Workflow Engine',
      icon: 'ri-git-merge-line',
      description: 'Moteur d\'exécution des workflows complexes. Orchestre les séquences multi-agents, les approbations humaines, les branchements conditionnels et les boucles de correction qualité.',
      status: 'operational',
      health_score: 88,
      category: 'execution',
      architecture_layer: 'Layer 3 — Execution',
      dependencies: ['Master Orchestrator', 'Event Bus', 'Agent Registry'],
      dependents: ['Consulting Factory', 'Proposal Generator', 'Due Diligence Engine', 'Audit Intelligence', 'Quality Assurance', 'Self-Improvement Engine'],
      edge_functions: ['kos-multi-agent-orchestrator', 'kos-workflow-generator', 'kos-quality-assurance', 'kos-self-improvement'],
      last_incident: '2026-06-10 — Workflow stuck, résolu par kill & restart',
      uptime_30d: 99.65,
      metrics: [
        { name: 'Workflows actifs', value: '847', unit: 'workflows', target: '< 1 000', trend: 'up', status: 'ok' },
        { name: 'Workflows complétés/jour', value: '523', unit: 'workflows', trend: 'up', status: 'ok', target: 'N/A' },
        { name: 'Durée moyenne', value: '4.2', unit: 'min', target: '< 5 min', trend: 'down', status: 'ok' },
        { name: 'Taux succès', value: '97.8', unit: '%', target: '> 97%', trend: 'up', status: 'ok' },
      ],
      config: {
        scaling_policy: 'Pool de workers 5-20',
        timeout_ms: 600000,
        retry_policy: 'Par étape, max 3 retries',
        circuit_breaker: '3 failures consécutives → pause workflow',
        rate_limit: '100 workflows simultanés',
      },
    },
    {
      id: 'RT-005',
      name: 'Agent Registry',
      icon: 'ri-database-2-line',
      description: 'Registre central de tous les agents KOS. Stocke les métadonnées, versions, capacités, dépendances, endpoints, health checks et historique de déploiement des 75 agents.',
      status: 'operational',
      health_score: 93,
      category: 'registry',
      architecture_layer: 'Layer 2 — Communication',
      dependencies: ['Supabase DB', 'Edge Functions Platform'],
      dependents: ['Master Orchestrator', 'Workflow Engine', 'API Gateway', 'Monitoring'],
      edge_functions: ['kos-enterprise-os', 'kos-executive-command-center'],
      last_incident: null,
      uptime_30d: 99.99,
      metrics: [
        { name: 'Agents enregistrés', value: '75', unit: 'agents', target: '75', trend: 'stable', status: 'ok' },
        { name: 'Health checks/jour', value: '64 800', unit: 'checks', trend: 'stable', status: 'ok', target: 'N/A' },
        { name: 'Déploiements/mois', value: '34', unit: 'déploiements', target: '< 50', trend: 'up', status: 'ok' },
        { name: 'Taux disponibilité', value: '99.87', unit: '%', target: '> 99.5%', trend: 'stable', status: 'ok' },
      ],
      config: {
        scaling_policy: 'Read replicas 3x',
        timeout_ms: 5000,
        retry_policy: 'Cache-first, DB fallback',
        circuit_breaker: 'DB timeout 3s → cache only',
        rate_limit: 'N/A (lecture seule)',
      },
    },
    {
      id: 'RT-006',
      name: 'KOS Monitoring & Observability',
      icon: 'ri-radar-line',
      description: 'Système de monitoring unifié couvrant tous les composants runtime. Dashboards temps réel, alerting intelligent, tracing distribué, log aggregation et analyse prédictive des incidents.',
      status: 'operational',
      health_score: 89,
      category: 'monitoring',
      architecture_layer: 'Layer 4 — Observability',
      dependencies: ['Event Bus', 'Agent Registry', 'API Gateway'],
      dependents: ['Control Tower', 'Executive Command Center', 'Security Command', 'Resource Command Center'],
      edge_functions: ['kos-performance-monitor', 'kos-site-health-check', 'kos-security-scan', 'kos-executive-command-center', 'kos-resource-command-center'],
      last_incident: '2026-06-14 — Faux positif alerte SSL, désamorcé en 5 min',
      uptime_30d: 99.90,
      metrics: [
        { name: 'Métriques collectées/min', value: '12 400', unit: 'métriques', trend: 'stable', status: 'ok', target: 'N/A' },
        { name: 'Alertes/jour', value: '8', unit: 'alertes', target: '< 20', trend: 'down', status: 'ok' },
        { name: 'Taux faux positifs', value: '2.1', unit: '%', target: '< 5%', trend: 'down', status: 'ok' },
        { name: 'MTTD incidents', value: '4.2', unit: 'min', target: '< 5 min', trend: 'down', status: 'ok' },
      ],
      config: {
        scaling_policy: 'Collecteurs auto-scalés',
        timeout_ms: 10000,
        retry_policy: 'Buffer local → flush',
        circuit_breaker: 'N/A (non-bloquant)',
        rate_limit: 'N/A',
      },
    },
  ],
  event_types: [
    { name: 'task.created', category: 'Orchestration', producers: ['API Gateway'], consumers: ['Master Orchestrator', 'Workflow Engine'], volume_24h: 8450, avg_latency_ms: 12, schema_version: 'v2.1' },
    { name: 'task.completed', category: 'Orchestration', producers: ['Master Orchestrator'], consumers: ['Workflow Engine', 'Audit Ledger', 'Control Tower'], volume_24h: 7200, avg_latency_ms: 8, schema_version: 'v2.1' },
    { name: 'task.failed', category: 'Orchestration', producers: ['Master Orchestrator'], consumers: ['Monitoring', 'Audit Ledger', 'Alerting System'], volume_24h: 180, avg_latency_ms: 5, schema_version: 'v2.1' },
    { name: 'agent.deployed', category: 'Registry', producers: ['CI/CD Pipeline'], consumers: ['Agent Registry', 'Master Orchestrator', 'Monitoring'], volume_24h: 2, avg_latency_ms: 45, schema_version: 'v1.0' },
    { name: 'agent.health_check', category: 'Registry', producers: ['Monitoring'], consumers: ['Agent Registry', 'Alerting System'], volume_24h: 54000, avg_latency_ms: 3, schema_version: 'v1.0' },
    { name: 'quality.scored', category: 'Quality', producers: ['Quality Assurance'], consumers: ['Workflow Engine', 'Audit Ledger', 'Control Tower'], volume_24h: 3200, avg_latency_ms: 25, schema_version: 'v3.0' },
    { name: 'quality.rejected', category: 'Quality', producers: ['Quality Controller'], consumers: ['Master Orchestrator', 'Workflow Engine', 'Alerting System'], volume_24h: 145, avg_latency_ms: 10, schema_version: 'v3.0' },
    { name: 'lead.scored', category: 'Growth', producers: ['Lead Scoring Engine'], consumers: ['CRM', 'Growth Engine', 'Notification System'], volume_24h: 2800, avg_latency_ms: 18, schema_version: 'v2.0' },
    { name: 'seo.crawl_completed', category: 'SEO', producers: ['SEO Autopilot'], consumers: ['GSC Monitor', 'Performance Monitor', 'Control Tower'], volume_24h: 4, avg_latency_ms: 120, schema_version: 'v1.5' },
    { name: 'security.scan_completed', category: 'Security', producers: ['Security Scanner'], consumers: ['Security Command', 'Monitoring', 'Alerting System'], volume_24h: 6, avg_latency_ms: 85, schema_version: 'v1.2' },
    { name: 'tender.detected', category: 'Procurement', producers: ['Tender Scraper'], consumers: ['Tender Intelligence', 'Notification System', 'CRM'], volume_24h: 340, avg_latency_ms: 22, schema_version: 'v2.3' },
    { name: 'backlink.opportunity', category: 'SEO', producers: ['Backlink Detector'], consumers: ['SEO Autopilot', 'Notification System', 'Control Tower'], volume_24h: 120, avg_latency_ms: 15, schema_version: 'v1.8' },
  ],
  agent_registry: [
    { agent_id: 'AG-001', agent_name: 'Master Orchestrator', hub: '/kos-multi-agent-orchestrator', status: 'running', version: 'v4.2.1', runtime_env: 'Edge Function (Deno)', memory_mb: 512, uptime_hours: 8760, last_deploy: '2026-06-15', health_checks: [{ name: 'Heartbeat', status: 'OK', last_check: '2026-06-16 08:00' }, { name: 'Multi-agent routing', status: 'OK', last_check: '2026-06-16 08:00' }] },
    { agent_id: 'AG-002', agent_name: 'Quality Controller', hub: '/kos-quality-assurance', status: 'running', version: 'v3.1.0', runtime_env: 'Edge Function (Deno)', memory_mb: 256, uptime_hours: 8540, last_deploy: '2026-06-14', health_checks: [{ name: 'Heartbeat', status: 'OK', last_check: '2026-06-16 08:00' }, { name: 'Scoring engine', status: 'OK', last_check: '2026-06-16 08:00' }] },
    { agent_id: 'AG-003', agent_name: 'SEO Autopilot', hub: '/kos-seo-autopilot', status: 'running', version: 'v2.8.3', runtime_env: 'Edge Function (Deno)', memory_mb: 256, uptime_hours: 8320, last_deploy: '2026-06-13', health_checks: [{ name: 'Heartbeat', status: 'OK', last_check: '2026-06-16 08:00' }, { name: 'Crawler', status: 'OK', last_check: '2026-06-16 07:30' }] },
    { agent_id: 'AG-004', agent_name: 'GSC Monitor', hub: '/kos-gsc-command', status: 'running', version: 'v2.5.1', runtime_env: 'Edge Function (Deno)', memory_mb: 128, uptime_hours: 8140, last_deploy: '2026-06-12', health_checks: [{ name: 'Heartbeat', status: 'OK', last_check: '2026-06-16 08:00' }, { name: 'GSC API', status: 'OK', last_check: '2026-06-16 07:45' }] },
    { agent_id: 'AG-005', agent_name: 'Lead Scoring Engine', hub: '/kos-lead-scoring-command', status: 'running', version: 'v3.0.2', runtime_env: 'Edge Function (Deno)', memory_mb: 256, uptime_hours: 8700, last_deploy: '2026-06-14', health_checks: [{ name: 'Heartbeat', status: 'OK', last_check: '2026-06-16 08:00' }, { name: 'ML model', status: 'OK', last_check: '2026-06-16 07:00' }] },
    { agent_id: 'AG-006', agent_name: 'Tender Intelligence', hub: '/kos-tender-intelligence', status: 'running', version: 'v2.2.4', runtime_env: 'Edge Function (Deno)', memory_mb: 256, uptime_hours: 8280, last_deploy: '2026-06-11', health_checks: [{ name: 'Heartbeat', status: 'OK', last_check: '2026-06-16 08:00' }, { name: 'Scraping pipeline', status: 'OK', last_check: '2026-06-16 06:00' }] },
    { agent_id: 'AG-007', agent_name: 'Security Scanner', hub: '/kos-security-command', status: 'running', version: 'v1.9.5', runtime_env: 'Edge Function (Deno)', memory_mb: 256, uptime_hours: 8000, last_deploy: '2026-06-10', health_checks: [{ name: 'Heartbeat', status: 'OK', last_check: '2026-06-16 08:00' }, { name: 'OWASP scan', status: 'OK', last_check: '2026-06-16 05:00' }] },
    { agent_id: 'AG-008', agent_name: 'Knowledge Graph', hub: '/kos-knowledge-graph', status: 'running', version: 'v2.4.0', runtime_env: 'Edge Function (Deno)', memory_mb: 512, uptime_hours: 8450, last_deploy: '2026-06-15', health_checks: [{ name: 'Heartbeat', status: 'OK', last_check: '2026-06-16 08:00' }, { name: 'Graph DB', status: 'OK', last_check: '2026-06-16 07:00' }] },
    { agent_id: 'AG-009', agent_name: 'Due Diligence Engine', hub: '/kos-due-diligence', status: 'idle', version: 'v2.1.3', runtime_env: 'Edge Function (Deno)', memory_mb: 512, uptime_hours: 7920, last_deploy: '2026-06-08', health_checks: [{ name: 'Heartbeat', status: 'OK', last_check: '2026-06-16 08:00' }, { name: 'Research pipeline', status: 'OK', last_check: '2026-06-16 04:00' }] },
    { agent_id: 'AG-010', agent_name: 'Self-Improvement Engine', hub: '/kos-self-improvement', status: 'running', version: 'v2.0.1', runtime_env: 'Edge Function (Deno)', memory_mb: 384, uptime_hours: 7680, last_deploy: '2026-06-09', health_checks: [{ name: 'Heartbeat', status: 'OK', last_check: '2026-06-16 08:00' }, { name: 'Improvement loop', status: 'WARN', last_check: '2026-06-16 03:00' }] },
  ],
};