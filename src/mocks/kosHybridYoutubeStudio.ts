// ─── KOS™ BIG FOUR YOUTUBE HYBRID PRODUCTION FACTORY 2026 — Mock Data Engine ───
// Production audiovisuelle institutionnelle KHEPRA EXPERTS
// Standards Big Four (PwC · Deloitte · EY · KPMG)
// Master Prompt v1.0 — 23 Juin 2026
//
// MODE A (OAuth invalidé) : production + téléchargement manuel
// MODE B (OAuth validé) : publication automatique YouTube API v3

export type StudioMode = 'MODE_A' | 'MODE_B';

export type ContentStage =
  | 'TOPIC_DEFINED'
  | 'SCRIPT_MASTER_GENERATED'
  | 'SCRIPT_VALIDATED'
  | 'VOICE_GENERATED'
  | 'VOICE_VALIDATED'
  | 'THUMBNAIL_GENERATED'
  | 'THUMBNAIL_VALIDATED'
  | 'VIDEO_ASSEMBLED'
  | 'VIDEO_VALIDATED'
  | 'METADATA_GENERATED'
  | 'COMPLIANCE_CHECKED'
  | 'PACKAGE_GENERATED'
  | 'READY'
  | 'UPLOADED'
  | 'PUBLISHED'
  | 'ARCHIVED'
  | 'QC_FAILED'
  | 'BLOCKED_BIG_FOUR';

export type ContentStatus = 'DRAFT' | 'QC_FAILED' | 'BLOCKED' | 'READY' | 'UPLOADED' | 'PUBLISHED' | 'ARCHIVED';

export type AudienceSegment =
  | 'DG_BANQUE'
  | 'PCA'
  | 'ADMINISTRATEUR'
  | 'COMPLIANCE_OFFICER'
  | 'RISK_MANAGER'
  | 'AUDITEUR_INTERNE'
  | 'DG_MICROFINANCE'
  | 'DIR_CONFORMITE'
  | 'CA_SFD'
  | 'MINISTERE'
  | 'AGENCE_PUBLIQUE'
  | 'AUTORITE_REGULATION'
  | 'PME'
  | 'ETI'
  | 'GROUPE'
  | 'INVESTISSEUR';

export type VideoType = 'analyse' | 'podcast' | 'capsule' | 'formation' | 'interview' | 'reportage';

export type EditorialSection = 'INTRO' | 'CONTEXTE' | 'ANALYSE' | 'RECOMMANDATIONS' | 'CONCLUSION';

// ─── Big Four Scoring System ───
export interface BigFourScoreDimension {
  dimension: string;
  label: string;
  score: number;
  maxScore: number;
  passed: boolean;
  icon: string;
  color: string;
  details: string[];
  issues: string[];
}

export interface BigFourScore {
  editorial: BigFourScoreDimension;
  technique: BigFourScoreDimension;
  seo: BigFourScoreDimension;
  conformite: BigFourScoreDimension;
  branding: BigFourScoreDimension;
  impactCommercial: BigFourScoreDimension;
  autoriteMetier: BigFourScoreDimension;
  global: number;
  maxGlobal: number;
  passed: boolean;
  threshold: number;
}

// ─── Corrective Plan ───
export interface CorrectiveAction {
  actionId: string;
  category: string;
  issue: string;
  remedy: string;
  priority: 'critical' | 'high' | 'medium';
  estimatedTime: string;
  autoFixable: boolean;
  fixed: boolean;
}

export interface CorrectivePlan {
  planId: string;
  contentId: string;
  generatedAt: string;
  blockedScore: number;
  targetScore: number;
  actions: CorrectiveAction[];
  totalActions: number;
  fixedActions: number;
  estimatedTotalTime: string;
}

// ─── Compliance Check ───
export interface RegulatoryComplianceCheck {
  checkId: string;
  regulator: string;
  label: string;
  description: string;
  passed: boolean;
  score: number;
  maxScore: number;
  detail: string;
  reference: string;
  checkedAt: string;
}

// ─── Editorial Structure ───
export interface EditorialBlock {
  section: EditorialSection;
  title: string;
  duration: string;
  icon: string;
  color: string;
  content: string;
  keywordsCovered: string[];
}

// ─── Extended Deliverables (13 total) ───
export type DeliverableType =
  | 'SCRIPT_MASTER_TXT'
  | 'SCRIPT_PODCAST_TXT'
  | 'SCRIPT_TELEPROMPTER_TXT'
  | 'TRANSCRIPT_TXT'
  | 'DESCRIPTION_TXT'
  | 'TITLE_SEO_TXT'
  | 'THUMBNAIL_PNG'
  | 'CHAPTERS_TXT'
  | 'TAGS_TXT'
  | 'ARTICLE_SEO_TXT'
  | 'LINKEDIN_POSTS_TXT'
  | 'CARROUSEL_PDF'
  | 'SHORTS_SCRIPTS_TXT'
  | 'AUDIO_MP3'
  | 'VIDEO_MP4'
  | 'METADATA_JSON'
  | 'COMPLIANCE_REPORT_PDF'
  | 'QUALITY_SCORE_PDF'
  | 'CHECKLIST_UPLOAD_PDF';

export interface DownloadFile {
  fileId: string;
  type: DeliverableType;
  label: string;
  format: string;
  sizeBytes: number;
  icon: string;
  ready: boolean;
  url: string | null;
  category: 'core' | 'audio' | 'visual' | 'metadata' | 'social' | 'compliance';
}

export interface YoutubeMetadata {
  title: string;
  description: string;
  tags: string[];
  hashtags: string[];
  playlist: string;
  category: string;
  language: string;
  seoKeywords: string[];
  chapters: { time: string; title: string }[];
  cta: string;
  khepraUrl: string;
  socialLinks: { platform: string; url: string }[];
}

export interface QualityCheckResult {
  checkId: string;
  name: string;
  category: 'script' | 'voice' | 'thumbnail' | 'video' | 'metadata' | 'branding' | 'compliance';
  score: number;
  maxScore: number;
  passed: boolean;
  detail: string;
  checkedAt: string;
  autoFixed: boolean;
}

export interface ContentItem {
  contentId: string;
  topic: string;
  videoType: VideoType;
  audience: string;
  audienceSegments: AudienceSegment[];
  stage: ContentStage;
  status: ContentStatus;
  script: {
    title: string;
    fullText: string;
    description: string;
    estimatedDuration: string;
    podcastScript: string;
    teleprompterScript: string;
    transcript: string;
    createdAt: string;
  } | null;
  voice: {
    profile: string;
    format: string;
    durationSeconds: number;
    sizeBytes: number;
    dataUri: string | null;
    createdAt: string;
  } | null;
  thumbnail: {
    url: string | null;
    template: string;
    resolution: string;
    createdAt: string;
  } | null;
  video: {
    url: string | null;
    format: string;
    codec: string;
    audioCodec: string;
    resolution: string;
    fps: number;
    audioHz: string;
    sizeBytes: number;
    createdAt: string;
  } | null;
  metadata: YoutubeMetadata | null;
  bigFourScore: BigFourScore | null;
  correctivePlan: CorrectivePlan | null;
  complianceChecks: RegulatoryComplianceCheck[];
  editorialStructure: EditorialBlock[];
  linkedInPosts: { dirigeant: string; pageEntreprise: string } | null;
  seoArticle: { title: string; content: string; wordCount: number } | null;
  shortsScripts: { title: string; duration: string; script: string }[];
  qualityScore: number;
  qualityChecks: QualityCheckResult[];
  downloads: DownloadFile[];
  createdAt: string;
  updatedAt: string;
  uploadedAt: string | null;
  publishedAt: string | null;
  youtubeUrl: string | null;
  agentAssigned: string;
  priority: 'critical' | 'high' | 'medium';
}

export interface StudioKPIs {
  totalScriptsProduced: number;
  totalVideosGenerated: number;
  totalContentReady: number;
  totalContentUploaded: number;
  totalContentPublished: number;
  totalBlocked: number;
  avgProductionTime: string;
  successRate: number;
  qualityPassRate: number;
  bigFourPassRate: number;
  mode: StudioMode;
  oauthStatus: 'CONNECTED' | 'DISCONNECTED' | 'PENDING';
  lastScanTimestamp: string;
}

export interface PendingQueueItem {
  queueId: string;
  contentId: string;
  title: string;
  topic: string;
  stage: ContentStage;
  status: ContentStatus;
  priority: 'critical' | 'high' | 'medium';
  scheduledDate: string | null;
  qualityScore: number;
  bigFourScore: number;
  downloadsReady: number;
  totalDownloads: number;
  createdAt: string;
  etaToReady: string;
}

export interface UploadChecklistStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  category: string;
}

// ─── Upload Checklist ───
export const UPLOAD_CHECKLIST: UploadChecklistStep[] = [
  { step: 1, title: 'Vidéo exportée MP4 H.264 1080p+', description: 'Fichier VIDEO_MASTER.mp4 avec codec H.264, audio AAC-LC 48kHz, sous-titres intégrés', icon: 'ri-movie-line', category: 'video' },
  { step: 2, title: 'Miniature validée 1280×720', description: 'THUMBNAIL_YOUTUBE.png — logo KHEPRA, titre court 3-7 mots, contraste élevé', icon: 'ri-image-line', category: 'visual' },
  { step: 3, title: 'Titre SEO optimisé', description: '70 car. max, mot-clé principal en début, CTR > 5% cible', icon: 'ri-file-text-line', category: 'metadata' },
  { step: 4, title: 'Description YouTube complète', description: 'Résumé + chapitres + ressources + liens + hashtags', icon: 'ri-align-left', category: 'metadata' },
  { step: 5, title: 'Tags SEO validés', description: '20-40 mots-clés pertinents', icon: 'ri-hashtag', category: 'metadata' },
  { step: 6, title: 'Chapitrage YouTube', description: 'Timestamps avec titres optimisés', icon: 'ri-play-list-2-line', category: 'organization' },
  { step: 7, title: 'Playlist assignée', description: 'Ajouter à la playlist thématique KHEPRA EXPERTS', icon: 'ri-stack-line', category: 'organization' },
  { step: 8, title: 'Écran de fin + CTA', description: 'Abonnement + vidéo recommandée + site web', icon: 'ri-tv-line', category: 'optimization' },
  { step: 9, title: 'Sous-titres vérifiés', description: 'Français, synchronisation parfaite', icon: 'ri-closed-captioning-line', category: 'accessibility' },
  { step: 10, title: 'Rapport conformité validé', description: 'Score ≥ 90/100 requis avant publication', icon: 'ri-shield-check-line', category: 'compliance' },
  { step: 11, title: 'Publication programmée', description: 'Confidentialité, date, heure, notification abonnés', icon: 'ri-check-double-line', category: 'publishing' },
];

