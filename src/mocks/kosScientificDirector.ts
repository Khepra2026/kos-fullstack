// ============================================================
// KOS SCIENTIFIC DIRECTOR — Think Tank Command Center
// Directeur Scientifique : Sourcing Académique Élite + Synthèse Cognitive + Auto-Apprentissage
// ============================================================

// ── TOP UNIVERSITÉS MONDIALES (Top 200 — Échantillon représentatif par région) ──
export interface TopUniversity {
  rank: number;
  name: string;
  country: string;
  region: 'americas' | 'europe' | 'asia_pacific' | 'africa' | 'middle_east';
  strengths: string[];
  flagshipJournals: string[];
  color: string;
}

export const TOP_UNIVERSITIES: TopUniversity[] = [
  { rank: 1, name: 'Harvard University', country: 'USA', region: 'americas', strengths: ['Stratégie', 'Finance', 'Droit', 'Politiques Publiques', 'Économie'], flagshipJournals: ['Harvard Business Review', 'Harvard Law Review', 'Quarterly Journal of Economics'], color: '#A51C30' },
  { rank: 2, name: 'Massachusetts Institute of Technology', country: 'USA', region: 'americas', strengths: ['IA', 'Économétrie', 'Innovation', 'Data Science', 'Finance Quantitative'], flagshipJournals: ['MIT Sloan Management Review', 'Review of Economics and Statistics'], color: '#A31F34' },
  { rank: 3, name: 'Stanford University', country: 'USA', region: 'americas', strengths: ['Entrepreneuriat', 'IA', 'Politiques Publiques', 'Droit', 'Finance'], flagshipJournals: ['Stanford Social Innovation Review', 'Stanford Law Review'], color: '#8C1515' },
  { rank: 4, name: 'University of Oxford', country: 'UK', region: 'europe', strengths: ['Économie du Développement', 'Droit International', 'Gouvernance', 'Finance', 'Politiques Publiques'], flagshipJournals: ['Oxford Review of Economic Policy', 'Oxford Journal of Legal Studies'], color: '#002147' },
  { rank: 5, name: 'University of Cambridge', country: 'UK', region: 'europe', strengths: ['Économie', 'Droit', 'Finance', 'Mathématiques Appliquées', 'Développement Durable'], flagshipJournals: ['Cambridge Journal of Economics', 'Journal of Financial Economics'], color: '#A3C1AD' },
  { rank: 6, name: 'London School of Economics', country: 'UK', region: 'europe', strengths: ['Économie', 'Finance', 'Développement International', 'Gouvernance', 'Politiques Sociales'], flagshipJournals: ['Economica', 'British Journal of Sociology', 'Journal of International Development'], color: '#5E2750' },
  { rank: 7, name: 'University of Chicago', country: 'USA', region: 'americas', strengths: ['Économie (Chicago School)', 'Finance', 'Droit & Économie', 'Politiques Publiques'], flagshipJournals: ['Journal of Political Economy', 'Journal of Law and Economics'], color: '#800000' },
  { rank: 8, name: 'National University of Singapore', country: 'Singapour', region: 'asia_pacific', strengths: ['Finance Islamique', 'Gouvernance Asie', 'Innovation', 'Politiques Publiques'], flagshipJournals: ['Asian Journal of Law and Economics', 'Singapore Economic Review'], color: '#003D7C' },
  { rank: 9, name: 'INSEAD', country: 'France/Singapour', region: 'europe', strengths: ['Stratégie Internationale', 'Finance', 'Entrepreneuriat', 'Leadership'], flagshipJournals: ['INSEAD Working Papers Series'], color: '#005A8B' },
  { rank: 10, name: 'HEC Paris', country: 'France', region: 'europe', strengths: ['Finance', 'Stratégie', 'Marketing', 'Droit des Affaires'], flagshipJournals: ['HEC Research Papers Series'], color: '#1E3A5F' },
  { rank: 12, name: 'Yale University', country: 'USA', region: 'americas', strengths: ['Droit', 'Économie', 'Gouvernance', 'Politiques Environnementales'], flagshipJournals: ['Yale Law Journal', 'Journal of Industrial Ecology'], color: '#00356B' },
  { rank: 14, name: 'Columbia University', country: 'USA', region: 'americas', strengths: ['Finance', 'Développement International', 'Droit', 'Journalisme Économique'], flagshipJournals: ['Columbia Law Review', 'Journal of Development Economics'], color: '#C4D8E2' },
  { rank: 17, name: 'Sciences Po Paris', country: 'France', region: 'europe', strengths: ['Politiques Publiques', 'Droit International', 'Gouvernance', 'Affaires Européennes'], flagshipJournals: ['Revue Française de Science Politique'], color: '#E2001A' },
  { rank: 22, name: 'University of Cape Town', country: 'Afrique du Sud', region: 'africa', strengths: ['Finance en Afrique', 'Développement', 'Droit Constitutionnel', 'Gouvernance'], flagshipJournals: ['South African Journal of Economics', 'Journal of African Law'], color: '#004B8D' },
  { rank: 31, name: 'Mohammed VI Polytechnic University', country: 'Maroc', region: 'africa', strengths: ['AgriTech', 'IA Africaine', 'Énergie Durable', 'Politiques Publiques Afrique'], flagshipJournals: ['UM6P Research Papers'], color: '#00695C' },
  { rank: 42, name: 'American University in Cairo', country: 'Égypte', region: 'africa', strengths: ['Politiques Publiques MENA', 'Finance Islamique', 'Développement'], flagshipJournals: ['Cairo Review of Global Affairs'], color: '#004A7C' },
  { rank: 50, name: 'University of Ghana', country: 'Ghana', region: 'africa', strengths: ['Économie du Développement', 'Gouvernance', 'Agriculture', 'FinTech'], flagshipJournals: ['Ghana Social Science Journal'], color: '#006B3F' },
  { rank: 68, name: 'Cheikh Anta Diop University', country: 'Sénégal', region: 'africa', strengths: ['Droit OHADA', 'Économie UEMOA', 'Finance', 'Gouvernance'], flagshipJournals: ['Annales Africaines de Droit'], color: '#00853F' },
  { rank: 89, name: 'University of Nairobi', country: 'Kenya', region: 'africa', strengths: ['FinTech', 'AgriBusiness', 'Innovation', 'Politiques Publiques'], flagshipJournals: ['East African Journal of Business and Economics'], color: '#1B4F72' },
];

