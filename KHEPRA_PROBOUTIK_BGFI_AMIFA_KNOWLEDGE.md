# KHEPRA PROBOUTIK · BGFI · AMIFA — KNOWLEDGE BASE
## Scoring Crédit Informel · Cartographie Risques Bâle II · Gap Analysis Conformité
### Version 1.0 · 07 Juin 2026 · Niveau Big Four

> **Documents liés** : [KHEPRA_AI_GOVERNANCE.md](./KHEPRA_AI_GOVERNANCE.md) — §4.10 Architecture de Gouvernance, §5.6 Dérogation Nationalité, §5.7 Compliance Pack
> **Framework MFI UEMOA** : [MFI_BUSINESS_PLAN_FRAMEWORK_UEMOA.md](./MFI_BUSINESS_PLAN_FRAMEWORK_UEMOA.md)
> **CBS & Microfinance** : [KHEPRA_CBS_MICROFINANCE_KNOWLEDGE.md](./KHEPRA_CBS_MICROFINANCE_KNOWLEDGE.md)
> **Outils d'audit** : [scripts/khepra_audit_balance.py](./scripts/khepra_audit_balance.py), [scripts/khepra_calcul_par_provisions.py](./scripts/khepra_calcul_par_provisions.py), [scripts/khepra_stress_test_portefeuille.py](./scripts/khepra_stress_test_portefeuille.py)

---

Ce document est la base de connaissance opérationnelle de KHEPRA EXPERTS couvrant trois domaines complémentaires de la chaîne de valeur microfinance : (A) le scoring crédit des TPME informelles via la plateforme ProBoutik, (B) la cartographie des risques bancaires selon le référentiel Bâle II appliqué au cas BGFI, et (C) l'analyse d'écarts de conformité (Gap Analysis) pour un SFD gabonais (AMIFA). Ces trois cas d'usage couvrent le cycle complet : **scoring informel → cartographie des risques → mise en conformité réglementaire**.

---

## SOMMAIRE

```
PARTIE A — PROBOUTIK : CREDIT METRICS & INFORMAL SME FINANCING
  A.1  État des lieux : 65M microbusiness, $421B finance gap, 90% cash
  A.2  Solution ProBoutik : Plateforme mobile-first, paiement digital, comptabilité, scoring alternatif
  A.3  Méthodologie de Credit Rating : 7 critères (clients, fournisseurs, supply chain, cashflow, psychométrie, telco, défauts)
  A.4  Processus d'implémentation : API FI ↔ ProBoutik, Scoring → Acceptation/Rejet
  A.5  Fiches synthétiques : Opportunité marché, Business Model, Impact inclusion financière

PARTIE B — BGFI : CARTOGRAPHIE DES RISQUES (BÂLE II)
  B.1  Risques identifiés : Défaut contreparties, Fraude interne/externe, Non-conformité, Dégradation crédit
  B.2  Matrice de risques Bâle II : Familles, Sous-catégories, Événements générateurs
  B.3  Analyse impact brut/net, probabilité, gravité, dispositif de maîtrise (DMR)
  B.4  Check-lists opérationnelles : Suivi crédits, Formalisation garanties, Recouvrement, Veille juridique
  B.5  Zones critiques : Portefeuille douteux (20%), Insuffisance de procédures, Lenteur administrative

PARTIE C — AMIFA : GAP ANALYSIS CONFORMITÉ
  C.1  Axes de maturité : Organisation & Gouvernance, KYC, LAB/FT, FATCA/CRS, Déontologie, PIC, Transverse, Reporting
  C.2  Scores (0 à 4) et écarts majeurs : LAB/FT, FATCA/CRS, Gouvernance
  C.3  Cartographie des écarts : Normes appliquées vs non appliquées
  C.4  Plan d'action : Filtrage blacklist, Formation LAB/FT, Reporting, Whistleblowing

GLOSSAIRE CROISÉ
```

---

# PARTIE A — PROBOUTIK : CREDIT METRICS & INFORMAL SME FINANCING

## A.1 — État des Lieux du Marché

### Le Microbusiness Africain — Données Clés

| Indicateur | Valeur | Source / Année |
|-----------|--------|---------------|
| Nombre de microbusiness en Afrique | 65 millions | Banque Mondiale |
| Finance gap (crédit non satisfait) | $421 milliards | IFC / SME Finance Forum |
| Transactions en cash | 90% | GSMA |
| TPME sans accès au crédit formel | > 85% | BCEAO / COBAC |
| Part de l'économie informelle dans l'emploi | 80-90% selon les pays | OIT |
| Pénétration mobile money en Afrique subsaharienne | > 55% (830M comptes) | GSMA 2025 |
| Taux de bancarisation stricte (UEMOA) | < 25% | BCEAO |
| Microbusiness avec comptabilité formelle | < 5% | Études terrain |

### Le Cercle Vicieux de l'Informel

```
┌─────────────────────────────────────────────────────────────────┐
│           LE CERCLE VICIEUX DU MICROBUSINESS INFORMEL            │
│                                                                  │
│  ┌─────────────────┐          ┌─────────────────┐              │
│  │  PAS DE          │          │  PAS D'ACCÈS    │              │
│  │  COMPTABILITÉ    │◄────────┤  AU CRÉDIT      │              │
│  │  FORMALISÉE      │          │  FORMEL          │              │
│  └────────┬────────┘          └────────┬────────┘              │
│           │                            │                         │
│           ▼                            ▼                         │
│  ┌─────────────────┐          ┌─────────────────┐              │
│  │  PAS              │          │  PAS              │              │
│  │  D'HISTORIQUE     │          │  DE GARANTIES     │              │
│  │  BANCAIRE         │          │  FORMELLES        │              │
│  └────────┬────────┘          └────────┬────────┘              │
│           │                            │                         │
│           └────────────┬───────────────┘                         │
│                        ▼                                         │
│           ┌─────────────────────────┐                           │
│           │  CERCLE DE L'INFORMEL   │                           │
│           │  → Exclusion financière │                           │
│           │  → Croissance limitée   │                           │
│           │  → Vulnérabilité chocs  │                           │
│           └─────────────────────────┘                           │
│                                                                  │
│  LA RUPTURE PROBOUTIK :                                          │
│  Scoring alternatif → Historique transactionnel digital         │
│  → Accès au crédit → Formalisation progressive                  │
└─────────────────────────────────────────────────────────────────┘
```

### Le Finance Gap par Région

| Région | Microbusiness (millions) | Finance Gap ($Mds) | Gap/Microbusiness ($) |
|--------|------------------------|-------------------|----------------------|
| Afrique de l'Ouest (UEMOA) | 18 | 85 | 4 700 |
| Afrique Centrale (CEMAC) | 8 | 42 | 5 250 |
| Afrique de l'Est | 15 | 95 | 6 330 |
| Afrique Australe | 8 | 75 | 9 375 |
| Afrique du Nord | 16 | 124 | 7 750 |
| **TOTAL AFRIQUE** | **65** | **421** | **6 475** |

---

## A.2 — Solution ProBoutik : Plateforme Mobile-First

### Vision

```
┌──────────────────────────────────────────────────────────────┐
│  PROBOUTIK — PLATEFORME MOBILE-FIRST POUR MICROBUSINESS       │
│                                                               │
│  « Transformer chaque microbusiness informel africain en      │
│    une TPME bancable grâce au scoring alternatif digital. »   │
└──────────────────────────────────────────────────────────────┘
```

### Architecture Fonctionnelle

| Module | Fonctionnalités | Bénéfice pour le microbusiness |
|--------|----------------|-------------------------------|
| **Paiement Digital** | Encaissement mobile money, QR code, lien de paiement. Transactions tracées en temps réel. | Historique transactionnel numérique — première brique du scoring |
| **Comptabilité Numérique** | Enregistrement simplifié recettes/dépenses. Catégorisation automatique. Tableau de bord trésorerie. | Visibilité financière. Comptabilité basique sans comptable. Conformité fiscale progressive |
| **Gestion Stock & Fournisseurs** | Suivi stocks simplifié. Registre fournisseurs. Bons de commande numériques. | Traçabilité supply chain. Données pour scoring fournisseurs |
| **Gestion Clients & Créances** | Registre clients. Suivi créances clients informelles. Relances automatiques (SMS). | Historique clients. Taux de recouvrement — critère de scoring |
| **Scoring Alternatif** | Analyse multicritères (7 axes). Score /100. Évolution temporelle. | Accès au crédit sans garanties formelles ni historique bancaire |
| **Marketplace Crédit** | Mise en relation avec IF partenaires. Offres pré-qualifiées. Suivi demande en temps réel. | Accès simplifié au crédit. Comparaison offres. Délai réduit |

### Stack Technologique

| Composant | Solution | Justification |
|-----------|----------|--------------|
| **Mobile** | PWA + App native légère (Android prioritaire) | Accessible sur smartphones bas de gamme. Fonctionne en 2G/3G |
| **USSD** | Canal complémentaire pour zones sans data | Inclusion des commerçants sans smartphone |
| **Backend** | Microservices (Node.js / Python). PostgreSQL | Scalabilité horizontale. API-first pour intégration FI |
| **IA / ML** | Scoring engine (XGBoost, LightGBM). Pipeline d'entraînement continu | Modèles de credit scoring alternatif. Réentraînement trimestriel |
| **Mobile Money** | API directes : MTN Mobile Money, Orange Money, Moov Money, Wave | Intégration native. Rapprochement automatique |
| **Sécurité** | Chiffrement AES-256, TLS 1.3, OAuth2. Conformité protection données UEMOA | Données financières sensibles. Exigence réglementaire |

