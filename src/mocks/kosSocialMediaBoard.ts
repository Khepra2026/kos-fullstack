export interface socialAgent {
  id: string;
  name: string;
  type: 'generation' | 'planification' | 'publication' | 'analyse' | 'moderation' | 'video';
  status: 'active' | 'idle' | 'error' | 'paused';
  platform: string[];
  instructions: string;
  last_run: string | null;
  next_run: string | null;
  tasks_completed: number;
  success_rate: number;
  content_types: string[];
  icon: string;
  color: string;
}

export interface SocialNetworkStatus {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
  posts_scheduled: number;
  posts_published_7d: number;
  engagement_rate: string;
  followers: number;
  best_times: string[];
  content_formats: string[];
  api_status: 'operational' | 'degraded' | 'down';
}

export interface ExecutionJob {
  id: string;
  agent_id: string;
  agent_name: string;
  type: 'text' | 'video' | 'carousel' | 'thread' | 'short';
  platform: string;
  title: string;
  status: 'queued' | 'generating' | 'scheduled' | 'published' | 'failed';
  progress: number;
  scheduled_for: string | null;
  published_at: string | null;
  error_message: string | null;
  content_preview: string;
  created_at: string;
}

export interface BoardStats {
  agents_active: number;
  agents_total: number;
  posts_planned_7d: number;
  posts_executed_7d: number;
  video_content_queued: number;
  text_content_queued: number;
  execution_success_rate: number;
  cross_network_reach: number;
}

