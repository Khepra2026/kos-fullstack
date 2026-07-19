// ─── KOS YouTube Production Pipeline — Master Prompt 2 ───
// Automatisation Intégrale de la Production et Publication YouTube KHEPRA EXPERTS
// Idée → Script → Voix → Vidéo → Thumbnail → SEO → Publication → Analyse → Optimisation
// Consortium PwC · Deloitte · EY · KPMG — 21 Juin 2026

export interface PipelineWorkflow {
  workflowId: string;
  name: string;
  icon: string;
  order: number;
  description: string;
  status: 'active' | 'optimizing' | 'idle';
  executionCount: number;
  successRate: number;
  avgDuration: string;
  lastRun: string;
  category: 'intelligence' | 'creation' | 'production' | 'distribution' | 'analysis' | 'optimization';
}

export interface StrategicTrend {
  trendId: string;
  category: string;
  keyword: string;
  volume: number;
  trend: 'rising' | 'stable' | 'declining';
  seoScore: number;
  geoScore: number;
  viralityScore: number;
  expertiseScore: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  discoveredAt: string;
}

export interface ScriptGeneration {
  scriptId: string;
  title: string;
  type: 'podcast' | 'capsule' | 'formation' | 'analyse' | 'interview_simulee';
  duration: string;
  tone: string;
  references: number;
  seoKeywords: string[];
  qualityScore: number;
  status: 'draft' | 'reviewed' | 'approved' | 'rejected';
  createdAt: string;
}

export interface VoiceGeneration {
  voiceId: string;
  scriptId: string;
  title: string;
  voiceProfile: string;
  duration: string;
  language: string;
  qualityChecks: { fluidity: number; clarity: number; rate: number; intelligibility: number };
  overallScore: number;
  status: 'generated' | 'corrected' | 'normalized' | 'exported';
  createdAt: string;
}

export interface VideoProduction {
  videoId: string;
  title: string;
  scriptId: string;
  voiceId: string;
  template: string;
  resolution: string;
  duration: string;
  components: string[];
  exportStatus: 'rendering' | 'exported_1080p' | 'exported_1440p' | 'exported_4k' | 'complete';
  thumbnailGenerated: boolean;
  subtitlesGenerated: boolean;
  qualityScore: number;
  createdAt: string;
}

export interface YoutubeSEO {
  seoId: string;
  videoId: string;
  title: string;
  description: string;
  hashtags: string[];
  keywords: string[];
  chapters: { time: string; title: string }[];
  ctrPrediction: number;
  watchTimePrediction: string;
  engagementPrediction: number;
  status: 'draft' | 'optimized' | 'applied';
}

export interface YoutubePublication {
  publicationId: string;
  videoId: string;
  title: string;
  publishedAt: string;
  privacyStatus: 'public' | 'unlisted' | 'private';
  playlistName: string;
  endScreen: boolean;
  cards: number;
  pinnedComment: string;
  status: 'uploaded' | 'processing' | 'published' | 'failed';
}

export interface VideoAnalytics {
  analyticsId: string;
  videoId: string;
  title: string;
  views: number;
  ctr: number;
  watchTime: string;
  subscribersGained: number;
  engagement: number;
  rpm: number;
  performanceScore: number;
  seoScore: number;
  geoScore: number;
  authorityScore: number;
  capturedAt: string;
}

export interface EditorialCalendarEntry {
  entryId: string;
  weekNumber: number;
  day: string;
  date: string;
  timeSlot: string;
  title: string;
  type: 'podcast' | 'capsule' | 'formation' | 'analyse' | 'interview_simulee' | 'short';
  stage: 'planned' | 'script_ready' | 'voice_ready' | 'video_ready' | 'seo_ready' | 'scheduled' | 'published';
  channel: 'youtube' | 'linkedin' | 'both';
  priority: 'critical' | 'high' | 'medium' | 'low';
  expectedViews: number;
  expectedCTR: number;
  assignedAgent: string;
  estimatedDuration: string;
}

export interface OptimizationAction {
  actionId: string;
  trigger: string;
  detection: string;
  action: string;
  impact: string;
  automated: boolean;
  status: 'detected' | 'scheduled' | 'executed' | 'verified';
  createdAt: string;
}

// ─── GLOBAL KPI ───
export const PRODUCTION_KPIS = {
  productionTime: { value: '2h 47min', target: '< 3h', unit: 'par vidéo', trend: '-12% vs M-1', status: 'on_track' },
  automationRate: { value: '94.2%', target: '≥ 95%', unit: '', trend: '+2.1pp vs M-1', status: 'near_target' },
  publicationRate: { value: '3.4', target: '≥ 3', unit: 'vidéos/semaine', trend: '+0.4 vs M-1', status: 'exceeding' },
  errorRate: { value: '3.1%', target: '< 3%', unit: '', trend: '-0.8pp vs M-1', status: 'near_target' },
  avgCTR: { value: '8.7%', target: '≥ 8%', unit: '', trend: '+0.5pp vs M-1', status: 'exceeding' },
  avgWatchTime: { value: '7min 24s', target: '≥ 6min', unit: '', trend: '+42s vs M-1', status: 'exceeding' },
  subscriberGrowth: { value: '+342', target: '+300', unit: '/mois', trend: '+58 vs M-1', status: 'exceeding' },
  brandAuthority: { value: '87/100', target: '≥ 85', unit: '', trend: '+3 vs M-1', status: 'exceeding' },
};

// ─── WORKFLOW 1 — VEILLE STRATÉGIQUE ───
export const STRATEGIC_TRENDS: StrategicTrend[] = [
  {
    trendId: 'TR-001', category: 'Réglementaire BCEAO', keyword: 'ratio solvabilité UEMOA 2026',
    volume: 2840, trend: 'rising', seoScore: 92, geoScore: 88, viralityScore: 76, expertiseScore: 95,
    priority: 'critical', discoveredAt: '2026-06-21T03:00:00Z',
  },
  {
    trendId: 'TR-002', category: 'FinTech', keyword: 'régulation fintech UEMOA 2026-2027',
    volume: 3200, trend: 'rising', seoScore: 94, geoScore: 91, viralityScore: 82, expertiseScore: 93,
    priority: 'critical', discoveredAt: '2026-06-21T03:00:00Z',
  },
  {
    trendId: 'TR-003', category: 'Gouvernance', keyword: 'indépendance administrateurs circulaire COBAC',
    volume: 1850, trend: 'stable', seoScore: 85, geoScore: 79, viralityScore: 58, expertiseScore: 90,
    priority: 'high', discoveredAt: '2026-06-21T03:00:00Z',
  },
  {
    trendId: 'TR-004', category: 'Conformité', keyword: 'LBC/FT nouvelles exigences GAFI 2026',
    volume: 4100, trend: 'rising', seoScore: 96, geoScore: 93, viralityScore: 88, expertiseScore: 97,
    priority: 'critical', discoveredAt: '2026-06-21T03:00:00Z',
  },
  {
    trendId: 'TR-005', category: 'Réglementaire COBAC', keyword: 'cybersécurité bancaire directive COBAC 2027',
    volume: 2650, trend: 'rising', seoScore: 91, geoScore: 86, viralityScore: 74, expertiseScore: 94,
    priority: 'high', discoveredAt: '2026-06-21T03:00:00Z',
  },
  {
    trendId: 'TR-006', category: 'ESG', keyword: 'stress tests climatiques pilier 2 BCEAO',
    volume: 2200, trend: 'rising', seoScore: 88, geoScore: 84, viralityScore: 65, expertiseScore: 91,
    priority: 'high', discoveredAt: '2026-06-21T03:00:00Z',
  },
  {
    trendId: 'TR-007', category: 'FinTech', keyword: 'open banking afrique francophone 2026',
    volume: 1750, trend: 'stable', seoScore: 82, geoScore: 76, viralityScore: 70, expertiseScore: 85,
    priority: 'medium', discoveredAt: '2026-06-21T03:00:00Z',
  },
  {
    trendId: 'TR-008', category: 'Gouvernance', keyword: 'conseil administration inspection COBAC',
    volume: 1620, trend: 'stable', seoScore: 80, geoScore: 74, viralityScore: 52, expertiseScore: 88,
    priority: 'medium', discoveredAt: '2026-06-21T03:00:00Z',
  },
  {
    trendId: 'TR-009', category: 'Conformité', keyword: 'protection lanceurs alerte circulaire UEMOA',
    volume: 1950, trend: 'rising', seoScore: 86, geoScore: 81, viralityScore: 68, expertiseScore: 89,
    priority: 'high', discoveredAt: '2026-06-21T03:00:00Z',
  },
  {
    trendId: 'TR-010', category: 'Réglementaire BCEAO', keyword: 'digitalisation SFD modèle BCEAO',
    volume: 2400, trend: 'rising', seoScore: 90, geoScore: 87, viralityScore: 72, expertiseScore: 92,
    priority: 'high', discoveredAt: '2026-06-21T03:00:00Z',
  },
];

