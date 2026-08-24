import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { proposalIntelligenceMock, clientHealthMock, reputationAuthorityMock } from '@/mocks/growthIntelligence';

type Tab = 'proposals' | 'clients' | 'reputation';

export default function growthIntelligenceCommandPage() {
  const [activeTab, setActiveTab] = useState<Tab>('proposals');
  const [selectedProposal, setSelectedProposal] = useState(proposalIntelligenceMock[0]);
  const [selectedClient, setSelectedClient] = useState(clientHealthMock[0]);
  const [selectedAsset, setSelectedAsset] = useState(reputationAuthorityMock[0]);

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getWinColor = (pct: number) => {
    if (pct >= 60) return 'text-green-600';
    if (pct >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const fmt = (v: number) => v >= 1e9 ? `${(v / 1e9).toFixed(1)}B FCFA` : `${(v / 1e6).toFixed(0)}M FCFA`;

  const tabs = [
    { id: 'proposals' as Tab, label: 'Proposals', icon: 'ri-file-text-line', count: proposalIntelligenceMock.length },
    { id: 'clients' as Tab, label: 'Client Success', icon: 'ri-user-heart-line', count: clientHealthMock.length },
    { id: 'reputation' as Tab, label: 'Reputation & Authority', icon: 'ri-medal-line', count: reputationAuthorityMock.length },
  ];

  return (
    <hubLayout hubId={20}>
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mb-4">
                <i className="ri-bar-chart-line"></i>
                KOS Enterprise+ — Growth Intelligence
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                Growth Intelligence Command
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Propositions commerciales niveau Big Four, succès client, autorité intellectuelle — le moteur de croissance du cabinet augmenté.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">3</div>
                <div className="text-xs text-foreground-500">BLOCS actifs</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">90-95%</div>
                <div className="text-xs text-foreground-500">Maturité cible</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'}`}>
                <i className={`${tab.icon} text-sm`}></i>{tab.label}
                <span className="text-xs opacity-60">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* BLOC 26 — Proposals */}
        {activeTab === 'proposals' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {proposalIntelligenceMock.map((prop) => (
              <div key={prop.id} onClick={() => setSelectedProposal(prop)} className={`p-5 rounded-lg border cursor-pointer transition-colors ${selectedProposal.id === prop.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700">{prop.standard}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${prop.status === 'submitted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{prop.status}</span>
                </div>
                <h3 className="text-sm font-bold text-foreground-950 mb-1">{prop.proposal_title}</h3>
                <p className="text-xs text-foreground-500 mb-2">{prop.client_name}</p>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="p-2 bg-background-100 rounded text-center">
                    <div className="text-sm font-bold text-foreground-950">{fmt(prop.budget_estimated)}</div>
                    <div className="text-[10px] text-foreground-500">Budget</div>
                  </div>
                  <div className="p-2 bg-background-100 rounded text-center">
                    <div className="text-sm font-bold text-foreground-950">{prop.duration_months} mois</div>
                    <div className="text-[10px] text-foreground-500">Durée</div>
                  </div>
                  <div className="p-2 bg-background-100 rounded text-center">
                    <div className={`text-sm font-bold ${getWinColor(prop.win_probability)}`}>{prop.win_probability}%</div>
                    <div className="text-[10px] text-foreground-500">Win Rate</div>
                  </div>
                </div>
                <p className="text-xs text-foreground-600 line-clamp-2">{prop.methodology}</p>
              </div>
            ))}
          </div>
        )}

        {/* BLOC 27 — Client Success */}
        {activeTab === 'clients' && (
          <div className="space-y-4">
            {clientHealthMock.map((client) => (
              <div key={client.id} onClick={() => setSelectedClient(client)} className={`p-5 rounded-lg border cursor-pointer transition-colors ${selectedClient.id === client.id ? 'border-primary-300 bg-primary-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-sm font-bold text-foreground-950">{client.client_name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${client.engagement_level === 'active' ? 'bg-green-100 text-green-700' : client.engagement_level === 'at_risk' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{client.engagement_level}</span>
                    </div>
                    <p className="text-xs text-foreground-500 mb-2">{client.summary}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-foreground-500">Manager: <strong className="text-foreground-950">{client.account_manager}</strong></span>
                      <span className="text-foreground-500">Dernier contact: <strong className="text-foreground-950">{client.last_contact}</strong></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold text-background-50 ${getHealthColor(client.health_score)}`}>{client.health_score}</div>
                      <div className="text-[10px] text-foreground-500 mt-1">Santé</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground-950">{client.satisfaction_score}</div>
                      <div className="text-[10px] text-foreground-500">Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground-950">{client.renewal_probability}%</div>
                      <div className="text-[10px] text-foreground-500">Renouvellement</div>
                    </div>
                  </div>
                </div>
                {client.risk_signals && client.risk_signals.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-background-200/70 flex flex-wrap gap-2">
                    {client.risk_signals.map((s: string, i: number) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-700 flex items-center gap-1">
                        <i className="ri-error-warning-line text-xs"></i>{s}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <i className="ri-arrow-right-line text-primary-500"></i>
                  <span className="text-primary-600 font-medium">Next: {client.next_action}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BLOC 28 — Reputation & Authority */}
        {activeTab === 'reputation' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {reputationAuthorityMock.map((asset) => (
              <div key={asset.id} onClick={() => setSelectedAsset(asset)} className={`p-5 rounded-lg border cursor-pointer transition-colors ${selectedAsset.id === asset.id ? 'border-accent-300 bg-accent-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700">{asset.asset_type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${asset.status === 'published' ? 'bg-green-100 text-green-700' : asset.status === 'in_progress' ? 'bg-secondary-100 text-secondary-900' : 'bg-yellow-100 text-yellow-700'}`}>{asset.status}</span>
                </div>
                <h3 className="text-sm font-bold text-foreground-950 mb-1">{asset.asset_title}</h3>
                <p className="text-xs text-foreground-500 mb-2">{asset.publication_channel}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-foreground-500">DA Impact</span>
                  <span className="text-sm font-bold text-foreground-950">{asset.domain_authority_impact}/100</span>
                </div>
                <p className="text-xs text-foreground-600 line-clamp-2">{asset.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {(asset.seo_keywords || []).slice(0, 3).map((kw: string, i: number) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{kw}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </hubLayout>
  );
}





