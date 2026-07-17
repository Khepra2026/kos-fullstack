-- ============================================================================
-- KOS P0 BLOC 5 — SUPPRESSION 48 TABLES CATÉGORIE C
-- Généré le 25 Juin 2026
-- ⚠️ EXÉCUTER DANS LE SQL EDITOR SUPABASE (Dashboard → SQL Editor)
-- ⚠️ VÉRIFIER CHAQUE TABLE AVANT SUPPRESSION DÉFINITIVE
-- ============================================================================

-- Pré-requis: Backup complet exécuté (pg_dump ou Supabase backup)
-- Voir: PRA_Test_Results/ pour le dernier backup testé

-- Phase 1 — Artifacts fusionnés dans kos_artifacts
DROP TABLE IF EXISTS artifact_enterprise_architecture CASCADE;
DROP TABLE IF EXISTS artifact_data_governance CASCADE;
DROP TABLE IF EXISTS artifact_sre_framework CASCADE;
DROP TABLE IF EXISTS artifact_security_framework CASCADE;
DROP TABLE IF EXISTS artifact_seo_authority CASCADE;
DROP TABLE IF EXISTS artifact_agent_catalog CASCADE;
DROP TABLE IF EXISTS artifact_sop_library CASCADE;
DROP TABLE IF EXISTS artifact_kpi_dictionary CASCADE;
DROP TABLE IF EXISTS artifact_knowledge_architecture CASCADE;
DROP TABLE IF EXISTS artifact_ai_governance CASCADE;
DROP TABLE IF EXISTS artifact_automation_blueprint CASCADE;
DROP TABLE IF EXISTS artifact_pmo_framework CASCADE;
DROP TABLE IF EXISTS artifact_quality_management CASCADE;
DROP TABLE IF EXISTS artifact_client_success CASCADE;
DROP TABLE IF EXISTS artifact_executive_dashboard CASCADE;
DROP TABLE IF EXISTS artifact_roadmap CASCADE;
DROP TABLE IF EXISTS artifact_maturity_model CASCADE;
DROP TABLE IF EXISTS artifact_control_tower CASCADE;
DROP TABLE IF EXISTS artifact_think_tank_factory CASCADE;
DROP TABLE IF EXISTS artifact_enterprise_manual CASCADE;

-- Phase 2 — Agents autonomes remplacés
DROP TABLE IF EXISTS autonomous_consulting_team CASCADE;
DROP TABLE IF EXISTS autonomous_research_team CASCADE;
DROP TABLE IF EXISTS autonomous_growth_team CASCADE;
DROP TABLE IF EXISTS autonomous_think_tank CASCADE;

-- Phase 3 — Systèmes fusionnés
DROP TABLE IF EXISTS enterprise_intelligence_os_v2 CASCADE;
DROP TABLE IF EXISTS enterprise_control_tower CASCADE;
DROP TABLE IF EXISTS kos_unified_global_state CASCADE;

-- Phase 4 — Ressources fusionnées
DROP TABLE IF EXISTS automation_optimizer CASCADE;
DROP TABLE IF EXISTS resource_allocator CASCADE;
DROP TABLE IF EXISTS capacity_planner CASCADE;
DROP TABLE IF EXISTS forecasting_engine CASCADE;
DROP TABLE IF EXISTS scenario_simulator CASCADE;
DROP TABLE IF EXISTS kos_resource_engines CASCADE;

-- Phase 5 — Intelligence organisationnelle fusionnée
DROP TABLE IF EXISTS organizational_intelligence CASCADE;
DROP TABLE IF EXISTS partner_ecosystem_manager CASCADE;
DROP TABLE IF EXISTS opportunity_discovery_engine CASCADE;

-- Phase 6 — IA/AI fusionnés
DROP TABLE IF EXISTS model_evaluation_engine CASCADE;
DROP TABLE IF EXISTS prompt_quality_office CASCADE;
DROP TABLE IF EXISTS knowledge_validation_engine CASCADE;
DROP TABLE IF EXISTS source_verification_engine CASCADE;
DROP TABLE IF EXISTS kos_enterprise_hallucination_detection CASCADE;
DROP TABLE IF EXISTS kos_enterprise_digital_twins CASCADE;
DROP TABLE IF EXISTS kos_enterprise_self_improvement CASCADE;
DROP TABLE IF EXISTS kos_enterprise_strategic_memory CASCADE;

-- Phase 7 — Correction/Quality vides
DROP TABLE IF EXISTS kos_correction_image_queue CASCADE;
DROP TABLE IF EXISTS kos_correction_security_plan CASCADE;
DROP TABLE IF EXISTS kos_correction_manifest CASCADE;

-- Phase 8 — Archives
DROP TABLE IF EXISTS kos_plan_consolidation_phases CASCADE;

-- ============================================================================
-- TOTAL: 48 tables supprimées
-- Impact: 300 → 252 tables (-48)
-- ============================================================================