import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  SEO_AUDIT_PAGES,
  SEO_AUDIT_LAST_RUN,
  SEO_AEO_GLOBAL_STATS,
} from '@/mocks/seoAudit';
import type { SEOAuditPage, SEOAuditRun } from '@/mocks/seoAudit';

const SUPABASE_URL = 'https://pgfwhahiwqvqeahpirjx.supabase.co';
const SEO_AUDIT_FN = `${SUPABASE_URL}/functions/v1/kos-seo-audit`;

export function useSEOAudit() {
  const [pages, setPages] = useState<SEOAuditPage[]>(SEO_AUDIT_PAGES);
  const [lastRun, setLastRun] = useState<SEOAuditRun>(SEO_AUDIT_LAST_RUN);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFromSupabase = useCallback(async () => {
    try {
      const { data, error: dbError } = await supabase
        .from('seo_audit_results')
        .select('*')
        .order('checked_at', { ascending: false })
        .limit(50);

      if (dbError) throw dbError;

      if (data && data.length > 0) {
        const runIds = [...new Set(data.map((r: { audit_run_id: string }) => r.audit_run_id))];
        const latestRun = runIds[0];

        const runPages = data
          .filter((r: { audit_run_id: string }) => r.audit_run_id === latestRun)
          .map((r: Record<string, unknown>) => ({
            page_url: r.page_url,
            page_title: r.page_title,
            meta_description: r.meta_description,
            meta_description_length: r.meta_description_length,
            h1_count: r.h1_count,
            h1_texts: r.h1_texts,
            h2_count: r.h2_count,
            h2_texts: r.h2_texts,
            h3_count: r.h3_count,
            hn_structure_score: r.hn_structure_score,
            word_count: r.word_count,
            content_quality_score: r.content_quality_score,
            images_count: r.images_count,
            images_without_alt: r.images_without_alt,
            images_broken: r.images_broken,
            broken_links_count: r.broken_links_count,
            internal_links_count: r.internal_links_count,
            external_links_count: r.external_links_count,
            canonical_valid: r.canonical_valid,
            has_og_tags: r.has_og_tags,
            has_twitter_card: r.has_twitter_card,
            has_schema_org: r.has_schema_org,
            schema_types: r.schema_types,
            load_time_ms: r.load_time_ms,
            page_size_kb: r.page_size_kb,
            status_code: r.status_code,
            is_indexable: r.is_indexable,
            has_faq_schema: r.has_faq_schema,
            has_howto_schema: r.has_howto_schema,
            has_speakable_schema: r.has_speakable_schema,
            aeo_featured_snippet_score: r.aeo_featured_snippet_score,
            aeo_questions_detected: r.aeo_questions_detected,
            aeo_answers_detected: r.aeo_answers_detected,
            seo_score: r.seo_score,
            aeo_score: r.aeo_score,
            overall_score: r.overall_score,
            recommendations: r.recommendations,
            critical_issues: r.critical_issues,
            warnings: r.warnings,
          }));

        setPages(runPages as SEOAuditPage[]);
        setIsLive(true);

        const seoScores = runPages.map((p: SEOAuditPage) => p.seo_score);
        const aeoScores = runPages.map((p: SEOAuditPage) => p.aeo_score);
        const overallScores = runPages.map((p: SEOAuditPage) => p.overall_score);
        const criticalCount = runPages.reduce((s: number, p: SEOAuditPage) => s + p.critical_issues.length, 0);
        const warnCount = runPages.reduce((s: number, p: SEOAuditPage) => s + p.warnings.length, 0);

        setLastRun({
          audit_run_id: latestRun,
          pages_crawled: runPages.length,
          average_seo_score: Math.round((seoScores.reduce((a: number, b: number) => a + b, 0) / runPages.length) * 10) / 10,
          average_aeo_score: Math.round((aeoScores.reduce((a: number, b: number) => a + b, 0) / runPages.length) * 10) / 10,
          average_overall_score: Math.round((overallScores.reduce((a: number, b: number) => a + b, 0) / runPages.length) * 10) / 10,
          critical_issues: criticalCount,
          warnings: warnCount,
          timestamp: data[0]?.checked_at || new Date().toISOString(),
        });
      }
    } catch {
      setPages(SEO_AUDIT_PAGES);
      setLastRun(SEO_AUDIT_LAST_RUN);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchFromSupabase();
  }, [fetchFromSupabase]);

  const runAudit = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(`${SEO_AUDIT_FN}?mode=priority`);
      const data = await resp.json();
      if (data.success) {
        setLastRun({
          audit_run_id: data.audit_run_id,
          pages_crawled: data.pages_crawled,
          average_seo_score: data.average_seo_score,
          average_aeo_score: data.average_aeo_score,
          average_overall_score: data.average_overall_score,
          critical_issues: data.critical_issues,
          warnings: data.warnings,
          timestamp: data.timestamp,
        });
        await fetchFromSupabase();
      } else {
        setError(data.error || 'Audit échoué');
      }
    } catch {
      setError('Impossible de contacter le moteur SEO Audit');
    } finally {
      setLoading(false);
    }
  }, [fetchFromSupabase]);

  return {
    pages,
    lastRun,
    globalStats: SEO_AEO_GLOBAL_STATS,
    loading,
    isLive,
    error,
    runAudit,
  };
}