export const KOS_SOCIAL_AGENTS: socialAgent[] = [
  {
    id: 'kos-social-content-generator',
    name: 'KOS Social Content Generator™',
    type: 'generation',
    status: 'active',
    platform: ['linkedin', 'x'],
    instructions: 'Génère 6 posts LinkedIn et 4 posts X par semaine depuis les articles KHEPRA. Format Big Four obligatoire : hook chiffré, corps structuré, CTA contextualisé, hashtags officiels.',
    last_run: '2026-07-08T03:00:00Z',
    next_run: '2026-07-09T03:00:00Z',
    tasks_completed: 312,
    success_rate: 94.2,
    content_types: ['Article Insight', 'Analyse Expert', 'Question Engagement', 'Thread X'],
    icon: 'ri-magic-line',
    color: '#7C3AED',
  },
  {
    id: 'kos-linkedin-publisher',
    name: 'KOS LinkedIn Publisher™',
    type: 'publication',
    status: 'active',
    platform: ['linkedin'],
    instructions: 'Publie automatiquement sur la page entreprise KHEPRA EXPERTS (linkedin.com/company/khepra-experts). Respecte les créneaux optimaux : Mar-Jeu 8h-10h GMT. Rate limit : max 6 posts/semaine.',
    last_run: '2026-07-08T08:00:00Z',
    next_run: '2026-07-09T08:00:00Z',
    tasks_completed: 189,
    success_rate: 98.4,
    content_types: ['Post Page Entreprise', 'Article Natif LinkedIn', 'Carrousel PDF'],
    icon: 'ri-linkedin-fill',
    color: '#0A66C2',
  },
  {
    id: 'kos-social-copy',
    name: 'KOS Social Copy Engine™',
    type: 'generation',
    status: 'active',
    platform: ['linkedin', 'x', 'facebook'],
    instructions: 'Génère des copies sociales niveau Big Four depuis les pages Knowledge Base. Structure obligatoire : Hook < 100 car., Corps > 50 mots, 3-6 hashtags, CTA avec bénéfice chiffré.',
    last_run: '2026-07-08T02:00:00Z',
    next_run: '2026-07-09T02:00:00Z',
    tasks_completed: 456,
    success_rate: 91.8,
    content_types: ['Post LinkedIn', 'Tweet/X', 'Post Facebook', 'Instagram Caption'],
    icon: 'ri-quill-pen-line',
    color: '#059669',
  },
  {
    id: 'kos-youtube-publisher',
    name: 'KOS YouTube Publisher™',
    type: 'video',
    status: 'active',
    platform: ['youtube'],
    instructions: 'Génère scripts vidéo, descriptions SEO, tags optimisés, et briefs miniatures pour la chaîne @KHEPRAEXPERTS. Publie 4 vidéos/semaine : 2 analyses, 1 guide, 1 short.',
    last_run: '2026-07-07T15:00:00Z',
    next_run: '2026-07-08T15:00:00Z',
    tasks_completed: 94,
    success_rate: 89.7,
    content_types: ['Analyse Réglementaire', 'Guide Pratique', 'Short Impact', 'Étude de Cas'],
    icon: 'ri-youtube-fill',
    color: '#FF0000',
  },
  {
    id: 'kos-lead-magnet-distributor',
    name: 'KOS Lead Magnet Distributor™',
    type: 'planification',
    status: 'active',
    platform: ['linkedin'],
    instructions: 'Orchestre les campagnes de distribution de Lead Magnets sur LinkedIn. 3 phases par aimant : Teaser → Insight → CTA Download. 17 posts programmés sur 13 jours.',
    last_run: '2026-07-08T08:30:00Z',
    next_run: '2026-07-09T08:00:00Z',
    tasks_completed: 27,
    success_rate: 96.3,
    content_types: ['Teaser Lead Magnet', 'Insight Erreurs', 'CTA Download', 'Question Engagement'],
    icon: 'ri-download-2-line',
    color: '#D97706',
  },
  {
    id: 'kos-linkedin-social-selling-engine',
    name: 'KOS LinkedIn SSE™',
    type: 'planification',
    status: 'active',
    platform: ['linkedin'],
    instructions: 'Audit 7 points obligatoire avant publication. Scoring 5 dimensions. Blocage si score < 90/100. 10 livrables par article : Hook, Post, Dirigeant, Page, Commentaire, Article natif, Bannière, Carrousel, Hashtags, URL trackée.',
    last_run: '2026-07-07T14:00:00Z',
    next_run: '2026-07-08T14:00:00Z',
    tasks_completed: 142,
    success_rate: 92.5,
    content_types: ['Post Audité 90+', 'Carrousel Big Four', 'Article Natif', 'Commentaire Amplification'],
    icon: 'ri-shield-check-line',
    color: '#059669',
  },
  {
    id: 'kos-social-scheduler',
    name: 'KOS Social Scheduler™',
    type: 'planification',
    status: 'active',
    platform: ['linkedin', 'x', 'youtube'],
    instructions: 'Planifie automatiquement les posts sur les créneaux optimaux. LinkedIn : Lun-Ven 8h/12h GMT. X : Mar-Jeu 10h/12h GMT. YouTube : Mar-Jeu 10h/15h GMT. Évite les conflits de planning.',
    last_run: '2026-07-08T01:00:00Z',
    next_run: '2026-07-09T01:00:00Z',
    tasks_completed: 528,
    success_rate: 99.2,
    content_types: ['Planification Horaire', 'Résolution Conflits', 'Ajustement Créneaux'],
    icon: 'ri-calendar-schedule-line',
    color: '#2563EB',
  },
  {
    id: 'kos-social-quality-engine',
    name: 'KOS Social Quality Engine™',
    type: 'moderation',
    status: 'active',
    platform: ['linkedin', 'x', 'youtube', 'facebook'],
    instructions: 'Vérifie la qualité Big Four de chaque post avant publication : conformité hashtags, liens valides, ton institutionnel, orthographe, longueur optimale, présence CTA.',
    last_run: '2026-07-08T07:55:00Z',
    next_run: '2026-07-08T11:55:00Z',
    tasks_completed: 687,
    success_rate: 97.8,
    content_types: ['Validation Qualité', 'Correction Orthographe', 'Optimisation Hashtags', 'Vérification Liens'],
    icon: 'ri-shield-star-line',
    color: '#DC2626',
  },
  {
    id: 'kos-x-auto-generator',
    name: 'KOS X/Twitter Auto Gen™',
    type: 'generation',
    status: 'active',
    platform: ['x'],
    instructions: 'Convertit les articles KHEPRA en threads X de 3-5 tweets. Format : Tweet 1 = stat choc, Tweet 2-3 = insights, Dernier tweet = CTA. Max 280 car. par tweet.',
    last_run: '2026-07-08T04:00:00Z',
    next_run: '2026-07-09T04:00:00Z',
    tasks_completed: 178,
    success_rate: 88.4,
    content_types: ['Thread X 3-5 tweets', 'Tweet Stats Choc', 'Tweet Citation Expert'],
    icon: 'ri-twitter-x-fill',
    color: '#1A1A1A',
  },
  {
    id: 'kos-video-brief-generator',
    name: 'KOS Video Brief Generator™',
    type: 'video',
    status: 'idle',
    platform: ['youtube'],
    instructions: 'Génère des briefs vidéo complets : sujet, angle, durée cible, script 3 actes, points clés, visuels suggérés,CTA final. Alimente le pipeline YouTube + Remotion.',
    last_run: '2026-07-07T10:00:00Z',
    next_run: '2026-07-09T10:00:00Z',
    tasks_completed: 62,
    success_rate: 85.5,
    content_types: ['Brief Vidéo Complet', 'Script 3 Actes', 'Direction Visuelle'],
    icon: 'ri-film-line',
    color: '#FF0000',
  },
];

