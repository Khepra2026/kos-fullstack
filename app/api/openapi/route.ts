import { NextResponse } from 'next/server';
export async function GET() {
  // Retourne openapi minimal pour éviter 404
  return NextResponse.json({ openapi: "3.0.0", info: { title: "KOS API", version: "1.0.0" }, paths: {} });
}
