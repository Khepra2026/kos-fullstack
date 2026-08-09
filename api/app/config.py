import os
from pydantic_settings import BaseSettings
class Settings(BaseSettings):
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", os.getenv("NEXT_PUBLIC_SUPABASE_URL", ""))
    SUPABASE_KEY: str = os.getenv("SUPABASE_SERVICE_KEY", os.getenv("SUPABASE_SERVICE_ROLE_KEY", ""))
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    EMBEDDING_MODEL: str = "intfloat/multilingual-e5-small"
    EMBEDDING_DIM: int = 384
    ENV: str = os.getenv("PYTHON_ENV", "development")
    MODEL_VERSION: str = "kos-brain-v0.4.0-e5-oss"
settings = Settings()
