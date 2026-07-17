// KOS Phase 4 Go-Live & Production™ — Mock Data
// Consortium PwC · Deloitte · EY · KPMG
// Mandat : Exécuter les 8 chantiers de la Phase 4 du Plan Consolidation
// Timeline : 11 — 22 Août 2026 (Semaine 7-8)
// Objectif : Score d'intégrité 95→100 — MISE EN PRODUCTION

export const phase4Stats = {
  execution_id: "KOS-PHASE4-GOLIVE-2026-08-11-001",
  launched_at: "2026-08-11T08:00:00Z",
  target_completion: "2026-08-22T18:00:00Z",
  assessor: "Consortium PwC · Deloitte · EY · KPMG — Go-Live & Production Practice",
  total_chantiers: 8,
  completed: 0,
  in_progress: 1,
  blocked: 0,
  open: 7,
  overall_progress: 6,
  starting_score: 95,
  target_score: 100,
  budget_total: "21 300 000 FCFA",
  budget_spent: "1 100 000 FCFA",
  commander_intent: "Propulser KOS en production le 22 Août 2026. Exécuter le snapshot système complet, certifier les 12 consultants sur les nouveaux modules, déployer en production avec canary release, obtenir la signature COMEX du PV go-live, activer le monitoring post-production, communiquer en interne et externe, et clôturer la Phase 4 avec la rétrospective. Score d'intégrité 100/100. KOS est VIVANT."
};

