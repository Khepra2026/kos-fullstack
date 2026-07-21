// ═══════════════════════════════════════════════════════════════════
// KOS REGULATOR SLA MONITOR™ v1.1 — Edge Function
// Équivalent Datadog : avg(last_1m):avg:custom.regulator.to.live > 60
// SLA Big Four : BCEAO/COBAC/OHADA -> Site Live < 60 secondes
// ═══════════════════════════════════════════════════════════════════
//
// Endpoints:
//   GET  /                        → Health check + latest latency summary
//   GET  /metrics                 → Métriques format Datadog-style
//   GET  /violations              → Liste des violations SLA (params: regulator, since, limit)
//   POST /check                   → Déclenche manuellement un check SLA + alerting
//   GET  /dashboard               → Résumé dashboard Big Four (latence, SLA rate, violations)
//   POST /push-datadog            → Push manuel des métriques vers Datadog (fallback SQL)
//
// ═══════════════════════════════════════════════════════════════════

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const SLACK_WEBHOOK_URL = Deno.env.get("SLACK_WEBHOOK_URL") ?? "";
const DATADOG_API_KEY = Deno.env.get("DATADOG_API_KEY") ?? "";

const SLA_THRESHOLD_MS = 60000; // 60 secondes — SLA Big Four

// Types
interface LatencyMetric {
  regulator: string;
  avg_latency_ms: number;
  max_latency_ms: number;
  changes_detected: number;
  sla_violations: number;
  sla_healthy: boolean;
  window: string;
  timestamp: string;
}

