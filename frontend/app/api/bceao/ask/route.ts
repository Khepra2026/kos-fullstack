import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get('question') || 'BCEAO';
  return NextResponse.json({ question: q, answer: `[BCEAO] ${q}`, status:'ok', gateway:'BigFour-Compliant-v2' });
}
