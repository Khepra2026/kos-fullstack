import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface FunnelAutomationResult {
  leadId: string;
  sequence: string;
  status: 'enrolled' | 'skipped' | 'error';
  error?: string;
}

export interface FunnelAutomationSummary {
  leadsScanned: number;
  leadsEnrolled: number;
  emailsTriggered: number;
  errors: string[];
  sequences: { leadId: string; sequence: string; step: number }[];
}

const NURTURING_SEQUENCES = [
  {
    id: 'educational',
    lead_magnet_slug: 'nurturing-educational',
    totalSteps: 5,
    minScore: 35,
    maxScore: 49,
    name: 'Éducatif',
  },
  {
    id: 'case_study',
    lead_magnet_slug: 'nurturing-case-study',
    totalSteps: 4,
    minScore: 50,
    maxScore: 64,
    name: 'Cas Clients',
  },
  {
    id: 'proposition',
    lead_magnet_slug: 'nurturing-proposition',
    totalSteps: 4,
    minScore: 65,
    maxScore: 80,
    name: 'Proposition',
  },
  {
    id: 'relance',
    lead_magnet_slug: 'nurturing-relance',
    totalSteps: 3,
    minScore: 50,
    maxScore: 100,
    name: 'Relance',
    dormantDays: 21,
  },
];

function determineSequence(lead: Record<string, unknown>): (typeof NURTURING_SEQUENCES)[0] | null {
  const score = (lead.lead_score as number) || 0;
  const daysSince = lead.last_activity_at
    ? Math.floor(
        (Date.now() - new Date(String(lead.last_activity_at)).getTime()) / (1000 * 60 * 60 * 24),
      )
    : 30;

  if (daysSince > 21 && score > 50) {
    return NURTURING_SEQUENCES.find((s) => s.id === 'relance') || null;
  }
  if (score >= 65) {
    return NURTURING_SEQUENCES.find((s) => s.id === 'proposition') || null;
  }
  if (score >= 50) {
    return NURTURING_SEQUENCES.find((s) => s.id === 'case_study') || null;
  }
  if (score >= 35) {
    return NURTURING_SEQUENCES.find((s) => s.id === 'educational') || null;
  }
  return null;
}

