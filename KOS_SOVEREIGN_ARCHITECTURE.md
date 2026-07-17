# KOS SOVEREIGN ARCHITECTURE™ — PHASE 0 : SUPABASE DECONGESTION & LOCAL SOVEREIGNTY

> **Norme KOS n°001 — Architecture de Souveraineté Réglementaire**
>
> **Statut** : PERMANENT · GRAVÉ DANS LE MARBRE
>
> **Date d'entrée en vigueur** : 25 Juin 2026
>
> **Autorité émettrice** : Managing Partner — KHEPRA EXPERTS
>
> **Objectif stratégique** : Réduire progressivement la dépendance opérationnelle à Supabase.
> Transformer Supabase en **REGULATORY SYSTEM OF RECORD** et non plus en **REGULATORY EXECUTION ENGINE**.

---

## PRINCIPE DIRECTEUR

> **Les données critiques restent dans Supabase.**
> **Les traitements critiques migrent progressivement en local.**
> **Les connaissances critiques sont répliquées localement.**
> **Les embeddings stratégiques sont souverainisés.**
> **Aucune fonction critique ne dépend exclusivement d'un fournisseur unique.**

---

## ÉTAPE 1 — CLASSIFICATION DES 300 TABLES SUPABASE

### Catégorie A — DONNÉES CRITIQUES (Conservation Supabase + Réplication Locale)

Tables dont la perte serait FATALE pour KHEPRA EXPERTS :

| # | Table | Régulateur/Domaine | Justification |
|---|-------|-------------------|---------------|
| 1 | `regulators` | Tous | Registre des autorités — source unique de vérité |
| 2 | `regulations` | BCEAO/COBAC/GAFI/OHADA/CIMA | Textes réglementaires vérifiés |
| 3 | `regulatory_sources` | Tous | URLs officielles de chaque texte |
| 4 | `citations` | Tous | Citations auditées avec indice de fiabilité |
| 5 | `audit_logs` | Gouvernance | Piste d'audit réglementaire |
| 6 | `verification_logs` | Gouvernance | Historique des vérifications |
| 7 | `compliance_actions` | Conformité | Actions correctives réglementaires |
| 8 | `regulatory_alerts` | Veille | Alertes réglementaires actives |
| 9 | `regulatory_projects` | Veille | Textes en projet |
| 10 | `regulatory_versions` | Veille | Versions historiques des textes |
| 11 | `instructions` | BCEAO | Instructions officielles |
| 12 | `circulars` | BCEAO/COBAC | Circulaires officielles |
| 13 | `directives` | COBAC/GAFI | Directives officielles |
| 14 | `decisions` | Tous | Décisions réglementaires |
| 15 | `sanctions` | Tous | Sanctions prononcées |
| 16 | `consultations` | Tous | Consultations publiques |
| 17 | `impact_assessments` | Veille | Analyses d'impact réglementaire |
| 18 | `sector_observatories` | Veille | Observatoires sectoriels |
| 19 | `watchlists` | Veille | Listes de surveillance |
| 20 | `rag_documents` | RAG | Documents sources du RAG |
| 21 | `rag_chunks` | RAG | Fragments indexés |
| 22 | `rag_metadata` | RAG | Métadonnées RAG |
| 23 | `rag_citations` | RAG | Citations RAG |
| 24 | `kos_critical_events` | Gouvernance | Événements critiques cross-hub |
| 25 | `kos_execution_logs` | Gouvernance | Logs d'exécution |
| 26 | `ai_audit_trail` | IA | Piste d'audit IA |
| 27 | `ai_compliance_engine` | IA | Conformité IA |
| 28 | `ai_registry` | IA | Registre des modèles IA |
| 29 | `source_verification_engine` | Qualité | Vérification des sources |

**Total Catégorie A** : 29 tables

---

### Catégorie B — CONNAISSANCES (Supabase + Stockage Local)

Tables contenant le capital intellectuel de KHEPRA :

