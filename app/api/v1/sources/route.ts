import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(){
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(url, key)
  
  const { data, error } = await supabase
    .from('kos_regulatory_sources')
    .select('source_id, authority, country_jurisdiction, official_url, is_active, crawl_frequency')
    .eq('is_active', true)
    .order('authority')

  if(error) return NextResponse.json({error: error.message}, {status: 500})
  return NextResponse.json({sources: data})
}
