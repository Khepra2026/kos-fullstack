export interface VideoPerformance {
  id: string;
  title: string;
  publishedAt: string;
  duration: string;
  views: number;
  watchTime: number;
  avgViewDuration: string;
  retentionRate: number;
  likes: number;
  comments: number;
  shares: number;
  ctr: number;
  subscribersGained: number;
  trafficSources: {
    youtube_search: number;
    suggested_videos: number;
    external: number;
    direct: number;
  };
  topCountries: { country: string; views: number; pct: number }[];
  thumbnailUrl: string;
}

export interface ChannelKPI {
  totalViews: number;
  totalWatchTime: number;
  subscribers: number;
  subscribersGained30d: number;
  avgViewDuration: string;
  avgCtr: number;
  totalVideos: number;
  publishedVideos: number;
  scheduledVideos: number;
  revenueEstimated: string;
  leadsGenerated: number;
  leadsConverted: number;
  conversionRate: number;
  daysToMonetization: number;
  monetizationStatus: 'eligible' | 'in_progress' | 'not_eligible';
}

export interface AudienceInsight {
  ageGroup: string;
  percentage: number;
  label: string;
}

export const CHANNEL_OVERALL_KPI: ChannelKPI = {
  totalViews: 45780,
  totalWatchTime: 384200,
  subscribers: 1240,
  subscribersGained30d: 340,
  avgViewDuration: '4:12',
  avgCtr: 6.8,
  totalVideos: 22,
  publishedVideos: 8,
  scheduledVideos: 4,
  revenueEstimated: 'Non activé',
  leadsGenerated: 28,
  leadsConverted: 4,
  conversionRate: 14.3,
  daysToMonetization: 583,
  monetizationStatus: 'in_progress',
};

