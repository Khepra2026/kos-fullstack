import { useState, useMemo, useEffect } from 'react';
import { checkTableHealth } from '@/hooks/utils/hookMigration';
import { kosRexTemplateData } from '@/mocks/kosRexTemplate';

export function useKOSRexTemplate() {
  const [data] = useState(kosRexTemplateData);
  const [showRules, setShowRules] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<string | null>('J0-J15 — Diagnostic');
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    checkTableHealth('kos_execution_logs').then(setIsLive);
  }, []);

  const toggleRules = () => setShowRules(prev => !prev);
  const togglePhase = (phaseId: string) => setExpandedPhase(prev => prev === phaseId ? null : phaseId);

  const bigFourScore = useMemo(() => {
    const passed = data.checklistBigFour.filter(c => c.statut).length;
    return Math.round((passed / data.checklistBigFour.length) * 100);
  }, [data.checklistBigFour]);

  const redFlagsCount = useMemo(() => data.rex.redFlags.filter(rf => rf.coche).length, [data.rex.redFlags]);

  return {
    data,
    isLive,
    showRules,
    toggleRules,
    expandedPhase,
    togglePhase,
    bigFourScore,
    redFlagsCount,
  };
}