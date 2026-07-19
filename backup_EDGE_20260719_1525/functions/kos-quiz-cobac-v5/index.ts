import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ═══════════════════════════════════════════════════════════════
// KOS QUIZ COBAC v5.0 — McKINSEY EXECUTIVE MEMO + BREVO CRM
// 0 API externe — scoring local, articles COBAC, sanctions
// ═══════════════════════════════════════════════════════════════

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY") || "";
const BREVO_LIST_ID = 7;

async function pushToBrevo(email: string, score: number, status: string, red_flags: string[], memo: any): Promise<boolean> {
  if (!BREVO_API_KEY) {
    console.log("[Brevo] API key not configured — skipping CRM push");
    return false;
  }
  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        email,
        attributes: {
          SCORE_COBAC: score,
          NIVEAU: status,
          RED_FLAGS: red_flags.join(" | "),
          SOURCE: "Audit Flash COBAC 60s",
          MCKINSEY_RISK: memo.risk_level,
          MCKINSEY_SANCTION: memo.sanction_potentielle,
          ARTICLES_CITES: memo.articles_cites.join(", "),
          DATE_QUIZ: new Date().toISOString(),
        },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });
    const responseBody = await response.text();
    if (!response.ok) { console.error(`[Brevo] Push failed (${response.status}):`, responseBody); return false; }
    console.log(`[Brevo] Contact synced: ${email} | Score: ${score} | McKinsey Risk: ${memo.risk_level}`);
    return true;
  } catch (err) {
    console.error("[Brevo] Network error:", err instanceof Error ? err.message : String(err));
    return false;
  }
}

// ─── MCKINSEY MEMO GENERATOR ──────────────────────────────────────────

interface RedFlag {
  text: string;
  article: string;
}

interface McKinseyQuizMemo {
  insight: string;
  so_what: string;
  now_what: string;
  risk_level: "CRITIQUE" | "ÉLEVÉ" | "MODÉRÉ" | "FAIBLE";
  articles_cites: string[];
  sanction_potentielle: string;
}

function extractArticlesFromFlags(red_flags: RedFlag[]): string[] {
  return red_flags.map(f => f.article).filter(Boolean);
}

function extractSanctionLevel(red_flags: RedFlag[], score: number): string {
  if (score < 25) return "T1 — Sanctions disciplinaires lourdes : retrait d'agrément, suspension de dirigeants, dissolution (COBAC R-2020/01, CO-2024-02)";
  if (score < 50) return "T2 — Sanctions pécuniaires et injonctions : amende, astreinte, mise en demeure (COBAC R-2020/01)";
  if (score < 75) return "T3 — Risque d'observation : lettre d'observation, recommandations correctives";
  return "Aucune — Conforme aux exigences COBAC en vigueur";
}

function generateMcKinseyMemo(score: number, status: string, red_flags: RedFlag[], nb_independants: number, reunions_an: number, charte: boolean, pv_transmis: boolean): McKinseyQuizMemo {
  const articles = extractArticlesFromFlags(red_flags);
  const sanction = extractSanctionLevel(red_flags, score);
  const gapCount = red_flags.length;

  const riskLevel: McKinseyQuizMemo["risk_level"] =
    score < 25 ? "CRITIQUE" : score < 50 ? "ÉLEVÉ" : score < 75 ? "MODÉRÉ" : "FAIBLE";

  // Build gap descriptions
  const gaps: string[] = [];
  if (nb_independants < 2) gaps.push("administrateurs indépendants insuffisants (< 2)");
  if (reunions_an < 2) gaps.push("fréquence des réunions insuffisante (< 4/an)");
  if (!charte) gaps.push("absence de charte du Comité d'Audit approuvée par le CA");
  if (!pv_transmis) gaps.push("PV non transmis au régulateur COBAC");

  const insight = `Votre Comité d'Audit obtient un score de ${score}/100 — statut ${status}. ${gapCount > 0 ? `${gapCount} non-conformité(s) majeure(s) détectée(s) : ${gaps.join(' ; ')}.` : "Toutes les exigences fondamentales sont satisfaites."} Ce diagnostic est basé sur ${articles.length > 0 ? articles.join(', ') : 'COBAC R-2020/01, CO-2024-02 et COSO 2016'}.`;

  const soWhat = riskLevel === "CRITIQUE" || riskLevel === "ÉLEVÉ"
    ? `Votre établissement est exposé à des ${sanction.includes('T1') ? 'sanctions de niveau T1 incluant le retrait d\'agrément et la suspension de dirigeants' : 'sanctions pécuniaires significatives'}. La COBAC renforce ses contrôles en 2025-2026 — les comités d\'audit non conformes sont dans le collimateur du régulateur. Chaque jour sans mise en conformité augmente votre risque.`
    : `Votre posture actuelle est globalement alignée, mais la COBAC élève continuellement ses exigences. Le renforcement proactif de votre gouvernance constitue un avantage concurrentiel et une protection contre les futures évolutions réglementaires.`;

  const nowWhat = gapCount > 0
    ? `1) IMMÉDIAT (J+15) : ${gaps[0] ? `Corriger en priorité : ${gaps[0]}.` : 'Auditer vos processus de gouvernance.'} 2) COURT TERME (J+45) : ${gapCount > 1 ? `Résoudre les ${gapCount - 1} non-conformité(s) restante(s) et documenter votre plan de remédiation.` : 'Documenter votre plan de remédiation.'} 3) STRATÉGIQUE (J+90) : Réserver un diagnostic approfondi avec KHEPRA EXPERTS pour un Plan 100 Jours personnalisé et une simulation de contrôle COBAC.`
    : `1) IMMÉDIAT (J+30) : Documenter votre traçabilité de conformité (preuves, PV, charte). 2) COURT TERME (J+90) : Réaliser un benchmark de votre comité d'audit vs. les meilleures pratiques UEMOA/CEMAC. 3) STRATÉGIQUE : Télécharger le Plan 100 Jours KHEPRA EXPERTS pour maintenir votre avance.`;

  return { insight, so_what: soWhat, now_what: nowWhat, risk_level: riskLevel, articles_cites: articles, sanction_potentielle: sanction };
}

