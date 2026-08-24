# KOS SDLC PACK v1.0
## Bloc 8 — Software Development Life Cycle Documentation · ISO 27001:2022 A.14 · 25 Juin 2026

### OBJECTIF

Fermer le gap ISO 27001 A.14 (Développement Sécurisé) en produisant la documentation complète du cycle de vie de développement logiciel.

---

## DOCUMENT 1 : SDLC POLICY

### 1.1 Périmètre

Cette politique régit l'ensemble du cycle de vie de développement logiciel pour la plateforme KHEPRA EXPERTS (KOS), incluant le frontend React, les Edge Functions Supabase, l'infrastructure Docker, et les workflows n8n.

### 1.2 Phases du SDLC

| Phase | Description | Durée | Gates |
|-------|------------|-------|-------|
| **PLANIFICATION** | Définition du besoin, spécifications, analyse d'impact | 1-3j | Spec Review |
| **DÉVELOPPEMENT** | Implémentation technique, code review | 1-5j | Code Review + Lint |
| **TESTS** | Tests unitaires, intégration, validation | 1-2j | Test Suite ≥95% pass |
| **BUILD** | Compilation, vérification build | 5-15s | Build Clean |
| **REVUE** | Revue conformité, sécurité, qualité | 1j | Quality Gate ≥9.0/10 |
| **DÉPLOIEMENT** | Mise en production, vérification post-deploy | 5-10min | Post-Deploy Check |
| **MONITORING** | Surveillance continue 24/7 | Permanent | KPI Target |

### 1.3 Principes Obligatoires

1. **Aucun code ne va en production sans build check**
2. **Aucune modification sans code review** (revue humaine ou KOS Quality Controller)
3. **Aucune table créée sans RLS activée**
4. **Aucune Edge Function déployée sans piste d'audit**
5. **Aucune dépendance ajoutée sans vérification de sécurité**

### 1.4 Standards de Qualité Code

| Critère | Seuil | Vérification |
|---------|-------|-------------|
| Build | Clean (0 erreur) | build_project_check |
| Lint | Clean (0 erreur) | ESLint |
| Types | 100% TypeScript (0 `any`) | tsc --noEmit |
| Tests unitaires | ≥95% pass | Vitest |
| Taille bundle | <500 KB gzip | Rollup visualizer |
| SEO | ≥90/100 | Lighthouse |
| Accessibilité | WCAG 2.1 AA | axe-core |
| Sécurité | OWASP Top 10 couvert | kos-security-scan |

---

## DOCUMENT 2 : CHANGE MANAGEMENT PROCEDURE

### 2.1 Classification des Changements

| Type | Description | Approbation | Délai |
|------|------------|------------|-------|
| **URGENT** | Incident critique, faille sécurité | Managing Partner | Immédiat |
| **MAJEUR** | Nouvelle fonctionnalité, nouvelle page | Managing Partner + CTO | 24-48h |
| **MINEUR** | Correction bug, amélioration UI | CTO | 4-8h |
| **STANDARD** | Maintenance, optimisation | Auto-approuvé | Planifié |

### 2.2 Workflow de Changement

```
Demande de Changement (RFC)
    ↓
Analyse d'Impact (IA Analyzer)
    ↓
Classification (URGENT / MAJEUR / MINEUR / STANDARD)
    ↓
Approbation (selon niveau)
    ↓
Implémentation (SDLC phases 2-5)
    ↓
Validation (Quality Gate ≥9.0/10)
    ↓
Déploiement (Phase 6)
    ↓
Post-Deploy Check (5 min)
    ↓
Clôture RFC + Journal d'Audit
```

### 2.3 Journal des Changements

Chaque changement est journalisé dans `audit_logs` avec :
- `change_id` (UUID)
- `change_type` (URGENT/MAJEUR/MINEUR/STANDARD)
- `description`
- `impact_analysis`
- `approved_by`
- `implemented_by`
- `deployed_at`
- `rollback_plan`
- `post_deploy_status`

---

## DOCUMENT 3 : RELEASE MANAGEMENT PROCEDURE

### 3.1 Cadence de Release

| Type | Fréquence | Contenu |
|------|----------|---------|
| **Hotfix** | On-demand | Corrections critiques uniquement |
| **Patch** | Hebdomadaire | Corrections bugs, optimisations |
| **Minor** | Bi-hebdomadaire | Nouvelles fonctionnalités mineures |
| **Major** | Mensuelle | Nouvelles pages, nouveaux modules |

### 3.2 Versionnage

Format : `MAJOR.MINOR.PATCH` (SemVer 2.0.0)

- **MAJOR** : Changement incompatible (nouvelle architecture)
- **MINOR** : Nouvelle fonctionnalité compatible
- **PATCH** : Correction bug, optimisation

### 3.3 Procédure de Release

