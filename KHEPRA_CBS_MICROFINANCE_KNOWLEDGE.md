# KHEPRA CBS & MICROFINANCE KNOWLEDGE BASE
## Architecture Core Banking System · Microfinance UEMOA/CEMAC · Conformité · Marché · Agilité
### Version 1.0 · 07 Juin 2026 · Niveau Big Four

> **Documents liés** : [KHEPRA_AI_GOVERNANCE.md](./KHEPRA_AI_GOVERNANCE.md) — §13 Deployment & PMO, §4.10 Architecture de Gouvernance
> **Framework MFI UEMOA** : [MFI_BUSINESS_PLAN_FRAMEWORK_UEMOA.md](./MFI_BUSINESS_PLAN_FRAMEWORK_UEMOA.md)
> **Outils d'audit** : [scripts/khepra_audit_balance.py](./scripts/khepra_audit_balance.py), [scripts/khepra_calcul_par_provisions.py](./scripts/khepra_calcul_par_provisions.py), [scripts/khepra_stress_test_portefeuille.py](./scripts/khepra_stress_test_portefeuille.py)

---

Ce document est la base de connaissance opérationnelle de KHEPRA EXPERTS pour les missions de sélection, déploiement et audit de Core Banking Systems (CBS) pour les Systèmes Financiers Décentralisés (SFD), de conformité réglementaire UEMOA/CEMAC, d'étude de marché et de pilotage Agile Scrum des projets de transformation digitale microfinance.

---

## SOMMAIRE

```
PARTIE A — ARCHITECTURE TECHNIQUE CBS
  A.1  Solutions CBS : Sun Telecom & Ynover CBS (comparatif)
  A.2  Architecture microservices, API Manager (WSO2), Keycloak
  A.3  Jasper Report, ELK Stack, CI/CD, Haute Disponibilité
  A.4  Spécifications matérielles (CPU, RAM, Stockage, Bande passante)
  A.5  Dispositifs de sécurité (Auth forte, Cryptage, Audit Trail, Archivage)

PARTIE B — FONCTIONNALITÉS MÉTIERS MICROFINANCE
  B.1  Crédits, Épargnes, Dépôts à Terme, Tontines
  B.2  Caisse/Guichet, Comptabilité, Reporting, Workflow
  B.3  Modules avancés : KYC, LCB-FT, Finance Islamique, Actionnaires, Performances Sociales
  B.4  Automatisation : Batch TFJ, Calculs d'Intérêts, Alertes SMS/Email

PARTIE C — CONFORMITÉ RÉGLEMENTAIRE & GOUVERNANCE
  C.1  Exigences BCEAO (UEMOA) et COBAC (CEMAC) — textes applicables
  C.2  Ratios prudentiels, Agrément SFD, LBC/FT, Protection des données, Cybersécurité
  C.3  Statuts types AMIFA Gabon SA : Capital, Gouvernance, Durée, Obligations OHADA
  C.4  Procédures d'agrément FinAfrica Togo : dossier complet, calendrier

PARTIE D — ÉTUDE DE MARCHÉ & POSITIONNEMENT STRATÉGIQUE
  D.1  Marché togolais : Inclusion financière, Besoins TPME, Contraintes crédit
  D.2  Positionnement FinAfrica Togo : Mésofinance, Agriculture, Commerce, Digital
  D.3  Opportunités & Défis : Gouvernance, Innovation, Éducation financière, Inclusion

PARTIE E — MÉTHODOLOGIE PROJET & AGILITÉ
  E.1  Approche Agile Scrum pour CBS : Backlog, Sprint, PO, SM, Livrables
  E.2  Méthodologie de migration des données : Tri, Vérification, Importation, Contrôle

GLOSSAIRE DES TERMES CLÉS
```

---

# PARTIE A — ARCHITECTURE TECHNIQUE CBS

## A.1 — Solutions CBS : Sun Telecom & Ynover CBS

Le Core Banking System (CBS) est le système d'information central d'un SFD. Il gère l'intégralité des opérations : crédit, épargne, comptabilité, reporting réglementaire, KYC, LCB-FT. Le choix d'un CBS engage l'institution pour 10 à 15 ans.

### Comparatif Détaillé

