import { useState, useMemo, useCallback, useEffect } from 'react';
import { checkTableHealth } from '@/hooks/utils/hookMigration';
import { khepraArchitectData } from '@/mocks/khepraArchitect';

export function useKOSKhepraArchitect() {
  const [data] = useState(khepraArchitectData);
  const [modeActif, setModeActif] = useState('audit');
  const [showRegles, setShowRegles] = useState(false);
  const [expandedExemple, setExpandedExemple] = useState<string | null>(null);
  const [useCaseExpand, setUseCaseExpand] = useState<string | null>(null);
  const [showMasterPrompts, setShowMasterPrompts] = useState(false);
  const [activePromptId, setActivePromptId] = useState<string | null>('mp1');
  const [expandedPromptCode, setExpandedPromptCode] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    checkTableHealth('kos_agents').then(setIsLive);
  }, []);

  const modeActifData = useMemo(
    () => data.modes.find((m) => m.id === modeActif) || data.modes[0],
    [data.modes, modeActif],
  );

  const activePrompt = useMemo(
    () => data.masterPrompts.find((mp) => mp.id === activePromptId) || data.masterPrompts[0],
    [data.masterPrompts, activePromptId],
  );

  const toggleRegles = useCallback(() => setShowRegles((p) => !p), []);
  const toggleExemple = useCallback((id: string) => {
    setExpandedExemple((p) => (p === id ? null : id));
  }, []);
  const toggleUseCase = useCallback((titre: string) => {
    setUseCaseExpand((p) => (p === titre ? null : titre));
  }, []);
  const toggleMasterPrompts = useCallback(() => {
    setShowMasterPrompts((p) => !p);
    setShowRegles(false);
  }, []);
  const togglePromptCode = useCallback((id: string) => {
    setExpandedPromptCode((p) => (p === id ? null : id));
  }, []);
  const copyPromptCode = useCallback((id: string, code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  return {
    data,
    isLive,
    modeActif,
    setModeActif,
    modeActifData,
    showRegles,
    toggleRegles,
    expandedExemple,
    toggleExemple,
    useCaseExpand,
    toggleUseCase,
    showMasterPrompts,
    setShowMasterPrompts,
    toggleMasterPrompts,
    activePromptId,
    setActivePromptId,
    activePrompt,
    expandedPromptCode,
    togglePromptCode,
    copiedId,
    copyPromptCode,
  };
}



