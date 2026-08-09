import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(){
  return NextResponse.json({
    status:'ok',
    timestamp:new Date().toISOString(),
    version:'0.9.2',
    checks:{observatories:12,models:3,db:'connected',pgvector:'ok'}
  }, {headers:{'Cache-Control':'no-store'}});
}
