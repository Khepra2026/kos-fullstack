import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

// ─── FRAMEWORKS (Content Generation) ──────────────────────────────────────────
const FRAMEWORKS: Record<string, any> = {
  podcast: {
    name: "Studio Podcast", template_version: "1.0",
    sections: [
      { title: "Cold Open", description: "Hook immédiat en 15 secondes", format: "audio_opening" },
      { title: "Contexte et Cadrage", description: "Présentation du sujet central", format: "context_building" },
      { title: "Invité / Point de Vue Expert", description: "Interview fictive structurée", format: "expert_insight" },
      { title: "Analyse Approfondie", description: "Décomposition du problème en 3 sous-angles", format: "deep_analysis" },
      { title: "Cas Pratique / Exemple Concret", description: "Situation réelle illustrant le propos", format: "case_study" },
      { title: "Call-to-Action + Teaser", description: "Engagement concret + teaser", format: "cta_teaser" }
    ],
    recommended_channels: ["Spotify", "Apple Podcasts", "Deezer", "YouTube (audio)", "LinkedIn Audio"]
  },
  youtube: {
    name: "Studio YouTube", template_version: "1.0",
    sections: [
      { title: "Miniature & Titre", description: "Concept de miniature accrocheuse", format: "thumbnail_brief" },
      { title: "Hook (0-15s)", description: "Pattern d'accroche retenue", format: "hook_pattern" },
      { title: "Poser le Problème (15-60s)", description: "Douleur ou aspiration de l'audience", format: "problem_framing" },
      { title: "Solution — La Méthode (60s-5min)", description: "Déroulé méthodologique", format: "method_unfolding" },
      { title: "Démonstration / Preuve Sociale (5-8min)", description: "Résultats vérifiables", format: "social_proof" },
      { title: "Call-to-Action + Engagement (8-10min)", description: "Like, commente, partage", format: "engagement_cta" }
    ],
    recommended_channels: ["YouTube", "YouTube Shorts", "LinkedIn Video", "TikTok"]
  },
  geo: {
    name: "Studio GEO", template_version: "1.0",
    sections: [
      { title: "Analyse de l'Intention de Recherche", description: "Décomposition des intentions", format: "intent_analysis" },
      { title: "Cluster Sémantique", description: "Mot-clé principal + 15-25 secondaires", format: "semantic_cluster" },
      { title: "Title Tag & Meta Description", description: "Balises optimisées", format: "serp_snippets" },
      { title: "Structure Hn", description: "Plan de contenu H1-H3", format: "hn_structure" },
      { title: "Corps du Contenu", description: "1500-3000 mots ciblés", format: "body_content" },
      { title: "Maillage Interne + Rich Snippets", description: "Schema.org + liens internes", format: "technical_seo" }
    ],
    recommended_channels: ["Google Search", "Google Discover", "Bing", "Featured Snippets"]
  },
  business: {
    name: "Studio Business Dev", template_version: "1.0",
    sections: [
      { title: "Analyse du Marché Cible", description: "Taille, croissance, segments", format: "market_analysis" },
      { title: "Proposition de Valeur", description: "Offre différenciante", format: "value_proposition" },
      { title: "Playbook Commercial", description: "Scripts, séquences", format: "sales_playbook" },
      { title: "Modèle de Revenus & Projections", description: "Pricing, hypothèses", format: "revenue_model" },
      { title: "Partenariats Stratégiques", description: "Écosystème cible", format: "partnership_strategy" },
      { title: "Plan d'Action 90 Jours", description: "Roadmap trimestrielle", format: "action_plan" }
    ],
    recommended_channels: ["LinkedIn", "Email Outreach", "Webinars", "Salons Professionnels"]
  }
};

// ─── DESIGNER FORMATS ─────────────────────────────────────────────────────────
const FORMAT_CONFIG: Record<string, any> = {
  infographie: { name: "Infographie", ratio: "2:3 vertical", tools: ["Canva Pro", "Figma", "Adobe Illustrator"], file_formats: ["PNG (HD)", "PDF (print)", "SVG (web)"], production_time: "45-90 min" },
  carousel_linkedin: { name: "Carrousel LinkedIn", ratio: "1:1 carré", tools: ["Canva Pro", "Figma"], file_formats: ["PDF multi-pages", "PNG individuels"], production_time: "60-120 min" },
  rapport_visuel: { name: "Rapport Visuel", ratio: "A4 portrait", tools: ["Adobe InDesign", "Figma", "Canva Pro"], file_formats: ["PDF", "PNG (web)"], production_time: "2-4 heures" },
  mini_video_brief: { name: "Brief Vidéo Courte", ratio: "9:16 vertical", tools: ["After Effects", "Premiere Pro", "CapCut Pro", "Canva"], file_formats: ["MP4 1080p", "GIF animé"], production_time: "90-180 min" },
  presentation_executive: { name: "Présentation Executive", ratio: "16:9 paysage", tools: ["PowerPoint", "Figma", "Google Slides", "Canva Pro"], file_formats: ["PPTX", "PDF", "PNG"], production_time: "90-180 min" },
};

