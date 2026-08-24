import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function handleDashboard(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ rls: "dashboard", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleGuardian(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ rls: "guardian", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleMaster(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ rls: "master", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const action = new URL(req.url).pathname.split('/').pop();
  try {
    switch(action) {
      case 'dashboard': return await handleDashboard(req);
      case 'guardian': return await handleGuardian(req);
      case 'master': return await handleMaster(req);
      default: return new Response('kos-rls-hub ready. Routes: /dashboard, /guardian, /master', { headers: corsHeaders });
    }
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), { 
      status: 500, headers: {...corsHeaders, "Content-Type": "application/json"} 
    });
  }
});
