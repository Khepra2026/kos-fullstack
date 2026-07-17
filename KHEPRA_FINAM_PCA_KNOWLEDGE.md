# KHEPRA FINAM · PCA · PCI — KNOWLEDGE BASE (Partie 1/2)
## Agrément COBAC · Plans de Continuité d'Activité · Plans de Continuité Informatique
### Version 1.0 · 07 Juin 2026 · Niveau Big Four

> **Documents liés** : [KHEPRA_AI_GOVERNANCE.md](./KHEPRA_AI_GOVERNANCE.md) — §4.5 PPR, §4.6 Résolution Crises, §4.8 Rapport Annuel SCI & Risques, §4.9 Charte Audit Interne, §4.10 Architecture de Gouvernance
> **Schémas Directeurs SI & Résilience (Partie 2/2)** : [KHEPRA_FINAM_SI_RESILIENCE_KNOWLEDGE.md](./KHEPRA_FINAM_SI_RESILIENCE_KNOWLEDGE.md) — Architecture SI BGFIBank, Gouvernance Continuité, COVID-19
> **CBS & Microfinance** : [KHEPRA_CBS_MICROFINANCE_KNOWLEDGE.md](./KHEPRA_CBS_MICROFINANCE_KNOWLEDGE.md)
> **ProBoutik · BGFI · AMIFA** : [KHEPRA_PROBOUTIK_BGFI_AMIFA_KNOWLEDGE.md](./KHEPRA_PROBOUTIK_BGFI_AMIFA_KNOWLEDGE.md)
> **Outils d'audit** : [scripts/khepra_audit_balance.py](./scripts/khepra_audit_balance.py), [scripts/khepra_calcul_par_provisions.py](./scripts/khepra_calcul_par_provisions.py), [scripts/khepra_stress_test_portefeuille.py](./scripts/khepra_stress_test_portefeuille.py)

---

Ce document constitue la **Partie 1/2** de la base de connaissance FINAM · PCA · SI. Il couvre : (A) le dossier d'agrément FINAM Congo selon les exigences COBAC, (B) les Plans de Continuité d'Activité (PCA) et Plans de Continuité Informatique (PCI) selon COBAC et ISO 22301. La **Partie 2/2** couvre les Schémas Directeurs SI, la Gouvernance de la continuité et la Résilience COVID-19.

---

## SOMMAIRE

```
PARTIE A — FINAM CONGO : DOSSIER D'AGRÉMENT & CRÉATION COBAC
  A.1  Cadre réglementaire : Articles 13, 15, 18, 19 COBAC
  A.2  Pièces juridiques, notariales et administratives requises
  A.3  Points critiques : Actionnaires, Signatures, Conventions, Organigramme
  A.4  Check-list opérationnelle : Dossier d'agrément SFD COBAC

PARTIE B — PLANS DE CONTINUITÉ D'ACTIVITÉ (PCA) & INFORMATIQUE (PCI)
  B.1  Cadre méthodologique : COBAC, ISO 22301, Pratiques BGFIBank
  B.2  Cartographie des scénarios de sinistres
  B.3  Matrice BIA (Business Impact Analysis) détaillée
  B.4  Procédures de bascule par scénario + Fiches réflexes
```

---

# PARTIE A — FINAM CONGO : DOSSIER D'AGRÉMENT & CRÉATION COBAC

## A.1 — Cadre Réglementaire COBAC

### Textes de Référence

| Texte | Objet | Articles clés |
|-------|-------|--------------|
| **Règlement COBAC R-2009/01** | Agrément des établissements de microfinance | Art. 6-25 |
| **Règlement COBAC R-2018/01** | LCB/FT — Obligations des assujettis | Art. 5-54 |
| **Circulaire COBAC N° 001-2017/CB/C** | Gouvernement d'entreprise | Art. 4-22 |
| **AUSCGIE OHADA** | Droit des sociétés commerciales | Art. 1-918 |
| **Règlement COBAC R-2016/01** | Contrôle interne | Art. 1-30 |

### Articles Structurants — R-2009/01

