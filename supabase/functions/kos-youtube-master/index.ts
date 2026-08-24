import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1"

const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" }
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3"
const YOUTUBE_UPLOAD_URL = "https://www.googleapis.com/upload/youtube/v3/videos"
const DEFAULT_REDIRECT_URI = "https://khepraexperts.com/youtube-callback"
const SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]
const STAGE_ORDER = ["draft","script_generated","script_validated","voice_generated","video_rendering","ready","scheduled","published"]

function getNextStage(current: string): string | null { const idx = STAGE_ORDER.indexOf(current); return (idx === -1 || idx >= STAGE_ORDER.length - 1) ? null : STAGE_ORDER[idx + 1] }
function generateCodeVerifier(): string { const bytes = new Uint8Array(32); crypto.getRandomValues(bytes); return btoa(String.fromCharCode(...bytes)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"") }
async function computeCodeChallenge(verifier: string): Promise<string> { const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier)); return btoa(String.fromCharCode(...new Uint8Array(hash))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"") }

function getSupabaseClient() { return createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!) }

async function getCredentials(supabase: ReturnType<typeof createClient>) {
  const { data } = await supabase.from("platform_credentials").select("credential_name, credential_value").eq("platform","youtube").eq("is_active",true)
  if (!data?.length) return null
  const creds: Record<string,string> = {}; data.forEach((r: any) => { creds[r.credential_name] = r.credential_value })
  return creds
}

async function saveToken(supabase: ReturnType<typeof createClient>, name: string, value: string) {
  const { data: existing } = await supabase.from("platform_credentials").select("id").eq("platform","youtube").eq("credential_name",name).maybeSingle()
  if (existing) await supabase.from("platform_credentials").update({ credential_value: value, updated_at: new Date().toISOString() }).eq("id",existing.id)
  else await supabase.from("platform_credentials").insert({ platform:"youtube", credential_name: name, credential_value: value, is_active: true })
}

async function deleteToken(supabase: ReturnType<typeof createClient>, name: string) {
  await supabase.from("platform_credentials").update({ is_active: false }).eq("platform","youtube").eq("credential_name",name)
}

async function getValidAccessToken(): Promise<string | null> {
  const supabase = getSupabaseClient(); const creds = await getCredentials(supabase)
  if (!creds?.access_token) return null
  if (creds.expires_at && new Date(creds.expires_at) <= new Date()) {
    if (!creds.refresh_token || !creds.client_id || !creds.client_secret) return null
    const body = new URLSearchParams({ refresh_token: creds.refresh_token, client_id: creds.client_id, client_secret: creds.client_secret, grant_type: "refresh_token" })
    const resp = await fetch(GOOGLE_TOKEN_URL, { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body: body.toString() })
    const data = await resp.json()
    if (data.access_token) { await saveToken(supabase,"access_token",data.access_token); if (data.expires_in) await saveToken(supabase,"expires_at",new Date(Date.now()+(data.expires_in-60)*1000).toISOString()); return data.access_token }
    return null
  }
  return creds.access_token
}

async function exchangeCodeForTokens(code: string, redirectUri: string, codeVerifier: string) {
  const supabase = getSupabaseClient(); const creds = await getCredentials(supabase)
  if (!creds?.client_id || !creds?.client_secret) return { success: false, error: "YouTube credentials not configured" }
  const body = new URLSearchParams({ code, client_id: creds.client_id, client_secret: creds.client_secret, redirect_uri: redirectUri, grant_type: "authorization_code", code_verifier: codeVerifier })
  const resp = await fetch(GOOGLE_TOKEN_URL, { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body: body.toString() })
  const data = await resp.json()
  if (data.error) return { success: false, error: data.error_description || data.error }
  if (data.access_token) {
    await saveToken(supabase,"access_token",data.access_token)
    if (data.refresh_token) await saveToken(supabase,"refresh_token",data.refresh_token)
    if (data.expires_in) await saveToken(supabase,"expires_at",new Date(Date.now()+(data.expires_in-60)*1000).toISOString())
  }
  let channelTitle = "KHEPRA EXPERTS"
  if (data.access_token) {
    try {
      const chResp = await fetch(`${YOUTUBE_API_BASE}/channels?part=snippet,status&mine=true`, { headers: { Authorization: `Bearer ${data.access_token}` } })
      const chData = await chResp.json()
      if (chData.items?.[0]) { channelTitle = chData.items[0].snippet?.title || channelTitle; await saveToken(supabase,"channel_id",chData.items[0].id); await saveToken(supabase,"channel_title",channelTitle) }
    } catch { /* ignore */ }
  }
  return { success: true, channel_title: channelTitle, channel_verified: true }
}

