import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ═══════════════════════════════════════════════════
// KOS AUTOMATON ENGINE v4
// Moteur NLP déterministe — 100% Autonome, Zéro API Externe
// v4 : + opération translate (OpenAI en option)
// ═══════════════════════════════════════════════════

// ─── Auth Helper ───
async function authenticate(req: Request): Promise<{ isAdmin: boolean; isServiceRole: boolean; userId: string | null }> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { isAdmin: false, isServiceRole: false, userId: null };
  }

  const token = authHeader.replace("Bearer ", "");

  if (token === serviceRoleKey) {
    return { isAdmin: true, isServiceRole: true, userId: null };
  }

  try {
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user) return { isAdmin: false, isServiceRole: false, userId: null };

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("system_role")
      .eq("id", user.id)
      .maybeSingle();

    const isAdmin = profile?.system_role === "admin" || profile?.system_role === "superadmin" || profile?.system_role === "owner";
    return { isAdmin, isServiceRole: false, userId: user.id };
  } catch {
    return { isAdmin: false, isServiceRole: false, userId: null };
  }
}

const DB_OPS = new Set(["recommend", "semantic_search", "status"]);

// ─── Tokenisation mots (fr + en) ───
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-zàâäéèêëîïôöùûüçœæ0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

function extractBigrams(words: string[]): string[] {
  const bigrams: string[] = [];
  for (let i = 0; i < words.length - 1; i++) {
    bigrams.push(`${words[i]}_${words[i + 1]}`);
  }
  return bigrams;
}

const STOPWORDS = new Set([
  "le","la","les","un","une","des","de","du","à","au","aux","et","ou","en","ce","cette","ces",
  "son","sa","ses","pour","par","sur","dans","avec","sans","plus","moins","très","tout","toute",
  "tous","toutes","est","sont","que","qui","quoi","dont","où","quand","comment","pourquoi",
  "pas","ne","se","nous","vous","ils","elles","leur","leurs","mon","ma","mes","ton","ta","tes",
  "notre","nos","votre","vos","aussi","encore","déjà","si","alors","donc","car","mais","entre",
  "sous","chez","depuis","jusque","pendant","après","avant","vers","comme","autre",
  "chaque","faire","peut","être","avoir","bien","même","dit","cet","cela","ici","là",
  "the","a","an","is","are","was","were","be","been","being","have","has","had","having",
  "do","does","did","doing","will","would","shall","should","may","might","must","can","could",
  "i","me","my","we","our","you","your","he","him","his","she","her","it","its","they","them",
  "their","this","that","these","those","what","which","who","whom","when","where","why","how",
  "all","any","both","each","few","more","most","other","some","such","no","nor","not","only",
  "own","same","so","than","too","very","just","about","above","after","again","at","by","during",
  "for","from","in","into","of","off","on","over","through","to","up","with","and","but","or",
  "because","as","until","while","if","then","else","there",
]);

function removeStopwords(words: string[]): string[] {
  return words.filter((w) => !STOPWORDS.has(w));
}

const QUERY_EXPANSION: Record<string, string[]> = {
  "bceao": ["banque centrale", "uemoa", "union monétaire", "afrique de l'ouest"],
  "cobac": ["cemac", "afrique centrale", "commission bancaire"],
  "ohada": ["droit des affaires", "uniformisation", "acte uniforme"],
  "gafi": ["lcbft", "blanchiment", "financement terrorisme", "lutte"],
  "conformité": ["compliance", "mise en conformite", "réglementaire"],
  "gouvernance": ["conseil administration", "board", "administrateur"],
  "risque": ["risk", "gestion risques", "cartographie", "mitigation"],
  "audit": ["inspection", "contrôle", "vérification", "revue"],
  "sfd": ["microfinance", "système financier décentralisé", "inclusion financière"],
  "agrément": ["licence", "autorisation", "habilitation"],
  "solvabilité": ["fonds propres", "ratio", "cooke", "bâle"],
  "fintech": ["technologie financière", "paiement mobile", "innovation"],
  "esg": ["durabilité", "environnement", "social", "gouvernance", "rse"],
  "prix transfert": ["beps", "prix de transfert", "documentation", "pleine concurrence"],
  "contrôle interne": ["dispositif", "procédures", "conformité interne"],
  "due diligence": ["diligence", "vérification", "investigation", "acquisition"],
  "cybersécurité": ["sécurité informatique", "résilience", "continuité"],
  "protection données": ["rgpd", "données personnelles", "vie privée"],
};