export const phase4Chantiers = [
  {
    id: "P4G-001",
    chantier: "Snapshot système complet — Git + Base de données + 98 Edge Functions",
    category: "Infrastructure",
    icon: "ri-camera-line",
    color: "#2563EB",
    priority: "P0",
    severity: "critical",
    status: "in_progress",
    progress: 30,
    responsible: "DevOps Lead + Lead Dev Frontend",
    deadline: "2026-08-14",
    budget: "3 200 000 FCFA",
    kpi: "Snapshot complet validé — Git tag v4.0.0, dump DB chiffré, 98 edge functions versionnées — rollback < 15 min",
    effort: "5h",
    bloque: "Sans snapshot, aucun rollback n'est possible en cas d'incident post-go-live — risque existentiel",
    description: "Création d'un snapshot système complet figé avant le go-live : 1) Git tag v4.0.0 avec message signé GPG incluant le hash SHA-256 de tous les artifacts, 2) Dump complet de la base de données Supabase (toutes les tables, RLS, politiques) chiffré AES-256 et stocké dans un vault sécurisé, 3) Versionnage des 98 edge functions avec leurs configurations (JWT, secrets, variables d'environnement), 4) Génération du manifest de déploiement (SHA-256 de chaque fichier statique), 5) Test de rollback complet (restauration snapshot → vérification intégrité → build).",
    actions: [
      { id: "P4G-001-A1", action: "Créer le Git tag v4.0.0 avec message signé GPG + SHA-256 artifacts", status: "completed", owner: "DevOps Lead", effort: "30 min" },
      { id: "P4G-001-A2", action: "Dump complet DB Supabase — chiffrement AES-256 — stockage vault sécurisé", status: "in_progress", owner: "DevOps Lead", effort: "1h" },
      { id: "P4G-001-A3", action: "Versionner les 98 edge functions — snapshot config (JWT, secrets, env vars)", status: "open", owner: "DevOps Lead", effort: "1h30" },
      { id: "P4G-001-A4", action: "Générer le manifest de déploiement — SHA-256 chaque fichier statique", status: "open", owner: "Lead Dev Frontend", effort: "45 min" },
      { id: "P4G-001-A5", action: "Test de rollback complet — restaurer snapshot → vérifier intégrité → build", status: "open", owner: "DevOps Lead", effort: "1h15" }
    ],
    dependencies: []
  },
  {
    id: "P4G-002",
    chantier: "Formation certifiante des 12 consultants — modules Phase 1-2-3-4",
    category: "Formation",
    icon: "ri-graduation-cap-line",
    color: "#7C3AED",
    priority: "P0",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "Quality Lead + Learning Officer",
    deadline: "2026-08-19",
    budget: "4 500 000 FCFA",
    kpi: "12/12 consultants certifiés KOS v4.0 — score moyen ≥ 85/100 au test final",
    effort: "12h",
    bloque: "Consultants non formés sur les nouveaux modules = incapacité opérationnelle à exploiter KOS en production",
    description: "Programme de formation intensive pour les 12 consultants Khepra Experts sur l'ensemble des nouveaux modules déployés durant les Phases 1-2-3. 4 modules : Module 1 — Urgences P0 corrigées (OWASP, COBAC, KYC, LinkedIn), Module 2 — Sécurité & Performance (CSP, WAF, WebP, Headers), Module 3 — Qualité & Documentation (JWT, RLS, TJM, EcoVadis, Bundle), Module 4 — Procédures Opérationnelles Go-Live (runbook crise, rollback, monitoring, escalation). Certification finale avec test pratique de 45 questions.",
    actions: [
      { id: "P4G-002-A1", action: "Concevoir les 4 modules de formation — supports PDF, exercices pratiques, vidéos", status: "open", owner: "Learning Officer", effort: "4h" },
      { id: "P4G-002-A2", action: "Organiser 4 sessions de formation (2j intensif) — Module 1+2 le 15/08, Module 3+4 le 16/08", status: "open", owner: "Quality Lead", effort: "2h" },
      { id: "P4G-002-A3", action: "Administrer le test de certification — 45 questions, seuil 85/100", status: "open", owner: "Learning Officer", effort: "2h" },
      { id: "P4G-002-A4", action: "Remédiation individuelle pour les consultants sous le seuil — sessions 1:1", status: "open", owner: "Quality Lead", effort: "3h" },
      { id: "P4G-002-A5", action: "Émettre les 12 certificats KOS v4.0 — signature électronique Managing Partner", status: "open", owner: "Managing Partner", effort: "1h" }
    ],
    dependencies: ["P4G-001"]
  },
  {
    id: "P4G-003",
    chantier: "Migration finale Netlify → Production — DNS, SSL, redirects 301, CDN purgé",
    category: "Déploiement",
    icon: "ri-rocket-2-line",
    color: "#DC2626",
    priority: "P0",
    severity: "critical",
    status: "open",
    progress: 0,
    responsible: "DevOps Lead + CTO",
    deadline: "2026-08-20",
    budget: "2 800 000 FCFA",
    kpi: "Déploiement production zéro-downtime — 0 erreur 5xx, 100% redirects vérifiés, CDN purgé, SSL A+",
    effort: "6h",
    bloque: "Toute erreur de migration = site down = perte de crédibilité + leads + SEO cumulé 12 mois",
    description: "Bascule finale du site en production avec stratégie canary release : 1) Vérification DNS — propagation complète sur les 4 nameservers, 2) Déploiement Netlify production branch (main) avec rollback automatique si healthcheck échoue, 3) Vérification exhaustive des 312 redirects 301/302 (pas de chaîne, pas de boucle), 4) Purge complète du CDN Netlify + invalidation cache navigateur via versioned assets, 5) Test SSL — Qualys SSL Labs score A+ minimum, 6) Smoke test sur 50 URLs critiques (home, services, blog, tools, kos-*, geo-hub, case-studies).",
    actions: [
      { id: "P4G-003-A1", action: "Vérification DNS — propagation nameservers, TTL 300s, aucun enregistrement orphelin", status: "open", owner: "DevOps Lead", effort: "45 min" },
      { id: "P4G-003-A2", action: "Déployer Netlify production branch main — canary 10% → 50% → 100% avec healthcheck", status: "open", owner: "DevOps Lead", effort: "2h" },
      { id: "P4G-003-A3", action: "Vérifier 312 redirects 301/302 — script automatisé (pas de chaîne, pas de boucle, pas de 404)", status: "open", owner: "Lead Dev Frontend", effort: "1h" },
      { id: "P4G-003-A4", action: "Purge CDN Netlify + invalidation cache navigateur — versioned assets (v4.0.0)", status: "open", owner: "DevOps Lead", effort: "30 min" },
      { id: "P4G-003-A5", action: "Test SSL Qualys Labs — cible score A+ — vérifier HSTS, CSP, CAA record", status: "open", owner: "RSSI", effort: "30 min" },
      { id: "P4G-003-A6", action: "Smoke test 50 URLs critiques — lighthouse mobile + desktop, 0 erreur 5xx", status: "open", owner: "CTO", effort: "1h15" }
    ],
    dependencies: ["P4G-001"]
  },
  {
    id: "P4G-004",
    chantier: "PV de revue COMEX — Résolution formelle go-live KOS v4.0",
    category: "Gouvernance",
    icon: "ri-pen-nib-line",
    color: "#059669",
    priority: "P0",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "Managing Partner + DPO + Quality Lead",
    deadline: "2026-08-21",
    budget: "1 500 000 FCFA",
    kpi: "PV COMEX signé par 100% des membres — résolution go-live adoptée à l'unanimité",
    effort: "4h",
    bloque: "Sans résolution COMEX, le go-live n'a pas de base légale — risque de contestation ultérieure",
    description: "Préparation et signature du Procès-Verbal de la réunion extraordinaire du COMEX autorisant le go-live KOS v4.0. Contenu : 1) Rappel des 4 phases du Plan Consolidation (P0→100 en 8 semaines), 2) Présentation des résultats : 76→100, 8 urgences corrigées, 7 chantiers sécurité déployés, 8 chantiers qualité validés, audit Big Four complété, 3) Matrice de couverture des 10 critères go-live tous validés, 4) Résolution : autorisation de mise en production au 22 Août 2026, 5) Désignation du comité de surveillance post-go-live (48h, 7j, 30j).",
    actions: [
      { id: "P4G-004-A1", action: "Rédiger le projet de PV COMEX — synthèse des 4 phases, résultats, matrice couverture", status: "open", owner: "Quality Lead", effort: "2h" },
      { id: "P4G-004-A2", action: "Revue juridique du PV — conformité statuts Khepra Experts, OHADA, droit des sociétés", status: "open", owner: "DPO", effort: "45 min" },
      { id: "P4G-004-A3", action: "Circuler le PV aux 5 membres COMEX — recueillir commentaires, intégrer amendements", status: "open", owner: "Managing Partner", effort: "45 min" },
      { id: "P4G-004-A4", action: "Signature électronique certifiée — 5 membres COMEX — horodatage blockchain", status: "open", owner: "Managing Partner", effort: "30 min" }
    ],
    dependencies: ["P4G-001", "P4G-003"]
  },
  {
    id: "P4G-005",
    chantier: "Communication interne & externe — Annonce go-live KOS v4.0",
    category: "Communication",
    icon: "ri-megaphone-line",
    color: "#F59E0B",
    priority: "P1",
    severity: "medium",
    status: "open",
    progress: 0,
    responsible: "Communication Lead + Managing Partner",
    deadline: "2026-08-22",
    budget: "1 800 000 FCFA",
    kpi: "100% des parties prenantes informées — note interne, communiqué presse, LinkedIn, newsletter clients",
    effort: "5h",
    bloque: "Un go-live non communiqué est un go-live ignoré — perte d'opportunité de visibilité et crédibilité",
    description: "Stratégie de communication multicanal pour le go-live : 1) Note interne aux 12 consultants + COMEX — brief exécutif, nouvelles capacités KOS, procédures opérationnelles, 2) Communiqué de presse — Khepra Experts annonce KOS v4.0, le premier Knowledge Operating System certifié Big Four en Afrique francophone, 3) Publication LinkedIn — carrousel 5 slides (trajectoire 76→100, chiffres clés, témoignages), 4) Newsletter clients — annonce des nouvelles capacités (diagnostic flash, due diligence automatisée, conformité temps réel), 5) Mise à jour du site web — bannière 'KOS v4.0 — GO LIVE 22 AOÛT 2026', page press kit.",
    actions: [
      { id: "P4G-005-A1", action: "Rédiger la note interne consultants + COMEX — brief exécutif, nouvelles capacités, procédures", status: "open", owner: "Communication Lead", effort: "1h" },
      { id: "P4G-005-A2", action: "Rédiger le communiqué de presse — 400 mots, format AFP, citations Managing Partner", status: "open", owner: "Communication Lead", effort: "2h" },
      { id: "P4G-005-A3", action: "Créer le carrousel LinkedIn 5 slides — design, chiffres clés, témoignages", status: "open", owner: "Communication Lead", effort: "1h" },
      { id: "P4G-005-A4", action: "Rédiger la newsletter clients — 300 mots, CTA diagnostic gratuit, segmentation par industrie", status: "open", owner: "Communication Lead", effort: "30 min" },
      { id: "P4G-005-A5", action: "Mettre à jour le site web — bannière go-live, page press kit /media/kos-v4", status: "open", owner: "Lead Dev Frontend", effort: "30 min" }
    ],
    dependencies: ["P4G-004"]
  },
  {
    id: "P4G-006",
    chantier: "Activation monitoring post-go-live — Dashboards, alerting, SLA 99.5%",
    category: "Opérations",
    icon: "ri-radar-line",
    color: "#0891B2",
    priority: "P0",
    severity: "critical",
    status: "open",
    progress: 0,
    responsible: "DevOps Lead + RSSI + CTO",
    deadline: "2026-08-22",
    budget: "3 500 000 FCFA",
    kpi: "Monitoring 24/7 activé — 0 incident non détecté en 48h post-go-live, SLA 99.5%",
    effort: "6h",
    bloque: "Sans monitoring, un incident post-go-live peut passer inaperçu pendant des heures = pertes financières + image",
    description: "Activation du dispositif de monitoring post-production complet : 1) Dashboard temps réel (Grafana) — uptime, temps de réponse, erreurs 4xx/5xx, traffic, Core Web Vitals, 2) Alerting multicanal (Slack + email + SMS) — seuils : temps réponse > 2s, taux erreur > 1%, CPU > 80%, 3) Healthcheck automatisé toutes les 60s sur 20 endpoints critiques, 4) Log aggregation — centralisation des logs Netlify + Supabase + Edge Functions dans un tableau de bord unique, 5) SLA contractuel 99.5% — calcul automatique avec rapport hebdomadaire, 6) Procédure d'escalade — N1 (DevOps on-call, 15 min), N2 (CTO, 30 min), N3 (Managing Partner, 60 min).",
    actions: [
      { id: "P4G-006-A1", action: "Configurer dashboard Grafana — uptime, latence, erreurs, traffic, CWV", status: "open", owner: "DevOps Lead", effort: "2h" },
      { id: "P4G-006-A2", action: "Configurer alerting multicanal — Slack + email + SMS — 8 seuils critiques", status: "open", owner: "DevOps Lead", effort: "1h" },
      { id: "P4G-006-A3", action: "Déployer healthcheck automatisé 60s — 20 endpoints critiques avec test fonctionnel", status: "open", owner: "DevOps Lead", effort: "1h30" },
      { id: "P4G-006-A4", action: "Centraliser logs Netlify + Supabase + Edge Functions — dashboard unique", status: "open", owner: "CTO", effort: "1h" },
      { id: "P4G-006-A5", action: "Documenter procédure d'escalade N1→N2→N3 — numéros astreinte, runbook crise", status: "open", owner: "RSSI", effort: "30 min" }
    ],
    dependencies: ["P4G-003"]
  },
  {
    id: "P4G-007",
    chantier: "Tests de charge + Scénarios catastrophe — Résilience production validée",
    category: "Qualité Production",
    icon: "ri-shield-flash-line",
    color: "#DC2626",
    priority: "P0",
    severity: "critical",
    status: "open",
    progress: 0,
    responsible: "CTO + DevOps Lead + RSSI",
    deadline: "2026-08-21",
    budget: "2 800 000 FCFA",
    kpi: "Tenue de charge 10 000 utilisateurs simultanés — p95 < 2s — 4 scénarios catastrophe réussis",
    effort: "8h",
    bloque: "Sans test de charge, impossible de garantir la stabilité en production — crash potentiel jour J",
    description: "Validation de la résilience production par des tests de charge et des simulations de pannes : 1) Test de charge progressif — 100 → 1 000 → 5 000 → 10 000 utilisateurs simultanés avec k6, vérification p95 < 2s, 2) Scénario catastrophe A — Panne Supabase : basculement automatique vers le cache statique, site toujours accessible, 3) Scénario catastrophe B — Attaque DDoS L7 : activation automatique WAF Cloudflare, rate limiting, 4) Scénario catastrophe C — Corruption CDN : rollback automatique vers version précédente, 5) Scénario catastrophe D — Pic trafic 50 000 utilisateurs (stress test) : auto-scaling Netlify, aucune erreur 5xx.",
    actions: [
      { id: "P4G-007-A1", action: "Test de charge k6 — 100→10K utilisateurs, vérifier p95 < 2s, 0 erreur", status: "open", owner: "CTO", effort: "3h" },
      { id: "P4G-007-A2", action: "Scénario A — Panne Supabase : basculement cache statique, site OK", status: "open", owner: "DevOps Lead", effort: "1h30" },
      { id: "P4G-007-A3", action: "Scénario B — DDoS L7 simulé : déclenchement WAF, rate limiting OK", status: "open", owner: "RSSI", effort: "1h" },
      { id: "P4G-007-A4", action: "Scénario C — Corruption CDN : rollback auto v3.9, vérification intégrité", status: "open", owner: "DevOps Lead", effort: "1h" },
      { id: "P4G-007-A5", action: "Scénario D — Pic 50K utilisateurs : auto-scaling, 0 erreur 5xx", status: "open", owner: "CTO", effort: "1h30" }
    ],
    dependencies: ["P4G-001", "P4G-003"]
  },
  {
    id: "P4G-008",
    chantier: "Rétrospective Big Four + Clôture administrative Phase 4 — Leçons apprises + Plan maintenance",
    category: "Gouvernance",
    icon: "ri-book-open-line",
    color: "#4F46E5",
    priority: "P1",
    severity: "medium",
    status: "open",
    progress: 0,
    responsible: "Managing Partner + Quality Lead + CTO",
    deadline: "2026-08-22",
    budget: "1 200 000 FCFA",
    kpi: "Rapport de rétrospective livré — 100% des leçons documentées — plan maintenance Q3-Q4 approuvé",
    effort: "4h",
    bloque: "Sans rétrospective, les erreurs se répètent. Sans plan maintenance, KOS se dégrade.",
    description: "Clôture formelle du Plan Consolidation : 1) Rétrospective Big Four — analyse des 4 phases (ce qui a marché, ce qui a échoué, les surprises, les leçons), 2) Compilation du rapport final KOS v4.0 (76→100 en 8 semaines, 4 phases, 31 chantiers, 136 actions, budget total ~106M FCFA), 3) Plan de maintenance Q3-Q4 2026 — mises à jour réglementaires, correctifs sécurité, optimisation continue, 4) Clôture administrative — libération des budgets non utilisés, archivage des livrables, évaluation des prestataires, 5) Cérémonie de célébration d'équipe — reconnaissance des 12 consultants + 4 leads + Managing Partner.",
    actions: [
      { id: "P4G-008-A1", action: "Animer la rétrospective Big Four — 2h, format Start/Stop/Continue, tous les leads", status: "open", owner: "Managing Partner", effort: "2h" },
      { id: "P4G-008-A2", action: "Compiler le rapport final KOS v4.0 — 31 chantiers, 136 actions, budget 106M FCFA", status: "open", owner: "Quality Lead", effort: "1h" },
      { id: "P4G-008-A3", action: "Élaborer le plan de maintenance Q3-Q4 2026 — calendrier, responsables, budget", status: "open", owner: "CTO", effort: "30 min" },
      { id: "P4G-008-A4", action: "Clôture administrative — libération budgets, archivage livrables, évaluation prestataires", status: "open", owner: "Quality Lead", effort: "20 min" },
      { id: "P4G-008-A5", action: "Cérémonie de célébration — 12 consultants, 4 leads, Managing Partner — KOS v4.0 est VIVANT", status: "open", owner: "Managing Partner", effort: "10 min" }
    ],
    dependencies: ["P4G-001", "P4G-002", "P4G-003", "P4G-004", "P4G-005", "P4G-006", "P4G-007"]
  }
];

