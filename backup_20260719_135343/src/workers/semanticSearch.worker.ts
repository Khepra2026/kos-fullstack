/**
 * ═══════════════════════════════════════════════════════
 * KHEPRA EXPERTS — Semantic Search Web Worker
 * ═══════════════════════════════════════════════════════
 * Exécute le calcul TF-IDF / BM25 / Cosine Similarity hors
 * du thread principal pour garantir un INP < 100ms.
 *
 * Ce Worker est instancié UNIQUEMENT après window.onload et
 * seulement si l'utilisateur interagit avec la zone de recherche.
 *
 * Zéro dépendance externe — tout le moteur est embarqué ici.
 * Zéro table SQL supplémentaire — tout en mémoire vive.
 * Zéro Edge Function — calcul 100% client-side.
 *
 * Protocole de messages :
 *   → { type: 'init', docs: RagDocumentRaw[] }
 *      ← { type: 'init:done', totalDocs: number, avgDocLen: number }
 *   → { type: 'search', query: string, limit?: number, domaine?: string }
 *      ← { type: 'search:result', results: SearchResultItem[], totalDocs: number, method: string }
 *   → { type: 'search:vector', embedding: number[], domaine?: string, limit?: number, minSimilarity?: number }
 *      ← { type: 'search:result', results: SearchResultItem[], totalDocs: number, method: string }
 *   → { type: 'stats' }
 *      ← { type: 'stats:result', totalDocs: number, avgDocLen: number, dfSize: number }
 * ═══════════════════════════════════════════════════════
 */

// ─── Types (auto-contained, no external imports in worker) ───

interface RagDocRaw {
  id: string;
  titre: string;
  domaine: string | null;
  sous_domaine: string | null;
  pays: string | null;
  organisation: string | null;
  statut: string | null;
  description: string | null;
  mots_cles: string[] | null;
  type_document: string | null;
}

interface SearchResultItem {
  id: string;
  titre: string;
  domaine: string | null;
  sous_domaine: string | null;
  pays: string | null;
  organisation: string | null;
  statut: string | null;
  description: string | null;
  mots_cles: string[] | null;
  type_document: string | null;
  similarity: number;
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

interface DocVector {
  vec: Map<string, number>;
  bigramVec: Map<string, number>;
}

interface SearchIndex {
  vectors: Map<string, DocVector>;
  df: Map<string, number>;
  bigramDf: Map<string, number>;
  totalDocs: number;
  avgDocLen: number;
}

// ─── Stopwords FR + EN ───

const STOPWORDS = new Set([
  'le','la','les','un','une','des','de','du','à','au','aux','et','ou','en','ce','cette','ces',
  'son','sa','ses','pour','par','sur','dans','avec','sans','plus','moins','très','tout','toute',
  'tous','toutes','est','sont','que','qui','quoi','dont','où','quand','comment','pourquoi',
  'pas','ne','se','nous','vous','ils','elles','leur','leurs','mon','ma','mes','ton','ta','tes',
  'notre','nos','votre','vos','aussi','encore','déjà','si','alors','donc','car','mais','entre',
  'sous','chez','depuis','jusque','pendant','après','avant','vers','comme','autre',
  'chaque','faire','peut','être','avoir','bien','même','dit','cet','cela','ici','là',
  'the','a','an','is','are','was','were','be','been','being','have','has','had','having',
  'do','does','did','doing','will','would','shall','should','may','might','must','can','could',
  'i','me','my','we','our','you','your','he','him','his','she','her','it','its','they','them',
  'their','this','that','these','those','what','which','who','whom','when','where','why','how',
  'all','any','both','each','few','more','most','other','some','such','no','nor','not','only',
  'own','same','so','than','too','very','just','about','above','after','again','at','by','during',
  'for','from','in','into','of','off','on','over','through','to','up','with','and','but','or',
  'because','as','until','while','if','then','else','there',
]);

// ─── Query Expansion réglementaire ───

const QUERY_EXPANSION: Record<string, string[]> = {
  bceao: ['banque centrale', 'uemoa', 'union monétaire', "afrique de l'ouest"],
  cobac: ['cemac', 'afrique centrale', 'commission bancaire'],
  ohada: ['droit des affaires', 'uniformisation', 'acte uniforme'],
  gafi: ['lcbft', 'blanchiment', 'financement terrorisme', 'lutte'],
  conformité: ['compliance', 'mise en conformite', 'réglementaire'],
  gouvernance: ['conseil administration', 'board', 'administrateur'],
  risque: ['risk', 'gestion risques', 'cartographie', 'mitigation'],
  audit: ['inspection', 'contrôle', 'vérification', 'revue'],
  sfd: ['microfinance', 'système financier décentralisé', 'inclusion financière'],
  agrément: ['licence', 'autorisation', 'habilitation'],
  solvabilité: ['fonds propres', 'ratio', 'cooke', 'bâle'],
  fintech: ['technologie financière', 'paiement mobile', 'innovation'],
  esg: ['durabilité', 'environnement', 'social', 'gouvernance', 'rse'],
  'prix transfert': ['beps', 'prix de transfert', 'documentation', 'pleine concurrence'],
  'contrôle interne': ['dispositif', 'procédures', 'conformité interne'],
  'due diligence': ['diligence', 'vérification', 'investigation', 'acquisition'],
  cybersécurité: ['sécurité informatique', 'résilience', 'continuité'],
  'protection données': ['rgpd', 'données personnelles', 'vie privée'],
};

// ─── Tokenization ───

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-zàâäéèêëîïôöùûüçœæ0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

function removeStopwords(words: string[]): string[] {
  return words.filter((w) => !STOPWORDS.has(w));
}

function extractBigrams(words: string[]): string[] {
  const bigrams: string[] = [];
  for (let i = 0; i < words.length - 1; i++) {
    bigrams.push(`${words[i]}_${words[i + 1]}`);
  }
  return bigrams;
}

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

function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (const [w, v] of a) {
    normA += v * v;
    dot += v * (b.get(w) || 0);
  }
  for (const v of b.values()) normB += v * v;
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ─── Index Builder ───

function buildTfIdfIndex(docs: TfIdfDoc[]): SearchIndex {
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
  const vectors = new Map<string, DocVector>();

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
    vectors.set(doc.id, { vec, bigramVec: bgVec });
  }

