# KHEPRA QUALITY CONTROLLER
## Système de Contrôle Qualité Automatisé — KHEPRA EXPERTS
### Version 1.0 · 07 Juin 2026

> **Document suprême** : [KHEPRA_CONSTITUTION.md](./KHEPRA_CONSTITUTION.md)
> **Couche supérieure** : [KHEPRA_SYSTEM_MASTER_PROMPT.md](./KHEPRA_SYSTEM_MASTER_PROMPT.md) → [KHEPRA_RAG_REGULATOIRE.md](./KHEPRA_RAG_REGULATOIRE.md)
> **Framework d'application** : [KHEPRA_AI_GOVERNANCE.md](./KHEPRA_AI_GOVERNANCE.md) — Module 10

---

Le Quality Controller est le module de vérification finale du système KHEPRA. Il constitue le dernier rempart avant que tout contenu n'atteigne l'utilisateur. Aucun contenu ne peut être publié ou livré sans avoir passé ce contrôle avec un score minimum de 9,5/10.

---

## 1. MISSION

Garantir que chaque production KHEPRA EXPERTS atteint un niveau de qualité, de précision réglementaire, de rigueur institutionnelle et de valeur client compatible avec les standards des grands cabinets internationaux (Big Four), tout en restant parfaitement adaptée aux réalités africaines francophones.

### Objectifs spécifiques

1. **Conformité réglementaire absolue** — Zéro texte abrogé, zéro référence inexacte
2. **Crédibilité institutionnelle** — Ton, registre et architecture conformes au positionnement KHEPRA
3. **Excellence rédactionnelle** — Français irréprochable, structure exécutive
4. **Valeur client mesurable** — Chaque livrable doit apporter une recommandation actionnable
5. **Traçabilité intégrale** — Chaque affirmation réglementaire est sourcée et vérifiable

---

## 2. MATRICE DE CONTRÔLE QUALITÉ

Cinq axes de contrôle, chacun noté sur 10, avec pondération spécifique.

### 2.1 Contrôle Réglementaire (Pondération : 30%)

| N° | Point de contrôle | Critère de validation | Score max |
|----|------------------|----------------------|-----------|
| CR-1 | Textes en vigueur | Aucun texte abrogé cité comme applicable. Si un texte abrogé est mentionné, son statut d'abrogation est explicitement indiqué. | 4 |
| CR-2 | Numéros et dates exacts | Numéros de textes, articles, dates de publication vérifiés. Aucune approximation. | 3 |
| CR-3 | Sources officielles | Liens institutionnels valides et accessibles fournis pour chaque référence. | 3 |
| **Sous-total** | | | **/10** |

**Règle de vérification CR-1** : Pour chaque texte cité, croiser avec la base des textes en vigueur dans le KHEPRA Regulatory RAG. Si le texte n'est pas dans le RAG, appliquer la procédure « Information non vérifiable ».

**Règle de vérification CR-3** : Le lien doit pointer vers le site officiel de l'autorité émettrice (bceao.int, beac.int, fatf-gafi.org, ohada.org, etc.). Les liens vers des sites tiers, blogs ou agrégateurs non officiels sont refusés.

### 2.2 Contrôle Institutionnel (Pondération : 20%)

