export const enterpriseControlTower = [
  {
    id: 1,
    domain: "Finances",
    metric_name: "Chiffre d'Affaires Mensuel",
    current_value: 780000000,
    threshold_warning: 700000000,
    threshold_critical: 550000000,
    status: "OK",
    last_updated: "2026-06-13T08:00:00Z",
    alerts_count: 0,
    created_at: "2026-01-01T08:00:00Z"
  },
  {
    id: 2,
    domain: "Finances",
    metric_name: "Marge Opérationnelle",
    current_value: 38.5,
    threshold_warning: 35.0,
    threshold_critical: 28.0,
    status: "OK",
    last_updated: "2026-06-13T08:00:00Z",
    alerts_count: 0,
    created_at: "2026-01-01T08:00:00Z"
  },
  {
    id: 3,
    domain: "Opérations",
    metric_name: "Taux d'Utilisation Consultants",
    current_value: 72.0,
    threshold_warning: 75.0,
    threshold_critical: 65.0,
    status: "WARNING",
    last_updated: "2026-06-13T08:00:00Z",
    alerts_count: 3,
    created_at: "2026-01-01T08:00:00Z"
  },
  {
    id: 4,
    domain: "Qualité",
    metric_name: "Score Qualité Livrables (Big Four Framework)",
    current_value: 9.4,
    threshold_warning: 9.0,
    threshold_critical: 8.5,
    status: "OK",
    last_updated: "2026-06-13T08:00:00Z",
    alerts_count: 0,
    created_at: "2026-01-01T08:00:00Z"
  },
  {
    id: 5,
    domain: "Pipeline",
    metric_name: "Taux de Conversion Propositions",
    current_value: 48.0,
    threshold_warning: 40.0,
    threshold_critical: 30.0,
    status: "OK",
    last_updated: "2026-06-13T08:00:00Z",
    alerts_count: 1,
    created_at: "2026-01-01T08:00:00Z"
  },
  {
    id: 6,
    domain: "Opérations",
    metric_name: "Délai Moyen de Livraison (jours)",
    current_value: 34.0,
    threshold_warning: 30.0,
    threshold_critical: 40.0,
    status: "WARNING",
    last_updated: "2026-06-13T08:00:00Z",
    alerts_count: 2,
    created_at: "2026-01-01T08:00:00Z"
  },
  {
    id: 7,
    domain: "Ressources Humaines",
    metric_name: "Taux de Rétention Talents Clés",
    current_value: 91.0,
    threshold_warning: 85.0,
    threshold_critical: 75.0,
    status: "OK",
    last_updated: "2026-06-13T08:00:00Z",
    alerts_count: 0,
    created_at: "2026-01-01T08:00:00Z"
  },
  {
    id: 8,
    domain: "Sécurité",
    metric_name: "Score Cyber Sécurité KOS",
    current_value: 94.0,
    threshold_warning: 85.0,
    threshold_critical: 70.0,
    status: "OK",
    last_updated: "2026-06-13T08:00:00Z",
    alerts_count: 0,
    created_at: "2026-01-01T08:00:00Z"
  },
  {
    id: 9,
    domain: "Satisfaction",
    metric_name: "NPS Client Global",
    current_value: 82.0,
    threshold_warning: 70.0,
    threshold_critical: 55.0,
    status: "OK",
    last_updated: "2026-06-13T08:00:00Z",
    alerts_count: 0,
    created_at: "2026-01-01T08:00:00Z"
  },
  {
    id: 10,
    domain: "Finances",
    metric_name: "Trésorerie (jours de runway)",
    current_value: 185.0,
    threshold_warning: 120.0,
    threshold_critical: 90.0,
    status: "OK",
    last_updated: "2026-06-13T08:00:00Z",
    alerts_count: 0,
    created_at: "2026-01-01T08:00:00Z"
  },
  {
    id: 11,
    domain: "Croissance",
    metric_name: "Croissance Pipeline QoQ",
    current_value: 18.0,
    threshold_warning: 10.0,
    threshold_critical: 5.0,
    status: "OK",
    last_updated: "2026-06-13T08:00:00Z",
    alerts_count: 0,
    created_at: "2026-01-01T08:00:00Z"
  },
  {
    id: 12,
    domain: "Opérations",
    metric_name: "Taux d'Automatisation KOS",
    current_value: 87.0,
    threshold_warning: 80.0,
    threshold_critical: 70.0,
    status: "OK",
    last_updated: "2026-06-13T08:00:00Z",
    alerts_count: 0,
    created_at: "2026-01-01T08:00:00Z"
  }
];

