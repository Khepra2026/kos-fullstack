// KOS Phase 5 Expansion & Rayonnement™ — Mock Data
// Consortium PwC · Deloitte · EY · KPMG
// Mandat : Consolider le Go-Live et étendre KOS au-delà de l'UEMOA
// Timeline : 25 Août — 5 Septembre 2026 (Semaine 9-10)
// Objectif : Score d'Excellence 100→105 — RAYONNEMENT PANAFRICAIN

export const phase5Stats = {
  execution_id: "KOS-PHASE5-EXPANSION-2026-08-25-001",
  launched_at: "2026-08-25T08:00:00Z",
  target_completion: "2026-09-05T18:00:00Z",
  assessor: "Consortium PwC · Deloitte · EY · KPMG — Expansion & Excellence Practice",
  total_chantiers: 8,
  completed: 0,
  in_progress: 1,
  blocked: 0,
  open: 7,
  overall_progress: 8,
  starting_score: 100,
  target_score: 105,
  budget_total: "28 500 000 FCFA",
  budget_spent: "1 400 000 FCFA",
  commander_intent: "Faire de KOS la plateforme de référence panafricaine. Consolider le monitoring post-go-live avec SLA 99.9%, accélérer l'onboarding client, déployer l'expansion CEMAC + Anglophone + Lusophone, activer l'écosystème de 45 partenaires, enrichir la base de connaissances réglementaires avec les mises à jour Q3 2026, optimiser les 75 agents IA avec fine-tuning, doubler la vélocité SEO/content, et structurer les Revenue Operations. Score d'Excellence 105/105. KOS rayonne sur tout le continent."
};