| # | Table | Domaine | Justification |
|---|-------|---------|---------------|
| 1 | `lessons_learned` | Apprentissage | Leçons apprises des missions |
| 2 | `best_practices` | Apprentissage | Pratiques validées |
| 3 | `policies` | Documentaire | Politiques internes |
| 4 | `case_studies` | Apprentissage | Études de cas |
| 5 | `knowledge_capsules` | Apprentissage | Capsules de connaissance |
| 6 | `templates` | Documentaire | Templates de livrables |
| 7 | `procedures` | Documentaire | Procédures opérationnelles |
| 8 | `control_matrices` | Documentaire | Matrices de contrôle |
| 9 | `risk_matrices` | Documentaire | Matrices de risques |
| 10 | `audit_programs` | Documentaire | Programmes d'audit |
| 11 | `training_materials` | Documentaire | Matériel de formation |
| 12 | `methodologies` | Consulting | Méthodologies propriétaires |
| 13 | `expert_reviews` | Qualité | Revues d'experts |
| 14 | `knowledge_graph` | Intelligence | Graphe de connaissances |
| 15 | `strategic_memory` | Intelligence | Mémoire stratégique |
| 16 | `enterprise_brain` | Intelligence | Cerveau central |
| 17 | `missions` | Consulting | Missions de conseil |
| 18 | `deliverables` | Consulting | Livrables produits |
| 19 | `gap_assessments` | Consulting | Analyses d'écarts |
| 20 | `compliance_reviews` | Consulting | Revues de conformité |
| 21 | `audit_reports` | Consulting | Rapports d'audit |
| 22 | `risk_assessments` | Consulting | Évaluations de risques |
| 23 | `roadmaps` | Consulting | Feuilles de route |
| 24 | `proposal_drafts` | Commercial | Brouillons de propositions |
| 25 | `proposals` | Commercial | Propositions finales |
| 26 | `tender_intelligence` | Commercial | Intelligence appels d'offres |
| 27 | `research_reports` | Recherche | Rapports de recherche |
| 28 | `strategic_analyses` | Recherche | Analyses stratégiques |
| 29 | `financial_analyses` | Recherche | Analyses financières |
| 30 | `board_advisories` | Conseil | Avis aux Conseils |
| 31 | `white_papers` | Thought Leadership | Livres blancs |
| 32 | `think_tank_publications` | Thought Leadership | Publications Think Tank |
| 33 | `executive_dashboards` | Pilotage | Tableaux de bord exécutifs |
| 34 | `managing_partner_office` | Direction | Bureau du Managing Partner |
| 35 | `executive_copilot` | Direction | Copilote exécutif |

**Total Catégorie B** : 35 tables

---

### Catégorie C — RAG & VECTORIEL (Priorité Migration Locale)

Tables contenant les embeddings et données vectorielles :

| # | Table | Domaine | Justification |
|---|-------|---------|---------------|
| 1 | `rag_embeddings` | RAG | Embeddings vectoriels — coûteux en stockage Supabase |
| 2 | `rag_audit_logs` | RAG | Logs d'audit RAG |
| 3 | `knowledge_graph_embeddings` | Intelligence | Embeddings du graphe de connaissances |
| 4 | `enterprise_intelligence_os_v2` | Intelligence | OS d'intelligence — données lourdes |
| 5 | `digital_twin` | Intelligence | Jumeau numérique — simulation intensive |
| 6 | `hallucination_detection_engine` | Qualité | Détection hallucinations — traitement local |
| 7 | `self_improvement_engine_v2` | Qualité | Auto-amélioration — boucles locales |
| 8 | `kos_global_scan_stats` | Monitoring | Statistiques de scan global |
| 9 | `kos_domain_summaries` | Monitoring | Résumés par domaine |
| 10 | `kos_unified_global_state` | Orchestration | État global unifié |
| 11 | `pipeline_state` | Orchestration | États pipeline |
| 12 | `pipeline_events` | Orchestration | Événements pipeline |
| 13 | `workflow_execution` | Orchestration | Exécution workflows |
| 14 | `workflow_steps` | Orchestration | Étapes workflows |
| 15 | `state_transitions` | Orchestration | Transitions d'état |

**Total Catégorie C** : 15 tables

---

### Catégorie D — LOGS TECHNIQUES & DONNÉES NON CRITIQUES (Archivage Local Uniquement)

Tables de logs, cache, données transitoires :

