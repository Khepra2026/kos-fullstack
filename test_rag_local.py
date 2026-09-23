import dotenv
from dotenv import load_dotenv
load_dotenv('.env.local')
import os
from supabase import create_client
from sentence_transformers import SentenceTransformer

supabase = create_client(os.getenv('NEXT_PUBLIC_SUPABASE_URL'), os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY'))
model = SentenceTransformer('BAAI/bge-m3')

q = "COBAC fonds propres réglementation"
emb = model.encode(q).tolist()

res = supabase.rpc("match_kb_docs", {"query_embedding": emb, "match_threshold": 0.0, "match_count": 5}).execute()
print(f"Trouvé {len(res.data)} docs pour '{q}':")
for d in res.data:
    print(f"{d['similarity']:.4f} | {d.get('title')} | {d.get('regulator')}")
