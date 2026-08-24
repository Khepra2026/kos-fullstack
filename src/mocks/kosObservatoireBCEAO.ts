export const bceaoObservatoryOverview = {
  totalInstructions: 22,
  verifiedInstructions: 22,
  activeCirculars: 14,
  activeDirectives: 5,
  activeInstructions: 3,
  complianceScore: 96,
  lastVerification: '2026-06-25',
  authority: 'BCEAO — Banque Centrale des États de l\'Afrique de l\'Ouest',
  jurisdiction: 'UEMOA — Union Économique et Monétaire Ouest Africaine',
  countries: 8,
  banks: 142,
  sfd: 650,
  emf: 45,
  alertesActives: 4,
  khepraImplicated: 12,
  nextInspection: '2026-07-15',
  isoCompliance: 100,
  bceaoScore: 96,
  bceaoTrend: 'stable',
};

export const bceaoInstructions = [
  { id: 'BCEAO-001', reference: '008-05-2015', type: 'Instruction', title: 'Instruction relative aux EME — Conditions et Modalités', category: 'Systèmes de Paiement', impact: 'Critique', verified: true, date: '2015-05-08', applicability: 'Banques, EME, SFD', khepraStatus: '100% conforme', notes: 'Texte fondamental pour l\'agrément des établissements de monnaie électronique.' },
  { id: 'BCEAO-002', reference: '004-2020', type: 'Instruction', title: 'Instruction relative à la lutte contre le blanchiment de capitaux et le financement du terrorisme (LBC/FT)', category: 'LBC/FT', impact: 'Critique', verified: true, date: '2020-04-15', applicability: 'Banques, SFD, EMF, EME', khepraStatus: '100% conforme', notes: 'Référence absolue pour les obligations LBC/FT dans l\'UEMOA.' },
  { id: 'BCEAO-003', reference: '397-12-2020', type: 'Décision', title: 'Décision relative aux conditions d\'agrément des SFD', category: 'Agrément', impact: 'Critique', verified: true, date: '2020-12-15', applicability: 'SFD, EMF', khepraStatus: '100% conforme', notes: 'Conditions minimales de capital, gouvernance et procédures pour l\'agrément SFD.' },
  { id: 'BCEAO-004', reference: '01-2021', type: 'Circulaire', title: 'Circulaire relative à la gouvernance des SFD', category: 'Gouvernance', impact: 'Critique', verified: true, date: '2021-01-20', applicability: 'SFD, EMF', khepraStatus: '100% conforme', notes: 'Gouvernance des SFD — CA, comités spécialisés, politiques de crédit.' },
  { id: 'BCEAO-005', reference: '02/2015/CM/UEMOA', type: 'Directive', title: 'Directive relative à la lutte contre le blanchiment de capitaux et le financement du terrorisme dans l\'UEMOA', category: 'LBC/FT', impact: 'Critique', verified: true, date: '2015-03-10', applicability: 'Tous les établissements financiers UEMOA', khepraStatus: '100% conforme', notes: 'Directive UEMOA cadre pour les obligations LBC/FT dans tous les États membres.' },
  { id: 'BCEAO-006', reference: '005-2022', type: 'Instruction', title: 'Instruction relative aux systèmes financiers numériques (SFN)', category: 'Systèmes de Paiement', impact: 'Critique', verified: true, date: '2022-05-15', applicability: 'Banques, EME, Fintech', khepraStatus: '100% conforme', notes: 'Cadre réglementaire pour les fintechs et les services financiers numériques.' },
  { id: 'BCEAO-007', reference: '001-2023', type: 'Instruction', title: 'Instruction relative aux stress tests des SFD', category: 'Prudentiel', impact: 'Haute', verified: true, date: '2023-01-10', applicability: 'SFD, EMF', khepraStatus: '100% conforme', notes: 'Méthodologie des stress tests pour les SFD — scénarios obligatoires.' },
  { id: 'BCEAO-008', reference: '02-2024', type: 'Circulaire', title: 'Circulaire relative à l\'inclusion financière', category: 'Inclusion Financière', impact: 'Haute', verified: true, date: '2024-02-15', applicability: 'Banques, SFD, EMF', khepraStatus: '100% conforme', notes: 'Stratégie nationale d\'inclusion financière et objectifs des établissements.' },
  { id: 'BCEAO-009', reference: '003-2018', type: 'Instruction', title: 'Instruction relative aux dispositions générales applicables aux SFD', category: 'SFD', impact: 'Critique', verified: true, date: '2018-03-20', applicability: 'SFD, EMF', khepraStatus: '100% conforme', notes: 'Cadre général de fonctionnement des SFD — capital, agrément, ratios.' },
  { id: 'BCEAO-010', reference: '005-05-2018', type: 'Instruction', title: 'Instruction relative à la finance islamique', category: 'Finance Islamique', impact: 'Moyenne', verified: true, date: '2018-05-05', applicability: 'SFD, Banques', khepraStatus: '100% conforme', notes: 'Produits financiers conformes à la Charia — conditions d\'agrément.' },
  { id: 'BCEAO-011', reference: '019-2010', type: 'Instruction', title: 'Instruction relative aux fonds de sécurité et de solidarité des IMCEC', category: 'SFD', impact: 'Moyenne', verified: true, date: '2010-10-15', applicability: 'IMCEC', khepraStatus: '100% conforme', notes: 'Fonds de sécurité et solidarité — calcul, utilisation et reporting.' },
  { id: 'BCEAO-012', reference: '061-2011', type: 'Instruction', title: 'Instruction relative au refinancement des SFD par la BCEAO', category: 'Prudentiel', impact: 'Haute', verified: true, date: '2011-11-10', applicability: 'SFD, EMF', khepraStatus: '100% conforme', notes: 'Conditions d\'accès au refinancement BCEAO — garanties, plafonds, reporting.' },
  { id: 'BCEAO-013', reference: '001-2017', type: 'Instruction', title: 'Instruction relative aux modifications statutaires des SFD', category: 'Gouvernance', impact: 'Haute', verified: true, date: '2017-01-15', applicability: 'SFD, EMF', khepraStatus: '100% conforme', notes: 'Procédures de modification statutaire — agrément BCEAO requis.' },
  { id: 'BCEAO-014', reference: '002-2017', type: 'Instruction', title: 'Instruction relative aux modifications statutaires des SFD (complément)', category: 'Gouvernance', impact: 'Haute', verified: true, date: '2017-02-01', applicability: 'SFD, EMF', khepraStatus: '100% conforme', notes: 'Complément à l\'instruction 001-2017 — cas particuliers et dérogations.' },
  { id: 'BCEAO-015', reference: '018-2010', type: 'Instruction', title: 'Instruction relative au reporting périodique des SFD', category: 'Reporting', impact: 'Haute', verified: true, date: '2010-06-15', applicability: 'SFD, EMF', khepraStatus: '100% conforme', notes: 'Fréquence et format des rapports périodiques à la BCEAO.' },
  { id: 'BCEAO-016', reference: '020-2010', type: 'Instruction', title: 'Instruction relative au reporting périodique des SFD (complément)', category: 'Reporting', impact: 'Haute', verified: true, date: '2010-08-20', applicability: 'SFD, EMF', khepraStatus: '100% conforme', notes: 'Tableaux complémentaires de reporting — ratios, provisions, délinquance.' },
  { id: 'BCEAO-017', reference: '004-2010', type: 'Instruction', title: 'Instruction relative au retrait d\'agrément des SFD', category: 'Agrément', impact: 'Haute', verified: true, date: '2010-04-10', applicability: 'SFD, EMF', khepraStatus: '100% conforme', notes: 'Procédures de retrait d\'agrément — conditions, recours, liquidateur.' },
  { id: 'BCEAO-018', reference: '025-2010', type: 'Instruction', title: 'Instruction relative au référentiel comptable des SFD (RCS)', category: 'Comptable', impact: 'Haute', verified: true, date: '2010-10-01', applicability: 'SFD, EMF', khepraStatus: '100% conforme', notes: 'Plan comptable et règles de consolidation pour les SFD.' },
  { id: 'BCEAO-019', reference: '026-2010', type: 'Instruction', title: 'Instruction relative au référentiel comptable des SFD (complément)', category: 'Comptable', impact: 'Haute', verified: true, date: '2010-10-15', applicability: 'SFD, EMF', khepraStatus: '100% conforme', notes: 'Écritures comptables spécifiques — provisions, restructuration, fusion.' },
  { id: 'BCEAO-020', reference: '030-2010', type: 'Instruction', title: 'Instruction relative au référentiel comptable des SFD (annexes)', category: 'Comptable', impact: 'Haute', verified: true, date: '2010-11-01', applicability: 'SFD, EMF', khepraStatus: '100% conforme', notes: 'Annexes et tableaux de synthèse comptable — reporting BCEAO.' },
  { id: 'BCEAO-021', reference: '03-2017', type: 'Circulaire', title: 'Circulaire relative aux trois lignes de défense', category: 'Contrôle Interne', impact: 'Critique', verified: true, date: '2017-03-15', applicability: 'Banques, SFD', khepraStatus: '100% conforme', notes: 'Organisation des trois lignes de défense — contrôle interne, risque, audit.' },
  { id: 'BCEAO-022', reference: '01-2017', type: 'Circulaire', title: 'Circulaire relative aux comités spécialisés du CA', category: 'Gouvernance', impact: 'Critique', verified: true, date: '2017-01-20', applicability: 'Banques, SFD', khepraStatus: '100% conforme', notes: 'Comités spécialisés — audit, risque, nomination, rémunération.' },
];

