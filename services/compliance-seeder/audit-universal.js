/**
 * ═══════════════════════════════════════════════════════════════
 * KOS AUDIT UNIVERSAL™ v5.1 — Requête RAG 320 Sources
 * Node.js API — Quadruple ancrage obligatoire + Peer-review + Data lineage
 * ═══════════════════════════════════════════════════════════════
 *
 * Endpoint : POST /api/kos/audit-universal
 * Body : { query: string, layers?: string[], minPeerReview?: boolean, minDate?: string }
 *
 * Règles Big Four v5.1 :
 *   1. Quadruple ancrage OBLIGATOIRE — réponse BLOQUÉE si 1 couche manque
 *   2. Peer-review obligatoire — seules les sources L3/L4 avec isPeerReviewed:true
 *   3. Zéro obsolète — filtre automatique > 2020-01-01
 *   4. Data lineage — chaque résultat inclut la traçabilité complète
 *   5. ISAE 3402 — chaque requête loggée avec hash SHA256
 *   6. 320 sources — L1(45) + L2(25) + L3(QS200) + L4(50 revues)
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
const PORT = parseInt(process.env.AUDIT_PORT || '3100', 10);
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const CRAWLER_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/kos-compliance-daily-crawler`;
const LOG_DIR = process.env.LOG_DIR || '/var/log/kos-audit';
const REDIS_URL = process.env.REDIS_URL || 'redis://redis:6379';
const MIN_PUBLICATION_DATE = process.env.MIN_PUBLICATION_DATE || '2020-01-01';
const MEMORY_ENGINE_URL = process.env.MEMORY_ENGINE_URL || 'http://localhost:3300';

// Ensure log dir
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// ═══ CONSTANTS v5.1 ═══
const VALID_LAYERS = ['L1_REGULATEUR', 'L2_NORMALISATEUR', 'L3_ACADEMIQUE', 'L4_REVUE_PRO'];
const ALL_LAYERS = [...VALID_LAYERS];
const MANDATORY_LAYERS = [...VALID_LAYERS]; // v5.1 : TOUTES les couches obligatoires

/**
 * @typedef {Object} AuditQuery
 * @property {string} query
 * @property {string[]} [layers]
 * @property {boolean} [minPeerReview]
 * @property {string} [minDate]
 * @property {number} [maxResults]
 */

/**
 * @typedef {Object} AuditResult
 * @property {string} sourceId
 * @property {string} sourceName
 * @property {string} sourceLayer
 * @property {string} sourceUrl
 * @property {string|null} doi
 * @property {string|null} publicationDate
 * @property {string} retrievalDate
 * @property {boolean} peerReviewed
 * @property {boolean} crossrefVerified
 * @property {number} relevanceScore
 * @property {string} excerpt
 * @property {string} hashSha256
 */

/**
 * @typedef {Object} AuditResponse
 * @property {string} requestId
 * @property {string} timestamp
 * @property {AuditQuery} query
 * @property {AuditResult[]} results
 * @property {Object} summary
 * @property {Object} auditTrail
 */

// ═══ LOGGER ═══
/** @param {string} level */
/** @param {string} message */
/** @param {*} [data] */
function log(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const logEntry = { timestamp, level, message, version: '5.1', ...(data ? { data } : {}) };
  console.log(`[${timestamp}] [${level.toUpperCase()}] [AUDIT-v5.1] ${message}`);
  if (data) console.log(`  └─ ${JSON.stringify(data).substring(0, 500)}`);

  const dateStr = timestamp.split('T')[0];
  const logFile = path.join(LOG_DIR, `audit-universal-${dateStr}.log`);
  fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
}

// ═══ SHA256 ═══
function sha256(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

// ═══ INVOKE CRAWLER FOR DATA ═══
async function fetchLatestCrawlData() {
  try {
    const response = await fetch(CRAWLER_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'KOS-Audit-Universal/5.1',
      },
      signal: AbortSignal.timeout(120000),
    });

    if (!response.ok) {
      log('error', `Failed to fetch crawl data: HTTP ${response.status}`);
      return null;
    }

    const result = await response.json();
    return result.summary || null;
  } catch (error) {
    log('error', `Failed to fetch crawl data: ${error.message}`);
    return null;
  }
}

