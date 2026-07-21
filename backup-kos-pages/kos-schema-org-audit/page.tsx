import { RiskStatsCards, OptimizedImage, StatCard, CredibilitySection, DownloadDashboard, InlineLeadMagnet } from '@/components/_stubs';
import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import {
  schemaOrgAuditSummary,
  schemaOrgTypes,
  schemaOrgRichResultsPerformance,
  schemaOrgRichResultsTrends,
  schemaOrgMissingOpportunities,
  schemaOrgCriticalFixes,
  schemaOrgPageLevelAudit,
  schemaOrgValidationSummary,
  schemaOrgImpactMetrics,
  schemaOrgAuditActions,
} from '@/mocks/schemaOrgAudit';

type Tab = 'overview' | 'types' | 'rich-results' | 'opportunities' | 'fixes' | 'pages';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
  { id: 'types', label: '12 Types Schema', icon: 'ri-code-s-slash-line' },
  { id: 'rich-results', label: 'Rich Results', icon: 'ri-star-line' },
  { id: 'opportunities', label: 'Opportunités', icon: 'ri-lightbulb-line' },
  { id: 'fixes', label: 'Correctifs Critiques', icon: 'ri-tools-line' },
  { id: 'pages', label: 'Audit par Page', icon: 'ri-file-list-3-line' },
];

function GaugeRing({ score, size, label }: { score: number; size: 'sm' | 'md' | 'lg'; label?: string }) {
  const dims = { sm: 56, md: 72, lg: 96 };
  const fonts = { sm: '0.75rem', md: '0.875rem', lg: '1.125rem' };
  const d = dims[size];
  const r = (d - 8) / 2;
  const circ = 2 * Math.PI * r;
  const pct = score / 100;
  const offset = circ * (1 - pct);
  const color = score >= 90 ? 'oklch(0.6 0.18 160)' : score >= 75 ? 'oklch(0.7 0.16 85)' : 'oklch(0.55 0.2 25)';

  return (
    <div className="flex flex-col items-center gap-1">
      <div style={{ position: 'relative', width: d, height: d }}>
        <svg width={d} height={d} viewBox={`0 0 ${d} ${d}`} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={d / 2} cy={d / 2} r={r} fill="none" stroke="oklch(var(--background-200))" strokeWidth="6" />
          <circle cx={d / 2} cy={d / 2} r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: 'all 0.7s' }} />
        </svg>
        <span style={{ position: 'absolute', top: 0, left: 0, width: d, lineHeight: `${d}px`, textAlign: 'center', fontSize: fonts[size], fontWeight: 700 }}>
          {score}%
        </span>
      </div>
      {label && <span className="text-xs text-foreground-600">{label}</span>}
    </div>
  );
}

