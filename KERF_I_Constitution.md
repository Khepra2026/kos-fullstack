# KERF Volume I : KOS Enterprise AI Constitution v1.0

**Classification : Big Four Grade | ISO/IEC 42001:2023 | ISO/IEC 27001:2022**
**Repository : kos-regtech-platform | Organization : KHEPRA EXPERTS**
**Date : 5 Juillet 2026**

---

## Préambule

KOS n'est pas un simple moteur RAG ni un assistant conversationnel. KOS est un **Cognitive Operating System** spécialisé dans la gouvernance, la réglementation, le risque, l'audit et l'aide à la décision pour les marchés financiers africains (UEMOA, CEMAC, OHADA). Cette Constitution établit les principes non-négociables qui gouvernent l'ensemble du système.

Toute violation des Red Lines de cette Constitution est bloquante. Le pipeline s'arrête immédiatement.

---

## Article 1 : Souveraineté Totale

1.1 **Zéro appel API externe autorisé en production.** Toute l'intelligence est embarquée dans PostgreSQL + pgvector + Edge Functions auto-hébergées.

1.2 L'embedding est généré par `kos_generate_embedding_internal_v4()`, une fonction 100% PostgreSQL qui utilise un dictionnaire de 75+ mots-clés métier Big Four (UEMOA, BCEAO, COBAC, OHADA, GAFI, IFRS, LCBFT, ISO 27001/42001).

1.3 La recherche est hybride : vectorielle (HNSW, 45%) + full-text search avec unaccent (40%) + metadata régulateur (15%). Aucune dépendance à un service tiers.

1.4 **Data residency** : Toutes les données sont stockées dans l'infrastructure Supabase, zone EU/Africa.

**ISO 42001 Control : 5.2 — AI Policy | ISO 27001 Control : A.8.2 — Data Classification**

---

## Article 2 : Explicabilité par Design

2.1 Toute réponse produite par le système contient un `reasoning_trace[]` complet, documentant chaque agent mobilisé, chaque étape du cycle cognitif, et la latence de chaque étape.

2.2 Score de confiance inférieur à 0.3 → réponse automatiquement remplacée par "Aucune source vérifiée trouvée pour cette requête."

2.3 Chaque citation doit inclure : `regulator` + `title` + `url` + `score` + `hash`. Aucune affirmation sans source.

2.4 Séparation systématique : faits établis / analyses / hypothèses / recommandations. Chaque section est clairement identifiée.

**ISO 42001 Control : 8.2 — Data Quality | ISO 42001 Control : B.7.2 — Explainability**

---

## Article 3 : Audit Immuable