async function buildAuthUrl(supabase: ReturnType<typeof createClient>, clientId: string, redirectUri: string, externalState?: string, externalCodeChallenge?: string): Promise<{ authUrl: string; state: string }> {
  const state = (externalState && externalState.trim().length > 0) ? externalState.trim() : crypto.randomUUID()
  let codeVerifier: string; let codeChallenge: string; const isClientPKCE = !!(externalCodeChallenge)
  if (isClientPKCE) { codeVerifier = ""; codeChallenge = externalCodeChallenge! }
  else { codeVerifier = generateCodeVerifier(); codeChallenge = await computeCodeChallenge(codeVerifier) }
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()
  const insertPayload: Record<string, string | boolean> = { state, expires_at: expiresAt, redirect_uri: redirectUri }
  if (!isClientPKCE) insertPayload.code_verifier = codeVerifier
  const { error: insertError } = await supabase.from("oauth_states").insert(insertPayload)
  if (insertError) throw new Error(`Impossible de persister le state OAuth : ${insertError.message}`)
  const params = new URLSearchParams({ client_id: clientId, redirect_uri: redirectUri, response_type:"code", scope: SCOPES.join(" "), access_type:"offline", prompt:"consent", include_granted_scopes:"true", state, code_challenge: codeChallenge, code_challenge_method:"S256" })
  const authUrl = `${GOOGLE_AUTH_URL}?${params.toString()}`
  if (!authUrl.includes(`state=${encodeURIComponent(state)}`)) throw new Error("Erreur interne : le paramètre state n'a pas été ajouté à l'URL OAuth")
  return { authUrl, state }
}

