import os, glob
from dotenv import load_dotenv
from supabase import create_client
load_dotenv('.env.local')
sb=create_client(os.getenv('NEXT_PUBLIC_SUPABASE_URL'), os.getenv('SUPABASE_SERVICE_ROLE_KEY'))
import fitz
files=glob.glob("data/raw/**/*.*", recursive=True)
files=[f for f in files if f.lower().endswith(('.pdf'))]
print(f"Ingest {len(files)} PDFs")
cnt=0
for fp in files:
  try:
    doc=fitz.open(fp)
    txt="".join([p.get_text() for p in doc[:8]])[:8000]
    if len(txt)<200: continue
    for i in range(0, len(txt), 2500):
      ch=txt[i:i+2500]
      if len(ch)<150: continue
      sb.table('kos_documents').insert({
        'source': fp.replace("\\","/"),
        'title': os.path.basename(fp),
        'content': ch,
        'evidence_id': f'EV-GLOBAL-{cnt}',
        'metadata': {'regulator': fp.split("/")[2] if "/" in fp else "global", 'type':'official_regulation'}
      }).execute()
      cnt+=1
    print(f"OK {fp} -> {cnt}")
  except Exception as e:
    print(f"FAIL {fp} {e}")
print(f"TOTAL {cnt} chunks")