export const phase5Chantiers = [
  {
    id: "P5E-001",
    chantier: "Monitoring post-go-live — SLA 99.9% — Optimisation continue 30j",
    category: "Opérations",
    icon: "ri-pulse-line",
    color: "#0891B2",
    priority: "P0",
    severity: "critical",
    status: "in_progress",
    progress: 25,
    responsible: "DevOps Lead + RSSI + CTO",
    deadline: "2026-08-28",
    budget: "4 800 000 FCFA",
    kpi: "SLA 99.9% sur 30j glissants — MTTD < 3min, MTTR < 10min, 0 incident critique non résolu > 1h",
    effort: "8h",
    bloque: "Sans SLA 99.9%, la crédibilité post-go-live s'effrite — tout client corporate exige ce niveau",
    description: "Consolidation du monitoring post-production avec montée en gamme du SLA de 99.5% à 99.9% : 1) Upgrade Grafana — dashboards exécutifs personnalisés par BU (Régulation, Prix de Transfert, GRC, Think Tank), 2) Réduction MTTD 18min→3min via alerting ML prédictif (détection anomalies avant impact utilisateur), 3) Automatisation MTTR — playbooks auto-exécutables pour les 12 scénarios d'incident les plus fréquents, 4) Rapport SLA hebdomadaire automatisé avec calcul temps réel et projection, 5) Stress test hebdomadaire automatique (lundi 03:00 UTC) — 5K utilisateurs simulés.",
    actions: [
      { id: "P5E-001-A1", action: "Upgrade Grafana — dashboards exécutifs par BU avec KPIs métier (CA, pipeline, NPS)", status: "completed", owner: "DevOps Lead", effort: "2h" },
      { id: "P5E-001-A2", action: "Déployer alerting ML prédictif — détection anomalies 15min avant impact", status: "in_progress", owner: "CTO", effort: "2h30" },
      { id: "P5E-001-A3", action: "Automatiser 12 playbooks incident — exécution auto avec rollback", status: "open", owner: "DevOps Lead", effort: "2h" },
      { id: "P5E-001-A4", action: "Génération rapport SLA hebdo automatique — calcul temps réel + projection", status: "open", owner: "RSSI", effort: "45 min" },
      { id: "P5E-001-A5", action: "Stress test hebdo automatique — 5K utilisateurs simulés chaque lundi 03:00 UTC", status: "open", owner: "CTO", effort: "45 min" }
    ],
    dependencies: []
  },
  {
    id: "P5E-002",
    chantier: "Accélération onboarding client — De 14 à 28 missions actives — Processus industrialisé",
    category: "Croissance",
    icon: "ri-user-add-line",
    color: "#059669",
    priority: "P0",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "Managing Partner + Client Success Lead + Quality Lead",
    deadline: "2026-09-02",
    budget: "5 200 000 FCFA",
    kpi: "28 missions actives (×2) — NPS onboarding ≥ 9.0 — Time-to-value réduit de 15j à 7j",
    effort: "10h",
    bloque: "14 missions = dépendance CA sur trop peu de clients. Doublement = résilience + CA ×1.8",
    description: "Industrialisation du processus d'onboarding client pour doubler la capacité : 1) Refonte du parcours onboarding — de 15 étapes manuelles à 7 étapes automatisées (contrat électronique, KYC auto, facturation auto, accès portail client), 2) Portail client KOS — espace dédié par mission (documents, dashboard avancement, messagerie sécurisée, facturation), 3) Playbook onboarding par type de mission (Audit BCEAO, Due Diligence, Prix de Transfert, ESG, Board Advisory, Formation) — 6 playbooks standardisés, 4) Séquence nurturing post-onboarding — 5 emails sur 30 jours (satisfaction, cross-sell, référencement, étude de cas, parrainage), 5) Recrutement 2 Senior Consultants (CEMAC + Anglophone).",
    actions: [
      { id: "P5E-002-A1", action: "Refonte parcours onboarding 15→7 étapes — contrat électronique, KYC auto, facturation auto", status: "open", owner: "Client Success Lead", effort: "3h" },
      { id: "P5E-002-A2", action: "Déployer portail client KOS — espace mission, documents, dashboard, messagerie", status: "open", owner: "CTO", effort: "3h" },
      { id: "P5E-002-A3", action: "Rédiger 6 playbooks onboarding par type de mission", status: "open", owner: "Quality Lead", effort: "2h" },
      { id: "P5E-002-A4", action: "Configurer séquence nurturing post-onboarding — 5 emails sur 30j", status: "open", owner: "Client Success Lead", effort: "1h" },
      { id: "P5E-002-A5", action: "Recruter 2 Senior Consultants — CEMAC (Douala) + Anglophone (Lagos/Accra)", status: "open", owner: "Managing Partner", effort: "1h" }
    ],
    dependencies: ["P5E-001"]
  },
  {
    id: "P5E-003",
    chantier: "Expansion CEMAC — Bureau Douala + Conformité COBAC full stack",
    category: "Expansion",
    icon: "ri-global-line",
    color: "#DC2626",
    priority: "P0",
    severity: "critical",
    status: "open",
    progress: 0,
    responsible: "Managing Partner + Regional Director CEMAC + Regulatory Lead",
    deadline: "2026-09-05",
    budget: "6 500 000 FCFA",
    kpi: "Bureau Douala opérationnel — 5 clients CEMAC onboardés — Pipeline CEMAC 800M FCFA",
    effort: "12h",
    bloque: "Le marché CEMAC (Cameroun, Gabon, Congo, RCA, Tchad, Guinée Équatoriale) = 40% du PIB Afrique Centrale. Khepra n'y a pas de présence physique.",
    description: "Déploiement de la présence physique et opérationnelle Khepra en zone CEMAC : 1) Enregistrement légal succursale Khepra Experts Cameroun (Douala) — statuts, registre commerce, agrément professionnel, 2) Recrutement Regional Director CEMAC + 2 consultants locaux, 3) Certification COBAC full stack — formation approfondie sur les 12 circulaires COBAC clés, procédures adaptées au régulateur CEMAC, 4) Activation pipeline CEMAC — 12 prospects identifiés (Banques, SFD, Assurances CIMA, Projets BAD), 5) Partenariats locaux — Cabinet Fadoul (N'Djamena), Grant Thornton Cameroun, ICT4Dev Gabon, 6) Site web — page dédiée /cemac avec contenu localisé, SEO géolocalisé, témoignages CEMAC.",
    actions: [
      { id: "P5E-003-A1", action: "Enregistrement légal succursale Khepra Experts Cameroun — statuts, RCCM, agrément", status: "open", owner: "Managing Partner", effort: "3h" },
      { id: "P5E-003-A2", action: "Recruter Regional Director CEMAC + 2 consultants locaux (Douala)", status: "open", owner: "Managing Partner", effort: "2h" },
      { id: "P5E-003-A3", action: "Certification COBAC full stack — 12 circulaires clés, procédures adaptées", status: "open", owner: "Regulatory Lead", effort: "3h" },
      { id: "P5E-003-A4", action: "Activation pipeline CEMAC — 12 prospects, outreach, propositions", status: "open", owner: "Regional Director CEMAC", effort: "2h" },
      { id: "P5E-003-A5", action: "Partenariats locaux — Cabinet Fadoul, Grant Thornton Cameroun, ICT4Dev Gabon", status: "open", owner: "Managing Partner", effort: "1h30" },
      { id: "P5E-003-A6", action: "Déployer page /cemac — contenu localisé, SEO géolocalisé, témoignages", status: "open", owner: "Lead Dev Frontend", effort: "30 min" }
    ],
    dependencies: ["P5E-001", "P5E-002"]
  },
  {
    id: "P5E-004",
    chantier: "Expansion Anglophone & Lusophone — Nigeria, Ghana, Angola, Mozambique",
    category: "Expansion",
    icon: "ri-earth-line",
    color: "#7C3AED",
    priority: "P1",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "Managing Partner + International BD Lead",
    deadline: "2026-09-05",
    budget: "4 200 000 FCFA",
    kpi: "3 partenariats signés (Nigeria, Ghana, Angola) — Pipeline anglophone/lusophone 500M FCFA",
    effort: "8h",
    bloque: "L'Afrique anglophone (Nigeria, Ghana, Kenya) + lusophone (Angola, Mozambique) = 55% du PIB africain. Khepra y est invisible.",
    description: "Stratégie d'entrée sur les marchés anglophones et lusophones par partenariats : 1) Nigeria — partenariat avec KPMG Nigeria (co-sourcing conformité LBC/FT, prix de transfert), 2) Ghana — alliance avec un cabinet local (Ghana Association of Bankers), 3) Angola — partenariat avec un cabinet portugais (conformité BNA, IFRS, ESG pétrole & gaz), 4) Mozambique — accord de référencement avec Standard Bank Mozambique, 5) Contenu trilingue — 10 articles blog en anglais, 5 en portugais (SEO localisé), 6) Participation conférence African Banking Forum (Lagos, Octobre 2026) — sponsoring silver.",
    actions: [
      { id: "P5E-004-A1", action: "Négocier partenariat KPMG Nigeria — co-sourcing conformité, prix de transfert", status: "open", owner: "Managing Partner", effort: "2h" },
      { id: "P5E-004-A2", action: "Identifier et signer alliance cabinet local Ghana (Ghana Association of Bankers)", status: "open", owner: "International BD Lead", effort: "1h30" },
      { id: "P5E-004-A3", action: "Partenariat Angola — cabinet portugais (conformité BNA, IFRS, ESG)", status: "open", owner: "International BD Lead", effort: "1h30" },
      { id: "P5E-004-A4", action: "Accord référencement Standard Bank Mozambique — due diligence, conformité", status: "open", owner: "Managing Partner", effort: "1h" },
      { id: "P5E-004-A5", action: "Produire 10 articles blog anglais + 5 portugais — SEO localisé", status: "open", owner: "Content Lead", effort: "1h30" },
      { id: "P5E-004-A6", action: "Réserver sponsoring African Banking Forum Lagos — Octobre 2026", status: "open", owner: "International BD Lead", effort: "30 min" }
    ],
    dependencies: ["P5E-003"]
  },
  {
    id: "P5E-005",
    chantier: "Activation Écosystème Partenaires — 45 partenaires → 60 — Programme Ambassadeurs",
    category: "Partenariats",
    icon: "ri-group-line",
    color: "#F59E0B",
    priority: "P0",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "Partnership Lead + Managing Partner",
    deadline: "2026-09-03",
    budget: "2 800 000 FCFA",
    kpi: "60 partenaires actifs (+15) — 5 nouveaux consortiums AO — Programme Ambassadeurs 12 membres",
    effort: "7h",
    bloque: "Sans écosystème, Khepra reste un cabinet isolé. L'effet de levier partenarial = ×3 pipeline.",
    description: "Activation massive de l'écosystème partenarial : 1) Programme Ambassadeurs Khepra — 12 experts indépendants (anciens régulateurs BCEAO/COBAC, professeurs d'université, DG de banques retraités) commissionnés à la réussite, 2) Consortiums AO — 5 consortiums formels (BAD, Banque Mondiale, UE, AFD, BOAD) avec accords de groupement signés, 3) Partenariats technologiques — 3 intégrations (API bancaire Orabank, ERP Sage, CRM HubSpot), 4) Partenariats académiques — 5 conventions avec universités africaines (UCAD, FHB, Yaoundé II, Lagos Business School, Université de Luanda), 5) Réseau d'avocats correspondants — 8 cabinets dans 8 pays (Sénégal, CI, Cameroun, Gabon, Bénin, Togo, Burkina, Mali).",
    actions: [
      { id: "P5E-005-A1", action: "Lancer Programme Ambassadeurs — recruter 12 experts, grille de commissionnement", status: "open", owner: "Partnership Lead", effort: "2h" },
      { id: "P5E-005-A2", action: "Formaliser 5 consortiums AO — BAD, BM, UE, AFD, BOAD — accords de groupement", status: "open", owner: "Managing Partner", effort: "2h" },
      { id: "P5E-005-A3", action: "Intégrer 3 partenaires technologiques — API Orabank, ERP Sage, CRM HubSpot", status: "open", owner: "CTO", effort: "1h30" },
      { id: "P5E-005-A4", action: "Signer 5 conventions universitaires — UCAD, FHB, Yaoundé II, LBS, Luanda", status: "open", owner: "Partnership Lead", effort: "1h" },
      { id: "P5E-005-A5", action: "Constituer réseau 8 avocats correspondants dans 8 pays UEMOA/CEMAC", status: "open", owner: "Managing Partner", effort: "30 min" }
    ],
    dependencies: ["P5E-003", "P5E-004"]
  },
  {
    id: "P5E-006",
    chantier: "Fine-tuning 75 agents IA — Optimisation post-go-live — Latence -40%",
    category: "IA",
    icon: "ri-cpu-line",
    color: "#2563EB",
    priority: "P0",
    severity: "critical",
    status: "open",
    progress: 0,
    responsible: "CTO + AI Lead + Data Science",
    deadline: "2026-09-01",
    budget: "3 500 000 FCFA",
    kpi: "Latence moyenne agents 368ms→220ms (−40%) — Hallucination résiduelle 0.12%→0.05% — Score qualité agents 96.2→98.5",
    effort: "9h",
    bloque: "Les agents IA sont le cœur de KOS. Sans optimisation continue, performance dégradée = perte de confiance.",
    description: "Cycle d'optimisation post-go-live des 75 agents IA : 1) Fine-tuning des 12 modèles KHEPRA Internal avec les données de production (feedback loops, corrections manuelles, edge cases), 2) Optimisation latence — pruning des modèles, quantification INT8, caching des embeddings fréquents, 3) Réduction hallucination — renforcement du Hallucination Detector v1.5→v2.0 avec détection multi-étapes (factuelle, contextuelle, temporelle), 4) A/B testing systématique — 25% du trafic sur version optimisée, comparaison KPI, 5) Retraining automatique hebdomadaire — pipeline CI/CD ML avec validation dataset de 10K exemples.",
    actions: [
      { id: "P5E-006-A1", action: "Fine-tuning 12 modèles KHEPRA Internal — feedback loops, edge cases production", status: "open", owner: "AI Lead", effort: "3h" },
      { id: "P5E-006-A2", action: "Optimisation latence — pruning, quantification INT8, caching embeddings", status: "open", owner: "Data Science", effort: "2h30" },
      { id: "P5E-006-A3", action: "Upgrade Hallucination Detector v1.5→v2.0 — détection multi-étapes", status: "open", owner: "AI Lead", effort: "2h" },
      { id: "P5E-006-A4", action: "A/B testing systématique — 25% trafic version optimisée, comparaison KPI", status: "open", owner: "CTO", effort: "1h" },
      { id: "P5E-006-A5", action: "Pipeline CI/CD ML — retraining auto hebdo, validation dataset 10K exemples", status: "open", owner: "Data Science", effort: "30 min" }
    ],
    dependencies: ["P5E-001"]
  },
  {
    id: "P5E-007",
    chantier: "Accélération SEO/Content — Cadence 30→60 articles/mois — Cluster CEMAC & Lusophone",
    category: "SEO",
    icon: "ri-search-eye-line",
    color: "#4F46E5",
    priority: "P1",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "SEO Lead + Content Lead + Blog Writing Automate",
    deadline: "2026-09-04",
    budget: "2 500 000 FCFA",
    kpi: "60 articles/mois — DR 24→38 — Trafic 14.2K→35K/mois — 3 nouveaux clusters géo (CEMAC, Nigéria, Angola)",
    effort: "8h",
    bloque: "Le contenu est le moteur d'acquisition. Doubler la cadence = doubler le trafic en 6 mois.",
    description: "Accélération massive de la production de contenu SEO : 1) Activation KOS Blog Writing Automate en mode 2× — 60 articles/mois (30 FR + 20 EN + 10 PT), 2) Création cluster CEMAC — 25 articles (COBAC, CIMA, BEAC, BVMAC, Droit OHADA CEMAC), 3) Création cluster Nigéria — 15 articles (CBN, SEC Nigeria, FinTech Lagos, NAICOM, PENCOM), 4) Création cluster Angola — 10 articles (BNA, IFRS Angola, ESG Pétrole & Gaz, Conformité Africaine Lusophone), 5) Internal linking massif — 500 liens internes ajoutés (cluster UEMOA→CEMAC, cluster existant→nouveau), 6) Optimisation EEAT — 12 pages auteur enrichies avec bios, publications, citations.",
    actions: [
      { id: "P5E-007-A1", action: "Activer Blog Writing Automate mode 2× — 60 articles/mois (30 FR + 20 EN + 10 PT)", status: "open", owner: "Content Lead", effort: "2h" },
      { id: "P5E-007-A2", action: "Produire cluster CEMAC — 25 articles (COBAC, CIMA, BEAC, BVMAC, OHADA CEMAC)", status: "open", owner: "SEO Lead", effort: "2h30" },
      { id: "P5E-007-A3", action: "Produire cluster Nigéria — 15 articles (CBN, SEC, FinTech, NAICOM, PENCOM)", status: "open", owner: "SEO Lead", effort: "1h30" },
      { id: "P5E-007-A4", action: "Produire cluster Angola — 10 articles (BNA, IFRS, ESG, Conformité Lusophone)", status: "open", owner: "Content Lead", effort: "1h" },
      { id: "P5E-007-A5", action: "Internal linking massif — 500 liens (UEMOA→CEMAC, existant→nouveau)", status: "open", owner: "SEO Lead", effort: "30 min" },
      { id: "P5E-007-A6", action: "Enrichir 12 pages auteur EEAT — bios, publications, citations", status: "open", owner: "Content Lead", effort: "30 min" }
    ],
    dependencies: ["P5E-003", "P5E-004"]
  },
  {
    id: "P5E-008",
    chantier: "Revenue Operations — Pipeline 3.77→7.5 Md FCFA — Structuration Commerciale",
    category: "Croissance",
    icon: "ri-funds-box-line",
    color: "#059669",
    priority: "P0",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "Managing Partner + Growth Lead + CFO",
    deadline: "2026-09-05",
    budget: "3 000 000 FCFA",
    kpi: "Pipeline 7.5 Md FCFA (×2) — Win rate 42%→55% — CA mensuel récurrent 85M→150M FCFA",
    effort: "8h",
    bloque: "Le pipeline actuel (3.77 Md) est sous-dimensionné pour absorber l'expansion. Doublement nécessaire.",
    description: "Structuration des opérations commerciales pour soutenir l'expansion panafricaine : 1) CRM HubSpot — déploiement complet (deals, contacts, automatisation relances, rapports), 2) Organisation commerciale — 4 BUs avec chacun un Director commercial + objectifs trimestriels, 3) Pricing stratégique — grille tarifaire par pays (UEMOA, CEMAC, Nigéria, Angola) avec ajustement PPA (Parité de Pouvoir d'Achat), 4) Sales playbook — 6 playbooks par type de mission (Discovery → Closing en 45j max), 5) Compensation plan — fixe + variable (10% CA généré) + bonus pipeline (5% pipeline qualifié), 6) Dashboard Revenue Operations — pipeline, win rate, CA, velocity, prévisions par BU et par pays.",
    actions: [
      { id: "P5E-008-A1", action: "Déployer CRM HubSpot — deals, contacts, automatisation, rapports", status: "open", owner: "Growth Lead", effort: "2h" },
      { id: "P5E-008-A2", action: "Structurer organisation commerciale — 4 Directors BU + objectifs trimestriels", status: "open", owner: "Managing Partner", effort: "1h30" },
      { id: "P5E-008-A3", action: "Établir grille tarifaire par pays — UEMOA, CEMAC, Nigéria, Angola (ajusté PPA)", status: "open", owner: "CFO", effort: "2h" },
      { id: "P5E-008-A4", action: "Rédiger 6 Sales Playbooks — Discovery→Closing 45j max par type de mission", status: "open", owner: "Growth Lead", effort: "1h30" },
      { id: "P5E-008-A5", action: "Concevoir compensation plan — fixe + 10% variable CA + 5% bonus pipeline", status: "open", owner: "CFO", effort: "30 min" },
      { id: "P5E-008-A6", action: "Dashboard Revenue Operations — pipeline, win rate, CA, velocity par BU/pays", status: "open", owner: "CTO", effort: "30 min" }
    ],
    dependencies: ["P5E-002", "P5E-003", "P5E-004"]
  }
];

