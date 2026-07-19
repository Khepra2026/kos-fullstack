import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname;

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
    );

    // GET /health
    if (path === '/health' || path === '/health/') {
      return new Response(
        JSON.stringify({ status: 'ok', service: 'kos-esg-materialite' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // GET /esg/:entite_id — Analyse complète double matérialité
    const esgMatch = path.match(/^\/esg\/([a-f0-9-]{36})$/);
    if (esgMatch && req.method === 'GET') {
      const entiteId = esgMatch[1];
      const { data, error } = await supabase.rpc('kos_esg_materialite', {
        p_entite_id: entiteId,
      });
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // GET /enjeux/:entite_id — Liste des enjeux ESG
    const enjeuxMatch = path.match(/^\/enjeux\/([a-f0-9-]{36})$/);
    if (enjeuxMatch && req.method === 'GET') {
      const entiteId = enjeuxMatch[1];
      const { data, error } = await supabase
        .from('esg_enjeux')
        .select('*')
        .eq('entite_id', entiteId)
        .order('impact_f', { ascending: false });
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // GET /issb-s1/:entite_id — KPIs climatiques
    const s1Match = path.match(/^\/issb-s1\/([a-f0-9-]{36})$/);
    if (s1Match && req.method === 'GET') {
      const entiteId = s1Match[1];
      const { data, error } = await supabase.rpc('issb_s1_kpis', {
        p_entite_id: entiteId,
      });
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // GET /issb-s2/:entite_id — KPIs sociaux
    const s2Match = path.match(/^\/issb-s2\/([a-f0-9-]{36})$/);
    if (s2Match && req.method === 'GET') {
      const entiteId = s2Match[1];
      const { data, error } = await supabase.rpc('issb_s2_kpis', {
        p_entite_id: entiteId,
      });
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // POST /enjeux — Créer un enjeu
    if (path === '/enjeux' && req.method === 'POST') {
      const body = await req.json();
      const { data, error } = await supabase.from('esg_enjeux').insert(body).select().single();
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // GET /entities — Liste des entités avec enjeux
    if (path === '/entities' && req.method === 'GET') {
      const { data, error } = await supabase
        .from('esg_enjeux')
        .select('entite_id')
        .order('entite_id')
        .limit(100);
      if (error) throw error;
      const uniqueEntities = [...new Set((data || []).map((e: { entite_id: string }) => e.entite_id))];
      return new Response(JSON.stringify({ data: uniqueEntities }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
