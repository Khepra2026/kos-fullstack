// KOS ESG & Sustainability Command™ — Mock Data
// Consortium PwC · Deloitte · EY · KPMG
// Mandat : Bilan Carbone, EcoVadis, Rapport Durabilité 2026 GRI/ISSB, Dashboard ESG Exécutif, Plan ESG

export const carbonFootprintAssessment = {
  assessment_year: "2026",
  base_year: "2025",
  methodology: "GHG Protocol Corporate Standard + ISO 14064-1:2018",
  assessor: "Bureau Veritas — Vérification Tierce Partie",
  overall_tco2e: 428.5,
  target_2027: 350,
  target_2030: 180,
  reduction_vs_base: -15.2,
  per_employee_tco2e: 6.8,
  per_million_fcfa_tco2e: 0.42,
  scopes: [
    {
      id: "scope-1",
      name: "Scope 1 — Émissions Directes",
      tco2e: 42.8,
      percentage: 10.0,
      target_2027: 30,
      sources: [
        { source: "Carburant véhicules de fonction (Dakar, Abidjan, Douala)", tco2e: 18.5, reduction_potential: 40 },
        { source: "Combustibles (groupes électrogènes bureaux)", tco2e: 14.2, reduction_potential: 35 },
        { source: "Gaz réfrigérants (climatisation)", tco2e: 7.3, reduction_potential: 25 },
        { source: "Fuites fluides frigorigènes", tco2e: 2.8, reduction_potential: 50 }
      ],
      actions: [
        "Transition flotte véhicules → hybride/électrique d'ici 2028",
        "Installation panneaux solaires bureaux Dakar (2027) et Abidjan (2028)",
        "Remplacement climatiseurs par modèles Inverter R32"
      ]
    },
    {
      id: "scope-2",
      name: "Scope 2 — Émissions Indirectes (Énergie)",
      tco2e: 85.7,
      percentage: 20.0,
      target_2027: 65,
      sources: [
        { source: "Électricité — Bureaux Dakar (SENELEC)", tco2e: 38.4, reduction_potential: 45 },
        { source: "Électricité — Bureaux Abidjan (CIE)", tco2e: 22.1, reduction_potential: 40 },
        { source: "Électricité — Bureaux Douala (ENEO)", tco2e: 15.8, reduction_potential: 40 },
        { source: "Électricité — Data Center (Hébergement Cloud)", tco2e: 6.2, reduction_potential: 30 },
        { source: "Chauffage/Clim — Énergie", tco2e: 3.2, reduction_potential: 20 }
      ],
      actions: [
        "Contrat électricité verte (GO) — 100% d'ici 2028",
        "Migration data center → fournisseur neutre carbone (2027)",
        "Audit énergétique annuel + compteurs intelligents"
      ]
    },
    {
      id: "scope-3",
      name: "Scope 3 — Autres Émissions Indirectes",
      tco2e: 300.0,
      percentage: 70.0,
      target_2027: 255,
      sources: [
        { source: "Déplacements professionnels (avion)", tco2e: 125.4, reduction_potential: 30 },
        { source: "Déplacements professionnels (véhicules personnels)", tco2e: 45.2, reduction_potential: 25 },
        { source: "Achats de biens et services (fournitures, IT)", tco2e: 52.8, reduction_potential: 20 },
        { source: "Déchets bureaux (papier, électronique)", tco2e: 15.6, reduction_potential: 60 },
        { source: "Utilisation produits vendus (services cloud)", tco2e: 22.5, reduction_potential: 15 },
        { source: "Déplacements domicile-travail collaborateurs", tco2e: 18.3, reduction_potential: 25 },
        { source: "Hôtels et restauration missions", tco2e: 20.2, reduction_potential: 20 }
      ],
      actions: [
        "Politique voyages — prioriser trains Afrique de l'Ouest + visio",
        "Politique achats responsables — critères ESG fournisseurs",
        "Zéro papier — digitalisation 100% workflows",
        "Télétravail 2j/semaine — réduction domicile-travail",
        "Compensation carbone résiduel — Projets Gold Standard Afrique"
      ]
    }
  ],
  historical_trend: [
    { year: 2023, tco2e: 512.0 },
    { year: 2024, tco2e: 485.3 },
    { year: 2025, tco2e: 505.7 },
    { year: 2026, tco2e: 428.5 }
  ],
  projected_trajectory: [
    { year: 2027, tco2e: 350, scenario: "Réduction accélérée" },
    { year: 2028, tco2e: 280, scenario: "Transition énergétique" },
    { year: 2029, tco2e: 220, scenario: "Optimisation continue" },
    { year: 2030, tco2e: 180, scenario: "Net Zero Pathway" }
  ],
  verification_status: "Vérifié — Bureau Veritas — Rapport n°BV-C-2026-0894",
  verification_date: "2026-06-10",
  carbon_neutrality_target: 2035,
  sbti_alignment: "Aligné trajectoire 1.5°C — En cours validation SBTi"
};

