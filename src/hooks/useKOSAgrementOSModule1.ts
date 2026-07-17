import { useState, useMemo } from 'react';
import { kosAgrementOSModule1Data } from '@/mocks/kosAgrementOSModule1';

export function useKOSAgrementOSModule1() {
  const [data] = useState(kosAgrementOSModule1Data);
  const [activeSection, setActiveSection] = useState('questionnaire');
  const [expandedPrompt, setExpandedPrompt] = useState(false);
  const [filtreCriticite, setFiltreCriticite] = useState<string | null>(null);
  const [showAlertes, setShowAlertes] = useState(true);

  const sectionLabels: Record<string, string> = {
    questionnaire: 'Questionnaire',
    documents: 'Documents',
    gaps: 'Gap List',
    erreurs: 'Erreurs AUSCGIE',
    casRejetes: 'Base Entraînement',
    certification: 'ISO 27001',
  };

  const erreursBloquantes = useMemo(
    () => data.erreursAuscgie.filter((e) => e.statut === 'ouvert' && e.criticite === 'Bloquant').length,
    [data.erreursAuscgie],
  );

  const gapsFiltres = useMemo(
    () => (filtreCriticite ? data.gaps.filter((g) => g.criticite === filtreCriticite) : data.gaps),
    [filtreCriticite, data.gaps],
  );

  const scoreGlobal = useMemo(() => {
    const sections = data.questionnaire.sections;
    const avg = sections.reduce((acc, s) => acc + s.score, 0) / sections.length;
    return Math.round(avg);
  }, [data.questionnaire.sections]);

  const togglePrompt = () => setExpandedPrompt((p) => !p);
  const selectFilter = (c: string | null) => setFiltreCriticite((prev) => (prev === c ? null : c));
  const toggleAlertes = () => setShowAlertes((a) => !a);

  return {
    data,
    activeSection,
    setActiveSection,
    sectionLabels,
    expandedPrompt,
    togglePrompt,
    filtreCriticite,
    selectFilter,
    showAlertes,
    toggleAlertes,
    erreursBloquantes,
    gapsFiltres,
    scoreGlobal,
  };
}