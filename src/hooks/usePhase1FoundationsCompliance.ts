import { useMemo } from 'react';
import {
  processMappings,
  regionalComplianceRequirements,
  aiFraudDetectionModules,
  infrastructureMetrics,
  phase1CorrectiveActions,
  complianceKPIs,
  phase1Scores,
  phase1KeyFindings,
  phase1ExecutiveSummary,
  quarterlyPhase1Milestones,
} from '@/mocks/kosPhase1FoundationsCompliance';

export function usePhase1FoundationsCompliance() {
  const processes = useMemo(() => processMappings, []);
  const complianceReqs = useMemo(() => regionalComplianceRequirements, []);
  const aiModules = useMemo(() => aiFraudDetectionModules, []);
  const infraMetrics = useMemo(() => infrastructureMetrics, []);
  const actions = useMemo(() => phase1CorrectiveActions, []);
  const kpis = useMemo(() => complianceKPIs, []);
  const scores = useMemo(() => phase1Scores, []);
  const findings = useMemo(() => phase1KeyFindings, []);
  const summary = useMemo(() => phase1ExecutiveSummary, []);
  const milestones = useMemo(() => quarterlyPhase1Milestones, []);

  // Process domain aggregation
  const processDomains = useMemo(() => {
    const domainMap = new Map<string, typeof processes>();
    processes.forEach(p => {
      if (!domainMap.has(p.domain)) domainMap.set(p.domain, []);
      domainMap.get(p.domain)!.push(p);
    });
    return Array.from(domainMap.entries()).map(([domain, procs]) => ({
      domain,
      count: procs.length,
      avgScore: Math.round(procs.reduce((s, p) => s + p.current_score, 0) / procs.length),
      avgTarget: Math.round(procs.reduce((s, p) => s + p.target_score, 0) / procs.length),
      criticalRisks: procs.filter(p => p.risk_level === 'critique').length,
      highRisks: procs.filter(p => p.risk_level === 'élevé').length,
    }));
  }, [processes]);

  // Compliance by framework
  const complianceByFramework = useMemo(() => {
    const fwMap = new Map<string, typeof complianceReqs>();
    complianceReqs.forEach(r => {
      if (!fwMap.has(r.framework)) fwMap.set(r.framework, []);
      fwMap.get(r.framework)!.push(r);
    });
    return Array.from(fwMap.entries()).map(([framework, reqs]) => ({
      framework,
      total: reqs.length,
      compliant: reqs.filter(r => r.status === 'conforme').length,
      partial: reqs.filter(r => r.status === 'partiel').length,
      nonCompliant: reqs.filter(r => r.status === 'non_conforme').length,
    }));
  }, [complianceReqs]);

  // AI modules stats
  const aiModuleStats = useMemo(() => ({
    total: aiModules.length,
    deployed: aiModules.filter(m => m.status === 'déployé').length,
    inProgress: aiModules.filter(m => m.status === 'en_cours').length,
    planned: aiModules.filter(m => m.status === 'planifié').length,
    notStarted: aiModules.filter(m => m.status === 'non_démarré').length,
    avgImplementation: Math.round(aiModules.reduce((s, m) => s + m.implementation_level, 0) / aiModules.length),
    p0Count: aiModules.filter(m => m.priority === 'P0').length,
    p1Count: aiModules.filter(m => m.priority === 'P1').length,
    p2Count: aiModules.filter(m => m.priority === 'P2').length,
  }), [aiModules]);

  // Infrastructure stats by category
  const infraByCategory = useMemo(() => {
    const catMap = new Map<string, typeof infraMetrics>();
    infraMetrics.forEach(m => {
      if (!catMap.has(m.category)) catMap.set(m.category, []);
      catMap.get(m.category)!.push(m);
    });
    return Array.from(catMap.entries()).map(([category, metrics]) => ({
      category,
      total: metrics.length,
      critical: metrics.filter(m => m.status === 'critique').length,
      warning: metrics.filter(m => m.status === 'warning').length,
      acceptable: metrics.filter(m => m.status === 'acceptable').length,
      excellent: metrics.filter(m => m.status === 'excellent').length,
    }));
  }, [infraMetrics]);

  // Action stats
  const actionStats = useMemo(() => {
    const p0 = actions.filter(a => a.priority === 'P0');
    const p1 = actions.filter(a => a.priority === 'P1');
    const p2 = actions.filter(a => a.priority === 'P2');
    const completed = actions.filter(a => a.status === 'completed');
    const inProgress = actions.filter(a => a.status === 'in_progress');
    return {
      total: actions.length,
      p0: p0.length,
      p1: p1.length,
      p2: p2.length,
      completed: completed.length,
      inProgress: inProgress.length,
      totalBudget: actions.reduce((s, a) => s + parseInt(a.budget.replace(/[^0-9]/g, '')), 0),
      overallProgress: completed.length > 0 ? Math.round((completed.length / actions.length) * 100) : 0,
    };
  }, [actions]);

  // KPIs by category
  const kpisByCategory = useMemo(() => {
    const catMap = new Map<string, typeof kpis>();
    kpis.forEach(k => {
      if (!catMap.has(k.category)) catMap.set(k.category, []);
      catMap.get(k.category)!.push(k);
    });
    return Array.from(catMap.entries()).map(([category, items]) => ({ category, items }));
  }, [kpis]);

  return {
    processes,
    complianceReqs,
    aiModules,
    infraMetrics,
    actions,
    kpis,
    scores,
    findings,
    summary,
    milestones,
    processDomains,
    complianceByFramework,
    aiModuleStats,
    infraByCategory,
    actionStats,
    kpisByCategory,
  };
}