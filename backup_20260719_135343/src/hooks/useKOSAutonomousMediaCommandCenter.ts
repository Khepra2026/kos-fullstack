import { useState, useMemo, useCallback } from 'react';
import {
  ORCHESTRATED_FACTORIES,
  QUALITY_CHECKPOINTS,
  COMPLIANCE_FRAMEWORKS,
  DOCUMENT_RECORDS,
  GLOBAL_KPIS,
  IMPROVEMENT_INITIATIVES,
  COMMAND_CENTER_STATS,
} from '@/mocks/autonomousMediaCommandCenter';
import type {
  OrchestratedFactory,
  QualityCheckpoint,
  ComplianceFramework,
  DocumentRecord,
  GlobalKPI,
  ImprovementInitiative,
} from '@/mocks/autonomousMediaCommandCenter';

export function useKOSAutonomousMediaCommandCenter() {
  // ─── FACTORIES ───
  const factories = useMemo(() => ORCHESTRATED_FACTORIES, []);

  const operationalFactories = useMemo(() => factories.filter(f => f.status === 'operational'), [factories]);
  const degradedFactories = useMemo(() => factories.filter(f => f.status === 'degraded'), [factories]);
  const factoriesWithAlerts = useMemo(() => factories.filter(f => f.alerts.length > 0), [factories]);

  const getFactoryById = useCallback((id: string): OrchestratedFactory | undefined => {
    return factories.find(f => f.id === id);
  }, [factories]);

  const getFactoryByHub = useCallback((hubNumber: number): OrchestratedFactory | undefined => {
    return factories.find(f => f.hubNumber === hubNumber);
  }, [factories]);

  const factoryHealthSummary = useMemo(() => ({
    total: factories.length,
    operational: operationalFactories.length,
    degraded: degradedFactories.length,
    maintenance: factories.filter(f => f.status === 'maintenance').length,
    offline: factories.filter(f => f.status === 'offline').length,
    avgHealth: Math.round(factories.reduce((s, f) => s + f.healthScore, 0) / factories.length),
    avgMaturity: Math.round(factories.reduce((s, f) => s + f.maturityScore, 0) / factories.length),
    avgQuality: parseFloat((factories.reduce((s, f) => s + f.qualityScore, 0) / factories.length).toFixed(1)),
    avgCompliance: parseFloat((factories.reduce((s, f) => s + f.complianceScore, 0) / factories.length).toFixed(1)),
    avgAutomation: parseFloat((factories.reduce((s, f) => s + f.automationRate, 0) / factories.length).toFixed(1)),
  }), [factories, operationalFactories, degradedFactories]);

  // ─── QUALITY ───
  const qualityCheckpoints = useMemo(() => QUALITY_CHECKPOINTS, []);

  const qualityStats = useMemo(() => ({
    totalCheckpoints: QUALITY_CHECKPOINTS.length,
    avgPassRate: parseFloat((QUALITY_CHECKPOINTS.reduce((s, q) => s + q.passRate, 0) / QUALITY_CHECKPOINTS.length).toFixed(1)),
    openFindings: QUALITY_CHECKPOINTS.reduce((s, q) => s + q.findings.filter(f => f.status === 'open').length, 0),
    totalFindings: QUALITY_CHECKPOINTS.reduce((s, q) => s + q.findings.length, 0),
    criticalFindings: QUALITY_CHECKPOINTS.reduce((s, q) => s + q.findings.filter(f => f.severity === 'critical').length, 0),
    majorFindings: QUALITY_CHECKPOINTS.reduce((s, q) => s + q.findings.filter(f => f.severity === 'major').length, 0),
    minorFindings: QUALITY_CHECKPOINTS.reduce((s, q) => s + q.findings.filter(f => f.severity === 'minor').length, 0),
    inProgressFindings: QUALITY_CHECKPOINTS.reduce((s, q) => s + q.findings.filter(f => f.status === 'in_progress').length, 0),
  }), []);

  const getCheckpointById = useCallback((id: string): QualityCheckpoint | undefined => {
    return QUALITY_CHECKPOINTS.find(q => q.id === id);
  }, []);

  // ─── COMPLIANCE ───
  const complianceFrameworks = useMemo(() => COMPLIANCE_FRAMEWORKS, []);

  const complianceStats = useMemo(() => ({
    totalFrameworks: COMPLIANCE_FRAMEWORKS.length,
    compliant: COMPLIANCE_FRAMEWORKS.filter(c => c.status === 'compliant').length,
    partial: COMPLIANCE_FRAMEWORKS.filter(c => c.status === 'partial').length,
    nonCompliant: COMPLIANCE_FRAMEWORKS.filter(c => c.status === 'non_compliant').length,
    pendingActions: COMPLIANCE_FRAMEWORKS.reduce((s, c) => s + c.actions.filter(a => a.status === 'pending').length, 0),
    totalActions: COMPLIANCE_FRAMEWORKS.reduce((s, c) => s + c.actions.length, 0),
    overdueActions: COMPLIANCE_FRAMEWORKS.reduce((s, c) => s + c.actions.filter(a => a.status === 'overdue').length, 0),
    complianceRate: parseFloat(((COMPLIANCE_FRAMEWORKS.filter(c => c.status === 'compliant').length / COMPLIANCE_FRAMEWORKS.length) * 100).toFixed(1)),
  }), []);

  const getFrameworkById = useCallback((id: string): ComplianceFramework | undefined => {
    return COMPLIANCE_FRAMEWORKS.find(c => c.id === id);
  }, []);

  // ─── DOCUMENTS ───
  const documents = useMemo(() => DOCUMENT_RECORDS, []);

  const documentStats = useMemo(() => ({
    total: DOCUMENT_RECORDS.length,
    active: DOCUMENT_RECORDS.filter(d => d.status === 'active').length,
    drafts: DOCUMENT_RECORDS.filter(d => d.status === 'draft').length,
    archived: DOCUMENT_RECORDS.filter(d => d.status === 'archived').length,
    underReview: DOCUMENT_RECORDS.filter(d => d.status === 'under_review').length,
    byType: {
      policy: DOCUMENT_RECORDS.filter(d => d.type === 'policy').length,
      procedure: DOCUMENT_RECORDS.filter(d => d.type === 'procedure').length,
      template: DOCUMENT_RECORDS.filter(d => d.type === 'template').length,
      report: DOCUMENT_RECORDS.filter(d => d.type === 'report').length,
      audit: DOCUMENT_RECORDS.filter(d => d.type === 'audit').length,
      charter: DOCUMENT_RECORDS.filter(d => d.type === 'charter').length,
      manual: DOCUMENT_RECORDS.filter(d => d.type === 'manual').length,
    },
    categories: [...new Set(DOCUMENT_RECORDS.map(d => d.category))],
  }), []);

  const getDocumentById = useCallback((id: string): DocumentRecord | undefined => {
    return DOCUMENT_RECORDS.find(d => d.id === id);
  }, []);

  const getDocumentsByStatus = useCallback((status: string): DocumentRecord[] => {
    return DOCUMENT_RECORDS.filter(d => d.status === status);
  }, []);

  const getDocumentsByType = useCallback((type: string): DocumentRecord[] => {
    return DOCUMENT_RECORDS.filter(d => d.type === type);
  }, []);

  const searchDocuments = useCallback((query: string): DocumentRecord[] => {
    const q = query.toLowerCase();
    return DOCUMENT_RECORDS.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.tags.some(t => t.toLowerCase().includes(q)) ||
      d.category.toLowerCase().includes(q) ||
      d.author.toLowerCase().includes(q)
    );
  }, []);

  // ─── GLOBAL KPIs ───
  const globalKpis = useMemo(() => GLOBAL_KPIS, []);

  const getKPIById = useCallback((id: string): GlobalKPI | undefined => {
    return GLOBAL_KPIS.find(k => k.id === id);
  }, []);

  const getKPIsByCategory = useCallback((category: string): GlobalKPI[] => {
    return GLOBAL_KPIS.filter(k => k.category === category);
  }, []);

  const kpiOverview = useMemo(() => ({
    improving: GLOBAL_KPIS.filter(k => k.trend === 'up' || k.trend === 'down').length,
    stable: GLOBAL_KPIS.filter(k => k.trend === 'stable').length,
    atTarget: GLOBAL_KPIS.filter(k => {
      if (k.trend === 'down') return k.current <= k.target;
      return k.current >= k.target;
    }).length,
  }), []);

  // ─── IMPROVEMENTS ───
  const improvements = useMemo(() => IMPROVEMENT_INITIATIVES, []);

  const improvementStats = useMemo(() => ({
    total: IMPROVEMENT_INITIATIVES.length,
    active: IMPROVEMENT_INITIATIVES.filter(i => i.status === 'active').length,
    planned: IMPROVEMENT_INITIATIVES.filter(i => i.status === 'planned').length,
    completed: IMPROVEMENT_INITIATIVES.filter(i => i.status === 'completed').length,
    onHold: IMPROVEMENT_INITIATIVES.filter(i => i.status === 'on_hold').length,
    criticalActive: IMPROVEMENT_INITIATIVES.filter(i => i.status === 'active' && i.priority === 'critical').length,
    highActive: IMPROVEMENT_INITIATIVES.filter(i => i.status === 'active' && i.priority === 'high').length,
    avgProgress: Math.round(IMPROVEMENT_INITIATIVES.filter(i => i.status === 'active').reduce((s, i) => s + i.progress, 0) / Math.max(IMPROVEMENT_INITIATIVES.filter(i => i.status === 'active').length, 1)),
  }), []);

  const getImprovementById = useCallback((id: string): ImprovementInitiative | undefined => {
    return IMPROVEMENT_INITIATIVES.find(i => i.id === id);
  }, []);

  const criticalImprovements = useMemo(() => {
    return IMPROVEMENT_INITIATIVES.filter(i => i.priority === 'critical' && i.status !== 'completed');
  }, []);

  // ─── STATS ───
  const getStats = useCallback(() => COMMAND_CENTER_STATS, []);

  const stats = useMemo(() => COMMAND_CENTER_STATS, []);

  return {
    factories,
    operationalFactories,
    degradedFactories,
    factoriesWithAlerts,
    getFactoryById,
    getFactoryByHub,
    factoryHealthSummary,
    qualityCheckpoints,
    qualityStats,
    getCheckpointById,
    complianceFrameworks,
    complianceStats,
    getFrameworkById,
    documents,
    documentStats,
    getDocumentById,
    getDocumentsByStatus,
    getDocumentsByType,
    searchDocuments,
    globalKpis,
    getKPIById,
    getKPIsByCategory,
    kpiOverview,
    improvements,
    improvementStats,
    getImprovementById,
    criticalImprovements,
    stats,
    getStats,
  };
}