// ─── WORKFLOW 2 — GÉNÉRATION SCRIPTS ───
export const SCRIPT_GENERATIONS: ScriptGeneration[] = [
  {
    scriptId: 'SCR-001', title: 'LBC/FT 2026 — Nouvelles Exigences GAFI : Ce que les Banques Africaines Doivent Savoir',
    type: 'analyse', duration: '14 min', tone: 'Big Four — Institutionnel expert', references: 8,
    seoKeywords: ['LBC/FT', 'GAFI 2026', 'conformité bancaire', 'blanchiment', 'financement terrorisme'],
    qualityScore: 9.6, status: 'approved', createdAt: '2026-06-21T06:30:00Z',
  },
  {
    scriptId: 'SCR-002', title: 'Ratio Solvabilité UEMOA 2026 — Guide Pratique pour les Établissements Financiers',
    type: 'formation', duration: '16 min', tone: 'Big Four — Pédagogique structuré', references: 12,
    seoKeywords: ['ratio solvabilité', 'UEMOA 2026', 'fonds propres', 'Bâle III', 'établissements financiers'],
    qualityScore: 9.4, status: 'approved', createdAt: '2026-06-21T06:45:00Z',
  },
  {
    scriptId: 'SCR-003', title: 'Régulation FinTech UEMOA 2026-2027 — Analyse Complète du Nouveau Cadre',
    type: 'podcast', duration: '24 min', tone: 'Big Four — Conversation experte', references: 15,
    seoKeywords: ['régulation fintech', 'UEMOA', 'paiement mobile', 'établissement paiement', 'agrément'],
    qualityScore: 9.2, status: 'approved', createdAt: '2026-06-21T07:00:00Z',
  },
  {
    scriptId: 'SCR-004', title: 'Cybersécurité Bancaire — Comment Anticiper la Directive COBAC 2027',
    type: 'capsule', duration: '10 min', tone: 'Big Four — Alerte stratégique', references: 6,
    seoKeywords: ['cybersécurité bancaire', 'COBAC 2027', 'résilience opérationnelle', 'DORA', 'CEMAC'],
    qualityScore: 9.5, status: 'approved', createdAt: '2026-06-21T07:15:00Z',
  },
  {
    scriptId: 'SCR-005', title: 'Club Experts — L\'Avenir de la Conformité Réglementaire en Afrique Francophone',
    type: 'interview_simulee', duration: '30 min', tone: 'Big Four — Dialogue institutionnel', references: 10,
    seoKeywords: ['conformité réglementaire', 'BCEAO', 'COBAC', 'OHADA', 'CIPRES', 'afrique francophone'],
    qualityScore: 9.3, status: 'reviewed', createdAt: '2026-06-21T08:00:00Z',
  },
  {
    scriptId: 'SCR-006', title: 'Stress Tests Climatiques Pilier 2 — Implications pour les Banques UEMOA/CEMAC',
    type: 'analyse', duration: '18 min', tone: 'Big Four — Analyse technique', references: 14,
    seoKeywords: ['stress tests climatiques', 'pilier 2', 'BCEAO', 'COBAC', 'risques ESG', 'NGFS'],
    qualityScore: 9.1, status: 'reviewed', createdAt: '2026-06-21T08:30:00Z',
  },
  {
    scriptId: 'SCR-007', title: 'Protection des Lanceurs d\'Alerte — Obligations Circulaire COBAC 01-2017',
    type: 'capsule', duration: '9 min', tone: 'Big Four — Conformité pratique', references: 5,
    seoKeywords: ['lanceurs alerte', 'COBAC', 'circulaire 01-2017', 'gouvernance', 'conformité CEMAC'],
    qualityScore: 8.9, status: 'draft', createdAt: '2026-06-21T09:00:00Z',
  },
  {
    scriptId: 'SCR-008', title: 'Formation Complète — Préparer son Conseil d\'Administration à l\'Inspection COBAC',
    type: 'formation', duration: '22 min', tone: 'Big Four — Pédagogique avancé', references: 20,
    seoKeywords: ['conseil administration', 'inspection COBAC', 'gouvernance bancaire', 'CEMAC', 'conformité'],
    qualityScore: 9.7, status: 'approved', createdAt: '2026-06-20T16:00:00Z',
  },
];

// ─── WORKFLOW 3 — GÉNÉRATION VOIX IA ───
export const VOICE_GENERATIONS: VoiceGeneration[] = [
  {
    voiceId: 'VOX-001', scriptId: 'SCR-001',
    title: 'LBC/FT 2026 — Nouvelles Exigences GAFI',
    voiceProfile: 'Dr. Célestin Koffi — Voix Expert', duration: '14 min 12 s',
    language: 'Français', qualityChecks: { fluidity: 96, clarity: 94, rate: 92, intelligibility: 97 },
    overallScore: 94.8, status: 'exported', createdAt: '2026-06-21T06:45:00Z',
  },
  {
    voiceId: 'VOX-002', scriptId: 'SCR-002',
    title: 'Ratio Solvabilité UEMOA 2026 — Guide Pratique',
    voiceProfile: 'Pr. Moussa Traoré — Voix Formation', duration: '16 min 05 s',
    language: 'Français', qualityChecks: { fluidity: 94, clarity: 96, rate: 95, intelligibility: 98 },
    overallScore: 95.8, status: 'exported', createdAt: '2026-06-21T07:00:00Z',
  },
  {
    voiceId: 'VOX-003', scriptId: 'SCR-003',
    title: 'Régulation FinTech UEMOA 2026-2027',
    voiceProfile: 'Dr. Amadou Sow — Voix Podcast', duration: '24 min 30 s',
    language: 'Français', qualityChecks: { fluidity: 92, clarity: 90, rate: 93, intelligibility: 95 },
    overallScore: 92.5, status: 'corrected', createdAt: '2026-06-21T07:20:00Z',
  },
  {
    voiceId: 'VOX-004', scriptId: 'SCR-008',
    title: 'Formation — Préparer son CA à l\'Inspection COBAC',
    voiceProfile: 'Pr. Moussa Traoré — Voix Formation', duration: '22 min 08 s',
    language: 'Français', qualityChecks: { fluidity: 97, clarity: 95, rate: 94, intelligibility: 96 },
    overallScore: 95.5, status: 'exported', createdAt: '2026-06-20T17:30:00Z',
  },
  {
    voiceId: 'VOX-005', scriptId: 'SCR-004',
    title: 'Cybersécurité Bancaire — Anticiper COBAC 2027',
    voiceProfile: 'Fatoumata Diallo — Voix Analyste', duration: '10 min 18 s',
    language: 'Français', qualityChecks: { fluidity: 93, clarity: 91, rate: 90, intelligibility: 94 },
    overallScore: 92.0, status: 'normalized', createdAt: '2026-06-21T08:00:00Z',
  },
  {
    voiceId: 'VOX-006', scriptId: 'SCR-006',
    title: 'Stress Tests Climatiques Pilier 2',
    voiceProfile: 'Ibrahim Kone — Voix Institutionnelle', duration: '18 min 42 s',
    language: 'Français', qualityChecks: { fluidity: 95, clarity: 93, rate: 91, intelligibility: 96 },
    overallScore: 93.8, status: 'generated', createdAt: '2026-06-21T09:00:00Z',
  },
];

// ─── WORKFLOW 4 — PRODUCTION VIDÉO ───
export const VIDEO_PRODUCTIONS: VideoProduction[] = [
  {
    videoId: 'VID-001', title: 'LBC/FT 2026 — Nouvelles Exigences GAFI',
    scriptId: 'SCR-001', voiceId: 'VOX-001', template: 'Analyse Réglementaire',
    resolution: '4K', duration: '14 min 12 s',
    components: ['Animation logo KHEPRA', 'Transitions fluides', 'Overlays texte synchronisés', 'Infographies réglementaires', 'Sous-titres FR', 'Lower thirds'],
    exportStatus: 'complete', thumbnailGenerated: true, subtitlesGenerated: true,
    qualityScore: 9.5, createdAt: '2026-06-21T07:15:00Z',
  },
  {
    videoId: 'VID-002', title: 'Ratio Solvabilité UEMOA 2026 — Guide Pratique',
    scriptId: 'SCR-002', voiceId: 'VOX-002', template: 'Guide Pratique',
    resolution: '1440p', duration: '16 min 05 s',
    components: ['Animation générique KHEPRA', 'Graphiques solvabilité', 'Tableaux comparatifs', 'Sous-titres FR', 'Lower thirds'],
    exportStatus: 'exported_1440p', thumbnailGenerated: true, subtitlesGenerated: true,
    qualityScore: 9.3, createdAt: '2026-06-21T07:30:00Z',
  },
  {
    videoId: 'VID-003', title: 'Régulation FinTech UEMOA 2026-2027',
    scriptId: 'SCR-003', voiceId: 'VOX-003', template: 'Tendance Marché',
    resolution: '1080p', duration: '24 min 30 s',
    components: ['Animation logo', 'Infographies FinTech', 'Timeline réglementaire', 'Sous-titres FR', 'Transitions'],
    exportStatus: 'exported_1080p', thumbnailGenerated: true, subtitlesGenerated: true,
    qualityScore: 9.1, createdAt: '2026-06-21T08:00:00Z',
  },
  {
    videoId: 'VID-004', title: 'Formation — Préparer son CA à l\'Inspection COBAC',
    scriptId: 'SCR-008', voiceId: 'VOX-004', template: 'Guide Pratique',
    resolution: '1080p', duration: '22 min 08 s',
    components: ['Slides pédagogiques', 'Check-lists animées', 'Interviews simulées', 'Sous-titres FR', 'Branding KHEPRA'],
    exportStatus: 'complete', thumbnailGenerated: true, subtitlesGenerated: true,
    qualityScore: 9.6, createdAt: '2026-06-20T18:00:00Z',
  },
  {
    videoId: 'VID-005', title: 'Cybersécurité Bancaire — Anticiper COBAC 2027',
    scriptId: 'SCR-004', voiceId: 'VOX-005', template: 'Analyse Réglementaire',
    resolution: '1080p', duration: '10 min 18 s',
    components: ['Animation logo', 'Dashboard cybersécurité', 'Schémas techniques', 'Sous-titres FR'],
    exportStatus: 'rendering', thumbnailGenerated: false, subtitlesGenerated: false,
    qualityScore: 0, createdAt: '2026-06-21T08:30:00Z',
  },
];

