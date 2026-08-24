import { useState } from 'react';
import { regulatoryWatchStatus, monitoredRegulators, activeRegulatoryAlerts, ragAutoUpdateLog, regulatoryCoverageMatrix } from '@/mocks/autonomousRegulatoryWatch';
import ScrollReveal from '@/components/feature/ScrollReveal';

const tabs = ['Alertes Actives', 'Régulateurs', 'Couverture', 'RAG Auto-Update'];

export default function autonomousRegulatoryWatchPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const severityColor = (s: string) => {
    if (s === 'critical') return 'bg-red-100 text-red-700';
    if (s === 'high') return 'bg-secondary-100 text-secondary-700';
    return 'bg-background-200 text-foreground-600';
  };

  return (
    <div className="min-h-screen bg-background-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        <ScrollReveal>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                <i className="ri-radar-line text-accent-600 text-xl"></i>
              </div>
              <span className="text-xs font-semibold tracking-wide uppercase text-accent-600 bg-accent-100 px-3 py-1 rounded-full">Hub 96</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950 mb-2">KOS Autonomous Regulatory Watch<span className="text-accent-500">™</span></h1>
            <p className="text-foreground-600 text-base max-w-3xl">Veille réglementaire 100% autonome — 47 sources monitorées, scan toutes les 15 minutes, 3 847 textes traqués, couverture 99.2%, 0 faux positif.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Sources Monitorées', value: regulatoryWatchStatus.monitoredSources, icon: 'ri-eye-line', color: 'bg-accent-100 text-accent-600' },
            { label: 'Textes Traqués', value: regulatoryWatchStatus.totalTextsTracked.toLocaleString(), icon: 'ri-file-text-line', color: 'bg-primary-100 text-primary-600' },
            { label: 'Couverture', value: `${regulatoryWatchStatus.coverageRate}%`, icon: 'ri-checkbox-circle-line', color: 'bg-secondary-100 text-secondary-600' },
            { label: 'Alertes Actives', value: regulatoryWatchStatus.activeAlerts, icon: 'ri-alert-line', color: 'bg-red-100 text-red-600' },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <div className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                <div className={`w-8 h-8 rounded-md ${stat.color} flex items-center justify-center mb-2`}>
                  <i className={`${stat.icon} text-sm`}></i>
                </div>
                <div className="text-2xl font-bold text-foreground-950">{stat.value}</div>
                <div className="text-xs text-foreground-600">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-4 p-3 bg-accent-50 border border-accent-200 rounded-lg">
          <i className="ri-timer-line text-accent-600 text-lg"></i>
          <div>
            <div className="text-sm font-semibold text-foreground-950">Dernier scan : {regulatoryWatchStatus.lastScan}</div>
            <div className="text-xs text-foreground-600">Fréquence : {regulatoryWatchStatus.scanFrequency} | Nouveaux textes ce mois : {regulatoryWatchStatus.newTextsThisMonth}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 p-1 bg-background-100 rounded-full mb-6 w-fit">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${activeTab === tab ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-600 hover:text-foreground-900'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Alertes Actives' && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground-950 mb-2">{activeRegulatoryAlerts.length} alertes — {activeRegulatoryAlerts.filter(a => a.severity === 'critical').length} critiques</h3>
            {activeRegulatoryAlerts.map(alert => (
              <div key={alert.id} className={`bg-background-50 border rounded-lg p-4 ${alert.severity === 'critical' ? 'border-red-200' : alert.severity === 'high' ? 'border-secondary-200' : 'border-background-200/70'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${severityColor(alert.severity)}`}>{alert.severity.toUpperCase()}</span>
                    <span className="text-xs text-foreground-500 bg-background-100 px-2 py-0.5 rounded">{alert.regulator}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${alert.status === 'resolved' ? 'bg-accent-100 text-accent-700' : alert.status === 'in_progress' ? 'bg-secondary-100 text-secondary-700' : 'bg-background-200 text-foreground-600'}`}>{alert.status === 'resolved' ? 'Résolue' : alert.status === 'in_progress' ? 'En cours' : alert.status === 'analyzing' ? 'Analyse' : 'Surveillance'}</span>
                  </div>
                  <span className="text-xs text-foreground-500">{alert.date}</span>
                </div>
                <div className="text-sm font-semibold text-foreground-950 mb-1">{alert.title}</div>
                <div className="text-xs text-foreground-600 mb-2">Impact : {alert.impact} | {alert.affectedClients} clients affectés</div>
                <div className="text-xs text-accent-600 font-medium bg-accent-50 px-3 py-1.5 rounded"><i className="ri-robot-2-line mr-1"></i>{alert.autoAction}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Régulateurs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {monitoredRegulators.map(reg => (
              <div key={reg.name} className="bg-background-50 border border-background-200/70 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-foreground-950 text-lg">{reg.name}</span>
                  <span className="text-xs font-semibold text-accent-600 bg-accent-100 px-2 py-0.5 rounded">{reg.complianceRate}% conforme</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div><span className="text-foreground-500">Textes</span><br/><span className="font-semibold text-foreground-900">{reg.texts}</span></div>
                  <div><span className="text-foreground-500">Nouveaux</span><br/><span className="font-semibold text-accent-600">+{reg.newThisMonth} ce mois</span></div>
                  <div><span className="text-foreground-500">Alertes</span><br/><span className="font-semibold text-red-600">{reg.alerts} actives</span></div>
                  <div><span className="text-foreground-500">Dernière MAJ</span><br/><span className="font-semibold text-foreground-900">{reg.lastUpdate}</span></div>
                </div>
                <div className="h-2 bg-background-200 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-500 rounded-full" style={{ width: `${reg.complianceRate}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Couverture' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-200">
                  <th className="text-left p-3 text-foreground-600 font-medium">Catégorie</th>
                  <th className="text-center p-3 text-foreground-600 font-medium">BCEAO</th>
                  <th className="text-center p-3 text-foreground-600 font-medium">COBAC</th>
                  <th className="text-center p-3 text-foreground-600 font-medium">GAFI</th>
                  <th className="text-center p-3 text-foreground-600 font-medium">OHADA</th>
                  <th className="text-center p-3 text-foreground-600 font-medium">UEMOA</th>
                  <th className="text-center p-3 text-foreground-600 font-medium">CEMAC</th>
                </tr>
              </thead>
              <tbody>
                {regulatoryCoverageMatrix.map(row => (
                  <tr key={row.category} className="border-b border-background-100 hover:bg-background-50">
                    <td className="p-3 font-semibold text-foreground-900">{row.category}</td>
                    {[row.bceao, row.cobac, row.gafi, row.ohada, row.uemoa, row.cemac].map((val, i) => (
                      <td key={i} className="p-3 text-center">
                        <span className={`font-bold ${val >= 95 ? 'text-accent-600' : val >= 90 ? 'text-secondary-600' : val >= 85 ? 'text-yellow-600' : 'text-red-600'}`}>{val}%</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'RAG Auto-Update' && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground-950 mb-2">Journal Mise à Jour Automatique RAG</h3>
            {ragAutoUpdateLog.map((log, i) => (
              <div key={i} className="bg-background-50 border border-background-200/70 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-foreground-950">{log.action}</div>
                  <div className="text-xs text-foreground-500">{log.date}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-xs">
                    <div className="text-foreground-500">Documents</div>
                    <div className="font-bold text-foreground-900">{log.documents}</div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="text-foreground-500">Embeddings</div>
                    <div className="font-bold text-foreground-900">{log.embeddings}</div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${log.status === 'success' ? 'text-accent-600 bg-accent-100' : 'text-foreground-500 bg-background-200'}`}>{log.status === 'success' ? 'OK' : 'N/C'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}