// ── REVUES ACADÉMIQUES À FORT IMPACT ──
export interface HighImpactJournal {
  name: string;
  field: string;
  impactFactor: number;
  hIndex: number;
  relevance: 'critique' | 'majeur' | 'standard';
  africaRelevance: string;
  color: string;
}

export const HIGH_IMPACT_JOURNALS: HighImpactJournal[] = [
  { name: 'Strategic Management Journal', field: 'Stratégie', impactFactor: 8.3, hIndex: 312, relevance: 'critique', africaRelevance: 'Stratégies de croissance en marchés émergents, alliances panafricaines', color: '#1E40AF' },
  { name: 'Journal of Finance', field: 'Finance', impactFactor: 8.9, hIndex: 340, relevance: 'critique', africaRelevance: 'Financement PME, marchés de capitaux frontières, microfinance', color: '#065F46' },
  { name: 'Management Science', field: 'Management', impactFactor: 5.4, hIndex: 280, relevance: 'critique', africaRelevance: 'Optimisation supply chain, décision en incertitude, modèles africains', color: '#92400E' },
  { name: 'World Development', field: 'Développement', impactFactor: 6.1, hIndex: 220, relevance: 'critique', africaRelevance: 'Pauvreté, inégalités, industrialisation, politiques publiques Afrique', color: '#991B1B' },
  { name: 'Energy Policy', field: 'Énergie', impactFactor: 7.8, hIndex: 250, relevance: 'majeur', africaRelevance: 'Transition énergétique Afrique, accès électricité, énergies renouvelables', color: '#9A3412' },
  { name: 'Journal of International Business Studies', field: 'International', impactFactor: 9.4, hIndex: 230, relevance: 'critique', africaRelevance: 'Investissements directs Afrique, stratégies multinationales, ZLECAF', color: '#6B21A8' },
  { name: 'Journal of Financial Economics', field: 'Finance', impactFactor: 6.8, hIndex: 290, relevance: 'critique', africaRelevance: 'Gouvernance, valorisation, marchés financiers émergents', color: '#0E7490' },
  { name: 'Research Policy', field: 'Innovation', impactFactor: 9.1, hIndex: 270, relevance: 'critique', africaRelevance: 'Systèmes d\'innovation africains, transfert technologique, R&D', color: '#B45309' },
  { name: 'Journal of Development Economics', field: 'Développement', impactFactor: 4.7, hIndex: 160, relevance: 'majeur', africaRelevance: 'Micro-économie du développement, évaluation d\'impact, RCT Afrique', color: '#047857' },
  { name: 'American Economic Review', field: 'Économie', impactFactor: 11.5, hIndex: 350, relevance: 'critique', africaRelevance: 'Croissance inclusive, politiques monétaires, commerce international', color: '#7C3AED' },
  { name: 'Journal of Business Ethics', field: 'Éthique', impactFactor: 6.4, hIndex: 220, relevance: 'majeur', africaRelevance: 'Gouvernance, RSE, corruption, éthique des affaires en Afrique', color: '#0891B2' },
  { name: 'Review of Financial Studies', field: 'Finance', impactFactor: 7.2, hIndex: 230, relevance: 'critique', africaRelevance: 'Inclusion financière, FinTech, stabilité systémique', color: '#A21CAF' },
  { name: 'Academy of Management Journal', field: 'Management', impactFactor: 9.8, hIndex: 350, relevance: 'critique', africaRelevance: 'Leadership africain, diversité, transformation organisationnelle', color: '#DC2626' },
  { name: 'Journal of Economic Perspectives', field: 'Économie', impactFactor: 8.6, hIndex: 220, relevance: 'majeur', africaRelevance: 'Synthèses accessibles sur croissance, inégalités, politiques', color: '#2563EB' },
];

// ── GRANDS THINK TANKS MONDIAUX ──
export interface GlobalThinkTank {
  name: string;
  headquarters: string;
  globalRank: number;
  specialties: string[];
  annualOutput: string;
  africaRelevance: string;
  color: string;
}

