import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  return NextResponse.json({ status:"ok", rag:"bceao-uemoa", endpoints:["/api/rag/query GET+POST","/api/rag/health"] });
}
