import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  CAS_GAP_REGISTER_MOCK,
  CAS_MIGRATION_LOG_MOCK,
  CAS_ACTIONS_MOCK,
  CAS_COMPLIANCE_IMPACT_MOCK,
  CAS_SYSTEM_HEALTH_MOCK,
  type KOSGapRegister,
  type KOSMigrationLog,
  type KOSCASAction,
  type KOSComplianceImpact,
  type KOSCASSystemHealth,
} from '@/mocks/kosCasData';

interface UseKOSCorrectiveSystemReturn {
  gaps: KOSGapRegister[];
  migrations: KOSMigrationLog[];
  actions: KOSCASAction[];
  compliance: KOSComplianceImpact[];
  health: KOSCASSystemHealth;
  isLive: boolean;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  liveTables: string[];
}

function computeHealth(
  gData: KOSGapRegister[],
  mData: KOSMigrationLog[],
  aData: KOSCASAction[],
): KOSCASSystemHealth {
  const resolved = gData.filter((g) => g.status === 'resolved').length;
  const verifiedMigrations = mData.filter((m) => m.migration_status === 'verified').length;
  const migratedOnly = mData.filter((m) => m.migration_status === 'migrated').length;
  const pendingMigrations = mData.filter((m) => m.migration_status === 'pending').length;

  // Hook percentages based on migration status
  const totalMigrations = mData.length || 1;
  const hooksLivePct = Math.round(((verifiedMigrations + migratedOnly) / 10) * 100); // 10 hooks tracked
  const hooksHybridPct = Math.round(((totalMigrations - verifiedMigrations - migratedOnly - pendingMigrations) / 10) * 100);
  const hooksMockPct = Math.max(0, 100 - hooksLivePct - hooksHybridPct);

  // ISO score: +2 per resolved gap, +1 per verified migration, +3 per compliance action planned
  const baseIso = 71;
  const isoBonus = resolved * 2 + verifiedMigrations * 1 + aData.filter((a) => a.action_type === 'COMPLIANCE' && a.status === 'planned').length * 3;
  const isoScore = Math.min(99, baseIso + isoBonus);

  // Big Four score: +2 per resolved gap, +1 per verified migration, +2 per INFRA action
  const baseBigFour = 68;
  const bigFourBonus = resolved * 2 + verifiedMigrations * 1 + aData.filter((a) => a.action_type === 'INFRA').length * 2;
  const bigFourScore = Math.min(99, baseBigFour + bigFourBonus);

  const actionsPlanned = aData.filter((a) => a.status === 'planned').length;
  const actionsInProgress = aData.filter((a) => a.status === 'in_progress').length;
  const actionsCompleted = aData.filter((a) => a.status === 'completed').length;

  return {
    total_gaps: gData.length,
    gaps_resolved: resolved,
    p0_blockers: gData.filter((g) => g.criticality === 'P0' && g.status !== 'resolved').length,
    p1_degraded: gData.filter((g) => g.criticality === 'P1' && g.status !== 'resolved').length,
    p2_needs_optim: gData.filter((g) => g.criticality === 'P2' && g.status !== 'resolved').length,
    hooks_live_pct: hooksLivePct,
    hooks_hybrid_pct: hooksHybridPct,
    hooks_mock_only_pct: hooksMockPct,
    total_hooks: 182,
    edge_functions_active: 101,
    edge_functions_limit: 250,
    edge_functions_pct: 40,
    migrations_completed: verifiedMigrations + migratedOnly,
    migrations_verified: verifiedMigrations,
    migrations_pending: pendingMigrations,
    tables_active: 342,
    tables_empty: 9,
    iso_score: isoScore,
    bigfour_score: bigFourScore,
    actions_planned: actionsPlanned,
    actions_in_progress: actionsInProgress,
    actions_completed: actionsCompleted,
  };
}

