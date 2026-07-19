import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  BIGFOUR_WEB_AUDIT,
  BIGFOUR_DOMAIN_SUMMARIES,
  type BigFourWebResourcesAudit,
  type AuditDomainSummary,
  type AuditNonConformite,
  type AuditRisque,
  type AuditCorrection,
  type AuditAutoapprentissage,
} from '@/mocks/bigFourWebResourcesAudit';

interface BigFourReviewState {
  audit: BigFourWebResourcesAudit;
  domainSummaries: AuditDomainSummary[];
  nonConformites: AuditNonConformite[];
  risques: AuditRisque[];
  corrections: AuditCorrection[];
  autoapprentissages: AuditAutoapprentissage[];
  loading: boolean;
  error: string | null;
}

const initialState: BigFourReviewState = {
  audit: BIGFOUR_WEB_AUDIT,
  domainSummaries: BIGFOUR_DOMAIN_SUMMARIES,
  nonConformites: BIGFOUR_WEB_AUDIT.non_conformites,
  risques: BIGFOUR_WEB_AUDIT.risques,
  corrections: BIGFOUR_WEB_AUDIT.corrections,
  autoapprentissages: BIGFOUR_WEB_AUDIT.autoapprentissages,
  loading: false,
  error: null,
};

export function useBigFourWebResourcesReview() {
  const [state, setState] = useState<BigFourReviewState>(initialState);
  const [isLive, setIsLive] = useState(false);

  const refresh = useCallback(() => {
    setState({
      audit: BIGFOUR_WEB_AUDIT,
      domainSummaries: BIGFOUR_DOMAIN_SUMMARIES,
      nonConformites: BIGFOUR_WEB_AUDIT.non_conformites,
      risques: BIGFOUR_WEB_AUDIT.risques,
      corrections: BIGFOUR_WEB_AUDIT.corrections,
      autoapprentissages: BIGFOUR_WEB_AUDIT.autoapprentissages,
      loading: false,
      error: null,
    });
    const checkSupabase = async () => {
      try {
        const { data } = await supabase.from('audit_reports').select('id').limit(1);
        if (data && data.length > 0) setIsLive(true);
      } catch { /* mock fallback */ }
    };
    checkSupabase();
  }, []);

  useEffect(() => {
    refresh();
    const checkSupabase = async () => {
      try {
        const { data } = await supabase.from('audit_reports').select('id').limit(1);
        if (data && data.length > 0) setIsLive(true);
      } catch { /* mock fallback */ }
    };
    checkSupabase();
  }, [refresh]);

  const ncs = state.nonConformites;
  const p0Count = ncs.filter(n => n.severite === 'critique' && n.statut === 'ouvert').length;
  const p1Count = ncs.filter(n => n.severite === 'élevé' && n.statut === 'ouvert').length;
  const ouvertes = ncs.filter(n => n.statut === 'ouvert').length;
  const corrigees = ncs.filter(n => n.statut === 'corrige').length;
  const autoCorrigeables = ncs.filter(n => n.auto_corrigeable && n.statut === 'ouvert').length;

  // Risques par criticité
  const risquesCritiques = state.risques.filter(r => r.criticite >= 20).length;
  const risquesEleves = state.risques.filter(r => r.criticite >= 15 && r.criticite < 20).length;

  // Règles apprises
  const rulesCount = state.autoapprentissages.length;
  const totalRecurrence = state.autoapprentissages.reduce((sum, l) => sum + l.recurrence, 0);

  return {
    ...state,
    p0Count,
    p1Count,
    ouvertes,
    corrigees,
    autoCorrigeables,
    risquesCritiques,
    risquesEleves,
    rulesCount,
    totalRecurrence,
    refresh,
    isLive,
  };
}



