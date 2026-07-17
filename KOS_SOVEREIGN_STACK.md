# ═══════════════════════════════════════════════════════════════
# KOS SOVEREIGN STACK — Architecture Technique Complète
# KHEPRA EXPERTS — Big Four Architecture
# Version 1.0 — 25 Juin 2026
# ═══════════════════════════════════════════════════════════════

---

## ARCHITECTURE 5 COUCHES — KOS SOVEREIGN STACK

```
                        ┌──────────────────────────────────────┐
                        │       API GATEWAY KOS (Nginx)       │
                        │   routing + auth + policy + obs     │
                        │         Port 8000 / 8443            │
                        └────────────────┬─────────────────────┘
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        │                                │                                 │
┌───────▼──────────┐          ┌──────────▼─────────┐          ┌──────────▼──────────┐
│   n8n CORE       │          │   MICROSERVICES     │          │   VECTOR ENGINE     │
│   orchestration  │          │   (Docker cluster)  │          │   QDRANT LOCAL      │
│   Port 5678      │          │                     │          │   Port 6333         │
│                  │          │  ingestion-service  │          │                     │
│   Workflows:     │          │  transform-service  │          │   legal_vectors     │
│   - ingestion    │          │  audit-service      │          │   business_vectors  │
│   - compliance   │          │  queue-worker       │          │   compliance_v.     │
│   - alerting     │          │                     │          │   knowledge_v.      │
│   - ETL sync     │          │  + PostgreSQL 17    │          │   audit_vectors     │
│   - self-healing │          │  + Redis 7.4        │          │                     │
│                  │          │  + MinIO S3         │          │   pgvector local    │
└───────┬──────────┘          └──────────┬─────────┘          └──────────┬──────────┘
        │                                │                                │
        └────────────────┬───────────────┴────────────────┬───────────────┘
                         │                                │
                ┌────────▼──────────┐          ┌──────────▼──────────┐
                │  DATA LAKE KOS    │          │  SUPABASE REGISTRY  │
                │ (source of truth) │          │ (governance only)   │
                │                   │          │                     │
                │ RAW → CLEAN →     │          │ ~60 tables CORE     │
                │ GOVERNED → AUDIT  │          │ regulations         │
                │ → EXPORT          │          │ audit_logs          │
                │                   │          │ compliance_records  │
                │ Parquet + JSONL   │          │ governance_metadata  │
                │ + Avro + SQL      │          │ RBAC/ABAC           │
                └───────────────────┘          └─────────────────────┘
```

---

## COUCHE 1 — DOCKER CLUSTER (Core Execution Engine)

### Services

| Service | Rôle | Port | Réplicas | Criticité |
|---------|------|------|----------|-----------|
| **api-gateway** (Nginx) | Point d'entrée unique, routing intelligent | 8000/8443 | 1 | AAAA |
| **n8n** | Orchestration brain, 15+ workflows | 5678 | 1 | AAAA |
| **qdrant** | Vector intelligence, 5 collections | 6333/6334 | 1 | AAAA |
| **postgres** | Analytical mirror + pgvector | 5433 | 1 | AAA |
| **redis** | Event queue + caching | 6380 | 1 | AAA |
| **minio** | Object storage local S3 | 9000/9001 | 1 | AAA |
| **ingestion-service** | Acquisition données réglementaires | — | 2 | AAA |
| **transform-service** | Validation & normalisation | — | 2 | AAA |
| **audit-service** | Traçabilité & compliance | — | 1 | AAAA |
| **queue-worker** | Traitement asynchrone générique | — | 3 | AA |

### Déploiement

```bash
# Bootstrap complet
docker compose up -d

# Vérification santé
docker compose ps
docker compose logs -f api-gateway

# Scale manuel
docker compose up -d --scale ingestion-service=4 --scale queue-worker=6
```

---

## COUCHE 2 — QDRANT (Vector Intelligence Layer)

### Collections

| Collection | Vecteurs | Dimension | Métrique | Usage |
|-----------|----------|-----------|----------|-------|
| `legal_vectors` | Textes réglementaires BCEAO/COBAC/OHADA | 1536 | Cosine | Search juridique |
| `business_vectors` | Analyses, rapports, études | 1536 | Cosine | Intelligence business |
| `compliance_vectors` | Contrôles, audits, certifications | 1536 | Cosine | Vérification conformité |
| `knowledge_vectors` | Leçons apprises, best practices | 1536 | Cosine | Capitalisation |
| `audit_vectors` | Traces d'audit, logs structurés | 1536 | Cosine | Forensics |

### Pipeline Vectoriel

```
Data Ingestion → Chunking (512 tokens) → Embedding (OpenAI/local) → Qdrant Upsert → Semantic API
```

### Supabase = ZÉRO embedding. TOUT dans Qdrant.

---

## COUCHE 3 — N8N (Orchestration Brain)

### Workflows Core

| Workflow | Déclencheur | Fréquence | SLAs |
|----------|------------|-----------|------|
| **ingestion-pipeline** | Webhook / Cron | Toutes les 15 min | < 30s |
| **compliance-validation** | Event Redis | On-push | < 10s |
| **alerting-system** | Seuil franchi | Real-time | < 5s |
| **etl-datalake-sync** | Cron | Toutes les heures | < 5 min |
| **ai-agent-orchestration** | API Gateway | On-demand | < 60s |
| **regulatory-report-generator** | Cron | Hebdomadaire | < 30 min |
| **self-healing-pipeline** | Health check fail | Real-time | < 60s |
| **anomaly-detection-routing** | Metric drift | Real-time | < 10s |
| **auto-scaling-triggers** | Threshold breach | Real-time | < 30s |
| **supabase-sync-registry** | Cron | Toutes les 6h | < 10 min |

