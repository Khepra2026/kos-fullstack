export const platformArchitecture = {
  name: 'KOS REGTECH AI PLATFORM',
  tagline: 'Intelligence Réglementaire Augmentée pour l\'Afrique Francophone',
  description: 'La première plateforme souveraine d\'intelligence réglementaire augmentée, conçue pour les institutions financières, régulateurs et entreprises opérant en zone UEMOA, CEMAC et OHADA.',
  ingestion: {
    title: 'Ingestion',
    subtitle: 'Acquisition continue des données réglementaires',
    items: [
      { label: 'regulator_feed', value: '< 2h', desc: 'Flux réglementaires temps réel — BCEAO, COBAC, GAFI, OHADA, CIMA, AMF-UEMOA' },
      { label: 'kb_docs', value: '1.2M+', desc: 'Documents réglementaires indexés — instructions, circulaires, décisions, sanctions, consultations' },
      { label: 'Sources actives', value: '18', desc: 'Régulateurs, institutions, think tanks, médias économiques — UEMOA + CEMAC' },
    ],
  },
  intelligence: {
    title: 'Intelligence',
    subtitle: 'Moteur d\'analyse 100% souverain',
    items: [
      { label: 'LLM', value: 'Llama-70B KHEPRA FT', desc: 'Modèle de langage fine-tuné sur 25 400 textes réglementaires africains' },
      { label: 'Embeddings', value: 'BGE-M3', desc: 'Modèle d\'embeddings multilingue optimisé pour le français juridique africain' },
      { label: 'Reranker', value: 'Cross-Encoder', desc: 'Reranking sémantique pour une précision de recherche > 95%' },
      { label: 'Vector Store', value: '2.78M+', desc: 'Vecteurs réglementaires indexés dans Qdrant — recherche hybride TF-IDF + Cosine' },
    ],
  },
  cores: {
    title: '7 Cœurs Métier',
    subtitle: 'Domaines d\'expertise interconnectés',
    items: [
      { name: 'RegTech', icon: 'ri-shield-check-line', color: 'primary', desc: 'Conformité réglementaire automatisée — scoring, audits, reporting' },
      { name: 'GRC', icon: 'ri-government-line', color: 'accent', desc: 'Gouvernance, Risques & Conformité — COSO, ISO 31000, Bâle III' },
      { name: 'Legal', icon: 'ri-scales-line', color: 'secondary', desc: 'Veille juridique — OHADA, droit des sociétés, sûretés, arbitrage' },
      { name: 'ESG', icon: 'ri-leaf-line', color: 'primary', desc: 'Double matérialité ISSB S1/S2 — bilan carbone, taxonomie verte UEMOA' },
      { name: 'Risk', icon: 'ri-alert-line', color: 'accent', desc: 'Risk Register scoring P×I automatique — heatmap, KRIs, stress tests' },
      { name: 'Audit', icon: 'ri-search-eye-line', color: 'secondary', desc: 'Audit trail immuable KOS-Chain — piste d\'audit 100% traçable' },
      { name: 'Knowledge', icon: 'ri-book-open-line', color: 'primary', desc: 'Knowledge Graph 2 847 nœuds — capitalisation et réutilisation des connaissances' },
    ],
  },
  thinkTank: {
    title: 'Think Tank',
    subtitle: 'Production intellectuelle automatisée',
    items: [
      { label: 'Livres Blancs', value: '30+', desc: 'Génération LLM de livres blancs sur les thématiques réglementaires émergentes' },
      { label: 'Études Sectorielles', value: '28/an', desc: 'Analyses prospectives par secteur — banque, microfinance, fintech, assurance' },
      { label: 'Notes de Position', value: '180/an', desc: 'Policy briefs et notes d\'analyse pour décideurs et régulateurs' },
    ],
  },
  observatoires: {
    title: 'Observatoires',
    subtitle: 'Monitoring sectoriel temps réel',
    items: [
      { label: 'Secteurs', value: '15', desc: 'Banques, SFD, FinTech, Assurance, PME, Agriculture, Énergie, Télécoms, Mines...' },
      { label: 'Régulateurs', value: '8', desc: 'BCEAO, COBAC, BEAC, GAFI, GIABA, GABAC, OHADA, CIMA' },
      { label: 'Indices KOS™', value: '21', desc: 'Indices composites de conformité, gouvernance, maturité digitale par secteur' },
    ],
  },
  executive: {
    title: 'Executive Engine',
    subtitle: 'Aide à la décision pour COMEX et Conseils',
    items: [
      { label: 'Notes CA', value: '< 90s', desc: 'Génération automatique de notes pour Conseil d\'Administration — résumé, KPIs, risques, décisions' },
      { label: 'Notes Comité', value: '< 60s', desc: 'Notes pour comités spécialisés — audit, risques, conformité, stratégie' },
      { label: 'KPIs Exécutifs', value: '280', desc: 'Tableau de bord exécutif temps réel — 15 domaines, 100% à la cible' },
    ],
  },
  output: {
    title: 'Output Factory',
    subtitle: 'Livrables automatisés niveau Big Four',
    items: [
      { label: 'Rapports', icon: 'ri-file-chart-line', desc: 'Rapports d\'audit, due diligence, conformité — 100% automatisés' },
      { label: 'Tableaux de Bord', icon: 'ri-dashboard-line', desc: 'Dashboards interactifs temps réel — KPI Tower 280 indicateurs' },
      { label: 'Matrices', icon: 'ri-grid-line', desc: 'Matrices de risques, de conformité, de matérialité ESG' },
      { label: 'Feuilles de Route', icon: 'ri-road-map-line', desc: 'Plans d\'action correctifs, roadmaps de mise en conformité' },
    ],
  },
  auditTrail: {
    title: 'KOS-Chain™',
    subtitle: 'Audit Trail 100% Traçable',
    items: [
      { label: 'Hash Chain', value: 'SHA-256', desc: 'Chaîne de hachage cryptographique — chaque événement est horodaté et immuable' },
      { label: 'Event Sourcing', value: '100%', desc: 'Toute action système est journalisée — création, modification, suppression, consultation' },
      { label: 'Triple Validation', value: 'N1→N2→N3', desc: 'Source identifiée → Source certifiée → Source publiable — tolérance zéro' },
    ],
  },
  stats: [
    { value: '25 400+', label: 'Textes réglementaires' },
    { value: '178', label: 'Citations vérifiées' },
    { value: '20', label: 'Autorités couvertes' },
    { value: '2 847', label: 'Nœuds Knowledge Graph' },
    { value: '2.78M+', label: 'Embeddings vectoriels' },
    { value: '75', label: 'Agents IA autonomes' },
    { value: '17', label: 'Pays UEMOA + CEMAC' },
    { value: '< 90s', label: 'Note CA générée' },
  ],
};



