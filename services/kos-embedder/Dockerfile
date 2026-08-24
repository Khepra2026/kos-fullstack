FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir \
    sentence-transformers \
    pgvector \
    psycopg2-binary \
    fastapi \
    uvicorn \
    httpx \
    python-dotenv

COPY app.py .

EXPOSE 8001

ENV EMBEDDING_MODEL=all-MiniLM-L6-v2
ENV OLLAMA_URL=http://ollama:11434
ENV OLLAMA_MODEL=mistral:7b-instruct-q5_K_M
ENV RAG_TOP_K=5

HEALTHCHECK --interval=30s --timeout=10s --retries=5 \
    CMD python -c "import httpx; httpx.get('http://localhost:8001/health')" || exit 1

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8001"]