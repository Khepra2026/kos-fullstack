// KOS Phase 1 Consolidation Execution™ — Mock Data
// Consortium PwC · Deloitte · EY · KPMG
// Mandat : Exécuter les 8 urgences P0 de la Phase 1 du Plan Consolidation
// Timeline : 19 Juin — 3 Juillet 2026 (Semaine 1-2)

export const phase1Stats = {
  execution_id: "KOS-PHASE1-EXEC-2026-06-19-001",
  launched_at: "2026-06-19T20:30:00Z",
  target_completion: "2026-07-03T18:00:00Z",
  assessor: "Consortium PwC · Deloitte · EY · KPMG — System Integrity Practice",
  total_urgencies: 8,
  completed: 0,
  in_progress: 3,
  blocked: 0,
  open: 5,
  overall_progress: 8,
  target_score_after: 85,
  current_score: 76,
  budget_total: "28 400 000 FCFA",
  budget_spent: "2 800 000 FCFA",
  commander_intent: "Corriger les 8 urgences P0 identifiées par le scan intégral avant le 3 Juillet 2026. Objectif : score d'intégrité système 76→85, zéro vulnérabilité critique, conformité COBAC rétablie, pipeline LinkedIn opérationnel, goulot Revue Associé résolu."
};

export const phase1Urgences = [
  {
    id: "PHA-001",
    urgency: "Corriger les 3 vulnérabilités OWASP critiques",
    category: "Sécurité",
    icon: "ri-shield-flash-line",
    color: "#C2410C",
    priority: "P0",
    severity: "critical",
    status: "in_progress",
    progress: 25,
    responsible: "RSSI + Lead Dev Backend",
    deadline: "2026-07-15",
    budget: "6 800 000 FCFA",
    kpi: "0 vulnérabilités Critical/High OWASP",
    effort: "15h",
    bloque: "Déploiement sécurisé + Certification SOC 2",
    description: "Trois vulnérabilités critiques détectées lors du scan OWASP : IDOR sur API interne (CVSS 8.6), injection SQL dans le moteur de recherche KOS (CVSS 9.1), XSS reflété dans la barre de recherche publique (CVSS 7.8). Correction obligatoire — télédéclaration COBAC J+2 en cas de brèche.",
    actions: [
      { id: "PHA-001-A1", action: "Corriger IDOR API — ajouter authorization middleware sur toutes les routes /api/internal/*", status: "in_progress", owner: "Lead Dev Backend", effort: "5h" },
      { id: "PHA-001-A2", action: "Corriger SQL injection — paramétrer toutes les requêtes dynamiques, désactiver string interpolation", status: "open", owner: "Lead Dev Backend", effort: "6h" },
      { id: "PHA-001-A3", action: "Corriger XSS reflété — sanitizer les inputs utilisateur avec DOMPurify + CSP nonce-based", status: "open", owner: "Lead Dev Frontend", effort: "4h" },
      { id: "PHA-001-A4", action: "Lancer scan OWASP ZAP post-correction — vérifier 0 vulns Critical/High", status: "open", owner: "RSSI", effort: "2h" }
    ],
    dependencies: []
  },
  {
    id: "PHA-002",
    urgency: "Migrer le template COBAC R-2016/01 → R-2024/01",
    category: "Conformité Réglementaire",
    icon: "ri-scales-3-line",
    color: "#8B3040",
    priority: "P0",
    severity: "critical",
    status: "in_progress",
    progress: 40,
    responsible: "Quality Lead + Juridique COBAC",
    deadline: "2026-07-01",
    budget: "1 200 000 FCFA",
    kpi: "100% templates conformes COBAC 2024",
    effort: "1h30",
    bloque: "Toutes les propositions Consulting Factory — non-conformité réglementaire exposant à sanction COBAC",
    description: "Le template actuel de la ConsultingFactory référence la circulaire COBAC R-2016/01 (obsolète). La COBAC a publié le Règlement R-2024/01 en mars 2024 qui modifie substantiellement les exigences de gouvernance et contrôle interne. Migration urgente pour éviter le rejet des propositions clients.",
    actions: [
      { id: "PHA-002-A1", action: "Analyser le delta réglementaire R-2016/01 vs R-2024/01 (17 modifications)", status: "completed", owner: "Juridique COBAC", effort: "30 min" },
      { id: "PHA-002-A2", action: "Mettre à jour le template ConsultingFactory avec clauses R-2024/01", status: "in_progress", owner: "Quality Lead", effort: "45 min" },
      { id: "PHA-002-A3", action: "Valider le nouveau template avec le Responsable Conformité COBAC", status: "open", owner: "Compliance Officer", effort: "15 min" }
    ],
    dependencies: []
  },
  {
    id: "PHA-003",
    urgency: "Corriger KYC/CDD #4 — Détection PPE 65% → 90% (GAFI R.12)",
    category: "LCB/FT",
    icon: "ri-user-search-line",
    color: "#C2410C",
    priority: "P0",
    severity: "critical",
    status: "open",
    progress: 10,
    responsible: "Compliance Officer LCB/FT",
    deadline: "2026-07-01",
    budget: "2 500 000 FCFA",
    kpi: "Conformité GAFI Recommandation 12 = 100%",
    effort: "3h",
    bloque: "Risque de non-conformité GAFI — signalement CENTIF/ANIF obligatoire si gap non comblé",
    description: "La procédure KYC #4 (Personnes Politiquement Exposées) présente un seuil de détection de 65%, très inférieur au standard GAFI de 90%. La Recommandation 12 du GAFI exige une due diligence renforcée sur les PPE. Gap de 25 points — exposition réglementaire majeure.",
    actions: [
      { id: "PHA-003-A1", action: "Auditer l'algorithme de scoring PPE actuel — identifier les faux négatifs", status: "open", owner: "Compliance Officer", effort: "45 min" },
      { id: "PHA-003-A2", action: "Intégrer 3 bases de données PPE additionnelles (ONU, UE, UA)", status: "open", owner: "Lead Data Engineer", effort: "1h30" },
      { id: "PHA-003-A3", action: "Recalibrer les seuils de scoring — cibler 90% de détection avec <5% faux positifs", status: "open", owner: "Compliance Officer", effort: "30 min" },
      { id: "PHA-003-A4", action: "Test de validation sur échantillon 200 PPE connues", status: "open", owner: "Compliance Officer", effort: "15 min" }
    ],
    dependencies: []
  },
  {
    id: "PHA-004",
    urgency: "Débloquer l'approbation LinkedIn Marketing Developer Platform",
    category: "Croissance & Visibilité",
    icon: "ri-linkedin-box-line",
    color: "#0A66C2",
    priority: "P0",
    severity: "critical",
    status: "open",
    progress: 5,
    responsible: "Marketing Director",
    deadline: "2026-07-01",
    budget: "500 000 FCFA",
    kpi: "LinkedIn MDP actif — 1er post programmé via API",
    effort: "Suivi LinkedIn",
    bloque: "Automatisation posts LinkedIn — 0 posts programmables, pipeline éditorial DG vide juillet-août",
    description: "La demande d'accès à la LinkedIn Marketing Developer Platform est en attente d'approbation depuis 60 jours. Bloque l'automatisation des posts LinkedIn pour KHEPRA EXPERTS et le Directeur Général. Impact : perte de visibilité sur le réseau professionnel le plus stratégique pour le business development.",
    actions: [
      { id: "PHA-004-A1", action: "Relancer LinkedIn Developer Relations via le portail partenaire (ticket #KOS-LI-042)", status: "open", owner: "Marketing Director", effort: "15 min" },
      { id: "PHA-004-A2", action: "Vérifier la complétude du dossier de candidature (use cases, privacy policy URL, app review video)", status: "open", owner: "Marketing Director", effort: "30 min" },
      { id: "PHA-004-A3", action: "Préparer 30 posts prêts à être programmés dès l'approbation", status: "open", owner: "Content Team", effort: "12h" },
      { id: "PHA-004-A4", action: "Implémenter le flow OAuth 2.0 LinkedIn — test sandbox", status: "open", owner: "Lead Dev Frontend", effort: "4h" }
    ],
    dependencies: []
  },
  {
    id: "PHA-005",
    urgency: "Optimiser le goulot Revue Associé — 48h → 24h",
    category: "Process & Qualité",
    icon: "ri-hourglass-line",
    color: "#9B7B2C",
    priority: "P0",
    severity: "critical",
    status: "open",
    progress: 0,
    responsible: "Lead Data Engineer + COO",
    deadline: "2026-07-15",
    budget: "5 200 000 FCFA",
    kpi: "Délai Revue Associé ≤ 24h — 100% propositions on-time",
    effort: "16h",
    bloque: "60% des propositions retardées — perte de deals estimée 280M FCFA",
    description: "Le Process Mining a révélé un goulot d'étranglement critique : la Revue Associé (étape de validation qualité avant envoi client) prend en moyenne 48h au lieu des 24h cibles. Cause racine : 3 Associés sur 7 concentrent 82% des revues, créant une file d'attente. 60% des propositions commerciales sont envoyées en retard au client.",
    actions: [
      { id: "PHA-005-A1", action: "Modéliser le workflow Revue Associé dans Process Mining — identifier le bottleneck exact", status: "open", owner: "Lead Data Engineer", effort: "4h" },
      { id: "PHA-005-A2", action: "Redistribuer la charge — former 2 Associés supplémentaires à la revue qualité", status: "open", owner: "COO", effort: "2h" },
      { id: "PHA-005-A3", action: "Implémenter un système de routage automatique basé sur la charge (round-robin pondéré)", status: "open", owner: "Lead Data Engineer", effort: "6h" },
      { id: "PHA-005-A4", action: "Mettre en place un SLA monitoring avec alerte si file d'attente > 3 propositions", status: "open", owner: "COO", effort: "2h" },
      { id: "PHA-005-A5", action: "Test pilote sur 20 propositions — mesurer le nouveau délai moyen", status: "open", owner: "COO", effort: "2h" }
    ],
    dependencies: []
  },
  {
    id: "PHA-006",
    urgency: "Finaliser et publier le Baromètre Inclusion Financière UEMOA/CEMAC 2026",
    category: "Recherche & Intelligence",
    icon: "ri-file-chart-line",
    color: "#0891B2",
    priority: "P0",
    severity: "critical",
    status: "in_progress",
    progress: 60,
    responsible: "Research Director",
    deadline: "2026-07-07",
    budget: "3 500 000 FCFA",
    kpi: "Publication effective + communiqué de presse BCEAO + 5 citations presse",
    effort: "40h",
    bloque: "Publication flagship annuelle — retard de 15 jours, crédibilité institutionnelle engagée vis-à-vis de la BCEAO",
    description: "Le Baromètre Inclusion Financière 2026, publication annuelle flagship de KHEPRA EXPERTS coconstruite avec la BCEAO, accuse 15 jours de retard. Les données sont collectées à 85%, l'analyse à 70%, la mise en page à 40%. La BCEAO attend cette publication pour son propre rapport semestriel.",
    actions: [
      { id: "PHA-006-A1", action: "Finaliser la collecte des données manquantes (3 pays : Sénégal, Côte d'Ivoire, Cameroun)", status: "in_progress", owner: "Research Team", effort: "8h" },
      { id: "PHA-006-A2", action: "Terminer l'analyse statistique — rédiger le résumé exécutif", status: "open", owner: "Research Director", effort: "16h" },
      { id: "PHA-006-A3", action: "Mise en page + infographies — 22 graphiques, 8 cartes", status: "open", owner: "Designer", effort: "10h" },
      { id: "PHA-006-A4", action: "Revue par le Comité Scientifique BCEAO — intégrer les commentaires", status: "open", owner: "Research Director", effort: "4h" },
      { id: "PHA-006-A5", action: "Publication + communiqué de presse + diffusion LinkedIn + mailing 12 000 contacts", status: "open", owner: "Marketing Director", effort: "2h" }
    ],
    dependencies: []
  },
  {
    id: "PHA-007",
    urgency: "Intégrer COBAC R-2023/05 dans la cartographie LCB/FT CEMAC — score 58 → 85",
    category: "Conformité Réglementaire",
    icon: "ri-map-pin-line",
    color: "#8B3040",
    priority: "P0",
    severity: "critical",
    status: "open",
    progress: 0,
    responsible: "Compliance Officer + Juridique CEMAC",
    deadline: "2026-07-15",
    budget: "4 800 000 FCFA",
    kpi: "Score cartographie CEMAC ≥ 85/100",
    effort: "5h",
    bloque: "Risque de sanction COBAC en cas d'inspection — cartographie LCB/FT incomplète",
    description: "La cartographie LCB/FT CEMAC actuelle score 58/100. Le Règlement COBAC R-2023/05 du 15 décembre 2023 a introduit 12 nouvelles exigences LCB/FT non couvertes dans la cartographie actuelle. Non-conformité exposant à des sanctions pécuniaires COBAC pouvant atteindre 100M FCFA.",
    actions: [
      { id: "PHA-007-A1", action: "Analyser le Règlement COBAC R-2023/05 — extraire les 12 nouvelles exigences", status: "open", owner: "Juridique CEMAC", effort: "1h30" },
      { id: "PHA-007-A2", action: "Mapper chaque exigence aux processus KYC/CDD existants — identifier les gaps", status: "open", owner: "Compliance Officer", effort: "2h" },
      { id: "PHA-007-A3", action: "Mettre à jour la cartographie des risques LCB/FT avec les nouveaux scenarios", status: "open", owner: "Compliance Officer", effort: "1h" },
      { id: "PHA-007-A4", action: "Produire le rapport de conformité COBAC R-2023/05 pour le Conseil d'Administration", status: "open", owner: "Compliance Officer", effort: "30 min" }
    ],
    dependencies: []
  },
  {
    id: "PHA-008",
    urgency: "Créer le module de formation COBAC R-2024/01 pour 12 consultants",
    category: "Formation & Compétences",
    icon: "ri-graduation-cap-line",
    color: "#4A7A1E",
    priority: "P0",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "Training Director + Compliance",
    deadline: "2026-07-15",
    budget: "3 800 000 FCFA",
    kpi: "12 consultants formés + certification COBAC 2024 validée",
    effort: "8h",
    bloque: "Formation obligatoire COBAC non disponible pour les consultants — risque opérationnel en cas de mission CEMAC",
    description: "Le module de formation COBAC R-2024/01 (cybersécurité et résilience opérationnelle) est inexistant dans la Training Academy KHEPRA. 12 consultants doivent être formés avant le 31 juillet pour être éligibles aux missions CEMAC. Sans cette formation, KHEPRA ne peut pas déployer de consultants sur les mandats COBAC.",
    actions: [
      { id: "PHA-008-A1", action: "Concevoir le syllabus — 8 modules couvrant les 17 modifications du R-2024/01", status: "open", owner: "Training Director", effort: "2h" },
      { id: "PHA-008-A2", action: "Produire le contenu pédagogique (slides, exercices, quiz, cas pratique)", status: "open", owner: "Training Director + Compliance", effort: "4h" },
      { id: "PHA-008-A3", action: "Enregistrer la formation en présentiel (session unique le 10 Juillet)", status: "open", owner: "Training Director", effort: "1h" },
      { id: "PHA-008-A4", action: "Certifier les 12 consultants — évaluation QCM 40 questions (seuil 80%)", status: "open", owner: "Compliance Officer", effort: "1h" }
    ],
    dependencies: ["PHA-002"]
  }
];

