export const transformationPrograms = [
  {
    id: 1,
    program_name: "KHEPRA Digital Enterprise Architecture — Migration Cloud-Native",
    phase: "Phase 3 — Déploiement",
    progress_pct: 72,
    budget_planned: 450000000,
    budget_actual: 398500000,
    timeline_start: "2026-01-15",
    timeline_end: "2026-11-30",
    milestones: [
      "Analyse existant — Terminé (J+45)",
      "Blueprint architecture — Terminé (J+90)",
      "Migration data hub — Terminé (J+150)",
      "Déploiement edge functions — En cours (J+180)",
      "Tests intégration — Planifié (J+240)",
      "Go-live — Planifié (J+300)"
    ],
    kpis: { "uptime_cible": "99.95%", "latence_cible": "<50ms", "coverage_tests": "87%", "apps_migrées": "14/22" },
    risks: ["Rétrocompatibilité API legacy", "Formation équipes sur nouveaux stacks", "Dépendance fournisseur cloud"],
    change_management_score: 82,
    status: "En cours",
    created_at: "2026-01-15T08:00:00Z",
    updated_at: "2026-06-10T14:00:00Z"
  },
  {
    id: 2,
    program_name: "Conformité ISSB & CSRD — Programme ESG 360",
    phase: "Phase 2 — Gap Analysis",
    progress_pct: 45,
    budget_planned: 280000000,
    budget_actual: 142500000,
    timeline_start: "2026-03-01",
    timeline_end: "2026-12-15",
    milestones: [
      "Diagnostic maturité ESG — Terminé (J+45)",
      "Gap analysis ISSB/CSRD — En cours (J+90)",
      "Politique ESG groupe — Planifié (J+150)",
      "Collecte data Scope 1-2-3 — Planifié (J+200)",
      "Rapport ISSB-ready — Planifié (J+270)"
    ],
    kpis: { "conformite_ISSB": "54%", "data_disponible": "68%", "gaps_identifies": "32", "formations_realisees": "8/15" },
    risks: ["Complexité Scope 3 supply chain", "Absence data carbone historique", "Résistance middle management", "Coût outils reporting ESG"],
    change_management_score: 65,
    status: "En cours",
    created_at: "2026-03-01T08:00:00Z",
    updated_at: "2026-06-12T10:00:00Z"
  },
  {
    id: 3,
    program_name: "Transformation Digitale Processus Internes — Automatisation KOS",
    phase: "Phase 4 — Optimisation",
    progress_pct: 88,
    budget_planned: 195000000,
    budget_actual: 178200000,
    timeline_start: "2025-09-01",
    timeline_end: "2026-07-31",
    milestones: [
      "Audit processus — Terminé (J+30)",
      "SOP Factory — Terminé (J+90)",
      "Automatisation RPA 12 processus — Terminé (J+180)",
      "Dashboard KPI — Terminé (J+210)",
      "Optimisation continue — En cours (J+270)"
    ],
    kpis: { "processus_automatisés": "12", "gain_temps": "340h/mois", "réduction_erreurs": "78%", "satisfaction_interne": "8.9/10" },
    risks: ["Maintenance correctrice post-automatisation", "Dépendance aux scripts RPA"],
    change_management_score: 91,
    status: "En cours",
    created_at: "2025-09-01T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 4,
    program_name: "Refonte Modèle Opérationnel — Organisation par BU",
    phase: "Phase 1 — Conception",
    progress_pct: 35,
    budget_planned: 320000000,
    budget_actual: 98500000,
    timeline_start: "2026-04-15",
    timeline_end: "2027-02-28",
    milestones: [
      "Diagnostic organisationnel — Terminé (J+40)",
      "Design 4 BU — En cours (J+80)",
      "Recrutement BU Leaders — Planifié (J+120)",
      "Système KPI par BU — Planifié (J+180)",
      "Go-live nouvelle organisation — Planifié (J+300)"
    ],
    kpis: { "BU_conçues": "4", "postes_créés": "7", "résistance_estimée": "35%", "ROI_attendu": "2.3x/an" },
    risks: ["Résistance culturelle au changement", "Pénurie talents leadership en Afrique", "Délai recrutement > prévu"],
    change_management_score: 48,
    status: "En cours",
    created_at: "2026-04-15T08:00:00Z",
    updated_at: "2026-06-11T16:00:00Z"
  },
  {
    id: 5,
    program_name: "Innovation Lab 2026 — 5 POC IA & Blockchain pour la finance africaine",
    phase: "Phase 2 — Prototypage",
    progress_pct: 55,
    budget_planned: 150000000,
    budget_actual: 87250000,
    timeline_start: "2026-02-01",
    timeline_end: "2026-10-31",
    milestones: [
      "Sélection 5 POC — Terminé (J+30)",
      "Design concept — Terminé (J+75)",
      "Développement prototypes — En cours (J+150)",
      "Test utilisateurs — Planifié (J+210)",
      "Décision industrialisation — Planifié (J+270)"
    ],
    kpis: { "POC_actifs": "5", "TRL_moyen": "6.2", "partenaires": "3", "brevets_déposés": "1" },
    risks: ["Viabilité commerciale non prouvée", "Rareté compétences blockchain en Afrique", "Évolution rapide réglementation crypto"],
    change_management_score: 72,
    status: "En cours",
    created_at: "2026-02-01T08:00:00Z",
    updated_at: "2026-06-08T12:00:00Z"
  },
  {
    id: 6,
    program_name: "KHEPRA Quality Excellence — Certification ISO 9001:2026",
    phase: "Phase 5 — Audit Final",
    progress_pct: 92,
    budget_planned: 95000000,
    budget_actual: 91200000,
    timeline_start: "2025-11-01",
    timeline_end: "2026-08-15",
    milestones: [
      "Gap analysis ISO 9001 — Terminé (J+45)",
      "Documentation SMQ — Terminé (J+120)",
      "Formation auditeurs internes — Terminé (J+150)",
      "Audit interne — Terminé (J+180)",
      "Actions correctives — En cours (J+210)",
      "Audit certification — Planifié (J+270)"
    ],
    kpis: { "conformité_SMQ": "94%", "NC_audit_interne": "3", "actions_correctives": "2/3", "probabilité_certif": "96%" },
    risks: ["Non-conformité majeure résiduelle"],
    change_management_score: 88,
    status: "En cours",
    created_at: "2025-11-01T08:00:00Z",
    updated_at: "2026-06-12T09:00:00Z"
  }
];

