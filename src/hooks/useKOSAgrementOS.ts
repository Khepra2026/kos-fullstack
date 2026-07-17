import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { kosAgrementOSData } from '@/mocks/kosAgrementOS';

export function useKOSAgrementOS() {
  const [data, setData] = useState(kosAgrementOSData);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cancelledRef = useRef(false);
  const [activeModule, setActiveModule] = useState<string>('file-builder');
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);
  const [showGantt, setShowGantt] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);
  const [showRex, setShowRex] = useState(false);
  const [alertesLues, setAlertesLues] = useState<Set<string>>(new Set());

  useEffect(() => {
    cancelledRef.current = false;

    async function loadFromSupabase() {
      try {
        const { data: liveData, error: supabaseError } = await supabase
          .from('kos_agrement_os')
          .select('*')
          .limit(1)
          .single();

        if (cancelledRef.current) return;

        if (!supabaseError && liveData) {
          setData(liveData as typeof kosAgrementOSData);
          setIsLive(true);
        }
      } catch {
        // Supabase unreachable — fallback to mock silently
      } finally {
        if (!cancelledRef.current) {
          setLoading(false);
        }
      }
    }

    loadFromSupabase();

    return () => {
      cancelledRef.current = true;
    };
  }, []);

  useEffect(() => {
    setAlertesLues(new Set(
      data.projetActif.alertesIA.filter(a => a.lu).map(a => a.id)
    ));
  }, [data]);

  const moduleActif = useMemo(
    () => data.modules.find(m => m.id === activeModule) || data.modules[0],
    [data.modules, activeModule]
  );

  const alertesNonLues = useMemo(
    () => data.projetActif.alertesIA.filter(a => !alertesLues.has(a.id)).length,
    [data.projetActif.alertesIA, alertesLues]
  );

  const marquerAlerteLue = useCallback((id: string) => {
    setAlertesLues(prev => new Set([...prev, id]));
  }, []);

  const togglePrompt = useCallback((id: string) => {
    setExpandedPrompt(prev => prev === id ? null : id);
  }, []);

  const toggleGantt = useCallback(() => setShowGantt(prev => !prev), []);
  const togglePrompts = useCallback(() => setShowPrompts(prev => !prev), []);
  const toggleRex = useCallback(() => setShowRex(prev => !prev), []);

  const bigFourScore = useMemo(() => {
    const passed = data.checklistBigFour.filter(c => c.statut).length;
    return Math.round((passed / data.checklistBigFour.length) * 100);
  }, [data.checklistBigFour]);

  const erreursBloquantes = useMemo(() => {
    const fb = data.modules.find(m => m.id === 'file-builder');
    if (!fb || !fb.erreursAuscgie) return 0;
    return fb.erreursAuscgie.filter(e => e.statut === 'ouvert' && e.criticite === 'Bloquant').length;
  }, [data.modules]);

  const retry = useCallback(() => {
    setLoading(true);
    setError(null);
    setData(kosAgrementOSData);
    setIsLive(false);
  }, []);

  return {
    data,
    activeModule,
    setActiveModule,
    moduleActif,
    expandedPrompt,
    togglePrompt,
    showGantt,
    toggleGantt,
    showPrompts,
    togglePrompts,
    showRex,
    toggleRex,
    alertesNonLues,
    alertesLues,
    marquerAlerteLue,
    bigFourScore,
    erreursBloquantes,
    isLive,
    loading,
    error,
    retry,
  };
}