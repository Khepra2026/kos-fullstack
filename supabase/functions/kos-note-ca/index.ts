import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';

interface NoteCARequest {
  entite_id: string;
  periode: string;
}

serve(async (req: Request) => {
  const url = new URL(req.url);
  const path = url.pathname;

  // CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    // Health check
    if (path === '/health' || path.endsWith('/health')) {
      return new Response(JSON.stringify({ status: 'ok', service: 'kos-note-ca' }), { headers: corsHeaders });
    }

    // GET /note-ca/:entite_id/:periode
    const getMatch = path.match(/\/note-ca\/([^/]+)\/([^/]+)/);
    if (req.method === 'GET' && getMatch) {
      const entiteId = getMatch[1];
      const periode = getMatch[2];
      return await generateNoteCA(entiteId, periode, corsHeaders);
    }

    // POST /note-ca
    if (req.method === 'POST' && (path === '/note-ca' || path.endsWith('/note-ca'))) {
      const body = await req.json() as NoteCARequest;
      if (!body.entite_id || !body.periode) {
        return new Response(JSON.stringify({ error: 'Missing entite_id or periode' }), { status: 400, headers: corsHeaders });
      }
      return await generateNoteCA(body.entite_id, body.periode, corsHeaders);
    }

    // GET /incidents/:entite_id
    const incidentsMatch = path.match(/\/incidents\/([^/]+)/);
    if (req.method === 'GET' && incidentsMatch) {
      const entiteId = incidentsMatch[1];
      return await getIncidents(entiteId, corsHeaders);
    }

    // GET /reports/:entite_id
    const reportsMatch = path.match(/\/reports\/([^/]+)/);
    if (req.method === 'GET' && reportsMatch) {
      const entiteId = reportsMatch[1];
      return await getReports(entiteId, corsHeaders);
    }

    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500, headers: corsHeaders });
  }
});

async function generateNoteCA(entiteId: string, periode: string, corsHeaders: Record<string, string>) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 500, headers: corsHeaders });
  }

  const rpcUrl = `${supabaseUrl}/rest/v1/rpc/generate_note_ca`;
  const response = await fetch(rpcUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'apikey': supabaseServiceKey,
    },
    body: JSON.stringify({ p_entite_id: entiteId, p_periode: periode }),
  });

  const responseText = await response.text();
  let data;
  try {
    data = JSON.parse(responseText);
  } catch {
    data = { raw: responseText };
  }

  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'RPC failed', detail: data }), { status: 502, headers: corsHeaders });
  }

  return new Response(JSON.stringify({
    success: true,
    data,
    generated_at: new Date().toISOString(),
    methodologie: 'COSO + ISO 37000',
  }), { headers: corsHeaders });
}

async function getIncidents(entiteId: string, corsHeaders: Record<string, string>) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

  const response = await fetch(`${supabaseUrl}/rest/v1/incidents?entite_id=eq.${entiteId}&order=date_incident.desc`, {
    headers: {
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'apikey': supabaseServiceKey,
    },
  });

  const data = await response.json();
  return new Response(JSON.stringify({ incidents: data }), { headers: corsHeaders });
}

async function getReports(entiteId: string, corsHeaders: Record<string, string>) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

  const response = await fetch(`${supabaseUrl}/rest/v1/regulatory_reports?entite_id=eq.${entiteId}&statut=eq.final&order=date_rapport.desc`, {
    headers: {
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'apikey': supabaseServiceKey,
    },
  });

  const data = await response.json();
  return new Response(JSON.stringify({ reports: data }), { headers: corsHeaders });
}
