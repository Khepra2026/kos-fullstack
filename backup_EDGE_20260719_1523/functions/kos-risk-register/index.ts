import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') || '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
  );

  try {
    const url = new URL(req.url);
    const path = url.pathname;

    // GET /health
    if (path.endsWith('/health')) {
      return new Response(JSON.stringify({ status: 'ok', engine: 'kos-risk-register', version: '1.0.0' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // GET /risks — Liste avec filtres
    if (path.endsWith('/risks') && req.method === 'GET') {
      const famille = url.searchParams.get('famille');
      const statut = url.searchParams.get('statut');
      const min_score = url.searchParams.get('min_score');
      const limit = parseInt(url.searchParams.get('limit') || '50');

      let query = supabase.from('risk_register').select('*');
      if (famille) query = query.eq('famille', famille);
      if (statut) query = query.eq('statut', statut);
      if (min_score) query = query.gte('score', parseInt(min_score));
      const { data, error } = await query.order('score', { ascending: false }).limit(limit);
      if (error) throw error;
      return new Response(JSON.stringify({ data, count: data?.length || 0 }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // GET /risks/:id — Détail
    const riskDetailMatch = path.match(/\/risks\/(.+)$/);
    if (riskDetailMatch && req.method === 'GET' && !path.endsWith('/dashboard')) {
      const id = riskDetailMatch[1];
      const { data, error } = await supabase.from('risk_register').select('*').eq('id', id).maybeSingle();
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // GET /dashboard — Vue agrégée temps réel
    if (path.endsWith('/dashboard') && req.method === 'GET') {
      const { data: mv, error: mvError } = await supabase.from('risk_dashboard_live').select('*').order('score_moyen', { ascending: false });
      if (mvError) throw mvError;

      const { data: topRisks, error: topError } = await supabase.from('risk_register')
        .select('id, libelle, famille, score, probabilite, impact, responsable, echeance, statut')
        .eq('statut', 'ouvert')
        .gte('score', 15)
        .order('score', { ascending: false })
        .limit(10);
      if (topError) throw topError;

      const { data: total, error: totalError } = await supabase.from('risk_register')
        .select('statut', { count: 'exact', head: true });
      if (totalError) throw totalError;

      return new Response(JSON.stringify({
        dashboard: mv || [],
        top_risks: topRisks || [],
        total_risks: total?.length || 0,
        refreshed_at: new Date().toISOString()
      }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // POST /risks — Création
    if (path.endsWith('/risks') && req.method === 'POST') {
      const body = await req.json();
      const { data, error } = await supabase.from('risk_register').insert(body).select().single();
      if (error) throw error;
      await supabase.rpc('refresh_risk_dashboard');
      return new Response(JSON.stringify({ data, message: 'Risque créé, dashboard rafraîchi' }), {
        status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // PUT /risks/:id — Mise à jour
    const riskUpdateMatch = path.match(/\/risks\/(.+)$/);
    if (riskUpdateMatch && req.method === 'PUT') {
      const id = riskUpdateMatch[1];
      const body = await req.json();
      const { data, error } = await supabase.from('risk_register').update(body).eq('id', id).select().single();
      if (error) throw error;
      await supabase.rpc('refresh_risk_dashboard');
      return new Response(JSON.stringify({ data, message: 'Risque mis à jour, dashboard rafraîchi' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // DELETE /risks/:id
    const riskDeleteMatch = path.match(/\/risks\/(.+)$/);
    if (riskDeleteMatch && req.method === 'DELETE') {
      const id = riskDeleteMatch[1];
      const { error } = await supabase.from('risk_register').delete().eq('id', id);
      if (error) throw error;
      await supabase.rpc('refresh_risk_dashboard');
      return new Response(JSON.stringify({ message: 'Risque supprimé, dashboard rafraîchi' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // GET /refresh — Refresh manuel vue matérialisée
    if (path.endsWith('/refresh') && req.method === 'GET') {
      const { error } = await supabase.rpc('refresh_risk_dashboard');
      if (error) throw error;
      return new Response(JSON.stringify({ message: 'Vue matérialisée rafraîchie', timestamp: new Date().toISOString() }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // GET /stats — Statistiques globales
    if (path.endsWith('/stats')) {
      const { data, error } = await supabase.rpc('refresh_risk_dashboard');
      const { data: families, error: famError } = await supabase.from('risk_register')
        .select('famille, statut');
      if (famError) throw famError;
      const stats = {
        total: families?.length || 0,
        by_famille: {} as Record<string, number>,
        by_statut: {} as Record<string, number>,
        critical_count: families?.filter((r: any) => (r.statut === 'ouvert' || r.statut === 'en_traitement')).length || 0
      };
      families?.forEach((r: any) => {
        stats.by_famille[r.famille] = (stats.by_famille[r.famille] || 0) + 1;
        stats.by_statut[r.statut] = (stats.by_statut[r.statut] || 0) + 1;
      });
      return new Response(JSON.stringify(stats), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'Endpoint non trouvé' }), {
      status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message, detail: err.detail || err.hint }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
