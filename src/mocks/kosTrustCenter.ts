// ============================================================
// KOS Trust Center™ — BLOC 8
// Méthodologies, Certifications, Références, Indicateurs Qualité
// Confiance institutionnelle niveau Big Four
// ============================================================

export interface TrustCertification {
  id: string;
  name: string;
  issuer: string;
  issuer_logo: string;
  standard: string;
  status: 'active' | 'in_progress' | 'planned';
  valid_until: string;
  scope: string;
  score: number;
  description: string;
}

export interface TrustReference {
  id: string;
  client_name: string;
  sector: string;
  country: string;
  mission_type: string;
  year: number;
  testimonial: string;
  contact_role: string;
  impact_metric: string;
  impact_value: string;
  is_public: boolean;
}

export interface TrustQualityIndicator {
  id: string;
  name: string;
  category: string;
  current_value: number;
  target_value: number;
  trend: 'up' | 'stable' | 'down';
  period: string;
  icon: string;
  description: string;
}

export interface TrustMethodology {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  standards: string[];
  deliverables_count: number;
  sections_count: number;
  maturity_levels: number;
  icon: string;
}

export const trustCertifications: TrustCertification[] = [
  {
    id: 'cert-iso-9001',
    name: 'ISO 9001:2015 — Management de la Qualité',
    issuer: 'Bureau Veritas',
    issuer_logo: 'ri-verified-badge-line',
    standard: 'ISO 9001:2015',
    status: 'active',
    valid_until: '2027-09-15',
    scope: 'Conseil en stratégie, audit, conformité réglementaire — UEMOA & CEMAC',
    score: 96,
    description: 'Certification du système de management de la qualité pour l\'ensemble des activités de conseil, d\'audit et de conformité réglementaire. Audit de renouvellement réussi avec 0 non-conformité majeure.',
  },
  {
    id: 'cert-iso-27001',
    name: 'ISO 27001:2022 — Sécurité de l\'Information',
    issuer: 'Bureau Veritas',
    issuer_logo: 'ri-shield-check-line',
    standard: 'ISO 27001:2022',
    status: 'in_progress',
    valid_until: '—',
    scope: 'Système d\'information KOS, plateforme SaaS, données clients',
    score: 78,
    description: 'Certification en cours — Phase 3/4. 95/114 contrôles Annexe A validés. 5 gaps critiques en remédiation. Cible certification Décembre 2026.',
  },
  {
    id: 'cert-iso-37000',
    name: 'ISO 37000:2021 — Gouvernance des Organismes',
    issuer: 'AFNOR Certification',
    issuer_logo: 'ri-government-line',
    standard: 'ISO 37000:2021',
    status: 'active',
    valid_until: '2028-03-20',
    scope: 'Gouvernance d\'entreprise, Conseil d\'Administration, Comités spécialisés',
    score: 94,
    description: 'Certification de la gouvernance d\'entreprise alignée sur les meilleures pratiques internationales. Advisory Board actif, 4 comités spécialisés, politique de conflits d\'intérêts.',
  },
  {
    id: 'cert-iso-20700',
    name: 'ISO 20700:2017 — Services de Conseil en Management',
    issuer: 'AFNOR Certification',
    issuer_logo: 'ri-briefcase-line',
    standard: 'ISO 20700:2017',
    status: 'active',
    valid_until: '2027-06-10',
    scope: 'Missions de conseil en management, diagnostic, accompagnement stratégique',
    score: 98,
    description: 'Directives pour la prestation de services de conseil en management. Conformité totale aux clauses contractuelles, d\'exécution et de clôture.',
  },
  {
    id: 'cert-iso-42001',
    name: 'ISO 42001:2023 — Management de l\'Intelligence Artificielle',
    issuer: 'Bureau Veritas',
    issuer_logo: 'ri-robot-line',
    standard: 'ISO 42001:2023',
    status: 'in_progress',
    valid_until: '—',
    scope: 'Système KOS, 75 agents IA, gouvernance algorithmique',
    score: 87,
    description: 'Certification pionnière en Afrique francophone. AI Registry complet (75 agents), AI Ethics Board actif, AI Audit Trail opérationnel. Audit final Q1 2027.',
  },
  {
    id: 'cert-iso-22301',
    name: 'ISO 22301:2019 — Continuité d\'Activité',
    issuer: 'SGS',
    issuer_logo: 'ri-restart-line',
    standard: 'ISO 22301:2019',
    status: 'in_progress',
    valid_until: '—',
    scope: 'PCA/PRA KHEPRA EXPERTS, résilience opérationnelle',
    score: 72,
    description: 'Système de management de la continuité d\'activité. PCA documenté, PRA en cours de test. Cible certification Q2 2027.',
  },
  {
    id: 'cert-gafi',
    name: 'Conformité GAFI — 40 Recommandations',
    issuer: 'GIABA / GABAC',
    issuer_logo: 'ri-fingerprint-line',
    standard: 'GAFI 40 Recommandations (2023)',
    status: 'active',
    valid_until: 'Permanent',
    scope: 'Dispositif LBC/FT interne, politique KYC, déclaration de soupçon',
    score: 100,
    description: 'Conformité intégrale du dispositif interne LBC/FT. 40/40 recommandations couvertes. Politique KYC/CDD alignée GIABA/GABAC. Déclarations de soupçon automatisées.',
  },
  {
    id: 'cert-rgpd',
    name: 'Conformité RGPD — Règlement Général Protection Données',
    issuer: 'CNIL / ARCEP',
    issuer_logo: 'ri-lock-line',
    standard: 'RGPD — UE 2016/679 / Loi 029-2021 UEMOA',
    status: 'active',
    valid_until: 'Permanent',
    scope: 'Traitement données personnelles, registre, consentement, sous-traitance',
    score: 100,
    description: 'Conformité totale au RGPD et aux lois nationales de protection des données. Registre des traitements à jour, DPO désigné, PIA réalisés.',
  },
];

