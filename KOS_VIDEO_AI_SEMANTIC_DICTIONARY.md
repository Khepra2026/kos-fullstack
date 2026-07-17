# KOS — MANIFESTE DE RÉORGANISATION SÉMANTIQUE
## Architecture Core Data & Connaissances — Pipeline Monétisation Haute Valeur KHEPRA EXPERTS

**Version**: 3.0.0 — RÉORGANISATION BU + PIPELINE KBR  
**Date**: 28 Juin 2026  
**Architecte**: KOS Core Data & Knowledge System  
**Statut**: 🟢 MONÉTISATION ACTIVÉE — 4 BU · 3 Niveaux · 2 Workflows · KBR Model  
**Contrainte**: Zéro nouvelle table — Zéro nouvelle edge function

---

## I. HIÉRARCHIE DES 4 BUSINESS UNITS (PRIORITÉ ABSOLUE)

| BU | Nom | Priorité | Domaine | Concept Ancre |
|----|-----|:---:|---------|--------------|
| **BU 1** | Régulation Financière & Conformité | 🔴 **Absolue** | Bouclier réglementaire, Banques, Assurances, UEMOA/CEMAC | `Concept_Regulation_BCEAO` (ID 60) |
| **BU 2** | Observatoire Gouvernance & Due Diligence | 🟠 Haute | Performance Boards, Conflits, Audits pré-acquisition | `Concept_Audit_Board_Gouvernance` (ID 61) |
| **BU 3** | Climat, Transition & ESG | 🟡 Haute | Ingénierie décarbonation, Valorisation actifs industriels | `Concept_Asset_Carbon_Risk` (ID 62) |
| **BU 4** | KBR-Model & Intelligence d'Affaires | 🟢 Stratégique | Articles Premium, Études sectorielles payantes, Monétisation PI | `Concept_Etude_Sectorielle_Premium` (ID 63) |

---

## II. PIPELINE ULTRA-LEAD MAGNETS (MAPPING BIG FOUR)

### II.1 TB_CONCEPTS → `knowledge_graph` — 10 nouveaux concepts (IDs 60-69)

| ID | Concept | Type | Rôle |
|----|---------|------|------|
| 60 | Concept_Regulation_BCEAO | bu_anchor | Ancre BU1 — Scoring conformité, bouclier réglementaire |
| 61 | Concept_Audit_Board_Gouvernance | bu_anchor | Ancre BU2 — Performance Board, due diligence |
| 62 | Concept_Asset_Carbon_Risk | bu_anchor | Ancre BU3 — Risque carbone, décarbonation |
| 63 | Concept_Etude_Sectorielle_Premium | bu_anchor | Ancre BU4 — PI, KBR, articles payants |
| 64 | Concept_Lead_Magnet_Scoring | scoring_rule | Moteur scoring 4 axes (Régulation/Gouvernance/Carbone/Intelligence) |
| 65 | Concept_Access_Level_1_Public | access_rule | Niveau 1 — Public/Lead Magnet (gratuit, capture email) |
| 66 | Concept_Access_Level_2_Premium | access_rule | Niveau 2 — Premium Payant (paiement unique/abonnement) |
| 67 | Concept_Access_Level_3_High_Ticket | access_rule | Niveau 3 — High-Ticket Consulting (mission conseil) |
| 68 | Concept_Non_Conformite | trigger_rule | Déclencheur upsell automatique |
| 69 | Concept_KBR_Revenue_Model | business_model | Pipeline complet Lead Magnet → Mission High-Ticket |

**Payload Lead Magnet Scoring** (ID 64):
```json
{
  "axes": {
    "regulation": {"weight": 35, "concept_id": 60},
    "gouvernance": {"weight": 30, "concept_id": 61},
    "carbone": {"weight": 25, "concept_id": 62},
    "intelligence": {"weight": 20, "concept_id": 63}
  },
  "seuils": {"cold": 30, "warm": 55, "hot": 75},
  "actions": {
    "cold": "lead_magnet_generic",
    "warm": "rapport_personnalise",
    "hot": "consultation_offerte"
  }
}
```

**Payload Pipeline KBR** (ID 69):
```json
{
  "pipeline": {
    "etape1": "lead_magnet_capture",
    "etape2": "scoring_qualification",
    "etape3": "rapport_personnalise",
    "etape4": "consultation_offerte",
    "etape5": "mission_high_ticket"
  },
  "conversion_targets": {
    "lead_to_mql": 0.40,
    "mql_to_sql": 0.25,
    "sql_to_mission": 0.15
  }
}
```

### II.2 TB_RESOURCES → `rag_documents` + `rag_metadata` — Segmentation 3 Niveaux

#### 📗 LEVEL 1 — Public / Ultra-Lead Magnet (gratuit, capture email)