```
┌─────────────────────────────────────────────────────────────────┐
│           ARTICLES COBAC — DOSSIER D'AGRÉMENT SFD                 │
│           Règlement COBAC R-2009/01                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ARTICLE 13 — DEMANDE D'AGRÉMENT                                │
│  └── Adressée au Secrétaire Général de la COBAC par les         │
│      fondateurs. Contenu obligatoire : dénomination sociale,     │
│      forme juridique, siège social, identité des fondateurs,     │
│      liste des administrateurs et dirigeants, capital social     │
│      (libéré intégralement), programme d'activité.               │
│                                                                  │
│  ARTICLE 15 — PIÈCES CONSTITUTIVES                              │
│  └── Dossier complet : statuts notariés, PV AG Constitutive,     │
│      bulletins de souscription, attestation libération capital,  │
│      liste administrateurs/dirigeants avec CV, extrait casier    │
│      judiciaire (< 3 mois), déclaration sur l'honneur,           │
│      programme d'activité 3 exercices, manuels de procédures,    │
│      convention d'affiliation (si SFD affilié à un réseau).      │
│                                                                  │
│  ARTICLE 18 — CAPITAL SOCIAL MINIMUM                             │
│  └── Fixé par instruction du Gouverneur BEAC. Variable selon     │
│      catégorie SFD (1ère, 2ème, 3ème). Capital intégralement     │
│      libéré avant dépôt du dossier.                              │
│                                                                  │
│  ARTICLE 19 — HONORABILITÉ ET COMPÉTENCE                         │
│  └── Administrateurs et dirigeants : honorabilité irréprochable  │
│      (casier B3 vierge), compétence professionnelle avérée       │
│      (CV détaillé), expérience minimale secteur financier.       │
│      → La COBAC peut s'opposer à toute nomination.               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Procédure d'Agrément — 5 Phases

```
┌─────────────────────────────────────────────────────────────────┐
│           PROCÉDURE D'AGRÉMENT SFD — COBAC                        │
│                                                                  │
│  PHASE 1 — PRÉPARATION (1-2 mois)                                │
│  ├── Constitution du groupe fondateur                             │
│  ├── Rédaction des statuts (notaire)                             │
│  ├── Collecte CV et casiers judiciaires                          │
│  ├── Rédaction du programme d'activité                           │
│  └── Rédaction des manuels de procédures                         │
│                                                                  │
│  PHASE 2 — CONSTITUTION JURIDIQUE (1 mois)                        │
│  ├── Tenue de l'AG Constitutive                                  │
│  ├── Libération intégrale du capital social                      │
│  ├── Obtention attestation bancaire de libération                │
│  ├── Désignation formelle administrateurs et dirigeants           │
│  ├── Désignation des Commissaires aux Comptes                    │
│  └── Immatriculation au RCCM                                      │
│                                                                  │
│  PHASE 3 — DÉPÔT COBAC                                             │
│  ├── Compilation du dossier complet (Art. 15)                    │
│  ├── Dépôt contre récépissé au Secrétariat Général COBAC         │
│  └── Délai d'instruction légal : 3 mois (prorogeable 1 fois)     │
│                                                                  │
│  PHASE 4 — INSTRUCTION COBAC (3-6 mois)                           │
│  ├── Analyse du dossier, demandes de compléments                │
│  ├── Enquête sur place (visite locaux, entretiens)              │
│  ├── Vérification honorabilité (INTERPOL, ANIF, casiers)         │
│  └── Avis conforme du Ministre des Finances                      │
│                                                                  │
│  PHASE 5 — DÉCISION                                               │
│  ├── Agrément accordé : Notification + publication JO            │
│  └── Refus : Notification motivée + recours possible             │
│                                                                  │
│  DÉLAI TOTAL : 6-12 mois                                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## A.2 — Pièces Juridiques, Notariales et Administratives

### Dossier Complet — 11 Catégories de Pièces

#### Catégorie 1 — Pièces Juridiques Fondamentales

| N° | Document | Format requis | Observations KHEPRA |
|----|----------|--------------|---------------------|
| 1.1 | Statuts notariés | Original ou copie certifiée conforme | Doivent inclure : dénomination, forme sociale, objet, siège, durée, capital, modalités AG, pouvoirs DG/CA. Conformes AUSCGIE OHADA. |
| 1.2 | PV de l'Assemblée Générale Constitutive | Original signé par tous les fondateurs | Mentionne : adoption statuts, nomination administrateurs, nomination DG, désignation CAC titulaire/suppléant, libération capital. |
| 1.3 | Déclaration de régularité et de conformité | Original notarié | Atteste que la constitution respecte les lois en vigueur. Délivrée par le notaire instrumentaire. |
| 1.4 | Extrait RCCM | Copie certifiée < 3 mois | Vérifier concordance exacte RCCM ↔ statuts (dénomination, siège, capital). |

#### Catégorie 2 — Pièces Relatives au Capital Social

| N° | Document | Format requis | Observations KHEPRA |
|----|----------|--------------|---------------------|
| 2.1 | Bulletins de souscription des actions | Originaux signés par chaque actionnaire | Un bulletin par actionnaire. Doivent correspondre exactement à la répartition statutaire. |
| 2.2 | Attestation bancaire de libération intégrale du capital | Original < 30 jours | Délivrée par banque agréée CEMAC. Montant libéré = capital statutaire. Aucune avance en compte courant substituable. |
| 2.3 | Relevé d'identité bancaire | Copie | Compte ouvert au nom de la société. |
| 2.4 | État de répartition du capital | Document signé par le représentant légal | Tableau : nom actionnaire, nombre actions, valeur nominale, montant, % capital, nationalité. |

#### Catégorie 3 — Pièces Relatives aux Dirigeants et Administrateurs

