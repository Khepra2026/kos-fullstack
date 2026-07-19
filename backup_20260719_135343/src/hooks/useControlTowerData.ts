import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  enterpriseControlTower as mockTower,
  automationOptimizer as mockAutomation,
  resourceAllocator as mockResources,
  capacityPlanner as mockCapacity,
  forecastingEngine as mockForecasts,
  scenarioSimulator as mockScenarios,
} from '@/mocks/controlTowerAutomation';

interface UseControlTowerDataReturn {
  tower: typeof mockTower;
  automation: typeof mockAutomation;
  resources: typeof mockResources;
  capacity: typeof mockCapacity;
  forecasts: typeof mockForecasts;
  scenarios: typeof mockScenarios;
  loading: boolean;
  error: string | null;
  source: 'supabase' | 'mock';
}

export function useControlTowerData(): UseControlTowerDataReturn {
  const [tower, setTower] = useState(mockTower);
  const [automation, setAutomation] = useState(mockAutomation);
  const [resources, setResources] = useState(mockResources);
  const [capacity, setCapacity] = useState(mockCapacity);
  const [forecasts, setForecasts] = useState(mockForecasts);
  const [scenarios, setScenarios] = useState(mockScenarios);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'supabase' | 'mock'>('mock');

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      try {
        const [
          towerRes,
          autoRes,
          resRes,
          capRes,
          foreRes,
          scenRes,
        ] = await Promise.all([
          supabase.from('enterprise_control_tower').select('*').order('id'),
          supabase.from('automation_optimizer').select('*').order('id'),
          supabase.from('resource_allocator').select('*').order('id'),
          supabase.from('capacity_planner').select('*').order('id'),
          supabase.from('forecasting_engine').select('*').order('id'),
          supabase.from('scenario_simulator').select('*').order('id'),
        ]);

        if (cancelled) return;

        const towerData = towerRes.data;
        const autoData = autoRes.data;
        const resData = resRes.data;
        const capData = capRes.data;
        const foreData = foreRes.data;
        const scenData = scenRes.data;

        const hasData = towerData && towerData.length > 0;

        if (hasData) {
          setTower(towerData);
          setAutomation(autoData || mockAutomation);
          setResources(resData || mockResources);
          setCapacity(capData || mockCapacity);
          setForecasts(foreData || mockForecasts);
          setScenarios(scenData || mockScenarios);
          setSource('supabase');
        }
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchAll();
    return () => { cancelled = true; };
  }, []);

  return { tower, automation, resources, capacity, forecasts, scenarios, loading, error, source };
}



