// KOS Phase 7 Domination Continentale & Marché Global™ — Mock Data
// Consortium PwC · Deloitte · EY · KPMG
// Mandat : Domination panafricaine intégrale, expansion globale, IA souveraine
// Timeline : 22 Septembre — 3 Octobre 2026 (Semaine 13-14)
// Objectif : Score de Domination 110→115 — LEADER CONTINENTAL INCONTESTÉ

export const phase7Stats = {
  execution_id: "KOS-PHASE7-DOMINATION-2026-09-22-001",
  launched_at: "2026-09-22T08:00:00Z",
  target_completion: "2026-10-03T18:00:00Z",
  assessor: "Consortium PwC · Deloitte · EY · KPMG — Domination & Global Expansion Practice",
  total_chantiers: 8,
  completed: 0,
  in_progress: 1,
  blocked: 0,
  open: 7,
  overall_progress: 10,
  starting_score: 110,
  target_score: 115,
  budget_total: "48 500 000 FCFA",
  budget_spent: "3 200 000 FCFA",
  commander_intent: "Faire de KOS le leader continental incontesté de la conformité réglementaire et du conseil stratégique augmenté par l'IA. Déployer l'infrastructure souveraine panafricaine (data centers locaux, edge nodes 12 pays), étendre le réseau de bureaux à 15 hubs physiques, lancer KOS Marketplace — la première place de marché consulting IA en Afrique, doubler le portefeuille d'agents IA (150 agents), obtenir la certification ISO multi-standard complète (8 normes), établir des partenariats stratégiques avec 3 Big Four, et préparer l'entrée sur les marchés Europe-Moyen-Orient. Score de Domination 115/115. KOS est la référence absolue."
};

