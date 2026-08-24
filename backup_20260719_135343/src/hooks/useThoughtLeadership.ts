import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { thoughtLeadershipData } from '@/mocks/thoughtLeadershipCenter';
import { logHookAudit, createAuditEntry, type HookAuditEntry } from '@/utils/hookAuditLogger';

interface ExecutiveContent {
  id: string;
  content_type: string;
  title: string;
  status: string;
  quality_score: number;
  target_audience: string;
  delivery_channel: string[];
  key_messages: string[];
  created_at: string;
  [key: string]: unknown;
}

interface AuditMeta {
  content: HookAuditEntry | null;
}

export function useThoughtLeadership() {
  const [data, setData] = useState(structuredClone(thoughtLeadershipData));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [liveContent, setLiveContent] = useState<ExecutiveContent[]>([]);
  const [auditTrail, setAuditTrail] = useState<AuditMeta>({ content: null });

  const fetchLive = useCallback(async () => {
    setLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      // Fetch from executive_content_studio for thought leadership content
      const { data: studio, error: studioErr } = await supabase
        .from('executive_content_studio')
        .select('*')
        .order('created_at', { ascending: false });

      const durationMs = Math.round(performance.now() - startTime);

      if (studioErr) throw studioErr;

      if (studio && studio.length > 0) {
        setLiveContent(studio as ExecutiveContent[]);
        setIsLive(true);
        const entry = createAuditEntry('useThoughtLeadership', 'supabase', studio.length, 'executive_content_studio', undefined, durationMs);
        logHookAudit(entry);
        setAuditTrail({ content: entry });
      } else {
        setLiveContent([]);
        setIsLive(false);
        const entry = createAuditEntry('useThoughtLeadership', 'mock_fallback', 0, 'executive_content_studio', 'Table vide — fallback mock', durationMs);
        logHookAudit(entry);
        setAuditTrail({ content: entry });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Erreur de connexion Supabase';
      setError(msg);
      setIsLive(false);
      const durationMs = Math.round(performance.now() - startTime);
      const entry = createAuditEntry('useThoughtLeadership', 'error_fallback', 0, 'executive_content_studio', msg, durationMs);
      logHookAudit(entry);
      setAuditTrail({ content: entry });
      // Keep mock data on error
      setData(structuredClone(thoughtLeadershipData));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLive();
  }, [fetchLive]);

  return { data, liveContent, isLive, loading, error, refetch: fetchLive, auditTrail };
}