export const esgAssessments = [
  {
    id: 1,
    company_name: "Groupe SEMAFO Mining",
    sector: "Industrie Extractive",
    country: "Burkina Faso",
    environmental_score: 48,
    social_score: 62,
    governance_score: 71,
    overall_esg_score: 61,
    framework: "ISSB IFRS S1/S2 + GRI Standards + IFC PS",
    gaps: [
      "Absence de politique biodiversité formalisée",
      "Scope 3 supply chain non cartographié",
      "Pas de rapport TCFD / risques climatiques",
      "Données consommation eau non centralisées",
      "Dialogue parties prenantes non structuré"
    ],
    recommendations: [
      "Déployer politique biodiversité alignée IFC PS6",
      "Cartographier Scope 3 sur fournisseurs rang 1-2",
      "Publier premier rapport TCFD d'ici 2027",
      "Implémenter SIG environnemental centralisé",
      "Structurer dialogue parties prenantes trimestriel"
    ],
    roadmap: [
      "T0-T3 : Politiques ESG + Gouvernance",
      "T3-T6 : Collecte données Scope 1-2",
      "T6-T12 : Scope 3 + Rapport ISSB-ready",
      "T12-T18 : Certification ISO 14001",
      "T18-T24 : Net Zero Roadmap 2040"
    ],
    sdg_alignment: ["SDG 6", "SDG 7", "SDG 12", "SDG 13", "SDG 15"],
    summary: "Groupe minier avec maturité ESG modérée. Fort sur le pilier gouvernance (71/100) grâce à un CA structuré, mais faible sur l'environnemental (48/100). La conformité ISSB nécessite un effort majeur sur le Scope 3 et la biodiversité. Plan de transition bas-carbone estimé à 18-24 mois.",
    created_at: "2026-05-01T08:00:00Z",
    updated_at: "2026-06-10T15:00:00Z"
  },
  {
    id: 2,
    company_name: "Banque Atlantique UEMOA",
    sector: "Banque Commerciale",
    country: "Côte d'Ivoire",
    environmental_score: 45,
    social_score: 75,
    governance_score: 82,
    overall_esg_score: 68,
    framework: "ISSB + GRI + Principes Équateur",
    gaps: [
      "Portefeuille crédit non aligné taxonomie verte",
      "Absence stress test climatique sur portefeuille",
      "Reporting ESG non audité par tiers indépendant",
      "Politique inclusion financière non quantifiée"
    ],
    recommendations: [
      "Aligner 30% du portefeuille crédit sur taxonomie verte UEMOA d'ici 2028",
      "Implémenter stress test climatique annuel (NGFS scenarios)",
      "Obtenir assurance limitée sur rapport ESG",
      "Définir cibles chiffrées inclusion financière"
    ],
    roadmap: [
      "T0-T6 : Taxonomie verte + Stress test pilote",
      "T6-T12 : Politique inclusion + Assurance ESG",
      "T12-T18 : Produits verts (green bonds, green loans)",
      "T18-T24 : Certification B Corp ou équivalent"
    ],
    sdg_alignment: ["SDG 1", "SDG 5", "SDG 8", "SDG 9", "SDG 13"],
    summary: "Banque leader UEMOA avec gouvernance ESG solide (82/100). Le pilier social est bien noté (75/100) grâce à des programmes inclusion financière historique. Le défi principal est l'alignement du portefeuille crédit sur la taxonomie verte et l'intégration des risques climatiques dans le dispositif prudentiel.",
    created_at: "2026-05-15T08:00:00Z",
    updated_at: "2026-06-12T11:00:00Z"
  },
  {
    id: 3,
    company_name: "Holding AgroPanaf Industries",
    sector: "Agro-Industrie",
    country: "Sénégal",
    environmental_score: 52,
    social_score: 68,
    governance_score: 55,
    overall_esg_score: 58,
    framework: "ISSB + GRI + RSPO",
    gaps: [
      "Gouvernance ESG inexistante (pas de comité)",
      "Traçabilité supply chain agricole partielle",
      "Absence politique droits humains fournisseurs",
      "Consommation eau non monitorée par site"
    ],
    recommendations: [
      "Créer comité ESG au niveau du Conseil",
      "Déployer blockchain traçabilité supply chain",
      "Adopter UN Guiding Principles on Business & Human Rights",
      "Installer compteurs eau intelligents sur 5 sites"
    ],
    roadmap: [
      "T0-T3 : Comité ESG + Charte RSE",
      "T3-T9 : Traçabilité + Droits humains",
      "T9-T15 : Certification RSPO / Rainforest Alliance",
      "T15-T24 : Net Zero Agriculture 2040"
    ],
    sdg_alignment: ["SDG 2", "SDG 6", "SDG 8", "SDG 12", "SDG 15"],
    summary: "Agro-industriel en début de parcours ESG. Le pilier gouvernance est le maillon faible (55/100) — absence de structure ESG formalisée. Bonne base sur l'environnemental grâce à des certifications sectorielles existantes. La traçabilité supply chain est l'enjeu prioritaire compte tenu de l'exposition réputationnelle.",
    created_at: "2026-04-20T08:00:00Z",
    updated_at: "2026-06-08T14:00:00Z"
  },
  {
    id: 4,
    company_name: "FinTechPay SA",
    sector: "FinTech",
    country: "Côte d'Ivoire",
    environmental_score: 35,
    social_score: 85,
    governance_score: 78,
    overall_esg_score: 66,
    framework: "ISSB + GRI + UN Global Compact",
    gaps: [
      "Empreinte carbone data centers non mesurée",
      "Absence politique diversité & inclusion formalisée",
      "Cybersécurité ESG non intégrée au reporting",
      "Pas de due diligence ESG fournisseurs IT"
    ],
    recommendations: [
      "Mesurer empreinte carbone data centers (cloud AWS/Azure)",
      "Publier index diversité & inclusion annuel",
      "Intégrer cybersécurité dans matérialité ESG",
      "Ajouter clause ESG dans contrats fournisseurs IT"
    ],
    roadmap: [
      "T0-T6 : Mesure carbone + Diversité",
      "T6-T12 : Cybersécurité ESG + Fournisseurs",
      "T12-T18 : Label FinTech Responsable",
      "T18-T24 : Neutralité carbone 2028"
    ],
    sdg_alignment: ["SDG 4", "SDG 5", "SDG 8", "SDG 9", "SDG 10"],
    summary: "FinTech à fort impact social (85/100) grâce à l'inclusion financière digitale de 2.5M utilisateurs non bancarisés. L'impact environnemental est faible par nature mais sous-documenté. La gouvernance ESG est en phase de structuration. Enjeu clé : formaliser la démarche ESG pour rassurer les investisseurs Series B.",
    created_at: "2026-06-01T08:00:00Z",
    updated_at: "2026-06-13T09:00:00Z"
  },
  {
    id: 5,
    company_name: "Cimenterie Sahélienne",
    sector: "Matériaux de Construction",
    country: "Mali",
    environmental_score: 38,
    social_score: 55,
    governance_score: 48,
    overall_esg_score: 47,
    framework: "ISSB + GRI + CSI Cement CO2 Protocol",
    gaps: [
      "Émissions CO2 non vérifiées par tiers",
      "Absence plan transition bas-carbone",
      "Santé-sécurité : taux fréquence > moyenne secteur",
      "Relation communautés riveraines conflictuelle",
      "Pas de rapport développement durable depuis 2023"
    ],
    recommendations: [
      "Faire vérifier émissions CO2 par auditeur accrédité",
      "Définir plan décarbonation avec jalons 2030/2040",
      "Programme sécurité : objectif zéro accident mortel",
      "Créer fonds développement communautaire (1% CA)",
      "Reprendre publication rapport DD annuel"
    ],
    roadmap: [
      "T0-T6 : Audit CO2 + Plan urgence sécurité",
      "T6-T12 : Fonds communautaire + Dialogue",
      "T12-T18 : Feuille route décarbonation 2030",
      "T18-T24 : Certification ISO 14001 + 45001"
    ],
    sdg_alignment: ["SDG 3", "SDG 7", "SDG 9", "SDG 11", "SDG 13"],
    summary: "Cimenterie avec maturité ESG faible (47/100) — tous les piliers sont sous la moyenne sectorielle. Urgence sur le volet sécurité et les relations communautaires. Le plan de décarbonation est inexistant alors que le secteur cimentier représente 7% des émissions CO2 mondiales. Risque réputationnel et réglementaire élevé à horizon 2028.",
    created_at: "2026-05-10T08:00:00Z",
    updated_at: "2026-06-11T16:00:00Z"
  },
  {
    id: 6,
    company_name: "Télécom Africa Group",
    sector: "Télécommunications",
    country: "Bénin",
    environmental_score: 55,
    social_score: 72,
    governance_score: 68,
    overall_esg_score: 65,
    framework: "ISSB + GRI + GSMA ESG Metrics",
    gaps: [
      "Énergie renouvelable : seulement 18% du mix",
      "Déchets électroniques non tracés",
      "Absence politique protection données personnelles ESG",
      "Accessibilité rurale non priorisée"
    ],
    recommendations: [
      "Porter mix énergétique à 40% renouvelable d'ici 2028",
      "Programme recyclage e-waste avec certification",
      "Intégrer privacy dans matérialité ESG",
      "Plan connectivité rurale 1000 villages d'ici 2030"
    ],
    roadmap: [
      "T0-T6 : Audit énergétique + Plan solaire",
      "T6-T12 : Programme e-waste + Privacy ESG",
      "T12-T18 : Connectivité rurale phase 1",
      "T18-T24 : Certification ISO 50001"
    ],
    sdg_alignment: ["SDG 4", "SDG 7", "SDG 9", "SDG 12", "SDG 13"],
    summary: "Opérateur télécom avec maturité ESG moyenne-haute. Points forts : programme inclusion numérique (72/100 social), gouvernance structurée (68/100). Principaux défis : transition énergétique des tours télécom (18% renouvelable) et gestion des déchets électroniques. Secteur sous pression réglementaire croissante sur l'ESG.",
    created_at: "2026-06-05T08:00:00Z",
    updated_at: "2026-06-13T10:00:00Z"
  }
];

