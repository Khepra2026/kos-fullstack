// ─── KOS YouTube Hybrid Recovery & Corrective Actions™ — Mock Data Engine ───
// Détection des points bloquants et actions correctives automatiques
// Production YouTube KHEPRA EXPERTS sans dépendance Google OAuth
// Consortium PwC · Deloitte · EY · KPMG — 22 Juin 2026

export type BlockSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';
export type AssetType = 'SCRIPT' | 'AUDIO' | 'THUMBNAIL' | 'VIDEO' | 'METADATA' | 'ALL';
export type RecoveryCase = 'CASE_1' | 'CASE_2' | 'CASE_3' | 'CASE_4' | 'CASE_5' | 'CASE_0';
export type RecoveryStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'FAILED' | 'RETRYING';
export type LogLevel = 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

export interface BlockPointDetail {
  assetType: AssetType;
  present: boolean;
  status: 'OK' | 'MISSING' | 'CORRUPTED' | 'INCOMPLETE' | 'OUTDATED';
  detail: string;
  recoverable: boolean;
  estimatedFixTime: string;
}

export interface BlockPointDiagnostic {
  diagnosticId: string;
  contentId: string;
  contentTitle: string;
  scannedAt: string;
  blocks: BlockPointDetail[];
  criticalBlocks: number;
  totalBlocks: number;
  recoveryCase: RecoveryCase;
  severity: BlockSeverity;
  autoFixable: boolean;
}

export interface RecoveryAction {
  actionId: string;
  diagnosticId: string;
  caseType: RecoveryCase;
  assetType: AssetType;
  actionName: string;
  description: string;
  status: RecoveryStatus;
  startedAt: string;
  completedAt: string | null;
  durationSeconds: number;
  success: boolean;
  retryCount: number;
  maxRetries: number;
  outputMessage: string;
}

export interface RecoveryErrorLog {
  logId: string;
  timestamp: string;
  level: LogLevel;
  contentId: string;
  contentTitle: string;
  errorType: string;
  errorMessage: string;
  correctiveAction: string;
  result: 'RESOLVED' | 'PENDING' | 'FAILED' | 'IN_PROGRESS';
  resolvedAt: string | null;
  retryCount: number;
}

export interface RecoveryKPIs {
  totalContentScanned: number;
  contentWithBlocks: number;
  contentClean: number;
  totalBlocksDetected: number;
  blocksResolved: number;
  blocksPending: number;
  autoFixSuccessRate: number;
  avgRecoveryTime: string;
  criticalIncidents: number;
  criticalResolved: number;
  totalErrorLogs: number;
  unresolvedErrors: number;
  lastFullScan: string;
  nextScheduledScan: string;
  systemHealth: 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED';
  uptimePercent: number;
}

export interface RecoveryUploadStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  fileType: string;
  mandatory: boolean;
}

export interface RecoveryManualGuide {
  guideId: string;
  contentId: string;
  contentTitle: string;
  caseType: RecoveryCase;
  steps: RecoveryUploadStep[];
  readyFiles: number;
  totalFiles: number;
  estimatedUploadTime: string;
}

// ─── 5 CAS de Blocage (CAS 0 = Aucun blocage) ───
export const RECOVERY_CASE_LABELS: Record<RecoveryCase, string> = {
  CASE_0: 'Aucun blocage — Pipeline OK',
  CASE_1: 'Script présent · Audio absent',
  CASE_2: 'Audio présent · Miniature absente',
  CASE_3: 'Audio + Miniature présents · Vidéo absente',
  CASE_4: 'Vidéo corrompue ou illisible',
  CASE_5: 'Métadonnées absentes ou incomplètes',
};

export const RECOVERY_CASE_COLORS: Record<RecoveryCase, string> = {
  CASE_0: '#059669',
  CASE_1: '#CA8A04',
  CASE_2: '#D4A853',
  CASE_3: '#FF0000',
  CASE_4: '#DC2626',
  CASE_5: '#0A66C2',
};

