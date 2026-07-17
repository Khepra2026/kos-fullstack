import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  GEO_PILLAR_PAGES, GEO_FAQ_ITEMS, GEO_GLOSSARY_ENTRIES, GEO_GUIDES,
  GEO_CASE_STUDY_ITEMS, GEO_STRUCTURED_DATA, GEO_AGENTS_V3, GEO_GLOBAL_METRICS_V3,
  type GEOPillarPage, type GEOFAQItem, type GEOGlossaryEntry, type GEOGuide,
  type GEOCaseStudyItem, type GEOStructuredDataItem, type GEOAgentItem,
} from '@/mocks/kosGeoAuthorityEngine';

interface UseGEOAuthorityV3Return {
  pillarPages: GEOPillarPage[];
  faqs: GEOFAQItem[];
  glossary: GEOGlossaryEntry[];
  guides: GEOGuide[];
  caseStudies: GEOCaseStudyItem[];
  structuredData: GEOStructuredDataItem[];
  agents: GEOAgentItem[];
  globalMetrics: typeof GEO_GLOBAL_METRICS_V3;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGEOAuthorityV3(): UseGEOAuthorityV3Return {
  const [pillarPages, setPillarPages] = useState<GEOPillarPage[]>([]);
  const [faqs, setFaqs] = useState<GEOFAQItem[]>([]);
  const [glossary, setGlossary] = useState<GEOGlossaryEntry[]>([]);
  const [guides, setGuides] = useState<GEOGuide[]>([]);
  const [caseStudies, setCaseStudies] = useState<GEOCaseStudyItem[]>([]);
  const [structuredData, setStructuredData] = useState<GEOStructuredDataItem[]>([]);
  const [agents] = useState<GEOAgentItem[]>(GEO_AGENTS_V3);
  const [globalMetrics] = useState(GEO_GLOBAL_METRICS_V3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      await supabase.from('knowledge_graph').select('id').limit(1);
      setPillarPages(GEO_PILLAR_PAGES);
      setFaqs(GEO_FAQ_ITEMS);
      setGlossary(GEO_GLOSSARY_ENTRIES);
      setGuides(GEO_GUIDES);
      setCaseStudies(GEO_CASE_STUDY_ITEMS);
      setStructuredData(GEO_STRUCTURED_DATA);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur';
      setError(msg);
      setPillarPages(GEO_PILLAR_PAGES);
      setFaqs(GEO_FAQ_ITEMS);
      setGlossary(GEO_GLOSSARY_ENTRIES);
      setGuides(GEO_GUIDES);
      setCaseStudies(GEO_CASE_STUDY_ITEMS);
      setStructuredData(GEO_STRUCTURED_DATA);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);
  return { pillarPages, faqs, glossary, guides, caseStudies, structuredData, agents, globalMetrics, loading, error, refetch: fetchData };
}