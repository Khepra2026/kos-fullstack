export const sopLibraryEntries = [
  {
    id: "sop-001",
    sop_code: "SOP-GOV-001",
    title: "Organisation et Tenue du Conseil d'Administration",
    category: "ca",
    objective: "Standardiser la préparation, la tenue et le suivi des sessions du Conseil d'Administration conformément à l'AUSCGIE OHADA et aux circulaires BCEAO.",
    procedure_steps: ["Convocation J-15 avec ordre du jour", "Dossier préparatoire J-7", "Tenue et procès-verbal", "Registre des délibérations", "Suivi des résolutions"],
    responsible_role: "Secrétaire du Conseil",
    frequency: "trimestrielle",
    status: "published",
    version: "2.1"
  },
  {
    id: "sop-002",
    sop_code: "SOP-CONS-001",
    title: "Lancement de Mission de Conseil — Phase Diagnostic",
    category: "lancement_mission",
    objective: "Cadrer le lancement de toute mission de conseil : lettre de mission, équipe, planning, entretiens, analyse documentaire.",
    procedure_steps: ["Kick-off meeting J+1", "Collecte documentaire J+1 à J+5", "Entretiens parties prenantes J+3 à J+10", "Analyse et diagnostic J+10 à J+15", "Restitution intermédiaire J+15"],
    responsible_role: "Directeur de Mission",
    frequency: "ponctuelle",
    status: "published",
    version: "3.0"
  },
  {
    id: "sop-003",
    sop_code: "SOP-MKT-001",
    title: "Publication Article Blog — Workflow Qualité",
    category: "publication",
    objective: "Garantir que chaque article blog publié respecte les 12 quality gates KHEPRA : SEO, ton institutionnel, références réglementaires, maillage interne.",
    procedure_steps: ["Rédaction draft", "Revue éditoriale", "Optimisation SEO", "Validation conformité", "Programmation publication", "Suivi performances J+7"],
    responsible_role: "Content Manager",
    frequency: "hebdomadaire",
    status: "published",
    version: "2.0"
  },
  {
    id: "sop-004",
    sop_code: "SOP-TECH-001",
    title: "Déploiement Edge Function — Procédure CI/CD",
    category: "webops",
    objective: "Standardiser le déploiement des Edge Functions Supabase avec vérification pré-déploiement, tests et rollback.",
    procedure_steps: ["Revue de code", "Vérification secrets", "Déploiement staging", "Tests fonctionnels", "Déploiement production", "Monitoring post-déploiement 24h"],
    responsible_role: "CTO / Lead Developer",
    frequency: "ponctuelle",
    status: "published",
    version: "1.5"
  },
  {
    id: "sop-005",
    sop_code: "SOP-IA-001",
    title: "Création et Validation d'un Agent IA KOS",
    category: "creation_agents",
    objective: "Processus complet de création d'un nouvel agent IA : analyse de besoin, conception du prompt, tests, validation, déploiement, monitoring.",
    procedure_steps: ["Analyse du besoin métier", "Conception du prompt et du flow", "Phase de test sur données historiques", "Revue par AI Governance Council", "Déploiement graduel 10%→50%→100%"],
    responsible_role: "AI Governance Officer",
    frequency: "ponctuelle",
    status: "published",
    version: "1.0"
  },
  {
    id: "sop-006",
    sop_code: "SOP-SEC-001",
    title: "Gestion des Incidents de Sécurité",
    category: "securite",
    objective: "Procédure de réponse aux incidents de sécurité : détection, classification, confinement, éradication, recovery, post-mortem.",
    procedure_steps: ["Détection et alerte immédiate", "Classification (P1/P2/P3/P4)", "Confinement sous 30 min (P1)", "Investigation et root cause", "Remédiation et test", "Post-mortem J+5"],
    responsible_role: "Security Officer",
    frequency: "ponctuelle",
    status: "published",
    version: "2.0"
  }
];

