// KOS LOCAL VECTOR STORE™ — Store Vectoriel Souverain
// TF-IDF + Cosine Similarity — 100% local, zéro dépendance externe
// Contient les embeddings des 6 régulateurs africains critiques

import { localGetAll, localBulkPut, localGetById } from '@/services/localStorage';

// === Types ===
interface VectorDocument {
  id: string;
  regulator: string;
  text: string;
  tokens: string[];
  tfidf: number[];
  magnitude: number;
  metadata: {
    title: string;
    source_url: string;
    type: string;
    number: string;
    date: string;
    status: string;
  };
}

interface SearchResult {
  documentId: string;
  regulator: string;
  title: string;
  score: number;
  snippet: string;
  source_url: string;
}

// === Stopwords Français pour la tokenisation ===
const STOPWORDS_FR = new Set([
  'le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'à', 'au', 'aux',
  'et', 'ou', 'est', 'sont', 'dans', 'sur', 'par', 'pour', 'avec',
  'ce', 'cette', 'ces', 'que', 'qui', 'dont', 'il', 'elle', 'ils', 'elles',
  'en', 'y', 'pas', 'ne', 'plus', 'moins', 'très', 'tout', 'tous',
  'a', 'l', 'd', 'n', 's', 'c', 'qu', 'son', 'sa', 'ses', 'leur', 'leurs',
  'article', 'articles', 'alinéa', 'chapitre', 'titre', 'section',
]);

// === TF-IDF Engine (Local, Zéro Dépendance) ===
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-zàâäéèêëïîôöùûüç0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS_FR.has(t));
}

function computeTF(tokens: string[]): Record<string, number> {
  const tf: Record<string, number> = {};
  const total = tokens.length;
  for (const token of tokens) {
    tf[token] = (tf[token] || 0) + 1;
  }
  for (const key of Object.keys(tf)) {
    tf[key] = tf[key] / total;
  }
  return tf;
}

function computeIDF(documents: string[][]): Record<string, number> {
  const idf: Record<string, number> = {};
  const N = documents.length;
  const docFreq: Record<string, number> = {};

  for (const doc of documents) {
    const uniqueTokens = new Set(doc);
    for (const token of uniqueTokens) {
      docFreq[token] = (docFreq[token] || 0) + 1;
    }
  }

  for (const [token, df] of Object.entries(docFreq)) {
    idf[token] = Math.log((N + 1) / (df + 1)) + 1;
  }

  return idf;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  const denominator = Math.sqrt(magA) * Math.sqrt(magB);
  return denominator === 0 ? 0 : dotProduct / denominator;
}

// === Vector Store Operations ===
let globalVocabulary: string[] = [];
let globalIdf: Record<string, number> = {};

export async function buildGlobalVocabulary(): Promise<void> {
  const docs = await localGetAll<VectorDocument>('rag_embeddings');
  if (docs.length === 0) return;

  const allTokens: string[][] = docs.map((d) => d.tokens);
  globalIdf = computeIDF(allTokens);
  globalVocabulary = Object.keys(globalIdf);
}

function vectorizeQuery(query: string): number[] {
  const tokens = tokenize(query);
  const tf = computeTF(tokens);
  return globalVocabulary.map((term) => (tf[term] || 0) * (globalIdf[term] || 0));
}

