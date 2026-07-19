// ─── KOS™ BIG FOUR VIDEO PODCAST PUBLISHING PACK ───
// 10 Livrables par vidéo + Scoring Qualité + Checklist Publication
// Standard Big Four — Deloitte · PwC · EY · KPMG
// 23 Juin 2026

export interface VideoMasterDeliverable {
  fileName: string;
  format: string;
  resolution: string;
  audio: string;
  duration: string;
  sizeMB: number;
  ready: boolean;
  hasIntro: boolean;
  hasOutro: boolean;
  hasSubtitles: boolean;
  downloadUrl: string;
}

export interface ThumbnailDeliverable {
  fileName: string;
  resolution: string;
  titleText: string;
  wordCount: number;
  contrastLevel: string;
  hasLogo: boolean;
  ready: boolean;
  prompt: string;
  downloadUrl: string;
}

export interface YoutubeTitleDeliverable {
  text: string;
  charCount: number;
  limit: number;
  seoOptimized: boolean;
  ready: boolean;
}

export interface YoutubeDescriptionDeliverable {
  summary: string;
  summaryWordCount: number;
  points: string[];
  resources: { label: string; url: string; type: string }[];
  chapters: { time: string; title: string }[];
  hashtags: string[];
  ready: boolean;
}

export interface KeywordsDeliverable {
  keywords: string[];
  count: number;
  ready: boolean;
}

export interface LinkedInPostDeliverable {
  dirigeant: string;
  pageEntreprise: string;
  ready: boolean;
}

export interface ArticleDeliverable {
  title: string;
  wordCount: number;
  targetWordCount: string;
  seoOptimized: boolean;
  status: string;
  url: string;
  ready: boolean;
}

export interface ShortDeliverable {
  shortId: string;
  title: string;
  duration: string;
  format: string;
  resolution: string;
  objective: string;
  ready: boolean;
}

export interface CarrouselDeliverable {
  slides: number;
  format: string;
  ctaText: string;
  status: string;
  ready: boolean;
}

export interface ComplianceCheckItem {
  checkId: string;
  name: string;
  category: string;
  passed: boolean;
  score: number;
  maxScore: number;
  detail: string;
  autoFixed: boolean;
}

export interface ComplianceReportDeliverable {
  checks: ComplianceCheckItem[];
  globalScore: number;
  minScoreRequired: number;
  authorized: boolean;
  ready: boolean;
}

export interface PublishingPack {
  packId: string;
  videoTitle: string;
  topic: string;
  date: string;
  version: string;
  namingConvention: string;
  status: 'APPROVED' | 'BLOCKED' | 'DRAFT';
  globalScore: number;
  minScoreRequired: number;

  videoMaster: VideoMasterDeliverable;
  thumbnail: ThumbnailDeliverable;
  youtubeTitle: YoutubeTitleDeliverable;
  youtubeDescription: YoutubeDescriptionDeliverable;
  keywords: KeywordsDeliverable;
  linkedinPosts: LinkedInPostDeliverable;
  article: ArticleDeliverable;
  shorts: ShortDeliverable[];
  carrousel: CarrouselDeliverable;
  complianceReport: ComplianceReportDeliverable;

  checklist: {
    id: string;
    label: string;
    icon: string;
    checked: boolean;
    category: string;
  }[];

  linkedinPostDirigeant: string;
  linkedinPostPage: string;

  totalDeliverables: number;
  deliverablesReady: number;

  correctiveActions: string[];
}

