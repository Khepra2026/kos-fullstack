// ─── KOS YouTube System Scanner — Scan Complet + Lancement Automatique ───
// Scanner exhaustif de l'écosystème YouTube KHEPRA EXPERTS
// 21 Juin 2026

export interface ScanComponent {
  componentId: string;
  name: string;
  layer: 'orchestration' | 'database' | 'automation' | 'video_production' | 'ai_audio' | 'storage' | 'security' | 'pipeline';
  icon: string;
  status: 'optimal' | 'healthy' | 'warning' | 'degraded' | 'offline' | 'error';
  healthScore: number;
  lastChecked: string;
  details: string;
  metrics: { label: string; value: string; status: 'ok' | 'warning' | 'alert' }[];
}

export interface ScanLayerSummary {
  layerId: string;
  name: string;
  icon: string;
  componentCount: number;
  healthyCount: number;
  warningCount: number;
  errorCount: number;
  avgHealthScore: number;
  status: 'optimal' | 'healthy' | 'warning' | 'degraded' | 'offline' | 'error';
  components: ScanComponent[];
}

export interface ProductionPipelineHealth {
  pipelineId: string;
  stage: string;
  icon: string;
  itemsCount: number;
  readyCount: number;
  blockedCount: number;
  errorCount: number;
  status: 'flowing' | 'partial' | 'blocked' | 'empty';
}

export interface SystemScanResult {
  scanId: string;
  scanTimestamp: string;
  duration: string;
  totalComponents: number;
  healthyComponents: number;
  warningComponents: number;
  errorComponents: number;
  overallHealth: number;
  readyForProduction: boolean;
  blockersFound: number;
  layers: ScanLayerSummary[];
  pipeline: ProductionPipelineHealth[];
  recommendations: string[];
}

export interface AutoProductionJob {
  jobId: string;
  topic: string;
  stage: 'queued' | 'script_generating' | 'script_complete' | 'voice_generating' | 'voice_complete' | 'video_assembling' | 'video_complete' | 'seo_applying' | 'seo_complete' | 'publishing' | 'published' | 'failed';
  progress: number;
  startedAt: string;
  estimatedCompletion: string;
  logs: { timestamp: string; message: string; level: 'info' | 'success' | 'warning' | 'error' }[];
}

// ─── LAYER 1 — ORCHESTRATION ───
const LAYER_1_ORCHESTRATION: ScanComponent[] = [
  {
    componentId: 'SCAN-ORCH-001', name: 'KOS YouTube Orchestrator™', layer: 'orchestration',
    icon: 'ri-git-branch-line', status: 'optimal', healthScore: 99.2,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Orchestrateur central — tous les workflows actifs, files d\'attente normales, aucun processus bloqué.',
    metrics: [
      { label: 'Workflows Actifs', value: '9/9', status: 'ok' },
      { label: 'File d\'attente', value: '3 items', status: 'ok' },
      { label: 'Rate Limit', value: '24%', status: 'ok' },
      { label: 'Uptime 24h', value: '100%', status: 'ok' },
    ],
  },
  {
    componentId: 'SCAN-ORCH-002', name: 'KOS Workflow Scheduler™', layer: 'orchestration',
    icon: 'ri-time-line', status: 'optimal', healthScore: 100,
    lastChecked: '2026-06-21T12:00:00Z',
    details: '5 cron jobs actifs, tous exécutés à l\'heure prévue. Aucune alerte.',
    metrics: [
      { label: 'Cron Jobs', value: '5/5', status: 'ok' },
      { label: 'Dernière Exéc.', value: '11:30', status: 'ok' },
      { label: 'Prochaine Exéc.', value: '14:00', status: 'ok' },
      { label: 'Précision', value: '+/- 2s', status: 'ok' },
    ],
  },
];