export const phase4ExecutionLog = [
  { timestamp: "2026-08-11T08:00:00Z", event: "Phase 4 lancée — 8 chantiers go-live identifiés, score initial 95/100. OBJECTIF FINAL : 100/100.", type: "milestone", icon: "ri-play-circle-line" },
  { timestamp: "2026-08-11T08:15:00Z", event: "Snapshot système : Git tag v4.0.0 créé avec signature GPG — SHA-256 artifacts généré", type: "action", icon: "ri-camera-line" },
  { timestamp: "2026-08-11T08:45:00Z", event: "Dump base de données Supabase en cours — chiffrement AES-256 activé, stockage vault configuré", type: "action", icon: "ri-database-2-line" },
  { timestamp: "2026-08-11T09:00:00Z", event: "Budget Phase 4 engagé : 21 300 000 FCFA — dernier budget du Plan Consolidation", type: "budget", icon: "ri-money-dollar-circle-line" },
  { timestamp: "2026-08-11T09:15:00Z", event: "Notifications envoyées aux 12 consultants — planning formation certifiante 15-16 Août", type: "notification", icon: "ri-notification-3-line" },
  { timestamp: "2026-08-11T09:30:00Z", event: "COMEX informé — convocation réunion extraordinaire go-live le 21 Août 2026", type: "notification", icon: "ri-pen-nib-line" }
];

