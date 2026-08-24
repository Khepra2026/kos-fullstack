import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const META_AUTH_URL = "https://www.facebook.com/v21.0/dialog/oauth";
const META_TOKEN_URL = "https://graph.facebook.com/v21.0/oauth/access_token";
const META_ME_URL = "https://graph.facebook.com/v21.0/me";
const META_PAGES_URL = "https://graph.facebook.com/v21.0/me/accounts";
const META_IG_ACCOUNTS_URL = "https://graph.facebook.com/v21.0/me/accounts";

let _cachedAppId: string | null = null;
let _cachedAppSecret: string | null = null;
let _cacheFilled = false;

async function resolveCredentials(supabase: ReturnType<typeof createClient>) {
  if (_cacheFilled) return;

  const secretId = Deno.env.get("META_APP_ID");
  const secretSecret = Deno.env.get("META_APP_SECRET");

  if (secretId && secretSecret) {
    _cachedAppId = secretId;
    _cachedAppSecret = secretSecret;
    _cacheFilled = true;
    return;
  }

  try {
    const { data: creds } = await supabase
      .from("platform_credentials")
      .select("credential_name, credential_value")
      .eq("platform", "meta")
      .eq("is_active", true);

    if (creds && creds.length > 0) {
      for (const row of creds) {
        if (row.credential_name === "app_id" || row.credential_name === "META_APP_ID") {
          _cachedAppId = _cachedAppId || row.credential_value;
        }
        if (row.credential_name === "app_secret" || row.credential_name === "META_APP_SECRET") {
          _cachedAppSecret = _cachedAppSecret || row.credential_value;
        }
      }
    }
  } catch (err) {
    console.error("Failed to fetch Meta credentials from platform_credentials:", err);
  }

  _cacheFilled = true;
}

function getAppId(): string { return _cachedAppId || ""; }
function getAppSecret(): string { return _cachedAppSecret || ""; }
function getRedirectUri(): string { return "https://khepraexperts.com/facebook-callback"; }
function generateState(): string { return crypto.randomUUID(); }

