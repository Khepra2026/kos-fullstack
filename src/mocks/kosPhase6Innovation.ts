// KOS Phase 6 Autonomie Totale & Innovation™ — Mock Data
// Consortium PwC · Deloitte · EY · KPMG
// Mandat : Orchestration agentique autonome, infrastructure self-healing, R&D pipeline 2027
// Timeline : 8 — 19 Septembre 2026 (Semaine 11-12)
// Objectif : Score d'Innovation 105→110 — AUTONOMIE & AVANT-GARDE

export const phase6Stats = {
  execution_id: "KOS-PHASE6-INNOVATION-2026-09-08-001",
  launched_at: "2026-09-08T08:00:00Z",
  target_completion: "2026-09-19T18:00:00Z",
  assessor: "Consortium PwC · Deloitte · EY · KPMG — Innovation & Autonomy Practice",
  total_chantiers: 8,
  completed: 0,
  in_progress: 1,
  blocked: 0,
  open: 7,
  overall_progress: 6,
  starting_score: 105,
  target_score: 110,
  budget_total: "34 800 000 FCFA",
  budget_spent: "1 800 000 FCFA",
  commander_intent: "Propulser KOS au stade d'Autonomie Totale. Déployer l'orchestration agentique autonome avec boucle feedback fermée, l'infrastructure self-healing (zéro intervention humaine), l'intelligence prédictive avancée (forecasting 12 mois), l'intégration Voice/Conversational AI, le module Blockchain/Web3 pour la conformité réglementaire, l'Advanced Analytics & Data Monetization, l'Innovation Lab avec 6 projets R&D, et la roadmap stratégique 2027-2028. Score d'Innovation 110/110. KOS est le premier système autonome de niveau Big Four en Afrique."
};

