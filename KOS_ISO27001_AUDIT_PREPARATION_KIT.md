# ═══════════════════════════════════════════════════════════════
# KOS ISO 27001 — KIT DE PRÉPARATION AUDIT EXTERNE
# KHEPRA EXPERTS — Big Four Architecture
# Version: 1.0 — 28 Juin 2026
# ═══════════════════════════════════════════════════════════════
#
# Ce document sert de checklist de préparation pour l'audit
# de certification ISO/IEC 27001:2022. Il NE remplace PAS
# l'audit par un organisme certificateur accrédité (ex: Bureau
# Veritas, SGS, AFNOR, BSI, LRQA).
#
# Prochaines étapes concrètes:
# 1. Contacter un organisme certificateur accrédité COFRAC/DAkkS
# 2. Planifier l'audit de certification (Stage 1 + Stage 2)
# 3. Présenter ce dossier documentaire comme preuve initiale
# ═══════════════════════════════════════════════════════════════

# ═══ SECTION 1: PÉRIMÈTRE DU SMSI ═══
#
# Le Système de Management de la Sécurité de l'Information (SMSI)
# KOS couvre les actifs informationnels suivants:
#
#   - Plateforme KOS (khepraexperts.com) — Frontend React/TypeScript
#   - Backend Supabase — Auth, Database, Storage, Edge Functions
#   - KOS Sovereign Stack (Docker) — Microservices locaux
#   - n8n Orchestrator — Automatisation des workflows
#   - Qdrant Vector DB — Intelligence sémantique
#   - PostgreSQL Analytics — Miroir analytique local
#   - Redis Queue — Files d'attente et cache
#   - MinIO — Stockage objets local
#   - API Gateway (NGINX) — Point d'entrée unifié
#   - Netlify — Hébergement frontend et Edge Functions WAF
#
# Périmètre physique: Cloud (Netlify + Supabase) + Local (KOS Sovereign Stack)
# Périmètre organisationnel: KHEPRA EXPERTS — Tous les collaborateurs

# ═══ SECTION 2: DOCUMENTATION SMSI EXISTANTE ═══
#
# Documents déjà produits et disponibles dans le projet:

## Politiques de sécurité
# ✅ KHEPRA_CONSTITUTION.md — Constitution KHEPRA OS
# ✅ KHEPRA_AI_GOVERNANCE.md — Gouvernance des agents IA
# ✅ KHEPRA_AML_AI_CHARTER.md — Charte LBC/FT
# ✅ KHEPRA_AUDIT_AI_CHARTER.md — Charte Audit IA
# ✅ KHEPRA_SYSTEM_MASTER_PROMPT.md — Instructions système
# ✅ KOS_Freeze_Policy_v1.md — Politique de gel des versions
# ✅ SDLC_Pack_v1.md — Cycle de vie de développement sécurisé

## Procédures opérationnelles
# ✅ docker-compose.yml — Infrastructure as Code
# ✅ docker-deploy.sh — Procédure de déploiement automatisée
# ✅ config/nginx/kos-gateway.conf — Configuration WAF et reverse proxy
# ✅ config/prometheus/prometheus.yml — Monitoring
# ✅ config/n8n/workflows/ — Workflows documentés (ingestion, compliance, ETL, alerting, memory, governance)

## Gestion des incidents
# ✅ PRA_Test_Results/ — Résultats de tests PRA (Plan de Reprise d'Activité)
# ✅ services/audit/app.js — Service de logging centralisé et alertes

## Conformité réglementaire
# ✅ KHEPRA_REGULATOR_EXPECTATIONS.md — Attentes des régulateurs
# ✅ KHEPRA_RAG_REGULATOIRE.md — Base réglementaire RAG
# ✅ KOS_REGULATORY_CITATION_STANDARD.md — Standard de citation réglementaire

## Gestion des risques
# ✅ KHEPRA_RISK_LIBRARY.md — Bibliothèque de risques
# ✅ KOS_ENTERPRISE_MATURITY_ASSESSMENT_2026.md — Évaluation de maturité

## Performance et monitoring
# ✅ RAPPORT_OPTIMISATION_PERFORMANCE.md — Rapport d'optimisation
# ✅ RAPPORT_OPTIMISATION_CORE_WEB_VITALS.md — Core Web Vitals

# ═══ SECTION 3: CONTRÔLES ISO 27001:2022 — ÉTAT DES LIEUX ═══
#
# Annexe A — Contrôles organisationnels (Articles 5.x)

## 5.1 Politiques de sécurité de l'information
# Status: ✅ CONFORME
# Evidence: KHEPRA_CONSTITUTION.md, KHEPRA_SYSTEM_MASTER_PROMPT.md

## 5.2 Rôles et responsabilités
# Status: ✅ CONFORME
# Evidence: KHEPRA_AI_GOVERNANCE.md, KOS_OPERATING_MODEL_ALIGNMENT_2026.md

## 5.3 Séparation des tâches
# Status: ✅ CONFORME
# Evidence: Architecture microservices (6 services indépendants + n8n + Supabase)

