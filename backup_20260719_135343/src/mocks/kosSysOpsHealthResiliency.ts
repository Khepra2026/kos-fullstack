// KOS SysOps Health & Resiliency Command™ — Données Mock Big Four SRE
// Format: [timestamp, component, detected_issue, resolution_strategy, sandbox_test_status, deployment_result]

export const microservicesHealth = [
  { id: "ms-01", name: "kos-api-gateway", type: "gateway", endpoint: "/health", status: "healthy", latency_ms: 12, uptime_pct: 99.997, memory_mb: 128, cpu_pct: 18, restarts_24h: 0, protocol: "HTTP/3", version: "v3.7.2" },
  { id: "ms-02", name: "kos-automaton-engine", type: "compute", endpoint: "/health", status: "healthy", latency_ms: 45, uptime_pct: 99.989, memory_mb: 512, cpu_pct: 42, restarts_24h: 0, protocol: "WebSocket", version: "v4.2.1" },
  { id: "ms-03", name: "kos-knowledge-graph", type: "database", endpoint: "/health", status: "degraded", latency_ms: 187, uptime_pct: 99.942, memory_mb: 2048, cpu_pct: 67, restarts_24h: 2, protocol: "gRPC", version: "v2.8.4" },
  { id: "ms-04", name: "kos-rag-semantic-search", type: "compute", endpoint: "/health", status: "healthy", latency_ms: 89, uptime_pct: 99.978, memory_mb: 1024, cpu_pct: 55, restarts_24h: 0, protocol: "HTTP/2", version: "v5.1.0" },
  { id: "ms-05", name: "kos-lead-scoring", type: "compute", endpoint: "/health", status: "healthy", latency_ms: 23, uptime_pct: 99.995, memory_mb: 256, cpu_pct: 22, restarts_24h: 0, protocol: "HTTP/2", version: "v3.4.1" },
  { id: "ms-06", name: "kos-regulatory-intelligence", type: "compute", endpoint: "/health", status: "healthy", latency_ms: 34, uptime_pct: 99.991, memory_mb: 384, cpu_pct: 31, restarts_24h: 0, protocol: "HTTP/3", version: "v4.8.2" },
  { id: "ms-07", name: "kos-seo-audit-crawler", type: "worker", endpoint: "/health", status: "healthy", latency_ms: 156, uptime_pct: 99.960, memory_mb: 768, cpu_pct: 78, restarts_24h: 1, protocol: "HTTP/2", version: "v3.9.0" },
  { id: "ms-08", name: "kos-youtube-publisher", type: "gateway", endpoint: "/health", status: "healthy", latency_ms: 18, uptime_pct: 99.998, memory_mb: 96, cpu_pct: 12, restarts_24h: 0, protocol: "HTTP/3", version: "v2.5.3" },
  { id: "ms-09", name: "kos-auth-service", type: "auth", endpoint: "/health", status: "healthy", latency_ms: 8, uptime_pct: 99.999, memory_mb: 64, cpu_pct: 9, restarts_24h: 0, protocol: "HTTP/2", version: "v6.1.0" },
  { id: "ms-10", name: "kos-supabase-bridge", type: "gateway", endpoint: "/health", status: "healthy", latency_ms: 15, uptime_pct: 99.996, memory_mb: 192, cpu_pct: 24, restarts_24h: 0, protocol: "HTTP/3", version: "v3.2.1" },
  { id: "ms-11", name: "kos-email-funnel", type: "worker", endpoint: "/health", status: "healthy", latency_ms: 62, uptime_pct: 99.972, memory_mb: 320, cpu_pct: 38, restarts_24h: 0, protocol: "SMTP+TLS", version: "v2.7.0" },
  { id: "ms-12", name: "kos-social-content-generator", type: "worker", endpoint: "/health", status: "healthy", latency_ms: 41, uptime_pct: 99.985, memory_mb: 288, cpu_pct: 29, restarts_24h: 0, protocol: "HTTP/2", version: "v3.1.4" },
];