export const innovationLabProjects = [
  {
    id: 1,
    innovation_name: "KOS Regulatory GPT — Assistant IA Conformité Bancaire UEMOA/CEMAC",
    category: "RegTech",
    technology: "LLM fine-tuné + RAG réglementaire + Knowledge Graph",
    readiness_level: 7,
    market_potential: "125-180 Mds FCFA (marché conformité réglementaire Afrique francophone)",
    implementation_time: "9-12 mois",
    impact_score: 95,
    feasibility_score: 85,
    description: "LLM spécialisé sur les 14 cadres réglementaires UEMOA/CEMAC. Capable de répondre à des questions complexes de conformité, générer des matrices de gap analysis automatiques, produire des projets de réponse aux régulateurs. Alimenté par la base documentaire KHEPRA (5200+ documents réglementaires).",
    use_case: "Un DAF demande 'Quels sont les nouveaux ratios de solvabilité applicables en 2027 ?' → KOS Regulatory GPT synthétise les 3 textes concernés, calcule l'impact sur la banque, propose un plan d'action.",
    prototype_status: "POC fonctionnel — 3 banques pilotes",
    tags: ["IA", "RegTech", "LLM", "Conformité", "UEMOA"],
    created_at: "2026-03-01T08:00:00Z",
    updated_at: "2026-06-12T14:00:00Z"
  },
  {
    id: 2,
    innovation_name: "Blockchain KYC/KYB — Registre Partagé Conformité Client",
    category: "Blockchain",
    technology: "Hyperledger Fabric + IPFS + Zero-Knowledge Proofs",
    readiness_level: 5,
    market_potential: "85-120 Mds FCFA (coût KYC redondant estimé à 250M FCFA/an/banque)",
    implementation_time: "12-18 mois",
    impact_score: 90,
    feasibility_score: 65,
    description: "Registre blockchain interbancaire pour mutualiser la due diligence KYC/KYB. Chaque banque vérifie un client une fois, les autres accèdent au registre avec preuve ZK (sans révéler les données sous-jacentes). Réduction de 70% du coût KYC et du délai onboarding client.",
    use_case: "Une FinTech ouvre un compte dans 5 banques UEMOA. La 1ère banque fait le KYC complet, les 4 autres valident via le registre blockchain en < 10 minutes au lieu de 15 jours.",
    prototype_status: "Proof-of-Concept — Consortium 3 banques",
    tags: ["Blockchain", "KYC", "RegTech", "Zero-Knowledge", "UEMOA"],
    created_at: "2026-02-15T08:00:00Z",
    updated_at: "2026-06-10T10:00:00Z"
  },
  {
    id: 3,
    innovation_name: "ESG Auto-Assessment Engine — Diagnostic Maturité ESG Instantané",
    category: "ESG Tech",
    technology: "Machine Learning + ISSB Framework + NLP analyse documentaire",
    readiness_level: 6,
    market_potential: "45-75 Mds FCFA (5000+ entreprises UEMOA soumises ISSB d'ici 2028)",
    implementation_time: "6-9 mois",
    impact_score: 88,
    feasibility_score: 90,
    description: "Plateforme SaaS de diagnostic ESG automatisé. L'entreprise upload ses documents (rapports, politiques, états financiers) et l'Engine analyse automatiquement la maturité ESG sur 50 critères ISSB/GRI. Génère un rapport gap analysis et une feuille de route personnalisée en < 48h.",
    use_case: "PME cotée BRVM : obligation reporting ISSB d'ici 2027. Upload documents → Diagnostic automatique → Score 62/100 → Plan d'action priorisé avec 28 recommandations chiffrées.",
    prototype_status: "MVP fonctionnel — Testé sur 15 entreprises",
    tags: ["ESG", "ISSB", "Machine Learning", "SaaS", "Reporting"],
    created_at: "2026-04-01T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 4,
    innovation_name: "Digital Twin Risques — Jumeau Numérique du Dispositif de Contrôle Interne",
    category: "Risk Tech",
    technology: "Graph Neural Networks + Monte Carlo Simulation + Real-time Data",
    readiness_level: 4,
    market_potential: "65-95 Mds FCFA (banques UEMOA/CEMAC + assurances)",
    implementation_time: "15-20 mois",
    impact_score: 92,
    feasibility_score: 55,
    description: "Jumeau numérique modélisant le dispositif de contrôle interne d'une banque. Simule l'impact de défaillances de contrôles, teste des scénarios de stress, prédit les zones de risque émergentes. Visualisation 3D interactive du système de contrôle.",
    use_case: "Banque simule la défaillance de 3 contrôles clés → Digital Twin montre l'effet cascade sur 12 processus → Identifie les contrôles compensatoires à renforcer en priorité.",
    prototype_status: "Prototype early-stage — 1 banque pilote",
    tags: ["Digital Twin", "Risques", "Contrôle Interne", "Graph ML", "Simulation"],
    created_at: "2026-05-01T08:00:00Z",
    updated_at: "2026-06-09T15:00:00Z"
  },
  {
    id: 5,
    innovation_name: "Smart Tender Intelligence — IA Appels d'Offres Secteur Public",
    category: "GovTech",
    technology: "NLP + Semantic Search + Automated Proposal Generation",
    readiness_level: 7,
    market_potential: "35-55 Mds FCFA (marché appels d'offres publics Afrique francophone)",
    implementation_time: "6-8 mois",
    impact_score: 85,
    feasibility_score: 88,
    description: "Plateforme IA qui scanne en continu 150+ sources d'appels d'offres publics, évalue automatiquement l'adéquation avec les capacités KHEPRA, génère une première ébauche de proposition technique et financière. Réduction de 60% du temps de réponse aux AO.",
    use_case: "AO BCEAO publié → Smart Tender analyse le cahier des charges → Score d'adéquation 92% → Génère proposition technique 40 pages en 4h → Équipe senior finalise en 2 jours.",
    prototype_status: "POC fonctionnel — 8 appels d'offres traités",
    tags: ["GovTech", "IA", "Appels d'Offres", "NLP", "Automatisation"],
    created_at: "2026-04-15T08:00:00Z",
    updated_at: "2026-06-11T12:00:00Z"
  },
  {
    id: 6,
    innovation_name: "Prix de Transfert Automatisé — Benchmarking IA & Documentation BEPS",
    category: "Tax Tech",
    technology: "Machine Learning + Bases de données comparables + Génération documentaire",
    readiness_level: 6,
    market_potential: "55-85 Mds FCFA (marché prix de transfert UEMOA/CEMAC)",
    implementation_time: "8-12 mois",
    impact_score: 90,
    feasibility_score: 80,
    description: "Automatisation complète de la documentation prix de transfert BEPS Action 13. L'IA identifie les transactions intra-groupe, sélectionne les comparables pertinents dans des bases de données globales, exécute l'analyse fonctionnelle et génère le Master File + Local File en 72h.",
    use_case: "Multinationale avec 8 filiales UEMOA → PT Automatisé scanne ERP → Identifie 47 transactions contrôlées → Sélectionne 18 comparables → Génère documentation BEPS complète pour 8 juridictions.",
    prototype_status: "MVP phase 2 — 5 analyses pilotes réalisées",
    tags: ["Tax Tech", "Prix de Transfert", "BEPS", "IA", "Automatisation"],
    created_at: "2026-03-15T08:00:00Z",
    updated_at: "2026-06-12T16:00:00Z"
  }
];

