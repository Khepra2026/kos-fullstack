import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  return createClient(supabaseUrl, serviceRoleKey);
}

async function handleSearch(req: Request): Promise<Response> {
  const { query } = await req.json().catch(() => ({ query: "" }));
  const supabase = getSupabaseClient();
  // TODO: Merge logic from kos-rag-search / rag-semantic-search
  return new Response(JSON.stringify({ results: [], query, status: "search ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleRoute(req: Request): Promise<Response> {
  // TODO: Merge logic from kos-rag-router
  return new Response(JSON.stringify({ routed: true, status: "route ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleHealth(req: Request): Promise<Response> {
  // TODO: Merge logic from rag-health-check
  return new Response(JSON.stringify({ status: "healthy", embedding_model: "text-embedding-3-small" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const action = new URL(req.url).pathname.split('/').pop();
  try {
    switch(action) {
      case 'search': return await handleSearch(req);
      case 'route': return await handleRoute(req);
      case 'health': return await handleHealth(req);
      default: return new Response('kos-rag-hub ready. Routes: /search, /route, /health', { headers: corsHeaders });
    }
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), { 
      status: 500, headers: {...corsHeaders, "Content-Type": "application/json"} 
    });
  }
});