export const latencyHeatmap = {
  time_slots: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  services: ["API Gateway", "Automaton", "Knowledge Graph", "RAG Search", "SEO Crawler", "Email Funnel"],
  matrix: [
    [8, 10, 12, 15, 11, 9],
    [32, 38, 45, 52, 44, 35],
    [142, 156, 187, 198, 165, 148],
    [72, 81, 89, 95, 85, 76],
    [128, 144, 156, 168, 149, 132],
    [48, 55, 62, 68, 58, 50],
  ],
  threshold_ms: 150,
  alerts_triggered: 3,
};

export const memoryLeakDetection = [
  { id: "mem-01", service: "kos-knowledge-graph", pattern: "gradual_growth", current_mb: 2048, baseline_mb: 512, growth_rate_mb_h: 4.2, detected_at: "2026-06-19T14:22:00Z", severity: "high", suspected_culprit: "Graph cache non évacué après query batch", heap_dump_available: true, sandbox_reproduced: true },
  { id: "mem-02", service: "kos-seo-audit-crawler", pattern: "spike_leak", current_mb: 768, baseline_mb: 256, growth_rate_mb_h: 12.8, detected_at: "2026-06-18T09:45:00Z", severity: "medium", suspected_culprit: "DOM parser retention sur pages lourdes", heap_dump_available: true, sandbox_reproduced: true },
  { id: "mem-03", service: "kos-email-funnel", pattern: "periodic", current_mb: 320, baseline_mb: 192, growth_rate_mb_h: 1.1, detected_at: "2026-06-17T22:10:00Z", severity: "low", suspected_culprit: "SMTP connection pool non libéré après batch", heap_dump_available: false, sandbox_reproduced: false },
];

export const cveScanResults = [
  { id: "CVE-2026-28412", package_name: "deno_runtime", current_version: "2.1.4", fixed_version: "2.1.5", severity: "critical", cvss_score: 9.8, description: "Remote Code Execution via crafted WebSocket frame in Deno HTTP server", affected_services: ["kos-automaton-engine", "kos-rag-semantic-search"], exploit_public: true, patch_available: true, cve_age_days: 2, sla_hours: 4 },
  { id: "CVE-2026-27189", package_name: "postgres_wire", current_version: "0.14.2", fixed_version: "0.14.3", severity: "high", cvss_score: 8.2, description: "SQL injection vector via malformed COPY protocol message", affected_services: ["kos-knowledge-graph", "kos-lead-scoring"], exploit_public: false, patch_available: true, cve_age_days: 5, sla_hours: 24 },
  { id: "CVE-2026-26341", package_name: "tokio_tungstenite", current_version: "0.24.0", fixed_version: "0.24.2", severity: "high", cvss_score: 7.5, description: "Denial of Service via WebSocket frame fragmentation overflow (CWE-770)", affected_services: ["kos-api-gateway", "kos-social-content-generator"], exploit_public: true, patch_available: true, cve_age_days: 8, sla_hours: 8 },
  { id: "CVE-2026-25673", package_name: "rustls_acme", current_version: "0.9.1", fixed_version: "0.9.3", severity: "medium", cvss_score: 6.1, description: "TLS certificate validation bypass during ACME renewal race condition", affected_services: ["kos-api-gateway", "kos-youtube-publisher"], exploit_public: false, patch_available: true, cve_age_days: 12, sla_hours: 72 },
  { id: "CVE-2026-24891", package_name: "serde_json", current_version: "1.0.128", fixed_version: "1.0.130", severity: "low", cvss_score: 4.3, description: "Stack overflow in deeply nested JSON deserialization (max_depth bypass)", affected_services: ["kos-regulatory-intelligence", "kos-supabase-bridge"], exploit_public: false, patch_available: true, cve_age_days: 15, sla_hours: 168 },
];

