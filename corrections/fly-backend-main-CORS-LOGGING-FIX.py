# FIX fly-backend/app/main.py - CORS restricted + structured logging + request_id
import os, uuid, time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "https://khepraexperts.com,https://www.khepraexperts.com,https://app.khepraexperts.com").split(",")

app = FastAPI(title="KOS RegTech API", version="0.5.0-bigfour-fix")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in ALLOWED_ORIGINS if o.strip()],
    allow_credentials=True,
    allow_methods=["GET","POST"],
    allow_headers=["Authorization","Content-Type","X-Request-ID"],
)

@app.middleware("http")
async def add_request_id_and_logging(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
    start = time.time()
    response = await call_next(request)
    latency = (time.time() - start) * 1000
    response.headers["X-Request-ID"] = request_id
    # structured log - no secrets
    print(f'{{"timestamp":"{time.time()}","request_id":"{request_id}","method":"{request.method}","path":"{request.url.path}","status":{response.status_code},"latency_ms":{latency:.2f}}}')
    return response

# RAG endpoint - MUST implement real retrieval, no mock
# @app.post("/v1/kos/query")
# def kos_query(q: str, tenant_id: str):
#     # 1. embedding via text-embedding-3-small
#     # 2. supabase.rpc("match_documents", {"query_embedding": emb, "match_count": 5, "filter_tenant": tenant_id})
#     # 3. if no docs -> return {"answer": "No source found", "citations": [], "refusal": true}
#     # 4. else context assembly + LLM + citation accuracy check
#     # 5. return answer + citations + confidence calibrated
#     pass
