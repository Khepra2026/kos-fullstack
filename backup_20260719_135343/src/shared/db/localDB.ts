import Dexie from 'dexie';
import { logger } from '@/core/logger';

// KOS Regtech AI — Base IndexedDB Centralisée
// Dexie-powered, 0 réseau, chiffrement local, export/import
// Tables: controls, incidents, evidences, reports, rules, auditLogs
// v3: controlRuns, processingRecords, modelInventory, anchors

export interface Control {
  id: string;
  status: 'CONFORME' | 'ECART_MINEUR' | 'ECART_MAJEUR' | 'NON_CONFORME';
  owner: string;
  tags: string[];
  regulation: string;
  article: string;
  description: string;
  lastChecked: string;
  evidenceHash?: string;
  rule?: string; // Rule logic for CCM engine
  dataSources?: string[]; // BCBS 239 data lineage
}

export interface Incident {
  id: string;
  date: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  regulation: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
  resolvedAt?: string;
}

export interface Evidence {
  id: string;
  hash: string;
  fileName: string;
  size: number;
  mimeType: string;
  capturedAt: string;
  regulation: string;
  encrypted: ArrayBuffer;
  chainPrevHash?: string;
}

export interface ComplianceReport {
  id: string;
  entityId: string;
  createdAt: string;
  score: number;
  totalRules: number;
  conformRules: number;
  hash: string;
}

export interface BCEAORule {
  id: string;
  ref: string;
  version: string;
  hashSignature: string;
  article: string;
  exigence: string;
  controle: 'AUTO' | 'SEMI_AUTO' | 'MANUEL';
  preuve: string;
  frequence: 'TEMPS_REEL' | 'QUOTIDIEN' | 'MENSUEL';
  penalite: string;
}

export interface AuditLogRow {
  hash: string;
  merkleRoot: string;
  timestamp: number;
  entry: Record<string, unknown>;
}

// ─── v3: Nouvelles tables ───

export interface ControlRun {
  id?: number;
  controlId: string;
  result: 'PASS' | 'FAIL';
  duration: number;
  ts: number;
  dataLineage?: string[];
  evidenceHash?: string;
  zscore?: number;
}

export interface ProcessingRecordRow {
  id: string;
  purpose: string;
  legalBasis: 'CONSENT' | 'CONTRACT' | 'LEGAL_OBLIGATION' | 'LEGITIMATE_INTEREST';
  dataCategories: string[];
  recipients: string[];
  retention: string;
  transfers: { country: string; safeguard: 'SCC' | 'BCR' }[];
  dpiaRequired: boolean;
  dpiaHash?: string;
  riskScore?: number;
  createdAt: number;
}

export interface ModelInventoryRow {
  modelId: string;
  tier: 1 | 2 | 3;
  version: string;
  owner: string;
  validator: string;
  lastValidation: number;
  performanceMetrics: { auc: number; ks: number; psi: number };
  driftStatus: 'GREEN' | 'AMBER' | 'RED';
  limitations: string[];
  dataset?: string;
}

export interface AnchorRecord {
  id?: number;
  merkleRoot: string;
  tsaToken: number[];
  otsProof: string;
  ts: number;
}

export class dB extends Dexie {
  controls!: Dexie.Table<Control, string>;
  incidents!: Dexie.Table<Incident, string>;
  evidences!: Dexie.Table<Evidence, string>;
  reports!: Dexie.Table<ComplianceReport, string>;
  rules!: Dexie.Table<BCEAORule, string>;
  auditLogs!: Dexie.Table<AuditLogRow, string>;
  controlRuns!: Dexie.Table<ControlRun, number>;
  processingRecords!: Dexie.Table<ProcessingRecordRow, string>;
  modelInventory!: Dexie.Table<ModelInventoryRow, string>;
  anchors!: Dexie.Table<AnchorRecord, number>;