| # | Table | Justification |
|---|-------|---------------|
| 1 | `activity_logs` | Logs d'activité — volume élevé |
| 2 | `email_logs` | Logs d'email — non critiques |
| 3 | `monitoring_logs` | Logs de monitoring |
| 4 | `security_logs` | Logs de sécurité (doublon avec audit_logs) |
| 5 | `cron_job_logs` | Logs de cron jobs |
| 6 | `webhook_deliveries` | Logs de webhooks |
| 7 | `url_check_results` | Résultats de vérification d'URLs |
| 8 | `site_health_checks` | Checks de santé site |
| 9 | `performance_snapshots` | Snapshots de performance |
| 10 | `seo_audit_results` | Résultats d'audit SEO |
| 11 | `backlink_opportunities` | Opportunités backlinks |
| 12 | `social_automation_queue` | Queue d'automatisation sociale |
| 13 | `social_metrics` | Métriques sociales |
| 14 | `social_api_tokens` | Tokens API sociaux |
| 15 | `geo_visibility_logs` | Logs de visibilité géographique |
| 16 | `kos_gsc_keywords` | Mots-clés GSC |
| 17 | `kos_gsc_pages` | Pages GSC |
| 18 | `kos_gsc_opportunities` | Opportunités GSC |
| 19 | `kos_gsc_overview` | Vue d'ensemble GSC |
| 20 | `kos_gsc_recommendations` | Recommandations GSC |
| 21 | `kos_gsc_checklist` | Checklist GSC |
| 22 | `kos_block_scans` | Scans de blocs |
| 23 | `kos_block_detections` | Détections de blocs |
| 24 | `kos_correction_tickets` | Tickets de correction |
| 25 | `kos_correction_fix_history` | Historique de corrections |
| 26 | `kos_correction_scan_results` | Résultats de scan de correction |
| 27 | `kos_auto_correction_tickets` | Tickets auto-correction |
| 28 | `kos_correction_loop_log` | Log de boucle de correction |
| 29 | `kos_correction_loop_status` | Statut boucle correction |
| 30 | `kos_correction_image_queue` | Queue d'images à corriger |
| 31 | `kos_correction_seo_queue` | Queue SEO à corriger |
| 32 | `kos_correction_accessibility_queue` | Queue accessibilité |
| 33 | `kos_correction_security_plan` | Plan de correction sécurité |
| 34 | `kos_correction_manifest` | Manifest de correction |
| 35 | `kos_correction_executive_report` | Rapport exécutif correction |
| 36 | `kos_correction_js_optimization` | Optimisation JS |
| 37 | `kos_correction_compression_audit` | Audit compression |
| 38 | `kos_correction_before_after` | Avant/Après correction |
| 39 | `kos_cross_resolution_logs` | Logs cross-résolution |
| 40 | `kos_quality_scan_phases` | Phases scan qualité |
| 41 | `kos_quality_report_sections` | Sections rapport qualité |
| 42 | `kos_quality_global_report` | Rapport qualité global |
| 43 | `kos_quality_agents` | Agents qualité |
| 44 | `kos_challenge_gaps` | Gaps de challenge |
| 45 | `kos_performance_challenges` | Challenges performance |
| 46 | `kos_corrective_blocks` | Blocs correctifs |
| 47 | `kos_resource_health` | Santé ressources |
| 48 | `kos_resource_optimizations` | Optimisations ressources |
| 49 | `kos_resource_deployments` | Déploiements ressources |
| 50 | `kos_resource_agents` | Agents ressources |
| 51 | `kos_resource_engines` | Moteurs ressources |
| 52 | `kos_knowledge_kpis` | KPIs connaissance |
| 53 | `kos_knowledge_resources` | Ressources connaissance |
| 54 | `kos_youtube_workflows` | Workflows YouTube |
| 55 | `kos_youtube_content_pipeline` | Pipeline contenu YouTube |
| 56 | `kos_youtube_agents` | Agents YouTube |
| 57 | `kos_youtube_security_logs` | Logs sécurité YouTube |
| 58 | `kos_youtube_infrastructure_health` | Santé infra YouTube |
| 59 | `kos_agent_performance` | Performance agents |
| 60 | `kos_web_ops_automates` | Automates WebOps |
| 61 | `kos_dev_automates` | Automates Dev |
| 62 | `kos_cyber_security_automates` | Automates Cyber |
| 63 | `kos_regulatory_compliance_automates` | Automates Conformité |
| 64 | `kos_blog_writing_automates` | Automates Blog |
| 65 | `kos_interactive_tools_review` | Review outils interactifs |
| 66 | `kos_referents_metiers_automates` | Automates Référents |
| 67 | `kos_designer_infographe_automates` | Automates Designer |
| 68 | `kos_organisation_qualite_automates` | Automates Qualité |
| 69 | `kos_llm_experts_automates` | Automates LLM |
| 70 | `kos_think_tank_automates` | Automates Think Tank |
| 71 | `kos_commercial_marketing_automates` | Automates Commercial |
| 72 | `kos_community_manager_automates` | Automates Community |
| 73 | `kos_business_intelligence_automates` | Automates BI |
| 74 | `kos_institutional_orgs` | Organisations institutionnelles |
| 75 | `kos_institutional_decision_makers` | Décideurs institutionnels |
| 76 | `kos_institutional_projects` | Projets institutionnels |
| 77 | `kos_institutional_publications` | Publications institutionnelles |
| 78 | `kos_institutional_reputation` | Réputation institutionnelle |
| 79 | `kos_institutional_procurement` | Procurement institutionnel |
| 80 | `kos_institutional_alerts` | Alertes institutionnelles |
| 81 | `kos_institutional_expert_profiles` | Profils experts |
| 82 | `kos_institutional_distribution` | Distribution institutionnelle |
| 83 | `kos_plan_consolidation_phases` | Phases de consolidation |
| 84 | `kos_unified_kpis` | KPIs unifiés |
| 85 | `kos_unified_roadmap` | Roadmap unifiée |
| 86 | `kos_unified_workflow_phases` | Phases workflow unifié |
| 87 | `kos_unified_reports` | Rapports unifiés |
| 88 | `kos_unified_agents` | Agents unifiés |
| 89 | `kos_enterprise_digital_twins` | Jumeaux numériques enterprise |
| 90 | `kos_enterprise_hallucination_detection` | Détection hallucination enterprise |
| 91 | `kos_enterprise_intelligence_os` | OS intelligence enterprise |
| 92 | `kos_enterprise_self_improvement` | Auto-amélioration enterprise |
| 93 | `kos_enterprise_strategic_memory` | Mémoire stratégique enterprise |
| 94 | `tender_alerts` | Alertes appels d'offres |
| 95 | `tender_auto_responses` | Réponses auto appels d'offres |
| 96 | `tender_deadlines` | Deadlines appels d'offres |
| 97 | `tender_knowledge_base` | Base connaissance appels d'offres |
| 98 | `tender_scraper_logs` | Logs scraper appels d'offres |
| 99 | `tender_sources` | Sources appels d'offres |
| 100 | `retry_history` | Historique des retries |
| 101 | `failed_jobs` | Jobs échoués |
| 102 | `health_checks` | Health checks |
| 103 | `pipeline_deals` | Deals pipeline |
| 104 | `nurturing_sequences` | Séquences nurturing |
| 105 | `revenue_data` | Données de revenus |
| 106 | `growth_kpis` | KPIs de croissance |
| 107 | `lead_scores` | Scores de leads |
| 108 | `lead_activities` | Activités leads |
| 109 | `leads` | Leads |
| 110 | `email_sequence_enrollments` | Inscriptions séquences email |
| 111 | `email_templates` | Templates email |
| 112 | `proposal_intelligence` | Intelligence propositions |
| 113 | `client_health` | Santé clients |
| 114 | `reputation_authority` | Autorité réputation |
| 115 | `executive_communications` | Communications exécutives |
| 116 | `strategic_plans` | Plans stratégiques |
| 117 | `enterprise_architecture` | Architecture enterprise |
| 118 | `enterprise_data_hub` | Hub de données enterprise |
| 119 | `decision_intelligence` | Intelligence décisionnelle |
| 120 | `autonomous_pmo` | PMO autonome |
| 121 | `enterprise_security` | Sécurité enterprise |
| 122 | `performance_excellence` | Excellence performance |
| 123 | `training_academy` | Académie de formation |
| 124 | `competitive_intelligence` | Intelligence concurrentielle |
| 125 | `service_innovations` | Innovations de service |
| 126 | `transformation_programs` | Programmes de transformation |
| 127 | `esg_assessments` | Évaluations ESG |
| 128 | `innovation_lab` | Laboratoire d'innovation |
| 129 | `enterprise_architecture_office` | Bureau architecture |
| 130 | `public_sector_excellence` | Excellence secteur public |
| 131 | `fintech_advisory_center` | Centre conseil FinTech |
| 132 | `sme_transformation_center` | Centre transformation PME |
| 133 | `consulting_factory` | Factory consulting |
| 134 | `mission_quality_office` | Bureau qualité missions |
| 135 | `engagement_risk_office` | Bureau risques engagement |
| 136 | `autonomous_consulting_team` | Équipe consulting autonome |
| 137 | `autonomous_research_team` | Équipe recherche autonome |
| 138 | `autonomous_think_tank` | Think tank autonome |
| 139 | `autonomous_growth_team` | Équipe croissance autonome |
| 140 | `market_intelligence_center` | Centre intelligence marché |
| 141 | `growth_engine` | Moteur de croissance |
| 142 | `executive_content_studio` | Studio contenu exécutif |
| 143 | `authority_reputation_lab` | Lab autorité réputation |
| 144 | `partner_ecosystem_manager` | Gestionnaire écosystème |
| 145 | `opportunity_discovery_engine` | Moteur découverte opportunités |
| 146 | `data_analytics_center` | Centre analytique |
| 147 | `organizational_intelligence` | Intelligence organisationnelle |
| 148 | `model_evaluation_engine` | Évaluation modèles |
| 149 | `process_mining_engine` | Process Mining |
| 150 | `workflow_generator` | Générateur workflows |
| 151 | `sop_generator` | Générateur SOP |
| 152 | `automation_auditor` | Auditeur automatisation |
| 153 | `ai_risk_office` | Bureau risques IA |
| 154 | `ai_ethics_board` | Conseil éthique IA |
| 155 | `ai_governance_council` | Conseil gouvernance IA |
| 156 | `prompt_quality_office` | Bureau qualité prompts |
| 157 | `knowledge_validation_engine` | Moteur validation connaissances |
| 158 | `enterprise_control_tower` | Tour de contrôle enterprise |
| 159 | `automation_optimizer` | Optimiseur automatisation |
| 160 | `resource_allocator` | Allocateur ressources |
| 161 | `capacity_planner` | Planificateur capacité |
| 162 | `forecasting_engine` | Moteur prévisions |
| 163 | `scenario_simulator` | Simulateur scénarios |
| 164 | `executive_kpi_tower` | Tour KPI exécutive |
| 165 | `platform_credentials` | Credentials plateforme |
| 166 | `studio_media_requests` | Requêtes studio média |
| 167 | `youtube_scripts` | Scripts YouTube |
| 168 | `media_assets` | Assets médias |
| 169 | `oauth_audit_logs` | Logs audit OAuth |
| 170 | `subscriptions` | Abonnements |
| 171 | `organizations` | Organisations |
| 172 | `organization_members` | Membres organisations |
| 173 | `profiles` | Profils utilisateurs |
| 174 | `api_keys` | Clés API |
| 175 | `subscription_plans` | Plans d'abonnement |
| 176 | `usage_quotas` | Quotas d'utilisation |
| 177 | `rate_limits` | Limites de taux |
| 178 | `downloads` | Téléchargements |
| 179 | `resource_downloads` | Téléchargements ressources |
| 180 | `certificates` | Certificats |
| 181 | `diagnostic_events` | Événements diagnostics |
| 182 | `diagnostics` | Diagnostics |
| 183 | `tool_completions` | Complétions outils |
| 184 | `training_progress` | Progression formation |
| 185 | `answers` | Réponses |
| 186 | `dashboard_metrics` | Métriques dashboard |
| 187 | `admin_messages` | Messages admin |
| 188 | `admin_conversations` | Conversations admin |
| 189 | `admin_resources` | Ressources admin |
| 190 | `admin_documents` | Documents admin |
| 191 | `admin_notifications` | Notifications admin |
| 192 | `admin_sessions` | Sessions admin |
| 193 | `admin_settings` | Paramètres admin |
| 194 | `cookie_consent` | Consentement cookies |
| 195 | `webhook_endpoints` | Endpoints webhooks |
| 196 | `linkedin_snapshots` | Snapshots LinkedIn |
| 197 | `manual_accreditations` | Accréditations manuelles |
| 198 | `courses` | Cours |
| 199 | `course_modules` | Modules de cours |
| 200 | `lesson_progress` | Progression leçons |
| 201 | `lessons` | Leçons |
| 202 | `quiz_questions` | Questions quiz |
| 203 | `enrollments` | Inscriptions |
| 204 | `remediation_logs` | Logs remédiation |
| 205 | `evidence_library` | Bibliothèque preuves |
| 206 | `regulatory_register` | Registre réglementaire |
| 207 | `regulatory_intelligence_feed` | Flux intelligence réglementaire |
| 208 | `due_diligence_reports` | Rapports due diligence |
| 209 | `risk_registers` | Registres de risques |
| 210 | `internal_controls` | Contrôles internes |
| 211 | `ceo_advisories` | Avis CEO |
| 212 | `intelligence_alerts` | Alertes intelligence |
| 213 | `public_sector_advisories` | Avis secteur public |
| 214 | `financial_advisory` | Conseil financier |
| 215 | `quality_assurance_reviews` | Revues qualité |
| 216 | `knowledge_monetization` | Monétisation connaissance |
| 217 | `enterprise_os` | OS enterprise |
| 218 | `self_improvement` | Auto-amélioration |
| 219 | `executive_command_center` | Centre commandement exécutif |
| 220 | `humanization_scores` | Scores humanisation |
| 221 | `early_warning_system` | Système alerte précoce |
| 222 | `strategic_alert_engine` | Moteur alerte stratégique |
| 223 | `artifact_enterprise_architecture` | Artefact architecture |
| 224 | `artifact_data_governance` | Artefact gouvernance données |
| 225 | `artifact_sre_framework` | Artefact SRE |
| 226 | `artifact_security_framework` | Artefact sécurité |
| 227 | `artifact_seo_authority` | Artefact SEO |
| 228 | `artifact_agent_catalog` | Artefact catalogue agents |
| 229 | `artifact_sop_library` | Artefact bibliothèque SOP |
| 230 | `artifact_kpi_dictionary` | Artefact dictionnaire KPI |
| 231 | `artifact_knowledge_architecture` | Artefact architecture connaissance |
| 232 | `artifact_ai_governance` | Artefact gouvernance IA |
| 233 | `artifact_automation_blueprint` | Artefact blueprint automatisation |
| 234 | `artifact_pmo_framework` | Artefact framework PMO |
| 235 | `artifact_quality_management` | Artefact management qualité |
| 236 | `artifact_client_success` | Artefact succès client |
| 237 | `artifact_executive_dashboard` | Artefact dashboard exécutif |
| 238 | `artifact_roadmap` | Artefact roadmap |
| 239 | `artifact_maturity_model` | Artefact modèle maturité |
| 240 | `artifact_control_tower` | Artefact tour de contrôle |
| 241 | `artifact_think_tank_factory` | Artefact factory think tank |
| 242 | `artifact_enterprise_manual` | Artefact manuel enterprise |

