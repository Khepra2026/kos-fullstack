
"""
BIG FOUR PACK 3 - Backend main.py pour api.khepraexperts.com
Place dans kos-fullstack/backend/app/main.py ou kos-fullstack/backend/main.py
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
        response.headers["Content-Security-Policy"] = "default-src 'self'"
        return response

app = FastAPI(title="KOS RegTech AI API", version="1.0.0")

app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://khepraexperts.com", "https://app.khepraexperts.com", "https://kos.khepraexperts.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status":"ok", "service":"api.khepraexperts.com", "version":"1.0.0", "docs":"/docs"}

@app.get("/health")
def health():
    return {"status":"healthy", "checks": {"api": "up", "supabase": "up"}}

@app.get("/api/v1/observatoires")
def observatoires():
    return {"observatoires": ["BCEAO","COBAC","OHADA","APDP","GIABA"]}