// ─── BIG FOUR SCORING DIMENSIONS ───
export function buildBigFourScore(contentId: string, title: string, qualityScore: number): BigFourScore {
  const passed = qualityScore >= 90;
  return {
    editorial: {
      dimension: 'editorial',
      label: 'Qualité Éditoriale',
      score: passed ? Math.min(98, qualityScore + 4) : Math.max(65, qualityScore - 10),
      maxScore: 100,
      passed: passed,
      icon: 'ri-pencil-ruler-2-line',
      color: '#86BC25',
      details: [
        'Structure Big Four respectée (Intro/Contexte/Analyse/Recommandations/Conclusion)',
        'Hook 15-30s percutant',
        'Transitions fluides entre sections',
        'Ton institutionnel expert maintenu',
      ],
      issues: passed ? [] : ['Introduction trop longue (>30s)', 'Section Contexte manque de données chiffrées'],
    },
    technique: {
      dimension: 'technique',
      label: 'Qualité Technique',
      score: passed ? 96 : 68,
      maxScore: 100,
      passed: passed,
      icon: 'ri-settings-3-line',
      color: '#CA8A04',
      details: [
        'Résolution 1920×1080 minimum',
        'Codec H.264, audio AAC-LC 48kHz',
        '30 fps stables',
        'Ratio 16:9 conforme YouTube',
      ],
      issues: passed ? [] : ['Audio 44.1kHz au lieu de 48kHz', 'Sous-titres absents'],
    },
    seo: {
      dimension: 'seo',
      label: 'SEO YouTube',
      score: passed ? 95 : 62,
      maxScore: 100,
      passed: passed,
      icon: 'ri-search-eye-line',
      color: '#0A66C2',
      details: [
        'Titre optimisé < 70 car.',
        'Description riche en mots-clés',
        '20-40 tags pertinents',
        'Chapitrage avec timestamps',
        'Hashtags ciblés',
      ],
      issues: passed ? [] : ['Titre trop court (non optimisé SEO)', 'Seulement 4 tags (minimum 20 requis)', 'Hashtags insuffisants'],
    },
    conformite: {
      dimension: 'conformite',
      label: 'Conformité Réglementaire',
      score: passed ? 97 : 72,
      maxScore: 100,
      passed: passed,
      icon: 'ri-scales-3-line',
      color: '#D4A853',
      details: [
        'Références BCEAO vérifiées',
        'Références COBAC vérifiées',
        'Références OHADA vérifiées',
        'Aucune affirmation non sourcée',
        'Mentions légales présentes',
      ],
      issues: passed ? [] : ['3 affirmations non sourcées', 'Référence réglementaire obsolète'],
    },
    branding: {
      dimension: 'branding',
      label: 'Branding KHEPRA',
      score: 100,
      maxScore: 100,
      passed: true,
      icon: 'ri-building-4-line',
      color: '#059669',
      details: [
        'Logo KHEPRA EXPERTS présent',
        'Charte éditoriale respectée',
        'Générique intro/outro institutionnel',
        'Typographie conforme',
        'Palette couleur respectée',
      ],
      issues: [],
    },
    impactCommercial: {
      dimension: 'impactCommercial',
      label: 'Impact Commercial',
      score: passed ? 92 : 58,
      maxScore: 100,
      passed: passed,
      icon: 'ri-line-chart-line',
      color: '#FF0000',
      details: [
        'CTA clair et mesurable',
        'Liens vers le site KHEPRA',
        'Proposition de valeur explicite',
        'Génération de leads intégrée',
      ],
      issues: passed ? [] : ['CTA absent ou faible', 'Aucun lien vers diagnostic/consultation'],
    },
    autoriteMetier: {
      dimension: 'autoriteMetier',
      label: 'Autorité Métier',
      score: passed ? 94 : 70,
      maxScore: 100,
      passed: passed,
      icon: 'ri-award-line',
      color: '#7C3AED',
      details: [
        'Expertise démontrée',
        'Données chiffrées exclusives',
        'Citations réglementaires précises',
        'Positionnement thought leadership',
        'Différenciation vs concurrence',
      ],
      issues: passed ? ['Pourrait bénéficier de plus de données exclusives'] : ['Manque de données exclusives KHEPRA', 'Positionnement générique'],
    },
    global: passed ? qualityScore : qualityScore,
    maxGlobal: 100,
    passed: qualityScore >= 90,
    threshold: 90,
  };
}

// ─── Compliance Checks ───
export function buildComplianceChecks(contentId: string): RegulatoryComplianceCheck[] {
  return [
    {
      checkId: `REG-${contentId}-BCEAO`,
      regulator: 'BCEAO',
      label: 'Conformité BCEAO',
      description: 'Vérification des références aux instructions et circulaires BCEAO',
      passed: true,
      score: 98,
      maxScore: 100,
      detail: 'Instructions citées : 008-2022 (solvabilité), 003-2018 (SFD). Toutes vérifiées.',
      reference: 'Instructions BCEAO 008-2022, 003-2018',
      checkedAt: new Date().toISOString(),
    },
    {
      checkId: `REG-${contentId}-COBAC`,
      regulator: 'COBAC',
      label: 'Conformité COBAC',
      description: 'Vérification des références aux règlements COBAC CEMAC',
      passed: true,
      score: 95,
      maxScore: 100,
      detail: 'Règlements COBAC R-2021/01 (gouvernance) et R-2023/03 (LBC/FT) vérifiés.',
      reference: 'Règlements COBAC R-2021/01, R-2023/03',
      checkedAt: new Date().toISOString(),
    },
    {
      checkId: `REG-${contentId}-OHADA`,
      regulator: 'OHADA',
      label: 'Conformité OHADA',
      description: 'Vérification des références aux Actes Uniformes OHADA',
      passed: true,
      score: 97,
      maxScore: 100,
      detail: 'Acte Uniforme relatif au droit des sociétés commerciales (AUSCGIE) vérifié.',
      reference: 'AUSCGIE révisé 2014',
      checkedAt: new Date().toISOString(),
    },
    {
      checkId: `REG-${contentId}-UEMOA`,
      regulator: 'UEMOA',
      label: 'Conformité UEMOA',
      description: 'Vérification des références aux directives UEMOA',
      passed: true,
      score: 96,
      maxScore: 100,
      detail: 'Directive UEMOA 01/2023/CM relative à la régulation financière vérifiée.',
      reference: 'Directive UEMOA 01/2023/CM',
      checkedAt: new Date().toISOString(),
    },
    {
      checkId: `REG-${contentId}-CEMAC`,
      regulator: 'CEMAC',
      label: 'Conformité CEMAC',
      description: 'Vérification des références aux directives CEMAC',
      passed: true,
      score: 94,
      maxScore: 100,
      detail: 'Directive CEMAC 02/2024 relative à la cybersécurité bancaire vérifiée.',
      reference: 'Directive CEMAC 02/2024',
      checkedAt: new Date().toISOString(),
    },
    {
      checkId: `REG-${contentId}-COPYRIGHT`,
      regulator: 'COPYRIGHT',
      label: 'Copyright & Propriété Intellectuelle',
      description: 'Vérification des droits d\'auteur et licences',
      passed: true,
      score: 100,
      maxScore: 100,
      detail: 'Aucune image/musique/vidéo tierce non licenciée. Contenu 100% KHEPRA EXPERTS.',
      reference: 'Politique interne KHEPRA EXPERTS',
      checkedAt: new Date().toISOString(),
    },
  ];
}

// ─── Editorial Structure Big Four ───
export function buildEditorialStructure(title: string): EditorialBlock[] {
  return [
    {
      section: 'INTRO',
      title: 'Introduction',
      duration: '0:00 - 0:30',
      icon: 'ri-play-circle-line',
      color: '#86BC25',
      content: `Problématique exposée en 15-30 secondes : enjeu stratégique et bénéfice attendu pour le spectateur. "${title}"`,
      keywordsCovered: ['problématique', 'enjeu stratégique', 'bénéfice'],
    },
    {
      section: 'CONTEXTE',
      title: 'Contexte',
      duration: '0:30 - 3:00',
      icon: 'ri-landscape-line',
      color: '#0A66C2',
      content: 'Cadre réglementaire, contexte de marché, enjeux sectoriels. Données chiffrées et références officielles.',
      keywordsCovered: ['cadre réglementaire', 'contexte marché', 'enjeux sectoriels'],
    },
    {
      section: 'ANALYSE',
      title: 'Analyse',
      duration: '3:00 - 7:00',
      icon: 'ri-bar-chart-2-line',
      color: '#CA8A04',
      content: 'Constats détaillés, tendances observées, risques identifiés. Approche data-driven avec graphiques.',
      keywordsCovered: ['constats', 'tendances', 'risques', 'analyse data-driven'],
    },
    {
      section: 'RECOMMANDATIONS',
      title: 'Recommandations',
      duration: '7:00 - 11:00',
      icon: 'ri-lightbulb-line',
      color: '#D4A853',
      content: 'Bonnes pratiques, plan d\'action concret, quick wins. Solutions pragmatiques et applicables immédiatement.',
      keywordsCovered: ['bonnes pratiques', 'plan d\'action', 'quick wins', 'recommandations'],
    },
    {
      section: 'CONCLUSION',
      title: 'Conclusion & CTA',
      duration: '11:00 - 13:00',
      icon: 'ri-flag-line',
      color: '#FF0000',
      content: 'Synthèse exécutive, call-to-action clair (abonnement, site web, téléchargement guide, prise de rendez-vous), ressources complémentaires.',
      keywordsCovered: ['synthèse', 'CTA', 'ressources', 'abonnement'],
    },
  ];
}

