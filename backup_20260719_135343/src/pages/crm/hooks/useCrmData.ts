import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface CrmLead {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  position: string | null;
  sector: string | null;
  country: string | null;
  subject: string | null;
  message: string | null;
  source_page: string | null;
  form_type: string | null;
  pipeline_stage: string;
  status: string;
  lead_score: number | null;
  lead_category: string | null;
  assigned_expert: string | null;
  notes: string | null;
  last_activity_at: string | null;
  next_follow_up_at: string | null;
  follow_up_count: number;
  hot_detected_at: string | null;
  hot_reason: string | null;
  estimated_value: string | null;
  deal_value: number | null;
  probability: number;
  email_1_sent_at: string | null;
  email_1_opened: boolean | null;
  email_2_sent_at: string | null;
  email_2_opened: boolean | null;
  email_3_sent_at: string | null;
  email_3_opened: boolean | null;
  calendar_link_clicked: boolean | null;
  meeting_scheduled_at: string | null;
  score_breakdown: Record<string, number> | null;
  recommendations: string[] | null;
}

export interface LeadActivity {
  id: string;
  lead_id: string;
  activity_type: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface PipelineStage {
  id: string;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  count: number;
  value: number;
}

export const PIPELINE_STAGES: PipelineStage[] = [
  { id: 'lead_generated', label: 'Lead Généré', color: 'text-slate-700', bgColor: 'bg-slate-100', borderColor: 'border-slate-300', count: 0, value: 0 },
  { id: 'lead_qualified', label: 'Lead Qualifié', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', count: 0, value: 0 },
  { id: 'contact_engaged', label: 'Contact Engagé', color: 'text-indigo-700', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200', count: 0, value: 0 },
  { id: 'lead_hot', label: 'Lead Chaud', color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', count: 0, value: 0 },
  { id: 'meeting_scheduled', label: 'RDV Fixé', color: 'text-orange-700', bgColor: 'bg-orange-50', borderColor: 'border-orange-200', count: 0, value: 0 },
  { id: 'proposal_sent', label: 'Proposition Envoyée', color: 'text-teal-700', bgColor: 'bg-teal-50', borderColor: 'border-teal-200', count: 0, value: 0 },
  { id: 'mission_signed', label: 'Mission Signée', color: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', count: 0, value: 0 },
  { id: 'mission_in_progress', label: 'Mission En Cours', color: 'text-cyan-700', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-200', count: 0, value: 0 },
  { id: 'client_active', label: 'Client Actif', color: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-200', count: 0, value: 0 },
  { id: 'client_recurring', label: 'Client Récurrent / Upsell', color: 'text-lime-700', bgColor: 'bg-lime-50', borderColor: 'border-lime-200', count: 0, value: 0 },
];

export interface CrmStats {
  totalLeads: number;
  hotLeads: number;
  leadsThisWeek: number;
  avgDealValue: number;
  pipelineValue: number;
  conversionRate: number;
  followUpsPending: number;
  meetingsScheduled: number;
  proposalsSent: number;
  missionsSigned: number;
  avgLeadScore: number;
  responseRate: number;
}

export function useCrmData() {
  const [leads, setLeads] = useState<CrmLead[]>([]);
  const [activities, setActivities] = useState<Record<string, LeadActivity[]>>();
  const [stats, setStats] = useState<CrmStats | null>(null);
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>(PIPELINE_STAGES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(null);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (leadsError) throw leadsError;
      const allLeads = data || [];
      setLeads(allLeads);

      // Calculer les stats du pipeline
      const stages = PIPELINE_STAGES.map((stage) => {
        const stageLeads = allLeads.filter((l) => l.pipeline_stage === stage.id);
        return {
          ...stage,
          count: stageLeads.length,
          value: stageLeads.reduce((sum, l) => sum + (l.deal_value || 0) * (l.probability || 0) / 100, 0),
        };
      });
      setPipelineStages(stages);

      // Calculer les stats globales
      const totalLeads = allLeads.length;
      const hotLeads = allLeads.filter((l) => l.pipeline_stage === 'lead_hot').length;
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const leadsThisWeek = allLeads.filter((l) => l.created_at >= oneWeekAgo).length;
      const dealValues = allLeads.filter((l) => l.deal_value).map((l) => l.deal_value!);
      const avgDealValue = dealValues.length > 0 ? dealValues.reduce((a, b) => a + b, 0) / dealValues.length : 0;
      const pipelineValue = allLeads.reduce((sum, l) => sum + (l.deal_value || 0) * (l.probability || 0) / 100, 0);
      const converted = allLeads.filter((l) => ['mission_signed', 'mission_in_progress', 'client_active', 'client_recurring'].includes(l.pipeline_stage)).length;
      const conversionRate = totalLeads > 0 ? (converted / totalLeads) * 100 : 0;
      const followUpsPending = allLeads.filter((l) => l.next_follow_up_at && l.next_follow_up_at <= new Date().toISOString()).length;
      const meetingsScheduled = allLeads.filter((l) => l.meeting_scheduled_at).length;
      const proposalsSent = allLeads.filter((l) => l.pipeline_stage === 'proposal_sent').length;
      const missionsSigned = allLeads.filter((l) => l.pipeline_stage === 'mission_signed').length;
      const scores = allLeads.filter((l) => l.lead_score).map((l) => l.lead_score!);
      const avgLeadScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
      const responded = allLeads.filter((l) => l.last_activity_at && l.email_1_opened).length;
      const responseRate = totalLeads > 0 ? (responded / totalLeads) * 100 : 0;

      setStats({
        totalLeads,
        hotLeads,
        leadsThisWeek,
        avgDealValue,
        pipelineValue,
        conversionRate,
        followUpsPending,
        meetingsScheduled,
        proposalsSent,
        missionsSigned,
        avgLeadScore,
        responseRate,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement CRM');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadActivities = useCallback(async (leadId: string) => {
    try {
      const { data, error: actError } = await supabase
        .from('lead_activities')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: false });

      if (actError) throw actError;
      setActivities((prev) => ({ ...prev, [leadId]: data || [] }));
    } catch (err) {
      console.error('Erreur chargement activités:', err);
    }
  }, []);

  const updateLeadStage = useCallback(async (leadId: string, newStage: string) => {
    try {
      const { error: updateError } = await supabase
        .from('leads')
        .update({
          pipeline_stage: newStage,
          last_activity_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', leadId);

      if (updateError) throw updateError;

      // Créer une activité de changement de statut
      await supabase.from('lead_activities').insert({
        lead_id: leadId,
        activity_type: 'status_change',
        metadata: { new_stage: newStage, changed_at: new Date().toISOString() },
      });

      // Mettre à jour le state local
      setLeads((prev) =>
        prev.map((l) =>
          l.id === leadId
            ? { ...l, pipeline_stage: newStage, last_activity_at: new Date().toISOString() }
            : l
        )
      );

      // Recalculer les stats
      loadLeads();
      return true;
    } catch (err) {
      console.error('Erreur mise à jour statut:', err);
      return false;
    }
  }, [loadLeads]);

  const addNote = useCallback(async (leadId: string, note: string) => {
    try {
      const lead = leads.find((l) => l.id === leadId);
      const existingNotes = lead?.notes || '';
      const newNotes = existingNotes ? `${existingNotes}\n\n[${new Date().toLocaleString('fr-FR')}] ${note}` : `[${new Date().toLocaleString('fr-FR')}] ${note}`;

      const { error: updateError } = await supabase
        .from('leads')
        .update({ notes: newNotes, updated_at: new Date().toISOString() })
        .eq('id', leadId);

      if (updateError) throw updateError;

      await supabase.from('lead_activities').insert({
        lead_id: leadId,
        activity_type: 'note_added',
        metadata: { note },
      });

      setLeads((prev) =>
        prev.map((l) =>
          l.id === leadId ? { ...l, notes: newNotes } : l
        )
      );
      return true;
    } catch (err) {
      console.error('Erreur ajout note:', err);
      return false;
    }
  }, [leads]);

  const triggerFollowUp = useCallback(async (leadId: string) => {
    try {
      const { error } = await supabase.functions.invoke('process-lead-submission', {
        body: { action: 'follow_up', lead_ids: [leadId], force: true }
      });
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Erreur relance manuelle:', err);
      return false;
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  return {
    leads,
    activities,
    stats,
    pipelineStages,
    loading,
    error,
    selectedLead,
    setSelectedLead,
    loadLeads,
    loadActivities,
    updateLeadStage,
    addNote,
    triggerFollowUp,
  };
}


export const useCrmData = { id: 1, label: "Stub data" }; // stub