export const phase4Timeline = {
  start: "2026-08-11",
  end: "2026-08-22",
  weeks: [
    { week: 7, start: "2026-08-11", end: "2026-08-14", label: "Semaine 7 — Préparation & Certification", milestones: ["Snapshot système complet validé (Git, DB, Edge Functions, manifest)", "Test de rollback réussi — restauration < 15 min", "4 modules de formation conçus et validés", "12 consultants formés (Module 1+2) le 15/08", "12 consultants formés (Module 3+4) le 16/08"] },
    { week: 8, start: "2026-08-18", end: "2026-08-22", label: "Semaine 8 — Go-Live & Clôture", milestones: ["Test de certification KOS v4.0 — 12 consultants certifiés (score ≥ 85)", "Migration production — canary 10%→50%→100%, zéro-downtime", "312 redirects vérifiés — 0 erreur", "SSL score A+ Qualys", "PV COMEX signé — résolution go-live adoptée", "Tests de charge 10K utilisateurs — p95 < 2s", "4 scénarios catastrophe validés", "Monitoring 24/7 activé — alerting multicanal", "Communication multicanal — LinkedIn, newsletter, communiqué presse", "Rétrospective Big Four — leçons apprises", "KOS v4.0 — GO LIVE — 100/100"] }
  ]
};

