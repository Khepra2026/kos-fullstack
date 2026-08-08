import os, requests, time
from pathlib import Path
base="data/raw/global_regulators"
Path(base).mkdir(parents=True, exist_ok=True)

# URLs vérifiées 2024-2025 (direct PDF, pas de 403)
urls=[
 # BIS - OK
 ("https://www.bis.org/publ/bcbs189.pdf", "bis_bcbs/Basel_III_EN.pdf"),
 ("https://www.bis.org/publ/bcbs157.pdf", "bis_bcbs/Basel_II_Comprehensive_EN.pdf"),
 # IMF / World Bank - direct docs
 ("https://www.bis.org/publ/bcbs128.pdf", "bis_bcbs/Basel_II_Pillar3_EN.pdf"),
 # FATF via api - utilise alternative FATF public (github mirror)
 ("https://www.fatf-gafi.org/media/fatf/documents/recommendations/pdfs/FATF%20Recommendations%202012.pdf", "fatf_gafi/FATF_40_Recommendations_2012_EN.pdf"),
 # FSB - direct
 ("https://www.fsb.org/wp-content/uploads/r_140722.pdf", "fsb/FSB_Financial_Reforms.pdf"),
]

headers={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) KOS-RegTech/2.0"}
ok=0
for url, rel in urls:
  fp=os.path.join(base, rel)
  if os.path.exists(fp) and os.path.getsize(fp)>10000:
    print(f"EXISTS {rel}"); ok+=1; continue
  try:
    r=requests.get(url, headers=headers, timeout=45, allow_redirects=True)
    ctype=r.headers.get('content-type','')
    if r.status_code==200 and len(r.content)>10000 and 'pdf' in ctype.lower() or r.content[:4]==b'%PDF':
      Path(fp).parent.mkdir(parents=True, exist_ok=True)
      open(fp,'wb').write(r.content)
      print(f"OK {rel} {len(r.content)//1024}KB"); ok+=1
    else:
      print(f"FAIL {rel} {r.status_code} {ctype} {len(r.content)}")
  except Exception as e:
    print(f"ERR {rel} {e}")
  time.sleep(1)
print(f"DONE {ok}/{len(urls)}")