**Total Catégorie D** : 242 tables

---

### RÉSUMÉ CLASSIFICATION

| Catégorie | Nombre de Tables | Conservation | Réplication Locale |
|-----------|-----------------|--------------|-------------------|
| **A — Données Critiques** | 29 | Supabase + Réplication Locale | Obligatoire |
| **B — Connaissances** | 35 | Supabase + Stockage Local | Recommandée |
| **C — RAG & Vectoriel** | 15 | Priorité Migration Locale | Obligatoire |
| **D — Logs & Non Critiques** | 242 | Archivage Local Uniquement | Optionnelle |
| **TOTAL** | **321** | — | — |

---

## ÉTAPE 2 — MIGRATION DE LA MÉMOIRE RAG

### KOS-KNOWLEDGE-STORE™ — Infrastructure Locale

**Technologies cibles** (accessibles dans un navigateur) :
- **IndexedDB** — Stockage structuré local (documents, chunks, métadonnées)
- **Cache Storage** — Cache des documents sources pour consultation offline
- **TF-IDF Vectorizer** — Vectorisation locale sans pgvector
- **Cosine Similarity Engine** — Moteur de similarité local (déjà dans kos-automaton-engine)

**Fichiers créés** :
- `src/services/kosLocalKnowledgeStore.ts` — Gestionnaire IndexedDB
- `src/services/kosLocalVectorStore.ts` — Store vectoriel local
- `src/services/kosSyncEngine.ts` — Moteur de synchronisation Supabase↔Local