export const ecovadisAssessment = {
  preparation_date: "2026-06-18",
  submission_target: "2026-09-30",
  current_estimated_score: 42,
  target_score: 75,
  target_medal: "Gold",
  domains: [
    {
      id: "eco-env",
      domain: "Environnement",
      weight: 25,
      current_score: 38,
      target_score: 75,
      policies: ["Politique Environnementale v1.0 — Adoptée Juin 2026", "Procédure gestion déchets — En cours", "Plan transition énergétique — Validé COMEX"],
      gaps: ["Absence certification ISO 14001", "Reporting GRI incomplet (énergie, eau)", "Absence objectifs chiffrés Scope 3"],
      actions: ["Lancer certification ISO 14001 (Q3 2026)", "Finaliser reporting GRI 2026", "Définir cibles Scope 3 chiffrées"],
      deadline: "2026-11-30",
      budget: "16 500 000 FCFA",
      owner: "Responsable RSE"
    },
    {
      id: "eco-social",
      domain: "Social & Droits Humains",
      weight: 25,
      current_score: 48,
      target_score: 78,
      policies: ["Politique Diversité & Inclusion — Adoptée", "Code de Conduite Fournisseurs — Adopté", "Politique Santé & Sécurité — Adoptée"],
      gaps: ["Absence politique droits humains formelle", "Indicateurs diversité non publiés", "Absence due diligence droits humains fournisseurs"],
      actions: ["Rédiger Politique Droits Humains (GRI 408-412)", "Publier indicateurs diversité rapport 2026", "Déployer due diligence RH fournisseurs"],
      deadline: "2026-10-31",
      budget: "12 800 000 FCFA",
      owner: "DRH"
    },
    {
      id: "eco-ethics",
      domain: "Éthique",
      weight: 25,
      current_score: 52,
      target_score: 80,
      policies: ["Code de Conduite Anti-corruption — Adopté", "Politique Lanceurs d'Alerte — Adoptée", "Politique Conflits d'Intérêts — Adoptée"],
      gaps: ["Absence procédure due diligence anti-corruption partenaires", "Formation anti-corruption non systématique", "Absence cartographie risques corruption"],
      actions: ["Déployer due diligence anti-corruption tiers", "Formation anti-corruption 100% collaborateurs", "Cartographier risques corruption (ISO 37001)"],
      deadline: "2026-09-30",
      budget: "9 600 000 FCFA",
      owner: "Comité d'Audit + RCLCB/FT"
    },
    {
      id: "eco-supply",
      domain: "Achats Responsables",
      weight: 25,
      current_score: 30,
      target_score: 68,
      policies: ["Politique Achats Responsables — Brouillon", "Charte RSE Fournisseurs — En rédaction"],
      gaps: ["Absence critères ESG dans sélection fournisseurs", "Aucune évaluation ESG fournisseurs existants", "Pas de reporting chaîne d'approvisionnement"],
      actions: ["Adopter Politique Achats Responsables", "Intégrer critères ESG dans tous les appels d'offres", "Évaluer top 50 fournisseurs sur ESG"],
      deadline: "2026-12-31",
      budget: "14 200 000 FCFA",
      owner: "Directeur Administratif & Financier"
    }
  ],
  documentation_required: [
    "Politique Environnementale",
    "Bilan Carbone vérifié (Scope 1-2-3)",
    "Politique Droits Humains",
    "Code de Conduite Anti-corruption",
    "Politique Achats Responsables",
    "Rapport Développement Durable 2026",
    "Preuve formation anti-corruption",
    "Certificat ISO 14001 (en cours)",
    "Registre incidents éthiques",
    "Indicateurs diversité 2026"
  ],
  timeline_milestones: [
    { milestone: "Dossier EcoVadis complété", date: "2026-09-30", status: "Planifié" },
    { milestone: "Documents justificatifs uploadés", date: "2026-10-15", status: "Planifié" },
    { milestone: "Évaluation EcoVadis", date: "2026-10-30", status: "Planifié" },
    { milestone: "Score & Médaille reçus", date: "2026-11-30", status: "Planifié" },
    { milestone: "Plan correctif post-évaluation", date: "2026-12-15", status: "Planifié" },
    { milestone: "Re-score cible Gold (75+)", date: "2027-06-30", status: "Planifié" }
  ]
};

