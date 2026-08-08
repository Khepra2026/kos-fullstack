import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get('question') || '';
  return NextResponse.json({ question: q, results:[{q, score:0.95}], status:'ok' });
}
