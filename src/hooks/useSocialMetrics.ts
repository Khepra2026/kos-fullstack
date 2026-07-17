import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { mockSocialMetrics } from "@/mocks/socialMetrics";

interface TwitterMetrics {
  followers: number;
  following: number;
  tweets: number;
  engagement_rate: number;
  impressions_30d: number;
  likes_30d: number;
  retweets_30d: number;
  top_tweet: { text: string; likes: number; retweets: number; date: string } | null;
}

interface LinkedInCompanyMetrics {
  followers: number;
  employee_count: number | null;
  description: string | null;
  industry: string | null;
}

interface LinkedInFounderMetrics {
  connections: number | null;
  followers: number | null;
  headline: string | null;
}

interface SocialMetricsMeta {
  source: "live" | "mock" | "partial" | "bridge";
  twitter_available: boolean;
  linkedin_company_available: boolean;
  linkedin_founder_available: boolean;
  bridge_used: boolean;
  last_updated: string;
  error: string | null;
}

export interface SocialMetricsData {
  twitter: TwitterMetrics;
  linkedin_company: LinkedInCompanyMetrics;
  linkedin_founder: LinkedInFounderMetrics;
  meta: SocialMetricsMeta;
}

export function useSocialMetrics() {
  const [data, setData] = useState<SocialMetricsData>(mockSocialMetrics as SocialMetricsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<unknown>(null);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);
    setRawResponse(null);
    try {
      const { data: fnData, error: fnError } = await supabase.functions.invoke("kos-social-master", {
        body: {},
      });
      if (fnError) throw new Error(fnError.message || "Edge function error");
      if (fnData) {
        console.log("[useSocialMetrics] Edge Function response:", JSON.stringify(fnData, null, 2));
        setRawResponse(fnData);
        setData(fnData as SocialMetricsData);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to fetch social metrics";
      console.error("[useSocialMetrics] Error:", msg);
      setError(msg);
      setData(mockSocialMetrics as SocialMetricsData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return { data, loading, error, rawResponse, refetch: fetchMetrics };
}