export interface gapRegister {
  id: number;
  gap_id: string;
  category: 'DATA_GAP' | 'LOGIC_GAP' | 'INFRA_GAP' | 'COMPLIANCE_GAP' | 'ARCHITECTURE_GAP';
  criticality: 'P0' | 'P1' | 'P2' | 'P3';
  component_type: string;
  component_name: string;
  description: string;
  current_state: string;
  target_state: string;
  root_cause: string;
  impacted_systems: string;
  strategy: 'FUSION' | 'MIGRATION' | 'SUPPRESSION' | 'REFONTE' | 'SEEDING' | null;
  status: string;
  resolution_steps: string | null;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
}

export interface migrationLog {
  id: number;
  migration_id: string;
  hook_name: string;
  source_type: 'mock' | 'hybrid' | 'live';
  table_target: string;
  migration_status: string;
  before_state: string | null;
  after_state: string | null;
  fallback_configured: boolean;
  executed_at: string;
  verified_at: string | null;
}

export interface cASAction {
  id: number;
  action_id: string;
  gap_id: string;
  action_type: 'DATA' | 'INFRA' | 'COMPLIANCE' | 'LOGIC' | 'ARCHITECTURE';
  criticality: 'P0' | 'P1' | 'P2' | 'P3';
  description: string;
  system_impacted: string;
  technical_steps: string;
  risks: string;
  expected_result: string;
  associated_kpi: string;
  horizon: 'J+7' | 'J+30' | 'J+90';
  status: string;
  created_at: string;
}

export interface complianceImpact {
  id: number;
  action_id: string;
  iso_27001_impact: string;
  governance_impact: string;
  traceability_level: string;
  compliance_notes: string;
}

export interface cASSystemHealth {
  total_gaps: number;
  gaps_resolved: number;
  p0_blockers: number;
  p1_degraded: number;
  p2_needs_optim: number;
  hooks_live_pct: number;
  hooks_hybrid_pct: number;
  hooks_mock_only_pct: number;
  total_hooks: number;
  edge_functions_active: number;
  edge_functions_limit: number;
  edge_functions_pct: number;
  migrations_completed: number;
  migrations_verified: number;
  migrations_pending: number;
  tables_active: number;
  tables_empty: number;
  iso_score: number;
  bigfour_score: number;
  actions_planned: number;
  actions_in_progress: number;
  actions_completed: number;
}

// ─── État réel au 26 Juin 2026 après exécution KOS-CAS Blocs 6-9 ───
// 4 gaps résolus, 10 migrations vérifiées, 4 actions planifiées

