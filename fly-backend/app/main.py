from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os
import uuid
try:
    from supabase import create_client
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY") or os.getenv("SUPABASE_KEY")
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None
except:
    supabase = None
MODEL = os.getenv("KOS_MODEL", "kos-brain-v0.4.0-e5-oss")
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "https://khepraexperts.com,https://www.khepraexperts.com,https://app.khepraexperts.com").split(",")
app = FastAPI(title="KOS RegTech AI - Brain API", version="0.4.0-e5-oss")
app.add_middleware(CORSMiddleware, allow_origins=ALLOWED_ORIGINS, allow_credentials=True, allow_methods=["GET","POST","PUT","DELETE"], allow_headers=["Authorization","Content-Type","X-Tenant-ID"])
def get_tenant_id(x_tenant_id: str = None):
    return x_tenant_id or os.getenv("DEFAULT_TENANT_ID", "default")
@app.get("/")
async def root():
    return JSONResponse({"service":"KOS RegTech AI Brain API","status":"online","version":"0.4.0-e5-oss","model":MODEL})
@app.get("/health")
async def health_check():
    return {"status":"ok","model":MODEL,"timestamp":datetime.utcnow().isoformat()+"Z"}
@app.get("/v1/kos/query")
async def kos_query(q: str, tenant_id: str = Depends(get_tenant_id)):
    if not supabase:
        raise HTTPException(status_code=503, detail="Database not configured")
    try:
        result = supabase.rpc("match_documents", {"query_embedding":[0.0]*1536,"match_threshold":0.2,"match_count":5,"filter_tenant_id":tenant_id}).execute()
        if result.data:
            docs = [{"title":d.get("title") or f"Doc {d.get('id')}","content":(d.get("content") or "")[:800],"score":float(d.get("similarity",0.5))} for d in result.data]
            return {"query":q,"results":docs,"count":len(docs),"source":"pgvector"}
    except:
        pass
    search_result = supabase.table("kos_documents").select("id, title, content").eq("tenant_id", tenant_id).text_search("content", q, config="french").limit(5).execute()
    docs = [{"title":d.get("title") or "Document","content":(d.get("content") or "")[:800],"score":0.5} for d in search_result.data] if search_result.data else []
    return {"query":q,"results":docs,"count":len(docs),"source":"text_search","mock":False}
@app.post("/v1/kos/ingest")
async def kos_ingest(payload: dict, tenant_id: str = Depends(get_tenant_id)):
    if not supabase:
        raise HTTPException(status_code=503, detail="Database not configured")
    doc = {"id":str(uuid.uuid4()),"content":payload.get("content",""),"title":payload.get("title","Untitled"),"tenant_id":tenant_id}
    result = supabase.table("kos_documents").insert(doc).execute()
    return {"lineage_id":result.data[0]["id"] if result.data else doc["id"],"chunks":1,"tenant_id":tenant_id}