// ─── LAYER 2 — DATABASE ───
const LAYER_2_DATABASE: ScanComponent[] = [
  {
    componentId: 'SCAN-DB-001', name: 'PostgreSQL — kos_youtube_workflows', layer: 'database',
    icon: 'ri-database-2-line', status: 'optimal', healthScore: 100,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Table workflows : 9 enregistrements, index optimisés, aucune corruption.',
    metrics: [
      { label: 'Lignes', value: '9', status: 'ok' },
      { label: 'Taille', value: '48 KB', status: 'ok' },
      { label: 'Index', value: '2 OK', status: 'ok' },
      { label: 'Sauvegarde', value: '02:00 UTC', status: 'ok' },
    ],
  },
  {
    componentId: 'SCAN-DB-002', name: 'PostgreSQL — kos_youtube_content_pipeline', layer: 'database',
    icon: 'ri-database-2-line', status: 'optimal', healthScore: 98.5,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Table pipeline : 28 items, 8 en attente, 2 bloqués en review.',
    metrics: [
      { label: 'Total Items', value: '28', status: 'ok' },
      { label: 'En Attente', value: '8', status: 'ok' },
      { label: 'Bloqués', value: '2', status: 'warning' },
      { label: 'Taille', value: '156 KB', status: 'ok' },
    ],
  },
  {
    componentId: 'SCAN-DB-003', name: 'PostgreSQL — media_assets', layer: 'database',
    icon: 'ri-database-2-line', status: 'optimal', healthScore: 99.1,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Table assets media : 124 enregistrements, scripts + audio + vidéo.',
    metrics: [
      { label: 'Scripts', value: '48', status: 'ok' },
      { label: 'Audio', value: '37', status: 'ok' },
      { label: 'Vidéo', value: '22', status: 'ok' },
      { label: 'Miniatures', value: '17', status: 'ok' },
    ],
  },
  {
    componentId: 'SCAN-DB-004', name: 'PostgreSQL — social_api_tokens', layer: 'database',
    icon: 'ri-database-2-line', status: 'warning', healthScore: 85.0,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Token YouTube OAuth — valide mais expire dans 45 minutes. Rotation automatique prévue.',
    metrics: [
      { label: 'Tokens', value: '8', status: 'ok' },
      { label: 'Validation', value: 'OK', status: 'ok' },
      { label: 'Expiration', value: '45 min', status: 'warning' },
      { label: 'Rotation', value: 'Auto', status: 'ok' },
    ],
  },
];

// ─── LAYER 3 — AUTOMATION ───
const LAYER_3_AUTOMATION: ScanComponent[] = [
  {
    componentId: 'SCAN-AUTO-001', name: 'kos-youtube-publisher (Edge Function)', layer: 'automation',
    icon: 'ri-cloud-line', status: 'optimal', healthScore: 99.9,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Edge Function YouTube unifiée (Publisher + OAuth) — répond en 85ms. Token refresh automatique OK. 14 actions disponibles.',
    metrics: [
      { label: 'Uptime', value: '99.99%', status: 'ok' },
      { label: 'Latence', value: '85ms', status: 'ok' },
      { label: 'Erreurs 24h', value: '0', status: 'ok' },
      { label: 'Quota', value: '12%', status: 'ok' },
    ],
  },
  {
    componentId: 'SCAN-AUTO-002', name: 'kos-social-content-generator (Edge Function)', layer: 'automation',
    icon: 'ri-cloud-line', status: 'optimal', healthScore: 98.7,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Edge Function Social Content unifiée (Content + Schedule + Community) — répond en 210ms. 5 actions disponibles.',
    metrics: [
      { label: 'Uptime', value: '99.97%', status: 'ok' },
      { label: 'Latence', value: '210ms', status: 'ok' },
      { label: 'Publis 24h', value: '3', status: 'ok' },
      { label: 'Erreurs 24h', value: '0', status: 'ok' },
    ],
  },
  {
    componentId: 'SCAN-AUTO-003', name: 'kos-content-generate (Edge Function)', layer: 'automation',
    icon: 'ri-cloud-line', status: 'optimal', healthScore: 99.8,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Edge Function Content Generator — répond en 340ms. 12 générations aujourd\'hui.',
    metrics: [
      { label: 'Uptime', value: '99.98%', status: 'ok' },
      { label: 'Latence', value: '340ms', status: 'ok' },
      { label: 'Générations 24h', value: '12', status: 'ok' },
      { label: 'Score Qualité', value: '9.1', status: 'ok' },
    ],
  },
  {
    componentId: 'SCAN-AUTO-004', name: 'kos-studio-media-generator (Edge Function)', layer: 'automation',
    icon: 'ri-cloud-line', status: 'healthy', healthScore: 96.2,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Edge Function Studio Média — répond en 520ms. 4 scripts générés aujourd\'hui.',
    metrics: [
      { label: 'Uptime', value: '99.95%', status: 'ok' },
      { label: 'Latence', value: '520ms', status: 'ok' },
      { label: 'Scripts 24h', value: '4', status: 'ok' },
      { label: 'Timeout Rate', value: '0.3%', status: 'warning' },
    ],
  },
  {
    componentId: 'SCAN-AUTO-005', name: 'kos-automaton-engine (Edge Function)', layer: 'automation',
    icon: 'ri-cloud-line', status: 'optimal', healthScore: 99.9,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Edge Function Automaton — répond en 95ms. Moteur NLP actif. Orchestrateur central du pipeline autonome.',
    metrics: [
      { label: 'Uptime', value: '99.99%', status: 'ok' },
      { label: 'Latence', value: '95ms', status: 'ok' },
      { label: 'Analyses 24h', value: '214', status: 'ok' },
      { label: 'Précision', value: '96.2%', status: 'ok' },
    ],
  },
];

