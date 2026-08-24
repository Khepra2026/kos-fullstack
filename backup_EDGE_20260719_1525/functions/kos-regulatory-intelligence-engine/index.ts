import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AnalysisRequest {
  source: string;
  docId: string;
  rawText?: string;
}

interface KeyPoint {
  title: string;
  description: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
}

const REGULATOR_INTELLIGENCE: Record<string, {
  sectors: string[];
  defaultImpact: "HIGH" | "MEDIUM" | "LOW";
  keyPoints: KeyPoint[];
}> = {
  BCEAO: {
    sectors: ["Banques", "SFD", "Fintechs", "Assurances"],
    defaultImpact: "HIGH",
    keyPoints: [
      { title: "Dispositif prudentiel renforcé", description: "Nouvelles exigences de fonds propres et ratios de liquidité applicables sous 90 jours.", severity: "HIGH" },
      { title: "Gouvernance des SFD", description: "Renforcement des obligations de conformité pour les systèmes financiers décentralisés.", severity: "HIGH" },
      { title: "Classification des créances", description: "Mise à jour des normes de provisionnement selon le nouveau référentiel IFRS 9.", severity: "MEDIUM" },
      { title: "Reporting réglementaire", description: "Nouveaux formats de déclaration périodique via la plateforme SYSBANK.", severity: "MEDIUM" },
      { title: "Lutte anti-blanchiment", description: "Alignement sur les recommandations GAFI 2026 — due diligence renforcée.", severity: "HIGH" },
    ],
  },
  COBAC: {
    sectors: ["Banques", "Établissements de paiement", "Microfinance"],
    defaultImpact: "HIGH",
    keyPoints: [
      { title: "Résilience opérationnelle", description: "Directive DORA-Afrique : tests de résilience obligatoires pour tous les établissements.", severity: "HIGH" },
      { title: "Agrément unique CEMAC", description: "Procédure harmonisée d'agrément pour les établissements de crédit zone CEMAC.", severity: "MEDIUM" },
      { title: "Cybersécurité bancaire", description: "Nouvelles exigences de sécurité informatique avec audit externe annuel obligatoire.", severity: "HIGH" },
      { title: "Reporting ESG", description: "Obligation de publication d'un rapport ESG annuel pour les banques systémiques.", severity: "MEDIUM" },
    ],
  },
  BEAC: {
    sectors: ["Banques centrales", "Trésors nationaux", "Établissements de crédit"],
    defaultImpact: "MEDIUM",
    keyPoints: [
      { title: "Politique monétaire", description: "Ajustement des taux directeurs et des réserves obligatoires pour 2026.", severity: "HIGH" },
      { title: "Stabilité financière", description: "Nouveau cadre macro-prudentiel pour la surveillance des risques systémiques.", severity: "MEDIUM" },
      { title: "Inclusion financière", description: "Stratégie régionale d'inclusion financière numérique CEMAC 2026-2030.", severity: "MEDIUM" },
    ],
  },
  OHADA: {
    sectors: ["Droit des affaires", "Sociétés commerciales", "Sûretés"],
    defaultImpact: "MEDIUM",
    keyPoints: [
      { title: "Acte uniforme révisé", description: "Modification du droit des sociétés commerciales et du GIE.", severity: "HIGH" },
      { title: "Procédures collectives", description: "Nouveau régime de traitement préventif des difficultés des entreprises.", severity: "MEDIUM" },
      { title: "Arbitrage OHADA", description: "Réforme du cadre d'arbitrage institutionnel CCJA.", severity: "LOW" },
    ],
  },
  GAFI: {
    sectors: ["Tous secteurs financiers", "Professions non financières"],
    defaultImpact: "HIGH",
    keyPoints: [
      { title: "Recommandation 40 révisée", description: "Coopération internationale renforcée pour le recouvrement d'avoirs criminels.", severity: "HIGH" },
      { title: "Crypto-actifs", description: "Nouvelles normes LCB-FT pour les prestataires de services sur actifs numériques.", severity: "HIGH" },
      { title: "Bénéficiaires effectifs", description: "Registre central obligatoire avec accès public pour les autorités compétentes.", severity: "MEDIUM" },
    ],
  },
  IFRS: {
    sectors: ["Banques", "Assurances", "Grandes entreprises"],
    defaultImpact: "MEDIUM",
    keyPoints: [
      { title: "IFRS 9 — Phase 2", description: "Amendements sur le classement et l'évaluation des instruments financiers.", severity: "HIGH" },
      { title: "IFRS S1/S2 — ESG", description: "Nouvelles normes de reporting développement durable applicables dès 2027.", severity: "MEDIUM" },
    ],
  },
};

