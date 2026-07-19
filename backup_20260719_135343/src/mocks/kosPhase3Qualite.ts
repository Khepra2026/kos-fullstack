// KOS Phase 3 Qualité & Documentation™ — Mock Data
// Consortium PwC · Deloitte · EY · KPMG
// Mandat : Exécuter les 8 chantiers de la Phase 3 du Plan Consolidation
// Timeline : 28 Juillet — 7 Août 2026 (Semaine 5-6)
// Objectif : Score d'intégrité 90→95

export const phase3Stats = {
  execution_id: "KOS-PHASE3-QUAL-2026-07-28-001",
  launched_at: "2026-07-28T08:00:00Z",
  target_completion: "2026-08-07T18:00:00Z",
  assessor: "Consortium PwC · Deloitte · EY · KPMG — Quality & Documentation Practice",
  total_chantiers: 8,
  completed: 0,
  in_progress: 2,
  blocked: 0,
  open: 6,
  overall_progress: 8,
  starting_score: 90,
  target_score: 95,
  budget_total: "24 800 000 FCFA",
  budget_spent: "2 200 000 FCFA",
  commander_intent: "Amener le système KOS au niveau d'excellence qualité Big Four. Documentation exhaustive, correction des dettes techniques résiduelles, hardening de la sécurité opérationnelle (JWT, RLS, _headers), optimisation du bundle JS, validation des TJM 2026, finalisation des preuves EcoVadis. Après cette phase, KOS est prêt pour la consolidation finale et le go-live."
};

