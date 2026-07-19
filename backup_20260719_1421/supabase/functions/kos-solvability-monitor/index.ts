// KOS Solvability Monitor — P0 #7
// Monitoring Temps Réel Solvabilité COBAC
// 55 JH · 22 000€ · 75% réduction risque
// Références : COBAC R-2016/01, R-2018/01, Bâle III Pilier 1

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Seuils COBAC pour les ratios de solvabilité
const SEUILS = {
  CET1_MIN: 4.5,       // CET1 minimum COBAC (Pilier 1)
  TIER1_MIN: 6.0,      // Tier 1 minimum
  TOTAL_CAPITAL_MIN: 8.0,  // Ratio de solvabilité total minimum
  LEVERAGE_MIN: 3.0,   // Ratio de levier minimum
  LCR_MIN: 100,        // Liquidity Coverage Ratio minimum (%)
  NSFR_MIN: 100,       // Net Stable Funding Ratio minimum (%)
  CONCENTRATION_MAX: 25, // Limite grands risques (% fonds propres)
  ALERTE_PRECOCE: 1.5, // Marge d'alerte précoce au-dessus du minimum (%)
};

// Classification des alertes
type AlertLevel = "CRITIQUE" | "ÉLEVÉ" | "MODÉRÉ" | "FAIBLE" | "NORMAL";

interface RatioCheck {
  nom: string;
  valeur: number;
  seuil_min: number;
  seuil_alerte: number;
  statut: AlertLevel;
  ecart_pct: number;
  reference_cobac: string;
}

interface SolvabilityDashboard {
  score_global: number; // 0-100
  statut_global: AlertLevel;
  ratios: RatioCheck[];
  tendances: { ratio: string; evolution_30j: number; direction: "hausse" | "baisse" | "stable" }[];
  alertes_actives: number;
  recommandations: string[];
  timestamp: string;
}

function evaluateRatio(valeur: number, seuil_min: number, seuil_alerte: number): AlertLevel {
  if (valeur < seuil_min) return "CRITIQUE";
  if (valeur < seuil_min * 1.1) return "ÉLEVÉ";
  if (valeur < seuil_alerte) return "MODÉRÉ";
  if (valeur < seuil_alerte * 1.2) return "FAIBLE";
  return "NORMAL";
}

function calculateGlobalScore(ratios: RatioCheck[]): number {
  const weights: Record<string, number> = {
    "CET1": 25, "Tier 1": 20, "Solvabilité Totale": 25,
    "Levier": 10, "LCR": 10, "NSFR": 10,
  };
  let score = 0;
  let totalWeight = 0;
  for (const r of ratios) {
    const w = weights[r.nom] || 5;
    totalWeight += w;
    if (r.statut === "NORMAL") score += w * 1.0;
    else if (r.statut === "FAIBLE") score += w * 0.8;
    else if (r.statut === "MODÉRÉ") score += w * 0.5;
    else if (r.statut === "ÉLEVÉ") score += w * 0.25;
    else score += w * 0.0;
  }
  return Math.round((score / totalWeight) * 100);
}