export const phase7Chantiers = [
  {
    id: "P7D-001",
    chantier: "KOS Souverain — Infrastructure cloud panafricaine — 12 data centers Edge",
    category: "Infrastructure",
    icon: "ri-server-line",
    color: "#059669",
    priority: "P0",
    severity: "critical",
    status: "in_progress",
    progress: 20,
    responsible: "CTO + DevOps Lead + RSSI",
    deadline: "2026-09-28",
    budget: "8 500 000 FCFA",
    kpi: "12 edge nodes déployés — Latence < 25ms dans toute l'Afrique — Souveraineté données 100% — Uptime 99.995%",
    effort: "14h",
    bloque: "Sans infrastructure souveraine, KOS dépend de clouds étrangers. La souveraineté numérique = crédibilité régulateurs africains.",
    description: "Déploiement d'une infrastructure cloud panafricaine souveraine : 1) 12 nœuds Edge (Dakar, Abidjan, Lomé, Cotonou, Ouagadougou, Bamako, Niamey, Douala, Libreville, Brazzaville, Lagos, Luanda) avec CDN local et cache intelligent, 2) Data residency garantie — toutes les données clients stockées dans le pays d'origine, 3) Chiffrement de bout en bout avec clés souveraines (HSM local), 4) Interconnexion mesh 12 nœuds — redondance N+2, failover automatique < 500ms, 5) Certification ISO 27001:2022 Annexe A complète + SOC 2 Type II pour l'infrastructure.",
    actions: [
      { id: "P7D-001-A1", action: "Déployer 6 premiers nœuds Edge — Dakar, Abidjan, Lomé, Douala, Lagos, Luanda", status: "completed", owner: "DevOps Lead", effort: "4h" },
      { id: "P7D-001-A2", action: "Déployer 6 nœuds additionnels — Cotonou, Ouagadougou, Bamako, Niamey, Libreville, Brazzaville", status: "in_progress", owner: "DevOps Lead", effort: "4h" },
      { id: "P7D-001-A3", action: "Activer data residency par pays — chiffrement HSM local, clés souveraines", status: "open", owner: "RSSI", effort: "2h30" },
      { id: "P7D-001-A4", action: "Maillage inter-nœuds — redondance N+2, failover < 500ms", status: "open", owner: "CTO", effort: "2h" },
      { id: "P7D-001-A5", action: "Audit ISO 27001 + SOC 2 Type II — infrastructure cloud souveraine", status: "open", owner: "RSSI", effort: "1h30" }
    ],
    dependencies: []
  },
  {
    id: "P7D-002",
    chantier: "Réseau de bureaux Khepra — 7→15 hubs physiques panafricains",
    category: "Expansion",
    icon: "ri-building-2-line",
    color: "#DC2626",
    priority: "P0",
    severity: "critical",
    status: "open",
    progress: 0,
    responsible: "Managing Partner + Regional Directors + COO",
    deadline: "2026-10-01",
    budget: "9 200 000 FCFA",
    kpi: "15 bureaux opérationnels — 8 nouveaux hubs — Présence dans 12 pays — 85 consultants",
    effort: "15h",
    bloque: "La présence physique est le facteur #1 de confiance pour les régulateurs et clients corporate africains.",
    description: "Expansion massive du réseau physique Khepra : 1) Ouverture 8 nouveaux bureaux (Lagos, Accra, Nairobi, Luanda, Maputo, Le Caire, Casablanca, Paris), 2) Recrutement 8 Regional Directors + 24 consultants locaux, 3) Certification réglementaire locale par pays (CBN Nigeria, BoG Ghana, CBK Kenya, BNA Angola, BM Mozambique, FRA Egypte, BAM Maroc, ACPR France), 4) Harm checklist juridique — 12 structures légales (succursales, filiales, partnerships), 5) Programme d'intégration « Khepra Way » — onboarding standardisé 90 jours pour chaque nouveau hub.",
    actions: [
      { id: "P7D-002-A1", action: "Ouvrir 4 hubs prioritaires — Lagos, Accra, Nairobi, Luanda — baux, légal, recrutement", status: "open", owner: "Managing Partner", effort: "5h" },
      { id: "P7D-002-A2", action: "Ouvrir 4 hubs secondaires — Maputo, Le Caire, Casablanca, Paris", status: "open", owner: "COO", effort: "4h" },
      { id: "P7D-002-A3", action: "Recruter 8 Regional Directors + 24 consultants — profils senior Big Four", status: "open", owner: "Managing Partner", effort: "3h" },
      { id: "P7D-002-A4", action: "Certification réglementaire par pays — 8 régulateurs, 8 dossiers", status: "open", owner: "Regulatory Lead", effort: "2h" },
      { id: "P7D-002-A5", action: "Déployer programme Khepra Way — onboarding 90j standardisé par hub", status: "open", owner: "COO", effort: "1h" }
    ],
    dependencies: ["P7D-001"]
  },
  {
    id: "P7D-003",
    chantier: "KOS Marketplace™ — Place de marché consulting IA — 150 agents disponibles",
    category: "Innovation",
    icon: "ri-store-2-line",
    color: "#7C3AED",
    priority: "P0",
    severity: "critical",
    status: "open",
    progress: 0,
    responsible: "CTO + Product Lead + Growth Lead",
    deadline: "2026-10-02",
    budget: "7 800 000 FCFA",
    kpi: "Marketplace live — 150 agents listés — 50 clients actifs — CA marketplace 120M FCFA/mois",
    effort: "12h",
    bloque: "KOS Marketplace transforme Khepra d'un cabinet de conseil en plateforme SaaS. C'est le business model du futur.",
    description: "Lancement de KOS Marketplace — la première place de marché de consulting IA en Afrique : 1) Plateforme SaaS multi-tenant — souscription par agent ou par bundle (Conformité, Prix de Transfert, ESG, Audit), 2) 150 agents KOS packagés en offres commerciales (Standard, Professional, Enterprise), 3) API publique — documentation Swagger, SDK Python/JS, clés API, rate limiting, 4) Billing intégré — Stripe/Mobile Money/Carte Bancaire, facturation automatisée, 5) Dashboard client — utilisation agents, rapports générés, alertes, support prioritaire, 6) Marketplace ratings — notation agents par les clients, transparence qualité.",
    actions: [
      { id: "P7D-003-A1", action: "Développer plateforme SaaS multi-tenant — souscription, bundles, billing", status: "open", owner: "CTO", effort: "4h" },
      { id: "P7D-003-A2", action: "Packager 150 agents en offres commerciales — Standard, Professional, Enterprise", status: "open", owner: "Product Lead", effort: "3h" },
      { id: "P7D-003-A3", action: "API publique — Swagger, SDK Python/JS, clés API, rate limiting", status: "open", owner: "CTO", effort: "2h30" },
      { id: "P7D-003-A4", action: "Intégration billing — Stripe, Mobile Money, Carte Bancaire, facturation auto", status: "open", owner: "Growth Lead", effort: "1h30" },
      { id: "P7D-003-A5", action: "Dashboard client + Marketplace ratings — notation agents, transparence", status: "open", owner: "Product Lead", effort: "1h" }
    ],
    dependencies: ["P7D-001"]
  },
  {
    id: "P7D-004",
    chantier: "Doublement Parc Agents IA — 75 → 150 agents autonomes",
    category: "IA Avancée",
    icon: "ri-cpu-line",
    color: "#F59E0B",
    priority: "P0",
    severity: "critical",
    status: "open",
    progress: 0,
    responsible: "AI Lead + CTO + Data Science",
    deadline: "2026-09-30",
    budget: "6 500 000 FCFA",
    kpi: "150 agents déployés — Score orchestration 99% — 0 intervention humaine — Latence 180ms",
    effort: "12h",
    bloque: "75 agents = capacité limitée à l'UEMOA/CEMAC. 150 agents = capacité panafricaine + globale.",
    description: "Doublement du parc agents IA KOS : 1) 75 nouveaux agents spécialisés — Expansion Marchés (12 agents pays), Juridique Multi-Juridiction (18 agents), Finance Islamique (8 agents), Assurance CIMA (7 agents), ESG Sectoriel (10 agents), Due Diligence Cross-Border (10 agents), Prix de Transfert Global (10 agents), 2) Agent Factory™ — pipeline automatisé de création d'agents (specs → modèle → tests → déploiement en 72h), 3) Cross-agent learning — transfer learning entre agents de même domaine, 4) Agent Marketplace SDK — kit de développement pour partenaires créant des agents sur KOS, 5) Supervision hiérarchique — 5 méta-agents supervisant chacun 30 agents.",
    actions: [
      { id: "P7D-004-A1", action: "Développer 75 nouveaux agents — specs, modèles, tests, déploiement", status: "open", owner: "AI Lead", effort: "5h" },
      { id: "P7D-004-A2", action: "Déployer Agent Factory™ — pipeline automatisé création agents 72h", status: "open", owner: "CTO", effort: "3h" },
      { id: "P7D-004-A3", action: "Activer cross-agent learning — transfer learning entre agents", status: "open", owner: "Data Science", effort: "2h" },
      { id: "P7D-004-A4", action: "Agent Marketplace SDK — kit développement partenaires", status: "open", owner: "CTO", effort: "1h30" },
      { id: "P7D-004-A5", action: "Déployer 5 méta-agents superviseurs — hiérarchie 30 agents chacun", status: "open", owner: "AI Lead", effort: "30 min" }
    ],
    dependencies: ["P7D-001", "P7D-003"]
  },
  {
    id: "P7D-005",
    chantier: "Certification ISO Multi-Standard — 8 normes internationales",
    category: "Gouvernance",
    icon: "ri-shield-check-line",
    color: "#2563EB",
    priority: "P0",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "Quality Lead + RSSI + CFO + Managing Partner",
    deadline: "2026-10-03",
    budget: "5 200 000 FCFA",
    kpi: "8 certifications ISO obtenues — Score conformité 99% — Audit externe KPMG réussi",
    effort: "11h",
    bloque: "Sans certifications ISO multi-standard, Khepra ne peut pas soumissionner aux AO internationaux (Banque Mondiale, UE, BAD).",
    description: "Obtention de 8 certifications ISO : 1) ISO 9001:2015 (Qualité) — déjà 96% conforme, 2) ISO 27001:2022 (Sécurité) — 95% conforme, finalisation 5 gaps, 3) ISO 42001 (IA) — 87% conforme, finalisation Digital Twin explicabilité, 4) ISO 31000 (Risques) — 84% conforme, cartographie 8→15 risques, 5) ISO 22301 (Continuité) — nouveau, PCA/PRA formalisé, 6) ISO 37301 (Compliance) — nouveau, intégration BCEAO/COBAC/GAFI, 7) ISO 37000 (Gouvernance) — 92% conforme, 8) ISO 20700 (Conseil Management) — nouveau, standardisation méthodologique. Audit externe KPMG — octobre 2026.",
    actions: [
      { id: "P7D-005-A1", action: "Finaliser ISO 27001 (5 gaps) + ISO 42001 (Digital Twin) + ISO 31000 (8→15 risques)", status: "open", owner: "RSSI", effort: "4h" },
      { id: "P7D-005-A2", action: "Déployer ISO 22301 (PCA/PRA) + ISO 37301 (Compliance intégrée)", status: "open", owner: "Quality Lead", effort: "3h" },
      { id: "P7D-005-A3", action: "Implémenter ISO 20700 — standardisation méthodologique consulting 6 types missions", status: "open", owner: "Quality Lead", effort: "2h" },
      { id: "P7D-005-A4", action: "Pré-audit interne 8 normes — gaps analysis, actions correctives", status: "open", owner: "CFO", effort: "1h30" },
      { id: "P7D-005-A5", action: "Audit externe KPMG — certification 8 normes ISO", status: "open", owner: "Managing Partner", effort: "30 min" }
    ],
    dependencies: ["P7D-001", "P7D-002"]
  },
  {
    id: "P7D-006",
    chantier: "Alliances Stratégiques Big Four — 3 partenariats de co-sourcing",
    category: "Partenariats",
    icon: "ri-shake-hands-line",
    color: "#0891B2",
    priority: "P1",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "Managing Partner + Partnership Lead",
    deadline: "2026-10-01",
    budget: "3 800 000 FCFA",
    kpi: "3 alliances Big Four signées — Pipeline co-sourcing 5 Md FCFA — 25 missions conjointes",
    effort: "9h",
    bloque: "Les Big Four contrôlent 65% du marché consulting Afrique. L'alliance est la voie d'accès la plus rapide.",
    description: "Établissement d'alliances stratégiques de co-sourcing avec 3 Big Four : 1) Deloitte Afrique — co-sourcing conformité réglementaire BCEAO/COBAC (Khepra apporte l'IA + l'expertise locale, Deloitte apporte le réseau global et les AO), 2) PwC Nigeria — co-sourcing prix de transfert et fiscalité internationale (Khepra apporte la documentation BEPS automatisée, PwC apporte les clients multinationales), 3) EY Panafricain — co-sourcing ESG et durabilité (Khepra apporte l'évaluation ESG automatisée + la connaissance des normes africaines, EY apporte le label international). Structuration juridique : consortium avec mandat clair, non-concurrence géographique, partage de revenus 60/40.",
    actions: [
      { id: "P7D-006-A1", action: "Négocier alliance Deloitte Afrique — conformité réglementaire, contrat co-sourcing", status: "open", owner: "Managing Partner", effort: "3h" },
      { id: "P7D-006-A2", action: "Négocier alliance PwC Nigeria — prix de transfert, fiscalité, contrat", status: "open", owner: "Partnership Lead", effort: "2h30" },
      { id: "P7D-006-A3", action: "Négocier alliance EY Panafricain — ESG, durabilité, contrat", status: "open", owner: "Managing Partner", effort: "2h30" },
      { id: "P7D-006-A4", action: "Structuration juridique — consortiums, non-concurrence, partage revenus 60/40", status: "open", owner: "Partnership Lead", effort: "30 min" },
      { id: "P7D-006-A5", action: "Lancement 5 premières missions conjointes — pipeline co-sourcing activé", status: "open", owner: "Managing Partner", effort: "30 min" }
    ],
    dependencies: ["P7D-002", "P7D-005"]
  },
  {
    id: "P7D-007",
    chantier: "KOS Academy Global™ — Université en ligne certifiante panafricaine",
    category: "Formation",
    icon: "ri-graduation-cap-line",
    color: "#4F46E5",
    priority: "P1",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "Formation Lead + Content Lead + COO",
    deadline: "2026-10-03",
    budget: "4 500 000 FCFA",
    kpi: "12 certifications lancées — 5 000 étudiants inscrits — CA Academy 180M FCFA/an",
    effort: "10h",
    bloque: "La formation certifiante crée un effet réseau + un pipeline de recrutement + une autorité intellectuelle inégalée.",
    description: "Lancement de KOS Academy Global — université en ligne certifiante : 1) 12 programmes de certification (Audit BCEAO, Conformité COBAC, LBC/FT GAFI, ESG ISSB, Prix de Transfert BEPS, Gouvernance OHADA, MicroFinance UEMOA, FinTech Régulation, Cybersécurité Bancaire, Finance Islamique, Assurance CIMA, PPP Afrique), 2) Plateforme LMS — vidéos, quiz, examens, certificats blockchain, 3) Partenariats académiques — 8 universités africaines + Sciences Po + HEC Paris, 4) Certification professionnelle — reconnue par les régulateurs (BCEAO, COBAC, AMF-UEMOA), 5) B2B — programmes sur mesure pour banques et SFD.",
    actions: [
      { id: "P7D-007-A1", action: "Développer 12 programmes certification — contenus, quiz, examens", status: "open", owner: "Formation Lead", effort: "4h" },
      { id: "P7D-007-A2", action: "Plateforme LMS — vidéos, certificats blockchain, dashboard apprenant", status: "open", owner: "CTO", effort: "3h" },
      { id: "P7D-007-A3", action: "Partenariats académiques — 8 universités africaines + Sciences Po + HEC Paris", status: "open", owner: "COO", effort: "1h30" },
      { id: "P7D-007-A4", action: "Accréditation professionnelle — reconnaissance BCEAO, COBAC, AMF-UEMOA", status: "open", owner: "Formation Lead", effort: "1h" },
      { id: "P7D-007-A5", action: "Lancement B2B — programmes sur mesure banques, SFD, assurances", status: "open", owner: "Content Lead", effort: "30 min" }
    ],
    dependencies: ["P7D-002", "P7D-005"]
  },
  {
    id: "P7D-008",
    chantier: "Revenue Domination — Pipeline 7.5→25 Md FCFA — 15 bureaux, 85 consultants",
    category: "Croissance",
    icon: "ri-funds-box-line",
    color: "#059669",
    priority: "P0",
    severity: "high",
    status: "open",
    progress: 0,
    responsible: "Managing Partner + Growth Lead + CFO",
    deadline: "2026-10-03",
    budget: "3 000 000 FCFA",
    kpi: "Pipeline 25 Md FCFA (×3.3) — CA mensuel 150M→450M — 85 consultants — 15 bureaux",
    effort: "8h",
    bloque: "Sans scale commercial, les investissements infrastructure/réseau/IA ne génèrent pas de ROI.",
    description: "Structuration de la domination commerciale panafricaine : 1) Organisation commerciale — 15 Directors (un par bureau) avec quota pays, 2) Pricing stratégique — grille tarifaire par zone (UEMOA, CEMAC, East Africa, Southern Africa, North Africa, Europe) ajusté PIB/habitant, 3) Sales playbook — 8 playbooks par type de mission, Discovery→Closing 30j max, 4) CRM global unifié — Salesforce déploiement 15 bureaux, pipeline consolidé temps réel, 5) Dashboard Revenue Domination — pipeline, win rate, CA, velocity par bureau, pays, BU, type mission, 6) Plan de commissionnement — Director 8% CA généré + Consultant 3% CA mission.",
    actions: [
      { id: "P7D-008-A1", action: "Organisation commerciale — 15 Directors avec quota pays, KPIs trimestriels", status: "open", owner: "Managing Partner", effort: "2h" },
      { id: "P7D-008-A2", action: "Grille tarifaire multi-zone — UEMOA, CEMAC, East Africa, Southern, North, Europe", status: "open", owner: "CFO", effort: "2h" },
      { id: "P7D-008-A3", action: "Déployer CRM Salesforce 15 bureaux — pipeline consolidé temps réel", status: "open", owner: "Growth Lead", effort: "2h" },
      { id: "P7D-008-A4", action: "Rédiger 8 Sales Playbooks — Discovery→Closing 30j max par type mission", status: "open", owner: "Growth Lead", effort: "1h30" },
      { id: "P7D-008-A5", action: "Dashboard Revenue Domination + Plan commissionnement — 8% Director, 3% Consultant", status: "open", owner: "CFO", effort: "30 min" }
    ],
    dependencies: ["P7D-002", "P7D-003", "P7D-006"]
  }
];

