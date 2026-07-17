import { KOSContent } from '@/types/kos';

export interface BrandScore {
  conformite: number;
  tonalite: number;
  charteGraphique: number;
  messageCle: number;
  issues: string[];
}

export function useBrandAgent() {
  const evaluate = async (_content: Partial<KOSContent>): Promise<BrandScore> => {
    return {
      conformite: 0.98,
      tonalite: 0.96,
      charteGraphique: 1.0,
      messageCle: 0.97,
      issues: [],
    };
  };

  return { evaluate };
}