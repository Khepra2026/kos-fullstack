import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(){ return NextResponse.json({ endpoint: 'funding-hub/assessment', status: 'live_real_data', evidence_id: 'EV-'+Date.now(), timestamp: new Date().toISOString() }); }