export const bceaoCountries = [
  { name: 'Bénin', code: 'BJ', banks: 8, sfd: 42, emf: 3, conformityScore: 94, alertes: 1, inspections: 2, khepraStatus: 'Forte', lastInspection: '2026-03-15' },
  { name: 'Burkina Faso', code: 'BF', banks: 12, sfd: 85, emf: 5, conformityScore: 91, alertes: 2, inspections: 3, khepraStatus: 'Forte', lastInspection: '2026-02-20' },
  { name: 'Côte d\'Ivoire', code: 'CI', banks: 22, sfd: 140, emf: 8, conformityScore: 97, alertes: 0, inspections: 4, khepraStatus: 'Forte', lastInspection: '2026-05-10' },
  { name: 'Guinée-Bissau', code: 'GW', banks: 3, sfd: 8, emf: 1, conformityScore: 78, alertes: 3, inspections: 1, khepraStatus: 'Croissance', lastInspection: '2025-11-15' },
  { name: 'Mali', code: 'ML', banks: 14, sfd: 95, emf: 6, conformityScore: 88, alertes: 2, inspections: 2, khepraStatus: 'Forte', lastInspection: '2026-01-20' },
  { name: 'Niger', code: 'NE', banks: 9, sfd: 55, emf: 4, conformityScore: 85, alertes: 2, inspections: 2, khepraStatus: 'Croissance', lastInspection: '2026-04-05' },
  { name: 'Sénégal', code: 'SN', banks: 18, sfd: 120, emf: 7, conformityScore: 96, alertes: 1, inspections: 3, khepraStatus: 'Forte', lastInspection: '2026-04-25' },
  { name: 'Togo', code: 'TG', banks: 8, sfd: 48, emf: 3, conformityScore: 92, alertes: 1, inspections: 2, khepraStatus: 'Forte', lastInspection: '2026-03-30' },
];

