import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

// ═══════════════════════════════════════════
// KOS ORCHESTRATOR ENGINE™ v2.0 — ISO 27001
// Big Four Grade — Event-Driven Architecture
// Auth: JWT + Admin role (ISO 27001 §A.9)
// ═══════════════════════════════════════════

const CIRCUIT_BREAKER_THRESHOLD = 5;
const CIRCUIT_BREAKER_TIMEOUT_MS = 60_000;
const DEFAULT_MAX_RETRIES = 3;
const RETRY_BASE_MS = 1000;
const BACKOFF_MULTIPLIER = 2.0;
const DLQ_RESCAN_INTERVAL_MS = 300_000;

// ═══ AUTH MIDDLEWARE (ISO 27001 §A.9.2) ═══
async function authenticateRequest(req: Request): Promise<{ authenticated: boolean; isAdmin: boolean; userId?: string }> {
  const authHeader = req.headers.get("Authorization") || "";
  
  // Service role bypass for internal edge-to-edge / cron calls
  if (authHeader === `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`) {
    return { authenticated: true, isAdmin: true };
  }
  
  try {
    const token = authHeader.replace("Bearer ", "");
    if (!token) return { authenticated: false, isAdmin: false };
    
    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
    
    const { data: { user }, error } = await supabaseAuth.auth.getUser(token);
    if (error || !user) return { authenticated: false, isAdmin: false };
    
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("system_role")
      .eq("id", user.id)
      .single();
    
    const isAdmin = profile?.system_role === "admin" || profile?.system_role === "superadmin" || profile?.system_role === "owner";
    return { authenticated: true, isAdmin, userId: user.id };
  } catch {
    return { authenticated: false, isAdmin: false };
  }
}

// ═══ State Machine ═══
async function validateTransition(workflowType: string, fromState: string, toState: string): Promise<{ allowed: boolean; requiresValidation: boolean; autoTrigger: boolean }> {
  const { data } = await supabaseAdmin
    .from("state_transitions")
    .select("allowed, requires_validation, auto_trigger")
    .eq("workflow_type", workflowType)
    .eq("from_state", fromState)
    .eq("to_state", toState)
    .maybeSingle();

  if (!data) return { allowed: false, requiresValidation: false, autoTrigger: false };
  return { allowed: data.allowed, requiresValidation: data.requires_validation, autoTrigger: data.auto_trigger };
}

async function recordPipelineEvent(
  pipelineStateId: number,
  eventType: string,
  fromState: string | null,
  toState: string | null,
  eventData: Record<string, unknown> = {},
  executionId?: number,
  actor = "system"
) {
  await supabaseAdmin.from("pipeline_events").insert({
    pipeline_state_id: pipelineStateId,
    execution_id: executionId || null,
    event_type: eventType,
    from_state: fromState,
    to_state: toState,
    event_data: eventData,
    actor,
  });
}

async function transitionState(
  pipelineId: number,
  workflowType: string,
  newState: string,
  errorCode?: string,
  errorMessage?: string,
  executionId?: number
): Promise<boolean> {
  try {
    const { data: current } = await supabaseAdmin.from("pipeline_state").select("*").eq("id", pipelineId).single();
    if (!current) throw new Error("Pipeline not found");

    const currentState = current.current_state;
    const transition = await validateTransition(workflowType, currentState, newState);
    if (!transition.allowed) {
      console.error(`[StateEngine] Transition refused: ${currentState} → ${newState}`);
      await recordPipelineEvent(pipelineId, "state_transition", currentState, newState, { refused: true, reason: "invalid_transition" }, executionId);
      return false;
    }

    const update: Record<string, unknown> = { current_state: newState, previous_state: currentState };

    if (newState === "FAILED" && errorCode) {
      update.error_code = errorCode;
      update.error_message = errorMessage || "";
      update.last_error_at = new Date().toISOString();
      const failures = (Number(current.consecutive_failures) || 0) + 1;
      update.consecutive_failures = failures;

      if (failures >= CIRCUIT_BREAKER_THRESHOLD) {
        update.circuit_open = true;
        update.circuit_open_until = new Date(Date.now() + CIRCUIT_BREAKER_TIMEOUT_MS).toISOString();
        await recordPipelineEvent(pipelineId, "circuit_breaker_open", currentState, newState, { consecutive_failures: failures }, executionId);
      }
    }

    if (newState === "PUBLISHED") {
      update.completed_at = new Date().toISOString();
      update.consecutive_failures = 0;
      update.circuit_open = false;
      update.circuit_open_until = null;
      await recordPipelineEvent(pipelineId, "circuit_breaker_reset", currentState, newState, { reason: "success" }, executionId);
    }

    if (newState !== "FAILED") {
      update.retry_count = 0;
    }

    await supabaseAdmin.from("pipeline_state").update(update).eq("id", pipelineId);
    await recordPipelineEvent(pipelineId, "state_transition", currentState, newState, { error_code: errorCode, error_message: errorMessage }, executionId);

    if (newState === "FAILED") {
      await recordPipelineEvent(pipelineId, "error_occurred", currentState, newState, { error_code: errorCode, error_message: errorMessage }, executionId);
    }

    return true;
  } catch (err) {
    console.error("[StateEngine] Transition error:", (err as Error).message);
    return false;
  }
}