// === Search API ===
export async function localVectorSearch(
  query: string,
  topK: number = 10,
  regulator?: string
): Promise<SearchResult[]> {
  const queryVector = vectorizeQuery(query);
  const docs = await localGetAll<VectorDocument>('rag_embeddings');
  let filtered = regulator ? docs.filter((d) => d.regulator === regulator) : docs;

  const scored = filtered.map((doc) => ({
    documentId: doc.id,
    regulator: doc.regulator,
    title: doc.metadata.title,
    score: cosineSimilarity(queryVector, doc.tfidf),
    snippet: doc.text.substring(0, 300) + '...',
    source_url: doc.metadata.source_url,
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topK).filter((r) => r.score > 0.05);
}

// === Index a single document ===
export async function indexDocumentLocally(doc: Omit<VectorDocument, 'tokens' | 'tfidf' | 'magnitude'>): Promise<void> {
  const tokens = tokenize(doc.text);
  const tf = computeTF(tokens);
  const allDocs = await localGetAll<VectorDocument>('rag_embeddings');
  const allTokens = allDocs.map((d) => d.tokens);
  allTokens.push(tokens);
  const idf = computeIDF(allTokens);

  const tfidf = Object.keys(idf).map((term) => (tf[term] || 0) * (idf[term] || 0));
  const magnitude = Math.sqrt(tfidf.reduce((sum, v) => sum + v * v, 0));

  const vectorDoc: VectorDocument = {
    ...doc,
    tokens,
    tfidf,
    magnitude,
  };

  await localBulkPut('rag_embeddings', [vectorDoc as unknown as Record<string, unknown>]);
  await buildGlobalVocabulary();
}

// === Batch index documents ===
export async function indexDocumentsLocally(docs: Omit<VectorDocument, 'tokens' | 'tfidf' | 'magnitude'>[]): Promise<void> {
  const vectorDocs: VectorDocument[] = [];
  const allTokens: string[][] = [];

  // First pass: tokenize all
  for (const doc of docs) {
    const tokens = tokenize(doc.text);
    allTokens.push(tokens);
  }

  const idf = computeIDF(allTokens);

  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    const tokens = allTokens[i];
    const tf = computeTF(tokens);
    const tfidf = Object.keys(idf).map((term) => (tf[term] || 0) * (idf[term] || 0));
    const magnitude = Math.sqrt(tfidf.reduce((sum, v) => sum + v * v, 0));

    vectorDocs.push({
      ...doc,
      tokens,
      tfidf,
      magnitude,
    });
  }

  await localBulkPut('rag_embeddings', vectorDocs as unknown as Record<string, unknown>[]);
  await buildGlobalVocabulary();
}

// === Get stats ===
export async function getVectorStoreStats(): Promise<{
  totalDocuments: number;
  vocabularySize: number;
  regulators: string[];
}> {
  const docs = await localGetAll<VectorDocument>('rag_embeddings');
  const regulators = [...new Set(docs.map((d) => d.regulator))];
  return {
    totalDocuments: docs.length,
    vocabularySize: globalVocabulary.length,
    regulators,
  };
}

// === Seed with KOS Regulatory Data (6 régulateurs africains) ===
export async function seedRegulatoryVectorStore(): Promise<void> {
  const existingDocs = await localGetAll<VectorDocument>('rag_embeddings');
  if (existingDocs.length > 0) return; // Already seeded

  const seedDocs: Omit<VectorDocument, 'tokens' | 'tfidf' | 'magnitude'>[] = [
    // BCEAO
    {
      id: 'bceao-circulaire-01-2017',
      regulator: 'BCEAO',
      text: 'Circulaire n°01-2017/CB/C du 16 janvier 2017 relative à la gouvernance des établissements de crédit et des systèmes financiers décentralisés de l\'UMOA. Cette circulaire fixe les règles de gouvernance applicables aux organes de direction, au conseil d\'administration, aux comités spécialisés, à l\'indépendance des administrateurs et à la protection des lanceurs d\'alerte dans les établissements assujettis.',
      metadata: { title: 'Circulaire 01-2017/CB/C — Gouvernance des Établissements', source_url: 'https://www.bceao.int/fr/reglementation', type: 'Circulaire', number: '01-2017/CB/C', date: '2017-01-16', status: 'En vigueur' },
    },
    {
      id: 'bceao-dispositif-prudentiel',
      regulator: 'BCEAO',
      text: 'Dispositif prudentiel applicable aux établissements de crédit et aux compagnies financières de l\'UMOA. Il couvre les exigences de fonds propres (Pilier 1), le processus de surveillance prudentielle (Pilier 2), la discipline de marché (Pilier 3), les normes de gestion des risques, le ratio de solvabilité, le ratio de liquidité, le ratio de levier et les exigences de publication.',
      metadata: { title: 'Dispositif Prudentiel UMOA — Bâle II/III', source_url: 'https://www.bceao.int/fr/reglementation', type: 'Dispositif', number: 'DP-UMOA', date: '2018-01-01', status: 'En vigueur' },
    },
    // COBAC
    {
      id: 'cobac-r-2016-01',
      regulator: 'COBAC',
      text: 'Règlement COBAC R-2016/01 relatif à l\'organisation du contrôle interne dans les établissements de crédit de la CEMAC. Ce règlement définit le dispositif de contrôle interne, les fonctions de contrôle permanentes et périodiques, la cartographie des risques, le rapport sur le contrôle interne et les obligations de déclaration à la COBAC.',
      metadata: { title: 'Règlement COBAC R-2016/01 — Contrôle Interne', source_url: 'https://www.beac.int/fr/reglementation', type: 'Règlement', number: 'R-2016/01', date: '2016-01-01', status: 'En vigueur' },
    },
    {
      id: 'cobac-directive-2027',
      regulator: 'COBAC',
      text: 'Directive COBAC 2027 relative à la résilience opérationnelle et à la cybersécurité des établissements de crédit de la CEMAC. Cette directive transpose le cadre DORA au contexte CEMAC. Elle couvre la gouvernance cyber, la protection des systèmes d\'information, la détection des incidents, la continuité d\'activité, les tests de résilience et la notification des incidents sous 4 heures.',
      metadata: { title: 'Directive COBAC 2027 — Résilience Opérationnelle & Cybersécurité', source_url: 'https://www.beac.int/fr/reglementation', type: 'Directive', number: '2027', date: '2026-01-01', status: 'En projet' },
    },
    // OHADA
    {
      id: 'ohada-auscgie',
      regulator: 'OHADA',
      text: 'Acte Uniforme OHADA relatif au droit des sociétés commerciales et du groupement d\'intérêt économique (AUSCGIE). Il régit la constitution, le fonctionnement et la dissolution des sociétés commerciales dans les 17 États parties au Traité OHADA. Il couvre la gouvernance d\'entreprise, les droits des actionnaires, les obligations des dirigeants et les contrôles légaux.',
      metadata: { title: 'Acte Uniforme OHADA — AUSCGIE — Droit des Sociétés', source_url: 'https://www.ohada.org/fr/actes-uniformes', type: 'Acte Uniforme', number: 'AUSCGIE', date: '2014-01-30', status: 'En vigueur' },
    },
    // GAFI
    {
      id: 'gafi-r15-2019',
      regulator: 'GAFI',
      text: 'Recommandation 15 du GAFI révisée en 2019 relative aux nouvelles technologies. Elle exige que les pays et les institutions financières identifient et évaluent les risques de blanchiment de capitaux et de financement du terrorisme liés au développement de nouveaux produits, pratiques commerciales et technologies, y compris les actifs virtuels et les prestataires de services sur actifs numériques (PSAN).',
      metadata: { title: 'GAFI — Recommandation 15 (rév. 2019) — Nouvelles Technologies', source_url: 'https://www.fatf-gafi.org/fr/recommandations', type: 'Recommandation', number: 'R.15', date: '2019-06-21', status: 'En vigueur' },
    },
    // CIMA
    {
      id: 'cima-code-assurances',
      regulator: 'CIMA',
      text: 'Code CIMA des assurances applicable dans les 14 États membres de la zone CIMA. Il régit l\'ensemble des opérations d\'assurance et de réassurance, le contrôle des sociétés d\'assurance, la protection des assurés, les exigences de solvabilité et les règles de gouvernance des organismes assureurs.',
      metadata: { title: 'Code CIMA — Code des Assurances', source_url: 'https://www.cima-afrique.org/fr', type: 'Code', number: 'CIMA', date: '2011-01-01', status: 'En vigueur' },
    },
    // COSUMAF
    {
      id: 'cosumaf-rg-general',
      regulator: 'COSUMAF',
      text: 'Règlement Général de la COSUMAF organisant le marché financier de l\'Afrique Centrale. Il couvre l\'agrément des acteurs du marché, les offres publiques, la gestion de portefeuille, les OPCVM, la tenue de marché, la compensation et le règlement-livraison des titres.',
      metadata: { title: 'COSUMAF — Règlement Général du Marché Financier CEMAC', source_url: 'https://cosumaf.org/fr/reglementation', type: 'Règlement', number: 'RG-COSUMAF', date: '2019-01-01', status: 'En vigueur' },
    },
    // AMF-UEMOA
    {
      id: 'crepmf-instruction-01',
      regulator: 'AMF-UEMOA',
      text: 'Instruction AMF-UEMOA relative à l\'agrément des sociétés de gestion et d\'intermédiation (SGI) sur le marché financier de l\'UMOA. Elle fixe les conditions d\'agrément, le capital minimum, les règles de bonne conduite, les obligations déclaratives et le contrôle des SGI.',
      metadata: { title: 'AMF-UEMOA — Instruction Agrément SGI — Marché Financier UMOA', source_url: 'https://www.crepmf.org/fr/reglementation', type: 'Instruction', number: '01/AMF-UEMOA', date: '2020-01-01', status: 'En vigueur' },
    },
  ];

  await indexDocumentsLocally(seedDocs);
}