export const bceaoInspections = [
  { id: 'INS-BCEAO-001', bank: 'Banque Atlantique CI', country: 'Côte d\'Ivoire', type: 'Inspection Prudentielle', status: 'Planifiée', date: '2026-07-15', findings: null, khepraRole: 'Pré-inspection complète', scope: 'Prudentiel, LBC/FT, Gouvernance', score: null },
  { id: 'INS-BCEAO-002', bank: 'Orabank Sénégal', country: 'Sénégal', type: 'Inspection Spécialisée', status: 'En cours', date: '2026-06-20', findings: 3, khepraRole: 'Accompagnement en cours', scope: 'SFN, Inclusion Financière', score: 89 },
  { id: 'INS-BCEAO-003', bank: 'Coris Bank Burkina', country: 'Burkina Faso', type: 'Inspection Prudentielle', status: 'Terminée', date: '2026-04-10', findings: 1, khepraRole: 'Pré-inspection réussie', scope: 'Prudentiel, ALM', score: 96 },
  { id: 'INS-BCEAO-004', bank: 'SFD Côte d\'Ivoire', country: 'Côte d\'Ivoire', type: 'Inspection SFD', status: 'Planifiée', date: '2026-08-05', findings: null, khepraRole: 'Diagnostic préparatoire', scope: 'Gouvernance, Ratios, Reporting', score: null },
  { id: 'INS-BCEAO-005', bank: 'Banque Régionale Mali', country: 'Mali', type: 'Inspection Spécialisée', status: 'En cours', date: '2026-05-15', findings: 5, khepraRole: 'Mission corrective', scope: 'LBC/FT, Sanctions', score: 72 },
  { id: 'INS-BCEAO-006', bank: 'Ecobank Togo', country: 'Togo', type: 'Inspection Prudentielle', status: 'Terminée', date: '2026-03-20', findings: 0, khepraRole: 'Pré-inspection complète', scope: 'Prudentiel, ESG', score: 98 },
  { id: 'INS-BCEAO-007', bank: 'SFD Bénin', country: 'Bénin', type: 'Inspection SFD', status: 'En cours', date: '2026-06-10', findings: 2, khepraRole: 'Accompagnement', scope: 'Reporting, Référentiel Comptable', score: 88 },
  { id: 'INS-BCEAO-008', bank: 'Banque du Niger', country: 'Niger', type: 'Inspection Spécialisée', status: 'Planifiée', date: '2026-09-01', findings: null, khepraRole: 'Diagnostic préliminaire', scope: 'Souvereigneté Numérique, Cyber', score: null },
];

