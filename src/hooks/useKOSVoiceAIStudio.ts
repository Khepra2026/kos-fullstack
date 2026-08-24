import { useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { VOICE_PROFILES, KHEPRA_VOICE_PROFILES, type VoiceProfile } from '@/mocks/voiceAIStudio';

// ─── Mapping KHEPRA Voice → ElevenLabs Voice ID ───
const KHEPRA_TO_ELEVENLABS: Record<string, string> = {
  'vp-celestin-koffi': 'pNInz6obpgDQGcFmaJgB',   // Adam — masculine, deep, authoritative
  'vp-fatoumata-diallo': 'jsCqWAovK2LkecY7zXl4', // Nicole — feminine, clear, professional
  'vp-aminata-sow': 'MF3mGyEYCl7XYWbV9V6O',      // Narrative French — warm, engaging
};

export interface VoiceGenerationResult {
  success: boolean;
  audioBase64?: string;
  audioDataUri?: string;
  estimatedDuration?: { estimatedSeconds: number; estimatedMinutes: number };
  charactersUsed?: number;
  voiceId?: string;
  voiceName?: string;
  error?: string;
  durationMs?: number;
  generationDate?: string;
}

export interface VoiceGenerationHistory {
  id: string;
  voiceId: string;
  voiceName: string;
  scriptPreview: string;
  scriptLength: number;
  result: VoiceGenerationResult;
  timestamp: string;
  status: 'pending' | 'generating' | 'completed' | 'failed';
}

export interface voiceAIStudioData {
  // Profiles
  allProfiles: VoiceProfile[];
  khepraProfiles: VoiceProfile[];
  selectedProfile: VoiceProfile | null;
  selectProfile: (id: string) => void;

  // Generation
  generateVoice: (scriptText: string, voiceProfileId: string) => Promise<VoiceGenerationResult>;
  isGenerating: boolean;
  generationProgress: { step: string; percent: number };
  lastResult: VoiceGenerationResult | null;
  history: VoiceGenerationHistory[];
  clearHistory: () => void;

  // ElevenLabs diagnostic
  diagnostic: { apiKeyConfigured: boolean; apiStatus: string; voicesAvailable: number } | null;
  runDiagnostic: () => Promise<void>;
  isDiagnosing: boolean;

  // Audio playback
  audioDataUri: string | null;
  clearAudio: () => void;
}

export function useKOSVoiceAIStudio(): voiceAIStudioData {
  const [selectedProfileId, setSelectedProfileId] = useState<string>(KHEPRA_VOICE_PROFILES[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({ step: '', percent: 0 });
  const [lastResult, setLastResult] = useState<VoiceGenerationResult | null>(null);
  const [history, setHistory] = useState<VoiceGenerationHistory[]>([]);
  const [diagnostic, setDiagnostic] = useState<{ apiKeyConfigured: boolean; apiStatus: string; voicesAvailable: number } | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);

  const allProfiles = useMemo(() => VOICE_PROFILES, []);
  const khepraProfiles = useMemo(() => KHEPRA_VOICE_PROFILES, []);
  const selectedProfile = useMemo(
    () => allProfiles.find((p) => p.id === selectedProfileId) || KHEPRA_VOICE_PROFILES[0],
    [allProfiles, selectedProfileId],
  );

  const selectProfile = useCallback((id: string) => {
    setSelectedProfileId(id);
  }, []);

  const runDiagnostic = useCallback(async () => {
    setIsDiagnosing(true);
    try {
      const { data, error } = await supabase.functions.invoke('kos-youtube-voice', {
        body: { action: 'diagnostic' },
      });
      if (error || !data?.success) {
        setDiagnostic({ apiKeyConfigured: false, apiStatus: 'error', voicesAvailable: 0 });
      } else {
        setDiagnostic({
          apiKeyConfigured: data.diagnostic?.api_key_configured || false,
          apiStatus: data.diagnostic?.api_status || 'unknown',
          voicesAvailable: data.diagnostic?.voices_available || 0,
        });
      }
    } catch {
      setDiagnostic({ apiKeyConfigured: false, apiStatus: 'network_error', voicesAvailable: 0 });
    } finally {
      setIsDiagnosing(false);
    }
  }, []);

  const generateVoice = useCallback(async (scriptText: string, voiceProfileId: string): Promise<VoiceGenerationResult> => {
    const profile = allProfiles.find((p) => p.id === voiceProfileId);
    const elevenLabsId = KHEPRA_TO_ELEVENLABS[voiceProfileId] || KHEPRA_TO_ELEVENLABS['vp-celestin-koffi'];
    const voiceName = profile?.name || 'KHEPRA Voice';

    const historyId = `gen-${Date.now()}`;
    const historyEntry: VoiceGenerationHistory = {
      id: historyId,
      voiceId: voiceProfileId,
      voiceName,
      scriptPreview: scriptText.substring(0, 120) + (scriptText.length > 120 ? '...' : ''),
      scriptLength: scriptText.length,
      result: { success: false },
      timestamp: new Date().toISOString(),
      status: 'pending',
    };
    setHistory((prev) => [historyEntry, ...prev]);
    setIsGenerating(true);
    setGenerationProgress({ step: 'Préparation de la requête ElevenLabs...', percent: 5 });

    try {
      setGenerationProgress({ step: 'Appel du moteur TTS ElevenLabs...', percent: 25 });
      const { data, error } = await supabase.functions.invoke('kos-youtube-voice', {
        body: {
          action: 'generate',
          script_text: scriptText,
          voice_id: elevenLabsId,
          stability: 0.5,
          clarity: 0.75,
          speaker_boost: true,
          output_format: 'mp3_44100_128',
        },
      });

      setGenerationProgress({ step: 'Traitement de la réponse...', percent: 75 });

      if (error || !data?.success) {
        const errMsg = data?.error || error?.message || 'Erreur de génération ElevenLabs';
        const result: VoiceGenerationResult = {
          success: false,
          error: errMsg,
          voiceId: elevenLabsId,
          voiceName,
        };
        setLastResult(result);
        setHistory((prev) => prev.map((h) => (h.id === historyId ? { ...h, result, status: 'failed' } : h)));
        setIsGenerating(false);
        setGenerationProgress({ step: '', percent: 0 });
        return result;
      }

      const result: VoiceGenerationResult = {
        success: true,
        audioBase64: data.audio_base64,
        audioDataUri: data.audio_data_uri,
        estimatedDuration: data.estimated_duration,
        charactersUsed: data.characters_used,
        voiceId: elevenLabsId,
        voiceName,
        durationMs: data.generation_duration_ms,
        generationDate: data.generated_at,
      };
      setLastResult(result);
      setAudioDataUri(data.audio_data_uri || null);
      setHistory((prev) => prev.map((h) => (h.id === historyId ? { ...h, result, status: 'completed' } : h)));
      setGenerationProgress({ step: 'Voice-over généré avec succès !', percent: 100 });
      setIsGenerating(false);
      return result;
    } catch (err) {
      const result: VoiceGenerationResult = {
        success: false,
        error: (err as Error).message || 'Erreur réseau',
        voiceId: elevenLabsId,
        voiceName,
      };
      setLastResult(result);
      setHistory((prev) => prev.map((h) => (h.id === historyId ? { ...h, result, status: 'failed' } : h)));
      setIsGenerating(false);
      setGenerationProgress({ step: '', percent: 0 });
      return result;
    }
  }, [allProfiles]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const clearAudio = useCallback(() => {
    setAudioDataUri(null);
  }, []);

  return {
    allProfiles,
    khepraProfiles,
    selectedProfile,
    selectProfile,
    generateVoice,
    isGenerating,
    generationProgress,
    lastResult,
    history,
    clearHistory,
    diagnostic,
    runDiagnostic,
    isDiagnosing,
    audioDataUri,
    clearAudio,
  };
}



