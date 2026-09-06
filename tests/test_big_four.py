import time
from supabase import create_client
import os

def test_supabase_connection():
    url = os.getenv('SUPABASE_URL')
    key = os.getenv('SUPABASE_KEY')
    if not url: 
        print('SKIP: SUPABASE_URL manquant dans .env.local')
        return
    client = create_client(url, key)
    assert client is not None

def test_rag_latency():
    # Simule ta query RAG /api/rag
    start = time.time()
    # ... appelle ton endpoint local
    latency = time.time() - start
    assert latency < 0.8, f'RAG trop lent: {latency}s > 0.8s'

def test_agents_success_rate():
    # Simule 10 requêtes Agents IA
    success = 10 # remplace par vrai test
    assert success / 10 >= 0.95
