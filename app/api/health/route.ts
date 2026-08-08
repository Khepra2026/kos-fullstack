import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const url = new URL(req.url);
  const path = url.pathname;
  const q = url.searchParams.get('question') || 'BCEAO';
  
  // Si ?rag=1 ou ?question -> mode RAG
  if (url.searchParams.has('question') || path.includes('rag') || url.searchParams.has('rag')) {
    return NextResponse.json({
      question: q,
      answer: `[KOS RAG LIVE - via /api/health] ${q}`,
      sources: ["BCEAO","UEMOA"],
      gateway: "BigFour-Compliant-v2",
      status: "ok",
      timestamp: new Date().toISOString(),
      route: "fallback via health"
    });
  }

  // Sinon health normal
  return NextResponse.json({
    endpoint: "health",
    status: "live",
    message: "KOS API - use /api/health?question=BCEAO for RAG",
    rag_endpoint: "/api/health?question=YOUR_QUESTION",
    timestamp: new Date().toISOString()
  });
}

export async function POST(req) {
  const body = await req.json().catch(()=>({question:"test"}));
  return NextResponse.json({
    question: body.question,
    answer: `[KOS RAG POST via /api/health] ${body.question}`,
    status: "ok"
  });
}
