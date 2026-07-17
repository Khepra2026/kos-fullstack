# CAPITALISATION KHEPRA
## Réf : CAP-2026-013
## Date : 07 Juin 2026

---

### CONNAISSANCES CRÉÉES :

├── [Méthodologique] Moteur de stress test portefeuille de crédits pour EMF/SFD — pipeline complet : chargement portefeuille, classification COBAC, application de scénarios de choc (migration probabiliste des crédits entre classes de risque + crise sectorielle + hausse taux), recalcul des provisions post-stress, mesure d'impact (provisions, fonds propres, ratio capitalisation, marge nette, résultat net), détection de seuil de rupture (FP négatifs), scoring de résilience, recommandations PPR.

├── [Analyse réglementaire] 7 scénarios de stress calibrés COBAC/BCEAO — PAR léger (intensité 1 : 5% migration sain→sensible), PAR modéré (intensité 2 : 10%→5%→15%), PAR sévère (intensité 3 : 20%→10%→25%), Taux modéré (intensité 2 : +200bps sur emprunts), Taux sévère (intensité 3 : +500bps), Crise sectorielle (intensité 3 : défaillance 15% d'un secteur), Combiné worst case (intensité 4 : PAR+taux+sectoriel simultanés). Chaque scénario est paramétré avec 7 variables (migration sain→sensible, sensible→pré-douteux, pré-douteux→douteux, hausse taux refinancement, défaillance sectorielle %, impact garanties).

├── [Méthodologique] Scoring KHEPRA de Résilience /100 — système à pénalités documentées par scénario. Pondération par intensité du scénario (1→4 normalisé en /4). Pénalités progressives : rupture FP (30 pts × poids), érosion FP >50% (25 pts), >30% (15 pts), >15% (8 pts), PAR 90 post-stress >15% (15 pts), >10% (10 pts), >5% (5 pts), ratio capitalisation <5% (15 pts), <10% (8 pts). 5 niveaux d'appréciation (EXCELLENTE → CRITIQUE).

├── [Sectorielle] Modèle de crise sectorielle — identification automatique du secteur le plus concentré du portefeuille, application d'une fraction de défaillance proportionnelle à l'encours, répartition 60% douteux / 40% compromis des crédits impactés. Calibré pour les secteurs typiques des IMF africaines (Commerce, Agriculture, Services, Transport, Artisanat).

├── [Opérationnelle] Mécanisme de double choc taux + crédit — le stress test capture l'effet combiné de la hausse du coût de refinancement (impact direct sur la marge nette) et de la dégradation du portefeuille (impact sur les provisions). C'est ce double effet qui est le plus dangereux pour une IMF : les marges se compriment pendant que les provisions explosent.

├── [Stratégique] Complétion du Triptyque d'Audit Prudentiel KHEPRA — Audit Balance (photographie comptable, 5 ratios BCEAO) → Analyse PAR & Provisions (diagnostic qualité du portefeuille, 5 classes COBAC) → Stress Test Portefeuille (projection de crise, 7 scénarios, scoring résilience). Les trois outils couvrent l'intégralité du spectre d'analyse prudentielle : conformité → diagnostic → résilience.

├── [Méthodologique] Détection de seuil de rupture — calcul automatique du point où les fonds propres deviennent négatifs après stress (hausse provisions + surcoût refinancement > fonds propres initiaux). Indicateur binaire critiques pour les PPR COBAC.

---

### CONNAISSANCES MISES À JOUR :

├── [KHEPRA_KNOWLEDGE_OPERATING_SYSTEM.md] Ajout référence au Stress Test Portefeuille BCEAO dans l'en-tête documentaire, la table d'intégration documentaire (§10.1) et l'historique des versions. Version 1.16 → 1.17.

├── [KHEPRA_KNOWLEDGE_OPERATING_SYSTEM.md] Diagramme du Triptyque d'Audit Prudentiel KHEPRA complété dans le Bloc Capitalisation précédent (CAP-2026-012) — le Stress Test en est le troisième pilier.

---

### ÉLÉMENTS À INTÉGRER AU RAG :

├── [02_BCEAO_REGLEMENTATION] Calibration des scénarios de stress pour EMF/SFD UEMOA — 7 scénarios avec paramètres documentés. Référence : Circulaire COBAC N° 001-2020/CB/C (PPR) et bonnes pratiques BCEAO.

├── [07_KHEPRA_TOOLS] Script Python khepra_stress_test_portefeuille.py — pipeline complet avec CLI, 7 scénarios, mode démo, export JSON.

├── [07_KHEPRA_TOOLS] Module TypeScript khepraStressTestPortefeuille.ts — version navigateur avec toutes les fonctions exportées (classifierPortefeuille, appliquerScenarioStress, calculerScoreResilience, executerStressTest, genererPortefeuilleStressDemo).

├── [15_KHEPRA_METHODOLOGIES] Méthodologie de scoring de résilience du portefeuille — algorithme à pénalités documentées avec pondération par intensité de scénario.

---

### NOUVEAUX MODÈLES À CRÉER :

├── [Template PPR — Volet Stress Test] Section standardisée du Plan Préventif de Redressement dédiée aux stress tests — incluant la présentation des 7 scénarios, la matrice d'impact, le scoring de résilience, et le plan d'actions correctrices.

├── [Dashboard Risque & Résilience] Interface de pilotage intégrant les trois outils du Triptyque — jauges ratios prudentiels (Audit Balance), heatmap PAR (Analyse PAR), radar résilience multi-scénarios (Stress Test).

---

### MÉTHODOLOGIES À METTRE À JOUR :

├── [PPR — Plan Préventif de Redressement (Governance §4.5)] Intégrer le module de stress test comme composante obligatoire du PPR. La Circulaire COBAC N° 001-2020/CB/C exige des projections de résilience — les 7 scénarios calibrés fournissent la base quantitative.

├── [Diagnostic Pré-Inspection COBAC] Ajouter le stress test au diagnostic pré-inspection — le régulateur examinera si l'IMF a réalisé des stress tests crédibles et documentés.

---

### SCORE KOS DU LIVRABLE : 93/100

└── Exactitude: 24/25 | Conformité: 25/25 | Valeur Client: 19/20 | Réutilisabilité: 14/15 | Innovation: 11/15

**Analyse détaillée :**
- Exactitude (24/25) : Mécanisme de migration probabiliste correct, calculs d'impact vérifiés. Seule réserve : la migration est aléatoire uniforme, elle ne tient pas compte des corrélations entre crédits d'un même secteur (modélisable en V2).
- Conformité (25/25) : Scénarios calibrés sur les exigences COBAC pour les PPR. Les 7 scénarios couvrent les risques crédit, taux, concentration et combiné exigés par la Circulaire N° 001-2020/CB/C.
- Valeur Client (19/20) : Outil directement utilisable pour produire le volet stress test d'un PPR. Le scoring de résilience /100 donne une métrique simple et communicable au Conseil d'Administration.
- Réutilisabilité (14/15) : Double implémentation Python/TypeScript, scénarios paramétrables, architecture modulaire. Le module est conçu pour être appelé depuis l'Analyse PAR (enchaînement naturel du Triptyque).
- Innovation (11/15) : Le système de pénalités documentées par scénario avec pondération par intensité est une innovation méthodologique. Le mécanisme de crise sectorielle avec détection automatique du secteur concentré est pragmatique.

---

### LE TRIPTYQUE D'AUDIT PRUDENTIEL KHEPRA — COMPLET

```
┌──────────────────────────────────────────────────────────────────────────┐
│                   TRIPTYQUE D'AUDIT PRUDENTIEL KHEPRA                      │
│                                                                            │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │ ① AUDIT BALANCE   │  │ ② ANALYSE PAR &   │  │ ③ STRESS TEST            │ │
│  │    BCEAO          │  │    PROVISIONS     │  │    PORTEFEUILLE          │ │
│  │                   │  │                   │  │                          │ │
│  │ 5 ratios          │  │ 5 classes COBAC   │  │ 7 scénarios calibrés     │ │
│  │ 9 agrégats PCEMF  │  │ PAR 1/30/90       │  │ Migration probabiliste   │ │
│  │ Score santé       │  │ Provisions        │  │ Impact FP/capitalisation │ │
│  │ prudentielle /100 │  │ différenciées      │  │ Détection seuil rupture  │ │
│  │                   │  │ Score qualité      │  │ Score résilience /100    │ │
│  │                   │  │ portefeuille /100  │  │                          │ │
│  └────────┬─────────┘  └────────┬─────────┘  └────────────┬─────────────┘ │
│           │                     │                          │               │
│           └─────────────────────┼──────────────────────────┘               │
│                                 │                                          │
│                                 ▼                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │                     PPR — PLAN PRÉVENTIF DE REDRESSEMENT              │ │
│  │  Les trois outils alimentent le PPR COBAC (Circulaire 001-2020/CB/C) │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│  Photographie  →  Diagnostic  →  Résilience                                │
│  (Constat)         (Analyse)      (Projection de crise)                    │
└──────────────────────────────────────────────────────────────────────────┘
```

Le Triptyque est désormais complet. Une IMF peut :
1. Photographier sa situation prudentielle (Audit Balance — 5 ratios BCEAO)
2. Diagnostiquer la qualité de son portefeuille crédit (Analyse PAR — 5 classes COBAC)
3. Tester sa résilience face aux chocs (Stress Test — 7 scénarios)

Les trois outils se parlent : le R5 de l'audit balance (taux de couverture provisions) est alimenté par l'analyse PAR, le stress test utilise la classification COBAC de l'analyse PAR pour simuler les migrations, et les trois convergent vers le PPR exigé par la COBAC.

---

### PROCHAINE REVUE

07 Septembre 2026 — Évaluation opérationnelle sur des missions réelles. Calibration éventuelle des intensités de scénarios et des pondérations du scoring résilience.

---

*« Une IMF qui ne stresse pas son portefeuille est une IMF qui dort sur un volcan. »*

— KHEPRA Knowledge Operating System, Bloc Capitalisation CAP-2026-013