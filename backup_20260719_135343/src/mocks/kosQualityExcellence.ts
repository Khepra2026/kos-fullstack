export const qualityAssuranceReviews = [
  {
    id: "qa-001",
    deliverable_type: "Proposition Commerciale",
    deliverable_title: "Mission de Pré-Inspection BCEAO — Banque Atlantique",
    methodological_coherence: 9.2,
    editorial_quality: 8.8,
    khepra_standards_compliance: 9.5,
    recommendation_coherence: 9.0,
    reference_quality: 9.3,
    overall_score: 9.2,
    anomalies: ["Section 3.2 : référence circulaire non résolue", "Annexe B : format de date non standardisé"],
    improvement_recommendations: ["Uniformiser les dates au format JJ/MM/AAAA", "Ajouter la référence croisée BCEAO Circulaire 01/2017 §4.2"],
    status: "reviewed",
    created_at: "2026-06-12T14:30:00Z"
  },
  {
    id: "qa-002",
    deliverable_type: "Rapport d'Audit",
    deliverable_title: "Audit du Dispositif LBC/FT — Groupe Microfinancier CEMAC",
    methodological_coherence: 8.5,
    editorial_quality: 9.1,
    khepra_standards_compliance: 8.7,
    recommendation_coherence: 8.9,
    reference_quality: 8.4,
    overall_score: 8.7,
    anomalies: ["GAFI Recommandation 10 non citée dans le corps du texte", "Tableau de scoring page 17 : totaux incohérents"],
    improvement_recommendations: ["Intégrer GAFI R.10 dans l'analyse CDD", "Recalculer la matrice de scoring"],
    status: "corrections_requested",
    created_at: "2026-06-11T09:15:00Z"
  },
  {
    id: "qa-003",
    deliverable_type: "Étude Sectorielle",
    deliverable_title: "Inclusion Financière UEMOA 2026 — Baromètre Annuel",
    methodological_coherence: 9.6,
    editorial_quality: 9.8,
    khepra_standards_compliance: 9.7,
    recommendation_coherence: 9.5,
    reference_quality: 9.8,
    overall_score: 9.7,
    anomalies: [],
    improvement_recommendations: ["Ajouter une section sur les fintechs émergentes au Bénin"],
    status: "approved",
    created_at: "2026-06-10T16:00:00Z"
  },
  {
    id: "qa-004",
    deliverable_type: "Business Plan",
    deliverable_title: "Plan d'Affaires — Agrément Établissement de Paiement UEMOA",
    methodological_coherence: 7.8,
    editorial_quality: 8.2,
    khepra_standards_compliance: 7.5,
    recommendation_coherence: 8.0,
    reference_quality: 7.9,
    overall_score: 7.9,
    anomalies: ["Projections financières non alignées sur SYCOHADA", "Hypothèses de croissance non documentées"],
    improvement_recommendations: ["Reprendre les états financiers selon plan comptable SYCOHADA", "Documenter chaque hypothèse avec source"],
    status: "corrections_requested",
    created_at: "2026-06-09T11:00:00Z"
  }
];

export const expertReviews = [
  {
    id: "er-001",
    deliverable_id: "qa-001",
    reviewer_role: "Associé Big Four",
    review_type: "Revue Qualité Indépendante",
    strengths: ["Structure Big Four impeccable", "Ancrage réglementaire solide", "Recommandations actionnables"],
    weaknesses: ["Section benchmark concurrentiel trop légère"],
    critical_gaps: [],
    overall_rating: 9.0,
    approval_status: "approved_with_minor_edits",
    simulated_perspective: "Associé Deloitte — Financial Advisory",
    detailed_feedback: "Proposition de très bonne facture. La section risques aurait gagné à intégrer une matrice probabilité/impact chiffrée. Les honoraires sont compétitifs pour le marché UEMOA.",
    created_at: "2026-06-12T16:00:00Z"
  },
  {
    id: "er-002",
    deliverable_id: "qa-002",
    reviewer_role: "Expert Sectoriel",
    review_type: "Revue Technique LBC/FT",
    strengths: ["Couverture exhaustive des textes CEMAC", "Diagnostic terrain pertinent"],
    weaknesses: ["Absence de benchmark GABAC", "Plan de remédiation non priorisé"],
    critical_gaps: ["GAFI R.10 manquante", "Évaluation des risques pays absente"],
    overall_rating: 7.5,
    approval_status: "rejected",
    simulated_perspective: "Expert GAFI — Évaluateur Mutual Evaluation",
    detailed_feedback: "Document incomplet pour un audit LBC/FT de niveau Big Four. La cartographie des risques doit être refaite avec la méthodologie GAFI 2023.",
    created_at: "2026-06-11T11:00:00Z"
  },
  {
    id: "er-003",
    deliverable_id: "qa-003",
    reviewer_role: "Comité Qualité",
    review_type: "Revue Exécutive",
    strengths: ["Excellente rigueur académique", "Données BCEAO parfaitement sourcées", "Qualité rédactionnelle exceptionnelle"],
    weaknesses: [],
    critical_gaps: [],
    overall_rating: 9.8,
    approval_status: "approved",
    simulated_perspective: "Comité Qualité KHEPRA EXPERTS",
    detailed_feedback: "Publication de référence. Peut être soumise telle quelle à la presse économique.",
    created_at: "2026-06-10T18:00:00Z"
  }
];