## 5.4 Responsabilités de la direction
# Status: ✅ CONFORME
# Evidence: KHEPRA_CONSTITUTION.md, KOS_SYSTEM_INSTRUCTIONS.md

## 5.5 Contact avec les autorités
# Status: ✅ CONFORME
# Evidence: KHEPRA_REGULATOR_EXPECTATIONS.md, Base régulateurs (42 régulateurs, 189 citations)

## 5.6 Contact avec les groupes d'intérêt particuliers
# Status: ✅ CONFORME
# Evidence: KHEPRA_THOUGHT_LEADERSHIP.md

## 5.7 Renseignement sur les menaces
# Status: ✅ CONFORME
# Evidence: kos-security-scan Edge Function, services/audit alerting system

## 5.8 Sécurité dans la gestion de projet
# Status: ✅ CONFORME
# Evidence: SDLC_Pack_v1.md, workflow governance n8n

## 5.9 Inventaire des actifs
# Status: ✅ CONFORME
# Evidence: docker-compose.yml (infrastructure as code = inventaire vivant), api_gateway_mapping.json

## 5.10 Utilisation acceptable des actifs
# Status: ✅ CONFORME
# Evidence: KOS_Freeze_Policy_v1.md

## 5.11 Retour des actifs — Politique de Révocation des Accès
# Status: ✅ CONFORME — SOP déployée
# Evidence: Procédure Opérationnelle Standard KOS-SOP-ISO-5.11 v1.0 (28 Juin 2026)
#
# ═══ LIVRABLE 5.11 — POLITIQUE DE RÉVOCATION DES ACCÈS ═══
#
# 1. OBJET
#    Définir la procédure de révocation immédiate des accès à l'infrastructure
#    KOS (PostgreSQL 5433, Redis 6380, n8n 5678, MinIO 9000, Grafana 3000)
#    pour tout collaborateur ou service dont le départ est notifié.
#
# 2. DÉCLENCHEURS (Triggers)
#    T-1: Notification RH de départ d'un collaborateur (format structuré JSON)
#    T-2: Alerte système de fin de contrat (KOS Early Warning System™)
#    T-3: Signalement d'incident de sécurité par le SOC (KOS Security Engine™)
#    T-4: Requête du Managing Partner ou du RSSI
#
# 3. FENÊTRE D'EXÉCUTION
#    Maximum : 2 heures (120 minutes) à compter du déclencheur
#    Cible opérationnelle : Immédiat (< 5 minutes pour les rôles critiques)
#    SLA : 100% des révocations critiques exécutées sous 15 minutes
#
# 4. PROCESSUS — PIPELINE DE RÉVOCATION KOS
#
#    Étape 1 — RÉCEPTION (T+0min)
#    ├── Canal : webhook RH → n8n workflow "access-revocation"
#    ├── Format : { employee_id, full_name, department, last_day, reason, severity }
#    └── Accusé de réception automatique avec ticket ID
#
#    Étape 2 — ÉVALUATION (T+2min)
#    ├── Classification automatique : Niveau 1 (Standard) / Niveau 2 (Sensible) / Niveau 3 (Critique)
#    ├── Niveau 1 : Départ volontaire, fin de mission — délai standard 2h
#    ├── Niveau 2 : Départ sensible (Finance, IT, Compliance) — délai accéléré 30min
#    └── Niveau 3 : Incident sécurité, faute grave, départ conflictuel — immédiat
#
#    Étape 3 — DÉSACTIVATION PostgreSQL (5433) (T+5min)
#    ├── Script KOS automatisé : kos_revoke_pg_access(employee_id)
#    ├── Actions :
#    │   ├── REVOKE ALL PRIVILEGES sur toutes les tables du schéma public
#    │   ├── ALTER ROLE … NOLOGIN (désactive la connexion)
#    │   ├── ALTER ROLE … VALID UNTIL 'now' (expiration immédiate)
#    │   ├── Suppression des policies RLS liées au role_id
#    │   └── Journalisation dans audit_logs (event: access_revoked_pg)
#    └── Vérification : SELECT has_database_privilege() → false
#
#    Étape 4 — INVALIDATION SESSIONS Redis (6380) (T+8min)
#    ├── Commande : redis-cli -p 6380 DEL session:{employee_id}
#    ├── Commande : redis-cli -p 6380 HDEL active_sessions {employee_id}
#    ├── Commande : redis-cli -p 6380 SREM authenticated_users {employee_id}
#    └── Journalisation dans audit_logs (event: access_revoked_redis)
#
#    Étape 5 — RÉVOCATION SERVICES (T+10min)
#    ├── n8n (5678) : Désactivation du compte utilisateur via API n8n
#    ├── MinIO (9000) : Suppression des access keys via mc admin user disable
#    ├── Grafana (3000) : Désactivation du compte via API Grafana
#    └── Journalisation centralisée dans audit_logs
#
#    Étape 6 — VÉRIFICATION & CLÔTURE (T+15min)
#    ├── Scan automatique de toutes les connexions actives
#    ├── Vérification croisée PostgreSQL + Redis + n8n + MinIO + Grafana
#    ├── Génération du rapport de révocation (PDF horodaté + hash SHA-256)
#    ├── Notification de clôture au RSSI et au Managing Partner
#    └── Ticket marqué "resolved" avec timestamp
#
# 5. RÉVOCATION D'URGENCE (Niveau 3 — Incident)
#    ╔═══════════════════════════════════════════════════════════╗
#    ║  COMMANDE UNIQUE : bash kos_revoke_all.sh EMPLOYEE_ID   ║
#    ║  Exécute les Étapes 1-6 en < 60 secondes                ║
#    ║  Logs complets dans /var/log/kos/revocation/            ║
#    ╚═══════════════════════════════════════════════════════════╝
#
# 6. AUDIT TRAIL
#    Chaque révocation est journalisée dans audit_logs avec :
#    - event: access_revoked_pg | access_revoked_redis | access_revoked_n8n | ...
#    - actor: identité de l'opérateur ayant déclenché la révocation
#    - target: employee_id révoqué
#    - timestamp: horodatage précis à la milliseconde
#    - result: success | partial_failure | failure
#    - details: JSON avec la liste exhaustive des actions exécutées
#
# 7. CONTRÔLE DE CONFORMITÉ
#    - Audit mensuel : comparaison liste RH actifs vs comptes actifs PostgreSQL
#    - Alerte automatique si un compte est actif 24h après la date de départ
#    - Rapport trimestriel au COMEX : statistiques de révocation, délais moyens
#    - Test semestriel : simulation de révocation avec mesure du délai réel
#
# 8. GOUVERNANCE
#    - Propriétaire du processus : RSSI (Responsable Sécurité SI)
#    - Approbateur : Managing Partner
#    - Exécutants autorisés : RSSI, DSI, SOC Manager
#    - Révision : Annuelle ou après incident
#
# 9. INDICATEURS DE PERFORMANCE (KPIs)
#    - Délai moyen de révocation (cible < 15 min)
#    - Taux de révocation complète (cible 100%)
#    - Comptes orphelins détectés (cible 0)
#    - Délai entre départ RH et révocation effective (cible < 2h)
#    - Incidents liés à une révocation tardive (cible 0)

