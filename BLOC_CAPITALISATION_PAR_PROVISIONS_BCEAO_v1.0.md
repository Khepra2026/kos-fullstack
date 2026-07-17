# CAPITALISATION KHEPRA
## Réf : CAP-2026-012
## Date : 07 Juin 2026

---

### CONNAISSANCES CRÉÉES :

├── [Analyse réglementaire] Grille COBAC de classification des crédits — 5 classes de risque (Sain, Sensible PAR 1-30, Pré-douteux PAR 31-90, Douteux PAR 91-180, Compromis PAR >180) avec les taux de provisionnement associés (0%, 40%, 50%/100% selon garantie, 100%) et les références réglementaires BCEAO/COBAC applicables aux EMF/SFD en zone UEMOA.

├── [Méthodologique] Algorithme de classification automatique de portefeuille de crédits — pipeline complet : chargement/nettoyage (détection auto des colonnes avec variantes françaises), classification par jours de retard, application différentiée des taux de provisionnement selon nature de garantie (réelle vs autre/sans), calcul des provisions ligne à ligne, consolidation matricielle.

├── [Méthodologique] Scoring KHEPRA de Qualité du Portefeuille /100 — indicateur composite à 5 dimensions pondérées : PAR 30 (30%), PAR 90 (25%), Taux de Couverture des Provisions (25%), Concentration Top 10 (10%), PAR 1 (10%). Chaque dimension a des seuils d'alerte et de criticité calibrés sur les normes BCEAO. 5 niveaux d'appréciation (EXCELLENCE → CRITIQUE).

├── [Sectorielle] Grille de détection des garanties réelles au sens COBAC — 11 mots-clés couvrant les variantes françaises (reelle, réelle, hypothèque, hypotheque, nantissement, hypothecaire, hypothécaire, garantie_reelle, garantie réelle, immobiliere, immobilière). Différentiation critique car le taux de provisionnement des crédits douteux (91-180j) passe de 100% à 50% en présence de garantie réelle.

├── [Opérationnelle] Modèle de données standardisé pour le portefeuille de crédits EMF — 4 colonnes obligatoires (id_credit, capital_restant_du, jours_retard, nature_garantie) avec 20+ variantes de noms de colonnes détectées automatiquement pour maximiser la compatibilité avec les exports de SIG/Core Banking.

├── [Sectorielle] Indicateurs PAR 1 / PAR 30 / PAR 90 — triple analyse de la dégradation du portefeuille : PAR 1 (alerte précoce, tous les crédits avec ≥1 jour de retard), PAR 30 (crédits >30 jours, seuil réglementaire standard BCEAO), PAR 90 (crédits >90 jours, seuil de provisionnement obligatoire).

├── [Stratégique] Analyse de concentration du portefeuille — identification du Top 10 crédits par encours, calcul du ratio de concentration, recommandations de diversification automatiques. Complémentaire au Ratio R4 de Division des Risques de l'audit balance.

---

### CONNAISSANCES MISES À JOUR :

├── [KHEPRA_KNOWLEDGE_OPERATING_SYSTEM.md] Ajout référence à l'Analyse PAR & Provisions BCEAO dans l'en-tête documentaire, la table d'intégration documentaire (§10.1) et l'historique des versions. Nouvelle entrée détaillée dans la table d'intégration documentaire.

├── [KHEPRA_KNOWLEDGE_OPERATING_SYSTEM.md] Version 1.15 → 1.16 — Mise à jour de l'en-tête et de l'historique des versions.

---

### ÉLÉMENTS À INTÉGRER AU RAG :

├── [02_BCEAO_REGLEMENTATION] Grille COBAC de classification et provisionnement des crédits — 5 classes avec taux et règles de garantie. Référence : Règlement EMF-2010/02 et grille COBAC Classes 0-6.

├── [07_KHEPRA_TOOLS] Script Python khepra_calcul_par_provisions.py — pipeline complet d'analyse PAR avec CLI, mode démo, export JSON.

├── [07_KHEPRA_TOOLS] Module TypeScript khepraCalculParProvisions.ts — version navigateur avec toutes les fonctions exportées individuellement (classerPortefeuille, calculerIndicateursPar, construireMatrice, calculerScoreQualite, genererRecommandationsPar, analyserParEtProvisions, genererPortefeuilleDemo).

├── [15_KHEPRA_METHODOLOGIES] Méthodologie de scoring de qualité du portefeuille de crédits — algorithme à 5 dimensions pondérées avec seuils calibrés sur les normes BCEAO.

---

### NOUVEAUX MODÈLES À CRÉER :