export const sandboxEnvironments = [
  { id: "sbx-01", name: "sandbox-kg-memory-fix", base_image: "kab/kos-runtime:v3.7.2-immutable", status: "active", created_at: "2026-06-20T06:15:00Z", patch_count: 3, services_cloned: ["kos-knowledge-graph", "kos-seo-audit-crawler"], resource_profile: "t3.2xlarge", isolation_level: "full_network_airgap", ttl_hours: 48 },
  { id: "sbx-02", name: "sandbox-cve-patch-rollup", base_image: "kab/kos-runtime:v3.7.2-immutable", status: "testing", created_at: "2026-06-20T08:30:00Z", patch_count: 5, services_cloned: ["kos-automaton-engine", "kos-api-gateway", "kos-social-content-generator"], resource_profile: "t3.4xlarge", isolation_level: "full_network_airgap", ttl_hours: 24 },
  { id: "sbx-03", name: "sandbox-canary-kos-v3.8", base_image: "kab/kos-runtime:v3.8.0-beta", status: "deploying", created_at: "2026-06-20T10:00:00Z", patch_count: 12, services_cloned: ["ALL_SERVICES"], resource_profile: "t3.8xlarge", isolation_level: "full_network_airgap", ttl_hours: 72 },
];

export const generatedPatches = [
  { id: "patch-001", sandbox_id: "sbx-01", component: "kos-knowledge-graph", type: "memory_fix", files_changed: 3, lines_added: 47, lines_removed: 12, diff_summary: "Ajout TTL sur graph cache + evacuation post-query batch", language: "Rust", test_coverage_pct: 94, generated_by: "KOS Auto-Healing Engine v2", generated_at: "2026-06-20T07:22:00Z" },
  { id: "patch-002", sandbox_id: "sbx-01", component: "kos-seo-audit-crawler", type: "memory_fix", files_changed: 2, lines_added: 28, lines_removed: 5, diff_summary: "DOM parser cleanup après extraction + WeakRef sur nodes lourds", language: "Rust", test_coverage_pct: 91, generated_by: "KOS Auto-Healing Engine v2", generated_at: "2026-06-20T07:45:00Z" },
  { id: "patch-003", sandbox_id: "sbx-02", component: "kos-automaton-engine", type: "security_patch", files_changed: 1, lines_added: 3, lines_removed: 1, diff_summary: "Upgrade deno_runtime 2.1.4 → 2.1.5 (CVE-2026-28412)", language: "TOML", test_coverage_pct: 100, generated_by: "KOS CVE Auto-Patcher v1", generated_at: "2026-06-20T09:15:00Z" },
  { id: "patch-004", sandbox_id: "sbx-02", component: "kos-api-gateway", type: "security_patch", files_changed: 2, lines_added: 12, lines_removed: 4, diff_summary: "Upgrade tokio-tungstenite 0.24.0 → 0.24.2 + frame size limit (CVE-2026-26341)", language: "Rust", test_coverage_pct: 97, generated_by: "KOS CVE Auto-Patcher v1", generated_at: "2026-06-20T09:42:00Z" },
  { id: "patch-005", sandbox_id: "sbx-02", component: "kos-knowledge-graph", type: "security_patch", files_changed: 1, lines_added: 5, lines_removed: 2, diff_summary: "Upgrade postgres_wire 0.14.2 → 0.14.3 + prepared stmt validation (CVE-2026-27189)", language: "Rust", test_coverage_pct: 96, generated_by: "KOS CVE Auto-Patcher v1", generated_at: "2026-06-20T10:05:00Z" },
];

