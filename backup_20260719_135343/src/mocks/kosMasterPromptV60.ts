/**
 * KOS v6.0 Autonomous Sovereign — Mock Data
 * KHEPRA EXPERTS — 100% Propriétaire, 100% Big Four, 0 API Externe
 */

export const sovKpis = {
  apiExternes: 0,
  tablesVides: 0,
  edgeVides: 0,
  dependanceReaddy: 0,
  dependanceSupabase: 0,
  autoHealing: 100,
  uptime: 99.99,
  isae3402: true,
  iso27001: true,
  iso9001: true,
};

export const loisSouverainete = [
  { id: 1, title: '0 API EXTERNE', desc: 'Interdit d\'appeler OpenAI, Anthropic, Pinecone, Supabase, Readdy, Clerk, Stripe, Resend. Tout est local : Postgres + pgvector + Llama.cpp + FastEmbed.', icon: 'ri-shield-flash-line' },
  { id: 2, title: '0 TABLE VIDE', desc: 'Toute table PostgreSQL a ≥1 seed Big Four. Si vide → auto-seed depuis kos_memory.jsonl.', icon: 'ri-database-2-line' },
  { id: 3, title: '0 EDGE FONCTION VIDE', desc: 'Tout endpoint a logique métier + test + log ISAE 3402. Si vide → auto-génère depuis template.', icon: 'ri-function-line' },
  { id: 4, title: 'PROPRIÉTAIRE', desc: 'Modèles LLM = Llama-3.1-70B quantisé Q5_K_M. Embeddings = BGE-M3. Vector DB = pgvector. Orchestration = Temporal.io.', icon: 'ri-key-2-line' },
  { id: 5, title: 'AUTO-FULL HEALING', desc: 'Healthcheck 60s. Si service down → restart. Si erreur 3x → rollback + patch auto + alerte interne Slack local.', icon: 'ri-heart-pulse-line' },
];

export const autoIntegration = [
  { time: '02:00 GMT', name: 'Scan Codebase', desc: 'Lit /app/**/*.{ts,js,py}. Si nouvelle fonction sans test → génère test Vitest.', icon: 'ri-code-s-slash-line' },
  { time: '02:05 GMT', name: 'Scan DB', desc: 'Lit information_schema.tables. Si table vide → insère 10 lignes depuis kos_memory.jsonl.', icon: 'ri-database-2-line' },
  { time: '02:10 GMT', name: 'Scan API', desc: 'Lit OpenAPI. Si endpoint sans auth → injecte middleware JWT propriétaire.', icon: 'ri-key-2-line' },
  { time: '02:15 GMT', name: 'Scan KBR', desc: 'Lit /content/kbr/*.md. Si article sans L1-L4 → bloque publication + génère patch.', icon: 'ri-book-open-line' },
];

export const autoOptimisation = [
  { title: 'Query Slow Log', desc: 'Si query Postgres >100ms 3x → crée index GIN/GiST auto.', icon: 'ri-speed-up-line' },
  { title: 'Embedding Drift', desc: 'Si cosine_similarity <0.7 vs seed → re-embed avec BGE-M3 local.', icon: 'ri-brain-line' },
  { title: 'Token Budget', desc: 'Si prompt >8k → résume avec Llama.cpp local en gardant L1-L4.', icon: 'ri-scissors-line' },
  { title: 'Cache', desc: 'Si route hit >100/j → génère Redis cache + invalidation auto.', icon: 'ri-hard-drive-3-line' },
];

export const autoExpansion = [
  {
    trigger: 'Nouvelle norme détectée',
    example: 'Règlement COBAC R-2026/05',
    actions: [
      'Crée table norme_cobac_r2026_05',
      'Génère endpoint /api/kos/cobac/r2026-05',
      'Crée 5 tests + 1 KBR draft + 1 template Excel',
      'Commit Git + MR auto-assigné',
    ],
    icon: 'ri-add-circle-line',
  },
  {
    trigger: 'Nouveau besoin user',
    example: '10 tickets support même thème',
    actions: [
      'Génère agent IA dédié',
      'Crée outil KHEPRA dédié',
      'Déploie automatiquement',
    ],
    icon: 'ri-user-smile-line',
  },
];

export const autoCorrection = [
  { title: 'Hallucination Guard', desc: 'Avant réponse, grep †url†L. Si 0 match → BLOCAGE.', icon: 'ri-close-circle-line', severity: 'critical' },
  { title: 'Vigueur Guard', desc: 'Check date JO. Si abrogé → supprime chunk + log.', icon: 'ri-calendar-check-line', severity: 'critical' },
  { title: 'Contradiction Guard', desc: 'Si L1≠L2 → alerte + prend L1 comme vérité.', icon: 'ri-contrast-2-line', severity: 'high' },
  { title: 'Self-Test 03:00 GMT', desc: 'Lance 50 audits auto. Si <100% → rollback modèle + retrain LoRA local.', icon: 'ri-refresh-line', severity: 'critical' },
];

