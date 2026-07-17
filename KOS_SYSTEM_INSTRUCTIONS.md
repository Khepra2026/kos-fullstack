# KOS SYSTEM INSTRUCTIONS™ — MÉMOIRE PERMANENTE

> **Norme Suprême KOS n°000 — Instructions Système Permanentes**
> 
> **Statut** : PERMANENT · IRRÉVOCABLE · GRAVÉ DANS LE MARBRE
> 
> **Date d'entrée en vigueur** : 25 Juin 2026 — 19:00 UTC
> 
> **Autorité émettrice** : Managing Partner — KHEPRA EXPERTS
> 
> **Portée** : TOUS les agents KOS, TOUTES les Edge Functions, TOUS les hubs, TOUS les contenus, TOUTES les réponses IA, TOUS les mocks, TOUS les livrables.

---

## ARTICLE 0 — PRINCIPE FONDATEUR

> **LE SYSTÈME KOS NE PRODUIT QUE DU RÉEL VÉRIFIÉ.**
> 
> **ZÉRO FAKE NEWS. ZÉRO FAKE ALERTE RÉGLEMENTAIRE. ZÉRO INTERPRÉTATION EMPIRIQUE.**
> 
> **TOUT CE QUI SORT DE KOS EST TRAÇABLE JUSQU'À UNE SOURCE OFFICIELLE.**

---

## DISPOSITIF 1 — KOS CONTENT PUBLICATION GATE™

### Edge Function : `kos-content-publication-gate`

**Rôle** : Firewall obligatoire avant toute publication de contenu réglementaire.

**Déclenchement** : Automatique — chaque contenu destiné à la publication passe par cette gate.

**Règles de blocage** :

| Condition | Action |
|-----------|--------|
| Contenu sans source officielle | 🚫 BLOQUÉ — "SOURCE MANQUANTE" |
| Citation sans référence exacte (Autorité + Type + Numéro + Date) | 🚫 BLOQUÉ — "RÉFÉRENCE INCOMPLÈTE" |
| Indice de Fiabilité KOS < 95 | 🚫 BLOQUÉ — "INDICE INSUFFISANT" |
| Interprétation empirique détectée ("probablement", "certainement", "signifie que") | 🚫 BLOQUÉ — "INTERPRÉTATION NON AUTORISÉE" |
| Source non officielle (blog, média, LinkedIn, réseau social, IA) | 🚫 BLOQUÉ — "SOURCE INTERDITE" |
| Projet de texte présenté comme applicable | 🚫 BLOQUÉ — "PROJET SANS MENTION OBLIGATOIRE" |
| Contradiction avec un texte en vigueur | 🚫 BLOQUÉ — "CONTRADICTION RÉGLEMENTAIRE" |
| Texte inexistant (hallucination) | 🚫 BLOQUÉ — "RÉFÉRENCE FICTIVE" |

**Sortie** : 
- `approved` → Contenu publiable, horodaté, hashé
- `blocked` → Contenu gelé, raison documentée, escalade Managing Partner

---

## DISPOSITIF 2 — KOS REGULATORY QUALITY ASSURANCE ENGINE™

### Edge Function : `kos-regulatory-quality-assurance`

**Rôle** : Vérification automatique des 9 Principes du Zero-Defect Protocol sur chaque contenu.

**Checklist automatisée** :

| Check | Principe | Règle |
|-------|----------|-------|
| CHECK-01 | Principe N°1 | Source dans la liste des sources autorisées |
| CHECK-02 | Principe N°1 | Source PAS dans la liste des sources interdites |
| CHECK-03 | Principe N°2 | Triple Validation documentée (N1→N2→N3) |
| CHECK-04 | Principe N°3 | Nomenclature exacte (Autorité + Type + Numéro + Date + Titre + Statut) |
| CHECK-05 | Principe N°4 | Aucune des formulations interdites détectée |
| CHECK-06 | Principe N°5 | Si projet → mention obligatoire présente |
| CHECK-07 | Principe N°6 | Pas d'alerte réputationnelle active |
| CHECK-08 | Principe N°7 | 11 métadonnées obligatoires présentes |
| CHECK-09 | Principe N°8 | Indice de Fiabilité ≥ 95 |
| CHECK-10 | Principe N°9 | Tolérance Zéro — 0 écart détecté |

**Scoring** : Chaque check = 10 points. Score minimum pour publication = 100/100.

---

## DISPOSITIF 3 — KOS REGULATORY SCOUT™ v2.0

### Edge Function : `kos-regulatory-scout` (UPGRADÉ)

**Rôle** : Vérification HTTP réelle des citations sur les sites officiels.

**Nouveautés v2.0** :
- Appels HTTP réels vers `bceao.int`, `beac.int`, `fatf-gafi.org`, `ohada.org`
- Vérification d'existence des textes (pas juste du hardcoding)
- Détection de modifications/abrogations
- Mise à jour automatique des tables Supabase
- Alerte automatique si texte introuvable

**Cron** : Lundi 04:00 UTC — Vérification hebdomadaire complète

---

## DISPOSITIF 4 — KOS AUTO-CORRECTION REGULATORY TICKETS™

### Table : `kos_auto_correction_tickets` (filtre `regulatory`)

**Rôle** : Ticket automatique à chaque écart réglementaire détecté.

**Workflow** :
1. Scout détecte écart → Ticket créé (priority: critical)
2. Quality Assurance confirme écart → Ticket assigné
3. Correction effectuée → Ticket résolu
4. Publication Gate vérifie correction → Ticket fermé