export const phase3Chantiers = [
  {
    id: "P3Q-001",
    chantier: "Mettre à jour TJM 2025→2026 sur 8 templates de propositions",
    category: "Qualité Production",
    icon: "ri-price-tag-3-line",
    color: "#C2410C",
    priority: "P0",
    severity: "high",
    status: "in_progress",
    progress: 20,
    responsible: "Quality Lead + Finance",
    deadline: "2026-08-01",
    budget: "1 800 000 FCFA",
    kpi: "100% templates alignés TJM 2026 — 0 proposition sous-facturée",
    effort: "3h",
    bloque: "Sous-facturation potentielle de 12% sur les nouvelles propositions — perte estimée 45M FCFA/trimestre",
    description: "Audit complet des 8 templates de propositions utilisés par le Consulting Mission Factory. TJM encore basés sur les tarifs 2025 dans les templates de Strategic Advisory, Due Diligence, Audit Pré-Inspection, Conformité Réglementaire, ESG & Sustainability, Transformation Digitale, Prix de Transfert, et Gouvernance Board. Mise à jour vers la grille tarifaire 2026 approuvée par le COMEX en Janvier. Recalcul des marges projet pour chaque template avec les nouveaux TJM.",
    actions: [
      { id: "P3Q-001-A1", action: "Auditer les 8 templates — identifier toutes les occurrences TJM 2025", status: "completed", owner: "Quality Lead", effort: "30 min" },
      { id: "P3Q-001-A2", action: "Mettre à jour TJM dans 4 templates prioritaires : Strategic Advisory, Due Diligence, Audit BCEAO, Conformité", status: "in_progress", owner: "Quality Lead", effort: "1h" },
      { id: "P3Q-001-A3", action: "Mettre à jour TJM dans 4 templates secondaires : ESG, Transformation Digitale, Prix Transfert, Gouvernance", status: "open", owner: "Quality Lead", effort: "45 min" },
      { id: "P3Q-001-A4", action: "Recalculer marges projet avec nouveaux TJM — vérifier seuils rentabilité COMEX", status: "open", owner: "Finance", effort: "30 min" },
      { id: "P3Q-001-A5", action: "Valider les 8 templates avec Direction Générale — signature électronique", status: "open", owner: "Managing Partner", effort: "15 min" }
    ],
    dependencies: []
  },
  {
    id: "P3Q-002",
    chantier: "Collecter 4 preuves EcoVadis Achats Responsables — score 30→70",
    category: "Certification ESG",
    icon: "ri-leaf-line",
    color: "#4A7A1E",
    priority: "P0",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "ESG Officer + Procurement",
    deadline: "2026-08-07",
    budget: "4 200 000 FCFA",
    kpi: "Score Achats Responsables ≥ 70/100 — EcoVadis Gold (75) devient atteignable Q4",
    effort: "8h",
    bloque: "Notation EcoVadis plafonnée à Argent (42) au lieu de Gold (75) — 4 preuves manquantes sur 10 depuis Q1",
    description: "Collecte et documentation des 4 preuves manquantes pour le domaine Achats Responsables EcoVadis : 1) Politique Achats Responsables formalisée avec critères ESG, 2) Code de conduite fournisseurs signé par 80% des fournisseurs actifs, 3) Évaluation ESG des fournisseurs (matrice à 3 niveaux), 4) Rapport annuel Achats Responsables avec KPIs mesurables. Ces 4 preuves permettront de passer le score Achats Responsables de 30 à 70, débloquant la cible Gold 75 au Q4 2026.",
    actions: [
      { id: "P3Q-002-A1", action: "Rédiger et faire approuver la Politique Achats Responsables — critères ESG (environnement, social, gouvernance)", status: "open", owner: "ESG Officer", effort: "2h" },
      { id: "P3Q-002-A2", action: "Déployer le Code de Conduite Fournisseurs — collecter signatures (cible 80% des 15 fournisseurs)", status: "open", owner: "Procurement", effort: "2h" },
      { id: "P3Q-002-A3", action: "Implémenter la matrice d'évaluation ESG fournisseurs (3 niveaux : Gold/Silver/Bronze)", status: "open", owner: "ESG Officer", effort: "2h" },
      { id: "P3Q-002-A4", action: "Rédiger le Rapport Annuel Achats Responsables avec KPIs (empreinte carbone, diversité, éthique)", status: "open", owner: "ESG Officer", effort: "2h" }
    ],
    dependencies: []
  },
  {
    id: "P3Q-003",
    chantier: "Corriger 4 imports circulaires + éliminer 7 fichiers morts",
    category: "Architecture Code",
    icon: "ri-code-s-slash-line",
    color: "#6B4A3A",
    priority: "P1",
    severity: "medium",
    status: "open",
    progress: 0,
    responsible: "Lead Dev Frontend",
    deadline: "2026-08-03",
    budget: "2 400 000 FCFA",
    kpi: "0 import circulaire — 0 dead file — bundle réduit de 85 KB",
    effort: "6h",
    bloque: "Risque de boucle infinie au runtime — 2 des 4 imports circulaires touchent le Managing Partner Office",
    description: "Résolution des 4 imports circulaires détectés par le scan d'architecture : useManagingPartnerOffice.ts ⇄ useStrategicPlanning.ts, useKOSNotifications.ts ⇄ notificationBell.tsx, useProposalDrafts.ts ⇄ ProposalCreateModal.tsx, useControlTowerData.ts ⇄ ControlTowerDashboard.tsx. Élimination des 7 fichiers morts (legacyDashboard.ts, oldImageOptimizer.ts, 5 fichiers de test). Extraction de la logique partagée dans des fichiers séparés pour découpler les dépendances.",
    actions: [
      { id: "P3Q-003-A1", action: "Résoudre useManagingPartnerOffice ⇄ useStrategicPlanning — extraire shared logic dans usePartnerOfficeShared.ts", status: "open", owner: "Lead Dev Frontend", effort: "2h" },
      { id: "P3Q-003-A2", action: "Résoudre 3 imports circulaires restants — contexte React + refactoring", status: "open", owner: "Lead Dev Frontend", effort: "2h" },
      { id: "P3Q-003-A3", action: "Supprimer 7 fichiers morts (legacyDashboard.ts, oldImageOptimizer.ts, 5 fichiers test)", status: "open", owner: "Lead Dev Frontend", effort: "30 min" },
      { id: "P3Q-003-A4", action: "Build check + test de régression sur 10 pages critiques", status: "open", owner: "Lead Dev Frontend", effort: "30 min" },
      { id: "P3Q-003-A5", action: "Ajouter règle ESLint no-cycle — bloquer les futurs imports circulaires", status: "open", owner: "Lead Dev Frontend", effort: "1h" }
    ],
    dependencies: []
  },
  {
    id: "P3Q-004",
    chantier: "Ajouter JWT verification sur 7 edge functions non protégées",
    category: "Sécurité Opérationnelle",
    icon: "ri-key-2-line",
    color: "#8B3040",
    priority: "P0",
    severity: "critical",
    status: "in_progress",
    progress: 15,
    responsible: "RSSI + DevOps Lead",
    deadline: "2026-08-03",
    budget: "3 600 000 FCFA",
    kpi: "100% edge functions avec JWT verification — 7 endpoints sécurisés",
    effort: "5h",
    bloque: "7 endpoints Supabase exposés sans authentification — surface d'attaque critique pour les données KOS",
    description: "7 edge functions sur les 98 du parc KOS ne sont pas protégées par JWT verification : kos-site-health-check, kos-gsc-monitor, kos-backlink-detect, kos-security-scan, kos-performance-monitor, kos-lead-scoring, kos-social-content-generator. Ces endpoints peuvent être appelés sans authentification, exposant des données de diagnostic, des métriques GSC, des opportunités backlinks, des résultats de scan sécurité, et des scores de leads. Activation du JWT verification obligatoire avec validation du token Supabase.",
    actions: [
      { id: "P3Q-004-A1", action: "Auditer les 7 edge functions — vérifier le niveau d'exposition des données", status: "completed", owner: "RSSI", effort: "30 min" },
      { id: "P3Q-004-A2", action: "Ajouter JWT verification sur kos-site-health-check + kos-gsc-monitor + kos-backlink-detect", status: "open", owner: "DevOps Lead", effort: "2h" },
      { id: "P3Q-004-A3", action: "Ajouter JWT verification sur kos-security-scan + kos-performance-monitor", status: "open", owner: "DevOps Lead", effort: "1h" },
      { id: "P3Q-004-A4", action: "Ajouter JWT verification sur kos-lead-scoring + kos-social-content-generator", status: "open", owner: "DevOps Lead", effort: "1h" },
      { id: "P3Q-004-A5", action: "Test d'appel non authentifié sur les 7 endpoints — vérifier 401 Unauthorized", status: "open", owner: "RSSI", effort: "30 min" }
    ],
    dependencies: []
  },
  {
    id: "P3Q-005",
    chantier: "Activer RLS sur 3 tables Supabase non protégées",
    category: "Sécurité Opérationnelle",
    icon: "ri-shield-check-line",
    color: "#5B21B6",
    priority: "P0",
    severity: "critical",
    status: "open",
    progress: 0,
    responsible: "DevOps Lead + RSSI",
    deadline: "2026-08-03",
    budget: "2 100 000 FCFA",
    kpi: "100% tables Supabase avec RLS activée — 3 tables sécurisées, 0 donnée exposée",
    effort: "3h",
    bloque: "Données sensibles exposées sans contrôle d'accès — monitoring_logs, url_check_results, social_api_tokens",
    description: "3 tables Supabase n'ont pas de Row Level Security (RLS) activée : monitoring_logs (logs d'erreur et métriques exposant la structure interne), url_check_results (historique de vérification d'URLs), social_api_tokens (tokens d'API LinkedIn, X/Twitter). Conception et déploiement de politiques RLS restrictives : authentification obligatoire, accès limité aux rôles admin et service_account, audit trail sur chaque accès.",
    actions: [
      { id: "P3Q-005-A1", action: "Concevoir politiques RLS monitoring_logs — lecture admin only, insertion service_account", status: "open", owner: "DevOps Lead", effort: "45 min" },
      { id: "P3Q-005-A2", action: "Concevoir politiques RLS url_check_results — lecture admin, insertion authenticated", status: "open", owner: "DevOps Lead", effort: "45 min" },
      { id: "P3Q-005-A3", action: "Concevoir politiques RLS social_api_tokens — lecture/écriture admin only, zero lecture publique", status: "open", owner: "RSSI", effort: "45 min" },
      { id: "P3Q-005-A4", action: "Déployer les 3 politiques RLS + test de violation (vérifier blocage accès non authentifié)", status: "open", owner: "DevOps Lead", effort: "45 min" }
    ],
    dependencies: []
  },
  {
    id: "P3Q-006",
    chantier: "Étendre couverture _headers Netlify de 60% à 100% des routes",
    category: "Sécurité Infrastructure",
    icon: "ri-shield-line",
    color: "#C2410C",
    priority: "P0",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "DevOps Lead + Lead Dev Frontend",
    deadline: "2026-08-05",
    budget: "1 600 000 FCFA",
    kpi: "100% routes avec headers sécurité — CSP, HSTS, Permissions-Policy, X-Frame-Options sur chaque page",
    effort: "3h",
    bloque: "40% des pages sans headers de sécurité — incohérence avec l'audit Mozilla Observatory visant 100/100",
    description: "Le fichier public/_headers ne couvre actuellement que 60% des routes (principalement les pages principales et le blog). 40% des pages KOS et outils n'ont pas les headers de sécurité déployés en Phase 2. Extension de la couverture à 100% des routes via des patterns globaux dans _headers : ajout de wildcards pour /kos-*, /tools/*, /services/*, /blog/*, /pillar/*, /geo-hub/*, /lead-magnets/*, /case-studies/* et toutes les routes dynamiques.",
    actions: [
      { id: "P3Q-006-A1", action: "Auditer les 40% de routes sans headers — générer la liste exhaustive", status: "open", owner: "DevOps Lead", effort: "30 min" },
      { id: "P3Q-006-A2", action: "Ajouter wildcards globaux dans _headers : /kos-*, /tools/*, /services/*, /blog/*", status: "open", owner: "DevOps Lead", effort: "1h" },
      { id: "P3Q-006-A3", action: "Ajouter wildcards pour /pillar/*, /geo-hub/*, /lead-magnets/*, /case-studies/*, /regions/*", status: "open", owner: "DevOps Lead", effort: "45 min" },
      { id: "P3Q-006-A4", action: "Vérifier les headers sur 30 URLs tests — Mozilla Observatory batch check", status: "open", owner: "RSSI", effort: "30 min" },
      { id: "P3Q-006-A5", action: "Documenter la matrice de couverture _headers — mise à jour du runbook ops", status: "open", owner: "DevOps Lead", effort: "15 min" }
    ],
    dependencies: []
  },
  {
    id: "P3Q-007",
    chantier: "Réduire bundle JS 1.8MB→800KB — tree shaking + code splitting + lazy loading",
    category: "Performance",
    icon: "ri-flashlight-line",
    color: "#0891B2",
    priority: "P1",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "Lead Dev Frontend",
    deadline: "2026-08-07",
    budget: "5 500 000 FCFA",
    kpi: "Bundle JS gzip ≤ 800 KB — LCP réduit de 1.5s, TBT < 200ms",
    effort: "18h",
    bloque: "Bundle 3× seuil acceptable — LCP +2s sur mobile 3G, TBT > 300ms, impact SEO direct",
    description: "Le bundle JS principal pèse 1.8 MB (gzip 520 KB) — 3× le seuil acceptable pour une SPA. Plan d'optimisation : 1) Tree shaking agressif sur les dépendances (lodash, moment, etc.), 2) Code splitting par route avec React.lazy (déjà partiellement fait mais 12 routes sans prefetch), 3) Élimination du code mort dans les mocks (800+ fichiers, seuls 200 sont réellement utilisés), 4) Mise en place du lazy loading pour les composants lourds (graphiques, cartes, éditeurs), 5) Optimisation des imports (icônes Remix importées individuellement au lieu du bundle complet).",
    actions: [
      { id: "P3Q-007-A1", action: "Analyser le bundle avec rollup-plugin-visualizer — identifier les 10 plus gros modules", status: "open", owner: "Lead Dev Frontend", effort: "1h" },
      { id: "P3Q-007-A2", action: "Tree shaking : remplacer les imports lodash globaux par des imports nommés (lodash/get, lodash/debounce...)", status: "open", owner: "Lead Dev Frontend", effort: "3h" },
      { id: "P3Q-007-A3", action: "Code splitting : ajouter React.lazy + Suspense sur 12 routes sans lazy loading", status: "open", owner: "Lead Dev Frontend", effort: "4h" },
      { id: "P3Q-007-A4", action: "Lazy loading : différer le chargement des composants lourds (DataVisualization, InteractiveChart, WorldMap)", status: "open", owner: "Lead Dev Frontend", effort: "3h" },
      { id: "P3Q-007-A5", action: "Optimiser les imports icônes — remixicon individual imports au lieu du bundle", status: "open", owner: "Lead Dev Frontend", effort: "2h" },
      { id: "P3Q-007-A6", action: "Nettoyer mocks non utilisés — supprimer ou archiver les 600+ fichiers hors du scope actif", status: "open", owner: "Lead Dev Frontend", effort: "3h" },
      { id: "P3Q-007-A7", action: "Build + Lighthouse audit — vérifier bundle gzip ≤ 800 KB, LCP < 2.5s, TBT < 200ms", status: "open", owner: "Lead Dev Frontend", effort: "1h" },
      { id: "P3Q-007-A8", action: "Activer compression Brotli niveau 11 dans Netlify pour les assets statiques", status: "open", owner: "DevOps Lead", effort: "1h" }
    ],
    dependencies: []
  },
  {
    id: "P3Q-008",
    chantier: "Audit qualité complet + Documentation Big Four — préparation Phase 4 Go-Live",
    category: "Qualité & Gouvernance",
    icon: "ri-file-text-line",
    color: "#4F46E5",
    priority: "P0",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "Quality Lead + DPO + Managing Partner",
    deadline: "2026-08-07",
    budget: "3 600 000 FCFA",
    kpi: "Dossier d'audit qualité Big Four complet — 100% des critères go-live documentés",
    effort: "12h",
    bloque: "Sans audit qualité formel, le COMEX ne peut pas valider le go-live Phase 4",
    description: "Production du dossier d'audit qualité complet exigé par le COMEX pour la validation du go-live. Livrables : 1) Rapport de conformité COBAC/BCEAO/GAFI actualisé post-Phases 1-2-3, 2) Matrice de couverture des 10 critères de go-live avec preuves, 3) Documentation opérationnelle des 98 edge functions (catalogue, SLA, procédure de rollback), 4) Runbook de gestion de crise (cyberattaque, panne, perte de données), 5) Plan de formation continue des 12 consultants sur les nouveaux modules, 6) PV de revue COMEX prêt pour signature Phase 4.",
    actions: [
      { id: "P3Q-008-A1", action: "Rédiger le rapport de conformité réglementaire actualisé — COBAC + BCEAO + GAFI + OHADA", status: "open", owner: "Quality Lead", effort: "3h" },
      { id: "P3Q-008-A2", action: "Construire la matrice de couverture des 10 critères go-live — collecter les preuves (captures, logs, rapports)", status: "open", owner: "Quality Lead", effort: "3h" },
      { id: "P3Q-008-A3", action: "Documenter le catalogue des 98 edge functions — SLA, endpoints, procédure rollback", status: "open", owner: "DevOps Lead", effort: "2h" },
      { id: "P3Q-008-A4", action: "Rédiger le runbook de gestion de crise — 4 scénarios (cyberattaque, panne DC, perte données, indisponibilité SaaS)", status: "open", owner: "DPO", effort: "2h" },
      { id: "P3Q-008-A5", action: "Finaliser le plan de formation continue — 12 consultants, calendrier Q3-Q4 2026", status: "open", owner: "Quality Lead", effort: "1h" },
      { id: "P3Q-008-A6", action: "Préparer le PV de revue COMEX — synthèse exécutive, recommandations, résolution go-live", status: "open", owner: "Managing Partner", effort: "1h" }
    ],
    dependencies: ["P3Q-001", "P3Q-004", "P3Q-005", "P3Q-006"]
  }
];

