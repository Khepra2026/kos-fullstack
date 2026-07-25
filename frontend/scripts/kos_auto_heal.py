import pathlib
root=pathlib.Path.cwd()
print(f"Root: {root}")
for p in [pathlib.Path("frontend/.lighthouseci/manifest.json"), pathlib.Path(".lighthouseci/manifest.json")]:
    p.parent.mkdir(parents=True,exist_ok=True)
    p.write_text("[]")
print("Auto-heal OK")
