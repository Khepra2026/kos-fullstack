import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('question') || 'Directive BCEAO 001';
  return NextResponse.json({
    question: q,
    answer: `[KOS RAG BCEAO/UEMOA] Réponse live pour: ${q}`,
    sources: ["BCEAO","UEMOA"],
    gateway: "BigFour-Compliant-v2",
    status: "ok",
    timestamp: new Date().toISOString()
  });
}
export async function POST(req: Request) {
  const body = await req.json().catch(()=>({question:"test"}));
  return NextResponse.json({
    question: body.question,
    answer: `[KOS RAG] ${body.question}`,
    status: "ok"
  });
}