export const phase3ExecutionLog = [
  { timestamp: "2026-07-28T08:00:00Z", event: "Phase 3 lancée — 8 chantiers qualité identifiés, score initial 90/100", type: "milestone", icon: "ri-play-circle-line" },
  { timestamp: "2026-07-28T08:15:00Z", event: "TJM 2025→2026 : audit des 8 templates terminé — 47 occurrences TJM obsolètes identifiées", type: "action", icon: "ri-price-tag-3-line" },
  { timestamp: "2026-07-28T08:45:00Z", event: "JWT edge functions : audit des 7 endpoints non protégés terminé — niveau d'exposition documenté", type: "action", icon: "ri-key-2-line" },
  { timestamp: "2026-07-28T09:30:00Z", event: "Budget Phase 3 engagé : 24 800 000 FCFA — seuil d'alerte configuré à 70%", type: "budget", icon: "ri-money-dollar-circle-line" },
  { timestamp: "2026-07-28T10:00:00Z", event: "Notifications envoyées aux 8 responsables de chantiers — planning Semaine 5-6 confirmé", type: "notification", icon: "ri-notification-3-line" }
];

export const phase3Timeline = {
  start: "2026-07-28",
  end: "2026-08-07",
  weeks: [
    { week: 5, start: "2026-07-28", end: "2026-08-01", label: "Semaine 5 — Qualité & Sécurité Opérationnelle", milestones: ["TJM 2025→2026 mis à jour sur 8 templates", "4 imports circulaires corrigés", "JWT verification activée sur 7 edge functions", "RLS activée sur 3 tables Supabase", "7 fichiers morts supprimés", "_headers couvre 100% routes"] },
    { week: 6, start: "2026-08-03", end: "2026-08-07", label: "Semaine 6 — Documentation & Optimisation", milestones: ["Bundle JS réduit à ≤ 800 KB gzip", "4 preuves EcoVadis collectées et documentées", "Dossier audit qualité Big Four complet", "Matrice couverture 10 critères go-live", "Runbook gestion de crise finalisé", "PV revue COMEX prêt pour signature Phase 4"] }
  ]
};

