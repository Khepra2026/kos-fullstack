import os, glob
from pathlib import Path
from dotenv import load_dotenv
load_dotenv(dotenv_path=Path(".env.local"))
load_dotenv()  # fallback .env
from supabase import create_client
url = os.getenv('NEXT_PUBLIC_SUPABASE_URL') or os.getenv('SUPABASE_URL') or "https://pgfwhahiwqvqeahpirjx.supabase.co"
key = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('SUPABASE_SERVICE_KEY') or os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
print(f"URL {url[:35]}... KEY {key[:15]}...")
sb = create_client(url, key)

import fitz
files = glob.glob("data/raw/**/*.pdf", recursive=True)
print(f"Found {len(files)} PDFs")
cnt=0
for fp in files:
  try:
    doc = fitz.open(fp)
    txt = "".join([p.get_text() for p in doc[:10]])[:10000]
    if len(txt)<300:
      print(f"SKIP {fp} len {len(txt)}")
      continue
    for i in range(0, len(txt), 2500):
      ch = txt[i:i+2500]
      if len(ch)<200: continue
      sb.table('kos_documents').insert({
        'source': fp.replace("\\","/"),
        'title': os.path.basename(fp),
        'content': ch,
        'evidence_id': f'EV-BIS-{cnt:04d}',
        'metadata': {'regulator': 'BIS_BCBS', 'type':'basel'}
      }).execute()
      cnt+=1
    print(f"OK {fp} -> total {cnt}")
  except Exception as e:
    print(f"FAIL {fp} {e}")
print(f"TOTAL {cnt} chunks BIS")
