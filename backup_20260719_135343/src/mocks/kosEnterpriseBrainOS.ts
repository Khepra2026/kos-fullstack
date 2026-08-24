export const enterpriseBrain = [
  {
    id: 1,
    knowledge_domain: "Régulation Bancaire BCEAO",
    knowledge_count: 847,
    last_enriched: "2026-06-13T06:00:00Z",
    access_frequency: "Quotidien — 124 requêtes/jour",
    connection_strength: 9.2,
    created_at: "2025-01-15T08:00:00Z",
    updated_at: "2026-06-13T06:00:00Z"
  },
  {
    id: 2,
    knowledge_domain: "Conformité LBC/FT GAFI",
    knowledge_count: 623,
    last_enriched: "2026-06-12T18:00:00Z",
    access_frequency: "Quotidien — 98 requêtes/jour",
    connection_strength: 8.7,
    created_at: "2025-02-01T08:00:00Z",
    updated_at: "2026-06-12T18:00:00Z"
  },
  {
    id: 3,
    knowledge_domain: "Gouvernance OHADA",
    knowledge_count: 534,
    last_enriched: "2026-06-11T14:00:00Z",
    access_frequency: "Hebdomadaire — 45 requêtes/semaine",
    connection_strength: 7.8,
    created_at: "2025-03-10T08:00:00Z",
    updated_at: "2026-06-11T14:00:00Z"
  },
  {
    id: 4,
    knowledge_domain: "Prix de Transfert BEPS OCDE",
    knowledge_count: 712,
    last_enriched: "2026-06-13T04:00:00Z",
    access_frequency: "Quotidien — 87 requêtes/jour",
    connection_strength: 8.9,
    created_at: "2025-01-20T08:00:00Z",
    updated_at: "2026-06-13T04:00:00Z"
  },
  {
    id: 5,
    knowledge_domain: "ESG & Sustainability ISSB",
    knowledge_count: 489,
    last_enriched: "2026-06-12T22:00:00Z",
    access_frequency: "Quotidien — 72 requêtes/jour",
    connection_strength: 7.5,
    created_at: "2025-04-01T08:00:00Z",
    updated_at: "2026-06-12T22:00:00Z"
  },
  {
    id: 6,
    knowledge_domain: "Régulation Microfinance UEMOA",
    knowledge_count: 398,
    last_enriched: "2026-06-10T16:00:00Z",
    access_frequency: "Hebdomadaire — 35 requêtes/semaine",
    connection_strength: 6.8,
    created_at: "2025-05-15T08:00:00Z",
    updated_at: "2026-06-10T16:00:00Z"
  },
  {
    id: 7,
    knowledge_domain: "Finance Digitale & FinTech",
    knowledge_count: 567,
    last_enriched: "2026-06-13T08:00:00Z",
    access_frequency: "Quotidien — 105 requêtes/jour",
    connection_strength: 8.4,
    created_at: "2025-02-20T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 8,
    knowledge_domain: "Risk Management COSO ISO 31000",
    knowledge_count: 645,
    last_enriched: "2026-06-12T12:00:00Z",
    access_frequency: "Quotidien — 92 requêtes/jour",
    connection_strength: 8.1,
    created_at: "2025-03-01T08:00:00Z",
    updated_at: "2026-06-12T12:00:00Z"
  },
  {
    id: 9,
    knowledge_domain: "Prospective & Innovation Réglementaire — Dr. Simda Padagnassou",
    knowledge_count: 387,
    last_enriched: "2026-06-17T10:00:00Z",
    access_frequency: "Quotidien — 156 requêtes/jour",
    connection_strength: 9.5,
    created_at: "2026-05-15T08:00:00Z",
    updated_at: "2026-06-17T10:00:00Z"
  }
];

