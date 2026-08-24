export interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE: string;
}

const KOS_ROUTES: Record<string, { fn: string; method: string }> = {
  '/api/kos/compliance-crawler': { 
    fn: 'kos-compliance-daily-crawler', 
    method: 'POST' 
  },
  '/api/kos/batch-ingest': { 
    fn: 'kos-batch-ingest', 
    method: 'POST' 
  },
  '/api/kos/bigfour-quality-review': { 
    fn: 'kos-bigfour-quality-review', 
    method: 'POST' 
  },
  '/api/kos/auto-development-seed': { 
    fn: 'kos-auto-development-seed', 
    method: 'POST' 
  },
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    }

    const route = KOS_ROUTES[url.pathname];
    if (!route) {
      return new Response(JSON.stringify({ error: 'Route not found' }), { 
        status: 404,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    if (request.method !== route.method) {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
        status: 405,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    try {
      const body = await request.text();
      const supabaseRes = await fetch(`${env.SUPABASE_URL}/functions/v1/${route.fn}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE}`,
          'Content-Type': 'application/json',
        },
        body: body || '{}'
      });

      const data = await supabaseRes.text();
      return new Response(data, {
        status: supabaseRes.status,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: err.message,
        proxied: true 
      }), { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
}