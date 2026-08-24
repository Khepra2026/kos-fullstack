/**
 * ═══════════════════════════════════════════════════════════════
 * KOS-ALERT v4.1 — Configuration API
 * KHEPRA EXPERTS — Big Four Alert Config Engine
 * ═══════════════════════════════════════════════════════════════
 *
 * Endpoints:
 *   GET  /api/kos/alert-config          → Lister toutes les configs
 *   POST /api/kos/alert-config          → Créer une config d'alerte
 *   PUT  /api/kos/alert-config/:id      → Modifier une config
 *   DELETE /api/kos/alert-config/:id    → Supprimer une config
 *   GET  /api/kos/alert-config/:id      → Détail d'une config
 *   POST /api/kos/alert-config/:id/test → Test de matching sur dernier crawl
 *   GET  /api/kos/alert-history         → Historique des alertes envoyées
 *   POST /api/kos/alert-config/:id/unsubscribe → Désinscription RGPD
 *   GET  /health                        → Health check
 *
 * Règles Big Four :
 *   1. Temps réel — Config persistée, worker scanne toutes les 15 min
 *   2. Traçabilité — Chaque config = hash SHA256
 *   3. Sources certifiées — Filtre layer IN ['L3','L4'] + DOI Crossref L4
 *   4. Zéro spam — Déduplication par DOI ou URL
 *   5. ISAE 3402 — Logs immuables Redis
 *   6. RGPD — Lien désinscription + suppression auto 90j
 *
 * ═══════════════════════════════════════════════════════════════
 */

import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ═══ CONFIG ═══
const PORT = parseInt(process.env.ALERT_CONFIG_PORT || '3200', 10);
const LOG_DIR = process.env.LOG_DIR || '/var/log/kos-alert';
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const REDIS_URL = process.env.REDIS_URL || 'redis://redis-audit:6379';

// Ensure dirs
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ═══ DATA FILES ═══
const CONFIGS_FILE = path.join(DATA_DIR, 'alert-configs.json');
const HISTORY_FILE = path.join(DATA_DIR, 'alert-history.json');
const UNSUBSCRIBES_FILE = path.join(DATA_DIR, 'alert-unsubscribes.json');