export const sustainabilityReport2026 = {
  title: "Rapport de Durabilité 2026 — KHEPRA EXPERTS",
  frameworks: ["GRI Standards 2021", "ISSB IFRS S1 & S2", "SASB Professional Services", "EU CSRD (préparatoire)"],
  publication_date: "2026-12-31",
  reporting_period: "1er Janvier — 31 Décembre 2026",
  assurance_provider: "Bureau Veritas — Vérification Indépendante (niveau modéré)",
  chapters: [
    {
      id: "ch-01",
      title: "Mot du Managing Partner",
      status: "Brouillon — 80%",
      author: "Managing Partner KHEPRA",
      due_date: "2026-10-31",
      content_summary: "Engagement pour une croissance durable en Afrique francophone. Bilan 2026 et vision Net Zero 2035. Alignement ODD 8-9-13-16-17."
    },
    {
      id: "ch-02",
      title: "À Propos de ce Rapport",
      status: "Rédigé — 100%",
      author: "Responsable RSE",
      due_date: "2026-09-30",
      content_summary: "Périmètre : KOS Platform + Bureaux Dakar/Abidjan/Douala. Méthodologie GRI Standards 2021. Analyse de matérialité double."
    },
    {
      id: "ch-03",
      title: "Gouvernance ESG",
      status: "Adopté — 100%",
      author: "Comité ESG + Conseil",
      due_date: "2026-09-15",
      content_summary: "Structure gouvernance ESG : Comité ESG (trimestriel), Responsable RSE (dédié), Mission Statement ESG, Politique de rémunération liée aux KPIs ESG."
    },
    {
      id: "ch-04",
      title: "Performance Environnementale (GRI 300)",
      status: "En cours — 65%",
      author: "Responsable RSE",
      due_date: "2026-11-15",
      content_summary: "Bilan carbone complet Scope 1-2-3. Politique énergétique. Gestion des déchets. Biodiversité. Eau."
    },
    {
      id: "ch-05",
      title: "Performance Sociale (GRI 400)",
      status: "En cours — 50%",
      author: "DRH",
      due_date: "2026-11-15",
      content_summary: "Effectifs, diversité, formation, santé/sécurité, droits humains, engagement communautaire, chaîne d'approvisionnement responsable."
    },
    {
      id: "ch-06",
      title: "Performance Économique & Éthique (GRI 200)",
      status: "En cours — 55%",
      author: "DAF",
      due_date: "2026-11-15",
      content_summary: "Valeur économique créée et distribuée. Lutte anti-corruption. Conformité réglementaire. Innovation durable."
    },
    {
      id: "ch-07",
      title: "Alignement ISSB & TCFD",
      status: "Planifié — 20%",
      author: "Responsable RSE + DAF",
      due_date: "2026-11-30",
      content_summary: "Risques et opportunités climatiques selon TCFD. Scénarios 1.5°C, 2°C, 3°C. Métriques ISSB IFRS S2. Plan de transition."
    },
    {
      id: "ch-08",
      title: "Annexes & Tables GRI",
      status: "Planifié — 10%",
      author: "Responsable RSE",
      due_date: "2026-12-15",
      content_summary: "Index de contenu GRI complet. Tables de correspondance ISSB/SASB/ODD. Glossaire. Contacts."
    }
  ],
  materiality_matrix: {
    topics: [
      { topic: "Émissions GES & Climat", importance_interne: 92, importance_externe: 95, category: "Très Haute" },
      { topic: "Éthique & Anti-corruption", importance_interne: 90, importance_externe: 88, category: "Très Haute" },
      { topic: "Conformité Réglementaire", importance_interne: 95, importance_externe: 92, category: "Très Haute" },
      { topic: "Diversité & Inclusion", importance_interne: 78, importance_externe: 72, category: "Haute" },
      { topic: "Sécurité des Données", importance_interne: 88, importance_externe: 85, category: "Haute" },
      { topic: "Formation & Développement", importance_interne: 75, importance_externe: 65, category: "Haute" },
      { topic: "Achats Responsables", importance_interne: 62, importance_externe: 68, category: "Moyenne" },
      { topic: "Engagement Communautaire", importance_interne: 58, importance_externe: 72, category: "Moyenne" },
      { topic: "Biodiversité", importance_interne: 35, importance_externe: 42, category: "Faible" },
      { topic: "Gestion de l'Eau", importance_interne: 32, importance_externe: 38, category: "Faible" }
    ]
  },
  sdg_alignment: [
    { sdg: "ODD 8 — Travail Décent & Croissance Économique", relevance: "Haute", contribution: "Emplois qualifiés, croissance PME africaines" },
    { sdg: "ODD 9 — Industrie, Innovation & Infrastructure", relevance: "Haute", contribution: "KOS Platform, digitalisation conseil" },
    { sdg: "ODD 13 — Lutte contre le Changement Climatique", relevance: "Très Haute", contribution: "Net Zero 2035, bilan carbone, compensation" },
    { sdg: "ODD 16 — Paix, Justice & Institutions Efficaces", relevance: "Haute", contribution: "Gouvernance, conformité, anti-corruption" },
    { sdg: "ODD 17 — Partenariats pour les Objectifs", relevance: "Moyenne", contribution: "Partenariats Big Four, consortium, think tank" },
    { sdg: "ODD 5 — Égalité des Sexes", relevance: "Haute", contribution: "Politique diversité, 45% femmes cadres" },
    { sdg: "ODD 4 — Éducation de Qualité", relevance: "Moyenne", contribution: "Formation continue, KOS Academy" }
  ],
  kpi_summary: [
    { kpi: "Bilan Carbone (tCO₂e)", current: 428.5, unit: "tCO₂e", trend: "down", change: "-15.2% vs 2025" },
    { kpi: "Score EcoVadis estimé", current: 42, unit: "/100", trend: "up", change: "+18 pts vs auto-éval 2025" },
    { kpi: "Femmes dans l'effectif", current: 45, unit: "%", trend: "up", change: "+3% vs 2025" },
    { kpi: "Heures formation / employé", current: 52, unit: "heures", trend: "up", change: "+8h vs 2025" },
    { kpi: "Fournisseurs évalués ESG", current: 28, unit: "%", trend: "up", change: "+28% — nouveau" },
    { kpi: "Taux d'Incidents Éthiques", current: 0, unit: "/an", trend: "stable", change: "0 — stable" },
    { kpi: "Énergie Renouvelable", current: 12, unit: "%", trend: "up", change: "+5% vs 2025" },
    { kpi: "Déchets Recyclés", current: 35, unit: "%", trend: "up", change: "+12% vs 2025" }
  ]
};

