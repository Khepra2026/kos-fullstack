import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  COMPLIANCE_SCENARIOS,
  GENERATED_WORKFLOWS,
  ORCHESTRATOR_AGENTS,
  ORCHESTRATOR_KPIS,
} from '@/mocks/workflowOrchestrator';
import type { ComplianceScenario, GeneratedWorkflow } from '@/mocks/workflowOrchestrator';

interface UseKOSWorkflowOrchestratorReturn {
  availableScenarios: ComplianceScenario[];
  generatedWorkflows: GeneratedWorkflow[];
  agents: typeof ORCHESTRATOR_AGENTS;
  kpis: typeof ORCHESTRATOR_KPIS;
  selectedWorkflow: GeneratedWorkflow | null;
  processing: boolean;
  error: string | null;
  selectScenario: (id: string) => void;
  processCustom: (requirement: string, contexte: string, autorite: string, secteur: string) => void;
  isLive: boolean;
  loading: boolean;
  refetch: () => void;
}

export function useKOSWorkflowOrchestrator(): UseKOSWorkflowOrchestratorReturn {
  const [selectedWorkflow, setSelectedWorkflow] = useState<GeneratedWorkflow | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: liveData, error: supabaseErr } = await supabase
        .from('workflow_execution')
        .select('*')
        .limit(1);
      if (!supabaseErr && liveData && liveData.length > 0) {
        setIsLive(true);
      }
    } catch {
      // fallback silencieux au mock
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const selectScenario = useCallback((id: string) => {
    setProcessing(true);
    setError(null);
    setTimeout(() => {
      const found = GENERATED_WORKFLOWS.find(w => w.scenario.id === id);
      if (found) {
        setSelectedWorkflow(found);
      } else {
        setError('Scénario de conformité non trouvé.');
      }
      setProcessing(false);
    }, 1000);
  }, []);

  const processCustom = useCallback((_requirement: string, _contexte: string, _autorite: string, _secteur: string) => {
    setProcessing(true);
    setError(null);
    setTimeout(() => {
      setError('UNKNOWN / NEED SOURCE — La génération de workflows personnalisés nécessite la connexion à l\'Edge Function KOS Workflow Orchestrator + n8n API. En mode MOCK, veuillez sélectionner un scénario prétraité.');
      setProcessing(false);
    }, 1800);
  }, []);

  return {
    availableScenarios: COMPLIANCE_SCENARIOS,
    generatedWorkflows: GENERATED_WORKFLOWS,
    agents: ORCHESTRATOR_AGENTS,
    kpis: ORCHESTRATOR_KPIS,
    selectedWorkflow,
    processing,
    error,
    selectScenario,
    processCustom,
    isLive,
    loading,
    refetch,
  };
}



