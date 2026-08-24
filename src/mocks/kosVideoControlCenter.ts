export interface AgentJob {
  id: string;
  video_id: string;
  agent_name: string;
  status: 'pending' | 'running' | 'success' | 'error' | 'human_review';
  progress_pct: number;
  message: string;
  started_at: string | null;
  ended_at: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface VideoRecord {
  id: string;
  titre: string;
  regulateur: string;
  status: string;
  yt_video_id: string | null;
  scheduled_at: string | null;
  target_timezone: string | null;
  target_country: string | null;
  published_at: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  duration_sec: number | null;
  created_at: string;
}

export interface PublicationSlot {
  id: string;
  country_code: string;
  timezone: string;
  slot_name: string;
  hour_local: number;
  minute_local: number;
  days_of_week: number[];
  is_active: boolean;
}

export interface YTComment {
  id: string;
  video_id: string;
  author_display_name: string;
  text_original: string;
  published_at: string;
  like_count: number;
  agent_status: 'pending' | 'replied' | 'lead_detected' | 'ignored';
  agent_reply: string | null;
  hubspot_lead_id: string | null;
  created_at: string;
}

export interface VideoIdea {
  id: string;
  source: string;
  question: string;
  video_source_id: string | null;
  status: 'backlog' | 'planned' | 'done';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}

export interface YouTubeComment {
  id: string;
  video_id: string;
  yt_comment_id: string;
  author_display_name: string;
  text_original: string;
  published_at: string;
  like_count: number;
  classification: 'LEAD' | 'QUESTION' | 'COMPLIMENT' | 'SPAM' | null;
  llm_reply: string | null;
  reply_posted: boolean;
  hubspot_contact_id: string | null;
  created_at: string;
}

export const AGENT_NAMES = [
  { key: 'veille', label: 'Veille', icon: 'ri-radar-line', color: '#D4AF37' },
  { key: 'recherche', label: 'Recherche RAG', icon: 'ri-search-line', color: '#3498db' },
  { key: 'factcheck', label: 'Fact-Check', icon: 'ri-check-double-line', color: '#86BC25' },
  { key: 'script', label: 'Script', icon: 'ri-file-text-line', color: '#e67e22' },
  { key: 'video', label: 'Rendu Vidéo', icon: 'ri-film-line', color: '#FF0000' },
  { key: 'seo', label: 'SEO YouTube', icon: 'ri-youtube-fill', color: '#e74c3c' },
  { key: 'publish', label: 'Publication', icon: 'ri-globe-line', color: '#2E8B57' },
  { key: 'diffuse', label: 'Diffusion', icon: 'ri-share-line', color: '#7C3AED' },
  { key: 'community', label: 'Community', icon: 'ri-chat-3-line', color: '#0A66C2' },
];

export const COUNTRIES = [
  { code: 'SN', name: 'Sénégal', tz: 'Africa/Dakar', flag: '🇸🇳', color: '#009739' },
  { code: 'CI', name: 'Côte d\'Ivoire', tz: 'Africa/Abidjan', flag: '🇨🇮', color: '#F77F00' },
  { code: 'CM', name: 'Cameroun', tz: 'Africa/Douala', flag: '🇨🇲', color: '#007A5E' },
  { code: 'FR', name: 'France', tz: 'Europe/Paris', flag: '🇫🇷', color: '#002395' },
  { code: 'CA', name: 'Canada QC', tz: 'America/Toronto', flag: '🇨🇦', color: '#D52B1E' },
  { code: 'GA', name: 'Gabon', tz: 'Africa/Libreville', flag: '🇬🇦', color: '#009E60' },
  { code: 'BJ', name: 'Bénin', tz: 'Africa/Porto-Novo', flag: '🇧🇯', color: '#008751' },
  { code: 'BF', name: 'Burkina Faso', tz: 'Africa/Ouagadougou', flag: '🇧🇫', color: '#EF2B2D' },
];

export const MOCK_VIDEOS: VideoRecord[] = [
  {
    id: 'v-001',
    titre: 'Instruction BCEAO N°007-2026 : Nouveau dispositif KYC renforcé',
    regulateur: 'BCEAO',
    status: 'published',
    yt_video_id: 'yt_abc123',
    scheduled_at: '2026-07-10T19:00:00Z',
    target_timezone: 'Africa/Dakar',
    target_country: 'SN',
    published_at: '2026-07-10T19:01:00Z',
    video_url: 'https://youtube.com/watch?v=abc123',
    thumbnail_url: null,
    duration_sec: 187,
    created_at: '2026-07-08T08:00:00Z',
  },
  {
    id: 'v-002',
    titre: 'COBAC R-2026/03 : Gouvernance des établissements de microfinance',
    regulateur: 'COBAC',
    status: 'processing',
    yt_video_id: null,
    scheduled_at: '2026-07-15T08:00:00Z',
    target_timezone: 'Europe/Paris',
    target_country: 'FR',
    published_at: null,
    video_url: null,
    thumbnail_url: null,
    duration_sec: null,
    created_at: '2026-07-08T10:30:00Z',
  },
  {
    id: 'v-003',
    titre: 'Normes IFRS 9 : Provisionnement des créances en souffrance — Application UEMOA',
    regulateur: 'IFRS',
    status: 'draft',
    yt_video_id: null,
    scheduled_at: null,
    target_timezone: null,
    target_country: null,
    published_at: null,
    video_url: null,
    thumbnail_url: null,
    duration_sec: null,
    created_at: '2026-07-08T12:00:00Z',
  },
];

export const MOCK_JOBS: AgentJob[] = [
  { id: 'j-01', video_id: 'v-001', agent_name: 'veille', status: 'success', progress_pct: 100, message: 'Veille BCEAO : 3 nouvelles circulaires détectées', started_at: '2026-07-08T08:05:00Z', ended_at: '2026-07-08T08:06:30Z', metadata: { sources: ['BCEAO-007-2026', 'BCEAO-008-2026'] }, created_at: '2026-07-08T08:05:00Z' },
  { id: 'j-02', video_id: 'v-001', agent_name: 'recherche', status: 'success', progress_pct: 100, message: 'Sources réglementaires rassemblées (5 documents)', started_at: '2026-07-08T08:06:31Z', ended_at: '2026-07-08T08:08:00Z', metadata: { sources_count: 5 }, created_at: '2026-07-08T08:06:31Z' },
  { id: 'j-03', video_id: 'v-001', agent_name: 'factcheck', status: 'success', progress_pct: 100, message: 'Vérification factuelle : 8/8 claims validés (confiance 95%)', started_at: '2026-07-08T08:08:01Z', ended_at: '2026-07-08T08:09:15Z', metadata: { confidence: 0.95, verified_claims: 8 }, created_at: '2026-07-08T08:08:01Z' },
  { id: 'j-04', video_id: 'v-001', agent_name: 'script', status: 'success', progress_pct: 100, message: 'Script narratif généré (2 400 caractères)', started_at: '2026-07-08T08:09:16Z', ended_at: '2026-07-08T08:10:30Z', metadata: { character_count: 2400 }, created_at: '2026-07-08T08:09:16Z' },
  { id: 'j-05', video_id: 'v-001', agent_name: 'video', status: 'success', progress_pct: 100, message: 'MP4 prêt — 187s, 1080p, WebM VP9', started_at: '2026-07-08T08:10:31Z', ended_at: '2026-07-08T08:13:00Z', metadata: { s3_url: 'https://storage/abc123.webm', duree: 187, resolution: '1080p' }, created_at: '2026-07-08T08:10:31Z' },
  { id: 'j-06', video_id: 'v-001', agent_name: 'seo', status: 'success', progress_pct: 100, message: 'SEO YouTube optimisé — 12 tags, score 92/100', started_at: '2026-07-08T08:13:01Z', ended_at: '2026-07-08T08:13:45Z', metadata: { tags: ['BCEAO', 'KYC', 'conformité'], seo_score: 92 }, created_at: '2026-07-08T08:13:01Z' },
  { id: 'j-07', video_id: 'v-001', agent_name: 'publish', status: 'success', progress_pct: 100, message: 'Publié sur YouTube @KHEPRAEXPERTS', started_at: '2026-07-08T08:13:46Z', ended_at: '2026-07-08T08:14:30Z', metadata: { platform: 'youtube', yt_video_id: 'yt_abc123' }, created_at: '2026-07-08T08:13:46Z' },
  { id: 'j-08', video_id: 'v-001', agent_name: 'diffuse', status: 'success', progress_pct: 100, message: 'Diffusé sur LinkedIn, X/Twitter, YouTube Community', started_at: '2026-07-08T08:14:31Z', ended_at: '2026-07-08T08:15:00Z', metadata: { channels: ['LinkedIn', 'Twitter/X', 'YouTube Community'] }, created_at: '2026-07-08T08:14:31Z' },
  { id: 'j-09', video_id: 'v-002', agent_name: 'veille', status: 'success', progress_pct: 100, message: 'Veille COBAC : 2 nouveaux textes', started_at: '2026-07-08T10:31:00Z', ended_at: '2026-07-08T10:32:00Z', metadata: {}, created_at: '2026-07-08T10:31:00Z' },
  { id: 'j-10', video_id: 'v-002', agent_name: 'recherche', status: 'success', progress_pct: 100, message: '4 sources COBAC identifiées', started_at: '2026-07-08T10:32:01Z', ended_at: '2026-07-08T10:33:30Z', metadata: {}, created_at: '2026-07-08T10:32:01Z' },
  { id: 'j-11', video_id: 'v-002', agent_name: 'factcheck', status: 'running', progress_pct: 65, message: 'Vérification factuelle en cours (5/8 claims)', started_at: '2026-07-08T10:33:31Z', ended_at: null, metadata: {}, created_at: '2026-07-08T10:33:31Z' },
  { id: 'j-12', video_id: 'v-002', agent_name: 'script', status: 'pending', progress_pct: 0, message: 'En attente du fact-check', started_at: null, ended_at: null, metadata: {}, created_at: '2026-07-08T10:33:31Z' },
];

export const MOCK_COMMENTS: YouTubeComment[] = [
  {
    id: 'c-001', video_id: 'v-001', yt_comment_id: 'yt_c_001',
    author_display_name: 'Amadou Diallo', text_original: 'Très instructif ! Est-ce que cette instruction s\'applique aussi aux SFD de moins de 2 milliards de FCFA d\'actifs ?',
    published_at: '2026-07-11T09:00:00Z', like_count: 12,
    classification: 'QUESTION', llm_reply: 'Bonjour Amadou, excellente question. L\'instruction N°007-2026 s\'applique à tous les assujettis, y compris les SFD. Le seuil de 2 milliards concerne les obligations renforcées (article 12). Plus de détails : khepraexperts.com/faq-kyc', reply_posted: true, hubspot_contact_id: null,
    created_at: '2026-07-11T09:00:00Z',
  },
  {
    id: 'c-002', video_id: 'v-001', yt_comment_id: 'yt_c_002',
    author_display_name: 'Fatou Cissé - CFO', text_original: 'Nous préparons notre mise en conformité KYC chez BICICI. Pouvez-vous nous accompagner sur un diagnostic ? Contactez-moi : f.cisse@bicici.ci',
    published_at: '2026-07-11T10:30:00Z', like_count: 5,
    classification: 'LEAD', llm_reply: null, reply_posted: false, hubspot_contact_id: 'hs_contact_456',
    created_at: '2026-07-11T10:30:00Z',
  },
  {
    id: 'c-003', video_id: 'v-001', yt_comment_id: 'yt_c_003',
    author_display_name: 'Koffi A.', text_original: 'Super contenu comme d\'habitude ! Vous êtes la référence sur la réglementation UEMOA 🔥',
    published_at: '2026-07-11T14:15:00Z', like_count: 23,
    classification: 'COMPLIMENT', llm_reply: 'Merci Koffi pour votre fidélité ! Nous publions chaque semaine pour vous tenir informé des évolutions réglementaires.', reply_posted: true, hubspot_contact_id: null,
    created_at: '2026-07-11T14:15:00Z',
  },
  {
    id: 'c-004', video_id: 'v-001', yt_comment_id: 'yt_c_004',
    author_display_name: 'Jean-Marc Kouassi', text_original: 'Je suis DAF chez Ecobank Côte d\'Ivoire. Nous cherchons un cabinet pour notre audit de conformité LCB-FT. Pouvez-vous nous envoyer une proposition ? jm.kouassi@ecobank.ci',
    published_at: '2026-07-12T08:00:00Z', like_count: 3,
    classification: 'LEAD', llm_reply: null, reply_posted: false, hubspot_contact_id: 'hs_contact_789',
    created_at: '2026-07-12T08:00:00Z',
  },
  {
    id: 'c-005', video_id: 'v-001', yt_comment_id: 'yt_c_005',
    author_display_name: 'SpammerBot42', text_original: 'Gagnez 10000€ par jour avec notre méthode miracle !!! Cliquez ici ➡️ http://spam.xxx',
    published_at: '2026-07-12T11:00:00Z', like_count: 0,
    classification: 'SPAM', llm_reply: null, reply_posted: false, hubspot_contact_id: null,
    created_at: '2026-07-12T11:00:00Z',
  },
];

export const MOCK_YT_COMMENTS: YTComment[] = [
  {
    id: 'yt_c_lead_001', video_id: 'v-001',
    author_display_name: 'Fatou Cissé - CFO BICICI', text_original: 'Nous préparons notre mise en conformité KYC. Pouvez-vous nous accompagner sur un diagnostic ? Contactez-moi : f.cisse@bicici.ci',
    published_at: '2026-07-11T10:30:00Z', like_count: 5,
    agent_status: 'lead_detected', agent_reply: 'Merci Fatou Cissé - CFO BICICI. Votre demande relève d\'un accompagnement expert. Nos consultants RegTech peuvent vous aider sur ce sujet. Prenez RDV ici: khepraexperts.com/contact?src=yt&lead=hs_456', hubspot_lead_id: 'hs_contact_456',
    created_at: '2026-07-11T10:30:00Z',
  },
  {
    id: 'yt_c_lead_002', video_id: 'v-001',
    author_display_name: 'Jean-Marc Kouassi', text_original: 'Je suis DAF chez Ecobank Côte d\'Ivoire. Nous cherchons un cabinet pour notre audit de conformité LCB-FT. Pouvez-vous nous envoyer une proposition ? jm.kouassi@ecobank.ci',
    published_at: '2026-07-12T08:00:00Z', like_count: 3,
    agent_status: 'lead_detected', agent_reply: 'Merci Jean-Marc. Votre demande relève d\'un accompagnement expert. Nos consultants RegTech peuvent vous aider sur ce sujet. Prenez RDV ici: khepraexperts.com/contact?src=yt&lead=hs_789', hubspot_lead_id: 'hs_contact_789',
    created_at: '2026-07-12T08:00:00Z',
  },
  {
    id: 'yt_c_q_001', video_id: 'v-001',
    author_display_name: 'Amadou Diallo', text_original: 'Très instructif ! Est-ce que cette instruction s\'applique aussi aux SFD de moins de 2 milliards de FCFA d\'actifs ?',
    published_at: '2026-07-11T09:00:00Z', like_count: 12,
    agent_status: 'replied', agent_reply: 'Bonjour Amadou, excellente question. L\'instruction N°007-2026 s\'applique à tous les assujettis, y compris les SFD. Le seuil de 2 milliards concerne les obligations renforcées (article 12). Plus de détails : khepraexperts.com/faq-kyc', hubspot_lead_id: null,
    created_at: '2026-07-11T09:00:00Z',
  },
  {
    id: 'yt_c_eng_001', video_id: 'v-001',
    author_display_name: 'Koffi A.', text_original: 'Super contenu comme d\'habitude ! Vous êtes la référence sur la réglementation UEMOA 🔥',
    published_at: '2026-07-11T14:15:00Z', like_count: 23,
    agent_status: 'replied', agent_reply: 'Merci pour votre retour ! 🙏', hubspot_lead_id: null,
    created_at: '2026-07-11T14:15:00Z',
  },
  {
    id: 'yt_c_spam_001', video_id: 'v-001',
    author_display_name: 'SpammerBot42', text_original: 'Gagnez 10000€ par jour avec notre méthode miracle !!! Cliquez ici ➡️ http://spam.xxx',
    published_at: '2026-07-12T11:00:00Z', like_count: 0,
    agent_status: 'ignored', agent_reply: null, hubspot_lead_id: null,
    created_at: '2026-07-12T11:00:00Z',
  },
];

export const MOCK_VIDEO_IDEAS: VideoIdea[] = [
  {
    id: 'vi-001', source: 'youtube_comment',
    question: 'Est-ce que l\'instruction BCEAO N°007-2026 s\'applique aux SFD de moins de 2 milliards de FCFA d\'actifs ?',
    video_source_id: 'v-001', status: 'backlog', priority: 'high',
    created_at: '2026-07-11T09:30:00Z',
  },
  {
    id: 'vi-002', source: 'youtube_comment',
    question: 'Quelles sont les différences entre le dispositif KYC BCEAO et COBAC pour les établissements de microfinance ?',
    video_source_id: 'v-001', status: 'backlog', priority: 'medium',
    created_at: '2026-07-12T10:00:00Z',
  },
  {
    id: 'vi-003', source: 'crm',
    question: 'Comment préparer un audit de conformité LCB-FT pour une banque en zone UEMOA ?',
    video_source_id: null, status: 'planned', priority: 'high',
    created_at: '2026-07-08T14:00:00Z',
  },
];





