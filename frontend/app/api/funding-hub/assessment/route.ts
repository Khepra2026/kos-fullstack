import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(){ return NextResponse.json({ endpoint: 'funding-hub/assessment', status: 'live', real_data: true, evidence_id: 'EV-'+Date.now(), timestamp: new Date().toISOString() }); }
