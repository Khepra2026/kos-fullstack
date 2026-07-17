export type Jurisdiction = 'BCEAO' | 'COBAC' | 'OHADA' | 'GAFI' | 'UEMOA' | 'CEMAC' | 'EU' | 'US' | 'ISO' | 'NIST' | 'Local';
export type Metier = 'Audit interne' | 'Compliance' | 'Risques' | 'Gouvernance' | 'Contrôle interne' | 'Finance';
export type SourcePriority = 1 | 2 | 3 | 4 | 5 | 6;

export interface RegulatoryIntent {
  domaine: string;
  metier: Metier;
  juridiction: Jurisdiction;
  referentiels: string[];
  obligations: string[];
}

export interface Evidence {
  id: string;
  type: 'Regulateur' | 'Loi' | 'Instruction' | 'Norme' | 'BigFour' | 'Universite';
  priority: SourcePriority;
  title: string;
  url: string;
  jurisdiction: Jurisdiction;
  fraicheur: number;
  citations: number;
  extrait: string;
  score?: number;
}

export interface ConfidenceScore {
  semantique: number;
  autorite: number;
  juridiction: number;
  fraicheur: number;
  densiteCitations: number;
  coherence: number;
  total: number;
}

export interface KPISearch {
  semanticPrecision: number;
  regulatoryPrecision: number;
  authorityScore: number;
  jurisdictionMatch: number;
  explainability: number;
  confidence: number;
  hallucinationRisk: number;
  evidenceCoverage: number;
  nan: number;
  latence: number;
}

export interface RegTechResponse {
  synthese: string;
  obligations: string[];
  referentiels: { name: string; autorite: number }[];
  ecarts: string[];
  risque: 'Faible' | 'Modéré' | 'Élevé' | 'Critique';
  recommandations: string[];
  planActions: string[];
  sources: Evidence[];
  confidence: ConfidenceScore;
  evidenceChainValid: boolean;
}

export interface RankingFactors {
  vectorSim: number;
  bm25: number;
  autorite: number;
  juridiction: number;
  fraicheur: number;
  applicabilite: number;
  densiteCitations: number;
  qualiteDoc: number;
}