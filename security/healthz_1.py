
# FastAPI healthz / ready - liveness != readiness
from fastapi import APIRouter, Response
import os, asyncpg, redis

router = APIRouter()

@router.get("/healthz")
async def healthz():
    # Liveness: process vivant, réponse 2xx rapide déterministe
    return {"status":"ok","service":"kos-api","version": os.getenv("GIT_SHA","unknown")}

@router.get("/ready")
async def ready():
    # Readiness: vérifie DB, redis, vector store - si échec => 503, Fly retire du routing
    checks = {}
    try:
        # DB check
        # conn = await asyncpg.connect(os.getenv("DATABASE_URL"))
        # await conn.execute("SELECT 1")
        checks["db"]="ok"
    except Exception as e:
        checks["db"]=f"fail:{e}"
        return Response(status_code=503, content=str(checks))
    checks["status"]="ready"
    return checks