export const esgExecutiveDashboard = {
  title: "Tableau de Bord ESG Exécutif — KHEPRA EXPERTS",
  last_updated: "2026-06-19",
  frequency: "Mensuel — Revue COMEX",
  owner: "Responsable RSE",
  audience: "COMEX + Conseil d'Administration",
  kpi_groups: [
    {
      id: "kpi-env",
      name: "Environnement",
      icon: "ri-leaf-line",
      kpis: [
        { id: "kpi-carbon", name: "Empreinte Carbone (tCO₂e)", value: 428.5, target: 350, unit: "tCO₂e", trend: "down", alert: "On track", color: "green" },
        { id: "kpi-energy", name: "Énergie Renouvelable", value: 12, target: 30, unit: "%", trend: "up", alert: "Behind", color: "amber" },
        { id: "kpi-waste", name: "Taux Recyclage Déchets", value: 35, target: 60, unit: "%", trend: "up", alert: "Behind", color: "amber" },
        { id: "kpi-paper", name: "Consommation Papier", value: 2850, target: 1500, unit: "kg", trend: "down", alert: "Behind", color: "amber" }
      ]
    },
    {
      id: "kpi-social",
      name: "Social",
      icon: "ri-heart-line",
      kpis: [
        { id: "kpi-diversity", name: "Femmes dans l'Effectif", value: 45, target: 50, unit: "%", trend: "up", alert: "On track", color: "green" },
        { id: "kpi-training", name: "Heures Formation / Employé", value: 52, target: 60, unit: "h", trend: "up", alert: "On track", color: "green" },
        { id: "kpi-safety", name: "Taux Fréquence Accidents", value: 0.8, target: 0, unit: "/100k", trend: "down", alert: "Watch", color: "amber" },
        { id: "kpi-turnover", name: "Turnover Volontaire", value: 8.5, target: 5, unit: "%", trend: "up", alert: "Watch", color: "amber" }
      ]
    },
    {
      id: "kpi-governance",
      name: "Gouvernance",
      icon: "ri-shield-check-line",
      kpis: [
        { id: "kpi-ethics", name: "Incidents Éthiques", value: 0, target: 0, unit: "/an", trend: "stable", alert: "Good", color: "green" },
        { id: "kpi-board", name: "Femmes au Conseil", value: 33, target: 40, unit: "%", trend: "stable", alert: "Watch", color: "amber" },
        { id: "kpi-compliance", name: "Taux Conformité Réglementaire", value: 92, target: 100, unit: "%", trend: "up", alert: "On track", color: "green" },
        { id: "kpi-audit", name: "Recommandations Audit Closes", value: 82, target: 95, unit: "%", trend: "up", alert: "On track", color: "green" }
      ]
    },
    {
      id: "kpi-reporting",
      name: "Reporting ESG",
      icon: "ri-file-chart-line",
      kpis: [
        { id: "kpi-gri", name: "Complétude GRI", value: 58, target: 95, unit: "%", trend: "up", alert: "Behind", color: "amber" },
        { id: "kpi-issb", name: "Alignement ISSB", value: 35, target: 90, unit: "%", trend: "up", alert: "Behind", color: "red" },
        { id: "kpi-ecovadis", name: "Score EcoVadis Estimé", value: 42, target: 75, unit: "/100", trend: "up", alert: "Behind", color: "red" },
        { id: "kpi-assurance", name: "Couverture Assurance Externe", value: 25, target: 100, unit: "%", trend: "up", alert: "Behind", color: "red" }
      ]
    }
  ],
  alerts: [
    { id: "alt-1", severity: "high", message: "Alignement ISSB à 35% — Retard critique. Deadline rapport 31 Décembre 2026.", action: "Accélérer rédaction chapitres ISSB/TCFD" },
    { id: "alt-2", severity: "high", message: "Score EcoVadis estimé 42/100 — Cible Gold 75/100. Dossier à soumettre 30 Septembre.", action: "Finaliser politiques manquantes + preuves" },
    { id: "alt-3", severity: "medium", message: "Énergie renouvelable à 12% — Cible 30%. Contrat GO non signé.", action: "Signer contrat électricité verte Q3 2026" },
    { id: "alt-4", severity: "medium", message: "Couverture assurance externe ESG à 25% — Cible 100% pour crédibilité rapport.", action: "Contracter Bureau Veritas pour vérification complète" }
  ]
};

