const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();

const allowedOrigins = ['https://kos.khepraexperts.com', 'https://api.khepraexperts.com'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Bloqué par la politique CORS de Khepra Experts'));
    }
  },
  credentials: true
}));

app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Route de santé 24/7 pour Fly.io
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    system: 'KOS RegTech Enterprise Hub',
    firm: 'Khepra Experts',
    modules: ['RAG Vectoriel', 'Observatoires', 'Agents IA', 'Automates Veilleurs'],
    timestamp: new Date().toISOString()
  });
});

// API Module : Recherche Vectorielle RAG Réglementaire (OHADA / UEMOA / CEMAC / BCEAO / COBAC)
app.post('/api/rag/search', async (req, res) => {
  try {
    const { queryEmbedding, threshold = 0.88, count = 5 } = req.body;
    const { data, error } = await supabase.rpc('match_regulatory_documents', {
      query_embedding: queryEmbedding,
      match_threshold: threshold,
      match_count: count
    });

    if (error) throw error;
    res.status(200).json({ success: true, results: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(\KOS Backend Enterprise running on port \\);
});
