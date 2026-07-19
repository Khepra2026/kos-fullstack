export const riskKriHeatmap = {
  title: "KOS Risk KRIs™ — Key Risk Indicators Dashboard",
  subtitle: "Cartographie des Risques, Heatmap Interactive, Indicateurs Clés de Risque & Plans d'Atténuation",
  globalScore: 90,
  targetScore: 96,
  lastUpdated: "2026-06-24T07:30:00Z",
  kris: [
    { id: "KRI-01", name: "Taux de Conformité Réglementaire", category: "Réglementaire", current: 91, threshold: 85, target: 97, trend: "up", status: "green", owner: "Compliance AI" },
    { id: "KRI-02", name: "Délai Moyen de Remédiation (écarts)", category: "Réglementaire", current: 48, threshold: 72, target: 24, unit: "heures", trend: "down", status: "yellow", owner: "Regulatory Intelligence" },
    { id: "KRI-03", name: "Taux de Couverture des Textes Réglementaires", category: "Réglementaire", current: 97.5, threshold: 90, target: 100, trend: "up", status: "green", owner: "Compliance AI" },
    { id: "KRI-04", name: "Nombre d'Hallucinations IA Détectées/Mois", category: "IA", current: 0.5, threshold: 2, target: 0, trend: "down", status: "green", owner: "AI Ethics Board" },
    { id: "KRI-05", name: "Score de Confiance des Agents IA", category: "IA", current: 88, threshold: 80, target: 95, trend: "up", status: "yellow", owner: "AI Governance Council" },
    { id: "KRI-06", name: "Taux de Validation Qualité au Premier Coup", category: "Qualité", current: 82, threshold: 75, target: 95, trend: "up", status: "yellow", owner: "Quality Controller" },
    { id: "KRI-07", name: "Nombre d'Incidents de Sécurité Critiques", category: "Cybersécurité", current: 0, threshold: 1, target: 0, trend: "stable", status: "green", owner: "Security Command" },
    { id: "KRI-08", name: "Score Core Web Vitals Global", category: "Opérationnel", current: 87, threshold: 80, target: 98, trend: "up", status: "yellow", owner: "Performance Monitor" },
    { id: "KRI-09", name: "Taux de Disponibilité de la Plateforme", category: "Opérationnel", current: 99.95, threshold: 99.5, target: 99.99, unit: "%", trend: "stable", status: "green", owner: "SysOps Health" },
    { id: "KRI-10", name: "Délai Moyen de Réponse aux Incidents", category: "Opérationnel", current: 18, threshold: 60, target: 10, unit: "minutes", trend: "down", status: "green", owner: "Security Command" },
    { id: "KRI-11", name: "Score NPS Clients", category: "Réputationnel", current: 72, threshold: 50, target: 85, trend: "up", status: "yellow", owner: "Client Success AI" },
    { id: "KRI-12", name: "Taux de Closing Commercial", category: "Stratégique", current: 35, threshold: 25, target: 50, trend: "up", status: "yellow", owner: "Business Dev AI" },
    { id: "KRI-13", name: "Part de Marché Cible (UEMOA)", category: "Stratégique", current: 18, threshold: 10, target: 30, trend: "up", status: "yellow", owner: "Strategy AI" },
    { id: "KRI-14", name: "Taux de Rotation des Talents", category: "Stratégique", current: 8, threshold: 15, target: 5, trend: "down", status: "green", owner: "Managing Partner" },
    { id: "KRI-15", name: "Ratio de Liquidité", category: "Financier", current: 2.8, threshold: 1.5, target: 3.0, trend: "stable", status: "green", owner: "CFO Partner" },
    { id: "KRI-16", name: "Taux d'Engagement LinkedIn", category: "Réputationnel", current: 4.8, threshold: 2.0, target: 7.0, trend: "up", status: "green", owner: "Social Media Director" },
    { id: "KRI-17", name: "Nombre de Backlinks Qualifiés", category: "SEO", current: 328, threshold: 200, target: 5000, trend: "up", status: "red", owner: "SEO Autopilot" },
    { id: "KRI-18", name: "Score AEO (6 moteurs IA)", category: "SEO", current: 78, threshold: 60, target: 95, trend: "up", status: "red", owner: "AEO Director" },
    { id: "KRI-19", name: "Taux de Conformité LBC/FT", category: "Conformité", current: 98, threshold: 90, target: 100, trend: "up", status: "green", owner: "AML AI" },
    { id: "KRI-20", name: "Couverture Assurance Cyber", category: "Financier", current: 5, threshold: 2, target: 10, unit: "M EUR", trend: "stable", status: "green", owner: "Risk & Diligence" }
  ],
  riskCategories: [
    { name: "Risques Réglementaires", count: 8, score: 85, severity: "medium", topRisk: "Non-conformité CIPRES — 2 textes non vérifiés", status: "monitored" },
    { name: "Risques Opérationnels", count: 6, score: 82, severity: "medium", topRisk: "CWV Poor — 9 pages sous le seuil", status: "improving" },
    { name: "Risques Réputationnels", count: 4, score: 78, severity: "high", topRisk: "Score AEO 68/100 sur Claude — citations insuffisantes", status: "critical" },
    { name: "Risques IA", count: 5, score: 80, severity: "high", topRisk: "Digital Twin — score confiance 74/100 sous seuil 85", status: "critical" },
    { name: "Risques Cybersécurité", count: 7, score: 88, severity: "low", topRisk: "OWASP Top 10 — 2 vulnérabilités mineures", status: "monitored" },
    { name: "Risques Financiers", count: 5, score: 84, severity: "medium", topRisk: "Dépendance OpenAI — migration Automaton en cours", status: "improving" },
    { name: "Risques Stratégiques", count: 3, score: 75, severity: "high", topRisk: "Expansion Afrique du Nord/East — présence quasi nulle", status: "critical" },
    { name: "Risques de Conformité", count: 6, score: 82, severity: "medium", topRisk: "Documentation ISO 42001 non finalisée", status: "improving" }
  ],
  heatmapData: {
    matrix: [
      { x: "Réglementaire", y: "Probabilité", value: 35, risk: "CIPRES non vérifié" },
      { x: "Réglementaire", y: "Impact", value: 55, risk: "Sanction BCEAO potentielle" },
      { x: "Opérationnel", y: "Probabilité", value: 45, risk: "CWV dégradation" },
      { x: "Opérationnel", y: "Impact", value: 30, risk: "Perte trafic SEO" },
      { x: "Réputationnel", y: "Probabilité", value: 25, risk: "Citation négative média" },
      { x: "Réputationnel", y: "Impact", value: 80, risk: "Perte crédibilité institutionnelle" },
      { x: "IA", y: "Probabilité", value: 40, risk: "Hallucination publication" },
      { x: "IA", y: "Impact", value: 70, risk: "Erreur réglementaire diffusée" },
      { x: "Cybersécurité", y: "Probabilité", value: 15, risk: "Brèche de données" },
      { x: "Cybersécurité", y: "Impact", value: 90, risk: "Violation données clients" },
      { x: "Financier", y: "Probabilité", value: 30, risk: "Impayé client majeur" },
      { x: "Financier", y: "Impact", value: 60, risk: "Trou de trésorerie" },
      { x: "Stratégique", y: "Probabilité", value: 50, risk: "Perte part de marché" },
      { x: "Stratégique", y: "Impact", value: 85, risk: "Érosion positionnement UEMOA" },
      { x: "Conformité", y: "Probabilité", value: 20, risk: "Non-conformité ISO 42001" },
      { x: "Conformité", y: "Impact", value: 45, risk: "Perte certification" }
    ]
  },
  mitigationPlans: [
    {
      id: "PLAN-01",
      risk: "Score AEO insuffisant sur Claude/Copilot",
      category: "Réputationnel",
      severity: "critical",
      actions: [
        "Enrichissement llms.txt avec contenu structuré pour Claude",
        "Optimisation Schema.org ScholarlyArticle sur Think Tank",
        "Génération contenu format Question/Réponse pour Copilot",
        "Soumission régulière aux APIs Claude Context Retrieval"
      ],
      deadline: "J+21",
      owner: "AEO Director",
      progress: 35,
      budget: "2 jours-agent LLMO"
    },
    {
      id: "PLAN-02",
      risk: "Digital Twin IA — score confiance 74/100",
      category: "IA",
      severity: "critical",
      actions: [
        "Audit complet du modèle de jumeau numérique",
        "Recalibrage des paramètres de confiance",
        "Ajout de couches de validation croisée",
        "Tests sur 50 scénarios de référence"
      ],
      deadline: "J+14",
      owner: "AI Governance Council",
      progress: 60,
      budget: "5 jours-agent LLMO"
    },
    {
      id: "PLAN-03",
      risk: "Présence quasi nulle en Afrique du Nord et de l'Est",
      category: "Stratégique",
      severity: "critical",
      actions: [
        "Étude de marché — 6 pays cibles (Maroc, Tunisie, Kenya, Rwanda, Éthiopie, Maurice)",
        "Partenariats locaux avec cabinets d'avocats",
        "Pages GEO localisées en arabe et anglais",
        "Accréditation bailleurs régionaux (BADEA, BAD Est)"
      ],
      deadline: "J+90",
      owner: "Strategy AI + Institutional Visibility",
      progress: 15,
      budget: "15 jours-agent Business Dev"
    },
    {
      id: "PLAN-04",
      risk: "Documentation ISO 42001 non finalisée",
      category: "Conformité",
      severity: "high",
      actions: [
        "Cartographie des exigences ISO 42001 vs existant KOS",
        "Rédaction du manuel de gouvernance IA",
        "Documentation des procédures de contrôle IA",
        "Audit à blanc ISO 42001",
        "Soumission certification"
      ],
      deadline: "J+90",
      owner: "AI Governance Council",
      progress: 40,
      budget: "20 jours-agent Compliance"
    },
    {
      id: "PLAN-05",
      risk: "9 pages CWV Poor — impact SEO et UX",
      category: "Opérationnel",
      severity: "high",
      actions: [
        "Optimisation images (WebP, lazy loading)",
        "Minification CSS/JS critique",
        "Mise en cache des polices Google Fonts",
        "Différé des scripts non-critiques",
        "Re-test Lighthouse après corrections"
      ],
      deadline: "J+7",
      owner: "Performance Monitor + WebOps",
      progress: 72,
      budget: "3 jours-agent WebOps"
    },
    {
      id: "PLAN-06",
      risk: "Cannibalisation SEO — 4 paires détectées",
      category: "SEO",
      severity: "medium",
      actions: [
        "Analyse sémantique des paires cannibales",
        "Différenciation par mot-clé principal",
        "Mise en place canonical quand nécessaire",
        "Restructuration liens internes"
      ],
      deadline: "J+30",
      owner: "SEO Autopilot",
      progress: 25,
      budget: "2 jours-agent SEO"
    }
  ],
  kriHistory: {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [
      { name: "Conformité Réglementaire", data: [85, 87, 88, 89, 90, 91], color: "#22c55e" },
      { name: "Qualité", data: [78, 80, 81, 82, 83, 83], color: "#f59e0b" },
      { name: "IA Confiance", data: [82, 84, 85, 86, 87, 88], color: "#3b82f6" },
      { name: "SEO/AEO", data: [72, 74, 76, 78, 80, 82], color: "#8b5cf6" },
      { name: "Sécurité", data: [90, 91, 92, 93, 94, 95], color: "#06b6d4" }
    ]
  }
};