// ─── 18 Livrables ───
export function buildAllDownloads(contentId: string, stage: ContentStage): DownloadFile[] {
  const isReady = ['READY', 'UPLOADED', 'PUBLISHED'].includes(stage);
  const hasScript = stage !== 'TOPIC_DEFINED';
  const hasVideo = ['VIDEO_ASSEMBLED', 'VIDEO_VALIDATED', 'METADATA_GENERATED', 'COMPLIANCE_CHECKED', 'PACKAGE_GENERATED', 'READY', 'UPLOADED', 'PUBLISHED'].includes(stage);
  const hasFullPackage = ['PACKAGE_GENERATED', 'READY', 'UPLOADED', 'PUBLISHED'].includes(stage);

  return [
    // Core Content
    { fileId: `DL-${contentId}-A`, type: 'SCRIPT_MASTER_TXT', label: '01_Script Maître', format: 'txt', sizeBytes: hasScript ? 24500 : 0, icon: 'ri-file-text-line', ready: hasScript, url: null, category: 'core' },
    { fileId: `DL-${contentId}-B`, type: 'SCRIPT_PODCAST_TXT', label: '02_Script Podcast', format: 'txt', sizeBytes: hasScript ? 18000 : 0, icon: 'ri-headphone-line', ready: hasScript, url: null, category: 'core' },
    { fileId: `DL-${contentId}-C`, type: 'SCRIPT_TELEPROMPTER_TXT', label: '03_Script Téléprompteur', format: 'txt', sizeBytes: hasScript ? 15000 : 0, icon: 'ri-slideshow-line', ready: hasScript, url: null, category: 'core' },
    { fileId: `DL-${contentId}-D`, type: 'TRANSCRIPT_TXT', label: '04_Transcription', format: 'txt', sizeBytes: hasScript ? 32000 : 0, icon: 'ri-file-copy-line', ready: hasScript, url: null, category: 'core' },

    // Audio & Visual
    { fileId: `DL-${contentId}-E`, type: 'AUDIO_MP3', label: '05_Audio MP3 HQ', format: 'mp3', sizeBytes: hasVideo ? 15488000 : 0, icon: 'ri-mic-line', ready: hasVideo, url: null, category: 'audio' },
    { fileId: `DL-${contentId}-F`, type: 'THUMBNAIL_PNG', label: '06_Miniature 1280×720', format: 'png', sizeBytes: hasVideo ? 450000 : 0, icon: 'ri-image-line', ready: hasVideo, url: null, category: 'visual' },
    { fileId: `DL-${contentId}-G`, type: 'VIDEO_MP4', label: '07_Vidéo MP4 1080p', format: 'mp4', sizeBytes: hasVideo ? 284560000 : 0, icon: 'ri-movie-line', ready: hasVideo, url: null, category: 'visual' },

    // Metadata
    { fileId: `DL-${contentId}-H`, type: 'TITLE_SEO_TXT', label: '08_Titre SEO Optimisé', format: 'txt', sizeBytes: hasScript ? 500 : 0, icon: 'ri-heading', ready: hasScript, url: null, category: 'metadata' },
    { fileId: `DL-${contentId}-I`, type: 'DESCRIPTION_TXT', label: '09_Description YouTube', format: 'txt', sizeBytes: hasScript ? 3800 : 0, icon: 'ri-align-left', ready: hasScript, url: null, category: 'metadata' },
    { fileId: `DL-${contentId}-J`, type: 'TAGS_TXT', label: '10_Tags SEO 20-40', format: 'txt', sizeBytes: hasScript ? 2400 : 0, icon: 'ri-hashtag', ready: hasScript, url: null, category: 'metadata' },
    { fileId: `DL-${contentId}-K`, type: 'CHAPTERS_TXT', label: '11_Chapitrage YouTube', format: 'txt', sizeBytes: hasScript ? 1200 : 0, icon: 'ri-play-list-2-line', ready: hasScript, url: null, category: 'metadata' },
    { fileId: `DL-${contentId}-L`, type: 'METADATA_JSON', label: '12_Métadonnées JSON', format: 'json', sizeBytes: hasScript ? 5600 : 0, icon: 'ri-code-s-slash-line', ready: hasScript, url: null, category: 'metadata' },

    // Social
    { fileId: `DL-${contentId}-M`, type: 'ARTICLE_SEO_TXT', label: '13_Article SEO 1500-3000m', format: 'txt', sizeBytes: hasFullPackage ? 45000 : 0, icon: 'ri-article-line', ready: hasFullPackage, url: null, category: 'social' },
    { fileId: `DL-${contentId}-N`, type: 'LINKEDIN_POSTS_TXT', label: '14_Posts LinkedIn (2)', format: 'txt', sizeBytes: hasFullPackage ? 8000 : 0, icon: 'ri-linkedin-fill', ready: hasFullPackage, url: null, category: 'social' },
    { fileId: `DL-${contentId}-O`, type: 'CARROUSEL_PDF', label: '15_Carrousel LinkedIn 8-12 slides', format: 'pdf', sizeBytes: hasFullPackage ? 2500000 : 0, icon: 'ri-slideshow-3-line', ready: hasFullPackage, url: null, category: 'social' },
    { fileId: `DL-${contentId}-P`, type: 'SHORTS_SCRIPTS_TXT', label: '16_Shorts YouTube (3-5)', format: 'txt', sizeBytes: hasFullPackage ? 6000 : 0, icon: 'ri-smartphone-line', ready: hasFullPackage, url: null, category: 'social' },

    // Compliance
    { fileId: `DL-${contentId}-Q`, type: 'COMPLIANCE_REPORT_PDF', label: '17_Rapport Conformité', format: 'pdf', sizeBytes: hasFullPackage ? 350000 : 0, icon: 'ri-shield-check-line', ready: hasFullPackage, url: null, category: 'compliance' },
    { fileId: `DL-${contentId}-R`, type: 'QUALITY_SCORE_PDF', label: '18_Rapport Qualité Big Four', format: 'pdf', sizeBytes: hasFullPackage ? 280000 : 0, icon: 'ri-bar-chart-line', ready: hasFullPackage, url: null, category: 'compliance' },
  ];
}

