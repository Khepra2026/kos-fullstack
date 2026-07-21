import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

// === CONFIG ===
const LINKEDIN_AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization"
const LINKEDIN_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken"
const LINKEDIN_POSTS_API = "https://api.linkedin.com/v2/posts"

// === OAUTH HANDLER - COLLE ICI LE CONTENU DE oauth_full.ts ===
// Exemple : supprime "serve(async (req) => {" et colle le reste
async function handleOAuth(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")
  
  if (!code) {
    return new Response(JSON.stringify({error: "missing code"}), {
      status: 400, 
      headers: {...corsHeaders, "Content-Type": "application/json"}
    })
  }
  
  // COLLE ICI LA LOGIQUE DE oauth_full.ts : échange code vs token, save DB, etc.
  // Finis par : return new Response(JSON.stringify({success: true}), {headers: corsHeaders})
  
  return new Response(JSON.stringify({error: "oauth_full.ts not merged"}), {
    status: 500, 
    headers: corsHeaders
  })
}

// === PUBLISHER HANDLER - COLLE ICI LE CONTENU DE publisher_full.ts ===
async function handlePublish(req: Request): Promise<Response> {
  // COLLE ICI LA LOGIQUE DE publisher_full.ts
  // Doit lire le body, poster sur LinkedIn, gérer circuit breaker
  
  return new Response("published", {headers: corsHeaders})
}

// === ROUTER ===
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const url = new URL(req.url)
  const action = url.pathname.split('/').pop()
  
  try {
    switch(action) {
      case 'oauth': 
        return await handleOAuth(req)
      case 'publish': 
        return await handlePublish(req)
      default: 
        return new Response('Not found', {status: 404, headers: corsHeaders})
    }
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), {
      status: 500, 
      headers: {...corsHeaders, "Content-Type": "application/json"}
    })
  }
})