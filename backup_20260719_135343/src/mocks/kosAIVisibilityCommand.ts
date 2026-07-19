export const aIVisibilityCommand = {
  overallScore: 92,
  lastScan: "2026-06-13T10:15:00Z",
  scanFrequency: "Quotidien (24h)",
  geoReadiness: "excellent" as const,

  llmsStatus: {
    llms_txt_exists: true,
    llms_txt_size_kb: 8.4,
    llms_txt_sections: 22,
    llms_full_txt_exists: true,
    llms_full_txt_size_kb: 45.2,
    llms_full_txt_sections: 18,
    lastGenerated: "2026-06-13T09:00:00Z",
    autoRegeneration: true,
    regenerationSchedule: "Quotidien 03:00 UTC",
    contentFreshness: 98,
    issues: [] as string[],
  },

  geoOptimizations: [
    { name: "llms.txt auto-regeneration", status: "active", impact: "high" as const, description: "Régénération quotidienne du contenu pour fraîcheur IA" },
    { name: "AI Crawler Allowlist", status: "active", impact: "critical" as const, description: "11 AI crawlers autorisés dans robots.txt + directives dédiées" },
    { name: "Schema.org Full Coverage", status: "active", impact: "high" as const, description: "Organization, FAQPage, BreadcrumbList, ProfessionalService sur 10+ pages" },
    { name: "llms-full.txt Deep Context", status: "active", impact: "high" as const, description: "45KB+ de contexte complet pour ingestion IA profonde" },
    { name: "Entity Optimization", status: "active", impact: "medium" as const, description: "Entités nommées (BCEAO, COBAC, OHADA) structurées dans le contenu" },
    { name: "AI Answer Engine Optimization", status: "active", impact: "medium" as const, description: "FAQ structurées avec Schema.org FAQPage pour featured snippets IA" },
    { name: "Content Freshness Monitoring", status: "active", impact: "high" as const, description: "Scan quotidien de la fraîcheur du contenu pour les index IA" },
    { name: "Cross-Platform Consistency", status: "active", impact: "medium" as const, description: "Informations cohérentes sur toutes les plateformes (site, LinkedIn, X)" },
  ],

  platformScores: [
    { platform: "ChatGPT / SearchGPT", score: 95, status: "optimized", details: "llms.txt indexé, robots.txt allow, Schema.org présent" },
    { platform: "Google Gemini", score: 92, status: "optimized", details: "Google-Extended allow, llms.txt accessible, FAQ Schema OK" },
    { platform: "Claude / Anthropic", score: 94, status: "optimized", details: "ClaudeBot allow, llms-full.txt 45KB+ de contexte" },
    { platform: "Perplexity", score: 90, status: "optimized", details: "PerplexityBot allow, contenu structuré indexé" },
    { platform: "Microsoft Copilot", score: 88, status: "good", details: "Indexé via Bing, llms.txt en cours de découverte" },
    { platform: "Grok / xAI", score: 85, status: "good", details: "Nouveau crawler, monitoring actif, robots.txt préparé" },
    { platform: "Apple Intelligence", score: 91, status: "optimized", details: "Applebot-Extended allow, contenu propre indexé" },
    { platform: "Meta AI", score: 87, status: "good", details: "meta-externalagent allow, contenu riche dispo" },
    { platform: "Amazon Alexa / Rufus", score: 86, status: "good", details: "Amazonbot allow, FAQ structurée disponible" },
    { platform: "Cohere / Command R", score: 89, status: "good", details: "cohere-ai allow, contenu long format indexé" },
  ],

  crawlerStatus: [
    { bot: "GPTBot", userAgent: "GPTBot", lastSeen: "2026-06-13T09:45:00Z", pagesCrawled: 312, status: "active", allowed: true },
    { bot: "ChatGPT-User", userAgent: "ChatGPT-User", lastSeen: "2026-06-13T08:30:00Z", pagesCrawled: 89, status: "active", allowed: true },
    { bot: "ClaudeBot", userAgent: "ClaudeBot", lastSeen: "2026-06-13T10:02:00Z", pagesCrawled: 245, status: "active", allowed: true },
    { bot: "PerplexityBot", userAgent: "PerplexityBot", lastSeen: "2026-06-13T07:15:00Z", pagesCrawled: 156, status: "active", allowed: true },
    { bot: "Google-Extended", userAgent: "Google-Extended", lastSeen: "2026-06-13T09:58:00Z", pagesCrawled: 423, status: "active", allowed: true },
    { bot: "Applebot-Extended", userAgent: "Applebot-Extended", lastSeen: "2026-06-12T22:10:00Z", pagesCrawled: 67, status: "active", allowed: true },
    { bot: "cohere-ai", userAgent: "cohere-ai", lastSeen: "2026-06-13T06:40:00Z", pagesCrawled: 43, status: "active", allowed: true },
    { bot: "Amazonbot", userAgent: "Amazonbot", lastSeen: "2026-06-13T04:55:00Z", pagesCrawled: 112, status: "active", allowed: true },
    { bot: "meta-externalagent", userAgent: "meta-externalagent", lastSeen: "2026-06-13T08:05:00Z", pagesCrawled: 78, status: "active", allowed: true },
    { bot: "OAI-SearchBot", userAgent: "OAI-SearchBot", lastSeen: "2026-06-13T05:30:00Z", pagesCrawled: 34, status: "new", allowed: true },
  ],

  schemaCoverage: [
    { pageUrl: "/", schemas: ["Organization", "WebPage", "BreadcrumbList"], total: 3, richEligible: true },
    { pageUrl: "/about/", schemas: ["Organization", "WebPage", "BreadcrumbList", "Person"], total: 4, richEligible: true },
    { pageUrl: "/services/", schemas: ["ProfessionalService", "WebPage", "BreadcrumbList"], total: 3, richEligible: true },
    { pageUrl: "/blog/", schemas: ["WebPage", "BreadcrumbList"], total: 2, richEligible: true },
    { pageUrl: "/case-studies/", schemas: ["WebPage", "BreadcrumbList"], total: 2, richEligible: true },
    { pageUrl: "/contact/", schemas: ["Organization", "WebPage", "BreadcrumbList", "Place"], total: 4, richEligible: true },
    { pageUrl: "/think-tank/", schemas: ["WebPage", "BreadcrumbList"], total: 2, richEligible: true },
    { pageUrl: "/regulation-financiere/", schemas: ["WebPage", "BreadcrumbList", "FAQPage"], total: 3, richEligible: true },
    { pageUrl: "/prix-de-transfert/", schemas: ["WebPage", "BreadcrumbList", "FAQPage"], total: 3, richEligible: true },
    { pageUrl: "/gouvernance-risques/", schemas: ["WebPage", "BreadcrumbList", "FAQPage"], total: 3, richEligible: true },
  ],

  scanHistory: [
    { date: "2026-06-13", score: 92, issues: 0, trend: "stable" },
    { date: "2026-06-12", score: 91, issues: 1, trend: "up" },
    { date: "2026-06-11", score: 88, issues: 3, trend: "up" },
    { date: "2026-06-10", score: 85, issues: 5, trend: "up" },
    { date: "2026-06-09", score: 82, issues: 7, trend: "up" },
    { date: "2026-06-08", score: 78, issues: 10, trend: "up" },
    { date: "2026-06-07", score: 72, issues: 14, trend: "up" },
  ],

  recentOperations: [
    { id: "op-001", timestamp: "2026-06-13T10:15:00Z", type: "geo_scan", target: "https://khepraexperts.com", result: "success", score: 92, details: "Scan GEO complet — 11 crawlers OK, llms.txt frais, Schema.org couvert" },
    { id: "op-002", timestamp: "2026-06-13T09:00:00Z", type: "llms_regenerate", target: "llms.txt + llms-full.txt", result: "success", score: null, details: "Régénération automatique — 22 sections llms.txt, 18 sections llms-full.txt" },
    { id: "op-003", timestamp: "2026-06-13T08:30:00Z", type: "crawler_monitor", target: "Tous les AI crawlers", result: "success", score: null, details: "10/10 crawlers actifs, 0 bloqué, 1 559 pages crawlé au total" },
    { id: "op-004", timestamp: "2026-06-13T07:45:00Z", type: "schema_audit", target: "10 pages clés", result: "success", score: 96, details: "Schema.org présent sur 10/10 pages, 0 erreur de validation" },
    { id: "op-005", timestamp: "2026-06-13T06:00:00Z", type: "content_freshness", target: "Blog + Services + Case Studies", result: "success", score: 94, details: "Contenu frais — dernière publication < 48h" },
  ],
};



