import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  return NextResponse.json({ status: "ok", rag: "bceao-uemoa", live: true, endpoints: ["/api/rag-query","/api/rag-health"] });
}
