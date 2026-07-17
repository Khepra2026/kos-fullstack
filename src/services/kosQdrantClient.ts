/**
 * ═══════════════════════════════════════════════════════════════
 * KOS QDRANT CLIENT™ — Vector Intelligence Layer
 * KHEPRA EXPERTS — Big Four Architecture Technique
 * ═══════════════════════════════════════════════════════════════
 *
 * Remplace TOTALEMENT rag_embeddings Supabase.
 * 5 collections: legal_vectors, business_vectors, compliance_vectors,
 *                knowledge_vectors, audit_vectors
 *
 * Supabase = ZÉRO embedding. TOUT dans Qdrant local.
 */

// ─── Types ───────────────────────────────────────────────────

interface QdrantConfig {
  url: string;
  apiKey?: string;
  timeout: number;
  retries: number;
}

interface VectorPoint {
  id: string;
  vector: number[];
  payload: Record<string, unknown>;
}

interface SearchResult {
  id: string;
  score: number;
  payload: Record<string, unknown>;
}

interface CollectionInfo {
  name: string;
  vectorsCount: number;
  pointsCount: number;
  status: 'green' | 'yellow' | 'red';
  segmentsCount: number;
}

type CollectionName =
  | 'legal_vectors'
  | 'business_vectors'
  | 'compliance_vectors'
  | 'knowledge_vectors'
  | 'audit_vectors';

interface ClusterInfo {
  vectorDensity: number;
  duplicationRate: number;
  clusterCount: number;
  recommendations: string[];
}

// ─── Configuration ────────────────────────────────────────────

const QDRANT_COLLECTIONS: Record<CollectionName, { dimension: number; description: string }> = {
  legal_vectors: {
    dimension: 1536,
    description: 'Textes réglementaires BCEAO, COBAC, OHADA, CIMA, COSUMAF, AMF-UEMOA, GAFI',
  },
  business_vectors: {
    dimension: 1536,
    description: 'Analyses stratégiques, rapports financiers, études de marché, due diligences',
  },
  compliance_vectors: {
    dimension: 1536,
    description: 'Contrôles de conformité, audits, certifications, matrices de risques',
  },
  knowledge_vectors: {
    dimension: 1536,
    description: 'Leçons apprises, best practices, case studies, knowledge capsules',
  },
  audit_vectors: {
    dimension: 1536,
    description: 'Traces d\'audit, logs structurés, historiques de validation',
  },
};

const DEFAULT_CONFIG: QdrantConfig = {
  url: 'http://localhost:6333',
  timeout: 10000,
  retries: 3,
};

// ─── QdrantClient ────────────────────────────────────────────

class QdrantClient {
  private config: QdrantConfig;

