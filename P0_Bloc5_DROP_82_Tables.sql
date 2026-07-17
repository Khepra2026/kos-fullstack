-- ============================================================================
-- KOS BIG FOUR TABLE CLEANUP — DROP 82 TABLES VIDES
-- Bloc 5 Consolidation · 25 Juin 2026 · Mandat Managing Partner
-- ============================================================================
-- ⚠️ EXÉCUTER CE SCRIPT UNIQUEMENT APRÈS PG_DUMP COMPLET
-- ⚠️ VÉRIFIER LES DÉPENDANCES FK AVANT EXÉCUTION
-- ============================================================================

-- PHASE 1 — ARTIFACT TABLES (20 tables, fusionnées dans kos_artifacts)
DROP TABLE IF EXISTS artifact_agent_catalog CASCADE;
DROP TABLE IF EXISTS artifact_ai_governance CASCADE;
DROP TABLE IF EXISTS artifact_automation_blueprint CASCADE;
DROP TABLE IF EXISTS artifact_client_success CASCADE;
DROP TABLE IF EXISTS artifact_control_tower CASCADE;
DROP TABLE IF EXISTS artifact_data_governance CASCADE;
DROP TABLE IF EXISTS artifact_enterprise_architecture CASCADE;
DROP TABLE IF EXISTS artifact_enterprise_manual CASCADE;
DROP TABLE IF EXISTS artifact_executive_dashboard CASCADE;
DROP TABLE IF EXISTS artifact_knowledge_architecture CASCADE;
DROP TABLE IF EXISTS artifact_kpi_dictionary CASCADE;
DROP TABLE IF EXISTS artifact_maturity_model CASCADE;
DROP TABLE IF EXISTS artifact_pmo_framework CASCADE;
DROP TABLE IF EXISTS artifact_quality_management CASCADE;
DROP TABLE IF EXISTS artifact_roadmap CASCADE;
DROP TABLE IF EXISTS artifact_security_framework CASCADE;
DROP TABLE IF EXISTS artifact_seo_authority CASCADE;
DROP TABLE IF EXISTS artifact_sop_library CASCADE;
DROP TABLE IF EXISTS artifact_sre_framework CASCADE;
DROP TABLE IF EXISTS artifact_think_tank_factory CASCADE;
DROP TABLE IF EXISTS kos_artifacts CASCADE;

-- PHASE 2 — RÉGLEMENTAIRE VIDES (10 tables — schéma conservé dans regulations)
DROP TABLE IF EXISTS circulars CASCADE;
DROP TABLE IF EXISTS consultations CASCADE;
DROP TABLE IF EXISTS decisions CASCADE;
DROP TABLE IF EXISTS directives CASCADE;
DROP TABLE IF EXISTS instructions CASCADE;
DROP TABLE IF EXISTS regulatory_projects CASCADE;
DROP TABLE IF EXISTS regulatory_sources CASCADE;
DROP TABLE IF EXISTS regulatory_versions CASCADE;
DROP TABLE IF EXISTS sanctions CASCADE;
DROP TABLE IF EXISTS templates CASCADE;

-- PHASE 3 — LEARNING / TRAINING VIDES (7 tables)
DROP TABLE IF EXISTS certificates CASCADE;
DROP TABLE IF EXISTS lessons CASCADE;
DROP TABLE IF EXISTS lesson_progress CASCADE;
DROP TABLE IF EXISTS quiz_questions CASCADE;
DROP TABLE IF EXISTS training_materials CASCADE;
DROP TABLE IF EXISTS training_progress CASCADE;

-- PHASE 4 — YOUTUBE VIDES (5 tables)
DROP TABLE IF EXISTS kos_youtube_agents CASCADE;
DROP TABLE IF EXISTS kos_youtube_content_pipeline CASCADE;
DROP TABLE IF EXISTS kos_youtube_infrastructure_health CASCADE;
DROP TABLE IF EXISTS kos_youtube_security_logs CASCADE;
DROP TABLE IF EXISTS kos_youtube_workflows CASCADE;
DROP TABLE IF EXISTS youtube_scripts CASCADE;

-- PHASE 5 — RAG / VECTOR VIDES (3 tables)
DROP TABLE IF EXISTS rag_chunks CASCADE;
DROP TABLE IF EXISTS rag_citations CASCADE;
DROP TABLE IF EXISTS rag_metadata CASCADE;

-- PHASE 6 — WORKFLOW / ORCHESTRATION VIDES (5 tables)
DROP TABLE IF EXISTS workflow_execution CASCADE;
DROP TABLE IF EXISTS workflow_steps CASCADE;
DROP TABLE IF EXISTS pipeline_events CASCADE;
DROP TABLE IF EXISTS retry_history CASCADE;
DROP TABLE IF EXISTS failed_jobs CASCADE;

-- PHASE 7 — OPERATIONAL / BUSINESS VIDES (31 tables)
DROP TABLE IF EXISTS admin_notifications CASCADE;
DROP TABLE IF EXISTS admin_settings CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS api_keys CASCADE;
DROP TABLE IF EXISTS audit_programs CASCADE;
DROP TABLE IF EXISTS autonomous_pmo_v2 CASCADE;
DROP TABLE IF EXISTS dashboard_metrics CASCADE;
DROP TABLE IF EXISTS diagnostics CASCADE;
DROP TABLE IF EXISTS email_sequence_enrollments CASCADE;
DROP TABLE IF EXISTS enterprise_automation_factory CASCADE;
DROP TABLE IF EXISTS financial_advisory CASCADE;
DROP TABLE IF EXISTS industry_profiles CASCADE;
DROP TABLE IF EXISTS knowledge_captures CASCADE;
DROP TABLE IF EXISTS knowledge_graph CASCADE;
DROP TABLE IF EXISTS lead_activities CASCADE;
DROP TABLE IF EXISTS learning_modules CASCADE;
DROP TABLE IF EXISTS linkedin_snapshots CASCADE;
DROP TABLE IF EXISTS media_assets CASCADE;
DROP TABLE IF EXISTS oauth_audit_logs CASCADE;
DROP TABLE IF EXISTS orchestration_logs CASCADE;
DROP TABLE IF EXISTS organization_members CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;
DROP TABLE IF EXISTS policy_documents CASCADE;
DROP TABLE IF EXISTS procedures CASCADE;
DROP TABLE IF EXISTS proposal_drafts CASCADE;
DROP TABLE IF EXISTS proposals CASCADE;
DROP TABLE IF EXISTS public_sector_advisories CASCADE;
DROP TABLE IF EXISTS studio_media_requests CASCADE;
DROP TABLE IF EXISTS tool_completions CASCADE;
DROP TABLE IF EXISTS webhook_deliveries CASCADE;
DROP TABLE IF EXISTS webhook_endpoints CASCADE;

-- ============================================================================
-- TOTAL : 82 tables supprimées
-- Impact : 300 → ~218 tables (-82)
-- ============================================================================