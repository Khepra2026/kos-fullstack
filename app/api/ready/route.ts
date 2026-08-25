import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(){
  try{
    if(!process.env.SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error('SUPABASE_URL missing');
    return NextResponse.json({status:'ready',db:'ok'},{status:200});
  }catch(e:any){ return NextResponse.json({status:'not-ready',error:e.message},{status:503}); }
}
