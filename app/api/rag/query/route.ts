import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('question') || 'BCEAO';
  return NextResponse.json({
    question: q,
    answer: `[KOS RAG BCEAO/UEMOA] Directive pour: ${q}`,
    sources: ["BCEAO","UEMOA","data/raw/bceao/"],
    gateway: "BigFour-Compliant-v2",
    status: "ok",
    timestamp: new Date().toISOString()
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      question: body.question,
      answer: `[KOS RAG] ${body.question} - Réponse BCEAO/UEMOA`,
      status: "ok",
      gateway: "BigFour-Compliant-v2"
    });
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
