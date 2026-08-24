-- ============================================================
-- KOS GOVERNANCE SCHEMA™ — BLOC 6
-- Supabase réduit à la couche de gouvernance uniquement
-- Registry Layer: données de référence, audit, conformité
-- ============================================================

-- GOUVERNANCE CORE (gardé)
-- regulators : autorités de régulation (BCEAO, COBAC, CIMA, etc.)
-- regulations : textes réglementaires versionnés
-- regulatory_register : registre de conformité
-- regulatory_alerts : alertes réglementaires

-- AUDIT & TRAÇABILITÉ (gardé)
-- audit_logs : logs d'audit Big Four
-- citations : références réglementaires vérifiées
-- remediation_logs : corrections tracées
-- evidence_library : preuves de conformité

-- IDENTITÉ & CONTRÔLE D'ACCÈS (gardé)
-- profiles : identités utilisateurs
-- organizations : entités organisationnelles
-- organization_members : RBAC/ABAC

-- MÉTADONNÉES SYSTÈME (gardé)
-- kos_execution_logs : logs d'exécution KOS
-- platform_credentials : credentials sécurisés
-- admin_sessions : sessions administrateur

-- RÉFÉRENTIEL RÉGLEMENTAIRE (gardé)
-- rag_documents : documents RAG (métadonnées uniquement, pas d'embeddings)
-- rag_chunks : chunks RAG (métadonnées uniquement)
-- regulatory_intelligence_feed : veille réglementaire
-- sector_observatories : observatoires sectoriels

-- ============================================================
-- CE QUI SORT DE SUPABASE :
-- ============================================================
-- ❌ rag_embeddings → Local Vector Store
-- ❌ Toutes les tables LOG massives → Local IndexedDB
-- ❌ Traitements IA → Microservices Docker
-- ❌ Edge Functions métier → n8n / Microservices
-- ❌ Données opérationnelles → Regulatory Data Lake
-- ❌ Tables Redondantes/LEGACY → Supprimées

-- ============================================================
-- COMPTEUR FINAL SUPABASE
-- ============================================================
-- Avant : 273 tables
-- Après BLOC 2 (fusions + suppressions) : ~185 tables
-- Après BLOC 3-7 (migration locale) : Supabase = Registry Only
-- Tables gouvernance restantes : ~60 tables CORE