export const humanizationScores = [
  {
    id: "hs-001",
    content_type: "Note Stratégique",
    content_id: "strat-2026-01",
    tone_naturalness: 8.5,
    fluidity_score: 9.0,
    narrative_coherence: 8.8,
    executive_style_score: 9.2,
    audience_adaptation: "Comité Exécutif",
    target_audience: "Direction Générale Banque UEMOA",
    overall_humanization: 8.9,
    improvement_suggestions: ["Raccourcir les phrases > 35 mots dans la section 2", "Remplacer 3 anglicismes par équivalents français"],
    created_at: "2026-06-12T08:00:00Z"
  },
  {
    id: "hs-002",
    content_type: "Présentation Conseil",
    content_id: "board-2026-03",
    tone_naturalness: 9.1,
    fluidity_score: 9.3,
    narrative_coherence: 9.0,
    executive_style_score: 9.4,
    audience_adaptation: "Conseil d'Administration",
    target_audience: "Administrateurs Indépendants — Holding Familiale",
    overall_humanization: 9.2,
    improvement_suggestions: ["Ajouter un executive summary d'une page avant la présentation détaillée"],
    created_at: "2026-06-11T14:00:00Z"
  },
  {
    id: "hs-003",
    content_type: "Proposition Technique",
    content_id: "prop-2026-07",
    tone_naturalness: 7.2,
    fluidity_score: 7.5,
    narrative_coherence: 7.8,
    executive_style_score: 7.0,
    audience_adaptation: "Administration Publique",
    target_audience: "Ministère des Finances — Appel d'Offres",
    overall_humanization: 7.4,
    improvement_suggestions: ["Ton trop technique — adapter au profil non-expert du comité de sélection", "Ajouter des visuels de synthèse", "Réduire le jargon réglementaire de 40%"],
    created_at: "2026-06-10T10:00:00Z"
  }
];

// ============================================================
// BLOC 3 — Peer Review Workflow
// Workflow automatique de revue par les pairs avant publication
// ============================================================
export interface PeerReviewSubmission {
  id: string;
  author: string;
  author_role: string;
  content_type: string;
  title: string;
  submitted_at: string;
  deadline: string;
  reviewers_assigned: number;
  reviewers_completed: number;
  status: 'draft' | 'submitted' | 'in_review' | 'revisions_requested' | 'approved' | 'published';
  priority: 'critical' | 'high' | 'medium' | 'low';
  overall_score: number | null;
  word_count: number;
}

export interface PeerReviewAssignment {
  id: string;
  submission_id: string;
  reviewer_name: string;
  reviewer_role: string;
  assigned_at: string;
  completed_at: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  score_methodology: number | null;
  score_editorial: number | null;
  score_compliance: number | null;
  score_relevance: number | null;
  comments: string;
  issues_count: number | null;
}

