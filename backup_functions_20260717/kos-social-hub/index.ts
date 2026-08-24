import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function handleCopy(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "copy", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleDaily(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "daily", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleMaster(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "master", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const action = new URL(req.url).pathname.split('/').pop();
  try {
    switch(action) {
      case 'copy': return await handleCopy(req);
      case 'daily': return await handleDaily(req);
      case 'master': return await handleMaster(req);
      default: return new Response('kos-social-hub ready. Routes: /copy, /daily, /master', { headers: corsHeaders });
    }
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), { 
      status: 500, headers: {...corsHeaders, "Content-Type": "application/json"} 
    });
  }
});
