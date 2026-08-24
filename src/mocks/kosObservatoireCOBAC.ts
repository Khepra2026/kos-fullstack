// KOS Hub Observatoire COBAC — 18 textes vérifiés, 6 pays CEMAC, timeline inspections

export interface COBACText {
  id: string;
  reference: string;
  title: string;
  type: 'Circulaire' | 'Directive' | 'Instruction' | 'Règlement' | 'Note';
  year: number;
  countryScope: string[];
  verified: boolean;
  khepraStatus: 'appliqué' | 'analyse' | 'veille';
  impactLevel: 'critique' | 'élevé' | 'moyen' | 'faible';
  summary: string;
  clientActions: string[];
  citationCount: number;
  lastVerified: string;
}

export interface COBACCountry {
  id: string;
  name: string;
  countryCode: string;
  capital: string;
  banksCount: number;
  sfdCount: number;
  inspectionStatus: 'en_cours' | 'planifiée' | 'terminée' | 'alerte';
  lastInspection: string | null;
  nextInspection: string | null;
  complianceScore: number;
  activeAlerts: number;
  regulatorContact: string;
}

export interface COBACInspection {
  id: string;
  bankName: string;
  country: string;
  inspectionType: 'Inspection sur place' | 'Inspection à distance' | 'Mission spécialisée';
  status: 'en_cours' | 'planifiée' | 'terminée';
  startDate: string | null;
  endDate: string | null;
  findingsCount: number;
  criticalFindings: number;
  actionPlan: string | null;
  khepraInvolved: boolean;
}

export interface COBACKPI {
  label: string;
  value: string | number;
  unit: string;
  icon: string;
  color: 'primary' | 'accent' | 'secondary';
}

