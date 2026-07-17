# KHEPRA REGULATORY RAG
## Moteur de Recherche Documentaire Réglementaire — KHEPRA EXPERTS
### Version 1.0 · 07 Juin 2026

> **Document suprême** : [KHEPRA_CONSTITUTION.md](./KHEPRA_CONSTITUTION.md)
> **Couche supérieure** : [KHEPRA_SYSTEM_MASTER_PROMPT.md](./KHEPRA_SYSTEM_MASTER_PROMPT.md)
> **Couche inférieure** : Agents Experts → Quality Controller → Utilisateur
> **Framework d'application** : [KHEPRA_AI_GOVERNANCE.md](./KHEPRA_AI_GOVERNANCE.md)

---

## ARCHITECTURE CIBLE

```
┌─────────────────────────────────────────────┐
│           KHEPRA CONSTITUTION                │
│           (Norme Suprême)                     │
├─────────────────────────────────────────────┤
│           SYSTEM MASTER PROMPT               │
│           (Intelligence Centrale)             │
├─────────────────────────────────────────────┤
│           KHEPRA REGULATORY RAG  ← NOUVEAU   │
│           (Moteur Documentaire)               │
├─────────────────────────────────────────────┤
│           EXPERT AGENTS                      │
│           (Agents Spécialisés)                │
├─────────────────────────────────────────────┤
│           QUALITY CONTROLLER                 │
│           (Contrôle Final)                    │
├─────────────────────────────────────────────┤
│           UTILISATEUR                        │
└─────────────────────────────────────────────┘
```

Le KHEPRA Regulatory RAG est la couche intermédiaire entre l'intelligence centrale (Master Prompt) et les agents experts. Il constitue l'investissement stratégique le plus important de KHEPRA EXPERTS : c'est ce qui permet à l'IA de répondre à partir du corpus documentaire propre de KHEPRA plutôt qu'à partir de connaissances générales.

---

## 1. OBJECTIF DU RAG KHEPRA

### Mission

Fournir à l'IA les textes réglementaires, guides, référentiels et méthodologies les plus pertinents pour produire des analyses, audits, rapports et recommandations adaptés aux réalités africaines francophones.

### Périmètre

Le RAG ne doit contenir que des documents officiels ou validés par KHEPRA :

