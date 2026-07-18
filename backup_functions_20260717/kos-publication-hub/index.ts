import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function handleNotifier(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "notifier", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleScheduler(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "scheduler", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const action = new URL(req.url).pathname.split('/').pop();
  try {
    switch(action) {
      case 'notifier': return await handleNotifier(req);
      case 'scheduler': return await handleScheduler(req);
      default: return new Response('kos-publication-hub ready. Routes: /notifier, /scheduler', { headers: corsHeaders });
    }
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), { 
      status: 500, headers: {...corsHeaders, "Content-Type": "application/json"} 
    });
  }
});