| Critère | Sun Telecom CBS | Ynover CBS |
|---------|----------------|------------|
| **Positionnement** | Solution généraliste (banque, SFD, assurance) avec module microfinance | Solution nativement conçue pour la microfinance et les SFD |
| **Présence UEMOA/CEMAC** | Établie (Sénégal, Côte d'Ivoire, Mali, Burkina) | Déploiements ciblés, croissance rapide |
| **Technologie** | Java EE / Spring Boot + Angular | Java Spring Boot + React / Vue.js |
| **Base de données** | Oracle / PostgreSQL | PostgreSQL / MySQL |
| **Architecture** | Microservices conteneurisés + API Gateway | Microservices natifs + Event-Driven Architecture |
| **Déploiement** | On-Premise, Cloud Privé, Hybride | On-Premise, Cloud (AWS/Azure), Hybride |
| **Mobile Banking** | Module additionnel (apps natives iOS/Android) | Intégré nativement (PWA + USSD) |
| **Référentiel PCEMF** | Oui | Oui + SYCOHADA |
| **Reporting COBAC/BCEAO** | États préconfigurés | États préconfigurés + générateur personnalisé |
| **Multi-devises / Multi-agences** | Oui / Consolidation centralisée | Oui / Architecture hub-and-spoke synchrone |
| **Langue** | Français, Anglais | Français, Anglais, Portugais (option) |

### Forces et Faiblesses

**Sun Telecom CBS** : Large base installée en Afrique francophone avec références vérifiables. Écosystème de partenaires intégrateurs locaux formés. Support en français 24/7. Coût de licence élevé pour les petits SFD. Module microfinance perçu comme adaptation du module bancaire plutôt que conception native SFD.

**Ynover CBS** : Architecture nativement microservices avec scalabilité horizontale. Moteur de règles métier (BRMS) intégré — paramétrage sans code. Module USSD natif pour inclusion financière. API-first design — interopérabilité avec fintechs. Coût compétitif, modèle SaaS disponible. Base installée plus récente — moins de références long terme.

### Grille de Scoring KHEPRA

| Critère | Pondération | Sun Telecom | Ynover CBS |
|---------|------------|------------|------------|
| Couverture fonctionnelle microfinance | 20% | 16/20 | 18/20 |
| Conformité réglementaire UEMOA/CEMAC | 20% | 18/20 | 16/20 |
| Scalabilité et performance | 15% | 12/15 | 14/15 |
| Coût total de possession (TCO) 5 ans | 15% | 9/15 | 13/15 |
| Support local et maintenance | 10% | 9/10 | 6/10 |
| Interopérabilité et API | 10% | 6/10 | 9/10 |
| Sécurité et résilience | 10% | 8/10 | 8/10 |
| **Score pondéré** | **100%** | **12,5/20** | **13,7/20** |

> **Recommandation KHEPRA** : Pour un SFD moyen (5-15 agences, 20k-80k clients), Ynover CBS offre un meilleur rapport valeur/coût grâce à son architecture moderne et USSD natif. Pour un grand SFD (> 15 agences, > 80k clients) avec exigences de reporting complexes, Sun Telecom reste un choix solide avec un historique de conformité vérifiable.

---

## A.2 — Architecture Microservices, WSO2 API Manager, Keycloak

### Architecture Microservices CBS

```
┌──────────────────────────────────────────────────────────────┐
│                    CLIENTS / CANAUX                           │
│  Agence (Desktop) │ Mobile (PWA/Native) │ USSD │ Portail Web │
└───────────────────────────┬──────────────────────────────────┘
                            ▼
┌──────────────────────────────────────────────────────────────┐
│              API GATEWAY (WSO2 API Manager)                   │
│  Authentification · Rate Limiting · Throttling · Versioning  │
│  Transformation · Routage · Monitoring · Analytics           │
└───────────────────────────┬──────────────────────────────────┘
                            │
       ┌────────────────────┼────────────────────┐
       ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  KEYCLOAK    │    │  SERVICE BUS  │    │  API STORE   │
│  IAM / SSO   │    │  Kafka/Rabbit │    │  (Portal Dev)│
│  OAuth2/OIDC │    │               │    │              │
└──────────────┘    └──────────────┘    └──────────────┘

┌──────────────────────────────────────────────────────────────┐
│                 MICROSERVICES MÉTIER                          │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐    │
│  │CREDIT  │ │EPARGNE │ │CLIENT  │ │COMPTA  │ │CAISSE  │    │
│  │octroi, │ │DAT,    │ │KYC,    │ │PCEMF,  │ │guichet,│    │
│  │suivi,  │ │tontine,│ │scoring,│ │états   │ │mobile  │    │
│  │recouv. │ │intérêts│ │docs    │ │        │ │        │    │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘    │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐    │
│  │LCB-FT  │ │REPORT. │ │NOTIF.  │ │SECURITE│ │AUDIT   │    │
│  │sanction│ │Jasper  │ │SMS,    │ │cryptage│ │trail,  │    │
│  │PEP     │ │Report  │ │Email   │ │IAM     │ │logs    │    │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘    │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│           INFRASTRUCTURE TRANSVERSE                           │
│  ELK Stack (Logging) · Prometheus/Grafana (Monitoring)       │
│  Jenkins/GitLab CI (CI/CD) · Docker/K8s (Orchestration)      │
│  PostgreSQL Cluster · Redis (Cache)                          │
└──────────────────────────────────────────────────────────────┘
```

### WSO2 API Manager — Configuration

| Composante | Rôle | Configuration recommandée |
|-----------|------|--------------------------|
| **API Gateway** | Point d'entrée unique. Authentifie chaque requête, applique rate limiting, route vers le microservice approprié | Cluster 2 nœuds minimum. Timeout 30s. Rate limit 100 req/s/client |
| **Key Manager** | Génération et validation tokens OAuth2. Intégration Keycloak | Délégation OAuth2 à Keycloak. Refresh token 30 min, Access token 15 min |
| **API Publisher** | Portail de publication des API. Documentation Swagger/OpenAPI | Accès restreint aux développeurs CBS. Workflow de validation avant publication |
| **Developer Portal** | Découverte des API pour partenaires (fintechs, mobile money) | Ouvert aux partenaires agréés. Souscription avec clé API unique |
| **Analytics** | Monitoring temps réel : latence, erreurs, volumes | Dashboard Grafana. Alerte si latence p95 > 200ms |
| **Traffic Manager** | Load balancing, failover, circuit breaker | Mode actif/passif. Bascule automatique si nœud primaire indisponible |

### Keycloak — Identity & Access Management

| Fonctionnalité | Application CBS | Configuration SFD |
|---------------|-----------------|-------------------|
| **SSO** | Un employé s'authentifie une fois pour tous les modules CBS | Session 8h. Inactivité timeout 15 min. Verrouillage après 5 échecs |
| **OAuth2 / OIDC** | Authentification standardisée API. Apps mobiles et partenaires externes | Authorization Code (web), Client Credentials (API partenaires) |
| **MFA** | Double facteur pour opérations sensibles (validation crédit > seuil, modification bénéficiaire, accès admin) | TOTP (Google Authenticator) ou SMS OTP. Obligatoire : Resp. Crédit, RAF, DG, Admin SI |
| **Roles & Permissions** | Gestion fine des habilitations conforme à la matrice de séparation des tâches G1.2.5 | Cf. KHEPRA_AI_GOVERNANCE.md §13.5.3 |
| **Identity Brokering** | Fédération avec partenaires externes (banques, mobile money) via SAML/OIDC | Configuration par partenaire. Certificats X.509 |
| **Audit Events** | Journalisation de tous les événements d'authentification | Logs → ELK. Rétention 5 ans minimum (COBAC) |

---

## A.3 — Jasper Report, ELK Stack, CI/CD, Haute Disponibilité

### Jasper Reports — Moteur de Reporting

| État réglementaire | Type | Fréquence | Format |
|-------------------|------|-----------|--------|
| Balance comptable PCEMF | Rapport tabulaire | Mensuelle | PDF, Excel |
| État des créances (classification COBAC) | Rapport avec sous-rapports | Mensuelle | PDF |
| États réglementaires COBAC (SURFI, BAFI) | Templates préconfigurés | Trim./Annuelle | PDF |
| Reporting LBC/FT (déclarations, statistiques) | Rapport paramétré | Mensuelle | PDF, Excel |
| États financiers (Bilan, CR, TFT) | Rapport structuré | Annuelle | PDF |
| Dashboard de gestion (KPI, ratios) | Dashboard JasperServer | Temps réel | HTML |
| Relevés de compte clients | Rapport matriciel | Mensuelle/À la demande | PDF |
| Échéanciers de crédit | Rapport avec calculs | Mensuelle/À la demande | PDF |

### ELK Stack (Elasticsearch, Logstash, Kibana)

| Composant | Rôle | Configuration SFD |
|-----------|------|-------------------|
| **Elasticsearch** | Stockage et indexation des logs. Recherche full-text | Cluster 3 nœuds. Index par jour. Rétention 365j hot, 5 ans cold (archive) |
| **Logstash** | Pipeline de collecte et transformation des logs | Pipelines : logs CBS, API Gateway, Keycloak, OS, sécurité. Parsing JSON natif |
| **Kibana** | Visualisation et exploration. Dashboards, alertes | Dashboards : Audit Trail, Performance CBS, Sécurité, Opérations métier, Erreurs |
| **Filebeat** | Agent léger sur chaque serveur pour expédier les logs | Déployé sur tous les serveurs. Configuration centralisée |

**Dashboards Kibana obligatoires** :
- **Audit Trail** : Toute modification de données sensibles (Qui, Quoi, Quand, Ancienne valeur, Nouvelle valeur)
- **Sécurité** : Tentatives d'authentification échouées, accès hors plage, élévations de privilège
- **Performance CBS** : Temps de réponse par service, taux d'erreur, pics de charge
- **Opérations Métier** : Volumes par type, agence, heure. Opérations rejetées, anomalies

### Pipeline CI/CD

```
[COMMIT] → [BUILD] → [TESTS UNITAIRES] → [TESTS INTÉGRATION]
                                              │
                                              ▼
┌──────────────────────────────────────────────────────────┐
│  ENVIRONNEMENTS : DEV → STAGING → PRE-PROD → PRODUCTION │
│  • DEV : Tests développeurs, intégration continue        │
│  • STAGING : Tests fonctionnels, recette métier          │
│  • PRE-PROD : Tests de performance, montée en charge     │
│  • PRODUCTION : GO-LIVE après validation formelle        │
└──────────────────────────────────────────────────────────┘

OUTILS : GitLab CI / Jenkins · Docker · Kubernetes (K8s) · ArgoCD
```

| Étape | Outils | SLA |
|-------|--------|-----|
| Build + Tests Unitaires (> 80% couverture) | Maven/Gradle + Docker | < 15 min |
| Tests d'Intégration | Postman/Newman, REST Assured | < 15 min |
| Analyse de Code | SonarQube | < 5 min |
| Scan de Sécurité (OWASP, Trivy) | OWASP Dependency Check | < 10 min |
| Déploiement Staging | Helm, ArgoCD | < 5 min |
| Tests de Performance | JMeter, Gatling | < 30 min |
| Déploiement Production | ArgoCD + validation humaine obligatoire | < 30 min |

> **Règle KHEPRA** : Le déploiement en production est la seule étape qui requiert une validation humaine obligatoire (Responsable Conformité + RSSI pour tout module LCB-FT, comptabilité ou sécurité).

### Haute Disponibilité (HA) — Objectif ≥ 99,9%

| Composant | Stratégie HA | Configuration |
|-----------|-------------|--------------|
| **Base de données PostgreSQL** | Cluster primaire-secondaire avec réplication synchrone. Failover automatique (Patroni) | Primary + 2 Standby. WAL archiving activé |
| **Serveurs applicatifs (Microservices)** | Load balancing avec ≥ 2 instances par service critique | Kubernetes auto-scaling. Health checks /10s. Redémarrage auto si crash |
| **API Gateway (WSO2)** | Cluster actif-actif | 2 nœuds minimum. Session sticky non nécessaire (API REST stateless) |
| **Keycloak** | Cluster avec réplication de session | 2 nœuds. Cache distribué (Infinispan) |
| **Réseau** | Double liaison (fibre principale + VSAT/SDSL secours) | Firewall redondé. VRRP. Bande passante secours ≥ 25% du principal |
| **Énergie** | Réseau + Groupe électrogène + Onduleur 30 min | Test groupe hebdomadaire. Autonomie carburant 72h |
| **Stockage** | SAN/NAS RAID 10. Snapshots quotidiens | RPO < 1h, RTO < 4h |
| **Site de Secours (DRP)** | Site distant ≥ 80 km, réplication asynchrone | RPO 4h, RTO 8h. Test annuel obligatoire (COBAC R-2008/01) |

---

## A.4 — Spécifications Matérielles

### Dimensionnement par Taille de SFD

| Composant | Petit SFD (< 5 agences, < 15k clients) | SFD Moyen (5-15 agences, 15-80k clients) | Grand SFD (> 15 agences, > 80k clients) |
|-----------|---------------------------------------|-------------------------------------------|----------------------------------------|
| **Serveur(s) Applicatif(s)** | 1-2 serveurs. 8 vCPU, 16 Go RAM | 2-3 serveurs. 16 vCPU, 32 Go RAM | 4+ serveurs. 32 vCPU, 64 Go RAM |
| **Base de données** | 1-2 serveurs. 8 vCPU, 32 Go RAM, SSD 500 Go RAID 10 | Cluster 2-3. 16 vCPU, 64 Go RAM, SSD 1 To RAID 10 | Cluster 3+. 32 vCPU, 128 Go RAM, SSD 2 To+ RAID 10 |
| **API Gateway / Keycloak** | Partagé avec applicatif | Dédiés. 4 vCPU, 8 Go RAM | Dédiés. 8 vCPU, 16 Go RAM |
| **ELK Stack** | 1 serveur. 8 vCPU, 32 Go RAM, SSD 1 To | 3 nœuds. 16 vCPU, 64 Go RAM, SSD 2 To | 5+ nœuds. 32 vCPU, 128 Go RAM, SSD 5 To+ |
| **Stockage & Sauvegarde** | NAS 1 To RAID 5. Sauvegarde externe quotidienne | NAS 5 To RAID 10. Cloud + bande LTO. 30j local, 5 ans archive | SAN 10 To+ RAID 10. Cloud + bande LTO. 90j local, 10 ans archive |
| **Bande passante siège** | Fibre 50 Mbps + VSAT 10 Mbps | Fibre 100 Mbps + VSAT 20 Mbps | Fibre 200 Mbps+ + VSAT 50 Mbps |
| **Bande passante/agence** | ADSL/Fibre 10 Mbps + VSAT 5 Mbps | Fibre 20 Mbps + VSAT 10 Mbps | Fibre 50 Mbps + VSAT 20 Mbps |

### Règles de Dimensionnement (par utilisateur simultané)

| Ressource | Conso/Utilisateur | Marge |
|-----------|------------------|-------|
| CPU | 0,5 vCPU (app) + 0,2 vCPU (DB) | +50% pics |
| RAM | 1 Go (app) + 0,5 Go (DB) | +40% cache/buffers |
| Stockage DB | 50 Mo/client/an (transactions) + 10 Mo/client/an (logs/audit) | +100% index |
| Bande passante | 128 Kbps (poste agence) + 256 Kbps (mobile/USSD) | +50% réplication DB |

---

## A.5 — Dispositifs de Sécurité

### Authentification Forte

| Dispositif | Application CBS |
|-----------|-----------------|
| **MFA** | TOTP/SMS OTP obligatoire pour : Admin SI, Resp. Conformité, DG, Resp. Crédit (validation > seuil) |
| **Politique Mots de Passe** | 12 caractères min, complexité (maj, min, chiffre, spécial). Expiration 90j. Historique 10 |
| **Verrouillage** | 5 échecs → verrouillage 30 min. Déverrouillage Admin SI |
| **Certificats X.509** | Authentification serveurs et partenaires externes. PKI interne ou CA reconnue |
| **Biométrie** | Empreinte digitale pour opérations sensibles en agence (retrait important, modification compte) |

### Cryptage

| Couche | Standard |
|--------|---------|
| **Transit** | TLS 1.3. Cipher suites ECDHE + AES-GCM 256 bits |
| **Repos** | AES-256 (PostgreSQL pg_tde ou filesystem encryption). Disques LUKS |
| **Données sensibles (KYC)** | AES-256-GCM avec clés HSM ou HashiCorp Vault. Chiffrement colonne par colonne |
| **Mots de passe** | bcrypt (cost ≥ 12) ou Argon2id |
| **Sauvegardes** | AES-256 avant stockage |

### Audit Trail

Toute action sur données sensibles est journalisée de manière immuable. Hash chaîné (Merkle tree) garantissant l'intégrité. Tentative de modification → détection automatique → alerte critique.

| Événement | Données journalistées | Rétention |
|-----------|----------------------|-----------|
| Authentification (connexion, échec, MFA) | Timestamp, utilisateur, IP, succès/échec | 5 ans (COBAC) |
| Modification données client (KYC, bénéficiaires) | Ancienne/Nouvelle valeur, module, IP | 10 ans (OHADA) |
| Opérations crédit (octroi, déblocage, remboursement) | N° crédit, montant, workflow validation | 10 ans |
| Opérations épargne (dépôt, retrait, clôture) | N° compte, montant, solde avant/après | 10 ans |
| Modification paramètres (taux, frais, produits) | Paramètre, ancienne/nouvelle valeur, workflow | Permanent |
| Opérations LCB/FT (déclaration soupçon, gel compte) | Type, références ANIF, motif | 10 ans |

### Archivage

| Type de données | Durée | Support |
|----------------|-------|--------|
| Données comptables | 10 ans (OHADA) | Serveur + bande LTO annuelle |
| Données clients (KYC, contrats, historique) | 10 ans après fin relation (COBAC) | Serveur + cloud cold storage |
| Logs audit trail | 10 ans minimum | ELK hot 365j → warm 3 ans → cold bande 10 ans |
| Rapports réglementaires | Permanent | Serveur + cloud |
| Correspondances régulateur | Permanent | Serveur + copie papier |

---

# PARTIE B — FONCTIONNALITÉS MÉTIERS MICROFINANCE

## B.1 — Crédits, Épargnes, Dépôts à Terme, Tontines

### Module Crédit — Cycle de Vie Complet

```
DEMANDE → INSTRUCTION → DÉCISION (Comité) → DÉBLOCAGE (Caisse) → SUIVI & RECOUVREMENT
   │           │              │                   │                      │
   ▼           ▼              ▼                   ▼                      ▼
 KYC        Analyse        Workflow            Contrat              Classification
 Complet    Financière     Validation          Échéancier           COBAC
 Scoring    Garanties      Seuils              Garanties            Provisionnement
```

**Fonctionnalités clés** :
- Instruction de crédit : KYC, analyse financière, scoring automatique, vérification garanties
- Calcul automatique du TEG (Taux Effectif Global) incluant tous les frais. Contrôle systématique du plafond 24% UEMOA
- Échéancier automatique (constant, dégressif, in fine, saisonnier). Prise en compte jours fériés
- Workflow de validation configurable : Agent → Resp. Agence → Comité Crédit Local → Comité Central → CCE (> 10M FCFA)
- Déblocage total/partiel avec vérification des conditions suspensives
- Classification automatique COBAC (Sain, ≤ 90j, 90-180j, 180-360j, > 360j) et provisionnement
- Restructuration / Rééchelonnement avec analyse d'impact TEG

### Module Épargne — Produits

| Produit | Caractéristiques |
|---------|-----------------|
| **Compte sur livret / Épargne à vue** | Dépôts/retraits libres. Intérêts trimestriels. Taux réglementé BCEAO/COBAC |
| **Dépôt à Terme (DAT)** | Durée 3-24 mois. Taux fixe ou variable. Pénalité retrait anticipé. Renouvellement auto |
| **Plan d'Épargne Projet** | Versements périodiques. Objectif défini. Prime de fidélité. Peut servir de garantie crédit |
| **CTIP (Compte à Terme Intérêts Progressifs)** | Taux croissant avec ancienneté et solde |
| **Épargne Groupe / Tontine** | Gestion de groupe avec parts. Distribution périodique. Solidarité des membres |

**Calcul des intérêts** : Méthode des soldes progressifs (quinzaine) pour l'épargne à vue — pratique standard BCEAO. Intérêts simples pour les crédits (Capital restant dû × Taux × n/365). Intérêts composés pour les DAT long terme.

### Module Tontine

- Création de groupe : membres (KYC), parts, montant par levée, périodicité, ordre de levée
- Gestion des levées (ordre fixe, aléatoire, enchères). Attribution automatique
- Suivi des cotisations. Alerte si retard. Pénalités automatiques. Suspension après X échéances impayées
- Solidarité : les membres garants les uns des autres. En cas de défaillance, les autres sont sollicités
- Comptabilisation automatique : collecte (dépôt), distribution (retrait), pénalités (produits)

---

## B.2 — Caisse/Guichet, Comptabilité, Reporting, Workflow

### Module Caisse/Guichet

| Fonctionnalité | Contrôle |
|---------------|----------|
| Opérations : dépôt, retrait, virement, change | Double contrôle retraits > seuil (validation superviseur) |
| Gestion espèces en temps réel | Plafond caisse par agence et guichetier. Alerte si dépassement |
| Ouverture/Clôture de caisse | Rapprochement automatique. Écart > seuil → Alerte Resp. Agence |
| Dépôt en banque / Approvisionnement | Rapprochement automatique avec relevé bancaire |
| Guichet mobile (agent banking) | Transactions hors ligne → synchro automatique. Limite/jour. Géolocalisation. Biométrie client |

### Module Comptabilité

| Fonctionnalité | Conformité |
|---------------|-----------|
| Plan Comptable PCEMF préconfiguré | Conforme au PCEMF en vigueur (BCEAO) |
| Écritures automatiques depuis opérations métier | Traçabilité complète : écriture liée à l'opération source |
| Saisie manuelle (inventaire, régularisation, clôture) | Validation RAF pour écritures > seuil |
| Balance comptable (6 colonnes officielles) | Format exigé BCEAO/COBAC |
| États financiers (Bilan, CR, TFT, Annexes) | SYCOHADA + normes COBAC |
| Clôture d'exercice assistée | Validation RAF + Commissaire aux Comptes. Irréversible après validation |
| Rapprochement bancaire automatique | Quotidien ou hebdomadaire selon volume |

### Reporting

| Type | Destinataire | Fréquence |
|------|-------------|-----------|
| Reporting réglementaire COBAC/BCEAO | Commission Bancaire | Mensuel/Trim./Annuel |
| Reporting LBC/FT | ANIF/CENTIF | Mensuel + temps réel |
| Dashboard Management | DG, CA | Mensuel |
| Reporting opérationnel | Responsables d'agence | Quotidien/Hebdo |
| Reporting financier | RAF, CAC, Investisseurs | Trim./Annuel |
| Reporting social (SPI4) | Partenaires ESG | Annuel |

### Workflow Engine — Principaux Processus

| Processus | Acteurs | SLA |
|-----------|---------|-----|
| **Octroi de crédit** | Agent Crédit → Resp. Conformité → Resp. Agence → Comité Crédit → Caisse | < 7j standard, < 48h urgence |
| **Ouverture de compte** | Guichetier → Scoring LCB-FT auto → Resp. Conformité si alerte | < 30 min agence, < 24h si manuel |
| **Modification paramètres produits** | Resp. Produit → RAF → Resp. Conformité → DG | < 5j |
| **Déclaration de soupçon LBC/FT** | Système/Agent → Resp. Conformité → DG → ANIF | < 24h après décision |
| **Clôture d'exercice** | RAF → DG → CAC | < 30j après fin exercice |

---

## B.3 — Modules Avancés

### KYC (Know Your Customer)

- Identification client : nom, date/lieu naissance, nationalité, profession, adresse, pièces justificatives scannées
- Scoring KYC automatique /100. Score minimum 80/100 pour activation
- Détection automatique PPE (Personne Politiquement Exposée) avec due diligence renforcée
- Révision périodique : annuelle (standard), semestrielle (PPE), trimestrielle (haut risque)

### LCB-FT

- Filtrage sanctions automatique (ONU, OFAC, UE, France, ANIF/CENTIF) à l'ouverture et à chaque transaction
- Profilage de risque LCB/FT (Faible/Modéré/Élevé) recalculé à chaque événement déclencheur
- Surveillance des transactions en temps réel. Détection anomalies (montant, fréquence, structuration)
- Workflow déclaration de soupçon : alerte → analyse Conformité → décision DG → transmission ANIF
- Suivi formation LCB/FT du personnel : 100% du personnel exposé formé (exigence COBAC)

### Finance Islamique

| Produit | Principe | Paramétrage CBS |
|---------|---------|-----------------|
| **Mourabaha** | Institution achète le bien, le revend avec marge convenue | Prix achat + Marge. Échéancier constant. Pas de pénalité (don au fonds social) |
| **Moudaraba** | Institution apporte capital, client le travail. Bénéfices partagés | Ratio de partage paramétrable. Suivi trimestriel/annuel |
| **Qard Hassan** | Prêt social sans intérêt. Seuls frais réels facturés | Taux 0%. Frais de gestion fixes. Fonds dédiés |
| **Épargne conforme Sharia** | Pas d'intérêts. Participation aux bénéfices | Distribution annuelle des surplus basée sur solde moyen |
| **Ijarah** | Institution acquiert actif et le loue au client | Loyer fixe. Option d'achat. Valeur résiduelle |

### Gestion des Actionnaires

- Registre des actionnaires : capital, actions, détention. Historique des mouvements
- Calcul automatique des dividendes selon détention
- Convocation automatique aux AG. Suivi présences et procurations
- Calcul droits de vote, quorum et majorité

### Performances Sociales (SPI4)

| Indicateur | Source CBS |
|-----------|-----------|
| Portée (Outreach) : nombre clients, genre, zone rurale/urbaine | Module Client (KYC) |
| Qualité services : attrition, satisfaction, délai traitement, réclamations | Module Crédit + Réclamations |
| Protection clients : surendettement (PAR 30), transparence (TEG), réclamations | Module Crédit + Conformité |
| Responsabilité sociale personnel : effectifs, genre, rotation, formation | Module RH |
| Impact communauté : ménages sortis pauvreté, emplois créés, éducation financière | Module Crédit + Enquêtes terrain |

---

## B.4 — Automatisation des Processus

### Batch de Fin de Journée (TFJ) — Séquence Critique

```
[18:00] FERMETURE GUICHETS → DÉBUT TFJ
  ├── 1. VÉRIFICATION INTÉGRITÉ (18:00-18:15)
  │   ├── Rapprochement caisses automatique
  │   ├── Vérification équilibre écritures comptables
  │   └── Détection anomalies (écarts, écritures orphelines)
  ├── 2. CALCULS FINANCIERS (18:15-19:00)
  │   ├── Calcul intérêts créditeurs (épargne vue, DAT)
  │   ├── Calcul intérêts débiteurs (crédits)
  │   ├── Application échéances crédit
  │   ├── Calcul pénalités de retard
  │   ├── Classification automatique créances (COBAC)
  │   └── Calcul provisions
  ├── 3. OPÉRATIONS COMPTABLES (19:00-19:30)
  │   ├── Comptabilisation intérêts, provisions, amortissements
  │   └── Génération OD de régularisation (si fin de mois)
  ├── 4. REPORTING & ÉTATS (19:30-20:00)
  │   ├── Balance comptable quotidienne
  │   └── États réglementaires (si fin de mois)
  ├── 5. SAUVEGARDE & RÉPLICATION (20:00-20:30)
  │   ├── Sauvegarde DB → Site de secours
  │   └── Archivage logs
  └── 6. NOTIFICATIONS & ALERTES (20:30-21:00)
      ├── Envoi alertes SMS/Email (échéances, impayés)
      ├── Rapport TFJ au RAF et DG
      └── Alerte si anomalie détectée
[21:00] FIN TFJ
```

**Tolérance** : Étapes idempotentes (rejouables sans risque). Mode dégradé : opérations du lendemain possibles même si batch non terminé (tolérance 24h).

### Alertes SMS/Email Automatisées

| Alerte | Déclencheur | Destinataire |
|--------|------------|-------------|
| Échéance crédit imminente | J-3, J-1 | Client emprunteur |
| Retard remboursement | J+1, J+7, J+15, J+30 | Client emprunteur |
| Confirmation opération | Immédiat après dépôt/retrait/virement | Client |
| Solde faible | Solde < seuil | Client épargnant |
| Échéance DAT | J-15, J-7 | Client épargnant |
| Document KYC expirant | J-30 avant expiration | Client |
| Alerte seuil réglementaire | Ratio franchissant seuil d'alerte | RAF, DG, Resp. Conformité |
| Anomalie TFJ | Échec étape batch | RAF, Admin SI |
| Tentative intrusion | 5 échecs auth, accès suspect | RSSI, Admin SI |
| Dépassement plafond caisse | Solde > plafond | Resp. Agence, RAF |

---

# PARTIE C — CONFORMITÉ RÉGLEMENTAIRE & GOUVERNANCE

## C.1 — Exigences BCEAO (UEMOA) et COBAC (CEMAC)

### Textes Applicables aux SFD — Zone UEMOA (BCEAO)

| Texte | Objet |
|-------|-------|
| Loi portant réglementation des SFD (2019) | Cadre juridique. Catégories (IMF, EMF), agrément, opérations autorisées |
| Instruction BCEAO N° 01/2019/SP | Ratios prudentiels, normes de gestion, reporting |
| Instruction BCEAO N° 02/2019/SP | Plan Comptable des SFD (PCEMF) |
| Circulaire relative au contrôle interne | Dispositif de contrôle interne, audit interne |
| Directive UMOA LBC/FT (02/2015) | KYC, déclaration de soupçon, filtrage sanctions |
| Règlement UEMOA Protection des Données (2020) | Confidentialité, sécurité, droit d'accès |

### Textes Applicables — Zone CEMAC (COBAC)

| Texte | Objet |
|-------|-------|
| Règlement COBAC R-2016/01 | Contrôle interne (3 lignes de défense) |
| Règlement COBAC R-2018/01 | LBC/FT renforcée |
| Règlement COBAC R-98/03 | Grands risques et concentration |
| Règlement COBAC R-2005/01 | Obligations de vigilance LBC/FT (Art. 54) |
| Règlement COBAC R-2008/01 | Plan de Continuité d'Activité (PCA) |
| Circulaire N° 001-2017/CB/C | Gouvernement d'entreprise |
| Circulaire N° 002-2017/CB/C | Conditions d'exercice Admin. et Dirigeants |
| Circulaire N° 001-2020/CB/C | Plans Préventifs de Redressement (PPR) |
| Circulaire N° 002-2020/CB/C | Contrôle interne, risques, réclamations |
| Circulaire N° 003-2020/CB/C | Régime de résolution des crises bancaires |

### Reporting Réglementaire

| État | Autorité | Fréquence | Délai transmission |
|------|----------|-----------|-------------------|
| SURFI | COBAC | Mensuelle | 15 du mois suivant |
| BAFI | COBAC | Trimestrielle | 30 jours après trimestre |
| États LCB/FT | ANIF/CENTIF | Mensuelle | 15 du mois suivant |
| Rapport Semestriel Contrôle Interne | COBAC/BCEAO | Semestrielle | 60 jours après semestre |
| Rapport Annuel SCI & Risques | COBAC/BCEAO | Annuelle | 90 jours après clôture |
| États Financiers Annuels | COBAC/BCEAO | Annuelle | 4 mois après clôture |
| PPR | COBAC/BCEAO | Annuelle/Bisannuelle | Selon statut |

---

## C.2 — Ratios Prudentiels, Agrément, LBC/FT, Protection Données, Cybersécurité

### Ratios Prudentiels SFD (Zone UEMOA)

| Ratio | Calcul | Norme BCEAO | Seuils Alerte KHEPRA |
|-------|--------|------------|----------------------|
| **Capital minimum** | Capital libéré ≥ seuil par catégorie | 50M - 1Md FCFA | < 110% du minimum → Orange |
| **Couverture emplois stables** | Ressources stables / Emplois stables | ≥ 100% | < 110% → Orange |
| **Ratio de liquidité** | Actifs liquides / Exigibilités CT | ≥ 100% | < 110% → Orange, < 100% → Rouge |
| **Capitalisation** | Fonds propres nets / Encours crédits | ≥ 15% | < 18% → Orange, < 15% → Rouge |
| **Division des risques** | Engagement max/bénéficiaire / FP nets | ≤ 25% | > 20% → Orange, > 25% → Rouge |
| **PAR 90** | Créances douteuses > 90j / Encours total | < 5% | > 5% → Orange, > 10% → Plan apurement |
| **Couverture créances douteuses** | Provisions / Créances douteuses | ≥ 70% | < 60% → Rouge |

### Procédure d'Agrément SFD (UEMOA) — 4 Phases

```
PHASE 1 — CONSTITUTION DU DOSSIER (2-4 mois)
├── Statuts conformes AUSCGIE OHADA
├── Business Plan 5 ans
├── Manuels : Crédit, Épargne, Contrôle Interne, LBC/FT
├── Organigramme
├── CV, casiers judiciaires, déclarations Dirigeants
├── Preuve libération capital minimum
└── Protocole d'accords (si groupe/réseau)

PHASE 2 — INSTRUCTION BCEAO (4-8 mois)
├── Dépôt Direction Nationale BCEAO
├── Instruction technique
├── Entretiens Dirigeants
├── Visite locaux
└── Avis Direction Nationale

PHASE 3 — DÉCISION (2-4 mois)
├── Transmission Commission Bancaire UMOA
├── Examen
└── Décision : Agrément accordé / refusé / compléments

PHASE 4 — POST-AGRÉMENT
├── Publication JO
├── Immatriculation RCCM
├── Premier reporting BCEAO
└── Première inspection (12-18 mois)

DURÉE TOTALE : 10 à 18 mois
```

### Obligations LBC/FT

| Obligation | Sanction manquement |
|-----------|-------------------|
| KYC : identification avant ouverture compte. Conservation 10 ans | Amende, retrait d'agrément |
| Déclaration de soupçon à l'ANIF/CENTIF. Interdiction d'informer le client | Sanction pénale, emprisonnement |
| Filtrage sanctions (ONU, OFAC, UE, nationales) à l'ouverture et à chaque transaction | Gel obligatoire des avoirs |
| Formation initiale + continue de 100% du personnel exposé LBC/FT | Non-conformité inspection |
| Audit externe LBC/FT ≥ tous les 2 ans | Rapport exigé par le régulateur |

### Protection des Données Personnelles

| Obligation | Application CBS |
|-----------|-----------------|
| Consentement explicite | Case à cocher dans formulaire ouverture de compte |
| Finalité déterminée et légitime | Gestion compte, octroi crédit, obligations réglementaires |
| Minimisation | Pas de collecte de données non essentielles |
| Durée limitée | KYC 10 ans après fin relation. Logs 5-10 ans |
| Sécurité | Chiffrement, contrôle d'accès, audit trail, pentests |
| Droit d'accès/rectification | Procédure formalisée. Réponse < 30 jours |
| Notification violations | Procédure urgence. Notification < 72h |

### Cybersécurité

| Exigence | Référence |
|----------|----------|
| Politique de sécurité SI formalisée, approuvée CA | ISO 27001, COBAC R-2016/01 |
| RSSI nommé formellement | Rattachement DG ou Comité d'Audit |
| Tests d'intrusion annuels (externe + interne) | Bonne pratique COBAC |
| PCA documenté, testé annuellement | COBAC R-2008/01 |
| Sauvegardes quotidiennes, test restauration trimestriel | COBAC R-2008/01 |
| Sensibilisation personnel (initiale + trimestrielle) | ISO 27001 §7.2.2 |

---

## C.3 — Statuts Types AMIFA Gabon SA

AMIFA (African Microfinance Institution for Africa) Gabon SA est une société anonyme de microfinance de droit gabonais, supervisée par la COBAC. Ses statuts types illustrent les exigences juridiques et de gouvernance pour un SFD en zone CEMAC.

### Structure des Statuts Types

```
TITRE I — FORME, DÉNOMINATION, OBJET, SIÈGE, DURÉE
  Art. 1 — Forme : SA de droit gabonais régie par AUSCGIE (OHADA),
           réglementation COBAC, présents statuts
  Art. 2 — Dénomination : « AMIFA GABON S.A. »
  Art. 3 — Objet Social : Collecte épargne, octroi crédits CT/MT/LT,
           opérations trésorerie, change manuel, conseil/formation
  Art. 4 — Siège Social : Libreville, Gabon
  Art. 5 — Durée : 99 ans à compter de l'immatriculation RCCM

TITRE II — CAPITAL SOCIAL, ACTIONS, ACTIONNAIRES
  Art. 6 — Capital : [X] FCFA divisé en [N] actions de [Valeur] FCFA
  Art. 7 — Modification par AGE, dans le respect du minimum COBAC

TITRE III — ADMINISTRATION ET DIRECTION
  Art. 12 — Conseil d'Administration : 3 à 12 membres, mandat 3-6 ans
  Art. 15 — Comités Spécialisés : CAR (obligatoire), CBGR, CCE
  Art. 18 — Direction Générale : DG nommé par le CA

TITRE IV — COMMISSAIRES AUX COMPTES
  Art. 22 — ≥ 1 titulaire + 1 suppléant

TITRE V — ASSEMBLÉES GÉNÉRALES
  Art. 25 — AGO ≥ 1 fois/an pour statuer sur les comptes

TITRE VI — EXERCICE SOCIAL, COMPTES, AFFECTATION RÉSULTAT
  Art. 30 — Exercice : 1er janvier — 31 décembre
```

### Points Clés de Gouvernance

| Élément | Prescription | Référence |
|---------|-------------|-----------|
| **Forme** | SA obligatoire pour EMF grande taille | Règlement COBAC |
| **Capital** | Libération intégrale à la constitution | Instruction COBAC |
| **Administrateurs** | 3-12 membres. Mandat 3-6 ans. Nationalité UMOA (sauf dérogation) | Circ. N° 002-2017/CB/C |
| **Comités** | CAR obligatoire, CBGR recommandé, CCE selon taille | Circ. N° 001-2017/CB/C |
| **Séparation PCA/DG** | PCA ≠ DG. Rôles distincts | Bonne pratique |
| **CAC** | ≥ 1 titulaire + 1 suppléant agréés COBAC | Règlement COBAC |
| **AGO** | Obligatoire. Approbation comptes < 6 mois clôture | AUSCGIE |
| **Conventions réglementées** | Autorisation préalable CA | AUSCGIE |

---

## C.4 — Procédures d'Agrément FinAfrica Togo

### Dossier d'Agrément Complet

```
SECTION 1 — DOCUMENTS JURIDIQUES ET STATUTAIRES
  1.1 Statuts conformes AUSCGIE, loi UMOA SFD, Instruction BCEAO 01/2019/SP
  1.2 Déclaration de régularité et conformité (notaire)
  1.3 Certificat d'immatriculation RCCM
  1.4 Attestation de libération du capital social

SECTION 2 — GOUVERNANCE ET DIRIGEANTS
  2.1 Organigramme détaillé (AG → CA → Comités → DG → Comités Opérationnels)
  2.2 CV détaillés des Administrateurs et Dirigeants
  2.3 Extraits de casier judiciaire (< 3 mois)
  2.4 Déclaration sur l'Honneur (Annexe 1 — Circ. N° 02-2017/CB/C)
  2.5 Déclaration de Conflit d'Intérêts (Annexe 2 — 8 tables standardisées)
  2.6 Requête de dérogation à la nationalité (si applicable)

SECTION 3 — PLAN D'AFFAIRES (BUSINESS PLAN)
  3.1 Présentation institutionnelle (mission, vision, valeurs)
  3.2 Étude de marché (marché togolais, segmentation, concurrence)
  3.3 Stratégie commerciale (produits, prix TEG < 24%, canaux, marketing)
  3.4 Plan de développement (agences, effectifs, investissements)
  3.5 Modèle financier 5 ans (CR, Bilan, Trésorerie, Ratios, 3 scénarios)

SECTION 4 — MANUELS DE PROCÉDURES
  4.1 Manuel de Crédit (politique, processus, typologies, recouvrement, provisionnement)
  4.2 Manuel d'Épargne (produits, opérations, intérêts, DAT)
  4.3 Manuel de Contrôle Interne (3 lignes défense, risques, réclamations, reporting)
  4.4 Manuel LBC/FT (KYC, sanctions, profilage, déclaration soupçon, formation)
  4.5 Manuel de Trésorerie (flux, banques, plafonds, rapprochements)
  4.6 Manuel de Sécurité SI (politique, accès, sauvegardes, PCA, incidents)
  4.7 Manuel RH (recrutement, formation, évaluation, séparation tâches G1.2.5)

SECTION 5 — INFRASTRUCTURES ET SI
  5.1 Description des locaux (siège, agences pilotes)
  5.2 Architecture SI et CBS (solution retenue, architecture, PCA/DRP)
  5.3 Contrats (baux, services, assurance)

SECTION 6 — PROTOCOLE D'ACCORDS (SI APPLICABLE)
  6.1 Protocole entre actionnaires fondateurs
  6.2 Convention d'assistance technique (si partenaire technique)
  6.3 Convention de refinancement (si partenaires financiers)
```

### Calendrier Type

| Étape | Durée |
|-------|-------|
| Constitution du dossier | 2-4 mois |
| Dépôt à la Direction Nationale BCEAO | J0 |
| Vérification administrative | 15 jours |
| Instruction technique | 3-6 mois |
| Demandes de compléments (si applicable) | +1-2 mois |
| Avis Direction Nationale BCEAO | Fin instruction |
| Transmission Commission Bancaire UMOA | +1 mois |
| Décision Commission Bancaire | 1-3 mois |
| Notification officielle | +15 jours |
| Publication Journal Officiel | 1 mois |
| **Durée totale** | **10-18 mois** |

---

# PARTIE D — ÉTUDE DE MARCHÉ & POSITIONNEMENT STRATÉGIQUE

## D.1 — Marché Togolais

### Données Clés

| Indicateur | Valeur |
|-----------|--------|
| Population | ~8,6 millions (2025) |
| Taux d'inclusion financière UEMOA | 63% (adultes avec compte formel) |
| Taux d'inclusion financière Togo | ~62% |
| Taux de bancarisation stricte | ~25% |
| Part des SFD dans l'inclusion financière | ~35% des adultes |
| Nombre de SFD agréés au Togo | ~180 |
| Encours de crédit SFD togolais | ~180 milliards FCFA |
| Encours d'épargne SFD togolais | ~140 milliards FCFA |
| Nombre de TPME | ~300 000 |
| TPME avec accès au crédit formel | < 15% |
| Pénétration mobile money | > 80% |

### Besoins des TPME Togolaises

| Secteur | Besoin type | Montant moyen | Institution |
|---------|------------|---------------|-------------|
| Agriculture (vivrier, élevage) | Fonds de roulement saisonnier, intrants | 500k - 5M FCFA | SFD |
| Commerce (gros, détail) | Stock, équipement | 1M - 20M FCFA | SFD (mésofinance) |
| Services (couture, mécanique, restauration) | Équipement, aménagement | 500k - 3M FCFA | SFD |
| Artisanat (menuiserie, soudure) | Matières premières | 300k - 2M FCFA | SFD |
| Transport (moto-taxi, taxi) | Achat véhicule | 1M - 8M FCFA | SFD |
| Immobilier (construction progressive) | Matériaux par tranches | 5M - 30M FCFA | SFD ou Banque |

### Contraintes d'Accès au Crédit des TPME

| Contrainte | Impact |
|-----------|--------|
| Garanties insuffisantes (pas de titre foncier) | Montant plafonné |
| Formalisation faible (pas de comptabilité) | Difficulté d'analyse financière |
| Coût du crédit élevé (TEG proche 24%) | Prohibitif pour commerces à faible marge |
| Délais de traitement longs (2-4 semaines) | Trop lent pour opportunités urgentes |
| Méconnaissance des produits bancaires | Sous-utilisation des services |
| Saisonnalité des revenus | Incompatibilité échéances mensuelles fixes |

### Rôle Clé des SFD

1. **Proximité géographique** : présents en zones rurales où les banques sont absentes
2. **Adaptation des produits** : petits montants, épargne sans solde minimum, garanties alternatives
3. **Coût de transaction acceptable** : crédits de montants et durées que les banques refusent
4. **Éducation financière** : agents de crédit formant à la gestion de trésorerie
5. **Financement de l'informel** : 85% des emplois togolais sont informels. Les SFD acceptent des preuves alternatives de revenus

---

## D.2 — Positionnement FinAfrica Togo

### Stratégie

```
┌──────────────────────────────────────────────────────────────┐
│  POSITIONNEMENT : MÉSOFINANCE DIGITALE AFRICAINE              │
│                                                               │
│  « SFD de référence pour les TPME togolaises, combinant       │
│    proximité terrain et innovation technologique fintech. »   │
└──────────────────────────────────────────────────────────────┘

SEGMENTS CIBLES :
├── AGRICULTURE : maraîchers, éleveurs, coopératives, transformateurs
├── COMMERCE : détaillants, grossistes, importateurs
└── SERVICES & IMMOBILIER : artisans, transport, construction, hôtellerie

MONTANT CIBLE : 500 000 — 30 000 000 FCFA (Mésofinance)

PRODUITS PHARES :
├── CRÉDIT : Agricole, Commerce, Équipement, Habitat, Urgence
├── ÉPARGNE : DAT Avantage, Épargne Projet, Tontine Digitale, Compte Salarié
└── DIGITAL : Mobile App, USSD, Agent Banking, SMS Alerts, QR Paiement
```

### Avantage Concurrentiel

| Axe | FinAfrica Togo | SFD classiques | Banques |
|-----|---------------|----------------|---------|
| **Digitalisation** | CBS moderne, app mobile, USSD, agent banking | Processus manuels, pas d'app | App non adaptée TPME informelles |
| **Proximité** | Agences + réseau agents itinérants | Agences uniquement | Zones urbaines seulement |
| **Rapidité** | Scoring auto + workflow digital. < 48h | 2-4 semaines | 4-8 semaines |
| **Coût** | TEG 18-22% (digitalisation réduit CAC) | TEG 22-24% | TEG 8-15% mais inaccessible |
| **Montants** | 500k - 30M FCFA (mésofinance) | 50k - 5M FCFA | > 10M FCFA |
| **Garanties** | Alternatives : caution, nantissement stock, garantie communautaire | Caution solidaire | Garanties réelles obligatoires |

### Partenariats Stratégiques

| Type | Partenaires potentiels | Objectif |
|------|----------------------|----------|
| **Financiers** | Banques commerciales, IFC, BAD, AFD | Refinancement, lignes de crédit, garantie portefeuille |
| **Techniques** | Fournisseur CBS (Ynover), Togocom, Moov Africa | SI, USSD, mobile money |
| **Institutionnels** | Ministères (Agriculture, Commerce), API, FAIEJ, ANPGF | Programmes sectoriels, subventions, garanties |
| **Communautaires** | Associations commerçants, coopératives agricoles, groupements femmes | Distribution, caution, éducation financière |
| **Digitaux** | PayDunya, Flutterwave, Fintechs KYC | Paiement digital, vérification identité, scoring alternatif |

---

## D.3 — Opportunités et Défis

### Opportunités

| Opportunité | Certitude |
|------------|----------|
| Marché sous-pénétré en mésofinance (segment 5M-15M FCFA peu couvert) | Élevé |
| Digitalisation différenciante face aux SFD classiques faiblement digitalisés | Élevé |
| Forte pénétration mobile money (> 80%) permettant interopérabilité CBS ↔ mobile money | Élevé |
| Soutien des politiques publiques (PND, feuille de route présidentielle 2025) | Modéré |
| Financement des chaînes de valeur agricoles structurées (coton, soja, anacarde) | Modéré |
| Jeunesse (60% < 25 ans) : adoption digitale, entrepreneuriat jeune | Élevé |

### Défis et Stratégies de Mitigation

| Défi | Mitigation |
|------|-----------|
| **Risque de crédit élevé** | Scoring comportemental (mobile data), caution solidaire, crédit progressif, diversification |
| **Gouvernance** | Architecture COBAC-compliant (§4.10), séparation PCA/DG, comités effectifs, PV documentés |
| **Éducation financière clients** | Programme obligatoire avant premier crédit. App mobile avec interface simplifiée (pictogrammes, audio) |
| **Inclusion femmes et jeunes** | Produits dédiés (crédit groupe féminin, épargne jeune), agent banking féminin |
| **Risque de change** | Limitation exposition devises. Couverture via maison mère ou partenaires bancaires |
| **Rétention talents** | Formation interne, rémunération attractive, plan carrière, actionnariat salarié à terme |
| **Cybersécurité** | RSSI dédié, pentests annuels, PCA testé, formation sécurité, assurance cyber |

---

# PARTIE E — MÉTHODOLOGIE PROJET & AGILITÉ

## E.1 — Approche Agile Scrum pour le Déploiement CBS

### Cadre Scrum Adapté au Contexte SFD

```
┌──────────────────────────────────────────────────────────────┐
│  RÔLES SCRUM                                                  │
│                                                               │
│  PRODUCT OWNER (PO)         SCRUM MASTER (SM)                │
│  • DG ou DGA du SFD         • Chef de Projet PMO             │
│  • Définit la vision        • Garantit le cadre Scrum        │
│  • Priorise le backlog      • Facilite les cérémonies        │
│  • Valide les incréments    • Lève les obstacles             │
│                                                               │
│  ÉQUIPE DE DÉVELOPPEMENT                                     │
│  • Consultant CBS · Intégrateur CBS · Admin SI SFD           │
│  • Équipe métier SFD (RAF, Resp. Crédit, Resp. Conformité)   │
└──────────────────────────────────────────────────────────────┘

CÉRÉMONIES :
├── SPRINT PLANNING (2h) — Début de sprint
├── DAILY SCRUM (15 min) — Chaque matin
├── SPRINT REVIEW (1h) — Fin de sprint : démo au PO
└── SPRINT RETROSPECTIVE (1h) — Fin de sprint : amélioration continue

CYCLE SPRINT : 2 semaines
```

### Product Backlog — Exemple (Déploiement CBS 6 mois)

| EPIC | User Story clé | Priorité | Sprint |
|------|---------------|---------|--------|
| **Infrastructure SI** | Déployer serveurs CBS en cluster HA + VPN inter-agences | P0 | 1-2 |
| **Module Client & KYC** | Créer nouveau client KYC + Filtrage automatique sanctions | P0 | 2-3 |
| **Module Crédit** | Instruire dossier crédit (analyse, scoring, TEG) + Workflow validation | P0 | 3-5 |
| **Module Épargne** | Ouvrir compte épargne, dépôt/retrait + Souscrire DAT | P0/P1 | 5-7 |
| **Module Comptabilité** | Génération automatique écritures PCEMF + Rapprochement bancaire | P0 | 6-8 |
| **Module Reporting** | Dashboard DG (KPI) + États réglementaires COBAC automatiques | P1/P0 | 8-10 |
| **Mobile & USSD** | Consultation solde/échéancier USSD + Alertes SMS | P1 | 9-11 |
| **Migration & GO-LIVE** | Migrer données historiques + Tests charge et bout-en-bout | P0 | 10-12 |

### Definition of Done (DoD)

Chaque User Story est « Done » si :
- Code développé et revu (code review)
- Tests unitaires passés (couverture > 80%)
- Tests fonctionnels validés par le PO
- Documentation utilisateur rédigée (français)
- Déploiement STAGING réussi + Démo au PO effectuée
- Validation formelle PO
- Aucun bug P0/P1 ouvert
- Conformité réglementaire vérifiée (LCB/FT, PCEMF, TEG si applicable)
- Sécurité vérifiée (scan OWASP si applicable)

### Indicateurs Agiles

| Métrique | Cible | Alerte |
|----------|-------|--------|
| Vélocité d'équipe | Stable, variation < 20% | Baisse > 30% → investigation |
| Sprint Goal atteint | ≥ 90% | < 70% → rétrospective approfondie |
| Taux complétion backlog sprint | > 85% story points | < 70% → obstacle non identifié |
| Délai résolution bugs | < 48h P0, < 5j P1 | P0 > 72h → escalade |
| Satisfaction PO | ≥ 4/5 | ≤ 2/5 → rétrospective spécifique |

---

## E.2 — Méthodologie de Migration des Données

La migration des données est l'étape la plus risquée d'un projet CBS. Une erreur peut entraîner une perte de données, des erreurs comptables et un risque réglementaire.

### Phases de Migration

```
PHASE 1 — EXTRACTION & NETTOYAGE
├── ① Extraction complète : Clients (KYC), Comptes épargne, Crédits (encours,
│      échéanciers, garanties), Comptabilité (balance, grand-livre), Tontines,
│      Paramètres (produits, taux, frais)
├── ② Analyse et profilage : Identification anomalies (doublons, incohérences,
│      champs obligatoires absents, incohérences inter-entités)
└── ③ Nettoyage : Correction anomalies documentées, déduplication, normalisation
       (noms, adresses, téléphones), complétion données manquantes, validation
       avec les métiers (RAF, Resp. Crédit)

PHASE 2 — MAPPING & TRANSFORMATION
├── ④ Mapping source → cible : Table de correspondance champ à champ.
│      Transformation (format, codification). Enrichissement (calculs auto,
│      valeurs par défaut). Gestion données non migrables (archivage à part)
└── Scripts de transformation testés sur échantillon

PHASE 3 — IMPORTATION & VALIDATION
├── ⑤ Importation environnement TEST : Premier import complet. Journal d'import
│      (succès, erreurs, avertissements). Correction erreurs
└── ⑥ Tests de validation :
       · Rapprochement balance comptable avant/après → Écart = 0
       · Rapprochement encours crédit avant/après → Écart = 0
       · Rapprochement collecte épargne avant/après → Écart = 0
       · Vérification échantillon : 10% clients, 100% gros soldes (> seuil)
       · Vérification chaînage : tout crédit lié à un client et un compte

PHASE 4 — RÉPÉTITION & GO-LIVE (4 itérations minimum)
├── Importation PRE-PROD (Itération 1) → Tests → Corrections
├── Importation PRE-PROD (Itération 2) → Tests → Corrections
├── Importation PRE-PROD (Itération 3) → Tests → Corrections
├── Importation PRODUCTION (Répétition générale) → Tests complets
└── GO-LIVE : Bascule officielle. Ancien système en lecture seule.
     Support renforcé 2 semaines
```

### Échantillonnage de Validation

| Type de donnée | Échantillon | Méthode |
|---------------|------------|---------|
| Gros soldes d'épargne | 100% des comptes > 5M FCFA | Comparaison solde, intérêts courus, historique 12 mois |
| Gros encours de crédit | 100% des crédits > 10M FCFA | Comparaison capital restant dû, échéancier, impayés, garanties |
| Clients | 10% aléatoire, 100% PPE, 100% clients haut risque | Comparaison KYC complet, scoring, documents |
| Comptabilité | Balance complète + 5% des écritures en détail | Comparaison balance (6 colonnes), échantillon écritures |
| Tontines | 10% des groupes | Comparaison membres, parts, historique levées |

### Règles Fondamentales de la Migration

| N° | Règle | Justification |
|----|-------|---------------|
| 1 | **Aucune perte de données** — toute donnée non migrable est archivée avec traçabilité | Risque réglementaire si perte de données comptables ou KYC |
| 2 | **Équilibre comptable strict** — la balance avant migration = balance après migration, au centime près | Exigence absolue du RAF et du Commissaire aux Comptes |
| 3 | **Données de référence avant transactions** — paramètres, produits, agences, utilisateurs migrés AVANT les données transactionnelles | Dépendance référentielle |
| 4 | **Idempotence** — chaque script est conçu pour être rejoué sans risque de doublon | Permet les itérations de test |
| 5 | **Validation métier systématique** — le RAF, le Responsable Crédit et le Responsable Conformité valident chaque phase | Garantit la qualité et l'acceptation |
| 6 | **Ancien système en lecture seule après GO-LIVE** — jamais de double saisie | Évite les divergences de données |

---

# GLOSSAIRE DES TERMES CLÉS

| Terme | Définition |
|-------|-----------|
| **APIM (API Manager)** | Passerelle centralisée de gestion, sécurisation et monitoring des API du CBS (ex: WSO2) |
| **Audit Trail** | Piste d'audit immuable journalisant toute action sur les données sensibles |
| **BAFI** | Base des Agents Financiers — état réglementaire COBAC trimestriel |
| **BRMS** | Business Rules Management System — moteur de règles métier (paramétrage sans code) |
| **CBS** | Core Banking System — système d'information central de l'institution financière |
| **CI/CD** | Continuous Integration / Continuous Deployment — pipeline automatisé de build, test et déploiement |
| **COBAC** | Commission Bancaire de l'Afrique Centrale — superviseur des SFD en zone CEMAC |
| **DAT** | Dépôt à Terme — épargne bloquée pour une durée fixe avec taux garanti |
| **DRP** | Disaster Recovery Plan — plan de reprise après sinistre (site de secours distant) |
| **ELK** | Elasticsearch + Logstash + Kibana — plateforme centralisée de gestion des logs |
| **EMF** | Établissement de Microfinance (terminologie UEMOA) |
| **HA** | High Availability — haute disponibilité (objectif ≥ 99,9%) |
| **HSM** | Hardware Security Module — module matériel sécurisé pour la gestion des clés de chiffrement |
| **IAM** | Identity and Access Management — gestion des identités et des accès (ex: Keycloak) |
| **KRI** | Key Risk Indicator — indicateur clé de risque |
| **KYC** | Know Your Customer — procédure d'identification et de vérification des clients |
| **LCB-FT** | Lutte Contre le Blanchiment de Capitaux et le Financement du Terrorisme |
| **MFA** | Multi-Factor Authentication — authentification à plusieurs facteurs |
| **PAR** | Portefeuille À Risque — indicateur de la qualité du portefeuille de crédit (PAR 1, 30, 90) |
| **PCA** | Plan de Continuité d'Activité |
| **PCEMF** | Plan Comptable des Établissements de Microfinance (BCEAO) |
| **PEP** | Personne Politiquement Exposée |
| **PMO** | Project Management Office — bureau de pilotage des projets |
| **PPR** | Plan Préventif de Redressement |
| **RPO** | Recovery Point Objective — perte de données maximale acceptable (en temps) |
| **RSSI** | Responsable de la Sécurité des Systèmes d'Information |
| **RTO** | Recovery Time Objective — durée maximale d'interruption acceptable |
| **SFD** | Système Financier Décentralisé (terme générique UMOA pour les institutions de microfinance) |
| **SLA** | Service Level Agreement — accord de niveau de service |
| **SPI4** | Social Performance Indicators 4 — standards de performance sociale en microfinance |
| **SSO** | Single Sign-On — authentification unique pour tous les services |
| **SURFI** | Situation Résumée des Établissements Financiers — état réglementaire COBAC mensuel |
| **TEG** | Taux Effectif Global — coût total du crédit incluant tous les frais. Plafonné à 24% en UEMOA |
| **TFJ** | Traitement de Fin de Journée — batch automatisé de calculs comptables et financiers |
| **TPME** | Très Petites, Petites et Moyennes Entreprises |
| **USSD** | Unstructured Supplementary Service Data — service interactif accessible sans smartphone ni Internet |
| **WORM** | Write Once Read Many — stockage inaltérable (pour l'archivage réglementaire) |

---

*Document élaboré par KHEPRA EXPERTS — Regulatory & Financial Services BU*
*Version 1.0 — 07 Juin 2026*