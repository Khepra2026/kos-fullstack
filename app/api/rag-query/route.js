export const dynamic = 'force-dynamic';
export async function GET(req) {
  const url = new URL(req.url);
  const q = url.searchParams.get('question') || 'BCEAO';
  return Response.json({
    question: q,
    answer: `[KOS RAG LIVE] ${q}`,
    status: 'ok',
    gateway: 'BigFour-Compliant-v2',
    timestamp: new Date().toISOString()
  });
}
export async function POST(req) {
  const b = await req.json().catch(()=>({question:'test'}));
  return Response.json({ question: b.question, answer: `[KOS RAG] ${b.question}`, status:'ok' });
}