├── [Template d'analyse PAR] Dashboard PAR & Provisions pour intégration dans l'interface KHEPRA — visualisation de la matrice de classification, jauges PAR 30/90, jauge de couverture, top 10 crédits.

├── [Rapport type Mission COBAC] Template de rapport d'analyse de portefeuille pour mission d'audit/inspection — incluant la matrice COBAC, les indicateurs PAR, le scoring KHEPRA, et les recommandations.

├── [Tableau de bord recouvrement] Template de suivi hebdomadaire du PAR — évolution PAR 1/30/90 sur 12 semaines glissantes, top 10 impayés, actions de recouvrement.

---

### MÉTHODOLOGIES À METTRE À JOUR :

├── [Audit de Portefeuille Crédit COBAC] Intégrer le pipeline d'analyse PAR & Provisions comme module standard de toute mission d'audit crédit. Ajouter la grille de scoring qualité portefeuille /100 comme indicateur de pilotage.

├── [Diagnostic Pré-Inspection COBAC] Intégrer l'analyse PAR & Provisions comme composante obligatoire du diagnostic pré-inspection — le régulateur examinera systématiquement la qualité du portefeuille, le PAR 30/90 et le taux de couverture des provisions.

---

### SCORE KOS DU LIVRABLE : 92/100

└── Exactitude: 24/25 | Conformité: 24/25 | Valeur Client: 18/20 | Réutilisabilité: 14/15 | Innovation: 12/15

**Analyse détaillée :**
- Exactitude (24/25) : Grille COBAC rigoureusement appliquée, taux de provisionnement vérifiés, règles de garantie réelle correctement implémentées. Seule réserve : l'estimation du taux de couverture dépend de la fiabilité des données de jours de retard fournies par le SIG.
- Conformité (24/25) : Alignement total sur la réglementation BCEAO/COBAC. Classification et provisionnement conformes aux textes en vigueur.
- Valeur Client (18/20) : Outil immédiatement actionnable par un DAF/responsable crédit d'EMF. Le scoring /100 permet un suivi dans le temps de la qualité du portefeuille. Les recommandations sont contextualisées et priorisées.
- Réutilisabilité (14/15) : Double implémentation Python/TypeScript garantit l'utilisabilité en contexte batch (traitement de fichiers Excel volumineux) et en contexte interactif (dashboard navigateur). Le modèle de données standardisé avec 20+ variantes de colonnes maximise la compatibilité.
- Innovation (12/15) : Le scoring composite à 5 dimensions avec pondérations calibrées est une innovation méthodologique KHEPRA, mais s'appuie sur des concepts standards (PAR, taux de couverture). La détection automatique des garanties réelles par mots-clés est un apport pratique significatif.

---

### COMPLÉMENTARITÉ AVEC LES OUTILS EXISTANTS

```
┌─────────────────────────────────────────────────────────────────┐
│               TRIPTYQUE D'AUDIT PRUDENTIEL KHEPRA                 │
│                                                                   │
│  ┌─────────────────────┐  ┌─────────────────────┐               │
│  │   AUDIT BALANCE      │  │  ANALYSE PAR &       │               │
│  │   BCEAO              │  │  PROVISIONS          │               │
│  │                      │  │                      │               │
│  │  • 5 ratios          │  │  • 5 classes COBAC   │               │
│  │  • 9 agrégats        │  │  • PAR 1/30/90       │               │
│  │  • Score santé       │  │  • Score qualité     │               │
│  │    prudentielle /100 │  │    portefeuille /100 │               │
│  └─────────┬───────────┘  └─────────┬───────────┘               │
│            │                        │                             │
│            └──────────┬─────────────┘                             │
│                       │                                           │
│                       ▼                                           │
│  ┌─────────────────────────────────────────────┐                │
│  │           BUSINESS PLAN MFI UEMOA            │                │
│  │  • Projections 5 ans (Base/Optimiste/Stress) │                │
│  │  • TEG 24%, Convention Collective SFD        │                │
│  │  • Impact digitalisation sur CAC             │                │
│  └─────────────────────────────────────────────┘                │
│                                                                   │
│  Le triptyque complet couvre l'intégralité du cycle :            │
│  Photographie → Diagnostic → Projection                           │
└─────────────────────────────────────────────────────────────────┘
```

L'audit balance donne la photographie comptable et prudentielle. L'analyse PAR donne le diagnostic de la qualité du portefeuille crédit — le cœur du métier. Le Business Plan MFI UEMOA donne la projection et la stratégie.

Ensemble, ces trois outils forment le **triptyque d'audit prudentiel KHEPRA**, couvrant l'intégralité du spectre d'analyse d'une IMF : de la conformité statutaire à la qualité du portefeuille, jusqu'à la stratégie prospective.

---

### PROCHAINE REVUE

07 Septembre 2026 — Évaluation de l'utilisation opérationnelle de l'outil sur des missions réelles. Calibration éventuelle des pondérations du scoring qualité portefeuille.

---

*« Le PAR est le pouls d'une IMF. Le KOS sait désormais le prendre. »*

— KHEPRA Knowledge Operating System, Bloc Capitalisation CAP-2026-012