export const executiveDashboardBlueprints = [
  {
    id: "ed-001",
    dashboard_name: "CEO Command Center",
    target_audience: "CEO",
    description: "Tableau de bord exécutif unifié consolidant stratégie, opérations, clients, finances, SEO, marketing, innovation et risques en une vue unique.",
    key_metrics: ["Revenu mensuel", "Marge nette", "Pipeline value FCFA", "NPS", "Score Big Four", "Risques critiques"],
    refresh_frequency: "temps_reel",
    visualization_type: "mix",
    drill_down_capability: true,
    status: "active",
    version: "2.0"
  },
  {
    id: "ed-002",
    dashboard_name: "PMO — Pilotage de Portefeuille Projets",
    target_audience: "PMO",
    description: "Vue consolidée du portefeuille de missions : jalons, budgets, risques, allocation ressources, rentabilité par mission.",
    key_metrics: ["Projets actifs", "Taux respect délais", "Taux respect budget", "Marge par mission", "Risques projets"],
    refresh_frequency: "quotidien",
    visualization_type: "mix",
    status: "active",
    version: "1.5"
  },
  {
    id: "ed-003",
    dashboard_name: "Marketing & SEO Performance",
    target_audience: "Marketing",
    description: "Dashboard complet : trafic organique, positions Google, taux de conversion, leads générés, ROI campagnes.",
    key_metrics: ["Sessions organiques", "CTR moyen", "Positions Top 10", "Leads/mois", "Taux conversion", "Coût par lead"],
    refresh_frequency: "quotidien",
    visualization_type: "charts",
    status: "active",
    version: "1.8"
  },
  {
    id: "ed-004",
    dashboard_name: "AI Governance & Performance",
    target_audience: "AI_Governance",
    description: "Monitoring des 50 agents IA : disponibilité, qualité des sorties, incidents, usage, coûts.",
    key_metrics: ["Agents actifs", "Score qualité moyen", "Incidents/30j", "Disponibilité %", "SLA attainment"],
    refresh_frequency: "temps_reel",
    visualization_type: "heatmap",
    status: "active",
    version: "1.0"
  }
];

export const transformationRoadmap = [
  {
    id: "rd-001",
    initiative_name: "Fondations KOS — Infrastructure Core",
    time_horizon: "90_jours",
    phase: "fondations",
    description: "Déploiement des briques fondamentales : Strategic Reasoning, Executive Research, Audit Intelligence, Proposal Generator, SEO Engine.",
    estimated_budget_fcfa: 25000000,
    priority: 1,
    progress_pct: 100,
    status: "completed"
  },
  {
    id: "rd-002",
    initiative_name: "Industrialisation — Knowledge & Clients",
    time_horizon: "6_mois",
    phase: "industrialisation",
    description: "Knowledge Graph, Think Tank Engine, Board Advisor, Executive Dashboard, Client Success Engine.",
    estimated_budget_fcfa: 35000000,
    priority: 1,
    progress_pct: 85,
    status: "in_progress"
  },
  {
    id: "rd-003",
    initiative_name: "Automatisation Avancée — Multi-Agent",
    time_horizon: "12_mois",
    phase: "automatisation",
    description: "Multi-Agent Orchestrator, Autonomous PMO, Enterprise Risk Engine, Decision Intelligence, Performance Excellence.",
    estimated_budget_fcfa: 45000000,
    priority: 2,
    progress_pct: 40,
    status: "in_progress"
  },
  {
    id: "rd-004",
    initiative_name: "Enterprise OS — Autonomie Complète",
    time_horizon: "24_mois",
    phase: "enterprise_os",
    description: "Digital Twin, AI Governance Council, Self-Improvement Engine, Enterprise Command Center. Objectif : 95% de maturité Big Four.",
    estimated_budget_fcfa: 60000000,
    priority: 3,
    progress_pct: 10,
    status: "planned"
  }
];

export const controlTowerComponents = [
  {
    id: "ct-001",
    tower_component: "Radar KPI — Vue Stratégique",
    component_type: "kpi",
    description: "Monitoring temps réel des 50 KPIs clés répartis sur 12 domaines avec alertes automatisées sur seuils.",
    monitoring_metrics: ["50 KPIs", "12 domaines", "Seuils vert/orange/rouge", "Tendance 30 jours"],
    review_frequency: "temps_reel",
    responsible_team: "Executive Dashboard AI",
    status: "active"
  },
  {
    id: "ct-002",
    tower_component: "Centre de Contrôle des Risques",
    component_type: "risques",
    description: "Cartographie dynamique des risques stratégiques, opérationnels, financiers, réglementaires, technologiques et réputationnels.",
    monitoring_metrics: ["Registre 200+ risques", "Matrice criticité × probabilité", "Plans mitigation", "Alertes évolution"],
    review_frequency: "temps_reel",
    responsible_team: "Enterprise Risk AI",
    status: "active"
  },
  {
    id: "ct-003",
    tower_component: "Supervision des Opérations — Mission Control",
    component_type: "operations",
    description: "Suivi en continu de toutes les missions actives : avancement, budget, risques, satisfaction client.",
    monitoring_metrics: ["Missions actives", "Taux achèvement", "Écarts budget", "Alertes retard", "Satisfaction NPS"],
    review_frequency: "quotidien",
    responsible_team: "Autonomous PMO",
    status: "active"
  },
  {
    id: "ct-004",
    tower_component: "Surveillance IA — Agent Watchtower",
    component_type: "ia",
    description: "Monitoring continu des 50 agents IA : performance, erreurs, hallucinations, dérives, incidents.",
    monitoring_metrics: ["50 agents", "Score qualité", "Taux erreur", "Incidents", "SLA compliance"],
    review_frequency: "temps_reel",
    responsible_team: "AI Governance Council",
    status: "active"
  }
];