export const trustReferences: TrustReference[] = [
  {
    id: 'ref-001',
    client_name: 'Banque Atlantique — Côte d\'Ivoire',
    sector: 'Banque — UEMOA',
    country: 'Côte d\'Ivoire',
    mission_type: 'Pré-Inspection BCEAO — Audit 215 points',
    year: 2025,
    testimonial: 'La méthodologie KHEPRA a permis de résorber 47 écarts critiques en 90 jours. L\'inspection BCEAO s\'est soldée par 0 observation majeure. Un record dans notre secteur.',
    contact_role: 'Directeur Général Adjoint — Risques & Conformité',
    impact_metric: 'Écarts critiques résorbés',
    impact_value: '47 → 0 en 90 jours',
    is_public: false,
  },
  {
    id: 'ref-002',
    client_name: 'Groupe Microfinancier Panafricain — 8 pays',
    sector: 'MicroFinance — UEMOA',
    country: 'Burkina Faso (siège)',
    mission_type: 'Mise en Conformité LBC/FT — 12 agences',
    year: 2025,
    testimonial: 'Score GAFI passé de 3/8 à 8/8 piliers en 4 mois. KHEPRA a industrialisé notre dispositif LBC/FT sur l\'ensemble du réseau.',
    contact_role: 'Secrétaire Général — Compliance Officer Groupe',
    impact_metric: 'Score GAFI',
    impact_value: '3/8 → 8/8 en 4 mois',
    is_public: false,
  },
  {
    id: 'ref-003',
    client_name: 'Groupe Agro-Industriel — 3 pays OHADA',
    sector: 'Agro-Industrie',
    country: 'Cameroun / Tchad / RCA',
    mission_type: 'Documentation Prix de Transfert BEPS Action 13',
    year: 2025,
    testimonial: 'Défense fiscale d\'un redressement de 2.4 Mds FCFA. Réduction de 87% après production de la documentation KHEPRA.',
    contact_role: 'Directeur Administratif et Financier Groupe',
    impact_metric: 'Redressement fiscal réduit',
    impact_value: '2.4 Mds → 312 M FCFA (-87%)',
    is_public: false,
  },
  {
    id: 'ref-004',
    client_name: 'Institution Financière Internationale — Projet Régional',
    sector: 'Financement Développement',
    country: 'Sénégal',
    mission_type: 'Due Diligence Acquisition — 3 juridictions',
    year: 2025,
    testimonial: 'Rapport de due diligence de niveau Big Four livré en 8 semaines. 27 risques identifiés, 5 deals-breakers évités. La transaction de 150 Mds FCFA a été sécurisée.',
    contact_role: 'Investment Director — Fonds Panafricain',
    impact_metric: 'Risques identifiés',
    impact_value: '27 risques — 5 deal-breakers évités',
    is_public: false,
  },
  {
    id: 'ref-005',
    client_name: 'Ministère des Finances — Afrique de l\'Ouest',
    sector: 'Secteur Public',
    country: 'Bénin',
    mission_type: 'Transformation Digitale — Stratégie & Roadmap',
    year: 2026,
    testimonial: 'La méthodologie KHEPRA de planification stratégique a structuré notre feuille de route transformation digitale 2026-2030 avec une précision remarquable.',
    contact_role: 'Directeur de Cabinet — Ministère des Finances',
    impact_metric: 'Budget modernisation mobilisé',
    impact_value: '12.5 Mds FCFA — 18 projets',
    is_public: true,
  },
  {
    id: 'ref-006',
    client_name: 'Établissement de Paiement — Agrément UEMOA',
    sector: 'FinTech — Paiement Mobile',
    country: 'Togo',
    mission_type: 'Accompagnement Agrément — Dossier BCEAO & Business Plan',
    year: 2026,
    testimonial: 'Business Plan investment ready en 10 semaines. Dossier d\'agrément accepté sans demande de complément par la commission bancaire.',
    contact_role: 'CEO & Fondateur',
    impact_metric: 'Délai obtention agrément',
    impact_value: '8 mois (vs 18 mois moyenne)',
    is_public: false,
  },
];