function logError(context: string, err: unknown) {
  console.error(`[kos-regulator-sla-monitor] ${context}:`, err);
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

// ═══════════════════════════════════════════════════════════════════
// GET /metrics — Format Datadog-style custom metrics
// ═══════════════════════════════════════════════════════════════════
async function getMetrics(
  supabase: ReturnType<typeof createClient>,
  _params: URLSearchParams
): Promise<Response> {
  // Try the RPC first
  const { data: rpcData, error: rpcError } = await supabase.rpc("check_regulator_sla");

  // Query regulator_feed_log for the last 5 minutes of metrics
  const { data: logs, error: logsError } = await supabase
    .from("regulator_feed_log")
    .select("regulator_name, total_latency_ms, content_changed, sla_violation, checked_at, step_latencies")
    .gte("checked_at", new Date(Date.now() - 5 * 60 * 1000).toISOString())
    .order("checked_at", { ascending: false })
    .limit(100);

  if (logsError) {
    logError("regulator_feed_log query", logsError);
  }

  // Build metrics in Datadog style
  const metrics: LatencyMetric[] = [];
  const regulatorMap = new Map<string, {
    latencies: number[];
    changes: number;
    violations: number;
    steps: unknown[];
    lastChecked: string | null;
  }>();

  for (const log of logs ?? []) {
    const name = log.regulator_name;
    if (!regulatorMap.has(name)) {
      regulatorMap.set(name, { latencies: [], changes: 0, violations: 0, steps: [], lastChecked: null });
    }
    const entry = regulatorMap.get(name)!;
    if (log.total_latency_ms != null && log.total_latency_ms > 0) {
      entry.latencies.push(log.total_latency_ms);
    }
    if (log.content_changed) entry.changes++;
    if (log.sla_violation) entry.violations++;
    if (log.step_latencies) entry.steps.push(log.step_latencies);
    if (!entry.lastChecked) entry.lastChecked = log.checked_at;
  }

  for (const [regulator, stats] of regulatorMap) {
    const avg = stats.latencies.length > 0
      ? Math.round(stats.latencies.reduce((a, b) => a + b, 0) / stats.latencies.length)
      : 0;
    const max = stats.latencies.length > 0
      ? Math.max(...stats.latencies)
      : 0;

    metrics.push({
      regulator,
      avg_latency_ms: avg,
      max_latency_ms: max,
      changes_detected: stats.changes,
      sla_violations: stats.violations,
      sla_healthy: avg <= SLA_THRESHOLD_MS,
      window: "5m",
      timestamp: new Date().toISOString(),
    });
  }

  return jsonResponse({
    service: "kos-regulator-sla-monitor",
    version: "1.1",
    metrics,
    rpc_available: !rpcError,
    datadog_equivalent: {
      monitor_name: "BCEAO -> Site Live <60s",
      query: "avg(last_1m):avg:custom.regulator.to.live{regulator:bceao} > 60",
      threshold_ms: SLA_THRESHOLD_MS,
      trigger: metrics.filter((m) => !m.sla_healthy).map((m) => m.regulator),
    },
    generated_at: new Date().toISOString(),
  });
}

// ═══════════════════════════════════════════════════════════════════
// GET /violations — Liste des violations SLA tracées
// ═══════════════════════════════════════════════════════════════════
async function getViolations(
  supabase: ReturnType<typeof createClient>,
  params: URLSearchParams
): Promise<Response> {
  const regulator = params.get("regulator");
  const since = params.get("since") ?? "24h";
  const limit = Math.min(parseInt(params.get("limit") ?? "20"), 100);

  const sinceDate = since.endsWith("h")
    ? new Date(Date.now() - parseInt(since) * 3600 * 1000).toISOString()
    : since.endsWith("d")
    ? new Date(Date.now() - parseInt(since) * 86400 * 1000).toISOString()
    : new Date(Date.now() - 24 * 3600 * 1000).toISOString();

  let query = supabase
    .from("regulator_sla_violations")
    .select("*")
    .gte("created_at", sinceDate)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (regulator) {
    query = query.eq("regulator_name", regulator.toUpperCase());
  }

  const { data, error } = await query;

  if (error) {
    logError("regulator_sla_violations query", error);
    return jsonResponse(
      { error: "Failed to query violations", detail: error.message },
      500
    );
  }

  const violations = (data ?? []).map((v: Record<string, unknown>) => ({
    id: v.id,
    regulator_name: v.regulator_name,
    latency_seconds: typeof v.latency_seconds === 'number' ? v.latency_seconds : Math.round((v.latency_ms as number ?? 0) / 1000),
    severity: (v.severity as string) ?? "warning",
    steps: v.steps ?? {},
    alert_sent: v.alert_sent ?? false,
    acknowledged: v.acknowledged_at != null,
    created_at: v.created_at,
  }));

  return jsonResponse({
    violations,
    total: violations.length,
    window: since,
    generated_at: new Date().toISOString(),
  });
}

// ═══════════════════════════════════════════════════════════════════
// POST /check — Déclenche manuellement un check SLA
// ═══════════════════════════════════════════════════════════════════
async function manualCheck(
  supabase: ReturnType<typeof createClient>
): Promise<Response> {
  const { data, error } = await supabase.rpc("check_regulator_sla");

  if (error) {
    logError("manual check_regulator_sla", error);
    return jsonResponse(
      { error: "SLA check failed — is the migration (20260705b_regulator_sla_monitor.sql) executed?", detail: error.message },
      500
    );
  }

  const results = data ?? [];
  const violationsFound = results.filter((r: Record<string, unknown>) =>
    r.violation_count && (r.violation_count as number) > 0
  );

  return jsonResponse({
    check_completed: true,
    regulators_checked: results.length,
    violations_found: violationsFound.length,
    results,
    generated_at: new Date().toISOString(),
  });
}

// ═══════════════════════════════════════════════════════════════════
// GET /dashboard — Dashboard Big Four résumé
// ═══════════════════════════════════════════════════════════════════
async function getDashboard(
  supabase: ReturnType<typeof createClient>
): Promise<Response> {
  const now = new Date();
  const twentyFourHAgo = new Date(now.getTime() - 24 * 3600 * 1000).toISOString();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 86400 * 1000).toISOString();

  // Stats 5 min from view
  const { data: stats5m, error: err5m } = await supabase
    .from("v_regulator_latency_5min")
    .select("*")
    .order("bucket", { ascending: false })
    .limit(20);

  // Violations 24h
  const { count: violations24h, error: err24h } = await supabase
    .from("regulator_sla_violations")
    .select("*", { count: "exact", head: true })
    .gte("created_at", twentyFourHAgo);

  // Violations 7j
  const { count: violations7d, error: err7d } = await supabase
    .from("regulator_sla_violations")
    .select("*", { count: "exact", head: true })
    .gte("created_at", sevenDaysAgo);

  // Last check per regulator
  const { data: lastChecks } = await supabase
    .from("regulator_feed")
    .select("name, last_check")
    .eq("is_active", true);

  // Last change per regulator
  const { data: lastChanges } = await supabase
    .from("regulator_feed_log")
    .select("regulator_name, checked_at")
    .eq("content_changed", true)
    .order("checked_at", { ascending: false })
    .limit(3);

  // Build per-regulator summary
  const regulatorNames = ["BCEAO", "COBAC", "OHADA", "GAFI"];
  const regulators = regulatorNames.map((name) => {
    const stat = (stats5m ?? []).find((s: Record<string, unknown>) => s.regulator_name === name);
    const lastCheck = (lastChecks ?? []).find((l: Record<string, unknown>) => l.name === name);
    const lastChange = (lastChanges ?? []).find((l: Record<string, unknown>) => l.regulator_name === name);

    const avgLat = stat && stat.avg_latency_ms != null
      ? Math.round(Number(stat.avg_latency_ms))
      : 0;
    const maxLat = stat && stat.max_latency_ms != null
      ? Math.round(Number(stat.max_latency_ms))
      : 0;
    const violations = stat && stat.sla_violations != null
      ? Number(stat.sla_violations)
      : 0;

    let status: "healthy" | "warning" | "critical" = "healthy";
    if (maxLat > 120000 || violations > 2) status = "critical";
    else if (maxLat > SLA_THRESHOLD_MS || violations > 0) status = "warning";

    return {
      name,
      status,
      avg_latency_5min_ms: avgLat,
      max_latency_5min_ms: maxLat,
      sla_violations_24h: violations,
      sla_rate_pct: 0,
      last_checked_at: lastCheck ? (lastCheck.last_check as string) : null,
      last_change_at: lastChange ? (lastChange.checked_at as string) : null,
    };
  });

  // Overall SLA health score
  const criticalCount = regulators.filter((r) => r.status === "critical").length;
  const warningCount = regulators.filter((r) => r.status === "warning").length;
  const overallScore = Math.max(100 - (criticalCount * 40) - (warningCount * 20), 0);

  return jsonResponse({
    regulators,
    overall_sla_health: overallScore,
    total_violations_24h: violations24h ?? 0,
    total_violations_7d: violations7d ?? 0,
    generated_at: now.toISOString(),
  });
}

