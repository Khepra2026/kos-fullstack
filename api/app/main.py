from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine
from.config import settings

def get_engine():
    if not settings.DATABASE_URL: return None
    return create_async_engine(settings.DATABASE_URL.replace("postgresql://","postgresql+asyncpg://"))

app = FastAPI(title="KOS OSS E5 FREE")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/health")
async def health():
    return {"status":"ok","model":settings.MODEL_VERSION}

@app.get("/ready")
async def ready():
    eng = get_engine()
    if not eng: return {"status":"degraded"}
    try:
        async with eng.connect() as conn:
            await conn.execute(text("SELECT 1"))
        return {"status":"ready","db":"ok"}
    except Exception as e:
        return {"status":"not_ready","error":str(e)}

@app.get("/v1/kos/query")
async def kos_query(q: str, top_k: int = 5):
    from.rag.service import query_rag
    return {"query": q, "results": await query_rag(q, top_k)}

@app.post("/v1/kos/ingest")
async def kos_ingest(payload: dict):
    from.rag.service import ingest_document
    return await ingest_document(payload.get("title","Test"), payload.get("content",""), payload.get("source_type","interne"))

@app.get("/version")
async def version():
    return {"model":settings.MODEL_VERSION}