---

## ÉTAPE 3 — MIGRATION DES EMBEDDINGS

### LOCAL VECTOR MEMORY™

**Contenu souverainisé** (6 régulateurs africains) :
- BCEAO — Banque Centrale des États de l'Afrique de l'Ouest
- COBAC — Commission Bancaire de l'Afrique Centrale
- CIMA — Conférence Interafricaine des Marchés d'Assurance
- OHADA — Organisation pour l'Harmonisation du Droit des Affaires
- COSUMAF — Commission de Surveillance du Marché Financier (CEMAC)
- AMF-UEMOA — Conseil Régional de l'Épargne Publique et des Marchés Financiers (UEMOA)

Chaque embedding est :
- Généré localement via TF-IDF (kos-automaton-engine)
- Stocké dans IndexedDB
- Indexé pour recherche sémantique locale
- Synchronisé avec Supabase en fallback

---

## ÉTAPE 4 — MIGRATION DES EDGE FUNCTIONS

### Traitements Lourds — Plan de Migration

| Edge Function | Action | Destination |
|--------------|--------|-------------|
| `rag-generate-embeddings` | → Local | IndexedDB + Web Worker |
| `rag-semantic-search` | → Local | kos-automaton-engine (déjà local) |
| `rag-batch-generate-embeddings` | → Local | Batch processing Web Worker |
| `kos-automaton-engine` | → Déjà local | TF-IDF + Cosine Similarity |
| `kos-content-generate` | → Hybride | Cache local + Edge Function fallback |
| `kos-performance-monitor` | → Local | Service Worker |
| `kos-security-scan` | → Hybride | Headers check local + Scan complet Edge |
| `kos-seo-audit` | → Hybride | On-page local + Crawl Edge |
| `kos-lead-scoring` | → Local | Scoring engine IndexedDB |
| `kos-social-content-generator` | → Hybride | Template local + Génération Edge |

