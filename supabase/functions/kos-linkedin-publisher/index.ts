import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LINKEDIN_POSTS_API = "https://api.linkedin.com/v2/posts";
const OAUTH_FN = "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-linkedin-oauth";

interface CircuitBreakerState {
  failures: number;
  lastFailure: string | null;
  open: boolean;
  openSince: string | null;
  maxFailures: number;
  cooldownSeconds: number;
}

const circuitState: CircuitBreakerState = {
  failures: 0,
  lastFailure: null,
  open: false,
  openSince: null,
  maxFailures: 5,
  cooldownSeconds: 60,
};

function checkCircuitBreaker(): { allowed: boolean; reason?: string } {
  if (!circuitState.open) return { allowed: true };
  const openSince = circuitState.openSince ? new Date(circuitState.openSince) : null;
  if (openSince) {
    const elapsed = (Date.now() - openSince.getTime()) / 1000;
    if (elapsed >= circuitState.cooldownSeconds) {
      circuitState.open = false;
      circuitState.failures = 0;
      circuitState.openSince = null;
      return { allowed: true };
    }
  }
  return {
    allowed: false,
    reason: `Circuit breaker ouvert — réessayer dans ${Math.round(circuitState.cooldownSeconds - ((Date.now() - (circuitState.openSince ? new Date(circuitState.openSince).getTime() : Date.now())) / 1000))}s`,
  };
}

function recordFailure() {
  circuitState.failures++;
  circuitState.lastFailure = new Date().toISOString();
  if (circuitState.failures >= circuitState.maxFailures) {
    circuitState.open = true;
    circuitState.openSince = new Date().toISOString();
  }
}

function recordSuccess() {
  circuitState.failures = 0;
  circuitState.open = false;
  circuitState.openSince = null;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getValidToken(supabase: ReturnType<typeof createClient>): Promise<{ token: string; orgId: string; memberUrn: string } | { error: string; oauth_required: boolean }> {
  const { data: accessRow } = await supabase.from("social_api_tokens").select("token_value, expires_at, is_active").eq("provider", "linkedin").eq("token_name", "access_token").maybeSingle();
  const { data: metaRow } = await supabase.from("social_api_tokens").select("token_value").eq("provider", "linkedin").eq("token_name", "metadata").maybeSingle();

  if (!accessRow?.is_active || !accessRow?.token_value) {
    return { error: "LinkedIn non connecté. Aucun token actif.", oauth_required: true };
  }

  const now = new Date();
  const expired = accessRow.expires_at ? new Date(accessRow.expires_at) < now : false;

  if (expired) {
    const refreshResp = await fetch(`${OAUTH_FN}?action=refresh`, { method: "POST" });
    const refreshData = await refreshResp.json();
    if (!refreshData.success) {
      return { error: "Token LinkedIn expiré et refresh impossible — réautorisation requise.", oauth_required: true };
    }
    const { data: refreshedRow } = await supabase.from("social_api_tokens").select("token_value").eq("provider", "linkedin").eq("token_name", "access_token").eq("is_active", true).maybeSingle();
    if (!refreshedRow?.token_value) {
      return { error: "Token non trouvé après refresh.", oauth_required: true };
    }
    accessRow.token_value = refreshedRow.token_value;
  }

  let orgId = "";
  let memberUrn = "";
  try {
    if (metaRow?.token_value) {
      const meta = JSON.parse(metaRow.token_value);
      orgId = meta.organization_id || "";
      memberUrn = meta.member_urn || "";
    }
  } catch { /* ignore */ }

  return { token: accessRow.token_value, orgId, memberUrn };
}

function getOrgUrn(orgId: string): string {
  return `urn:li:organization:${orgId}`;
}

function getPersonUrn(personId: string): string {
  return `urn:li:person:${personId}`;
}

interface PostResult {
  success: boolean;
  post_id?: string;
  post_urn?: string;
  activity?: string;
  error?: string;
  error_code?: string;
  retries?: number;
  retry_after_used?: boolean;
}

interface RetryConfig {
  maxRetries: number;
  baseDelayMs: number;
  respectRetryAfter: boolean;
}

const DEFAULT_RETRY: RetryConfig = {
  maxRetries: 3,
  baseDelayMs: 1000,
  respectRetryAfter: true,
};

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retryConfig: RetryConfig = DEFAULT_RETRY
): Promise<{ resp: Response; retries: number; retryAfterUsed: boolean }> {
  let lastResp: Response | null = null;
  let retries = 0;
  let retryAfterUsed = false;

  for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
    const cb = checkCircuitBreaker();
    if (!cb.allowed) {
      throw new Error(`CIRCUIT_BREAKER_OPEN: ${cb.reason}`);
    }

    try {
      const resp = await fetch(url, options);
      lastResp = resp;

      if (resp.status === 429) {
        recordFailure();
        if (retryConfig.respectRetryAfter) {
          const retryAfter = resp.headers.get("Retry-After") || resp.headers.get("x-retry-after-ms");
          const waitMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : retryConfig.baseDelayMs * Math.pow(2, attempt);
          console.log(`[PUBLISHER] 429 throttled — waiting ${waitMs}ms (attempt ${attempt + 1}/${retryConfig.maxRetries + 1})`);
          await sleep(Math.min(waitMs, 60000));
          retryAfterUsed = true;
          retries++;
          continue;
        }
        return { resp, retries, retryAfterUsed };
      }

      if (resp.status >= 500) {
        recordFailure();
        if (attempt < retryConfig.maxRetries) {
          const delay = retryConfig.baseDelayMs * Math.pow(2, attempt);
          console.log(`[PUBLISHER] 5xx error ${resp.status} — retrying in ${delay}ms (attempt ${attempt + 1}/${retryConfig.maxRetries + 1})`);
          await sleep(delay);
          retries++;
          continue;
        }
        return { resp, retries, retryAfterUsed };
      }

      if (resp.status === 401 && attempt === 0) {
        recordFailure();
        console.log("[PUBLISHER] 401 — attempting token refresh before retry");
        const refreshResp = await fetch(`${OAUTH_FN}?action=refresh`, { method: "POST" });
        const refreshData = await refreshResp.json();
        if (refreshData.success) {
          const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
          const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
          const supabase2 = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
          const { data: refreshedRow } = await supabase2.from("social_api_tokens").select("token_value").eq("provider", "linkedin").eq("token_name", "access_token").eq("is_active", true).maybeSingle();
          if (refreshedRow?.token_value) {
            const newHeaders = new Headers(options.headers);
            newHeaders.set("Authorization", `Bearer ${refreshedRow.token_value}`);
            options.headers = newHeaders;
            await sleep(500);
            retries++;
            continue;
          }
        }
        return { resp, retries, retryAfterUsed };
      }

      if (resp.ok) {
        recordSuccess();
      }
      return { resp, retries, retryAfterUsed };

    } catch (err) {
      if (err instanceof Error && err.message.startsWith("CIRCUIT_BREAKER_OPEN")) {
        throw err;
      }
      if (attempt < retryConfig.maxRetries) {
        const delay = retryConfig.baseDelayMs * Math.pow(2, attempt);
        console.log(`[PUBLISHER] Network error — retrying in ${delay}ms: ${err}`);
        await sleep(delay);
        retries++;
        continue;
      }
      throw err;
    }
  }

  return { resp: lastResp!, retries, retryAfterUsed };
}