export const integrationTests = {
  suite_name: "KOS Full Integration Suite — Big Four SRE",
  total_tests: 487,
  passed: 478,
  failed: 6,
  skipped: 3,
  pass_rate_pct: 98.1,
  duration_seconds: 423,
  ran_at: "2026-06-20T11:30:00Z",
  categories: [
    { name: "API Contracts", total: 142, passed: 142, failed: 0, pass_rate: 100 },
    { name: "Data Integrity", total: 98, passed: 97, failed: 1, pass_rate: 99.0 },
    { name: "Security (OWASP)", total: 65, passed: 64, failed: 1, pass_rate: 98.5 },
    { name: "Performance Thresholds", total: 48, passed: 45, failed: 3, pass_rate: 93.8 },
    { name: "WebSocket Stability", total: 34, passed: 33, failed: 1, pass_rate: 97.1 },
    { name: "Edge Cases & Chaos", total: 52, passed: 51, failed: 0, pass_rate: 100 },
    { name: "Supabase Bridge", total: 48, passed: 46, failed: 0, pass_rate: 100 },
  ],
  failures: [
    { test_id: "INT-PERF-012", category: "Performance Thresholds", service: "kos-knowledge-graph", failure: "Latency >150ms sur query récursive depth=5", expected: "<150ms", actual: "187ms", sandbox_id: "sbx-01", fix_patch: "patch-001" },
    { test_id: "INT-PERF-018", category: "Performance Thresholds", service: "kos-seo-audit-crawler", failure: "Memory leak après crawl 500 pages (heap +312MB)", expected: "<+100MB", actual: "+312MB", sandbox_id: "sbx-01", fix_patch: "patch-002" },
    { test_id: "INT-PERF-023", category: "Performance Thresholds", service: "kos-email-funnel", failure: "SMTP pool non-libéré après 1000 emails (mem +128MB)", expected: "<+50MB", actual: "+128MB", sandbox_id: "sbx-01", fix_patch: null },
    { test_id: "INT-SEC-041", category: "Security (OWASP)", service: "kos-automaton-engine", failure: "CVE-2026-28412 exploit reproduit — RCE via WebSocket frame", expected: "blocked", actual: "exploited", sandbox_id: "sbx-02", fix_patch: "patch-003" },
    { test_id: "INT-DATA-077", category: "Data Integrity", service: "kos-knowledge-graph", failure: "SQL injection via COPY protocol sur postgres_wire 0.14.2", expected: "rejected", actual: "executed", sandbox_id: "sbx-02", fix_patch: "patch-005" },
    { test_id: "INT-WS-022", category: "WebSocket Stability", service: "kos-api-gateway", failure: "WS frame fragmentation overflow (CWE-770) >65K fragments", expected: "throttled", actual: "crash", sandbox_id: "sbx-02", fix_patch: "patch-004" },
  ],
};

export const regressionTests = {
  suite_name: "KOS Regression Suite — Pre-Deploy Gate",
  total_tests: 1245,
  passed: 1239,
  failed: 4,
  skipped: 2,
  pass_rate_pct: 99.5,
  duration_seconds: 891,
  ran_at: "2026-06-20T12:15:00Z",
  critical_paths: [
    { path: "Auth → API Gateway → Supabase Bridge", tests: 87, passed: 87, failed: 0, status: "pass" },
    { path: "Content → Studio Média → YouTube Publisher", tests: 64, passed: 64, failed: 0, status: "pass" },
    { path: "SEO → Crawler → RAG Search → Knowledge Graph", tests: 112, passed: 110, failed: 2, status: "warning" },
    { path: "Lead → Scoring → CRM → Email Funnel", tests: 78, passed: 78, failed: 0, status: "pass" },
    { path: "Regulatory → Intelligence → Compliance Engine", tests: 95, passed: 95, failed: 0, status: "pass" },
    { path: "Automaton → Orchestrator → Self-Healing", tests: 142, passed: 140, failed: 2, status: "warning" },
  ],
};

export const canaryDeployments = [
  { id: "canary-001", name: "Memory Leak Fix Rollup (patch-001 + patch-002)", sandbox_id: "sbx-01", target_services: ["kos-knowledge-graph", "kos-seo-audit-crawler"], strategy: "canary_10pct_180s", status: "completed", started_at: "2026-06-20T13:00:00Z", completed_at: "2026-06-20T13:14:00Z", canary_pct: 10, rollout_pct: 100, pre_metrics: { avg_latency_ms: 142, error_rate_pct: 0.08, memory_mb: 2456 }, post_metrics: { avg_latency_ms: 48, error_rate_pct: 0.02, memory_mb: 587 }, metric_deviation_pct: -66.2, auto_rollback: false, result: "success" },
  { id: "canary-002", name: "CVE Security Rollup (patches 003-005)", sandbox_id: "sbx-02", target_services: ["kos-automaton-engine", "kos-api-gateway", "kos-knowledge-graph"], strategy: "canary_5pct_180s", status: "monitoring", started_at: "2026-06-20T14:30:00Z", completed_at: null, canary_pct: 5, rollout_pct: 5, pre_metrics: { avg_latency_ms: 38, error_rate_pct: 0.03, memory_mb: 1892 }, post_metrics: { avg_latency_ms: 39, error_rate_pct: 0.03, memory_mb: 1898 }, metric_deviation_pct: 2.6, auto_rollback: false, result: "in_progress" },
  { id: "canary-003", name: "KOS Runtime v3.8.0-beta Full Upgrade", sandbox_id: "sbx-03", target_services: ["ALL_SERVICES"], strategy: "canary_1pct_180s", status: "rollback", started_at: "2026-06-20T12:00:00Z", completed_at: "2026-06-20T12:03:48Z", canary_pct: 1, rollout_pct: 1, pre_metrics: { avg_latency_ms: 42, error_rate_pct: 0.04, memory_mb: 4528 }, post_metrics: { avg_latency_ms: 89, error_rate_pct: 0.47, memory_mb: 6215 }, metric_deviation_pct: 111.9, auto_rollback: true, result: "rolled_back" },
];

