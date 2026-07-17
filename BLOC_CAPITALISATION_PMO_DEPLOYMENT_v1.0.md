# BLOC CAPITALISATION KHEPRA
## Réf : CAP-2026-PMO-001
## Date : 07 Juin 2026

---

## CONNAISSANCES CRÉÉES :

### 1. Architecture PMO — Module 13 du Governance
**Type** : Méthodologique
**Description** : Création du Module 13 — Deployment & Project Management Office dans le KHEPRA AI Governance (v2.0 → v2.1). Ce module définit la méthodologie standard de déploiement opérationnel pour toute création, extension ou restructuration d'institution financière. Il introduit l'architecture des 5 Volets (Logistique → SI → RH → Finance → Go-to-Market) comme standard KHEPRA pour les projets de déploiement.

### 2. Cadre des 5 Volets Opérationnels
**Type** : Méthodologique
**Description** : Formalisation de la séquence standard de déploiement en 5 volets interdépendants :
- **Volet 1** — Support & Développement Logistique : Locaux, identité visuelle, sécurité physique (coffre-fort EN 1143-1, gardiennage, transport de fonds)
- **Volet 2** — Sécurité & Architecture SI : Hébergement, Core Banking System (Perfect/Delta/T24), GPO (ANCY P5.4.3), Antivirus
- **Volet 3** — Gouvernance RH : Recrutement, formation (Processus Métiers + Sécurité SI + CBS), Matrice de séparation des tâches (G1.2.5)
- **Volet 4** — Trésorerie & Finances : Comptes bancaires, Libération capital social, Circuits trésorerie
- **Volet 5** — Go-to-Market & Amorçage : Marketing BTL, Prospection terrain, Lancement officiel

### 3. Matrice de Séparation des Tâches (G1.2.5)
**Type** : Réglementaire
**Description** : Formalisation des 5 cumuls interdits dans la matrice de séparation des tâches : Saisie+Validation, Octroi+Recouvrement, Gestion espèces+Comptabilisation, Admin SI+Opérations métier, Contrôle permanent+Opérationnel. Chaque cumul est justifié par une référence réglementaire (G1.2.5, COSO, ANCY P5.4.3, COBAC R-2016/01).

### 4. Chemin Critique et Phasage PMO
**Type** : Opérationnelle
**Description** : Définition du chemin critique du déploiement avec durées standards par volet (V1: 8-12 sem, V2: 10-16 sem, V3: 8-14 sem, V4: 4-8 sem, V5: 6-10 sem) et dépendances entre volets. Règle stricte : aucun GO-LIVE sans validation formelle des 4 prérequis (V1-V4).

### 5. Gouvernance PMO — Rôles et COPIL
**Type** : Méthodologique
**Description** : Définition des 7 rôles PMO (PMO Partner, Chefs de Projet V1-V5, Sponsor), du Comité de Pilotage (hebdomadaire, mensuel, jalon, GO-LIVE), et des 5 outils de pilotage (Tableau de Bord, Registre des Risques, Registre des Décisions, Planning Gantt, Budget PMO).

### 6. Système d'Alertes PMO
**Type** : Opérationnelle
**Description** : 5 types d'alertes automatiques (Retard planning, Dépassement budgétaire, Blocage critique, Non-conformité réglementaire, Ressource manquante) avec niveaux (Orange/Rouge) et actions requises. Format standardisé d'alerte PMO.

### 7. Clôture PMO et Transfert RUN
**Type** : Opérationnelle
**Description** : 5 critères de clôture PMO (V5 achevé, Support post-GO-LIVE, Transfert formalisé, Documentation remise, PV signé) et 4 livrables de clôture (Rapport, Dossier de Transfert, Check-list conformité, Plan de continuité).

### 8. PMO Partner — Rôle Virtual Board
**Type** : Gouvernance
**Description** : Intégration du PMO Partner comme 9ème membre du Virtual Board. Angle de revue : respect du planning 5 Volets, validation des jalons, dépendances critiques, prérequis GO-LIVE, matrice de séparation des tâches (G1.2.5).

