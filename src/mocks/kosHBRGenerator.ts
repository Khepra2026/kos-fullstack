// P4 — KOS HBR Generator™ — Rapport Niveau Harvard Business Review
// Ferme Gap P8 — Think Tank Big Four

export const HBR_REPORT_TYPES = [
  { id: 'article', label: 'Article Expert', pages: '3-5', icon: 'ri-article-line', words: '2500-4000' },
  { id: 'livre_blanc', label: 'Livre Blanc', pages: '12-25', icon: 'ri-file-text-line', words: '8000-15000' },
  { id: 'position_paper', label: 'Position Paper', pages: '4-8', icon: 'ri-government-line', words: '3000-5000' },
  { id: 'barometre', label: 'Baromètre Sectoriel', pages: '20-40', icon: 'ri-bar-chart-2-line', words: '12000-20000' },
];

export const HBR_SAMPLE_REPORTS = [
  {
    id: 'hbr01',
    titre: 'Transition vers Bâle III en zone UEMOA : Risques, Opportunités et Feuille de Route 2026-2028',
    type: 'livre_blanc',
    secteur: 'Banque / Réglementation Prudentielle',
    audience: 'DG banques UEMOA, Régulateurs COBAC/BCEAO',
    statut: 'published',
    score_qualite: 9.7,
    indice_fiabilite: 97,
    sources_count: 22,
    citations_externes: 8,
    mots: 14200,
    date_pub: '2026-06-15',
    framework: 'KOS Solvency Resilience Score™',
    downloads: 342,
    cites_by: ['Financial Afrik', 'BCEAO.int', 'IMF Working Paper'],
    sections: [
      { num: 1, titre: 'Executive Summary', mots: 350, complete: true },
      { num: 2, titre: 'Contexte Africain — Données IMF/BCEAO 2026', mots: 1200, complete: true },
      { num: 3, titre: 'Analyse KOS — 5 graphiques Supabase', mots: 3400, complete: true },
      { num: 4, titre: 'Matrice Risque/Opportunité McKinsey', mots: 800, complete: true },
      { num: 5, titre: 'Études de Cas UEMOA/CEMAC (anonymisées)', mots: 2200, complete: true },
      { num: 6, titre: 'Recommandations C-Level (5 actions SMART)', mots: 1400, complete: true },
      { num: 7, titre: 'Methodology & Confidence Score', mots: 600, complete: true },
      { num: 8, titre: 'About Khepra + EEAT', mots: 250, complete: true },
    ],
  },
  {
    id: 'hbr02',
    titre: 'Agrément FinTech UEMOA 2026 : Guide Stratégique pour l\'Établissement Paiement',
    type: 'article',
    secteur: 'FinTech / Réglementation',
    audience: 'CEO FinTechs, Entrepreneurs, Investisseurs',
    statut: 'published',
    score_qualite: 9.5,
    indice_fiabilite: 98,
    sources_count: 18,
    citations_externes: 5,
    mots: 3800,
    date_pub: '2026-06-28',
    framework: 'KOS FinTech Regulatory Readiness Score™',
    downloads: 287,
    cites_by: ['Africa CEO Forum', 'Ecofin Agency'],
    sections: [
      { num: 1, titre: 'Executive Insight — 3 insights chiffrés', mots: 280, complete: true },
      { num: 2, titre: 'Contexte Réglementaire BCEAO', mots: 500, complete: true },
      { num: 3, titre: 'Diagnostic Sectoriel — 5 catégories d\'établissements', mots: 900, complete: true },
      { num: 4, titre: 'Framework KOS FinTech Score™', mots: 600, complete: true },
      { num: 5, titre: 'Analyse Expert — 5 findings', mots: 800, complete: true },
      { num: 6, titre: 'Recommandations', mots: 450, complete: true },
      { num: 7, titre: 'CTA Premium', mots: 120, complete: true },
    ],
  },
  {
    id: 'hbr03',
    titre: 'ESG & Finance Durable en Afrique Francophone : Standards ISSB, Obligations COBAC et Opportunités 2026',
    type: 'position_paper',
    secteur: 'ESG / Finance Durable',
    audience: 'Heads of Compliance, DAF, Comité RSE',
    statut: 'in_review',
    score_qualite: 9.2,
    indice_fiabilite: 95,
    sources_count: 15,
    citations_externes: 3,
    mots: 4200,
    date_pub: null,
    framework: 'KOS ESG Readiness Model™',
    downloads: 0,
    cites_by: [],
    sections: [
      { num: 1, titre: 'Executive Insight', mots: 300, complete: true },
      { num: 2, titre: 'Contexte — Données ISSB/GRI/NGFS', mots: 600, complete: true },
      { num: 3, titre: 'Diagnostic', mots: 800, complete: true },
      { num: 4, titre: 'Framework Exclusif', mots: 700, complete: true },
      { num: 5, titre: 'Analyse Expert', mots: 900, complete: true },
      { num: 6, titre: 'Recommandations', mots: 500, complete: false },
      { num: 7, titre: 'CTA Premium', mots: 0, complete: false },
    ],
  },
];