| N° | Document | Format requis | Observations KHEPRA |
|----|----------|--------------|---------------------|
| 3.1 | Liste nominative des administrateurs | Signée Président CA | Noms complets, nationalité, domicile, profession, mandats antérieurs. Minimum 3 administrateurs (SA). |
| 3.2 | Liste nominative des dirigeants effectifs | Signée Président CA | DG, DGA le cas échéant, Resp. Crédit, Resp. Contrôle Interne, Resp. Conformité. |
| 3.3 | CV détaillés (chaque admin + dirigeant) | Original signé par l'intéressé | Formation, expérience (> 5 ans secteur financier recommandé), mandats en cours. |
| 3.4 | Extraits de casier judiciaire (Bulletin N°3) | Original < 3 mois | Pour chaque administrateur et dirigeant. Vierge pour infractions financières. |
| 3.5 | Déclarations sur l'honneur | Original signé par l'intéressé | Conforme Annexe 1 Circulaire N° 02-2017/CB/C. |
| 3.6 | Déclarations de conflit d'intérêts | Original signé par l'intéressé | Conforme Annexe 2 Circulaire N° 02-2017/CB/C. 8 tables standardisées. |

#### Catégorie 4 — Pièces Relatives aux Commissaires aux Comptes

| N° | Document | Format requis | Observations KHEPRA |
|----|----------|--------------|---------------------|
| 4.1 | PV de désignation CAC titulaire et suppléant | Extrait PV AG Constitutive | Mentionne l'acceptation formelle de mission. |
| 4.2 | Lettre d'acceptation de mission du CAC | Original signé | Indépendance confirmée. Cabinet inscrit à l'ONECCA. |
| 4.3 | Agrément COBAC du CAC (si requis) | Copie | SFD 1ère catégorie : CAC agréé COBAC obligatoire. |

#### Catégorie 5 — Programme d'Activité et Business Plan

| N° | Document | Format requis | Observations KHEPRA |
|----|----------|--------------|---------------------|
| 5.1 | Programme d'activité 3 exercices | Signé par le représentant légal | Produits/services, zone de couverture, clientèle cible, projections financières. Conforme [MFI_BUSINESS_PLAN_FRAMEWORK_UEMOA.md](./MFI_BUSINESS_PLAN_FRAMEWORK_UEMOA.md) adapté CEMAC. |
| 5.2 | Comptes prévisionnels 3 exercices | Tableaux financiers | Bilan, compte de résultat, TFT, ratios prudentiels projetés. |
| 5.3 | Plan de financement initial | Tableau détaillé | Investissements, BFR, sources de financement (capital, emprunts). |
| 5.4 | Organigramme fonctionnel | Schéma + description | Structure organisationnelle complète avec effectifs prévus. |

#### Catégorie 6 — Manuels de Procédures

| N° | Document | Format requis | Observations KHEPRA |
|----|----------|--------------|---------------------|
| 6.1 | Manuel Crédit | Document formalisé signé | Processus : instruction, analyse, octroi, décaissement, suivi, recouvrement. Scoring. Limites délégation. |
| 6.2 | Manuel Épargne | Document formalisé signé | Processus : ouverture compte, versements, retraits, clôture, DAT, tontines. |
| 6.3 | Manuel Contrôle Interne | Document formalisé signé | Dispositif 3 lignes de défense. Conforme COBAC R-2016/01. |
| 6.4 | Manuel LCB/FT | Document formalisé signé | Conforme COBAC R-2018/01. Profilage risque, filtrage, déclaration soupçon. |
| 6.5 | Manuel Comptable | Document formalisé signé | Plan comptable SFD, schémas d'écritures, procédures de clôture. |

#### Catégorie 7 — Locaux et Infrastructure

| N° | Document | Format requis | Observations KHEPRA |
|----|----------|--------------|---------------------|
| 7.1 | Titre de propriété ou bail commercial | Copie certifiée | Siège + agences. Bail ≥ 3 ans. |
| 7.2 | Plan des locaux + descriptif sécurité | Schéma + document | Normes sécurité (incendie, accès, évacuation). |
| 7.3 | Contrat CBS (maintenance ou acquisition) | Copie | SI bancaire conforme exigences COBAC (traçabilité, audit trail). |
| 7.4 | Police d'assurance (locaux, RC) | Copie | Couverture risques opérationnels de base. |

#### Catégorie 8 — Convention d'Affiliation (si SFD affilié)

| N° | Document | Format requis | Observations KHEPRA |
|----|----------|--------------|---------------------|
| 8.1 | Convention d'affiliation au réseau | Original signé par les 2 parties | Obligatoire si SFD affilié (ex: réseau FINAM). Objet, obligations réciproques, redevances, durée, résiliation. |
| 8.2 | Agrément COBAC du réseau | Copie | Preuve agrément du réseau tête de réseau. |
| 8.3 | Charte du réseau | Copie signée | Adhésion aux principes et règles du réseau. |

#### Catégorie 9 — Pièces Fiscales et Sociales