---

## CONNAISSANCES MISES À JOUR :

| Document | Nature de la mise à jour |
|----------|--------------------------|
| `KHEPRA_AI_GOVERNANCE.md` | v2.0 → v2.1 — Ajout §13 complet (Deployment & PMO), intégration dans l'architecture, le pipeline, le Virtual Board (9 Partners), le Cycle de Vie, les Annexes B |
| `KHEPRA_KNOWLEDGE_OPERATING_SYSTEM.md` | v1.2 → v1.3 — Référence au Module PMO dans l'en-tête, le tableau de l'écosystème documentaire, et l'historique des versions |

---

## ÉLÉMENTS À INTÉGRER AU RAG :

| Bibliothèque RAG | Document ou extrait à intégrer |
|-----------------|-------------------------------|
| 15_KHEPRA_METHODOLOGIES | Méthodologie PMO — 5 Volets de Déploiement (complet) |
| 15_KHEPRA_METHODOLOGIES | Matrice de Séparation des Tâches (G1.2.5) — 5 cumuls interdits |
| 15_KHEPRA_METHODOLOGIES | Chemin Critique PMO — Phasage et dépendances |
| 01_RÉGULATION_FINANCIÈRE | Références ANCY P5.4.3, COBAC R-2016/01, G1.2.5 (contexte déploiement) |
| 08_COBAC | Exigences COBAC pour le déploiement opérationnel (capital, sécurité, SI) |

---

## NOUVEAUX MODÈLES À CRÉER :

| Type de modèle | Justification |
|---------------|--------------|
| Template Tableau de Bord PMO | Standardiser le suivi hebdomadaire des 5 volets avec indicateurs, % avancement, alertes |
| Template Registre des Risques Projet | Standardiser l'identification et le suivi des risques par volet |
| Template PV de Clôture PMO | Document type pour la validation formelle de chaque volet et du GO-LIVE final |
| Check-list GO-LIVE | Check-list standardisée des 4 prérequis obligatoires avant ouverture |

---

## MÉTHODOLOGIES À METTRE À JOUR :

| Méthodologie | Amélioration proposée |
|-------------|----------------------|
| KHEPRA Deliverable Factory §1 (Due Diligence / Audit) | Ajouter référence au Module PMO pour les missions de déploiement — la due diligence post-déploiement s'appuie sur les livrables PMO |
| KHEPRA Deliverable Factory §1 (Proposition Commerciale) | Template de proposition pour mission PMO — inclure les 5 Volets, le phasage et le budget prévisionnel |

---

## SCORE KOS DU LIVRABLE : 91/100

| Axe | Score | Commentaire |
|-----|-------|------------|
| Exactitude | 23/25 | Références réglementaires précises (ANCY P5.4.3, G1.2.5, COBAC R-2016/01, EN 1143-1). Les durées de phasage sont indicatives et devront être calibrées par projet. |
| Conformité | 24/25 | Alignement complet avec le cadre KHEPRA (Constitution, Governance, KOS). Intégration dans tous les circuits de validation (Virtual Board, Cycle de Vie). |
| Valeur Client | 19/20 | Le playbook PMO est directement actionnable pour tout projet de création d'EMF, fintech ou établissement de paiement. |
| Réutilisabilité | 14/15 | La structure en 5 Volets est générique et adaptable à tout type de déploiement institutionnel. |
| Innovation | 11/15 | La formalisation du PMO comme module Governance est nouvelle dans l'écosystème. L'innovation réside davantage dans l'intégration systémique que dans la nouveauté absolue du contenu. |

---

*Validé par : PMO Partner — KHEPRA EXPERTS*
*Prochaine revue : 07 Juillet 2026*
*Référence Governance : KHEPRA_AI_GOVERNANCE.md §13*