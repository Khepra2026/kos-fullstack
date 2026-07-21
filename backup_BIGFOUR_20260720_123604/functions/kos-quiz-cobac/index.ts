import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ─── BREVO INTEGRATION ─────────────────────────────────────────────────────

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY") || "";
const BREVO_LIST_ID = 7; // Liste "Quiz COBAC"

async function pushToBrevo(email: string, score: number, status: string, red_flags: string[]): Promise<boolean> {
  if (!BREVO_API_KEY) {
    console.log("[Brevo] API key not configured — skipping CRM push");
    return false;
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email,
        attributes: {
          SCORE_COBAC: score,
          NIVEAU: status,
          RED_FLAGS: red_flags.join(" | "),
          SOURCE: "Audit Flash COBAC 60s",
          DATE_QUIZ: new Date().toISOString(),
        },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

    const responseBody = await response.text();
    if (!response.ok) {
      console.error(`[Brevo] Push failed (${response.status}):`, responseBody);
      return false;
    }

    console.log(`[Brevo] Contact synced: ${email} | Score: ${score} | Status: ${status}`);
    return true;
  } catch (err) {
    console.error("[Brevo] Network error:", err instanceof Error ? err.message : String(err));
    return false;
  }
}

// ─── SCORING ENGINE ─────────────────────────────────────────────────────────

interface QuizInput {
  email: string;
  nb_independants: number;
  reunions_an: number;
  charte: boolean;
  pv_transmis: boolean;
}

interface RedFlag {
  text: string;
  article: string;
}

interface QuizResponse {
  score: number;
  status: "CRITIQUE" | "CONFORME";
  red_flags: RedFlag[];
  cta: string;
  cta_label: string;
  lead_logged: boolean;
  brevo_synced: boolean;
}

function computeQuizScore(input: QuizInput): QuizResponse {
  const nb_independants = Number(input.nb_independants) || 0;
  const reunions_an = Number(input.reunions_an) || 0;
  const charte = Boolean(input.charte);
  const pv_transmis = Boolean(input.pv_transmis);

  const score = nb_independants * 25 + reunions_an * 25 + (charte ? 25 : 0) + (pv_transmis ? 25 : 0);
  const red_flags: RedFlag[] = [];

  if (nb_independants < 2) {
    red_flags.push({
      text: "Minimum 2 administrateurs indépendants requis",
      article: "COBAC R-2020/01 Art.12",
    });
  }
  if (reunions_an < 2) {
    red_flags.push({
      text: "4 réunions du Comité d'Audit par an minimum",
      article: "COBAC CO-2024-02 Art.8",
    });
  }
  if (!charte) {
    red_flags.push({
      text: "Charte du Comité d'Audit approuvée par le Conseil obligatoire",
      article: "COSO 2016",
    });
  }
  if (!pv_transmis) {
    red_flags.push({
      text: "PV du Comité d'Audit non transmis au régulateur",
      article: "Risque d'injonction COBAC",
    });
  }

  const status = score < 50 ? "CRITIQUE" : "CONFORME";
  const cta = score < 50
    ? "https://calendly.com/khepra/15min"
    : "/plan-100-jours";
  const cta_label = score < 50
    ? "URGENCE : Réserver 15min avec un Expert →"
    : "Télécharger le Plan 100 Jours →";

  return { score, status, red_flags, cta, cta_label, lead_logged: false, brevo_synced: false };
}

// ─── MAIN HANDLER ───────────────────────────────────────────────────────────

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const body = await req.json() as QuizInput;
    const { email, nb_independants, reunions_an, charte, pv_transmis } = body;

    // Guard: email required
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Email professionnel requis" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Guard: validate numeric inputs
    if (
      typeof nb_independants !== "number" || nb_independants < 0 || nb_independants > 2 ||
      typeof reunions_an !== "number" || reunions_an < 0 || reunions_an > 2
    ) {
      return new Response(
        JSON.stringify({ error: "Valeurs invalides pour les questions" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Compute score server-side
    const result = computeQuizScore({ email, nb_independants, reunions_an, charte, pv_transmis });

    // Log lead to Supabase
    try {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      );

      const { error: leadError } = await supabase.from("leads").insert({
        email,
        source: "audit-flash-cobac",
        score: result.score,
        status: result.status,
        metadata: {
          nb_independants,
          reunions_an,
          charte: charte ? "oui" : "non",
          pv_transmis: pv_transmis ? "oui" : "non",
          red_flags: result.red_flags,
        },
        created_at: new Date().toISOString(),
      });

      result.lead_logged = !leadError;
    } catch {
      result.lead_logged = false;
    }

    // Push to Brevo CRM (non-blocking, graceful fallback if no key)
    const redFlagTexts = result.red_flags.map((f) => `${f.article}: ${f.text}`);
    result.brevo_synced = await pushToBrevo(email, result.score, result.status, redFlagTexts);

    const latencyMs = Date.now() - startTime;

    return new Response(
      JSON.stringify({
        ...result,
        latency_ms: latencyMs,
        engine: "KOS Quiz COBAC v4.0",
        brevo_available: !!BREVO_API_KEY,
        disclaimer: "Ce score est indicatif. Validation juridique requise pour un diagnostic complet.",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("kos-quiz-cobac error:", errorMessage);

    return new Response(
      JSON.stringify({
        error: errorMessage,
        latency_ms: Date.now() - startTime,
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