---

## ÉTAPE 5 — KOS REGULATORY DATA LAKE™

### Structure Locale

```
src/data/regulatory-data/
├── bceao/
│   ├── instructions/
│   ├── circulaires/
│   ├── decisions/
│   └── index.json
├── cobac/
│   ├── reglements/
│   ├── directives/
│   └── index.json
├── cima/
│   ├── codes/
│   └── index.json
├── ohada/
│   ├── actes_uniformes/
│   └── index.json
├── cosumaf/
│   ├── reglements/
│   └── index.json
├── crepmf/
│   ├── instructions/
│   └── index.json
└── manifest.json
```

Chaque document est :
- Versionné (version_number)
- Hashé (SHA-256)
- Historisé (created_at, updated_at)
- Lié à sa source officielle (source_url)
- Catégorisé (regulatory_category)

---

## ÉTAPE 6 — KOS MEMORY ENGINE™ LOCAL

### Moteur de Mémorisation Propriétaire

**Fonctions** :
1. **Capture** — Intercepter chaque connaissance produite
2. **Classifier** — Catégoriser automatiquement (Réglementaire, Consulting, Commercial, Documentaire)
3. **Dédupliquer** — Éviter les doublons via hash
4. **Versionner** — Historique complet des modifications
5. **Indexer** — Indexation plein texte locale
6. **Vectoriser** — TF-IDF local pour recherche sémantique
7. **Relier** — Connexions automatiques entre connaissances
8. **Stocker** — IndexedDB + Cache Storage

