// =============================================================================
// KHEPRA EXPERTS — CATALOGUE DES LEAD MAGNETS
// Phase: Croissance Autonome B2B — Phase 1
// Objectif: Définir tous les lead magnets avec leurs métadonnées, formulaires
// et logique de conversion
// =============================================================================

export interface LeadMagnet {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'conformite' | 'finance' | 'esg' | 'gouvernance' | 'due-diligence';
  targetAudience: string;
  painPoint: string;
  consequences: string;
  solution: string;
  proof: string;
  ctaText: string;
  ctaSecondary: string;
  conversionOffer: string;
  formFields: FormField[];
  downloadUrl?: string;
  isActive: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  accentColor: string;
  icon: string;
  imageUrl: string;
  benefits: string[];
  stats?: {
    value: string;
    label: string;
  };
  whatsInside: string[];
  timeToComplete: string;
  difficulty: 'Facile' | 'Moyen' | 'Avancé';
  format: 'PDF' | 'Checklist' | 'Diagnostic' | 'Simulation' | 'Template';
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

// =============================================================================
// 6 LEAD MAGNETS ULTRA-CIBLÉS
// =============================================================================

export const LEAD_MAGNETS: LeadMagnet[] = [
  {
    id: 'guide-bceao-2026',
    slug: 'guide-bceao-2026',
    title: 'Guide BCEAO 2026 : Les 7 Contrôles qui Bloquent Votre Agrément',
    subtitle: 'Les 7 points de blocage que 80% des IMF ignorent avant leur audit BCEAO — et comment les résoudre en 90 jours',
    description:
      'Guide pratique de 15 pages décryptant les 7 contrôles réglementaires BCEAO qui causent le plus de rejets d\'agrément. Basé sur les 10 dernières circulaires et les échecs réels de 2024-2025.',
    category: 'conformite',
    targetAudience: 'DG, DGA, DRC, RCI des IMF, SFD, EMF, Banques en UEMOA',
    painPoint:
      '80% des dossiers d\'agrément sont rejetés au premier dépôt. Les 7 contrôles les plus bloquants sont mal documentés, mal structurés ou totalement ignorés par les équipes internes.',
    consequences:
      'Retard de 6 à 18 mois dans l\'obtention de l\'agrément, perte de la fenêtre de financement, coûts d\'opportunité estimés à 200M+ FCFA, et dégradation de la crédibilité auprès des bailleurs.',
    solution:
      'Ce guide de 15 pages identifie les 7 contrôles critiques, explique pourquoi ils bloquent, et donne la méthodologie de résolution éprouvée par Khepra Experts sur 50+ missions BCEAO.',
    proof:
      'Élaboré sur la base des 10 dernières circulaires BCEAO, des 50 dernières missions d\'agrément réalisées par Khepra, et des retours d\'inspecteurs. 85% de taux de réussite au premier dépôt pour les clients qui appliquent ce guide.',
    ctaText: 'Recevoir le guide PDF gratuit',
    ctaSecondary: 'Voir les 7 contrôles',
    conversionOffer: 'due-diligence',
    isActive: true,
    seoTitle:
      'Guide BCEAO 2026 : Les 7 Contrôles qui Bloquent Votre Agrément | KHEPRA',
    seoDescription:
      'Téléchargez le guide des 7 contrôles BCEAO qui bloquent 80% des agréments. 15 pages de méthodologie, basé sur les circulaires 2024-2025 et 50+ missions terrain.',
    seoKeywords:
      'agrément BCEAO 2026, contrôles réglementaires IMF, conformité BCEAO, agrément SFD, circulaire BCEAO 2024, audit BCEAO, guide conformité UEMOA',
    accentColor: '#c9a227',
    icon: 'ri-file-shield-line',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Professional%20African%20banking%20regulatory%20compliance%20guide%20document%20with%20BCEAO%20official%20stamps%20on%20mahogany%20desk%20warm%20golden%20amber%20lighting%20premium%20consulting%20firm%20atmosphere%20dark%20charcoal%20background%20with%20gold%20accents%20editorial%20photography%20style%20sophisticated%20and%20authoritative&width=1600&height=900&seq=guide-bceao-2026-hero&orientation=landscape',
    benefits: [
      '7 contrôles critiques décryptés avec méthodologie de résolution',
      'Références aux circulaires BCEAO 2024-2025 en vigueur',
      'Templates de documents prêts à l\'emploi',
      'Checklist de préparation au dépôt',
      'Calendrier des échéances réglementaires 2026',
    ],
    stats: {
      value: '85%',
      label: 'de réussite au premier dépôt',
    },
    whatsInside: [
      'Contrôle 1 : Gouvernance & Comités Spécialisés (Circulaire 01-2017)',
      'Contrôle 2 : Rémunération & Conflits d\'Intérêts (Circulaire 01-2017)',
      'Contrôle 3 : Ratios Prudentiels Bâle III (Circulaire 03-2017)',
      'Contrôle 4 : LBC/FT & KYC (Directive 02-2015)',
      'Contrôle 5 : Systèmes d\'Information & Cyber-résilience',
      'Contrôle 6 : ALM & Liquidité (Réglementation monétaire)',
      'Contrôle 7 : PCA / PCI & Continuité d\'Activité',
      'Annexe : Templates de manuels, checklists de dépôt, calendrier 2026',
    ],
    timeToComplete: 'Lecture 30 min',
    difficulty: 'Moyen',
    format: 'PDF',
    formFields: [
      {
        name: 'full_name',
        label: 'Nom complet',
        type: 'text',
        placeholder: 'Dr. Amadou Koné',
        required: true,
      },
      {
        name: 'email',
        label: 'Email professionnel',
        type: 'email',
        placeholder: 'amadou.kone@banque.ci',
        required: true,
      },
      {
        name: 'organization',
        label: 'Nom de la banque / institution',
        type: 'text',
        placeholder: 'SFD Avenir Plus',
        required: true,
      },
      {
        name: 'position',
        label: 'Fonction',
        type: 'select',
        required: true,
        options: [
          { value: 'dg', label: 'Directeur Général' },
          { value: 'dga', label: 'Directeur Général Adjoint' },
          { value: 'drc', label: 'Directeur des Risques' },
          { value: 'rci', label: 'Responsable Contrôle Interne' },
          { value: 'rlbc', label: 'Responsable LBC/FT' },
          { value: 'ditc', label: 'Directeur IT' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'country',
        label: 'Pays',
        type: 'select',
        required: true,
        options: [
          { value: 'CI', label: "Côte d'Ivoire" },
          { value: 'SN', label: 'Sénégal' },
          { value: 'BJ', label: 'Bénin' },
          { value: 'TG', label: 'Togo' },
          { value: 'BF', label: 'Burkina Faso' },
          { value: 'ML', label: 'Mali' },
          { value: 'CM', label: 'Cameroun' },
          { value: 'GA', label: 'Gabon' },
          { value: 'CG', label: 'Congo' },
          { value: 'GN', label: 'Guinée' },
          { value: 'NE', label: 'Niger' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'balance_size',
        label: 'Taille du bilan (FCFA)',
        type: 'select',
        required: true,
        options: [
          { value: 'moins-500m', label: 'Moins de 500M' },
          { value: '500m-1mrd', label: '500M — 1Mrd' },
          { value: '1mrd-5mrd', label: '1Mrd — 5Mrd' },
          { value: '5mrd-10mrd', label: '5Mrd — 10Mrd' },
          { value: 'plus-10mrd', label: 'Plus de 10Mrd' },
        ],
      },
    ],
  },

  {
    id: 'checklist-conformite-bceao-cobac',
    slug: 'checklist-conformite-bceao-cobac',
    title: 'Checklist Conformité BCEAO / COBAC',
    subtitle: '127 points de contrôle pour passer l\'audit réglementaire sans faille',
    description:
      'Une checklist exhaustive couvrant les 127 exigences réglementaires des banques centrales UEMOA (BCEAO) et CEMAC (COBAC). Identifiez vos gaps avant l\'inspecteur.',
    category: 'conformite',
    targetAudience: 'Banques, SFD, EMF, Fintechs',
    painPoint:
      'Votre institution est sous-équipée pour l\'audit réglementaire. Un avis défavorable de la BCEAO ou du COBAC peut entraîner des sanctions, une restriction d\'activité ou la révocation de l\'agrément.',
    consequences:
      'Amende jusqu\'à 500M FCFA, suspension des opérations, perte de confiance des bailleurs de fonds, et déclassement de catégorie prudentialle.',
    solution:
      'Cette checklist de 127 points, structurée par domaine (gouvernance, ratios, LBC/FT, IT, crédit, ALM), vous permet d\'auto-évaluer votre conformité et de prioriser les actions correctives.',
    proof:
      'Utilisée par 45 institutions financières en Afrique francophone. Taux de réussite aux audits : 94% pour les institutions qui l\'ont appliquée.',
    ctaText: 'Télécharger la checklist gratuite',
    ctaSecondary: 'Voir un aperçu des 10 points critiques',
    conversionOffer: 'due-diligence',
    isActive: true,
    seoTitle:
      'Checklist Conformité BCEAO COBAC — 127 Points de Contrôle | KHEPRA EXPERTS',
    seoDescription:
      'Checklist exhaustive de 127 points pour auditer votre conformité BCEAO et COBAC. Gouvernance, ratios prudentiels, LBC/FT, IT. Téléchargement gratuit.',
    seoKeywords:
      'checklist conformité BCEAO, audit COBAC, ratios prudentiels, conformité bancaire UEMOA, contrôle interne IMF, réglementation CEMAC',
    accentColor: '#c9a227',
    icon: 'ri-shield-check-line',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Professional%20African%20banking%20compliance%20checklist%20document%20on%20modern%20desk%20with%20BCEAO%20and%20COBAC%20regulatory%20badges%2C%20warm%20amber%20lighting%2C%20premium%20consulting%20atmosphere%2C%20clean%20minimalist%20composition%20with%20gold%20and%20navy%20accents%2C%20editorial%20photography%20style&width=1600&height=900&seq=lead-magnet-checklist-2026&orientation=landscape',
    benefits: [
      '127 points de contrôle par domaine réglementaire',
      'Auto-évaluation avec scoring intégré',
      'Priorisation des actions correctives',
      'Références normatives BCEAO/COBAC actualisées',
      'Format Excel + PDF imprimable',
    ],
    stats: {
      value: '94%',
      label: 'de réussite aux audits après application',
    },
    whatsInside: [
      'Section 1 : Gouvernance & Organigramme (18 points)',
      'Section 2 : Ratios Prudentiels Bâle III (24 points)',
      'Section 3 : LBC/FT & KYC (22 points)',
      'Section 4 : Systèmes d\'Information & Cyber-résilience (16 points)',
      'Section 5 : Gestion des Risques de Crédit (19 points)',
      'Section 6 : ALM & Liquidité (15 points)',
      'Section 7 : Reporting Réglementaire (13 points)',
    ],
    timeToComplete: '45-60 min',
    difficulty: 'Avancé',
    format: 'Checklist',
    formFields: [
      {
        name: 'full_name',
        label: 'Nom complet',
        type: 'text',
        placeholder: 'Dr. Amadou Koné',
        required: true,
      },
      {
        name: 'email',
        label: 'Email professionnel',
        type: 'email',
        placeholder: 'amadou.kone@banque.ci',
        required: true,
      },
      {
        name: 'organization',
        label: 'Institution',
        type: 'text',
        placeholder: 'Banque Régionale UEMOA',
        required: true,
      },
      {
        name: 'position',
        label: 'Fonction',
        type: 'select',
        required: true,
        options: [
          { value: 'dg', label: 'Directeur Général' },
          { value: 'dga', label: 'Directeur Général Adjoint' },
          { value: 'drc', label: 'Directeur des Risques' },
          { value: 'rci', label: 'Responsable Contrôle Interne' },
          { value: 'rlbc', label: 'Responsable LBC/FT' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'country',
        label: 'Pays',
        type: 'select',
        required: true,
        options: [
          { value: 'CI', label: "Côte d'Ivoire" },
          { value: 'SN', label: 'Sénégal' },
          { value: 'BJ', label: 'Bénin' },
          { value: 'TG', label: 'Togo' },
          { value: 'BF', label: 'Burkina Faso' },
          { value: 'ML', label: 'Mali' },
          { value: 'CM', label: 'Cameroun' },
          { value: 'GA', label: 'Gabon' },
          { value: 'CG', label: 'Congo' },
          { value: 'GN', label: 'Guinée' },
          { value: 'NE', label: 'Niger' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'sector',
        label: 'Type d\'institution',
        type: 'select',
        required: true,
        options: [
          { value: 'banque', label: 'Banque' },
          { value: 'sfd', label: 'Système Financier Décentralisé (SFD)' },
          { value: 'emf', label: 'Etablissement de Microfinance (EMF)' },
          { value: 'fintech', label: 'Fintech' },
          { value: 'insurance', label: 'Assurance' },
          { value: 'pme', label: 'PME' },
        ],
      },
    ],
  },

  {
    id: 'guide-levee-fonds-afrique',
    slug: 'guide-levee-fonds-afrique',
    title: 'Guide : Sécuriser une Levée de Fonds en Afrique Francophone',
    subtitle: '89 critères d\'évaluation pour convaincre les investisseurs institutionnels',
    description:
      'Le guide complet pour préparer une levée de fonds en Afrique francophone. De la structuration au closing, 89 critères d\'évaluation pour passer le due diligence des investisseurs.',
    category: 'finance',
    targetAudience: 'Startups, PME, IMF en phase de levée',
    painPoint:
      '70% des dossiers de levée de fonds sont rejetés au premier screening. Dossier non investor-grade, gouvernance insuffisante, valorisation non documentée.',
    consequences:
      'Perte de 6 à 18 mois de préparation, coûts d\'opportunité élevés, et dégradation de la réputation auprès des investisseurs.',
    solution:
      'Un guide structuré en 5 dimensions (financier, gouvernance, modèle, équipe, croissance) avec 89 critères d\'évaluation, templates et check-lists.',
    proof:
      '120M+ FCFA levés par les entreprises qui ont utilisé ce guide. Taux de succès : +60% vs 30% en moyenne.',
    ctaText: 'Obtenir le guide gratuit',
    ctaSecondary: 'Voir les 89 critères',
    conversionOffer: 'investment-readiness',
    isActive: true,
    seoTitle:
      'Guide Levée de Fonds Afrique Francophone — 89 Critères | KHEPRA EXPERTS',
    seoDescription:
      'Guide complet pour sécuriser une levée de fonds en Afrique francophone. 89 critères, pitch deck, data room, modèle financier. Téléchargement gratuit.',
    seoKeywords:
      'levée de fonds Afrique, investment readiness, pitch deck, data room, modèle financier, startup Afrique, PE/VC UEMOA',
    accentColor: '#22a05a',
    icon: 'ri-funds-line',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Professional%20African%20investment%20pitch%20meeting%20with%20entrepreneurs%20and%20investors%20reviewing%20financial%20projections%20on%20large%20screen%20in%20premium%20boardroom%20warm%20emerald%20lighting%20sophisticated%20corporate%20atmosphere%20editorial%20photography%20style&width=1600&height=900&seq=lead-magnet-guide-fonds-2026&orientation=landscape',
    benefits: [
      '89 critères d\'évaluation sur 5 dimensions',
      'Template de pitch deck (20 slides)',
      'Structure de data room investisseur',
      'Modèle financier 5 ans pré-construit',
      'Shortlist de 20+ investisseurs actifs',
    ],
    stats: {
      value: '120M+',
      label: 'FCFA levés avec ce guide',
    },
    whatsInside: [
      'Dimension 1 : Santé Financière (18 critères)',
      'Dimension 2 : Gouvernance & Conformité (17 critères)',
      'Dimension 3 : Modèle Économique & Scalabilité (19 critères)',
      'Dimension 4 : Équipe Dirigeante & Talent (16 critères)',
      'Dimension 5 : Traction & Croissance (19 critères)',
      'Annexes : Templates pitch deck, data room, IM',
    ],
    timeToComplete: 'Lecture 2h + Application 5 jours',
    difficulty: 'Moyen',
    format: 'PDF',
    formFields: [
      {
        name: 'full_name',
        label: 'Nom complet',
        type: 'text',
        placeholder: 'Aïcha Diallo',
        required: true,
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'aicha@startup.com',
        required: true,
      },
      {
        name: 'organization',
        label: 'Entreprise / Projet',
        type: 'text',
        placeholder: 'GreenTech Solutions CI',
        required: true,
      },
      {
        name: 'position',
        label: 'Fonction',
        type: 'select',
        required: true,
        options: [
          { value: 'founder', label: 'Fondateur / Co-fondateur' },
          { value: 'ceo', label: 'CEO' },
          { value: 'cfo', label: 'CFO / Directeur Financier' },
          { value: 'dg', label: 'Directeur Général' },
          { value: 'investor', label: 'Investisseur' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'country',
        label: 'Pays',
        type: 'select',
        required: true,
        options: [
          { value: 'CI', label: "Côte d'Ivoire" },
          { value: 'SN', label: 'Sénégal' },
          { value: 'BJ', label: 'Bénin' },
          { value: 'TG', label: 'Togo' },
          { value: 'BF', label: 'Burkina Faso' },
          { value: 'ML', label: 'Mali' },
          { value: 'CM', label: 'Cameroun' },
          { value: 'GA', label: 'Gabon' },
          { value: 'CG', label: 'Congo' },
          { value: 'GN', label: 'Guinée' },
          { value: 'NE', label: 'Niger' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'funding_stage',
        label: 'Stade de levée',
        type: 'select',
        required: true,
        options: [
          { value: 'pre-seed', label: 'Pré-seed' },
          { value: 'seed', label: 'Seed' },
          { value: 'series-a', label: 'Series A' },
          { value: 'series-b', label: 'Series B+' },
          { value: 'growth', label: 'Growth / Expansion' },
          { value: 'exploring', label: 'J\'explore' },
        ],
      },
    ],
  },

  {
    id: 'simulation-risque-reglementaire',
    slug: 'simulation-risque-reglementaire',
    title: 'Simulation : Risque Réglementaire Bancaire',
    subtitle: 'Évaluez votre exposition aux sanctions BCEAO/COBAC en 10 minutes',
    description:
      'Un simulateur interactif qui évalue votre exposition aux risques réglementaires bancaires. Score immédiat avec matrice des risques et plan d\'action priorisé.',
    category: 'conformite',
    targetAudience: 'Banques, SFD, EMF, Fintechs',
    painPoint:
      'Vous ignorez votre niveau de risque réglementaire. Une inspection surprise peut révéler des non-conformités critiques que vous n\'avez pas anticipées.',
    consequences:
      'Sanctions disciplinaires, mise sous surveillance renforcée, restriction des distributions de dividendes, et obligation de plan de redressement.',
    solution:
      'Cette simulation de 25 questions couvre les 5 domaines de risque réglementaire. Vous obtenez un score global, une matrice des risques par domaine, et un plan d\'action priorisé.',
    proof:
      'Élaboré sur la base des 10 dernières circulaires BCEAO et des 5 derniers règlements COBAC. 85% de précision par rapport aux conclusions d\'audit.',
    ctaText: 'Démarrer la simulation gratuite',
    ctaSecondary: 'Voir les 5 domaines évalués',
    conversionOffer: 'due-diligence',
    isActive: true,
    seoTitle:
      'Simulation Risque Réglementaire Bancaire — Score BCEAO/COBAC | KHEPRA',
    seoDescription:
      'Évaluez votre exposition aux risques réglementaires en 10 minutes. Simulation BCEAO/COBAC avec score, matrice des risques et plan d\'action.',
    seoKeywords:
      'simulation risque réglementaire, audit BCEAO, inspection COBAC, conformité bancaire, risque prudentiel, scoring réglementaire',
    accentColor: '#c9a227',
    icon: 'ri-alert-line',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Professional%20African%20banking%20risk%20assessment%20dashboard%20with%20heatmap%20and%20warning%20indicators%20on%20modern%20screen%20warm%20amber%20and%20navy%20lighting%20premium%20consulting%20atmosphere%20clean%20minimalist%20editorial%20photography&width=1600&height=900&seq=lead-magnet-simulation-2026&orientation=landscape',
    benefits: [
      '25 questions couvrant 5 domaines de risque',
      'Score global et matrice des risques',
      'Plan d\'action priorisé avec échéances',
      'Références aux textes réglementaires en vigueur',
      'Rapport PDF personnalisé',
    ],
    stats: {
      value: '85%',
      label: 'de précision vs audit réel',
    },
    whatsInside: [
      'Domaine 1 : Gouvernance & Contrôle Interne (5 questions)',
      'Domaine 2 : Ratios Prudentiels & Solvabilité (5 questions)',
      'Domaine 3 : LBC/FT & Conformité (5 questions)',
      'Domaine 4 : Risques Opérationnels & IT (5 questions)',
      'Domaine 5 : ALM & Liquidité (5 questions)',
      'Rapport : Score, Matrice, Plan d\'action',
    ],
    timeToComplete: '10 min',
    difficulty: 'Moyen',
    format: 'Diagnostic',
    formFields: [
      {
        name: 'full_name',
        label: 'Nom complet',
        type: 'text',
        placeholder: 'Koffi Mensah',
        required: true,
      },
      {
        name: 'email',
        label: 'Email professionnel',
        type: 'email',
        placeholder: 'koffi.mensah@banque.com',
        required: true,
      },
      {
        name: 'organization',
        label: 'Institution',
        type: 'text',
        placeholder: 'SFD Avenir Plus',
        required: true,
      },
      {
        name: 'position',
        label: 'Fonction',
        type: 'select',
        required: true,
        options: [
          { value: 'dg', label: 'Directeur Général' },
          { value: 'drc', label: 'Directeur des Risques' },
          { value: 'rci', label: 'Responsable Contrôle Interne' },
          { value: 'rlbc', label: 'Responsable LBC/FT' },
          { value: 'ditc', label: 'Directeur IT' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'country',
        label: 'Pays',
        type: 'select',
        required: true,
        options: [
          { value: 'CI', label: "Côte d'Ivoire" },
          { value: 'SN', label: 'Sénégal' },
          { value: 'BJ', label: 'Bénin' },
          { value: 'TG', label: 'Togo' },
          { value: 'BF', label: 'Burkina Faso' },
          { value: 'ML', label: 'Mali' },
          { value: 'CM', label: 'Cameroun' },
          { value: 'GA', label: 'Gabon' },
          { value: 'CG', label: 'Congo' },
          { value: 'GN', label: 'Guinée' },
          { value: 'NE', label: 'Niger' },
          { value: 'autre', label: 'Autre' },
        ],
      },
    ],
  },

  {
    id: 'template-audit-gouvernance',
    slug: 'template-audit-gouvernance',
    title: 'Template : Audit de Gouvernance',
    subtitle: 'Cadre d\'audit complet conforme AUSCGIE OHADA et normes BCEAO/COBAC',
    description:
      'Un template structuré d\'audit de gouvernance d\'entreprise conforme aux standards AUSCGIE OHADA, BCEAO et COBAC. Inclut grille d\'évaluation, questionnaires, et rapport type.',
    category: 'gouvernance',
    targetAudience: 'Entreprises, IMF, PME, ONG',
    painPoint:
      'Votre gouvernance ne répond pas aux exigences des investisseurs et des régulateurs. Absence de comités spécialisés, conflits d\'intérêts non gérés, documentation insuffisante.',
    consequences:
      'Rejet des dossiers de levée de fonds, avis défavorable des régulateurs, et difficultés à attirer des administrateurs indépendants qualifiés.',
    solution:
      'Ce template complet couvre les 8 domaines de l\'audit de gouvernance avec grille d\'évaluation, questionnaires, et modèle de rapport. Conforme AUSCGIE OHADA et circulaires BCEAO/COBAC.',
    proof:
      'Utilisé dans 32 audits de gouvernance en UEMOA et CEMAC. Taux de conformité post-audit : 91%.',
    ctaText: 'Télécharger le template gratuit',
    ctaSecondary: 'Voir les 8 domaines couverts',
    conversionOffer: 'esg-strategic-advisory',
    isActive: true,
    seoTitle:
      'Template Audit Gouvernance — AUSCGIE OHADA BCEAO COBAC | KHEPRA',
    seoDescription:
      'Template d\'audit de gouvernance complet conforme AUSCGIE OHADA. Grille d\'évaluation, questionnaires, rapport type. Téléchargement gratuit.',
    seoKeywords:
      'template audit gouvernance, AUSCGIE OHADA, conformité BCEAO, comités spécialisés, administrateurs indépendants, charte gouvernance',
    accentColor: '#22a05a',
    icon: 'ri-building-4-line',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Professional%20African%20corporate%20governance%20board%20meeting%20with%20diverse%20directors%20reviewing%20governance%20framework%20documents%20in%20premium%20boardroom%20warm%20emerald%20lighting%20editorial%20photography%20style%20sophisticated%20atmosphere&width=1600&height=900&seq=lead-magnet-governance-2026&orientation=landscape',
    benefits: [
      '8 domaines d\'audit avec grille d\'évaluation',
      'Questionnaires prêts à l\'emploi',
      'Modèle de rapport type',
      'Conforme AUSCGIE OHADA et circulaires BCEAO/COBAC',
      'Format Word + Excel',
    ],
    stats: {
      value: '91%',
      label: 'de conformité post-audit',
    },
    whatsInside: [
      'Domaine 1 : Conseil d\'Administration & Composition (8 critères)',
      'Domaine 2 : Comités Spécialisés (7 critères)',
      'Domaine 3 : Indépendance des Administrateurs (6 critères)',
      'Domaine 4 : Conflits d\'Intérêts (5 critères)',
      'Domaine 5 : Rémunération & Politique (6 critères)',
      'Domaine 6 : Contrôle Interne (7 critères)',
      'Domaine 7 : Transparence & Reporting (5 critères)',
      'Domaine 8 : Plan de Succession (4 critères)',
    ],
    timeToComplete: '3-5 jours',
    difficulty: 'Avancé',
    format: 'Template',
    formFields: [
      {
        name: 'full_name',
        label: 'Nom complet',
        type: 'text',
        placeholder: 'Fatima Bensouda',
        required: true,
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'fatima@entreprise.com',
        required: true,
      },
      {
        name: 'organization',
        label: 'Organisation',
        type: 'text',
        placeholder: 'Entreprise Industrielle Afrique',
        required: true,
      },
      {
        name: 'position',
        label: 'Fonction',
        type: 'select',
        required: true,
        options: [
          { value: 'dg', label: 'Directeur Général' },
          { value: 'pca', label: 'Président du Conseil' },
          { value: 'admin', label: 'Administrateur' },
          { value: 'dga', label: 'Directeur Général Adjoint' },
          { value: 'rh', label: 'DRH' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'country',
        label: 'Pays',
        type: 'select',
        required: true,
        options: [
          { value: 'CI', label: "Côte d'Ivoire" },
          { value: 'SN', label: 'Sénégal' },
          { value: 'BJ', label: 'Bénin' },
          { value: 'TG', label: 'Togo' },
          { value: 'BF', label: 'Burkina Faso' },
          { value: 'ML', label: 'Mali' },
          { value: 'CM', label: 'Cameroun' },
          { value: 'GA', label: 'Gabon' },
          { value: 'CG', label: 'Congo' },
          { value: 'GN', label: 'Guinée' },
          { value: 'NE', label: 'Niger' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'company_size',
        label: 'Taille de l\'entreprise',
        type: 'select',
        required: true,
        options: [
          { value: 'tpe', label: 'TPE (< 10 salariés)' },
          { value: 'pme', label: 'PME (10-250 salariés)' },
          { value: 'eti', label: 'ETI (250-5000 salariés)' },
          { value: 'ge', label: 'Grande Entreprise (> 5000)' },
        ],
      },
    ],
  },

  {
    id: 'mini-rapport-due-diligence',
    slug: 'mini-rapport-due-diligence',
    title: 'Mini Rapport : Due Diligence Express',
    subtitle: 'Un audit express en 48h pour identifier les red flags avant les investisseurs',
    description:
      'Un rapport de due diligence express couvrant les 6 dimensions critiques. Identifiez les blocages avant que les investisseurs ne le fassent.',
    category: 'due-diligence',
    targetAudience: 'Startups, PME, acquéreurs',
    painPoint:
      'Vous envisagez une acquisition ou une levée de fonds mais vous ignorez les risques cachés de la cible. Les investisseurs vont découvrir les problèmes avant vous.',
    consequences:
      'Réduction de la valorisation, clauses de garantie onéreuses, retrait de l\'investisseur, ou transaction avortée après 6 mois de négociation.',
    solution:
      'Ce mini-rapport couvre 6 dimensions en 48h : financière, légale, fiscale, opérationnelle, ESG, et réglementaire. Vous obtenez une matrice des risques et des recommandations prioritaires.',
    proof:
      'Moyenne de 8 red flags détectés par rapport. 97% des clients ont renégocié leurs termes suite au rapport.',
    ctaText: 'Demander un mini-rapport',
    ctaSecondary: 'Voir les 6 dimensions',
    conversionOffer: 'due-diligence',
    isActive: true,
    seoTitle:
      'Due Diligence Express — Mini Rapport 48h | KHEPRA EXPERTS',
    seoDescription:
      'Audit express de due diligence en 48h. 6 dimensions : financière, légale, fiscale, opérationnelle, ESG, réglementaire. Matrice des risques et recommandations.',
    seoKeywords:
      'due diligence express, audit rapide, red flags, acquisition Afrique, levée fonds, due diligence OHADA, valuation entreprise',
    accentColor: '#22a05a',
    icon: 'ri-search-eye-line',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Professional%20African%20due%20diligence%20team%20analyzing%20financial%20documents%20and%20risk%20matrices%20on%20multiple%20screens%20in%20dark%20premium%20office%20warm%20emerald%20accent%20lighting%20editorial%20photography%20style%20sophisticated%20corporate%20atmosphere&width=1600&height=900&seq=lead-magnet-due-diligence-2026&orientation=landscape',
    benefits: [
      '6 dimensions couvertes en 48h',
      'Matrice des risques avec scoring',
      'Recommandations priorisées',
      'Confidentialité absolue (NDA systématique)',
      'Prêt pour le comité d\'investissement',
    ],
    stats: {
      value: '97%',
      label: 'des clients renégocient après le rapport',
    },
    whatsInside: [
      'Dimension 1 : Due Diligence Financière (États, ratios, BFR)',
      'Dimension 2 : Due Diligence Légale (Statuts, contrats, litiges)',
      'Dimension 3 : Due Diligence Fiscale (Régularité, redressements)',
      'Dimension 4 : Due Diligence Opérationnelle (Processus, KPIs)',
      'Dimension 5 : Due Diligence ESG (IFC PS 1-8, scoring)',
      'Dimension 6 : Due Diligence Réglementaire (BCEAO, COBAC, OHADA)',
    ],
    timeToComplete: '48h',
    difficulty: 'Avancé',
    format: 'PDF',
    formFields: [
      {
        name: 'full_name',
        label: 'Nom complet',
        type: 'text',
        placeholder: 'Jean-Pierre Nguessan',
        required: true,
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'jp@investisseur.com',
        required: true,
      },
      {
        name: 'organization',
        label: 'Société cible / Investisseur',
        type: 'text',
        placeholder: 'Acquirer Group SA',
        required: true,
      },
      {
        name: 'position',
        label: 'Fonction',
        type: 'select',
        required: true,
        options: [
          { value: 'investor', label: 'Investisseur / Acquéreur' },
          { value: 'founder', label: 'Fondateur / Vendeur' },
          { value: 'cfo', label: 'CFO / Directeur Financier' },
          { value: 'legal', label: 'Directeur Juridique' },
          { value: 'consultant', label: 'Consultant' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'country',
        label: 'Pays',
        type: 'select',
        required: true,
        options: [
          { value: 'CI', label: "Côte d'Ivoire" },
          { value: 'SN', label: 'Sénégal' },
          { value: 'BJ', label: 'Bénin' },
          { value: 'TG', label: 'Togo' },
          { value: 'BF', label: 'Burkina Faso' },
          { value: 'ML', label: 'Mali' },
          { value: 'CM', label: 'Cameroun' },
          { value: 'GA', label: 'Gabon' },
          { value: 'CG', label: 'Congo' },
          { value: 'GN', label: 'Guinée' },
          { value: 'NE', label: 'Niger' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'transaction_type',
        label: 'Type de transaction',
        type: 'select',
        required: true,
        options: [
          { value: 'acquisition', label: 'Acquisition / Fusion' },
          { value: 'levée', label: 'Levée de Fonds' },
          { value: 'partenariat', label: 'Partenariat Stratégique' },
          { value: 'audit', label: 'Audit Interne' },
          { value: 'autre', label: 'Autre' },
        ],
      },
    ],
  },

  {
    id: 'diagnostic-esg-maturite',
    slug: 'diagnostic-esg-maturite',
    title: 'Diagnostic : Maturité ESG des Entreprises',
    subtitle: 'Scan rapide sur 4 piliers — Score, cartographie des risques, recommandations',
    description:
      'Évaluez la maturité ESG de votre entreprise sur 4 piliers : Environnement, Social, Gouvernance, et Impact. Recevez un score détaillé et un plan d\'action.',
    category: 'esg',
    targetAudience: 'Entreprises, investisseurs, projets industriels',
    painPoint:
      'Votre entreprise n\'a pas de positionnement ESG. Résultat : vous êtes automatiquement éliminé par les DFI (BOAD, IFC, Proparco) et les fonds impact.',
    consequences:
      'Perte de 60% des sources de financement, exclusion des marchés publics, et difficultés à attirer les talents.',
    solution:
      'Ce diagnostic rapide de 20 questions couvre les 4 piliers ESG. Vous obtenez un score de maturité, une cartographie des risques, et des recommandations priorisées.',
    proof:
      'Élaboré sur les Normes de Performance IFC PS 1-8, GRI Standards, et ISSB S1/S2. Utilisé par 38 entreprises en Afrique francophone.',
    ctaText: 'Démarrer le diagnostic gratuit',
    ctaSecondary: 'Voir les 4 piliers évalués',
    conversionOffer: 'esg-strategic-advisory',
    isActive: true,
    seoTitle:
      'Diagnostic Maturité ESG — Score IFC GRI ISSB | KHEPRA EXPERTS',
    seoDescription:
      'Évaluez votre maturité ESG en 12 minutes. 4 piliers : Environnement, Social, Gouvernance, Impact. Score détaillé et plan d\'action. Gratuit.',
    seoKeywords:
      'diagnostic ESG, maturité ESG, IFC Performance Standards, GRI, ISSB, scoring ESG, entreprise durable Afrique',
    accentColor: '#22a05a',
    icon: 'ri-leaf-line',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Professional%20African%20ESG%20sustainability%20assessment%20with%20green%20data%20visualizations%20and%20environmental%20impact%20charts%20on%20modern%20screens%20in%20premium%20boardroom%20warm%20emerald%20lighting%20editorial%20photography%20style%20sophisticated%20corporate%20atmosphere&width=1600&height=900&seq=lead-magnet-esg-2026&orientation=landscape',
    benefits: [
      '20 questions sur 4 piliers ESG',
      'Score de maturité détaillé',
      'Cartographie des risques ESG',
      'Recommandations priorisées',
      'Alignement IFC PS 1-8, GRI, ISSB',
    ],
    stats: {
      value: '38',
      label: 'entreprises évaluées en Afrique francophone',
    },
    whatsInside: [
      'Pilier 1 : Environnement (5 questions) — Climat, biodiversité, ressources',
      'Pilier 2 : Social (5 questions) — Travail, communautés, chaîne de valeur',
      'Pilier 3 : Gouvernance (5 questions) — Éthique, conformité, transparence',
      'Pilier 4 : Impact (5 questions) — Mesure, reporting, valorisation',
      'Rapport : Score, Matrice, Plan d\'action, Benchmark sectoriel',
    ],
    timeToComplete: '12 min',
    difficulty: 'Facile',
    format: 'Diagnostic',
    formFields: [
      {
        name: 'full_name',
        label: 'Nom complet',
        type: 'text',
        placeholder: 'Marie-Claire Adjo',
        required: true,
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'mc@entreprise.com',
        required: true,
      },
      {
        name: 'organization',
        label: 'Entreprise',
        type: 'text',
        placeholder: 'Agro-Industrie Verte SA',
        required: true,
      },
      {
        name: 'position',
        label: 'Fonction',
        type: 'select',
        required: true,
        options: [
          { value: 'dg', label: 'Directeur Général' },
          { value: 'dga', label: 'Directeur Général Adjoint' },
          { value: 'esg', label: 'Responsable ESG / RSE' },
          { value: 'rh', label: 'DRH' },
          { value: 'communication', label: 'Communication' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'country',
        label: 'Pays',
        type: 'select',
        required: true,
        options: [
          { value: 'CI', label: "Côte d'Ivoire" },
          { value: 'SN', label: 'Sénégal' },
          { value: 'BJ', label: 'Bénin' },
          { value: 'TG', label: 'Togo' },
          { value: 'BF', label: 'Burkina Faso' },
          { value: 'ML', label: 'Mali' },
          { value: 'CM', label: 'Cameroun' },
          { value: 'GA', label: 'Gabon' },
          { value: 'CG', label: 'Congo' },
          { value: 'GN', label: 'Guinée' },
          { value: 'NE', label: 'Niger' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'sector',
        label: 'Secteur',
        type: 'select',
        required: true,
        options: [
          { value: 'agro', label: 'Agro-industrie' },
          { value: 'energie', label: 'Énergie & Mines' },
          { value: 'finance', label: 'Finance' },
          { value: 'tech', label: 'Technologie' },
          { value: 'sante', label: 'Santé' },
          { value: 'btp', label: 'BTP & Infrastructure' },
          { value: 'autre', label: 'Autre' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // BU2 — LEAD MAGNET PRIX DE TRANSFERT : Guide Documentation BEPS Afrique
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'guide-prix-transfert-beps-afrique',
    slug: 'guide-prix-transfert-beps-afrique',
    title: 'Guide Prix de Transfert BEPS en Afrique : Sécuriser votre Documentation Fiscale',
    subtitle: '5 erreurs fatales de documentation BEPS Action 13 et comment les éviter pour protéger votre groupe des redressements fiscaux',
    description:
      'Guide pratique de 18 pages pour les groupes opérant en Afrique francophone. Décrypte les 5 erreurs fatales de documentation prix de transfert (Master File, Local File, CbCR), les méthodes BEPS Action 13 et la défense fiscale face aux administrations UEMOA et CEMAC.',
    category: 'finance',
    targetAudience: 'DAF, CFO, Directeurs Fiscaux, DG de groupes multinationaux et multinationales opérant en UEMOA, CEMAC, OHADA',
    painPoint:
      '48% des groupes africains contrôlés en prix de transfert subissent des redressements majeurs. Le principal motif : documentation inexistante, obsolète ou non conforme BEPS Action 13. Les administrations fiscales UEMOA et CEMAC montent en compétence avec l\'appui de l\'ATAF et de l\'OCDE.',
    consequences:
      'Redressements pouvant atteindre 2 milliards FCFA, pénalités de retard, double imposition en l\'absence d\'APA, atteinte à la réputation fiscale du groupe, mise en jeu de la responsabilité personnelle des dirigeants dans certains pays.',
    solution:
      'Ce guide pratique de 18 pages identifie les 5 erreurs fatales documentées sur 80+ missions prix de transfert en Afrique francophone. Chaque erreur est accompagnée d\'un template de correction, des références BEPS applicables et d\'exemples concrets de défense fiscale.',
    proof:
      'Développé sur la base de 80+ missions prix de transfert en UEMOA et CEMAC, des lignes directrices BEPS Action 8-10 et Action 13 de l\'OCDE, et des pratiques documentées des administrations fiscales de 12 pays. KHEPRA EXPERTS est reconnu comme référence Prix de Transfert en Afrique francophone.',
    ctaText: 'Recevoir le guide PDF gratuit',
    ctaSecondary: 'Voir les 5 erreurs fatales',
    conversionOffer: 'prix-transfert',
    isActive: true,
    seoTitle:
      'Guide Prix de Transfert BEPS Afrique — 5 Erreurs Fatales Documentation | KHEPRA',
    seoDescription:
      'Guide pratique de documentation prix de transfert BEPS Action 13 pour groupes en Afrique francophone. 5 erreurs fatales, templates, défense fiscale UEMOA CEMAC.',
    seoKeywords:
      'prix de transfert Afrique, BEPS Action 13, documentation fiscale UEMOA, redressement prix transfert, Master File Local File CbCR Afrique, fiscalité internationale CEMAC, ATAF prix transfert',
    accentColor: '#b45309',
    icon: 'ri-file-chart-line',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Professional%20African%20multinational%20finance%20director%20reviewing%20transfer%20pricing%20documentation%20files%20on%20premium%20executive%20desk%20warm%20amber%20and%20charcoal%20lighting%20sophisticated%20tax%20advisory%20atmosphere%20BEPS%20OCDE%20documentation%20Africa%20editorial%20photography%20clean%20minimalist%20dark%20background%20gold%20accents&width=1600&height=900&seq=guide-pt-beps-afrique-2026&orientation=landscape',
    benefits: [
      '5 erreurs fatales documentées avec causes et corrections opérationnelles',
      'Templates Master File et Local File adaptés au contexte africain',
      'Méthodes BEPS Action 13 appliquées aux transactions intragroupe africaines',
      'Références aux législations de 12 pays UEMOA et CEMAC',
      'Checklist de conformité documentation prix de transfert',
    ],
    stats: {
      value: '80+',
      label: 'missions prix de transfert en Afrique francophone',
    },
    whatsInside: [
      'Erreur 1 : Absence de Master File — Conséquences et template structuré conforme OCDE',
      'Erreur 2 : Local File générique non spécifique aux transactions africaines — Approche analytique',
      'Erreur 3 : Benchmarking sans données africaines — Base de comparables et ajustements',
      'Erreur 4 : Management fees non documentés — Prouver la réalité et la valeur des services',
      'Erreur 5 : Financement intragroupe à taux non conforme — Méthode taux d\'intérêt de pleine concurrence',
      'Annexe A : Checklist documentation BEPS Action 13 — 47 points de contrôle',
      'Annexe B : Matrice des risques par pays UEMOA/CEMAC (12 pays)',
      'Annexe C : Références législatives et OCDE applicables en Afrique francophone',
    ],
    timeToComplete: 'Lecture 45 min + Application 3 jours',
    difficulty: 'Avancé',
    format: 'PDF',
    formFields: [
      {
        name: 'full_name',
        label: 'Nom complet',
        type: 'text',
        placeholder: 'Dr. Moussa Traoré',
        required: true,
      },
      {
        name: 'email',
        label: 'Email professionnel',
        type: 'email',
        placeholder: 'moussa.traore@groupe.com',
        required: true,
      },
      {
        name: 'organization',
        label: 'Groupe / Entreprise',
        type: 'text',
        placeholder: 'Groupe Industriel Afrique SA',
        required: true,
      },
      {
        name: 'position',
        label: 'Fonction',
        type: 'select',
        required: true,
        options: [
          { value: 'daf', label: 'DAF / Directeur Administratif et Financier' },
          { value: 'cfo', label: 'CFO / Chief Financial Officer' },
          { value: 'directeur-fiscal', label: 'Directeur Fiscal / Tax Director' },
          { value: 'dg', label: 'Directeur Général' },
          { value: 'controleur', label: 'Contrôleur de Gestion Groupe' },
          { value: 'consultant', label: 'Consultant / Conseiller' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'country',
        label: 'Pays siège',
        type: 'select',
        required: true,
        options: [
          { value: 'CI', label: "Côte d'Ivoire" },
          { value: 'SN', label: 'Sénégal' },
          { value: 'BJ', label: 'Bénin' },
          { value: 'TG', label: 'Togo' },
          { value: 'BF', label: 'Burkina Faso' },
          { value: 'ML', label: 'Mali' },
          { value: 'CM', label: 'Cameroun' },
          { value: 'GA', label: 'Gabon' },
          { value: 'CG', label: 'Congo' },
          { value: 'GN', label: 'Guinée' },
          { value: 'NE', label: 'Niger' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'group_countries',
        label: 'Pays de présence du groupe',
        type: 'select',
        required: true,
        options: [
          { value: '1-2', label: '1 à 2 pays' },
          { value: '3-5', label: '3 à 5 pays' },
          { value: '6-10', label: '6 à 10 pays' },
          { value: 'plus-10', label: 'Plus de 10 pays' },
        ],
      },
      {
        name: 'revenue',
        label: 'Chiffre d\'affaires groupe (FCFA)',
        type: 'select',
        required: true,
        options: [
          { value: 'moins-1mrd', label: 'Moins de 1 Milliard' },
          { value: '1mrd-5mrd', label: '1 — 5 Milliards' },
          { value: '5mrd-25mrd', label: '5 — 25 Milliards' },
          { value: '25mrd-100mrd', label: '25 — 100 Milliards' },
          { value: 'plus-100mrd', label: 'Plus de 100 Milliards' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // AGENT 10 — CAMPAGNE 001 : Diagnostic Flash Conformité BCEAO/COBAC 2026
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'diagnostic-flash-conformite-bceao-cobac-2026',
    slug: 'diagnostic-flash-conformite-bceao-cobac-2026',
    title: 'Diagnostic Flash Conformité BCEAO/COBAC 2026',
    subtitle: '25 questions, 10 minutes, un score immédiat — Identifiez vos gaps de conformité avant l\'inspecteur',
    description:
      'Un diagnostic interactif de 25 questions couvrant les 5 domaines critiques de la conformité réglementaire BCEAO et COBAC. Score global, matrice des risques par domaine, benchmark sectoriel et plan d\'action priorisé — livré en 10 minutes.',
    category: 'conformite',
    targetAudience: 'DRC, RCI, Compliance Officers, DG, DGA des banques, SFD, EMF et fintechs en zones UEMOA et CEMAC',
    painPoint:
      '90% des institutions financières découvrent leurs gaps de conformité le jour de l\'inspection. Les sanctions : amendes jusqu\'à 500M FCFA, mise sous surveillance renforcée, restriction des dividendes, suspension d\'activité — parfois révocation d\'agrément.',
    consequences:
      'Sans diagnostic préventif, votre institution navigue en aveugle. Un avis défavorable de la BCEAO ou de la COBAC se traduit par : perte de confiance des bailleurs, dégradation de la notation, clauses restrictives des partenaires techniques, et une course contre la montre de 45 jours pour produire un plan de redressement crédible.',
    solution:
      'Le Diagnostic Flash Conformité 2026 scanne vos 5 domaines critiques en 10 minutes. Vous obtenez un rapport personnalisé avec : score global sur 100, matrice des risques, benchmark par rapport aux institutions de votre catégorie, et un plan d\'action priorisé sur 90 jours. Basé sur les 10 dernières circulaires BCEAO et les 5 derniers règlements COBAC.',
    proof:
      'Méthodologie éprouvée sur 50+ missions d\'audit et de conseil réglementaire en UEMOA et CEMAC. 94% des institutions ayant appliqué le plan d\'action issu du diagnostic ont réussi leur inspection sans réserve majeure. Référencé par 3 associations professionnelles bancaires.',
    ctaText: 'Démarrer le diagnostic gratuit — 10 min',
    ctaSecondary: 'Voir les 25 questions',
    conversionOffer: 'due-diligence',
    isActive: true,
    seoTitle:
      'Diagnostic Flash Conformité BCEAO/COBAC 2026 — Score en 10 min | KHEPRA EXPERTS',
    seoDescription:
      'Diagnostic interactif de conformité réglementaire BCEAO et COBAC. 25 questions, 5 domaines, score immédiat et plan d\'action. Gratuit. Institutions financières UEMOA CEMAC.',
    seoKeywords:
      'diagnostic flash conformité BCEAO 2026, audit COBAC, conformité réglementaire bancaire, inspection BCEAO, ratios prudentiels, scoring conformité UEMOA CEMAC, diagnostic pré-inspection',
    accentColor: '#c9a227',
    icon: 'ri-flashlight-line',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Professional%20African%20financial%20compliance%20diagnostic%20dashboard%20with%20real-time%20risk%20scoring%20heatmap%20and%20regulatory%20checklist%20on%20modern%20screen%20in%20premium%20banking%20environment%20warm%20amber%20and%20charcoal%20lighting%20sophisticated%20consulting%20atmosphere%20BCEAO%20COBAC%20regulatory%20theme%20editorial%20photography%20style&width=1600&height=900&seq=diag-flash-conformite-2026-hero&orientation=landscape',
    benefits: [
      '25 questions ciblées couvrant 100% des exigences prudentielles 2026',
      'Score global sur 100 avec matrice des risques par domaine',
      'Benchmark sectoriel — comparez-vous aux institutions de votre catégorie',
      'Plan d\'action priorisé sur 90 jours avec jalons réglementaires',
      'Références exactes aux circulaires BCEAO et règlements COBAC applicables',
    ],
    stats: {
      value: '94%',
      label: 'de réussite aux inspections après diagnostic',
    },
    whatsInside: [
      'Domaine 1 : Gouvernance & Contrôle Interne (5 questions) — Comités spécialisés, indépendance, conflits d\'intérêts, Circulaires 01-2017/CB',
      'Domaine 2 : Ratios Prudentiels & Solvabilité (5 questions) — Bâle III, coussins de conservation, ratio de liquidité, Circulaire 03-2017/CB',
      'Domaine 3 : LBC/FT & Conformité KYC (5 questions) — Directive 02-2015, gel des avoirs, dispositif CENTIF/ANIF, approche par les risques',
      'Domaine 4 : Systèmes d\'Information & Cyber-résilience (5 questions) — PCA/PCI, tests d\'intrusion, sécurité des données, externalisation',
      'Domaine 5 : ALM, Liquidité & Reporting (5 questions) — GAP analysis, stress tests, reporting réglementaire, risques de taux',
      'Rapport final : Score global, Matrice 5×5, Benchmark, Plan d\'action 90 jours, Références normatives',
    ],
    timeToComplete: '10 min',
    difficulty: 'Moyen',
    format: 'Diagnostic',
    formFields: [
      {
        name: 'full_name',
        label: 'Nom complet',
        type: 'text',
        placeholder: 'Dr. Amadou Koné',
        required: true,
      },
      {
        name: 'email',
        label: 'Email professionnel',
        type: 'email',
        placeholder: 'amadou.kone@banque.ci',
        required: true,
      },
      {
        name: 'organization',
        label: 'Institution financière',
        type: 'text',
        placeholder: 'Banque Régionale UEMOA',
        required: true,
      },
      {
        name: 'position',
        label: 'Fonction',
        type: 'select',
        required: true,
        options: [
          { value: 'dg', label: 'Directeur Général' },
          { value: 'dga', label: 'Directeur Général Adjoint' },
          { value: 'drc', label: 'Directeur des Risques et de la Conformité' },
          { value: 'rci', label: 'Responsable Contrôle Interne' },
          { value: 'rlbc', label: 'Responsable LBC/FT' },
          { value: 'compliance', label: 'Compliance Officer' },
          { value: 'audit', label: 'Auditeur Interne' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'country',
        label: 'Pays',
        type: 'select',
        required: true,
        options: [
          { value: 'CI', label: "Côte d'Ivoire" },
          { value: 'SN', label: 'Sénégal' },
          { value: 'BJ', label: 'Bénin' },
          { value: 'TG', label: 'Togo' },
          { value: 'BF', label: 'Burkina Faso' },
          { value: 'ML', label: 'Mali' },
          { value: 'CM', label: 'Cameroun' },
          { value: 'GA', label: 'Gabon' },
          { value: 'CG', label: 'Congo' },
          { value: 'GN', label: 'Guinée' },
          { value: 'NE', label: 'Niger' },
          { value: 'TD', label: 'Tchad' },
          { value: 'GQ', label: 'Guinée Équatoriale' },
          { value: 'CF', label: 'République Centrafricaine' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'sector',
        label: 'Type d\'institution',
        type: 'select',
        required: true,
        options: [
          { value: 'banque', label: 'Banque commerciale' },
          { value: 'sfd', label: 'Système Financier Décentralisé (SFD)' },
          { value: 'emf', label: 'Établissement de Microfinance (EMF)' },
          { value: 'fintech', label: 'Fintech / Établissement de Paiement' },
          { value: 'assurance', label: 'Assurance' },
          { value: 'banque-affaires', label: "Banque d'Affaires" },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'balance_size',
        label: 'Taille du bilan (FCFA)',
        type: 'select',
        required: true,
        options: [
          { value: 'moins-1mrd', label: 'Moins de 1 Milliard' },
          { value: '1mrd-5mrd', label: '1 — 5 Milliards' },
          { value: '5mrd-25mrd', label: '5 — 25 Milliards' },
          { value: '25mrd-100mrd', label: '25 — 100 Milliards' },
          { value: 'plus-100mrd', label: 'Plus de 100 Milliards' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SPRINT WHITE PAPERS — Baromètre RegTech UEMOA 2026
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'barometre-regtech-uemoa-2026',
    slug: 'barometre-regtech-uemoa-2026',
    title: 'Baromètre RegTech UEMOA 2026 — État des Lieux de la Conformité Technologique',
    subtitle: 'Analyse exclusive des tendances RegTech dans l\'espace UEMOA : adoption, maturité, freins et opportunités pour les institutions financières',
    description:
      'Le Baromètre RegTech UEMOA 2026 est la première étude exhaustive sur l\'adoption des technologies réglementaires par les banques, SFD, EMF et fintechs en zone UEMOA. Basé sur une enquête menée auprès de 85 institutions dans 8 pays, ce rapport de 42 pages analyse les tendances d\'adoption, les niveaux de maturité par domaine (LBC/FT, KYC digital, reporting prudentiel, cyber-résilience), les freins structurels et les projections 2026-2028.',
    category: 'conformite',
    targetAudience: 'DG, DGA, DRC, DSI, Compliance Officers des banques, SFD, EMF et fintechs en zone UEMOA ; Régulateurs (BCEAO, Commission Bancaire) ; Bailleurs de fonds et DFI ; Cabinets de conseil en stratégie',
    painPoint:
      'Aucune donnée consolidée n\'existe sur l\'état réel de la RegTech en zone UEMOA. Les décideurs naviguent sans benchmark, les régulateurs manquent de visibilité sur la maturité du marché, et les fintechs peinent à calibrer leurs offres face à des besoins mal documentés. Résultat : des investissements mal ciblés, des délais de mise en conformité sous-estimés, et un déficit d\'innovation réglementaire dans toute la sous-région.',
    consequences:
      'Sans données de marché fiables, les institutions financières de l\'UEMOA : (1) sous-investissent dans les mauvaises solutions, (2) ratent le virage de l\'automatisation réglementaire imposé par la BCEAO à horizon 2027, (3) subissent un désavantage compétitif face aux filiales de groupes internationaux déjà équipés, et (4) s\'exposent à des sanctions pour non-conformité technologique (cyber-résilience, reporting automatisé, KYC digital).',
    solution:
      'Le Baromètre RegTech UEMOA 2026 comble ce vide informationnel avec : une cartographie des 32 solutions RegTech actives dans l\'UEMOA, un indice de maturité par pays (8 pays), 5 domaines fonctionnels analysés (LBC/FT, KYC, Reporting, Cyber, Gouvernance), des benchmarks par type d\'institution et par taille de bilan, et des recommandations stratégiques pour chaque profil. Tout est chiffré, sourcé, et prêt à être présenté en Conseil d\'Administration.',
    proof:
      'Enquête menée auprès de 85 institutions financières dans 8 pays UEMOA (Côte d\'Ivoire, Sénégal, Bénin, Togo, Burkina Faso, Mali, Niger, Guinée-Bissau). Entretiens qualitatifs avec 12 régulateurs et superviseurs. Analyse de 32 solutions RegTech recensées et classifiées. Croisement avec les données BCEAO sur les sanctions 2024-2025. Production KHEPRA EXPERTS — leader de la conformité UEMOA.',
    ctaText: 'Télécharger le Baromètre complet (42 pages)',
    ctaSecondary: 'Voir l\'executive summary (5 pages)',
    conversionOffer: 'due-diligence',
    isActive: true,
    seoTitle:
      'Baromètre RegTech UEMOA 2026 — Adoption, Maturité, Tendances | KHEPRA EXPERTS',
    seoDescription:
      'Première étude exhaustive RegTech en zone UEMOA. 85 institutions, 8 pays, 32 solutions analysées. Indice de maturité, benchmarks, projections 2026-2028. Téléchargement gratuit.',
    seoKeywords:
      'Baromètre RegTech UEMOA 2026, conformité technologique BCEAO, solutions RegTech Afrique, maturité KYC digital, reporting prudentiel automatisé, cyber-résilience UEMOA, tendances RegTech Afrique francophone',
    accentColor: '#c9a227',
    icon: 'ri-bar-chart-grouped-line',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Professional%20African%20financial%20technology%20dashboard%20with%20regulatory%20compliance%20metrics%20and%20data%20visualizations%20on%20modern%20screens%20in%20premium%20boardroom%20warm%20amber%20lighting%20sophisticated%20banking%20atmosphere%20BCEAO%20UEMOA%20regulatory%20technology%20theme%20editorial%20photography%20style%20clean%20minimalist%20composition&width=1600&height=900&seq=barometre-regtech-uemoa-2026-hero&orientation=landscape',
    benefits: [
      'Indice de maturité RegTech par pays (8 pays UEMOA classés et analysés)',
      'Cartographie complète des 32 solutions RegTech actives dans la zone',
      'Benchmarks par type d\'institution (Banques, SFD, EMF, Fintechs) et taille de bilan',
      '5 domaines fonctionnels analysés avec scores de maturité détaillés',
      'Projections 2026-2028 et recommandations stratégiques par profil',
    ],
    stats: {
      value: '85',
      label: 'institutions financières enquêtées dans 8 pays UEMOA',
    },
    whatsInside: [
      'Chapitre 1 : Périmètre et méthodologie — 85 institutions, 8 pays, 5 domaines, score 0-100',
      'Chapitre 2 : Indice global de maturité RegTech UEMOA — Score moyen, distribution, écarts',
      'Chapitre 3 : Cartographie des 32 solutions RegTech — Classification, couverture fonctionnelle, parts de marché',
      'Chapitre 4 : Domaine LBC/FT & KYC Digital — Adoption, freins, taux de conformité',
      'Chapitre 5 : Domaine Reporting Prudentiel Automatisé — CER, SURFI, états COBAC',
      'Chapitre 6 : Domaine Cyber-Résilience & PCA/PCI — Tests, audits, incidents',
      'Chapitre 7 : Domaine Gouvernance & Conformité Digitale — Outils, workflows, traçabilité',
      'Chapitre 8 : Domaine Supervision & RegTech Supervisor — Outils BCEAO, bac à sable',
      'Chapitre 9 : Projections 2026-2028 — Tendances, investissements prévus, risques',
      'Chapitre 10 : Recommandations stratégiques — Par type d\'institution et niveau de maturité',
      'Annexes : Questionnaire d\'enquête, liste des institutions participantes, glossaire RegTech',
    ],
    timeToComplete: 'Lecture 90 min',
    difficulty: 'Avancé',
    format: 'PDF',
    formFields: [
      {
        name: 'full_name',
        label: 'Nom complet',
        type: 'text',
        placeholder: 'Dr. Amadou Koné',
        required: true,
      },
      {
        name: 'email',
        label: 'Email professionnel',
        type: 'email',
        placeholder: 'amadou.kone@banque.ci',
        required: true,
      },
      {
        name: 'organization',
        label: 'Institution',
        type: 'text',
        placeholder: 'Banque Régionale UEMOA',
        required: true,
      },
      {
        name: 'position',
        label: 'Fonction',
        type: 'select',
        required: true,
        options: [
          { value: 'dg', label: 'Directeur Général' },
          { value: 'dga', label: 'Directeur Général Adjoint' },
          { value: 'drc', label: 'Directeur des Risques et Conformité' },
          { value: 'dsi', label: 'Directeur des Systèmes d\'Information' },
          { value: 'rci', label: 'Responsable Contrôle Interne' },
          { value: 'compliance', label: 'Compliance Officer' },
          { value: 'regulateur', label: 'Régulateur / Superviseur' },
          { value: 'consultant', label: 'Consultant / Analyste' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'country',
        label: 'Pays',
        type: 'select',
        required: true,
        options: [
          { value: 'CI', label: 'Côte d\'Ivoire' },
          { value: 'SN', label: 'Sénégal' },
          { value: 'BJ', label: 'Bénin' },
          { value: 'TG', label: 'Togo' },
          { value: 'BF', label: 'Burkina Faso' },
          { value: 'ML', label: 'Mali' },
          { value: 'NE', label: 'Niger' },
          { value: 'GW', label: 'Guinée-Bissau' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'institution_type',
        label: 'Type d\'institution',
        type: 'select',
        required: true,
        options: [
          { value: 'banque', label: 'Banque commerciale' },
          { value: 'sfd', label: 'Système Financier Décentralisé (SFD)' },
          { value: 'emf', label: 'Établissement de Microfinance (EMF)' },
          { value: 'fintech', label: 'Fintech / RegTech' },
          { value: 'assurance', label: 'Assurance' },
          { value: 'regulateur', label: 'Régulateur / Banque Centrale' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'balance_size',
        label: 'Taille du bilan (FCFA)',
        type: 'select',
        required: false,
        options: [
          { value: 'moins-1mrd', label: 'Moins de 1 Milliard' },
          { value: '1mrd-5mrd', label: '1 — 5 Milliards' },
          { value: '5mrd-25mrd', label: '5 — 25 Milliards' },
          { value: '25mrd-100mrd', label: '25 — 100 Milliards' },
          { value: 'plus-100mrd', label: 'Plus de 100 Milliards' },
          { value: 'na', label: 'Non applicable' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SPRINT WHITE PAPERS — Compliance OHADA by KOS AI
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'compliance-ohada-kos-ai',
    slug: 'compliance-ohada-kos-ai',
    title: 'Compliance OHADA by KOS AI — Automatisation de la Conformité Juridique',
    subtitle: 'Comment l\'intelligence artificielle transforme la mise en conformité OHADA : audit automatisé, scoring, remédiation intelligente',
    description:
      'Ce livre blanc de 38 pages présente la solution KOS AI appliquée au droit OHADA. Découvrez comment l\'intelligence artificielle permet d\'automatiser l\'audit de conformité juridique, le scoring des statuts et actes uniformes, la génération de rapports de remédiation, et la veille juridique OHADA en temps réel. Conçu pour les juristes, DAF, DG et compliance officers des entreprises opérant dans les 17 États membres de l\'OHADA.',
    category: 'conformite',
    targetAudience: 'Directeurs Juridiques, DAF, DG, Compliance Officers, Avocats d\'affaires, Notaires, Experts-comptables des entreprises opérant dans les 17 pays OHADA ; Promoteurs de projets industriels et miniers ; Groupes multinationaux avec filiales en zone OHADA',
    painPoint:
      'La conformité OHADA est un labyrinthe : 10 Actes Uniformes, des centaines d\'articles, des jurisprudences nationales divergentes, et des mises à jour fréquentes. Les audits juridiques traditionnels prennent 3 à 6 mois, coûtent entre 15 et 50 millions FCFA, et ne couvrent souvent que 60% du périmètre. Les écarts de conformité sont découverts trop tard — lors d\'un contentieux, d\'un due diligence, ou d\'une inspection.',
    consequences:
      'Non-conformité OHADA = nullité des actes, responsabilité personnelle des dirigeants, rejet des dossiers de financement, blocage des fusions/acquisitions, et perte de crédibilité auprès des partenaires techniques et financiers. En 2025, 42% des due diligence en zone OHADA ont révélé des non-conformités juridiques majeures ayant entraîné une renégociation ou un abandon de la transaction.',
    solution:
      'KOS AI applique l\'IA au droit OHADA avec 5 modules : (1) AuditScanner — scan automatique des documents juridiques vs Actes Uniformes, (2) ScoreCompliance — scoring 0-100 par domaine juridique, (3) RemediationEngine — génération automatique des clauses et documents correctifs, (4) VeilleJuridique — alertes en temps réel sur les évolutions OHADA, (5) DashboardCompliance — cockpit de pilotage pour les DG et DAF. Ce livre blanc détaille chaque module avec des cas d\'usage réels.',
    proof:
      'Module développé par KHEPRA EXPERTS sur la base de 80+ missions juridiques en zone OHADA. Base de connaissance intégrant l\'intégralité des 10 Actes Uniformes dans leur version révisée. Taux de détection des non-conformités : 96% (vs 60% en audit manuel). 12 déploiements pilotes réalisés dans 5 pays OHADA en 2025-2026.',
    ctaText: 'Télécharger le livre blanc (38 pages)',
    ctaSecondary: 'Voir la démo KOS AI (3 min)',
    conversionOffer: 'due-diligence',
    isActive: true,
    seoTitle:
      'Compliance OHADA by KOS AI — Automatisation Conformité Juridique IA | KHEPRA EXPERTS',
    seoDescription:
      'Livre blanc : comment l\'IA automatise la conformité OHADA. AuditScanner, ScoreCompliance, RemediationEngine. 38 pages, 5 modules, 12 cas pilotes. Téléchargement gratuit.',
    seoKeywords:
      'Compliance OHADA IA, automatisation conformité juridique, KOS AI OHADA, audit juridique automatisé, Actes Uniformes OHADA, scoring conformité entreprise, veille juridique OHADA IA, KHEPRA EXPERTS',
    accentColor: '#c9a227',
    icon: 'ri-robot-line',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Professional%20African%20legal%20technology%20AI%20compliance%20dashboard%20with%20OHADA%20actes%20uniformes%20digital%20interface%20on%20modern%20screens%20in%20premium%20law%20firm%20atmosphere%20warm%20amber%20and%20charcoal%20lighting%20sophisticated%20legal%20tech%20editorial%20photography%20clean%20minimalist%20composition%20gold%20accents&width=1600&height=900&seq=compliance-ohada-kos-ai-hero&orientation=landscape',
    benefits: [
      '5 modules IA couvrant 100% du périmètre OHADA (10 Actes Uniformes)',
      'AuditScanner : réduction du temps d\'audit de 3 mois à 48 heures',
      'ScoreCompliance : scoring 0-100 avec matrice des risques juridiques',
      'RemediationEngine : génération automatique des documents correctifs',
      'VeilleJuridique : alertes en temps réel sur les évolutions OHADA et jurisprudences',
    ],
    stats: {
      value: '96%',
      label: 'de détection des non-conformités OHADA (vs 60% en manuel)',
    },
    whatsInside: [
      'Partie 1 : L\'OHADA à l\'ère de l\'IA — Enjeux, défis et opportunités de l\'automatisation juridique',
      'Module 1 — AuditScanner : Scan automatique des statuts, PV, contrats vs Actes Uniformes OHADA',
      'Module 2 — ScoreCompliance : Scoring 0-100, matrice des risques, benchmark sectoriel',
      'Module 3 — RemediationEngine : Génération automatique des clauses, avenants et mises à jour',
      'Module 4 — VeilleJuridique : Alertes temps réel, synthèses IA, impact analysis',
      'Module 5 — DashboardCompliance : Cockpit DG/DAF, KPIs, calendrier de mise en conformité',
      'Cas d\'usage 1 : Due diligence OHADA automatisée pour une acquisition transfrontalière',
      'Cas d\'usage 2 : Mise en conformité statutaire d\'un groupe avec 12 filiales dans 8 pays OHADA',
      'Cas d\'usage 3 : Veille juridique OHADA pour un cabinet d\'avocats — 200 heures/an économisées',
      'Roadmap 2026-2027 : Évolutions prévues, nouveaux Actes Uniformes, déploiement 17 pays',
      'Annexes : Cartographie des 10 Actes Uniformes, glossaire IA/Juridique, méthodologie de scoring',
    ],
    timeToComplete: 'Lecture 75 min',
    difficulty: 'Moyen',
    format: 'PDF',
    formFields: [
      {
        name: 'full_name',
        label: 'Nom complet',
        type: 'text',
        placeholder: 'Me Fatou Diop',
        required: true,
      },
      {
        name: 'email',
        label: 'Email professionnel',
        type: 'email',
        placeholder: 'fdiop@cabinet-juridique.com',
        required: true,
      },
      {
        name: 'organization',
        label: 'Organisation',
        type: 'text',
        placeholder: 'Cabinet Juridique Afrique',
        required: true,
      },
      {
        name: 'position',
        label: 'Fonction',
        type: 'select',
        required: true,
        options: [
          { value: 'dj', label: 'Directeur Juridique' },
          { value: 'dg', label: 'Directeur Général' },
          { value: 'daf', label: 'Directeur Administratif et Financier' },
          { value: 'avocat', label: 'Avocat d\'Affaires' },
          { value: 'notaire', label: 'Notaire' },
          { value: 'compliance', label: 'Compliance Officer' },
          { value: 'expert-comptable', label: 'Expert-Comptable' },
          { value: 'consultant', label: 'Consultant' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'country',
        label: 'Pays',
        type: 'select',
        required: true,
        options: [
          { value: 'CI', label: 'Côte d\'Ivoire' },
          { value: 'SN', label: 'Sénégal' },
          { value: 'CM', label: 'Cameroun' },
          { value: 'BJ', label: 'Bénin' },
          { value: 'TG', label: 'Togo' },
          { value: 'BF', label: 'Burkina Faso' },
          { value: 'ML', label: 'Mali' },
          { value: 'NE', label: 'Niger' },
          { value: 'GA', label: 'Gabon' },
          { value: 'CG', label: 'Congo' },
          { value: 'TD', label: 'Tchad' },
          { value: 'CF', label: 'République Centrafricaine' },
          { value: 'GQ', label: 'Guinée Équatoriale' },
          { value: 'CD', label: 'RD Congo' },
          { value: 'GN', label: 'Guinée' },
          { value: 'GW', label: 'Guinée-Bissau' },
          { value: 'KM', label: 'Comores' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'employees',
        label: 'Effectif de l\'organisation',
        type: 'select',
        required: false,
        options: [
          { value: '1-10', label: '1 — 10' },
          { value: '11-50', label: '11 — 50' },
          { value: '51-250', label: '51 — 250' },
          { value: '251-1000', label: '251 — 1 000' },
          { value: 'plus-1000', label: 'Plus de 1 000' },
        ],
      },
      {
        name: 'interest',
        label: 'Intérêt principal',
        type: 'select',
        required: false,
        options: [
          { value: 'audit', label: 'Audit de conformité OHADA automatisé' },
          { value: 'veille', label: 'Veille juridique OHADA' },
          { value: 'demo', label: 'Demo KOS AI' },
          { value: 'deploiement', label: 'Déploiement entreprise' },
          { value: 'information', label: 'Information générale' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SPRINT WHITE PAPERS — Cartographie Risques Bancaires Afrique
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'cartographie-risques-bancaires-afrique',
    slug: 'cartographie-risques-bancaires-afrique',
    title: 'Cartographie des Risques Bancaires en Afrique Francophone — Édition 2026',
    subtitle: 'Analyse cartographique des 7 familles de risques bancaires dans 14 pays d\'Afrique francophone : scores, heatmaps, et matrices de criticité',
    description:
      'La Cartographie des Risques Bancaires en Afrique Francophone — Édition 2026 est un rapport de 56 pages qui cartographie les 7 familles de risques bancaires (crédit, marché, liquidité, opérationnel, conformité, stratégique, réputationnel) dans 14 pays d\'Afrique francophone. Chaque pays est noté sur un indice composite de risque bancaire avec des heatmaps par région (UEMOA, CEMAC, hors-zone) et des matrices de criticité par type d\'institution. Inclus : projections 2026-2028, analyse des facteurs macroéconomiques, et recommandations par profil de risque.',
    category: 'conformite',
    targetAudience: 'DRC, Risk Managers, DG, DGA, Administrateurs, Comités d\'Audit et des Risques des banques, SFD, EMF ; Régulateurs et banques centrales (BCEAO, BEAC, BCC) ; Investisseurs institutionnels et DFI ; Agences de notation ; Compagnies d\'assurance et réassurance',
    painPoint:
      'Les institutions financières opérant en Afrique francophone manquent cruellement de données consolidées sur les risques bancaires. Chaque pays a ses spécificités réglementaires, macroéconomiques et sectorielles, mais aucune cartographie unifiée n\'existe. Résultat : les risk managers travaillent en silos, les Conseils d\'Administration prennent des décisions sans vision régionale, et les stress tests sont calibrés sur des hypothèses locales déconnectées des dynamiques sous-régionales.',
    consequences:
      'Sans cartographie unifiée des risques, les banques : (1) sous-estiment leur exposition aux risques transfrontaliers (contagion UEMOA, risque souverain CEMAC), (2) allouent incorrectement leurs coussins de capital par pays, (3) échouent les stress tests régionaux exigés par la BCEAO et la COBAC, (4) subissent des dégradations de notation qui renchérissent leur coût de refinancement de 150 à 300 bps.',
    solution:
      'Ce rapport de 56 pages fournit : un indice composite de risque bancaire par pays (14 pays notés de A à E), 7 heatmaps par famille de risque, une matrice de criticité (probabilité × impact) pour chaque type d\'institution, des projections 2026-2028 intégrant les évolutions macroéconomiques (inflation, taux, croissance PIB), et des recommandations chiffrées par profil de risque. Chaque analyse est sourcée avec les données BCEAO, BEAC, FMI, et Banque Mondiale.',
    proof:
      'Élaboré sur la base de 120+ missions d\'audit et de conseil en risque bancaire dans 14 pays d\'Afrique francophone. Données croisées avec les rapports de supervision BCEAO (Commission Bancaire) et COBAC, les Article IV du FMI, et les données financières publiques de 85 banques. Méthodologie validée par un comité scientifique de 3 experts en risque bancaire africain.',
    ctaText: 'Télécharger la Cartographie complète (56 pages)',
    ctaSecondary: 'Voir l\'executive summary (8 pages)',
    conversionOffer: 'due-diligence',
    isActive: true,
    seoTitle:
      'Cartographie Risques Bancaires Afrique Francophone 2026 — 14 Pays, 7 Risques | KHEPRA EXPERTS',
    seoDescription:
      'Cartographie exhaustive des 7 risques bancaires dans 14 pays d\'Afrique francophone. Heatmaps, matrices de criticité, projections 2026-2028. 56 pages. Téléchargement gratuit.',
    seoKeywords:
      'cartographie risques bancaires Afrique, risques bancaires UEMOA CEMAC, indice risque pays Afrique, stress test bancaire BCEAO, matrice criticité risque crédit, risque souverain Afrique francophone, KHEPRA EXPERTS risk management',
    accentColor: '#c9a227',
    icon: 'ri-radar-line',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Professional%20African%20banking%20risk%20heatmap%20dashboard%20with%20geographic%20data%20visualization%20across%20West%20and%20Central%20Africa%20map%20warm%20amber%20and%20charcoal%20lighting%20sophisticated%20risk%20management%20atmosphere%20premium%20financial%20analysis%20editorial%20photography%20clean%20minimalist%20composition&width=1600&height=900&seq=cartographie-risques-bancaires-hero&orientation=landscape',
    benefits: [
      'Indice composite de risque bancaire par pays — 14 pays notés de A à E',
      '7 heatmaps détaillées par famille de risque (crédit, marché, liquidité, opérationnel, conformité, stratégique, réputationnel)',
      'Matrices de criticité (probabilité × impact) par type d\'institution bancaire',
      'Projections 2026-2028 avec analyse des facteurs macroéconomiques (inflation, taux, PIB)',
      'Recommandations chiffrées par profil de risque et pays — prêtes pour le Conseil d\'Administration',
    ],
    stats: {
      value: '120+',
      label: 'missions de risque bancaire dans 14 pays d\'Afrique francophone',
    },
    whatsInside: [
      'Partie 1 : Méthodologie — 7 familles de risques, 14 pays, scoring composite, sources de données',
      'Chapitre 1 : Indice Composite de Risque Bancaire — Classement 14 pays, tendances 2021-2026',
      'Chapitre 2 : Risque de Crédit — Taux de NPL, concentration sectorielle, provisions, benchmarks',
      'Chapitre 3 : Risque de Marché — Taux d\'intérêt, change, souverain, volatilité par zone monétaire',
      'Chapitre 4 : Risque de Liquidité — Ratios LCR/NSFR, concentration des dépôts, stress scenarios',
      'Chapitre 5 : Risque Opérationnel — Cyber-risques, fraude, continuité d\'activité, externalisation',
      'Chapitre 6 : Risque de Conformité — Sanctions BCEAO/COBAC, LBC/FT, protection des données',
      'Chapitre 7 : Risque Stratégique — Concurrence fintech, inclusion financière, transformation digitale',
      'Chapitre 8 : Risque de Réputation — Notation, controverses ESG, perception des marchés',
      'Partie 3 : Projections 2026-2028 — Scénarios central, adverse, stressé par pays',
      'Partie 4 : Recommandations — Par profil de risque (conservateur, modéré, dynamique) et par zone monétaire',
      'Annexes : Sources de données, glossaire risque, cartes UEMOA/CEMAC, contacts KHEPRA EXPERTS',
    ],
    timeToComplete: 'Lecture 120 min',
    difficulty: 'Avancé',
    format: 'PDF',
    formFields: [
      {
        name: 'full_name',
        label: 'Nom complet',
        type: 'text',
        placeholder: 'Dr. Koffi Mensah',
        required: true,
      },
      {
        name: 'email',
        label: 'Email professionnel',
        type: 'email',
        placeholder: 'koffi.mensah@banque.com',
        required: true,
      },
      {
        name: 'organization',
        label: 'Institution',
        type: 'text',
        placeholder: 'Banque Panafricaine SA',
        required: true,
      },
      {
        name: 'position',
        label: 'Fonction',
        type: 'select',
        required: true,
        options: [
          { value: 'dg', label: 'Directeur Général' },
          { value: 'dga', label: 'Directeur Général Adjoint' },
          { value: 'drc', label: 'Directeur des Risques (CRO)' },
          { value: 'risk-manager', label: 'Risk Manager' },
          { value: 'rci', label: 'Responsable Contrôle Interne' },
          { value: 'admin', label: 'Administrateur / Membre Comité des Risques' },
          { value: 'regulateur', label: 'Régulateur / Superviseur' },
          { value: 'investor', label: 'Investisseur / Analyste' },
          { value: 'auditeur', label: 'Auditeur / Consultant' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'country',
        label: 'Pays principal d\'activité',
        type: 'select',
        required: true,
        options: [
          { value: 'CI', label: 'Côte d\'Ivoire' },
          { value: 'SN', label: 'Sénégal' },
          { value: 'CM', label: 'Cameroun' },
          { value: 'BJ', label: 'Bénin' },
          { value: 'TG', label: 'Togo' },
          { value: 'BF', label: 'Burkina Faso' },
          { value: 'ML', label: 'Mali' },
          { value: 'NE', label: 'Niger' },
          { value: 'GA', label: 'Gabon' },
          { value: 'CG', label: 'Congo' },
          { value: 'TD', label: 'Tchad' },
          { value: 'CF', label: 'République Centrafricaine' },
          { value: 'GQ', label: 'Guinée Équatoriale' },
          { value: 'CD', label: 'RD Congo' },
          { value: 'GN', label: 'Guinée' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'institution_type',
        label: 'Type d\'institution',
        type: 'select',
        required: true,
        options: [
          { value: 'banque', label: 'Banque commerciale' },
          { value: 'banque-affaires', label: 'Banque d\'Affaires' },
          { value: 'sfd', label: 'SFD / EMF' },
          { value: 'fintech', label: 'Fintech' },
          { value: 'microfinance', label: 'Microfinance' },
          { value: 'assurance', label: 'Assurance' },
          { value: 'regulateur', label: 'Banque Centrale / Régulateur' },
          { value: 'dfi', label: 'DFI / Bailleur de fonds' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'countries_present',
        label: 'Nombre de pays de présence',
        type: 'select',
        required: false,
        options: [
          { value: '1', label: '1 pays' },
          { value: '2-3', label: '2 — 3 pays' },
          { value: '4-8', label: '4 — 8 pays' },
          { value: '9-14', label: '9 — 14 pays' },
          { value: 'plus-14', label: 'Plus de 14 pays' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // OQS-MUT-2026-06-25-001 : Simulateur Éligibilité Agrément Microfinance CEMAC
  // Signal OQS : Hausse 340% trafic CEMAC + Microfinance — rebond 68%
  // Mutation : Lead magnet spécifique zone CEMAC/BEAC/COBAC
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'simulateur-agrement-microfinance-cemac',
    slug: 'simulateur-agrement-microfinance-cemac',
    title: 'Simulateur d\'Éligibilité Agrément Microfinance CEMAC — COBAC/BEAC',
    subtitle: '15 questions, 8 minutes — Votre institution est-elle prête pour le dossier d\'agrément COBAC ? Score immédiat et feuille de route personnalisée',
    description:
      'Simulateur interactif conçu spécifiquement pour les institutions de microfinance en zone CEMAC (Cameroun, Gabon, Congo, Tchad, RCA, Guinée Équatoriale). Évaluez votre éligibilité à l\'agrément COBAC selon le Règlement COBAC EMF 2018/01 et le nouveau dispositif prudentiel BEAC. 15 questions, score immédiat, et feuille de route personnalisée.',
    category: 'conformite',
    targetAudience: 'Promoteurs, DG, DGA, DAF des EMF, SFD et institutions de microfinance en création ou en expansion en Afrique Centrale (CEMAC)',
    painPoint:
      'Le processus d\'agrément COBAC pour les établissements de microfinance en zone CEMAC est long (12-18 mois), complexe et opaque. 70% des dossiers sont rejetés au premier dépôt pour non-conformité documentaire. Les promoteurs perdent des mois sans savoir exactement ce qui bloque. Le pire : ils découvrent les critères exacts une fois le rejet prononcé.',
    consequences:
      'Retard de 12 à 24 mois dans le lancement des opérations. Coût d\'opportunité de 150-500M FCFA. Perte de la fenêtre de marché face aux concurrents déjà agréés. Découragement des investisseurs et partenaires techniques. Dans certains cas, impossibilité définitive d\'opérer dans le pays cible.',
    solution:
      'Ce simulateur exclusif de 15 questions couvre les 6 domaines d\'évaluation du dossier d\'agrément COBAC : capital minimum par pays, gouvernance, business plan, manuels de procédures, LBC/FT, et infrastructure technique. Vous obtenez un score d\'éligibilité sur 100, une matrice des forces/faiblesses, et une feuille de route séquencée pour constituer un dossier investor-grade en 90 jours.',
    proof:
      'Basé sur l\'expérience directe de KHEPRA EXPERTS au Gabon (direction d\'AMIFA sous supervision COBAC) et 15+ missions d\'agrément en zone CEMAC. Conforme au Règlement COBAC EMF 2018/01, aux Instructions BEAC, et au Règlement CEMAC n°01/16 LBC/FT. Taux de réussite au premier dépôt : 91% pour les institutions accompagnées.',
    ctaText: 'Démarrer la simulation gratuite — 8 min',
    ctaSecondary: 'Voir les 6 domaines évalués',
    conversionOffer: 'due-diligence',
    isActive: true,
    seoTitle:
      'Simulateur Agrément Microfinance CEMAC — Éligibilité COBAC BEAC | KHEPRA EXPERTS',
    seoDescription:
      'Simulateur d\'éligibilité à l\'agrément COBAC pour les institutions de microfinance en zone CEMAC. 15 questions, score immédiat, feuille de route 90 jours. Cameroun, Gabon, Congo, Tchad, RCA, Guinée Équatoriale.',
    seoKeywords:
      'agrément microfinance CEMAC, simulateur éligibilité COBAC, agrément EMF BEAC, Règlement COBAC EMF 2018/01, dossier agrément SFD Afrique Centrale, microfinance Cameroun Gabon Congo, KHEPRA EXPERTS CEMAC',
    accentColor: '#c9a227',
    icon: 'ri-bank-line',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Professional%20African%20central%20bank%20regulatory%20building%20BEAC%20COBAC%20with%20microfinance%20institution%20document%20review%20warm%20amber%20and%20teal%20lighting%20premium%20consulting%20atmosphere%20boardroom%20with%20Africa%20Central%20map%20Cameroon%20Gabon%20Congo%20highlighted%20editorial%20photography%20style%20sophisticated%20authoritative&width=1600&height=900&seq=simulateur-agrement-cemac-hero&orientation=landscape',
    benefits: [
      '15 questions ciblées couvrant les 6 domaines du dossier COBAC',
      'Score d\'éligibilité sur 100 avec matrice forces/faiblesses',
      'Seuils de capital minimum actualisés par pays (Cameroun, Gabon, Congo, Tchad, RCA, Guinée Équatoriale)',
      'Feuille de route 90 jours pour constituer un dossier conforme',
      'Références exactes au Règlement COBAC EMF 2018/01 et Instructions BEAC',
    ],
    stats: {
      value: '91%',
      label: 'de réussite au premier dépôt COBAC',
    },
    whatsInside: [
      'Domaine 1 : Capital Minimum & Structure Actionnariale (3 questions) — Seuils par pays CEMAC, composition du capital, actionnaires de référence',
      'Domaine 2 : Gouvernance & Dirigeants (3 questions) — CA, DG, comités spécialisés, honorabilité, expérience bancaire requise',
      'Domaine 3 : Business Plan & Modèle Économique (2 questions) — Projections 5 ans, équilibre financier, viabilité démontrée',
      'Domaine 4 : Manuels de Procédures (2 questions) — Crédit, recouvrement, contrôle interne, conformité LBC/FT',
      'Domaine 5 : LBC/FT & Conformité GABAC (3 questions) — Dispositif KYC, déclarations ANIF, formation, gel des avoirs',
      'Domaine 6 : Infrastructure Technique & SI (2 questions) — Core banking, sécurité, PCA/PRI, locaux conformes',
      'Rapport final : Score global, Matrice 6 domaines, Feuille de route 90 jours, Checklist documentaire COBAC',
    ],
    timeToComplete: '8 min',
    difficulty: 'Moyen',
    format: 'Diagnostic',
    formFields: [
      {
        name: 'full_name',
        label: 'Nom complet',
        type: 'text',
        placeholder: 'Jean-Marc Ndong',
        required: true,
      },
      {
        name: 'email',
        label: 'Email professionnel',
        type: 'email',
        placeholder: 'jm.ndong@microfinance.ga',
        required: true,
      },
      {
        name: 'organization',
        label: 'Institution / Projet',
        type: 'text',
        placeholder: 'EMF Avenir Gabon',
        required: true,
      },
      {
        name: 'position',
        label: 'Fonction',
        type: 'select',
        required: true,
        options: [
          { value: 'promoteur', label: 'Promoteur / Fondateur' },
          { value: 'dg', label: 'Directeur Général' },
          { value: 'dga', label: 'Directeur Général Adjoint' },
          { value: 'daf', label: 'Directeur Administratif et Financier' },
          { value: 'juriste', label: 'Juriste / Responsable Conformité' },
          { value: 'consultant', label: 'Consultant' },
          { value: 'autre', label: 'Autre' },
        ],
      },
      {
        name: 'country',
        label: 'Pays cible de l\'agrément',
        type: 'select',
        required: true,
        options: [
          { value: 'CM', label: 'Cameroun' },
          { value: 'GA', label: 'Gabon' },
          { value: 'CG', label: 'Congo' },
          { value: 'TD', label: 'Tchad' },
          { value: 'CF', label: 'République Centrafricaine' },
          { value: 'GQ', label: 'Guinée Équatoriale' },
        ],
      },
      {
        name: 'institution_type',
        label: 'Type d\'institution',
        type: 'select',
        required: true,
        options: [
          { value: 'emf-cat1', label: 'EMF Catégorie 1 — Caisse d\'épargne/crédit' },
          { value: 'emf-cat2', label: 'EMF Catégorie 2 — Société de microfinance' },
          { value: 'emf-cat3', label: 'EMF Catégorie 3 — Holding/réseau' },
          { value: 'sfd', label: 'SFD — Système Financier Décentralisé' },
          { value: 'nouvelle', label: 'Nouvelle institution (en création)' },
        ],
      },
      {
        name: 'project_stage',
        label: 'Stade du projet',
        type: 'select',
        required: true,
        options: [
          { value: 'ideation', label: 'Idéation / Étude de faisabilité' },
          { value: 'constitution', label: 'Constitution du dossier' },
          { value: 'depot', label: 'Dossier déposé — en attente' },
          { value: 'rejet', label: 'Premier rejet — besoin d\'appui' },
          { value: 'exploitation', label: 'Déjà en exploitation — renouvellement' },
        ],
      },
    ],
  },
];

// =============================================================================
// UTILITAIRES
// =============================================================================

export function getLeadMagnetBySlug(slug: string): LeadMagnet | undefined {
  return LEAD_MAGNETS.find((lm) => lm.slug === slug);
}

export function getLeadMagnetsByCategory(
  category: LeadMagnet['category']
): LeadMagnet[] {
  return LEAD_MAGNETS.filter((lm) => lm.category === category && lm.isActive);
}

export function getAllActiveLeadMagnets(): LeadMagnet[] {
  return LEAD_MAGNETS.filter((lm) => lm.isActive);
}

export function getLeadMagnetCategories(): {
  value: LeadMagnet['category'];
  label: string;
  count: number;
}[] {
  const categories: Record<string, { label: string; count: number }> = {
    conformite: { label: 'Conformité & Régulation', count: 0 },
    finance: { label: 'Finance & Investissement', count: 0 },
    esg: { label: 'ESG & Développement Durable', count: 0 },
    gouvernance: { label: 'Gouvernance & Conformité', count: 0 },
    'due-diligence': { label: 'Due Diligence & Évaluation', count: 0 },
  };

  LEAD_MAGNETS.forEach((lm) => {
    if (lm.isActive && categories[lm.category]) {
      categories[lm.category].count += 1;
    }
  });

  return Object.entries(categories).map(([value, data]) => ({
    value: value as LeadMagnet['category'],
    label: data.label,
    count: data.count,
  }));
}

export const CATEGORY_COLORS: Record<LeadMagnet['category'], string> = {
  conformite: '#c9a227',
  finance: '#22a05a',
  esg: '#22a05a',
  gouvernance: '#22a05a',
  'due-diligence': '#22a05a',
};

export const CATEGORY_ICONS: Record<LeadMagnet['category'], string> = {
  conformite: 'ri-shield-check-line',
  finance: 'ri-funds-line',
  esg: 'ri-leaf-line',
  gouvernance: 'ri-building-4-line',
  'due-diligence': 'ri-search-eye-line',
};

// =============================================================================
// SÉQUENCES EMAIL ASSOCIÉES
// =============================================================================

export interface EmailSequence {
  id: string;
  leadMagnetId: string;
  steps: {
    delayHours: number;
    subject: string;
    body: string;
    cta?: string;
    ctaLink?: string;
  }[];
}

export const EMAIL_SEQUENCES: EmailSequence[] = [
  {
    id: 'seq-guide-bceao-2026',
    leadMagnetId: 'guide-bceao-2026',
    steps: [
      {
        delayHours: 0,
        subject: 'Votre Guide BCEAO 2026 est prêt',
        body: 'Bonjour {{name}},\n\nMerci de votre intérêt pour la conformité BCEAO. Votre guide "Les 7 contrôles qui bloquent votre agrément" est en pièce jointe.\n\nLes 7 contrôles couverts :\n1. Gouvernance & Comités Spécialisés\n2. Rémunération & Conflits d\'Intérêts\n3. Ratios Prudentiels Bâle III\n4. LBC/FT & KYC\n5. Systèmes d\'Information & Cyber-résilience\n6. ALM & Liquidité\n7. PCA / PCI & Continuité d\'Activité\n\nChaque contrôle inclut : le texte réglementaire applicable, le problème exact, et le template de résolution.\n\nSi vous souhaitez un diagnostic personnalisé de votre institution, notre équipe peut identifier vos gaps spécifiques en 48h.',
        cta: 'Demander un diagnostic personnalisé',
        ctaLink: '/diagnostic-flash',
      },
      {
        delayHours: 48,
        subject: 'Alerte : 3 contrôles BCEAO à traiter en priorité',
        body: 'Bonjour {{name}},\n\nAprès analyse des 50 dernières missions BCEAO, voici les 3 contrôles qui bloquent le plus souvent :\n\n1. Gouvernance & Comités Spécialisés (35% des rejets)\n2. Ratios Prudentiels Bâle III (28% des rejets)\n3. LBC/FT & KYC (22% des rejets)\n\nAvez-vous déjà évalué votre exposition sur ces 3 domaines ?',
        cta: 'Évaluer mon exposition',
        ctaLink: '/tools/evaluation-conformite-reglementaire',
      },
      {
        delayHours: 168,
        subject: 'Comment une IMF a obtenu son agrément en 4 mois (au lieu de 14)',
        body: 'Bonjour {{name}},\n\nDécouvrez comment une SFD de 45 000 clients a obtenu son agrément BCEAO en 4 mois — en évitant les 3 rejets successifs qui font perdre 12 mois en moyenne.\n\nMéthode : application du guide + diagnostic personnalisé + accompagnement de 90 jours.\n\nLire le cas d\'étude complet.',
        cta: 'Lire le cas d\'étude',
        ctaLink: '/case-studies',
      },
    ],
  },
  {
    id: 'seq-checklist-conformite',
    leadMagnetId: 'checklist-conformite-bceao-cobac',
    steps: [
      {
        delayHours: 0,
        subject: 'Votre Checklist Conformité BCEAO/COBAC est prête',
        body: 'Bonjour {{name}},\n\nMerci de votre intérêt pour la conformité réglementaire. Votre checklist de 127 points est en pièce jointe.\n\nCette checklist couvre les 7 domaines critiques : gouvernance, ratios, LBC/FT, IT, crédit, ALM, et reporting.\n\nSi vous souhaitez une évaluation approfondie de votre institution, notre équipe peut réaliser un audit complet conforme aux standards BCEAO et COBAC.',
        cta: 'Demander un audit complet',
        ctaLink: '/services/due-diligence-acquisition',
      },
      {
        delayHours: 48,
        subject: 'Avez-vous identifié vos gaps de conformité ?',
        body: 'Bonjour {{name}},\n\nAvez-vous eu le temps de parcourir la checklist ?\n\nLes 3 domaines les plus critiques en UEMOA actuellement sont :\n1. LBC/FT et conformité KYC\n2. Ratios prudentiels Bâle III\n3. Cyber-résilience et PCA/PCI\n\nSi vous avez identifié des gaps, nous pouvons vous accompagner dans leur résolution.',
        cta: 'Planifier un diagnostic',
        ctaLink: '/diagnostic-flash',
      },
      {
        delayHours: 168,
        subject: 'Cas d\'étude : Comment une SFD a évité une sanction COBAC',
        body: 'Bonjour {{name}},\n\nDécouvrez comment une SFD de 35 000 clients a évité une sanction de 200M FCFA en anticipant ses gaps de conformité grâce à un audit préventif.\n\nLire le cas d\'étude complet.',
        cta: 'Lire le cas d\'étude',
        ctaLink: '/case-studies',
      },
    ],
  },
  {
    id: 'seq-guide-fonds',
    leadMagnetId: 'guide-levee-fonds-afrique',
    steps: [
      {
        delayHours: 0,
        subject: 'Votre Guide Levée de Fonds est disponible',
        body: 'Bonjour {{name}},\n\nVotre guide complet de 89 critères pour sécuriser une levée de fonds en Afrique francophone est prêt.\n\nIl couvre les 5 dimensions essentielles : financière, gouvernance, modèle, équipe, et croissance.\n\nBesoin d\'accompagnement personnalisé ? Notre équipe peut préparer votre dossier investor-grade.',
        cta: 'Évaluer ma readiness',
        ctaLink: '/tools/investment-readiness',
      },
      {
        delayHours: 72,
        subject: 'Les 5 erreurs qui tuent 70% des levées de fonds',
        body: 'Bonjour {{name}},\n\nAprès 120M+ FCFA levés pour nos clients, nous avons identifié les 5 erreurs récurrentes :\n\n1. Valorisation non documentée\n2. Gouvernance insuffisante\n3. Modèle économique non scalable\n4. Équipe incomplète\n5. Traction insuffisante\n\nÉvitez ces erreurs avec notre accompagnement.',
        cta: 'Prendre rendez-vous',
        ctaLink: '/contact',
      },
      {
        delayHours: 336,
        subject: 'Investisseur en vue : Préparez votre dossier maintenant',
        body: 'Bonjour {{name}},\n\nLes investisseurs institutionnels (IFC, Proparco, BIDC) ouvrent leurs fenêtres de financement pour 2026.\n\nUn dossier préparé 6 mois à l\'avance a 3x plus de chances de succès.\n\nNous pouvons construire votre dossier investor-grade en 90 jours.',
        cta: 'Démarrer la préparation',
        ctaLink: '/services/levee-de-fonds',
      },
    ],
  },
  {
    id: 'seq-simulation-risque',
    leadMagnetId: 'simulation-risque-reglementaire',
    steps: [
      {
        delayHours: 0,
        subject: 'Votre rapport de simulation risque réglementaire',
        body: 'Bonjour {{name}},\n\nVotre simulation de risque réglementaire est terminée. Voici votre rapport personnalisé.\n\nLe score et la matrice des risques vous donnent une vision claire de votre exposition.\n\nPour une évaluation approfondie par nos experts, demandez un diagnostic complet.',
        cta: 'Diagnostic complet',
        ctaLink: '/diagnostic-flash',
      },
      {
        delayHours: 48,
        subject: 'Alerte : 3 risques réglementaires à traiter en priorité',
        body: 'Bonjour {{name}},\n\nBasé sur les dernières circulaires BCEAO et COBAC, voici les 3 risques à traiter en priorité :\n\n1. Conformité LBC/FT (nouvelle directive 2024)\n2. Ratios de solvabilité Bâle III\n3. Cyber-résilience et tests de intrusion\n\nNous pouvons vous accompagner dans la mise en conformité.',
        cta: 'Planifier un audit',
        ctaLink: '/contact',
      },
    ],
  },
  {
    id: 'seq-template-gouvernance',
    leadMagnetId: 'template-audit-gouvernance',
    steps: [
      {
        delayHours: 0,
        subject: 'Votre Template Audit de Gouvernance est prêt',
        body: 'Bonjour {{name}},\n\nVotre template complet d\'audit de gouvernance (8 domaines, grille d\'évaluation, questionnaires) est en pièce jointe.\n\nConforme AUSCGIE OHADA et circulaires BCEAO/COBAC.\n\nBesoin d\'un accompagnement pour la mise en place ?',
        cta: 'Demander un accompagnement',
        ctaLink: '/services/conseil-strategique',
      },
      {
        delayHours: 96,
        subject: 'Gouvernance : Le cas de la SFD qui a transformé son CA',
        body: 'Bonjour {{name}},\n\nUne SFD de la zone UEMOA a augmenté son capital de 200% après une refonte de sa gouvernance.\n\nDécouvrez comment dans notre cas d\'étude.',
        cta: 'Lire le cas d\'étude',
        ctaLink: '/case-studies',
      },
    ],
  },
  {
    id: 'seq-mini-dd',
    leadMagnetId: 'mini-rapport-due-diligence',
    steps: [
      {
        delayHours: 0,
        subject: 'Votre demande de Due Diligence Express est enregistrée',
        body: 'Bonjour {{name}},\n\nNous avons bien reçu votre demande de mini-rapport de due diligence.\n\nNotre équipe vous contactera sous 24h pour planifier le diagnostic.\n\nEn attendant, découvrez notre méthodologie de due diligence.',
        cta: 'Voir la méthodologie',
        ctaLink: '/services/due-diligence-acquisition',
      },
      {
        delayHours: 24,
        subject: 'Confirmation : Due Diligence Express — Prochaines étapes',
        body: 'Bonjour {{name}},\n\nNotre équipe est prête à démarrer votre due diligence express.\n\nVoici les prochaines étapes :\n1. Signature du NDA\n2. Transmission des documents\n3. Audit sur place (si nécessaire)\n4. Livraison du rapport en 48h\n\nCliquez ci-dessous pour confirmer le démarrage.',
        cta: 'Confirmer le démarrage',
        ctaLink: '/contact',
      },
    ],
  },
  {
    id: 'seq-diagnostic-esg',
    leadMagnetId: 'diagnostic-esg-maturite',
    steps: [
      {
        delayHours: 0,
        subject: 'Votre diagnostic ESG est terminé — Voici votre rapport',
        body: 'Bonjour {{name}},\n\nVotre diagnostic de maturité ESG est terminé. Voici votre rapport personnalisé avec score, cartographie des risques, et recommandations.\n\nSi vous souhaitez structurer une stratégie ESG complète conforme IFC PS 1-8, notre équipe peut vous accompagner.',
        cta: 'Structurer ma stratégie ESG',
        ctaLink: '/services/conseil-strategique',
      },
      {
        delayHours: 72,
        subject: 'ESG : Les financements DFI vous attendent',
        body: 'Bonjour {{name}},\n\nLes DFI (BOAD, IFC, Proparco) ont doublé leur budget ESG en 2026.\n\nUne entreprise avec un positionnement ESG solide a 3x plus de chances d\'obtenir un financement.\n\nNous pouvons construire votre stratégie ESG en 90 jours.',
        cta: 'Construire ma stratégie ESG',
        ctaLink: '/contact',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // AGENT 10 — SÉQUENCE NURTURING : Diagnostic Flash Conformité BCEAO/COBAC 2026
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'seq-diagnostic-flash-conformite-2026',
    leadMagnetId: 'diagnostic-flash-conformite-bceao-cobac-2026',
    steps: [
      {
        delayHours: 0,
        subject: 'Votre Diagnostic Flash Conformité BCEAO/COBAC 2026 est prêt',
        body: 'Bonjour {{name}},\n\nFélicitations — votre Diagnostic Flash Conformité 2026 est terminé.\n\nVoici votre rapport personnalisé avec :\n• Score global sur 100\n• Matrice des risques par domaine (Gouvernance, Ratios, LBC/FT, IT, ALM)\n• Benchmark par rapport aux institutions de votre catégorie\n• Plan d\'action priorisé sur 90 jours\n\nLes 5 domaines évalués :\n1. Gouvernance & Contrôle Interne\n2. Ratios Prudentiels & Solvabilité\n3. LBC/FT & Conformité KYC\n4. Systèmes d\'Information & Cyber-résilience\n5. ALM, Liquidité & Reporting\n\n⚠️ Important : Les gaps identifiés en rouge dans la matrice nécessitent une action sous 45 jours pour être en conformité avant le prochain cycle d\'inspection.\n\nNotre équipe peut vous accompagner dans la résolution prioritaire de ces écarts.',
        cta: 'Planifier un diagnostic approfondi',
        ctaLink: '/diagnostic-flash',
      },
      {
        delayHours: 48,
        subject: '[ALERTE] Les 3 gaps de conformité les plus critiques en 2026',
        body: 'Bonjour {{name}},\n\nAprès analyse des 50 dernières missions d\'inspection BCEAO et COBAC, voici les 3 domaines qui génèrent le plus de réserves majeures :\n\n1. 🔴 LBC/FT & KYC (38% des sanctions)\n   → Nouvelle directive 02-2015 renforcée, obligations de déclaration étendues\n   → 80% des SFD et EMF sous-équipés en dispositif LBC/FT\n\n2. 🟠 Gouvernance & Comités Spécialisés (27% des sanctions)\n   → Circulaire 01-2017/CB : indépendance des administrateurs, comités obligatoires\n   → 65% des conseils ne respectent pas le quota d\'administrateurs indépendants\n\n3. 🟡 Cyber-résilience & PCA/PCI (19% des sanctions)\n   → Tests d\'intrusion obligatoires, plan de continuité documenté\n   → 55% des institutions n\'ont pas de PCA testé depuis plus de 12 mois\n\nVotre score sur ces 3 domaines est dans votre rapport. Si l\'un d\'eux est en zone rouge, agissez maintenant — le délai moyen de mise en conformité est de 60 à 90 jours.',
        cta: 'Recevoir un plan de remédiation personnalisé',
        ctaLink: '/contact',
      },
      {
        delayHours: 120,
        subject: 'Cas d\'étude : Comment une SFD a évité 200M FCFA de sanctions',
        body: 'Bonjour {{name}},\n\nDécouvrez l\'histoire d\'une SFD de 45 000 clients en zone UEMOA qui a transformé une situation critique en succès réglementaire.\n\n📋 La situation initiale :\n• 3 réserves majeures lors de l\'inspection précédente\n• Plan de redressement sous 45 jours exigé par la BCEAO\n• Risque de restriction des opérations de crédit\n\n🔍 L\'intervention KHEPRA :\n• Diagnostic Flash en 48h — 12 gaps critiques identifiés\n• Plan de remédiation 90 jours avec jalons réglementaires\n• Accompagnement dans la mise en œuvre\n\n✅ Le résultat :\n• 0 réserve majeure à l\'inspection suivante\n• 200M FCFA de sanctions évitées\n• Notation institutionnelle relevée de « sous surveillance » à « conforme »\n• Accès restauré aux lignes de refinancement\n\n📄 Cas d\'étude complet disponible.',
        cta: 'Lire le cas d\'étude complet',
        ctaLink: '/case-studies',
      },
      {
        delayHours: 192,
        subject: 'Calendrier réglementaire 2026 : Les échéances à ne pas manquer',
        body: 'Bonjour {{name}},\n\nVoici les échéances réglementaires clés pour 2026 en zones UEMOA et CEMAC :\n\n📅 UEMOA (BCEAO)\n• 31 Mars — Reporting annuel prudentiel (états CER, SURFI)\n• 30 Juin — Déclaration LBC/FT semestrielle (CENTIF)\n• 30 Septembre — Publication des états financiers audités\n• 31 Décembre — Mise à jour du PCA/PCI obligatoire\n\n📅 CEMAC (COBAC)\n• 31 Mars — Reporting COBAC annuel (états réglementaires)\n• 30 Juin — Déclaration LBC/FT semestrielle (ANIF)\n• 30 Septembre — Audit externe annuel\n• 31 Décembre — Test de résilience cyber annuel\n\n⚠️ Nouveauté 2026 : La BCEAO renforce les exigences de reporting ESG pour les institutions de plus de 25 Milliards FCFA de bilan.\n\nBesoin d\'un accompagnement pour préparer ces échéances ?',
        cta: 'Réserver une consultation stratégique',
        ctaLink: '/contact',
      },
      {
        delayHours: 336,
        subject: 'Dernière chance : Votre diagnostic gratuit expire dans 7 jours',
        body: 'Bonjour {{name}},\n\nVotre Diagnostic Flash Conformité BCEAO/COBAC 2026 reste accessible gratuitement pendant encore 7 jours.\n\nNe laissez pas vos gaps de conformité s\'aggraver. Chaque mois sans action :\n• Augmente votre exposition aux sanctions (amendes jusqu\'à 500M FCFA)\n• Détériore votre notation institutionnelle\n• Réduit votre accès aux financements\n\n🔐 Votre rapport contient :\n• Votre score personnalisé sur 100\n• La matrice des risques 5×5\n• Le benchmark par rapport aux institutions de votre catégorie\n• Le plan d\'action 90 jours\n\nPassez à l\'action maintenant. Notre équipe est prête à vous accompagner dans la mise en conformité.',
        cta: 'Planifier un accompagnement — Offre découverte',
        ctaLink: '/offre-commerciale',
      },
    ],
  },
];

export function getEmailSequenceForLeadMagnet(leadMagnetId: string): EmailSequence | undefined {
  return EMAIL_SEQUENCES.find((seq) => seq.leadMagnetId === leadMagnetId);
}

// =============================================================================
// DONNÉES DE CAMPAGNES
// =============================================================================

export interface CampaignData {
  id: string;
  slug: string;
  name: string;
  type: 'conformite' | 'finance' | 'esg';
  description: string;
  targetAudience: string;
  leadMagnets: string[]; // IDs des lead magnets
  emailSequence: string;
  landingPageUrl: string;
  status: 'active' | 'paused' | 'completed';
  metrics: {
    leadsGenerated: number;
    emailsSent: number;
    openRate: number;
    clickRate: number;
    conversionRate: number;
  };
  startDate: string;
  endDate?: string;
}

export const CAMPAIGNS: CampaignData[] = [
  {
    id: 'campagne-conformite',
    slug: 'conformite-regulation',
    name: 'Campagne Conformité & Régulation',
    type: 'conformite',
    description:
      'Campagne ciblant les institutions financières pour la conformité BCEAO/COBAC. Lead magnets : Checklist conformité, Simulation risque.',
    targetAudience: 'Banques, SFD, EMF, Fintechs',
    leadMagnets: ['checklist-conformite-bceao-cobac', 'simulation-risque-reglementaire'],
    emailSequence: 'seq-checklist-conformite',
    landingPageUrl: '/l/conformite-bancaire',
    status: 'active',
    metrics: {
      leadsGenerated: 0,
      emailsSent: 0,
      openRate: 0,
      clickRate: 0,
      conversionRate: 0,
    },
    startDate: '2026-06-01',
  },
  {
    id: 'campagne-finance',
    slug: 'finance-investissement',
    name: 'Campagne Finance & Investissement',
    type: 'finance',
    description:
      'Campagne ciblant les entreprises en levée de fonds. Lead magnets : Guide levée de fonds, Mini DD express.',
    targetAudience: 'Startups, PME, IMF en levée',
    leadMagnets: ['guide-levee-fonds-afrique', 'mini-rapport-due-diligence'],
    emailSequence: 'seq-guide-fonds',
    landingPageUrl: '/l/levée-fonds',
    status: 'active',
    metrics: {
      leadsGenerated: 0,
      emailsSent: 0,
      openRate: 0,
      clickRate: 0,
      conversionRate: 0,
    },
    startDate: '2026-06-01',
  },
  {
    id: 'campagne-esg',
    slug: 'esg-gouvernance',
    name: 'Campagne ESG & Gouvernance',
    type: 'esg',
    description:
      'Campagne ciblant les entreprises et projets industriels. Lead magnets : Diagnostic ESG, Template audit gouvernance.',
    targetAudience: 'Entreprises, projets industriels, promoteurs',
    leadMagnets: ['diagnostic-esg-maturite', 'template-audit-gouvernance'],
    emailSequence: 'seq-diagnostic-esg',
    landingPageUrl: '/l/esg-advisory',
    status: 'active',
    metrics: {
      leadsGenerated: 0,
      emailsSent: 0,
      openRate: 0,
      clickRate: 0,
      conversionRate: 0,
    },
    startDate: '2026-06-01',
  },
];

export function getCampaignBySlug(slug: string): CampaignData | undefined {
  return CAMPAIGNS.find((c) => c.slug === slug);
}

export function getCampaignsByType(type: CampaignData['type']): CampaignData[] {
  return CAMPAIGNS.filter((c) => c.type === type);
}