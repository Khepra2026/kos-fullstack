import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const LINKEDIN_COMPANY = "khepra-experts";
const LINKEDIN_COMPANY_URL = `https://www.linkedin.com/company/${LINKEDIN_COMPANY}`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ═══════════════════════════════════════════════════
// KOS LINKEDIN BRIDGE v2
// Agrégateur multi-source LinkedIn
// v2 : JWT + Admin sur capture, fetch public
// ═══════════════════════════════════════════════════

async function authenticate(req: Request): Promise<{ isAdmin: boolean; isServiceRole: boolean }> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { isAdmin: false, isServiceRole: false };
  }

  const token = authHeader.replace("Bearer ", "");
  if (token === serviceRoleKey) return { isAdmin: true, isServiceRole: true };

  try {
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user) return { isAdmin: false, isServiceRole: false };
    const { data: profile } = await supabaseAdmin.from("profiles").select("system_role").eq("id", user.id).maybeSingle();
    const isAdmin = profile?.system_role === "admin" || profile?.system_role === "superadmin" || profile?.system_role === "owner";
    return { isAdmin, isServiceRole: false };
  } catch {
    return { isAdmin: false, isServiceRole: false };
  }
}

interface BridgeResult {
  company_name: string | null;
  description: string | null;
  industry: string | null;
  logo_url: string | null;
  followers: number | null;
  employee_count: number | null;
  tagline: string | null;
  source: "oembed" | "opengraph" | "snapshot" | "multi";
  confidence: number;
  sources_detail: { oembed: boolean; opengraph: boolean; snapshot: boolean; };
  last_updated: string;
}

async function fetchOEmbed(url: string): Promise<Partial<BridgeResult> | null> {
  try {
    const oembedUrl = `https://www.linkedin.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const response = await fetch(oembedUrl, { headers: { "User-Agent": "KOS-LinkedIn-Bridge/2.0" } });
    if (!response.ok) return null;
    const data = await response.json();
    return { company_name: data.author_name || data.title || null, description: data.description || null, logo_url: data.thumbnail_url || null };
  } catch { return null; }
}

async function fetchOpenGraph(): Promise<Partial<BridgeResult> | null> {
  try {
    const response = await fetch(LINKEDIN_COMPANY_URL, { headers: { "User-Agent": "Mozilla/5.0 (compatible; KOS-Bridge/2.0; +https://khepraexperts.com)", "Accept-Language": "fr-FR,fr;q=0.9" } });
    if (!response.ok) return null;
    const html = await response.text();
    const result: Partial<BridgeResult> = {};
    const ogTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
    if (ogTitle) result.company_name = ogTitle[1];
    const ogDesc = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
    if (ogDesc) result.description = ogDesc[1];
    const ogImage = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
    if (ogImage) result.logo_url = ogImage[1];
    const followerMatch = html.match(/(\d[\d,]*)\s*(?:followers|abonnés)/i);
    if (followerMatch) { const cleaned = followerMatch[1].replace(/,/g, ""); result.followers = parseInt(cleaned, 10) || null; }
    return Object.keys(result).length > 0 ? result : null;
  } catch { return null; }
}

async function fetchSnapshots(profileType: string): Promise<Partial<BridgeResult> | null> {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) return null;
    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data, error } = await supabase.from("linkedin_snapshots").select("snapshot_data").eq("profile_type", profileType).eq("is_active", true).order("captured_at", { ascending: false }).limit(1).maybeSingle();
    if (error || !data) return null;
    const snap = data.snapshot_data as Record<string, unknown>;
    return { followers: typeof snap.followers === "number" ? snap.followers : null, employee_count: typeof snap.employee_count === "number" ? snap.employee_count : null, description: typeof snap.description === "string" ? snap.description : null, industry: typeof snap.industry === "string" ? snap.industry : null, tagline: typeof snap.tagline === "string" ? snap.tagline : null, company_name: typeof snap.company_name === "string" ? snap.company_name : null, logo_url: typeof snap.logo_url === "string" ? snap.logo_url : null };
  } catch { return null; }
}

async function captureSnapshot(profileType: string, data: Record<string, unknown>): Promise<boolean> {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) return false;
    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
    await supabase.from("linkedin_snapshots").update({ is_active: false }).eq("profile_type", profileType);
    const { error } = await supabase.from("linkedin_snapshots").insert({ profile_type: profileType, source: "manual", snapshot_data: data, is_active: true });
    return !error;
  } catch { return false; }
}

async function fetchGoogleCache(): Promise<Partial<BridgeResult> | null> {
  try {
    const cacheUrl = `https://webcache.googleusercontent.com/search?q=cache:${encodeURIComponent(LINKEDIN_COMPANY_URL)}&strip=1&vwsrc=0`;
    const response = await fetch(cacheUrl, { headers: { "User-Agent": "Mozilla/5.0 (compatible; KOS-Bridge/2.0)" } });
    if (!response.ok) return null;
    const html = await response.text();
    const result: Partial<BridgeResult> = {};
    const followerMatch = html.match(/(\d[\d,]*)\s*(?:followers|abonnés)/i);
    if (followerMatch) { const cleaned = followerMatch[1].replace(/,/g, ""); result.followers = parseInt(cleaned, 10) || null; }
    const ogDesc = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
    if (ogDesc) result.description = ogDesc[1];
    return Object.keys(result).length > 0 ? result : null;
  } catch { return null; }
}