export const phase3Budget = {
  total: "24 800 000 FCFA",
  spent: "2 200 000 FCFA",
  remaining: "22 600 000 FCFA",
  breakdown: [
    { item: "Mise à jour TJM 8 templates", amount: "1 800 000 FCFA", status: "allocated" },
    { item: "Preuves EcoVadis Achats Responsables", amount: "4 200 000 FCFA", status: "allocated" },
    { item: "Correction imports circulaires + dead files", amount: "2 400 000 FCFA", status: "allocated" },
    { item: "JWT verification 7 edge functions", amount: "3 600 000 FCFA", status: "allocated" },
    { item: "RLS 3 tables Supabase", amount: "2 100 000 FCFA", status: "allocated" },
    { item: "Extension _headers 60%→100% routes", amount: "1 600 000 FCFA", status: "allocated" },
    { item: "Réduction bundle JS 1.8MB→800KB", amount: "5 500 000 FCFA", status: "allocated" },
    { item: "Audit qualité + Documentation Big Four", amount: "3 600 000 FCFA", status: "allocated" }
  ]
};

export const phase3Dependencies = [
  { from: "P3Q-001", to: "P3Q-008", reason: "Audit qualité final doit inclure les templates TJM mis à jour dans la matrice de couverture" },
  { from: "P3Q-004", to: "P3Q-008", reason: "Documentation edge functions (catalogue, SLA) dépend de la sécurisation JWT terminée" },
  { from: "P3Q-005", to: "P3Q-008", reason: "Matrice de couverture go-live inclut la vérification RLS sur toutes les tables" },
  { from: "P3Q-006", to: "P3Q-008", reason: "Runbook gestion de crise doit référencer la couverture _headers 100% comme baseline sécurité" },
  { from: "P3Q-003", to: "P3Q-007", reason: "Réduction bundle JS dépend de la suppression des fichiers morts pour calcul précis" }
];