export const peerReviewSubmissions: PeerReviewSubmission[] = [
  {
    id: 'pr-001',
    author: 'Dr. Amadou Sow',
    author_role: 'Director — Think Tank',
    content_type: 'Position Paper',
    title: 'Impact des Stress Tests Climatiques sur la Stabilité Financière UEMOA',
    submitted_at: '2026-06-15T09:00:00Z',
    deadline: '2026-06-20T18:00:00Z',
    reviewers_assigned: 3,
    reviewers_completed: 2,
    status: 'in_review',
    priority: 'critical',
    overall_score: null,
    word_count: 4820,
  },
  {
    id: 'pr-002',
    author: 'Fatoumata Diallo',
    author_role: 'Senior Consultant — BU Régulation',
    content_type: 'Livre Blanc',
    title: 'Guide Pratique de Mise en Conformité LBC/FT pour les SFD UEMOA — Édition 2026',
    submitted_at: '2026-06-14T14:30:00Z',
    deadline: '2026-06-25T18:00:00Z',
    reviewers_assigned: 4,
    reviewers_completed: 4,
    status: 'revisions_requested',
    priority: 'high',
    overall_score: 8.2,
    word_count: 12450,
  },
  {
    id: 'pr-003',
    author: 'Ibrahim Kone',
    author_role: 'Associate Partner — BU Prix de Transfert',
    content_type: 'Article Blog Premium',
    title: 'Prix de Transfert en Afrique : Les 7 Pièges à Éviter dans Votre Documentation BEPS',
    submitted_at: '2026-06-15T11:00:00Z',
    deadline: '2026-06-18T18:00:00Z',
    reviewers_assigned: 2,
    reviewers_completed: 2,
    status: 'approved',
    priority: 'high',
    overall_score: 9.4,
    word_count: 3840,
  },
  {
    id: 'pr-004',
    author: 'Aminata Bah',
    author_role: 'Manager — BU GRC',
    content_type: 'Étude Sectorielle',
    title: 'Baromètre de la Gouvernance des Banques UEMOA 2026 — Analyse Comparative 45 Établissements',
    submitted_at: '2026-06-13T16:00:00Z',
    deadline: '2026-06-28T18:00:00Z',
    reviewers_assigned: 5,
    reviewers_completed: 1,
    status: 'in_review',
    priority: 'critical',
    overall_score: null,
    word_count: 18200,
  },
  {
    id: 'pr-005',
    author: 'Dr. Célestine Koffi',
    author_role: 'Head of Research — Think Tank',
    content_type: 'Policy Brief',
    title: 'Réforme du Ratio de Solvabilité dans l\'UEMOA — Analyse d\'Impact sur les Banques de Petite Taille',
    submitted_at: '2026-06-12T08:00:00Z',
    deadline: '2026-06-22T18:00:00Z',
    reviewers_assigned: 3,
    reviewers_completed: 3,
    status: 'submitted',
    priority: 'high',
    overall_score: 8.9,
    word_count: 6200,
  },
  {
    id: 'pr-006',
    author: 'Moussa Traoré',
    author_role: 'Consultant — BU Régulation',
    content_type: 'Note Technique',
    title: 'Checklist de Préparation à l\'Inspection COBAC — Version 4.2',
    submitted_at: '2026-06-14T10:00:00Z',
    deadline: '2026-06-19T18:00:00Z',
    reviewers_assigned: 2,
    reviewers_completed: 0,
    status: 'draft',
    priority: 'medium',
    overall_score: null,
    word_count: 3150,
  },
];

export const peerReviewAssignments: PeerReviewAssignment[] = [
  {
    id: 'pra-001',
    submission_id: 'pr-001',
    reviewer_name: 'Pr. Jean-Marc Kouassi',
    reviewer_role: 'Senior Peer Reviewer — Régulation',
    assigned_at: '2026-06-15T10:00:00Z',
    completed_at: '2026-06-16T14:00:00Z',
    status: 'completed',
    score_methodology: 9.0,
    score_editorial: 8.5,
    score_compliance: 9.5,
    score_relevance: 9.2,
    comments: 'Excellente rigueur d\'analyse. Renforcer la section sur les scénarios alternatifs (p. 17-19). Ajouter une référence à la Circulaire BCEAO 01-2017.',
    issues_count: 3,
  },
  {
    id: 'pra-002',
    submission_id: 'pr-001',
    reviewer_name: 'Dr. Sophie N\'Guessan',
    reviewer_role: 'Peer Reviewer — Think Tank',
    assigned_at: '2026-06-15T10:00:00Z',
    completed_at: null,
    status: 'in_progress',
    score_methodology: null,
    score_editorial: null,
    score_compliance: null,
    score_relevance: null,
    comments: 'En cours de revue — Section méthodologie terminée.',
    issues_count: null,
  },
  {
    id: 'pra-003',
    submission_id: 'pr-001',
    reviewer_name: 'Mamadou Bah',
    reviewer_role: 'Peer Reviewer — ESG & Climat',
    assigned_at: '2026-06-15T10:00:00Z',
    completed_at: '2026-06-16T11:00:00Z',
    status: 'completed',
    score_methodology: 8.8,
    score_editorial: 7.5,
    score_compliance: 8.0,
    score_relevance: 9.5,
    comments: 'Ajouter les dernières données NGFS Phase V. Vérifier l\'alignement avec la Taxonomie Verte UEMOA. Quelques phrases trop longues (§4.2).',
    issues_count: 5,
  },
  {
    id: 'pra-004',
    submission_id: 'pr-002',
    reviewer_name: 'Pr. Jean-Marc Kouassi',
    reviewer_role: 'Senior Peer Reviewer — Régulation',
    assigned_at: '2026-06-14T15:00:00Z',
    completed_at: '2026-06-16T09:00:00Z',
    status: 'completed',
    score_methodology: 7.5,
    score_editorial: 9.0,
    score_compliance: 6.5,
    score_relevance: 8.8,
    comments: 'GAFI Recommandation 15 (Nouvelles Technologies) non couverte. La section CDD simplifié doit être alignée sur la Directive UEMOA 02/2015 amendée. 12 erreurs factuelles sur les seuils déclaratifs.',
    issues_count: 14,
  },
  {
    id: 'pra-005',
    submission_id: 'pr-005',
    reviewer_name: 'Dr. Sophie N\'Guessan',
    reviewer_role: 'Peer Reviewer — Think Tank',
    assigned_at: '2026-06-12T09:00:00Z',
    completed_at: '2026-06-14T16:00:00Z',
    status: 'completed',
    score_methodology: 9.2,
    score_editorial: 8.0,
    score_compliance: 9.8,
    score_relevance: 9.4,
    comments: 'Analyse d\'impact quantitative solide. Reformuler le résumé exécutif pour le rendre accessible aux non-spécialistes. 2 graphiques à légender.',
    issues_count: 4,
  },
];

