import { useState, useMemo, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  VOICE_TALENTS as MOCK_TALENTS,
  TONAL_GUIDE,
  SOUND_LIBRARY,
  VOICE_PRONUNCIATION_RULES,
  AUDIO_IDENTITY_PRINCIPLES,
  VOICE_FACTORY_KPIS,
  VOICE_FACTORY_STATS,
} from '@/mocks/voiceFactory';
import type {
  VoiceTalent,
  TonalScene,
  SoundAsset,
  VoicePronunciationRule,
} from '@/mocks/voiceFactory';

interface UseKOSVoiceFactoryReturn {
  loading: boolean;
  isLive: boolean;
  refetch: () => void;
  talents: VoiceTalent[];
  narrateur: VoiceTalent | undefined;
  expert: VoiceTalent | undefined;
  presentateur: VoiceTalent | undefined;
  intervieweur: VoiceTalent | undefined;
  getTalentById: (id: string) => VoiceTalent | undefined;
  getTalentsByRole: (role: string) => VoiceTalent[];
  tonalScenes: TonalScene[];
  tonalGuide: TonalScene[];
  getTonalSceneById: (id: string) => TonalScene | undefined;
  searchTonalGuide: (query: string) => TonalScene[];
  tonalSceneStats: Record<string, unknown>;
  soundLibrary: SoundAsset[];
  introAssets: SoundAsset[];
  transitionAssets: SoundAsset[];
  backgroundAssets: SoundAsset[];
  outroAssets: SoundAsset[];
  getSoundById: (id: string) => SoundAsset | undefined;
  getSoundsByCategory: (category: string) => SoundAsset[];
  getSoundsByMood: (mood: string) => SoundAsset[];
  getBestSoundsForTalent: (talentId: string) => SoundAsset[];
  soundLibraryStats: Record<string, unknown>;
  pronunciationRules: VoicePronunciationRule[];
  criticalRules: VoicePronunciationRule[];
  getRulesByCategory: (category: string) => VoicePronunciationRule[];
  searchPronunciationRules: (query: string) => VoicePronunciationRule[];
  pronunciationStats: Record<string, unknown>;
  identityPrinciples: typeof AUDIO_IDENTITY_PRINCIPLES;
  getIdentityPrincipleById: (id: string) => typeof AUDIO_IDENTITY_PRINCIPLES[0] | undefined;
  kpis: typeof VOICE_FACTORY_KPIS;
  kpiTrends: Record<string, number>;
  stats: typeof VOICE_FACTORY_STATS;
  getStats: () => typeof VOICE_FACTORY_STATS;
}

