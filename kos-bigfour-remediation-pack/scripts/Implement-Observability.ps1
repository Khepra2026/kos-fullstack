
param([string]$RepoPath=".")
Write-Host "[OBSERVABILITY] Forensic logging"

$obs = @'
import logging, json, time, uuid, os
from pythonjsonlogger import jsonlogger

# Structured JSON logging
logger = logging.getLogger("kos")
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter("%(timestamp)s %(levelname)s %(name)s %(message)s %(request_id)s %(user_id)s %(endpoint)s %(model)s %(doc_id)s %(latency_ms)s")
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
logger.setLevel(logging.INFO)

def log_request(request_id: str, user_id: str, endpoint: str, query: str, model: str, doc_ids: list, latency: float, error: str=None):
    logger.info("rag_request", extra={
        "timestamp": time.time(),
        "request_id": request_id,
        "user_id": user_id,
        "endpoint": endpoint,
        "query_hash": hash(query),
        "model": model,
        "doc_id": ",".join(doc_ids[:5]),
        "latency_ms": int(latency*1000),
        "error": error
    })

# X-Request-ID middleware
from starlette.middleware.base import BaseHTTPMiddleware
class RequestIDMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        rid = request.headers.get("X-Request-ID", str(uuid.uuid4()))
        request.state.request_id = rid
        start = time.time()
        response = await call_next(request)
        response.headers["X-Request-ID"]=rid
        response.headers["X-Response-Time"]=str(int((time.time()-start)*1000))+"ms"
        return response
'@

Set-Content -Path (Join-Path $RepoPath "backend/ai/observability.py") -Value $obs
Write-Host "[OBSERVABILITY] OK" -ForegroundColor Green
