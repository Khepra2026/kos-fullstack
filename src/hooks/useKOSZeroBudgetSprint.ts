import { useState, useMemo, useEffect } from 'react';
import { checkTableHealth } from '@/hooks/utils/hookMigration';
import {
  ZERO_BUDGET_ACTIONS,
  ZERO_BUDGET_SPRINT_META,
  computeZeroBudgetKPIs,
  ZeroBudgetAction,
  ZeroBudgetSprintKPIs,
} from '@/mocks/kosZeroBudgetSprint';

type BudgetFilter = 'all' | 'zero_cost' | 'internal_effort' | 'blocked_budget' | 'creative_workaround';
type StatusFilter = 'all' | 'executed' | 'in_progress' | 'pending' | 'blocked';
type CategoryFilter = 'all' | 'security' | 'performance' | 'compliance' | 'quality' | 'data' | 'growth' | 'code';

export function useKOSZeroBudgetSprint() {
  const meta = ZERO_BUDGET_SPRINT_META;
  const kpis: ZeroBudgetSprintKPIs = useMemo(() => computeZeroBudgetKPIs(), []);
  const actions: ZeroBudgetAction[] = ZERO_BUDGET_ACTIONS;
  const [isLive, setIsLive] = useState(false);

  const [budgetFilter, setBudgetFilter] = useState<BudgetFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  useEffect(() => {
    checkTableHealth('kos_execution_logs').then(setIsLive);
  }, []);

  const filteredActions = useMemo(() => {
    return actions.filter(a => {
      if (budgetFilter !== 'all' && a.budgetStatus !== budgetFilter) return false;
      if (statusFilter !== 'all' && a.executionStatus !== statusFilter) return false;
      if (categoryFilter !== 'all' && a.category !== categoryFilter) return false;
      return true;
    });
  }, [actions, budgetFilter, statusFilter, categoryFilter]);

  return {
    meta,
    kpis,
    actions,
    filteredActions,
    isLive,
    budgetFilter,
    setBudgetFilter,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    loading: false,
  };
}