3.1 Chaque requête → enregistrement dans `kos_audit_trail` avec hash SHA-256. La table est immutable (INSERT only, pas d'UPDATE/DELETE).

3.2 Les logs sont conservés 7 ans minimum, chiffrés AES-256, protégés par Row Level Security (RLS).

3.3 Chaque enregistrement d'audit référence les contrôles ISO 27001 (`A.8.24`, `A.12.4.1`) et ISO 42001 (`5.2`, `6.1.2`, `8.2`, `9.3`) applicables.

3.4 Hash chain ininterrompue : chaque événement référence le hash de l'événement précédent. Genesis hash : `0x000...000`.

**ISO 27001 Control : A.12.4.1 — Event Logging | ISO 42001 Control : 9.3 — Monitoring**

---

## Article 4 : Big Four Grade

Le label "Big Four Grade" est accordé uniquement si les conditions suivantes sont simultanément satisfaites :

4.1 **Confiance** : Score de confiance ≥ 0.9 sur l'ensemble du pipeline.
4.2 **Couverture** : ≥ 95% des sources réglementaires pertinentes indexées et recherchables.
4.3 **Performance** : P95 de latence < 500ms pour toute requête.
4.4 **Dédoublonnage** : 1 hash de contenu = 1 source unique. Aucun document dupliqué dans la base.
4.5 **Citations vérifiées** : 100% des citations traçables à un document source dans `kb_docs`.

**ISO 42001 Control : 6.1.2 — AI Risk Assessment**

---

## Article 5 : Red Lines — Tolérance Zéro

Ces règles sont vérifiées à chaque exécution du pipeline. Toute violation est **bloquante** :

| ID | Règle | Vérification | Sévérité |
|----|-------|-------------|----------|
| RED-001 | NO_EXTERNAL_LLM | Aucune clé OpenAI/Anthropic/Google configurée | BLOCKING |
| RED-002 | NO_HALLUCINATION | Score de confiance ≥ 0.3 | BLOCKING |
| RED-003 | NO_PII_LEAK | Aucune donnée personnelle identifiable dans les réponses | BLOCKING |
| RED-004 | NO_EXTERNAL_API | `external_api_calls` = 0 dans chaque audit trail | BLOCKING |

---

## Article 6 : Kill Switch

6.1 La variable d'environnement `KOS_EMERGENCY_SHUTDOWN=true` désactive immédiatement tous les agents IA.

6.2 Le kill switch peut également être activé côté client via `window.__KOS_EMERGENCY_SHUTDOWN__ = true`.

6.3 Tout agent qui tente de s'exécuter sous kill switch actif reçoit une `ConstitutionViolation` bloquante.

**ISO 42001 Control : 5.2 — Human Oversight**

---

## Article 7 : Modèle d'Analyse 11 Rubriques

Toute analyse réglementaire produite par KOS-COS suit la structure suivante :

1. **Contexte** — Situation, enjeux, périmètre
2. **Cadre Réglementaire** — Textes applicables, versions, autorités
3. **Constats** — Faits observés, données objectives
4. **Analyse** — Interprétation, mise en perspective
5. **Risques** — Identification et qualification
6. **Opportunités** — Leviers identifiés
7. **Options Envisageables** — Alternatives avec avantages/inconvénients
8. **Recommandations** — Actions proposées, priorisées
9. **Priorités** — Urgence, impact, séquencement
10. **Références** — Sources complètes et vérifiables
11. **Limites** — Ce que l'analyse ne couvre pas, incertitudes

---

## Article 8 : Cycle Cognitif 11 Étapes

Le cycle de raisonnement KOS-COS suit obligatoirement ces étapes :

1. 🎯 Compréhension de l'intention
2. 🔍 Qualification du contexte
3. 🧩 Décomposition du problème
4. 👥 Identification des domaines d'expertise
5. 📚 Recherche documentaire multi-couche (5 couches mémoire)
6. 📊 Évaluation de la qualité des sources
7. 📝 Synthèse argumentée (11 rubriques)
8. ✅ Contrôle qualité interne (8 KPIs)
9. 📄 Production du livrable
10. 💾 Capitalisation des connaissances
11. 📋 Journalisation de la décision

---

## Article 9 : Mémoire Cognitive 5 Couches

| Couche | Table | Contenu | Exemples |
|--------|-------|---------|----------|
| Réglementaire | `kos_memory_regulatory` | Textes applicables, obligations, versions | BCEAO, COBAC, OHADA, GAFI |
| Méthodologique | `kos_memory_methodological` | Cadres, référentiels, matrices | COSO, ISO 31000, IFRS, NIST |
| Sectorielle | `kos_memory_sectoral` | Spécificités par industrie | Banque, Microfinance, Fintech, ESG |
| Jurisprudentielle | `kos_memory_jurisprudential` | Décisions, doctrines, interprétations | Sanctions, lignes directrices |
| Opérationnelle | `kos_memory_operational` | Rapports, missions, REX | Enseignements, KPIs, incidents |

---

## Article 10 : Système d'Évaluation 8 KPIs

Chaque réponse est évaluée sur 8 dimensions, avec scoring 0-100 :

1. **Précision** — Exactitude factuelle des informations
2. **Pertinence** — Adéquation à la requête
3. **Exhaustivité** — Couverture complète du sujet
4. **Cohérence** — Absence de contradictions internes
5. **Traçabilité** — Chaque affirmation liée à une source
6. **Qualité des Références** — Sources primaires, autoritaires
7. **Clarté** — Lisibilité, structure, langage
8. **Valeur Ajoutée** — Apport au-delà de la simple restitution

---

## Article 11 : Gouvernance IA

11.1 Le Centre d'Excellence (`kos_center_excellence`) supervise les méthodologies, les référentiels et les critères qualité.

11.2 Les règles de gouvernance (`kos_ai_governance_rules`) couvrent : qualité des données, gestion des versions, traçabilité, droits d'accès, contrôles humains, sécurité, confidentialité.

11.3 Chaque évolution du système est versionnée et tracée dans `kos_agent_prompt_versions`.

---

## Mise en Œuvre Technique

### TypeScript (Frontend/Edge)

```typescript
import { assertConstitution, validateSLO } from '@/lib/kosConstitution';
import { KOSAgentOrchestrator } from '@/services/kosAgentOrchestratorSDK';

const orchestrator = new KOSAgentOrchestrator(userId);
const response = await orchestrator.execute({
  query: 'conditions agrément SFD BCEAO',
  lang: 'fr',
  maxDocs: 10,
});
// response.metadata.constitution.compliant === true
// response.metadata.slo.compliant === true
// response.metadata.auditTrailId !== null
```

### PostgreSQL (Database)

```sql
-- Vérifier la couverture réglementaire
SELECT regulator, COUNT(*) FROM kb_docs WHERE is_active = true GROUP BY regulator;

-- Vérifier l'intégrité de la chaîne d'audit
SELECT session_id, result_hash, external_api_calls FROM kos_audit_trail 
WHERE external_api_calls > 0; -- Doit retourner 0 ligne

-- Vérifier le kill switch
SELECT current_setting('kos.emergency_shutdown', true); -- Doit être 'false'
```

---

## Signatures

| Rôle | Nom | Date |
|------|-----|------|
| Architecte Principal | KOS-Executive-Orchestrator | 2026-07-05 |
| Quality Gatekeeper | KOS-QA Agent | 2026-07-05 |
| Governance Officer | KOS-Gouvernance Agent | 2026-07-05 |

---

**Version : 1.0.0 | Classification : CONFIDENTIEL | Distribution : Interne KHEPRA**
**Prochaine revue : Q4 2026**