export const phase6Chantiers = [
  {
    id: "P6I-001",
    chantier: "Orchestration Agentique Autonome — Boucle Feedback Fermée — 75 agents → 100",
    category: "IA Avancée",
    icon: "ri-brain-line",
    color: "#DC2626",
    priority: "P0",
    severity: "critical",
    status: "in_progress",
    progress: 20,
    responsible: "CTO + AI Lead + Multi-Agent Orchestrator",
    deadline: "2026-09-15",
    budget: "6 200 000 FCFA",
    kpi: "100 agents autonomes (+25) — 0 intervention humaine sur 95% des workflows — Score orchestration 98/100",
    effort: "12h",
    bloque: "Sans orchestration autonome complète, KOS reste semi-manuel. L'autonomie totale est le graal.",
    description: "Évolution de l'orchestration multi-agent vers l'autonomie totale : 1) Création de 25 nouveaux agents spécialisés (Analyse Jurisprudentielle, Due Diligence ESG Auto, Stress Test Automatique, Reporting COMEX Auto, Veille Concurrentielle, Rédaction Contractuelle, Traduction Assermentée, etc.), 2) Boucle feedback fermée — les agents apprennent de leurs erreurs sans intervention humaine (reinforcement learning), 3) Agent Supervisor — méta-agent qui supervise les 100 agents, détecte les dégradations, réalloue les ressources, 4) Cross-agent collaboration — les agents négocient entre eux (enchères de tâches, partage de contexte), 5) Dashboard autonomie — % workflows 100% autonomes, interventions humaines/jour, score confiance.",
    actions: [
      { id: "P6I-001-A1", action: "Développer 25 nouveaux agents spécialisés — specs, modèles, intégration orchestreur", status: "completed", owner: "AI Lead", effort: "4h" },
      { id: "P6I-001-A2", action: "Implémenter boucle feedback fermée — reinforcement learning inter-agents", status: "in_progress", owner: "CTO", effort: "3h" },
      { id: "P6I-001-A3", action: "Déployer Agent Supervisor — méta-agent monitoring 100 agents, réallocation ressources", status: "open", owner: "AI Lead", effort: "2h" },
      { id: "P6I-001-A4", action: "Activer cross-agent collaboration — enchères de tâches, partage contexte", status: "open", owner: "Multi-Agent Orchestrator", effort: "2h" },
      { id: "P6I-001-A5", action: "Dashboard autonomie — % workflows autonomes, interventions/jour, score confiance", status: "open", owner: "CTO", effort: "1h" }
    ],
    dependencies: []
  },
  {
    id: "P6I-002",
    chantier: "Infrastructure Self-Healing — Zéro intervention humaine — Résilience 99.99%",
    category: "Infrastructure",
    icon: "ri-heart-pulse-line",
    color: "#059669",
    priority: "P0",
    severity: "critical",
    status: "open",
    progress: 0,
    responsible: "DevOps Lead + CTO + RSSI",
    deadline: "2026-09-16",
    budget: "5 800 000 FCFA",
    kpi: "99.99% uptime — 0 incident nécessitant intervention humaine — Auto-récupération < 30s",
    effort: "10h",
    bloque: "L'intervention humaine est le maillon faible. Self-healing = résilience ultime.",
    description: "Transformation de l'infrastructure KOS en système auto-cicatrisant : 1) Détection proactive — ML prédictif sur 50 métriques (CPU, mémoire, latence, taux erreur, saturation pool DB) avec prédiction 5min avant panne, 2) Auto-récupération — 18 scénarios de panne avec playbooks auto-exécutables (restart edge function, scale Netlify, failover DB replica, purge CDN, rollback version), 3) Database self-healing — vacuum auto, index rebuild auto, replication lag auto-correct, 4) Chaos engineering — injection de pannes aléatoires 2×/semaine pour valider le self-healing (Chaos Monkey), 5) Certificate auto-renewal — SSL, API keys, tokens OAuth — rotation automatique 30j avant expiration.",
    actions: [
      { id: "P6I-002-A1", action: "ML prédictif 50 métriques — prédiction panne 5min avant, déclenchement auto-récupération", status: "open", owner: "CTO", effort: "3h" },
      { id: "P6I-002-A2", action: "Automatiser 18 playbooks self-healing — restart, scale, failover, purge, rollback", status: "open", owner: "DevOps Lead", effort: "3h" },
      { id: "P6I-002-A3", action: "Database self-healing — vacuum auto, index rebuild, replication lag correct", status: "open", owner: "DevOps Lead", effort: "2h" },
      { id: "P6I-002-A4", action: "Déployer Chaos Monkey — injection pannes aléatoires 2×/semaine, validation self-healing", status: "open", owner: "RSSI", effort: "1h" },
      { id: "P6I-002-A5", action: "Certificate auto-renewal — SSL, API keys, OAuth tokens — rotation 30j avant expiration", status: "open", owner: "DevOps Lead", effort: "1h" }
    ],
    dependencies: ["P6I-001"]
  },
  {
    id: "P6I-003",
    chantier: "Intelligence Prédictive Avancée — Forecasting 12 mois — Moteur de Décision",
    category: "Data & IA",
    icon: "ri-line-chart-line",
    color: "#7C3AED",
    priority: "P0",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "Data Science Lead + CFO + CTO",
    deadline: "2026-09-17",
    budget: "4 500 000 FCFA",
    kpi: "Forecasting 12 mois avec précision 92% — 20 scénarios simulés — Décisions auto-générées",
    effort: "9h",
    bloque: "Sans forecasting fiable, Khepra navigue à vue. L'intelligence prédictive = avantage concurrentiel décisif.",
    description: "Déploiement d'un moteur d'intelligence prédictive avancée : 1) Forecasting 12 mois — CA, pipeline, trésorerie, effectifs, marchés par zone (UEMOA, CEMAC, Nigéria, Angola), 2) 20 scénarios simulés (Monte Carlo 10K itérations) — scénario optimiste, baseline, pessimiste, crise systémique, opportunité exceptionnelle, 3) Moteur de décision — recommandations auto-générées (investir, recruter, pivoter, réduire) basées sur les forecasts, 4) Early warning system — détection signaux faibles 90j avant impact (baisse pipeline, attrition clients, pression réglementaire), 5) Intégration données externes — taux BCEAO, inflation UEMOA, croissance PIB zone franc, stabilité politique.",
    actions: [
      { id: "P6I-003-A1", action: "Déployer forecasting engine 12 mois — CA, pipeline, trésorerie, effectifs par zone", status: "open", owner: "Data Science Lead", effort: "3h" },
      { id: "P6I-003-A2", action: "Simuler 20 scénarios Monte Carlo 10K itérations — optimiste→crise systémique", status: "open", owner: "Data Science Lead", effort: "2h" },
      { id: "P6I-003-A3", action: "Moteur de décision auto — recommandations investir/recruter/pivoter/réduire", status: "open", owner: "CFO", effort: "2h" },
      { id: "P6I-003-A4", action: "Early warning system — signaux faibles 90j avant impact", status: "open", owner: "CTO", effort: "1h30" },
      { id: "P6I-003-A5", action: "Intégration données externes — BCEAO, inflation, PIB, stabilité politique", status: "open", owner: "Data Science Lead", effort: "30 min" }
    ],
    dependencies: ["P6I-001"]
  },
  {
    id: "P6I-004",
    chantier: "Voice & Conversational AI — Assistant KOS vocal — WhatsApp Business API",
    category: "Innovation",
    icon: "ri-mic-line",
    color: "#F59E0B",
    priority: "P1",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "CTO + AI Lead + Product Lead",
    deadline: "2026-09-18",
    budget: "5 500 000 FCFA",
    kpi: "Assistant KOS vocal FR/EN/PT — WhatsApp Business intégré — 500 conversations/jour",
    effort: "10h",
    bloque: "L'Afrique est mobile-first et voice-first. Sans canal vocal, KOS ignore 70% des utilisateurs potentiels.",
    description: "Déploiement d'interfaces conversationnelles pour KOS : 1) Assistant vocal KOS — NLP vocal trilingue (FR/EN/PT), commandes vocales (« KOS, quel est le statut de conformité de la Banque Atlantique ? »), 2) WhatsApp Business API — canal officiel Khepra Experts, réponses automatiques aux questions réglementaires fréquentes, 3) Chatbot KOS intégré au site — widget conversationnel avec RAG réglementaire (52 documents BCEAO/COBAC/OHADA), 4) Voice-to-text réglementaire — retranscription automatique des réunions COMEX, CA, audits avec résumé KOS, 5) Intégration calendrier — prise de RDV vocale (« KOS, programme un audit de conformité pour le 25 Septembre »).",
    actions: [
      { id: "P6I-004-A1", action: "Développer assistant vocal KOS trilingue FR/EN/PT — NLP vocal + commandes", status: "open", owner: "AI Lead", effort: "3h" },
      { id: "P6I-004-A2", action: "Déployer WhatsApp Business API — canal officiel, réponses auto réglementaires", status: "open", owner: "CTO", effort: "2h30" },
      { id: "P6I-004-A3", action: "Intégrer chatbot RAG sur le site — widget conversationnel 52 documents", status: "open", owner: "Product Lead", effort: "2h" },
      { id: "P6I-004-A4", action: "Voice-to-text réglementaire — retranscription réunions + résumé KOS auto", status: "open", owner: "AI Lead", effort: "1h30" },
      { id: "P6I-004-A5", action: "Intégration calendrier — prise de RDV vocale + confirmation auto", status: "open", owner: "CTO", effort: "1h" }
    ],
    dependencies: ["P6I-001"]
  },
  {
    id: "P6I-005",
    chantier: "Blockchain & Web3 — Registre Conformité Distribué — Smart Contracts OHADA",
    category: "Innovation",
    icon: "ri-link-unlink-m",
    color: "#0891B2",
    priority: "P1",
    severity: "medium",
    status: "open",
    progress: 0,
    responsible: "CTO + Regulatory Lead + Innovation Lab",
    deadline: "2026-09-19",
    budget: "4 200 000 FCFA",
    kpi: "Proof-of-Concept Blockchain Conformité — 3 smart contracts déployés (testnet) — Partenariat OHADA",
    effort: "9h",
    bloque: "La blockchain est l'avenir de la conformité réglementaire. Khepra doit être pionnier, pas suiveur.",
    description: "Exploration et prototypage d'applications blockchain pour la conformité réglementaire : 1) Registre de Conformité Distribué — chaque audit génère un hash blockchain (preuve immuable de conformité), vérifiable par les régulateurs, 2) Smart Contracts OHADA — automatisation des obligations déclaratives (publication légale, dépôt greffe, mise à jour RCCM), 3) Tokenisation des actifs réglementaires — suivi des licences, agréments, certifications avec expiration automatique, 4) Partenariat OHADA — proposition de groupe de travail blockchain pour le droit des affaires africain, 5) Livre blanc — « Blockchain et Conformité Réglementaire en Afrique Francophone » (publication Q4 2026).",
    actions: [
      { id: "P6I-005-A1", action: "Développer POC Registre Conformité Distribué — hash blockchain par audit", status: "open", owner: "CTO", effort: "3h" },
      { id: "P6I-005-A2", action: "Prototyper 3 Smart Contracts OHADA — obligations déclaratives automatisées", status: "open", owner: "Innovation Lab", effort: "2h30" },
      { id: "P6I-005-A3", action: "Tokenisation actifs réglementaires — licences, agréments, certifications", status: "open", owner: "Regulatory Lead", effort: "1h30" },
      { id: "P6I-005-A4", action: "Proposer groupe de travail blockchain à l'OHADA — position paper", status: "open", owner: "Managing Partner", effort: "1h" },
      { id: "P6I-005-A5", action: "Rédiger Livre Blanc Blockchain & Conformité — publication Q4 2026", status: "open", owner: "Innovation Lab", effort: "1h" }
    ],
    dependencies: ["P6I-001", "P6I-003"]
  },
  {
    id: "P6I-006",
    chantier: "Advanced Analytics & Data Monetization — Data as a Service (DaaS)",
    category: "Data",
    icon: "ri-bar-chart-box-line",
    color: "#2563EB",
    priority: "P0",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "Data Science Lead + CFO + Growth Lead",
    deadline: "2026-09-17",
    budget: "3 800 000 FCFA",
    kpi: "3 produits DaaS lancés — 25 clients data — CA data 85M FCFA/an",
    effort: "8h",
    bloque: "La donnée réglementaire est un actif dormante. La monétiser crée une nouvelle BU profitable.",
    description: "Création d'une offre Data as a Service (DaaS) à partir du capital données KOS : 1) Baromètre Conformité Bancaire UEMOA — abonnement trimestriel (données agrégées et anonymisées de 50+ banques), 2) Indice Risque Réglementaire Pays — scoring 12 pays africains sur 20 critères (mis à jour mensuel), 3) Base de Données Jurisprudentielles — accès API aux 500+ décisions de justice OHADA/BCEAO/COBAC analysées par KOS, 4) Plateforme DaaS — API payante avec clés, quotas, documentation Swagger, 5) Partenariats distribution — Bloomberg Terminal, Refinitiv, Ecofin Pro.",
    actions: [
      { id: "P6I-006-A1", action: "Lancer Baromètre Conformité Bancaire UEMOA — abonnement trimestriel, onboarding 10 clients", status: "open", owner: "Data Science Lead", effort: "2h30" },
      { id: "P6I-006-A2", action: "Développer Indice Risque Réglementaire Pays — scoring 12 pays, 20 critères", status: "open", owner: "Data Science Lead", effort: "2h" },
      { id: "P6I-006-A3", action: "Base Données Jurisprudentielles — API 500+ décisions analysées", status: "open", owner: "CTO", effort: "1h30" },
      { id: "P6I-006-A4", action: "Plateforme DaaS — API payante, clés, quotas, doc Swagger, billing Stripe", status: "open", owner: "CTO", effort: "1h30" },
      { id: "P6I-006-A5", action: "Partenariats distribution — Bloomberg Terminal, Refinitiv, Ecofin Pro", status: "open", owner: "Growth Lead", effort: "30 min" }
    ],
    dependencies: ["P6I-003"]
  },
  {
    id: "P6I-007",
    chantier: "Innovation Lab — 6 Projets R&D — Pipeline Innovation 2027-2028",
    category: "Innovation",
    icon: "ri-flask-line",
    color: "#4F46E5",
    priority: "P1",
    severity: "medium",
    status: "open",
    progress: 0,
    responsible: "Innovation Lab Lead + CTO + Managing Partner",
    deadline: "2026-09-19",
    budget: "3 500 000 FCFA",
    kpi: "6 projets R&D lancés — 2 brevets déposés — TRL moyen 4.5/9 — Budget R&D 12% CA",
    effort: "8h",
    bloque: "Sans R&D, KOS stagne. L'innovation est le seul rempart contre la disruption par les Big Four.",
    description: "Lancement du pipeline d'innovation KOS 2027-2028 : 1) KOS Regulatory Sandbox — environnement de test réglementaire virtuel pour FinTech (bac à sable BCEAO/COBAC simulé), 2) KOS Digital Regulator — jumeau numérique d'un régulateur (BCEAO/COBAC) pour simulation d'audit, 3) KOS Cross-Border Compliance — conformité multi-juridiction automatique (UEMOA + CEMAC + Nigéria + Angola), 4) KOS ESG Tokenization — tokenisation des crédits carbone africains sur blockchain (partenariat IFC), 5) KOS AI Auditor — agent IA certifié ISA 220 pour audit légal automatisé, 6) KOS Quantum-Ready Crypto — préparation migration cryptographie post-quantique (NIST PQC).",
    actions: [
      { id: "P6I-007-A1", action: "Lancer KOS Regulatory Sandbox — bac à sable BCEAO/COBAC simulé pour FinTech", status: "open", owner: "Innovation Lab Lead", effort: "2h" },
      { id: "P6I-007-A2", action: "Prototyper KOS Digital Regulator — jumeau numérique régulateur, simulation audit", status: "open", owner: "CTO", effort: "2h" },
      { id: "P6I-007-A3", action: "POC KOS Cross-Border Compliance — conformité multi-juridiction auto", status: "open", owner: "Innovation Lab Lead", effort: "1h30" },
      { id: "P6I-007-A4", action: "Lancer KOS ESG Tokenization — crédits carbone blockchain, partenariat IFC", status: "open", owner: "Managing Partner", effort: "1h" },
      { id: "P6I-007-A5", action: "POC KOS AI Auditor — agent IA certifié ISA 220, audit légal automatisé", status: "open", owner: "AI Lead", effort: "1h" },
      { id: "P6I-007-A6", action: "Déposer 2 brevets — Regulatory Sandbox + Cross-Border Compliance", status: "open", owner: "Managing Partner", effort: "30 min" }
    ],
    dependencies: ["P6I-001", "P6I-003"]
  },
  {
    id: "P6I-008",
    chantier: "Roadmap Stratégique 2027-2028 — Vision KOS 3.0 — Levée de Fonds Série A",
    category: "Gouvernance",
    icon: "ri-road-map-line",
    color: "#DC2626",
    priority: "P0",
    severity: "critical",
    status: "open",
    progress: 0,
    responsible: "Managing Partner + COMEX + CFO",
    deadline: "2026-09-19",
    budget: "1 300 000 FCFA",
    kpi: "Roadmap 2027-2028 approuvée COMEX — Levée de Fonds Série A 500M FCFA — Valorisation 5 Md FCFA",
    effort: "6h",
    bloque: "Sans vision long-terme, KOS n'attire pas les investisseurs. La Série A finance la scale-up.",
    description: "Élaboration de la stratégie long-terme et préparation de la levée de fonds : 1) Roadmap KOS 3.0 — Vision 2027 (leader conformité panafricain, 200 agents IA, 10 bureaux), Vision 2028 (licence SaaS, 500 clients, expansion Asie/Moyen-Orient), 2) Business Plan 2027-2028 — projections financières, KPIs, besoins en capitaux, 3) Pitch Deck Série A — 25 slides (problème, solution, marché 850M$, traction, équipe, finances, utilisation fonds), 4) Data Room investisseurs — due diligence pack (finances auditées, contrats clients, propriété intellectuelle, équipe), 5) Roadshow — 15 fonds ciblés (Partech Africa, Novastar, Launch Africa, Al Mada, CDC, Proparco, IFC, etc.), 6) PV COMEX — résolution autorisant la levée de fonds et la dilution.",
    actions: [
      { id: "P6I-008-A1", action: "Élaborer Roadmap KOS 3.0 — Vision 2027 (leader panafricain) + Vision 2028 (SaaS global)", status: "open", owner: "Managing Partner", effort: "2h" },
      { id: "P6I-008-A2", action: "Rédiger Business Plan 2027-2028 — projections, KPIs, besoins capitaux", status: "open", owner: "CFO", effort: "1h30" },
      { id: "P6I-008-A3", action: "Créer Pitch Deck Série A — 25 slides, 500M FCFA, valorisation 5 Md FCFA", status: "open", owner: "Managing Partner", effort: "1h" },
      { id: "P6I-008-A4", action: "Compiler Data Room investisseurs — finances, contrats, PI, équipe", status: "open", owner: "CFO", effort: "1h" },
      { id: "P6I-008-A5", action: "Roadshow — contacter 15 fonds (Partech, Novastar, Launch Africa, Al Mada, CDC, Proparco, IFC)", status: "open", owner: "Managing Partner", effort: "30 min" }
    ],
    dependencies: ["P6I-001", "P6I-002", "P6I-003", "P6I-006", "P6I-007"]
  }
];

