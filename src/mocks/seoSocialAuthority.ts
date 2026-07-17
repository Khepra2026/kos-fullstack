export const socialSEOOverview = {
  totalScore: 54,
  targetScore: 80,
  linkedinFollowers: 4850,
  linkedinTarget: 15000,
  linkedinPostsMonth: 18,
  linkedinImpressions: 125000,
  linkedinEngagement: 4.2,
  xFollowers: 1250,
  xPostsMonth: 8,
  xImpressions: 32000,
  youtubeSubs: 340,
  youtubeVideos: 12,
  socialReferralTraffic: 1850,
  socialReferralTarget: 6000,
  brandSearchesMonthly: 3200,
  brandSearchesTarget: 10000,
  socialBacklinks: 45,
  socialBacklinksTarget: 150,
  shareOfVoice: 3.2,
  shareOfVoiceTarget: 12,
  topSharedPages: 8,
  socialCTR: 2.8,
};

export const linkedInAuthority = [
  { id: "LA-001", metric: "SSI (Social Selling Index)", value: 62, target: 85, industryAvg: 45, trend: "up", change: "+8", description: "Index de vente sociale LinkedIn — mesure l'autorité perçue" },
  { id: "LA-002", metric: "Follower Growth Rate", value: 3.8, target: 8, industryAvg: 2.1, trend: "up", change: "+0.5", description: "Taux de croissance mensuel des followers (%)", unit: "%" },
  { id: "LA-003", metric: "Post Engagement Rate", value: 4.2, target: 7, industryAvg: 2.8, trend: "up", change: "+0.3", description: "Taux d'engagement moyen par post (%)", unit: "%" },
  { id: "LA-004", metric: "Content Amplification", value: 2.4, target: 5, industryAvg: 1.5, trend: "stable", change: "+0.1", description: "Ratio partages/vues — viralité du contenu", unit: "x" },
  { id: "LA-005", metric: "Inbound Leads from Social", value: 35, target: 120, industryAvg: 20, trend: "up", change: "+5", description: "Leads entrants depuis les réseaux sociaux/mois" },
  { id: "LA-006", metric: "Company Page CTR", value: 2.8, target: 5, industryAvg: 1.9, trend: "up", change: "+0.2", description: "Taux de clic page entreprise → site web (%)", unit: "%" },
  { id: "LA-007", metric: "Employee Advocacy Score", value: 28, target: 65, industryAvg: 18, trend: "up", change: "+4", description: "% employés actifs partageant contenu entreprise (%)", unit: "%" },
  { id: "LA-008", metric: "Executive Visibility", value: 45, target: 75, industryAvg: 30, trend: "up", change: "+6", description: "Score de visibilité des dirigeants sur LinkedIn" },
];

export const socialPlatformBreakdown = [
  { platform: "LinkedIn", icon: "ri-linkedin-fill", followers: 4850, growth: 8.2, postsMonth: 18, engagementAvg: 4.2, impressionsMonthly: 125000, clicksToSite: 1850, topContentType: "Articles longs", bestDay: "Mardi", bestTime: "8h GMT", seoImpact: "Très Élevé", color: "#0A66C2" },
  { platform: "X (Twitter)", icon: "ri-twitter-x-fill", followers: 1250, growth: 3.5, postsMonth: 8, engagementAvg: 1.8, impressionsMonthly: 32000, clicksToSite: 420, topContentType: "Threads réglementaires", bestDay: "Mercredi", bestTime: "12h GMT", seoImpact: "Moyen", color: "#1A1A1A" },
  { platform: "YouTube", icon: "ri-youtube-fill", followers: 340, growth: 12.4, postsMonth: 2, engagementAvg: 5.1, impressionsMonthly: 8500, clicksToSite: 180, topContentType: "Webinaires BCEAO", bestDay: "Jeudi", bestTime: "17h GMT", seoImpact: "Élevé", color: "#FF0000" },
];

