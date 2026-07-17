import { Evidence, RegulatoryIntent, RankingFactors, SourcePriority } from '../types';
import { regulatoryEvidences } from '../data/mockData';
import { OntoExpansionResult } from './OntologyEngine';

interface RAGResult extends Evidence {
  finalScore: number;
  rankingFactors: RankingFactors;
}

export interface RAGQueryResult {
  results: RAGResult[];
  ontologyTerms: string[];
  totalCandidates: number;
  rerankedCount: number;
}

const PRIORITY_AUTHORITY_SCORES: Record<SourcePriority, number> = {
  1: 1.0,
  2: 0.9,
  3: 0.85,
  4: 0.75,
  5: 0.55,
  6: 0.35,
};

export class RAGEngine {
  private corpus: Evidence[];

  constructor(corpus?: Evidence[]) {
    this.corpus = corpus || regulatoryEvidences;
  }

  query(
    queryText: string,
    intent: RegulatoryIntent,
    ontologyTerms: string[],
  ): RAGQueryResult {
    const queryLower = queryText.toLowerCase();
    const queryTokens = this.tokenize(queryLower);

    const candidates = this.corpus.map(evidence => {
      const vectorSim = this.computeVectorSim(queryText, evidence);
      const bm25 = this.computeBM25(queryTokens, evidence);
      return { evidence, vectorSim, bm25 };
    });

    const filtered = candidates
      .filter(c => c.vectorSim > 0.1 || c.bm25 > 0.05)
      .sort((a, b) => b.vectorSim - a.vectorSim)
      .slice(0, 50);

    const reranked: RAGResult[] = filtered.map(c => {
      const factors = this.computeRankingFactors(
        c.vectorSim,
        c.bm25,
        c.evidence,
        intent,
      );

      return {
        ...c.evidence,
        finalScore: factors.total,
        rankingFactors: factors,
      };
    });

    reranked.sort((a, b) => b.finalScore - a.finalScore);
    const top10 = reranked.slice(0, 10);

    return {
      results: top10,
      ontologyTerms,
      totalCandidates: this.corpus.length,
      rerankedCount: filtered.length,
    };
  }

  private computeVectorSim(query: string, evidence: Evidence): number {
    const queryLower = query.toLowerCase();
    const titleLower = evidence.title.toLowerCase();
    const extraitLower = evidence.extrait.toLowerCase();

    let score = 0;

    const queryTerms = this.tokenize(queryLower);
    const textTokens = new Set([
      ...this.tokenize(titleLower),
      ...this.tokenize(extraitLower),
    ]);

    let matchCount = 0;
    queryTerms.forEach(term => {
      if (textTokens.has(term)) matchCount += 1;
      if (titleLower.includes(term)) matchCount += 2;
      if (extraitLower.includes(term)) matchCount += 1;
    });

    score = matchCount / Math.max(queryTerms.length * 4, 1);

    if (evidence.jurisdiction === 'BCEAO' || evidence.jurisdiction === 'UEMOA') score *= 1.15;
    if (evidence.type === 'Regulateur' || evidence.type === 'Instruction') score *= 1.2;

    return Math.min(score, 1.0);
  }

  private computeBM25(tokens: string[], evidence: Evidence): number {
    const text = `${evidence.title} ${evidence.extrait}`.toLowerCase();
    const textTokens = this.tokenize(text);

    const k1 = 1.5;
    const b = 0.75;
    const avgDocLength = 120;
    const docLength = textTokens.length;

    let score = 0;
    const uniqueTokens = new Set(tokens);

    uniqueTokens.forEach(token => {
      const tf = textTokens.filter(t => t === token).length;
      if (tf === 0) return;

      const df = this.corpus.filter(c =>
        `${c.title} ${c.extrait}`.toLowerCase().includes(token)
      ).length + 1;

      const N = this.corpus.length;
      const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
      const numerator = tf * (k1 + 1);
      const denominator = tf + k1 * (1 - b + b * (docLength / avgDocLength));

      score += idf * (numerator / denominator);
    });

    return Math.min(score / 8, 1.0);
  }

