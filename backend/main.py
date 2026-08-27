class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        # Suppression disclosure
        response.headers.pop("X-Powered-By", None)
        response.headers.pop("Server", None)
        # Ajout headers
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload"
        # CSP construite selon ressources KOS réelles
        response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self' 'unsafe-inline' https://kos.khepraexperts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.khepraexperts.com https://*.supabase.co; frame-ancestors 'none'"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        return response

@app.exception_handler(404)
async def not_found_handler(request, exc):
    if request.url.path.startswith("/api"):
        return JSONResponse(status_code=404, content={"code":"NOT_FOUND","path":request.url.path})
    # pour frontend laisser passer vers fallback si besoin
    return JSONResponse(status_code=404, content={"detail":"Not Found"})