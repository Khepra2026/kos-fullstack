export interface RagDocument {
  id: string;
  titre: string;
  domaine: string;
  sous_domaine: string;
  pays: string;
  organisation: string;
  statut: string;
  description: string;
  mots_cles: string[];
  type_document: string;
  content?: string;
  similarity: number;
}

export interface AutomatonSearchResponse {
  success: boolean;
  operation: string;
  results: RagDocument[];
  query: string;
  method: string;
  engine: string;
  total_documents: number;
  threshold_applied?: number;
  documents_searched?: number;
  note?: string;
}

export interface AutomatonSummarizeResponse {
  success: boolean;
  operation: string;
  summary: string;
  keywords: string[];
  method: string;
  engine: string;
}

export interface PinnedSearch {
  id: string;
  query: string;
  summary: string;
  keywords: string[];
  timestamp: number;
  docCount: number;
}



