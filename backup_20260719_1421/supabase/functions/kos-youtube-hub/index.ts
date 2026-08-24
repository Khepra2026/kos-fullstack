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

async function handleCrawl(req: Request): Promise<Response> {
  const supabase = getSupabaseClient();
  // TODO: Migrer logique de kos-tender-crawler ici
  const { data } = await supabase.from("tender_opportunities").select("id").limit(1);
  return new Response(JSON.stringify({status: "crawled", count: data?.length || 0}), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleEmailNotify(req: Request): Promise<Response> {
  // TODO: Migrer logique de kos-tender-email-notify ici
  return new Response(JSON.stringify({status: "notified"}), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleMaster(req: Request): Promise<Response> {
  // TODO: Migrer logique de kos-tender-master ici
  return new Response(JSON.stringify({status: "master executed"}), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleScrape(req: Request): Promise<Response> {
  // TODO: Migrer logique de kos-tender-scraper ici
  return new Response(JSON.stringify({status: "scraped"}), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  
  const action = new URL(req.url).pathname.split('/').pop();
  
  try {
    switch(action) {
      case 'crawl': return await handleCrawl(req);
      case 'email': return await handleEmailNotify(req);
      case 'master': return await handleMaster(req);
      case 'scrape': return await handleScrape(req);
      default: return new Response('kos-tender-hub ready. Routes: /crawl, /email, /master, /scrape', { headers: corsHeaders });
    }
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), { 
      status: 500, headers: {...corsHeaders, "Content-Type": "application/json"} 
    });
  }
});