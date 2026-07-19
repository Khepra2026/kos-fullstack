// Supabase Edge Function: cache-purge-handler
// Adapte le système de purge Cloudflare du snippet Meta AI pour Netlify + option Cloudflare
// Reçoit les webhooks de purge depuis pg_net (Supabase) ou Database Webhooks
// v2.0: Ajout support tag-based purge + full-site purge

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const CF_ZONE_ID = Deno.env.get("CF_ZONE_ID") ?? "";
const CF_API_TOKEN = Deno.env.get("CF_API_TOKEN") ?? "";
const NETLIFY_SITE_ID = Deno.env.get("NETLIFY_SITE_ID") ?? "";
const NETLIFY_TOKEN = Deno.env.get("NETLIFY_TOKEN") ?? "";
const NETLIFY_DEPLOY_HOOK = Deno.env.get("NETLIFY_DEPLOY_HOOK") ?? "";

const KHEPRA_DOMAIN = "https://khepraexperts.com";

interface PurgePayload {
  slug?: string;
  path?: string;
  tag?: string;
  full?: boolean;
  table?: string;
  operation?: string;
  triggered_by?: string;
}

function logError(context: string, err: unknown) {
  console.error(`[cache-purge] ${context}:`, err);
}

async function safeJson(res: Response): Promise<Record<string, unknown> | null> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function logToSupabase(supabase: any, record: Record<string, unknown>) {
  try {
    await supabase.from("cache_purge_log").insert(record);
  } catch (e) {
    logError("supabase log insert", e);
  }
}

async function purgeCloudflareByUrl(url: string): Promise<{ success: boolean; status: number; cfRay?: string | null }> {
  if (!CF_ZONE_ID || !CF_API_TOKEN) return { success: false, status: 0, cfRay: null };
  try {
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ files: [url] }),
    });
    return { success: res.ok, status: res.status, cfRay: res.headers.get("cf-ray") };
  } catch (e) {
    logError("cloudflare url purge", e);
    return { success: false, status: 0, cfRay: null };
  }
}

async function purgeCloudflareByTag(tag: string): Promise<{ success: boolean; status: number; cfRay?: string | null }> {
  if (!CF_ZONE_ID || !CF_API_TOKEN) return { success: false, status: 0, cfRay: null };
  try {
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags: [tag] }),
    });
    const data = await safeJson(res);
    return { success: res.ok && data?.success !== false, status: res.status, cfRay: res.headers.get("cf-ray") };
  } catch (e) {
    logError("cloudflare tag purge", e);
    return { success: false, status: 0, cfRay: null };
  }
}

async function purgeCloudflareFull(): Promise<{ success: boolean; status: number; cfRay?: string | null }> {
  if (!CF_ZONE_ID || !CF_API_TOKEN) return { success: false, status: 0, cfRay: null };
  try {
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ purge_everything: true }),
    });
    const data = await safeJson(res);
    return { success: res.ok && data?.success !== false, status: res.status, cfRay: res.headers.get("cf-ray") };
  } catch (e) {
    logError("cloudflare full purge", e);
    return { success: false, status: 0, cfRay: null };
  }
}

async function purgeNetlifyDeployHook(): Promise<{ success: boolean; status: number }> {
  if (!NETLIFY_DEPLOY_HOOK) return { success: false, status: 0 };
  try {
    const res = await fetch(NETLIFY_DEPLOY_HOOK, { method: "POST" });
    return { success: res.ok, status: res.status };
  } catch (e) {
    logError("netlify deploy hook", e);
    return { success: false, status: 0 };
  }
}

async function purgeNetlifyApi(title: string): Promise<{ success: boolean; status: number }> {
  if (!NETLIFY_SITE_ID || !NETLIFY_TOKEN) return { success: false, status: 0 };
  try {
    const res = await fetch(`https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/builds`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NETLIFY_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clear_cache: true, title }),
    });
    return { success: res.ok, status: res.status };
  } catch (e) {
    logError("netlify api build", e);
    return { success: false, status: 0 };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let payload: PurgePayload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { slug, path, tag, full, table = "kb_pages", operation = "update", triggered_by = "system" } = payload;

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
    auth: { persistSession: false },
  });

  let cfResult = { success: false, status: 0, cfRay: null as string | null };
  let nlResult = { success: false, status: 0 };
  let purgeMode = "slug";

  // ── Mode FULL SITE ──
  if (full) {
    purgeMode = "full";
    cfResult = await purgeCloudflareFull();
    if (!cfResult.success) {
      nlResult = await purgeNetlifyDeployHook();
      if (!nlResult.success) nlResult = await purgeNetlifyApi("Full site purge (cache-purge-handler)");
    }
  }
  // ── Mode TAG ──
  else if (tag) {
    purgeMode = "tag";
    cfResult = await purgeCloudflareByTag(tag);
    if (!cfResult.success) {
      nlResult = await purgeNetlifyDeployHook();
      if (!nlResult.success) nlResult = await purgeNetlifyApi(`Tag purge: ${tag}`);
    }
  }
  // ── Mode PATH (nouveau, prioritaire sur slug) ──
  else if (path) {
    purgeMode = "path";
    const targetUrl = path.startsWith("http") ? path : `${KHEPRA_DOMAIN}${path}`;
    cfResult = await purgeCloudflareByUrl(targetUrl);
    if (!cfResult.success) {
      nlResult = await purgeNetlifyDeployHook();
      if (!nlResult.success) nlResult = await purgeNetlifyApi(`Path purge: ${path}`);
    }
  }
  // ── Mode SLUG (legacy) ──
  else if (slug) {
    const targetUrl = `${KHEPRA_DOMAIN}/${slug}`;
    cfResult = await purgeCloudflareByUrl(targetUrl);
    if (!cfResult.success) {
      nlResult = await purgeNetlifyDeployHook();
      if (!nlResult.success) nlResult = await purgeNetlifyApi(`Cache purge for ${slug}`);
    }
  } else {
    return new Response(JSON.stringify({ error: "Missing slug, path, tag or full flag" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const finalStatus = cfResult.success ? cfResult.status : nlResult.status;
  const finalSuccess = cfResult.success || nlResult.success;
  const provider = cfResult.success ? "cloudflare" : nlResult.success ? "netlify" : "none";

  await logToSupabase(supabase, {
    slug: slug ?? path ?? tag ?? "/",
    table_source: table,
    operation: `${operation}_${purgeMode}`,
    provider,
    status: finalStatus,
    success: finalSuccess,
    cf_ray: cfResult.cfRay,
    triggered_by,
    purged_at: new Date().toISOString(),
  });

  return new Response(
    JSON.stringify({
      success: finalSuccess,
      slug: slug ?? path ?? tag ?? "/",
      provider,
      status: finalStatus,
      cf_ray: cfResult.cfRay,
      mode: purgeMode,
    }),
    {
      status: finalSuccess ? 200 : 502,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
});
