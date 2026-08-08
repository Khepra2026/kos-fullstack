import os, glob
from supabase import create_client
from dotenv import load_dotenv
load_dotenv('.env.local')
sb = create_client(os.getenv('SUPABASE_URL') or os.getenv('NEXT_PUBLIC_SUPABASE_URL'), os.getenv('SUPABASE_SERVICE_KEY'))
files=[]
for pat in ["data/raw/**/*","data/**/*"]:
    files+=glob.glob(pat, recursive=True)
files=[f for f in files if os.path.isfile(f) and f.endswith(('.md','.txt','.pdf','.json'))][:100]
print(f"Found {len(files)} files")
for fp in files:
    try:
        txt=open(fp, encoding='utf-8', errors='ignore').read()[:6000]
        if len(txt)<50: continue
        sb.table('kos_documents').insert({'source':fp,'title':os.path.basename(fp),'content':txt,'evidence_id':f'EV-{os.path.basename(fp)[:8]}'}).execute()
        print(f'OK {fp}')
    except Exception as e:
        print(f'FAIL {fp} {e}')
print('DONE')
