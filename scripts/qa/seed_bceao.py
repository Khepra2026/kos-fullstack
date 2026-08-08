import os
from supabase import create_client
from dotenv import load_dotenv
load_dotenv('.env.local')
url=os.getenv('NEXT_PUBLIC_SUPABASE_URL') or os.getenv('SUPABASE_URL')
# Votre .env.local a SERVICE_ROLE_KEY pas SERVICE_KEY
key=os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('SUPABASE_SERVICE_KEY') or os.getenv('SUPABASE_ANON_KEY') or os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
print(f"URL: {url[:30]}... KEY: {key[:20]}...")
sb=create_client(url, key)
docs=[
  {"source":"BCEAO Instruction 001-01-2010","title":"Lutte Blanchiment","content":"Directive BCEAO 001-01-2010 lutte blanchiment capitaux UEMOA. Vigilance, declaration soupcon, conservation 10 ans.","evidence_id":"EV-BCEAO-001"},
  {"source":"BCEAO Avis 001-2024","title":"Systemes Paiement","content":"Avis BCEAO 001-2024 systemes paiement UEMOA. Agrement PSP, fonds propres, protection consommateurs.","evidence_id":"EV-BCEAO-002"},
  {"source":"UEMOA Reglement 15/2002","title":"SYSCOA","content":"Reglement UEMOA 15/2002 SYSCOA OHADA. Principes comptables, etats financiers, audit BigFour.","evidence_id":"EV-UEMOA-015"},
  {"source":"BCEAO Circulaire 002-2023","title":"KYC UEMOA","content":"Circulaire BCEAO 002-2023 KYC. Beneficiaire effectif, PEP, scoring risque, surveillance >1M FCFA. KYC","evidence_id":"EV-BCEAO-KYC"},
  {"source":"UEMOA Directive 07/2002","title":"LBC-FT","content":"Directive UEMOA 07/2002 LBC-FT. Gel avoirs, CENTIF, sanctions. Blanchiment","evidence_id":"EV-UEMOA-LBC"}
]
for d in docs:
    sb.table('kos_documents').upsert(d, on_conflict='evidence_id').execute()
    print(f"OK {d['evidence_id']}")
print("SEED DONE")