export const RECOVERY_CASE_ICONS: Record<RecoveryCase, string> = {
  CASE_0: 'ri-check-double-line',
  CASE_1: 'ri-mic-off-line',
  CASE_2: 'ri-image-add-line',
  CASE_3: 'ri-movie-line',
  CASE_4: 'ri-file-warning-line',
  CASE_5: 'ri-code-s-slash-line',
};

// ─── Diagnostics de Blocage — 8 scans sur 6 contenus ───
export const BLOCK_DIAGNOSTICS: BlockPointDiagnostic[] = [
  {
    diagnosticId: 'DIAG-001',
    contentId: 'CONT-001',
    contentTitle: 'Réforme Ratio Solvabilité UEMOA 2026',
    scannedAt: '2026-06-22T11:00:00Z',
    blocks: [
      { assetType: 'SCRIPT', present: true, status: 'OK', detail: 'Script complet, 1250 mots, SEO optimisé', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'AUDIO', present: true, status: 'OK', detail: 'MP3 16min08s, 15488 KB, débit 155 mots/min, clarté 96%', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'THUMBNAIL', present: true, status: 'OK', detail: '1280x720 PNG, contraste suffisant, lisible mobile', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'VIDEO', present: true, status: 'OK', detail: 'MP4 1080p 30fps, 284 MB, transitions fluides, sous-titres OK', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'METADATA', present: true, status: 'OK', detail: 'Titre 58 car, description 1250 car, 10 tags, 10 hashtags, 6 chapitres', recoverable: true, estimatedFixTime: '0 min' },
    ],
    criticalBlocks: 0,
    totalBlocks: 5,
    recoveryCase: 'CASE_0',
    severity: 'NONE',
    autoFixable: true,
  },
  {
    diagnosticId: 'DIAG-002',
    contentId: 'CONT-002',
    contentTitle: 'LBC/FT 2026 — 40 Recommandations GAFI',
    scannedAt: '2026-06-22T11:05:00Z',
    blocks: [
      { assetType: 'SCRIPT', present: true, status: 'OK', detail: 'Script complet, 1420 mots, SEO 97%', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'AUDIO', present: true, status: 'OK', detail: 'MP3 18min12s, qualité pro, clarté 95%', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'THUMBNAIL', present: true, status: 'OK', detail: '1280x720 PNG, template big-four-expert, branding OK', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'VIDEO', present: true, status: 'OK', detail: 'MP4 1080p, 312 MB, infographies lisibles', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'METADATA', present: true, status: 'OK', detail: 'Métadonnées complètes, 8 tags, 8 hashtags, 6 chapitres', recoverable: true, estimatedFixTime: '0 min' },
    ],
    criticalBlocks: 0,
    totalBlocks: 5,
    recoveryCase: 'CASE_0',
    severity: 'NONE',
    autoFixable: true,
  },
  {
    diagnosticId: 'DIAG-003',
    contentId: 'CONT-003',
    contentTitle: 'Régulation FinTech UEMOA 2026-2027',
    scannedAt: '2026-06-22T11:10:00Z',
    blocks: [
      { assetType: 'SCRIPT', present: true, status: 'OK', detail: 'Script complet, 1580 mots', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'AUDIO', present: true, status: 'OK', detail: 'MP3 22min12s, 21312 KB, voix institutionnelle', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'THUMBNAIL', present: true, status: 'OK', detail: '1280x720 PNG, template data-insight, lisible mobile', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'VIDEO', present: false, status: 'MISSING', detail: 'Vidéo absente — assemblage FFmpeg non exécuté. Fichier WebM vide (0 bytes).', recoverable: true, estimatedFixTime: '~4 min' },
      { assetType: 'METADATA', present: true, status: 'OK', detail: 'Métadonnées présentes, 7 tags, 7 hashtags, 5 chapitres', recoverable: true, estimatedFixTime: '0 min' },
    ],
    criticalBlocks: 1,
    totalBlocks: 5,
    recoveryCase: 'CASE_3',
    severity: 'HIGH',
    autoFixable: true,
  },
  {
    diagnosticId: 'DIAG-004',
    contentId: 'CONT-004',
    contentTitle: 'Cybersécurité Bancaire — COBAC 2027',
    scannedAt: '2026-06-22T11:15:00Z',
    blocks: [
      { assetType: 'SCRIPT', present: true, status: 'OK', detail: 'Script validé, 925 mots', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'AUDIO', present: false, status: 'MISSING', detail: 'Audio absent — génération TTS non exécutée. Voix "Dr. Célestin Koffi" sélectionnée.', recoverable: true, estimatedFixTime: '~3 min' },
      { assetType: 'THUMBNAIL', present: false, status: 'MISSING', detail: 'Miniature absente — template non appliqué. Template "cyber-security" disponible.', recoverable: true, estimatedFixTime: '~2 min' },
      { assetType: 'VIDEO', present: false, status: 'MISSING', detail: 'Vidéo absente — dépend de l\'audio et de la miniature', recoverable: true, estimatedFixTime: '~5 min' },
      { assetType: 'METADATA', present: false, status: 'MISSING', detail: 'Métadonnées absentes — seront générées après la vidéo', recoverable: true, estimatedFixTime: '~1 min' },
    ],
    criticalBlocks: 4,
    totalBlocks: 5,
    recoveryCase: 'CASE_1',
    severity: 'CRITICAL',
    autoFixable: true,
  },
  {
    diagnosticId: 'DIAG-005',
    contentId: 'CONT-005',
    contentTitle: 'ESG & Finance Durable — Stress Tests',
    scannedAt: '2026-06-22T11:20:00Z',
    blocks: [
      { assetType: 'SCRIPT', present: true, status: 'OK', detail: 'Script généré, 1100 mots, SEO à optimiser', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'AUDIO', present: false, status: 'MISSING', detail: 'Audio absent — TTS non lancé', recoverable: true, estimatedFixTime: '~3 min' },
      { assetType: 'THUMBNAIL', present: false, status: 'MISSING', detail: 'Miniature absente', recoverable: true, estimatedFixTime: '~2 min' },
      { assetType: 'VIDEO', present: false, status: 'MISSING', detail: 'Vidéo absente', recoverable: true, estimatedFixTime: '~5 min' },
      { assetType: 'METADATA', present: false, status: 'MISSING', detail: 'Métadonnées absentes', recoverable: true, estimatedFixTime: '~1 min' },
    ],
    criticalBlocks: 4,
    totalBlocks: 5,
    recoveryCase: 'CASE_1',
    severity: 'CRITICAL',
    autoFixable: true,
  },
  {
    diagnosticId: 'DIAG-006',
    contentId: 'CONT-006',
    contentTitle: 'Gouvernance SFD — 7 Piliers BCEAO',
    scannedAt: '2026-06-22T11:25:00Z',
    blocks: [
      { assetType: 'SCRIPT', present: false, status: 'MISSING', detail: 'Script absent — sujet défini mais script non généré. Topic : Gouvernance SFD 7 piliers BCEAO.', recoverable: true, estimatedFixTime: '~2 min' },
      { assetType: 'AUDIO', present: false, status: 'MISSING', detail: 'Audio absent — dépend du script', recoverable: true, estimatedFixTime: '~3 min' },
      { assetType: 'THUMBNAIL', present: false, status: 'MISSING', detail: 'Miniature absente', recoverable: true, estimatedFixTime: '~2 min' },
      { assetType: 'VIDEO', present: false, status: 'MISSING', detail: 'Vidéo absente', recoverable: true, estimatedFixTime: '~5 min' },
      { assetType: 'METADATA', present: false, status: 'MISSING', detail: 'Métadonnées absentes', recoverable: true, estimatedFixTime: '~1 min' },
    ],
    criticalBlocks: 5,
    totalBlocks: 5,
    recoveryCase: 'CASE_1',
    severity: 'CRITICAL',
    autoFixable: true,
  },
  // ─── Scénario additionnel : Vidéo corrompue (CAS 4) ───
  {
    diagnosticId: 'DIAG-007',
    contentId: 'CONT-007',
    contentTitle: 'Protection Données Personnelles — RGPD & BCEAO 2026',
    scannedAt: '2026-06-22T10:55:00Z',
    blocks: [
      { assetType: 'SCRIPT', present: true, status: 'OK', detail: 'Script complet, 1350 mots', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'AUDIO', present: true, status: 'OK', detail: 'MP3 20min, qualité pro', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'THUMBNAIL', present: true, status: 'OK', detail: '1280x720, branding OK', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'VIDEO', present: true, status: 'CORRUPTED', detail: 'Fichier MP4 corrompu — checksum invalide, lecture impossible après 1min30s. Taille: 0 bytes effectifs. Reconstruction nécessaire.', recoverable: true, estimatedFixTime: '~6 min' },
      { assetType: 'METADATA', present: true, status: 'OK', detail: 'Métadonnées complètes', recoverable: true, estimatedFixTime: '0 min' },
    ],
    criticalBlocks: 1,
    totalBlocks: 5,
    recoveryCase: 'CASE_4',
    severity: 'CRITICAL',
    autoFixable: true,
  },
  // ─── Scénario additionnel : Métadonnées absentes (CAS 5) ───
  {
    diagnosticId: 'DIAG-008',
    contentId: 'CONT-008',
    contentTitle: 'Préparer son Conseil d\'Administration — Inspection COBAC',
    scannedAt: '2026-06-22T11:30:00Z',
    blocks: [
      { assetType: 'SCRIPT', present: true, status: 'OK', detail: 'Script complet, 980 mots', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'AUDIO', present: true, status: 'OK', detail: 'MP3 14min, qualité OK', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'THUMBNAIL', present: true, status: 'OK', detail: '1280x720, template OK', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'VIDEO', present: true, status: 'OK', detail: 'MP4 1080p, 198 MB, lecture OK', recoverable: true, estimatedFixTime: '0 min' },
      { assetType: 'METADATA', present: false, status: 'MISSING', detail: 'Titre, description, tags, hashtags et chapitres manquants. Génération automatique disponible.', recoverable: true, estimatedFixTime: '~1 min' },
    ],
    criticalBlocks: 1,
    totalBlocks: 5,
    recoveryCase: 'CASE_5',
    severity: 'HIGH',
    autoFixable: true,
  },
];

