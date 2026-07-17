import { useState, useEffect, useCallback } from 'react';
import {
  PILLARS, EXECUTION_BLOCKS, SEO_PUBLICATION_PIPELINE,
  ARTICLE_COMPLIANCE_AUDIT, FULL_BLOCK_EXECUTION_KPIS,
  PillarSummary, ExecutionBlock, SEOPublicationPipeline, ArticleComplianceAudit,
} from '@/mocks/kosFullBlockExecution';

export function useKOSFullBlockExecution() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);
  const [pubFilter, setPubFilter] = useState<string>('all');
  const [articleFilter, setArticleFilter] = useState<string>('all');

  const [pillars, setPillars] = useState<PillarSummary[]>(PILLARS);
  const [blocks, setBlocks] = useState<ExecutionBlock[]>(EXECUTION_BLOCKS);
  const [publications, setPublications] = useState<SEOPublicationPipeline[]>(SEO_PUBLICATION_PIPELINE);
  const [articleAudits, setArticleAudits] = useState<ArticleComplianceAudit[]>(ARTICLE_COMPLIANCE_AUDIT);
  const [kpis, setKpis] = useState(FULL_BLOCK_EXECUTION_KPIS);

  const fetchFromSupabase = useCallback(async () => {
    try {
      const { createClient } = await import('@/lib/supabase');
      const supabase = createClient();
      const { data: healthCheck, error: healthError } = await supabase
        .from('kos_execution_logs')
        .select('id')
        .limit(1);

      if (healthError) throw healthError;
      if (!healthCheck || healthCheck.length === 0) throw new Error('Table vide');
      setIsLive(true);
    } catch {
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFromSupabase();
  }, [fetchFromSupabase]);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchFromSupabase();
  }, [fetchFromSupabase]);

  const filteredBlocks = selectedPillar
    ? blocks.filter(b => b.pillarId === selectedPillar)
    : blocks;

  const filteredPubs = publications.filter(p => {
    if (pubFilter === 'all') return true;
    return p.status === pubFilter;
  });

  const filteredArticles = articleAudits.filter(a => {
    if (articleFilter === 'all') return true;
    return a.status === articleFilter;
  });

  const pillarBlocks = (pillarId: string) => blocks.filter(b => b.pillarId === pillarId);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: 'bg-accent-100 text-accent-900',
      in_progress: 'bg-secondary-100 text-secondary-900',
      pending: 'bg-background-200 text-foreground-700',
      blocked: 'bg-red-100 text-red-900',
      compliant: 'bg-accent-100 text-accent-900',
      needs_fix: 'bg-amber-100 text-amber-900',
      critical: 'bg-red-100 text-red-900',
      published: 'bg-accent-100 text-accent-900',
      in_review: 'bg-secondary-100 text-secondary-900',
      draft: 'bg-amber-100 text-amber-900',
      planned: 'bg-background-200 text-foreground-700',
    };
    return colors[status] || 'bg-background-200 text-foreground-700';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      completed: 'Complété',
      in_progress: 'En cours',
      pending: 'En attente',
      blocked: 'Bloqué',
      compliant: 'Conforme',
      needs_fix: 'À corriger',
      critical: 'Critique',
      published: 'Publié',
      in_review: 'En revue',
      draft: 'Brouillon',
      planned: 'Planifié',
    };
    return labels[status] || status;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      P0: 'bg-red-100 text-red-900',
      P1: 'bg-amber-100 text-amber-900',
      P2: 'bg-secondary-100 text-secondary-900',
    };
    return colors[priority] || 'bg-background-200 text-foreground-700';
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-accent-500';
    if (score >= 85) return 'text-foreground-950';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 95) return 'bg-accent-500';
    if (score >= 85) return 'bg-foreground-950';
    if (score >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return {
    loading, error, isLive, activeTab, setActiveTab,
    selectedPillar, setSelectedPillar,
    expandedBlock, setExpandedBlock,
    pubFilter, setPubFilter,
    articleFilter, setArticleFilter,
    pillars, blocks, publications, articleAudits, kpis,
    filteredBlocks, filteredPubs, filteredArticles,
    pillarBlocks,
    getStatusColor, getStatusLabel, getPriorityColor, getScoreColor, getScoreBg,
    refresh,
  };
}