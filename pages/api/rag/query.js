export default function handler(req, res) {
  const q = req.query.question || 'BCEAO';
  res.status(200).json({ question: q, answer: `[KOS RAG Pages API] ${q}`, status:'ok', timestamp: new Date().toISOString() });
}