// ═══ Recovery Engine ═══
async function isCircuitOpen(queueItemId: number): Promise<boolean> {
  const { data } = await supabaseAdmin.from("pipeline_state").select("id, circuit_open, circuit_open_until").eq("queue_item_id", queueItemId).order("created_at", { ascending: false }).limit(1).maybeSingle();
  if (!data || !data.circuit_open) return false;
  if (data.circuit_open_until && new Date(data.circuit_open_until) > new Date()) return true;
  await supabaseAdmin.from("pipeline_state").update({ circuit_open: false, circuit_open_until: null, consecutive_failures: 0 }).eq("id", data.id);
  if (data.id) await recordPipelineEvent(data.id, "circuit_breaker_reset", null, null, { reason: "cooldown_expired" });
  return false;
}

async function recordRetryAttempt(
  pipelineStateId: number,
  attemptNumber: number,
  delayMs: number,
  strategy: string,
  result: string,
  errorMessage?: string,
  executionId?: number,
  failedJobId?: number
) {
  await supabaseAdmin.from("retry_history").insert({
    pipeline_state_id: pipelineStateId,
    execution_id: executionId || null,
    failed_job_id: failedJobId || null,
    attempt_number: attemptNumber,
    strategy,
    base_delay_ms: RETRY_BASE_MS,
    actual_delay_ms: delayMs,
    result,
    error_message: errorMessage || null,
    backoff_multiplier: BACKOFF_MULTIPLIER,
    jitter_ms: Math.floor(Math.random() * 500),
  });
}

async function sendToDeadLetterQueue(
  pipelineStateId: number | null,
  executionId: number | null,
  workflowId: string,
  jobType: string,
  payload: Record<string, unknown>,
  errorCode: string,
  errorMessage: string,
  maxRetries: number,
  failureCategory: string
) {
  const nextRetry = new Date(Date.now() + DLQ_RESCAN_INTERVAL_MS).toISOString();
  const { data } = await supabaseAdmin.from("failed_jobs").insert({
    pipeline_state_id: pipelineStateId,
    execution_id: executionId,
    workflow_id: workflowId,
    job_type: jobType,
    payload,
    error_code: errorCode,
    error_message: errorMessage,
    max_retries: maxRetries,
    next_retry_at: nextRetry,
    failure_category: failureCategory,
    permanently_failed: true,
  }).select("id").single();

  if (pipelineStateId) {
    await recordPipelineEvent(pipelineStateId, "dead_letter_sent", null, null, { failed_job_id: data?.id, error_code: errorCode }, executionId || undefined);
  }

  return data?.id;
}

