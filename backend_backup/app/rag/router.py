from fastapi import APIRouter, Query as Q
from pydantic import BaseModel

router = APIRouter(prefix="/rag", tags=["RAG BCEAO/UEMOA"])

class QueryBody(BaseModel):
    question: str
    tenant_id: str = "default"

@router.post("/query")
async def rag_query_post(body: QueryBody):
    return {
        "question": body.question,
        "answer": f"[KOS RAG Mock] Réponse BCEAO/UEMOA pour: {body.question}",
        "sources": ["data/raw/bceao/"],
        "gateway": "BigFour-Compliant-v2",
        "status": "ok"
    }

@router.get("/query")
async def rag_query_get(question: str = Q("Qu'est-ce que la directive BCEAO?")):
    # Fix 404 pour ouverture directe dans navigateur
    return await rag_query_post(QueryBody(question=question))

@router.get("/health")
async def rag_health():
    return {"status": "ok", "rag": "bceao-uemoa", "endpoints": ["/rag/query GET+POST", "/rag/health"]}