| Contenu | Monétisation |
|---------|-------------|
| Résumés exécutifs (Executive Summaries) | Capture email → Lead Magnet |
| Simulateurs de scores | Capture email → Diagnostic |
| Aperçus d'articles | Teaser → Upsell Premium |
| Vidéos teasers @KHEPRAEXPERTS | Abonnement chaîne → Conversion |

**Documents existants tagués LEVEL_1**: Tous les documents `est_public = true` (réglementaires BCEAO, COBAC, OHADA, IFRS, ISO...)

#### 📘 LEVEL 2 — Premium Payant (paiement unique ou abonnement)

| Titre | Type | BU | Prix |
|-------|------|----|------|
| Étude Sectorielle Premium — Banques UEMOA : Conformité 2026-2028 | etude_sectorielle_premium | BU1 | 2 500 EUR |
| Monographie — Gouvernance des Boards en zone CEMAC : Benchmark 2026 | monographie_sectorielle | BU2 | 1 800 EUR |
| Rapport ESG — Exposition Carbone des Industries Africaines 2026 | rapport_thematique | BU3 | 3 200 EUR |
| Note de Conjoncture — Fintech UEMOA : Régulation et Opportunités Q3 2026 | note_conjoncture | BU4 | 950 EUR |

#### 📕 LEVEL 3 — High-Ticket Consulting (sur devis, confidentiel)

| Titre | Type | BU |
|-------|------|-----|
| Rapport d'Audit Privé — Cartographie des Risques Réglementaires Banque A (anonymisé) | rapport_audit_prive | BU1 |
| Cartographie des Risques de Gouvernance — Groupe Industriel Panafricain (anonymisé) | cartographie_risque | BU2 |
| Plan de Décarbonation — Site Industriel Côte d'Ivoire (anonymisé) | plan_correctif | BU3 |

### II.3 TB_RELATIONS — Graphe Lead Magnet Funnel

```
┌──────────────────────────────────────────────────────────────────────┐
│                     LEAD MAGNET FUNNEL KHEPRA                         │
└──────────────────────────────────────────────────────────────────────┘

  Concept_Regulation_BCEAO (60) ──→ Concept_Non_Conformite (68)
       │                                    │
  Concept_Audit_Board (61) ────────→        │
       │                                    ▼
  Concept_Asset_Carbon (62) ──→ Concept_Lead_Magnet_Scoring (64)
       │                                    │
       └────────────────────────────────────┤
                                            ▼
                              ┌─────────────────────────┐
                              │ 3 SEUILS DE CONVERSION  │
                              │ Cold (<30) → Magnet     │
                              │ Warm (30-55) → Rapport  │
                              │ Hot (>55) → Consultation│
                              └────────────┬────────────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    ▼                      ▼                      ▼
          Access_Level_1 (65)    Access_Level_2 (66)    Access_Level_3 (67)
          Public/Gratuit         Premium Payant         High-Ticket
                    │                      │                      │
                    ▼                      ▼                      ▼
          Concept_Etude_Sectorielle_Premium (63) ←─── Concept_KBR_Revenue_Model (69)
```

**Liaison d'Accès**: `Resource_Prospect` → Inscription → `Resource_Lead_Magnet_UEMOA` (Niveau 1)  
**Liaison de Recommandation**: Lead Magnet révèle faille → `Concept_Non_Conformite` → Push vers `Resource_Etude_Sectorielle_BU4` (Niveau 2/3)

### II.4 TB_ACTIVITIES → `orchestration_logs` — Workflows d'Automatisation

| Mission Type | Agent Lead | Rôle |
|-------------|-----------|------|
| `activity_generate_express_report` | KOS_Lead_Magnet_Scoring_Engine | Reçoit inputs prospect → interroge TB_CONCEPTS → calcule score → génère PDF → stocke TB_RESOURCES |
| `activity_paywall_verification` | KOS_Paywall_Gatekeeper | Vérifie token accès → valide achat/abonnement → autorise/refuse accès Level 2/3 |

**Pipeline Express Report** (6 étapes):
1. `receive_prospect_inputs` — Capture données formulaire lead magnet
2. `query_TB_CONCEPTS_scoring` — Interroge les 4 ancres BU pour scoring
3. `calculate_risk_score` — Calcule score pondéré 4 axes
4. `generate_personalized_pdf` — Génère rapport PDF personnalisé
5. `store_in_TB_RESOURCES` — Stocke dans rag_documents (Level 1)
6. `send_email_with_report` — Envoie email avec lien + upsell CTA

**Pipeline Paywall Verification** (5 étapes):
1. `verify_access_token` — Vérifie validité jeton
2. `check_purchase_status` — Vérifie statut achat
3. `validate_subscription_tier` — Valide niveau abonnement
4. `grant_or_deny_access` — Autorise ou refuse accès
5. `log_access_event` — Enregistre événement accès

