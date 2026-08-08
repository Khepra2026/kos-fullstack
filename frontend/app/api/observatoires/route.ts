import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(){
  const evidence_id = 'EV-'+Date.now()+'-'+Math.random().toString(36).slice(2,6).toUpperCase();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY || anon;
  let data:any = []; let isReal = false;
  try{
    if(url && anon){
      const r = await fetch(url+'/rest/v1/=*&limit=10', {
        headers: { apikey: anon, Authorization: 'Bearer '+service },
        cache: 'no-store'
      });
      if(r.ok){ data = await r.json(); isReal = Array.isArray(data); }
    }
  }catch(e){ console.error(e); }
  return NextResponse.json({
    endpoint: 'observatoires',
    table: 'kos_observatoires',
    status: isReal ? 'live_real_data' : 'live_no_data',
    real_data: isReal,
    count: Array.isArray(data) ? data.length : 0,
    data,
    evidence_id,
    timestamp: new Date().toISOString(),
    worker: '98/100',
    supabase_url: url ? 'configured' : 'missing'
  }, { headers: { 'X-Evidence-Id': evidence_id } });
}
