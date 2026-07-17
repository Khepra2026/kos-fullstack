# KHEPRA SCHÉMAS DIRECTEURS SI · GOUVERNANCE · RÉSILIENCE — KNOWLEDGE BASE (Partie 2/2)
## Architecture SI BGFIBank · Politiques Continuité · COVID-19 & Résilience Bancaire
### Version 1.0 · 07 Juin 2026 · Niveau Big Four

> **Documents liés** : [KHEPRA_AI_GOVERNANCE.md](./KHEPRA_AI_GOVERNANCE.md) — §4.5 PPR, §4.6 Résolution Crises, §4.8 Rapport Annuel SCI
> **Partie 1/2** : [KHEPRA_FINAM_PCA_KNOWLEDGE.md](./KHEPRA_FINAM_PCA_KNOWLEDGE.md) — FINAM Congo (Agrément COBAC) · PCA/PCI (Continuité d'Activité)
> **CBS & Microfinance** : [KHEPRA_CBS_MICROFINANCE_KNOWLEDGE.md](./KHEPRA_CBS_MICROFINANCE_KNOWLEDGE.md)
> **ProBoutik · BGFI · AMIFA** : [KHEPRA_PROBOUTIK_BGFI_AMIFA_KNOWLEDGE.md](./KHEPRA_PROBOUTIK_BGFI_AMIFA_KNOWLEDGE.md)

---

Ce document constitue la **Partie 2/2** de la base de connaissance FINAM · PCA · SI. Il couvre : (C) les Schémas Directeurs SI du Groupe BGFIBank, (D) les politiques de gouvernance de la continuité, et (E) les enseignements COVID-19 pour la résilience bancaire. La **Partie 1/2** couvre l'agrément FINAM Congo et les PCA/PCI.

---

## SOMMAIRE

```
PARTIE C — SCHÉMAS DIRECTEURS SI (BGFIBank Bénin & Groupe)
  C.1  Architecture applicative
  C.2  Infrastructures techniques
  C.3  Limites organisationnelles, matérielles et humaines
  C.4  Orientations stratégiques : Open Banking, API, Sécurité

PARTIE D — POLITIQUES DE GESTION DE LA CONTINUITÉ
  D.1  Principes directeurs : Rôles CA/DG, Comité Risques, Audit Interne, Cellule Crise
  D.2  Phases du PCA : Diagnostic, BIA, Documentation, Test, Maintenance
  D.3  Obligations réglementaires COBAC et UEMOA

PARTIE E — COVID-19 & RÉSILIENCE BANCAIRE
  E.1  Constats : Insuffisance des PCA face à la pandémie
  E.2  Mesures correctives : Digitalisation, RSE, Révision risques, Externalisation

GLOSSAIRE
```

---

# PARTIE C — SCHÉMAS DIRECTEURS SI (BGFIBank Bénin & Groupe)

## C.1 — Architecture Applicative

### Cartographie des Applications

```
┌─────────────────────────────────────────────────────────────────┐
│           BGFIBANK — ARCHITECTURE APPLICATIVE GROUPE              │
│                                                                  │
│  CANAL CLIENTS                                                    │
│  ┌──────────┐ ┌────────────┐ ┌──────────┐                      │
│  │ BGFI     │ │ BGFI Mobile│ │ Agences  │                      │
│  │ Online   │ │ App        │ │ Physiques│                      │
│  └────┬─────┘ └─────┬──────┘ └────┬─────┘                      │
│       └──────────────┼─────────────┘                             │
│                      │                                            │
│              MIDDLEWARE / API GATEWAY (ESB)                       │
│              Authentification, Routage, Logging                   │
│                      │                                            │
│           CŒUR BANCAIRE — AMPLITUDE CBS                           │
│           Comptes · Crédits · Épargne · Caisse · Comptabilité     │
│                      │                                            │
│     ┌────────────────┼────────────────┐                          │
│     ▼                ▼                ▼                           │
│  APPLICATIONS PÉRIPHÉRIQUES                                       │
│  ┌──────────┐ ┌──────────┐ ┌────────────────┐                   │
│  │ SWIFT    │ │ Monétique│ │ GED / Archivage│                   │
│  │ Alliance │ │ (cartes) │ │ Électronique   │                   │
│  └──────────┘ └──────────┘ └────────────────┘                   │
│  ┌──────────┐ ┌──────────┐ ┌────────────────┐                   │
│  │ Anti     │ │ Business │ │ ALM / Trésorerie│                   │
│  │ Blanch.  │ │ Objects  │ │ (Amplitude)     │                   │
│  └──────────┘ └──────────┘ └────────────────┘                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Détail des Applications

| Application | Éditeur | Fonction | Interconnexions |
|-------------|---------|----------|-----------------|
| **Amplitude CBS** | Amplitude Software | Core Banking System complet | SWIFT, Monétique, BGFIOnline, BGFI Mobile |
| **SWIFT Alliance** | SWIFT | Messagerie interbancaire sécurisée | Amplitude, Trésorerie |
| **BGFIOnline** | Interne | Banque en ligne web | Amplitude (via ESB) |
| **BGFI Mobile** | Interne | Application mobile banking | Amplitude (via ESB) |
| **Monétique** | Externalisé | Gestion cartes (Visa, MC), GAB, TPE | Amplitude |
| **GED / Archivage** | Solution documentaire | Archivage électronique, dématérialisation | Amplitude |
| **Anti-Blanchiment** | Solution LCB/FT | Filtrage sanctions, surveillance, profilage | Amplitude |
| **Business Objects** | SAP | Reporting, BI, états réglementaires | Amplitude |
| **ALM / Trésorerie** | Module Amplitude | Gestion Actif-Passif, risques taux/liquidité | Amplitude, SWIFT |

### Matrice de Couverture par Filiale

| Filiale | Amplitude | SWIFT | BGFIOnline | BGFI Mobile | LCB/FT | Monétique |
|---------|-----------|-------|------------|-------------|--------|----------|
| **Gabon (siège)** | ✅ Complet | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Bénin** | ✅ Complet | ✅ | ✅ | ✅ | Partiel | ✅ |
| **Congo** | ✅ Complet | ✅ | ✅ | ❌ | Partiel | ✅ |
| **RDC** | ✅ Complet | ✅ | ✅ | ❌ | Partiel | ✅ |
| **Guinée Équatoriale** | ✅ Complet | ✅ | ✅ | ❌ | Partiel | ❌ |
| **Madagascar** | ✅ Complet | ✅ | ✅ | ❌ | Partiel | ❌ |
| **Sénégal** | ✅ Complet | ✅ | ✅ | ❌ | Partiel | ✅ |

> **Constats KHEPRA** : BGFI Mobile et LCB/FT sont insuffisamment déployés dans les filiales. La monétique externalisée crée une dépendance au partenaire.

---

## C.2 — Infrastructures Techniques

### Architecture — BGFIBank Bénin

| Composant | Configuration | Constat KHEPRA |
|-----------|--------------|----------------|
| **Virtualisation** | Hyper-V — 3 hosts physiques (CPU: 2× Xeon 16 cœurs, RAM: 256 Go/host, SAN: 20 To utile) | OK pour charge actuelle. +1 host si croissance > 20% |
| **Sauvegardes** | Quotidienne sur bandes + Réplication asynchrone site secours (6h). Rétention : 30j (quotidiennes), 12 mois (mensuelles) | RPO 6h trop élevé. Objectif : réplication horaire |
| **Réseau LAN** | Gigabit Ethernet | Conforme |
| **Réseau WAN** | VSAT 4 Mbps (principal). Fibre optique en cours de déploiement (secours) | VSAT insuffisant. Priorité migration Fibre |
| **Sécurité** | Firewall (2 appliances), IDS/IPS, Antivirus centralisé | NGFW recommandé |
| **Site de secours** | 1 serveur physique (30% charge nominale). 15 postes (12% effectif). Test 1x/an | Sous-dimensionné. Objectif : 25 postes (20%), test 2x/an |

### Dimensionnement Comparatif

| Composant | Bénin (filiale) | Groupe (siège) | Écart |
|-----------|----------------|---------------|-------|
| Serveurs physiques | 3 hosts | 12 hosts | OK |
| RAM par host | 256 Go | 512 Go | OK |
| Stockage SAN | 20 To | 80 To | OK |
| Bande passante WAN | 4 Mbps VSAT | 10 Mbps + Fibre | CRITIQUE |
| Site de secours (postes) | 15 | 80 | INSUFFISANT |
| Réplication données | 6h | 4h | À AMÉLIORER |
| Test PCA | 1x/an | 2x/an | INSUFFISANT |

---

## C.3 — Limites Organisationnelles, Matérielles et Humaines

### Limites Organisationnelles

| Limite | Impact | Recommandation KHEPRA |
|--------|--------|----------------------|
| **Gouvernance SI décentralisée** — pas de DSI Groupe transverse | Hétérogénéité pratiques. Difficulté mutualisation. | Créer poste DSI Groupe avec autorité sur DSI filiales. Standardisation progressive. |
| **Absence Schéma Directeur SI Groupe** — décisions au cas par cas | Investissements non optimisés. Incohérences technologiques. | Élaborer SD SI Groupe 2026-2030 aligné plan stratégique. |
| **Dépendance au siège** — SWIFT, monétique, CBS maintenance | Goulet d'étranglement. Panne siège = panne filiales. | Renforcer autonomie SI filiales critiques. PCA filiale autonome. |
| **Absence comité SI Groupe** | Décisions non coordonnées. | Créer Comité Stratégique SI Groupe trimestriel présidé DGA. |
| **Gestion licences manuelle** | Risque non-conformité éditeurs. | Outil ITAM (gestion parc et licences). |

### Limites Matérielles

| Limite | Impact | Recommandation KHEPRA |
|--------|--------|----------------------|
| **VSAT lien WAN principal** — latence élevée, bande passante limitée | Lenteur BGFIOnline, déconnexions. | Migrer Fibre (principal) + VSAT (secours). Étude FAI locaux. |
| **Site secours sous-dimensionné** — 12% effectif | Insuffisant sinistre majeur. | Porter à 25 postes (20%). Convention hôtel/espace coworking extension. |
| **Réplication asynchrone 6h** — perte ½ journée transactions | Impact financier + réglementaire. | Réplication synchrone/quasi-synchrone (RPO < 15 min) pour critique. |
| **Absence redondance réseau** — un seul lien WAN | Coupure = arrêt total. | Second lien (Fibre ou 4G/5G) avec bascule automatique. |
| **Obsolescence matériel** — serveurs > 5 ans, garantie expirée | Risque panne accru. | Plan renouvellement 3 ans. Maintenance 24/7 SLA < 4h. |

### Limites Humaines

| Limite | Impact | Recommandation KHEPRA |
|--------|--------|----------------------|
| **Équipe SI sous-dimensionnée** — 3 pers. (DSI + 2 tech), pas d'astreinte 24/7 | Incident hors heures = non traité. | Recruter 2 pers. Mettre en place astreinte 24/7 (rotation). |
| **Absence compétences spécialisées** — pas expert cyber, DBA, intégrateur API | Dépendance prestataires externes. | Recruter/former : 1 admin sécurité, 1 DBA, 1 dev intégration. |
| **Pas de plan formation SI** — formation continue non formalisée | Obsolescence compétences. | Plan annuel : Amplitude, Sécurité, Réseaux, Cloud. Budget ≥ 3% masse salariale SI. |
| **Rotation personnel SI** — turnover élevé | Perte connaissance. Instabilité. | Politique rétention : primes, formation certifiante, plan carrière. |
| **Absence documentation technique** — dépendance connaissances individuelles | Départ technicien = perte savoir. | Wiki technique obligatoire. Procédure : tout changement → doc dans la journée. |

---

## C.4 — Orientations Stratégiques

### Schéma Directeur SI Groupe BGFIBank 2026-2030 — 5 Axes

```
┌─────────────────────────────────────────────────────────────────┐
│           BGFIBANK — 5 AXES STRATÉGIQUES SI 2026-2030             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  AXE 1 — OPEN BANKING & API-FIRST                                │
│  → API RESTful exposant services bancaires                      │
│  → API Gateway centralisé (standardisation)                     │
│  → Portail développeurs (sandbox, documentation)                │
│  → Partenariats Fintech (agrégateurs, PFM, crédit)              │
│  → Prêt pour réglementation Open Banking CEMAC                   │
│                                                                  │
│  AXE 2 — AUTOMATISATION & RÉSILIENCE                             │
│  → Automatisation bascules PCA (scripts, tests)                 │
│  → Supervision proactive (IAOps, alertes prédictives)           │
│  → Redondance réseau (multi-opérateurs, SD-WAN)                 │
│  → RPO < 1 minute pour applications critiques                   │
│  → Infrastructure hyperconvergée                                 │
│                                                                  │
│  AXE 3 — SÉCURITÉ RENFORCÉE                                       │
│  → Infrastructure à Clé Publique (PKI) interne                  │
│  → Chiffrement PGP échanges interbancaires                      │
│  → Firewall nouvelle génération (NGFW) avec IPS/IDS             │
│  → SOC mutualisé Groupe                                          │
│  → MFA tous accès. Pentest annuel externe indépendant           │
│                                                                  │
│  AXE 4 — CLOUD HYBRIDE                                           │
│  → Cloud privé Groupe (mutualisation infrastructures)           │
│  → Cloud public pour non-critique (CRM, RH, BI)                 │
│  → DRaaS (Disaster Recovery as a Service)                       │
│  → Conformité COBAC : données clients sur sol CEMAC             │
│                                                                  │
│  AXE 5 — TRANSFORMATION DIGITALE                                  │
│  → Refonte BGFI Mobile (UX natif, onboarding digital)           │
│  → IA (scoring crédit, chatbot)                                 │
│  → Dématérialisation complète (signature électronique)          │
│  → Self-service client (ouverture compte en ligne)              │
│  → Data Lake Groupe (BI, conformité, marketing)                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Feuille de Route — Priorités

| Priorité | Action | Délai | Investissement estimé (FCFA) |
|----------|--------|-------|---------------------------|
| **P0** | MFA sur tous accès (VPN, CBS, email) | 3 mois | 15M |
| **P0** | Migration VSAT → Fibre (Bénin, Congo, RDC) | 6 mois | 120M/filiale |
| **P1** | Création poste DSI Groupe + Comité SI | 3 mois | RH |
| **P1** | Renforcement site secours (20% effectif, RPO < 1h) | 6 mois | 80M/filiale |
| **P1** | Recrutement admin sécurité + DBA + dev API | 6 mois | RH (45M/an) |
| **P2** | API Gateway + Portail développeurs | 12 mois | 200M |
| **P2** | NGFW + SOC mutualisé Groupe | 18 mois | 350M |
| **P3** | Cloud privé Groupe (hyperconvergé) | 24 mois | 500M |
| **P3** | Refonte BGFI Mobile (UX natif) | 24 mois | 250M |

### Matrice des Risques SI — Avant/Après Orientations

| Risque SI | Avant | Après |
|-----------|-------|-------|
| Panne WAN (VSAT) | Élevé (pas de secours) | Faible (Fibre + VSAT secours + bascule auto) |
| Perte données (RPO 6h) | Élevé | Faible (RPO < 1h) |
| Cyberattaque | Élevé (pas SOC, MFA partiel) | Modéré (SOC, MFA, pentest, NGFW) |
| Indisponibilité compétence clé | Élevé (pas doc) | Modéré (wiki, formation, équipe renforcée) |
| Non-conformité COBAC SI | Modéré | Faible (PCA renforcé, audit trail) |

---

# PARTIE D — POLITIQUES DE GESTION DE LA CONTINUITÉ

## D.1 — Principes Directeurs : Gouvernance PCA

```
┌─────────────────────────────────────────────────────────────────┐
│           GOUVERNANCE PCA — RÔLES ET RESPONSABILITÉS              │
│                                                                  │
│  CONSEIL D'ADMINISTRATION                                        │
│  → Responsabilité ultime de la continuité                        │
│  → Approuve Politique de Continuité, budget, RTO/RPO            │
│  → Examine rapport annuel de continuité                          │
│  → Référence : COBAC R-2016/01, Art. 12                         │
│                          │                                       │
│  DIRECTION GÉNÉRALE                                              │
│  → Met en œuvre la Politique, alloue ressources                  │
│  → Active PCA en cas de sinistre, préside Cellule de Crise      │
│  → Assure communication de crise externe                        │
│                          │                                       │
│     ┌────────────────────┼────────────────────┐                 │
│     ▼                    ▼                    ▼                  │
│  RESPONSABLE PCA      COMITÉ RISQUES      AUDIT INTERNE         │
│  → Élabore et          → Évalue risques   → Audite PCA          │
│    maintient PCA         PCA                annuellement         │
│  → Organise tests       → Suit BIA         → Vérifie conformité │
│  → Forme équipes                           → Recommande actions │
│                                                                  │
│  CELLULE DE CRISE (7 membres)                                     │
│  → Président (DG), Coordonnateur PCA, DSI, Directeur Exploitation│
│  → Directeur Financier, Resp. Communication, Resp. Conformité    │
│  → Activée en cas de sinistre. Pilote la réponse. Décide.        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Composition de la Cellule de Crise

| Rôle | Titulaire | Suppléant | Responsabilités en crise |
|------|----------|-----------|------------------------|
| **Président** | Directeur Général | DGA | Décisions stratégiques. Communication externe. |
| **Coordonnateur PCA** | Responsable PCA | Resp. Risques | Activation PCA. Suivi RTO. Main courante. |
| **Responsable SI** | DSI | Admin Systèmes | Bascule serveurs. Restauration données. |
| **Responsable Opérations** | Directeur Exploitation | Resp. Agences | Continuité guichets. Service clients. |
| **Responsable Finances** | Directeur Financier | Chef Comptable | Trésorerie crise. Assurances. |
| **Responsable Communication** | Resp. Communication | Resp. Marketing | Communiqués. Réseaux sociaux. Médias. |
| **Responsable Conformité** | Resp. Conformité | Juriste | Information COBAC. Obligations réglementaires. |

### Convocation de la Cellule de Crise

```
DÉCLENCHEMENT PCA NIVEAU ROUGE
          │
          ▼
APPEL D'URGENCE (SMS groupé + appel individuel)
→ Message type : « PCA NIVEAU ROUGE activé. [Nature incident].
  Rassemblement salle de crise [Lieu] ou conférence [N°].
  Confirmer réception. »
          │
          ▼
DÉLAI DE RASSEMBLEMENT : 30 min (sur site) / 15 min (à distance)
          │
          ▼
PREMIÈRE RÉUNION (T0) :
→ Constat situation (Coordonnateur PCA)
→ Évaluation impacts connus
→ Décisions immédiates (bascule site secours, communication)
→ Répartition actions
          │
          ▼
POINTS DE SITUATION : Toutes les 4h (24 premières heures) puis toutes les 8h
```

---

## D.2 — Phases du PCA

### Cycle de Vie — 5 Phases (ISO 22301 + COBAC)

| Phase | Contenu | Livrable |
|-------|---------|----------|
| **1 — Diagnostic & Analyse de Risques** | Identifier activités critiques, cartographier risques (scénarios), évaluer impacts (BIA), définir RTO/RPO | Rapport Analyse Risques + BIA |
| **2 — Stratégie & Solutions** | Déterminer stratégies continuité, choisir solutions (site secours, télétravail, redondance), budgéter | Stratégie de Continuité approuvée |
| **3 — Documentation & Formation** | Rédiger PCA (document principal + annexes), créer fiches réflexes, former équipes, diffuser procédures | PCA complet + Fiches réflexes |
| **4 — Tests & Exercices** | Test bascule site secours (semestriel), test restauration (mensuel), simulation crise (annuel), test télétravail (semestriel) | Rapports de tests + Actions correctives |
| **5 — Maintenance & Amélioration** | Mise à jour annuelle PCA, intégration REX, audit interne annuel, revue de direction | PCA mis à jour + Rapport audit |

### Programme de Tests Détaillé

| Type de test | Fréquence | Objectif | Participants | Critère réussite |
|-------------|-----------|----------|-------------|-----------------|
| Restauration sauvegarde | Mensuel | Vérifier intégrité et restauration sauvegardes | DSI | Restauration < 2h. Zéro corruption. |
| Bascule site secours | Semestriel | Bascule CBS + applications critiques | DSI + Resp. PCA + Utilisateurs test | Bascule < 4h (RTO). Toutes applis critiques OK. |
| Télétravail massif | Semestriel | Simulation indisponibilité siège. 100% personnel critique à distance. | Tout le personnel | 90% connectés < 2h. Applis accessibles. |
| Groupes électrogènes charge | Trimestriel | Simulation coupure. Vérifier autonomie réelle. | DSI + Services généraux | Démarrage < 30s. Autonomie ≥ théorique × 0,8. |
| Simulation de crise | Annuel | Scénario complet (ex: incendie). Cellule Crise. Communication. | Cellule Crise + CA + COBAC (observateur) | Cellule constituée < 30 min. Décisions documentées. |
| Procédure absence ADG | Annuel | Simulation indisponibilité ADG 48h. Délégation. CA urgence. | DG + DGA + CA | Délégation effective < 1h. Continuité décisions. |

---

## D.3 — Obligations Réglementaires COBAC et UEMOA

### Synthèse des Obligations

| Source | Obligation | Sanction si non-respect |
|--------|-----------|------------------------|
| **COBAC R-2008/01, Art. 4** | PCA documenté, approuvé CA | Observation → Injonction → Sanction pécuniaire |
| **COBAC R-2008/01, Art. 5** | Site de secours distant opérationnel | Injonction, sanction |
| **COBAC R-2008/01, Art. 6** | DMA < 4h activités critiques | Observation → Injonction |
| **COBAC R-2008/01, Art. 8** | Sauvegarde quotidienne externalisée | Injonction, sanction |
| **COBAC R-2008/01, Art. 10** | Information COBAC en cas de sinistre majeur (immédiate, puis < 48h) | Sanction pécuniaire |
| **COBAC R-2016/01, Art. 13** | PCA testé ≥ 1 fois/an | Observation → Injonction |
| **COBAC R-2016/01, Art. 14** | Cellule de crise constituée | Manquement gouvernance |
| **COBAC R-2016/01, Art. 15** | Procédure communication de crise | Manquement gouvernance |
| **COBAC R-2016/01, Art. 16** | Revue annuelle PCA par Audit Interne | Manquement gouvernance |
| **BCEAO Circ. 01-2017, Art. 8** | CA responsable de la continuité | Manquement gouvernance |
| **BCEAO Circ. 01-2017, Art. 9** | Comité des Risques examine PCA | Manquement gouvernance |
| **BCEAO Circ. 003-2020** | PCA composante du Plan de Résolution | Sanction prudentielle |

### Calendrier Réglementaire PCA

| Périodicité | Obligation | Référence |
|------------|-----------|----------|
| **Annuelle** | Test complet PCA | COBAC R-2016/01, Art. 13 |
| **Annuelle** | Audit interne PCA | COBAC R-2016/01, Art. 16 |
| **Annuelle** | Revue PCA par CA | COBAC R-2016/01, Art. 12 |
| **Annuelle** | Rapport continuité au CA | COBAC R-2016/01, Art. 12 |
| **Immédiate** | Information COBAC sinistre majeur | COBAC R-2008/01, Art. 10 |
| **Sous 48h** | Notification formelle sinistre | COBAC R-2008/01, Art. 10 |
| **Continue** | Maintien site secours opérationnel | COBAC R-2008/01, Art. 5 |
| **Quotidienne** | Sauvegarde externalisée | COBAC R-2008/01, Art. 8 |

---

# PARTIE E — COVID-19 & RÉSILIENCE BANCAIRE

## E.1 — Constats : Insuffisance des PCA face à la Pandémie

### Les 6 Défaillances Révélées

| Constat | Description |
|---------|------------|
| **1 — PCA « Pandémie » inexistant** | 95% des banques africaines n'avaient pas de scénario pandémique. Le scénario « grippe aviaire » était une hypothèse théorique jamais testée. |
| **2 — PCA centrés sinistres physiques** | Calibrés pour incendie, inondation, panne serveur. Pas pour crise sanitaire mondiale avec confinement généralisé, fermeture frontières, distanciation. |
| **3 — Hypothèse de travail invalidée** | « Une partie du personnel sera disponible sur le site de secours » — invalidé quand 100% du personnel est confiné à domicile. |
| **4 — Sous-investissement télétravail** | < 30% des banques africaines avaient une infrastructure télétravail opérationnelle en mars 2020. VPN sous-dimensionnés, pas de laptops, pas de visio sécurisée. |
| **5 — Dépendance aux agences physiques** | 70-80% des transactions passent par les agences. Leur fermeture (distanciation, couvre-feu) a paralysé l'activité. |
| **6 — Absence de PCA fournisseurs critiques** | Défaillance fournisseurs externes (transport fonds, maintenance CBS, gardiennage) non anticipée. |

### Leçons Apprises

| Leçon | Impact PCA |
|-------|-----------|
| Le PCA doit intégrer le télétravail de masse (100% du personnel critique) | Nouveau scénario : « Confinement sanitaire » |
| La dépendance au cash est un risque de continuité | Accélération mobile banking, mobile money, agent banking |
| Les fournisseurs critiques sont un maillon faible | Nouveau chapitre PCA : « Externalisation et dépendances » |
| La communication de crise doit être multicanal | SMS, radio locale, affichage + réseaux sociaux |
| Le PCA doit être vivant | Mise à jour continue (pas seulement annuelle) |
| La santé du personnel est un actif critique | Nouveau chapitre : « Continuité des Ressources Humaines » |

---

## E.2 — Mesures Correctives

### Plan de Remédiation Post-COVID-19 — 6 Mesures

```
┌─────────────────────────────────────────────────────────────────┐
│           PLAN DE REMÉDIATION — RÉSILIENCE POST-COVID-19          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  MESURE 1 — DIGITALISATION ACCÉLÉRÉE                              │
│  → Ouverture de compte 100% digitale                            │
│  → Mobile Banking enrichi (virements, crédit, DAT)              │
│  → Agent Banking (réseau d'agents pour cash-in/out)             │
│  → Signature électronique. Paiement digital (QR, mobile money)  │
│                                                                  │
│  MESURE 2 — INFRASTRUCTURE TÉLÉTRAVAIL RENFORCÉE                 │
│  → VPN dimensionné pour 100% effectif                           │
│  → Laptop + connexion Internet pour tout le personnel           │
│  → Solutions collaboratives (Teams, SharePoint)                 │
│  → Scénario télétravail intégré au PCA. Test massif semestriel   │
│                                                                  │
│  MESURE 3 — RSE & PROTECTION DU PERSONNEL                        │
│  → Politique santé/sécurité au travail renforcée                │
│  → Plan protection pandémique (EPI, distanciation)              │
│  → Soutien psychologique (cellule d'écoute)                     │
│  → Assurance maladie complémentaire (incluant évacuation)       │
│  → RSE élargie (reports échéances clients vulnérables)          │
│                                                                  │
│  MESURE 4 — RÉVISION CARTOGRAPHIE DES RISQUES                    │
│  → Ajout scénario « Pandémie / Crise sanitaire » + BIA dédiée  │
│  → Ajout risque « Défaillance fournisseur critique »            │
│  → Stress test 100% télétravail 2 semaines                      │
│  → Pandémie : probabilité « improbable » → « possible »         │
│                                                                  │
│  MESURE 5 — CONTRACTUALISATION SERVICES EXTERNALISÉS             │
│  → PCA fournisseur exigé contractuellement (clause obligatoire) │
│  → SLA avec pénalités. Double source fournisseurs critiques     │
│  → Plan remplacement urgence (backup fournisseur)               │
│  → Test annuel continuité fournisseur                           │
│                                                                  │
│  MESURE 6 — GOUVERNANCE DE CRISE RENFORCÉE                       │
│  → Cellule Crise formée et entraînée (exercice annuel pandémie) │
│  → Plan succession urgence (DG, DGA, directeurs)                │
│  → Délégations pouvoirs formalisées tous niveaux                │
│  → Communication crise multicanal (SMS, radio, réseaux, presse) │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Checklist — Mise à Jour PCA Post-COVID-19

```yaml
# CHECKLIST — MISE À JOUR PCA POST-COVID-19
Reference: PCA-CL-COV-001

NOUVEAU_SCÉNARIO_PANDÉMIE:
  - [ ] Scénario « Pandémie / Crise sanitaire » ajouté au PCA
  - [ ] BIA spécifique pandémie réalisée (toutes activités impactées)
  - [ ] RTO spécifiques définis (activation télétravail < 4h)
  - [ ] Procédure bascule documentée (bascule 100% télétravail)
  - [ ] Fiche réflexe dédiée créée

INFRASTRUCTURE_TÉLÉTRAVAIL:
  - [ ] VPN dimensionné pour 100% effectif simultané
  - [ ] Test charge VPN (100% connexions simultanées) réalisé
  - [ ] Laptops disponibles pour 100% personnel critique
  - [ ] Connexion Internet secours personnel clé (clé 4G)
  - [ ] Solutions collaboratives déployées et maîtrisées
  - [ ] Test télétravail massif (2 jours) réalisé dans les 12 mois

PROTECTION_DU_PERSONNEL:
  - [ ] Stock EPI (masques, gel) pour 30 jours
  - [ ] Protocole distanciation physique documenté
  - [ ] Plan roulement équipes (A/B) documenté
  - [ ] Cellule écoute psychologique disponible
  - [ ] Assurance maladie complémentaire vérifiée (inclusion pandémie)

FOURNISSEURS_CRITIQUES:
  - [ ] Liste fournisseurs critiques mise à jour
  - [ ] PCA fournisseur exigé contractuellement
  - [ ] SLA révisés post-COVID
  - [ ] Fournisseur secours identifié pour chaque service critique
  - [ ] Test continuité fournisseur réalisé

COMMUNICATION_DE_CRISE:
  - [ ] Plan communication multicanal documenté
  - [ ] Messages types pré-rédigés (clients, employés, COBAC, médias)
  - [ ] Liste contacts médias à jour
  - [ ] Procédure communication clients sans smartphone (SMS, radio)

GOUVERNANCE:
  - [ ] Plan succession urgence mis à jour
  - [ ] Délégations pouvoirs signées
  - [ ] Cellule Crise entraînée sur scénario pandémique
  - [ ] PCA approuvé par CA (post-mise à jour)
```

---

# GLOSSAIRE

| Terme | Définition | Domaine |
|-------|-----------|---------|
| **ADG** | Administrateur Directeur Général — dirigeant effectif | Gouvernance |
| **AUSCGIE** | Acte Uniforme OHADA — Droit des Sociétés Commerciales | Juridique |
| **BIA** | Business Impact Analysis — analyse d'impact sur activités | PCA |
| **CAC** | Commissaire aux Comptes — auditeur externe légal | Audit |
| **CAR** | Comité d'Audit et des Risques | Gouvernance |
| **CBS** | Core Banking System — système d'information bancaire central | SI |
| **DMA** | Durée Maximale d'Interruption Admissible | PCA |
| **DMR** | Dispositif de Maîtrise des Risques | Risque |
| **DRaaS** | Disaster Recovery as a Service — PCA/PCI externalisé cloud | SI |
| **DSI** | Directeur des Systèmes d'Information | SI |
| **ESB** | Enterprise Service Bus — middleware d'intégration applicative | SI |
| **GED** | Gestion Électronique de Documents | SI |
| **Hyper-V** | Hyperviseur Microsoft | Infrastructure |
| **ISO 22301** | Norme internationale SMCA (Système Management Continuité Activité) | PCA |
| **LAN** | Local Area Network — réseau local | Réseau |
| **MFA** | Multi-Factor Authentication | Sécurité |
| **NGFW** | Next-Generation FireWall | Sécurité |
| **ONECCA** | Ordre National Experts-Comptables et Commissaires aux Comptes Agréés | Audit |
| **PCA** | Plan de Continuité d'Activité | Résilience |
| **PCI** | Plan de Continuité Informatique | SI |
| **PGP** | Pretty Good Privacy — chiffrement emails/fichiers | Sécurité |
| **PKI** | Public Key Infrastructure | Sécurité |
| **PPR** | Plan Préventif de Redressement | Prudentiel |
| **RCCM** | Registre du Commerce et du Crédit Mobilier | Juridique |
| **RPO** | Recovery Point Objective — perte maximale données admissible | PCA |
| **RTO** | Recovery Time Objective — durée maximale interruption admissible | PCA |
| **RSE** | Responsabilité Sociétale des Entreprises | ESG |
| **SAN** | Storage Area Network | Infrastructure |
| **SMCA** | Système de Management de la Continuité d'Activité | PCA |
| **SOC** | Security Operations Center — centre cybersécurité | Sécurité |
| **SWIFT** | Society for Worldwide Interbank Financial Telecommunication | Bancaire |
| **TPE** | Terminal de Paiement Électronique | Monétique |
| **VSAT** | Very Small Aperture Terminal — liaison satellite | Réseau |
| **WAN** | Wide Area Network — réseau étendu | Réseau |

---

*Document élaboré par KHEPRA EXPERTS — Regulatory & Financial Services BU — Partie 2/2*
*Version 1.0 — 07 Juin 2026*
*Partie 1/2 : [KHEPRA_FINAM_PCA_KNOWLEDGE.md](./KHEPRA_FINAM_PCA_KNOWLEDGE.md) — FINAM Congo (Agrément COBAC) · PCA/PCI (Continuité d'Activité)*