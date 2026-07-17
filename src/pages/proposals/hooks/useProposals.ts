import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface Proposal {
  id: string;
  created_at: string;
  updated_at: string;
  lead_id: string;
  title: string;
  client_name: string;
  client_email: string;
  client_organization: string | null;
  type: string;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired';
  amount: number | null;
  currency: string;
  duration_days: number | null;
  start_date: string | null;
  description: string | null;
  scope: string | null;
  deliverables: string[];
  terms: string | null;
  pdf_url: string | null;
  sent_at: string | null;
  accepted_at: string | null;
  rejected_at: string | null;
  rejected_reason: string | null;
  viewed_at: string | null;
  view_count: number;
  notes: string | null;
  template_used: string | null;
  custom_fields: Record<string, unknown>;
}

export interface ProposalStats {
  total: number;
  draft: number;
  sent: number;
  viewed: number;
  accepted: number;
  rejected: number;
  totalValue: number;
  conversionRate: number;
  avgAmount: number;
}

export interface ProposalFormData {
  leadId: string;
  title: string;
  proposalType: string;
  amount: number;
  durationDays: number;
  description: string;
  scope: string;
  deliverables: string[];
  terms: string;
}

const proposalTypeLabels: Record<string, string> = {
  diagnostic: 'Diagnostic',
  audit: 'Audit',
  conseil: 'Conseil stratégique',
  esg: 'Conformité ESG',
  due_diligence: 'Due diligence',
  formation: 'Formation',
  transformation: 'Transformation digitale',
  governance: 'Gouvernance',
  compliance: 'Conformité réglementaire',
  other: 'Autre',
};

const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
  draft: { label: 'Brouillon', color: 'text-slate-700', bg: 'bg-slate-100' },
  sent: { label: 'Envoyée', color: 'text-blue-700', bg: 'bg-blue-100' },
  viewed: { label: 'Vue', color: 'text-indigo-700', bg: 'bg-indigo-100' },
  accepted: { label: 'Acceptée', color: 'text-emerald-700', bg: 'bg-emerald-100' },
  rejected: { label: 'Refusée', color: 'text-red-700', bg: 'bg-red-100' },
  expired: { label: 'Expirée', color: 'text-gray-700', bg: 'bg-gray-100' },
};

export function useProposals() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [stats, setStats] = useState<ProposalStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const loadProposals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      setProposals(data || []);

      const all = data || [];
      const totalValue = all.reduce((sum, p) => sum + (p.amount || 0), 0);
      const accepted = all.filter((p) => p.status === 'accepted');
      const sent = all.filter((p) => ['sent', 'viewed', 'accepted', 'rejected'].includes(p.status));
      const statsObj: ProposalStats = {
        total: all.length,
        draft: all.filter((p) => p.status === 'draft').length,
        sent: all.filter((p) => p.status === 'sent').length,
        viewed: all.filter((p) => p.status === 'viewed').length,
        accepted: accepted.length,
        rejected: all.filter((p) => p.status === 'rejected').length,
        totalValue,
        conversionRate: sent.length > 0 ? Math.round((accepted.length / sent.length) * 100) : 0,
        avgAmount: all.filter((p) => p.amount).length > 0
          ? Math.round(totalValue / all.filter((p) => p.amount).length)
          : 0,
      };
      setStats(statsObj);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, []);

  const generateProposal = useCallback(async (formData: ProposalFormData) => {
    try {
      const { data, error: err } = await supabase.functions.invoke('kos-pdf-master', {
        body: {
          action: 'proposal',
          leadId: formData.leadId,
          proposalType: formData.proposalType,
          title: formData.title,
          amount: formData.amount,
          durationDays: formData.durationDays,
          description: formData.description,
          scope: formData.scope,
          deliverables: formData.deliverables,
          terms: formData.terms,
        },
      });

      if (err) throw err;
      if (!data?.success) throw new Error(data?.error || 'Erreur de génération');

      await loadProposals();
      return { success: true, proposalId: data.proposalId, htmlContent: data.htmlContent };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Erreur' };
    }
  }, [loadProposals]);

  const updateStatus = useCallback(async (proposalId: string, newStatus: string) => {
    const updates: Record<string, unknown> = { status: newStatus };
    if (newStatus === 'sent') updates.sent_at = new Date().toISOString();
    if (newStatus === 'accepted') updates.accepted_at = new Date().toISOString();
    if (newStatus === 'rejected') updates.rejected_at = new Date().toISOString();

    const { error: err } = await supabase
      .from('proposals')
      .update(updates)
      .eq('id', proposalId);

    if (err) return { success: false, error: err.message };
    await loadProposals();
    return { success: true };
  }, [loadProposals]);

  const deleteProposal = useCallback(async (proposalId: string) => {
    const { error: err } = await supabase.from('proposals').delete().eq('id', proposalId);
    if (err) return { success: false, error: err.message };
    await loadProposals();
    return { success: true };
  }, [loadProposals]);

  useEffect(() => {
    loadProposals();
  }, [loadProposals]);

  return {
    proposals,
    stats,
    loading,
    error,
    selectedProposal,
    setSelectedProposal,
    loadProposals,
    generateProposal,
    updateStatus,
    deleteProposal,
    proposalTypeLabels,
    statusLabels,
  };
}