// ─── WORKFLOW 5 — SEO YOUTUBE ───
export const YOUTUBE_SEO_ITEMS: YoutubeSEO[] = [
  {
    seoId: 'SEO-001', videoId: 'VID-001',
    title: 'LBC/FT 2026 : Nouvelles Exigences GAFI — Ce que les Banques Africaines Doivent Savoir | KHEPRA EXPERTS',
    description: 'Analyse complète des nouvelles exigences GAFI 2026 en matière de LBC/FT pour les banques africaines. Découvrez les 40 recommandations actualisées, l\'impact sur les dispositifs de conformité en zone UEMOA et CEMAC, et le plan d\'action prioritaire pour les établissements financiers. #LBCFT #GAFI2026 #ConformitéBancaire',
    hashtags: ['#LBCFT', '#GAFI2026', '#ConformitéBancaire', '#KHEPRAEXPERTS', '#BanqueAfrique', '#UEMOA', '#CEMAC', '#RégulationFinancière', '#Compliance', '#AuditBancaire'],
    keywords: ['LBC/FT', 'GAFI 2026', 'conformité bancaire', 'banques africaines', 'blanchiment capitaux', 'UEMOA', 'CEMAC'],
    chapters: [
      { time: '0:00', title: 'Introduction — Contexte GAFI 2026' },
      { time: '2:15', title: 'Les 40 Recommandations Actualisées' },
      { time: '5:40', title: 'Impact UEMOA & CEMAC' },
      { time: '8:50', title: 'Plan d\'Action Prioritaire' },
      { time: '12:30', title: 'Conclusion & Recommandations KHEPRA' },
    ],
    ctrPrediction: 9.2, watchTimePrediction: '10 min 30 s', engagementPrediction: 8.5,
    status: 'applied',
  },
  {
    seoId: 'SEO-002', videoId: 'VID-002',
    title: 'Ratio Solvabilité UEMOA 2026 : Guide Pratique Complet pour Établissements Financiers | KHEPRA EXPERTS',
    description: 'Guide pratique détaillant les nouvelles exigences de ratio de solvabilité en zone UEMOA pour 2026. Calcul pas à pas, fonds propres éligibles, actifs pondérés par les risques, et plan de mise en conformité. Inclut un comparatif Bâle III / UEMOA. #Solvabilité #UEMOA2026 #BanqueAfrique',
    hashtags: ['#Solvabilité', '#UEMOA2026', '#BanqueAfrique', '#KHEPRAEXPERTS', '#BâleIII', '#FondsPropres', '#RégulationBancaire'],
    keywords: ['ratio solvabilité', 'UEMOA 2026', 'fonds propres', 'Bâle III', 'établissements financiers', 'APR'],
    chapters: [
      { time: '0:00', title: 'Introduction — Réforme Solvabilité UEMOA' },
      { time: '3:10', title: 'Calcul du Ratio — Méthodologie' },
      { time: '7:25', title: 'Fonds Propres Éligibles' },
      { time: '11:00', title: 'Actifs Pondérés par les Risques' },
      { time: '14:15', title: 'Plan de Mise en Conformité' },
    ],
    ctrPrediction: 8.5, watchTimePrediction: '12 min 00 s', engagementPrediction: 7.8,
    status: 'applied',
  },
  {
    seoId: 'SEO-003', videoId: 'VID-003',
    title: 'Régulation FinTech UEMOA 2026-2027 : Analyse Complète du Nouveau Cadre | KHEPRA EXPERTS',
    description: 'Analyse approfondie du nouveau cadre réglementaire FinTech en zone UEMOA pour 2026-2027. Établissements de paiement, agrégateurs, open banking, sandbox réglementaire — tout ce que les acteurs FinTech doivent savoir pour obtenir leur agrément. #FinTech #UEMOA #RégulationAfricaine',
    hashtags: ['#FinTech', '#UEMOA', '#RégulationAfricaine', '#KHEPRAEXPERTS', '#PaiementMobile', '#OpenBanking', '#AgrémentFinTech'],
    keywords: ['régulation fintech', 'UEMOA', 'agrément', 'établissement paiement', 'open banking', 'sandbox réglementaire'],
    chapters: [
      { time: '0:00', title: 'Introduction — Contexte FinTech UEMOA' },
      { time: '4:20', title: 'Catégories d\'Agrément' },
      { time: '10:30', title: 'Exigences en Fonds Propres' },
      { time: '16:45', title: 'Gouvernance & Conformité' },
      { time: '21:00', title: 'Roadmap Obtention Agrément' },
    ],
    ctrPrediction: 9.8, watchTimePrediction: '18 min 45 s', engagementPrediction: 9.2,
    status: 'optimized',
  },
  {
    seoId: 'SEO-004', videoId: 'VID-004',
    title: 'Formation Conseil d\'Administration : Préparer son Inspection COBAC — Guide Complet | KHEPRA EXPERTS',
    description: 'Formation complète pour les administrateurs de banques en zone CEMAC. Préparez votre conseil d\'administration à l\'inspection COBAC : documents requis, points de contrôle, checklist de conformité, pièges à éviter. 22 minutes pour transformer votre gouvernance. #Gouvernance #COBAC #CEMAC',
    hashtags: ['#Gouvernance', '#COBAC', '#CEMAC', '#KHEPRAEXPERTS', '#ConseilAdministration', '#InspectionBancaire', '#FormationContinue'],
    keywords: ['conseil administration', 'inspection COBAC', 'CEMAC', 'gouvernance bancaire', 'conformité', 'formation'],
    chapters: [
      { time: '0:00', title: 'Introduction — Enjeux Inspection COBAC' },
      { time: '3:30', title: 'Documents Obligatoires' },
      { time: '8:15', title: 'Points de Contrôle Clés' },
      { time: '14:00', title: 'Checklist de Conformité' },
      { time: '18:30', title: 'Pièges à Éviter & Bonnes Pratiques' },
    ],
    ctrPrediction: 8.9, watchTimePrediction: '16 min 30 s', engagementPrediction: 8.7,
    status: 'applied',
  },
];

// ─── WORKFLOW 6 — PUBLICATION YOUTUBE ───
export const YOUTUBE_PUBLICATIONS: YoutubePublication[] = [
  {
    publicationId: 'PUB-001', videoId: 'VID-001',
    title: 'LBC/FT 2026 : Nouvelles Exigences GAFI — Ce que les Banques Africaines Doivent Savoir',
    publishedAt: '2026-06-21T08:32:00Z', privacyStatus: 'public',
    playlistName: 'Conformité Réglementaire',
    endScreen: true, cards: 3,
    pinnedComment: '📋 Téléchargez notre checklist gratuite LBC/FT 2026 : https://khepraexperts.com/lead-magnets/checklist-conformite-bceao-cobac\n\nQuestions ? Nos experts vous répondent en commentaire. 👇',
    status: 'published',
  },
  {
    publicationId: 'PUB-002', videoId: 'VID-002',
    title: 'Ratio Solvabilité UEMOA 2026 : Guide Pratique Complet pour Établissements Financiers',
    publishedAt: '2026-06-21T09:15:00Z', privacyStatus: 'public',
    playlistName: 'Guides Pratiques',
    endScreen: true, cards: 2,
    pinnedComment: '📊 Téléchargez le calculateur de ratio de solvabilité : https://khepraexperts.com/outils\n\nAbonnez-vous pour plus de guides pratiques réglementaires. 🔔',
    status: 'published',
  },
  {
    publicationId: 'PUB-003', videoId: 'VID-003',
    title: 'Régulation FinTech UEMOA 2026-2027 : Analyse Complète du Nouveau Cadre',
    publishedAt: '2026-06-21T11:00:00Z', privacyStatus: 'public',
    playlistName: 'FinTech & Innovation',
    endScreen: true, cards: 4,
    pinnedComment: '🚀 Vous préparez un dossier d\'agrément FinTech ? Contactez KHEPRA EXPERTS : https://khepraexperts.com/contact\n\nPartagez cette vidéo avec votre équipe conformité. 📤',
    status: 'published',
  },
  {
    publicationId: 'PUB-004', videoId: 'VID-004',
    title: 'Formation Conseil d\'Administration : Préparer son Inspection COBAC',
    publishedAt: '2026-06-20T09:00:00Z', privacyStatus: 'public',
    playlistName: 'Formations',
    endScreen: true, cards: 2,
    pinnedComment: '🎓 Formation complète — Téléchargez le support PDF : https://khepraexperts.com/formations\n\nProchaine session live : inscrivez-vous !',
    status: 'published',
  },
];

// ─── WORKFLOW 7 — ANALYTICS ───
export const VIDEO_ANALYTICS: VideoAnalytics[] = [
  {
    analyticsId: 'ANA-001', videoId: 'VID-004',
    title: 'Formation — Préparer son CA à l\'Inspection COBAC',
    views: 12450, ctr: 9.2, watchTime: '18 min 42 s', subscribersGained: 87,
    engagement: 7.8, rpm: 4.35, performanceScore: 88, seoScore: 91, geoScore: 84, authorityScore: 89,
    capturedAt: '2026-06-21T06:00:00Z',
  },
  {
    analyticsId: 'ANA-002', videoId: 'VID-001',
    title: 'LBC/FT 2026 — Nouvelles Exigences GAFI',
    views: 8420, ctr: 10.4, watchTime: '11 min 15 s', subscribersGained: 124,
    engagement: 9.1, rpm: 5.82, performanceScore: 94, seoScore: 95, geoScore: 90, authorityScore: 92,
    capturedAt: '2026-06-21T06:00:00Z',
  },
  {
    analyticsId: 'ANA-003', videoId: 'VID-002',
    title: 'Ratio Solvabilité UEMOA 2026 — Guide Pratique',
    views: 5230, ctr: 7.8, watchTime: '9 min 50 s', subscribersGained: 42,
    engagement: 6.5, rpm: 3.90, performanceScore: 76, seoScore: 82, geoScore: 77, authorityScore: 80,
    capturedAt: '2026-06-21T06:00:00Z',
  },
  {
    analyticsId: 'ANA-004', videoId: 'VID-003',
    title: 'Régulation FinTech UEMOA 2026-2027',
    views: 11580, ctr: 11.2, watchTime: '20 min 05 s', subscribersGained: 156,
    engagement: 9.5, rpm: 6.15, performanceScore: 96, seoScore: 97, geoScore: 93, authorityScore: 94,
    capturedAt: '2026-06-21T06:00:00Z',
  },
  {
    analyticsId: 'ANA-005',
    title: 'Cybersécurité Bancaire — Directive COBAC 2027',
    videoId: 'VID-LEGACY-01',
    views: 15200, ctr: 8.9, watchTime: '12 min 30 s', subscribersGained: 98,
    engagement: 8.2, rpm: 4.95, performanceScore: 85, seoScore: 88, geoScore: 82, authorityScore: 87,
    capturedAt: '2026-06-21T06:00:00Z',
  },
  {
    analyticsId: 'ANA-006',
    title: 'Prix de Transfert — 5 Erreurs Fatales',
    videoId: 'VID-LEGACY-02',
    views: 9870, ctr: 7.5, watchTime: '8 min 20 s', subscribersGained: 55,
    engagement: 6.8, rpm: 3.45, performanceScore: 72, seoScore: 75, geoScore: 70, authorityScore: 78,
    capturedAt: '2026-06-21T06:00:00Z',
  },
  {
    analyticsId: 'ANA-007',
    title: 'Finance Islamique SFD — Dispositions BCEAO',
    videoId: 'VID-LEGACY-03',
    views: 6720, ctr: 6.9, watchTime: '15 min 40 s', subscribersGained: 38,
    engagement: 7.1, rpm: 3.72, performanceScore: 74, seoScore: 79, geoScore: 73, authorityScore: 76,
    capturedAt: '2026-06-21T06:00:00Z',
  },
];

