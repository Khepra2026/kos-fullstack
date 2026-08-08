# Ajoutez ceci dans votre backend/app/main.py ou backend/app/api/main.py :

from fastapi import FastAPI
from app.rag.router import router as rag_router  # ou from backend.app.rag...

app = FastAPI(title="KHEpra Regtech API")

app.include_router(rag_router)

# Pour autoriser POST + GET (évite 404 sur navigateur)
# Dans rag/router.py, ajoutez aussi:

@router.get("/query")
async def rag_query_get(question: str = "Test BCEAO"):
    return await rag_query(Query(question=question))

# Et pour vercel.json:
# {
#   "rewrites": [{ "source": "/(.*)", "destination": "/api/main.py" }]
# }
