import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  calculateLeadScore,
  getEmailSequence,
  getRecommendedResponseTime,
  getSalesPriority,
  type LeadData,
  type LeadScore,
} from '@/components/feature/LeadScoringEngine';

function mapSectorToOrgType(sector: string): string {
  const map: Record<string, string> = {
    banque: 'grande-entreprise',
    microfinance: 'microfinance',
    assurance: 'grande-entreprise',
    fintech: 'pme',
    industrie: 'grande-entreprise',
    services: 'pme',
    public: 'institution-publique',
    autre: 'pme',
  };
  return map[sector] || 'pme';
}

export interface ScoredLeadResult {
  leadScore: LeadScore;
  emailSequence: string[];
  responseTime: number;
  priority: string;
  stored: boolean;
}

interface UseKnowledgeLeadScoringReturn {
  scoreLead: (formData: Record<string, string>) => Promise<ScoredLeadResult>;
  scoring: boolean;
  error: string | null;
}

export function useKnowledgeLeadScoring(): UseKnowledgeLeadScoringReturn {
  const [scoring, setScoring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function scoreLead(formData: Record<string, string>): Promise<ScoredLeadResult> {
    setScoring(true);
    setError(null);

    const fullName = `${formData.first_name || ''} ${formData.last_name || ''}`.trim();
    const leadData: LeadData = {
      full_name: fullName,
      email: formData.email || '',
      phone: formData.phone || undefined,
      organization: formData.company || undefined,
      position: formData.job_title || undefined,
      organizationType: mapSectorToOrgType(formData.sector || ''),
      budget: undefined,
      timeline: undefined,
      priority: undefined,
      source_page: '/kos-knowledge-center',
      form_type: 'knowledge-center-download',
      metadata: {
        resource_title: formData.resource_title,
        resource_type: formData.resource_type,
        resource_format: formData.resource_format,
      },
    };

    const leadScore = calculateLeadScore(leadData);
    const emailSequence = getEmailSequence(leadScore);
    const responseTime = getRecommendedResponseTime(leadScore);
    const priority = getSalesPriority(leadScore);

    let stored = false;
    try {
      const pipelineStage = leadScore.category === 'hot' ? 'qualification' : leadScore.category === 'warm' ? 'nurturing' : 'new';
      const estimatedValue = leadScore.category === 'hot' ? '25M-50M FCFA' : leadScore.category === 'warm' ? '10M-25M FCFA' : '5M-10M FCFA';

      const { data: leadInsert, error: leadError } = await supabase
        .from('leads')
        .insert({
          full_name: fullName,
          email: formData.email,
          organization: formData.company,
          position: formData.job_title,
          source_page: '/kos-knowledge-center',
          form_type: 'knowledge-center-download',
          status: pipelineStage,
          lead_score: leadScore.total,
          lead_category: leadScore.category,
          score_breakdown: leadScore.breakdown as any,
          recommendations: leadScore.recommendations,
          email_sequence: emailSequence,
          pipeline_stage: pipelineStage,
          estimated_value: estimatedValue,
          last_activity_at: new Date().toISOString(),
        })
        .select('id')
        .maybeSingle();

      if (!leadError && leadInsert?.id) {
        stored = true;
      }
    } catch (supaErr) {
      console.warn('Supabase lead insert skipped, scoring ran locally:', supaErr);
    }

    return { leadScore, emailSequence, responseTime, priority, stored };
  }

  return { scoreLead, scoring, error };
}