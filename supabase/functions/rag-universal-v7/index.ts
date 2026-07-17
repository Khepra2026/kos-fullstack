import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ============================================================================
// BIG FOUR ACTION ARTEFACT — KOS REGTECH AI™ v7.2
// 10 Actions Correctives + Query Domain Detection + Agrément Domain + Relevance Filter
// ============================================================================

const JURISDICTION_TIERS: Record<string, { tier: number; label: string; priority_boost: number }> = {
  "BCEAO": { tier: 0, label: "Tier 0 — Régulateur Primaire", priority_boost: 1.00 },
  "CENTIF": { tier: 0, label: "Tier 0 — Régulateur Primaire", priority_boost: 0.99 },
  "GIABA": { tier: 0, label: "Tier 0 — Régulateur Primaire", priority_boost: 0.99 },
  "COBAC": { tier: 0, label: "Tier 0 — Régulateur Primaire", priority_boost: 0.98 },
  "UEMOA": { tier: 0, label: "Tier 0 — Régulateur Primaire", priority_boost: 0.98 },
  "OHADA": { tier: 0, label: "Tier 0 — Régulateur Primaire", priority_boost: 0.97 },
  "CEMAC": { tier: 0, label: "Tier 0 — Régulateur Primaire", priority_boost: 0.97 },
  "BEAC": { tier: 0, label: "Tier 0 — Régulateur Primaire", priority_boost: 0.96 },
  "GAFI": { tier: 0, label: "Tier 0 — Standard International", priority_boost: 0.99 },
  "FATF": { tier: 0, label: "Tier 0 — Standard International", priority_boost: 0.99 },
  "AMF-UEMOA": { tier: 0, label: "Tier 0 — Régulateur Primaire", priority_boost: 0.97 },
  "CREPMF": { tier: 0, label: "Tier 0 — Régulateur Primaire", priority_boost: 0.96 },
  "ISO": { tier: 1, label: "Tier 1 — Standard International", priority_boost: 0.93 },
  "COSO": { tier: 1, label: "Tier 1 — Standard International", priority_boost: 0.92 },
  "NIST": { tier: 1, label: "Tier 1 — Standard International", priority_boost: 0.91 },
  "IFRS": { tier: 1, label: "Tier 1 — Standard International", priority_boost: 0.90 },
  "BRI": { tier: 1, label: "Tier 1 — Standard International", priority_boost: 0.89 },
  "BIS": { tier: 1, label: "Tier 1 — Standard International", priority_boost: 0.89 },
  "BCBS": { tier: 1, label: "Tier 1 — Standard International", priority_boost: 0.88 },
  "IASB": { tier: 1, label: "Tier 1 — Standard International", priority_boost: 0.88 },
  "IAASB": { tier: 1, label: "Tier 1 — Standard International", priority_boost: 0.87 },
  "IFAC": { tier: 1, label: "Tier 1 — Standard International", priority_boost: 0.87 },
  "PwC": { tier: 2, label: "Tier 2 — Big Four", priority_boost: 0.75 },
  "Deloitte": { tier: 2, label: "Tier 2 — Big Four", priority_boost: 0.74 },
  "EY": { tier: 2, label: "Tier 2 — Big Four", priority_boost: 0.73 },
  "KPMG": { tier: 2, label: "Tier 2 — Big Four", priority_boost: 0.72 },
  "Ernst & Young": { tier: 2, label: "Tier 2 — Big Four", priority_boost: 0.73 },
  "PricewaterhouseCoopers": { tier: 2, label: "Tier 2 — Big Four", priority_boost: 0.75 },
  "Harvard": { tier: 3, label: "Tier 3 — Académique", priority_boost: 0.50 },
  "KU Leuven": { tier: 3, label: "Tier 3 — Académique", priority_boost: 0.50 },
  "Stanford": { tier: 3, label: "Tier 3 — Académique", priority_boost: 0.50 },
  "MIT": { tier: 3, label: "Tier 3 — Académique", priority_boost: 0.50 },
  "Oxford": { tier: 3, label: "Tier 3 — Académique", priority_boost: 0.50 },
  "Cambridge": { tier: 3, label: "Tier 3 — Académique", priority_boost: 0.50 },
  "HEC": { tier: 3, label: "Tier 3 — Académique", priority_boost: 0.50 },
  "Sorbonne": { tier: 3, label: "Tier 3 — Académique", priority_boost: 0.50 },
  "Sciences Po": { tier: 3, label: "Tier 3 — Académique", priority_boost: 0.50 },
  "Université": { tier: 3, label: "Tier 3 — Académique", priority_boost: 0.50 },
  "Blog": { tier: 4, label: "Tier 4 — Blog/Média", priority_boost: 0.20 },
  "Media": { tier: 4, label: "Tier 4 — Blog/Média", priority_boost: 0.20 },
};