export const enterpriseArchitectureReviews = [
  {
    id: 1,
    system_name: "KOS Enterprise Data Hub",
    component_type: "Data Platform",
    architecture_score: 8.5,
    integration_status: "Intégré",
    security_status: "Sécurisé",
    scalability_status: "Scalable",
    issues_found: "Latence sur requêtes multi-juridictions (>800ms). Cache layer à renforcer.",
    recommendations: "Implémenter Redis cache distribué. Optimiser indexation full-text multi-langue. Sharding géographique par zone UEMOA/CEMAC.",
    last_reviewed: "2026-06-10T14:00:00Z",
    created_at: "2026-01-10T08:00:00Z"
  },
  {
    id: 2,
    system_name: "KOS Multi-Agent Orchestrator",
    component_type: "Orchestration",
    architecture_score: 7.8,
    integration_status: "Intégré",
    security_status: "Partiellement sécurisé",
    scalability_status: "Scalable",
    issues_found: "Pas de circuit breaker entre agents. Mémoire partagée non isolée. Timeout global unique → risque bottleneck.",
    recommendations: "Ajouter circuit breaker par agent (5s timeout). Isoler contextes d'exécution. Implémenter file d'attente priorisée. Monitoring latence par agent.",
    last_reviewed: "2026-06-08T10:00:00Z",
    created_at: "2026-02-20T08:00:00Z"
  },
  {
    id: 3,
    system_name: "KOS Knowledge Graph Engine",
    component_type: "Knowledge Management",
    architecture_score: 9.0,
    integration_status: "Intégré",
    security_status: "Sécurisé",
    scalability_status: "Scalable",
    issues_found: "Temps de reconstruction du graphe (4h) trop long pour mises à jour fréquentes. Pas d'API streaming.",
    recommendations: "Implémenter mise à jour incrémentale du graphe. Ajouter API GraphQL streaming pour requêtes complexes. Cache sémantique pour requêtes fréquentes.",
    last_reviewed: "2026-06-05T09:00:00Z",
    created_at: "2026-03-01T08:00:00Z"
  },
  {
    id: 4,
    system_name: "KOS Edge Functions Gateway",
    component_type: "API Gateway",
    architecture_score: 8.2,
    integration_status: "Intégré",
    security_status: "Sécurisé",
    scalability_status: "Partiellement scalable",
    issues_found: "Cold start sur edge functions peu utilisées (2-4s). Pas de rate limiting par tenant. Logs distribués non consolidés.",
    recommendations: "Warm-up automatique pour fonctions critiques. Rate limiting par organisation. Centraliser logs avec structured logging format.",
    last_reviewed: "2026-06-12T11:00:00Z",
    created_at: "2026-02-01T08:00:00Z"
  },
  {
    id: 5,
    system_name: "KOS Security Framework",
    component_type: "Security",
    architecture_score: 8.8,
    integration_status: "Intégré",
    security_status: "Sécurisé",
    scalability_status: "Scalable",
    issues_found: "Rotation certificats non automatisée. WAF rules statiques — pas d'adaptative threat detection.",
    recommendations: "Automatiser rotation certificats (Let's Encrypt + ACME). Implémenter WAF adaptatif avec ML threat scoring. Ajouter honeypot endpoints.",
    last_reviewed: "2026-06-11T08:00:00Z",
    created_at: "2026-01-15T08:00:00Z"
  },
  {
    id: 6,
    system_name: "KOS Frontend Micro-Architecture",
    component_type: "Frontend",
    architecture_score: 7.5,
    integration_status: "Partiellement intégré",
    security_status: "Sécurisé",
    scalability_status: "Scalable",
    issues_found: "Pas de module federation. Bundle size élevé (>800KB par page). Pas de lazy loading systématique sur composants lourds.",
    recommendations: "Implémenter Module Federation pour chargement indépendant des hubs. Code splitting automatique au niveau route. Bundle analyzer en CI/CD.",
    last_reviewed: "2026-06-07T14:00:00Z",
    created_at: "2026-04-01T08:00:00Z"
  }
];

