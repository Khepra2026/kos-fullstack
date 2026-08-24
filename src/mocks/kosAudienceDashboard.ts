// ─── KOS™ AUDIENCE DASHBOARD — Métriques de Performance par Segment ───
// Gestion des audiences : conversion, engagement, vidéo par profil
// 23 Juin 2026

export interface AudienceMetric {
  segment: string;
  segmentLabel: string;
  icon: string;
  color: string;

  // Conversion
  leadsGenerated: number;
  leadsConverted: number;
  conversionRate: number; // %
  avgDealValue: number; // FCFA

  // Engagement vidéo
  totalViews: number;
  avgWatchTime: number; // minutes
  completionRate: number; // %
  engagementRate: number; // likes+comments+shares / views

  // Vidéo par profil
  videosByType: Record<string, number>;
  topVideoType: string;
  topVideoViews: number;

  // Voix KHEPRA
  topVoice: string;
  voiceDistribution: Record<string, number>;

  // Score
  audienceScore: number; // 0-100, combiné conversion + engagement
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

export interface AudienceDashboardKPIs {
  totalSegments: number;
  totalLeadsGenerated: number;
  totalLeadsConverted: number;
  globalConversionRate: number;
  totalViews: number;
  avgEngagementRate: number;
  topSegment: string;
  worstSegment: string;
  bestVoice: string;
  bestVideoType: string;
}

export const AUDIENCE_METRICS: AudienceMetric[] = [
  {
    segment: 'DG_BANQUE',
    segmentLabel: 'DG / CEO Banque',
    icon: 'ri-bank-line',
    color: '#86BC25',
    leadsGenerated: 142,
    leadsConverted: 38,
    conversionRate: 26.8,
    avgDealValue: 125000000,
    totalViews: 8920,
    avgWatchTime: 12.4,
    completionRate: 68,
    engagementRate: 8.2,
    videosByType: { analyse: 18, podcast: 4, formation: 2, interview: 1 },
    topVideoType: 'analyse',
    topVideoViews: 2100,
    topVoice: 'Dr. Célestin Koffi',
    voiceDistribution: { 'Dr. Célestin Koffi': 22, 'Fatoumata Diallo': 2, 'Aminata Sow': 1 },
    audienceScore: 94,
    trend: 'up',
    trendValue: 4.2,
  },
  {
    segment: 'COMPLIANCE_OFFICER',
    segmentLabel: 'Compliance Officer',
    icon: 'ri-shield-check-line',
    color: '#C2410C',
    leadsGenerated: 98,
    leadsConverted: 24,
    conversionRate: 24.5,
    avgDealValue: 85000000,
    totalViews: 6540,
    avgWatchTime: 10.8,
    completionRate: 72,
    engagementRate: 9.1,
    videosByType: { analyse: 14, formation: 6, capsule: 2 },
    topVideoType: 'formation',
    topVideoViews: 1850,
    topVoice: 'Fatoumata Diallo',
    voiceDistribution: { 'Fatoumata Diallo': 18, 'Dr. Célestin Koffi': 3, 'Aminata Sow': 1 },
    audienceScore: 91,
    trend: 'up',
    trendValue: 3.8,
  },
  {
    segment: 'RISK_MANAGER',
    segmentLabel: 'Risk Manager',
    icon: 'ri-alert-line',
    color: '#CA8A04',
    leadsGenerated: 76,
    leadsConverted: 18,
    conversionRate: 23.7,
    avgDealValue: 98000000,
    totalViews: 5210,
    avgWatchTime: 11.2,
    completionRate: 65,
    engagementRate: 7.5,
    videosByType: { analyse: 12, formation: 3, podcast: 2 },
    topVideoType: 'analyse',
    topVideoViews: 1600,
    topVoice: 'Fatoumata Diallo',
    voiceDistribution: { 'Fatoumata Diallo': 15, 'Dr. Célestin Koffi': 2 },
    audienceScore: 88,
    trend: 'stable',
    trendValue: 0.5,
  },
  {
    segment: 'AUDITEUR_INTERNE',
    segmentLabel: 'Auditeur Interne',
    icon: 'ri-search-eye-line',
    color: '#0A66C2',
    leadsGenerated: 54,
    leadsConverted: 11,
    conversionRate: 20.4,
    avgDealValue: 72000000,
    totalViews: 3890,
    avgWatchTime: 9.6,
    completionRate: 58,
    engagementRate: 6.8,
    videosByType: { analyse: 8, formation: 4, capsule: 1 },
    topVideoType: 'formation',
    topVideoViews: 1200,
    topVoice: 'Fatoumata Diallo',
    voiceDistribution: { 'Fatoumata Diallo': 11, 'Dr. Célestin Koffi': 2 },
    audienceScore: 82,
    trend: 'up',
    trendValue: 2.1,
  },
  {
    segment: 'PCA',
    segmentLabel: 'PCA / Administrateur',
    icon: 'ri-building-4-line',
    color: '#7C3AED',
    leadsGenerated: 68,
    leadsConverted: 15,
    conversionRate: 22.1,
    avgDealValue: 145000000,
    totalViews: 4450,
    avgWatchTime: 13.5,
    completionRate: 74,
    engagementRate: 8.8,
    videosByType: { analyse: 10, interview: 3, podcast: 2 },
    topVideoType: 'interview',
    topVideoViews: 1400,
    topVoice: 'Dr. Célestin Koffi',
    voiceDistribution: { 'Dr. Célestin Koffi': 14, 'Aminata Sow': 1 },
    audienceScore: 90,
    trend: 'up',
    trendValue: 3.2,
  },
  {
    segment: 'DG_MICROFINANCE',
    segmentLabel: 'DG SFD / Microfinance',
    icon: 'ri-community-line',
    color: '#D97757',
    leadsGenerated: 112,
    leadsConverted: 28,
    conversionRate: 25.0,
    avgDealValue: 45000000,
    totalViews: 7850,
    avgWatchTime: 10.5,
    completionRate: 62,
    engagementRate: 7.9,
    videosByType: { analyse: 12, formation: 8, capsule: 3 },
    topVideoType: 'formation',
    topVideoViews: 1950,
    topVoice: 'Dr. Célestin Koffi',
    voiceDistribution: { 'Dr. Célestin Koffi': 18, 'Aminata Sow': 4, 'Fatoumata Diallo': 1 },
    audienceScore: 87,
    trend: 'up',
    trendValue: 2.8,
  },
  {
    segment: 'INVESTISSEUR',
    segmentLabel: 'Investisseur / PE',
    icon: 'ri-funds-line',
    color: '#059669',
    leadsGenerated: 42,
    leadsConverted: 9,
    conversionRate: 21.4,
    avgDealValue: 210000000,
    totalViews: 3120,
    avgWatchTime: 14.2,
    completionRate: 78,
    engagementRate: 9.5,
    videosByType: { analyse: 8, interview: 2, podcast: 1 },
    topVideoType: 'analyse',
    topVideoViews: 1100,
    topVoice: 'Fatoumata Diallo',
    voiceDistribution: { 'Fatoumata Diallo': 9, 'Dr. Célestin Koffi': 2 },
    audienceScore: 92,
    trend: 'stable',
    trendValue: 1.0,
  },
  {
    segment: 'CA_SFD',
    segmentLabel: 'Conseil Admin SFD',
    icon: 'ri-group-line',
    color: '#D97757',
    leadsGenerated: 36,
    leadsConverted: 7,
    conversionRate: 19.4,
    avgDealValue: 38000000,
    totalViews: 2580,
    avgWatchTime: 8.5,
    completionRate: 55,
    engagementRate: 6.2,
    videosByType: { formation: 5, capsule: 2, interview: 1 },
    topVideoType: 'formation',
    topVideoViews: 950,
    topVoice: 'Aminata Sow',
    voiceDistribution: { 'Aminata Sow': 6, 'Dr. Célestin Koffi': 2 },
    audienceScore: 78,
    trend: 'down',
    trendValue: -1.5,
  },
  {
    segment: 'AGENCE_PUBLIQUE',
    segmentLabel: 'Agence Publique / Ministère',
    icon: 'ri-government-line',
    color: '#86BC25',
    leadsGenerated: 28,
    leadsConverted: 5,
    conversionRate: 17.9,
    avgDealValue: 180000000,
    totalViews: 1980,
    avgWatchTime: 11.8,
    completionRate: 60,
    engagementRate: 5.5,
    videosByType: { analyse: 4, reportage: 2, interview: 1 },
    topVideoType: 'analyse',
    topVideoViews: 780,
    topVoice: 'Aminata Sow',
    voiceDistribution: { 'Aminata Sow': 6, 'Dr. Célestin Koffi': 1 },
    audienceScore: 81,
    trend: 'up',
    trendValue: 2.5,
  },
  {
    segment: 'PME',
    segmentLabel: 'PME / ETI',
    icon: 'ri-store-line',
    color: '#D97757',
    leadsGenerated: 84,
    leadsConverted: 12,
    conversionRate: 14.3,
    avgDealValue: 28000000,
    totalViews: 6240,
    avgWatchTime: 7.2,
    completionRate: 48,
    engagementRate: 5.8,
    videosByType: { capsule: 8, formation: 6, analyse: 3 },
    topVideoType: 'capsule',
    topVideoViews: 1450,
    topVoice: 'Aminata Sow',
    voiceDistribution: { 'Aminata Sow': 12, 'Dr. Célestin Koffi': 4, 'Fatoumata Diallo': 1 },
    audienceScore: 72,
    trend: 'down',
    trendValue: -2.3,
  },
];

export const AUDIENCE_DASHBOARD_KPIS: AudienceDashboardKPIs = {
  totalSegments: AUDIENCE_METRICS.length,
  totalLeadsGenerated: AUDIENCE_METRICS.reduce((sum, m) => sum + m.leadsGenerated, 0),
  totalLeadsConverted: AUDIENCE_METRICS.reduce((sum, m) => sum + m.leadsConverted, 0),
  globalConversionRate: 22.4,
  totalViews: AUDIENCE_METRICS.reduce((sum, m) => sum + m.totalViews, 0),
  avgEngagementRate: 7.4,
  topSegment: 'DG / CEO Banque',
  worstSegment: 'PME / ETI',
  bestVoice: 'Dr. Célestin Koffi',
  bestVideoType: 'analyse',
};