// ═══════════════════════════════════════════════════════════════════
// POST /push-datadog — Push manuel fallback depuis Edge Function
// ═══════════════════════════════════════════════════════════════════
async function pushDatadog(
  supabase: ReturnType<typeof createClient>
): Promise<Response> {
  // 1. Lire la clé Datadog depuis monitoring_config (ou secret Edge)
  let ddApiKey = DATADOG_API_KEY;
  if (!ddApiKey) {
    const { data: cfg } = await supabase
      .from("monitoring_config")
      .select("value")
      .eq("key", "dd_api_key")
      .maybeSingle();
    ddApiKey = cfg?.value ?? "";
  }

  if (!ddApiKey) {
    return jsonResponse({
      error: "Datadog API key not configured",
      hint: "Set DATADOG_API_KEY in Edge Function secrets or insert into monitoring_config(key='dd_api_key')",
    }, 400);
  }

  // 2. Récupérer les dernières métriques
  const { data: logs, error } = await supabase
    .from("regulator_feed_log")
    .select("regulator_name, total_latency_ms, checked_at, content_changed")
    .gte("checked_at", new Date(Date.now() - 10 * 60 * 1000).toISOString())
    .order("checked_at", { ascending: false });

  if (error) {
    logError("push-datadog query", error);
    return jsonResponse({ error: "DB query failed", detail: error.message }, 500);
  }

  // 3. Agréger par régulateur (dernier log)
  const latestByRegulator = new Map<string, typeof logs[0]>();
  for (const log of logs ?? []) {
    if (!latestByRegulator.has(log.regulator_name)) {
      latestByRegulator.set(log.regulator_name, log);
    }
  }

  const series: unknown[] = [];
  const nowEpoch = Math.floor(Date.now() / 1000);

  for (const [name, log] of latestByRegulator) {
    const latencySec = Math.round((log.total_latency_ms ?? 0) / 1000);
    const lastCheckEpoch = log.checked_at
      ? Math.floor(new Date(log.checked_at).getTime() / 1000)
      : nowEpoch;
    const delta = nowEpoch - lastCheckEpoch;

    series.push({
      metric: "custom.regulator.to.live",
      points: [[nowEpoch, delta]],
      tags: [`regulator:${name}`],
      type: "gauge",
      interval: 60,
    });

    series.push({
      metric: "custom.regulator.total_latency_ms",
      points: [[nowEpoch, log.total_latency_ms ?? 0]],
      tags: [`regulator:${name}`],
      type: "gauge",
    });
  }

  // 4. Envoyer à Datadog
  const ddResponse = await fetch("https://api.datadoghq.com/api/v1/series", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "DD-API-KEY": ddApiKey,
    },
    body: JSON.stringify({ series }),
  });

  const ddBody = await ddResponse.text();

  if (!ddResponse.ok) {
    logError("datadog push", ddBody);
    return jsonResponse({
      error: "Datadog push failed",
      status: ddResponse.status,
      body: ddBody,
      series_count: series.length,
    }, 502);
  }

  return jsonResponse({
    pushed: true,
    series_count: series.length,
    regulators: Array.from(latestByRegulator.keys()),
    datadog_status: ddResponse.status,
    datadog_response: ddBody,
    generated_at: new Date().toISOString(),
  });
}

