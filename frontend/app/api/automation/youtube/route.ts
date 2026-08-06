import { NextResponse } from "next/server"
import { AuditTrail } from "../../../../lib/kos-protocol/correlation"
import { publishYouTube } from "../../../../lib/kos-protocol/publishers"
export async function POST(req: Request) {
  const body=await req.json(); const audit=new AuditTrail()
  try{ const r=await publishYouTube(body,audit); return NextResponse.json({...r,audit:audit.getTrail()}) }
  catch(e:any){ return NextResponse.json({error:e.message},{status:500}) }
}
