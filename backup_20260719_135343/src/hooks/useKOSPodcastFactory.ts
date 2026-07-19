import { useState, useMemo, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  PODCAST_SUBJECTS as MOCK_SUBJECTS,
  PODCAST_SCRIPTS as MOCK_SCRIPTS,
  PRODUCTION_VARIANTS,
  QUALITY_STANDARDS,
  PODCAST_FACTORY_KPIS,
  PODCAST_FACTORY_STATS,
} from '@/mocks/podcastFactory';
import type {
  PodcastSubject,
  PodcastScript,
  ProductionVariant,
  QualityStandard,
} from '@/mocks/podcastFactory';

interface UseKOSPodcastFactoryReturn {
  loading: boolean;
  isLive: boolean;
  refetch: () => void;
  subjects: PodcastSubject[];
  subjectSummary: Array<PodcastSubject & { scriptCount: number; availableFormats: string[] }>;
  selectedSubject: string | null;
  setSelectedSubject: (id: string | null) => void;
  formatFilter: string;
  setFormatFilter: (f: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  getSubjectById: (id: string) => PodcastSubject | null;
  searchSubjects: (q: string) => PodcastSubject[];
  getSubjectsByDomain: (domain: string) => PodcastSubject[];
  scripts: PodcastScript[];
  getScriptsBySubject: (subjectId: string) => PodcastScript[];
  getScriptsByFormat: (format: string) => PodcastScript[];
  getScriptById: (id: string) => PodcastScript | null;
  productionVariants: ProductionVariant[];
  getProductionVariants: () => ProductionVariant[];
  getVariantByFormat: (format: string) => ProductionVariant | null;
  qualityStandards: QualityStandard[];
  getQualityStandards: () => QualityStandard[];
  kpis: typeof PODCAST_FACTORY_KPIS;
  getKPIs: () => typeof PODCAST_FACTORY_KPIS;
  stats: typeof PODCAST_FACTORY_STATS;
  getStats: () => typeof PODCAST_FACTORY_STATS;
  availableFormats: string[];
  availableDomains: string[];
}

export function useKOSPodcastFactory(): UseKOSPodcastFactoryReturn {
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [subjects, setSubjects] = useState<PodcastSubject[]>(MOCK_SUBJECTS);
  const [scripts, setScripts] = useState<PodcastScript[]>(MOCK_SCRIPTS);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [formatFilter, setFormatFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error: err } = await supabase
        .from('studio_media_requests')
        .select('*')
        .eq('video_type', 'podcast')
        .order('created_at', { ascending: false });

      if (err) throw err;
      if (data && data.length > 0) {
        // Normalize studio_media_requests into podcast subjects
        const normalizedSubjects: PodcastSubject[] = data.map((row: Record<string, unknown>) => ({
          id: String(row.id || ''),
          title: String(row.topic || row.title || ''),
          synopsis: String((row.metadata as Record<string, unknown>)?.synopsis || row.topic || ''),
          domain: String((row.metadata as Record<string, unknown>)?.domain || 'Réglementaire'),
          keyTopics: (row.keywords as string[]) || [],
          duration: String(row.duration || '25 min'),
          status: String(row.status || 'draft'),
          priority: Number(row.priority || 2),
          createdAt: String(row.created_at || new Date().toISOString()),
        }));
        setSubjects(normalizedSubjects);
        setIsLive(true);
      } else {
        setSubjects(MOCK_SUBJECTS);
        setIsLive(false);
      }
    } catch {
      setSubjects(MOCK_SUBJECTS);
      setIsLive(false);
    }
    // Scripts — mock fallback (no direct Supabase table for podcast scripts)
    setScripts(MOCK_SCRIPTS);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getSubjectById = useCallback((id: string) => subjects.find(s => s.id === id) || null, [subjects]);

  const searchSubjects = useCallback((q: string) => {
    const lower = q.toLowerCase();
    return subjects.filter(s =>
      s.title.toLowerCase().includes(lower) ||
      s.synopsis.toLowerCase().includes(lower) ||
      s.domain.toLowerCase().includes(lower) ||
      s.keyTopics.some(t => t.toLowerCase().includes(lower))
    );
  }, [subjects]);

  const getSubjectsByDomain = useCallback((domain: string) => {
    if (domain === 'all') return subjects;
    return subjects.filter(s => s.domain.toLowerCase() === domain.toLowerCase());
  }, [subjects]);

  const getScriptsBySubject = useCallback((subjectId: string) => {
    return scripts.filter(s => s.subjectId === subjectId);
  }, [scripts]);

  const getScriptsByFormat = useCallback((format: string) => {
    if (format === 'all') return scripts;
    return scripts.filter(s => s.format === format);
  }, [scripts]);

  const getScriptById = useCallback((id: string) => scripts.find(s => s.id === id) || null, [scripts]);

  const getProductionVariants = useCallback(() => PRODUCTION_VARIANTS, []);
  const getVariantByFormat = useCallback((format: string) => {
    return PRODUCTION_VARIANTS.find(v => v.format === format) || null;
  }, []);
  const getQualityStandards = useCallback(() => QUALITY_STANDARDS, []);
  const getKPIs = useCallback(() => PODCAST_FACTORY_KPIS, []);
  const getStats = useCallback(() => PODCAST_FACTORY_STATS, []);

  const availableFormats = useMemo(() => [...new Set(scripts.map(s => s.format))], [scripts]);
  const availableDomains = useMemo(() => [...new Set(subjects.map(s => s.domain))], [subjects]);

  const subjectSummary = useMemo(() => {
    return subjects.map(s => ({
      ...s,
      scriptCount: scripts.filter(sc => sc.subjectId === s.id).length,
      availableFormats: scripts.filter(sc => sc.subjectId === s.id).map(sc => sc.format),
    }));
  }, [subjects, scripts]);

  return {
    loading,
    isLive,
    refetch: fetchData,
    subjects,
    subjectSummary,
    selectedSubject,
    setSelectedSubject,
    formatFilter,
    setFormatFilter,
    searchQuery,
    setSearchQuery,
    getSubjectById,
    searchSubjects,
    getSubjectsByDomain,
    scripts,
    getScriptsBySubject,
    getScriptsByFormat,
    getScriptById,
    productionVariants: PRODUCTION_VARIANTS,
    getProductionVariants,
    getVariantByFormat,
    qualityStandards: QUALITY_STANDARDS,
    getQualityStandards,
    kpis: PODCAST_FACTORY_KPIS,
    getKPIs,
    stats: PODCAST_FACTORY_STATS,
    getStats,
    availableFormats,
    availableDomains,
  };
}



