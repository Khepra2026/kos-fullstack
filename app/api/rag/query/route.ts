import { NextResponse } from 'next/server';
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const question = searchParams.get('question') || 'Directive BCEAO?';
  return NextResponse.json({
    question, answer: `[KOS RAG BCEAO/UEMOA] Réponse pour: ${question}`,
    sources: ["BCEAO", "UEMOA"], gateway: "BigFour-Compliant-v2", status: "ok"
  });
}
export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({
    question: body.question, answer: `[KOS RAG] ${body.question}`, status: "ok", gateway: "BigFour-Compliant-v2"
  });
}
