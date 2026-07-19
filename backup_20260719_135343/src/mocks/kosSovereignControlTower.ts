/**
 * KOS-6.0 SOVEREIGN CONTROL TOWER — Mock Data
 * KHEPRA EXPERTS — 100% Propriétaire · 0 API Externe · Big Four
 * 
 * Cockpit de commandement interactif pour le cycle d'exécution complet.
 */

// ─── KPIs Souveraineté ───────────────────────────────────────────
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
  iso42001: true,
  totalSources: 320,
  sourcesActives: 320,
  dernierCrawl: '2026-07-02T01:00:00Z',
  documentsReglementaires: 2850,
  embeddingsLocaux: 1145000,
  citationsVerifiees: 200,
  autoritesCouvertes: 20,
  hashChaineActif: true,
};

// ─── 7 Étapes du Cycle d'Exécution ───────────────────────────────
export interface CycleStep {
  id: string;
  numero: number;
  nom: string;
  icone: string;
  trigger: string;
  description: string;
  status: 'idle' | 'running' | 'completed' | 'blocked' | 'error';
  derniereExecution: string | null;
  duree: string | null;
  resultat: string | null;
  hash: string | null;
}

export const cycleExecution: CycleStep[] = [
  {
    id: 'init',
    numero: 1,
    nom: 'KOS INIT',
    icone: 'ri-rocket-2-line',
    trigger: 'Première exécution / Sur commande',
    description: 'Vérifie Postgres (CREATE EXTENSION vector), crée tables kos_sources/kos_documents/kos_memory/kos_audit_log, seed depuis kos_memory.jsonl (50 lignes Big Four), vérifie Llama.cpp, lance Temporal.io worker.',
    status: 'completed',
    derniereExecution: '2026-07-02T00:05:00Z',
    duree: '2.8s',
    resultat: '4 tables créées · 50 seeds injectées · Llama-3.1-70B Q5_K_M vérifié · Temporal worker actif',
    hash: 'a3f8c2d1e5b7a9f4c6d8e1a3b5c7d9e2f1a4b6c8d0e3f5a7b9c1d2e4f6a8',
  },
  {
    id: 'crawl',
    numero: 2,
    nom: 'KOS CRAWL',
    icone: 'ri-radar-line',
    trigger: 'Quotidien 01:00 GMT',
    description: 'Lit /config/sources_320.json (45 L1 + 25 L2 + 200 L3 + 50 L4). Pour chaque URL : check robots.txt, fetch, hash SHA256. Si nouveau hash → parse PDF/HTML, regex exigences. Dédupe. Enrichit L2/L3/L4 via Crossref API locale. Chunk 1500 + BGE-M3 local → embedding VECTOR(1024). Upsert Postgres si quadruple ancrage OK.',
    status: 'completed',
    derniereExecution: '2026-07-02T01:00:00Z',
    duree: '14.2s',
    resultat: '320 sources scannées · 17 nouveaux documents · 12 pratiques extraites · 0 doublon · 12 enrichissements L2/L3/L4',
    hash: 'b4e9c3d2f1a8b5c7d9e0a2b4c6d8e1f3a5b7c9d0e2f4a6b8c0d1e3f5a7b9',
  },
  {
    id: 'audit',
    numero: 3,
    nom: 'KOS AUDIT',
    icone: 'ri-search-eye-line',
    trigger: 'Sur commande : KOS AUDIT [SUJET]',
    description: 'Embed SUJET avec BGE-M3 local. Query Postgres: SELECT * FROM kos_memory WHERE embedding <=> $1 < 0.2 ORDER BY <=> LIMIT 5. Vérifie quadruple ancrage L1-L4. Si manque → BLOCAGE QUALITÉ. Vérifie vigueur: grep "abrogé". Génère avec Llama.cpp: Executive Summary + Tableau L1-L4 + Plan 90j + Template Excel. Hash SHA256 + INSERT audit_log.',
    status: 'idle',
    derniereExecution: '2026-07-01T14:30:00Z',
    duree: '1.8s',
    resultat: 'Audit LBC/FT BOA CI : 5 sources trouvées · ancrage L1-L4 OK · 0 abrogé · Plan 90j généré',
    hash: 'c5f0d4e3a2b9c6d8e0f1a3b5c7d9e2f4a6b8c0d2e4f6a8b0c1d3e5f7a9b1',
  },
  {
    id: 'alert',
    numero: 4,
    nom: 'KOS ALERT',
    icone: 'ri-notification-3-line',
    trigger: 'Toutes les 15 minutes',
    description: 'Query: SELECT * FROM kos_documents WHERE created_at > NOW()-INTERVAL "15 min". Pour chaque user dans alerts: match keywords sur content. Si match → génère email+Slack local avec L1-L4 + lien.',
    status: 'completed',
    derniereExecution: '2026-07-02T10:15:00Z',
    duree: '0.4s',
    resultat: '3 alertes générées · 2 utilisateurs notifiés · 0 faux positif',
    hash: 'd6a1e5f4b3c0d7e9f1a2b4c6d8e0f3a5b7c9d1e3f5a7b9c0d2e4f6a8b0c2',
  },
  {
    id: 'heal',
    numero: 5,
    nom: 'KOS HEAL',
    icone: 'ri-heart-pulse-line',
    trigger: 'Toutes les 60 secondes',
    description: 'Healthcheck: Postgres, Redis, Llama.cpp, Temporal. Si down → docker restart. Si 3x fail → rollback git + patch auto. Query slow log: Si >100ms 3x → CREATE INDEX GIN. Si table count(*)=0 → seed auto. Si endpoint 404 → génère depuis template.',
    status: 'completed',
    derniereExecution: '2026-07-02T10:16:00Z',
    duree: '0.6s',
    resultat: '14/14 conteneurs healthy · 0 slow query · 0 table vide · 0 endpoint 404 · 0 restart',
    hash: 'e7b2f6a5c4d1e8f0a2b3c5d7e9f1a4b6c8d0e2f4a6b8c0d1e3f5a7b9c1d3',
  },
  {
    id: 'expand',
    numero: 6,
    nom: 'KOS EXPAND',
    icone: 'ri-add-circle-line',
    trigger: 'Si nouvelle norme détectée',
    description: 'Parse norme: nom, articles, dates. SQL: CREATE TABLE norme_xxx + CREATE INDEX. API: génère /api/kos/xxx FastAPI + test Vitest. KBR: génère draft .md avec L1-L4. Excel: génère template /templates/xxx.xlsx. Git: commit + MR + deploy.',
    status: 'idle',
    derniereExecution: '2026-06-28T08:00:00Z',
    duree: '3.2s',
    resultat: 'Norme COBAC R-2026/03 LBC/FT : table créée · endpoint déployé · 5 tests · 1 KBR · template Excel',
    hash: 'f8c3a7b6d5e2f9a1b3c4d6e8f0a2b5c7d9e1f3a5b7c9d0e2f4a6b8c0d1e4',
  },
  {
    id: 'deploy',
    numero: 7,
    nom: 'KOS DEPLOY',
    icone: 'ri-robot-2-line',
    trigger: 'Si ticket entrant',
    description: 'Choix agent: lbcft_agent.py | ppr_agent.py | esg_agent.py. Exécution Llama.cpp + tools Postgres locaux. Génère: rapport.pdf + patch.sql + email_interne.eml. Close ticket + log ISAE 3402. Ajoute workflow à kos_playbooks.jsonl.',
    status: 'idle',
    derniereExecution: '2026-07-01T16:45:00Z',
    duree: '4.1s',
    resultat: 'Agent LBC/FT déployé pour BOA CI · rapport.pdf 28 pages · patch.sql 12 lignes · ticket closed',
    hash: 'a9d4b8c7e6f3a0b2c4d5e7f9a1b3c6d8e0f2a4b6c8d0e1f3a5b7c9d1e2f5',
  },
];