// ═══════════════ PACK 1 — APPROVED 94/100 ═══════════════
const PACK_BCEAO_2026_APPROVED: PublishingPack = {
  packId: 'PACK-001',
  videoTitle: 'BCEAO 2026 : Les 7 Erreurs Qui Bloquent un Agrément Bancaire',
  topic: 'Agrément bancaire BCEAO — Conformité réglementaire UEMOA',
  date: '2026-06-23',
  version: 'V1',
  namingConvention: '2026-06-23_BCEAO-AGREMENT-ERREURS_V1',
  status: 'APPROVED',
  globalScore: 94,
  minScoreRequired: 90,

  videoMaster: {
    fileName: '2026-06-23_BCEAO-AGREMENT-ERREURS_V1.mp4',
    format: 'MP4',
    resolution: '1920x1080',
    audio: '48 kHz',
    duration: '14 min 30 s',
    sizeMB: 842,
    ready: true,
    hasIntro: true,
    hasOutro: true,
    hasSubtitles: true,
    downloadUrl: '/downloads/2026-06-23_BCEAO-AGREMENT-ERREURS_V1.mp4',
  },

  thumbnail: {
    fileName: 'THUMBNAIL_BCEAO_2026.png',
    resolution: '1280x720',
    titleText: 'BCEAO 2026 : 7 Erreurs Fatales',
    wordCount: 5,
    contrastLevel: 'Très élevé',
    hasLogo: true,
    ready: true,
    prompt: 'Professional dark finance documentary thumbnail showing a red warning sign with African regulatory documents scattered on a desk, dramatic lighting, high contrast, clean minimal design, KHEPRA EXPERTS branding subtle, gold and crimson accents, abstract regulatory compliance theme, no people, text overlay ready',
    downloadUrl: '/downloads/THUMBNAIL_BCEAO_2026.png',
  },

  youtubeTitle: {
    text: 'BCEAO 2026 : Les 7 Erreurs Qui Bloquent un Agrément Bancaire | Guide Complet KHEPRA EXPERTS',
    charCount: 89,
    limit: 100,
    seoOptimized: true,
    ready: true,
  },

  youtubeDescription: {
    summary: 'Découvrez les 7 erreurs les plus fréquentes qui bloquent les dossiers d\'agrément bancaire auprès de la BCEAO en 2026. Cette analyse complète, basée sur notre expérience terrain de plus de 50 dossiers traités en zone UEMOA, détaille chaque piège à éviter et fournit les solutions concrètes pour sécuriser votre demande d\'agrément. De la gouvernance à la conformité en passant par le contrôle interne et la gestion des risques, nous couvrons l\'intégralité du référentiel d\'évaluation de la Commission Bancaire.',
    summaryWordCount: 98,
    points: [
      'Gouvernance : Composition du Conseil d\'Administration et comités spécialisés — exigences circulaire 01-2017',
      'Conformité : Dispositif LBC/FT complet — 40 recommandations GAFI actualisées',
      'Contrôle interne : Architecture 3 lignes de défense — circulaire 03-2017',
      'Gestion des risques : Cartographie, stress tests, dispositif prudentiel Bâle III UEMOA',
      'Fonds propres : Ratio de solvabilité minimum, qualité des apporteurs de capitaux',
      'Business plan : Projections financières 5 ans, hypothèses validées, stress tests',
      'Actionnariat : Due diligence des actionnaires de référence, origine des fonds',
    ],
    resources: [
      { label: 'Article complet sur KhepraExperts.com', url: 'https://khepraexperts.com/blog/agrement-bancaire-bceao-2026-7-erreurs-fatales', type: 'article' },
      { label: 'Site web KHEPRA EXPERTS', url: 'https://khepraexperts.com', type: 'website' },
      { label: 'Diagnostic Flash Conformité BCEAO', url: 'https://khepraexperts.com/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026', type: 'diagnostic' },
      { label: 'Prise de rendez-vous stratégique', url: 'https://khepraexperts.com/contact', type: 'booking' },
    ],
    chapters: [
      { time: '00:00', title: 'Introduction — Pourquoi 80% des dossiers sont rejetés' },
      { time: '01:45', title: 'Erreur 1 : Gouvernance incomplète' },
      { time: '03:30', title: 'Erreur 2 : Dispositif LBC/FT insuffisant' },
      { time: '05:50', title: 'Erreur 3 : Contrôle interne défaillant' },
      { time: '08:10', title: 'Erreur 4 : Cartographie des risques absente' },
      { time: '10:00', title: 'Erreur 5 : Fonds propres sous-calibrés' },
      { time: '11:45', title: 'Erreur 6 : Business plan irréaliste' },
      { time: '13:15', title: 'Erreur 7 : Actionnariat non documenté' },
      { time: '14:00', title: 'Conclusion — Votre plan d\'action en 5 étapes' },
    ],
    hashtags: [
      '#BCEAO', '#COBAC', '#OHADA', '#ConformiteBancaire', '#AgrementBancaire',
      '#AuditInterne', '#RiskManagement', '#BanqueAfrique', '#FintechAfrique',
      '#KHEPRAExperts', '#UEMOA', '#CEMAC', '#GouvernanceBancaire',
    ],
    ready: true,
  },

  keywords: {
    keywords: [
      'BCEAO', 'agrément BCEAO', 'agrément bancaire UEMOA', 'conformité bancaire',
      'audit interne', 'risk management', 'COBAC', 'OHADA', 'gouvernance bancaire',
      'finance Afrique', 'LBC/FT', 'GAFI', 'ratio solvabilité', 'contrôle interne',
      'Commission Bancaire', 'établissement de crédit', 'circulaire 01-2017',
      'circulaire 03-2017', 'fonds propres',
    ],
    count: 19,
    ready: true,
  },

  linkedinPosts: {
    dirigeant: '🚨 BCEAO 2026 : 80% des dossiers d\'agrément bancaire sont rejetés.\n\nEn 15 ans de pratique, j\'ai identifié 7 erreurs fatales qui bloquent systématiquement les établissements.\n\nLa plus fréquente ? Une gouvernance qui existe sur le papier mais pas dans les faits.\n\nJ\'ai condensé notre expérience sur 50+ dossiers UEMOA dans cette vidéo de 14 minutes.\n\n🎥 Lien en commentaire.\n\n#BCEAO #GouvernanceBancaire #KHEPRAExperts',
    pageEntreprise: '📊 Nouveau Guide Vidéo KHEPRA EXPERTS\n\nBCEAO 2026 : Les 7 Erreurs Qui Bloquent un Agrément Bancaire\n\nBasé sur l\'analyse de 50+ dossiers traités en zone UEMOA, notre guide vidéo détaille :\n\n✅ Les 7 pièges réglementaires à éviter\n✅ Les solutions concrètes par pilier (gouvernance, conformité, risques)\n✅ Le plan d\'action prioritaire pour sécuriser votre dossier\n\n🎥 Visionnez la vidéo complète (14 min)\n📋 Téléchargez notre checklist gratuite\n📅 Réservez un diagnostic personnalisé\n\n#BCEAO #ConformiteBancaire #AgrementBancaire #UEMOA #KHEPRAExperts',
    ready: true,
  },

  article: {
    title: 'BCEAO 2026 : Les 7 Erreurs Qui Bloquent un Agrément Bancaire en Zone UEMOA — Guide Complet',
    wordCount: 1850,
    targetWordCount: '1200-2500',
    seoOptimized: true,
    status: 'Publié sur KhepraExperts.com',
    url: 'https://khepraexperts.com/blog/agrement-bancaire-bceao-2026-7-erreurs-fatales',
    ready: true,
  },

  shorts: [
    {
      shortId: 'SHORT-001-A',
      title: 'L\'Erreur N°1 qui bloque votre agrément BCEAO',
      duration: '45 s',
      format: 'Vertical',
      resolution: '1080x1920',
      objective: 'Attirer vers la vidéo principale',
      ready: true,
    },
    {
      shortId: 'SHORT-001-B',
      title: 'BCEAO 2026 : Avez-vous ces 3 documents ?',
      duration: '38 s',
      format: 'Vertical',
      resolution: '1080x1920',
      objective: 'Attirer vers la vidéo principale',
      ready: true,
    },
    {
      shortId: 'SHORT-001-C',
      title: 'Le piège du business plan irréaliste',
      duration: '52 s',
      format: 'Vertical',
      resolution: '1080x1920',
      objective: 'Attirer vers la vidéo principale',
      ready: true,
    },
  ],

  carrousel: {
    slides: 10,
    format: 'PDF',
    ctaText: 'Téléchargez la checklist gratuite sur KhepraExperts.com',
    status: 'Généré',
    ready: true,
  },

  complianceReport: {
    checks: [
      {
        checkId: 'QC-001', name: 'Vérification Copyright', category: 'juridique',
        passed: true, score: 19, maxScore: 20,
        detail: 'Toutes les sources sont citées. Images libres de droits. Musique sous licence. Contenu original KHEPRA EXPERTS.',
        autoFixed: false,
      },
      {
        checkId: 'QC-002', name: 'Validation des Sources', category: 'qualite',
        passed: true, score: 18, maxScore: 20,
        detail: '12 sources vérifiées : textes officiels BCEAO, circulaires, rapports GAFI. 2 sources académiques, 5 institutionnelles.',
        autoFixed: false,
      },
      {
        checkId: 'QC-003', name: 'Exactitude du Contenu', category: 'qualite',
        passed: true, score: 20, maxScore: 20,
        detail: 'Contenu validé par 2 experts KHEPRA EXPERTS. Aucune erreur factuelle détectée. Données chiffrées vérifiées.',
        autoFixed: false,
      },
      {
        checkId: 'QC-004', name: 'Optimisation SEO', category: 'seo',
        passed: true, score: 18, maxScore: 20,
        detail: 'Titre 89 caractères. Description 98 mots. 13 hashtags. 19 mots-clés. Chapitres horodatés. CTR estimé 9.4%.',
        autoFixed: true,
      },
      {
        checkId: 'QC-005', name: 'Branding KHEPRA EXPERTS', category: 'branding',
        passed: true, score: 19, maxScore: 20,
        detail: 'Logo présent intro/outro. Palette institutionnelle respectée (rouge KHEPRA, or Big Four). Typographie conforme charte.',
        autoFixed: true,
      },
      {
        checkId: 'QC-006', name: 'Conformité Réglementaire', category: 'reglementaire',
        passed: true, score: 20, maxScore: 20,
        detail: 'Conforme aux exigences BCEAO/COBAC/OHADA. Mentions légales incluses. Aucune information confidentielle divulguée.',
        autoFixed: false,
      },
      {
        checkId: 'QC-007', name: 'Qualité Audio & Vidéo', category: 'technique',
        passed: true, score: 18, maxScore: 20,
        detail: 'Audio 48 kHz validé. Vidéo 1080p 30fps. Sous-titres synchronisés. Pas de bruit de fond. Éclairage uniforme.',
        autoFixed: true,
      },
    ],
    globalScore: 94,
    minScoreRequired: 90,
    authorized: true,
    ready: true,
  },

  checklist: [
    { id: 'CHK-01', label: 'Vidéo exportée en MP4 1080p', icon: 'ri-movie-line', checked: true, category: 'technique' },
    { id: 'CHK-02', label: 'Miniature validée — contraste élevé', icon: 'ri-image-line', checked: true, category: 'design' },
    { id: 'CHK-03', label: 'Description SEO validée', icon: 'ri-search-eye-line', checked: true, category: 'seo' },
    { id: 'CHK-04', label: 'Tags SEO validés (13 hashtags)', icon: 'ri-hashtag', checked: true, category: 'seo' },
    { id: 'CHK-05', label: 'Chapitres horodatés ajoutés', icon: 'ri-list-check', checked: true, category: 'seo' },
    { id: 'CHK-06', label: 'Liens vérifiés (4 ressources)', icon: 'ri-link', checked: true, category: 'qualite' },
    { id: 'CHK-07', label: 'Sous-titres FR intégrés', icon: 'ri-closed-captioning-line', checked: true, category: 'technique' },
    { id: 'CHK-08', label: 'Branding KHEPRA EXPERTS présent', icon: 'ri-shield-star-line', checked: true, category: 'branding' },
    { id: 'CHK-09', label: 'CTA présent (abonnement + site + diagnostic)', icon: 'ri-user-add-line', checked: true, category: 'marketing' },
    { id: 'CHK-10', label: 'Score qualité ≥ 90/100', icon: 'ri-check-double-line', checked: true, category: 'qualite' },
    { id: 'CHK-11', label: 'Rapport conformité généré et validé', icon: 'ri-file-shield-line', checked: true, category: 'juridique' },
  ],

  linkedinPostDirigeant: '🚨 BCEAO 2026 : 80% des dossiers d\'agrément bancaire sont rejetés.\n\nEn 15 ans de pratique, j\'ai identifié 7 erreurs fatales qui bloquent systématiquement les établissements.\n\nLa plus fréquente ? Une gouvernance qui existe sur le papier mais pas dans les faits.\n\nJ\'ai condensé notre expérience sur 50+ dossiers UEMOA dans cette vidéo de 14 minutes.\n\n🎥 Lien en commentaire.\n\n#BCEAO #GouvernanceBancaire #KHEPRAExperts',

  linkedinPostPage: '📊 Nouveau Guide Vidéo KHEPRA EXPERTS\n\nBCEAO 2026 : Les 7 Erreurs Qui Bloquent un Agrément Bancaire\n\nBasé sur l\'analyse de 50+ dossiers traités en zone UEMOA, notre guide vidéo détaille :\n\n✅ Les 7 pièges réglementaires à éviter\n✅ Les solutions concrètes par pilier (gouvernance, conformité, risques)\n✅ Le plan d\'action prioritaire pour sécuriser votre dossier\n\n🎥 Visionnez la vidéo complète (14 min)\n📋 Téléchargez notre checklist gratuite\n📅 Réservez un diagnostic personnalisé\n\n#BCEAO #ConformiteBancaire #AgrementBancaire #UEMOA #KHEPRAExperts',

  totalDeliverables: 10,
  deliverablesReady: 10,

  correctiveActions: [],
};