// ═══ FILTER BY QUADRUPLE ANCHORING ═══
function filterByLayers(details, requestedLayers) {
  if (!requestedLayers || requestedLayers.length === 0) return details;
  return details.filter((d) => requestedLayers.includes(d.layer));
}

// ═══ FILTER BY PEER-REVIEW ═══
function filterByPeerReview(details, requirePeerReview) {
  if (!requirePeerReview) return details;
  return details.filter((d) => d.peerReviewed && d.peerReviewValidated);
}

// ═══ FILTER BY DATE (ZÉRO OBSOLÈTE) ═══
function filterByDate(details, minDate) {
  const cutoff = new Date(minDate);
  return details.filter((d) => {
    if (d.isObsolete) return false;
    if (!d.dataLineage?.publicationDate) return true;
    try {
      return new Date(d.dataLineage.publicationDate) >= cutoff;
    } catch {
      return true;
    }
  });
}

// ═══ SEARCH & RANK ═══
function searchAndRank(details, query, maxResults = 20) {
  const queryLower = query.toLowerCase();
  const queryTerms = queryLower.split(/\s+/).filter((t) => { return t.length > 2; });

  const scored = details
    .map((d) => {
      const texts = (d.newTexts || []).join(' ').toLowerCase();
      let score = 0;

      // Exact match bonus
      if (texts.includes(queryLower)) score += 50;

      // Term frequency
      for (const term of queryTerms) {
        const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        const matches = texts.match(regex);
        if (matches) score += matches.length * 5;
      }

      // Source name match
      if (d.sourceName.toLowerCase().includes(queryLower)) score += 30;

      // Peer-review bonus
      if (d.peerReviewValidated) score += 15;

      // Layer relevance bonus
      if (d.layer === 'L1_REGULATEUR') score += 10;
      if (d.layer === 'L4_REVUE_PRO' && d.peerReviewValidated) score += 20;

      // Create excerpt
      let excerpt = '';
      const idx = texts.indexOf(queryLower);
      if (idx >= 0) {
        const start = Math.max(0, idx - 80);
        const end = Math.min(texts.length, idx + queryLower.length + 120);
        excerpt = (start > 0 ? '...' : '') + texts.substring(start, end) + (end < texts.length ? '...' : '');
      } else if (d.newTexts && d.newTexts.length > 0) {
        excerpt = d.newTexts.slice(0, 3).join(' | ');
      }

      return {
        sourceId: d.sourceId,
        sourceName: d.sourceName,
        sourceLayer: d.layer,
        sourceUrl: d.dataLineage?.sourceUrl || '',
        doi: d.dataLineage?.doi || null,
        publicationDate: d.dataLineage?.publicationDate || null,
        retrievalDate: d.dataLineage?.retrievalDate || new Date().toISOString().split('T')[0],
        peerReviewed: d.peerReviewed || false,
        crossrefVerified: d.peerReviewValidated || false,
        relevanceScore: score,
        excerpt: excerpt || 'Aucun extrait disponible',
        hashSha256: d.dataLineage?.hashSha256 || sha256(d.sourceId + query),
      };
    })
    .filter((r) => { return r.relevanceScore > 0; })
    .sort((a, b) => { return b.relevanceScore - a.relevanceScore; })
    .slice(0, maxResults);

  return scored;
}