export const bceaoAlerts = [
  { id: 'ALR-BCEAO-001', title: 'Instruction BCEAO 007-2026 — Nouvelles exigences de fonds propres SFD', severity: 'Critique', deadline: '2026-09-30', affected: '650 SFD, 45 EMF', action: 'Augmentation capital minimum — 500M FCFA', khepraOffer: 'Diagnostic capital + plan de montée en charge' },
  { id: 'ALR-BCEAO-002', title: 'Circulaire BCEAO 04-2026 — Digitalisation des reporting prudentiels', severity: 'Haute', deadline: '2026-12-31', affected: '142 Banques, 650 SFD', action: 'Migration vers reporting XBRL/XML', khepraOffer: 'Accompagnement migration reporting digital' },
  { id: 'ALR-BCEAO-003', title: 'Projet Directive UEMOA — Protection des données bancaires', severity: 'Haute', deadline: '2027-03-15', affected: 'Tous établissements UEMOA', action: 'Mise en conformité RGPD-UEMOA', khepraOffer: 'Audit conformité données + gouvernance' },
  { id: 'ALR-BCEAO-004', title: 'BCEAO — Stress Tests Climatiques Pilier 2 Q3 2026', severity: 'Moyenne', deadline: '2026-08-30', affected: '142 Banques', action: 'Scénarios climatiques — transition physique', khepraOffer: 'Modélisation stress test climatique' },
];

export const bceaoComplianceDimensions = [
  { dimension: 'Prudentiel', score: 94, weight: 25, target: 95, trend: 'up', gaps: ['Stress tests climatiques', 'Fonds propres SFD'] },
  { dimension: 'LBC/FT', score: 97, weight: 25, target: 98, trend: 'stable', gaps: [] },
  { dimension: 'Gouvernance', score: 93, weight: 20, target: 95, trend: 'up', gaps: ['Comités spécialisés', 'Indépendance administrateurs'] },
  { dimension: 'Systèmes Paiement', score: 96, weight: 15, target: 95, trend: 'stable', gaps: [] },
  { dimension: 'Inclusion Financière', score: 91, weight: 15, target: 93, trend: 'up', gaps: ['Digitalisation SFD', 'Finance islamique'] },
];

export const bceaoBigFourAnalysis = [
  { dimension: 'Connaissance BCEAO', khepra: 98, deloitte: 75, pwc: 72, ey: 70, kpmg: 68, advantage: 23 },
  { dimension: 'Réactivité Réglementaire', khepra: 96, deloitte: 70, pwc: 68, ey: 65, kpmg: 62, advantage: 26 },
  { dimension: 'Pré-inspection BCEAO', khepra: 95, deloitte: 72, pwc: 70, ey: 68, kpmg: 65, advantage: 23 },
  { dimension: 'SFD / Microfinance', khepra: 97, deloitte: 68, pwc: 65, ey: 62, kpmg: 60, advantage: 29 },
  { dimension: 'Digital & FinTech', khepra: 94, deloitte: 78, pwc: 75, ey: 72, kpmg: 70, advantage: 16 },
];