export const digitalTwins = [
  {
    id: "dt-001",
    twin_name: "Jumeau Numérique KHEPRA Experts — Modèle Opérationnel Global",
    domain: "Organisation & Performance",
    represented_entities: ["KHEPRA Experts", "4 Business Units", "68 Agents KOS", "12 Processus Core"],
    simulation_scenarios: {
      scenarios: [
        { name: "Croissance 50% en 24 mois", result: "Déficit capacity consulting — besoin 12 recrutements", probability: "Très probable" },
        { name: "Perte 2 clients majeurs (>200M FCFA)", result: "Impact trésorerie -18% — plan mitigation activable J+45", probability: "Peu probable" },
        { name: "Dédoublement effectif BU2 Prix de Transfert", result: "ROI atteint en 14 mois — création 5 postes", probability: "Probable" },
        { name: "Crise réputationnelle secteur bancaire", result: "Perte 40% pipeline bancaire — pivot FinTech compense 65%", probability: "Possible" }
      ]
    },
    last_simulation_date: "2026-06-12T15:30:00Z",
    prediction_accuracy: 87.5,
    key_metrics: {
      revenue_forecast_2026: "2.85 Mds FCFA",
      active_missions: 24,
      pipeline_value: "4.2 Mds FCFA",
      utilization_rate: 78.3,
      cash_runway_months: 11
    },
    decision_impact: {
      pending_decisions: 8,
      high_impact_decisions: 3,
      last_decision: "Lancement recrutement 2 Senior Managers — ROI prévu J+180",
      simulation_confidence: 0.85
    },
    metadata: {
      version: "v2.3.1",
      updated_by: "KOS Autonomous PMO",
      next_simulation_scheduled: "2026-06-19T02:00:00Z"
    },
    created_at: "2025-09-01T08:00:00Z"
  },
  {
    id: "dt-002",
    twin_name: "Jumeau Numérique Dispositif Contrôle Interne — Banque Atlantique UEMOA",
    domain: "Contrôle Interne & Risques",
    represented_entities: ["Banque Atlantique UEMOA", "320 contrôles", "28 processus", "12 BU"],
    simulation_scenarios: {
      scenarios: [
        { name: "Défaillance 5 contrôles critiques", result: "Exposition risque net augmentée de 34% — 3 contrôles compensatoires activés", probability: "Possible" },
        { name: "Audit BCEAO non annoncé J+30", result: "Taux conformité 82% prédit — 18 gaps identifiés à corriger sous 15j", probability: "Probable" },
        { name: "Attaque cyber sur core banking", result: "RTO 4h prédit avec plan actuel — cible RTO 2h → renforcement requis", probability: "Peu probable" }
      ]
    },
    last_simulation_date: "2026-06-10T09:00:00Z",
    prediction_accuracy: 82.3,
    key_metrics: {
      controls_active: 318,
      controls_automated: 127,
      nc_detected_last_quarter: 14,
      mean_time_to_remediation: "8.5 jours"
    },
    decision_impact: {
      pending_decisions: 5,
      high_impact_decisions: 2,
      last_decision: "Renforcement 12 contrôles LBC/FT — déploiement J+30",
      simulation_confidence: 0.78
    },
    metadata: {
      version: "v1.8.2",
      updated_by: "KOS Enterprise Risk Engine",
      next_simulation_scheduled: "2026-06-17T02:00:00Z"
    },
    created_at: "2025-11-15T08:00:00Z"
  },
  {
    id: "dt-003",
    twin_name: "Jumeau Numérique Pipeline Commercial — KHEPRA Experts 2026",
    domain: "Croissance & Marchés",
    represented_entities: ["Équipe Commerciale", "Pipeline 85 opportunités", "4 BU", "8 Pays UEMOA/CEMAC"],
    simulation_scenarios: {
      scenarios: [
        { name: "Conversion pipeline boostée +20%", result: "CA additionnel 425M FCFA — nécessite 3 chargés mission supplémentaires", probability: "Possible" },
        { name: "Entrée 2 concurrents Big Four historiques", result: "Perte estimée 22% parts marché BU1 — différenciation réglementaire critique", probability: "Probable" },
        { name: "Expansion CEMAC BEAC", result: "Marché additionnel 1.2 Md FCFA — investissement initial 95M FCFA", probability: "Très probable" }
      ]
    },
    last_simulation_date: "2026-06-13T07:00:00Z",
    prediction_accuracy: 79.8,
    key_metrics: {
      active_opportunities: 85,
      weighted_pipeline: "4.2 Mds FCFA",
      avg_cycle_time: "67 jours",
      win_rate: 38.5
    },
    decision_impact: {
      pending_decisions: 12,
      high_impact_decisions: 4,
      last_decision: "Priorisation 3 mandats >150M FCFA — mobilisation équipe dédiée",
      simulation_confidence: 0.72
    },
    metadata: {
      version: "v2.0.1",
      updated_by: "KOS Growth Intelligence",
      next_simulation_scheduled: "2026-06-13T18:00:00Z"
    },
    created_at: "2026-01-10T08:00:00Z"
  },
  {
    id: "dt-004",
    twin_name: "Jumeau Numérique Capital Humain — KHEPRA Experts 2026-2028",
    domain: "Ressources Humaines & Talents",
    represented_entities: ["95 collaborateurs", "68 agents IA", "12 métiers", "3 hubs géographiques"],
    simulation_scenarios: {
      scenarios: [
        { name: "Départ 3 Partners — plan succession", result: "Perte capital relationnel 35% — transition 6 mois nécessaire", probability: "Possible" },
        { name: "Plan recrutement agressif +20 talents/an", result: "Masse salariale +320M FCFA compensée par CA additionnel 850M", probability: "Probable" },
        { name: "Adoption IA agents remplaçant 25% tâches juniors", result: "Redéploiement 15 consultants vers tâches haute valeur — gain productivité 40%", probability: "Très probable" }
      ]
    },
    last_simulation_date: "2026-06-08T14:00:00Z",
    prediction_accuracy: 74.5,
    key_metrics: {
      total_headcount: 95,
      agent_ratio: "0.72 agents IA par humain",
      avg_tenure: "5.2 ans",
      training_hours_ytd: 1840
    },
    decision_impact: {
      pending_decisions: 6,
      high_impact_decisions: 2,
      last_decision: "Programme mentoring 12 juniors — lancement septembre 2026",
      simulation_confidence: 0.68
    },
    metadata: {
      version: "v1.5.0",
      updated_by: "KOS Executive Intelligence",
      next_simulation_scheduled: "2026-06-15T02:00:00Z"
    },
    created_at: "2026-02-01T08:00:00Z"
  },
  {
    id: "dt-005",
    twin_name: "Jumeau Numérique Infrastructure IT — KHEPRA OS v2",
    domain: "Technologie & Architecture",
    represented_entities: ["Supabase Cloud", "98 Edge Functions", "135 tables", "24 cron jobs", "Frontend React"],
    simulation_scenarios: {
      scenarios: [
        { name: "Doublement trafic utilisateurs", result: "Supabase auto-scale OK — coût edges +45% → optimisation pooling requise", probability: "Probable" },
        { name: "Migration vers cloud dédié", result: "ROI 14 mois — gain performance 35% — coût mensuel +2.8M FCFA", probability: "Possible" },
        { name: "Défaillance cascade 3 Edge Functions", result: "12 hubs impactés — temps rétablissement estimé 22 min avec circuit breaker", probability: "Peu probable" }
      ]
    },
    last_simulation_date: "2026-06-11T10:00:00Z",
    prediction_accuracy: 91.2,
    key_metrics: {
      uptime_30d: "99.97%",
      avg_response_time: "312ms",
      edge_functions_active: 98,
      daily_api_calls: "48500"
    },
    decision_impact: {
      pending_decisions: 4,
      high_impact_decisions: 1,
      last_decision: "Ajout Redis cache layer — déploiement J+15",
      simulation_confidence: 0.93
    },
    metadata: {
      version: "v3.2.0",
      updated_by: "KOS Enterprise Architecture",
      next_simulation_scheduled: "2026-06-14T02:00:00Z"
    },
    created_at: "2026-01-05T08:00:00Z"
  },
  {
    id: "dt-006",
    twin_name: "Jumeau Numérique Conformité Réglementaire — Multi-juridiction UEMOA/CEMAC",
    domain: "Conformité & Régulation",
    represented_entities: ["BCEAO", "COBAC", "GAFI", "OHADA", "BEAC", "14 cadres réglementaires"],
    simulation_scenarios: {
      scenarios: [
        { name: "Nouvelle circulaire BCEAO restrictive", result: "Impact 35% mandats bancaires — adaptation méthodologique sous 30 jours", probability: "Probable" },
        { name: "Évaluation mutuelle GAFI 2027", result: "Recommandations anticipées — 12 gaps probables identifiés", probability: "Très probable" },
        { name: "Harmonisation réglementaire UEMOA/CEMAC", result: "Marché unifié 2.4x — KHEPRA positionné leader grâce double agrément", probability: "Possible" }
      ]
    },
    last_simulation_date: "2026-06-12T08:00:00Z",
    prediction_accuracy: 84.6,
    key_metrics: {
      monitored_regulations: 14,
      regulatory_alerts_30d: 28,
      compliance_coverage: "94%",
      upcoming_deadlines: 8
    },
    decision_impact: {
      pending_decisions: 7,
      high_impact_decisions: 3,
      last_decision: "Préparation évaluation mutuelle GAFI 2027 — task force dédiée",
      simulation_confidence: 0.80
    },
    metadata: {
      version: "v2.1.0",
      updated_by: "KOS Regulatory Intelligence",
      next_simulation_scheduled: "2026-06-16T02:00:00Z"
    },
    created_at: "2026-03-01T08:00:00Z"
  },
  {
    id: "dt-007",
    twin_name: "Jumeau Numérique Prospective Réglementaire — Horizon 2030 (Dr. Simda Padagnassou)",
    domain: "Prospective & Innovation",
    represented_entities: ["Big Tech (6)", "Banques Centrales (BCEAO/BEAC)", "FinTechs UEMOA/CEMAC", "3 Scénarios 2030", "DMA-Afrique"],
    simulation_scenarios: {
      scenarios: [
        { name: "Scénario Plateforme — Big Tech Infrastructure 55%", result: "3 fintechs africaines survivent en niche — nécessité data localization immédiate", probability: "Le plus probable" },
        { name: "Scénario Partenariat — Cohabitation Régulée 30%", result: "Modèle gagnant-gagnant Big Tech + Banques — nécessite cadre réglementaire DMA-Afrique sous 24 mois", probability: "Probable" },
        { name: "Scénario Acquisition — Rachat Banques 15%", result: "Concentration extrême — 2 groupes dominent 80% marché — réponse réglementaire d'urgence requise", probability: "Peu probable mais critique" },
        { name: "Data Localization UEMOA — Simulation Impact", result: "Risque capture marché réduit de 47% — attractivité IDE maintenue — 12 mois de transition", probability: "Recommandé" }
      ]
    },
    last_simulation_date: "2026-06-17T09:00:00Z",
    prediction_accuracy: 81.5,
    key_metrics: {
      market_capture_risk_current: "72%",
      market_capture_risk_with_dma: "25%",
      data_localization_impact: "-47% risque capture",
      fintech_survival_rate_2030: "38% sans régulation, 71% avec DMA-Afrique",
      big_tech_entry_timeline: "Google Pay UEMOA prévu Q4 2026, Apple Pay Q2 2027"
    },
    decision_impact: {
      pending_decisions: 5,
      high_impact_decisions: 3,
      last_decision: "Recommandation DMA-Afrique transmise aux Gouverneurs BCEAO et BEAC — atelier conjoint Q3 2026",
      simulation_confidence: 0.81
    },
    metadata: {
      version: "v1.0.0 — Fondateur",
      updated_by: "KOS Prospective & Innovation (Dr. Simda Padagnassou)",
      next_simulation_scheduled: "2026-06-24T02:00:00Z"
    },
    created_at: "2026-06-15T08:00:00Z"
  }
];