export const publicSectorProjects = [
  {
    id: 1,
    institution_name: "Ministère de l'Économie et des Finances — Sénégal",
    country: "Sénégal",
    domain: "Modernisation Administration Fiscale",
    current_maturity: "Niveau 2 — Procédures standardisées",
    target_maturity: "Niveau 4 — Digital intégré",
    modernization_plan: "Déploiement e-fiscalité 360 : télédéclaration, télépaiement, data analytics fraude. Intégration avec cadastre et registre commerce. Formation 1200 agents sur 24 mois. Budget : 8.5 Mds FCFA.",
    digital_score: 5.2,
    governance_score: 6.8,
    status: "En cours — Phase 2",
    created_at: "2026-02-01T08:00:00Z",
    updated_at: "2026-06-10T16:00:00Z"
  },
  {
    id: 2,
    institution_name: "Commission Bancaire UEMOA — Secrétariat Général",
    country: "UEMOA (multi-pays)",
    domain: "Suptech — Supervision Bancaire Digitale",
    current_maturity: "Niveau 3 — Digitalisation partielle",
    target_maturity: "Niveau 5 — Supervision augmentée IA",
    modernization_plan: "Plateforme Suptech intégrée : collecte automatisée reportings prudentiels, machine learning détection anomalies, dashboard macro-prudentiel temps réel. Interopérabilité avec 8 banques centrales. Budget : 12 Mds FCFA.",
    digital_score: 6.5,
    governance_score: 8.2,
    status: "En cours — Phase 1",
    created_at: "2026-03-15T08:00:00Z",
    updated_at: "2026-06-12T10:00:00Z"
  },
  {
    id: 3,
    institution_name: "Ministère de la Santé Publique — Côte d'Ivoire",
    country: "Côte d'Ivoire",
    domain: "Digitalisation Système de Santé",
    current_maturity: "Niveau 2 — Procédures standardisées",
    target_maturity: "Niveau 4 — Digital intégré",
    modernization_plan: "Dossier patient digital national, télémédecine 200 centres de santé primaires, supply chain médicaments blockchain, data warehouse santé publique. Budget : 45 Mds FCFA sur 5 ans.",
    digital_score: 4.8,
    governance_score: 5.5,
    status: "Planifié",
    created_at: "2026-05-01T08:00:00Z",
    updated_at: "2026-06-08T14:00:00Z"
  },
  {
    id: 4,
    institution_name: "Agence Nationale Identification — Bénin",
    country: "Bénin",
    domain: "Identité Digitale Nationale",
    current_maturity: "Niveau 3 — Digitalisation partielle",
    target_maturity: "Niveau 5 — Identité souveraine auto-souveraine",
    modernization_plan: "Plateforme identité numérique nationale basée sur normes OIDC/SSI. Biométrie multimodale, interopérabilité e-services publiques, wallet citoyen mobile. Budget : 18 Mds FCFA.",
    digital_score: 6.2,
    governance_score: 7.0,
    status: "En cours — Phase 2",
    created_at: "2026-04-01T08:00:00Z",
    updated_at: "2026-06-11T09:00:00Z"
  },
  {
    id: 5,
    institution_name: "Direction Générale Impôts — Burkina Faso",
    country: "Burkina Faso",
    domain: "Transformation Digitale Administration Fiscale",
    current_maturity: "Niveau 1 — Processus manuels",
    target_maturity: "Niveau 3 — Digitalisation partielle",
    modernization_plan: "Informatisation guichets uniques, télédéclaration TVA/IS, datamart contribuables, interconnexion avec banques et cadastre. Budget : 6.2 Mds FCFA.",
    digital_score: 3.5,
    governance_score: 4.8,
    status: "En cours — Phase 1",
    created_at: "2026-06-01T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 6,
    institution_name: "Observatoire National Éducation — Togo",
    country: "Togo",
    domain: "Système Information Éducation",
    current_maturity: "Niveau 2 — Procédures standardisées",
    target_maturity: "Niveau 4 — Digital intégré",
    modernization_plan: "SIGE 3.0 : suivi individuel 2.5M élèves, gestion RH 85000 enseignants, analytics performance scolaire, dashboard ministériel. Budget : 14.5 Mds FCFA sur 4 ans.",
    digital_score: 4.5,
    governance_score: 5.2,
    status: "Planifié — Recherche financement",
    created_at: "2026-05-20T08:00:00Z",
    updated_at: "2026-06-12T15:00:00Z"
  }
];