interface MetaTokenData {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface MetaLongLivedToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface MetaPage {
  id: string;
  name: string;
  access_token: string;
  category: string;
  tasks: string[];
}

interface MetaIGAccount {
  id: string;
  instagram_business_account?: { id: string; username: string };
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
      let body: { app_id?: string; app_secret?: string };
      try { body = await req.json(); } catch {
        return new Response(JSON.stringify({ success: false, error: "JSON body requis" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const { app_id, app_secret } = body;
      if (!app_id?.trim() || !app_secret?.trim()) {
        return new Response(JSON.stringify({ success: false, error: "app_id et app_secret sont requis" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const now = new Date().toISOString();
      const saved: string[] = [];
      const { error: err1 } = await supabase.from("platform_credentials").upsert({ platform: "meta", credential_name: "app_id", credential_value: app_id.trim(), is_active: true, updated_at: now }, { onConflict: "platform,credential_name" });
      if (err1) console.error("Failed to save app_id:", err1); else saved.push("app_id");
      const { error: err2 } = await supabase.from("platform_credentials").upsert({ platform: "meta", credential_name: "app_secret", credential_value: app_secret.trim(), is_active: true, updated_at: now }, { onConflict: "platform,credential_name" });
      if (err2) console.error("Failed to save app_secret:", err2); else saved.push("app_secret");
      _cacheFilled = false; _cachedAppId = null; _cachedAppSecret = null;
      return new Response(JSON.stringify({ success: saved.length === 2, saved_credentials: saved, message: saved.length === 2 ? "Credentials Meta enregistres avec succes" : `Partiellement enregistre: ${saved.join(", ")}` }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
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
        return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": `https://khepraexperts.com/facebook-connect?error=${encodeURIComponent(errorDescription || error)}` } });
      }
      if (!code) {
        return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": `https://khepraexperts.com/facebook-connect?error=${encodeURIComponent("Code d'autorisation manquant")}` } });
      }
      if (state) {
        const { data: stateData } = await supabase.from("oauth_states").select("state, expires_at").eq("state", state).maybeSingle();
        if (!stateData) {
          return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": `https://khepraexperts.com/facebook-connect?error=${encodeURIComponent("Session expiree ou invalide")}` } });
        }
        await supabase.from("oauth_states").update({ used: true }).eq("state", state);
      }

      const redirectUri = getRedirectUri();
      const appId = getAppId();
      const appSecret = getAppSecret();
      if (!appId || !appSecret) {
        return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": `https://khepraexperts.com/facebook-connect?error=${encodeURIComponent("Credentials Meta non configures")}` } });
      }

      const tokenParams = new URLSearchParams({
        client_id: appId,
        client_secret: appSecret,
        code,
        redirect_uri: redirectUri,
      });

      try {
        // Échange du code contre un short-lived token
        const tokenResp = await fetch(`${META_TOKEN_URL}?${tokenParams.toString()}`);
        if (!tokenResp.ok) {
          const errText = await tokenResp.text();
          return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": `https://khepraexperts.com/facebook-connect?error=${encodeURIComponent(`Erreur echange token: ${errText.substring(0, 200)}`)}` } });
        }

        const tokenData: MetaTokenData = await tokenResp.json();

        // Échange contre un long-lived token (60 jours)
        const llParams = new URLSearchParams({
          grant_type: "fb_exchange_token",
          client_id: appId,
          client_secret: appSecret,
          fb_exchange_token: tokenData.access_token,
        });
        const llResp = await fetch(`${META_TOKEN_URL}?${llParams.toString()}`);
        const llData: MetaLongLivedToken = llResp.ok ? await llResp.json() : { access_token: tokenData.access_token, token_type: "bearer", expires_in: tokenData.expires_in };

        const accessToken = llData.access_token;
        const expiresIn = llData.expires_in || 5184000; // 60 jours par défaut

        // Récupérer les infos utilisateur
        let userName = "";
        let userId = "";
        try {
          const meResp = await fetch(`${META_ME_URL}?fields=id,name,email&access_token=${accessToken}`);
          if (meResp.ok) {
            const meData = await meResp.json();
            userName = meData.name || "";
            userId = meData.id || "";
          }
        } catch { /* ignore */ }

        // Récupérer les Pages Facebook
        let pages: MetaPage[] = [];
        let pageAccessToken = "";
        let pageId = "";
        try {
          const pagesResp = await fetch(`${META_PAGES_URL}?fields=id,name,access_token,category,tasks&access_token=${accessToken}`);
          if (pagesResp.ok) {
            const pagesData = await pagesResp.json();
            pages = pagesData.data || [];
            // Chercher la page KHEPRA EXPERTS
            const khepraPage = pages.find((p: MetaPage) => p.name?.toLowerCase().includes("khepra"));
            if (khepraPage) {
              pageAccessToken = khepraPage.access_token;
              pageId = khepraPage.id;
            } else if (pages.length > 0) {
              pageAccessToken = pages[0].access_token;
              pageId = pages[0].id;
            }
          }
        } catch { /* ignore */ }

        // Récupérer le compte Instagram Business lié
        let igUserId = "";
        let igUsername = "";
        if (pageId && pageAccessToken) {
          try {
            const igResp = await fetch(`https://graph.facebook.com/v21.0/${pageId}?fields=instagram_business_account{id,username}&access_token=${pageAccessToken}`);
            if (igResp.ok) {
              const igData = await igResp.json();
              if (igData.instagram_business_account) {
                igUserId = igData.instagram_business_account.id;
                igUsername = igData.instagram_business_account.username;
              }
            }
          } catch { /* ignore */ }
        }

        const expiresAt = new Date(Date.now() + (expiresIn * 1000)).toISOString();
        const now = new Date().toISOString();

        // Sauvegarder les tokens
        await supabase.from("social_api_tokens").delete().eq("provider", "meta");
        await supabase.from("social_api_tokens").delete().eq("provider", "facebook");
        await supabase.from("social_api_tokens").delete().eq("provider", "instagram");

        const rows = [
          { provider: "meta", token_name: "access_token", token_value: accessToken, is_active: true, expires_at: expiresAt, updated_at: now, last_used_at: now },
          { provider: "meta", token_name: "user_token", token_value: tokenData.access_token, is_active: true, updated_at: now, last_used_at: now },
          { provider: "meta", token_name: "metadata", token_value: JSON.stringify({
            app_id: appId, user_id: userId, user_name: userName,
            page_id: pageId, page_name: pages.find((p: MetaPage) => p.id === pageId)?.name || "",
            ig_user_id: igUserId, ig_username: igUsername,
            pages: pages.map((p: MetaPage) => ({ id: p.id, name: p.name, category: p.category })),
            expires_at: expiresAt, scopes: "pages_manage_posts,pages_read_engagement,instagram_basic,instagram_content_publish",
          }), is_active: true, updated_at: now, last_used_at: now },
        ];

        if (pageAccessToken) {
          rows.push({ provider: "facebook", token_name: "page_access_token", token_value: pageAccessToken, is_active: true, updated_at: now, last_used_at: now });
          rows.push({ provider: "facebook", token_name: "page_id", token_value: pageId, is_active: true, updated_at: now, last_used_at: now });
        }
        if (igUserId) {
          rows.push({ provider: "instagram", token_name: "ig_user_id", token_value: igUserId, is_active: true, updated_at: now, last_used_at: now });
          rows.push({ provider: "instagram", token_name: "ig_username", token_value: igUsername, is_active: true, updated_at: now, last_used_at: now });
        }

        await supabase.from("social_api_tokens").insert(rows);

        const encodedUser = encodeURIComponent(userName || "Utilisateur Meta");
        return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": `https://khepraexperts.com/facebook-connect?success=true&user=${encodedUser}&pages=${pages.length}&instagram=${igUserId ? "connected" : "none"}` } });
      } catch (err) {
        return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": `https://khepraexperts.com/facebook-connect?error=${encodeURIComponent(err instanceof Error ? err.message : "Erreur inconnue")}` } });
      }
    }

    // ═══════════════════════════════════════════════
    // AUTHORIZE (POST)
    // ═══════════════════════════════════════════════
    if (action === "authorize" && req.method === "POST") {
      const appId = getAppId();
      const appSecret = getAppSecret();
      if (!appId || !appSecret) {
        return new Response(JSON.stringify({ success: false, error: "Meta App ID non configure.", setup_required: true }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const state = generateState();
      const expiresAtOauth = new Date(Date.now() + 10 * 60 * 1000).toISOString();
      await supabase.from("oauth_states").insert({ state, expires_at: expiresAtOauth, created_at: new Date().toISOString() });
      const redirectUri = getRedirectUri();
      const scopes = ["pages_manage_posts", "pages_read_engagement", "instagram_basic", "instagram_content_publish", "pages_show_list"];
      const params = new URLSearchParams({
        client_id: appId,
        redirect_uri: redirectUri,
        state,
        scope: scopes.join(","),
        response_type: "code",
      });
      return new Response(JSON.stringify({ success: true, auth_url: `${META_AUTH_URL}?${params.toString()}`, state, scopes, redirect_uri: redirectUri }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ═══════════════════════════════════════════════
    // REFRESH (POST)
    // ═══════════════════════════════════════════════
    if (action === "refresh" && req.method === "POST") {
      const { data: tokenRow } = await supabase.from("social_api_tokens").select("token_value").eq("provider", "meta").eq("token_name", "access_token").eq("is_active", true).maybeSingle();
      if (!tokenRow?.token_value) {
        return new Response(JSON.stringify({ success: false, error: "Aucun token actif", needs_reauth: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const appId = getAppId();
      const appSecret = getAppSecret();
      if (!appId || !appSecret) {
        return new Response(JSON.stringify({ success: false, error: "Credentials Meta non configures" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      try {
        const refreshParams = new URLSearchParams({
          grant_type: "fb_exchange_token",
          client_id: appId,
          client_secret: appSecret,
          fb_exchange_token: tokenRow.token_value,
        });
        const resp = await fetch(`${META_TOKEN_URL}?${refreshParams.toString()}`);
        if (!resp.ok) {
          await supabase.from("social_api_tokens").update({ is_active: false, updated_at: new Date().toISOString() }).eq("provider", "meta").eq("token_name", "access_token");
          return new Response(JSON.stringify({ success: false, error: "Echec refresh", needs_reauth: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        const data: MetaLongLivedToken = await resp.json();
        const expiresAt = new Date(Date.now() + (data.expires_in * 1000)).toISOString();
        const now = new Date().toISOString();
        await supabase.from("social_api_tokens").update({ token_value: data.access_token, expires_at: expiresAt, updated_at: now, last_used_at: now, is_active: true }).eq("provider", "meta").eq("token_name", "access_token");
        return new Response(JSON.stringify({ success: true, refreshed: true, expires_at: expiresAt, expires_in_days: Math.round(data.expires_in / 86400) }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err instanceof Error ? err.message : "Erreur reseau" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    // ═══════════════════════════════════════════════
    // REVOKE (POST)
    // ═══════════════════════════════════════════════
    if (action === "revoke" && req.method === "POST") {
      await supabase.from("social_api_tokens").update({ is_active: false, updated_at: new Date().toISOString() }).eq("provider", "meta");
      await supabase.from("social_api_tokens").update({ is_active: false, updated_at: new Date().toISOString() }).eq("provider", "facebook");
      await supabase.from("social_api_tokens").update({ is_active: false, updated_at: new Date().toISOString() }).eq("provider", "instagram");
      return new Response(JSON.stringify({ success: true, message: "Connexion Meta revoquee (Facebook + Instagram)" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ═══════════════════════════════════════════════
    // STATUS (GET)
    // ═══════════════════════════════════════════════
    if (action === "status") {
      const { data: accessRow } = await supabase.from("social_api_tokens").select("token_value, expires_at, is_active").eq("provider", "meta").eq("token_name", "access_token").maybeSingle();
      const { data: metaRow } = await supabase.from("social_api_tokens").select("token_value").eq("provider", "meta").eq("token_name", "metadata").maybeSingle();
      const { data: fbPageRow } = await supabase.from("social_api_tokens").select("token_value").eq("provider", "facebook").eq("token_name", "page_access_token").eq("is_active", true).maybeSingle();
      const { data: igRow } = await supabase.from("social_api_tokens").select("token_value").eq("provider", "instagram").eq("token_name", "ig_user_id").eq("is_active", true).maybeSingle();

      const hasAccessToken = accessRow?.is_active && accessRow?.token_value;
      const now = new Date();
      const expired = accessRow?.expires_at ? new Date(accessRow.expires_at) < now : false;
      let metadata: Record<string, unknown> = {};
      try { if (metaRow?.token_value) metadata = JSON.parse(metaRow.token_value); } catch { /* ignore */ }
      const appId = getAppId();
      const appSecret = getAppSecret();
      const credentialsConfigured = !!(appId && appSecret);

      return new Response(JSON.stringify({
        connected: hasAccessToken && !expired,
        expired,
        needs_reauth: !hasAccessToken || (expired),
        credentials_configured: credentialsConfigured,
        user_name: metadata.user_name || null,
        user_id: metadata.user_id || null,
        pages: metadata.pages || [],
        page_name: metadata.page_name || null,
        page_id: metadata.page_id || null,
        facebook_connected: !!fbPageRow?.token_value,
        instagram_connected: !!igRow?.token_value,
        ig_username: metadata.ig_username || null,
        ig_user_id: metadata.ig_user_id || null,
        expires_at: accessRow?.expires_at || null,
        provider: "meta",
        platforms: {
          facebook: !!fbPageRow?.token_value,
          instagram: !!igRow?.token_value,
        },
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ success: false, error: "Action inconnue" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (err) {
    console.error("Top-level error:", err);
    return new Response(JSON.stringify({ success: false, error: err instanceof Error ? err.message : "Erreur interne" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