// ─── Actions Correctives — Historique d'exécution ───
export const RECOVERY_ACTIONS: RecoveryAction[] = [
  {
    actionId: 'ACT-001',
    diagnosticId: 'DIAG-003',
    caseType: 'CASE_3',
    assetType: 'VIDEO',
    actionName: 'Assemblage Vidéo FFmpeg',
    description: 'Lancer FFmpeg pour fusionner AUDIO.mp3 + THUMBNAIL.png → VIDEO.mp4 1080p',
    status: 'RESOLVED',
    startedAt: '2026-06-22T11:12:00Z',
    completedAt: '2026-06-22T11:15:48Z',
    durationSeconds: 228,
    success: true,
    retryCount: 0,
    maxRetries: 3,
    outputMessage: 'Vidéo assemblée avec succès. MP4 1080p, 276 MB, lecture complète vérifiée.',
  },
  {
    actionId: 'ACT-002',
    diagnosticId: 'DIAG-004',
    caseType: 'CASE_1',
    assetType: 'AUDIO',
    actionName: 'Génération Voix TTS ElevenLabs',
    description: 'Relancer ElevenLabs TTS avec profil "Dr. Célestin Koffi" sur le script CONT-004',
    status: 'IN_PROGRESS',
    startedAt: '2026-06-22T11:18:00Z',
    completedAt: null,
    durationSeconds: 0,
    success: false,
    retryCount: 0,
    maxRetries: 2,
    outputMessage: 'Génération en cours... 45%',
  },
  {
    actionId: 'ACT-003',
    diagnosticId: 'DIAG-007',
    caseType: 'CASE_4',
    assetType: 'VIDEO',
    actionName: 'Reconstruction Vidéo Corrompue',
    description: 'Réencoder le MP4 corrompu → nouveau fichier MP4 avec checksum valide',
    status: 'RESOLVED',
    startedAt: '2026-06-22T10:58:00Z',
    completedAt: '2026-06-22T11:03:15Z',
    durationSeconds: 315,
    success: true,
    retryCount: 1,
    maxRetries: 3,
    outputMessage: 'Reconstruction réussie après 1 retry. Nouveau MP4 1080p, 245 MB, checksum validé, lecture complète OK.',
  },
  {
    actionId: 'ACT-004',
    diagnosticId: 'DIAG-008',
    caseType: 'CASE_5',
    assetType: 'METADATA',
    actionName: 'Génération Métadonnées YouTube',
    description: 'Générer titre SEO, description, tags, hashtags, chapitres, CTA pour CONT-008',
    status: 'RESOLVED',
    startedAt: '2026-06-22T11:32:00Z',
    completedAt: '2026-06-22T11:33:10Z',
    durationSeconds: 70,
    success: true,
    retryCount: 0,
    maxRetries: 2,
    outputMessage: 'Métadonnées générées : titre 54 car, description 1180 car, 8 tags, 8 hashtags, 5 chapitres, CTA configuré.',
  },
  {
    actionId: 'ACT-005',
    diagnosticId: 'DIAG-004',
    caseType: 'CASE_1',
    assetType: 'THUMBNAIL',
    actionName: 'Génération Miniature',
    description: 'Appliquer template "cyber-security" → générer miniature 1280x720 PNG',
    status: 'OPEN',
    startedAt: '',
    completedAt: null,
    durationSeconds: 0,
    success: false,
    retryCount: 0,
    maxRetries: 2,
    outputMessage: 'En attente de la fin de la génération audio.',
  },
  {
    actionId: 'ACT-006',
    diagnosticId: 'DIAG-005',
    caseType: 'CASE_1',
    assetType: 'AUDIO',
    actionName: 'Génération Voix TTS par Lots',
    description: 'Production par lot : Audio CONT-005 + CONT-006 en séquence',
    status: 'OPEN',
    startedAt: '',
    completedAt: null,
    durationSeconds: 0,
    success: false,
    retryCount: 0,
    maxRetries: 2,
    outputMessage: 'En file d\'attente — priorité HIGH.',
  },
];

