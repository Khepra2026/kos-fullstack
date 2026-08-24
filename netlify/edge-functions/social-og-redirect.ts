import type { Context } from 'https://edge.netlify.com/v1/index.ts';

const OG_PREVIEW_URL = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/og-social-preview';

const BOT_PATTERN = /bot|crawler|spider|crawling|facebookexternalhit|facebot|linkedinbot|twitterbot|whatsapp|slackbot|telegrambot|discordbot|pinterestbot|googlebot|bingbot|applebot|yandexbot|baiduspider|duckduckbot|skypeuripreview|embedly|preview/i;

const AI_BOT_PATTERN = /GPTBot|ChatGPT|Claude|Perplexity|Google-Extended|ChatGPT-User|anthropic/i;

const STATIC_EXT_PATTERN = /\.(js|css|png|jpg|jpeg|webp|gif|svg|ico|woff|woff2|ttf|eot|pdf|xml|json|txt|map|html)$/i;

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const path = url.pathname;
  const userAgent = request.headers.get('user-agent') || '';

  // 1. Ne pas intercepter les fichiers statiques
  if (STATIC_EXT_PATTERN.test(path)) {
    return context.next();
  }

  // 2. Ne pas intercepter les assets du build Vite
  if (path.startsWith('/assets/') || path.startsWith('/images/')) {
    return context.next();
  }

  // 3. BOTS IA → passe au middleware GEO (khepra-geo-middleware) pour injection EEAT
  // On ne veut PAS servir l'OG preview simplifiée aux crawlers IA — ils doivent voir
  // la SPA enrichie avec les meta tags EEAT injectés au niveau Edge.
  const isAIBot = AI_BOT_PATTERN.test(userAgent);
  if (isAIBot) {
    return context.next();
  }

  // 4. Ne PAS intercepter les pages légales — Google Cloud Console OAuth validation
  const LEGAL_PATHS = ['/privacy', '/terms', '/cgu', '/legal', '/cookies', '/charte-deontologique', '/kos'];
  if (LEGAL_PATHS.includes(path) || LEGAL_PATHS.some(p => path.startsWith(p + '/'))) {
    return context.next();
  }

  // 5. Détecter les bots sociaux / crawlers classiques
  const isBot = BOT_PATTERN.test(userAgent);

  if (!isBot) {
    return context.next();
  }

  // 6. Construire l'URL de preview OG
  const previewUrl = `${OG_PREVIEW_URL}?path=${encodeURIComponent(path)}`;

  // 7. Forwarder la requête vers Supabase Edge Function
  try {
    const previewRes = await fetch(previewUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/html',
        'User-Agent': userAgent,
      },
    });

    if (previewRes.ok) {
      const body = await previewRes.text();
      return new Response(body, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          'Vary': 'User-Agent',
          'X-Robots-Tag': 'index, follow',
        },
      });
    }
  } catch {
    // Si le proxy OG échoue, fallback vers la SPA normale
  }

  return context.next();
}

export const config = {
  path: '/*',
};