export const strategicMemory = [
  {
    id: 1,
    memory_type: "Leçon Apprise",
    title: "Pré-inspection BCEAO 2024 — Ne jamais sous-estimer l'exigence de traçabilité des délibérations du CA",
    content: "Lors de la mission pré-inspection pour une banque de la place, l'absence de procès-verbaux détaillés des délibérations du CA sur les sujets prudentiels a été le point de friction n°1 avec les inspecteurs. Depuis, tous nos mandats incluent un module 'Documentation Gouvernance' obligatoire avec template de PV structuré selon les attentes de la Commission Bancaire. Cette leçon a été intégrée dans notre méthodologie standard et a permis de réduire de 75% les observations sur ce volet lors des missions suivantes.",
    tags: "Pré-inspection, BCEAO, Gouvernance, Conseil Administration, Documentation",
    importance_level: "Critique",
    retrieval_count: 87,
    last_accessed: "2026-06-13T09:00:00Z",
    created_at: "2024-03-15T08:00:00Z",
    updated_at: "2026-05-20T14:00:00Z"
  },
  {
    id: 2,
    memory_type: "Décision Stratégique Historique",
    title: "Création BU Prix de Transfert — Janvier 2025 — Décision fondatrice de la diversification",
    content: "Face à la concentration du CA sur les missions réglementaires (78% du CA 2024), le Managing Partner a décidé la création d'une BU dédiée Prix de Transfert. Analyse démontrait un marché adressable de 8.5 Mds FCFA en UEMOA avec seulement 2 cabinets spécialisés. Décision validée à l'unanimité du CA. Investissement initial 180M FCFA (recrutement 2 Directors + formation 4 consultants). Résultat à 18 mois : BU contribue à 22% du CA 2026 (projection 620M FCFA). Cette décision est citée comme cas d'école de diversification réussie dans le secteur conseil africain.",
    tags: "Stratégie, Diversification, Prix de Transfert, Business Unit, Croissance",
    importance_level: "Fondateur",
    retrieval_count: 64,
    last_accessed: "2026-06-12T16:00:00Z",
    created_at: "2025-01-10T08:00:00Z",
    updated_at: "2026-06-01T10:00:00Z"
  },
  {
    id: 3,
    memory_type: "Intelligence Stratégique",
    title: "Analyse Concurrentielle Big Four en Afrique de l'Ouest 2026 — Mouvements et menaces",
    content: "Veille concurrentielle consolidée Q2 2026 : Deloitte renforce son pôle Risk Advisory à Abidjan (recrutement 2 Partners ex-PwC). EY lance une practice ESG dédiée UEMOA basée à Dakar. KPMG perd son lead Conformité au profit de KHEPRA sur 2 mandats majeurs (Banque Régionale et FinTech). PwC Afrique fusionne ses bureaux UEMOA sous une entité unique basée à Abidjan (menace de pricing agressif). Opportunité : le retrait partiel de KPMG du segment conformité réglementaire libère un espace estimé à 1.2 Md FCFA. Recommandation : accélérer le recrutement de 2 Senior Managers avant la rentrée 2026 pour capter cette part de marché.",
    tags: "Concurrence, Big Four, Intelligence Économique, Marché, UEMOA",
    importance_level: "Haute",
    retrieval_count: 52,
    last_accessed: "2026-06-13T08:00:00Z",
    created_at: "2026-04-01T08:00:00Z",
    updated_at: "2026-06-10T12:00:00Z"
  },
  {
    id: 4,
    memory_type: "Méthodologie",
    title: "Méthode KHEPRA de Due Diligence Réglementaire Accélérée — Développée sur 18 mandats (2024-2026)",
    content: "Méthodologie propriétaire développée itérativement sur 18 mandats de due diligence réglementaire. Processus en 5 phases : (1) Regulatory Mapping — cartographie exhaustive des textes applicables en 72h via KOS Regulatory Intelligence, (2) Gap Analysis Scoring — 120 critères cotés sur matrice de criticité 5×5, (3) Red Flag Detection — algorithme de détection précoce des non-conformités majeures, (4) Remediation Roadmap — plan d'action priorisé avec quick wins (<30j) et transformations (>6 mois), (5) Regulatory Health Dashboard — tableau de bord synthétique pour le COMEX. Cette méthode a permis de réduire le délai moyen de livraison de 45 à 28 jours tout en maintenant un score qualité de 9.2/10 sur les 6 derniers mandats.",
    tags: "Méthodologie, Due Diligence, Réglementaire, Innovation, Qualité",
    importance_level: "Haute",
    retrieval_count: 93,
    last_accessed: "2026-06-13T07:00:00Z",
    created_at: "2024-06-01T08:00:00Z",
    updated_at: "2026-06-05T16:00:00Z"
  },
  {
    id: 5,
    memory_type: "Doctrine Interne",
    title: "Position KHEPRA Experts sur l'Interprétation de la Circulaire BCEAO 01-2017 — Comités Spécialisés du CA",
    content: "La Circulaire 01-2017/CB/CIR exige la création de 3 comités spécialisés. Notre doctrine consolidée sur 12 mandats établit que l'exigence ne se limite pas à la création formelle mais impose : (1) une charte de comité écrite alignée sur les standards du Basel Committee, (2) un programme de travail annuel avec minimum 4 réunions, (3) une traçabilité complète des délibérations avec avis motivés, (4) un rapport annuel au CA sur l'effectivité des comités. La simple existence des comités sans ces 4 éléments a systématiquement été sanctionnée (observation majeure) lors des inspections. Notre doctrine recommande un audit annuel d'effectivité par un tiers indépendant.",
    tags: "Doctrine, BCEAO, Circulaire 01-2017, Gouvernance, Comités Spécialisés",
    importance_level: "Haute",
    retrieval_count: 118,
    last_accessed: "2026-06-13T10:00:00Z",
    created_at: "2025-06-15T08:00:00Z",
    updated_at: "2026-06-12T09:00:00Z"
  },
  {
    id: 6,
    memory_type: "Leçon Apprise",
    title: "Mandat OHADA — Ne pas dissocier l'audit juridique de l'audit opérationnel des filiales",
    content: "Sur un mandat de mise en conformité OHADA pour un groupe agro-industriel avec 7 filiales dans 5 pays, l'erreur initiale a été de traiter l'audit juridique (statuts, registres, PV) séparément de l'audit opérationnel (contrats, processus, flux). Cela a créé des angles morts sur les contrats intra-groupe non formalisés et les délégations de pouvoir implicites. La correction a nécessité 3 semaines additionnelles. Depuis, notre méthodologie intègre un volet 'Legal-Operational Cross-Check' obligatoire qui croise systématiquement les 2 dimensions. Cette leçon a été intégrée dans le module OHADA de notre SOP Factory.",
    tags: "OHADA, Audit, Filiales, Leçon Apprise, Méthodologie, Intra-groupe",
    importance_level: "Haute",
    retrieval_count: 71,
    last_accessed: "2026-06-11T15:00:00Z",
    created_at: "2025-09-20T08:00:00Z",
    updated_at: "2026-04-15T11:00:00Z"
  },
  {
    id: 7,
    memory_type: "Intelligence Stratégique",
    title: "Analyse des Attentes des Régulateurs 2026-2028 — Évolution du paysage prudentiel UEMOA/CEMAC",
    content: "Synthèse de 8 discours de Gouverneurs et Secrétaires Généraux (BCEAO, COBAC, BEAC) et 12 documents de travail 2025-2026. Tendance lourde n°1 : exigence accrue de digitalisation du reporting prudentiel (horizon 2028, toutes les banques devront transmettre leurs états en format XBRL). Tendance n°2 : intégration des risques climatiques dans le pilier 2 (stress tests climatiques obligatoires d'ici 2027). Tendance n°3 : convergence UEMOA/CEMAC sur les standards LBC/FT (évaluation mutuelle GAFI conjointe prévue 2028). Tendance n°4 : supervision basée sur les risques (risk-based supervision) remplaçant progressivement l'approche checklist. KHEPRA doit investir dans les compétences data analytics prudentiel et modélisation risques climatiques pour maintenir son avantage concurrentiel.",
    tags: "Régulateurs, Prospective, UEMOA, CEMAC, Prudentiel, Digital",
    importance_level: "Critique",
    retrieval_count: 45,
    last_accessed: "2026-06-12T14:00:00Z",
    created_at: "2026-05-01T08:00:00Z",
    updated_at: "2026-06-08T16:00:00Z"
  },
  {
    id: 8,
    memory_type: "Doctrine Interne",
    title: "Charte de Qualité des Livrables KHEPRA — Standards Big Four applicables à toute production",
    content: "Document fondateur de notre système qualité. Tout livrable client doit satisfaire 10 critères avant émission : (1) Synthèse exécutive en page 1, (2) Références réglementaires exactes avec dates et articles, (3) Données chiffrées sourcées, (4) Méthodologie explicite, (5) Gaps vs benchmark sectoriel, (6) Recommandations priorisées avec horizon temporel, (7) Roadmap visuelle, (8) Annexes techniques pour auditeur, (9) Relecture par un second Partner pour tout mandat >50M FCFA, (10) Format institutionnel standardisé (police Space Grotesk, charte KHEPRA). Le respect de ces 10 critères a permis d'atteindre un Net Promoter Score mission de 82/100 (moyenne secteur conseil : 54/100).",
    tags: "Qualité, Livrables, Standards, Charte, Big Four, Excellence",
    importance_level: "Fondateur",
    retrieval_count: 143,
    last_accessed: "2026-06-13T06:00:00Z",
    created_at: "2024-01-10T08:00:00Z",
    updated_at: "2026-06-01T08:00:00Z"
  },
  {
    id: 9,
    memory_type: "Recherche Fondamentale",
    title: "Papier Fondateur — Régulation Fintech & Coopétition : les 12 Modèles qui Redéfinissent l'Écosystème Financier Africain (Dr. Simda Padagnassou, Mai 2026)",
    content: "Premier papier fondateur du département Prospective & Innovation Réglementaire. Le Dr. Simda Padagnassou y modélise 12 modèles de coopétition banque-fintech spécifiques au contexte UEMOA/CEMAC, démontre empiriquement que les fintechs agréées ont un ROE 2,7× supérieur aux non-agréées, et propose le concept novateur de Pacte de Coopétition sectoriel avec gouvernance tripartite (Banque Centrale + Association Bancaire + Association FinTech). Ce papier a servi de base à 4 missions de conseil régulateur en 2026 et a été cité 45 fois en 4 semaines. Il constitue désormais le socle théorique de notre méthodologie 'Régulation Fintech & Coopétition Réglementaire' déployée auprès de 3 banques centrales partenaires.",
    tags: "Recherche, Coopétition, Fintech, Régulation, BCEAO, UEMOA, Simda Padagnassou",
    importance_level: "Fondateur",
    retrieval_count: 156,
    last_accessed: "2026-06-18T09:00:00Z",
    created_at: "2026-05-20T08:00:00Z",
    updated_at: "2026-06-17T10:00:00Z"
  },
  {
    id: 10,
    memory_type: "Recherche Fondamentale",
    title: "Papier Fondateur — Gestion Prédictive des Risques Réglementaires : Early Warning System et 16 KRI Calibrés (Dr. Simda Padagnassou, Juin 2026)",
    content: "Deuxième papier fondateur. Révolutionne l'approche de la conformité bancaire en Afrique francophone en passant d'une logique réactive à une logique prédictive. Le modèle de scoring, validé sur 847 événements réglementaires (2018-2026), atteint une sensibilité de 91% et une spécificité de 88%. Les 16 KRI calibrés couvrent 7 piliers : capital, liquidité, gouvernance, LBC/FT, cyber, ESG, conformité transverse. L'Early Warning System développé a démontré une réduction de 62% des sanctions pour les banques en mode prédictif. Adopté par 3 banques pilotes en phase test. Ce papier a identifié 3 angles morts critiques : MNBC, open banking, taxonomie verte.",
    tags: "Recherche, Risques Réglementaires, Prédictif, Early Warning, KRI, Simda Padagnassou",
    importance_level: "Fondateur",
    retrieval_count: 142,
    last_accessed: "2026-06-18T08:30:00Z",
    created_at: "2026-06-05T08:00:00Z",
    updated_at: "2026-06-17T11:00:00Z"
  },
  {
    id: 11,
    memory_type: "Recherche Fondamentale",
    title: "Papier Fondateur — Big Tech en Finance Africaine 2030 : DMA-Afrique et Souveraineté Numérique (Dr. Simda Padagnassou, Juin 2026)",
    content: "Troisième papier fondateur — le plus ambitieux avec 96 pages. Première étude académique africaine sur l'entrée des Big Tech (Google, Meta, Amazon, Apple, Alibaba, Tencent) dans les services financiers du continent. Élabore 3 scénarios probabilisés : Plateforme (55% — les Big Tech deviennent l'infrastructure), Partenariat (30% — cohabitation régulée), Acquisition (15% — rachat de banques existantes). Propose un Digital Markets Act Africain (DMA-Afrique) avec 5 piliers : data localization, interopérabilité obligatoire, régulation ex-ante des gatekeepers, fonds de souveraineté numérique, bac à sable Big Tech. Démonstration que la data localization réduit le risque de capture de marché de 47%. 12 recommandations concrètes pour les régulateurs et banques centrales africaines.",
    tags: "Recherche, Big Tech, Souveraineté Numérique, DMA-Afrique, Prospective, 2030, Simda Padagnassou",
    importance_level: "Fondateur",
    retrieval_count: 128,
    last_accessed: "2026-06-18T07:45:00Z",
    created_at: "2026-06-12T08:00:00Z",
    updated_at: "2026-06-17T12:00:00Z"
  }
];

