// KOS System Integrity Scanner™ — Mock Data
// Consortium PwC · Deloitte · EY · KPMG
// Mandat : Scan intégral du système KOS — Erreurs, Bugs, Tâches Critiques, Tâches Restantes par Bloc
// Objectif : KOS consolidé, 100% en production, KPIs 100% Big Four

export const systemScanStats = {
  scan_id: "KOS-SYS-SCAN-2026-06-19-001",
  scan_date: "2026-06-19T20:00:00Z",
  scan_type: "Intégral — Tous les blocs, tous les fichiers, toutes les dépendances",
  assessor: "Consortium PwC · Deloitte · EY · KPMG — System Integrity Practice",
  global_integrity_score: 76,
  target_score: 100,
  total_files_scanned: 2847,
  total_lines_analyzed: 412850,
  total_errors: 42,
  total_warnings: 108,
  total_bugs: 19,
  total_critical_tasks: 14,
  total_remaining_tasks: 67,
  total_completed_tasks: 523,
  total_blocks_scanned: 12,
  blocks_critical: 3,
  blocks_stable: 5,
  blocks_optimal: 4,
  production_readiness: 76,
  production_target: 100,
  estimated_effort_remaining: "8 semaines (480 heures-homme)",
  budget_remaining: "124 500 000 FCFA",
  go_live_target: "2026-08-15",
  roi_projected: "> 40× (100% production → scaling commercial + certification Big Four complète)"
};

