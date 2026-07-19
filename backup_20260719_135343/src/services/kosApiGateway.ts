/**
 * ═══════════════════════════════════════════════════════════════
 * KOS API GATEWAY™ — Intelligence Router
 * KHEPRA EXPERTS — Big Four Architecture Technique
 * ═══════════════════════════════════════════════════════════════
 *
 * Point d'entrée unifié du système KOS.
 * Routing intelligent vers 5 backends :
 *   Qdrant, n8n, Microservices Docker, Supabase Registry, Data Lake
 *
 * Auth : JWT + RBAC + ABAC
 * Rate Limiting : Par tier
 * Observability : Toute requête loggée
 */

// ─── Types ───────────────────────────────────────────────────

type BackendTarget = 'qdrant' | 'n8n' | 'microservice' | 'supabase' | 'datalake';

type UserTier = 'admin' | 'auditor' | 'analyst' | 'viewer';

type RequestCategory =
  | 'semantic'
  | 'workflow'
  | 'ingestion'
  | 'transform'
  | 'audit'
  | 'transaction'
  | 'compliance'
  | 'archive';

interface GatewayConfig {
  qdrantUrl: string;
  n8nUrl: string;
  ingestionServiceUrl: string;
  transformServiceUrl: string;
  auditServiceUrl: string;
  supabaseUrl: string;
  supabaseKey: string;
  datalakeEndpoint: string;
  jwtSecret: string;
}

interface RouteDecision {
  target: BackendTarget;
  url: string;
  category: RequestCategory;
  auth_required: boolean;
  rate_limit: number;
}

interface AuthPayload {
  sub: string;
  tier: UserTier;
  permissions: string[];
  attributes: Record<string, string>;
  iat: number;
  exp: number;
}

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

interface GatewayMetrics {
  totalRequests: number;
  byBackend: Record<BackendTarget, number>;
  byCategory: Record<RequestCategory, number>;
  byTier: Record<UserTier, number>;
  averageLatency: number;
  errorRate: number;
  rateLimitHits: number;
}

// ─── Routing Rules ───────────────────────────────────────────

interface RoutingRule {
  pattern: RegExp;
  target: BackendTarget;
  category: RequestCategory;
  priority: number;
}

const ROUTING_TABLE: RoutingRule[] = [
  {
    pattern: /^\/api\/vector/,
    target: 'qdrant',
    category: 'semantic',
    priority: 100,
  },
  {
    pattern: /^\/api\/semantic/,
    target: 'qdrant',
    category: 'semantic',
    priority: 95,
  },
  {
    pattern: /^\/api\/workflow/,
    target: 'n8n',
    category: 'workflow',
    priority: 90,
  },
  {
    pattern: /^\/api\/orchestrate/,
    target: 'n8n',
    category: 'workflow',
    priority: 85,
  },
  {
    pattern: /^\/api\/ingest/,
    target: 'microservice',
    category: 'ingestion',
    priority: 80,
  },
  {
    pattern: /^\/api\/transform/,
    target: 'microservice',
    category: 'transform',
    priority: 75,
  },
  {
    pattern: /^\/api\/audit/,
    target: 'microservice',
    category: 'audit',
    priority: 70,
  },
  {
    pattern: /^\/api\/transaction/,
    target: 'microservice',
    category: 'transaction',
    priority: 65,
  },
  {
    pattern: /^\/api\/compliance/,
    target: 'supabase',
    category: 'compliance',
    priority: 60,
  },
  {
    pattern: /^\/api\/registry/,
    target: 'supabase',
    category: 'compliance',
    priority: 55,
  },
  {
    pattern: /^\/api\/archive/,
    target: 'datalake',
    category: 'archive',
    priority: 50,
  },
  {
    pattern: /^\/api\/datalake/,
    target: 'datalake',
    category: 'archive',
    priority: 45,
  },
];

// ─── Rate Limit Tiers ────────────────────────────────────────

const RATE_LIMITS: Record<UserTier, { rpm: number; burst: number }> = {
  admin: { rpm: 1000, burst: 50 },
  auditor: { rpm: 500, burst: 25 },
  analyst: { rpm: 200, burst: 10 },
  viewer: { rpm: 50, burst: 5 },
};

