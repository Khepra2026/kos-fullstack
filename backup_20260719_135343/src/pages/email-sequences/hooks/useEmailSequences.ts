import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface SequenceEnrollment {
  id: string;
  lead_id: string;
  sequence_id: string;
  lead_magnet_slug: string;
  current_step: number;
  total_steps: number;
  status: 'active' | 'completed' | 'paused' | 'unsubscribed';
  next_send_at: string | null;
  last_sent_at: string | null;
  completed_at: string | null;
  unsubscribed_at: string | null;
  opened_count: number;
  clicked_count: number;
  conversion_event: string | null;
  created_at: string;
  updated_at: string;
  lead?: {
    id: string;
    full_name: string;
    email: string;
    organization: string | null;
    pipeline_stage: string | null;
    lead_score: number | null;
  };
}

export interface SequenceStats {
  totalEnrollments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  unsubscribedEnrollments: number;
  totalEmailsSent: number;
  totalEmailsOpened: number;
  totalEmailsClicked: number;
  avgOpenRate: number;
  avgClickRate: number;
  conversionRate: number;
  sequencesByLeadMagnet: Record<string, number>;
}

export interface EmailTemplate {
  id: string;
  template_key: string;
  subject: string;
  html_body: string;
  text_body: string | null;
  send_delay_hours: number | null;
}

export const SEQUENCE_NAMES: Record<string, string> = {
  'checklist-conformite-bceao-cobac': 'Checklist Conformité BCEAO/COBAC',
  'guide-levee-fonds-afrique': 'Guide Levée de Fonds',
  'simulation-risque-reglementaire': 'Simulation Risque Réglementaire',
  'template-audit-gouvernance': 'Template Audit Gouvernance',
  'mini-rapport-due-diligence': 'Mini Rapport Due Diligence',
  'diagnostic-esg-maturite': 'Diagnostic ESG Maturité',
};

export const SEQUENCE_COLORS: Record<string, string> = {
  'checklist-conformite-bceao-cobac': '#c9a227',
  'guide-levee-fonds-afrique': '#22a05a',
  'simulation-risque-reglementaire': '#c9a227',
  'template-audit-gouvernance': '#22a05a',
  'mini-rapport-due-diligence': '#22a05a',
  'diagnostic-esg-maturite': '#22a05a',
};