1. **Freeze Code** : 24h avant release majeure, plus aucune modification non-approuvée
2. **Build Final** : Compilation production avec build_project_check
3. **Test Smoke** : Vérification rapide des pages critiques (home, blog, services)
4. **Deploy** : Déploiement automatisé
5. **Post-Deploy Verification** : 5 minutes de monitoring intensif
6. **Communication** : Notification équipe, mise à jour journal de release

---

## DOCUMENT 4 : TESTING PROCEDURE

### 4.1 Niveaux de Test

| Niveau | Type | Outil | Fréquence | Couverture Cible |
|--------|------|------|----------|------------------|
| **L1 — Unit** | Tests unitaires | Vitest | À chaque commit | ≥95% |
| **L2 — Integration** | Tests intégration | Vitest + MSW | Par PR | ≥80% |
| **L3 — Build** | Vérification compilation | build_project_check | Par modification | 100% |
| **L4 — Lint** | Qualité code | ESLint | Par modification | 0 erreur |
| **L5 — Security** | Scan OWASP | kos-security-scan | Quotidien | 100% |
| **L6 — Performance** | Core Web Vitals | kos-performance-monitor | Quotidien | ≥90 |
| **L7 — Accessibility** | WCAG 2.1 AA | axe-core | Hebdomadaire | ≥90 |
| **L8 — E2E** | Tests end-to-end | Playwright | Mensuel | ≥70% |

### 4.2 Critères de Succès

Un test est considéré comme réussi si :
- **Unit/Integration** : Tous les tests passent
- **Build** : Compilation sans erreur
- **Lint** : 0 warning, 0 erreur
- **Security** : 0 vulnérabilité critique
- **Performance** : CWV ≥90 mobile, ≥95 desktop
- **Accessibility** : Score ≥90
- **E2E** : 100% des scénarios critiques passent

---

## DOCUMENT 5 : ROLLBACK PROCEDURE

### 5.1 Déclencheurs de Rollback

Un rollback est déclenché automatiquement si :
- **Post-deploy check échoue** (5 min après déploiement)
- **Taux d'erreur >5%** sur les pages critiques
- **Core Web Vitals dégradés >20%**
- **Disponibilité <99%** dans l'heure suivant le déploiement

### 5.2 Procédure de Rollback

```
Détection Anomalie (Post-Deploy Check / Monitoring)
    ↓
Confirmation (Managing Partner si Majeur/Ugent)
    ↓
ROLLBACK → Version précédente
    ↓
Vérification Post-Rollback (5 min)
    ↓
Analyse Racine (Post-Mortem dans les 24h)
    ↓
Correctif + Re-déploiement
```

### 5.3 Version History

Les versions précédentes sont conservées dans l'historique du projet (Git). Le rollback consiste à restaurer la version N-1 via `get_history_version_code`.

### 5.4 RTO/RPO

| Métrique | Cible |
|----------|-------|
| RTO (Recovery Time Objective) | < 5 minutes |
| RPO (Recovery Point Objective) | < 1 heure |

---

## DOCUMENT 6 : DEPLOYMENT PROCEDURE

### 6.1 Environnements

| Environnement | URL | Usage |
|--------------|-----|-------|
| **PRODUCTION** | khepra-experts.com | Live public |
| **PREVIEW** | readdy.ai preview | Validation avant prod |

### 6.2 Procédure de Déploiement

```
1. Validation Pré-Déploiement
   ├── Build Check (build_project_check)
   ├── Lint Check (ESLint)
   └── Quality Gate (≥9.0/10)

2. Déploiement Automatisé
   ├── Build production
   ├── Deploy via Netlify
   └── Purge Cache CDN

3. Vérification Post-Déploiement (t+5min)
   ├── Homepage accessible (HTTP 200)
   ├── Pages critiques (blog, services, contact) — HTTP 200
   ├── Core Web Vitals — dans les seuils
   ├── Edge Functions — toutes actives
   └── API responses < 500ms

4. Monitoring Continu (t+24h)
   ├── Error tracking
   ├── Performance monitoring
   └── Security scanning
```

### 6.3 Checklist Go/No-Go

| # | Critère | Go si |
|---|---------|-------|
| 1 | Build | Clean (0 erreur) |
| 2 | Lint | 0 erreur, 0 warning |
| 3 | Quality Gate | ≥9.0/10 |
| 4 | Tests unitaires | 100% pass |
| 5 | Pages critiques | HTTP 200 |
| 6 | Edge Functions | 100% actives |
| 7 | Core Web Vitals | Dans les seuils |
| 8 | Sécurité | 0 vulnérabilité critique |
| 9 | Rollback Plan | Documenté et testé |
| 10 | Approbation | Selon niveau de changement |

**TOUS les critères doivent être GO pour le déploiement.**

---

## SIGNATURE

KOS SDLC Pack v1.0
ISO 27001:2022 — A.14 Development Security
KHEPRA EXPERTS — 25 Juin 2026