// ─── Logs d'Erreurs — Surveillance continue ───
export const RECOVERY_ERROR_LOGS: RecoveryErrorLog[] = [
  {
    logId: 'LOG-001',
    timestamp: '2026-06-22T10:52:00Z',
    level: 'CRITICAL',
    contentId: 'CONT-007',
    contentTitle: 'Protection Données Personnelles — RGPD & BCEAO 2026',
    errorType: 'VIDEO_CORRUPTED',
    errorMessage: 'Checksum MP4 invalide — fichier corrompu après assemblage FFmpeg. Crash à 1min30s de lecture. Taille rapportée: 0 bytes. Cause probable: interruption processus FFmpeg (SIGKILL).',
    correctiveAction: 'Reconstruction vidéo — réencodage complet avec nouveau checksum. Vérification lecture intégrale avant validation.',
    result: 'RESOLVED',
    resolvedAt: '2026-06-22T11:03:15Z',
    retryCount: 1,
  },
  {
    logId: 'LOG-002',
    timestamp: '2026-06-22T11:10:00Z',
    level: 'ERROR',
    contentId: 'CONT-003',
    contentTitle: 'Régulation FinTech UEMOA 2026-2027',
    errorType: 'VIDEO_MISSING',
    errorMessage: 'Fichier vidéo absent — assemblage FFmpeg non déclenché. État pipeline : METADATA_GENERATED mais VIDEO_ASSEMBLED jamais atteint. WebM placeholder vide (0 bytes).',
    correctiveAction: 'Déclencher assemblage FFmpeg — fusion Audio + Miniature → MP4 1080p. Forcer étape VIDEO_ASSEMBLED dans le pipeline.',
    result: 'RESOLVED',
    resolvedAt: '2026-06-22T11:15:48Z',
    retryCount: 0,
  },
  {
    logId: 'LOG-003',
    timestamp: '2026-06-22T11:15:00Z',
    level: 'CRITICAL',
    contentId: 'CONT-004',
    contentTitle: 'Cybersécurité Bancaire — COBAC 2027',
    errorType: 'MULTIPLE_MISSING',
    errorMessage: '4 assets manquants : Audio (TTS non exécuté), Miniature (template non appliqué), Vidéo (dépendances absentes), Métadonnées (non générées). Contenu bloqué à SCRIPT_VALIDATED.',
    correctiveAction: 'Relancer pipeline complet à partir de l\'étape VOICE_GENERATED. Exécution séquentielle : Audio → Miniature → Vidéo → Métadonnées.',
    result: 'IN_PROGRESS',
    resolvedAt: null,
    retryCount: 0,
  },
  {
    logId: 'LOG-004',
    timestamp: '2026-06-22T11:20:00Z',
    level: 'ERROR',
    contentId: 'CONT-005',
    contentTitle: 'ESG & Finance Durable — Stress Tests',
    errorType: 'MULTIPLE_MISSING',
    errorMessage: '4 assets manquants. Script OK mais pipeline arrêté à SCRIPT_GENERATED. Aucune génération downstream exécutée.',
    correctiveAction: 'Lancer production par lot avec CONT-006. File d\'attente priorité MEDIUM.',
    result: 'PENDING',
    resolvedAt: null,
    retryCount: 0,
  },
  {
    logId: 'LOG-005',
    timestamp: '2026-06-22T11:25:00Z',
    level: 'ERROR',
    contentId: 'CONT-006',
    contentTitle: 'Gouvernance SFD — 7 Piliers BCEAO',
    errorType: 'ALL_MISSING',
    errorMessage: '5 assets manquants. Contenu au stade TOPIC_DEFINED uniquement. Aucune production initiée.',
    correctiveAction: 'Générer script d\'abord, puis lancer pipeline complet.',
    result: 'PENDING',
    resolvedAt: null,
    retryCount: 0,
  },
  {
    logId: 'LOG-006',
    timestamp: '2026-06-22T09:45:00Z',
    level: 'WARNING',
    contentId: 'CONT-003',
    contentTitle: 'Régulation FinTech UEMOA 2026-2027',
    errorType: 'QC_BELOW_THRESHOLD',
    errorMessage: 'Score qualité 92/100 — en dessous du seuil 95/100. Titre SEO 63 car (limite), lisibilité miniature 88/100.',
    correctiveAction: 'Auto-correction suggérée : réduire titre, agrandir police miniature de 15%.',
    result: 'PENDING',
    resolvedAt: null,
    retryCount: 0,
  },
  {
    logId: 'LOG-007',
    timestamp: '2026-06-22T11:35:00Z',
    level: 'INFO',
    contentId: 'CONT-001',
    contentTitle: 'Réforme Ratio Solvabilité UEMOA 2026',
    errorType: 'SCAN_CLEAN',
    errorMessage: 'Scan complet terminé — 0 blocage détecté. Contenu READY pour publication.',
    correctiveAction: 'Aucune action nécessaire. Contenu disponible au téléchargement.',
    result: 'RESOLVED',
    resolvedAt: '2026-06-22T11:35:00Z',
    retryCount: 0,
  },
  {
    logId: 'LOG-008',
    timestamp: '2026-06-22T11:36:00Z',
    level: 'INFO',
    contentId: 'CONT-002',
    contentTitle: 'LBC/FT 2026 — 40 Recommandations GAFI',
    errorType: 'SCAN_CLEAN',
    errorMessage: 'Scan complet terminé — 0 blocage détecté. Contenu READY pour publication.',
    correctiveAction: 'Aucune action nécessaire.',
    result: 'RESOLVED',
    resolvedAt: '2026-06-22T11:36:00Z',
    retryCount: 0,
  },
  {
    logId: 'LOG-009',
    timestamp: '2026-06-22T11:30:00Z',
    level: 'ERROR',
    contentId: 'CONT-008',
    contentTitle: 'Préparer son Conseil d\'Administration — Inspection COBAC',
    errorType: 'METADATA_MISSING',
    errorMessage: 'Métadonnées YouTube absentes — titre, description, tags, hashtags, chapitres manquants. Vidéo et audio OK.',
    correctiveAction: 'Générer automatiquement les métadonnées à partir du script existant.',
    result: 'RESOLVED',
    resolvedAt: '2026-06-22T11:33:10Z',
    retryCount: 0,
  },
];

