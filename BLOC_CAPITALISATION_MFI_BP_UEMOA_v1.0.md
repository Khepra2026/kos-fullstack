# BLOC DE CAPITALISATION KHEPRA
## Réf : CAP-2026-MFI-BP-UEMOA
## Date : 07 Juin 2026

---

### CONNAISSANCES CRÉÉES :

- **Analyse réglementaire** — Contrainte TEG 24% en zone UEMOA : mécanisme de calcul (TEG = taux nominal + frais dossier annualisés + assurance), décomposition par produit de crédit, marge de sécurité de 1 point sur le produit le plus exposé (Crédit Urgence à 23%), stratégie de pricing automatique ajustant les frais de dossier si TEG > 23,5%.
- **Analyse réglementaire** — Convention Collective des SFD : grille salariale complète (10 catégories, du DG au personnel de service), décomposition des charges patronales (CNPS 16% + FDFP 1,2% + AM 2,8% + RC 5%), primes obligatoires (transport 30k, panier 25k, logement cadres 15%), et obligations de formation (2% de la masse salariale).
- **Méthodologique** — Framework de modélisation tri-scénarios pour IMF UEMOA : 3 scénarios (Base, Optimiste, Stress) avec 8 variables différenciées (croissance encours, NPL, digitalisation, CAC, taux crédit, inflation, taux BCEAO, TEG max).
- **Méthodologique** — Modèle d'impact de la digitalisation sur le CAC : CAC pondéré = [CAC_physique × (1 − tx_digitalisation)] + [CAC_digital × tx_digitalisation], avec trajectoire de digitalisation 15%→45% sur 5 ans, économie cumulée 485 M FCFA, ROI positif à partir de l'Année 4.
- **Sectorielle** — Cartographie concurrentielle des IMF en Côte d'Ivoire : 6 concurrents benchmarkés (ADVANS CI, COFINA, MICROCRED CI, UNACOOPEC CI, FIN'Elle, Orange Money/Wave) avec positionnement TEG, encours, nombre de clients, forces/faiblesses.
- **Sectorielle** — Structure de financement hybride IMF : Fonds propres (37%), Dette senior concessionnelle BIDC/BAD (49%), Subvention AT (14%) — DSCR > 1,15x dès Année 2, désendettement rapide.
- **Opérationnelle** — Plan de déploiement 12 agences en 5 villes ivoiriennes sur 5 ans (3 phases : Pilote 3 agences, Expansion 6 agences, Consolidation 3 agences) avec CAC optimisé par digitalisation progressive.

---

### CONNAISSANCES MISES À JOUR :

- **KHEPRA_KNOWLEDGE_OPERATING_SYSTEM.md** — Ajout référence au MFI Business Plan Framework UEMOA dans l'en-tête du document et dans la section écosystème documentaire (§10.1). Mise à jour de l'historique des versions (v1.13).
- **KHEPRA_CFO_FP_PARTNER_CHARTER.md** — Le présent framework est conforme aux 12 onglets standard (README → SETTINGS → INPUTS → REVENUE → COST → CAPEX → FINANCIAL → P&L → CASH FLOW → BALANCE SHEET → RATIOS KPI → SCENARIOS STRESS) et au code couleur CFO Engine V2.

---

### ÉLÉMENTS À INTÉGRER AU RAG :

- **01_RÉGULATION_FINANCIÈRE** — Contrainte TEG 24% UEMOA (loi sur l'usure), Instruction BCEAO n°008-05-2015 (SFD), Décision BCEAO n°432-12-2016 (dispositif prudentiel SFD), Convention Collective SFD, PCEMF (Règlement COBAC R-2018/06).
- **02_AML_CFT** — Module LBC/FT intégré au CBS (filtrage sanctions, KYC digital, déclarations de soupçon ANIF).
- **15_STRATÉGIE** — Section complète Business Plan IMF (14 chapitres), Modèle économique IMF (revenus crédit/épargne/digitaux, coûts personnel/refinancement/provisions/NPL), Grille COBAC de provisionnement (Classes 0-6), Ratios prudentiels BCEAO (solvabilité ≥ 15%, liquidité ≥ 100%, division des risques ≤ 25%, NPL ≤ 5%, couverture ≥ 70%, transformation ≤ 200%).

---

### NOUVEAUX MODÈLES À CRÉER :

- **Template Business Plan IMF UEMOA** — Basé sur la structure 14 chapitres du présent framework. À intégrer dans la Deliverable Factory.
- **Modèle Excel 05_Finance_MFI_V1.0.xlsx** — 12 onglets conformes CFO Charter v2.0 avec formules de calcul TEG, provisionnement COBAC, CAC digitalisé, et tri-scénarios.
- **Checklist Due Diligence IMF** — Grille d'évaluation des IMF en zone UEMOA intégrant les ratios prudentiels, la conformité convention collective, le TEG, le NPL ratio, et le coefficient d'exploitation.

---

### MÉTHODOLOGIES À METTRE À JOUR :

- **KHEPRA_DELIVERABLE_FACTORY.md** — Ajout du type de livrable « Business Plan IMF — Zone UEMOA » avec template 14 chapitres, checklists, référentiels (BCEAO, COBAC, PCEMF), et exemples (MICROFINANCE PLUS CI S.A.).
- **KHEPRA_RISK_LIBRARY.md** — Ajout des 10 risques spécifiques IMF (crédit, liquidité, TEG, SI, non-conformité, fraude, cyber, politique, réglementaire, concurrence fintech) avec matrice probabilité × impact.

---

### SCORE KOS DU LIVRABLE : 92/100

- Exactitude : 23/25
- Conformité : 24/25
- Valeur Client : 18/20
- Réutilisabilité : 14/15
- Innovation : 13/15

---

Validé par : CFO & FP&A AI Partner + Microfinance Practice Lead
Prochaine revue : 07 Septembre 2026