export const socialContentROI = [
  { id: "SC-001", title: "Guide Conformité BCEAO 2026", platform: "LinkedIn", postedDate: "2026-06-10", url: "/guide-bceao-2026", shares: 247, comments: 89, clicks: 520, leads: 12, backlinks: 5, kwUplift: "+8 positions", type: "Article long" },
  { id: "SC-002", title: "Baromètre Conformité UEMOA Q2", platform: "LinkedIn", postedDate: "2026-06-05", url: "/barometre-bceao-2026", shares: 185, comments: 62, clicks: 380, leads: 8, backlinks: 3, kwUplift: "+5 positions", type: "Rapport" },
  { id: "SC-003", title: "Thread : 5 pièges LBC/FT", platform: "X", postedDate: "2026-06-08", url: "/blog/serie-gouvernance-bancaire-uemoa", shares: 94, comments: 45, clicks: 210, leads: 3, backlinks: 1, kwUplift: "+3 positions", type: "Thread" },
  { id: "SC-004", title: "Webinaire : Préparer mission BCEAO", platform: "YouTube", postedDate: "2026-05-28", url: "/webinars", shares: 52, comments: 28, clicks: 145, leads: 5, backlinks: 2, kwUplift: "+4 positions", type: "Vidéo" },
  { id: "SC-005", title: "Article : Indépendance Admin. UEMOA", platform: "LinkedIn", postedDate: "2026-06-01", url: "/blog/independance-administrateurs-circulaire-01-2017", shares: 168, comments: 55, clicks: 340, leads: 7, backlinks: 2, kwUplift: "+6 positions", type: "Article" },
  { id: "SC-006", title: "Infographie : Carto Risques UEMOA", platform: "LinkedIn", postedDate: "2026-05-25", url: "/geo-hub/cartographie-risques-entreprise", shares: 210, comments: 72, clicks: 430, leads: 9, backlinks: 4, kwUplift: "+10 positions", type: "Infographie" },
  { id: "SC-007", title: "Cas Client : Agrément SFD", platform: "LinkedIn", postedDate: "2026-05-20", url: "/case-studies/agrement-multinational-sfd-uemoa-cemac", shares: 145, comments: 48, clicks: 290, leads: 6, backlinks: 1, kwUplift: "+4 positions", type: "Étude de cas" },
  { id: "SC-008", title: "Thread : Prix de Transfert Afrique", platform: "X", postedDate: "2026-06-03", url: "/prix-de-transfert", shares: 78, comments: 35, clicks: 175, leads: 2, backlinks: 1, kwUplift: "+2 positions", type: "Thread" },
];

export const socialQuickWins = [
  { id: "SQ-001", action: "Activer Employee Advocacy — 5 consultants à onboarder", impact: "Critique", effort: "3h", expectedReach: 15000, expectedLeads: 15, platform: "LinkedIn" },
  { id: "SQ-002", action: "Lancer newsletter LinkedIn hebdomadaire — conformité", impact: "Critique", effort: "2h", expectedReach: 8000, expectedLeads: 10, platform: "LinkedIn" },
  { id: "SQ-003", action: "Créer 3 threads X/semaine — LBC/FT + BCEAO", impact: "Haute", effort: "3h/sem", expectedReach: 5000, expectedLeads: 5, platform: "X" },
  { id: "SQ-004", action: "Programmer 2 vidéos YouTube/mois — format 5 min", impact: "Haute", effort: "8h/mois", expectedReach: 3000, expectedLeads: 8, platform: "YouTube" },
  { id: "SQ-005", action: "Republier Top 5 articles sur LinkedIn (meilleurs créneaux)", impact: "Moyenne", effort: "1h", expectedReach: 4000, expectedLeads: 3, platform: "LinkedIn" },
  { id: "SQ-006", action: "Créer page LinkedIn dédiée KHEPRA CEMAC", impact: "Haute", effort: "4h", expectedReach: 2000, expectedLeads: 6, platform: "LinkedIn" },
  { id: "SQ-007", action: "Optimiser profils dirigeants (SEO LinkedIn)", impact: "Moyenne", effort: "2h", expectedReach: 3000, expectedLeads: 4, platform: "LinkedIn" },
  { id: "SQ-008", action: "Ajouter Schema.org SocialProfile sur site", impact: "Haute", effort: "1h", expectedReach: 0, expectedLeads: 0, platform: "SEO" },
];

export const socialAlerts = [
  { id: "SAL-001", type: "Opportunité", severity: "Haute", message: "Post LinkedIn 'Carto Risques UEMOA' a généré 4 backlinks — reproduire le format infographie", action: "Planifier série infographies" },
  { id: "SAL-002", type: "Alerte", severity: "Critique", message: "Employee Advocacy inexistant — 0 employés partagent le contenu KHEPRA", action: "Programme advocacy à créer" },
  { id: "SAL-003", type: "Opportunité", severity: "Haute", message: "Vidéo YouTube 'Préparer mission BCEAO' en forte croissance (+12% vues/sem)", action: "Créer une playlist BCEAO" },
  { id: "SAL-004", type: "Alerte", severity: "Moyenne", message: "X/Twitter — seuls 8 posts/mois, objectif 20 pour impact SEO", action: "Augmenter cadence X" },
];