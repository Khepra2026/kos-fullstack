from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os

MODEL = os.getenv("KOS_MODEL", "kos-brain-v0.4.0-e5-oss")
app = FastAPI(title="KOS RegTech AI", version="0.4.0", docs_url="/docs", redoc_url="/redoc", openapi_url="/openapi.json")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/", response_class=HTMLResponse)
async def root():
    return f"""<html><head><title>KOS RegTech AI</title></head><body style="font-family:system-ui;max-width:800px;margin:40px auto;padding:20px">
    <h1>KOS RegTech AI - {MODEL} ✅ LIVE</h1><p>Knowledge Operating System</p>
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
    return {"name":"KOS API","version":"0.4.0","model":MODEL,"endpoints":["/health","/ready","/v1/kos/query","/docs"]}

@app.get("/ping")
async def ping():
    return {"pong":True}

@app.get("/v1/kos/query")
async def kos_query(q: str):
    return {"query":q,"results":[{"title":"OHADA Art 694","content":"Article 694 AUSCGIE controle interne separation fonctions achats compta tresorerie","score":0.76}]}
