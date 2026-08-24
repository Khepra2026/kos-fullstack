// ============================================================
// KOS ESG & REGULATORY ALIGNMENT COMMAND™
// Audit Big Four — Alignement KOS sur standards internationaux
// 4 Piliers : ESG Gouvernance · AML/CFT · Comités d'Audit · ISO 27001
// Version 2026.06.19 — Phase 0 Diagnostic
// ============================================================

export interface ESGGovernanceAssessment {
  id: number;
  domain: string;
  current_state: string;
  target_state: string;
  gap_severity: 'critical' | 'major' | 'moderate' | 'minor';
  current_score: number;
  target_score: number;
  observations: string[];
  recommendations: string[];
  responsible: string;
  timeline: string;
  budget: string;
  kpi_target: string;
}

export interface AMLCFTRequirement {
  id: number;
  reference: string;
  framework: string;
  requirement: string;
  status: 'compliant' | 'partial' | 'non_compliant' | 'not_applicable';
  evidence: string;
  gap_description: string;
  remediation_action: string;
  priority: 'P0' | 'P1' | 'P2';
  deadline: string;
  owner: string;
}

export interface AuditCommitteeSetup {
  id: number;
  committee_name: string;
  mandate: string;
  composition_target: string;
  current_state: string;
  charter_status: 'approved' | 'draft' | 'missing';
  meeting_frequency: string;
  members: { name: string; role: string; independence: string; expertise: string }[];
  gaps: string[];
  deployment_phase: string;
  go_live: string;
}

export interface ISO27001Control {
  id: number;
  domain: string;
  control_ref: string;
  control_name: string;
  status: 'conform' | 'non_conform' | 'major_nc' | 'minor_nc' | 'not_started';
  implementation_level: number;
  evidence_status: 'available' | 'partial' | 'missing';
  action_required: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  deadline: string;
  owner: string;
}

export interface CorrectiveAction {
  id: number;
  pillar: string;
  action: string;
  priority: 'P0' | 'P1' | 'P2';
  responsible: string;
  start_date: string;
  end_date: string;
  budget: string;
  expected_outcome: string;
  kpi: string;
  dependencies: string[];
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
}

export interface QuarterlyMilestone {
  quarter: string;
  label: string;
  period: string;
  objectives: string[];
  deliverables: string[];
  kpis: { name: string; current: string; target: string }[];
  budget: string;
  score_target: number;
}

// ============================================================
// PILIER 1 — ESG INTÉGRÉ DANS LA GOUVERNANCE
// ============================================================
export const esgGovernanceAssessments: ESGGovernanceAssessment[] = [
  {
    id: 1,
    domain: 'Stratégie ESG & Vision Conseil',
    current_state: 'Aucune politique ESG formalisée au niveau du Conseil. Mentions ESG éparses dans les supports commerciaux sans cadre structuré.',
    target_state: 'Charte ESG validée par le Conseil d\'Administration. Feuille de route ESG 2026-2029 intégrée au plan stratégique KOS. Alignement ISSB S1/S2, GRI Standards.',
    gap_severity: 'critical',
    current_score: 15,
    target_score: 90,
    observations: [
      'Absence de comité ESG au niveau du Conseil',
      'Pas de référentiel ESG adopté (GRI, ISSB, IFC PS)',
      'Stratégie ESG non documentée',
      'Aucun KPI ESG dans le tableau de bord exécutif',
    ],
    recommendations: [
      'Créer un Comité ESG au Conseil d\'Administration avec 3 membres indépendants',
      'Adopter le référentiel ISSB S1/S2 comme standard de reporting',
      'Définir 12 KPIs ESG alignés ODD et les intégrer au cockpit exécutif KOS',
      'Rédiger et publier une Charte ESG Khepra Experts',
    ],
    responsible: 'Managing Partner — Président du Conseil',
    timeline: 'Q3 2026 — Q1 2027',
    budget: '12 500 000 FCFA',
    kpi_target: 'Score maturité ESG gouvernance : 15 → 90/100',
  },
  {
    id: 2,
    domain: 'Empreinte Environnementale & Climat',
    current_state: 'Aucun bilan carbone réalisé. Pas de politique de gestion des déchets. Consommation énergétique non suivie. Déplacements professionnels non compensés.',
    target_state: 'Bilan carbone Scope 1/2/3 certifié. Plan de réduction -30% d\'ici 2028. Compensation carbone des déplacements. Politique zéro papier déployée.',
    gap_severity: 'critical',
    current_score: 10,
    target_score: 85,
    observations: [
      'Bilan carbone inexistant',
      'Pas de suivi des consommations énergétiques',
      'Déplacements aériens fréquents sans compensation',
      'Politique zéro papier non formalisée',
    ],
    recommendations: [
      'Réaliser un bilan carbone Scope 1/2/3 avec un cabinet certifié',
      'Adopter une politique télétravail hybride pour réduire les déplacements',
      'Migrer vers un cloud certifié ISO 14001 (AWS/Azure Green)',
      'Mettre en place un programme de compensation carbone (projets certifiés Gold Standard)',
    ],
    responsible: 'Directeur des Opérations — COO',
    timeline: 'Q3 2026 — Q4 2027',
    budget: '18 000 000 FCFA',
    kpi_target: 'Réduction empreinte carbone : baseline 2026 → -30% en 2028',
  },
  {
    id: 3,
    domain: 'Responsabilité Sociale & Diversité',
    current_state: 'Équipe multiculturelle mais sans politique D&I formalisée. Index égalité genre non calculé. Pas de programme de mentorat ou de développement des talents locaux.',
    target_state: 'Politique Diversité & Inclusion formalisée. Index égalité genre > 90/100. Programme mentorat Jeunes Talents Afrique. Charte télétravail et bien-être au travail.',
    gap_severity: 'major',
    current_score: 35,
    target_score: 85,
    observations: [
      'Absence de politique D&I documentée',
      'Pas d\'index égalité professionnelle',
      'Programme de développement des talents non structuré',
      'Bien-être au travail non mesuré',
    ],
    recommendations: [
      'Publier une Politique Diversité & Inclusion avec objectifs chiffrés',
      'Calculer et publier l\'index égalité professionnelle (écarts salariaux, promotions, maternité)',
      'Lancer le programme « Khepra NextGen » — mentorat 20 jeunes diplômés/an',
      'Mettre en place une enquête bien-être trimestrielle et un plan d\'action',
    ],
    responsible: 'Directrice des Ressources Humaines',
    timeline: 'Q3 2026 — Q2 2027',
    budget: '8 000 000 FCFA',
    kpi_target: 'Score D&I : 35 → 85/100. Index égalité > 90/100.',
  },
  {
    id: 4,
    domain: 'Reporting ESG & Communication Extra-Financière',
    current_state: 'Aucun rapport ESG ou de durabilité publié. Pas de page ESG sur le site web. Données ESG non collectées ni auditées.',
    target_state: 'Rapport de Durabilité annuel aligné ISSB/GRI. Page ESG dédiée sur khepra-experts.com. Données ESG auditées par un tiers indépendant. Notation EcoVadis ou équivalent.',
    gap_severity: 'major',
    current_score: 5,
    target_score: 90,
    observations: [
      'Rapport de durabilité inexistant',
      'Absence de communication ESG institutionnelle',
      'Données ESG non tracées ni auditées',
      'Pas de notation extra-financière',
    ],
    recommendations: [
      'Publier le premier Rapport de Durabilité Khepra Experts (exercice 2026)',
      'Créer une page ESG sur le site corporate avec les KPIs clés',
      'Faire auditer le rapport ESG par un tiers indépendant (cabinet Big Four partenaire)',
      'Soumettre Khepra Experts à une notation EcoVadis ou Vigeo Eiris',
    ],
    responsible: 'Directeur Marketing & Communication',
    timeline: 'Q4 2026 — Q1 2027',
    budget: '15 000 000 FCFA',
    kpi_target: 'Score reporting ESG : 5 → 90/100. Publication Rapport 2026 en mars 2027.',
  },
  {
    id: 5,
    domain: 'Gouvernance ESG Fournisseurs & Partenaires',
    current_state: 'Aucune politique d\'achats responsables. Pas d\'évaluation ESG des fournisseurs. Partenaires non audités sur critères ESG.',
    target_state: 'Charte Achats Responsables. Questionnaire ESG fournisseurs systématique. Score minimum ESG pour les fournisseurs stratégiques. Clause ESG dans tous les contrats.',
    gap_severity: 'moderate',
    current_score: 10,
    target_score: 75,
    observations: [
      'Pas de politique d\'achats responsables',
      'Aucune due diligence ESG des partenaires',
      'Contrats sans clauses ESG',
      'Chaîne d\'approvisionnement non cartographiée',
    ],
    recommendations: [
      'Adopter une Charte Achats Responsables alignée ISO 20400',
      'Intégrer un questionnaire ESG dans le processus de sélection fournisseurs',
      'Auditer les 10 fournisseurs stratégiques sur critères ESG',
      'Insérer une clause ESG dans tous les nouveaux contrats',
    ],
    responsible: 'Directeur Administratif et Financier',
    timeline: 'Q4 2026 — Q2 2027',
    budget: '5 000 000 FCFA',
    kpi_target: 'Score achats responsables : 10 → 75/100. 100% nouveaux contrats avec clause ESG.',
  },
];

