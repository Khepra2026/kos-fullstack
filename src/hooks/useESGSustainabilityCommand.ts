import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  carbonFootprintAssessment as mockCarbon,
  ecovadisAssessment as mockEcovadis,
  sustainabilityReport2026 as mockReport,
  esgExecutiveDashboard as mockDashboard,
  esgPlanActions as mockPlanActions,
  esgQuarterlyMilestones as mockMilestones,
  esgStats as mockStats,
} from '@/mocks/kosESGSustainabilityCommand';
import { logHookAudit, createAuditEntry, type HookAuditEntry } from '@/utils/hookAuditLogger';

interface ESGLiveData {
  assessments: Record<string, unknown>[];
  isLive: boolean;
  sourceTable: string;
  rowCount: number;
}

interface AuditMeta {
  esg: HookAuditEntry | null;
}

export function useESGSustainabilityCommand() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liveData, setLiveData] = useState<ESGLiveData>({ assessments: [], isLive: false, sourceTable: '', rowCount: 0 });
  const [auditTrail, setAuditTrail] = useState<AuditMeta>({ esg: null });

  const fetchLive = useCallback(async () => {
    setLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      const { data, error: dbErr } = await supabase
        .from('esg_assessments')
        .select('*')
        .order('overall_esg_score', { ascending: false });

      const durationMs = Math.round(performance.now() - startTime);

      if (dbErr) throw dbErr;

      if (data && data.length > 0) {
        setLiveData({ assessments: data as Record<string, unknown>[], isLive: true, sourceTable: 'esg_assessments', rowCount: data.length });
        const entry = createAuditEntry('useESGSustainabilityCommand', 'supabase', data.length, 'esg_assessments', undefined, durationMs);
        logHookAudit(entry);
        setAuditTrail({ esg: entry });
      } else {
        setLiveData({ assessments: [], isLive: false, sourceTable: 'esg_assessments', rowCount: 0 });
        const entry = createAuditEntry('useESGSustainabilityCommand', 'mock_fallback', 0, 'esg_assessments', 'Table vide — fallback mock', durationMs);
        logHookAudit(entry);
        setAuditTrail({ esg: entry });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Erreur de connexion Supabase';
      setError(msg);
      setLiveData({ assessments: [], isLive: false, sourceTable: 'esg_assessments', rowCount: 0 });
      const durationMs = Math.round(performance.now() - startTime);
      const entry = createAuditEntry('useESGSustainabilityCommand', 'error_fallback', 0, 'esg_assessments', msg, durationMs);
      logHookAudit(entry);
      setAuditTrail({ esg: entry });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLive();
  }, [fetchLive]);

  // Mock-derived computations (always available)
  const totalActions = useMemo(() => mockStats.total_actions, []);
  const completedActions = useMemo(() => mockStats.actions_completed, []);
  const inProgressActions = useMemo(() => mockStats.actions_in_progress, []);
  const plannedActions = useMemo(() => mockStats.actions_planned, []);

  const progressPercent = useMemo(() =>
    totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0,
    [completedActions, totalActions]
  );

  const carbonScope1 = useMemo(() =>
    mockCarbon.scopes.find(s => s.id === 'scope-1')?.tco2e || 0,
    []
  );

  const carbonScope2 = useMemo(() =>
    mockCarbon.scopes.find(s => s.id === 'scope-2')?.tco2e || 0,
    []
  );

  const carbonScope3 = useMemo(() =>
    mockCarbon.scopes.find(s => s.id === 'scope-3')?.tco2e || 0,
    []
  );

  const carbonReductionPercent = useMemo(() => mockCarbon.reduction_vs_base, []);

  const ecovadisCurrentScore = useMemo(() => mockEcovadis.current_estimated_score, []);

  const reportChaptersCompleted = useMemo(() =>
    mockReport.chapters.filter(c => c.status.includes('Rédigé') || c.status.includes('Adopté')).length,
    []
  );

  const reportChaptersInProgress = useMemo(() =>
    mockReport.chapters.filter(c => c.status.includes('cours') || c.status.includes('Brouillon')).length,
    []
  );

  const dashboardAlertsHigh = useMemo(() =>
    mockDashboard.alerts.filter(a => a.severity === 'high').length,
    []
  );

  const dashboardAlertsTotal = useMemo(() => mockDashboard.alerts.length, []);

  const highPriorityActions = useMemo(() =>
    mockPlanActions.filter(a => a.priority === 'P0').length,
    []
  );

  const quarterCount = useMemo(() => mockMilestones.quarters.length, []);

  const planPillars = useMemo(() => {
    const pillars = new Set<string>();
    mockPlanActions.forEach(a => pillars.add(a.pillar));
    return Array.from(pillars);
  }, []);

  const actionsByPillar = useMemo(() => {
    const map: Record<string, number> = {};
    mockPlanActions.forEach(a => {
      map[a.pillar] = (map[a.pillar] || 0) + 1;
    });
    return map;
  }, []);

  const actionStats = useMemo(() => ({
    total: mockStats.total_actions,
    completed: mockStats.actions_completed,
    in_progress: mockStats.actions_in_progress,
    planned: mockStats.actions_planned,
    p0: mockStats.p0_actions,
    p1: mockStats.p1_actions,
    p2: mockStats.p2_actions,
    totalBudget: parseInt(mockStats.budget_total.replace(/[^0-9]/g, '')) || 207600000,
  }), []);

  return {
    loading,
    error,
    isLive: liveData.isLive,
    liveAssessments: liveData.assessments,
    liveRowCount: liveData.rowCount,
    refetch: fetchLive,
    auditTrail,
    carbonFootprintAssessment: mockCarbon,
    ecovadisAssessment: mockEcovadis,
    sustainabilityReport2026: mockReport,
    esgExecutiveDashboard: mockDashboard,
    esgPlanActions: mockPlanActions,
    esgQuarterlyMilestones: mockMilestones,
    esgStats: mockStats,
    totalActions,
    completedActions,
    inProgressActions,
    plannedActions,
    progressPercent,
    carbonScope1,
    carbonScope2,
    carbonScope3,
    carbonReductionPercent,
    ecovadisCurrentScore,
    reportChaptersCompleted,
    reportChaptersInProgress,
    dashboardAlertsHigh,
    dashboardAlertsTotal,
    highPriorityActions,
    quarterCount,
    planPillars,
    actionsByPillar,
    actionStats,
  };
}