export const agentPlaybooks = [
  {
    id: 'lbcft_agent',
    name: 'LBC/FT Agent',
    icon: 'ri-police-car-line',
    trigger: { type: 'LBC/FT', severity: 'HIGH', entity: 'BOA CI' },
    resolution: ['Rapport PDF BIG FOUR', 'SQL patch conformité', 'Email interne notif', 'Close ticket auto'],
  },
  {
    id: 'ppr_agent',
    name: 'PPR Agent (Plan Préventif Redressement)',
    icon: 'ri-heart-pulse-line',
    trigger: { type: 'PPR', severity: 'HIGH', entity: 'Banque UEMOA' },
    resolution: ['Rapport PDF PPR', 'Plan redressement', 'Notification BCEAO', 'Close ticket auto'],
  },
  {
    id: 'esg_agent',
    name: 'ESG Agent',
    icon: 'ri-leaf-line',
    trigger: { type: 'ESG', severity: 'MEDIUM', entity: 'Groupe Minier' },
    resolution: ['Rapport ESG ISSB/GRI', 'Gap analysis', 'Roadmap conformité', 'Close ticket auto'],
  },
  {
    id: 'risk_agent',
    name: 'Risk Agent',
    icon: 'ri-alert-line',
    trigger: { type: 'RISK', severity: 'HIGH', entity: 'Établissement Crédit' },
    resolution: ['Rapport Risk COSO ERM', 'Matrice criticité', 'Plan mitigation', 'Close ticket auto'],
  },
  {
    id: 'audit_agent',
    name: 'Audit Agent',
    icon: 'ri-search-eye-line',
    trigger: { type: 'AUDIT', severity: 'CRITICAL', entity: 'Inspection COBAC' },
    resolution: ['Rapport Audit ISA', 'Gap analysis', 'Plan remédiation', 'Close ticket auto'],
  },
];

export const phasesMigration = [
  { phase: 'Phase 1 — J+0', action: 'Remplacer Supabase Auth → JWT + Argon2 local', status: 'pending', icon: 'ri-lock-password-line' },
  { phase: 'Phase 2 — J+7', action: 'Remplacer Supabase Storage → MinIO local', status: 'pending', icon: 'ri-hard-drive-3-line' },
  { phase: 'Phase 3 — J+14', action: 'Remplacer Supabase Realtime → Socket.io local', status: 'pending', icon: 'ri-flashlight-line' },
  { phase: 'Phase 4 — J+21', action: 'Remplacer Readdy AI → Llama.cpp + Temporal.io local', status: 'pending', icon: 'ri-cpu-line' },
  { phase: 'Phase 5 — J+30', action: 'Cut DNS. 0 egress vers .supabase.co ou .readdy.ai', status: 'pending', icon: 'ri-plug-line' },
];

export const stackProprietaire = {
  layers: [
    { name: 'LLM Local', tech: 'Llama-3.1-70B Q5_K_M', icon: 'ri-cpu-line', desc: 'Modèle de langage propriétaire, quantifié, exécuté on-prem via llama.cpp. Zéro appel à OpenAI/Anthropic.' },
    { name: 'Embeddings', tech: 'BGE-M3 via FastEmbed', icon: 'ri-braces-line', desc: 'Embeddings vectoriels 100% locaux. Zéro appel à OpenAI text-embedding-3 ou Pinecone.' },
    { name: 'Vector DB', tech: 'pgvector (PostgreSQL)', icon: 'ri-database-2-line', desc: 'Base vectorielle intégrée à PostgreSQL. Zéro Pinecone, zéro Qdrant cloud.' },
    { name: 'Auth', tech: 'JWT + Argon2 local', icon: 'ri-shield-keyhole-line', desc: 'Authentification propriétaire. Zéro Supabase Auth, zéro Clerk, zéro Auth0.' },
    { name: 'Storage', tech: 'MinIO (S3-compatible)', icon: 'ri-hard-drive-2-line', desc: 'Stockage objet local. Zéro Supabase Storage, zéro S3 AWS.' },
    { name: 'Realtime', tech: 'Socket.io', icon: 'ri-radar-line', desc: 'Temps réel local. Zéro Supabase Realtime.' },
    { name: 'Orchestration', tech: 'Temporal.io', icon: 'ri-git-branch-line', desc: 'Workflow engine niveau Big Four. Zéro n8n cloud, zéro Readdy orchestration.' },
    { name: 'Monitoring', tech: 'Prometheus + Grafana', icon: 'ri-line-chart-line', desc: 'Observabilité complète on-prem. Zéro dépendance cloud.' },
  ],
};

export const commandesSysteme = [
  { cmd: 'KOS SOVEREIGN INIT', desc: 'Coupe Readdy/Supabase, migre data, lance stack locale', icon: 'ri-rocket-2-line' },
  { cmd: 'KOS HEAL', desc: 'Check 320 sources + 50 tables + 120 endpoints. Patch si fail', icon: 'ri-heart-pulse-line' },
  { cmd: 'KOS EXPAND [NORME]', desc: 'Génère table+API+tests+KBR pour nouvelle norme', icon: 'ri-add-circle-line' },
  { cmd: 'KOS AGENT [TICKET]', desc: 'Déploie agent IA local pour résoudre ticket', icon: 'ri-robot-2-line' },
  { cmd: 'KOS OPTIMIZE', desc: 'Index DB + cache + quantize LLM', icon: 'ri-speed-up-line' },
  { cmd: 'KOS AUDIT SELF', desc: '50 audits auto. Si <100% → rollback', icon: 'ri-search-eye-line' },
];

export const bootSequence = [
  'docker-compose up -d',
  'KOS SOVEREIGN INIT',
  'KOS HEAL',
];



