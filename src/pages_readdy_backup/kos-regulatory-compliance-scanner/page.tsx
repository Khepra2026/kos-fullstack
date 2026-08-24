import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useRegulatoryComplianceScanner } from '@/hooks/useRegulatoryComplianceScanner';

function ScoreGauge({ score, size }: { score: number; size?: 'sm' | 'md' }) {
  const s = size === 'sm' ? 40 : 56;
  const strokeW = size === 'sm' ? 4 : 5;
  const r = (s - strokeW) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const color = score >= 90 ? '#10b981' : score >= 80 ? '#f59e0b' : '#ef4444';
  return (
    <div className="flex items-center justify-center" style={{ width: s, height: s }}>
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <circle cx={s/2} cy={s/2} r={r} fill="none" stroke="oklch(var(--background-200))" strokeWidth={strokeW} />
        <circle cx={s/2} cy={s/2} r={r} fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} transform={`rotate(-90 ${s/2} ${s/2})`} style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
        <text x={s/2} y={s/2} textAnchor="middle" dy="0.35em" className="fill-foreground-950 font-bold" style={{ fontSize: size === 'sm' ? 10 : 13 }}>{score}</text>
      </svg>
    </div>
  );
}

export default function regulatoryComplianceScannerPage() {
  const { data, complianceAlerts, complianceCoverage, complianceDashboardKPIs } = useRegulatoryComplianceScanner();
  const [activeTab, setActiveTab] = useState('overview');

  if (!data || !complianceDashboardKPIs) return null;

  const tabs = [
    { key: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-3-line' },
    { key: 'referentials', label: '15 Référentiels', icon: 'ri-file-text-line' },
    { key: 'coverage', label: 'Couverture Domaines', icon: 'ri-pie-chart-2-line' },
    { key: 'alerts', label: `Alertes (${complianceAlerts.length})`, icon: 'ri-alert-line' },
  ];

  return (
    <hubLayout hubId={89}>
      <div className="min-h-screen bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 whitespace-nowrap">CONFORMITÉ RÉGLEMENTAIRE TOTALE™</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 whitespace-nowrap">Score {complianceDashboardKPIs.globalScore}/100</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground-950 font-heading">Scanner Conformité Réglementaire 120%</h1>
            <p className="text-foreground-600 mt-2 max-w-2xl">Couverture exhaustive des 15 référentiels réglementaires. {complianceDashboardKPIs.textesCouverts} textes vérifiés. Scan automatique quotidien. Zéro tolérance non-conformité.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {[
              { label: 'Score Global', value: `${complianceDashboardKPIs.globalScore}/100` },
              { label: 'Textes Vérifiés', value: complianceDashboardKPIs.textesCouverts },
              { label: 'Référentiels', value: complianceDashboardKPIs.referentielsConformes },
              { label: 'Gaps Critiques', value: complianceDashboardKPIs.gapsCritiques },
              { label: 'Alertes', value: complianceDashboardKPIs.alertesActives },
              { label: 'Prochain Scan', value: '25 Juin 06:00' },
            ].map((k) => (
              <div key={k.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
                <div className="text-xs text-foreground-500 mb-1">{k.label}</div>
                <div className="text-lg font-bold text-foreground-950">{k.value}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1 mb-6 bg-background-100 rounded-full p-1">
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${activeTab === tab.key ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-600 hover:text-foreground-900'}`}>
                <i className={tab.icon} />{tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {data.referentiels.map((ref) => (
                <div key={ref.id} className={`bg-background-50 border rounded-lg p-4 ${ref.status === 'attention' ? 'border-red-200 bg-red-50/30' : ref.status === 'surveillance' ? 'border-amber-200 bg-amber-50/30' : 'border-background-200/70'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-foreground-500 uppercase">{ref.id.split('-')[0]}</span>
                    <ScoreGauge score={ref.score} size="sm" />
                  </div>
                  <div className="font-semibold text-foreground-950 text-sm mb-1">{ref.name}</div>
                  <div className="text-xs text-foreground-500">{ref.region} · {ref.textes} textes</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'referentials' && (
            <div className="space-y-3">
              {data.referentiels.map((ref) => (
                <div key={ref.id} className="bg-background-50 border border-background-200/70 rounded-xl p-5 flex items-center gap-4">
                  <ScoreGauge score={ref.score} />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground-950">{ref.name}</div>
                    <div className="text-sm text-foreground-500">{ref.region} · {ref.textes} textes · Dernier scan {ref.lastScan}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {ref.issues > 0 && <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap">{ref.issues} issues</span>}
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${ref.status === 'conforme' ? 'bg-emerald-100 text-emerald-700' : ref.status === 'surveillance' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{ref.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'coverage' && (
            <div className="space-y-3">
              {complianceCoverage.map((d) => (
                <div key={d.domain} className="bg-background-50 border border-background-200/70 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold text-foreground-950 text-sm">{d.domain}</div>
                      <div className="text-xs text-foreground-500">{d.textes} textes · {d.gaps} gaps</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${d.status === 'optimal' ? 'bg-emerald-100 text-emerald-700' : d.status === 'stable' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{d.status}</span>
                      <span className="font-bold text-foreground-950">{d.coverage}%</span>
                    </div>
                  </div>
                  <div className="bg-background-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${d.coverage >= 95 ? 'bg-emerald-500' : d.coverage >= 85 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${d.coverage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-3">
              {complianceAlerts.map((alert) => (
                <div key={alert.id} className={`border rounded-xl p-4 ${alert.severite === 'haute' ? 'border-red-200 bg-red-50' : alert.severite === 'moyenne' ? 'border-amber-200 bg-amber-50' : 'border-blue-100 bg-blue-50'}`}>
                  <div className="flex items-start gap-3">
                    <i className={`text-lg ${alert.severite === 'haute' ? 'ri-error-warning-fill text-red-500' : alert.severite === 'moyenne' ? 'ri-alert-fill text-amber-500' : 'ri-information-fill text-blue-500'}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-foreground-500">{alert.id}</span>
                        <span className="text-xs text-foreground-500">·</span>
                        <span className="text-xs font-medium text-foreground-600">{alert.referentiel}</span>
                        <span className={`text-xs font-bold uppercase ${alert.severite === 'haute' ? 'text-red-600' : 'text-amber-600'}`}>{alert.severite}</span>
                      </div>
                      <p className="text-sm text-foreground-800 font-medium">{alert.message}</p>
                      <p className="text-sm text-foreground-600 mt-1">{alert.action}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${alert.status === 'en_cours' ? 'bg-amber-100 text-amber-700' : 'bg-background-200 text-foreground-500'}`}>{alert.status === 'en_cours' ? 'En cours' : alert.status === 'surveillance' ? 'Surveillance' : 'En attente'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </hubLayout>
  );
}