export function useEmailFunnelAutomation() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<FunnelAutomationResult[]>([]);
  const [summary, setSummary] = useState<FunnelAutomationSummary | null>(null);
  const [lastRunAt, setLastRunAt] = useState<string | null>(null);

  const runAutomation = useCallback(
    async (options: {
      mode?: 'auto' | 'batch';
      lead_ids?: string[];
      sequence_id?: string;
      forceImmediate?: boolean;
    } = {}) => {
      const { mode = 'auto', lead_ids, sequence_id, forceImmediate = true } = options;

      setLoading(true);
      setProgress(0);
      setResults([]);
      setSummary(null);

      const now = new Date();
      const allResults: FunnelAutomationResult[] = [];
      const sequences: { leadId: string; sequence: string; step: number }[] = [];
      const errors: string[] = [];
      let leadsEnrolled = 0;

      try {
        let leadsToProcess: Record<string, unknown>[] = [];

        if (mode === 'batch' && Array.isArray(lead_ids) && lead_ids.length > 0) {
          const { data: specificLeads, error: leadsError } = await supabase
            .from('leads')
            .select('*')
            .in('id', lead_ids)
            .order('lead_score', { ascending: false });
          if (leadsError) throw leadsError;
          leadsToProcess = specificLeads || [];
        } else {
          const { data: activeLeads, error: leadsError } = await supabase
            .from('leads')
            .select('*')
            .in('pipeline_stage', ['new_lead', 'contact_engaged', 'lead_hot'])
            .is('meeting_scheduled_at', null)
            .gte('lead_score', 35)
            .order('lead_score', { ascending: false })
            .limit(500);
          if (leadsError) throw leadsError;
          leadsToProcess = activeLeads || [];
        }

        const totalLeads = leadsToProcess.length;

        for (let i = 0; i < leadsToProcess.length; i++) {
          const lead = leadsToProcess[i];
          const leadId = lead.id as string;
          setProgress(Math.round(((i + 1) / totalLeads) * 100));

          const { data: existingEnrollment } = await supabase
            .from('email_sequence_enrollments')
            .select('id')
            .eq('lead_id', leadId)
            .eq('status', 'active')
            .maybeSingle();

          if (existingEnrollment) {
            allResults.push({ leadId, sequence: '', status: 'skipped' });
            continue;
          }

          const sequence = sequence_id
            ? NURTURING_SEQUENCES.find((s) => s.id === sequence_id)
            : determineSequence(lead);

          if (!sequence) {
            allResults.push({
              leadId,
              sequence: '',
              status: 'error',
              error: 'Aucune séquence appropriée',
            });
            continue;
          }

          const nextSendAt = new Date(
            now.getTime() + (forceImmediate ? 5 * 60 * 1000 : 60 * 60 * 1000),
          );

          const { error: insertError } = await supabase
            .from('email_sequence_enrollments')
            .insert({
              lead_id: leadId,
              sequence_id: sequence.id,
              lead_magnet_slug: sequence.lead_magnet_slug,
              current_step: 0,
              total_steps: sequence.totalSteps,
              status: 'active',
              next_send_at: nextSendAt.toISOString(),
              created_at: now.toISOString(),
              updated_at: now.toISOString(),
            });

          if (insertError) {
            errors.push(`${leadId}: ${insertError.message}`);
            allResults.push({
              leadId,
              sequence: sequence.id,
              status: 'error',
              error: insertError.message,
            });
            continue;
          }

          await supabase.from('lead_activities').insert({
            lead_id: leadId,
            activity_type: 'nurturing_sequence_enrolled',
            metadata: {
              sequence_id: sequence.id,
              sequence_name: sequence.lead_magnet_slug,
              total_steps: sequence.totalSteps,
              trigger: mode === 'auto' ? 'automation_engine' : 'manual_batch',
            },
          });

          await supabase
            .from('leads')
            .update({
              email_sequence: [sequence.id],
              updated_at: now.toISOString(),
            })
            .eq('id', leadId);

          allResults.push({ leadId, sequence: sequence.id, status: 'enrolled' });
          sequences.push({ leadId, sequence: sequence.id, step: 1 });
          leadsEnrolled++;
        }

        let emailsTriggered = 0;
        if (leadsEnrolled > 0) {
          try {
            const { data: funnelResult } = await supabase.functions.invoke(
              'email-funnel-sequence',
              {
                body: {
                  force: true,
                  sequence_type: 'nurturing',
                  immediate: forceImmediate,
                },
              },
            );
            emailsTriggered = funnelResult?.results?.emailsSent || 0;
          } catch (triggerErr) {
            console.error('Erreur trigger email-funnel-sequence:', triggerErr);
            errors.push(`Trigger: ${triggerErr instanceof Error ? triggerErr.message : 'Erreur'}`);
          }
        }

        setSummary({
          leadsScanned: totalLeads,
          leadsEnrolled,
          emailsTriggered,
          errors,
          sequences,
        });

        setLastRunAt(now.toISOString());
        setProgress(100);
        return { success: true, summary: { leadsScanned: totalLeads, leadsEnrolled, emailsTriggered, errors, sequences } };
      } catch (err) {
        console.error('Erreur automation:', err);
        setSummary({
          leadsScanned: 0,
          leadsEnrolled: 0,
          emailsTriggered: 0,
          errors: [err instanceof Error ? err.message : 'Erreur inconnue'],
          sequences: [],
        });
        return { success: false, error: err instanceof Error ? err.message : 'Erreur inconnue' };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const runSequenceBatch = useCallback(
    async (sequenceId: string, leadIds?: string[]) => {
      return runAutomation({
        mode: 'batch',
        sequence_id: sequenceId,
        lead_ids: leadIds,
        forceImmediate: true,
      });
    },
    [runAutomation],
  );

  const reset = useCallback(() => {
    setLoading(false);
    setProgress(0);
    setResults([]);
    setSummary(null);
  }, []);

  return {
    loading,
    progress,
    results,
    summary,
    lastRunAt,
    runAutomation,
    runSequenceBatch,
    reset,
  };
}