// ═══ KOS PRUDENTIAL RATIOS UMOA — Calcul Automatique Ratios Prudentiels BCEAO ═══
// P0 #3 — Moteur de calcul mensuel automatique des ratios prudentiels UMOA
// CET1 (9.5%), Tier 1 (11%), Solvabilité (13%), Levier, LCR, NSFR
// Rapprochement SURFI, alertes seuils, projections

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

interface RatioInput {
  fonds_propres_cet1: number;
  fonds_propres_tier1: number;
  fonds_propres_total: number;
  actifs_ponderes: number;
  engagement_bilan: number;
  hors_bilan: number;
  liquidite_hqla: number;
  sorties_nettes_30j: number;
  financement_stable: number;
  financement_requis: number;
  total_actif: number;
  exposition_surcharge: number;
}

interface RatioResult {
  cet1_ratio: number;
  tier1_ratio: number;
  solvabilite_ratio: number;
  levier_ratio: number;
  lcr_ratio: number;
  nsfr_ratio: number;
  large_exposure_ratio: number;
  score_composite: number;
  alertes: string[];
  recommandations: string[];
  seuils_legal: Record<string, number>;
}

const SEUILS_BCEAO: Record<string, { min: number; label: string }> = {
  cet1: { min: 9.5, label: "CET1 ≥ 9.5%" },
  tier1: { min: 11, label: "Tier 1 ≥ 11%" },
  solvabilite: { min: 13, label: "Solvabilité ≥ 13%" },
  levier: { min: 3, label: "Ratio de Levier ≥ 3%" },
  lcr: { min: 100, label: "LCR ≥ 100%" },
  nsfr: { min: 100, label: "NSFR ≥ 100%" },
  large_exposure: { max: 25, label: "Grands Risques ≤ 25% FP" },
};