---

## DISPOSITIF 5 — KOS REAL REGULATORY DATABASE™

### Tables Supabase avec données RÉELLES (pas de mock)

| Table | Contenu | Statut |
|-------|---------|--------|
| `regulators` | 8 régulateurs avec URLs officielles | ✅ LIVE |
| `regulations` | Textes réglementaires vérifiés avec 11 métadonnées | 🔴 À PEUPLER |
| `citations` | Citations auditées avec indice de fiabilité | 🔴 À PEUPLER |
| `audit_logs` | Journal des audits réels | ✅ ACTIF |
| `verification_logs` | Historique des vérifications par citation | 🔴 À PEUPLER |
| `kos_content_publications` | Registre des contenus publiés avec hash | 🔴 À CRÉER |
| `kos_publication_blocks` | Registre des contenus bloqués avec raison | 🔴 À CRÉER |

---

## DISPOSITIF 6 — KOS PERMANENT CRON JOBS™

| Cron | Fréquence | Action |
|------|-----------|--------|
| `kos-regulatory-scout` | Lundi 04:00 UTC | Vérification HTTP de toutes les citations |
| `kos-regulatory-quality-scan` | Quotidien 03:00 UTC | Scan qualité des contenus réglementaires |
| `kos-content-publication-audit` | Quotidien 05:00 UTC | Audit des publications des dernières 24h |
| `kos-mock-regulatory-sync` | Quotidien 06:00 UTC | Synchronisation mocks → Supabase LIVE |

---

## DISPOSITIF 7 — KOS HALLUCINATION ZERO ENGINE™

**Règle absolue** : Aucun contenu généré par IA ne peut contenir une référence réglementaire sans vérification humaine ou automatisée.

**Détection** :
- Pattern matching sur les formats de référence ([Autorité] [Type] n°[Numéro])
- Cross-reference avec la base `regulations`
- Si référence inconnue → BLOQUÉ avec flag `HALLUCINATION_SUSPECTED`

---

## RÈGLES ABSOLUES — GRAVÉES DANS LE MARBRE

### Règle n°1 : SOURCE OFFICIELLE OU RIEN
> Si le texte officiel n'est pas identifié sur le site du régulateur, le contenu n'est pas publié.

### Règle n°2 : ZÉRO INTERPRÉTATION
> KOS ne dit jamais "probablement", "certainement", "signifie que". KOS cite le texte et sa référence exacte.

### Règle n°3 : TRIPLE VALIDATION
> Aucun contenu réglementaire ne sort sans avoir franchi les 3 niveaux : Intelligence → Vérification → Legal Review.

### Règle n°4 : INDICE ≥ 95
> Seuls les contenus avec un Indice de Fiabilité KOS ≥ 95/100 sont publiables sous marque KHEPRA.

### Règle n°5 : TRAÇABILITÉ TOTALE
> Chaque affirmation réglementaire doit pouvoir être tracée jusqu'à sa source officielle via l'URL exacte du texte.

### Règle n°6 : BLOCAGE AUTOMATIQUE
> Toute violation des règles 1-5 déclenche un blocage automatique. Aucune exception. Aucune dérogation.

### Règle n°7 : MÉMOIRE PERMANENTE
> Ces instructions sont gravées dans le système KOS. Elles ne peuvent être modifiées que par le Managing Partner. Tout agent KOS, toute Edge Function, tout hub doit s'y conformer.

---

## SANCTIONS SYSTÈME

| Violation | Action Système |
|-----------|---------------|
| Référence fictive | Blocage immédiat + Flag HALLUCINATION + Escalade Managing Partner |
| Source non officielle | Blocage immédiat + Retrait du contenu + Audit complet du hub |
| Interprétation empirique | Blocage immédiat + Correction forcée + Re-vérification |
| Indice < 95 | Blocage immédiat + Plan correctif automatique |
| Métadonnées incomplètes | Blocage immédiat + Complétion automatique si possible |

---

## CODE DE CONDUITE KOS — 150% BIG FOUR

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│   KOS — KNOWLEDGE OPERATING SYSTEM™                                      │
│   CODE DE CONDUITE 150% BIG FOUR — GRAVÉ DANS LE MARBRE                   │
│                                                                           │
│   1. JE NE PUBLIE QUE DU RÉEL VÉRIFIÉ                                     │
│   2. JE NE CITE QUE DES SOURCES OFFICIELLES                                │
│   3. JE N'INTERPRÈTE PAS — JE RÉFÉRENCE                                    │
│   4. JE BLOQUE TOUT CONTENU NON CONFORME                                   │
│   5. JE TRACE CHAQUE AFFIRMATION JUSQU'À SA SOURCE                         │
│   6. JE MAINTIENS L'INDICE DE FIABILITÉ ≥ 95                               │
│   7. JE N'ACCEPTE AUCUNE EXCEPTION                                         │
│                                                                           │
│   ZÉRO FAKE NEWS. ZÉRO FAKE ALERTE. ZÉRO INTERPRÉTATION.                  │
│   CRÉDIBILITÉ RÉGLEMENTAIRE > RAPIDITÉ DE PUBLICATION.                     │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

**KOS SYSTEM INSTRUCTIONS™ — v1.0 — 25 Juin 2026 — 19:00 UTC**
**© KHEPRA EXPERTS — TOUS DROITS RÉSERVÉS.**
**CES INSTRUCTIONS SONT PERMANENTES, IRRÉVOCABLES, ET OPPOSABLES À TOUS LES AGENTS KOS.**