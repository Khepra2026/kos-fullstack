import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LINKEDIN_AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization";
const LINKEDIN_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken";
const LINKEDIN_USERINFO_URL = "https://api.linkedin.com/v2/userinfo";
const LINKEDIN_ME_URL = "https://api.linkedin.com/v2/me";

let _cachedClientId: string | null = null;
let _cachedClientSecret: string | null = null;
let _cacheFilled = false;

async function resolveCredentials(supabase: ReturnType<typeof createClient>) {
  if (_cacheFilled) return;

  const secretId = Deno.env.get("LINKEDIN_CLIENT_ID");
  const secretSecret = Deno.env.get("LINKEDIN_CLIENT_SECRET");

  if (secretId && secretSecret) {
    _cachedClientId = secretId;
    _cachedClientSecret = secretSecret;
    _cacheFilled = true;
    return;
  }

  try {
    const { data: creds } = await supabase
      .from("platform_credentials")
      .select("credential_name, credential_value")
      .eq("platform", "linkedin")
      .eq("is_active", true);

    if (creds && creds.length > 0) {
      for (const row of creds) {
        if (row.credential_name === "client_id" || row.credential_name === "LINKEDIN_CLIENT_ID") {
          _cachedClientId = _cachedClientId || row.credential_value;
        }
        if (row.credential_name === "client_secret" || row.credential_name === "LINKEDIN_CLIENT_SECRET") {
          _cachedClientSecret = _cachedClientSecret || row.credential_value;
        }
      }
    }
  } catch (err) {
    console.error("Failed to fetch credentials from platform_credentials:", err);
  }

  _cacheFilled = true;
}

function getClientId(): string { return _cachedClientId || ""; }
function getClientSecret(): string { return _cachedClientSecret || ""; }
function getOrgId(): string {
  const raw = Deno.env.get("LINKEDIN_ORGANIZATION_ID") || "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return "";
  return raw;
}
function getRedirectUri(): string { return "https://khepraexperts.com/linkedin-callback"; }
function generateState(): string { return crypto.randomUUID(); }

interface TokenData {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  scope: string;
  id_token?: string;
}

interface LinkedInUser {
  sub: string; name: string; email: string;
  picture?: string; given_name?: string; family_name?: string;
}

