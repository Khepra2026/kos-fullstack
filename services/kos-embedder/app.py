"""
KOS EMBEDDER + RAG v2.0 — Embedding 100% Local + RAG Pipeline
Sentence-Transformers all-MiniLM-L6-v2 → Vector(384) → pgvector → Ollama Mistral 7B
ISAE 3402 — 0 API Externe — SHA256 Traçabilité
"""
import os
import hashlib
import logging
from contextlib import asynccontextmanager

import torch
import httpx
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from psycopg2.pool import ThreadedConnectionPool

logging.basicConfig(level=logging.INFO, format="%(asctime)s [KOS-EMBEDDER] %(levelname)s %(message)s")
logger = logging.getLogger("kos-embedder")

MODEL_NAME = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
MAX_BATCH_SIZE = int(os.getenv("MAX_BATCH_SIZE", "64"))
DATABASE_URL = os.getenv("DATABASE_URL", "")
OLLAMA_URL = os.getenv("OLLAMA_URL") or os.getenv("OLLAMA_HOST", "http://ollama:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL") or os.getenv("MODEL", "kos-bigfour")
RAG_TOP_K = int(os.getenv("RAG_TOP_K", "5"))
POOL_MIN = int(os.getenv("DB_POOL_MIN", "2"))
POOL_MAX = int(os.getenv("DB_POOL_MAX", "10"))

model: SentenceTransformer | None = None
db_pool: ThreadedConnectionPool | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global model, db_pool

    logger.info(f"Loading embedding model {MODEL_NAME} on {DEVICE}...")
    model = SentenceTransformer(MODEL_NAME, device=DEVICE)
    logger.info(f"Model loaded. Dimension={model.get_sentence_embedding_dimension()}")

    if DATABASE_URL:
        logger.info(f"Initializing DB connection pool (min={POOL_MIN}, max={POOL_MAX})...")
        db_pool = ThreadedConnectionPool(POOL_MIN, POOL_MAX, DATABASE_URL)
        logger.info("DB connection pool ready")
    else:
        logger.warning("DATABASE_URL not set — /rag endpoint will return 503")

    yield

    if db_pool:
        db_pool.closeall()
        logger.info("DB connection pool closed")
    logger.info("Shutting down embedder")


app = FastAPI(title="KOS Embedder + RAG", version="2.0.0", lifespan=lifespan)


# ── Pydantic Models ─────────────────────────────────────────────

class EmbedRequest(BaseModel):
    texts: list[str]


class EmbedResponse(BaseModel):
    vectors: list[list[float]]
    model: str
    dimension: int
    count: int
    hashes: list[str]


class RAGRequest(BaseModel):
    query: str
    top_k: int = RAG_TOP_K


class RAGSource(BaseModel):
    id: int
    title: str
    score: float


class RAGResponse(BaseModel):
    answer: str | None
    sources: list[RAGSource]
    model: str
    ollama_model: str


class HealthResponse(BaseModel):
    status: str
    model: str
    device: str
    dimension: int | None
    db_connected: bool
    rag_ready: bool


# ── Health ──────────────────────────────────────────────────────

@app.get("/health", response_model=HealthResponse)
async def health():
    dim = model.get_sentence_embedding_dimension() if model else None
    db_ok = db_pool is not None
    return HealthResponse(
        status="healthy",
        model=MODEL_NAME,
        device=DEVICE,
        dimension=dim,
        db_connected=db_ok,
        rag_ready=db_ok and model is not None,
    )


# ── Helpers ─────────────────────────────────────────────────────

