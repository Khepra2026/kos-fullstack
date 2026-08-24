import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import {
  mockLeads,
  mockProposals,
  mockLeadActivities,
  mockPipelineStages,
  mockPipelineStageLabels,
} from '@/mocks/pipelineAnalytics';

export interface Lead {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  email: string;
  organization: string;
  pipeline_stage: string;
  deal_value: number;
  probability: number;
  status: string;
  source_page: string;
  form_type: string;
  first_contact_at: string;
  last_contact_at: string;
  meeting_scheduled_at: string | null;
  calendar_link_clicked: boolean;
  lead_score: number;
  estimated_value: string;
}

export interface Proposal {
  id: string;
  lead_id: string;
  title: string;
  client_name: string;
  client_email: string;
  client_organization: string;
  type: string;
  status: string;
  amount: number;
  currency: string;
  sent_at: string;
  accepted_at: string | null;
  viewed_at: string | null;
  view_count: number;
  created_at: string;
}

export interface LeadActivity {
  id: string;
  lead_id: string;
  activity_type: string;
  created_at: string;
  metadata: Record<string, unknown>;
}

export interface FunnelStage {
  stage: string;
  label: string;
  count: number;
  value: number;
  avgDealValue: number;
  conversionFromPrevious: number;
  conversionFromFirst: number;
  daysInStage: number;
}

export interface DealByMonth {
  month: string;
  label: string;
  won: number;
  sent: number;
  lost: number;
  pipeline: number;
}

export interface StageTransition {
  fromStage: string;
  toStage: string;
  avgDays: number;
  count: number;
  medianDays: number;
}

export interface RevenueProjection {
  weightedPipeline: number;
  unweightedPipeline: number;
  projectedQ1: number;
  projectedQ2: number;
  projectedQ3: number;
  projectedQ4: number;
  projectedTotal: number;
  wonRevenue: number;
  conversionRate: number;
}

export interface PipelineMetrics {
  totalLeads: number;
  activeLeads: number;
  totalDeals: number;
  totalPipelineValue: number;
  weightedPipelineValue: number;
  avgDealValue: number;
  avgDealValueWon: number;
  winRate: number;
  lossRate: number;
  avgSalesCycle: number;
  avgTimeToMeeting: number;
  avgTimeToProposal: number;
  avgTimeToClose: number;
  proposalsSent: number;
  proposalsAccepted: number;
  proposalsRejected: number;
  proposalsViewed: number;
  totalProposalValue: number;
  acceptedProposalValue: number;
  conversionRateLeadToMeeting: number;
  conversionRateMeetingToProposal: number;
  conversionRateProposalToWon: number;
  conversionRateOverall: number;
  newLeadsThisMonth: number;
  newLeadsLastMonth: number;
  leadsGrowthRate: number;
  dealsWonThisMonth: number;
  dealsWonLastMonth: number;
  dealsGrowthRate: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
  revenueGrowthRate: number;
  topSources: { source: string; count: number; value: number }[];
  topOrganizations: { org: string; count: number; value: number }[];
  avgLeadScore: number;
  avgProbability: number;
}

