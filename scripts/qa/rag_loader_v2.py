import os, glob
from openai import OpenAI
from supabase import create_client
SUPABASE_URL=os.getenv('SUPABASE_URL')
SUPABASE_KEY=os.getenv('SUPABASE_SERVICE_KEY')
OPENAI_KEY=os.getenv('OPENAI_API_KEY')
client=OpenAI(api_key=OPENAI_KEY)
sb=create_client(SUPABASE_URL, SUPABASE_KEY)
files=[]
for ext in ["*.pdf","*.md","*.txt","*.json"]:
    files+=glob.glob(f"data/raw/**/*{ext}", recursive=True)
    files+=glob.glob(f"data/**/*{ext}", recursive=True)
files=list(set(files))[:100]
print(f"Found {len(files)} files")
for fp in files:
    try:
        if os.path.isdir(fp): continue
        text=open(fp, encoding='utf-8', errors='ignore').read()[:6000]
        if len(text)<100: continue
        emb=client.embeddings.create(model='text-embedding-3-small', input=text).data[0].embedding
        sb.table('kos_documents').insert({'source':fp,'title':os.path.basename(fp),'content':text,'embedding':emb,'evidence_id':f'EV-{os.path.basename(fp)[:8]}'}).execute()
        print(f'OK {fp}')
    except Exception as e:
        print(f'FAIL {fp} {e}')
print('DONE')