// ============================================================
// PILIER 2 — CONFORMITÉ AML/CFT & RÉFÉRENTIELS RÉGIONAUX
// ============================================================
export const amlCftRequirements: AMLCFTRequirement[] = [
  {
    id: 1,
    reference: 'BCEAO — Instruction 008-05-2015',
    framework: 'BCEAO',
    requirement: 'Désignation d\'un Responsable Conformité LCB/FT (RCLCB/FT) au niveau de la Direction Générale',
    status: 'partial',
    evidence: 'Organigramme mentionnant un pôle Conformité sans RCLCB/FT nommé formellement',
    gap_description: 'KOS a une fonction conformité intégrée mais pas de RCLCB/FT désigné statutairement avec lettre de mission',
    remediation_action: 'Désigner formellement le RCLCB/FT par décision du Conseil, rédiger sa lettre de mission, notifier la BCEAO',
    priority: 'P0',
    deadline: '2026-09-30',
    owner: 'Managing Partner',
  },
  {
    id: 2,
    reference: 'BCEAO — Instruction 008-05-2015',
    framework: 'BCEAO',
    requirement: 'Mise en place d\'un dispositif de classification des risques LCB/FT (cartographie des risques)',
    status: 'partial',
    evidence: 'Cartographie des risques générique dans KOS Risk Engine, non spécifique LCB/FT',
    gap_description: 'Cartographie des risques existante mais non dédiée LCB/FT. Pas de scoring par typologie de client, pays, produit.',
    remediation_action: 'Déployer une cartographie des risques LCB/FT avec matrice probabilité × impact et mise à jour annuelle',
    priority: 'P0',
    deadline: '2026-10-31',
    owner: 'RCLCB/FT désigné',
  },
  {
    id: 3,
    reference: 'BCEAO — Instruction 008-05-2015',
    framework: 'BCEAO',
    requirement: 'Procédures de vigilance KYC (Know Your Customer) pour tous les clients',
    status: 'non_compliant',
    evidence: 'Processus KYC ad hoc, pas de procédure écrite standardisée',
    gap_description: 'Pas de procédure KYC formalisée. Vérification identité variable selon les missions. Absence de conservation systématique des pièces.',
    remediation_action: 'Rédiger et déployer une procédure KYC standard (identification, vérification, conservation 10 ans), former tous les consultants',
    priority: 'P0',
    deadline: '2026-10-31',
    owner: 'Directeur des Opérations',
  },
  {
    id: 4,
    reference: 'BCEAO — Instruction 008-05-2015',
    framework: 'BCEAO',
    requirement: 'Système de détection et déclaration des opérations suspectes (DOS)',
    status: 'non_compliant',
    evidence: 'Aucun système formalisé de détection des opérations suspectes',
    gap_description: 'Pas de procédure de détection et déclaration des opérations suspectes. Pas de canal de signalement interne.',
    remediation_action: 'Mettre en place une procédure DOS avec critères de suspicion, former les équipes, désigner un correspondant CENTIF/ANIF',
    priority: 'P0',
    deadline: '2026-11-30',
    owner: 'RCLCB/FT désigné',
  },
  {
    id: 5,
    reference: 'GAFI — Recommandation 10',
    framework: 'GAFI',
    requirement: 'Obligations de vigilance relatives à la clientèle — CDD (Customer Due Diligence)',
    status: 'non_compliant',
    evidence: 'Aucun processus CDD documenté',
    gap_description: 'Pas de vérification systématique de l\'identité des clients, des bénéficiaires effectifs. Absence de classification des risques clients.',
    remediation_action: 'Déployer un processus CDD standard (identification, vérification, BE, classification risque, revue périodique)',
    priority: 'P0',
    deadline: '2026-10-31',
    owner: 'RCLCB/FT désigné',
  },
  {
    id: 6,
    reference: 'GAFI — Recommandation 11',
    framework: 'GAFI',
    requirement: 'Conservation des documents — 10 ans minimum',
    status: 'partial',
    evidence: 'Documents stockés dans KOS Knowledge Center mais durée de conservation non standardisée',
    gap_description: 'Durée de conservation variable. Pas de politique d\'archivage formalisée alignée GAFI.',
    remediation_action: 'Formaliser une politique de conservation 10 ans pour tous les documents LCB/FT, automatiser dans KOS Knowledge Center',
    priority: 'P1',
    deadline: '2026-12-31',
    owner: 'Directeur IT',
  },
  {
    id: 7,
    reference: 'GAFI — Recommandation 18',
    framework: 'GAFI',
    requirement: 'Contrôles internes et succursales — programmes LCB/FT groupe',
    status: 'non_compliant',
    evidence: 'Pas de programme LCB/FT couvrant l\'ensemble du groupe Khepra Experts',
    gap_description: 'Absence de programme LCB/FT groupe. Filiales et bureaux non couverts par un dispositif harmonisé.',
    remediation_action: 'Élaborer un programme LCB/FT Groupe applicable à toutes les entités Khepra Experts, nommer un RCLCB/FT Groupe',
    priority: 'P1',
    deadline: '2026-12-31',
    owner: 'Managing Partner Groupe',
  },
  {
    id: 8,
    reference: 'COBAC — Règlement 01/03',
    framework: 'COBAC',
    requirement: 'Obligations de vigilance à l\'égard de la clientèle en zone CEMAC',
    status: 'non_compliant',
    evidence: 'Pas de procédures spécifiques CEMAC pour les missions au Cameroun, Gabon, Tchad, RCA',
    gap_description: 'KOS opère en zone CEMAC sans procédures LCB/FT alignées COBAC. Risque réglementaire pour les missions bancaires.',
    remediation_action: 'Adapter les procédures LCB/FT aux exigences COBAC, former les équipes CEMAC, désigner un correspondant local',
    priority: 'P0',
    deadline: '2026-11-30',
    owner: 'Directeur Régional CEMAC',
  },
  {
    id: 9,
    reference: 'OHADA — Acte Uniforme Droit Commercial Général',
    framework: 'OHADA',
    requirement: 'Identification du bénéficiaire effectif des personnes morales clientes',
    status: 'partial',
    evidence: 'Fiches clients sans identification systématique du bénéficiaire effectif',
    gap_description: 'Bénéficiaire effectif non systématiquement identifié pour les clients personnes morales. Risque de non-conformité GAFI R24.',
    remediation_action: 'Intégrer l\'identification du bénéficiaire effectif dans le processus KYC, former les équipes, mettre à jour les fiches clients',
    priority: 'P0',
    deadline: '2026-10-31',
    owner: 'RCLCB/FT désigné',
  },
  {
    id: 10,
    reference: 'GAFI — Recommandation 23',
    framework: 'GAFI',
    requirement: 'Obligations pour les professions non financières désignées (avocats, experts-comptables, conseils)',
    status: 'partial',
    evidence: 'KOS identifié comme profession non financière désignée sans procédure dédiée',
    gap_description: 'KOS est une profession non financière désignée (conseil) au sens GAFI. Obligations spécifiques (avocats, comptables) non couvertes.',
    remediation_action: 'Auditer le statut exact de KOS au regard de la R23, adapter les procédures en conséquence, notifier les autorités compétentes',
    priority: 'P1',
    deadline: '2027-01-31',
    owner: 'Responsable Juridique',
  },
  {
    id: 11,
    reference: 'BCEAO — Instruction 008-05-2015',
    framework: 'BCEAO',
    requirement: 'Formation régulière du personnel en matière de LCB/FT',
    status: 'non_compliant',
    evidence: 'Aucune formation LCB/FT tracée dans KOS Training Academy',
    gap_description: 'Pas de programme de formation LCB/FT pour les consultants et le personnel. Risque de non-détection.',
    remediation_action: 'Créer un module de formation LCB/FT obligatoire dans KOS Training Academy, organiser 2 sessions/an, certifier les participants',
    priority: 'P1',
    deadline: '2026-12-31',
    owner: 'Directrice RH',
  },
  {
    id: 12,
    reference: 'BCEAO/COBAC — Dispositif LCB/FT',
    framework: 'BCEAO/COBAC',
    requirement: 'Audit externe indépendant du dispositif LCB/FT (tous les 2 ans)',
    status: 'non_compliant',
    evidence: 'Aucun audit LCB/FT externe réalisé',
    gap_description: 'Audit externe LCB/FT obligatoire non réalisé. Recommandé par BCEAO/COBAC pour les professions non financières désignées.',
    remediation_action: 'Commander un audit externe LCB/FT indépendant (cabinet Big Four partenaire), planifier le premier audit Q1 2027',
    priority: 'P1',
    deadline: '2027-03-31',
    owner: 'Managing Partner',
  },
];