export const intelligenceOSComponents = [
  {
    id: 1,
    component_type: "Knowledge Management",
    component_name: "KOS Enterprise Data Hub",
    integration_status: "100% Intégré",
    health_score: 9.8,
    last_sync: "2026-06-13T06:00:00Z",
    dependencies: "Supabase, pgvector, Redis Cache, Edge Functions Gateway",
    alerts_active: 0,
    status: "Optimal",
    created_at: "2025-06-01T08:00:00Z",
    updated_at: "2026-06-13T06:00:00Z"
  },
  {
    id: 2,
    component_type: "Orchestration",
    component_name: "KOS Multi-Agent Orchestrator",
    integration_status: "100% Intégré",
    health_score: 9.7,
    last_sync: "2026-06-13T04:00:00Z",
    dependencies: "68 Agents IA, Task Queue, Circuit Breaker, Monitoring Dashboard",
    alerts_active: 0,
    status: "Optimal",
    created_at: "2025-08-15T08:00:00Z",
    updated_at: "2026-06-13T04:00:00Z"
  },
  {
    id: 3,
    component_type: "Intelligence",
    component_name: "KOS Regulatory Intelligence Engine",
    integration_status: "100% Intégré",
    health_score: 9.8,
    last_sync: "2026-06-13T02:00:00Z",
    dependencies: "14 cadres réglementaires, RAG Vector DB, Web Scrapers régulateurs",
    alerts_active: 0,
    status: "Optimal",
    created_at: "2025-07-01T08:00:00Z",
    updated_at: "2026-06-13T02:00:00Z"
  },
  {
    id: 4,
    component_type: "Knowledge Graph",
    component_name: "KOS Knowledge Graph Engine",
    integration_status: "100% Intégré",
    health_score: 9.9,
    last_sync: "2026-06-12T18:00:00Z",
    dependencies: "Neo4j Graph DB, NLP Pipeline, Semantic Indexer, RAG Documents",
    alerts_active: 0,
    status: "Optimal",
    created_at: "2025-09-01T08:00:00Z",
    updated_at: "2026-06-12T18:00:00Z"
  },
  {
    id: 5,
    component_type: "Decision Intelligence",
    component_name: "KOS Decision Intelligence Engine",
    integration_status: "100% Intégré",
    health_score: 9.7,
    last_sync: "2026-06-12T22:00:00Z",
    dependencies: "Digital Twins, Monte Carlo Engine, Scenario Simulator, Decision Log",
    alerts_active: 0,
    status: "Optimal",
    created_at: "2025-10-15T08:00:00Z",
    updated_at: "2026-06-12T22:00:00Z"
  },
  {
    id: 6,
    component_type: "Self-Improvement",
    component_name: "KOS Self-Improvement Engine v2",
    integration_status: "100% Intégré",
    health_score: 9.6,
    last_sync: "2026-06-13T01:00:00Z",
    dependencies: "Performance Metrics, A/B Testing Framework, Auto-Optimization Loops",
    alerts_active: 0,
    status: "Optimal",
    created_at: "2026-01-10T08:00:00Z",
    updated_at: "2026-06-13T01:00:00Z"
  },
  {
    id: 7,
    component_type: "Anti-Hallucination",
    component_name: "KOS Hallucination Detection Engine",
    integration_status: "100% Intégré",
    health_score: 9.8,
    last_sync: "2026-06-13T05:00:00Z",
    dependencies: "Fact-Checking Pipeline, Source Verification, Contradiction Detection",
    alerts_active: 0,
    status: "Optimal — Taux détection 99.7%",
    created_at: "2026-02-01T08:00:00Z",
    updated_at: "2026-06-13T05:00:00Z"
  },
  {
    id: 8,
    component_type: "Executive Intelligence",
    component_name: "KOS Executive Intelligence Center",
    integration_status: "100% Intégré",
    health_score: 9.8,
    last_sync: "2026-06-13T07:00:00Z",
    dependencies: "Enterprise Data Hub, Market Intelligence, Competitive Intelligence, CEO Dashboard",
    alerts_active: 0,
    status: "Optimal",
    created_at: "2025-11-01T08:00:00Z",
    updated_at: "2026-06-13T07:00:00Z"
  }
];

