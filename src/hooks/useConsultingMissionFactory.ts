import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  consultingMissions as mockConsultingMissions,
  missionQualityReviews as mockMissionQualityReviews,
  engagementRiskAssessments as mockEngagementRiskAssessments,
  autonomousConsultingTeams as mockAutonomousConsultingTeams,
  autonomousResearchProjects as mockAutonomousResearchProjects,
  thinkTankPublications as mockThinkTankPublications,
} from '@/mocks/kosConsultingMissionFactory';

export interface ConsultingMission {
  id: number;
  mission_name: string;
  methodology: string;
  planning: string;
  deliverables: string;
  indicators: string;
  lessons_learned: string;
  client_name: string;
  sector: string;
  duration_days: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MissionQualityReview {
  id: number;
  mission_id: number;
  review_type: string;
  methodology_score: number;
  deliverables_compliance_score: number;
  standards_adherence_score: number;
  client_satisfaction_score: number;
  overall_score: number;
  findings: string;
  recommendations: string;
  reviewer: string;
  reviewed_at: string;
  created_at: string;
}

export interface EngagementRiskAssessment {
  id: number;
  engagement_name: string;
  financial_risk_score: number;
  legal_risk_score: number;
  operational_risk_score: number;
  reputational_risk_score: number;
  overall_risk_score: number;
  risk_level: string;
  mitigation_plan: string;
  approved_by: string;
  approval_status: string;
  created_at: string;
  updated_at: string;
}

export interface AutonomousConsultingTeam {
  id: number;
  team_name: string;
  expertise_area: string;
  active_missions: number;
  success_rate: number;
  avg_delivery_time_days: number;
  team_members: string;
  status: string;
  created_at: string;
}

export interface AutonomousResearchProject {
  id: number;
  research_topic: string;
  research_type: string;
  status: string;
  findings_summary: string;
  publication_readiness: number;
  peer_reviewed: boolean;
  completed_at: string | null;
  created_at: string;
}

export interface ThinkTankPublication {
  id: number;
  publication_type: string;
  title: string;
  research_domain: string;
  key_findings: string;
  policy_recommendations: string;
  target_audience: string;
  citation_count: number;
  status: string;
  published_at: string | null;
  created_at: string;
}

export interface ConsultingMissionFactoryData {
  consultingMissions: ConsultingMission[];
  missionQualityReviews: MissionQualityReview[];
  engagementRiskAssessments: EngagementRiskAssessment[];
  autonomousConsultingTeams: AutonomousConsultingTeam[];
  autonomousResearchProjects: AutonomousResearchProject[];
  thinkTankPublications: ThinkTankPublication[];
  isLive: boolean;
}

export function useConsultingMissionFactory() {
  const [data, setData] = useState<ConsultingMissionFactoryData>({
    consultingMissions: [],
    missionQualityReviews: [],
    engagementRiskAssessments: [],
    autonomousConsultingTeams: [],
    autonomousResearchProjects: [],
    thinkTankPublications: [],
    isLive: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [
        missionsRes,
        qualityRes,
        risksRes,
        teamsRes,
        researchRes,
        thinkTankRes,
      ] = await Promise.all([
        supabase.from('consulting_factory').select('*').order('id'),
        supabase.from('mission_quality_office').select('*').order('id'),
        supabase.from('engagement_risk_office').select('*').order('id'),
        supabase.from('autonomous_consulting_team').select('*').order('id'),
        supabase.from('autonomous_research_team').select('*').order('id'),
        supabase.from('autonomous_think_tank').select('*').order('id'),
      ]);

      if (missionsRes.error) throw missionsRes.error;
      if (qualityRes.error) throw qualityRes.error;
      if (risksRes.error) throw risksRes.error;
      if (teamsRes.error) throw teamsRes.error;
      if (researchRes.error) throw researchRes.error;
      if (thinkTankRes.error) throw thinkTankRes.error;

      const hasData = (missionsRes.data && missionsRes.data.length > 0) ||
        (qualityRes.data && qualityRes.data.length > 0) ||
        (risksRes.data && risksRes.data.length > 0) ||
        (teamsRes.data && teamsRes.data.length > 0) ||
        (researchRes.data && researchRes.data.length > 0) ||
        (thinkTankRes.data && thinkTankRes.data.length > 0);

      setData({
        consultingMissions: (missionsRes.data as ConsultingMission[]) || [],
        missionQualityReviews: (qualityRes.data as MissionQualityReview[]) || [],
        engagementRiskAssessments: (risksRes.data as EngagementRiskAssessment[]) || [],
        autonomousConsultingTeams: (teamsRes.data as AutonomousConsultingTeam[]) || [],
        autonomousResearchProjects: (researchRes.data as AutonomousResearchProject[]) || [],
        thinkTankPublications: (thinkTankRes.data as ThinkTankPublication[]) || [],
        isLive: hasData,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setData({
        consultingMissions: mockConsultingMissions,
        missionQualityReviews: mockMissionQualityReviews,
        engagementRiskAssessments: mockEngagementRiskAssessments,
        autonomousConsultingTeams: mockAutonomousConsultingTeams,
        autonomousResearchProjects: mockAutonomousResearchProjects,
        thinkTankPublications: mockThinkTankPublications,
        isLive: false,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, loading, error, refetch: fetchData };
}