// ─── Commandes KOS ───────────────────────────────────────────────
export interface command {
  cmd: string;
  args: string | null;
  description: string;
  icone: string;
  etape: number;
  impact: string;
}

export const commandesKos: command[] = [
  { cmd: 'KOS INIT', args: null, description: 'Initialise la stack souveraine — Postgres + pgvector + Llama.cpp + Temporal.io + seed Big Four', icone: 'ri-rocket-2-line', etape: 1, impact: 'Tables créées, 50 seeds injectées, workers lancés' },
  { cmd: 'KOS CRAWL', args: null, description: 'Lance le crawl quotidien des 320 sources réglementaires L1-L4', icone: 'ri-radar-line', etape: 2, impact: '~17 nouveaux documents, enrichissement Crossref auto' },
  { cmd: 'KOS AUDIT', args: 'LBC/FT BOA CI', description: 'Audit réglementaire complet avec quadruple ancrage L1-L4 sur un sujet spécifique', icone: 'ri-search-eye-line', etape: 3, impact: 'Executive Summary + Plan 90j + Template Excel' },
  { cmd: 'KOS ALERT', args: null, description: 'Vérifie les nouveaux documents et génère des alertes pour les utilisateurs abonnés', icone: 'ri-notification-3-line', etape: 4, impact: 'Emails + Slack locaux avec ancrage L1-L4' },
  { cmd: 'KOS HEAL', args: null, description: 'Auto-réparation complète : healthcheck 14 conteneurs, index slow queries, seed tables vides', icone: 'ri-heart-pulse-line', etape: 5, impact: '14/14 conteneurs vérifiés, 0 table vide, 0 slow query' },
  { cmd: 'KOS EXPAND', args: 'COBAC R-2026/03', description: 'Expansion automatique pour nouvelle norme : table + API + tests + KBR + template', icone: 'ri-add-circle-line', etape: 6, impact: 'Table créée, endpoint FastAPI, 5 tests Vitest, KBR draft, Excel' },
  { cmd: 'KOS DEPLOY', args: 'lbcft_agent', description: 'Déploie un agent IA local pour résoudre un ticket de conformité', icone: 'ri-robot-2-line', etape: 7, impact: 'Rapport PDF + patch SQL + email + close ticket' },
  { cmd: 'KOS OPTIMIZE', args: null, description: 'Optimisation globale : index DB, cache Redis, quantize LLM', icone: 'ri-speed-up-line', etape: 5, impact: 'Index GIN/GiST créés, cache Redis configuré, modèle quantifié' },
  { cmd: 'KOS AUDIT SELF', args: null, description: '50 audits auto. Si score <100% → rollback modèle + retrain LoRA local', icone: 'ri-shield-check-line', etape: 5, impact: '50/50 audits passés, modèle stable, LoRA frais' },
];

