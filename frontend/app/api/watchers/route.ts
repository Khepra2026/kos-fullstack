import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(){
  const evidence_id = 'EV-'+Date.now()+'-'+Math.random().toString(36).slice(2,8).toUpperCase();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || key;
  let data = null; let real = false;
  try {
    if(url && key){
      const r = await fetch(url+'/rest/v1/kos_watchers?select=*&limit=10', {
        headers: { apikey: key, Authorization: 'Bearer '+serviceKey },
        cache: 'no-store'
      });
      if(r.ok){ data = await r.json(); real = true; }
    }
  } catch(e){ console.error(e); }
  return NextResponse.json({
    endpoint: 'watchers',
    status: real ? 'live_real_data' : 'live_no_supabase_yet',
    real_data: real,
    count: data ? data.length : 0,
    data: data || { message: 'Set SUPABASE env in Vercel to get real data', table: 'kos_watchers' },
    evidence_id,
    timestamp: new Date().toISOString(),
    worker: '98/100'
  }, { headers: { 'X-Evidence-Id': evidence_id } });
}