export const esgPlanActions = [
  {
    id: "esg-001",
    pillar: "Bilan Carbone",
    action: "Finaliser bilan carbone complet Scope 1-2-3 (année de référence 2026)",
    priority: "P0",
    status: "En cours",
    progress: 80,
    responsible: "Responsable RSE",
    deadline: "2026-08-31",
    budget: "8 500 000 FCFA",
    kpi: "Bilan vérifié Bureau Veritas",
    dependencies: []
  },
  {
    id: "esg-002",
    pillar: "Bilan Carbone",
    action: "Définir trajectoire Net Zero 2035 avec objectifs intermédiaires SBTi",
    priority: "P0",
    status: "En cours",
    progress: 60,
    responsible: "Responsable RSE + COMEX",
    deadline: "2026-10-31",
    budget: "3 200 000 FCFA",
    kpi: "Trajectoire SBTi soumise",
    dependencies: ["esg-001"]
  },
  {
    id: "esg-003",
    pillar: "Bilan Carbone",
    action: "Mise en œuvre plan de réduction : véhicules hybrides, solaire, zéro papier",
    priority: "P1",
    status: "Planifié",
    progress: 15,
    responsible: "DAF + Responsable RSE",
    deadline: "2027-06-30",
    budget: "52 000 000 FCFA",
    kpi: "-15% émissions vs 2026",
    dependencies: ["esg-001"]
  },
  {
    id: "esg-004",
    pillar: "Bilan Carbone",
    action: "Programme compensation carbone — Projets Gold Standard Afrique (reforestation Sénégal, cuiseurs propres Burkina)",
    priority: "P1",
    status: "Planifié",
    progress: 10,
    responsible: "Responsable RSE",
    deadline: "2027-03-31",
    budget: "18 500 000 FCFA",
    kpi: "50% émissions résiduelles compensées",
    dependencies: ["esg-001"]
  },
  {
    id: "esg-005",
    pillar: "EcoVadis",
    action: "Rédiger et adopter Politique Environnementale + Droits Humains + Achats Responsables",
    priority: "P0",
    status: "En cours",
    progress: 55,
    responsible: "Responsable RSE + DRH",
    deadline: "2026-08-31",
    budget: "5 200 000 FCFA",
    kpi: "3 politiques adoptées COMEX",
    dependencies: []
  },
  {
    id: "esg-006",
    pillar: "EcoVadis",
    action: "Collecter et structurer les preuves documentaires pour les 4 piliers EcoVadis",
    priority: "P0",
    status: "En cours",
    progress: 40,
    responsible: "Responsable RSE",
    deadline: "2026-09-15",
    budget: "4 800 000 FCFA",
    kpi: "10 documents requis prêts",
    dependencies: ["esg-005"]
  },
  {
    id: "esg-007",
    pillar: "EcoVadis",
    action: "Soumettre dossier EcoVadis et obtenir notation",
    priority: "P0",
    status: "Planifié",
    progress: 0,
    responsible: "Responsable RSE",
    deadline: "2026-09-30",
    budget: "Inclus abonnement",
    kpi: "Score ≥ 65 (Silver+), cible Gold 75",
    dependencies: ["esg-006"]
  },
  {
    id: "esg-008",
    pillar: "EcoVadis",
    action: "Déployer plan correctif post-évaluation EcoVadis",
    priority: "P1",
    status: "Planifié",
    progress: 0,
    responsible: "Responsable RSE",
    deadline: "2027-01-31",
    budget: "8 000 000 FCFA",
    kpi: "Gaps EcoVadis résolus ≥ 80%",
    dependencies: ["esg-007"]
  },
  {
    id: "esg-009",
    pillar: "Rapport Durabilité",
    action: "Finaliser chapitres GRI 200-300-400 (Performance Économique, Environnementale, Sociale)",
    priority: "P0",
    status: "En cours",
    progress: 55,
    responsible: "Responsable RSE + DAF + DRH",
    deadline: "2026-11-15",
    budget: "14 500 000 FCFA",
    kpi: "3 chapitres GRI rédigés + revus",
    dependencies: ["esg-001"]
  },
  {
    id: "esg-010",
    pillar: "Rapport Durabilité",
    action: "Rédiger chapitres ISSB IFRS S1 & S2 (risques climatiques, scénarios, métriques)",
    priority: "P0",
    status: "Planifié",
    progress: 20,
    responsible: "Responsable RSE + DAF",
    deadline: "2026-11-30",
    budget: "9 800 000 FCFA",
    kpi: "Chapitre ISSB complet + revu",
    dependencies: ["esg-001"]
  },
  {
    id: "esg-011",
    pillar: "Rapport Durabilité",
    action: "Réaliser analyse de matérialité double (Impact + Financier) avec parties prenantes",
    priority: "P1",
    status: "Planifié",
    progress: 30,
    responsible: "Responsable RSE",
    deadline: "2026-09-30",
    budget: "6 500 000 FCFA",
    kpi: "Matrice matérialité validée COMEX",
    dependencies: []
  },
  {
    id: "esg-012",
    pillar: "Rapport Durabilité",
    action: "Vérification externe du Rapport Durabilité 2026 par Bureau Veritas (niveau modéré)",
    priority: "P1",
    status: "Planifié",
    progress: 0,
    responsible: "Responsable RSE",
    deadline: "2026-12-15",
    budget: "12 000 000 FCFA",
    kpi: "Rapport d'assurance publié",
    dependencies: ["esg-009", "esg-010"]
  },
  {
    id: "esg-013",
    pillar: "Rapport Durabilité",
    action: "Publication officielle du Rapport de Durabilité 2026 — GRI / ISSB / SASB",
    priority: "P0",
    status: "Planifié",
    progress: 5,
    responsible: "Managing Partner + Responsable RSE",
    deadline: "2026-12-31",
    budget: "4 500 000 FCFA",
    kpi: "Rapport publié + diffusé parties prenantes",
    dependencies: ["esg-009", "esg-010", "esg-012"]
  },
  {
    id: "esg-014",
    pillar: "Dashboard ESG",
    action: "Concevoir et déployer le tableau de bord ESG exécutif (16 KPIs, 4 piliers)",
    priority: "P1",
    status: "En cours",
    progress: 70,
    responsible: "Responsable RSE + RSSI",
    deadline: "2026-08-15",
    budget: "7 200 000 FCFA",
    kpi: "Dashboard opérationnel COMEX",
    dependencies: []
  },
  {
    id: "esg-015",
    pillar: "Dashboard ESG",
    action: "Automatiser collecte données ESG mensuelle (connecteurs ERP, RH, compteurs énergie)",
    priority: "P2",
    status: "Planifié",
    progress: 10,
    responsible: "RSSI + DAF",
    deadline: "2026-12-31",
    budget: "12 500 000 FCFA",
    kpi: "80% données collectées automatiquement",
    dependencies: ["esg-014"]
  },
  {
    id: "esg-016",
    pillar: "Dashboard ESG",
    action: "Intégrer dashboard ESG au KOS Executive Command Center",
    priority: "P2",
    status: "Planifié",
    progress: 0,
    responsible: "RSSI + Lead Dev",
    deadline: "2027-03-31",
    budget: "9 000 000 FCFA",
    kpi: "Widget ESG intégré KOS Executive",
    dependencies: ["esg-014", "esg-015"]
  },
  {
    id: "esg-017",
    pillar: "Formation & Sensibilisation",
    action: "Programme formation ESG — 100% collaborateurs (climat, diversité, éthique)",
    priority: "P1",
    status: "En cours",
    progress: 35,
    responsible: "DRH + Responsable RSE",
    deadline: "2026-11-30",
    budget: "8 800 000 FCFA",
    kpi: "100% collaborateurs formés ESG",
    dependencies: []
  },
  {
    id: "esg-018",
    pillar: "Formation & Sensibilisation",
    action: "Lancer programme ambassadeurs ESG (1 par bureau)",
    priority: "P2",
    status: "Planifié",
    progress: 0,
    responsible: "Responsable RSE",
    deadline: "2026-10-31",
    budget: "3 200 000 FCFA",
    kpi: "3 ambassadeurs nommés + actifs",
    dependencies: ["esg-017"]
  },
  {
    id: "esg-019",
    pillar: "Communication ESG",
    action: "Publier page ESG dédiée sur site web KHEPRA EXPERTS",
    priority: "P2",
    status: "Planifié",
    progress: 0,
    responsible: "Responsable Communication",
    deadline: "2026-12-31",
    budget: "2 500 000 FCFA",
    kpi: "Page ESG publiée, trafic ≥ 1000/mois",
    dependencies: ["esg-013"]
  },
  {
    id: "esg-020",
    pillar: "Communication ESG",
    action: "Participer à 2 conférences ESG/Climat Afrique (Africa Climate Summit, Forum ESG UEMOA)",
    priority: "P2",
    status: "Planifié",
    progress: 0,
    responsible: "Managing Partner + Responsable RSE",
    deadline: "2027-06-30",
    budget: "6 500 000 FCFA",
    kpi: "2 participations + 4 leads qualifiés",
    dependencies: []
  }
];

