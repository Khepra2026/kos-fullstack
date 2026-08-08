export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // Proxy vers Readdy origin
    const originUrl = url.toString().replace(url.hostname, '52.37.165.222');
    let response = await fetch(originUrl, request);
    
    // Clone + inject BigFour headers
    response = new Response(response.body, response);
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-KOS-Gateway', 'BigFour-Compliant-v1');
    response.headers.set('Content-Security-Policy', "default-src 'self' https:; script-src 'self' 'unsafe-inline' https:");
    
    return response;
  }
}
