// ═══════════════════════════════════════════════════════════════
// KOS MEMORY ENGINE — Mémoire stratégique KHEPRA
// Port 3003
// Stockage et récupération des décisions, apprentissages,
// artefacts de connaissance et contexte stratégique.
// Backed by: PostgreSQL (structured) + Qdrant (semantic) + Redis (cache)
// ═══════════════════════════════════════════════════════════════

const express = require('express');
const { Pool } = require('pg');
const { createClient } = require('redis');

const app = express();
app.use(express.json({ limit: '10mb' }));

// ── PostgreSQL ──────────────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || 'postgresql://kos:changeme@postgres:5432/kos_analytics',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// ── Redis ──────────────────────────────────────────────────
const redis = createClient({ url: process.env.REDIS_URL || 'redis://redis:6379' });
redis.on('error', (err) => console.error('Memory Engine Redis error:', err.message));
redis.connect().catch(() => console.warn('Redis not available, cache disabled'));

// ── Qdrant (via fetch) ─────────────────────────────────────
const QDRANT_URL = process.env.QDRANT_URL || 'http://qdrant:6333';
const QDRANT_COLLECTION = 'strategic_memory';

// ── Health ─────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'kos-memory-engine', version: '1.0.0', uptime: process.uptime() });
});

// ── Initialize Qdrant collection ───────────────────────────
async function initQdrantCollection() {
  try {
    const check = await fetch(`${QDRANT_URL}/collections/${QDRANT_COLLECTION}`);
    if (check.status === 404) {
      await fetch(`${QDRANT_URL}/collections/${QDRANT_COLLECTION}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vectors: { size: 384, distance: 'Cosine' },
        }),
      });
      console.log(`[MEMORY] Created Qdrant collection: ${QDRANT_COLLECTION}`);
    }
  } catch (err) {
    console.warn('[MEMORY] Qdrant not available:', err.message);
  }
}

// ── Store Memory ───────────────────────────────────────────
app.post('/store', async (req, res) => {
  try {
    const {
      memory_type,
      title,
      content,
      tags,
      source,
      confidence,
      context_ref,
      agent_id,
    } = req.body;

    if (!memory_type || !title || !content) {
      return res.status(400).json({ error: 'memory_type, title, and content are required' });
    }

    const validTypes = ['decision', 'learning', 'insight', 'artifact', 'rule', 'context', 'audit'];
    if (!validTypes.includes(memory_type)) {
      return res.status(400).json({ error: `invalid memory_type. Must be one of: ${validTypes.join(', ')}` });
    }

    // Store in PostgreSQL
    const { rows } = await pool.query(
      `INSERT INTO strategic_memory
       (memory_type, title, content, tags, source, confidence, context_ref, agent_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, memory_type, title, created_at`,
      [
        memory_type,
        title,
        content,
        JSON.stringify(tags || []),
        source || 'manual',
        confidence || 1.0,
        context_ref || null,
        agent_id || 'kos-memory-engine',
      ]
    );

    const memory = rows[0];

    // Index in Qdrant for semantic search (async, don't block)
    try {
      const qdrantPayload = {
        id: memory.id,
        memory_type,
        title,
        tags: tags || [],
        source,
        created_at: memory.created_at,
      };
      await fetch(`${QDRANT_URL}/collections/${QDRANT_COLLECTION}/points`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          points: [{
            id: memory.id,
            vector: new Array(384).fill(0).map(() => Math.random() * 2 - 1), // Placeholder - real embeddings come from RAG pipeline
            payload: qdrantPayload,
          }],
        }),
      });
    } catch (e) {
      console.warn('[MEMORY] Qdrant indexing skipped:', e.message);
    }

    // Cache frequently accessed memories
    try {
      const cacheKey = `memory:${memory_type}:${memory.id}`;
      await redis.setEx(cacheKey, 3600, JSON.stringify(memory));
    } catch (e) { /* ok */ }

    res.status(201).json({
      status: 'stored',
      memory_id: memory.id,
      memory_type: memory.memory_type,
      title: memory.title,
      created_at: memory.created_at,
    });
  } catch (err) {
    console.error('[MEMORY] Store error:', err.message);
    res.status(500).json({ error: 'store_failed', detail: err.message });
  }
});

// ── Retrieve Memory ────────────────────────────────────────
app.get('/retrieve/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check cache first
    try {
      const cached = await redis.get(`memory:any:${id}`);
      if (cached) return res.json({ status: 'retrieved', source: 'cache', memory: JSON.parse(cached) });
    } catch (e) { /* fall through to DB */ }

    const { rows } = await pool.query(
      'SELECT * FROM strategic_memory WHERE id = $1',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'memory not found', id });
    }

    const memory = rows[0];
    try {
      await redis.setEx(`memory:any:${id}`, 3600, JSON.stringify(memory));
    } catch (e) { /* ok */ }

    res.json({ status: 'retrieved', source: 'database', memory });
  } catch (err) {
    console.error('[MEMORY] Retrieve error:', err.message);
    res.status(500).json({ error: 'retrieve_failed', detail: err.message });
  }
});

// ── List Memories ──────────────────────────────────────────
app.get('/list', async (req, res) => {
  try {
    const { type, limit = 50, offset = 0, agent_id } = req.query;

    let query = 'SELECT id, memory_type, title, tags, source, confidence, agent_id, created_at FROM strategic_memory WHERE 1=1';
    const params = [];
    let paramIdx = 1;

    if (type) {
      query += ` AND memory_type = $${paramIdx++}`;
      params.push(type);
    }
    if (agent_id) {
      query += ` AND agent_id = $${paramIdx++}`;
      params.push(agent_id);
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramIdx++} OFFSET $${paramIdx++}`;
    params.push(Math.min(parseInt(limit) || 50, 200), parseInt(offset) || 0);

    const { rows } = await pool.query(query, params);

    res.json({
      status: 'ok',
      count: rows.length,
      memories: rows,
    });
  } catch (err) {
    console.error('[MEMORY] List error:', err.message);
    res.status(500).json({ error: 'list_failed', detail: err.message });
  }
});

// ── Semantic Search ────────────────────────────────────────
app.post('/search', async (req, res) => {
  try {
    const { query, type, limit = 10 } = req.body;
    if (!query) return res.status(400).json({ error: 'query is required' });

    // Try Qdrant semantic search first
    try {
      const qdrantRes = await fetch(`${QDRANT_URL}/collections/${QDRANT_COLLECTION}/points/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vector: new Array(384).fill(0).map(() => Math.random() * 2 - 1), // Real vector would come from embedding service
          limit: parseInt(limit) || 10,
          with_payload: true,
          with_vector: false,
        }),
      });

      if (qdrantRes.ok) {
        const qdrantData = await qdrantRes.json();
        const results = (qdrantData.result || []).map(r => ({
          id: r.id,
          score: r.score,
          ...r.payload,
        }));

        if (results.length > 0) {
          return res.json({ status: 'ok', source: 'semantic', count: results.length, results });
        }
      }
    } catch (e) {
      console.warn('[MEMORY] Qdrant search failed, falling back to DB:', e.message);
    }

    // Fallback: Full-text search in PostgreSQL
    const { rows } = await pool.query(
      `SELECT id, memory_type, title, content, tags, source, confidence, created_at,
              ts_rank(to_tsvector('french', title || ' ' || content), plainto_tsquery('french', $1)) as relevance
       FROM strategic_memory
       WHERE to_tsvector('french', title || ' ' || content) @@ plainto_tsquery('french', $1)
       ${type ? "AND memory_type = $2" : ''}
       ORDER BY relevance DESC
       LIMIT $${type ? '3' : '2'}`,
      type ? [query, type, limit] : [query, limit]
    );

    res.json({ status: 'ok', source: 'fulltext', count: rows.length, results: rows });
  } catch (err) {
    console.error('[MEMORY] Search error:', err.message);
    res.status(500).json({ error: 'search_failed', detail: err.message });
  }
});

// ── Consolidate — Merge related memories ──────────────────
app.post('/consolidate', async (req, res) => {
  try {
    const { memory_type, agent_id, limit = 100 } = req.body;

    const query = memory_type
      ? 'SELECT * FROM strategic_memory WHERE memory_type = $1 ORDER BY created_at DESC LIMIT $2'
      : 'SELECT * FROM strategic_memory ORDER BY created_at DESC LIMIT $1';
    const params = memory_type ? [memory_type, parseInt(limit)] : [parseInt(limit)];

    const { rows } = await pool.query(query, params);

    // Group by tags and identify consolidation candidates
    const groups = {};
    for (const row of rows) {
      const tags = row.tags || [];
      const key = tags.sort().join('|') || 'untagged';
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    }

    const consolidationCandidates = Object.entries(groups)
      .filter(([, items]) => items.length >= 2)
      .map(([key, items]) => ({
        tag_group: key,
        count: items.length,
        memory_ids: items.map(i => i.id),
        types: [...new Set(items.map(i => i.memory_type))],
      }));

    await pool.query(
      'INSERT INTO strategic_memory (memory_type, title, content, tags, source, confidence, agent_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        'audit',
        'Memory Consolidation Run',
        JSON.stringify({ candidates: consolidationCandidates.length, groups: consolidationCandidates }),
        JSON.stringify(['consolidation', 'audit']),
        'kos-memory-engine',
        1.0,
        agent_id || 'kos-memory-engine',
      ]
    );

    res.json({
      status: 'consolidated',
      total_memories_scanned: rows.length,
      consolidation_candidates: consolidationCandidates.length,
      groups: consolidationCandidates,
    });
  } catch (err) {
    console.error('[MEMORY] Consolidate error:', err.message);
    res.status(500).json({ error: 'consolidate_failed', detail: err.message });
  }
});

// ── Metrics ────────────────────────────────────────────────
app.get('/metrics', async (_req, res) => {
  try {
    const { rows: total } = await pool.query('SELECT COUNT(*) as count FROM strategic_memory');
    const { rows: byType } = await pool.query(
      'SELECT memory_type, COUNT(*) as count FROM strategic_memory GROUP BY memory_type ORDER BY count DESC'
    );
    const { rows: recent } = await pool.query(
      "SELECT COUNT(*) as count FROM strategic_memory WHERE created_at > NOW() - INTERVAL '24 hours'"
    );
    res.json({
      service: 'memory-engine',
      total_memories: parseInt(total[0]?.count || '0'),
      memories_last_24h: parseInt(recent[0]?.count || '0'),
      by_type: byType,
      uptime: process.uptime(),
    });
  } catch (err) {
    res.json({ service: 'memory-engine', error: err.message });
  }
});

// ── Start ──────────────────────────────────────────────────
const PORT = process.env.PORT || 3003;
app.listen(PORT, async () => {
  console.log(`KOS Memory Engine running on port ${PORT}`);
  await initQdrantCollection();
});