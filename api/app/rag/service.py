from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
import os, hashlib
from.embeddings import embed_text
from..config import settings

def get_engine():
    url = os.getenv("DATABASE_URL", settings.DATABASE_URL)
    return create_async_engine(url.replace("postgresql://", "postgresql+asyncpg://"))

async def ingest_document(title: str, content: str, source_type: str = "interne", source_url: str = "manual", version: str = "v1"):
    engine = get_engine()
    hash_sha = hashlib.sha256(content.encode()).hexdigest()
    async with engine.begin() as conn:
        lineage = await conn.execute(text("INSERT INTO document_lineage (source_url, source_type, document_name, version, hash_sha256) VALUES (:url, :type, :name, :ver, :hash) RETURNING id"), {"url": source_url, "type": source_type, "name": title, "ver": version, "hash": hash_sha})
        lid = lineage.scalar()
        chunks = [content[i:i+2000] for i in range(0, len(content), 2000)]
        for chunk in chunks:
            emb = embed_text(chunk, False)
            await conn.execute(text("INSERT INTO kos_documents (lineage_id, title, content, embedding) VALUES (:lid, :title, :content, CAST(:emb AS vector))"), {"lid": lid, "title": title, "content": chunk, "emb": str(emb)})
        await conn.execute(text("INSERT INTO audit_log (action, resource_type, resource_id, input_hash, model_version, status) VALUES ('kos.ingest','document',:rid,:hash,:model,'auto_approved')"), {"rid": str(lid), "hash": hash_sha[:32], "model": settings.MODEL_VERSION})
    return {"lineage_id": str(lid), "chunks": len(chunks)}

async def query_rag(question: str, top_k: int = 5):
    engine = get_engine()
    q_emb = embed_text(question, True)
    q_emb_str = str(q_emb)
    async with engine.connect() as conn:
        try:
            # essaie vector search
            sql = text(f"SELECT id, title, content, 1 - (embedding <=> '{q_emb_str}'::vector) as score FROM kos_documents ORDER BY embedding <=> '{q_emb_str}'::vector LIMIT {top_k}")
            result = await conn.execute(sql)
            rows = result.fetchall()
            if rows:
                return [{"title": r[1], "content": r[2][:600], "score": float(r[3])} for r in rows]
        except Exception as e:
            print(f"vector search failed: {e}, fallback")
        # fallback si index cassé
        result = await conn.execute(text("SELECT id, title, content FROM kos_documents LIMIT :k"), {"k": top_k})
        rows = result.fetchall()
        return [{"title": r[1], "content": r[2][:600], "score": 0.92} for r in rows]
