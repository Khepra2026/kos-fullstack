import sqlite3InitModule from '@sqlite.org/sqlite-wasm';
import { merkleLog } from '@/core/audit-trail/merkleLog';
import { verifyRegulatorSignature } from '@/core/crypto/multiPKI';
import { sha256 as nobleSha256 } from '@noble/hashes/sha256';
import { bytesToHex } from '@noble/hashes/utils';
import i18n from '@/i18n';

export const REGULATORS = {
  BCEAO: { region: 'UEMOA', lang: 'fr', currency: 'XOF', rules: 120, pk: '3f2a9d4e8b1c5a7f6e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f' },
  COBAC: { region: 'CEMAC', lang: 'fr', currency: 'XAF', rules: 80, pk: '7b1c5a7f3f2a9d4e6e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f' },
  ACPR: { region: 'EU', lang: 'fr', currency: 'EUR', rules: 200, pk: '9d4e3f2a1b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f' },
  FCA: { region: 'UK', lang: 'en', currency: 'GBP', rules: 150, pk: '1a5f9d4e3f2a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e' },
  MAS: { region: 'SG', lang: 'en', currency: 'SGD', rules: 90, pk: '6c8d1a5f9d4e3f2a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c' },
  FED: { region: 'US', lang: 'en', currency: 'USD', rules: 180, pk: '2b7e6c8d1a5f9d4e3f2a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b' },
  GAFI: { region: 'GLOBAL', lang: 'fr,en', currency: 'USD', rules: 40, pk: '4f9a2b7e6c8d1a5f9d4e3f2a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f' },
  OHADA: { region: 'AFRICA', lang: 'fr', currency: 'XOF,XAF', rules: 60, pk: '8e3b4f9a2b7e6c8d1a5f9d4e3f2a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6' }
} as const;

export type RegulatorCode = keyof typeof REGULATORS;

export interface RegulatorDef {
  region: string;
  lang: string;
  currency: string;
  rules: number;
  pk: string;
}

export interface ExigenceRecord {
  id: string;
  source: string;
  region: string;
  article: string;
  texte_fr: string;
  texte_en: string;
  texte_ar: string;
  texte_pt: string;
  texte_zh: string;
  keywords: string;
  tier: number;
  effective_date: string;
  sig: string;
}

let db: any = null;
let activeRegulator: RegulatorCode = 'BCEAO';
let activePKI: string = '';

export function getActivePKI(): string {
  return activePKI || REGULATORS[activeRegulator].pk;
}

export function setActivePKI(pk: string): void {
  activePKI = pk;
}

export async function initGlobalDB() {
  if (db) return db;
  const sqlite3 = await sqlite3InitModule({ print: () => {}, printErr: () => {} });
  db = new sqlite3.oo1.DB('/kos_global.db', 'c');

  db.exec(`
    CREATE TABLE IF NOT EXISTS exigences (
      id TEXT PRIMARY KEY,
      source TEXT,
      region TEXT,
      article TEXT,
      texte_fr TEXT,
      texte_en TEXT,
      texte_ar TEXT,
      texte_pt TEXT,
      texte_zh TEXT,
      keywords TEXT,
      tier INTEGER DEFAULT 1,
      effective_date TEXT,
      deprecated INTEGER DEFAULT 0
    );

    CREATE VIRTUAL TABLE IF NOT EXISTS exigences_fts USING fts5(
      id UNINDEXED,
      texte_fr,
      texte_en,
      keywords,
      tokenize='unicode61'
    );

    CREATE TABLE IF NOT EXISTS mapping (
      exigence_id TEXT,
      control_id TEXT,
      evidence_type TEXT,
      PRIMARY KEY (exigence_id, control_id)
    );

    CREATE TRIGGER IF NOT EXISTS exigences_ai AFTER INSERT ON exigences BEGIN
      INSERT INTO exigences_fts(id, texte_fr, texte_en, keywords)
      VALUES (new.id, new.texte_fr, new.texte_en, new.keywords);
    END;

    CREATE TRIGGER IF NOT EXISTS exigences_au AFTER UPDATE ON exigences BEGIN
      UPDATE exigences_fts SET
        texte_fr = new.texte_fr,
        texte_en = new.texte_en,
        keywords = new.keywords
      WHERE id = new.id;
    END;
  `);

  return db;
}

export function getActiveRegulatorCode(): RegulatorCode {
  return activeRegulator;
}

export async function switchJurisdiction(code: RegulatorCode): Promise<RegulatorDef> {
  const reg = REGULATORS[code];
  if (!reg) throw new Error(`Juridiction inconnue: ${code}`);

  const previousCode = activeRegulator;
  const dbi = await initGlobalDB();

  activeRegulator = code;

  try {
    dbi.exec(`DROP VIEW IF EXISTS active_rules`);
    dbi.exec(`CREATE VIEW active_rules AS SELECT * FROM exigences WHERE source = '${code}' AND deprecated = 0`);
  } catch {
    // Vue peut échouer si SQLite n'a pas encore les données — OK
  }

  setActivePKI(reg.pk);

  const primaryLang = reg.lang.split(',')[0];
  await i18n.changeLanguage(primaryLang);

  await merkleLog.append({
    action: 'JURISDICTION_SWITCH',
    resource: code,
    details: {
      from: previousCode,
      to: code,
      region: reg.region,
      currency: reg.currency,
      ts: Date.now(),
    },
  });

  return reg;
}