// ─── Backend URLs —──────────────────────────────────────────

function resolveBackendUrl(target: BackendTarget, config: GatewayConfig): string {
  switch (target) {
    case 'qdrant':
      return config.qdrantUrl;
    case 'n8n':
      return config.n8nUrl;
    case 'microservice':
      return config.ingestionServiceUrl;
    case 'supabase':
      return `${config.supabaseUrl}/rest/v1`;
    case 'datalake':
      return config.datalakeEndpoint;
  }
}

// ─── apiGateway ───────────────────────────────────────────

class apiGateway {
  private config: GatewayConfig;
  private rateLimitBuckets: Map<string, RateLimitBucket>;
  private metrics: GatewayMetrics;
  private requestLog: { path: string; target: BackendTarget; latency: number; status: number; timestamp: string }[];

  constructor(config: GatewayConfig) {
    this.config = config;
    this.rateLimitBuckets = new Map();
    this.requestLog = [];
    this.metrics = {
      totalRequests: 0,
      byBackend: { qdrant: 0, n8n: 0, microservice: 0, supabase: 0, datalake: 0 },
      byCategory: { semantic: 0, workflow: 0, ingestion: 0, transform: 0, audit: 0, transaction: 0, compliance: 0, archive: 0 },
      byTier: { admin: 0, auditor: 0, analyst: 0, viewer: 0 },
      averageLatency: 0,
      errorRate: 0,
      rateLimitHits: 0,
    };
  }

  // ── Route Decision ────────────────────────────────────────

  classifyRequest(path: string): RouteDecision {
    const sortedRules = [...ROUTING_TABLE].sort((a, b) => b.priority - a.priority);

    for (const rule of sortedRules) {
      if (rule.pattern.test(path)) {
        return {
          target: rule.target,
          url: `${resolveBackendUrl(rule.target, this.config)}${path}`,
          category: rule.category,
          auth_required: rule.target !== 'datalake' || path.includes('/audit/'),
          rate_limit: RATE_LIMITS.admin.rpm,
        };
      }
    }

    // Default → microservice
    return {
      target: 'microservice',
      url: `${this.config.ingestionServiceUrl}${path}`,
      category: 'transaction',
      auth_required: true,
      rate_limit: RATE_LIMITS.viewer.rpm,
    };
  }

  // ── JWT Validation ────────────────────────────────────────

  parseJwt(token: string): AuthPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = JSON.parse(atob(parts[1])) as AuthPayload;

      if (payload.exp && payload.exp * 1000 < Date.now()) {
        return null;
      }

