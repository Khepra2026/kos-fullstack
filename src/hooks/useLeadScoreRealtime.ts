import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface RealtimeScoreUpdate {
  leadId: string;
  previousScore: number;
  newScore: number;
  eventType: 'email_opened' | 'email_clicked' | 'page_viewed' | 'meeting_scheduled' | 'proposal_viewed' | 'calendar_clicked';
  pointsAdded: number;
  nextBestAction: string;
  category: 'hot' | 'warm' | 'cold';
  timestamp: string;
}

export interface LeadWithRealtimeScore {
  id: string;
  full_name: string;
  email: string;
  organization: string;
  lead_score: number;
  pipeline_stage: string;
  last_activity_type: string;
  score_breakdown: Record<string, number>;
  next_best_action: string;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  updated_at: string;
}

const SCORE_RULES: Record<string, number> = {
  email_opened: 5,
  email_clicked: 10,
  page_viewed: 8,
  meeting_scheduled: 20,
  proposal_viewed: 15,
  calendar_clicked: 12,
  email_sequence_started: 3,
  nurturing_step_advanced: 7,
  proposal_sent: 18,
  note_added: 2,
};

export function useLeadScoreRealtime() {
  const [updates, setUpdates] = useState<RealtimeScoreUpdate[]>([]);
  const [leadScores, setLeadScores] = useState<Record<string, LeadWithRealtimeScore>>();
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const processActivity = useCallback(async (leadId: string, activityType: string, metadata?: Record<string, unknown>) => {
    const points = SCORE_RULES[activityType] || 0;
    if (points === 0) return null;

    try {
      const { data: leadData } = await supabase
        .from('leads')
        .select('lead_score, pipeline_stage, full_name, email, organization')
        .eq('id', leadId)
        .maybeSingle();

      const previousScore = (leadData?.lead_score as number) || 0;
      const newScore = Math.min(100, previousScore + points);
      const category = newScore >= 70 ? 'hot' : newScore >= 45 ? 'warm' : 'cold';
      const priority = newScore >= 75 ? 'P0' : newScore >= 65 ? 'P1' : newScore >= 50 ? 'P2' : 'P3';
      const nextBestAction = getNextBestAction(newScore, category, activityType);

      const update: RealtimeScoreUpdate = {
        leadId,
        previousScore,
        newScore,
        eventType: activityType as RealtimeScoreUpdate['eventType'],
        pointsAdded: points,
        nextBestAction,
        category,
        timestamp: new Date().toISOString(),
      };

      // Mettre à jour Supabase
      await supabase
        .from('leads')
        .update({
          lead_score: newScore,
          last_activity_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', leadId);

      // Mettre à jour lead_scores
      await supabase.from('lead_scores').upsert({
        lead_id: leadId,
        engagement_score: newScore,
        behavioral_score: newScore,
        predictive_score: newScore,
        analyzed_at: new Date().toISOString(),
      });

      // Ajouter une activité
      await supabase.from('lead_activities').insert({
        lead_id: leadId,
        activity_type: 'score_updated',
        metadata: {
          previous_score: previousScore,
          new_score: newScore,
          points_added: points,
          trigger: activityType,
          next_best_action: nextBestAction,
        },
      });

      setUpdates((prev) => [update, ...prev].slice(0, 50));
      setLeadScores((prev) => ({
        ...prev,
        [leadId]: {
          ...prev[leadId],
          id: leadId,
          lead_score: newScore,
          next_best_action: nextBestAction,
          priority,
          updated_at: new Date().toISOString(),
        },
      }));

      return update;
    } catch (err) {
      console.error('Erreur scoring temps réel:', err);
      return null;
    }
  }, []);

  const loadLeadScores = useCallback(async (leadIds: string[]) => {
    if (leadIds.length === 0) return;
    try {
      const { data } = await supabase
        .from('leads')
        .select('id, full_name, email, organization, lead_score, pipeline_stage, last_activity_at, score_breakdown, recommendations')
        .in('id', leadIds.slice(0, 50));

      const mapped: Record<string, LeadWithRealtimeScore> = {};
      (data || []).forEach((lead: Record<string, unknown>) => {
        const score = (lead.lead_score as number) || 0;
        mapped[String(lead.id)] = {
          id: String(lead.id),
          full_name: String(lead.full_name || ''),
          email: String(lead.email || ''),
          organization: String(lead.organization || ''),
          lead_score: score,
          pipeline_stage: String(lead.pipeline_stage || ''),
          last_activity_type: '',
          score_breakdown: (lead.score_breakdown as Record<string, number>) || {},
          next_best_action: getNextBestAction(score, score >= 70 ? 'hot' : score >= 45 ? 'warm' : 'cold', ''),
          priority: score >= 75 ? 'P0' : score >= 65 ? 'P1' : score >= 50 ? 'P2' : 'P3',
          updated_at: String(lead.last_activity_at || ''),
        };
      });
      setLeadScores(mapped);
    } catch (err) {
      console.error('Erreur chargement scores:', err);
    }
  }, []);

  const simulateRealtimeUpdate = useCallback((leadId: string, activityType: string) => {
    return processActivity(leadId, activityType);
  }, [processActivity]);

  const refresh = useCallback(() => {
    setLastRefresh(new Date());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refresh();
    }, 30000);
    return () => clearInterval(interval);
  }, [refresh]);

  return {
    updates,
    leadScores,
    loading,
    lastRefresh,
    processActivity,
    loadLeadScores,
    simulateRealtimeUpdate,
    refresh,
  };
}

function getNextBestAction(score: number, category: string, trigger: string): string {
  if (trigger === 'meeting_scheduled') return 'RDV confirmé — Préparer le diagnostic';
  if (trigger === 'proposal_viewed') return 'Proposition vue — Relancer sous 24h';
  if (trigger === 'calendar_clicked') return 'Lien calendrier cliqué — Proposer 3 créneaux';
  if (trigger === 'email_clicked') return 'Lien cliqué — Avancer vers proposition';
  if (category === 'hot') return 'Lead chaud — Contacter immédiatement';
  if (category === 'warm') return 'Lead qualifié — Proposer diagnostic';
  return 'Lead à nurturer — Envoyer contenu éducatif';
}