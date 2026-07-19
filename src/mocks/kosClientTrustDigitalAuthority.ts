export const clientTrustOverview = {
  globalTrustScore: 88,
  nps: 72,
  caseStudiesPublished: 35,
  testimonialsVerified: 28,
  clientRetentionRate: 94.5,
  repeatBusinessRate: 68,
  referralRate: 42,
  certificationsActive: 12,
};

export const caseStudies = [
  { id: 'CS-001', title: 'Audit Pré-Inspection BCEAO — Banque Atlantique CI', sector: 'Banque', jurisdiction: 'UEMOA', clientType: 'Banque Commerciale', missionValue: 385, result: 'Inspection réussie — 0 réserve majeure', duration: '4 mois', year: 2026, testimonial: true },
  { id: 'CS-002', title: 'Due Diligence Acquisition — Africa Growth Capital', sector: 'Private Equity', jurisdiction: 'UEMOA', clientType: 'Fonds d\'Investissement', missionValue: 450, result: 'Acquisition finalisée — ROI 3.2x', duration: '3 mois', year: 2026, testimonial: true },
  { id: 'CS-003', title: 'Conformité LBC/FT — Groupe Bancaire Panafricain', sector: 'Banque', jurisdiction: 'CEMAC', clientType: 'Groupe Bancaire', missionValue: 520, result: 'Conformité GAFI atteinte — Audit externe validé', duration: '6 mois', year: 2025, testimonial: true },
  { id: 'CS-004', title: 'Documentation Prix de Transfert — Groupe Agro Ouest', sector: 'Agro-industrie', jurisdiction: 'UEMOA', clientType: 'Multinationale', missionValue: 185, result: 'Documentation BEPS conforme — Pénalités évitées 280M FCFA', duration: '2 mois', year: 2026, testimonial: true },
  { id: 'CS-005', title: 'Agrément Établissement Paiement — WavePay', sector: 'FinTech', jurisdiction: 'UEMOA', clientType: 'FinTech', missionValue: 145, result: 'Agrément BCEAO obtenu en 5 mois', duration: '5 mois', year: 2026, testimonial: false },
  { id: 'CS-006', title: 'Gouvernance Board Advisory — Banque Développement CEMAC', sector: 'Banque', jurisdiction: 'CEMAC', clientType: 'Banque de Développement', missionValue: 210, result: '5 administrateurs nommés — Charter gouvernance adopté', duration: '3 mois', year: 2025, testimonial: true },
  { id: 'CS-007', title: 'ESG Roadmap GRI/ISSB — Ciments d\'Afrique', sector: 'Industrie', jurisdiction: 'CEMAC', clientType: 'Industriel', missionValue: 95, result: 'Roadmap ESG 2026-2028 validée — ISSB compliant', duration: '2 mois', year: 2026, testimonial: false },
  { id: 'CS-008', title: 'Mission COBAC Pré-Inspection — Banque Cameroun', sector: 'Banque', jurisdiction: 'CEMAC', clientType: 'Banque Commerciale', missionValue: 320, result: 'Pré-inspection réussie — 98% conformité COBAC R-2016/01', duration: '3 mois', year: 2025, testimonial: true },
];

export const testimonialsList = [
  { id: 'TST-001', clientName: 'DG Banque Atlantique CI', role: 'Directeur Général', quote: 'KHEPRA a transformé notre préparation à l\'inspection BCEAO. Leur méthodologie Big Four a fait la différence. Zéro réserve majeure.', rating: 5, verified: true, caseStudyRef: 'CS-001' },
  { id: 'TST-002', clientName: 'Managing Partner Africa Growth Capital', role: 'Managing Partner', quote: 'La due diligence de KHEPRA nous a évité un bad deal à 2.5 Mds FCFA. Leur analyse des risques COBAC était chirurgicale.', rating: 5, verified: true, caseStudyRef: 'CS-002' },
  { id: 'TST-003', clientName: 'Head of Compliance Groupe Panafricain', role: 'Head of Compliance', quote: 'En 6 mois, KHEPRA a mis notre dispositif LBC/FT au niveau GAFI. L\'audit externe a validé 100% des corrections.', rating: 5, verified: true, caseStudyRef: 'CS-003' },
  { id: 'TST-004', clientName: 'CFO Groupe Agro Ouest', role: 'CFO', quote: 'La documentation prix de transfert de KHEPRA nous a sauvé 280M de pénalités. Conforme BEPS, validée par nos auditeurs.', rating: 5, verified: true, caseStudyRef: 'CS-004' },
  { id: 'TST-005', clientName: 'Président CA Banque Développement CEMAC', role: 'Président', quote: 'KHEPRA a professionnalisé notre gouvernance à un niveau Big Four. Le Board Advisory a été décisif pour notre levée de fonds.', rating: 5, verified: true, caseStudyRef: 'CS-006' },
  { id: 'TST-006', clientName: 'DG Banque Cameroun', role: 'Directeur Général', quote: 'La pré-inspection COBAC avec KHEPRA nous a permis d\'atteindre 98% de conformité. L\'équipe connaît les régulateurs.', rating: 5, verified: true, caseStudyRef: 'CS-008' },
  { id: 'TST-007', clientName: 'CEO WavePay Technologies', role: 'CEO', quote: 'KHEPRA a rendu simple ce qui semblait impossible : obtenir l\'agrément BCEAO en 5 mois. Un vrai partenaire stratégique.', rating: 5, verified: true, caseStudyRef: 'CS-005' },
  { id: 'TST-008', clientName: 'Directeur ESG Ciments d\'Afrique', role: 'Directeur ESG', quote: 'La roadmap ESG de KHEPRA est alignée ISSB et concrète. Nous avons déjà commencé la mise en œuvre avec des résultats mesurables.', rating: 4, verified: true, caseStudyRef: 'CS-007' },
];

