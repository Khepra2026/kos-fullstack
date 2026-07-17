import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, GET, OPTIONS" }
const LINKEDIN_COMPANY = "khepra-experts"
const LINKEDIN_COMPANY_URL = `https://www.linkedin.com/company/${LINKEDIN_COMPANY}`
const LINKEDIN_AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization"
const LINKEDIN_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken"
const LINKEDIN_POSTS_API = "https://api.linkedin.com/v2/posts"

function getSupabaseClient() { return createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { autoRefreshToken: false, persistSession: false } }) }

async function fetchBridgeData() {
  try {
    const [oembedRes, ogRes] = await Promise.all([
      fetch(`https://www.linkedin.com/oembed?url=${encodeURIComponent(LINKEDIN_COMPANY_URL)}&format=json`, { headers: { "User-Agent": "KOS-Bridge/1.0" } }),
      fetch(LINKEDIN_COMPANY_URL, { headers: { "User-Agent": "Mozilla/5.0 (compatible; KOS-Bridge/1.0)" } })
    ])
    let companyName: string | null = null; let description: string | null = null; let logoUrl: string | null = null; let followers: number | null = null
    if (oembedRes.ok) { const data = await oembedRes.json(); companyName = data.author_name || data.title || null; description = data.description || null; logoUrl = data.thumbnail_url || null }
    if (ogRes.ok) {
      const html = await ogRes.text()
      if (!companyName) { const m = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i); if (m) companyName = m[1] }
      if (!description) { const m = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i); if (m) description = m[1] }
      if (!logoUrl) { const m = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i); if (m) logoUrl = m[1] }
      const fm = html.match(/(\d[\d,]*)\s*(?:followers|abonnés)/i); if (fm) followers = parseInt(fm[1].replace(/,/g,""),10) || null
    }
    return { company_name: companyName, description, logo_url: logoUrl, followers, source: "bridge", confidence: 60, last_updated: new Date().toISOString() }
  } catch { return { company_name: "KHEPRA EXPERTS", description: null, logo_url: null, followers: null, source: "bridge", confidence: 0, last_updated: new Date().toISOString() } }
}

function getRedirectUri(): string { return "https://khepraexperts.com/linkedin-callback" }
function generateState(): string { return crypto.randomUUID() }

async function getLinkedInCredentials(supabase: ReturnType<typeof createClient>) {
  let clientId = Deno.env.get("LINKEDIN_CLIENT_ID") || ""
  let clientSecret = Deno.env.get("LINKEDIN_CLIENT_SECRET") || ""
  if (!clientId || !clientSecret) {
    const { data: creds } = await supabase.from("platform_credentials").select("credential_name, credential_value").eq("platform","linkedin").eq("is_active",true)
    if (creds) for (const row of creds) {
      if (row.credential_name === "client_id" || row.credential_name === "LINKEDIN_CLIENT_ID") clientId = clientId || row.credential_value
      if (row.credential_name === "client_secret" || row.credential_name === "LINKEDIN_CLIENT_SECRET") clientSecret = clientSecret || row.credential_value
    }
  }
  return { clientId, clientSecret }
}

async function getValidLinkedInToken(supabase: ReturnType<typeof createClient>): Promise<{ token: string } | { error: string; oauth_required: boolean }> {
  const { data: accessRow } = await supabase.from("social_api_tokens").select("token_value, expires_at, is_active").eq("provider","linkedin").eq("token_name","access_token").maybeSingle()
  if (!accessRow?.is_active || !accessRow?.token_value) return { error: "LinkedIn non connecté", oauth_required: true }
  const expired = accessRow.expires_at ? new Date(accessRow.expires_at) < new Date() : false
  if (expired) {
    const { data: refreshRow } = await supabase.from("social_api_tokens").select("token_value").eq("provider","linkedin").eq("token_name","refresh_token").eq("is_active",true).maybeSingle()
    if (!refreshRow?.token_value) return { error: "Token expiré — réautorisation requise", oauth_required: true }
    const { clientId, clientSecret } = await getLinkedInCredentials(supabase)
    const refreshBody = new URLSearchParams({ grant_type:"refresh_token", refresh_token: refreshRow.token_value, client_id: clientId, client_secret: clientSecret })
    const resp = await fetch(LINKEDIN_TOKEN_URL, { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body: refreshBody.toString() })
    if (!resp.ok) return { error: "Échec refresh token", oauth_required: true }
    const data = await resp.json()
    await supabase.from("social_api_tokens").update({ token_value: data.access_token, expires_at: new Date(Date.now()+data.expires_in*1000).toISOString(), updated_at: new Date().toISOString(), last_used_at: new Date().toISOString(), is_active: true }).eq("provider","linkedin").eq("token_name","access_token")
    return { token: data.access_token }
  }
  return { token: accessRow.token_value }
}

