# KHEPRA — BLOC DE CAPITALISATION
## Réf : CAP-2026-ProBoutik-BGFI-AMIFA
### Date : 07 Juin 2026

---

## CONNAISSANCES CRÉÉES

| # | Type | Description |
|---|------|-------------|
| 1 | **Analyse sectorielle** | État des lieux du microbusiness africain : 65M microbusiness, $421B finance gap, 90% transactions cash, 85% sans accès au crédit formel. Cercle vicieux de l'informel documenté. Finance gap par région (UEMOA $85Md, CEMAC $42Md, etc.). |
| 2 | **Méthodologique** | Scoring alternatif ProBoutik : 7 critères pondérés (Clients 15%, Fournisseurs 10%, Supply Chain 10%, Cashflow 20%, Psychométrie 15%, Telco 15%, Défauts 15%). Grille de scoring /100 avec 6 niveaux de classification (AAA → B). Seuils de décision crédit (montant max, TEG indicatif). |
| 3 | **Technique** | Architecture d'intégration API FI ↔ ProBoutik : 6 étapes (Initiation → Scoring → Transmission → Décision → Notification → Décaissement). 5 endpoints REST avec spécifications OAuth2/rate limiting/timeout. Schéma de données standardisé. 5 contrôles qualité automatiques. |
| 4 | **Stratégique** | Business Model ProBoutik : 3 sources de revenus (Subscription 5k FCFA/mois, Commission 1-3% crédit, Lending optionnel Phase 2). Projections financières A1→A5 (150M → 3,5Md FCFA CA). Impact inclusion financière : 50k microbusiness à 24 mois, 7,5Md FCFA décaissés. |
| 5 | **Analyse sectorielle** | Cartographie des risques BGFI : 12 risques identifiés avec impact brut, probabilité, gravité. Analyse DMR (efficacité 0% à 80%). Carte de chaleur (3 zones critiques : R02/R05/R06, 4 zones élevées, 5 zones modérées). |
| 6 | **Méthodologique** | Matrice Bâle II appliquée au cas BGFI : 7 familles (Crédit, Marché, Opérationnel, Concentration, Liquidité, Taux IRRBB, Conformité). Sous-catégories et événements générateurs documentés. Matrice complète impact × probabilité × gravité × DMR avec gravité résiduelle. |
| 7 | **Opérationnelle** | 4 check-lists BGFI : Suivi des Crédits (7 contrôles mensuels), Formalisation des Garanties (5 contrôles), Recouvrement (4 contrôles hebdomadaires), Veille Juridique (5 contrôles trimestriels). |
| 8 | **Analyse sectorielle** | 3 zones critiques BGFI détaillées : Portefeuille douteux 20% (causes racines, impact, plan d'action 4 phases), Insuffisance de procédures crédit (DMR = 0%), Lenteur administrative hypothèques (6-8 mois de délai). |
| 9 | **Méthodologique** | Gap Analysis Conformité AMIFA : Grille d'évaluation maturité 0-4. 8 axes évalués. Score global 15/32 (47%). Alerte rouge : LAB/FT score 0 (inexistant). |
| 10 | **Analyse réglementaire** | Écart Majeur LAB/FT AMIFA : 8 composantes inexistantes (filtrage sanctions, surveillance, profilage, déclaration soupçon, formation, audit, politique, registre PEP). Conséquences juridiques et réputationnelles documentées. |
| 11 | **Analyse réglementaire** | Écart Majeur FATCA/CRS AMIFA : GIIN obtenu mais reporting absent (9 obligations non satisfaites). Écart Majeur Gouvernance : 6 prescriptions COBAC non appliquées sur l'indépendance conformité. |
| 12 | **Méthodologique** | Cartographie des écarts AMIFA : 14 normes évaluées. 29% appliquées, 43% partiellement appliquées, 28% non ou embryonnaires. Concentration sur LCB/FT (3 normes non appliquées). |
| 13 | **Opérationnelle** | Plan d'action AMIFA 90 jours : 4 phases (Urgence J+7, Remédiation J+30, Déploiement J+60, Consolidation J+90). 4 actions détaillées : Filtrage blacklist (6 tâches), Formation LAB/FT (6 modules, 17h), Reporting régulier (5 rapports), Dispositif whistleblowing (7 composantes). |
| 14 | **Stratégique** | Fiches synthétiques ProBoutik : 3 fiches (Opportunité Marché, Business Model, Impact Inclusion). Alignement ODD (5 objectifs). Alertes KHEPRA (surendettement, protection données, exclusion algorithmique). |
| 15 | **Analyse réglementaire** | Triple ancrage réglementaire : COBAC (CEMAC) pour BGFI et AMIFA, BCEAO (UEMOA) pour ProBoutik, FATCA/CRS (OCDE/IRS) pour AMIFA. Interopérabilité entre les 3 domaines. |
| 16 | **Opérationnelle** | Glossaire croisé 32 termes : ANIF, Bâle II, BEPS, CBS, CENTIF, COBAC, CRS, DMR, ERM, FATCA, FI, GABAC, GIIN, IRRBB, KYC, LAB/FT, LCB/FT, OFAC, PAR, PCA, PEP, PIC, PPR, SFI, SME, SURFI, TEG, TIAO, TPME, USSD. |
| 17 | **Méthodologique** | Matrice de pondération des risques BGFI : 4 niveaux d'appétit au risque (zéro, faible, modéré, standard). Classification des 12 risques par appétit. |

---

## CONNAISSANCES MISES À JOUR

| Document | Nature de la mise à jour |
|----------|-------------------------|
| **KHEPRA_KNOWLEDGE_OPERATING_SYSTEM.md** | v1.18 → v1.19. Ajout référence au ProBoutik · BGFI · AMIFA Knowledge Base dans l'en-tête documentaire et la table d'intégration. Référence dans les versions (1.19). |

---

## ÉLÉMENTS À INTÉGRER AU RAG

| Bibliothèque RAG | Document ou extrait à intégrer |
|-----------------|-------------------------------|
| **01_COBAC_REGLEMENTS** | Grille d'évaluation maturité conformité (score 0-4) + Cartographie 14 normes AMIFA |
| **04_LBC_FT** | Dispositif LAB/FT complet (8 composantes) + Check-list filtrage blacklist + Procédure déclaration de soupçon |
| **07_RISK_MANAGEMENT** | Matrice Bâle II 7 familles + 12 risques BGFI + Matrice impact/probabilité/DMR |
| **11_CREDIT_RISK** | Scoring alternatif ProBoutik (7 critères) + Grille /100 + Classification AAA→B |
| **08_GOVERNANCE** | Écart gouvernance AMIFA (indépendance conformité) + Dispositif whistleblowing |
| **10_FINTECH_INNOVATION** | Architecture ProBoutik (mobile-first, API FI, mobile money) + Business Model |

---

## NOUVEAUX MODÈLES À CRÉER

| Type de modèle | Justification |
|---------------|---------------|
| **Template : Gap Analysis Conformité COBAC** | Standardiser les audits de conformité SFD/banque. Réutiliser la grille 0-4 sur 8 axes. Intégrer la cartographie normes appliquées/non appliquées. Score global de maturité. |
| **Template : Cartographie des Risques Bâle II** | Standardiser les missions ERM. Matrice 7 familles avec événements générateurs. Analyse impact/probabilité/gravité/DMR. Carte de chaleur. Check-lists opérationnelles. |
| **Template : Scoring Crédit Alternatif** | Standardiser le scoring TPME informelles. 7 critères avec pondérations paramétrables. Classification automatique. |

---

## MÉTHODOLOGIES À METTRE À JOUR

| Méthodologie | Amélioration proposée |
|-------------|----------------------|
| **Audit de Conformité COBAC** (Deliverable Factory §1) | Intégrer la grille de maturité 0-4 avec 8 axes. Ajouter le format Gap Analysis (écarts majeurs, cartographie, plan d'action 90 jours). |
| **Cartographie des Risques ERM** (Deliverable Factory §1) | Intégrer la matrice Bâle II 7 familles. Ajouter l'analyse DMR avec efficacité en %. Ajouter les check-lists opérationnelles standard. |

---

## SCORE KOS DU LIVRABLE

| Axe | Score | Commentaire |
|-----|-------|------------|
| **Exactitude** | 24/25 | Références réglementaires COBAC vérifiées (R-2016/01, R-2018/01, Circ. 001-2017, 002-2017, 001-2020, 002-2020). Références FATCA/CRS précises. Données marché UEMOA sourcées. |
| **Conformité** | 24/25 | Alignement complet sur le cadre KHEPRA (Constitution Art. 4-8, Governance §4.10, §5.6, §5.7). Structure conforme aux standards Big Four. |
| **Valeur Client** | 19/20 | Check-lists directement actionnables. Plan d'action AMIFA avec échéances précises. Grilles de scoring ProBoutik exploitables immédiatement. Recommandations KHEPRA contextualisées. |
| **Réutilisabilité** | 14/15 | Templates identifiés (Gap Analysis, Cartographie Risques, Scoring Alternatif). Grille maturité 0-4 réutilisable pour tout SFD. Check-lists standardisables. |
| **Innovation** | 12/15 | Scoring 7 critères pour l'informel est innovant. Intégration triple domaine (scoring/risques/conformité) est unique dans KHEPRA OS. Pondération DMR avec efficacité en % peu commune. |
| **SCORE GLOBAL** | **93/100** | **EXCELLENCE** |

> Le score de 93/100 classe ce livrable dans la catégorie EXCELLENCE. Il est approuvé pour intégration prioritaire dans le RAG et l'Intellectual Capital.

---

## ANALYSE TRANSVERSALE

Les trois cas d'usage (ProBoutik, BGFI, AMIFA) forment un triptyque opérationnel cohérent :

```
┌──────────────────────────────────────────────────────────────┐
│           TRIPTYQUE PROBOUTIK · BGFI · AMIFA                  │
│                                                               │
│  PROBOUTIK                    BGFI                           │
│  Scoring Crédit ──────────► Cartographie                     │
│  Informel         Le scoring  des Risques                    │
│  (TPME non         alternatif  (Bâle II)                     │
│   bancarisées)     réduit le                                 │
│                    risque de    │                            │
│                    crédit       │ La cartographie            │
│                                 │ identifie les              │
│                                 │ gaps de                    │
│                                 │ conformité                 │
│                         ┌───────┘                            │
│                         ▼                                     │
│                    AMIFA                                     │
│                    Gap Analysis                              │
│                    Conformité                                │
│                    (COBAC)                                   │
│                         │                                     │
│                         │ Le plan d'action                   │
│                         │ de mise en conformité              │
│                         │ sécurise l'institution             │
│                         ▼                                     │
│                    SFD CONFORME                              │
│                    & RÉSILIENT                               │
│                                                               │
│  CYCLE VERTUEUX :                                             │
│  Scoring → Réduction Risque → Conformité → Confiance         │
│  → Plus de crédit → Plus de données → Meilleur Scoring       │
└──────────────────────────────────────────────────────────────┘
```

**Interopérabilité** : Un SFD utilisant ProBoutik pour scorer ses clients TPME informelles peut appliquer la cartographie BGFI pour identifier ses risques résiduels, puis le Gap Analysis AMIFA pour mesurer sa maturité de conformité. Les trois livrables sont conçus pour être utilisés séquentiellement ou indépendamment.

---

*Bloc de Capitalisation validé par Regulatory & Financial Services BU*
*Prochaine revue : 07 Juillet 2026*