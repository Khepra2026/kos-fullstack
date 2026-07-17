import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  KG_SOURCES,
  KG_AGENTS,
  KG_DOCUMENTS,
  KG_GLOBAL_METRICS,
  type KGSource,
  type KGAgent,
  type KGDocument,
} from '@/mocks/kosBloc01KnowledgeGraph';

interface UseKnowledgeGraphReturn {
  sources: KGSource[];
  agents: KGAgent[];
  documents: KGDocument[];
  globalMetrics: typeof KG_GLOBAL_METRICS;
  isLive: boolean;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useKnowledgeGraph(): UseKnowledgeGraphReturn {
  const [sources, setSources] = useState<KGSource[]>(KG_SOURCES);
  const [agents, setAgents] = useState<KGAgent[]>(KG_AGENTS);
  const [documents, setDocuments] = useState<KGDocument[]>(KG_DOCUMENTS);
  const [globalMetrics, setGlobalMetrics] = useState(KG_GLOBAL_METRICS);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: liveData, error: dbError } = await supabase
        .from('knowledge_graph')
        .select('*')
        .order('entity_name');

      if (dbError) throw dbError;

      if (liveData && liveData.length > 0) {
        // Map Supabase entities to KGSource structure
        const mappedSources: KGSource[] = liveData.map((row: any) => {
          const metadata = typeof row.metadata === 'string'
            ? JSON.parse(row.metadata)
            : (row.metadata || {});
          const tags = Array.isArray(row.tags) ? row.tags : [];

          return {
            id: String(row.id),
            nom: row.entity_name,
            type: (row.entity_type === 'regulator' ? 'regulateur'
              : row.entity_type === 'standard' ? 'standard'
              : row.entity_type === 'development' ? 'developpement'
              : 'international') as KGSource['type'],
            documents_indexes: row.document_count || 0,
            couverture: metadata.coverage || 80,
            derniere_sync: row.last_enriched
              ? new Date(row.last_enriched).toISOString()
              : new Date().toISOString(),
            frequence: metadata.frequency || 'Quotidienne',
            icon: metadata.icon || 'ri-database-2-line',
            description: row.description || '',
          };
        });

        if (mappedSources.length > 0) {
          setSources(mappedSources);
          // Keep agents, documents, and metrics from mock (richer structure)
          setAgents(KG_AGENTS);
          setDocuments(KG_DOCUMENTS);
          setGlobalMetrics({
            ...KG_GLOBAL_METRICS,
            total_documents: liveData.reduce((s: number, r: any) => s + (r.document_count || 0), 0),
          });
          setIsLive(true);
        } else {
          setSources(KG_SOURCES);
          setAgents(KG_AGENTS);
          setDocuments(KG_DOCUMENTS);
          setGlobalMetrics(KG_GLOBAL_METRICS);
          setIsLive(false);
        }
      } else {
        setSources(KG_SOURCES);
        setAgents(KG_AGENTS);
        setDocuments(KG_DOCUMENTS);
        setGlobalMetrics(KG_GLOBAL_METRICS);
        setIsLive(false);
      }
    } catch {
      setSources(KG_SOURCES);
      setAgents(KG_AGENTS);
      setDocuments(KG_DOCUMENTS);
      setGlobalMetrics(KG_GLOBAL_METRICS);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    sources,
    agents,
    documents,
    globalMetrics,
    isLive,
    loading,
    error,
    refetch: fetchData,
  };
}