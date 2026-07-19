export const regulatoryComplianceScanner = {
  totalReferentiels: 15,
  referentiels: [
    { id: 'bceao', name: 'BCEAO', region: 'UEMOA', textes: 22, score: 98, lastScan: '2026-06-24', issues: 0, status: 'conforme' },
    { id: 'cobac', name: 'COBAC', region: 'CEMAC', textes: 18, score: 95, lastScan: '2026-06-24', issues: 0, status: 'conforme' },
    { id: 'ohada', name: 'OHADA', region: 'Afrique', textes: 5, score: 97, lastScan: '2026-06-24', issues: 0, status: 'conforme' },
    { id: 'gafi', name: 'GAFI/FATF', region: 'International', textes: 40, score: 96, lastScan: '2026-06-24', issues: 0, status: 'conforme' },
    { id: 'giaba', name: 'GIABA', region: 'CEDEAO', textes: 5, score: 94, lastScan: '2026-06-24', issues: 0, status: 'conforme' },
    { id: 'gabac', name: 'GABAC', region: 'CEMAC', textes: 4, score: 92, lastScan: '2026-06-24', issues: 1, status: 'surveillance' },
    { id: 'uemoa', name: 'UEMOA', region: 'UEMOA', textes: 8, score: 95, lastScan: '2026-06-24', issues: 0, status: 'conforme' },
    { id: 'cemac', name: 'CEMAC', region: 'CEMAC', textes: 6, score: 93, lastScan: '2026-06-24', issues: 0, status: 'conforme' },
    { id: 'cima', name: 'CIMA', region: 'Afrique', textes: 3, score: 91, lastScan: '2026-06-24', issues: 1, status: 'surveillance' },
    { id: 'cipres', name: 'CIPRES', region: 'Afrique', textes: 2, score: 78, lastScan: '2026-06-24', issues: 2, status: 'attention' },
    { id: 'iso31000', name: 'ISO 31000', region: 'International', textes: 1, score: 98, lastScan: '2026-06-24', issues: 0, status: 'conforme' },
    { id: 'iso27001', name: 'ISO 27001:2022', region: 'International', textes: 1, score: 95, lastScan: '2026-06-24', issues: 0, status: 'conforme' },
    { id: 'iso42001', name: 'ISO 42001', region: 'International', textes: 1, score: 88, lastScan: '2026-06-24', issues: 3, status: 'attention' },
    { id: 'rgpd', name: 'RGPD / APDP', region: 'Afrique/Europe', textes: 3, score: 96, lastScan: '2026-06-24', issues: 0, status: 'conforme' },
    { id: 'issb', name: 'ISSB (IFRS S1/S2)', region: 'International', textes: 2, score: 92, lastScan: '2026-06-24', issues: 0, status: 'conforme' },
  ],
  totalTextes: 121,
  textesVerifies: 118,
  textesEnAttente: 3,
  scoreConformiteGlobal: 94,
  alertesActives: 7,
  dernierScanComplet: '2026-06-24T06:00:00Z',
  prochainScan: '2026-06-25T06:00:00Z'
};

export const complianceAlerts = [
  { id: 'AL-CIPRES-01', referentiel: 'CIPRES', severite: 'moyenne', message: '2 textes non vérifiés — Règlements prévoyance sociale CEMAC', action: 'Vérification programme J+7', status: 'en_attente' },
  { id: 'AL-CIPRES-02', referentiel: 'CIPRES', severite: 'basse', message: 'Score 78/100 sous seuil 85 — enrichissement Gap Analysis requis', action: 'Enrichissement J+30', status: 'en_attente' },
  { id: 'AL-ISO42001-01', referentiel: 'ISO 42001', severite: 'haute', message: '3 gaps certification — Digital Twin explicabilité, registre IA exhaustif, audit externe', action: 'Plan remédiation J+14', status: 'en_cours' },
  { id: 'AL-CIMA-01', referentiel: 'CIMA', severite: 'basse', message: 'Règlement CIMA 2026-01 non intégré — assurance digitale', action: 'Intégration J+21', status: 'en_attente' },
  { id: 'AL-GABAC-01', referentiel: 'GABAC', severite: 'basse', message: '1 texte non vérifié — évaluation mutuelle 2025', action: 'Vérification J+7', status: 'en_attente' },
  { id: 'AL-BCEAO-01', referentiel: 'BCEAO', severite: 'info', message: 'Veille : nouvelle instruction BCEAO attendue Q3 2026 — digitalisation SFD', action: 'Surveillance', status: 'surveillance' },
  { id: 'AL-COBAC-01', referentiel: 'COBAC', severite: 'info', message: 'Veille : directive COBAC 2027 résilience opérationnelle — publication imminente', action: 'Surveillance', status: 'surveillance' },
];

export const complianceCoverage = [
  { domain: 'Bancaire BCEAO', coverage: 98, gaps: 0, textes: 22, status: 'optimal' },
  { domain: 'Bancaire COBAC', coverage: 95, gaps: 0, textes: 18, status: 'optimal' },
  { domain: 'MicroFinance UEMOA', coverage: 97, gaps: 0, textes: 15, status: 'optimal' },
  { domain: 'MicroFinance CEMAC', coverage: 92, gaps: 1, textes: 8, status: 'stable' },
  { domain: 'LBC/FT GAFI', coverage: 96, gaps: 0, textes: 40, status: 'optimal' },
  { domain: 'Gouvernance OHADA', coverage: 97, gaps: 0, textes: 5, status: 'optimal' },
  { domain: 'Prix de Transfert BEPS', coverage: 95, gaps: 0, textes: 6, status: 'optimal' },
  { domain: 'ESG / ISSB', coverage: 92, gaps: 0, textes: 2, status: 'stable' },
  { domain: 'Assurance CIMA', coverage: 91, gaps: 1, textes: 3, status: 'stable' },
  { domain: 'Sécurité Sociale CIPRES', coverage: 78, gaps: 2, textes: 2, status: 'critique' },
  { domain: 'IA / ISO 42001', coverage: 88, gaps: 3, textes: 1, status: 'critique' },
  { domain: 'RGPD / APDP', coverage: 96, gaps: 0, textes: 3, status: 'optimal' },
];

export const complianceDashboardKPIs = {
  globalScore: 94,
  textesCouverts: '118/121',
  couverture: '97.5%',
  gapsCritiques: 2,
  gapsTotaux: 7,
  referentielsConformes: '11/15',
  alertesActives: 7,
  tempsReponseMoyen: '48h',
  derniereVerification: '24 Juin 2026 06:00 UTC',
  prochaineVerification: '25 Juin 2026 06:00 UTC',
  edgeFunctions: ['kos-regulatory-intelligence-engine', 'kos-regulatory-compliance-engine', 'kos-compliance-quality-max'],
  cronJobs: ['kos-daily-compliance-scan (06:00)', 'kos-weekly-regulatory-digest (lundi 08:00)'],
};





