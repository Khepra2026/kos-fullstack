import sys
import os
import importlib.util

REQUIRED_PACKAGES = [
    "fastapi",
    "uvicorn",
    "sqlalchemy",
    "pydantic",
    "httpx",
    "asyncpg",
    "duckdb",
    "langchain",
    "psutil"
]

def check_python_environment():
    print("=== 1. DIAGNOSTIC DE L'ENVIRONNEMENT PYTHON ===")
    print(f"Interpréteur actif : {sys.executable}")
    print(f"Version de Python  : {sys.version.split()[0]}")
    if "conda" in sys.executable.lower() or "anaconda" in sys.executable.lower():
        print("[OK] Exécutable Python hébergé dans Anaconda/Conda.")
    else:
        print("[ATTENTION] L'interpréteur actif ne provient pas de l'environnement Conda attendu.")
    print("-" * 50)

def check_dependencies():
    print("=== 2. VERIFICATION DES DEPENDANCES (KOS STACK) ===")
    missing = []
    for package in REQUIRED_PACKAGES:
        spec = importlib.util.find_spec(package)
        if spec is None:
            print(f"[MANQUANT] {package}")
            missing.append(package)
        else:
            print(f"[INSTALLE] {package}")
    if missing:
        print(f"\n-> Action recommandée : Exécuter 'pip install {' '.join(missing)}'")
    else:
        print("\n[OK] Toutes les dépendances critiques sont présentes.")
    print("-" * 50)

def check_orchestrator():
    print("=== 3. VERIFICATION DE L'ORCHESTRATEUR PRINCIPAL ===")
    orchestrator_path = os.path.join("backend", "main.py")
    if os.path.exists(orchestrator_path):
        print(f"[TROUVE] Fichier '{orchestrator_path}' détecté.")
        try:
            with open(orchestrator_path, "r", encoding="utf-8") as f:
                code = f.read()
            compile(code, orchestrator_path, 'exec')
            print("[OK] La syntaxe de l'orchestrateur est valide.")
        except Exception as e:
            print(f"[ERREUR DE SYNTAXE] : {e}")
    else:
        print(f"[ATTENTION] Aucun fichier '{orchestrator_path}' trouvé.")
    print("-" * 50)

if __name__ == "__main__":
    print("Lancement de l'audit automatique du stack KOS...\n")
    check_python_environment()
    check_dependencies()
    check_orchestrator()
    print("Audit terminé.")
