import { useState, useMemo } from 'react';
import {
  rlsDashboardSummary,
  criticalTablesStatus,
  storageBucketsStatus,
  allTablesSample,
  rlsAuditTimeline,
} from '@/mocks/rlsDashboard';

function RlsGauge({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
      <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
        <circle cx="72" cy="72" r={radius} fill="none" stroke="oklch(var(--background-200))" strokeWidth="8" />
        <circle
          cx="72" cy="72" r={radius} fill="none"
          stroke={score >= 98 ? 'oklch(var(--primary-500))' : score >= 90 ? 'oklch(var(--accent-500))' : '#ef4444'}
          strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-foreground-950">{score}%</span>
        <span className="text-[11px] text-foreground-500">Couverture</span>
      </div>
    </div>
  );
}

function RiskBadge({ level }: { level: string }) {
  const config: Record<string, string> = {
    critical: 'bg-red-500 text-white',
    high: 'bg-orange-500 text-white',
    medium: 'bg-amber-500 text-white',
    low: 'bg-emerald-500 text-white',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${config[level] || 'bg-slate-400 text-white'}`}>
      {level}
    </span>
  );
}

function RlsBadge({ enabled }: { enabled: boolean }) {
  return enabled ? (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
      Activé
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500">
      <span className="w-2 h-2 rounded-full bg-red-400"></span>
      Désactivé
    </span>
  );
}

function PolicyBadge({ count }: { count: number }) {
  if (count === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-red-500 font-semibold">
        <i className="ri-alert-line"></i> {count}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-foreground-600 font-semibold">
      <i className="ri-shield-check-line text-emerald-500"></i> {count}
    </span>
  );
}

function CriticalTableCard({ table }: { table: typeof criticalTablesStatus[0] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-background-50 rounded-lg border border-background-200/70 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-background-100/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
            table.risk_level === 'low' ? 'bg-emerald-100 text-emerald-600' :
            table.risk_level === 'medium' ? 'bg-amber-100 text-amber-600' :
            'bg-red-100 text-red-500'
          }`}>
            <i className="ri-database-2-line text-lg"></i>
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-foreground-950 font-mono">{table.table_name}</div>
            <div className="flex items-center gap-2 mt-0.5">
              <RlsBadge enabled={table.rls_enabled} />
              <span className="text-foreground-300 text-xs">·</span>
              <PolicyBadge count={table.policy_count} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <RiskBadge level={table.risk_level} />
          <i className={`ri-${expanded ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-400 text-sm`}></i>
        </div>
      </button>
      {expanded && (
        <div className="border-t border-background-200/70 px-4 py-3 bg-background-100/50">
          <div className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2">Policies</div>
          <div className="space-y-1.5">
            {table.policies.map((pol, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <span className="px-1.5 py-0.5 rounded bg-primary-100 text-primary-700 font-mono text-[10px] font-semibold">
                  {pol.command}
                </span>
                <span className="text-foreground-700 font-medium">{pol.name}</span>
                {pol.using && (
                  <span className="text-foreground-400 text-[11px] truncate max-w-[200px]">
                    USING: {pol.using}
                  </span>
                )}
              </div>
            ))}
          </div>
          {table.notes && (
            <div className="mt-3 flex items-start gap-2 text-xs text-foreground-500 bg-background-50 rounded-md p-2.5 border border-background-200/70">
              <i className="ri-information-line text-foreground-400 mt-0.5 flex-shrink-0"></i>
              {table.notes}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StorageBucketCard({ bucket }: { bucket: typeof storageBucketsStatus[0] }) {
  return (
    <div className="bg-background-50 rounded-lg border border-background-200/70 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-sky-100 text-sky-600">
            <i className="ri-hard-drive-2-line text-lg"></i>
          </div>
          <div>
            <div className="text-sm font-bold text-foreground-950 font-mono">{bucket.bucket_name}</div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xs font-semibold ${bucket.public ? 'text-amber-600' : 'text-emerald-600'}`}>
                {bucket.public ? 'Public' : 'Privé'}
              </span>
              <span className="text-foreground-300 text-xs">·</span>
              <span className="text-xs text-foreground-500">{bucket.policy_count} policies</span>
            </div>
          </div>
        </div>
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <i className="ri-shield-check-line"></i>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {bucket.policies.map((pol, idx) => (
          <span key={idx} className="text-[10px] px-2 py-1 rounded-full bg-background-100 text-foreground-600 border border-background-200/70 font-mono">
            {pol.command}: {pol.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function TimelineEvent({ event, isLast }: { event: typeof rlsAuditTimeline[0]; isLast: boolean }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-primary-500 flex-shrink-0"></div>
        {!isLast && <div className="w-0.5 flex-1 bg-background-200"></div>}
      </div>
      <div className="pb-5">
        <div className="text-xs text-foreground-400 mb-1">{event.date}</div>
        <div className="text-sm font-semibold text-foreground-950 mb-1">{event.event}</div>
        <div className="text-xs text-foreground-500">{event.findings}</div>
      </div>
    </div>
  );
}

export default function rlsDashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRls, setFilterRls] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [scanLoading, setScanLoading] = useState(false);

  const filteredTables = useMemo(() => {
    return allTablesSample.filter((t) => {
      const matchSearch =
        searchQuery === '' || t.table_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRls =
        filterRls === 'all' ||
        (filterRls === 'enabled' && t.rls_enabled) ||
        (filterRls === 'disabled' && !t.rls_enabled);
      const matchRisk = filterRisk === 'all' || t.risk === filterRisk;
      return matchSearch && matchRls && matchRisk;
    });
  }, [searchQuery, filterRls, filterRisk]);

  const counts = useMemo(() => {
    const total = allTablesSample.length;
    const enabled = allTablesSample.filter((t) => t.rls_enabled).length;
    const disabled = total - enabled;
    const withPolicies = allTablesSample.filter((t) => t.policy_count > 0).length;
    const noPolicies = allTablesSample.filter((t) => t.rls_enabled && t.policy_count === 0).length;
    const critical = allTablesSample.filter((t) => t.risk === 'critical').length;
    const high = allTablesSample.filter((t) => t.risk === 'high').length;
    return { total, enabled, disabled, withPolicies, noPolicies, critical, high };
  }, []);

  const handleScan = async () => {
    setScanLoading(true);
    setTimeout(() => setScanLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background-50">
      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary-500 text-white tracking-wide">
                  ISO 27001 §A.9.1
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                  RLS MONITORING
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white">
                  GRADE A — {rlsDashboardSummary.rlsCoveragePct}%
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground-950 mb-3">
                KOS RLS Guardian Dashboard
              </h1>
              <p className="text-base text-foreground-600 max-w-3xl">
                Monitoring temps réel du Row Level Security sur {rlsDashboardSummary.totalTables} tables.
                Audit conforme ISO 27001 §A.9.1 — Contrôle d&apos;accès logique.
                Dernier scan : {new Date(rlsDashboardSummary.lastScanTimestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                · {rlsDashboardSummary.scanDurationMs}ms.
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-6">
              <RlsGauge score={rlsDashboardSummary.rlsCoveragePct} />
              <button
                onClick={handleScan}
                disabled={scanLoading}
                className="flex items-center gap-2 px-5 py-3 bg-primary-500 text-white rounded-lg font-semibold text-sm hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60"
              >
                <i className={`${scanLoading ? 'ri-loader-4-line animate-spin' : 'ri-refresh-line'} text-base`}></i>
                {scanLoading ? 'Scan en cours...' : 'Lancer Scan'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="border-b border-background-200/70 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
            <div className="bg-background-100 rounded-lg p-3 text-center border border-background-200/70">
              <div className="text-2xl font-bold text-foreground-950">{counts.total}</div>
              <div className="text-[10px] text-foreground-500">Tables</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 text-center border border-emerald-200">
              <div className="text-2xl font-bold text-emerald-600">{counts.enabled}</div>
              <div className="text-[10px] text-emerald-600">RLS Activé</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center border border-red-200">
              <div className="text-2xl font-bold text-red-500">{counts.disabled}</div>
              <div className="text-[10px] text-red-500">RLS Désactivé</div>
            </div>
            <div className="bg-sky-50 rounded-lg p-3 text-center border border-sky-200">
              <div className="text-2xl font-bold text-sky-600">{counts.withPolicies}</div>
              <div className="text-[10px] text-sky-600">Avec Policies</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 text-center border border-amber-200">
              <div className="text-2xl font-bold text-amber-600">{counts.noPolicies}</div>
              <div className="text-[10px] text-amber-600">RLS sans Policy</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center border border-red-200">
              <div className="text-2xl font-bold text-red-500">{counts.critical}</div>
              <div className="text-[10px] text-red-500">Risque Critique</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">{counts.high}</div>
              <div className="text-[10px] text-orange-600">Risque Élevé</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 text-center border border-emerald-200">
              <div className="text-2xl font-bold text-emerald-600">{rlsDashboardSummary.storageBucketsSecured}/{rlsDashboardSummary.storageBucketsTotal}</div>
              <div className="text-[10px] text-emerald-600">Buckets Sécurisés</div>
            </div>
          </div>
        </div>
      </section>

      {/* Alert banner if tables without RLS */}
      {counts.disabled > 0 && (
        <section className="bg-red-500 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 flex-shrink-0">
                <i className="ri-alert-line"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">
                  {counts.disabled} table{counts.disabled > 1 ? 's' : ''} sans RLS · {counts.critical} critique{counts.critical > 1 ? 's' : ''} · {counts.high} élevée{counts.high > 1 ? 's' : ''}
                </p>
              </div>
              <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full whitespace-nowrap">
                ACTION REQUISE
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Critical Tables Panel */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-8">
        <h2 className="text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
          <i className="ri-shield-star-line text-primary-500"></i>
          Tables Critiques — Audit Granulaire
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {criticalTablesStatus.map((table) => (
            <CriticalTableCard key={table.table_name} table={table} />
          ))}
        </div>
      </section>

      {/* Storage Buckets Panel */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-8">
        <h2 className="text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
          <i className="ri-hard-drive-2-line text-sky-500"></i>
          Storage Buckets — Supabase
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {storageBucketsStatus.map((bucket) => (
            <StorageBucketCard key={bucket.bucket_name} bucket={bucket} />
          ))}
        </div>
      </section>

      {/* All Tables Table */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-8">
        <h2 className="text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
          <i className="ri-table-line text-foreground-500"></i>
          Toutes les Tables Publiques
        </h2>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
          <div className="relative flex-1 w-full max-w-sm">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
            <input
              type="text"
              placeholder="Rechercher une table..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={filterRls}
              onChange={(e) => setFilterRls(e.target.value)}
              className="px-3 py-2 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 focus:outline-none focus:border-primary-300 cursor-pointer"
            >
              <option value="all">RLS: Tous</option>
              <option value="enabled">RLS: Activé</option>
              <option value="disabled">RLS: Désactivé</option>
            </select>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="px-3 py-2 text-sm bg-background-100 border border-background-200/70 rounded-lg text-foreground-950 focus:outline-none focus:border-primary-300 cursor-pointer"
            >
              <option value="all">Risque: Tous</option>
              <option value="critical">Critique</option>
              <option value="high">Élevé</option>
              <option value="medium">Moyen</option>
              <option value="low">Faible</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-background-50 rounded-lg border border-background-200/70 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-background-200/70 bg-background-100">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-foreground-500 uppercase tracking-wider">Table</th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-foreground-500 uppercase tracking-wider">RLS</th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-foreground-500 uppercase tracking-wider">Policies</th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-foreground-500 uppercase tracking-wider">Risque</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-foreground-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTables.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-sm text-foreground-400">
                      <i className="ri-search-line text-2xl block mb-2"></i>
                      Aucune table ne correspond aux filtres.
                    </td>
                  </tr>
                ) : (
                  filteredTables.map((table) => (
                    <tr key={table.table_name} className="border-b border-background-200/70 hover:bg-background-100/50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="text-sm font-mono font-semibold text-foreground-950">{table.table_name}</span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <RlsBadge enabled={table.rls_enabled} />
                      </td>
                      <td className="py-3 px-3 text-center">
                        <PolicyBadge count={table.policy_count} />
                      </td>
                      <td className="py-3 px-3 text-center">
                        <RiskBadge level={table.risk} />
                      </td>
                      <td className="py-3 px-4 text-right">
                        {!table.rls_enabled && (
                          <button className="text-xs px-3 py-1.5 bg-primary-500 text-white rounded-md font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
                            <i className="ri-shield-line mr-1"></i>
                            Fix RLS
                          </button>
                        )}
                        {table.rls_enabled && table.policy_count === 0 && (
                          <button className="text-xs px-3 py-1.5 bg-amber-500 text-white rounded-md font-semibold hover:bg-amber-600 transition-colors cursor-pointer whitespace-nowrap">
                            <i className="ri-add-line mr-1"></i>
                            Ajouter Policy
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-3 text-xs text-foreground-400">
          {filteredTables.length} table{filteredTables.length > 1 ? 's' : ''} affichée{filteredTables.length > 1 ? 's' : ''}
          {(filterRls !== 'all' || filterRisk !== 'all' || searchQuery) ? ' (filtrée)' : ` sur ${allTablesSample.length} au total`}
        </div>
      </section>

      {/* Audit Timeline */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-12">
        <h2 className="text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
          <i className="ri-history-line text-primary-500"></i>
          Historique d&apos;Audit RLS
        </h2>
        <div className="bg-background-50 rounded-lg border border-background-200/70 p-5">
          {rlsAuditTimeline.map((event, idx) => (
            <TimelineEvent key={idx} event={event} isLast={idx === rlsAuditTimeline.length - 1} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground-400">
            <div className="flex items-center gap-4">
              <span>KOS RLS Guardian Dashboard v2.0</span>
              <span>·</span>
              <span>ISO 27001:2022 §A.9.1</span>
              <span>·</span>
              <span>pg_cron: chaque heure</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                RLS Activé: {counts.enabled}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                RLS Désactivé: {counts.disabled}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Sans Policy: {counts.noPolicies}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}





