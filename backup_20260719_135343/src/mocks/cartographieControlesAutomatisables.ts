export interface ControleCartographie {
  identifiant_unique: string;
  referentiel: 'COBAC' | 'BCEAO' | 'OHADA' | 'GIABA' | 'GABAC';
  code_domaine: string;
  nom_domaine: string;
  nom_controle: string;
  description_automatisation: string;
  type_automatisation: string;
  technologie_requise: string;
  complexite: string;
  effort_jh: number;
  roi_estime: string;
  priorite: string;
  statut_implementation: string;
  cout_estime_eur: number;
  gain_efficience_pct: number;
  reduction_risque_pct: number;
  livrable_attendu: string;
  sources_donnees: string[];
}

export interface CartographieMeta {
  totalControles: number;
  totalP0: number;
  totalP1: number;
  totalP2: number;
  referentiels: number;
  domaines: number;
  effortTotalJH: number;
  budgetTotalEUR: number;
  gainEfficienceMoyen: number;
  reductionRisqueMoyen: number;
}

export interface DomaineInfo {
  code_domaine: string;
  nom_domaine: string;
  referentiel: string;
}

export const DOMAINES_MAP: Record<string, Record<string, string>> = {
  COBAC: {
    '01': 'Gouvernance', '02': 'Gestion des Risques', '03': 'Contrôle Interne',
    '04': 'Audit Interne', '05': 'Conformité', '06': 'LBC/FT',
    '07': 'Cybersécurité', '08': 'Gouvernance Données', '09': 'ESG',
    '10': 'Prudentiel', '11': 'Comptabilité', '12': 'Reporting',
    '13': 'Inspection COBAC', '14': 'Politiques Internes', '15': 'Preuves',
    '16': 'KPI Conformité', '17': 'Contrôles Auto', '18': 'Actions Correctives',
    '19': 'Références', '20': 'Historique'
  },
  BCEAO: {
    '01': 'Gouvernance', '02': 'Risques', '03': 'Contrôle Interne',
    '04': 'Audit Interne', '05': 'Conformité', '06': 'LBC/FT',
    '07': 'Cybersécurité', '08': 'Gouvernance Données', '09': 'ESG',
    '10': 'Prudentiel', '11': 'Comptabilité', '12': 'Reporting',
    '13': 'Inspection CB', '14': 'Politiques Internes', '15': 'Preuves',
    '16': 'KPI Conformité', '17': 'Contrôles Auto', '18': 'Actions Correctives',
    '19': 'Références', '20': 'Historique'
  },
  OHADA: {
    '01': 'Gouvernance OHADA', '02': 'Droit Sociétés', '03': 'Sûretés',
    '04': 'Procédures Collectives', '05': 'Droit Comptable', '06': 'LBC/FT',
    '07': 'Arbitrage', '08': 'Recouvrement', '09': 'Marchés Financiers',
    '10': 'Conformité', '11': 'Comptabilité', '12': 'Risques Juridiques',
    '13': 'Protection Données', '14': 'Politiques Internes', '15': 'Preuves',
    '16': 'KPI Conformité', '17': 'Contrôles Auto', '18': 'Actions Correctives',
    '19': 'Références', '20': 'Historique'
  },
  GIABA: {
    '01': 'Gouvernance LBC/FT', '02': 'KYC', '03': 'Déclaration Soupçon',
    '04': 'Gel Avoirs', '05': 'PEP', '06': 'Actifs Virtuels',
    '07': 'Évaluations Mutuelles', '08': 'Formation', '09': 'Archivage',
    '10': 'Contrôle Interne', '11': 'Correspondance Bancaire', '12': 'Transferts Électroniques',
    '13': 'OBNL', '14': 'Politiques', '15': 'Preuves',
    '16': 'KPI Conformité', '17': 'Contrôles Auto', '18': 'Actions Correctives',
    '19': 'Veille', '20': 'Traçabilité'
  },
  GABAC: {
    '01': 'Gouvernance CEMAC', '02': 'KYC', '03': 'Déclaration Soupçon',
    '04': 'Gel Avoirs', '05': 'NRA CEMAC', '06': 'Actifs Virtuels',
    '07': 'Coopération Internationale', '08': 'Formation', '09': 'Archivage',
    '10': 'Contrôle Interne', '11': 'Correspondance Bancaire', '12': 'Transferts Électroniques',
    '13': 'OBNL', '14': 'Politiques', '15': 'Preuves',
    '16': 'KPI Conformité', '17': 'Contrôles Auto', '18': 'Actions Correctives',
    '19': 'Veille', '20': 'Traçabilité'
  }
};

export const CARTOGRAPHIE_META: CartographieMeta = {
  totalControles: 102,
  totalP0: 27,
  totalP1: 53,
  totalP2: 22,
  referentiels: 5,
  domaines: 100,
  effortTotalJH: 2836,
  budgetTotalEUR: 942000,
  gainEfficienceMoyen: 78,
  reductionRisqueMoyen: 62,
};

export const COULEUR_REFERENTIEL: Record<string, string> = {
  COBAC: 'primary',
  BCEAO: 'accent',
  OHADA: 'secondary',
  GIABA: 'emerald',
  GABAC: 'amber',
};

export const COULEUR_PRIORITE: Record<string, string> = {
  'P0 - Critique': 'red',
  'P1 - Haute': 'amber',
  'P2 - Moyenne': 'secondary',
  'P3 - Basse': 'gray',
};