---

## A.3 — Méthodologie de Credit Rating ProBoutik

### Les 7 Critères du Scoring Alternatif

```
┌─────────────────────────────────────────────────────────────────┐
│           PROBOUTIK CREDIT RATING — 7 CRITÈRES                   │
│                                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ CLIENTS  │ │FOURNISS. │ │ SUPPLY   │ │CASHFLOW  │          │
│  │ (15%)    │ │ (10%)    │ │ CHAIN    │ │ (20%)    │          │
│  │          │ │          │ │ (10%)    │ │          │          │
│  │ Nb clients│ │ Nb fourn.│ │ Diversif.│ │ Solde moy│          │
│  │ Diversif. │ │ Ancienneté│ │ Régularité│ │ Volatilité│         │
│  │ Créances  │ │ Volume   │ │ Saison   │ │ Croissance│          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│                                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                        │
│  │PSYCHOM.  │ │ TELCO    │ │DÉFAUTS   │                        │
│  │ (15%)    │ │ (15%)    │ │ (15%)    │                        │
│  │          │ │          │ │          │                        │
│  │ Test apti.│ │ Ancienneté│ │ Retards   │                        │
│  │ Fiabilité │ │ Régularité│ │ Impayés   │                        │
│  │ Cohérence │ │ Contacts │ │ Contentieux│                       │
│  └──────────┘ └──────────┘ └──────────┘                        │
│                                                                  │
│  SCORE GLOBAL /100 → DÉCISION CRÉDIT                            │
└─────────────────────────────────────────────────────────────────┘
```

### Grille de Scoring Détaillée

#### Critère 1 — Base Clients (15 points)

| Sous-critère | Points max | Méthode de calcul |
|-------------|-----------|-------------------|
| Nombre de clients (30 derniers jours) | 5 | < 5: 0pt, 5-10: 2pt, 11-30: 3pt, 31-100: 4pt, > 100: 5pt |
| Diversification (1 client = max % du CA) | 5 | > 50%: 0pt, 30-50%: 2pt, 15-30%: 3pt, < 15%: 5pt |
| Taux de recouvrement créances clients | 5 | < 50%: 0pt, 50-70%: 2pt, 70-90%: 3pt, > 90%: 5pt |

#### Critère 2 — Fournisseurs (10 points)

| Sous-critère | Points max | Méthode de calcul |
|-------------|-----------|-------------------|
| Nombre de fournisseurs actifs (90 jours) | 4 | 0-1: 0pt, 2: 2pt, 3-5: 3pt, > 5: 4pt |
| Ancienneté relation fournisseur principal | 3 | < 3 mois: 0pt, 3-6 mois: 1pt, 6-12 mois: 2pt, > 12 mois: 3pt |
| Régularité des approvisionnements | 3 | Irrégulier (< 1/mois): 0pt, Mensuel: 2pt, Bi-mensuel+: 3pt |

#### Critère 3 — Supply Chain (10 points)

| Sous-critère | Points max | Méthode de calcul |
|-------------|-----------|-------------------|
| Diversification sources d'approvisionnement | 4 | Mono-source: 0pt, 2 sources: 2pt, 3+: 4pt |
| Saisonnalité des revenus | 3 | Très forte (> 50% variation): 0pt, Modérée (20-50%): 2pt, Faible (< 20%): 3pt |
| Délai rotation stock (estimé) | 3 | > 60j: 0pt, 30-60j: 1pt, 15-30j: 2pt, < 15j: 3pt |

#### Critère 4 — Cashflow Digital (20 points)

| Sous-critère | Points max | Méthode de calcul |
|-------------|-----------|-------------------|
| Solde moyen mensuel (mobile money, 90j) | 8 | < 100k FCFA: 1pt, 100-500k: 3pt, 500k-2M: 5pt, 2-5M: 6pt, > 5M: 8pt |
| Volatilité des flux (écart-type / moyenne) | 6 | > 50%: 0pt, 30-50%: 2pt, 15-30%: 4pt, < 15%: 6pt |
| Croissance du chiffre d'affaires (6 mois) | 6 | Négative: 0pt, 0-10%: 2pt, 10-25%: 4pt, > 25%: 6pt |

#### Critère 5 — Psychométrie (15 points)

| Sous-critère | Points max | Méthode de calcul |
|-------------|-----------|-------------------|
| Test d'aptitude entrepreneuriale (questionnaire 15 items) | 5 | Score normalisé /100 → /5 |
| Fiabilité déclarative (cohérence réponses test-retest) | 5 | Incohérences détectées: -2pt/incohérence |
| Cohérence données déclarées vs observées | 5 | Écart déclaré/réel > 30%: 0pt, 15-30%: 2pt, < 15%: 5pt |

#### Critère 6 — Données Telco (15 points)

| Sous-critère | Points max | Méthode de calcul |
|-------------|-----------|-------------------|
| Ancienneté numéro de téléphone principal | 5 | < 6 mois: 0pt, 6-12 mois: 2pt, 1-2 ans: 3pt, > 2 ans: 5pt |
| Régularité d'activité (jours avec appels/SMS/jour) | 5 | Activité faible (< 50% jours): 0pt, Modérée (50-80%): 3pt, Forte (> 80%): 5pt |
| Diversité contacts (nombre contacts uniques/mois) | 5 | < 20: 0pt, 20-50: 2pt, 51-100: 3pt, > 100: 5pt |

> **Note KHEPRA** : L'accès aux données telco nécessite le consentement explicite du microbusiness (conformément au Règlement UEMOA Protection des Données). Le consentement est recueilli dans l'application ProBoutik avec case à cocher distincte. Les données sont chiffrées AES-256-GCM avec clés HSM.

#### Critère 7 — Historique des Défauts (15 points)

| Sous-critère | Points max | Méthode de calcul |
|-------------|-----------|-------------------|
| Retards de paiement (30 derniers jours) | 5 | Aucun: 5pt, 1-2j: 4pt, 3-5j: 2pt, > 5j: 0pt |
| Impayés (90 derniers jours) | 5 | Aucun: 5pt, 1: 2pt, 2+: 0pt |
| Contentieux ou litiges (24 derniers mois) | 5 | Aucun: 5pt, 1 résolu: 3pt, 1 en cours: 0pt, 2+: 0pt |

### Score Global et Décision

| Score | Classification | Accès au crédit | Montant max (FCFA) | TEG indicatif |
|-------|---------------|-----------------|---------------------|---------------|
| 85-100 | **AAA — Excellence** | Immédiat | 10 000 000 | 12-15% |
| 70-84 | **AA — Très Bon** | Simplifié | 5 000 000 | 15-18% |
| 55-69 | **A — Bon** | Standard | 2 000 000 | 18-21% |
| 40-54 | **BBB — Acceptable** | Avec garantie | 1 000 000 | 21-24% |
| 25-39 | **BB — Limité** | Refusé — Scoring insuffisant | 0 | — |
| < 25 | **B — Insuffisant** | Refusé | 0 | — |

### Évolution Temporelle du Score

Le score ProBoutik n'est pas statique — il est recalculé mensuellement. Le microbusiness peut voir son score évoluer de 3 façons :

1. **Trajectoire ascendante** : Score en hausse sur 3 mois consécutifs → Upgrade automatique de classification
2. **Trajectoire descendante** : Score en baisse sur 2 mois consécutifs → Revue manuelle par le partenaire FI
3. **Stagnation** : Score stable sur 6 mois → Proposition automatique de programme d'amélioration (formation, conseil)

---

## A.4 — Processus d'Implémentation : API FI ↔ ProBoutik

### Architecture d'Intégration

```
┌─────────────────────────────────────────────────────────────────┐
│           INTÉGRATION FI ↔ PROBOUTIK                              │
│                                                                  │
│  ┌──────────────┐                    ┌──────────────┐            │
│  │   PROBOUTIK   │                    │  INSTITUTION  │            │
│  │   (Scoring)   │                    │  FINANCIÈRE   │            │
│  │               │                    │  (CBS)        │            │
│  └───────┬───────┘                    └───────┬───────┘            │
│          │                                    │                    │
│          │        API REST (HTTPS/TLS)        │                    │
│          └────────────────┬───────────────────┘                    │
│                           │                                        │
│                   ┌───────▼───────┐                               │
│                   │  API GATEWAY   │                               │
│                   │  (WSO2/Kong)   │                               │
│                   │  Auth OAuth2   │                               │
│                   │  Rate Limit    │                               │
│                   └───────┬───────┘                               │
│                           │                                        │
│          ┌────────────────┼────────────────┐                      │
│          ▼                ▼                ▼                       │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐              │
│  │  Endpoint 1  │ │  Endpoint 2  │ │  Endpoint 3  │              │
│  │  Demande     │ │  Scoring     │ │  Décision     │              │
│  │  Crédit      │ │  Request     │ │  Notification │              │
│  └──────────────┘ └──────────────┘ └──────────────┘              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Flux API — Demande de Crédit (End-to-End)

```
ÉTAPE 1 — INITIATION (Microbusiness → ProBoutik)
  Le microbusiness initie une demande de crédit dans ProBoutik.
  → Montant souhaité, durée, objet. Consentement partage données.

