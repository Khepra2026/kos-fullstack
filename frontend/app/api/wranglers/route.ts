import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export async function GET(){
  const evidence_id = 'EV-'+Date.now();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  let data:any = []; let errMsg = ''; let statusCode = 0;
  try{
    if(!url || !anon) throw new Error('Missing SUPABASE env: url='+!!url+' anon='+!!anon);
    const r = await fetch(url+'/rest/v1/=*&limit=20', {
      headers: { apikey: anon, Authorization: 'Bearer '+anon },
      cache: 'no-store'
    });
    statusCode = r.status;
    if(!r.ok){ const txt = await r.text(); errMsg = txt.slice(0,300); throw new Error('Supabase '+r.status+' '+txt.slice(0,200)); }
    data = await r.json();
  }catch(e:any){ errMsg = (e?.message||String(e)).slice(0,500); }
  return NextResponse.json({
    endpoint: 'wranglers',
    table: 'kos_wranglers',
    status: Array.isArray(data) && data.length>0 ? 'live_real_data' : 'live_no_data',
    real_data: Array.isArray(data) && data.length>0,
    count: Array.isArray(data) ? data.length : 0,
    data,
    evidence_id,
    debug: { url_host: url ? new URL(url).host : 'missing', anon_len: anon?.length||0, statusCode, error: errMsg },
    timestamp: new Date().toISOString(),
    worker: '98/100'
  }, { headers: { 'X-Evidence-Id': evidence_id, 'Cache-Control': 'no-store' } });
}
