import { useState } from 'react';
import { PipelineTrigger, PipelineResult } from '@/types/kos';
import { useVeilleAgent } from '@/agents/VeilleAgent';
import { useSEOAgent } from '@/agents/SEOAgent';
import { useCopywritingAgent } from '@/agents/CopywritingAgent';
import { useFactCheckAgent } from '@/agents/FactCheckAgent';
import { useQualityAgent } from '@/agents/QualityAgent';
import { useBrandAgent } from '@/agents/BrandAgent';
import { useSocialAgent } from '@/agents/SocialAgent';
import { usePublishAgent } from '@/agents/PublishAgent';
import { useAnalyticsAgent } from '@/agents/AnalyticsAgent';
import { supabase } from '@/lib/supabase';

export function useKOSPipeline() {
  const [isRunning, setIsRunning] = useState(false);
  const [lastResult, setLastResult] = useState<PipelineResult | null>(null);
  const [currentStep, setCurrentStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [runId, setRunId] = useState<string | null>(null);

  const veille = useVeilleAgent();
  const seo = useSEOAgent();
  const copy = useCopywritingAgent();
  const factCheck = useFactCheckAgent();
  const quality = useQualityAgent();
  const brand = useBrandAgent();
  const social = useSocialAgent();
  const publish = usePublishAgent();
  const analytics = useAnalyticsAgent();

  const logStep = async (step: string, runUuid: string) => {
    try {
      await supabase.from('kos_pipeline_runs').update({ current_step: step }).eq('id', runUuid);
    } catch {
      // Non-bloquant
    }
  };

  const runPipeline = async (trigger: PipelineTrigger): Promise<PipelineResult> => {
    setIsRunning(true);
    setError(null);
    setLastResult(null);

    const newRunId = crypto.randomUUID();
    setRunId(newRunId);

    // Insert initial run record
    try {
      await supabase.from('kos_pipeline_runs').insert({
        id: newRunId,
        trigger_type: trigger.type,
        regulator_source: trigger.payload.source || '',
        doc_id: trigger.payload.docId || '',
        status: 'running',
        started_at: new Date().toISOString(),
      });
    } catch {
      // Non-bloquant
    }

    try {
      setCurrentStep('Veille réglementaire');
      await logStep('Veille réglementaire', newRunId);
      const reglementation = await veille.analyze(trigger.payload);

      setCurrentStep('Rédaction + SEO');
      await logStep('Rédaction + SEO', newRunId);
      const [article, seoData] = await Promise.all([
        copy.generateArticle(reglementation),
        seo.optimize(reglementation),
      ]);

      setCurrentStep('Fact-checking');
      await logStep('Fact-checking', newRunId);
      const checked = await factCheck.verify(article, reglementation.sources);

      setCurrentStep('Contrôle Qualité Big Four');
      await logStep('Contrôle Qualité Big Four', newRunId);
      const qualityScore = await quality.evaluate(article);

      setCurrentStep('Contrôle Marque');
      await logStep('Contrôle Marque', newRunId);
      const brandScore = await brand.evaluate(article);

      if (qualityScore.scoreRisque > 0.2 || brandScore.conformite < 0.95) {
        throw new Error(
          `Seuils Big Four non atteints: Qualité ${qualityScore.scoreQualite}, Marque ${brandScore.conformite}`
        );
      }

      setCurrentStep('Déclinaison omnicanale');
      await logStep('Déclinaison omnicanale', newRunId);
      const socialPosts = await social.adaptAllChannels(article, seoData);

      setCurrentStep('Publication');
      await logStep('Publication', newRunId);
      const publishResults = await publish.deploy({
        article: article as Record<string, unknown>,
        seo: seoData as Record<string, unknown>,
        socials: socialPosts,
        targets: ['web', 'linkedin', 'facebook', 'instagram', 'x', 'gbp', 'newsletter'],
      });

      setCurrentStep('Tracking KPI');
      await logStep('Tracking KPI', newRunId);
      await analytics.track(publishResults);

      const result: PipelineResult = {
        status: 'SUCCESS',
        audit: qualityScore,
        results: publishResults,
      };

      // Update run as completed
      try {
        await supabase.from('kos_pipeline_runs').update({
          status: 'completed',
          current_step: 'Terminé',
          quality_score: qualityScore.scoreQualite,
          audit_id: qualityScore.auditId,
          results: publishResults,
          completed_at: new Date().toISOString(),
        }).eq('id', newRunId);
      } catch {
        // Non-bloquant
      }

      setLastResult(result);
      setCurrentStep('');
      return result;
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : 'Erreur inconnue';
      setError(errMsg);
      setCurrentStep('');

      // Update run as failed
      try {
        await supabase.from('kos_pipeline_runs').update({
          status: 'failed',
          current_step: currentStep || 'Inconnu',
          error_message: errMsg,
          completed_at: new Date().toISOString(),
        }).eq('id', newRunId);
      } catch {
        // Non-bloquant
      }

      const failedResult: PipelineResult = {
        status: 'FAILED',
        audit: {
          sourcesOfficielles: false,
          coherenceReglementaire: 0,
          conformiteJuridique: false,
          conformiteMarque: 0,
          scoreSEO: 0,
          scoreLisibilite: 0,
          scoreIA: 0,
          scoreRisque: 1,
          scoreQualite: 0,
          auditId: `AUD-FAIL-${Date.now()}`,
          timestamp: new Date().toISOString(),
          version: '0',
        },
        results: [],
      };
      setLastResult(failedResult);
      return failedResult;
    } finally {
      setIsRunning(false);
    }
  };

  return { runPipeline, isRunning, lastResult, currentStep, error, runId };
}