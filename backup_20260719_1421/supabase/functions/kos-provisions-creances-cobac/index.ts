// KOS Provisions Créances COBAC — P0 #6
// Edge Function: Calcul Automatique des Provisions Créances
// Référentiel: COBAC (CEMAC) — 45 JH, 18 000€, Réduction Risque 70%
// Conformité: IFRS 9, COBAC R-2016/01, R-2018/01, Bâle II/III

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

// Grilles de provisionnement COBAC par catégorie
const GRILLES_COBAC: Record<string, { nom: string; paliers: { jours_min: number; jours_max: number; taux: number; label: string }[] }> = {
  court_terme: {
    nom: "Créances Court Terme",
    paliers: [
      { jours_min: 0, jours_max: 30, taux: 0, label: "Courant (0-30j)" },
      { jours_min: 31, jours_max: 60, taux: 0.02, label: "S1 - Retard léger (31-60j)" },
      { jours_min: 61, jours_max: 90, taux: 0.05, label: "S2 - Retard modéré (61-90j)" },
      { jours_min: 91, jours_max: 180, taux: 0.20, label: "S3 - Pré-douteux (91-180j)" },
      { jours_min: 181, jours_max: 365, taux: 0.50, label: "S4 - Douteux (181-365j)" },
      { jours_min: 366, jours_max: Infinity, taux: 1.00, label: "S5 - Contentieux (>365j)" },
    ],
  },
  moyen_terme: {
    nom: "Créances Moyen Terme",
    paliers: [
      { jours_min: 0, jours_max: 30, taux: 0, label: "Courant (0-30j)" },
      { jours_min: 31, jours_max: 90, taux: 0.03, label: "S1 - Retard (31-90j)" },
      { jours_min: 91, jours_max: 180, taux: 0.10, label: "S2 - Pré-douteux (91-180j)" },
      { jours_min: 181, jours_max: 365, taux: 0.35, label: "S3 - Douteux (181-365j)" },
      { jours_min: 366, jours_max: Infinity, taux: 0.75, label: "S4 - Contentieux (>365j)" },
    ],
  },
  long_terme: {
    nom: "Créances Long Terme / Investissement",
    paliers: [
      { jours_min: 0, jours_max: 90, taux: 0, label: "Courant (0-90j)" },
      { jours_min: 91, jours_max: 180, taux: 0.05, label: "S1 - Retard (91-180j)" },
      { jours_min: 181, jours_max: 365, taux: 0.15, label: "S2 - Douteux (181-365j)" },
      { jours_min: 366, jours_max: Infinity, taux: 0.50, label: "S3 - Contentieux (>365j)" },
    ],
  },
  hors_bilan: {
    nom: "Engagements Hors-Bilan",
    paliers: [
      { jours_min: 0, jours_max: 0, taux: 0.01, label: "Provision forfaitaire 1%" },
    ],
  },
};

interface CreanceInput {
  id: string;
  montant_initial: number;
  encours: number;
  categorie: keyof typeof GRILLES_COBAC;
  jours_retard: number;
  garanties: number;
  secteur: string;
  devise: string;
  note_risque?: string;
}

interface CalculResult {
  creance_id: string;
  encours: number;
  categorie: string;
  jours_retard: number;
  palier_applicable: string;
  taux_provision: number;
  provision_base: number;
  garanties_retenues: number;
  provision_nette: number;
  taux_couverture: number;
  classification: string;
  alerte: string | null;
}

function calculerProvision(creance: CreanceInput): CalculResult {
  const grille = GRILLES_COBAC[creance.categorie];
  if (!grille) throw new Error(`Catégorie inconnue: ${creance.categorie}`);

  let palierApplique = grille.paliers[0];
  for (const palier of grille.paliers) {
    if (creance.jours_retard >= palier.jours_min && creance.jours_retard <= palier.jours_max) {
      palierApplique = palier;
      break;
    }
  }

  const provisionBase = Math.round(creance.encours * palierApplique.taux * 100) / 100;
  const garantiesRetenues = Math.min(creance.garanties, provisionBase * 0.80);
  const provisionNette = Math.max(0, Math.round((provisionBase - garantiesRetenues) * 100) / 100);
  const tauxCouverture = creance.encours > 0 ? Math.round((provisionNette / creance.encours) * 10000) / 100 : 0;

  let classification = "NORMAL";
  if (creance.jours_retard > 365) classification = "CONTENTIEUX";
  else if (creance.jours_retard > 180) classification = "DOUTEUX";
  else if (creance.jours_retard > 90) classification = "PRE-DOUTEUX";
  else if (creance.jours_retard > 30) classification = "SENSIBLE";
  else classification = "SAIN";

  let alerte: string | null = null;
  if (tauxCouverture > 75) alerte = "CRITIQUE: Provision excessive, revoir les garanties";
  else if (classification === "CONTENTIEUX" && tauxCouverture < 50) alerte = "ALERTE: Sous-provisionnement contentieux";
  else if (classification === "DOUTEUX" && tauxCouverture < 20) alerte = "ATTENTION: Provision douteux insuffisante";

  return {
    creance_id: creance.id,
    encours: creance.encours,
    categorie: grille.nom,
    jours_retard: creance.jours_retard,
    palier_applicable: palierApplique.label,
    taux_provision: Math.round(palierApplique.taux * 10000) / 100,
    provision_base: provisionBase,
    garanties_retenues: garantiesRetenues,
    provision_nette: provisionNette,
    taux_couverture: tauxCouverture,
    classification,
    alerte,
  };
}