export const CAS_GAP_REGISTER_MOCK: gapRegister[] = [
  {
    id: 1, gap_id: 'GAP-001', category: 'INFRA_GAP', criticality: 'P0',
    component_type: 'edge_function', component_name: 'supabase_functions',
    description: '101 Edge Functions actives — plafond Supabase 250 atteint. Tout nouveau déploiement bloqué.',
    current_state: '101 fonctions actives, limite 250 atteinte via quota projet',
    target_state: 'Max 80 fonctions après fusion, libération de 20+ slots',
    root_cause: 'Fonctions créées par génération automatique sans nettoyage',
    impacted_systems: 'Inventory Engine, Provenance Validator, YouTube Pipeline',
    strategy: 'FUSION', status: 'detected', resolution_steps: null, created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:00:00Z', resolved_at: null
  },
  {
    id: 2, gap_id: 'GAP-002', category: 'LOGIC_GAP', criticality: 'P1',
    component_type: 'hook', component_name: 'useAOAMI',
    description: 'Mock-only — pas de connexion Supabase',
    current_state: 'Migré MIG-006: Supabase LIVE (85 lignes)',
    target_state: 'Supabase LIVE avec fallback mock sécurisé',
    root_cause: 'Hook créé avant déploiement des tables Supabase',
    impacted_systems: 'Tableau de bord AO-AMI',
    strategy: 'MIGRATION', status: 'resolved',
    resolution_steps: 'MIG-006: Hook migré mock→Supabase LIVE. Table kos_odske_knowledge_regulatory (85 lignes). Fallback mock conservé.',
    created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:45:00Z', resolved_at: '2026-06-25T23:45:00Z'
  },
  {
    id: 3, gap_id: 'GAP-003', category: 'LOGIC_GAP', criticality: 'P1',
    component_type: 'hook', component_name: 'useAfricaObservatories',
    description: 'Mock-only — pas de connexion Supabase',
    current_state: 'Migré MIG-007: Supabase LIVE (8 secteurs)',
    target_state: 'Supabase LIVE avec fallback mock sécurisé',
    root_cause: 'Hook créé avant déploiement des tables Supabase',
    impacted_systems: 'Observatoires Afrique',
    strategy: 'MIGRATION', status: 'resolved',
    resolution_steps: 'MIG-007: Hook migré mock→Supabase LIVE. Table sector_observatories (8 secteurs). Fallback mock conservé.',
    created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:45:00Z', resolved_at: '2026-06-25T23:45:00Z'
  },
  {
    id: 4, gap_id: 'GAP-004', category: 'LOGIC_GAP', criticality: 'P1',
    component_type: 'hook', component_name: 'useAuditIntelligence',
    description: 'Hybride — Mock dominant, Supabase secondaire',
    current_state: '70% mock, 30% Supabase',
    target_state: 'Supabase LIVE prioritaire, fallback mock',
    root_cause: 'Migration partielle non terminée',
    impacted_systems: 'Dashboard Audit Intelligence',
    strategy: 'MIGRATION', status: 'detected', resolution_steps: null, created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:00:00Z', resolved_at: null
  },
  {
    id: 5, gap_id: 'GAP-005', category: 'LOGIC_GAP', criticality: 'P1',
    component_type: 'hook', component_name: 'useBoardAdvisories',
    description: 'Mock-only — table board_advisories existante mais non connectée',
    current_state: 'Migré MIG-008: Supabase LIVE (6 advisories)',
    target_state: 'Supabase LIVE',
    root_cause: 'Hook créé avant déploiement des tables Supabase',
    impacted_systems: 'Conseil Administration',
    strategy: 'MIGRATION', status: 'resolved',
    resolution_steps: 'MIG-008: Hook migré mock→Supabase LIVE. Table board_advisories (6 advisories). Fallback mock conservé.',
    created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:45:00Z', resolved_at: '2026-06-25T23:45:00Z'
  },
  {
    id: 6, gap_id: 'GAP-006', category: 'DATA_GAP', criticality: 'P2',
    component_type: 'table', component_name: 'organizations',
    description: 'Table vide — 0 enregistrements (infrastructure non utilisée)',
    current_state: 'Table vide, feature non déployée',
    target_state: 'Accepté — sera peuplée lors du déploiement de la feature',
    root_cause: 'Fonctionnalité organisationnelle pas encore utilisée',
    impacted_systems: 'Multi-tenant, Organisations',
    strategy: 'SEEDING', status: 'detected', resolution_steps: null, created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:00:00Z', resolved_at: null
  },
  {
    id: 7, gap_id: 'GAP-007', category: 'DATA_GAP', criticality: 'P2',
    component_type: 'table', component_name: 'api_keys',
    description: 'Table vide — 0 enregistrements (infrastructure non utilisée)',
    current_state: 'Table vide, feature non déployée',
    target_state: 'Accepté — sera peuplée lors du déploiement de la feature',
    root_cause: 'API keys pas encore provisionnées',
    impacted_systems: 'API Gateway',
    strategy: 'SEEDING', status: 'detected', resolution_steps: null, created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:00:00Z', resolved_at: null
  },
  {
    id: 8, gap_id: 'GAP-008', category: 'DATA_GAP', criticality: 'P2',
    component_type: 'table', component_name: 'certificates',
    description: 'Table vide — 0 enregistrements (infrastructure non utilisée)',
    current_state: 'Table vide, feature non déployée',
    target_state: 'Accepté — sera peuplée lors du déploiement de la feature',
    root_cause: 'Certificats pas encore provisionnés',
    impacted_systems: 'Formations, Certifications',
    strategy: 'SEEDING', status: 'detected', resolution_steps: null, created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:00:00Z', resolved_at: null
  },
  {
    id: 9, gap_id: 'GAP-009', category: 'DATA_GAP', criticality: 'P2',
    component_type: 'table', component_name: 'lessons',
    description: 'Table vide — 0 enregistrements (infrastructure non utilisée)',
    current_state: 'Table vide, feature non déployée',
    target_state: 'Accepté — sera peuplée lors du déploiement de la feature',
    root_cause: 'Leçons pas encore créées',
    impacted_systems: 'Formations, Learning',
    strategy: 'SEEDING', status: 'detected', resolution_steps: null, created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:00:00Z', resolved_at: null
  },
  {
    id: 10, gap_id: 'GAP-010', category: 'DATA_GAP', criticality: 'P2',
    component_type: 'table', component_name: 'email_sequence_enrollments',
    description: 'Table vide — 0 enregistrements (infrastructure non utilisée)',
    current_state: 'Table vide, feature non déployée',
    target_state: 'Accepté — sera peuplée lors du déploiement de la feature',
    root_cause: 'Séquences email pas encore actives',
    impacted_systems: 'Email Automation',
    strategy: 'SEEDING', status: 'detected', resolution_steps: null, created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:00:00Z', resolved_at: null
  },
  {
    id: 11, gap_id: 'GAP-011', category: 'INFRA_GAP', criticality: 'P1',
    component_type: 'edge_function', component_name: 'youtube_cluster',
    description: '6 fonctions YouTube distinctes — complexité inutile',
    current_state: 'Fusion planifiée: kos-youtube-oauth + kos-youtube-publisher → kos-youtube-engine. Action ACT-FUSION-YT créée.',
    target_state: '1 fonction kos-youtube-engine fédérée',
    root_cause: 'Génération automatique sans regroupement',
    impacted_systems: 'YouTube Pipeline complet',
    strategy: 'FUSION', status: 'in_progress',
    resolution_steps: 'FUSION: kos-youtube-oauth + kos-youtube-publisher → kos-youtube-engine (60% code dupliqué). Actions: 1)Extraire OAuth dans module partagé 2)Unifier actions generate/publish/status/analytics 3)Déployer kos-youtube-engine 4)Marquer 5 anciennes comme deprecated. Libération estimée: 5 slots.',
    created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:50:00Z', resolved_at: null
  },
  {
    id: 12, gap_id: 'GAP-012', category: 'INFRA_GAP', criticality: 'P1',
    component_type: 'edge_function', component_name: 'rag_cluster',
    description: '3 fonctions RAG distinctes',
    current_state: 'Fusion planifiée. Action ACT-FUSION-RAG créée.',
    target_state: '1 fonction kos-rag-engine unifiée',
    root_cause: 'Génération automatique sans regroupement',
    impacted_systems: 'RAG Pipeline, Knowledge Engine',
    strategy: 'FUSION', status: 'in_progress',
    resolution_steps: 'FUSION: 3 fonctions RAG → kos-rag-engine. Actions: 1)Unifier generate/single + generate/batch + search 2)Déployer 3)Basculer frontend 4)Désactiver anciennes. Libération: 2 slots.',
    created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:50:00Z', resolved_at: null
  },
  {
    id: 13, gap_id: 'GAP-013', category: 'INFRA_GAP', criticality: 'P1',
    component_type: 'edge_function', component_name: 'email_cluster',
    description: '3 fonctions email distinctes',
    current_state: 'Fusion planifiée. Action ACT-FUSION-EMAIL créée.',
    target_state: '1 fonction kos-email-engine',
    root_cause: 'Génération automatique sans regroupement',
    impacted_systems: 'Email Automation',
    strategy: 'FUSION', status: 'in_progress',
    resolution_steps: 'FUSION: 3 fonctions email → kos-email-engine. Actions: 1)Unifier welcome/scheduled/funnel 2)Déployer 3)Basculer. Libération: 2 slots.',
    created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:50:00Z', resolved_at: null
  },
  {
    id: 14, gap_id: 'GAP-014', category: 'COMPLIANCE_GAP', criticality: 'P1',
    component_type: 'process', component_name: 'iso_27001_traceability',
    description: 'Traçabilité ISO 27001 partielle — logs de correction non structurés',
    current_state: 'Logs éparpillés dans 5 tables',
    target_state: 'Logs unifiés avec piste d\'audit complète',
    root_cause: 'Pas de standard de logging défini au début',
    impacted_systems: 'Audit ISO 27001, Certification',
    strategy: 'REFONTE', status: 'detected', resolution_steps: null, created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:00:00Z', resolved_at: null
  },
  {
    id: 15, gap_id: 'GAP-015', category: 'ARCHITECTURE_GAP', criticality: 'P2',
    component_type: 'architecture', component_name: 'separation_concerns',
    description: 'Séparation des responsabilités insuffisante — hooks trop larges',
    current_state: 'Hooks multi-responsabilité (data + UI + business logic)',
    target_state: 'Hooks single-responsibility avec services dédiés',
    root_cause: 'Croissance organique sans refactoring',
    impacted_systems: 'Maintenabilité, Testabilité',
    strategy: 'REFONTE', status: 'detected', resolution_steps: null, created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:00:00Z', resolved_at: null
  },
  {
    id: 16, gap_id: 'GAP-016', category: 'COMPLIANCE_GAP', criticality: 'P1',
    component_type: 'data', component_name: 'provenance_tracking',
    description: '98.2% de traçabilité ODSKE mais 0% sur les hooks',
    current_state: 'ODSKE: 100% traçable. Hooks: 0% traçable.',
    target_state: '100% traçabilité sur tous les flux de données',
    root_cause: 'Provenance Log limité aux tables ODSKE',
    impacted_systems: 'Audit Big Four, Due Diligence',
    strategy: 'MIGRATION', status: 'detected', resolution_steps: null, created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:00:00Z', resolved_at: null
  },
  {
    id: 17, gap_id: 'GAP-017', category: 'LOGIC_GAP', criticality: 'P2',
    component_type: 'hook', component_name: 'useGlobalSearch',
    description: 'Mock-only — recherche globale non connectée',
    current_state: 'Migré MIG-010: RAG hybride (100 docs Supabase + recherche locale)',
    target_state: 'Supabase LIVE avec fallback mock sécurisé',
    root_cause: 'Recherche initialement purement locale',
    impacted_systems: 'GlobalSearch, RAG',
    strategy: 'MIGRATION', status: 'resolved',
    resolution_steps: 'MIG-010: Hook migré mock→Supabase RAG hybride. Table rag_documents (100 docs). Recherche parallèle locale+RAG. Badge LIVE dans la search bar.',
    created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:45:00Z', resolved_at: '2026-06-25T23:45:00Z'
  },
  {
    id: 18, gap_id: 'GAP-018', category: 'DATA_GAP', criticality: 'P2',
    component_type: 'table', component_name: 'webhook_endpoints',
    description: 'Table vide — webhooks non configurés (infrastructure non utilisée)',
    current_state: 'Table vide, feature non déployée',
    target_state: 'Accepté — sera peuplée lors du déploiement de la feature',
    root_cause: 'Webhooks pas encore configurés',
    impacted_systems: 'Webhook Engine',
    strategy: 'SEEDING', status: 'detected', resolution_steps: null, created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:00:00Z', resolved_at: null
  },
  {
    id: 19, gap_id: 'GAP-019', category: 'INFRA_GAP', criticality: 'P0',
    component_type: 'infrastructure', component_name: 'edge_function_deploy_blocked',
    description: 'Déploiement Edge Functions bloqué — limite Supabase atteinte',
    current_state: '101/250 fonctions, plan de fusion J+7 activé. Action ACT-FUSION-ADMIN créée.',
    target_state: '89 fonctions après fusions, marge opérationnelle',
    root_cause: 'Quota Supabase atteint par accumulation',
    impacted_systems: 'ODSKE Inventory Engine, Provenance Validator, tout nouveau déploiement',
    strategy: 'FUSION', status: 'in_progress',
    resolution_steps: 'FUSION: 4 fonctions admin → kos-admin-engine. + fusions YouTube/RAG/Email. Total: 12 slots libérés (101→89).',
    created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:50:00Z', resolved_at: null
  },
  {
    id: 20, gap_id: 'GAP-020', category: 'COMPLIANCE_GAP', criticality: 'P1',
    component_type: 'reporting', component_name: 'bigfour_audit_readiness',
    description: 'Système non audit-ready — KPI non prouvables automatiquement',
    current_state: 'KPI déclaratifs sans preuve automatique',
    target_state: 'KPI traçables avec source de vérité',
    root_cause: 'Pas de mécanisme de preuve automatique',
    impacted_systems: 'Audit Big Four, Certification ISO',
    strategy: 'REFONTE', status: 'detected', resolution_steps: null, created_at: '2026-06-25T23:00:00Z', updated_at: '2026-06-25T23:00:00Z', resolved_at: null
  },
];

