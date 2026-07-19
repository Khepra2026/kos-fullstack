export const tenderOpportunities = [
  {
    id: "to-001",
    tender_title: "Mission d'Audit du Dispositif LBC/FT — Banque Ouest-Africaine de Développement",
    source_organization: "BOAD",
    tender_type: "Appel d'Offres International",
    submission_deadline: "2026-07-15T23:59:00Z",
    estimated_budget_fcfa: 95000000,
    relevance_score: 9.4,
    qualification_status: "qualified",
    recommendation: "RÉPONDRE EN PRIORITÉ — Alignement parfait BU1, références BCEAO existantes, consortium possible avec cabinet local",
    required_documents: ["Proposition technique", "Proposition financière", "Références BCEAO/COBAC", "CV experts clés"],
    competitive_analysis: "Concurrence modérée — 3 cabinets attendus, KHEPRA seul spécialiste régulation",
    created_at: "2026-06-13T06:00:00Z"
  },
  {
    id: "to-002",
    tender_title: "Assistance Technique — Documentation Prix de Transfert BEPS — Groupe Télécoms CEMAC",
    source_organization: "Groupe Privé — Appel d'Offres Restreint",
    tender_type: "AO Restreint",
    submission_deadline: "2026-07-30T17:00:00Z",
    estimated_budget_fcfa: 120000000,
    relevance_score: 8.7,
    qualification_status: "qualified",
    recommendation: "RÉPONDRE — BU2 ciblée, budget attractif, relation existante via réseau KHEPRA",
    required_documents: ["Proposition technique", "Méthodologie BEPS", "CV expert prix de transfert"],
    competitive_analysis: "Concurrence élevée — Big Four présents",
    created_at: "2026-06-12T10:00:00Z"
  },
  {
    id: "to-003",
    tender_title: "Élaboration d'une Politique Nationale d'Inclusion Financière — Ministère des Finances",
    source_organization: "Gouvernement — UEMOA",
    tender_type: "Marché Public",
    submission_deadline: "2026-08-05T12:00:00Z",
    estimated_budget_fcfa: 65000000,
    relevance_score: 7.2,
    qualification_status: "evaluation",
    recommendation: "ÉVALUER — Intéressant pour BU4 Think Tank, mais hors cœur de métier direct. Consortium avec partenaire académique recommandé.",
    required_documents: ["Note méthodologique", "Calendrier", "Équipe projet"],
    competitive_analysis: "Forte concurrence — cabinets internationaux + locaux",
    created_at: "2026-06-11T14:00:00Z"
  }
];

export const competitiveLandscape = [
  {
    id: "ci-001",
    competitor_name: "Deloitte Afrique",
    competitor_type: "Big Four",
    market_segment: "Régulation financière UEMOA/CEMAC",
    strengths: ["Marque mondiale", "Réseau panafricain", "Équipe dédiée Financial Services"],
    weaknesses: ["Tarifs élevés", "Approche standardisée non contextualisée", "Turnover consultants"],
    service_comparison: { khepra_edge: "Expertise réglementaire locale 22 ans", deloitte_edge: "Reconnaissance internationale" },
    differentiation_opportunities: ["Positionner KHEPRA comme l'alternative experte locale aux Big Four", "Mettre en avant la continuité des équipes"],
    threat_level: "Élevé",
    last_updated: "2026-06-13T08:00:00Z"
  },
  {
    id: "ci-002",
    competitor_name: "Mazars Afrique",
    competitor_type: "Cabinet International",
    market_segment: "Audit et Conseil PME",
    strengths: ["Présence panafricaine solide", "Expertise PME", "Prix compétitifs"],
    weaknesses: ["Moins spécialisé régulation bancaire", "Image moins premium que Big Four"],
    service_comparison: { khepra_edge: "Spécialisation régulation + prix de transfert", mazars_edge: "Couverture géographique" },
    differentiation_opportunities: ["Consortium KHEPRA-Mazars sur missions complexes"],
    threat_level: "Modéré",
    last_updated: "2026-06-10T14:00:00Z"
  },
  {
    id: "ci-003",
    competitor_name: "Cabinets locaux UEMOA",
    competitor_type: "Cabinet National",
    market_segment: "Conformité BCEAO/COBAC",
    strengths: ["Proximité régulateurs", "Tarifs très compétitifs", "Connaissance terrain"],
    weaknesses: ["Méthodologie non standardisée", "Pas de capacité Think Tank", "Visibilité internationale limitée"],
    service_comparison: { khepra_edge: "Méthodologie Big Four + connaissance locale", local_edge: "Prix et proximité" },
    differentiation_opportunities: ["Positionner KHEPRA comme le partenaire pour missions complexes nécessitant standard international"],
    threat_level: "Faible à Modéré",
    last_updated: "2026-06-09T10:00:00Z"
  }
];