export const GLOBAL_THINK_TANKS: GlobalThinkTank[] = [
  { name: 'Brookings Institution', headquarters: 'Washington DC', globalRank: 1, specialties: ['Politiques Économiques', 'Développement International', 'Gouvernance Globale'], annualOutput: '300+ publications', africaRelevance: 'Programme Africa Growth Initiative — analyses macro, commerce, gouvernance', color: '#003A70' },
  { name: 'Peterson Institute (PIIE)', headquarters: 'Washington DC', globalRank: 2, specialties: ['Commerce International', 'Finance Globale', 'Politiques Monétaires'], annualOutput: '200+ publications', africaRelevance: 'ZLECAF, intégration commerciale, flux capitaux Afrique', color: '#C8102E' },
  { name: 'Bruegel', headquarters: 'Bruxelles', globalRank: 3, specialties: ['Politiques Économiques EU', 'Gouvernance Financière', 'Innovation'], annualOutput: '150+ publications', africaRelevance: 'Partenariats UE-Afrique, financement développement, régulation financière', color: '#003399' },
  { name: 'Chatham House', headquarters: 'Londres', globalRank: 4, specialties: ['Affaires Internationales', 'Sécurité Énergétique', 'Gouvernance Mondiale'], annualOutput: '250+ publications', africaRelevance: 'Programme Africa — conflits, ressources, climat, gouvernance politique', color: '#8B0000' },
  { name: 'International Food Policy Research Institute', headquarters: 'Washington DC', globalRank: 8, specialties: ['Sécurité Alimentaire', 'Agriculture', 'Politiques Rurales'], annualOutput: '400+ publications', africaRelevance: 'Transformation agricole Afrique, chaînes valeur, nutrition, résilience', color: '#2E7D32' },
  { name: 'Overseas Development Institute', headquarters: 'Londres', globalRank: 9, specialties: ['Développement International', 'Aide', 'Politiques Sociales'], annualOutput: '280+ publications', africaRelevance: 'ODD Afrique, financement climat, développement inclusif', color: '#004D40' },
  { name: 'African Center for Economic Transformation', headquarters: 'Accra', globalRank: 45, specialties: ['Transformation Économique Afrique', 'Industrialisation', 'Politiques Publiques'], annualOutput: '80+ publications', africaRelevance: 'Politique industrielle, chaînes valeur régionales, emploi jeunes', color: '#FF6F00' },
  { name: 'South African Institute of International Affairs', headquarters: 'Johannesburg', globalRank: 52, specialties: ['Géopolitique Afrique', 'Gouvernance', 'Commerce'], annualOutput: '120+ publications', africaRelevance: 'Gouvernance ressources, ZLECAF, relations Afrique-monde', color: '#1A237E' },
  { name: 'Policy Center for the New South', headquarters: 'Rabat', globalRank: 67, specialties: ['Économie Afrique', 'Agriculture', 'Géopolitique Atlantique'], annualOutput: '100+ publications', africaRelevance: 'Sécurité alimentaire, corridors atlantiques, intégration régionale', color: '#004D40' },
];

// ── 5 AXES SECTORIELS — Synthèse Cognitive ──
export interface SectorSynthesis {
  sectorId: string;
  sectorName: string;
  sectorIcon: string;
  color: string;
  globalResearchLandscape: string;
  topReferences: { source: string; title: string; year: number; keyInsight: string }[];
  transpositionGaps: { gap: string; severity: 'critique' | 'majeur' | 'modéré'; description: string }[];
  khepraInnovationLevers: { lever: string; description: string; impact: number; timeline: string }[];
  maturityScore: number;
  lastUpdated: string;
}

