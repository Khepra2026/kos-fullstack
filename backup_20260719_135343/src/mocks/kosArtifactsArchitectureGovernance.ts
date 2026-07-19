export const enterpriseArchitectureBlueprints = [
  {
    id: "ea-001",
    title: "KOS Enterprise Architecture Blueprint v3.0",
    vision_statement: "KOS est le système d'exploitation qui orchestre l'ensemble des activités de KHEPRA EXPERTS — conseil, audit, recherche, marketing, SEO, finance, innovation, formation et opérations — dans une architecture unifiée, scalable et conforme aux standards Big Four.",
    architecture_type: "cible",
    system_landscape: { layers: 5, applications: 68, integrations: 142, databases: 30, agents_ia: 50 },
    dependency_map: { critical_paths: ["Supabase → Edge Functions → Frontend", "Knowledge Graph → RAG Pipeline → Agents IA"], risk_dependencies: ["KOS Automaton Engine — 100% autonome"] },
    technology_stack: { frontend: "React 19 + TailwindCSS + TypeScript", backend: "Supabase Edge Functions + PostgreSQL", ai: "KOS Automaton Engine — 100% autonome", security: "JWT + RLS + CSP + CORS" },
    maturity_level: 4,
    status: "published",
    version: "3.0",
    author: "KOS Enterprise Architecture Board",
    last_reviewed: "2026-06-13T08:00:00Z"
  },
  {
    id: "ea-002",
    title: "KOS Application Architecture Map",
    vision_statement: "Cartographie complète des 68 applications KOS réparties en 5 couches : Présentation, Orchestration, Intelligence, Data, Infrastructure.",
    architecture_type: "applicative",
    system_landscape: { modules: ["KHEPRA OS 2 (10 modules)", "KOS Command Hubs (12 hubs)", "Diagnostic Tools (26 outils)", "Blog Engine (75+ articles)"] },
    maturity_level: 4,
    status: "published",
    version: "2.1",
    author: "KOS Enterprise Architecture Board",
    last_reviewed: "2026-06-12T10:00:00Z"
  },
  {
    id: "ea-003",
    title: "KOS Security Architecture Framework",
    vision_statement: "Architecture de sécurité zero-trust couvrant les 7 couches du modèle OSI avec contrôles préventifs, détectifs et correctifs.",
    architecture_type: "securite",
    security_zones: { perimeter: "Cloudflare WAF + DDoS", network: "CORS restrictif + CSP", application: "JWT + RLS + Row-Level Security", data: "AES-256 + RLS PostgreSQL" },
    maturity_level: 4,
    status: "approved",
    version: "2.0",
    author: "KOS Security Architecture Board"
  },
  {
    id: "ea-004",
    title: "KOS IA Architecture Blueprint",
    vision_statement: "Architecture de gouvernance IA alignée sur ISO/IEC 42001 avec registre des 50 agents, classification des risques, supervision humaine et audit trail complet.",
    architecture_type: "ia",
    system_landscape: { agents: 50, layers: 6, quality_gates: 12, audit_frequency: "continue" },
    maturity_level: 3,
    status: "review",
    version: "1.5",
    author: "KOS IA Governance Council"
  }
];