// ============================================================
// PILIER 3 — COMITÉS D'AUDIT & REPORTING ESG
// ============================================================
export const auditCommittees: AuditCommitteeSetup[] = [
  {
    id: 1,
    committee_name: 'Comité d\'Audit',
    mandate: 'Superviser l\'intégrité de l\'information financière, l\'efficacité du contrôle interne, la gestion des risques, l\'audit externe et la conformité réglementaire.',
    composition_target: '3 membres dont 1 indépendant + Président tournant non exécutif',
    current_state: 'Comité inexistant. Fonctions d\'audit assurées informellement par le Managing Partner.',
    charter_status: 'missing',
    meeting_frequency: 'Trimestrielle (4 réunions/an)',
    members: [
      { name: 'À nommer — Administrateur Indépendant', role: 'Président du Comité d\'Audit', independence: 'indépendant', expertise: 'Audit, Finance, Risk Management' },
      { name: 'Managing Partner', role: 'Membre', independence: 'non_indépendant', expertise: 'Stratégie, Conformité' },
      { name: 'À nommer — Expert externe', role: 'Membre invité permanent', independence: 'indépendant', expertise: 'Audit légal, IFRS, SYSCOHADA' },
    ],
    gaps: [
      'Charte du comité d\'audit non rédigée',
      'Membres indépendants non identifiés',
      'Calendrier des réunions non établi',
      'Pas de lien formel avec le commissaire aux comptes',
    ],
    deployment_phase: 'Phase 1 — Constitution',
    go_live: '2026-10-01',
  },
  {
    id: 2,
    committee_name: 'Comité ESG & Développement Durable',
    mandate: 'Superviser la stratégie ESG, valider les KPIs, examiner le rapport de durabilité, veiller à l\'alignement ISSB/GRI, évaluer les risques climatiques.',
    composition_target: '3 membres dont 2 indépendants + Expert ESG externe invité permanent',
    current_state: 'Comité inexistant. Sujets ESG traités sans gouvernance dédiée.',
    charter_status: 'missing',
    meeting_frequency: 'Trimestrielle (4 réunions/an)',
    members: [
      { name: 'À nommer — Administrateur Indépendant (spécialiste ESG)', role: 'Président du Comité ESG', independence: 'indépendant', expertise: 'ESG, ISSB, Climat' },
      { name: 'Managing Partner', role: 'Membre', independence: 'non_indépendant', expertise: 'Stratégie, Régulation' },
      { name: 'À nommer — Expert ESG Afrique', role: 'Membre invité permanent', independence: 'indépendant', expertise: 'ESG Afrique, GRI, ODD' },
    ],
    gaps: [
      'Charte ESG non rédigée',
      'Pas de cadre de reporting ESG (ISSB/GRI)',
      'KPIs ESG non définis',
      'Absence de processus de revue du rapport de durabilité',
    ],
    deployment_phase: 'Phase 1 — Constitution',
    go_live: '2026-11-01',
  },
  {
    id: 3,
    committee_name: 'Comité des Risques & Conformité',
    mandate: 'Superviser le dispositif de gestion des risques (ERM), la conformité LCB/FT, la cybersécurité, la protection des données, la continuité d\'activité.',
    composition_target: '3 membres dont 1 indépendant + RSSI invité permanent',
    current_state: 'Fonction risques informelle. Pas de comité dédié.',
    charter_status: 'missing',
    meeting_frequency: 'Trimestrielle (4 réunions/an)',
    members: [
      { name: 'À nommer — Administrateur Indépendant', role: 'Président', independence: 'indépendant', expertise: 'Risk Management, Compliance' },
      { name: 'Managing Partner', role: 'Membre', independence: 'non_indépendant', expertise: 'Stratégie' },
      { name: 'À nommer — RSSI / Expert Cyber', role: 'Invité permanent', independence: 'indépendant', expertise: 'Cybersécurité, ISO 27001' },
    ],
    gaps: [
      'Charte risques non rédigée',
      'Cartographie des risques non exhaustive',
      'Pas de registre des risques formalisé',
      'Appétit au risque non défini par le Conseil',
    ],
    deployment_phase: 'Phase 1 — Constitution',
    go_live: '2026-10-01',
  },
  {
    id: 4,
    committee_name: 'Comité de Rémunération & Nomination',
    mandate: 'Superviser la politique de rémunération, l\'évaluation des dirigeants, la planification de la succession, la composition du Conseil.',
    composition_target: '2 membres indépendants + 1 membre non exécutif',
    current_state: 'Politique RH informelle. Pas de comité dédié.',
    charter_status: 'missing',
    meeting_frequency: 'Semestrielle (2 réunions/an)',
    members: [
      { name: 'À nommer — Administrateur Indépendant', role: 'Président', independence: 'indépendant', expertise: 'RH, Rémunération, Gouvernance' },
      { name: 'À nommer — Administrateur Indépendant', role: 'Membre', independence: 'indépendant', expertise: 'Gouvernance, OHADA' },
    ],
    gaps: [
      'Politique de rémunération non formalisée',
      'Plan de succession inexistant',
      'Évaluation du Conseil non structurée',
    ],
    deployment_phase: 'Phase 2 — Déploiement',
    go_live: '2027-01-01',
  },
];

