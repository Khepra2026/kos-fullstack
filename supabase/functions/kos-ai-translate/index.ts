import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Regulatory domain glossary FR↔EN
const GLOSSARY: Record<string, string> = {
  // Governance
  "gouvernance": "governance",
  "conseil d'administration": "board of directors",
  "comités spécialisés": "specialized committees",
  "comité d'audit": "audit committee",
  "comité des risques": "risk committee",
  "contrôle interne": "internal control",
  "administrateur indépendant": "independent director",
  "PCA": "Board Chair",
  "DG": "CEO",
  "DAF": "CFO",
  
  // Compliance
  "conformité": "compliance",
  "lutte contre le blanchiment": "anti-money laundering",
  "financement du terrorisme": "terrorist financing",
  "LCB/FT": "AML/CFT",
  "LBC/FT": "AML/CFT",
  "due diligence": "due diligence",
  "bénéficiaire effectif": "beneficial owner",
  "déclaration de soupçon": "suspicious transaction report",
  "gel des avoirs": "asset freeze",
  
  // Regulatory
  "circulaire": "circular",
  "instruction": "instruction",
  "décision": "decision",
  "règlement": "regulation",
  "directive": "directive",
  "acte uniforme": "uniform act",
  "recommandation": "recommendation",
  "avis": "notice",
  "note": "note",
  
  // Financial
  "provisionnement": "provisioning",
  "créances en souffrance": "non-performing loans",
  "fonds propres": "equity capital",
  "ratio de solvabilité": "solvency ratio",
  "liquidité": "liquidity",
  "rentabilité": "profitability",
  "stress test": "stress test",
  "portefeuille": "portfolio",
  
  // Microfinance
  "microfinance": "microfinance",
  "SFD": "MFI",
  "EMF": "MFI",
  "système financier décentralisé": "decentralized financial system",
  "agrément": "license",
  "crédit": "credit",
  "épargne": "savings",
  
  // Risk
  "risque opérationnel": "operational risk",
  "risque de crédit": "credit risk",
  "risque de marché": "market risk",
  "risque de liquidité": "liquidity risk",
  "cartographie des risques": "risk mapping",
  "appétit au risque": "risk appetite",
  
  // Regulators
  "BCEAO": "BCEAO",
  "COBAC": "COBAC",
  "BEAC": "BEAC",
  "GABAC": "GABAC",
  "GAFI": "FATF",
  "OHADA": "OHADA",
  "UEMOA": "WAEMU",
  "CEMAC": "CEMAC",
  "GIABA": "GIABA",
  "AMF-UEMOA": "AMF-WAEMU",
  "CREPMF": "CREPMF",
  
  // Standards
  "norme": "standard",
  "normes IFRS": "IFRS standards",
  "normes prudentielles": "prudential standards",
  "Bâle II": "Basel II",
  "Bâle III": "Basel III",
  "ISO 27001": "ISO 27001",
  "ISO 42001": "ISO 42001",
  "ISO 9001": "ISO 9001",
  "ISAE 3000": "ISAE 3000",
  
  // Reporting
  "reporting": "reporting",
  "déclaration": "declaration",
  "rapport annuel": "annual report",
  "rapport semestriel": "semi-annual report",
  "états financiers": "financial statements",
  
  // General regulatory
  "dispositions": "provisions",
  "dispositions générales": "general provisions",
  "modalités": "modalities",
  "conditions": "conditions",
  "procédures": "procedures",
  "politique": "policy",
  "plan de redressement": "recovery plan",
  "plan préventif": "preventive plan",
  "plan de continuité": "business continuity plan",
  "audit externe": "external audit",
  "audit interne": "internal audit",
  "commissaire aux comptes": "statutory auditor",
  "lanceur d'alerte": "whistleblower",
  "protection des données": "data protection",
  "cybersécurité": "cybersecurity",
  "résilience opérationnelle": "operational resilience",
  
  // ESG
  "durabilité": "sustainability",
  "décarbonation": "decarbonization",
  "bilan carbone": "carbon footprint",
  "financement vert": "green financing",
  "taxonomie": "taxonomy",
  "matérialité": "materiality",
  
  // General
  "étude": "study",
  "analyse": "analysis",
  "évaluation": "assessment",
  "diagnostic": "diagnostic",
  "recommandation": "recommendation",
  "mise en œuvre": "implementation",
  "suivi": "monitoring",
  "validation": "validation",
  "certification": "certification",
  "habilitation": "authorization",
  "délégation": "delegation",
  "supervision": "supervision",
  "surveillance": "surveillance",
};

function translateText(text: string, direction: "fr2en" | "en2fr"): string {
  let result = text;
  
  const sortedKeys = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
  
  if (direction === "fr2en") {
    for (const fr of sortedKeys) {
      const en = GLOSSARY[fr];
      const regex = new RegExp(fr.replace(/[-\/\\^$*+?.()|[\]]/g, '\\$&'), 'gi');
      result = result.replace(regex, (match) => {
        if (match[0] === match[0].toUpperCase()) {
          return en.charAt(0).toUpperCase() + en.slice(1);
        }
        return en;
      });
    }
  } else {
    const reverseGlossary: Record<string, string> = {};
    for (const [fr, en] of Object.entries(GLOSSARY)) {
      reverseGlossary[en.toLowerCase()] = fr;
    }
    const enKeys = Object.keys(reverseGlossary).sort((a, b) => b.length - a.length);
    for (const en of enKeys) {
      const fr = reverseGlossary[en];
      const regex = new RegExp(en.replace(/[-\/\\^$*+?.()|[\]]/g, '\\$&'), 'gi');
      result = result.replace(regex, (match) => {
        if (match[0] === match[0].toUpperCase()) {
          return fr.charAt(0).toUpperCase() + fr.slice(1);
        }
        return fr;
      });
    }
  }
  
  return result;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { text, direction } = await req.json();
    
    if (!text || typeof text !== "string") {
      return new Response(
        JSON.stringify({ error: "text string required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const dir = direction === "en2fr" ? "en2fr" : "fr2en";
    const translated = translateText(text, dir);

    return new Response(
      JSON.stringify({
        original: text,
        translated,
        direction: dir,
        engine: "kos-ai-translate-v1",
        glossary_size: Object.keys(GLOSSARY).length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});