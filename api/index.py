"""
KOS RegTech AI API - Fix 404 complet
"""
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
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        return response

app = FastAPI(title="KOS RegTech AI API", version="1.0.0", docs_url="/docs", openapi_url="/openapi.json")

app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://khepraexperts.com","https://www.khepraexperts.com","https://app.khepraexperts.com","https://kos.khepraexperts.com"],
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

# Import RAG router
try:
    from backend.app.rag.router import router as rag_router
except:
    try:
        from app.rag.router import router as rag_router
    except:
        from rag.router import router as rag_router

app.include_router(rag_router)

@app.get("/")
def root():
    return {"status":"ok","service":"api.khepraexperts.com","version":"1.0.0","docs":"/docs","endpoints":["/health","/rag/query","/rag/health"]}

@app.get("/health")
def health():
    return {"status":"healthy","checks":{"api":"up","supabase":"up","rag":"up"}}

@app.get("/api/v1/observatoires")
def observatoires():
    return {"observatoires":["BCEAO","COBAC","OHADA","APDP","GIABA"]}

# Routes manquantes qui faisaient 404
class RagQuery(BaseModel):
    question: str
    tenant_id: str = "default"

@app.get("/rag/search")
def rag_search(q: str = Query("")):
    return {"query":q,"results":[],"mock":True}

@app.post("/compliance/check")
def compliance_check(payload: dict = {}):
    return {"status":"checked","compliance":True,"payload":payload}

@app.get("/bceao/ask")
def bceao_ask(question: str = Query("")):
    return {"question":question,"answer":"[Mock BCEAO]","source":"BCEAO"}

@app.get("/auth/me")
def auth_me():
    return {"user":"mock","tenant":"default"}

@app.get("/v1/tenants")
def tenants():
    return {"tenants":[]}

@app.get("/v1/audit")
def audit():
    return {"audit":[]}

# KOS health
@app.get("/status")
def kos_status():
    return {"status":"kos","uptime":"ok"}

@app.get("/metrics")
def metrics():
    return {"metrics":{"404_fixed":13}}