export function useEmailSequences() {
  const [enrollments, setEnrollments] = useState<SequenceEnrollment[]>([]);
  const [stats, setStats] = useState<SequenceStats | null>(null);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSequence, setSelectedSequence] = useState<string>('all');

  const loadEnrollments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('email_sequence_enrollments')
        .select('*, leads:lead_id(id, full_name, email, organization, pipeline_stage, lead_score)')
        .order('created_at', { ascending: false });

      if (selectedSequence !== 'all') {
        query = query.eq('lead_magnet_slug', selectedSequence);
      }

      const { data, error: enrollError } = await query.limit(200);

      if (enrollError) throw enrollError;
      setEnrollments(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [selectedSequence]);

  const loadStats = useCallback(async () => {
    try {
      const { data: allEnrollments, error: err1 } = await supabase
        .from('email_sequence_enrollments')
        .select('*');
      if (err1) throw err1;

      const { data: allActivities, error: err2 } = await supabase
        .from('lead_activities')
        .select('*')
        .in('activity_type', ['email_opened', 'email_clicked']);
      if (err2) throw err2;

      const enrolls = allEnrollments || [];
      const activities = allActivities || [];

      const totalEnrollments = enrolls.length;
      const activeEnrollments = enrolls.filter((e) => e.status === 'active').length;
      const completedEnrollments = enrolls.filter((e) => e.status === 'completed').length;
      const unsubscribedEnrollments = enrolls.filter((e) => e.status === 'unsubscribed').length;

      const totalEmailsSent = enrolls.reduce((sum, e) => sum + e.current_step, 0);
      const totalEmailsOpened = activities.filter((a) => a.activity_type === 'email_opened').length;
      const totalEmailsClicked = activities.filter((a) => a.activity_type === 'email_clicked').length;

      const avgOpenRate = totalEmailsSent > 0 ? (totalEmailsOpened / totalEmailsSent) * 100 : 0;
      const avgClickRate = totalEmailsSent > 0 ? (totalEmailsClicked / totalEmailsSent) * 100 : 0;
      const converted = enrolls.filter((e) => e.conversion_event).length;
      const conversionRate = totalEnrollments > 0 ? (converted / totalEnrollments) * 100 : 0;

      const sequencesByLeadMagnet: Record<string, number> = { id: 1, label: "Stub data" };
      enrolls.forEach((e) => {
        sequencesByLeadMagnet[e.lead_magnet_slug] = (sequencesByLeadMagnet[e.lead_magnet_slug] || 0) + 1;
      });

      setStats({
        totalEnrollments,
        activeEnrollments,
        completedEnrollments,
        unsubscribedEnrollments,
        totalEmailsSent,
        totalEmailsOpened,
        totalEmailsClicked,
        avgOpenRate,
        avgClickRate,
        conversionRate,
        sequencesByLeadMagnet,
      });
    } catch (err) {
      console.error('Erreur stats:', err);
    }
  }, []);

  const loadTemplates = useCallback(async () => {
    try {
      const { data, error: err } = await supabase
        .from('email_templates')
        .select('*')
        .like('template_key', 'funnel_%')
        .eq('is_active', true)
        .order('template_key', { ascending: true });

      if (err) throw err;
      setTemplates(data || []);
    } catch (err) {
      console.error('Erreur templates:', err);
    }
  }, []);

  const enrollLead = useCallback(async (leadId: string, leadMagnetSlug: string) => {
    try {
      const sequenceId = `seq-${leadMagnetSlug}`;
      const { error: insertError } = await supabase
        .from('email_sequence_enrollments')
        .insert({
          lead_id: leadId,
          sequence_id: sequenceId,
          lead_magnet_slug: leadMagnetSlug,
          total_steps: 7,
          current_step: 0,
          status: 'active',
          next_send_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min après
        });

      if (insertError) throw insertError;

      // Activité
      await supabase.from('lead_activities').insert({
        lead_id: leadId,
        activity_type: 'email_sequence_started',
        metadata: { sequence_id: sequenceId, lead_magnet_slug: leadMagnetSlug },
      });

      await loadEnrollments();
      await loadStats();
      return true;
    } catch (err) {
      console.error('Erreur enrollment:', err);
      return false;
    }
  }, [loadEnrollments, loadStats]);

  const pauseEnrollment = useCallback(async (enrollmentId: string) => {
    try {
      await supabase
        .from('email_sequence_enrollments')
        .update({ status: 'paused', updated_at: new Date().toISOString() })
        .eq('id', enrollmentId);
      await loadEnrollments();
      return true;
    } catch (err) {
      console.error('Erreur pause:', err);
      return false;
    }
  }, [loadEnrollments]);

  const resumeEnrollment = useCallback(async (enrollmentId: string) => {
    try {
      await supabase
        .from('email_sequence_enrollments')
        .update({
          status: 'active',
          next_send_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', enrollmentId);
      await loadEnrollments();
      return true;
    } catch (err) {
      console.error('Erreur resume:', err);
      return false;
    }
  }, [loadEnrollments]);

  const unsubscribeEnrollment = useCallback(async (enrollmentId: string) => {
    try {
      await supabase
        .from('email_sequence_enrollments')
        .update({
          status: 'unsubscribed',
          unsubscribed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', enrollmentId);
      await loadEnrollments();
      await loadStats();
      return true;
    } catch (err) {
      console.error('Erreur unsubscribe:', err);
      return false;
    }
  }, [loadEnrollments, loadStats]);

  const triggerManualSend = useCallback(async (enrollmentId: string) => {
    try {
      const { error } = await supabase.functions.invoke('email-funnel-sequence', {
        body: { force_enrollment_id: enrollmentId },
      });
      if (error) throw error;
      await loadEnrollments();
      return true;
    } catch (err) {
      console.error('Erreur envoi manuel:', err);
      return false;
    }
  }, [loadEnrollments]);

  useEffect(() => {
    loadEnrollments();
    loadStats();
    loadTemplates();
  }, [loadEnrollments, loadStats, loadTemplates]);

  return {
    enrollments,
    stats,
    templates,
    loading,
    error,
    selectedSequence,
    setSelectedSequence,
    loadEnrollments,
    loadStats,
    enrollLead,
    pauseEnrollment,
    resumeEnrollment,
    unsubscribeEnrollment,
    triggerManualSend,
  };
}


export const useEmailSequences = { id: 1, label: "Stub data" }; // stub



