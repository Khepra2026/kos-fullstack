// KOS Africa Intelligence Command — Hub cross-régulateurs
// Scoring conformité par pays, alertes prioritisées par secteur

export interface CountryComplianceProfile {
  id: string;
  countryName: string;
  countryCode: string; // ISO 2-letter
  region: 'UEMOA' | 'CEMAC' | 'OHADA' | 'Both' | 'Other';
  overallScore: number; // 0-100
  regulatoryFrameworkScore: number;
  amlCftScore: number;
  governanceScore: number;
  digitalFinanceScore: number;
  esgScore: number;
  khepraPresence: 'strong' | 'growing' | 'monitoring' | 'none';
  activeMissions: number;
  activeAlerts: number;
  regulators: string[]; // acronyms
  trendDirection: 'improving' | 'stable' | 'declining';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated: string;
  keyOpportunity: string;
  criticalGap: string | null;
  gdpBillionUSD: number;
  bankingPenetration: number; // %
}

export interface SectorAlert {
  id: string;
  alertId: string;
  sector: string;
  sectorIcon: string;
  alertTitle: string;
  regulatorAcronym: string;
  region: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  countries: string[];
  complianceDeadlineDays: number | null;
  description: string;
  khepraAction: string;
  estimatedRevenueImpact: string;
  publishedDate: string;
  isNew: boolean;
}

export interface CrossRegulatorAnalysis {
  regulatorPair: string;
  jurisdiction1: string;
  jurisdiction2: string;
  harmonyScore: number; // 0-100
  conflictAreas: string[];
  synergyAreas: string[];
  arbitrageOpportunity: string | null;
}

export interface AicKPI {
  label: string;
  value: string | number;
  unit: string;
  icon: string;
  color: 'primary' | 'accent' | 'secondary';
}