export function useKOSCorrectiveSystem(): UseKOSCorrectiveSystemReturn {
  const [gaps, setGaps] = useState<KOSGapRegister[]>(CAS_GAP_REGISTER_MOCK);
  const [migrations, setMigrations] = useState<KOSMigrationLog[]>(CAS_MIGRATION_LOG_MOCK);
  const [actions, setActions] = useState<KOSCASAction[]>(CAS_ACTIONS_MOCK);
  const [compliance, setCompliance] = useState<KOSComplianceImpact[]>(CAS_COMPLIANCE_IMPACT_MOCK);
  const [health, setHealth] = useState<KOSCASSystemHealth>(CAS_SYSTEM_HEALTH_MOCK);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liveTables, setLiveTables] = useState<string[]>([]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    const live: string[] = [];

    try {
      const [gapsRes, migrationsRes, actionsRes, complianceRes] = await Promise.all([
        supabase.from('kos_gap_register').select('*').order('criticality'),
        supabase.from('kos_migration_log').select('*').order('executed_at', { ascending: false }),
        supabase.from('kos_cas_actions').select('*').order('horizon'),
        supabase.from('kos_compliance_impact').select('*'),
      ]);

      let gData = CAS_GAP_REGISTER_MOCK;
      let mData = CAS_MIGRATION_LOG_MOCK;
      let aData = CAS_ACTIONS_MOCK;
      let cData = CAS_COMPLIANCE_IMPACT_MOCK;

      if (gapsRes.data && gapsRes.data.length > 0) {
        const mapped = gapsRes.data.map((row: Record<string, unknown>) => ({
          id: row.id as number,
          gap_id: row.gap_id as string,
          category: row.category as KOSGapRegister['category'],
          criticality: row.criticality as KOSGapRegister['criticality'],
          component_type: row.component_type as string,
          component_name: row.component_name as string,
          description: row.description as string,
          current_state: row.current_state as string,
          target_state: row.target_state as string,
          root_cause: row.root_cause as string,
          impacted_systems: row.impacted_systems as string,
          strategy: row.strategy as KOSGapRegister['strategy'],
          status: row.status as string,
          resolution_steps: (row.resolution_steps as string) || null,
          created_at: row.created_at as string,
          updated_at: row.updated_at as string,
          resolved_at: (row.resolved_at as string) || null,
        }));
        gData = mapped as KOSGapRegister[];
        live.push('gap_register');
      }

      if (migrationsRes.data && migrationsRes.data.length > 0) {
        const mapped = migrationsRes.data.map((row: Record<string, unknown>) => ({
          id: row.id as number,
          migration_id: row.migration_id as string,
          hook_name: row.hook_name as string,
          source_type: row.source_type as KOSMigrationLog['source_type'],
          table_target: row.table_target as string,
          migration_status: row.migration_status as string,
          before_state: (row.before_state as string) || null,
          after_state: (row.after_state as string) || null,
          fallback_configured: (row.fallback_configured as boolean) || false,
          executed_at: row.executed_at as string,
          verified_at: (row.verified_at as string) || null,
        }));
        mData = mapped as KOSMigrationLog[];
        live.push('migration_log');
      }

      if (actionsRes.data && actionsRes.data.length > 0) {
        const mapped = actionsRes.data.map((row: Record<string, unknown>) => ({
          id: row.id as number,
          action_id: row.action_id as string,
          gap_id: row.gap_id as string,
          action_type: row.action_type as KOSCASAction['action_type'],
          criticality: row.criticality as KOSCASAction['criticality'],
          description: row.description as string,
          system_impacted: row.system_impacted as string,
          technical_steps: row.technical_steps as string,
          risks: row.risks as string,
          expected_result: row.expected_result as string,
          associated_kpi: row.associated_kpi as string,
          horizon: row.horizon as KOSCASAction['horizon'],
          status: row.status as string,
          created_at: row.created_at as string,
        }));
        aData = mapped as KOSCASAction[];
        live.push('cas_actions');
      }

      if (complianceRes.data && complianceRes.data.length > 0) {
        const mapped = complianceRes.data.map((row: Record<string, unknown>) => ({
          id: row.id as number,
          action_id: row.action_id as string,
          iso_27001_impact: row.iso_27001_impact as string,
          governance_impact: row.governance_impact as string,
          traceability_level: row.traceability_level as string,
          compliance_notes: row.compliance_notes as string,
        }));
        cData = mapped as KOSComplianceImpact[];
        live.push('compliance_impact');
      }

      // Computed health from live data
      const dynamicHealth = computeHealth(gData, mData, aData);
      setHealth(dynamicHealth);

      setGaps(gData);
      setMigrations(mData);
      setActions(aData);
      setCompliance(cData);
      setIsLive(live.length >= 1);
      setLiveTables(live);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur de connexion Supabase';
      setError(msg);
      setIsLive(false);
      // Fallback health from mock
      setHealth(computeHealth(CAS_GAP_REGISTER_MOCK, CAS_MIGRATION_LOG_MOCK, CAS_ACTIONS_MOCK));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    gaps,
    migrations,
    actions,
    compliance,
    health,
    isLive,
    loading,
    error,
    refresh: fetchAll,
    liveTables,
  };
}