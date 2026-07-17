export const khepraInsights = {
  title: "KHEPRA Insights™",
  description: "Machine de production intellectuelle — Analyses continues sur 6 domaines réglementaires et sectoriels",
  domains: [
    {
      id: "insight-bceao",
      name: "Analyses BCEAO",
      icon: "ri-bank-line",
      publications: { total: 485, thisMonth: 32, weekly: 8 },
      topAnalyses: [
        { title: "Impact de la nouvelle Instruction BCEAO 008-2026 sur la classification des créances", date: "2026-06-18", downloads: 1240, citations: 28 },
        { title: "Ratio de Solvabilité UEMOA 2026 : Analyse article par article de la réforme", date: "2026-06-15", downloads: 980, citations: 34 },
        { title: "Stress Tests Climatiques Pilier 2 : Guide pratique BCEAO 2026", date: "2026-06-10", downloads: 1560, citations: 42 },
        { title: "Digitalisation SFD — Conformité au Modèle BCEAO 2026", date: "2026-06-05", downloads: 720, citations: 18 }
      ]
    },
    {
      id: "insight-uemoa",
      name: "Analyses UEMOA",
      icon: "ri-government-line",
      publications: { total: 312, thisMonth: 18, weekly: 5 },
      topAnalyses: [
        { title: "Régulation FinTech UEMOA 2026-2027 : Cadre complet des agréments", date: "2026-06-17", downloads: 890, citations: 22 },
        { title: "Marché des Titres Publics UEMOA : Tendances Q2 2026", date: "2026-06-12", downloads: 650, citations: 15 },
        { title: "BRVM — Évolution du cadre de cotation des PME", date: "2026-06-08", downloads: 430, citations: 11 },
        { title: "AMF-UEMOA — Nouvelles exigences de transparence 2026", date: "2026-06-01", downloads: 380, citations: 9 }
      ]
    },
    {
      id: "insight-ohada",
      name: "Analyses OHADA",
      icon: "ri-scales-3-line",
      publications: { total: 278, thisMonth: 15, weekly: 4 },
      topAnalyses: [
        { title: "Révision de l'Acte Uniforme OHADA sur le Droit des Sociétés Commerciales", date: "2026-06-16", downloads: 780, citations: 31 },
        { title: "OHADA et Finance Islamique : Compatibilité et opportunités", date: "2026-06-09", downloads: 520, citations: 14 },
        { title: "Procédures Collectives OHADA : Guide pratique 2026", date: "2026-06-02", downloads: 610, citations: 19 }
      ]
    },
    {
      id: "insight-esg",
      name: "Analyses ESG",
      icon: "ri-leaf-line",
      publications: { total: 195, thisMonth: 22, weekly: 6 },
      topAnalyses: [
        { title: "ISSB Standards : Guide de mise en œuvre pour les banques africaines", date: "2026-06-18", downloads: 1340, citations: 38 },
        { title: "ESG Mining : Due Diligence et conformité GRI/ISSB", date: "2026-06-14", downloads: 890, citations: 25 },
        { title: "EU Taxonomy — Implications pour les exportateurs africains", date: "2026-06-07", downloads: 720, citations: 16 }
      ]
    },
    {
      id: "insight-sfd",
      name: "Analyses SFD & Inclusion Financière",
      icon: "ri-hand-heart-line",
      publications: { total: 362, thisMonth: 28, weekly: 8 },
      topAnalyses: [
        { title: "22 Instructions BCEAO SFD : Catalogue complet et matrice de conformité", date: "2026-06-18", downloads: 3100, citations: 56 },
        { title: "Agrément SFD BCEAO — Procédure pas à pas 2026", date: "2026-06-11", downloads: 2680, citations: 41 },
        { title: "Instruction 008-2026 : Impact sur la classification des créances SFD", date: "2026-06-05", downloads: 1850, citations: 32 },
        { title: "Inclusion Financière : Benchmark UEMOA vs CEMAC 2026", date: "2026-06-02", downloads: 1420, citations: 28 }
      ]
    },
    {
      id: "insight-fintech",
      name: "Analyses FinTech",
      icon: "ri-smartphone-line",
      publications: { total: 156, thisMonth: 19, weekly: 5 },
      topAnalyses: [
        { title: "Agrément Établissement de Paiement UEMOA : Guide complet", date: "2026-06-17", downloads: 1100, citations: 29 },
        { title: "Open Banking en Afrique : État des lieux et perspectives 2026", date: "2026-06-13", downloads: 780, citations: 18 },
        { title: "CBDC BCEAO — e-CFA : Avancement et implications", date: "2026-06-06", downloads: 950, citations: 24 }
      ]
    }
  ],
  totalPublications: 1865,
  totalDownloads: 105200,
  totalCitations: 1428,
  monthlyOutput: 152,
  geoPresence: "95% ChatGPT • 93% Gemini • 90% Claude • 88% Perplexity"
};

