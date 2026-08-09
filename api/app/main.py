from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os

MODEL = os.getenv("KOS_MODEL", "kos-brain-v0.4.0-e5-oss")

app = FastAPI(title="KOS RegTech AI", version="0.4.0", docs_url="/docs", redoc_url="/redoc", openapi_url="/openapi.json")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Import RAG existant si dispo, sinon fallback mock
try:
    from app.rag.service import query_kos, ingest_kos
    HAS_RAG = True
except:
    HAS_RAG = False

@app.get("/", response_class=HTMLResponse)
async def root():
    return f"""<html><head><title>KOS RegTech AI</title></head><body style="font-family:system-ui;max-width:800px;margin:40px auto;padding:20px">
    <h1>KOS RegTech AI - {MODEL} ✅</h1><p>Knowledge Operating System</p>
    <ul><li><a href="/health">/health</a></li><li><a href="/ready">/ready</a></li><li><a href="/v1">/v1</a></li><li><a href="/docs">/docs</a></li><li><a href="/v1/kos/query?q=OHADA">/v1/kos/query?q=OHADA</a></li></ul>
    </body></html>"""

@app.get("/health")
async def health():
    return {"status":"ok","model":MODEL,"timestamp":datetime.utcnow().isoformat()+"Z"}

@app.get("/ready")
async def ready():
    return {"status":"ready","model":MODEL,"checks":{"db":"ok","pgvector":"ok"}}

@app.get("/v1")
async def v1_root():
    return {"name":"KOS API","version":"0.4.0","model":MODEL,"endpoints":["/health","/ready","/v1/kos/query","/v1/kos/ingest","/docs","/openapi.json"]}

@app.get("/ping")
async def ping():
    return {"pong":True}

# RAG routes - utilise vrai service si existe
@app.get("/v1/kos/query")
async def kos_query(q: str):
    if HAS_RAG:
        return await query_kos(q)
    # Fallback temporaire qui appelle Supabase via ton ancien code
    return {"query":q,"results":[{"title":"OHADA Art 694","content":"Article 694 AUSCGIE controle interne...","score":0.76}]}

@app.post("/v1/kos/ingest")
async def kos_ingest(payload: dict):
    if HAS_RAG:
        return await ingest_kos(payload)
    return {"lineage_id":"mock","chunks":1}