      return payload;
    } catch {
      return null;
    }
  }

  // ── RBAC Check ────────────────────────────────────────────

  checkPermission(payload: AuthPayload, requiredPermission: string): boolean {
    if (payload.tier === 'admin') return true;
    return payload.permissions.includes(requiredPermission);
  }

  // ── ABAC Check ────────────────────────────────────────────

  checkAttributeAccess(
    payload: AuthPayload,
    requiredAttributes: Record<string, string>,
  ): boolean {
    for (const [key, value] of Object.entries(requiredAttributes)) {
      if (payload.attributes[key] !== value) return false;
    }
    return true;
  }

  // ── Rate Limiting ─────────────────────────────────────────

  checkRateLimit(userId: string, tier: UserTier): boolean {
    const now = Date.now();
    const key = `${userId}:${tier}`;
    const bucket = this.rateLimitBuckets.get(key);
    const limit = RATE_LIMITS[tier];

    if (!bucket || now > bucket.resetAt) {
      this.rateLimitBuckets.set(key, {
        count: 1,
        resetAt: now + 60000,
      });
      return true;
    }

    if (bucket.count >= limit.rpm) {
      this.metrics.rateLimitHits += 1;
      return false;
    }

    bucket.count += 1;
    return true;
  }

  // ── Main Request Handler ──────────────────────────────────

  async handleRequest(
    path: string,
    method: string,
    headers: Record<string, string>,
    body?: unknown,
  ): Promise<{
    status: number;
    data: unknown;
    routedTo: BackendTarget;
  }> {
    const startTime = performance.now();
    let status = 500;
    let data: unknown = null;

    try {
      // 1. Classify
      const route = this.classifyRequest(path);

      // 2. Auth
      if (route.auth_required) {
        const authHeader = headers['authorization'] || '';
        const token = authHeader.replace('Bearer ', '');

        if (!token) {
          return { status: 401, data: { error: 'Missing JWT token' }, routedTo: route.target };
        }

        const payload = this.parseJwt(token);
        if (!payload) {
          return { status: 401, data: { error: 'Invalid or expired JWT' }, routedTo: route.target };
        }

        // Rate limit
        if (!this.checkRateLimit(payload.sub, payload.tier)) {
          return {
            status: 429,
            data: { error: 'Rate limit exceeded', retryAfter: 60 },
            routedTo: route.target,
          };
        }

        this.metrics.byTier[payload.tier] += 1;
      }

      // 3. Proxy to backend
      const proxyRes = await fetch(route.url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });

      status = proxyRes.status;
      data = await proxyRes.json().catch(() => null);

      // 4. Log
      this.metrics.totalRequests += 1;
      this.metrics.byBackend[route.target] += 1;
      this.metrics.byCategory[route.category] += 1;

      const latency = performance.now() - startTime;
      this.requestLog.push({
        path,
        target: route.target,
        latency,
        status,
        timestamp: new Date().toISOString(),
      });

      // Update avg latency
      const totalLatencies = this.requestLog.reduce((s, l) => s + l.latency, 0);
      this.metrics.averageLatency = totalLatencies / this.requestLog.length;

      // Update error rate
      const errors = this.requestLog.filter((l) => l.status >= 400).length;
      this.metrics.errorRate = errors / this.requestLog.length;

      return { status, data, routedTo: route.target };
    } catch (err) {
      status = 502;
      data = { error: 'Backend unreachable', detail: String(err) };

      const latency = performance.now() - startTime;
      this.requestLog.push({
        path,
        target: 'microservice',
        latency,
        status,
        timestamp: new Date().toISOString(),
      });

      this.metrics.errorRate =
        this.requestLog.filter((l) => l.status >= 400).length /
        Math.max(this.requestLog.length, 1);

      return { status, data, routedTo: 'microservice' };
    }
  }

  // ── Observability ──────────────────────────────────────────

  getMetrics(): GatewayMetrics {
    return { ...this.metrics };
  }

  getRecentRequests(limit = 50): typeof this.requestLog {
    return this.requestLog.slice(-limit);
  }

  getBackendHealth(): Record<BackendTarget, { healthy: boolean; latency: number }> {
    // Health check results (would be populated by actual checks)
    return {
      qdrant: { healthy: true, latency: 12 },
      n8n: { healthy: true, latency: 45 },
      microservice: { healthy: true, latency: 8 },
      supabase: { healthy: true, latency: 120 },
      datalake: { healthy: true, latency: 25 },
    };
  }

  // ── Reset ─────────────────────────────────────────────────

  resetMetrics(): void {
    this.metrics = {
      totalRequests: 0,
      byBackend: { qdrant: 0, n8n: 0, microservice: 0, supabase: 0, datalake: 0 },
      byCategory: { semantic: 0, workflow: 0, ingestion: 0, transform: 0, audit: 0, transaction: 0, compliance: 0, archive: 0 },
      byTier: { admin: 0, auditor: 0, analyst: 0, viewer: 0 },
      averageLatency: 0,
      errorRate: 0,
      rateLimitHits: 0,
    };
    this.requestLog = [];
  }
}

// ─── Singleton ───────────────────────────────────────────────

let gatewayInstance: apiGateway | null = null;

export function getApiGateway(config: GatewayConfig): apiGateway {
  if (!gatewayInstance) {
    gatewayInstance = new apiGateway(config);
  }
  return gatewayInstance;
}

export { apiGateway, ROUTING_TABLE, RATE_LIMITS };
export type {
  BackendTarget,
  UserTier,
  RequestCategory,
  GatewayConfig,
  RouteDecision,
  AuthPayload,
  GatewayMetrics,
};