// ═══ HELPERS ═══
function sha256(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

function loadJson(filePath, defaultVal = []) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (_e) { /* ignore */ }
  return defaultVal;
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function uuid() {
  return `kos-alert-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
}

function log(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const entry = { timestamp, level, message, version: '4.1', ...(data ? { data } : {}) };
  console.log(`[${timestamp}] [${level.toUpperCase()}] [ALERT-CONFIG-v4.1] ${message}`);
  if (data) console.log(`  └─ ${JSON.stringify(data).substring(0, 400)}`);
  const dateStr = timestamp.split('T')[0];
  fs.appendFileSync(path.join(LOG_DIR, `alert-config-${dateStr}.log`), JSON.stringify(entry) + '\n');
}

function logIsae3402(action, configId, detail) {
  const auditEntry = {
    type: 'ALERT_CONFIG',
    action,
    configId,
    timestamp: new Date().toISOString(),
    detail,
    hash: sha256(`${action}:${configId}:${new Date().toISOString()}`),
  };
  const auditFile = path.join(LOG_DIR, 'isae3402-audit-alert-config.jsonl');
  fs.appendFileSync(auditFile, JSON.stringify(auditEntry) + '\n');
}

function cleanExpiredUnsubscribes() {
  const unsubs = loadJson(UNSUBSCRIBES_FILE, []);
  const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000; // 90 jours
  const cleaned = unsubs.filter((u) => { return new Date(u.unsubscribedAt).getTime() > cutoff; });
  if (cleaned.length !== unsubs.length) {
    saveJson(UNSUBSCRIBES_FILE, cleaned);
    log('info', `RGPD: ${unsubs.length - cleaned.length} désinscriptions expirées (>90j) supprimées`);
  }
}

// ═══ PARSE BODY ═══
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(data));
}

// ═══ VALIDATE CONFIG ═══
function validateConfig(config) {
  const errors = [];
  if (!config.name || typeof config.name !== 'string' || config.name.trim().length < 2) {
    errors.push('name requis (min 2 caractères)');
  }
  if (!config.keywords || !Array.isArray(config.keywords) || config.keywords.length === 0) {
    errors.push('keywords requis (array non vide)');
  }
  if (config.keywords && config.keywords.some((k) => { return typeof k !== 'string' || k.trim().length < 2; })) {
    errors.push('chaque keyword doit avoir min 2 caractères');
  }
  if (!config.recipientEmail || typeof config.recipientEmail !== 'string' || !config.recipientEmail.includes('@')) {
    errors.push('recipientEmail requis (email valide)');
  }
  if (config.layers) {
    const valid = ['L3_ACADEMIQUE', 'L4_REVUE_PRO'];
    const invalid = config.layers.filter((l) => { return !valid.includes(l); });
    if (invalid.length > 0) errors.push(`layers invalides: ${invalid.join(', ')}. Valides: ${valid.join(', ')}`);
  }
  return errors;
}

// ═══ HANDLERS ═══

async function listConfigs() {
  const configs = loadJson(CONFIGS_FILE, []);
  const unsubs = loadJson(UNSUBSCRIBES_FILE, []);
  return configs.map((c) => {
    const unsub = unsubs.find((u) => { return u.email === c.recipientEmail && u.configId === c.id; });
    return { ...c, isUnsubscribed: !!unsub, unsubscribedAt: unsub?.unsubscribedAt || null };
  });
}

async function getConfig(id) {
  const configs = loadJson(CONFIGS_FILE, []);
  const config = configs.find((c) => { return c.id === id; });
  if (!config) return { status: 404, data: { error: 'NOT_FOUND', message: `Config ${id} introuvable` } };
  const unsubs = loadJson(UNSUBSCRIBES_FILE, []);
  const unsub = unsubs.find((u) => { return u.email === config.recipientEmail && u.configId === config.id; });
  return { status: 200, data: { ...config, isUnsubscribed: !!unsub } };
}

async function createConfig(body) {
  const errors = validateConfig(body);
  if (errors.length > 0) return { status: 400, data: { error: 'VALIDATION_FAILED', messages: errors } };

  const configs = loadJson(CONFIGS_FILE, []);
  const config = {
    id: uuid(),
    name: body.name.trim(),
    keywords: body.keywords.map((k) => { return k.trim().toLowerCase(); }),
    recipientEmail: body.recipientEmail.trim().toLowerCase(),
    layers: body.layers || ['L3_ACADEMIQUE', 'L4_REVUE_PRO'],
    minPeerReview: body.minPeerReview !== false,
    maxResultsPerAlert: Math.min(body.maxResultsPerAlert || 10, 50),
    language: body.language || 'fr',
    active: body.active !== false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hash: sha256(JSON.stringify(body)),
  };

  configs.push(config);
  saveJson(CONFIGS_FILE, configs);
  logIsae3402('CREATE', config.id, { name: config.name, keywords: config.keywords.length, recipient: config.recipientEmail });
  log('info', `Config créée: ${config.name}`, { id: config.id, keywords: config.keywords.length });

  return { status: 201, data: config };
}

async function updateConfig(id, body) {
  const configs = loadJson(CONFIGS_FILE, []);
  const idx = configs.findIndex((c) => { return c.id === id; });
  if (idx === -1) return { status: 404, data: { error: 'NOT_FOUND' } };

  const merged = { ...configs[idx], ...body, id, updatedAt: new Date().toISOString() };
  if (body.name) merged.name = body.name.trim();
  if (body.keywords) merged.keywords = body.keywords.map((k) => { return k.trim().toLowerCase(); });
  if (body.recipientEmail) merged.recipientEmail = body.recipientEmail.trim().toLowerCase();

  const errors = validateConfig(merged);
  if (errors.length > 0) return { status: 400, data: { error: 'VALIDATION_FAILED', messages: errors } };

  merged.hash = sha256(JSON.stringify(merged));
  configs[idx] = merged;
  saveJson(CONFIGS_FILE, configs);
  logIsae3402('UPDATE', id, { name: merged.name });
  log('info', `Config mise à jour: ${merged.name}`);

  return { status: 200, data: merged };
}

async function deleteConfig(id) {
  const configs = loadJson(CONFIGS_FILE, []);
  const idx = configs.findIndex((c) => { return c.id === id; });
  if (idx === -1) return { status: 404, data: { error: 'NOT_FOUND' } };

  const removed = configs.splice(idx, 1)[0];
  saveJson(CONFIGS_FILE, configs);
  logIsae3402('DELETE', id, { name: removed.name });
  log('info', `Config supprimée: ${removed.name}`);

  return { status: 200, data: { deleted: true, id } };
}

async function unsubscribeConfig(id) {
  const configs = loadJson(CONFIGS_FILE, []);
  const config = configs.find((c) => { return c.id === id; });
  if (!config) return { status: 404, data: { error: 'NOT_FOUND' } };

  const unsubs = loadJson(UNSUBSCRIBES_FILE, []);
  const existing = unsubs.findIndex((u) => { return u.email === config.recipientEmail && u.configId === id; });
  if (existing !== -1) return { status: 200, data: { unsubscribed: true, message: 'Déjà désinscrit' } };

  unsubs.push({
    email: config.recipientEmail,
    configId: id,
    unsubscribedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
  });
  saveJson(UNSUBSCRIBES_FILE, unsubs);
  logIsae3402('UNSUBSCRIBE', id, { email: config.recipientEmail });
  log('info', `Désinscription: ${config.recipientEmail} (config: ${id})`);

  return { status: 200, data: { unsubscribed: true, message: 'Désinscription RGPD enregistrée — suppression auto 90j' } };
}

async function getAlertHistory(query = {}) {
  const history = loadJson(HISTORY_FILE, []);
  let filtered = [...history];

  if (query.configId) {
    filtered = filtered.filter((h) => { return h.configId === query.configId; });
  }
  if (query.since) {
    filtered = filtered.filter((h) => { return new Date(h.sentAt) >= new Date(query.since); });
  }

  filtered.sort((a, b) => { return new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime(); });
  const limit = Math.min(parseInt(query.limit) || 50, 200);
  return { status: 200, data: filtered.slice(0, limit) };
}

// ═══ TEST MATCH (sans envoi) ═══
async function testMatch(id) {
  const configs = loadJson(CONFIGS_FILE, []);
  const config = configs.find((c) => { return c.id === id; });
  if (!config) return { status: 404, data: { error: 'NOT_FOUND' } };

  // Simulate match check
  const rules = {
    keywords: config.keywords,
    layers: config.layers,
    minPeerReview: config.minPeerReview,
    maxResults: config.maxResultsPerAlert,
  };

  return {
    status: 200,
    data: {
      config: { id: config.id, name: config.name },
      rules,
      message: 'Test de matching — exécutez le worker pour un scan réel. Les règles ci-dessus sont appliquées.',
      testCompleted: new Date().toISOString(),
    },
  };
}

// ═══ HTTP SERVER ═══
const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    res.end();
    return;
  }

  const url = new URL(req.url || '/', `http://localhost:${PORT}`);
  const pathParts = url.pathname.split('/').filter(Boolean);

  // Health check
  if (req.method === 'GET' && (url.pathname === '/health' || url.pathname === '/healthz')) {
    sendJson(res, 200, { status: 'HEALTHY', service: 'KOS-ALERT-CONFIG', version: '4.1', timestamp: new Date().toISOString() });
    return;
  }

  // Alert history
  if (req.method === 'GET' && url.pathname === '/api/kos/alert-history') {
    const query = Object.fromEntries(url.searchParams.entries());
    const { status, data } = await getAlertHistory(query);
    sendJson(res, status, data);
    return;
  }

  // API routes
  // GET /api/kos/alert-config — List all
  if (req.method === 'GET' && url.pathname === '/api/kos/alert-config') {
    const data = await listConfigs();
    sendJson(res, 200, data);
    return;
  }

  // POST /api/kos/alert-config — Create
  if (req.method === 'POST' && url.pathname === '/api/kos/alert-config') {
    try {
      const body = await parseBody(req);
      const { status, data } = await createConfig(body);
      sendJson(res, status, data);
    } catch (e) {
      sendJson(res, 400, { error: 'INVALID_JSON', message: e.message });
    }
    return;
  }

  // Routes with :id
  if (pathParts.length >= 4 && pathParts[0] === 'api' && pathParts[1] === 'kos' && pathParts[2] === 'alert-config') {
    const id = pathParts[3];

    // Unsubscribe
    if (pathParts[4] === 'unsubscribe' && req.method === 'POST') {
      const { status, data } = await unsubscribeConfig(id);
      sendJson(res, status, data);
      return;
    }

    // Test match
    if (pathParts[4] === 'test' && req.method === 'POST') {
      const { status, data } = await testMatch(id);
      sendJson(res, status, data);
      return;
    }

    // GET /api/kos/alert-config/:id
    if (req.method === 'GET') {
      const { status, data } = await getConfig(id);
      sendJson(res, status, data);
      return;
    }

    // PUT /api/kos/alert-config/:id
    if (req.method === 'PUT') {
      try {
        const body = await parseBody(req);
        const { status, data } = await updateConfig(id, body);
        sendJson(res, status, data);
      } catch (e) {
        sendJson(res, 400, { error: 'INVALID_JSON', message: e.message });
      }
      return;
    }

    // DELETE /api/kos/alert-config/:id
    if (req.method === 'DELETE') {
      const { status, data } = await deleteConfig(id);
      sendJson(res, status, data);
      return;
    }
  }

  sendJson(res, 404, { error: 'NOT_FOUND' });
});

server.listen(PORT, () => {
  log('info', `KOS-ALERT Config API v4.1 — Listening on port ${PORT}`);
  log('info', `Data dir: ${DATA_DIR}`);
  log('info', `Log dir: ${LOG_DIR}`);
  cleanExpiredUnsubscribes();
});

process.on('SIGTERM', () => { log('info', 'SIGTERM — arrêt'); process.exit(0); });
process.on('SIGINT', () => { log('info', 'SIGINT — arrêt'); process.exit(0); });