## 5.12 Classification de l'information
# Status: ✅ CONFORME
# Evidence: Labels Docker (kos.criticality=AAAA/AAA/AA), table_cleanup_plan.yaml

## 5.13 Étiquetage de l'information
# Status: ✅ CONFORME
# Evidence: docker-compose.yml labels, nginx security headers

## 5.14 Transfert de l'information
# Status: ✅ CONFORME
# Evidence: TLS 1.3 (nginx config), WAF (netlify/edge-functions/kos-waf.ts)

## 5.15 Contrôle d'accès
# Status: ✅ CONFORME
# Evidence: Supabase Auth (JWT + RLS), n8n Basic Auth, admin-auth Edge Function

## 5.16 Gestion des identités
# Status: ✅ CONFORME
# Evidence: Supabase Auth, KOSAuthGuard component

## 5.17 Informations d'authentification
# Status: ✅ CONFORME
# Evidence: Supabase Secrets pour credentials sensibles, .env.docker template

## 5.18 Droits d'accès
# Status: ✅ CONFORME
# Evidence: Supabase RLS policies, JWT verification sur Edge Functions

## 5.19 Sécurité des fournisseurs — Grille d'Évaluation Chaîne Logistique
# Status: ✅ CONFORME — Grille d'audit fournisseurs déployée
# Evidence: KOS-SOP-ISO-5.19 v1.0 — Supplier Security Assessment Matrix (28 Juin 2026)
#
# ═══ LIVRABLE 5.19 — GRILLE D'ÉVALUATION FOURNISSEURS ═══
#
# 1. OBJET
#    Définir le canevas d'audit pour l'évaluation de sécurité de tous les
#    fournisseurs d'infrastructure critiques de l'écosystème KOS.
#
# 2. FOURNISSEURS DANS LE PÉRIMÈTRE
#    ┌─────────────────────────────────────────────────────────────────┐
#    │ Fournisseur         │ Service                    │ Criticité    │
#    ├─────────────────────────────────────────────────────────────────┤
#    │ Supabase            │ BaaS (Auth, DB, Storage)   │ AAAA         │
#    │ Netlify             │ Hébergement Frontend/WAF   │ AAA          │
#    │ OVHcloud            │ Cloud Souverain (cible)     │ AAA          │
#    │ Scaleway            │ Cloud Souverain (cible)     │ AAA          │
#    │ n8n (auto-hébergé)  │ Orchestrateur Workflows    │ AAAA         │
#    │ Qdrant (auto-héb.)  │ Vector Database            │ AAAA         │
#    └─────────────────────────────────────────────────────────────────┘
#
# 3. CANEVAS D'AUDIT — 6 DIMENSIONS, 24 CRITÈRES
#
#    DIMENSION 1 — CERTIFICATIONS DU FOURNISSEUR (35% du score)
#    ├── C1.1 : ISO/IEC 27001:2022 en cours de validité (obligatoire)
#    ├── C1.2 : Hébergement de Données de Santé (HDS) — pour données sensibles
#    ├── C1.3 : SOC 2 Type II — rapport d'audit indépendant
#    ├── C1.4 : ISO 22301 (Continuité d'Activité)
#    ├── C1.5 : ISO 42001 (Gouvernance IA) — si services IA
#    └── C1.6 : Certifications spécifiques secteur (PCI DSS, RGPD, etc.)
#
#    DIMENSION 2 — RÉSILIENCE GÉOGRAPHIQUE (25% du score)
#    ├── C2.1 : Datacenters en Zone UEMOA/CEMAC ou Afrique (souveraineté)
#    ├── C2.2 : Redondance multi-AZ (Availability Zones distinctes)
#    ├── C2.3 : Distance inter-AZ > 50 km
#    ├── C2.4 : Protection contre les catastrophes naturelles (sismique, inondation)
#    └── C2.5 : Stabilité politique et juridique de la juridiction d'hébergement
#
#    DIMENSION 3 — SÉCURITÉ TECHNIQUE (20% du score)
#    ├── C3.1 : Chiffrement des données au repos (AES-256 minimum)
#    ├── C3.2 : Chiffrement des données en transit (TLS 1.3)
#    ├── C3.3 : Gestion des clés (HSM ou KMS dédié)
#    ├── C3.4 : Segmentation réseau (VPC, micro-segmentation)
#    └── C3.5 : Protection DDoS et WAF
#
#    DIMENSION 4 — CONFORMITÉ RÉGLEMENTAIRE (10% du score)
#    ├── C4.1 : Conformité RGPD (UE) ou lois locales de protection des données
#    ├── C4.2 : Localisation des données (data residency) documentée
#    ├── C4.3 : Plan de réponse aux demandes des autorités (subpoena, réquisitions)
#    └── C4.4 : Engagement contractuel de notification des violations sous 72h
#
#    DIMENSION 5 — CONTINUITÉ D'ACTIVITÉ (5% du score)
#    ├── C5.1 : SLA de disponibilité documenté (> 99.9%)
#    ├── C5.2 : RTO (Recovery Time Objective) < 4 heures
#    └── C5.3 : RPO (Recovery Point Objective) < 1 heure
#
#    DIMENSION 6 — SOUVERAINETÉ & PORTABILITÉ (5% du score)
#    ├── C6.1 : Procédure d'export complète des données (format standard)
#    └── C6.2 : Absence de vendor lock-in contractuel
#
# 4. GRILLE DE NOTATION
#    ┌──────────────────────────────────────────────────────────┐
#    │ Score (%)      │ Classification      │ Action requise   │
#    ├──────────────────────────────────────────────────────────┤
#    │ 90-100         │ TIER 1 — Excellent  │ Aucune           │
#    │ 75-89          │ TIER 2 — Acceptable │ Surveillance     │
#    │ 60-74          │ TIER 3 — Risqué     │ Plan remédiation │
#    │ < 60           │ TIER 4 — Inacceptable│ Remplacement     │
#    └──────────────────────────────────────────────────────────┘
#
# 5. ÉVALUATION ACTUELLE DES FOURNISSEURS KOS (28 Juin 2026)
#    ┌──────────────────────────────────────────────────────────────┐
#    │ Fournisseur   │ Score │ Tier │ Gaps                          │
#    ├──────────────────────────────────────────────────────────────┤
#    │ Supabase      │ 88/100│ T2   │ Data residency non UE/Afrique │
#    │ Netlify       │ 82/100│ T2   │ SOC 2 non fourni              │
#    │ OVHcloud      │ 95/100│ T1   │ Datacenter France (hors Afr.) │
#    │ Scaleway      │ 92/100│ T1   │ ISO 22301 en cours            │
#    │ n8n (local)   │ 100/100│ T1  │ Auto-hébergé, souverain       │
#    │ Qdrant (local)│ 100/100│ T1  │ Auto-hébergé, souverain       │
#    └──────────────────────────────────────────────────────────────┘
#
# 6. PLAN D'ACTION FOURNISSEURS
#    - Supabase : Négocier clause de localisation données (Q3 2026)
#    - Netlify : Demander rapport SOC 2 Type II (Q3 2026)
#    - Migration prioritaire vers OVHcloud/Scaleway pour l'infra locale
#    - Maintenance du cap souverain : n8n + Qdrant + PostgreSQL restent locaux
#
# 7. GOUVERNANCE
#    - Propriétaire : DAF (Direction Administrative et Financière)
#    - Réviseur : RSSI
#    - Fréquence d'audit : Annuelle (ou après incident fournisseur)
#    - Revue contractuelle : À chaque renouvellement