export const phase5ExecutionLog = [
  { timestamp: "2026-08-25T08:00:00Z", event: "Phase 5 lancée — 8 chantiers expansion identifiés, score initial 100/100. OBJECTIF : 105/105 — RAYONNEMENT PANAFRICAIN.", type: "milestone", icon: "ri-play-circle-line" },
  { timestamp: "2026-08-25T08:30:00Z", event: "Monitoring SLA — upgrade Grafana dashboards exécutifs par BU terminé. KPIs métier intégrés.", type: "action", icon: "ri-pulse-line" },
  { timestamp: "2026-08-25T09:00:00Z", event: "Alerte : 3 leads CEMAC détectés via le nouveau cluster SEO — Banque Atlantique Cameroun, BGFI Gabon, Afriland RCA", type: "alert", icon: "ri-alert-line" },
  { timestamp: "2026-08-25T09:30:00Z", event: "Budget Phase 5 engagé : 28 500 000 FCFA — investissement expansion panafricaine", type: "budget", icon: "ri-money-dollar-circle-line" },
  { timestamp: "2026-08-25T10:00:00Z", event: "Partenariat KPMG Nigeria — premier contact établi, visioconférence programmée 27/08", type: "notification", icon: "ri-group-line" },
  { timestamp: "2026-08-25T10:30:00Z", event: "Recrutement Regional Director CEMAC — 4 candidats présélectionnés, entretiens 26-28/08", type: "notification", icon: "ri-user-search-line" }
];

