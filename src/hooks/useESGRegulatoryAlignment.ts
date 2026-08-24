import { useMemo, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  esgGovernanceAssessments,
  amlCftRequirements,
  auditCommittees,
  iso27001Controls,
  correctiveActions,
  quarterlyMilestones,
  alignmentScores,
  keyFindings,
  executiveSummary,
} from '@/mocks/eSGRegulatoryAlignment';

export function useESGRegulatoryAlignment() {
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSupabase = async () => {
      try {
        const { data, error: dbError } = await supabase
          .from('esg_assessments')
          .select('id')
          .limit(1);

        if (!dbError && data && data.length > 0) {
          setIsLive(true);
        }
      } catch {
        // fallback to mock — silently
      } finally {
        setLoading(false);
      }
    };
    checkSupabase();
  }, []);

  const esgAssessment = useMemo(() => esgGovernanceAssessments, []);
  const amlRequirements = useMemo(() => amlCftRequirements, []);
  const committees = useMemo(() => auditCommittees, []);
  const isoControls = useMemo(() => iso27001Controls, []);
  const actions = useMemo(() => correctiveActions, []);
  const milestones = useMemo(() => quarterlyMilestones, []);
  const scores = useMemo(() => alignmentScores, []);
  const findings = useMemo(() => keyFindings, []);
  const summary = useMemo(() => executiveSummary, []);

  // Derived data
  const criticalFindings = useMemo(() => findings.filter(f => f.severity === 'critical'), [findings]);
  const p0Actions = useMemo(() => actions.filter(a => a.priority === 'P0'), [actions]);
  const p1Actions = useMemo(() => actions.filter(a => a.priority === 'P1'), [actions]);
  const p2Actions = useMemo(() => actions.filter(a => a.priority === 'P2'), [actions]);
  const completedActions = useMemo(() => actions.filter(a => a.status === 'completed'), [actions]);
  const inProgressActions = useMemo(() => actions.filter(a => a.status === 'in_progress'), [actions]);

  // ISO 27001 domain grouping
  const isoDomains = useMemo(() => {
    const domainMap = new Map<string, typeof isoControls>();
    isoControls.forEach(c => {
      if (!domainMap.has(c.domain)) domainMap.set(c.domain, []);
      domainMap.get(c.domain)!.push(c);
    });
    return Array.from(domainMap.entries()).map(([domain, controls]) => ({
      domain,
      controls,
      conformCount: controls.filter(c => c.status === 'conform').length,
      nonConformCount: controls.filter(c => c.status !== 'conform').length,
      avgImplementation: Math.round(controls.reduce((s, c) => s + c.implementation_level, 0) / controls.length),
    }));
  }, [isoControls]);

  // AML/CFT by framework
  const amlByFramework = useMemo(() => {
    const fwMap = new Map<string, typeof amlRequirements>();
    amlRequirements.forEach(r => {
      if (!fwMap.has(r.framework)) fwMap.set(r.framework, []);
      fwMap.get(r.framework)!.push(r);
    });
    return Array.from(fwMap.entries()).map(([framework, reqs]) => ({
      framework,
      total: reqs.length,
      compliant: reqs.filter(r => r.status === 'compliant').length,
      partial: reqs.filter(r => r.status === 'partial').length,
      nonCompliant: reqs.filter(r => r.status === 'non_compliant').length,
    }));
  }, [amlRequirements]);

  // ESG governance summary stats
  const esgStats = useMemo(() => ({
    totalDomains: esgAssessment.length,
    criticalGaps: esgAssessment.filter(e => e.gap_severity === 'critical').length,
    majorGaps: esgAssessment.filter(e => e.gap_severity === 'major').length,
    avgCurrentScore: Math.round(esgAssessment.reduce((s, e) => s + e.current_score, 0) / esgAssessment.length),
    avgTargetScore: Math.round(esgAssessment.reduce((s, e) => s + e.target_score, 0) / esgAssessment.length),
    totalBudget: esgAssessment.reduce((s, e) => s + parseInt(e.budget.replace(/[^0-9]/g, '')), 0),
  }), [esgAssessment]);

  // Action stats
  const actionStats = useMemo(() => ({
    total: actions.length,
    p0: p0Actions.length,
    p1: p1Actions.length,
    p2: p2Actions.length,
    inProgress: inProgressActions.length,
    completed: completedActions.length,
    totalBudget: actions.reduce((s, a) => s + parseInt(a.budget.replace(/[^0-9]/g, '')), 0),
    overallProgress: completedActions.length > 0
      ? Math.round((completedActions.length / actions.length) * 100)
      : 0,
  }), [actions, p0Actions, p1Actions, p2Actions, inProgressActions, completedActions]);

  // Current quarter
  const currentQuarter = useMemo(() => milestones[0], [milestones]);

  return {
    isLive,
    loading,
    esgAssessment,
    amlRequirements,
    committees,
    isoControls,
    actions,
    milestones,
    scores,
    findings,
    summary,
    criticalFindings,
    p0Actions,
    p1Actions,
    p2Actions,
    completedActions,
    inProgressActions,
    isoDomains,
    amlByFramework,
    esgStats,
    actionStats,
    currentQuarter,
  };
}