export const SECTOR_SYNTHESES: SectorSynthesis[] = [
  {
    sectorId: 'agribusiness',
    sectorName: 'Agro-Business & Sécurité Alimentaire',
    sectorIcon: 'ri-plant-line',
    color: '#2E7D32',
    globalResearchLandscape: 'La recherche mondiale sur l\'agro-business africain s\'articule autour de 4 axes : intensification durable (FAO, CGIAR), chaînes de valeur inclusives (IFPRI, Banque Mondiale), résilience climatique (IPCC, PNUD), et digitalisation agricole (GSMA, MIT Media Lab). Le consensus scientifique identifie l\'Afrique comme le dernier "frontier" agricole mondial avec 60% des terres arables non cultivées.',
    topReferences: [
      { source: 'IFPRI', title: 'Global Food Policy Report — Afrique subsaharienne', year: 2025, keyInsight: 'La transformation des systèmes alimentaires africains nécessite 40-60 milliards USD/an d\'investissement sur 10 ans' },
      { source: 'FAO', title: 'The State of Food and Agriculture — Climate-Smart Agriculture', year: 2025, keyInsight: 'L\'agriculture climato-intelligente peut augmenter les rendements de 25-40% en Afrique de l\'Ouest' },
      { source: 'MIT Sloan', title: 'Digital Agriculture Platforms in Emerging Markets', year: 2025, keyInsight: 'Les plateformes AgriTech africaines réduisent l\'asymétrie d\'information de 35% sur les prix' },
      { source: 'World Bank', title: 'Agri-Food System Transformation in Africa', year: 2026, keyInsight: 'Le marché alimentaire africain atteindra 1 trillion USD d\'ici 2030' },
      { source: 'Brookings', title: 'Foresight Africa — Agriculture and Land Use', year: 2026, keyInsight: 'La ZLECAF peut booster le commerce agro-alimentaire intra-africain de 50%' },
    ],
    transpositionGaps: [
      { gap: 'Fragmentation foncière', severity: 'critique', description: '80% des exploitations < 2 hectares, rendant les modèles d\'intensification occidentaux inapplicables sans adaptation' },
      { gap: 'Infrastructure post-récolte', severity: 'critique', description: '30-40% de pertes post-récolte en Afrique vs 5-10% dans les pays développés — les chaînes du froid sont quasi inexistantes' },
      { gap: 'Accès au financement', severity: 'majeur', description: 'Moins de 5% du crédit bancaire africain va à l\'agriculture malgré 25% du PIB — les modèles de risk-sharing type NASIRA IFC sont sous-utilisés' },
      { gap: 'Intrants et semences', severity: 'majeur', description: 'Utilisation d\'engrais 10x inférieure à l\'Asie du Sud-Est — les subventions intelligentes type "e-wallet" Nigeria restent marginales' },
      { gap: 'Digitalisation parcellaire', severity: 'modéré', description: 'La couverture mobile rurale est bonne mais l\'adoption des outils AgriTech est <15% — barrière de confiance et d\'alphabétisation numérique' },
    ],
    khepraInnovationLevers: [
      { lever: 'Modèle de risk-sharing UEMOA pour le financement agricole', description: 'Structurer un véhicule de garantie partielle inspiré du NASIRA IFC pour les SFD et banques UEMOA finançant les coopératives agricoles', impact: 87, timeline: '12-18 mois' },
      { lever: 'Plateforme de traçabilité blockchain pour filières cacao/coton', description: 'Déployer une solution blockchain de traçabilité permettant aux producteurs ivoiriens/burkinabés/maliens de certifier l\'origine et capter la prime "durable"', impact: 82, timeline: '6-12 mois' },
      { lever: 'Agri-FinTech intégrée mobile money × intrants', description: 'Plateforme combinant crédit intrants digital, assurance indicielle, conseil agronomique IA et vente groupée — module pour SFD existants', impact: 78, timeline: '9-15 mois' },
    ],
    maturityScore: 78,
    lastUpdated: '2026-06-27',
  },
  {
    sectorId: 'fintech',
    sectorName: 'FinTech & Inclusion Financière',
    sectorIcon: 'ri-smartphone-line',
    color: '#1565C0',
    globalResearchLandscape: 'La recherche FinTech africaine est dominée par les travaux sur le mobile money (MIT J-PAL, Oxford, Gates Foundation), la régulation proportionnée (AFI, CGAP, BIS), l\'open banking (Cambridge Centre for Alternative Finance), et l\'IA pour le crédit scoring (Stanford, IMF). L\'Afrique concentre 70% du volume mondial de mobile money avec 850M+ de comptes et un écosystème de 600+ FinTechs.',
    topReferences: [
      { source: 'BIS', title: 'Financial Stability Implications of FinTech in Emerging Markets', year: 2025, keyInsight: 'Le cadre réglementaire doit équilibrer innovation (bac à sable) et stabilité (exigences de fonds propres adaptées)' },
      { source: 'IMF', title: 'Digital Money and Financial Inclusion in Sub-Saharan Africa', year: 2025, keyInsight: 'Le mobile money a réduit l\'extrême pauvreté de 2% dans les pays à forte adoption comme le Kenya' },
      { source: 'Harvard Kennedy School', title: 'AI-Driven Credit Scoring for Thin-File Borrowers', year: 2025, keyInsight: 'Les modèles ML utilisant données télécoms + mobile money surpassent les scores traditionnels de 40% en précision' },
      { source: 'Cambridge CCAF', title: 'The Africa FinTech Ecosystem Report', year: 2026, keyInsight: 'Les corridors de paiement transfrontaliers UEMOA-CEMAC restent le maillon faible — 10x plus chers que SADC' },
      { source: 'CGAP', title: 'Proportionate Regulation for Digital Financial Services', year: 2026, keyInsight: 'Le "test-and-learn" réglementaire (bac à sable BCEAO, COBAC) doit être accéléré pour suivre l\'innovation' },
    ],
    transpositionGaps: [
      { gap: 'Interopérabilité transfrontalière', severity: 'critique', description: 'Paiements UEMOA↔CEMAC 4-8% de frais vs <1% en SEPA européen — le projet PAPSS ZLECAF est encore embryonnaire' },
      { gap: 'Credit scoring alternatif', severity: 'critique', description: '90% des adultes UEMOA sans historique de crédit formel — les modèles IA sont disponibles mais non autorisés par les régulateurs' },
      { gap: 'Identité numérique', severity: 'majeur', description: 'Absence d\'identifiant numérique unique interopérable — les programmes e-ID (Côte d\'Ivoire, Sénégal) progressent mais lentement' },
      { gap: 'Cybersécurité FinTech', severity: 'majeur', description: '40% des FinTechs africaines sans SOC dédié — la directive COBAC cybersécurité 2027 impose des investissements massifs' },
      { gap: 'Régulation Open Banking', severity: 'modéré', description: 'La directive Open Banking UEMOA est ambitieuse mais les API techniques et standards de consentement manquent' },
    ],
    khepraInnovationLevers: [
      { lever: 'Passerelle open banking UEMOA conforme BCEAO', description: 'Développer une architecture API standardisée permettant aux FinTechs agréées d\'accéder aux données bancaires avec consentement client, alignée directive UEMOA', impact: 92, timeline: '6-12 mois' },
      { lever: 'Moteur de credit scoring alternatif pour SFD', description: 'Modèle ML intégrant mobile money, données télécoms et historiques de transactions pour scorer les emprunteurs "thin-file" des SFD UEMOA', impact: 88, timeline: '9-18 mois' },
      { lever: 'Framework cybersécurité mutualisé FinTech UEMOA', description: 'SOC-as-a-Service pour FinTechs mutualisant les coûts de conformité COBAC 2027 — architecture partagée avec ségrégation des données', impact: 84, timeline: '12-18 mois' },
    ],
    maturityScore: 82,
    lastUpdated: '2026-06-27',
  },
  {
    sectorId: 'ia',
    sectorName: 'Intelligence Artificielle & Data',
    sectorIcon: 'ri-cpu-line',
    color: '#7C3AED',
    globalResearchLandscape: 'La recherche IA en contexte africain couvre : NLP pour langues africaines (Google Research, Meta AI, DeepMind, Masakhane), IA frugale pour environnements contraints (TinyML, MIT), gouvernance IA responsable (UNESCO, Stanford HAI, GPAI), et applications sectorielles (santé, agriculture, éducation). L\'Afrique produit <1% des publications mondiales en IA mais croît de 35%/an.',
    topReferences: [
      { source: 'Stanford HAI', title: 'AI Index Report — Africa Chapter', year: 2026, keyInsight: 'L\'Afrique concentre 0.3% des investissements mondiaux en IA mais 17% de la population — l\'écart se creuse' },
      { source: 'UNESCO', title: 'Recommendation on the Ethics of AI — Implementation in Africa', year: 2025, keyInsight: '12 pays africains ont des stratégies IA nationales, aucun en UEMOA sauf le Sénégal (ébauche)' },
      { source: 'MIT', title: 'TinyML for the Global South', year: 2025, keyInsight: 'Les modèles ML compressés (TinyML) peuvent tourner sur smartphones bas de gamme avec 95% de la précision des modèles cloud' },
      { source: 'Masakhane/DeepMind', title: 'Natural Language Processing for African Languages', year: 2026, keyInsight: 'Seules 30 des 2000+ langues africaines ont des modèles NLP — le gap linguistique est le plus grand frein' },
      { source: 'OECD', title: 'AI Compute and Infrastructure Divide', year: 2026, keyInsight: 'L\'Afrique a 0.01% de la capacité mondiale de calcul IA — dépendance totale aux clouds extra-africains' },
    ],
    transpositionGaps: [
      { gap: 'Infrastructure de calcul', severity: 'critique', description: 'Absence totale de data centers GPU en Afrique francophone — tous les modèles tournent sur AWS/Google Cloud hors continent' },
      { gap: 'Données localisées', severity: 'critique', description: '<5% des données d\'entraînement des LLMs mondiaux concernent l\'Afrique — biais et hallucinations massifs sur les réalités locales' },
      { gap: 'Talents et rétention', severity: 'critique', description: 'L\'Afrique forme 7000 diplômés IA/an mais en perd 45% vers l\'étranger — l\'écosystème local d\'emploi est trop mince' },
      { gap: 'Cadre réglementaire IA', severity: 'majeur', description: 'Aucune loi IA en Afrique francophone — le vide juridique freine l\'adoption institutionnelle et attire les solutions non contrôlées' },
      { gap: 'Coût des modèles', severity: 'modéré', description: 'Les API LLM coûtent 5-10x le revenu médian mensuel africain par requête intensive — modèles inaccessibles pour PME' },
    ],
    khepraInnovationLevers: [
      { lever: 'KOS LLM frugal pour le conseil réglementaire Afrique', description: 'Fine-tuner un modèle open-source léger (Mistral/LLaMA 7B) sur le corpus réglementaire BCEAO/COBAC/OHADA pour inférence locale sans dépendance cloud', impact: 94, timeline: '6-12 mois' },
      { lever: 'Plateforme de labellisation de données africaines', description: 'Crowdsourcing structuré de données d\'entraînement sectorielles (juridique, agricole, financier) auprès d\'experts locaux Khepra — protocole qualité ISO', impact: 86, timeline: '3-9 mois' },
      { lever: 'Observatoire IA & Régulation Afrique', description: 'Veille systématique des initiatives réglementaires IA mondiales (EU AI Act, US EO, Chine) et production de notes de transposition pour régulateurs UEMOA/CEMAC', impact: 80, timeline: 'En continu' },
    ],
    maturityScore: 72,
    lastUpdated: '2026-06-27',
  },
  {
    sectorId: 'infrastructure',
    sectorName: 'Infrastructures & BTP',
    sectorIcon: 'ri-building-4-line',
    color: '#D84315',
    globalResearchLandscape: 'La recherche en infrastructures africaines se concentre sur : le financement de projets (G20 Compact with Africa, OCDE, GI Hub), les PPP (World Bank PPIAF, UNECE), la résilience climatique des infrastructures (GIEC, AfDB), et la digitalisation du BTP (BIM, jumeaux numériques). Le déficit d\'infrastructures africain est estimé à 68-108 milliards USD/an. Le corridor Abidjan-Lagos mobilise 15,6 milliards USD.',
    topReferences: [
      { source: 'AfDB', title: 'African Infrastructure Development Index', year: 2025, keyInsight: 'Le score moyen des infrastructures africaines est de 28/100 — seuls 3 pays UEMOA dépassent 35' },
      { source: 'G20/GI Hub', title: 'Infrastructure Monitor — Africa Focus', year: 2026, keyInsight: 'Les investissements privés en infrastructure africaine ont chuté de 25% depuis 2020 — le risque perçu est le frein #1' },
      { source: 'World Bank PPIAF', title: 'PPP Frameworks in Sub-Saharan Africa', year: 2025, keyInsight: 'Seuls 8 pays africains ont un cadre PPP complet — UEMOA en a 3 (CIV, SN, BF)' },
      { source: 'MIT Concrete Sustainability Hub', title: 'Low-Carbon Construction Materials for Developing Countries', year: 2025, keyInsight: 'Les matériaux locaux bas-carbone peuvent réduire de 40% le coût des infrastructures rurales' },
      { source: 'UN-Habitat', title: 'Sustainable Urban Infrastructure in African Cities', year: 2026, keyInsight: 'La population urbaine africaine doublera d\'ici 2050 — les besoins en eau/électricité/transport explosent' },
    ],
    transpositionGaps: [
      { gap: 'Préparation de projets bancables', severity: 'critique', description: '80% des projets d\'infrastructure africains ne dépassent pas le stade de faisabilité faute de structuration financière — gap de compétences en project finance' },
      { gap: 'Cadre PPP immature', severity: 'critique', description: 'Absence de lois PPP dans la majorité des pays UEMOA/CEMAC — pas de standardisation des contrats, pas de garantie souveraine claire' },
      { gap: 'Normes techniques locales', severity: 'majeur', description: 'Absence de normes techniques adaptées aux matériaux et conditions africaines — surcoût de 25-40% lié au mimétisme des normes européennes' },
      { gap: 'Maintenance et cycle de vie', severity: 'majeur', description: '>60% du patrimoine infrastructurel africain est en état de dégradation avancé — budgets maintenance <20% des besoins' },
      { gap: 'Digitalisation BTP', severity: 'modéré', description: 'Taux d\'adoption BIM <5% en Afrique francophone vs 70% en Europe du Nord — perte de productivité estimée à 20%' },
    ],
    khepraInnovationLevers: [
      { lever: 'Unité de structuration financière de projets infrastructure', description: 'Service intégré de préparation de projets bancables (due diligence technique, modèle financier, montage PPP) pour les États et promoteurs UEMOA/CEMAC', impact: 90, timeline: '9-18 mois' },
      { lever: 'Label BTP durable Afrique — certification normes locales', description: 'Créer un référentiel de certification pour matériaux et méthodes de construction adaptés au contexte africain — réduction coûts 25-40%', impact: 83, timeline: '12-24 mois' },
      { lever: 'Plateforme de jumeau numérique pour maintenance prédictive', description: 'Solution IoT + IA pour la maintenance prédictive des infrastructures critiques (ponts, barrages, réseaux électriques) — déploiement pilote corridor Abidjan-Lagos', impact: 79, timeline: '18-24 mois' },
    ],
    maturityScore: 68,
    lastUpdated: '2026-06-27',
  },
  {
    sectorId: 'public-policy',
    sectorName: 'Politiques Publiques & Gouvernance',
    sectorIcon: 'ri-government-line',
    color: '#5D4037',
    globalResearchLandscape: 'La recherche en politiques publiques africaines couvre : la décentralisation et gouvernance locale (MIT GovLab, Oxford Blavatnik, AFD), la mobilisation des recettes fiscales (OCDE, FMI, ICTD), la digitalisation des services publics (Estonia e-Governance Academy, WB GovTech), et l\'évaluation d\'impact des politiques (J-PAL Africa, IPA, 3ie).',
    topReferences: [
      { source: 'IMF', title: 'Fiscal Monitor — Sub-Saharan Africa Revenue Mobilization', year: 2026, keyInsight: 'Le ratio impôts/PIB moyen en Afrique subsaharienne est de 17% vs 35% OCDE — fiscaliser le secteur informel est le défi #1' },
      { source: 'Oxford Blavatnik School', title: 'Digital Government in Africa', year: 2025, keyInsight: 'Les GovTech africaines réduisent les délais administratifs de 60% mais 70% des projets échouent faute d\'adoption' },
      { source: 'J-PAL Africa', title: 'Evidence-Based Policy Making in Africa', year: 2025, keyInsight: 'Seules 8% des politiques publiques africaines sont basées sur des évaluations d\'impact rigoureuses' },
      { source: 'Brookings AGI', title: 'Governance and State Capacity in Africa', year: 2026, keyInsight: 'La capacité de l\'État (Weberianness) est le prédicteur #1 de la croissance à long terme — plus que les ressources naturelles' },
      { source: 'OECD', title: 'Revenue Statistics in Africa', year: 2026, keyInsight: 'La TVA représente 50% des recettes fiscales africaines — optimisation possible via digitalisation et facturation électronique' },
    ],
    transpositionGaps: [
      { gap: 'Capacité de l\'État', severity: 'critique', description: 'Indice de capacité étatique (Weberianness) <40/100 en UEMOA vs 85 en Europe — formation, systèmes, rétention des talents' },
      { gap: 'Fiscalisation du secteur informel', severity: 'critique', description: '55-80% d\'informalité économique — les modèles de fiscalisation simplifiée (régime du réel simplifié, CMU, taxe professionnelle synthétique) sont sous-performants' },
      { gap: 'Évaluation des politiques publiques', severity: 'majeur', description: 'Culture de l\'évaluation quasi inexistante — les décisions budgétaires reposent rarement sur des données d\'impact' },
      { gap: 'Digitalisation des services publics', severity: 'majeur', description: 'Les plateformes e-gouvernement existent mais l\'interopérabilité est nulle — chaque ministère développe en silo' },
      { gap: 'Décentralisation effective', severity: 'modéré', description: 'La décentralisation est constitutionnelle mais pas budgétaire — les collectivités gèrent <5% des dépenses publiques' },
    ],
    khepraInnovationLevers: [
      { lever: 'Programme de renforcement de la capacité étatique', description: 'Méthodologie de diagnostic de la capacité institutionnelle (inspirée WB B-READY) et plan de transformation sur 3 ans pour ministères et agences', impact: 88, timeline: '12-24 mois' },
      { lever: 'Plateforme de fiscalisation du secteur informel', description: 'Solution mobile-first combinant facturation électronique simplifiée, paiement mobile money et scoring fiscal pour micro-entreprises', impact: 85, timeline: '9-18 mois' },
      { lever: 'Observatoire des politiques publiques basées sur les preuves', description: 'Système de suivi-évaluation continu des politiques publiques avec RCT/quasi-expérimentales — production de Policy Briefs pour décideurs', impact: 82, timeline: 'En continu' },
    ],
    maturityScore: 70,
    lastUpdated: '2026-06-27',
  },
];

