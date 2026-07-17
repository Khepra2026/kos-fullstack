import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { mqlNurturingLeads, mqlNurturingStats, nurturingSequences, MQLNurturingLead } from '@/mocks/mqlNurturing';

export interface NurturingSequence {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  textColor: string;
  targetScoreRange: string;
  steps: {
    step: number;
    name: string;
    delayHours: number;
    subject: string;
    type: string;
  }[];
}

export interface NurturingStats {
  totalMQLWithoutFollowUp: number;
  inEducationalSequence: number;
  inCaseStudySequence: number;
  inProposalSequence: number;
  inRelanceSequence: number;
  avgDaysSinceLastContact: number;
  totalPipelineValue: number;
  emailOpenRate: number;
  emailClickRate: number;
  conversionToMeeting: number;
  hotLeadsDetected: number;
}

export function useMQLNurturing() {
  const [leads, setLeads] = useState<MQLNurturingLead[]>([]);
  const [stats, setStats] = useState<NurturingStats>(mqlNurturingStats);
  const [sequences, setSequences] = useState<NurturingSequence[]>(nurturingSequences);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSequence, setSelectedSequence] = useState<string>('all');
  const [activeLeads, setActiveLeads] = useState<string[]>([]);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .in('pipeline_stage', ['contact_engaged', 'lead_hot', 'new_lead'])
        .is('meeting_scheduled_at', null)
        .gte('lead_score', 35)
        .order('lead_score', { ascending: false });

      if (leadsError) throw leadsError;

      const enriched = (data || []).map((lead: Record<string, unknown>) => {
        const daysSince = lead.last_activity_at
          ? Math.floor((Date.now() - new Date(String(lead.last_activity_at)).getTime()) / (1000 * 60 * 60 * 24))
          : 30;
        const score = (lead.lead_score as number) || 0;
        let sequence = 'educational';
        if (daysSince > 21 && score > 50) sequence = 'relance';
        else if (score >= 65) sequence = 'proposition';
        else if (score >= 50) sequence = 'case_study';
        else sequence = 'educational';

        return {
          id: String(lead.id),
          full_name: String(lead.full_name || ''),
          email: String(lead.email || ''),
          organization: String(lead.organization || ''),
          position: String(lead.position || ''),
          sector: String(lead.sector || ''),
          country: String(lead.country || ''),
          lead_score: score,
          pipeline_stage: String(lead.pipeline_stage || 'contact_engaged'),
          source_page: String(lead.source_page || ''),
          form_type: String(lead.form_type || ''),
          last_activity_at: String(lead.last_activity_at || ''),
          days_since_last_activity: daysSince,
          nurturing_sequence: sequence,
          nurturing_step: 1,
          nurturing_status: 'active' as const,
          email_opens: 0,
          email_clicks: 0,
          deal_value: (lead.deal_value as number) || 0,
          next_best_action: getNextBestAction(score, sequence),
          priority: getPriority(score),
        };
      });

      setLeads(enriched.length > 0 ? enriched : mqlNurturingLeads);
    } catch (err) {
      setLeads(mqlNurturingLeads);
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, []);

  const enrollInSequence = useCallback(async (leadId: string, sequenceId: string) => {
    try {
      const { error: updateError } = await supabase
        .from('leads')
        .update({
          nurturing_sequence: sequenceId,
          nurturing_status: 'active',
          nurturing_step: 1,
          updated_at: new Date().toISOString(),
        })
        .eq('id', leadId);
      if (updateError) throw updateError;

      await supabase.from('lead_activities').insert({
        lead_id: leadId,
        activity_type: 'nurturing_sequence_started',
        metadata: { sequence_id: sequenceId, step: 1 },
      });

      setLeads((prev) =>
        prev.map((l) =>
          l.id === leadId
            ? { ...l, nurturing_sequence: sequenceId, nurturing_status: 'active', nurturing_step: 1 }
            : l
        )
      );
      return true;
    } catch (err) {
      console.error('Erreur enrollment:', err);
      return false;
    }
  }, []);

  const advanceStep = useCallback(async (leadId: string) => {
    try {
      const lead = leads.find((l) => l.id === leadId);
      if (!lead) return false;
      const nextStep = lead.nurturing_step + 1;
      const { error: updateError } = await supabase
        .from('leads')
        .update({
          nurturing_step: nextStep,
          updated_at: new Date().toISOString(),
        })
        .eq('id', leadId);
      if (updateError) throw updateError;

      await supabase.from('lead_activities').insert({
        lead_id: leadId,
        activity_type: 'nurturing_step_advanced',
        metadata: { sequence: lead.nurturing_sequence, new_step: nextStep },
      });

      setLeads((prev) =>
        prev.map((l) =>
          l.id === leadId ? { ...l, nurturing_step: nextStep } : l
        )
      );
      return true;
    } catch (err) {
      console.error('Erreur avancement:', err);
      return false;
    }
  }, [leads]);

  const pauseSequence = useCallback(async (leadId: string) => {
    try {
      await supabase.from('leads').update({ nurturing_status: 'paused' }).eq('id', leadId);
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, nurturing_status: 'paused' } : l))
      );
      return true;
    } catch (err) {
      console.error('Erreur pause:', err);
      return false;
    }
  }, []);

  const triggerSequenceBatch = useCallback(async (sequenceId: string) => {
    try {
      const leadsInSequence = leads.filter((l) => l.nurturing_sequence === sequenceId);
      const leadIds = leadsInSequence.map((l) => l.id);
      if (leadIds.length === 0) return false;

      await supabase.functions.invoke('email-funnel-sequence', {
        body: {
          sequence_type: 'nurturing',
          sequence_id: sequenceId,
          lead_ids: leadIds,
          force: true,
        },
      });
      return true;
    } catch (err) {
      console.error('Erreur batch:', err);
      return false;
    }
  }, [leads]);

  const getFilteredLeads = useCallback(() => {
    if (selectedSequence === 'all') return leads;
    return leads.filter((l) => l.nurturing_sequence === selectedSequence);
  }, [leads, selectedSequence]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  return {
    leads,
    stats,
    sequences,
    loading,
    error,
    selectedSequence,
    setSelectedSequence,
    activeLeads,
    setActiveLeads,
    loadLeads,
    enrollInSequence,
    advanceStep,
    pauseSequence,
    triggerSequenceBatch,
    getFilteredLeads,
  };
}

function getNextBestAction(score: number, sequence: string): string {
  if (sequence === 'proposition') {
    if (score >= 75) return 'Envoyer offre personnalisée immédiatement';
    return 'Proposer diagnostic flash gratuit';
  }
  if (sequence === 'case_study') return 'Partager témoignage client du même secteur';
  if (sequence === 'relance') return 'Envoyer offre limitée ou break-up';
  return 'Envoyer contenu éducatif sectoriel';
}

function getPriority(score: number): 'P0' | 'P1' | 'P2' | 'P3' {
  if (score >= 75) return 'P0';
  if (score >= 65) return 'P1';
  if (score >= 50) return 'P2';
  return 'P3';
}