  constructor() {
    super('KOS_Local');
    this.version(1).stores({
      controls: 'id, status, owner, *tags',
      incidents: 'id, date, severity',
      evidences: 'id, hash',
      reports: 'id, entityId, createdAt',
      rules: 'id, ref, version, hashSignature',
    });
    this.version(2).stores({
      controls: 'id, status, owner, *tags',
      incidents: 'id, date, severity',
      evidences: 'id, hash',
      reports: 'id, entityId, createdAt',
      rules: 'id, ref, version, hashSignature',
      auditLogs: 'hash, timestamp, merkleRoot',
    });
    this.version(3).stores({
      controls: 'id, status, owner, *tags',
      incidents: 'id, date, severity',
      evidences: 'id, hash',
      reports: 'id, entityId, createdAt',
      rules: 'id, ref, version, hashSignature',
      auditLogs: 'hash, timestamp, merkleRoot',
      controlRuns: '++id, controlId, result, ts',
      processingRecords: 'id, legalBasis',
      modelInventory: 'modelId, tier, owner, validator, driftStatus',
      anchors: '++id, merkleRoot, ts',
    });
  }
}

export const db = new dB();

const log = logger.child('local-db');

// ─── Chiffrement local avec clé dérivée du device ───

async function deriveDeviceKey(): Promise<CryptoKey> {
  const deviceFingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    new Date().getTimezoneOffset(),
  ].join('|');

  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(deviceFingerprint),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode('KOS_REGTEACH_SALT_2026'),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptLocal(data: Record<string, unknown>): Promise<ArrayBuffer> {
  const key = await deriveDeviceKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder();
  const encoded = enc.encode(JSON.stringify(data));

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  );

  const result = new Uint8Array(iv.length + ciphertext.byteLength);
  result.set(iv, 0);
  result.set(new Uint8Array(ciphertext), iv.length);
  return result.buffer;
}

export async function decryptLocal(buffer: ArrayBuffer): Promise<Record<string, unknown>> {
  const key = await deriveDeviceKey();
  const data = new Uint8Array(buffer);
  const iv = data.slice(0, 12);
  const ciphertext = data.slice(12);

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  );

  const dec = new TextDecoder();
  return JSON.parse(dec.decode(decrypted));
}

export async function sha256(data: string | ArrayBuffer): Promise<string> {
  const buffer = typeof data === 'string' ? new TextEncoder().encode(data).buffer : data;
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function exportDB(password: string): Promise<Blob> {
  const data: Record<string, unknown[]> = {};

  data.controls = await db.controls.toArray();
  data.incidents = await db.incidents.toArray();
  data.evidences = await db.evidences.toArray();
  data.reports = await db.reports.toArray();
  data.rules = await db.rules.toArray();

  const json = JSON.stringify(data);
  const encrypted = await encryptLocal({ payload: json, ts: Date.now() });

  log.info('Database exported', { controls: data.controls.length, totalSize: json.length });
  return new Blob([encrypted], { type: 'application/octet-stream' });
}

export async function importDB(file: File): Promise<{ success: boolean; counts: Record<string, number> }> {
  const buffer = await file.arrayBuffer();
  const decrypted = await decryptLocal(buffer);
  const data = JSON.parse(decrypted.payload as string) as Record<string, unknown[]>;

  await db.controls.bulkPut(data.controls as Control[]);
  await db.incidents.bulkPut(data.incidents as Incident[]);
  await db.evidences.bulkPut(data.evidences as Evidence[]);
  await db.reports.bulkPut(data.reports as ComplianceReport[]);
  await db.rules.bulkPut(data.rules as BCEAORule[]);

  const counts = {
    controls: data.controls.length,
    incidents: data.incidents.length,
    evidences: data.evidences.length,
    reports: data.reports.length,
    rules: data.rules.length,
  };

  log.info('Database imported', counts);
  return { success: true, counts };
}

export async function getDBStats() {
  return {
    controls: await db.controls.count(),
    incidents: await db.incidents.count(),
    evidences: await db.evidences.count(),
    reports: await db.reports.count(),
    rules: await db.rules.count(),
  };
}



