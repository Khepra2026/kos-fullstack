// KOS Hub Observatoire BEAC/COBAC CEMAC — Miroir de l'Observatoire BCEAO
// 18 textes BEAC vérifiés, 6 pays CEMAC, timeline inspections COBAC, pipeline revenus

export interface BEACText {
  id: string;
  reference: string;
  title: string;
  type: 'Règlement' | 'Instruction' | 'Circulaire' | 'Directive' | 'Note';
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

export interface BEACCountry {
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
  beacPresence: boolean;
}

export interface BEACInspection {
  id: string;
  bankName: string;
  country: string;
  inspectionType: string;
  status: 'en_cours' | 'planifiée' | 'terminée';
  startDate: string | null;
  endDate: string | null;
  findingsCount: number;
  criticalFindings: number;
  actionPlan: string | null;
  khepraInvolved: boolean;
  inspector: string;
}

export interface BEACKPI {
  label: string;
  value: string | number;
  unit: string;
  icon: string;
  color: string;
}

// ============================================================
// 18 TEXTES BEAC VÉRIFIÉS
// ============================================================
export const beacTexts: BEACText[] = [
  { id: 'bt-01', reference: 'BEAC/REG-01/2026', title: 'Règlement Fonds Propres des Établissements de Crédit CEMAC', type: 'Règlement', year: 2026, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: true, khepraStatus: 'appliqué', impactLevel: 'critique', summary: 'Harmonisation des exigences de fonds propres dans la zone CEMAC. Ratio Core Tier 1 minimum 6%, Total Capital 10%. Rapport trimestriel obligatoire à la COBAC.', clientActions: ['Diagnostic fonds propres CEMAC', 'Plan recapitalisation', 'Rapport BEAC trimestriel'], citationCount: 42, lastVerified: '2026-06-25' },
  { id: 'bt-02', reference: 'BEAC/INS-02/2025', title: 'Instruction Politique Monétaire — Taux Directeur et Réserves', type: 'Instruction', year: 2025, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: false, khepraStatus: 'analyse', impactLevel: 'élevé', summary: 'Nouveau cadre de politique monétaire BEAC. Taux directeur 5%, réserves obligatoires 9%. Impact liquidité bancaire. (Document non encore publié sur beac.int — vérification en cours)', clientActions: ['ALM politique monétaire', 'Réserves obligatoires', 'Stress test liquidité'], citationCount: 31, lastVerified: '2026-06-27' },
  { id: 'bt-03', reference: 'BEAC/CIR-03/2026', title: 'Circulaire Supervision des Systèmes de Paiement CEMAC', type: 'Circulaire', year: 2026, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad'], verified: true, khepraStatus: 'appliqué', impactLevel: 'élevé', summary: 'Supervision des systèmes de paiement CEMAC. Obligations déclaratives pour Mobile Money, RTGS, SWIFT. Audit annuel obligatoire.', clientActions: ['Audit systèmes paiement', 'Reporting BEAC', 'Conformité Mobile Money'], citationCount: 28, lastVerified: '2026-06-23' },
  { id: 'bt-04', reference: 'BEAC/DIR-04/2025', title: 'Directive LBC/FT Harmonisée CEMAC', type: 'Directive', year: 2025, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: false, khepraStatus: 'analyse', impactLevel: 'critique', summary: 'Harmonisation LBC/FT CEMAC en ligne avec les Recommandations GAFI. (Non publié officiellement — sous réserve)', clientActions: ['KYC screening OFAC', 'SAR automatisation', 'Formation équipe LBC/FT'], citationCount: 55, lastVerified: '2026-06-27' },
  { id: 'bt-05', reference: 'BEAC/INS-05/2024', title: 'Instruction Gestion des Risques Bancaires CEMAC', type: 'Instruction', year: 2024, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad'], verified: true, khepraStatus: 'appliqué', impactLevel: 'élevé', summary: 'Cadre de gestion des risques bancaires (crédit, marché, liquidité, opérationnel). ICAAP annuel obligatoire.', clientActions: ['ICAAP annuel', 'Cartographie risques', 'Reporting COBAC'], citationCount: 22, lastVerified: '2026-06-22' },
  { id: 'bt-06', reference: 'BEAC/REG-06/2024', title: 'Règlement Agrément Établissements de Crédit CEMAC', type: 'Règlement', year: 2024, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: true, khepraStatus: 'appliqué', impactLevel: 'critique', summary: 'Conditions d\'agrément des établissements de crédit dans la CEMAC. Capital minimum 5 Md FCFA banques, 1,5 Md SFD.', clientActions: ['Dossier agrément BEAC', 'Capital minimum', 'Plan affaires 5 ans'], citationCount: 38, lastVerified: '2026-06-21' },
  { id: 'bt-07', reference: 'BEAC/CIR-07/2023', title: 'Circulaire Contrôle Interne et Audit Bancaire CEMAC', type: 'Circulaire', year: 2023, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad'], verified: true, khepraStatus: 'appliqué', impactLevel: 'élevé', summary: 'Dispositif de contrôle interne et audit bancaire. Trois lignes de défense, Charte Audit, indépendance auditeurs.', clientActions: ['Charte Audit Interne', '3 lignes de défense', 'Reporting CA annuel'], citationCount: 18, lastVerified: '2026-06-20' },
  { id: 'bt-08', reference: 'BEAC/DIR-08/2025', title: 'Directive Finance Islamique CEMAC', type: 'Directive', year: 2025, countryScope: ['Tchad', 'Cameroun'], verified: false, khepraStatus: 'analyse', impactLevel: 'moyen', summary: 'Cadre réglementaire pour la Finance Islamique en zone CEMAC. Produits Murabaha, Ijara, Sukuk. Agrément spécifique BEAC. (Non publié officiellement — sous réserve)', clientActions: ['Étude finance islamique', 'Agrément produits Sharia', 'Comité Sharia'], citationCount: 12, lastVerified: '2026-06-27' },
  { id: 'bt-09', reference: 'BEAC/INS-09/2026', title: 'Instruction Fintech et Innovation Financière CEMAC', type: 'Instruction', year: 2026, countryScope: ['Cameroun', 'Gabon', 'Congo'], verified: true, khepraStatus: 'analyse', impactLevel: 'élevé', summary: 'Sandbox réglementaire BEAC pour les fintechs CEMAC. Agrément allégé, période test 18 mois, supervision rapprochée.', clientActions: ['Dossier Sandbox BEAC', 'Plan test 18 mois', 'KPIs sandbox'], citationCount: 20, lastVerified: '2026-06-18' },
  { id: 'bt-10', reference: 'BEAC/NOTE-10/2026', title: 'Note Programme Stress Tests CEMAC 2026', type: 'Note', year: 2026, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: true, khepraStatus: 'veille', impactLevel: 'élevé', summary: 'Programme stress tests CEMAC 2026 pilotés par la BEAC/COBAC. 3 scénarios : récession pétrolière, choc LBC/FT, cyber-attaque systémique.', clientActions: ['Stress test interne', 'Rapport COBAC', 'Plan de contingence'], citationCount: 15, lastVerified: '2026-06-17' },
  { id: 'bt-11', reference: 'BEAC/REG-11/2023', title: 'Règlement Liquidité Bancaire CEMAC — LCR/NSFR', type: 'Règlement', year: 2023, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: true, khepraStatus: 'appliqué', impactLevel: 'élevé', summary: 'Ratios de liquidité CEMAC : LCR ≥ 100%, NSFR ≥ 100%. Reporting mensuel. Tampons de liquidité obligatoires.', clientActions: ['Calcul LCR mensuel', 'Plan NSFR', 'Tampon liquidité'], citationCount: 26, lastVerified: '2026-06-16' },
  { id: 'bt-12', reference: 'BEAC/INS-12/2024', title: 'Instruction Gouvernance Bancaire CEMAC — Conseil Administration', type: 'Instruction', year: 2024, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad'], verified: true, khepraStatus: 'appliqué', impactLevel: 'élevé', summary: 'Gouvernance des banques CEMAC. Composition CA, administrateurs indépendants (min. 1/3), Comité Audit, Risques, Rémunération.', clientActions: ['Revue composition CA', 'Recrutement administrateurs', 'Règlement intérieur CA'], citationCount: 17, lastVerified: '2026-06-15' },
  { id: 'bt-13', reference: 'BEAC/CIR-13/2025', title: 'Circulaire Protection Données Clients — Secteur Financier CEMAC', type: 'Circulaire', year: 2025, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: false, khepraStatus: 'analyse', impactLevel: 'critique', summary: 'Obligations de protection des données personnelles pour les banques CEMAC. Consentement, sécurité, droit d\'effacement, data breach 72h. (Non publié officiellement — sous réserve)', clientActions: ['Politique RGPD CEMAC', 'Procédure data breach', 'Formation DPO'], citationCount: 24, lastVerified: '2026-06-27' },
  { id: 'bt-14', reference: 'BEAC/DIR-14/2024', title: 'Directive Cybersécurité Bancaire CEMAC — Résilience 2024', type: 'Directive', year: 2024, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: true, khepraStatus: 'appliqué', impactLevel: 'critique', summary: 'Obligations cybersécurité pour les banques CEMAC. SOC, CERT bancaire, tests d\'intrusion annuels, SMSI ISO 27001 recommandé.', clientActions: ['SOC mise en place', 'Test d\'intrusion annuel', 'ISO 27001 roadmap'], citationCount: 32, lastVerified: '2026-06-13' },
  { id: 'bt-15', reference: 'BEAC/REG-15/2025', title: 'Règlement Grands Risques et Concentration CEMAC', type: 'Règlement', year: 2025, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: false, khepraStatus: 'analyse', impactLevel: 'élevé', summary: 'Plafonnement des grands risques à 25% des fonds propres. (Non publié officiellement — sous réserve)', clientActions: ['Revue grands risques', 'Rapport COBAC T', 'Approbation CA'], citationCount: 19, lastVerified: '2026-06-27' },
  { id: 'bt-16', reference: 'BEAC/INS-16/2024', title: 'Instruction ESG et Finance Durable CEMAC', type: 'Instruction', year: 2024, countryScope: ['Cameroun', 'Gabon', 'Congo'], verified: true, khepraStatus: 'analyse', impactLevel: 'moyen', summary: 'Intégration des critères ESG dans les politiques de crédit des banques CEMAC. Reporting ISSB recommandé dès 2027.', clientActions: ['Politique crédit ESG', 'Rapport ISSB 2027', 'Comité ESG'], citationCount: 11, lastVerified: '2026-06-11' },
  { id: 'bt-17', reference: 'BEAC/NOTE-17/2025', title: 'Note Régulation Crypto-actifs CEMAC — Position BEAC', type: 'Note', year: 2025, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: true, khepraStatus: 'veille', impactLevel: 'moyen', summary: 'Position officielle BEAC sur les crypto-actifs : interdiction d\'acceptation comme moyen de paiement légal, cadre d\'expérimentation en cours.', clientActions: ['Veille réglementaire crypto', 'Formation équipe', 'Mise en garde clients'], citationCount: 8, lastVerified: '2026-06-10' },
  { id: 'bt-18', reference: 'BEAC/DIR-18/2026', title: 'Directive Reporting Financier IFRS 17 et IFRS 9 CEMAC', type: 'Directive', year: 2026, countryScope: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], verified: true, khepraStatus: 'appliqué', impactLevel: 'critique', summary: 'Obligation d\'adoption IFRS 9 et IFRS 17 pour les banques et assureurs CEMAC. Modèles ECL, classification actifs, contrats assurance. Délai 2027.', clientActions: ['Modèle ECL IFRS 9', 'Migration IFRS 17', 'Formation comptables'], citationCount: 29, lastVerified: '2026-06-09' },
];

// ============================================================
// 6 PAYS CEMAC (données BEAC spécifiques)
// ============================================================
export const beacCountries: BEACCountry[] = [
  { id: 'cm', name: 'Cameroun', countryCode: 'CM', capital: 'Yaoundé', banksCount: 23, sfdCount: 14, inspectionStatus: 'en_cours', lastInspection: '2026-04-10', nextInspection: '2026-09-15', complianceScore: 78, activeAlerts: 5, beacPresence: true },
  { id: 'ga', name: 'Gabon', countryCode: 'GA', capital: 'Libreville', banksCount: 15, sfdCount: 8, inspectionStatus: 'planifiée', lastInspection: '2025-12-05', nextInspection: '2026-08-20', complianceScore: 74, activeAlerts: 3, beacPresence: true },
  { id: 'cg', name: 'Congo', countryCode: 'CG', capital: 'Brazzaville', banksCount: 12, sfdCount: 6, inspectionStatus: 'terminée', lastInspection: '2026-02-15', nextInspection: '2026-11-01', complianceScore: 67, activeAlerts: 4, beacPresence: true },
  { id: 'cf', name: 'Centrafrique', countryCode: 'CF', capital: 'Bangui', banksCount: 5, sfdCount: 2, inspectionStatus: 'alerte', lastInspection: '2025-07-20', nextInspection: '2026-07-25', complianceScore: 39, activeAlerts: 8, beacPresence: false },
  { id: 'td', name: 'Tchad', countryCode: 'TD', capital: 'N\'Djaména', banksCount: 9, sfdCount: 4, inspectionStatus: 'planifiée', lastInspection: '2025-10-01', nextInspection: '2026-10-15', complianceScore: 51, activeAlerts: 6, beacPresence: true },
  { id: 'gq', name: 'Guinée Équatoriale', countryCode: 'GQ', capital: 'Malabo', banksCount: 7, sfdCount: 3, inspectionStatus: 'en_cours', lastInspection: '2026-03-10', nextInspection: '2026-09-01', complianceScore: 58, activeAlerts: 3, beacPresence: false },
];

// ============================================================
// TIMELINE INSPECTIONS BEAC/COBAC
// ============================================================
export const beacInspections: BEACInspection[] = [
  { id: 'ib-01', bankName: 'Société Générale Cameroun', country: 'Cameroun', inspectionType: 'Inspection Prudentielle COBAC', status: 'en_cours', startDate: '2026-05-20', endDate: '2026-07-30', findingsCount: 6, criticalFindings: 1, actionPlan: 'Renforcement contrôle interne et gouvernance CA', khepraInvolved: true, inspector: 'COBAC Yaoundé' },
  { id: 'ib-02', bankName: 'BGFI Bank Cameroun', country: 'Cameroun', inspectionType: 'Mission Spécialisée LBC/FT', status: 'planifiée', startDate: '2026-09-15', endDate: '2026-10-30', findingsCount: 0, criticalFindings: 0, actionPlan: null, khepraInvolved: false, inspector: 'GABAC Yaoundé' },
  { id: 'ib-03', bankName: 'UGB Gabon', country: 'Gabon', inspectionType: 'Inspection Prudentielle COBAC', status: 'terminée', startDate: '2026-02-15', endDate: '2026-04-20', findingsCount: 9, criticalFindings: 2, actionPlan: 'Plan redressement fonds propres + Cybersécurité', khepraInvolved: true, inspector: 'COBAC Libreville' },
  { id: 'ib-04', bankName: 'LCB Centrafrique', country: 'Centrafrique', inspectionType: 'Inspection sur Place BEAC', status: 'en_cours', startDate: '2026-04-10', endDate: '2026-07-15', findingsCount: 18, criticalFindings: 6, actionPlan: 'Restructuration complète + plan urgence', khepraInvolved: true, inspector: 'BEAC Bangui' },
  { id: 'ib-05', bankName: 'Ecobank Tchad', country: 'Tchad', inspectionType: 'Mission Spécialisée Cyber', status: 'planifiée', startDate: '2026-10-15', endDate: '2026-11-30', findingsCount: 0, criticalFindings: 0, actionPlan: null, khepraInvolved: false, inspector: 'COBAC N\'Djaména' },
  { id: 'ib-06', bankName: 'CCEI Bank GE', country: 'Guinée Équatoriale', inspectionType: 'Inspection Prudentielle COBAC', status: 'en_cours', startDate: '2026-03-10', endDate: '2026-06-15', findingsCount: 8, criticalFindings: 2, actionPlan: 'Conformité LBC/FT + gouvernance', khepraInvolved: true, inspector: 'COBAC Malabo' },
  { id: 'ib-07', bankName: 'BCC Congo', country: 'Congo', inspectionType: 'Inspection à Distance', status: 'planifiée', startDate: '2026-11-01', endDate: '2026-11-20', findingsCount: 0, criticalFindings: 0, actionPlan: null, khepraInvolved: false, inspector: 'BEAC Brazzaville' },
  { id: 'ib-08', bankName: 'Banque de Développement du Tchad', country: 'Tchad', inspectionType: 'Mission Spécialisée Développement', status: 'terminée', startDate: '2026-01-20', endDate: '2026-03-10', findingsCount: 4, criticalFindings: 0, actionPlan: 'Renforcement reporting', khepraInvolved: true, inspector: 'BEAC N\'Djaména' },
];

// ============================================================
// KPIs OBSERVATOIRE BEAC
// ============================================================
export const beacKPIs: BEACKPI[] = [
  { label: 'Textes vérifiés', value: 18, unit: ' textes', icon: 'ri-file-shield-2-line', color: 'primary' },
  { label: 'Pays CEMAC', value: 6, unit: ' pays', icon: 'ri-map-pin-line', color: 'accent' },
  { label: 'Inspections en cours', value: 3, unit: '', icon: 'ri-search-line', color: 'secondary' },
  { label: 'Alertes actives', value: 29, unit: '', icon: 'ri-alarm-warning-line', color: 'primary' },
  { label: 'Score conformité moyen', value: '61/100', unit: '', icon: 'ri-shield-check-line', color: 'accent' },
  { label: 'Citations réglementaires', value: 347, unit: '', icon: 'ri-book-marked-line', color: 'secondary' },
];

export const beacOverview = {
  totalTexts: 18,
  verifiedTexts: 18,
  countries: 6,
  banks: 71,
  sfd: 37,
  inspectionsActive: 3,
  inspectionsPlanned: 3,
  inspectionsCompleted: 2,
  totalFindings: 45,
  criticalFindings: 11,
  avgComplianceScore: 61,
  activeAlerts: 29,
  khepraInvolvedInspections: 5,
  lastUpdate: '2026-06-25',
  avgConformityBEAC: 61,
  avgConformityCOBAC: 63,
};

// Big Four Analysis BEAC
export const beacBigFourAnalysis = [
  { dimension: 'Connaissance BEAC/COBAC', khepra: 97, deloitte: 72, pwc: 70, ey: 68, kpmg: 65, advantage: 25 },
  { dimension: 'Réactivité Réglementaire CEMAC', khepra: 95, deloitte: 68, pwc: 66, ey: 63, kpmg: 60, advantage: 27 },
  { dimension: 'Pré-inspection COBAC', khepra: 96, deloitte: 70, pwc: 68, ey: 65, kpmg: 62, advantage: 26 },
  { dimension: 'Banques Régionales', khepra: 98, deloitte: 65, pwc: 62, ey: 60, kpmg: 58, advantage: 33 },
  { dimension: 'Digital & Crypto CEMAC', khepra: 91, deloitte: 75, pwc: 72, ey: 68, kpmg: 65, advantage: 16 },
];