function generateColorPalette(style: string): string[] {
  const palettes: Record<string, string[]> = {
    corporate: ["#1A1F36", "#86BC25", "#C4A235", "#F5F5F0", "#2D3748"],
    moderne: ["#0F172A", "#86BC25", "#E2E8F0", "#334155", "#F8FAFC"],
    chaud: ["#2D1B00", "#C4A235", "#D97706", "#FEF3C7", "#92400E"],
    minimaliste: ["#FFFFFF", "#1A1A1A", "#86BC25", "#F5F5F5", "#6B7280"],
    impact: ["#000000", "#86BC25", "#FFFFFF", "#C4A235", "#374151"],
  };
  return palettes[style] || palettes.corporate;
}

function generateContentBlock(title: string, description: string, framework: string, topic: string, audience: string, keywords: string[]): any {
  const keywordString = keywords.join(", ");
  let content = "";
  switch (title) {
    case "Cold Open": content = `ACCROCHE : Saviez-vous que ${topic} représente un enjeu de ${keywords[0] || "transformation"} pour ${audience} ?`; break;
    case "Contexte et Cadrage": content = `Le paysage de ${topic} évolue. Pour ${audience}, maîtriser ${keywordString} n'est plus une option.`; break;
    case "Invité / Point de Vue Expert": content = `Notre analyse : comment ${audience} peut tirer parti de ${topic} pour créer un avantage concurrentiel durable ?`; break;
    case "Analyse Approfondie": content = `Décortiquons ${topic} en trois dimensions : (1) état des lieux, (2) opportunités — ${keywords.slice(0, 2).join(", ")}, (3) risques et angles morts.`; break;
    case "Cas Pratique / Exemple Concret": content = `Exemple concret : une organisation confrontée à ${topic}. Situation initiale → Action → Résultat mesurable en 90 jours.`; break;
    case "Call-to-Action + Teaser": content = `Téléchargez notre guide complet. Prochain épisode : un angle encore plus audacieux — restez à l'écoute.`; break;
    case "Miniature & Titre": content = `TITRE : "Ce que personne ne vous dit sur ${topic}"\nCONCEPT MINIATURE : Visage expressif + texte impact "${keywords[0] || 'La vérité'}"`; break;
    case "Hook (0-15s)": content = `"90% de ${audience} se trompe sur ${topic}. Voici l'approche qui change tout."`; break;
    case "Poser le Problème (15-60s)": content = `Le problème : la plupart des ${audience} appliquent des méthodes dépassées. Résultat : stagnation, frustration.`; break;
    case "Solution — La Méthode (60s-5min)": content = `Méthode en 3 étapes : (1) Audit 48h, (2) Priorisation 80/20 sur ${keywords[0]}, (3) Itération rapide.`; break;
    case "Démonstration / Preuve Sociale (5-8min)": content = `Les organisations qui ont adopté cette approche constatent 30-50% d'amélioration sur leurs indicateurs clés.`; break;
    case "Call-to-Action + Engagement (8-10min)": content = `Likez, commentez "${keywords[0] || 'ACTION'}" pour la checklist gratuite. Abonnez-vous pour la suite !`; break;
    case "Analyse de l'Intention de Recherche": content = `Requête cible : "${topic}" — [INFO 60%] [TRANSAC 25%] [NAV 15%]. Recommandation : contenu hybride.`; break;
    case "Cluster Sémantique": content = `MOT-CLÉ : ${topic}\nCLUSTER : ${keywordString}\nENTITÉS : ${audience}, secteur, réglementation`; break;
    case "Title Tag & Meta Description": content = `TITLE : ${topic} : Guide Complet pour ${audience} (${new Date().getFullYear()})\nMETA : Découvrez comment ${topic} transforme ${audience}.`; break;
    case "Structure Hn": content = `H1 : ${topic} — Guide Ultime\nH2 : Pourquoi ${topic} est incontournable\nH2 : Les 5 piliers\nH3 : ${keywords[0] || 'Fondations'}\nH3 : ${keywords[1] || 'Exécution'}\nH2 : Cas concret\nH2 : FAQ`; break;
    case "Corps du Contenu": content = `INTRODUCTION : Dans un environnement où ${topic} redéfinit les règles, ${audience} doit s'adapter.\n\nSECTION 1 — ÉTAT DES LIEUX\n\nSECTION 2 — OPPORTUNITÉS : ${keywordString}\n\nSECTION 3 — PLAN D'ACTION en 4 étapes.`; break;
    case "Maillage Interne + Rich Snippets": content = `LIENS INTERNES : /guide-${keywords[0]?.toLowerCase()}, /etude-de-cas\nSCHEMA.ORG : Article, FAQPage, BreadcrumbList`; break;
    case "Analyse du Marché Cible": content = `MARCHÉ : ${topic}\nSEGMENT : ${audience}\nTENDANCES : ${keywordString}\nRECOMMANDATION : Positionnement sur ${keywords[0]}`; break;
    case "Proposition de Valeur": content = `POUR : ${audience}\nQUI : fait face à ${topic}\nNOTRE SOLUTION : ${keywords[0]} + ${keywords[1]}`; break;
    case "Playbook Commercial": content = `SÉQUENCE EMAIL J1-3-7-14 : découverte → valeur → cas client → CTA\nSCRIPT D'APPEL : "Bonjour, nous aidons ${audience} à [bénéfice ${topic}]. 20 minutes cette semaine ?"`; break;
    case "Modèle de Revenus & Projections": content = `REVENUS : Conseil, accompagnement, formation, outils\nPRICING : Value-based sur ROI ${audience}\nPROJECTION 12 MOIS : 5-10 clients initiaux`; break;
    case "Partenariats Stratégiques": content = `ÉCOSYSTÈME : Cabinets complémentaires, éditeurs, fédérations, médias\nCRITÈRES : Complémentarité, accès marché ${audience}`; break;
    case "Plan d'Action 90 Jours": content = `S1-2 : Diagnostic ${topic} | S3-6 : Prototypage offre | S7-10 : Déploiement commercial | S11-12 : Mesure & ajustement. KPI : conversion, NPS, CA.`; break;
    default: content = `Section sur ${title} concernant ${topic} pour ${audience}. Mots-clés : ${keywordString}.`;
  }
  return { title, content, tips: [`Adaptez à votre audience ${audience}`, `Intégrez les mots-clés : ${keywords.slice(0, 3).join(", ")}`, `Ajoutez des données chiffrées`, `Personnalisez avec votre expérience`] };
}

