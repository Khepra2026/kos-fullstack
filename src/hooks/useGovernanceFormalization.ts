import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import {
  nominatedOfficers,
  auditCommittees,
  formalCharters,
  correctivePlan,
  quarterlyKPIs,
  gouvernanceStats,
  quarterlyCommitteeCalendar
} from '@/mocks/kosGovernanceFormalization';

export function useGovernanceFormalization() {
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300);
    supabase.from('regulators').select('id').limit(1).then(({ error }) => {
      setIsLive(!error);
    }).catch(() => setIsLive(false));
    return () => clearTimeout(t);
  }, []);

  const completedActions = useMemo(() =>
    correctivePlan.pillars.reduce((sum, p) => sum + p.actions.filter(a => a.status === 'Terminé').length, 0),
    []
  );

  const totalActions = useMemo(() =>
    correctivePlan.pillars.reduce((sum, p) => sum + p.actions.length, 0),
    []
  );

  const criticalActions = useMemo(() =>
    correctivePlan.pillars.reduce((sum, p) => sum + p.actions.filter(a => a.priorite.includes('P0')).length, 0),
    []
  );

  const progressPercent = useMemo(() =>
    totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0,
    [completedActions, totalActions]
  );

  return {
    loading,
    isLive,
    nominatedOfficers,
    auditCommittees,
    formalCharters,
    correctivePlan,
    quarterlyKPIs,
    gouvernanceStats,
    quarterlyCommitteeCalendar,
    completedActions,
    totalActions,
    criticalActions,
    progressPercent
  };
}