// ─── LAYER 4 — VIDEO PRODUCTION ───
const LAYER_4_VIDEO: ScanComponent[] = [
  {
    componentId: 'SCAN-VID-001', name: 'Remotion Engine', layer: 'video_production',
    icon: 'ri-movie-line', status: 'healthy', healthScore: 92.5,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Remotion fonctionnel — 6 templates disponibles. Dernier rendu : VID-003 (24min, OK).',
    metrics: [
      { label: 'Templates', value: '6/6', status: 'ok' },
      { label: 'Dernier Rendu', value: 'OK 24min', status: 'ok' },
      { label: 'GPU Memory', value: '78%', status: 'warning' },
      { label: 'Files Attente', value: '2', status: 'ok' },
    ],
  },
  {
    componentId: 'SCAN-VID-002', name: 'FFmpeg Engine', layer: 'video_production',
    icon: 'ri-scissors-line', status: 'optimal', healthScore: 98.0,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'FFmpeg OK — compression H.264 active, normalisation LUFS calibrée.',
    metrics: [
      { label: 'Version', value: '7.0', status: 'ok' },
      { label: 'Sous-titres', value: 'OK', status: 'ok' },
      { label: 'Compression', value: 'H.264 NVENC', status: 'ok' },
      { label: 'Audio LUFS', value: '-16 LUFS', status: 'ok' },
    ],
  },
  {
    componentId: 'SCAN-VID-003', name: 'Chromium Headless Engine', layer: 'video_production',
    icon: 'ri-image-line', status: 'healthy', healthScore: 91.0,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Chromium Headless — fonctionnel. Miniatures générées en 1.2s.',
    metrics: [
      { label: 'Version', value: 'Chr 130', status: 'ok' },
      { label: 'Miniature Gen', value: '1.2s', status: 'ok' },
      { label: 'Memory', value: '420 MB', status: 'warning' },
      { label: 'Files Attente', value: '0', status: 'ok' },
    ],
  },
  {
    componentId: 'SCAN-VID-004', name: 'KOS Thumbnail Designer', layer: 'video_production',
    icon: 'ri-image-edit-line', status: 'optimal', healthScore: 97.5,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Designer miniature — 847 miniatures générées, template KHEPRA appliqué.',
    metrics: [
      { label: 'Générées', value: '847', status: 'ok' },
      { label: 'CTR Moyen', value: '8.7%', status: 'ok' },
      { label: 'Templates', value: '6 actifs', status: 'ok' },
      { label: 'AB Tests', value: '3 en cours', status: 'ok' },
    ],
  },
];