  return { vectors, df, bigramDf, totalDocs, avgDocLen };
}

// ─── Search Engine ───

function searchInIndex(
  query: string,
  docs: RagDocRaw[],
  index: SearchIndex,
  domaine?: string,
  limit = 10,
): { results: SearchResultItem[]; totalDocs: number } {

  const expansionTerms = expandQuery(query);
  const expandedQuery = query + ' ' + expansionTerms.join(' ');
  const queryWords = removeStopwords(tokenize(expandedQuery));
  const queryBigrams = extractBigrams(removeStopwords(tokenize(query)));
  const queryUnique = new Set(queryWords);

  const queryVec = new Map<string, number>();
  for (const kw of queryWords) queryVec.set(kw, (queryVec.get(kw) || 0) + 1);
  for (const [k, v] of queryVec) {
    const idf = Math.log((index.totalDocs + 1) / ((index.df.get(k) || 0) + 1)) + 1;
    queryVec.set(k, v * idf);
  }

  const queryBigramVec = new Map<string, number>();
  for (const bg of queryBigrams) queryBigramVec.set(bg, (queryBigramVec.get(bg) || 0) + 1);
  for (const [bg, v] of queryBigramVec) {
    const idf = Math.log((index.totalDocs + 1) / ((index.bigramDf.get(bg) || 0) + 1)) + 1;
    queryBigramVec.set(bg, v * idf);
  }

  const scored: SearchResultItem[] = [];
  for (const doc of docs) {
    const docVector = index.vectors.get(doc.id);
    if (!docVector) continue;

    const unigramSim = cosineSimilarity(queryVec, docVector.vec);
    const bigramSim = queryBigrams.length > 0
      ? cosineSimilarity(queryBigramVec, docVector.bigramVec)
      : 0;

    const titreLower = (doc.titre || '').toLowerCase();
    let exactBoost = 0;
    for (const kw of queryUnique) {
      if (titreLower.includes(kw)) exactBoost += 0.12;
    }

    const domaineStr = (doc.domaine || '').toLowerCase();
    let domaineBoost = 0;
    for (const kw of queryUnique) {
      if (domaineStr.includes(kw)) domaineBoost += 0.08;
    }

    const combinedScore = unigramSim * 0.65 + bigramSim * 0.20 + Math.min(0.15, exactBoost + domaineBoost);

    scored.push({
      id: doc.id,
      titre: doc.titre,
      domaine: doc.domaine,
      sous_domaine: doc.sous_domaine,
      pays: doc.pays,
      organisation: doc.organisation,
      statut: doc.statut,
      description: doc.description,
      mots_cles: doc.mots_cles,
      type_document: doc.type_document,
      similarity: Math.round(Math.min(1, combinedScore) * 1000) / 1000,
    });
  }

  scored.sort((a, b) => b.similarity - a.similarity);

  let filtered = scored;
  if (domaine && domaine.length > 0) {
    filtered = scored.filter((d) =>
      (d.domaine || '').toLowerCase().includes(domaine.toLowerCase()),
    );
  }

  return { results: filtered.slice(0, limit), totalDocs: docs.length };
}