export const phase7ExecutionLog = [
  { timestamp: "2026-09-22T08:00:00Z", event: "Phase 7 lancée — 8 chantiers de domination identifiés, score initial 110/115. OBJECTIF : 115/115 — LEADER CONTINENTAL INCONTESTÉ.", type: "milestone", icon: "ri-play-circle-line" },
  { timestamp: "2026-09-22T08:30:00Z", event: "Infrastructure souveraine — 6 premiers nœuds Edge déployés : Dakar, Abidjan, Lomé, Douala, Lagos, Luanda", type: "action", icon: "ri-server-line" },
  { timestamp: "2026-09-22T09:00:00Z", event: "KOS Marketplace™ — architecture SaaS multi-tenant validée, développement lancé", type: "action", icon: "ri-store-2-line" },
  { timestamp: "2026-09-22T09:30:00Z", event: "Budget Phase 7 engagé : 48 500 000 FCFA — investissement domination continentale", type: "budget", icon: "ri-money-dollar-circle-line" },
  { timestamp: "2026-09-22T10:00:00Z", event: "Alliance Deloitte Afrique — premier contact Managing Partner, visio programmée 24/09", type: "notification", icon: "ri-shake-hands-line" },
  { timestamp: "2026-09-22T10:30:00Z", event: "KOS Academy Global — 12 programmes certification en conception, inscriptions pilote ouvertes", type: "notification", icon: "ri-graduation-cap-line" },
  { timestamp: "2026-09-22T11:00:00Z", event: "75 nouveaux agents IA en spécification — 7 domaines, 12 pays, pipeline Agent Factory activé", type: "action", icon: "ri-cpu-line" }
];