function generateDesignBrief(topic: string, audience: string, format: string, style: string, keywords: string[]): any {
  const palette = generateColorPalette(style);
  const concepts: Record<string, string> = {
    infographie: `Composition verticale. Titre "${topic}" en bold sur fond ${palette[0]}. Données en icônes et graphiques minimalistes.`,
    carousel_linkedin: `8 slides carrés. Slide 1: fond ${palette[0]} avec titre choc. Slides 2-7: alternance blanc/${palette[3]}. Slide 8: CTA fond ${palette[1]}.`,
    rapport_visuel: `A4 grille 3 colonnes. Couverture fond ${palette[0]}. Pages intérieures fond ${palette[3]}, graphiques intégrés.`,
    mini_video_brief: `9:16 vertical. Ouverture fond ${palette[0]} avec animation texte. Transitions rapides, texte ${palette[1]}.`,
    presentation_executive: `16:9 fond ${palette[4]}. Titres ${palette[1]}, corps ${palette[3]}. Graphiques épurés.`,
  };
  return {
    title: `${topic} — ${FORMAT_CONFIG[format]?.name || format}`,
    concept: concepts[format] || `Design professionnel pour ${audience}.`,
    color_palette: palette,
    typography: `Titres : Inter Bold. Corps : Inter Regular 14-16px. Accents : ${palette[1]}.`,
    layout_description: `Disposition ${FORMAT_CONFIG[format]?.ratio || "équilibrée"}. Points focaux sur ${keywords[0] || "l'information clé"}.`,
    data_visualization: `Graphiques en barres/donuts/courbes. Palette : ${palette.slice(0, 3).join(", ")}.`,
    image_direction: `Style : ${style}, haute qualité, lumière naturelle. Ton professionnel et accessible.`,
    technical_specs: `${FORMAT_CONFIG[format]?.ratio || "Standard"}, 300 DPI. ${FORMAT_CONFIG[format]?.file_formats?.join(", ") || "PNG, PDF"}.`,
  };
}

