import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ═══════════════════════════════════════════════════
// KOS BACKLINK DETECT v2
// Détection opportunités backlinks — DB write
// v2 : JWT + Admin obligatoire
// ═══════════════════════════════════════════════════

async function authenticate(req: Request): Promise<{ isAdmin: boolean; isServiceRole: boolean }> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { isAdmin: false, isServiceRole: false };
  }

  const token = authHeader.replace("Bearer ", "");
  if (token === serviceRoleKey) return { isAdmin: true, isServiceRole: true };

  try {
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user) return { isAdmin: false, isServiceRole: false };
    const { data: profile } = await supabaseAdmin.from("profiles").select("system_role").eq("id", user.id).maybeSingle();
    const isAdmin = profile?.system_role === "admin" || profile?.system_role === "superadmin" || profile?.system_role === "owner";
    return { isAdmin, isServiceRole: false };
  } catch {
    return { isAdmin: false, isServiceRole: false };
  }
}

const TARGET_DOMAINS = [
  { domain: "bceao.int", da: 75, type: "regulatory_mention", relevance: 95 },
  { domain: "beac.int", da: 65, type: "regulatory_mention", relevance: 90 },
  { domain: "ohada.org", da: 60, type: "regulatory_mention", relevance: 90 },
  { domain: "fatf-gafi.org", da: 85, type: "regulatory_citation", relevance: 85 },
  { domain: "giaba.org", da: 50, type: "regulatory_mention", relevance: 85 },
  { domain: "uemoa.int", da: 60, type: "institutional", relevance: 80 },
  { domain: "cemac.int", da: 55, type: "institutional", relevance: 80 },
  { domain: "banquemondiale.org", da: 90, type: "institutional", relevance: 70 },
  { domain: "imf.org", da: 92, type: "institutional", relevance: 70 },
  { domain: "afdb.org", da: 80, type: "institutional", relevance: 75 },
  { domain: "jeuneafrique.com", da: 75, type: "media", relevance: 60 },
  { domain: "financialafrik.com", da: 50, type: "media", relevance: 65 },
  { domain: "ecofinagency.com", da: 45, type: "media", relevance: 60 },
  { domain: "agenceecofin.com", da: 48, type: "media", relevance: 60 },
  { domain: "afrique.latribune.fr", da: 55, type: "media", relevance: 55 },
  { domain: "republicoftogo.com", da: 40, type: "media_local", relevance: 55 },
  { domain: "oecd.org", da: 88, type: "institutional", relevance: 70 },
  { domain: "ifc.org", da: 82, type: "institutional", relevance: 65 },
  { domain: "iso.org", da: 85, type: "standards", relevance: 50 },
  { domain: "linkedin.com", da: 98, type: "social_proof", relevance: 45 },
  { domain: "medium.com", da: 92, type: "guest_post", relevance: 55 },
  { domain: "forbes.fr", da: 70, type: "guest_post", relevance: 50 },
  { domain: "hbrfrance.fr", da: 55, type: "guest_post", relevance: 50 },
  { domain: "village-justice.com", da: 50, type: "guest_post", relevance: 50 },
  { domain: "finyear.com", da: 42, type: "guest_post", relevance: 55 },
  { domain: "cio-mag.com", da: 40, type: "guest_post", relevance: 45 },
  { domain: "itnewsafrica.com", da: 45, type: "guest_post", relevance: 40 },
  { domain: "africanbusinessmagazine.com", da: 45, type: "media", relevance: 45 },
];

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  // ─── JWT + Admin Gate ───
  const { isAdmin, isServiceRole } = await authenticate(req);
  if (!isAdmin && !isServiceRole) {
    return new Response(JSON.stringify({ success: false, error: "Accès non autorisé — JWT Admin requis", error_code: "UNAUTHORIZED", engine: "kos-backlink-detect-v2" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey, { auth: { autoRefreshToken: false, persistSession: false } });

    const siteUrl = Deno.env.get("SITE_URL") ?? "https://khepraexperts.com";
    const opportunities: any[] = [];
    const stats = { total_opportunities: 0, high_priority: 0, medium_priority: 0, low_priority: 0, total_reach: 0, average_da: 0 };
    let totalDa = 0;
    let count = 0;

    for (const target of TARGET_DOMAINS) {
      const priority = target.da >= 75 ? "high" : target.da >= 50 ? "medium" : "low";
      const outreachStrategy = target.type === "regulatory_mention"
        ? "Proposer une contribution experte citant la réglementation KHEPRA"
        : target.type === "media"
        ? "Pitcher une tribune ou interview sur la régulation financière africaine"
        : target.type === "guest_post"
        ? "Proposer un article invité sur un sujet réglementaire UEMOA/CEMAC"
        : target.type === "institutional"
        ? "Soumettre un working paper ou une étude pour leur bibliothèque"
        : "Engager via LinkedIn et proposer un partenariat de contenu";

      opportunities.push({ target_url: `https://${target.domain}`, source_domain: target.domain, domain_authority: target.da, opportunity_type: target.type, relevance_score: target.relevance, status: "detected", notes: outreachStrategy });
      totalDa += target.da;
      count++;
      if (priority === "high") stats.high_priority++;
      else if (priority === "medium") stats.medium_priority++;
      else stats.low_priority++;
    }

    stats.total_opportunities = count;
    stats.average_da = Math.round(totalDa / count);
    stats.total_reach = count * 2000;

    const contentPillars = [
      { title: "Baromètre Conformité BCEAO 2026", type: "research_report", targetDA: "65-90", description: "Rapport annuel exclusif — données inédites sur la conformité bancaire UEMOA", linkablePages: ["/barometre-bceao-2026", "/bceao", "/guide-bceao-2026"] },
      { title: "Guide Pratique Prix de Transfert Afrique", type: "definitive_guide", targetDA: "50-75", description: "Guide 5000+ mots — le plus complet sur le sujet en français", linkablePages: ["/prix-de-transfert", "/guide-due-diligence-afrique"] },
      { title: "Étude Comparative : Conformité LBC/FT UEMOA vs CEMAC", type: "original_research", targetDA: "50-80", description: "Analyse comparative exclusive des deux zones réglementaires", linkablePages: ["/gafi", "/conformite-cemac"] },
      { title: "Cartographie des Risques COSO pour Institutions Financières Africaines", type: "framework", targetDA: "45-70", description: "Framework méthodologique adapté au contexte africain", linkablePages: ["/gouvernance-risques"] },
      { title: "Calculateur de Ratios Prudentiels BCEAO", type: "interactive_tool", targetDA: "40-65", description: "Outil interactif gratuit — linkable naturellement", linkablePages: ["/tools/stress-test-financier", "/tools/diagnostic-pre-inspection-bceao"] },
    ];

    for (const opp of opportunities.slice(0, 10)) {
      const { error } = await supabase.from("backlink_opportunities").insert(opp);
      if (error) console.log("Skip duplicate:", opp.source_domain);
    }

    return new Response(JSON.stringify({
      success: true,
      engine: "kos-backlink-detect-v2",
      auth_mode: isServiceRole ? "service_role" : "jwt_admin",
      data: {
        opportunities,
        stats,
        content_pillars: contentPillars,
        scan_date: new Date().toISOString(),
        quick_wins: [
          "Publier le Baromètre Conformité BCEAO 2026 → cible 10+ backlinks haute autorité",
          "Transformer 5 articles blog en posts LinkedIn → republication médias africains",
          "Proposer une tribune à Jeune Afrique : 'L'avenir de la régulation financière en zone franc'",
          "Soumettre un working paper à la bibliothèque de la BCEAO",
          "Créer des pages ressources 'statistiques' → aimant à backlinks naturel",
        ]
      }
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 });
  } catch (err) {
    console.error("Backlink detect error:", err);
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : String(err), engine: "kos-backlink-detect-v2" }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 });
  }
});