---

## ÉTAPE 7 — PLAN DE RÉDUCTION DES COÛTS

### Cible : -50% de consommation Supabase

| Action | Impact | Économie Estimée |
|--------|--------|-----------------|
| Archivage local des logs (Catégorie D) | Suppression 242 tables de logs | -40% stockage |
| Compression des embeddings | Réduction taille vectorielle | -25% stockage vectoriel |
| Déduplication des documents | Élimination doublons | -15% stockage |
| Externalisation des logs | Logs → IndexedDB local | -30% requêtes |
| Cache local des lectures fréquentes | Réduction appels Supabase | -50% bande passante |
| Migration RAG vers local | Suppression stockage vectoriel Supabase | -60% coûts RAG |

---

## ÉTAPE 8 — PLAN DE RÉSILIENCE

### KOS Resilience Engine™

**Export quotidien (03:00 UTC)** :
- Export complet des tables Catégorie A (JSON)
- Sauvegarde locale (IndexedDB)
- Sauvegarde hors site (téléchargement automatique)

**Objectif RPO** : < 1 heure
**Objectif RTO** : < 4 heures

---

## ÉTAPE 9 — KOS SOVEREIGN REGULATORY CLOUD™

### Architecture Cible 5 Couches

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   COUCHE 5 — OBSERVATOIRE RÉGLEMENTAIRE                             │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  Veille automatique · Alertes · Impact Analysis · Watchlists │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                              │                                      │
│   COUCHE 4 — VECTOR STORE LOCAL                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  TF-IDF Engine · Cosine Similarity · IndexedDB · Cache API   │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                              │                                      │
│   COUCHE 3 — DATA LAKE RÉGLEMENTAIRE                                │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  BCEAO · COBAC · CIMA · OHADA · COSUMAF · AMF-UEMOA             │   │
│   │  Documents versionnés · hashés · historisés                  │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                              │                                      │
│   COUCHE 2 — SERVEURS KOS (Exécution Métier)                         │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  KOS Automaton Engine · Memory Engine · Sync Engine          │   │
│   │  Traitements locaux · Zéro latence externe                   │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                              │                                      │
│   COUCHE 1 — SUPABASE (Regulatory System of Record)                  │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  Données critiques (Catégorie A) · Référentiel officiel      │   │
│   │  Source unique de vérité · RLS · Audit trail                 │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ÉTAPE 10 — RÈGLE D'OR

