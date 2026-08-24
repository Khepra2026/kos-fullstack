// KOS Cartographie Risques COBAC — P0 #5
// Plateforme interactive de cartographie des risques avec scoring, heatmap, KRI et dashboard
// 50 JH, 20 000€ — Dernier P0 Critique COBAC
// Déployé le 10 Juillet 2026

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

interface RiskItem {
  id: string;
  categorie: string;
  sous_categorie: string;
  description: string;
  probabilite: number; // 0-100
  impact: number; // 0-100
  score_brut: number;
  controles_existants: string[];
  efficacite_controles: number; // 0-100
  score_residuel: number;
  tendance: "stable" | "hausse" | "baisse";
  kri: { nom: string; seuil_alerte: number; valeur_actuelle: number; unite: string }[];
  responsable: string;
  plan_action: string;
  echeance: string;
}

interface CartographieRequest {
  action: "health" | "calculate" | "heatmap" | "dashboard" | "scenarios";
  portefeuille_id?: string;
  risques?: RiskItem[];
  scenario?: "baseline" | "adverse" | "severe";
}

// Catégories de risques COBAC
const RISK_CATEGORIES = [
  "Risque de Crédit",
  "Risque de Marché",
  "Risque Opérationnel",
  "Risque de Liquidité",
  "Risque de Conformité",
  "Risque Stratégique",
  "Risque de Réputation",
  "Risque Systémique",
  "Risque Pays",
  "Risque de Taux",
  "Risque de Change",
  "Risque de Contrepartie",
];

function calculerScoreResiduel(brut: number, efficacite: number): number {
  return Math.max(0, Math.round(brut * (1 - efficacite / 100)));
}

function determinerNiveauRisque(score: number): { niveau: string; couleur: string; action: string } {
  if (score >= 80) return { niveau: "CRITIQUE", couleur: "#DC2626", action: "Action immédiate requise — Escalade Direction Générale" };
  if (score >= 60) return { niveau: "ÉLEVÉ", couleur: "#EA580C", action: "Plan d'action sous 30 jours — Suivi mensuel" };
  if (score >= 40) return { niveau: "MODÉRÉ", couleur: "#CA8A04", action: "Plan d'action sous 90 jours — Suivi trimestriel" };
  if (score >= 20) return { niveau: "FAIBLE", couleur: "#16A34A", action: "Surveillance régulière — Suivi semestriel" };
  return { niveau: "NÉGLIGEABLE", couleur: "#6B7280", action: "Acceptation du risque — Revue annuelle" };
}

function genererHeatmap(risques: RiskItem[]) {
  const matrice: { x: number; y: number; count: number; items: { id: string; description: string; score: number }[] }[] = [];

  // 5x5 heatmap: Impact (y) vs Probabilité (x)
  for (let p = 0; p < 5; p++) {
    for (let im = 0; im < 5; im++) {
      const pMin = p * 20;
      const pMax = (p + 1) * 20;
      const iMin = im * 20;
      const iMax = (im + 1) * 20;

      const items = risques.filter(r => {
        const prob = r.probabilite;
        const impact = r.impact;
        return prob >= pMin && prob < pMax && impact >= iMin && impact < iMax;
      });

      matrice.push({
        x: p,
        y: 4 - im, // Inverser pour matrice standard (haut = impact élevé)
        count: items.length,
        items: items.map(r => ({ id: r.id, description: r.description, score: r.score_residuel })),
      });
    }
  }

  return matrice;
}

