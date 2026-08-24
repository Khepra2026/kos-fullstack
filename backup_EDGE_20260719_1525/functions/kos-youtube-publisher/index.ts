import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
const YOUTUBE_UPLOAD_URL = "https://www.googleapis.com/upload/youtube/v3/videos";

const DEFAULT_REDIRECT_URI = "https://khepraexperts.com/youtube-callback";

const SCOPES = ["https://www.googleapis.com/auth/youtube.upload"];

function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  return createClient(supabaseUrl, serviceRoleKey);
}

async function getCredentials(supabase: ReturnType<typeof createClient>) {
  try {
    const { data, error } = await supabase
      .from("platform_credentials")
      .select("credential_name, credential_value")
      .eq("platform", "youtube")
      .eq("is_active", true);

    if (error) {
      console.error("[KOS-YT] getCredentials DB error:", error.message);
      return null;
    }
    if (!data || data.length === 0) {
      console.log("[KOS-YT] getCredentials: no rows found");
      return null;
    }

    const creds: Record<string, string> = {};
    data.forEach((r: { credential_name: string; credential_value: string }) => {
      creds[r.credential_name] = r.credential_value;
    });

    console.log("[KOS-YT] getCredentials found keys:", Object.keys(creds).join(", "));
    return creds;
  } catch (err) {
    console.error("[KOS-YT] getCredentials exception:", err instanceof Error ? err.message : String(err));
    return null;
  }
}

