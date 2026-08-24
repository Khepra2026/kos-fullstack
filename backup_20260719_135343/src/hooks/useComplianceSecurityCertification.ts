import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import {
  kycCddProcedures,
  lcbfRiskMapping,
  cemacAdaptation,
  bceaoCobacOhadaAlignment,
  iso27001SmsiDocs,
  iso27001RiskAssessment,
  iso27001InternalAudit,
  certificationPlan,
  complianceSecurityStats,
  quarterlyMilestones
} from '@/mocks/complianceSecurityCertification';

export function useComplianceSecurityCertification() {
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const checkSupabase = async () => {
      try {
        const { data } = await supabase.from('compliance_reviews').select('id').limit(1);
        if (data && data.length > 0) setIsLive(true);
      } catch { /* mock fallback */ }
      setLoading(false);
    };
    const t = setTimeout(() => checkSupabase(), 300);
    return () => clearTimeout(t);
  }, []);

  const totalActions = useMemo(() => complianceSecurityStats.total_actions, []);
  const completedActions = useMemo(() => complianceSecurityStats.actions_completed, []);
  const inProgressActions = useMemo(() => complianceSecurityStats.actions_in_progress, []);
  const plannedActions = useMemo(() => complianceSecurityStats.actions_planned, []);

  const progressPercent = useMemo(() =>
    totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0,
    [completedActions, totalActions]
  );

  const kycDeployed = useMemo(() =>
    kycCddProcedures.filter(p => p.status.includes('Déployé')).length,
    []
  );

  const kycPartial = useMemo(() =>
    kycCddProcedures.filter(p => p.status.includes('Partiel')).length,
    []
  );

  const alignmentConforme = useMemo(() =>
    bceaoCobacOhadaAlignment.filter(a => a.status === 'Conforme').length,
    []
  );

  const alignmentPartiel = useMemo(() =>
    bceaoCobacOhadaAlignment.filter(a => a.status === 'Partiel').length,
    []
  );

  const smsiAdopted = useMemo(() =>
    iso27001SmsiDocs.filter(d => d.status.includes('Adopt')).length,
    []
  );

  const smsiDraft = useMemo(() =>
    iso27001SmsiDocs.filter(d => d.status.includes('Brouillon')).length,
    []
  );

  const smsiMissing = useMemo(() =>
    iso27001SmsiDocs.filter(d => d.status.includes('créer')).length,
    []
  );

  const auditNcResolved = useMemo(() =>
    iso27001InternalAudit.resolved.total,
    []
  );

  const auditNcTotal = useMemo(() =>
    iso27001InternalAudit.non_conformities.total,
    []
  );

  return {
    isLive,
    loading,
    kycCddProcedures,
    lcbfRiskMapping,
    cemacAdaptation,
    bceaoCobacOhadaAlignment,
    iso27001SmsiDocs,
    iso27001RiskAssessment,
    iso27001InternalAudit,
    certificationPlan,
    complianceSecurityStats,
    quarterlyMilestones,
    totalActions,
    completedActions,
    inProgressActions,
    plannedActions,
    progressPercent,
    kycDeployed,
    kycPartial,
    alignmentConforme,
    alignmentPartiel,
    smsiAdopted,
    smsiDraft,
    smsiMissing,
    auditNcResolved,
    auditNcTotal
  };
}



