# MASTER-6-WORKER-PERF.ts - Cloudflare Worker Big Four

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const correlation_id = crypto.randomUUID();
    const start = Date.now();
    try {
      // 1. Validation
      const url = new URL(request.url);
      // 2. Rate limit
      // 3. Call
      const response = await handleRequest(request, env);
      
      // 4. Log audit + perf
      await env.SUPABASE.rpc('log_audit_event', {
        p_actor_type: 'service',
        p_action: 'worker_request',
        p_payload: { path: url.pathname, latency_ms: Date.now()-start, status: response.status },
        p_correlation_id: correlation_id
      });

      response.headers.set('x-correlation-id', correlation_id);
      response.headers.set('x-worker-latency', (Date.now()-start).toString());
      return response;
    } catch(e) {
      return new Response(JSON.stringify({ error: e.message, correlation_id }), { status: 500, headers: { 'x-correlation-id': correlation_id } });
    }
  }
}