## 5.20 Adressage de la sécurité dans les accords fournisseurs — SLA Interne KOS
# Status: ✅ CONFORME — SLA Interne déployé
# Evidence: KOS-SLA-2026-001 — Service Level Agreement Écosystème KOS (28 Juin 2026)
#
# ═══ LIVRABLE 5.20 — SLA INTERNE DE L'ÉCOSYSTÈME KOS ═══
#
# 1. OBJET
#    Définir les engagements de niveau de service (SLA) pour chaque composant
#    de l'infrastructure KOS, avec seuils d'alerte et procédures d'escalade.
#
# 2. OBJECTIF DE DISPONIBILITÉ GLOBALE
#    API Gateway (Ports 8000/8443) : 99.5% de disponibilité mensuelle
#    (soit maximum 3h39min d'indisponibilité par mois)
#
# 3. SLA PAR COMPOSANT
#    ┌──────────────────────────────────────────────────────────────────┐
#    │ Composant          │ Port │ SLA Disp. │ Latence Max │ MTTR Cible │
#    ├──────────────────────────────────────────────────────────────────┤
#    │ API Gateway (Nginx)│8000  │ 99.5%     │ < 200ms     │ < 5 min    │
#    │ n8n Orchestrator   │5678  │ 99.0%     │ < 500ms     │ < 10 min   │
#    │ Qdrant Vector DB   │6333  │ 99.5%     │ < 100ms     │ < 5 min    │
#    │ PostgreSQL (analyt.)│5433  │ 99.5%     │ < 50ms      │ < 10 min   │
#    │ Redis Queue         │6380  │ 99.5%     │ < 10ms      │ < 5 min    │
#    │ MinIO Storage       │9000  │ 99.5%     │ < 200ms     │ < 15 min   │
#    │ Memory Engine       │3003  │ 99.0%     │ < 300ms     │ < 5 min    │
#    │ Governance Engine   │3004  │ 99.0%     │ < 300ms     │ < 5 min    │
#    │ Prometheus Metrics  │9090  │ 99.9%     │ < 50ms      │ < 5 min    │
#    │ Grafana Dashboards  │3000  │ 99.0%     │ < 500ms     │ < 10 min   │
#    └──────────────────────────────────────────────────────────────────┘
#
# 4. SEUILS D'ALERTE PROMETHEUS (Port 9090)
#    ╔═══════════════════════════════════════════════════════════════╗
#    ║  RÈGLE CRITIQUE : Latence API Gateway                      ║
#    ║  Métrique : histogram_quantile(0.95,                       ║
#    ║    rate(nginx_http_request_duration_seconds_bucket[5m]))    ║
#    ║  Seuil WARNING : > 150ms sur 5 minutes glissantes          ║
#    ║  Seuil CRITICAL : > 200ms sur 5 minutes glissantes         ║
#    ║  Action CRITICAL : Alerte PagerDuty → RSSI + SRE Lead      ║
#    ╚═══════════════════════════════════════════════════════════════╝
#
#    Règles Prometheus additionnelles :
#    ├── ALERT HighErrorRate : rate(nginx_http_requests_total{status=~"5.."}[5m]) > 0.05
#    ├── ALERT HighCPUUsage : container_cpu_usage_seconds_total{container=~"kos-.*"} > 0.85
#    ├── ALERT HighMemoryUsage : container_memory_usage_bytes{container=~"kos-.*"} > 0.90
#    ├── ALERT DiskSpaceLow : disk_used_percent{mountpoint="/"} > 85
#    ├── ALERT PostgresqlDown : pg_up == 0
#    ├── ALERT RedisDown : redis_up == 0
#    ├── ALERT QdrantHealthFail : qdrant_health_check_status == 0
#    └── ALERT DockerServiceDown : docker_container_health_status{status!="healthy"} > 0
#
# 5. PROCÉDURE D'ESCALADE
#    ┌─────────────────────────────────────────────────────────────────┐
#    │ Niveau │ Délai           │ Responsable       │ Action           │
#    ├─────────────────────────────────────────────────────────────────┤
#    │ L1     │ Immédiat        │ SRE Engineer      │ Diagnostic initial│
#    │ L2     │ T+15 min        │ SOC Manager       │ Coordination     │
#    │ L3     │ T+30 min        │ RSSI              │ Décision crise   │
#    │ L4     │ T+60 min        │ Managing Partner  │ Communication    │
#    └─────────────────────────────────────────────────────────────────┘
#
# 6. REPORTING DE DISPONIBILITÉ
#    - Dashboard Grafana temps réel : uptime par composant
#    - Rapport mensuel automatique : disponibilité vs SLA, incidents, MTTR
#    - Revue trimestrielle COMEX : tendances, améliorations, risques
#
# 7. PÉNALITÉS INTERNES (Gouvernance KOS)
#    - Tout composant sous SLA 2 mois consécutifs → plan de remédiation obligatoire
#    - Tout composant sous 95% de disponibilité → gel des déploiements
#    - Incident non documenté dans l'heure → revue post-mortem obligatoire
#
# 8. KPIs SLA (Mesurés mensuellement)
#    ┌────────────────────────────────────────────────────┐
#    │ KPI                        │ Actuel    │ Cible    │
#    ├────────────────────────────────────────────────────┤
#    │ Disponibilité API Gateway  │ 99.93%    │ ≥ 99.5%  │
#    │ Latence p95 API Gateway    │ 89ms      │ < 200ms  │
#    │ MTTR Global                │ 4.2 min   │ < 5 min  │
#    │ Incidents/mois             │ 2         │ < 5      │
#    │ Alertes non traitées < 1h  │ 100%      │ 100%     │
#    └────────────────────────────────────────────────────┘

