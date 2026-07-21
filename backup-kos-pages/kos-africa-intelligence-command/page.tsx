import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useAfricaIntelligenceCommand } from '@/hooks/useAfricaIntelligenceCommand';

const TABS = [
  { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-map-2-line' },
  { id: 'countries', label: '54 Pays', icon: 'ri-map-pin-line' },
  { id: 'alerts', label: 'Alertes Sectorielles', icon: 'ri-alarm-warning-line' },
  { id: 'regulators', label: 'Cross-Régulateurs', icon: 'ri-government-line' },
  { id: 'analysis', label: 'Analyse Big Four', icon: 'ri-bar-chart-box-line' },
];

const SEVERITY_BADGE: Record<string, string> = {
  critical: 'bg-red-500 text-white',
  high: 'bg-orange-500 text-white',
  medium: 'bg-amber-100 text-amber-800',
  low: 'bg-background-200 text-foreground-600',
};

const SEVERITY_LABEL: Record<string, string> = {
  critical: 'Critique',
  high: 'Haute',
  medium: 'Moyenne',
  low: 'Faible',
};

const PRESENCE_BADGE: Record<string, string> = {
  strong: 'bg-emerald-100 text-emerald-800',
  growing: 'bg-primary-100 text-primary-800',
  monitoring: 'bg-amber-100 text-amber-800',
  none: 'bg-background-100 text-foreground-400',
};

const PRESENCE_LABEL: Record<string, string> = {
  strong: '🟢 Forte',
  growing: '📈 Croissance',
  monitoring: '👁 Surveillance',
  none: '— Absent',
};

const RISK_BADGE: Record<string, string> = {
  low: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
};

function ScoreBar({ value, max = 100, color = 'bg-primary-500' }: { value: number; max?: number; color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-background-100 rounded-full h-2">
        <div className={`${color} h-2 rounded-full`} style={{ width: `${(value / max) * 100}%` }}></div>
      </div>
      <span className="text-xs font-semibold w-7 text-right">{value}</span>
    </div>
  );
}

export default function africaIntelligenceCommandPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const {
    overview, kpis, countries, allCountries, alerts, allAlerts, crossAnalyses,
    regionStats, sectors, selectedCountryProfile, selectedRegion, setSelectedRegion,
    selectedSector, setSelectedSector, selectedSeverity, setSelectedSeverity,
    selectedCountry, setSelectedCountry, dataSource, loading, refresh,
  } = useAfricaIntelligenceCommand();

  return (
    <hubLayout hubId={125}>
      {/* Header */}
      <div className="bg-background-100 border-b border-background-200/70 px-6 py-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-500 text-white">
              <i className="ri-globe-line text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground-950 font-heading">
                KOS Africa Intelligence Command™
              </h1>
              <p className="text-sm text-foreground-600">Hub cross-régulateurs · Scoring conformité par pays · Alertes prioritisées par secteur · 54 pays</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${dataSource === 'live' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              <i className={`ri-${dataSource === 'live' ? 'wifi-line' : 'database-line'} mr-1`}></i>
              {dataSource === 'live' ? 'LIVE DB' : 'MOCK'}
            </span>
            <button onClick={refresh} className="px-3 py-1 rounded-lg text-xs bg-white border border-background-200 text-foreground-600 cursor-pointer hover:bg-background-50">
              <i className="ri-refresh-line mr-1"></i>Actualiser
            </button>
          </div>
        </div>

        {/* KPI Bar */}
        <div className="grid grid-cols-6 gap-3 mt-4">
          {kpis.map(k => (
            <div key={k.label} className="bg-white rounded-lg p-3 border border-background-200/70">
              <div className="flex items-center gap-1.5 mb-1">
                <i className={`${k.icon} text-sm text-${k.color}-500`}></i>
                <span className="text-xs text-foreground-400 truncate">{k.label}</span>
              </div>
              <div className="text-lg font-bold text-foreground-950">{k.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-background-200/70 px-6">
        <div className="flex gap-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === tab.id ? 'border-accent-500 text-accent-700' : 'border-transparent text-foreground-500 hover:text-foreground-700'}`}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* ======== OVERVIEW ======== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Region Stats */}
            <div className="grid grid-cols-4 gap-4">
              {regionStats.map(r => (
                <div key={r.region} className="bg-white rounded-xl border border-background-200/70 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground-900">{r.region}</h3>
                    <span className="text-xs text-foreground-400">{r.count} pays</span>
                  </div>
                  <div className="text-3xl font-bold text-accent-600 mb-1">{r.avgScore}</div>
                  <div className="text-xs text-foreground-500 mb-3">Score conformité moyen /100</div>
                  <div className="space-y-1 text-xs text-foreground-500">
                    <div className="flex justify-between">
                      <span>Présence KHEPRA</span>
                      <span className="font-semibold text-primary-600">{r.khepraActive}/{r.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Alertes critiques</span>
                      <span className={`font-semibold ${r.criticalCount > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{r.criticalCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Critical Alerts Preview */}
            <div>
              <h3 className="text-base font-semibold text-foreground-900 mb-3">
                <i className="ri-alarm-warning-line mr-2 text-red-500"></i>
                Alertes Critiques & Haute Priorité
              </h3>
              <div className="space-y-3">
                {allAlerts.filter(a => a.severity === 'critical' || a.severity === 'high').slice(0, 6).map(alert => (
                  <div key={alert.id} className={`rounded-lg border p-4 ${alert.severity === 'critical' ? 'border-red-200 bg-red-50' : 'border-orange-200 bg-orange-50'}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${SEVERITY_BADGE[alert.severity]}`}>{SEVERITY_LABEL[alert.severity]}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-600 font-medium">{alert.regulatorAcronym}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{alert.sector}</span>
                          {alert.isNew && <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500 text-white">NOUVEAU</span>}
                        </div>
                        <h4 className="font-semibold text-foreground-900 text-sm">{alert.alertTitle}</h4>
                        <p className="text-xs text-foreground-600 mt-1 line-clamp-2">{alert.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        {alert.complianceDeadlineDays !== null ? (
                          <>
                            <div className={`text-xl font-bold ${alert.complianceDeadlineDays < 90 ? 'text-red-600' : 'text-amber-600'}`}>{alert.complianceDeadlineDays}j</div>
                            <div className="text-xs text-foreground-400">deadline</div>
                          </>
                        ) : (
                          <span className="text-xs text-foreground-400">Immédiat</span>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 p-2 bg-white/70 rounded-lg text-xs text-emerald-700">
                      <i className="ri-briefcase-line mr-1"></i>
                      <strong>Action KHEPRA :</strong> {alert.khepraAction} · <strong>{alert.estimatedRevenueImpact}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Countries by Opportunity */}
            <div>
              <h3 className="text-base font-semibold text-foreground-900 mb-3">
                <i className="ri-medal-line mr-2 text-accent-500"></i>
                Pays Clés — Présence &amp; Opportunités KHEPRA
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {allCountries.filter(c => c.khepraPresence !== 'none').slice(0, 8).map(c => (
                  <div key={c.id} className="bg-white rounded-lg border border-background-200/70 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground-900">{c.countryName}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${PRESENCE_BADGE[c.khepraPresence]}`}>{PRESENCE_LABEL[c.khepraPresence]}</span>
                        </div>
                        <div className="text-xs text-foreground-400">{c.region} · {c.regulators.join(', ')}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-accent-600">{c.overallScore}</div>
                        <div className="text-xs text-foreground-400">/100</div>
                      </div>
                    </div>
                    <div className="text-xs text-foreground-600 bg-background-50 rounded px-2 py-1 mb-2">
                      <i className="ri-lightbulb-line mr-1 text-amber-500"></i>{c.keyOpportunity}
                    </div>
                    <div className="flex gap-3 text-xs text-foreground-500">
                      <span><i className="ri-briefcase-line mr-1"></i>{c.activeMissions} missions actives</span>
                      <span><i className="ri-alarm-warning-line mr-1"></i>{c.activeAlerts} alertes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======== 54 PAYS ======== */}
        {activeTab === 'countries' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <div className="flex rounded-lg border border-background-200 overflow-hidden">
                {['all', 'UEMOA', 'CEMAC', 'OHADA', 'Other'].map(r => (
                  <button
                    key={r}
                    onClick={() => setSelectedRegion(r)}
                    className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${selectedRegion === r ? 'bg-accent-500 text-white' : 'bg-white text-foreground-600 hover:bg-background-100'}`}
                  >
                    {r === 'all' ? 'Tous' : r}
                  </button>
                ))}
              </div>
              <span className="text-sm text-foreground-500 self-center">{countries.length} pays</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {countries.map(c => (
                <div
                  key={c.id}
                  className={`bg-white rounded-xl border cursor-pointer transition-all ${selectedCountry === c.id ? 'border-accent-300 shadow-sm' : 'border-background-200/70 hover:border-background-300'}`}
                  onClick={() => setSelectedCountry(selectedCountry === c.id ? null : c.id)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-background-100 text-foreground-500 flex-shrink-0 font-bold text-xs">
                          {c.countryCode}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground-900">{c.countryName}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${RISK_BADGE[c.riskLevel]}`}>{c.riskLevel}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${PRESENCE_BADGE[c.khepraPresence]}`}>{PRESENCE_LABEL[c.khepraPresence]}</span>
                          </div>
                          <div className="text-xs text-foreground-400">{c.region} · {c.regulators.join(' · ')}</div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className={`text-2xl font-bold ${c.overallScore >= 80 ? 'text-emerald-600' : c.overallScore >= 65 ? 'text-amber-600' : 'text-red-600'}`}>{c.overallScore}</div>
                        <div className="text-xs text-foreground-400">score global</div>
                      </div>
                    </div>

                    {selectedCountry === c.id && (
                      <div className="mt-4 space-y-3 border-t border-background-100 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="text-xs font-semibold text-foreground-500 mb-2">SCORES DÉTAILLÉS</div>
                            {[
                              { label: 'Cadre Réglementaire', val: c.regulatoryFrameworkScore, color: 'bg-primary-500' },
                              { label: 'LBC/FT', val: c.amlCftScore, color: 'bg-red-400' },
                              { label: 'Gouvernance', val: c.governanceScore, color: 'bg-accent-500' },
                              { label: 'Finance Digitale', val: c.digitalFinanceScore, color: 'bg-secondary-500' },
                              { label: 'ESG', val: c.esgScore, color: 'bg-emerald-500' },
                            ].map(s => (
                              <div key={s.label}>
                                <div className="flex justify-between text-xs text-foreground-500 mb-1">
                                  <span>{s.label}</span>
                                  <span className="font-semibold">{s.val}/100</span>
                                </div>
                                <ScoreBar value={s.val} color={s.color} />
                              </div>
                            ))}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-foreground-500 mb-2">DONNÉES MACRO</div>
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between bg-background-50 rounded px-2 py-1.5">
                                <span className="text-foreground-500">PIB</span>
                                <span className="font-semibold">{c.gdpBillionUSD} Md$</span>
                              </div>
                              <div className="flex justify-between bg-background-50 rounded px-2 py-1.5">
                                <span className="text-foreground-500">Taux bancarisation</span>
                                <span className="font-semibold">{c.bankingPenetration}%</span>
                              </div>
                              <div className="flex justify-between bg-background-50 rounded px-2 py-1.5">
                                <span className="text-foreground-500">Missions actives</span>
                                <span className="font-semibold text-primary-600">{c.activeMissions}</span>
                              </div>
                              <div className="flex justify-between bg-background-50 rounded px-2 py-1.5">
                                <span className="text-foreground-500">Alertes actives</span>
                                <span className={`font-semibold ${c.activeAlerts > 5 ? 'text-red-600' : 'text-amber-600'}`}>{c.activeAlerts}</span>
                              </div>
                            </div>
                            <div className="mt-3 p-2 bg-emerald-50 rounded-lg text-xs text-emerald-700">
                              <i className="ri-lightbulb-line mr-1"></i><strong>Opportunité :</strong> {c.keyOpportunity}
                            </div>
                            {c.criticalGap && (
                              <div className="mt-2 p-2 bg-red-50 rounded-lg text-xs text-red-700">
                                <i className="ri-alert-line mr-1"></i><strong>Gap critique :</strong> {c.criticalGap}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======== ALERTES SECTORIELLES ======== */}
        {activeTab === 'alerts' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <div className="flex rounded-lg border border-background-200 overflow-hidden">
                {['all', 'critical', 'high', 'medium', 'low'].map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSeverity(s)}
                    className={`px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${selectedSeverity === s ? 'bg-accent-500 text-white' : 'bg-white text-foreground-600 hover:bg-background-100'}`}
                  >
                    {s === 'all' ? 'Toutes' : SEVERITY_LABEL[s]}
                  </button>
                ))}
              </div>
              <span className="text-sm text-foreground-500 self-center">{alerts.length} alerte(s)</span>
            </div>

            <div className="space-y-4">
              {alerts.map(alert => (
                <div key={alert.id} className="bg-white rounded-xl border border-background-200/70 overflow-hidden">
                  <div className={`px-4 py-2 flex items-center gap-2 ${alert.severity === 'critical' ? 'bg-red-50 border-b border-red-100' : alert.severity === 'high' ? 'bg-orange-50 border-b border-orange-100' : 'bg-background-50 border-b border-background-200'}`}>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${SEVERITY_BADGE[alert.severity]}`}>{SEVERITY_LABEL[alert.severity]}</span>
                    <span className="text-xs font-mono text-foreground-400">{alert.alertId}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white text-foreground-600 border border-background-200">{alert.regulatorAcronym}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white text-foreground-600 border border-background-200">{alert.sector}</span>
                    {alert.isNew && <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-primary-500 text-white">NOUVEAU</span>}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground-900 mb-1">{alert.alertTitle}</h4>
                        <p className="text-sm text-foreground-600">{alert.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        {alert.complianceDeadlineDays !== null ? (
                          <div>
                            <div className={`text-2xl font-bold ${alert.complianceDeadlineDays < 90 ? 'text-red-600' : alert.complianceDeadlineDays < 365 ? 'text-amber-600' : 'text-foreground-600'}`}>
                              {alert.complianceDeadlineDays}j
                            </div>
                            <div className="text-xs text-foreground-400">deadline</div>
                          </div>
                        ) : (
                          <span className="text-xs bg-background-100 px-2 py-1 rounded text-foreground-500">Pas de deadline</span>
                        )}
                      </div>
                    </div>
                    {alert.countries.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {alert.countries.map(c => <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{c}</span>)}
                      </div>
                    )}
                    <div className="bg-emerald-50 rounded-lg p-3 text-sm text-emerald-800 border border-emerald-100">
                      <i className="ri-briefcase-4-line mr-2"></i>
                      <strong>Action KHEPRA :</strong> {alert.khepraAction}
                      <span className="ml-2 font-semibold text-emerald-700">— {alert.estimatedRevenueImpact}</span>
                    </div>
                    <div className="mt-2 text-xs text-foreground-400">
                      <i className="ri-calendar-line mr-1"></i>Publié le {alert.publishedDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======== CROSS-REGULATORS ======== */}
        {activeTab === 'regulators' && (
          <div className="space-y-4">
            <p className="text-sm text-foreground-600">Analyse des synergies et conflits entre régulateurs — Opportunités d'arbitrage pour les clients panafricains.</p>
            <div className="space-y-4">
              {crossAnalyses.map(ca => (
                <div key={ca.regulatorPair} className="bg-white rounded-xl border border-background-200/70 p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground-900 text-base">{ca.regulatorPair}</h3>
                      <div className="text-xs text-foreground-400 mt-0.5">{ca.jurisdiction1} · {ca.jurisdiction2}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${ca.harmonyScore >= 75 ? 'text-emerald-600' : ca.harmonyScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{ca.harmonyScore}/100</div>
                      <div className="text-xs text-foreground-400">score harmonisation</div>
                    </div>
                  </div>
                  <div className="bg-background-100 rounded-full h-2 mb-4">
                    <div
                      className={`h-2 rounded-full ${ca.harmonyScore >= 75 ? 'bg-emerald-500' : ca.harmonyScore >= 60 ? 'bg-amber-400' : 'bg-red-400'}`}
                      style={{ width: `${ca.harmonyScore}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs font-semibold text-red-600 mb-2">ZONES DE CONFLIT</div>
                      <div className="space-y-1">
                        {ca.conflictAreas.map(c => (
                          <div key={c} className="flex items-start gap-2 text-xs text-red-700 bg-red-50 rounded px-2 py-1">
                            <i className="ri-close-circle-line flex-shrink-0 mt-0.5"></i>{c}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-emerald-600 mb-2">ZONES DE SYNERGIE</div>
                      <div className="space-y-1">
                        {ca.synergyAreas.map(s => (
                          <div key={s} className="flex items-start gap-2 text-xs text-emerald-700 bg-emerald-50 rounded px-2 py-1">
                            <i className="ri-check-line flex-shrink-0 mt-0.5"></i>{s}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {ca.arbitrageOpportunity && (
                    <div className="mt-3 p-3 bg-accent-50 rounded-lg text-sm text-accent-800 border border-accent-100">
                      <i className="ri-scales-line mr-2"></i>
                      <strong>Opportunité d'arbitrage :</strong> {ca.arbitrageOpportunity}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======== ANALYSE BIG FOUR ======== */}
        {activeTab === 'analysis' && (
          <div className="space-y-6">
            <p className="text-sm text-foreground-600">Intelligence stratégique — Positionnement KHEPRA EXPERTS sur les 54 pays africains face aux Big Four.</p>

            {/* KHEPRA vs Big Four */}
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-6">
              <h3 className="font-semibold text-foreground-900 mb-4">Comparaison Positionnement — KHEPRA vs Big Four Afrique Francophone</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-background-200">
                      <th className="text-left py-2 pr-4 text-xs font-semibold text-foreground-500">Dimension</th>
                      <th className="text-center py-2 px-3 text-xs font-semibold text-primary-700 bg-primary-50 rounded">KHEPRA</th>
                      <th className="text-center py-2 px-3 text-xs font-semibold text-foreground-400">Deloitte</th>
                      <th className="text-center py-2 px-3 text-xs font-semibold text-foreground-400">PwC</th>
                      <th className="text-center py-2 px-3 text-xs font-semibold text-foreground-400">EY</th>
                      <th className="text-center py-2 px-3 text-xs font-semibold text-foreground-400">KPMG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { dim: 'Expertise BCEAO/COBAC/OHADA', khepra: 98, d: 72, p: 68, e: 70, k: 74 },
                      { dim: 'Couverture Afrique Francophone', khepra: 95, d: 65, p: 62, e: 60, k: 64 },
                      { dim: 'Réactivité réglementaire', khepra: 96, d: 70, p: 68, e: 66, k: 71 },
                      { dim: 'Tarification adaptée PME/IMF', khepra: 92, d: 45, p: 42, e: 48, k: 44 },
                      { dim: 'Intelligence IA (KOS)', khepra: 150, d: 68, p: 72, e: 65, k: 70 },
                    ].map(row => (
                      <tr key={row.dim} className="border-b border-background-100 last:border-0">
                        <td className="py-3 pr-4 text-xs text-foreground-700">{row.dim}</td>
                        <td className="text-center py-3 px-3">
                          <span className="font-bold text-primary-700 text-sm">{row.khepra}</span>
                        </td>
                        <td className="text-center py-3 px-3 text-xs text-foreground-500">{row.d}</td>
                        <td className="text-center py-3 px-3 text-xs text-foreground-500">{row.p}</td>
                        <td className="text-center py-3 px-3 text-xs text-foreground-500">{row.e}</td>
                        <td className="text-center py-3 px-3 text-xs text-foreground-500">{row.k}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pipeline par région */}
            <div>
              <h3 className="font-semibold text-foreground-900 mb-4">Pipeline Opportunités par Région</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { region: 'UEMOA', pipeline: '1.45 Md FCFA', missions: 38, growth: '+24%', icon: 'ri-map-pin-line', color: 'primary' },
                  { region: 'CEMAC', pipeline: '0.95 Md FCFA', missions: 15, growth: '+41%', icon: 'ri-map-2-line', color: 'accent' },
                  { region: 'Pan-Africain', pipeline: '0.38 Md FCFA', missions: 8, growth: '+67%', icon: 'ri-globe-line', color: 'secondary' },
                  { region: 'Total 54 Pays', pipeline: '2.78 Md FCFA', missions: 61, growth: '+32%', icon: 'ri-earth-line', color: 'primary' },
                ].map(r => (
                  <div key={r.region} className="bg-white rounded-xl border border-background-200/70 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <i className={`${r.icon} text-${r.color}-500`}></i>
                      <span className="font-semibold text-foreground-900">{r.region}</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground-950 mb-1">{r.pipeline}</div>
                    <div className="flex gap-3 text-xs text-foreground-500">
                      <span><i className="ri-briefcase-line mr-1"></i>{r.missions} opportunités</span>
                      <span className="text-emerald-600 font-semibold">{r.growth} /an</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </hubLayout>
  );
}