function aggregateResults(oembed: Partial<BridgeResult> | null, opengraph: Partial<BridgeResult> | null, snapshot: Partial<BridgeResult> | null, googleCache: Partial<BridgeResult> | null): BridgeResult {
  const merged: BridgeResult = { company_name: null, description: null, industry: null, logo_url: null, followers: null, employee_count: null, tagline: null, source: "multi", confidence: 0, sources_detail: { oembed: false, opengraph: false, snapshot: false }, last_updated: new Date().toISOString() };
  merged.sources_detail.oembed = oembed !== null;
  merged.sources_detail.opengraph = opengraph !== null;
  merged.sources_detail.snapshot = snapshot !== null;
  merged.company_name = oembed?.company_name || opengraph?.company_name || snapshot?.company_name || null;
  merged.description = opengraph?.description || oembed?.description || snapshot?.description || googleCache?.description || null;
  merged.logo_url = oembed?.logo_url || opengraph?.logo_url || null;
  merged.industry = snapshot?.industry || null;
  merged.followers = snapshot?.followers || googleCache?.followers || opengraph?.followers || null;
  merged.employee_count = snapshot?.employee_count || null;
  merged.tagline = snapshot?.tagline || null;
  let confScore = 0;
  if (merged.company_name) confScore += 25;
  if (merged.description) confScore += 20;
  if (merged.logo_url) confScore += 15;
  if (merged.followers) confScore += 25;
  if (merged.industry) confScore += 10;
  if (merged.employee_count) confScore += 5;
  merged.confidence = confScore;
  const sourceCount = [oembed, opengraph, snapshot].filter(s => s !== null).length;
  if (sourceCount >= 2) merged.source = "multi";
  else if (oembed) merged.source = "oembed";
  else if (opengraph) merged.source = "opengraph";
  else if (snapshot) merged.source = "snapshot";
  return merged;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "fetch";

    // ─── CAPTURE : JWT + Admin requis ───
    if (action === "capture" && req.method === "POST") {
      const { isAdmin, isServiceRole } = await authenticate(req);
      if (!isAdmin && !isServiceRole) {
        return new Response(JSON.stringify({ success: false, error: "Accès non autorisé — JWT Admin requis pour la capture", error_code: "UNAUTHORIZED", engine: "kos-linkedin-bridge-v2" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const body = await req.json();
      const profileType = body.profile_type || "company";
      const snapshotData: Record<string, unknown> = {};
      if (body.followers !== undefined) snapshotData.followers = body.followers;
      if (body.employee_count !== undefined) snapshotData.employee_count = body.employee_count;
      if (body.industry !== undefined) snapshotData.industry = body.industry;
      if (body.description !== undefined) snapshotData.description = body.description;
      if (body.tagline !== undefined) snapshotData.tagline = body.tagline;
      if (body.company_name !== undefined) snapshotData.company_name = body.company_name;
      if (body.logo_url !== undefined) snapshotData.logo_url = body.logo_url;

      const success = await captureSnapshot(profileType, snapshotData);
      return new Response(JSON.stringify({ success, message: success ? `Snapshot ${profileType} capturé avec succès` : "Échec de la capture du snapshot", profile_type: profileType, captured_at: new Date().toISOString(), engine: "kos-linkedin-bridge-v2", auth_mode: isServiceRole ? "service_role" : "jwt_admin" }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: success ? 200 : 500 });
    }

    // ─── FETCH : Public (OEmbed) ou JWT (si snapshot requis) ───
    const profileType = url.searchParams.get("profile_type") || "company";
    const [oembed, opengraph, snapshot, googleCache] = await Promise.all([
      fetchOEmbed(LINKEDIN_COMPANY_URL),
      fetchOpenGraph(),
      fetchSnapshots(profileType),
      fetchGoogleCache(),
    ]);
    const result = aggregateResults(oembed, opengraph, snapshot, googleCache);
    return new Response(JSON.stringify({ ...result, engine: "kos-linkedin-bridge-v2" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Internal bridge error", company_name: null, description: null, industry: null, logo_url: null, followers: null, employee_count: null, tagline: null, source: "oembed" as const, confidence: 0, sources_detail: { oembed: false, opengraph: false, snapshot: false }, last_updated: new Date().toISOString(), engine: "kos-linkedin-bridge-v2" }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 });
  }
});