### Logique N8N Standard

```
Trigger → Validate → Enrich → Route → Store → Audit → Report
```

---

## COUCHE 4 — API GATEWAY (Intelligence Router)

### Routing Intelligent

```
IF request.path starts with /api/vector    → Qdrant (port 6333)
IF request.path starts with /api/workflow  → n8n (port 5678)
IF request.path starts with /api/ingest    → ingestion-service
IF request.path starts with /api/transform → transform-service
IF request.path starts with /api/audit     → audit-service
IF request.path starts with /api/compliance→ Supabase Registry
IF request.path starts with /api/archive   → Data Lake (MinIO)
```

### Auth

- JWT validation sur toutes les routes
- RBAC : admin / auditor / analyst / viewer
- ABAC : attributs dynamiques (régulateur, juridiction, classification)

### Rate Limiting

| Tier | Requests/min | Burst |
|------|-------------|-------|
| Admin | 1000 | 50 |
| Auditor | 500 | 25 |
| Analyst | 200 | 10 |
| Viewer | 50 | 5 |

---

## COUCHE 5 — REGULATORY DATA LAKE

### Zones

```
/regulatory-data/
├── RAW/           ← Immutable ingestion (source hashée)
│   ├── bceao/
│   ├── cobac/
│   ├── cima/
│   ├── ohada/
│   ├── cosumaf/
│   ├── crepmf/
│   └── gafi/
├── CLEAN/         ← Validated & normalized
├── GOVERNED/      ← Compliance-ready, versioned
├── AUDIT/         ← Historical trace (hash chain)
└── EXPORT/        ← Reporting & analytics ready
```

### Formats

| Usage | Format | Compression |
|-------|--------|-------------|
| Analytics lourdes | Parquet | Snappy |
| Logs & événements | JSONL | Gzip |
| Event streams | Avro | Snappy |
| Registry sync | SQL snapshots | Gzip |

### Propriétés

- **Immutabilité** : Tout document RAW est hashé (SHA-256), jamais modifié
- **Versioning** : Chaque transformation crée une nouvelle version
- **Hash Chain** : Chaque version référence le hash de la précédente
- **Audit Trail** : Toute lecture/écriture est loggée

---

## COUCHE 6 — AUTO-OPTIMIZATION ENGINE

### Loop d'Optimisation

```
Observe → Analyze → Decide → Adapt → Validate → Deploy
   ↑                                                  |
   └──────────────────────────────────────────────────┘
```

### Modules

| Module | Fonction | Seuil |
|--------|----------|-------|
| **Performance Monitor** | Latence, throughput, bottlenecks | p99 > 500ms |
| **Intelligence Analyzer** | Workflow efficiency, vector density | Score < 0.7 |
| **Auto-Refactor Engine** | n8n rewriting, microservice scaling | CPU > 80% |
| **Compliance Guardian** | Regulatory drift detection | Drift > 5% |

### Self-Tuning Rules

```
IF latence_p99 > 500ms     → scale ingestion-service +1
IF duplication_rate > 15%  → merge vector clusters Qdrant
IF workflow_efficiency < 0.7 → rewrite n8n graph
IF data_drift_detected     → rollback + revalidate Data Lake
IF cpu_avg > 80%           → scale queue-worker +2
```

---

## SÉPARATION DES RESPONSABILITÉS

| Couche | Rôle | Ne fait PAS |
|--------|------|-------------|
| **Supabase** | Registry + Compliance | ❌ Compute, Embeddings, Logique métier |
| **Docker** | Execution Core | ❌ Stockage permanent critique |
| **Qdrant** | Vector Intelligence | ❌ Stockage documentaire brut |
| **n8n** | Orchestration | ❌ Stockage, Vector search |
| **Data Lake** | Vérité Historique | ❌ Compute temps réel |
| **API Gateway** | Contrôle Central | ❌ Logique métier |

---

## RÈGLES FONDAMENTALES

1. **Supabase ne fait PAS de compute** — uniquement registry & compliance
2. **Aucun embedding dans Supabase** — 100% Qdrant local
3. **Toute logique IA = hors SaaS** — microservices Docker
4. **Toute donnée critique = Data Lake** — immuable, hashée
5. **Toute décision système = traçable** — audit trail complet
6. **Toute optimisation = automatique** — self-tuning engine

---

## DÉPLOIEMENT — 4 PHASES

### PHASE 1 — BOOTSTRAP (J+0)
```bash
docker compose up -d                    # Cluster complet
./scripts/init-qdrant-collections.sh    # Création 5 collections
./scripts/init-n8n-workflows.sh         # Import 10 workflows
./scripts/init-datalake-zones.sh        # Création zones MinIO
```

### PHASE 2 — MIGRATION (J+7)
- Extraction Supabase (11 tables stratégiques)
- Migration embeddings → Qdrant
- Migration workflows → n8n
- Sync registry Supabase

### PHASE 3 — OPTIMISATION (J+14)
- Activation auto-tuning engine
- Performance baseline
- Suppression redondances

### PHASE 4 — AUTONOMY MODE (J+30)
- System self-healing ON
- Auto-scaling ON
- Auto-refactor ON

---

## KPI CIBLES

| KPI | Actuel | Cible J+90 |
|-----|--------|-----------|
| Dépendance Supabase | 100% | < 25% |
| Embeddings locaux | 0% | 100% |
| Traitements locaux | 0% | 95% |
| Disponibilité sans Supabase | 0% | 90% |
| Self-healing coverage | 0% | 80% |
| Auto-optimisation active | 0% | 100% |