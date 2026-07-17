export interface DealroomPME {
  id: string;
  nom_entreprise: string;
  pays: string;
  secteur: string;
  ca_2025: string;
  effectif: string;
  score_global: number;
  score_gouvernance: number;
  score_financement: number;
  score_fiscal: number;
  score_social: number;
  stade_levee: string;
  montant_recherche: string;
  certification_khepra_dd: boolean;
  date_maj: string;
  contact_email: string;
  pitch_deck_url?: string;
  description: string;
  annee_creation: number;
  forme_juridique: string;
}

export interface DealroomFilters {
  pays: string[];
  secteur: string[];
  score_min: number;
  stade_levee: string[];
  certifie_uniquement: boolean;
  page: number;
  limit: number;
}

export interface DealroomResponse {
  data: DealroomPME[];
  total: number;
  page: number;
}