export const rollbackHistory = [
  { id: "rb-001", canary_id: "canary-003", trigger: "LCP jumped +111%, error rate 0.47% above 0.1% threshold", detected_at: "2026-06-20T12:03:12Z", rollback_started: "2026-06-20T12:03:14Z", rollback_completed: "2026-06-20T12:03:48Z", strategy: "immutable_snapshot_restore", layers_reverted: 12, downtime_seconds: 0, data_integrity_verified: true, post_rollback_latency_ms: 43, post_rollback_error_pct: 0.04 },
  { id: "rb-002", canary_id: null, trigger: "Manual rollback requested by SRE Lead — regression test path SEO→RAG failed", detected_at: "2026-06-19T18:45:00Z", rollback_started: "2026-06-19T18:46:00Z", rollback_completed: "2026-06-19T18:46:38Z", strategy: "git_revert_to_tag_v3.7.1", layers_reverted: 8, downtime_seconds: 0, data_integrity_verified: true, post_rollback_latency_ms: 41, post_rollback_error_pct: 0.03 },
  { id: "rb-003", canary_id: null, trigger: "Automated rollback — canary 5% showed TTFB +35% (exceeds 5% threshold)", detected_at: "2026-06-18T09:12:00Z", rollback_started: "2026-06-18T09:12:05Z", rollback_completed: "2026-06-18T09:12:52Z", strategy: "immutable_snapshot_restore", layers_reverted: 15, downtime_seconds: 0, data_integrity_verified: true, post_rollback_latency_ms: 38, post_rollback_error_pct: 0.04 },
];

