export const agentCatalogEntries = [
  {
    id: "ag-001",
    agent_name: "Strategic Reasoning Engine™",
    agent_code: "KOS-AGENT-STRAT-001",
    mission: "Analyser les décisions importantes, identifier les risques, construire des scénarios prospectifs et produire des recommandations exécutives.",
    domain: "strategy",
    responsibilities: ["Analyse décisionnelle", "Scénarios prospectifs", "Arbitrage stratégique", "Priorisation initiatives"],
    kpis: ["Taux de conversion recommandation → décision : 85%", "Délai moyen d'analyse : < 4h", "Précision prédictive : > 80%"],
    maturity_score: 4,
    is_active: true
  },
  {
    id: "ag-002",
    agent_name: "Audit Intelligence Engine™",
    agent_code: "KOS-AGENT-AUDIT-001",
    mission: "Réaliser des pré-audits organisationnels, financiers, opérationnels et digitaux selon les standards Big Four.",
    domain: "compliance",
    responsibilities: ["Pré-audit BCEAO/COBAC", "Audit contrôle interne", "Évaluation conformité", "Génération rapports"],
    kpis: ["Taux de détection anomalies : 92%", "Couverture référentiels : 14/14", "Délai pré-audit standard : < 72h"],
    maturity_score: 4,
    is_active: true
  },
  {
    id: "ag-003",
    agent_name: "CEO Advisor™",
    agent_code: "KOS-AGENT-CEO-001",
    mission: "Agir comme conseiller stratégique permanent du dirigeant avec briefing quotidien, hebdomadaire et mensuel.",
    domain: "strategy",
    responsibilities: ["Briefing quotidien 05:00 UTC", "Note stratégique hebdomadaire", "Radar des risques permanent"],
    kpis: ["Pertinence alertes : 90%", "Taux de couverture KPI : 100%", "Délai alerte critique : < 15 min"],
    maturity_score: 3,
    is_active: true
  },
  {
    id: "ag-004",
    agent_name: "Quality Assurance Authority™",
    agent_code: "KOS-AGENT-QA-001",
    mission: "Contrôler automatiquement la qualité de tous les livrables avant livraison client.",
    domain: "quality",
    responsibilities: ["12 quality gates", "Score qualité automatique", "Anomalies détection", "Recommandations amélioration"],
    kpis: ["Score qualité moyen : 9.2/10", "Taux de détection erreurs : 97%", "Faux positifs : < 3%"],
    maturity_score: 3,
    is_active: true
  },
  {
    id: "ag-005",
    agent_name: "Autonomous PMO™",
    agent_code: "KOS-AGENT-PMO-001",
    mission: "Piloter automatiquement les projets : planification, suivi, alertes, gestion des risques et reporting.",
    domain: "operations",
    responsibilities: ["Planification automatique", "Suivi jalons", "Alertes retard", "Gestion risques", "Rapports hebdomadaires"],
    kpis: ["Respect délais : 85%", "Respect budget : 90%", "Alertes prédictives fiabilité : 88%"],
    maturity_score: 2,
    is_active: true
  },
  {
    id: "ag-006",
    agent_name: "Self-Improvement Engine™",
    agent_code: "KOS-AGENT-SI-001",
    mission: "Analyser les performances de tous les agents KOS et produire un plan d'amélioration continue.",
    domain: "quality",
    responsibilities: ["Analyse performance agents", "Détection automatisations inutilisées", "Opportunités optimisation", "Plan amélioration hebdomadaire"],
    kpis: ["Agents monitorés : 50/50", "Recommandations/semaine : 15+", "Taux adoption améliorations : 70%"],
    maturity_score: 2,
    is_active: true
  }
];