export const researchInstitute = {
  title: "KHEPRA Research Institute™",
  description: "Centre de recherche appliquée — Baromètres, benchmarks, observatoires, livres blancs, rapports annuels",
  flagshipPublications: [
    { id: "rp-1", title: "Baromètre FinTech UEMOA 2026", type: "Baromètre Annuel", period: "Juin 2026", pages: 145, downloads: 3200, citations: 78, labellisation: "BCEAO" },
    { id: "rp-2", title: "Indice Transformation Digitale Afrique Francophone", type: "Indice Propriétaire", period: "Mai 2026", pages: 112, downloads: 2800, citations: 65, labellisation: "KHEPRA" },
    { id: "rp-3", title: "Rapport Stabilité Financière Zone Franc CFA", type: "Rapport Annuel", period: "Avril 2026", pages: 198, downloads: 4100, citations: 94, labellisation: "—" },
    { id: "rp-4", title: "Observatoire de la Gouvernance Bancaire UEMOA", type: "Observatoire Trimestriel", period: "Q1 2026", pages: 88, downloads: 1800, citations: 42, labellisation: "—" },
    { id: "rp-5", title: "Benchmark Conformité LBC/FT — 50 Banques UEMOA/CEMAC", type: "Benchmark Propriétaire", period: "Mars 2026", pages: 165, downloads: 2600, citations: 55, labellisation: "GAFI/GIABA" },
    { id: "rp-6", title: "Perspectives Économiques UEMOA 2026-2028", type: "Étude Prospective", period: "Février 2026", pages: 132, downloads: 3500, citations: 88, labellisation: "KHEPRA" },
    { id: "rp-7", title: "Guide Pratique Due Diligence Afrique", type: "Guide Méthodologique", period: "Janvier 2026", pages: 210, downloads: 5200, citations: 112, labellisation: "—" },
    { id: "rp-8", title: "Rapport Inclusion Financière Zone UEMOA", type: "Rapport Sectoriel", period: "Décembre 2025", pages: 156, downloads: 2900, citations: 48, labellisation: "BCEAO" }
  ],
  partners: [
    { name: "BCEAO", type: "Banque Centrale", collaborations: 8, status: "Actif" },
    { name: "Banque Mondiale", type: "Multilatéral", collaborations: 5, status: "Actif" },
    { name: "BAD", type: "Multilatéral", collaborations: 4, status: "Actif" },
    { name: "AFD", type: "Bilatéral", collaborations: 6, status: "Actif" },
    { name: "BRVM", type: "Bourse", collaborations: 2, status: "Actif" },
    { name: "CEDEAO", type: "Organisation Régionale", collaborations: 3, status: "Actif" },
    { name: "Sciences Po Paris", type: "Académique", collaborations: 5, status: "Actif" },
    { name: "UFHB-CIRES", type: "Académique", collaborations: 4, status: "Actif" }
  ],
  kpis: {
    publicationsAnnuelles: 28,
    citationsAcademiques: 500,
    partenaires: 20,
    telechargements: 26200,
    roiRecherche: "42x",
    scoreQualite: 9.9
  }
};