// ─── LAYER 5 — AI AUDIO ───
const LAYER_5_AUDIO: ScanComponent[] = [
  {
    componentId: 'SCAN-AUD-001', name: 'KOS Voice AI Engine', layer: 'ai_audio',
    icon: 'ri-mic-line', status: 'optimal', healthScore: 97.8,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Voice AI Studio — 6 profils vocaux actifs, génération FR/EN OK.',
    metrics: [
      { label: 'Profils', value: '6/6', status: 'ok' },
      { label: 'Voix Générées', value: '847', status: 'ok' },
      { label: 'Qualité Moy.', value: '94/100', status: 'ok' },
      { label: 'Temps Gen', value: '3min42s', status: 'ok' },
    ],
  },
  {
    componentId: 'SCAN-AUD-002', name: 'Voice Profile Selector', layer: 'ai_audio',
    icon: 'ri-user-voice-line', status: 'optimal', healthScore: 100,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Sélecteur automatique — mapping contenu → profil vocal parfait.',
    metrics: [
      { label: 'Mappings', value: '24 règles', status: 'ok' },
      { label: 'Précision', value: '99.9%', status: 'ok' },
      { label: 'Erreurs', value: '0', status: 'ok' },
      { label: 'Latence', value: '45ms', status: 'ok' },
    ],
  },
];

// ─── LAYER 6 — STORAGE ───
const LAYER_6_STORAGE: ScanComponent[] = [
  {
    componentId: 'SCAN-STO-001', name: 'Supabase Storage — Assets Média', layer: 'storage',
    icon: 'ri-hard-drive-2-line', status: 'optimal', healthScore: 99.5,
    lastChecked: '2026-06-21T12:00:00Z',
    details: '7 buckets actifs, versioning OK, réplication multi-région active.',
    metrics: [
      { label: 'Buckets', value: '7/7 OK', status: 'ok' },
      { label: 'Espace', value: '42.3 GB', status: 'ok' },
      { label: 'Versioning', value: 'ON', status: 'ok' },
      { label: 'Réplication', value: '2 régions', status: 'ok' },
    ],
  },
  {
    componentId: 'SCAN-STO-002', name: 'KOS Backup Agent', layer: 'storage',
    icon: 'ri-save-line', status: 'optimal', healthScore: 100,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Sauvegardes automatiques — dernière sauvegarde 02:00 UTC, OK.',
    metrics: [
      { label: 'Dernière Backup', value: '02:00 UTC', status: 'ok' },
      { label: 'Rétention', value: '90 jours', status: 'ok' },
      { label: 'Taille Backup', value: '1.8 GB', status: 'ok' },
      { label: 'Restauration', value: '< 5min', status: 'ok' },
    ],
  },
];

// ─── LAYER 7 — SECURITY ───
const LAYER_7_SECURITY: ScanComponent[] = [
  {
    componentId: 'SCAN-SEC-001', name: 'KOS Security Scanner', layer: 'security',
    icon: 'ri-shield-check-line', status: 'optimal', healthScore: 99.4,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Scanner sécurité — dernier scan 02:00 UTC. 0 vulnérabilités critiques.',
    metrics: [
      { label: 'Score', value: '99.4%', status: 'ok' },
      { label: 'Dernier Scan', value: '02:00 UTC', status: 'ok' },
      { label: 'Vulnérabilités', value: '0 critique', status: 'ok' },
      { label: 'OWASP Top 10', value: 'OK', status: 'ok' },
    ],
  },
  {
    componentId: 'SCAN-SEC-002', name: 'KOS Token Rotator', layer: 'security',
    icon: 'ri-key-line', status: 'healthy', healthScore: 90.0,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Rotation tokens — token OAuth expire dans 45min, rotation auto prévue.',
    metrics: [
      { label: 'Token OAuth', value: '45min rest.', status: 'warning' },
      { label: 'Token API', value: '72j rest.', status: 'ok' },
      { label: 'Rotations 30j', value: '14', status: 'ok' },
      { label: 'Failures', value: '0', status: 'ok' },
    ],
  },
  {
    componentId: 'SCAN-SEC-003', name: 'KOS Anomaly Detector', layer: 'security',
    icon: 'ri-alert-line', status: 'optimal', healthScore: 99.8,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Détecteur d\'anomalies — 0 anomalie critique 24h. 1 warning (bulk publish légitime).',
    metrics: [
      { label: 'Anomalies 24h', value: '0 critique', status: 'ok' },
      { label: 'Warnings 24h', value: '1', status: 'ok' },
      { label: 'Faux Positifs', value: '0.02%', status: 'ok' },
      { label: 'Temps Détection', value: '< 2s', status: 'ok' },
    ],
  },
  {
    componentId: 'SCAN-SEC-004', name: 'KOS Audit Trail Agent', layer: 'security',
    icon: 'ri-file-list-line', status: 'optimal', healthScore: 100,
    lastChecked: '2026-06-21T12:00:00Z',
    details: 'Piste d\'audit — 312 événements journalisés, aucune perte.',
    metrics: [
      { label: 'Événements', value: '312', status: 'ok' },
      { label: 'Intégrité', value: '100%', status: 'ok' },
      { label: 'Rétention', value: '365 jours', status: 'ok' },
      { label: 'Conformité', value: 'ISO 27001', status: 'ok' },
    ],
  },
];