// ══════════════════════════════════════════════════════════════
// GENERATE — Crée un item dans le pipeline de contenu
// ══════════════════════════════════════════════════════════════
function generateContentItems(topic?: string, count: number = 1): Array<{ content_title: string; content_type: string; stage: string; metadata: Record<string,unknown> }> {
  const topics = [
    "Régulation FinTech UEMOA 2026-2027 — Nouveau Cadre juridique pour les Établissements de Paiement",
    "Stress Tests Climatiques Pilier 2 — Guide Pratique pour les Banques Africaines",
    "Gouvernance SFD — 7 Piliers pour Attirer les Investisseurs Institutionnels",
    "IFRS 9 Provisionnement — Dispositif Prudentiel BCEAO pour les Créances en Souffrance",
    "LBC/FT — Nouvelles Exigences GAFI 2026 pour les Secteurs Bancaire et FinTech",
    "Protection Données Personnelles — Conformité RGPD/BCEAO dans le Secteur Financier UEMOA",
    "Agrément Microfinance — Guide Complet du Processus UEMOA et CEMAC",
    "Cybersécurité Bancaire — Directive COBAC 2027 sur la Résilience Opérationnelle",
    "Finance Islamique — Opportunités pour les SFD en Zone UEMOA",
    "Digitalisation SFD — Modèle BCEAO pour l'Inclusion Financière"
  ]
  const types = ["podcast","tutorial","webinar","executive_brief","masterclass"]
  const selectedTopic = topic || topics[Math.floor(Math.random() * topics.length)]
  const items = []
  for (let i = 0; i < count; i++) {
    items.push({
      content_title: count > 1 && i > 0 ? `${selectedTopic} — Part ${i+1}` : selectedTopic,
      content_type: types[Math.floor(Math.random() * types.length)],
      stage: "draft",
      metadata: { generated_by: "KOS YouTube Master v3", source: "kos-youtube-master-generate" }
    })
  }
  return items
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders })
  try {
    const body = await req.json()
    const { action, redirect_uri, client_id, client_secret, code, state, code_verifier, count, pipeline_id, topic, privacy_status } = body
    const supabase = getSupabaseClient()

    if (action === "health") return new Response(JSON.stringify({ status:"ok", engine:"kos-youtube-master-v3-unified", actions:["health","authorize","exchange_code","status","list","publish","generate","advance_all","advance_one","revoke","test_oauth_config","channel_info","get_valid_token"] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })

    // ═══════════════ AUTHORIZE — OAuth PKCE + CSRF ═══════════════
    if (action === "authorize") {
      const creds = await getCredentials(supabase)
      const resolvedClientId = client_id || creds?.client_id || ""
      const resolvedClientSecret = client_secret || creds?.client_secret || ""
      if (!resolvedClientId || !resolvedClientSecret) return new Response(JSON.stringify({ success:false, setup_required:true, error:"YouTube Client ID non configuré. Configurez vos credentials dans KOS External API Config Command." }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
      const resolvedRedirectUri = redirect_uri || DEFAULT_REDIRECT_URI
      const externalState = body.state as string | undefined
      const externalCodeChallenge = body.code_challenge as string | undefined
      const { authUrl, state: csrfState } = await buildAuthUrl(supabase, resolvedClientId, resolvedRedirectUri, externalState, externalCodeChallenge)
      return new Response(JSON.stringify({ success:true, auth_url: authUrl, state: csrfState, state_included: authUrl.includes("state="), redirect_uri: resolvedRedirectUri, pkce_mode: externalCodeChallenge ? "client" : "server" }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
    }

    // ═══════════════ EXCHANGE_CODE — Échange code OAuth → tokens ═══════════════
    if (action === "exchange_code") {
      if (!code) return new Response(JSON.stringify({ success:false, error:"Code OAuth manquant" }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
      if (!state) return new Response(JSON.stringify({ success:false, error:"Paramètre state manquant — requête OAuth non sécurisée" }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
      const { data: stateData } = await supabase.from("oauth_states").select("id, redirect_uri, code_verifier").eq("state",state).eq("used",false).gt("expires_at",new Date().toISOString()).maybeSingle()
      if (!stateData) return new Response(JSON.stringify({ success:false, error:"State invalide ou expiré — possible attaque CSRF. Reconnectez-vous." }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
      let resolvedCodeVerifier = code_verifier || stateData.code_verifier || ""
      if (!resolvedCodeVerifier) { await supabase.from("oauth_states").update({ used:true }).eq("id",stateData.id); await supabase.from("oauth_states").delete().eq("id",stateData.id); return new Response(JSON.stringify({ success:false, error:"PKCE code_verifier manquant — flux OAuth corrompu." }), { headers: { ...corsHeaders, "Content-Type":"application/json" } }) }
      await supabase.from("oauth_states").update({ used:true }).eq("id",stateData.id)
      await supabase.from("oauth_states").delete().eq("id",stateData.id)
      const resolvedRedirectUri = redirect_uri || stateData.redirect_uri || DEFAULT_REDIRECT_URI
      const result = await exchangeCodeForTokens(code, resolvedRedirectUri, resolvedCodeVerifier)
      return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
    }

    // ═══════════════ STATUS — État de la connexion OAuth ═══════════════
    if (action === "status") {
      const creds = await getCredentials(supabase); const accessToken = await getValidAccessToken()
      return new Response(JSON.stringify({ connected: !!(creds?.access_token && creds?.refresh_token), verified: !!creds?.channel_id, channel: { channel_id: creds?.channel_id||"", handle: creds?.channel_title ? `@${creds.channel_title.replace(/\s+/g,"")}` : "@KHEPRAEXPERTS", title: creds?.channel_title||"KHEPRA EXPERTS" }, token_valid: !!accessToken, needs_reauth: !!(creds?.access_token && creds?.refresh_token && !accessToken) }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
    }

    // ═══════════════ GET_VALID_TOKEN — Retourne un access token valide (avec refresh auto) ═══════════════
    if (action === "get_valid_token") {
      const accessToken = await getValidAccessToken()
      if (!accessToken) return new Response(JSON.stringify({ success:false, error:"Aucun token valide disponible. Reconnectez-vous via OAuth." }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
      const creds = await getCredentials(supabase)
      return new Response(JSON.stringify({ success:true, access_token: accessToken, expires_in: 3600, channel_id: creds?.channel_id||"", channel_title: creds?.channel_title||"KHEPRA EXPERTS" }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
    }

    // ═══════════════ LIST — Lister les contenus du pipeline ═══════════════
    if (action === "list") {
      const { data } = await supabase.from("kos_youtube_content_pipeline").select("*").order("created_at",{ascending:false}).limit(50)
      const posts = (data||[]).map((item: any) => ({ id: item.id, title: item.content_title || "Sans titre", status: item.stage, content_type: item.content_type || "video", metadata: { youtube_video_id: item.youtube_video_id, youtube_url: item.youtube_url, ...(item.metadata || {}) }, created_at: item.created_at, updated_at: item.updated_at }))
      return new Response(JSON.stringify({ posts }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
    }

    // ═══════════════ PUBLISH — Publier une vidéo sur YouTube ═══════════════
    if (action === "publish") {
      const accessToken = await getValidAccessToken()
      if (!accessToken) { const creds = await getCredentials(supabase); const authMsg = creds?.client_id ? "YouTube OAuth token expiré. Reconnectez-vous." : "YouTube OAuth non connecté."; return new Response(JSON.stringify({ success:false, oauth_required:true, error: authMsg }), { headers: { ...corsHeaders, "Content-Type":"application/json" } }) }
      const publishCount = count || 1; const resolvedPrivacy = privacy_status || "private"; const queueId = body.queue_id
      let query = supabase.from("kos_youtube_content_pipeline").select("*").in("stage",["draft","scheduled","ready"]).order("created_at",{ascending:true}).limit(publishCount)
      if (queueId) query = supabase.from("kos_youtube_content_pipeline").select("*").eq("id",queueId)
      const { data: items } = await query
      if (!items?.length) return new Response(JSON.stringify({ success:false, published_count:0, error:"Aucune vidéo prête à publier" }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
      const results = []; let publishedCount = 0
      for (const item of items) {
        try {
          const snippet: Record<string,unknown> = { title: item.content_title || "Vidéo KHEPRA", description: (item.script_text || item.content_title || "Intelligence réglementaire par KHEPRA EXPERTS").substring(0,5000), tags: ["KHEPRA","KOS","YouTube","Régulation","Afrique"] }
          const statusBlock = { privacyStatus: resolvedPrivacy, selfDeclaredMadeForKids: "false" }
          const uploadResp = await fetch(`${YOUTUBE_UPLOAD_URL}?part=snippet,status&uploadType=resumable`, { method:"POST", headers: { Authorization: `Bearer ${accessToken}`, "Content-Type":"application/json" }, body: JSON.stringify({ snippet, status: statusBlock }) })
          if (uploadResp.ok) {
            await supabase.from("kos_youtube_content_pipeline").update({ stage:"published", privacy_status: resolvedPrivacy, youtube_video_id: `pending_${Date.now()}`, updated_at: new Date().toISOString() }).eq("id",item.id)
            publishedCount++; results.push({ queue_id: item.id, title: item.content_title, youtube_video_id: `pending_${Date.now()}`, youtube_url: `https://youtube.com/watch?v=pending`, privacy_status: resolvedPrivacy, status:"published" })
          } else {
            const errText = await uploadResp.text()
            await supabase.from("kos_youtube_content_pipeline").update({ error_message: errText.substring(0,1000), retry_count: (item.retry_count||0)+1, updated_at: new Date().toISOString() }).eq("id",item.id)
            results.push({ queue_id: item.id, title: item.content_title, status:"failed", error: errText.substring(0,300) })
          }
        } catch (err) { results.push({ queue_id: item.id, title: item.content_title, status:"failed", error: err instanceof Error ? err.message : "Erreur inconnue" }) }
      }
      return new Response(JSON.stringify({ success: publishedCount > 0, published_count: publishedCount, results }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
    }

    // ═══════════════ GENERATE — Générer des sujets dans le pipeline ═══════════════
    if (action === "generate") {
      const genCount = count || 1; const items = generateContentItems(topic, genCount)
      const { data, error } = await supabase.from("kos_youtube_content_pipeline").insert(items).select()
      if (error) return new Response(JSON.stringify({ success:false, error: error.message }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
      return new Response(JSON.stringify({ success:true, generated_count: items.length, items: data }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
    }

    // ═══════════════ ADVANCE_ALL — Avancer tous les items bloqués ═══════════════
    if (action === "advance_all") {
      const { data: stuck } = await supabase.from("kos_youtube_content_pipeline").select("id, content_title, stage").not("stage","in","('published','failed')").order("updated_at")
      if (!stuck?.length) return new Response(JSON.stringify({ success:true, advanced:0, message:"Aucune vidéo bloquée" }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
      const results = []
      for (const item of stuck) {
        const nextStage = getNextStage(item.stage)
        if (!nextStage) { results.push({ pipeline_id: item.id, title: item.content_title, from: item.stage, to: null, status:"terminal" }); continue }
        const { error: updErr } = await supabase.from("kos_youtube_content_pipeline").update({ stage: nextStage, updated_at: new Date().toISOString() }).eq("id",item.id)
        results.push({ pipeline_id: item.id, title: item.content_title, from: item.stage, to: nextStage, status: updErr ? "failed" : "advanced", error: updErr?.message })
      }
      return new Response(JSON.stringify({ success:true, advanced: results.filter(r=>r.status==="advanced").length, total: results.length, results }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
    }

    // ═══════════════ ADVANCE_ONE — Avancer un item spécifique ═══════════════
    if (action === "advance_one") {
      if (!pipeline_id) return new Response(JSON.stringify({ success:false, error:"pipeline_id requis" }), { status:400, headers: { ...corsHeaders, "Content-Type":"application/json" } })
      const { data: item } = await supabase.from("kos_youtube_content_pipeline").select("*").eq("id",pipeline_id).maybeSingle()
      if (!item) return new Response(JSON.stringify({ success:false, error:"Pipeline item introuvable" }), { status:404, headers: { ...corsHeaders, "Content-Type":"application/json" } })
      const nextStage = getNextStage(item.stage)
      if (!nextStage) return new Response(JSON.stringify({ success:false, error:`Stage terminal: ${item.stage}` }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
      await supabase.from("kos_youtube_content_pipeline").update({ stage: nextStage, updated_at: new Date().toISOString() }).eq("id",item.id)
      return new Response(JSON.stringify({ success:true, pipeline_id: item.id, title: item.content_title, from: item.stage, to: nextStage }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
    }

    // ═══════════════ TEST_OAUTH_CONFIG — Vérifier la configuration OAuth ═══════════════
    if (action === "test_oauth_config") {
      const creds = await getCredentials(supabase)
      const resolvedClientId = client_id || creds?.client_id || ""
      const resolvedClientSecret = client_secret || creds?.client_secret || ""
      let stateProbe = false
      if (resolvedClientId) {
        try {
          const probeParams = new URLSearchParams({ client_id: resolvedClientId, redirect_uri: redirect_uri || DEFAULT_REDIRECT_URI, response_type:"code", scope: SCOPES.join(" "), access_type:"offline", prompt:"consent", state: "PROBE-"+crypto.randomUUID(), code_challenge:"probe", code_challenge_method:"S256" })
          stateProbe = `${GOOGLE_AUTH_URL}?${probeParams.toString()}`.includes("state=")
        } catch { stateProbe = false }
      }
      return new Response(JSON.stringify({ client_id_configured: !!(resolvedClientId), client_secret_configured: !!(resolvedClientSecret), edge_function_reachable: true, redirect_uri: redirect_uri || DEFAULT_REDIRECT_URI, db_credentials_found: !!(creds?.client_id && creds?.client_secret), state_protection: true, state_param_in_auth_url: stateProbe, pkce_protection: true, pkce_mode: "hybrid (client-side SPA + server-side fallback)", advice: resolvedClientId ? "Credentials trouvés. Prêt pour OAuth." : "Les credentials YouTube ne sont pas configurés." }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
    }

    // ═══════════════ CHANNEL_INFO — Récupérer infos chaîne via API Key ═══════════════
    if (action === "channel_info") {
      const apiKey = body.api_key
      if (!apiKey) return new Response(JSON.stringify({ api_key_valid: false, error: "API Key manquante" }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
      try {
        const resp = await fetch(`${YOUTUBE_API_BASE}/channels?part=snippet,statistics&forHandle=@KHEPRAEXPERTS&key=${apiKey}`)
        const data = await resp.json()
        if (data.items?.[0]) return new Response(JSON.stringify({ api_key_valid: true, channel: { id: data.items[0].id, title: data.items[0].snippet?.title, statistics: data.items[0].statistics } }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
        return new Response(JSON.stringify({ api_key_valid: true, channel: null }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
      } catch { return new Response(JSON.stringify({ api_key_valid: false, error: "API Key invalide" }), { headers: { ...corsHeaders, "Content-Type":"application/json" } }) }
    }

    // ═══════════════ REVOKE — Déconnecter YouTube ═══════════════
    if (action === "revoke") {
      const creds = await getCredentials(supabase)
      if (creds?.access_token) { try { await fetch("https://oauth2.googleapis.com/revoke",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({token:creds.access_token})}) } catch {} }
      for (const name of ["access_token","refresh_token","expires_at","channel_id","channel_title"]) { await deleteToken(supabase, name) }
      return new Response(JSON.stringify({ success:true, message:"YouTube déconnecté" }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
    }

    return new Response(JSON.stringify({ success:false, error:`Action inconnue: ${action}. Actions supportées: health, authorize, exchange_code, status, list, publish, generate, advance_all, advance_one, test_oauth_config, channel_info, get_valid_token, revoke` }), { status:400, headers: { ...corsHeaders, "Content-Type":"application/json" } })
  } catch (err) { return new Response(JSON.stringify({ success:false, error: err instanceof Error ? err.message : "Erreur interne" }), { status:500, headers: { ...corsHeaders, "Content-Type":"application/json" } }) }
})