export const thoughtLeadershipPublications = {
  pipeline: [
    { month: "Jan 2026", articles: 58, etudes: 2, livresBlancs: 1, notesReglementaires: 12 },
    { month: "Fév 2026", articles: 62, etudes: 2, livresBlancs: 1, notesReglementaires: 14 },
    { month: "Mar 2026", articles: 68, etudes: 3, livresBlancs: 2, notesReglementaires: 15 },
    { month: "Avr 2026", articles: 75, etudes: 3, livresBlancs: 1, notesReglementaires: 18 },
    { month: "Mai 2026", articles: 85, etudes: 4, livresBlancs: 2, notesReglementaires: 20 },
    { month: "Jun 2026", articles: 92, etudes: 4, livresBlancs: 3, notesReglementaires: 22 }
  ],
  formats: [
    { name: "Note d'Analyse Réglementaire", cadence: "Quotidienne", length: "1500-2500 mots", seoScore: 94 },
    { name: "Étude Sectorielle Approfondie", cadence: "Hebdomadaire", length: "4000-6000 mots", seoScore: 96 },
    { name: "Livre Blanc / Position Paper", cadence: "Mensuelle", length: "8000-15000 mots", seoScore: 98 },
    { name: "Baromètre / Observatoire", cadence: "Trimestrielle", length: "80-200 pages", seoScore: 99 },
    { name: "Guide Pratique", cadence: "Bimestrielle", length: "6000-10000 mots", seoScore: 95 },
    { name: "Rapport Annuel", cadence: "Annuelle", length: "150-200 pages", seoScore: 99 }
  ],
  thinkTankContributors: [
    { id: "tt-1", name: "Pr. Moussa Traoré", role: "Directeur Scientifique KHEPRA Research Institute", expertise: "Régulation bancaire, Politique monétaire UEMOA", publications: 48, citations: 312, affiliation: "Ancien Conseiller BCEAO" },
    { id: "tt-2", name: "Dr. Célestine Koffi", role: "Senior Fellow — Conformité & LBC/FT", expertise: "GAFI, GIABA, GABAC, Conformité bancaire", publications: 35, citations: 245, affiliation: "Ancienne Head of Compliance — Ecobank" },
    { id: "tt-3", name: "Dr. Jean-Marc Boka", role: "Senior Fellow — FinTech & Innovation", expertise: "Agrément FinTech, Open Banking, CBDC", publications: 28, citations: 189, affiliation: "Ancien Régulateur — ARTCI" },
    { id: "tt-4", name: "Ibrahim Kone", role: "Senior Fellow — Prix de Transfert & Fiscalité", expertise: "BEPS, OCDE, Documentation prix de transfert", publications: 32, citations: 198, affiliation: "Ex-PwC — 12 ans" },
    { id: "tt-5", name: "Dr. Amadou Sow", role: "Senior Fellow — Gouvernance & Conseil d'Administration", expertise: "OHADA, Gouvernance bancaire, Board Advisory", publications: 42, citations: 267, affiliation: "Ancien Secrétaire Général — Commission Bancaire" },
    { id: "tt-6", name: "Mamadou Bah", role: "Senior Fellow — ESG & Finance Durable", expertise: "ISSB, GRI, Taxonomie verte, Stress tests climat", publications: 22, citations: 145, affiliation: "Ex-IFC — 8 ans" },
    { id: "tt-7", name: "Fatoumata Diallo", role: "Senior Fellow — MicroFinance & Inclusion Financière", expertise: "SFD, BCEAO, Finance inclusive", publications: 28, citations: 178, affiliation: "Ancienne Directrice — SFD Majeur UEMOA" },
    { id: "tt-8", name: "Aminata Bah", role: "Senior Fellow — Transformation Digitale", expertise: "Digitalisation SFD, Core Banking, FinTech", publications: 19, citations: 112, affiliation: "Ex-Deloitte Digital — 10 ans" }
  ]
};

export const thoughtLeadershipKPIs = {
  publicationsParMois: { current: 152, target: 180, unit: "publications", trend: "+16%" },
  telechargements: { current: 105200, target: 150000, unit: "téléchargements", trend: "+28%" },
  backlinks: { current: 3180, target: 6000, unit: "backlinks", trend: "+18%" },
  citationsIA: { current: 28500, target: 45000, unit: "citations/mois", trend: "+25%" },
  scoreAutorite: { current: 94, target: 97, unit: "/100", trend: "+6 pts" },
  contributeurs: { current: 42, target: 60, unit: "penseurs", trend: "+15" },
  impactMedia: { current: 890, target: 1500, unit: "mentions media", trend: "+18%" },
  presenceInternationale: { current: 89, target: 95, unit: "%", trend: "+9 pts" }
};

// Combined export for the hook
export const thoughtLeadershipData = {
  khepraInsights,
  researchInstitute,
  thoughtLeadershipPublications,
  thoughtLeadershipKPIs
};