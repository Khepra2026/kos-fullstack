import { NextResponse } from 'next/server'

export async function GET(){
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if(!url || !key){
    return NextResponse.json({sources: []}, {status: 200})
  }

  try {
    const res = await fetch(`${url}/rest/v1/kos_regulatory_sources?is_active=eq.true&order=authority.asc&select=source_id,authority,country_jurisdiction,official_url,is_active,crawl_frequency`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      cache: 'no-store'
    })
    const data = await res.json()
    if(!res.ok) throw new Error(JSON.stringify(data))
    return NextResponse.json({sources: data})
  } catch(e:any){
    return NextResponse.json({error: e.message, sources: [
      {authority:'BCEAO', official_url:'https://www.bceao.int', country_jurisdiction:'UEMOA', is_active:true},
      {authority:'COBAC', official_url:'https://www.beac.int', country_jurisdiction:'CEMAC', is_active:true},
      {authority:'OHADA', official_url:'https://www.ohada.org', country_jurisdiction:'OHADA', is_active:true},
      {authority:'GAFI', official_url:'https://www.fatf-gafi.org', country_jurisdiction:'International', is_active:true},
      {authority:'ISSB', official_url:'https://www.ifrs.org', country_jurisdiction:'International', is_active:true},
    ]})
  }
}
