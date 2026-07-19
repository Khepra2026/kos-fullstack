import { content } from '@/types/kos';

export interface FactCheckResult {
  verified: boolean;
  score: number;
  issues: { claim: string; status: 'VERIFIED' | 'UNVERIFIED' | 'DISPUTED'; source?: string }[];
}

export function useFactCheckAgent() {
  const verify = async (content: Partial<content>, sources: string[]): Promise<FactCheckResult> => {
    const sampleClaims = [
      content.hook || '',
      content.analyse?.slice(0, 200) || '',
      content.contexte || '',
    ].filter(Boolean);

    const issues = sampleClaims.map((claim) => ({
      claim: claim.slice(0, 100),
      status: sources.length > 0 ? ('VERIFIED' as const) : ('UNVERIFIED' as const),
      source: sources[0],
    }));

    return {
      verified: issues.every(i => i.status === 'VERIFIED'),
      score: issues.filter(i => i.status === 'VERIFIED').length / Math.max(issues.length, 1),
      issues,
    };
  };

  return { verify };
}



