export const legalAIGovernanceHub = {
  title: "KOS Legal Auto-Scan & AI Governance Hub™",
  subtitle: "Validation Juridique Automatisée — ISO 42001 Preparation — AI Compliance Layer",
  legalScore: 85,
  legalTarget: 95,
  aiGovernanceScore: 87,
  aiGovernanceTarget: 96,
  lastUpdated: "2026-06-24T08:00:00Z",
  legalEngine: {
    totalScanned: 16,
    categories: [
      { name: "Promesses Non Démontrables", score: 78, issues: 4, status: "warning", examples: ["« conformité garantie à 100 % » → « accompagnement visant l'atteinte du plus haut niveau de conformité »"] },
      { name: "Affirmations Absolues", score: 82, issues: 3, status: "warning", examples: ["« leader incontesté » → « cabinet de référence en intelligence réglementaire africaine »"] },
      { name: "Garanties Abusives", score: 85, issues: 2, status: "good", examples: ["« zéro risque de sanction » → « réduction significative du risque de non-conformité »"] },
      { name: "Risques Réputationnels", score: 80, issues: 3, status: "warning", examples: ["Publications sensibles non revues par le Legal Partner"] },
      { name: "Conformité RGPD/APDP", score: 88, issues: 1, status: "good", examples: ["Formulaire sans case consentement explicite sur page mineure"] },
      { name: "Propriété Intellectuelle", score: 90, issues: 1, status: "excellent", examples: ["Image non sourcée dans un livre blanc"] },
      { name: "Droit des Affaires OHADA", score: 84, issues: 2, status: "good", examples: ["Clause de juridiction non précisée sur 2 contrats types"] },
      { name: "Droit Bancaire & Financier", score: 92, issues: 0, status: "excellent", examples: [] }
    ],
    workflow: [
      { step: 1, name: "Soumission Contenu", action: "Tout contenu (article, page, livrable) est soumis au Legal Scanner", status: "active" },
      { step: 2, name: "Scan Automatique 8 Catégories", action: "Analyse automatique des 8 catégories de risques juridiques", status: "active" },
      { step: 3, name: "Scoring Risque", action: "Score /100 attribué par catégorie", status: "active" },
      { step: 4, name: "Décision Automatique", action: "≥90 : Approuvé | 75-89 : Revue Senior | 60-74 : Revue Legal Partner | <60 : Bloqué", status: "active" },
      { step: 5, name: "Traçabilité Supabase", action: "Enregistrement dans legal_validation pour audit trail", status: "planned" }
    ],
    corrections: [
      { before: "« Nous garantissons l'obtention de l'agrément »", after: "« Nous vous accompagnons dans la préparation de votre dossier d'agrément »", category: "Garanties Abusives", date: "2026-06-22" },
      { before: "« Le meilleur cabinet de la zone UEMOA »", after: "« Un cabinet de référence en intelligence réglementaire UEMOA »", category: "Affirmations Absolues", date: "2026-06-20" },
      { before: "« 100% de taux de succès aux inspections »", after: "« 94% des clients accompagnés obtiennent une notation satisfaisante »", category: "Promesses Non Démontrables", date: "2026-06-18" }
    ]
  },
  aiGovernance: {
    iso42001Progress: 40,
    iso42001Milestones: [
      { milestone: "Cartographie des exigences ISO 42001", progress: 100, status: "completed", date: "2026-06-15" },
      { milestone: "Gap Analysis ISO 42001 vs KOS existant", progress: 85, status: "in_progress", date: "2026-06-30" },
      { milestone: "Rédaction manuel de gouvernance IA", progress: 45, status: "in_progress", date: "2026-07-15" },
      { milestone: "Documentation procédures contrôle IA", progress: 20, status: "in_progress", date: "2026-08-01" },
      { milestone: "Audit à blanc ISO 42001", progress: 0, status: "planned", date: "2026-08-30" },
      { milestone: "Soumission certification", progress: 0, status: "planned", date: "2026-09-30" }
    ],
    agents: [
      { name: "KOS Automaton Engine", confidence: 97, verifiability: 97, compliance: 95, global: 97, status: "excellent" },
      { name: "KOS Quality Controller", confidence: 93, verifiability: 93, compliance: 92, global: 93, status: "excellent" },
      { name: "KOS CEO Advisor", confidence: 90, verifiability: 88, compliance: 90, global: 90, status: "good" },
      { name: "KOS Board Advisor", confidence: 88, verifiability: 85, compliance: 88, global: 88, status: "good" },
      { name: "KOS Due Diligence Engine", confidence: 88, verifiability: 88, compliance: 86, global: 88, status: "good" },
      { name: "KOS Lead Scoring", confidence: 85, verifiability: 82, compliance: 85, global: 85, status: "good" },
      { name: "KOS Tender Intelligence", confidence: 82, verifiability: 80, compliance: 82, global: 82, status: "warning" },
      { name: "KOS Digital Twin", confidence: 71, verifiability: 70, compliance: 68, global: 71, status: "critical" }
    ],
    rules: [
      { id: "R01", rule: "Invention de sources", incidents: 0, status: "compliant" },
      { id: "R02", rule: "Hallucinations", incidents: 6, resolved: 6, status: "monitored" },
      { id: "R03", rule: "Citations fictives", incidents: 0, status: "compliant" },
      { id: "R04", rule: "Extrapolations non justifiées", incidents: 4, resolved: 4, status: "monitored" },
      { id: "R05", rule: "Biais algorithmique", incidents: 0, status: "compliant" },
      { id: "R06", rule: "Non-respect des seuils de confiance", incidents: 2, resolved: 2, status: "monitored" }
    ],
    auditTrail: [
      { agent: "Quality Controller", action: "Rejet contenu — score 72/100", date: "2026-06-23", impact: "Article blog bloqué, révision demandée" },
      { agent: "CEO Advisor", action: "Synthèse exécutive hebdomadaire", date: "2026-06-23", impact: "Rapport COMEX généré" },
      { agent: "AI Ethics Board", action: "Revue éthique mensuelle — 8 agents audités", date: "2026-06-20", impact: "1 réserve mineure sur Digital Twin" },
      { agent: "Compliance Engine", action: "Alerte — nouveau texte BCEAO détecté", date: "2026-06-19", impact: "Mise à jour base RAG déclenchée" },
      { agent: "Hallucination Detection", action: "Détection — 1 réponse non sourcée", date: "2026-06-18", impact: "Source vérifiée, correction appliquée" }
    ]
  }
};