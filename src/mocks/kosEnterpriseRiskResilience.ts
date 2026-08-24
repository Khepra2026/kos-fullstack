export const riskResilienceOverview = {
  globalScore: 91,
  activeRisks: 24,
  mitigatedRisks: 18,
  criticalRisks: 2,
  krissDefined: 30,
  stressTestsRun: 8,
  resilienceScore: 88,
  lastAuditDate: '2026-06-25T08:00:00Z',
  domains: [
    { id: 'regulatory', label: 'Réglementaire', score: 92, risks: 6, mitigated: 5 },
    { id: 'operational', label: 'Opérationnel', score: 85, risks: 8, mitigated: 6 },
    { id: 'financial', label: 'Financier', score: 88, risks: 5, mitigated: 4 },
    { id: 'reputation', label: 'Réputationnel', score: 82, risks: 4, mitigated: 3 },
    { id: 'cyber', label: 'Cybersécurité', score: 94, risks: 7, mitigated: 6 },
    { id: 'strategic', label: 'Stratégique', score: 78, risks: 4, mitigated: 2 },
    { id: 'compliance', label: 'Conformité', score: 90, risks: 5, mitigated: 4 },
    { id: 'ai', label: 'Intelligence Artificielle', score: 84, risks: 5, mitigated: 3 },
  ],
};

export const riskRegisters = [
  { id: 'RSK-001', label: 'Non-conformité LBC/FT — Sanctions GAFI', domain: 'regulatory', probability: 65, impact: 92, inherent: 88, residual: 25, trend: 'decreasing', owner: 'RC LBC/FT', kri: 'KRI-REG-001', plan: 'Programme conformité 6 mois — audit externe trimestriel' },
  { id: 'RSK-002', label: 'Évolution réglementaire BCEAO non anticipée', domain: 'regulatory', probability: 45, impact: 78, inherent: 72, residual: 20, trend: 'stable', owner: 'Partner Regulatory', kri: 'KRI-REG-002', plan: 'Veille hebdomadaire + Observatoire BCEAO actif' },
  { id: 'RSK-003', label: 'Départ Consultant Senior — Perte expertise', domain: 'operational', probability: 35, impact: 85, inherent: 65, residual: 30, trend: 'stable', owner: 'DRH', kri: 'KRI-OPS-001', plan: 'Plan succession + documentation SOP + retention bonus' },
  { id: 'RSK-004', label: 'Défaillance Edge Function critique', domain: 'operational', probability: 20, impact: 90, inherent: 55, residual: 15, trend: 'decreasing', owner: 'CTO', kri: 'KRI-OPS-002', plan: 'Circuit breaker + auto-recovery + monitoring 24/7' },
  { id: 'RSK-005', label: 'Impayé client > 90 jours', domain: 'financial', probability: 30, impact: 70, inherent: 50, residual: 18, trend: 'stable', owner: 'DAF', kri: 'KRI-FIN-001', plan: 'Relance progressive + provision IFRS 9 + arbitrage' },
  { id: 'RSK-006', label: 'Fluctuation devise FCFA/EUR/USD', domain: 'financial', probability: 55, impact: 60, inherent: 58, residual: 35, trend: 'increasing', owner: 'DAF', kri: 'KRI-FIN-002', plan: 'Couverture naturelle + contrats en EUR + veille macro' },
  { id: 'RSK-007', label: 'Atteinte réputationnelle — Média / Réseaux sociaux', domain: 'reputation', probability: 15, impact: 95, inherent: 55, residual: 12, trend: 'stable', owner: 'DirCom', kri: 'KRI-REP-001', plan: 'Protocole crise + monitoring mentions + porte-parole formé' },
  { id: 'RSK-008', label: 'Ransomware / Cyberattaque', domain: 'cyber', probability: 25, impact: 98, inherent: 72, residual: 18, trend: 'stable', owner: 'RSSI', kri: 'KRI-CYB-001', plan: 'SOC 24/7 + backups immuables + pentest trimestriel' },
  { id: 'RSK-009', label: 'Fuite de données clients', domain: 'cyber', probability: 12, impact: 95, inherent: 54, residual: 10, trend: 'decreasing', owner: 'DPO', kri: 'KRI-CYB-002', plan: 'Chiffrement AES-256 + DLP + formation collaborateurs' },
  { id: 'RSK-010', label: 'Perte part de marché — nouveau concurrent', domain: 'strategic', probability: 40, impact: 75, inherent: 58, residual: 30, trend: 'increasing', owner: 'Managing Partner', kri: 'KRI-STR-001', plan: 'Différenciation offre + expansion CEMAC + R&D innovation' },
];

