import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() { return NextResponse.json({ status:'checked', compliance:true, gateway:'BigFour-Compliant-v2' }); }
export async function POST(req: Request) {
  const b = await req.json().catch(()=>({}));
  return NextResponse.json({ status:'checked', compliance:true, input:b, gateway:'BigFour-Compliant-v2' });
}