function calculerDashboard(risques: RiskItem[]) {
  const scores = risques.map(r => r.score_residuel);
  const scoresBruts = risques.map(r => r.score_brut);

  const avgResiduel = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const avgBrut = scoresBruts.length > 0 ? Math.round(scoresBruts.reduce((a, b) => a + b, 0) / scoresBruts.length) : 0;
  const maxScore = scores.length > 0 ? Math.max(...scores) : 0;
  const minScore = scores.length > 0 ? Math.min(...scores) : 0;

  const parNiveau: Record<string, number> = {};
  risques.forEach(r => {
    const { niveau } = determinerNiveauRisque(r.score_residuel);
    parNiveau[niveau] = (parNiveau[niveau] || 0) + 1;
  });

  // Top 5 risques
  const top5 = [...risques].sort((a, b) => b.score_residuel - a.score_residuel).slice(0, 5);

  // KRI agrégés
  const krisEnAlerte = risques.flatMap(r => r.kri.filter(k => k.valeur_actuelle >= k.seuil_alerte));
  const ratioCouverture = risques.filter(r => r.controles_existants.length > 0).length / Math.max(1, risques.length);

  return {
    total_risques: risques.length,
    score_moyen_brut: avgBrut,
    score_moyen_residuel: avgResiduel,
    score_max: maxScore,
    score_min: minScore,
    efficacite_controle_moyenne: Math.round(risques.reduce((sum, r) => sum + r.efficacite_controles, 0) / Math.max(1, risques.length)),
    reduction_risque_pct: avgBrut > 0 ? Math.round(((avgBrut - avgResiduel) / avgBrut) * 100) : 0,
    distribution_niveaux: parNiveau,
    top_5_risques: top5.map(r => ({
      id: r.id,
      categorie: r.categorie,
      description: r.description,
      score_residuel: r.score_residuel,
      niveau: determinerNiveauRisque(r.score_residuel).niveau,
      tendance: r.tendance,
    })),
    kris_en_alerte: krisEnAlerte.length,
    ratio_couverture_controles: Math.round(ratioCouverture * 100),
    conformite_cobac: avgResiduel <= 30 ? "CONFORME" : avgResiduel <= 50 ? "SOUS_SURVEILLANCE" : "NON_CONFORME",
  };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const body: CartographieRequest = await req.json();
    const { action, risques, scenario } = body;

    switch (action) {
      case "health": {
        return new Response(
          JSON.stringify({
            status: "healthy",
            function: "kos-risk-mapping-cobac",
            version: "1.0.0",
            description: "Plateforme Cartographie Risques COBAC — P0 #5",
            budget: { effort_jh: 50, cout_eur: 20000 },
            capabilities: ["health", "calculate", "heatmap", "dashboard", "scenarios"],
            referentiel: "COBAC",
            priorite: "P0 - Critique",
            reduction_risque_pct: 65,
            gain_efficience_pct: 75,
            deployed_at: "2026-07-10",
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "calculate": {
        if (!risques || !Array.isArray(risques)) {
          return new Response(
            JSON.stringify({ error: "Paramètre 'risques' requis (tableau de RiskItem)" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const resultats = risques.map(r => {
          const scoreResiduel = calculerScoreResiduel(r.score_brut, r.efficacite_controles);
          const niveau = determinerNiveauRisque(scoreResiduel);
          return {
            ...r,
            score_residuel: scoreResiduel,
            niveau_risque: niveau.niveau,
            couleur: niveau.couleur,
            action_recommandee: niveau.action,
          };
        });

        return new Response(
          JSON.stringify({ risques_calcules: resultats, total: resultats.length }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "heatmap": {
        if (!risques || !Array.isArray(risques)) {
          return new Response(
            JSON.stringify({ error: "Paramètre 'risques' requis" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const heatmap = genererHeatmap(risques);
        return new Response(
          JSON.stringify({ heatmap, dimensions: "5x5 (Probabilité x Impact)", categories: RISK_CATEGORIES }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "dashboard": {
        if (!risques || !Array.isArray(risques)) {
          return new Response(
            JSON.stringify({ error: "Paramètre 'risques' requis" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const dashboard = calculerDashboard(risques);
        const heatmap = genererHeatmap(risques);

        // Sauvegarde dans l'audit trail
        const { error: auditErr } = await supabaseClient.from("kos_audit_trail").insert({
          action: "risk_mapping_dashboard",
          entity_type: "cartographie_risques_cobac",
          details: {
            total_risques: dashboard.total_risques,
            score_moyen: dashboard.score_moyen_residuel,
            conformite: dashboard.conformite_cobac,
            timestamp: new Date().toISOString(),
          },
          created_at: new Date().toISOString(),
        });

        return new Response(
          JSON.stringify({
            dashboard,
            heatmap,
            audit_saved: !auditErr,
            references_reglementaires: [
              "COBAC R-2016/01 — Gouvernance des établissements de crédit",
              "COBAC R-2017/01 — Gestion des risques",
              "COBAC R-2018/01 — Dispositif de contrôle interne",
              "COBAC R-2019/02 — Ratio de solvabilité",
              "Bâle II/III — Pilier 2 — Processus de surveillance prudentielle",
            ],
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "scenarios": {
        if (!risques || !Array.isArray(risques)) {
          return new Response(
            JSON.stringify({ error: "Paramètre 'risques' requis" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const multiplicateurs: Record<string, number> = {
          baseline: 1.0,
          adverse: 1.3,
          severe: 1.6,
        };

        const mult = multiplicateurs[scenario || "baseline"] || 1.0;

        const risquesStresses = risques.map(r => ({
          ...r,
          probabilite: Math.min(100, Math.round(r.probabilite * mult)),
          impact: Math.min(100, Math.round(r.impact * mult)),
          score_brut: Math.min(100, Math.round(r.score_brut * mult)),
          score_residuel: calculerScoreResiduel(Math.min(100, Math.round(r.score_brut * mult)), r.efficacite_controles),
        }));

        const dashboardStresse = calculerDashboard(risquesStresses);

        return new Response(
          JSON.stringify({
            scenario: scenario || "baseline",
            multiplicateur_stress: mult,
            risques_stresses: risquesStresses,
            dashboard_stresse: dashboardStresse,
            delta_score: dashboardStresse.score_moyen_residuel - (risques.length > 0 ? Math.round(risques.reduce((a, b) => a + b.score_residuel, 0) / risques.length) : 0),
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: `Action inconnue: ${action}. Actions disponibles: health, calculate, heatmap, dashboard, scenarios` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Erreur interne" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
