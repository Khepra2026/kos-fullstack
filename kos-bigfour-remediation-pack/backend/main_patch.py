
# PATCH to integrate all middlewares in your FastAPI main.py
# Add to backend/ai/main.py

from fastapi import FastAPI
from backend.ai.health_probes import router as health_router
from backend.ai.security_middleware import SecurityHeadersMiddleware, RateLimitMiddleware
from backend.ai.observability import RequestIDMiddleware
from backend.ai.cost_guard import cost_guard

app = FastAPI(title="KOS RegTech AI - Hardened")
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(RateLimitMiddleware)
app.add_middleware(RequestIDMiddleware)
app.include_router(health_router)

# Example RAG endpoint with guards
from backend.ai.rag_guardrails import sanitize_document_for_rag, validate_grounding, enforce_abstention, PROMPT_TEMPLATE, build_provenance_chain

@app.post("/api/rag/query")
@cost_guard
async def rag_query(query: str, top_k: int=5, user_id: str="anon"):
    # retrieval logic here
    chunks = [] # replace with vector search
    if enforce_abstention(query, chunks):
        return {"answer":"Information insuffisante - aucune source réglementaire fiable trouvée. Provenance requise.","citations":[],"provenance":[]}
    # build answer...
    answer = "Example grounded answer [doc:chunk]"
    ok, score = validate_grounding(answer, chunks)
    if not ok:
        return {"answer":"Information insuffisante - preuve insuffisante.","citations":[],"score":score}
    return {"answer":answer,"citations":chunks,"provenance":[build_provenance_chain(c) for c in chunks]}