export const phase4Budget = {
  total: "21 300 000 FCFA",
  spent: "1 100 000 FCFA",
  remaining: "20 200 000 FCFA",
  breakdown: [
    { item: "Snapshot système complet (Git, DB, Edge Functions, manifest)", amount: "3 200 000 FCFA", status: "allocated" },
    { item: "Formation certifiante 12 consultants", amount: "4 500 000 FCFA", status: "allocated" },
    { item: "Migration production DNS/SSL/CDN/Redirects", amount: "2 800 000 FCFA", status: "allocated" },
    { item: "PV COMEX + Résolution go-live", amount: "1 500 000 FCFA", status: "allocated" },
    { item: "Communication interne & externe (LinkedIn, presse, newsletter)", amount: "1 800 000 FCFA", status: "allocated" },
    { item: "Monitoring post-go-live (Grafana, alerting, SLA)", amount: "3 500 000 FCFA", status: "allocated" },
    { item: "Tests de charge + Scénarios catastrophe (k6, DDoS, panne)", amount: "2 800 000 FCFA", status: "allocated" },
    { item: "Rétrospective + Clôture + Plan maintenance", amount: "1 200 000 FCFA", status: "allocated" }
  ]
};

export const phase4Dependencies = [
  { from: "P4G-001", to: "P4G-003", reason: "Migration production impossible sans snapshot système — rollback non garanti" },
  { from: "P4G-001", to: "P4G-002", reason: "Formation utilise les données du snapshot pour les exercices pratiques" },
  { from: "P4G-001", to: "P4G-007", reason: "Tests de charge nécessitent l'infrastructure snapshot comme baseline" },
  { from: "P4G-003", to: "P4G-006", reason: "Monitoring post-go-live ne peut être activé qu'après la migration production" },
  { from: "P4G-004", to: "P4G-005", reason: "Communication externe doit citer la résolution COMEX comme base légale" },
  { from: "P4G-001", to: "P4G-004", reason: "PV COMEX contient les résultats du snapshot dans la matrice couverture" },
  { from: "P4G-003", to: "P4G-004", reason: "PV COMEX ne peut être signé sans la preuve du déploiement production réussi" },
  { from: "P4G-006", to: "P4G-007", reason: "Scénarios catastrophe valident les seuils d'alerte du monitoring" },
  { from: "P4G-002", to: "P4G-008", reason: "Rétrospective inclut l'évaluation de la formation dans les leçons apprises" },
  { from: "P4G-007", to: "P4G-008", reason: "Rétrospective doit intégrer les résultats des tests de charge" }
];