- Textes réglementaires en vigueur (BCEAO, COBAC, CEMAC, UEMOA, OHADA)
- Standards internationaux applicables (GAFI, OCDE, Bâle, ISO)
- Méthodologies internes KHEPRA (audit, conformité, diagnostic)
- Livrables modèles (rapports, offres techniques, plans d'action)
- Études de cas anonymisées et retours d'expérience

### Exclusions

Le RAG exclut explicitement :

- Contenus non vérifiés ou non officiels
- Textes abrogés (sauf mention explicite d'abrogation)
- Opinions personnelles ou analyses non sourcées
- Documents clients confidentiels non anonymisés
- Contenus générés par IA sans revue humaine

---

## 2. STRUCTURE DOCUMENTAIRE

### Dépôt Maître

```
KHEPRA-RAG-v1/
```

### Arborescence Complète

```
KHEPRA-RAG-v1/
│
├── 01_BCEAO/
│   ├── Paiement/
│   ├── Monnaie_Electronique/
│   ├── LBC_FT/
│   ├── Risques/
│   ├── Controle_Interne/
│   └── Fintech/
│
├── 02_COBAC/
│   ├── Gouvernance/
│   ├── Controle_Interne/
│   ├── Risques/
│   ├── AML/
│   ├── Audit/
│   └── Sanctions/
│
├── 03_CIMA/
│   ├── Reglementation/
│   ├── Agrements/
│   └── Controle/
│
├── 04_UEMOA/
│   ├── Reglements/
│   ├── Directives/
│   └── Decisions/
│
├── 05_CEMAC/
│   ├── Reglements/
│   ├── Directives/
│   └── Decisions/
│
├── 06_OHADA/
│   ├── AUDCG/
│   ├── AUSCGIE/
│   ├── Suretes/
│   ├── Procedures_Collectives/
│   └── Jurisprudence/
│
├── 07_GAFI_GIABA/
│   ├── Recommandations/
│   ├── Guides/
│   ├── Evaluations/
│   └── Typologies/
│
├── 08_PROTECTION_DONNEES/
│   ├── RGPD/
│   ├── Afrique_Ouest/
│   ├── Afrique_Centrale/
│   └── Jurisprudence/
│
├── 09_PRIX_TRANSFERT/
│   ├── OCDE/
│   ├── ONU/
│   ├── UEMOA/
│   ├── CEMAC/
│   └── Jurisprudence/
│
├── 10_GOUVERNANCE_RISQUES/
│   ├── Gouvernance/
│   ├── Risk_Management/
│   ├── Audit_Interne/
│   ├── Controle_Interne/
│   └── ESG/
│
├── 11_AUDIT_CONTROLE/
│   ├── Audit_Interne/
│   ├── Audit_Externe/
│   ├── Controle_Permanent/
│   ├── Controle_Periodique/
│   └── Inspection/
│
├── 12_FINTECH/
│   ├── Agrement/
│   ├── Monnaie_Electronique/
│   ├── Services_Paiement/
│   ├── Open_Banking/
│   └── Crypto_Actifs/
│
├── 13_IA_REGTECH/
│   ├── IA_Gouvernance/
│   ├── IA_Act/
│   ├── ISO42001/
│   ├── NIST/
│   └── RegTech/
│
├── 14_CYBERSECURITE/
│   ├── ISO27001/
│   ├── NIST_CSF/
│   ├── Reglementations_Africaines/
│   └── Bonnes_Pratiques/
│
└── 15_KHEPRA_METHODOLOGIES/
    ├── Audit_AML_CFT/
    ├── Audit_Conformite/
    ├── Audit_Protection_Donnees/
    ├── Audit_Gouvernance/
    ├── Audit_Prix_Transfert/
    ├── Livrables_Modeles/
    │   ├── Rapports/
    │   ├── Offres_Techniques/
    │   ├── Diagnostics/
    │   └── Plans_Action/
    ├── Feuilles_Route/
    ├── Etudes_Cas/
    │   ├── Cas_Anonymises/
    │   ├── Retours_Experience/
    │   └── Bonnes_Pratiques/
    └── Referentiels_Internes/
```

---

## 3. BIBLIOTHÈQUE BCEAO

### Contenu

Instructions, avis, circulaires et décisions de la Banque Centrale des États de l'Afrique de l'Ouest.

### Sources officielles

- bceao.int — Site officiel
- Journal Officiel de l'UEMOA
- Recueil des textes bancaires UEMOA

### Sous-structure détaillée

```
01_BCEAO/
├── Paiement/
│   ├── Instruction_BCEAO_2024_Monnaie_Electronique.pdf
│   ├── Services_Paiement_UEMOA.pdf
│   └── Interoperabilite_Paiement.pdf
├── Monnaie_Electronique/
│   ├── Cadre_EMoney_UEMOA.pdf
│   └── Agrement_Emetteurs_EMoney.pdf
├── LBC_FT/
│   ├── Directive_BCEAO_02_2015_LBC_FT.pdf
│   ├── Dispositif_LBC_FT_BCEAO.pdf
│   └── Lignes_Directrices_LBC_FT.pdf
├── Risques/
│   ├── Gestion_Risques_Etablissements.pdf
│   ├── Risques_Operationnels_BCEAO.pdf
│   └── Stress_Testing_BCEAO.pdf
├── Controle_Interne/
│   ├── Circulaire_01_2017_Gouvernance.pdf
│   ├── Circulaire_02_2017_Competences.pdf
│   ├── Circulaire_03_2017_Controle_Interne.pdf
│   └── Circulaire_001_2020_Plans_Preventifs.pdf
└── Fintech/
    ├── Agrement_FINTECH_UEMOA.pdf
    ├── Sandbox_Reglementaire_BCEAO.pdf
    └── Innovation_Financiere_UEMOA.pdf
```

### Textes clés

| Référence | Titre | Date | Statut |
|-----------|-------|------|--------|
| Circulaire 01/2017/CB | Gouvernance des établissements de crédit | 2017 | En vigueur |
| Circulaire 02/2017/CB | Compétences et honorabilité des dirigeants | 2017 | En vigueur |
| Circulaire 03/2017/CB | Dispositif de contrôle interne | 2017 | En vigueur |
| Circulaire 001-2020/CB | Plans préventifs de redressement | 2020 | En vigueur |
| Directive 02/2015 | LBC/FT dans l'UEMOA | 2015 | En vigueur |

---

## 4. BIBLIOTHÈQUE COBAC

### Contenu

Règlements, instructions et décisions de la Commission Bancaire de l'Afrique Centrale.

### Sources officielles

- beac.int — Site officiel de la BEAC (rubrique COBAC)
- Journal Officiel de la CEMAC
- Recueil des textes COBAC

### Sous-structure détaillée

```
02_COBAC/
├── Gouvernance/
│   ├── Reglement_COBAC_R_2001_07_Gouvernance.pdf
│   ├── Reglement_COBAC_R_2016_01_Gouvernance.pdf
│   └── Administrateurs_Independants.pdf
├── Controle_Interne/
│   ├── Dispositif_Controle_Interne_COBAC.pdf
│   ├── Controle_Permanent.pdf
│   └── Controle_Periodique.pdf
├── Risques/
│   ├── Gestion_Risques_COBAC.pdf
│   ├── Risques_Operationnels.pdf
│   └── Risques_Credit_COBAC.pdf
├── AML/
│   ├── Reglement_COBAC_R_2018_01_LBC_FT.pdf
│   ├── Lignes_Directrices_LBC_FT.pdf
│   └── Declarations_Soupcon.pdf
├── Audit/
│   ├── Audit_Interne_COBAC.pdf
│   ├── Audit_Externe_COBAC.pdf
│   └── Commissaires_Comptes.pdf
└── Sanctions/
    ├── Regime_Sanctions_COBAC.pdf
    └── Procedure_Disciplinaire.pdf
```

### Textes clés

| Référence | Titre | Date | Statut |
|-----------|-------|------|--------|
| R-2001/07 | Organisation du contrôle interne | 2001 (révisé) | En vigueur |
| R-2016/01 | Gouvernement d'entreprise | 2016 | En vigueur |
| R-2018/01 | LBC/FT — Obligations des assujettis | 2018 | En vigueur |

---

## 5. BIBLIOTHÈQUE OHADA

### Contenu

Actes uniformes, jurisprudence et doctrine OHADA.

### Sources officielles

- ohada.org — Site officiel
- UNIDA — www.unida.org
- Jurisprudence des CCJA

### Sous-structure détaillée

```
06_OHADA/
├── AUDCG/
│   ├── Acte_Uniforme_Droit_Commercial_General.pdf
│   └── Commentaires_AUDCG.pdf
├── AUSCGIE/
│   ├── Acte_Uniforme_Societes_Commerciales_GIE.pdf
│   └── Revision_2014_AUSCGIE.pdf
├── Suretes/
│   ├── Acte_Uniforme_Suretes.pdf
│   └── Commentaires_Suretes.pdf
├── Procedures_Collectives/
│   ├── Acte_Uniforme_Procedures_Collectives.pdf
│   └── Apurement_Passif.pdf
└── Jurisprudence/
    ├── CCJA_Arrets_Principaux.pdf
    └── Notes_Doctrine.pdf
```

### Textes clés

| Référence | Titre | Date | Statut |
|-----------|-------|------|--------|
| AUDCG | Acte Uniforme Droit Commercial Général | 1997 (révisé 2010) | En vigueur |
| AUSCGIE | Acte Uniforme Sociétés Commerciales et GIE | 1997 (révisé 2014) | En vigueur |
| AUS | Acte Uniforme Sûretés | 1997 (révisé 2010) | En vigueur |
| AUPC | Acte Uniforme Procédures Collectives | 1998 (révisé 2015) | En vigueur |

---

## 6. BIBLIOTHÈQUE GAFI / GIABA

### Contenu

40 recommandations du GAFI, méthodologies d'évaluation, rapports d'évaluation mutuelle, guides sectoriels.

### Sources officielles

- fatf-gafi.org — Site officiel du GAFI
- giaba.org — Site officiel du GIABA
- gabac-cm.org — Site officiel du GABAC

### Sous-structure

```
07_GAFI_GIABA/
├── Recommandations/
│   ├── 40_Recommandations_GAFI_2023.pdf
│   ├── Note_Interpretative_Rec_1.pdf
│   ├── Note_Interpretative_Rec_10.pdf
│   └── Glossaire_GAFI.pdf
├── Guides/
│   ├── Guide_Approche_Basée_Risques.pdf
│   ├── Guide_Beneficiaires_Effectifs.pdf
│   ├── Guide_Actifs_Virtuels.pdf
│   └── Guide_Secteur_Bancaire.pdf
├── Evaluations/
│   ├── Methode_Evaluation_GAFI_2023.pdf
│   ├── Rapport_Evaluation_Mutuelle_Senegal.pdf
│   ├── Rapport_Evaluation_Mutuelle_Cote_Ivoire.pdf
│   └── Rapport_Evaluation_Mutuelle_Cameroun.pdf
└── Typologies/
    ├── Typologies_Blanchiment_Afrique_Ouest.pdf
    ├── Typologies_Financement_Terrorisme.pdf
    └── Typologies_Corruption.pdf
```

---

## 7. BIBLIOTHÈQUE PRIX DE TRANSFERT

### Contenu

Principes OCDE, principes ONU, législations africaines, jurisprudence.

### Sources officielles

- oecd.org — Site officiel de l'OCDE
- un.org — Site officiel des Nations Unies
- uemoa.int — Site officiel de l'UEMOA
- cemac.int — Site officiel de la CEMAC

### Sous-structure

```
09_PRIX_TRANSFERT/
├── OCDE/
│   ├── BEPS_Action_13_Documentation_PT.pdf
│   ├── Principes_Directeurs_OCDE_2022.pdf
│   ├── Modele_Convention_Fiscale_2017.pdf
│   └── Guide_Application_Principe_Pleine_Concurrence.pdf
├── ONU/
│   ├── Manuel_Pratique_PT_Pays_Developpement.pdf
│   └── Modele_Convention_Fiscale_ONU_2021.pdf
├── UEMOA/
│   ├── Directive_01_2011_CM_UEMOA.pdf
│   └── Guide_Pratique_PT_UEMOA.pdf
├── CEMAC/
│   ├── Reglement_01_18_CEMAC_UMAC_DFLC.pdf
│   └── Guide_Pratique_PT_CEMAC.pdf
└── Jurisprudence/
    ├── Decisions_PT_Afrique.pdf
    └── Analyses_Jurisprudence_PT.pdf
```

---

## 8. BIBLIOTHÈQUE PROTECTION DES DONNÉES

### Contenu

RGPD, lois nationales africaines, guides des autorités de contrôle.

### Sources officielles

- eur-lex.europa.eu — Textes européens
- au.int — Union Africaine (Convention de Malabo)
- uemoa.int — Textes UEMOA
- Autorités nationales de protection des données

### Sous-structure

```
08_PROTECTION_DONNEES/
├── RGPD/
│   ├── RGPD_UE_2016_679_Texte_Integral.pdf
│   ├── Guide_RGPD_CNIL.pdf
│   └── Guide_Transferts_Donnees_Hors_UE.pdf
├── Afrique_Ouest/
│   ├── Convention_Malabo_2014.pdf
│   ├── Reglement_UEMOA_01_2020_Donnees.pdf
│   ├── Lois_Nationales_UEMOA.pdf
│   └── Autorites_Protection_Donnees_Ouest.pdf
├── Afrique_Centrale/
│   ├── Lois_Nationales_CEMAC.pdf
│   └── Autorites_Protection_Donnees_Centre.pdf
└── Jurisprudence/
    ├── Decisions_Protection_Donnees_Afrique.pdf
    └── Sanctions_Protection_Donnees.pdf
```

---

## 9. BIBLIOTHÈQUE IA ET REGTECH

### Contenu

IA Act, NIST AI RMF, ISO 42001, ISO 27001, OCDE IA, UNESCO IA.

### Sources officielles

- artificialintelligenceact.eu — IA Act
- nist.gov — NIST AI RMF
- iso.org — Standards ISO
- oecd.org — Principes IA OCDE
- unesco.org — Recommandation IA UNESCO

### Sous-structure

```
13_IA_REGTECH/
├── IA_Gouvernance/
│   ├── Principes_OCDE_IA.pdf
│   ├── Recommandation_UNESCO_IA.pdf
│   └── Gouvernance_IA_Entreprise.pdf
├── IA_Act/
│   ├── IA_Act_UE_2024_Integral.pdf
│   ├── Classification_Risques_IA.pdf
│   └── Obligations_Fournisseurs_IA.pdf
├── ISO42001/
│   ├── ISO_42001_2023_SMSIA.pdf
│   └── Guide_Implementation_ISO42001.pdf
├── NIST/
│   ├── NIST_AI_RMF_1_0.pdf
│   ├── NIST_AI_RMF_Playbook.pdf
│   └── NIST_AI_RMF_Generative_AI.pdf
└── RegTech/
    ├── RegTech_Panorama_Afrique.pdf
    ├── SupTech_Applications.pdf
    └── Automatisation_Conformite.pdf
```

---

## 10. BIBLIOTHÈQUE KHEPRA — Avantage Concurrentiel

C'est le cœur différenciant du RAG KHEPRA. Cette bibliothèque contient l'ensemble des méthodologies, livrables modèles et retours d'expérience accumulés par KHEPRA EXPERTS.

### Sous-structure détaillée

```
15_KHEPRA_METHODOLOGIES/
├── Audit_AML_CFT/
│   ├── Methode_Audit_LBC_FT_BCEAO.pdf
│   ├── Methode_Audit_LBC_FT_COBAC.pdf
│   ├── Grille_Evaluation_Dispositif_LBC_FT.pdf
│   └── Questionnaire_Audit_LBC_FT.pdf
├── Audit_Conformite/
│   ├── Methode_Audit_Conformite_Reglementaire.pdf
│   ├── Matrice_Conformite_Reglementaire.xlsx
│   ├── Grille_Controle_Permanent.pdf
│   └── Rapport_Type_Audit_Conformite.pdf
├── Audit_Protection_Donnees/
│   ├── Methode_Audit_Protection_Donnees.pdf
│   ├── Grille_Conformite_RGPD.pdf
│   ├── Grille_Conformite_Malabo.pdf
│   └── Registre_Traitements_Modele.xlsx
├── Audit_Gouvernance/
│   ├── Methode_Audit_Gouvernance.pdf
│   ├── Grille_Evaluation_CA.pdf
│   ├── Evaluation_Comites_Specialises.pdf
│   └── Diagnostic_Gouvernance_Modele.pdf
├── Audit_Prix_Transfert/
│   ├── Methode_Audit_Prix_Transfert.pdf
│   ├── Analyse_Fonctionnelle_Modele.pdf
│   ├── Documentation_PT_Modele.pdf
│   └── Benchmarking_Approche.pdf
├── Livrables_Modeles/
│   ├── Rapports/
│   │   ├── Rapport_Due_Diligence_Reglementaire.pdf
│   │   ├── Rapport_Audit_Conformite.pdf
│   │   ├── Rapport_Evaluation_Risques.pdf
│   │   └── Rapport_Diagnostic_Organisationnel.pdf
│   ├── Offres_Techniques/
│   │   ├── Offre_Due_Diligence.pdf
│   │   ├── Offre_Audit_LBC_FT.pdf
│   │   ├── Offre_Conseil_Gouvernance.pdf
│   │   └── Offre_Transformation_Digitale.pdf
│   ├── Diagnostics/
│   │   ├── Diagnostic_Flash_Conformite.pdf
│   │   ├── Diagnostic_Gouvernance.pdf
│   │   ├── Diagnostic_Pre_Inspection.pdf
│   │   └── Diagnostic_ESG.pdf
│   └── Plans_Action/
│       ├── Plan_Action_LBC_FT.pdf
│       ├── Plan_Remediation_Conformite.pdf
│       └── Feuille_Route_Gouvernance.pdf
├── Feuilles_Route/
│   ├── Roadmap_Conformite_100_Jours.pdf
│   ├── Roadmap_Agrement_SFD.pdf
│   └── Roadmap_Transformation_Digitale.pdf
├── Etudes_Cas/
│   ├── Cas_Anonymises/
│   │   ├── Cas_Agrement_Multinational_SFD.pdf
│   │   ├── Cas_Prix_Transfert_Microfinance.pdf
│   │   ├── Cas_Gouvernance_Board_UEMOA.pdf
│   │   └── Cas_RegTech_Conformite.pdf
│   ├── Retours_Experience/
│   │   ├── Lecons_Audit_BCEAO.pdf
│   │   ├── Lecons_Audit_COBAC.pdf
│   │   └── Lecons_Due_Diligence.pdf
│   └── Bonnes_Pratiques/
│       ├── BP_Conduite_Mission_Audit.pdf
│       ├── BP_Relation_Regulateur.pdf
│       └── BP_Gestion_Projet_Conformite.pdf
└── Referentiels_Internes/
    ├── Referentiel_Qualite_KHEPRA.pdf
    ├── Politique_Confidentialite.pdf
    ├── Charte_Deontologique.pdf
    └── Manuel_Procedures_KHEPRA.pdf
```

---

## 11. MÉTADONNÉES OBLIGATOIRES

Chaque document intégré au RAG doit être indexé avec les métadonnées suivantes :

### Schéma de métadonnées

| Champ | Description | Obligatoire | Format |
|-------|-------------|-------------|--------|
| **Titre** | Titre officiel complet du document | Oui | Texte |
| **Source** | Source officielle du document | Oui | Texte |
| **Auteur** | Auteur ou organisation émettrice | Oui | Texte |
| **Date** | Date de publication ou de dernière mise à jour | Oui | AAAA-MM-JJ |
| **Pays** | Pays ou juridiction concernée | Oui | ISO 3166 |
| **Organisation** | Organisation émettrice | Oui | Texte |
| **Domaine** | Domaine principal | Oui | Liste contrôlée |
| **Sous-domaine** | Sous-domaine spécifique | Oui | Liste contrôlée |
| **Version** | Version du document dans le RAG | Oui | x.y |
| **Statut** | Statut juridique du document | Oui | Liste contrôlée |
| **Mots-clés** | Mots-clés de recherche | Oui | Liste (5-10) |
| **Langue** | Langue du document | Oui | ISO 639-1 |
| **URL Source** | Lien vers le document source original | Non | URL |
| **Date Intégration** | Date d'intégration dans le RAG | Oui | AAAA-MM-JJ |
| **Dernière Vérification** | Date de dernière vérification du statut | Oui | AAAA-MM-JJ |
| **Hash Document** | Empreinte SHA-256 pour intégrité | Non | SHA-256 |
| **Restrictions** | Restrictions d'accès éventuelles | Non | Texte |

### Domaines contrôlés

| Code | Domaine |
|------|---------|
| REG_FIN | Régulation Financière |
| CONFORMITE | Conformité Réglementaire |
| LBC_FT | Lutte contre le Blanchiment et le Financement du Terrorisme |
| GOUV | Gouvernance, Risques et Contrôle |
| PT | Prix de Transfert |
| DATA | Protection des Données |
| IA | Intelligence Artificielle et RegTech |
| CYBER | Cybersécurité |
| FINTECH | FinTech et Innovation Financière |
| AUDIT | Audit et Contrôle |
| OHADA | Droit des Affaires Africain |
| METHOD | Méthodologies KHEPRA |

### Statuts contrôlés

| Statut | Définition |
|--------|-----------|
| **En vigueur** | Texte applicable et non modifié |
| **Révisé** | Texte modifié par un texte postérieur |
| **Abrogé** | Texte n'étant plus en vigueur (conservé pour référence) |
| **En projet** | Texte en cours d'élaboration, non encore adopté |
| **Historique** | Texte conservé pour valeur historique |

### Exemple de fiche de métadonnées

```yaml
Titre: Instruction BCEAO relative à la monnaie électronique dans l'UEMOA
Source: bceao.int
Auteur: BCEAO
Date: 2024-05-15
Pays: UEMOA (multi-pays)
Organisation: Banque Centrale des États de l'Afrique de l'Ouest
Domaine: REG_FIN
Sous-domaine: Monnaie_Electronique
Version: 1.0
Statut: En vigueur
Mots-clés:
  - monnaie électronique
  - émetteurs
  - e-money
  - services de paiement
  - fintech
  - UEMOA
  - BCEAO
  - inclusion financière
  - agrément
  - protection des fonds
Langue: FR
URL Source: https://www.bceao.int/fr/content/instruction-monnaie-electronique
Date Intégration: 2026-06-07
Dernière Vérification: 2026-06-07
Hash Document: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
Restrictions: Public
```

---

## 12. PROMPT SYSTÈME DU RAG

À intégrer comme couche intermédiaire entre le System Master Prompt et les Expert Agents.

### Instructions Système

```
=== KHEPRA REGULATORY RAG — SYSTEM INSTRUCTIONS ===

You are the KHEPRA Regulatory RAG layer — the document retrieval
engine that powers KHEPRA EXPERTS intelligence.

Before answering:

1. SEARCH KHEPRA Regulatory RAG.
   - Query the 15 libraries for relevant documents.
   - Match by domain, sous-domaine, mots-clés, juridiction.
   - Prioritize documents with statut "En vigueur".

2. PRIORITIZE official regulatory sources.
   - BCEAO, COBAC, CEMAC, UEMOA texts first.
   - Then GAFI, OCDE, Bâle, ISO standards.
   - Then national legislation.
   - Then doctrine and commentary.

3. PRIORITIZE KHEPRA methodologies.
   - For any audit, compliance, or diagnostic question,
     search 15_KHEPRA_METHODOLOGIES first.
   - Prefer KHEPRA internal frameworks over generic approaches.

4. CITE applicable references.
   - For every regulatory claim, provide: Titre, Source, Date, Statut.
   - Use the exact citation format from metadata.
   - If a text is abrogé, EXPLICITLY state so.

5. IDENTIFY risks.
   - Regulatory risk (non-conformité, sanctions).
   - Operational risk (mise en œuvre, délais).
   - Reputational risk (perception régulateur, marché).
   - Legal risk (contentieux, responsabilité).

6. PROVIDE actionable recommendations.
   - Recommendations must be:
     · Spécifiques (action concrète)
     · Priorisées (criticité)
     · Contextualisées (juridiction)
     · Réalistes (faisabilité)

7. APPLY Quality Controller (Module 10).
   - Score ≥ 9.5/10 before releasing any response.
   - Verify: réglementaire, institutionnel, rédactionnel,
     marketing, crédibilité.

8. GENERATE final response.
   - Structure conforme KHEPRA (§7.1 du Governance).
   - Langage institutionnel, précis, exploitable.
   - Clause de non-responsabilité si nécessaire.

If information is not in the RAG:
  "Cette information n'est pas disponible dans le corpus
   documentaire KHEPRA à ce stade. Une vérification auprès
   des sources officielles est recommandée."

If information is not verifiable:
  "Information non vérifiable à ce stade."

=== END RAG INSTRUCTIONS ===
```

---

## 13. GOUVERNANCE DU RAG

### Mise à Jour

| Fréquence | Action | Responsable |
|-----------|--------|-------------|
| Hebdomadaire | Veille réglementaire — identification nouveaux textes | Veille Stratégique |
| Mensuelle | Intégration des nouveaux documents dans le RAG | Responsable Knowledge |
| Trimestrielle | Vérification du statut des documents existants | Responsable Qualité |
| Semestrielle | Audit complet du RAG — exhaustivité, exactitude | Partner Governance |
| Annuelle | Mise à jour majeure — nouvelle version du RAG | Direction Générale |

### Contrôle Qualité

Chaque document entrant dans le RAG doit :

1. Être validé par un expert KHEPRA du domaine concerné
2. Être annoté avec les métadonnées complètes (§11)
3. Passer un contrôle d'intégrité (hash SHA-256)
4. Être classé dans la bibliothèque et sous-bibliothèque appropriées
5. Recevoir un score de pertinence (1-10) pour la priorisation de recherche

### Documents Refusés

Un document est refusé si :

- Source non identifiable ou non officielle
- Texte abrogé sans mention explicite d'abrogation
- Contenu manifestement erroné
- Document protégé par droit d'auteur sans autorisation
- Format non exploitable (image scannée non OCRisée, etc.)

---

## 14. INTÉGRATION DANS L'ARCHITECTURE KHEPRA

### Positionnement hiérarchique

```
Niveau 0 : KHEPRA CONSTITUTION
              ↓
Niveau 1 : SYSTEM MASTER PROMPT
              ↓
Niveau 2 : KHEPRA REGULATORY RAG  ← CE DOCUMENT
              ↓
Niveau 3 : EXPERT AGENTS
              ↓
Niveau 4 : QUALITY CONTROLLER
              ↓
Niveau 5 : UTILISATEUR
```

### Relations avec les autres documents

| Document | Relation |
|----------|----------|
| KHEPRA_CONSTITUTION.md | Norme suprême — le RAG y est subordonné |
| KHEPRA_SYSTEM_MASTER_PROMPT.md | Couche supérieure — dicte le protocole de génération |
| KHEPRA_KNOWLEDGE_BASE_ARCHITECTURE.md | Architecture connaissance — le RAG l'opérationnalise |
| ADMIN_KNOWLEDGE_BASE.md | Taxonomy détaillée — le RAG est l'implémentation concrète |
| KHEPRA_AI_GOVERNANCE.md | Framework d'application — le RAG y est référencé |

### Alimentation du RAG

```
ADMIN_KNOWLEDGE_BASE.md (Taxonomy 15 domaines)
        ↓
KHEPRA_KNOWLEDGE_BASE_ARCHITECTURE.md (Architecture 10 domaines)
        ↓
KHEPRA_RAG_REGULATOIRE.md (Structure 15 bibliothèques)
        ↓
KHEPRA-RAG-v1/ (Dépôt documentaire physique)
```

---

## 15. ROADMAP D'IMPLÉMENTATION

### Phase 1 — Fondations (S1-S2)
- [ ] Création du dépôt maître `KHEPRA-RAG-v1/`
- [ ] Création des 15 bibliothèques avec leurs sous-structures
- [ ] Définition du format de métadonnées (YAML sidecar)
- [ ] Script d'indexation initial

### Phase 2 — Alimentation Prioritaire (S3-S6)
- [ ] Intégration des textes BCEAO en vigueur (priorité haute)
- [ ] Intégration des textes COBAC en vigueur (priorité haute)
- [ ] Intégration des recommandations GAFI (priorité haute)
- [ ] Intégration des méthodologies KHEPRA existantes

### Phase 3 — Complétion (S7-S12)
- [ ] Intégration des textes OHADA
- [ ] Intégration des textes UEMOA et CEMAC
- [ ] Intégration des textes Prix de Transfert
- [ ] Intégration des standards IA et RegTech
- [ ] Intégration des études de cas anonymisées

### Phase 4 — Automatisation (S13+)
- [ ] Pipeline de veille automatisée
- [ ] Détection des textes abrogés
- [ ] Mise à jour automatique des métadonnées
- [ ] Intégration avec les Expert Agents

---

## 16. REGULATORY INTELLIGENCE HUB — Au-Delà du RAG Statique

> **Document lié** : [KHEPRA_REGULATOR_EXPECTATIONS.md](./KHEPRA_REGULATOR_EXPECTATIONS.md)

Le RAG est la mémoire statique. Le Regulatory Intelligence Hub en est le complément dynamique : un système de veille active qui suit en continu les évolutions des autorités pour détecter les signaux avant les clients.

### 16.1 Autorités sous surveillance active

| Autorité | Périmètre | Fréquence de scan | Responsable |
|----------|-----------|-------------------|-------------|
| **BCEAO** | Circulaires, instructions, avis, communiqués | Hebdomadaire | Partner Regulatory |
| **COBAC** | Règlements, décisions, sanctions, communiqués | Hebdomadaire | Partner Regulatory |
| **CIMA** | Règlements, décisions, agréments | Bimensuelle | Partner Compliance |
| **GIABA** | Évaluations mutuelles, rapports, typologies | Mensuelle | Partner LBC/FT |
| **GABAC** | Évaluations mutuelles, rapports, communiqués | Mensuelle | Partner LBC/FT |
| **GAFI** | Recommandations, guides, liste grise/noire | Mensuelle | Partner LBC/FT |
| **Autorités protection données** | Décisions, sanctions, recommandations | Mensuelle | Partner Data Privacy |
| **Organismes fiscaux (UEMOA/CEMAC)** | Directives, décisions, conventions | Mensuelle | Partner Tax |
| **Parquets financiers** | Enquêtes, poursuites, jurisprudence | Bimensuelle | Partner Compliance |

### 16.2 Pipeline de veille

```
[SOURCE OFFICIELLE] → BCEAO, COBAC, CIMA, GIABA, GAFI, etc.
        ↓
[SCAN AUTOMATISÉ] → Détection nouveaux textes, modifications, abrogations
        ↓
[ALERTE] → Notification Partner concerné (immédiat)
        ↓
[ANALYSE RAPIDE] → Synthèse 1 page : nature, impact, actions recommandées
        ↓
[INTÉGRATION RAG] → Document intégré au RAG avec métadonnées complètes
        ↓
[ALERTE CLIENT] → Si impact direct pour clients KHEPRA (optionnel)
        ↓
[PUBLICATION] → Si intérêt général : Note réglementaire, Article, Alerte
        ↓
[CAPITALISATION] → Fiche REG-OBS dans KHEPRA_REGULATOR_EXPECTATIONS
```

### 16.3 Détection des signaux faibles

Types de signaux à détecter avant qu'ils ne deviennent des évolutions majeures :

1. **Consultation publique** — Un régulateur lance une consultation → future réglementation
2. **Discours de gouverneur** — Annonce de priorités → futures circulaires
3. **Communiqué post-CPM** — Comité de Politique Monétaire → orientations stratégiques
4. **Rapport annuel** — Bilan et perspectives → priorités de supervision
5. **Sanction publiée** — Précédent → durcissement de la pratique
6. **Évaluation mutuelle** — Rapport GIABA/GABAC → zones de risque futures
7. **Projet de texte** — Circulation informelle → préparation anticipée
8. **Mission thématique** — Lancement par le régulateur → vagues d'inspection à venir

### 16.4 Fiche d'alerte — Format

```yaml
# ALERTE REGULATOIRE KHEPRA
Reference: ALERT-2026-001
Date_Detection: 2026-06-07
Source: [BCEAO | COBAC | CIMA | GIABA | GAFI | Autre]
Nature: [Nouveau texte | Modification | Abrogation | Consultation | Discours | Sanction]
Titre_Officiel: [Titre du document source]

# ANALYSE
Resume: >
  Synthèse de l'évolution en 3 phrases maximum.
Impact_KHEPRA: [Aucun | Faible | Modéré | Élevé | Critique]
Impact_Clients: [Aucun | Faible | Modéré | Élevé | Critique]
Secteurs_Concernes: [Liste des secteurs impactés]
Juridictions_Concernees: [Liste des juridictions]
Date_Effet: [AAAA-MM-JJ si applicable]
Delai_Conformite: [Délai de mise en conformité si applicable]

# ACTIONS KHEPRA
Action_Immediate: [Action à mener immédiatement]
Action_Court_Terme: [Action J+7 à J+30]
Action_Medium_Terme: [Action J+30 à J+90]
Responsable: [Partner désigné]
Publication_Recommandee: [Oui/Non — si oui, type de contenu]
```

### 16.5 Rythme de production

| Fréquence | Livrable | Audience |
|-----------|----------|----------|
| Immédiat (détection) | Alerte interne | Partner concerné |
| J+2 | Note d'analyse | Équipe KHEPRA |
| J+5 | Note réglementaire | Clients concernés (optionnel) |
| J+7 | Article blog | Public KhepraExperts.com |
| J+30 | Étude d'impact | Public + Lead Magnet |

### 16.6 Score de réactivité

Objectif : être le premier cabinet francophone africain à analyser chaque nouvelle réglementation majeure.

| Indicateur | Cible |
|-----------|-------|
| Délai détection → alerte interne | < 24h |
| Délai détection → analyse publiée | < 5 jours ouvrés |
| Taux de couverture des autorités | 100% |
| Signaux faibles identifiés/trimestre | 5+ |

---

## A. TABLE DE CORRESPONDANCE

| Bibliothèque RAG | Domaine Knowledge Base | Module Governance |
|------------------|----------------------|-------------------|
| 01_BCEAO | 01_Régulation, 09_BCEAO | Module 04 — Regulatory |
| 02_COBAC | 01_Régulation, 08_COBAC | Module 04 — Regulatory |
| 03_CIMA | 01_Régulation | Module 04 — Regulatory |
| 04_UEMOA | 01_Régulation, 06_UEMOA | Module 04 — Regulatory |
| 05_CEMAC | 01_Régulation, 07_CEMAC | Module 04 — Regulatory |
| 06_OHADA | 05_OHADA | Module 04 — Regulatory |
| 07_GAFI_GIABA | 02_AML_CFT | Module 04 — Regulatory |
| 08_PROTECTION_DONNEES | 10_Protection_Données | Module 04 — Regulatory |
| 09_PRIX_TRANSFERT | 03_Prix_Transfert | Module 04 — Regulatory |
| 10_GOUVERNANCE_RISQUES | 04_Gouvernance_Risques | Module 07 — Deliverable |
| 11_AUDIT_CONTROLE | 04_Gouvernance_Risques | Module 07 — Deliverable |
| 12_FINTECH | 01_Régulation | Module 04 — Regulatory |
| 13_IA_REGTECH | 11_Intelligence_Artificielle | Module 06 — Technology |
| 14_CYBERSECURITE | 12_Cybersécurité | Module 06 — Technology |
| 15_KHEPRA_METHODOLOGIES | 10_Méthodologies_KHEPRA | Modules 07, 08, 09 |

### Nouvelles bibliothèques dérivées

| Nouveau Document KHEPRA | Alimenté par | Usage |
|-------------------------|-------------|-------|
| KHEPRA_REGULATOR_EXPECTATIONS | RAG §16 + Veille | Attentes régulateurs |
| KHEPRA_INTELLECTUAL_CAPITAL | RAG §15 + Retours missions | Capitalisation savoir |
| KHEPRA_RISK_LIBRARY | RAG §1-14 + Expertise | Risques sectoriels |
| KHEPRA_DELIVERABLE_FACTORY | RAG §15 + Standards | Livrables modèles |
| KHEPRA_THOUGHT_LEADERSHIP | Tout le RAG | Contenu premium |
| KHEPRA_COMPETITIVE_INTELLIGENCE | Veille externe | Intelligence marché |

---

*Document validé par la Task Force Big Four — 07 Juin 2026*
*Prochaine revue programmée : 07 Septembre 2026*
*Roadmap d'implémentation : voir §15*