function expandQuery(query: string): string[] {
  const lower = query.toLowerCase();
  const expansions: string[] = [];
  for (const [key, synonyms] of Object.entries(QUERY_EXPANSION)) {
    if (lower.includes(key)) {
      for (const syn of synonyms) {
        if (!lower.includes(syn)) expansions.push(syn);
      }
    }
  }
  return expansions.slice(0, 5);
}

function bm25Tf(tf: number, docLen: number, avgDocLen: number, k1 = 1.5, b = 0.75): number {
  const numerator = tf * (k1 + 1);
  const denominator = tf + k1 * (1 - b + b * (docLen / Math.max(1, avgDocLen)));
  return numerator / denominator;
}

interface TfIdfDoc {
  id: string;
  titre: string;
  text: string;
  words: string[];
  bigrams: string[];
  wordFreq: Map<string, number>;
  bigramFreq: Map<string, number>;
  docLength: number;
}

function buildTfIdfIndex(docs: TfIdfDoc[]) {
  const df = new Map<string, number>();
  const bigramDf = new Map<string, number>();
  const totalDocs = docs.length;

  for (const doc of docs) {
    const uniqueWords = new Set(doc.words);
    for (const w of uniqueWords) df.set(w, (df.get(w) || 0) + 1);
    const uniqueBigrams = new Set(doc.bigrams);
    for (const bg of uniqueBigrams) bigramDf.set(bg, (bigramDf.get(bg) || 0) + 1);
  }

  const avgDocLen = docs.reduce((s, d) => s + d.docLength, 0) / Math.max(1, totalDocs);
  const vectors: Map<string, Map<string, number>> = new Map();
  const bigramVectors: Map<string, Map<string, number>> = new Map();

  for (const doc of docs) {
    const vec = new Map<string, number>();
    const bgVec = new Map<string, number>();
    for (const [w, tf] of doc.wordFreq) {
      const tfSaturated = bm25Tf(tf, doc.docLength, avgDocLen);
      const idf = Math.log((totalDocs + 1) / ((df.get(w) || 0) + 1)) + 1;
      vec.set(w, tfSaturated * idf);
    }
    for (const [bg, tf] of doc.bigramFreq) {
      const idf = Math.log((totalDocs + 1) / ((bigramDf.get(bg) || 0) + 1)) + 1;
      bgVec.set(bg, tf * idf);
    }
    vectors.set(doc.id, vec);
    bigramVectors.set(doc.id, bgVec);
  }
  return { vectors, bigramVectors, df, bigramDf, totalDocs, avgDocLen };
}