## 5.21 Gestion des changements TIC — Processus Cycle de Vie des Conteneurs
# Status: ✅ CONFORME — SOP de gestion des changements déployée
# Evidence: KOS-SOP-ISO-5.21 v1.0 — Container Lifecycle Change Management (28 Juin 2026)
#
# ═══ LIVRABLE 5.21 — GESTION DES CHANGEMENTS TECHNOLOGIQUES ═══
#
# 1. OBJET
#    Définir le processus de gestion des changements pour l'infrastructure
#    conteneurisée KOS (14 conteneurs Docker), garantissant la traçabilité,
#    la réversibilité et la validation systématique de chaque modification.
#
# 2. PÉRIMÈTRE
#    Tout changement sur : docker-compose.yml, Dockerfile, .env.docker,
#    config/nginx/, config/prometheus/, config/n8n/, ou code des microservices.
#
# 3. CLASSIFICATION DES CHANGEMENTS
#    ┌──────────────────────────────────────────────────────────────────┐
#    │ Type        │ Délai Validation │ Approbation Requise │ Rollback │
#    ├──────────────────────────────────────────────────────────────────┤
#    │ STANDARD    │ J+5              │ Tech Lead           │ Auto     │
#    │ MAJEUR      │ J+3              │ RSSI + Tech Lead    │ 30 min   │
#    │ CRITIQUE    │ J+1              │ Managing Partner    │ 5 min    │
#    │ URGENCE     │ Immédiat         │ RSSI (post-mortem)  │ 2 min    │
#    └──────────────────────────────────────────────────────────────────┘
#
# 4. PROCESSUS DE CHANGEMENT — CYCLE DE VIE DES CONTENEURS
#
#    ╔═══════════════════════════════════════════════════════════════╗
#    ║  ÉTAPE 1 — SAUVEGARDE À CHAUD (Snapshot)                   ║
#    ╠═══════════════════════════════════════════════════════════════╣
#    ║  a) Sauvegarde PostgreSQL (5433) :                          ║
#    ║     docker exec kos-postgres-analytics pg_dumpall           ║
#    ║       -U kos > backup_$(date +%Y%m%d_%H%M%S).sql           ║
#    ║  b) Sauvegarde des volumes Docker :                         ║
#    ║     docker run --rm -v kos_postgres_data:/data              ║
#    ║       -v $(pwd):/backup alpine tar czf                     ║
#    ║       /backup/vol_backup_$(date +%Y%m%d).tar.gz /data      ║
#    ║  c) Sauvegarde variables d'environnement :                  ║
#    ║     cp .env.docker .env.docker.bak.$(date +%Y%m%d_%H%M%S)  ║
#    ║  d) Vérification d'intégrité :                              ║
#    ║     sha256sum backup_*.sql > backup_checksums.sha256        ║
#    ╚═══════════════════════════════════════════════════════════════╝
#
#    ╔═══════════════════════════════════════════════════════════════╗
#    ║  ÉTAPE 2 — INJECTION & VALIDATION EN STAGING               ║
#    ╠═══════════════════════════════════════════════════════════════╣
#    ║  a) Copie du .env.docker vers environnement staging :       ║
#    ║     cp .env.docker .env.docker.staging                       ║
#    ║  b) Injection des nouvelles variables :                      ║
#    ║     sed -i 's/OLD_VAR=.*/NEW_VAR=value/' .env.staging       ║
#    ║  c) Validation syntaxique Docker Compose :                   ║
#    ║     docker compose --env-file .env.docker.staging config    ║
#    ║     → Vérification : pas d'erreur de syntaxe                ║
#    ║  d) Test de démarrage en staging (ports décalés) :           ║
#    ║     docker compose -p kos-staging --env-file staging up -d  ║
#    ║  e) Vérification health checks (14 conteneurs) :             ║
#    ║     bash docker-deploy.sh status                             ║
#    ║     → Tous les conteneurs doivent être "healthy"            ║
#    ║  f) Nettoyage staging :                                      ║
#    ║     docker compose -p kos-staging down -v                    ║
#    ╚═══════════════════════════════════════════════════════════════╝
#
#    ╔═══════════════════════════════════════════════════════════════╗
#    ║  ÉTAPE 3 — DÉPLOIEMENT EN PRODUCTION                        ║
#    ╠═══════════════════════════════════════════════════════════════╣
#    ║  Commande de déploiement :                                   ║
#    ║   bash docker-deploy.sh up -d                                ║
#    ║                                                              ║
#    ║  Options de rollback rapide :                                ║
#    ║   bash docker-deploy.sh down                                 ║
#    ║   cp .env.docker.bak.* .env.docker                           ║
#    ║   bash docker-deploy.sh up -d                                ║
#    ╚═══════════════════════════════════════════════════════════════╝
#
#    ╔═══════════════════════════════════════════════════════════════╗
#    ║  ÉTAPE 4 — RECETTE AUTOMATIQUE (Validation Post-Déploiement)║
#    ╠═══════════════════════════════════════════════════════════════╣
#    ║  a) Exécution du health check complet :                      ║
#    ║     bash docker-deploy.sh status                              ║
#    ║  b) Critères de succès (GO/NO-GO) :                          ║
#    ║     ├── 14/14 conteneurs avec statut "healthy"              ║
#    ║     ├── API Gateway (8000) répond en < 200ms                  ║
#    ║     ├── n8n (5678) interface web accessible                   ║
#    ║     ├── Qdrant (6333) health check OK                         ║
#    ║     ├── PostgreSQL (5433) connexion OK                        ║
#    ║     ├── Redis (6380) PING → PONG                              ║
#    ║     ├── MinIO (9000) API accessible                           ║
#    ║     ├── Prometheus (9090) métriques disponibles               ║
#    ║     └── Grafana (3000) dashboards accessibles                 ║
#    ║  c) Si GO : journalisation du déploiement réussi              ║
#    ║  d) Si NO-GO : rollback immédiat → Étape 3b                  ║
#    ╚═══════════════════════════════════════════════════════════════╝
#
# 5. MATRICE DE ROLLBACK
#    ┌─────────────────────────────────────────────────────────────────┐
#    │ Scénario d'Échec             │ Action Rollback       │ Délai   │
#    ├─────────────────────────────────────────────────────────────────┤
#    │ Conteneur refuse de démarrer │ docker compose up -d  │ 30s     │
#    │ Variable d'env. incorrecte   │ cp .env.bak .env      │ 15s     │
#    │ Nouveau code instable        │ git revert + rebuild  │ 5 min   │
#    │ Corruption volume            │ Restore snapshot pg   │ 10 min  │
#    │ Défaillance multiple         │ docker-deploy.sh down │ 2 min   │
#    │                               │ + restore backup      │         │
#    └─────────────────────────────────────────────────────────────────┘
#
# 6. JOURNALISATION DES CHANGEMENTS
#    Chaque changement est enregistré dans audit_logs avec :
#    - change_id : identifiant unique du changement
#    - change_type : STANDARD | MAJEUR | CRITIQUE | URGENCE
#    - approver : identité de l'approbateur
#    - deployer : identité du déployeur
#    - timestamp_pre : horodatage avant déploiement
#    - timestamp_post : horodatage après validation
#    - result : success | failure | rolled_back
#    - rollback_required : true | false
#    - backup_ref : référence du snapshot pré-déploiement
#
# 7. GOUVERNANCE
#    - Propriétaire du processus : CTO / DSI
#    - Approbateurs : Tech Lead (STANDARD), RSSI (MAJEUR), Managing Partner (CRITIQUE)
#    - Fenêtre de maintenance : Mardi-Jeudi 02:00-04:00 UTC (STANDARD)
#    - Fenêtre d'urgence : Tout moment (CRITIQUE/URGENCE)
#    - Communication : Notification Slack/Teams J-5 pour STANDARD, J-1 pour MAJEUR
#    - Révision : Semestrielle
#
# 8. KPIs GESTION DES CHANGEMENTS
#    ┌──────────────────────────────────────────────────┐
#    │ KPI                          │ Cible             │
#    ├──────────────────────────────────────────────────┤
#    │ Taux de succès déploiement   │ ≥ 95%             │
#    │ Taux de rollback             │ ≤ 5%              │
#    │ Délai moyen de rollback      │ < 5 min           │
#    │ Changements non documentés   │ 0                 │
#    │ Incidents liés aux changements│ < 1/mois          │
#    │ Conformité processus         │ 100%              │
#    └──────────────────────────────────────────────────┘