export const trustQualityIndicators: TrustQualityIndicator[] = [
  {
    id: 'kpi-nps',
    name: 'Net Promoter Score (NPS)',
    category: 'Satisfaction Client',
    current_value: 78,
    target_value: 85,
    trend: 'up',
    period: '30 derniers jours',
    icon: 'ri-emotion-happy-line',
    description: 'Score NPS mesuré auprès de 142 clients actifs. 78% de promoteurs, 12% de passifs, 10% de détracteurs.',
  },
  {
    id: 'kpi-csat',
    name: 'Satisfaction Client (CSAT)',
    category: 'Satisfaction Client',
    current_value: 94,
    target_value: 96,
    trend: 'up',
    period: '30 derniers jours',
    icon: 'ri-star-line',
    description: 'Score de satisfaction moyen sur l\'ensemble des missions livrées. Mesure post-mission systématique.',
  },
  {
    id: 'kpi-ontime',
    name: 'Respect des Délais',
    category: 'Qualité Opérationnelle',
    current_value: 97.5,
    target_value: 99,
    trend: 'stable',
    period: '6 derniers mois',
    icon: 'ri-timer-line',
    description: 'Pourcentage de livrables remis dans les délais contractuels. 39/40 missions livrées à temps ce semestre.',
  },
  {
    id: 'kpi-quality',
    name: 'Score Qualité Livrables',
    category: 'Qualité Opérationnelle',
    current_value: 9.2,
    target_value: 9.5,
    trend: 'up',
    period: '30 derniers jours',
    icon: 'ri-shield-check-line',
    description: 'Score qualité moyen sur 10 selon le Quality Assurance Authority™. 12 contrôles Big Four appliqués par livrable.',
  },
  {
    id: 'kpi-retention',
    name: 'Taux de Rétention Client',
    category: 'Fidélisation',
    current_value: 92,
    target_value: 95,
    trend: 'up',
    period: '12 derniers mois',
    icon: 'ri-user-heart-line',
    description: 'Pourcentage de clients ayant renouvelé au moins une mission dans les 12 mois. 56/61 clients actifs.',
  },
  {
    id: 'kpi-referral',
    name: 'Taux de Recommandation',
    category: 'Fidélisation',
    current_value: 68,
    target_value: 75,
    trend: 'up',
    period: '12 derniers mois',
    icon: 'ri-share-forward-line',
    description: 'Pourcentage de nouveaux clients issus de la recommandation d\'un client existant. 41 nouveaux clients / 60.',
  },
  {
    id: 'kpi-regulatory',
    name: 'Conformité Réglementaire',
    category: 'Conformité',
    current_value: 100,
    target_value: 100,
    trend: 'stable',
    period: 'Temps réel',
    icon: 'ri-auction-line',
    description: 'Taux de conformité aux référentiels BCEAO, COBAC, OHADA, GAFI, BEPS. 15 référentiels monitorés en continu.',
  },
  {
    id: 'kpi-certification',
    name: 'Certifications Actives',
    category: 'Conformité',
    current_value: 5,
    target_value: 8,
    trend: 'up',
    period: 'Cumul',
    icon: 'ri-verified-badge-line',
    description: 'Nombre de certifications internationales actives. 5 obtenues, 3 en cours (ISO 27001, ISO 42001, ISO 22301).',
  },
  {
    id: 'kpi-missions',
    name: 'Missions Complétées',
    category: 'Volume',
    current_value: 847,
    target_value: 1000,
    trend: 'up',
    period: 'Depuis la création',
    icon: 'ri-briefcase-line',
    description: 'Nombre total de missions réalisées depuis la création de KHEPRA EXPERTS. 22 ans d\'expertise terrain.',
  },
  {
    id: 'kpi-countries',
    name: 'Pays Couverts',
    category: 'Volume',
    current_value: 22,
    target_value: 30,
    trend: 'up',
    period: 'Cumul',
    icon: 'ri-global-line',
    description: 'Nombre de pays africains où KHEPRA EXPERTS a réalisé des missions. Présence UEMOA, CEMAC, OHADA.',
  },
];