// ============================================================
// PILIER 4 — CERTIFICATION ISO/IEC 27001:2022
// ============================================================
export const iso27001Controls: ISO27001Control[] = [
  {
    id: 1,
    domain: 'Contexte de l\'organisme',
    control_ref: '4.1',
    control_name: 'Compréhension de l\'organisme et de son contexte',
    status: 'not_started',
    implementation_level: 0,
    evidence_status: 'missing',
    action_required: 'Réaliser une analyse SWOT/PESTEL du SMSI, documenter les enjeux internes et externes',
    priority: 'high',
    deadline: '2026-09-30',
    owner: 'Directeur IT',
  },
  {
    id: 2,
    domain: 'Contexte de l\'organisme',
    control_ref: '4.2/4.3',
    control_name: 'Parties intéressées et périmètre du SMSI',
    status: 'not_started',
    implementation_level: 0,
    evidence_status: 'missing',
    action_required: 'Identifier les parties intéressées (clients, régulateurs, partenaires), définir le périmètre du SMSI',
    priority: 'high',
    deadline: '2026-09-30',
    owner: 'Directeur IT',
  },
  {
    id: 3,
    domain: 'Leadership',
    control_ref: '5.1',
    control_name: 'Leadership et engagement de la direction',
    status: 'not_started',
    implementation_level: 0,
    evidence_status: 'missing',
    action_required: 'Rédiger une déclaration de politique de sécurité de l\'information signée par le Managing Partner',
    priority: 'critical',
    deadline: '2026-08-31',
    owner: 'Managing Partner',
  },
  {
    id: 4,
    domain: 'Leadership',
    control_ref: '5.2',
    control_name: 'Politique de sécurité de l\'information',
    status: 'not_started',
    implementation_level: 0,
    evidence_status: 'missing',
    action_required: 'Rédiger, approuver et communiquer la politique de sécurité de l\'information (PSI)',
    priority: 'critical',
    deadline: '2026-08-31',
    owner: 'RSSI (à nommer)',
  },
  {
    id: 5,
    domain: 'Leadership',
    control_ref: '5.3',
    control_name: 'Rôles, responsabilités et autorités organisationnelles',
    status: 'partial',
    implementation_level: 30,
    evidence_status: 'partial',
    action_required: 'Nommer un RSSI formel, définir la matrice RACI sécurité, documenter les rôles',
    priority: 'critical',
    deadline: '2026-08-31',
    owner: 'Managing Partner',
  },
  {
    id: 6,
    domain: 'Planification',
    control_ref: '6.1',
    control_name: 'Actions face aux risques et opportunités',
    status: 'not_started',
    implementation_level: 0,
    evidence_status: 'missing',
    action_required: 'Réaliser une appréciation des risques sécurité (Asset-based Risk Assessment), plan de traitement des risques',
    priority: 'critical',
    deadline: '2026-10-31',
    owner: 'RSSI',
  },
  {
    id: 7,
    domain: 'Planification',
    control_ref: '6.2',
    control_name: 'Objectifs sécurité et planification',
    status: 'not_started',
    implementation_level: 0,
    evidence_status: 'missing',
    action_required: 'Définir 8-10 objectifs sécurité mesurables alignés sur la PSI et le plan de traitement des risques',
    priority: 'high',
    deadline: '2026-10-31',
    owner: 'RSSI',
  },
  {
    id: 8,
    domain: 'Support',
    control_ref: '7.1/7.2',
    control_name: 'Ressources et compétences',
    status: 'partial',
    implementation_level: 45,
    evidence_status: 'partial',
    action_required: 'Budgéter le programme ISO 27001, évaluer les compétences sécurité, plan de formation',
    priority: 'high',
    deadline: '2026-09-30',
    owner: 'DRH / DAF',
  },
  {
    id: 9,
    domain: 'Support',
    control_ref: '7.3',
    control_name: 'Sensibilisation',
    status: 'not_started',
    implementation_level: 0,
    evidence_status: 'missing',
    action_required: 'Programme de sensibilisation sécurité pour tous les collaborateurs (phishing, mots de passe, classification)',
    priority: 'high',
    deadline: '2026-11-30',
    owner: 'RSSI',
  },
  {
    id: 10,
    domain: 'Support',
    control_ref: '7.5',
    control_name: 'Informations documentées',
    status: 'partial',
    implementation_level: 25,
    evidence_status: 'partial',
    action_required: 'Structurer la documentation SMSI (politiques, procédures, enregistrements), gestion documentaire',
    priority: 'high',
    deadline: '2026-11-30',
    owner: 'RSSI',
  },
  {
    id: 11,
    domain: 'Réalisation',
    control_ref: '8.1/8.2/8.3',
    control_name: 'Planification et maîtrise opérationnelle — Appréciation et traitement des risques',
    status: 'not_started',
    implementation_level: 0,
    evidence_status: 'missing',
    action_required: 'Déployer le processus de risk assessment, mettre en œuvre les mesures de traitement',
    priority: 'critical',
    deadline: '2026-12-31',
    owner: 'RSSI',
  },
  {
    id: 12,
    domain: 'Évaluation des performances',
    control_ref: '9.1',
    control_name: 'Surveillance, mesure, analyse et évaluation',
    status: 'partial',
    implementation_level: 20,
    evidence_status: 'partial',
    action_required: 'Définir les indicateurs de performance sécurité, mettre en place le monitoring continu',
    priority: 'high',
    deadline: '2027-01-31',
    owner: 'RSSI',
  },
  {
    id: 13,
    domain: 'Évaluation des performances',
    control_ref: '9.2',
    control_name: 'Audit interne',
    status: 'not_started',
    implementation_level: 0,
    evidence_status: 'missing',
    action_required: 'Former des auditeurs internes ISO 27001, planifier et réaliser le premier audit interne',
    priority: 'high',
    deadline: '2027-03-31',
    owner: 'Responsable Qualité',
  },
  {
    id: 14,
    domain: 'Évaluation des performances',
    control_ref: '9.3',
    control_name: 'Revue de direction',
    status: 'not_started',
    implementation_level: 0,
    evidence_status: 'missing',
    action_required: 'Planifier et réaliser la première revue de direction du SMSI',
    priority: 'high',
    deadline: '2027-04-30',
    owner: 'Managing Partner',
  },
  {
    id: 15,
    domain: 'Amélioration',
    control_ref: '10.1/10.2',
    control_name: 'Amélioration continue — Non-conformités et actions correctives',
    status: 'not_started',
    implementation_level: 0,
    evidence_status: 'missing',
    action_required: 'Mettre en place le processus de gestion des non-conformités et actions correctives',
    priority: 'medium',
    deadline: '2027-03-31',
    owner: 'RSSI',
  },
];

