export const regulatoryWatchStatus = {
  monitoredSources: 47,
  activeAlerts: 8,
  lastScan: '2026-06-24 09:42:15',
  scanFrequency: 'Toutes les 15 minutes',
  totalTextsTracked: 3847,
  newTextsThisMonth: 23,
  coverageRate: 99.2,
  falsePositiveRate: 0.3,
};

export const monitoredRegulators = [
  { name: 'BCEAO', texts: 1247, newThisMonth: 8, alerts: 3, complianceRate: 98.5, lastUpdate: '2026-06-24' },
  { name: 'COBAC', texts: 892, newThisMonth: 5, alerts: 2, complianceRate: 96.8, lastUpdate: '2026-06-23' },
  { name: 'OHADA', texts: 456, newThisMonth: 2, alerts: 0, complianceRate: 99.1, lastUpdate: '2026-06-22' },
  { name: 'GAFI', texts: 234, newThisMonth: 3, alerts: 1, complianceRate: 97.3, lastUpdate: '2026-06-24' },
  { name: 'UEMOA', texts: 567, newThisMonth: 4, alerts: 1, complianceRate: 98.0, lastUpdate: '2026-06-21' },
  { name: 'CEMAC', texts: 451, newThisMonth: 1, alerts: 1, complianceRate: 95.5, lastUpdate: '2026-06-20' },
];

export const activeRegulatoryAlerts = [
  { id: 'REG-2026-089', regulator: 'BCEAO', title: 'Instruction 008-2026 : Nouveau ratio de solvabilité', severity: 'critical', impact: 'Banques UEMOA — Application immédiate', date: '2026-06-24', status: 'analyzing', affectedClients: 12, autoAction: 'RAG mis à jour + Clients notifiés' },
  { id: 'REG-2026-088', regulator: 'COBAC', title: 'Règlement 05-2025 Amendement : Gouvernance SFD', severity: 'high', impact: 'Microfinances CEMAC — 90 jours', date: '2026-06-23', status: 'analyzing', affectedClients: 8, autoAction: 'Guide conforme généré' },
  { id: 'REG-2026-087', regulator: 'GAFI', title: 'Recommandation 24 Révisée : Bénéficiaires Effectifs', severity: 'high', impact: 'Tous secteurs — 180 jours', date: '2026-06-22', status: 'in_progress', affectedClients: 34, autoAction: 'Checklist conformité déployée' },
  { id: 'REG-2026-086', regulator: 'BCEAO', title: 'Circulaire 003-2026 : Reporting ESG obligatoire', severity: 'medium', impact: 'Banques + SFD > 50M — 2027', date: '2026-06-21', status: 'monitoring', affectedClients: 15, autoAction: 'Template reporting créé' },
  { id: 'REG-2026-085', regulator: 'UEMOA', title: 'Directive Protection Données — Amendement 2026', severity: 'medium', impact: 'Toutes institutions financières', date: '2026-06-20', status: 'analyzing', affectedClients: 45, autoAction: 'Gap analysis auto' },
  { id: 'REG-2026-084', regulator: 'CEMAC', title: 'Règlement Change — Nouvelles restrictions', severity: 'critical', impact: 'Transferts transfrontaliers — Immédiat', date: '2026-06-19', status: 'resolved', affectedClients: 6, autoAction: 'Note d’information diffusée' },
  { id: 'REG-2026-083', regulator: 'BCEAO', title: 'Instruction 012-2026 : Agrément FinTech', severity: 'high', impact: 'FinTechs — Processus simplifié', date: '2026-06-18', status: 'resolved', affectedClients: 9, autoAction: 'Kit agrément mis à jour' },
  { id: 'REG-2026-082', regulator: 'OHADA', title: 'Acte Uniforme Révisé — Sociétés Commerciales', severity: 'low', impact: 'Toutes sociétés — 2027', date: '2026-06-17', status: 'monitoring', affectedClients: 62, autoAction: 'Veille programmée' },
];

export const ragAutoUpdateLog = [
  { date: '2026-06-24 08:30', action: 'Indexation Instruction BCEAO 008-2026', documents: 1, embeddings: 247, status: 'success' },
  { date: '2026-06-24 02:15', action: 'Mise à jour GAFI Recommandation 24', documents: 3, embeddings: 892, status: 'success' },
  { date: '2026-06-23 18:00', action: 'Indexation COBAC Règlement 05-2025 Amendé', documents: 2, embeddings: 456, status: 'success' },
  { date: '2026-06-23 12:45', action: 'Scan complet BCEAO — 0 nouveau texte', documents: 0, embeddings: 0, status: 'no_change' },
  { date: '2026-06-23 06:30', action: 'Indexation UEMOA Directive Amendée', documents: 1, embeddings: 198, status: 'success' },
];

export const regulatoryCoverageMatrix = [
  { category: 'Banques', bceao: 98, cobac: 96, gafi: 95, ohada: 92, uemoa: 97, cemac: 89 },
  { category: 'Microfinance', bceao: 99, cobac: 97, gafi: 93, ohada: 90, uemoa: 98, cemac: 91 },
  { category: 'FinTech', bceao: 95, cobac: 88, gafi: 91, ohada: 85, uemoa: 94, cemac: 82 },
  { category: 'Assurance', bceao: 87, cobac: 92, gafi: 89, ohada: 84, uemoa: 86, cemac: 94 },
  { category: 'Marchés Financiers', bceao: 91, cobac: 85, gafi: 88, ohada: 87, uemoa: 93, cemac: 84 },
];