export const CAS_MIGRATION_LOG_MOCK: migrationLog[] = [
  { id: 1, migration_id: 'MIG-001', hook_name: 'useControlTowerData', source_type: 'hybrid', table_target: 'enterprise_control_tower', migration_status: 'verified', before_state: 'hybrid Supabase+fallback', after_state: 'LIVE: Supabase rows confirmed active', fallback_configured: true, executed_at: '2026-06-25T10:00:00Z', verified_at: '2026-06-25T23:40:00Z' },
  { id: 2, migration_id: 'MIG-002', hook_name: 'useRegulatoryExcellence', source_type: 'hybrid', table_target: 'regulatory_register', migration_status: 'verified', before_state: 'hybrid Supabase+fallback', after_state: 'LIVE: Supabase rows confirmed active', fallback_configured: true, executed_at: '2026-06-25T11:00:00Z', verified_at: '2026-06-25T23:40:00Z' },
  { id: 3, migration_id: 'MIG-003', hook_name: 'useTenderIntelligence', source_type: 'hybrid', table_target: 'tender_intelligence', migration_status: 'verified', before_state: 'hybrid Supabase+fallback', after_state: 'LIVE: Supabase rows confirmed active', fallback_configured: true, executed_at: '2026-06-25T12:00:00Z', verified_at: '2026-06-25T23:40:00Z' },
  { id: 4, migration_id: 'MIG-004', hook_name: 'useGrowthEngine', source_type: 'hybrid', table_target: 'growth_kpis', migration_status: 'verified', before_state: 'hybrid Supabase+fallback', after_state: 'LIVE: Supabase rows confirmed active', fallback_configured: true, executed_at: '2026-06-25T13:00:00Z', verified_at: '2026-06-25T23:40:00Z' },
  { id: 5, migration_id: 'MIG-005', hook_name: 'useODSKEDashboard', source_type: 'hybrid', table_target: 'kos_odske_dashboard', migration_status: 'verified', before_state: 'hybrid Supabase+fallback', after_state: 'LIVE: Supabase rows confirmed active', fallback_configured: true, executed_at: '2026-06-25T14:00:00Z', verified_at: '2026-06-25T23:40:00Z' },
  { id: 6, migration_id: 'MIG-006', hook_name: 'useAOAMI', source_type: 'mock', table_target: 'kos_odske_knowledge_regulatory', migration_status: 'verified', before_state: 'mock-only 0% live', after_state: 'LIVE: Supabase connection verified, 85 rows, fallback mock preserved', fallback_configured: true, executed_at: '2026-06-25T23:30:00Z', verified_at: '2026-06-25T23:40:00Z' },
  { id: 7, migration_id: 'MIG-007', hook_name: 'useAfricaObservatories', source_type: 'mock', table_target: 'sector_observatories', migration_status: 'verified', before_state: 'mock-only', after_state: 'LIVE: Supabase 8 sectors, fallback mock preserved', fallback_configured: true, executed_at: '2026-06-25T23:30:00Z', verified_at: '2026-06-25T23:40:00Z' },
  { id: 8, migration_id: 'MIG-008', hook_name: 'useBoardAdvisories', source_type: 'mock', table_target: 'board_advisories', migration_status: 'verified', before_state: 'mock-only', after_state: 'LIVE: Supabase 6 advisories, fallback mock preserved', fallback_configured: true, executed_at: '2026-06-25T23:30:00Z', verified_at: '2026-06-25T23:40:00Z' },
  { id: 9, migration_id: 'MIG-009', hook_name: 'useFinancialAnalyses', source_type: 'mock', table_target: 'financial_analyses', migration_status: 'verified', before_state: 'mock-only', after_state: 'LIVE: Supabase 8 analyses, fallback mock preserved', fallback_configured: true, executed_at: '2026-06-25T23:30:00Z', verified_at: '2026-06-25T23:40:00Z' },
  { id: 10, migration_id: 'MIG-010', hook_name: 'useGlobalSearch', source_type: 'mock', table_target: 'rag_documents', migration_status: 'verified', before_state: 'mock-only 100%', after_state: 'LIVE: hybrid RAG+local, 100 docs Supabase, badge LIVE', fallback_configured: true, executed_at: '2026-06-25T23:35:00Z', verified_at: '2026-06-25T23:40:00Z' },
];

