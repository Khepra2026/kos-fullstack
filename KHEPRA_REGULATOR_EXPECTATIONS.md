# KHEPRA REGULATOR EXPECTATIONS
## Base des Attentes des Régulateurs — KHEPRA EXPERTS
### Version 1.0 · 07 Juin 2026

> **Document suprême** : [KHEPRA_CONSTITUTION.md](./KHEPRA_CONSTITUTION.md)
> **Documents liés** : [KHEPRA_RAG_REGULATOIRE.md](./KHEPRA_RAG_REGULATOIRE.md), [KHEPRA_RISK_LIBRARY.md](./KHEPRA_RISK_LIBRARY.md)
> **Framework** : [KHEPRA_AI_GOVERNANCE.md](./KHEPRA_AI_GOVERNANCE.md)

---

La base "Questions des Régulateurs" est un actif stratégique à très forte valeur ajoutée. Elle capitalise les constats récurrents, observations d'inspection et attentes documentaires des autorités de supervision pour orienter les missions vers les préoccupations réelles des superviseurs — et ainsi maximiser la valeur client.

---

## 1. ARCHITECTURE

```
REGULATOR_EXPECTATIONS/
│
├── 01_BCEAO/
│   ├── Constats_Recurrents/
│   │   ├── Gouvernance.md
│   │   ├── Controle_Interne.md
│   │   ├── LBC_FT.md
│   │   ├── Gestion_Risques.md
│   │   └── Systeme_Information.md
│   ├── Observations_Inspection/
│   │   ├── Inspection_Sur_Place.md
│   │   ├── Inspection_Sur_Pieces.md
│   │   └── Missions_Thematiques.md
│   ├── Faiblesses_Frequentes/
│   │   ├── Top_10_Insuffisances.md
│   │   └── Analyse_Evolution.md
│   ├── Attentes_Documentaires/
│   │   ├── Documents_Permanents.md
│   │   ├── Documents_Periodiques.md
│   │   └── Format_Attendu.md
│   └── Plans_Actions_Observés/
│       ├── Plans_Remediation_Types.md
│       └── Suivi_Recommandations.md
│
├── 02_COBAC/
│   ├── Constats_Recurrents/
│   ├── Observations_Inspection/
│   ├── Faiblesses_Frequentes/
│   ├── Attentes_Documentaires/
│   └── Plans_Actions_Observés/
│
├── 03_CIMA/
│   ├── Constats_Recurrents/
│   ├── Faiblesses_Frequentes/
│   └── Attentes_Documentaires/
│
├── 04_GIABA/
│   ├── Constats_Evaluation_Mutuelle/
│   ├── Lacunes_Recurrentes/
│   └── Recommandations_Non_Appliquees/
│
├── 05_GABAC/
│   ├── Constats_Evaluation_Mutuelle/
│   ├── Lacunes_Recurrentes/
│   └── Recommandations_Non_Appliquees/
│
└── 06_AUTORITES_PROTECTION_DONNEES/
    ├── Constats_Controle/
    ├── Sanctions_Prononcees/
    └── Attentes_Documentaires/
```

---

## 2. FICHE DE CONSTAT — MODÈLE

```yaml
# CONSTAT RÉGULATEUR KHEPRA
Reference: REG-OBS-2026-001
Regulateur: [BCEAO | COBAC | CIMA | GIABA | GABAC]
Date_Constat: AAAA-MM-JJ
Source: [Rapport d'inspection | Évaluation mutuelle | Décision | Communication]

# IDENTIFICATION
Domaine: [Gouvernance | LBC/FT | Contrôle Interne | Risques | SI | etc.]
Type_Etablissement: [Banque | SFD | Établissement de Paiement | Fintech]
Constats:

  - Intitule: [Formulation synthétique]
    Description: >
      Description détaillée du constat tel que formulé
      par le régulateur.
    Reference_Reglementaire: [Texte et article concerné]
    Frequence: [Systématique | Très Fréquent | Fréquent | Occasionnel | Rare]
    Criticite_Percue: [Critique | Élevé | Modéré | Faible]

# EXIGENCES
Attentes_Documentaires:
  - [Document attendu par le régulateur]
Delais_Impartis: [Délai typique accordé]
Sanctions_Observees: [Sanctions prononcées pour ce type de constat]

# RÉPONSE KHEPRA
Plan_Action_Type:
  - Action: [Action corrective type]
    Responsable: [Direction / Service]
    Delai: [Court / Moyen / Long terme]
    Justification: [Pourquoi cette action répond au constat]
Livrables_Associes:
  - [Livrable KHEPRA Deliverable Factory correspondant]
Risques_Correspondants:
  - [Référence KHEPRA Risk Library]

# CAS OBSERVÉS (anonymisés)
Exemple_1:
  Contexte: [Contexte anonymisé]
  Constat_Initial: [Ce que le régulateur a relevé]
  Plan_Soumis: [Plan d'action soumis par l'établissement]
  Acceptation: [Accepté | Partiellement Accepté | Rejeté]
  Suivi: [Résultat du suivi]
```