export const SOCIAL_NETWORKS: SocialNetworkStatus[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'ri-linkedin-fill',
    color: '#0A66C2',
    connected: true,
    posts_scheduled: 19,
    posts_published_7d: 7,
    engagement_rate: '4.2%',
    followers: 3120,
    best_times: ['Mardi 8h GMT', 'Mercredi 12h GMT', 'Jeudi 8h GMT'],
    content_formats: ['Post Texte', 'Article Natif', 'Carrousel PDF', 'Document Upload'],
    api_status: 'operational',
  },
  {
    id: 'x',
    name: 'X / Twitter',
    icon: 'ri-twitter-x-fill',
    color: '#1A1A1A',
    connected: true,
    posts_scheduled: 8,
    posts_published_7d: 4,
    engagement_rate: '2.8%',
    followers: 892,
    best_times: ['Mardi 10h GMT', 'Jeudi 12h GMT'],
    content_formats: ['Tweet', 'Thread 3-5', 'Poll'],
    api_status: 'operational',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'ri-youtube-fill',
    color: '#FF0000',
    connected: true,
    posts_scheduled: 4,
    posts_published_7d: 2,
    engagement_rate: '3.1%',
    followers: 1340,
    best_times: ['Mardi 10h GMT', 'Jeudi 15h GMT'],
    content_formats: ['Analyse (8-12min)', 'Guide (5-8min)', 'Short (<60s)', 'Étude de Cas (6-10min)'],
    api_status: 'operational',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'ri-facebook-fill',
    color: '#1877F2',
    connected: false,
    posts_scheduled: 0,
    posts_published_7d: 0,
    engagement_rate: 'N/A',
    followers: 0,
    best_times: [],
    content_formats: [],
    api_status: 'down',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'ri-instagram-line',
    color: '#E4405F',
    connected: false,
    posts_scheduled: 0,
    posts_published_7d: 0,
    engagement_rate: 'N/A',
    followers: 0,
    best_times: [],
    content_formats: [],
    api_status: 'down',
  },
];