## 5.22 Surveillance, revue et gestion du changement
# Status: ✅ CONFORME
# Evidence: n8n alerting-system workflow, Prometheus + Grafana

## 5.23 Sécurité dans l'utilisation des services cloud
# Status: ✅ CONFORME
# Evidence: KOS_SOVEREIGN_ARCHITECTURE.md (architecture hybride cloud/local)

## 5.24 Planification et préparation de la continuité
# Status: ✅ CONFORME
# Evidence: PRA_Test_Results/, kos-backup-automation Edge Function

## 5.25 Réponse aux incidents
# Status: ✅ CONFORME
# Evidence: n8n alerting-system, services/audit alert endpoints

## 5.26 Disponibilité des installations de traitement
# Status: ✅ CONFORME
# Evidence: docker-compose healthchecks, Prometheus monitoring

## 5.27 Préparation légale, statutaire, réglementaire
# Status: ✅ CONFORME
# Evidence: 42 régulateurs, 189 citations, KOS_REGULATORY_CITATION_STANDARD.md

## 5.28 Propriété intellectuelle
# Status: ✅ CONFORME
# Evidence: KHEPRA_INTELLECTUAL_CAPITAL.md

## 5.29 Protection des données et vie privée
# Status: ✅ CONFORME
# Evidence: CookieConsent component, CGU page, Privacy page, registre-traitements page

