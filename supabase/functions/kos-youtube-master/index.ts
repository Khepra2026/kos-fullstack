import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const CLIENT_ID = Deno.env.get("YOUTUBE_CLIENT_ID")!
  const CLIENT_SECRET = Deno.env.get("YOUTUBE_CLIENT_SECRET")!
  const REDIRECT_URI = Deno.env.get("YOUTUBE_REDIRECT_URI") || "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-youtube-master/callback"
  
  const url = new URL(req.url)

  if (url.pathname.endsWith("/callback")) {
    const code = url.searchParams.get("code")
    if (!code) return new Response("No code", { status: 400 })

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code"
      })
    })
    const tokens = await tokenRes.json()
    return new Response(`
      <html><body style="font-family:monospace;background:#050507;color:#10b981;padding:40px">
      <h1>KHEPRA-KOS Token OK</h1>
      <p>Access: ${tokens.access_token?.slice(0,30)}...</p>
      <p>Refresh: ${tokens.refresh_token?.slice(0,30)}...</p>
      <pre>${JSON.stringify(tokens,null,2)}</pre>
      </body></html>`, { headers: { "Content-Type": "text/html" } })
  }

  const scope = "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube"
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`
  return new Response(JSON.stringify({ authUrl }), { headers: { "Content-Type": "application/json" } })
})
