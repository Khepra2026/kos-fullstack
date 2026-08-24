import { useState, useMemo, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  AXES_AUDIT,
  AUDIT_RISKS,
  SWOT_FORCES,
  SWOT_FAIBLESSES,
  SWOT_OPPORTUNITES,
  SWOT_MENACES,
  PESTEL_ITEMS,
  ROADMAP_12M,
  ROADMAP_24M,
  ROADMAP_36M,
  EXECUTIVE_REPORT,
  computeAssessmentKPIs,
  ASSESSMENT_META,
} from '@/mocks/enterpriseTransformationAssessment360';
import type { AuditAxe, AuditRiskItem, AuditRoadmapPhase } from '@/mocks/enterpriseTransformationAssessment360';

export type AssessmentTab =
  | 'dashboard'
  | 'swot'
  | 'pestel'
  | 'risques'
  | 'roadmap'
  | 'rapport'
  | 'axe';

export function useEnterpriseTransformationAssessment360() {
  const [activeTab, setActiveTab] = useState<AssessmentTab>('dashboard');
  const [activeAxeId, setActiveAxeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roadmapPeriod, setRoadmapPeriod] = useState<'12' | '24' | '36'>('12');
  const [expandedAxe, setExpandedAxe] = useState<string | null>(null);
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<'all' | 'critique' | 'eleve' | 'modere' | 'actif' | 'mitige'>('all');
  const [isLive, setIsLive] = useState(false);
  const [axes, setAxes] = useState<AuditAxe[]>(AXES_AUDIT);
  const [risks, setRisks] = useState<AuditRiskItem[]>(AUDIT_RISKS);

  const kpis = useMemo(() => computeAssessmentKPIs(), []);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: liveAxes, error: axesErr } = await supabase
        .from('kos_enterprise_transformation_assessment')
        .select('*');
      if (!axesErr && liveAxes && liveAxes.length > 0) {
        setAxes(liveAxes as unknown as AuditAxe[]);
        setIsLive(true);
      } else {
        setAxes(AXES_AUDIT);
        setIsLive(false);
      }
      const { data: liveRisks, error: risksErr } = await supabase
        .from('kos_bigfour_risk_matrix')
        .select('*');
      if (!risksErr && liveRisks && liveRisks.length > 0) {
        setRisks(liveRisks as unknown as AuditRiskItem[]);
        setIsLive(true);
      }
    } catch {
      setAxes(AXES_AUDIT);
      setRisks(AUDIT_RISKS);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const activeAxe = useMemo(
    () => (activeTab === 'axe' && activeAxeId ? axes.find(a => a.id === activeAxeId) || null : null),
    [activeTab, activeAxeId, axes],
  );

  const filteredRisks = useMemo(() => {
    if (riskFilter === 'all') return risks;
    if (riskFilter === 'actif' || riskFilter === 'mitige') return risks.filter(r => r.statut === riskFilter);
    return risks.filter(r => r.criticite === riskFilter);
  }, [riskFilter, risks]);

  const currentRoadmap = useMemo(() => {
    if (roadmapPeriod === '12') return ROADMAP_12M;
    if (roadmapPeriod === '24') return ROADMAP_24M;
    return ROADMAP_36M;
  }, [roadmapPeriod]);

  const navigateToAxe = useCallback((axeId: string) => {
    setActiveAxeId(axeId);
    setActiveTab('axe');
    setExpandedAxe(axeId);
  }, []);

  return {
    axes,
    risks,
    filteredRisks,
    swot: { forces: SWOT_FORCES, faiblesses: SWOT_FAIBLESSES, opportunites: SWOT_OPPORTUNITES, menaces: SWOT_MENACES },
    pestel: PESTEL_ITEMS,
    roadmap12: ROADMAP_12M,
    roadmap24: ROADMAP_24M,
    roadmap36: ROADMAP_36M,
    currentRoadmap,
    report: EXECUTIVE_REPORT,
    kpis,
    meta: ASSESSMENT_META,
    activeTab,
    setActiveTab,
    activeAxeId,
    navigateToAxe,
    activeAxe,
    loading,
    error,
    refetch,
    roadmapPeriod,
    setRoadmapPeriod,
    expandedAxe,
    setExpandedAxe,
    expandedRisk,
    setExpandedRisk,
    riskFilter,
    setRiskFilter,
    isLive,
  };
}