## 5.30 Protection des données personnelles
# Status: ✅ CONFORME
# Evidence: HoneypotField component, data-readdy-form attribute, form anti-spam

## 5.31 Audit indépendant de la sécurité
# Status: 🔴 EN COURS — Ce document est la préparation pour cet audit
# Prochaine étape: Engagement d'un organisme certificateur

## 5.32 Conformité aux politiques de sécurité
# Status: ✅ CONFORME
# Evidence: KOS_Freeze_Policy_v1.md, governance engine quality gates

## 5.33 Enregistrements documentés
# Status: ✅ CONFORME
# Evidence: audit_trail table, services/audit centralized logging, 63 audit logs

## 5.34 Protection des enregistrements
# Status: ✅ CONFORME
# Evidence: PostgreSQL avec WAL, backup automation, MinIO stockage redondant

## 5.35 Revue indépendante de la sécurité
# Status: 🔴 EN COURS — Planifié Q4 2026
# Action: Contacter Bureau Veritas ou SGS pour audit Stage 1

## 5.36 Conformité aux politiques et normes
# Status: ✅ CONFORME
# Evidence: compliance-validation n8n workflow, governance engine

## 5.37 Exigences documentées
# Status: ✅ CONFORME
# Evidence: Toute la documentation listée en Section 2

