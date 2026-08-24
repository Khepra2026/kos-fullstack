from pydantic import BaseModel, Field
from typing import List
class Citation(BaseModel):
    source_id: str
    page: int
    chunk_id: str
    score: float
    excerpt: str
class RAGAnswer(BaseModel):
    answer: str
    citations: List[Citation]
    confidence: float
    grounding_status: str = Field(description='GROUNDED | PREUVE_INSUFFISANTE')
THRESHOLD = 0.72
def fail_closed_retrieval(query: str, tenant_id: str, embeddings_client, db):
    if not getattr(embeddings_client, 'api_key', None):
        raise RuntimeError('EMBEDDING_KEY_MISSING_FAIL_CLOSED')
    return None
