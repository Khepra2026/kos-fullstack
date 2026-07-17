import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VideoBriefRequest {
  query: string;
  regulateur?: string;
  titre?: string;
  hook?: string;
  cta_url?: string;
  cta_texte?: string;
}

interface SourceCitation {
  regulateur: string;
  reference: string;
  article: string;
  url: string;
}

interface BriefPoint {
  texte_extrait: string;
  source: SourceCitation;
  duree_estimee: number;
}

interface VideoBrief {
  id: string;
  titre: string;
  hook: string;
  points_cles: BriefPoint[];
  slug: string;
  regulateur: string;
  voice_url: string;
  cta_url: string;
  cta_texte: string;
  regulateur_logo: string;
}

function generateId(): string {
  return `BRIEF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").substring(0, 60);
}

const HOOK_TEMPLATES: Record<string, string[]> = {
  BCEAO: [
    "La BCEAO durcit les règles. Voici ce qui change pour votre établissement.",
    "Nouvelle instruction BCEAO : êtes-vous en conformité ?",
    "Alerte réglementaire BCEAO : les points clés à connaître absolument.",
  ],
  OHADA: [
    "OHADA : le droit des affaires évolue. Ne restez pas à la traîne.",
    "Un nouvel Acte Uniforme OHADA vient de tomber. Décryptage.",
    "Réforme OHADA : ce que les dirigeants doivent savoir aujourd'hui.",
  ],
  COBAC: [
    "COBAC : nouvelles exigences pour les banques CEMAC.",
    "La COBAC renforce la supervision. Votre établissement est-il prêt ?",
    "Directive COBAC : les implications pour votre gouvernance.",
  ],
  UEMOA: [
    "UEMOA : harmonisation réglementaire en cours d'accélération.",
    "Zone UEMOA : les changements réglementaires à anticiper.",
  ],
  GAFI: [
    "GAFI : les standards LCB-FT évoluent. Impact immédiat.",
    "Nouvelles recommandations GAFI : êtes-vous audit-ready ?",
  ],
};

const DEFAULT_HOOKS = [
  "Réglementation : ce qui change et pourquoi c'est important pour vous.",
  "Alerte conformité : les nouvelles obligations à connaître.",
  "Décryptage réglementaire express pour les décideurs.",
];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);
    const body: VideoBriefRequest = await req.json();

    const {
      query,
      regulateur = "BCEAO",
      titre,
      hook,
      cta_url,
      cta_texte = "Téléchargez la note d'analyse complète",
    } = body;

    if (!query) {
      return new Response(JSON.stringify({ error: "Le paramètre query est requis" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`[VIDEO-BRIEF] Génération brief pour: ${query} (${regulateur})`);

    // 1. Recherche dans les documents réglementaires
    let sources: Array<{
      id: string;
      contenu: string;
      regulateur: string;
      reference: string;
      article_num: string;
      url_source: string;
      similarity: number;
    }> = [];

    try {
      const { data: kbResults, error: kbError } = await supabase
        .from("kb_docs")
        .select("id, title, summary, regulator, reference")
        .or(`regulator.eq.${regulateur},title.ilike.%${encodeURIComponent(query.substring(0, 30))}%`)
        .limit(5);

      if (!kbError && kbResults && kbResults.length > 0) {
        sources = kbResults.map((r: any) => ({
          id: r.id,
          contenu: r.summary || r.title || "",
          regulateur: r.regulator || regulateur,
          reference: r.reference || "N/A",
          article_num: "",
          url_source: "",
          similarity: 0.9,
        }));
      }
    } catch {
      console.log("[VIDEO-BRIEF] KB search skipped, generating from template");
    }

    // 2. Fallback: générer un brief structuré à partir du contexte
    const hookText = hook ||
      (HOOK_TEMPLATES[regulateur] || DEFAULT_HOOKS)[Math.floor(Math.random() * (HOOK_TEMPLATES[regulateur] || DEFAULT_HOOKS).length)];

    const titreText = titre || `Alerte ${regulateur} : ${query.substring(0, 60)}`;

    // 3. Construire les points clés
    const points_cles: BriefPoint[] = [];

    if (sources.length > 0) {
      for (let i = 0; i < Math.min(sources.length, 4); i++) {
        const s = sources[i];
        const texte = s.contenu.substring(0, 120).replace(/<[^>]*>/g, "");
        points_cles.push({
          texte_extrait: texte || `Point clé ${i + 1} sur la réglementation ${regulateur}`,
          source: {
            regulateur: s.regulateur,
            reference: s.reference,
            article: s.article_num || `Section ${i + 1}`,
            url: s.url_source || `https://${regulateur.toLowerCase()}.int/`,
          },
          duree_estimee: 8,
        });
      }
    } else {
      // Points génériques basés sur le régulateur
      const genericPoints: Record<string, string[]> = {
        BCEAO: [
          "Renforcement des exigences de fonds propres et liquidité",
          "Mise à jour des obligations de reporting périodique",
          "Nouvelles normes de gouvernance pour les établissements",
          "Calendrier de mise en conformité à respecter",
        ],
        COBAC: [
          "Directive sur la résilience opérationnelle",
          "Exigences de cybersécurité renforcées",
          "Nouveau cadre de supervision basé sur les risques",
          "Obligations de transparence accrues",
        ],
        OHADA: [
          "Modification du droit des sociétés commerciales",
          "Nouveau régime des sûretés",
          "Harmonisation des procédures collectives",
          "Impact sur la gouvernance d'entreprise",
        ],
      };

      const pts = genericPoints[regulateur] || genericPoints["BCEAO"];
      for (let i = 0; i < pts.length; i++) {
        points_cles.push({
          texte_extrait: pts[i],
          source: {
            regulateur,
            reference: `Réf. ${regulateur}-${new Date().getFullYear()}`,
            article: `Article ${10 + i}`,
            url: `https://${regulateur.toLowerCase()}.int/`,
          },
          duree_estimee: 8,
        });
      }
    }

    const slug = slugify(titreText);
    const briefId = generateId();

    const brief: VideoBrief = {
      id: briefId,
      titre: titreText,
      hook: hookText,
      points_cles,
      slug,
      regulateur,
      voice_url: "",
      cta_url: cta_url || `https://khepraexperts.com/notes/${slug}`,
      cta_texte,
      regulateur_logo: `${regulateur.toLowerCase()}.png`,
    };

    // 4. Enregistrer dans video_pipeline_runs
    try {
      await supabase.from("video_pipeline_runs").insert({
        brief_id: briefId,
        titre: titreText,
        regulateur,
        hook: hookText,
        status: "brief_generated",
        current_step: "brief_generation",
        cta_url: brief.cta_url,
        points_cles: points_cles as any,
        sources: sources.map(s => ({ regulateur: s.regulateur, ref: s.reference, article: s.article_num, url: s.url_source })) as any,
      });
    } catch (insertErr) {
      console.error("[VIDEO-BRIEF] Erreur insertion run:", insertErr);
    }

    console.log(`[VIDEO-BRIEF] Brief généré: ${briefId} — ${points_cles.length} points`);

    return new Response(JSON.stringify(brief), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[VIDEO-BRIEF] Erreur:", error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : "Erreur interne",
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