export const phase7Timeline = {
  start: "2026-09-22",
  end: "2026-10-03",
  weeks: [
    { week: 13, start: "2026-09-22", end: "2026-09-26", label: "Semaine 13 — Infrastructure & Fondations", milestones: ["12 edge nodes déployés — souveraineté data 100%", "8 nouveaux bureaux ouverts — Lagos, Accra, Nairobi, Luanda, Maputo, Le Caire, Casablanca, Paris", "KOS Marketplace — MVP SaaS multi-tenant déployé", "75 nouveaux agents IA — spécifications terminées, 25 en développement", "Alliances Big Four — 3 Letters of Intent signées"] },
    { week: 14, start: "2026-09-29", end: "2026-10-03", label: "Semaine 14 — Scale & Domination", milestones: ["150 agents IA en production — Agent Factory pipeline complet", "8 certifications ISO — audit KPMG final, 100% conformité", "KOS Academy — 12 certifications live, 5 000 inscriptions pilote", "Pipeline 25 Md FCFA — 15 Directors, 85 consultants, CRM Salesforce", "KOS Marketplace — 50 clients actifs, 120M/mois CA récurrent", "Phase 7 clôturée — Score Domination 115/115 — LEADER CONTINENTAL"] }
  ]
};

export const phase7Budget = {
  total: "48 500 000 FCFA",
  spent: "3 200 000 FCFA",
  remaining: "45 300 000 FCFA",
  breakdown: [
    { item: "Infrastructure Cloud Souveraine — 12 data centers Edge, HSM, maillage", amount: "8 500 000 FCFA", status: "allocated" },
    { item: "Réseau Bureaux 7→15 hubs — 8 nouveaux, 24 consultants, certification", amount: "9 200 000 FCFA", status: "allocated" },
    { item: "KOS Marketplace™ — SaaS multi-tenant, API, billing, 150 agents", amount: "7 800 000 FCFA", status: "allocated" },
    { item: "Doublement Agents IA 75→150 — Agent Factory, cross-learning, méta-agents", amount: "6 500 000 FCFA", status: "allocated" },
    { item: "Certification ISO Multi-Standard — 8 normes, audit KPMG", amount: "5 200 000 FCFA", status: "allocated" },
    { item: "Alliances Big Four — 3 partenariats co-sourcing Deloitte, PwC, EY", amount: "3 800 000 FCFA", status: "allocated" },
    { item: "KOS Academy Global — 12 certifications, LMS, partenariats académiques", amount: "4 500 000 FCFA", status: "allocated" },
    { item: "Revenue Domination — Salesforce, pricing, playbooks, dashboard", amount: "3 000 000 FCFA", status: "allocated" }
  ]
};

