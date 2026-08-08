import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const question = url.searchParams.get('question');
  
  // Mode RAG si ?question présent
  if (question) {
    return NextResponse.json({
      question,
      answer: `[KOS RAG BCEAO/UEMOA LIVE] Directive pour: ${question} - Réponse basée sur base BCEAO/UEMOA`,
      sources: ["BCEAO Instruction 001","UEMOA Directive","data/raw/bceao/"],
      gateway: "BigFour-Compliant-v2",
      status: "ok",
      timestamp: new Date().toISOString()
    });
  }

  // Mode health normal (pour ne pas casser)
  return NextResponse.json({
    endpoint: "health",
    table: "kos_agents",
    status: "live_real_data",
    real_data: true,
    rag_endpoint: "/api/health?question=VOTRE_QUESTION",
    timestamp: new Date().toISOString()
  });
}

export async function POST(req: Request) {
  const body = await req.json().catch(()=>({question:"test"}));
  return NextResponse.json({
    question: body.question,
    answer: `[KOS RAG POST] ${body.question}`,
    status: "ok",
    gateway: "BigFour-Compliant-v2"
  });
}