// ─── PIPELINE HEALTH ───
export const PIPELINE_HEALTH: ProductionPipelineHealth[] = [
  {
    pipelineId: 'PIPE-IDEAS', stage: 'Idées', icon: 'ri-lightbulb-line',
    itemsCount: 10, readyCount: 10, blockedCount: 0, errorCount: 0,
    status: 'flowing',
  },
  {
    pipelineId: 'PIPE-SCRIPTS', stage: 'Scripts', icon: 'ri-file-text-line',
    itemsCount: 8, readyCount: 5, blockedCount: 2, errorCount: 1,
    status: 'partial',
  },
  {
    pipelineId: 'PIPE-VOICES', stage: 'Voix IA', icon: 'ri-mic-line',
    itemsCount: 6, readyCount: 4, blockedCount: 1, errorCount: 1,
    status: 'partial',
  },
  {
    pipelineId: 'PIPE-VIDEOS', stage: 'Vidéos', icon: 'ri-movie-line',
    itemsCount: 5, readyCount: 4, blockedCount: 1, errorCount: 0,
    status: 'flowing',
  },
  {
    pipelineId: 'PIPE-SEO', stage: 'SEO', icon: 'ri-search-eye-line',
    itemsCount: 4, readyCount: 3, blockedCount: 0, errorCount: 1,
    status: 'partial',
  },
  {
    pipelineId: 'PIPE-PUBLISH', stage: 'Publication', icon: 'ri-upload-cloud-line',
    itemsCount: 3, readyCount: 3, blockedCount: 0, errorCount: 0,
    status: 'flowing',
  },
  {
    pipelineId: 'PIPE-ANALYTICS', stage: 'Analytics', icon: 'ri-line-chart-line',
    itemsCount: 7, readyCount: 7, blockedCount: 0, errorCount: 0,
    status: 'flowing',
  },
  {
    pipelineId: 'PIPE-OPTIMIZE', stage: 'Optimisation', icon: 'ri-loop-left-line',
    itemsCount: 8, readyCount: 5, blockedCount: 2, errorCount: 1,
    status: 'partial',
  },
];