// ─── Content Items ───
export const STUDIO_CONTENT: ContentItem[] = [
  {
    contentId: 'CONT-001',
    topic: 'Réforme du ratio de solvabilité UEMOA 2026 : impact pour les banques et SFD',
    videoType: 'analyse',
    audience: 'Dirigeants de banques, DAF, Responsables conformité UEMOA',
    audienceSegments: ['DG_BANQUE', 'RISK_MANAGER', 'AUDITEUR_INTERNE', 'COMPLIANCE_OFFICER'],
    stage: 'READY',
    status: 'READY',
    script: {
      title: 'Réforme Ratio Solvabilité UEMOA 2026 : Guide Stratégique pour Banques & SFD',
      fullText: '[INTRO — 0:00]\nBonjour et bienvenue sur KHEPRA EXPERTS. Aujourd\'hui, nous plongeons dans l\'un des sujets les plus critiques pour le secteur financier ouest-africain : la réforme du ratio de solvabilité en zone UEMOA, effective depuis janvier 2026.\n\nCette réforme, portée par la BCEAO en conformité avec les standards de Bâle III, redéfinit les exigences de fonds propres pour l\'ensemble des établissements de crédit et des systèmes financiers décentralisés. Une erreur de gouvernance peut bloquer un agrément BCEAO pendant plusieurs mois. Dans cette vidéo, nous analysons les principaux facteurs de risque et les mesures correctives.\n\n[CONTEXTE — 2:30]\nLa BCEAO a publié la nouvelle instruction relative à la solvabilité des établissements assujettis, remplaçant le dispositif de 2001...',
      description: 'Analyse complète de la réforme du ratio de solvabilité UEMOA 2026. Découvrez les nouvelles exigences de fonds propres, le calcul des actifs pondérés par les risques, le calendrier de mise en conformité et les implications stratégiques pour les banques et SFD. Guide pratique avec exemples chiffrés.\n\n📊 Téléchargez le calculateur de ratio : https://khepraexperts.com/outils\n📋 Checklist conformité BCEAO : https://khepraexperts.com/lead-magnets/checklist-conformite-bceao-cobac\n\n#Solvabilité #UEMOA #BCEAO #BanqueAfrique #KHEPRAEXPERTS',
      estimatedDuration: '16 min',
      podcastScript: '[PODCAST — VERSION AUDIO]\n\nBienvenue dans ce nouvel épisode de KHEPRA EXPERTS. Je suis votre hôte, et aujourd\'hui nous parlons de la réforme du ratio de solvabilité UEMOA 2026. Une réforme qui change la donne pour toutes les banques et SFD de la zone...\n\n[Suite du podcast — adaptation audio des sections principales avec transitions sonores]',
      teleprompterScript: '[TÉLÉPROMPTEUR — FLUIDE]\n\nBonjour et bienvenue sur KHEPRA EXPERTS.\n\nAujourd\'hui : la réforme du ratio de solvabilité UEMOA 2026.\n\nC\'est un sujet critique. Pourquoi ? Parce que cette réforme redéfinit les exigences de fonds propres.\n\nEt une erreur de gouvernance peut bloquer un agrément BCEAO pendant des mois.\n\nNous allons voir ensemble les principaux facteurs de risque et les mesures correctives.\n\nCommençons.',
      transcript: '[TRANSCRIPTION COMPLÈTE]\n\n00:00:00 - [Intro musicale KHEPRA EXPERTS]\n00:00:08 - Bonjour et bienvenue sur KHEPRA EXPERTS...\n00:00:15 - Aujourd\'hui, nous plongeons dans la réforme du ratio de solvabilité...\n[...transcription complète de 16 minutes...]',
      createdAt: '2026-06-22T07:00:00Z',
    },
    voice: {
      profile: 'Dr. Célestin Koffi — Voix Expert Institutionnel',
      format: 'mp3',
      durationSeconds: 968,
      sizeBytes: 15488000,
      dataUri: null,
      createdAt: '2026-06-22T07:22:00Z',
    },
    thumbnail: {
      url: 'https://readdy.ai/api/search-image?query=Professional%20dark%20minimalist%20corporate%20finance%20thumbnail%20with%20abstract%20geometric%20charts%20in%20emerald%20green%20and%20gold%20accents%20elegant%20typography%20banking%20theme%20clean%20modern%20editorial%20design%20high%20contrast%20soft%20dramatic%20lighting%20professional%20aesthetic&width=1280&height=720&seq=kos-bf-yt-factory-thumb-001&orientation=landscape',
      template: 'big-four-expert',
      resolution: '1280x720',
      createdAt: '2026-06-22T07:35:00Z',
    },
    video: {
      url: null,
      format: 'mp4',
      codec: 'H.264',
      audioCodec: 'AAC-LC',
      resolution: '1920x1080',
      fps: 30,
      audioHz: '48 kHz',
      sizeBytes: 284560000,
      createdAt: '2026-06-22T08:10:00Z',
    },
    metadata: {
      title: 'Réforme Ratio Solvabilité UEMOA 2026 : Guide Stratégique Complet pour Banques & SFD | KHEPRA EXPERTS',
      description: 'Analyse complète de la réforme du ratio de solvabilité UEMOA 2026.',
      tags: ['ratio solvabilité', 'UEMOA 2026', 'BCEAO', 'fonds propres', 'Bâle III', 'banques africaines', 'SFD', 'conformité bancaire', 'APR', 'coussin de fonds propres', 'gouvernance bancaire', 'audit interne', 'risk management', 'COBAC', 'OHADA', 'finance Afrique', 'régulation financière', 'instruction BCEAO', 'Pilier 1', 'Pilier 2'],
      hashtags: ['#Solvabilité', '#UEMOA2026', '#BCEAO', '#BanqueAfrique', '#KHEPRAEXPERTS', '#BâleIII', '#RégulationFinancière', '#Conformité', '#SFD', '#Gouvernance', '#RiskManagement', '#COBAC', '#OHADA'],
      playlist: 'Guides Pratiques',
      category: 'Éducation',
      language: 'Français',
      seoKeywords: ['ratio solvabilité UEMOA', 'réforme Bâle III BCEAO', 'fonds propres bancaires', 'SFD conformité', 'actifs pondérés risques', 'coussin conservation', 'banques UEMOA 2026', 'instruction BCEAO solvabilité'],
      chapters: [
        { time: '0:00', title: 'Introduction — Contexte de la Réforme' },
        { time: '2:30', title: 'Nouvelles Exigences de Fonds Propres' },
        { time: '5:45', title: 'Calcul des Actifs Pondérés par les Risques' },
        { time: '9:15', title: 'Coussins de Fonds Propres — Conservation & Contracyclique' },
        { time: '12:30', title: 'Calendrier de Mise en Conformité' },
        { time: '14:50', title: 'Conclusion — Recommandations KHEPRA' },
      ],
      cta: '📊 Téléchargez le calculateur de ratio de solvabilité : https://khepraexperts.com/outils\n🔔 Abonnez-vous pour ne pas manquer nos prochaines analyses réglementaires.',
      khepraUrl: 'https://khepraexperts.com',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/company/khepra-experts' },
        { platform: 'Twitter', url: 'https://twitter.com/khepraexperts' },
      ],
    },
    bigFourScore: buildBigFourScore('CONT-001', 'Réforme Ratio Solvabilité UEMOA 2026', 97),
    correctivePlan: null,
    complianceChecks: buildComplianceChecks('CONT-001'),
    editorialStructure: buildEditorialStructure('Réforme Ratio Solvabilité UEMOA 2026'),
    linkedInPosts: {
      dirigeant: '🚨 Réforme ratio solvabilité UEMOA 2026 : Ce que chaque DG de banque doit savoir.\n\nLa BCEAO vient de renforcer les exigences de fonds propres. Bâle III arrive en Afrique de l\'Ouest.\n\n3 points clés :\n1️⃣ Nouveau calcul des APR\n2️⃣ Coussin de conservation obligatoire\n3️⃣ Calendrier de mise en conformité accéléré\n\nJ\'ai analysé l\'instruction complète pour vous. Vidéo de 16 minutes avec exemples chiffrés.\n\nLien en commentaire 👇\n\n#BCEAO #Solvabilité #Banque #UEMOA #Gouvernance',
      pageEntreprise: '📊 Nouvelle analyse KHEPRA EXPERTS : Réforme du ratio de solvabilité UEMOA 2026.\n\nGuide stratégique complet pour les banques et SFD de la zone UEMOA.\n\n✅ Nouvelles exigences de fonds propres\n✅ Calcul des Actifs Pondérés par les Risques\n✅ Coussins de conservation et contracyclique\n✅ Calendrier de mise en conformité\n\n🎥 Regardez notre vidéo : [lien]\n📥 Téléchargez le calculateur : https://khepraexperts.com/outils\n\n#KHEPRAEXPERTS #UEMOA #BCEAO #Conformité #Banque',
    },
    seoArticle: {
      title: 'Réforme du Ratio de Solvabilité UEMOA 2026 : Guide Complet pour Banques et SFD',
      content: 'La réforme du ratio de solvabilité en zone UEMOA, effective depuis le 1er janvier 2026, constitue l\'évolution réglementaire la plus significative pour le secteur bancaire ouest-africain depuis deux décennies. Portée par la BCEAO en conformité avec les standards de Bâle III, cette réforme redéfinit en profondeur les exigences de fonds propres applicables à l\'ensemble des établissements de crédit et des systèmes financiers décentralisés (SFD) des huit États membres de l\'Union...\n\n[Article complet 1850 mots avec sections détaillées, tableaux, références réglementaires]',
      wordCount: 1850,
    },
    shortsScripts: [
      { title: 'BCEAO 2026 : Le nouveau ratio expliqué en 45s', duration: '45s', script: 'La BCEAO a changé les règles du jeu. Depuis janvier 2026, les banques UEMOA doivent respecter de nouvelles exigences de fonds propres. Calculez votre ratio dès maintenant sur khepraexperts.com' },
      { title: '3 erreurs qui bloquent votre conformité solvabilité', duration: '38s', script: 'Erreur 1 : sous-estimer les actifs pondérés par les risques. Erreur 2 : ignorer le coussin de conservation. Erreur 3 : attendre la dernière minute. Ne faites pas ces erreurs.' },
      { title: 'Bâle III en Afrique : ce qui change vraiment', duration: '52s', script: 'Bâle III n\'est pas qu\'un concept occidental. Il arrive en zone UEMOA avec des spécificités africaines. Découvrez les 5 changements majeurs pour votre établissement.' },
    ],
    qualityScore: 97,
    qualityChecks: [
      { checkId: 'QC-001-1', name: 'Titre SEO', category: 'metadata', score: 98, maxScore: 100, passed: true, detail: 'Titre optimisé : 58 caractères, mot-clé principal en début, pas de clickbait', checkedAt: '2026-06-22T07:40:00Z', autoFixed: true },
      { checkId: 'QC-001-2', name: 'Description YouTube', category: 'metadata', score: 95, maxScore: 100, passed: true, detail: 'Description 1250 caractères, 3 CTA, liens valides, hashtags pertinents', checkedAt: '2026-06-22T07:40:00Z', autoFixed: true },
      { checkId: 'QC-001-3', name: 'Qualité Audio', category: 'voice', score: 96, maxScore: 100, passed: true, detail: 'Clarté 96%, fluidité 94%, débit 155 mots/min, absence de bruit de fond', checkedAt: '2026-06-22T07:25:00Z', autoFixed: true },
      { checkId: 'QC-001-4', name: 'Qualité Vidéo', category: 'video', score: 97, maxScore: 100, passed: true, detail: '1080p, 30fps, transitions fluides, sous-titres synchronisés', checkedAt: '2026-06-22T08:15:00Z', autoFixed: true },
      { checkId: 'QC-001-5', name: 'Branding KHEPRA', category: 'branding', score: 100, maxScore: 100, passed: true, detail: 'Logo présent, couleurs charte, typographie conforme, générique début/fin', checkedAt: '2026-06-22T08:15:00Z', autoFixed: false },
      { checkId: 'QC-001-6', name: 'Conformité YouTube', category: 'compliance', score: 98, maxScore: 100, passed: true, detail: 'Pas de contenu protégé, pas de contenu inapproprié, durée < 20min, ratio 16:9', checkedAt: '2026-06-22T08:16:00Z', autoFixed: false },
      { checkId: 'QC-001-7', name: 'Lisibilité Mobile', category: 'thumbnail', score: 95, maxScore: 100, passed: true, detail: 'Texte lisible sur mobile, contraste suffisant, pas d\'éléments dans coins inférieurs droits', checkedAt: '2026-06-22T07:38:00Z', autoFixed: true },
    ],
    downloads: buildAllDownloads('CONT-001', 'READY'),
    createdAt: '2026-06-22T06:45:00Z',
    updatedAt: '2026-06-22T08:16:00Z',
    uploadedAt: null,
    publishedAt: null,
    youtubeUrl: null,
    agentAssigned: 'KOS™ Big Four YouTube Hybrid Production Factory',
    priority: 'critical',
  },
  {
    contentId: 'CONT-002',
    topic: 'LBC/FT 2026 — Les 40 recommandations actualisées du GAFI pour les banques africaines',
    videoType: 'analyse',
    audience: 'Responsables conformité, Directeurs juridiques, Banquiers UEMOA/CEMAC',
    audienceSegments: ['COMPLIANCE_OFFICER', 'DG_BANQUE', 'AUDITEUR_INTERNE'],
    stage: 'READY',
    status: 'READY',
    script: {
      title: 'LBC/FT 2026 : Les 40 Recommandations GAFI — Guide Pratique pour les Banques Africaines',
      fullText: '[INTRO]\nMesdames, Messieurs, bonjour. La lutte contre le blanchiment de capitaux et le financement du terrorisme entre dans une nouvelle ère...',
      description: 'Guide pratique complet sur les 40 recommandations actualisées du GAFI pour 2026.',
      estimatedDuration: '18 min',
      podcastScript: '[PODCAST — VERSION AUDIO]\n\nBienvenue dans ce nouvel épisode de KHEPRA EXPERTS dédié à la conformité LBC/FT...',
      teleprompterScript: '[TÉLÉPROMPTEUR]\n\nBonjour. LBC/FT 2026. Les 40 recommandations GAFI actualisées.\n\nCe qui change pour les banques africaines.\n\nAllons-y.',
      transcript: '[TRANSCRIPTION COMPLÈTE — 18 minutes]\n\n00:00:00 - Intro musicale...',
      createdAt: '2026-06-22T08:00:00Z',
    },
    voice: {
      profile: 'Fatoumata Diallo — Voix Analyste Conformité',
      format: 'mp3',
      durationSeconds: 1092,
      sizeBytes: 17472000,
      dataUri: null,
      createdAt: '2026-06-22T08:28:00Z',
    },
    thumbnail: {
      url: 'https://readdy.ai/api/search-image?query=Professional%20dark%20compliance%20investigation%20thumbnail%20with%20abstract%20shield%20geometric%20shapes%20in%20crimson%20red%20and%20silver%20accents%20serious%20authoritative%20tone%20modern%20editorial%20design%20high%20contrast%20dramatic%20lighting%20clean%20minimalist%20aesthetic&width=1280&height=720&seq=kos-bf-yt-factory-thumb-002&orientation=landscape',
      template: 'big-four-expert',
      resolution: '1280x720',
      createdAt: '2026-06-22T08:42:00Z',
    },
    video: {
      url: null,
      format: 'mp4',
      codec: 'H.264',
      audioCodec: 'AAC-LC',
      resolution: '1920x1080',
      fps: 30,
      audioHz: '48 kHz',
      sizeBytes: 312800000,
      createdAt: '2026-06-22T09:20:00Z',
    },
    metadata: {
      title: 'LBC/FT 2026 : Les 40 Recommandations GAFI Actualisées — Guide Banques Africaines | KHEPRA EXPERTS',
      description: 'Analyse détaillée des 40 recommandations GAFI actualisées pour 2026.',
      tags: ['LBC/FT', 'GAFI 2026', 'conformité bancaire', 'blanchiment capitaux', 'financement terrorisme', 'banques africaines', 'UEMOA', 'CEMAC', 'compliance officer', 'due diligence', 'KYC', 'déclaration soupçon', 'gel avoirs', 'approche par risques'],
      hashtags: ['#LBCFT', '#GAFI2026', '#Conformité', '#BanqueAfrique', '#KHEPRAEXPERTS', '#ComplianceOfficer', '#UEMOA', '#CEMAC', '#KYB', '#AML'],
      playlist: 'Conformité Réglementaire',
      category: 'Éducation',
      language: 'Français',
      seoKeywords: ['LBC/FT GAFI 2026', 'recommandations GAFI', 'conformité bancaire Afrique', 'blanchiment capitaux UEMOA', 'financement terrorisme CEMAC'],
      chapters: [
        { time: '0:00', title: 'Introduction — Le Nouveau GAFI 2026' },
        { time: '3:20', title: 'Les 40 Recommandations — Vue d\'Ensemble' },
        { time: '7:45', title: 'Focus : Recommandations 1-10 (Politiques)' },
        { time: '11:30', title: 'Focus : Recommandations 11-25 (Prévention)' },
        { time: '15:00', title: 'Focus : Recommandations 26-40 (Répression)' },
        { time: '17:20', title: 'Conclusion & Plan d\'Action' },
      ],
      cta: '📋 Téléchargez la checklist LBC/FT : https://khepraexperts.com/lead-magnets/checklist-conformite-bceao-cobac',
      khepraUrl: 'https://khepraexperts.com',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/company/khepra-experts' },
        { platform: 'Twitter', url: 'https://twitter.com/khepraexperts' },
      ],
    },
    bigFourScore: buildBigFourScore('CONT-002', 'LBC/FT 2026 — 40 Recommandations GAFI', 96),
    correctivePlan: null,
    complianceChecks: buildComplianceChecks('CONT-002'),
    editorialStructure: buildEditorialStructure('LBC/FT 2026 — 40 Recommandations GAFI'),
    linkedInPosts: {
      dirigeant: '🔴 LBC/FT 2026 : Le GAFI a actualisé ses 40 recommandations. Voici ce que chaque compliance officer doit savoir.\n\nPoints critiques :\n• Approche par risques renforcée\n• Bénéficiaires effectifs — transparence totale\n• Nouvelles obligations sur les crypto-actifs\n\nJ\'ai décrypté les 40 recommandations en 18 minutes. Vidéo complète : [lien]\n\n#LBCFT #GAFI #Compliance #BanqueAfrique',
      pageEntreprise: '📋 KHEPRA EXPERTS décrypte les 40 recommandations actualisées du GAFI 2026.\n\nUn guide pratique pour les banques africaines :\n✅ Recommandations 1-10 : Politiques nationales\n✅ Recommandations 11-25 : Mesures préventives\n✅ Recommandations 26-40 : Pouvoirs de répression\n\n🎥 Vidéo disponible : [lien]\n\n#Conformité #LBCFT #GAFI #Banque #KHEPRAEXPERTS',
    },
    seoArticle: {
      title: 'GAFI 2026 : Les 40 Recommandations LBC/FT Actualisées — Implications pour les Banques Africaines',
      content: 'Le Groupe d\'Action Financière (GAFI) a publié en 2026 la mise à jour la plus substantielle de ses 40 recommandations depuis 2012. Pour les banques africaines opérant dans les zones UEMOA et CEMAC, ces évolutions ont des implications directes et immédiates sur leurs dispositifs de conformité...\n\n[Article complet 2100 mots]',
      wordCount: 2100,
    },
    shortsScripts: [
      { title: 'GAFI 2026 : 3 nouvelles obligations en 30s', duration: '30s', script: 'Le GAFI a changé les règles. 3 nouvelles obligations pour les banques : bénéficiaires effectifs, crypto-actifs, approche par risques renforcée. Préparez-vous dès maintenant.' },
      { title: 'LBC/FT : les 5 erreurs fatales des banques africaines', duration: '55s', script: 'Erreur 1 : KYC obsolète. Erreur 2 : pas d\'approche par risques. Erreur 3 : formation insuffisante. Erreur 4 : déclarations de soupçons tardives. Erreur 5 : pas de due diligence renforcée.' },
    ],
    qualityScore: 96,
    qualityChecks: [],
    downloads: buildAllDownloads('CONT-002', 'READY'),
    createdAt: '2026-06-22T07:50:00Z',
    updatedAt: '2026-06-22T09:25:00Z',
    uploadedAt: null,
    publishedAt: null,
    youtubeUrl: null,
    agentAssigned: 'KOS™ Big Four YouTube Hybrid Production Factory',
    priority: 'critical',
  },
  {
    contentId: 'CONT-003',
    topic: 'Gouvernance des SFD — Les 7 piliers BCEAO pour attirer les investisseurs',
    videoType: 'formation',
    audience: 'Dirigeants SFD, Investisseurs, Administrateurs',
    audienceSegments: ['DG_MICROFINANCE', 'CA_SFD', 'INVESTISSEUR'],
    stage: 'VIDEO_ASSEMBLED',
    status: 'DRAFT',
    script: {
      title: 'Gouvernance SFD : Les 7 Piliers BCEAO pour Rassurer les Investisseurs | Guide 2026',
      fullText: '[INTRO]\nLa gouvernance est le premier facteur de décision des investisseurs dans le secteur de la microfinance en zone UEMOA...',
      description: 'Guide complet sur les 7 piliers de gouvernance SFD exigés par la BCEAO.',
      estimatedDuration: '14 min',
      podcastScript: '[PODCAST — VERSION AUDIO]\n\nBienvenue. Aujourd\'hui nous parlons gouvernance SFD et des 7 piliers qui rassurent les investisseurs...',
      teleprompterScript: '[TÉLÉPROMPTEUR]\n\nGouvernance SFD. 7 piliers BCEAO. Investisseurs. C\'est parti.',
      transcript: '[TRANSCRIPTION — 14 minutes]',
      createdAt: '2026-06-23T06:00:00Z',
    },
    voice: null,
    thumbnail: null,
    video: null,
    metadata: null,
    bigFourScore: null,
    correctivePlan: null,
    complianceChecks: [],
    editorialStructure: buildEditorialStructure('Gouvernance SFD — 7 Piliers BCEAO'),
    linkedInPosts: null,
    seoArticle: null,
    shortsScripts: [],
    qualityScore: 0,
    qualityChecks: [],
    downloads: buildAllDownloads('CONT-003', 'VIDEO_ASSEMBLED'),
    createdAt: '2026-06-23T06:00:00Z',
    updatedAt: '2026-06-23T06:00:00Z',
    uploadedAt: null,
    publishedAt: null,
    youtubeUrl: null,
    agentAssigned: 'KOS™ Big Four YouTube Hybrid Production Factory',
    priority: 'high',
  },
  {
    contentId: 'CONT-004',
    topic: 'Cybersécurité bancaire — Anticiper la Directive COBAC 2027 sur la résilience opérationnelle',
    videoType: 'capsule',
    audience: 'DSI, RSSI, Dirigeants de banques CEMAC, Risk Managers',
    audienceSegments: ['DG_BANQUE', 'RISK_MANAGER', 'AUDITEUR_INTERNE'],
    stage: 'SCRIPT_MASTER_GENERATED',
    status: 'DRAFT',
    script: {
      title: 'Cybersécurité Bancaire CEMAC : Anticiper la Directive COBAC 2027 sur la Résilience Opérationnelle',
      fullText: '[INTRO]\nLa cybersécurité bancaire en zone CEMAC entre dans une nouvelle ère avec la future directive COBAC 2027...',
      description: 'Guide anticipatif sur la directive COBAC 2027 relative à la cybersécurité et la résilience bancaire.',
      estimatedDuration: '12 min',
      podcastScript: '',
      teleprompterScript: '',
      transcript: '',
      createdAt: '2026-06-23T07:00:00Z',
    },
    voice: null,
    thumbnail: null,
    video: null,
    metadata: null,
    bigFourScore: null,
    correctivePlan: null,
    complianceChecks: [],
    editorialStructure: buildEditorialStructure('Cybersécurité COBAC 2027'),
    linkedInPosts: null,
    seoArticle: null,
    shortsScripts: [],
    qualityScore: 0,
    qualityChecks: [],
    downloads: buildAllDownloads('CONT-004', 'SCRIPT_MASTER_GENERATED'),
    createdAt: '2026-06-23T07:00:00Z',
    updatedAt: '2026-06-23T07:00:00Z',
    uploadedAt: null,
    publishedAt: null,
    youtubeUrl: null,
    agentAssigned: 'KOS™ Big Four YouTube Hybrid Production Factory',
    priority: 'high',
  },
  {
    contentId: 'CONT-005',
    topic: 'ESG & Finance Durable en Afrique — Stress tests climatiques Pilier 2 BCEAO/COBAC',
    videoType: 'analyse',
    audience: 'Directeurs ESG, Risk Managers, Banquiers, Régulateurs',
    audienceSegments: ['DG_BANQUE', 'RISK_MANAGER', 'AGENCE_PUBLIQUE'],
    stage: 'BLOCKED_BIG_FOUR',
    status: 'BLOCKED',
    script: {
      title: 'ESG & Finance Durable Afrique : Stress Tests Climatiques Pilier 2 — Guide BCEAO/COBAC 2026',
      fullText: '[INTRO]\nLes stress tests climatiques deviennent une exigence réglementaire en zone UEMOA et CEMAC...',
      description: 'Analyse des stress tests climatiques Pilier 2 BCEAO/COBAC et leurs implications ESG.',
      estimatedDuration: '15 min',
      podcastScript: '[PODCAST]\n\nESG, finance durable, stress tests climatiques — ces sujets ne sont plus optionnels...',
      teleprompterScript: '[TÉLÉPROMPTEUR]\n\nESG. Finance Durable. Stress Tests Pilier 2.',
      transcript: '[TRANSCRIPTION]',
      createdAt: '2026-06-23T08:00:00Z',
    },
    voice: {
      profile: 'Aminata Sow — Voix Experte ESG',
      format: 'mp3',
      durationSeconds: 912,
      sizeBytes: 14592000,
      dataUri: null,
      createdAt: '2026-06-23T08:20:00Z',
    },
    thumbnail: {
      url: 'https://readdy.ai/api/search-image?query=Professional%20ESG%20sustainability%20finance%20thumbnail%20with%20abstract%20green%20leaf%20and%20circuit%20board%20fusion%20dark%20background%20clean%20minimalist%20design%20corporate%20editorial%20high%20contrast%20gold%20and%20emerald%20accents&width=1280&height=720&seq=kos-bf-yt-factory-thumb-005&orientation=landscape',
      template: 'big-four-expert',
      resolution: '1280x720',
      createdAt: '2026-06-23T08:35:00Z',
    },
    video: null,
    metadata: null,
    bigFourScore: {
      editorial: {
        dimension: 'editorial', label: 'Qualité Éditoriale', score: 82, maxScore: 100, passed: false,
        icon: 'ri-pencil-ruler-2-line', color: '#86BC25',
        details: ['Structure Big Four globalement respectée', 'Hook acceptable'],
        issues: ['Section Contexte trop courte', 'Manque de données chiffrées dans l\'Analyse', 'Conclusion sans synthèse exécutive claire'],
      },
      technique: {
        dimension: 'technique', label: 'Qualité Technique', score: 68, maxScore: 100, passed: false,
        icon: 'ri-settings-3-line', color: '#CA8A04',
        details: ['Script complet'],
        issues: ['Audio 44.1kHz au lieu de 48kHz', 'Sous-titres absents', 'Pas de vidéo assemblée', 'Manque outro institutionnelle'],
      },
      seo: {
        dimension: 'seo', label: 'SEO YouTube', score: 62, maxScore: 100, passed: false,
        icon: 'ri-search-eye-line', color: '#0A66C2',
        details: ['Titre présent'],
        issues: ['Titre non optimisé (manque mots-clés)', 'Description YouTube absente', 'Aucun tag SEO', 'Pas de chapitrage', 'Hashtags manquants'],
      },
      conformite: {
        dimension: 'conformite', label: 'Conformité Réglementaire', score: 74, maxScore: 100, passed: false,
        icon: 'ri-scales-3-line', color: '#D4A853',
        details: ['Cadre BCEAO/COBAC mentionné'],
        issues: ['Références réglementaires non vérifiées', '3 affirmations non sourcées sur les scénarios climatiques', 'Données de stress tests non attribuées'],
      },
      branding: {
        dimension: 'branding', label: 'Branding KHEPRA', score: 85, maxScore: 100, passed: false,
        icon: 'ri-building-4-line', color: '#059669',
        details: ['Logo présent sur la miniature'],
        issues: ['Absence de générique intro', 'Absence d\'outro institutionnelle', 'Charte couleurs non systématique'],
      },
      impactCommercial: {
        dimension: 'impactCommercial', label: 'Impact Commercial', score: 58, maxScore: 100, passed: false,
        icon: 'ri-line-chart-line', color: '#FF0000',
        details: ['Sujet à fort potentiel commercial'],
        issues: ['Aucun CTA', 'Pas de lien vers diagnostic ESG KHEPRA', 'Pas de proposition de valeur explicite', 'Aucune offre de service mentionnée'],
      },
      autoriteMetier: {
        dimension: 'autoriteMetier', label: 'Autorité Métier', score: 72, maxScore: 100, passed: false,
        icon: 'ri-award-line', color: '#7C3AED',
        details: ['Sujet d\'expertise KHEPRA'],
        issues: ['Manque de données exclusives KHEPRA', 'Pas de cas clients ou références projets', 'Positionnement pas assez différenciant'],
      },
      global: 72,
      maxGlobal: 700,
      passed: false,
      threshold: 90,
    },
    correctivePlan: {
      planId: 'CP-CONT-005',
      contentId: 'CONT-005',
      generatedAt: '2026-06-23T09:00:00Z',
      blockedScore: 72,
      targetScore: 90,
      actions: [
        { actionId: 'CP-005-1', category: 'editorial', issue: 'Section Contexte trop courte', remedy: 'Ajouter 2-3 paragraphes sur le cadre réglementaire ESG UEMOA/CEMAC avec données chiffrées', priority: 'critical', estimatedTime: '15 min', autoFixable: true, fixed: false },
        { actionId: 'CP-005-2', category: 'editorial', issue: 'Manque données chiffrées dans l\'Analyse', remedy: 'Intégrer graphiques stress tests NGFS, données GIEC Afrique, scénarios BCEAO', priority: 'critical', estimatedTime: '20 min', autoFixable: true, fixed: false },
        { actionId: 'CP-005-3', category: 'editorial', issue: 'Conclusion sans synthèse exécutive', remedy: 'Ajouter un résumé exécutif structuré en fin de vidéo', priority: 'high', estimatedTime: '10 min', autoFixable: true, fixed: false },
        { actionId: 'CP-005-4', category: 'technique', issue: 'Audio 44.1kHz → 48kHz', remedy: 'Réencoder l\'audio à 48kHz avec upsampling de qualité', priority: 'critical', estimatedTime: '5 min', autoFixable: true, fixed: false },
        { actionId: 'CP-005-5', category: 'technique', issue: 'Sous-titres absents', remedy: 'Générer les sous-titres en français depuis la transcription', priority: 'critical', estimatedTime: '10 min', autoFixable: true, fixed: false },
        { actionId: 'CP-005-6', category: 'technique', issue: 'Pas de vidéo assemblée', remedy: 'Assembler la vidéo avec les assets existants (script + voix + miniature)', priority: 'critical', estimatedTime: '25 min', autoFixable: true, fixed: false },
        { actionId: 'CP-005-7', category: 'seo', issue: 'Titre non optimisé SEO', remedy: 'Reformuler le titre avec mots-clés : ESG, stress tests, Pilier 2, BCEAO, Afrique', priority: 'high', estimatedTime: '5 min', autoFixable: true, fixed: false },
        { actionId: 'CP-005-8', category: 'seo', issue: 'Description YouTube absente', remedy: 'Générer description complète avec résumé, chapitres, ressources, hashtags', priority: 'high', estimatedTime: '10 min', autoFixable: true, fixed: false },
        { actionId: 'CP-005-9', category: 'seo', issue: 'Tags SEO manquants', remedy: 'Générer 25-30 tags ciblés ESG, finance durable, BCEAO, stress tests', priority: 'medium', estimatedTime: '5 min', autoFixable: true, fixed: false },
        { actionId: 'CP-005-10', category: 'conformite', issue: 'Références réglementaires non vérifiées', remedy: 'Vérifier chaque référence BCEAO/COBAC avec le RAG réglementaire KHEPRA', priority: 'critical', estimatedTime: '15 min', autoFixable: false, fixed: false },
        { actionId: 'CP-005-11', category: 'conformite', issue: 'Données stress tests non sourcées', remedy: 'Attribuer chaque donnée à sa source (NGFS, GIEC, BCEAO)', priority: 'high', estimatedTime: '10 min', autoFixable: true, fixed: false },
        { actionId: 'CP-005-12', category: 'branding', issue: 'Pas de générique intro/outro', remedy: 'Ajouter les génériques KHEPRA EXPERTS standard', priority: 'medium', estimatedTime: '5 min', autoFixable: true, fixed: false },
        { actionId: 'CP-005-13', category: 'impactCommercial', issue: 'Aucun CTA', remedy: 'Ajouter CTA structuré : diagnostic ESG gratuit + consultation', priority: 'high', estimatedTime: '5 min', autoFixable: true, fixed: false },
        { actionId: 'CP-005-14', category: 'autoriteMetier', issue: 'Pas de données exclusives KHEPRA', remedy: 'Intégrer 2-3 insights issus des missions ESG KHEPRA (anonymisés)', priority: 'medium', estimatedTime: '15 min', autoFixable: true, fixed: false },
        { actionId: 'CP-005-15', category: 'autoriteMetier', issue: 'Positionnement pas assez différenciant', remedy: 'Ajouter un angle thought leadership : "Ce que les banques africaines doivent faire différemment"', priority: 'medium', estimatedTime: '10 min', autoFixable: true, fixed: false },
        { actionId: 'CP-005-16', category: 'seo', issue: 'Chapitrage absent', remedy: 'Générer 6-8 chapitres avec timestamps optimisés SEO', priority: 'medium', estimatedTime: '5 min', autoFixable: true, fixed: false },
      ],
      totalActions: 16,
      fixedActions: 0,
      estimatedTotalTime: '~3h 10min',
    },
    complianceChecks: buildComplianceChecks('CONT-005'),
    editorialStructure: buildEditorialStructure('ESG & Finance Durable — Stress Tests Pilier 2'),
    linkedInPosts: null,
    seoArticle: null,
    shortsScripts: [],
    qualityScore: 72,
    qualityChecks: [],
    downloads: buildAllDownloads('CONT-005', 'BLOCKED_BIG_FOUR'),
    createdAt: '2026-06-23T08:00:00Z',
    updatedAt: '2026-06-23T09:00:00Z',
    uploadedAt: null,
    publishedAt: null,
    youtubeUrl: null,
    agentAssigned: 'KOS™ Big Four YouTube Hybrid Production Factory',
    priority: 'critical',
  },
];

