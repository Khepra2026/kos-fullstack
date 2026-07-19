export const qualityInnovationHub = {
  title: "KOS Quality Innovation & Peer Review™",
  subtitle: "Moteur d'Innovation Méthodologique — Workflow Peer Review — Excellence Big Four",
  globalScore: 83,
  targetScore: 95,
  lastUpdated: "2026-06-24T08:00:00Z",
  scoringDimensions: [
    { name: "Structure & Méthodologie", weight: 20, current: 88, target: 95, trend: "up", actions: ["Template standardisé 7 sections", "Checklist validation structure"] },
    { name: "Sources & Références", weight: 15, current: 92, target: 98, trend: "up", actions: ["Bibliographie automatique", "Vérification croisée RAG"] },
    { name: "Conformité Réglementaire", weight: 20, current: 85, target: 97, trend: "up", actions: ["Score conformité par livrable", "Alertes textes obsolètes"] },
    { name: "Clarté & Lisibilité", weight: 15, current: 82, target: 93, trend: "up", actions: ["Executive Summary obligatoire", "Indice Flesch automatisé"] },
    { name: "Valeur Client", weight: 15, current: 80, target: 92, trend: "up", actions: ["Recommandations SMART", "ROI estimé par livrable"] },
    { name: "Innovation & Différenciation", weight: 15, current: 75, target: 90, trend: "up", actions: ["Workshop innovation trimestriel", "Veille approches Big Four"] }
  ],
  peerReviewWorkflow: {
    steps: [
      { order: 1, name: "Dépôt Livrable", actor: "Agent IA métier", action: "Soumission automatique au pipeline qualité", sla: "Immédiat" },
      { order: 2, name: "Auto-Scoring 6D", actor: "Quality Controller (KOS Automaton)", action: "Scoring automatique 6 dimensions", sla: "< 5 minutes" },
      { order: 3, name: "Décision", actor: "Quality Controller", action: "≥85 : Approuvé | 70-84 : Peer Review | 55-69 : Quality Review | <55 : Bloqué", sla: "Immédiat" },
      { order: 4, name: "Peer Review", actor: "Agent IA senior (même BU)", action: "Revue croisée, annotations, suggestions", sla: "< 24h" },
      { order: 5, name: "Quality Review", actor: "Quality Excellence Office", action: "Revue approfondie, corrections obligatoires", sla: "< 48h" },
      { order: 6, name: "Re-scoring", actor: "Quality Controller", action: "Nouveau scoring après corrections", sla: "< 5 minutes" },
      { order: 7, name: "Validation Finale", actor: "Partner Governance", action: "Approbation définitive avant envoi client", sla: "< 4h" }
    ],
    stats: {
      totalReviews: 47,
      approvedFirstPass: 28,
      peerReviewRequired: 12,
      qualityReviewRequired: 5,
      blocked: 2,
      avgReviewTime: "18h",
      improvementRate: "85% (score + après peer review)"
    }
  },
  innovationProgram: {
    workshops: [
      { id: "W01", theme: "Méthodologies d'audit augmentées par IA", date: "2026-07-15", participants: "Audit AI, Quality Controller, Partner Audit", deliverables: "3 nouvelles approches méthodologiques", status: "planned" },
      { id: "W02", theme: "Formats de livrables nouvelle génération", date: "2026-08-01", participants: "Content AI, Design AI, Innovation Lab", deliverables: "5 templates interactifs", status: "planned" },
      { id: "W03", theme: "Services à forte valeur ajoutée 2027", date: "2026-09-15", participants: "Strategy AI, BD AI, CEO Copilot", deliverables: "Roadmap innovation services", status: "planned" }
    ],
    innovations: [
      { name: "RAG Réglementaire Temps Réel", description: "Analyse réglementaire contextuelle dans les livrables — citations automatiques sourcées", status: "deployed", adoption: "8 agents" },
      { name: "Executive Summary Automatisé", description: "Génération automatique du résumé exécutif pour chaque livrable — gain 2h/livrable", status: "deployed", adoption: "12 agents" },
      { name: "Scoring Qualité Prédictif", description: "Prédiction du score qualité avant finalisation — alerte précoce des points faibles", status: "testing", adoption: "3 agents beta" },
      { name: "Dashboard Impact Client", description: "Mesure ROI par mission — indicateurs tangibles pour le board client", status: "development", adoption: "0 agents" },
      { name: "Livrables Interactifs (Notion-like)", description: "Livrables navigables avec visualisations interactives au lieu de PDF statiques", status: "research", adoption: "0 agents" }
    ]
  },
  qualityKPIs: {
    monthly: [
      { month: "Janvier", score: 78, peerReviews: 8, blocked: 3 },
      { month: "Février", score: 79, peerReviews: 7, blocked: 2 },
      { month: "Mars", score: 80, peerReviews: 9, blocked: 2 },
      { month: "Avril", score: 81, peerReviews: 6, blocked: 1 },
      { month: "Mai", score: 82, peerReviews: 5, blocked: 1 },
      { month: "Juin", score: 83, peerReviews: 5, blocked: 2 }
    ],
    targets: {
      scoreGlobal: { current: 83, target90: 88, target180: 95 },
      firstPassRate: { current: "60%", target: "80%" },
      peerReviewTime: { current: "18h", target: "8h" },
      blockedRate: { current: "4%", target: "0%" }
    }
  }
};



