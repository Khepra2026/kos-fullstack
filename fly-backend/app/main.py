import logging
import os
import uuid
from datetime import datetime, timezone
from typing import Any

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from supabase import create_client

logger = logging.getLogger(__name__)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY") or os.getenv("SUPABASE_KEY")

try:
    supabase = (
        create_client(SUPABASE_URL, SUPABASE_KEY)
        if SUPABASE_URL and SUPABASE_KEY
        else None
    )
except Exception as e:
    logger.warning(f"Supabase init failed: {e}")
    supabase = None

MODEL = os.getenv("KOS_MODEL", "kos-brain-v0.4.0-e5-oss")
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "https://khepraexperts.com,https://www.khepraexperts.com,https://app.khepraexperts.com",
).split(",")

app = FastAPI(title="KOS RegTech AI - Brain API", version="0.4.0-e5-oss")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type", "X-Tenant-ID"],
)

def get_tenant_id(x_tenant_id: str | None = None) -> str:
    return x_tenant_id or os.getenv("DEFAULT_TENANT_ID", "default")

@app.get("/")
async def root() -> JSONResponse:
    return JSONResponse(
        {
            "service": "KOS RegTech AI Brain API",
            "status": "online",
            "version": "0.4.0-e5-oss",
            "model": MODEL,
        }
    )

@app.get("/health")
async def health_check() -> dict[str, str]:
    return {
        "status": "ok",
        "model": MODEL,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }

@app.get("/v1/kos/query")
async def kos_query(
    q: str, tenant_id: str = Depends(get_tenant_id)
) -> dict[str, Any]:
    if not supabase:
        raise HTTPException(status_code=503, detail="Database not configured")

    try:
        result = supabase.rpc(
            "match_documents",
            {
                "query_embedding": [0.0] * 1536,
                "match_threshold": 0.2,
                "match_count": 5,
                "filter_tenant_id": tenant_id,
            },
        ).execute()
        if result.data:
            docs = [
                {
                    "title": d.get("title") or f"Doc {d.get('id')}",
                    "content": (d.get("content") or "")[:800],
                    "score": float(d.get("similarity", 0.5)),
                }
                for d in result.data
            ]
            return {"query": q, "results": docs, "count": len(docs), "source": "pgvector"}
    except Exception as e:
        logger.warning(f"pgvector match failed, fallback to text_search: {e}")

    try:
        search_result = (
            supabase.table("kos_documents")
           .select("id, title, content")
           .eq("tenant_id", tenant_id)
           .text_search("content", q)
           .limit(5) # type: ignore[attr-defined]
           .execute()
        )
        docs = [
            {
                "title": d.get("title") or "Document",
                "content": (d.get("content") or "")[:800],
                "score": 0.5,
            }
            for d in (search_result.data or [])
        ]
        return {"query": q, "results": docs, "count": len(docs), "source": "text_search", "mock": False}
    except Exception as e:
        logger.error(f"text_search failed: {e}")
        raise HTTPException(status_code=500, detail=f"Query failed: {e}") from e

@app.post("/v1/kos/ingest")
async def kos_ingest(
    payload: dict[str, Any], tenant_id: str = Depends(get_tenant_id)
) -> dict[str, Any]:
    if not supabase:
        raise HTTPException(status_code=503, detail="Database not configured")

    doc = {
        "id": str(uuid.uuid4()),
        "content": payload.get("content", ""),
        "title": payload.get("title", "Untitled"),
        "tenant_id": tenant_id,
    }
    result = supabase.table("kos_documents").insert(doc).execute()
    doc_id = result.data[0]["id"] if result.data else doc["id"]
    return {"lineage_id": doc_id, "chunks": 1, "tenant_id": tenant_id}
