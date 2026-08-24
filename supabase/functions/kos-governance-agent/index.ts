import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GovernanceRequest {
  prompt: string;
  contextDomain: 'BCEAO' | 'COBAC' | 'OHADA' | 'ESG';
  financialData?: {
    fondsPropresNets: number;
    actifsPonderes: number;
    valeursDisponibles: number;
    passifExigible: number;
    totalEngagementsBeneficiaire: number;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const body: GovernanceRequest = await req.json();
    const { prompt, contextDomain, financialData } = body;

    let regulatoryAlignment = "Conforme aux exigences standard du secteur.";
    let confidenceScore = 0.94;
    let recommendations: string[] = [];
    let ratioCalculations: any = null;

    if (contextDomain === 'BCEAO' && financialData) {
      const solvabilite = (financialData.fondsPropresNets / financialData.actifsPonderes) * 100;
      const liquidite = (financialData.valeursDisponibles / financialData.passifExigible) * 100;
      const divisionRisque = (financialData.totalEngagementsBeneficiaire / financialData.fondsPropresNets) * 100;

      ratioCalculations = {
        solvabiliteRatio: solvabilite.toFixed(2) + '% (Seuil min. : 11.5%)',
        liquiditeRatio: liquidite.toFixed(2) + '% (Seuil min. : 100%)',
        divisionRisqueRatio: divisionRisque.toFixed(2) + '% (Plafond max. : 25%)'
      };

      if (solvabilite < 11.5) recommendations.push("Alerte Solvabilité : Renforcement des fonds propres requis.");
      if (liquidite < 100) recommendations.push("Alerte Liquidité : Insuffisance des actifs liquides à court terme.");
      if (divisionRisque > 25) recommendations.push("Dépassement de la limite de division des risques.");
    }

    if (recommendations.length === 0) {
      recommendations = [
        "Maintien de la veille réglementaire sur le corpus " + contextDomain + ".",
        "Validation de la piste d'audit par le comité de contrôle interne.",
        "Application du principe des quatre yeux (Four-Eyes Principle)."
      ];
    }

    const responsePayload = {
      success: true,
      data: {
        domain: contextDomain,
        regulatoryAlignment: recommendations.length > 1 ? "Attention requise - Écarts identifiés" : "Alignement validé",
        confidenceScore,
        ratioCalculations,
        recommendations,
        fourEyesValidated: false,
        processedAt: new Date().toISOString()
      }
    };

    await supabaseClient.from('kos_audit_logs').insert({
      action: 'EVALUATE_GOVERNANCE_BIG_FOUR',
      domain: contextDomain,
      details: responsePayload.data
    });

    return new Response(JSON.stringify(responsePayload), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});