export const securityFrameworkControls = [
  {
    id: "sf-001",
    security_domain: "Gestion des Accès",
    domain_type: "preventif",
    description: "Politique de gestion des identités et des accès basée sur le principe du moindre privilège.",
    control_objective: "Garantir que seules les personnes autorisées accèdent aux ressources KOS avec le niveau de privilège approprié.",
    reference_standard: "ISO 27001 A.9 — Contrôle d'accès",
    risk_level: "critique",
    review_frequency: "trimestrielle",
    status: "active",
    version: "2.0"
  },
  {
    id: "sf-002",
    security_domain: "Sécurité des API",
    domain_type: "preventif",
    description: "Sécurisation complète des API : JWT, rate limiting, validation des entrées, CORS restrictif.",
    control_objective: "Protéger les API contre les attaques par injection, usurpation et déni de service.",
    reference_standard: "OWASP API Security Top 10 (2023)",
    risk_level: "critique",
    review_frequency: "continue",
    status: "active",
    version: "1.5"
  },
  {
    id: "sf-003",
    security_domain: "Gestion des Secrets",
    domain_type: "preventif",
    description: "Tous les secrets (clés API, tokens) sont stockés exclusivement dans Supabase Vault / Edge Functions secrets, jamais en clair dans le code.",
    control_objective: "Éliminer toute exposition de secrets dans le code source, les logs ou les configurations.",
    reference_standard: "ISO 27001 A.10 — Cryptographie",
    risk_level: "critique",
    review_frequency: "mensuelle",
    status: "active",
    version: "1.0"
  },
  {
    id: "sf-004",
    security_domain: "Journalisation et Audit Trail",
    domain_type: "detectif",
    description: "Journalisation complète de tous les accès, modifications et opérations critiques avec conservation 1 an.",
    control_objective: "Assurer la traçabilité complète des actions pour les audits de sécurité et la conformité réglementaire.",
    reference_standard: "ISO 27001 A.12.4 — Journalisation et surveillance",
    risk_level: "eleve",
    review_frequency: "continue",
    status: "active",
    version: "1.0"
  }
];

export const seoAuthorityStandards = [
  {
    id: "seo-001",
    seo_component: "Structure Hn — Hiérarchie Sémantique",
    component_type: "contenu",
    description: "Chaque page doit avoir exactement 1 H1, une hiérarchie H2→H4 cohérente, et des titres optimisés pour les mots-clés piliers.",
    quality_criteria: { h1_count: 1, h2_min: 3, h3_min: 6, keyword_in_h1: true },
    audit_frequency: "hebdomadaire",
    target_kpi: "Score Hn ≥ 9/10",
    status: "active"
  },
  {
    id: "seo-002",
    seo_component: "Maillage Interne — Stratégie Silo",
    component_type: "maillage",
    description: "Stratégie de maillage interne par silos thématiques : pages piliers → services → articles blog → outils, avec liens contextuels bidirectionnels.",
    quality_criteria: { internal_links_per_page_min: 5, orphan_pages: 0, silo_depth_max: 4 },
    audit_frequency: "mensuelle",
    target_kpi: "0 page orpheline, maillage ≥ 5 liens/page",
    status: "active"
  },
  {
    id: "seo-003",
    seo_component: "Schema.org — Données Structurées",
    component_type: "schema",
    description: "Déploiement systématique de Schema.org : Organization, ProfessionalService, FAQPage, HowTo, BreadcrumbList, Article, WebPage.",
    quality_criteria: { schema_types: 7, validation_errors: 0, rich_result_eligible: true },
    audit_frequency: "mensuelle",
    target_kpi: "100% pages clés avec Schema.org valide",
    status: "active"
  },
  {
    id: "seo-004",
    seo_component: "AEO — Answer Engine Optimization",
    component_type: "aeo",
    description: "Optimisation pour les moteurs de réponse IA (ChatGPT, Claude, Perplexity, Google SGE, Gemini) : FAQ structurées, contenu extractible, entités nommées.",
    quality_criteria: { faq_sections: "≥ 3 par article pilier", entity_markup: true, extractable_content: true },
    audit_frequency: "hebdomadaire",
    target_kpi: "Score AEO ≥ 8/10",
    status: "active"
  }
];