export const EXECUTION_JOBS: ExecutionJob[] = [
  {
    id: 'JOB-2026-07-08-001',
    agent_id: 'kos-social-content-generator',
    agent_name: 'KOS Social Content Generator™',
    type: 'text',
    platform: 'linkedin',
    title: 'Post LinkedIn — Guide Cartographie Risques BCEAO 2026',
    status: 'scheduled',
    progress: 100,
    scheduled_for: '2026-07-09T08:00:00Z',
    published_at: null,
    error_message: null,
    content_preview: '🔍 Cartographie des Risques BCEAO 2026 — 90% des institutions...',
    created_at: '2026-07-08T03:00:00Z',
  },
  {
    id: 'JOB-2026-07-08-002',
    agent_id: 'kos-youtube-publisher',
    agent_name: 'KOS YouTube Publisher™',
    type: 'video',
    platform: 'youtube',
    title: 'Analyse Vidéo — Directive COBAC 2027 Cybersécurité',
    status: 'generating',
    progress: 65,
    scheduled_for: '2026-07-10T10:00:00Z',
    published_at: null,
    error_message: null,
    content_preview: '🎬 Script : 3 actes · 10 min · Montage en cours (Remotion)...',
    created_at: '2026-07-08T06:00:00Z',
  },
  {
    id: 'JOB-2026-07-08-003',
    agent_id: 'kos-x-auto-generator',
    agent_name: 'KOS X/Twitter Auto Gen™',
    type: 'thread',
    platform: 'x',
    title: 'Thread X — Finance Islamique UEMOA : 3 Instructions BCEAO',
    status: 'queued',
    progress: 0,
    scheduled_for: '2026-07-09T10:00:00Z',
    published_at: null,
    error_message: null,
    content_preview: '🧵 Thread : 4 tweets · Instruction 003/004/005-2018 BCEAO...',
    created_at: '2026-07-08T04:00:00Z',
  },
  {
    id: 'JOB-2026-07-08-004',
    agent_id: 'kos-lead-magnet-distributor',
    agent_name: 'KOS Lead Magnet Distributor™',
    type: 'text',
    platform: 'linkedin',
    title: 'CTA Download — Simulation Risque Réglementaire',
    status: 'published',
    progress: 100,
    scheduled_for: '2026-07-08T08:30:00Z',
    published_at: '2026-07-08T08:30:05Z',
    error_message: null,
    content_preview: '💸 Une non-conformité coûte 2-5x l\'amende...',
    created_at: '2026-07-08T01:00:00Z',
  },
  {
    id: 'JOB-2026-07-08-005',
    agent_id: 'kos-social-quality-engine',
    agent_name: 'KOS Social Quality Engine™',
    type: 'text',
    platform: 'linkedin',
    title: 'Validation Qualité — Post Audit Gouvernance OHADA',
    status: 'generating',
    progress: 85,
    scheduled_for: '2026-07-08T09:00:00Z',
    published_at: null,
    error_message: null,
    content_preview: '✅ Hashtags OK · ✅ Liens valides · ⚠️ Ton à ajuster...',
    created_at: '2026-07-08T07:55:00Z',
  },
  {
    id: 'JOB-2026-07-08-006',
    agent_id: 'kos-video-brief-generator',
    agent_name: 'KOS Video Brief Generator™',
    type: 'short',
    platform: 'youtube',
    title: 'Short Impact — 5 Erreurs Fatales Prix de Transfert BEPS',
    status: 'queued',
    progress: 0,
    scheduled_for: '2026-07-11T14:30:00Z',
    published_at: null,
    error_message: null,
    content_preview: '📱 Short 60s · 5 erreurs · Visuel impact "500M FCFA"...',
    created_at: '2026-07-08T08:00:00Z',
  },
  {
    id: 'JOB-2026-07-08-007',
    agent_id: 'kos-social-scheduler',
    agent_name: 'KOS Social Scheduler™',
    type: 'text',
    platform: 'linkedin',
    title: 'Planification Hebdo S28 — 6 LinkedIn + 4 X + 2 YouTube',
    status: 'published',
    progress: 100,
    scheduled_for: '2026-07-08T01:00:00Z',
    published_at: '2026-07-08T01:00:12Z',
    error_message: null,
    content_preview: '📅 S28 planifiée : Lun-Ven · 0 conflit · Créneaux optimaux',
    created_at: '2026-07-08T00:30:00Z',
  },
  {
    id: 'JOB-2026-07-08-008',
    agent_id: 'kos-linkedin-social-selling-engine',
    agent_name: 'KOS LinkedIn SSE™',
    type: 'carousel',
    platform: 'linkedin',
    title: 'Carrousel Big Four — Protection Données Personnelles UEMOA',
    status: 'scheduled',
    progress: 100,
    scheduled_for: '2026-07-09T12:00:00Z',
    published_at: null,
    error_message: null,
    content_preview: '🎠 5 slides · Score 92/100 · Audit 7/7 validé...',
    created_at: '2026-07-08T05:00:00Z',
  },
  {
    id: 'JOB-2026-07-08-009',
    agent_id: 'kos-social-content-generator',
    agent_name: 'KOS Social Content Generator™',
    type: 'text',
    platform: 'linkedin',
    title: 'Post LinkedIn — ESG Banques Africaines Standards ISSB',
    status: 'failed',
    progress: 45,
    scheduled_for: '2026-07-08T12:00:00Z',
    published_at: null,
    error_message: 'Erreur génération : source_url inaccessible (timeout 30s). Retry automatique dans 15 min.',
    content_preview: '🌱 ESG Banques Africaines — Standards ISSB 2026...',
    created_at: '2026-07-08T03:00:00Z',
  },
  {
    id: 'JOB-2026-07-08-010',
    agent_id: 'kos-linkedin-publisher',
    agent_name: 'KOS LinkedIn Publisher™',
    type: 'text',
    platform: 'linkedin',
    title: 'Publication — Template Audit Gouvernance (CTA Question)',
    status: 'queued',
    progress: 0,
    scheduled_for: '2026-07-08T12:00:00Z',
    published_at: null,
    error_message: null,
    content_preview: '🤔 Votre CA passerait-il un audit OHADA ? Template gratuit...',
    created_at: '2026-07-08T09:00:00Z',
  },
];