// ── PROTOCOLE D'AUTO-APPRENTISSAGE SYSTÉMIQUE (INTERNAL MEMORY) ──
export interface InternalMemoryEntry {
  fckId: string;
  dateCaptured: string;
  triggerAgent: string;
  axeSectoriel: string;
  refScientifiqueMondiale: string;
  ecartTransposition: string;
  levierInnovationRetenu: string;
  impactKOS: 'faible' | 'moyen' | 'fort' | 'transformateur';
  status: 'active' | 'archived' | 'pending_review';
  color: string;
}

export const INTERNAL_MEMORY_REGISTRY: InternalMemoryEntry[] = [
  {
    fckId: 'FCK-IM-001',
    dateCaptured: '2026-06-10',
    triggerAgent: 'KOS Regulatory Scout',
    axeSectoriel: 'FinTech & Inclusion Financière',
    refScientifiqueMondiale: 'BIS (2025) — Financial Stability Implications of FinTech in Emerging Markets : le cadre réglementaire doit équilibrer innovation et stabilité via des exigences de fonds propres proportionnées',
    ecartTransposition: 'L\'instruction BCEAO sur les Établissements de Monnaie Électronique impose un capital minimum unique sans graduation selon le volume — contredit la recommandation BIS de proportionnalité',
    levierInnovationRetenu: 'Proposer un capital minimum progressif à 3 paliers (émetteur < 10M tx/an, 10-50M, >50M) aligné BIS et benchmark Kenya/Nigeria',
    impactKOS: 'fort',
    status: 'active',
    color: '#1565C0',
  },
  {
    fckId: 'FCK-IM-002',
    dateCaptured: '2026-06-12',
    triggerAgent: 'KOS ESG Sustainability Command',
    axeSectoriel: 'Agro-Business & Sécurité Alimentaire',
    refScientifiqueMondiale: 'IFPRI (2025) — Global Food Policy Report : l\'assurance indicielle réduit la volatilité des revenus agricoles de 40% dans les zones sahéliennes',
    ecartTransposition: 'Le marché de l\'assurance agricole indicielle en UEMOA couvre <2% des exploitants — absence de données météorologiques granulaires et de réseau de distribution',
    levierInnovationRetenu: 'Partnership avec Tomorrow.io/The Weather Company pour données météo hyper-locales + distribution via SFD et coopératives',
    impactKOS: 'transformateur',
    status: 'active',
    color: '#2E7D32',
  },
  {
    fckId: 'FCK-IM-003',
    dateCaptured: '2026-06-15',
    triggerAgent: 'KOS Knowledge Graph',
    axeSectoriel: 'IA & Data',
    refScientifiqueMondiale: 'Masakhane/DeepMind (2026) — NLP for African Languages : les LLMs monolingues africains (Yoruba, Wolof, Bambara) performent 50% mieux que les modèles multilingues',
    ecartTransposition: 'KOS utilise exclusivement des LLMs occidentaux multilingues — hallucinations et imprécisions sur les concepts juridiques OHADA et termes fiscaux locaux',
    levierInnovationRetenu: 'Fine-tuner un modèle open-source (Mistral 7B) sur corpus BCEAO/COBAC/OHADA + terminologie fiscale UEMOA — projet KOS LLM Afrique',
    impactKOS: 'transformateur',
    status: 'pending_review',
    color: '#7C3AED',
  },
  {
    fckId: 'FCK-IM-004',
    dateCaptured: '2026-06-18',
    triggerAgent: 'KOS Regulatory Quality Assurance Engine',
    axeSectoriel: 'Politiques Publiques & Gouvernance',
    refScientifiqueMondiale: 'Brookings AGI (2026) — Governance and State Capacity in Africa : la capacité de l\'État est le prédicteur #1 de la croissance à long terme',
    ecartTransposition: 'Les diagnostics KOS actuels mesurent la conformité réglementaire mais pas la capacité institutionnelle (capacité d\'exécution, de coordination, d\'apprentissage)',
    levierInnovationRetenu: 'Ajouter un module "Capacité Institutionnelle" (scoring Weberianness × 8 dimensions) au diagnostic 360 — inspiré WB B-READY et Brookings AGI',
    impactKOS: 'fort',
    status: 'active',
    color: '#5D4037',
  },
  {
    fckId: 'FCK-IM-005',
    dateCaptured: '2026-06-20',
    triggerAgent: 'KOS Regulatory Scout',
    axeSectoriel: 'Infrastructures & BTP',
    refScientifiqueMondiale: 'GI Hub/G20 (2026) — Infrastructure Monitor : les mécanismes de rehaussement de crédit (guarantees, first-loss) multiplient par 3 l\'attraction de capitaux privés',
    ecartTransposition: 'Le FAGACE et la BOAD offrent des garanties mais les processus d\'approbation sont longs (12-18 mois) et la standardisation des contrats est absente',
    levierInnovationRetenu: 'Développer un template de contrat de garantie partielle standardisée (modèle MIGA/IDA Private Sector Window) adapté au droit OHADA',
    impactKOS: 'fort',
    status: 'active',
    color: '#D84315',
  },
  {
    fckId: 'FCK-IM-006',
    dateCaptured: '2026-06-22',
    triggerAgent: 'KOS Automaton Engine',
    axeSectoriel: 'FinTech & Inclusion Financière',
    refScientifiqueMondiale: 'Harvard Kennedy School (2025) — AI-Driven Credit Scoring : les modèles ML surpassent les scores traditionnels de 40% pour les emprunteurs "thin-file"',
    ecartTransposition: 'La BCEAO et la COBAC n\'ont pas encore publié de guidelines sur l\'utilisation de l\'IA en credit scoring — les SFD restent sur des méthodes manuelles',
    levierInnovationRetenu: 'Produire un Position Paper "IA & Credit Scoring en zone UEMOA" avec cadre de gouvernance algorithmique proposé aux régulateurs',
    impactKOS: 'moyen',
    status: 'pending_review',
    color: '#1565C0',
  },
  {
    fckId: 'FCK-IM-007',
    dateCaptured: '2026-06-25',
    triggerAgent: 'KOS Content Factory Command',
    axeSectoriel: 'IA & Data',
    refScientifiqueMondiale: 'Stanford HAI (2026) — AI Index Report : l\'Afrique concentre 0.3% des investissements IA mondiaux — le gap d\'infrastructure de calcul est le frein structurel #1',
    ecartTransposition: 'KOS dépend entièrement des API LLM extra-africaines — coûts récurrents élevés, latence, dépendance géopolitique, pas de souveraineté des données',
    levierInnovationRetenu: 'Lancer le projet KOS Edge AI — inférence locale sur serveurs Khepra avec modèles open-source quantifiés (GGUF) pour les tâches critiques',
    impactKOS: 'transformateur',
    status: 'active',
    color: '#7C3AED',
  },
];