export const fintechAdvisory = [
  {
    id: 1,
    client_type: "Établissement de Paiement",
    service_type: "Agrément BCEAO",
    title: "Dossier Agrément Émetteur Monnaie Électronique — WavePay Côte d'Ivoire",
    diagnosis: "Start-up fintech pré-revenu avec solution mobile money innovante. Actionnariat dilué (8 associés), capital 150M FCFA. Conformité LBC/FT partielle. Business plan non formalisé selon canevas BCEAO.",
    benchmark: "Comparaison avec 8 dossiers agréés BCEAO (2023-2026). Taux succès premier dépôt : 35%. Délai moyen instruction : 8 mois. Points bloquants fréquents : capital insuffisant, LBC/FT faible, gouvernance légère.",
    transformation_strategy: "Phase 1 : Structuration actionnariale (concentration 3 associés majoritaires). Phase 2 : Renforcement capital à 750M FCFA. Phase 3 : Conformité LBC/FT full (procédures, formation, système monitoring). Phase 4 : Business plan canevas BCEAO. Phase 5 : Dossier dépôt + accompagnement instruction.",
    market_focus: "Côte d'Ivoire + Expansion UEMOA 2027",
    status: "En cours — Business plan",
    created_at: "2026-05-01T08:00:00Z",
    updated_at: "2026-06-12T14:00:00Z"
  },
  {
    id: 2,
    client_type: "FinTech B2B",
    service_type: "Levée de Fonds Series A",
    title: "Préparation Investment Readiness — AgriTech Analytics Sénégal",
    diagnosis: "Plateforme data analytics agricole avec 15000 agriculteurs connectés. MRR 8.5M FCFA, croissance 22% mois. Valorisation pré-money estimée 1.2 Md FCFA. Gouvernance légère (pas de CA formel). États financiers non audités. Pas de data room investisseur.",
    benchmark: "Comparaison 12 levées Series A FinTech Afrique de l'Ouest 2024-2026. Ticket moyen : 850M FCFA. Valorisation médiane : 8x ARR. Dilution médiane : 22%. Due diligence moyenne : 14 semaines.",
    transformation_strategy: "Phase 1 : Audit financier + formalisation gouvernance (CA 5 membres). Phase 2 : Data room investisseur (VDR). Phase 3 : Business plan 5 ans + financial model. Phase 4 : Pitch deck + executive summary. Phase 5 : Roadshow investisseurs ciblés (12 fonds).",
    market_focus: "Sénégal + scaling CEDEAO",
    status: "En cours — Audit financier",
    created_at: "2026-06-01T08:00:00Z",
    updated_at: "2026-06-13T10:00:00Z"
  },
  {
    id: 3,
    client_type: "Banque Digitale",
    service_type: "Transformation Core Banking",
    title: "Migration Core Banking System — Banque Postale Digitale Bénin",
    diagnosis: "Core banking legacy (Sopra Banking Amplitude v9) en fin de vie. 380000 clients, 42 agences. 12 modules satellites non intégrés. TCO actuel : 280M FCFA/an. Incident critique/trimestre. Time-to-market nouveaux produits : 8 mois.",
    benchmark: "Benchmarking de 5 core banking nouvelle génération : Temenos T24, Oradian, Mambu, Skaleet, Sopra Next. Critères : coût, time-to-market, conformité UEMOA, scalabilité, API-first.",
    transformation_strategy: "Phase 1 : Étude comparative + choix solution. Phase 2 : Migration data pilote 2 agences. Phase 3 : Déploiement progressif 42 agences (big bang refusé). Phase 4 : Formation 320 utilisateurs. Phase 5 : Décommissionnement legacy + optimisation. Durée : 18 mois.",
    market_focus: "Bénin — Modernisation pour inclusion financière rurale",
    status: "Étude comparative",
    created_at: "2026-06-05T08:00:00Z",
    updated_at: "2026-06-12T16:00:00Z"
  },
  {
    id: 4,
    client_type: "InsurTech",
    service_type: "Conformité Réglementaire",
    title: "Mise en Conformité CIMA — AssurTech Inclusive Mali",
    diagnosis: "Start-up InsurTech proposant micro-assurance mobile (125000 clients). Non agréée CIMA. Partenariat avec assureur traditionnel non conforme (risque de nullité contrats). Protection données clients insuffisante. KYC partiel.",
    benchmark: "Comparaison réglementaire CIMA/CobA/BCEAO sur distribution digitale assurance. 3 cas de sanctions CIMA pour distribution non agréée (2024-2025). Montant sanctions : 50-200M FCFA.",
    transformation_strategy: "Phase 1 : Régularisation urgence — mise en conformité partenariat. Phase 2 : Dossier agrément CIMA courtage. Phase 3 : Conformité protection données + KYC. Phase 4 : Structuration gouvernance. Phase 5 : Veille réglementaire continue.",
    market_focus: "Mali + expansion UEMOA après agrément",
    status: "En cours — Régularisation",
    created_at: "2026-06-10T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 5,
    client_type: "Exchange Crypto",
    service_type: "Stratégie Réglementaire",
    title: "Cadre Réglementaire Crypto-Assets — AfriChain Exchange Togo",
    diagnosis: "Exchange crypto P2P avec 85000 utilisateurs Afrique francophone. Non régulé — absence cadre légal crypto au Togo. Exposition LBC/FT élevée (risque GAFI). Banques refusent l'onboarding. Croissance freinée par insécurité juridique.",
    benchmark: "Analyse 6 cadres réglementaires crypto (Maurice, Nigeria, Afrique du Sud, Kenya, Rwanda, UE MiCA). Meilleures pratiques : licence VASP, sandbox réglementaire, règles voyage FATF.",
    transformation_strategy: "Phase 1 : Diagnostic conformité GAFI/FATF travel rule. Phase 2 : Dossier plaidoyer régulateur (étude impact économique). Phase 3 : Programme conformité volontaire (KYC/KYB, blockchain analytics, gel avoirs). Phase 4 : Recherche juridiction accueillante (Maurice ?). Phase 5 : Préparation licence VASP.",
    market_focus: "Afrique francophone — En attente cadre OHADA crypto",
    status: "En cours — Diagnostic GAFI",
    created_at: "2026-06-08T08:00:00Z",
    updated_at: "2026-06-13T09:00:00Z"
  },
  {
    id: 6,
    client_type: "Crowdfunding",
    service_type: "Structuration Plateforme",
    title: "Structuration Plateforme Crowdfunding Immobilier — ImmoCollect UEMOA",
    diagnosis: "Plateforme crowdfunding immobilier pré-lancement au Sénégal. Modèle : equity crowdfunding projets hôteliers/logements. Statut juridique : SA classique (pas agrément financier). Protection investisseurs insuffisante. Risque qualification 'appel public à l'épargne'.",
    benchmark: "Benchmarking 4 régimes crowdfunding UE (ECSP), France (PSFP), Maroc (CCP), Kenya (CMA Sandbox) + Analyse juridique UEMOA applicable.",
    transformation_strategy: "Phase 1 : Structuration juridique (création SASU + fonds dédié). Phase 2 : Dossier demande agrément AMF-UMOA. Phase 3 : Protection investisseurs (due diligence projets, séquestre, information). Phase 4 : Plateforme tech KYC/KYB/LBC/FT. Phase 5 : Lancement pilote 3 projets.",
    market_focus: "Sénégal → UEMOA après agrément",
    status: "En cours — Structuration juridique",
    created_at: "2026-06-12T08:00:00Z",
    updated_at: "2026-06-13T11:00:00Z"
  }
];

