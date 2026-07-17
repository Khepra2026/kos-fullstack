export type RegulationSource =
  | 'BCEAO' | 'COBAC' | 'BEAC' | 'OHADA' | 'UEMOA' | 'CEMAC'
  | 'GIABA' | 'GAFI' | 'IFRS' | 'ISSB' | 'ESG' | 'IA' | 'cybersécurité';

export type Channel =
  | 'web' | 'blog' | 'linkedin' | 'facebook' | 'instagram' | 'x'
  | 'gbp' | 'youtube' | 'threads' | 'tiktok' | 'newsletter' | 'rss' | 'email';

export type ContentType =
  | 'institutionnel' | 'leadership' | 'veille' | 'commercial' | 'ads' | 'leadmagnet';

export interface BigFourScores {
  sourcesOfficielles: boolean;
  coherenceReglementaire: number;
  conformiteJuridique: boolean;
  conformiteMarque: number;
  scoreSEO: number;
  scoreLisibilite: number;
  scoreIA: number;
  scoreRisque: number;
  scoreQualite: number;
  auditId: string;
  timestamp: string;
  version: string;
}

export interface KOSContent {
  id: string;
  type: ContentType;
  title: string;
  body: string;
  hook: string;
  contexte: string;
  problematique: string;
  analyse: string;
  recommandations: string[];
  valeurAjoutee: string;
  cta: string;
  faq: { q: string; a: string }[];
  images: { url: string; alt: string }[];
  tables: Record<string, unknown>[];
  infographies: string[];
  bibliography: string[];
  sources: string[];
  version: string;
}

export interface SEOData {
  titleSEO: string;
  metaDescription: string;
  slug: string;
  keywords: string[];
  faq: { q: string; a: string }[];
  schema: Record<string, unknown>;
  og: Record<string, unknown>;
  twitterCard: string;
  canonical: string;
  altImages: string[];
  internalLinks: { url: string; anchor: string; score: number }[];
}

export interface PipelineTrigger {
  id: string;
  type: 'NEW_REGULATION' | 'MANUAL';
  payload: {
    source: RegulationSource;
    docId: string;
    rawText?: string;
  };
}

export interface PipelineResult {
  status: 'SUCCESS' | 'FAILED';
  audit: BigFourScores;
  results: {
    channel: Channel;
    status: 'OK' | 'FAILED';
    id?: string;
    url?: string;
    error?: string;
  }[];
}