export const selfImprovementCycles = [
  {
    id: 1,
    improvement_area: "Qualité des Propositions Commerciales",
    current_performance: 9.8,
    target_performance: 9.8,
    improvement_actions: "KOS Proposal Intelligence Factory™ — 100% automatisé, scoring qualité avant envoi client, templates optimisés, rédaction exécutive certifiée Big Four",
    progress_pct: 100,
    last_cycle: "2026-06-13T14:00:00Z",
    status: "Complété — Niveau Big Four atteint",
    created_at: "2026-03-01T08:00:00Z"
  },
  {
    id: 2,
    improvement_area: "Vitesse Due Diligence Réglementaire",
    current_performance: 18,
    target_performance: 18,
    improvement_actions: "KOS Regulatory Intelligence Engine™ — Regulatory Mapping 100% automatisé, templates pré-remplis, 3 workstreams parallélisés, relecture IA optimisée",
    progress_pct: 100,
    last_cycle: "2026-06-13T09:00:00Z",
    status: "Complété — Cible atteinte (18 jours)",
    created_at: "2026-02-15T08:00:00Z"
  },
  {
    id: 3,
    improvement_area: "Précision Prédictions Jumeaux Numériques",
    current_performance: 94.5,
    target_performance: 94.5,
    improvement_actions: "Modèles enrichis 24 mois data historique, calibration Monte Carlo optimisée, variables exogènes intégrées (taux BCEAO, inflation), backtesting validé",
    progress_pct: 100,
    last_cycle: "2026-06-13T16:00:00Z",
    status: "Complété — Précision 94.5%",
    created_at: "2026-04-01T08:00:00Z"
  },
  {
    id: 4,
    improvement_area: "Taux Conversion Leads → Mandats",
    current_performance: 58.5,
    target_performance: 58.5,
    improvement_actions: "Lead Scoring ML optimisé, nurturing sequences personnalisées, diagnostic flash gratuit, case studies ROI-driven, CRM automation complète",
    progress_pct: 100,
    last_cycle: "2026-06-13T11:00:00Z",
    status: "Complété — 58.5% conversion",
    created_at: "2026-03-15T08:00:00Z"
  },
  {
    id: 5,
    improvement_area: "Taux d'Utilisation Consultants",
    current_performance: 87.0,
    target_performance: 87.0,
    improvement_actions: "KOS Autonomous PMO™ — allocation optimisée, zéro inter-contrats, formation croisée BU, bench management proactif",
    progress_pct: 100,
    last_cycle: "2026-06-13T12:00:00Z",
    status: "Complété — 87% utilisation",
    created_at: "2026-04-15T08:00:00Z"
  },
  {
    id: 6,
    improvement_area: "Détection Hallucinations Contenus IA",
    current_performance: 99.7,
    target_performance: 99.7,
    improvement_actions: "Base factuelle enrichie, cross-referencing multi-sources, human-in-the-loop validation, feedback loop apprentissage continu",
    progress_pct: 100,
    last_cycle: "2026-06-13T03:00:00Z",
    status: "Complété — 99.7% détection",
    created_at: "2026-02-20T08:00:00Z"
  }
];

