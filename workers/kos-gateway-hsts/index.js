export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Si requête sur workers.dev direct, proxy vers khepraexperts.com origin
    const targetHost = "khepraexperts.com";
    const targetUrl = `https://${targetHost}${url.pathname}${url.search}`;
    
    const modifiedRequest = new Request(targetUrl, request);
    modifiedRequest.headers.set('Host', targetHost);
    modifiedRequest.headers.set('X-Forwarded-Host', url.hostname);
    modifiedRequest.headers.set('X-KOS-Gateway-Version', 'v2-BigFour');
    
    let response = await fetch(modifiedRequest);
    
    // Si 404 de Readdy, on sert une page KOS de fallback avec HSTS quand même
    if (response.status === 404) {
      response = new Response(`<!DOCTYPE html><html><head><title>KOS Gateway - KHEpra</title></head><body><h1>KHEpra Experts - KOS Gateway Active</h1><p>Origin: ${targetHost} - Gateway: BigFour Compliant</p><p>Worker ID: ${url.hostname}</p><script>window.location.href="https://khepraexperts.com"</script></body></html>`, {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    newResponse.headers.set('X-Frame-Options', 'DENY');
    newResponse.headers.set('X-Content-Type-Options', 'nosniff');
    newResponse.headers.set('X-KOS-Gateway', 'BigFour-Compliant-v2');
    newResponse.headers.set('X-KOS-Status', response.status === 404 ? 'fallback' : 'proxy');
    newResponse.headers.set('Cache-Control', 'public, max-age=3600');
    
    return newResponse;
  }
}
