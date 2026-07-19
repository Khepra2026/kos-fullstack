// Supabase Edge Function: kos-revalidate
// Équivalent Next.js ISR revalidatePath / revalidateTag pour la stack KHEPRA (Netlify + Cloudflare)
// Miroite l'API: POST { path?: string, tag?: string } → { revalidated: true, now: number }

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const CF_ZONE_ID = Deno.env.get("CF_ZONE_ID") ?? "";
const CF_API_TOKEN = Deno.env.get("CF_API_TOKEN") ?? "";
const NETLIFY_SITE_ID = Deno.env.get("NETLIFY_SITE_ID") ?? "";
const NETLIFY_TOKEN = Deno.env.get("NETLIFY_TOKEN") ?? "";
const NETLIFY_DEPLOY_HOOK = Deno.env.get("NETLIFY_DEPLOY_HOOK") ?? "";

const KHEPRA_DOMAIN = "https://khepraexperts.com";

interface RevalidateRequest {
  path?: string;
  tag?: string;
}

interface RevalidateResult {
  revalidated: boolean;
  now: number;
  path?: string;
  tag?: string;
  provider: string;
  status: number;
  fullSite?: boolean;
  cfRay?: string | null;
  detail?: string;
}

function logError(context: string, err: unknown) {
  console.error(`[kos-revalidate] ${context}:`, err);
}

async function safeJson(res: Response): Promise<Record<string, unknown> | null> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function purgeByPath(path: string): Promise<{
  success: boolean;
  status: number;
  provider: string;
  cfRay?: string | null;
}> {
  const targetUrl = path.startsWith("http") ? path : `${KHEPRA_DOMAIN}${path}`;

  if (CF_ZONE_ID && CF_API_TOKEN) {
    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${CF_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ files: [targetUrl] }),
        }
      );
      return {
        success: res.ok,
        status: res.status,
        provider: "cloudflare",
        cfRay: res.headers.get("cf-ray"),
      };
    } catch (e) {
      logError("cloudflare path purge", e);
    }
  }

  if (NETLIFY_DEPLOY_HOOK) {
    try {
      const res = await fetch(NETLIFY_DEPLOY_HOOK, { method: "POST" });
      return {
        success: res.ok,
        status: res.status,
        provider: "netlify-deploy-hook",
        cfRay: null,
      };
    } catch (e) {
      logError("netlify deploy hook", e);
    }
  }

  if (NETLIFY_SITE_ID && NETLIFY_TOKEN) {
    try {
      const res = await fetch(
        `https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/builds`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${NETLIFY_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clear_cache: true,
            title: `Revalidate path: ${path}`,
          }),
        }
      );
      return {
        success: res.ok,
        status: res.status,
        provider: "netlify-api",
        cfRay: null,
      };
    } catch (e) {
      logError("netlify api build", e);
    }
  }

  return { success: false, status: 0, provider: "none", cfRay: null };
}

async function purgeByTag(tag: string): Promise<{
  success: boolean;
  status: number;
  provider: string;
  cfRay?: string | null;
}> {
  if (CF_ZONE_ID && CF_API_TOKEN) {
    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${CF_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tags: [tag] }),
        }
      );
      const data = await safeJson(res);
      return {
        success: res.ok && data?.success !== false,
        status: res.status,
        provider: "cloudflare-tag",
        cfRay: res.headers.get("cf-ray"),
      };
    } catch (e) {
      logError("cloudflare tag purge", e);
    }
  }

  if (NETLIFY_DEPLOY_HOOK) {
    try {
      const res = await fetch(NETLIFY_DEPLOY_HOOK, { method: "POST" });
      return {
        success: res.ok,
        status: res.status,
        provider: "netlify-deploy-hook (tag fallback)",
        cfRay: null,
      };
    } catch (e) {
      logError("netlify deploy hook tag fallback", e);
    }
  }

  if (NETLIFY_SITE_ID && NETLIFY_TOKEN) {
    try {
      const res = await fetch(
        `https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/builds`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${NETLIFY_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clear_cache: true,
            title: `Revalidate tag: ${tag}`,
          }),
        }
      );
      return {
        success: res.ok,
        status: res.status,
        provider: "netlify-api (tag fallback)",
        cfRay: null,
      };
    } catch (e) {
      logError("netlify api build tag fallback", e);
    }
  }

  return { success: false, status: 0, provider: "none", cfRay: null };
}