| N° | Document | Format requis | Observations KHEPRA |
|----|----------|--------------|---------------------|
| 9.1 | Numéro d'Identification Fiscale (NIF) | Copie | Immatriculation DGI. |
| 9.2 | Immatriculation CNSS | Copie | Obligatoire dès le 1er employé. |
| 9.3 | Attestation situation fiscale régulière | Original < 3 mois | Pour chaque administrateur/dirigeant personne morale. |

#### Catégorie 10 — Déclarations et Engagements

| N° | Document | Format requis | Observations KHEPRA |
|----|----------|--------------|---------------------|
| 10.1 | Lettre d'engagement respect réglementation COBAC | Original signé par le représentant légal | Engagement formel. |
| 10.2 | Engagement de non-collecte épargne avant agrément | Original signé | Obligation légale absolue. |
| 10.3 | Déclaration honorabilité personnes morales actionnaires | Original signé | Extrait casier judiciaire personne morale (si applicable). |

#### Catégorie 11 — Pièces Complémentaires

| N° | Document | Format requis | Observations KHEPRA |
|----|----------|--------------|---------------------|
| 11.1 | Autorisation préalable Ministère des Finances | Original | Requise dans certains pays CEMAC avant dépôt COBAC. |
| 11.2 | Étude de marché | Document signé | Justifie viabilité économique zone de couverture. |
| 11.3 | Convention de domiciliation bancaire | Copie | Compte ouvert auprès d'une banque agréée CEMAC. |

---

## A.3 — Points Critiques FINAM Congo

### Point Critique 1 — Identité des Actionnaires Indépendants

La COBAC exige (Circ. N° 001-2017/CB/C, Art. 6) que les administrateurs indépendants soient clairement identifiés et répondent à 5 critères :

| Critère d'indépendance (Art. 6) | Vigilance FINAM Congo |
|--------------------------------|----------------------|
| Pas de relation d'affaires avec la société | Vérifier liens capitalistiques avec fondateurs |
| Pas de lien familial avec les dirigeants | Recueillir déclaration de liens familiaux |
| Pas de mandat croisé | Vérifier mandats dans autres SFD du réseau FINAM |
| Pas d'ancien salarié (< 5 ans) | Vérifier parcours professionnel complet |
| Pas de rémunération hors jetons de présence | Déclaration de l'ensemble des rémunérations |

> **Alerte KHEPRA** : Dans les réseaux de microfinance, le risque est que tous les administrateurs soient issus du même cercle (fondateurs, réseau, famille). Un administrateur non indépendant présenté comme indépendant = rejet du dossier.

### Point Critique 2 — Signatures Manquantes

| Document à risque | Cause fréquente | Bloquant ? |
|------------------|----------------|-----------|
| Bulletins de souscription | Actionnaires non joignables (diaspora) | **OUI** |
| Statuts notariés | Délai signature notariale | **OUI** |
| PV AG Constitutive | Non-tenue formelle de l'AG | **OUI** |
| Déclaration sur l'honneur | Négligence administrative | **OUI** |
| Déclaration conflit d'intérêts | Complexité formulaire, réticence | OUI — retarde |
| Convention d'affiliation | Négociation toujours en cours | **OUI** si SFD affilié |
| Lettre acceptation CAC | CAC pas encore identifié | **OUI** |

### Point Critique 3 — Convention d'Affiliation FINAM

La convention d'affiliation doit couvrir 9 articles minimum :

```
Article 1 — OBJET : Affiliation du SFD Congo au réseau FINAM
Article 2 — OBLIGATIONS DU RÉSEAU : Assistance technique (CBS,
           procédures, formation), Audit interne mutualisé,
           Refinancement, Représentation COBAC, Centralisation risques
Article 3 — OBLIGATIONS DU SFD AFFILIÉ : Respect charte réseau,
           Transmission états financiers, Paiement redevance,
           Application procédures standardisées, Participation
           instances gouvernance réseau
Article 4 — GOUVERNANCE : Représentation réseau au CA, Droit de
           regard sur nominations clés, Approbation décisions
           stratégiques
Article 5 — REDEVANCE : Montant, Périodicité, Modalités de révision
Article 6 — DURÉE & RÉSILIATION : Durée initiale (3 ans recommandé),
           Conditions résiliation anticipée, Préavis (6 mois min.)
Article 7 — RESPONSABILITÉ : Chaque entité juridiquement indépendante
Article 8 — CONFIDENTIALITÉ & DONNÉES : Protection données clients
Article 9 — RÈGLEMENT DES LITIGES : Arbitrage, Droit applicable
```

### Point Critique 4 — Organigramme du Groupe

La COBAC exige un organigramme montrant : structure de l'actionnariat, liens avec le réseau FINAM, liens avec autres SFD du réseau, organigramme fonctionnel complet.

---

## A.4 — Check-List Opérationnelle : Dossier d'Agrément COBAC