export const phase5Timeline = {
  start: "2026-08-25",
  end: "2026-09-05",
  weeks: [
    { week: 9, start: "2026-08-25", end: "2026-08-29", label: "Semaine 9 — Consolidation & Fondations Expansion", milestones: ["SLA 99.9% atteint — MTTD < 3min, MTTR < 10min", "Fine-tuning 12 modèles IA — latence -40%", "Enregistrement succursale Cameroun — statuts déposés", "Partenariats Nigéria + Ghana signés", "Programme Ambassadeurs — 6/12 recrutés", "CRM HubSpot déployé — pipeline migré"] },
    { week: 10, start: "2026-09-01", end: "2026-09-05", label: "Semaine 10 — Accélération & Rayonnement", milestones: ["Portail client KOS — 14 clients onboardés sur la nouvelle plateforme", "Bureau Douala opérationnel — Regional Director + 2 consultants", "Cluster SEO CEMAC, Nigéria, Angola — 50 articles publiés", "60 partenaires actifs — 5 consortiums AO formalisés", "Pipeline 7.5 Md FCFA — doublement atteint", "Revenue Operations dashboard live", "Phase 5 clôturée — Score Excellence 105/105"] }
  ]
};

export const phase5Budget = {
  total: "28 500 000 FCFA",
  spent: "1 400 000 FCFA",
  remaining: "27 100 000 FCFA",
  breakdown: [
    { item: "Monitoring SLA 99.9% + Grafana + Alerting ML", amount: "4 800 000 FCFA", status: "allocated" },
    { item: "Onboarding client industrialisé + Portail client", amount: "5 200 000 FCFA", status: "allocated" },
    { item: "Expansion CEMAC — Bureau Douala + Certification COBAC", amount: "6 500 000 FCFA", status: "allocated" },
    { item: "Expansion Anglophone & Lusophone — Partenariats Nigéria, Ghana, Angola", amount: "4 200 000 FCFA", status: "allocated" },
    { item: "Activation Écosystème Partenaires — 45→60 + Ambassadeurs", amount: "2 800 000 FCFA", status: "allocated" },
    { item: "Fine-tuning 75 agents IA — Latence, Hallucination, Qualité", amount: "3 500 000 FCFA", status: "allocated" },
    { item: "SEO/Content — 60 articles/mois + Clusters CEMAC/Nigéria/Angola", amount: "2 500 000 FCFA", status: "allocated" },
    { item: "Revenue Operations — CRM, Pricing, Sales Playbooks, Dashboard", amount: "3 000 000 FCFA", status: "allocated" }
  ]
};

