import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ═══════════════════════════════════════════════════════════════
// KOS PUBLIC API v2.0 — Score COBAC Public Endpoint
// 0 API externe. Endpoint public sans JWT.
// Usage: POST /api/v4/score-cobac
// ═══════════════════════════════════════════════════════════════

interface ScoreRequest {
  nb_independants: number;
  reunions_an: number;
  charte: boolean;
  pv_transmis: boolean;
  lang?: "fr" | "en";
}

interface RedFlag {
  text: string;
  text_en: string;
  article: string;
  severity: "critical" | "warning";
}

interface ScoreResponse {
  score: number;
  score_max: 100;
  status: "CRITICAL" | "CONFORME";
  status_en: "CRITICAL" | "COMPLIANT";
  red_flags: RedFlag[];
  articles_cites: string[];
  sanction_exposure: {
    fr: string;
    en: string;
    level: "T1" | "T2" | "T3" | "NONE";
  };
  recommendations: string[];
  meta: {
    version: string;
    engine: string;
    regulator: string;
    timestamp: string;
    disclaimer: string;
  };
}

function computeScore(req: ScoreRequest): ScoreResponse {
  const nb_independants = Math.min(2, Math.max(0, Number(req.nb_independants) || 0));
  const reunions_an = Math.min(2, Math.max(0, Number(req.reunions_an) || 0));
  const charte = Boolean(req.charte);
  const pv_transmis = Boolean(req.pv_transmis);
  const lang = req.lang || "fr";

  const score = nb_independants * 25 + reunions_an * 25 + (charte ? 25 : 0) + (pv_transmis ? 25 : 0);
  const red_flags: RedFlag[] = [];

  if (nb_independants < 2) {
    red_flags.push({
      text: "Minimum 2 administrateurs indépendants requis (actuel: " + nb_independants + ")",
      text_en: "Minimum 2 independent directors required (current: " + nb_independants + ")",
      article: "COBAC R-2020/01 Art.12",
      severity: "critical",
    });
  }

  if (reunions_an < 2) {
    const freq = reunions_an === 0 ? "0-1" : "2-3";
    red_flags.push({
      text: "4 réunions du Comité d'Audit par an minimum (actuel: " + freq + ")",
      text_en: "Minimum 4 Audit Committee meetings per year (current: " + freq + ")",
      article: "COBAC CO-2024-02 Art.8",
      severity: "critical",
    });
  }

  if (!charte) {
    red_flags.push({
      text: "Charte du Comité d'Audit approuvée par le Conseil d'Administration obligatoire",
      text_en: "Audit Committee charter approved by Board of Directors is mandatory",
      article: "COSO 2016 — Principe 5",
      severity: "critical",
    });
  }

  if (!pv_transmis) {
    red_flags.push({
      text: "Procès-verbaux du Comité d'Audit non transmis au régulateur COBAC",
      text_en: "Audit Committee minutes not transmitted to COBAC regulator",
      article: "COBAC CO-2024-02 Art.12",
      severity: "warning",
    });
  }

  const status = score < 50 ? "CRITICAL" : "CONFORME";
  const status_en = score < 50 ? "CRITICAL" : "COMPLIANT";

  // Sanction exposure
  let sanctionLevel: "T1" | "T2" | "T3" | "NONE";
  let sanctionFr: string;
  let sanctionEn: string;
  if (score < 25) {
    sanctionLevel = "T1";
    sanctionFr = "Sanctions disciplinaires lourdes — Retrait d'agrément, suspension de dirigeants, dissolution (COBAC R-2020/01)";
    sanctionEn = "Severe disciplinary sanctions — License withdrawal, executive suspension, dissolution (COBAC R-2020/01)";
  } else if (score < 50) {
    sanctionLevel = "T2";
    sanctionFr = "Sanctions pécuniaires et injonctions — Amende, astreinte, mise en demeure (COBAC R-2020/01)";
    sanctionEn = "Financial penalties and injunctions — Fines, daily penalties, formal notice (COBAC R-2020/01)";
  } else if (score < 75) {
    sanctionLevel = "T3";
    sanctionFr = "Risque d'observation — Lettre d'observation, recommandations correctives";
    sanctionEn = "Observation risk — Observation letter, corrective recommendations";
  } else {
    sanctionLevel = "NONE";
    sanctionFr = "Aucune — Conforme aux exigences COBAC en vigueur";
    sanctionEn = "None — Compliant with current COBAC requirements";
  }

  // Articles cited
  const articles = red_flags.map(f => f.article);

  // Recommendations
  const recs: string[] = [];
  if (nb_independants < 2) recs.push(lang === "en"
    ? "Recruit at least " + (2 - nb_independants) + " independent director(s) per COBAC R-2020/01 Art.12"
    : "Recruter au moins " + (2 - nb_independants) + " administrateur(s) indépendant(s) selon COBAC R-2020/01 Art.12");
  if (reunions_an < 2) recs.push(lang === "en"
    ? "Increase Audit Committee meetings to 4/year minimum per COBAC CO-2024-02 Art.8"
    : "Augmenter la fréquence des réunions à 4/an minimum selon COBAC CO-2024-02 Art.8");
  if (!charte) recs.push(lang === "en"
    ? "Draft and adopt an Audit Committee charter approved by the Board (COSO 2016)"
    : "Rédiger et adopter une charte du Comité d'Audit approuvée par le CA (COSO 2016)");
  if (!pv_transmis) recs.push(lang === "en"
    ? "Transmit Audit Committee minutes to COBAC within 15 days of each meeting"
    : "Transmettre les PV du Comité d'Audit à la COBAC dans les 15 jours suivant chaque réunion");
  if (recs.length === 0) recs.push(lang === "en"
    ? "Maintain current governance practices and document compliance evidence"
    : "Maintenir les bonnes pratiques de gouvernance et documenter les preuves de conformité");

  return {
    score,
    score_max: 100,
    status,
    status_en,
    red_flags,
    articles_cites: articles,
    sanction_exposure: { fr: sanctionFr, en: sanctionEn, level: sanctionLevel },
    recommendations: recs,
    meta: {
      version: "v2.0",
      engine: "KOS Public API — Score COBAC v2.0 (0 API externe)",
      regulator: "COBAC — Commission Bancaire de l'Afrique Centrale",
      timestamp: new Date().toISOString(),
      disclaimer: lang === "en"
        ? "This score is indicative. Legal validation required for a complete diagnosis. Powered by KHEPRA EXPERTS."
        : "Ce score est indicatif. Validation juridique requise pour un diagnostic complet. Propulsé par KHEPRA EXPERTS.",
    },
  };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const startTime = Date.now();

  try {
    const body = await req.json() as ScoreRequest;

    // Validate
    if (body.nb_independants === undefined || body.reunions_an === undefined) {
      return new Response(JSON.stringify({
        error: "Missing required fields: nb_independants, reunions_an",
        example: { nb_independants: 1, reunions_an: 1, charte: false, pv_transmis: false, lang: "fr" },
      }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const result = computeScore(body);

    return new Response(JSON.stringify({
      ...result,
      latency_ms: Date.now() - startTime,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({
      error: errorMessage,
      latency_ms: Date.now() - startTime,
    }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
