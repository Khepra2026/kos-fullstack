import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  REGULATORY_PATTERNS,
  CORRECTION_RECORDS,
  KNOWLEDGE_RULES,
  LEARNING_STATS,
  ARTICLE_BIG_FOUR_SCORES,
  CORRECTION_QUEUE,
  type RegulatoryPattern,
  type CorrectionRecord,
  type KnowledgeRule,
  type LearningStats,
  type ArticleBigFourScore,
  type CorrectionTicket,
} from '@/mocks/selfLearningEngine';

interface BlogRegulatoryState {
  patterns: RegulatoryPattern[];
  correctionRecords: CorrectionRecord[];
  knowledgeRules: KnowledgeRule[];
  learningStats: LearningStats;
  articleScores: ArticleBigFourScore[];
  correctionQueue: CorrectionTicket[];
  loading: boolean;
  error: string | null;
}

const initialState: BlogRegulatoryState = {
  patterns: REGULATORY_PATTERNS,
  correctionRecords: CORRECTION_RECORDS,
  knowledgeRules: KNOWLEDGE_RULES,
  learningStats: LEARNING_STATS,
  articleScores: ARTICLE_BIG_FOUR_SCORES,
  correctionQueue: CORRECTION_QUEUE,
  loading: false,
  error: null,
};

export function useBlogRegulatoryCorrection() {
  const [state, setState] = useState<BlogRegulatoryState>(initialState);

  const refresh = useCallback(() => {
    supabase.from('compliance_reviews').select('id').limit(1).then(({ error }) => {
      if (!error) console.log('[useBlogRegulatoryCorrection] Supabase alive — hybrid mode');
    }).catch(() => {});
    setState({
      patterns: REGULATORY_PATTERNS,
      correctionRecords: CORRECTION_RECORDS,
      knowledgeRules: KNOWLEDGE_RULES,
      learningStats: LEARNING_STATS,
      articleScores: ARTICLE_BIG_FOUR_SCORES,
      correctionQueue: CORRECTION_QUEUE,
      loading: false,
      error: null,
    });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const p0Count = state.correctionQueue.filter(t => t.severity === 'P0').length;
  const p1Count = state.correctionQueue.filter(t => t.severity === 'P1').length;
  const p2Count = state.correctionQueue.filter(t => t.severity === 'P2').length;
  const totalPending = state.correctionQueue.filter(t => t.status === 'pending' || t.status === 'in_progress').length;
  const totalFixed = state.correctionRecords.length;
  const excellentCount = state.articleScores.filter(a => a.status === 'excellent').length;
  const needsImprovementCount = state.articleScores.filter(a => a.status === 'a_ameliorer').length;
  const averageScore = state.articleScores.length > 0
    ? Math.round(state.articleScores.reduce((sum, a) => sum + a.scoreTotal, 0) / state.articleScores.length)
    : 0;

  return {
    ...state,
    p0Count,
    p1Count,
    p2Count,
    totalPending,
    totalFixed,
    excellentCount,
    needsImprovementCount,
    averageScore,
    refresh,
  };
}