export const thinkTankPublications = [
  {
    id: "tt-001",
    publication_type: "rapport",
    title: "Baromètre de l'Inclusion Financière UEMOA 2026",
    research_methodology: "Analyse quantitative des données BCEAO, 200 institutions, 8 pays, 24 indicateurs.",
    publication_frequency: "annuelle",
    peer_review_required: true,
    expected_impact: "Publication de référence citée par les banques centrales et les institutions internationales.",
    status: "published",
    version: "1.0"
  },
  {
    id: "tt-002",
    publication_type: "policy_brief",
    title: "Gouvernance des SFD en Zone UEMOA — Propositions de Réforme",
    research_methodology: "Benchmark international (Inde, Kenya, Bangladesh) + analyse des textes UEMOA + entretiens dirigeants SFD.",
    publication_frequency: "ponctuelle",
    peer_review_required: true,
    expected_impact: "Influencer la prochaine révision des instructions BCEAO sur la gouvernance des SFD.",
    status: "review",
    version: "0.9"
  },
  {
    id: "tt-003",
    publication_type: "etude",
    title: "Impact de la Réglementation COBAC R-2018/01 sur la Bancarisation en Zone CEMAC",
    research_methodology: "Étude d'impact ex-post : analyse données COBAC + entretiens 15 banques + modélisation économétrique.",
    publication_frequency: "ponctuelle",
    peer_review_required: true,
    expected_impact: "Documenter l'efficacité de la réglementation LBC/FT pour le GABAC et les bailleurs internationaux.",
    status: "draft",
    version: "0.5"
  },
  {
    id: "tt-004",
    publication_type: "regulatory_foresight",
    title: "Prospective Réglementaire 2027-2030 — Finance Digitale en Afrique Francophone",
    research_methodology: "Analyse Delphi modifiée : panel 30 experts (banquiers centraux, régulateurs, fintechs, avocats), 3 rounds.",
    target_audience: "Décideurs politiques, banques centrales, investisseurs, cabinets de conseil.",
    publication_frequency: "semestrielle",
    peer_review_required: true,
    expected_impact: "Devenir la référence de prospective réglementaire pour l'Afrique francophone.",
    status: "review",
    version: "0.8"
  }
];

export const enterpriseManualBooks = [
  {
    id: "em-001",
    manual_book: "KOS Architecture Book",
    book_type: "architecture",
    description: "Document de référence décrivant l'architecture complète de KOS : vision, architecture cible, logique, applicative, données, IA, sécurité.",
    total_pages: 180,
    review_cycle_months: 6,
    distribution_level: "interne",
    status: "published",
    version: "3.0"
  },
  {
    id: "em-002",
    manual_book: "KOS Governance Book",
    book_type: "governance",
    description: "Cadre de gouvernance complet : organes, rôles, responsabilités, processus décisionnels, comités, contrôles.",
    total_pages: 145,
    review_cycle_months: 6,
    distribution_level: "restreint",
    status: "review",
    version: "2.0"
  },
  {
    id: "em-003",
    manual_book: "KOS Automation Book",
    book_type: "automation",
    description: "Registre complet des automatisations KOS : 68 workflows, 12 cron jobs, déclencheurs, procédures de rollback.",
    total_pages: 210,
    review_cycle_months: 3,
    distribution_level: "interne",
    status: "published",
    version: "1.5"
  },
  {
    id: "em-004",
    manual_book: "KOS Quality Book",
    book_type: "quality",
    description: "Référentiel qualité complet : 12 quality gates, standards par type de livrable, procédures de contrôle, matrice RACI.",
    total_pages: 165,
    review_cycle_months: 6,
    distribution_level: "interne",
    status: "published",
    version: "2.1"
  },
  {
    id: "em-005",
    manual_book: "KOS AI Governance Manual",
    book_type: "ai_governance",
    description: "Manuel de gouvernance IA aligné ISO/IEC 42001 : registre, classification risques, supervision humaine, audit trail.",
    total_pages: 195,
    review_cycle_months: 3,
    distribution_level: "restreint",
    status: "review",
    version: "1.0"
  },
  {
    id: "em-006",
    manual_book: "KOS Executive Playbook",
    book_type: "executive_playbook",
    description: "Guide exécutif synthétique pour le COMEX : résumé des 10 livres, KPIs clés, processus décisionnels, procédures d'escalade.",
    total_pages: 85,
    review_cycle_months: 6,
    distribution_level: "board_only",
    status: "draft",
    version: "0.9"
  }
];



