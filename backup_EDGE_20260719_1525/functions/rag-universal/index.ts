import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ═══════════════════════════════════════════════════════════════════════════
// KOS REGTECH AI™ — RAG UNIVERSAL CONSOLIDATED v3→v9
// Paramètre "version" pour router. v9 par défaut (toutes les features).
// Remplace rag-universal-v3, v4, v5, v6, v7, v8, v9
// ═══════════════════════════════════════════════════════════════════════════

type Version = "v3" | "v4" | "v5" | "v6" | "v7" | "v8" | "v9";
type QueryDomain = 'lcbft' | 'governance' | 'agrement' | 'controle_interne' | 'risque' | 'cybersecurite' | 'esg' | 'finance' | 'general';

function safeScore(score: unknown): number {
  if (score === null || score === undefined) return 0.00;
  const n = Number(score);
  return (isNaN(n) || !isFinite(n)) ? 0.00 : Math.max(n, 0.00);
}

function recalculateScore(s: any): number {
  return safeScore(s.v_score) * 0.25 + safeScore(s.f_score) * 0.55 + safeScore(s.m_score || 0) * 0.15 + safeScore(s.kg_score || 0) * 0.05;
}

const GLOSSARY_FR_EN: Record<string, string> = {
  "gouvernance": "governance", "conseil d'administration": "board of directors",
  "comités spécialisés": "specialized committees", "comité d'audit": "audit committee",
  "contrôle interne": "internal control", "conformité": "compliance",
  "lutte contre le blanchiment": "anti-money laundering", "LCB/FT": "AML/CFT",
  "agrément": "license", "microfinance": "microfinance", "SFD": "MFI",
  "GAFI": "FATF", "UEMOA": "WAEMU", "instruction": "instruction",
  "règlement": "regulation", "directive": "directive", "acte uniforme": "uniform act",
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

const JURISDICTION_TIERS: Record<string, { tier: number; label: string; priority_boost: number }> = {
  "BCEAO": { tier: 0, label: "Tier 0 — Régulateur Primaire", priority_boost: 1.00 },
  "COBAC": { tier: 0, label: "Tier 0 — Régulateur Primaire", priority_boost: 0.98 },
  "GAFI": { tier: 0, label: "Tier 0 — Standard International", priority_boost: 0.99 },
  "FATF": { tier: 0, label: "Tier 0 — Standard International", priority_boost: 0.99 },
  "UEMOA": { tier: 0, label: "Tier 0 — Régulateur Primaire", priority_boost: 0.98 },
  "OHADA": { tier: 0, label: "Tier 0 — Régulateur Primaire", priority_boost: 0.97 },
  "CEMAC": { tier: 0, label: "Tier 0 — Régulateur Primaire", priority_boost: 0.97 },
  "BEAC": { tier: 0, label: "Tier 0 — Régulateur Primaire", priority_boost: 0.96 },
  "ISO": { tier: 1, label: "Tier 1 — Standard International", priority_boost: 0.93 },
  "COSO": { tier: 1, label: "Tier 1 — Standard International", priority_boost: 0.92 },
  "NIST": { tier: 1, label: "Tier 1 — Standard International", priority_boost: 0.91 },
  "IFRS": { tier: 1, label: "Tier 1 — Standard International", priority_boost: 0.90 },
  "PwC": { tier: 2, label: "Tier 2 — Big Four", priority_boost: 0.75 },
  "Deloitte": { tier: 2, label: "Tier 2 — Big Four", priority_boost: 0.74 },
  "EY": { tier: 2, label: "Tier 2 — Big Four", priority_boost: 0.73 },
  "KPMG": { tier: 2, label: "Tier 2 — Big Four", priority_boost: 0.72 },
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
  "ISO": 93, "COSO": 92, "NIST": 91, "IFRS": 90, "BCBS": 88,
  "PwC": 90, "Deloitte": 90, "EY": 89, "KPMG": 89,
};

function getAuthorityIndex(authority: string): number {
  if (AUTHORITY_INDEX[authority]) return AUTHORITY_INDEX[authority];
  for (const [key, val] of Object.entries(AUTHORITY_INDEX)) {
    if (authority.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return 55;
}

const DOMAIN_KEYWORDS: Record<QueryDomain, RegExp> = {
  agrement: /agr[eé]ment|licence.*(?:microfinance|sfd|emf)|autorisation.*exercer|demande.*agr[eé]ment|instruction.*004.*2010|retrait.*agr[eé]ment/i,
  gouvernance: /comit[eé]|conseil d'administration|gouvernance|administrateur|commissaire aux comptes|assembl[eé]e g[eé]n[eé]rale|ind[eé]pendance.*administrateur/i,
  lcbft: /lcb.?ft|blanchiment|terrorisme|aml.?cft|kyc|d[eé]claration de soup[cç]on|gel des avoirs|b[eé]n[eé]ficiaire effectif/i,
  controle_interne: /contr[oô]le(?:\s+interne)?|lignes? de d[eé]fense|coso|audit interne/i,
  risque: /cartographie des risques|app[eé]tence|stress test|risque op[eé]rationnel|risque de cr[eé]dit|ERM/i,
  cybersecurite: /cyber|ssi|s[eé]curit[eé] informatique|nist|iso 27001|r[eé]silience op[eé]rationnelle/i,
  esg: /esg|climat|durabilit[eé]|carbone|ifrs s[12]|issb/i,
  finance: /ratio.*solvabilit[eé]|fonds propres|provision|cr[eé]ance|bilan|comptable|ifrs 9/i,
  general: /.*/,
};

const DOMAIN_ORDER: QueryDomain[] = ['agrement', 'lcbft', 'gouvernance', 'controle_interne', 'risque', 'cybersecurite', 'esg', 'finance', 'general'];

function normalizeQuery(q: string): string {
  return q.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function detectQueryDomain(query: string): QueryDomain {
  const q = normalizeQuery(query);
  for (const domain of DOMAIN_ORDER) {
    if (domain === 'general') return 'general';
    if (DOMAIN_KEYWORDS[domain].test(q)) return domain;
  }
  return 'general';
}

function computeDocumentDomain(title: string, content: string): QueryDomain {
  const combined = ((title || '') + ' ' + (content || '')).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (DOMAIN_KEYWORDS.agrement.test(combined)) return 'agrement';
  for (const domain of [...DOMAIN_ORDER].filter(d => d !== 'agrement' && d !== 'general')) {
    if (DOMAIN_KEYWORDS[domain].test(combined)) return domain;
  }
  return 'general';
}

function getDomainLabel(domain: QueryDomain, lang: string): string {
  const map: Record<QueryDomain, { fr: string; en: string }> = {
    lcbft: { fr: 'LCB-FT / Conformité', en: 'AML/CFT — Compliance' },
    governance: { fr: 'Gouvernance & Comités', en: 'Governance & Committees' },
    agrement: { fr: 'Agrément — Microfinance', en: 'Microfinance Licensing' },
    controle_interne: { fr: 'Contrôle Interne', en: 'Internal Control' },
    risque: { fr: 'Gestion des Risques', en: 'Risk Management' },
    cybersecurite: { fr: 'Cybersécurité', en: 'Cybersecurity' },
    esg: { fr: 'ESG & Durabilité', en: 'ESG & Sustainability' },
    finance: { fr: 'Finance & Prudentiel', en: 'Finance & Prudential' },
    general: { fr: 'Intelligence Réglementaire', en: 'Regulatory Intelligence' },
  };
  return lang === 'en' ? map[domain].en : map[domain].fr;
}

interface ConfidenceInput {
  v_score: number; authority: string; content_snippet: string;
  title: string; effective_date: string; source_tier: number;
}

function computeConfidence(input: ConfidenceInput) {
  const semantic = Math.min(input.v_score * 25, 25);
  const authority_score = Math.min(getAuthorityIndex(input.authority) * 0.25, 25);
  const text = (input.content_snippet || "") + " " + (input.title || "");
  const citations = (text.match(/Art\.|Article|§|R\.\d|Instruction n°/gi) || []).length;
  const citation_density = Math.min(citations * 5, 20);
  const jurisdiction = Math.min(input.source_tier <= 1 ? 15 : input.source_tier === 2 ? 10 : 5, 15);
  const now = new Date();
  let freshness = 5;
  if (input.effective_date) {
    const ageYears = (now.getTime() - new Date(input.effective_date).getTime()) / (365.25 * 24 * 3600 * 1000);
    freshness = Math.max(0, Math.min(15 - ageYears * 0.75, 15));
  }
  return { confidence: Math.min(Math.round(semantic + authority_score + citation_density + jurisdiction + freshness), 99), semantic, authority_score, citation_density, jurisdiction, freshness };
}

function computeQueryRelevance(docTitle: string, docContent: string, query: string): number {
  const qWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  if (qWords.length === 0) return 1.0;
  const combined = (docTitle + ' ' + docContent).toLowerCase();
  const matched = qWords.filter(w => combined.includes(w));
  return matched.length / qWords.length;
}

const COBAC_RERANKER_REGEX = /cobac|comit[eé] d'?audit|conseil d'?administration|administrateur(?:s)? ind[eé]pendant|commissaire aux comptes|r-2020|co-2024|gouvernance|contr[oô]le interne|coso/i;
const COBAC_AUTHORITIES = ['cobac', 'bceao', 'uemoa', 'ohada', 'cemac'];
const LCBFT_PENALTY = ['blanchiment', 'terrorisme', 'lcb', 'kyc', 'soupçon', 'gel des avoirs', 'beneficiaire effectif', 'gafi', 'fatf', 'tracfin', 'giaba', 'centif'];

function isCobacAuditQuery(query: string): boolean {
  return COBAC_RERANKER_REGEX.test(normalizeQuery(query));
}

function rerankCobac(sources: any[]): any[] {
  return sources.map((s: any) => {
    const title = ((s.title || '') + ' ' + (s.content_snippet || '')).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const authority = (s.regulator || s.authority || '').toLowerCase();
    const origin = (s.origin_table || '').toLowerCase();
    let boost = 1.0;
    if (COBAC_AUTHORITIES.some(a => authority.includes(a))) boost *= 5.0;
    if (/r-?2020|co-?2024|instruction.*004|coso/i.test(title)) boost *= 2.0;
    if (LCBFT_PENALTY.some(kw => title.includes(kw)) && !COBAC_AUTHORITIES.some(a => authority.includes(a))) boost *= 0.1;
    if (origin === 'tender_sources' || /appel d'offre|ao\/ami|passation/i.test(title)) boost *= 0.01;
    return { ...s, score: (s.score || 0) * boost, _cobac_boost: Math.round(boost * 100) / 100 };
  });
}

function extractArticles(sources: any[]): string[] {
  const articles: Set<string> = new Set();
  for (const s of sources) {
    const text = ((s.title || '') + ' ' + (s.content_snippet || ''));
    const matches = text.match(/(?:Art\.|Article)\s*(R?-?\s*\d{4}[\/-]?\d{2,4}|[A-Z]{2}-\d{4}[\/-]?\d{2,3}|\d+)/gi);
    if (matches) matches.forEach(m => articles.add(m.trim()));
  }
  return Array.from(articles).slice(0, 10);
}

function generateMcKinseyMemo(sources: any[], queryDomain: QueryDomain, domainLabel: string, lang: string): any | null {
  if (queryDomain !== 'governance' && queryDomain !== 'controle_interne' && queryDomain !== 'risque') return null;
  const articles = extractArticles(sources);
  const highRiskCount = sources.filter((s: any) => (s.v_score || 0) > 0.7 || (s.f_score || 0) > 0.6).length;
  const riskLevel = highRiskCount >= 5 ? 'CRITICAL' : highRiskCount >= 3 ? 'HIGH' : highRiskCount >= 1 ? 'MODERATE' : 'LOW';
  const hasIndependants = sources.some((s: any) => /ind[eé]pendant/i.test((s.title || '') + (s.content_snippet || '')));
  const hasCharte = sources.some((s: any) => /charte|charter/i.test((s.title || '') + (s.content_snippet || '')));
  const gaps: string[] = [];
  if (!hasIndependants) gaps.push('Administrateurs indépendants');
  if (!hasCharte) gaps.push('Charte comité');

  if (lang === 'en') {
    return {
      insight: `Based on ${sources.length} regulatory sources, your framework shows ${gaps.length > 0 ? `${gaps.length} gap(s): ${gaps.join(', ')}` : 'good alignment'} with ${domainLabel}.`,
      so_what: riskLevel === 'CRITICAL' || riskLevel === 'HIGH' ? 'Significant regulatory risk exposure with potential enforcement action.' : 'Alignment is adequate but regulatory expectations are rising.',
      now_what: `1) Immediate: ${gaps.length > 0 ? `Address gaps within 30 days.` : 'Document evidence trail.'} 2) 90-Day: Commission independent audit. 3) Strategic: Book 15-min with KHEPRA EXPERTS.`,
      risk_level: riskLevel, articles_cites: articles,
    };
  }
  return {
    insight: `D'après ${sources.length} sources, votre dispositif présente ${gaps.length > 0 ? `${gaps.length} lacune(s): ${gaps.join(', ')}` : 'un bon alignement'} avec ${domainLabel}.`,
    so_what: riskLevel === 'CRITICAL' || riskLevel === 'HIGH' ? 'Risque réglementaire significatif avec possibles mesures coercitives.' : 'Alignement correct mais attentes réglementaires en hausse.',
    now_what: `1) Immédiat : ${gaps.length > 0 ? `Combler lacunes sous 30 jours.` : 'Documenter traçabilité.'} 2) 90 jours : Commander audit indépendant. 3) Stratégique : Réserver 15min avec KHEPRA EXPERTS.`,
    risk_level: riskLevel, articles_cites: articles,
  };
}

const ENFORCE_DOMAIN_LOCK = true;
const MIN_DOMAIN_MATCH_RATIO = 0.80;

function validateDomainLock(queryDomain: QueryDomain, sources: Array<{ title: string; content_snippet: string }>, lang: string) {
  const domainCounts: Record<string, number> = {};
  let matchingSources = 0;
  for (const src of sources) {
    const docDomain = computeDocumentDomain(src.title || '', src.content_snippet || '');
    domainCounts[docDomain] = (domainCounts[docDomain] || 0) + 1;
    if (docDomain === queryDomain) matchingSources++;
  }
  const totalSources = sources.length;
  const matchRatio = totalSources > 0 ? matchingSources / totalSources : 0;
  const isGeneralQuery = queryDomain === 'general';
  const verdict = isGeneralQuery ? 'PASS' : matchRatio >= MIN_DOMAIN_MATCH_RATIO ? 'PASS' : matchRatio >= 0.50 ? 'WARNING' : 'FAIL';
  return { query_domain: queryDomain, query_domain_label: getDomainLabel(queryDomain, lang), match_ratio: Math.round(matchRatio * 10000) / 10000, matching_sources: matchingSources, total_sources: totalSources, verdict, threshold: MIN_DOMAIN_MATCH_RATIO, domain_counts: domainCounts, locked: ENFORCE_DOMAIN_LOCK, is_general_query: isGeneralQuery };
}

const LCB_FT_EXPANDED = ["Lutte contre le Blanchiment de Capitaux et Financement du Terrorisme", "AML/CFT dispositif préventif obligations déclaratives", "Instruction BCEAO 007-09-2017 LCB FT déclaration de soupçon", "Règlement COBAC R-2016/01 organisation LCB-FT", "Recommandations GAFI 1 à 40 LCB FT vigilance due diligence"];
const AGREMENT_EXPANDED = ["Agrément microfinance SFD conditions capital minimum instruction BCEAO 004-2010", "Agrément établissement crédit union monétaire ouest africaine UEMOA BCEAO", "COBAC réglementation agrément microfinance établissement CEMAC Afrique centrale"];
const GOVERNANCE_EXPANDED = ["Comité d'audit comité des risques gouvernance conseil administration", "Gouvernance d'entreprise COSO COBAC OHADA comités spécialisés administrateur indépendant", "Règlement COBAC R-2020/01 gouvernance établissement crédit", "COBAC CO-2024-02 comité audit réunions obligation transmission"];

const AUDIT_COMMITTEE_CORE = [/comit[eé]\s+d['']\s*audit/i, /administrateurs?\s+ind[eé]pendants?/i, /circulaire\s+(01|03)[- ]2017/i, /gouvernance\s+bancaire/i];

function detectAuditCommitteeQuery(query: string): boolean {
  const normQ = normalizeQuery(query);
  let hits = 0;
  for (const p of AUDIT_COMMITTEE_CORE) { if (p.test(normQ)) hits++; }
  return hits >= 2;
}

function extractKeyArticle(content: string): string {
  if (!content) return "Obligation générale";
  const m = /(Art\.\s*\d+[^,\n]*?)(?:,|\n|$)/i.exec(content);
  return m ? m[1].trim() : "Obligation générale";
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const startTime = Date.now();

  try {
    const body = await req.json();
    const { query, lang: requestedLang, version: requestedVersion } = body;
    if (!query || typeof query !== "string") {
      return new Response(JSON.stringify({ error: "query string required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const lang = requestedLang === "en" ? "en" : "fr";
    const version: Version = (requestedVersion && ["v3","v4","v5","v6","v7","v8","v9"].includes(requestedVersion)) ? requestedVersion as Version : "v9";
    const supabase = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");
    const vNum = parseInt(version.slice(1));

    const queryDomain = vNum >= 7 ? detectQueryDomain(query) : 'general';
    const domainLabel = getDomainLabel(queryDomain, lang);

    let expandedQuery = query;
    if (queryDomain === 'lcbft') expandedQuery = [query, ...LCB_FT_EXPANDED].join(" | ");
    else if (queryDomain === 'agrement') expandedQuery = [query, ...AGREMENT_EXPANDED].join(" | ");
    else if (queryDomain === 'governance') expandedQuery = [query, ...GOVERNANCE_EXPANDED].join(" | ");

    const searchStart = Date.now();
    const { data: unifiedResult, error: unifiedError } = await supabase.rpc("kos_search_unified_v3", {
      p_query: expandedQuery, p_top_k: 20, p_min_tier: null, p_diversify: true,
      p_regulatory_only: true, p_corpus: "regulatory", p_min_confidence: 0.0, p_boost_authorities: null,
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

    let domainValidation: any = null;
    if (vNum >= 8) {
      rawSources = rawSources.map((s: any) => ({ ...s, _doc_domain: computeDocumentDomain(s.title || '', s.content_snippet || '') }));
      domainValidation = validateDomainLock(queryDomain, rawSources, lang);
      if (domainValidation.verdict === 'FAIL' && !domainValidation.is_general_query) {
        return new Response(JSON.stringify({
          error: `DOMAIN_LOCK_REJECTED: "${domainLabel}" mismatch.`,
          domain_lock: domainValidation,
          latency_ms: Date.now() - startTime,
        }), { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    if (vNum >= 9 && isCobacAuditQuery(query)) rawSources = rerankCobac(rawSources);

    if (vNum >= 7 && queryDomain !== 'lcbft') {
      rawSources = rawSources.map((s: any) => ({ ...s, _query_relevance: computeQueryRelevance(s.title || "", s.content_snippet || "", query) }));
      rawSources.sort((a: any, b: any) => (b._query_relevance || 0) - (a._query_relevance || 0));
    }

    rawSources = rawSources.map((s: any) => ({
      ...s, v_score: safeScore(s.v_score), f_score: safeScore(s.f_score),
      m_score: safeScore(s.m_score || 0), kg_score: safeScore(s.kg_score || 0),
      score: safeScore(s.score) > 0 ? safeScore(s.score) : recalculateScore(s),
    }));

    if (vNum >= 7) {
      rawSources = rawSources.map((s: any) => {
        const jt = resolveJurisdictionTier(s.regulator || s.authority || "");
        return { ...s, _jurisdiction_tier: jt.tier, _jurisdiction_label: jt.label, _priority_boost: jt.priority_boost };
      });
    }

    rawSources.sort((a: any, b: any) => {
      const isGeneral = queryDomain === 'general';
      const domainBoostA = vNum >= 7 ? (isGeneral ? (a._doc_domain !== 'general' ? 1.5 : 1.0) : (a._doc_domain === queryDomain ? 1.5 : 1.0)) : 1.0;
      const domainBoostB = vNum >= 7 ? (isGeneral ? (b._doc_domain !== 'general' ? 1.5 : 1.0) : (b._doc_domain === queryDomain ? 1.5 : 1.0)) : 1.0;
      const relA = a._query_relevance ?? 1.0;
      const relB = b._query_relevance ?? 1.0;
      return (domainBoostB * (b._priority_boost || 0.35) * safeScore(b.score) * relB) - (domainBoostA * (a._priority_boost || 0.35) * safeScore(a.score) * relA);
    });

    const enrichedSources = rawSources.map((s: any, i: number) => {
      const conf = vNum >= 7 ? computeConfidence({
        v_score: safeScore(s.v_score), authority: s.regulator || s.authority || "",
        content_snippet: s.content_snippet || "", title: s.title || "",
        effective_date: s.effective_date || s.publication_date || "", source_tier: s._jurisdiction_tier ?? s.source_tier ?? 3,
      }) : { confidence: Math.round(safeScore(s.score) * 100), semantic: 0, authority_score: 0, citation_density: 0, jurisdiction: 0, freshness: 0 };
      return {
        rank: i + 1, regulator: s.regulator || s.authority || "",
        title: lang === "en" ? translateFRtoEN(s.title || "") : (s.title || ""),
        title_original: s.title || "", type: s.type || s.doc_type || "",
        doc_domain: s._doc_domain || 'general',
        doc_domain_match: (s._doc_domain || 'general') === queryDomain || queryDomain === 'general',
        score: Math.round(safeScore(s.score) * 100), v_score: Math.round(safeScore(s.v_score) * 100),
        f_score: Math.round(safeScore(s.f_score) * 100),
        confidence: conf.confidence,
        confidence_breakdown: { semantic: Math.round(conf.semantic), authority: Math.round(conf.authority_score), citation_density: Math.round(conf.citation_density), jurisdiction: Math.round(conf.jurisdiction), freshness: Math.round(conf.freshness) },
        authority_index: getAuthorityIndex(s.regulator || s.authority || ""),
        risk_level: conf.confidence >= 90 ? "Critical" : conf.confidence >= 75 ? "High" : conf.confidence >= 50 ? "Medium" : "Low",
        applicability: (s._jurisdiction_tier ?? 3) <= 1 ? "Applicable" : (s._jurisdiction_tier ?? 3) === 2 ? "Indirect" : "Reference",
        query_relevance: Math.round((s._query_relevance ?? 1.0) * 100),
        url: s.url || "", content_snippet: (s.content_snippet || "").slice(0, 300),
        effective_date: s.effective_date || s.publication_date || "",
        source_tier: s.source_tier || 0, origin_table: s.origin_table || "",
        jurisdiction_tier: s._jurisdiction_tier, jurisdiction_label: s._jurisdiction_label,
        priority_boost: Math.round((s._priority_boost || 0.35) * 100),
        cobac_reranker_active: s._cobac_boost !== undefined && s._cobac_boost > 1,
        cobac_boost: s._cobac_boost,
        key_article: extractKeyArticle(s.content_snippet || s.title || ""),
      };
    });

    const mckinseyMemo = vNum >= 9 ? generateMcKinseyMemo(enrichedSources, queryDomain, domainLabel, lang) : null;
    const disclaimer = lang === "en" ? "KOS REGTECH AI does not provide legal advice." : "KOS REGTECH AI ne fournit pas de conseil juridique.";
    const today = new Date().toISOString().slice(0, 10);
    const isAuditCommittee = detectAuditCommitteeQuery(query);

    let answer = "";
    if (lang === "en") {
      answer = `KOS REGTECH AI™ — RAG Universal ${version} | ${domainLabel}\n${today} | Query: "${query}"\n\n`;
      if (mckinseyMemo) answer += `=== MCKINSEY MEMO (Risk: ${mckinseyMemo.risk_level}) ===\n${mckinseyMemo.insight}\n\n${mckinseyMemo.so_what}\n\n${mckinseyMemo.now_what}\n\nArticles: ${mckinseyMemo.articles_cites.join(', ') || 'See below'}\n\n=== SOURCES ===\n\n`;
      if (isAuditCommittee && vNum <= 5) answer += `[BOARD MEMO — AUDIT COMMITTEE CRITICAL OBLIGATIONS]\n\n`;
      enrichedSources.slice(0, 10).forEach((s, i) => {
        const cobacTag = s.cobac_reranker_active ? ' COBAC' : '';
        answer += `${i + 1}. [${s.regulator}]${cobacTag} ${s.title} (${s.confidence}%)\n   Art: ${s.key_article} | Tier: ${s.jurisdiction_tier} | Domain: ${s.doc_domain}\n\n`;
      });
    } else {
      answer = `KOS REGTECH AI™ — RAG Universal ${version} | ${domainLabel}\n${today} | Requête : "${query}"\n\n`;
      if (mckinseyMemo) {
        const riskFr = mckinseyMemo.risk_level === 'CRITICAL' ? 'CRITIQUE' : mckinseyMemo.risk_level === 'HIGH' ? 'ÉLEVÉ' : mckinseyMemo.risk_level === 'MODERATE' ? 'MODÉRÉ' : 'FAIBLE';
        answer += `=== NOTE McKINSEY (Risque: ${riskFr}) ===\n${mckinseyMemo.insight}\n\n${mckinseyMemo.so_what}\n\n${mckinseyMemo.now_what}\n\nArticles: ${mckinseyMemo.articles_cites.join(', ') || 'Voir ci-dessous'}\n\n=== SOURCES ===\n\n`;
      }
      if (isAuditCommittee && vNum <= 5) answer += `[MÉMO BOARD — OBLIGATIONS CRITIQUES COMITÉ D'AUDIT]\n\n`;
      enrichedSources.slice(0, 10).forEach((s, i) => {
        const cobacTag = s.cobac_reranker_active ? ' COBAC' : '';
        answer += `${i + 1}. [${s.regulator}]${cobacTag} ${s.title} (${s.confidence}%)\n   Art: ${s.key_article} | Tier: ${s.jurisdiction_tier} | Domaine: ${s.doc_domain}\n\n`;
      });
    }

    const totalLatency = Date.now() - startTime;
    try {
      await supabase.from("kos_routing_log").insert({
        function_name: "rag-universal", provider: `rag-universal-${version}`,
        status: "success", latency_ms: totalLatency, payload_size: expandedQuery.length, created_at: new Date().toISOString(),
      });
    } catch { /* non-blocking */ }

    return new Response(JSON.stringify({
      answer, sources: enrichedSources,
      version, version_features: {
        domain_detection: vNum >= 7, cobac_reranker: vNum >= 9,
        mckinsey_memo: vNum >= 9, domain_lock: vNum >= 8,
        confidence_engine: vNum >= 7, jurisdiction_priority: vNum >= 7,
      },
      query_domain: queryDomain, query_domain_label: domainLabel,
      mckinsey_memo: mckinseyMemo, audit_committee: isAuditCommittee,
      domain_validation: domainValidation,
      kg_entities: (result.kg_entities || []), lang, latency_ms: totalLatency,
      expanded_query: expandedQuery, total_sources: result.total_sources || 344,
      cache_hit: false, engine: `rag-universal-${version}`,
      db_latency_ms: result.latency_ms || searchLatency, filtered_ao_ami: filteredCount,
      disclaimer, translated: lang === "en",
      pipeline: `RAG Universal ${version} Consolidated → kos_search_unified_v3 → v3-v9 unified`,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("rag-universal error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage, latency_ms: Date.now() - startTime }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});