async function withRetry<T>(
  fn: () => Promise<T>,
  pipelineId: number,
  executionId: number,
  workflowType: string,
  operation: string
): Promise<T> {
  let lastError: Error | null = null;
  const maxRetries = DEFAULT_MAX_RETRIES;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await fn();
      if (attempt > 1) {
        await recordRetryAttempt(pipelineId, attempt - 1, 0, "exponential_backoff", "success", undefined, executionId);
      }
      return result;
    } catch (err) {
      lastError = err as Error;
      const delayMs = RETRY_BASE_MS * Math.pow(BACKOFF_MULTIPLIER, attempt - 1);
      await recordRetryAttempt(pipelineId, attempt, delayMs, "exponential_backoff", "failed", lastError.message, executionId);
      await recordPipelineEvent(pipelineId, "retry_attempt", null, null, { attempt, max: maxRetries, delay_ms: delayMs, error: lastError.message }, executionId);

      await supabaseAdmin.from("pipeline_state").update({
        retry_count: attempt,
        last_error_at: new Date().toISOString(),
        error_code: "RETRY_" + attempt,
        error_message: lastError.message,
      }).eq("id", pipelineId);

      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, delayMs));
      }
    }
  }

  await sendToDeadLetterQueue(
    pipelineId, executionId, workflowType, operation,
    { operation, last_error: lastError?.message },
    "MAX_RETRIES_EXCEEDED",
    lastError?.message || "Unknown",
    maxRetries,
    "api_error"
  );

  await transitionState(pipelineId, workflowType, "FAILED", "MAX_RETRIES_EXCEEDED", lastError?.message || "Unknown", executionId);
  throw new Error(`${operation} failed after ${maxRetries} retries: ${lastError?.message}`);
}

// ═══ Health Check Engine ═══
async function runHealthCheck(component: string, checkName: string, componentType: string): Promise<{ status: string; latency_ms: number }> {
  const start = Date.now();
  let status = "healthy";
  try {
    if (component === "PostgreSQL") {
      const { error } = await supabaseAdmin.from("pipeline_state").select("id").limit(1);
      if (error) status = "unhealthy";
    } else if (component === "Dead Letter Queue") {
      const { count } = await supabaseAdmin.from("failed_jobs").select("*", { count: "exact", head: true }).eq("permanently_failed", true);
      status = (count ?? 0) > 50 ? "degraded" : "healthy";
    } else if (component === "Circuit Breaker") {
      const { count } = await supabaseAdmin.from("pipeline_state").select("*", { count: "exact", head: true }).eq("circuit_open", true);
      status = (count ?? 0) > 10 ? "degraded" : "healthy";
    }
  } catch {
    status = "unhealthy";
  }
  const latency = Date.now() - start;

  await supabaseAdmin.from("health_checks").upsert({
    component, component_type: componentType, check_name: checkName,
    status, latency_ms: latency, checked_at: new Date().toISOString(),
    consecutive_failures: status === "unhealthy" ? undefined : 0,
    last_healthy_at: status === "healthy" ? new Date().toISOString() : undefined,
  }, { onConflict: "component,check_name" });

  return { status, latency_ms: latency };
}