export const CAS_ACTIONS_MOCK: cASAction[] = [
  // ─── Actions exécutées (Blocs 6-9) ───
  { id: 1, action_id: 'ACT-FUSION-YT', gap_id: 'GAP-011', action_type: 'INFRA', criticality: 'P1', description: 'Fusionner 6 fonctions YouTube en 1 moteur kos-youtube-engine. 60% code dupliqué OAuth/Publisher.', system_impacted: 'supabase_functions', technical_steps: '1)Extraire OAuth shared 2)Router actions (oauth/publish/analytics) 3)Deployer 4)Basculer frontend 5)Deprecier 5 anciennes', risks: 'Regression OAuth; Perte tokens refresh', expected_result: '1 moteur YouTube unifié. 5 slots libérés (6→1).', associated_kpi: 'edge_functions_count: 101→96', horizon: 'J+7', status: 'planned', created_at: '2026-06-25T23:50:00Z' },
  { id: 2, action_id: 'ACT-FUSION-RAG', gap_id: 'GAP-012', action_type: 'INFRA', criticality: 'P1', description: 'Fusionner 3 fonctions RAG en kos-rag-engine unifié', system_impacted: 'supabase_functions', technical_steps: '1)Unifier generate/single + generate/batch + search 2)Deployer 3)Basculer 4)Deprecier', risks: 'Perte vectorielle; Regression search', expected_result: '1 moteur RAG. 2 slots libérés (3→1).', associated_kpi: 'edge_functions_count: 101→94', horizon: 'J+7', status: 'planned', created_at: '2026-06-25T23:50:00Z' },
  { id: 3, action_id: 'ACT-FUSION-EMAIL', gap_id: 'GAP-013', action_type: 'INFRA', criticality: 'P1', description: 'Fusionner fonctions email en kos-email-engine', system_impacted: 'supabase_functions', technical_steps: '1)Unifier welcome/scheduled/funnel 2)Deployer 3)Basculer', risks: 'Perte templates; Regression envoi', expected_result: '1 moteur email. 2 slots libérés (3→1).', associated_kpi: 'edge_functions_count: 101→92', horizon: 'J+7', status: 'planned', created_at: '2026-06-25T23:50:00Z' },
  { id: 4, action_id: 'ACT-FUSION-ADMIN', gap_id: 'GAP-019', action_type: 'INFRA', criticality: 'P0', description: 'Fusionner 4 fonctions admin en kos-admin-engine', system_impacted: 'supabase_functions', technical_steps: '1)Unifier auth+verify+change-pwd+notifications 2)Deployer 3)Basculer', risks: 'Sécurité auth; Verrouillage admin', expected_result: '1 moteur admin. 3 slots libérés (4→1).', associated_kpi: 'edge_functions_count: 101→89', horizon: 'J+30', status: 'planned', created_at: '2026-06-25T23:50:00Z' },
  // ─── Actions legacy (planifiées avant exécution) ───
  { id: 5, action_id: 'ACT-006', gap_id: 'GAP-016', action_type: 'COMPLIANCE', criticality: 'P1', description: 'Étendre le Provenance Log à tous les flux de données (hooks)', system_impacted: 'Audit Big Four, Due Diligence', technical_steps: '1) Ajouter colonne source_type à provenance_log\n2) Logger chaque fetch hook\n3) Générer rapport de couverture\n4) Valider', risks: 'Volume de logs important', expected_result: '100% des flux de données tracés', associated_kpi: 'bigfour_score', horizon: 'J+30', status: 'planned', created_at: '2026-06-25T23:00:00Z' },
  { id: 6, action_id: 'ACT-007', gap_id: 'GAP-014', action_type: 'COMPLIANCE', criticality: 'P1', description: 'Unifier les logs ISO 27001 dans une table unique kos_audit_trail', system_impacted: 'Audit ISO 27001, Certification', technical_steps: '1) Créer kos_audit_trail\n2) Migrer logs depuis 5 tables\n3) Implémenter écriture unifiée\n4) Générer rapports ISO', risks: 'Perte de logs si migration échoue', expected_result: 'Piste d\'audit ISO 27001 complète', associated_kpi: 'iso_score', horizon: 'J+30', status: 'planned', created_at: '2026-06-25T23:00:00Z' },
  { id: 7, action_id: 'ACT-008', gap_id: 'GAP-020', action_type: 'COMPLIANCE', criticality: 'P1', description: 'Créer le mécanisme de preuve automatique des KPI', system_impacted: 'Audit Big Four, Certification ISO', technical_steps: '1) Associer chaque KPI à une requête SQL vérifiable\n2) Créer vue matérialisée kos_kpi_proof\n3) Générer rapport automatique\n4) Signature horodatée', risks: 'Complexité des requêtes de preuve', expected_result: '100% des KPI prouvables automatiquement', associated_kpi: 'bigfour_score', horizon: 'J+90', status: 'planned', created_at: '2026-06-25T23:00:00Z' },
  { id: 8, action_id: 'ACT-009', gap_id: 'GAP-015', action_type: 'ARCHITECTURE', criticality: 'P2', description: 'Refactorer les hooks multi-responsabilité en services dédiés', system_impacted: 'Maintenabilité, Testabilité', technical_steps: '1) Identifier hooks >500 lignes\n2) Extraire logique métier vers services/\n3) Hooks ne gardent que le state management\n4) Tests unitaires', risks: 'Régression fonctionnelle si extraction incorrecte', expected_result: 'Architecture clean, hooks <200 lignes', associated_kpi: 'bigfour_score', horizon: 'J+90', status: 'planned', created_at: '2026-06-25T23:00:00Z' },
  { id: 9, action_id: 'ACT-010', gap_id: 'GAP-006', action_type: 'DATA', criticality: 'P2', description: 'Seeder les tables vides avec données de démonstration validées', system_impacted: 'Formations, Certifications, Webhooks', technical_steps: '1) Créer seeds validées pour chaque table vide\n2) Insérer avec provenance=KOS-CAS\n3) Logger dans migration_log', risks: 'Données seed non représentatives du réel', expected_result: '0 table vide restante', associated_kpi: 'tables_active', horizon: 'J+90', status: 'planned', created_at: '2026-06-25T23:00:00Z' },
];