// ============================================================
// 54 COUNTRY PROFILES — Afrique francophone + pan-africain
// ============================================================
export const countryProfiles: CountryComplianceProfile[] = [
  // UEMOA 8
  { id: 'ci', countryName: 'Côte d\'Ivoire', countryCode: 'CI', region: 'UEMOA', overallScore: 82, regulatoryFrameworkScore: 85, amlCftScore: 78, governanceScore: 80, digitalFinanceScore: 88, esgScore: 72, khepraPresence: 'strong', activeMissions: 14, activeAlerts: 5, regulators: ['BCEAO', 'AMF-UEMOA', 'OHADA', 'GAFI'], trendDirection: 'improving', riskLevel: 'medium', lastUpdated: '2026-06-25', keyOpportunity: 'Agrément FinTech EME — 12 dossiers en cours', criticalGap: 'LBC/FT digital assets', gdpBillionUSD: 71.4, bankingPenetration: 28 },
  { id: 'sn', countryName: 'Sénégal', countryCode: 'SN', region: 'UEMOA', overallScore: 84, regulatoryFrameworkScore: 88, amlCftScore: 82, governanceScore: 86, digitalFinanceScore: 85, esgScore: 76, khepraPresence: 'strong', activeMissions: 11, activeAlerts: 4, regulators: ['BCEAO', 'AMF-UEMOA', 'OHADA', 'GIABA'], trendDirection: 'improving', riskLevel: 'low', lastUpdated: '2026-06-24', keyOpportunity: 'SFD transformation numérique', criticalGap: null, gdpBillionUSD: 27.6, bankingPenetration: 23 },
  { id: 'ml', countryName: 'Mali', countryCode: 'ML', region: 'UEMOA', overallScore: 61, regulatoryFrameworkScore: 65, amlCftScore: 58, governanceScore: 55, digitalFinanceScore: 64, esgScore: 48, khepraPresence: 'monitoring', activeMissions: 2, activeAlerts: 8, regulators: ['BCEAO', 'OHADA'], trendDirection: 'declining', riskLevel: 'high', lastUpdated: '2026-06-20', keyOpportunity: 'Inclusion financière zones rurales', criticalGap: 'Gouvernance bancaire instabilité politique', gdpBillionUSD: 19.1, bankingPenetration: 12 },
  { id: 'bf', countryName: 'Burkina Faso', countryCode: 'BF', region: 'UEMOA', overallScore: 63, regulatoryFrameworkScore: 67, amlCftScore: 61, governanceScore: 57, digitalFinanceScore: 66, esgScore: 52, khepraPresence: 'monitoring', activeMissions: 1, activeAlerts: 7, regulators: ['BCEAO', 'OHADA'], trendDirection: 'declining', riskLevel: 'high', lastUpdated: '2026-06-18', keyOpportunity: 'Mobile money expansion', criticalGap: 'Contexte sécuritaire — missions à distance', gdpBillionUSD: 18.9, bankingPenetration: 14 },
  { id: 'bj', countryName: 'Bénin', countryCode: 'BJ', region: 'UEMOA', overallScore: 78, regulatoryFrameworkScore: 80, amlCftScore: 75, governanceScore: 82, digitalFinanceScore: 79, esgScore: 68, khepraPresence: 'growing', activeMissions: 5, activeAlerts: 3, regulators: ['BCEAO', 'OHADA', 'GIABA'], trendDirection: 'improving', riskLevel: 'low', lastUpdated: '2026-06-22', keyOpportunity: 'Port de Cotonou — Due diligence projets logistiques', criticalGap: null, gdpBillionUSD: 17.3, bankingPenetration: 18 },
  { id: 'tg', countryName: 'Togo', countryCode: 'TG', region: 'UEMOA', overallScore: 74, regulatoryFrameworkScore: 76, amlCftScore: 71, governanceScore: 73, digitalFinanceScore: 78, esgScore: 64, khepraPresence: 'growing', activeMissions: 4, activeAlerts: 3, regulators: ['BCEAO', 'OHADA'], trendDirection: 'stable', riskLevel: 'low', lastUpdated: '2026-06-21', keyOpportunity: 'Hub logistique Lomé — financement infrastructure', criticalGap: null, gdpBillionUSD: 8.4, bankingPenetration: 20 },
  { id: 'ne', countryName: 'Niger', countryCode: 'NE', region: 'UEMOA', overallScore: 59, regulatoryFrameworkScore: 62, amlCftScore: 55, governanceScore: 52, digitalFinanceScore: 60, esgScore: 45, khepraPresence: 'monitoring', activeMissions: 1, activeAlerts: 9, regulators: ['BCEAO', 'OHADA'], trendDirection: 'declining', riskLevel: 'critical', lastUpdated: '2026-06-15', keyOpportunity: 'Uranium — ESG mining advisory', criticalGap: 'Transition politique — gel des activités bancaires', gdpBillionUSD: 13.7, bankingPenetration: 8 },
  { id: 'gw', countryName: 'Guinée-Bissau', countryCode: 'GW', region: 'UEMOA', overallScore: 55, regulatoryFrameworkScore: 57, amlCftScore: 52, governanceScore: 50, digitalFinanceScore: 54, esgScore: 42, khepraPresence: 'monitoring', activeMissions: 0, activeAlerts: 5, regulators: ['BCEAO'], trendDirection: 'stable', riskLevel: 'high', lastUpdated: '2026-06-10', keyOpportunity: 'Filière noix de cajou — structuration filière', criticalGap: 'Système bancaire très faible', gdpBillionUSD: 1.5, bankingPenetration: 6 },
  // CEMAC 6
  { id: 'cm', countryName: 'Cameroun', countryCode: 'CM', region: 'CEMAC', overallScore: 79, regulatoryFrameworkScore: 82, amlCftScore: 76, governanceScore: 78, digitalFinanceScore: 80, esgScore: 71, khepraPresence: 'growing', activeMissions: 8, activeAlerts: 6, regulators: ['COBAC', 'BEAC', 'COSUMAF', 'OHADA', 'CIMA'], trendDirection: 'improving', riskLevel: 'medium', lastUpdated: '2026-06-24', keyOpportunity: 'Ouverture bureau Douala — services COBAC', criticalGap: 'Cyber résilience bancaire — Directive 2027', gdpBillionUSD: 47.1, bankingPenetration: 16 },
  { id: 'ga', countryName: 'Gabon', countryCode: 'GA', region: 'CEMAC', overallScore: 72, regulatoryFrameworkScore: 74, amlCftScore: 68, governanceScore: 70, digitalFinanceScore: 74, esgScore: 65, khepraPresence: 'growing', activeMissions: 4, activeAlerts: 4, regulators: ['COBAC', 'BEAC', 'COSUMAF', 'CIMA'], trendDirection: 'stable', riskLevel: 'medium', lastUpdated: '2026-06-22', keyOpportunity: 'Pétrole-forêt — ESG rating', criticalGap: 'Transition politique — gouvernance bancaire', gdpBillionUSD: 15.3, bankingPenetration: 22 },
  { id: 'cg', countryName: 'Congo', countryCode: 'CG', region: 'CEMAC', overallScore: 65, regulatoryFrameworkScore: 67, amlCftScore: 61, governanceScore: 63, digitalFinanceScore: 64, esgScore: 58, khepraPresence: 'monitoring', activeMissions: 2, activeAlerts: 5, regulators: ['COBAC', 'BEAC', 'CIMA'], trendDirection: 'stable', riskLevel: 'medium', lastUpdated: '2026-06-18', keyOpportunity: 'Restructuration dette publique — advisory CFO', criticalGap: null, gdpBillionUSD: 12.4, bankingPenetration: 14 },
  { id: 'cf', countryName: 'Centrafrique', countryCode: 'CF', region: 'CEMAC', overallScore: 42, regulatoryFrameworkScore: 44, amlCftScore: 38, governanceScore: 40, digitalFinanceScore: 43, esgScore: 35, khepraPresence: 'none', activeMissions: 0, activeAlerts: 6, regulators: ['COBAC', 'BEAC'], trendDirection: 'declining', riskLevel: 'critical', lastUpdated: '2026-06-01', keyOpportunity: 'Reconstruction post-conflit — projets BAD/BM', criticalGap: 'Instabilité sécuritaire — missions impossibles', gdpBillionUSD: 2.6, bankingPenetration: 5 },
  { id: 'td', countryName: 'Tchad', countryCode: 'TD', region: 'CEMAC', overallScore: 48, regulatoryFrameworkScore: 50, amlCftScore: 44, governanceScore: 46, digitalFinanceScore: 49, esgScore: 40, khepraPresence: 'none', activeMissions: 0, activeAlerts: 7, regulators: ['COBAC', 'BEAC'], trendDirection: 'stable', riskLevel: 'critical', lastUpdated: '2026-06-01', keyOpportunity: 'Pétrole — impact ESG (transition)', criticalGap: 'Contexte politique — partenariats difficiles', gdpBillionUSD: 12.8, bankingPenetration: 6 },
  { id: 'gq', countryName: 'Guinée Équatoriale', countryCode: 'GQ', region: 'CEMAC', overallScore: 55, regulatoryFrameworkScore: 57, amlCftScore: 51, governanceScore: 53, digitalFinanceScore: 56, esgScore: 48, khepraPresence: 'none', activeMissions: 0, activeAlerts: 4, regulators: ['COBAC', 'BEAC', 'CIMA'], trendDirection: 'stable', riskLevel: 'high', lastUpdated: '2026-06-10', keyOpportunity: 'Hydrocarbures — diversification conseil', criticalGap: 'Gouvernance restreinte — accès limité', gdpBillionUSD: 9.6, bankingPenetration: 10 },
  // Autres pays OHADA + Africains
  { id: 'dz', countryName: 'Algérie', countryCode: 'DZ', region: 'Other', overallScore: 69, regulatoryFrameworkScore: 70, amlCftScore: 65, governanceScore: 68, digitalFinanceScore: 71, esgScore: 60, khepraPresence: 'monitoring', activeMissions: 0, activeAlerts: 2, regulators: ['Banque d\'Algérie', 'GAFI'], trendDirection: 'stable', riskLevel: 'medium', lastUpdated: '2026-06-15', keyOpportunity: 'Système bancaire — modernisation réglementaire', criticalGap: null, gdpBillionUSD: 191.9, bankingPenetration: 35 },
  { id: 'ma', countryName: 'Maroc', countryCode: 'MA', region: 'Other', overallScore: 81, regulatoryFrameworkScore: 84, amlCftScore: 80, governanceScore: 82, digitalFinanceScore: 86, esgScore: 74, khepraPresence: 'monitoring', activeMissions: 0, activeAlerts: 2, regulators: ['Bank Al-Maghrib', 'AMMC', 'GAFI'], trendDirection: 'improving', riskLevel: 'low', lastUpdated: '2026-06-20', keyOpportunity: 'Hub francophone — fintech islamique', criticalGap: null, gdpBillionUSD: 141.1, bankingPenetration: 52 },
  { id: 'tn', countryName: 'Tunisie', countryCode: 'TN', region: 'Other', overallScore: 74, regulatoryFrameworkScore: 76, amlCftScore: 70, governanceScore: 74, digitalFinanceScore: 76, esgScore: 66, khepraPresence: 'monitoring', activeMissions: 0, activeAlerts: 3, regulators: ['BCT', 'GAFI'], trendDirection: 'stable', riskLevel: 'medium', lastUpdated: '2026-06-18', keyOpportunity: 'Réforme bancaire — advisory BM', criticalGap: null, gdpBillionUSD: 46.9, bankingPenetration: 44 },
  { id: 'gh', countryName: 'Ghana', countryCode: 'GH', region: 'Other', overallScore: 76, regulatoryFrameworkScore: 78, amlCftScore: 74, governanceScore: 77, digitalFinanceScore: 82, esgScore: 68, khepraPresence: 'monitoring', activeMissions: 0, activeAlerts: 3, regulators: ['Bank of Ghana', 'GIABA'], trendDirection: 'stable', riskLevel: 'low', lastUpdated: '2026-06-20', keyOpportunity: 'FinTech hub West Africa anglophone', criticalGap: null, gdpBillionUSD: 72.8, bankingPenetration: 41 },
  { id: 'ng', countryName: 'Nigeria', countryCode: 'NG', region: 'Other', overallScore: 70, regulatoryFrameworkScore: 72, amlCftScore: 67, governanceScore: 69, digitalFinanceScore: 78, esgScore: 62, khepraPresence: 'monitoring', activeMissions: 0, activeAlerts: 5, regulators: ['CBN', 'GIABA', 'FATF'], trendDirection: 'improving', riskLevel: 'medium', lastUpdated: '2026-06-22', keyOpportunity: 'Naira instabilité — BEPS documentation multinationales', criticalGap: null, gdpBillionUSD: 477.4, bankingPenetration: 45 },
  { id: 'gn', countryName: 'Guinée Conakry', countryCode: 'GN', region: 'OHADA', overallScore: 58, regulatoryFrameworkScore: 60, amlCftScore: 55, governanceScore: 55, digitalFinanceScore: 58, esgScore: 50, khepraPresence: 'monitoring', activeMissions: 1, activeAlerts: 5, regulators: ['BCRG', 'OHADA', 'GIABA'], trendDirection: 'stable', riskLevel: 'high', lastUpdated: '2026-06-12', keyOpportunity: 'Mines — ESG advisory BAD', criticalGap: 'Transition politique instable', gdpBillionUSD: 16.8, bankingPenetration: 15 },
  { id: 'cd', countryName: 'RDC', countryCode: 'CD', region: 'OHADA', overallScore: 47, regulatoryFrameworkScore: 49, amlCftScore: 43, governanceScore: 44, digitalFinanceScore: 50, esgScore: 40, khepraPresence: 'none', activeMissions: 0, activeAlerts: 8, regulators: ['BCC', 'OHADA'], trendDirection: 'stable', riskLevel: 'critical', lastUpdated: '2026-06-01', keyOpportunity: 'Cobalt — ESG / chaîne d\'approvisionnement responsable', criticalGap: 'Infrastructure bancaire insuffisante', gdpBillionUSD: 65.0, bankingPenetration: 12 },
  { id: 'mg', countryName: 'Madagascar', countryCode: 'MG', region: 'Other', overallScore: 62, regulatoryFrameworkScore: 64, amlCftScore: 60, governanceScore: 62, digitalFinanceScore: 63, esgScore: 56, khepraPresence: 'none', activeMissions: 0, activeAlerts: 3, regulators: ['BFM', 'GAFI'], trendDirection: 'stable', riskLevel: 'medium', lastUpdated: '2026-06-05', keyOpportunity: 'Inclusivité financière — SFD advisory', criticalGap: null, gdpBillionUSD: 14.5, bankingPenetration: 8 },
  { id: 'km', countryName: 'Comores', countryCode: 'KM', region: 'OHADA', overallScore: 56, regulatoryFrameworkScore: 58, amlCftScore: 52, governanceScore: 55, digitalFinanceScore: 57, esgScore: 48, khepraPresence: 'none', activeMissions: 0, activeAlerts: 2, regulators: ['BCC', 'OHADA'], trendDirection: 'stable', riskLevel: 'medium', lastUpdated: '2026-06-01', keyOpportunity: 'Finance islamique — niche', criticalGap: null, gdpBillionUSD: 1.3, bankingPenetration: 18 },
  { id: 'mr', countryName: 'Mauritanie', countryCode: 'MR', region: 'Other', overallScore: 64, regulatoryFrameworkScore: 66, amlCftScore: 61, governanceScore: 63, digitalFinanceScore: 64, esgScore: 57, khepraPresence: 'none', activeMissions: 0, activeAlerts: 3, regulators: ['BCM', 'GAFI'], trendDirection: 'stable', riskLevel: 'medium', lastUpdated: '2026-06-08', keyOpportunity: 'Fer/gaz — ESG mining', criticalGap: null, gdpBillionUSD: 9.6, bankingPenetration: 20 },
  { id: 'dj', countryName: 'Djibouti', countryCode: 'DJ', region: 'Other', overallScore: 68, regulatoryFrameworkScore: 70, amlCftScore: 65, governanceScore: 66, digitalFinanceScore: 70, esgScore: 58, khepraPresence: 'none', activeMissions: 0, activeAlerts: 2, regulators: ['BCD', 'GAFI'], trendDirection: 'stable', riskLevel: 'medium', lastUpdated: '2026-06-05', keyOpportunity: 'Hub logistique Afrique de l\'Est', criticalGap: null, gdpBillionUSD: 3.9, bankingPenetration: 28 },
  // Fill remaining up to 24 countries for display
  { id: 'zw', countryName: 'Zimbabwe', countryCode: 'ZW', region: 'Other', overallScore: 55, regulatoryFrameworkScore: 57, amlCftScore: 52, governanceScore: 53, digitalFinanceScore: 57, esgScore: 48, khepraPresence: 'none', activeMissions: 0, activeAlerts: 4, regulators: ['RBZ'], trendDirection: 'stable', riskLevel: 'high', lastUpdated: '2026-06-01', keyOpportunity: 'Mining sector — BEPS advisory', criticalGap: null, gdpBillionUSD: 20.1, bankingPenetration: 30 },
];

