import { useCallback, useRef, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { getCachedDocs, setCachedDocs } from '@/utils/searchCache';

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

// ─── Types ───

export interface SemanticSearchResult {
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

export interface EmbeddingStats {
  total: number;
  withEmbeddings: number;
  withoutEmbeddings: number;
  percentComplete: number;
}

// ─── Worker Message Types ───

interface WorkerSearchResult {
  results: SemanticSearchResult[];
  totalDocs: number;
  method: string;
}

type WorkerState = 'idle' | 'loading' | 'ready' | 'error';

// ─── Hook ───

export function useSemanticSearch() {
  const cacheRef = useRef<{
    docs: Record<string, unknown>[] | null;
    tfidfDocs: TfIdfDoc[] | null;
    index: ReturnType<typeof buildTfIdfIndex> | null;
    fetchedAt: number;
  }>({ docs: null, tfidfDocs: null, index: null, fetchedAt: 0 });

  const statsCacheRef = useRef<{ stats: EmbeddingStats | null; fetchedAt: number }>({ stats: null, fetchedAt: 0 });

  // ─── Web Worker state (lazy init after window.onload + user interaction) ───
  const workerRef = useRef<Worker | null>(null);
  const [workerState, setWorkerState] = useState<WorkerState>('idle');
  const workerDocsRef = useRef<Record<string, unknown>[] | null>(null);
  const workerInitRequested = useRef(false);

  // Cleanup worker on unmount
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  // ─── Lazy init Web Worker (called on first user interaction with search) ───
  const initWorker = useCallback(async (docs: Record<string, unknown>[]): Promise<boolean> => {
    if (workerRef.current && workerState === 'ready') return true;
    if (workerRef.current && workerState === 'loading') return false;
    if (workerInitRequested.current && workerState === 'error') return false;

    workerInitRequested.current = true;
    setWorkerState('loading');

    try {
      // Try IndexedDB cache first
      const cached = await getCachedDocs();
      const docsToUse = cached && cached.length > 0 ? cached : docs;

      // Create Worker
      const worker = new Worker(
        new URL('@/workers/semanticSearch.worker.ts', import.meta.url),
        { type: 'module' },
      );

      const initDone = await new Promise<boolean>((resolve) => {
        worker.onmessage = (e: MessageEvent) => {
          if (e.data.type === 'init:done') {
            workerRef.current = worker;
            workerDocsRef.current = docsToUse;
            setWorkerState('ready');

            // Cache docs to IndexedDB for future sessions
            if (!cached || cached.length === 0) {
              setCachedDocs(docsToUse).catch(() => {});
            }
            resolve(true);
          } else if (e.data.type === 'init:error') {
            setWorkerState('error');
            worker.terminate();
            resolve(false);
          }
        };
        worker.onerror = () => {
          setWorkerState('error');
          worker.terminate();
          resolve(false);
        };
      });

      worker.postMessage({ type: 'init', docs: docsToUse });
      return await initDone;
    } catch {
      setWorkerState('error');
      return false;
    }
  }, [workerState]);

  // ─── Search via Web Worker (off main thread) ───
  const searchInWorker = useCallback((query: string, domaine?: string, limit = 10): Promise<WorkerSearchResult> => {
    return new Promise((resolve, reject) => {
      const w = workerRef.current;
      if (!w) {
        reject(new Error('Worker not initialized'));
        return;
      }
      const handler = (e: MessageEvent) => {
        if (e.data.type === 'search:result') {
          w.removeEventListener('message', handler);
          resolve({ results: e.data.results, totalDocs: e.data.totalDocs, method: e.data.method });
        } else if (e.data.type === 'search:error') {
          w.removeEventListener('message', handler);
          reject(new Error(e.data.error));
        }
      };
      w.addEventListener('message', handler);
      w.postMessage({ type: 'search', query, limit, domaine });
    });
  }, []);

  const ensureIndex = useCallback(async () => {
    const cache = cacheRef.current;
    const now = Date.now();
    if (cache.docs && cache.index && now - cache.fetchedAt < 5 * 60 * 1000) {
      return { docs: cache.docs, tfidfDocs: cache.tfidfDocs!, index: cache.index };
    }

    const { data: docs, error } = await supabase
      .from('rag_documents')
      .select('id, titre, domaine, sous_domaine, pays, organisation, statut, description, mots_cles, type_document, content')
      .eq('est_public', true)
      .order('ordre_affichage', { ascending: true, nullsFirst: false })
      .limit(100);

    if (error || !docs || docs.length === 0) {
      throw new Error('Aucun document réglementaire indexé');
    }

    // ─── Init worker in background (non-blocking, lazy) ───
    if (!workerInitRequested.current) {
      initWorker(docs).catch(() => {});
    }

    const tfidfDocs: TfIdfDoc[] = docs.map((d: Record<string, unknown>) => {
      const text = `${d.titre || ''} ${d.description || ''} ${(d.mots_cles as string[])?.join(' ') || ''} ${(d.content as string || '').substring(0, 3000)}`;
      const words = removeStopwords(tokenize(text));
      const bigrams = extractBigrams(words);
      const wordFreq = new Map<string, number>();
      const bigramFreq = new Map<string, number>();
      for (const w of words) wordFreq.set(w, (wordFreq.get(w) || 0) + 1);
      for (const bg of bigrams) bigramFreq.set(bg, (bigramFreq.get(bg) || 0) + 1);
      return {
        id: String(d.id),
        titre: String(d.titre || ''),
        text,
        words,
        bigrams,
        wordFreq,
        bigramFreq,
        docLength: words.length,
      };
    });

    const index = buildTfIdfIndex(tfidfDocs);
    cache.docs = docs;
    cache.tfidfDocs = tfidfDocs;
    cache.index = index;
    cache.fetchedAt = now;

    return { docs, tfidfDocs, index };
  }, [initWorker]);

  // ══════════════════════════════════════════════
  // 🔬 PGVector Cosine Similarity Search (via RPC)
  // ══════════════════════════════════════════════
  const vectorSearch = useCallback(async (
    queryEmbedding: number[],
    domaine?: string,
    limit = 10,
    minSimilarity = 0.0,
  ): Promise<{ results: SemanticSearchResult[]; method: string }> => {
    const { data, error } = await supabase.rpc('search_rag_vector', {
      query_embedding: queryEmbedding,
      match_limit: limit,
      match_domaine: domaine || null,
      min_similarity: minSimilarity,
    });

    if (error) throw new Error(`PGVector search failed: ${error.message}`);

    const results: SemanticSearchResult[] = ((data || []) as Record<string, unknown>[]).map((r) => ({
      id: String(r.id),
      titre: String(r.titre || ''),
      domaine: r.domaine as string | null,
      sous_domaine: r.sous_domaine as string | null,
      pays: r.pays as string | null,
      organisation: r.organisation as string | null,
      statut: r.statut as string | null,
      description: r.description as string | null,
      mots_cles: r.mots_cles as string[] | null,
      type_document: r.type_document as string | null,
      similarity: typeof r.similarity === 'number' ? Math.round(r.similarity * 1000) / 1000 : 0,
    }));

    return { results, method: 'pgvector_cosine_openai_embedding_3_small' };
  }, []);

  // ═════════════════════════════
  // 📊 Embedding Stats
  // ═════════════════════════════
  const getEmbeddingStats = useCallback(async (forceRefresh = false): Promise<EmbeddingStats> => {
    const cache = statsCacheRef.current;
    const now = Date.now();
    if (!forceRefresh && cache.stats && now - cache.fetchedAt < 30 * 1000) {
      return cache.stats;
    }

    const { count: total } = await supabase
      .from('rag_documents')
      .select('*', { count: 'exact', head: true })
      .eq('est_public', true);

    const { count: withEmb } = await supabase
      .from('rag_documents')
      .select('*', { count: 'exact', head: true })
      .eq('est_public', true)
      .not('embedding', 'is', null);

    const totalDocs = total || 0;
    const withEmbeddings = withEmb || 0;

    const stats: EmbeddingStats = {
      total: totalDocs,
      withEmbeddings,
      withoutEmbeddings: totalDocs - withEmbeddings,
      percentComplete: totalDocs > 0 ? Math.round((withEmbeddings / totalDocs) * 1000) / 10 : 0,
    };

    cache.stats = stats;
    cache.fetchedAt = now;
    return stats;
  }, []);

  // ═══════════════════════════════════
  // 🔍 TF-IDF Search — Worker-first (off main thread)
  // ═══════════════════════════════════
  const search = useCallback(async (query: string, domaine?: string, limit = 10): Promise<{ results: SemanticSearchResult[]; totalDocs: number; method: string }> => {
    const { docs, index } = await ensureIndex();

    // ─── Try Worker first (off main thread, INP-safe) ───
    if (workerState === 'ready' && workerRef.current) {
      try {
        const workerResult = await searchInWorker(query, domaine, limit);
        if (workerResult.results.length > 0) {
          return workerResult;
        }
      } catch {
        // Worker failed — fall through to main thread
      }
    }

    // ─── Fallback: Main thread computation ───
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

    const scored: SemanticSearchResult[] = [];
    for (const doc of docs) {
      const docVector = index.vectors.get(String(doc.id));
      if (!docVector) continue;

      const unigramSim = cosineSimilarity(queryVec, docVector.vec);
      const bigramSim = queryBigrams.length > 0 ? cosineSimilarity(queryBigramVec, docVector.bigramVec) : 0;

      const titreLower = String(doc.titre || '').toLowerCase();
      let exactBoost = 0;
      for (const kw of queryUnique) {
        if (titreLower.includes(kw)) exactBoost += 0.12;
      }

      const domaineStr = String((doc as Record<string, unknown>).domaine || '').toLowerCase();
      let domaineBoost = 0;
      for (const kw of queryUnique) {
        if (domaineStr.includes(kw)) domaineBoost += 0.08;
      }

      const combinedScore = unigramSim * 0.65 + bigramSim * 0.20 + Math.min(0.15, exactBoost + domaineBoost);

      scored.push({
        id: String(doc.id),
        titre: String(doc.titre || ''),
        domaine: (doc as Record<string, unknown>).domaine as string | null,
        sous_domaine: (doc as Record<string, unknown>).sous_domaine as string | null,
        pays: (doc as Record<string, unknown>).pays as string | null,
        organisation: (doc as Record<string, unknown>).organisation as string | null,
        statut: (doc as Record<string, unknown>).statut as string | null,
        description: (doc as Record<string, unknown>).description as string | null,
        mots_cles: (doc as Record<string, unknown>).mots_cles as string[] | null,
        type_document: (doc as Record<string, unknown>).type_document as string | null,
        similarity: Math.round(Math.min(1, combinedScore) * 1000) / 1000,
      });
    }

    scored.sort((a, b) => b.similarity - a.similarity);

    let filtered = scored;
    if (domaine && domaine.length > 0) {
      filtered = scored.filter((d) => String(d.domaine || '').toLowerCase().includes(domaine.toLowerCase()));
    }

    const topResults = filtered.slice(0, limit);
    return { results: topResults, totalDocs: docs.length, method: 'bm25_tfidf_cosine_bigrams_expansion' };
  }, [ensureIndex, workerState, searchInWorker]);

  return { search, vectorSearch, getEmbeddingStats, ensureIndex };
}