```yaml
# CHECK-LIST — DOSSIER D'AGRÉMENT SFD COBAC
Reference: FINAM-CL-AGR-001
Statut: [ ] En préparation / [ ] Complet / [ ] Déposé COBAC

PIÈCES_JURIDIQUES:
  - [ ] Statuts notariés (originaux ou copies certifiées)
  - [ ] PV AG Constitutive (original signé tous fondateurs)
  - [ ] Déclaration de régularité et conformité (notariée)
  - [ ] Extrait RCCM (< 3 mois)
  - [ ] Vérification KHEPRA : Concordance statuts ↔ RCCM

CAPITAL_SOCIAL:
  - [ ] Bulletins de souscription (originaux signés, un par actionnaire)
  - [ ] Attestation bancaire de libération intégrale (< 30j)
  - [ ] État de répartition du capital (tableau signé)
  - [ ] Vérification KHEPRA : Capital libéré ≥ minimum COBAC catégorie
  - [ ] Vérification KHEPRA : Répartition conforme aux statuts

DIRIGEANTS_ET_ADMINISTRATEURS:
  - [ ] Liste nominative administrateurs (signée Président CA)
  - [ ] Liste nominative dirigeants effectifs (signée Président CA)
  - [ ] CV détaillés (tous admin + dirigeants, signés)
  - [ ] Extraits casier B3 (< 3 mois, tous les intéressés)
  - [ ] Déclarations sur l'honneur (Annexe 1, tous)
  - [ ] Déclarations conflit d'intérêts (Annexe 2, 8 tables, tous)
  - [ ] Vérification KHEPRA : Au moins 1 administrateur indépendant
  - [ ] Vérification KHEPRA : Expérience secteur financier ≥ 5 ans (DG)

COMMISSAIRES_AUX_COMPTES:
  - [ ] PV désignation CAC titulaire et suppléant
  - [ ] Lettre d'acceptation de mission (original signé)
  - [ ] Agrément COBAC du CAC (si requis)
  - [ ] Vérification KHEPRA : CAC inscrit ONECCA

PROGRAMME_D_ACTIVITE:
  - [ ] Programme d'activité 3 exercices (signé)
  - [ ] Comptes prévisionnels 3 exercices
  - [ ] Plan de financement initial
  - [ ] Organigramme fonctionnel détaillé

MANUELS_DE_PROCEDURES:
  - [ ] Manuel Crédit (signé, complet)
  - [ ] Manuel Épargne (signé, complet)
  - [ ] Manuel Contrôle Interne (signé, complet)
  - [ ] Manuel LCB/FT (signé, complet)
  - [ ] Manuel Comptable (signé, complet)

LOCAUX_ET_INFRASTRUCTURE:
  - [ ] Titre de propriété ou bail commercial (siège + agences)
  - [ ] Plan locaux + descriptif sécurité
  - [ ] Contrat CBS (maintenance ou acquisition)
  - [ ] Police d'assurance (locaux, RC)

CONVENTION_D_AFFILIATION:
  - [ ] Convention d'affiliation FINAM (original signé 2 parties)
  - [ ] Agrément COBAC du réseau FINAM
  - [ ] Charte du réseau (signée)

PIECES_FISCALES_ET_SOCIALES:
  - [ ] NIF
  - [ ] Immatriculation CNSS

DECLARATIONS_ET_ENGAGEMENTS:
  - [ ] Lettre engagement respect réglementation COBAC (signée)
  - [ ] Engagement non-collecte épargne avant agrément (signé)
  - [ ] Déclaration honorabilité personnes morales (si applicable)

VALIDATION_FINALE_KHEPRA:
  - [ ] Tous documents signés par personnes habilitées
  - [ ] Toutes signatures originales (pas scans ni copies)
  - [ ] Tous documents < 3 mois dans les délais
  - [ ] Dossier relié, paginé, bordereau récapitulatif
  - [ ] 4 copies : COBAC, Ministère Finances, SFD, Conseil
  - [ ] Dépôt contre récépissé daté et signé
```

---

# PARTIE B — PLANS DE CONTINUITÉ D'ACTIVITÉ (PCA) & INFORMATIQUE (PCI)

## B.1 — Cadre Méthodologique

### Triple Référentiel

| Référentiel | Application SFD/Banque |
|------------|----------------------|
| **COBAC R-2008/01** | PCA documenté, site de secours distant, DMA < 4h activités critiques, sauvegarde quotidienne externalisée, test annuel minimum |
| **COBAC R-2016/01** | PCA testé ≥ 1 fois/an (Art. 13), Cellule de crise constituée (Art. 14), Procédure communication crise (Art. 15), Audit interne PCA annuel (Art. 16) |
| **ISO 22301:2019** | SMCA complet : Contexte (4), Leadership (5), Planification (6), Support (7), Opération (8 — BIA, stratégies, bascules, tests), Évaluation (9), Amélioration (10) |

### Exigences Détaillées COBAC

