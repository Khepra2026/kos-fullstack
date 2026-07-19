import { useState, useMemo, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  PRE_EXECUTION_RULES,
  DECISION_LOG,
  KNOWLEDGE_DOMAINS,
  QUALITY_DIMENSIONS,
  QUALITY_GATE_RESULTS,
  COST_ESTIMATIONS,
  CREDIT_USAGE_STATS,
  RETEX_LIBRARY,
  MATURITY_KPIS,
  CAPABILITIES_LIBRARY,
  IMPROVEMENT_ACTIONS,
  SELF_EVOLUTION_STATS,
} from '@/mocks/selfEvolution';
import type {
  PreExecutionRule,
  DecisionLog,
  KnowledgeDomain,
  QualityDimension,
  QualityGateResult,
  CostEstimation,
  CreditUsageStats,
  RETEXEntry,
  MaturityKPI,
  CapabilityLibraryItem,
  ImprovementAction,
} from '@/mocks/selfEvolution';

export function useKOSSelfEvolution() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      try {
        const { data } = await supabase.from('self_improvement_engine_v2').select('id').limit(1);
        if (!cancelled && data && data.length > 0) setIsLive(true);
      } catch { /* fallback mock */ }
    }
    check();
    return () => { cancelled = true; };
  }, []);

  const [activeMission, setActiveMission] = useState<string>('');
  const [decisionResult, setDecisionResult] = useState<{
    rule: PreExecutionRule;
    isSolvable: boolean;
    recommendedMethod: string;
    estimatedSavings: number;
    reasoning: string;
  } | null>(null);

  // --- DECISION ENGINE ---
  const checkMissionFeasibility = useCallback((mission: string) => {
    setActiveMission(mission);
    const missionLower = mission.toLowerCase();

    // Priority-ordered check
    for (const rule of PRE_EXECUTION_RULES) {
      // Rule 1: n8n native check
      if (rule.id === 'rule-1') {
        const n8nKeywords = ['workflow', 'api', 'json', 'cron', 'webhook', 'http', 'transform', 'merge', 'route', 'schedule', 'trigger', 'filter', 'sort', 'aggregate'];
        const isN8nCandidate = n8nKeywords.some(kw => missionLower.includes(kw));
        if (isN8nCandidate) {
          setDecisionResult({
            rule,
            isSolvable: true,
            recommendedMethod: 'n8n natif — zéro coût, zéro latence externe',
            estimatedSavings: 12000,
            reasoning: `La mission "${mission}" utilise des patterns standards que n8n peut gérer de façon 100% déterministe via ses nodes natifs. Aucun appel IA requis.`,
          });
          return;
        }
      }

      // Rule 2: Existing workflow check
      if (rule.id === 'rule-2') {
        const existingKeywords = ['rapport', 'conformité', 'audit', 'dashboard', 'reporting', 'notification', 'email', 'pipeline', 'publication'];
        const isExistingCandidate = existingKeywords.some(kw => missionLower.includes(kw));
        if (isExistingCandidate) {
          setDecisionResult({
            rule,
            isSolvable: true,
            recommendedMethod: 'Workflow existant — adaptation < 5 min',
            estimatedSavings: 45000,
            reasoning: `Un workflow similaire existe déjà dans la bibliothèque KOS. Adaptation rapide au lieu de recréer. Économie estimée : 45 000 FCFA.`,
          });
          return;
        }
      }

      // Rule 3: Sub-workflow check
      if (rule.id === 'rule-3') {
        const subKeywords = ['enrichir', 'valider', 'extraire', 'formater', 'notifier', 'scorer', 'taguer', 'cross-link', 'thumbnail'];
        const isSubCandidate = subKeywords.some(kw => missionLower.includes(kw));
        if (isSubCandidate) {
          setDecisionResult({
            rule,
            isSolvable: true,
            recommendedMethod: 'Sous-workflows chaînés — assemblage < 5 min',
            estimatedSavings: 28000,
            reasoning: `La mission peut être décomposée en sous-workflows réutilisables existants. Assemblage rapide, zéro duplication.`,
          });
          return;
        }
      }

      // Rule 4: LLM existing prompt
      if (rule.id === 'rule-4') {
        const llmKeywords = ['résumé', 'traduire', 'générer', 'rédiger', 'analyser', 'synthétiser', 'extraire keywords', 'tags'];
        const isLLMCandidate = llmKeywords.some(kw => missionLower.includes(kw));
        if (isLLMCandidate) {
          setDecisionResult({
            rule,
            isSolvable: true,
            recommendedMethod: 'Prompt validé + LLM économique (GPT-4o-mini / Claude Haiku)',
            estimatedSavings: 800,
            reasoning: `Un prompt validé existe dans le KOS Prompt Library. Utilisation du modèle le plus économique. Coût estimé < 50 FCFA.`,
          });
          return;
        }
      }
    }

    // Rule 5: Default — library internal
    const rule5 = PRE_EXECUTION_RULES[4];
    setDecisionResult({
      rule: rule5,
      isSolvable: true,
      recommendedMethod: 'Création nouveau composant réutilisable dans la bibliothèque interne',
      estimatedSavings: 65000,
      reasoning: `Aucune solution existante trouvée. Création d'un nouveau composant CONÇU comme réutilisable dès le départ. Documentation obligatoire.`,
    });
  }, []);

  // --- QUALITY ENGINE ---
  const runQualityGate = useCallback((contentId: string) => {
    return QUALITY_GATE_RESULTS.find(r => r.contentId === contentId) || null;
  }, []);

  const getQualityDimensions = useCallback(() => QUALITY_DIMENSIONS, []);

  const getBlockedContents = useMemo(() => {
    return QUALITY_GATE_RESULTS.filter(r => r.decision === 'blocked');
  }, []);

  // --- COST ESTIMATION ---
  const estimateOperationCost = useCallback((operation: string) => {
    return COST_ESTIMATIONS.find(e =>
      e.operation.toLowerCase().includes(operation.toLowerCase())
    ) || null;
  }, []);

  const getCreditStats = useCallback((): CreditUsageStats => CREDIT_USAGE_STATS, []);

  // --- KNOWLEDGE REPOSITORY ---
  const getKnowledgeDomains = useCallback(() => KNOWLEDGE_DOMAINS, []);

  const searchKnowledge = useCallback((query: string) => {
    const q = query.toLowerCase();
    return KNOWLEDGE_DOMAINS.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.subCategories.some(sc => sc.toLowerCase().includes(q)) ||
      d.keyTexts.some(kt => kt.title.toLowerCase().includes(q) || kt.reference.toLowerCase().includes(q))
    );
  }, []);

  // --- RETEX ---
  const getRetexEntries = useCallback(() => RETEX_LIBRARY, []);

  const getRetexByDomain = useCallback((domain: string) => {
    return RETEX_LIBRARY.filter(r => r.domain.toLowerCase() === domain.toLowerCase());
  }, []);

  // --- MATURITY KPIs ---
  const getMaturityKPIs = useCallback(() => MATURITY_KPIS, []);

  const getMaturityTrend = useMemo(() => {
    const improving = MATURITY_KPIS.filter(k => k.trend === 'up' || (k.id === 'errors' || k.id === 'latency') ? k.trend === 'down' : false);
    return {
      improving: improving.length,
      total: MATURITY_KPIS.length,
      score: SELF_EVOLUTION_STATS.maturityScore,
    };
  }, []);

  // --- CAPABILITIES ---
  const getCapabilities = useCallback(() => CAPABILITIES_LIBRARY, []);

  const getCapabilitiesByType = useCallback((type: string) => {
    return CAPABILITIES_LIBRARY.filter(c => c.type === type);
  }, []);

  // --- IMPROVEMENTS ---
  const getImprovements = useCallback(() => IMPROVEMENT_ACTIONS, []);

  const getImprovementsByStatus = useCallback((status: string) => {
    return IMPROVEMENT_ACTIONS.filter(i => i.status === status);
  }, []);

  // --- DECISION LOG ---
  const getDecisionLog = useCallback(() => DECISION_LOG, []);

  // --- STATS ---
  const getStats = useCallback(() => SELF_EVOLUTION_STATS, []);

  const getCostAvoidedToday = useMemo(() => {
    const today = DECISION_LOG.filter(d => d.timestamp.startsWith('2026-06-23'));
    return today.reduce((sum, d) => sum + d.costSaved, 0);
  }, []);

  return {
    isLive,
    // Decision
    activeMission,
    decisionResult,
    checkMissionFeasibility,
    decisionLog: DECISION_LOG,
    getDecisionLog,
    preExecutionRules: PRE_EXECUTION_RULES,

    // Quality
    qualityDimensions: QUALITY_DIMENSIONS,
    qualityGateResults: QUALITY_GATE_RESULTS,
    runQualityGate,
    getQualityDimensions,
    blockedContents: getBlockedContents,

    // Cost
    costEstimations: COST_ESTIMATIONS,
    creditStats: CREDIT_USAGE_STATS,
    estimateOperationCost,
    getCreditStats,
    costAvoidedToday: getCostAvoidedToday,

    // Knowledge
    knowledgeDomains: KNOWLEDGE_DOMAINS,
    getKnowledgeDomains,
    searchKnowledge,

    // RETEX
    retexEntries: RETEX_LIBRARY,
    getRetexEntries,
    getRetexByDomain,

    // Maturity
    maturityKPIs: MATURITY_KPIS,
    getMaturityKPIs,
    maturityTrend: getMaturityTrend,

    // Capabilities
    capabilities: CAPABILITIES_LIBRARY,
    getCapabilities,
    getCapabilitiesByType,

    // Improvements
    improvements: IMPROVEMENT_ACTIONS,
    getImprovements,
    getImprovementsByStatus,

    // Stats
    stats: SELF_EVOLUTION_STATS,
    getStats,
  };
}