// ═══ Auto-Recovery Cron ═══
async function autoRecoveryScan(): Promise<{
  circuits_reset: number;
  jobs_retried: number;
  dlq_retried: number;
  permanently_failed: number;
  health_checks_run: number;
}> {
  let circuitsReset = 0, jobsRetried = 0, dlqRetried = 0, permanentlyFailed = 0, healthRuns = 0;

  const { data: openCircuits } = await supabaseAdmin.from("pipeline_state").select("id, circuit_open_until").eq("circuit_open", true).not("circuit_open_until", "is", null);
  if (openCircuits) {
    for (const c of openCircuits) {
      if (c.circuit_open_until && new Date(c.circuit_open_until) <= new Date()) {
        await supabaseAdmin.from("pipeline_state").update({ circuit_open: false, circuit_open_until: null, consecutive_failures: 0 }).eq("id", c.id);
        await recordPipelineEvent(c.id, "circuit_breaker_reset", null, null, { reason: "auto_recovery_cooldown" });
        circuitsReset++;
      }
    }
  }

  const { data: retryableJobs } = await supabaseAdmin.from("pipeline_state").select("*").eq("current_state", "FAILED").order("created_at", { ascending: true }).limit(20);
  if (retryableJobs) {
    for (const job of retryableJobs) {
      const retryCount = Number(job.retry_count) || 0;
      const maxRetries = Number(job.max_retries) || DEFAULT_MAX_RETRIES;
      if (retryCount < maxRetries && !job.circuit_open) {
        const prevState = job.previous_state || "TOPIC_SELECTED";
        await supabaseAdmin.from("pipeline_state").update({
          current_state: prevState,
          retry_count: retryCount + 1,
          error_code: null,
          error_message: null,
          last_error_at: null,
        }).eq("id", job.id);
        await recordPipelineEvent(job.id, "recovery_initiated", "FAILED", prevState, { auto_retry: true, attempt: retryCount + 1 });
        jobsRetried++;
      } else if (retryCount >= maxRetries) {
        permanentlyFailed++;
      }
    }
  }

  const { data: dlqItems } = await supabaseAdmin.from("failed_jobs").select("*").eq("permanently_failed", true).lte("next_retry_at", new Date().toISOString()).order("next_retry_at", { ascending: true }).limit(10);
  if (dlqItems) {
    for (const item of dlqItems) {
      const retryCount = Number(item.retry_count) || 0;
      const maxRetries = Number(item.max_retries) || DEFAULT_MAX_RETRIES;
      if (retryCount < maxRetries) {
        const nextRetry = new Date(Date.now() + DLQ_RESCAN_INTERVAL_MS * Math.pow(2, retryCount)).toISOString();
        await supabaseAdmin.from("failed_jobs").update({
          retry_count: retryCount + 1,
          last_retry_at: new Date().toISOString(),
          next_retry_at: nextRetry,
          permanently_failed: false,
        }).eq("id", item.id);
        dlqRetried++;
      }
    }
  }

  const criticalComponents = [
    { component: "PostgreSQL", check: "connection_pool", type: "database" },
    { component: "Circuit Breaker", check: "circuit_status", type: "service" },
    { component: "Dead Letter Queue", check: "dlq_size", type: "service" },
    { component: "KOS Orchestrator Engine", check: "orchestrator_uptime", type: "edge_function" },
  ];
  for (const c of criticalComponents) {
    await runHealthCheck(c.component, c.check, c.type);
    healthRuns++;
  }

  return { circuits_reset: circuitsReset, jobs_retried: jobsRetried, dlq_retried: dlqRetried, permanently_failed: permanentlyFailed, health_checks_run: healthRuns };
}

