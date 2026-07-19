// Auto-generated - 2026-07-17
// 72 functions Supabase - 17 Hubs

export const SUPABASE_URL = "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1";

export const HUBS = {
  // Scraper : 7 routes
  SCRAPER: {
    COBAC: `${SUPABASE_URL}/kos-scraper-hub/cobac`,
    BCEAO: `${SUPABASE_URL}/kos-scraper-hub/bceao`,
    BEAC: `${SUPABASE_URL}/kos-scraper-hub/beac`,
    BEAC_CEMAC: `${SUPABASE_URL}/kos-scraper-hub/beac-cemac`,
    OHADA: `${SUPABASE_URL}/kos-scraper-hub/ohada`,
    BCEAO_DOCS: `${SUPABASE_URL}/kos-scraper-hub/bceao-docs`,
    BEAC_DOCS: `${SUPABASE_URL}/kos-scraper-hub/beac-docs`,
  },
  
  // Auth : 2 routes
  AUTH: {
    ADMIN: `${SUPABASE_URL}/kos-auth-hub/admin`,
    META_OAUTH: `${SUPABASE_URL}/kos-auth-hub/meta-oauth`,
  },
  
  // Router : 3 routes
  ROUTER: {
    ORCHESTRATOR: `${SUPABASE_URL}/kos-router-hub/orchestrator`,
    REDIRECT: `${SUPABASE_URL}/kos-router-hub/redirect`,
    ALIAS: `${SUPABASE_URL}/kos-router-hub/alias`,
  },
  
  // Social : 3 routes
  SOCIAL: {
    FACEBOOK: `${SUPABASE_URL}/kos-social-hub/facebook`,
    LINKEDIN: `${SUPABASE_URL}/kos-social-hub/linkedin`,
    TWITTER: `${SUPABASE_URL}/kos-social-hub/twitter`,
  },
  
  // RLS : 3 routes
  RLS: {
    POLICY: `${SUPABASE_URL}/kos-rls-hub/policy`,
    ROLE: `${SUPABASE_URL}/kos-rls-hub/role`,
    CHECK: `${SUPABASE_URL}/kos-rls-hub/check`,
  },
  
  // IndexNow : 2 routes
  INDEXNOW: {
    SUBMIT: `${SUPABASE_URL}/kos-indexnow-hub/submit`,
    STATUS: `${SUPABASE_URL}/kos-indexnow-hub/status`,
  },
  
  // Knowledge : 2 routes
  KNOWLEDGE: {
    SEARCH: `${SUPABASE_URL}/kos-knowledge-hub/search`,
    UPDATE: `${SUPABASE_URL}/kos-knowledge-hub/update`,
  },
  
  // Publication : 2 routes
  PUB: {
    NOTIFIER: `${SUPABASE_URL}/kos-publication-hub/notifier`,
    SCHEDULER: `${SUPABASE_URL}/kos-publication-hub/scheduler`,
  },
  
  // Audit : 2 routes
  AUDIT: {
    INSERT: `${SUPABASE_URL}/kos-audit-hub/insert`,
    PROGRAM: `${SUPABASE_URL}/kos-audit-hub/program`,
  },
  
  // Admin : 4 routes
  ADMIN: {
    CHANGE_PASSWORD: `${SUPABASE_URL}/kos-admin-hub/change-password`,
    DOCUMENTS: `${SUPABASE_URL}/kos-admin-hub/documents`,
    NOTIF_CHECK: `${SUPABASE_URL}/kos-admin-hub/notifications-check`,
    VERIFY_TOKEN: `${SUPABASE_URL}/kos-admin-hub/verify-token`,
  },
  
  // SEO : 3 routes
  SEO: {
    AUDIT: `${SUPABASE_URL}/kos-seo-hub/audit`,
    HEALTH: `${SUPABASE_URL}/kos-seo-hub/health`,
    GSC: `${SUPABASE_URL}/kos-seo-hub/gsc`,
  },
  
  // Security : 2 routes
  SECURITY: {
    LOGGER: `${SUPABASE_URL}/kos-security-hub/logger`,
    SCAN: `${SUPABASE_URL}/kos-security-hub/scan`,
  },
  
  // Content : 2 routes
  CONTENT: {
    FACTORY: `${SUPABASE_URL}/kos-content-hub/factory`,
    RECYCLER: `${SUPABASE_URL}/kos-content-hub/recycler`,
  },
  
  // KPI : 2 routes
  KPI: {
    RECALC: `${SUPABASE_URL}/kos-kpi-hub/recalculation`,
    PERF: `${SUPABASE_URL}/kos-kpi-hub/performance`,
  },
  
  // Regulatory : 2 routes
  REGULATORY: {
    CHAT: `${SUPABASE_URL}/kos-regulatory-hub/chat`,
    SCOUT: `${SUPABASE_URL}/kos-regulatory-hub/scout`,
  },
  
  // DevOps : routes dynamiques
  DEVOPS: `${SUPABASE_URL}/kos-devops-hub`,
} as const;

export type HubsType = typeof HUBS;




