import { useState, useEffect } from 'react';
import { checkTableHealth } from '@/hooks/utils/hookMigration';
import {
  apiIndependenceProviders,
  apiIndependenceKPIs,
  automatonCapabilities,
  fallbackStrategies,
  independenceRoadmap,
  independenceAlerts,
} from '@/mocks/apiIndependence';

export interface IndependenceProvider {
  id: string;
  name: string;
  category: string;
  currentDependency: number;
  targetDependency: number;
  independenceScore: number;
  strategy: string;
  fallbackChain: string[];
  endpoints: string[];
  monthlyCost: number;
  status: string;
  replacedBy: string;
  migrationDate: string;
  criticalPaths: string[];
  autonomousPaths: number;
  totalPaths: number;
}

export interface IndependenceKPIs {
  totalProviders: number;
  fullyIndependent: number;
  partiallyIndependent: number;
  structurallyDependent: number;
  globalIndependenceScore: number;
  targetIndependenceScore: number;
  endpointsExternal: number;
  endpointsInternal: number;
  fallbackStrategies: number;
  autonomousPaths: number;
  totalPaths: number;
  autonomyRate: number;
}

export function useKOSApiIndependence() {
  const [providers, setProviders] = useState<IndependenceProvider[]>([]);
  const [kpis, setKpis] = useState<IndependenceKPIs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    try {
      setProviders(apiIndependenceProviders);
      setKpis(apiIndependenceKPIs);
      setError(null);
    } catch (e) {
      setError('Erreur chargement données indépendance');
    } finally {
      setLoading(false);
    }
    checkTableHealth('kos_execution_logs').then(setIsLive);
  }, []);

  return {
    providers,
    kpis,
    isLive,
    automatonCapabilities,
    fallbackStrategies,
    independenceRoadmap,
    independenceAlerts,
    loading,
    error,
  };
}