// ═══════════════ PACK 2 — BLOCKED 72/100 ═══════════════
const PACK_LEVEE_FONDS_BLOCKED: PublishingPack = {
  packId: 'PACK-002',
  videoTitle: 'Guide Levée de Fonds Afrique 2026 : Due Diligence, Valorisation & Négociation',
  topic: 'Levée de fonds — Due diligence investisseurs — Valorisation startups Afrique',
  date: '2026-06-22',
  version: 'V1',
  namingConvention: '2026-06-22_LEVEE-FONDS-AFRIQUE-DUE-DILIGENCE_V1',
  status: 'BLOCKED',
  globalScore: 72,
  minScoreRequired: 90,

  videoMaster: {
    fileName: '2026-06-22_LEVEE-FONDS-AFRIQUE-DUE-DILIGENCE_V1.mp4',
    format: 'MP4',
    resolution: '1920x1080',
    audio: '44.1 kHz',
    duration: '18 min 20 s',
    sizeMB: 1120,
    ready: true,
    hasIntro: true,
    hasOutro: false,
    hasSubtitles: false,
    downloadUrl: '/downloads/2026-06-22_LEVEE-FONDS-AFRIQUE-DUE-DILIGENCE_V1.mp4',
  },

  thumbnail: {
    fileName: 'THUMBNAIL_LEVEE_FONDS_2026.png',
    resolution: '1280x720',
    titleText: 'Levée de Fonds Afrique 2026',
    wordCount: 4,
    contrastLevel: 'Moyen',
    hasLogo: true,
    ready: true,
    prompt: 'Professional finance thumbnail showing abstract investment charts with African continent silhouette, gold and dark green tones, clean modern design, high contrast needed, KHEPRA EXPERTS branding, fundraising theme, abstract geometric patterns, no people',
    downloadUrl: '/downloads/THUMBNAIL_LEVEE_FONDS_2026.png',
  },

  youtubeTitle: {
    text: 'Levée de Fonds Afrique : Due Diligence Investisseurs — Guide Complet',
    charCount: 62,
    limit: 100,
    seoOptimized: false,
    ready: true,
  },

  youtubeDescription: {
    summary: 'Guide sur la levée de fonds en Afrique. Nous abordons la due diligence, la valorisation et la négociation.',
    summaryWordCount: 18,
    points: [
      'Due diligence investisseurs',
      'Valorisation startup',
      'Négociation term sheet',
    ],
    resources: [
      { label: 'Site web KHEPRA EXPERTS', url: 'https://khepraexperts.com', type: 'website' },
    ],
    chapters: [
      { time: '00:00', title: 'Introduction' },
      { time: '05:20', title: 'Due Diligence' },
      { time: '12:40', title: 'Valorisation' },
    ],
    hashtags: [
      '#LevéeDeFonds', '#Afrique', '#KHEPRAExperts',
    ],
    ready: false,
  },

  keywords: {
    keywords: [
      'levée de fonds', 'Afrique', 'due diligence', 'startup',
    ],
    count: 4,
    ready: false,
  },

  linkedinPosts: {
    dirigeant: 'Nouveau guide sur la levée de fonds en Afrique.\n\nLien en commentaire.\n\n#LevéeDeFonds #Afrique',
    pageEntreprise: 'Guide Levée de Fonds disponible.\n\n#KHEPRAExperts',
    ready: false,
  },

  article: {
    title: 'Guide Levée de Fonds Afrique 2026',
    wordCount: 850,
    targetWordCount: '1200-2500',
    seoOptimized: false,
    status: 'Brouillon — Enrichissement requis',
    url: '',
    ready: false,
  },

  shorts: [
    {
      shortId: 'SHORT-002-A',
      title: 'Levée de fonds — Extrait',
      duration: '35 s',
      format: 'Vertical',
      resolution: '1080x1920',
      objective: 'Attirer vers la vidéo principale',
      ready: false,
    },
  ],

  carrousel: {
    slides: 5,
    format: 'PDF',
    ctaText: 'Contactez KHEPRA EXPERTS',
    status: 'Brouillon — Minimum 8 slides requis',
    ready: false,
  },

  complianceReport: {
    checks: [
      {
        checkId: 'QC-008', name: 'Vérification Copyright', category: 'juridique',
        passed: true, score: 18, maxScore: 20,
        detail: 'Sources partiellement citées. 2 images sans attribution retrouvées.',
        autoFixed: false,
      },
      {
        checkId: 'QC-009', name: 'Validation des Sources', category: 'qualite',
        passed: false, score: 8, maxScore: 20,
        detail: 'Seulement 3 sources identifiées. Minimum 8 requis. Absence de sources réglementaires et institutionnelles.',
        autoFixed: false,
      },
      {
        checkId: 'QC-010', name: 'Exactitude du Contenu', category: 'qualite',
        passed: false, score: 12, maxScore: 20,
        detail: 'Données de valorisation non sourcées. Multiples de valorisation non contextualisés au marché africain.',
        autoFixed: false,
      },
      {
        checkId: 'QC-011', name: 'Optimisation SEO', category: 'seo',
        passed: false, score: 6, maxScore: 20,
        detail: 'Titre trop court (62 car.). Description 18 mots (cible 100-200). Seulement 3 hashtags. Chapitres incomplets.',
        autoFixed: false,
      },
      {
        checkId: 'QC-012', name: 'Branding KHEPRA EXPERTS', category: 'branding',
        passed: true, score: 17, maxScore: 20,
        detail: 'Logo présent en intro. Outro absente. Palette partiellement respectée. Typographie conforme.',
        autoFixed: false,
      },
      {
        checkId: 'QC-013', name: 'Conformité Réglementaire', category: 'reglementaire',
        passed: true, score: 16, maxScore: 20,
        detail: 'Pas de contenu réglementé. Mention KHEPRA EXPERTS présente. Disclaimer juridique absent.',
        autoFixed: false,
      },
      {
        checkId: 'QC-014', name: 'Qualité Audio & Vidéo', category: 'technique',
        passed: false, score: 10, maxScore: 20,
        detail: 'Audio 44.1 kHz au lieu de 48 kHz. Sous-titres absents. Outro absente. Format non normalisé.',
        autoFixed: false,
      },
    ],
    globalScore: 72,
    minScoreRequired: 90,
    authorized: false,
    ready: true,
  },

  checklist: [
    { id: 'CHK-12', label: 'Vidéo exportée en MP4 1080p', icon: 'ri-movie-line', checked: true, category: 'technique' },
    { id: 'CHK-13', label: 'Miniature validée — contraste élevé', icon: 'ri-image-line', checked: false, category: 'design' },
    { id: 'CHK-14', label: 'Description SEO validée', icon: 'ri-search-eye-line', checked: false, category: 'seo' },
    { id: 'CHK-15', label: 'Tags SEO validés (≥ 10 hashtags)', icon: 'ri-hashtag', checked: false, category: 'seo' },
    { id: 'CHK-16', label: 'Chapitres horodatés ajoutés', icon: 'ri-list-check', checked: false, category: 'seo' },
    { id: 'CHK-17', label: 'Liens vérifiés (≥ 3 ressources)', icon: 'ri-link', checked: false, category: 'qualite' },
    { id: 'CHK-18', label: 'Sous-titres FR intégrés', icon: 'ri-closed-captioning-line', checked: false, category: 'technique' },
    { id: 'CHK-19', label: 'Branding KHEPRA EXPERTS présent', icon: 'ri-shield-star-line', checked: true, category: 'branding' },
    { id: 'CHK-20', label: 'CTA présent (abonnement + site)', icon: 'ri-user-add-line', checked: false, category: 'marketing' },
    { id: 'CHK-21', label: 'Score qualité ≥ 90/100', icon: 'ri-check-double-line', checked: false, category: 'qualite' },
    { id: 'CHK-22', label: 'Rapport conformité généré et validé', icon: 'ri-file-shield-line', checked: true, category: 'juridique' },
  ],

  linkedinPostDirigeant: 'Nouveau guide sur la levée de fonds en Afrique.\n\nLien en commentaire.\n\n#LevéeDeFonds #Afrique',

  linkedinPostPage: 'Guide Levée de Fonds disponible.\n\n#KHEPRAExperts',

  totalDeliverables: 10,
  deliverablesReady: 3,

  correctiveActions: [
    '1. Régénérer le titre YouTube — 62 caractères → 90+ avec mots-clés SEO',
    '2. Enrichir la description YouTube — 18 mots → 100-200 mots structurés',
    '3. Ajouter les chapitres horodatés complets (minimum 5 chapitres)',
    '4. Étendre les hashtags — 3 → 13 (répartition 3-3-2-2 + 3 marque)',
    '5. Augmenter les mots-clés SEO — 4 → 15 minimum',
    '6. Régénérer les posts LinkedIn — versions dirigeant + page entreprise complètes',
    '7. Enrichir l\'article long — 850 → 1200-2500 mots avec référencement SEO',
    '8. Produire 2 shorts supplémentaires (3 requis, 1 produit)',
    '9. Étendre le carrousel LinkedIn — 5 → 10 slides avec CTA complet',
    '10. Corriger l\'audio — 44.1 kHz → 48 kHz',
    '11. Ajouter les sous-titres FR intégrés',
    '12. Ajouter l\'outro institutionnelle KHEPRA EXPERTS',
    '13. Ajouter les 4 ressources manquantes dans la description',
    '14. Enrichir les sources — 3 → 8 minimum avec sources réglementaires',
    '15. Corriger les données de valorisation (multiples contextualisés Afrique)',
    '16. Ajouter le disclaimer juridique requis',
  ],
};