export const peerReviewKPIs = {
  active_submissions: 4,
  total_reviewers: 12,
  assigned_reviewers: 9,
  avg_review_time_hours: 28.5,
  avg_score: 8.8,
  approval_rate: 35,
  revisions_rate: 42,
  pending_rate: 23,
  on_time_rate: 92,
};

// ============================================================
// AXE 4 — Compliance Review (Étape 4 du Workflow 5 Étapes)
// Revue conformité réglementaire avant Executive Approval
// ============================================================
export interface ComplianceReviewSubmission {
  id: string;
  deliverable_title: string;
  deliverable_type: string;
  submitted_by: string;
  submitted_at: string;
  regulatory_frameworks: string[];
  compliance_score: number | null;
  reviewer: string;
  reviewer_role: string;
  status: 'pending' | 'in_review' | 'compliant' | 'non_compliant';
  findings: { severity: 'critical' | 'major' | 'minor'; framework: string; description: string }[];
  overall_assessment: string;
  next_steps: string;
}

export const complianceReviewSubmissions: ComplianceReviewSubmission[] = [
  {
    id: 'cr-001',
    deliverable_title: 'Dispositif LBC/FT — Guide Pratique SFD UEMOA 2026',
    deliverable_type: 'Livre Blanc',
    submitted_by: 'Fatoumata Diallo — Senior Consultant BU Régulation',
    submitted_at: '2026-06-16T09:00:00Z',
    regulatory_frameworks: ['BCEAO Circulaire 01-2017', 'GAFI Recommandations 2023', 'Directive UEMOA 02/2015', 'Règlement COBAC R-2018/01', 'GIABA Guidelines'],
    compliance_score: 8.4,
    reviewer: 'Dr. Fatoumata Diarra',
    reviewer_role: 'Compliance Review Officer — Ancienne COBAC',
    status: 'compliant',
    findings: [
      { severity: 'major', framework: 'GAFI R.15', description: 'Section Nouvelles Technologies : couverture partielle — manque analyse risques FinTech' },
      { severity: 'minor', framework: 'Directive UEMOA 02/2015', description: 'Seuils déclaratifs à mettre à jour selon amendement 2026' },
      { severity: 'minor', framework: 'GIABA Guidelines', description: 'Ajouter annexe checklist GIABA Mutual Evaluation' },
    ],
    overall_assessment: 'Conforme avec 3 observations. Niveau de qualité réglementaire élevé. 0 écart critique. Prêt pour Executive Approval après corrections mineures.',
    next_steps: 'Corriger les 3 observations. Soumettre pour Executive Approval sous 48h.',
  },
  {
    id: 'cr-002',
    deliverable_title: 'Baromètre Gouvernance Banques UEMOA 2026',
    deliverable_type: 'Étude Sectorielle',
    submitted_by: 'Aminata Bah — Manager BU GRC',
    submitted_at: '2026-06-16T11:00:00Z',
    regulatory_frameworks: ['OHADA Acte Uniforme Sociétés Commerciales', 'BCEAO Circulaire 01-2017', 'ISO 37000 Governance', 'IFRS'],
    compliance_score: 9.2,
    reviewer: 'Prof. Jean-Marc Boka',
    reviewer_role: 'Compliance Review Officer — Expert OHADA',
    status: 'compliant',
    findings: [
      { severity: 'minor', framework: 'OHADA AUSC', description: 'Article 831 — référence à actualiser (révision 2024)' },
    ],
    overall_assessment: 'Excellent niveau de conformité. 1 observation mineure. Méthodologie irréprochable. Prêt pour Executive Approval.',
    next_steps: 'Actualiser référence OHADA. Executive Approval immédiat.',
  },
  {
    id: 'cr-003',
    deliverable_title: 'Documentation Prix de Transfert — Groupe Agro UEMOA',
    deliverable_type: 'Documentation BEPS',
    submitted_by: 'Ibrahim Koné — Associate Partner BU Prix de Transfert',
    submitted_at: '2026-06-15T15:00:00Z',
    regulatory_frameworks: ['BEPS Action 13', 'Directive UEMOA Prix de Transfert', 'OCDE Guidelines 2022', 'Code Général des Impôts'],
    compliance_score: 7.8,
    reviewer: 'Dr. Cheikh Ndiaye',
    reviewer_role: 'Compliance Review Officer — Ancien Directeur Commission Bancaire',
    status: 'in_review',
    findings: [
      { severity: 'major', framework: 'BEPS Action 13', description: 'Master File : analyse fonctionnelle incomplète — manque section actifs incorporels' },
      { severity: 'major', framework: 'Directive UEMOA', description: 'Documentation non alignée sur format UEMOA — sections à restructurer' },
      { severity: 'critical', framework: 'OCDE Guidelines', description: 'CUP interne non justifié pour transaction intra-groupe — risque redressement fiscal' },
    ],
    overall_assessment: 'Non conforme — 2 écarts majeurs, 1 écart critique. Retour à l\'auteur pour corrections substantielles. Ne peut passer en Executive Approval.',
    next_steps: 'Reprendre analyse fonctionnelle. Justifier CUP interne ou changer méthode. Re-soumettre sous 7 jours.',
  },
  {
    id: 'cr-004',
    deliverable_title: 'Proposition Pré-Inspection BCEAO — Banque Atlantique',
    deliverable_type: 'Proposition Commerciale',
    submitted_by: 'Dr. Amadou Sow — Director Think Tank',
    submitted_at: '2026-06-16T08:00:00Z',
    regulatory_frameworks: ['BCEAO Dispositif Prudentiel', 'Loi Bancaire UEMOA', 'Circulaire BCEAO 01-2017'],
    compliance_score: 9.5,
    reviewer: 'Dr. Fatoumata Diarra',
    reviewer_role: 'Compliance Review Officer',
    status: 'compliant',
    findings: [],
    overall_assessment: 'Conforme sans réserve. Excellente maîtrise du cadre prudentiel BCEAO. Proposition prête pour Executive Approval.',
    next_steps: 'Executive Approval immédiat.',
  },
];

