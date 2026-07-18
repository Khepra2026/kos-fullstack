import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

serve(async (req) => {
  const ua = req.headers.get('user-agent') || ''
  const ip = req.headers.get('x-forwarded-for') || ''

  // 1. WHITELIST : Bots SEO/IA autorisés
  const allowedBots = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandex|facebookexternalhit|linkedinbot|chatgpt|claude|perplexity|gemini/i
  const isAllowedBot = allowedBots.test(ua)

  // 2. BLACKLIST : Scrapers malveillants
  const blockedBots = /scrapy|python-requests|curl|wget|semrush|ahrefs|mj12bot|dotbot/i
  const isBlockedBot = blockedBots.test(ua)

  if (isBlockedBot && !isAllowedBot) {
    return new Response('Forbidden', {
      status: 403,
      headers: { 'X-KOS-Guard': 'blocked-scraper' }
    })
  }

  // 3. Rate limit : 100 req/min par IP sauf bots autorisés
  if (!isAllowedBot) {
    const { data: recent, error } = await supabase
      .from('kos_request_logs')
      .select('id', { count: 'exact', head: true })
      .eq('ip', ip)
      .gte('created_at', new Date(Date.now() - 60000).toISOString())

    if (!error && recent && (recent as any).length > 100) {
      return new Response('Too Many Requests', {
        status: 429,
        headers: { 'X-KOS-Guard': 'rate-limited' }
      })
    }
  }

  // 4. Log pour analytics SEO
  await supabase.from('kos_request_logs').insert({
    ip,
    user_agent: ua,
    is_bot: isAllowedBot,
    path: new URL(req.url).pathname
  })

  return new Response('OK', {
    status: 200,
    headers: {
      'X-KOS-Guard': isAllowedBot ? 'allowed-bot' : 'human',
      'X-Robots-Tag': 'index, follow, max-image-preview:large',
      'Cache-Control': 'public, max-age=3600'
    }
  })
})