// ─── Journal ISAE 3402 — Piste d'Audit Immuable ──────────────────
export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  cible: string;
  status: 'OK' | 'ERROR' | 'BLOCKED' | 'WARNING';
  hash: string;
  prevHash: string;
  detail: string;
  sources: string[];
}

export const auditLog: AuditLogEntry[] = [
  {
    id: 'LOG-001',
    timestamp: '2026-07-02T00:05:00Z',
    action: 'KOS INIT',
    cible: 'SYSTEM',
    status: 'OK',
    hash: 'a3f8c2d1e5b7a9f4c6d8e1a3b5c7d9e2f1a4b6c8d0e3f5a7b9c1d2e4f6a8',
    prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
    detail: 'PostgreSQL: CREATE EXTENSION vector OK. Tables kos_sources/kos_documents/kos_memory/kos_audit_log créées. 50 seeds injectées depuis /cache/kos_memory.jsonl. Llama-3.1-70B-Q5_K_M vérifié (/models/). Temporal.io worker lancé (port 7233).',
    sources: ['kos_memory.jsonl', 'PostgreSQL 16', 'Llama.cpp'],
  },
  {
    id: 'LOG-002',
    timestamp: '2026-07-02T01:00:00Z',
    action: 'KOS CRAWL',
    cible: '320 SOURCES',
    status: 'OK',
    hash: 'b4e9c3d2f1a8b5c7d9e0a2b4c6d8e1f3a5b7c9d0e2f4a6b8c0d1e3f5a7b9',
    prevHash: 'a3f8c2d1e5b7a9f4c6d8e1a3b5c7d9e2f1a4b6c8d0e3f5a7b9c1d2e4f6a8',
    detail: '320/320 sources scannées (45 L1 + 25 L2 + 200 L3 + 50 L4). 17 nouveaux documents détectés. 12 best practices extraites (regex). 0 doublon SHA256. 12 enrichissements Crossref auto (L2/L3/L4). 12 embeddings BGE-M3 générés (VECTOR 1024). 12 upserts kos_documents + kos_memory (quadruple ancrage validé).',
    sources: ['BCEAO (2)', 'COBAC (1)', 'OHADA (1)', 'GAFI (1)', 'ISO (2)', 'Crossref QS200 (3)', 'DOI Tier-1 (2)'],
  },
  {
    id: 'LOG-003',
    timestamp: '2026-07-02T01:05:00Z',
    action: 'KOS VALIDATE',
    cible: 'kos_memory.jsonl',
    status: 'OK',
    hash: 'c5f0d4e3a2b9c6d8e0f1a3b5c7d9e2f4a6b8c0d2e4f6a8b0c1d3e5f7a9b1',
    prevHash: 'b4e9c3d2f1a8b5c7d9e0a2b4c6d8e1f3a5b7c9d0e2f4a6b8c0d1e3f5a7b9',
    detail: 'Contrôle 4 Yeux Big Four. 12/12 pratiques validées (100% quadruple ancrage L1-L4). 0 rejet. Rapport kos_validate_report.json généré. Fichier kos_memory_clean.jsonl écrit.',
    sources: ['kos_validate.py v5.3', 'kos_memory_clean.jsonl'],
  },
  {
    id: 'LOG-004',
    timestamp: '2026-07-02T03:00:00Z',
    action: 'KOS SELF-TEST',
    cible: '50 AUDITS',
    status: 'OK',
    hash: 'd6a1e5f4b3c0d7e9f1a2b4c6d8e0f3a5b7c9d1e3f5a7b9c0d2e4f6a8b0c2',
    prevHash: 'c5f0d4e3a2b9c6d8e0f1a3b5c7d9e2f4a6b8c0d2e4f6a8b0c1d3e5f7a9b1',
    detail: '50/50 audits auto passés (100%). Hallucination Guard: 0 violation. Vigueur Guard: 0 texte abrogé. Contradiction Guard: 0 conflit L1≠L2. Score global 100/100. Modèle stable. LoRA frais.',
    sources: ['50 sujets aléatoires', 'Llama.cpp', 'BGE-M3'],
  },
  {
    id: 'LOG-005',
    timestamp: '2026-07-02T10:15:00Z',
    action: 'KOS ALERT',
    cible: '2 USERS',
    status: 'OK',
    hash: 'e7b2f6a5c4d1e8f0a2b3c5d7e9f1a4b6c8d0e2f4a6b8c0d1e3f5a7b9c1d3',
    prevHash: 'd6a1e5f4b3c0d7e9f1a2b4c6d8e0f3a5b7c9d1e3f5a7b9c0d2e4f6a8b0c2',
    detail: '3 nouveaux documents depuis 10:00. 2 utilisateurs matchés (LBC/FT, COBAC). 3 alertes générées via email local + Slack interne. Ancrage L1-L4 présent sur chaque alerte.',
    sources: ['kos_documents', 'alerts table', 'Slack local'],
  },
  {
    id: 'LOG-006',
    timestamp: '2026-07-02T10:16:00Z',
    action: 'KOS HEAL',
    cible: '14 CONTAINERS',
    status: 'OK',
    hash: 'f8c3a7b6d5e2f9a1b3c4d6e8f0a2b5c7d9e1f3a5b7c9d0e2f4a6b8c0d1e4',
    prevHash: 'e7b2f6a5c4d1e8f0a2b3c5d7e9f1a4b6c8d0e2f4a6b8c0d1e3f5a7b9c1d3',
    detail: 'Healthcheck: Postgres (5433) OK, Redis (6380) OK, Llama.cpp OK, Temporal (7233) OK, Qdrant (6333) OK, n8n (5678) OK, MinIO (9000) OK, Nginx (8000) OK, Prometheus (9090) OK, Grafana (3000) OK. 14/14 healthy. 0 slow query (>100ms). 0 table vide. 0 endpoint 404. 0 restart requis.',
    sources: ['docker-compose.yml', 'kos-health-check.sh', 'systemd'],
  },
  {
    id: 'LOG-007',
    timestamp: '2026-07-01T14:30:00Z',
    action: 'KOS AUDIT',
    cible: 'LBC/FT BOA CI',
    status: 'OK',
    hash: 'a9d4b8c7e6f3a0b2c4d5e7f9a1b3c6d8e0f2a4b6c8d0e1f3a5b7c9d1e2f5',
    prevHash: 'f8c3a7b6d5e2f9a1b3c4d6e8f0a2b5c7d9e1f3a5b7c9d0e2f4a6b8c0d1e4',
    detail: 'Embed "LBC/FT BOA CI" via BGE-M3. 5 résultats cosine <0.2. Quadruple ancrage L1-L4 vérifié (BCEAO Circulaire + ISO 37301 + Crossref QS200 + DOI 10.xxxx). 0 abrogé. Llama.cpp: Executive Summary 3 pages + Tableau L1-L4 + Plan 90j + Template Excel générés. SHA256 chaîné.',
    sources: ['BCEAO Circulaire 01/2017', 'GAFI R.15 rév.2019', 'ISO 37301:2021', 'DOI 10.1016/j.jfs.2025.101234', 'QS200 Harvard Law'],
  },
  {
    id: 'LOG-008',
    timestamp: '2026-07-01T16:45:00Z',
    action: 'KOS DEPLOY',
    cible: 'lbcft_agent.py',
    status: 'OK',
    hash: 'b0e5c9d8f7a4b1c3d5e6f8a0b2c4d7e9f1a3b5c7d9e0f2a4b6c8d0e1f3a5',
    prevHash: 'a9d4b8c7e6f3a0b2c4d5e7f9a1b3c6d8e0f2a4b6c8d0e1f3a5b7c9d1e2f5',
    detail: 'Ticket TKT-20260701-0042 (LBC/FT, HIGH, BOA CI). Agent lbcft_agent.py sélectionné. Llama.cpp + PostgreSQL tools. Rapport 28 pages généré. patch.sql 12 lignes. email_interne.eml. Ticket closed. Workflow ajouté à kos_playbooks.jsonl.',
    sources: ['lbcft_agent.py', 'Llama.cpp', 'PostgreSQL', 'kos_playbooks.jsonl'],
  },
];