export const HBR_PIPELINE = {
  published: 12,
  in_review: 4,
  drafts: 8,
  planned: 20,
  total_words: 127000,
  avg_score_qualite: 9.3,
  avg_indice_fiabilite: 96.8,
  publications_per_week_target: 1,
  citations_jeune_afrique: 3,
  citations_financial_afrik: 12,
  citations_ecofin: 8,
  citations_academic: 5,
  downloads_total: 4820,
  leads_generated: 342,
};

export const HBR_FRAMEWORKS_PROPRIETARY = [
  { nom: 'KOS Solvency Resilience Score™', domaine: 'Banque / Prudentiel', version: 'v2.1', rapports: 4 },
  { nom: 'KOS BEPS Documentation Score™', domaine: 'Prix de Transfert', version: 'v1.3', rapports: 3 },
  { nom: 'KOS Board Readiness Score™', domaine: 'Gouvernance', version: 'v1.8', rapports: 5 },
  { nom: 'KOS ESG Readiness Model™', domaine: 'ESG / Durabilité', version: 'v2.0', rapports: 4 },
  { nom: 'KOS LBC/FT Compliance Maturity Score™', domaine: 'AML/CFT', version: 'v1.5', rapports: 6 },
  { nom: 'KOS Cyber Resilience Maturity Model™', domaine: 'Cybersécurité', version: 'v1.0', rapports: 2 },
  { nom: 'KOS FinTech Regulatory Readiness Score™', domaine: 'FinTech', version: 'v1.2', rapports: 3 },
  { nom: 'KOS Climate Stress Resilience Index™', domaine: 'ESG / Stress Tests', version: 'v1.1', rapports: 2 },
  { nom: 'KOS Digital Transformation Readiness™', domaine: 'Transformation Digitale', version: 'v2.3', rapports: 5 },
];

export const HBR_KPI_TARGETS = {
  rapports_per_week: { target: 1, current: 0.9, unit: 'rapport/semaine' },
  citations_jeune_afrique_j90: { target: 1, current: 3, unit: 'mentions Tier-1' },
  indice_fiabilite: { target: 95, current: 96.8, unit: '/100' },
  score_qualite: { target: 9.0, current: 9.3, unit: '/10' },
  leads_par_rapport: { target: 25, current: 28.5, unit: 'leads/rapport' },
};

export const HBR_MASTER_PROMPT_PREVIEW = `Tu es KOS-HBR-Analyst, niveau McKinsey Global Institute + Harvard Business Review.

INPUT: {sujet, secteur_uemoa, tier=premium, data_kos[]}

STRUCTURE HBR OBLIGATOIRE:
1. Executive Summary: 150 mots, 3 insights chiffrés, 1 recommandation bold
2. Le Contexte Africain: Données IMF/BCEAO 2026, benchmark vs Asie/UE
3. Analyse KOS: 5 graphiques auto-générés depuis Supabase. Cite 10+ sources primaires
4. Matrice Risque/Opportunité: 2×2 McKinsey style
5. Études de Cas: 3 cas réels anonymisés UEMOA/CEMAC depuis base KOS
6. Recommandations C-Level: 5 actions SMART, owner, budget, ROI
7. Methodology: Comment KOS a généré l'analyse, limites, confidence score
8. About Khepra: EEAT, ISO 27001, 22 ans, citations

CONTRAINTES QUALITÉ:
- 100% citations officielles ou académiques vérifiées
- 0 affirmation sans source
- Indice fiabilité KOS ≥ 95/100 avant publication
- Score SEO ≥ 85/100
- Longueur: 2500-4000 mots`;