// ─── WORKFLOW 8 — OPTIMISATION CONTINUE ───
// ─── EDITORIAL CALENDAR — Planning Hebdomadaire S26 2026 ───
export const EDITORIAL_CALENDAR: EditorialCalendarEntry[] = [
  {
    entryId: 'ED-001', weekNumber: 26, day: 'Lundi', date: '2026-06-22',
    timeSlot: '08:00', title: 'LBC/FT 2026 — Nouvelles Exigences GAFI : Guide Complet',
    type: 'analyse', stage: 'scheduled', channel: 'youtube',
    priority: 'critical', expectedViews: 9500, expectedCTR: 10.2,
    assignedAgent: 'KOS-Content-Generator', estimatedDuration: '14 min',
  },
  {
    entryId: 'ED-002', weekNumber: 26, day: 'Lundi', date: '2026-06-22',
    timeSlot: '14:00', title: '3 Erreurs Fatales LBC/FT — Short',
    type: 'short', stage: 'video_ready', channel: 'both',
    priority: 'high', expectedViews: 4500, expectedCTR: 12.5,
    assignedAgent: 'KOS-Studio-Media', estimatedDuration: '60 sec',
  },
  {
    entryId: 'ED-003', weekNumber: 26, day: 'Mardi', date: '2026-06-23',
    timeSlot: '08:00', title: 'Ratio Solvabilité UEMOA 2026 : Guide Pratique',
    type: 'formation', stage: 'seo_ready', channel: 'youtube',
    priority: 'critical', expectedViews: 7200, expectedCTR: 8.8,
    assignedAgent: 'KOS-Content-Generator', estimatedDuration: '16 min',
  },
  {
    entryId: 'ED-004', weekNumber: 26, day: 'Mardi', date: '2026-06-23',
    timeSlot: '16:00', title: 'Réforme Solvabilité : Ce qui Change pour les SFD',
    type: 'capsule', stage: 'script_ready', channel: 'youtube',
    priority: 'high', expectedViews: 3800, expectedCTR: 7.5,
    assignedAgent: 'KOS-Content-Generator', estimatedDuration: '8 min',
  },
  {
    entryId: 'ED-005', weekNumber: 26, day: 'Mercredi', date: '2026-06-24',
    timeSlot: '08:00', title: 'Régulation FinTech UEMOA 2026-2027 : Analyse Complète',
    type: 'podcast', stage: 'voice_ready', channel: 'youtube',
    priority: 'critical', expectedViews: 12000, expectedCTR: 11.5,
    assignedAgent: 'KOS-Studio-Media', estimatedDuration: '24 min',
  },
  {
    entryId: 'ED-006', weekNumber: 26, day: 'Mercredi', date: '2026-06-24',
    timeSlot: '14:00', title: 'FinTech Afrique : Les 5 Startups à Surveiller',
    type: 'short', stage: 'planned', channel: 'both',
    priority: 'medium', expectedViews: 3200, expectedCTR: 9.8,
    assignedAgent: 'KOS-Studio-Media', estimatedDuration: '45 sec',
  },
  {
    entryId: 'ED-007', weekNumber: 26, day: 'Jeudi', date: '2026-06-25',
    timeSlot: '08:00', title: 'Cybersécurité Bancaire : Anticiper la Directive COBAC 2027',
    type: 'analyse', stage: 'script_ready', channel: 'youtube',
    priority: 'high', expectedViews: 6800, expectedCTR: 9.1,
    assignedAgent: 'KOS-Content-Generator', estimatedDuration: '12 min',
  },
  {
    entryId: 'ED-008', weekNumber: 26, day: 'Jeudi', date: '2026-06-25',
    timeSlot: '18:00', title: 'Club Experts — Gouvernance Bancaire en Afrique',
    type: 'interview_simulee', stage: 'planned', channel: 'youtube',
    priority: 'medium', expectedViews: 5400, expectedCTR: 8.2,
    assignedAgent: 'KOS-Studio-Media', estimatedDuration: '30 min',
  },
  {
    entryId: 'ED-009', weekNumber: 26, day: 'Vendredi', date: '2026-06-26',
    timeSlot: '08:00', title: 'Stress Tests Climatiques Pilier 2 : Implications BCEAO',
    type: 'analyse', stage: 'planned', channel: 'youtube',
    priority: 'high', expectedViews: 6100, expectedCTR: 8.6,
    assignedAgent: 'KOS-Content-Generator', estimatedDuration: '15 min',
  },
  {
    entryId: 'ED-010', weekNumber: 26, day: 'Vendredi', date: '2026-06-26',
    timeSlot: '14:00', title: 'ESG Reporting : Le Guide pour les Banques Africaines',
    type: 'capsule', stage: 'planned', channel: 'both',
    priority: 'high', expectedViews: 4200, expectedCTR: 8.0,
    assignedAgent: 'KOS-Studio-Media', estimatedDuration: '10 min',
  },
  {
    entryId: 'ED-011', weekNumber: 26, day: 'Samedi', date: '2026-06-27',
    timeSlot: '10:00', title: 'Open Banking Afrique : Opportunités et Défis 2027',
    type: 'podcast', stage: 'planned', channel: 'youtube',
    priority: 'medium', expectedViews: 4800, expectedCTR: 7.8,
    assignedAgent: 'KOS-Content-Generator', estimatedDuration: '20 min',
  },
  {
    entryId: 'ED-012', weekNumber: 26, day: 'Dimanche', date: '2026-06-28',
    timeSlot: '10:00', title: 'Rétrospective Hebdo KHEPRA — Best-of Conformité',
    type: 'short', stage: 'planned', channel: 'youtube',
    priority: 'low', expectedViews: 2800, expectedCTR: 7.2,
    assignedAgent: 'KOS-Studio-Media', estimatedDuration: '90 sec',
  },
];

// ─── VIDEO COMPARISON DATA — For Vidéo vs Vidéo Dashboard ───
export interface VideoComparisonMetric {
  videoId: string;
  title: string;
  thumbnail: string;
  publishDate: string;
  views: number;
  ctr: number;
  watchTimeSeconds: number;
  avgWatchTimeSeconds: number;
  subscribersGained: number;
  engagement: number;
  rpm: number;
  likes: number;
  comments: number;
  shares: number;
  performanceScore: number;
  videoType: string;
  duration: string;
}