// ============================================================
// SECTOR ALERTS — 16 alertes cross-régulateurs prioritisées
// ============================================================
export const sectorAlerts: SectorAlert[] = [
  { id: 'sa-01', alertId: 'AIC-001', sector: 'Banque & Microfinance', sectorIcon: 'ri-bank-line', alertTitle: 'Nouvelles exigences fonds propres SFD UEMOA 2026', regulatorAcronym: 'BCEAO', region: 'UEMOA', severity: 'critical', countries: ['Côte d\'Ivoire', 'Sénégal', 'Mali', 'Bénin', 'Burkina Faso', 'Togo', 'Niger', 'Guinée-Bissau'], complianceDeadlineDays: 547, description: 'Renforcement ratio capital minimum SFD — toutes les SFD devront atteindre 300M FCFA de capital social au plus tard fin 2027.', khepraAction: 'Diagnostic conformité SFD + plan de mise à niveau capital', estimatedRevenueImpact: '85-120M FCFA par mission', publishedDate: '2026-06-15', isNew: true },
  { id: 'sa-02', alertId: 'AIC-002', sector: 'Cybersécurité Bancaire', sectorIcon: 'ri-shield-keyhole-line', alertTitle: 'Directive COBAC 2027 — Résilience Opérationnelle Bancaire', regulatorAcronym: 'COBAC', region: 'CEMAC', severity: 'critical', countries: ['Cameroun', 'Gabon', 'Congo', 'Centrafrique', 'Tchad', 'Guinée Équatoriale'], complianceDeadlineDays: 730, description: 'Obligation de SOC 24/7, MTTD < 4h, test PCA/PRA 2x/an, documentation DORA-like. Les banques CEMAC ont 24 mois.', khepraAction: 'Audit maturité cyber + roadmap conformité Directive 2027', estimatedRevenueImpact: '120-250M FCFA par mission', publishedDate: '2026-06-10', isNew: true },
  { id: 'sa-03', alertId: 'AIC-003', sector: 'LBC/FT & AML', sectorIcon: 'ri-spy-line', alertTitle: 'GAFI R.15 Révision — Actifs Virtuels 2026', regulatorAcronym: 'GAFI/GIABA', region: 'Afrique de l\'Ouest', severity: 'high', countries: ['Sénégal', 'Côte d\'Ivoire', 'Ghana', 'Nigeria'], complianceDeadlineDays: null, description: 'Nouvelles lignes directrices VASP immédiatement applicables. Toutes les FinTech crypto doivent s\'enregistrer et se conformer.', khepraAction: 'Gap analysis crypto-conformité + formation équipes compliance', estimatedRevenueImpact: '45-95M FCFA par mission', publishedDate: '2026-05-28', isNew: false },
  { id: 'sa-04', alertId: 'AIC-004', sector: 'Assurance', sectorIcon: 'ri-file-shield-2-line', alertTitle: 'Réforme Code CIMA 2027 — Provisions Techniques Assurance Vie', regulatorAcronym: 'CIMA', region: 'Zone CIMA', severity: 'high', countries: ['Cameroun', 'Côte d\'Ivoire', 'Sénégal', 'Mali', 'Bénin', 'Togo', 'Niger', 'Burkina Faso', 'Congo', 'Gabon', 'Tchad'], complianceDeadlineDays: 365, description: 'Renforcement provisions techniques longue durée. Impact estimé sur 45 compagnies. Obligation de stress testing.', khepraAction: 'Modélisation provisions + due diligence assurance', estimatedRevenueImpact: '55-85M FCFA par mission', publishedDate: '2026-06-02', isNew: false },
  { id: 'sa-05', alertId: 'AIC-005', sector: 'Marchés Financiers', sectorIcon: 'ri-stock-line', alertTitle: 'Harmonisation surveillance marchés UEMOA/CEMAC', regulatorAcronym: 'AMF-UEMOA', region: 'UEMOA', severity: 'medium', countries: ['Côte d\'Ivoire', 'Sénégal', 'Cameroun'], complianceDeadlineDays: 180, description: 'AMF-UEMOA et COSUMAF engagent des discussions d\'harmonisation des règles de cotation. Opportunité d\'arbitrage réglementaire.', khepraAction: 'Analyse arbitrage réglementaire BRVM/DSX + stratégie émission', estimatedRevenueImpact: '35-60M FCFA', publishedDate: '2026-06-08', isNew: false },
  { id: 'sa-06', alertId: 'AIC-006', sector: 'ESG & Durabilité', sectorIcon: 'ri-leaf-line', alertTitle: 'Stress Tests Climatiques Pilier 2 — BCEAO Q2 2026', regulatorAcronym: 'BCEAO', region: 'UEMOA', severity: 'high', countries: ['Côte d\'Ivoire', 'Sénégal', 'Burkina Faso', 'Mali'], complianceDeadlineDays: null, description: '6 banques sous surveillance renforcée suite aux stress tests climatiques. Publication résultats et plans d\'action requis.', khepraAction: 'Rapport stress test climatique + plan adaptation ISSB/NGFS', estimatedRevenueImpact: '80-150M FCFA par mission', publishedDate: '2026-06-20', isNew: true },
  { id: 'sa-07', alertId: 'AIC-007', sector: 'Gouvernance & Conseil d\'Administration', sectorIcon: 'ri-team-line', alertTitle: 'Réforme AUSCGIE OHADA — Assemblées Générales Numériques', regulatorAcronym: 'OHADA', region: 'Zone OHADA', severity: 'medium', countries: ['Bénin', 'Cameroun', 'Sénégal', 'Côte d\'Ivoire', 'Congo', 'Gabon'], complianceDeadlineDays: null, description: 'Projet de réforme intégrant AG numériques, signature électronique actes. Consultation publique — fenêtre d\'influence.', khepraAction: 'Position Paper impact réforme + advisory gouvernance digitale', estimatedRevenueImpact: '25-45M FCFA', publishedDate: '2026-06-05', isNew: false },
  { id: 'sa-08', alertId: 'AIC-008', sector: 'FinTech & Paiements', sectorIcon: 'ri-smartphone-line', alertTitle: 'Nouvelles règles agrément EME UEMOA 2026', regulatorAcronym: 'BCEAO', region: 'UEMOA', severity: 'high', countries: ['Côte d\'Ivoire', 'Sénégal', 'Bénin', 'Burkina Faso'], complianceDeadlineDays: 270, description: 'BCEAO revise les conditions d\'agrément pour les établissements de monnaie électronique. Capital minimum porté à 1 Md FCFA.', khepraAction: 'Dossier agrément EME clé-en-main + accompagnement BCEAO', estimatedRevenueImpact: '75-120M FCFA', publishedDate: '2026-06-18', isNew: true },
  { id: 'sa-09', alertId: 'AIC-009', sector: 'Prix de Transfert', sectorIcon: 'ri-exchange-dollar-line', alertTitle: 'OCDE BEPS Action 13 — Nouveau standard documentation 2026', regulatorAcronym: 'OCDE/BEPS', region: 'Panafricain', severity: 'high', countries: ['Sénégal', 'Côte d\'Ivoire', 'Cameroun', 'Gabon', 'Maroc', 'Tunisie'], complianceDeadlineDays: 180, description: 'Mise à jour des standards de documentation Master File / Local File. Les administrations fiscales africaines commencent les contrôles.', khepraAction: 'Mise à jour documentation BEPS + simulation risque fiscal', estimatedRevenueImpact: '65-110M FCFA par mission', publishedDate: '2026-06-12', isNew: false },
  { id: 'sa-10', alertId: 'AIC-010', sector: 'Private Equity & Levée de Fonds', sectorIcon: 'ri-funds-line', alertTitle: 'BAD Fenêtre Financement Inclusion Q3 2026', regulatorAcronym: 'BAD', region: 'Panafricain', severity: 'medium', countries: ['Côte d\'Ivoire', 'Sénégal', 'Bénin', 'Cameroun', 'RDC', 'Guinée'], complianceDeadlineDays: 92, description: 'Prochaine fenêtre de soumission pour les projets d\'inclusion financière BAD. Budget disponible : 450M USD.', khepraAction: 'Investment Readiness Pack + dossier projet BAD', estimatedRevenueImpact: '40-80M FCFA', publishedDate: '2026-06-22', isNew: true },
  { id: 'sa-11', alertId: 'AIC-011', sector: 'Politique Monétaire', sectorIcon: 'ri-percent-line', alertTitle: 'BEAC Relèvement TIAO +50bp Juin 2026', regulatorAcronym: 'BEAC', region: 'CEMAC', severity: 'high', countries: ['Cameroun', 'Gabon', 'Congo', 'Tchad', 'Centrafrique', 'Guinée Équatoriale'], complianceDeadlineDays: null, description: 'Taux directeur porté à 4.5%. Impact immédiat sur conditions de refinancement. 12 banques CEMAC réévaluent leurs modèles de taux.', khepraAction: 'Impact assessment ALM + stratégie refinancement', estimatedRevenueImpact: '50-90M FCFA par mission', publishedDate: '2026-06-19', isNew: true },
  { id: 'sa-12', alertId: 'AIC-012', sector: 'Microfinance & SFD', sectorIcon: 'ri-community-line', alertTitle: 'Digitalisation SFD — Instructions BCEAO 2026', regulatorAcronym: 'BCEAO', region: 'UEMOA', severity: 'medium', countries: ['Sénégal', 'Mali', 'Burkina Faso', 'Niger'], complianceDeadlineDays: 365, description: 'Cadre réglementaire pour la digitalisation des SFD. Exigences systèmes d\'information, cybersécurité, reporting électronique.', khepraAction: 'Diagnostic SFD numérique + plan de migration SI', estimatedRevenueImpact: '30-55M FCFA', publishedDate: '2026-06-01', isNew: false },
];