// ─── Sources Réglementaires L1-L4 ────────────────────────────────
export interface SourceRegistry {
  niveau: string;
  label: string;
  total: number;
  actives: number;
  derniereVerification: string;
  exemples: string[];
}

export const sourcesRegistre: SourceRegistry[] = [
  { niveau: 'L1', label: 'Régulateurs Officiels', total: 45, actives: 45, derniereVerification: '2026-07-02T01:00:00Z', exemples: ['BCEAO (bceao.int)', 'COBAC/BEAC (beac.int)', 'OHADA (ohada.org)', 'GAFI (fatf-gafi.org)', 'CIMA', 'GIABA', 'GABAC', 'AMF-UEMOA'] },
  { niveau: 'L2', label: 'Normes & Standards', total: 25, actives: 25, derniereVerification: '2026-07-02T01:00:00Z', exemples: ['ISO.org (27001, 42001, 31000, 9001)', 'IFRS.org (IFRS 9, S1, S2)', 'BIS.org (Bâle III)', 'IFAC.org', 'COSO.org'] },
  { niveau: 'L3', label: 'Académique QS200', total: 200, actives: 200, derniereVerification: '2026-07-02T01:00:00Z', exemples: ['Harvard Law School', 'Wharton (UPenn)', 'HEC Paris', 'LSE', 'INSEAD', 'Oxford', 'Cambridge', 'Stanford GSB'] },
  { niveau: 'L4', label: 'DOI Tier-1', total: 50, actives: 50, derniereVerification: '2026-07-02T01:00:00Z', exemples: ['doi.org/10.1016/j.jfs.2025.*', 'doi.org/10.1093/rfs/*', 'doi.org/10.1016/j.jbankfin.*', 'doi.org/10.1007/s10693-*'] },
];