export const VIDEO_COMPARISON_DATA: VideoComparisonMetric[] = [
  {
    videoId: 'VID-001',
    title: 'LBC/FT 2026 — Nouvelles Exigences GAFI',
    thumbnail: 'https://readdy.ai/api/search-image?query=Professional%20dark%20minimal%20finance%20documentary%20thumbnail%20with%20red%20accent%20typography%20on%20black%20background%20abstract%20geometric%20shapes%20high%20contrast%20clean%20modern%20editorial%20design&width=320&height=180&seq=thumb-vid-001&orientation=landscape',
    publishDate: '2026-06-21',
    views: 8420, ctr: 10.4, watchTimeSeconds: 56700,
    avgWatchTimeSeconds: 675, subscribersGained: 124,
    engagement: 9.1, rpm: 5.82, likes: 312, comments: 48, shares: 87,
    performanceScore: 94, videoType: 'Analyse', duration: '14 min',
  },
  {
    videoId: 'VID-002',
    title: 'Ratio Solvabilité UEMOA 2026 — Guide Pratique',
    thumbnail: 'https://readdy.ai/api/search-image?query=Professional%20blue%20corporate%20finance%20thumbnail%20with%20charts%20graphs%20abstract%20data%20visualization%20clean%20minimal%20modern%20editorial%20design%20dark%20background%20high%20contrast&width=320&height=180&seq=thumb-vid-002&orientation=landscape',
    publishDate: '2026-06-21',
    views: 5230, ctr: 7.8, watchTimeSeconds: 30900,
    avgWatchTimeSeconds: 590, subscribersGained: 42,
    engagement: 6.5, rpm: 3.90, likes: 178, comments: 23, shares: 41,
    performanceScore: 76, videoType: 'Formation', duration: '16 min',
  },
  {
    videoId: 'VID-003',
    title: 'Régulation FinTech UEMOA 2026-2027',
    thumbnail: 'https://readdy.ai/api/search-image?query=Modern%20fintech%20technology%20thumbnail%20with%20abstract%20digital%20circuit%20patterns%20neon%20green%20accents%20dark%20background%20clean%20minimal%20professional%20editorial%20design%20high%20contrast&width=320&height=180&seq=thumb-vid-003&orientation=landscape',
    publishDate: '2026-06-21',
    views: 11580, ctr: 11.2, watchTimeSeconds: 120300,
    avgWatchTimeSeconds: 1038, subscribersGained: 156,
    engagement: 9.5, rpm: 6.15, likes: 456, comments: 72, shares: 134,
    performanceScore: 96, videoType: 'Podcast', duration: '24 min',
  },
  {
    videoId: 'VID-004',
    title: 'Formation — Préparer son CA à l\'Inspection COBAC',
    thumbnail: 'https://readdy.ai/api/search-image?query=Executive%20boardroom%20governance%20thumbnail%20with%20elegant%20dark%20wood%20table%20abstract%20geometric%20patterns%20gold%20accents%20professional%20minimal%20editorial%20design%20high%20contrast%20corporate%20aesthetic&width=320&height=180&seq=thumb-vid-004&orientation=landscape',
    publishDate: '2026-06-20',
    views: 12450, ctr: 9.2, watchTimeSeconds: 112200,
    avgWatchTimeSeconds: 902, subscribersGained: 87,
    engagement: 7.8, rpm: 4.35, likes: 398, comments: 56, shares: 102,
    performanceScore: 88, videoType: 'Formation', duration: '22 min',
  },
  {
    videoId: 'VID-005',
    title: 'Cybersécurité Bancaire — Directive COBAC 2027',
    thumbnail: 'https://readdy.ai/api/search-image?query=Cybersecurity%20digital%20shield%20thumbnail%20with%20abstract%20network%20lines%20holographic%20blue%20grid%20dark%20background%20minimal%20modern%20tech%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-vid-005&orientation=landscape',
    publishDate: '2026-06-19',
    views: 15200, ctr: 8.9, watchTimeSeconds: 75000,
    avgWatchTimeSeconds: 750, subscribersGained: 98,
    engagement: 8.2, rpm: 4.95, likes: 534, comments: 89, shares: 156,
    performanceScore: 85, videoType: 'Analyse', duration: '12 min',
  },
  {
    videoId: 'VID-006',
    title: 'Prix de Transfert — 5 Erreurs Fatales',
    thumbnail: 'https://readdy.ai/api/search-image?query=Warning%20sign%20exclamation%20red%20alert%20thumbnail%20with%20abstract%20geometric%20triangles%20dark%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20finance%20aesthetic&width=320&height=180&seq=thumb-vid-006&orientation=landscape',
    publishDate: '2026-06-18',
    views: 9870, ctr: 7.5, watchTimeSeconds: 49800,
    avgWatchTimeSeconds: 500, subscribersGained: 55,
    engagement: 6.8, rpm: 3.45, likes: 267, comments: 34, shares: 67,
    performanceScore: 72, videoType: 'Capsule', duration: '8 min',
  },
  {
    videoId: 'VID-007',
    title: 'Finance Islamique SFD — Dispositions BCEAO',
    thumbnail: 'https://readdy.ai/api/search-image?query=Islamic%20finance%20geometric%20pattern%20thumbnail%20with%20gold%20arabesque%20motifs%20dark%20green%20background%20elegant%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-vid-007&orientation=landscape',
    publishDate: '2026-06-17',
    views: 6720, ctr: 6.9, watchTimeSeconds: 63000,
    avgWatchTimeSeconds: 940, subscribersGained: 38,
    engagement: 7.1, rpm: 3.72, likes: 189, comments: 42, shares: 51,
    performanceScore: 74, videoType: 'Analyse', duration: '15 min',
  },
  {
    videoId: 'VID-008',
    title: 'ESG Reporting — Guide pour Banques Africaines',
    thumbnail: 'https://readdy.ai/api/search-image?query=Sustainability%20ESG%20green%20leaf%20abstract%20thumbnail%20with%20organic%20flowing%20lines%20earth%20tones%20dark%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20environmental%20aesthetic&width=320&height=180&seq=thumb-vid-008&orientation=landscape',
    publishDate: '2026-06-15',
    views: 4890, ctr: 8.1, watchTimeSeconds: 34200,
    avgWatchTimeSeconds: 570, subscribersGained: 29,
    engagement: 7.5, rpm: 4.10, likes: 145, comments: 28, shares: 43,
    performanceScore: 78, videoType: 'Guide', duration: '10 min',
  },
];

export const COMPARISON_PERIODS = [
  { label: '7 jours', value: '7d' },
  { label: '30 jours', value: '30d' },
  { label: '90 jours', value: '90d' },
  { label: '6 mois', value: '6m' },
  { label: '1 an', value: '1y' },
];

export const COMPARISON_METRICS = [
  { key: 'views', label: 'Vues', icon: 'ri-eye-line', color: '#86BC25', unit: '' },
  { key: 'ctr', label: 'CTR', icon: 'ri-cursor-line', color: '#C2410C', unit: '%' },
  { key: 'watchTimeSeconds', label: 'Watch Time', icon: 'ri-timer-line', color: '#FF0000', unit: 's' },
  { key: 'avgWatchTimeSeconds', label: 'Avg Watch Time', icon: 'ri-time-line', color: '#0A66C2', unit: 's' },
  { key: 'subscribersGained', label: 'Abonnés', icon: 'ri-user-add-line', color: '#059669', unit: '' },
  { key: 'engagement', label: 'Engagement', icon: 'ri-heart-line', color: '#D97757', unit: '/10' },
  { key: 'rpm', label: 'RPM', icon: 'ri-money-euro-circle-line', color: '#CA8A04', unit: '€' },
  { key: 'likes', label: 'Likes', icon: 'ri-thumb-up-line', color: '#0A66C2', unit: '' },
  { key: 'comments', label: 'Commentaires', icon: 'ri-chat-1-line', color: '#6B7280', unit: '' },
  { key: 'shares', label: 'Partages', icon: 'ri-share-forward-line', color: '#059669', unit: '' },
];

// ─── PLAYLIST INTELLIGENCE — Analyse Playlists & Séries Contenu ───

export interface PlaylistItem {
  position: number;
  videoId: string;
  title: string;
  thumbnail: string;
  views: number;
  watchTime: string;
  retention: number;
  ctr: number;
  engagement: number;
  addedAt: string;
}

export interface PlaylistSeries {
  playlistId: string;
  name: string;
  description: string;
  category: string;
  totalVideos: number;
  totalViews: number;
  avgRetention: number;
  avgCTR: number;
  avgEngagement: number;
  avgWatchTime: string;
  avgWatchTimeSeconds: number;
  subscriberConversion: number;
  lastUpdated: string;
  status: 'active' | 'archived' | 'planning';
  items: PlaylistItem[];
  optimization: {
    gap: string;
    recommendation: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    estimatedImpact: string;
  };
  seriesPlan: {
    nextVideoTitle: string;
    nextVideoStage: string;
    estimatedPublishDate: string;
    estimatedViews: number;
  };
}