// ============================================================
// AXE 4 — Executive Approval (Étape 5 du Workflow 5 Étapes)
// Validation finale par le Managing Partner / COMEX
// ============================================================
export interface ExecutiveApprovalSubmission {
  id: string;
  deliverable_title: string;
  deliverable_type: string;
  author: string;
  compliance_score: number;
  submitted_for_approval: string;
  approver: string;
  approver_role: string;
  status: 'pending' | 'approved' | 'approved_with_conditions' | 'rejected';
  decision_rationale: string;
  conditions: string[];
  strategic_alignment: string;
  client_impact: string;
  approved_at: string | null;
}

export const executiveApprovalSubmissions: ExecutiveApprovalSubmission[] = [
  {
    id: 'ea-001',
    deliverable_title: 'Proposition Pré-Inspection BCEAO — Banque Atlantique',
    deliverable_type: 'Proposition Commerciale',
    author: 'Dr. Amadou Sow',
    compliance_score: 9.5,
    submitted_for_approval: '2026-06-16T10:00:00Z',
    approver: 'M. Olivier Tchamaké',
    approver_role: 'Managing Partner — KHEPRA Experts',
    status: 'approved',
    decision_rationale: 'Proposition stratégique majeure. Client Banque Atlantique = référence UEMOA. Qualité irréprochable. Alignement parfait avec objectif positionnement leader conformité.',
    conditions: [],
    strategic_alignment: 'Aligné — Pilier Régulation & Conformité. Renforce position leader BCEAO.',
    client_impact: 'Impact direct 280M FCFA CA. Ouverture portefeuille bancaire premium.',
    approved_at: '2026-06-16T14:00:00Z',
  },
  {
    id: 'ea-002',
    deliverable_title: 'Baromètre Gouvernance Banques UEMOA 2026',
    deliverable_type: 'Étude Sectorielle',
    author: 'Aminata Bah',
    compliance_score: 9.2,
    submitted_for_approval: '2026-06-16T12:00:00Z',
    approver: 'M. Olivier Tchamaké',
    approver_role: 'Managing Partner — KHEPRA Experts',
    status: 'approved_with_conditions',
    decision_rationale: 'Publication majeure pour l\'autorité intellectuelle KHEPRA. Timing parfait — Africa CEO Forum dans 3 semaines.',
    conditions: ['Ajouter un executive summary 1 page pour diffusion presse', 'Préparer un communiqué de presse conjoint avec données clés', 'Planifier webinar de lancement avec 3 CEO invités'],
    strategic_alignment: 'Aligné — Thought Leadership & Authority Building. Conforte position Knowledge Leader UEMOA.',
    client_impact: 'Génération leads estimée 12-15 mandats gouvernance. Visibilité médiatique UEMOA garantie.',
    approved_at: '2026-06-16T15:30:00Z',
  },
  {
    id: 'ea-003',
    deliverable_title: 'Dispositif LBC/FT — Guide Pratique SFD UEMOA 2026',
    deliverable_type: 'Livre Blanc',
    author: 'Fatoumata Diallo',
    compliance_score: 8.4,
    submitted_for_approval: '2026-06-16T14:00:00Z',
    approver: 'M. Olivier Tchamaké',
    approver_role: 'Managing Partner',
    status: 'pending',
    decision_rationale: '',
    conditions: [],
    strategic_alignment: 'À évaluer — Pilier Conformité. Marché SFD prioritaire 2026.',
    client_impact: 'À évaluer — 450+ SFD UEMOA adressables.',
    approved_at: null,
  },
  {
    id: 'ea-004',
    deliverable_title: 'Documentation Prix de Transfert — Groupe Agro UEMOA',
    deliverable_type: 'Documentation BEPS',
    author: 'Ibrahim Koné',
    compliance_score: 7.8,
    submitted_for_approval: '2026-06-15T16:00:00Z',
    approver: 'M. Olivier Tchamaké',
    approver_role: 'Managing Partner',
    status: 'rejected',
    decision_rationale: 'Non conforme — 3 écarts détectés en Compliance Review (1 critique, 2 majeurs). Risque réputationnel si livré au client en l\'état. Retour à l\'auteur.',
    conditions: [],
    strategic_alignment: 'Aligné — Practice Prix de Transfert. Client Groupe Agro stratégique.',
    client_impact: 'Retard livraison estimé 7 jours. Impact relation client modéré si communiqué proactivement.',
    approved_at: '2026-06-15T17:00:00Z',
  },
  {
    id: 'ea-005',
    deliverable_title: 'Position Paper — Impact Stress Tests Climatiques UEMOA',
    deliverable_type: 'Position Paper',
    author: 'Dr. Amadou Sow',
    compliance_score: 9.0,
    submitted_for_approval: '2026-06-16T16:00:00Z',
    approver: 'M. Olivier Tchamaké',
    approver_role: 'Managing Partner',
    status: 'pending',
    decision_rationale: '',
    conditions: [],
    strategic_alignment: 'À évaluer — Pilier ESG & Innovation. Sujet émergent différenciant.',
    client_impact: 'À évaluer — Positionnement pionnier Finance Climat UEMOA.',
    approved_at: null,
  },
];

export const complianceReviewKPIs = {
  total_reviews: 24,
  compliant: 20,
  non_compliant: 4,
  avg_review_time_hours: 36,
  critical_findings: 3,
  major_findings: 12,
  minor_findings: 28,
  frameworks_covered: 11,
};

export const executiveApprovalKPIs = {
  total_decisions: 42,
  approved: 28,
  approved_with_conditions: 10,
  rejected: 4,
  avg_decision_time_hours: 8,
  strategic_alignment_rate: 92,
  client_impact_positive: 35,
};



