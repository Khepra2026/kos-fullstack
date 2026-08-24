import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

/**
 * OG Image Proxy — Proxy transparent pour les images OG.
 * Les bots sociaux (Facebook, LinkedIn, Twitter) scrapent les images OG
 * mais certains CDN bloquent les user-agents des bots (403).
 * Ce proxy récupère l'image source et la sert avec les bons headers
 * pour que les bots puissent l'afficher.
 * 
 * En cas d'échec de la source, un fallback vers l'image maître KHEPRA est utilisé.
 */

const FALLBACK_IMAGE_URL = 'https://readdy.ai/api/search-image?query=premium dark black background with deloitte green geometric spiral pattern elegant minimalist corporate branding KHEPRA EXPERTS strategic consulting africa professional typography clean design high contrast dark green and white accents sophisticated modern aesthetic corporate identity&width=1200&height=630&seq=og-khepra-master-deloitte-v1&orientation=landscape';

serve(async (req: Request) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const reqUrl = new URL(req.url);
  const imageUrl = reqUrl.searchParams.get('url');

  if (!imageUrl) {
    return new Response('Missing ?url= parameter', { status: 400, headers: corsHeaders });
  }

  // Validate URL to prevent SSRF
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    return new Response('Invalid URL', { status: 400, headers: corsHeaders });
  }

  // Only allow image URLs from trusted domains
  const allowedDomains = [
    'static.readdy.ai',
    'readdy.ai',
    'khepraexperts.com',
    'images.unsplash.com',
    'imgur.com',
    'i.imgur.com',
  ];
  if (!allowedDomains.some(d => parsedUrl.hostname === d || parsedUrl.hostname.endsWith('.' + d))) {
    return new Response('Domain not allowed', { status: 403, headers: corsHeaders });
  }

  const fetchHeaders = new Headers({
    'User-Agent': 'Mozilla/5.0 (compatible; OGImageBot/1.0; +https://khepraexperts.com)',
    'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
  });

  // Helper to stream an image response with proper headers
  async function fetchAndStream(url: string): Promise<Response | null> {
    try {
      const imageRes = await fetch(url, {
        method: 'GET',
        headers: fetchHeaders,
        redirect: 'follow',
      });

      if (!imageRes.ok) return null;

      const contentType = imageRes.headers.get('content-type') || 'image/jpeg';
      const contentLength = imageRes.headers.get('content-length');

      const responseHeaders = new Headers(corsHeaders);
      responseHeaders.set('Content-Type', contentType);
      if (contentLength) responseHeaders.set('Content-Length', contentLength);
      responseHeaders.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');
      responseHeaders.set('X-Content-Type-Options', 'nosniff');
      responseHeaders.set('Access-Control-Allow-Origin', '*');

      return new Response(imageRes.body, {
        status: 200,
        headers: responseHeaders,
      });
    } catch {
      return null;
    }
  }

  // Try the requested image first
  const primaryResponse = await fetchAndStream(imageUrl);
  if (primaryResponse) return primaryResponse;

  // Fallback to master KHEPRA image if primary fails
  if (imageUrl !== FALLBACK_IMAGE_URL) {
    const fallbackResponse = await fetchAndStream(FALLBACK_IMAGE_URL);
    if (fallbackResponse) return fallbackResponse;
  }

  return new Response('Image unavailable', {
    status: 502,
    headers: corsHeaders,
  });
});