// ═══════════════════════════════════════════════════════════════════
// GET / — Health check + quick summary
// ═══════════════════════════════════════════════════════════════════
async function healthCheck(
  supabase: ReturnType<typeof createClient>
): Promise<Response> {
  const { data, error } = await supabase
    .from("regulator_feed_log")
    .select("regulator_name, total_latency_ms, sla_violation, checked_at")
    .gte("checked_at", new Date(Date.now() - 5 * 60 * 1000).toISOString())
    .order("checked_at", { ascending: false })
    .limit(20);

  // Vérifier si la migration SQL est exécutée
  const { data: feedCheck } = await supabase
    .from("regulator_feed")
    .select("name")
    .limit(1);

  return jsonResponse({
    status: "HEALTHY",
    service: "kos-regulator-sla-monitor",
    version: "1.1",
    sla_threshold_ms: SLA_THRESHOLD_MS,
    sla_threshold_seconds: SLA_THRESHOLD_MS / 1000,
    datadog_equivalent: "avg(last_1m):avg:custom.regulator.to.live{regulator:bceao} > 60",
    message: "SLA Big Four violé. @slack-khepra-ops",
    recent_checks: data?.length ?? 0,
    violations_5min: (data ?? []).filter((l: Record<string, unknown>) => l.sla_violation).length,
    db_connected: !error,
    migration_executed: (feedCheck ?? []).length > 0,
    slack_configured: SLACK_WEBHOOK_URL.length > 0,
    datadog_configured: DATADOG_API_KEY.length > 0,
    endpoints: {
      metrics: "/metrics?window=5m",
      violations: "/violations?regulator=BCEAO&since=24h&limit=20",
      check: "POST /check",
      dashboard: "/dashboard",
      push_datadog: "POST /push-datadog",
    },
    generated_at: new Date().toISOString(),
  });
}

// ═══════════════════════════════════════════════════════════════════
// MAIN ENTRYPOINT
// ═══════════════════════════════════════════════════════════════════
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  const url = new URL(req.url);
  const path = url.pathname;
  const params = url.searchParams;

  const authHeader = req.headers.get("Authorization") ?? "";
  const isServiceRole = SUPABASE_SERVICE_ROLE.length > 0 &&
    authHeader.includes(SUPABASE_SERVICE_ROLE.slice(0, 12));

  // POST /check and POST /push-datadog require service role
  if (req.method === "POST" && (path === "/check" || path === "/push-datadog") && !isServiceRole) {
    return jsonResponse({ error: "Unauthorized — requires service_role" }, 401);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
    auth: { persistSession: false },
  });

  try {
    if (path === "/metrics") {
      return await getMetrics(supabase, params);
    }

    if (path === "/violations") {
      return await getViolations(supabase, params);
    }

    if (path === "/dashboard") {
      return await getDashboard(supabase);
    }

    if (req.method === "POST" && path === "/check") {
      return await manualCheck(supabase);
    }

    if (req.method === "POST" && path === "/push-datadog") {
      return await pushDatadog(supabase);
    }

    return await healthCheck(supabase);
  } catch (err) {
    logError("handler", err);
    return jsonResponse(
      {
        error: "Internal server error",
        detail: err instanceof Error ? err.message : "Unknown error",
      },
      500
    );
  }
});