// ============================================================
// PLAN CORRECTIF — 17 Actions Priorisées
// ============================================================
export const correctiveActions: CorrectiveAction[] = [
  {
    id: 1,
    pillar: 'ESG Gouvernance',
    action: 'Créer le Comité ESG au Conseil d\'Administration',
    priority: 'P0',
    responsible: 'Managing Partner',
    start_date: '2026-07-01',
    end_date: '2026-09-30',
    budget: '3 500 000 FCFA',
    expected_outcome: 'Comité ESG opérationnel, charte validée, 3 membres nommés',
    kpi: 'Score gouvernance ESG : 15 → 50/100',
    dependencies: [],
    status: 'not_started',
    progress: 0,
  },
  {
    id: 2,
    pillar: 'ESG Gouvernance',
    action: 'Réaliser le Bilan Carbone Scope 1/2/3',
    priority: 'P0',
    responsible: 'Directeur des Opérations',
    start_date: '2026-07-01',
    end_date: '2026-10-31',
    budget: '8 000 000 FCFA',
    expected_outcome: 'Bilan carbone certifié, baseline 2026 établie',
    kpi: 'Score environnemental : 10 → 40/100',
    dependencies: [],
    status: 'not_started',
    progress: 0,
  },
  {
    id: 3,
    pillar: 'AML/CFT',
    action: 'Désigner le RCLCB/FT et rédiger sa lettre de mission',
    priority: 'P0',
    responsible: 'Managing Partner',
    start_date: '2026-07-01',
    end_date: '2026-08-15',
    budget: '500 000 FCFA',
    expected_outcome: 'RCLCB/FT nommé, lettre de mission signée, notification BCEAO envoyée',
    kpi: 'Conformité AML/CFT : 15 → 35/100',
    dependencies: [],
    status: 'not_started',
    progress: 0,
  },
  {
    id: 4,
    pillar: 'AML/CFT',
    action: 'Rédiger et déployer la procédure KYC/CDD standard',
    priority: 'P0',
    responsible: 'RCLCB/FT désigné',
    start_date: '2026-08-01',
    end_date: '2026-10-31',
    budget: '3 000 000 FCFA',
    expected_outcome: 'Procédure KYC documentée, 100% personnel formé, fiches clients conformes',
    kpi: 'Conformité AML/CFT : 35 → 55/100',
    dependencies: [3],
    status: 'not_started',
    progress: 0,
  },
  {
    id: 5,
    pillar: 'AML/CFT',
    action: 'Mettre en place la cartographie des risques LCB/FT',
    priority: 'P0',
    responsible: 'RCLCB/FT désigné',
    start_date: '2026-08-15',
    end_date: '2026-10-31',
    budget: '2 500 000 FCFA',
    expected_outcome: 'Cartographie LCB/FT validée, matrice de risques déployée',
    kpi: 'Conformité AML/CFT : 55 → 65/100',
    dependencies: [3, 4],
    status: 'not_started',
    progress: 0,
  },
  {
    id: 6,
    pillar: 'AML/CFT',
    action: 'Déployer la procédure de Déclaration d\'Opérations Suspectes (DOS)',
    priority: 'P0',
    responsible: 'RCLCB/FT désigné',
    start_date: '2026-10-01',
    end_date: '2026-11-30',
    budget: '2 000 000 FCFA',
    expected_outcome: 'Procédure DOS opérationnelle, canal de signalement interne actif',
    kpi: 'Conformité AML/CFT : 65 → 75/100',
    dependencies: [3, 4, 5],
    status: 'not_started',
    progress: 0,
  },
  {
    id: 7,
    pillar: 'AML/CFT',
    action: 'Adapter les procédures LCB/FT à la zone CEMAC (COBAC)',
    priority: 'P0',
    responsible: 'Directeur Régional CEMAC',
    start_date: '2026-09-01',
    end_date: '2026-11-30',
    budget: '3 500 000 FCFA',
    expected_outcome: 'Procédures CEMAC alignées COBAC, correspondant local désigné',
    kpi: 'Conformité AML/CFT : 75 → 82/100',
    dependencies: [4, 5],
    status: 'not_started',
    progress: 0,
  },
  {
    id: 8,
    pillar: 'Comités d\'Audit',
    action: 'Constituer le Comité d\'Audit et le Comité Risques & Conformité',
    priority: 'P0',
    responsible: 'Managing Partner',
    start_date: '2026-07-01',
    end_date: '2026-09-30',
    budget: '2 000 000 FCFA',
    expected_outcome: '2 comités constitués, chartes approuvées, membres nommés',
    kpi: 'Score gouvernance : 20 → 50/100',
    dependencies: [],
    status: 'not_started',
    progress: 0,
  },
  {
    id: 9,
    pillar: 'Comités d\'Audit',
    action: 'Lancer le premier cycle d\'audit interne ESG',
    priority: 'P1',
    responsible: 'Président Comité d\'Audit',
    start_date: '2026-10-01',
    end_date: '2026-12-31',
    budget: '4 000 000 FCFA',
    expected_outcome: 'Rapport d\'audit ESG interne, gaps documentés, plan de remédiation',
    kpi: 'Score reporting ESG : 5 → 35/100',
    dependencies: [1, 8],
    status: 'not_started',
    progress: 0,
  },
  {
    id: 10,
    pillar: 'Comités d\'Audit',
    action: 'Publier le premier Rapport de Durabilité KOS',
    priority: 'P0',
    responsible: 'Directeur Marketing & Communication',
    start_date: '2026-12-01',
    end_date: '2027-03-31',
    budget: '6 000 000 FCFA',
    expected_outcome: 'Rapport de Durabilité 2026 publié, aligné GRI/ISSB, audité',
    kpi: 'Score reporting ESG : 35 → 70/100',
    dependencies: [1, 2, 9],
    status: 'not_started',
    progress: 0,
  },
  {
    id: 11,
    pillar: 'ISO 27001',
    action: 'Nommer le RSSI et rédiger la Politique de Sécurité de l\'Information',
    priority: 'P0',
    responsible: 'Managing Partner',
    start_date: '2026-07-01',
    end_date: '2026-08-31',
    budget: '1 500 000 FCFA',
    expected_outcome: 'RSSI nommé, PSI signée et communiquée',
    kpi: 'Score ISO 27001 readiness : 5 → 25/100',
    dependencies: [],
    status: 'not_started',
    progress: 0,
  },
  {
    id: 12,
    pillar: 'ISO 27001',
    action: 'Réaliser l\'appréciation des risques sécurité (Asset-based Risk Assessment)',
    priority: 'P0',
    responsible: 'RSSI',
    start_date: '2026-09-01',
    end_date: '2026-11-30',
    budget: '4 000 000 FCFA',
    expected_outcome: 'Registre des risques sécurité documenté, plan de traitement validé',
    kpi: 'Score ISO 27001 readiness : 25 → 50/100',
    dependencies: [11],
    status: 'not_started',
    progress: 0,
  },
  {
    id: 13,
    pillar: 'ISO 27001',
    action: 'Déployer le programme de sensibilisation sécurité',
    priority: 'P1',
    responsible: 'RSSI',
    start_date: '2026-10-01',
    end_date: '2026-12-31',
    budget: '2 000 000 FCFA',
    expected_outcome: '100% collaborateurs sensibilisés, taux de réussite phishing test > 95%',
    kpi: 'Score ISO 27001 readiness : 50 → 65/100',
    dependencies: [11, 12],
    status: 'not_started',
    progress: 0,
  },
  {
    id: 14,
    pillar: 'ISO 27001',
    action: 'Compléter la documentation du SMSI (politiques, procédures, enregistrements)',
    priority: 'P1',
    responsible: 'RSSI',
    start_date: '2026-11-01',
    end_date: '2027-02-28',
    budget: '5 000 000 FCFA',
    expected_outcome: 'Documentation SMSI complète, 100% contrôles documentés',
    kpi: 'Score ISO 27001 readiness : 65 → 80/100',
    dependencies: [12, 13],
    status: 'not_started',
    progress: 0,
  },
  {
    id: 15,
    pillar: 'ISO 27001',
    action: 'Réaliser le premier audit interne ISO 27001',
    priority: 'P1',
    responsible: 'Responsable Qualité',
    start_date: '2027-01-01',
    end_date: '2027-04-30',
    budget: '3 500 000 FCFA',
    expected_outcome: 'Audit interne complété, non-conformités documentées, plan d\'actions',
    kpi: 'Score ISO 27001 readiness : 80 → 90/100',
    dependencies: [14],
    status: 'not_started',
    progress: 0,
  },
  {
    id: 16,
    pillar: 'AML/CFT',
    action: 'Commander l\'audit externe LCB/FT indépendant',
    priority: 'P1',
    responsible: 'Managing Partner',
    start_date: '2027-01-01',
    end_date: '2027-03-31',
    budget: '6 000 000 FCFA',
    expected_outcome: 'Rapport d\'audit LCB/FT externe, recommandations, plan de remédiation',
    kpi: 'Conformité AML/CFT : 82 → 92/100',
    dependencies: [3, 4, 5, 6, 7],
    status: 'not_started',
    progress: 0,
  },
  {
    id: 17,
    pillar: 'ESG Gouvernance',
    action: 'Obtenir une notation ESG (EcoVadis ou Vigeo Eiris)',
    priority: 'P2',
    responsible: 'Directeur Marketing & Communication',
    start_date: '2027-04-01',
    end_date: '2027-06-30',
    budget: '4 500 000 FCFA',
    expected_outcome: 'Notation ESG externe obtenue, score publié, benchmark concurrentiel',
    kpi: 'Score ESG global : 80 → 95/100',
    dependencies: [1, 2, 10],
    status: 'not_started',
    progress: 0,
  },
];