function calculerDashboard(resultats: CalculResult[]) {
  const totalEncours = resultats.reduce((s, r) => s + r.encours, 0);
  const totalProvisions = resultats.reduce((s, r) => s + r.provision_nette, 0);
  const tauxGlobal = totalEncours > 0 ? Math.round((totalProvisions / totalEncours) * 10000) / 100 : 0;

  const parClassification: Record<string, { count: number; encours: number; provisions: number }> = {};
  for (const r of resultats) {
    if (!parClassification[r.classification]) {
      parClassification[r.classification] = { count: 0, encours: 0, provisions: 0 };
    }
    parClassification[r.classification].count++;
    parClassification[r.classification].encours += r.encours;
    parClassification[r.classification].provisions += r.provision_nette;
  }

  const alertes = resultats.filter(r => r.alerte).map(r => ({
    creance_id: r.creance_id,
    classification: r.classification,
    alerte: r.alerte,
    provision_nette: r.provision_nette,
  }));

  return {
    total_creances: resultats.length,
    total_encours: Math.round(totalEncours * 100) / 100,
    total_provisions: Math.round(totalProvisions * 100) / 100,
    taux_couverture_global: tauxGlobal,
    repartition: parClassification,
    alertes,
    seuil_cobac: tauxGlobal >= 1 ? "CONFORME" : "NON CONFORME — Provisions < 1% encours",
  };
}

const SCENARIOS = {
  baseline: { nom: "Baseline — Conditions actuelles", multiplicateur_retard: 1.0, multiplicateur_garantie: 1.0 },
  adverse: { nom: "Adverse — Dégradation modérée (+40% retards)", multiplicateur_retard: 1.4, multiplicateur_garantie: 0.85 },
  severe: { nom: "Severe — Crise systémique (+80% retards, garanties -30%)", multiplicateur_retard: 1.8, multiplicateur_garantie: 0.70 },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { action, creances, scenario } = await req.json();
    const actionType = action || "health";

    if (actionType === "health") {
      return new Response(JSON.stringify({
        status: "operational",
        engine: "Calcul Auto Provisions Créances COBAC",
        version: "1.0.0",
        budget: { montant_eur: 18000, jours_homme: 45, reduction_risque_pct: 70 },
        grilles_disponibles: Object.keys(GRILLES_COBAC),
        scenarios_disponibles: Object.keys(SCENARIOS),
        references: ["COBAC R-2016/01", "COBAC R-2018/01", "IFRS 9", "Bâle II Pilier 2", "Bâle III"],
        timestamp: new Date().toISOString(),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (actionType === "calculate") {
      if (!creances || !Array.isArray(creances) || creances.length === 0) {
        return new Response(JSON.stringify({ error: "Paramètre 'creances' requis (tableau non vide)" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const resultats = creances.map((c: CreanceInput) => calculerProvision(c));
      const dashboard = calculerDashboard(resultats);

      const auditPayload = {
        fonction: "kos-provisions-creances-cobac",
        action: "calculate",
        nombre_creances: creances.length,
        provisions_totales: dashboard.total_provisions,
        seuil_cobac: dashboard.seuil_cobac,
        alertes_count: dashboard.alertes.length,
        timestamp: new Date().toISOString(),
      };

      await supabase.from("kos_audit_trail").insert(auditPayload);

      return new Response(JSON.stringify({
        success: true,
        resultats,
        dashboard,
        metadata: {
          engine: "Calcul Auto Provisions Créances COBAC v1.0",
          grille_appliquee: "COBAC R-2016/01 — IFRS 9",
          date_calcul: new Date().toISOString(),
        },
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (actionType === "batch") {
      if (!creances || !Array.isArray(creances) || creances.length === 0) {
        return new Response(JSON.stringify({ error: "Paramètre 'creances' requis" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const batches: Record<string, CalculResult[]> = {};
      for (const c of creances) {
        const cat = c.categorie || "court_terme";
        if (!batches[cat]) batches[cat] = [];
        batches[cat].push(calculerProvision(c));
      }

      const dashboards: Record<string, ReturnType<typeof calculerDashboard>> = {};
      let globalResults: CalculResult[] = [];
      for (const [cat, res] of Object.entries(batches)) {
        dashboards[cat] = calculerDashboard(res);
        globalResults = globalResults.concat(res);
      }
      const globalDashboard = calculerDashboard(globalResults);

      return new Response(JSON.stringify({
        success: true,
        batches,
        dashboards_par_categorie: dashboards,
        dashboard_global: globalDashboard,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (actionType === "scenarios") {
      if (!creances || !Array.isArray(creances) || creances.length === 0) {
        return new Response(JSON.stringify({ error: "Paramètre 'creances' requis" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const resultatsScenarios: Record<string, { dashboard: ReturnType<typeof calculerDashboard>; provisions_totales: number }> = {};

      for (const [key, config] of Object.entries(SCENARIOS)) {
        const stressedCreances = creances.map((c: CreanceInput) => ({
          ...c,
          jours_retard: Math.round(c.jours_retard * config.multiplicateur_retard),
          garanties: Math.round(c.garanties * config.multiplicateur_garantie * 100) / 100,
        }));
        const resultats = stressedCreances.map((c: CreanceInput) => calculerProvision(c));
        resultatsScenarios[key] = {
          dashboard: calculerDashboard(resultats),
          provisions_totales: Math.round(resultats.reduce((s, r) => s + r.provision_nette, 0) * 100) / 100,
        };
      }

      return new Response(JSON.stringify({
        success: true,
        scenarios: resultatsScenarios,
        recommandation: "Voir résultats par scénario pour dimensionner le coussin de fonds propres",
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: `Action inconnue: ${actionType}` }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: "Erreur interne", detail: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});