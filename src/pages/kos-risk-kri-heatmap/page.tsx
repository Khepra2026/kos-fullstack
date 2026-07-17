import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { riskKriHeatmap } from '@/mocks/kosRiskKriHeatmap';

export default function KosRiskKriHeatmapPage() {
  const [activeTab, setActiveTab] = useState<'kris' | 'heatmap' | 'plans' | 'history'>('kris');
  const d = riskKriHeatmap;

  const getStatusClass = (status: string) => {
    const map: Record<string, string> = {
      green: 'bg-green-100 text-green-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      red: 'bg-red-100 text-red-800',
      critical: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
      monitored: 'bg-blue-100 text-blue-800',
      improving: 'bg-green-100 text-green-800',
      up: 'bg-green-100 text-green-800',
      stable: 'bg-gray-100 text-gray-700',
      down: 'bg-red-100 text-red-800'
    };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  const tabs = [
    { id: 'kris' as const, label: 'KRIs (20 Indicateurs)', icon: 'ri-bar-chart-line' },
    { id: 'heatmap' as const, label: 'Heatmap Risques', icon: 'ri-grid-line' },
    { id: 'plans' as const, label: 'Plans d\'Atténuation', icon: 'ri-shield-check-line' },
    { id: 'history' as const, label: 'Historique 6 Mois', icon: 'ri-line-chart-line' }
  ];

  const criticalKris = d.kris.filter(k => k.status === 'red');
  const warningKris = d.kris.filter(k => k.status === 'yellow');

  return (
    <KOSHubLayout hubId="kos-risk-kri-heatmap" title={d.title} subtitle={d.subtitle}>
      <div className="space-y-8">
        {/* Score + Alertes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-background-100 rounded-lg p-5">
            <div className="text-xs text-foreground-600 uppercase tracking-wider mb-1">Score Risk Global</div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-foreground-950">{d.globalScore}</span>
              <span className="text-lg text-foreground-500">/100</span>
            </div>
            <div className="text-xs text-foreground-500 mt-1">Cible: {d.targetScore}/100</div>
            <div className="mt-2 w-full bg-background-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${d.globalScore}%` }} />
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-5">
            <div className="text-xs text-red-700 uppercase tracking-wider mb-1">KRIs Critiques</div>
            <div className="text-4xl font-bold text-red-800">{criticalKris.length}</div>
            <div className="text-xs text-red-600 mt-1">Action immédiate requise</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-5">
            <div className="text-xs text-yellow-700 uppercase tracking-wider mb-1">KRIs Sous Surveillance</div>
            <div className="text-4xl font-bold text-yellow-800">{warningKris.length}</div>
            <div className="text-xs text-yellow-600 mt-1">À monitorer</div>
          </div>
          <div className="bg-green-50 rounded-lg p-5">
            <div className="text-xs text-green-700 uppercase tracking-wider mb-1">KRIs Stables</div>
            <div className="text-4xl font-bold text-green-800">{d.kris.filter(k => k.status === 'green').length}</div>
            <div className="text-xs text-green-600 mt-1">Dans les seuils</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 bg-background-100 rounded-full p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-background-50 text-foreground-950 shadow-sm'
                  : 'text-foreground-600 hover:text-foreground-900'
              }`}
            >
              <i className={tab.icon} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'kris' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-200">
                  <th className="text-left py-3 px-3 text-foreground-600 font-medium">ID</th>
                  <th className="text-left py-3 px-3 text-foreground-600 font-medium">KRI</th>
                  <th className="text-left py-3 px-3 text-foreground-600 font-medium">Catégorie</th>
                  <th className="text-center py-3 px-3 text-foreground-600 font-medium">Actuel</th>
                  <th className="text-center py-3 px-3 text-foreground-600 font-medium">Seuil</th>
                  <th className="text-center py-3 px-3 text-foreground-600 font-medium">Cible</th>
                  <th className="text-center py-3 px-3 text-foreground-600 font-medium">Tendance</th>
                  <th className="text-center py-3 px-3 text-foreground-600 font-medium">Statut</th>
                  <th className="text-left py-3 px-3 text-foreground-600 font-medium">Owner</th>
                </tr>
              </thead>
              <tbody>
                {d.kris.map(kri => (
                  <tr key={kri.id} className="border-b border-background-100 hover:bg-background-50/50">
                    <td className="py-2.5 px-3 text-xs font-mono text-foreground-500">{kri.id}</td>
                    <td className="py-2.5 px-3 text-foreground-900 font-medium">{kri.name}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-xs bg-background-200 text-foreground-600">{kri.category}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-semibold text-foreground-950">
                      {kri.current}{kri.unit ? kri.unit : ''}
                    </td>
                    <td className="py-2.5 px-3 text-center text-foreground-500">
                      {kri.threshold}{kri.unit ? kri.unit : ''}
                    </td>
                    <td className="py-2.5 px-3 text-center text-foreground-400">
                      {kri.target}{kri.unit ? kri.unit : ''}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <i className={`${
                        kri.trend === 'up' ? 'ri-arrow-up-line text-green-600' :
                        kri.trend === 'down' ? 'ri-arrow-down-line text-red-600' :
                        'ri-subtract-line text-gray-400'
                      }`} />
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(kri.status)}`}>
                        {kri.status === 'green' ? 'OK' : kri.status === 'yellow' ? 'WARN' : 'CRIT'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-xs text-foreground-500">{kri.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'heatmap' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {d.riskCategories.map((cat, i) => (
                <div key={i} className={`rounded-lg p-4 ${
                  cat.severity === 'critical' || cat.severity === 'high' ? 'bg-red-50' :
                  cat.severity === 'medium' ? 'bg-yellow-50' :
                  'bg-green-50'
                }`}>
                  <div className="text-sm font-semibold text-foreground-950 mb-1">{cat.name}</div>
                  <div className="text-2xl font-bold text-foreground-950">{cat.score}<span className="text-sm text-foreground-400">/100</span></div>
                  <div className="text-xs text-foreground-500 mt-1">{cat.count} risques</div>
                  <div className={`text-xs mt-2 px-2 py-0.5 rounded inline-block ${getStatusClass(cat.status)}`}>
                    {cat.status === 'critical' ? 'CRITIQUE' : cat.status === 'improving' ? 'En progression' : 'Surveillé'}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-background-100 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-grid-line" /> Matrice Probabilité × Impact
              </h3>
              <div className="grid grid-cols-8 gap-1">
                {d.heatmapData.matrix.map((cell, i) => (
                  <div
                    key={i}
                    className={`rounded p-3 text-center text-xs ${
                      cell.value >= 80 ? 'bg-red-200 text-red-900' :
                      cell.value >= 60 ? 'bg-orange-200 text-orange-900' :
                      cell.value >= 40 ? 'bg-yellow-200 text-yellow-900' :
                      cell.value >= 20 ? 'bg-green-100 text-green-900' :
                      'bg-green-50 text-green-800'
                    }`}
                    title={`${cell.x} — ${cell.y}: ${cell.value} (${cell.risk})`}
                  >
                    <div className="font-bold">{cell.value}</div>
                    <div className="truncate">{cell.risk}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 text-xs text-foreground-500">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-100" /> Faible</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-200" /> Moyen</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-200" /> Élevé</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-200" /> Critique</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="space-y-4">
            {d.mitigationPlans.map(plan => (
              <div key={plan.id} className="bg-background-100 rounded-lg p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusClass(plan.severity)}`}>
                        {plan.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-foreground-500">{plan.category}</span>
                      <span className="text-xs text-foreground-400 ml-auto">{plan.budget}</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground-950">{plan.risk}</h3>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-foreground-950">{plan.progress}%</div>
                    <div className="text-xs text-foreground-500">Complété</div>
                  </div>
                </div>
                <div className="w-full bg-background-200 rounded-full h-2 mb-3">
                  <div className={`h-2 rounded-full ${plan.progress >= 70 ? 'bg-green-500' : plan.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${plan.progress}%` }} />
                </div>
                <div className="space-y-1.5 mb-3">
                  {plan.actions.map((action, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-foreground-700">
                      <i className="ri-checkbox-circle-line text-green-600" />
                      {action}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-foreground-500">
                  <span><i className="ri-calendar-line mr-1" />{plan.deadline}</span>
                  <span><i className="ri-user-line mr-1" />{plan.owner}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-background-100 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2">
              <i className="ri-line-chart-line" /> Évolution des Scores — 6 Derniers Mois
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-background-200">
                    <th className="text-left py-2 px-3 text-foreground-600 font-medium">Domaine</th>
                    {d.kriHistory.labels.map((l, i) => (
                      <th key={i} className="text-center py-2 px-3 text-foreground-600 font-medium">{l}</th>
                    ))}
                    <th className="text-center py-2 px-3 text-foreground-600 font-medium">Tendance</th>
                  </tr>
                </thead>
                <tbody>
                  {d.kriHistory.datasets.map((ds, i) => (
                    <tr key={i} className="border-b border-background-100">
                      <td className="py-2.5 px-3 font-medium text-foreground-900">{ds.name}</td>
                      {ds.data.map((val, j) => (
                        <td key={j} className="py-2.5 px-3 text-center">
                          <span className={`font-semibold ${
                            val >= 90 ? 'text-green-700' :
                            val >= 80 ? 'text-yellow-700' :
                            'text-red-700'
                          }`}>{val}</span>
                        </td>
                      ))}
                      <td className="py-2.5 px-3 text-center">
                        <i className={`${ds.data[0] < ds.data[ds.data.length - 1] ? 'ri-arrow-up-line text-green-600' : 'ri-subtract-line text-gray-400'}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </KOSHubLayout>
  );
}