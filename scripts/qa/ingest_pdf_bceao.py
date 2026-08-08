import os, glob
from dotenv import load_dotenv
from supabase import create_client
load_dotenv('.env.local')
url=os.getenv('NEXT_PUBLIC_SUPABASE_URL')
key=os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('SUPABASE_SERVICE_KEY')
sb=create_client(url, key)

try:
    import fitz  # pymupdf
except:
    print("pip install pymupdf")
    exit(1)

files=[]
for pat in ["data/raw/**/*.*","data/**/*.*","**/*.pdf"]:
    files+=glob.glob(pat, recursive=True)
files=[f for f in files if os.path.isfile(f) and f.lower().endswith(('.pdf','.txt','.md'))]
print(f"Found {len(files)} potential files")

count=0
for fp in files[:50]:
    try:
        text=""
        if fp.lower().endswith('.pdf'):
            doc=fitz.open(fp)
            for page in doc[:5]:  # 5 premières pages
                text+=page.get_text()[:2000]
        else:
            text=open(fp, encoding='utf-8', errors='ignore').read()[:6000]
        if len(text)<100: continue
        # Chunk en 2k chars
        for i in range(0, len(text), 2000):
            chunk=text[i:i+2000]
            if len(chunk)<100: continue
            sb.table('kos_documents').insert({
                'source': fp,
                'title': f"{os.path.basename(fp)} chunk {i//2000}",
                'content': chunk,
                'evidence_id': f'EV-{os.path.basename(fp)[:5]}-{i//2000}-{count}',
                'metadata': {'file': fp, 'chunk': i//2000}
            }).execute()
            count+=1
            print(f"OK {fp} chunk {i//2000}")
    except Exception as e:
        print(f"FAIL {fp} {e}")

print(f"DONE {count} chunks")