export const phase6ExecutionLog = [
  { timestamp: "2026-09-08T08:00:00Z", event: "Phase 6 lancée — 8 chantiers innovation identifiés, score initial 105/110. OBJECTIF : 110/110 — AUTONOMIE & AVANT-GARDE.", type: "milestone", icon: "ri-play-circle-line" },
  { timestamp: "2026-09-08T08:30:00Z", event: "25 nouveaux agents IA en développement — specs validées, modèles en training", type: "action", icon: "ri-brain-line" },
  { timestamp: "2026-09-08T09:00:00Z", event: "Infrastructure self-healing — ML prédictif 50 métriques en calibration sur données historiques 90j", type: "action", icon: "ri-heart-pulse-line" },
  { timestamp: "2026-09-08T09:30:00Z", event: "Budget Phase 6 engagé : 34 800 000 FCFA — investissement autonomie & innovation", type: "budget", icon: "ri-money-dollar-circle-line" },
  { timestamp: "2026-09-08T10:00:00Z", event: "COMEX extraordinaire convoqué — validation roadmap 2027-2028 + autorisation levée de fonds", type: "notification", icon: "ri-pen-nib-line" },
  { timestamp: "2026-09-08T10:30:00Z", event: "Partenariat IFC confirmé pour KOS ESG Tokenization — crédits carbone blockchain", type: "notification", icon: "ri-group-line" }
];