| Exigence | Article | Implication |
|----------|---------|------------|
| PCA documenté, approuvé CA | R-2016/01, Art. 12 | Document formel, signé, diffusé |
| PCA testé ≥ 1 fois/an | R-2016/01, Art. 13 | Exercice simulation avec rapport |
| Site de secours opérationnel | R-2008/01, Art. 5 | Site distant géographiquement |
| DMA défini | R-2008/01, Art. 6 | < 4h pour activités critiques |
| Cellule de crise constituée | R-2016/01, Art. 14 | Liste nominative, suppléants, contacts |
| Communication de crise | R-2016/01, Art. 15 | Modèles communiqués, circuit validation |
| Sauvegarde quotidienne externalisée | R-2008/01, Art. 8 | Site distant, chiffrement, test restauration |
| Revue annuelle par Audit Interne | R-2016/01, Art. 16 | Rapport d'audit avec recommandations |

### Benchmark BGFIBank — Pratiques Terrain

```
┌─────────────────────────────────────────────────────────────────┐
│           BGFIBANK — DISPOSITIF PCA (PRATIQUES OBSERVÉES)        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  SITE PRINCIPAL : Siège Libreville (Gabon)                       │
│  → Datacenter principal (CBS, SWIFT, email) — 600 personnes      │
│                                                                  │
│  SITE DE SECOURS : À 15 km du siège                              │
│  → Datacenter de secours (réplication asynchrone)                │
│  → Capacité : 80 postes (13% effectif) — Bascules testées 2x/an  │
│                                                                  │
│  ORGANISATION PCA :                                               │
│  ├── Comité de Crise (7 membres) : DG, DGA, DSI, DF,             │
│  │   Resp. Risques, Resp. Conformité, Resp. Communication        │
│  ├── Équipe PCA dédiée (3 personnes temps plein)                 │
│  └── PCA par direction (25 PCA détaillés)                        │
│                                                                  │
│  POINTS FORTS : PCA documentés + testés, Cellule Crise           │
│  identifiée, Sauvegardes externalisées quotidiennes              │
│                                                                  │
│  POINTS FAIBLES : Site secours dimensionné à 13% (insuffisant),  │
│  Réplication asynchrone, PCA testé conditions idéales, Pas       │
│  de PCA pandémie avant COVID-19, Pas PCA filiales autonomes      │
└─────────────────────────────────────────────────────────────────┘
```

---

## B.2 — Cartographie des Scénarios de Sinistres

### Les 5 Scénarios Majeurs

| Scénario | Cause type | Impact principal | Durée typique |
|----------|-----------|-----------------|--------------|
| **S1 — Perte serveur** | Panne hardware, cyberattaque, incendie local, erreur humaine | Indisponibilité CBS, SWIFT, email | 4h-72h |
| **S2 — Coupure électricité** | Panne réseau national, incident fournisseur | Arrêt opérations agences, serveurs | 2h-48h |
| **S3 — Incendie siège** | Court-circuit, malveillance, accident | Perte totale ou partielle bâtiment | ≥ 30 jours |
| **S4 — Indisponibilité siège** | Inondation, catastrophe, confinement sanitaire | Impossibilité accès bâtiment | 1-30 jours |
| **S5 — Indisponibilité ADG** | Maladie, accident, décès, interdiction COBAC | Vacance du pouvoir, blocage décisions | 1j-3 mois |

### Matrice Scénarios × Activités Critiques

| Scénario | Agences | Crédit | Épargne | Trésorerie | Reporting COBAC | Communication |
|----------|---------|--------|---------|------------|-----------------|---------------|
| S1 — Perte serveur | BLOQUÉ | BLOQUÉ | BLOQUÉ | BLOQUÉ | BLOQUÉ | Dépend SI |
| S2 — Coupure électricité | BLOQUÉ (> autonomie) | Dégradé | Dégradé | Dégradé | Dégradé | Normal |
| S3 — Incendie siège | BLOQUÉ | BLOQUÉ | BLOQUÉ | BLOQUÉ | BLOQUÉ | Cellule crise |
| S4 — Indispo siège | Dépend agences | Dégradé | Dégradé | Dégradé | Dégradé | Cellule crise |
| S5 — Indispo ADG | Normal | Normal | Normal | Normal | Normal | Normal |

### Détail par Scénario — RTO, RPO, Impact, Bascule

#### S1 — Perte de Serveur

| Paramètre | Valeur |
|-----------|--------|
| **RTO** | 4h (activités critiques) / 24h (back-office) |
| **RPO** | 15 min (dernière sauvegarde) |
| **Impact financier** | 5-50M FCFA/jour |
| **Impact réglementaire** | Obligation information COBAC sous 48h |
| **Procédure bascule** | 1.Détection → 2.Alerte DSI → 3.Diagnostic 15 min → 4.Décision bascule (si > 2h) → 5.Activation serveurs secours → 6.Vérification intégrité → 7.Bascule réseau → 8.Test applications → 9.Information utilisateurs → 10.Reprise |
| **Test** | Bascule complet semestriel. Restauration sauvegarde mensuel. |

