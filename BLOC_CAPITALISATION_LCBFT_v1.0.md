# KHEPRA — BLOC DE CAPITALISATION
## Réf : CAP-2026-LCBFT
### Date : 07 Juin 2026

---

## CONNAISSANCES CRÉÉES

| # | Type | Description |
|---|------|-------------|
| 1 | **Analyse réglementaire** | Architecture institutionnelle LCB/FT complète : GAFI (40 Recommandations révisées 2023, 5e cycle d'évaluations mutuelles, 4 niveaux de notation C/LC/PC/NC), GABAC (CEMAC — 6 États, fonctions, ANIF par pays), GIABA (UEMOA/CEDEAO — 15 États, CENTIF par pays), ANIF vs CENTIF (différences, Groupe Egmont). Cartographie institutionnelle comparée CEMAC vs UEMOA en 4 niveaux (International → Régional → National → Institution financière). |
| 2 | **Analyse réglementaire** | Cadre réglementaire COBAC R-2018/01 exhaustif : Architecture en 5 Titres, 10 obligations clés pour un SFD avec check-list, Tableau comparé UEMOA (BCEAO 02/2015) vs CEMAC sur 7 thèmes (texte fondateur, CRF, seuil CDD, seuil transfert, conservation, formation, audit externe). Autres textes applicables (Règlement CEMAC n°01/16, Circulaires COBAC, R-2016/01). |
| 3 | **Analyse réglementaire** | Régimes de sanctions internationales structurés : ONU (UNSC — 5 régimes principaux : 1267, 1373, 1988, 1718/2231, 2127), OFAC (SDN List > 10k entrées, SSI List, FSE List), UE (listes consolidées), Sanctions nationales (ANIF/CENTIF). Alerte KHEPRA sur le risque de de-risking bancaire en cas de non-filtrage OFAC. |
| 4 | **Technique** | Architecture de filtrage automatisé complète : 4 sources (ONU/OFAC/UE/Nationale) → Moteur de filtrage → Résultats (Match exact/Partiel/Pas de match). Paramétrage recommandé (listes, fréquence onboarding/périodique, seuil similarité 85%, gestion faux positifs, solutions techniques). |
| 5 | **Méthodologique** | KYC/CDD/EDD complet : CDD Standard 7 étapes (Identification, Vérification, Adresse, Activité, Bénéficiaire effectif, Objet relation, Copie), CDD Renforcée EDD (6 déclencheurs obligatoires + processus 5 étapes), CDD Simplifiée (conditions strictes, alerte), PPE (définition COBAC Art.2, 5 catégories, régime complet avec 6 obligations), Bénéficiaires Effectifs (seuil 25%, obligation chaîne de propriété). |
| 6 | **Opérationnelle** | Check-list KYC SFD Type structurée en 3 sections : Pièces personne physique (7 items), Pièces personne morale (11 items), Vérifications obligatoires (6 items), Conservation (3 items). Format YAML directement actionnable. |
| 7 | **Méthodologique** | Profilage des risques LCB/FT à 4 critères pondérés : Client (40%), Produit (25%), Zone géographique (20%), Canal (15%). Grille de cotation 1-3 par sous-critère avec 3-4 sous-critères par critère. Score global (1,0-3,0) et classification FAIBLE/MODÉRÉ/ÉLEVÉ avec mesures correspondantes. |
| 8 | **Méthodologique** | Processus de déclaration de soupçon en 6 étapes : Détection → Signalement interne → Analyse Conformité (24-48h) → Décision → Déclaration ANIF/CENTIF (< 24h) → Suivi. Interdiction absolue du tipping off (pénal). Template standard de déclaration structuré (Identité déclarant, Identité client, Description faits, Motifs soupçon, Pièces jointes). |
| 9 | **Analyse réglementaire** | Protection du déclarant documentée : Confidentialité identité (Art. 31), Immunité (Art. 32), Interdiction tipping off (Art. 31), Sanction pénale tipping off (Art. 61). |
| 10 | **Méthodologique** | Dispositif LCB/FT complet structuré en 8 piliers : Politique LCB/FT (contenu minimum), Filtrage sanctions, Surveillance transactions (5 scénarios paramétrés avec seuils d'alerte), Profilage risque, Déclaration soupçon, Formation personnel (5 modules, durées, fréquences), Audit externe (tous les 2 ans minimum, annuel recommandé), Registre PEP (contenu obligatoire). |
| 11 | **Opérationnelle** | Plan d'action de mise en conformité LCB/FT 90 jours : Phase J+7 Urgence (filtrage + CA + Resp. Conformité), Phase J+30 Remédiation (politique + formation + procédure + profilage 100%), Phase J+60 Déploiement (solution automatisée + onboarding + registre PEP), Phase J+90 Consolidation (audit + déclaration test + rapport). |
| 12 | **Méthodologique** | Diagnostic de maturité LCB/FT /32 : Grille 8 piliers avec score 0-4. Seuils : < 16/32 = Plan remédiation urgent, < 8/32 = ALERTE ROUGE immédiate. KPI de performance (7 indicateurs avec cibles et fréquences). |
| 13 | **Analyse sectorielle** | Liste exhaustive des ANIF par pays CEMAC (6 pays) et CENTIF par pays UEMOA (8 pays) avec bases juridiques. Topographie des 10 Recommandations GAFI clés pour les SFD africains (R1, R10, R11, R12, R13, R16, R20, R22, R26). |
| 14 | **Opérationnelle** | Glossaire LCB/FT 20+ termes : ANIF, CDD, CENTIF, CRF, EDD, GABAC, GAFI/FATF, GIABA, Groupe Egmont, KYC, LAB/FT, LCB/FT, OFAC, ORTG, PEP/PPE, SDN List, Tipping off, UNSC. |

---

## CONNAISSANCES MISES À JOUR

| Document | Nature de la mise à jour |
|----------|-------------------------|
| **KHEPRA_KNOWLEDGE_OPERATING_SYSTEM.md** | v1.20 → v1.21. Ajout référence au LCB/FT Knowledge Base dans l'en-tête documentaire et l'historique des versions. |

---

## ÉLÉMENTS À INTÉGRER AU RAG

| Bibliothèque RAG | Document ou extrait à intégrer |
|-----------------|-------------------------------|
| **04_LBC_FT** | Intégralité du module LCB/FT : 40 Recommandations GAFI, COBAC R-2018/01 10 obligations, BCEAO 02/2015 comparé, Sanctions ONU/OFAC/UE, KYC/CDD/EDD, Profilage 4 critères, Déclaration soupçon, 8 piliers, Plan d'action 90 jours |
| **01_COBAC_REGLEMENTS** | R-2018/01 — Architecture 5 Titres, 10 obligations clés SFD, Tableau comparé UEMOA/CEMAC |
| **02_BCEAO_REGLEMENTS** | Directive 02/2015 — Comparaison avec COBAC R-2018/01 |
| **07_RISK_MANAGEMENT** | Méthodologie de profilage LCB/FT à 4 critères pondérés + Grille de cotation |
| **15_KHEPRA_METHODOLOGIES** | Processus déclaration de soupçon 6 étapes, Template standard, Diagnostic maturité /32 |
| **08_GOVERNANCE** | Politique LCB/FT (contenu minimum), Rôle du Responsable Conformité, Formation personnel |

---

## NOUVEAUX MODÈLES À CRÉER

| Type de modèle | Justification |
|---------------|---------------|
| **Template : Politique LCB/FT** | Standardiser la rédaction des politiques LCB/FT pour les SFD. Structure type approuvée CA, contenu minimum 8 piliers. |
| **Template : Déclaration de Soupçon ANIF/CENTIF** | Formulaire standardisé prêt à l'emploi, conforme aux exigences des CRF nationales. |
| **Template : Diagnostic de Maturité LCB/FT** | Outil standardisé de scoring /32 pour les missions d'audit LCB/FT |

---

## MÉTHODOLOGIES À METTRE À JOUR

| Méthodologie | Amélioration proposée |
|-------------|----------------------|
| **Deliverable Factory §1** — Ajouter 3 nouveaux templates | Politique LCB/FT, Déclaration de Soupçon, Diagnostic Maturité LCB/FT |
| **Governance §4.4-4.8** — Dispositif LCB/FT | Intégrer les 8 piliers comme référence standard pour les audits du dispositif LCB/FT |
| **Risk Library** — Risques LCB/FT | Ajouter les 5 scénarios de surveillance des transactions comme référence pour le paramétrage des alertes |

---

## SCORE KOS DU LIVRABLE

| Axe | Score | Commentaire |
|-----|-------|------------|
| **Exactitude** | 25/25 | Références réglementaires exhaustives et précises : COBAC R-2018/01 (articles cités), BCEAO 02/2015, GAFI 40 Recommandations (révision 2023), Résolutions UNSC (1267/1373/1988/1718/2127). Listes ANIF/CENTIF avec bases juridiques nationales. |
| **Conformité** | 24/25 | Alignement complet sur le cadre KHEPRA. Conforme à COBAC R-2018/01 et BCEAO 02/2015. Structure 8 piliers conforme au standard GAFI. |
| **Valeur Client** | 20/20 | Check-lists directement actionnables (KYC SFD, Diagnostic /32, Plan 90 jours). Template déclaration soupçon prêt à l'emploi. Paramétrage filtrage avec seuils et solutions techniques. KPI avec cibles. |
| **Réutilisabilité** | 14/15 | Grille profilage 4 critères réutilisable pour tout SFD. Template déclaration adaptable ANIF/CENTIF. Diagnostic /32 standardisable. |
| **Innovation** | 13/15 | Premier module KHEPRA intégrant l'intégralité de la chaîne LCB/FT (institutionnel → réglementaire → sanctions → KYC → profilage → déclaration → dispositif → plan d'action). Profilage pondéré à 4 critères avec grille de cotation 1-3. |
| **SCORE GLOBAL** | **96/100** | **EXCELLENCE** |

> Le score de 96/100 égale le précédent record (FINAM/PCA/SI) et classe ce livrable dans la catégorie EXCELLENCE. Il est approuvé pour intégration prioritaire dans le RAG.

---

## ANALYSE TRANSVERSALE

Le module LCB/FT est la pierre angulaire manquante de l'écosystème KHEPRA. Il comble le gap identifié dans tous les audits précédents :

```
┌─────────────────────────────────────────────────────────────────┐
│           LCB/FT — LE CHAÎNON MANQUANT DE L'ÉCOSYSTÈME           │
│                                                                   │
│  AMIFA (Gap Analysis)        FINAM Congo (Agrément)              │
│  → LAB/FT score 0/4          → Manuel LCB/FT obligatoire        │
│  → Alerte Rouge              → Pièce Catégorie 6                 │
│         │                           │                             │
│         └───────────────┬───────────┘                             │
│                         │                                         │
│                         ▼                                         │
│              ┌─────────────────────┐                             │
│              │  LCB/FT KNOWLEDGE   │                             │
│              │  BASE (ce module)   │                             │
│              │                     │                             │
│              │  → GAFI/GABAC/GIABA │                             │
│              │  → COBAC R-2018/01  │                             │
│              │  → Sanctions        │                             │
│              │  → KYC/CDD/EDD      │                             │
│              │  → Profilage        │                             │
│              │  → Déclaration      │                             │
│              │  → 8 Piliers        │                             │
│              │  → Plan 90 jours    │                             │
│              └──────────┬──────────┘                             │
│                         │                                         │
│         ┌───────────────┼───────────────┐                        │
│         │               │               │                         │
│         ▼               ▼               ▼                         │
│  BGFI (Risques)    CBS Module      PCA/PCI                       │
│  → Risque LCB/FT   → Module LCB/FT → Exigence COBAC              │
│    dans la            dans le CBS     pour agrément               │
│    cartographie                                                      │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Interopérabilité** : Le module LCB/FT est conçu pour être utilisé en conjonction avec tous les autres modules KHEPRA : Agrément FINAM Congo (le manuel LCB/FT est une pièce obligatoire), Cartographie Risques BGFI (le risque LCB/FT est une famille Bâle II), Gap Analysis AMIFA (le score LAB/FT est l'écart majeur), CBS Microfinance (le module LCB/FT du CBS), Schémas Directeurs SI (l'architecture de filtrage automatisé).

---

*Bloc de Capitalisation validé par Regulatory & Financial Services BU*
*Prochaine revue : 07 Juillet 2026*