export const PLAYLIST_SERIES: PlaylistSeries[] = [
  {
    playlistId: 'PL-001',
    name: 'Conformité Réglementaire',
    description: 'Série dédiée aux normes de conformité bancaire en zone UEMOA et CEMAC — BCEAO, COBAC, GAFI, LBC/FT.',
    category: 'Réglementaire',
    totalVideos: 8,
    totalViews: 84700,
    avgRetention: 68,
    avgCTR: 9.4,
    avgEngagement: 8.2,
    avgWatchTime: '12 min 30 s',
    avgWatchTimeSeconds: 750,
    subscriberConversion: 3.2,
    lastUpdated: '2026-06-21',
    status: 'active',
    items: [
      { position: 1, videoId: 'VID-001', title: 'LBC/FT 2026 — Nouvelles Exigences GAFI', thumbnail: 'https://readdy.ai/api/search-image?query=Professional%20dark%20minimal%20finance%20documentary%20thumbnail%20with%20red%20accent%20typography%20on%20black%20background%20abstract%20geometric%20shapes%20high%20contrast%20clean%20modern%20editorial%20design&width=320&height=180&seq=thumb-pl-001-1&orientation=landscape', views: 8420, watchTime: '11 min 15 s', retention: 72, ctr: 10.4, engagement: 9.1, addedAt: '2026-06-21' },
      { position: 2, videoId: 'VID-004', title: 'Formation — Préparer son CA à l\'Inspection COBAC', thumbnail: 'https://readdy.ai/api/search-image?query=Executive%20boardroom%20governance%20thumbnail%20with%20elegant%20dark%20wood%20table%20abstract%20geometric%20patterns%20gold%20accents%20professional%20minimal%20editorial%20design%20high%20contrast%20corporate%20aesthetic&width=320&height=180&seq=thumb-pl-001-2&orientation=landscape', views: 12450, watchTime: '18 min 42 s', retention: 78, ctr: 9.2, engagement: 7.8, addedAt: '2026-06-20' },
      { position: 3, videoId: 'VID-LEGACY-01', title: 'Cybersécurité Bancaire — Directive COBAC 2027', thumbnail: 'https://readdy.ai/api/search-image?query=Cybersecurity%20digital%20shield%20thumbnail%20with%20abstract%20network%20lines%20holographic%20blue%20grid%20dark%20background%20minimal%20modern%20tech%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-pl-001-3&orientation=landscape', views: 15200, watchTime: '12 min 30 s', retention: 65, ctr: 8.9, engagement: 8.2, addedAt: '2026-06-19' },
      { position: 4, videoId: 'VID-LEGACY-02', title: 'Prix de Transfert — 5 Erreurs Fatales', thumbnail: 'https://readdy.ai/api/search-image?query=Warning%20sign%20exclamation%20red%20alert%20thumbnail%20with%20abstract%20geometric%20triangles%20dark%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20finance%20aesthetic&width=320&height=180&seq=thumb-pl-001-4&orientation=landscape', views: 9870, watchTime: '8 min 20 s', retention: 52, ctr: 7.5, engagement: 6.8, addedAt: '2026-06-18' },
      { position: 5, videoId: 'VID-LEGACY-03', title: 'Finance Islamique SFD — Dispositions BCEAO', thumbnail: 'https://readdy.ai/api/search-image?query=Islamic%20finance%20geometric%20pattern%20thumbnail%20with%20gold%20arabesque%20motifs%20dark%20green%20background%20elegant%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-pl-001-5&orientation=landscape', views: 6720, watchTime: '15 min 40 s', retention: 74, ctr: 6.9, engagement: 7.1, addedAt: '2026-06-17' },
      { position: 6, videoId: 'VID-LEGACY-04', title: 'ESG Reporting — Guide pour Banques Africaines', thumbnail: 'https://readdy.ai/api/search-image?query=Sustainability%20ESG%20green%20leaf%20abstract%20thumbnail%20with%20organic%20flowing%20lines%20earth%20tones%20dark%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20environmental%20aesthetic&width=320&height=180&seq=thumb-pl-001-6&orientation=landscape', views: 4890, watchTime: '10 min 00 s', retention: 58, ctr: 8.1, engagement: 7.5, addedAt: '2026-06-15' },
      { position: 7, videoId: 'VID-LEGACY-05', title: '3 Lignes de Défense — Circulaire 03-2017', thumbnail: 'https://readdy.ai/api/search-image?query=Three%20lines%20defense%20corporate%20governance%20abstract%20thumbnail%20with%20layered%20shield%20shapes%20dark%20blue%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-pl-001-7&orientation=landscape', views: 5340, watchTime: '13 min 20 s', retention: 66, ctr: 8.3, engagement: 7.9, addedAt: '2026-06-14' },
      { position: 8, videoId: 'VID-LEGACY-06', title: 'Gestion ALM Bancaire — Guide UEMOA', thumbnail: 'https://readdy.ai/api/search-image?query=Banking%20ALM%20asset%20liability%20management%20abstract%20thumbnail%20with%20chart%20arrows%20and%20financial%20graphs%20dark%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-pl-001-8&orientation=landscape', views: 6120, watchTime: '14 min 50 s', retention: 69, ctr: 7.7, engagement: 7.3, addedAt: '2026-06-13' },
    ],
    optimization: {
      gap: 'Retention chute à 52% sur "Prix de Transfert" — 5eme position provoque abandonment 48%',
      recommendation: 'Réorganiser : placer vidéos haute-retention en position 3-4, reléguer faible rétention en fin. Ajouter intro playlist 30s.',
      priority: 'high',
      estimatedImpact: '+8pp retention globale, +12% vues suggérées',
    },
    seriesPlan: {
      nextVideoTitle: 'Conformité DORA Afrique — Impact Directive Européenne',
      nextVideoStage: 'script_ready',
      estimatedPublishDate: '2026-06-29',
      estimatedViews: 7800,
    },
  },
  {
    playlistId: 'PL-002',
    name: 'Guides Pratiques',
    description: 'Série de guides pratiques pour les professionnels de la finance et de la conformité en Afrique.',
    category: 'Éducation',
    totalVideos: 6,
    totalViews: 45600,
    avgRetention: 71,
    avgCTR: 8.7,
    avgEngagement: 7.5,
    avgWatchTime: '10 min 45 s',
    avgWatchTimeSeconds: 645,
    subscriberConversion: 2.8,
    lastUpdated: '2026-06-21',
    status: 'active',
    items: [
      { position: 1, videoId: 'VID-002', title: 'Ratio Solvabilité UEMOA 2026 — Guide Pratique', thumbnail: 'https://readdy.ai/api/search-image?query=Professional%20blue%20corporate%20finance%20thumbnail%20with%20charts%20graphs%20abstract%20data%20visualization%20clean%20minimal%20modern%20editorial%20design%20dark%20background%20high%20contrast&width=320&height=180&seq=thumb-pl-002-1&orientation=landscape', views: 5230, watchTime: '9 min 50 s', retention: 64, ctr: 7.8, engagement: 6.5, addedAt: '2026-06-21' },
      { position: 2, videoId: 'VID-LEGACY-07', title: 'Préparer une Mission BCEAO — Guide Complet', thumbnail: 'https://readdy.ai/api/search-image?query=Banking%20inspection%20mission%20checklist%20abstract%20thumbnail%20with%20official%20document%20stamp%20seal%20dark%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-pl-002-2&orientation=landscape', views: 6890, watchTime: '11 min 20 s', retention: 73, ctr: 8.4, engagement: 7.6, addedAt: '2026-06-16' },
      { position: 3, videoId: 'VID-LEGACY-08', title: 'Référentiel Comptable SFD — Instructions BCEAO', thumbnail: 'https://readdy.ai/api/search-image?query=Accounting%20standards%20document%20abstract%20thumbnail%20with%20ledger%20lines%20and%20financial%20tables%20dark%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-pl-002-3&orientation=landscape', views: 4120, watchTime: '12 min 10 s', retention: 68, ctr: 7.2, engagement: 7.0, addedAt: '2026-06-12' },
      { position: 4, videoId: 'VID-LEGACY-09', title: 'Digitalisation SFD — Modèle BCEAO Inclusion', thumbnail: 'https://readdy.ai/api/search-image?query=Digital%20transformation%20microfinance%20thumbnail%20with%20smartphone%20and%20financial%20icons%20dark%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-pl-002-4&orientation=landscape', views: 7650, watchTime: '9 min 45 s', retention: 70, ctr: 8.9, engagement: 7.8, addedAt: '2026-06-10' },
      { position: 5, videoId: 'VID-LEGACY-10', title: 'Reporting Périodique SFD — Instructions BCEAO', thumbnail: 'https://readdy.ai/api/search-image?query=Financial%20reporting%20periodic%20table%20abstract%20thumbnail%20with%20charts%20and%20calendar%20elements%20dark%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-pl-002-5&orientation=landscape', views: 3450, watchTime: '10 min 30 s', retention: 55, ctr: 6.8, engagement: 6.4, addedAt: '2026-06-08' },
      { position: 6, videoId: 'VID-LEGACY-11', title: 'Plans Préventifs Redressement — Circulaire 001-2020', thumbnail: 'https://readdy.ai/api/search-image?query=Emergency%20rescue%20plan%20abstract%20thumbnail%20with%20upward%20arrow%20and%20shield%20elements%20dark%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-pl-002-6&orientation=landscape', views: 4720, watchTime: '11 min 05 s', retention: 62, ctr: 7.5, engagement: 7.2, addedAt: '2026-06-05' },
    ],
    optimization: {
      gap: 'Conversion abonnés 2.8% — sous la moyenne chaîne 3.1%. 5eme vidéo faible rétention 55% pénalise le score global.',
      recommendation: 'Ajouter CTA abonnement fin chaque vidéo + écran de fin optimisé. Réorganiser : placer vidéo "Digitalisation SFD" en position 2 (haute conversion).',
      priority: 'medium',
      estimatedImpact: '+0.4pp conversion abonnés, +6% vues playlist',
    },
    seriesPlan: {
      nextVideoTitle: 'Guide Complet — Mise en Conformité BCEAO en 90 Jours',
      nextVideoStage: 'planned',
      estimatedPublishDate: '2026-07-03',
      estimatedViews: 6200,
    },
  },
  {
    playlistId: 'PL-003',
    name: 'FinTech & Innovation',
    description: 'Série dédiée aux innovations FinTech, agrégation, open banking, sandbox réglementaire et établissements de paiement en Afrique.',
    category: 'FinTech',
    totalVideos: 5,
    totalViews: 52300,
    avgRetention: 76,
    avgCTR: 10.8,
    avgEngagement: 8.9,
    avgWatchTime: '15 min 20 s',
    avgWatchTimeSeconds: 920,
    subscriberConversion: 4.1,
    lastUpdated: '2026-06-21',
    status: 'active',
    items: [
      { position: 1, videoId: 'VID-003', title: 'Régulation FinTech UEMOA 2026-2027', thumbnail: 'https://readdy.ai/api/search-image?query=Modern%20fintech%20technology%20thumbnail%20with%20abstract%20digital%20circuit%20patterns%20neon%20green%20accents%20dark%20background%20clean%20minimal%20professional%20editorial%20design%20high%20contrast&width=320&height=180&seq=thumb-pl-003-1&orientation=landscape', views: 11580, watchTime: '20 min 05 s', retention: 82, ctr: 11.2, engagement: 9.5, addedAt: '2026-06-21' },
      { position: 2, videoId: 'VID-LEGACY-12', title: 'Agrément FinTech — Étapes Clés en UEMOA', thumbnail: 'https://readdy.ai/api/search-image?query=Fintech%20approval%20license%20abstract%20thumbnail%20with%20official%20document%20and%20checkmark%20green%20accents%20dark%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-pl-003-2&orientation=landscape', views: 9840, watchTime: '14 min 30 s', retention: 78, ctr: 10.4, engagement: 8.7, addedAt: '2026-06-15' },
      { position: 3, videoId: 'VID-LEGACY-13', title: 'Open Banking Afrique — Opportunités 2026', thumbnail: 'https://readdy.ai/api/search-image?query=Open%20banking%20connectivity%20abstract%20thumbnail%20with%20interconnected%20nodes%20and%20API%20symbols%20dark%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-pl-003-3&orientation=landscape', views: 7230, watchTime: '13 min 15 s', retention: 74, ctr: 9.8, engagement: 8.2, addedAt: '2026-06-11' },
      { position: 4, videoId: 'VID-LEGACY-14', title: 'Sandbox Réglementaire — Guide FinTech UEMOA', thumbnail: 'https://readdy.ai/api/search-image?query=Regulatory%20sandbox%20testing%20abstract%20thumbnail%20with%20protected%20glass%20dome%20and%20digital%20elements%20dark%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-pl-003-4&orientation=landscape', views: 8120, watchTime: '15 min 40 s', retention: 76, ctr: 10.1, engagement: 8.6, addedAt: '2026-06-09' },
      { position: 5, videoId: 'VID-LEGACY-15', title: 'Paiement Mobile — Cadre Réglementaire BCEAO', thumbnail: 'https://readdy.ai/api/search-image?query=Mobile%20payment%20Africa%20abstract%20thumbnail%20with%20smartphone%20and%20wave%20payment%20symbols%20dark%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-pl-003-5&orientation=landscape', views: 6920, watchTime: '12 min 50 s', retention: 71, ctr: 9.2, engagement: 7.9, addedAt: '2026-06-07' },
    ],
    optimization: {
      gap: 'Playlist performante mais sous-exploitée : 0 short dérivé, 0 article blog, 0 post LinkedIn. Audience captive mais pas capitalisée.',
      recommendation: 'Créer écosystème : 1 short par vidéo + 1 article blog 2500 mots + 3 posts LinkedIn. Cross-promotion entre playlists.',
      priority: 'critical',
      estimatedImpact: '+3x portée, +180% ROI contenu, +25% abonnés chaîne',
    },
    seriesPlan: {
      nextVideoTitle: 'FinTech Africa Decoded — Épisode 1 : Écosystème 2027',
      nextVideoStage: 'script_ready',
      estimatedPublishDate: '2026-07-01',
      estimatedViews: 9500,
    },
  },
  {
    playlistId: 'PL-004',
    name: 'Formations',
    description: 'Série de formations vidéo pour les cadres bancaires, administrateurs, DAF, conformité et gouvernance en Afrique francophone.',
    category: 'Formation',
    totalVideos: 4,
    totalViews: 33800,
    avgRetention: 80,
    avgCTR: 9.1,
    avgEngagement: 8.4,
    avgWatchTime: '18 min 45 s',
    avgWatchTimeSeconds: 1125,
    subscriberConversion: 3.7,
    lastUpdated: '2026-06-20',
    status: 'active',
    items: [
      { position: 1, videoId: 'VID-004', title: 'Formation — Préparer son CA à l\'Inspection COBAC', thumbnail: 'https://readdy.ai/api/search-image?query=Executive%20boardroom%20governance%20thumbnail%20with%20elegant%20dark%20wood%20table%20abstract%20geometric%20patterns%20gold%20accents%20professional%20minimal%20editorial%20design%20high%20contrast%20corporate%20aesthetic&width=320&height=180&seq=thumb-pl-004-1&orientation=landscape', views: 12450, watchTime: '18 min 42 s', retention: 78, ctr: 9.2, engagement: 7.8, addedAt: '2026-06-20' },
      { position: 2, videoId: 'VID-LEGACY-16', title: 'Formation DAF — Gestion Trésorerie Bancaire', thumbnail: 'https://readdy.ai/api/search-image?query=Corporate%20treasury%20management%20abstract%20thumbnail%20with%20cash%20flow%20arrows%20and%20financial%20charts%20dark%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-pl-004-2&orientation=landscape', views: 8760, watchTime: '22 min 10 s', retention: 84, ctr: 9.8, engagement: 8.9, addedAt: '2026-06-08' },
      { position: 3, videoId: 'VID-LEGACY-17', title: 'Formation Contrôle Interne — Circulaire BCEAO', thumbnail: 'https://readdy.ai/api/search-image?query=Internal%20control%20audit%20abstract%20thumbnail%20with%20shield%20checkmark%20and%20magnifying%20glass%20dark%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-pl-004-3&orientation=landscape', views: 6540, watchTime: '19 min 30 s', retention: 79, ctr: 8.5, engagement: 8.1, addedAt: '2026-06-03' },
      { position: 4, videoId: 'VID-LEGACY-18', title: 'Formation Gouvernance — Comités Spécialisés', thumbnail: 'https://readdy.ai/api/search-image?query=Governance%20committee%20meeting%20abstract%20thumbnail%20with%20round%20table%20and%20executive%20chairs%20dark%20background%20minimal%20modern%20editorial%20design%20high%20contrast%20professional%20aesthetic&width=320&height=180&seq=thumb-pl-004-4&orientation=landscape', views: 4780, watchTime: '16 min 45 s', retention: 72, ctr: 7.9, engagement: 7.6, addedAt: '2026-05-28' },
    ],
    optimization: {
      gap: '4 vidéos seulement — audience demande 6+ pour compléter parcours. Manque module "Conformité LBC/FT" et "Risque Opérationnel".',
      recommendation: 'Développer 2 modules complémentaires : "LBC/FT Niveau 1" et "Risque Opérationnel Bancaire". Créer certification de parcours.',
      priority: 'high',
      estimatedImpact: '+40% watch time playlist, +15% conversion formation payante',
    },
    seriesPlan: {
      nextVideoTitle: 'Formation LBC/FT — Niveau 1 : Les Fondamentaux',
      nextVideoStage: 'planned',
      estimatedPublishDate: '2026-07-06',
      estimatedViews: 8500,
    },
  },
  {
    playlistId: 'PL-005',
    name: 'FinTech Africa Decoded',
    description: 'Nouvelle série en préparation — 6 épisodes dédiés à l\'écosystème FinTech africain : agrégation, paiement, crédit, assurance, blockchain, régulation.',
    category: 'Série',
    totalVideos: 0,
    totalViews: 0,
    avgRetention: 0,
    avgCTR: 0,
    avgEngagement: 0,
    avgWatchTime: '20 min 00 s',
    avgWatchTimeSeconds: 1200,
    subscriberConversion: 0,
    lastUpdated: '2026-06-21',
    status: 'planning',
    items: [],
    optimization: {
      gap: 'Série en planification — 0 vidéo produite. Production estimée 4 semaines.',
      recommendation: 'Lancer production parallèle : script épisodes 1-2 en parallèle, voix IA en pipeline, vidéo Remotion en batch.',
      priority: 'critical',
      estimatedImpact: '+6 vidéos haute qualité, +15 000 vues estimées, positionnement leader FinTech Africa',
    },
    seriesPlan: {
      nextVideoTitle: 'FinTech Africa Decoded — Épisode 1 : Écosystème 2027',
      nextVideoStage: 'script_ready',
      estimatedPublishDate: '2026-07-01',
      estimatedViews: 9500,
    },
  },
];