export const VIDEO_PERFORMANCES: VideoPerformance[] = [
  {
    id: 'vid-001',
    title: 'BCEAO — Nouvelles Exigences de Gouvernance : Ce qui Change en 2026',
    publishedAt: '2026-06-15T10:00:00Z',
    duration: '12:34',
    views: 8420,
    watchTime: 62400,
    avgViewDuration: '7:24',
    retentionRate: 58.9,
    likes: 312,
    comments: 47,
    shares: 89,
    ctr: 8.2,
    subscribersGained: 68,
    trafficSources: {
      youtube_search: 42,
      suggested_videos: 28,
      external: 18,
      direct: 12,
    },
    topCountries: [
      { country: 'Côte d\'Ivoire', views: 2100, pct: 25 },
      { country: 'Sénégal', views: 1680, pct: 20 },
      { country: 'France', views: 1260, pct: 15 },
      { country: 'Burkina Faso', views: 840, pct: 10 },
      { country: 'Mali', views: 670, pct: 8 },
    ],
    thumbnailUrl: 'https://readdy.ai/api/search-image?query=Professional%20YouTube%20thumbnail%20showing%20abstract%20governance%20and%20banking%20regulatory%20concepts%20with%20BCEAO%20logo%20aesthetics%20in%20warm%20gold%20and%20dark%20emerald%20tones%2C%20elegant%20institutional%20composition%2C%20financial%20regulation%20imagery%2C%20clean%20modern%20design%20with%20African%20financial%20district%20background%20elements&width=640&height=360&seq=yt-thumb-bceao-gov&orientation=landscape',
  },
  {
    id: 'vid-002',
    title: 'Stress Tests Climatiques : La Nouvelle Frontière du Pilier 2',
    publishedAt: '2026-06-12T14:00:00Z',
    duration: '8:17',
    views: 6230,
    watchTime: 38400,
    avgViewDuration: '6:10',
    retentionRate: 74.5,
    likes: 278,
    comments: 34,
    shares: 62,
    ctr: 7.5,
    subscribersGained: 52,
    trafficSources: {
      youtube_search: 35,
      suggested_videos: 32,
      external: 22,
      direct: 11,
    },
    topCountries: [
      { country: 'Sénégal', views: 1550, pct: 25 },
      { country: 'Côte d\'Ivoire', views: 1240, pct: 20 },
      { country: 'Cameroun', views: 930, pct: 15 },
      { country: 'Togo', views: 620, pct: 10 },
      { country: 'Bénin', views: 500, pct: 8 },
    ],
    thumbnailUrl: 'https://readdy.ai/api/search-image?query=Elegant%20YouTube%20thumbnail%20depicting%20climate%20stress%20test%20and%20financial%20risk%20analysis%20concepts%20with%20abstract%20green%20environmental%20data%20visualizations%20on%20a%20sophisticated%20dark%20emerald%20background%2C%20professional%20institutional%20finance%20aesthetics%2C%20clean%20minimalist%20composition%20with%20subtle%20African%20continent%20silhouette&width=640&height=360&seq=yt-thumb-stress-test&orientation=landscape',
  },
  {
    id: 'vid-003',
    title: 'KYC Digital 2026 : Le Nouveau Cadre BCEAO pour l\'Onboarding Électronique',
    publishedAt: '2026-06-10T09:00:00Z',
    duration: '10:05',
    views: 5180,
    watchTime: 35600,
    avgViewDuration: '6:52',
    retentionRate: 68.1,
    likes: 224,
    comments: 29,
    shares: 54,
    ctr: 6.9,
    subscribersGained: 44,
    trafficSources: {
      youtube_search: 48,
      suggested_videos: 22,
      external: 20,
      direct: 10,
    },
    topCountries: [
      { country: 'Côte d\'Ivoire', views: 1300, pct: 25 },
      { country: 'Sénégal', views: 1040, pct: 20 },
      { country: 'France', views: 780, pct: 15 },
      { country: 'Bénin', views: 520, pct: 10 },
      { country: 'Niger', views: 410, pct: 8 },
    ],
    thumbnailUrl: 'https://readdy.ai/api/search-image?query=Modern%20professional%20YouTube%20thumbnail%20about%20digital%20identity%20verification%20and%20KYC%20onboarding%20technology%2C%20abstract%20biometric%20and%20security%20elements%20in%20warm%20bronze%20and%20gold%20tones%20on%20a%20sophisticated%20dark%20background%2C%20institutional%20financial%20compliance%20aesthetic%2C%20clean%20professional%20design%20for%20consulting%20firm&width=640&height=360&seq=yt-thumb-kyc-digital&orientation=landscape',
  },
  {
    id: 'vid-004',
    title: 'LCB/FT 2026 : Nouvelles Exigences GAFI pour les Fintechs Africaines',
    publishedAt: '2026-06-07T16:00:00Z',
    duration: '14:20',
    views: 7820,
    watchTime: 58100,
    avgViewDuration: '7:25',
    retentionRate: 51.8,
    likes: 345,
    comments: 52,
    shares: 95,
    ctr: 8.9,
    subscribersGained: 75,
    trafficSources: {
      youtube_search: 40,
      suggested_videos: 30,
      external: 20,
      direct: 10,
    },
    topCountries: [
      { country: 'Côte d\'Ivoire', views: 1960, pct: 25 },
      { country: 'Cameroun', views: 1560, pct: 20 },
      { country: 'Sénégal', views: 1170, pct: 15 },
      { country: 'Gabon', views: 780, pct: 10 },
      { country: 'RDC', views: 620, pct: 8 },
    ],
    thumbnailUrl: 'https://readdy.ai/api/search-image?query=Professional%20YouTube%20thumbnail%20about%20anti-money%20laundering%20and%20financial%20compliance%20for%20African%20fintech%20companies%2C%20abstract%20security%20shield%20concept%20with%20warm%20gold%20and%20bronze%20tones%20on%20dark%20sophisticated%20background%2C%20clean%20institutional%20design%20with%20subtle%20digital%20Africa%20map%20elements&width=640&height=360&seq=yt-thumb-lcbft-fintech&orientation=landscape',
  },
  {
    id: 'vid-005',
    title: 'KHEPRA EXPERTS — Présentation Institutionnelle du Cabinet',
    publishedAt: '2026-06-05T11:00:00Z',
    duration: '6:42',
    views: 3580,
    watchTime: 15200,
    avgViewDuration: '4:15',
    retentionRate: 63.4,
    likes: 186,
    comments: 16,
    shares: 38,
    ctr: 5.4,
    subscribersGained: 31,
    trafficSources: {
      youtube_search: 30,
      suggested_videos: 20,
      external: 35,
      direct: 15,
    },
    topCountries: [
      { country: 'Sénégal', views: 900, pct: 25 },
      { country: 'Côte d\'Ivoire', views: 720, pct: 20 },
      { country: 'France', views: 540, pct: 15 },
      { country: 'Mali', views: 360, pct: 10 },
      { country: 'Burkina Faso', views: 280, pct: 8 },
    ],
    thumbnailUrl: 'https://readdy.ai/api/search-image?query=Elegant%20institutional%20YouTube%20thumbnail%20for%20a%20Big%20Four%20consulting%20firm%20in%20Africa%2C%20sophisticated%20warm%20gold%20and%20emerald%20green%20abstract%20branding%20composition%2C%20clean%20professional%20corporate%20aesthetics%20with%20subtle%20African%20professional%20imagery%2C%20executive%20consulting%20firm%20visual%20identity&width=640&height=360&seq=yt-thumb-khepra-instit&orientation=landscape',
  },
  {
    id: 'vid-006',
    title: 'Guide : Préparer votre Établissement à une Inspection COBAC',
    publishedAt: '2026-06-02T15:00:00Z',
    duration: '15:20',
    views: 9150,
    watchTime: 82100,
    avgViewDuration: '8:58',
    retentionRate: 58.5,
    likes: 412,
    comments: 64,
    shares: 120,
    ctr: 9.1,
    subscribersGained: 88,
    trafficSources: {
      youtube_search: 45,
      suggested_videos: 25,
      external: 20,
      direct: 10,
    },
    topCountries: [
      { country: 'Cameroun', views: 2290, pct: 25 },
      { country: 'Gabon', views: 1830, pct: 20 },
      { country: 'Côte d\'Ivoire', views: 1370, pct: 15 },
      { country: 'Tchad', views: 910, pct: 10 },
      { country: 'RCA', views: 730, pct: 8 },
    ],
    thumbnailUrl: 'https://readdy.ai/api/search-image?query=Professional%20YouTube%20thumbnail%20showing%20COBAC%20banking%20inspection%20preparation%20guide%20concept%2C%20abstract%20regulatory%20compliance%20checklist%20and%20financial%20audit%20elements%20in%20warm%20bronze%20and%20gold%20tones%2C%20dark%20sophisticated%20background%20with%20institutional%20atmosphere%2C%20clean%20minimalist%20consulting%20firm%20design&width=640&height=360&seq=yt-thumb-cobac-guide&orientation=landscape',
  },
];

