import { NextResponse } from 'next/server';
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  return NextResponse.json({ question: searchParams.get('question'), answer: "[Mock BCEAO]" });
}