export const integrityByBlock = [
  {
    blockId: "block-gouvernance",
    blockName: "Bloc Gouvernance & Direction",
    icon: "ri-government-line",
    color: "#4F46E5",
    filesCount: 312,
    errors: 2,
    warnings: 8,
    bugs: 1,
    criticalTasks: 1,
    remainingTasks: 5,
    integrityScore: 92,
    status: "optimal",
    description: "Bloc Direction & Stratégie. KOS Managing Partner Office, Board Advisor, Strategic Planning, Executive Communication, Decision Intelligence, Transformation Office. 11 agents, 8 hubs.",
    issues: [
      { id: "GOV-001", type: "warning", title: "ManagingPartnerOffice : 2 imports circulaires détectés", file: "src/hooks/useManagingPartnerOffice.ts", impact: "Risque de boucle infinie au runtime", severity: "medium", status: "open", effort: "30 min" },
      { id: "GOV-002", type: "error", title: "StrategicPlanning : mock data incompatible avec Interface v3", file: "src/mocks/strategicIntelligence.ts", impact: "8 propriétés manquantes — crash si Supabase déconnecté", severity: "high", status: "open", effort: "2h" },
      { id: "GOV-003", type: "warning", title: "ExecutiveCommunication : LinkedIn MDP approuvé mais pipeline vide Q3", file: "N/A — Process", impact: "Perte visibilité DG sur juillet-août", severity: "medium", status: "open", effort: "Process continu" }
    ]
  },
  {
    blockId: "block-qualite-production",
    blockName: "Bloc Qualité & Production",
    icon: "ri-verified-badge-line",
    color: "#5B21B6",
    filesCount: 428,
    errors: 4,
    warnings: 11,
    bugs: 2,
    criticalTasks: 2,
    remainingTasks: 8,
    integrityScore: 85,
    status: "stable",
    description: "Bloc Qualité & Production. Quality Assurance Authority, Expert Reviewer, Humanization Engine, Consulting Factory, Proposal Generator, Methodology Factory, Training Academy. 12 agents, 10 hubs.",
    issues: [
      { id: "QAL-001", type: "error", title: "ConsultingFactory : template COBAC utilise circulaire obsolète R-2016/01", file: "src/mocks/consultingMissionFactory.ts", impact: "Non-conformité réglementaire COBAC sur toutes les propositions", severity: "critical", status: "in_progress", effort: "1h30" },
      { id: "QAL-002", type: "bug", title: "ProposalGenerator : TJM 2025 au lieu de 2026 dans 8 templates", file: "src/mocks/proposalDrafts.ts (estimé)", impact: "Sous-facturation potentielle de 12%", severity: "high", status: "open", effort: "20 min" },
      { id: "QAL-003", type: "error", title: "TrainingAcademy : Module COBAC R-2024/01 inexistant", file: "N/A — Contenu manquant", impact: "Formation obligatoire non disponible pour 12 consultants", severity: "high", status: "open", effort: "8h" },
      { id: "QAL-004", type: "warning", title: "QualityAssurance : check #7 — 2 documents sans référence BCEAO précise", file: "N/A — Process", impact: "Risque de rejet auditeur externe", severity: "medium", status: "open", effort: "15 min" },
      { id: "QAL-005", type: "bug", title: "HumanizationEngine : score compréhension 9.5 mais détection jargon OHADA manquante", file: "src/hooks/useQualityExcellence.ts (estimé)", impact: "Rapports juridiques non humanisés", severity: "low", status: "open", effort: "3h" }
    ]
  },
  {
    blockId: "block-seo-visibilite",
    blockName: "Bloc SEO, GEO & Visibilité",
    icon: "ri-globe-line",
    color: "#0891B2",
    filesCount: 385,
    errors: 3,
    warnings: 9,
    bugs: 1,
    criticalTasks: 1,
    remainingTasks: 6,
    integrityScore: 90,
    status: "optimal",
    description: "Bloc SEO, GEO & Visibilité. SEO + AEO Command, AI Visibility, GSC Command, Backlink Intelligence, Social Media Command, SEO Autopilot, GEO Visibility, Institutional Visibility, Schema Markup, Performance SEO. 11 agents, 15 hubs.",
    issues: [
      { id: "SEO-001", type: "error", title: "GEOVisibility : 3 pages non crawlées par Gemini — Google-Extended bot non autorisé", file: "public/robots.txt", impact: "Invisibilité sur Gemini (20% du marché AI search)", severity: "high", status: "open", effort: "15 min" },
      { id: "SEO-002", type: "error", title: "llms-full.txt : sections OHADA absentes — 800+ lignes invisibles pour LLMs", file: "public/llms-full.txt", impact: "Couverture réglementaire OHADA invisible pour ChatGPT/Claude/Perplexity", severity: "high", status: "open", effort: "20 min" },
      { id: "SEO-003", type: "warning", title: "BacklinkIntelligence : 3 domaines liens cassés (404) non nettoyés", file: "Base de données Supabase", impact: "DA pénalisé de 2 points", severity: "medium", status: "open", effort: "1h" },
      { id: "SEO-004", type: "warning", title: "SocialMediaCommand : LinkedIn MDP approuvé mais 0 posts programmés juillet", file: "N/A — Pipeline éditorial", impact: "Trou de visibilité LinkedIn juillet 2026", severity: "medium", status: "open", effort: "Process continu" }
    ]
  },
  {
    blockId: "block-securite-conformite",
    blockName: "Bloc Sécurité & Conformité",
    icon: "ri-shield-flash-line",
    color: "#C2410C",
    filesCount: 296,
    errors: 5,
    warnings: 14,
    bugs: 3,
    criticalTasks: 3,
    remainingTasks: 9,
    integrityScore: 72,
    status: "critical",
    description: "Bloc Sécurité & Conformité. Enterprise Security, Regulatory Compliance, Legal Compliance, AI Governance, Risk Engine, Internal Control, Due Diligence, ESG Sustainability, Cyber Security, Policy & Governance. 10 agents, 8 hubs.",
    issues: [
      { id: "SEC-001", type: "error", title: "EnterpriseSecurity : Permissions-Policy header absent sur toutes les pages", file: "netlify.toml / _headers", impact: "APIs navigateur non restreintes — surface d'attaque étendue", severity: "critical", status: "open", effort: "15 min" },
      { id: "SEC-002", type: "error", title: "EnterpriseSecurity : CSP header totalement absent", file: "netlify.toml / _headers", impact: "Aucune protection XSS — vulnérabilité critique OWASP", severity: "critical", status: "open", effort: "2h" },
      { id: "SEC-003", type: "bug", title: "RegulatoryCompliance : Alerte COBAC R-2024/01 — formation non planifiée pour 8 consultants", file: "N/A — Process formation", impact: "Non-conformité COBAC en cas d'inspection", severity: "critical", status: "open", effort: "30 min" },
      { id: "SEC-004", type: "error", title: "RiskEngine : Plan mitigation cyber référence ISO 27001:2013 (obsolète)", file: "src/mocks/riskDiligence.ts", impact: "Audit ISO 27001:2022 échouera sur ce point", severity: "high", status: "open", effort: "1h" },
      { id: "SEC-005", type: "bug", title: "DueDiligenceEngine : Checklist ESG — ISSB S1/S2 manquants", file: "src/mocks/riskDiligence.ts", impact: "Due diligences non conformes ISSB 2026", severity: "high", status: "open", effort: "2h" },
      { id: "SEC-006", type: "warning", title: "PolicyGovernance : Politique télétravail 2024 non mise à jour (3 pays)", file: "Documents internes", impact: "Non-conformité RH CEMAC/UEMOA", severity: "low", status: "open", effort: "3h" }
    ]
  },
  {
    blockId: "block-data-intelligence",
    blockName: "Bloc Data & Intelligence",
    icon: "ri-bar-chart-box-line",
    color: "#9B7B2C",
    filesCount: 342,
    errors: 3,
    warnings: 10,
    bugs: 2,
    criticalTasks: 2,
    remainingTasks: 7,
    integrityScore: 78,
    status: "stable",
    description: "Bloc Data & Intelligence. KPI Tower, Data Analytics, Process Mining, Organizational Intelligence, Model Evaluation, Market Intelligence, Competitive Intelligence, Tender Intelligence, Forecasting, Scenario Simulator, Research Institute. 11 agents, 10 hubs.",
    issues: [
      { id: "DAT-001", type: "error", title: "ProcessMining : Workflow Proposition — goulot Revue Associé 48h vs 24h cible", file: "N/A — Process métier", impact: "60% des propositions retardées — perte de deals estimée 280M FCFA", severity: "critical", status: "open", effort: "Optimisation 2j" },
      { id: "DAT-002", type: "error", title: "ResearchInstitute : Baromètre Inclusion Financière — 15j de retard", file: "N/A — Publication", impact: "Publication flagship BCEAO manquée — crédibilité institutionnelle", severity: "critical", status: "in_progress", effort: "1 sem." },
      { id: "DAT-003", type: "bug", title: "CompetitiveIntelligence : pricing Deloitte Afrique obsolète (Q4 2025)", file: "Base de données Supabase", impact: "Décisions pricing basées sur données périmées", severity: "high", status: "open", effort: "1h" },
      { id: "DAT-004", type: "warning", title: "ModelEvaluation : Lead Scoring drift 8% détecté — recalibrage requis", file: "Supabase edge function", impact: "Précision scoring dégradée de 8%", severity: "medium", status: "open", effort: "2h" }
    ]
  },
  {
    blockId: "block-croissance-crm",
    blockName: "Bloc Croissance & CRM",
    icon: "ri-rocket-line",
    color: "#4A7A1E",
    filesCount: 278,
    errors: 4,
    warnings: 12,
    bugs: 2,
    criticalTasks: 2,
    remainingTasks: 8,
    integrityScore: 74,
    status: "stable",
    description: "Bloc Croissance & CRM. Growth Engine, Lead Scoring, Client Success, Pipeline Analytics, Email Funnel, MQL Nurturing, Reputation Authority, Social Automation, Blog Writing, Closing Intelligence. 10 agents, 8 hubs.",
    issues: [
      { id: "CRM-001", type: "error", title: "SocialAutomation : LinkedIn MDP — approbation en attente depuis 60j", file: "N/A — Process LinkedIn", impact: "Automatisation posts LinkedIn bloquée — 0 posts programmables", severity: "critical", status: "open", effort: "Suivi LinkedIn" },
      { id: "CRM-002", type: "error", title: "ReputationAuthority : Citations académiques -5% vs T1 2026", file: "N/A — Stratégie contenu", impact: "Baisse d'autorité académique — impact DA", severity: "high", status: "open", effort: "Plan thought leadership" },
      { id: "CRM-003", type: "bug", title: "ClientSuccess : 3 clients corporate sans contact Q2 2026", file: "Base de données Supabase", impact: "Risque de churn — 185M FCFA de MRR menacé", severity: "high", status: "open", effort: "15 min" },
      { id: "CRM-004", type: "warning", title: "EmailFunnel : séquence nurturing lead froid non A/B testée", file: "Supabase edge function", impact: "Taux ouverture sous-optimal sur segment froid", severity: "low", status: "open", effort: "4h" }
    ]
  },
  {
    blockId: "block-infrastructure",
    blockName: "Bloc Infrastructure & Automatisation",
    icon: "ri-cpu-line",
    color: "#86BC25",
    filesCount: 310,
    errors: 5,
    warnings: 8,
    bugs: 2,
    criticalTasks: 1,
    remainingTasks: 6,
    integrityScore: 82,
    status: "stable",
    description: "Bloc Infrastructure & Automatisation. Control Tower, Automaton Engine, Multi-Agent Orchestrator, Self-Improvement, Autonomous PMO, Digital Twin, Web Operations, Fullstack Dev, Resource Command, Auto-Task Orchestrator. 10 agents, 7 hubs.",
    issues: [
      { id: "INF-001", type: "error", title: "ControlTower : Taux utilisation consultants 77% — sous seuil 80%", file: "N/A — Métriques opérationnelles", impact: "Perte de marge brute estimée 32M FCFA/trimestre", severity: "high", status: "open", effort: "Analyse 1j" },
      { id: "INF-002", type: "bug", title: "WebOperations : 12 images >5 Mo non converties en WebP — convertisseur bloqué", file: "public/images/", impact: "LCP dégradé de 1.5s sur 8 pages", severity: "high", status: "in_progress", effort: "2h" },
      { id: "INF-003", type: "error", title: "SelfImprovement : Boucle Conversion Leads progresse 3× moins vite que les autres", file: "Supabase edge function", impact: "Amélioration continue ralentie sur le funnel commercial", severity: "medium", status: "open", effort: "Diagnostic 4h" },
      { id: "INF-004", type: "warning", title: "DigitalTwin : Twin Contrôle Interne 82% — sous seuil 85% Big Four", file: "Supabase edge function", impact: "Précision prédictive insuffisante pour certification", severity: "medium", status: "in_progress", effort: "Recalibration 3j" },
      { id: "INF-005", type: "warning", title: "ResourceCommand : Director BU1 à 92% allocation — seuil burnout 85%", file: "N/A — RH", impact: "Risque burnout direction — impact 3 BUs", severity: "medium", status: "open", effort: "Plan recrutement" }
    ]
  },
  {
    blockId: "block-compliance-security-cert",
    blockName: "Bloc Conformité & Certification (KYC/LCB/FT/ISO)",
    icon: "ri-scales-3-line",
    color: "#8B3040",
    filesCount: 215,
    errors: 4,
    warnings: 9,
    bugs: 3,
    criticalTasks: 2,
    remainingTasks: 7,
    integrityScore: 65,
    status: "critical",
    description: "Bloc Conformité & Certification. KYC/CDD, LCB/FT, CEMAC/BCEAO/COBAC/OHADA, ISO 27001 SMSI. 6 procédures KYC, cartographie 3 juridictions, 12 documents SMSI, 8 risques évalués. Hub Compliance Security Certification.",
    issues: [
      { id: "CSC-001", type: "error", title: "KYC/CDD : Procédure #4 (Personnes Politiquement Exposées) — seuil détection 65% vs 90% GAFI", file: "src/mocks/complianceSecurityCertification.ts", impact: "Risque LCB/FT — non-conformité GAFI Recommandation 12", severity: "critical", status: "open", effort: "3h" },
      { id: "CSC-002", type: "error", title: "LCB/FT : Cartographie CEMAC — score 58/100, gap réglementaire COBAC R-2023/05 non couvert", file: "src/mocks/complianceSecurityCertification.ts", impact: "Risque de sanction COBAC en cas d'inspection", severity: "critical", status: "open", effort: "5h" },
      { id: "CSC-003", type: "bug", title: "ISO 27001 : 2 documents SMSI (PCA, SDLC sécurisé) à l'état brouillon — bloquent certification", file: "Documents internes", impact: "Certification ISO 27001 impossible sans ces documents", severity: "high", status: "in_progress", effort: "16h" },
      { id: "CSC-004", type: "bug", title: "CEMAC : Registre BE COBAC non synchronisé avec CENTIF+ANIF", file: "N/A — Process double circuit", impact: "Double déclaration non automatisée", severity: "high", status: "open", effort: "4h" },
      { id: "CSC-005", type: "warning", title: "Alignement BCEAO : score 72/100 — 3 gaps non résolus sur les ratios prudentiels", file: "src/mocks/complianceSecurityCertification.ts", impact: "Non-conformité partielle instruction 008-2015", severity: "medium", status: "open", effort: "6h" }
    ]
  },
  {
    blockId: "block-esg-sustainability",
    blockName: "Bloc ESG & Durabilité",
    icon: "ri-leaf-line",
    color: "#4A7A1E",
    filesCount: 198,
    errors: 3,
    warnings: 7,
    bugs: 1,
    criticalTasks: 0,
    remainingTasks: 5,
    integrityScore: 80,
    status: "stable",
    description: "Bloc ESG & Sustainability. Bilan Carbone, EcoVadis, Rapport Durabilité GRI/ISSB, Dashboard ESG exécutif, Plan ESG. Hub ESG Sustainability Command.",
    issues: [
      { id: "ESG-001", type: "error", title: "Bilan Carbone : Scope 3 — données transport non actualisées depuis Q1 2026", file: "src/mocks/eSGSustainabilityCommand.ts", impact: "Sous-estimation Scope 3 de 18%", severity: "high", status: "open", effort: "3h" },
      { id: "ESG-002", type: "error", title: "EcoVadis : Domaine Achats Responsables — score 30/68, 4 preuves manquantes sur 10", file: "src/mocks/eSGSustainabilityCommand.ts", impact: "Score EcoVadis plafonné à Argent (42) au lieu de Gold (75)", severity: "high", status: "open", effort: "5h" },
      { id: "ESG-003", type: "warning", title: "Rapport Durabilité : Chapitres 5-8 planifiés mais non initiés (auteurs non assignés)", file: "N/A — Organisation", impact: "Publication 31 Décembre 2026 compromise", severity: "medium", status: "open", effort: "Process continu" },
      { id: "ESG-004", type: "bug", title: "Dashboard ESG : KPI #12 (taux recyclage) — données non disponibles pour 3 bureaux", file: "N/A — Collecte données", impact: "Dashboard incomplet pour le COMEX", severity: "low", status: "open", effort: "2h" }
    ]
  },
  {
    blockId: "block-digital-performance",
    blockName: "Bloc Performance Digitale (CWV/OWASP/SOC2)",
    icon: "ri-speed-line",
    color: "#9B7B2C",
    filesCount: 165,
    errors: 6,
    warnings: 12,
    bugs: 2,
    criticalTasks: 3,
    remainingTasks: 8,
    integrityScore: 48,
    status: "critical",
    description: "Bloc Performance Digitale. Core Web Vitals (LCP 4.8s), OWASP Top 10 (28 vulns, 3 critiques), SOC 2 Readiness (42/100), Reporting Interactif. Hub Digital Performance Command.",
    issues: [
      { id: "DPF-001", type: "error", title: "CWV : LCP 4.8s — 89 images non optimisées (WebP manquant)", file: "public/images/ + src/components/", impact: "Performance Google 'Poor' — impact SEO direct", severity: "critical", status: "in_progress", effort: "12h" },
      { id: "DPF-002", type: "error", title: "OWASP : 3 vulnérabilités critiques non corrigées (IDOR API, SQL injection, XSS reflété)", file: "src/pages/ + edge functions", impact: "Risque de brèche de sécurité — télédéclaration COBAC J+2 obligatoire", severity: "critical", status: "in_progress", effort: "15h" },
      { id: "DPF-003", type: "error", title: "SOC 2 : 25 politiques non adoptées — blocage Test of Design", file: "Documents internes", impact: "Certification SOC 2 repoussée à 2028", severity: "critical", status: "open", effort: "40h" },
      { id: "DPF-004", type: "bug", title: "CSP header absent — WAF non configuré en production", file: "netlify.toml", impact: "Score OWASP bloqué à 55/100", severity: "high", status: "open", effort: "4h" },
      { id: "DPF-005", type: "warning", title: "npm audit : 12 high + 3 critical vulnérabilités dépendances", file: "package.json", impact: "Surface d'attaque élargie via supply chain", severity: "high", status: "open", effort: "3h" },
      { id: "DPF-006", type: "warning", title: "React DevTools activé en production", file: "vite.config.ts", impact: "Exposition code source + état application", severity: "medium", status: "open", effort: "10 min" }
    ]
  },
  {
    blockId: "block-code-architecture",
    blockName: "Bloc Architecture Code & Dépendances",
    icon: "ri-code-s-slash-line",
    color: "#6B4A3A",
    filesCount: 2847,
    errors: 3,
    warnings: 8,
    bugs: 0,
    criticalTasks: 1,
    remainingTasks: 3,
    integrityScore: 88,
    status: "optimal",
    description: "Scan architecture du code source. Imports circulaires, dead code, TypeScript strict, taille bundle, code splitting, lazy loading, cohérence StyleSystem, routes orphelines.",
    issues: [
      { id: "ARC-001", type: "error", title: "Bundle JS principal : 1.8 MB (gzip 520 KB) — 3× seuil acceptable", file: "Build output", impact: "LCP +2s sur mobile 3G, TBT > 300ms", severity: "high", status: "open", effort: "24h" },
      { id: "ARC-002", type: "error", title: "12 routes lazy-loadées mais sans prefetch — First paint ralenti", file: "src/router/modules/*.tsx", impact: "Navigation inter-page +800ms en moyenne", severity: "medium", status: "open", effort: "4h" },
      { id: "ARC-003", type: "warning", title: "3 fichiers > 1000 lignes (digitalPerformanceCommand.ts: 1144, page.tsx: 1062, globalAgentScanAgents.ts: 500+)", file: "src/mocks/ + src/pages/", impact: "Maintenabilité dégradée, risque de régression", severity: "medium", status: "open", effort: "8h" },
      { id: "ARC-004", type: "warning", title: "StyleSystem : 8 composants utilisent encore des couleurs hex hardcodées", file: "src/components/base/StatCard.tsx + 7 others", impact: "Incohérence visuelle si thème changé", severity: "low", status: "open", effort: "2h" }
    ]
  },
  {
    blockId: "block-operations-production",
    blockName: "Bloc Opérations & Production Go-Live",
    icon: "ri-server-line",
    color: "#C2410C",
    filesCount: 118,
    errors: 3,
    warnings: 8,
    bugs: 1,
    criticalTasks: 1,
    remainingTasks: 5,
    integrityScore: 68,
    status: "stable",
    description: "Bloc Opérations & Mise en Production. Déploiement CI/CD, monitoring, alerting, backups, DR, cron jobs, edge functions, Supabase health, Netlify config.",
    issues: [
      { id: "OPS-001", type: "error", title: "Cron tender-scraper : 3 échecs silencieux sur 7j — pas d'alerting configuré", file: "Supabase edge function: tender-scraper", impact: "Perte de 15 AO potentiels non détectés", severity: "high", status: "in_progress", effort: "2h" },
      { id: "OPS-002", type: "error", title: "Edge functions : 7 sur 98 n'ont pas de JWT verification", file: "supabase/functions/*/index.ts", impact: "Endpoints exposés sans authentification", severity: "high", status: "open", effort: "3h" },
      { id: "OPS-003", type: "warning", title: "Monitoring : Pas de synthetic monitoring CWV 24/7", file: "N/A — Infra", impact: "Régressions performance non détectées avant les utilisateurs", severity: "medium", status: "open", effort: "6h" },
      { id: "OPS-004", type: "bug", title: "Netlify : _headers fichier ne couvre que 60% des routes", file: "public/_headers", impact: "Headers sécurité absents sur 40% des pages", severity: "high", status: "open", effort: "1h" },
      { id: "OPS-005", type: "warning", title: "Supabase : RLS manquante sur 3 tables (monitoring_logs, url_check_results, social_api_tokens)", file: "Supabase DB", impact: "Données exposées sans contrôle d'accès", severity: "medium", status: "open", effort: "1h" }
    ]
  }
];