// ─── Recovery KPIs ───
export const RECOVERY_KPIS: RecoveryKPIs = {
  totalContentScanned: 8,
  contentWithBlocks: 5,
  contentClean: 3,
  totalBlocksDetected: 16,
  blocksResolved: 8,
  blocksPending: 8,
  autoFixSuccessRate: 87.5,
  avgRecoveryTime: '3min 12s',
  criticalIncidents: 3,
  criticalResolved: 1,
  totalErrorLogs: 9,
  unresolvedErrors: 3,
  lastFullScan: '2026-06-22T11:36:00Z',
  nextScheduledScan: '2026-06-22T12:00:00Z',
  systemHealth: 'YELLOW',
  uptimePercent: 99.7,
};

// ─── Guide d'Upload Manuel par CAS ───
export const RECOVERY_MANUAL_GUIDES: RecoveryManualGuide[] = [
  {
    guideId: 'GUIDE-001',
    contentId: 'CONT-001',
    contentTitle: 'Réforme Ratio Solvabilité UEMOA 2026',
    caseType: 'CASE_0',
    steps: [
      { step: 1, title: 'Télécharger VIDEO.mp4', description: 'Fichier MP4 1080p, 284 MB', icon: 'ri-movie-line', fileType: 'MP4', mandatory: true },
      { step: 2, title: 'Télécharger THUMBNAIL.png', description: 'Miniature 1280x720, 450 KB', icon: 'ri-image-line', fileType: 'PNG', mandatory: true },
      { step: 3, title: 'Copier DESCRIPTION.txt', description: 'Description YouTube optimisée SEO', icon: 'ri-file-text-line', fileType: 'TXT', mandatory: true },
      { step: 4, title: 'Copier TAGS.txt', description: 'Tags et hashtags pour YouTube', icon: 'ri-hashtag', fileType: 'TXT', mandatory: true },
      { step: 5, title: 'Copier CHAPTERS.txt', description: 'Chapitres avec timecodes', icon: 'ri-list-check', fileType: 'TXT', mandatory: false },
      { step: 6, title: 'Publier dans YouTube Studio', description: 'Vérifier confidentialité et publier', icon: 'ri-upload-cloud-2-line', fileType: 'ACTION', mandatory: true },
    ],
    readyFiles: 8,
    totalFiles: 8,
    estimatedUploadTime: '~5 min',
  },
  {
    guideId: 'GUIDE-003',
    contentId: 'CONT-003',
    contentTitle: 'Régulation FinTech UEMOA 2026-2027',
    caseType: 'CASE_3',
    steps: [
      { step: 1, title: 'Télécharger VIDEO.mp4', description: 'Vidéo assemblée après correction — 276 MB', icon: 'ri-movie-line', fileType: 'MP4', mandatory: true },
      { step: 2, title: 'Télécharger THUMBNAIL.png', description: 'Miniature 1280x720', icon: 'ri-image-line', fileType: 'PNG', mandatory: true },
      { step: 3, title: 'Copier DESCRIPTION.txt', description: 'Description YouTube', icon: 'ri-file-text-line', fileType: 'TXT', mandatory: true },
      { step: 4, title: 'Copier TAGS.txt', description: 'Tags et hashtags', icon: 'ri-hashtag', fileType: 'TXT', mandatory: true },
      { step: 5, title: 'Copier CHAPTERS.txt', description: 'Chapitres avec timecodes', icon: 'ri-list-check', fileType: 'TXT', mandatory: false },
      { step: 6, title: 'Publier dans YouTube Studio', description: 'Vérifier et publier', icon: 'ri-upload-cloud-2-line', fileType: 'ACTION', mandatory: true },
    ],
    readyFiles: 8,
    totalFiles: 8,
    estimatedUploadTime: '~5 min',
  },
];

// ─── Recovery System Status ───
export const RECOVERY_SYSTEM_STATUS = {
  version: '1.0.0',
  codename: 'Hybrid Recovery Engine',
  mode: 'MODE_A',
  oauthStatus: 'DISCONNECTED' as const,
  autoScanEnabled: true,
  autoFixEnabled: true,
  scanIntervalMinutes: 15,
  maxRetriesPerAsset: 3,
  qualityThreshold: 95,
  deployedAt: '2026-06-22T10:30:00Z',
};





