import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { proposalDrafts as mockProposals } from '@/mocks/proposalDrafts';

export interface ProposalDraft {
  id: string;
  title: string;
  client_sector: string;
  score: number;
  status: string;
  budget_estimate: number;
  timeline_days: number;
  methodology: Record<string, unknown>;
  team_composition: { role: string; experience: string; allocation: string }[];
}

function mapDbProposal(db: Record<string, unknown>): ProposalDraft {
  return {
    id: String(db.id),
    title: (db.proposal_title as string) || '',
    client_sector: (db.sector as string) || '',
    score: Number(db.win_probability) || 0,
    status: (db.status as string) === 'won' ? 'completed' : (db.status as string) === 'in_progress' ? 'completed' : (db.status as string),
    budget_estimate: Number(db.budget_estimated) || 0,
    timeline_days: (Number(db.duration_months) || 3) * 30,
    methodology: {
      phases: (db.methodology as string)?.split('→').map((s: string) => s.trim()).filter(Boolean) || [],
    },
    team_composition: Array.isArray(db.team_composition)
      ? (db.team_composition as string[]).map((t: string) => {
          const parts = t.match(/^(.+?)\s*\((.+?)\)$/);
          return { role: parts?.[1] || t, experience: parts?.[2] || '', allocation: '100%' };
        })
      : [],
  };
}

export function useProposalDrafts() {
  const [data, setData] = useState<ProposalDraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Try proposal_intelligence first (has richer data)
      const { data: liveIntel, error: intelErr } = await supabase
        .from('proposal_intelligence')
        .select('*')
        .order('created_at', { ascending: false });

      if (!intelErr && liveIntel && liveIntel.length > 0) {
        setData((liveIntel as Record<string, unknown>[]).map(mapDbProposal));
        setIsLive(true);
        return;
      }

      // Fallback to proposal_drafts
      const { data: liveDrafts, error: draftsErr } = await supabase
        .from('proposal_drafts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!draftsErr && liveDrafts && liveDrafts.length > 0) {
        setData((liveDrafts as Record<string, unknown>[]).map(mapDbProposal));
        setIsLive(true);
        return;
      }

      // Fallback to mock
      setData(mockProposals as ProposalDraft[]);
      setIsLive(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur';
      setError(msg);
      setData(mockProposals as ProposalDraft[]);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, isLive, error, refresh: fetchData };
}