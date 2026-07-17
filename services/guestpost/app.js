const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json({ limit: '2mb' }));

const PORT = process.env.GUESTPOST_PORT || 3500;
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://ollama:11434';
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'kos-guestpost-generator', ts: new Date().toISOString() });
});

// POST /api/kos/generate-guestpost
app.post('/api/kos/generate-guestpost', async (req, res) => {
  const { topic, target_site, model = 'mistral:7b-instruct-q5_K_M' } = req.body;

  if (!topic || !target_site) {
    return res.status(400).json({ error: 'topic and target_site are required' });
  }

  try {
    // 1. KOS-Backlink agent génère article EEAT
    const prompt = `Rédige un article de 800 mots sur "${topic}" pour le site ${target_site}. ` +
      `Ton : expert Big Four. Intègre 1 lien naturel vers https://khepraexperts.com. ` +
      `Cite au moins une référence BCEAO ou COBAC. Structure : introduction, 3 parties, conclusion.`;

    const ollamaRes = await axios.post(`${OLLAMA_URL}/api/generate`, {
      model,
      prompt,
      stream: false,
      options: {
        temperature: 0.7,
        num_predict: 1200
      }
    }, {
      timeout: 120000,
      headers: { 'Content-Type': 'application/json' }
    });

    const article = ollamaRes.data?.response || ollamaRes.data?.text || '';

    if (!article || article.length < 100) {
      return res.status(502).json({
        error: 'LLM returned empty or too short content',
        raw: ollamaRes.data
      });
    }

    const wordCount = article.split(/\s+/).length;
    const articleHash = crypto.createHash('sha256').update(article).digest('hex');

    // 2. Log pour audit Big Four : traçabilité backlink
    const { data: logEntry, error: dbError } = await supabase
      .from('kos_backlinks')
      .insert({
        target_site,
        anchor: topic,
        content: article,
        status: 'draft',
        eeat_author: 'SIMDA Essoyomèwè',
        article_hash: articleHash,
        word_count: wordCount,
        generated_by: model
      })
      .select()
      .single();

    if (dbError) {
      console.error('[KOS-GUESTPOST] Supabase insert error:', dbError);
    }

    // 3. Security log
    await supabase.from('security_log').insert({
      event: 'guestpost_generated',
      details: {
        target_site,
        topic,
        model,
        word_count: wordCount,
        article_hash: articleHash,
        log_id: logEntry?.id || null
      },
      ip: req.ip || req.headers['x-forwarded-for'] || null,
      user_agent: req.headers['user-agent'] || null
    }).catch(e => console.error('[KOS-GUESTPOST] security_log error:', e.message));

    return res.json({
      article,
      audit: 'logged',
      word_count: wordCount,
      article_hash: articleHash,
      log_id: logEntry?.id || null
    });

  } catch (err) {
    console.error('[KOS-GUESTPOST] Generation error:', err.message);
    return res.status(500).json({
      error: 'Guestpost generation failed',
      detail: err.message
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[KOS-GUESTPOST] Listening on port ${PORT}`);
  console.log(`[KOS-GUESTPOST] Ollama endpoint: ${OLLAMA_URL}`);
});