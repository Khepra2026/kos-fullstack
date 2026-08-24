import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TIKTOK_AUTH_URL = "https://www.tiktok.com/v2/auth/authorize/";
const TIKTOK_TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";
const TIKTOK_USER_INFO_URL = "https://open.tiktokapis.com/v2/user/info/";

let _cachedClientKey: string | null = null;
let _cachedClientSecret: string | null = null;
let _cacheFilled = false;

async function resolveCredentials(supabase: ReturnType<typeof createClient>) {
  if (_cacheFilled) return;

  const secretKey = Deno.env.get("TIKTOK_CLIENT_KEY");
  const secretSecret = Deno.env.get("TIKTOK_CLIENT_SECRET");

  if (secretKey && secretSecret) {
    _cachedClientKey = secretKey;
    _cachedClientSecret = secretSecret;
    _cacheFilled = true;
    return;
  }

  try {
    const { data: creds } = await supabase
      .from("platform_credentials")
      .select("credential_name, credential_value")
      .eq("platform", "tiktok")
      .eq("is_active", true);

    if (creds && creds.length > 0) {
      for (const row of creds) {
        if (row.credential_name === "client_key" || row.credential_name === "TIKTOK_CLIENT_KEY") {
          _cachedClientKey = _cachedClientKey || row.credential_value;
        }
        if (row.credential_name === "client_secret" || row.credential_name === "TIKTOK_CLIENT_SECRET") {
          _cachedClientSecret = _cachedClientSecret || row.credential_value;
        }
      }
    }
  } catch (err) {
    console.error("Failed to fetch TikTok credentials from platform_credentials:", err);
  }

  _cacheFilled = true;
}

function getClientKey(): string {
  return _cachedClientKey || "";
}

function getClientSecret(): string {
  return _cachedClientSecret || "";
}

function getRedirectUri(): string {
  return "https://khepraexperts.com/tiktok-callback";
}