export const automationOptimizer = [
  {
    id: 1,
    workflow_name: "Production Proposition Commerciale",
    current_efficiency: 68.0,
    optimization_type: "Process Mining",
    improvement_potential_pct: 22.0,
    proposed_changes: "Automatisation template KOS Proposal Generator — Réduction des allers-retours Partner-Review de 5 à 2 — Intégration directe depuis KOS Consulting Factory vers KOS Proposal Intelligence",
    expected_impact: "Délai moyen 7j → 3j — Économie 12h consultant/semaine — Gain annuel estimé 28M FCFA",
    status: "En cours — Déploiement Q3 2026",
    implemented_at: null,
    created_at: "2026-05-15T08:00:00Z"
  },
  {
    id: 2,
    workflow_name: "Due Diligence Réglementaire",
    current_efficiency: 74.0,
    optimization_type: "RAG + Automatisation",
    improvement_potential_pct: 18.0,
    proposed_changes: "Intégration RAG réglementaire BCEAO/COBAC/GAFI — Checklists automatisées KOS Internal Control Engine — Scoring automatique des gaps",
    expected_impact: "Couverture réglementaire 85% → 98% — Temps recherche documentaire -60% — Qualité livrable +0.3 pt",
    status: "Déployé — Optimisation continue",
    implemented_at: "2026-04-20T00:00:00Z",
    created_at: "2026-03-01T08:00:00Z"
  },
  {
    id: 3,
    workflow_name: "Onboarding Nouveau Client",
    current_efficiency: 62.0,
    optimization_type: "Workflow Automation",
    improvement_potential_pct: 28.0,
    proposed_changes: "Digitalisation KYC client — Portail self-service documents — Signature électronique contrats — Intégration KOS Engagement Risk Office automatique",
    expected_impact: "Délai onboarding 8j → 3j — Taux complétude documents +40% — Satisfaction client onboarding +15 pts NPS",
    status: "En conception — Specs validées",
    implemented_at: null,
    created_at: "2026-05-28T08:00:00Z"
  },
  {
    id: 4,
    workflow_name: "Revue Qualité Livrable",
    current_efficiency: 85.0,
    optimization_type: "AI Quality Gates",
    improvement_potential_pct: 10.0,
    proposed_changes: "Déploiement KOS Quality Assurance Authority en mode continu — Scoring automatique 6 dimensions — Escalade automatique si score < 9.0 — Dashboard qualité temps réel",
    expected_impact: "Score qualité moyen 9.2 → 9.6 — Temps revue Partner -40% — Zéro livrable sous 8.5",
    status: "Déployé — En rodage",
    implemented_at: "2026-06-01T00:00:00Z",
    created_at: "2026-04-10T08:00:00Z"
  },
  {
    id: 5,
    workflow_name: "Facturation & Recouvrement",
    current_efficiency: 55.0,
    optimization_type: "Process Redesign",
    improvement_potential_pct: 35.0,
    proposed_changes: "Automatisation facturation depuis KOS Consulting Factory — Relances automatiques 3 niveaux — Intégration comptable Syscohada — Tableau de bord DSO temps réel",
    expected_impact: "DSO 68j → 42j — Erreurs facturation -90% — Trésorerie +95M FCFA annuel",
    status: "Prioritaire — Déploiement Q2 2026",
    implemented_at: null,
    created_at: "2026-06-05T08:00:00Z"
  },
  {
    id: 6,
    workflow_name: "Publication Contenu Exécutif",
    current_efficiency: 78.0,
    optimization_type: "Content Pipeline Automation",
    improvement_potential_pct: 15.0,
    proposed_changes: "Pipeline KOS Executive Content Studio → Revue qualité → Programmation KOS Social Scheduler → Publication cross-platform automatique — Analytics d'impact intégrés",
    expected_impact: "Temps publication 2j → 4h — Consistance éditoriale +25% — Reach LinkedIn +40%",
    status: "Déployé — Actif",
    implemented_at: "2026-05-10T00:00:00Z",
    created_at: "2026-04-01T08:00:00Z"
  },
  {
    id: 7,
    workflow_name: "Veille Réglementaire & Alerte",
    current_efficiency: 81.0,
    optimization_type: "Intelligence Automation",
    improvement_potential_pct: 14.0,
    proposed_changes: "KOS Regulatory Intelligence scan multi-source automatique — Classification IA — Alerte ciblée par BU/client — Résumé exécutif auto-généré KOS Automaton",
    expected_impact: "Couverture sources 12 → 35 — Délai alerte 48h → 4h — Pertinence alertes +60%",
    status: "Déployé — Optimisation en cours",
    implemented_at: "2026-03-15T00:00:00Z",
    created_at: "2026-02-01T08:00:00Z"
  },
  {
    id: 8,
    workflow_name: "Reporting Mensuel COMEX",
    current_efficiency: 59.0,
    optimization_type: "Dashboard Automation",
    improvement_potential_pct: 31.0,
    proposed_changes: "KOS Executive Dashboard Engine — KPI automatiques depuis toutes les tables KOS — Rapports PowerPoint auto-générés — Distribution automatique membres COMEX",
    expected_impact: "Temps production rapport 3j → 2h — Fiabilité données +95% — Décision COMEX accélérée",
    status: "En cours — Déploiement Q3 2026",
    implemented_at: null,
    created_at: "2026-06-01T08:00:00Z"
  }
];