// ─── PUBLICATION LIVE EVENTS — Simulated Real-Time Feed ───

export interface PublicationEvent {
  eventId: string;
  type: 'uploaded' | 'processing' | 'published' | 'failed' | 'optimized';
  videoId: string;
  title: string;
  playlistId: string;
  playlistName: string;
  timestamp: string;
  message: string;
  autoTrigger: string;
  status: 'pending' | 'completed' | 'error';
}

export const PUBLICATION_EVENTS: PublicationEvent[] = [
  {
    eventId: 'EVT-001', type: 'published', videoId: 'VID-001',
    title: 'LBC/FT 2026 — Nouvelles Exigences GAFI',
    playlistId: 'PL-001', playlistName: 'Conformité Réglementaire',
    timestamp: '2026-06-21T08:32:00Z',
    message: 'Vidéo publiée avec succès. 4 déclenchements auto activés : short 60s, article LinkedIn, blog post, email newsletter.',
    autoTrigger: 'short + linkedin + blog + newsletter',
    status: 'completed',
  },
  {
    eventId: 'EVT-002', type: 'published', videoId: 'VID-002',
    title: 'Ratio Solvabilité UEMOA 2026 — Guide Pratique',
    playlistId: 'PL-002', playlistName: 'Guides Pratiques',
    timestamp: '2026-06-21T09:15:00Z',
    message: 'Vidéo publiée. 3 déclenchements auto : short, LinkedIn, calculateur solvabilité (lead magnet).',
    autoTrigger: 'short + linkedin + lead-magnet',
    status: 'completed',
  },
  {
    eventId: 'EVT-003', type: 'published', videoId: 'VID-003',
    title: 'Régulation FinTech UEMOA 2026-2027',
    playlistId: 'PL-003', playlistName: 'FinTech & Innovation',
    timestamp: '2026-06-21T11:00:00Z',
    message: 'Vidéo publiée. 5 déclenchements auto : short + LinkedIn (3 posts) + blog + newsletter + série "FinTech Africa Decoded" épisode 1.',
    autoTrigger: 'short + linkedin(3) + blog + newsletter + serie-next',
    status: 'completed',
  },
  {
    eventId: 'EVT-004', type: 'optimized', videoId: 'VID-LEGACY-02',
    title: 'Prix de Transfert — 5 Erreurs Fatales',
    playlistId: 'PL-001', playlistName: 'Conformité Réglementaire',
    timestamp: '2026-06-21T12:00:00Z',
    message: 'Optimisation auto appliquée : nouveau thumbnail généré, titre SEO réécrit, chapitres ajoutés. Monitoring CTR 48h.',
    autoTrigger: 'thumbnail + title + chapters',
    status: 'completed',
  },
  {
    eventId: 'EVT-005', type: 'uploaded', videoId: 'VID-005',
    title: 'Cybersécurité Bancaire — Anticiper COBAC 2027',
    playlistId: 'PL-001', playlistName: 'Conformité Réglementaire',
    timestamp: '2026-06-21T14:30:00Z',
    message: 'Upload en cours. SEO en génération. Programmation prévue : 2026-06-22 08:00.',
    autoTrigger: 'seo + schedule',
    status: 'pending',
  },
];
export interface YoutubeAnalyticsResponse {
  success: boolean;
  channel: {
    channelId: string;
    name: string;
    handle: string;
  };
  period: string;
  summary: {
    totalViews: number;
    totalWatchTime: number;
    avgCTR: number;
    avgWatchTime: number;
    subscribersGained: number;
    subscribersLost: number;
    estimatedRevenue: number;
    totalLikes: number;
    totalComments: number;
    totalShares: number;
  };
  videos: VideoComparisonMetric[];
  topPerformers: { metric: string; videoId: string; title: string; value: number }[];
  error?: string;
}

