export const marketingAutopilotStatus = {
  status: 'fully_autonomous',
  uptime: '24/7 — 365 jours',
  channelsActive: 8,
  contentPublishedToday: 14,
  campaignsRunning: 6,
  leadsGeneratedToday: 47,
  conversionRate: 4.8,
  costPerLead: 0,
  monthlyImpressions: 1247000,
  engagementRate: 6.2,
};

export const activeCampaigns = [
  { id: 'CAM-001', name: 'Audit Conformité BCEAO 360°', channel: 'LinkedIn + Email', status: 'active', leads: 234, conversion: 5.2, budget: 0, roi: '∞', startDate: '2026-06-01' },
  { id: 'CAM-002', name: 'Gouvernance Board Advisory', channel: 'LinkedIn + SEO', status: 'active', leads: 187, conversion: 4.1, budget: 0, roi: '∞', startDate: '2026-06-05' },
  { id: 'CAM-003', name: 'Diagnostic Flash Conformité', channel: 'Social + Email', status: 'active', leads: 312, conversion: 6.8, budget: 0, roi: '∞', startDate: '2026-06-10' },
  { id: 'CAM-004', name: 'Guide Prix de Transfert BEPS', channel: 'SEO + LinkedIn', status: 'active', leads: 156, conversion: 3.9, budget: 0, roi: '∞', startDate: '2026-06-12' },
  { id: 'CAM-005', name: 'ESG Double Matérialité', channel: 'Multi-canal', status: 'active', leads: 98, conversion: 4.5, budget: 0, roi: '∞', startDate: '2026-06-15' },
  { id: 'CAM-006', name: 'Agrément FinTech 127 Points', channel: 'SEO + Email Nurturing', status: 'active', leads: 73, conversion: 5.7, budget: 0, roi: '∞', startDate: '2026-06-18' },
];

export const contentAutoProduction = [
  { type: 'Article Blog', today: 3, thisWeek: 18, thisMonth: 72, avgQuality: 96, seoScore: 94 },
  { type: 'Post LinkedIn', today: 4, thisWeek: 28, thisMonth: 112, avgQuality: 95, engagement: 7.2 },
  { type: 'Newsletter', today: 1, thisWeek: 3, thisMonth: 12, avgQuality: 98, openRate: 42 },
  { type: 'White Paper', today: 0, thisWeek: 2, thisMonth: 6, avgQuality: 97, downloads: 234 },
  { type: 'Infographie', today: 2, thisWeek: 8, thisMonth: 24, avgQuality: 93, shares: 156 },
  { type: 'Vidéo Short', today: 1, thisWeek: 5, thisMonth: 18, avgQuality: 91, views: 3400 },
  { type: 'Podcast', today: 1, thisWeek: 2, thisMonth: 8, avgQuality: 94, listens: 890 },
  { type: 'Étude de Cas', today: 2, thisWeek: 6, thisMonth: 14, avgQuality: 96, downloads: 178 },
];

export const seoAutopilotMetrics = {
  keywordsTracked: 847,
  top3Positions: 156,
  top10Positions: 423,
  avgPosition: 8.7,
  impressionsMonthly: 892000,
  clicksMonthly: 48500,
  ctr: 5.4,
  newContentIndexed: 23,
  coreWebVitals: { lcp: 1.2, fid: 45, cls: 0.05 },
};

export const socialAutoMetrics = {
  linkedin: { followers: 15200, postsThisMonth: 28, avgEngagement: 7.8, newFollowers: 340, impressions: 245000 },
  x: { followers: 4200, postsThisMonth: 35, avgEngagement: 4.2, newFollowers: 120, impressions: 89000 },
  youtube: { subscribers: 2300, videosThisMonth: 12, avgViews: 1800, newSubscribers: 180, watchHours: 4200 },
  facebook: { followers: 3800, postsThisMonth: 20, avgEngagement: 3.5, newFollowers: 85, impressions: 67000 },
};

export const emailNurturingStats = {
  sequences: 12,
  activeContacts: 4800,
  avgOpenRate: 42,
  avgClickRate: 8.5,
  unsubscribes: 0.3,
  conversionsToSQL: 5.2,
  emailsSentToday: 247,
  fullyAutomated: true,
};