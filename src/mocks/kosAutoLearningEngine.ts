export const autoLearningCycles = [
  { id: 'alc-001', domain: 'Réglementaire BCEAO', source: 'Instruction 008-2026', knowledgeAbsorbed: 1247, confidence: 98.2, validatedBy: 'Regulatory AI', date: '2026-06-24', status: 'completed' },
  { id: 'alc-002', domain: 'Gouvernance COBAC', source: 'Règlement 05-2025', knowledgeAbsorbed: 893, confidence: 96.7, validatedBy: 'Audit AI', date: '2026-06-23', status: 'completed' },
  { id: 'alc-003', domain: 'LCB/FT GAFI', source: 'Recommandation 24 Révisée', knowledgeAbsorbed: 1562, confidence: 97.4, validatedBy: 'AML AI', date: '2026-06-22', status: 'completed' },
  { id: 'alc-004', domain: 'Fiscalité Internationale', source: 'BEPS 2.0 Pilier 2', knowledgeAbsorbed: 2103, confidence: 95.8, validatedBy: 'Tax AI', date: '2026-06-21', status: 'completed' },
  { id: 'alc-005', domain: 'ESG ISSB', source: 'IFRS S1/S2 2026', knowledgeAbsorbed: 987, confidence: 94.1, validatedBy: 'ESG AI', date: '2026-06-20', status: 'completed' },
  { id: 'alc-006', domain: 'FinTech UEMOA', source: 'Instruction BCEAO 012-2026', knowledgeAbsorbed: 734, confidence: 92.9, validatedBy: 'Strategy AI', date: '2026-06-24', status: 'in_progress' },
  { id: 'alc-007', domain: 'Cybersécurité Bancaire', source: 'Directive COBAC 2027', knowledgeAbsorbed: 1456, confidence: 91.3, validatedBy: 'Security AI', date: '2026-06-23', status: 'in_progress' },
];

export const learningStats = {
  totalCycles: 247,
  cyclesThisMonth: 34,
  totalKnowledgeUnits: 184523,
  averageConfidence: 95.8,
  crossDomainTransfers: 89,
  autonomousDecisions: 1247,
  humanValidationsNeeded: 23,
  learningVelocity: 12.4,
};

export const crossDomainLearning = [
  { from: 'Réglementaire BCEAO', to: 'Audit Bancaire', transfers: 34, impact: 91 },
  { from: 'Gouvernance COBAC', to: 'Due Diligence', transfers: 28, impact: 88 },
  { from: 'LCB/FT GAFI', to: 'Conformité', transfers: 41, impact: 94 },
  { from: 'ESG ISSB', to: 'Stratégie', transfers: 19, impact: 82 },
  { from: 'Fiscalité BEPS', to: 'Prix de Transfert', transfers: 36, impact: 93 },
  { from: 'FinTech', to: 'Innovation', transfers: 22, impact: 85 },
  { from: 'Cybersécurité', to: 'Résilience', transfers: 15, impact: 79 },
];

export const autoCurriculum = [
  { module: 'Régulation Fintech UEMOA 2026-2028', priority: 'P0', estimatedHours: 18, agents: 7, dependencies: ['BCEAO 012-2026'] },
  { module: 'Normes IFRS 18/19 — Remplacement IAS 1', priority: 'P0', estimatedHours: 24, agents: 5, dependencies: ['IFRS Foundation 2026'] },
  { module: 'Directive CSRD Transposition UEMOA', priority: 'P1', estimatedHours: 32, agents: 6, dependencies: ['UE CSRD', 'BCEAO ESG'] },
  { module: 'IA Act Européen — Implications Afrique', priority: 'P1', estimatedHours: 20, agents: 8, dependencies: ['EU AI Act', 'ISO 42001'] },
  { module: 'Stablecoins & Monnaies Numériques BCEAO', priority: 'P2', estimatedHours: 16, agents: 4, dependencies: ['BCEAO Lab FinTech'] },
];

export const selfImprovementLog = [
  { id: 'sil-001', date: '2026-06-24 08:15', action: 'Auto-détection gap connaissance COBAC Règlement 05-2025', trigger: 'Requête client Due Diligence CEMAC', resolution: 'Cycle d apprentissage lancé — 893 unités absorbées en 2.3h', status: 'resolved' },
  { id: 'sil-002', date: '2026-06-24 06:42', action: 'Confiance insuffisante sur LCB/FT GAFI 24', trigger: 'Seuil confiance < 85% détecté', resolution: 'Rescan 1562 documents — confiance remontée à 97.4%', status: 'resolved' },
  { id: 'sil-003', date: '2026-06-23 22:10', action: 'Incohérence cross-domain ESG → Fiscalité', trigger: 'Contradiction ISSB vs OCDE BEPS détectée', resolution: 'Résolution automatique — 2 cycles croisés', status: 'resolved' },
  { id: 'sil-004', date: '2026-06-23 15:30', action: 'Nouveau référentiel détecté : IFRS 18', trigger: 'Veille automatique RSS/Journal Officiel', resolution: 'Curriculum généré — planification 24h apprentissage', status: 'in_progress' },
];

export const learningDomains = [
  { name: 'Réglementaire', coverage: 98, velocity: 15.2, agents: 12, cycles: 89 },
  { name: 'Fiscalité', coverage: 95, velocity: 11.8, agents: 6, cycles: 52 },
  { name: 'Gouvernance', coverage: 97, velocity: 13.5, agents: 8, cycles: 45 },
  { name: 'ESG & Durabilité', coverage: 91, velocity: 9.4, agents: 5, cycles: 31 },
  { name: 'Technologie', coverage: 94, velocity: 14.1, agents: 7, cycles: 38 },
  { name: 'Stratégie', coverage: 96, velocity: 10.2, agents: 4, cycles: 27 },
];