// ═══════════════ EXPORT ═══════════════
export const PUBLISHING_PACKS: PublishingPack[] = [
  PACK_BCEAO_2026_APPROVED,
  PACK_LEVEE_FONDS_BLOCKED,
];

// ─── Structure Visuelle Big Four par Section ───
export interface VideoSection {
  sectionId: string;
  name: string;
  description: string;
  duration: string;
  order: number;
}

export const BIG_FOUR_VIDEO_STRUCTURE: VideoSection[] = [
  { sectionId: 'INTRO', name: 'Intro Institutionnelle', description: 'Logo KHEPRA EXPERTS · Titre épisode · Musique institutionnelle', duration: '15-30 sec', order: 0 },
  { sectionId: 'S1', name: 'Contexte Réglementaire', description: 'Cadre juridique, circulaires, textes officiels BCEAO/COBAC/OHADA', duration: '1-2 min', order: 1 },
  { sectionId: 'S2', name: 'Analyse', description: 'Décryptage des enjeux, données chiffrées, comparaison Big Four', duration: '3-5 min', order: 2 },
  { sectionId: 'S3', name: 'Risques', description: 'Identification, cartographie, scoring des risques réglementaires', duration: '2-3 min', order: 3 },
  { sectionId: 'S4', name: 'Recommandations', description: 'Solutions concrètes, bonnes pratiques, benchmark international', duration: '3-5 min', order: 4 },
  { sectionId: 'S5', name: 'Plan d\'Action', description: 'Roadmap priorisée, jalons, responsabilités, calendrier', duration: '2-3 min', order: 5 },
  { sectionId: 'OUTRO', name: 'Conclusion & CTA', description: 'Résumé exécutif · Abonnement · Site web · Téléchargement guide', duration: '30-60 sec', order: 6 },
];

// ─── KPIs Globaux ───
export const PUBLISHING_KPIS = {
  totalPacks: 2,
  packsApproved: 1,
  packsBlocked: 1,
  totalDeliverablesReady: 13,
  totalDeliverablesTotal: 20,
  avgGlobalScore: 83,
  minScoreRequired: 90,
  avgVideoDuration: '16 min 25 s',
  totalShortsProduced: 4,
  totalArticlesGenerated: 2,
  avgArticleWordCount: 1350,
};





