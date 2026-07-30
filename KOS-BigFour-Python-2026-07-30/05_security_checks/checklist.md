# Checks securite a automatiser
- [ ] MFA obligatoire sur tous les comptes admin
- [ ] Secrets dans Vault / .env chiffre (jamais en clair)
- [ ] TLS 1.3 only + HSTS
- [ ] SBOM genere a chaque build (cyclonedx / syft)
- [ ] Dependency scan (pip-audit)
- [ ] Pas d'API externe en production (assert)

Run:
pip install pip-audit
pip-audit -r requirements.txt