function generateState(): string {
  return crypto.randomUUID();
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

    // SAVE_CREDENTIALS
    if (action === "save_credentials" && req.method === "POST") {
      let body: { client_key?: string; client_secret?: string };
      try {
        body = await req.json();
      } catch {
        return new Response(JSON.stringify({ success: false, error: "JSON body requis" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const { client_key, client_secret } = body;

      if (!client_key?.trim() || !client_secret?.trim()) {
        return new Response(JSON.stringify({ success: false, error: "client_key et client_secret sont requis" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const now = new Date().toISOString();
      const saved: string[] = [];

      const { error: err1 } = await supabase
        .from("platform_credentials")
        .upsert({
          platform: "tiktok",
          credential_name: "client_key",
          credential_value: client_key.trim(),
          is_active: true,
          updated_at: now,
        }, { onConflict: "platform,credential_name" });

      if (err1) {
        console.error("Failed to save client_key:", err1);
      } else {
        saved.push("client_key");
      }

      const { error: err2 } = await supabase
        .from("platform_credentials")
        .upsert({
          platform: "tiktok",
          credential_name: "client_secret",
          credential_value: client_secret.trim(),
          is_active: true,
          updated_at: now,
        }, { onConflict: "platform,credential_name" });

      if (err2) {
        console.error("Failed to save client_secret:", err2);
      } else {
        saved.push("client_secret");
      }

      _cacheFilled = false;
      _cachedClientKey = null;
      _cachedClientSecret = null;

      return new Response(JSON.stringify({
        success: saved.length === 2,
        saved_credentials: saved,
        message: saved.length === 2 ? "Credentials TikTok enregistres avec succes" : `Partiellement enregistre: ${saved.join(", ")}`,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // CALLBACK
    if (action === "callback") {
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");
      const error = url.searchParams.get("error");
      const errorDescription = url.searchParams.get("error_description");

      if (error) {
        const redirectUrl = `https://khepraexperts.com/tiktok-connect?error=${encodeURIComponent(errorDescription || error)}`;
        return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": redirectUrl } });
      }

      if (!code) {
        const redirectUrl = `https://khepraexperts.com/tiktok-connect?error=${encodeURIComponent("Code d'autorisation manquant")}`;
        return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": redirectUrl } });
      }

      if (state) {
        const { data: stateData, error: stateErr } = await supabase
          .from("oauth_states")
          .select("state, expires_at")
          .eq("state", state)
          .maybeSingle();

        if (stateErr) {
          console.error("oauth_states lookup error:", stateErr);
        }

        if (!stateData) {
          const redirectUrl = `https://khepraexperts.com/tiktok-connect?error=${encodeURIComponent("Session expiree ou invalide — veuillez reessayer la connexion TikTok")}`;
          return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": redirectUrl } });
        }

        await supabase.from("oauth_states").update({ used: true }).eq("state", state);
      }

      const redirectUri = getRedirectUri();
      const clientKey = getClientKey();
      const clientSecret = getClientSecret();

      if (!clientKey || !clientSecret) {
        const redirectUrl = `https://khepraexperts.com/tiktok-connect?error=${encodeURIComponent("Credentials TikTok non configures")}`;
        return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": redirectUrl } });
      }

      const tokenBody = new URLSearchParams({
        client_key: clientKey,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      });

      try {
        const tokenResp = await fetch(TIKTOK_TOKEN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: tokenBody.toString(),
        });

        const tokenText = await tokenResp.text();

        if (!tokenResp.ok) {
          console.error("TikTok token exchange failed:", tokenText);
          const redirectUrl = `https://khepraexperts.com/tiktok-connect?error=${encodeURIComponent(`Erreur echange token TikTok: ${tokenText.substring(0, 200)}`)}`;
          return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": redirectUrl } });
        }

        const tokenData = JSON.parse(tokenText);

        const accessToken = tokenData.access_token;
        const refreshToken = tokenData.refresh_token || null;
        const expiresIn = tokenData.expires_in || 86400;
        const scope = tokenData.scope || "";
        const openId = tokenData.open_id || "";

        let displayName = "";
        try {
          const userResp = await fetch(`${TIKTOK_USER_INFO_URL}?fields=open_id,union_id,avatar_url,display_name`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (userResp.ok) {
            const userData = await userResp.json();
            displayName = userData.data?.user?.display_name || "";
          }
        } catch { /* ignore */ }

        const expiresAt = new Date(Date.now() + (expiresIn * 1000)).toISOString();
        const now = new Date().toISOString();

        await supabase.from("social_api_tokens").delete().eq("provider", "tiktok");

        const rows = [
          { provider: "tiktok", token_name: "access_token", token_value: accessToken, is_active: true, expires_at: expiresAt, updated_at: now, last_used_at: now },
          { provider: "tiktok", token_name: "metadata", token_value: JSON.stringify({
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_at: expiresAt,
            scope: scope,
            open_id: openId,
            user_name: displayName,
            display_name: displayName,
          }), is_active: true, updated_at: now, last_used_at: now },
        ];

        if (refreshToken) {
          rows.push({ provider: "tiktok", token_name: "refresh_token", token_value: refreshToken, is_active: true, updated_at: now, last_used_at: now });
        }

        await supabase.from("social_api_tokens").insert(rows);

        const userNameForUrl = displayName || "Utilisateur TikTok";
        const redirectUrl = `https://khepraexperts.com/tiktok-connect?success=true&user=${encodeURIComponent(userNameForUrl)}&scopes=${encodeURIComponent(scope)}`;
        return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": redirectUrl } });

      } catch (err) {
        console.error("TikTok callback error:", err);
        const redirectUrl = `https://khepraexperts.com/tiktok-connect?error=${encodeURIComponent(err instanceof Error ? err.message : "Erreur inconnue")}`;
        return new Response(null, { status: 302, headers: { ...corsHeaders, "Location": redirectUrl } });
      }
    }

    // AUTHORIZE
    if (action === "authorize" && req.method === "POST") {
      const clientKey = getClientKey();
      const clientSecret = getClientSecret();

      if (!clientKey || !clientSecret) {
        return new Response(JSON.stringify({
          success: false,
          error: "TikTok Client Key non configuree. Allez dans KOS External API Config Command pour saisir vos credentials TikTok.",
          setup_required: true,
        }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const state = generateState();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

      const { error: insertErr } = await supabase.from("oauth_states").insert({
        state,
        expires_at: expiresAt,
        created_at: new Date().toISOString(),
      });

      if (insertErr) {
        console.error("Failed to insert oauth state:", insertErr);
        return new Response(JSON.stringify({
          success: false,
          error: "Erreur interne — impossible de creer la session OAuth. Veuillez reessayer.",
        }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const redirectUri = getRedirectUri();
      const scopes = ["user.info.basic", "video.publish", "video.upload"];
      const params = new URLSearchParams({
        client_key: clientKey,
        response_type: "code",
        scope: scopes.join(","),
        redirect_uri: redirectUri,
        state,
      });

      const authUrl = `${TIKTOK_AUTH_URL}?${params.toString()}`;

      return new Response(JSON.stringify({ success: true, auth_url: authUrl, state, scopes, redirect_uri: redirectUri }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // REFRESH
    if (action === "refresh" && req.method === "POST") {
      const clientKey = getClientKey();
      const clientSecret = getClientSecret();
      if (!clientKey || !clientSecret) {
        return new Response(JSON.stringify({ success: false, error: "Credentials TikTok non configures" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const { data: refreshRow } = await supabase.from("social_api_tokens").select("token_value").eq("provider", "tiktok").eq("token_name", "refresh_token").eq("is_active", true).maybeSingle();

      if (!refreshRow?.token_value) {
        return new Response(JSON.stringify({ success: false, error: "Aucun refresh token disponible — reautorisation necessaire", needs_reauth: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const refreshBody = new URLSearchParams({
        client_key: clientKey,
        client_secret: clientSecret,
        grant_type: "refresh_token",
        refresh_token: refreshRow.token_value,
      });

      const resp = await fetch(TIKTOK_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: refreshBody.toString(),
      });

      const respText = await resp.text();

      if (!resp.ok) {
        console.error("TikTok refresh failed:", respText);
        await supabase.from("social_api_tokens").update({ is_active: false, updated_at: new Date().toISOString() }).eq("provider", "tiktok").eq("token_name", "access_token");
        return new Response(JSON.stringify({ success: false, error: `Echec refresh: ${respText.substring(0, 200)}`, needs_reauth: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const tokenData = JSON.parse(respText);
      const expiresIn = tokenData.expires_in || 86400;
      const expiresAt = new Date(Date.now() + (expiresIn * 1000)).toISOString();
      const now = new Date().toISOString();

      await supabase.from("social_api_tokens").update({
        token_value: tokenData.access_token,
        expires_at: expiresAt,
        updated_at: now,
        last_used_at: now,
        is_active: true,
      }).eq("provider", "tiktok").eq("token_name", "access_token");

      if (tokenData.refresh_token) {
        await supabase.from("social_api_tokens").update({
          token_value: tokenData.refresh_token,
          updated_at: now,
          last_used_at: now,
        }).eq("provider", "tiktok").eq("token_name", "refresh_token");
      }

      return new Response(JSON.stringify({ success: true, refreshed: true, expires_at: expiresAt, scopes: tokenData.scope }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // REVOKE
    if (action === "revoke" && req.method === "POST") {
      await supabase.from("social_api_tokens").update({ is_active: false, updated_at: new Date().toISOString() }).eq("provider", "tiktok");
      return new Response(JSON.stringify({ success: true, message: "Connexion TikTok revoquee" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // STATUS
    if (action === "status") {
      const { data: accessRow } = await supabase.from("social_api_tokens").select("token_value, expires_at, is_active").eq("provider", "tiktok").eq("token_name", "access_token").maybeSingle();
      const { data: metaRow } = await supabase.from("social_api_tokens").select("token_value").eq("provider", "tiktok").eq("token_name", "metadata").maybeSingle();
      const { data: refreshRow } = await supabase.from("social_api_tokens").select("token_value").eq("provider", "tiktok").eq("token_name", "refresh_token").eq("is_active", true).maybeSingle();

      const hasAccessToken = accessRow?.is_active && accessRow?.token_value;
      const now = new Date();
      const expired = accessRow?.expires_at ? new Date(accessRow.expires_at) < now : false;
      const hasRefresh = !!refreshRow?.token_value;

      let metadata: Record<string, unknown> = {};
      try {
        if (metaRow?.token_value) metadata = JSON.parse(metaRow.token_value);
      } catch { /* ignore */ }

      const clientKey = getClientKey();
      const clientSecret = getClientSecret();
      const credentialsConfigured = !!(clientKey && clientSecret);

      return new Response(JSON.stringify({
        connected: hasAccessToken && !expired,
        expired,
        has_refresh: hasRefresh,
        needs_reauth: !hasAccessToken || (expired && !hasRefresh),
        credentials_configured: credentialsConfigured,
        user_name: metadata.user_name || metadata.display_name || null,
        display_name: metadata.display_name || null,
        open_id: metadata.open_id || null,
        scopes: metadata.scope || null,
        expires_at: accessRow?.expires_at || null,
        provider: "tiktok",
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ success: false, error: "Action inconnue" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (err) {
    console.error("Top-level error:", err);
    return new Response(JSON.stringify({ success: false, error: err instanceof Error ? err.message : "Erreur interne OAuth TikTok" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
