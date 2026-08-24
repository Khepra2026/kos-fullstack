import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import hubSwitcher from '@/components/feature/hubSwitcher';
import { useKOSCorrectiveSystem } from '@/hooks/useKOSCorrectiveSystem';
import type { gapRegister, cASAction, migrationLog } from '@/mocks/casData';

type Tab = 'overview' | 'gaps' | 'actions' | 'migrations' | 'compliance' | 'edge-functions';

const CRITICALITY_COLORS: Record<string, string> = {
  P0: 'bg-primary-100 text-primary-900 border-primary-200',
  P1: 'bg-accent-100 text-accent-900 border-accent-200',
  P2: 'bg-secondary-100 text-secondary-900 border-secondary-200',
  P3: 'bg-background-200 text-foreground-600 border-background-300',
};

const CATEGORY_LABELS: Record<string, string> = {
  DATA_GAP: 'Données',
  LOGIC_GAP: 'Logique',
  INFRA_GAP: 'Infrastructure',
  COMPLIANCE_GAP: 'Conformité',
  ARCHITECTURE_GAP: 'Architecture',
};

const STRATEGY_LABELS: Record<string, string> = {
  FUSION: 'Fusion',
  MIGRATION: 'Migration',
  SUPPRESSION: 'Suppression',
  REFONTE: 'Refonte',
  SEEDING: 'Seeding',
};

const STATUS_LABELS: Record<string, string> = {
  detected: 'Détecté',
  diagnosed: 'Diagnostiqué',
  planned: 'Planifié',
  in_progress: 'En cours',
  resolved: 'Résolu',
  closed: 'Fermé',
};

function GapCard({ gap }: { gap: gapRegister }) {
  const criticalityClass = CRITICALITY_COLORS[gap.criticality] || '';
  const strategy = gap.strategy ? STRATEGY_LABELS[gap.strategy] : '—';
  const isResolved = gap.status === 'resolved';
  const isInProgress = gap.status === 'in_progress';
  return (
    <div className={`bg-background-50 border rounded-lg p-4 flex flex-col gap-2 transition-colors cursor-default ${isResolved ? 'border-accent-200/70 bg-accent-50/30' : isInProgress ? 'border-primary-200/70 bg-primary-50/20' : 'border-background-200/70 hover:border-background-300/80'}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2 py-0.5 rounded border ${criticalityClass} whitespace-nowrap`}>
            {gap.criticality}
          </span>
          <span className="text-xs font-medium text-foreground-500">{CATEGORY_LABELS[gap.category] || gap.category}</span>
          {isResolved && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-accent-100 text-accent-900 font-medium">✓ Résolu</span>
          )}
          {isInProgress && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-primary-100 text-primary-900 font-medium">⟳ En cours</span>
          )}
        </div>
        <span className="text-xs text-foreground-400 whitespace-nowrap">{gap.gap_id}</span>
      </div>
      <p className="text-sm font-medium text-foreground-950 leading-snug">{gap.description}</p>
      <div className="flex flex-wrap items-center gap-2 text-xs text-foreground-500 mt-1">
        <span className="bg-background-100 px-2 py-0.5 rounded">{gap.component_type}: {gap.component_name}</span>
        {gap.strategy && (
          <span className="bg-background-100 px-2 py-0.5 rounded font-medium">Strat: {strategy}</span>
        )}
        <span className={`px-2 py-0.5 rounded ${isResolved ? 'bg-accent-100 text-accent-900' : isInProgress ? 'bg-primary-100 text-primary-900' : 'bg-background-100 text-foreground-600'}`}>{STATUS_LABELS[gap.status] || gap.status}</span>
      </div>
      {gap.resolution_steps && isResolved && (
        <p className="text-xs text-accent-700 leading-relaxed mt-1 bg-accent-50 p-2 rounded">{gap.resolution_steps}</p>
      )}
      {gap.resolution_steps && isInProgress && (
        <p className="text-xs text-primary-700 leading-relaxed mt-1 bg-primary-50 p-2 rounded">{gap.resolution_steps}</p>
      )}
    </div>
  );
}