export const LIVE_ANALYTICS_FALLBACK: YoutubeAnalyticsResponse = {
  success: true,
  channel: {
    channelId: 'UCjkq4dMhKIW1LbMNXYHjjLg',
    name: 'KHEPRA EXPERTS',
    handle: '@KHEPRAEXPERTS',
  },
  period: '30d',
  summary: {
    totalViews: 198450,
    totalWatchTime: 1886400,
    avgCTR: 8.7,
    avgWatchTime: 444,
    subscribersGained: 342,
    subscribersLost: 12,
    estimatedRevenue: 916.50,
    totalLikes: 2479,
    totalComments: 392,
    totalShares: 681,
  },
  videos: VIDEO_COMPARISON_DATA,
  topPerformers: [
    { metric: 'Vues', videoId: 'VID-003', title: 'Régulation FinTech UEMOA 2026-2027', value: 11580 },
    { metric: 'CTR', videoId: 'VID-003', title: 'Régulation FinTech UEMOA 2026-2027', value: 11.2 },
    { metric: 'Watch Time', videoId: 'VID-003', title: 'Régulation FinTech UEMOA 2026-2027', value: 120300 },
    { metric: 'Abonnés', videoId: 'VID-003', title: 'Régulation FinTech UEMOA 2026-2027', value: 156 },
  ],
};
export const OPTIMIZATION_ACTIONS: OptimizationAction[] = [
  {
    actionId: 'OPT-001', trigger: 'Sujet performant détecté',
    detection: 'Régulation FinTech UEMOA — CTR 11.2%, +156 abonnés en 24h, watch time 20min',
    action: 'Lancement nouvelle série "FinTech Africa Decoded" — 6 épisodes programmés',
    impact: 'Potentiel +500 abonnés/série, +15% watch time chaîne',
    automated: true, status: 'executed', createdAt: '2026-06-21T10:00:00Z',
  },
  {
    actionId: 'OPT-002', trigger: 'Sujet faible identifié',
    detection: 'Prix de Transfert — 5 Erreurs Fatales : CTR 7.5%, watch time 8min20, RPM 3.45€',
    action: 'Régénération thumbnail + optimisation titre SEO + ajout chapitres',
    impact: 'Estimation +2pp CTR, +1min30 watch time',
    automated: true, status: 'scheduled', createdAt: '2026-06-21T10:15:00Z',
  },
  {
    actionId: 'OPT-003', trigger: 'Opportunité émergente',
    detection: 'Mot-clé "open banking afrique francophone" en hausse +45% volume recherches',
    action: 'Création script "Open Banking en Afrique Francophone — Opportunités et Défis 2027"',
    impact: 'Positionnement first-mover sur sujet émergent',
    automated: true, status: 'detected', createdAt: '2026-06-21T10:30:00Z',
  },
  {
    actionId: 'OPT-004', trigger: 'Nouveau mot-clé SEO',
    detection: '"DORA Afrique" — 0 contenu YouTube, 1200 recherches/mois Google',
    action: 'Ajout au calendrier éditorial — capsule 10min "DORA Afrique : Ce que la Directive Européenne Change pour les Banques Africaines"',
    impact: 'Création contenu sur niche à 0 concurrence vidéo',
    automated: true, status: 'scheduled', createdAt: '2026-06-21T10:45:00Z',
  },
  {
    actionId: 'OPT-005', trigger: 'Sujet performant confirmé',
    detection: 'LBC/FT GAFI 2026 : CTR 10.4%, RPM 5.82€, +124 abonnés',
    action: 'Déclinaison en short 60s + capsule LinkedIn + article blog 3000 mots',
    impact: 'Écosystème contenu complet — synergie cross-plateforme',
    automated: true, status: 'executed', createdAt: '2026-06-21T11:00:00Z',
  },
  {
    actionId: 'OPT-006', trigger: 'Analyse tendances watch time',
    detection: 'Audience décroche après 12min sur vidéos > 15min',
    action: 'Restructuration scripts : hook toutes les 3min, durée cible 12-14min',
    impact: 'Projection +25% watch time moyen chaîne',
    automated: true, status: 'verified', createdAt: '2026-06-20T16:00:00Z',
  },
  {
    actionId: 'OPT-007', trigger: 'Détection gap contenu',
    detection: 'Recherches "ESG reporting Afrique" +320% mais 0 vidéo KHEPRA',
    action: 'Production accélérée : script → voix → vidéo en 4h',
    impact: 'Capture audience ESG Banking avant concurrence',
    automated: true, status: 'detected', createdAt: '2026-06-21T11:15:00Z',
  },
  {
    actionId: 'OPT-008', trigger: 'Optimisation playlist',
    detection: 'Playlist "Conformité Réglementaire" — retention 62% (cible 75%)',
    action: 'Réorganisation séquence vidéos + ajout vidéo introduction playlist',
    impact: '+13pp retention estimée, +20% vues suggérées',
    automated: false, status: 'scheduled', createdAt: '2026-06-21T11:30:00Z',
  },
];

// ─── WORKFLOWS CONFIG ───
export const PIPELINE_WORKFLOWS: PipelineWorkflow[] = [
  {
    workflowId: 'WF2-001', name: 'Veille Stratégique', icon: 'ri-radar-line', order: 1,
    description: 'Analyse quotidienne des tendances réglementaires BCEAO, FinTech, Gouvernance, Conformité. Scoring SEO/GEO/Viralité/Expertise. Identification automatique des sujets prioritaires.',
    status: 'active', executionCount: 128, successRate: 99.2, avgDuration: '4 min 12 s',
    lastRun: '2026-06-21T03:00:00Z', category: 'intelligence',
  },
  {
    workflowId: 'WF2-002', name: 'Génération des Scripts', icon: 'ri-file-text-line', order: 2,
    description: 'Production automatique de scripts : podcasts, capsules, formations, analyses, interviews simulées. Ton Big Four, référencement SEO/GEO avancé, structure pédagogique, citations sources.',
    status: 'active', executionCount: 94, successRate: 96.8, avgDuration: '8 min 30 s',
    lastRun: '2026-06-21T09:00:00Z', category: 'creation',
  },
  {
    workflowId: 'WF2-003', name: 'Génération Voix IA', icon: 'ri-mic-line', order: 3,
    description: 'Voice AI Studio — 6 profils vocaux calibrés. Génération, correction, normalisation, export. Contrôle fluidité, clarté, débit, intelligibilité.',
    status: 'active', executionCount: 82, successRate: 98.5, avgDuration: '5 min 45 s',
    lastRun: '2026-06-21T09:00:00Z', category: 'production',
  },
  {
    workflowId: 'WF2-004', name: 'Production Vidéo', icon: 'ri-movie-line', order: 4,
    description: 'Remotion + Chromium Headless + FFmpeg. Animations, génériques, transitions, infographies, sous-titres, habillage KHEPRA EXPERTS. Export 1080p/1440p/4K.',
    status: 'active', executionCount: 68, successRate: 94.2, avgDuration: '22 min 10 s',
    lastRun: '2026-06-21T08:30:00Z', category: 'production',
  },
  {
    workflowId: 'WF2-005', name: 'Génération SEO YouTube', icon: 'ri-search-eye-line', order: 5,
    description: 'Création automatique titres, descriptions, hashtags, mots-clés, chapitres, tags. Optimisation CTR, watch time, engagement, référencement.',
    status: 'active', executionCount: 72, successRate: 97.1, avgDuration: '3 min 20 s',
    lastRun: '2026-06-21T07:45:00Z', category: 'distribution',
  },
  {
    workflowId: 'WF2-006', name: 'Publication YouTube', icon: 'ri-upload-cloud-line', order: 6,
    description: 'OAuth 2.0 + YouTube Data API v3. Upload, programmation, classement playlists, écran de fin, fiches, commentaires épinglés. 100% automatisé.',
    status: 'active', executionCount: 156, successRate: 98.7, avgDuration: '2 min 05 s',
    lastRun: '2026-06-21T11:00:00Z', category: 'distribution',
  },
  {
    workflowId: 'WF2-007', name: 'Analytics', icon: 'ri-line-chart-line', order: 7,
    description: 'Récupération automatique : vues, CTR, watch time, abonnés, engagement, RPM. Calcul scores performance, SEO, GEO, autorité. Rapport quotidien.',
    status: 'active', executionCount: 210, successRate: 99.8, avgDuration: '42 s',
    lastRun: '2026-06-21T06:00:00Z', category: 'analysis',
  },
  {
    workflowId: 'WF2-008', name: 'Optimisation Continue', icon: 'ri-loop-left-line', order: 8,
    description: 'Détection automatique sujets performants/faibles, opportunités émergentes, nouveaux mots-clés. Déclenchement automatique nouveaux scripts, vidéos, séries.',
    status: 'optimizing', executionCount: 48, successRate: 91.7, avgDuration: '1 min 50 s',
    lastRun: '2026-06-21T11:30:00Z', category: 'optimization',
  },
];

// ─── PIPELINE VISUALIZATION — Live Production Line ───
export const PIPELINE_LINE = [
  { stage: 'Idée', icon: 'ri-lightbulb-line', count: 3, color: '#86BC25' },
  { stage: 'Script', icon: 'ri-file-text-line', count: 1, color: '#C2410C' },
  { stage: 'Voix', icon: 'ri-mic-line', count: 2, color: '#CA8A04' },
  { stage: 'Vidéo', icon: 'ri-movie-line', count: 2, color: '#FF0000' },
  { stage: 'SEO', icon: 'ri-search-eye-line', count: 1, color: '#0A66C2' },
  { stage: 'Publication', icon: 'ri-upload-cloud-line', count: 0, color: '#059669' },
  { stage: 'Analytics', icon: 'ri-line-chart-line', count: 7, color: '#D97757' },
  { stage: 'Optimisation', icon: 'ri-loop-left-line', count: 3, color: '#6B7280' },
];

// ─── CHANNEL GLOBAL STATS ───
export const CHANNEL_STATS = {
  totalVideos: 34,
  totalViews: 198450,
  totalWatchTime: '5 240 h',
  subscribers: 2840,
  subscribersGrowth30d: 342,
  avgCTR: 8.7,
  avgWatchTimePerVideo: '7 min 24 s',
  avgEngagement: 7.8,
  avgRPM: 4.62,
  brandAuthorityScore: 87,
  postsThisWeek: 4,
  postsScheduled: 3,
  pipelineQueue: 8,
};