async function publishTextPost(token: string, authorUrn: string, text: string, hashtags: string[], retryConfig?: RetryConfig): Promise<PostResult> {
  try {
    let commentary = text;
    if (hashtags && hashtags.length > 0) {
      commentary += "\n\n" + hashtags.join(" ");
    }

    const payload = {
      author: authorUrn,
      commentary,
      visibility: "PUBLIC",
      distribution: {
        feedDistribution: "MAIN_FEED",
        targetEntities: [],
        thirdPartyDistributionChannels: [],
      },
      lifecycleState: "PUBLISHED",
      isReshareDisabledByAuthor: false,
    };

    const { resp, retries, retryAfterUsed } = await fetchWithRetry(
      LINKEDIN_POSTS_API,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Restli-Protocol-Version": "2.0.0",
          "LinkedIn-Version": "202405",
        },
        body: JSON.stringify(payload),
      },
      retryConfig || DEFAULT_RETRY
    );

    if (!resp.ok) {
      const errBody = await resp.text();
      let errMsg = errBody;
      try { const errJson = JSON.parse(errBody); errMsg = errJson.message || errJson.error || errBody; } catch { /* use raw */ }
      return { success: false, error: errMsg.substring(0, 500), error_code: `HTTP_${resp.status}`, retries, retry_after_used: retryAfterUsed };
    }

    const postUrn = resp.headers.get("x-restli-id") || "";
    const postId = postUrn ? postUrn.split(":").pop() || "" : "";

    return {
      success: true,
      post_id: postId,
      post_urn: postUrn,
      activity: postId ? `https://www.linkedin.com/feed/update/${postUrn}` : undefined,
      retries,
    };
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("CIRCUIT_BREAKER_OPEN")) {
      return { success: false, error: err.message, error_code: "CIRCUIT_BREAKER_OPEN" };
    }
    return { success: false, error: err instanceof Error ? err.message : "Erreur réseau", error_code: "NETWORK_ERROR" };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });

    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "status";
    // ═══ FIX: lire count et author_type depuis les query params (pour les CRONs pg_cron) ═══
    const queryCount = parseInt(url.searchParams.get("count") || "0");
    const queryAuthorType = url.searchParams.get("author_type") || "organization";

    // ─── CIRCUIT BREAKER STATUS ───
    if (action === "circuit_breaker" && req.method === "GET") {
      return new Response(JSON.stringify({
        open: circuitState.open,
        failures: circuitState.failures,
        max_failures: circuitState.maxFailures,
        last_failure: circuitState.lastFailure,
        open_since: circuitState.openSince,
        cooldown_seconds: circuitState.cooldownSeconds,
        can_publish: !circuitState.open,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ─── RESET CIRCUIT BREAKER ───
    if (action === "reset_circuit" && req.method === "POST") {
      circuitState.failures = 0;
      circuitState.open = false;
      circuitState.openSince = null;
      circuitState.lastFailure = null;
      return new Response(JSON.stringify({ success: true, message: "Circuit breaker reset" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ─── STATUS ───
    if (action === "status" && req.method === "GET") {
      const tokenResult = await getValidToken(supabase);
      if ("error" in tokenResult) {
        return new Response(JSON.stringify({
          ready: false, connected: false, error: tokenResult.error,
          oauth_required: tokenResult.oauth_required, circuit_breaker_open: circuitState.open,
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const { count: draftCount } = await supabase.from("social_automation_queue").select("*", { count: "exact", head: true }).eq("platform", "linkedin").in("status", ["draft", "scheduled"]);
      return new Response(JSON.stringify({
        ready: true, connected: true,
        author_type: tokenResult.orgId ? "organization" : "member",
        organization_id: tokenResult.orgId, member_urn: tokenResult.memberUrn,
        drafts_count: draftCount || 0,
        circuit_breaker_open: circuitState.open, circuit_breaker_failures: circuitState.failures,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ─── LIST ───
    if (action === "list" && req.method === "GET") {
      const { data: posts, error: listErr } = await supabase.from("social_automation_queue").select("*").eq("platform", "linkedin").order("created_at", { ascending: false }).limit(50);
      if (listErr) return new Response(JSON.stringify({ success: false, error: listErr.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      return new Response(JSON.stringify({ success: true, posts: posts || [] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ─── PREFLIGHT ───
    if (action === "preflight" && req.method === "POST") {
      const cb = checkCircuitBreaker();
      if (!cb.allowed) return new Response(JSON.stringify({ ready: false, blocking: true, reason: cb.reason, error_code: "CIRCUIT_BREAKER_OPEN" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const tokenResult = await getValidToken(supabase);
      if ("error" in tokenResult) return new Response(JSON.stringify({ ready: false, blocking: true, reason: tokenResult.error, error_code: "OAUTH_REQUIRED" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      return new Response(JSON.stringify({ ready: true, blocking: false, token_valid: true, organization_id: tokenResult.orgId, member_urn: tokenResult.memberUrn }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ─── PUBLISH (POST) — FIX: support query params + body ───
    if (action === "publish" && req.method === "POST") {
      let bodyJson: Record<string, unknown> = {};
      try { bodyJson = await req.json(); } catch { bodyJson = {}; }

      // ═══ FIX: priorité body JSON, fallback query params ═══
      const bodyCount = typeof bodyJson.count === "number" ? bodyJson.count : queryCount;
      const bodyQueueId = typeof bodyJson.queue_id === "number" ? bodyJson.queue_id : undefined;
      const bodyAuthorType = typeof bodyJson.author_type === "string" ? bodyJson.author_type : queryAuthorType;
      const bodyText = typeof bodyJson.text === "string" ? bodyJson.text : undefined;
      const bodyUrl = typeof bodyJson.url === "string" ? bodyJson.url : undefined;
      const bodyHashtags = Array.isArray(bodyJson.hashtags) ? bodyJson.hashtags as string[] : undefined;
      const bodyTitle = typeof bodyJson.title === "string" ? bodyJson.title : undefined;

      const cb = checkCircuitBreaker();
      if (!cb.allowed) {
        return new Response(JSON.stringify({
          success: false, error: cb.reason, error_code: "CIRCUIT_BREAKER_OPEN",
          circuit_breaker: { open: circuitState.open, failures: circuitState.failures, cooldown_seconds: circuitState.cooldownSeconds },
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const tokenResult = await getValidToken(supabase);
      if ("error" in tokenResult) {
        return new Response(JSON.stringify({
          success: false, error: tokenResult.error, oauth_required: tokenResult.oauth_required,
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const { token, orgId, memberUrn } = tokenResult;
      const useOrg = bodyAuthorType === "organization" && !!orgId;
      const authorUrn = useOrg ? getOrgUrn(orgId) : getPersonUrn(memberUrn);

      // ─── Publish single from queue ───
      if (bodyQueueId) {
        const { data: queueItem, error: queueErr } = await supabase.from("social_automation_queue").select("*").eq("id", bodyQueueId).eq("platform", "linkedin").maybeSingle();
        if (queueErr || !queueItem) {
          return new Response(JSON.stringify({ success: false, error: "Post introuvable dans la file d'attente" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        const metadata = (queueItem.metadata as Record<string, unknown>) || {};
        const postText = bodyText || String(queueItem.content || queueItem.title || "");
        const postUrl = bodyUrl || String(metadata.source_url || metadata.canonicalUrl || "");
        const postHashtags = bodyHashtags || (queueItem.hashtags as string[]) || [];

        const result = await publishTextPost(token, authorUrn, postText, postHashtags);

        if (result.success) {
          const now = new Date().toISOString();
          const updatedMetadata = { ...metadata, linkedin_post_urn: result.post_urn, linkedin_post_id: result.post_id, linkedin_activity: result.activity, published_at: now, published_by: "kos-linkedin-publisher-v3", retries: result.retries || 0 };
          await supabase.from("social_automation_queue").update({ status: "published", metadata: updatedMetadata, updated_at: now }).eq("id", bodyQueueId);
          return new Response(JSON.stringify({ success: true, published_count: 1, results: [{ queue_id: bodyQueueId, title: queueItem.title, post_urn: result.post_urn, linkedin_activity: result.activity, status: "published" }] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        return new Response(JSON.stringify({ success: false, results: [{ queue_id: bodyQueueId, title: queueItem.title, status: "failed", error: result.error, error_code: result.error_code }] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      // ─── Publish multiple from queue ───
      if (bodyCount > 0) {
        const { data: drafts } = await supabase.from("social_automation_queue").select("*").eq("platform", "linkedin").in("status", ["draft", "scheduled"]).order("created_at", { ascending: true }).limit(bodyCount);

        if (!drafts || drafts.length === 0) {
          return new Response(JSON.stringify({ success: false, error: "Aucun brouillon LinkedIn à publier" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        const results: Array<{ queue_id: number; title: string; post_urn?: string; linkedin_activity?: string; status: string; error?: string }> = [];
        let published = 0;

        for (const item of drafts) {
          const midCb = checkCircuitBreaker();
          if (!midCb.allowed) {
            results.push({ queue_id: item.id, title: item.title, status: "failed", error: `Circuit breaker ouvert: ${midCb.reason}` });
            break;
          }

          const metadata = (item.metadata as Record<string, unknown>) || {};
          const postText = String(item.content || item.title || "");
          const postHashtags = (item.hashtags as string[]) || [];

          const result = await publishTextPost(token, authorUrn, postText, postHashtags);

          if (result.success) {
            published++;
            const now = new Date().toISOString();
            const updatedMetadata = { ...metadata, linkedin_post_urn: result.post_urn, linkedin_post_id: result.post_id, linkedin_activity: result.activity, published_at: now, published_by: "kos-linkedin-publisher-v3", retries: result.retries || 0 };
            await supabase.from("social_automation_queue").update({ status: "published", metadata: updatedMetadata, updated_at: now }).eq("id", item.id);
            results.push({ queue_id: item.id, title: item.title, post_urn: result.post_urn, linkedin_activity: result.activity, status: "published" });
          } else {
            results.push({ queue_id: item.id, title: item.title, status: "failed", error: result.error });
          }

          if (drafts.length > 1) await sleep(2000);
        }

        return new Response(JSON.stringify({
          success: true, published_count: published, results,
          note: published < drafts.length ? `${drafts.length - published} post(s) ont échoué` : undefined,
          circuit_breaker: { open: circuitState.open, failures: circuitState.failures },
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      // ─── Direct publish (free-form text) ───
      if (bodyText) {
        const postHashtags = bodyHashtags || [];
        const result = await publishTextPost(token, authorUrn, bodyText, postHashtags);
        if (result.success) {
          return new Response(JSON.stringify({ success: true, post_urn: result.post_urn, post_id: result.post_id, linkedin_activity: result.activity, retries: result.retries || 0 }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        return new Response(JSON.stringify({ success: false, error: result.error, error_code: result.error_code, retries: result.retries || 0 }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      return new Response(JSON.stringify({ success: false, error: `Aucun contenu à publier. Body count=${bodyCount}, query count=${queryCount}. Spécifiez queue_id, count, ou text.` }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ success: false, error: "Action inconnue" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err instanceof Error ? err.message : "Erreur interne" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
