# scripts/qa/rag_loader_v2.py - ingest data/raw/bceao/ -> Supabase
import os, glob, json
from openai import OpenAI
from supabase import create_client

SUPABASE_URL=os.getenv('SUPABASE_URL')
SUPABASE_KEY=os.getenv('SUPABASE_SERVICE_KEY')
OPENAI_KEY=os.getenv('OPENAI_API_KEY')

client = OpenAI(api_key=OPENAI_KEY)
sb = create_client(SUPABASE_URL, SUPABASE_KEY)

files = glob.glob('data/raw/bceao/*') + glob.glob('data/**/*.pdf') + glob.glob('data/**/*.md')
for fp in files[:50]:
    try:
        text = open(fp, encoding='utf-8', errors='ignore').read()[:4000]
        if len(text)<50: continue
        emb = client.embeddings.create(model='text-embedding-3-small', input=text).data[0].embedding
        sb.table('kos_documents').insert({
          'source': fp,
          'title': os.path.basename(fp),
          'content': text,
          'embedding': emb,
          'evidence_id': f'EV-{os.path.basename(fp)[:8]}',
          'metadata': {'file': fp}
        }).execute()
        print(f'✅ {fp}')
    except Exception as e:
        print(f'❌ {fp} {e}')
print('DONE')