// ─── SYSTEM SCAN RESULT ───
export const SYSTEM_SCAN_RESULT: SystemScanResult = {
  scanId: 'SCAN-20260621-1200',
  scanTimestamp: '2026-06-21T12:00:00Z',
  duration: '4.2 secondes',
  totalComponents: 26,
  healthyComponents: 23,
  warningComponents: 3,
  errorComponents: 0,
  overallHealth: 97.2,
  readyForProduction: true,
  blockersFound: 0,
  layers: [
    {
      layerId: 'orchestration', name: 'Orchestration', icon: 'ri-git-branch-line',
      componentCount: 2, healthyCount: 2, warningCount: 0, errorCount: 0,
      avgHealthScore: 99.6, status: 'optimal', components: LAYER_1_ORCHESTRATION,
    },
    {
      layerId: 'database', name: 'Base de Données', icon: 'ri-database-2-line',
      componentCount: 4, healthyCount: 3, warningCount: 1, errorCount: 0,
      avgHealthScore: 95.7, status: 'healthy', components: LAYER_2_DATABASE,
    },
    {
      layerId: 'automation', name: 'Automatisation (Edge Functions)', icon: 'ri-cloud-line',
      componentCount: 5, healthyCount: 5, warningCount: 0, errorCount: 0,
      avgHealthScore: 99.0, status: 'optimal', components: LAYER_3_AUTOMATION,
    },
    {
      layerId: 'video_production', name: 'Production Vidéo', icon: 'ri-movie-line',
      componentCount: 4, healthyCount: 4, warningCount: 0, errorCount: 0,
      avgHealthScore: 94.8, status: 'healthy', components: LAYER_4_VIDEO,
    },
    {
      layerId: 'ai_audio', name: 'IA Audio', icon: 'ri-mic-line',
      componentCount: 2, healthyCount: 2, warningCount: 0, errorCount: 0,
      avgHealthScore: 98.9, status: 'optimal', components: LAYER_5_AUDIO,
    },
    {
      layerId: 'storage', name: 'Stockage', icon: 'ri-hard-drive-2-line',
      componentCount: 2, healthyCount: 2, warningCount: 0, errorCount: 0,
      avgHealthScore: 99.8, status: 'optimal', components: LAYER_6_STORAGE,
    },
    {
      layerId: 'security', name: 'Sécurité', icon: 'ri-shield-check-line',
      componentCount: 4, healthyCount: 3, warningCount: 1, errorCount: 0,
      avgHealthScore: 97.3, status: 'healthy', components: LAYER_7_SECURITY,
    },
  ],
  pipeline: PIPELINE_HEALTH,
  recommendations: [
    'Token OAuth expire dans 45 minutes — rotation automatique programmée, aucune action requise',
    '2 items bloqués dans le pipeline Scripts (SCR-007 draft, SCR-006 en review) — relancer validation',
    '1 item bloqué pipeline Voix (VOX-003) — relancer normalisation',
    'GPU Memory Remotion à 78% — surveiller pendant prochain rendu',
    'Activer production parallèle pour Playlist "FinTech Africa Decoded" — 0 vidéo produite',
  ],
};