export const clientSuccessPlaybook = [
  {
    id: "cs-001",
    playbook_section: "Parcours Onboarding Client",
    section_type: "onboarding",
    description: "Processus standardisé d'intégration de tout nouveau client KHEPRA EXPERTS : J+1 welcome pack, J+7 kick-off, J+30 check-in.",
    success_metrics: { time_to_first_value: "14 jours", onboarding_nps_target: 80, onboarding_completion_rate: 95 },
    health_score_threshold_green: 80,
    health_score_threshold_red: 50,
    nps_target: 75,
    status: "active"
  },
  {
    id: "cs-002",
    playbook_section: "Programme de Fidélisation & Renouvellement",
    section_type: "renouvellement",
    description: "Stratégie proactive de renouvellement : alerte J-90 avant fin de mission, business review trimestrielle, proposition d'extension.",
    success_metrics: { renewal_rate_target: 85, upsell_rate_target: 30, churn_rate_max: 10 },
    health_score_threshold_green: 75,
    health_score_threshold_red: 40,
    nps_target: 70,
    status: "active"
  },
  {
    id: "cs-003",
    playbook_section: "Gestion des Réclamations — Processus Escalade",
    section_type: "resolution",
    description: "Processus de traitement des réclamations clients : accusé réception < 4h, analyse < 24h, résolution < 72h, feedback loop.",
    escalation_procedure: "Niveau 1 : Directeur de Mission (24h), Niveau 2 : Associé (48h), Niveau 3 : Managing Partner (72h)",
    health_score_threshold_green: 70,
    health_score_threshold_red: 30,
    nps_target: 65,
    status: "active"
  }
];

export const maturityModelAssessments = [
  {
    id: "mm-001",
    capability_name: "Capitalisation des Connaissances",
    capability_domain: "gouvernance",
    description: "Capacité à capturer, structurer et réutiliser le capital intellectuel généré par les missions.",
    current_level: 3,
    target_level: 5,
    gap_analysis: "Knowledge Graph opérationnel mais adoption équipe encore partielle. Lessons Learned non systématisées.",
    assessed_by: "KOS Self-Improvement Engine",
    assessment_date: "2026-06-13T06:00:00Z"
  },
  {
    id: "mm-002",
    capability_name: "Automatisation des Processus",
    capability_domain: "operations",
    description: "Degré d'automatisation des processus cœur : SEO, sécurité, qualité, CRM, reporting.",
    current_level: 3,
    target_level: 5,
    gap_analysis: "12 cron jobs actifs, 68 Edge Functions. Processus manuels résiduels : validation éditoriale, réponse AO complexes.",
    assessed_by: "KOS Self-Improvement Engine",
    assessment_date: "2026-06-13T06:00:00Z"
  },
  {
    id: "mm-003",
    capability_name: "Gouvernance IA",
    capability_domain: "ia",
    description: "Maturité du cadre de gouvernance des agents IA : registre, classification risques, supervision humaine, audit trail.",
    current_level: 3,
    target_level: 5,
    gap_analysis: "Structure ISO 42001 déployée. Manque : évaluations d'impact IA formalisées, certification externe.",
    assessed_by: "AI Governance Council",
    assessment_date: "2026-06-13T06:00:00Z"
  },
  {
    id: "mm-004",
    capability_name: "Pilotage par KPI",
    capability_domain: "strategie",
    description: "Capacité à piloter l'ensemble des activités par indicateurs de performance en temps réel.",
    current_level: 2,
    target_level: 5,
    gap_analysis: "Dashboard exécutif existant mais données partielles. Tableaux de bord métier non consolidés.",
    assessed_by: "Executive Dashboard Engine",
    assessment_date: "2026-06-13T06:00:00Z"
  }
];