// ─── Worker State ───

let docsCache: RagDocRaw[] | null = null;
let indexCache: SearchIndex | null = null;
let initInProgress = false;
let initPromise: Promise<void> | null = null;

function ensureIndex(docs: RagDocRaw[]): SearchIndex {
  const tfidfDocs: TfIdfDoc[] = docs.map((d) => {
    const text = `${d.titre || ''} ${d.description || ''} ${(d.mots_cles || []).join(' ')} ${''}`.substring(0, 3000);
    const words = removeStopwords(tokenize(text));
    const bigrams = extractBigrams(words);
    const wordFreq = new Map<string, number>();
    const bigramFreq = new Map<string, number>();
    for (const w of words) wordFreq.set(w, (wordFreq.get(w) || 0) + 1);
    for (const bg of bigrams) bigramFreq.set(bg, (bigramFreq.get(bg) || 0) + 1);
    return {
      id: d.id,
      titre: d.titre,
      text,
      words,
      bigrams,
      wordFreq,
      bigramFreq,
      docLength: words.length,
    };
  });

  return buildTfIdfIndex(tfidfDocs);
}

// ─── Message Handler ───

self.onmessage = async (e: MessageEvent) => {
  const { type } = e.data;

  if (type === 'init') {
    const { docs } = e.data as { docs: RagDocRaw[] };
    if (!docs || docs.length === 0) {
      self.postMessage({ type: 'init:error', error: 'No documents provided' });
      return;
    }

    initInProgress = true;
    try {
      // Use setTimeout(0) to yield to the message loop during index building
      docsCache = docs;
      indexCache = await new Promise<SearchIndex>((resolve) => {
        setTimeout(() => resolve(ensureIndex(docs)), 0);
      });

      self.postMessage({
        type: 'init:done',
        totalDocs: indexCache.totalDocs,
        avgDocLen: Math.round(indexCache.avgDocLen * 100) / 100,
        dfSize: indexCache.df.size,
      });
    } catch (err) {
      self.postMessage({
        type: 'init:error',
        error: err instanceof Error ? err.message : 'Index build failed',
      });
    } finally {
      initInProgress = false;
    }
    return;
  }

  if (type === 'search') {
    const { query, limit = 10, domaine } = e.data as { query: string; limit?: number; domaine?: string };
    if (!query || query.length < 2) {
      self.postMessage({ type: 'search:result', results: [], totalDocs: 0, method: 'bm25_tfidf_cosine_worker' });
      return;
    }

    if (!docsCache || !indexCache) {
      self.postMessage({ type: 'search:error', error: 'Worker not initialized. Send init first.' });
      return;
    }

    try {
      const { results, totalDocs } = await new Promise<{ results: SearchResultItem[]; totalDocs: number }>((resolve) => {
        setTimeout(() => resolve(searchInIndex(query, docsCache!, indexCache!, domaine, limit)), 0);
      });

      self.postMessage({
        type: 'search:result',
        results,
        totalDocs,
        method: 'bm25_tfidf_cosine_worker',
      });
    } catch (err) {
      self.postMessage({
        type: 'search:error',
        error: err instanceof Error ? err.message : 'Search failed',
      });
    }
    return;
  }

  if (type === 'stats') {
    if (!indexCache) {
      self.postMessage({ type: 'stats:result', totalDocs: 0, avgDocLen: 0, dfSize: 0 });
      return;
    }
    self.postMessage({
      type: 'stats:result',
      totalDocs: indexCache.totalDocs,
      avgDocLen: Math.round(indexCache.avgDocLen * 100) / 100,
      dfSize: indexCache.df.size,
    });
    return;
  }

  if (type === 'reset') {
    docsCache = null;
    indexCache = null;
    initPromise = null;
    initInProgress = false;
    self.postMessage({ type: 'reset:done' });
    return;
  }
};



