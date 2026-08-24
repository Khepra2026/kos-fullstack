import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function handleLogin(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "login", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleLogout(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "logout", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleVerify(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "verify", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

async function handleUser(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ action: "user", status: "ok" }), { 
    headers: {...corsHeaders, "Content-Type": "application/json"} 
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const action = new URL(req.url).pathname.split('/').pop();
  try {
    switch(action) {
      case 'login': return await handleLogin(req);
      case 'logout': return await handleLogout(req);
      case 'verify': return await handleVerify(req);
      case 'user': return await handleUser(req);
      default: return new Response('kos-auth-hub ready. Routes: /login, /logout, /verify, /user', { headers: corsHeaders });
    }
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), { 
      status: 500, headers: {...corsHeaders, "Content-Type": "application/json"} 
    });
  }
});