export const phase5Dependencies = [
  { from: "P5E-001", to: "P5E-006", reason: "Fine-tuning IA nécessite les données de monitoring production pour calibration" },
  { from: "P5E-001", to: "P5E-002", reason: "Portail client exige SLA 99.9% pour la confiance utilisateur" },
  { from: "P5E-001", to: "P5E-003", reason: "Bureau CEMAC nécessite infrastructure monitoring dédiée (latence, uptime local)" },
  { from: "P5E-002", to: "P5E-008", reason: "Revenue Operations utilise le portail client comme source de données" },
  { from: "P5E-003", to: "P5E-004", reason: "Expansion anglophone/lusophone s'appuie sur le modèle CEMAC (succursale + partenaires)" },
  { from: "P5E-003", to: "P5E-005", reason: "Partenariats CEMAC (Fadoul, Grant Thornton) activent l'écosystème" },
  { from: "P5E-004", to: "P5E-005", reason: "Partenariats Nigéria/Ghana/Angola intègrent l'écosystème partenarial" },
  { from: "P5E-003", to: "P5E-007", reason: "Cluster SEO CEMAC nécessite la présence légale pour le contenu localisé" },
  { from: "P5E-004", to: "P5E-007", reason: "Clusters Nigéria/Angola nécessitent les partenariats pour crédibilité EEAT" },
  { from: "P5E-007", to: "P5E-008", reason: "Trafic SEO accru alimente le pipeline commercial" }
];





