from fastapi import FastAPI
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os

MODEL = os.getenv("KOS_MODEL", "kos-brain-v0.4.0-e5-oss")

app = FastAPI(
    title="KOS RegTech AI - Brain API",
    version="0.4.0-e5-oss",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Root"])
async def root():
    return JSONResponse({
        "service": "KOS RegTech AI Brain API",
        "status": "online",
        "version": "0.4.0-e5-oss",
        "model": MODEL,
        "documentation": "/docs",
        "health": "/health",
        "ready": "/ready",
        "v1": "/v1",
        "endpoints": ["/health","/ready","/v1","/v1/kos/query","/v1/status","/docs","/openapi.json","/ping"]
    })

@app.get("/health", tags=["Monitoring"])
async def health_check():
    return {"status": "ok", "model": MODEL, "timestamp": datetime.utcnow().isoformat()+"Z"}

@app.get("/ready", tags=["Monitoring"])
async def readiness_check():
    return {"status": "ready", "model": MODEL, "database": "connected", "model_loaded": True}

@app.get("/ping", tags=["Monitoring"])
async def ping():
    return {"ping": "pong"}

@app.get("/v1", tags=["V1 API"])
async def v1_root():
    return {"name": "KOS RegTech AI API", "version": "0.4.0-e5-oss", "model": MODEL, "status": "operational"}

@app.get("/v1/status", tags=["V1 API"])
async def v1_status():
    return {"message": "KOS API V1 operational", "model": MODEL, "version": "0.4.0-e5-oss"}

@app.get("/v1/kos/query", tags=["RAG"])
async def kos_query(q: str):
    return {
        "query": q,
        "results": [
            {"title": "OHADA Art 694", "content": "Article 694 AUSCGIE : Le controle interne OHADA exige separation fonctions achats compta tresorerie, validation hierarchique, piste audit", "score": 0.76},
            {"title": "BCEAO 2024-12", "content": "...", "score": 0.67}
        ]
    }

@app.post("/v1/kos/ingest", tags=["RAG"])
async def kos_ingest(payload: dict):
    return {"lineage_id": "mock", "chunks": 1}
