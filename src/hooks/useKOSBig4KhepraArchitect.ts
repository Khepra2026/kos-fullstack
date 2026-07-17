import { useState, useCallback, useMemo } from 'react';
import { kosBig4KhepraExecutiveSummary } from '@/mocks/kosBig4KhepraArchitect';

export function useKOSBig4KhepraArchitect() {
  const [data] = useState(kosBig4KhepraExecutiveSummary);
  const [activeAxe, setActiveAxe] = useState<string>('plateforme');
  const [expandedProduit, setExpandedProduit] = useState<string | null>(null);
  const [expandedNiveau, setExpandedNiveau] = useState<number | null>(null);
  const [showMermaid, setShowMermaid] = useState(false);

  const axeActif = useMemo(() => data.axes.find(a => a.id === activeAxe) || data.axes[0], [data.axes, activeAxe]);

  const progressGlobal = useMemo(() => {
    const total = data.axes.reduce((sum, a) => sum + a.progress, 0);
    return Math.round(total / data.axes.length);
  }, [data.axes]);

  const toggleProduit = useCallback((id: string) => {
    setExpandedProduit(prev => prev === id ? null : id);
  }, []);

  const toggleNiveau = useCallback((niveau: number) => {
    setExpandedNiveau(prev => prev === niveau ? null : niveau);
  }, []);

  const toggleMermaid = useCallback(() => {
    setShowMermaid(prev => !prev);
  }, []);

  const bigFourScore = useMemo(() => {
    const passed = data.checklistBigFour.filter(c => c.statut).length;
    return Math.round((passed / data.checklistBigFour.length) * 100);
  }, [data.checklistBigFour]);

  return {
    data,
    activeAxe,
    setActiveAxe,
    axeActif,
    progressGlobal,
    expandedProduit,
    toggleProduit,
    expandedNiveau,
    toggleNiveau,
    showMermaid,
    toggleMermaid,
    bigFourScore,
  };
}