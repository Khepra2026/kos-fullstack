import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function handleYoutube(req: Request): Promise<Response> {
  const { url } = await req.json().catch(() => ({}));
  // TODO: Merge logic from youtube-scraper, youtube-scraper-simple, etc
  return new Response(JSON.stringify({ source: "youtube", scraped: true, url }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleWebsite(req: Request): Promise<Response> {
  const { url } = await req.json().catch(() => ({}));
  // TODO: Merge logic from website-scraper, web-scraper, etc
  return new Response(JSON.stringify({ source: "website", scraped: true, url }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handlePdf(req: Request): Promise<Response> {
  const { url } = await req.json().catch(() => ({}));
  // TODO: Merge logic from pdf-scraper, document-scraper, etc
  return new Response(JSON.stringify({ source: "pdf", scraped: true, url }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleSocial(req: Request): Promise<Response> {
  const { url } = await req.json().catch(() => ({}));
  // TODO: Merge logic from linkedin-scraper, twitter-scraper, etc
  return new Response(JSON.stringify({ source: "social", scraped: true, url }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const action = new URL(req.url).pathname.split('/').pop();
  try {
    switch(action) {
      case 'youtube': return await handleYoutube(req);
      case 'website': return await handleWebsite(req);
      case 'pdf': return await handlePdf(req);
      case 'social': return await handleSocial(req);
      default: return new Response('kos-scraper-hub ready. Routes: /youtube, /website, /pdf, /social', { headers: corsHeaders });
    }
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), { 
      status: 500, headers: {...corsHeaders, "Content-Type": "application/json"} 
    });
  }
});