export const stressTestResults = [
  { id: 'ST-001', scenario: 'Crise systémique UEMOA — Dévaluation FCFA 20%', type: 'macro', severity: 'extreme', capitalImpact: -15.2, liquidityImpact: -22.5, profitabilityImpact: -35.8, assetQualityImpact: -18.3, overallRating: 'RÉSILIENT', runDate: '2026-06-20' },
  { id: 'ST-002', scenario: 'Cyberattaque majeure — Indisponibilité 72h', type: 'operational', severity: 'severe', capitalImpact: -8.5, liquidityImpact: -12.0, profitabilityImpact: -28.4, assetQualityImpact: -5.2, overallRating: 'RÉSILIENT', runDate: '2026-06-18' },
  { id: 'ST-003', scenario: 'Retrait agrément COBAC — Suspension activités CEMAC', type: 'regulatory', severity: 'severe', capitalImpact: -25.8, liquidityImpact: -35.2, profitabilityImpact: -48.5, assetQualityImpact: -30.1, overallRating: 'VULNÉRABLE', runDate: '2026-06-15' },
  { id: 'ST-004', scenario: 'Départ simultané 3 Partners clés', type: 'operational', severity: 'moderate', capitalImpact: -5.2, liquidityImpact: -8.5, profitabilityImpact: -18.2, assetQualityImpact: -3.8, overallRating: 'RÉSILIENT', runDate: '2026-06-12' },
  { id: 'ST-005', scenario: 'Hausse inflation zone franc 12%', type: 'macro', severity: 'moderate', capitalImpact: -7.5, liquidityImpact: -10.2, profitabilityImpact: -22.5, assetQualityImpact: -8.5, overallRating: 'RÉSILIENT', runDate: '2026-06-10' },
  { id: 'ST-006', scenario: 'Contentieux fiscal majeur — Redressement 500M FCFA', type: 'financial', severity: 'severe', capitalImpact: -18.5, liquidityImpact: -25.0, profitabilityImpact: -42.0, assetQualityImpact: -12.5, overallRating: 'VULNÉRABLE', runDate: '2026-06-08' },
  { id: 'ST-007', scenario: 'Pandémie / Crise sanitaire — Télétravail 6 mois', type: 'operational', severity: 'moderate', capitalImpact: -3.5, liquidityImpact: -5.8, profitabilityImpact: -12.5, assetQualityImpact: -2.5, overallRating: 'RÉSILIENT', runDate: '2026-06-05' },
  { id: 'ST-008', scenario: 'Stress combiné — Crise macro + Cyber + Réglementaire', type: 'combined', severity: 'extreme', capitalImpact: -35.5, liquidityImpact: -48.2, profitabilityImpact: -65.0, assetQualityImpact: -42.8, overallRating: 'CRITIQUE', runDate: '2026-06-22' },
];

