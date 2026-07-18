import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function handleGraph(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "graph", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleManager(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "manager", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const action = new URL(req.url).pathname.split('/').pop();
  try {
    switch(action) {
      case 'graph': return await handleGraph(req);
      case 'manager': return await handleManager(req);
      default: return new Response('kos-knowledge-hub ready. Routes: /graph, /manager', { headers: corsHeaders });
    }
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), { 
      status: 500, headers: {...corsHeaders, "Content-Type": "application/json"} 
    });
  }
});
