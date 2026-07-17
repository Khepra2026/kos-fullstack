import { Evidence, SourcePriority } from '../types';

const PRIORITY_MAP: Record<Evidence['type'], SourcePriority> = {
  'Regulateur': 1,
  'Loi': 2,
  'Instruction': 3,
  'Norme': 4,
  'BigFour': 5,
  'Universite': 6,
};

const JURISDICTION_BOOST: Record<string, number> = {
  'BCEAO': 0.35,
  'COBAC': 0.32,
  'GAFI': 0.30,
  'OHADA': 0.28,
  'UEMOA': 0.25,
  'CEMAC': 0.25,
  'EU': 0.15,
  'US': 0.10,
  'ISO': 0.22,
  'NIST': 0.18,
  'Local': 0.12,
};

export class JurisdictionPriorityEngine {
  static rank(evidences: Evidence[], targetJurisdiction?: string): Evidence[] {
    return evidences
      .map(e => {
        const priority = PRIORITY_MAP[e.type] || 6;
        const jurisdictionBoost = targetJurisdiction && e.jurisdiction === targetJurisdiction
          ? 0.15
          : 0;
        const baseScore = 1.0 - priority * 0.12;
        const finalScore = Math.min(baseScore + jurisdictionBoost + (e.fraicheur * 0.1), 1.0);
        return { ...e, priority, score: finalScore };
      })
      .sort((a, b) => (b.score || 0) - (a.score || 0));
  }

  static validateEvidenceChain(evidences: Evidence[]): boolean {
    const regCount = evidences.filter(e => (e.priority || PRIORITY_MAP[e.type]) <= 3).length;
    const normeCount = evidences.filter(e => e.type === 'Norme').length;
    const metierCount = evidences.filter(e => e.type === 'BigFour').length;
    return regCount >= 2 && normeCount >= 1 && metierCount >= 1;
  }

  static getPriorityLabel(priority: SourcePriority): string {
    const labels: Record<SourcePriority, string> = {
      1: 'Tier 0 — Régulateur Primaire',
      2: 'Tier 1 — Loi',
      3: 'Tier 1 — Instruction',
      4: 'Tier 2 — Norme Internationale',
      5: 'Tier 2 — Big Four',
      6: 'Tier 3 — Académique',
    };
    return labels[priority];
  }

  static getJurisdictionBoost(jurisdiction: string): number {
    return JURISDICTION_BOOST[jurisdiction] || 0.10;
  }
}