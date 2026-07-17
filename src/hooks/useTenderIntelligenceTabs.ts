import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  monitoredSources as mockSources,
  scraperLogs as mockScraperLogs,
  alertsSent as mockAlerts,
  deadlineTracker as mockDeadlines,
  knowledgeBase as mockKnowledge,
  autoResponses as mockAutoResponses,
} from '@/mocks/tenderIntelligence';

/* ================= TENDER SOURCES ================= */
export interface TenderSource {
  id: string;
  name: string;
  source_type: string;
  region: string;
  active_tenders: number;
  last_scan: string;
  status: string;
  reliability: number;
  url: string;
}

function normalizeSource(row: Record<string, unknown>): TenderSource {
  return {
    id: row.id as string,
    name: row.name as string,
    source_type: row.source_type as string,
    region: row.region as string,
    active_tenders: row.active_tenders as number,
    last_scan: row.last_scan as string,
    status: row.status as string,
    reliability: row.reliability as number,
    url: row.url as string,
  };
}

export function useTenderSources() {
  const [sources, setSources] = useState<TenderSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('tender_sources')
        .select('*')
        .order('reliability', { ascending: false });
      if (err) throw err;
      if (data && data.length > 0) {
        setSources(data.map(normalizeSource));
        setIsLive(true);
      } else {
        setSources(mockSources as unknown as TenderSource[]);
        setIsLive(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur';
      setError(msg);
      setSources(mockSources as unknown as TenderSource[]);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  return { sources, loading, error, isLive, refetch: fetch };
}

/* ================= SCRAPER LOGS ================= */
export interface ScraperLog {
  id: string;
  source: string;
  timestamp: string;
  documents_found: number;
  documents_downloaded: number;
  status: string;
  new_tenders: number;
  details: string;
}

function normalizeScraperLog(row: Record<string, unknown>): ScraperLog {
  return {
    id: row.id as string,
    source: row.source as string,
    timestamp: row.timestamp as string,
    documents_found: row.documents_found as number,
    documents_downloaded: row.documents_downloaded as number,
    status: row.status as string,
    new_tenders: row.new_tenders as number,
    details: row.details as string,
  };
}

export function useTenderScraperLogs() {
  const [logs, setLogs] = useState<ScraperLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('tender_scraper_logs')
        .select('*')
        .order('timestamp', { ascending: false });
      if (err) throw err;
      if (data && data.length > 0) {
        setLogs(data.map(normalizeScraperLog));
        setIsLive(true);
      } else {
        setLogs(mockScraperLogs);
        setIsLive(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur';
      setError(msg);
      setLogs(mockScraperLogs);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  return { logs, loading, error, isLive, refetch: fetch };
}

/* ================= ALERTS ================= */
export interface TenderAlert {
  id: string;
  tender_id: string;
  sent_at: string;
  channels: string[];
  recipients: string[];
  subject: string;
  status: string;
}

function normalizeAlert(row: Record<string, unknown>): TenderAlert {
  return {
    id: row.id as string,
    tender_id: row.tender_id as string,
    sent_at: row.sent_at as string,
    channels: row.channels as string[] || [],
    recipients: row.recipients as string[] || [],
    subject: row.subject as string,
    status: row.status as string,
  };
}

export function useTenderAlerts() {
  const [alerts, setAlerts] = useState<TenderAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('tender_alerts')
        .select('*')
        .order('sent_at', { ascending: false });
      if (err) throw err;
      if (data && data.length > 0) {
        setAlerts(data.map(normalizeAlert));
        setIsLive(true);
      } else {
        setAlerts(mockAlerts as unknown as TenderAlert[]);
        setIsLive(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur';
      setError(msg);
      setAlerts(mockAlerts as unknown as TenderAlert[]);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  return { alerts, loading, error, isLive, refetch: fetch };
}

/* ================= DEADLINES ================= */
export interface TenderDeadline {
  id: string;
  tender_id: string;
  tender_title: string;
  deadline: string;
  days_remaining: number;
  status: string;
  submission_status: string;
  completion_pct: number;
  urgency: string;
}

function normalizeDeadline(row: Record<string, unknown>): TenderDeadline {
  return {
    id: row.id as string,
    tender_id: row.tender_id as string,
    tender_title: row.tender_title as string,
    deadline: row.deadline as string,
    days_remaining: row.days_remaining as number,
    status: row.status as string,
    submission_status: row.submission_status as string,
    completion_pct: row.completion_pct as number,
    urgency: row.urgency as string,
  };
}

export function useTenderDeadlines() {
  const [deadlines, setDeadlines] = useState<TenderDeadline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('tender_deadlines')
        .select('*')
        .order('days_remaining', { ascending: true });
      if (err) throw err;
      if (data && data.length > 0) {
        setDeadlines(data.map(normalizeDeadline));
        setIsLive(true);
      } else {
        setDeadlines(mockDeadlines as unknown as TenderDeadline[]);
        setIsLive(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur';
      setError(msg);
      setDeadlines(mockDeadlines as unknown as TenderDeadline[]);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  return { deadlines, loading, error, isLive, refetch: fetch };
}

/* ================= KNOWLEDGE BASE ================= */
export interface TenderKnowledge {
  id: string;
  category: string;
  title: string;
  date: string;
  contract_value?: number;
  lost_to?: string;
  lesson?: string;
  usage_count?: number;
  template_available?: boolean;
  relevant_docs: string[];
  similarity_tags: string[];
}

function normalizeKnowledge(row: Record<string, unknown>): TenderKnowledge {
  return {
    id: row.id as string,
    category: row.category as string,
    title: row.title as string,
    date: row.date as string,
    contract_value: row.contract_value as number | undefined,
    lost_to: row.lost_to as string | undefined,
    lesson: row.lesson as string | undefined,
    usage_count: row.usage_count as number | undefined,
    template_available: row.template_available as boolean | undefined,
    relevant_docs: row.relevant_docs as string[] || [],
    similarity_tags: row.similarity_tags as string[] || [],
  };
}

export function useTenderKnowledgeBase() {
  const [knowledge, setKnowledge] = useState<TenderKnowledge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('tender_knowledge_base')
        .select('*')
        .order('created_at', { ascending: false });
      if (err) throw err;
      if (data && data.length > 0) {
        setKnowledge(data.map(normalizeKnowledge));
        setIsLive(true);
      } else {
        setKnowledge(mockKnowledge as unknown as TenderKnowledge[]);
        setIsLive(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur';
      setError(msg);
      setKnowledge(mockKnowledge as unknown as TenderKnowledge[]);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  return { knowledge, loading, error, isLive, refetch: fetch };
}

/* ================= AUTO RESPONSES ================= */
export interface TenderAutoResponse {
  id: string;
  tender_id: string;
  components_generated: string[];
  status: string;
  last_updated: string;
}

function normalizeAutoResponse(row: Record<string, unknown>): TenderAutoResponse {
  return {
    id: row.id as string,
    tender_id: row.tender_id as string,
    components_generated: row.components_generated as string[] || [],
    status: row.status as string,
    last_updated: row.last_updated as string,
  };
}

export function useTenderAutoResponses() {
  const [responses, setResponses] = useState<TenderAutoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('tender_auto_responses')
        .select('*')
        .order('last_updated', { ascending: false });
      if (err) throw err;
      if (data && data.length > 0) {
        setResponses(data.map(normalizeAutoResponse));
        setIsLive(true);
      } else {
        setResponses(mockAutoResponses as unknown as TenderAutoResponse[]);
        setIsLive(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur';
      setError(msg);
      setResponses(mockAutoResponses as unknown as TenderAutoResponse[]);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  return { responses, loading, error, isLive, refetch: fetch };
}