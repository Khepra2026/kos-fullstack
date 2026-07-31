import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
serve(async (req) => {
  const url = new URL(req.url)
  const code = url.searchParams.get("code") || ""
  const state = url.searchParams.get("state") || ""
  if (url.pathname.endsWith("/callback")) {
    if (!code) return new Response("No code", {status:400})
    return new Response(`
      <html><head><meta charset=utf-8><title>KOS - Code</title>
      <style>body{font-family:monospace;padding:40px;background:#0a0a0a;color:#0f0} textarea{width:100%;height:200px;font-size:18px;padding:20px;background:#111;color:#0f0;border:2px solid #0f0} h1{color:#fff} .warn{color:#ff0}</style>
      </head><body>
      <h1>✅ CODE RECU - 30 SECONDES</h1>
      <p class=warn>SELECTIONNE UNIQUEMENT LE TEXTE DANS LE CADRE VERT -> Ctrl+C</p>
      <p>State: ${state}</p>
      <textarea id=c onclick="this.select()" readonly>${code}</textarea>
      <p><button onclick="navigator.clipboard.writeText(document.getElementById('c').value);this.innerText='COPIE!'" style="padding:15px 30px;font-size:20px;cursor:pointer">📋 COPIER LE CODE</button></p>
      <script>navigator.clipboard.writeText("${code}"); document.getElementById('c').select();</script>
      </body></html>`, { headers: { "Content-Type": "text/html; charset=utf-8" } })
  }
  return new Response("KOS LinkedIn Master - Go to /callback?code=...", { headers: { "Content-Type": "text/html" } })
})