export const sysopsEventLog = [
  { timestamp: "2026-06-20T14:30:00Z", component: "kos-api-gateway", detected_issue: "CVE-2026-26341 — DoS via WebSocket fragmentation", resolution_strategy: "Generated patch-004: upgrade tokio-tungstenite + frame size limit", sandbox_test_status: "passed", deployment_result: "canary_5pct_180s — monitoring" },
  { timestamp: "2026-06-20T14:15:00Z", component: "kos-automaton-engine", detected_issue: "CVE-2026-28412 — RCE via WebSocket frame", resolution_strategy: "Generated patch-003: upgrade deno_runtime 2.1.4→2.1.5", sandbox_test_status: "passed", deployment_result: "canary_5pct_180s — monitoring" },
  { timestamp: "2026-06-20T13:14:00Z", component: "kos-knowledge-graph", detected_issue: "Memory leak — graph cache non évacué (+1536MB over 72h)", resolution_strategy: "Generated patch-001: TTL cache + evacuation post-batch", sandbox_test_status: "passed", deployment_result: "canary_10pct_180s → rollout 100% — success" },
  { timestamp: "2026-06-20T13:14:00Z", component: "kos-seo-audit-crawler", detected_issue: "Memory leak — DOM retention (+512MB sur crawl 500 pages)", resolution_strategy: "Generated patch-002: DOM cleanup + WeakRef", sandbox_test_status: "passed", deployment_result: "canary_10pct_180s → rollout 100% — success" },
  { timestamp: "2026-06-20T12:03:48Z", component: "ALL_SERVICES", detected_issue: "KOS v3.8.0-beta: LCP +111%, error rate 0.47% (threshold 0.1%)", resolution_strategy: "AUTO-ROLLBACK: immutable snapshot restore to v3.7.2", sandbox_test_status: "failed", deployment_result: "rolled_back — 0s downtime — 12 layers reverted" },
  { timestamp: "2026-06-20T11:30:00Z", component: "kos-knowledge-graph", detected_issue: "CVE-2026-27189 — SQL injection via COPY protocol", resolution_strategy: "Generated patch-005: upgrade postgres_wire + prepared stmt validation", sandbox_test_status: "passed", deployment_result: "canary_5pct_180s — monitoring" },
  { timestamp: "2026-06-20T10:00:00Z", component: "KOS Runtime v3.8.0", detected_issue: "Major version upgrade — 12 new features, 5 breaking changes", resolution_strategy: "Sandbox sbx-03 created: full cluster clone, 1245 regression tests queued", sandbox_test_status: "running", deployment_result: "pending — awaiting regression suite pass" },
  { timestamp: "2026-06-20T09:45:00Z", component: "kos-api-gateway", detected_issue: "CVE-2026-25673 — TLS bypass during ACME renewal (medium)", resolution_strategy: "Queued for patch-006: upgrade rustls-acme 0.9.1→0.9.3", sandbox_test_status: "pending", deployment_result: "scheduled — within 72h SLA" },
  { timestamp: "2026-06-20T06:15:00Z", component: "kos-knowledge-graph", detected_issue: "Latency spike detected: 45ms→187ms (threshold 150ms breached)", resolution_strategy: "Sandbox sbx-01 created: memory leak isolation + graph cache analysis", sandbox_test_status: "running", deployment_result: "canary-001 completed — success" },
  { timestamp: "2026-06-19T18:46:38Z", component: "kos-seo-audit-crawler", detected_issue: "Regression test INT-PERF-018 failed on SEO→RAG critical path", resolution_strategy: "Manual rollback to v3.7.1 via git tag — analysis queued", sandbox_test_status: "failed", deployment_result: "rolled_back — 0s downtime — 8 layers reverted" },
  { timestamp: "2026-06-19T22:10:00Z", component: "kos-email-funnel", detected_issue: "SMTP pool leak — +128MB after 1000 emails (low severity)", resolution_strategy: "Detected, sandbox reproduction failed, human SRE review requested", sandbox_test_status: "failed_repro", deployment_result: "deferred — low severity, no production impact" },
  { timestamp: "2026-06-18T09:12:52Z", component: "kos-rag-semantic-search", detected_issue: "Canary 5% showed TTFB +35% (exceeds 5% threshold, auto-rollback trigger)", resolution_strategy: "AUTO-ROLLBACK: immutable snapshot restore — 15 layers reverted", sandbox_test_status: "passed", deployment_result: "rolled_back — 0s downtime — root cause: embedding index rebuild regression" },
];

export const sysopsKPIs = {
  overall_health_score: 94.2,
  services_total: 12,
  services_healthy: 11,
  services_degraded: 1,
  services_critical: 0,
  avg_latency_ms: 48,
  avg_latency_trend: "↓12ms vs W25",
  total_endpoints_monitored: 36,
  cvss_critical_open: 1,
  cvss_high_open: 2,
  cvss_medium_open: 1,
  cvss_low_open: 1,
  mtbf_hours: 720,
  mttr_minutes: 3.2,
  uptime_30d_pct: 99.987,
  patches_generated_30d: 28,
  patches_deployed_30d: 26,
  sandboxes_active: 3,
  canaries_running: 1,
  rollbacks_30d: 3,
  zero_downtime_rate_pct: 100,
  sla_compliance_pct: 99.8,
  active_cves_total: 5,
  cve_sla_breach_risk: 1,
  regression_pass_rate_pct: 99.5,
  integration_pass_rate_pct: 98.1,
  avg_deploy_cycle_minutes: 14,
  observability_coverage_pct: 100,
  logs_ingested_per_sec: 4870,
  metrics_datapoints_per_min: 124000,
  traces_sampled_per_sec: 320,
};