// ── AUDIT TRAIL — Cycles d'auto-apprentissage ──
export interface AuditCycle {
  cycleId: string;
  date: string;
  type: 'full' | 'incremental' | 'corrective';
  kbrPublicationsAudited: number;
  newFCKsGenerated: number;
  hallucinationsDetected: number;
  hallucinationsCorrected: number;
  knowledgeGapsIdentified: number;
  memoryDensityBefore: number;
  memoryDensityAfter: number;
  topFinding: string;
}

export const AUDIT_CYCLES: AuditCycle[] = [
  {
    cycleId: 'AUDIT-042',
    date: '2026-06-27',
    type: 'full',
    kbrPublicationsAudited: 247,
    newFCKsGenerated: 8,
    hallucinationsDetected: 3,
    hallucinationsCorrected: 3,
    knowledgeGapsIdentified: 12,
    memoryDensityBefore: 87,
    memoryDensityAfter: 94,
    topFinding: 'Les articles sur la ZLECAF sous-estiment systématiquement les barrières non-tarifaires — FCK-IM-008 créée avec benchmark OMC/CNUCED',
  },
  {
    cycleId: 'AUDIT-041',
    date: '2026-06-20',
    type: 'incremental',
    kbrPublicationsAudited: 189,
    newFCKsGenerated: 5,
    hallucinationsDetected: 2,
    hallucinationsCorrected: 2,
    knowledgeGapsIdentified: 7,
    memoryDensityBefore: 82,
    memoryDensityAfter: 87,
    topFinding: 'Gap identifié : les analyses ESG ne référencent pas les TNFD (Taskforce on Nature-related Financial Disclosures) — intégré via FCK-IM-005',
  },
  {
    cycleId: 'AUDIT-040',
    date: '2026-06-13',
    type: 'full',
    kbrPublicationsAudited: 235,
    newFCKsGenerated: 11,
    hallucinationsDetected: 4,
    hallucinationsCorrected: 4,
    knowledgeGapsIdentified: 15,
    memoryDensityBefore: 74,
    memoryDensityAfter: 82,
    topFinding: 'Découverte critique : 4 articles référençaient des instructions BCEAO abrogées — correction immédiate + renforcement du protocole de vérification',
  },
];

