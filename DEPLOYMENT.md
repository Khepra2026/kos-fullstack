# KOS Big Four — Guide Opérationnel Déploiement
# Document : DEPLOYMENT.md
# Date : 2026-07-05
# ============================================================

## Workflow de déploiement (5 étapes)

### 1. Déploiement initial production
```bash
make deploy ENV=prod
```
Effectue :
- Build Docker images
- Push migrations Supabase (incluant RLS)
- Pull modèle `kos-bigfour` dans Ollama
- Lancement stack services
- Health check automatique

### 2. Retrain KOS chaque nuit (02:00)
```bash
make install-cron
```
Installe automatiquement dans crontab :
```
0 2 * * * cd /chemin/projet && make retrain-kos
```
Pour supprimer le cron :
```bash
make uninstall-cron
```

### 3. Audit sécurité avant Comité
```bash
make audit-security
```
Vérifie :
- CVE containers (Trivy)
- RLS Supabase (tests/rls.sql)
- 0 API externe (OpenAI)
- Headers sécurité
- Security log vide 24h

### 4. Health check temps réel
```bash
make health-check
```
Vérifie :
- KOS Embedder UP (`/health`)
- RAG répond (`/rag`)
- GSC, LCP, SLA (si configurés)

### 5. Seed 10k documents réglementaires
```bash
make seed-all
```
Seeds :
- 200 circulaires BCEAO
- 150 règlements COBAC
- 80 actes OHADA
- 10k appels d'offres
- Embed automatique pgvector

## Commandes utilitaires

| Commande | Description |
|----------|-------------|
| `make status` | État rapide : conteneurs, modèles, DB |
| `make backup` | Backup PG + Ollama + push S3 |
| `make clean` | Destroy volumes DEV uniquement |
| `make help` | Liste toutes les commandes |

## Prérequis

- Docker + Docker Compose
- Supabase CLI (`supabase`)
- psql (PostgreSQL client)
- Ollama (inclus dans docker-compose)
- Variables `.env` : `DATABASE_URL`, `SUPABASE_REF`, `SLACK_WEBHOOK`

## Sécurité

Les tests RLS `tests/rls.sql` valident :
1. `anon` ne peut PAS écrire `kb_docs`
2. `authenticated` ne peut PAS modifier `kos_agents`
3. `service_role` peut tout lire
4. `authenticated` peut lire `kb_docs` (read-only)
5. `anon` ne peut PAS lire `kos_agents`

⚠️ La migration `supabase/migrations/20260705_rls_kb_docs_kos_agents.sql`
doit être poussée manuellement via `supabase db push --include-all`
car les opérations DDL sont bloquées par l'exécuteur SQL.