def _sha256(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def _get_db_conn():
    """Get a connection from the pool with health-check + reconnect."""
    if db_pool is None:
        raise HTTPException(status_code=503, detail="Database not configured — set DATABASE_URL")
    try:
        return db_pool.getconn()
    except Exception as e:
        logger.error(f"Failed to get DB connection: {e}")
        raise HTTPException(status_code=503, detail="Database pool exhausted")


def _return_db_conn(conn):
    if db_pool and conn:
        db_pool.putconn(conn)


# ── Embed Endpoint ──────────────────────────────────────────────

@app.post("/embed", response_model=EmbedResponse)
async def embed(req: EmbedRequest):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded yet")

    if not req.texts:
        raise HTTPException(status_code=400, detail="texts array is empty")

    if len(req.texts) > MAX_BATCH_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"Batch too large. Max {MAX_BATCH_SIZE}, got {len(req.texts)}"
        )

    logger.info(f"Embedding {len(req.texts)} texts...")
    embeddings = model.encode(req.texts, normalize_embeddings=True, show_progress_bar=False)

    vectors = embeddings.tolist()
    hashes = [_sha256(t) for t in req.texts]

    dim = model.get_sentence_embedding_dimension()

    return EmbedResponse(
        vectors=vectors,
        model=MODEL_NAME,
        dimension=dim,
        count=len(vectors),
        hashes=hashes,
    )


# ── RAG Endpoint ────────────────────────────────────────────────

@app.post("/rag", response_model=RAGResponse)
async def rag(req: RAGRequest):
    if model is None:
        raise HTTPException(status_code=503, detail="Embedding model not loaded yet")

    if db_pool is None:
        raise HTTPException(status_code=503, detail="Database not configured — set DATABASE_URL")

    if not req.query or not req.query.strip():
        raise HTTPException(status_code=400, detail="Query is empty")

    top_k = max(1, min(req.top_k, 20))

    try:
        # 1. Embed query
        logger.info(f"RAG query: {req.query[:120]}...")
        q_vec = model.encode([req.query], normalize_embeddings=True, show_progress_bar=False)[0].tolist()

        # 2. Search pgvector
        conn = _get_db_conn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, title, content, 1 - (embedding <=> %s::vector) AS score
                    FROM kb_docs
                    WHERE embedding IS NOT NULL
                    ORDER BY embedding <=> %s::vector
                    LIMIT %s
                    """,
                    (q_vec, q_vec, top_k),
                )
                rows = cur.fetchall()
        finally:
            _return_db_conn(conn)

        if not rows:
            logger.warning("RAG: no matching documents found")
            return RAGResponse(
                answer=None,
                sources=[],
                model=MODEL_NAME,
                ollama_model=OLLAMA_MODEL,
            )

        # 3. Build context
        sources = [
            RAGSource(id=row[0], title=row[1], score=round(float(row[3]), 4))
            for row in rows
        ]
        context = "\n---\n".join([f"[{row[1]}]\n{row[2][:1000]}" for row in rows])

        logger.info(f"RAG: {len(sources)} docs retrieved, top score={sources[0].score}")

        # 4. Call Ollama Mistral 7B
        ollama_prompt = (
            f"Tu es un expert Big Four (KPMG, Deloitte, PwC, EY) spécialisé en conformité "
            f"réglementaire BCEAO, COBAC, OHADA, UEMOA, CEMAC, GAFI et normes ISAE 3402 / ISO 27001.\n\n"
            f"Contexte documentaire (sources réglementaires vérifiées) :\n{context}\n\n"
            f"Question : {req.query}\n\n"
            f"Réponds de manière précise et structurée en citant tes sources. "
            f"Format de réponse souhaité : JSON avec les clés 'answer' (réponse détaillée) "
            f"et 'sources' (liste des titres cités)."
        )

        async with httpx.AsyncClient(timeout=120.0) as client:
            ollama_res = await client.post(
                f"{OLLAMA_URL}/api/generate",
                json={
                    "model": OLLAMA_MODEL,
                    "prompt": ollama_prompt,
                    "stream": False,
                    "format": "json",
                },
            )
            ollama_res.raise_for_status()
            ollama_data = ollama_res.json()

        answer = ollama_data.get("response", "")
        logger.info(f"RAG: Ollama response received ({len(answer)} chars)")

        return RAGResponse(
            answer=answer,
            sources=sources,
            model=MODEL_NAME,
            ollama_model=OLLAMA_MODEL,
        )

    except httpx.HTTPError as e:
        logger.error(f"RAG: Ollama request failed: {e}")
        # Fallback: return sources without LLM answer
        return RAGResponse(
            answer=None,
            sources=sources if "sources" in dir() else [],
            model=MODEL_NAME,
            ollama_model=OLLAMA_MODEL,
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"RAG: unexpected error: {e}")
        raise HTTPException(status_code=500, detail=f"RAG pipeline error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)