export interface PipelineAnalyticsData {
  leads: Lead[];
  proposals: Proposal[];
  activities: LeadActivity[];
  funnel: FunnelStage[];
  dealsByMonth: DealByMonth[];
  stageTransitions: StageTransition[];
  revenueProjection: RevenueProjection;
  metrics: PipelineMetrics;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

function calculateDaysBetween(a: string | null, b: string | null): number {
  if (!a || !b) return 0;
  const d1 = new Date(a);
  const d2 = new Date(b);
  return Math.max(0, Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
}

function getMonthKey(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function getMonthLabel(key: string): string {
  const [year, month] = key.split('-');
  const months = [
    'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
    'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc',
  ];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

function computeAnalytics(
  leads: Lead[],
  proposals: Proposal[],
  activities: LeadActivity[],
): PipelineAnalyticsData {
  const activeLeads = leads.filter((l) => l.status === 'active');
  const wonLeads = leads.filter((l) => l.pipeline_stage === 'closed_won');
  const lostLeads = leads.filter((l) => l.pipeline_stage === 'closed_lost');

  const totalPipelineValue = activeLeads.reduce((s, l) => s + (l.deal_value || 0), 0);
  const weightedPipelineValue = activeLeads.reduce(
    (s, l) => s + (l.deal_value || 0) * ((l.probability || 0) / 100),
    0,
  );

  const wonValue = wonLeads.reduce((s, l) => s + (l.deal_value || 0), 0);
  const lostValue = lostLeads.reduce((s, l) => s + (l.deal_value || 0), 0);

  const avgDealValue = leads.length > 0
    ? leads.reduce((s, l) => s + (l.deal_value || 0), 0) / leads.length
    : 0;
  const avgDealValueWon = wonLeads.length > 0
    ? wonLeads.reduce((s, l) => s + (l.deal_value || 0), 0) / wonLeads.length
    : 0;

  const totalDeals = leads.filter((l) => l.pipeline_stage !== 'new_lead').length;
  const winRate = totalDeals > 0 ? (wonLeads.length / (wonLeads.length + lostLeads.length)) * 100 : 0;
  const lossRate = totalDeals > 0 ? (lostLeads.length / (wonLeads.length + lostLeads.length)) * 100 : 0;

  const proposalsSent = proposals.length;
  const proposalsAccepted = proposals.filter((p) => p.status === 'accepted').length;
  const proposalsRejected = proposals.filter((p) => p.status === 'rejected').length;
  const proposalsViewed = proposals.filter((p) => p.viewed_at).length;

  const totalProposalValue = proposals.reduce((s, p) => s + (p.amount || 0), 0);
  const acceptedProposalValue = proposals
    .filter((p) => p.status === 'accepted')
    .reduce((s, p) => s + (p.amount || 0), 0);

  const meetings = leads.filter((l) => l.meeting_scheduled_at).length;
  const meetingWithProposal = leads.filter((l) => l.meeting_scheduled_at && proposals.some((p) => p.lead_id === l.id)).length;

  const conversionRateLeadToMeeting = leads.length > 0 ? (meetings / leads.length) * 100 : 0;
  const conversionRateMeetingToProposal = meetings > 0 ? (meetingWithProposal / meetings) * 100 : 0;
  const conversionRateProposalToWon = proposalsSent > 0 ? (proposalsAccepted / proposalsSent) * 100 : 0;
  const conversionRateOverall = leads.length > 0 ? (wonLeads.length / leads.length) * 100 : 0;

  const salesCycles = wonLeads
    .map((l) => calculateDaysBetween(l.first_contact_at, l.last_contact_at))
    .filter((d) => d > 0);
  const avgSalesCycle = salesCycles.length > 0
    ? salesCycles.reduce((a, b) => a + b, 0) / salesCycles.length
    : 0;

  const meetingTimes = leads
    .filter((l) => l.meeting_scheduled_at && l.first_contact_at)
    .map((l) => calculateDaysBetween(l.first_contact_at, l.meeting_scheduled_at!))
    .filter((d) => d > 0);
  const avgTimeToMeeting = meetingTimes.length > 0
    ? meetingTimes.reduce((a, b) => a + b, 0) / meetingTimes.length
    : 0;

  const proposalTimes = activities
    .filter((a) => a.activity_type === 'proposal_sent')
    .map((a) => {
      const lead = leads.find((l) => l.id === a.lead_id);
      if (!lead || !lead.first_contact_at) return 0;
      return calculateDaysBetween(lead.first_contact_at, a.created_at);
    })
    .filter((d) => d > 0);
  const avgTimeToProposal = proposalTimes.length > 0
    ? proposalTimes.reduce((a, b) => a + b, 0) / proposalTimes.length
    : 0;

  const closeTimes = activities
    .filter((a) => a.activity_type === 'proposal_accepted')
    .map((a) => {
      const lead = leads.find((l) => l.id === a.lead_id);
      if (!lead || !lead.first_contact_at) return 0;
      return calculateDaysBetween(lead.first_contact_at, a.created_at);
    })
    .filter((d) => d > 0);
  const avgTimeToClose = closeTimes.length > 0
    ? closeTimes.reduce((a, b) => a + b, 0) / closeTimes.length
    : 0;

  const now = new Date();
  const thisMonthKey = getMonthKey(now.toISOString());
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthKey = getMonthKey(lastMonthDate.toISOString());

  const newLeadsThisMonth = leads.filter((l) => getMonthKey(l.created_at) === thisMonthKey).length;
  const newLeadsLastMonth = leads.filter((l) => getMonthKey(l.created_at) === lastMonthKey).length;
  const leadsGrowthRate = newLeadsLastMonth > 0
    ? ((newLeadsThisMonth - newLeadsLastMonth) / newLeadsLastMonth) * 100
    : newLeadsThisMonth > 0 ? 100 : 0;

  const dealsWonThisMonth = wonLeads.filter((l) => getMonthKey(l.last_contact_at) === thisMonthKey).length;
  const dealsWonLastMonth = wonLeads.filter((l) => getMonthKey(l.last_contact_at) === lastMonthKey).length;
  const dealsGrowthRate = dealsWonLastMonth > 0
    ? ((dealsWonThisMonth - dealsWonLastMonth) / dealsWonLastMonth) * 100
    : dealsWonThisMonth > 0 ? 100 : 0;

  const revenueThisMonth = wonLeads
    .filter((l) => getMonthKey(l.last_contact_at) === thisMonthKey)
    .reduce((s, l) => s + (l.deal_value || 0), 0);
  const revenueLastMonth = wonLeads
    .filter((l) => getMonthKey(l.last_contact_at) === lastMonthKey)
    .reduce((s, l) => s + (l.deal_value || 0), 0);
  const revenueGrowthRate = revenueLastMonth > 0
    ? ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100
    : revenueThisMonth > 0 ? 100 : 0;

  const sourceMap = new Map<string, { count: number; value: number }>();
  leads.forEach((l) => {
    const src = l.source_page || 'Direct';
    const e = sourceMap.get(src) || { count: 0, value: 0 };
    e.count += 1;
    e.value += l.deal_value || 0;
    sourceMap.set(src, e);
  });
  const topSources = Array.from(sourceMap.entries())
    .map(([source, data]) => ({ source, count: data.count, value: data.value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const orgMap = new Map<string, { count: number; value: number }>();
  leads.forEach((l) => {
    const org = l.organization || 'Non renseigné';
    const e = orgMap.get(org) || { count: 0, value: 0 };
    e.count += 1;
    e.value += l.deal_value || 0;
    orgMap.set(org, e);
  });
  const topOrganizations = Array.from(orgMap.entries())
    .map(([org, data]) => ({ org, count: data.count, value: data.value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const avgLeadScore = leads.length > 0
    ? leads.reduce((s, l) => s + (l.lead_score || 0), 0) / leads.length
    : 0;
  const avgProbability = activeLeads.length > 0
    ? activeLeads.reduce((s, l) => s + (l.probability || 0), 0) / activeLeads.length
    : 0;

  const metrics: PipelineMetrics = {
    totalLeads: leads.length,
    activeLeads: activeLeads.length,
    totalDeals: totalDeals,
    totalPipelineValue,
    weightedPipelineValue,
    avgDealValue,
    avgDealValueWon,
    winRate,
    lossRate,
    avgSalesCycle,
    avgTimeToMeeting,
    avgTimeToProposal,
    avgTimeToClose,
    proposalsSent,
    proposalsAccepted,
    proposalsRejected,
    proposalsViewed,
    totalProposalValue,
    acceptedProposalValue,
    conversionRateLeadToMeeting,
    conversionRateMeetingToProposal,
    conversionRateProposalToWon,
    conversionRateOverall,
    newLeadsThisMonth,
    newLeadsLastMonth,
    leadsGrowthRate,
    dealsWonThisMonth,
    dealsWonLastMonth,
    dealsGrowthRate,
    revenueThisMonth,
    revenueLastMonth,
    revenueGrowthRate,
    topSources,
    topOrganizations,
    avgLeadScore,
    avgProbability,
  };

  const funnel: FunnelStage[] = mockPipelineStages.map((stage, index) => {
    const stageLeads = leads.filter((l) => l.pipeline_stage === stage);
    const count = stageLeads.length;
    const value = stageLeads.reduce((s, l) => s + (l.deal_value || 0), 0);
    const avgDeal = count > 0 ? value / count : 0;
    const firstStageCount = leads.filter((l) => l.pipeline_stage === mockPipelineStages[0]).length;
    const prevStageCount = index > 0 ? leads.filter((l) => l.pipeline_stage === mockPipelineStages[index - 1]).length : 0;

    const conversionFromPrevious = prevStageCount > 0 ? (count / prevStageCount) * 100 : 100;
    const conversionFromFirst = firstStageCount > 0 ? (count / firstStageCount) * 100 : 0;

    const daysArr = stageLeads
      .map((l) => {
        if (stage === 'closed_won' || stage === 'closed_lost') {
          return calculateDaysBetween(l.first_contact_at, l.last_contact_at);
        }
        const nextStage = mockPipelineStages[index + 1];
        const nextStageLeads = leads.filter((nl) => nl.pipeline_stage === nextStage);
        const nextStageDate = nextStageLeads.length > 0
          ? nextStageLeads[0].updated_at
          : l.updated_at;
        return calculateDaysBetween(l.first_contact_at, nextStageDate);
      })
      .filter((d) => d > 0);
    const daysInStage = daysArr.length > 0 ? daysArr.reduce((a, b) => a + b, 0) / daysArr.length : 0;

    return {
      stage,
      label: mockPipelineStageLabels[stage],
      count,
      value,
      avgDealValue: avgDeal,
      conversionFromPrevious,
      conversionFromFirst,
      daysInStage,
    };
  });

  const allMonths = new Set<string>();
  leads.forEach((l) => allMonths.add(getMonthKey(l.created_at)));
  proposals.forEach((p) => allMonths.add(getMonthKey(p.created_at)));
  const sortedMonths = Array.from(allMonths).sort();
  const last6Months = sortedMonths.slice(-6);

  const dealsByMonth: DealByMonth[] = last6Months.map((month) => {
    const monthWon = wonLeads.filter((l) => getMonthKey(l.last_contact_at) === month).reduce((s, l) => s + (l.deal_value || 0), 0);
    const monthSent = proposals
      .filter((p) => p.sent_at && getMonthKey(p.sent_at) === month)
      .reduce((s, p) => s + (p.amount || 0), 0);
    const monthLost = lostLeads.filter((l) => getMonthKey(l.last_contact_at) === month).reduce((s, l) => s + (l.deal_value || 0), 0);
    const monthPipeline = activeLeads.filter((l) => getMonthKey(l.created_at) === month).reduce((s, l) => s + (l.deal_value || 0), 0);
    return {
      month,
      label: getMonthLabel(month),
      won: monthWon,
      sent: monthSent,
      lost: monthLost,
      pipeline: monthPipeline,
    };
  });

  const stageTransitions: StageTransition[] = [];
  for (let i = 0; i < mockPipelineStages.length - 1; i++) {
    const fromStage = mockPipelineStages[i];
    const toStage = mockPipelineStages[i + 1];
    const fromLeads = leads.filter((l) => l.pipeline_stage === toStage || l.pipeline_stage === 'closed_won' || l.pipeline_stage === 'closed_lost');
    const transitionDays: number[] = [];
    fromLeads.forEach((l) => {
      const fromDate = l.first_contact_at;
      const toActivity = activities.find((a) => a.lead_id === l.id && (
        (toStage === 'meeting_scheduled' && a.activity_type === 'meeting_scheduled') ||
        (toStage === 'proposal_sent' && a.activity_type === 'proposal_sent') ||
        (toStage === 'closed_won' && a.activity_type === 'proposal_accepted') ||
        (toStage === 'closed_lost' && a.activity_type === 'proposal_rejected')
      ));
      if (toActivity) {
        const days = calculateDaysBetween(fromDate, toActivity.created_at);
        if (days > 0) transitionDays.push(days);
      }
    });
    if (transitionDays.length === 0) {
      leads.filter((l) => l.pipeline_stage === toStage || (toStage === 'closed_won' && l.pipeline_stage === 'closed_won')).forEach((l) => {
        const days = calculateDaysBetween(l.first_contact_at, l.updated_at);
        if (days > 0) transitionDays.push(days);
      });
    }
    const avgDays = transitionDays.length > 0 ? transitionDays.reduce((a, b) => a + b, 0) / transitionDays.length : 0;
    const medianDays = transitionDays.length > 0
      ? transitionDays.sort((a, b) => a - b)[Math.floor(transitionDays.length / 2)]
      : 0;
    const count = transitionDays.length;
    stageTransitions.push({ fromStage, toStage, avgDays: Math.round(avgDays), count, medianDays });
  }

  const projectedQ1 = weightedPipelineValue * 0.25;
  const projectedQ2 = weightedPipelineValue * 0.35;
  const projectedQ3 = weightedPipelineValue * 0.25;
  const projectedQ4 = weightedPipelineValue * 0.15;
  const projectedTotal = projectedQ1 + projectedQ2 + projectedQ3 + projectedQ4;

  const revenueProjection: RevenueProjection = {
    weightedPipeline: weightedPipelineValue,
    unweightedPipeline: totalPipelineValue,
    projectedQ1: Math.round(projectedQ1),
    projectedQ2: Math.round(projectedQ2),
    projectedQ3: Math.round(projectedQ3),
    projectedQ4: Math.round(projectedQ4),
    projectedTotal: Math.round(projectedTotal),
    wonRevenue: wonValue,
    conversionRate: winRate,
  };

  return {
    leads,
    proposals,
    activities,
    funnel,
    dealsByMonth,
    stageTransitions,
    revenueProjection,
    metrics,
    loading: false,
    error: null,
    refresh: () => {},
  };
}

export function usePipelineAnalytics(): PipelineAnalyticsData {
  const [data, setData] = useState<PipelineAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (leadsError) throw leadsError;

      const { data: proposalsData, error: proposalsError } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });
      if (proposalsError) throw proposalsError;

      const leadIds = (leadsData || []).map((l) => l.id).slice(0, 50);
      const { data: activitiesData, error: activitiesError } = await supabase
        .from('lead_activities')
        .select('*')
        .in('lead_id', leadIds)
        .order('created_at', { ascending: true });
      if (activitiesError) throw activitiesError;

      const computed = computeAnalytics(
        leadsData as Lead[] || mockLeads,
        proposalsData as Proposal[] || mockProposals,
        activitiesData as LeadActivity[] || mockLeadActivities,
      );
      setData(computed);
    } catch (err) {
      const computed = computeAnalytics(mockLeads, mockProposals, mockLeadActivities);
      setData(computed);
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refresh = () => {
    fetchData();
  };

  const fallback = useMemo(() => computeAnalytics(mockLeads, mockProposals, mockLeadActivities), []);

  if (loading && !data) {
    return { ...fallback, loading: true, error: null, refresh };
  }

  if (data) {
    return { ...data, loading, error, refresh };
  }

  return { ...fallback, loading, error, refresh };
}