export const resourceAllocator = [
  {
    id: 1,
    resource_type: "Senior Partner",
    resource_name: "Managing Partner — Bureau Principal",
    current_allocation_pct: 85.0,
    available_capacity_pct: 15.0,
    project_name: "Supervision globale + Mandats stratégiques + Relations régulateurs",
    allocation_start: "2026-01-01",
    allocation_end: "2026-12-31",
    status: "Alloué — Haute charge",
    created_at: "2026-01-01T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 2,
    resource_type: "Director",
    resource_name: "Director BU1 — Régulation & Conformité",
    current_allocation_pct: 92.0,
    available_capacity_pct: 8.0,
    project_name: "Mandat BCEAO Banque Sahel + Pré-inspection COBAC + 3 leads pipeline",
    allocation_start: "2026-03-01",
    allocation_end: "2026-09-30",
    status: "Alloué — Surcharge critique",
    created_at: "2026-03-01T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 3,
    resource_type: "Director",
    resource_name: "Director BU2 — Prix de Transfert & Fiscalité",
    current_allocation_pct: 72.0,
    available_capacity_pct: 28.0,
    project_name: "Documentation BEPS Multinationale Agro + Extension mandat FinTech + Webinar Prix Transfert",
    allocation_start: "2026-02-15",
    allocation_end: "2026-08-31",
    status: "Alloué — Capacité disponible",
    created_at: "2026-02-15T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 4,
    resource_type: "Senior Consultant",
    resource_name: "Senior Consultant — Conformité LBC/FT",
    current_allocation_pct: 95.0,
    available_capacity_pct: 5.0,
    project_name: "Dispositif LBC/FT Banque CEMAC + Due Diligence FinTech + Support formation",
    allocation_start: "2026-04-01",
    allocation_end: "2026-10-31",
    status: "Alloué — Surcharge",
    created_at: "2026-04-01T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 5,
    resource_type: "Consultant",
    resource_name: "Consultant Junior — ESG & Climat",
    current_allocation_pct: 60.0,
    available_capacity_pct: 40.0,
    project_name: "Évaluation ESG Cimenterie + Support Stress Tests Climatiques",
    allocation_start: "2026-05-01",
    allocation_end: "2026-09-30",
    status: "Alloué — Capacité disponible",
    created_at: "2026-05-01T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 6,
    resource_type: "Data Scientist",
    resource_name: "KOS Data Scientist — Analytics & IA",
    current_allocation_pct: 88.0,
    available_capacity_pct: 12.0,
    project_name: "Modèles prédictifs KOS + Dashboard Executive + Data Analytics Prudentiel",
    allocation_start: "2026-02-01",
    allocation_end: "2026-12-31",
    status: "Alloué — Haute charge",
    created_at: "2026-02-01T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 7,
    resource_type: "Manager",
    resource_name: "Manager — Secteur Public & IFI",
    current_allocation_pct: 45.0,
    available_capacity_pct: 55.0,
    project_name: "Modernisation Fiscale Sénégal + Prospection Banque Mondiale",
    allocation_start: "2026-04-15",
    allocation_end: "2026-11-30",
    status: "Alloué — Forte disponibilité",
    created_at: "2026-04-15T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 8,
    resource_type: "Associate",
    resource_name: "Consultant Associé — Due Diligence",
    current_allocation_pct: 78.0,
    available_capacity_pct: 22.0,
    project_name: "DD Acquisition Banque d'Affaires + Support DD ESG Minier",
    allocation_start: "2026-05-20",
    allocation_end: "2026-10-15",
    status: "Alloué — Charge modérée",
    created_at: "2026-05-20T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  }
];

export const capacityPlanner = [
  {
    id: 1,
    team_name: "BU1 — Régulation & Services Financiers",
    current_workload_hours: 1480.0,
    max_capacity_hours: 1600.0,
    projected_overload_pct: 15.0,
    forecast_period: "Q3 2026 (Juillet-Septembre)",
    recommendations: "Recrutement urgent 1 Senior Consultant LBC/FT — Charge projetée 115% avec pipeline COBAC actuel. Délai critique : mandat Banque CEMAC démarre Août. Externalisation possible vers cabinet partenaire Grant Thornton pour absorption pic.",
    created_at: "2026-06-13T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 2,
    team_name: "BU2 — Prix de Transfert & Fiscalité",
    current_workload_hours: 920.0,
    max_capacity_hours: 1200.0,
    projected_overload_pct: 0.0,
    forecast_period: "Q3 2026 (Juillet-Septembre)",
    recommendations: "Capacité disponible 23%. Opportunité : activer campagne proactive Prix de Transfert — 8 nouveaux leads potentiels identifiés. Webinar Juin doit générer pipeline Q3. Recrutement non urgent.",
    created_at: "2026-06-13T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 3,
    team_name: "BU3 — Gouvernance, Risque & Conformité",
    current_workload_hours: 1120.0,
    max_capacity_hours: 1400.0,
    projected_overload_pct: 8.0,
    forecast_period: "Q3 2026 (Juillet-Septembre)",
    recommendations: "Charge maîtrisée mais sous-optimale en mix compétences. Besoin identifié : montée en compétence ESG pour 2 consultants. Formation KOS Training Academy module ESG réglementaire recommandée. Recrutement Data Analyst GRC à anticiper Q4 2026.",
    created_at: "2026-06-13T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 4,
    team_name: "BU4 — Think Tank & Prospective",
    current_workload_hours: 540.0,
    max_capacity_hours: 800.0,
    projected_overload_pct: 0.0,
    forecast_period: "Q3 2026 (Juillet-Septembre)",
    recommendations: "Capacité significative (32% dispo). Plan de production : Baromètre Conformité UEMOA 2026 (Juillet), Position Paper Finance Verte (Août), Étude Sectorielle MicroFinance (Septembre). Proposition : renfort temporaire BU4 → BU1 pour pic Q3 avec 1 consultant.",
    created_at: "2026-06-13T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 5,
    team_name: "KOS Automation & Data Science",
    current_workload_hours: 720.0,
    max_capacity_hours: 800.0,
    projected_overload_pct: 20.0,
    forecast_period: "Q3 2026 (Juillet-Septembre)",
    recommendations: "Surcharge projetée sur Q3 — Projets critiques : Déploiement KOS Executive Dashboard (Juillet), Automatisation Facturation (Août), MVP SaaS Conformité (Septembre). Recrutement 2ème Data Scientist urgent. Alternative : prioriser 2 projets sur 3 et reporter SaaS Conformité Q4.",
    created_at: "2026-06-13T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 6,
    team_name: "Opérations & Support",
    current_workload_hours: 640.0,
    max_capacity_hours: 800.0,
    projected_overload_pct: 0.0,
    forecast_period: "Q3 2026 (Juillet-Septembre)",
    recommendations: "Charge sous contrôle. Projet amélioration continue : déploiement KOS Onboarding Client digitalisé (impact -40% charge admin). Formation outil KOS pour 2 assistantes administratives. Aucun recrutement nécessaire.",
    created_at: "2026-06-13T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 7,
    team_name: "Practice Secteur Public & IFI",
    current_workload_hours: 480.0,
    max_capacity_hours: 700.0,
    projected_overload_pct: 0.0,
    forecast_period: "Q3 2026 (Juillet-Septembre)",
    recommendations: "Forte capacité disponible (31%). Pipeline en développement : appel d'offres Modernisation Fiscale (Juillet), proposition Banque Mondiale (en cours). Risque : si les 2 deals se concrétisent, charge projetée 95%. Plan B : mobilisation consultant BU3 en support.",
    created_at: "2026-06-13T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 8,
    team_name: "Direction Générale & COMEX",
    current_workload_hours: 320.0,
    max_capacity_hours: 400.0,
    projected_overload_pct: 5.0,
    forecast_period: "Q3 2026 (Juillet-Septembre)",
    recommendations: "Agenda COMEX chargé : Africa CEO Forum debrief, Revue Stratégique Semestrielle, Validation budget 2027, Décision ouverture Bureau Douala. KOS Executive Copilot réduit charge administrative de 25%. Délégation accrue aux Directors pour désengorger Managing Partner.",
    created_at: "2026-06-13T08:00:00Z",
    updated_at: "2026-06-13T08:00:00Z"
  }
];

export const forecastingEngine = [
  {
    id: 1,
    forecast_type: "Revenue",
    title: "Prévision Chiffre d'Affaires Annuel 2026",
    horizon: "12 mois (Janvier-Décembre 2026)",
    baseline_value: 5200000000,
    optimistic_value: 6400000000,
    pessimistic_value: 4400000000,
    confidence_level: 85.0,
    assumptions: "Croissance organique 18% baseline — 4 mandats majeurs en pipe (1.2 Md FCFA) — Taux conversion historique 48% — Impact Retrait KPMG +1 mandat — Risque macro : instabilité politique Q4 pourrait réduire pipeline nouveau de 15%",
    generated_at: "2026-06-13T08:00:00Z",
    created_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 2,
    forecast_type: "Effectifs",
    title: "Prévision Croissance Effectifs 2026-2027",
    horizon: "18 mois (Juillet 2026-Décembre 2027)",
    baseline_value: 28,
    optimistic_value: 38,
    pessimistic_value: 25,
    confidence_level: 78.0,
    assumptions: "Effectif actuel 24 consultants + 4 partners — Recrutement planifié 4 consultants 2026 — Pipeline justifie +6 consultants si conversion > 50% — Risque attrition : marché compétitif Abidjan/Dakar pour talents conformité — Ouverture Douala nécessite +3 recrutements",
    generated_at: "2026-06-13T08:00:00Z",
    created_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 3,
    forecast_type: "Pipeline",
    title: "Prévision Pipeline Commercial Q3-Q4 2026",
    horizon: "6 mois (Juillet-Décembre 2026)",
    baseline_value: 2100000000,
    optimistic_value: 2900000000,
    pessimistic_value: 1600000000,
    confidence_level: 82.0,
    assumptions: "Pipeline actuel 1.9 Md FCFA — 8 nouveaux leads attendus via SEO (3), LinkedIn (2), Références (2), Salons (1) — Taux conversion 48% → 330M FCFA signé baseline — Scenario optimiste : Retrait KPMG libère 2 mandats additionnels",
    generated_at: "2026-06-13T08:00:00Z",
    created_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 4,
    forecast_type: "Trésorerie",
    title: "Prévision Runway & Trésorerie",
    horizon: "12 mois (Juillet 2026-Juin 2027)",
    baseline_value: 185,
    optimistic_value: 240,
    pessimistic_value: 140,
    confidence_level: 90.0,
    assumptions: "Runway actuel 185 jours — Burn rate mensuel 95M FCFA — Revenus récurrents 180M/mois — Investissements prévus : KOS SaaS (45M), Bureau Douala (60M), Recrutement (30M) — Scenario pessimiste : retards paiement 2 mandats publics (90j DSO possible)",
    generated_at: "2026-06-13T08:00:00Z",
    created_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 5,
    forecast_type: "Marché",
    title: "Prévision Marché Adressable Conseil Réglementaire UEMOA",
    horizon: "24 mois (2026-2028)",
    baseline_value: 14800000000,
    optimistic_value: 18500000000,
    pessimistic_value: 12000000000,
    confidence_level: 75.0,
    assumptions: "Marché actuel 14.8 Mds FCFA — Croissance CAGR 12% baseline (drivers : XBRL 2028, Stress Tests Climat, Consolidation SFD) — Optimiste : nouvelles régulations GAFI 2027 accélèrent demande — Pessimiste : concentration Big Four réduit part adressable aux indépendants",
    generated_at: "2026-06-13T08:00:00Z",
    created_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 6,
    forecast_type: "Rentabilité",
    title: "Prévision Marge Opérationnelle 2026-2027",
    horizon: "18 mois (Juillet 2026-Décembre 2027)",
    baseline_value: 38.5,
    optimistic_value: 42.0,
    pessimistic_value: 33.0,
    confidence_level: 80.0,
    assumptions: "Marge actuelle 38.5% — Gain productivité KOS Automation +3 pts — Effet volume +1 pt — Pression salariale recrutement -1.5 pts — Investissement SaaS et Douala -2 pts court terme — Cible Big Four 40% atteignable Q4 2027",
    generated_at: "2026-06-13T08:00:00Z",
    created_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 7,
    forecast_type: "KOS",
    title: "Prévision Taux d'Automatisation KOS 2026-2027",
    horizon: "18 mois (Juillet 2026-Décembre 2027)",
    baseline_value: 87,
    optimistic_value: 95,
    pessimistic_value: 82,
    confidence_level: 88.0,
    assumptions: "Automatisation actuelle 87% — Roadmap : Facturation (Q3), Reporting COMEX (Q3), Onboarding Client (Q4) — Cible 95% correspond Full Autonomous Enterprise — Risque : complexité intégration systèmes legacy de 2 clients pourrait ralentir déploiement de 1 trimestre",
    generated_at: "2026-06-13T08:00:00Z",
    created_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 8,
    forecast_type: "Stratégique",
    title: "Prévision Parts de Marché UEMOA — Conseil Réglementaire",
    horizon: "24 mois (2026-2028)",
    baseline_value: 8.5,
    optimistic_value: 14.0,
    pessimistic_value: 6.0,
    confidence_level: 72.0,
    assumptions: "Part actuelle 8.5% — Croissance organique +2 pts/an — Retrait KPMG libère 3 pts — Optimiste : Ouverture Douala +2 pts additionnels CEMAC — Pessimiste : Entrée nouveau concurrent international comprime marges et parts",
    generated_at: "2026-06-13T08:00:00Z",
    created_at: "2026-06-13T08:00:00Z"
  }
];

export const scenarioSimulator = [
  {
    id: 1,
    scenario_name: "Retrait Majeur Concurrent — Opportunité Expansion",
    domain: "Stratégie Commerciale",
    probability: 0.65,
    impact_score: 8.8,
    financial_impact_fcfa: 1200000000,
    strategic_implications: "KPMG réduit sa practice conformité UEMOA. KHEPRA capte 3 mandats bancaires majeurs (1.2 Md FCFA pipeline). Positionnement leader conformité UEMOA. Besoin recrutement immédiat 4 consultants. Risque : capacité absorption rapide",
    mitigation_actions: "Plan recrutement accéléré activé — Partenariat Grant Thornton pour absorption pic — KOS Onboarding digitalisé pour intégration rapide — Suivi hebdomadaire qualité pendant transition",
    status: "Actif — Plan d'action enclenché",
    created_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 2,
    scenario_name: "Crise de Conformité Majeure chez Client",
    domain: "Gestion de Crise",
    probability: 0.25,
    impact_score: 7.2,
    financial_impact_fcfa: -350000000,
    strategic_implications: "Un client bancaire majeur fait l'objet d'une inspection BCEAO avec sanctions. KHEPRA en première ligne comme conseil. Risque réputationnel si manquement non détecté. Enjeu : démontrer excellence en mode crise",
    mitigation_actions: "Protocol Crise activable 24h — Équipe SWAT 3 Senior Partners dédiée — Coordination directe BCEAO — Communication de crise préparée — Assurance responsabilité civile professionnelle vérifiée",
    status: "Surveillé — Indicateurs au vert",
    created_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 3,
    scenario_name: "Décision Ouverture Bureau Douala CEMAC",
    domain: "Expansion Géographique",
    probability: 0.70,
    impact_score: 8.2,
    financial_impact_fcfa: 580000000,
    strategic_implications: "Ouverture physique CEMAC = différenciation majeure. Double agrément BCEAO/COBAC activable commercialement. Pipeline estimé 580M FCFA an 1. Investissement initial 60M FCFA. ROI projeté 18 mois. Risque politique Cameroun modéré",
    mitigation_actions: "Structure légale déjà préparée — Director identifié (ex-COBAC) — Bureau et équipement budgétés — Partenariat local Cabinet Fadoul pour intro clients — Lancement progressif : 2 consultants puis scale",
    status: "En analyse — Décision COMEX Juillet 2026",
    created_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 4,
    scenario_name: "Lancement KOS SaaS Conformité",
    domain: "Innovation & Produit",
    probability: 0.55,
    impact_score: 9.4,
    financial_impact_fcfa: 750000000,
    strategic_implications: "Transformation business model : conseil → SaaS + conseil. Revenu récurrent prévisible. Barrière à l'entrée : base connaissance réglementaire propriétaire. 150 clients potentiels. Valorisation KHEPRA ×3 si succès. Risque : distraction du cœur de métier",
    mitigation_actions: "Équipe dédiée (2 Data Scientists + 1 Product Manager) — MVP Q3 2026 — Beta testeurs 3 clients pilotes — Financement dédié sans ponction conseil — Go/No-Go après beta",
    status: "En exploration — MVP en développement",
    created_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 5,
    scenario_name: "Perte de 2 Talents Clés — Risque Rétention",
    domain: "Ressources Humaines",
    probability: 0.30,
    impact_score: 6.8,
    financial_impact_fcfa: -280000000,
    strategic_implications: "Départ hypothétique Director BU1 + Senior Consultant LBC/FT. Perte capital intellectuel critique. Retard 2 mandats majeurs. Coût recrutement + intérim + perte productivité estimé 280M FCFA. 6-8 mois pour retrouver pleine capacité",
    mitigation_actions: "Plan rétention activé : revue salariale Q3, programme equity phantom shares, formation accélérée relève interne, documentation systématique connaissances dans Strategic Memory, clause non-sollicitation renforcée",
    status: "Surveillé — Plan rétention actif",
    created_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 6,
    scenario_name: "Choc Macro-Économique UEMOA — Dévaluation FCFA",
    domain: "Risque Macro",
    probability: 0.15,
    impact_score: 9.0,
    financial_impact_fcfa: -620000000,
    strategic_implications: "Scénario extrême : réforme du FCFA ou dévaluation. Contrats libellés en FCFA → perte valeur réelle 20-30%. Clients réduisent budgets conseil. Pipeline divisé par 2. Trésorerie tensions. Survie dépend du positionnement premium",
    mitigation_actions: "Diversification devise : 2 mandats en EUR en négociation — Fonds de réserve 185j runway — Structure coûts variable (70% consultants = flexibilité) — Partenariat international Banque Mondiale (USD) — Veille macro trimestrielle KOS Strategic Planning",
    status: "Surveillé — Probabilité faible",
    created_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 7,
    scenario_name: "Partenariat Stratégique Big Four — Co-traitance",
    domain: "Alliance Stratégique",
    probability: 0.45,
    impact_score: 7.5,
    financial_impact_fcfa: 350000000,
    strategic_implications: "PwC ou Deloitte propose co-traitance structurée sur practice Conformité UEMOA. Accès à deals > 1 Md FCFA actuellement inaccessibles. Transfert méthodologique mutuel. Risque : dilution marque KHEPRA et dépendance progressive",
    mitigation_actions: "Due diligence partenaire systématique — Contrat co-traitance avec clauses protection PI — Limitation scope à 30% CA max — Maintien identité KHEPRA distincte — Option sortie unilatérale à 6 mois",
    status: "En veille — Contact exploratoire PwC",
    created_at: "2026-06-13T08:00:00Z"
  },
  {
    id: 8,
    scenario_name: "Succès Viral — Croissance Explosive",
    domain: "Croissance",
    probability: 0.20,
    impact_score: 9.2,
    financial_impact_fcfa: 1800000000,
    strategic_implications: "3 mandats majeurs signés simultanément + Citation Gouverneur BCEAO + Article Forbes → Effet boule de neige. CA ×2.5 en 18 mois. KHEPRA devient cabinet de référence UEMOA. Défi : gérer l'hypercroissance sans perte qualité",
    mitigation_actions: "Plan scale-up préparé : recrutement anticipé 6 consultants — Processus industrialisés KOS Consulting Factory — KOS Quality Assurance automatique — Mentorat interne systématique — Partenaires Cabinet Fadoul + Grant Thornton en réserve",
    status: "Préparé — Plan scale-up validé",
    created_at: "2026-06-13T08:00:00Z"
  }
];

// ============================================================
// AXE 11 — Executive Cockpit Unifié (9 Scores Big Four)
// Cockpit temps réel avec les 9 scores de maturité KOS
// ============================================================
export interface ExecutiveCockpitScore {
  id: string;
  name: string;
  icon: string;
  current_score: number;
  target_score: number;
  trend: 'up' | 'stable' | 'down';
  trend_pct: number;
  last_updated: string;
  components: { label: string; score: number; max: number }[];
  gap_analysis: string;
  action_plan: string;
  owner: string;
}

export const executiveCockpitScores: ExecutiveCockpitScore[] = [
  {
    id: 'gov',
    name: 'Governance',
    icon: 'ri-government-line',
    current_score: 94,
    target_score: 100,
    trend: 'up',
    trend_pct: 4,
    last_updated: '2026-06-16T08:00:00Z',
    components: [
      { label: 'Advisory Board', score: 91, max: 100 },
      { label: 'Comités Spécialisés', score: 100, max: 100 },
      { label: 'Comité Scientifique', score: 95, max: 100 },
      { label: 'Chartes & Statuts', score: 90, max: 100 },
    ],
    gap_analysis: 'Manque formalisation Comité Qualité dédié. Score chartes 90/100 — 2 chartes en révision.',
    action_plan: 'Créer Comité Qualité avec charte ISO 9001. Finaliser révision chartes Audit et Rémunération.',
    owner: 'Managing Partner',
  },
  {
    id: 'compliance',
    name: 'Regulatory Compliance',
    icon: 'ri-scales-3-line',
    current_score: 91,
    target_score: 100,
    trend: 'up',
    trend_pct: 3,
    last_updated: '2026-06-16T06:00:00Z',
    components: [
      { label: 'Couverture BCEAO', score: 95, max: 100 },
      { label: 'Couverture COBAC', score: 90, max: 100 },
      { label: 'Couverture OHADA', score: 92, max: 100 },
      { label: 'Veille Réglementaire', score: 88, max: 100 },
    ],
    gap_analysis: '2 textes COBAC récents non intégrés. Délai veille 72h à réduire à 24h.',
    action_plan: 'Intégration COBAC Instructions 2026. Automatisation KOS veille temps réel.',
    owner: 'Director BU1 — Régulation',
  },
  {
    id: 'quality',
    name: 'Quality Assurance',
    icon: 'ri-shield-check-line',
    current_score: 88,
    target_score: 100,
    trend: 'up',
    trend_pct: 2,
    last_updated: '2026-06-15T18:00:00Z',
    components: [
      { label: 'QA Automatique', score: 92, max: 100 },
      { label: 'Peer Review', score: 88, max: 100 },
      { label: 'Expert Review', score: 90, max: 100 },
      { label: 'Humanization', score: 82, max: 100 },
    ],
    gap_analysis: 'Workflow incomplet — manque Compliance Review et Executive Approval. Humanization 82/100.',
    action_plan: 'Déployer Compliance Review + Executive Approval. Améliorer Humanization Engine pour cible 90.',
    owner: 'Comité Qualité',
  },
  {
    id: 'risk',
    name: 'Risk Management',
    icon: 'ri-alert-line',
    current_score: 90,
    target_score: 100,
    trend: 'stable',
    trend_pct: 0,
    last_updated: '2026-06-15T12:00:00Z',
    components: [
      { label: 'Registre des Risques', score: 92, max: 100 },
      { label: 'Heat Maps', score: 88, max: 100 },
      { label: 'KRIs', score: 90, max: 100 },
      { label: 'Plans Remédiation', score: 91, max: 100 },
    ],
    gap_analysis: '44 risques cartographiés. Heat map trimestrielle à passer en mensuelle.',
    action_plan: 'Automatisation heat map mensuelle. KRIs en temps réel via KOS Control Tower.',
    owner: 'Comité des Risques',
  },
  {
    id: 'trust',
    name: 'Client Trust',
    icon: 'ri-heart-line',
    current_score: 86,
    target_score: 100,
    trend: 'up',
    trend_pct: 5,
    last_updated: '2026-06-16T08:00:00Z',
    components: [
      { label: 'Études de Cas', score: 75, max: 100 },
      { label: 'Témoignages Vérifiés', score: 78, max: 100 },
      { label: 'Certifications', score: 91, max: 100 },
      { label: 'Méthodologies', score: 95, max: 100 },
    ],
    gap_analysis: 'Volume case studies insuffisant (6/100 cible). Témoignages non systématisés.',
    action_plan: 'Programme 100 études de cas. Automatisation collecte témoignages post-mission.',
    owner: 'Director — Marketing & Communication',
  },
  {
    id: 'authority',
    name: 'SEO Authority',
    icon: 'ri-search-eye-line',
    current_score: 88,
    target_score: 100,
    trend: 'up',
    trend_pct: 3,
    last_updated: '2026-06-16T07:00:00Z',
    components: [
      { label: 'Pages Expertes', score: 79, max: 100 },
      { label: 'Backlinks Qualifiés', score: 70, max: 100 },
      { label: 'CWV (Core Web Vitals)', score: 98, max: 100 },
      { label: 'Schema & AEO', score: 95, max: 100 },
    ],
    gap_analysis: '211/1000 pages expertes. 328/5000 backlinks. Volume contenu insuffisant.',
    action_plan: 'Blog Writing Pipeline 10 articles/semaine. Campagne backlinks institutionnels.',
    owner: 'SEO Autopilot Enterprise',
  },
  {
    id: 'seo',
    name: 'SEO Performance',
    icon: 'ri-bar-chart-2-line',
    current_score: 88,
    target_score: 100,
    trend: 'up',
    trend_pct: 2,
    last_updated: '2026-06-16T07:00:00Z',
    components: [
      { label: 'Trafic Organique', score: 82, max: 100 },
      { label: 'Mots-clés Top 10', score: 85, max: 100 },
      { label: 'CTR Moyen', score: 88, max: 100 },
      { label: 'Taux Conversion SEO', score: 92, max: 100 },
    ],
    gap_analysis: 'Trafic organique 82% cible. Positionnement requêtes BCEAO/OHADA à renforcer.',
    action_plan: 'Content strategy ciblée BCEAO/OHADA. Programme SILO interne + maillage.',
    owner: 'SEO Autopilot Enterprise',
  },
  {
    id: 'visibility',
    name: 'Institutional Visibility',
    icon: 'ri-eye-line',
    current_score: 93,
    target_score: 100,
    trend: 'up',
    trend_pct: 2,
    last_updated: '2026-06-16T08:00:00Z',
    components: [
      { label: 'Partenariats', score: 88, max: 100 },
      { label: 'Citations', score: 95, max: 100 },
      { label: 'Interventions', score: 92, max: 100 },
      { label: 'Bailleurs', score: 85, max: 100 },
    ],
    gap_analysis: '6/14 bailleurs accrédités. Partenariats institutionnels à accélérer. Cible 50+.',
    action_plan: 'Roadshow bailleurs Q3-Q4 2026. Programme interventions publiques 50/an.',
    owner: 'Institutional Visibility Engine',
  },
  {
    id: 'aicompliance',
    name: 'AI Compliance',
    icon: 'ri-robot-2-line',
    current_score: 87,
    target_score: 100,
    trend: 'up',
    trend_pct: 4,
    last_updated: '2026-06-16T06:00:00Z',
    components: [
      { label: 'Registre IA', score: 90, max: 100 },
      { label: 'ISO 42001', score: 87, max: 100 },
      { label: 'Traçabilité', score: 93, max: 100 },
      { label: 'Anti-Hallucination', score: 80, max: 100 },
    ],
    gap_analysis: 'ISO 42001 en cours (87%). Détection hallucinations à renforcer à 99.9%.',
    action_plan: 'Certification ISO 42001 Q3 2026. Amélioration Hallucination Detection Engine.',
    owner: 'AI Governance Council',
  },
];

export const cockpitThresholds = {
  excellence: { min: 95, label: 'Excellence', color: '#22c55e', bg: 'bg-green-500', ring: 'ring-green-400' },
  very_good: { min: 90, label: 'Très Performant', color: '#84cc16', bg: 'bg-lime-500', ring: 'ring-lime-400' },
  acceptable: { min: 80, label: 'Acceptable', color: '#f59e0b', bg: 'bg-amber-500', ring: 'ring-amber-400' },
  critical: { min: 0, label: 'Action Immédiate', color: '#ef4444', bg: 'bg-red-500', ring: 'ring-red-400' },
};

export const cockpitOverallMetrics = {
  overall_maturity: 89.4,
  scores_at_excellence: 0,
  scores_at_very_good: 4,
  scores_at_acceptable: 5,
  scores_critical: 0,
  total_actions: 18,
  completed_actions: 12,
  avg_improvement_velocity: 2.8,
  projected_excellence_date: '2026-09-30',
};