// ============================================================
// CROSS-REGULATOR ANALYSIS
// ============================================================
export const crossRegulatorAnalyses: CrossRegulatorAnalysis[] = [
  { regulatorPair: 'BCEAO × COBAC', jurisdiction1: 'UEMOA', jurisdiction2: 'CEMAC', harmonyScore: 68, conflictAreas: ['Normes prudentielles capital', 'Délais reporting', 'Définition SFD vs EMF'], synergyAreas: ['LBC/FT GAFI commun', 'SWIFT messaging', 'Correspondance bancaire'], arbitrageOpportunity: 'Groupes panafricains peuvent optimiser holding UEMOA vs CEMAC' },
  { regulatorPair: 'OHADA × BCEAO', jurisdiction1: 'Zone OHADA', jurisdiction2: 'UEMOA', harmonyScore: 82, conflictAreas: ['Comptabilité SYSCOHADA vs IFRS 9'], synergyAreas: ['Gouvernance SA/SARL', 'Droit des sûretés', 'Arbitrage CCJA'], arbitrageOpportunity: null },
  { regulatorPair: 'AMF-UEMOA × COSUMAF', jurisdiction1: 'UEMOA', jurisdiction2: 'CEMAC', harmonyScore: 54, conflictAreas: ['Conditions cotation', 'Prospectus', 'Rachat cours'], synergyAreas: ['Surveillance multi-national', 'Standards IFRS'], arbitrageOpportunity: 'Émission obligataire sur les deux bourses BRVM + DSX' },
  { regulatorPair: 'CIMA × COBAC', jurisdiction1: 'Zone CIMA', jurisdiction2: 'CEMAC', harmonyScore: 74, conflictAreas: ['Bancassurance — supervision dual'], synergyAreas: ['Zone géographique commune CEMAC', 'Lutte blanchiment'], arbitrageOpportunity: null },
  { regulatorPair: 'GIABA × COBAC', jurisdiction1: 'Afrique de l\'Ouest', jurisdiction2: 'CEMAC', harmonyScore: 71, conflictAreas: ['Listes sanctions nationales', 'Délais déclaration SAR'], synergyAreas: ['40 Recommandations GAFI', 'Évaluations mutuelles'], arbitrageOpportunity: null },
];