// ─── Studio KPIs ───
export const STUDIO_KPIS: StudioKPIs = {
  totalScriptsProduced: 5,
  totalVideosGenerated: 2,
  totalContentReady: 2,
  totalContentUploaded: 0,
  totalContentPublished: 0,
  totalBlocked: 1,
  avgProductionTime: '3h 12min',
  successRate: 96.5,
  qualityPassRate: 92.0,
  bigFourPassRate: 66.7,
  mode: 'MODE_A',
  oauthStatus: 'DISCONNECTED',
  lastScanTimestamp: '2026-06-23T09:00:00Z',
};

// ─── Pending Queue ───
export const PENDING_QUEUE: PendingQueueItem[] = [
  {
    queueId: 'QUEUE-001', contentId: 'CONT-001',
    title: 'Réforme Ratio Solvabilité UEMOA 2026', topic: 'ratio solvabilité UEMOA',
    stage: 'READY', status: 'READY', priority: 'critical',
    scheduledDate: '2026-06-23T14:00:00Z', qualityScore: 97, bigFourScore: 97,
    downloadsReady: 11, totalDownloads: 18, createdAt: '2026-06-22T06:45:00Z', etaToReady: 'Prêt — Pack Complet',
  },
  {
    queueId: 'QUEUE-002', contentId: 'CONT-002',
    title: 'LBC/FT 2026 — 40 Recommandations GAFI', topic: 'LBC/FT GAFI',
    stage: 'READY', status: 'READY', priority: 'critical',
    scheduledDate: '2026-06-23T14:30:00Z', qualityScore: 96, bigFourScore: 96,
    downloadsReady: 11, totalDownloads: 18, createdAt: '2026-06-22T07:50:00Z', etaToReady: 'Prêt — Pack Complet',
  },
  {
    queueId: 'QUEUE-003', contentId: 'CONT-003',
    title: 'Gouvernance SFD — 7 Piliers BCEAO', topic: 'gouvernance SFD',
    stage: 'VIDEO_ASSEMBLED', status: 'DRAFT', priority: 'high',
    scheduledDate: '2026-06-24T00:00:00Z', qualityScore: 0, bigFourScore: 0,
    downloadsReady: 3, totalDownloads: 18, createdAt: '2026-06-23T06:00:00Z', etaToReady: '~4h',
  },
  {
    queueId: 'QUEUE-004', contentId: 'CONT-004',
    title: 'Cybersécurité COBAC 2027', topic: 'cybersécurité COBAC',
    stage: 'SCRIPT_MASTER_GENERATED', status: 'DRAFT', priority: 'high',
    scheduledDate: '2026-06-24T00:00:00Z', qualityScore: 0, bigFourScore: 0,
    downloadsReady: 2, totalDownloads: 18, createdAt: '2026-06-23T07:00:00Z', etaToReady: '~5h',
  },
  {
    queueId: 'QUEUE-005', contentId: 'CONT-005',
    title: 'ESG & Finance Durable — Stress Tests', topic: 'ESG stress tests',
    stage: 'BLOCKED_BIG_FOUR', status: 'BLOCKED', priority: 'critical',
    scheduledDate: null, qualityScore: 72, bigFourScore: 72,
    downloadsReady: 3, totalDownloads: 18, createdAt: '2026-06-23T08:00:00Z', etaToReady: 'BLOQUÉ — 16 actions correctives',
  },
];