ÉTAPE 2 — SCORING (ProBoutik → Scoring Engine)
  ProBoutik agrège les 7 critères et génère le Score /100.
  → Rapport de scoring complet (score + détail par critère).

ÉTAPE 3 — TRANSMISSION (ProBoutik → FI via API)
  POST /api/v1/credit-application
  {
    microbusiness_id: "MB-2026-001",
    score_proboutik: 78,
    classification: "AA",
    montant_demande: 3000000,
    duree_mois: 12,
    objet: "Achat stock marchandises",
    rapport_scoring: { ... },
    historique_transactions: { ... },
    kyc_basique: { ... }
  }

ÉTAPE 4 — DÉCISION FI (CBS → Workflow Crédit)
  Le CBS de la FI reçoit le dossier pré-qualifié.
  → Analyse complémentaire (FI) : vérification KYC approfondie,
    croisement liste noire interne, vérification ANIF/CENTIF.
  → Si score > 70 (AA ou AAA) : circuit accéléré, décision < 4h.
  → Si score 55-69 (A) : circuit standard, décision < 24h.
  → Si score 40-54 (BBB) : circuit avec garantie, décision < 48h.
  → Si score < 40 : rejet automatique, notification ProBoutik.

ÉTAPE 5 — NOTIFICATION (FI → ProBoutik → Microbusiness)
  POST /api/v1/credit-decision
  {
    application_id: "APP-2026-001",
    decision: "ACCEPTE",
    montant_accorde: 3000000,
    teg: 17.5,
    duree_mois: 12,
    conditions: { ... },
    message_client: "Félicitations ..."
  }

ÉTAPE 6 — DÉCAISSEMENT & SUIVI
  → Décaissement via mobile money (intégré ProBoutik).
  → Suivi remboursements via ProBoutik (échéances, alertes).
  → Scoring mis à jour mensuellement (performance remboursement).
```

### Spécifications Techniques API

| Endpoint | Méthode | Authentification | Timeout | Rate Limit |
|----------|---------|-----------------|---------|------------|
| `/api/v1/credit-application` | POST | OAuth2 Client Credentials | 30s | 100 req/min/FI |
| `/api/v1/credit-decision` | POST | OAuth2 Client Credentials | 30s | 200 req/min/FI |
| `/api/v1/scoring/{mb_id}` | GET | OAuth2 Client Credentials | 10s | 500 req/min/FI |
| `/api/v1/microbusiness/{mb_id}` | GET | OAuth2 Client Credentials | 10s | 500 req/min/FI |
| `/api/v1/webhook/repayment` | POST | HMAC Signature (SHA-256) | 15s | 1000 req/min/FI |

### Schéma de Données Standardisé

```yaml
# Objet : Demande de Crédit
credit_application:
  microbusiness_id: string       # Identifiant unique ProBoutik
  fi_id: string                  # Identifiant institution financière
  application_id: string         # Identifiant unique de la demande
  score_proboutik: integer       # Score /100
  classification: string         # AAA, AA, A, BBB, BB, B
  montant_demande: integer       # En FCFA
  duree_mois: integer            # Durée souhaitée
  objet: string                  # Objet du crédit
  rapport_scoring: object        # Détail des 7 critères
  historique_transactions: array # 6-12 mois de transactions
  kyc_basique: object            # Nom, téléphone, activité, localisation
  consentement: object           # Consentements (données, scoring, partage)
  timestamp: datetime            # ISO 8601
```

### Contrôle Qualité — Validation Croisée

Avant transmission à la FI, ProBoutik exécute 5 contrôles automatiques :

| Contrôle | Règle | Action si échec |
|----------|-------|-----------------|
| **Cohérence KYC** | Incohérences entre données déclarées et observées détectées | Blocage + revue manuelle |
| **Fraude** | Détection patterns frauduleux (multi-comptes, usurpation) | Blocage + alerte FI |
| **Surendettement** | Endettement total > 40% du revenu mensuel estimé | Alerte + limitation montant |
| **Blanchiment** | Transactions inhabituelles (structuration, pics inexpliqués) | Blocage + déclaration ANIF/CENTIF |
| **Complétude** | Données manquantes pour le scoring | Demande de complément au microbusiness |

---

## A.5 — Fiches Synthétiques ProBoutik

### Fiche 1 — Opportunité Marché

```yaml
# FICHE SYNTHÉTIQUE — OPPORTUNITÉ MARCHÉ PROBOUTIK
Reference: PROBOUTIK-FS-001
Date: 07 Juin 2026

OPPORTUNITÉ :
  Description: >
    Plateforme mobile-first de digitalisation des microbusiness informels
    africains, combinant paiement digital, comptabilité simplifiée et scoring
    alternatif pour créer un historique de crédit à partir des données
    transactionnelles et comportementales.
  Marché_cible: 65 millions de microbusiness en Afrique
  Finance_gap: $421 milliards
  Pénétration_mobile_money: 830 millions de comptes en Afrique subsaharienne
  Positionnement: Intermédiaire de confiance entre le microbusiness informel
    et l'institution financière formelle.

AVANTAGE_CONCURRENTIEL:
  - Scoring 7 axes (vs scoring traditionnel 3 axes des banques)
  - Données temps réel (transactions mobile money) vs données statiques (bilans)
  - Inclusion des 85% de TPME sans accès au crédit formel
  - Pas de garantie formelle requise — la donnée est la garantie
  - Canal mobile-first (PWA, USSD) accessible sans smartphone haut de gamme
  - Intégration native mobile money (MTN, Orange, Moov, Wave)

BARRIÈRES_À_L'ENTRÉE:
  - Nécessité de partenariats FI pour l'octroi effectif du crédit
  - Régulation protection des données (consentement explicite requis)
  - Acquisition de la confiance des microbusiness (partage de données)
  - Qualité et fiabilité des données telco (dépendance opérateurs)
```

### Fiche 2 — Business Model

```yaml
# FICHE SYNTHÉTIQUE — BUSINESS MODEL PROBOUTIK
Reference: PROBOUTIK-FS-002
Date: 07 Juin 2026

MODÈLE_DE_REVENUS:
  Subscription:
    Modèle: Freemium + Premium
    Free: Comptabilité basique (50 transactions/mois), 1 rapport scoring/mois
    Premium (5 000 FCFA/mois): Comptabilité illimitée, scoring mensuel,
      marketplace crédit, alertes, export comptable
    Volume_cible: 10 000 utilisateurs actifs à 12 mois

  Commission:
    Modèle: Commission sur crédit accordé via la plateforme
    Taux: 1-3% du montant du crédit (payé par la FI, pas par le microbusiness)
    Justification: Coût d'acquisition client réduit pour la FI,
      scoring pré-qualifié, risque de défaut réduit
    Volume_cible: 5 000 crédits/an la 2e année, panier moyen 1,5M FCFA
    Revenu_commission_estimé: 75-225M FCFA/an à maturité

  Lending (Option stratégique):
    Modèle: ProBoutik prête sur son bilan (après obtention agrément SFD)
    Avantage: Contrôle complet de la chaîne de valeur du crédit
    Risque: Exposition au risque de crédit, exigence de fonds propres,
      conformité réglementaire SFD complète (BCEAO/COBAC)
    Timeline: Phase 2 (24-36 mois après lancement)

STRUCTURE_DE_COÛTS:
  - Développement et maintenance plateforme: 40%
  - Infrastructure cloud et API mobile money: 20%
  - Acquisition et support utilisateurs: 20%
  - Conformité et régulation: 10%
  - Administration: 10%

PROJECTIONS_FINANCIÈRES (FCFA):
  Année 1: CA 150M, Résultat net -80M (investissement)
  Année 2: CA 450M, Résultat net -20M (croissance)
  Année 3: CA 1,2Md, Résultat net 180M (rentabilité)
  Année 5: CA 3,5Md, Résultat net 700M (maturité)
```

### Fiche 3 — Impact Inclusion Financière

```yaml
# FICHE SYNTHÉTIQUE — IMPACT INCLUSION FINANCIÈRE PROBOUTIK
Reference: PROBOUTIK-FS-003
Date: 07 Juin 2026

IMPACT_DIRECT:
  - Inclusion_financière: +50 000 microbusiness bancarisés à 24 mois
  - Crédit_décaissé: 7,5 milliards FCFA via la plateforme à 24 mois
  - Emplois_soutenus: 150 000 emplois indirects (2-3 employés/microbusiness)
  - Formalisation: Passage de l'informel au formel pour 30% des utilisateurs
    Premium (comptabilité → déclaration fiscale → statut juridique)
  - Réduction_TEG: Baisse moyenne de 3-5 points du TEG grâce au scoring
    affiné (passage de 22-24% à 17-21% pour les scores AA et AAA)