export const executiveCommunications = [
  {
    id: "ec-001",
    communication_type: "Communiqué de Presse",
    title: "KHEPRA EXPERTS obtient l'agrément pour la formation certifiante des administrateurs indépendants UEMOA",
    target_audience: "Presse économique, Banques, Régulateurs",
    key_messages: ["Premier cabinet africain certifié pour cette formation", "Aligné Circulaire BCEAO 01/2017", "Session inaugurale Septembre 2026"],
    tone_profile: "Institutionnel",
    delivery_channel: ["Site Web", "LinkedIn", "Presse Économique", "Newsletter"],
    approval_status: "approved",
    scheduled_date: "2026-06-20T08:00:00Z",
    created_at: "2026-06-12T15:00:00Z"
  },
  {
    id: "ec-002",
    communication_type: "Note Exécutive",
    title: "Impact de la nouvelle circulaire BCEAO sur les SFD — Anticiper les changements 2027",
    target_audience: "DG SFD, Fédérations professionnelles",
    key_messages: ["Analyse des 12 changements majeurs", "Calendrier de mise en conformité", "Impact financier estimé par typologie SFD"],
    tone_profile: "Expert",
    delivery_channel: ["Blog KHEPRA", "LinkedIn Article", "Emailing Ciblé"],
    approval_status: "draft",
    scheduled_date: "2026-06-25T08:00:00Z",
    created_at: "2026-06-13T09:00:00Z"
  },
  {
    id: "ec-003",
    communication_type: "Prise de Parole",
    title: "Intervention du Managing Partner — Conférence Inclusion Financière UEMOA 2026",
    target_audience: "Banquiers centraux, DG banques, Ministres",
    key_messages: ["22 ans d'expérience régulation financière africaine", "Vision prospective sur la convergence UEMOA-CEMAC", "Proposition de création d'un comité consultatif permanent"],
    tone_profile: "Leadership Éclairé",
    delivery_channel: ["Événement physique", "YouTube", "LinkedIn Live"],
    approval_status: "approved",
    scheduled_date: "2026-07-10T14:00:00Z",
    created_at: "2026-06-10T18:00:00Z"
  }
];

export const strategicPlans = [
  {
    id: "sp-001",
    plan_title: "Plan Stratégique KHEPRA EXPERTS 2026-2029",
    horizon: "3 ans",
    vision_statement: "Devenir le cabinet de référence en régulation financière, prix de transfert et gouvernance pour l'Afrique francophone, reconnu par les régulateurs et les investisseurs internationaux.",
    strategic_objectives: ["Atteindre 50 missions/an (vs 30 en 2026)", "Ouvrir 3 bureaux régionaux (Abidjan, Douala, Dakar)", "Lancer 5 offres SaaS RegTech", "Former 500 professionnels certifiés/an"],
    key_initiatives: ["Déploiement KOS Enterprise OS™", "Accréditation IFC/IFRS", "Partenariats académiques 3 universités"],
    kpis: { revenue_target: "1 200 000 000 FCFA", mission_count: 50, team_size: 35 },
    progress_percentage: 35,
    created_at: "2026-06-01T08:00:00Z"
  },
  {
    id: "sp-002",
    plan_title: "Feuille de Route Transformation Digitale — BU RegTech",
    horizon: "1 an",
    vision_statement: "Industrialiser l'expertise KHEPRA via 5 outils SaaS, réduisant le time-to-delivery de 60% et créant un revenu récurrent.",
    strategic_objectives: ["Lancer KOS RegTech Conformity Scanner™", "Digitaliser 100% des diagnostics", "Automatiser la veille réglementaire"],
    key_initiatives: ["Développement plateforme SaaS", "Intégration API BCEAO/COBAC", "Certification ISO 27001"],
    kpis: { saas_revenue_target: "250 000 000 FCFA", time_saved: "60%", diagnostic_digitalization: "100%" },
    progress_percentage: 20,
    created_at: "2026-05-15T10:00:00Z"
  }
];