export const knowledgeArchitectureComponents = [
  {
    id: "ka-001",
    component_name: "KOS Knowledge Graph™",
    component_type: "knowledge_graph",
    description: "Graphe sémantique structurant l'ensemble du capital intellectuel de KHEPRA EXPERTS — missions, études, méthodologies, modèles, livrables et KPIs. Entités interconnectées avec relations typées.",
    retention_policy: "Conservation permanente avec versioning",
    classification_level: "confidentiel",
    owner_role: "Chief Knowledge Officer",
    steward_role: "Knowledge Manager AI",
    storage_technology: "PostgreSQL + pgvector + Neo4j (cible)",
    status: "active",
    version: "2.0"
  },
  {
    id: "ka-002",
    component_name: "Methodology Library™",
    component_type: "methodology_library",
    description: "Bibliothèque structurée des 200+ méthodologies KHEPRA — cadres d'audit, modèles de diagnostic, templates de livrables, checklists et SOPs.",
    retention_policy: "Versioning semestriel, archives 10 ans",
    classification_level: "interne",
    owner_role: "Directeur Qualité & Méthodes",
    steward_role: "Methodology Factory AI",
    storage_technology: "Supabase Storage + Vector Embeddings",
    status: "active",
    version: "1.8"
  },
  {
    id: "ka-003",
    component_name: "Lessons Learned Repository",
    component_type: "lessons_learned",
    description: "Base de capitalisation des retours d'expérience de chaque mission — succès, échecs, adaptations contextuelles et meilleures pratiques par secteur.",
    retention_policy: "Capitalisation continue, revue trimestrielle",
    classification_level: "confidentiel",
    owner_role: "PMO Director",
    steward_role: "Knowledge Manager AI",
    storage_technology: "Supabase + Full-Text Search",
    status: "active",
    version: "1.2"
  },
  {
    id: "ka-004",
    component_name: "RAG Pipeline — Moteur de Recherche Sémantique",
    component_type: "rag_pipeline",
    description: "Pipeline RAG (Retrieval-Augmented Generation) avec 52 documents réglementaires enrichis, recherche par similarité cosinus sur embeddings vectoriels pgvector.",
    retention_policy: "Mise à jour hebdomadaire des embeddings",
    classification_level: "interne",
    owner_role: "CTO",
    steward_role: "RAG Pipeline AI",
    storage_technology: "KOS Automaton TF-IDF + BM25 — 100% autonome",
    status: "active",
    version: "1.0"
  }
];

export const dataGovernanceAssets = [
  {
    id: "dg-001",
    asset_name: "Base Clients & Missions",
    asset_type: "dataset",
    data_owner: "Associé Gérant",
    data_steward: "CRM Manager",
    classification: "confidential",
    quality_score: 92,
    completeness_pct: 98,
    accuracy_pct: 95,
    is_pii: true,
    is_sensitive: true,
    regulatory_framework: ["RGPD", "Loi Togolaise 2019-014", "Convention de Malabo"]
  },
  {
    id: "dg-002",
    asset_name: "Référentiel Réglementaire BCEAO/COBAC/GAFI",
    asset_type: "document",
    data_owner: "Directeur Conformité",
    data_steward: "Regulatory Intelligence AI",
    classification: "internal",
    quality_score: 96,
    completeness_pct: 100,
    accuracy_pct: 99,
    is_pii: false,
    retention_days: 3650,
    regulatory_framework: ["BCEAO Circulaires", "COBAC Règlements", "GAFI Recommandations"]
  },
  {
    id: "dg-003",
    asset_name: "Tableau de Bord Exécutif",
    asset_type: "dashboard",
    data_owner: "CEO",
    data_steward: "Executive Dashboard AI",
    classification: "restricted",
    quality_score: 88,
    completeness_pct: 95,
    accuracy_pct: 92,
    is_sensitive: true,
    regulatory_framework: ["ISO 27001", "COBIT 2019"]
  },
  {
    id: "dg-004",
    asset_name: "Modèles Financiers — Business Plans",
    asset_type: "model",
    data_owner: "Directeur Financial Advisory",
    data_steward: "Financial Analysis AI",
    classification: "confidential",
    quality_score: 90,
    completeness_pct: 97,
    accuracy_pct: 94,
    is_sensitive: true,
    regulatory_framework: ["SYCOHADA", "IFRS", "OHADA AUS"]
  }
];

