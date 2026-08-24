import { useState, useEffect } from 'react';
import {
  agents2Profiles,
  anticipativeAutomations,
  upg3Executions,
  upg3KPIs,
  upg3Overview,
  type Agent2Profile,
  type AnticipativeAutomation,
  type UpgradeExecution,
  type Upg3KPI,
} from '@/mocks/upg3Agents2';

interface DomainSummary {
  domain: string;
  totalAgents: number;
  gen2Agents: number;
  avgAnticipation: number;
  avgExecution: number;
}

export function useKOS120Upg3Execution() {
  const [loading, setLoading] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedGeneration, setSelectedGeneration] = useState<'all' | '1.0' | '2.0'>('all');
  const [selectedAutomationCategory, setSelectedAutomationCategory] = useState<string>('all');

  // Filter agents
  const filteredAgents: Agent2Profile[] = agents2Profiles.filter(a => {
    const domainMatch = selectedDomain === 'all' || a.domain === selectedDomain;
    const genMatch = selectedGeneration === 'all' || a.generation === selectedGeneration;
    return domainMatch && genMatch;
  });

  // Domain summaries
  const domains = Array.from(new Set(agents2Profiles.map(a => a.domain)));
  const domainSummaries: DomainSummary[] = domains.map(d => {
    const domainAgents = agents2Profiles.filter(a => a.domain === d);
    const gen2 = domainAgents.filter(a => a.generation === '2.0');
    return {
      domain: d,
      totalAgents: domainAgents.length,
      gen2Agents: gen2.length,
      avgAnticipation: Math.round(domainAgents.reduce((s, a) => s + a.anticipationScore, 0) / domainAgents.length),
      avgExecution: Math.round(domainAgents.reduce((s, a) => s + a.executionScore, 0) / domainAgents.length),
    };
  });

  // Filter automations
  const filteredAutomations: AnticipativeAutomation[] = anticipativeAutomations.filter(a =>
    selectedAutomationCategory === 'all' || a.category === selectedAutomationCategory
  );

  return {
    overview: upg3Overview,
    agents: filteredAgents,
    allAgents: agents2Profiles,
    domainSummaries,
    domains,
    automations: filteredAutomations,
    allAutomations: anticipativeAutomations,
    executions: upg3Executions,
    kpis: upg3KPIs,
    selectedDomain,
    setSelectedDomain,
    selectedGeneration,
    setSelectedGeneration,
    selectedAutomationCategory,
    setSelectedAutomationCategory,
    loading,
  };
}