function ActionRow({ action }: { action: cASAction }) {
  const criticalityClass = CRITICALITY_COLORS[action.criticality] || '';
  const horizonColor = action.horizon === 'J+7' ? 'text-primary-500' : action.horizon === 'J+30' ? 'text-accent-500' : 'text-secondary-500';
  return (
    <div className="bg-background-50 border border-background-200/70 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={`text-xs font-bold px-2 py-0.5 rounded border ${criticalityClass}`}>{action.criticality}</span>
        <span className={`text-xs font-bold ${horizonColor}`}>{action.horizon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground-950">{action.description}</p>
        <p className="text-xs text-foreground-500 mt-0.5">{action.system_impacted}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs bg-background-100 px-2 py-0.5 rounded text-foreground-600">{action.action_type}</span>
        <span className={`text-xs px-2 py-0.5 rounded ${action.status === 'completed' ? 'bg-accent-100 text-accent-900' : action.status === 'in_progress' ? 'bg-primary-100 text-primary-900' : 'bg-background-200 text-foreground-600'}`}>
          {action.status === 'planned' ? 'Planifié' : action.status === 'in_progress' ? 'En cours' : action.status === 'completed' ? 'Terminé' : action.status}
        </span>
      </div>
    </div>
  );
}

function MigrationRow({ m }: { m: migrationLog }) {
  const isVerified = m.migration_status === 'verified';
  const isMigrated = m.migration_status === 'migrated';
  const statusColor = isVerified ? 'bg-accent-100 text-accent-900' : isMigrated ? 'bg-primary-100 text-primary-900' : m.migration_status === 'pending' ? 'bg-secondary-100 text-secondary-900' : 'bg-background-200 text-foreground-600';
  const dotColor = isVerified ? 'bg-accent-500' : isMigrated ? 'bg-primary-500' : m.migration_status === 'pending' ? 'bg-secondary-400' : 'bg-foreground-300';
  const statusLabel = isVerified ? 'Vérifié' : isMigrated ? 'Migré' : m.migration_status === 'pending' ? 'En attente' : m.migration_status;
  return (
    <div className={`bg-background-50 border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center gap-2 ${isVerified ? 'border-accent-200/70' : 'border-background-200/70'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${dotColor}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground-950 truncate">{m.hook_name}</p>
          <p className="text-xs text-foreground-500">{m.source_type} → {m.table_target}</p>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded whitespace-nowrap ${statusColor}`}>
          {statusLabel}
        </span>
        {m.fallback_configured && <i className="ri-shield-check-line text-accent-500 text-xs" title="Fallback configuré"></i>}
      </div>
      {m.after_state && isVerified && (
        <p className="text-xs text-accent-700 ml-6">{m.after_state}</p>
      )}
    </div>
  );
}

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
  { key: 'gaps', label: 'Écarts', icon: 'ri-error-warning-line' },
  { key: 'actions', label: 'Plan d\'Action', icon: 'ri-tools-line' },
  { key: 'migrations', label: 'Migrations', icon: 'ri-arrow-left-right-line' },
  { key: 'compliance', label: 'Conformité', icon: 'ri-shield-check-line' },
  { key: 'edge-functions', label: 'Edge Functions', icon: 'ri-cloud-line' },
];