function calculerRatios(input: RatioInput): RatioResult {
  const FPN = input.fonds_propres_total;
  const AP = input.actifs_ponderes || 1;
  const TA = input.total_actif || 1;

  const cet1 = (input.fonds_propres_cet1 / AP) * 100;
  const tier1 = (input.fonds_propres_tier1 / AP) * 100;
  const solvabilite = (FPN / AP) * 100;
  const levier = (input.fonds_propres_tier1 / (input.engagement_bilan + input.hors_bilan)) * 100;
  const lcr = input.sorties_nettes_30j ? (input.liquidite_hqla / input.sorties_nettes_30j) * 100 : 999;
  const nsfr = input.financement_requis ? (input.financement_stable / input.financement_requis) * 100 : 999;
  const largeExp = input.exposition_surcharge ? (input.exposition_surcharge / FPN) * 100 : 0;

  const alertes: string[] = [];
  const recommandations: string[] = [];

  if (cet1 < 9.5) { alertes.push(`CET1 = ${cet1.toFixed(1)}% < 9.5%`); recommandations.push("Augmenter les fonds propres CET1 (augmentation capital, mise en réserve)"); }
  if (tier1 < 11) { alertes.push(`Tier 1 = ${tier1.toFixed(1)}% < 11%`); recommandations.push("Renforcer les instruments Tier 1 additionnels"); }
  if (solvabilite < 13) { alertes.push(`Solvabilité = ${solvabilite.toFixed(1)}% < 13%`); recommandations.push("Réduire les actifs pondérés ou augmenter les FP totaux"); }
  if (levier < 3) { alertes.push(`Levier = ${levier.toFixed(1)}% < 3%`); recommandations.push("Contenir la croissance des engagements hors bilan"); }
  if (lcr < 100) { alertes.push(`LCR = ${lcr.toFixed(0)}% < 100%`); recommandations.push("Constituer un volant HQLA supplémentaire"); }
  if (nsfr < 100) { alertes.push(`NSFR = ${nsfr.toFixed(0)}% < 100%`); recommandations.push("Allonger la maturité du passif ou réduire l''actif long terme"); }
  if (largeExp > 25) { alertes.push(`Grands Risques = ${largeExp.toFixed(1)}% > 25%`); recommandations.push("Diversifier les expositions ou provisionner"); }

  const scoreCET1 = Math.min(100, (cet1 / 12) * 100);
  const scoreTier1 = Math.min(100, (tier1 / 13.5) * 100);
  const scoreSolv = Math.min(100, (solvabilite / 15) * 100);
  const scoreLevier = Math.min(100, (levier / 5) * 100);
  const scoreLCR = Math.min(100, (lcr / 150) * 100);
  const scoreNSFR = Math.min(100, (nsfr / 150) * 100);
  const score = Math.round((scoreCET1 * 0.25 + scoreTier1 * 0.15 + scoreSolv * 0.25 + scoreLevier * 0.1 + scoreLCR * 0.15 + scoreNSFR * 0.1));

  return {
    cet1_ratio: Math.round(cet1 * 10) / 10,
    tier1_ratio: Math.round(tier1 * 10) / 10,
    solvabilite_ratio: Math.round(solvabilite * 10) / 10,
    levier_ratio: Math.round(levier * 10) / 10,
    lcr_ratio: Math.round(lcr),
    nsfr_ratio: Math.round(nsfr),
    large_exposure_ratio: Math.round(largeExp * 10) / 10,
    score_composite: score,
    alertes,
    recommandations,
    seuils_legal: {
      cet1_min: 9.5,
      tier1_min: 11,
      solvabilite_min: 13,
      levier_min: 3,
      lcr_min: 100,
      nsfr_min: 100,
      large_exposure_max: 25,
    },
  };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "health";

    // ─── HEALTH ───
    if (action === "health") {
      return new Response(JSON.stringify({
        service: "KOS Prudential Ratios UMOA™",
        version: "1.0.0",
        referentiel: "BCEAO / CB-UMOA",
        ratios_monitored: ["CET1", "Tier 1", "Solvabilité", "Levier", "LCR", "NSFR", "Grands Risques"],
        seuils: SEUILS_BCEAO,
        budget: "16 000 EUR (40 JH)",
        timestamp: new Date().toISOString(),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ─── CALCULATE ───
    if (action === "calculate") {
      const body: RatioInput = await req.json();

      if (!body.fonds_propres_cet1 || !body.actifs_ponderes) {
        return new Response(JSON.stringify({
          error: "fonds_propres_cet1 et actifs_ponderes sont requis",
          example: {
            fonds_propres_cet1: 50000000000,
            fonds_propres_tier1: 58000000000,
            fonds_propres_total: 65000000000,
            actifs_ponderes: 450000000000,
            engagement_bilan: 550000000000,
            hors_bilan: 80000000000,
            liquidite_hqla: 120000000000,
            sorties_nettes_30j: 100000000000,
            financement_stable: 500000000000,
            financement_requis: 450000000000,
            total_actif: 600000000000,
            exposition_surcharge: 15000000000,
          },
        }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const result = calculerRatios(body);

      // Sauvegarde dans l'audit trail
      await supabase.from("kos_audit_trail").insert({
        action: "prudential_ratios_calculated",
        actor_id: "system",
        metadata: {
          score: result.score_composite,
          cet1: result.cet1_ratio,
          solvabilite: result.solvabilite_ratio,
          alertes: result.alertes.length,
        },
        timestamp: new Date().toISOString(),
      });

      return new Response(JSON.stringify({
        ...result,
        statut: result.alertes.length === 0 ? "CONFORME" : "NON_CONFORME",
        nb_alertes: result.alertes.length,
        prochaine_echeance: "Rapport SURFI mensuel",
        timestamp: new Date().toISOString(),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ─── BATCH ───
    if (action === "batch") {
      const body: { portefeuille: RatioInput[] } = await req.json();

      if (!body.portefeuille?.length) {
        return new Response(JSON.stringify({ error: "portefeuille (array) requis" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const results = body.portefeuille.map((input, i) => ({
        index: i,
        ...calculerRatios(input),
        statut: calculerRatios(input).alertes.length === 0 ? "CONFORME" : "NON_CONFORME",
      }));

      const conformes = results.filter(r => r.statut === "CONFORME").length;
      const scoreMoyen = Math.round(results.reduce((s, r) => s + r.score_composite, 0) / results.length);

      return new Response(JSON.stringify({
        total: results.length,
        conformes,
        non_conformes: results.length - conformes,
        score_moyen: scoreMoyen,
        taux_conformite: Math.round((conformes / results.length) * 100),
        results,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ─── SCENARIOS ───
    if (action === "scenarios") {
      const body: RatioInput = await req.json();

      const baseline = calculerRatios(body);

      const adverse: RatioInput = {
        ...body,
        actifs_ponderes: body.actifs_ponderes * 1.15,
        sorties_nettes_30j: body.sorties_nettes_30j * 1.25,
      };
      const severe: RatioInput = {
        ...body,
        actifs_ponderes: body.actifs_ponderes * 1.30,
        sorties_nettes_30j: body.sorties_nettes_30j * 1.50,
        fonds_propres_cet1: body.fonds_propres_cet1 * 0.85,
      };
      const systemique: RatioInput = {
        ...body,
        actifs_ponderes: body.actifs_ponderes * 1.50,
        sorties_nettes_30j: body.sorties_nettes_30j * 2.00,
        fonds_propres_cet1: body.fonds_propres_cet1 * 0.70,
        fonds_propres_total: body.fonds_propres_total * 0.75,
      };

      return new Response(JSON.stringify({
        institution: "Banque UMOA",
        scenarios: {
          baseline: { ...baseline, description: "Conditions normales" },
          adverse: { ...calculerRatios(adverse), description: "Choc macroéconomique modéré" },
          severe: { ...calculerRatios(severe), description: "Crise sectorielle UEMOA" },
          systemique: { ...calculerRatios(systemique), description: "Crise systémique UMOA (worst-case)" },
        },
        referentiel: "Instruction BCEAO n°011-2024 relative aux ratios prudentiels",
        timestamp: new Date().toISOString(),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({
      error: "Action inconnue",
      valid_actions: ["health", "calculate", "batch", "scenarios"],
    }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (err) {
    return new Response(JSON.stringify({
      error: "Erreur interne",
      detail: err instanceof Error ? err.message : String(err),
    }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