export const kpiDictionaryEntries = [
  {
    id: "kpi-001",
    kpi_code: "KPI-STRAT-001",
    kpi_name: "Taux de Conversion Mission",
    domain: "strategie",
    definition: "Pourcentage de propositions commerciales converties en missions signées.",
    formula: "(Missions signées / Propositions émises) × 100",
    measurement_frequency: "mensuelle",
    threshold_green: "≥ 40%",
    threshold_orange: "30-40%",
    threshold_red: "< 30%",
    target_value: 45,
    current_value: 38,
    trend: "up",
    unit: "%"
  },
  {
    id: "kpi-002",
    kpi_code: "KPI-FIN-001",
    kpi_name: "Valeur Moyenne de Mission",
    domain: "finance",
    definition: "Revenu moyen par mission de conseil signée.",
    formula: "Revenu total missions / Nombre de missions",
    measurement_frequency: "trimestrielle",
    threshold_green: "≥ 25 000 000 FCFA",
    threshold_orange: "15-25M FCFA",
    threshold_red: "< 15 000 000 FCFA",
    target_value: 30000000,
    current_value: 22500000,
    trend: "up",
    unit: "FCFA"
  },
  {
    id: "kpi-003",
    kpi_code: "KPI-MKT-001",
    kpi_name: "Taux de Conversion Visiteur → Lead",
    domain: "marketing",
    definition: "Pourcentage de visiteurs uniques convertis en leads qualifiés.",
    formula: "(Nouveaux leads / Visiteurs uniques) × 100",
    measurement_frequency: "mensuelle",
    threshold_green: "≥ 8%",
    threshold_orange: "4-8%",
    threshold_red: "< 4%",
    target_value: 10,
    current_value: 6.2,
    trend: "up",
    unit: "%"
  },
  {
    id: "kpi-004",
    kpi_code: "KPI-SEO-001",
    kpi_name: "Positions Top 10 Google — Mots-Clés Piliers",
    domain: "seo",
    definition: "Nombre de mots-clés piliers (top 20) positionnés dans le Top 10 de Google.",
    formula: "Décompte des KW en position 1-10",
    measurement_frequency: "mensuelle",
    threshold_green: "≥ 15/20",
    threshold_orange: "10-14/20",
    threshold_red: "< 10/20",
    target_value: 18,
    current_value: 12,
    trend: "up",
    unit: "positions"
  },
  {
    id: "kpi-005",
    kpi_code: "KPI-CLI-001",
    kpi_name: "Net Promoter Score (NPS)",
    domain: "clients",
    definition: "Score de recommandation client mesuré en fin de mission.",
    formula: "% Promoteurs - % Détracteurs",
    measurement_frequency: "trimestrielle",
    threshold_green: "≥ 70",
    threshold_orange: "50-69",
    threshold_red: "< 50",
    target_value: 75,
    current_value: 62,
    trend: "stable",
    unit: "points"
  },
  {
    id: "kpi-006",
    kpi_code: "KPI-TECH-001",
    kpi_name: "Score Global Qualité KOS",
    domain: "technologie",
    definition: "Score de qualité agrégé du système KOS (Core Web Vitals, SEO, Sécurité, Contenu).",
    formula: "Moyenne pondérée des 6 scores agents (URL, SEO, CWV, Contenu, Légal, Réputation)",
    measurement_frequency: "quotidienne",
    threshold_green: "≥ 9.5/10",
    threshold_orange: "8.0-9.4/10",
    threshold_red: "< 8.0/10",
    target_value: 9.8,
    current_value: 9.5,
    trend: "up",
    unit: "/10"
  }
];

export const qualityManagementControls = [
  {
    id: "qm-001",
    control_name: "Quality Gate 1 — Cohérence Méthodologique",
    control_domain: "livrables",
    description: "Vérification que la méthodologie employée est conforme au cadre KHEPRA et aux standards Big Four.",
    acceptance_threshold: 90,
    review_frequency: "chaque_livrable",
    quality_gate_position: "pre_delivery",
    status: "active",
    version: "2.0"
  },
  {
    id: "qm-002",
    control_name: "Quality Gate 2 — Qualité Rédactionnelle",
    control_domain: "livrables",
    description: "Contrôle orthographique, grammatical, stylistique et de ton institutionnel.",
    acceptance_threshold: 95,
    review_frequency: "chaque_livrable",
    quality_gate_position: "pre_delivery",
    status: "active",
    version: "2.0"
  },
  {
    id: "qm-003",
    control_name: "Code Review — Qualité Logicielle",
    control_domain: "code",
    description: "Revue systématique du code : compilation, typage, sécurité, performance, maintenabilité.",
    acceptance_threshold: 85,
    review_frequency: "continue",
    quality_gate_position: "pre_production",
    status: "active",
    version: "1.5"
  },
  {
    id: "qm-004",
    control_name: "Audit Qualité Mission — Post-Livraison",
    control_domain: "missions",
    description: "Évaluation complète de la mission 30 jours après livraison : satisfaction client, respect budget, respect délais, qualité livrable.",
    acceptance_threshold: 85,
    review_frequency: "mensuelle",
    quality_gate_position: "post_delivery",
    status: "active",
    version: "1.0"
  }
];

export const sreFrameworkComponents = [
  {
    id: "sre-001",
    sre_component: "API Gateway — Disponibilité",
    component_type: "sla",
    description: "SLA de disponibilité de l'API Gateway KOS mesurée sur fenêtre glissante de 30 jours.",
    target_slo: 99.95,
    measurement_window_days: 30,
    alert_threshold: 99.9,
    critical_threshold: 99.5,
    status: "active",
    version: "1.0"
  },
  {
    id: "sre-002",
    sre_component: "Edge Functions — Latence P95",
    component_type: "slo",
    description: "Objectif de niveau de service sur la latence P95 des Edge Functions.",
    target_slo: 99.0,
    measurement_window_days: 7,
    alert_threshold: 95.0,
    critical_threshold: 90.0,
    status: "active",
    version: "1.0"
  },
  {
    id: "sre-003",
    sre_component: "Core Web Vitals — LCP",
    component_type: "monitoring",
    description: "Monitoring continu du Largest Contentful Paint sur les 12 pages prioritaires.",
    target_slo: 99.0,
    measurement_window_days: 1,
    alert_threshold: 95.0,
    critical_threshold: 90.0,
    status: "active",
    version: "1.0"
  },
  {
    id: "sre-004",
    sre_component: "Procédure de Gestion d'Incidents Majeurs",
    component_type: "incident_response",
    description: "Processus complet : détection → classification → escalation → résolution → post-mortem.",
    incident_escalation: { p1_response: "15 min", p1_resolution: "4 heures", p2_response: "1 heure", p2_resolution: "24 heures", p3_response: "4 heures", p4_response: "24 heures" },
    status: "active",
    version: "1.0"
  }
];