export const businessContinuityPlans = [
  { id: 'BCP-001', name: 'PCA — Perte Site Principal', tier: 1, rto: '4h', rpo: '15min', lastTested: '2026-05-15', testResult: 'SUCCESS', gaps: 0, owner: 'CTO' },
  { id: 'BCP-002', name: 'PRA — Indisponibilité Supabase', tier: 1, rto: '2h', rpo: '5min', lastTested: '2026-06-01', testResult: 'SUCCESS', gaps: 0, owner: 'CTO' },
  { id: 'BCP-003', name: 'PCA — Perte Accès Internet', tier: 2, rto: '8h', rpo: '1h', lastTested: '2026-04-20', testResult: 'SUCCESS', gaps: 1, owner: 'DSI' },
  { id: 'BCP-004', name: 'PRA — Crise Réputationnelle', tier: 1, rto: '1h', rpo: 'instant', lastTested: '2026-03-10', testResult: 'SUCCESS', gaps: 0, owner: 'DirCom' },
  { id: 'BCP-005', name: 'PCA — Pandémie / Crise Sanitaire', tier: 2, rto: '24h', rpo: '4h', lastTested: '2026-02-28', testResult: 'PARTIAL', gaps: 2, owner: 'DRH' },
  { id: 'BCP-006', name: 'PRA — Perte Expertise Critique', tier: 2, rto: '72h', rpo: '24h', lastTested: '2026-05-30', testResult: 'SUCCESS', gaps: 0, owner: 'DRH' },
];

export const kriDefinitions = [
  { id: 'KRI-REG-001', name: 'Taux Conformité LBC/FT', domain: 'regulatory', target: 95, current: 92, threshold: 85, unit: '%', frequency: 'Mensuel', trend: 'improving' },
  { id: 'KRI-REG-002', name: 'Délai Moyen Veille Réglementaire', domain: 'regulatory', target: 24, current: 18, threshold: 48, unit: 'h', frequency: 'Hebdo', trend: 'improving' },
  { id: 'KRI-OPS-001', name: 'Taux Rétention Talents Clés', domain: 'operational', target: 95, current: 91, threshold: 85, unit: '%', frequency: 'Trimestriel', trend: 'stable' },
  { id: 'KRI-OPS-002', name: 'Disponibilité Edge Functions', domain: 'operational', target: 99.99, current: 99.93, threshold: 99.9, unit: '%', frequency: 'Quotidien', trend: 'improving' },
  { id: 'KRI-FIN-001', name: 'DSO — Days Sales Outstanding', domain: 'financial', target: 45, current: 52, threshold: 60, unit: 'jours', frequency: 'Mensuel', trend: 'worsening' },
  { id: 'KRI-FIN-002', name: 'Exposition Devise', domain: 'financial', target: 15, current: 22, threshold: 30, unit: '%', frequency: 'Mensuel', trend: 'worsening' },
  { id: 'KRI-REP-001', name: 'Sentiment Média / Réseaux', domain: 'reputation', target: 85, current: 82, threshold: 70, unit: '%', frequency: 'Hebdo', trend: 'stable' },
  { id: 'KRI-CYB-001', name: 'MTTD — Mean Time To Detect', domain: 'cyber', target: 5, current: 8, threshold: 15, unit: 'min', frequency: 'Quotidien', trend: 'improving' },
  { id: 'KRI-CYB-002', name: 'Vulnérabilités Critiques Ouvertes', domain: 'cyber', target: 0, current: 1, threshold: 2, unit: 'count', frequency: 'Quotidien', trend: 'improving' },
  { id: 'KRI-STR-001', name: 'Part de Marché UEMOA', domain: 'strategic', target: 25, current: 19, threshold: 15, unit: '%', frequency: 'Trimestriel', trend: 'improving' },
];

export const resilienceKPIs = {
  totalRisks: 42,
  activeRisks: 24,
  mitigatedRisks: 18,
  criticalOpen: 2,
  krissTotal: 30,
  krissOnTarget: 22,
  stressTestsPassed: 6,
  stressTestsFailed: 2,
  bcpTested: 6,
  bcpGaps: 3,
  mttr: 3.8,
  rtoCompliance: 94,
  riskAppetiteScore: 78,
  iso31000Maturity: 85,
  coso2013Maturity: 82,
  iso22301Maturity: 76,
};