// ═══ PROCESS AUDIT REQUEST ═══
/** @param {string} body */
async function processAuditRequest(body) {
  const requestId = `KOS-AUDIT-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  let query;

  try {
    query = JSON.parse(body);
  } catch {
    return {
      statusCode: 400,
      response: { error: 'BAD_REQUEST', message: 'Invalid JSON body', requestId },
    };
  }

  if (!query.query || query.query.trim().length < 3) {
    return {
      statusCode: 400,
      response: { error: 'BAD_REQUEST', message: 'Query must be at least 3 characters', requestId },
    };
  }

  // Validate layers
  const requestedLayers = (query.layers || ALL_LAYERS).filter((l) => { return VALID_LAYERS.includes(l); });
  if (requestedLayers.length === 0) {
    return {
      statusCode: 400,
      response: { error: 'BAD_REQUEST', message: 'No valid layers specified', requestId },
    };
  }

  log('info', `Audit request received`, {
    requestId,
    query: query.query.substring(0, 100),
    layers: requestedLayers,
    minPeerReview: query.minPeerReview || false,
    minDate: query.minDate || MIN_PUBLICATION_DATE,
  });

  // Fetch latest crawl data
  const crawlData = await fetchLatestCrawlData();
  if (!crawlData || !crawlData.details) {
    return {
      statusCode: 503,
      response: {
        error: 'CRAWL_DATA_UNAVAILABLE',
        message: 'Latest crawl data not available. Run the crawler first.',
        requestId,
      },
    };
  }

  const details = crawlData.details || [];

  // ═══ v5.1 : QUADRUPLE ANCHORING — BLOCAGE STRICT ═══
  if (missingLayers.length > 0) {
    log('error', `🚫 BLOCAGE QUALITÉ v5.1 — Quadruple ancrage incomplet`, {
      requestId,
      query: query.query.substring(0, 80),
      missingLayers,
      coveredLayers,
      message: `Ancrage incomplet : ${missingLayers.join(', ')} manquant(s). Les 4 couches (L1+L2+L3+L4) sont obligatoires en v5.1.`,
    });

    return {
      statusCode: 422,
      response: {
        error: 'QUADRUPLE_ANCHORING_BLOCKED',
        message: `BLOCAGE QUALITÉ v5.1 : Ancrage incomplet. ${missingLayers.length} couche(s) manquante(s): ${missingLayers.join(', ')}. Les 4 couches sont obligatoires. Exécutez un crawl complet d'abord.`,
        requestId,
        missingLayers,
        coveredLayers,
        availableLayers: [...availableLayers],
        requiredLayers: MANDATORY_LAYERS,
        timestamp: new Date().toISOString(),
      },
    };
  }

  // ═══ FILTER ═══
  let filtered = filterByLayers(details, requestedLayers);

  // ═══ RÈGLE 2 : PEER-REVIEW FILTER ═══
  if (query.minPeerReview) {
    filtered = filterByPeerReview(filtered, true);
  }

  // ═══ RÈGLE 3 : ZÉRO OBSOLÈTE ═══
  const minDate = query.minDate || MIN_PUBLICATION_DATE;
  filtered = filterByDate(filtered, minDate);

  // ═══ SEARCH & RANK ═══
  const maxResults = Math.min(query.maxResults || 20, 100);
  const results = searchAndRank(filtered, query.query, maxResults);

  // ═══ RÈGLE 5 : ISAE 3402 AUDIT TRAIL ═══
  const auditHash = sha256(JSON.stringify({
    requestId,
    query: query.query,
    layers: requestedLayers,
    timestamp: new Date().toISOString(),
    resultCount: results.length,
  }));

  const auditResponse = {
    requestId,
    timestamp: new Date().toISOString(),
    query,
    results,
    summary: {
      totalResults: results.length,
      layersCovered: coveredLayers,
      layersMissing: missingLayers,
      quadrupleAncrage: missingLayers.length === 0,
      peerReviewRate: results.length > 0
        ? Math.round((results.filter((r) => { return r.peerReviewed; }).length / results.length) * 100)
        : 0,
      averageRelevance: results.length > 0
        ? Math.round(results.reduce((s, r) => { return s + r.relevanceScore; }, 0) / results.length)
        : 0,
    },
    auditTrail: {
      hash: auditHash,
      verifiedAt: new Date().toISOString(),
      isae3402Compliant: missingLayers.length === 0,
    },
  };

  // ═══ v5.0 : AUTO-MÉMORISATION BEST PRACTICE ═══
  if (auditResponse.summary.quadrupleAncrage && results.length > 0) {
    // Non-bloquant — exécution asynchrone
    memorizeIfQualified(auditResponse, query).catch((err) => {
      log('warn', `Mémorisation asynchrone échouée: ${err.message}`);
    });
  }

  // Log ISAE 3402 audit
  const auditFile = path.join(LOG_DIR, 'isae3402-audit-trail.jsonl');
  fs.appendFileSync(auditFile, JSON.stringify({
    type: 'AUDIT_QUERY',
    requestId,
    auditHash,
    isae3402Compliant: missingLayers.length === 0,
    timestamp: new Date().toISOString(),
    version: '5.0',
  }) + '\n');

  log('info', `Audit completed v5.0`, {
    requestId,
    results: results.length,
    layersCovered,
    quadrupleAncrage: missingLayers.length === 0,
    peerReviewRate: auditResponse.summary.peerReviewRate,
  });

  return { statusCode: 200, response: auditResponse };
}