export const phase6Timeline = {
  start: "2026-09-08",
  end: "2026-09-19",
  weeks: [
    { week: 11, start: "2026-09-08", end: "2026-09-12", label: "Semaine 11 — Autonomie & Fondations Innovation", milestones: ["25 nouveaux agents IA déployés — total 100 agents", "Infrastructure self-healing activée — 18 playbooks auto", "Forecasting engine 12 mois calibré — précision 92%", "Assistant vocal KOS — beta FR, test interne", "Registre Conformité Distribué — POC blockchain déployé (testnet)", "3 produits DaaS prototypés"] },
    { week: 12, start: "2026-09-15", end: "2026-09-19", label: "Semaine 12 — Innovation & Vision", milestones: ["Agent Supervisor actif — 100 agents supervisés, zéro intervention humaine", "Chaos Monkey actif — self-healing validé sur 10 pannes simulées", "WhatsApp Business API live — 500 conversations/jour", "6 projets R&D Innovation Lab lancés — 2 brevets déposés", "Roadmap KOS 3.0 2027-2028 approuvée COMEX", "Pitch Deck Série A finalisé — roadshow investisseurs lancé", "Phase 6 clôturée — Score Innovation 110/110 — KOS AUTONOME & PIONNIER"] }
  ]
};

export const phase6Budget = {
  total: "34 800 000 FCFA",
  spent: "1 800 000 FCFA",
  remaining: "33 000 000 FCFA",
  breakdown: [
    { item: "Orchestration Agentique Autonome — 25 agents + boucle feedback + Supervisor", amount: "6 200 000 FCFA", status: "allocated" },
    { item: "Infrastructure Self-Healing — ML prédictif + 18 playbooks + Chaos Monkey", amount: "5 800 000 FCFA", status: "allocated" },
    { item: "Intelligence Prédictive Avancée — Forecasting 12 mois + Moteur Décision", amount: "4 500 000 FCFA", status: "allocated" },
    { item: "Voice & Conversational AI — Assistant vocal + WhatsApp + Chatbot RAG", amount: "5 500 000 FCFA", status: "allocated" },
    { item: "Blockchain & Web3 — POC Conformité + Smart Contracts OHADA", amount: "4 200 000 FCFA", status: "allocated" },
    { item: "Advanced Analytics & Data Monetization — 3 produits DaaS", amount: "3 800 000 FCFA", status: "allocated" },
    { item: "Innovation Lab — 6 projets R&D + 2 brevets", amount: "3 500 000 FCFA", status: "allocated" },
    { item: "Roadmap Stratégique 2027-2028 — Pitch Deck + Data Room + Roadshow", amount: "1 300 000 FCFA", status: "allocated" }
  ]
};