async function publishTextPost(token: string, text: string, hashtags: string[]) {
  let commentary = text
  if (hashtags?.length) commentary += "\n\n" + hashtags.join(" ")
  try {
    const resp = await fetch(LINKEDIN_POSTS_API, { method:"POST", headers:{"Authorization":`Bearer ${token}`,"Content-Type":"application/json","X-Restli-Protocol-Version":"2.0.0","LinkedIn-Version":"202405"}, body: JSON.stringify({ author:"urn:li:person:me", commentary, visibility:"PUBLIC", distribution:{ feedDistribution:"MAIN_FEED", targetEntities:[], thirdPartyDistributionChannels:[] }, lifecycleState:"PUBLISHED", isReshareDisabledByAuthor:false }) })
    if (!resp.ok) { const errBody = await resp.text(); return { success: false, error: errBody.substring(0,500) } }
    const postUrn = resp.headers.get("x-restli-id") || ""
    return { success: true, post_urn: postUrn, post_id: postUrn ? postUrn.split(":").pop() : "" }
  } catch (e) { return { success: false, error: String(e) } }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders })
  try {
    const supabase = getSupabaseClient()
    const url = new URL(req.url)
    const action = url.searchParams.get("action") || "status"

    if (action === "health") return new Response(JSON.stringify({ status:"ok", engine:"kos-linkedin-master-v1", actions:["health","fetch","authorize","callback","status","revoke","save_credentials","publish"] }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })

    if (action === "fetch") {
      const data = await fetchBridgeData()
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
    }

    if (action === "save_credentials" && req.method === "POST") {
      const body = await req.json()
      const { client_id, client_secret } = body
      if (!client_id?.trim() || !client_secret?.trim()) return new Response(JSON.stringify({ success:false, error:"client_id et client_secret requis" }), { status:400, headers:{ ...corsHeaders, "Content-Type":"application/json" } })
      const now = new Date().toISOString()
      const saved: string[] = []
      const { error: e1 } = await supabase.from("platform_credentials").upsert({ platform:"linkedin", credential_name:"client_id", credential_value: client_id.trim(), is_active:true, updated_at:now }, { onConflict:"platform,credential_name" })
      if (!e1) saved.push("client_id")
      const { error: e2 } = await supabase.from("platform_credentials").upsert({ platform:"linkedin", credential_name:"client_secret", credential_value: client_secret.trim(), is_active:true, updated_at:now }, { onConflict:"platform,credential_name" })
      if (!e2) saved.push("client_secret")
      return new Response(JSON.stringify({ success: saved.length===2, saved_credentials: saved }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
    }

    if (action === "authorize" && req.method === "POST") {
      const { clientId, clientSecret } = await getLinkedInCredentials(supabase)
      if (!clientId || !clientSecret) return new Response(JSON.stringify({ success:false, error:"LinkedIn Client ID non configuré", setup_required:true }), { status:400, headers:{ ...corsHeaders, "Content-Type":"application/json" } })
      const state = generateState()
      await supabase.from("oauth_states").insert({ state, expires_at: new Date(Date.now()+10*60*1000).toISOString(), created_at: new Date().toISOString() })
      const scopes = ["openid","profile","email","w_member_social","w_organization_social","r_organization_social"]
      const params = new URLSearchParams({ response_type:"code", client_id: clientId, redirect_uri: getRedirectUri(), state, scope: scopes.join(" ") })
      return new Response(JSON.stringify({ success:true, auth_url: `${LINKEDIN_AUTH_URL}?${params.toString()}`, state, scopes }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
    }

    if (action === "callback") {
      const code = url.searchParams.get("code"); const state = url.searchParams.get("state"); const error = url.searchParams.get("error")
      if (error) return new Response(null, { status:302, headers:{ ...corsHeaders, Location: `https://khepraexperts.com/linkedin-connect?error=${encodeURIComponent(error)}` } })
      if (!code) return new Response(null, { status:302, headers:{ ...corsHeaders, Location: `https://khepraexperts.com/linkedin-connect?error=${encodeURIComponent("Code manquant")}` } })
      if (state) {
        const { data: stateData } = await supabase.from("oauth_states").select("state, expires_at").eq("state",state).maybeSingle()
        if (!stateData) return new Response(null, { status:302, headers:{ ...corsHeaders, Location: `https://khepraexperts.com/linkedin-connect?error=${encodeURIComponent("Session expirée")}` } })
        await supabase.from("oauth_states").update({ used:true }).eq("state",state)
      }
      const { clientId, clientSecret } = await getLinkedInCredentials(supabase)
      const tokenBody = new URLSearchParams({ grant_type:"authorization_code", code, redirect_uri: getRedirectUri(), client_id: clientId, client_secret: clientSecret })
      const tokenResp = await fetch(LINKEDIN_TOKEN_URL, { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body: tokenBody.toString() })
      if (!tokenResp.ok) return new Response(null, { status:302, headers:{ ...corsHeaders, Location: `https://khepraexperts.com/linkedin-connect?error=Échec échange token` } })
      const tokenData = await tokenResp.json()
      const expiresAt = new Date(Date.now()+tokenData.expires_in*1000).toISOString(); const now = new Date().toISOString()
      await supabase.from("social_api_tokens").delete().eq("provider","linkedin")
      const rows = [{ provider:"linkedin", token_name:"access_token", token_value: tokenData.access_token, is_active:true, expires_at: expiresAt, updated_at:now, last_used_at:now }]
      if (tokenData.refresh_token) rows.push({ provider:"linkedin", token_name:"refresh_token", token_value: tokenData.refresh_token, is_active:true, updated_at:now, last_used_at:now })
      await supabase.from("social_api_tokens").insert(rows)
      return new Response(null, { status:302, headers:{ ...corsHeaders, Location: `https://khepraexperts.com/linkedin-connect?success=true&scopes=${encodeURIComponent(tokenData.scope||"")}` } })
    }

    if (action === "status") {
      const { data: accessRow } = await supabase.from("social_api_tokens").select("token_value, expires_at, is_active").eq("provider","linkedin").eq("token_name","access_token").maybeSingle()
      const hasToken = accessRow?.is_active && accessRow?.token_value
      const expired = accessRow?.expires_at ? new Date(accessRow.expires_at) < new Date() : false
      const { clientId } = await getLinkedInCredentials(supabase)
      return new Response(JSON.stringify({ connected: hasToken && !expired, expired, credentials_configured: !!(clientId), expires_at: accessRow?.expires_at || null }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
    }

    if (action === "revoke" && req.method === "POST") {
      await supabase.from("social_api_tokens").update({ is_active:false, updated_at: new Date().toISOString() }).eq("provider","linkedin")
      return new Response(JSON.stringify({ success:true, message:"LinkedIn déconnecté" }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
    }

    if (action === "publish" && req.method === "POST") {
      const body = await req.json()
      const tokenResult = await getValidLinkedInToken(supabase)
      if ("error" in tokenResult) return new Response(JSON.stringify({ success:false, error: tokenResult.error, oauth_required: tokenResult.oauth_required }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
      
      if (body.queue_id) {
        const { data: queueItem } = await supabase.from("social_automation_queue").select("*").eq("id",body.queue_id).eq("platform","linkedin").maybeSingle()
        if (!queueItem) return new Response(JSON.stringify({ success:false, error:"Post introuvable" }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
        const postText = body.text || String(queueItem.content || queueItem.title || "")
        const postHashtags = body.hashtags || (queueItem.hashtags as string[]) || []
        const result = await publishTextPost(tokenResult.token, postText, postHashtags)
        if (result.success) {
          const existingMeta = (queueItem.metadata as Record<string, unknown>) || {}
          await supabase.from("social_automation_queue").update({ status:"published", metadata: { ...existingMeta, linkedin_post_urn: result.post_urn, published_at: new Date().toISOString() }, updated_at: new Date().toISOString() }).eq("id",body.queue_id)
          return new Response(JSON.stringify({ success:true, published_count:1, results:[{ queue_id: body.queue_id, title: queueItem.title, post_urn: result.post_urn, status:"published" }] }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
        }
        return new Response(JSON.stringify({ success:false, error: result.error }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
      }

      const publishCount = body.count || 1
      const { data: drafts } = await supabase.from("social_automation_queue").select("*").eq("platform","linkedin").in("status",["draft","scheduled"]).order("created_at",{ascending:true}).limit(publishCount)
      if (!drafts?.length) return new Response(JSON.stringify({ success:false, error:"Aucun brouillon LinkedIn" }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
      const results = []; let published = 0
      for (const item of drafts) {
        const postText = String(item.content || item.title || "")
        const postHashtags = (item.hashtags as string[]) || []
        const result = await publishTextPost(tokenResult.token, postText, postHashtags)
        if (result.success) {
          published++
          const existingMeta = (item.metadata as Record<string, unknown>) || {}
          await supabase.from("social_automation_queue").update({ status:"published", metadata: { ...existingMeta, linkedin_post_urn: result.post_urn, published_at: new Date().toISOString() }, updated_at: new Date().toISOString() }).eq("id",item.id)
          results.push({ queue_id: item.id, title: item.title, post_urn: result.post_urn, status:"published" })
        } else { results.push({ queue_id: item.id, title: item.title, status:"failed", error: result.error }) }
      }
      return new Response(JSON.stringify({ success:true, published_count: published, results }), { headers: { ...corsHeaders, "Content-Type":"application/json" } })
    }

    return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), { status:400, headers:{ ...corsHeaders, "Content-Type":"application/json" } })
  } catch (err) { return new Response(JSON.stringify({ error: String(err) }), { status:500, headers:{ ...corsHeaders, "Content-Type":"application/json" } }) }
})