async function purgeFullSite(): Promise<{
  success: boolean;
  status: number;
  provider: string;
  cfRay?: string | null;
}> {
  if (NETLIFY_DEPLOY_HOOK) {
    try {
      const res = await fetch(NETLIFY_DEPLOY_HOOK, { method: "POST" });
      return {
        success: res.ok,
        status: res.status,
        provider: "netlify-deploy-hook (full)",
        cfRay: null,
      };
    } catch (e) {
      logError("netlify full deploy hook", e);
    }
  }

  if (CF_ZONE_ID && CF_API_TOKEN) {
    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${CF_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ purge_everything: true }),
        }
      );
      const data = await safeJson(res);
      return {
        success: res.ok && data?.success !== false,
        status: res.status,
        provider: "cloudflare-full",
        cfRay: res.headers.get("cf-ray"),
      };
    } catch (e) {
      logError("cloudflare full purge", e);
    }
  }

  if (NETLIFY_SITE_ID && NETLIFY_TOKEN) {
    try {
      const res = await fetch(
        `https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/builds`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${NETLIFY_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clear_cache: true,
            title: "Full site revalidation (KOS ISR)",
          }),
        }
      );
      return {
        success: res.ok,
        status: res.status,
        provider: "netlify-api (full)",
        cfRay: null,
      };
    } catch (e) {
      logError("netlify api full build", e);
    }
  }

  return { success: false, status: 0, provider: "none", cfRay: null };
}

async function logRevalidate(
  supabase: any,
  result: RevalidateResult
) {
  try {
    await supabase.from("cache_purge_log").insert({
      slug: result.path ?? result.tag ?? "/",
      table_source: "kos_revalidate",
      operation: result.fullSite ? "full_site" : result.tag ? "tag_purge" : "path_purge",
      provider: result.provider,
      status: result.status,
      success: result.revalidated,
      cf_ray: result.cfRay,
      triggered_by: "kos-revalidate-edge",
      purged_at: new Date().toISOString(),
    });
  } catch (e) {
    logError("supabase log insert", e);
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
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  }

  const authHeader = req.headers.get("Authorization") ?? "";
  const isServiceRole = authHeader.includes(SUPABASE_SERVICE_ROLE.slice(0, 10));
  if (!isServiceRole && !authHeader.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: RevalidateRequest;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { path, tag } = body;

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
    auth: { persistSession: false },
  });

  let result: RevalidateResult;

  try {
    if (path) {
      const purge = await purgeByPath(path);
      result = {
        revalidated: purge.success,
        now: Date.now(),
        path,
        provider: purge.provider,
        status: purge.status,
        cfRay: purge.cfRay ?? null,
      };
    } else if (tag) {
      const purge = await purgeByTag(tag);
      result = {
        revalidated: purge.success,
        now: Date.now(),
        tag,
        provider: purge.provider,
        status: purge.status,
        cfRay: purge.cfRay ?? null,
      };
    } else {
      const purge = await purgeFullSite();
      result = {
        revalidated: purge.success,
        now: Date.now(),
        fullSite: true,
        provider: purge.provider,
        status: purge.status,
        cfRay: purge.cfRay ?? null,
      };
    }

    await logRevalidate(supabase, result);

    return new Response(JSON.stringify(result), {
      status: result.revalidated ? 200 : 502,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    logError("main handler", err);
    result = {
      revalidated: false,
      now: Date.now(),
      provider: "error",
      status: 500,
      detail: err instanceof Error ? err.message : "Revalidation failed",
    };
    await logRevalidate(supabase, result);
    return new Response(JSON.stringify(result), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