  constructor(config: Partial<QdrantConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // ── Health ────────────────────────────────────────────────

  async healthCheck(): Promise<boolean> {
    try {
      const res = await this.fetch('/health');
      return res.ok;
    } catch {
      return false;
    }
  }

  // ── Collection Management ─────────────────────────────────

  async listCollections(): Promise<CollectionInfo[]> {
    const res = await this.fetch('/collections');
    const data = await res.json();
    return (data.result?.collections || []).map((c: Record<string, unknown>) => ({
      name: String(c.name || ''),
      vectorsCount: Number(c.vectors_count || 0),
      pointsCount: Number(c.points_count || 0),
      status: String(c.status || 'red') as CollectionInfo['status'],
      segmentsCount: Number(c.segments_count || 0),
    }));
  }

  async createCollection(name: CollectionName): Promise<void> {
    const spec = QDRANT_COLLECTIONS[name];
    await this.fetch(`/collections/${name}`, {
      method: 'PUT',
      body: JSON.stringify({
        vectors: {
          size: spec.dimension,
          distance: 'Cosine',
        },
        optimizers_config: {
          default_segment_number: 2,
        },
        replication_factor: 1,
      }),
    });
  }

  async ensureCollection(name: CollectionName): Promise<void> {
    const collections = await this.listCollections();
    const exists = collections.some((c) => c.name === name);
    if (!exists) {
      await this.createCollection(name);
    }
  }

  async ensureAllCollections(): Promise<void> {
    const names: CollectionName[] = [
      'legal_vectors',
      'business_vectors',
      'compliance_vectors',
      'knowledge_vectors',
      'audit_vectors',
    ];
    await Promise.all(names.map((n) => this.ensureCollection(n)));
  }

  async deleteCollection(name: CollectionName): Promise<void> {
    await this.fetch(`/collections/${name}`, { method: 'DELETE' });
  }

  async getCollectionInfo(name: CollectionName): Promise<CollectionInfo> {
    const res = await this.fetch(`/collections/${name}`);
    const data = await res.json();
    const r = data.result || {};
    return {
      name: String(r.name || name),
      vectorsCount: Number(r.vectors_count || 0),
      pointsCount: Number(r.points_count || 0),
      status: String(r.status || 'red') as CollectionInfo['status'],
      segmentsCount: Number(r.segments_number || 0),
    };
  }

  // ── Vector Operations ─────────────────────────────────────

  async upsert(collection: CollectionName, points: VectorPoint[]): Promise<void> {
    await this.fetch(`/collections/${collection}/points?wait=true`, {
      method: 'PUT',
      body: JSON.stringify({
        points: points.map((p) => ({
          id: p.id,
          vector: p.vector,
          payload: p.payload,
        })),
      }),
    });
  }

  async search(
    collection: CollectionName,
    vector: number[],
    limit = 10,
    scoreThreshold = 0.7,
  ): Promise<SearchResult[]> {
    const res = await this.fetch(`/collections/${collection}/points/search`, {
      method: 'POST',
      body: JSON.stringify({
        vector,
        limit,
        score_threshold: scoreThreshold,
        with_payload: true,
      }),
    });
    const data = await res.json();
    return (data.result || []).map((r: Record<string, unknown>) => ({
      id: String(r.id || ''),
      score: Number(r.score || 0),
      payload: (r.payload || {}) as Record<string, unknown>,
    }));
  }

  async batchSearch(
    searches: { collection: CollectionName; vector: number[]; limit?: number }[],
  ): Promise<SearchResult[][]> {
    return Promise.all(
      searches.map((s) => this.search(s.collection, s.vector, s.limit || 10)),
    );
  }

  async crossCollectionSearch(
    vector: number[],
    limit = 10,
  ): Promise<Record<CollectionName, SearchResult[]>> {
    const collections: CollectionName[] = [
      'legal_vectors',
      'business_vectors',
      'compliance_vectors',
      'knowledge_vectors',
      'audit_vectors',
    ];
    const results = await this.batchSearch(
      collections.map((c) => ({ collection: c, vector, limit })),
    );
    const out: Record<string, SearchResult[]> = {};
    collections.forEach((c, i) => {
      out[c] = results[i];
    });
    return out as Record<CollectionName, SearchResult[]>;
  }

  async deletePoints(collection: CollectionName, ids: string[]): Promise<void> {
    await this.fetch(`/collections/${collection}/points/delete?wait=true`, {
      method: 'POST',
      body: JSON.stringify({ points: ids }),
    });
  }

  async getPoint(collection: CollectionName, id: string): Promise<VectorPoint | null> {
    const res = await this.fetch(`/collections/${collection}/points/${id}`);
    if (!res.ok) return null;
    const data = await res.json();
    const r = data.result || {};
    return {
      id: String(r.id || id),
      vector: (r.vector || []) as number[],
      payload: (r.payload || {}) as Record<string, unknown>,
    };
  }

  // ── Clustering & Deduplication ─────────────────────────────

  async detectDuplicates(
    collection: CollectionName,
    threshold = 0.98,
  ): Promise<{ duplicates: string[][]; rate: number }> {
    const info = await this.getCollectionInfo(collection);
    if (info.pointsCount === 0) return { duplicates: [], rate: 0 };

    const recRes = await this.fetch(`/collections/${collection}/points/recommend`, {
      method: 'POST',
      body: JSON.stringify({
        positive: [],
        limit: Math.min(info.pointsCount, 100),
        with_payload: false,
      }),
    });
    const recData = await recRes.json();
    const items = (recData.result || []) as Record<string, unknown>[];

    const duplicates: string[][] = [];
    let duplicateCount = 0;

    const seen = new Set<string>();
    for (const item of items) {
      const id = String(item.id || '');
      if (seen.has(id)) continue;
      seen.add(id);

      const sims = (item.similar || []) as Record<string, unknown>[];
      const group: string[] = [id];
      for (const sim of sims) {
        if (Number(sim.score || 0) >= threshold) {
          group.push(String(sim.id || ''));
          duplicateCount += 1;
        }
      }
      if (group.length > 1) duplicates.push(group);
    }

    return {
      duplicates,
      rate: info.pointsCount > 0 ? duplicateCount / info.pointsCount : 0,
    };
  }

  async mergeDuplicates(
    collection: CollectionName,
    threshold = 0.98,
  ): Promise<{ merged: number }> {
    const { duplicates } = await this.detectDuplicates(collection, threshold);
    let merged = 0;

    for (const group of duplicates) {
      if (group.length < 2) continue;
      const [keeper, ...removed] = group;
      await this.deletePoints(collection, removed);
      merged += removed.length;
    }

    return { merged };
  }

  // ── Cluster Analysis ──────────────────────────────────────

  async analyzeClusters(collection: CollectionName): Promise<ClusterInfo> {
    const info = await this.getCollectionInfo(collection);
    const { rate: duplicationRate } = await this.detectDuplicates(collection);

    const vectorDensity =
      info.pointsCount > 0
        ? info.vectorsCount / (info.pointsCount * QDRANT_COLLECTIONS[collection].dimension)
        : 0;

    const recommendations: string[] = [];
    if (duplicationRate > 0.15) {
      recommendations.push(
        `HIGH_DUPLICATION: ${collection} a ${(duplicationRate * 100).toFixed(1)}% de doublons — merge recommandé`,
      );
    }
    if (vectorDensity < 0.3) {
      recommendations.push(
        `LOW_DENSITY: ${collection} densité ${vectorDensity.toFixed(3)} — enrichissement nécessaire`,
      );
    }
    if (info.pointsCount > 100000) {
      recommendations.push(
        `LARGE_COLLECTION: ${collection} a ${info.pointsCount} points — sharding recommandé`,
      );
    }

    return {
      vectorDensity,
      duplicationRate,
      clusterCount: info.segmentsCount,
      recommendations,
    };
  }

  // ── Global Intelligence ───────────────────────────────────

  async getGlobalMetrics(): Promise<{
    totalVectors: number;
    totalPoints: number;
    collections: Record<CollectionName, CollectionInfo>;
    clusters: Record<CollectionName, ClusterInfo>;
  }> {
    const collectionsList = await this.listCollections();
    const collectionMap: Record<string, CollectionInfo> = {};
    const clusterMap: Record<string, ClusterInfo> = {};

    for (const c of collectionsList) {
      if (c.name in QDRANT_COLLECTIONS) {
        collectionMap[c.name] = c;
        clusterMap[c.name] = await this.analyzeClusters(c.name as CollectionName);
      }
    }

    return {
      totalVectors: collectionsList.reduce((s, c) => s + c.vectorsCount, 0),
      totalPoints: collectionsList.reduce((s, c) => s + c.pointsCount, 0),
      collections: collectionMap as Record<CollectionName, CollectionInfo>,
      clusters: clusterMap as Record<CollectionName, ClusterInfo>,
    };
  }

  // ── Migration from Supabase ──────────────────────────────────

  async migrateFromSupabase(
    supabaseUrl: string,
    supabaseKey: string,
  ): Promise<{ migrated: number; errors: number }> {
    let migrated = 0;
    let errors = 0;

    const res = await fetch(`${supabaseUrl}/rest/v1/rag_embeddings?select=*`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Supabase fetch failed: ${res.status}`);
    }

    const rows = (await res.json()) as Record<string, unknown>[];

    const batches: Record<CollectionName, VectorPoint[]> = {
      legal_vectors: [],
      business_vectors: [],
      compliance_vectors: [],
      knowledge_vectors: [],
      audit_vectors: [],
    };

    for (const row of rows) {
      try {
        const collection = (
          String(row.collection || 'knowledge_vectors')
        ) as CollectionName;
        if (!(collection in batches)) continue;

        batches[collection].push({
          id: String(row.id || crypto.randomUUID()),
          vector: (row.embedding || []) as number[],
          payload: {
            source: row.source || '',
            regulator: row.regulator || '',
            chunk_text: row.chunk_text || '',
            metadata: row.metadata || {},
            migrated_at: new Date().toISOString(),
            original_id: row.id,
          },
        });
      } catch {
        errors += 1;
      }
    }

    for (const [collection, points] of Object.entries(batches)) {
      if (points.length === 0) continue;
      await this.ensureCollection(collection as CollectionName);
      await this.upsert(collection as CollectionName, points);
      migrated += points.length;
    }

    return { migrated, errors };
  }

  // ── Internal fetch ────────────────────────────────────────

  private async fetch(path: string, options?: Record<string, unknown>): Promise<Response> {
    const url = `${this.config.url}${path}`;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.config.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        const res = await fetch(url, {
          ...options,
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            ...(this.config.apiKey ? { 'api-key': this.config.apiKey } : {}),
            ...(options?.headers || {}),
          },
        });

        clearTimeout(timeoutId);

        if (!res.ok && attempt < this.config.retries) {
          await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
          continue;
        }

        return res;
      } catch (err) {
        lastError = err as Error;
        if (attempt < this.config.retries) {
          await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
        }
      }
    }

    throw lastError || new Error('Qdrant request failed after retries');
  }
}

// ─── Singleton ───────────────────────────────────────────────

let instance: QdrantClient | null = null;

export function getQdrantClient(config?: Partial<QdrantConfig>): QdrantClient {
  if (!instance) {
    instance = new QdrantClient(config);
  }
  return instance;
}

export { QdrantClient, QDRANT_COLLECTIONS };
export type {
  QdrantConfig,
  VectorPoint,
  SearchResult,
  CollectionInfo,
  CollectionName,
  ClusterInfo,
};