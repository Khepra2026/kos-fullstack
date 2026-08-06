import { NextResponse } from "next/server"
import { AuditTrail } from "../../../../lib/kos-protocol/correlation"
import { publishAll } from "../../../../lib/kos-protocol/publishers"
export async function POST(req: Request) {
  const body = await req.json()
  const audit = new AuditTrail()
  try {
    audit.log("Validation","started")
    if(!body.title||!body.description||!body.thumbnailUrl||!body.videoUrl){ audit.log("Validation","failed",{error:"QA_BLOCKED"}); return NextResponse.json({error:"QA_BLOCKED",audit:audit.getTrail()},{status:400}) }
    const result = await publishAll(body)
    return NextResponse.json(result)
  } catch(e:any){ return NextResponse.json({error:e.message||"FAIL",audit:audit.getTrail()},{status:500}) }
}
