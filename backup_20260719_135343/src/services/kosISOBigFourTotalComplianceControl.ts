// KOS ISO+BigFour Total Compliance & Quality Control Service™
// Contrôle Conformité et Qualité Totale aux Normes ISO + 150% Big Four
// KHEPRA EXPERTS — 25 Juin 2026

export interface ISOStandardCompliance {
  standard: string;
  name: string;
  version: string;
  clauses_verified: number;
  clauses_total: number;
  score: number;
  gaps_critical: number;
  gaps_major: number;
  gaps_minor: number;
  last_audit: string;
  next_audit: string;
  status: 'certified' | 'compliant' | 'partial' | 'non_compliant' | 'targeted';
  evidence_count: number;
}

export interface BigFourDimension {
  dimension: string;
  firm_reference: string;
  score: number;
  target: number;
  gap: number;
  controls_tested: number;
  controls_passed: number;
  findings: number;
  status: 'exceeds' | 'meets' | 'approaching' | 'below';
}

export interface TotalComplianceKPIs {
  global_compliance_index: number;
  iso_standards_covered: number;
  iso_standards_certified: number;
  bigfour_dimensions: number;
  bigfour_exceeds: number;
  total_controls: number;
  controls_tested: number;
  controls_effective: number;
  control_gaps: number;
  verification_logs_count: number;
  risk_matrices_count: number;
  open_actions: number;
  critical_actions: number;
  last_full_audit: string;
  overall_rating: string;
}

export const ISO_STANDARDS: ISOStandardCompliance[] = [
  {
    standard: 'ISO 9001:2015',
    name: 'Quality Management Systems',
    version: '2015',
    clauses_verified: 10,
    clauses_total: 10,
    score: 94,
    gaps_critical: 0,
    gaps_major: 0,
    gaps_minor: 2,
    last_audit: '2026-05-15',
    next_audit: '2026-11-15',
    status: 'certified',
    evidence_count: 38,
  },
  {
    standard: 'ISO 27001:2022',
    name: 'Information Security Management',
    version: '2022',
    clauses_verified: 14,
    clauses_total: 14,
    score: 95,
    gaps_critical: 0,
    gaps_major: 0,
    gaps_minor: 1,
    last_audit: '2026-06-10',
    next_audit: '2026-12-10',
    status: 'certified',
    evidence_count: 42,
  },
  {
    standard: 'ISO 31000:2018',
    name: 'Risk Management',
    version: '2018',
    clauses_verified: 8,
    clauses_total: 8,
    score: 91,
    gaps_critical: 0,
    gaps_major: 1,
    gaps_minor: 1,
    last_audit: '2026-04-20',
    next_audit: '2026-10-20',
    status: 'compliant',
    evidence_count: 25,
  },
  {
    standard: 'ISO 22301:2019',
    name: 'Business Continuity Management',
    version: '2019',
    clauses_verified: 9,
    clauses_total: 10,
    score: 85,
    gaps_critical: 0,
    gaps_major: 2,
    gaps_minor: 1,
    last_audit: '2026-03-30',
    next_audit: '2026-09-30',
    status: 'partial',
    evidence_count: 18,
  },
  {
    standard: 'ISO 37001:2016',
    name: 'Anti-Bribery Management',
    version: '2016',
    clauses_verified: 7,
    clauses_total: 8,
    score: 88,
    gaps_critical: 0,
    gaps_major: 1,
    gaps_minor: 2,
    last_audit: '2026-02-15',
    next_audit: '2026-08-15',
    status: 'compliant',
    evidence_count: 15,
  },
  {
    standard: 'ISO 37301:2021',
    name: 'Compliance Management Systems',
    version: '2021',
    clauses_verified: 8,
    clauses_total: 10,
    score: 89,
    gaps_critical: 0,
    gaps_major: 1,
    gaps_minor: 3,
    last_audit: '2026-05-20',
    next_audit: '2026-11-20',
    status: 'compliant',
    evidence_count: 22,
  },
  {
    standard: 'ISO 27701:2019',
    name: 'Privacy Information Management',
    version: '2019',
    clauses_verified: 6,
    clauses_total: 8,
    score: 82,
    gaps_critical: 0,
    gaps_major: 2,
    gaps_minor: 2,
    last_audit: '2026-06-01',
    next_audit: '2026-12-01',
    status: 'partial',
    evidence_count: 12,
  },
  {
    standard: 'ISO 42001:2023',
    name: 'AI Management System',
    version: '2023',
    clauses_verified: 5,
    clauses_total: 9,
    score: 88,
    gaps_critical: 0,
    gaps_major: 2,
    gaps_minor: 3,
    last_audit: '2026-06-20',
    next_audit: '2026-12-20',
    status: 'partial',
    evidence_count: 10,
  },
  {
    standard: 'ISAE 3000',
    name: 'Assurance Engagements',
    version: 'Revised',
    clauses_verified: 6,
    clauses_total: 7,
    score: 90,
    gaps_critical: 0,
    gaps_major: 0,
    gaps_minor: 2,
    last_audit: '2026-04-10',
    next_audit: '2026-10-10',
    status: 'compliant',
    evidence_count: 16,
  },
  {
    standard: 'ISAE 3402',
    name: 'Assurance on Controls at Service Organization',
    version: 'Revised',
    clauses_verified: 4,
    clauses_total: 6,
    score: 78,
    gaps_critical: 1,
    gaps_major: 2,
    gaps_minor: 1,
    last_audit: '2026-03-15',
    next_audit: '2026-09-15',
    status: 'targeted',
    evidence_count: 8,
  },
];

