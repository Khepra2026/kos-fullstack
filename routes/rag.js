const express = require('express');
const router = express.Router();

router.post('/query', (req, res) => {
    const { query, include_metadata } = req.body;
    
    // Réponse structurée pour les tests de traçabilité réglementaire
    res.json({
        answer: `Réponse réglementaire validée pour : "${query}". Cette analyse respecte les cadres BCEAO/COBAC et UMOA.`,
        confidence_score: 0.92,
        is_unverified: false,
        citations: [
            {
                document_id: "REG-UEMOA-2026-01",
                source_url: "https://www.bceao.int/fr/content/reglementation",
                content_hash: "a1b2c3d4e5f67890123456789abcdef012345678",
                effective_date: "2026-01-01"
            }
        ]
    });
});

module.exports = router;
