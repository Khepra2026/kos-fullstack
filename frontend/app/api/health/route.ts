import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export async function GET(){
  const evidence_id = 'EV-'+Date.now();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  let data:any = []; let errMsg = ''; let statusCode = 0;
  try{
    if(!url || !anon) throw new Error('Missing env');
    const r = await fetch(url+'/rest/v1/kos_agents?select=*&limit=20', {
      headers: { apikey: anon, Authorization: 'Bearer '+anon },
      cache: 'no-store'
    });
    statusCode = r.status;
    const txt = await r.text();
    if(!r.ok) throw new Error('Supabase '+r.status+' '+txt.slice(0,300));
    data = JSON.parse(txt);
  }catch(e:any){ errMsg = (e?.message||'').slice(0,500); }
  return NextResponse.json({
    endpoint: 'health', table: 'kos_agents',
    status: data.length>0?'live_real_data':'live_no_data',
    real_data: data.length>0,
    count: data.length, data, evidence_id,
    debug: { url_host: url?new URL(url).host:'missing', anon_len: anon?.length||0, statusCode, error: errMsg },
    timestamp: new Date().toISOString(), worker: '98/100'
  }, { headers: { 'X-Evidence-Id': evidence_id, 'Cache-Control':'no-store' } });
}