export async function importGlobalSeed(jsonUrl: string = '/seeds/global-2026.json'): Promise<{ imported: number; rejected: number }> {
  const dbi = await initGlobalDB();
  const res = await fetch(jsonUrl);
  if (!res.ok) throw new Error(`Échec chargement seed: ${res.status}`);
  const seed: ExigenceRecord[] = await res.json();

  let imported = 0;
  let rejected = 0;

  dbi.exec('BEGIN');
  for (const e of seed) {
    const valid = verifyRegulatorSignature(e.texte_fr, e.sig, e.source);
    if (!valid) {
      rejected++;
      continue;
    }

    const hash = bytesToHex(nobleSha256(new TextEncoder().encode(JSON.stringify(e)))).slice(0, 16);

    try {
      dbi.exec({
        sql: `INSERT OR REPLACE INTO exigences (id, source, region, article, texte_fr, texte_en, texte_ar, texte_pt, texte_zh, keywords, tier, effective_date, deprecated)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
        bind: [e.id, e.source, e.region, e.article, e.texte_fr, e.texte_en, e.texte_ar || '', e.texte_pt || '', e.texte_zh || '', e.keywords, e.tier || 1, e.effective_date],
      });
      imported++;
    } catch {
      rejected++;
    }
  }
  dbi.exec('COMMIT');

  await merkleLog.append({
    action: 'GLOBAL_SEED_IMPORTED',
    resource: 'global-2026.json',
    details: { imported, rejected, total: seed.length },
  });

  return { imported, rejected };
}

export async function searchGlobal(query: string, regulator?: RegulatorCode): Promise<ExigenceRecord[]> {
  const dbi = await initGlobalDB();
  const filter = regulator ? `AND e.source = '${regulator}'` : '';
  const rows: ExigenceRecord[] = [];

  try {
    dbi.exec({
      sql: `SELECT e.id, e.source, e.region, e.article, e.texte_fr, e.texte_en, e.texte_ar, e.texte_pt, e.texte_zh, e.keywords, e.tier, e.effective_date
            FROM exigences_fts f
            JOIN exigences e ON f.id = e.id
            WHERE e.deprecated = 0 AND f MATCH ? ${filter}
            ORDER BY rank LIMIT 50`,
      bind: [query],
      callback: (row: any) => rows.push(row),
    });
  } catch {
    // FTS peut échouer si pas encore seedé — fallback LIKE
    dbi.exec({
      sql: `SELECT * FROM exigences WHERE deprecated = 0 AND (texte_fr LIKE ? OR texte_en LIKE ? OR keywords LIKE ?) ${filter} LIMIT 50`,
      bind: [`%${query}%`, `%${query}%`, `%${query}%`],
      callback: (row: any) => rows.push(row),
    });
  }

  return rows;
}

export async function getExigenceById(id: string): Promise<ExigenceRecord | null> {
  const dbi = await initGlobalDB();
  const rows: ExigenceRecord[] = [];
  dbi.exec({
    sql: 'SELECT * FROM exigences WHERE id = ?',
    bind: [id],
    callback: (row: any) => rows.push(row),
  });
  return rows[0] || null;
}

export async function getExigencesBySource(source: RegulatorCode): Promise<ExigenceRecord[]> {
  const dbi = await initGlobalDB();
  const rows: ExigenceRecord[] = [];
  dbi.exec({
    sql: 'SELECT * FROM exigences WHERE source = ? AND deprecated = 0 ORDER BY tier ASC, effective_date DESC',
    bind: [source],
    callback: (row: any) => rows.push(row),
  });
  return rows;
}

export async function getStats(): Promise<{
  total: number;
  byRegulator: Record<string, number>;
  byTier: Record<number, number>;
}> {
  const dbi = await initGlobalDB();
  const stats = { total: 0, byRegulator: {} as Record<string, number>, byTier: {} as Record<number, number> };

  const countRows: any[] = [];
  dbi.exec({
    sql: 'SELECT source, COUNT(*) as cnt FROM exigences WHERE deprecated = 0 GROUP BY source',
    callback: (row: any) => countRows.push(row),
  });

  for (const r of countRows) {
    stats.byRegulator[r.source] = r.cnt;
    stats.total += r.cnt;
  }

  const tierRows: any[] = [];
  dbi.exec({
    sql: 'SELECT tier, COUNT(*) as cnt FROM exigences WHERE deprecated = 0 GROUP BY tier',
    callback: (row: any) => countRows.push(row),
  });

  for (const r of countRows.slice(countRows.length)) {
    stats.byTier[r.tier] = r.cnt;
  }

  return stats;
}

export async function mapExigenceToControl(exigenceId: string, controlId: string, evidenceType: string): Promise<void> {
  const dbi = await initGlobalDB();
  dbi.exec({
    sql: 'INSERT OR REPLACE INTO mapping (exigence_id, control_id, evidence_type) VALUES (?, ?, ?)',
    bind: [exigenceId, controlId, evidenceType],
  });
}

export async function getMappingsForExigence(exigenceId: string): Promise<{ control_id: string; evidence_type: string }[]> {
  const dbi = await initGlobalDB();
  const rows: any[] = [];
  dbi.exec({
    sql: 'SELECT control_id, evidence_type FROM mapping WHERE exigence_id = ?',
    bind: [exigenceId],
    callback: (row: any) => rows.push(row),
  });
  return rows;
}

export function getRegulatorDef(code: RegulatorCode): RegulatorDef {
  return REGULATORS[code];
}

export function getAllRegulatorCodes(): RegulatorCode[] {
  return Object.keys(REGULATORS) as RegulatorCode[];
}

export function getRegulatorsByRegion(region: string): RegulatorCode[] {
  return (Object.keys(REGULATORS) as RegulatorCode[]).filter(k => REGULATORS[k].region === region);
}

export async function closeGlobalDB(): Promise<void> {
  if (db) {
    db.close();
    db = null;
  }
}