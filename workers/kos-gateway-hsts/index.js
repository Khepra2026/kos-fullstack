/**
 * kos-gateway-hsts v4 - Fixed infinite loop + workers_dev enabled
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const isWorkersDev = url.hostname.includes("workers.dev");
    
    let originResponse;
    let body;
    
    if (isWorkersDev) {
      // For workers.dev test, return direct response (no origin fetch to avoid loop)
      body = "KOS HSTS Gateway OK - BigFour";
      originResponse = new Response(body, { status: 200 });
    } else {
      // For real domains, fetch origin (Vercel)
      try {
        originResponse = await fetch(request);
        body = originResponse.body;
      } catch (e) {
        // Origin down, return fallback
        body = `Origin error: ${e.message} - Gateway active`;
        originResponse = new Response(body, { status: 200 });
      }
    }
    
    // Clone with headers
    const newResponse = new Response(body, originResponse);
    
    // Big Four Headers
    newResponse.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    newResponse.headers.set("X-Frame-Options", "DENY");
    newResponse.headers.set("X-Content-Type-Options", "nosniff");
    newResponse.headers.set("X-XSS-Protection", "1; mode=block");
    newResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    newResponse.headers.set("X-KOS-Gateway", "kos-gateway-hsts-v4-BigFour");
    newResponse.headers.set("X-Request-ID", crypto.randomUUID());
    newResponse.headers.set("Cache-Control", "no-cache");
    
    // CSP
    const nonce = Math.random().toString(36).substring(2, 18);
    newResponse.headers.set("Content-Security-Policy", `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https:; style-src 'self' 'nonce-${nonce}' https:; img-src 'self' data: https:;`);
    newResponse.headers.set("X-Nonce", nonce);
    newResponse.headers.delete("X-Powered-By");
    
    return newResponse;
  }
}
