import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function handleHermes(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ router: "hermes", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleAi(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ router: "ai-v2", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleProxy(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ router: "proxy", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const action = new URL(req.url).pathname.split('/').pop();
  try {
    switch(action) {
      case 'hermes': return await handleHermes(req);
      case 'ai': return await handleAi(req);
      case 'proxy': return await handleProxy(req);
      default: return new Response('kos-router-hub ready. Routes: /hermes, /ai, /proxy', { headers: corsHeaders });
    }
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), { 
      status: 500, headers: {...corsHeaders, "Content-Type": "application/json"} 
    });
  }
});
