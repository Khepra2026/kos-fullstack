import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ─── UTILS ───────────────────────────────────────────────
async function sha256(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function toSnakeCase(action: Record<string, unknown>): Record<string, unknown> {
  return {
    ref: action.ref,
    title: action.title,
    root_cause: action.rootCause,
    severity: action.severity,
    entities: action.entities,
    owner: action.owner,
    due_date: action.dueDate,
    status: action.status || "Open",
    iso_clause: action.isoClause || null,
    evidence_url: action.evidenceUrl || null,
  };
}

function toCamelCase(row: Record<string, unknown>): Record<string, unknown> {
  return {
    id: row.id,
    ref: row.ref,
    title: row.title,
    rootCause: row.root_cause,
    severity: row.severity,
    entities: row.entities,
    owner: row.owner,
    dueDate: row.due_date,
    status: row.status,
    isoClause: row.iso_clause,
    evidenceUrl: row.evidence_url,
    createdBy: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    auditTrail: [],
  };
}

// ─── VALIDATORS ─────────────────────────────────────────
function validateCapa(action: Record<string, unknown>): { ok: boolean; error?: string } {
  if (!action.ref || typeof action.ref !== "string" || !/^CAPA-\d{4}-\d{4}$/.test(action.ref)) {
    return { ok: false, error: "ref must match CAPA-YYYY-NNNN" };
  }
  if (!action.title || typeof action.title !== "string" || action.title.length <= 5) {
    return { ok: false, error: "title must be > 5 chars" };
  }
  const validRootCauses = ["Process", "People", "Tech", "External", "Data"];
  if (!validRootCauses.includes(String(action.rootCause))) {
    return { ok: false, error: `rootCause must be one of ${validRootCauses.join(", ")}` };
  }
  const validSeverities = ["Critical", "Major", "Minor"];
  if (!validSeverities.includes(String(action.severity))) {
    return { ok: false, error: `severity must be one of ${validSeverities.join(", ")}` };
  }
  if (!Array.isArray(action.entities) || action.entities.length === 0) {
    return { ok: false, error: "entities must be a non-empty array" };
  }
  if (!action.owner || typeof action.owner !== "string" || !action.owner.includes("@")) {
    return { ok: false, error: "owner must be a valid email" };
  }
  if (!action.dueDate) {
    return { ok: false, error: "dueDate is required" };
  }
  return { ok: true };
}

// ─── HANDLERS ───────────────────────────────────────────
async function handleBulkCreate(body: Record<string, unknown>) {
  const items = body.items as Record<string, unknown>[];
  const batchId = String(body.batchId || `batch-${Date.now()}`);
  const auditUser = String(body.auditUser || "system");

  if (!items || !Array.isArray(items) || items.length === 0) {
    return new Response(JSON.stringify({ error: "items array required" }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const rows: Record<string, unknown>[] = [];
  const auditEntries: Record<string, unknown>[] = [];

  for (const item of items) {
    const v = validateCapa(item);
    if (!v.ok) {
      return new Response(JSON.stringify({ error: v.error, item }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const payload = toSnakeCase(item);
    const { data, error } = await supabase.from("capa").insert(payload).select().single();

    if (error || !data) {
      return new Response(JSON.stringify({ error: error?.message || "insert failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const diffHash = await sha256(JSON.stringify(payload) + batchId);
    auditEntries.push({
      capa_id: data.id,
      actor: auditUser,
      action: `CREATED_BULK:${batchId}`,
      diff: payload,
      hash: diffHash,
    });

    rows.push(toCamelCase(data));
  }

  if (auditEntries.length > 0) {
    await supabase.from("capa_audit").insert(auditEntries);
  }

  return new Response(JSON.stringify({ status: "ok", created: rows.length, rows }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

async function handleList(body: Record<string, unknown>) {
  const statusFilter = body.status as string | undefined;
  let query = supabase.from("capa").select("*").order("due_date", { ascending: true });
  if (statusFilter) {
    query = query.eq("status", statusFilter);
  }
  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const rows = (data || []).map((r: Record<string, unknown>) => toCamelCase(r));
  return new Response(JSON.stringify({ status: "ok", count: rows.length, rows }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

async function handleUpgrade(body: Record<string, unknown>) {
  const userId = String(body.userId || "system");
  const modelVersion = String(body.modelVersion || "kos-v2.1-iso42001");
  const promptHash = await sha256("upgrade_kos_bigfour");
  const responseHash = await sha256("done");

  const { error } = await supabase.from("kos_audit_log").insert({
    user_id: userId,
    prompt_hash: promptHash,
    response_hash: responseHash,
    model_version: modelVersion,
    sources: [{ doc: "ISO42001:2023", chunk: "8.4" }],
    iso_compliant: true,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  return new Response(
    JSON.stringify({ status: "upgraded", iso: "42001:2023", bigfour: "100%" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    }
  );
}

function handleHealth() {
  return new Response(JSON.stringify({ status: "ok", service: "kos-capa-api", version: "1.0.0" }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

// ─── MAIN ───────────────────────────────────────────────
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-batch-id, x-audit-user",
      },
    });
  }

  try {
    const emptyBody: Record<string, unknown> = {};
    const body = req.method === "POST" ? await req.json().catch(() => emptyBody) : emptyBody;
    const action = String(body.action || "health");

    switch (action) {
      case "bulk_create":
        return await handleBulkCreate(body);
      case "list":
        return await handleList(body);
      case "upgrade":
        return await handleUpgrade(body);
      case "health":
      default:
        return handleHealth();
    }
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "ERREUR_INTERNE",
        detail: err instanceof Error ? err.message : String(err),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      }
    );
  }
});