function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0, normA = 0, normB = 0;
  for (const [w, v] of a) {
    normA += v * v;
    dot += v * (b.get(w) || 0);
  }
  for (const v of b.values()) normB += v * v;
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function extractiveSummarize(text: string, titre: string, maxSentences = 3, maxWords = 200): string {
  const sentences = text
    .replace(/([.!?])\s+/g, "$1|||")
    .split("|||")
    .map((s) => s.trim())
    .filter((s) => s.length > 20);

  if (sentences.length <= maxSentences) return sentences.join(". ") + ".";

  const titleWords = new Set(removeStopwords(tokenize(titre)));

  const scored = sentences.map((s, i) => {
    const allWords = tokenize(s);
    const contentWords = removeStopwords(allWords);
    const wordCount = allWords.length;
    if (wordCount === 0) return { s, score: 0 };
    const positionNorm = i / Math.max(1, sentences.length - 1);
    const positionScore = positionNorm <= 0.5 ? 1 - positionNorm * 4 : 1 - (1 - positionNorm) * 2;
    const titleOverlap = contentWords.filter((w) => titleWords.has(w)).length / Math.max(1, contentWords.length);
    const lexicalDensity = contentWords.length / Math.max(1, wordCount);
    const lengthBonus = wordCount >= 15 && wordCount <= 50 ? 1.0 : wordCount < 10 ? 0.3 : 0.7;
    const regulatoryTerms = [
      "circulaire","règlement","directive","instruction","article","alinéa",
      "bceao","cobac","ohada","gafi","uemoa","cemac","beac","cima",
    ];
    const regulatoryBonus = regulatoryTerms.filter((t) => allWords.some((w) => w.includes(t) || t.includes(w))).length * 0.12;
    return { s, position: i, score: positionScore * 0.25 + titleOverlap * 0.30 + lexicalDensity * 0.15 + lengthBonus * 0.15 + Math.min(0.15, regulatoryBonus) };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, maxSentences);
  const topByPosition = new Map<number, string>();
  top.forEach((t) => topByPosition.set(t.position, t.s));
  const ordered: { s: string }[] = [];
  for (const pos of Array.from(topByPosition.keys()).sort((a, b) => a - b)) {
    ordered.push({ s: topByPosition.get(pos)! });
  }
  let result = ordered.map((t) => t.s).join(". ") + ".";
  if (result.split(/\s+/).length > maxWords) {
    result = ordered.slice(0, Math.max(2, maxSentences - 1)).map((t) => t.s).join(". ") + ".";
  }
  return result;
}

function extractKeywords(text: string, maxKeywords = 10): string[] {
  const words = removeStopwords(tokenize(text));
  const freq = new Map<string, number>();
  for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);
  const regulatoryBoost = new Set([
    "bceao","cobac","ohada","gafi","uemoa","cemac","beac","cima",
    "circulaire","règlement","directive","instruction","conformité",
    "contrôle","risque","gouvernance","audit","conseil","agrément",
  ]);
  return Array.from(freq.entries())
    .map(([w, f]) => ({ word: w, score: f * (regulatoryBoost.has(w) ? 1.5 : 1.0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, maxKeywords)
    .map(({ word }) => word);
}

interface QualityScore {
  overall: number;
  dimensions: { name: string; score: number; max: number; details: string }[];
  issues: string[];
  recommendations: string[];
}

function scoreContentQuality(text: string, titre: string, langue = "fr"): QualityScore {
  const dimensions: { name: string; score: number; max: number; details: string }[] = [];
  const issues: string[] = [];
  const recommendations: string[] = [];
  const normalized = text.toLowerCase();
  const words = text.split(/\s+/);
  const wordCount = words.length;
  const paragraphs = text.split(/\n{2,}/).filter((p) => p.trim().length > 0);
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 10);

  let lengthScore: number; let lengthDetail: string;
  if (wordCount >= 800 && wordCount <= 3000) { lengthScore = 10; lengthDetail = `${wordCount} mots — optimal`; }
  else if (wordCount >= 500) { lengthScore = 7; lengthDetail = `${wordCount} mots — acceptable`; }
  else if (wordCount >= 200) { lengthScore = 5; lengthDetail = `${wordCount} mots — court`; }
  else { lengthScore = 2; lengthDetail = `${wordCount} mots — trop court`; }
  if (lengthScore < 8) { issues.push("Contenu trop court"); recommendations.push("Développer à 800+ mots"); }
  dimensions.push({ name: "Longueur", score: lengthScore, max: 10, details: lengthDetail });

  let structScore: number; let structDetail: string;
  if (paragraphs.length >= 4) { structScore = 10; structDetail = `${paragraphs.length} paragraphes`; }
  else if (paragraphs.length >= 2) { structScore = 7; structDetail = `${paragraphs.length} paragraphes`; }
  else { structScore = 3; structDetail = "Bloc unique"; }
  if (structScore < 7) { issues.push("Structure insuffisante"); recommendations.push("Structurer en sections"); }
  dimensions.push({ name: "Structure", score: structScore, max: 10, details: structDetail });

  const banned = ["révolutionnaire","incroyable","magique","disruptif","game changer","meilleur du monde","numéro 1","leader incontesté","unique","exceptionnel","garanti","100%","sans risque","miracle"];
  const found = banned.filter((bw) => normalized.includes(bw));
  const banScore = found.length === 0 ? 10 : Math.max(1, 10 - found.length * 3);
  if (found.length > 0) { issues.push(`${found.length} terme(s) non-institutionnel(s)`); recommendations.push(`Remplacer : ${found.join(", ")}`); }
  dimensions.push({ name: "Ton Institutionnel", score: banScore, max: 10, details: found.length === 0 ? "Impeccable" : `${found.length} termes à éviter` });

  const refPatterns = [/circulaire\s*(n?°?\s*\d{2,4}[\/-]\d{2,4})/i, /règlement\s*(n?°?\s*\w[\w\/-]+)/i, /directive\s*(n?°?\s*\w[\w\/-]+)/i, /article\s*\d+/i, /bceao|cobac|ohada|gafi|uemoa|cemac|beac/gi, /iso\s*\d+/i, /ifrs|ias\s*\d+/i];
  const refCount = refPatterns.reduce((sum, p) => sum + (normalized.match(p)?.length || 0), 0);
  let refScore: number; let refDetail: string;
  if (refCount >= 5) { refScore = 10; refDetail = `${refCount} références`; }
  else if (refCount >= 2) { refScore = 7; refDetail = `${refCount} références`; }
  else if (refCount >= 1) { refScore = 4; refDetail = "1 référence"; }
  else { refScore = 1; refDetail = "Aucune référence"; }
  if (refScore < 5) { issues.push("Manque de références réglementaires"); recommendations.push("Ajouter des références BCEAO/COBAC/OHADA"); }
  dimensions.push({ name: "Références Règlementaires", score: refScore, max: 10, details: refDetail });

  const avgLen = sentences.length > 0 ? sentences.reduce((s, sent) => s + sent.split(/\s+/).length, 0) / sentences.length : 0;
  let readScore: number; let readDetail: string;
  if (avgLen >= 15 && avgLen <= 28) { readScore = 10; readDetail = `Phrases ${avgLen.toFixed(0)} mots`; }
  else if (avgLen < 15) { readScore = 7; readDetail = `Phrases ${avgLen.toFixed(0)} mots`; }
  else if (avgLen <= 35) { readScore = 7; readDetail = `Phrases ${avgLen.toFixed(0)} mots`; }
  else { readScore = 4; readDetail = `Phrases ${avgLen.toFixed(0)} mots`; }
  if (readScore < 7) { issues.push("Longueur de phrases non optimale"); recommendations.push("Cibler 15-28 mots par phrase"); }
  dimensions.push({ name: "Lisibilité", score: readScore, max: 10, details: readDetail });

  const uniqueWords = new Set(removeStopwords(tokenize(text))).size;
  const lexRatio = wordCount > 0 ? uniqueWords / wordCount : 0;
  let lexScore: number; let lexDetail: string;
  if (lexRatio >= 0.35) { lexScore = 10; lexDetail = "Riche"; }
  else if (lexRatio >= 0.25) { lexScore = 7; lexDetail = "Correct"; }
  else { lexScore = 4; lexDetail = "Répétitif"; }
  if (lexScore < 7) { issues.push("Vocabulaire répétitif"); recommendations.push("Enrichir le champ lexical"); }
  dimensions.push({ name: "Richesse Lexicale", score: lexScore, max: 10, details: lexDetail });

  const overall = Math.round(dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length * 10) / 10;
  return { overall, dimensions, issues, recommendations };
}

function qualityGate(score: QualityScore) {
  const thresholds = [
    { gate: "Longueur minimale", dim: "Longueur", threshold: 4 },
    { gate: "Ton institutionnel", dim: "Ton Institutionnel", threshold: 8 },
    { gate: "Références réglementaires", dim: "Références Règlementaires", threshold: 3 },
    { gate: "Lisibilité", dim: "Lisibilité", threshold: 6 },
  ];
  const gate_results = thresholds.map(({ gate, dim, threshold }) => {
    const dimScore = score.dimensions.find((d) => d.name === dim)?.score || 0;
    return { gate, passed: dimScore >= threshold, threshold, actual: dimScore };
  });
  return { passed: gate_results.every((g) => g.passed), gate_results };
}

interface ContentItem {
  id: string; titre: string; domaine: string | null; sous_domaine: string | null;
  description: string | null; mots_cles: string[]; type_document: string | null;
}

function buildContentRecommendations(source: { titre: string; content: string; tags?: string[] }, pool: ContentItem[], limit = 5): ContentItem[] {
  if (pool.length === 0) return [];
  const sourceText = source.titre + " " + source.content;
  const sourceKw = new Set(extractKeywords(sourceText, 15));
  const scored = pool.map((item) => {
    const itemText = `${item.titre} ${item.description || ""} ${item.mots_cles.join(" ")}`;
    const itemWords = new Set(removeStopwords(tokenize(itemText)));
    let intersection = 0;
    for (const kw of sourceKw) { if (itemWords.has(kw)) intersection++; }
    const domainBonus = source.tags?.some((t) => item.domaine?.toLowerCase().includes(t.toLowerCase())) ? 2 : 0;
    return { item, score: intersection + domainBonus };
  });
  scored.sort((a, b) => b.score - a.score);
  const seen = new Set<string>();
  const unique: ContentItem[] = [];
  for (const { item, score } of scored) {
    if (score === 0 || seen.has(item.id)) continue;
    seen.add(item.id);
    unique.push(item);
    if (unique.length >= limit) break;
  }
  return unique;
}

function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  return createClient(supabaseUrl, supabaseKey, { auth: { autoRefreshToken: false, persistSession: false } });
}

// ═══════════════════════════════════════════════════
// TRANSLATION — OpenAI (optional, graceful fallback)
// ═══════════════════════════════════════════════════
async function translateWithOpenAI(text: string, sourceLang: string, targetLang: string): Promise<string> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  // Trim to 4000 chars max for cost/efficiency
  const trimmed = text.length > 4000 ? text.slice(0, 4000) : text;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a professional regulatory/financial translator. Translate the following text from ${sourceLang === 'fr' ? 'French' : sourceLang} to ${targetLang === 'en' ? 'English' : targetLang}. Preserve regulatory terminology, acronyms (BCEAO, COBAC, OHADA, GAFI, UEMOA, CEMAC), and document references exactly as they are. Maintain the original formatting and line breaks. Output ONLY the translated text, no explanations.`,
        },
        {
          role: "user",
          content: trimmed,
        },
      ],
      temperature: 0.1,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error: ${response.status} — ${err.slice(0, 200)}`);
  }

  const data = await response.json();
  const translated = data.choices?.[0]?.message?.content || "";
  
  // If text was trimmed, append a note
  if (text.length > 4000) {
    return translated + "\n\n[Note: Text was truncated for translation — original length: " + text.length + " characters]";
  }
  
  return translated;
}