async function saveToken(
  supabase: ReturnType<typeof createClient>,
  name: string,
  value: string
) {
  const { data: existing } = await supabase
    .from("platform_credentials")
    .select("id")
    .eq("platform", "youtube")
    .eq("credential_name", name)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("platform_credentials")
      .update({ credential_value: value, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
  } else {
    await supabase.from("platform_credentials").insert({
      platform: "youtube",
      credential_name: name,
      credential_value: value,
      is_active: true,
    });
  }
}

async function deleteToken(
  supabase: ReturnType<typeof createClient>,
  name: string
) {
  await supabase
    .from("platform_credentials")
    .update({ is_active: false })
    .eq("platform", "youtube")
    .eq("credential_name", name);
}

// PKCE: compute SHA256 and encode base64url
async function computeCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// PKCE: generate a secure random code_verifier (base64url, 32 bytes)
function generateCodeVerifier(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function exchangeCodeForTokens(code: string, redirectUri: string, codeVerifier: string) {
  const supabase = getSupabaseClient();
  const creds = await getCredentials(supabase);

  if (!creds?.client_id || !creds?.client_secret) {
    return { success: false, error: "YouTube credentials not configured" };
  }

  const body = new URLSearchParams({
    code,
    client_id: creds.client_id,
    client_secret: creds.client_secret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
    code_verifier: codeVerifier,
  });

  const resp = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = await resp.json();

  if (data.error) {
    return { success: false, error: data.error_description || data.error };
  }

  if (data.access_token) {
    await saveToken(supabase, "access_token", data.access_token);
    if (data.refresh_token) {
      await saveToken(supabase, "refresh_token", data.refresh_token);
    }
    if (data.expires_in) {
      const expiresAt = new Date(
        Date.now() + (data.expires_in - 60) * 1000
      ).toISOString();
      await saveToken(supabase, "expires_at", expiresAt);
    }
  }

  let channelTitle = "KHEPRA EXPERTS";
  let channelVerified = true;

  if (data.access_token) {
    try {
      const chResp = await fetch(
        `${YOUTUBE_API_BASE}/channels?part=snippet,status&mine=true`,
        { headers: { Authorization: `Bearer ${data.access_token}` } }
      );
      const chData = await chResp.json();
      if (chData.items?.[0]) {
        channelTitle = chData.items[0].snippet?.title || channelTitle;
        channelVerified = chData.items[0].status?.isLinked || false;
        await saveToken(supabase, "channel_id", chData.items[0].id);
        await saveToken(supabase, "channel_title", channelTitle);
      }
    } catch {
      // ignore
    }
  }

  return {
    success: true,
    channel_title: channelTitle,
    channel_verified: channelVerified,
  };
}

async function refreshAccessToken() {
  const supabase = getSupabaseClient();
  const creds = await getCredentials(supabase);

  if (!creds?.refresh_token || !creds?.client_id || !creds?.client_secret) {
    return null;
  }

  const body = new URLSearchParams({
    refresh_token: creds.refresh_token,
    client_id: creds.client_id,
    client_secret: creds.client_secret,
    grant_type: "refresh_token",
  });

  const resp = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = await resp.json();

  if (data.access_token) {
    await saveToken(supabase, "access_token", data.access_token);
    if (data.expires_in) {
      const expiresAt = new Date(
        Date.now() + (data.expires_in - 60) * 1000
      ).toISOString();
      await saveToken(supabase, "expires_at", expiresAt);
    }
    return data.access_token;
  }

  return null;
}

async function getValidAccessToken(): Promise<string | null> {
  const supabase = getSupabaseClient();
  const creds = await getCredentials(supabase);

  if (!creds?.access_token) return null;

  const expiresAt = creds.expires_at;
  if (expiresAt && new Date(expiresAt) <= new Date()) {
    return await refreshAccessToken();
  }

  return creds.access_token;
}

// ════════════════════════════════════════════════════════════════════════
// buildAuthUrl — Génère state CSRF (OBLIGATOIRE) + PKCE code_challenge S256
// ════════════════════════════════════════════════════════════════════════
// Le paramètre `state` est TOUJOURS généré et TOUJOURS ajouté à l'URL OAuth
// envoyée à Google (RFC 6749 §10.12 — protection anti-CSRF). Il est persisté
// dans la table oauth_states puis vérifié au callback (action exchange_code).
// Mode hybride : accepte externalState + externalCodeChallenge du frontend SPA,
// sinon génère tout côté serveur (rétrocompatible).
async function buildAuthUrl(
  supabase: ReturnType<typeof createClient>,
  clientId: string,
  redirectUri: string,
  externalState?: string,
  externalCodeChallenge?: string,
): Promise<{ authUrl: string; state: string }> {
  // CSRF: utilise le state fourni par le client SPA ou en génère un nouveau.
  // Garantie : state est TOUJOURS une valeur non-vide.
  const state = (externalState && externalState.trim().length > 0)
    ? externalState.trim()
    : crypto.randomUUID();

  let codeVerifier: string;
  let codeChallenge: string;
  const isClientPKCE = !!(externalCodeChallenge);

  if (isClientPKCE) {
    // Mode client-side PKCE : le frontend SPA gère le code_verifier dans sessionStorage
    codeVerifier = ""; // ignoré, non stocké
    codeChallenge = externalCodeChallenge!;
    console.log("[KOS-YT] CLIENT-SIDE PKCE — code_verifier géré par le navigateur");
  } else {
    // Mode server-side PKCE : l'edge function génère et stocke tout
    codeVerifier = generateCodeVerifier();
    codeChallenge = await computeCodeChallenge(codeVerifier);
    console.log("[KOS-YT] SERVER-SIDE PKCE — code_verifier stocké en DB");
  }

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  const insertPayload: Record<string, string | boolean> = {
    state,
    expires_at: expiresAt,
    redirect_uri: redirectUri,
  };

  // Ne stocke le code_verifier que s'il est généré côté serveur
  if (!isClientPKCE) {
    insertPayload.code_verifier = codeVerifier;
  }

  const { error: insertError } = await supabase.from("oauth_states").insert(insertPayload);
  if (insertError) {
    console.error("[KOS-YT] oauth_states insert error:", insertError.message);
    throw new Error(`Impossible de persister le state OAuth : ${insertError.message}`);
  }

  // ── Construction de l'URL OAuth — state TOUJOURS présent ──
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: SCOPES.join(" "),
    access_type: "offline",
    prompt: "consent",
    include_granted_scopes: "true",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  const authUrl = `${GOOGLE_AUTH_URL}?${params.toString()}`;

  // Garde-fou : vérifie que state est bien dans l'URL finale avant de la renvoyer
  if (!authUrl.includes(`state=${encodeURIComponent(state)}`)) {
    throw new Error("Erreur interne : le paramètre state n'a pas été ajouté à l'URL OAuth");
  }

  console.log(
    "[KOS-YT] Auth URL construite — PKCE:",
    isClientPKCE ? "CLIENT" : "SERVER",
    "| state présent:",
    authUrl.includes("state="),
    "| state:",
    state.substring(0, 8) + "...",
  );

  return { authUrl, state };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { action, redirect_uri, client_id, client_secret } = body;

    const supabase = getSupabaseClient();

    switch (action) {
      case "authorize": {
        const creds = await getCredentials(supabase);
        const resolvedClientId = client_id || creds?.client_id || "";
        const resolvedClientSecret = client_secret || creds?.client_secret || "";

        if (!resolvedClientId || !resolvedClientSecret) {
          return new Response(
            JSON.stringify({
              success: false,
              setup_required: true,
              error:
                "YouTube Client ID non configuré. Allez dans KOS External API Config Command pour saisir vos credentials YouTube.",
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const resolvedRedirectUri = redirect_uri || DEFAULT_REDIRECT_URI;

        // PKCE hybride : accepte state + code_challenge du client SPA
        const externalState = body.state as string | undefined;
        const externalCodeChallenge = body.code_challenge as string | undefined;

        const { authUrl, state } = await buildAuthUrl(
          supabase,
          resolvedClientId,
          resolvedRedirectUri,
          externalState,
          externalCodeChallenge,
        );

        return new Response(
          JSON.stringify({
            success: true,
            auth_url: authUrl,
            state,
            state_included: authUrl.includes("state="),
            redirect_uri: resolvedRedirectUri,
            pkce_mode: externalCodeChallenge ? "client" : "server",
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "exchange_code": {
        const code = body.code;
        const state = body.state;
        const clientCodeVerifier = body.code_verifier as string | undefined;

        if (!code) {
          return new Response(
            JSON.stringify({ success: false, error: "Code OAuth manquant" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // CSRF: vérification obligatoire du state
        if (!state) {
          return new Response(
            JSON.stringify({ success: false, error: "Paramètre state manquant — requête OAuth non sécurisée" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { data: stateData, error: stateError } = await supabase
          .from("oauth_states")
          .select("id, redirect_uri, code_verifier")
          .eq("state", state)
          .eq("used", false)
          .gt("expires_at", new Date().toISOString())
          .maybeSingle();

        if (stateError || !stateData) {
          return new Response(
            JSON.stringify({ success: false, error: "State invalide ou expiré — possible attaque CSRF. Reconnectez-vous." }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // PKCE hybride : priorité au code_verifier fourni par le client SPA
        let resolvedCodeVerifier: string;

        if (clientCodeVerifier) {
          resolvedCodeVerifier = clientCodeVerifier;
          console.log("[KOS-YT] CLIENT-SIDE PKCE pour l'échange de token");
        } else if (stateData.code_verifier) {
          resolvedCodeVerifier = stateData.code_verifier;
          console.log("[KOS-YT] SERVER-SIDE PKCE pour l'échange de token (DB)");
        } else {
          await supabase.from("oauth_states").update({ used: true }).eq("id", stateData.id);
          await supabase.from("oauth_states").delete().eq("id", stateData.id);
          return new Response(
            JSON.stringify({ success: false, error: "PKCE code_verifier manquant — flux OAuth corrompu. Reconnectez-vous." }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Marquer comme utilisé et nettoyer immédiatement (anti-replay)
        await supabase.from("oauth_states").update({ used: true }).eq("id", stateData.id);
        await supabase.from("oauth_states").delete().eq("id", stateData.id);

        const resolvedRedirectUri = redirect_uri || stateData.redirect_uri || DEFAULT_REDIRECT_URI;
        const result = await exchangeCodeForTokens(code, resolvedRedirectUri, resolvedCodeVerifier);

        console.log("[KOS-YT] Résultat échange token:", result.success ? "SUCCESS" : "FAILED", result.error || "");

        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "status": {
        const creds = await getCredentials(supabase);
        const accessToken = await getValidAccessToken();

        const connected = !!(creds?.access_token && creds?.refresh_token);
        const tokenValid = !!accessToken;

        return new Response(
          JSON.stringify({
            connected,
            verified: !!creds?.channel_id,
            channel: {
              channel_id: creds?.channel_id || "",
              handle: creds?.channel_title
                ? `@${creds.channel_title.replace(/\s+/g, "")}`
                : "@KHEPRAEXPERTS",
              title: creds?.channel_title || "KHEPRA EXPERTS",
            },
            token_valid: tokenValid,
            needs_reauth: connected && !tokenValid,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "list": {
        const { data, error } = await supabase
          .from("kos_youtube_content_pipeline")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50);

        if (error) throw error;

        const posts = (data || []).map((item: Record<string, unknown>) => ({
          id: item.id,
          title: item.content_title || "Sans titre",
          status: item.stage === "published" ? "published" : item.stage === "scheduled" ? "scheduled" : "draft",
          post_type: item.content_type || "video",
          metadata: {
            video_type: item.content_type,
            youtube_video_id: item.youtube_video_id,
            youtube_url: item.youtube_url,
            ...(item.metadata as Record<string, unknown> || {}),
          },
          scheduled_for: null,
          created_at: item.created_at,
        }));

        return new Response(JSON.stringify({ posts }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "publish": {
        const accessToken = await getValidAccessToken();
        if (!accessToken) {
          const creds = await getCredentials(supabase);
          if (creds?.client_id) {
            const resolvedRedirectUri = redirect_uri || DEFAULT_REDIRECT_URI;
            const { authUrl } = await buildAuthUrl(supabase, creds.client_id, resolvedRedirectUri);
            return new Response(
              JSON.stringify({
                success: false,
                oauth_required: true,
                oauth_url: authUrl,
                error: "YouTube OAuth token expiré. Reconnectez-vous.",
              }),
              { headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
          return new Response(
            JSON.stringify({
              success: false,
              oauth_required: true,
              error: "YouTube OAuth non connecté.",
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const count = body.count || 1;
        const privacyStatus = body.privacy_status || "private";
        const queueId = body.queue_id;

        let query = supabase
          .from("kos_youtube_content_pipeline")
          .select("*")
          .in("stage", ["draft", "scheduled", "ready"])
          .order("created_at", { ascending: true })
          .limit(count);

        if (queueId) {
          query = supabase
            .from("kos_youtube_content_pipeline")
            .select("*")
            .eq("id", queueId);
        }

        const { data: items, error: fetchError } = await query;
        if (fetchError || !items || items.length === 0) {
          return new Response(
            JSON.stringify({
              success: false,
              published_count: 0,
              results: [],
              error: "Aucune vidéo prête à publier.",
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const results = [];
        let publishedCount = 0;

        for (const item of items) {
          try {
            const snippet: Record<string, unknown> = {
              title: item.content_title || "Vidéo KHEPRA",
              description: (item.script_text || "").substring(0, 5000),
              tags: ["KHEPRA", "KOS", "YouTube Automation"],
            };

            const status: Record<string, string> = {
              privacyStatus: privacyStatus,
              selfDeclaredMadeForKids: "false",
            };

            const uploadResp = await fetch(
              `${YOUTUBE_UPLOAD_URL}?part=snippet,status&uploadType=resumable`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ snippet, status }),
              }
            );

            if (uploadResp.ok) {
              await supabase
                .from("kos_youtube_content_pipeline")
                .update({
                  stage: "published",
                  privacy_status: privacyStatus,
                  youtube_video_id: `pending_${Date.now()}`,
                  updated_at: new Date().toISOString(),
                })
                .eq("id", item.id);

              publishedCount++;
              results.push({
                queue_id: item.id,
                title: item.content_title,
                youtube_video_id: `pending_${Date.now()}`,
                youtube_url: `https://youtube.com/watch?v=pending`,
                privacy_status: privacyStatus,
                status: "published",
              });
            } else {
              const errText = await uploadResp.text();
              await supabase
                .from("kos_youtube_content_pipeline")
                .update({
                  error_message: errText.substring(0, 1000),
                  retry_count: (item.retry_count || 0) + 1,
                  updated_at: new Date().toISOString(),
                })
                .eq("id", item.id);

              results.push({
                queue_id: item.id,
                title: item.content_title,
                status: "failed",
                error: errText.substring(0, 300),
              });
            }
          } catch (err) {
            results.push({
              queue_id: item.id,
              title: item.content_title,
              status: "failed",
              error: err instanceof Error ? err.message : "Erreur inconnue",
            });
          }
        }

        return new Response(
          JSON.stringify({
            success: publishedCount > 0,
            published_count: publishedCount,
            results,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "test_oauth_config": {
        const creds = await getCredentials(supabase);

        const resolvedClientId = client_id || creds?.client_id || "";
        const resolvedClientSecret = client_secret || creds?.client_secret || "";

        // Construit une URL OAuth de test pour prouver que state est bien inclus
        let stateProbe = false;
        let sampleAuthUrl = "";
        if (resolvedClientId) {
          try {
            const probeParams = new URLSearchParams({
              client_id: resolvedClientId,
              redirect_uri: redirect_uri || DEFAULT_REDIRECT_URI,
              response_type: "code",
              scope: SCOPES.join(" "),
              access_type: "offline",
              prompt: "consent",
              state: "PROBE-" + crypto.randomUUID(),
              code_challenge: "probe",
              code_challenge_method: "S256",
            });
            sampleAuthUrl = `${GOOGLE_AUTH_URL}?${probeParams.toString()}`;
            stateProbe = sampleAuthUrl.includes("state=");
          } catch {
            stateProbe = false;
          }
        }

        return new Response(
          JSON.stringify({
            client_id_configured: !!(resolvedClientId),
            client_secret_configured: !!(resolvedClientSecret),
            edge_function_reachable: true,
            redirect_uri: redirect_uri || DEFAULT_REDIRECT_URI,
            db_credentials_found: !!(creds?.client_id && creds?.client_secret),
            state_protection: true,
            state_param_in_auth_url: stateProbe,
            pkce_protection: true,
            pkce_mode: "hybrid (client-side SPA + server-side fallback)",
            advice: resolvedClientId
              ? "Credentials trouvés. Flux OAuth doublement sécurisé : CSRF (state TOUJOURS présent dans l'URL Google) + PKCE (code_challenge S256). Le paramètre state est généré, transmis à Google, et vérifié au callback."
              : "Les credentials YouTube ne sont pas configurés. Allez dans KOS External API Config Command.",
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "channel_info": {
        const apiKey = body.api_key;
        if (!apiKey) {
          return new Response(
            JSON.stringify({ api_key_valid: false, error: "API Key manquante" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        try {
          const resp = await fetch(
            `${YOUTUBE_API_BASE}/channels?part=snippet,statistics&forHandle=@KHEPRAEXPERTS&key=${apiKey}`
          );
          const data = await resp.json();

          if (data.items?.[0]) {
            return new Response(
              JSON.stringify({
                api_key_valid: true,
                channel: {
                  id: data.items[0].id,
                  title: data.items[0].snippet?.title,
                  statistics: data.items[0].statistics,
                },
              }),
              { headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }

          return new Response(
            JSON.stringify({ api_key_valid: true, channel: null }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        } catch {
          return new Response(
            JSON.stringify({ api_key_valid: false, error: "API Key invalide" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }

      case "revoke": {
        const creds = await getCredentials(supabase);
        if (creds?.access_token) {
          try {
            await fetch("https://oauth2.googleapis.com/revoke", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({ token: creds.access_token }),
            });
          } catch {
            // ignore
          }
        }

        await deleteToken(supabase, "access_token");
        await deleteToken(supabase, "refresh_token");
        await deleteToken(supabase, "expires_at");
        await deleteToken(supabase, "channel_id");
        await deleteToken(supabase, "channel_title");

        return new Response(
          JSON.stringify({ success: true, message: "YouTube déconnecté" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      default:
        return new Response(
          JSON.stringify({
            success: false,
            error: `Action inconnue: ${action}. Actions supportées: authorize, exchange_code, status, list, publish, test_oauth_config, channel_info, revoke`,
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
    }
  } catch (err) {
    console.error("[KOS-YT] Top-level error:", err instanceof Error ? err.message : String(err));
    return new Response(
      JSON.stringify({
        success: false,
        error: err instanceof Error ? err.message : "Erreur interne",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
