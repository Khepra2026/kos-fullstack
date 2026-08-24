export const knowledgeMonetizationAssets = [
  {
    id: "km-001",
    source_mission: "Pré-Inspection BCEAO — Banque Commerciale UEMOA (2025)",
    source_study: "Guide Pratique Pré-Inspection BCEAO 2026",
    derived_assets: ["Livre Blanc", "Webinaire", "Formation Certifiante", "Lead Magnet — Checklist 127 points"],
    conversion_pipeline: ["Mission → Guide → Article → Livre Blanc → Webinaire → Lead Magnet"],
    estimated_value_fcfa: 85000000,
    monetization_status: "active",
    target_channels: ["LinkedIn", "Site Web", "Emailing Ciblé", "Partenariats IFB"],
    commercial_potential: 9.2,
    created_at: "2026-06-12T08:00:00Z"
  },
  {
    id: "km-002",
    source_mission: "Documentation Prix de Transfert — Groupe Agroalimentaire (2024)",
    source_study: "BEPS Action 13 appliquée en Afrique",
    derived_assets: ["Article Expert", "Étude de Cas", "Mini-Rapport Due Diligence"],
    conversion_pipeline: ["Mission → Étude → Article → Étude de Cas → Lead Magnet"],
    estimated_value_fcfa: 45000000,
    monetization_status: "in_progress",
    target_channels: ["LinkedIn", "Blog KHEPRA"],
    commercial_potential: 7.8,
    created_at: "2026-06-10T14:00:00Z"
  },
  {
    id: "km-003",
    source_mission: "Cartographie des Risques — Holding Familiale OHADA (2025)",
    source_study: "Enterprise Risk Management — Framework Afrique",
    derived_assets: ["Position Paper", "Template Audit Gouvernance", "Simulation Risque Réglementaire"],
    conversion_pipeline: ["Mission → Position Paper → Template → Simulation → Diagnostic"],
    estimated_value_fcfa: 62000000,
    monetization_status: "active",
    target_channels: ["Think Tank", "Site Web", "LinkedIn"],
    commercial_potential: 8.5,
    created_at: "2026-06-09T16:00:00Z"
  }
];

export const serviceInnovations = [
  {
    id: "si-001",
    innovation_name: "KOS RegTech Conformity Scanner™",
    source_inspiration: ["Missions BCEAO/COBAC répétitives", "Demande clients PME", "Veille RegTech Afrique"],
    value_proposition: "Scanner automatique de conformité réglementaire pour SFD et Établissements de Paiement — 48h au lieu de 3 semaines",
    business_model: "Abonnement SaaS 2 500 000 FCFA/an + Setup 5 000 000 FCFA",
    target_market: "150+ SFD UEMOA, 80+ Établissements de Paiement",
    competitive_advantage: "Seul outil couvrant simultanément BCEAO + COBAC + GAFI + OHADA",
    commercial_strategy: "Lead Magnet → Diagnostic Flash → Démo → Abonnement",
    feasibility_score: 8.7,
    development_status: "prototype",
    created_at: "2026-06-13T07:00:00Z"
  },
  {
    id: "si-002",
    innovation_name: "Board Excellence Program™",
    source_inspiration: ["Missions Conseil d'Administration", "Benchmark IFC Governance", "Demande investisseurs"],
    value_proposition: "Programme complet de mise à niveau gouvernance pour Conseils d'Administration africains — certification KHEPRA",
    business_model: "Forfait mission 35 000 000 FCFA / entreprise",
    target_market: "Banques UEMOA/CEMAC, Groupes Familiaux > 10 Mds FCFA CA",
    competitive_advantage: "Double compétence régulation bancaire + gouvernance familiale africaine",
    commercial_strategy: "Board Report → Diagnostic Gouvernance → Proposition → Mission",
    feasibility_score: 9.1,
    development_status: "pilot",
    created_at: "2026-06-11T10:00:00Z"
  },
  {
    id: "si-003",
    innovation_name: "ESG Africa Compass™",
    source_inspiration: ["CSRD européenne", "IFRS Sustainability S1/S2", "Demande bailleurs internationaux"],
    value_proposition: "Diagnostic ESG + Feuille de route adaptée au contexte PME africaine — aligné IFC, GRI, ISSB",
    business_model: "Diagnostic 8 000 000 FCFA + Accompagnement 25 000 000 FCFA/an",
    target_market: "PME exportatrices, Groupes sous contrôle investisseurs internationaux",
    competitive_advantage: "Contextualisation africaine des standards ESG internationaux",
    commercial_strategy: "Contenu Think Tank → Diagnostic ESG → Accompagnement",
    feasibility_score: 7.5,
    development_status: "ideation",
    created_at: "2026-06-08T12:00:00Z"
  }
];

export const trainingModules = [
  {
    id: "tm-001",
    module_title: "Préparer une Inspection BCEAO — Programme Certifiant",
    module_type: "Certification",
    target_audience: ["Directeurs Conformité", "Auditeurs Internes", "Secrétaires Généraux Banques"],
    certification_available: true,
    duration_hours: 24,
    difficulty_level: "Avancé",
    learning_path: "Fondamentaux → Cadre réglementaire → Outils → Cas pratique → Examen",
    assessment_method: ["QCM 100 questions", "Étude de cas pratique", "Soutenance orale"],
    enrollment_count: 47,
    completion_rate: 88.5,
    created_at: "2026-05-15T08:00:00Z"
  },
  {
    id: "tm-002",
    module_title: "Prix de Transfert en Afrique — BEPS Action 13",
    module_type: "Formation Continue",
    target_audience: ["DAF", "Fiscalistes", "Commissaires aux Comptes"],
    certification_available: false,
    duration_hours: 16,
    difficulty_level: "Intermédiaire",
    learning_path: "Principes OCDE → Cadre UEMOA/CEMAC → Documentation → Contrôle fiscal",
    assessment_method: ["QCM 60 questions", "Exercice de benchmark"],
    enrollment_count: 32,
    completion_rate: 82.0,
    created_at: "2026-04-20T10:00:00Z"
  },
  {
    id: "tm-003",
    module_title: "Gouvernance des Groupes Familiaux — Parcours Administrateur",
    module_type: "Parcours Métier",
    target_audience: ["Administrateurs", "DG Groupes Familiaux", "Family Officers"],
    certification_available: true,
    duration_hours: 40,
    difficulty_level: "Avancé",
    learning_path: "Gouvernance → Risques → Conformité → Stratégie → Conseil",
    assessment_method: ["QCM 150 questions", "Rédaction charte gouvernance", "Simulation CA"],
    enrollment_count: 23,
    completion_rate: 74.0,
    created_at: "2026-03-10T09:00:00Z"
  }
];





