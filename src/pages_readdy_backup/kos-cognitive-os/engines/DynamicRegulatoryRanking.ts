import { Evidence, RankingFactors } from '';

function safeNum(v: unknown, fallback: number = 0): number {
  const n = typeof v === 'number' ? v : Number(v);
  return isNaN(n) || !isFinite(n) ? fallback : n;
}

function safeStr(v: unknown, fallback: string = ''): string {
  return typeof v === 'string' ? v : fallback;
}

const JURISDICTION_SCORES: Record<string, number> = {
  'BCEAO': 0.95,
  'COBAC': 0.92,
  'GAFI': 0.90,
  'OHADA': 0.88,
  'UEMOA': 0.85,
  'CEMAC': 0.85,
  'ISO': 0.80,
  'NIST': 0.78,
  'EU': 0.70,
  'US': 0.65,
  'Local': 0.60,
};

const PRIORITY_AUTHORITY: Record<number, number> = {
  1: 1.00,
  2: 0.90,
  3: 0.85,
  4: 0.75,
  5: 0.55,
  6: 0.35,
};

const TYPE_QUALITY_BOOST: Record<string, number> = {
  'Regulateur': 0.30,
  'Instruction': 0.25,
  'Loi': 0.22,
  'Norme': 0.18,
  'BigFour': 0.10,
  'Universite': 0.00,
};

export class DynamicRegulatoryRanking {
  static rank(evidences: Evidence[], factors: RankingFactors[]): Evidence[] {
    if (!evidences || evidences.length === 0) return [];

    const scored = evidences.map((e, i) => {
      const f = factors[i] || this.getDefaultFactors(e);

      const score = safeNum(
        0.20 * safeNum(f.vectorSim, 0.3) +
        0.15 * safeNum(f.bm25, 0.2) +
        0.15 * safeNum(f.autorite, 0.3) +
        0.15 * safeNum(f.juridiction, 0.3) +
        0.10 * safeNum(f.fraicheur, 0.3) +
        0.10 * safeNum(f.applicabilite, 0.3) +
        0.10 * safeNum(f.densiteCitations, 0.2) +
        0.05 * safeNum(f.qualiteDoc, 0.3),
        0.25
      );

      return { ...e, score };
    });

    return scored.sort((a, b) => safeNum(b.score, 0) - safeNum(a.score, 0));
  }

  static generateFactors(evidences: Evidence[], query: string): RankingFactors[] {
    if (!evidences || evidences.length === 0) return [];

    const safeQuery = safeStr(query, '');
    const queryLower = safeQuery.toLowerCase();
    const queryTokens = queryLower
      .split(/[\s,;.]+/)
      .filter(w => w.length > 2)
      .map(w => w.toLowerCase());
    const uniqueTokens = [...new Set(queryTokens)];

    return evidences.map(e => {
      const titleLower = safeStr(e.title, '').toLowerCase();
      const extraitLower = safeStr(e.extrait, '').toLowerCase();
      const combinedText = `${titleLower} ${extraitLower}`;

      const keywordHits = uniqueTokens.filter(token =>
        combinedText.includes(token)
      ).length;

      const exactPhraseBoost = queryLower.length > 0 && combinedText.includes(queryLower) ? 0.20 : 0;
      const partialMatchRatio = uniqueTokens.length > 0
        ? keywordHits / uniqueTokens.length
        : 0;

      const vectorSim = safeNum(Math.min(
        0.30 + partialMatchRatio * 0.50 + exactPhraseBoost + (keywordHits >= 3 ? 0.10 : keywordHits >= 1 ? 0.05 : 0),
        0.98
      ), 0.3);

      const bm25 = safeNum(Math.min(
        0.20 + partialMatchRatio * 0.55 + (keywordHits >= 3 ? 0.10 : 0) + (exactPhraseBoost * 0.5),
        0.95
      ), 0.2);

      const autorite = safeNum(PRIORITY_AUTHORITY[safeNum(e.priority, 5)] || PRIORITY_AUTHORITY[5], 0.55);

      const juridiction = safeNum(JURISDICTION_SCORES[safeStr(e.jurisdiction, 'Local')] || JURISDICTION_SCORES['Local'], 0.50);

      const fraicheur = safeNum(e.fraicheur, 0.5);

      const applicabilite = keywordHits >= 4 ? 0.95 :
        keywordHits >= 3 ? 0.85 :
        keywordHits >= 2 ? 0.75 :
        keywordHits >= 1 ? 0.60 :
        0.45;

      const densiteCitations = safeNum(Math.min(safeNum(e.citations, 0) / 15, 0.95), 0.2);

      const qualiteDoc = safeNum(Math.min(
        0.50 + safeNum(TYPE_QUALITY_BOOST[safeStr(e.type, 'BigFour')] || TYPE_QUALITY_BOOST['BigFour'], 0) + fraicheur * 0.25 + (keywordHits > 0 ? 0.08 : 0),
        0.98
      ), 0.3);

      return {
        vectorSim: Math.round(vectorSim * 1000) / 1000,
        bm25: Math.round(bm25 * 1000) / 1000,
        autorite: Math.round(autorite * 1000) / 1000,
        juridiction: Math.round(juridiction * 1000) / 1000,
        fraicheur: Math.round(fraicheur * 1000) / 1000,
        applicabilite: Math.round(applicabilite * 1000) / 1000,
        densiteCitations: Math.round(densiteCitations * 1000) / 1000,
        qualiteDoc: Math.round(qualiteDoc * 1000) / 1000,
      };
    });
  }

  private static getDefaultFactors(evidence: Evidence): RankingFactors {
    return {
      vectorSim: 0.40,
      bm25: 0.30,
      autorite: safeNum(PRIORITY_AUTHORITY[safeNum(evidence.priority, 5)] || PRIORITY_AUTHORITY[5], 0.55),
      juridiction: safeNum(JURISDICTION_SCORES[safeStr(evidence.jurisdiction, 'Local')] || JURISDICTION_SCORES['Local'], 0.50),
      fraicheur: safeNum(evidence.fraicheur, 0.5),
      applicabilite: 0.55,
      densiteCitations: safeNum(Math.min(safeNum(evidence.citations, 0) / 15, 0.95), 0.2),
      qualiteDoc: safeNum(0.55 + safeNum(TYPE_QUALITY_BOOST[safeStr(evidence.type, 'BigFour')] || TYPE_QUALITY_BOOST['BigFour'], 0), 0.3),
    };
  }
}


export const DynamicRegulatoryRanking = { id: 1, label: "Stub data" }; // stub



