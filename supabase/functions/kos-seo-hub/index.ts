import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function handleAudit(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "seo-audit", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleHealth(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "site-health", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleGsc(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "gsc-monitor", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const action = new URL(req.url).pathname.split('/').pop();
  try {
    switch(action) {
      case 'audit': return await handleAudit(req);
      case 'health': return await handleHealth(req);
      case 'gsc': return await handleGsc(req);
      default: return new Response('kos-seo-hub ready. Routes: /audit, /health, /gsc', { headers: corsHeaders });
    }
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), { 
      status: 500, headers: {...corsHeaders, "Content-Type": "application/json"} 
    });
  }
});
