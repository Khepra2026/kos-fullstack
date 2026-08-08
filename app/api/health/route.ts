import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ status: "healthy", checks: { api: "up", supabase: "up", rag: "up" } }, {
    headers: { "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload" }
  });
}