export const phase1ExecutionLog = [
  { timestamp: "2026-06-19T20:30:00Z", event: "Phase 1 lancée — 8 urgences P0 identifiées", type: "milestone", icon: "ri-play-circle-line" },
  { timestamp: "2026-06-19T20:31:00Z", event: "OWASP : correction IDOR API démarrée — authorization middleware en cours", type: "action", icon: "ri-shield-flash-line" },
  { timestamp: "2026-06-19T20:32:00Z", event: "COBAC R-2024/01 : analyse du delta réglementaire terminée — 17 modifications identifiées", type: "action", icon: "ri-scales-3-line" },
  { timestamp: "2026-06-19T20:33:00Z", event: "Baromètre Inclusion Financière : collecte données Sénégal finalisée — reste Côte d'Ivoire et Cameroun", type: "action", icon: "ri-file-chart-line" },
  { timestamp: "2026-06-19T20:35:00Z", event: "Budget Phase 1 engagé : 28 400 000 FCFA — seuil d'alerte à 70%", type: "budget", icon: "ri-money-dollar-circle-line" },
  { timestamp: "2026-06-19T20:36:00Z", event: "Notification envoyée aux 12 responsables d'actions — deadlines confirmées", type: "notification", icon: "ri-notification-3-line" }
];

export const phase1Timeline = {
  start: "2026-06-19",
  end: "2026-07-03",
  weeks: [
    { week: 1, start: "2026-06-19", end: "2026-06-25", label: "Semaine 1 — Démarrage & Corrections Critiques", milestones: ["OWASP IDOR corrigé", "COBAC R-2024/01 migré", "KYC PPE audité", "LinkedIn MDP relancé"] },
    { week: 2, start: "2026-06-26", end: "2026-07-03", label: "Semaine 2 — Finalisation & Validation", milestones: ["OWASP SQLi + XSS corrigés", "Goulot Revue Associé résolu", "Baromètre publié", "Cartographie CEMAC mise à jour", "Module formation COBAC créé"] }
  ]
};

export const phase1Budget = {
  total: "28 400 000 FCFA",
  spent: "2 800 000 FCFA",
  remaining: "25 600 000 FCFA",
  breakdown: [
    { item: "OWASP — correction 3 vulns", amount: "6 800 000 FCFA", status: "allocated" },
    { item: "COBAC R-2024/01 — migration template", amount: "1 200 000 FCFA", status: "allocated" },
    { item: "KYC PPE — mise à niveau GAFI", amount: "2 500 000 FCFA", status: "allocated" },
    { item: "LinkedIn MDP — déblocage", amount: "500 000 FCFA", status: "allocated" },
    { item: "Goulot Revue Associé — optimisation", amount: "5 200 000 FCFA", status: "allocated" },
    { item: "Baromètre Inclusion Financière — finalisation", amount: "3 500 000 FCFA", status: "allocated" },
    { item: "Cartographie CEMAC — mise à jour", amount: "4 800 000 FCFA", status: "allocated" },
    { item: "Formation COBAC R-2024/01", amount: "3 800 000 FCFA", status: "allocated" },
    { item: "Contingence (3.5%)", amount: "100 000 FCFA", status: "reserved" }
  ]
};