export const criticalTasks = [
  { id: "CRIT-001", block: "Bloc Conformité & Certification", task: "Corriger KYC/CDD #4 : seuil détection PPE 65%→90% (GAFI R.12)", priority: "P0", severity: "critical", responsible: "Compliance Officer", deadline: "2026-07-01", budget: "2 500 000 FCFA", kpi: "Conformité GAFI R.12 = 100%", dependencies: [], status: "open", effort: "3h" },
  { id: "CRIT-002", block: "Bloc Conformité & Certification", task: "Cartographie LCB/FT CEMAC : intégrer COBAC R-2023/05 — score 58→85", priority: "P0", severity: "critical", responsible: "Compliance Officer + Juridique", deadline: "2026-07-15", budget: "4 800 000 FCFA", kpi: "Score CEMAC ≥ 85/100", dependencies: [], status: "open", effort: "5h" },
  { id: "CRIT-003", block: "Bloc Performance Digitale", task: "Corriger 3 vulnérabilités OWASP critiques (IDOR API, SQL injection, XSS)", priority: "P0", severity: "critical", responsible: "RSSI + Lead Dev Backend", deadline: "2026-07-15", budget: "6 800 000 FCFA", kpi: "0 vulnérabilités Critical/High OWASP", dependencies: [], status: "in_progress", effort: "15h" },
  { id: "CRIT-004", block: "Bloc Performance Digitale", task: "Déployer CSP + WAF Cloudflare Pro — score OWASP 55→80", priority: "P0", severity: "critical", responsible: "RSSI + DevOps", deadline: "2026-07-31", budget: "12 000 000 FCFA", kpi: "Score OWASP ≥ 80/100", dependencies: ["CRIT-003"], status: "open", effort: "6h" },
  { id: "CRIT-005", block: "Bloc Performance Digitale", task: "Rédiger et faire adopter 25 politiques SOC 2 par le COMEX", priority: "P0", severity: "critical", responsible: "RSSI + DPO + Juridique", deadline: "2026-12-31", budget: "18 000 000 FCFA", kpi: "25 politiques adoptées COMEX", dependencies: [], status: "open", effort: "40h" },
  { id: "CRIT-006", block: "Bloc Sécurité & Conformité", task: "Déployer CSP + Permissions-Policy + HSTS preload sur toutes les routes", priority: "P0", severity: "critical", responsible: "RSSI + Lead Dev Frontend", deadline: "2026-07-31", budget: "2 800 000 FCFA", kpi: "Score Mozilla Observatory 100/100", dependencies: ["CRIT-004"], status: "open", effort: "3h" },
  { id: "CRIT-007", block: "Bloc Data & Intelligence", task: "ProcessMining : optimiser goulot Revue Associé (48h→24h) — 60% propositions retardées", priority: "P0", severity: "critical", responsible: "Lead Data Engineer + COO", deadline: "2026-07-15", budget: "5 200 000 FCFA", kpi: "Délai revue associé ≤ 24h, 100% propositions on-time", dependencies: [], status: "open", effort: "16h" },
  { id: "CRIT-008", block: "Bloc Data & Intelligence", task: "ResearchInstitute : finaliser et publier Baromètre Inclusion Financière (15j retard)", priority: "P0", severity: "critical", responsible: "Research Director", deadline: "2026-07-07", budget: "3 500 000 FCFA", kpi: "Publication effective + communiqué BCEAO", dependencies: [], status: "in_progress", effort: "40h" },
  { id: "CRIT-009", block: "Bloc Sécurité & Conformité", task: "Plan mitigation cyber : migrer ISO 27001:2013→2022 dans tous les documents", priority: "P1", severity: "high", responsible: "RSSI", deadline: "2026-07-31", budget: "1 500 000 FCFA", kpi: "100% docs référencent ISO 27001:2022", dependencies: [], status: "open", effort: "3h" },
  { id: "CRIT-010", block: "Bloc Qualité & Production", task: "ConsultingFactory : migrer template COBAC R-2016/01→R-2024/01", priority: "P0", severity: "critical", responsible: "Quality Lead + Juridique", deadline: "2026-07-01", budget: "1 200 000 FCFA", kpi: "100% templates conformes COBAC 2024", dependencies: [], status: "in_progress", effort: "1h30" },
  { id: "CRIT-011", block: "Bloc Qualité & Production", task: "TrainingAcademy : créer module formation COBAC R-2024/01", priority: "P0", severity: "high", responsible: "Training Director + Compliance", deadline: "2026-07-15", budget: "3 800 000 FCFA", kpi: "12 consultants formés, certification COBAC 2024", dependencies: ["CRIT-010"], status: "open", effort: "8h" },
  { id: "CRIT-012", block: "Bloc ESG & Durabilité", task: "EcoVadis : collecter 4 preuves Achats Responsables manquantes (score 30→70)", priority: "P1", severity: "high", responsible: "ESG Officer + Procurement", deadline: "2026-08-15", budget: "4 200 000 FCFA", kpi: "Score Achats Responsables ≥ 70/100", dependencies: [], status: "open", effort: "5h" },
  { id: "CRIT-013", block: "Bloc Croissance & CRM", task: "SocialAutomation : débloquer approbation LinkedIn MDP (60j d'attente)", priority: "P0", severity: "critical", responsible: "Marketing Director", deadline: "2026-07-01", budget: "500 000 FCFA", kpi: "LinkedIn MDP actif, 1er post programmé", dependencies: [], status: "open", effort: "Suivi LinkedIn" },
  { id: "CRIT-014", block: "Bloc Architecture Code", task: "Réduire bundle JS : tree shaking agressif + code splitting + dead code elimination (1.8MB→500KB)", priority: "P1", severity: "high", responsible: "Lead Dev Frontend", deadline: "2026-08-31", budget: "6 000 000 FCFA", kpi: "Bundle JS gzip ≤ 500 KB, LCP -1.5s", dependencies: [], status: "open", effort: "24h" }
];

