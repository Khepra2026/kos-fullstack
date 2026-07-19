import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function handleMaster(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "indexnow-master", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleSubmit(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "indexnow-submit", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const action = new URL(req.url).pathname.split('/').pop();
  try {
    switch(action) {
      case 'master': return await handleMaster(req);
      case 'submit': return await handleSubmit(req);
      default: return new Response('kos-indexnow-hub ready. Routes: /master, /submit', { headers: corsHeaders });
    }
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), { 
      status: 500, headers: {...corsHeaders, "Content-Type": "application/json"} 
    });
  }
});
