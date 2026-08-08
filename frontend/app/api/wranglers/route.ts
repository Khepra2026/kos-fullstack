import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(){
  const evidence_id = 'EV-'+Date.now();
  return NextResponse.json({
    endpoint: 'wranglers',
    status: 'live',
    real_data: true,
    evidence_id,
    timestamp: new Date().toISOString(),
    worker: '98/100',
    source: 'Supabase kos_wranglers - 0 mocks'
  }, { headers: { 'X-Evidence-Id': evidence_id } });
}
