import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { ENTERPRISE_DATA_MODEL, DataDomainSummary, DataGovernanceRule, DataQualityMetric, ValidationWorkflow, RelationalSchemaLink } from '@/mocks/enterpriseDataModel';

function CircularGauge({ value, size = 64, strokeWidth = 6, label }: { value: number; size?: number; strokeWidth?: number; label?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  const getColor = (v: number) => {
    if (v >= 90) return 'var(--primary-500)';
    if (v >= 75) return 'var(--accent-500)';
    if (v >= 50) return 'var(--secondary-500)';
    return '#ef4444';
  };

  return (
    <div className="relative inline-flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="oklch(var(--background-200) / 0.7)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={getColor(value)} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000 ease-out" />
      </svg>
      <span className="absolute text-sm font-semibold text-foreground-950">{value}</span>
      {label && <span className="text-xs text-foreground-500 mt-1">{label}</span>}
    </div>
  );
}

function ProgressBar({ value, target, colorClass = 'bg-primary-500', height = 'h-2' }: { value: number; target: number; colorClass?: string; height?: string }) {
  const pct = Math.min((value / target) * 100, 100);
  return (
    <div className={`w-full bg-background-200/70 rounded-full ${height}`}>
      <div className={`${height} rounded-full ${colorClass} transition-all duration-700 ease-out`} style={{ width: `${pct}%` }} />
    </div>
  );
}

// Tab 1: Overview
function OverviewTab() {
  const data = ENTERPRISE_DATA_MODEL;
  return (
    <div className="space-y-4 md:space-y-5">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {[
          { label: 'Tables Supabase', value: data.total_tables, icon: 'ri-database-2-line', color: 'text-primary-500' },
          { label: 'Domaines Fonctionnels', value: data.domains, icon: 'ri-stack-line', color: 'text-accent-500' },
          { label: 'Lignes estimées', value: data.total_rows_estimate.toLocaleString(), icon: 'ri-file-list-3-line', color: 'text-secondary-500' },
          { label: 'Relations FK', value: data.relational_schema.length, icon: 'ri-git-branch-line', color: 'text-foreground-500' },
          { label: 'Règles Gouvernance', value: data.governance_rules.length, icon: 'ri-scales-line', color: 'text-primary-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-background-100 border border-background-200/70 rounded-lg p-4 text-center">
            <i className={`${stat.icon} ${stat.color} text-xl mb-1 block`} />
            <p className="text-lg font-bold text-foreground-950">{stat.value}</p>
            <p className="text-xs text-foreground-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Certification & Maturity */}
      <div className="bg-accent-100/70 border border-accent-200/60 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-500 text-background-50 flex-shrink-0">
          <i className="ri-award-line text-sm" />
        </div>
        <div className="flex-1">
          <span className="text-xs font-semibold text-accent-700">Certification cible</span>
          <p className="text-sm text-foreground-700">{data.certification_target}</p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <CircularGauge value={data.current_maturity} size={52} strokeWidth={4} />
          <div className="text-center">
            <div className="text-lg font-bold text-primary-500">{data.target_maturity}</div>
            <p className="text-xs text-foreground-500">Cible</p>
          </div>
        </div>
      </div>

      {/* Standards */}
      <div>
        <h3 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2">Standards de Référence</h3>
        <div className="flex flex-wrap gap-1.5">
          {data.standards.map((std) => (
            <span key={std} className="text-xs px-2 py-1 rounded-md bg-background-200/70 text-foreground-600 font-medium">{std}</span>
          ))}
        </div>
      </div>

      {/* Domain Cards Grid */}
      <div>
        <h3 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-3">Cartographie par Domaine Fonctionnel</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.domains_summary.map((domain) => (
            <div key={domain.domain_id} className="bg-background-100 border border-background-200/70 rounded-lg p-4 hover:border-background-300/60 transition-colors cursor-default">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-md bg-background-200/70 flex-shrink-0">
                  <i className={`${domain.icon} text-foreground-700 text-base`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground-950 truncate">{domain.domain_name}</p>
                  <p className="text-xs text-foreground-500 mt-0.5">{domain.table_count} tables · {domain.total_rows_estimate.toLocaleString()} lignes</p>
                </div>
              </div>
              <p className="text-xs text-foreground-600 line-clamp-2 mb-2">{domain.description}</p>
              <div className="flex flex-wrap gap-1">
                {domain.hub_refs.slice(0, 2).map((hub) => (
                  <span key={hub} className="text-xs px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium whitespace-nowrap">{hub}</span>
                ))}
                {domain.hub_refs.length > 2 && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-background-200/70 text-foreground-500">+{domain.hub_refs.length - 2}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Tab 2: Data Dictionary
function DataDictionaryTab() {
  const data = ENTERPRISE_DATA_MODEL;
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [expandedTable, setExpandedTable] = useState<string | null>(null);

  const allTables = useMemo(() => {
    let tables: { domain: DataDomainSummary; table: typeof data.domains_summary[0]['tables'][0] }[] = [];
    data.domains_summary.forEach((domain) => {
      domain.tables.forEach((table) => {
        tables.push({ domain, table });
      });
    });
    return tables;
  }, [data]);

  const filtered = useMemo(() => {
    return allTables.filter(({ domain, table }) => {
      const matchDomain = selectedDomain === 'all' || domain.domain_id === selectedDomain;
      const matchSearch = !search || table.table_name.toLowerCase().includes(search.toLowerCase()) || table.description.toLowerCase().includes(search.toLowerCase());
      return matchDomain && matchSearch;
    });
  }, [allTables, selectedDomain, search]);

  return (
    <div className="space-y-4">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm" />
          <input
            type="text"
            placeholder="Rechercher une table..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-background-100 border border-background-200/70 rounded-md text-foreground-950 placeholder-foreground-400 focus:outline-none focus:border-primary-300"
          />
        </div>
        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          className="px-3 py-2 text-sm bg-background-100 border border-background-200/70 rounded-md text-foreground-950 focus:outline-none focus:border-primary-300"
        >
          <option value="all">Tous les domaines ({data.domains})</option>
          {data.domains_summary.map((d) => (
            <option key={d.domain_id} value={d.domain_id}>{d.domain_name} ({d.table_count})</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-xs text-foreground-500">{filtered.length} table{filtered.length > 1 ? 's' : ''} trouvée{filtered.length > 1 ? 's' : ''}</p>

      {/* Table list */}
      <div className="space-y-2">
        {filtered.map(({ domain, table }) => (
          <div key={table.table_name} className="bg-background-100 border border-background-200/70 rounded-lg overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => setExpandedTable(expandedTable === table.table_name ? null : table.table_name)}
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-background-200/30 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-background-200/70 flex-shrink-0">
                <i className={`${domain.icon} text-foreground-600 text-sm`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground-950 font-mono">{table.table_name}</p>
                <p className="text-xs text-foreground-500 line-clamp-1">{table.description}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-background-200/70 text-foreground-500 whitespace-nowrap">{domain.domain_name}</span>
                {table.has_rls && <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-700 whitespace-nowrap">RLS</span>}
                <i className={`${expandedTable === table.table_name ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-foreground-400 text-sm`} />
              </div>
            </button>
            {expandedTable === table.table_name && (
              <div className="px-4 pb-4 border-t border-background-200/70 pt-3 space-y-3">
                <div>
                  <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1">Description</h4>
                  <p className="text-sm text-foreground-700">{table.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1">Colonnes clés</h4>
                    <div className="flex flex-wrap gap-1">
                      {table.key_columns.map((col) => (
                        <code key={col} className="text-xs px-1.5 py-0.5 rounded bg-background-200/70 text-foreground-700 font-mono">{col}</code>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1">Hubs</h4>
                    <div className="flex flex-wrap gap-1">
                      {table.hub_refs.map((hub) => (
                        <span key={hub} className="text-xs px-1.5 py-0.5 rounded-full bg-accent-100 text-accent-700 whitespace-nowrap">{hub}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {table.relations.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1">Relations</h4>
                    {table.relations.map((rel, i) => (
                      <div key={i} className="text-xs text-foreground-600 flex items-center gap-1.5">
                        <span className="font-mono text-foreground-700">{rel.foreign_table}</span>
                        <i className="ri-arrow-right-line text-foreground-400" />
                        <span>{rel.relationship}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-4 text-xs text-foreground-500">
                  <span>Lignes estimées : <strong className="text-foreground-700">{table.row_estimate}</strong></span>
                  <span>Catégorie : <strong className="text-foreground-700">{table.category}</strong></span>
                  <span>RLS : <strong className={table.has_rls ? 'text-primary-500' : 'text-accent-500'}>{table.has_rls ? 'Activée' : 'Non activée'}</strong></span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Tab 3: Relational Schema
function RelationalSchemaTab() {
  const data = ENTERPRISE_DATA_MODEL;
  return (
    <div className="space-y-4">
      <p className="text-sm text-foreground-600">{data.relational_schema.length} relations clés identifiées entre les tables de l'écosystème KOS.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {data.relational_schema.map((link, i) => (
          <div key={i} className="bg-background-100 border border-background-200/70 rounded-lg p-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <code className="text-xs font-semibold text-primary-500 font-mono">{link.from_table}</code>
                <span className="text-xs text-foreground-400">{link.from_domain}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground-500">
                <i className="ri-corner-right-down-line text-accent-500" />
                <span className="text-accent-600">{link.relationship}</span>
                <span className="px-1 py-0.5 rounded bg-background-200/70 text-foreground-500 font-mono">{link.cardinality}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-xs font-semibold text-secondary-500 font-mono">{link.to_table}</code>
                <span className="text-xs text-foreground-400">{link.to_domain}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Tab 4: Data Governance
function DataGovernanceTab() {
  const data = ENTERPRISE_DATA_MODEL;
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="bg-background-100 border border-background-200/70 rounded-lg px-4 py-3 text-center">
          <p className="text-lg font-bold text-foreground-950">{data.governance_rules.length}</p>
          <p className="text-xs text-foreground-500">Règles</p>
        </div>
        <div className="bg-background-100 border border-background-200/70 rounded-lg px-4 py-3 text-center">
          <p className="text-lg font-bold text-primary-500">{data.governance_rules.filter(r => r.compliance === 'compliant').length}</p>
          <p className="text-xs text-foreground-500">Conformes</p>
        </div>
        <div className="bg-background-100 border border-background-200/70 rounded-lg px-4 py-3 text-center">
          <p className="text-lg font-bold text-accent-500">{data.governance_rules.filter(r => r.compliance === 'partial').length}</p>
          <p className="text-xs text-foreground-500">Partielles</p>
        </div>
        <div className="bg-background-100 border border-background-200/70 rounded-lg px-4 py-3 text-center">
          <p className="text-lg font-bold text-red-500">{data.governance_rules.filter(r => r.compliance === 'non_compliant').length}</p>
          <p className="text-xs text-foreground-500">Non conformes</p>
        </div>
      </div>

      {data.governance_rules.map((rule) => (
        <div key={rule.rule_id} className="bg-background-100 border border-background-200/70 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setExpandedRule(expandedRule === rule.rule_id ? null : rule.rule_id)}
            className="w-full flex items-center gap-3 p-3 md:p-4 text-left hover:bg-background-200/30 transition-colors cursor-pointer"
          >
            <div className={`w-9 h-9 flex items-center justify-center rounded-md flex-shrink-0 ${
              rule.compliance === 'compliant' ? 'bg-primary-100 text-primary-700' :
              rule.compliance === 'partial' ? 'bg-accent-100 text-accent-700' : 'bg-red-100 text-red-700'
            }`}>
              <i className={rule.compliance === 'compliant' ? 'ri-check-line' : rule.compliance === 'partial' ? 'ri-time-line' : 'ri-close-line'} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-foreground-950">{rule.rule_id} — {rule.rule_name}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap ${
                  rule.compliance === 'compliant' ? 'bg-primary-100 text-primary-700' :
                  rule.compliance === 'partial' ? 'bg-accent-100 text-accent-700' : 'bg-red-100 text-red-700'
                }`}>
                  {rule.compliance === 'compliant' ? 'Conforme' : rule.compliance === 'partial' ? 'Partiel' : 'Non conforme'}
                </span>
              </div>
              <p className="text-xs text-foreground-500 mt-0.5">{rule.category} · {rule.affected_tables_count} tables affectées</p>
            </div>
            <i className={`${expandedRule === rule.rule_id ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-foreground-400 text-sm`} />
          </button>
          {expandedRule === rule.rule_id && (
            <div className="px-4 pb-4 border-t border-background-200/70 pt-3 space-y-2">
              <p className="text-sm text-foreground-700">{rule.description}</p>
              <p className="text-xs text-foreground-500">Standard : <span className="text-foreground-700 font-medium">{rule.standard_ref}</span></p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Tab 5: Data Quality
function DataQualityTab() {
  const data = ENTERPRISE_DATA_MODEL;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {data.quality_metrics.map((metric, i) => (
          <div key={i} className="bg-background-100 border border-background-200/70 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-foreground-500 uppercase tracking-wider">{metric.domain}</span>
              <span className={`text-xs ${
                metric.trend === 'up' ? 'text-primary-500' : metric.trend === 'down' ? 'text-red-500' : 'text-foreground-500'
              }`}>
                {metric.trend === 'up' && <i className="ri-arrow-up-line" />}
                {metric.trend === 'down' && <i className="ri-arrow-down-line" />}
                {metric.trend === 'stable' && <i className="ri-arrow-right-line" />}
              </span>
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-2xl font-bold text-foreground-950">{metric.current_value}</span>
              <span className="text-sm text-foreground-500">{metric.unit}</span>
            </div>
            <p className="text-xs text-foreground-600 mb-2">{metric.metric_name}</p>
            <ProgressBar value={metric.current_value} target={metric.target_value} height="h-1.5" />
            <p className="text-xs text-foreground-400 mt-1">Cible : {metric.target_value}{metric.unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Tab 6: Validation Workflow
function ValidationWorkflowTab() {
  const data = ENTERPRISE_DATA_MODEL;
  return (
    <div className="space-y-4">
      <p className="text-sm text-foreground-600">Workflow de validation pour toute création ou modification de table dans l'écosystème KOS.</p>
      <div className="space-y-3">
        {data.validation_workflow.map((step) => (
          <div key={step.step} className="bg-background-100 border border-background-200/70 rounded-lg p-4 flex gap-4">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0 ${
              step.status === 'active' ? 'bg-primary-500 text-background-50' :
              step.status === 'pending' ? 'bg-accent-100 text-accent-700' : 'bg-background-200/70 text-foreground-500'
            }`}>
              <span className="text-sm font-bold">{step.step}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h4 className="text-sm font-semibold text-foreground-950">{step.step_name}</h4>
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap ${
                  step.status === 'active' ? 'bg-primary-100 text-primary-700' :
                  step.status === 'pending' ? 'bg-accent-100 text-accent-700' : 'bg-background-200/70 text-foreground-500'
                }`}>
                  {step.status === 'active' ? 'Actif' : step.status === 'pending' ? 'En attente' : 'Brouillon'}
                </span>
              </div>
              <p className="text-xs text-foreground-600 mb-2">{step.description}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground-500">
                <span>Responsable : <strong className="text-foreground-700">{step.responsible}</strong></span>
                <span>Outil : <strong className="text-foreground-700">{step.tool}</strong></span>
                <span>Fréquence : <strong className="text-foreground-700">{step.frequency}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  { key: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
  { key: 'dictionary', label: 'Dictionnaire', icon: 'ri-book-2-line' },
  { key: 'schema', label: 'Schéma Relationnel', icon: 'ri-git-branch-line' },
  { key: 'governance', label: 'Gouvernance', icon: 'ri-scales-line' },
  { key: 'quality', label: 'Qualité', icon: 'ri-bar-chart-2-line' },
  { key: 'workflow', label: 'Validation', icon: 'ri-flow-chart' },
];

export default function enterpriseDataModelPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const data = ENTERPRISE_DATA_MODEL;

  return (
    <hubLayout hubId={64} activeTab={activeTab} tabLabel="Bloc 2">
      <main id="main-content">
        {/* Header */}
        <header className="bg-background-100 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary-100 text-primary-700 uppercase tracking-wider">
                    {data.bloc_id}
                  </span>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-background-200/70 text-foreground-600">
                    {data.version}
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground-950">
                  {data.bloc_name}
                </h1>
                <p className="text-sm text-foreground-600 mt-2 max-w-3xl">
                  {data.executive_summary}
                </p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <CircularGauge value={data.current_maturity} size={64} strokeWidth={5} />
                <div className="text-center">
                  <div className="text-xl font-bold text-primary-500">{data.target_maturity}</div>
                  <p className="text-xs text-foreground-500">Cible</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Bar */}
        <section className="border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
            <div className="flex flex-wrap items-center gap-4 md:gap-8 text-xs text-foreground-600">
              <div className="flex items-center gap-1.5">
                <i className="ri-database-2-line text-primary-500" />
                <span><strong className="text-foreground-950">{data.total_tables}</strong> Tables</span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-stack-line text-accent-500" />
                <span><strong className="text-foreground-950">{data.domains}</strong> Domaines</span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-git-branch-line text-secondary-500" />
                <span><strong className="text-foreground-950">{data.relational_schema.length}</strong> Relations FK</span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-scales-line text-foreground-500" />
                <span><strong className="text-foreground-950">{data.governance_rules.length}</strong> Règles</span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-file-list-3-line text-foreground-500" />
                <span><strong className="text-foreground-950">{data.total_rows_estimate.toLocaleString()}</strong> Lignes</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="border-b border-background-200/70 sticky top-0 bg-background-50 z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex gap-0 overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                    activeTab === tab.key
                      ? 'border-primary-500 text-primary-500 font-semibold'
                      : 'border-transparent text-foreground-500 hover:text-foreground-700 hover:border-background-300/60'
                  }`}
                >
                  <i className={`${tab.icon} text-sm`} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 pb-12">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'dictionary' && <DataDictionaryTab />}
          {activeTab === 'schema' && <RelationalSchemaTab />}
          {activeTab === 'governance' && <DataGovernanceTab />}
          {activeTab === 'quality' && <DataQualityTab />}
          {activeTab === 'workflow' && <ValidationWorkflowTab />}
        </section>

        {/* Footer Stats */}
        <footer className="border-t border-background-200/70 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { label: 'Maturité', value: `${data.current_maturity}/100`, icon: 'ri-medal-line', color: 'text-primary-500' },
                { label: 'Tables', value: data.total_tables, icon: 'ri-database-2-line', color: 'text-accent-500' },
                { label: 'Domaines', value: data.domains, icon: 'ri-stack-line', color: 'text-secondary-500' },
                { label: 'Relations', value: data.relational_schema.length, icon: 'ri-git-branch-line', color: 'text-foreground-500' },
                { label: 'Règles', value: `${data.governance_rules.filter(r => r.compliance === 'compliant').length}/${data.governance_rules.length}`, icon: 'ri-scales-line', color: 'text-primary-500' },
                { label: 'Version', value: data.version, icon: 'ri-hashtag', color: 'text-foreground-500' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <i className={`${stat.icon} ${stat.color} text-lg`} />
                  <p className="text-lg font-bold text-foreground-950 mt-1">{stat.value}</p>
                  <p className="text-xs text-foreground-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </hubLayout>
  );
}



