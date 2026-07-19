import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function handleInsert(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "insert", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleProgram(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "program", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const action = new URL(req.url).pathname.split('/').pop();
  try {
    switch(action) {
      case 'insert': return await handleInsert(req);
      case 'program': return await handleProgram(req);
      default: return new Response('kos-audit-hub ready. Routes: /insert, /program', { headers: corsHeaders });
    }
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), { 
      status: 500, headers: {...corsHeaders, "Content-Type": "application/json"} 
    });
  }
});
