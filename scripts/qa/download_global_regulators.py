import os, requests, time
from pathlib import Path

base="data/raw/global_regulators"
cats={
 "bceao_uemoa": f"{base}/bceao_uemoa",
 "beac_cemac": f"{base}/beac_cemac",
 "ohada": f"{base}/ohada",
 "fatf_gafi": f"{base}/fatf_gafi",
 "bis_bcbs": f"{base}/bis_bcbs",
 "iosco_iais": f"{base}/iosco_iais",
 "imf_worldbank": f"{base}/imf_worldbank",
 "oecd": f"{base}/oecd",
 "ecb_fed_boe": f"{base}/ecb_fed_boe",
 "fsb": f"{base}/fsb"
}
for p in cats.values(): Path(p).mkdir(parents=True, exist_ok=True)

# Registre global - tous publics
registry=[
 # --- BCEAO/UEMOA complémentaires ---
 ("https://www.bceao.int/sites/default/files/2017-11/Dispositif%20prudentiel%20applicable%20aux%20banques.pdf", "bceao_uemoa/Dispositif_Prudenciel_BCEAO.pdf"),
 ("https://www.bceao.int/sites/default/files/2020-01/Instruction%20n%C2%B0005-06-2016%20relative%20au%20gouvernement%20d%27entreprise.pdf", "bceao_uemoa/Gouvernance_Entreprise_2016.pdf"),

 # --- BEAC/CEMAC ---
 ("https://www.beac.int/wp-content/uploads/2021/06/Reglement-CEMAC-01-17-relatif-aux-services-de-paiement.pdf", "beac_cemac/Reglement_CEMAC_Paiement.pdf"),
 ("https://www.beac.int/wp-content/uploads/2020/10/Reglement-02-18-CEMAC-UMAC-CM-relatif-a-la-reglementation-des-changes.pdf", "beac_cemac/Reglement_Changes_CEMAC.pdf"),

 # --- FATF/GAFI - LBC/FT ---
 ("https://www.fatf-gafi.org/content/dam/fatf-gafi/translations/40%20Recommandations.pdf", "fatf_gafi/40_Recommandations_FATF_FR.pdf"),
 ("https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Guidance-PEP-FR.pdf", "fatf_gafi/Guidance_PEP.pdf"),
 ("https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Methode-evaluation-conformite-technique-et-efficacite.pdf", "fatf_gafi/Methodologie_Evaluation.pdf"),

 # --- BIS / BCBS Bâle ---
 ("https://www.bis.org/publ/bcbs189_fr.pdf", "bis_bcbs/Bale_III_Cadre_Reglementaire.pdf"),
 ("https://www.bis.org/publ/bcbs144_fr.pdf", "bis_bcbs/Bale_II_Pilier2.pdf"),
 ("https://www.bis.org/publ/bcbs128fre.pdf", "bis_bcbs/Bale_II_Pilier3.pdf"),
 ("https://www.bis.org/publ/bcbs230_fr.pdf", "bis_bcbs/Principes_Controle_Interne.pdf"),

 # --- FSB ---
 ("https://www.fsb.org/wp-content/uploads/FSB-Principles-for-Effective-Risk-Data-Aggregation.pdf", "fsb/FSB_Risk_Data_Aggregation.pdf"),

 # --- IOSCO / IAIS ---
 ("https://www.iosco.org/library/pubdocs/pdf/IOSCOPD154_French.pdf", "iosco_iais/IOSCO_Principes_Reglementation.pdf"),

 # --- IMF / Banque Mondiale ---
 ("https://www.imf.org/external/pubs/ft/fandd/fre/2020/03/pdf/imf-lending-facilities.pdf", "imf_worldbank/IMF_Lending_Facilities_FR.pdf"),
 ("https://thedocs.worldbank.org/en/doc/6d19fb59c7f7517350d7b4c5b64d4d37-0430012022/related/World-Bank-Group-Strategy-Fragility-FR.pdf", "imf_worldbank/WB_Strategie_Fragilite.pdf"),

 # --- OCDE ---
 ("https://www.oecd.org/fr/finance/Principes-de-l-OCDE-sur-le-gouvernement-d-entreprise-2004.pdf", "oecd/OCDE_Gouvernement_Entreprise.pdf"),
 ("https://www.oecd.org/daf/anti-bribery/ConvCombatBribery_FR.pdf", "oecd/Convention_Anti_Corruption.pdf"),

 # --- ECB ---
 ("https://www.ecb.europa.eu/pub/pdf/other/ecbguide_supervisory_joint_standards.fr.pdf", "ecb_fed_boe/ECB_Guide_Supervision.pdf"),
 ("https://www.ecb.europa.eu/pub/pdf/other/ecb.eurosystemcollateralframework.fr.pdf", "ecb_fed_boe/ECB_Cadre_Garanties.pdf"),
]

headers={"User-Agent":"KOS-RegTech-Global-Compliance/2.0 (BCEAO+UEMOA+CEMAC+OHADA+FATF+BIS+IMF)"}
ok=fail=0
for url, rel in registry:
  fp=os.path.join(base, rel)
  if os.path.exists(fp) and os.path.getsize(fp)>5000:
    print(f"EXISTS {rel}"); ok+=1; continue
  try:
    r=requests.get(url, headers=headers, timeout=40)
    if r.status_code==200 and len(r.content)>5000 and b"<html" not in r.content[:200]:
      open(fp,'wb').write(r.content)
      print(f"OK {rel} {len(r.content)//1024}KB"); ok+=1
    else:
      print(f"FAIL {rel} HTTP {r.status_code} len {len(r.content)}"); fail+=1
  except Exception as e:
    print(f"ERR {rel} {e}"); fail+=1
  time.sleep(1)

print(f"\n=== GLOBAL REGISTRY {ok} OK / {fail} FAIL ===")