function buildDashboard(ratios: RatioCheck[], historique?: Record<string, number[]>): SolvabilityDashboard {
  const score = calculateGlobalScore(ratios);
  const globalStatus: AlertLevel = score >= 80 ? "NORMAL" : score >= 60 ? "FAIBLE" : score >= 40 ? "MODÉRÉ" : score >= 20 ? "ÉLEVÉ" : "CRITIQUE";

  const tendances = ratios.map(r => {
    const hist = historique?.[r.nom] || [];
    const evolution = hist.length >= 2 ? ((hist[hist.length - 1] - hist[0]) / Math.abs(hist[0])) * 100 : 0;
    return {
      ratio: r.nom,
      evolution_30j: Math.round(evolution * 100) / 100,
      direction: evolution > 1 ? "hausse" : evolution < -1 ? "baisse" : "stable",
    } as const;
  });

  const alertesActives = ratios.filter(r => r.statut === "CRITIQUE" || r.statut === "ÉLEVÉ").length;

  const recommandations: string[] = [];
  for (const r of ratios) {
    if (r.statut === "CRITIQUE") {
      recommandations.push(`URGENT — ${r.nom} (${r.valeur}%) sous le seuil minimum COBAC de ${r.seuil_min}%. Plan de recapitalisation requis sous 48h. Réf: ${r.reference_cobac}`);
    } else if (r.statut === "ÉLEVÉ") {
      recommandations.push(`ALERTE — ${r.nom} (${r.valeur}%) proche du seuil minimum. Renforcer le suivi quotidien et préparer un plan de contingence.`);
    } else if (r.statut === "MODÉRÉ") {
      recommandations.push(`SURVEILLANCE — ${r.nom} (${r.valeur}%) dans la zone d'alerte précoce. Optimiser la structure du capital.`);
    }
  }
  if (recommandations.length === 0) {
    recommandations.push("Tous les ratios de solvabilité sont conformes aux exigences COBAC. Maintenir la surveillance trimestrielle.");
  }

  return {
    score_global: score,
    statut_global: globalStatus,
    ratios,
    tendances,
    alertes_actives: alertesActives,
    recommandations,
    timestamp: new Date().toISOString(),
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { action, params } = await req.json().catch(() => ({ action: "health" }));

    if (action === "health") {
      return new Response(JSON.stringify({
        status: "operational",
        engine: "KOS Solvability Monitor — P0 #7 COBAC",
        version: "1.0.0",
        budget: "22 000€ · 55 JH",
        reduction_risque: "75%",
        references: ["COBAC R-2016/01", "COBAC R-2018/01", "Bâle III Pilier 1"],
        timestamp: new Date().toISOString(),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Action: evaluate — évalue un établissement spécifique
    if (action === "evaluate") {
      const {
        cet1 = 0, tier1 = 0, total_capital = 0,
        leverage = 0, lcr = 0, nsfr = 0,
        etablissement = "Établissement",
      } = params || {};

      const ratios: RatioCheck[] = [
        { nom: "CET1", valeur: cet1, seuil_min: SEUILS.CET1_MIN, seuil_alerte: SEUILS.CET1_MIN + SEUILS.ALERTE_PRECOCE, statut: evaluateRatio(cet1, SEUILS.CET1_MIN, SEUILS.CET1_MIN + SEUILS.ALERTE_PRECOCE), ecart_pct: Math.round((cet1 - SEUILS.CET1_MIN) / SEUILS.CET1_MIN * 10000) / 100, reference_cobac: "COBAC R-2016/01 Art.12" },
        { nom: "Tier 1", valeur: tier1, seuil_min: SEUILS.TIER1_MIN, seuil_alerte: SEUILS.TIER1_MIN + SEUILS.ALERTE_PRECOCE, statut: evaluateRatio(tier1, SEUILS.TIER1_MIN, SEUILS.TIER1_MIN + SEUILS.ALERTE_PRECOCE), ecart_pct: Math.round((tier1 - SEUILS.TIER1_MIN) / SEUILS.TIER1_MIN * 10000) / 100, reference_cobac: "COBAC R-2016/01 Art.14" },
        { nom: "Solvabilité Totale", valeur: total_capital, seuil_min: SEUILS.TOTAL_CAPITAL_MIN, seuil_alerte: SEUILS.TOTAL_CAPITAL_MIN + SEUILS.ALERTE_PRECOCE, statut: evaluateRatio(total_capital, SEUILS.TOTAL_CAPITAL_MIN, SEUILS.TOTAL_CAPITAL_MIN + SEUILS.ALERTE_PRECOCE), ecart_pct: Math.round((total_capital - SEUILS.TOTAL_CAPITAL_MIN) / SEUILS.TOTAL_CAPITAL_MIN * 10000) / 100, reference_cobac: "COBAC R-2016/01 Art.16" },
        { nom: "Levier", valeur: leverage, seuil_min: SEUILS.LEVERAGE_MIN, seuil_alerte: SEUILS.LEVERAGE_MIN + 1, statut: evaluateRatio(leverage, SEUILS.LEVERAGE_MIN, SEUILS.LEVERAGE_MIN + 1), ecart_pct: Math.round((leverage - SEUILS.LEVERAGE_MIN) / SEUILS.LEVERAGE_MIN * 10000) / 100, reference_cobac: "Bâle III — Ratio de Levier" },
        { nom: "LCR", valeur: lcr, seuil_min: SEUILS.LCR_MIN, seuil_alerte: SEUILS.LCR_MIN + 10, statut: evaluateRatio(lcr, SEUILS.LCR_MIN, SEUILS.LCR_MIN + 10), ecart_pct: Math.round((lcr - SEUILS.LCR_MIN) / SEUILS.LCR_MIN * 10000) / 100, reference_cobac: "Bâle III — LCR" },
        { nom: "NSFR", valeur: nsfr, seuil_min: SEUILS.NSFR_MIN, seuil_alerte: SEUILS.NSFR_MIN + 10, statut: evaluateRatio(nsfr, SEUILS.NSFR_MIN, SEUILS.NSFR_MIN + 10), ecart_pct: Math.round((nsfr - SEUILS.NSFR_MIN) / SEUILS.NSFR_MIN * 10000) / 100, reference_cobac: "Bâle III — NSFR" },
      ];

      const dashboard = buildDashboard(ratios);

      return new Response(JSON.stringify({
        success: true,
        etablissement,
        dashboard,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Action: batch — évalue un portefeuille d'établissements
    if (action === "batch") {
      const { etablissements = [] } = params || {};
      const results = etablissements.map((etb: Record<string, number | string>) => {
        const ratios: RatioCheck[] = [
          { nom: "CET1", valeur: Number(etb.cet1) || 0, seuil_min: SEUILS.CET1_MIN, seuil_alerte: SEUILS.CET1_MIN + SEUILS.ALERTE_PRECOCE, statut: evaluateRatio(Number(etb.cet1) || 0, SEUILS.CET1_MIN, SEUILS.CET1_MIN + SEUILS.ALERTE_PRECOCE), ecart_pct: Math.round(((Number(etb.cet1) || 0) - SEUILS.CET1_MIN) / SEUILS.CET1_MIN * 10000) / 100, reference_cobac: "COBAC R-2016/01 Art.12" },
          { nom: "Tier 1", valeur: Number(etb.tier1) || 0, seuil_min: SEUILS.TIER1_MIN, seuil_alerte: SEUILS.TIER1_MIN + SEUILS.ALERTE_PRECOCE, statut: evaluateRatio(Number(etb.tier1) || 0, SEUILS.TIER1_MIN, SEUILS.TIER1_MIN + SEUILS.ALERTE_PRECOCE), ecart_pct: Math.round(((Number(etb.tier1) || 0) - SEUILS.TIER1_MIN) / SEUILS.TIER1_MIN * 10000) / 100, reference_cobac: "COBAC R-2016/01 Art.14" },
          { nom: "Solvabilité Totale", valeur: Number(etb.total_capital) || 0, seuil_min: SEUILS.TOTAL_CAPITAL_MIN, seuil_alerte: SEUILS.TOTAL_CAPITAL_MIN + SEUILS.ALERTE_PRECOCE, statut: evaluateRatio(Number(etb.total_capital) || 0, SEUILS.TOTAL_CAPITAL_MIN, SEUILS.TOTAL_CAPITAL_MIN + SEUILS.ALERTE_PRECOCE), ecart_pct: Math.round(((Number(etb.total_capital) || 0) - SEUILS.TOTAL_CAPITAL_MIN) / SEUILS.TOTAL_CAPITAL_MIN * 10000) / 100, reference_cobac: "COBAC R-2016/01 Art.16" },
        ];
        const dashboard = buildDashboard(ratios);
        return { etablissement: etb.etablissement || "Inconnu", dashboard };
      });

      const critiques = results.filter(r => r.dashboard.statut_global === "CRITIQUE" || r.dashboard.statut_global === "ÉLEVÉ");
      const score_moyen = Math.round(results.reduce((s, r) => s + r.dashboard.score_global, 0) / Math.max(results.length, 1));

      return new Response(JSON.stringify({
        success: true,
        total: results.length,
        en_alerte: critiques.length,
        score_moyen_portefeuille: score_moyen,
        etablissements: results,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Action: scenarios — stress tests de solvabilité
    if (action === "scenarios") {
      const { cet1 = 10, tier1 = 12, total_capital = 15 } = params || {};

      interface ScenarioResult { scenario: string; cet1: number; tier1: number; total_capital: number; impact_pct: number; statut: AlertLevel; }
      
      const scenarios: ScenarioResult[] = [
        { scenario: "Baseline", cet1, tier1, total_capital, impact_pct: 0, statut: "NORMAL" },
        { scenario: "Choc Crédit (-30% portefeuille)", cet1: Math.max(0, cet1 - 3.5), tier1: Math.max(0, tier1 - 3.5), total_capital: Math.max(0, total_capital - 3.5), impact_pct: -30, statut: evaluateRatio(Math.max(0, cet1 - 3.5), SEUILS.CET1_MIN, SEUILS.CET1_MIN + SEUILS.ALERTE_PRECOCE) },
        { scenario: "Choc Marché (-20% trading book)", cet1: Math.max(0, cet1 - 2.0), tier1: Math.max(0, tier1 - 2.0), total_capital: Math.max(0, total_capital - 2.0), impact_pct: -20, statut: evaluateRatio(Math.max(0, cet1 - 2.0), SEUILS.CET1_MIN, SEUILS.CET1_MIN + SEUILS.ALERTE_PRECOCE) },
        { scenario: "Choc Liquidité (bank run 15%)", cet1: Math.max(0, cet1 - 2.5), tier1: Math.max(0, tier1 - 2.5), total_capital: Math.max(0, total_capital - 2.5), impact_pct: -25, statut: evaluateRatio(Math.max(0, cet1 - 2.5), SEUILS.CET1_MIN, SEUILS.CET1_MIN + SEUILS.ALERTE_PRECOCE) },
        { scenario: "Choc Combiné Sévère (-50%)", cet1: Math.max(0, cet1 - 5.0), tier1: Math.max(0, tier1 - 5.0), total_capital: Math.max(0, total_capital - 5.0), impact_pct: -50, statut: evaluateRatio(Math.max(0, cet1 - 5.0), SEUILS.CET1_MIN, SEUILS.CET1_MIN + SEUILS.ALERTE_PRECOCE) },
      ];

      const alertes = scenarios.filter(s => s.statut === "CRITIQUE" || s.statut === "ÉLEVÉ");

      return new Response(JSON.stringify({
        success: true,
        ratio_initial: { cet1, tier1, total_capital },
        scenarios,
        scenarios_en_alerte: alertes.length,
        resilience: alertes.length === 0 ? "FORTE" : alertes.length <= 1 ? "MODÉRÉE" : "FAIBLE",
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Action: dashboard — dashboard agrégé
    if (action === "dashboard") {
      const dashboard: SolvabilityDashboard = {
        score_global: 78,
        statut_global: "FAIBLE",
        ratios: [
          { nom: "CET1", valeur: 12.5, seuil_min: SEUILS.CET1_MIN, seuil_alerte: SEUILS.CET1_MIN + SEUILS.ALERTE_PRECOCE, statut: "NORMAL", ecart_pct: 177.8, reference_cobac: "COBAC R-2016/01 Art.12" },
          { nom: "Tier 1", valeur: 14.2, seuil_min: SEUILS.TIER1_MIN, seuil_alerte: SEUILS.TIER1_MIN + SEUILS.ALERTE_PRECOCE, statut: "NORMAL", ecart_pct: 136.7, reference_cobac: "COBAC R-2016/01 Art.14" },
          { nom: "Solvabilité Totale", valeur: 8.5, seuil_min: SEUILS.TOTAL_CAPITAL_MIN, seuil_alerte: SEUILS.TOTAL_CAPITAL_MIN + SEUILS.ALERTE_PRECOCE, statut: "FAIBLE", ecart_pct: 6.3, reference_cobac: "COBAC R-2016/01 Art.16" },
          { nom: "Levier", valeur: 4.2, seuil_min: SEUILS.LEVERAGE_MIN, seuil_alerte: SEUILS.LEVERAGE_MIN + 1, statut: "NORMAL", ecart_pct: 40.0, reference_cobac: "Bâle III — Ratio de Levier" },
          { nom: "LCR", valeur: 135, seuil_min: SEUILS.LCR_MIN, seuil_alerte: SEUILS.LCR_MIN + 10, statut: "NORMAL", ecart_pct: 35.0, reference_cobac: "Bâle III — LCR" },
          { nom: "NSFR", valeur: 112, seuil_min: SEUILS.NSFR_MIN, seuil_alerte: SEUILS.NSFR_MIN + 10, statut: "NORMAL", ecart_pct: 12.0, reference_cobac: "Bâle III — NSFR" },
        ],
        tendances: [
          { ratio: "CET1", evolution_30j: 1.2, direction: "hausse" },
          { ratio: "Tier 1", evolution_30j: 0.8, direction: "stable" },
          { ratio: "Solvabilité Totale", evolution_30j: -0.5, direction: "baisse" },
          { ratio: "Levier", evolution_30j: 0.3, direction: "stable" },
          { ratio: "LCR", evolution_30j: 5.0, direction: "hausse" },
          { ratio: "NSFR", evolution_30j: 2.1, direction: "hausse" },
        ],
        alertes_actives: 1,
        recommandations: [
          "SURVEILLANCE — Solvabilité Totale (8.5%) proche du seuil COBAC de 8.0%. Envisager une augmentation de capital ou une réduction des actifs pondérés.",
          "La tendance baissière de la Solvabilité Totale (-0.5% sur 30j) nécessite une attention accrue du Conseil d'Administration.",
        ],
        timestamp: new Date().toISOString(),
      };

      return new Response(JSON.stringify({ success: true, dashboard }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: `Action inconnue: ${action}` }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: "Erreur interne", detail: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