export const CAS_COMPLIANCE_IMPACT_MOCK: complianceImpact[] = [
  { id: 1, action_id: 'ACT-FUSION-YT', iso_27001_impact: 'low', governance_impact: 'low', traceability_level: 'full', compliance_notes: 'Fusion YouTube — pas d\'impact données, traçabilité conservée. Clause ISO A.14.2.1 (secure development).' },
  { id: 2, action_id: 'ACT-FUSION-RAG', iso_27001_impact: 'low', governance_impact: 'low', traceability_level: 'full', compliance_notes: 'Fusion RAG — embeddings conservés, pas de perte vectorielle. Clause A.12.7.' },
  { id: 3, action_id: 'ACT-FUSION-EMAIL', iso_27001_impact: 'medium', governance_impact: 'low', traceability_level: 'full', compliance_notes: 'Fusion email — sensible, impacte communications clients. Clause A.18.1.3 (privacy).' },
  { id: 4, action_id: 'ACT-FUSION-ADMIN', iso_27001_impact: 'high', governance_impact: 'high', traceability_level: 'full', compliance_notes: 'Fusion admin — critique sécurité. Clauses A.9.1.2, A.9.2.3, A.12.4.1. Vérification auth OWASP requise.' },
  // Après exécution Blocs 6-9
  { id: 5, action_id: 'MIG-006', iso_27001_impact: 'low', governance_impact: 'low', traceability_level: 'full', compliance_notes: 'Migration useAOAMI vérifiée — 85 lignes Supabase. Clause A.12.7. Audit trail complet.' },
  { id: 6, action_id: 'MIG-007', iso_27001_impact: 'low', governance_impact: 'low', traceability_level: 'full', compliance_notes: 'Migration useAfricaObservatories vérifiée — 8 secteurs Supabase. Clause A.12.7.' },
  { id: 7, action_id: 'MIG-008', iso_27001_impact: 'low', governance_impact: 'low', traceability_level: 'full', compliance_notes: 'Migration useBoardAdvisories vérifiée — 6 advisories. Clause A.12.7.' },
  { id: 8, action_id: 'MIG-009', iso_27001_impact: 'low', governance_impact: 'low', traceability_level: 'full', compliance_notes: 'Migration useFinancialAnalyses vérifiée — 8 analyses. Clause A.12.7.' },
  { id: 9, action_id: 'MIG-010', iso_27001_impact: 'medium', governance_impact: 'low', traceability_level: 'full', compliance_notes: 'Migration useGlobalSearch vérifiée — RAG hybride. 100 docs Supabase. Clause A.12.4.1 (logging).' },
  { id: 10, action_id: 'ACT-006', iso_27001_impact: 'high', governance_impact: 'medium', traceability_level: 'full', compliance_notes: 'Extension provenance — critique ISO 27001 A.12.4 (logging et monitoring)' },
  { id: 11, action_id: 'ACT-007', iso_27001_impact: 'high', governance_impact: 'high', traceability_level: 'full', compliance_notes: 'Audit trail unifié — requis ISO 27001 A.12.4.1, A.12.4.2, A.12.4.3' },
  { id: 12, action_id: 'ACT-008', iso_27001_impact: 'high', governance_impact: 'high', traceability_level: 'full', compliance_notes: 'Preuve KPI automatique — requis Big Four ISAE 3402 / SOC 2 Type II' },
];

export const CAS_SYSTEM_HEALTH_MOCK: cASSystemHealth = {
  total_gaps: 20,
  gaps_resolved: 4,
  p0_blockers: 2,
  p1_degraded: 8,
  p2_needs_optim: 7,
  hooks_live_pct: 55,
  hooks_hybrid_pct: 29,
  hooks_mock_only_pct: 16,
  total_hooks: 182,
  edge_functions_active: 101,
  edge_functions_limit: 250,
  edge_functions_pct: 40,
  migrations_completed: 10,
  migrations_verified: 10,
  migrations_pending: 0,
  tables_active: 342,
  tables_empty: 9,
  iso_score: 78,
  bigfour_score: 75,
  actions_planned: 9,
  actions_in_progress: 0,
  actions_completed: 0,
};





