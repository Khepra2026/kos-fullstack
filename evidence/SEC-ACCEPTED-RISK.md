# Accepted Risk - J0-J10 SEC-002

## Vulnérabilités sans correctif éditeur au 08/08/2026

1. ecdsa 0.19.2 PYSEC-2026-1325
   - Mitigation: Remplacé par cryptography 50.0.0 pour toutes les opérations critiques. ecdsa conservé uniquement comme dépendance transitive de chromadb.
   - Action: Surveillance Snyk hebdo

2. ragas 0.4.3 PYSEC-2026-3046
   - Mitigation: Utilisé uniquement en offline eval, pas en prod runtime. Pas d'exposition réseau.
   - Action: Upgrade vers 0.4.6 dès dispo (nécessite C++ Build Tools)

## Conclusion: 0 vulnérabilité critique exploitable en prod -> GO