export const BOARD_STATS: BoardStats = {
  agents_active: 9,
  agents_total: 10,
  posts_planned_7d: 31,
  posts_executed_7d: 13,
  video_content_queued: 4,
  text_content_queued: 15,
  execution_success_rate: 87.5,
  cross_network_reach: 48400,
};

export const AUTO_INSTRUCT_PROMPTS = [
  {
    id: 'instruct-weekly-plan',
    label: 'Planification Hebdomadaire Complète',
    description: 'Lance la planification automatique de la semaine : 6 LinkedIn + 4 X + 4 YouTube. Créneaux optimaux, hashtags, CTA.',
    agent_ids: ['kos-social-scheduler', 'kos-social-content-generator', 'kos-x-auto-generator', 'kos-video-brief-generator'],
    icon: 'ri-calendar-check-line',
  },
  {
    id: 'instruct-linkedin-batch',
    label: 'Batch LinkedIn — 6 Posts Big Four',
    description: 'Génère et audite 6 posts LinkedIn depuis les derniers articles KHEPRA. Scoring 7 points, seuil 90/100.',
    agent_ids: ['kos-social-content-generator', 'kos-linkedin-social-selling-engine', 'kos-social-quality-engine'],
    icon: 'ri-linkedin-fill',
  },
  {
    id: 'instruct-youtube-week',
    label: 'Pipeline YouTube — 4 Vidéos',
    description: 'Génère 4 briefs vidéo (2 analyses, 1 guide, 1 short), scripts, miniatures, et planifie la publication.',
    agent_ids: ['kos-video-brief-generator', 'kos-youtube-publisher'],
    icon: 'ri-youtube-fill',
  },
  {
    id: 'instruct-x-threads',
    label: 'Threads X — 4 Threads/Semaine',
    description: 'Convertit 4 articles en threads X de 3-5 tweets avec stats choc, insights, et CTA.',
    agent_ids: ['kos-x-auto-generator', 'kos-social-quality-engine'],
    icon: 'ri-twitter-x-fill',
  },
  {
    id: 'instruct-quality-sweep',
    label: 'Sweep Qualité — Tous Réseaux',
    description: 'Lance un audit qualité complet sur tous les posts en file d\'attente : liens, hashtags, orthographe, ton.',
    agent_ids: ['kos-social-quality-engine'],
    icon: 'ri-shield-star-line',
  },
  {
    id: 'instruct-full-auto',
    label: 'Mode FULL AUTO — Tous Réseaux',
    description: 'Active le mode automatique complet : planification → génération → audit → publication. Zéro intervention humaine.',
    agent_ids: ['kos-social-scheduler', 'kos-social-content-generator', 'kos-x-auto-generator', 'kos-youtube-publisher', 'kos-video-brief-generator', 'kos-linkedin-social-selling-engine', 'kos-social-quality-engine', 'kos-lead-magnet-distributor', 'kos-linkedin-publisher'],
    icon: 'ri-rocket-2-line',
  },
];

