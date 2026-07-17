/**
 * ═══════════════════════════════════════════════════════════════
 * KOS REGULATORY DATA LAKE™ — Source of Truth
 * KHEPRA EXPERTS — Big Four Architecture Technique
 * ═══════════════════════════════════════════════════════════════
 *
 * 5 Zones: RAW → CLEAN → GOVERNED → AUDIT → EXPORT
 * Formats: Parquet, JSONL, Avro, SQL Snapshots
 * Propriétés: Immutabilité, Versioning, Hash Chain, Audit Trail
 *
 * 7 Régulateurs: BCEAO, COBAC, CIMA, OHADA, COSUMAF, AMF-UEMOA, GAFI
 */

// ─── Types ───────────────────────────────────────────────────

type DataLakeZone = 'raw' | 'clean' | 'governed' | 'audit' | 'export';

type Regulator =
  | 'bceao'
  | 'cobac'
  | 'cima'
  | 'ohada'
  | 'cosumaf'
  | 'crepmf'
  | 'gafi';

type StorageFormat = 'parquet' | 'jsonl' | 'avro' | 'sql_snapshot';

type DocumentStatus = 'ingested' | 'validated' | 'governed' | 'archived' | 'exported';

interface DataLakeDocument {
  id: string;
  regulator: Regulator;
  zone: DataLakeZone;
  format: StorageFormat;
  path: string;
  hash: string;
  previousHash: string | null;
  version: number;
  status: DocumentStatus;
  size: number;
  ingestedAt: string;
  validatedAt: string | null;
  governedAt: string | null;
  metadata: Record<string, unknown>;
}

interface HashChainEntry {
  documentId: string;
  hash: string;
  previousHash: string;
  timestamp: string;
  version: number;
}

interface DataLakeMetrics {
  totalDocuments: number;
  totalSize: number;
  byRegulator: Record<Regulator, number>;
  byZone: Record<DataLakeZone, number>;
  byStatus: Record<DocumentStatus, number>;
  hashChainLength: number;
  lastIngestion: string | null;
  integrityStatus: 'valid' | 'compromised' | 'unverified';
}

interface ZoneConfig {
  name: DataLakeZone;
  mutable: boolean;
  compression: boolean;
  retentionDays: number;
  description: string;
}

// ─── Zone Configuration ─────────────────────────────────────

const ZONE_CONFIGS: ZoneConfig[] = [
  {
    name: 'raw',
    mutable: false,
    compression: false,
    retentionDays: 365,
    description: 'Immutable ingestion — source documents hashés, jamais modifiés',
  },
  {
    name: 'clean',
    mutable: true,
    compression: true,
    retentionDays: 730,
    description: 'Validated & normalized — données nettoyées et structurées',
  },
  {
    name: 'governed',
    mutable: true,
    compression: true,
    retentionDays: 2555,
    description: 'Compliance-ready — versionnées, annotées, certifiées',
  },
  {
    name: 'audit',
    mutable: false,
    compression: true,
    retentionDays: 3650,
    description: 'Historical trace — hash chain complète, immuable',
  },
  {
    name: 'export',
    mutable: true,
    compression: true,
    retentionDays: 90,
    description: 'Reporting & analytics — données prêtes à l\'export',
  },
];

const REGULATORS: Regulator[] = [
  'bceao',
  'cobac',
  'cima',
  'ohada',
  'cosumaf',
  'crepmf',
  'gafi',
];

const REGULATOR_FULL_NAMES: Record<Regulator, string> = {
  bceao: 'Banque Centrale des États de l\'Afrique de l\'Ouest',
  cobac: 'Commission Bancaire de l\'Afrique Centrale',
  cima: 'Conférence Interafricaine des Marchés d\'Assurance',
  ohada: 'Organisation pour l\'Harmonisation en Afrique du Droit des Affaires',
  cosumaf: 'Commission de Surveillance du Marché Financier de l\'Afrique Centrale',
  crepmf: 'Conseil Régional de l\'Épargne Publique et des Marchés Financiers',
  gafi: 'Groupe d\'Action Financière',
};

// ─── Hash Utilities ──────────────────────────────────────────