---

## III. NETTOYAGE TERMINOLOGIQUE

| Terme obsolète (Académique) | Terme cible (Business/Consulting) |
|---------------------------|----------------------------------|
| Cours | Insight / Étude de cas |
| Module | Rapport de conformité |
| Leçon | Analyse sectorielle |
| Apprenant | Décideur / Board Member |
| Formation | Diagnostic / Accompagnement |

**Alignement vidéo**: Chaque ressource textuelle Level 1 (Lead Magnet) et Level 2 (Étude payante) est taguée pour génération automatique de Shorts/Podcasts via le pipeline OpusClip/Colossyan existant → alimentation chaîne @KHEPRAEXPERTS.

**Scripts youtube tagués comme teasers**:
- ID 1 (COBAC 2027) → teaser BU1, cta: diagnostic_gratuit
- ID 5 (GAFI 2026) → teaser BU1, cta: diagnostic_gratuit
- ID 10 (Gouvernance SFD UEMOA) → teaser BU4, cta: premium_upsell
- ID 11 (Souveraineté technologique) → teaser BU4, cta: premium_upsell

---

## IV. INVENTAIRE FINAL — 28 JUIN 2026

| Couche Big Four | Table | Entités | Détail |
|----------------|-------|:---:|-------|
| **TB_CONCEPTS** | knowledge_graph | 60 | +10 nouveaux (BU anchors, scoring, access, KBR) |
| **TB_RESOURCES** | rag_documents | 110 | +7 nouveaux (4 Premium + 3 High-Ticket) |
| **TB_METADATA** | rag_metadata | 15 | +7 tagués access_level (4 L2 + 3 L3) |
| **TB_ACTIVITIES** | orchestration_logs | 15 | +2 nouveaux (Express_Report + Paywall) |
| **TB_SCRIPTS** | youtube_scripts | 7 | +4 tagués teasers monétisation |

### Graphe Sémantique Complet

```
knowledge_graph (60 entités)
├── BU1 (ID 60) ──→ Non_Conformite (68) ──→ Scoring (64)
├── BU2 (ID 61) ──→ Non_Conformite (68) ──→ Scoring (64)
├── BU3 (ID 62) ──→ Non_Conformite (68) ──→ KBR_Model (69)
├── BU4 (ID 63) ──→ Access_L2 (66) + Access_L3 (67) + KBR_Model (69)
├── Scoring (64) ──→ 3 Seuils → 3 Access Levels (65/66/67)
├── KBR_Model (69) ──→ Pipeline 5 étapes Lead→Mission
└── Non_Conformite (68) ──→ Push Premium + High-Ticket

rag_documents (110 entités)
├── LEVEL 1: ~100 docs publics → Lead Magnets (gratuit, capture email)
├── LEVEL 2: 4 docs Premium → Paiement unique (950-3200 EUR)
└── LEVEL 3: 3 docs High-Ticket → Mission conseil (sur devis)

youtube_scripts (7 entités)
└── 4 tagués teasers → pointent vers Level 2 Premium

orchestration_logs (15 entités)
├── Express_Report: Pipeline scoring → PDF personnalisé (6 étapes)
├── Paywall_Verification: Contrôle accès Level 2/3 (5 étapes)
└── 3 pipelines vidéo + 10 missions consulting
```

---

## V. PROCHAINES ACTIONS OPÉRATIONNELLES

### ✅ Complétées (28 Juin 2026)

1. **✅ Réorganisation 4 Business Units** — Hiérarchie BU1>BU2>BU3>BU4 injectée dans knowledge_graph
2. **✅ Segmentation 3 Niveaux** — Documents tagués Level 1/2/3 dans rag_metadata avec prix et BU
3. **✅ Lead Magnet Funnel** — Graphe sémantique complet: Prospect → Scoring → Non_Conformite → Premium/High-Ticket
4. **✅ Workflows Monétisation** — Express_Report + Paywall_Verification initialisés dans orchestration_logs
5. **✅ Nettoyage Terminologique** — Aucun terme académique résiduel; terminologie alignée Business/Consulting
6. **✅ Vidéos Teaser** — Scripts youtube tagués comme hooks de monétisation pointant vers Premium

### 🔜 Prochaines étapes

1. **Brancher le frontend Lead Magnet** — Créer la page de capture avec formulaire → scoring → rapport personnalisé
2. **Activer Stripe pour le Paywall** — Configurer les paiements pour les documents Level 2
3. **Dashboard KBR Analytics** — Tableau de bord de suivi du pipeline Lead→MQL→SQL→Mission

---

**Zéro nouvelle table. Zéro nouvelle edge function. 100% infrastructure KOS existante.**
**Système basculé de logique académique → logique Monétisation PI & Intelligence d'Affaires (Modèle KBR).**