export function useKOSVoiceFactory(): UseKOSVoiceFactoryReturn {
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [talents, setTalents] = useState<VoiceTalent[]>(MOCK_TALENTS);

  const fetchTalents = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error: err } = await supabase
        .from('studio_media_requests')
        .select('*')
        .eq('video_type', 'voice')
        .order('created_at', { ascending: false });

      if (err) throw err;
      if (data && data.length > 0) {
        const normalized = data.map((row: Record<string, unknown>) => ({
          id: String(row.id || ''),
          name: String(row.topic || ''),
          role: String((row.metadata as Record<string, unknown>)?.role || 'narrateur'),
          description: String(row.audience || ''),
          status: String(row.status || 'active'),
          language: String(row.language || 'fr'),
          tone: String(row.tone || 'professionnel'),
          bestFor: (row.keywords as string[]) || [],
        } as VoiceTalent));
        if (normalized.length > 0) {
          setTalents(normalized);
          setIsLive(true);
        } else {
          setTalents(MOCK_TALENTS);
          setIsLive(false);
        }
      } else {
        setTalents(MOCK_TALENTS);
        setIsLive(false);
      }
    } catch {
      setTalents(MOCK_TALENTS);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTalents();
  }, [fetchTalents]);

  const narrateur = useMemo(() => talents.find(t => t.role === 'narrateur'), [talents]);
  const expert = useMemo(() => talents.find(t => t.role === 'expert'), [talents]);
  const presentateur = useMemo(() => talents.find(t => t.role === 'presentateur'), [talents]);
  const intervieweur = useMemo(() => talents.find(t => t.role === 'intervieweur'), [talents]);

  const getTalentById = useCallback((id: string): VoiceTalent | undefined => talents.find(t => t.id === id), [talents]);
  const getTalentsByRole = useCallback((role: string): VoiceTalent[] => talents.filter(t => t.role === role), [talents]);

  const tonalScenes = useMemo(() => TONAL_GUIDE, []);
  const getTonalSceneById = useCallback((id: string): TonalScene | undefined => TONAL_GUIDE.find(t => t.id === id), []);
  const searchTonalGuide = useCallback((query: string): TonalScene[] => {
    const q = query.toLowerCase();
    return TONAL_GUIDE.filter(s =>
      s.sceneName.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.bestTalent.toLowerCase().includes(q)
    );
  }, []);
  const tonalSceneStats = useMemo(() => ({
    totalScenes: TONAL_GUIDE.length,
    talents: [...new Set(TONAL_GUIDE.map(s => s.bestTalent))],
    avgPace: '140-160 mots/min',
  }), []);

  const soundLibrary = useMemo(() => SOUND_LIBRARY, []);
  const introAssets = useMemo(() => SOUND_LIBRARY.filter(s => s.category === 'intro'), []);
  const transitionAssets = useMemo(() => SOUND_LIBRARY.filter(s => s.category === 'transition'), []);
  const backgroundAssets = useMemo(() => SOUND_LIBRARY.filter(s => s.category === 'background'), []);
  const outroAssets = useMemo(() => SOUND_LIBRARY.filter(s => s.category === 'outro'), []);

  const getSoundById = useCallback((id: string): SoundAsset | undefined => SOUND_LIBRARY.find(s => s.id === id), []);
  const getSoundsByCategory = useCallback((category: string): SoundAsset[] => SOUND_LIBRARY.filter(s => s.category === category), []);
  const getSoundsByMood = useCallback((mood: string): SoundAsset[] => {
    const q = mood.toLowerCase();
    return SOUND_LIBRARY.filter(s => s.mood.toLowerCase().includes(q));
  }, []);
  const getBestSoundsForTalent = useCallback((talentId: string): SoundAsset[] => {
    const talent = talents.find(t => t.id === talentId);
    if (!talent) return [];
    return SOUND_LIBRARY.filter(s => s.bestWith.some(b => talent.name.includes(b) || b.includes(talent.name)));
  }, [talents]);
  const soundLibraryStats = useMemo(() => ({
    totalAssets: SOUND_LIBRARY.length,
    totalUsage: SOUND_LIBRARY.reduce((s, a) => s + a.usageCount, 0),
    categories: [...new Set(SOUND_LIBRARY.map(s => s.category))],
    mostUsed: [...SOUND_LIBRARY].sort((a, b) => b.usageCount - a.usageCount)[0],
  }), []);

  const pronunciationRules = useMemo(() => VOICE_PRONUNCIATION_RULES, []);
  const criticalRules = useMemo(() => VOICE_PRONUNCIATION_RULES.filter(r => r.priority === 'critical'), []);
  const getRulesByCategory = useCallback((category: string): VoicePronunciationRule[] =>
    VOICE_PRONUNCIATION_RULES.filter(r => r.category.toLowerCase().includes(category.toLowerCase())), []);
  const searchPronunciationRules = useCallback((query: string): VoicePronunciationRule[] => {
    const q = query.toLowerCase();
    return VOICE_PRONUNCIATION_RULES.filter(r =>
      r.rule.toLowerCase().includes(q) || r.category.toLowerCase().includes(q) || r.examples.some(e => e.term.toLowerCase().includes(q))
    );
  }, []);
  const pronunciationStats = useMemo(() => ({
    totalRules: VOICE_PRONUNCIATION_RULES.length,
    criticalCount: VOICE_PRONUNCIATION_RULES.filter(r => r.priority === 'critical').length,
    totalExamples: VOICE_PRONUNCIATION_RULES.reduce((s, r) => s + r.examples.length, 0),
    categories: [...new Set(VOICE_PRONUNCIATION_RULES.map(r => r.category))],
  }), []);

  const identityPrinciples = useMemo(() => AUDIO_IDENTITY_PRINCIPLES, []);
  const getIdentityPrincipleById = useCallback((id: string) => AUDIO_IDENTITY_PRINCIPLES.find(p => p.id === id), []);

  const kpis = useMemo(() => VOICE_FACTORY_KPIS, []);
  const kpiTrends = useMemo(() => {
    const improving = VOICE_FACTORY_KPIS.filter(k => k.trend === 'up' || (k.trend === 'down' && k.current < k.previous));
    return {
      improving: improving.length,
      total: VOICE_FACTORY_KPIS.length,
      avgImprovement: Math.round(VOICE_FACTORY_KPIS.reduce((s, k) => {
        return s + (k.trend === 'up' ? k.current - k.previous : k.previous - k.current);
      }, 0)),
    };
  }, []);

  const getStats = useCallback(() => VOICE_FACTORY_STATS, []);

  return {
    loading,
    isLive,
    refetch: fetchTalents,
    talents,
    narrateur,
    expert,
    presentateur,
    intervieweur,
    getTalentById,
    getTalentsByRole,
    tonalScenes,
    tonalGuide: TONAL_GUIDE,
    getTonalSceneById,
    searchTonalGuide,
    tonalSceneStats,
    soundLibrary,
    introAssets,
    transitionAssets,
    backgroundAssets,
    outroAssets,
    getSoundById,
    getSoundsByCategory,
    getSoundsByMood,
    getBestSoundsForTalent,
    soundLibraryStats,
    pronunciationRules,
    criticalRules,
    getRulesByCategory,
    searchPronunciationRules,
    pronunciationStats,
    identityPrinciples,
    getIdentityPrincipleById,
    kpis,
    kpiTrends,
    stats: VOICE_FACTORY_STATS,
    getStats,
  };
}



