from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/rag", tags=["RAG BCEAO/UEMOA"])

class Query(BaseModel):
    question: str
    tenant_id: str = "default"

@router.post("/query")
async def rag_query(q: Query):
    # TODO: ChromaDB + embeddings
    # Pour l'instant fallback RAG Loader
    return {
        "question": q.question,
        "answer": f"[KOS RAG Mock] Réponse BCEAO/UEMOA pour: {q.question}",
        "sources": ["data/raw/bceao/"],
        "gateway": "BigFour-Compliant-v2",
        "hsts": "max-age=63072000; includeSubDomains; preload"
    }

@router.get("/health")
async def rag_health():
    return {"status": "ok", "rag": "bceao-uemoa", "chunks": 0}