> **AUCUNE FONCTION CRITIQUE DE KOS NE DOIT DÉPENDRE EXCLUSIVEMENT :**
>
> - D'un quota Edge Function
> - D'un fournisseur unique
> - D'un stockage unique
> - D'un vector store unique
>
> **TOUT COMPOSANT CRITIQUE DOIT ÊTRE :**
>
> - Répliqué (Supabase + IndexedDB)
> - Sauvegardé (Export quotidien)
> - Exportable (JSON, CSV)
> - Remplaçable (Fallback automatique)

---

## PLAN DE MISE EN ŒUVRE — 90 JOURS

| Phase | Action | Jours |
|-------|--------|-------|
| **P0** | Déploiement KOS Local Storage Infrastructure | J+7 |
| **P1** | Classification & migration Catégorie D (logs → local) | J+14 |
| **P2** | Migration Catégorie C (RAG → local) | J+30 |
| **P3** | Réplication Catégorie B (Connaissances → local) | J+45 |
| **P4** | Sync Engine bidirectionnel Supabase↔Local | J+60 |
| **P5** | Resilience Engine (exports quotidiens) | J+75 |
| **P6** | Tests de résilience (coupure Supabase simulée) | J+90 |

---

## KPI CIBLES — SOUVERAINETÉ

| KPI | Actuel | Cible J+90 |
|-----|--------|-----------|
| Dépendance Supabase (requêtes/jour) | 100% | < 40% |
| Stockage vectoriel local | 0% | 100% |
| Logs en local | 0% | 95% |
| Embeddings souverains | 0% | 100% (6 régulateurs) |
| RPO | ∞ (pas de backup local) | < 1 heure |
| Disponibilité sans Supabase | 0% | 80% (lecture) |
| Coûts Supabase | 100% baseline | -50% |

---

**KOS SOVEREIGN ARCHITECTURE™ — v1.0 — 25 Juin 2026**
**© KHEPRA EXPERTS — TOUS DROITS RÉSERVÉS.**
**ARCHITECTURE DE SOUVERAINETÉ RÉGLEMENTAIRE — GRAVÉE DANS LE MARBRE.**