function MiniGauge({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full h-1.5 rounded-full bg-background-200/70 overflow-hidden">
      <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function StatCard({ label, value, sub, icon, color, trend }: {
  label: string; value: string | number; sub?: string; icon: string; color: string; trend?: 'up' | 'down' | 'stable';
}) {
  const trendIcon = trend === 'up' ? 'ri-arrow-up-line text-emerald-500' : trend === 'down' ? 'ri-arrow-down-line text-red-500' : 'ri-subtract-line text-amber-500';
  return (
    <div className="bg-background-50 border border-background-200/70 rounded-lg p-4 flex items-start gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color} shrink-0`}>
        <i className={`${icon} text-background-50 text-lg`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-foreground-600 mb-0.5">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-foreground-950">{value}</span>
          {trend && <i className={`${trendIcon} text-sm`} />}
        </div>
        {sub && <p className="text-xs text-foreground-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function schemaOrgAuditPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [expandedFix, setExpandedFix] = useState<string | null>(null);
  const [expandedOpportunity, setExpandedOpportunity] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredTypes = useMemo(() => {
    if (typeFilter === 'all') return schemaOrgTypes;
    if (typeFilter === 'errors') return schemaOrgTypes.filter(t => t.errors > 0 || !t.valid);
    if (typeFilter === 'rich') return schemaOrgTypes.filter(t => t.rich_result);
    return schemaOrgTypes;
  }, [typeFilter]);

  const summary = schemaOrgAuditSummary;
  const priorityColors: Record<string, string> = {
    high: 'bg-red-500',
    medium: 'bg-amber-500',
    low: 'bg-secondary-500',
    done: 'bg-emerald-500',
  };

  return (
    <hubLayout hubId={64}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground-950">Schema.org Audit</h1>
            <p className="text-sm text-foreground-600 mt-0.5">Validation, Rich Results & Opportunités — Dernier scan : {new Date(summary.last_audit).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 rounded-full px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold whitespace-nowrap">AUDIT LIVE</span>
            </div>
            <span className="text-xs text-foreground-500">Score Global</span>
            <span className={`text-xl font-bold ${summary.overall_score >= 90 ? 'text-emerald-600' : summary.overall_score >= 80 ? 'text-amber-600' : 'text-red-600'}`}>
              {summary.overall_score}/100
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-background-100 rounded-full p-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-background-50 text-foreground-950 shadow-sm'
                  : 'text-foreground-600 hover:text-foreground-950'
              }`}
            >
              <i className={`${tab.icon} text-sm`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <StatCard label="Score Global" value={`${summary.overall_score}/100`} sub={`Cible ${summary.overall_target}`} icon="ri-pie-chart-2-line" color="bg-primary-500" trend={summary.trend_30d_score_delta > 0 ? 'up' : 'stable'} />
              {/* <StatCard /> */}
              {/* <StatCard /> */}
              {/* <StatCard /> */}
              {/* <StatCard /> */}
              {/* <StatCard /> */}
            </div>

            {/* Coverage Gauge + Rich Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4">Couverture Schema.org</h3>
                <div className="flex items-center gap-6">
                  <GaugeRing score={summary.schema_coverage_pct} size="lg" />
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1"><span className="text-foreground-600">Pages avec Schema</span><span className="text-foreground-950 font-semibold">{summary.total_pages_with_schema}</span></div>
                      <MiniGauge value={summary.total_pages_with_schema} max={summary.total_pages_scanned} color="bg-emerald-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1"><span className="text-foreground-600">Pages sans Schema</span><span className="text-foreground-950 font-semibold">{summary.total_pages_without_schema}</span></div>
                      <MiniGauge value={summary.total_pages_without_schema} max={summary.total_pages_scanned} color="bg-red-400" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1"><span className="text-foreground-600">Rich Results Actifs</span><span className="text-foreground-950 font-semibold">{summary.rich_results_active}</span></div>
                      <MiniGauge value={summary.rich_results_active} max={summary.rich_results_target} color="bg-amber-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1"><span className="text-foreground-600">Erreurs</span><span className="text-foreground-950 font-semibold">{summary.validation_errors}</span></div>
                      <MiniGauge value={Math.max(0, 50 - summary.validation_errors)} max={50} color="bg-red-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4">Impact Business</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-background-100 rounded-lg p-3">
                      <p className="text-xs text-foreground-600">Impressions Rich Results/mois</p>
                      <p className="text-lg font-bold text-foreground-950">{schemaOrgImpactMetrics.total_rich_results_impressions_monthly.toLocaleString()}</p>
                    </div>
                    <div className="bg-background-100 rounded-lg p-3">
                      <p className="text-xs text-foreground-600">CTR Rich Results</p>
                      <p className="text-lg font-bold text-emerald-600">{schemaOrgImpactMetrics.average_rich_results_ctr}%</p>
                    </div>
                    <div className="bg-background-100 rounded-lg p-3">
                      <p className="text-xs text-foreground-600">Trafic estimé/mois</p>
                      <p className="text-lg font-bold text-foreground-950">{schemaOrgImpactMetrics.estimated_traffic_from_rich_results_monthly.toLocaleString()}</p>
                    </div>
                    <div className="bg-background-100 rounded-lg p-3">
                      <p className="text-xs text-foreground-600">Leads estimés/mois</p>
                      <p className="text-lg font-bold text-foreground-950">{schemaOrgImpactMetrics.estimated_leads_from_rich_results_monthly}</p>
                    </div>
                  </div>
                  <div className="bg-accent-100/80 rounded-lg p-3">
                    <p className="text-xs text-foreground-600">CTR Lift grâce aux Rich Results</p>
                    <p className="text-lg font-bold text-accent-700">{schemaOrgImpactMetrics.ctr_lift_from_rich_results}</p>
                    <p className="text-xs text-foreground-500">vs {schemaOrgImpactMetrics.organic_ctr_without_rich_results}% CTR organique sans rich results</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-3">Actions Recommandées</h3>
              <div className="space-y-2">
                {schemaOrgAuditActions.map(action => (
                  <div key={action.action} className="flex items-center gap-3 p-3 bg-background-100 rounded-lg">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                      action.priority === 'P0' ? 'bg-red-100 text-red-700' :
                      action.priority === 'P1' ? 'bg-amber-100 text-amber-700' :
                      action.priority === 'P2' ? 'bg-secondary-100 text-secondary-700' :
                      'bg-background-200/70 text-foreground-600'
                    }`}>{action.priority}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground-950">{action.action}</p>
                      <p className="text-xs text-foreground-500">{action.effort} · Impact: {action.impact} · {action.kpi}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                      action.status === 'En cours' ? 'bg-emerald-100 text-emerald-700' : 'bg-background-200/70 text-foreground-600'
                    }`}>{action.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: 12 Types Schema */}
        {activeTab === 'types' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm text-foreground-600 mr-2">Filtrer :</p>
              {[
                { id: 'all', label: 'Tous (12)' },
                { id: 'errors', label: 'Avec erreurs' },
                { id: 'rich', label: 'Rich Results' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setTypeFilter(f.id)}
                  className={`text-xs px-3 py-1 rounded-full transition-colors ${
                    typeFilter === f.id ? 'bg-primary-500 text-background-50' : 'bg-background-100 text-foreground-600 hover:text-foreground-950'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-3">
              {filteredTypes.map(type => (
                <div key={type.id} className="bg-background-50 border border-background-200/70 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedType(expandedType === type.id ? null : type.id)}
                    className="w-full p-4 flex items-center gap-4 hover:bg-background-100 transition-colors text-left"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${type.valid ? 'bg-emerald-500' : 'bg-red-500'}`}>
                      <i className={`${type.icon} text-background-50 text-lg`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-foreground-950">{type.name}</h3>
                        {type.rich_result && <span className="text-xs bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 whitespace-nowrap">Rich Result</span>}
                        {!type.valid && <span className="text-xs bg-red-100 text-red-700 rounded-full px-2 py-0.5 whitespace-nowrap">Invalide</span>}
                      </div>
                      <p className="text-xs text-foreground-500 mt-0.5 line-clamp-1">{type.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-foreground-500">{type.pages} page{type.pages > 1 ? 's' : ''}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {type.errors > 0 && <span className="text-xs text-red-600 font-semibold">{type.errors} erreur{type.errors > 1 ? 's' : ''}</span>}
                        {type.warnings > 0 && <span className="text-xs text-amber-600">{type.warnings} warn.</span>}
                        {type.errors === 0 && type.warnings === 0 && <span className="text-xs text-emerald-600">✓ Valide</span>}
                      </div>
                    </div>
                    {expandedType === type.id ? <i className="ri-arrow-up-s-line text-foreground-400" /> : <i className="ri-arrow-down-s-line text-foreground-400" />}
                  </button>
                  {expandedType === type.id && (
                    <div className="px-4 pb-4 border-t border-background-200/70 pt-3 space-y-3">
                      <p className="text-sm text-foreground-700">{type.description}</p>
                      <div>
                        <p className="text-xs font-semibold text-foreground-950 mb-1">Pages :</p>
                        <p className="text-xs text-foreground-600">{type.implemented_on.join(' · ')}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground-950 mb-1">Validation :</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-background-100 rounded p-2">
                            <span className="text-foreground-500">Propriétés requises :</span>
                            <span className="text-foreground-950 ml-1">{type.validation_details.required_properties.join(', ')}</span>
                          </div>
                          <div className="bg-background-100 rounded p-2">
                            <span className="text-foreground-500">Propriétés présentes :</span>
                            <span className="text-foreground-950 ml-1">{type.validation_details.present_properties.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                      {type.validation_details.issues.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-foreground-950 mb-1">Issues ({type.validation_details.issues.length}) :</p>
                          <div className="space-y-1">
                            {type.validation_details.issues.map((issue, i) => (
                              <div key={i} className="flex items-start gap-2 bg-background-100 rounded p-2">
                                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${issue.severity === 'error' ? 'bg-red-500' : 'bg-amber-500'}`} />
                                <div className="min-w-0">
                                  <p className="text-xs text-foreground-700">{issue.page}</p>
                                  <p className="text-xs text-foreground-500">{issue.issue}</p>
                                  <p className="text-xs text-emerald-600 mt-0.5">Fix : {issue.fix}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {type.rich_results_impressions && (
                        <div className="grid grid-cols-4 gap-2">
                          <div className="bg-background-100 rounded p-2 text-center">
                            <p className="text-xs text-foreground-500">Impressions</p>
                            <p className="text-sm font-bold text-foreground-950">{type.rich_results_impressions.toLocaleString()}</p>
                          </div>
                          <div className="bg-background-100 rounded p-2 text-center">
                            <p className="text-xs text-foreground-500">Clics</p>
                            <p className="text-sm font-bold text-foreground-950">{type.rich_results_clicks.toLocaleString()}</p>
                          </div>
                          <div className="bg-background-100 rounded p-2 text-center">
                            <p className="text-xs text-foreground-500">CTR</p>
                            <p className="text-sm font-bold text-emerald-600">{type.rich_results_ctr_pct}%</p>
                          </div>
                          <div className="bg-background-100 rounded p-2 text-center">
                            <p className="text-xs text-foreground-500">Position</p>
                            <p className="text-sm font-bold text-foreground-950">{type.rich_results_avg_position}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Rich Results */}
        {activeTab === 'rich-results' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {schemaOrgRichResultsPerformance.map(rr => (
                <div key={rr.type} className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <i className={`${rr.icon} text-lg text-foreground-800`} />
                    <h3 className="text-sm font-semibold text-foreground-950">{rr.type}</h3>
                    <span className={`text-xs ml-auto ${rr.trend === 'up' ? 'text-emerald-600' : rr.trend === 'down' ? 'text-red-600' : 'text-foreground-500'}`}>
                      {rr.trend === 'up' ? `+${rr.trend_pct}%` : rr.trend === 'down' ? `${rr.trend_pct}%` : 'stable'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground-600">Impressions</span>
                      <span className="text-foreground-950 font-semibold">{rr.impressions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground-600">Clics</span>
                      <span className="text-foreground-950 font-semibold">{rr.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground-600">CTR</span>
                      <span className="text-foreground-950 font-semibold">{rr.ctr_pct}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground-600">Position</span>
                      <span className="text-foreground-950 font-semibold">{rr.avg_position}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground-600">Rich Results</span>
                      <span className="text-foreground-950 font-semibold">{rr.rich_results_active}/{rr.pages_eligible}</span>
                    </div>
                  </div>
                  <MiniGauge value={rr.rich_results_active} max={rr.pages_eligible} color="bg-amber-500" />
                </div>
              ))}
            </div>

            {/* Trends */}
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4">Évolution des Rich Results (6 mois)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-background-200/70">
                      <th className="text-left py-2 text-foreground-600 font-medium">Mois</th>
                      <th className="text-right py-2 text-foreground-600 font-medium">FAQ</th>
                      <th className="text-right py-2 text-foreground-600 font-medium">HowTo</th>
                      <th className="text-right py-2 text-foreground-600 font-medium">Breadcrumb</th>
                      <th className="text-right py-2 text-foreground-600 font-medium">Review</th>
                      <th className="text-right py-2 text-foreground-600 font-medium">Event</th>
                      <th className="text-right py-2 text-foreground-600 font-medium">Video</th>
                      <th className="text-right py-2 text-foreground-600 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schemaOrgRichResultsTrends.map((row, i) => {
                      const total = row.faq + row.howto + row.breadcrumb + row.review + row.event + row.video;
                      return (
                        <tr key={row.month} className="border-b border-background-100">
                          <td className="py-2 text-foreground-950 font-medium">{row.month}</td>
                          <td className="py-2 text-right text-foreground-700">{row.faq}</td>
                          <td className="py-2 text-right text-foreground-700">{row.howto}</td>
                          <td className="py-2 text-right text-foreground-700">{row.breadcrumb}</td>
                          <td className="py-2 text-right text-foreground-700">{row.review}</td>
                          <td className="py-2 text-right text-foreground-700">{row.event}</td>
                          <td className="py-2 text-right text-foreground-700">{row.video}</td>
                          <td className="py-2 text-right text-foreground-950 font-bold">{total}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-xs text-foreground-500">
                Progression : {schemaOrgRichResultsTrends[0].faq + schemaOrgRichResultsTrends[0].howto + schemaOrgRichResultsTrends[0].breadcrumb + schemaOrgRichResultsTrends[0].review + schemaOrgRichResultsTrends[0].event + schemaOrgRichResultsTrends[0].video} → {
                  schemaOrgRichResultsTrends[5].faq + schemaOrgRichResultsTrends[5].howto + schemaOrgRichResultsTrends[5].breadcrumb + schemaOrgRichResultsTrends[5].review + schemaOrgRichResultsTrends[5].event + schemaOrgRichResultsTrends[5].video
                } rich results en 6 mois
              </div>
            </div>
          </div>
        )}

        {/* TAB: Opportunities */}
        {activeTab === 'opportunities' && (
          <div className="space-y-4">
            {schemaOrgMissingOpportunities.map(opp => (
              <div key={opp.id} className="bg-background-50 border border-background-200/70 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedOpportunity(expandedOpportunity === opp.id ? null : opp.id)}
                  className="w-full p-4 flex items-center gap-4 hover:bg-background-100 transition-colors text-left"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${opp.priority === 'done' ? 'bg-emerald-500' : opp.priority === 'high' ? 'bg-red-500' : opp.priority === 'medium' ? 'bg-amber-500' : 'bg-secondary-500'}`}>
                    <i className={`${opp.icon} text-background-50 text-lg`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-foreground-950">{opp.schema}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                        opp.priority === 'high' ? 'bg-red-100 text-red-700' : opp.priority === 'medium' ? 'bg-amber-100 text-amber-700' : opp.priority === 'low' ? 'bg-secondary-100 text-secondary-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>{opp.priority === 'done' ? '✓ Fait' : `Priorité ${opp.priority === 'high' ? 'Haute' : opp.priority === 'medium' ? 'Moyenne' : 'Basse'}`}</span>
                    </div>
                    <p className="text-xs text-foreground-500 mt-0.5">{opp.benefit}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-foreground-500">{opp.pages_eligible} pages</p>
                    <p className="text-xs text-foreground-400">{opp.pages_implemented} implémentées</p>
                  </div>
                  {expandedOpportunity === opp.id ? <i className="ri-arrow-up-s-line text-foreground-400" /> : <i className="ri-arrow-down-s-line text-foreground-400" />}
                </button>
                {expandedOpportunity === opp.id && (
                  <div className="px-4 pb-4 border-t border-background-200/70 pt-3 space-y-3">
                    <p className="text-sm text-foreground-700">{opp.description}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-background-100 rounded p-2"><span className="text-foreground-500">Impact Score : </span><span className="text-foreground-950 font-semibold">{opp.impact_score}/100</span></div>
                      <div className="bg-background-100 rounded p-2"><span className="text-foreground-500">Effort : </span><span className="text-foreground-950">{opp.implementation_effort}</span></div>
                      <div className="bg-background-100 rounded p-2"><span className="text-foreground-500">ROI : </span><span className="text-foreground-950">{opp.roi}</span></div>
                    </div>
                    {opp.implementation_steps.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-foreground-950 mb-1">Étapes d'implémentation :</p>
                        <ol className="list-decimal list-inside space-y-0.5">
                          {opp.implementation_steps.map((step, i) => (
                            <li key={i} className="text-xs text-foreground-700">{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                    <p className="text-xs text-emerald-600 font-semibold">KPI Impact : {opp.kpi_impact}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB: Critical Fixes */}
        {activeTab === 'fixes' && (
          <div className="space-y-4">
            {schemaOrgCriticalFixes.map(fix => (
              <div key={fix.id} className="bg-background-50 border border-background-200/70 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFix(expandedFix === fix.id ? null : fix.id)}
                  className="w-full p-4 flex items-center gap-4 hover:bg-background-100 transition-colors text-left"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${fix.severity === 'error' ? 'bg-red-500' : 'bg-amber-500'}`}>
                    <i className={`${fix.severity === 'error' ? 'ri-close-circle-line' : 'ri-error-warning-line'} text-background-50 text-lg`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-foreground-950">{fix.page_title}</h3>
                      <span className="text-xs text-foreground-400">{fix.page}</span>
                    </div>
                    <p className="text-xs text-foreground-500 mt-0.5">{fix.issue}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${fix.severity === 'error' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                      {fix.severity === 'error' ? 'Erreur' : 'Warning'}
                    </span>
                    <p className="text-xs text-foreground-400 mt-0.5">{fix.effort}</p>
                  </div>
                  {expandedFix === fix.id ? <i className="ri-arrow-up-s-line text-foreground-400" /> : <i className="ri-arrow-down-s-line text-foreground-400" />}
                </button>
                {expandedFix === fix.id && (
                  <div className="px-4 pb-4 border-t border-background-200/70 pt-3 space-y-3">
                    <p className="text-sm text-foreground-700">{fix.description}</p>
                    <div className="bg-background-100 rounded p-3">
                      <p className="text-xs font-semibold text-foreground-950 mb-1">Solution :</p>
                      <p className="text-xs text-emerald-700 font-mono">{fix.fix}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-background-100 rounded p-2"><span className="text-foreground-500">Fichier : </span><span className="text-foreground-950 font-mono text-[11px]">{fix.code_location}</span></div>
                      <div className="bg-background-100 rounded p-2"><span className="text-foreground-500">Impact : </span><span className="text-foreground-950">{fix.impact}</span></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB: Page-Level Audit */}
        {activeTab === 'pages' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {schemaOrgPageLevelAudit.map(page => (
                <div key={page.page_url} className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-foreground-950 truncate">{page.page_title}</h3>
                      <p className="text-xs text-foreground-400 font-mono">{page.page_url}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                      page.validation_status === 'all_valid' ? 'bg-emerald-100 text-emerald-700' :
                      page.validation_status === 'valid' ? 'bg-secondary-100 text-secondary-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {page.validation_status === 'all_valid' ? '✓ Tous Valides' : page.validation_status === 'valid' ? 'Valide' : 'Warnings'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {page.schemas_present.map(s => (
                      <span key={s} className="text-xs bg-emerald-100 text-emerald-700 rounded px-1.5 py-0.5">{s}</span>
                    ))}
                    {page.schemas_missing.map(s => (
                      <span key={s} className="text-xs bg-red-100 text-red-700 rounded px-1.5 py-0.5 line-through">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-foreground-500">
                    <span>Total: {page.total_schemas} schemas</span>
                    <span>Rich Results: {page.rich_results}</span>
                  </div>
                  {page.notes && <p className="text-xs text-foreground-600 mt-1 italic">{page.notes}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KPI Footer */}
        <div className="bg-background-50 border border-background-200/70 rounded-lg p-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
          <div>
            <p className="text-xs text-foreground-500">Score</p>
            <p className="text-lg font-bold text-foreground-950">{summary.overall_score}/100</p>
          </div>
          <div>
            <p className="text-xs text-foreground-500">Types</p>
            <p className="text-lg font-bold text-foreground-950">{summary.total_types_deployed}</p>
          </div>
          <div>
            <p className="text-xs text-foreground-500">Couverture</p>
            <p className="text-lg font-bold text-foreground-950">{summary.schema_coverage_pct}%</p>
          </div>
          <div>
            <p className="text-xs text-foreground-500">Erreurs</p>
            <p className="text-lg font-bold text-red-600">{summary.validation_errors}</p>
          </div>
          <div>
            <p className="text-xs text-foreground-500">Warnings</p>
            <p className="text-lg font-bold text-amber-600">{summary.validation_warnings}</p>
          </div>
          <div>
            <p className="text-xs text-foreground-500">Rich Results</p>
            <p className="text-lg font-bold text-foreground-950">{summary.rich_results_active}</p>
          </div>
          <div>
            <p className="text-xs text-foreground-500">Validation</p>
            <p className="text-lg font-bold text-foreground-950">{summary.schema_validator_passed}%</p>
          </div>
          <div>
            <p className="text-xs text-foreground-500">Impress./mois</p>
            <p className="text-lg font-bold text-foreground-950">{Math.round(schemaOrgImpactMetrics.total_rich_results_impressions_monthly / 1000)}K</p>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}