async function doRefreshToken(
  supabase: ReturnType<typeof createClient>,
  silent: boolean
): Promise<{ success: boolean; error?: string; needs_reauth?: boolean; auto_refreshed?: boolean }> {
  const clientId = getClientId();
  const clientSecret = getClientSecret();
  if (!clientId || !clientSecret) {
    return { success: false, error: "Credentials LinkedIn non configurés" };
  }

  const { data: refreshRow } = await supabase
    .from("social_api_tokens")
    .select("token_value")
    .eq("provider", "linkedin")
    .eq("token_name", "refresh_token")
    .eq("is_active", true)
    .maybeSingle();

  if (!refreshRow?.token_value) {
    return { success: false, error: "Aucun refresh token disponible", needs_reauth: true };
  }

  const refreshBody = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshRow.token_value,
    client_id: clientId,
    client_secret: clientSecret,
  });

  try {
    const resp = await fetch(LINKEDIN_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: refreshBody.toString(),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      await supabase.from("social_api_tokens").update({ is_active: false, updated_at: new Date().toISOString() }).eq("provider", "linkedin").eq("token_name", "access_token");
      if (!silent) {
        console.error(`[KOS-OAUTH] Token refresh FAILED: ${errText.substring(0, 200)}`);
      }
      return { success: false, error: `Échec refresh: ${errText.substring(0, 200)}`, needs_reauth: true };
    }

    const tokenData: TokenData = await resp.json();
    const expiresAt = new Date(Date.now() + (tokenData.expires_in * 1000)).toISOString();
    const now = new Date().toISOString();

    await supabase.from("social_api_tokens").update({
      token_value: tokenData.access_token,
      expires_at: expiresAt,
      updated_at: now,
      last_used_at: now,
      is_active: true,
    }).eq("provider", "linkedin").eq("token_name", "access_token");

    if (tokenData.refresh_token) {
      await supabase.from("social_api_tokens").update({
        token_value: tokenData.refresh_token,
        updated_at: now,
        last_used_at: now,
      }).eq("provider", "linkedin").eq("token_name", "refresh_token");
    }

    console.log(`[KOS-OAUTH] Token auto-refreshed successfully. New expiry: ${expiresAt}`);
    return { success: true, auto_refreshed: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Erreur réseau refresh" };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "status";
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });

    await resolveCredentials(supabase);

    // ═══════════════════════════════════════════════
    // SAVE_CREDENTIALS (POST)
    // ═══════════════════════════════════════════════
    if (action === "save_credentials" && req.method === "POST") {
      let body: { client_id?: string; client_secret?: string };
      try { body = await req.json(); } catch {
        return new Response(JSON.stringify({ success: false, error: "JSON body requis" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const { client_id, client_secret } = body;
      if (!client_id?.trim() || !client_secret?.trim()) {
        return new Response(JSON.stringify({ success: false, error: "client_id et client_secret sont requis" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const now = new Date().toISOString();
      const saved: string[] = [];
      const { error: err1 } = await supabase.from("platform_credentials").upsert({ platform: "linkedin", credential_name: "client_id", credential_value: client_id.trim(), is_active: true, updated_at: now }, { onConflict: "platform,credential_name" });
      if (err1) console.error("Failed to save client_id:", err1); else saved.push("client_id");
      const { error: err2 } = await supabase.from("platform_credentials").upsert({ platform: "linkedin", credential_name: "client_secret", credential_value: client_secret.trim(), is_active: true, updated_at: now }, { onConflict: "platform,credential_name" });
      if (err2) console.error("Failed to save client_secret:", err2); else saved.push("client_secret");
      _cacheFilled = false; _cachedClientId = null; _cachedClientSecret = null;
      return new Response(JSON.stringify({ success: saved.length === 2, saved_credentials: saved, message: saved.length === 2 ? "Credentials LinkedIn enregistrés avec succès" : `Partiellement enregistré: ${saved.join(", ")}` }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ═══════════════════════════════════════════════
    // CALLBACK (GET)
    // ═══════════════════════════════════════════════
    if (action === "callback") {
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");
      const error = url.searchParams.get("error");
      const errorDescription = url.searchParams.get("error_description");

      if (error) {
        return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": `https://khepraexperts.com/linkedin-connect?error=${encodeURIComponent(errorDescription || error)}` } });
      }
      if (!code) {
        return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": `https://khepraexperts.com/linkedin-connect?error=${encodeURIComponent("Code d'autorisation manquant")}` } });
      }
      if (state) {
        const { data: stateData, error: stateErr } = await supabase.from("oauth_states").select("state, expires_at").eq("state", state).maybeSingle();
        if (stateErr) console.error("oauth_states lookup error:", stateErr);
        if (!stateData) {
          return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": `https://khepraexperts.com/linkedin-connect?error=${encodeURIComponent("Session expirée ou invalide — veuillez réessayer la connexion LinkedIn")}` } });
        }
        await supabase.from("oauth_states").update({ used: true }).eq("state", state);
      }

      const redirectUri = getRedirectUri();
      const clientId = getClientId();
      const clientSecret = getClientSecret();
      if (!clientId || !clientSecret) {
        return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": `https://khepraexperts.com/linkedin-connect?error=${encodeURIComponent("Credentials LinkedIn non configurés")}` } });
      }

      const tokenBody = new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirectUri, client_id: clientId, client_secret: clientSecret });
      try {
        const tokenResp = await fetch(LINKEDIN_TOKEN_URL, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: tokenBody.toString() });
        if (!tokenResp.ok) {
          const errText = await tokenResp.text();
          return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": `https://khepraexperts.com/linkedin-connect?error=${encodeURIComponent(`Erreur échange token LinkedIn: ${errText.substring(0, 200)}`)}` } });
        }
        const tokenData: TokenData = await tokenResp.json();
        let userInfo: LinkedInUser | null = null;
        try { const userResp = await fetch(LINKEDIN_USERINFO_URL, { headers: { Authorization: `Bearer ${tokenData.access_token}` } }); if (userResp.ok) userInfo = await userResp.json(); } catch { /* ignore */ }
        let memberUrn = "";
        try { const meResp = await fetch(LINKEDIN_ME_URL, { headers: { Authorization: `Bearer ${tokenData.access_token}` } }); if (meResp.ok) { const meData = await meResp.json(); memberUrn = `urn:li:person:${meData.sub}`; } } catch { /* ignore */ }
        const expiresAt = new Date(Date.now() + (tokenData.expires_in * 1000)).toISOString();
        const now = new Date().toISOString();
        await supabase.from("social_api_tokens").delete().eq("provider", "linkedin");
        const rows = [
          { provider: "linkedin", token_name: "access_token", token_value: tokenData.access_token, is_active: true, expires_at: expiresAt, updated_at: now, last_used_at: now },
          { provider: "linkedin", token_name: "metadata", token_value: JSON.stringify({ access_token: tokenData.access_token, refresh_token: tokenData.refresh_token || null, expires_at: expiresAt, scope: tokenData.scope, member_urn: memberUrn, user_name: userInfo?.name || null, user_email: userInfo?.email || null, organization_id: getOrgId() || null }), is_active: true, updated_at: now, last_used_at: now },
        ];
        if (tokenData.refresh_token) { rows.push({ provider: "linkedin", token_name: "refresh_token", token_value: tokenData.refresh_token, is_active: true, updated_at: now, last_used_at: now }); }
        await supabase.from("social_api_tokens").insert(rows);
        const userName = userInfo?.name || "Utilisateur LinkedIn";
        return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": `https://khepraexperts.com/linkedin-connect?success=true&user=${encodeURIComponent(userName)}&scopes=${encodeURIComponent(tokenData.scope)}` } });
      } catch (err) {
        return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": `https://khepraexperts.com/linkedin-connect?error=${encodeURIComponent(err instanceof Error ? err.message : "Erreur inconnue")}` } });
      }
    }

    // ═══════════════════════════════════════════════
    // AUTHORIZE (POST)
    // ═══════════════════════════════════════════════
    if (action === "authorize" && req.method === "POST") {
      const clientId = getClientId();
      const clientSecret = getClientSecret();
      if (!clientId || !clientSecret) {
        return new Response(JSON.stringify({ success: false, error: "LinkedIn Client ID non configuré.", setup_required: true }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const state = generateState();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
      await supabase.from("oauth_states").insert({ state, expires_at: expiresAt, created_at: new Date().toISOString() });
      const redirectUri = getRedirectUri();
      const scopes = ["openid", "profile", "email", "w_member_social", "w_organization_social", "r_organization_social", "rw_organization_admin"];
      const params = new URLSearchParams({ response_type: "code", client_id: clientId, redirect_uri: redirectUri, state, scope: scopes.join(" ") });
      return new Response(JSON.stringify({ success: true, auth_url: `${LINKEDIN_AUTH_URL}?${params.toString()}`, state, scopes, redirect_uri: redirectUri }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ═══════════════════════════════════════════════
    // REFRESH (POST)
    // ═══════════════════════════════════════════════
    if (action === "refresh" && req.method === "POST") {
      const result = await doRefreshToken(supabase, false);
      return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ═══════════════════════════════════════════════
    // AUTO_REFRESH (GET/POST) — Cron endpoint, refresh silencieux
    // Conçu pour être appelé par cron job à 03:00 UTC
    // ═══════════════════════════════════════════════
    if (action === "auto_refresh") {
      console.log("[KOS-OAUTH] Auto-refresh cron triggered");
      
      const { data: accessRow } = await supabase
        .from("social_api_tokens")
        .select("token_value, expires_at, is_active")
        .eq("provider", "linkedin")
        .eq("token_name", "access_token")
        .maybeSingle();

      const { data: refreshRow } = await supabase
        .from("social_api_tokens")
        .select("token_value")
        .eq("provider", "linkedin")
        .eq("token_name", "refresh_token")
        .eq("is_active", true)
        .maybeSingle();

      const { data: metaRow } = await supabase
        .from("social_api_tokens")
        .select("token_value")
        .eq("provider", "linkedin")
        .eq("token_name", "metadata")
        .maybeSingle();

      const now = new Date();
      const hasToken = accessRow?.is_active && accessRow?.token_value;
      const expired = accessRow?.expires_at ? new Date(accessRow.expires_at) < now : false;
      const expiresAt = accessRow?.expires_at ? new Date(accessRow.expires_at) : null;
      const daysUntilExpiry = expiresAt ? Math.round((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : null;
      const hasRefresh = !!refreshRow?.token_value;

      let metadata: Record<string, unknown> = {};
      try { if (metaRow?.token_value) metadata = JSON.parse(metaRow.token_value); } catch { /* ignore */ }

      let result: { action: string; auto_refreshed: boolean; error?: string; needs_reauth?: boolean; days_until_expiry?: number | null } = {
        action: "none",
        auto_refreshed: false,
        days_until_expiry: daysUntilExpiry,
      };

      // Si token valide mais expire dans < 14 jours ET on a un refresh token
      if (hasToken && !expired && hasRefresh && daysUntilExpiry !== null && daysUntilExpiry < 14) {
        console.log(`[KOS-OAUTH] Token expires in ${daysUntilExpiry} days — triggering auto-refresh`);
        const refreshResult = await doRefreshToken(supabase, true);
        if (refreshResult.success) {
          result = { action: "refreshed", auto_refreshed: true, days_until_expiry: daysUntilExpiry };
          console.log("[KOS-OAUTH] Auto-refresh successful");
        } else {
          result = { action: "refresh_failed", auto_refreshed: false, error: refreshResult.error, needs_reauth: refreshResult.needs_reauth, days_until_expiry: daysUntilExpiry };
          console.error(`[KOS-OAUTH] Auto-refresh FAILED: ${refreshResult.error}`);
        }
      } else if (!hasToken || expired) {
        result = { action: "no_valid_token", auto_refreshed: false, needs_reauth: true, days_until_expiry: daysUntilExpiry };
        console.warn("[KOS-OAUTH] No valid token to refresh — re-auth required");
      } else if (!hasRefresh) {
        result = { action: "no_refresh_token", auto_refreshed: false, days_until_expiry: daysUntilExpiry };
        console.warn("[KOS-OAUTH] No refresh token available — re-auth will be required when token expires");
      } else {
        result = { action: "healthy", auto_refreshed: false, days_until_expiry: daysUntilExpiry };
        console.log(`[KOS-OAUTH] Token healthy — ${daysUntilExpiry} days remaining, no refresh needed`);
      }

      // Log dans cron_job_logs
      try {
        await supabase.from("cron_job_logs").insert({
          job_name: "kos-linkedin-auto-refresh",
          status: result.auto_refreshed ? "success" : result.action,
          message: JSON.stringify(result),
          executed_at: now.toISOString(),
        });
      } catch { /* ignore */ }

      return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ═══════════════════════════════════════════════
    // REVOKE (POST)
    // ═══════════════════════════════════════════════
    if (action === "revoke" && req.method === "POST") {
      await supabase.from("social_api_tokens").update({ is_active: false, updated_at: new Date().toISOString() }).eq("provider", "linkedin");
      return new Response(JSON.stringify({ success: true, message: "Connexion LinkedIn révoquée" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ═══════════════════════════════════════════════
    // STATUS (GET)
    // ═══════════════════════════════════════════════
    if (action === "status") {
      const { data: accessRow } = await supabase.from("social_api_tokens").select("token_value, expires_at, is_active").eq("provider", "linkedin").eq("token_name", "access_token").maybeSingle();
      const { data: metaRow } = await supabase.from("social_api_tokens").select("token_value").eq("provider", "linkedin").eq("token_name", "metadata").maybeSingle();
      const { data: refreshRow } = await supabase.from("social_api_tokens").select("token_value").eq("provider", "linkedin").eq("token_name", "refresh_token").eq("is_active", true).maybeSingle();

      const hasAccessToken = accessRow?.is_active && accessRow?.token_value;
      const now = new Date();
      const expired = accessRow?.expires_at ? new Date(accessRow.expires_at) < now : false;
      const hasRefresh = !!refreshRow?.token_value;
      let metadata: Record<string, unknown> = {};
      try { if (metaRow?.token_value) metadata = JSON.parse(metaRow.token_value); } catch { /* ignore */ }
      const clientId = getClientId();
      const clientSecret = getClientSecret();
      const credentialsConfigured = !!(clientId && clientSecret);

      return new Response(JSON.stringify({
        connected: hasAccessToken && !expired,
        expired, has_refresh: hasRefresh,
        needs_reauth: !hasAccessToken || (expired && !hasRefresh),
        credentials_configured: credentialsConfigured,
        organization_id: getOrgId() || null,
        user_name: metadata.user_name || null,
        user_email: metadata.user_email || null,
        member_urn: metadata.member_urn || null,
        scopes: metadata.scope || null,
        expires_at: accessRow?.expires_at || null,
        provider: "linkedin",
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ═══════════════════════════════════════════════
    // DIAGNOSTIC (GET) — Preflight complet
    // ═══════════════════════════════════════════════
    if (action === "diagnostic") {
      const diagnostic = {
        uri_ok: false, scopes_ok: false,
        scopes_detail: {} as Record<string, boolean>,
        admin_ok: false, token_valid: false, refresh_ok: false, mdp_ok: false,
        blocking_error: null as string | null,
        recommendations: [] as string[],
        timestamp: new Date().toISOString(),
        registry_synced: false,
      };

      const redirectUri = getRedirectUri();
      const clientId = getClientId();
      const clientSecret = getClientSecret();
      const orgId = getOrgId();

      if (!redirectUri || !redirectUri.includes("khepraexperts.com")) {
        diagnostic.uri_ok = false;
        diagnostic.blocking_error = "INVALID_REDIRECT_URI";
        diagnostic.recommendations.push("RULE 1 — INVALID_REDIRECT_URI: L'URI de redirection doit être https://khepraexperts.com/linkedin-callback. Vérifiez LinkedIn Developer Portal > Auth > Redirect URLs.");
      } else { diagnostic.uri_ok = true; }

      if (!clientId || !clientSecret) {
        diagnostic.blocking_error = diagnostic.blocking_error || "MISSING_CREDENTIALS";
        diagnostic.recommendations.push("CREDENTIALS: Client ID ou Client Secret LinkedIn non configurés. Allez dans KOS External API Config Command.");
        return new Response(JSON.stringify(diagnostic), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const { data: accessRow } = await supabase.from("social_api_tokens").select("token_value, expires_at, is_active").eq("provider", "linkedin").eq("token_name", "access_token").maybeSingle();
      const { data: metaRow } = await supabase.from("social_api_tokens").select("token_value").eq("provider", "linkedin").eq("token_name", "metadata").maybeSingle();
      const { data: refreshRow } = await supabase.from("social_api_tokens").select("token_value").eq("provider", "linkedin").eq("token_name", "refresh_token").eq("is_active", true).maybeSingle();

      let metadata: Record<string, unknown> = {};
      try { if (metaRow?.token_value) metadata = JSON.parse(metaRow.token_value); } catch { /* ignore */ }

      const hasToken = accessRow?.is_active && accessRow?.token_value;
      const now = new Date();
      const expired = accessRow?.expires_at ? new Date(accessRow.expires_at) < now : false;
      const daysUntilExpiry = accessRow?.expires_at ? Math.round((new Date(accessRow.expires_at).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : null;
      const hasRefresh = !!refreshRow?.token_value;

      diagnostic.token_valid = hasToken && !expired;
      diagnostic.refresh_ok = hasRefresh;

      if (!hasToken) {
        diagnostic.recommendations.push("TOKEN: Aucun token actif — exécutez le flux OAuth complet.");
      } else if (expired && !hasRefresh) {
        diagnostic.blocking_error = diagnostic.blocking_error || "TOKEN_EXPIRED_NO_REFRESH";
        diagnostic.recommendations.push("RULE 3 — TOKEN_EXPIRED_NO_REFRESH: Token expiré et pas de refresh token. Relancez le flux OAuth.");
      } else if (daysUntilExpiry !== null && daysUntilExpiry < 7 && daysUntilExpiry > 0) {
        diagnostic.recommendations.push(`TOKEN: Expire dans ${daysUntilExpiry} jour(s). Un refresh silencieux est recommandé.`);
      }

      const scopes = String(metadata.scope || "").split(",").map((s: string) => s.trim()).filter(Boolean);
      const requiredScopes = ["w_organization_social", "w_member_social", "openid", "profile", "email"];
      const premiumScopes = ["rw_organization_admin", "r_organization_social"];
      for (const s of requiredScopes) diagnostic.scopes_detail[s] = scopes.includes(s);
      for (const s of premiumScopes) diagnostic.scopes_detail[s] = scopes.includes(s);
      diagnostic.scopes_ok = requiredScopes.every((s) => scopes.includes(s));

      if (!scopes.includes("w_organization_social")) {
        diagnostic.blocking_error = diagnostic.blocking_error || "SCOPE_INSUFFICIENT";
        diagnostic.recommendations.push("RULE 2 — SCOPE_INSUFFICIENT: Le scope 'w_organization_social' est ABSENT. Activez 'Share on LinkedIn' dans LinkedIn Developer Portal > Products.");
      }
      if (!scopes.includes("rw_organization_admin")) {
        diagnostic.recommendations.push("SCOPE: 'rw_organization_admin' manquant. La vérification du rôle admin de page n'est pas possible automatiquement.");
      }

      diagnostic.admin_ok = false;
      if (diagnostic.token_valid && scopes.includes("rw_organization_admin") && orgId) {
        try {
          const aclResp = await fetch(`https://api.linkedin.com/v2/organizationAcls?q=roleAssignee&role=ADMINISTRATOR&projection=(elements*(organization~))`, { headers: { Authorization: `Bearer ${accessRow!.token_value}`, "LinkedIn-Version": "202405" } });
          if (aclResp.ok) {
            const aclData = await aclResp.json();
            const elements = (aclData.elements || []) as Array<{ organization?: string }>;
            const isAdmin = elements.some((el) => (el.organization || "").includes(orgId));
            diagnostic.admin_ok = isAdmin;
            if (!isAdmin) {
              diagnostic.recommendations.push(`RULE 5 — USER NON ADMIN: L'utilisateur n'est pas ADMINISTRATOR de la page KHEPRA EXPERTS (org:${orgId}). Lien: https://www.linkedin.com/company/khepraexperts/admin/`);
              diagnostic.blocking_error = diagnostic.blocking_error || "USER_NOT_ADMIN";
            }
          }
        } catch { /* ignore */ }
      } else if (diagnostic.token_valid && !orgId) {
        diagnostic.recommendations.push("RULE 5 — ORG_ID manquant. Ajoutez LINKEDIN_ORGANIZATION_ID dans les Supabase Secrets.");
      }

      diagnostic.mdp_ok = false;
      diagnostic.recommendations.push("RULE 4 — MDP_VIDEO: Marketing Developer Platform non activé. Stratégie: conversion auto vidéo → carrousel PDF. Candidature: https://developer.linkedin.com/apply/marketing-developer-platform");
      if (!diagnostic.blocking_error) diagnostic.blocking_error = null;
      diagnostic.registry_synced = true;

      return new Response(JSON.stringify(diagnostic), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ═══════════════════════════════════════════════
    // INTROSPECT (POST)
    // ═══════════════════════════════════════════════
    if (action === "introspect" && req.method === "POST") {
      const { data: accessRow } = await supabase.from("social_api_tokens").select("token_value, expires_at, is_active").eq("provider", "linkedin").eq("token_name", "access_token").maybeSingle();
      if (!accessRow?.is_active || !accessRow?.token_value) {
        return new Response(JSON.stringify({ active: false, error: "Aucun token actif", needs_reauth: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      try {
        const introspectResp = await fetch("https://api.linkedin.com/v2/introspectToken", { method: "POST", headers: { "Authorization": `Bearer ${accessRow.token_value}`, "Content-Type": "application/x-www-form-urlencoded", "LinkedIn-Version": "202405" }, body: new URLSearchParams({ client_id: getClientId(), client_secret: getClientSecret(), token: accessRow.token_value }).toString() });
        if (!introspectResp.ok) {
          const errText = await introspectResp.text();
          return new Response(JSON.stringify({ active: false, error: `Introspection échouée: ${errText.substring(0, 200)}`, http_status: introspectResp.status, needs_reauth: introspectResp.status === 401 }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        const introspectData = await introspectResp.json();
        const now = new Date();
        const expiresAt = accessRow.expires_at ? new Date(accessRow.expires_at) : null;
        const expiresInSeconds = expiresAt ? Math.round((expiresAt.getTime() - now.getTime()) / 1000) : null;
        const { data: refreshCheck } = await supabase.from("social_api_tokens").select("token_value").eq("provider", "linkedin").eq("token_name", "refresh_token").eq("is_active", true).maybeSingle();
        return new Response(JSON.stringify({ active: introspectData.active === true, client_id: introspectData.client_id || null, authorized_at: introspectData.authorized_at || null, expires_at: accessRow.expires_at, expires_in_seconds: expiresInSeconds, expires_in_days: expiresInSeconds ? Math.round(expiresInSeconds / 86400) : null, scopes: introspectData.scope ? introspectData.scope.split(",").map((s: string) => s.trim()) : [], has_refresh_token: !!refreshCheck?.token_value, needs_refresh: expiresInSeconds !== null && expiresInSeconds < 604800, needs_reauth: !introspectData.active, status: introspectData.status || null }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      } catch (err) {
        return new Response(JSON.stringify({ active: false, error: err instanceof Error ? err.message : "Erreur réseau introspection", needs_reauth: false }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    // ═══════════════════════════════════════════════
    // TOKEN_HEALTH (GET) — Vérification proactive + auto-refresh si < 14j
    // ═══════════════════════════════════════════════
    if (action === "token_health") {
      const { data: accessRow } = await supabase.from("social_api_tokens").select("token_value, expires_at, is_active").eq("provider", "linkedin").eq("token_name", "access_token").maybeSingle();
      const { data: refreshRow } = await supabase.from("social_api_tokens").select("token_value").eq("provider", "linkedin").eq("token_name", "refresh_token").eq("is_active", true).maybeSingle();
      const { data: metaRow } = await supabase.from("social_api_tokens").select("token_value").eq("provider", "linkedin").eq("token_name", "metadata").maybeSingle();

      const now = new Date();
      const hasToken = accessRow?.is_active && accessRow?.token_value;
      const expired = accessRow?.expires_at ? new Date(accessRow.expires_at) < now : false;
      const expiresAt = accessRow?.expires_at ? new Date(accessRow.expires_at) : null;
      const daysUntilExpiry = expiresAt ? Math.round((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : null;
      const hasRefresh = !!refreshRow?.token_value;

      let metadata: Record<string, unknown> = {};
      try { if (metaRow?.token_value) metadata = JSON.parse(metaRow.token_value); } catch { /* ignore */ }

      let autoRefreshed = false;

      if (hasToken && !expired && hasRefresh && daysUntilExpiry !== null && daysUntilExpiry < 14 && daysUntilExpiry > 0) {
        const refreshResult = await doRefreshToken(supabase, true);
        autoRefreshed = refreshResult.success && refreshResult.auto_refreshed === true;
      }

      const needsAttention = !hasToken || expired || (daysUntilExpiry !== null && daysUntilExpiry < 7);
      let alert: string | null = null;
      if (expired) alert = "TOKEN_EXPIRED";
      else if (!hasToken) alert = "NO_TOKEN";
      else if (daysUntilExpiry !== null && daysUntilExpiry < 7) alert = `EXPIRING_SOON_${daysUntilExpiry}d`;

      return new Response(JSON.stringify({
        healthy: hasToken && !expired,
        has_token: hasToken, expired,
        days_until_expiry: daysUntilExpiry,
        has_refresh_token: hasRefresh,
        auto_refreshed: autoRefreshed,
        needs_attention: needsAttention,
        needs_reauth: !hasToken || (expired && !hasRefresh),
        alert,
        scopes: String(metadata.scope || "").split(",").map((s: string) => s.trim()).filter(Boolean),
        organization_id: getOrgId() || null,
        member_urn: metadata.member_urn || null,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ success: false, error: "Action inconnue" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (err) {
    console.error("Top-level error:", err);
    return new Response(JSON.stringify({ success: false, error: err instanceof Error ? err.message : "Erreur interne OAuth" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
