# KOS RAG Pipeline - Dataset BCEAO/UEMOA
from pathlib import Path
print("=== KOS RAG Loader ===")
# TODO: Charger datasets UEMOA
# - bceao_reglementation.pdf
# - uemoa_directives.json
# - bdf_conformite/
print("Chargement datasets locaux...")
for p in Path("data").rglob("*"):
    print(p)
