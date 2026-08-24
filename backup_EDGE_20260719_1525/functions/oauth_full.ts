import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

// === CONFIG YOUTUBE ===
const YT_OAUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
const YT_TOKEN_URL = "https://oauth2.googleapis.com/token"
const YT_UPLOAD_URL = "https://www.googleapis.com/upload/youtube/v3/videos"
const YT_ANALYTICS_URL = "https://youtubeanalytics.googleapis.com/v2/reports"

// === OAUTH HANDLER ===
async function handleOAuth(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")
  
  if (!code) {
    return new Response(JSON.stringify({
      url: `${YT_OAUTH_URL}?client_id=${Deno.env.get('YT_CLIENT_ID')}&redirect_uri=${Deno.env.get('YT_REDIRECT_URI')}&scope=https://www.googleapis.com/auth/youtube.upload&response_type=code&access_type=offline`
    }), { headers: {...corsHeaders, "Content-Type": "application/json"} })
  }
  
  // TODO: Échange code vs token + save dans kos_platform_credentials
  return new Response(JSON.stringify({success: true, message: "OAuth flow - merge logic from kos-youtube-oauth"}), {
    headers: {...corsHeaders, "Content-Type": "application/json"}
  })
}

// === PUBLISH HANDLER ===
async function handlePublish(req: Request): Promise<Response> {
  const body = await req.json()
  // TODO: Merge logic from kos-youtube-publisher + youtube-publisher
  // Upload video, set title/desc/thumbnail, playlist
  
  return new Response(JSON.stringify({
    status: "published",
    videoId: "TODO",
    message: "Merge logic from kos-youtube-publisher"
  }), { headers: {...corsHeaders, "Content-Type": "application/json"} })
}

// === ANALYTICS HANDLER ===
async function handleAnalytics(req: Request): Promise<Response> {
  // TODO: Merge logic from kos-youtube-analytics
  return new Response(JSON.stringify({
    views: 0,
    message: "Merge logic from kos-youtube-analytics"
  }), { headers: {...corsHeaders, "Content-Type": "application/json"} })
}

// === PIPELINE ADVANCER ===
async function handlePipeline(req: Request): Promise<Response> {
  // TODO: Merge logic from kos-youtube-pipeline-advancer
  return new Response("pipeline advanced", { headers: corsHeaders })
}

// === PLAYLIST HANDLER ===
async function handlePlaylist(req: Request): Promise<Response> {
  // TODO: Merge logic from kos-youtube-playlist
  return new Response("playlist updated", { headers: corsHeaders })
}

// === THUMBNAIL HANDLER ===
async function handleThumbnail(req: Request): Promise<Response> {
  // TODO: Merge logic from kos-youtube-thumbnail
  return new Response("thumbnail set", { headers: corsHeaders })
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
      case 'oauth': return await handleOAuth(req)
      case 'publish': return await handlePublish(req)
      case 'analytics': return await handleAnalytics(req)
      case 'pipeline': return await handlePipeline(req)
      case 'playlist': return await handlePlaylist(req)
      case 'thumbnail': return await handleThumbnail(req)
      default: return new Response('Not found. Routes: /oauth, /publish, /analytics, /pipeline, /playlist, /thumbnail', {
        status: 404, 
        headers: corsHeaders
      })
    }
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), {
      status: 500, 
      headers: {...corsHeaders, "Content-Type": "application/json"}
    })
  }
})