// ── KPIs SCIENTIFIQUES ──
export interface ScientificKPI {
  id: string;
  name: string;
  category: 'sourcing' | 'synthesis' | 'auto_learning' | 'impact';
  current: number;
  target: number;
  unit: string;
  trend: number;
  icon: string;
  color: string;
}

export const SCIENTIFIC_DIRECTOR_KPIS: ScientificKPI[] = [
  { id: 'source-quality', name: 'Qualité des Sources', category: 'sourcing', current: 96, target: 99, unit: '% top-tier', trend: 3, icon: 'ri-star-line', color: '#F59E0B' },
  { id: 'source-coverage', name: 'Couverture Universitaire', category: 'sourcing', current: 178, target: 200, unit: 'universités', trend: 12, icon: 'ri-building-4-line', color: '#0EA5E9' },
  { id: 'journal-impact', name: 'Impact Factor Moyen', category: 'sourcing', current: 7.2, target: 8.5, unit: 'IF', trend: 0.4, icon: 'ri-bar-chart-2-line', color: '#8B5CF6' },
  { id: 'thinktank-citations', name: 'Citations Think Tanks', category: 'sourcing', current: 84, target: 95, unit: '%', trend: 5, icon: 'ri-lightbulb-line', color: '#EC4899' },
  { id: 'sector-synthesis', name: 'Synthèses Sectorielles', category: 'synthesis', current: 5, target: 8, unit: 'secteurs', trend: 2, icon: 'ri-stack-line', color: '#10B981' },
  { id: 'transposition-accuracy', name: 'Précision Transposition', category: 'synthesis', current: 88, target: 95, unit: '%', trend: 3, icon: 'ri-focus-3-line', color: '#14B8A6' },
  { id: 'fck-generation', name: 'FCK Générées', category: 'auto_learning', current: 7, target: 12, unit: 'FCK/mois', trend: 3, icon: 'ri-file-code-line', color: '#6366F1' },
  { id: 'hallucination-rate', name: 'Taux Hallucination', category: 'auto_learning', current: 0.8, target: 0.2, unit: '%', trend: -0.3, icon: 'ri-shield-flash-line', color: '#EF4444' },
  { id: 'memory-density', name: 'Densité Mémoire', category: 'auto_learning', current: 94, target: 99, unit: '/100', trend: 7, icon: 'ri-database-2-line', color: '#F97316' },
  { id: 'policy-influence', name: 'Influence Politique', category: 'impact', current: 28, target: 50, unit: 'citations', trend: 6, icon: 'ri-government-line', color: '#78716C' },
  { id: 'academic-citations', name: 'Citations Académiques', category: 'impact', current: 312, target: 500, unit: 'citations', trend: 45, icon: 'ri-quote-text', color: '#F59E0B' },
  { id: 'innovation-levers', name: 'Leviers Innovation', category: 'impact', current: 15, target: 25, unit: 'leviers', trend: 5, icon: 'ri-rocket-line', color: '#10B981' },
];

// ── MÉTRIQUES GLOBALES ──
export const SCIENTIFIC_DIRECTOR_GLOBALS = {
  totalPublicationsAudited: 247,
  totalFCKsIndexed: 7,
  activeInnovationLevers: 15,
  universitiesTracked: 178,
  journalsMonitored: 14,
  thinkTanksFollowed: 9,
  sectorsCovered: 5,
  lastFullAudit: '2026-06-27',
  nextFullAudit: '2026-07-04',
  systemLearningRate: 8.4,
  autonomousMemoryDensity: 94,
};





