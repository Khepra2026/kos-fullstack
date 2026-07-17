import { useState, useMemo, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  PROPRIETARY_VOICE_PROFILES as MOCK_PROFILES,
  PRONUNCIATION_DICTIONARIES,
  SCRIPT_TEMPLATES,
  VOICE_ENGINE_OPTIONS,
  AUDIO_QA_DIMENSIONS,
  AUDIO_QA_RESULTS as MOCK_QA_RESULTS,
  PRODUCTION_PROCESS,
  VOICE_KNOWLEDGE_BASE,
  VOICE_FACTORY_KPIS,
  VOICE_FACTORY_STATS,
} from '@/mocks/kosProprietaryVoiceFactory';
import type {
  ProprietaryVoiceProfile,
  PronunciationDictionary,
  PronunciationEntry,
  ScriptTemplate,
  VoiceEngineOption,
  AudioQADimension,
  AudioQAResult,
  VoiceKnowledgeEntry,
} from '@/mocks/kosProprietaryVoiceFactory';

function searchProfiles(query: string, profiles: ProprietaryVoiceProfile[]): ProprietaryVoiceProfile[] {
  const q = query.toLowerCase();
  return profiles.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.bestFor.some(b => b.toLowerCase().includes(q)) ||
    p.accent.toLowerCase().includes(q)
  );
}

function searchScriptsFn(query: string): ScriptTemplate[] {
  const q = query.toLowerCase();
  return SCRIPT_TEMPLATES.filter(t =>
    t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
  );
}

