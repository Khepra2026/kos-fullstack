import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface ClosingAlert {
  id: string;
  lead_id: string;
  full_name: string;
  email: string;
  organization: string;
  position: string;
  sector: string;
  country: string;
  lead_score: number;
  previous_score: number;
  score_delta: number;
  pipeline_stage: string;
  deal_value: number;
  triggered_at: string;
  alert_type: 'score_threshold' | 'hot_detected' | 'proposal_viewed' | 'meeting_scheduled' | 'email_engaged';
  next_best_action: string;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  is_new: boolean;
}

export interface ClosingStats {
  totalHotLeads: number;
  totalPipelineValue: number;
  avgDealValue: number;
  alertsToday: number;
  newAlerts: number;
  leadsToContact: number;
  proposalsToSend: number;
  meetingsToSchedule: number;
}

export interface ClosingRecommendation {
  id: string;
  lead_id: string;
  full_name: string;
  organization: string;
  score: number;
  deal_value: number;
  action: string;
  urgency: string;
  reason: string;
  estimated_close_probability: number;
}

export function useClosingIntelligence() {
  const [alerts, setAlerts] = useState<ClosingAlert[]>([]);
  const [stats, setStats] = useState<ClosingStats>({
    totalHotLeads: 0,
    totalPipelineValue: 0,
    avgDealValue: 0,
    alertsToday: 0,
    newAlerts: 0,
    leadsToContact: 0,
    proposalsToSend: 0,
    meetingsToSchedule: 0,
  });
  const [recommendations, setRecommendations] = useState<ClosingRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newAlertCount, setNewAlertCount] = useState(0);

  const loadHotLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { data: hotLeads, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .gte('lead_score', 70)
        .in('pipeline_stage', ['new_lead', 'contact_engaged', 'lead_hot', 'meeting_scheduled', 'proposal_sent'])
        .order('lead_score', { ascending: false });

      if (leadsError) throw leadsError;

      const { data: proposals, error: proposalsError } = await supabase
        .from('proposals')
        .select('lead_id, status, viewed_at, sent_at')
        .in('status', ['sent', 'draft']);

      if (proposalsError) throw proposalsError;

      const { data: activities, error: activitiesError } = await supabase
        .from('lead_activities')
        .select('lead_id, activity_type, created_at')
        .in('activity_type', ['email_opened', 'email_clicked', 'calendar_clicked', 'meeting_scheduled', 'proposal_viewed'])
        .gte('created_at', today.toISOString())
        .order('created_at', { ascending: false });

      if (activitiesError) throw activitiesError;

      const processedAlerts: ClosingAlert[] = [];
      const processedRecommendations: ClosingRecommendation[] = [];
      let pipelineValue = 0;
      let leadsToContact = 0;
      let proposalsToSend = 0;
      let meetingsToSchedule = 0;

      (hotLeads || []).forEach((lead) => {
        const leadId = lead.id as string;
        const score = (lead.lead_score as number) || 0;
        const dealValue = (lead.deal_value as number) || 0;
        pipelineValue += dealValue;

        const leadProposals = (proposals || []).filter((p) => p.lead_id === leadId);
        const hasProposal = leadProposals.length > 0;
        const hasViewedProposal = leadProposals.some((p) => p.viewed_at);
        const hasMeeting = !!lead.meeting_scheduled_at;

        const todayActivities = (activities || []).filter((a) => a.lead_id === leadId);
        const hasRecentActivity = todayActivities.length > 0;

        let alertType: ClosingAlert['alert_type'] = 'score_threshold';
        let nextAction = 'Contacter immédiatement';
        let priority: ClosingAlert['priority'] = 'P0';

        if (hasViewedProposal && !hasMeeting) {
          alertType = 'proposal_viewed';
          nextAction = 'Relancer sous 2h — proposition déjà vue';
          proposalsToSend++;
        } else if (hasMeeting) {
          alertType = 'meeting_scheduled';
          nextAction = 'Préparer le diagnostic personnalisé';
          meetingsToSchedule++;
        } else if (hasRecentActivity) {
          alertType = 'email_engaged';
          nextAction = 'Proposer un créneau Calendly';
          leadsToContact++;
        } else if (score >= 80) {
          alertType = 'hot_detected';
          nextAction = 'Appel direct + offre sur mesure';
          leadsToContact++;
        } else {
          alertType = 'score_threshold';
          nextAction = 'Envoyer contenu personnalisé + relance';
          leadsToContact++;
        }

        if (score >= 80) priority = 'P0';
        else if (score >= 75) priority = 'P1';
        else if (score >= 70) priority = 'P2';
        else priority = 'P3';

        processedAlerts.push({
          id: `alert-${leadId}`,
          lead_id: leadId,
          full_name: String(lead.full_name || ''),
          email: String(lead.email || ''),
          organization: String(lead.organization || ''),
          position: String(lead.position || ''),
          sector: String(lead.lead_category || ''),
          country: String(lead.country || ''),
          lead_score: score,
          previous_score: score - 5,
          score_delta: 5,
          pipeline_stage: String(lead.pipeline_stage || ''),
          deal_value: dealValue,
          triggered_at: new Date().toISOString(),
          alert_type: alertType,
          next_best_action: nextAction,
          priority,
          is_new: hasRecentActivity,
        });

        const closeProb = score >= 80 ? 85 : score >= 75 ? 70 : 55;
        processedRecommendations.push({
          id: `rec-${leadId}`,
          lead_id: leadId,
          full_name: String(lead.full_name || ''),
          organization: String(lead.organization || ''),
          score,
          deal_value: dealValue,
          action: nextAction,
          urgency: score >= 80 ? 'URGENT' : score >= 75 ? 'HIGH' : 'MEDIUM',
          reason: `Score ${score} — ${hasViewedProposal ? 'proposition vue' : hasMeeting ? 'RDV planifié' : hasRecentActivity ? 'activité récente' : 'hot lead détecté'}`,
          estimated_close_probability: closeProb,
        });
      });

      const totalHotLeads = processedAlerts.length;
      const newAlertsCount = processedAlerts.filter((a) => a.is_new).length;
      const alertsToday = (activities || []).length;

      setAlerts(processedAlerts);
      setRecommendations(processedRecommendations);
      setStats({
        totalHotLeads,
        totalPipelineValue: pipelineValue,
        avgDealValue: totalHotLeads > 0 ? Math.round(pipelineValue / totalHotLeads) : 0,
        alertsToday,
        newAlerts: newAlertsCount,
        leadsToContact,
        proposalsToSend,
        meetingsToSchedule,
      });
      setNewAlertCount(newAlertsCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHotLeads();
  }, [loadHotLeads]);

  useEffect(() => {
    const channel = supabase
      .channel('closing-intelligence')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'leads',
          filter: 'lead_score>=70',
        },
        (payload) => {
          const newRecord = payload.new as Record<string, unknown>;
          const oldRecord = payload.old as Record<string, unknown>;
          const newScore = (newRecord.lead_score as number) || 0;
          const oldScore = (oldRecord.lead_score as number) || 0;

          if (newScore >= 70 && newScore > oldScore) {
            setNewAlertCount((prev) => prev + 1);
            loadHotLeads();
          }
        },
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'lead_activities',
          filter: 'activity_type=in.(email_opened,email_clicked,calendar_clicked,meeting_scheduled,proposal_viewed)',
        },
        () => {
          setNewAlertCount((prev) => prev + 1);
          loadHotLeads();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadHotLeads]);

  const dismissAlert = useCallback((alertId: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  }, []);

  const markAsContacted = useCallback(async (leadId: string) => {
    try {
      await supabase.from('lead_activities').insert({
        lead_id: leadId,
        activity_type: 'contacted_manually',
        metadata: { source: 'closing_intelligence_engine' },
      });
      await supabase
        .from('leads')
        .update({
          last_contact_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', leadId);
      loadHotLeads();
    } catch (err) {
      console.error('Erreur mark as contacted:', err);
    }
  }, [loadHotLeads]);

  return {
    alerts,
    stats,
    recommendations,
    loading,
    error,
    newAlertCount,
    loadHotLeads,
    dismissAlert,
    markAsContacted,
  };
}



