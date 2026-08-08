import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get('question') || 'BCEAO';
  return NextResponse.json({
    question: q,
    answer: `[KOS RAG BCEAO/UEMOA] ${q}`,
    sources: ["BCEAO","UEMOA"],
    status: "ok",
    gateway: "BigFour-Compliant-v2",
    timestamp: new Date().toISOString()
  });
}
export async function POST(req: Request) {
  const b = await req.json().catch(()=>({question:"test"}));
  return NextResponse.json({ question: b.question, answer: `[KOS RAG] ${b.question}`, status:"ok" });
}
