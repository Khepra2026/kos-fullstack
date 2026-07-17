import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  diagnosticRequests: number;
  meetingsScheduled: number;
  conversionRate: number;
  avgLeadScore: number;
  totalDownloads: number;
  totalDiagnostics: number;
  totalToolCompletions: number;
  totalConversions: number;
}

export interface LeadsByStatus {
  status: string;
  count: number;
}

export interface LeadsBySource {
  source_page: string;
  count: number;
}

export interface LeadsByFormType {
  form_type: string;
  count: number;
}

export interface RecentLead {
  id: string;
  created_at: string;
  full_name: string | null;
  email: string | null;
  organization: string | null;
  status: string;
  lead_score: number | null;
  form_type: string | null;
  source_page: string | null;
  phone: string | null;
  country: string | null;
  sector: string | null;
  email_1_sent_at: string | null;
  email_2_sent_at: string | null;
  email_3_sent_at: string | null;
  converted_at: string | null;
}

export interface RecentDownload {
  id: string;
  created_at: string;
  resource_name: string | null;
  email: string | null;
  first_name: string | null;
  organization: string | null;
  country: string | null;
}

export interface RecentDiagnostic {
  id: string;
  completed_at: string | null;
  tool_name: string;
  score: number | null;
  email: string | null;
}

export type TimeRange = '7d' | '30d' | '90d' | 'all';

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [leadsByStatus, setLeadsByStatus] = useState<LeadsByStatus[]>([]);
  const [leadsBySource, setLeadsBySource] = useState<LeadsBySource[]>([]);
  const [leadsByFormType, setLeadsByFormType] = useState<LeadsByFormType[]>([]);
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [recentDownloads, setRecentDownloads] = useState<RecentDownload[]>([]);
  const [recentDiagnostics, setRecentDiagnostics] = useState<RecentDiagnostic[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDateFilter = useCallback(() => {
    const now = new Date();
    switch (timeRange) {
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      case '90d':
        return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();
      default:
        return '2020-01-01';
    }
  }, [timeRange]);

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const dateFilter = getDateFilter();

      // Fetch leads
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .gte('created_at', dateFilter);

      if (leadsError) throw leadsError;
      const leads = leadsData || [];

      const totalLeads = leads.length;
      const newLeads = leads.filter((l) => l.status === 'new').length;
      const diagnosticRequests = leads.filter((l) => l.form_type === 'diagnostic').length;
      const meetingsScheduled = leads.filter((l) => l.meeting_scheduled_at).length;
      const conversionRate = totalLeads > 0 ? (meetingsScheduled / totalLeads) * 100 : 0;
      const avgLeadScore =
        leads.reduce((sum, l) => sum + (l.lead_score || 0), 0) / (totalLeads || 1);
      const totalConversions = leads.filter((l) => l.status === 'converted').length;

      // Fetch downloads
      const { data: downloadsData, error: downloadsError } = await supabase
        .from('downloads')
        .select('*')
        .gte('created_at', dateFilter);

      if (downloadsError) throw downloadsError;
      const downloads = downloadsData || [];

      // Fetch resource_downloads
      const { data: resourceDownloadsData, error: resourceDownloadsError } = await supabase
        .from('resource_downloads')
        .select('*')
        .gte('created_at', dateFilter);

      if (resourceDownloadsError) throw resourceDownloadsError;
      const resourceDownloads = resourceDownloadsData || [];

      const totalDownloads = downloads.length + resourceDownloads.length;

      // Fetch diagnostic events
      const { data: diagnosticsData, error: diagnosticsError } = await supabase
        .from('diagnostic_events')
        .select('*')
        .gte('completed_at', dateFilter);

      if (diagnosticsError) throw diagnosticsError;
      const diagnostics = diagnosticsData || [];

      // Fetch tool completions
      const { data: toolCompletionsData, error: toolCompletionsError } = await supabase
        .from('tool_completions')
        .select('*')
        .gte('completed_at', dateFilter);

      if (toolCompletionsError) throw toolCompletionsError;
      const toolCompletions = toolCompletionsData || [];

      setStats({
        totalLeads,
        newLeads,
        diagnosticRequests,
        meetingsScheduled,
        conversionRate,
        avgLeadScore,
        totalDownloads,
        totalDiagnostics: diagnostics.length,
        totalToolCompletions: toolCompletions.length,
        totalConversions,
      });

      // Leads by status
      const statusCounts: Record<string, number> = {};
      leads.forEach((lead) => {
        const status = lead.status || 'unknown';
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });
      setLeadsByStatus(
        Object.entries(statusCounts).map(([status, count]) => ({ status, count }))
      );

      // Leads by source
      const sourceCounts: Record<string, number> = {};
      leads.forEach((lead) => {
        const source = lead.source_page || 'direct';
        sourceCounts[source] = (sourceCounts[source] || 0) + 1;
      });
      setLeadsBySource(
        Object.entries(sourceCounts)
          .map(([source_page, count]) => ({ source_page, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)
      );

      // Leads by form type
      const formTypeCounts: Record<string, number> = {};
      leads.forEach((lead) => {
        const formType = lead.form_type || 'contact';
        formTypeCounts[formType] = (formTypeCounts[formType] || 0) + 1;
      });
      setLeadsByFormType(
        Object.entries(formTypeCounts).map(([form_type, count]) => ({ form_type, count }))
      );

      // Recent leads
      const { data: recent, error: recentError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (recentError) throw recentError;
      setRecentLeads(recent || []);

      // Recent downloads
      const { data: recentDl, error: recentDlError } = await supabase
        .from('downloads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (recentDlError) throw recentDlError;

      const { data: recentRdl, error: recentRdlError } = await supabase
        .from('resource_downloads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (recentRdlError) throw recentRdlError;

      const allDownloads: RecentDownload[] = [
        ...(recentDl || []).map((d) => ({
          id: d.id,
          created_at: d.created_at,
          resource_name: d.resource_name,
          email: d.email,
          first_name: d.first_name,
          organization: d.organization,
          country: d.country,
        })),
        ...(recentRdl || []).map((d) => ({
          id: d.id,
          created_at: d.created_at,
          resource_name: d.resource_name,
          email: d.email,
          first_name: d.first_name,
          organization: d.organization,
          country: d.country,
        })),
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 10);
      setRecentDownloads(allDownloads);

      // Recent diagnostics
      const { data: recentDiag, error: recentDiagError } = await supabase
        .from('diagnostic_events')
        .select('*')
        .order('completed_at', { ascending: false })
        .limit(10);

      if (recentDiagError) throw recentDiagError;
      setRecentDiagnostics(
        (recentDiag || []).map((d) => ({
          id: d.id,
          completed_at: d.completed_at,
          tool_name: d.tool_name,
          score: d.score,
          email: null,
        }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [getDateFilter]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return {
    stats,
    leadsByStatus,
    leadsBySource,
    leadsByFormType,
    recentLeads,
    recentDownloads,
    recentDiagnostics,
    timeRange,
    setTimeRange,
    loading,
    error,
    refresh: loadDashboardData,
  };
}