// ─── SCORING ENGINE ────────────────────────────────────────────────────

interface QuizInput {
  email: string;
  nb_independants: number;
  reunions_an: number;
  charte: boolean;
  pv_transmis: boolean;
}

interface QuizResponse {
  score: number;
  status: "CRITIQUE" | "CONFORME";
  red_flags: RedFlag[];
  cta: string;
  cta_label: string;
  lead_logged: boolean;
  brevo_synced: boolean;
  mckinsey_memo: McKinseyQuizMemo;
}

function computeQuizScore(input: QuizInput): QuizResponse {
  const nb_independants = Number(input.nb_independants) || 0;
  const reunions_an = Number(input.reunions_an) || 0;
  const charte = Boolean(input.charte);
  const pv_transmis = Boolean(input.pv_transmis);

  const score = nb_independants * 25 + reunions_an * 25 + (charte ? 25 : 0) + (pv_transmis ? 25 : 0);
  const red_flags: RedFlag[] = [];

  if (nb_independants < 2) {
    red_flags.push({ text: "Minimum 2 administrateurs indépendants requis", article: "COBAC R-2020/01 Art.12" });
  }
  if (reunions_an < 2) {
    red_flags.push({ text: "4 réunions du Comité d'Audit par an minimum", article: "COBAC CO-2024-02 Art.8" });
  }
  if (!charte) {
    red_flags.push({ text: "Charte du Comité d'Audit approuvée par le Conseil obligatoire", article: "COSO 2016 — Principe 5" });
  }
  if (!pv_transmis) {
    red_flags.push({ text: "PV du Comité d'Audit non transmis au régulateur", article: "COBAC CO-2024-02 Art.12" });
  }

  const status = score < 50 ? "CRITIQUE" : "CONFORME";
  const cta = score < 50 ? "https://calendly.com/khepra/15min" : "/plan-100-jours";
  const cta_label = score < 50 ? "URGENCE : Réserver 15min avec un Expert →" : "Télécharger le Plan 100 Jours →";

  const mckinseyMemo = generateMcKinseyMemo(score, status, red_flags, nb_independants, reunions_an, charte, pv_transmis);

  return { score, status, red_flags, cta, cta_label, lead_logged: false, brevo_synced: false, mckinsey_memo: mckinseyMemo };
}

// ═══════════════════════════════════════════════════════════════
// MAIN HANDLER
// ═══════════════════════════════════════════════════════════════

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const startTime = Date.now();

  try {
    const body = await req.json() as QuizInput;
    const { email, nb_independants, reunions_an, charte, pv_transmis } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Email professionnel requis" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (
      typeof nb_independants !== "number" || nb_independants < 0 || nb_independants > 2 ||
      typeof reunions_an !== "number" || reunions_an < 0 || reunions_an > 2
    ) {
      return new Response(JSON.stringify({ error: "Valeurs invalides pour les questions" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const result = computeQuizScore({ email, nb_independants, reunions_an, charte, pv_transmis });

    // Log lead to Supabase
    try {
      const supabase = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");
      const { error: leadError } = await supabase.from("leads").insert({
        email,
        source: "audit-flash-cobac",
        score: result.score,
        status: result.status,
        metadata: {
          nb_independants, reunions_an,
          charte: charte ? "oui" : "non",
          pv_transmis: pv_transmis ? "oui" : "non",
          red_flags: result.red_flags,
          mckinsey_risk: result.mckinsey_memo.risk_level,
          mckinsey_sanction: result.mckinsey_memo.sanction_potentielle,
        },
        created_at: new Date().toISOString(),
      });
      result.lead_logged = !leadError;
    } catch { result.lead_logged = false; }

    // Brevo CRM push (non-blocking)
    const redFlagTexts = result.red_flags.map((f) => `${f.article}: ${f.text}`);
    result.brevo_synced = await pushToBrevo(email, result.score, result.status, redFlagTexts, result.mckinsey_memo);

    const latencyMs = Date.now() - startTime;

    // Build formatted memo text for display
    const memo = result.mckinsey_memo;
    const memoText = `╔══════════════════════════════════════╗
║  NOTE EXÉCUTIVE McKINSEY            ║
║  Score : ${result.score}/100 | Risque : ${memo.risk_level.padEnd(19)}║
╚══════════════════════════════════════╝

🔍 INSIGHT — Diagnostic :
${memo.insight}

⚠️  SO WHAT — Enjeux :
${memo.so_what}

📋 NOW WHAT — Plan d'Action :
${memo.now_what}

📜 Articles de référence : ${memo.articles_cites.join(', ')}
💰 Exposition aux sanctions : ${memo.sanction_potentielle}`;

    return new Response(JSON.stringify({
      ...result,
      mckinsey_memo_text: memoText,
      latency_ms: latencyMs,
      engine: "KOS Quiz COBAC v5.0 — McKinsey Executive Memo",
      brevo_available: !!BREVO_API_KEY,
      disclaimer: "Ce score est indicatif. Validation juridique requise pour un diagnostic complet.",
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("kos-quiz-cobac-v5 error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage, latency_ms: Date.now() - startTime }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