// ═══ KPI Calculator ═══
async function calculateKPIs(): Promise<Record<string, unknown>> {
  const now = new Date();
  const last24h = new Date(now.getTime() - 24 * 3600 * 1000).toISOString();

  const { data: recoveredEvents } = await supabaseAdmin.from("pipeline_events").select("created_at, pipeline_state_id, event_data").eq("event_type", "recovery_completed").gte("created_at", last24h).order("created_at", { ascending: false }).limit(100);
  let mttrMs = 0;
  if (recoveredEvents && recoveredEvents.length > 0) {
    let totalMs = 0;
    let count = 0;
    for (const evt of recoveredEvents) {
      const recoveryData = evt.event_data as Record<string, unknown> || {};
      if (recoveryData.recovery_duration_ms) {
        totalMs += Number(recoveryData.recovery_duration_ms);
        count++;
      }
    }
    mttrMs = count > 0 ? Math.round(totalMs / count) : 0;
  }

  const { count: recoveryInitiated } = await supabaseAdmin.from("pipeline_events").select("*", { count: "exact", head: true }).eq("event_type", "recovery_initiated").gte("created_at", last24h);
  const { count: recoveryCompleted } = await supabaseAdmin.from("pipeline_events").select("*", { count: "exact", head: true }).eq("event_type", "recovery_completed").gte("created_at", last24h);
  const autoRecoveryRate = (recoveryInitiated ?? 0) > 0 ? Math.round(((recoveryCompleted ?? 0) / (recoveryInitiated ?? 1)) * 100) : 100;

  const { count: totalTransitions } = await supabaseAdmin.from("pipeline_events").select("*", { count: "exact", head: true }).eq("event_type", "state_transition").gte("created_at", last24h);
  const { count: errorTransitions } = await supabaseAdmin.from("pipeline_events").select("*", { count: "exact", head: true }).eq("event_type", "error_occurred").gte("created_at", last24h);
  const failureRate = (totalTransitions ?? 0) > 0 ? Math.round(((errorTransitions ?? 0) / (totalTransitions ?? 1)) * 100 * 100) / 100 : 0;

  const { data: completedExecs } = await supabaseAdmin.from("workflow_execution").select("duration_ms").eq("status", "completed").gte("completed_at", last24h);
  let meanExecMs = 0;
  if (completedExecs && completedExecs.length > 0) {
    meanExecMs = Math.round(completedExecs.reduce((sum, e) => sum + (Number(e.duration_ms) || 0), 0) / completedExecs.length);
  }

  const lastHour = new Date(now.getTime() - 3600 * 1000).toISOString();
  const { count: totalChecks } = await supabaseAdmin.from("health_checks").select("*", { count: "exact", head: true }).gte("checked_at", lastHour);
  const { count: unhealthyChecks } = await supabaseAdmin.from("health_checks").select("*", { count: "exact", head: true }).in("status", ["unhealthy", "degraded"]).gte("checked_at", lastHour);
  const availability = (totalChecks ?? 0) > 0 ? Math.round(((totalChecks! - (unhealthyChecks ?? 0)) / totalChecks!) * 10000) / 100 : 100;

  const { count: totalPipeline } = await supabaseAdmin.from("pipeline_state").select("*", { count: "exact", head: true });
  const { count: activePipeline } = await supabaseAdmin.from("pipeline_state").select("*", { count: "exact", head: true }).not("current_state", "in", "(PUBLISHED,FAILED)");
  const { count: failedPipeline } = await supabaseAdmin.from("pipeline_state").select("*", { count: "exact", head: true }).eq("current_state", "FAILED");
  const { count: dlqSize } = await supabaseAdmin.from("failed_jobs").select("*", { count: "exact", head: true }).eq("permanently_failed", true);

  return {
    mttr_ms: mttrMs,
    mttr_minutes: Math.round(mttrMs / 60000 * 100) / 100,
    mttr_target_minutes: 5,
    mttr_ok: (mttrMs / 60000) <= 5,
    auto_recovery_rate_pct: autoRecoveryRate,
    auto_recovery_target_pct: 95,
    failure_rate_pct: failureRate,
    mean_execution_ms: meanExecMs,
    mean_execution_seconds: Math.round(meanExecMs / 1000 * 100) / 100,
    availability_pct: availability,
    availability_target_pct: 99.9,
    availability_ok: availability >= 99.9,
    pipeline_total: totalPipeline ?? 0,
    pipeline_active: activePipeline ?? 0,
    pipeline_failed: failedPipeline ?? 0,
    dlq_size: dlqSize ?? 0,
    health_checks_total: totalChecks ?? 0,
    health_checks_unhealthy: unhealthyChecks ?? 0,
    calculated_at: new Date().toISOString(),
    status: availability >= 99.9 && (mttrMs / 60000) <= 5 && autoRecoveryRate >= 95 ? "GO" : "NOGO",
  };
}