// ─── État du Système ─────────────────────────────────────────────
export interface SystemComponent {
  nom: string;
  icone: string;
  port: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  derniereVerification: string;
  version: string;
}

export const systemComponents: SystemComponent[] = [
  { nom: 'PostgreSQL + pgvector', icone: 'ri-database-2-line', port: '5433', status: 'healthy', uptime: '72h 14m', derniereVerification: '2026-07-02T10:16:00Z', version: '16 + pgvector 0.7' },
  { nom: 'Llama.cpp (Llama-3.1-70B)', icone: 'ri-cpu-line', port: '8080', status: 'healthy', uptime: '72h 12m', derniereVerification: '2026-07-02T10:16:00Z', version: 'Q5_K_M' },
  { nom: 'BGE-M3 (FastEmbed)', icone: 'ri-braces-line', port: 'local', status: 'healthy', uptime: '72h 14m', derniereVerification: '2026-07-02T10:16:00Z', version: 'BGE-M3 v1.0' },
  { nom: 'Redis', icone: 'ri-hard-drive-3-line', port: '6380', status: 'healthy', uptime: '72h 14m', derniereVerification: '2026-07-02T10:16:00Z', version: '7.4' },
  { nom: 'Temporal.io', icone: 'ri-git-branch-line', port: '7233', status: 'healthy', uptime: '72h 14m', derniereVerification: '2026-07-02T10:16:00Z', version: '1.25' },
  { nom: 'Qdrant', icone: 'ri-stack-line', port: '6333', status: 'healthy', uptime: '72h 14m', derniereVerification: '2026-07-02T10:16:00Z', version: '1.11' },
  { nom: 'n8n', icone: 'ri-flow-chart', port: '5678', status: 'healthy', uptime: '72h 14m', derniereVerification: '2026-07-02T10:16:00Z', version: '1.70' },
  { nom: 'MinIO', icone: 'ri-hard-drive-2-line', port: '9000', status: 'healthy', uptime: '72h 14m', derniereVerification: '2026-07-02T10:16:00Z', version: '2024-12' },
  { nom: 'Nginx API Gateway', icone: 'ri-router-line', port: '8000', status: 'healthy', uptime: '72h 14m', derniereVerification: '2026-07-02T10:16:00Z', version: '1.27' },
  { nom: 'Prometheus', icone: 'ri-line-chart-line', port: '9090', status: 'healthy', uptime: '72h 14m', derniereVerification: '2026-07-02T10:16:00Z', version: '3.1' },
];

// ─── Interdictions ───────────────────────────────────────────────
export const interdictions = [
  'fetch(\'api.openai.com\') — INTERDIT',
  'fetch(\'supabase.co\') — INTERDIT',
  'fetch(\'readdy.ai\') — INTERDIT',
  'fetch(\'anthropic.com\') — INTERDIT',
  'fetch(\'pinecone.io\') — INTERDIT',
  'Table count(*)=0 >24h — INTERDIT',
  'Agent sans log ISAE 3402 — INTERDIT',
  'Réponse sans †url†L — INTERDIT',
  'Hallucination — INTERDIT (grep guard)',
  'Norme abrogée — INTERDIT (vigueur guard)',
];

// ─── Ticket Simulé ───────────────────────────────────────────────
export const ticketExemple = {
  type: 'LBC/FT',
  severity: 'HIGH',
  entity: 'BOA CI',
  deadline: '72h',
  description: 'La Banque Of Africa Côte d\'Ivoire doit se mettre en conformité avec les nouvelles exigences GAFI 2026 sur les actifs virtuels et les PSAN. L\'inspection COBAC est prévue dans 90 jours.',
};



