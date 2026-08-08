# KOS SEC AutoFix - Tourne daily via GitHub Action
# 1. pip-audit -> auto PR si fix dispo
# 2. npm audit fix
# 3. Supabase RLS check -> alerte si Count < total_tables
import subprocess
print("Running pip-audit...")
subprocess.run(["pip-audit","--fix","--requirement","requirements.txt"])
