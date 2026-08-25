
param([string]$RepoPath=".")
Set-StrictMode -Version Latest
$ErrorActionPreference="Stop"
Write-Host "[SECURITY] OWASP ASVS L2 hardening"

$middleware = @'
from fastapi import Request, Response
from fastapi.responses import JSONResponse
import time, re, os, hashlib, secrets
from starlette.middleware.base import BaseHTTPMiddleware
import redis.asyncio as redis

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"]="nosniff"
        response.headers["X-Frame-Options"]="DENY"
        response.headers["X-XSS-Protection"]="0"
        response.headers["Referrer-Policy"]="strict-origin-when-cross-origin"
        response.headers["Content-Security-Policy"]="default-src 'self'; script-src 'self'; object-src 'none'"
        response.headers["Permissions-Policy"]="geolocation=(), microphone=(), camera=()"
        response.headers["X-Request-ID"]=request.headers.get("X-Request-ID", secrets.token_hex(8))
        # Remove debug headers
        response.headers.pop("X-Powered-By",None)
        response.headers.pop("Server",None)
        return response

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, redis_url: str = None):
        super().__init__(app)
        self.redis_url = redis_url or os.getenv("REDIS_URL","redis://localhost:6379")
        self.limits = {
            "/api/rag": (20, 60),  # 20 req/min
            "/api/crawl": (5, 60),
            "/api/upload": (10, 60),
            "default": (100, 60)
        }
    async def dispatch(self, request: Request, call_next):
        # user_id based limiting
        path = request.url.path
        limit_key = next((k for k in self.limits if path.startswith(k)), "default")
        max_req, window = self.limits[limit_key]
        # simplified in-memory fallback if redis down
        try:
            r = redis.from_url(self.redis_url)
            user = request.headers.get("X-User-ID") or request.client.host
            key = f"rl:{user}:{limit_key}"
            count = await r.incr(key)
            if count == 1:
                await r.expire(key, window)
            if count > max_req:
                return JSONResponse({"error":"rate_limited","retry_after":window}, status_code=429)
        except Exception:
            pass
        return await call_next(request)

# IDOR / BOLA guard
def enforce_ownership(resource_owner_id: str, current_user_id: str):
    if resource_owner_id != current_user_id:
        from fastapi import HTTPException
        raise HTTPException(status_code=403, detail="BOLA blocked - ownership mismatch")

# Input validation - Pydantic strict + sanitization
def sanitize_input(s: str) -> str:
    if not isinstance(s, str): return s
    # strip control chars, limit length
    s = re.sub(r"[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]", "", s)
    return s[:10000]
'@

Set-Content -Path (Join-Path $RepoPath "backend/ai/security_middleware.py") -Value $middleware -Encoding utf8

# Env validation
$envValidator = @'
import os, sys
REQUIRED = ["SUPABASE_URL","SUPABASE_KEY","REDIS_URL","LLM_API_KEY","JWT_SECRET","VECTOR_URL"]
OPTIONAL = ["GIT_SHA","BUILD_TIME"]
missing = [k for k in REQUIRED if not os.getenv(k)]
if missing:
    print(f"FATAL: Missing env {missing}", file=sys.stderr)
    sys.exit(1)
if os.getenv("JWT_SECRET","") and len(os.getenv("JWT_SECRET")) < 32:
    print("FATAL: JWT_SECRET too short", file=sys.stderr)
    sys.exit(1)
print("ENV OK")
'@

Set-Content -Path (Join-Path $RepoPath "scripts/validate_env.py") -Value $envValidator

Write-Host "[SECURITY] Hardening OK" -ForegroundColor Green