| N° | Point de contrôle | Critère de validation | Score max |
|----|------------------|----------------------|-----------|
| CI-1 | Architecture institutionnelle | Rôles des institutions correctement distincts (COBAC ≠ BEAC, GABAC ≠ régulateur, CEMAC ≠ UMAC, etc.) | 4 |
| CI-2 | Limites de compétence | Limites de chaque institution correctement énoncées (ex : le GABAC émet des recommandations, pas des actes réglementaires contraignants pour les EMF) | 3 |
| CI-3 | Hiérarchie institutionnelle | Relations hiérarchiques entre institutions correctes (ex : la COBAC est une autorité instituée au sein de la BEAC mais dotée d'autonomie fonctionnelle) | 3 |
| **Sous-total** | | | **/10** |

**Cas critiques** : La confusion entre COBAC et BEAC, entre GABAC et régulateur, entre CEMAC et UMAC est une faute éliminatoire. Score CI = 0 si l'une de ces confusions est détectée.

### 2.3 Contrôle Rédactionnel (Pondération : 20%)

| N° | Point de contrôle | Critère de validation | Score max |
|----|------------------|----------------------|-----------|
| CRE-1 | Orthographe et grammaire | Zéro faute d'orthographe, de grammaire ou de conjugaison | 3 |
| CRE-2 | Clarté et lisibilité | Contenu compréhensible par le public cible. Phrases équilibrées, ni trop longues ni télégraphiques. | 3 |
| CRE-3 | Structure hiérarchique | Hiérarchie H1 → H2 → H3 → H4 respectée. Pas de saut de niveau. Titres descriptifs et informatifs. | 2 |
| CRE-4 | Ton et registre | Institutionnel, neutre, professionnel. Ni trop familier, ni trop doctoral. Accessible sans être simpliste. | 2 |
| **Sous-total** | | | **/10** |

**Règle CRE-4 — Échelle de registre** :

| Niveau | Registre | Exemple | Acceptable ? |
|--------|----------|---------|-------------|
| 0 | Familier | « T'inquiète, c'est easy » | Non — Éliminatoire |
| 1 | Décontracté | « On va vous aider à... » | Non — Éliminatoire |
| 2 | Standard | « Nous vous proposons... » | Non — Insuffisant |
| 3 | Professionnel | « KHEPRA EXPERTS recommande... » | Oui — Minimum |
| 4 | Institutionnel | « Conformément au cadre réglementaire en vigueur, il est recommandé de... » | Oui — Cible |
| 5 | Académique | « Il appert des dispositions susvisées que... » | Non — Excessif |

### 2.4 Contrôle Marketing (Pondération : 15%)

| N° | Point de contrôle | Critère de validation | Score max |
|----|------------------|----------------------|-----------|
| CM-1 | Termes proscrits | Aucun terme de la liste des termes proscrits (§5.2 du Governance) : « leader », « numéro 1 », « meilleur », « 100% conforme », « Garantie », etc. | 5 |
| CM-2 | Superlatifs non vérifiables | Aucun superlatif sans source vérifiable. Les comparatifs (« plus de », « moins de ») doivent être étayés. | 3 |
| CM-3 | Statistiques sourcées | Toute statistique citée est accompagnée de sa source, de sa date et de son périmètre. | 2 |
| **Sous-total** | | | **/10** |

**Liste complète des termes proscrits** — cf. `KHEPRA_AI_GOVERNANCE.md` §5.2. Tout contenu contenant un terme proscrit perd automatiquement les points CM-1. Si plus de 3 termes proscrits sont détectés, le contenu est retourné pour refonte sans passer par les autres contrôles.

### 2.5 Contrôle Crédibilité (Pondération : 15%)

| N° | Point de contrôle | Critère de validation | Score max |
|----|------------------|----------------------|-----------|
| CCR-1 | Certifications | Aucune certification non justifiée. Toute mention de certification, accréditation ou agrément doit être vérifiable. | 4 |
| CCR-2 | Affiliations | Mentions d'affiliation à des organisations professionnelles vérifiables. Pas d'affiliation fictive ou exagérée. | 3 |
| CCR-3 | Références clients | Témoignages ou références authentifiables (étude de cas sourcée, secteur identifiable). Pas de référence générique. | 3 |
| **Sous-total** | | | **/10** |

---

## 3. CALCUL DU SCORE GLOBAL

### Formule

```
Score Global = (CR × 0,30) + (CI × 0,20) + (CRE × 0,20) + (CM × 0,15) + (CCR × 0,15)

Où :
CR  = Note du Contrôle Réglementaire       (sur 10, pondération 30%)
CI  = Note du Contrôle Institutionnel      (sur 10, pondération 20%)
CRE = Note du Contrôle Rédactionnel        (sur 10, pondération 20%)
CM  = Note du Contrôle Marketing           (sur 10, pondération 15%)
CCR = Note du Contrôle Crédibilité         (sur 10, pondération 15%)
```

### Exemple de calcul

| Contrôle | Note brute | Pondération | Contribution |
|----------|-----------|-------------|-------------|
| Réglementaire (CR) | 10/10 | 30% | 3,00 |
| Institutionnel (CI) | 9/10 | 20% | 1,80 |
| Rédactionnel (CRE) | 10/10 | 20% | 2,00 |
| Marketing (CM) | 9/10 | 15% | 1,35 |
| Crédibilité (CCR) | 10/10 | 15% | 1,50 |
| **Score Global** | | | **9,65/10 ✅** |

### Seuils de décision

| Score | Décision | Action |
|-------|----------|--------|
| ≥ 9,5 | **PUBLIÉ** | Contenu publié ou livré immédiatement |
| 8,0 — 9,4 | **CORRECTION** | Contenu retourné avec annotations des points défaillants. Corrections obligatoires avant re-soumission. |
| 7,0 — 7,9 | **REFONTE PARTIELLE** | Sections problématiques intégralement reprises. Supervision humaine obligatoire. |
| < 7,0 | **REFONTE COMPLÈTE** | Contenu retourné. Analyse racine obligatoire. Mise à jour de la base de connaissance si nécessaire. |

### Règles éliminatoires

Quel que soit le score global, le contenu est automatiquement rejeté (score = 0) si :

- **CR-1 = 0** : Un texte abrogé est cité comme applicable sans mention d'abrogation
- **CI = 0** : Confusion COBAC/BEAC, GABAC/régulateur ou CEMAC/UMAC
- **CM-1 = 0** : Plus de 3 termes proscrits détectés
- **CCR-1 = 0** : Mention d'une certification inexistante
- **CRE-1 = 0** : Plus de 5 fautes d'orthographe ou de grammaire

---

## 4. PROCÉDURE DE NON-CONFORMITÉ

### 4.1 Score entre 8,0 et 9,4 — Correction ciblée

```
1. IDENTIFICATION
   └── Points de contrôle défaillants identifiés et annotés
2. CORRECTION
   └── Application des correctifs requis par l'auteur
3. RE-CONTRÔLE
   └── Nouveau passage complet de la matrice 5 axes
4. VALIDATION
   └── Score ≥ 9,5 → Publication autorisée
```

### 4.2 Score entre 7,0 et 7,9 — Refonte partielle

```
1. DIAGNOSTIC
   └── Identification des sections problématiques
2. BRIEFING
   └── Transmission à l'auteur avec annotations détaillées
3. REFONTE
   └── Sections reprises intégralement (pas de patch)
4. SUPERVISION
   └── Relecture humaine obligatoire avant re-soumission
5. RE-CONTRÔLE
   └── Nouveau passage complet + vérification humaine
6. VALIDATION
   └── Score ≥ 9,5 → Publication autorisée
```

### 4.3 Score inférieur à 7,0 — Refonte complète

```
1. BLOCAGE IMMÉDIAT
   └── Contenu retourné. Aucune publication possible.
2. ANALYSE RACINE
   └── Identification de la cause systémique :
       · Défaut de connaissance réglementaire ?
       · Mauvaise compréhension du cadre institutionnel ?
       · Problème de source documentaire ?
       · Erreur de l'agent IA ?
3. ACTION CORRECTIVE SYSTÉMIQUE
   └── Mise à jour de la base de connaissance (si lacune)
   └── Mise à jour des règles agent (si erreur IA)
   └── Formation complémentaire (si erreur humaine)
4. REFONTE COMPLÈTE
   └── Contenu repris de zéro avec supervision renforcée
5. DOUBLE CONTRÔLE
   └── Contrôle automatisé + relecture humaine par un second expert
6. VALIDATION DIRECTION
   └── Score ≥ 9,5 + validation Direction Générale
```

---

## 5. AUDIT PÉRIODIQUE

### Calendrier

| Fréquence | Audit | Périmètre | Responsable |
|-----------|-------|-----------|-------------|
| **Quotidien** | Contrôle continu automatisé | 100% des contenus soumis | Quality Controller (système) |
| **Hebdomadaire** | Contrôle aléatoire | 5% des contenus publiés | Quality Controller (système) |
| **Mensuel** | Revue complète des nouveaux contenus | 100% des contenus publiés dans le mois | Responsable Qualité |
| **Trimestriel** | Audit de conformité réglementaire | Textes cités, dates, statuts | Partner Governance |
| **Semestriel** | Audit croisé externe simulé | Échantillon de 20% des livrables | Direction Générale |
| **Annuel** | Certification qualité Big Four | Audit complet (simulation externe) | Direction Générale |

### Indicateurs de performance

| KPI | Cible | Alerte | Action si alerte |
|-----|-------|--------|-----------------|
| Taux de passage au premier contrôle | > 80% | < 70% | Revue des procédures de production |
| Score moyen global | > 9,3/10 | < 9,0/10 | Renforcement formation et guidelines |
| Taux de refonte complète (score < 7) | < 2% | > 5% | Analyse racine et action corrective urgente |
| Délai moyen de correction | < 48h | > 72h | Optimisation du processus de re-soumission |
| Textes abrogés détectés | 0 | ≥ 1 | Mise à jour immédiate du RAG réglementaire |

---

## 6. INTÉGRATION DANS LE PIPELINE KHEPRA

### Position dans le cycle de vie du contenu

```
[IDÉE] → [CONSTITUTION] → [MASTER PROMPT] → [RAG RÉGLEMENTAIRE]
    ↓
[EXPERT AGENTS] → [PRODUCTION]
    ↓
┌─────────────────────────────────────────────┐
│         QUALITY CONTROLLER ← CE MODULE       │
│  ┌─────────────────────────────────────┐    │
│  │ 1. Contrôle Réglementaire (30%)     │    │
│  │ 2. Contrôle Institutionnel (20%)    │    │
│  │ 3. Contrôle Rédactionnel (20%)      │    │
│  │ 4. Contrôle Marketing (15%)         │    │
│  │ 5. Contrôle Crédibilité (15%)       │    │
│  │                                     │    │
│  │ Score ≥ 9,5 ?                       │    │
│  │  OUI → [PUBLICATION] → [UTILISATEUR]│    │
│  │  NON → [CORRECTION] → [RE-CONTRÔLE] │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

### Déclenchement

Le Quality Controller se déclenche automatiquement à chaque soumission de contenu. Aucun bypass possible. Le système est conçu pour :

- **Contenus web** : articles, pages, landing pages, outils
- **Livrables clients** : rapports, audits, diagnostics, propositions
- **Communications** : newsletters, posts réseaux sociaux, communiqués
- **Supports formation** : présentations, modules e-learning, guides

---

## 7. GOUVERNANCE

### Rôles et responsabilités

| Rôle | Responsabilité |
|------|---------------|
| **Quality Controller (Système)** | Exécution automatisée de la matrice 5 axes. Blocage automatique des contenus sous le seuil. Génération des rapports d'audit. |
| **Responsable Qualité** | Supervision du système. Revue mensuelle. Gestion des cas litigieux. Calibration des seuils. |
| **Partner Governance** | Audit trimestriel. Validation des actions correctives systémiques. Approbation des mises à jour du Controller. |
| **Direction Générale** | Validation des contenus en refonte complète. Audits annuels. Décision sur l'évolution des standards. |
| **Auteurs / Agents IA** | Production conforme aux standards. Prise en compte des annotations de non-conformité. Correction dans les délais. |

### Mise à jour du Quality Controller

Le Quality Controller est un document vivant. Toute modification de la matrice, des seuils ou des règles éliminatoires doit :

1. Être proposée par le Responsable Qualité ou le Partner Governance
2. Être documentée avec justification (données d'audit à l'appui)
3. Être validée par la Direction Générale
4. Être testée sur un échantillon de 50 contenus avant déploiement
5. Être communiquée à tous les agents concernés

### Calibration

La calibration des seuils est revue annuellement sur la base des données d'audit :

- Si le taux de passage au premier contrôle est < 70%, les standards de production sont renforcés (pas les seuils du Controller)
- Si le taux de passage est > 95%, une vérification de la robustesse du contrôle est effectuée
- Les règles éliminatoires ne sont jamais assouplies

---

## 8. RAPPORT DE CONTRÔLE — TEMPLATE

Chaque soumission reçoit un rapport de contrôle standardisé :

```
┌──────────────────────────────────────────────────┐
│         KHEPRA QUALITY CONTROLLER                 │
│         Rapport de Contrôle Qualité               │
├──────────────────────────────────────────────────┤
│                                                    │
│  Contenu : [TITRE]                                │
│  Type    : [Article / Rapport / Proposition / ...]│
│  Auteur  : [Nom ou Agent ID]                      │
│  Date    : [AAAA-MM-JJ HH:MM]                     │
│                                                    │
├──────────────────────────────────────────────────┤
│  RÉSULTAT                                         │
│                                                    │
│  Contrôle Réglementaire   : X,X/10 (×0,30)        │
│  Contrôle Institutionnel  : X,X/10 (×0,20)        │
│  Contrôle Rédactionnel    : X,X/10 (×0,20)        │
│  Contrôle Marketing       : X,X/10 (×0,15)        │
│  Contrôle Crédibilité     : X,X/10 (×0,15)        │
│                                                    │
│  SCORE GLOBAL : X,XX/10                           │
│  DÉCISION     : [PUBLIÉ / CORRECTION / REFONTE]   │
│                                                    │
├──────────────────────────────────────────────────┤
│  ANNOTATIONS                                      │
│                                                    │
│  Points défaillants :                             │
│  · [Liste des points avec score < max]            │
│                                                    │
│  Recommandations :                                │
│  · [Actions correctives suggérées]                │
│                                                    │
├──────────────────────────────────────────────────┤
│  Contrôle exécuté le [DATE] à [HEURE]             │
│  Version du Controller : 1.0                      │
└──────────────────────────────────────────────────┘
```

---

## A. GRILLE RAPIDE — CHECK-LIST AVANT SOUMISSION

Avant de soumettre un contenu au Quality Controller, l'auteur doit vérifier :

### Check-list réglementaire
- [ ] Tous les textes cités sont en vigueur (vérifié dans le RAG)
- [ ] Tous les numéros d'articles et dates sont exacts
- [ ] Chaque référence a une source officielle avec lien
- [ ] Aucun texte abrogé cité sans mention d'abrogation

### Check-list institutionnelle
- [ ] COBAC, BEAC, GABAC, CEMAC, UMAC : rôles correctement distincts
- [ ] Hiérarchie institutionnelle respectée
- [ ] Limites de compétence de chaque institution énoncées

### Check-list rédactionnelle
- [ ] Relecture orthographique et grammaticale effectuée
- [ ] Structure H1 → H4 hiérarchique respectée
- [ ] Ton institutionnel (niveau 3-4)
- [ ] Phrases équilibrées, pas de jargon opaque

### Check-list marketing
- [ ] Aucun terme proscrit de la liste §5.2 du Governance
- [ ] Aucun superlatif non sourcé
- [ ] Toute statistique accompagnée de sa source

### Check-list crédibilité
- [ ] Aucune certification non justifiée
- [ ] Affiliations vérifiables
- [ ] Références clients authentifiables

---

*Document validé par la Task Force Big Four — 07 Juin 2026*
*Prochaine revue programmée : 07 Juillet 2026*
*Calibration annuelle : Janvier 2027*

---

## 9. SCORING INTERNE DES LIVRABLES — /100

> **Document lié** : [KHEPRA_INTELLECTUAL_CAPITAL.md](./KHEPRA_INTELLECTUAL_CAPITAL.md)

Complémentaire à la matrice 5 axes de publication (qui fonctionne comme un gatekeeper publication/non-publication), le scoring interne /100 évalue chaque livrable sur sa qualité intrinsèque et sa valeur ajoutée. Ce score alimente l'Intellectual Capital System et permet l'amélioration continue de la qualité sur le long terme.

### 9.1 Les 6 axes de scoring interne

| Axe | Définition | Pondération | Score max |
|-----|-----------|-------------|-----------|
| **Exactitude** | Précision réglementaire, factualité, absence d'erreurs | 20% | 20 |
| **Conformité** | Alignement sur les exigences réglementaires et standards KHEPRA | 20% | 20 |
| **Valeur Client** | Utilité concrète, actionnabilité, retour sur investissement pour le client | 20% | 20 |
| **Innovation** | Originalité de l'approche, méthodes nouvelles, différenciation | 15% | 15 |
| **Clarté** | Lisibilité, structure, accessibilité, qualité rédactionnelle | 15% | 15 |
| **Impact Commercial** | Contribution au positionnement, génération de leads, notoriété | 10% | 10 |
| **TOTAL** | | **100%** | **/100** |

### 9.2 Grille de scoring détaillée

#### Exactitude (/20)

| Score | Niveau | Critère |
|-------|--------|---------|
| 18-20 | Excellence | Zéro erreur réglementaire. Toutes les références vérifiées et exactes. Aucune approximation. |
| 14-17 | Très bon | Une erreur mineure sans impact. Références correctes mais une imprécision. |
| 10-13 | Acceptable | Quelques imprécisions mineures. Nécessite correction avant livraison client. |
| 5-9 | Insuffisant | Erreurs réglementaires significatives. Texte(s) abrogé(s) ou inexact(s). |
| 0-4 | Inacceptable | Erreurs graves. Contenu non livrable en l'état. |

#### Conformité (/20)

| Score | Niveau | Critère |
|-------|--------|---------|
| 18-20 | Excellence | Conformité totale au cadre réglementaire et aux standards KHEPRA. |
| 14-17 | Très bon | Conformité au cadre. Un écart mineur sans conséquence. |
| 10-13 | Acceptable | Conformité partielle. Un écart à corriger. |
| 5-9 | Insuffisant | Non-conformité sur plusieurs points. |
| 0-4 | Inacceptable | Non-conformité majeure. Risque réglementaire ou réputationnel. |

#### Valeur Client (/20)

| Score | Niveau | Critère |
|-------|--------|---------|
| 18-20 | Excellence | Recommandations immédiatement actionnables. ROI clairement identifiable. |
| 14-17 | Très bon | Recommandations utiles et applicables. Valeur démontrée. |
| 10-13 | Acceptable | Recommandations pertinentes mais manquent de spécificité. |
| 5-9 | Insuffisant | Recommandations génériques, faiblement actionnables. |
| 0-4 | Inacceptable | Aucune recommandation concrète. Contenu purement descriptif. |

#### Innovation (/15)

| Score | Niveau | Critère |
|-------|--------|---------|
| 13-15 | Excellence | Approche originale et différenciante. Méthode ou angle nouveau. |
| 10-12 | Très bon | Éléments d'innovation présents. Adaptation créative de méthodes connues. |
| 7-9 | Acceptable | Approche standard mais bien exécutée. |
| 4-6 | Insuffisant | Approche générique, sans différenciation. |
| 0-3 | Inacceptable | Copie ou reproduction non créditée. Aucune valeur ajoutée KHEPRA. |

#### Clarté (/15)

| Score | Niveau | Critère |
|-------|--------|---------|
| 13-15 | Excellence | Structure impeccable, lisibilité parfaite, langage accessible sans être simpliste. |
| 10-12 | Très bon | Bonne structure, clarté d'ensemble. Quelques passages à fluidifier. |
| 7-9 | Acceptable | Structure acceptable, compréhensible. Peut être amélioré. |
| 4-6 | Insuffisant | Structure confuse, passages obscurs. Nécessite restructuration. |
| 0-3 | Inacceptable | Illisible ou incompréhensible. Refonte complète nécessaire. |

#### Impact Commercial (/10)

| Score | Niveau | Critère |
|-------|--------|---------|
| 9-10 | Excellence | Potentiel de génération de leads très élevé. Renforce significativement le positionnement KHEPRA. |
| 7-8 | Très bon | Bon potentiel commercial. Contribue à la notoriété. |
| 5-6 | Acceptable | Intérêt commercial modéré. |
| 3-4 | Insuffisant | Faible intérêt commercial. |
| 0-2 | Inacceptable | Aucun impact commercial. Contenu purement interne sans valeur de rayonnement. |

### 9.3 Historique et tendances

Chaque score est conservé dans l'Intellectual Capital System. L'historique permet :

1. **Suivi par type de livrable** — Évolution de la qualité par type d'audit
2. **Suivi par secteur** — Qualité des livrables par secteur (Banque, Fintech, etc.)
3. **Suivi par auteur/agent** — Performance individuelle
4. **Détection de tendances** — Amélioration ou dégradation sur un axe
5. **Benchmarking interne** — Comparaison entre périodes

### 9.4 Tableau de bord qualité

| Indicateur | Période en cours | Période précédente | Tendance |
|-----------|-----------------|-------------------|----------|
| Score moyen global | XX/100 | XX/100 | ↑↓→ |
| Exactitude moyenne | XX/20 | XX/20 | ↑↓→ |
| Conformité moyenne | XX/20 | XX/20 | ↑↓→ |
| Valeur Client moyenne | XX/20 | XX/20 | ↑↓→ |
| Innovation moyenne | XX/15 | XX/15 | ↑↓→ |
| Clarté moyenne | XX/15 | XX/15 | ↑↓→ |
| Impact Commercial moyen | XX/10 | XX/10 | ↑↓→ |
| Nombre de livrables notés | N | N | ↑↓→ |

### 9.5 Relation avec le Quality Controller Gatekeeper

| Système | Rôle | Score | Usage |
|---------|------|-------|-------|
| **Quality Controller (5 axes)** | Gatekeeper — Publication autorisée ou bloquée | /10 (≥ 9,5) | Décision binaire : publier ou corriger |
| **Scoring Interne (6 axes)** | Amélioration continue — Qualité intrinsèque | /100 | Pilotage long terme, benchmark, tendances |

Les deux systèmes sont complémentaires : le Quality Controller garantit la sécurité réglementaire et institutionnelle, le Scoring Interne mesure et améliore la qualité sur la durée.