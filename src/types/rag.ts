export type StatutProvenance = 'valide' | 'rejete' | 'a_verifier';

export interface Provenance {
  source: string;
  document_id: string;
  statut: StatutProvenance;
  grounding_score: number;
  url?: string;
  date?: string;
}
