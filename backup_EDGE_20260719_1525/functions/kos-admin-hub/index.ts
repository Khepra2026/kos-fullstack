import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function handleChangePassword(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "change-password", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleDocuments(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "documents", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleNotifications(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "notifications-check", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleVerifyToken(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "verify-token", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const action = new URL(req.url).pathname.split('/').pop();
  try {
    switch(action) {
      case 'change-password': return await handleChangePassword(req);
      case 'documents': return await handleDocuments(req);
      case 'notifications-check': return await handleNotifications(req);
      case 'verify-token': return await handleVerifyToken(req);
      default: return new Response('kos-admin-hub ready. Routes: /change-password, /documents, /notifications-check, /verify-token', { headers: corsHeaders });
    }
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), { 
      status: 500, headers: {...corsHeaders, "Content-Type": "application/json"} 
    });
  }
});