export const remainingTasksByBlock = [
  {
    blockId: "block-gouvernance",
    blockName: "Gouvernance & Direction",
    tasks: [
      { id: "REM-GOV-01", title: "StrategicPlanning : corriger mock data — 8 propriétés manquantes pour Interface v3", priority: "P1", effort: "2h", status: "open", type: "code" },
      { id: "REM-GOV-02", title: "ManagingPartnerOffice : résoudre 2 imports circulaires useManagingPartnerOffice.ts", priority: "P1", effort: "30 min", status: "open", type: "code" },
      { id: "REM-GOV-03", title: "ExecutiveCommunication : remplir pipeline éditorial DG juillet-août (8 posts)", priority: "P1", effort: "4h", status: "open", type: "content" },
      { id: "REM-GOV-04", title: "TransformationOffice : plan rattrapage programme Cloud-Native (3 sem. retard)", priority: "P0", effort: "2 sem.", status: "open", type: "project" },
      { id: "REM-GOV-05", title: "PublicSectorAdvisor : livrer diagnostic Sénégal Fiscal (2 sem. retard)", priority: "P0", effort: "5 jours", status: "open", type: "project" }
    ]
  },
  {
    blockId: "block-qualite-production",
    blockName: "Qualité & Production",
    tasks: [
      { id: "REM-QAL-01", title: "ProposalGenerator : mettre à jour TJM 2025→2026 dans 8 templates", priority: "P1", effort: "20 min", status: "open", type: "data" },
      { id: "REM-QAL-02", title: "QualityAssurance : corriger 2 références BCEAO imprécises (check #7)", priority: "P2", effort: "15 min", status: "open", type: "content" },
      { id: "REM-QAL-03", title: "ServiceInnovation : finaliser business model SaaS Conformité (lancement Q3)", priority: "P1", effort: "2 sem.", status: "open", type: "project" },
      { id: "REM-QAL-04", title: "KnowledgeManager : capitaliser cas PT-2025-003 (contentieux BEPS)", priority: "P2", effort: "3h", status: "open", type: "content" },
      { id: "REM-QAL-05", title: "KnowledgeMonetization : lancer abonnement premium (pricing validé COMEX)", priority: "P1", effort: "3 sem.", status: "open", type: "project" },
      { id: "REM-QAL-06", title: "CorrectionEngine : débloquer WebP converter sur 12 images >5 Mo", priority: "P1", effort: "2h", status: "in_progress", type: "code" },
      { id: "REM-QAL-07", title: "HumanizationEngine : ajouter détection jargon OHADA", priority: "P2", effort: "3h", status: "open", type: "code" },
      { id: "REM-QAL-08", title: "TrainingAcademy : créer module COBAC R-2024/01 (12 consultants)", priority: "P0", effort: "8h", status: "open", type: "content" }
    ]
  },
  {
    blockId: "block-seo-visibilite",
    blockName: "SEO, GEO & Visibilité",
    tasks: [
      { id: "REM-SEO-01", title: "GEOVisibility : ajouter Google-Extended bot dans robots.txt", priority: "P1", effort: "15 min", status: "open", type: "config" },
      { id: "REM-SEO-02", title: "LLMsGenerator : ajouter sections OHADA dans llms-full.txt (800+ lignes)", priority: "P1", effort: "20 min", status: "open", type: "content" },
      { id: "REM-SEO-03", title: "BacklinkIntelligence : nettoyer 3 liens 404 de la DB Supabase", priority: "P2", effort: "1h", status: "open", type: "data" },
      { id: "REM-SEO-04", title: "SocialMediaCommand : programmer 30 posts LinkedIn juillet 2026", priority: "P1", effort: "12h", status: "open", type: "content" },
      { id: "REM-SEO-05", title: "AI Visibility : vérifier indexation llms.txt par 11 AI crawlers", priority: "P2", effort: "3h", status: "open", type: "config" },
      { id: "REM-SEO-06", title: "PerformanceSEO : audit Core Web Vitals post-correction (LCP cible <2.5s)", priority: "P1", effort: "4h", status: "open", type: "audit" }
    ]
  },
  {
    blockId: "block-securite-conformite",
    blockName: "Sécurité & Conformité",
    tasks: [
      { id: "REM-SEC-01", title: "EnterpriseSecurity : ajouter Permissions-Policy header dans _headers", priority: "P0", effort: "15 min", status: "open", type: "config" },
      { id: "REM-SEC-02", title: "EnterpriseSecurity : configurer CSP niveau strict (default-src 'self')", priority: "P0", effort: "2h", status: "open", type: "config" },
      { id: "REM-SEC-03", title: "RegulatoryCompliance : planifier formation COBAC R-2024/01", priority: "P0", effort: "30 min", status: "open", type: "process" },
      { id: "REM-SEC-04", title: "RiskEngine : migrer références ISO 27001:2013→2022", priority: "P1", effort: "1h", status: "open", type: "content" },
      { id: "REM-SEC-05", title: "DueDiligence : ajouter ISSB S1/S2 dans checklist ESG", priority: "P1", effort: "2h", status: "open", type: "content" },
      { id: "REM-SEC-06", title: "PolicyGovernance : mettre à jour politique télétravail (3 pays CEMAC/UEMOA)", priority: "P2", effort: "3h", status: "open", type: "content" },
      { id: "REM-SEC-07", title: "AI Governance : préparer audit externe ISO 42001 (pré-audit validé)", priority: "P1", effort: "16h", status: "open", type: "project" },
      { id: "REM-SEC-08", title: "CyberSecurity : lancer pentest externe trimestriel Q3", priority: "P1", effort: "Contrat externe", status: "open", type: "project" },
      { id: "REM-SEC-09", title: "ESG Sustainability : mettre à jour données Scope 3 transport (Q2 2026)", priority: "P1", effort: "3h", status: "open", type: "data" }
    ]
  },
  {
    blockId: "block-data-intelligence",
    blockName: "Data & Intelligence",
    tasks: [
      { id: "REM-DAT-01", title: "ProcessMining : optimiser goulot Revue Associé 48h→24h", priority: "P0", effort: "16h", status: "open", type: "process" },
      { id: "REM-DAT-02", title: "ResearchInstitute : publier Baromètre Inclusion Financière", priority: "P0", effort: "40h", status: "in_progress", type: "project" },
      { id: "REM-DAT-03", title: "CompetitiveIntelligence : actualiser pricing Deloitte Afrique Q1 2026", priority: "P2", effort: "1h", status: "open", type: "data" },
      { id: "REM-DAT-04", title: "ModelEvaluation : recalibrer Lead Scoring (drift 8%)", priority: "P1", effort: "2h", status: "open", type: "code" },
      { id: "REM-DAT-05", title: "MarketIntelligence : finaliser plan GTM 3 pays post-retrait KPMG", priority: "P1", effort: "40h", status: "open", type: "strategy" },
      { id: "REM-DAT-06", title: "ForecastingEngine : améliorer confiance prévision Q3 (72%→80%)", priority: "P2", effort: "1h", status: "open", type: "data" },
      { id: "REM-DAT-07", title: "ScenarioSimulator : actualiser données PIB avec FMI avril 2026", priority: "P2", effort: "30 min", status: "open", type: "data" }
    ]
  },
  {
    blockId: "block-croissance-crm",
    blockName: "Croissance & CRM",
    tasks: [
      { id: "REM-CRM-01", title: "SocialAutomation : débloquer LinkedIn MDP (60j attente)", priority: "P0", effort: "Suivi LinkedIn", status: "open", type: "process" },
      { id: "REM-CRM-02", title: "ReputationAuthority : lancer plan thought leadership (citations -5%)", priority: "P1", effort: "Plan continu", status: "open", type: "strategy" },
      { id: "REM-CRM-03", title: "ClientSuccess : contacter 3 clients sans contact Q2 (risque churn 185M)", priority: "P1", effort: "15 min", status: "open", type: "process" },
      { id: "REM-CRM-04", title: "EmailFunnel : A/B tester séquence nurturing lead froid", priority: "P2", effort: "4h", status: "open", type: "code" },
      { id: "REM-CRM-05", title: "BlogWriting : maintenir cadence 30 articles/mois juillet-août", priority: "P1", effort: "40h/mois", status: "open", type: "content" },
      { id: "REM-CRM-06", title: "LeadScoring : vérifier Next Best Action sur 12 leads chauds", priority: "P2", effort: "2h", status: "open", type: "audit" },
      { id: "REM-CRM-07", title: "GrowthEngine : relancer lead #GRW-007 (285M FCFA)", priority: "P1", effort: "30 min", status: "open", type: "process" },
      { id: "REM-CRM-08", title: "MQLNurturing : optimiser séquence conversion 15%→18%", priority: "P2", effort: "8h", status: "open", type: "code" }
    ]
  },
  {
    blockId: "block-infrastructure",
    blockName: "Infrastructure & Automatisation",
    tasks: [
      { id: "REM-INF-01", title: "ControlTower : analyser sous-utilisation consultants (77%) → plan réallocation", priority: "P1", effort: "8h", status: "open", type: "analysis" },
      { id: "REM-INF-02", title: "WebOperations : convertir 12 images >5 Mo en WebP", priority: "P1", effort: "2h", status: "in_progress", type: "code" },
      { id: "REM-INF-03", title: "SelfImprovement : diagnostiquer lenteur boucle Conversion Leads", priority: "P2", effort: "4h", status: "open", type: "analysis" },
      { id: "REM-INF-04", title: "DigitalTwin : recalibrer Twin Contrôle Interne 82%→85%+", priority: "P2", effort: "24h", status: "in_progress", type: "code" },
      { id: "REM-INF-05", title: "ResourceCommand : planifier recrutement pour Director BU1 (92% allocation)", priority: "P1", effort: "Process RH", status: "open", type: "process" },
      { id: "REM-INF-06", title: "AutonomousPMO : structurer jalons projet Bureau Douala", priority: "P2", effort: "2h", status: "open", type: "project" }
    ]
  },
  {
    blockId: "block-compliance-security-cert",
    blockName: "Conformité & Certification",
    tasks: [
      { id: "REM-CSC-01", title: "KYC #4 : améliorer détection PPE 65%→90% (GAFI R.12)", priority: "P0", effort: "3h", status: "open", type: "code" },
      { id: "REM-CSC-02", title: "LCB/FT CEMAC : intégrer COBAC R-2023/05 (score 58→85)", priority: "P0", effort: "5h", status: "open", type: "content" },
      { id: "REM-CSC-03", title: "ISO 27001 : finaliser documents SMSI PCA + SDLC sécurisé", priority: "P1", effort: "16h", status: "in_progress", type: "content" },
      { id: "REM-CSC-04", title: "CEMAC : synchroniser registre BE COBAC ⇄ CENTIF+ANIF", priority: "P1", effort: "4h", status: "open", type: "code" },
      { id: "REM-CSC-05", title: "BCEAO : résoudre 3 gaps ratios prudentiels (instruction 008-2015)", priority: "P2", effort: "6h", status: "open", type: "content" },
      { id: "REM-CSC-06", title: "ÉcoVadis : collecter 4 preuves Achats Responsables", priority: "P1", effort: "5h", status: "open", type: "data" },
      { id: "REM-CSC-07", title: "Rapport Durabilité : assigner auteurs chapitres 5-8", priority: "P2", effort: "Process", status: "open", type: "process" }
    ]
  },
  {
    blockId: "block-digital-performance",
    blockName: "Performance Digitale",
    tasks: [
      { id: "REM-DPF-01", title: "CWV : convertir 89 images en WebP + responsive + lazy loading", priority: "P0", effort: "12h", status: "in_progress", type: "code" },
      { id: "REM-DPF-02", title: "OWASP : corriger IDOR API (CVSS 8.6)", priority: "P0", effort: "5h", status: "in_progress", type: "code" },
      { id: "REM-DPF-03", title: "OWASP : corriger XSS reflété barre de recherche", priority: "P0", effort: "4h", status: "open", type: "code" },
      { id: "REM-DPF-04", title: "SOC 2 : rédiger 25 politiques (0/25)", priority: "P0", effort: "40h", status: "open", type: "content" },
      { id: "REM-DPF-05", title: "Déployer CDN Cloudflare Pro + Brotli compression", priority: "P1", effort: "6h", status: "open", type: "infra" },
      { id: "REM-DPF-06", title: "npm audit fix : résoudre 15 vulnérabilités (12 high + 3 critical)", priority: "P1", effort: "3h", status: "open", type: "code" },
      { id: "REM-DPF-07", title: "Désactiver React DevTools en production", priority: "P2", effort: "10 min", status: "open", type: "config" },
      { id: "REM-DPF-08", title: "Implémenter Critical CSS inline pour above-the-fold", priority: "P1", effort: "8h", status: "open", type: "code" }
    ]
  },
  {
    blockId: "block-code-architecture",
    blockName: "Architecture Code",
    tasks: [
      { id: "REM-ARC-01", title: "Réduire bundle JS 1.8MB→500KB (tree shaking + code splitting)", priority: "P1", effort: "24h", status: "open", type: "code" },
      { id: "REM-ARC-02", title: "Ajouter prefetch sur 12 routes lazy-loadées", priority: "P2", effort: "4h", status: "open", type: "code" },
      { id: "REM-ARC-03", title: "Splitter 3 fichiers >1000 lignes (2 mocks + 1 page)", priority: "P2", effort: "8h", status: "open", type: "code" },
      { id: "REM-ARC-04", title: "Migrer 8 composants couleurs hex→StyleSystem tokens", priority: "P2", effort: "2h", status: "open", type: "code" }
    ]
  },
  {
    blockId: "block-operations-production",
    blockName: "Opérations & Production",
    tasks: [
      { id: "REM-OPS-01", title: "Cron tender-scraper : corriger échecs silencieux + ajouter alerting", priority: "P1", effort: "2h", status: "in_progress", type: "code" },
      { id: "REM-OPS-02", title: "Edge functions : ajouter JWT verification sur 7 endpoints non protégés", priority: "P1", effort: "3h", status: "open", type: "code" },
      { id: "REM-OPS-03", title: "Déployer synthetic monitoring CWV 24/7 (Datadog/Grafana)", priority: "P2", effort: "6h", status: "open", type: "infra" },
      { id: "REM-OPS-04", title: "Netlify _headers : couvrir 100% des routes (actuellement 60%)", priority: "P1", effort: "1h", status: "open", type: "config" },
      { id: "REM-OPS-05", title: "Supabase : activer RLS sur 3 tables non protégées", priority: "P1", effort: "1h", status: "open", type: "config" }
    ]
  },
  {
    blockId: "block-esg-sustainability",
    blockName: "ESG & Durabilité",
    tasks: [
      { id: "REM-ESG-01", title: "Bilan Carbone : actualiser données Scope 3 transport Q2 2026", priority: "P1", effort: "3h", status: "open", type: "data" },
      { id: "REM-ESG-02", title: "EcoVadis : collecter 4 preuves Achats Responsables (30→70)", priority: "P1", effort: "5h", status: "open", type: "data" },
      { id: "REM-ESG-03", title: "Rapport Durabilité : initier chapitres 5-8 + assigner auteurs", priority: "P1", effort: "Process continu", status: "open", type: "process" },
      { id: "REM-ESG-04", title: "Dashboard ESG : collecter données recyclage 3 bureaux manquants", priority: "P2", effort: "2h", status: "open", type: "data" },
      { id: "REM-ESG-05", title: "Notation EcoVadis : préparer soumission Q3 2026 (cible Gold 75)", priority: "P1", effort: "8h", status: "open", type: "project" }
    ]
  }
];