serve(async (req: Request) => {
  const corsHeaders = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body: any = await req.json();
    const action = body.action || body.framework || "podcast";

    // ─── ACTION: design (absorbed from kos-designer-infographiste) ───
    if (action === "design") {
      const { topic, audience, format = "infographie", style = "corporate", keywords = [], brand_guidelines = true, language = "fr" } = body;
      if (!topic || !audience) return new Response(JSON.stringify({ error: "Champs obligatoires : topic, audience" }), { status: 400, headers: corsHeaders });

      const mainBrief = generateDesignBrief(topic, audience, format, style, keywords);
      const altStyles = style === "corporate" ? ["moderne", "minimaliste"] : ["corporate", "impact"];
      const variations = altStyles.map((s) => generateDesignBrief(topic, audience, format, s, keywords));
      const formatConfig = FORMAT_CONFIG[format] || FORMAT_CONFIG.infographie;
      const socialDeclinations = [
        { platform: "LinkedIn", format: "1080x1080 carré + 1200x627 bannière", specifications: "Version optimisée du visuel principal." },
        { platform: "Instagram", format: "1080x1080 carré + 1080x1920 story", specifications: "Version plus visuelle, texte réduit." },
        { platform: "X (Twitter)", format: "1600x900 paysage + 1200x675 carte", specifications: "Version horizontale optimisée timeline." },
        { platform: "YouTube", format: "1280x720 miniature", specifications: "Miniature YouTube avec visage à gauche." },
      ];

      const result = {
        id: crypto.randomUUID(), topic, format: formatConfig.name,
        brief: mainBrief, variations, social_declinations: socialDeclinations,
        metadata: { generated_at: new Date().toISOString(), estimated_production_time: formatConfig.production_time, tools_recommended: formatConfig.tools, file_formats: formatConfig.file_formats }
      };

      await supabaseAdmin.from("kos_execution_logs").insert({ block_id: "studio-media-designer", block_name: "Studio Média — Designer", agent_id: "designer-infographiste", agent_name: "KOS Designer Infographiste", action: "visual_brief_generation", status: "completed", details: JSON.stringify({ topic, audience, format, style, language }) });
      return new Response(JSON.stringify(result), { status: 200, headers: corsHeaders });
    }

    // ─── ACTION: content generation (default) ─────────────────────────
    const { framework, topic, audience, keywords, tone, duration, language } = body;
    if (!framework || !topic || !audience || !keywords) {
      return new Response(JSON.stringify({ error: "Missing required fields: framework, topic, audience, keywords" }), { status: 400, headers: corsHeaders });
    }
    if (!FRAMEWORKS[framework]) {
      return new Response(JSON.stringify({ error: `Unknown framework: ${framework}. Available: ${Object.keys(FRAMEWORKS).join(", ")}` }), { status: 400, headers: corsHeaders });
    }

    const frameworkConfig = FRAMEWORKS[framework];
    const sections = frameworkConfig.sections.map((s: any) => generateContentBlock(s.title, s.description, framework, topic, audience, keywords));

    const result = {
      id: crypto.randomUUID(), framework: frameworkConfig.name, topic, sections,
      metadata: { generated_at: new Date().toISOString(), template_version: frameworkConfig.template_version, estimated_duration: duration || (framework === "podcast" ? "20-30 min" : framework === "youtube" ? "8-12 min" : "1500-3000 mots"), recommended_channels: frameworkConfig.recommended_channels }
    };

    await supabaseAdmin.from("kos_execution_logs").insert({ block_id: `studio-media-${framework}`, block_name: `Studio Média — ${frameworkConfig.name}`, agent_id: "studio-media-orchestrator", agent_name: "KOS Studio Média Orchestrator", action: "content_generation", status: "completed", details: JSON.stringify({ topic, audience, keywords, framework, sections_count: sections.length, language }) });
    return new Response(JSON.stringify(result), { status: 200, headers: corsHeaders });
  } catch (error: any) {
    console.error("Generator error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
  }
});