// Simple built-in glossary-based translation fallback (regulatory terms only)
function glossaryTranslate(text: string): string {
  const GLOSSARY: Record<string, string> = {
    "circulaire": "circular",
    "règlement": "regulation",
    "directive": "directive",
    "instruction": "instruction",
    "article": "article",
    "alinéa": "paragraph",
    "banque centrale": "central bank",
    "établissement": "institution",
    "conformité": "compliance",
    "contrôle interne": "internal control",
    "gouvernance": "governance",
    "risque": "risk",
    "audit": "audit",
    "blanchiment": "money laundering",
    "financement du terrorisme": "terrorist financing",
    "lutte": "fight against",
    "surveillance": "supervision",
    "agrément": "license / authorization",
    "fonds propres": "own funds / equity",
    "solvabilité": "solvency",
    "microfinance": "microfinance",
    "système financier décentralisé": "decentralized financial system",
    "inclusion financière": "financial inclusion",
    "données personnelles": "personal data",
    "protection": "protection",
    "prix de transfert": "transfer pricing",
    "pleine concurrence": "arm's length",
    "documentation": "documentation",
    "diligence": "due diligence",
    "vérification": "verification",
    "sécurité": "security",
    "résilience": "resilience",
    "continuité": "continuity",
    "exigences": "requirements",
    "obligations": "obligations",
    "dispositions": "provisions",
    "sanctions": "sanctions",
    "pénalités": "penalties",
    "procédure": "procedure",
    "évaluation": "assessment",
    "cartographie": "mapping",
    "plan": "plan",
    "mise en œuvre": "implementation",
    "suivi": "monitoring",
    "rapport": "report",
    "mission": "mission",
    "inspection": "inspection",
    "conseil d'administration": "board of directors",
    "administrateur": "director / board member",
    "actionnaire": "shareholder",
    "dirigeant": "executive",
    "gestion": "management",
    "stratégie": "strategy",
    "opérationnel": "operational",
    "financier": "financial",
    "bancaire": "banking",
    "prudentiel": "prudential",
    "comptable": "accounting",
  };

  let result = text;
  const sorted = Object.entries(GLOSSARY).sort((a, b) => b[0].length - a[0].length);
  for (const [fr, en] of sorted) {
    const regex = new RegExp(fr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    result = result.replace(regex, (match) => {
      const isUpperCase = match === match.toUpperCase();
      const isTitleCase = match[0] === match[0].toUpperCase() && match.slice(1) === match.slice(1).toLowerCase();
      if (isUpperCase) return en.toUpperCase();
      if (isTitleCase) return en[0].toUpperCase() + en.slice(1);
      return en;
    });
  }

  return result !== text ? result : text;
}

// ═══════════════════════════════════════════════════
// MAIN SERVER
// ═══════════════════════════════════════════════════
serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    const { operation, content, titre, langue, query, domaine, limit, tags, source_lang, target_lang } = body;

    // Auth gate: DB ops require JWT + Admin
    if (DB_OPS.has(operation)) {
      const { isAdmin, isServiceRole } = await authenticate(req);
      if (!isAdmin && !isServiceRole) {
        return new Response(JSON.stringify({ success: false, error: "Accès non autorisé — JWT Admin requis pour les opérations base de données", error_code: "UNAUTHORIZED" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    // ═══════════════════════════════
    // TRANSLATE — new v4 operation
    // ═══════════════════════════════
    if (operation === "translate") {
      const srcText = typeof content === "string" ? content : (titre || "");
      const srcLang = source_lang || "fr";
      const tgtLang = target_lang || "en";

      if (!srcText || srcText.trim().length === 0) {
        return new Response(JSON.stringify({ success: false, error: "No content to translate" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      try {
        // Try OpenAI first
        const translated = await translateWithOpenAI(srcText, srcLang, tgtLang);
        return new Response(JSON.stringify({
          success: true,
          operation: "translate",
          translated,
          source_lang: srcLang,
          target_lang: tgtLang,
          method: "openai_gpt4o_mini",
          engine: "kos-automaton-v4",
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      } catch (openaiErr) {
        // Fallback: glossary-based translation
        const glossaryResult = glossaryTranslate(srcText);
        const isGlossaryOnly = glossaryResult === srcText;
        
        return new Response(JSON.stringify({
          success: true,
          operation: "translate",
          translated: glossaryResult,
          source_lang: srcLang,
          target_lang: tgtLang,
          method: isGlossaryOnly ? "noop_openai_unavailable" : "glossary_fallback",
          engine: "kos-automaton-v4",
          note: isGlossaryOnly 
            ? "Translation API not configured. Add OPENAI_API_KEY in Supabase Secrets to enable full translation. Currently showing original text."
            : "Limited glossary-based translation applied. Add OPENAI_API_KEY in Supabase Secrets for full AI-powered translation.",
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    if (operation === "score_quality" || operation === "quality_gate") {
      const textContent = content || titre || "";
      const qualityResult = scoreContentQuality(
        typeof textContent === "string" ? textContent : Array.isArray(textContent) ? textContent.join("\n\n") : "",
        titre || "", langue || "fr",
      );
      if (operation === "quality_gate") {
        const gate = qualityGate(qualityResult);
        return new Response(JSON.stringify({ success: true, operation: "quality_gate", ...gate, quality_score: qualityResult.overall }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      return new Response(JSON.stringify({ success: true, operation: "score_quality", ...qualityResult, engine: "kos-automaton-v4" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (operation === "summarize") {
      const textContent = typeof content === "string" ? content : Array.isArray(content) ? content.join("\n\n") : (titre || "");
      const summary = extractiveSummarize(textContent, titre || "", 3, 200);
      const keywords = extractKeywords(textContent, 8);
      return new Response(JSON.stringify({ success: true, operation: "summarize", summary, keywords, method: "extractive_textrank_bm25", engine: "kos-automaton-v4" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (operation === "extract_keywords") {
      const textContent = typeof content === "string" ? content : (titre || "");
      const keywords = extractKeywords(textContent, limit || 10);
      return new Response(JSON.stringify({ success: true, operation: "extract_keywords", keywords, engine: "kos-automaton-v4" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabase = getSupabaseClient();

    if (operation === "recommend") {
      const textContent = typeof content === "string" ? content : Array.isArray(content) ? content.slice(0, 3).join("\n\n") : (titre || "");
      const { data: pool } = await supabase.from("rag_documents").select("id, titre, domaine, sous_domaine, description, mots_cles, type_document").eq("est_public", true).order("ordre_affichage", { ascending: true, nullsFirst: false }).limit(100);
      const recommendations = buildContentRecommendations({ titre: titre || "", content: textContent, tags }, (pool || []) as ContentItem[], limit || 5);
      return new Response(JSON.stringify({ success: true, operation: "recommend", recommendations: recommendations.map((r) => ({ titre: r.titre, categorie: r.domaine || r.sous_domaine || "", raison: r.description?.substring(0, 150) || "", mots_cles: r.mots_cles || [], type_document: r.type_document || "" })), source_article: titre, method: "tfidf_keyword_matching", engine: "kos-automaton-v4" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (operation === "semantic_search") {
      if (!query || query.length < 2) return new Response(JSON.stringify({ error: "Paramètre query requis" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const expansionTerms = expandQuery(query);
      const expandedQuery = query + " " + expansionTerms.join(" ");
      const queryWords = removeStopwords(tokenize(expandedQuery));
      const queryBigrams = extractBigrams(removeStopwords(tokenize(query)));
      const queryUnique = new Set(queryWords);
      const { data: docs, error: docsError } = await supabase.from("rag_documents").select("id, titre, domaine, sous_domaine, pays, organisation, statut, description, mots_cles, type_document, content").eq("est_public", true).order("ordre_affichage", { ascending: true, nullsFirst: false }).limit(100);
      if (docsError) return new Response(JSON.stringify({ error: "Erreur base de données", details: docsError }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

      const tfidfDocs: TfIdfDoc[] = (docs || []).map((d: Record<string, unknown>) => {
        const text = `${d.titre || ""} ${d.description || ""} ${(d.mots_cles as string[])?.join(" ") || ""} ${(d.content as string || "").substring(0, 3000)}`;
        const words = removeStopwords(tokenize(text));
        const bigrams = extractBigrams(words);
        const wordFreq = new Map<string, number>();
        const bigramFreq = new Map<string, number>();
        for (const w of words) wordFreq.set(w, (wordFreq.get(w) || 0) + 1);
        for (const bg of bigrams) bigramFreq.set(bg, (bigramFreq.get(bg) || 0) + 1);
        return { id: String(d.id), titre: String(d.titre || ""), text, words, bigrams, wordFreq, bigramFreq, docLength: words.length };
      });

      const { vectors, bigramVectors, df, bigramDf, totalDocs, avgDocLen } = buildTfIdfIndex(tfidfDocs);

      const queryVec = new Map<string, number>();
      for (const kw of queryWords) queryVec.set(kw, (queryVec.get(kw) || 0) + 1);
      for (const [k, v] of queryVec) {
        const idf = Math.log((totalDocs + 1) / ((df.get(k) || 0) + 1)) + 1;
        queryVec.set(k, v * idf);
      }

      const queryBigramVec = new Map<string, number>();
      for (const bg of queryBigrams) queryBigramVec.set(bg, (queryBigramVec.get(bg) || 0) + 1);
      for (const [bg, v] of queryBigramVec) {
        const idf = Math.log((totalDocs + 1) / ((bigramDf.get(bg) || 0) + 1)) + 1;
        queryBigramVec.set(bg, v * idf);
      }

      const scored = tfidfDocs.map((doc) => {
        const docVec = vectors.get(doc.id) || new Map();
        const docBigramVec = bigramVectors.get(doc.id) || new Map();
        const unigramSim = cosineSimilarity(queryVec, docVec);
        const bigramSim = queryBigrams.length > 0 ? cosineSimilarity(queryBigramVec, docBigramVec) : 0;
        const titreLower = doc.titre.toLowerCase();
        let exactBoost = 0;
        for (const kw of queryUnique) { if (titreLower.includes(kw)) exactBoost += 0.12; }
        const original = (docs || []).find((d: Record<string, unknown>) => String(d.id) === doc.id);
        const domaineStr = String((original as Record<string, unknown>)?.domaine || "").toLowerCase();
        let domaineBoost = 0;
        for (const kw of queryUnique) { if (domaineStr.includes(kw)) domaineBoost += 0.08; }
        const combinedScore = unigramSim * 0.65 + bigramSim * 0.20 + Math.min(0.15, exactBoost + domaineBoost);
        return { ...(original || {}), similarity: Math.round(Math.min(1, combinedScore) * 1000) / 1000, _unigram: Math.round(unigramSim * 1000) / 1000, _bigram: Math.round(bigramSim * 1000) / 1000 };
      });

      scored.sort((a, b) => b.similarity - a.similarity);
      let filtered = scored;
      if (domaine && domaine.length > 0) {
        filtered = scored.filter((d: Record<string, unknown>) => String(d.domaine || "").toLowerCase().includes(domaine.toLowerCase()));
      }
      const topResults = filtered.slice(0, limit || 10);

      return new Response(JSON.stringify({ success: true, operation: "semantic_search", results: topResults, query, query_expanded: expansionTerms.length > 0 ? expandedQuery : null, expansion_terms: expansionTerms.length > 0 ? expansionTerms : null, method: "bm25_tfidf_bigrams_expansion", engine: "kos-automaton-v4", total_documents: totalDocs, threshold_applied: 0 }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (operation === "status") {
      const { count, error: countError } = await supabase.from("rag_documents").select("*", { count: "exact", head: true }).eq("est_public", true);
      const hasOpenAI = !!Deno.env.get("OPENAI_API_KEY");
      return new Response(JSON.stringify({
        success: true, operation: "status", engine: "kos-automaton-v4", version: "4.0.0", status: "active",
        auth: { jwt_required_for_db_ops: true, nlp_ops_public: true },
        capabilities: ["extractive_summarization","content_quality_scoring","quality_gates","keyword_extraction","bm25_tfidf_semantic_search","bigram_phrase_matching","query_expansion_regulatory","content_recommendations","translate_fr_en"],
        dependencies: { external_api: hasOpenAI ? "openai_gpt4o_mini_available" : "not_required — 100% autonomous (translation via glossary fallback)", supabase: countError ? "error" : "connected" },
        document_count: count || 0,
        methods: { summarization: "extractive_textrank_bm25", search: "bm25_tfidf_cosine_bigrams_expansion", quality: "heuristic_multidimensional", recommendations: "tfidf_jaccard_overlap", translate: hasOpenAI ? "openai_gpt4o_mini" : "glossary_fallback" },
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: `Opération inconnue: '${operation}'`, engine: "kos-automaton-v4" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Erreur interne", details: error instanceof Error ? error.message : String(error), engine: "kos-automaton-v4" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