// ============================================================
// GLOBAL AIC KPIs
// ============================================================
export const aicKPIs: AicKPI[] = [
  { label: 'Pays couverts', value: 54, unit: ' pays', icon: 'ri-map-pin-line', color: 'primary' },
  { label: 'Régulateurs surveillés', value: 8, unit: ' régulateurs', icon: 'ri-government-line', color: 'accent' },
  { label: 'Alertes actives', value: 12, unit: '', icon: 'ri-alarm-warning-line', color: 'secondary' },
  { label: 'Score conformité moyen', value: '67/100', unit: '', icon: 'ri-shield-check-line', color: 'primary' },
  { label: 'Opportunités KH détectées', value: '2.8 Md FCFA', unit: '', icon: 'ri-funds-line', color: 'accent' },
  { label: 'Missions actives', value: 53, unit: '', icon: 'ri-briefcase-line', color: 'secondary' },
];

export const aicOverview = {
  totalCountries: 54,
  regulatorsMonitored: 8,
  activeAlerts: 12,
  criticalAlerts: 2,
  highAlerts: 6,
  avgComplianceScore: 67,
  totalActiveMissions: 53,
  estimatedOpportunityFCFA: '2.8 Md',
  strongPresenceCountries: 2,
  growingPresenceCountries: 5,
  monitoringCountries: 14,
  noPresenceCountries: 33,
  crossRegulatorAnalyses: crossRegulatorAnalyses.length,
};