export const CONTENT_CALENDAR_WEEK = [
  { day: 'Lundi 13 Juil', slots: [
    { time: '08:00', platform: 'linkedin', type: 'Article Insight', title: 'Réforme Ratio Solvabilité UEMOA 2026', agent: 'kos-social-content-generator', status: 'planifié' },
    { time: '12:00', platform: 'linkedin', type: 'Lead Magnet CTA', title: 'Guide BCEAO 2026 — Download', agent: 'kos-lead-magnet-distributor', status: 'planifié' },
    { time: '15:00', platform: 'youtube', type: 'Analyse Réglementaire', title: 'LBC/FT 2026 : Nouvelles Exigences GAFI', agent: 'kos-youtube-publisher', status: 'en_generation' },
  ]},
  { day: 'Mardi 14 Juil', slots: [
    { time: '10:00', platform: 'x', type: 'Thread Stats Choc', title: 'Cybersécurité Bancaire COBAC 2027', agent: 'kos-x-auto-generator', status: 'planifié' },
    { time: '14:00', platform: 'x', type: 'Thread Framework', title: 'KOS Cyber Resilience Maturity Model™', agent: 'kos-x-auto-generator', status: 'planifié' },
  ]},
  { day: 'Mercredi 15 Juil', slots: [
    { time: '08:00', platform: 'linkedin', type: 'Analyse Expert', title: 'Prix de Transfert : 5 Erreurs Fatales BEPS', agent: 'kos-linkedin-social-selling-engine', status: 'en_audit' },
    { time: '12:00', platform: 'linkedin', type: 'Question Engagement', title: 'Votre documentation BEPS est-elle prête ?', agent: 'kos-social-content-generator', status: 'planifié' },
  ]},
  { day: 'Jeudi 16 Juil', slots: [
    { time: '10:00', platform: 'youtube', type: 'Guide Pratique', title: 'Préparer son CA à l\'Inspection COBAC', agent: 'kos-youtube-publisher', status: 'planifié' },
    { time: '12:00', platform: 'x', type: 'Tweet Citation', title: 'Directive COBAC 2027 — Citation Expert', agent: 'kos-x-auto-generator', status: 'planifié' },
    { time: '14:30', platform: 'youtube', type: 'Short Impact', title: 'Gouvernance : l\'Erreur Fatale (60s)', agent: 'kos-video-brief-generator', status: 'planifié' },
  ]},
  { day: 'Vendredi 17 Juil', slots: [
    { time: '08:00', platform: 'linkedin', type: 'Étude de Cas', title: 'Comment une FinTech a obtenu son Agrément en 90j', agent: 'kos-social-content-generator', status: 'planifié' },
    { time: '12:00', platform: 'linkedin', type: 'Positionnement', title: 'KHEPRA EXPERTS — Leader Conformité UEMOA/CEMAC', agent: 'kos-linkedin-publisher', status: 'planifié' },
  ]},
];





