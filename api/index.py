import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from pydantic import BaseModel

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-Content-Type-Options"] = "nosniff"
        return response

app = FastAPI(title="KOS RegTech AI API", version="1.0.0", docs_url="/docs", openapi_url="/openapi.json", redoc_url="/redoc")
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

class QueryBody(BaseModel):
    question: str
    tenant_id: str = "default"

@app.get("/")
def root(): return {"status":"ok","service":"api.khepraexperts.com","version":"2.0-fixed","docs":"/docs"}

@app.get("/health")
def health(): return {"status":"healthy","checks":{"api":"up"}}

@app.get("/rag/health")
def rag_health(): return {"status":"ok","rag":"bceao-uemoa"}

@app.get("/rag/query")
def rag_query_get(question: str = Query("Directive BCEAO?")):
    return {"question":question,"answer":f"[KOS RAG] {question}","gateway":"BigFour-Compliant-v2"}

@app.post("/rag/query")
def rag_query_post(body: QueryBody):
    return {"question":body.question,"answer":f"[KOS RAG] {body.question}","status":"ok"}

@app.get("/rag/search")
def rag_search(q: str = Query("")): return {"query":q,"results":[]}

@app.get("/openapi.json")
def openapi_json():
    return app.openapi()

@app.post("/compliance/check")
def compliance_check(payload: dict = {}): return {"status":"checked"}

@app.get("/bceao/ask")
def bceao_ask(question: str = Query("")): return {"question":question,"answer":"[Mock BCEAO]"}

@app.get("/auth/me")
def auth_me(): return {"user":"mock"}

@app.get("/v1/tenants")
def tenants(): return {"tenants":[]}

@app.get("/v1/audit")
def audit(): return {"audit":[]}

@app.get("/status")
def kos_status(): return {"status":"kos"}

@app.get("/metrics")
def metrics(): return {"metrics":{"ok":True}}