export const certificationsList = [
  { id: 'CERT-001', name: 'ISO 9001:2015', scope: 'Système de Management de la Qualité', status: 'Certifié', issuer: 'Bureau Veritas', validUntil: '2027-06' },
  { id: 'CERT-002', name: 'ISO 27001:2022', scope: 'Sécurité de l\'Information', status: 'En cours', issuer: 'SGS', validUntil: '2027-12' },
  { id: 'CERT-003', name: 'ISO 31000:2018', scope: 'Management des Risques', status: 'Aligné', issuer: 'Auto-déclaration', validUntil: 'N/A' },
  { id: 'CERT-004', name: 'ISO 22301:2019', scope: 'Continuité d\'Activité', status: 'Préparé', issuer: 'Bureau Veritas', validUntil: '2027-03' },
  { id: 'CERT-005', name: 'ISO 37001:2016', scope: 'Anti-Corruption', status: 'Aligné', issuer: 'Auto-déclaration', validUntil: 'N/A' },
  { id: 'CERT-006', name: 'ISO 42001:2023', scope: 'Management de l\'IA', status: 'Préparé', issuer: 'SGS', validUntil: '2027-09' },
  { id: 'CERT-007', name: 'Accréditation BCEAO', scope: 'Cabinet Conseil Régulation', status: 'Actif', issuer: 'BCEAO', validUntil: 'Permanent' },
  { id: 'CERT-008', name: 'Accréditation COBAC', scope: 'Audit Prudentiel', status: 'Actif', issuer: 'COBAC', validUntil: 'Permanent' },
  { id: 'CERT-009', name: 'Accréditation Banque Mondiale', scope: 'Services Conseil', status: 'Actif', issuer: 'Banque Mondiale', validUntil: '2028' },
  { id: 'CERT-010', name: 'Accréditation BAD', scope: 'Services Conseil', status: 'Actif', issuer: 'BAD', validUntil: '2027' },
  { id: 'CERT-011', name: 'Accréditation AFD', scope: 'Assistance Technique', status: 'Actif', issuer: 'AFD', validUntil: '2027' },
  { id: 'CERT-012', name: 'Accréditation IFC', scope: 'Due Diligence ESG', status: 'Actif', issuer: 'IFC/Banque Mondiale', validUntil: '2028' },
];

export const authorityMetrics = {
  citations: 487,
  backlinks: 328,
  publicationsReprises: 56,
  invitationsConferences: 12,
  telechargements: 2300,
  scoreAutorite: 86,
  domainRating: 85,
  urlRating: 72,
  trustFlow: 45,
  citationFlow: 58,
  linkedInFollowers: 8420,
  newsletterSubscribers: 3200,
};

export const clientSegments = [
  { segment: 'Banques Commerciales', count: 28, revenue: 1850, retention: 96, nps: 78 },
  { segment: 'SFD / Microfinance', count: 35, revenue: 920, retention: 92, nps: 72 },
  { segment: 'FinTech', count: 18, revenue: 580, retention: 88, nps: 68 },
  { segment: 'Assurance', count: 12, revenue: 420, retention: 94, nps: 74 },
  { segment: 'Industrie / Agro', count: 15, revenue: 320, retention: 85, nps: 62 },
  { segment: 'Secteur Public', count: 8, revenue: 450, retention: 90, nps: 70 },
];