  private computeRankingFactors(
    vectorSim: number,
    bm25: number,
    evidence: Evidence,
    intent: RegulatoryIntent,
  ): RankingFactors & { total: number } {
    const safePriority = typeof evidence.priority === 'number' && evidence.priority >= 1 && evidence.priority <= 6
      ? evidence.priority
      : 3;
    const autoriteScore = PRIORITY_AUTHORITY_SCORES[safePriority as SourcePriority] || 0.5;
    const safeFraicheur = typeof evidence.fraicheur === 'number' && !isNaN(evidence.fraicheur) ? evidence.fraicheur : 0.5;
    const safeCitations = typeof evidence.citations === 'number' ? evidence.citations : 0;
    const safeJurisdiction = evidence.jurisdiction || 'BCEAO';
    const targetJurisdiction = intent?.juridiction || 'BCEAO';

    const jurisdictionScore = safeJurisdiction === targetJurisdiction ? 1.0 :
      (safeJurisdiction === 'UEMOA' && targetJurisdiction === 'BCEAO') ? 0.7 :
      (safeJurisdiction === 'CEMAC' && targetJurisdiction === 'COBAC') ? 0.7 :
      safeJurisdiction === 'GAFI' ? 0.55 : 0.25;
    const fraicheurScore = safeFraicheur;
    const applicabiliteScore = this.computeApplicabilite(evidence, intent);
    const densiteCitations = Math.min(safeCitations / 20, 1.0);
    const qualiteDoc = this.computeQualiteDoc(evidence);

    const factors: RankingFactors = {
      vectorSim: typeof vectorSim === 'number' && !isNaN(vectorSim) ? vectorSim : 0.3,
      bm25: typeof bm25 === 'number' && !isNaN(bm25) ? bm25 : 0.2,
      autorite: autoriteScore,
      juridiction: jurisdictionScore,
      fraicheur: fraicheurScore,
      applicabilite: applicabiliteScore,
      densiteCitations,
      qualiteDoc,
    };

    const total =
      0.20 * factors.vectorSim +
      0.15 * factors.bm25 +
      0.15 * autoriteScore +
      0.15 * jurisdictionScore +
      0.10 * fraicheurScore +
      0.10 * applicabiliteScore +
      0.10 * densiteCitations +
      0.05 * qualiteDoc;

    return { ...factors, total: Math.round(total * 1000) / 1000 };
  }

  private computeApplicabilite(evidence: Evidence, intent: RegulatoryIntent): number {
    let score = 0.5;
    const text = `${evidence.title} ${evidence.extrait}`.toLowerCase();

    const keywords: Record<string, string[]> = {
      'LCB-FT': ['blanchiment', 'lcb', 'ft', 'terrorisme', 'suspect', 'gel'],
      'Contrôle interne': ['contrôle', 'coso', 'audit', 'procédure'],
      'Compliance': ['conformité', 'compliance', 'iso'],
      'Gouvernance': ['gouvernance', 'conseil', 'administrateur', 'comité'],
      'Risques': ['risque', 'cartographie', 'erm', 'appétence'],
      'Cybersécurité': ['cyber', 'nist', 'sécurité', '27001'],
      'ESG': ['esg', 'durabilité', 'climat', 'csrd'],
    };

    const domaineKeywords = keywords[intent.domaine] || [];
    domaineKeywords.forEach(kw => {
      if (text.includes(kw)) score += 0.1;
    });

    return Math.min(score, 1.0);
  }

  private computeQualiteDoc(evidence: Evidence): number {
    let score = 0.6;

    if (evidence.type === 'Regulateur' || evidence.type === 'Instruction') score += 0.25;
    else if (evidence.type === 'Loi' || evidence.type === 'Norme') score += 0.15;
    else if (evidence.type === 'Universite') score -= 0.1;

    if (evidence.fraicheur > 0.9) score += 0.1;
    if (evidence.citations > 15) score += 0.1;

    return Math.min(Math.max(score, 0), 1.0);
  }

  private tokenize(text: string): string[] {
    const stopWords = new Set([
      'de', 'du', 'des', 'le', 'la', 'les', 'et', 'en', 'un', 'une',
      'à', 'au', 'aux', 'pour', 'par', 'sur', 'dans', 'avec', 'est',
      'the', 'of', 'in', 'and', 'to', 'a', 'for', 'on', 'with', 'is',
    ]);

    return text
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 1 && !stopWords.has(t));
  }
}