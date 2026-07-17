import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_ANON_KEY') || ''
    );

    const url = new URL(req.url);
    const path = url.pathname;

    if (path.endsWith('/health')) {
      return new Response(
        JSON.stringify({ status: 'ok', engine: 'KOS Audit Program Generator v1.0' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (req.method === 'GET' && /\/audit-program\//.test(path)) {
      const segments = path.split('/').filter(Boolean);
      const auditType = segments[segments.length - 2] || 'diagnostic_conformite';
      const entiteId = segments[segments.length - 1];

      if (!entiteId || entiteId === 'audit-program') {
        return new Response(
          JSON.stringify({ error: 'Missing entite_id parameter' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data, error } = await supabase.rpc('generate_audit_program', {
        p_audit_type: auditType,
        p_entite_id: entiteId
      });

      if (error) throw error;

      return new Response(
        JSON.stringify({
          code: 'OK',
          data: data,
          meta: {
            message: `Programme d'audit ${auditType} généré`,
            engine: 'KOS Audit Engine v1.0',
            referentiel: 'ISAE 3000 + ISO 19011',
            sla: '< 10 minutes vs 2-3 semaines Big Four'
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (req.method === 'POST' && path.endsWith('/audit-program')) {
      const body = await req.json().catch(() => null) || {};
      const auditType = body.audit_type || body.auditType || 'diagnostic_conformite';
      const entiteId = body.entite_id || body.entiteId || body.entityId;

      if (!entiteId) {
        return new Response(
          JSON.stringify({ error: 'Missing entite_id in body' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data, error } = await supabase.rpc('generate_audit_program', {
        p_audit_type: auditType,
        p_entite_id: entiteId
      });

      if (error) throw error;

      return new Response(
        JSON.stringify({
          code: 'OK',
          data: data,
          meta: {
            message: `Programme d'audit ${auditType} généré`,
            engine: 'KOS Audit Engine v1.0',
            delai_generation: '< 10 minutes',
            bigfour_equivalent: '2 à 3 semaines'
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const matrixMatch = path.match(/\/(risk-matrix|controls-matrix|questionnaire|ifc-checklist|audit-plan)\/([^/]+)/);
    if (req.method === 'GET' && matrixMatch) {
      const matrixType = matrixMatch[1];
      const entiteId = matrixMatch[2];

      let rpcName: string;
      let params: Record<string, unknown> = { p_entite_id: entiteId };

      switch (matrixType) {
        case 'risk-matrix': rpcName = 'kos_risk_matrix'; break;
        case 'controls-matrix': rpcName = 'kos_controls_matrix'; params.p_referentiel = 'COSO'; break;
        case 'questionnaire': rpcName = 'kos_generate_questionnaire'; params = { p_audit_type: entiteId }; break;
        case 'ifc-checklist': rpcName = 'kos_checklist_ifc'; break;
        case 'audit-plan': rpcName = 'kos_audit_plan_auto'; break;
        default:
          return new Response(JSON.stringify({ error: 'Unknown matrix type' }), { status: 400, headers: corsHeaders });
      }

      const { data, error } = await supabase.rpc(rpcName, params);
      if (error) throw error;

      return new Response(
        JSON.stringify({ code: 'OK', data: data, meta: { matrix_type: matrixType } }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Not found', available: [
        'GET /audit-program/:type/:entite_id',
        'POST /audit-program',
        'GET /risk-matrix/:entite_id',
        'GET /controls-matrix/:entite_id',
        'GET /questionnaire/:audit_type',
        'GET /ifc-checklist/:entite_id',
        'GET /audit-plan/:entite_id',
        'GET /health'
      ]}),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ code: 'Error', error: err.message, meta: { detail: err.stack } }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