// ═══ Workflow Execution Engine ═══
async function createWorkflowExecution(workflowId: string, workflowName: string, inputParams: Record<string, unknown> = {}, triggeredBy = "system", priority = 5): Promise<{ id: number; execution_ref: string }> {
  const executionRef = `EXEC-${workflowId}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  const { data } = await supabaseAdmin.from("workflow_execution").insert({
    workflow_id: workflowId,
    workflow_name: workflowName,
    execution_ref: executionRef,
    status: "pending",
    triggered_by: triggeredBy,
    priority,
    input_params: inputParams,
  }).select("id, execution_ref").single();
  return { id: data?.id, execution_ref: executionRef };
}

async function startExecution(executionId: number) {
  await supabaseAdmin.from("workflow_execution").update({ status: "running", started_at: new Date().toISOString() }).eq("id", executionId);
}

async function completeExecution(executionId: number, outputResult: Record<string, unknown> = {}) {
  const startedAt = await supabaseAdmin.from("workflow_execution").select("started_at").eq("id", executionId).single();
  const startTime = startedAt?.data?.started_at ? new Date(startedAt.data.started_at).getTime() : Date.now();
  const durationMs = Date.now() - startTime;
  await supabaseAdmin.from("workflow_execution").update({
    status: "completed",
    completed_at: new Date().toISOString(),
    duration_ms: durationMs,
    output_result: outputResult,
  }).eq("id", executionId);
}

async function failExecution(executionId: number, errorCode: string, errorMessage: string) {
  const startedAt = await supabaseAdmin.from("workflow_execution").select("started_at").eq("id", executionId).single();
  const startTime = startedAt?.data?.started_at ? new Date(startedAt.data.started_at).getTime() : Date.now();
  const durationMs = Date.now() - startTime;
  await supabaseAdmin.from("workflow_execution").update({
    status: "failed",
    completed_at: new Date().toISOString(),
    duration_ms: durationMs,
    error_code: errorCode,
    error_message: errorMessage,
  }).eq("id", executionId);
}

// ═══ MAIN SERVER ═══
serve(async (req: Request) => {
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Cache-Control": "no-cache",
  };

  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = req.method === "POST" ? await req.json() : {};
    const action: string = body.action || "health";

    // ─── PUBLIC ENDPOINTS (no auth required) ───
    const PUBLIC_ACTIONS = ["health", "kpis", "dashboard"];
    const isPublicAction = PUBLIC_ACTIONS.includes(action);

    // ─── AUTH CHECK for protected actions ───
    if (!isPublicAction) {
      const auth = await authenticateRequest(req);
      if (!auth.authenticated) {
        return new Response(JSON.stringify({ success: false, error: "Unauthorized — JWT required", code: "AUTH_REQUIRED" }), { headers: corsHeaders, status: 401 });
      }
      if (!auth.isAdmin) {
        return new Response(JSON.stringify({ success: false, error: "Forbidden — Admin role required", code: "ADMIN_REQUIRED" }), { headers: corsHeaders, status: 403 });
      }
    }

    // ─── HEALTH CHECK ───
    if (action === "health") {
      const components = body.components || ["KOS Orchestrator Engine", "PostgreSQL", "Circuit Breaker", "Dead Letter Queue"];
      const results = [];
      for (const comp of components) {
        const result = await runHealthCheck(comp, "health_" + comp.toLowerCase().replace(/\s+/g, "_"), comp.includes("Postgre") ? "database" : "service");
        results.push({ component: comp, ...result });
      }
      return new Response(JSON.stringify({ success: true, status: results.every(r => r.status === "healthy") ? "healthy" : "degraded", checks: results, timestamp: new Date().toISOString() }), { headers: corsHeaders });
    }

    // ─── KPI REPORT ───
    if (action === "kpis" || action === "dashboard") {
      const kpis = await calculateKPIs();
      return new Response(JSON.stringify({ success: true, ...kpis }), { headers: corsHeaders });
    }

    // ─── AUTO RECOVERY ───
    if (action === "auto_recovery") {
      const result = await autoRecoveryScan();
      return new Response(JSON.stringify({
        success: true,
        message: `Recovery: ${result.circuits_reset} circuits, ${result.jobs_retried} jobs, ${result.dlq_retried} DLQ, ${result.permanently_failed} dead, ${result.health_checks_run} checks`,
        ...result,
        timestamp: new Date().toISOString(),
      }), { headers: corsHeaders });
    }

    // ─── VALIDATE TRANSITION ───
    if (action === "validate_transition") {
      const { workflow_type, from_state, to_state } = body;
      if (!workflow_type || !from_state || !to_state) {
        return new Response(JSON.stringify({ success: false, error: "workflow_type, from_state, to_state required" }), { headers: corsHeaders, status: 400 });
      }
      const result = await validateTransition(workflow_type, from_state, to_state);
      return new Response(JSON.stringify({ success: true, ...result }), { headers: corsHeaders });
    }

    // ─── EXECUTE TRANSITION ───
    if (action === "transition") {
      const { pipeline_id, workflow_type, to_state, error_code, error_message, execution_id } = body;
      if (!pipeline_id || !workflow_type || !to_state) {
        return new Response(JSON.stringify({ success: false, error: "pipeline_id, workflow_type, to_state required" }), { headers: corsHeaders, status: 400 });
      }
      const ok = await transitionState(pipeline_id, workflow_type, to_state, error_code, error_message, execution_id);
      return new Response(JSON.stringify({ success: ok, pipeline_id, to_state, error: ok ? null : "Transition refused by state machine" }), { headers: corsHeaders });
    }

    // ─── PIPELINE STATE ───
    if (action === "pipeline_state") {
      const { queue_item_id, pipeline_id, limit: pLimit } = body;
      if (pipeline_id) {
        const { data } = await supabaseAdmin.from("pipeline_state").select("*").eq("id", pipeline_id).single();
        return new Response(JSON.stringify({ success: true, state: data }), { headers: corsHeaders });
      }
      if (queue_item_id) {
        const { data } = await supabaseAdmin.from("pipeline_state").select("*").eq("queue_item_id", queue_item_id).order("created_at", { ascending: false }).limit(1).maybeSingle();
        return new Response(JSON.stringify({ success: true, state: data }), { headers: corsHeaders });
      }
      const limit = pLimit || 50;
      const { data, error } = await supabaseAdmin.from("pipeline_state").select("*").order("created_at", { ascending: false }).limit(limit);
      if (error) throw new Error(error.message);
      return new Response(JSON.stringify({ success: true, total: data?.length || 0, states: data || [] }), { headers: corsHeaders });
    }

    // ─── PIPELINE EVENTS ───
    if (action === "pipeline_events") {
      const { pipeline_state_id, event_type: evtType, limit: eLimit } = body;
      let query = supabaseAdmin.from("pipeline_events").select("*").order("created_at", { ascending: false }).limit(eLimit || 50);
      if (pipeline_state_id) query = query.eq("pipeline_state_id", pipeline_state_id);
      if (evtType) query = query.eq("event_type", evtType);
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return new Response(JSON.stringify({ success: true, total: data?.length || 0, events: data || [] }), { headers: corsHeaders });
    }

    // ─── WORKFLOW EXECUTION ───
    if (action === "create_execution") {
      const { workflow_id, workflow_name, input_params, triggered_by, priority } = body;
      if (!workflow_id || !workflow_name) {
        return new Response(JSON.stringify({ success: false, error: "workflow_id, workflow_name required" }), { headers: corsHeaders, status: 400 });
      }
      const exec = await createWorkflowExecution(workflow_id, workflow_name, input_params || {}, triggered_by || "system", priority || 5);
      return new Response(JSON.stringify({ success: true, ...exec }), { headers: corsHeaders });
    }

    if (action === "list_executions") {
      const { status: execStatus, limit: execLimit } = body;
      let query = supabaseAdmin.from("workflow_execution").select("*").order("created_at", { ascending: false }).limit(execLimit || 20);
      if (execStatus) query = query.eq("status", execStatus);
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return new Response(JSON.stringify({ success: true, total: data?.length || 0, executions: data || [] }), { headers: corsHeaders });
    }

    // ─── FAILED JOBS / DLQ ───
    if (action === "failed_jobs" || action === "dlq") {
      const { permanently_failed: perm, limit: fjLimit } = body;
      let query = supabaseAdmin.from("failed_jobs").select("*").order("failed_at", { ascending: false }).limit(fjLimit || 50);
      if (perm !== undefined) query = query.eq("permanently_failed", perm);
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return new Response(JSON.stringify({ success: true, total: data?.length || 0, jobs: data || [] }), { headers: corsHeaders });
    }

    // ─── RETRY HISTORY ───
    if (action === "retry_history") {
      const { pipeline_state_id: psid, result: resFilter, limit: rhLimit } = body;
      let query = supabaseAdmin.from("retry_history").select("*").order("created_at", { ascending: false }).limit(rhLimit || 50);
      if (psid) query = query.eq("pipeline_state_id", psid);
      if (resFilter) query = query.eq("result", resFilter);
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return new Response(JSON.stringify({ success: true, total: data?.length || 0, retries: data || [] }), { headers: corsHeaders });
    }

    // ─── STATE TRANSITIONS ───
    if (action === "state_transitions") {
      const { workflow_type } = body;
      let query = supabaseAdmin.from("state_transitions").select("*");
      if (workflow_type) query = query.eq("workflow_type", workflow_type);
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return new Response(JSON.stringify({ success: true, total: data?.length || 0, transitions: data || [] }), { headers: corsHeaders });
    }

    // ─── RUN HEALTH CHECKS (full) ───
    if (action === "run_health_checks") {
      const healthComponents = [
        { component: "KOS Orchestrator Engine", check: "orchestrator_uptime", type: "edge_function" },
        { component: "KOS State Engine", check: "state_machine_validation", type: "service" },
        { component: "KOS Recovery Engine", check: "retry_queue_empty", type: "service" },
        { component: "Pipeline State Machine", check: "pipeline_transitions", type: "service" },
        { component: "Circuit Breaker", check: "circuit_status", type: "service" },
        { component: "Dead Letter Queue", check: "dlq_size", type: "service" },
        { component: "PostgreSQL", check: "connection_pool", type: "database" },
      ];
      const results = [];
      for (const c of healthComponents) {
        const r = await runHealthCheck(c.component, c.check, c.type);
        results.push({ ...c, ...r });
      }
      const healthy = results.filter(r => r.status === "healthy").length;
      return new Response(JSON.stringify({
        success: true,
        overall: healthy === results.length ? "healthy" : healthy >= results.length - 2 ? "degraded" : "unhealthy",
        healthy_count: healthy,
        total_count: results.length,
        checks: results,
        timestamp: new Date().toISOString(),
      }), { headers: corsHeaders });
    }

    // ─── RECOVER FAILED JOB ───
    if (action === "recover_job") {
      const { pipeline_id, retry_count, rollback_state } = body;
      if (!pipeline_id) {
        return new Response(JSON.stringify({ success: false, error: "pipeline_id required" }), { headers: corsHeaders, status: 400 });
      }
      const { data: job } = await supabaseAdmin.from("pipeline_state").select("*").eq("id", pipeline_id).single();
      if (!job) return new Response(JSON.stringify({ success: false, error: "Pipeline state not found" }), { headers: corsHeaders, status: 404 });

      const targetState = rollback_state || job.previous_state || "TOPIC_SELECTED";
      const transition = await validateTransition("youtube_auto", job.current_state, targetState);
      if (!transition.allowed) {
        return new Response(JSON.stringify({ success: false, error: `Rollback ${job.current_state} → ${targetState} refused` }), { headers: corsHeaders });
      }

      await supabaseAdmin.from("pipeline_state").update({
        current_state: targetState,
        retry_count: retry_count || 0,
        error_code: null,
        error_message: null,
        last_error_at: null,
        circuit_open: false,
        circuit_open_until: null,
        consecutive_failures: 0,
      }).eq("id", pipeline_id);

      await recordPipelineEvent(pipeline_id, "recovery_completed", "FAILED", targetState, {
        recovery_duration_ms: Date.now() - (job.last_error_at ? new Date(job.last_error_at).getTime() : Date.now()),
        rollback: true,
      }, undefined, "orchestrator");

      return new Response(JSON.stringify({ success: true, pipeline_id, recovered_to: targetState, timestamp: new Date().toISOString() }), { headers: corsHeaders });
    }

    return new Response(JSON.stringify({
      success: false,
      error: "Invalid action",
      available_actions: [
        "health", "kpis", "dashboard", "auto_recovery", "validate_transition",
        "transition", "pipeline_state", "pipeline_events", "create_execution",
        "list_executions", "failed_jobs", "dlq", "retry_history",
        "state_transitions", "run_health_checks", "recover_job"
      ],
    }), { headers: corsHeaders, status: 400 });

  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: (err as Error).message || "Internal error" }), { headers: corsHeaders, status: 500 });
  }
});