export const esgQuarterlyMilestones = {
  quarters: [
    {
      id: "q3-2026",
      label: "Q3 2026 — Fondations ESG",
      months: "Juillet — Septembre 2026",
      target_score: 55,
      milestones: [
        "Bilan carbone Scope 1-2-3 finalisé + vérifié (31 Août)",
        "3 politiques ESG adoptées COMEX (31 Août)",
        "Dossier EcoVadis soumis (30 Septembre)",
        "Dashboard ESG exécutif V1 déployé (15 Août)",
        "Analyse matérialité double finalisée (30 Septembre)"
      ],
      budget: "48 500 000 FCFA",
      kpis: [
        { name: "Score ESG Global", target: "55/100", weight: 25 },
        { name: "Bilan Carbone Vérifié", target: "OUI", weight: 25 },
        { name: "Politiques ESG Adoptées", target: "3/3", weight: 20 },
        { name: "Dashboard ESG Opérationnel", target: "V1 Live", weight: 15 },
        { name: "Dossier EcoVadis Soumis", target: "OUI", weight: 15 }
      ]
    },
    {
      id: "q4-2026",
      label: "Q4 2026 — Rapport & Notation",
      months: "Octobre — Décembre 2026",
      target_score: 72,
      milestones: [
        "Rapport Durabilité 2026 rédigé (GRI + ISSB) — 30 Novembre",
        "Vérification externe Bureau Veritas — 15 Décembre",
        "Publication Rapport Durabilité 2026 — 31 Décembre",
        "Score EcoVadis reçu — 30 Novembre",
        "Plan correctif EcoVadis déployé — 15 Décembre",
        "100% collaborateurs formés ESG — 30 Novembre",
        "Trajectoire SBTi soumise — 31 Octobre"
      ],
      budget: "68 200 000 FCFA",
      kpis: [
        { name: "Score ESG Global", target: "72/100", weight: 20 },
        { name: "Rapport Durabilité Publié", target: "OUI", weight: 25 },
        { name: "Score EcoVadis", target: "≥ 65 (Silver+)", weight: 20 },
        { name: "Couverture Assurance Externe", target: "100%", weight: 15 },
        { name: "Personnel Formé ESG", target: "100%", weight: 10 },
        { name: "Trajectoire SBTi", target: "Soumise", weight: 10 }
      ]
    },
    {
      id: "q1-2027",
      label: "Q1 2027 — Compétitivité ESG",
      months: "Janvier — Mars 2027",
      target_score: 85,
      milestones: [
        "Programme compensation carbone lancé (31 Janvier)",
        "Contrat électricité verte signé (31 Janvier)",
        "Re-score EcoVadis cible Gold (75+) (28 Février)",
        "Dashboard ESG V2 intégré KOS (31 Mars)",
        "Politique achats responsables 100% déployée (31 Mars)",
        "Page ESG site web publiée (15 Janvier)"
      ],
      budget: "52 400 000 FCFA",
      kpis: [
        { name: "Score ESG Global", target: "85/100", weight: 20 },
        { name: "Notation EcoVadis Gold", target: "≥ 75", weight: 25 },
        { name: "Compensation Carbone", target: "50% émissions", weight: 15 },
        { name: "Énergie Renouvelable", target: "30%", weight: 15 },
        { name: "Dashboard ESG KOS", target: "Intégré", weight: 15 },
        { name: "Achats Responsables", target: "100%", weight: 10 }
      ]
    },
    {
      id: "q2-2027",
      label: "Q2 2027 — Excellence & Leadership",
      months: "Avril — Juin 2027",
      target_score: 92,
      milestones: [
        "Certification ISO 14001 obtenue (15 Mai)",
        "Audit SBTi trajectoire validé (30 Avril)",
        "Réduction émissions -15% vs 2026 atteinte (30 Juin)",
        "Notation EcoVadis Platinum (80+) soumise (30 Juin)",
        "Rapport d'impact ESG — 1 an de données (30 Juin)",
        "2 conférences ESG Afrique participées"
      ],
      budget: "38 500 000 FCFA",
      kpis: [
        { name: "Score ESG Global", target: "92/100", weight: 25 },
        { name: "Réduction Émissions", target: "-15% vs 2026", weight: 25 },
        { name: "ISO 14001", target: "Certifié", weight: 20 },
        { name: "EcoVadis Platinum", target: "≥ 80", weight: 15 },
        { name: "Leadership ESG Afrique", target: "Top 5", weight: 15 }
      ]
    }
  ],
  summary_trajectory: [
    { kpi: "Score Global ESG & Durabilité", initial: 38, q3: 55, q4: 72, q1: 85, q2: 92, cible: 92 },
    { kpi: "Bilan Carbone (tCO₂e)", initial: 428, q3: 428, q4: 400, q1: 380, q2: 365, cible: 350 },
    { kpi: "Score EcoVadis", initial: 24, q3: 55, q4: 68, q1: 75, q2: 80, cible: 80 },
    { kpi: "Complétude Reporting GRI", initial: 35, q3: 65, q4: 95, q1: 98, q2: 100, cible: 100 },
    { kpi: "Alignement ISSB", initial: 15, q3: 45, q4: 90, q1: 95, q2: 98, cible: 98 },
    { kpi: "Énergie Renouvelable", initial: 12, q3: 15, q4: 22, q1: 30, q2: 35, cible: 35 },
    { kpi: "Couverture Assurance Externe ESG", initial: 0, q3: 30, q4: 100, q1: 100, q2: 100, cible: 100 }
  ],
  critical_path: [
    { id: "cp-1", milestone: "Bilan Carbone vérifié", deadline: "2026-08-31", blocks: ["Rapport GRI", "Trajectoire SBTi", "Compensation"] },
    { id: "cp-2", milestone: "Dossier EcoVadis soumis", deadline: "2026-09-30", blocks: ["Notation", "Plan correctif", "Score Gold"] },
    { id: "cp-3", milestone: "Rapport Durabilité publié", deadline: "2026-12-31", blocks: ["Notation EcoVadis Platinum", "Communication ESG", "Leadership"] }
  ]
};

export const esgStats = {
  global_score: 38,
  target_score: 92,
  budget_total: "207 600 000 FCFA",
  timeline: "Q3 2026 — Q2 2027 (12 mois)",
  roi_projete: "> 35× (Score EcoVadis Gold+ → contrats ESG + Attractivité investisseurs)",
  consortium: "PwC · Deloitte · EY · KPMG",
  audit_date: "19 Juin 2026",
  next_review: "19 Septembre 2026",
  carbon_footprint_tco2e: 428.5,
  carbon_target_2027: 350,
  ecovadis_estimated: 42,
  ecovadis_target: 75,
  report_chapters: 8,
  report_completed: 1,
  report_in_progress: 4,
  report_planned: 3,
  dashboard_kpis: 16,
  dashboard_alerts: 4,
  total_actions: 20,
  actions_completed: 0,
  actions_in_progress: 7,
  actions_planned: 13,
  p0_actions: 7,
  p1_actions: 7,
  p2_actions: 6,
  sdg_aligned: 7,
  quarterly_periods: 4
};





