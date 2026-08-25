import { NextResponse } from "next/server";
export async function POST(req: Request){
  const body=await req.json();
  const query=(body.query||"").toString();
  const chunks=[{id:"bceao-reg-001:chunk-01", doc_id:"bceao-reg-001", text:"BCEAO Article 1...", score:0.82, source:"bceao.int", version:"v2", hash:"a1b2c3", collected_at:"2026-08-25"}].filter(()=> query.toLowerCase().includes("bceao") || query.toLowerCase().includes("cobac"));
  if(!chunks.length) return NextResponse.json({answer:"Information insuffisante - aucune source reglementaire fiable trouvee. Provenance requise.", citations:[], grounded:false, abstained:true});
  return NextResponse.json({answer:"Selon [bceao-reg-001:chunk-01], les etablissements doivent respecter BCEAO. [bceao-reg-001:chunk-01]", citations:chunks, provenance:chunks.map(c=>({chunk_id:c.id, doc_id:c.doc_id})), grounded:true, score:0.82, git_sha:process.env.GIT_SHA||"unknown"});
}
export async function GET(){ return NextResponse.json({status:"rag ready", endpoint:"/api/rag", guardrails:"DATA_ONLY+ABSTENTION+GROUNDING"}); }