export function useKOSProprietaryVoiceFactory() {
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [allProfiles, setAllProfiles] = useState<ProprietaryVoiceProfile[]>(MOCK_PROFILES);

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    let anyLive = false;
    try {
      const { data, error: err } = await supabase
        .from('studio_media_requests')
        .select('*')
        .eq('video_type', 'proprietary_voice')
        .order('created_at', { ascending: false });
      if (!err && data && data.length > 0) {
        const normalized = data.map((row: Record<string, unknown>) => ({
          id: String(row.id || ''),
          name: String(row.topic || ''),
          description: String(row.audience || ''),
          status: String(row.status || 'draft'),
          source: String((row.metadata as Record<string, unknown>)?.source || 'open_source'),
          accent: String((row.metadata as Record<string, unknown>)?.accent || 'fr-FR'),
          language: String(row.language || 'fr'),
          bestFor: (row.keywords as string[]) || [],
          qualityScore: Number(row.priority || 80),
          createdAt: String(row.created_at || new Date().toISOString()),
        } as ProprietaryVoiceProfile));
        if (normalized.length > 0) {
          setAllProfiles(normalized);
          anyLive = true;
        }
      }
    } catch { /* fallback to mock */ }
    setIsLive(anyLive);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProfiles(); }, [fetchProfiles]);

  // --- VOICE PROFILES ---
  const productionProfiles = useMemo(() => allProfiles.filter(p => p.status === 'production'), [allProfiles]);
  const openSourceProfiles = useMemo(() => allProfiles.filter(p => p.source === 'open_source'), [allProfiles]);
  const getProfileById = useCallback((id: string): ProprietaryVoiceProfile | undefined => allProfiles.find(p => p.id === id), [allProfiles]);
  const getProfilesBySource = useCallback((source: string): ProprietaryVoiceProfile[] => allProfiles.filter(p => p.source === source), [allProfiles]);

  // --- PRONUNCIATION DICTIONARIES ---
  const searchDictionary = useCallback((query: string): PronunciationEntry[] => {
    const q = query.toLowerCase();
    const allEntries: PronunciationEntry[] = [];
    PRONUNCIATION_DICTIONARIES.forEach(dict => {
      dict.sampleEntries.forEach(entry => {
        if (entry.term.toLowerCase().includes(q) || entry.phonetic.toLowerCase().includes(q) ||
            entry.category.toLowerCase().includes(q) || entry.context.toLowerCase().includes(q)) {
          allEntries.push(entry);
        }
      });
    });
    return allEntries;
  }, []);

  const getDictionaryById = useCallback((id: string): PronunciationDictionary | undefined => PRONUNCIATION_DICTIONARIES.find(d => d.id === id), []);
  const totalDictionaryStats = useMemo(() => {
    const totalEntries = PRONUNCIATION_DICTIONARIES.reduce((sum, d) => sum + d.entryCount, 0);
    const avgMaturity = Math.round(PRONUNCIATION_DICTIONARIES.reduce((sum, d) => sum + d.maturity, 0) / PRONUNCIATION_DICTIONARIES.length);
    return { totalEntries, avgMaturity, totalDictionaries: PRONUNCIATION_DICTIONARIES.length };
  }, []);

  // --- SCRIPT TEMPLATES ---
  const getScriptTemplates = useCallback(() => SCRIPT_TEMPLATES, []);
  const getTemplateById = useCallback((id: string): ScriptTemplate | undefined => SCRIPT_TEMPLATES.find(t => t.id === id), []);
  const getTemplatesByType = useCallback((type: string): ScriptTemplate[] => SCRIPT_TEMPLATES.filter(t => t.type === type), []);
  const normalizeScript = useCallback((rawText: string, templateId: string) => {
    const template = SCRIPT_TEMPLATES.find(t => t.id === templateId);
    if (!template || !rawText.trim()) return null;
    return {
      sections: template.sections.map(section => ({
        name: section.name, text: `[Extrait du script — ${section.name}]\n${section.description}`, durationPct: section.durationPct,
      })),
    };
  }, []);

  // --- VOICE ENGINE OPTIONS ---
  const getEngineOptions = useCallback(() => VOICE_ENGINE_OPTIONS, []);
  const getEngineById = useCallback((id: string): VoiceEngineOption | undefined => VOICE_ENGINE_OPTIONS.find(e => e.id === id), []);
  const activeEngines = useMemo(() => VOICE_ENGINE_OPTIONS.filter(e => e.status === 'active'), []);
  const engineCostComparison = useMemo(() => {
    const active = VOICE_ENGINE_OPTIONS.filter(e => e.status === 'active' || e.status === 'evaluating');
    const cheapest = active.reduce((min, e) => e.costPerMinuteFCFA < min.costPerMinuteFCFA ? e : min, active[0]);
    const bestQuality = active.reduce((max, e) => e.qualityScore > max.qualityScore ? e : max, active[0]);
    return { active, cheapest, bestQuality };
  }, []);

  // --- AUDIO QA ---
  const getQADimensions = useCallback(() => AUDIO_QA_DIMENSIONS, []);
  const getQAResults = useCallback(() => MOCK_QA_RESULTS, []);
  const getQAResultById = useCallback((id: string): AudioQAResult | undefined => MOCK_QA_RESULTS.find(r => r.id === id), []);
  const approvedQAResults = useMemo(() => MOCK_QA_RESULTS.filter(r => r.decision === 'approved'), []);
  const rejectedQAResults = useMemo(() => MOCK_QA_RESULTS.filter(r => r.decision !== 'approved'), []);
  const getQADimensionById = useCallback((dimId: string): AudioQADimension | undefined => AUDIO_QA_DIMENSIONS.find(d => d.id === dimId), []);

  // --- PRODUCTION PROCESS ---
  const getProductionProcess = useCallback(() => PRODUCTION_PROCESS, []);
  const estimateProductionTime = useCallback((textLength: number): number => {
    const baseTime = 13;
    const estimatedDuration = textLength / 5 / 155;
    return Math.round(baseTime + estimatedDuration * 0.15);
  }, []);

  // --- KNOWLEDGE BASE ---
  const getKnowledgeBase = useCallback(() => VOICE_KNOWLEDGE_BASE, []);
  const searchKnowledgeBase = useCallback((query: string): VoiceKnowledgeEntry[] => {
    const q = query.toLowerCase();
    return VOICE_KNOWLEDGE_BASE.filter(e =>
      e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) ||
      e.tags.some(t => t.toLowerCase().includes(q)) || e.domain.toLowerCase().includes(q)
    );
  }, []);
  const getKnowledgeByCategory = useCallback((category: string): VoiceKnowledgeEntry[] => VOICE_KNOWLEDGE_BASE.filter(e => e.category === category), []);
  const reusableKnowledge = useMemo(() => VOICE_KNOWLEDGE_BASE.filter(e => e.reusable), []);

  // --- KPIs ---
  const getKPIs = useCallback(() => VOICE_FACTORY_KPIS, []);
  const kpiTrends = useMemo(() => {
    const improving = VOICE_FACTORY_KPIS.filter(k =>
      k.trend === 'up' || (['production-time', 'cost-per-minute', 'error-rate'].includes(k.id) ? k.trend === 'down' : false)
    );
    return {
      improving: improving.length, total: VOICE_FACTORY_KPIS.length,
      averageImprovement: Math.round(VOICE_FACTORY_KPIS.reduce((s, k) => {
        const improvement = k.id === 'production-time' || k.id === 'cost-per-minute' || k.id === 'error-rate'
          ? Math.max(0, k.previous - k.current) : Math.max(0, k.current - k.previous);
        return s + improvement;
      }, 0)),
    };
  }, []);

  const getStats = useCallback(() => VOICE_FACTORY_STATS, []);

  // --- SEARCH ENGINE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    profiles: ProprietaryVoiceProfile[];
    dictionaryEntries: PronunciationEntry[];
    scripts: ScriptTemplate[];
    knowledge: VoiceKnowledgeEntry[];
  } | null>(null);

  const performGlobalSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (!query.trim()) { setSearchResults(null); return; }
    setSearchResults({
      profiles: searchProfiles(query, allProfiles),
      dictionaryEntries: searchDictionary(query),
      scripts: searchScriptsFn(query),
      knowledge: searchKnowledgeBase(query),
    });
  }, [searchDictionary, searchKnowledgeBase, allProfiles]);

  const clearSearch = useCallback(() => { setSearchQuery(''); setSearchResults(null); }, []);

  return {
    loading, isLive, refetch: fetchProfiles,
    allProfiles, productionProfiles, openSourceProfiles,
    getProfileById, getProfilesBySource,
    pronunciationDictionaries: PRONUNCIATION_DICTIONARIES,
    searchDictionary, getDictionaryById, totalDictionaryStats,
    scriptTemplates: SCRIPT_TEMPLATES,
    getScriptTemplates, getTemplateById, getTemplatesByType, normalizeScript,
    engineOptions: VOICE_ENGINE_OPTIONS,
    getEngineOptions, getEngineById, activeEngines, engineCostComparison,
    qaDimensions: AUDIO_QA_DIMENSIONS, qaResults: MOCK_QA_RESULTS, getQADimensions, getQAResults,
    getQAResultById, approvedQAResults, rejectedQAResults, getQADimensionById,
    productionProcess: PRODUCTION_PROCESS, getProductionProcess, estimateProductionTime,
    knowledgeBase: VOICE_KNOWLEDGE_BASE, getKnowledgeBase, searchKnowledgeBase,
    getKnowledgeByCategory, reusableKnowledge,
    kpis: VOICE_FACTORY_KPIS, getKPIs, kpiTrends,
    stats: VOICE_FACTORY_STATS, getStats,
    searchQuery, searchResults, performGlobalSearch, clearSearch,
  };
}