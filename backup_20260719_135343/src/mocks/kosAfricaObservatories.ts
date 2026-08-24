export const observatories = [
  {
    id: "obs-bceao",
    name: "Observatoire BCEAO",
    icon: "ri-bank-line",
    description: "Suivi continu de l'activité réglementaire, prudentielle et monétaire de la Banque Centrale des États de l'Afrique de l'Ouest.",
    stats: { publications: 485, alertsThisMonth: 32, indicators: 28, subscribers: 4200 },
    recentUpdates: [
      { date: "2026-06-18", title: "Instruction BCEAO 008-2026 : Modification classification des créances — Entrée en vigueur immédiate", type: "Instruction", impact: "Critique" },
      { date: "2026-06-15", title: "Ratio de Solvabilité : Nouvelle méthodologie de calcul — Application 01/01/2027", type: "Circulaire", impact: "Élevé" },
      { date: "2026-06-10", title: "Stress Tests Climatiques : Publication du guide méthodologique Pilier 2", type: "Guide", impact: "Élevé" },
      { date: "2026-06-05", title: "Taux Directeur BCEAO : Maintien à 3.50% — Décision du Comité de Politique Monétaire", type: "Décision CPM", impact: "Moyen" }
    ],
    indicators: [
      { name: "Taux Directeur", value: "3.50%", trend: "stable", period: "Juin 2026" },
      { name: "Inflation UEMOA", value: "2.8%", trend: "down", period: "Mai 2026" },
      { name: "Réserves de Change", value: "18.2 Mds USD", trend: "up", period: "Avril 2026" },
      { name: "Crédits à l'Économie", value: "+7.2% YoY", trend: "up", period: "Q1 2026" },
      { name: "Ratio Prudentiel Moyen", value: "14.8%", trend: "stable", period: "Q4 2025" },
      { name: "Taux de Bancarisation", value: "24.5%", trend: "up", period: "2025" }
    ],
    schedule: { frequency: "Quotidien", nextPublication: "2026-06-20", format: "Bulletin + Dashboard + Alerte Email" }
  },
  {
    id: "obs-sfd",
    name: "Observatoire SFD Afrique",
    icon: "ri-hand-heart-line",
    description: "Veille et analyse du secteur de la microfinance en zone UEMOA et CEMAC — Régulation, performance, inclusion financière.",
    stats: { publications: 342, alertsThisMonth: 25, indicators: 22, subscribers: 3800 },
    recentUpdates: [
      { date: "2026-06-18", title: "Catalogue complet des 22 Instructions BCEAO SFD — Mise à jour Juin 2026", type: "Référentiel", impact: "Critique" },
      { date: "2026-06-14", title: "Agrément SFD : 3 nouveaux dossiers déposés au Secrétariat de la CS-SFD", type: "Veille", impact: "Élevé" },
      { date: "2026-06-08", title: "Instruction 010-2010 modifiée : Nouvelles exigences de reporting périodique", type: "Instruction", impact: "Critique" },
      { date: "2026-06-02", title: "Performance SFD UEMOA Q1 2026 : Hausse de 12% de l'encours de crédit", type: "Analyse", impact: "Élevé" }
    ],
    indicators: [
      { name: "SFD Agréés UEMOA", value: "278", trend: "stable", period: "Q1 2026" },
      { name: "Encours Crédit SFD", value: "2 450 Mds FCFA", trend: "up", period: "Q1 2026" },
      { name: "Taux de Pénétration", value: "18.2%", trend: "up", period: "2025" },
      { name: "PAR 30j SFD", value: "5.8%", trend: "down", period: "Q1 2026" },
      { name: "Bénéficiaires SFD", value: "16.8M", trend: "up", period: "2025" },
      { name: "Fonds Propres Moyens", value: "485M FCFA", trend: "up", period: "Q4 2025" }
    ],
    schedule: { frequency: "Hebdomadaire", nextPublication: "2026-06-22", format: "Bulletin + Indicateurs + Alertes Critiques" }
  },
  {
    id: "obs-fintech",
    name: "Observatoire FinTech Afrique",
    icon: "ri-smartphone-line",
    description: "Cartographie et analyse de l'écosystème FinTech en Afrique francophone — Régulation, levées de fonds, innovations.",
    stats: { publications: 156, alertsThisMonth: 19, indicators: 18, subscribers: 2500 },
    recentUpdates: [
      { date: "2026-06-17", title: "Agrément Établissement de Paiement : 2 nouvelles licences délivrées par la BCEAO", type: "Régulation", impact: "Critique" },
      { date: "2026-06-12", title: "Levée de fonds WavePay : 45M USD Series B — Valorisation 280M USD", type: "Marché", impact: "Élevé" },
      { date: "2026-06-06", title: "BACB : Lancement du cadre d'expérimentation réglementaire (Sandbox)", type: "Régulation", impact: "Critique" },
      { date: "2026-06-01", title: "CBDC e-CFA : Phase pilote élargie à 3 nouveaux pays UEMOA", type: "Innovation", impact: "Élevé" }
    ],
    indicators: [
      { name: "FinTechs Actives UEMOA", value: "185", trend: "up", period: "Juin 2026" },
      { name: "Levées de Fonds YTD", value: "320M USD", trend: "up", period: "S1 2026" },
      { name: "Établissements Paiement Agréés", value: "12", trend: "up", period: "Juin 2026" },
      { name: "Mobile Money Actifs", value: "68.5M", trend: "up", period: "Q1 2026" },
      { name: "Transactions Mobile Money", value: "48 200 Mds FCFA", trend: "up", period: "2025" },
      { name: "Sandbox Réglementaires", value: "3", trend: "up", period: "Juin 2026" }
    ],
    schedule: { frequency: "Hebdomadaire", nextPublication: "2026-06-21", format: "Bulletin + Dashboard + Alertes Levées de Fonds" }
  },
  {
    id: "obs-gouvernance",
    name: "Observatoire Gouvernance Afrique",
    icon: "ri-building-2-line",
    description: "Analyse des pratiques de gouvernance — Conseils d'administration, conformité, contrôle interne, transparence.",
    stats: { publications: 210, alertsThisMonth: 15, indicators: 20, subscribers: 3100 },
    recentUpdates: [
      { date: "2026-06-16", title: "Circulaire COBAC : Nouvelles exigences d'indépendance des administrateurs", type: "Circulaire", impact: "Critique" },
      { date: "2026-06-10", title: "OHADA : Projet de révision de l'Acte Uniforme sur les sociétés commerciales", type: "Réforme", impact: "Élevé" },
      { date: "2026-06-04", title: "Gouvernance SFD : Benchmark des 50 premiers SFD UEMOA", type: "Benchmark", impact: "Élevé" },
      { date: "2026-05-28", title: "Indice KHEPRA de Gouvernance 2026 : Banques UEMOA en progression (+8 pts)", type: "Indice", impact: "Moyen" }
    ],
    indicators: [
      { name: "Score Gouvernance Banques", value: "72/100", trend: "up", period: "2026" },
      { name: "Indépendance CA", value: "58%", trend: "up", period: "2026" },
      { name: "Comités Spécialisés", value: "3.2/banque", trend: "up", period: "2026" },
      { name: "Femmes Administrateurs", value: "22%", trend: "up", period: "2026" },
      { name: "Fréquence CA", value: "5.8/an", trend: "stable", period: "2025" },
      { name: "Conformité OHADA CA", value: "78%", trend: "up", period: "2026" }
    ],
    schedule: { frequency: "Bi-hebdomadaire", nextPublication: "2026-06-23", format: "Bulletin + Indice + Benchmark" }
  },
  {
    id: "obs-esg",
    name: "Observatoire ESG Afrique",
    icon: "ri-leaf-line",
    description: "Suivi des évolutions ESG — Régulation, reporting, finance durable, marchés carbone, ISSB, taxonomie verte.",
    stats: { publications: 195, alertsThisMonth: 22, indicators: 16, subscribers: 2800 },
    recentUpdates: [
      { date: "2026-06-18", title: "ISSB : Publication du guide de mise en œuvre pour les marchés émergents", type: "Standard", impact: "Critique" },
      { date: "2026-06-12", title: "Bourse de Paris : Nouvelles exigences ESG pour les obligations souveraines africaines", type: "Régulation", impact: "Élevé" },
      { date: "2026-06-05", title: "Taxonomie Verte UEMOA : Projet de cadre réglementaire — Consultation publique", type: "Régulation", impact: "Critique" },
      { date: "2026-05-30", title: "Crédits Carbone Afrique : Volume transactions +45% YoY", type: "Marché", impact: "Élevé" }
    ],
    indicators: [
      { name: "Banques UEMOA Rapportant ESG", value: "42%", trend: "up", period: "2026" },
      { name: "Émissions CO2 UEMOA", value: "0.8t/capita", trend: "stable", period: "2025" },
      { name: "Fonds ESG Actifs Afrique", value: "8.2 Mds USD", trend: "up", period: "S1 2026" },
      { name: "Crédits Carbone Émis", value: "28M tonnes", trend: "up", period: "2025" },
      { name: "Adoption ISSB", value: "15 pays", trend: "up", period: "Juin 2026" },
      { name: "Green Bonds UEMOA", value: "1.2 Md USD", trend: "up", period: "S1 2026" }
    ],
    schedule: { frequency: "Hebdomadaire", nextPublication: "2026-06-22", format: "Bulletin + Dashboard + Rapport Trimestriel" }
  },
  {
    id: "obs-investissement",
    name: "Observatoire Investissement Afrique",
    icon: "ri-funds-line",
    description: "Intelligence sur les flux d'investissement, due diligence, levées de fonds, M&A, projets financés par les bailleurs.",
    stats: { publications: 168, alertsThisMonth: 18, indicators: 24, subscribers: 3500 },
    recentUpdates: [
      { date: "2026-06-18", title: "IFC : Nouveau guichet de 500M USD dédié aux PME africaines", type: "Financement", impact: "Critique" },
      { date: "2026-06-13", title: "Banque Mondiale IDA21 : Allocation record 93 Md USD — Focus Afrique", type: "Financement", impact: "Critique" },
      { date: "2026-06-07", title: "M&A FinTech UEMOA : 3 opérations annoncées au Q2 2026", type: "Marché", impact: "Élevé" },
      { date: "2026-06-01", title: "Guide Due Diligence Investissement : 10 points clés pour l'Afrique francophone", type: "Guide", impact: "Moyen" }
    ],
    indicators: [
      { name: "IDE Afrique 2025", value: "48 Md USD", trend: "up", period: "2025" },
      { name: "Projets Financés Bailleurs", value: "2 450", trend: "up", period: "S1 2026" },
      { name: "AO/AMI Actifs Zone Franc", value: "58", trend: "up", period: "Juin 2026" },
      { name: "Capital-Risque Afrique", value: "6.5 Md USD", trend: "up", period: "2025" },
      { name: "M&A Afrique Francophone", value: "28 deals", trend: "up", period: "S1 2026" },
      { name: "Taux Rendement Projets", value: "12.8%", trend: "stable", period: "2025" }
    ],
    schedule: { frequency: "Hebdomadaire", nextPublication: "2026-06-21", format: "Bulletin + Dashboard + Alertes Opportunités" }
  }
];

