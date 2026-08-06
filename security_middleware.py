
"""
BIG FOUR - FastAPI Security Middleware pour api.khepraexperts.com
Copier dans app/main.py
"""
from fastapi import FastAPI
from starlette.middleware.base import BaseHTTPMiddleware

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload"
        response.headers["Content-Security-Policy"] = "default-src 'self'"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
        response.headers["Cross-Origin-Embedder-Policy"] = "require-corp"
        response.headers["Cross-Origin-Resource-Policy"] = "same-site"
        return response

# Dans main.py:
# app = FastAPI()
# app.add_middleware(SecurityHeadersMiddleware)
# + ajouter route health pour fixer le 404:
# @app.get("/")
# def root(): return {"status":"ok", "service":"api.khepraexperts.com"}
# @app.get("/health")
# def health(): return {"status":"healthy"}
