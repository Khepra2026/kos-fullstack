import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import {
  AGENT_COMPETENCY_PROFILES,
  AGENT_LEARNING_CYCLES,
  AGENT_SELF_LEARNING_METRICS,
  AGENT_CONTINUOUS_DEVELOPMENT,
  AGENT_AUTO_DEVELOPMENT_STATS,
  AGENT_SYNERGY_LINKS,
  CROSS_AGENT_SYNERGY_STATS,
} from '@/mocks/agentAutoDevelopment';
import type {
  AgentCompetencyProfile,
  AgentLearningCycle,
  AgentSelfLearningMetrics,
  AgentContinuousDevelopment,
  AgentSynergyLink,
  CrossAgentSynergyStats,
  LivePDCACycle,
} from '@/mocks/agentAutoDevelopment';

interface SupabaseAgentPerformance {
  agent_id: string;
  agent_name: string;
  domain_name: string;
  health_score: number;
  big_four_score: number;
  status: string;
  total_issues: number;
  fixed_issues: number;
  auto_fixable: number;
}

interface SupabaseQualityAgent {
  id: string;
  number: string;
  name: string;
  mission: string;
  status: string;
  score: number;
}

export function useKOSAgentAutoDevelopment() {
  const [competencyProfiles, setCompetencyProfiles] = useState<AgentCompetencyProfile[]>(AGENT_COMPETENCY_PROFILES);
  const [learningCycles, setLearningCycles] = useState<AgentLearningCycle[]>(AGENT_LEARNING_CYCLES);
  const [selfLearningMetrics, setSelfLearningMetrics] = useState<AgentSelfLearningMetrics[]>(AGENT_SELF_LEARNING_METRICS);
  const [continuousDevelopment, setContinuousDevelopment] = useState<AgentContinuousDevelopment[]>(AGENT_CONTINUOUS_DEVELOPMENT);
  const [synergyLinks, setSynergyLinks] = useState<AgentSynergyLink[]>(AGENT_SYNERGY_LINKS);
  const [synergyStats] = useState<CrossAgentSynergyStats>(CROSS_AGENT_SYNERGY_STATS);
  const [stats] = useState(AGENT_AUTO_DEVELOPMENT_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [liveAgents, setLiveAgents] = useState<SupabaseAgentPerformance[]>([]);
  const [liveQualityAgents, setLiveQualityAgents] = useState<SupabaseQualityAgent[]>([]);
  const [livePDCACycles, setLivePDCACycles] = useState<LivePDCACycle[]>([]);

  const fetchLiveData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [perfRes, qualityRes, pdcaRes] = await Promise.all([
        supabase.from('kos_agent_performance').select('*').order('big_four_score', { ascending: false }),
        supabase.from('kos_quality_agents').select('*').order('score', { ascending: false }),
        supabase.from('self_improvement_engine_v2').select('*').order('last_cycle', { ascending: false }),
      ]);

      if (perfRes.error) throw perfRes.error;
      if (qualityRes.error) throw qualityRes.error;
      // PDCA is optional — don't throw if empty

      const perfData = (perfRes.data || []) as SupabaseAgentPerformance[];
      const qualityData = (qualityRes.data || []) as SupabaseQualityAgent[];
      const pdcaData = (pdcaRes.data || []) as LivePDCACycle[];

      if (perfData.length > 0 || qualityData.length > 0) {
        setIsLive(true);
        setLiveAgents(perfData);
        setLiveQualityAgents(qualityData);

        // Enrich competency profiles with real scores
        const enrichedProfiles = AGENT_COMPETENCY_PROFILES.map(profile => {
          const liveAgent = perfData.find(a =>
            a.domain_name?.toLowerCase().includes(profile.domain.toLowerCase().slice(0, 6))
          );
          if (liveAgent) {
            return {
              ...profile,
              currentLevel: Math.round(liveAgent.big_four_score),
            };
          }
          return profile;
        });
        setCompetencyProfiles(enrichedProfiles);

        // Enrich continuous development with real quality scores
        const enrichedContinuous = AGENT_CONTINUOUS_DEVELOPMENT.map(dev => {
          const matchingQuality = qualityData.find(q =>
            q.mission?.toLowerCase().includes(dev.dimension.toLowerCase().slice(0, 8))
          );
          if (matchingQuality) {
            return {
              ...dev,
              currentScore: Math.round(matchingQuality.score * 10),
            };
          }
          return dev;
        });
        setContinuousDevelopment(enrichedContinuous);

        // Store live PDCA cycles
        if (pdcaData.length > 0) {
          setLivePDCACycles(pdcaData);
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur de connexion Supabase';
      setError(message);
      setIsLive(false);
      setCompetencyProfiles(AGENT_COMPETENCY_PROFILES);
      setLearningCycles(AGENT_LEARNING_CYCLES);
      setSelfLearningMetrics(AGENT_SELF_LEARNING_METRICS);
      setContinuousDevelopment(AGENT_CONTINUOUS_DEVELOPMENT);
      setSynergyLinks(AGENT_SYNERGY_LINKS);
      setLivePDCACycles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveData();
  }, [fetchLiveData]);

  // Seeding actions
  const seedCompetency = useCallback((agentId: string, competencyName: string) => {
    setCompetencyProfiles(prev => prev.map(p => {
      if (p.agentId !== agentId) return p;
      return {
        ...p,
        competencies: p.competencies.map(c =>
          c.name === competencyName ? { ...c, mastered: true, score: Math.min(c.score + 5, 100) } : c
        ),
        seedingStatus: 'seeded' as const,
        lastSeeded: new Date().toISOString().split('T')[0],
      };
    }));
  }, []);

  const triggerLearningCycle = useCallback((agentId: string) => {
    const agent = selfLearningMetrics.find(m => m.agentId === agentId);
    if (!agent) return;

    const newCycle: AgentLearningCycle = {
      id: `LC-${Date.now()}`,
      agentId,
      agentName: agent.agentName,
      domain: agent.domain,
      cycleNumber: agent.totalCycles + 1,
      startedAt: new Date().toISOString(),
      completedAt: '',
      knowledgeAbsorbed: 0,
      patternsDiscovered: 0,
      skillsUpgraded: [],
      performanceGain: 0,
      status: 'in_progress',
    };

    setLearningCycles(prev => [newCycle, ...prev]);

    setTimeout(() => {
      setLearningCycles(prev => prev.map(c => {
        if (c.id !== newCycle.id) return c;
        return {
          ...c,
          completedAt: new Date(Date.now() + 4 * 3600000).toISOString(),
          knowledgeAbsorbed: Math.floor(Math.random() * 500) + 400,
          patternsDiscovered: Math.floor(Math.random() * 15) + 8,
          skillsUpgraded: [agent.domain === 'Conseil Stratégique' ? 'Nouveau Pattern Stratégique' : 'Nouveau Signal Faible'],
          performanceGain: Math.round((Math.random() * 6 + 4) * 10) / 10,
          status: 'completed' as const,
        };
      }));
      setSelfLearningMetrics(prev => prev.map(m => {
        if (m.agentId !== agentId) return m;
        return {
          ...m,
          totalCycles: m.totalCycles + 1,
          cumulativeGain: Math.round((m.cumulativeGain + (Math.random() * 6 + 4)) * 10) / 10,
          currentAutonomyLevel: Math.min(m.currentAutonomyLevel + 2, 100),
        };
      }));
    }, 3000);
  }, [selfLearningMetrics]);

  const completeImprovement = useCallback((devAgentId: string, improvementId: string) => {
    setContinuousDevelopment(prev => prev.map(d => {
      if (d.agentId !== devAgentId) return d;
      return {
        ...d,
        currentScore: Math.min(d.currentScore + 2, 100),
        improvements: d.improvements.map(imp =>
          imp.id === improvementId
            ? { ...imp, status: 'completed' as const, completionDate: new Date().toISOString().split('T')[0] }
            : imp
        ),
      };
    }));
  }, []);

  // Synergy actions
  const activateSynergy = useCallback((synergyId: string) => {
    setSynergyLinks(prev => prev.map(s => {
      if (s.id !== synergyId) return s;
      return { ...s, status: 'active' as const, lastExchange: new Date().toISOString() };
    }));
  }, []);

  // Filters
  const getProfilesByDomain = useCallback((domain: string) => {
    return competencyProfiles.filter(p => p.domain === domain);
  }, [competencyProfiles]);

  const getCyclesByAgent = useCallback((agentId: string) => {
    return learningCycles.filter(c => c.agentId === agentId);
  }, [learningCycles]);

  const getSynergiesByAgent = useCallback((agentId: string) => {
    return synergyLinks.filter(s => s.sourceAgentId === agentId || s.targetAgentId === agentId);
  }, [synergyLinks]);

  const getSynergiesByType = useCallback((type: string) => {
    return synergyLinks.filter(s => s.synergyType === type);
  }, [synergyLinks]);

  const activeLearningCycles = useMemo(() =>
    learningCycles.filter(c => c.status === 'in_progress')
  , [learningCycles]);

  const completedLearningCycles = useMemo(() =>
    learningCycles.filter(c => c.status === 'completed')
  , [learningCycles]);

  const activeSynergies = useMemo(() =>
    synergyLinks.filter(s => s.status === 'active')
  , [synergyLinks]);

  return {
    // Live status
    isLive,
    loading,
    error,
    liveAgents,
    liveQualityAgents,
    livePDCACycles,

    // Axe 1: Seeding
    competencyProfiles,
    seedCompetency,
    getProfilesByDomain,

    // Axe 2: Auto-Apprentissage
    learningCycles,
    selfLearningMetrics,
    triggerLearningCycle,
    getCyclesByAgent,
    activeLearningCycles,
    completedLearningCycles,

    // Axe 3: Développement Continu
    continuousDevelopment,
    completeImprovement,

    // Axe 4: Cross-Agent Synergy
    synergyLinks,
    synergyStats,
    activateSynergy,
    getSynergiesByAgent,
    getSynergiesByType,
    activeSynergies,

    // Stats
    stats,
    refetch: fetchLiveData,
  };
}



