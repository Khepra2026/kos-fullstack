export const dataHubConnectors = [
  {
    id: "dh-001",
    data_source: "CRM HubSpot",
    connector_type: "API REST",
    integration_status: "active",
    last_sync: "2026-06-13T07:30:00Z",
    record_count: 487,
    data_quality_score: 9.1,
    schema_version: "v2.3",
    access_controls: ["Admin KHEPRA", "Direction Commerciale"],
    created_at: "2026-05-01T08:00:00Z"
  },
  {
    id: "dh-002",
    data_source: "Google Analytics 4",
    connector_type: "API GA4 Data",
    integration_status: "active",
    last_sync: "2026-06-13T06:00:00Z",
    record_count: 28450,
    data_quality_score: 8.7,
    schema_version: "v1.8",
    access_controls: ["Admin KHEPRA", "Équipe Marketing"],
    created_at: "2026-04-15T10:00:00Z"
  },
  {
    id: "dh-003",
    data_source: "SYCOHADA Comptabilité",
    connector_type: "Import CSV Mensuel",
    integration_status: "active",
    last_sync: "2026-06-01T08:00:00Z",
    record_count: 1256,
    data_quality_score: 8.2,
    schema_version: "v1.0",
    access_controls: ["Admin KHEPRA", "DAF"],
    created_at: "2026-03-01T09:00:00Z"
  },
  {
    id: "dh-004",
    data_source: "LinkedIn Analytics",
    connector_type: "API LinkedIn + KOS Bridge",
    integration_status: "active",
    last_sync: "2026-06-13T04:00:00Z",
    record_count: 15230,
    data_quality_score: 8.9,
    schema_version: "v2.0",
    access_controls: ["Admin KHEPRA", "Équipe Marketing", "Direction"],
    created_at: "2026-05-20T12:00:00Z"
  },
  {
    id: "dh-005",
    data_source: "ERP Odoo",
    connector_type: "API XML-RPC",
    integration_status: "pending",
    last_sync: null,
    record_count: 0,
    data_quality_score: 0,
    schema_version: "v1.0",
    access_controls: ["Admin KHEPRA", "DAF", "Direction"],
    created_at: "2026-06-10T15:00:00Z"
  }
];

export const decisionIntelligence = [
  {
    id: "di-001",
    decision_title: "Ouverture Bureau Abidjan vs Douala — 2027",
    analysis_type: "Analyse Multicritère Stratégique",
    trends_identified: ["Croissance fintech Côte d'Ivoire +35%", "Demande COBAC en hausse au Cameroun", "Disponibilité talents"],
    scenarios_generated: ["Scénario A: Abidjan prioritaire (délai 6 mois)", "Scénario B: Douala prioritaire (délai 9 mois)", "Scénario C: Les deux simultanément (délai 12 mois)"],
    impact_assessment: { scenario_a: { revenue: 180000000, risk: "Faible", time: 6 }, scenario_b: { revenue: 150000000, risk: "Modéré", time: 9 }, scenario_c: { revenue: 350000000, risk: "Élevé", time: 12 } },
    priority_ranking: { first: "Scénario A — Abidjan", second: "Scénario B — Douala", third: "Scénario C — Les deux" },
    executive_recommendation: "Privilégier Abidjan en premier (meilleur rapport risque/opportunité, écosystème fintech plus mature), puis Douala à J+9 mois. Recruter un Country Manager local pour chaque bureau. Budget total estimé : 95 000 000 FCFA.",
    confidence_level: 8.5,
    decision_status: "proposed",
    created_at: "2026-06-12T11:00:00Z"
  },
  {
    id: "di-002",
    decision_title: "Lancement KOS RegTech Conformity Scanner™ — Go/No-Go Q4 2026",
    analysis_type: "Business Case Innovation",
    trends_identified: ["Marché RegTech africain en croissance 28%/an", "3 concurrents identifiés mais aucun couvrant BCEAO+COBAC+GAFI simultanément"],
    scenarios_generated: ["Go complet : investissement 85M FCFA", "Go progressif : MVP puis scale", "No-Go : recentrage sur consulting pur"],
    impact_assessment: { go_complet: { revenue_3y: 750000000, investment: 85000000, payback: 14 }, go_progressif: { revenue_3y: 480000000, investment: 40000000, payback: 10 }, no_go: { revenue_3y: 0, investment: 0, payback: null } },
    priority_ranking: { first: "Go progressif (MVP)", second: "Go complet", third: "No-Go" },
    executive_recommendation: "GO PROGRESSIF recommandé. Lancer un MVP en Janvier 2027 avec 5 clients pilotes (SFD partenaires). Budget initial 40M FCFA. Point de revue à J+6 mois pour décision scale-up.",
    confidence_level: 7.8,
    decision_status: "under_review",
    created_at: "2026-06-13T08:00:00Z"
  }
];

export const pmoProjects = [
  {
    id: "pmo-001",
    project_name: "Déploiement KOS Enterprise OS™ Phase 3",
    project_type: "Transformation Digitale Interne",
    phase: "Exécution",
    planned_start: "2026-06-13",
    planned_end: "2026-07-13",
    actual_progress: 25,
    milestones: [{ name: "Tables Supabase", status: "completed" }, { name: "Edge Functions", status: "completed" }, { name: "Hubs UI", status: "in_progress" }, { name: "Tests Intégration", status: "pending" }, { name: "Go Live", status: "pending" }],
    risk_flags: ["Retard possible sur l'intégration ERP Odoo"],
    budget_consumed_fcfa: 12000000,
    budget_total_fcfa: 45000000,
    alerts_generated: 1,
    created_at: "2026-06-13T07:00:00Z"
  },
  {
    id: "pmo-002",
    project_name: "Certification ISO 27001 — Sécurité de l'Information",
    project_type: "Certification",
    phase: "Planification",
    planned_start: "2026-07-01",
    planned_end: "2026-12-15",
    actual_progress: 10,
    milestones: [{ name: "Gap Analysis", status: "completed" }, { name: "Politiques SMSI", status: "in_progress" }, { name: "Audit à blanc", status: "pending" }, { name: "Audit certification", status: "pending" }],
    risk_flags: [],
    budget_consumed_fcfa: 2500000,
    budget_total_fcfa: 25000000,
    alerts_generated: 0,
    created_at: "2026-06-01T09:00:00Z"
  },
  {
    id: "pmo-003",
    project_name: "Programme Board Excellence — 10 premiers clients",
    project_type: "Lancement Commercial",
    phase: "Exécution",
    planned_start: "2026-06-01",
    planned_end: "2026-09-30",
    actual_progress: 30,
    milestones: [{ name: "Matériel commercial", status: "completed" }, { name: "Prospection 50 cibles", status: "in_progress" }, { name: "5 propositions signées", status: "in_progress" }, { name: "10 clients onboardés", status: "pending" }],
    risk_flags: ["Pipeline commercial en retard de 15%"],
    budget_consumed_fcfa: 8000000,
    budget_total_fcfa: 30000000,
    alerts_generated: 1,
    created_at: "2026-06-01T08:00:00Z"
  }
];