export default function correctiveSystemDashboardPage() {
  const [tab, setTab] = useState<Tab>('overview');
  const { gaps, migrations, actions, compliance, health, isLive, loading, liveTables } = useKOSCorrectiveSystem();

  const p0Gaps = gaps.filter(g => g.criticality === 'P0');
  const p1Gaps = gaps.filter(g => g.criticality === 'P1');
  const j7Actions = actions.filter(a => a.horizon === 'J+7');
  const j30Actions = actions.filter(a => a.horizon === 'J+30');
  const j90Actions = actions.filter(a => a.horizon === 'J+90');

  return (
    <hubLayout hubId={155} title="KOS Corrective Action System">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
        <hubSwitcher currentHubId={155} activeTab={TABS.find(t => t.key === tab)?.label || ''} />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-foreground-950">KOS Corrective Action System</h1>
            <p className="text-sm text-foreground-500">Détection, classification et correction automatique des écarts — Production Realignment Engine</p>
          </div>
          <div className="flex items-center gap-2">
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-100 text-accent-900 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
                LIVE — {liveTables.length} tables
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground-100 text-foreground-600 text-xs">
                <span className="w-2 h-2 rounded-full bg-foreground-400" />
                Mode mock
              </span>
            )}
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-foreground-500">
              <div className="w-5 h-5 border-2 border-foreground-300 border-t-foreground-600 rounded-full animate-spin" />
              <span className="text-sm">Chargement du système KOS-CAS depuis Supabase...</span>
            </div>
          </div>
        )}

        {!loading && tab === 'overview' && (
          <div className="space-y-6">
            {/* ─── KPIs principaux avec progression ─── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center col-span-2 sm:col-span-1">
                <p className="text-2xl font-bold text-primary-500">{health.p0_blockers}</p>
                <p className="text-xs text-foreground-500">P0 Bloquants</p>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center col-span-2 sm:col-span-1">
                <p className="text-2xl font-bold text-accent-500">{health.p1_degraded}</p>
                <p className="text-xs text-foreground-500">P1 Dégradés</p>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center col-span-2 sm:col-span-1">
                <p className="text-2xl font-bold text-secondary-500">{health.p2_needs_optim}</p>
                <p className="text-xs text-foreground-500">P2 Optimisation</p>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center col-span-2 sm:col-span-1 bg-accent-50/50">
                <p className="text-2xl font-bold text-accent-600">{health.gaps_resolved}/{health.total_gaps}</p>
                <p className="text-xs text-foreground-500">Résolus</p>
              </div>
            </div>

            {/* ─── Barre de progression globale ─── */}
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-foreground-950">Progression KOS-CAS</h3>
                <span className="text-xs font-medium text-accent-600">{Math.round((health.gaps_resolved / Math.max(1, health.total_gaps)) * 100)}% complété</span>
              </div>
              <div className="h-3 rounded-full bg-background-200 overflow-hidden">
                <div className="h-3 rounded-full bg-accent-500 transition-all duration-700" style={{ width: `${Math.round((health.gaps_resolved / Math.max(1, health.total_gaps)) * 100)}%` }} />
              </div>
              <div className="flex justify-between mt-2 text-xs text-foreground-500">
                <span>{health.gaps_resolved} gaps résolus</span>
                <span>{health.total_gaps - health.gaps_resolved} restants</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4">Santé du Système</h3>
                <div className="space-y-3">
                  <HealthBar label="Hooks LIVE" value={health.hooks_live_pct} color="bg-accent-500" />
                  <HealthBar label="Hooks Hybrides" value={health.hooks_hybrid_pct} color="bg-primary-500" />
                  <HealthBar label="Hooks Mock-only" value={health.hooks_mock_only_pct} color="bg-secondary-500" />
                  <HealthBar label="Edge Functions (101/250)" value={health.edge_functions_pct} color="bg-accent-500" />
                  <HealthBar label="Migrations vérifiées" value={Math.round((health.migrations_verified / Math.max(1, 10)) * 100)} color="bg-accent-500" />
                  <HealthBar label="Score ISO 27001" value={health.iso_score} color="bg-accent-500" />
                  <HealthBar label="Score Big Four" value={health.bigfour_score} color="bg-primary-500" />
                </div>
              </div>

              <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4">Répartition des Écarts</h3>
                <div className="space-y-3">
                  <CountBar label="DATA_GAP" count={gaps.filter(g => g.category === 'DATA_GAP').length} total={gaps.length} color="bg-secondary-500" />
                  <CountBar label="LOGIC_GAP" count={gaps.filter(g => g.category === 'LOGIC_GAP').length} total={gaps.length} color="bg-primary-500" />
                  <CountBar label="INFRA_GAP" count={gaps.filter(g => g.category === 'INFRA_GAP').length} total={gaps.length} color="bg-accent-500" />
                  <CountBar label="COMPLIANCE_GAP" count={gaps.filter(g => g.category === 'COMPLIANCE_GAP').length} total={gaps.length} color="bg-accent-500" />
                  <CountBar label="ARCHITECTURE_GAP" count={gaps.filter(g => g.category === 'ARCHITECTURE_GAP').length} total={gaps.length} color="bg-secondary-500" />
                </div>
                <div className="mt-4 pt-4 border-t border-background-200/70 space-y-1">
                  <p className="text-xs text-foreground-500">
                    <strong className="text-accent-600">{health.migrations_verified}</strong> migrations vérifiées · <strong className="text-foreground-950">{health.migrations_pending}</strong> en attente
                  </p>
                  <p className="text-xs text-foreground-500">
                    <strong className="text-foreground-950">{health.actions_planned}</strong> actions planifiées · <strong className="text-primary-500">{health.actions_in_progress}</strong> en cours · <strong className="text-accent-600">{health.actions_completed}</strong> terminées
                  </p>
                  <p className="text-xs text-foreground-500">
                    Score ISO: <strong className="text-accent-600">{health.iso_score}/100</strong> · Big Four: <strong className="text-primary-600">{health.bigfour_score}/100</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* ─── Progression des scores ─── */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-foreground-950">Score ISO 27001</h4>
                  <span className="text-lg font-bold text-accent-600">{health.iso_score}<span className="text-xs text-foreground-400">/100</span></span>
                </div>
                <div className="h-2 rounded-full bg-background-200">
                  <div className="h-2 rounded-full bg-accent-500 transition-all duration-700" style={{ width: `${health.iso_score}%` }} />
                </div>
                <p className="text-xs text-foreground-500 mt-1">Objectif: 85 — Certification</p>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-foreground-950">Score Big Four</h4>
                  <span className="text-lg font-bold text-primary-600">{health.bigfour_score}<span className="text-xs text-foreground-400">/100</span></span>
                </div>
                <div className="h-2 rounded-full bg-background-200">
                  <div className="h-2 rounded-full bg-primary-500 transition-all duration-700" style={{ width: `${health.bigfour_score}%` }} />
                </div>
                <p className="text-xs text-foreground-500 mt-1">Objectif: 85 — Audit-ready</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3">Écarts Critiques (P0)</h3>
              <div className="grid grid-cols-1 gap-3">
                {p0Gaps.map(g => <GapCard key={g.gap_id} gap={g} />)}
              </div>
            </div>
          </div>
        )}

        {!loading && tab === 'gaps' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(['P0', 'P1', 'P2', 'P3'] as const).map(crit => {
                const count = gaps.filter(g => g.criticality === crit).length;
                const cls = CRITICALITY_COLORS[crit] || '';
                return (
                  <span key={crit} className={`text-xs px-2 py-1 rounded border ${cls}`}>
                    {crit}: {count}
                  </span>
                );
              })}
              <span className="text-xs px-2 py-1 rounded bg-background-100 text-foreground-500 ml-auto">
                {gaps.length} écarts totaux
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {gaps.map(g => <GapCard key={g.gap_id} gap={g} />)}
            </div>
          </div>
        )}

        {!loading && tab === 'actions' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center min-w-[80px]">
                <p className="text-lg font-bold text-primary-500">{j7Actions.length}</p>
                <p className="text-xs text-foreground-500">J+7</p>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center min-w-[80px]">
                <p className="text-lg font-bold text-accent-500">{j30Actions.length}</p>
                <p className="text-xs text-foreground-500">J+30</p>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center min-w-[80px]">
                <p className="text-lg font-bold text-secondary-500">{j90Actions.length}</p>
                <p className="text-xs text-foreground-500">J+90</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-500" />
                Horizon J+7 — Bloquants
              </h3>
              <div className="space-y-2">
                {j7Actions.map(a => <ActionRow key={a.action_id} action={a} />)}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-500" />
                Horizon J+30 — Stabilisation
              </h3>
              <div className="space-y-2">
                {j30Actions.map(a => <ActionRow key={a.action_id} action={a} />)}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground-950 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary-500" />
                Horizon J+90 — Conformité
              </h3>
              <div className="space-y-2">
                {j90Actions.map(a => <ActionRow key={a.action_id} action={a} />)}
              </div>
            </div>
          </div>
        )}

        {!loading && tab === 'migrations' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-foreground-950">{migrations.length}</p>
                <p className="text-xs text-foreground-500">Total</p>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-accent-500">{migrations.filter(m => m.migration_status === 'migrated').length}</p>
                <p className="text-xs text-foreground-500">Migrées</p>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-secondary-500">{migrations.filter(m => m.migration_status === 'pending').length}</p>
                <p className="text-xs text-foreground-500">En attente</p>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-primary-500">{migrations.filter(m => m.fallback_configured).length}</p>
                <p className="text-xs text-foreground-500">Avec fallback</p>
              </div>
            </div>
            <div className="space-y-2">
              {migrations.map(m => <MigrationRow key={m.migration_id} m={m} />)}
            </div>
          </div>
        )}

        {!loading && tab === 'compliance' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-accent-500">{health.iso_score}/100</p>
                <p className="text-xs text-foreground-500 mt-1">Score ISO 27001</p>
                <div className="mt-2 h-1.5 rounded-full bg-background-200">
                  <div className="h-1.5 rounded-full bg-accent-500" style={{ width: `${health.iso_score}%` }} />
                </div>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-primary-500">{health.bigfour_score}/100</p>
                <p className="text-xs text-foreground-500 mt-1">Score Big Four</p>
                <div className="mt-2 h-1.5 rounded-full bg-background-200">
                  <div className="h-1.5 rounded-full bg-primary-500" style={{ width: `${health.bigfour_score}%` }} />
                </div>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-foreground-950">{compliance.length}</p>
                <p className="text-xs text-foreground-500 mt-1">Impacts analysés</p>
              </div>
            </div>
            <div className="space-y-2">
              {compliance.map(c => {
                const action = actions.find(a => a.action_id === c.action_id);
                const isoColor = c.iso_27001_impact === 'high' ? 'text-primary-500' : c.iso_27001_impact === 'medium' ? 'text-accent-500' : 'text-foreground-500';
                const govColor = c.governance_impact === 'high' ? 'text-primary-500' : c.governance_impact === 'medium' ? 'text-accent-500' : 'text-foreground-500';
                return (
                  <div key={c.id} className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="text-sm font-medium text-foreground-950">{action?.description || c.action_id}</p>
                      <span className={`text-xs px-2 py-0.5 rounded ${action?.horizon === 'J+7' ? 'bg-primary-100 text-primary-900' : action?.horizon === 'J+30' ? 'bg-accent-100 text-accent-900' : 'bg-secondary-100 text-secondary-900'}`}>{action?.horizon || '—'}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className={isoColor}>ISO 27001: {c.iso_27001_impact}</span>
                      <span className={govColor}>Gouvernance: {c.governance_impact}</span>
                      <span className="text-foreground-500">Traçabilité: {c.traceability_level}</span>
                    </div>
                    {c.compliance_notes && (
                      <p className="text-xs text-foreground-500 mt-2 leading-relaxed">{c.compliance_notes}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!loading && tab === 'edge-functions' && (
          <div className="space-y-4">
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-2">Occupation Edge Functions</h3>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl font-bold text-foreground-950">101</span>
                <span className="text-sm text-foreground-500">/ 250 slots</span>
                <span className="text-sm text-primary-500 font-medium ml-auto">40% occupé</span>
              </div>
              <div className="h-2 rounded-full bg-background-200">
                <div className="h-2 rounded-full bg-primary-500" style={{ width: '40%' }} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-youtube-line text-lg text-primary-500"></i>
                  <h4 className="text-sm font-semibold text-foreground-950">YouTube Cluster</h4>
                </div>
                <p className="text-xs text-foreground-500 mb-2">6 fonctions → 1 engine</p>
                <div className="flex flex-wrap gap-1">
                  {['analytics', 'oauth', 'playlist', 'publisher', 'thumbnail', 'voice'].map(fn => (
                    <span key={fn} className="text-xs bg-background-200 text-foreground-600 px-1.5 py-0.5 rounded">{fn}</span>
                  ))}
                </div>
                <p className="text-xs text-accent-500 font-medium mt-2">Strat: FUSION → 5 slots libérés</p>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-brain-line text-lg text-accent-500"></i>
                  <h4 className="text-sm font-semibold text-foreground-950">RAG Cluster</h4>
                </div>
                <p className="text-xs text-foreground-500 mb-2">3 fonctions → 1 engine</p>
                <div className="flex flex-wrap gap-1">
                  {['embed', 'batch-embed', 'semantic-search'].map(fn => (
                    <span key={fn} className="text-xs bg-background-100 text-foreground-600 px-1.5 py-0.5 rounded">{fn}</span>
                  ))}
                </div>
                <p className="text-xs text-accent-500 font-medium mt-2">Strat: FUSION → 2 slots libérés</p>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-mail-send-line text-lg text-secondary-500"></i>
                  <h4 className="text-sm font-semibold text-foreground-950">Email Cluster</h4>
                </div>
                <p className="text-xs text-foreground-500 mb-2">3 fonctions → 1 engine</p>
                <div className="flex flex-wrap gap-1">
                  {['welcome', 'scheduled', 'funnel-sequence'].map(fn => (
                    <span key={fn} className="text-xs bg-background-200 text-foreground-600 px-1.5 py-0.5 rounded">{fn}</span>
                  ))}
                </div>
                <p className="text-xs text-accent-500 font-medium mt-2">Strat: FUSION → 2 slots libérés</p>
              </div>
            </div>

            <div className="bg-background-50 border border-background-200/70 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-foreground-950 mb-2">Résultat après Fusions</h3>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent-500">92</p>
                  <p className="text-xs text-foreground-500">Fonctions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent-500">9</p>
                  <p className="text-xs text-foreground-500">Slots libérés</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground-950">37%</p>
                  <p className="text-xs text-foreground-500">Occupation</p>
                </div>
                <div className="flex-1">
                  <div className="h-2 rounded-full bg-background-200">
                    <div className="h-2 rounded-full bg-accent-500" style={{ width: '37%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </hubLayout>
  );
}

function HealthBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-foreground-600 w-40 flex-shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-background-200">
        <div className={`h-2 rounded-full ${color} transition-all`} style={{ width: `${Math.min(100, value)}%` }} />
      </div>
      <span className="text-xs font-medium text-foreground-950 w-10 text-right">{value}%</span>
    </div>
  );
}

function CountBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-foreground-600 w-32 flex-shrink-0">{CATEGORY_LABELS[label] || label}</span>
      <div className="flex-1 h-2 rounded-full bg-background-200">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-medium text-foreground-950 w-8 text-right">{count}</span>
    </div>
  );
}