IMPACT_INDIRECT:
  - Digitalisation: Accélération du passage au paiement digital
    (réduction du cash de 90% à 70% dans la base utilisateurs)
  - Éducation_financière: Formation intégrée dans l'app (gestion trésorerie,
    épargne, investissement)
  - Inclusion_femmes: Objectif 50% de femmes microbusiness dans la base
    (interface adaptée, réseau d'agentes ProBoutik)
  - Inclusion_jeunes: 60% des utilisateurs < 35 ans (adoption naturelle
    du digital, intégration USSD pour zones rurales)

ALIGNEMENT_ODD:
  - ODD 1 (Pas de pauvreté): Accès au crédit pour les plus vulnérables
  - ODD 5 (Égalité des sexes): Inclusion financière des femmes entrepreneures
  - ODD 8 (Travail décent et croissance économique): Soutien aux TPME,
    création d'emplois
  - ODD 9 (Industrie, innovation et infrastructure): Innovation fintech
    pour l'inclusion financière
  - ODD 10 (Inégalités réduites): Réduction de la fracture financière

ALERTES_KHEPRA:
  - Surendettement: Risque de surendettement si le crédit est trop
    facilement accessible. Mitigation : plafonnement automatique du
    montant en fonction du revenu estimé (max 40% du revenu mensuel
    en mensualité). Alerte si endettement multiple (plusieurs FI).
  - Protection_données: Risque lié à la collecte massive de données
    personnelles et comportementales. Mitigation : consentement
    explicite, minimisation, chiffrement, droit à l'oubli, conformité
    Règlement UEMOA Protection des Données et RGPD.
  - Exclusion_algorithmique: Risque de biais dans le scoring (genre,
    zone rurale). Mitigation : audit algorithmique trimestriel,
    comité d'éthique IA, droit de recours humain.
```

---

# PARTIE B — BGFI : CARTOGRAPHIE DES RISQUES (BÂLE II)

## B.1 — Risques Identifiés

### Identification des Risques — Cas BGFI

BGFI (Banque Gabonaise et Française Internationale) est un groupe bancaire panafricain présent dans 11 pays. L'analyse ci-dessous est basée sur un audit de cartographie des risques (ERM) mené selon le référentiel Bâle II, adapté au contexte CEMAC et aux exigences COBAC.

| Code | Risque | Description | Impact Brut | Probabilité | Gravité |
|------|--------|-------------|-------------|-------------|---------|
| **R01** | Défaut de contreparties (crédit corporate) | Dégradation de la qualité du portefeuille crédit, concentration sectorielle (pétrole, mines, BTP) | Élevé | Modérée | **Critique** |
| **R02** | Dégradation du portefeuille crédit retail | Portefeuille douteux atteignant 20%, insuffisance des provisions, recouvrement inefficace | Élevé | Élevée | **Critique** |
| **R03** | Fraude interne | Détournement de fonds, collusion employés, falsification documents, abus de pouvoir | Élevé | Faible | **Élevé** |
| **R04** | Fraude externe | Cybercriminalité, phishing, usurpation identité, fraude documentaire clients | Modéré | Modérée | **Élevé** |
| **R05** | Non-conformité juridique et réglementaire | Non-respect des circulaires COBAC, insuffisance du dispositif LCB/FT, sanctions administratives | Très Élevé | Modérée | **Critique** |
| **R06** | Insuffisance de procédures (crédit) | Absence ou obsolescence des manuels de procédures crédit, décisions discrétionnaires | Élevé | Élevée | **Critique** |
| **R07** | Lenteur administrative sur hypothèques | Délais excessifs de formalisation des garanties hypothécaires, perte de privilèges | Modéré | Élevée | **Élevé** |
| **R08** | Risque de liquidité | Asymétrie actifs/passifs, concentration des dépôts, retraits massifs | Modéré | Faible | **Élevé** |
| **R09** | Risque de taux | Variation défavorable des taux directeurs BEAC, impact sur la marge nette d'intérêt | Modéré | Modérée | **Modéré** |
| **R10** | Risque opérationnel (processus) | Erreurs de traitement, défaillances systèmes, interruptions de service | Modéré | Modérée | **Modéré** |
| **R11** | Risque de réputation | Scandale, mauvaise presse, insatisfaction clients, perte de confiance des régulateurs | Très Élevé | Faible | **Élevé** |
| **R12** | Risque pays / souverain | Instabilité politique, changement réglementaire brutal, restriction de change | Élevé | Faible | **Élevé** |

### Analyse d'Impact Brut → Net

| Code | Impact Brut | Dispositif de Maîtrise (DMR) existant | Efficacité DMR | Impact Net |
|------|-----------|--------------------------------------|----------------|-----------|
| **R01** | Élevé | Comité de Crédit, limites sectorielles, analyse financière | Partielle (60%) | Modéré |
| **R02** | Élevé | Classification COBAC, provisionnement, recouvrement | Insuffisante (30%) | **Élevé** |
| **R03** | Élevé | Séparation des tâches, double signature, audit interne | Partielle (70%) | Faible-Modéré |
| **R04** | Modéré | Firewall, antivirus, sensibilisation, authentification forte | Partielle (65%) | Faible |
| **R05** | Très Élevé | Veille réglementaire, comité conformité, audit externe | Partielle (55%) | **Élevé** |
| **R06** | Élevé | — (absence de procédures formalisées) | **Inexistante (0%)** | **Élevé** |
| **R07** | Modéré | Service juridique interne, suivi manuel | Faible (25%) | Modéré |
| **R08** | Modéré | Gestion ALM, réserves obligatoires BEAC, lignes de refinancement | Bonne (80%) | Faible |
| **R09** | Modéré | Positionnement taux fixe majoritaire, gap analysis | Partielle (60%) | Faible |
| **R10** | Modéré | PCA, redondance systèmes, procédures back-up | Partielle (65%) | Faible |
| **R11** | Très Élevé | Communication corporate, relation régulateurs, qualité service | Partielle (50%) | Modéré |
| **R12** | Élevé | Diversification géographique (11 pays), veille politique | Partielle (55%) | Modéré |

### Cartographie Simplifiée — Criticité Résiduelle

```
┌─────────────────────────────────────────────────────────────────┐
│           BGFI — CARTE DE CHALEUR DES RISQUES                    │
│           (Impact Net × Probabilité)                             │
│                                                                  │
│  PROBABILITÉ                                                     │
│      ▲                                                           │
│      │                                                           │
│  E   │           R06 ██                                          │
│  L   │           R02 ██        R07 ██                            │
│  E   │                                                           │
│  V   │                         R10 ██                            │
│  É   │           R05 ██        R04 ██                            │
│  E   │                                                           │
│      │                         R01 ██                            │
│  M   │                         R09 ██                            │
│  O   │                                                           │
│  D   │  R12 ██   R11 ██                                          │
│  E   │  R08 ██   R03 ██                                          │
│  R   │                                                           │
│  É   │                                                           │
│  E   │                                                           │
│  F   │                                                           │
│  A   │                                                           │
│  I   │                                                           │
│  B   ├─────────────────────────────────────────────►             │
│  L   │         MODÉRÉ        ÉLEVÉ        CRITIQUE               │
│  E   │                   IMPACT NET                              │
│                                                                  │
│  LÉGENDE :                                                       │
│  ██ Zone Critique (action immédiate) — R02, R05, R06              │
│  ██ Zone Élevée (plan d'action 3 mois) — R01, R03, R04, R07      │
│  ██ Zone Modérée (suivi trimestriel) — R08, R09, R10, R11, R12   │
└─────────────────────────────────────────────────────────────────┘
```

---

## B.2 — Matrice de Risques Bâle II

### Classification Bâle II — 7 Familles de Risques

```
┌─────────────────────────────────────────────────────────────────┐
│           BÂLE II — 7 FAMILLES DE RISQUES                        │
│                                                                  │
│  PILIER 1 — EXIGENCES MINIMALES DE FONDS PROPRES                │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ RISQUE DE    │ │ RISQUE DE    │ │ RISQUE       │            │
│  │ CRÉDIT       │ │ MARCHÉ       │ │ OPÉRATIONNEL │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                  │
│  PILIER 2 — SURVEILLANCE PRUDENTIELLE                            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ RISQUE DE    │ │ RISQUE DE    │ │ RISQUE DE    │            │
│  │ CONCENTRATION│ │ LIQUIDITÉ    │ │ TAUX (IRRBB) │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                  │
│  PILIER 2 (SUITE)                                                │
│  ┌──────────────┐                                               │
│  │ RISQUE DE    │                                               │
│  │ RÉPUTATION / │                                               │
│  │ CONFORMITÉ   │                                               │
│  └──────────────┘                                               │
│                                                                  │
│  PILIER 3 — DISCIPLINE DE MARCHÉ                                │
│  → Transparence et publication des informations financières     │
│    et prudentielles                                              │
└─────────────────────────────────────────────────────────────────┘
```

### Matrice Détaillée Bâle II — Cas BGFI

| Famille Bâle II | Sous-catégorie | Événement générateur (BGFI) | Code |
|-----------------|---------------|---------------------------|------|
| **Risque de Crédit** | Défaut corporate | Faillite d'un grand groupe pétrolier client (concentration 15% du portefeuille) | R01 |
| | Dégradation portefeuille | Portefeuille douteux 20%, PAR 90 > 10%, provisions insuffisantes | R02 |
| | Garanties | Hypothèques non formalisées dans les délais, perte de rang hypothécaire | R07 |
| **Risque de Marché** | Taux d'intérêt | Hausse du TIAO BEAC de 200bps, impact sur marge nette (actifs taux fixe, passifs taux variable) | R09 |
| | Change | Dévaluation FCFA (scénario extrême), exposition devises non couvertes | (hors périmètre) |
| **Risque Opérationnel** | Fraude interne | Détournement par un chargé de clientèle (falsification virement) | R03 |
| | Fraude externe | Attaque phishing ciblant les clients corporate, perte estimée 150M FCFA | R04 |
| | Processus | Erreur de traitement batch TFJ, double comptabilisation intérêts | R10 |
| | Systèmes | Panne du CBS 4h, agences fermées, perte d'exploitation | R10 |
| **Risque de Concentration** | Sectorielle | 35% du portefeuille crédit concentré sur 3 secteurs (pétrole, mines, BTP) | R01 |
| | Géographique | 60% des actifs concentrés au Gabon (siège) | R12 |
| | Contrepartie | 3 plus gros clients représentent 25% des encours | R01 |
| **Risque de Liquidité** | Retraits massifs | Panique bancaire suite à rumeur, retrait de 30% des dépôts en 5 jours | R08 |
| | Refinancement | Fermeture ligne de refinancement par banque correspondante | R08 |
| **Risque de Taux (IRRBB)** | Transformation | Gap de duration actif/passif > 2 ans, sensibilité à la hausse des taux | R09 |
| **Risque de Conformité** | Réglementaire | Sanction COBAC pour non-conformité LCB/FT (amende, mise sous tutelle) | R05 |
| | Procédures | Absence de manuel de crédit formalisé — décisions discrétionnaires non documentées | R06 |
| | Réputation | Scandale de gouvernance (conflit d'intérêts administrateur non déclaré) | R11 |

### Pondération des Risques — Appétit au Risque BGFI

| Niveau | Tolérance | Exemples BGFI |
|--------|----------|--------------|
| **Appétit zéro** | Aucune tolérance. Alerte immédiate CA. | R05 (Non-conformité LCB/FT), R06 (Absence procédures) |
| **Appétit faible** | Tolérance limitée. Escalade DG si matérialisé. | R02 (Portefeuille douteux > 10% PAR 90), R03 (Fraude interne) |
| **Appétit modéré** | Accepté avec DMR documenté. Suivi trimestriel. | R01 (Concentration sectorielle), R04 (Fraude externe) |
| **Appétit standard** | Risque inhérent au métier bancaire. | R08 (Liquidité), R09 (Taux), R10 (Opérationnel) |

---

## B.3 — Analyse Impact × Probabilité × Gravité × DMR

### Matrice Complète — 12 Risques BGFI

| Code | Impact Brut | Probabilité | Gravité (= I×P) | Efficacité DMR | Impact Net | Gravité Résiduelle | Niveau |
|------|-----------|-------------|-----------------|----------------|-----------|--------------------|--------|
| R01 | 4 (Élevé) | 3 (Modérée) | 12 | 60% | 2 (Modéré) | 4,8 | Élevé |
| R02 | 4 (Élevé) | 4 (Élevée) | 16 | 30% | 3 (Élevé) | 11,2 | **Critique** |
| R03 | 4 (Élevé) | 2 (Faible) | 8 | 70% | 1,2 (Faible) | 2,4 | Faible |
| R04 | 3 (Modéré) | 3 (Modérée) | 9 | 65% | 1,05 (Faible) | 3,15 | Modéré |
| R05 | 5 (Très Élevé) | 3 (Modérée) | 15 | 55% | 2,25 (Modéré) | 6,75 | **Critique** |
| R06 | 4 (Élevé) | 4 (Élevée) | 16 | 0% | 4 (Élevé) | 16 | **Critique** |
| R07 | 3 (Modéré) | 4 (Élevée) | 12 | 25% | 2,25 (Modéré) | 9 | Élevé |
| R08 | 3 (Modéré) | 2 (Faible) | 6 | 80% | 0,6 (Faible) | 1,2 | Faible |
| R09 | 3 (Modéré) | 3 (Modérée) | 9 | 60% | 1,2 (Faible) | 3,6 | Modéré |
| R10 | 3 (Modéré) | 3 (Modérée) | 9 | 65% | 1,05 (Faible) | 3,15 | Modéré |
| R11 | 5 (Très Élevé) | 2 (Faible) | 10 | 50% | 2,5 (Modéré) | 5 | Élevé |
| R12 | 4 (Élevé) | 2 (Faible) | 8 | 55% | 1,8 (Modéré) | 3,6 | Modéré |

**Échelle** : Impact/Probabilité : 1 (Très Faible) → 5 (Très Élevé)
**Gravité Résiduelle** = Impact Net × Probabilité. Seuil Critique > 5.

### Dispositifs de Maîtrise — Forces et Faiblesses

| DMR | Efficacité | Forces | Faiblesses |
|-----|-----------|--------|-----------|
| **Classification COBAC** | 30% | Conforme au règlement. Automatisée. | Ne résout pas le problème racine (qualité du portefeuille). Provisionnement parfois insuffisant. |
| **Séparation des tâches** | 70% | Matrice documentée. Double signature obligatoire. | Contournement possible par collusion. Non-respect dans filiales. |
| **Veille réglementaire** | 55% | Abonnement base de données juridique. Revue trimestrielle. | Pas de traçabilité des textes analysés. Absence de comité dédié. |
| **Gestion ALM** | 80% | Comité ALM mensuel. Gap analysis. Stress tests. | Hypothèses parfois trop conservatrices. Pas de stress test combiné. |
| **Cybersécurité** | 65% | Firewall, antivirus, MFA, pentest annuel. | Pas de SOC dédié. Délai de détection non mesuré. |
| **Procédures crédit** | **0%** | — (inexistant) | **Absence totale de manuel de crédit formalisé. Décisions orales. Aucune traçabilité.** |
| **Formalisation garanties** | 25% | Service juridique dédié. | Processus manuel, lent, non tracé. Retard moyen 6-8 mois sur hypothèques. |

---

## B.4 — Check-Lists Opérationnelles BGFI

### Check-List 1 — Suivi des Crédits (Mensuel)

```yaml
# CHECK-LIST — SUIVI MENSUEL DES CRÉDITS BGFI
Reference: BGFI-CL-001
Fréquence: Mensuelle (J+5 après clôture)
Responsable: Responsable Crédit

CONTRÔLES_OBLIGATOIRES:
  - id: CL01
    contrôle: "Classification COBAC automatique exécutée sans erreur"
    seuil: Taux d'erreur < 0,1%
    action_si_alerte: "Vérifier paramétrage CBS. Corriger dans les 24h."
  - id: CL02
    contrôle: "PAR 30 < 5% et PAR 90 < 3%"
    seuil: PAR 30 > 5% OU PAR 90 > 3%
    action_si_alerte: "Analyse détaillée par agence et chargé de crédit. Rapport au DG."
  - id: CL03
    contrôle: "Créances compromises (180-360j) en baisse ou stables"
    seuil: Hausse > 10% M/M
    action_si_alerte: "Plan d'apurement. Renforcement recouvrement."
  - id: CL04
    contrôle: "Taux de provisionnement > 70% des créances douteuses"
    seuil: < 70%
    action_si_alerte: "Provisionnement complémentaire obligatoire. Alerte COBAC possible."
  - id: CL05
    controle: "Concentration top 10 bénéficiaires < 30% du portefeuille"
    seuil: > 30%
    action_si_alerte: "Rapport au Comité de Crédit. Plan de diversification."
  - id: CL06
    contrôle: "Tous les crédits > 10M FCFA validés par le CCE"
    seuil: ≥ 1 crédit non validé
    action_si_alerte: "Violation de gouvernance. Escalade immédiate DG et CA."
  - id: CL07
    contrôle: "Aucun crédit aux administrateurs sans autorisation préalable du CA"
    seuil: ≥ 1 crédit non autorisé
    action_si_alerte: "Violation AUSCGIE. Escalade immédiate CA et CAC."
```

### Check-List 2 — Formalisation des Garanties (Mensuel)

```yaml
# CHECK-LIST — FORMALISATION DES GARANTIES BGFI
Reference: BGFI-CL-002
Fréquence: Mensuelle (J+5 après clôture)
Responsable: Service Juridique

CONTRÔLES_OBLIGATOIRES:
  - id: GR01
    contrôle: "Toute hypothèque inscrite < 6 mois après décaissement"
    seuil: ≥ 1 hypothèque > 6 mois non inscrite
    action_si_alerte: "Escalade Service Juridique → DG. Perte de rang hypothécaire = perte financière."
  - id: GR02
    contrôle: "100% des crédits > 50M FCFA ont une garantie formalisée"
    seuil: < 100%
    action_si_alerte: "Blocage nouveaux décaissements tant que non régularisé."
  - id: GR03
    contrôle: "Registre des garanties à jour et complet"
    seuil: Champs obligatoires manquants
    action_si_alerte: "Mise à jour immédiate. Contrôle croisé avec les dossiers physiques."
  - id: GR04
    contrôle: "Suivi échéance des garanties (hypothèques, cautions bancaires)"
    seuil: Garantie arrivant à échéance < 60 jours
    action_si_alerte: "Alerte renouvellement. Contacter le client."
  - id: GR05
    contrôle: "Nantissements de stocks vérifiés physiquement < 12 mois"
    seuil: > 12 mois depuis dernière vérification
    action_si_alerte: "Visite de vérification programmée sous 30 jours."
```

### Check-List 3 — Recouvrement (Hebdomadaire)

```yaml
# CHECK-LIST — RECOUVREMENT HEBDOMADAIRE BGFI
Reference: BGFI-CL-003
Fréquence: Hebdomadaire (chaque lundi)
Responsable: Responsable Recouvrement

CONTRÔLES_OBLIGATOIRES:
  - id: RC01
    contrôle: "Taux de recouvrement à J+7 > 80%"
    seuil: < 80%
    action_si_alerte: "Analyse des causes. Renforcement relances."
  - id: RC02
    contrôle: "Tous les impayés > J+15 ont fait l'objet d'une relance écrite"
    seuil: ≥ 1 impayé sans relance
    action_si_alerte: "Relance immédiate. Mise à jour CRM."
  - id: RC03
    contrôle: "Impays > J+90 : dossier transmis au contentieux"
    seuil: ≥ 1 impayé non transmis
    action_si_alerte: "Transmission immédiate. Provisionnement obligatoire."
  - id: RC04
    contrôle: "Plan d'apurement signé pour tout crédit restructuré"
    seuil: ≥ 1 restructuration sans plan signé
    action_si_alerte: "Blocage restructuration. Régularisation avant validation."
```

### Check-List 4 — Veille Juridique et Conformité (Trimestriel)

```yaml
# CHECK-LIST — VEILLE JURIDIQUE & CONFORMITÉ BGFI
Reference: BGFI-CL-004
Fréquence: Trimestrielle
Responsable: Responsable Conformité

CONTRÔLES_OBLIGATOIRES:
  - id: VJ01
    contrôle: "Tous les nouveaux textes COBAC publiés dans le trimestre identifiés et analysés"
    seuil: Texte non identifié
    action_si_alerte: "Analyse rétroactive. Mise à jour base documentaire. Rapport au CA."
  - id: VJ02
    contrôle: "Impact des nouveaux textes évalué (gap analysis)"
    seuil: Absence d'analyse d'impact
    action_si_alerte: "Gap analysis immédiate. Plan d'action de mise en conformité."
  - id: VJ03
    contrôle: "Registre des textes applicables à jour (date, statut, version)"
    seuil: Registre non mis à jour
    action_si_alerte: "Mise à jour immédiate du registre normatif."
  - id: VJ04
    contrôle: "Formation conformité réalisée pour 100% du personnel exposé"
    seuil: < 100%
    action_si_alerte: "Session de formation programmée sous 30 jours."
  - id: VJ05
    contrôle: "Déclaration de soupçon transmise à l'ANIF dans les 24h suivant la décision"
    seuil: Déclaration tardive
    action_si_alerte: "Rapport immédiat au DG et CA. Risque pénal."
```

---

## B.5 — Zones Critiques BGFI

### Zone Critique 1 — Portefeuille Douteux (20%)

**Situation** : Le portefeuille douteux (créances en souffrance > 90 jours) atteint 20% de l'encours total, soit le double du seuil réglementaire COBAC de 10%.

**Causes racines** :
- Analyse crédit insuffisante à l'octroi (pas de scoring formalisé, pas de vérification systématique des garanties)
- Recouvrement inefficace (J+7 : seulement 60% de recouvrement, pas de relances automatiques)
- Concentration sectorielle (pétrole 25%, mines 10% — secteurs cycliques)
- Absence de suivi trimestriel des gros engagements (> 500M FCFA)
- Garanties non formalisées pour 35% des crédits douteux

**Impact** :
- Provisionnement insuffisant → risque de sanction COBAC (amende, mise sous administration provisoire)
- Détérioration du ratio de capitalisation (Fonds Propres / Encours)
- Réputation : notation dégradée par les agences, méfiance des correspondants bancaires

**Plan d'action KHEPRA** :
1. **Immédiat** (J+7) : Audit complet du portefeuille douteux. Identification crédit par crédit. Évaluation réaliste des perspectives de recouvrement.
2. **Court terme** (J+30) : Renforcement de l'équipe recouvrement. Mise en place CRM de recouvrement avec alertes automatiques. Externalisation recouvrement lourd.
3. **Moyen terme** (J+90) : Refonte de la politique de crédit. Scoring obligatoire avant octroi. Formalisation systématique des garanties avant décaissement.
4. **Long terme** (J+180) : Diversification sectorielle du portefeuille. Réduction progressive de la concentration pétrole/mines.

> **Alerte KHEPRA** : Un portefeuille douteux à 20% n'est pas un problème opérationnel — c'est une crise de gouvernance. Le Conseil d'Administration doit être formellement informé et un plan de redressement doit être présenté à la COBAC dans les 30 jours (Circulaire N° 001-2020/CB/C — PPR).

### Zone Critique 2 — Insuffisance de Procédures

**Situation** : Les manuels de procédures crédit sont soit absents, soit obsolètes, soit non appliqués. Les décisions d'octroi sont prises oralement, sans documentation traçable.

**Causes racines** :
- Culture de l'oralité et de la discrétion managériale
- Absence de fonction « Organisation & Méthodes »
- Rotation du personnel entraînant une perte de mémoire institutionnelle
- Aucun audit interne sur l'application des procédures

**Impact** :
- Décisions discrétionnaires = risque de favoritisme, conflit d'intérêts, corruption
- Impossibilité de démontrer au régulateur que les crédits sont octroyés selon des règles objectives
- Non-conformité à la Circulaire COBAC N° 001-2017/CB/C (gouvernement d'entreprise)
- En cas de défaut, la banque ne peut pas prouver sa diligence → perte de recours juridique

**Plan d'action KHEPRA** :
1. Rédiger ou mettre à jour le Manuel de Crédit (30 jours). Contenu minimum : politique, processus, typologies, scoring, garanties, recouvrement, provisionnement.
2. Former 100% du personnel crédit au manuel (15 jours après rédaction).
3. Intégrer le workflow crédit dans le CBS avec contrôles bloquants (pas de décaissement sans validation workflow).
4. Audit interne trimestriel : vérification par échantillonnage que le processus est respecté.

### Zone Critique 3 — Lenteur Administrative sur Hypothèques

**Situation** : Le délai moyen de formalisation d'une hypothèque est de 6 à 8 mois après le décaissement. Dans 15% des cas, l'hypothèque n'est jamais inscrite.

**Causes racines** :
- Processus manuel, lourd, dépendant d'un seul juriste
- Absence de suivi informatisé des dossiers (tableau Excel partagé)
- Lenteur des services du cadastre et de la conservation foncière
- Absence de procédure de relance formalisée

**Impact** :
- Perte de rang hypothécaire (d'autres créanciers peuvent s'inscrire entre-temps)
- Perte de privilège en cas de procédure collective du débiteur
- Provisionnement supplémentaire exigé par la COBAC (garantie non formalisée = créance non sécurisée)
- Perte financière en cas de défaut (impossible de réaliser l'hypothèque)

**Plan d'action KHEPRA** :
1. Recruter un second juriste dédié aux garanties (J+30).
2. Mettre en place un outil de suivi informatisé des dossiers hypothécaires avec alertes automatiques (J+60).
3. Signer une convention avec les services du cadastre pour traitement prioritaire (J+90).
4. Règle bloquante : aucun nouveau décaissement > 50M FCFA sans garantie formalisée.

---

# PARTIE C — AMIFA : GAP ANALYSIS CONFORMITÉ

## C.1 — Axes de Maturité et Scores

### Contexte AMIFA Gabon SA

AMIFA Gabon SA est une société anonyme de microfinance de droit gabonais, supervisée par la COBAC. Le Gap Analysis ci-dessous évalue le niveau de maturité de conformité de l'institution sur 8 axes, selon une échelle de 0 (inexistant) à 4 (excellence).

### Grille d'Évaluation de Maturité

| Score | Niveau | Définition |
|-------|--------|-----------|
| **0** | Inexistant | Aucun dispositif en place. Aucune ressource dédiée. Aucune procédure. |
| **1** | Embryonnaire | Dispositif informel. Pratiques ad hoc. Pas de documentation. |
| **2** | Basique | Dispositif formalisé mais non appliqué systématiquement. Procédures existent mais obsolètes ou incomplètes. |
| **3** | Maîtrisé | Dispositif formalisé, appliqué, contrôlé. Procédures à jour. Ressources dédiées. |
| **4** | Excellence | Dispositif intégré, audité, amélioré en continu. Benchmark. Bonnes pratiques internationales. |

### Scores AMIFA par Axe

| Axe | Score | Niveau | Commentaire |
|-----|-------|--------|------------|
| **Organisation & Gouvernance** | 2 | Basique | Statuts conformes. CA et comités créés mais l'indépendance conformité n'est pas appliquée. Le Responsable Conformité ne dépend pas directement du CA. |
| **KYC (Identification Clients)** | 3 | Maîtrisé | Procédure KYC formalisée. Pièces justificatives collectées. Fichier clients à jour. Vérifications périodiques réalisées. |
| **LAB/FT** | **0** | **Inexistant** | **Absence totale de filtrage automatique des listes de sanctions. Absence de surveillance des transactions. Absence de déclaration de soupçon. Aucune formation du personnel.** |
| **FATCA / CRS** | 1 | Embryonnaire | Enregistrement IRS effectué (Global Intermediary Identification Number obtenu). Mais reporting FATCA absent (aucune déclaration transmise). Procédure CRS non documentée. |
| **Déontologie & Conflits d'Intérêts** | 2 | Basique | Code de déontologie existant mais non diffusé systématiquement. Déclarations de conflits d'intérêts collectées mais non analysées. |
| **PIC (Politique d'Information Clients)** | 2 | Basique | Conditions générales existantes. Tarification affichée. Mais pas de procédure formalisée de réclamation client (non-conformité COBAC N° 002-2020). |
| **Transverse (Sécurité SI, PCA)** | 2 | Basique | Politique de sécurité SI documentée. Sauvegardes quotidiennes. Mais pas de PCA formalisé ni testé. Pas de pentest réalisé. |
| **Reporting Réglementaire** | 3 | Maîtrisé | États SURFI et BAFI transmis dans les délais. États financiers audités. Mais reporting LCB/FT absent (cohérent avec le score LAB/FT de 0). |

### Score Global de Maturité AMIFA

```
┌─────────────────────────────────────────────────────────────────┐
│           AMIFA — SCORE DE MATURITÉ CONFORMITÉ                    │
│                                                                  │
│  Axe                         Score   Barre (sur 4)               │
│  ─────────────────────────────────────────────────               │
│  Organisation & Gouvernance  ██░░░░  2/4                         │
│  KYC                         ███░░░  3/4                         │
│  LAB/FT                      ░░░░░░  0/4  ← CRITIQUE              │
│  FATCA / CRS                 █░░░░░  1/4  ← ALERTE                │
│  Déontologie                 ██░░░░  2/4                         │
│  PIC                         ██░░░░  2/4                         │
│  Transverse                  ██░░░░  2/4                         │
│  Reporting                   ███░░░  3/4                         │
│  ─────────────────────────────────────────────────               │
│  SCORE GLOBAL                15/32  (47%)                        │
│  Niveau de Maturité          BASIQUE — INSUFFISANT               │
│                                                                  │
│  NOTE KHEPRA : Le score de 0 en LAB/FT est une alerte rouge      │
│  immédiate. L'absence de filtrage sanctions expose AMIFA à :      │
│  → Sanction COBAC (amende jusqu'à 100M FCFA)                     │
│  → Retrait d'agrément                                             │
│  → Poursuites pénales (Dirigeants)                                │
│  → Perte de correspondants bancaires (de-risking)                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## C.2 — Écarts Majeurs

### Écart Majeur 1 — LAB/FT : Dispositif Inexistant

```
┌─────────────────────────────────────────────────────────────────┐
│  ALERTE CRITIQUE KHEPRA — LAB/FT                                 │
│  Niveau de risque : CRITIQUE                                     │
│  Référence : AMIFA-GAP-LABFT                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  CONSTAT :                                                        │
│  Le dispositif LAB/FT d'AMIFA est inexistant dans toutes         │
│  ses composantes obligatoires :                                  │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐           │
│  │          DISPOSITIF LAB/FT AMIFA                  │           │
│  ├──────────────────────────┬───────────────────────┤           │
│  │ Composante               │ Statut                │           │
│  ├──────────────────────────┼───────────────────────┤           │
│  │ Filtrage sanctions       │ ❌ ABSENT              │           │
│  │ (ONU, OFAC, UE, ANIF)    │                       │           │
│  ├──────────────────────────┼───────────────────────┤           │
│  │ Surveillance transactions│ ❌ ABSENT              │           │
│  │ (temps réel, anomalies)  │                       │           │
│  ├──────────────────────────┼───────────────────────┤           │
│  │ Profilage risque LCB/FT  │ ❌ ABSENT              │           │
│  │ (Faible/Modéré/Élevé)    │                       │           │
│  ├──────────────────────────┼───────────────────────┤           │
│  │ Déclaration de soupçon   │ ❌ ABSENT              │           │
│  │ (Transmission ANIF)      │                       │           │
│  ├──────────────────────────┼───────────────────────┤           │
│  │ Formation personnel      │ ❌ ABSENT              │           │
│  │ (initiale + continue)    │                       │           │
│  ├──────────────────────────┼───────────────────────┤           │
│  │ Audit externe LCB/FT     │ ❌ ABSENT              │           │
│  │ (≥ tous les 2 ans)       │                       │           │
│  ├──────────────────────────┼───────────────────────┤           │
│  │ Politique LCB/FT écrite  │ ❌ ABSENT              │           │
│  │ (approuvée CA)           │                       │           │
│  ├──────────────────────────┼───────────────────────┤           │
│  │ Registre des PEP         │ ❌ ABSENT              │           │
│  │ (identification, suivi)  │                       │           │
│  └──────────────────────────┴───────────────────────┘           │
│                                                                  │
│  CONSÉQUENCES POTENTIELLES :                                      │
│  → Sanction COBAC : Amende + possible mise sous administration    │
│  → Risque pénal : Responsabilité personnelle des Dirigeants       │
│    (Règlement COBAC R-2018/01, Art. 54 et suivants)              │
│  → Risque réputationnel : De-risking par les banques              │
│    correspondantes (clôture des comptes de correspondance)       │
│  → Risque de blanchiment effectif : L'institution peut être       │
│    utilisée comme vecteur de blanchiment sans le savoir           │
│                                                                  │
│  PLAN D'ACTION KHEPRA (voir §C.4 pour le détail)                  │
│  1. IMMÉDIAT (J+7)  : Activation filtrage sanctions minimum       │
│  2. URGENT (J+30)   : Politique LCB/FT + formation personnel     │
│  3. MOYEN TERME (J+90): Déploiement solution LCB/FT automatisée   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Écart Majeur 2 — FATCA/CRS : Enregistrement sans Reporting

**Situation** : AMIFA a obtenu un GIIN (Global Intermediary Identification Number) auprès de l'IRS américain — ce qui est positif. Mais aucun reporting FATCA n'a jamais été transmis, ce qui rend l'enregistrement caduc et expose l'institution à des pénalités.

| Obligation FATCA/CRS | Statut AMIFA | Action requise |
|---------------------|-------------|---------------|
| Enregistrement IRS (GIIN) | ✅ Effectué | Maintenir à jour |
| Classification FATCA de l'institution | ❌ Non documentée | Déterminer et documenter |
| Identification des US Persons dans la base clients | ❌ Non effectuée | Recherche rétroactive |
| Reporting annuel FATCA à l'IRS | ❌ Jamais transmis | Préparer et transmettre le reporting rétroactif |
| Procédure CRS (Common Reporting Standard) | ❌ Non documentée | Rédiger et mettre en œuvre |
| Classification fiscale des clients (CRS) | ❌ Non effectuée | Intégrer dans le processus KYC |
| Reporting CRS à l'administration fiscale gabonaise | ❌ Jamais transmis | Préparer premier reporting |
| Due diligence FATCA/CRS pour les entités | ❌ Non effectuée | Mettre en place procédure |
| Conservation des documents (6 ans) | ❌ Non organisée | Mettre en place archivage |

### Écart Majeur 3 — Gouvernance : Indépendance Conformité Non Appliquée

**Situation** : La Circulaire COBAC N° 001-2017/CB/C exige que le Responsable Conformité dispose d'une indépendance fonctionnelle et d'un rattachement direct au Conseil d'Administration (via le Comité d'Audit et des Risques). Chez AMIFA, le Responsable Conformité est rattaché à la Direction Générale, ce qui crée un conflit structurel.

| Prescription COBAC | Application AMIFA | Écart |
|-------------------|------------------|-------|
| Rattachement hiérarchique au CA (CAR) | Rattachement à la DG | **Non conforme** |
| Indépendance fonctionnelle (pas d'autres fonctions opérationnelles) | Cumul avec fonctions opérationnelles | **Non conforme** |
| Droit d'accès direct au Président du CAR | Pas de canal direct formalisé | **Non conforme** |
| Budget autonome de la fonction conformité | Budget intégré au budget DG | **Non conforme** |
| Nomination et révocation par le CA | Nomination par la DG | **Non conforme** |
| Rapport semestriel au CA sur l'état de la conformité | Pas de rapport formalisé | **Non conforme** |
| Participation aux comités décisionnels (voix consultative) | Non systématique | Partiellement conforme |

---

## C.3 — Cartographie des Écarts

### Normes Appliquées vs Non Appliquées — Vue d'Ensemble

| Norme / Référence | Statut | Score Maturité | Commentaire |
|------------------|--------|---------------|-------------|
| **COBAC R-2016/01 (Contrôle Interne)** | Partiellement appliquée | 2/4 | Dispositif 3 lignes de défense non pleinement opérationnel |
| **COBAC R-2018/01 (LCB/FT)** | **Non appliquée** | **0/4** | Cf. Écart Majeur 1 |
| **Circ. N° 001-2017/CB/C (Gouvernance)** | Partiellement appliquée | 2/4 | Cf. Écart Majeur 3 |
| **Circ. N° 002-2017/CB/C (Admin. & Dirigeants)** | Appliquée | 3/4 | CV et casiers collectés. Déclarations conformes. |
| **Circ. N° 001-2020/CB/C (PPR)** | Non évaluée | N/A | PPR non exigé pour SFD de cette catégorie (à vérifier) |
| **Circ. N° 002-2020/CB/C (SCI, Réclamations)** | Partiellement appliquée | 2/4 | Réclamations non formalisées. Rapport semestriel SCI partiel. |
| **FATCA (US IRS)** | Partiellement appliquée | 1/4 | Cf. Écart Majeur 2 |
| **CRS (OCDE)** | **Non appliquée** | 0/4 | Aucune procédure. Aucun reporting. |
| **Protection Données (Règlement UEMOA 2020)** | Partiellement appliquée | 2/4 | Politique documentée mais pas de DPO nommé. |
| **R-2008/01 (PCA)** | Partiellement appliquée | 2/4 | PCA documenté mais jamais testé. Pas de site de secours. |
| **Reporting SURFI / BAFI** | Appliquée | 3/4 | Dans les délais. États conformes. |
| **Reporting LCB/FT** | **Non appliquée** | 0/4 | Cf. Écart Majeur 1 |
| **AUSCGIE OHADA (Gouvernance SA)** | Appliquée | 3/4 | Statuts conformes. AG tenues. CAC nommés. |
| **Normes IIA/IPPF (Audit Interne)** | Partiellement appliquée | 2/4 | Fonction Audit Interne existante mais ressources insuffisantes. |

### Synthèse par Niveau d'Application

| Niveau | Nombre de Normes | % |
|--------|-----------------|---|
| Appliquée (3-4/4) | 4 | 29% |
| Partiellement appliquée (2/4) | 6 | 43% |
| Embryonnaire (1/4) | 1 | 7% |
| Non appliquée (0/4) | 3 | 21% |
| **Total** | **14** | **100%** |

> **Analyse KHEPRA** : 28% des normes applicables ne sont pas appliquées ou sont à l'état embryonnaire — un taux supérieur au seuil d'alerte KHEPRA de 15%. La concentration dans le domaine LCB/FT (3 normes non appliquées : COBAC R-2018/01, CRS, Reporting LCB/FT) constitue un risque systémique pour l'institution.

---

## C.4 — Plan d'Action AMIFA

### Plan d'Action — Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│           AMIFA — PLAN D'ACTION CONFORMITÉ                       │
│           Horizon : 90 jours (J+7 → J+90)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PHASE 1 — URGENCE ABSOLUE (J+7)                                │
│  ├── Activation filtrage blacklist minimum                       │
│  ├── Information immédiate du CA                                 │
│  └── Désignation Responsable Conformité intérimaire              │
│      (rattaché CA, pas DG)                                       │
│                                                                  │
│  PHASE 2 — REMÉDIATION (J+30)                                   │
│  ├── Politique LCB/FT écrite + approbation CA                    │
│  ├── Formation 100% personnel (LCB/FT obligatoire)               │
│  ├── Procédure déclaration de soupçon                            │
│  ├── Lancement recherche US Persons rétroactive                  │
│  └── Rattachement Conformité au CAR                              │
│                                                                  │
│  PHASE 3 — DÉPLOIEMENT (J+60)                                   │
│  ├── Déploiement solution LCB/FT automatisée (CBS)               │
│  ├── Profilage risque LCB/FT de 100% des clients                 │
│  ├── Premier reporting FATCA préparé                             │
│  ├── Procédure CRS documentée                                    │
│  └── PCA testé (test de bascule)                                  │
│                                                                  │
│  PHASE 4 — CONSOLIDATION (J+90)                                  │
│  ├── Audit externe LCB/FT réalisé                                │
│  ├── Première déclaration de soupçon test                        │
│  ├── Reporting FATCA transmis (rétroactif)                       │
│  ├── Dispositif whistleblowing opérationnel                      │
│  └── Rapport de conformité au CA et COBAC                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Action 1 — Mise en Place Filtrage Blacklist (J+7)

| Tâche | Responsable | Délai |
|-------|-----------|-------|
| Activer le module LCB/FT dans le CBS (si existant) | Admin SI | J+2 |
| Ou souscrire solution externe (ex: Dow Jones, World-Check, Refinitiv) | Resp. Conformité | J+5 |
| Configurer les listes : ONU, OFAC, UE, ANIF Gabon | Resp. Conformité + Admin SI | J+5 |
| Lancer le screening rétroactif de la base clients existante | Resp. Conformité | J+7 |
| Bloquer tout compte client matchant une liste de sanctions | Resp. Conformité + DG | J+7 |
| Déclarer tout gel d'avoirs à l'ANIF | Resp. Conformité | J+7 |

### Action 2 — Formation LAB/FT (J+30)

| Module | Public | Durée | Formateur |
|--------|--------|-------|----------|
| Cadre juridique LBC/FT (COBAC, GABAC, GAFI) | Tout le personnel | 4h | Consultant KHEPRA |
| Détection des opérations suspectes | Personnel exposé (guichet, crédit) | 4h | Consultant KHEPRA |
| Procédure de déclaration de soupçon | Resp. Conformité, DG | 2h | Consultant KHEPRA |
| Profilage risque client (KYC renforcé) | Chargés clientèle | 3h | Resp. Conformité |
| Sanctions internationales et filtrage | Resp. Conformité, Admin SI | 2h | Consultant KHEPRA |
| Exercice pratique : simulation déclaration | Tous les participants | 2h | Consultant KHEPRA |

### Action 3 — Reporting Régulier (J+30 → Récurrent)

| Report | Destinataire | Fréquence | Contenu |
|--------|------------|-----------|---------|
| Rapport mensuel Conformité | DG | Mensuelle (J+5) | Indicateurs clés : nombre screenings, alertes, déclarations, formations |
| Rapport trimestriel Conformité | CAR (CA) | Trimestrielle | Analyse détaillée, évolutions, risques, recommandations |
| Rapport annuel LCB/FT | COBAC | Annuelle | Statistiques, dispositif, audit, plan d'amélioration |
| Déclaration de soupçon | ANIF | Immédiate (< 24h après décision) | Formulaire standard ANIF |
| Reporting FATCA | IRS (US) | Annuelle (31 mars) | États FATCA standard |

### Action 4 — Dispositif Whistleblowing (J+90)

| Composante | Configuration |
|-----------|--------------|
| **Canal de signalement** | Adresse email dédiée (confidentielle) + ligne téléphonique |
| **Garantie de confidentialité** | Identité du lanceur d'alerte protégée. Sanction si violation de la confidentialité. |
| **Protection contre les représailles** | Aucune sanction disciplinaire, mutation forcée ou harcèlement du lanceur d'alerte de bonne foi. |
| **Procédure de traitement** | Accusé réception < 5 jours. Enquête < 30 jours. Rapport au CAR. |
| **Périmètre** | Fraude, corruption, blanchiment, non-conformité, harcèlement, discrimination. |
| **Communication** | Diffusion à 100% du personnel. Affichage dans toutes les agences. |
| **Référence réglementaire** | Circulaire COBAC N° 001-2017/CB/C, Art. 14 (Protection des lanceurs d'alerte) |

---

# GLOSSAIRE CROISÉ

| Terme | Définition | Domaine |
|-------|-----------|---------|
| **ANIF** | Agence Nationale d'Investigation Financière (Gabon) — cellule de renseignement financier | LCB/FT |
| **Bâle II** | Accord international sur les exigences de fonds propres bancaires (3 Piliers) | Risque |
| **BEPS Action 13** | Initiative OCDE sur la documentation des prix de transfert | Fiscalité |
| **CBS** | Core Banking System — système d'information central de la banque/SFD | SI |
| **CENTIF** | Cellule Nationale de Traitement des Informations Financières (UEMOA) | LCB/FT |
| **COBAC** | Commission Bancaire de l'Afrique Centrale — superviseur bancaire CEMAC | Régulation |
| **CRS** | Common Reporting Standard (OCDE) — échange automatique d'informations fiscales | Fiscalité |
| **DMR** | Dispositif de Maîtrise des Risques | Risque |
| **ERM** | Enterprise Risk Management — gestion intégrée des risques | Risque |
| **FATCA** | Foreign Account Tax Compliance Act — loi fiscale américaine | Fiscalité |
| **FI** | Institution Financière | Général |
| **GABAC** | Groupe d'Action contre le Blanchiment d'Argent en Afrique Centrale | LCB/FT |
| **GIIN** | Global Intermediary Identification Number (IRS) | FATCA |
| **IRRBB** | Interest Rate Risk in the Banking Book — risque de taux | Risque |
| **KYC** | Know Your Customer — identification et vérification des clients | Conformité |
| **LAB/FT** | Lutte Anti-Blanchiment / Financement du Terrorisme (terminologie gabonaise) | LCB/FT |
| **LCB/FT** | Lutte Contre le Blanchiment de Capitaux et le Financement du Terrorisme | LCB/FT |
| **OFAC** | Office of Foreign Assets Control (US Treasury) — sanctions américaines | Sanctions |
| **PAR** | Portefeuille À Risque — indicateur qualité du portefeuille de crédit | Crédit |
| **PCA** | Plan de Continuité d'Activité | Risque |
| **PEP** | Personne Politiquement Exposée | LCB/FT |
| **PIC** | Politique d'Information des Clients | Conformité |
| **PPR** | Plan Préventif de Redressement | Prudentiel |
| **SFI** | Scoring Financier Informel (méthodologie ProBoutik) | Crédit |
| **SME** | Small and Medium Enterprises — PME/TPME | Marché |
| **SURFI** | Situation Résumée des Établissements Financiers (COBAC) | Reporting |
| **TEG** | Taux Effectif Global — coût total du crédit | Crédit |
| **TIAO** | Taux d'Intérêt des Appels d'Offres (BEAC) — taux directeur CEMAC | Monétaire |
| **TPME** | Très Petites, Petites et Moyennes Entreprises | Marché |
| **USSD** | Unstructured Supplementary Service Data — canal mobile sans Internet | Digital |

---

*Document élaboré par KHEPRA EXPERTS — Regulatory & Financial Services BU*
*Version 1.0 — 07 Juin 2026*

*Ce document intègre les trois cas d'usage ProBoutik (scoring crédit informel), BGFI (cartographie des risques Bâle II) et AMIFA (gap analysis conformité COBAC). Il est conçu pour être directement actionnable par les équipes KHEPRA EXPERTS en mission de conseil, d'audit ou de mise en conformité.*