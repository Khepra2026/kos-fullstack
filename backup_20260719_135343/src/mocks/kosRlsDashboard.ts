export const rlsDashboardSummary = {
  totalTables: 487,
  rlsEnabled: 480,
  rlsDisabled: 7,
  rlsCoveragePct: 98.6,
  tablesWithPolicies: 312,
  rlsEnabledNoPolicies: 175,
  criticalTablesSecured: 3,
  criticalTablesTotal: 3,
  storageBucketsSecured: 2,
  storageBucketsTotal: 2,
  lastScanTimestamp: "2026-07-07T14:32:00Z",
  scanDurationMs: 1247,
};

export const criticalTablesStatus = [
  {
    table_name: "leads",
    rls_enabled: true,
    policy_count: 4,
    risk_level: "medium",
    policies: [
      { name: "Allow anonymous insert", command: "INSERT", using: null, with_check: "true" },
      { name: "Allow authenticated read", command: "SELECT", using: "admin only", with_check: null },
      { name: "Allow authenticated update", command: "UPDATE", using: "admin only", with_check: "admin only" },
      { name: "super_admin_can_delete_leads", command: "DELETE", using: "super_admin only", with_check: null },
    ],
    notes: "Insert anonyme nécessaire pour formulaires publics. DELETE super_admin uniquement.",
  },
  {
    table_name: "profiles",
    rls_enabled: true,
    policy_count: 5,
    risk_level: "low",
    policies: [
      { name: "Users can insert own profile", command: "INSERT", using: null, with_check: "auth.uid() = id" },
      { name: "Users can view own profile", command: "SELECT", using: "auth.uid() = id", with_check: null },
      { name: "org_members_can_view_profiles", command: "SELECT", using: "same organization", with_check: null },
      { name: "Users can update own profile", command: "UPDATE", using: "auth.uid() = id", with_check: "plan + role locked" },
      { name: "super_admin_can_delete_profiles", command: "DELETE", using: "super_admin only", with_check: null },
    ],
    notes: "Policies granulaires par organisation. DELETE réservé super_admin.",
  },
  {
    table_name: "organizations",
    rls_enabled: true,
    policy_count: 6,
    risk_level: "low",
    policies: [
      { name: "orgs_insert_owner", command: "INSERT", using: null, with_check: "auth.uid() = owner_id" },
      { name: "orgs_select_member", command: "SELECT", using: "owner or member", with_check: null },
      { name: "orgs_update_owner", command: "UPDATE", using: "auth.uid() = owner_id", with_check: null },
      { name: "super_admin_can_view_all_orgs", command: "SELECT", using: "super_admin only", with_check: null },
      { name: "super_admin_can_update_all_orgs", command: "UPDATE", using: "super_admin only", with_check: null },
      { name: "owner_and_super_admin_can_delete_org", command: "DELETE", using: "owner or super_admin", with_check: null },
    ],
    notes: "Protection complète. DELETE owner + super_admin. INSERT owner uniquement.",
  },
];

export const storageBucketsStatus = [
  {
    bucket_name: "admin-documents",
    public: false,
    policy_count: 4,
    policies: [
      { name: "admin_docs_select_admin_only", command: "SELECT" },
      { name: "admin_docs_insert_admin_only", command: "INSERT" },
      { name: "admin_docs_update_admin_only", command: "UPDATE" },
      { name: "admin_docs_delete_admin_only", command: "DELETE" },
    ],
  },
  {
    bucket_name: "kos-videos",
    public: true,
    policy_count: 4,
    policies: [
      { name: "videos_public_select", command: "SELECT" },
      { name: "videos_insert_admin_only", command: "INSERT" },
      { name: "videos_update_admin_only", command: "UPDATE" },
      { name: "videos_delete_admin_only", command: "DELETE" },
    ],
  },
];

export const allTablesSample = [
  { table_name: "leads", rls_enabled: true, policy_count: 4, risk: "medium" },
  { table_name: "profiles", rls_enabled: true, policy_count: 5, risk: "low" },
  { table_name: "organizations", rls_enabled: true, policy_count: 6, risk: "low" },
  { table_name: "subscriptions", rls_enabled: true, policy_count: 0, risk: "high" },
  { table_name: "api_keys", rls_enabled: true, policy_count: 0, risk: "critical" },
  { table_name: "organization_members", rls_enabled: true, policy_count: 3, risk: "low" },
  { table_name: "lead_scores", rls_enabled: false, policy_count: 0, risk: "critical" },
  { table_name: "proposals", rls_enabled: false, policy_count: 0, risk: "high" },
  { table_name: "contracts", rls_enabled: false, policy_count: 0, risk: "high" },
  { table_name: "downloads", rls_enabled: true, policy_count: 2, risk: "low" },
  { table_name: "certificates", rls_enabled: true, policy_count: 0, risk: "medium" },
  { table_name: "email_logs", rls_enabled: true, policy_count: 0, risk: "medium" },
  { table_name: "activity_logs", rls_enabled: true, policy_count: 0, risk: "medium" },
  { table_name: "admin_sessions", rls_enabled: true, policy_count: 2, risk: "low" },
  { table_name: "kos_agents", rls_enabled: false, policy_count: 0, risk: "high" },
  { table_name: "kos_documents", rls_enabled: true, policy_count: 0, risk: "medium" },
  { table_name: "rag_documents", rls_enabled: true, policy_count: 0, risk: "medium" },
  { table_name: "regulatory_sources", rls_enabled: true, policy_count: 0, risk: "medium" },
  { table_name: "tender_intelligence", rls_enabled: false, policy_count: 0, risk: "high" },
  { table_name: "risk_registers", rls_enabled: false, policy_count: 0, risk: "medium" },
];

export const rlsAuditTimeline = [
  { date: "2026-07-07 14:32", event: "Déploiement policies granulaires leads/profiles/organizations", findings: "5 nouvelles policies ajoutées. DELETE + org-based SELECT." },
  { date: "2026-07-07 14:35", event: "Sécurisation Storage buckets", findings: "8 policies storage.objects créées. admin-documents (admin only), kos-videos (public read)." },
  { date: "2026-07-07 14:30", event: "Déploiement kos-rls-dashboard Edge Function", findings: "Scan temps réel RLS + policy management API déployé." },
  { date: "2026-07-06 18:00", event: "Lockdown 7 tables sans RLS", findings: "RLS forcé + deny_all_default sur kos_brand_assets, kos_documents, kos_request_logs, etc." },
  { date: "2026-07-06 17:30", event: "Déploiement kos-rls-guardian v1", findings: "Edge Function de scan + auto-fix RLS. pg_cron job horaire activé." },
  { date: "2026-07-06 17:00", event: "Création fonctions SQL RLS", findings: "kos_force_rls_secure, kos_get_tables_without_rls, check_table_rls créées." },
];