export const trustMethodologies: TrustMethodology[] = [
  {
    id: 'meth-pre-inspection',
    title: 'Pré-Inspection BCEAO/COBAC',
    subtitle: '215 points de contrôle — 8 axes — Score 47→95/100',
    category: 'Régulation',
    standards: ['BCEAO Circulaire 01-2017', 'COBAC R-2016/04', 'Bâle II/III', 'COSO 2013', 'ISO 31000'],
    deliverables_count: 5,
    sections_count: 8,
    maturity_levels: 4,
    icon: 'ri-bank-line',
  },
  {
    id: 'meth-lcb-ft',
    title: 'LBC/FT — 8 Piliers GAFI',
    subtitle: 'KYC · CDD/EDD · Déclaration de soupçon · Sanctions',
    category: 'Régulation',
    standards: ['GAFI 40 Recommandations', 'Directive UEMOA 02/2015', 'COBAC R-2018/01', 'GIABA', 'GABAC'],
    deliverables_count: 5,
    sections_count: 8,
    maturity_levels: 4,
    icon: 'ri-fingerprint-line',
  },
  {
    id: 'meth-erm',
    title: 'ERM — COSO ERM & ISO 31000',
    subtitle: 'Cartographie des risques · Appétence · Plans de traitement',
    category: 'Gouvernance',
    standards: ['COSO ERM 2017', 'ISO 31000:2018', 'COBAC R-2016/01', 'IFC PS', 'Bâle II Pilier 2'],
    deliverables_count: 4,
    sections_count: 5,
    maturity_levels: 4,
    icon: 'ri-shield-check-line',
  },
  {
    id: 'meth-prix-transfert',
    title: 'Prix de Transfert — BEPS Action 13',
    subtitle: 'Analyse FAR · Benchmarking · Master File & Local File',
    category: 'Fiscalité',
    standards: ['OCDE BEPS Action 13', 'Principes OCDE 2022', 'Directive UEMOA 01/2011', 'Règlement CEMAC 01/18', 'OCDE 2017'],
    deliverables_count: 4,
    sections_count: 7,
    maturity_levels: 4,
    icon: 'ri-exchange-funds-line',
  },
  {
    id: 'meth-business-plan',
    title: 'Business Plan Investment Ready',
    subtitle: '17 chapitres · SYSCOHADA · DSCR 2,41x · BIDC/BAD/IFC',
    category: 'Finance',
    standards: ['SYSCOHADA Révisé 2017', 'Standards BIDC/BAD/IFC', 'OHADA AUSCGIE', 'IFRS (option)', 'Big Four'],
    deliverables_count: 4,
    sections_count: 17,
    maturity_levels: 4,
    icon: 'ri-file-chart-line',
  },
  {
    id: 'meth-due-diligence',
    title: 'Due Diligence — Acquisition & Investissement',
    subtitle: 'Financière · Juridique · Fiscale · ESG · OHADA',
    category: 'Finance',
    standards: ['OHADA AUSCGIE', 'SYSCOHADA', 'IFC PS 1-8', 'BEPS Action 13', 'ISAE 3000'],
    deliverables_count: 4,
    sections_count: 5,
    maturity_levels: 4,
    icon: 'ri-search-eye-line',
  },
  {
    id: 'meth-esg',
    title: 'Audit ESG — IFC PS & Taxonomie Verte',
    subtitle: '14 NC · Score 62→91/100 · Double matérialité',
    category: 'Gouvernance',
    standards: ['IFC PS 1-8', 'GRI Standards 2021', 'ISSB IFRS S1/S2', 'Taxonomie Verte UEMOA', 'UN SDGs'],
    deliverables_count: 4,
    sections_count: 5,
    maturity_levels: 4,
    icon: 'ri-leaf-line',
  },
  {
    id: 'meth-strategic',
    title: 'Planification Stratégique — Vision 2035',
    subtitle: 'Analyse prospective · Scénarios · Feuille de route 10 ans',
    category: 'Stratégie',
    standards: ['McKinsey 7S', 'Balanced Scorecard', 'OKR Framework', 'ISO 9001', 'COSO Strategic'],
    deliverables_count: 4,
    sections_count: 6,
    maturity_levels: 4,
    icon: 'ri-compass-3-line',
  },
  {
    id: 'meth-gouvernance',
    title: 'Gouvernance d\'Entreprise',
    subtitle: 'Board Advisory · Comités · Conformité Actionnariat',
    category: 'Gouvernance',
    standards: ['OHADA AUSCGIE', 'ISO 37000', 'BCEAO Gouvernance', 'COBAC Circulaire', 'Bâle'],
    deliverables_count: 4,
    sections_count: 6,
    maturity_levels: 4,
    icon: 'ri-government-line',
  },
  {
    id: 'meth-plan-commercial',
    title: 'Plan Commercial & Marketing',
    subtitle: '40+ pages · Niveau Big Four · Pipeline commercial',
    category: 'Stratégie',
    standards: ['Big Four', 'McKinsey 7S', 'PESTEL Afrique', 'OKR', 'Pipeline B2B'],
    deliverables_count: 5,
    sections_count: 10,
    maturity_levels: 4,
    icon: 'ri-line-chart-line',
  },
];

export const trustKPIs = {
  total_certifications: 8,
  active_certifications: 4,
  in_progress_certifications: 3,
  planned_certifications: 1,
  total_references: 6,
  public_references: 1,
  total_methodologies: 10,
  total_quality_indicators: 10,
  avg_certification_score: 90.6,
  avg_nps: 78,
  avg_csat: 94,
  missions_completed: 847,
  countries_covered: 22,
  client_retention: 92,
  referral_rate: 68,
};