async function sha256(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function computeSimpleHash(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
}

// ─── KosDataLake ─────────────────────────────────────────────

class KosDataLake {
  private documents: Map<string, DataLakeDocument>;
  private hashChain: HashChainEntry[];
  private lastHash: string | null;

  constructor() {
    this.documents = new Map();
    this.hashChain = [];
    this.lastHash = null;
  }

  // ── Zone Path Helpers ─────────────────────────────────────

  getZonePath(regulator: Regulator, zone: DataLakeZone): string {
    return `/regulatory-data/${zone}/${regulator}/`;
  }

  getDocumentPath(doc: DataLakeDocument): string {
    return `${this.getZonePath(doc.regulator, doc.zone)}${doc.id}.${doc.format === 'sql_snapshot' ? 'sql' : doc.format}`;
  }

  // ── Ingestion (RAW Zone) ──────────────────────────────────

  async ingestDocument(
    regulator: Regulator,
    data: string,
    format: StorageFormat,
    metadata: Record<string, unknown> = {},
  ): Promise<DataLakeDocument> {
    const id = crypto.randomUUID();
    const hash = await sha256(data);
    const doc: DataLakeDocument = {
      id,
      regulator,
      zone: 'raw',
      format,
      path: this.getZonePath(regulator, 'raw') + id + this.formatExtension(format),
      hash,
      previousHash: this.lastHash,
      version: 1,
      status: 'ingested',
      size: new TextEncoder().encode(data).length,
      ingestedAt: new Date().toISOString(),
      validatedAt: null,
      governedAt: null,
      metadata: {
        ...metadata,
        ingestion_method: 'api',
        original_encoding: 'utf-8',
      },
    };

    this.documents.set(id, doc);
    this.addToHashChain(doc);

    return doc;
  }

  async batchIngest(
    items: { regulator: Regulator; data: string; format: StorageFormat; metadata?: Record<string, unknown> }[],
  ): Promise<DataLakeDocument[]> {
    return Promise.all(items.map((item) => this.ingestDocument(item.regulator, item.data, item.format, item.metadata)));
  }

  // ── Validation (RAW → CLEAN) ──────────────────────────────

  async validateDocument(
    id: string,
    validator: string,
  ): Promise<DataLakeDocument> {
    const doc = this.documents.get(id);
    if (!doc) throw new Error(`Document ${id} not found`);
    if (doc.zone !== 'raw') throw new Error(`Document ${id} is not in RAW zone`);

    const cleanData = JSON.stringify({ validated: true, originalId: id, validator });
    const cleanHash = await sha256(cleanData);

    const cleanDoc: DataLakeDocument = {
      ...doc,
      id: crypto.randomUUID(),
      zone: 'clean',
      path: this.getZonePath(doc.regulator, 'clean') + doc.id + this.formatExtension(doc.format),
      hash: cleanHash,
      previousHash: doc.hash,
      version: doc.version + 1,
      status: 'validated',
      validatedAt: new Date().toISOString(),
      metadata: {
        ...doc.metadata,
        validated_by: validator,
        original_raw_id: doc.id,
        validation_timestamp: new Date().toISOString(),
      },
    };

    this.documents.set(cleanDoc.id, cleanDoc);
    this.addToHashChain(cleanDoc);

    return cleanDoc;
  }

  // ── Governance (CLEAN → GOVERNED) ─────────────────────────

  async governDocument(
    id: string,
    governor: string,
    complianceFramework: string,
  ): Promise<DataLakeDocument> {
    const doc = this.documents.get(id);
    if (!doc) throw new Error(`Document ${id} not found`);
    if (doc.zone !== 'clean') throw new Error(`Document ${id} is not in CLEAN zone`);

    const governedDoc: DataLakeDocument = {
      ...doc,
      id: crypto.randomUUID(),
      zone: 'governed',
      path: this.getZonePath(doc.regulator, 'governed') + doc.id + this.formatExtension(doc.format),
      version: doc.version + 1,
      status: 'governed',
      governedAt: new Date().toISOString(),
      metadata: {
        ...doc.metadata,
        governed_by: governor,
        compliance_framework: complianceFramework,
        governance_timestamp: new Date().toISOString(),
      },
    };

    const govHashData = JSON.stringify({ doc, governor, complianceFramework });
    governedDoc.hash = await sha256(govHashData);
    governedDoc.previousHash = doc.hash;

    this.documents.set(governedDoc.id, governedDoc);
    this.addToHashChain(governedDoc);

    return governedDoc;
  }

  // ── Audit Trail ────────────────────────────────────────────

  private addToHashChain(doc: DataLakeDocument): void {
    const entry: HashChainEntry = {
      documentId: doc.id,
      hash: doc.hash,
      previousHash: doc.previousHash || this.lastHash || '0'.repeat(64),
      timestamp: new Date().toISOString(),
      version: doc.version,
    };
    this.hashChain.push(entry);
    this.lastHash = doc.hash;
  }

  async verifyIntegrity(): Promise<{
    valid: boolean;
    brokenLinks: string[];
    chainLength: number;
  }> {
    const brokenLinks: string[] = [];

    for (let i = 1; i < this.hashChain.length; i++) {
      const current = this.hashChain[i];
      const previous = this.hashChain[i - 1];

      if (current.previousHash !== previous.hash) {
        brokenLinks.push(
          `Chain broken at index ${i}: expected previous=${previous.hash}, got ${current.previousHash}`,
        );
      }
    }

    return {
      valid: brokenLinks.length === 0,
      brokenLinks,
      chainLength: this.hashChain.length,
    };
  }

  getHashChain(): HashChainEntry[] {
    return [...this.hashChain];
  }

  // ── Export ─────────────────────────────────────────────────

  async exportDocument(
    id: string,
    targetFormat: StorageFormat,
  ): Promise<DataLakeDocument> {
    const doc = this.documents.get(id);
    if (!doc) throw new Error(`Document ${id} not found`);

    const exportDoc: DataLakeDocument = {
      ...doc,
      id: crypto.randomUUID(),
      zone: 'export',
      format: targetFormat,
      path: this.getZonePath(doc.regulator, 'export') + doc.id + this.formatExtension(targetFormat),
      version: doc.version + 1,
      status: 'exported',
      metadata: {
        ...doc.metadata,
        exported_at: new Date().toISOString(),
        original_format: doc.format,
        source_zone: doc.zone,
      },
    };

    this.documents.set(exportDoc.id, exportDoc);
    this.addToHashChain(exportDoc);

    return exportDoc;
  }

  // ── Query ──────────────────────────────────────────────────

  getDocument(id: string): DataLakeDocument | null {
    return this.documents.get(id) || null;
  }

  listDocuments(filters?: {
    regulator?: Regulator;
    zone?: DataLakeZone;
    status?: DocumentStatus;
    format?: StorageFormat;
    limit?: number;
  }): DataLakeDocument[] {
    let results = [...this.documents.values()];

    if (filters?.regulator) {
      results = results.filter((d) => d.regulator === filters.regulator);
    }
    if (filters?.zone) {
      results = results.filter((d) => d.zone === filters.zone);
    }
    if (filters?.status) {
      results = results.filter((d) => d.status === filters.status);
    }
    if (filters?.format) {
      results = results.filter((d) => d.format === filters.format);
    }

    results.sort((a, b) => b.ingestedAt.localeCompare(a.ingestedAt));

    if (filters?.limit) {
      results = results.slice(0, filters.limit);
    }

    return results;
  }

  searchDocuments(query: string): DataLakeDocument[] {
    const lower = query.toLowerCase();
    return [...this.documents.values()].filter(
      (d) =>
        d.regulator.includes(lower as Regulator) ||
        d.path.toLowerCase().includes(lower) ||
        JSON.stringify(d.metadata).toLowerCase().includes(lower) ||
        d.hash.includes(lower),
    );
  }

  // ── Metrics ────────────────────────────────────────────────

  getMetrics(): DataLakeMetrics {
    const docs = [...this.documents.values()];

    const byRegulator: Record<string, number> = {};
    const byZone: Record<string, number> = {};
    const byStatus: Record<string, number> = {};

    for (const r of REGULATORS) byRegulator[r] = 0;
    for (const z of ZONE_CONFIGS) byZone[z.name] = 0;
    byStatus.ingested = 0;
    byStatus.validated = 0;
    byStatus.governed = 0;
    byStatus.archived = 0;
    byStatus.exported = 0;

    for (const doc of docs) {
      byRegulator[doc.regulator] = (byRegulator[doc.regulator] || 0) + 1;
      byZone[doc.zone] = (byZone[doc.zone] || 0) + 1;
      byStatus[doc.status] = (byStatus[doc.status] || 0) + 1;
    }

    return {
      totalDocuments: docs.length,
      totalSize: docs.reduce((s, d) => s + d.size, 0),
      byRegulator: byRegulator as Record<Regulator, number>,
      byZone: byZone as Record<DataLakeZone, number>,
      byStatus: byStatus as Record<DocumentStatus, number>,
      hashChainLength: this.hashChain.length,
      lastIngestion: docs.length > 0 ? docs[0].ingestedAt : null,
      integrityStatus: 'unverified',
    };
  }

  // ── Retention ──────────────────────────────────────────────

  async applyRetentionPolicies(): Promise<{
    archived: number;
    deleted: number;
  }> {
    const now = Date.now();
    let archived = 0;
    let deleted = 0;

    for (const [id, doc] of this.documents) {
      const zone = ZONE_CONFIGS.find((z) => z.name === doc.zone);
      if (!zone) continue;

      const age = now - new Date(doc.ingestedAt).getTime();
      const ageDays = age / (1000 * 60 * 60 * 24);

      if (ageDays > zone.retentionDays) {
        if (doc.zone === 'export') {
          this.documents.delete(id);
          deleted += 1;
        } else {
          const archivedDoc: DataLakeDocument = {
            ...doc,
            zone: 'audit',
            status: 'archived',
            path: this.getZonePath(doc.regulator, 'audit') + doc.id + this.formatExtension(doc.format),
            metadata: {
              ...doc.metadata,
              archived_at: new Date().toISOString(),
              retention_exceeded: true,
              original_zone: doc.zone,
            },
          };
          this.documents.set(id, archivedDoc);
          archived += 1;
        }
      }
    }

    return { archived, deleted };
  }

  // ── Helpers ────────────────────────────────────────────────

  private formatExtension(format: StorageFormat): string {
    switch (format) {
      case 'parquet':
        return '.parquet';
      case 'jsonl':
        return '.jsonl';
      case 'avro':
        return '.avro';
      case 'sql_snapshot':
        return '.sql';
    }
  }

  // ── Supabase Sync ──────────────────────────────────────────

  async syncWithSupabase(
    supabaseUrl: string,
    supabaseKey: string,
  ): Promise<{ synced: number; failed: number }> {
    let synced = 0;
    let failed = 0;

    const governedDocs = this.listDocuments({ zone: 'governed' });

    for (const doc of governedDocs) {
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/audit_logs`, {
          method: 'POST',
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            document_id: doc.id,
            hash: doc.hash,
            regulator: doc.regulator,
            zone: doc.zone,
            ingested_at: doc.ingestedAt,
            governed_at: doc.governedAt,
            metadata: doc.metadata,
          }),
        });

        if (res.ok) {
          synced += 1;
        } else {
          failed += 1;
        }
      } catch {
        failed += 1;
      }
    }

    return { synced, failed };
  }
}

// ─── Singleton ───────────────────────────────────────────────

let dataLakeInstance: KosDataLake | null = null;

export function getDataLake(): KosDataLake {
  if (!dataLakeInstance) {
    dataLakeInstance = new KosDataLake();
  }
  return dataLakeInstance;
}

export {
  KosDataLake,
  ZONE_CONFIGS,
  REGULATORS,
  REGULATOR_FULL_NAMES,
  sha256,
  computeSimpleHash,
};
export type {
  DataLakeZone,
  Regulator,
  StorageFormat,
  DocumentStatus,
  DataLakeDocument,
  HashChainEntry,
  DataLakeMetrics,
  ZoneConfig,
};