export const phase6Dependencies = [
  { from: "P6I-001", to: "P6I-002", reason: "Self-healing utilise l'Agent Supervisor pour déclencher les playbooks de récupération" },
  { from: "P6I-001", to: "P6I-003", reason: "Forecasting engine utilise les nouveaux agents pour la collecte et l'analyse de données" },
  { from: "P6I-001", to: "P6I-004", reason: "Assistant vocal s'appuie sur l'orchestration agentique pour les réponses complexes" },
  { from: "P6I-001", to: "P6I-005", reason: "Smart contracts OHADA invoquent des agents de conformité pour validation" },
  { from: "P6I-001", to: "P6I-007", reason: "Innovation Lab utilise les nouveaux agents comme briques de base des POCs" },
  { from: "P6I-003", to: "P6I-006", reason: "DaaS utilise le forecasting engine pour les données prédictives" },
  { from: "P6I-003", to: "P6I-007", reason: "Innovation Lab s'appuie sur les simulations prédictives" },
  { from: "P6I-001", to: "P6I-008", reason: "Roadmap intègre la vision 100 agents autonomes" },
  { from: "P6I-006", to: "P6I-008", reason: "Levée de fonds valorise les revenus récurrents DaaS" },
  { from: "P6I-007", to: "P6I-008", reason: "Pipeline innovation alimente la valorisation pour la Série A" }
];