export const aiGovernancePolicies = [
  {
    id: "aig-001",
    policy_name: "Registre des Agents IA — KOS AI Registry",
    policy_domain: "registre_ia",
    iso_42001_reference: "ISO/IEC 42001 §6.1.2 — AI System Inventory",
    description: "Registre exhaustif des 50 agents IA KOS avec classification par niveau de risque, domaine d'application, degré d'autonomie et exigences de supervision humaine.",
    risk_level: "modere",
    mitigation_controls: ["Registre versionné", "Revue trimestrielle", "Validation prompt avant déploiement"],
    audit_frequency: "trimestrielle",
    responsible_role: "AI Governance Officer",
    status: "published",
    version: "2.0"
  },
  {
    id: "aig-002",
    policy_name: "Classification des Risques IA — Risk Taxonomy",
    policy_domain: "classification_risques",
    iso_42001_reference: "ISO/IEC 42001 §6.1.3 — AI Risk Assessment",
    description: "Matrice de classification des risques IA en 4 niveaux (Faible, Modéré, Élevé, Critique) avec critères d'évaluation : autonomie décisionnelle, impact client, exposition réglementaire, complexité technique.",
    risk_level: "faible",
    audit_frequency: "trimestrielle",
    responsible_role: "AI Risk Officer",
    status: "published",
    version: "1.5"
  },
  {
    id: "aig-003",
    policy_name: "Contrôle Qualité des Sorties IA — Quality Gate Framework",
    policy_domain: "controle_qualite",
    iso_42001_reference: "ISO/IEC 42001 §8.1 — Operational Planning and Control",
    description: "Système de 12 quality gates obligatoires avant toute livraison client : cohérence méthodologique, qualité rédactionnelle, conformité réglementaire, exactitude factuelle, ton institutionnel.",
    risk_level: "eleve",
    mitigation_controls: ["Quality Controller AI", "Expert Reviewer simulation", "Score minimum 9.5/10"],
    audit_frequency: "continue",
    responsible_role: "Quality Assurance Director",
    status: "published",
    version: "2.1"
  },
  {
    id: "aig-004",
    policy_name: "Supervision Humaine — Human-in-the-Loop Protocol",
    policy_domain: "supervision_humaine",
    iso_42001_reference: "ISO/IEC 42001 §6.1.4 — Human Oversight",
    description: "Protocole de supervision humaine obligatoire pour tous les agents IA de niveau de risque Élevé ou Critique. Validation humaine obligatoire avant toute communication externe ou décision engageant le cabinet.",
    risk_level: "critique",
    incident_response_procedure: "En cas de défaillance : escalade immédiate au AI Governance Council, gel de l'agent concerné, investigation post-mortem sous 24h.",
    responsible_role: "Managing Partner",
    status: "published",
    version: "1.0"
  }
];

export const automationBlueprints = [
  {
    id: "ab-001",
    automation_name: "Pipeline SEO Quotidien — Crawl + Audit + Correction",
    automation_code: "AUTO-SEO-001",
    trigger_type: "cron",
    trigger_detail: "05:00 UTC quotidien",
    workflow_steps: ["Crawl 42 pages clés", "Analyse Hn + meta + contenu", "Détection liens cassés", "Génération rapport", "Priorisation corrections"],
    estimated_duration_seconds: 180,
    is_critical: false,
    sla_target: 99.5,
    status: "active"
  },
  {
    id: "ab-002",
    automation_name: "Génération Contenu Social Quotidien",
    automation_code: "AUTO-SOC-001",
    trigger_type: "cron",
    trigger_detail: "02:00 UTC quotidien",
    workflow_steps: ["Scan nouveaux articles blog", "Extraction points clés", "Génération 6 posts LinkedIn", "Planification calendrier", "Validation éditoriale"],
    estimated_duration_seconds: 120,
    is_critical: false,
    sla_target: 99.0,
    status: "active"
  },
  {
    id: "ab-003",
    automation_name: "Scan Sécurité OWASP Hebdomadaire",
    automation_code: "AUTO-SEC-001",
    trigger_type: "schedule",
    trigger_detail: "Lundi 06:00 UTC",
    workflow_steps: ["Scan headers HTTP", "Vérification CSP/CORS/HSTS", "Détection vulnérabilités OWASP Top 10", "Génération rapport sécurité", "Plan de remédiation"],
    max_retries: 2,
    is_critical: true,
    sla_target: 99.9,
    status: "active"
  },
  {
    id: "ab-004",
    automation_name: "Pipeline Lead Scoring Prédictif",
    automation_code: "AUTO-CRM-001",
    trigger_type: "event",
    trigger_detail: "Sur événement : nouveau lead ou interaction CRM",
    workflow_steps: ["Capture données lead", "Calcul score prédictif", "Classification MQL/SQL", "Assignation commercial", "Déclenchement séquence email"],
    estimated_duration_seconds: 30,
    is_critical: false,
    sla_target: 99.0,
    status: "active"
  }
];