export const observatoryKPIs = {
  totalPublications: 1556,
  totalAlertsThisMonth: 131,
  totalIndicators: 128,
  totalSubscribers: 19900,
  observatoriesActive: 6,
  updatesThisWeek: 24,
  scoreCoverage: { current: 94, target: 98, unit: "%", description: "Couverture des 6 domaines observatoires" },
  scoreFreshness: { current: 96, target: 99, unit: "%", description: "Fraîcheur des données (mise à jour < 7 jours)" },
  scoreAccuracy: { current: 98, target: 100, unit: "%", description: "Exactitude des indicateurs publiés" },
  scoreImpact: { current: 88, target: 95, unit: "/100", description: "Score d'impact — citations, reprises media, influence" }
};

export const weeklySchedule = {
  monday: { observatory: "Observatoire BCEAO", type: "Bulletin Hebdo", time: "08:00 GMT" },
  tuesday: { observatory: "Observatoire FinTech Afrique", type: "Bulletin + Alertes", time: "08:00 GMT" },
  wednesday: { observatory: "Observatoire SFD Afrique", type: "Bulletin + Indicateurs", time: "08:00 GMT" },
  thursday: { observatory: "Observatoire Investissement Afrique", type: "Bulletin + Dashboard", time: "08:00 GMT" },
  friday: { observatory: "Observatoire Gouvernance Afrique", type: "Bulletin + Indice", time: "08:00 GMT" },
  saturday: { observatory: "Observatoire ESG Afrique", type: "Bulletin + Rapport Trimestriel", time: "10:00 GMT" },
  sunday: { observatory: "Synthèse Hebdomadaire", type: "Récapitulatif 6 Observatoires", time: "12:00 GMT" }
};

// Combined export for the hook
export const africaObservatoriesData = {
  observatories,
  observatoryKPIs,
  weeklySchedule
};