#### S2 — Coupure Électricité Prolongée

| Paramètre | Valeur |
|-----------|--------|
| **RTO** | < 5 minutes (bascule groupes) |
| **Impact financier** | < 5M FCFA/jour (mode manuel possible) |
| **Procédure bascule** | 1.Coupure → 2.Démarrage auto groupes → 3.Vérification charge → 4.Alerte fournisseur carburant si > 8h → 5.Mode dégradé agences si > autonomie → 6.Retour réseau |
| **Prérequis** | Groupes testés mensuellement. Contrat carburant livraison < 4h. Batteries onduleurs 30 min. |
| **Test** | Groupes à vide mensuel. En charge trimestriel. Simulation réelle semestrielle. |

#### S3 — Incendie du Siège

| Paramètre | Valeur |
|-----------|--------|
| **RTO** | 24-48h (activités critiques) / 30j+ (normal) |
| **Impact financier** | 50-200M FCFA (pertes exploitation, reconstruction) |
| **Procédure bascule** | 1.Alerte → 2.Évacuation → 3.Secours → 4.Constat dommages → 5.Activation Cellule Crise → 6.PCA intégral → 7.Site secours → 8.Relocalisation personnel → 9.Communication → 10.Gestion assurance → 11.Reconstruction |
| **Prérequis** | Site secours 30%+ effectif critique. Sauvegardes externalisées. Assurance pertes exploitation. |
| **Test** | Évacuation trimestrielle. Bascule site secours semestrielle. Simulation intégrale annuelle. |

#### S4 — Indisponibilité du Siège (Hors Incendie)

| Paramètre | Valeur |
|-----------|--------|
| **RTO** | 4-8h (télétravail urgence) / 24h (site secours) |
| **Impact financier** | 10-30M FCFA |
| **Procédure bascule** | 1.Événement → 2.Cellule Crise → 3.Évaluation durée → 4.Décision télétravail/site secours → 5.Activation VPN → 6.Communication → 7.Suivi quotidien → 8.Retour siège |
| **Prérequis** | Infrastructure VPN. Laptops. Rotation équipes A/B. |
| **Test** | Télétravail semestriel. Site secours semestriel. |

#### S5 — Indisponibilité de l'ADG

| Paramètre | Valeur |
|-----------|--------|
| **RTO** | Immédiat (délégation auto) / 7 jours (nomination CA) |
| **Impact financier** | Faible à Modéré |
| **Procédure bascule** | 1.Constat indispo → 2.Délégation auto DGA ou N°2 → 3.Information CA → 4.Réunion CA urgence (< 7j) → 5.Nomination intérimaire → 6.Information COBAC → 7.Recrutement (si permanent) |
| **Prérequis** | Procédure délégation formalisée. DGA identifié. Liste décisions urgentes avec seuils. |
| **Test** | Simulation absence ADG 48h (exercice annuel). |

---

## B.3 — Matrice BIA (Business Impact Analysis)

### Classification des Activités

| Niveau | RTO max | Exemples |
|--------|---------|----------|
| **VITALES** | < 4h | Guichet/caisse, Mobile banking, Virements interbancaires, Décaissements crédits, Collecte épargne, Déclaration soupçon LCB/FT |
| **STRATÉGIQUES** | < 24h | Octroi crédits, Trésorerie, Reporting SURFI/BAFI, Communication de crise |
| **SECONDAIRES** | < 72h | Comptabilité générale, Paie, Recouvrement, Audit interne, Formation, Marketing |

### Matrice BIA Détaillée — SFD Type

| Activité | Classification | RTO | RPO | Impact arrêt 4h | Impact arrêt 24h | Impact arrêt 72h |
|----------|---------------|-----|-----|-----------------|------------------|------------------|
| Guichet / Caisse | Vitale | 4h | 15 min | Clients refusés | Perte clients, plainte COBAC | Crise institutionnelle |
| Mobile Banking | Vitale | 2h | 5 min | Réclamations massives | Perte clients, image dégradée | Risque réputationnel grave |
| Virements interbancaires | Vitale | 4h | 15 min | Retards paiements | Pénalités correspondants | Suspension correspondance |
| Décaissements crédits | Vitale | 4h | 15 min | Clients en attente | Non-respect engagements | Risque juridique |
| Collecte épargne | Vitale | 4h | 15 min | Dépôts refusés | Perte confiance | Ruée sur dépôts |
| Octroi crédits | Stratégique | 24h | 1h | Retard traitements | Perte revenus, insatisfaction | Perte clients emprunteurs |
| Trésorerie | Stratégique | 8h | 30 min | Déséquilibre temporaire | Risque liquidité | Défaut paiement possible |
| Reporting SURFI/BAFI | Stratégique | 24h | 1h | OK si hors échéance | Pénalité COBAC si échéance | Sanction COBAC |
| Déclaration soupçon LCB/FT | Vitale | 4h | 0 | Pénalité ANIF | Risque pénal dirigeants | Poursuites |
| Paie personnel | Secondaire | 72h | 24h | OK | Inquiétude personnel | Mécontentement, grève possible |
| Comptabilité générale | Secondaire | 72h | 24h | OK | Retard saisie | Retard clôture |
| Recouvrement | Secondaire | 48h | 4h | OK | Retard relances | Dégradation PAR 30 |