// ============================================================
// LIVRABLES TRIMESTRIELS — Trajectoire 28 → 95/100
// ============================================================
export const quarterlyMilestones: QuarterlyMilestone[] = [
  {
    quarter: 'Q3',
    label: 'Fondations — Diagnostic & Lancement',
    period: 'Juillet — Septembre 2026',
    objectives: [
      'Réaliser le diagnostic complet 4 piliers',
      'Nommer les responsables clés (RSSI, RCLCB/FT)',
      'Constituer les comités d\'audit',
      'Lancer le bilan carbone',
    ],
    deliverables: [
      'Rapport de diagnostic ESG & Régulation Big Four',
      'Lettre de mission RCLCB/FT signée',
      'Charte Comité d\'Audit et Comité Risques approuvées',
      'Politique de Sécurité de l\'Information (PSI) signée',
      'Contrat bilan carbone signé',
    ],
    kpis: [
      { name: 'Score Global Alignement', current: '28', target: '45' },
      { name: 'Score ESG Gouvernance', current: '15', target: '40' },
      { name: 'Score AML/CFT', current: '15', target: '45' },
      { name: 'Score Comités Audit', current: '5', target: '35' },
      { name: 'Score ISO 27001 Readiness', current: '5', target: '25' },
    ],
    budget: '22 500 000 FCFA',
    score_target: 45,
  },
  {
    quarter: 'Q4',
    label: 'Structuration — Procédures & Outils',
    period: 'Octobre — Décembre 2026',
    objectives: [
      'Déployer les procédures KYC/CDD et DOS',
      'Finaliser la cartographie des risques LCB/FT',
      'Adapter les procédures à la zone CEMAC',
      'Lancer le 1er cycle d\'audit interne ESG',
      'Réaliser l\'appréciation des risques sécurité ISO 27001',
      'Déployer la sensibilisation sécurité',
    ],
    deliverables: [
      'Procédure KYC/CDD documentée et déployée',
      'Cartographie des risques LCB/FT validée',
      'Procédure DOS opérationnelle',
      'Procédures COBAC CEMAC adaptées',
      'Registre des risques sécurité ISO 27001',
      'Programme de sensibilisation sécurité déployé',
      'Rapport d\'audit interne ESG Phase 1',
    ],
    kpis: [
      { name: 'Score Global Alignement', current: '45', target: '62' },
      { name: 'Score ESG Gouvernance', current: '40', target: '55' },
      { name: 'Score AML/CFT', current: '45', target: '72' },
      { name: 'Score Comités Audit', current: '35', target: '55' },
      { name: 'Score ISO 27001 Readiness', current: '25', target: '60' },
    ],
    budget: '28 000 000 FCFA',
    score_target: 62,
  },
  {
    quarter: 'Q1',
    label: 'Consolidation — Audits & Reporting',
    period: 'Janvier — Mars 2027',
    objectives: [
      'Publier le Rapport de Durabilité 2026',
      'Réaliser l\'audit externe LCB/FT',
      'Compléter la documentation SMSI ISO 27001',
      'Lancer l\'audit interne ISO 27001',
    ],
    deliverables: [
      'Rapport de Durabilité KOS 2026 (aligné GRI/ISSB)',
      'Rapport d\'audit LCB/FT externe indépendant',
      'Documentation SMSI complète (politiques, procédures, enregistrements)',
      'Rapport d\'audit interne ISO 27001 avec plan d\'actions',
      'Revue de direction ISO 27001 #1',
    ],
    kpis: [
      { name: 'Score Global Alignement', current: '62', target: '80' },
      { name: 'Score ESG Gouvernance', current: '55', target: '75' },
      { name: 'Score AML/CFT', current: '72', target: '92' },
      { name: 'Score Comités Audit', current: '55', target: '75' },
      { name: 'Score ISO 27001 Readiness', current: '60', target: '88' },
    ],
    budget: '24 000 000 FCFA',
    score_target: 80,
  },
  {
    quarter: 'Q2',
    label: 'Excellence — Certification & Notation',
    period: 'Avril — Juin 2027',
    objectives: [
      'Obtenir la certification ISO/IEC 27001:2022',
      'Obtenir une notation ESG externe (EcoVadis)',
      'Déployer le programme LCB/FT Groupe',
      'Consolider le dispositif de gouvernance ESG',
    ],
    deliverables: [
      'Certificat ISO/IEC 27001:2022',
      'Rapport de notation EcoVadis (ou équivalent)',
      'Programme LCB/FT Groupe déployé',
      'Charte ESG Khepra Experts publiée',
      'Tableau de bord ESG exécutif automatisé',
      'Plan d\'amélioration continue 2027-2028',
    ],
    kpis: [
      { name: 'Score Global Alignement', current: '80', target: '95' },
      { name: 'Score ESG Gouvernance', current: '75', target: '95' },
      { name: 'Score AML/CFT', current: '92', target: '98' },
      { name: 'Score Comités Audit', current: '75', target: '92' },
      { name: 'Score ISO 27001 Readiness', current: '88', target: '100' },
    ],
    budget: '18 000 000 FCFA',
    score_target: 95,
  },
];