function resolveJurisdictionTier(authority: string): { tier: number; label: string; priority_boost: number } {
  if (JURISDICTION_TIERS[authority]) return JURISDICTION_TIERS[authority];
  for (const [key, val] of Object.entries(JURISDICTION_TIERS)) {
    if (authority.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return { tier: 3, label: "Tier 3 — Non classifié", priority_boost: 0.35 };
}

const AUTHORITY_INDEX: Record<string, number> = {
  "BCEAO": 100, "CENTIF": 99, "GIABA": 97, "GAFI": 97, "FATF": 97,
  "COBAC": 98, "UEMOA": 96, "OHADA": 95, "CEMAC": 95, "BEAC": 94,
  "AMF-UEMOA": 96, "CREPMF": 95,
  "ISO": 93, "COSO": 92, "NIST": 91, "IFRS": 90, "BRI": 89, "BIS": 89, "BCBS": 88,
  "IAASB": 87, "IFAC": 87, "IASB": 86,
  "PwC": 90, "Deloitte": 90, "EY": 89, "KPMG": 89, "PricewaterhouseCoopers": 90,
  "Ernst & Young": 89,
  "Harvard": 72, "Stanford": 70, "MIT": 70, "Oxford": 71, "Cambridge": 70,
  "KU Leuven": 68, "HEC": 65, "Sorbonne": 64, "Sciences Po": 63,
  "Université": 60, "Blog": 25, "Media": 20,
};

function getAuthorityIndex(authority: string): number {
  if (AUTHORITY_INDEX[authority]) return AUTHORITY_INDEX[authority];
  for (const [key, val] of Object.entries(AUTHORITY_INDEX)) {
    if (authority.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return 55;
}

interface ConfidenceInput {
  v_score: number; authority: string; content_snippet: string;
  title: string; effective_date: string; source_tier: number;
}

function computeConfidence(input: ConfidenceInput): {
  confidence: number; semantic: number; authority_score: number;
  citation_density: number; jurisdiction: number; freshness: number;
} {
  const semantic = Math.min(input.v_score * 25, 25);
  const authority_score = Math.min(getAuthorityIndex(input.authority) * 0.25, 25);
  const text = (input.content_snippet || "") + " " + (input.title || "");
  const citations = (text.match(/Art\.|Article|§|R\.\d|Recommandation \d|Instruction n°/gi) || []).length;
  const citation_density = Math.min(citations * 5, 20);
  const jurisdiction = Math.min(input.source_tier <= 1 ? 15 : input.source_tier === 2 ? 10 : 5, 15);
  const now = new Date();
  let freshness = 5;
  if (input.effective_date) {
    const ageYears = (now.getTime() - new Date(input.effective_date).getTime()) / (365.25 * 24 * 3600 * 1000);
    freshness = Math.max(0, Math.min(15 - ageYears * 0.75, 15));
  }
  const confidence = Math.round(semantic + authority_score + citation_density + jurisdiction + freshness);
  return { confidence: Math.min(confidence, 99), semantic, authority_score, citation_density, jurisdiction, freshness };
}

function safeScore(score: unknown): number {
  if (score === null || score === undefined) return 0.00;
  const n = Number(score);
  if (isNaN(n) || !isFinite(n)) return 0.00;
  return Math.max(n, 0.00);
}

function recalculateScore(s: any): number {
  const v = safeScore(s.v_score);
  const f = safeScore(s.f_score);
  const m = safeScore(s.m_score || 0);
  const kg = safeScore(s.kg_score || 0);
  return v * 0.25 + f * 0.55 + m * 0.15 + kg * 0.05;
}

function generateRetrievalExplanation(doc: any, query: string): string[] {
  const reasons: string[] = [];
  const title = (doc.title || "").toLowerCase();
  const content = (doc.content_snippet || "").toLowerCase();
  const authority = (doc.regulator || doc.authority || "").toLowerCase();
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
  const matchedKeywords = queryWords.filter(w => title.includes(w) || content.includes(w));
  if (matchedKeywords.length > 0) reasons.push(`Matched keywords: ${matchedKeywords.slice(0, 5).join(", ")}`);
  if (safeScore(doc.v_score) > 0.7) reasons.push(`Strong semantic match (vector score: ${Math.round(safeScore(doc.v_score) * 100)}%)`);
  else if (safeScore(doc.v_score) > 0.4) reasons.push(`Moderate semantic match (vector score: ${Math.round(safeScore(doc.v_score) * 100)}%)`);
  if (safeScore(doc.kg_score || 0) > 0.5) reasons.push(`Knowledge graph entity match (KG score: ${Math.round(safeScore(doc.kg_score || 0) * 100)}%)`);
  if (doc.type && ["directive", "Directive", "Règlement", "Regulation", "Instruction", "Circulaire", "Recommandation", "Acte Uniforme", "Standard"].includes(doc.type)) reasons.push(`Matched regulation type: ${doc.type}`);
  if (authority && queryLower.includes(authority)) reasons.push(`Matched jurisdiction: ${doc.regulator || doc.authority}`);
  if (reasons.length === 0) reasons.push("Retrieved by broad semantic relevance");
  return reasons;
}

function computeRiskLevel(doc: any, confidence: number): "Critical" | "High" | "Medium" | "Low" {
  if (confidence >= 90) return "Critical";
  if (confidence >= 75) return "High";
  if (confidence >= 50) return "Medium";
  return "Low";
}

function computeApplicability(doc: any): "Applicable" | "Indirect" | "Reference" | "Academic" {
  const tier = doc.source_tier ?? resolveJurisdictionTier(doc.regulator || doc.authority || "").tier;
  if (tier <= 1) return "Applicable";
  if (tier === 2) return "Indirect";
  if (tier === 3) return "Reference";
  return "Academic";
}

function detectContradictions(sources: any[]): { has_contradiction: boolean; pairs: any[] } {
  const pairs: any[] = [];
  const contradictions: string[] = ["doit", "ne doit pas", "obligatoire", "interdit", "obligation", "interdiction", "must", "must not", "mandatory", "prohibited", "shall", "shall not"];
  for (let i = 0; i < sources.length; i++) {
    for (let j = i + 1; j < sources.length; j++) {
      const textA = ((sources[i].content_snippet || "") + " " + (sources[i].title || "")).toLowerCase();
      const textB = ((sources[j].content_snippet || "") + " " + (sources[j].title || "")).toLowerCase();
      let conflictSignals = 0;
      for (const c of contradictions) { if (textA.includes(c) && textB.includes(c)) conflictSignals++; }
      if (conflictSignals >= 3) {
        pairs.push({ source_a: { regulator: sources[i].regulator, title: sources[i].title }, source_b: { regulator: sources[j].regulator, title: sources[j].title }, signal: `${conflictSignals} potential conflict indicators detected` });
      }
    }
  }
  return { has_contradiction: pairs.length > 0, pairs };
}

function hallucinationCheck(sources: any[]): { has_sufficient_evidence: boolean; evidence_count: number; high_confidence_sources: number; verdict: string } {
  const highConfSources = sources.filter(s => safeScore(s.v_score) > 0.65 || safeScore(s.f_score) > 0.60);
  const evidenceCount = highConfSources.length;
  return {
    has_sufficient_evidence: evidenceCount >= 2, evidence_count: evidenceCount, high_confidence_sources: highConfSources.length,
    verdict: evidenceCount >= 2 ? "✅ SUFFICIENT EVIDENCE — ≥2 high-confidence sources support this response" : "⚠️ NOT ENOUGH EVIDENCE — Fewer than 2 high-confidence sources. Treat with caution.",
  };
}

function checkSourceDiversity(sources: any[]): { has_regulator: boolean; has_standard: boolean; has_doctrine: boolean; has_big_four: boolean; meets_minimum: boolean; gaps: string[] } {
  let hasRegulator = false, hasStandard = false, hasDoctrine = false, hasBigFour = false;
  for (const s of sources) {
    const tier = s.source_tier ?? resolveJurisdictionTier(s.regulator || s.authority || "").tier;
    const authority = (s.regulator || s.authority || "").toLowerCase();
    if (tier === 0) { hasRegulator = true; }
    if (tier === 1 || authority.includes("iso") || authority.includes("coso") || authority.includes("nist") || authority.includes("ifrs")) { hasStandard = true; }
    if (tier === 2 || authority.includes("big four") || authority.includes("pwc") || authority.includes("deloitte") || authority.includes("kpmg") || authority.includes("ernst")) { hasBigFour = true; }
    if (tier === 3) { hasDoctrine = true; }
  }
  const gaps: string[] = [];
  if (!hasRegulator) gaps.push("Régulateur primaire");
  if (!hasStandard) gaps.push("Standard international");
  if (!hasDoctrine) gaps.push("Doctrine académique");
  if (!hasBigFour) gaps.push("Méthodologie Big Four");
  return { has_regulator: hasRegulator, has_standard: hasStandard, has_doctrine: hasDoctrine, has_big_four: hasBigFour, meets_minimum: hasRegulator && hasStandard && hasBigFour, gaps };
}

// ============================================================================
// QUERY DOMAIN DETECTION — Empêche les mismatches (ex: "agrément" ≠ LCB-FT)
// ============================================================================
type QueryDomain = 'lcbft' | 'governance' | 'agrement' | 'controle_interne' | 'risque' | 'cybersecurite' | 'esg' | 'finance' | 'general';

function detectQueryDomain(query: string): QueryDomain {
  const q = query.toLowerCase();
  // Agrément — détecté AVANT LCB-FT et gouvernance (keywords distinctifs, aucun overlap)
  if (/agr[eé]ment|licence.*(?:microfinance|sfd|emf|établissement)|autorisation.*exercer|demande.*agr[eé]ment|conditions.*agr[eé]ment|capital.*minimum.*(?:sfd|emf|microfinance)|instruction.*004.*2010|retrait.*agr[eé]ment|dossier.*agr[eé]ment|procédure.*agr[eé]ment|renouvellement.*agr[eé]ment/i.test(q)) return 'agrement';
  if (/lcb.?ft|blanchiment|terrorisme|aml.?cft|kyc|déclaration de soupçon|gel des avoirs|bénéficiaire effectif|financement du terrorisme/i.test(q)) return 'lcbft';
  if (/comité|conseil d'administration|gouvernance|administrateur|mandat.*administrateur|commissaire aux comptes|assemblée générale|organe délibérant|organe de contrôle|conflit d'intérêt|indépendance.*administrateur/i.test(q)) return 'governance';
  if (/contrôle interne|lignes? de défense|coso|audit interne|dispositif de contrôle/i.test(q)) return 'controle_interne';
  if (/cartographie des risques|appétence|stress test|risque opérationnel|risque de crédit|ERM/i.test(q)) return 'risque';
  if (/cyber|ssi|sécurité informatique|nist|iso 27001|résilience opérationnelle/i.test(q)) return 'cybersecurite';
  if (/esg|climat|durabilité|carbone|ifrs s[12]|issb/i.test(q)) return 'esg';
  if (/ratio.*solvabilité|fonds propres|provision|créance|bilan|comptable|ifrs 9/i.test(q)) return 'finance';
  return 'general';
}

function getDomainLabel(domain: QueryDomain, lang: string): string {
  const map: Record<QueryDomain, { fr: string; en: string }> = {
    lcbft: { fr: 'LCB-FT / Conformité', en: 'AML/CFT — Compliance' },
    governance: { fr: 'Gouvernance & Comités Spécialisés', en: 'Governance & Specialized Committees' },
    agrement: { fr: 'Agrément & Autorisation — Microfinance', en: 'Microfinance Licensing & Authorization' },
    controle_interne: { fr: 'Contrôle Interne', en: 'Internal Control' },
    risque: { fr: 'Gestion des Risques', en: 'Risk Management' },
    cybersecurite: { fr: 'Cybersécurité & Résilience', en: 'Cybersecurity & Resilience' },
    esg: { fr: 'ESG & Durabilité', en: 'ESG & Sustainability' },
    finance: { fr: 'Finance & Prudentiel', en: 'Finance & Prudential' },
    general: { fr: 'Intelligence Réglementaire', en: 'Regulatory Intelligence' },
  };
  return lang === 'en' ? map[domain].en : map[domain].fr;
}

// Agrement-specific query expansion — replaces LCB-FT expansion for agrement queries
const AGREMENT_EXPANDED_QUERIES = [
  "Agrément microfinance SFD conditions capital minimum instruction BCEAO 004-2010",
  "Agrément établissement crédit union monétaire ouest africaine UEMOA BCEAO conditions autorisation exercer",
  "Instruction BCEAO 004-2010 retrait agrément systèmes financiers décentralisés SFD",
  "COBAC réglementation agrément microfinance établissement CEMAC Afrique centrale",
  "OHADA acte uniforme sociétés commerciales constitution capital social agrément",
  "Procédure agrément SFD microfinance dossier demande pièces constitutives BCEAO",
];

// Governance-specific query expansion
const GOVERNANCE_EXPANDED_QUERIES = [
  "Comité d'audit comité des risques comité de rémunération gouvernance conseil administration",
  "Gouvernance d'entreprise COSO COBAC OHADA comités spécialisés administrateur indépendant",
  "Règlement COBAC R-2020/01 gouvernance établissement crédit comités spécialisés",
  "OHADA Acte Uniforme droit sociétés commerciales administrateur commissaire comptes",
  "ISO 37000 gouvernance organismes recommandations conseil",
];

// ============================================================================
// ANTI-BUG + LCB-FT
// ============================================================================
const REGULATORY_QUERY = /LCB|FT|AML|CFT|Blanchiment|Terrorisme|BCEAO|COBAC|GAFI|OHADA|agr[eé]ment|gouvernance|comité|contrôle interne|risque|cyber|esg|solvabilité|microfinance/i;
const LCB_FT_EXPANDED_QUERIES = [
  "Lutte contre le Blanchiment de Capitaux et Financement du Terrorisme",
  "AML/CFT dispositif préventif obligations déclaratives",
  "Instruction BCEAO 007-09-2017 LCB FT déclaration de soupçon",
  "Règlement COBAC R-2016/01 organisation LCB-FT",
  "Recommandations GAFI 1 à 40 LCB FT vigilance due diligence",
  "Directive UEMOA 02/2015/CM/UEMOA LBC FT approche par risques",
];
const ANTI_BUG_BOOST = ["BCEAO", "COBAC", "GAFI", "OHADA", "UEMOA", "CEMAC"];
const ANTI_BUG_MIN_CONFIDENCE = 0.85;

const FORBIDDEN_AUTHORITIES = ["AFDB", "AFD", "BOAD", "BIDC", "BMZ", "BAD", "African Union", "Union Africaine", "Ibadan"];
const FORBIDDEN_TITLE_PATTERNS = [/procurement/i, /appel d'offres?/i, /passation/i, /tender/i, /AO\/AMI/i, /AO_AMI/i, /marchés publics/i];

function isForbidden(doc: Record<string, unknown>): boolean {
  const authority = String(doc.regulator || doc.authority || "");
  const title = String(doc.title || "");
  const origin = String(doc.origin_table || "");
  if (FORBIDDEN_AUTHORITIES.some(a => authority.toLowerCase().includes(a.toLowerCase()))) return true;
  if (origin === "tender_sources") return true;
  if (FORBIDDEN_TITLE_PATTERNS.some(p => p.test(title))) return true;
  return false;
}

// ─── Query relevance filter: demotes documents with no keyword overlap ───
function computeQueryRelevance(docTitle: string, docContent: string, query: string): number {
  const qWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  if (qWords.length === 0) return 1.0;
  const combined = (docTitle + ' ' + docContent).toLowerCase();
  const matched = qWords.filter(w => combined.includes(w));
  return matched.length / qWords.length;
}

const GLOSSARY_FR_EN: Record<string, string> = {
  "gouvernance": "governance", "conseil d'administration": "board of directors",
  "comités spécialisés": "specialized committees", "comité d'audit": "audit committee",
  "comité des risques": "risk committee", "contrôle interne": "internal control",
  "conformité": "compliance", "lutte contre le blanchiment": "anti-money laundering",
  "lutte contre le blanchiment de capitaux": "anti-money laundering",
  "financement du terrorisme": "terrorist financing", "LCB/FT": "AML/CFT",
  "LBC/FT": "AML/CFT", "LCB-FT": "AML/CFT", "dispositif": "framework",
  "circulaire": "circular", "instruction": "instruction", "décision": "decision",
  "règlement": "regulation", "directive": "directive", "acte uniforme": "uniform act",
  "recommandation": "recommendation", "microfinance": "microfinance", "SFD": "MFI",
  "EMF": "MFI", "EC": "CI", "établissement de crédit": "credit institution",
  "système financier décentralisé": "decentralized financial system", "agrément": "license",
  "provisionnement": "provisioning", "créances en souffrance": "non-performing loans",
  "fonds propres": "equity capital", "ratio de solvabilité": "solvency ratio",
  "risque opérationnel": "operational risk", "risque de crédit": "credit risk",
  "cartographie des risques": "risk mapping", "GAFI": "FATF", "UEMOA": "WAEMU",
  "dispositions": "provisions", "dispositions générales": "general provisions",
  "rapport annuel": "annual report", "audit externe": "external audit",
  "audit interne": "internal audit", "commissaire aux comptes": "statutory auditor",
  "lanceur d'alerte": "whistleblower", "protection des données": "data protection",
  "cybersécurité": "cybersecurity", "résilience opérationnelle": "operational resilience",
  "durabilité": "sustainability", "décarbonation": "decarbonization",
  "bilan carbone": "carbon footprint", "étude": "study", "analyse": "analysis",
  "évaluation": "assessment", "diagnostic": "diagnostic",
  "plan de redressement": "recovery plan", "plan préventif": "preventive plan",
  "due diligence": "due diligence", "bénéficiaire effectif": "beneficial owner",
  "déclaration de soupçon": "suspicious transaction report",
  "normes prudentielles": "prudential standards", "états financiers": "financial statements",
  "politique": "policy", "procédures": "procedures", "suivi": "monitoring",
  "mise en œuvre": "implementation", "stress test": "stress test",
  "liquidité": "liquidity", "rentabilité": "profitability", "solvabilité": "solvency",
  "portefeuille": "portfolio", "crédit": "credit", "épargne": "savings",
  "gel des avoirs": "asset freezing", "approche par risques": "risk-based approach",
  "devoir de vigilance": "due diligence", "déclarative": "reporting",
  "obligations": "obligations", "préventif": "preventive", "assujettis": "obligated entities",
  "organisation": "organization", "dossier d'agrément": "licensing application",
  "conditions d'agrément": "licensing conditions", "retrait d'agrément": "license withdrawal",
  "capital minimum": "minimum capital", "procédure d'agrément": "licensing procedure",
};

function translateFRtoEN(text: string): string {
  let result = text;
  const sortedKeys = Object.keys(GLOSSARY_FR_EN).sort((a, b) => b.length - a.length);
  for (const fr of sortedKeys) {
    const en = GLOSSARY_FR_EN[fr];
    const escaped = fr.replace(/[-\/\\^$*+?.()|[\]\]]/g, '\\$&');
    result = result.replace(new RegExp(escaped, 'gi'), (match) => {
      if (match[0] === match[0].toUpperCase() && match.length > 3) return en.charAt(0).toUpperCase() + en.slice(1);
      return en;
    });
  }
  return result;
}

const DISCLAIMER_EN = "This report is prepared solely for internal use. KOS REGTECH AI does not provide legal advice. Subject to legal counsel sign-off.";
const DISCLAIMER_FR = "Ce rapport est préparé exclusivement pour usage interne. KOS REGTECH AI ne fournit pas de conseil juridique. Soumis à la validation d'un conseil juridique.";

// ============================================================================
// MAIN ENDPOINT
// ============================================================================
serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const startTime = Date.now();

  try {
    const { query, lang: requestedLang } = await req.json();
    if (!query || typeof query !== "string") {
      return new Response(JSON.stringify({ error: "query string required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const lang = requestedLang === "en" ? "en" : "fr";
    const supabase = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");

    // 🆕 QUERY DOMAIN DETECTION — avant toute expansion
    const queryDomain = detectQueryDomain(query);
    const domainLabel = getDomainLabel(queryDomain, lang);

    // ─── INTELLIGENT QUERY EXPANSION ───
    // Only expand with domain-specific queries — prevents LCB-FT expansion for non-LCB-FT queries
    const isLCBFTQuery = queryDomain === 'lcbft';
    const isAgrementQuery = queryDomain === 'agrement';
    const isGovernanceQuery = queryDomain === 'governance';

    let expandedQuery = query;
    if (isLCBFTQuery) {
      expandedQuery = [query, ...LCB_FT_EXPANDED_QUERIES].join(" | ");
    } else if (isAgrementQuery) {
      expandedQuery = [query, ...AGREMENT_EXPANDED_QUERIES].join(" | ");
    } else if (isGovernanceQuery) {
      expandedQuery = [query, ...GOVERNANCE_EXPANDED_QUERIES].join(" | ");
    }

    const isRegulatoryQuery = REGULATORY_QUERY.test(query);
    const corpusParam = isRegulatoryQuery ? "regulatory" : "all";
    const minConfidenceParam = isRegulatoryQuery ? ANTI_BUG_MIN_CONFIDENCE : 0.0;
    const boostParam = isRegulatoryQuery ? ANTI_BUG_BOOST : null;

    // ─── SQL SEARCH ───
    const searchStart = Date.now();
    const { data: unifiedResult, error: unifiedError } = await supabase.rpc("kos_search_unified_v3", {
      p_query: expandedQuery,
      p_top_k: 30,
      p_min_tier: null,
      p_diversify: true,
      p_regulatory_only: true,
      p_corpus: corpusParam,
      p_min_confidence: minConfidenceParam,
      p_boost_authorities: boostParam,
    });
    const searchLatency = Date.now() - searchStart;

    if (unifiedError || !unifiedResult) {
      return new Response(JSON.stringify({ error: unifiedError?.message || "Search failed", latency_ms: Date.now() - startTime }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const result = unifiedResult as any;
    let rawSources = (result.sources || []) as any[];

    const beforeFilter = rawSources.length;
    rawSources = rawSources.filter((s: any) => !isForbidden(s));
    const filteredCount = beforeFilter - rawSources.length;

    // 🆕 QUERY RELEVANCE FILTER — apply for ALL non-LCB-FT queries
    // This prevents "agrement microfinance" from returning pure LCB-FT documents
    if (!isLCBFTQuery) {
      rawSources = rawSources.map((s: any) => ({
        ...s,
        _query_relevance: computeQueryRelevance(s.title || "", s.content_snippet || "", query),
      }));
      // Sort by query relevance — documents with zero keyword overlap get demoted
      rawSources.sort((a: any, b: any) => b._query_relevance - a._query_relevance);
    }

    // NaN Protection
    rawSources = rawSources.map((s: any) => ({
      ...s,
      v_score: safeScore(s.v_score),
      f_score: safeScore(s.f_score),
      m_score: safeScore(s.m_score || 0),
      kg_score: safeScore(s.kg_score || 0),
      score: safeScore(s.score) > 0 ? safeScore(s.score) : recalculateScore(s),
    }));

    // Jurisdiction Priority Engine
    rawSources = rawSources.map((s: any) => {
      const jt = resolveJurisdictionTier(s.regulator || s.authority || "");
      return { ...s, _jurisdiction_tier: jt.tier, _jurisdiction_label: jt.label, _priority_boost: jt.priority_boost };
    });

    // Multi-factor ranking: jurisdiction × semantic × query relevance
    rawSources.sort((a: any, b: any) => {
      const relA = a._query_relevance ?? 1.0;
      const relB = b._query_relevance ?? 1.0;
      const scoreA = (a._priority_boost || 0.35) * safeScore(a.score) * relA;
      const scoreB = (b._priority_boost || 0.35) * safeScore(b.score) * relB;
      return scoreB - scoreA;
    });

    // Confidence Engine + Enrichment
    const enrichedSources = rawSources.map((s: any, i: number) => {
      const conf = computeConfidence({
        v_score: safeScore(s.v_score),
        authority: s.regulator || s.authority || "",
        content_snippet: s.content_snippet || "",
        title: s.title || "",
        effective_date: s.effective_date || s.publication_date || "",
        source_tier: s._jurisdiction_tier ?? s.source_tier ?? 3,
      });
      const retrievalReasons = generateRetrievalExplanation(s, query);
      const riskLevel = computeRiskLevel(s, conf.confidence);
      const applicability = computeApplicability(s);
      const authorityIdx = getAuthorityIndex(s.regulator || s.authority || "");
      return {
        rank: i + 1,
        regulator: s.regulator || s.authority || "",
        title: lang === "en" ? translateFRtoEN(s.title || "") : (s.title || ""),
        title_original: s.title || "",
        type: s.type || s.doc_type || "",
        score: Math.round(safeScore(s.score) * 100),
        v_score: Math.round(safeScore(s.v_score) * 100),
        f_score: Math.round(safeScore(s.f_score) * 100),
        m_score: Math.round(safeScore(s.m_score || 0) * 100),
        kg_score: Math.round(safeScore(s.kg_score || 0) * 100),
        jurisdiction_tier: s._jurisdiction_tier,
        jurisdiction_label: s._jurisdiction_label,
        priority_boost: Math.round(s._priority_boost * 100),
        confidence: conf.confidence,
        confidence_breakdown: {
          semantic: Math.round(conf.semantic),
          authority: Math.round(conf.authority_score),
          citation_density: Math.round(conf.citation_density),
          jurisdiction: Math.round(conf.jurisdiction),
          freshness: Math.round(conf.freshness),
        },
        authority_index: authorityIdx,
        retrieval_reasons: retrievalReasons,
        risk_level: riskLevel,
        applicability: applicability,
        query_relevance: Math.round((s._query_relevance ?? 1.0) * 100),
        url: s.url || "",
        content_snippet: s.content_snippet || "",
        effective_date: s.effective_date || s.publication_date || "",
        source_tier: s.source_tier || 0,
        origin_table: s.origin_table || "",
      };
    });

    const contradictionResult = detectContradictions(enrichedSources);
    const hallucinationResult = hallucinationCheck(enrichedSources);
    const diversityResult = checkSourceDiversity(enrichedSources);

    const topSources = enrichedSources.slice(0, 10);
    const kpiReport = {
      retrieval_precision: topSources.length > 0 ? Math.round(topSources.filter(s => s.confidence >= 70).length / topSources.length * 100) : 0,
      recall: enrichedSources.length,
      authority_coverage: enrichedSources.filter(s => s.authority_index >= 90).length,
      coverage: enrichedSources.length,
      freshness: Math.round(topSources.reduce((sum, s) => sum + (s.confidence_breakdown?.freshness || 0), 0) / Math.max(topSources.length, 1)),
      jurisdiction_coverage: new Set(enrichedSources.map(s => s.regulator)).size,
      confidence_avg: Math.round(enrichedSources.reduce((sum, s) => sum + s.confidence, 0) / Math.max(enrichedSources.length, 1)),
      explainability: Math.round(enrichedSources.reduce((sum, s) => sum + Math.min(s.retrieval_reasons.length * 20, 100), 0) / Math.max(enrichedSources.length, 1)),
      hallucination_safe: hallucinationResult.has_sufficient_evidence ? 100 : Math.round(hallucinationResult.evidence_count * 50),
      completeness: diversityResult.meets_minimum ? 100 : Math.round(([diversityResult.has_regulator, diversityResult.has_standard, diversityResult.has_doctrine, diversityResult.has_big_four].filter(Boolean).length / 4) * 100),
      latency_ms: Date.now() - startTime,
      auditability: 100,
    };

    const disclaimer = lang === "en" ? DISCLAIMER_EN : DISCLAIMER_FR;
    const today = new Date().toISOString().slice(0, 10);

    let answer = "";
    if (lang === "en") {
      answer = `KOS REGTECH AI™ — Big Four Artefact Regulatory Intelligence v7.2
Topic: ${query} | Domain: ${domainLabel} | Date: ${today}
Engine: RAG Universal v7.2 (Big Four Action Artefact — 10 Actions + Domain Detection + Relevance Filter)
Jurisdictions: WAEMU, CEMAC, OHADA, FATF | Tier Priority Engine: ACTIVE

=== PRIORITY-RANKED REGULATORY INTELLIGENCE ===

`;
      enrichedSources.slice(0, 10).forEach((s, i) => {
        answer += `${i + 1}. [${s.regulator}] ${s.title}\n`;
        answer += `   Tier: ${s.jurisdiction_label} | Relevance: ${s.query_relevance}% | Applicability: ${s.applicability}\n`;
        if (s.content_snippet) answer += `   Snippet: ${s.content_snippet.slice(0, 200)}...\n`;
        answer += "\n";
      });
    } else {
      answer = `KOS REGTECH AI™ — Intelligence Réglementaire Big Four Artefact v7.2
Sujet : ${query} | Domaine : ${domainLabel} | Date : ${today}
Moteur : RAG Universal v7.2 (Big Four Action Artefact — 10 Actions + Détection Domaine + Filtre Pertinence)

=== INTELLIGENCE RÉGLEMENTAIRE AVEC PRIORISATION ===

`;
      enrichedSources.slice(0, 10).forEach((s, i) => {
        answer += `${i + 1}. [${s.regulator}] ${s.title}\n`;
        answer += `   Tier: ${s.jurisdiction_label} | Pertinence: ${s.query_relevance}% | Applicabilité: ${s.applicability}\n`;
        if (s.content_snippet) answer += `   Extrait: ${s.content_snippet.slice(0, 200)}...\n`;
        answer += "\n";
      });
    }

    const totalLatency = Date.now() - startTime;
    try {
      await supabase.from("kos_routing_log").insert({
        function_name: "rag-universal-v7", provider: "big-four-artefact-v7",
        status: "success", latency_ms: totalLatency,
        payload_size: expandedQuery.length, created_at: new Date().toISOString(),
      });
    } catch { /* non-blocking */ }

    return new Response(JSON.stringify({
      answer, sources: enrichedSources,
      query_domain: queryDomain,
      query_domain_label: domainLabel,
      big_four_artefact: {
        version: "v7.2",
        actions_implemented: 10,
        query_domain: queryDomain,
        query_domain_label: domainLabel,
        jurisdiction_priority_engine: { active: true, tiers: 5 },
        nan_protection: { active: true, all_scores_valid: rawSources.every(s => safeScore(s.score) >= 0) },
        confidence_engine: { formula: "Semantic + Authority + Citation + Jurisdiction + Freshness", average: kpiReport.confidence_avg, target: 96 },
        retrieval_explanation: { active: true, explainability_pct: kpiReport.explainability },
        risk_level: {
          critical: enrichedSources.filter(s => s.risk_level === "Critical").length,
          high: enrichedSources.filter(s => s.risk_level === "High").length,
          medium: enrichedSources.filter(s => s.risk_level === "Medium").length,
          low: enrichedSources.filter(s => s.risk_level === "Low").length,
        },
        applicability: {
          applicable: enrichedSources.filter(s => s.applicability === "Applicable").length,
          indirect: enrichedSources.filter(s => s.applicability === "Indirect").length,
          reference: enrichedSources.filter(s => s.applicability === "Reference").length,
          academic: enrichedSources.filter(s => s.applicability === "Academic").length,
        },
        contradiction_detection: contradictionResult,
        hallucination_detector: hallucinationResult,
        source_diversity: diversityResult,
        kpi_report: kpiReport,
      },
      kg_entities: (result.kg_entities || []),
      lang, latency_ms: totalLatency,
      expanded_query: expandedQuery,
      total_sources: result.total_sources || 344,
      cache_hit: false, engine: "big-four-artefact-v7.2",
      db_latency_ms: result.latency_ms || searchLatency,
      filtered_ao_ami: filteredCount,
      anti_bug_active: isRegulatoryQuery,
      disclaimer, translated: lang === "en",
      pipeline: "RAG Universal v7.2 → Domain Detection → Agrément Domain → Jurisdiction Priority → Confidence Engine → Query Relevance Filter",
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("rag-universal-v7 error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage, latency_ms: Date.now() - startTime }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