export const phase7Dependencies = [
  { from: "P7D-001", to: "P7D-002", reason: "Bureaux nécessitent l'infrastructure edge pour la connectivité locale" },
  { from: "P7D-001", to: "P7D-003", reason: "Marketplace exige une infrastructure souveraine pour la data residency" },
  { from: "P7D-001", to: "P7D-004", reason: "Agent Factory s'appuie sur les edge nodes pour la latence < 180ms" },
  { from: "P7D-001", to: "P7D-005", reason: "Certifications ISO exigent infrastructure 100% souveraine (data residency)" },
  { from: "P7D-002", to: "P7D-005", reason: "ISO 37000/37301 nécessitent présence physique pour audit gouvernance" },
  { from: "P7D-002", to: "P7D-006", reason: "Alliances Big Four activées par la présence dans les hubs régionaux" },
  { from: "P7D-002", to: "P7D-007", reason: "KOS Academy nécessite bureaux pour sessions en présentiel" },
  { from: "P7D-002", to: "P7D-008", reason: "Revenue Domination s'appuie sur le réseau de bureaux et Directors pays" },
  { from: "P7D-003", to: "P7D-008", reason: "CA Marketplace (120M/mois) alimente le pipeline commercial global" },
  { from: "P7D-005", to: "P7D-006", reason: "Certifications ISO conditionnent les contrats de co-sourcing Big Four" }
];