// ─── AUDIENCE CONFIGURATION SYSTEM ───────────────────────────────────────────
// Pour chaque segment d'audience, définit : voix recommandée, ton, mots-clés
// éditoriaux, angle d'attaque, niveau de technicité et personnalisation structure

export interface AudienceConfig {
  segment: AudienceSegment;
  label: string;
  icon: string;
  color: string;
  description: string;
  recommendedVoiceId: string;
  recommendedVoiceName: string;
  editorialTone: string;
  technicityLevel: 'expert' | 'senior' | 'intermediate' | 'accessible';
  hookAngle: string;
  seoFocus: string[];
  structureAdaptation: {
    intro: string;
    contexte: string;
    analyse: string;
    recommandations: string;
    conclusion: string;
  };
  ctaFocus: string;
}

export const AUDIENCE_CONFIGS: AudienceConfig[] = [
  {
    segment: 'DG_BANQUE',
    label: 'DG / CEO Banque',
    icon: 'ri-bank-line',
    color: '#86BC25',
    description: 'Directeur Général d\'établissement bancaire en zone UEMOA ou CEMAC',
    recommendedVoiceId: 'vp-celestin-koffi',
    recommendedVoiceName: 'Dr. Célestin Koffi — Expert Institutionnel',
    editorialTone: 'Big Four — Institutionnel stratégique',
    technicityLevel: 'expert',
    hookAngle: 'Impact stratégique sur la rentabilité et la pérennité de l\'institution',
    seoFocus: ['agrément bancaire', 'gouvernance bancaire UEMOA', 'ratio solvabilité', 'stratégie bancaire Afrique'],
    structureAdaptation: {
      intro: 'Enjeu stratégique et impact sur la valorisation de l\'institution',
      contexte: 'Évolution réglementaire et positionnement concurrentiel',
      analyse: 'Impact sur le bilan, le capital et la rentabilité (ROE, ROA)',
      recommandations: 'Plan d\'action exécutif — décisions de gouvernance requises',
      conclusion: 'Prochaines étapes et ressources KHEPRA EXPERTS',
    },
    ctaFocus: 'Demander un diagnostic stratégique',
  },
  {
    segment: 'COMPLIANCE_OFFICER',
    label: 'Compliance Officer',
    icon: 'ri-shield-check-line',
    color: '#C2410C',
    description: 'Responsable conformité, conformiste réglementaire en banque ou SFD',
    recommendedVoiceId: 'vp-fatoumata-diallo',
    recommendedVoiceName: 'Fatoumata Diallo — Analyste Conformité',
    editorialTone: 'Big Four — Technique opérationnel',
    technicityLevel: 'expert',
    hookAngle: 'Risque opérationnel immédiat et plan de remédiation',
    seoFocus: ['conformité BCEAO', 'LBC/FT GAFI', 'compliance bancaire', 'obligations réglementaires UEMOA'],
    structureAdaptation: {
      intro: 'Non-conformité détectée et risque d\'inspection',
      contexte: 'Textes réglementaires applicables et obligations précises',
      analyse: 'Cartographie des risques et points de contrôle critiques',
      recommandations: 'Checklist opérationnelle et plan de remédiation 90 jours',
      conclusion: 'Rapport de conformité et contact expert KHEPRA',
    },
    ctaFocus: 'Télécharger la checklist de conformité',
  },
  {
    segment: 'RISK_MANAGER',
    label: 'Risk Manager',
    icon: 'ri-alert-line',
    color: '#CA8A04',
    description: 'Directeur des risques, risk manager en établissement financier',
    recommendedVoiceId: 'vp-fatoumata-diallo',
    recommendedVoiceName: 'Fatoumata Diallo — Analyste Conformité',
    editorialTone: 'Big Four — Analytique quantitatif',
    technicityLevel: 'expert',
    hookAngle: 'Exposition aux risques non mesurée et scénarios adverses',
    seoFocus: ['gestion des risques bancaires', 'stress test BCEAO', 'risk management Afrique', 'pilier 2 UEMOA'],
    structureAdaptation: {
      intro: 'Risque systémique et exposition non mesurée',
      contexte: 'Cadre prudentiel Pilier 1, 2, 3 et exigences quantitatives',
      analyse: 'Modèles de risque, stress tests et benchmarks sectoriels',
      recommandations: 'Mise à jour des modèles et matrices de risque',
      conclusion: 'Diagnostic des risques KHEPRA EXPERTS',
    },
    ctaFocus: 'Accéder au simulateur de stress test',
  },
  {
    segment: 'AUDITEUR_INTERNE',
    label: 'Auditeur Interne',
    icon: 'ri-search-eye-line',
    color: '#0A66C2',
    description: 'Responsable audit interne, auditeur senior en banque ou SFD',
    recommendedVoiceId: 'vp-fatoumata-diallo',
    recommendedVoiceName: 'Fatoumata Diallo — Analyste Conformité',
    editorialTone: 'Big Four — Méthodologique rigoureux',
    technicityLevel: 'expert',
    hookAngle: 'Failles du dispositif de contrôle interne et recommandations CAC',
    seoFocus: ['audit interne bancaire', 'contrôle interne COBAC', '3 lignes de défense', 'charte audit interne'],
    structureAdaptation: {
      intro: 'Faille détectée dans le dispositif de contrôle',
      contexte: 'Standards IIA, circulaire BCEAO et exigences COBAC',
      analyse: 'Évaluation du dispositif de contrôle interne selon 3 lignes',
      recommandations: 'Programme d\'audit et plan de remédiation priorisé',
      conclusion: 'Accompagnement audit KHEPRA EXPERTS',
    },
    ctaFocus: 'Télécharger le programme d\'audit type',
  },
  {
    segment: 'PCA',
    label: 'PCA / Administrateur',
    icon: 'ri-building-4-line',
    color: '#7C3AED',
    description: 'Président du conseil d\'administration, administrateur indépendant',
    recommendedVoiceId: 'vp-celestin-koffi',
    recommendedVoiceName: 'Dr. Célestin Koffi — Expert Institutionnel',
    editorialTone: 'Big Four — Gouvernance stratégique',
    technicityLevel: 'senior',
    hookAngle: 'Responsabilité personnelle des administrateurs et risque fiduciaire',
    seoFocus: ['gouvernance conseil administration', 'administrateur indépendant BCEAO', 'comités spécialisés', 'responsabilité CA'],
    structureAdaptation: {
      intro: 'Responsabilité fiduciaire du conseil d\'administration',
      contexte: 'Obligations légales, circulaires BCEAO/COBAC et bonnes pratiques',
      analyse: 'Évaluation du dispositif de gouvernance et des comités',
      recommandations: 'Renforcement de la gouvernance et charte des administrateurs',
      conclusion: 'Formation et accompagnement gouvernance KHEPRA',
    },
    ctaFocus: 'Évaluer la maturité de gouvernance',
  },
  {
    segment: 'DG_MICROFINANCE',
    label: 'DG SFD / Microfinance',
    icon: 'ri-community-line',
    color: '#D97757',
    description: 'Directeur général d\'un SFD, IMF, coopérative d\'épargne et de crédit',
    recommendedVoiceId: 'vp-celestin-koffi',
    recommendedVoiceName: 'Dr. Célestin Koffi — Expert Institutionnel',
    editorialTone: 'Big Four — Institutionnel inclusif',
    technicityLevel: 'senior',
    hookAngle: 'Conformité réglementaire SFD et pérennité de la mission sociale',
    seoFocus: ['SFD conformité BCEAO', 'microfinance UEMOA', 'instruction BCEAO SFD', 'gouvernance IMF'],
    structureAdaptation: {
      intro: 'Enjeu réglementaire et impact sur la mission d\'inclusion financière',
      contexte: 'Instructions BCEAO spécifiques aux SFD et IMF',
      analyse: 'Conformité institutionnelle et pérennité opérationnelle',
      recommandations: 'Plan de mise en conformité et renforcement institutionnel',
      conclusion: 'Accompagnement SFD KHEPRA EXPERTS',
    },
    ctaFocus: 'Demander un diagnostic SFD',
  },
  {
    segment: 'INVESTISSEUR',
    label: 'Investisseur / Private Equity',
    icon: 'ri-funds-line',
    color: '#059669',
    description: 'Investisseur institutionnel, fonds PE/VC, DFI actif en Afrique francophone',
    recommendedVoiceId: 'vp-fatoumata-diallo',
    recommendedVoiceName: 'Fatoumata Diallo — Analyste Conformité',
    editorialTone: 'Big Four — Finance d\'investissement',
    technicityLevel: 'senior',
    hookAngle: 'Due diligence réglementaire et risques d\'investissement',
    seoFocus: ['investissement Afrique francophone', 'due diligence UEMOA', 'private equity Afrique', 'levée de fonds CEMAC'],
    structureAdaptation: {
      intro: 'Risques réglementaires et impact sur la valorisation',
      contexte: 'Environnement réglementaire et risque pays UEMOA/CEMAC',
      analyse: 'Due diligence réglementaire et conformité ESG',
      recommandations: 'Critères d\'investissement et covenants réglementaires',
      conclusion: 'Mandate KHEPRA pour due diligence',
    },
    ctaFocus: 'Commander une due diligence réglementaire',
  },
  {
    segment: 'CA_SFD',
    label: 'Conseil Admin SFD',
    icon: 'ri-group-line',
    color: '#D97757',
    description: 'Membre du conseil d\'administration d\'un SFD ou coopérative',
    recommendedVoiceId: 'vp-aminata-sow',
    recommendedVoiceName: 'Aminata Sow — Experte ESG & Finance Durable',
    editorialTone: 'Big Four — Gouvernance participative',
    technicityLevel: 'accessible',
    hookAngle: 'Responsabilité collective et impact sur les membres',
    seoFocus: ['gouvernance SFD', 'conseil administration coopérative', 'BCEAO SFD', 'inclusion financière'],
    structureAdaptation: {
      intro: 'Responsabilité du conseil et impact sur la communauté',
      contexte: 'Obligations légales et bonnes pratiques de gouvernance',
      analyse: 'Évaluation des risques et performances institutionnelles',
      recommandations: 'Renforcement de la gouvernance participative',
      conclusion: 'Formation gouvernance SFD KHEPRA',
    },
    ctaFocus: 'Accéder à la formation gouvernance SFD',
  },
  {
    segment: 'AGENCE_PUBLIQUE',
    label: 'Agence Publique / Ministère',
    icon: 'ri-government-line',
    color: '#86BC25',
    description: 'Cadre de ministère, agence publique ou régulateur sectoriel',
    recommendedVoiceId: 'vp-aminata-sow',
    recommendedVoiceName: 'Aminata Sow — Experte ESG & Finance Durable',
    editorialTone: 'Big Four — Politique publique',
    technicityLevel: 'senior',
    hookAngle: 'Impact des réformes réglementaires sur le secteur financier',
    seoFocus: ['réforme financière Afrique', 'politique économique UEMOA', 'régulation secteur financier', 'OHADA réforme'],
    structureAdaptation: {
      intro: 'Enjeu politique et impact macroéconomique',
      contexte: 'Cadre réglementaire régional et international',
      analyse: 'Impact sectoriel et effets sur l\'économie réelle',
      recommandations: 'Recommandations de politique publique',
      conclusion: 'Conseil en politique réglementaire KHEPRA',
    },
    ctaFocus: 'Solliciter un avis d\'expert',
  },
  {
    segment: 'PME',
    label: 'PME / ETI',
    icon: 'ri-store-line',
    color: '#D97757',
    description: 'Dirigeant de PME ou ETI cherchant à se conformer ou lever des fonds',
    recommendedVoiceId: 'vp-aminata-sow',
    recommendedVoiceName: 'Aminata Sow — Experte ESG & Finance Durable',
    editorialTone: 'Big Four — Accessible pratique',
    technicityLevel: 'accessible',
    hookAngle: 'Accès au financement et conformité réglementaire pour les PME',
    seoFocus: ['PME Afrique conformité', 'financement PME UEMOA', 'gouvernance PME', 'due diligence PME'],
    structureAdaptation: {
      intro: 'Défi de financement et barrière réglementaire',
      contexte: 'Exigences réglementaires applicables aux PME',
      analyse: 'Lacunes de conformité et impact sur la bancabilité',
      recommandations: 'Plan d\'action pratique et ressources disponibles',
      conclusion: 'Accompagnement PME KHEPRA EXPERTS',
    },
    ctaFocus: 'Évaluer votre bancabilité',
  },
];

export function getAudienceConfig(segment: AudienceSegment): AudienceConfig | null {
  return AUDIENCE_CONFIGS.find((c) => c.segment === segment) || null;
}

export function getRecommendedVoiceForAudiences(segments: AudienceSegment[]): string {
  if (segments.length === 0) return 'vp-celestin-koffi';
  const config = getAudienceConfig(segments[0]);
  return config?.recommendedVoiceId || 'vp-celestin-koffi';
}

// ─── SSE → Big Four Factory Bridge Params ────────────────────────────────────
export interface SSEFactoryParams {
  sseArticleId: string;
  topic: string;
  title: string;
  videoType: ContentItem['videoType'];
  audienceSegments: AudienceSegment[];
  recommendedVoiceId: string;
  sseGlobalScore: number;
  sseHookScore: number;
  keywords: string[];
  estimatedDuration: string;
  sourceArticleUrl: string;
}