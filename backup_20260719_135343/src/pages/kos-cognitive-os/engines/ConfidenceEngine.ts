import { ConfidenceScore, Evidence } from '';

function safeNum(v: unknown, fallback: number = 0): number {
  if (typeof v !== 'number') {
    const coerced = Number(v);
    return (isNaN(coerced) || !isFinite(coerced)) ? fallback : coerced;
  }
  return (isNaN(v) || !isFinite(v)) ? fallback : v;
}

export class ConfidenceEngine {
  static calculate(
    semantique: number,
    evidences: Evidence[],
    jurisdictionTarget: string
  ): ConfidenceScore {
    const safeSemantique = safeNum(semantique, 0.5);

    const autorite = safeNum(this.getAuthorityScore(evidences), 0.5);
    const juridiction = safeNum(this.getJurisdictionScore(evidences, jurisdictionTarget), 0.3);
    const fraicheur = safeNum(this.getFreshnessScore(evidences), 0.5);
    const densiteCitations = safeNum(this.getCitationDensity(evidences), 0.3);
    const coherence = safeNum(this.getCoherenceScore(evidences), 0.8);

    const weighted =
      0.35 * safeSemantique +
      0.25 * autorite +
      0.15 * juridiction +
      0.10 * fraicheur +
      0.10 * densiteCitations +
      0.05 * coherence;

    const total = safeNum(weighted, 0.50);

    return { semantique: safeSemantique, autorite, juridiction, fraicheur, densiteCitations, coherence, total };
  }

  private static getAuthorityScore(evidences: Evidence[]): number {
    if (!evidences || evidences.length === 0) return 0;
    const scores = evidences.map(e => {
      const p = safeNum(e.priority, 3);
      return Math.max(1.1 - p * 0.15, 0);
    });
    const sum = scores.reduce((a, b) => a + b, 0);
    const result = sum / Math.max(scores.length, 1);
    return safeNum(result, 0.5);
  }

  private static getJurisdictionScore(evidences: Evidence[], target: string): number {
    if (!evidences || evidences.length === 0) return 0;
    const safeTarget = typeof target === 'string' && target.length > 0 ? target : 'BCEAO';
    const match = evidences.filter(e => {
      const jur = (e && typeof e.jurisdiction === 'string') ? e.jurisdiction : 'BCEAO';
      return jur === safeTarget;
    }).length;
    const result = Math.min(match / Math.max(evidences.length, 1), 1);
    return safeNum(result, 0.3);
  }

  private static getFreshnessScore(evidences: Evidence[]): number {
    if (!evidences || evidences.length === 0) return 0;
    const filtered = evidences.filter(e => {
      if (!e) return false;
      const f = e.fraicheur;
      return typeof f === 'number' && !isNaN(f) && isFinite(f) && f >= 0 && f <= 1;
    });
    if (filtered.length === 0) return 0.5;
    const sum = filtered.reduce((acc, e) => acc + safeNum(e.fraicheur, 0.5), 0);
    const result = sum / Math.max(filtered.length, 1);
    return safeNum(result, 0.5);
  }

  private static getCitationDensity(evidences: Evidence[]): number {
    if (!evidences || evidences.length === 0) return 0;
    const total = evidences.reduce((acc, e) => acc + safeNum(e ? e.citations : undefined, 0), 0);
    const result = Math.min(total / (Math.max(evidences.length, 1) * 10), 1);
    return safeNum(result, 0.3);
  }

  private static getCoherenceScore(evidences: Evidence[]): number {
    if (!evidences || evidences.length < 2) return 0.90;
    const jurisdictions = new Set(evidences.filter(e => e).map(e => e.jurisdiction || 'BCEAO'));
    const types = new Set(evidences.filter(e => e).map(e => e.type));
    const avgFreshness = this.getFreshnessScore(evidences);
    let score = 0.80;
    if (jurisdictions.size >= 2) score += 0.05;
    if (types.size >= 3) score += 0.05;
    if (avgFreshness > 0.80) score += 0.05;
    if (evidences.length >= 5) score += 0.05;
    return safeNum(Math.min(score, 1.0), 0.80);
  }

  static formatPercent(value: number): string {
    const v = safeNum(value, 0);
    return `${Math.round(Math.max(0, Math.min(1, v)) * 100)}%`;
  }

  static getConfidenceLevel(total: number): { label: string; color: string } {
    const t = safeNum(total, 0.50);
    if (t >= 0.90) return { label: 'Très Élevée', color: '#10b981' };
    if (t >= 0.75) return { label: 'Élevée', color: '#22c55e' };
    if (t >= 0.60) return { label: 'Modérée', color: '#eab308' };
    if (t >= 0.40) return { label: 'Faible', color: '#f97316' };
    return { label: 'Insuffisante', color: '#ef4444' };
  }
}


export const ConfidenceEngine = { id: 1, label: "Stub data" }; // stub