export const architectureIssues = {
  total_files: 2847,
  total_lines: 412850,
  typescript_errors: 0,
  typescript_warnings: 24,
  eslint_errors: 0,
  eslint_warnings: 86,
  circular_deps: 4,
  dead_files: 7,
  orphan_routes: 2,
  oversized_files: 3,
  findings: [
    { id: "ARC-001", type: "circular_dep", title: "useManagingPartnerOffice.ts ⇄ useStrategicPlanning.ts", severity: "medium", impact: "Risque boucle infinie — bundle size +15%", recommendation: "Extraire logique partagée dans un 3ème fichier" },
    { id: "ARC-002", type: "circular_dep", title: "useKOSNotifications.ts ⇄ notificationBell.tsx", severity: "low", impact: "Code splitting inefficace", recommendation: "Utiliser un contexte React pour découpler" },
    { id: "ARC-003", type: "dead_file", title: "src/mocks/legacyDashboard.ts — non importé depuis 4 versions", severity: "low", impact: "Bundle gonflé de 45 KB inutiles", recommendation: "Supprimer ou archiver" },
    { id: "ARC-004", type: "dead_file", title: "src/utils/oldImageOptimizer.ts — remplacé par imageWebP.ts", severity: "low", impact: "Bundle gonflé de 12 KB", recommendation: "Supprimer" },
    { id: "ARC-005", type: "dead_file", title: "5 fichiers de test laissés dans src/ (vitest non configuré)", severity: "low", impact: "Bundle gonflé de 28 KB", recommendation: "Déplacer vers __tests__ ou supprimer" },
    { id: "ARC-006", type: "orphan_route", title: "/kos-legacy-dashboard — route définie mais page supprimée", severity: "medium", impact: "404 silencieux si navigation", recommendation: "Supprimer route ou restaurer page" },
    { id: "ARC-007", type: "orphan_route", title: "/admin/old-panel — redirige vers /admin mais pas de 301", severity: "low", impact: "SEO : duplicate content potentiel", recommendation: "Ajouter redirect 301" },
    { id: "ARC-008", type: "oversized", title: "digitalPerformanceCommand.ts : 1144 lignes", severity: "medium", impact: "Maintenabilité — risque régression élevé", recommendation: "Splitter en 3 fichiers : cwv.ts, owasp.ts, soc2.ts" },
    { id: "ARC-009", type: "oversized", title: "digitalPerformanceCommand/page.tsx : 1062 lignes", severity: "medium", impact: "Temps de compilation +40% sur ce fichier", recommendation: "Splitter en sous-composants par onglet" },
    { id: "ARC-010", type: "style_inconsistency", title: "8 composants avec couleurs hex hardcodées (pas StyleSystem)", severity: "low", impact: "Thème non cohérent si palette changée", recommendation: "Migrer vers oklch(var(--token))" }
  ]
};