export const BIG_FOUR_DIMENSIONS: BigFourDimension[] = [
  {
    dimension: 'Gouvernance & Contrôle Interne',
    firm_reference: 'PwC — Governance, Risk & Compliance Framework',
    score: 92,
    target: 95,
    gap: 3,
    controls_tested: 45,
    controls_passed: 42,
    findings: 3,
    status: 'approaching',
  },
  {
    dimension: 'Audit & Assurance Qualité',
    firm_reference: 'Deloitte — Internal Control & Audit Methodology',
    score: 94,
    target: 95,
    gap: 1,
    controls_tested: 38,
    controls_passed: 36,
    findings: 2,
    status: 'meets',
  },
  {
    dimension: 'Financial Reporting IFRS',
    firm_reference: 'EY — IFRS 9/15/16 Compliance',
    score: 88,
    target: 95,
    gap: 7,
    controls_tested: 28,
    controls_passed: 25,
    findings: 4,
    status: 'approaching',
  },
  {
    dimension: 'Regulatory Compliance COBAC/CEMAC',
    firm_reference: 'KPMG — Regulatory Compliance & Transformation',
    score: 96,
    target: 95,
    gap: -1,
    controls_tested: 52,
    controls_passed: 50,
    findings: 1,
    status: 'exceeds',
  },
  {
    dimension: 'Gestion des Risques',
    firm_reference: 'PwC — Enterprise Risk Management',
    score: 91,
    target: 95,
    gap: 4,
    controls_tested: 32,
    controls_passed: 29,
    findings: 3,
    status: 'approaching',
  },
  {
    dimension: 'Sécurité SI & Cyber',
    firm_reference: 'Deloitte — Cyber Risk Services',
    score: 95,
    target: 95,
    gap: 0,
    controls_tested: 35,
    controls_passed: 34,
    findings: 1,
    status: 'meets',
  },
  {
    dimension: 'LBC-FT & Sanctions',
    firm_reference: 'KPMG — AML & Sanctions Compliance',
    score: 93,
    target: 95,
    gap: 2,
    controls_tested: 30,
    controls_passed: 28,
    findings: 2,
    status: 'approaching',
  },
  {
    dimension: 'Protection Données & Privacy',
    firm_reference: 'EY — Data Protection & Privacy',
    score: 97,
    target: 95,
    gap: -2,
    controls_tested: 25,
    controls_passed: 25,
    findings: 0,
    status: 'exceeds',
  },
  {
    dimension: 'ESG & Sustainability',
    firm_reference: 'PwC — ESG & Sustainability Assurance',
    score: 85,
    target: 95,
    gap: 10,
    controls_tested: 18,
    controls_passed: 15,
    findings: 5,
    status: 'below',
  },
  {
    dimension: 'Transformation & Innovation',
    firm_reference: 'Deloitte — Digital Transformation',
    score: 90,
    target: 95,
    gap: 5,
    controls_tested: 20,
    controls_passed: 18,
    findings: 3,
    status: 'approaching',
  },
];

export function computeTotalComplianceKPIs(): TotalComplianceKPIs {
  const isoScore = Math.round(ISO_STANDARDS.reduce((s, iso) => s + iso.score, 0) / ISO_STANDARDS.length);
  const bigfourScore = Math.round(BIG_FOUR_DIMENSIONS.reduce((s, bf) => s + bf.score, 0) / BIG_FOUR_DIMENSIONS.length);
  const gci = Math.round((isoScore + bigfourScore) / 2);

  let rating = 'AAA+ — Excellence Big Four 150%';
  if (gci < 85) rating = 'BBB — En Progression';
  else if (gci < 90) rating = 'A — Conforme';
  else if (gci < 95) rating = 'AA — Premium Big Four';

  return {
    global_compliance_index: gci,
    iso_standards_covered: ISO_STANDARDS.length,
    iso_standards_certified: ISO_STANDARDS.filter(s => s.status === 'certified').length,
    bigfour_dimensions: BIG_FOUR_DIMENSIONS.length,
    bigfour_exceeds: BIG_FOUR_DIMENSIONS.filter(d => d.status === 'exceeds').length,
    total_controls: BIG_FOUR_DIMENSIONS.reduce((s, d) => s + d.controls_tested, 0),
    controls_tested: BIG_FOUR_DIMENSIONS.reduce((s, d) => s + d.controls_tested, 0),
    controls_effective: BIG_FOUR_DIMENSIONS.reduce((s, d) => s + d.controls_passed, 0),
    control_gaps: BIG_FOUR_DIMENSIONS.reduce((s, d) => s + d.findings, 0),
    verification_logs_count: 10,
    risk_matrices_count: 3,
    open_actions: 8,
    critical_actions: 3,
    last_full_audit: '2026-06-25T00:00:00Z',
    overall_rating: rating,
  };
}



