import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"

function getSupabaseAdmin() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  )
}

async function getYouTubeCredentials(supabase: ReturnType<typeof createClient>) {
  const { data } = await supabase
    .from("platform_credentials")
    .select("credential_name, credential_value")
    .eq("platform", "youtube")
    .eq("is_active", true)

  if (!data?.length) return null
  const creds: Record<string, string> = {}
  data.forEach((r: any) => { creds[r.credential_name] = r.credential_value })
  return creds
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { user_id } = body

    if (!user_id) {
      return new Response(
        JSON.stringify({ success: false, error: "user_id requis" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const supabase = getSupabaseAdmin()
    const creds = await getYouTubeCredentials(supabase)

    if (!creds?.client_id || !creds?.client_secret) {
      return new Response(
        JSON.stringify({ success: false, error: "Credentials YouTube non configurés dans platform_credentials" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // 1. Récupère le refresh_token depuis yt_tokens
    const { data: tokenRow, error: tokenError } = await supabase
      .from("yt_tokens")
      .select("refresh_token, expires_at")
      .eq("user_id", user_id)
      .maybeSingle()

    if (tokenError || !tokenRow?.refresh_token) {
      return new Response(
        JSON.stringify({ success: false, error: "Aucun refresh_token trouvé pour cet utilisateur. Reconnectez-vous via OAuth." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // 2. Si le token est encore valide, on pourrait retourner un cached — mais ici on refresh toujours
    // car le worker a besoin d'un token frais pour l'upload

    // 3. Refresh via Google OAuth
    const bodyParams = new URLSearchParams({
      client_id: creds.client_id,
      client_secret: creds.client_secret,
      refresh_token: tokenRow.refresh_token,
      grant_type: "refresh_token",
    })

    const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: bodyParams.toString(),
    })

    const newTokens = await tokenRes.json()

    if (!tokenRes.ok || newTokens.error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: newTokens.error_description || newTokens.error || "Échec du refresh token Google",
        }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // 4. Met à jour expires_at dans yt_tokens
    const expiresAt = newTokens.expires_in
      ? new Date(Date.now() + (newTokens.expires_in - 60) * 1000).toISOString()
      : null

    if (expiresAt) {
      await supabase
        .from("yt_tokens")
        .update({ expires_at: expiresAt, updated_at: new Date().toISOString() })
        .eq("user_id", user_id)
    }

    return new Response(
      JSON.stringify({
        success: true,
        access_token: newTokens.access_token,
        expires_in: newTokens.expires_in || 3600,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err instanceof Error ? err.message : "Erreur interne",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