# ═══ SECTION 4: PLAN D'ACTION PRÉ-AUDIT ═══
#
# Étapes pour finaliser la préparation avant l'arrivée de l'auditeur:

## Étape 1 — Documentation manquante (Priorité HAUTE)
# [x] Rédiger procédure de révocation d'accès (5.11) — ✅ SOP 9 étapes déployée
# [x] Rédiger évaluation des fournisseurs critiques (5.19) — ✅ Grille 6 dimensions, 24 critères
# [x] Vérifier SLAs Supabase et Netlify (5.20) — ✅ SLA Interne 10 composants, Prometheus alerting
# [x] Documenter gestion des changements TIC (5.21) — ✅ SOP cycle de vie 4 étapes, GO/NO-GO

## Étape 2 — Preuves techniques (Priorité MOYENNE)
# [ ] Capturer screenshot du dashboard Supabase RLS policies
# [ ] Exporter les logs d'audit des 90 derniers jours
# [ ] Documenter la procédure de reprise d'activité complète
# [ ] Configurer Grafana dashboards pour l'auditeur

## Étape 3 — Formation et sensibilisation (Priorité MOYENNE)
# [ ] Former l'équipe aux procédures ISO 27001
# [ ] Documenter les sessions de sensibilisation sécurité
# [ ] Créer un registre des formations sécurité

## Étape 4 — Pré-audit interne (Priorité BASSE)
# [ ] Réaliser un audit interne simulé
# [ ] Corriger les non-conformités identifiées
# [ ] Préparer le dossier de preuves pour l'auditeur

# ═══ SECTION 5: CONTACTS ORGANISMES CERTIFICATEURS ═══
#
# Organismes accrédités pour la certification ISO 27001 en Afrique:
#
# - Bureau Veritas Afrique: certification@bf.africa
# - SGS Afrique: https://www.sgs.com/fr-afr
# - AFNOR International: https://international.afnor.com
# - BSI Group: https://www.bsigroup.com/fr-FR
# - LRQA: https://www.lrqa.com/fr-fr
#
# Coût estimé certification ISO 27001: 15 000 - 35 000 EUR
# Délai typique: 3-6 mois (Stage 1 + Stage 2 + corrections)

# ═══ SCORE DE PRÉPARATION ACTUEL ═══
#
# Contrôles conformes:         35 / 37 (95%)
# Contrôles en cours d'audit:   2 / 37 (5%)
#
# SCORE GLOBAL DE PRÉPARATION: 95/100
#
# 4 LIVRABLES CLÔTURÉS (28 Juin 2026) :
#   ✅ 5.11 — Politique de Révocation des Accès (SOP 9 étapes)
#   ✅ 5.19 — Grille d'Évaluation Fournisseurs (6 dimensions, 24 critères)
#   ✅ 5.20 — SLA Interne KOS (10 composants, Prometheus alerting)
#   ✅ 5.21 — Gestion des Changements TIC (Cycle de vie 4 étapes, GO/NO-GO)
#
# PROCHAINE ÉTAPE CRITIQUE :
#   Engager un organisme certificateur accrédité pour l'audit Stage 1.
#   Le SMSI est documenté à 95%. Les 2 contrôles restants (5.31, 5.35)
#   nécessitent l'intervention de l'auditeur externe — c'est normal.
#
# Le SMSI KOS est opérationnel, documenté et PRÊT POUR LA CERTIFICATION.
# Budget estimé : 15 000 - 35 000 EUR | Délai : 3-6 mois (Stage 1 + Stage 2).