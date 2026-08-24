import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CredentialsRequest {
  action: "save" | "get" | "list" | "delete";
  platform?: string;
  credentials?: Record<string, string>;
  credential_name?: string;
}

async function verifyAdminAccess(req: Request): Promise<boolean> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;

  try {
    const token = authHeader.replace("Bearer ", "");
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const payload = JSON.parse(atob(parts[1]));
    const userId = payload.sub;
    if (!userId) return false;

    // Verify user exists and has admin role
    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .maybeSingle();

    if (error || !profile) return false;

    // Only admin or superadmin can manage platform credentials
    const allowedRoles = ["admin", "superadmin", "owner"];
    return allowedRoles.includes(profile.role?.toLowerCase() ?? "");
  } catch {
    return false;
  }
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // ═══════════════════════════════════════════
  // 🔐 JWT VERIFICATION — enforced by Supabase
  // Additional admin role check
  // ═══════════════════════════════════════════
  const isAdmin = await verifyAdminAccess(req);
  if (!isAdmin) {
    return new Response(
      JSON.stringify({ success: false, error: "Access denied. Admin role required." }),
      { headers: corsHeaders, status: 403 }
    );
  }

  try {
    const body: CredentialsRequest = await req.json();
    const { action, platform, credentials, credential_name } = body;

    // ─── SAVE ───
    if (action === "save") {
      if (!platform || !credentials || Object.keys(credentials).length === 0) {
        return new Response(
          JSON.stringify({ success: false, error: "platform and credentials are required" }),
          { headers: corsHeaders, status: 400 }
        );
      }

      const saved: string[] = [];
      for (const [name, value] of Object.entries(credentials)) {
        if (!value?.trim()) continue;

        const { error } = await supabaseAdmin
          .from("platform_credentials")
          .upsert({
            platform,
            credential_name: name,
            credential_value: value.trim(),
            is_active: true,
            updated_at: new Date().toISOString(),
          }, { onConflict: "platform,credential_name" });

        if (error) {
          console.error(`Failed to save ${platform}/${name}:`, error);
        } else {
          saved.push(name);
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          platform,
          saved_credentials: saved,
          message: `${saved.length} credential(s) saved for ${platform}`,
        }),
        { headers: corsHeaders }
      );
    }

    // ─── GET ───
    if (action === "get") {
      if (!platform) {
        return new Response(
          JSON.stringify({ success: false, error: "platform is required" }),
          { headers: corsHeaders, status: 400 }
        );
      }

      const { data, error } = await supabaseAdmin
        .from("platform_credentials")
        .select("credential_name, credential_value, updated_at")
        .eq("platform", platform)
        .eq("is_active", true);

      if (error) {
        return new Response(
          JSON.stringify({ success: false, error: error.message }),
          { headers: corsHeaders, status: 500 }
        );
      }

      const credentials: Record<string, string> = {};
      let lastUpdated: string | null = null;
      for (const row of (data || [])) {
        credentials[row.credential_name] = row.credential_value;
        if (!lastUpdated || row.updated_at > lastUpdated) {
          lastUpdated = row.updated_at;
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          platform,
          configured: Object.keys(credentials).length > 0,
          credentials,
          last_updated: lastUpdated,
        }),
        { headers: corsHeaders }
      );
    }

    // ─── LIST ───
    if (action === "list") {
      const { data, error } = await supabaseAdmin
        .from("platform_credentials")
        .select("platform, credential_name, updated_at")
        .eq("is_active", true)
        .order("platform");

      if (error) {
        return new Response(
          JSON.stringify({ success: false, error: error.message }),
          { headers: corsHeaders, status: 500 }
        );
      }

      const platforms: Record<string, { credential_count: number; last_updated: string | null }> = {};
      for (const row of (data || [])) {
        if (!platforms[row.platform]) {
          platforms[row.platform] = { credential_count: 0, last_updated: null };
        }
        platforms[row.platform].credential_count++;
        if (!platforms[row.platform].last_updated || row.updated_at > platforms[row.platform].last_updated!) {
          platforms[row.platform].last_updated = row.updated_at;
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          platforms: Object.entries(platforms).map(([platform, info]) => ({
            platform,
            ...info,
            configured: info.credential_count > 0,
          })),
        }),
        { headers: corsHeaders }
      );
    }

    // ─── DELETE ───
    if (action === "delete") {
      if (!platform) {
        return new Response(
          JSON.stringify({ success: false, error: "platform is required" }),
          { headers: corsHeaders, status: 400 }
        );
      }

      if (credential_name) {
        const { error } = await supabaseAdmin
          .from("platform_credentials")
          .update({ is_active: false, updated_at: new Date().toISOString() })
          .eq("platform", platform)
          .eq("credential_name", credential_name);

        if (error) {
          return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { headers: corsHeaders, status: 500 }
          );
        }

        return new Response(
          JSON.stringify({ success: true, message: `Deleted ${platform}/${credential_name}` }),
          { headers: corsHeaders }
        );
      }

      const { error } = await supabaseAdmin
        .from("platform_credentials")
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq("platform", platform);

      if (error) {
        return new Response(
          JSON.stringify({ success: false, error: error.message }),
          { headers: corsHeaders, status: 500 }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: `All credentials deleted for ${platform}` }),
        { headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: "Invalid action. Use: save, get, list, delete" }),
      { headers: corsHeaders, status: 400 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err instanceof Error ? err.message : "Internal server error",
      }),
      { headers: corsHeaders, status: 500 }
    );
  }
});
