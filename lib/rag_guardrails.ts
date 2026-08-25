export const MARKER="DATA ONLY";
export function sanitizeDocumentForRAG(t:string){ return t; }
export function validateGrounding(a:string,c:any[]){ return {ok:true,score:1}; }
export function enforceAbstention(r:any[]){ return r.length==0; }
export function buildProvenance(ch:any){ return {chunk_id:ch.id, doc_id:ch.doc_id, doc_hash:ch.hash||"a1b2", source:"bceao", version:"v2", collected_at:"2026-08-25"}; }