export const smeTransformations = [
  {
    id: 1,
    company_name: "Société Industrielle de Transformation Alimentaire (SITA)",
    sector: "Agro-Industrie",
    employees_count: 85,
    governance_score: 4.2,
    digital_maturity_score: 3.8,
    performance_score: 5.5,
    recommendations: "Créer un conseil d'administration avec 2 administrateurs externes. Déployer ERP sectoriel pour gestion production/stocks/traçabilité ISO 22000. Mettre en place tableau de bord financier mensuel. Former middle management au pilotage par indicateurs.",
    engagement_status: "En cours — Phase diagnostic",
    created_at: "2026-05-15T08:00:00Z",
    updated_at: "2026-06-10T14:00:00Z"
  },
  {
    id: 2,
    company_name: "BTP Koné Construction",
    sector: "BTP",
    employees_count: 210,
    governance_score: 5.5,
    digital_maturity_score: 5.2,
    performance_score: 6.8,
    recommendations: "Professionnaliser la fonction finance (recrutement DAF). Structurer le contrôle de gestion chantiers. Implémenter BIM pour grands projets. Certification ISO 9001 pour accéder aux marchés publics internationaux. Plan de succession dirigeant.",
    engagement_status: "En cours — Recrutement DAF",
    created_at: "2026-06-01T08:00:00Z",
    updated_at: "2026-06-12T10:00:00Z"
  },
  {
    id: 3,
    company_name: "Pharma Distribution CEDEAO",
    sector: "Santé / Pharmaceutique",
    employees_count: 145,
    governance_score: 6.8,
    digital_maturity_score: 4.5,
    performance_score: 7.2,
    recommendations: "Déploiement ERP pharmacie avec gestion lots/péremption/traçabilité. Automatisation supply chain (demand forecasting). Certification GDP (Good Distribution Practices). Digitalisation relation pharmacies clientes (portail B2B). Gouvernance : formaliser comité stratégique trimestriel.",
    engagement_status: "En cours — Déploiement ERP",
    created_at: "2026-04-20T08:00:00Z",
    updated_at: "2026-06-11T16:00:00Z"
  },
  {
    id: 4,
    company_name: "TechHub Africa — Services IT",
    sector: "Technologies",
    employees_count: 48,
    governance_score: 3.5,
    digital_maturity_score: 8.5,
    performance_score: 6.0,
    recommendations: "Structurer gouvernance pour passage scale-up : création CA, définition vision 5 ans. Mettre en place comptabilité analytique par projet/BU. Définir stratégie commerciale formalisée (actuellement 100% réseau). Préparer levée de fonds Series A (valorisation, data room, BP).",
    engagement_status: "En cours — Structuration gouvernance",
    created_at: "2026-06-05T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 5,
    company_name: "Transport & Logistique Atlantique (TLA)",
    sector: "Transport / Logistique",
    employees_count: 320,
    governance_score: 5.0,
    digital_maturity_score: 3.2,
    performance_score: 5.8,
    recommendations: "Modernisation flotte : GPS tracking, maintenance prédictive, optimisation tournées. Digitalisation processus (BPM commandes, facturation, RH). Formation 25 dispatchers. Certification ISO 39001 sécurité routière. Structuration familiale : séparation patrimoine pro/perso, pacte d'actionnaires.",
    engagement_status: "Nouveau — Cadrage",
    created_at: "2026-06-10T08:00:00Z",
    updated_at: "2026-06-13T09:00:00Z"
  },
  {
    id: 6,
    company_name: "Manufacture Textile du Faso (MTF)",
    sector: "Textile / Manufacture",
    employees_count: 550,
    governance_score: 4.8,
    digital_maturity_score: 2.5,
    performance_score: 4.5,
    recommendations: "Diagnostic complet : sortie de la gestion artisanale. 3 urgences : (1) comptabilité analytique coûts de production, (2) gestion RH formalisée pour 550 employés, (3) traçabilité supply chain coton. Projet transformation 360 sur 24 mois avec financement banque développement.",
    engagement_status: "En cours — Diagnostic complet",
    created_at: "2026-06-08T08:00:00Z",
    updated_at: "2026-06-12T15:00:00Z"
  }
];