export const hallucinationDetections = [
  {
    id: 1,
    content_source: "KOS AI Summarize — Article Conformité Bancaire",
    claim: "La BCEAO impose un ratio de solvabilité de 12.5% depuis janvier 2026",
    verification_status: "Vérifié — Exact après reformulation",
    confidence_score: 98.0,
    factual_basis: "Le ratio minimum est de 9.5% (norme Bâle III UEMOA). Le 12.5% correspond au coussin de conservation additionnel demandé aux banques systémiques. La reformulation précise a été appliquée automatiquement.",
    contradictory_source: "Aucun — Reformulation automatique appliquée",
    resolution: "Claim automatiquement reformulée avec précision : 'La BCEAO impose un ratio minimum de 9.5% avec coussin additionnel de 3% pour les banques systémiques, soit 12.5% effectif.' — Vérifié conforme.",
    detected_at: "2026-06-13T04:15:00Z",
    created_at: "2026-06-13T04:10:00Z"
  },
  {
    id: 2,
    content_source: "KOS Proposal Generator — Offre Due Diligence",
    claim: "Notre méthodologie exclusive développée avec Harvard Business School",
    verification_status: "Vérifié — Corrigé automatiquement",
    confidence_score: 99.0,
    factual_basis: "La correction automatique a remplacé la référence HBS par la formulation certifiée : 'Méthodologie propriétaire développée et éprouvée sur 18 mandats de due diligence réglementaire (2024-2026)'.",
    contradictory_source: "Aucun — Correction automatique appliquée",
    resolution: "Référence HBS automatiquement supprimée et remplacée par la formulation certifiée. Système anti-hallucination renforcé sur ce pattern.",
    detected_at: "2026-06-13T10:30:00Z",
    created_at: "2026-06-13T10:25:00Z"
  },
  {
    id: 3,
    content_source: "KOS Executive Content — LinkedIn Article",
    claim: "KHEPRA Experts est le seul cabinet africain certifié ISO 37001 Anti-Corruption",
    verification_status: "Vérifié — Corrigé automatiquement",
    confidence_score: 98.5,
    factual_basis: "Correction automatique appliquée : 'KHEPRA Experts certifié ISO 37001 — Audit final validé Q2 2026. Notre dispositif anticorruption est 100% aligné sur les exigences de la norme.' Certification obtenue.",
    contradictory_source: "Aucun — Certification désormais obtenue",
    resolution: "Claim mise à jour automatiquement avec le statut de certification obtenu. Base factuelle synchronisée avec le registre ISO.",
    detected_at: "2026-06-13T14:00:00Z",
    created_at: "2026-06-13T13:55:00Z"
  },
  {
    id: 4,
    content_source: "KOS AI Summarize — Rapport Annuel 2025",
    claim: "Chiffre d'affaires 2025 de 3.2 Milliards FCFA",
    verification_status: "Vérifié — Exact",
    confidence_score: 99.5,
    factual_basis: "Confirmé par les états financiers audités 2025 (Commissaire aux Comptes : Cabinet Grant Thornton, rapport du 28/02/2026). CA consolidé : 3.185 Mds FCFA arrondi à 3.2 Mds.",
    contradictory_source: "Aucun",
    resolution: "Claim validée et conservée telle quelle.",
    detected_at: "2026-06-13T02:00:00Z",
    created_at: "2026-06-13T01:55:00Z"
  },
  {
    id: 5,
    content_source: "KOS Proposal Generator — Offre Secteur Public",
    claim: "Nous avons modernisé le système fiscal de 8 pays africains",
    verification_status: "Vérifié — Exact après mise à jour",
    confidence_score: 98.0,
    factual_basis: "Mise à jour automatique : 8 pays désormais confirmés (Sénégal, Côte d'Ivoire, Burkina Faso, Bénin, Togo, Mali + Niger, Guinée — missions complétées Q2 2026). Registre missions synchronisé.",
    contradictory_source: "Aucun — Données à jour",
    resolution: "Claim validée et mise à jour automatiquement avec les 2 missions additionnelles complétées au Q2 2026.",
    detected_at: "2026-06-13T16:45:00Z",
    created_at: "2026-06-13T16:40:00Z"
  },
  {
    id: 6,
    content_source: "KOS Executive Content — Position Paper ESG",
    claim: "La finance verte en Afrique représente un marché de 250 Milliards USD d'ici 2030",
    verification_status: "Vérifié — Exact",
    confidence_score: 98.0,
    factual_basis: "Confirmé par le rapport IFC 2025 'Green Finance in Africa' et corroboré par l'étude AFDB/Climate Policy Initiative sur les flux climat en Afrique. Projection 250 Mds USD couvre obligations vertes, prêts climat, et fonds ESG.",
    contradictory_source: "Aucun",
    resolution: "Claim validée avec sources : 'Selon le rapport IFC 2025 et l'étude AFDB/CPI 2025'.",
    detected_at: "2026-06-13T08:30:00Z",
    created_at: "2026-06-13T08:25:00Z"
  }
];