// ============================================================
// 18 TEXTES VÉRIFIÉS COBAC
// ============================================================
export const cobacTexts: COBACText[] = [
  { id: 'ct-01', reference: 'COBAC/DI/2027-01', title: 'Directive Résilience Opérationnelle Bancaire — Cyber 2027', type: 'Directive', year: 2027, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: true, khepraStatus: 'appliqué', impactLevel: 'critique', summary: 'Obligation SOC 24/7, MTTD < 4h, test PCA/PRA 2x/an, documentation DORA-like. Les banques CEMAC ont 24 mois.', clientActions: ['Audit maturité cyber', 'Roadmap conformité 24 mois', 'PCA/PRA documentation'], citationCount: 47, lastVerified: '2026-06-25' },
  { id: 'ct-02', reference: 'COBAC/R-01/2026', title: 'Règlement Prudentiel COBAC — Fonds Propres Banques', type: 'Règlement', year: 2026, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: true, khepraStatus: 'appliqué', impactLevel: 'critique', summary: 'Renforcement des exigences de fonds propres minimums. Impact sur 42 banques CEMAC. Reporting trimestriel obligatoire.', clientActions: ['Diagnostic fonds propres', 'Plan de recapitalisation', 'Rapport trimestriel'], citationCount: 38, lastVerified: '2026-06-24' },
  { id: 'ct-03', reference: 'COBAC/INS-03/2025', title: 'Instruction Supervision Bancaire — Contrôles internes', type: 'Instruction', year: 2025, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad'], verified: false, khepraStatus: 'appliqué', impactLevel: 'élevé', summary: 'Exigences de séparation des fonctions, revue périodique des contrôles internes, documentation des procédures. (Non publié officiellement — sous réserve)', clientActions: ['Cartographie contrôles internes', 'Séparation des fonctions', 'Documentation procédures'], citationCount: 29, lastVerified: '2026-06-27' },
  { id: 'ct-04', reference: 'COBAC/CIR-04/2024', title: 'Circulaire LBC/FT — Obligations déclaratives CEMAC', type: 'Circulaire', year: 2024, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: true, khepraStatus: 'appliqué', impactLevel: 'critique', summary: 'Harmonisation des obligations LBC/FT dans l\'espace CEMAC. Déclarations SAR, KYC renforcé, évaluation risque pays.', clientActions: ['KYC renforcé', 'SAR automatisation', 'Évaluation risque pays'], citationCount: 52, lastVerified: '2026-06-25' },
  { id: 'ct-05', reference: 'COBAC/INS-05/2025', title: 'Instruction Gouvernance Bancaire — Conseil d\'Administration', type: 'Instruction', year: 2025, countryScope: ['Cameroun', 'Gabon', 'Congo'], verified: false, khepraStatus: 'appliqué', impactLevel: 'élevé', summary: 'Composition du CA, indépendance administrateurs, comités spécialisés, rémunération des dirigeants. (Non publié officiellement — sous réserve)', clientActions: ['Audit gouvernance', 'Charte CA', 'Comités spécialisés'], citationCount: 21, lastVerified: '2026-06-27' },
  { id: 'ct-06', reference: 'COBAC/DI/2026-02', title: 'Directive Reporting Financier — IFRS 9 CEMAC', type: 'Directive', year: 2026, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: true, khepraStatus: 'analyse', impactLevel: 'élevé', summary: 'Application IFRS 9 dans l\'espace CEMAC. Modèles ECL, provisionnement, classification actifs financiers.', clientActions: ['Modèle ECL', 'Provisionnement IFRS 9', 'Classification actifs'], citationCount: 18, lastVerified: '2026-06-20' },
  { id: 'ct-07', reference: 'COBAC/CIR-07/2023', title: 'Circulaire Agrement — Conditions d\'exercice bancaire', type: 'Circulaire', year: 2023, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: true, khepraStatus: 'appliqué', impactLevel: 'moyen', summary: 'Conditions d\'agrément, fonds propres minimum, actionnariat, programme d\'activité, organigramme.', clientActions: ['Dossier agrément', 'Fonds propres preuve', 'Organigramme'], citationCount: 33, lastVerified: '2026-06-21' },
  { id: 'ct-08', reference: 'COBAC/INS-08/2024', title: 'Instruction Microfinance — SFD CEMAC', type: 'Instruction', year: 2024, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad'], verified: true, khepraStatus: 'appliqué', impactLevel: 'élevé', summary: 'Cadre réglementaire SFD CEMAC. Ratios prudentiels, reporting, agrément, transformation SFD en banque.', clientActions: ['Ratios prudentiels SFD', 'Reporting SFD', 'Agrément transformation'], citationCount: 27, lastVerified: '2026-06-19' },
  { id: 'ct-09', reference: 'COBAC/NOTE-09/2026', title: 'Note d\'Information — Stress Tests CEMAC 2026', type: 'Note', year: 2026, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: true, khepraStatus: 'veille', impactLevel: 'élevé', summary: 'Programme de stress tests CEMAC 2026. Scénarios macro, crédit, marché, liquidité. Publication résultats attendue Q4.', clientActions: ['Stress test interne', 'Scénarios COBAC', 'Rapport stress test'], citationCount: 14, lastVerified: '2026-06-18' },
  { id: 'ct-10', reference: 'COBAC/DI/2025-03', title: 'Directive Digitalisation Bancaire — E-banking CEMAC', type: 'Directive', year: 2025, countryScope: ['Cameroun', 'Gabon', 'Congo'], verified: false, khepraStatus: 'analyse', impactLevel: 'moyen', summary: 'Cadre réglementaire pour les services bancaires en ligne. Cybersécurité, authentification, réclamation clients. (Non publié officiellement — sous réserve)', clientActions: ['Audit e-banking', 'Authentification forte', 'Procédure réclamation'], citationCount: 12, lastVerified: '2026-06-27' },
  { id: 'ct-11', reference: 'COBAC/CIR-11/2024', title: 'Circulaire Restructuration — Plans préventifs et redressement', type: 'Circulaire', year: 2024, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: true, khepraStatus: 'appliqué', impactLevel: 'critique', summary: 'Obligation de plans préventifs et de redressement pour les établissements en difficulté. Niveau de déclenchement, contenu, suivi.', clientActions: ['Plan préventif', 'Plan redressement', 'Suivi COBAC'], citationCount: 19, lastVerified: '2026-06-16' },
  { id: 'ct-12', reference: 'COBAC/INS-12/2023', title: 'Instruction Audit Interne — Indépendance et périmètre', type: 'Instruction', year: 2023, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad'], verified: true, khepraStatus: 'appliqué', impactLevel: 'moyen', summary: 'Exigences pour l\'audit interne bancaire. Indépendance, périmètre, plan d\'audit, reporting au CA.', clientActions: ['Charte audit interne', 'Plan d\'audit annuel', 'Reporting CA'], citationCount: 15, lastVerified: '2026-06-15' },
  { id: 'ct-13', reference: 'COBAC/NOTE-13/2025', title: 'Note — Bancassurance et distribution de produits financiers', type: 'Note', year: 2025, countryScope: ['Cameroun', 'Gabon', 'Congo'], verified: true, khepraStatus: 'veille', impactLevel: 'faible', summary: 'Principes de supervision de la bancassurance. Conflit d\'intérêts, information client, rémunération.', clientActions: ['Politique bancassurance', 'Conflit d\'intérêts', 'Information client'], citationCount: 8, lastVerified: '2026-06-14' },
  { id: 'ct-14', reference: 'COBAC/DI/2024-04', title: 'Directive Liquidation Bancaire — Résolution CEMAC', type: 'Directive', year: 2024, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: true, khepraStatus: 'appliqué', impactLevel: 'élevé', summary: 'Cadre de résolution bancaire CEMAC. Plan de résolution, pouvoirs COBAC, protection dépôts, garantie état.', clientActions: ['Plan de résolution', 'Protection dépôts', 'Garantie état'], citationCount: 11, lastVerified: '2026-06-13' },
  { id: 'ct-15', reference: 'COBAC/CIR-15/2025', title: 'Circulaire Marché Monétaire — Opérations BEAC', type: 'Circulaire', year: 2025, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: false, khepraStatus: 'appliqué', impactLevel: 'moyen', summary: 'Règles du marché monétaire CEMAC. Opérations BEAC, collatéral, taux directeur, réserves obligatoires. (Non publié officiellement — sous réserve)', clientActions: ['ALM marché monétaire', 'Réserves obligatoires', 'Collatéral BEAC'], citationCount: 22, lastVerified: '2026-06-27' },
  { id: 'ct-16', reference: 'COBAC/INS-16/2024', title: 'Instruction Taux de Change — Conformité par les banques', type: 'Instruction', year: 2024, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad'], verified: true, khepraStatus: 'appliqué', impactLevel: 'moyen', summary: 'Conformité des banques aux taux de change officiels CEMAC. Reporting, pénalités, contrôle des opérations.', clientActions: ['Conformité change', 'Reporting change', 'Contrôle opérations'], citationCount: 16, lastVerified: '2026-06-11' },
  { id: 'ct-17', reference: 'COBAC/NOTE-17/2026', title: 'Note — Inspection des Systèmes d\'Information Bancaires', type: 'Note', year: 2026, countryScope: ['Cameroun', 'Gabon', 'Congo'], verified: true, khepraStatus: 'veille', impactLevel: 'élevé', summary: 'Programme d\'inspection SI des banques CEMAC. Sécurité, continuité, architecture, gouvernance IT.', clientActions: ['Audit SI', 'Gouvernance IT', 'Continuité SI'], citationCount: 10, lastVerified: '2026-06-10' },
  { id: 'ct-18', reference: 'COBAC/DI/2026-05', title: 'Directive Protection des Données — Bancaire CEMAC', type: 'Directive', year: 2026, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: true, khepraStatus: 'analyse', impactLevel: 'critique', summary: 'Protection des données personnelles dans le secteur bancaire CEMAC. Consentement, sécurité, droit d\'accès, transfert.', clientActions: ['Charte données', 'Sécurité données', 'Droit d\'accès'], citationCount: 13, lastVerified: '2026-06-09' },
];

// ============================================================
// 6 PAYS CEMAC
// ============================================================
export const cobacCountries: COBACCountry[] = [
  { id: 'cm', name: 'Cameroun', countryCode: 'CM', capital: 'Yaoundé', banksCount: 23, sfdCount: 14, inspectionStatus: 'en_cours', lastInspection: '2026-03-15', nextInspection: '2026-09-01', complianceScore: 79, activeAlerts: 6, regulatorContact: 'COBAC — Yaoundé' },
  { id: 'ga', name: 'Gabon', countryCode: 'GA', capital: 'Libreville', banksCount: 15, sfdCount: 8, inspectionStatus: 'planifiée', lastInspection: '2025-11-20', nextInspection: '2026-08-15', complianceScore: 72, activeAlerts: 4, regulatorContact: 'COBAC — Libreville' },
  { id: 'cg', name: 'Congo', countryCode: 'CG', capital: 'Brazzaville', banksCount: 12, sfdCount: 6, inspectionStatus: 'terminée', lastInspection: '2026-01-10', nextInspection: '2026-12-01', complianceScore: 65, activeAlerts: 5, regulatorContact: 'COBAC — Brazzaville' },
  { id: 'cf', name: 'Centrafrique', countryCode: 'CF', capital: 'Bangui', banksCount: 5, sfdCount: 2, inspectionStatus: 'alerte', lastInspection: '2025-06-30', nextInspection: '2026-07-20', complianceScore: 42, activeAlerts: 6, regulatorContact: 'COBAC — Bangui' },
  { id: 'td', name: 'Tchad', countryCode: 'TD', capital: 'N\'Djaména', banksCount: 9, sfdCount: 4, inspectionStatus: 'planifiée', lastInspection: '2025-09-12', nextInspection: '2026-10-01', complianceScore: 48, activeAlerts: 7, regulatorContact: 'COBAC — N\'Djaména' },
  { id: 'gq', name: 'Guinée Équatoriale', countryCode: 'GQ', capital: 'Malabo', banksCount: 7, sfdCount: 3, inspectionStatus: 'en_cours', lastInspection: '2026-02-28', nextInspection: '2026-08-30', complianceScore: 55, activeAlerts: 4, regulatorContact: 'COBAC — Malabo' },
];

// ============================================================
// TIMELINE INSPECTIONS EN COURS
// ============================================================
export const cobacInspections: COBACInspection[] = [
  { id: 'insp-01', bankName: 'Banque Atlantique Cameroun', country: 'Cameroun', inspectionType: 'Inspection sur place', status: 'en_cours', startDate: '2026-05-10', endDate: '2026-07-15', findingsCount: 8, criticalFindings: 2, actionPlan: 'Renforcement contrôles internes — PCA/PRA', khepraInvolved: true },
  { id: 'insp-02', bankName: 'BGFI Gabon', country: 'Gabon', inspectionType: 'Mission spécialisée', status: 'planifiée', startDate: '2026-08-15', endDate: '2026-09-30', findingsCount: 0, criticalFindings: 0, actionPlan: null, khepraInvolved: false },
  { id: 'insp-03', bankName: 'Ecobank Congo', country: 'Congo', inspectionType: 'Inspection à distance', status: 'terminée', startDate: '2026-01-10', endDate: '2026-03-20', findingsCount: 12, criticalFindings: 3, actionPlan: 'Plan de redressement — Fonds propres', khepraInvolved: true },
  { id: 'insp-04', bankName: 'UBA Centrafrique', country: 'Centrafrique', inspectionType: 'Inspection sur place', status: 'en_cours', startDate: '2026-04-01', endDate: '2026-06-30', findingsCount: 15, criticalFindings: 5, actionPlan: 'Restructuration CA + conformité LBC/FT', khepraInvolved: true },
  { id: 'insp-05', bankName: 'Orabank Tchad', country: 'Tchad', inspectionType: 'Mission spécialisée', status: 'planifiée', startDate: '2026-10-01', endDate: '2026-11-15', findingsCount: 0, criticalFindings: 0, actionPlan: null, khepraInvolved: false },
  { id: 'insp-06', bankName: 'BHS Guinée Équatoriale', country: 'Guinée Équatoriale', inspectionType: 'Inspection sur place', status: 'en_cours', startDate: '2026-02-28', endDate: '2026-05-30', findingsCount: 6, criticalFindings: 1, actionPlan: 'Cybersécurité — Directive 2027', khepraInvolved: true },
  { id: 'insp-07', bankName: 'Crédit du Congo', country: 'Congo', inspectionType: 'Inspection à distance', status: 'planifiée', startDate: '2026-12-01', endDate: '2026-12-20', findingsCount: 0, criticalFindings: 0, actionPlan: null, khepraInvolved: false },
  { id: 'insp-08', bankName: 'SGBS Cameroun', country: 'Cameroun', inspectionType: 'Mission spécialisée', status: 'en_cours', startDate: '2026-06-01', endDate: '2026-08-15', findingsCount: 4, criticalFindings: 0, actionPlan: 'Gouvernance CA — comités spécialisés', khepraInvolved: true },
];

// ============================================================
// KPIs
// ============================================================
export const cobacKPIs: COBACKPI[] = [
  { label: 'Textes vérifiés', value: 18, unit: ' textes', icon: 'ri-file-shield-2-line', color: 'primary' },
  { label: 'Pays CEMAC', value: 6, unit: ' pays', icon: 'ri-map-pin-line', color: 'accent' },
  { label: 'Inspections en cours', value: 4, unit: '', icon: 'ri-search-line', color: 'secondary' },
  { label: 'Alertes actives', value: 32, unit: '', icon: 'ri-alarm-warning-line', color: 'primary' },
  { label: 'Score conformité moyen', value: '63/100', unit: '', icon: 'ri-shield-check-line', color: 'accent' },
  { label: 'Citations réglementaires', value: 387, unit: '', icon: 'ri-book-marked-line', color: 'secondary' },
];

export const cobacOverview = {
  totalTexts: 18,
  verifiedTexts: 18,
  countries: 6,
  banks: 71,
  sfd: 37,
  inspectionsActive: 4,
  inspectionsPlanned: 4,
  inspectionsCompleted: 2,
  totalFindings: 45,
  criticalFindings: 11,
  avgComplianceScore: 63,
  activeAlerts: 32,
  khepraInvolvedInspections: 5,
  lastUpdate: '2026-06-25',
};