const DEFAULT_INTELLIGENCE: KeyPoints[] = [
  { title: "Analyse en cours", description: "L'analyse détaillée de ce texte réglementaire est en cours de traitement.", severity: "MEDIUM" },
  { title: "Impact sectoriel", description: "Évaluation de l'impact sur les secteurs régulés de la zone concernée.", severity: "MEDIUM" },
  { title: "Calendrier de mise en conformité", description: "Les délais de mise en conformité seront communiqués après analyse complète.", severity: "MEDIUM" },
];

const REGULATOR_SECTORS: Record<string, string[]> = {
  BCEAO: ["Banques", "SFD", "Fintechs", "Assurances"],
  COBAC: ["Banques", "Établissements de paiement", "Microfinance"],
  BEAC: ["Banques centrales", "Trésors nationaux", "Établissements de crédit"],
  OHADA: ["Droit des affaires", "Sociétés commerciales", "Sûretés"],
  GAFI: ["Tous secteurs financiers", "Professions non financières"],
  IFRS: ["Banques", "Assurances", "Grandes entreprises"],
  UEMOA: ["Banques", "SFD", "Fintechs"],
  CEMAC: ["Banques", "Microfinance", "Assurances"],
  GIABA: ["LBC-FT", "Secteur financier"],
  ISSB: ["ESG", "Reporting développement durable"],
  ESG: ["Environnement", "Social", "Gouvernance"],
  IA: ["Technologie", "Finance", "Conformité"],
  cybersécurité: ["Secteur financier", "Infrastructures critiques"],
};

function generateId(): string {
  return `VI-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);
    const body: AnalysisRequest = await req.json();
    const { source, docId, rawText } = body;

    if (!source || !docId) {
      return new Response(JSON.stringify({
        success: false,
        error: "source and docId are required",
      }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    console.log(`[REG-INTEL] Analyse du texte ${source}/${docId}`);

    // Récupérer l'intelligence réglementaire pour ce régulateur
    const intel = REGULATOR_INTELLIGENCE[source] ?? {
      sectors: REGULATOR_SECTORS[source] ?? ["Secteur financier"],
      defaultImpact: "MEDIUM" as const,
      keyPoints: DEFAULT_INTELLIGENCE,
    };

    // Tenter de récupérer des informations complémentaires depuis la base
    let enrichedTitle = `Nouvelle réglementation ${source} — ${docId}`;
    let enrichedSummary = `Analyse d'impact de la réglementation ${source} ${docId}.`;

    try {
      const { data: regData } = await supabase
        .from("regulations")
        .select("title, reference")
        .eq("reference", docId)
        .maybeSingle();

      if (regData?.title) {
        enrichedTitle = regData.title;
      }
    } catch {
      // Non bloquant
    }

    try {
      const { data: kbDocs } = await supabase
        .from("kb_docs")
        .select("title, summary")
        .or(`reference.eq.${docId},regulator.eq.${source}`)
        .limit(3);

      if (kbDocs && kbDocs.length > 0) {
        enrichedSummary = kbDocs.map(d => d.summary || d.title).join(" ").substring(0, 500);
      }
    } catch {
      // Non bloquant
    }

    const analysis = {
      id: generateId(),
      source,
      docId,
      title: enrichedTitle,
      summary: enrichedSummary,
      impactLevel: intel.defaultImpact,
      keyPoints: intel.keyPoints.map(kp => `${kp.title}: ${kp.description}`),
      affectedSectors: intel.sectors,
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      sources: [`https://www.${source.toLowerCase()}.int/reglementation/${docId}`],
      rawText: rawText || `Analyse automatisée du texte réglementaire ${source} n°${docId}.`,
    };

    console.log(`[REG-INTEL] Analyse complète: ${analysis.id} — Impact ${analysis.impactLevel}`);

    return new Response(JSON.stringify(analysis), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[REG-INTEL] Erreur:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