---

## B.4 — Procédures de Bascule et Fiches Réflexes

### Procédure Générale de Déclenchement PCA

```
ÉTAPE 1 — DÉTECTION & ALERTE
└── Tout employé → Alerte responsable hiérarchique → Alerte Resp. PCA → Évaluation

ÉTAPE 2 — ÉVALUATION INITIALE (15 min)
├── Nature de l'incident
├── Périmètre impacté (site, systèmes, personnes)
├── Durée probable d'indisponibilité
└── Niveau de criticité : VERT / ORANGE / ROUGE

ÉTAPE 3 — DÉCISION (15 min)
├── VERT : Incident mineur. Résolution locale. Rapport incident.
├── ORANGE : Incident significatif. PCA partiel. Information DG.
└── ROUGE : Incident majeur. PCA intégral. Cellule Crise. Information CA.

ÉTAPE 4 — ACTIVATION PCA
├── Notification Cellule Crise (SMS + appel)
├── Activation site secours (si applicable)
├── Activation procédures bascule
└── Communication interne (tout le personnel)

ÉTAPE 5 — COMMUNICATION DE CRISE
├── Information COBAC (< 48h si incident majeur)
├── Information clients (agences, site web, SMS, réseaux)
├── Information banques correspondantes
└── Information médias (si applicable, via communiqué)

ÉTAPE 6 — SUIVI & PILOTAGE
├── Point de situation Cellule Crise toutes les 4h
├── Suivi RTO par activité
├── Main courante des décisions
└── Tableau de bord de crise

ÉTAPE 7 — RETOUR À LA NORMALE
├── Vérification intégrité données
├── Reprise progressive activités
├── Information fin de crise
└── Retour d'expérience (< 15 jours)
```

### Fiche Réflexe S2 — Coupure Électricité

```yaml
# FICHE RÉFLEXE PCA — S2 : COUPURE ÉLECTRICITÉ
Reference: PCA-FR-S2
Déclencheur: Coupure réseau > autonomie batteries onduleurs (30 min)
Niveau: Orange (< 4h) / Rouge (> 4h)

ACTIONS_IMMEDIATES (T0→T+15min):
  - Vérifier démarrage automatique groupes électrogènes
  - Contacter fournisseur électricité (cause + durée estimée)
  - Informer Responsable PCA
  - Vérifier niveau carburant groupes (autonomie restante)

ACTIONS_T+30min:
  - Si > 4h prévue : commander livraison carburant
  - Si > 8h prévue : activer mode dégradé agences
  - Informer DG
  - Message aux agences : mode manuel autorisé

ACTIONS_T+2h:
  - Point Cellule Crise (si niveau Rouge)
  - Bascule progressive agences en mode manuel
  - Activation procédures papier (si CBS indisponible)
  - Information clients (affichage agence)

ACTIONS_T+8h:
  - Point Cellule Crise (toutes les 4h)
  - Suivi consommation carburant
  - Réquisition groupes additionnels si nécessaire
  - Évaluation impact opérations crédit/épargne
```

### Fiche Réflexe S5 — Indisponibilité ADG

```yaml
# FICHE RÉFLEXE PCA — S5 : INDISPONIBILITÉ ADG
Reference: PCA-FR-S5
Déclencheur: Absence imprévue ADG > 24h

ACTIONS_IMMEDIATES (T0→T+24h):
  - Constater indisponibilité (certificat médical, constat, notification COBAC)
  - Activer délégation automatique : DGA (ou N°2) prend intérim
  - Informer Président du CA
  - Bloquer comptes de signature ADG (sécurité)
  - Activer délégations bancaires DGA

ACTIONS_T+48h:
  - Convocation CA en urgence (délai max 7 jours)
  - Nomination DG par intérim (si > 7 jours prévue)
  - Information COBAC (obligatoire si indisponibilité permanente)
  - Communication interne (cadres dirigeants)
  - Identification décisions urgentes en attente

ACTIONS_T+7_JOURS:
  - Tenue CA d'urgence
  - Décision : Intérim confirmé ou nomination définitive
  - Information officielle COBAC
  - Communication externe (partenaires, banques)
  - Lancement recrutement si indisponibilité permanente
```

---

*Document élaboré par KHEPRA EXPERTS — Regulatory & Financial Services BU — Partie 1/2*
*Version 1.0 — 07 Juin 2026*
*Suite : [KHEPRA_FINAM_SI_RESILIENCE_KNOWLEDGE.md](./KHEPRA_FINAM_SI_RESILIENCE_KNOWLEDGE.md) — Partie 2/2 (Schémas Directeurs SI, Gouvernance Continuité, COVID-19)*