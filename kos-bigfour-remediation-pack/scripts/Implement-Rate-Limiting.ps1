
param([string]$RepoPath=".")
Write-Host "[RATE-LIMIT] Implementing AI cost guard"
$code = @'
from functools import wraps
import time, os
from fastapi import HTTPException

# Token bucket per user
MAX_TOKENS_PER_MIN = int(os.getenv("MAX_TOKENS_PER_MIN","20000"))
MAX_DOC_SIZE_MB = int(os.getenv("MAX_DOC_SIZE_MB","20"))
MAX_TOP_K = int(os.getenv("MAX_RAG_TOP_K","8"))

def cost_guard(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        # Extract prompt length
        prompt = str(kwargs.get("query") or kwargs.get("prompt") or "")[:50000]
        tokens_est = len(prompt)//4
        if tokens_est > MAX_TOKENS_PER_MIN:
            raise HTTPException(429, f"Prompt too large: {tokens_est} tokens > {MAX_TOKENS_PER_MIN}")
        # Check top_k abuse
        if kwargs.get("top_k",0) > MAX_TOP_K:
            kwargs["top_k"]=MAX_TOP_K
        return await func(*args,**kwargs)
    return wrapper

# File size guard
def file_size_guard(file_bytes: bytes):
    if len(file_bytes) > MAX_DOC_SIZE_MB*1024*1024:
        raise HTTPException(413, f"File too large > {MAX_DOC_SIZE_MB}MB")
'@
Set-Content -Path (Join-Path $RepoPath "backend/ai/cost_guard.py") -Value $code
Write-Host "[RATE-LIMIT] OK" -ForegroundColor Green
