import os
from pathlib import Path
from dotenv import load_dotenv
load_dotenv(dotenv_path=Path(".env.local"), override=True)
from supabase import create_client
import glob
url=os.getenv('NEXT_PUBLIC_SUPABASE_URL') or os.getenv('SUPABASE_URL')
key=os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('SUPABASE_SERVICE_KEY')
print(f"URL={url[:40]} KEY_LEN={len(key) if key else 0}")
sb=create_client(url, key)

import pymupdf
files=glob.glob("data/raw/**/*.pdf", recursive=True)
print(f"PDFs: {len(files)}")
cnt=0
for fp in files:
  try:
    doc=pymupdf.open(fp)
    txt="".join([p.get_text() for p in doc[:10]])[:12000]
    if len(txt)<500: continue
    for i in range(0, len(txt), 2500):
      ch=txt[i:i+2500]
      if len(ch)<300: continue
      sb.table('kos_documents').insert({
        'source': fp.replace("\\","/"),
        'title': Path(fp).name,
        'content': ch,
        'evidence_id': f'EV-BIS-{cnt:05d}',
        'metadata': {'regulator':'BIS_BCBS','lang':'fr/en'}
      }).execute()
      cnt+=1
    print(f"OK {Path(fp).name} -> {cnt}")
  except Exception as e:
    print(f"FAIL {fp} {e}")
print(f"TOTAL INGESTED {cnt}")