// ============================================================
// SYNTHÈSE — Dashboard Global
// ============================================================
export const alignmentScores = {
  global_score: 28,
  global_target: 95,
  esg_governance: { score: 15, target: 95, label: 'ESG Gouvernance' },
  aml_cft: { score: 15, target: 98, label: 'AML/CFT' },
  audit_committees: { score: 5, target: 92, label: 'Comités d\'Audit' },
  iso_27001: { score: 5, target: 100, label: 'ISO 27001' },
};

export const keyFindings = [
  {
    id: 1,
    severity: 'critical',
    title: 'Gouvernance ESG inexistante',
    detail: 'Aucun comité ESG au Conseil. Pas de charte, de politique, ni de KPIs ESG. Risque réputationnel majeur pour un cabinet qui conseille ses clients sur ces sujets.',
    impact: 'Perte de crédibilité auprès des clients institutionnels (IFC, BOAD, AfDB). Inéligibilité à certains appels d\'offres exigeant une notation ESG.',
  },
  {
    id: 2,
    severity: 'critical',
    title: 'Conformité LCB/FT non structurée',
    detail: 'Pas de RCLCB/FT désigné, pas de procédure KYC standardisée, pas de cartographie des risques LCB/FT. 8 exigences GAFI/BCEAO non conformes.',
    impact: 'Risque juridique et réglementaire. Exposition à des sanctions BCEAO/COBAC. Blocage potentiel des missions pour les institutions financières régulées.',
  },
  {
    id: 3,
    severity: 'critical',
    title: 'Absence de comités d\'audit formels',
    detail: 'Aucun comité spécialisé du Conseil. Fonctions d\'audit, risques, ESG et rémunération non structurées. Non-conformité aux meilleures pratiques OHADA AUSCGIE.',
    impact: 'Gouvernance faible. Pas de supervision indépendante. Risque de non-conformité pour les certifications et agréments.',
  },
  {
    id: 4,
    severity: 'critical',
    title: 'ISO 27001 — Zéro préparation',
    detail: 'Aucun SMSI en place. Pas de politique de sécurité, pas de RSSI nommé, pas d\'appréciation des risques. Documentation inexistante.',
    impact: 'Impossibilité de candidater aux appels d\'offres exigeant ISO 27001. Risque cybersécurité non maîtrisé. Perte d\'avantage concurrentiel.',
  },
  {
    id: 5,
    severity: 'major',
    title: 'Reporting extra-financier absent',
    detail: 'Aucun rapport ESG ou de durabilité publié. Pas de bilan carbone. Données ESG non collectées. Communication ESG inexistante.',
    impact: 'Opportunité manquée de différenciation. Absence de transparence perçue négativement par les clients institutionnels et les bailleurs.',
  },
];

export const executiveSummary = {
  mandate: 'Alignement KOS — Standards ESG, AML/CFT, Comités d\'Audit, ISO 27001',
  auditors: 'Consortium Big Four — PwC · Deloitte · EY · KPMG',
  date: '2026-06-19',
  version: 'v1.0 — Phase 0 Diagnostic',
  score_current: 28,
  score_target: 95,
  timeline: '12 mois (Q3 2026 — Q2 2027)',
  total_budget: '92 500 000 FCFA',
  total_actions: 17,
  critical_actions: 9,
  high_actions: 6,
  medium_actions: 2,
  roi_narrative: 'Certification ISO 27001 débloque l\'accès aux appels d\'offres internationaux (CA additionnel estimé 1.2 Md FCFA). Conformité AML/CFT sécurise les missions bancaires existantes (CA récurrent 850 M FCFA). Notation ESG ouvre les marchés bailleurs multilatéraux (CA additionnel estimé 500 M FCFA). Budget total 92.5 M FCFA pour un ROI > 27x.',
};