export const productionGoLivePlan = {
  target_date: "2026-08-15",
  current_readiness: 76,
  phases: [
    {
      phase: 1, name: "Correction Urgences (P0)", period: "Semaine 1-2 (19 Juin — 3 Juillet)",
      actions: [
        "Corriger 3 vulnérabilités OWASP critiques (IDOR, SQLi, XSS)",
        "Migrer template COBAC R-2016→R-2024/01",
        "Corriger KYC/CDD #4 — détection PPE 65%→90%",
        "Débloquer LinkedIn MDP (60j attente)",
        "Optimiser goulot Revue Associé 48h→24h",
        "Publier Baromètre Inclusion Financière (15j retard)",
        "Corriger cartographie LCB/FT CEMAC — intégrer COBAC R-2023/05",
        "Créer module formation COBAC R-2024/01"
      ],
      targetScore: 85,
      budget: "28 400 000 FCFA"
    },
    {
      phase: 2, name: "Sécurisation & Performance", period: "Semaine 3-4 (7 — 21 Juillet)",
      actions: [
        "Déployer CSP + WAF Cloudflare Pro",
        "Convertir 89 images en WebP + CDN",
        "Configurer Permissions-Policy + HSTS preload",
        "Corriger npm audit (15 vulnérabilités)",
        "Ajouter Google-Extended bot + OHADA sections llms.txt",
        "Finaliser documents SMSI PCA + SDLC sécurisé",
        "Planifier pentest externe Q3"
      ],
      targetScore: 90,
      budget: "32 100 000 FCFA"
    },
    {
      phase: 3, name: "Qualité & Documentation", period: "Semaine 5-6 (28 Juillet — 7 Août)",
      actions: [
        "Mettre à jour TJM 2025→2026 (8 templates)",
        "Collecter preuves EcoVadis Achats Responsables",
        "Corriger imports circulaires (2 fichiers)",
        "Ajouter JWT verification sur 7 edge functions",
        "Activer RLS sur 3 tables Supabase non protégées",
        "Couvrir 100% routes dans _headers Netlify",
        "Réduire bundle JS 1.8MB→800KB (première passe)"
      ],
      targetScore: 95,
      budget: "24 800 000 FCFA"
    },
    {
      phase: 4, name: "Consolidation & Go-Live", period: "Semaine 7-8 (11 — 15 Août)",
      actions: [
        "Audit final Core Web Vitals (cible LCP <2.5s)",
        "Audit final OWASP (cible 0 vulns Critical/High)",
        "Test DR + PCA (RTO 4h, RPO 1h)",
        "Vérification 100% routes indexées Google",
        "Déploiement synthetic monitoring 24/7",
        "Revue COMEX Go-Live : validation KOS 100% Production",
        "Activation mode 'Production Certified' sur tous les hubs"
      ],
      targetScore: 100,
      budget: "27 200 000 FCFA"
    }
  ],
  goLiveCriteria: [
    "0 vulnérabilités OWASP Critical/High",
    "LCP p75 < 2.5s sur desktop + mobile 4G",
    "Score Mozilla Observatory ≥ 95/100",
    "100% edge functions avec JWT verification",
    "100% tables Supabase avec RLS activée",
    "RLS activée sur toutes les tables Supabase",
    "100% templates conformes COBAC/BCEAO",
    "Pipeline éditorial LinkedIn 30 posts/mois actif",
    "Bundle JS gzip ≤ 800 KB",
    "Tous les hubs répondent en < 3s (TTFB < 1s)"
  ]
};