// ─── AUTO PRODUCTION JOBS — Simulation temps réel ───
export const AUTO_PRODUCTION_JOBS: AutoProductionJob[] = [
  {
    jobId: 'JOB-001',
    topic: 'LBC/FT 2026 — Nouvelles Exigences GAFI : Guide Complet',
    stage: 'published',
    progress: 100,
    startedAt: '2026-06-21T07:30:00Z',
    estimatedCompletion: '2026-06-21T08:32:00Z',
    logs: [
      { timestamp: '2026-06-21T07:30:00Z', message: 'Scan tendances — Sujet LBC/FT GAFI identifié (score SEO 96, viralité 88)', level: 'info' },
      { timestamp: '2026-06-21T07:32:00Z', message: 'Génération script — Framework Big Four activé', level: 'info' },
      { timestamp: '2026-06-21T07:38:00Z', message: 'Script terminé — 9.6/10 qualité, 14 min estimé', level: 'success' },
      { timestamp: '2026-06-21T07:40:00Z', message: 'Voix IA — Profil Dr. Célestin Koffi sélectionné', level: 'info' },
      { timestamp: '2026-06-21T07:56:00Z', message: 'Voice-over généré — Fluidité 96, Clarté 94', level: 'success' },
      { timestamp: '2026-06-21T08:02:00Z', message: 'Assemblage vidéo — Template Analyse Réglementaire', level: 'info' },
      { timestamp: '2026-06-21T08:15:00Z', message: 'Vidéo assemblée — 4K, sous-titres OK, miniature générée', level: 'success' },
      { timestamp: '2026-06-21T08:18:00Z', message: 'SEO YouTube — Titre, description, 10 hashtags, 5 chapitres', level: 'success' },
      { timestamp: '2026-06-21T08:30:00Z', message: 'Upload YouTube — OAuth validé, upload 1080p', level: 'info' },
      { timestamp: '2026-06-21T08:32:00Z', message: 'PUBLIÉ — YouTube ID: dQw4w9WgXcQ. Playlist: Conformité Réglementaire', level: 'success' },
      { timestamp: '2026-06-21T08:33:00Z', message: 'Auto-déclenchements : Short 60s + LinkedIn + Blog + Newsletter', level: 'success' },
    ],
  },
  {
    jobId: 'JOB-002',
    topic: 'Régulation FinTech UEMOA 2026-2027 : Analyse Complète',
    stage: 'published',
    progress: 100,
    startedAt: '2026-06-21T09:00:00Z',
    estimatedCompletion: '2026-06-21T11:00:00Z',
    logs: [
      { timestamp: '2026-06-21T09:00:00Z', message: 'Scan tendances — Sujet FinTech UEMOA identifié (score SEO 94, viralité 82)', level: 'info' },
      { timestamp: '2026-06-21T09:06:00Z', message: 'Script podcast — 24 min, 15 sources, ton conversation experte', level: 'success' },
      { timestamp: '2026-06-21T09:25:00Z', message: 'Voice-over — Profil Dr. Amadou Sow, 24min30s', level: 'success' },
      { timestamp: '2026-06-21T10:00:00Z', message: 'Vidéo assemblée — 1080p, infographies FinTech, timeline réglementaire', level: 'success' },
      { timestamp: '2026-06-21T10:15:00Z', message: 'SEO — CTR prédit 11.2%, watch time 18min45s estimé', level: 'success' },
      { timestamp: '2026-06-21T10:58:00Z', message: 'Upload OK — Programmation 11:00', level: 'info' },
      { timestamp: '2026-06-21T11:00:00Z', message: 'PUBLIÉ — YouTube ID: aBcDeFgHiJk. Playlist: FinTech & Innovation', level: 'success' },
      { timestamp: '2026-06-21T11:01:00Z', message: 'Auto-déclenchements : Short + LinkedIn(3) + Blog + Newsletter + Série "FinTech Africa Decoded"', level: 'success' },
    ],
  },
  {
    jobId: 'JOB-003',
    topic: 'Cybersécurité Bancaire — Anticiper la Directive COBAC 2027',
    stage: 'video_assembling',
    progress: 62,
    startedAt: '2026-06-21T11:15:00Z',
    estimatedCompletion: '2026-06-21T13:45:00Z',
    logs: [
      { timestamp: '2026-06-21T11:15:00Z', message: 'Scan tendances — Cybersécurité COBAC identifié (score SEO 91, viralité 74)', level: 'info' },
      { timestamp: '2026-06-21T11:22:00Z', message: 'Script capsule — 10 min, ton alerte stratégique, 9.5/10', level: 'success' },
      { timestamp: '2026-06-21T11:42:00Z', message: 'Voice-over — Profil Fatoumata Diallo, 10min18s, Fluidité 93', level: 'success' },
      { timestamp: '2026-06-21T12:10:00Z', message: 'Assemblage vidéo en cours — Template Analyse Réglementaire, 62%', level: 'info' },
    ],
  },
  {
    jobId: 'JOB-004',
    topic: 'Stress Tests Climatiques Pilier 2 — Implications BCEAO/COBAC',
    stage: 'script_complete',
    progress: 28,
    startedAt: '2026-06-21T12:00:00Z',
    estimatedCompletion: '2026-06-21T16:30:00Z',
    logs: [
      { timestamp: '2026-06-21T12:00:00Z', message: 'Scan tendances — Stress Tests Climatiques identifié (score SEO 88, viralité 65)', level: 'info' },
      { timestamp: '2026-06-21T12:15:00Z', message: 'Script analyse — 18 min, 14 sources, 9.1/10', level: 'success' },
      { timestamp: '2026-06-21T12:20:00Z', message: 'En attente — Voice-over programmé (profil Ibrahim Kone)', level: 'info' },
    ],
  },
  {
    jobId: 'JOB-005',
    topic: 'Open Banking Afrique Francophone — Opportunités et Défis 2027',
    stage: 'queued',
    progress: 0,
    startedAt: '2026-06-21T12:05:00Z',
    estimatedCompletion: '2026-06-22T08:00:00Z',
    logs: [
      { timestamp: '2026-06-21T12:05:00Z', message: 'Sujet détecté automatiquement — Mot-clé "open banking afrique" +45%', level: 'info' },
      { timestamp: '2026-06-21T12:05:00Z', message: 'En file d\'attente — Démarrage prévu 15:00', level: 'info' },
    ],
  },
];

export const PRODUCTION_QUEUE_COUNT = 3;
export const PRODUCTION_ESTIMATED_TIME = '4h 15min (3 jobs actifs)';