export const SUBSCRIBER_GROWTH = [
  { date: '2026-06-01', subscribers: 900 },
  { date: '2026-06-02', subscribers: 920 },
  { date: '2026-06-03', subscribers: 945 },
  { date: '2026-06-04', subscribers: 972 },
  { date: '2026-06-05', subscribers: 1003 },
  { date: '2026-06-06', subscribers: 1025 },
  { date: '2026-06-07', subscribers: 1070 },
  { date: '2026-06-08', subscribers: 1098 },
  { date: '2026-06-09', subscribers: 1120 },
  { date: '2026-06-10', subscribers: 1144 },
  { date: '2026-06-11', subscribers: 1160 },
  { date: '2026-06-12', subscribers: 1195 },
  { date: '2026-06-13', subscribers: 1212 },
  { date: '2026-06-14', subscribers: 1220 },
  { date: '2026-06-15', subscribers: 1240 },
];

export const DAILY_VIEWS = [
  { date: '2026-06-01', views: 420 },
  { date: '2026-06-02', views: 680 },
  { date: '2026-06-03', views: 550 },
  { date: '2026-06-04', views: 480 },
  { date: '2026-06-05', views: 720 },
  { date: '2026-06-06', views: 610 },
  { date: '2026-06-07', views: 890 },
  { date: '2026-06-08', views: 780 },
  { date: '2026-06-09', views: 650 },
  { date: '2026-06-10', views: 940 },
  { date: '2026-06-11', views: 820 },
  { date: '2026-06-12', views: 1100 },
  { date: '2026-06-13', views: 960 },
  { date: '2026-06-14', views: 880 },
  { date: '2026-06-15', views: 1240 },
  { date: '2026-06-16', views: 1020 },
  { date: '2026-06-17', views: 1150 },
  { date: '2026-06-18', views: 980 },
  { date: '2026-06-19', views: 890 },
];

export const AUDIENCE_INSIGHTS: AudienceInsight[] = [
  { ageGroup: '25-34', percentage: 38, label: 'Jeunes cadres' },
  { ageGroup: '35-44', percentage: 32, label: 'Cadres dirigeants' },
  { ageGroup: '45-54', percentage: 18, label: 'Directeurs / DG' },
  { ageGroup: '55+', percentage: 8, label: 'DG / PCA' },
  { ageGroup: '18-24', percentage: 4, label: 'Étudiants' },
];

export const GEO_DISTRIBUTION = [
  { country: 'Côte d\'Ivoire', pct: 22, flag: '🇨🇮' },
  { country: 'Sénégal', pct: 18, flag: '🇸🇳' },
  { country: 'Cameroun', pct: 14, flag: '🇨🇲' },
  { country: 'France', pct: 10, flag: '🇫🇷' },
  { country: 'Burkina Faso', pct: 7, flag: '🇧🇫' },
  { country: 'Mali', pct: 6, flag: '🇲🇱' },
  { country: 'Gabon', pct: 5, flag: '🇬🇦' },
  { country: 'Bénin', pct: 4, flag: '🇧🇯' },
  { country: 'Togo', pct: 3, flag: '🇹🇬' },
  { country: 'RDC', pct: 3, flag: '🇨🇩' },
  { country: 'Niger', pct: 2, flag: '🇳🇪' },
  { country: 'Tchad', pct: 2, flag: '🇹🇩' },
];

export const MONETIZATION_MILESTONES = [
  { milestone: 'Abonnés 1 000', required: '1 000', current: '1 240', achieved: true },
  { milestone: 'Heures visionnées', required: '4 000', current: '6 403', achieved: true },
  { milestone: 'Vidéos publiques', required: '3', current: '8', achieved: true },
  { milestone: 'Période d\'activité', required: '30 jours', current: '19 jours', achieved: false },
  { milestone: 'Compte AdSense', required: 'Approuvé', current: 'En attente', achieved: false },
  { milestone: 'Vérification 2 étapes', required: 'Activée', current: 'Activée', achieved: true },
];