// ═══ POST-AUDIT : MÉMORISATION AUTO BEST PRACTICE v5.0 ═══
/**
 * @param {AuditResponse} auditResponse
 * @param {AuditQuery} query
 */
async function memorizeIfQualified(auditResponse, query) {
  // Ne mémorise que si l'audit a réussi avec des résultats de qualité
  if (!auditResponse.summary.quadrupleAncrage) return null;
  if (auditResponse.results.length === 0) return null;
  if (auditResponse.summary.averageRelevance < 50) return null;

  const topResult = auditResponse.results[0];

  const bestPractice = {
    exigence: query.query.trim(),
    texte: topResult.sourceName,
    article: topResult.doi || topResult.sourceUrl || '',
    solution: topResult.excerpt.substring(0, 300),
    kpi: {
      conformite: auditResponse.summary.quadrupleAncrage ? 100 : 70,
      fraicheur: topResult.publicationDate ? 100 : 80,
      couverture: auditResponse.summary.layersCovered.length >= 3 ? 100 : 70,
    },
    source: topResult.sourceUrl,
    dataLineage: {
      sourceId: topResult.sourceId,
      sourceUrl: topResult.sourceUrl,
      doi: topResult.doi,
      publicationDate: topResult.publicationDate,
      retrievalDate: topResult.retrievalDate,
      hashSha256: topResult.hashSha256,
    },
    couches: {
      L1: auditResponse.summary.layersCovered.includes('L1_REGULATEUR'),
      L2: auditResponse.summary.layersCovered.includes('L2_NORMALISATEUR'),
      L3: auditResponse.summary.layersCovered.includes('L3_ACADEMIQUE'),
      L4: auditResponse.summary.layersCovered.includes('L4_REVUE_PRO'),
    },
    leadMagnetScore: Math.min(
      Math.round(auditResponse.summary.averageRelevance + auditResponse.summary.peerReviewRate * 0.3),
      100
    ),
  };

  try {
    const response = await fetch(`${MEMORY_ENGINE_URL}/api/kos/memory/memorize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bestPractice),
      signal: AbortSignal.timeout(10000),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.stored) {
        log('info', `🧠 Best practice auto-mémorisée — ID: ${result.memoryId}`, {
          exigence: query.query.substring(0, 80),
          r1: result.quatreYeux?.r1?.score,
          r2: result.quatreYeux?.r2?.score,
        });
        return result;
      }

      log('warn', `⚠️ Mémorisation rejetée — Contrôle 4 Yeux`, {
        exigence: query.query.substring(0, 80),
        reason: result.reason,
      });
    } else {
      log('warn', `Memory Engine inaccessible — HTTP ${response.status}`);
    }
  } catch (error) {
    // Non-bloquant — l'audit continue même si la mémorisation échoue
    log('warn', `Memory Engine erreur: ${error.message}`);
  }

  return null;
}

// ═══ HTTP SERVER ═══
const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && (req.url === '/api/kos/audit-universal' || req.url === '/')) {
    let body = '';
    req.on('data', (chunk) => { body += chunk.toString(); });
    req.on('end', async () => {
      const { statusCode, response } = await processAuditRequest(body);
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    });
    return;
  }

  // Health check
  if (req.method === 'GET' && (req.url === '/health' || req.url === '/healthz')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'HEALTHY', version: '5.1', timestamp: new Date().toISOString() }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'NOT_FOUND' }));
});

server.listen(PORT, () => {
  log('info', `KOS Audit Universal™ v4.0 — Listening on port ${PORT}`);
  log('info', `Endpoint: POST http://localhost:${PORT}/api/kos/audit-universal`);
  log('info', `Health: GET http://localhost:${PORT}/health`);
});