---

## 3. TOP 10 DES INSUFFISANCES — PAR RÉGULATEUR

### BCEAO — Insuffisances les plus fréquentes

| Rang | Insuffisance | Domaine | Fréquence |
|------|-------------|---------|-----------|
| 1 | Dispositif LBC/FT incomplet ou non documenté | LBC/FT | Systématique |
| 2 | Cartographie des risques non actualisée | Risques | Très Fréquent |
| 3 | Indépendance insuffisante des administrateurs | Gouvernance | Fréquent |
| 4 | Absence de plans préventifs de redressement | Résilience | Fréquent |
| 5 | Politique de rémunération non formalisée | Gouvernance | Fréquent |
| 6 | Tests de résistance absents ou insuffisants | Risques | Fréquent |
| 7 | Classification des créances non conforme | Crédit | Occasionnel |
| 8 | Externalisation non encadrée | Opérationnel | Occasionnel |
| 9 | Système d'information non sécurisé | SI | Occasionnel |
| 10 | Reporting réglementaire incomplet | Reporting | Occasionnel |

### COBAC — Insuffisances les plus fréquentes

| Rang | Insuffisance | Domaine | Fréquence |
|------|-------------|---------|-----------|
| 1 | Dispositif de contrôle interne non formalisé | Contrôle | Systématique |
| 2 | Cartographie des risques insuffisante | Risques | Très Fréquent |
| 3 | Gouvernance non conforme au R-2016/01 | Gouvernance | Fréquent |
| 4 | Classification et provisionnement non conformes | Crédit | Fréquent |
| 5 | LBC/FT — Absence de déclarations de soupçon | LBC/FT | Fréquent |
| 6 | Ratio de solvabilité insuffisant | Prudentiel | Occasionnel |
| 7 | Commissariat aux comptes non conforme | Audit Externe | Occasionnel |
| 8 | Engagements sur apparentés excessifs | Gouvernance | Occasionnel |
| 9 | Plan de continuité d'activité inexistant | Résilience | Occasionnel |
| 10 | Reporting COBAC incomplet ou tardif | Reporting | Occasionnel |

---

## 4. INTÉGRATION OPÉRATIONNELLE

### Avant une mission

```
[IDENTIFICATION CLIENT] → Secteur, juridiction
        ↓
[CONSULTATION REGULATOR EXPECTATIONS] → Constats pertinents
        ↓
[ORIENTATION MISSION] → Focus sur les attentes régulateur
        ↓
[PRÉPARATION LIVRABLES] → Alignement sur les attentes documentaires
```

### Prompt d'orientation

```
=== KHEPRA REGULATOR EXPECTATIONS — ORIENTATION ===

Avant de démarrer toute mission d'audit ou de diagnostic :

1. IDENTIFIER le régulateur compétent (BCEAO, COBAC, CIMA)
2. CHARGER les constats récurrents de ce régulateur
3. CHARGER le Top 10 des insuffisances fréquentes
4. ORIENTER le périmètre d'audit vers ces zones de risque
5. ALIGNER les livrables sur les attentes documentaires
6. INTÉGRER les plans d'actions types dans les recommandations

Objectif : Anticiper les préoccupations du régulateur
avant même qu'il ne les formule.
```

---

*Document validé par la Task Force Big Four — 07 Juin 2026*