export const quarterlyKPIs = {
  globalTrajectory: [
    { kpi: "Score Intégrité Système Global", initial: 76, q3_2026: 92, q4_2026: 98, q1_2027: 100, cible: 100 },
    { kpi: "Erreurs Critiques Ouvertes", initial: 14, q3_2026: 3, q4_2026: 0, q1_2027: 0, cible: 0 },
    { kpi: "Bugs Non Résolus", initial: 19, q3_2026: 5, q4_2026: 2, q1_2027: 0, cible: 0 },
    { kpi: "Tâches Restantes Totales", initial: 67, q3_2026: 25, q4_2026: 8, q1_2027: 0, cible: 0 },
    { kpi: "Score OWASP Global", initial: 55, q3_2026: 82, q4_2026: 92, q1_2027: 98, cible: 98 },
    { kpi: "Core Web Vitals (LCP p75)", initial: "4.8s", q3_2026: "2.8s", q4_2026: "2.2s", q1_2027: "1.8s", cible: "≤2.5s" },
    { kpi: "Production Readiness", initial: "76%", q3_2026: "92%", q4_2026: "98%", q1_2027: "100%", cible: "100%" }
  ],
  summary: {
    totalBudget: "124 500 000 FCFA",
    timeline: "19 Juin — 15 Août 2026 (8 semaines)",
    teamSize: "12 personnes (RSSI, 3 Lead Devs, 2 DevOps, Compliance, DPO, Juridique, 3 Contenus)",
    criticalPath: [
      "Correction OWASP + CSP/WAF (bloque tout déploiement sécurisé)",
      "Template COBAC R-2024/01 (bloque conformité réglementaire)",
      "25 politiques SOC 2 (bloque certification)"
    ]
  }
};





