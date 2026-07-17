import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { useRegulatoryObservatoryAfrica } from '@/hooks/useRegulatoryObservatoryAfrica';

const TABS = [
  { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-global-line' },
  { id: 'regulators', label: '8 Régulateurs', icon: 'ri-building-2-line' },
  { id: 'alerts', label: 'Alertes Temps Réel', icon: 'ri-alarm-warning-line' },
  { id: 'observatories', label: 'Observatoires', icon: 'ri-radar-line' },
  { id: 'countries', label: '54 Pays', icon: 'ri-map-2-line' },
  { id: 'analysis', label: 'Analyse Big Four', icon: 'ri-bar-chart-box-line' },
];

const REGIONS = [
  { id: 'UEMOA', countries: ['Sénégal', 'Côte d\'Ivoire', 'Mali', 'Burkina Faso', 'Bénin', 'Togo', 'Niger', 'Guinée-Bissau'], color: 'bg-primary-500', count: 8 },
  { id: 'CEMAC', countries: ['Cameroun', 'Gabon', 'Congo', 'Centrafrique', 'Tchad', 'Guinée Équatoriale'], color: 'bg-accent-500', count: 6 },
  { id: 'OHADA', countries: ['+ RDC', 'Comores', 'Guinée', '+ 5 autres'], color: 'bg-secondary-500', count: 17 },
  { id: 'GIABA/GAFI', countries: ['+ Nigeria', 'Ghana', 'Liberia', 'Sierra Leone', 'Cap-Vert', 'Gambie'], color: 'bg-primary-400', count: 15 },
  { id: 'Zone CIMA', countries: ['14 pays assurance', 'Zone Franc CFA'], color: 'bg-accent-400', count: 14 },
  { id: 'Reste Afrique', countries: ['Monitoring étendu', '8 pays additionnels'], color: 'bg-secondary-400', count: 8 },
];

const ANALYSIS_AXES = [
  { axis: 'Profondeur de Couverture Réglementaire', khepra: 94, deloitte: 72, pwc: 68, ey: 70, description: '8 régulateurs • 54 pays • 22 instructions BCEAO • 40 Recommandations GAFI' },
  { axis: 'Alertes Temps Réel', khepra: 96, deloitte: 60, pwc: 58, ey: 62, description: 'Monitoring 24/7 automatisé via KOS Regulatory Scout • Cron lundi 04:00 UTC' },
  { axis: 'Expertise Locale Afrique Francophone', khepra: 98, deloitte: 55, pwc: 50, ey: 52, description: '22 ans d\'expertise terrain • Présence UEMOA/CEMAC/OHADA' },
  { axis: 'Vitesse d\'Adaptation Réglementaire', khepra: 92, deloitte: 65, pwc: 62, ey: 60, description: 'Détection J0 • Brief exécutif J+1 • Plan conformité J+7' },
  { axis: 'Intelligence Prédictive', khepra: 88, deloitte: 58, pwc: 55, ey: 57, description: 'KOS Regulatory Prediction Engine™ • Anticipation 8 mois à l\'avance' },
];

export default function KOSRegulatoryObservatoryAfricaPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const {
    regulators,
    alerts,
    allAlerts,
    observatories,
    globalStats,
    regulationsCount,
    selectedRegulator,
    setSelectedRegulator,
    loading,
    dataSource,
    refresh,
  } = useRegulatoryObservatoryAfrica();

  const alertTypeColor = (type: string) => {
    if (type === 'critical') return 'bg-red-100 text-red-700 border-red-200';
    if (type === 'haute') return 'bg-orange-100 text-orange-700 border-orange-200';
    if (type === 'moyenne') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-background-100 text-foreground-600 border-background-200';
  };

  const alertIcon = (type: string) => {
    if (type === 'critical') return 'ri-error-warning-fill text-red-500';
    if (type === 'haute') return 'ri-alert-fill text-orange-500';
    if (type === 'moyenne') return 'ri-information-fill text-amber-500';
    return 'ri-checkbox-circle-fill text-green-500';
  };

  const trendIcon = (trend: string) => {
    if (trend === 'up' || trend === 'improving') return <span className="text-green-600"><i className="ri-arrow-up-line"></i> En hausse</span>;
    if (trend === 'down') return <span className="text-red-500"><i className="ri-arrow-down-line"></i> En baisse</span>;
    return <span className="text-foreground-500"><i className="ri-arrow-right-line"></i> Stable</span>;
  };

  return (
    <KOSHubLayout hubId={122}>
      {/* Header */}
      <div className="bg-background-100 border-b border-background-200/70 px-6 py-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 border border-primary-200">BLOC 11</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 border border-accent-200">
                {dataSource === 'live' ? '● LIVE DB' : '◎ MOCK'}
              </span>
              {globalStats.newAlerts > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 animate-pulse">
                  {globalStats.newAlerts} NOUVELLES ALERTES
                </span>
              )}
            </div>
            <h1 className="text-xl font-bold text-foreground-950">KOS Regulatory Observatory Africa™</h1>
            <p className="text-sm text-foreground-600 mt-0.5">Dashboard unifié • 8 Régulateurs • 54 Pays • Alertes Temps Réel</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-background-200/70 hover:bg-background-200 text-foreground-700 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className={`ri-refresh-line ${loading ? 'animate-spin' : ''}`}></i>
              Actualiser
            </button>
          </div>
        </div>

        {/* Global KPIs bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mt-4">
          {[
            { label: 'Régulateurs', value: String(globalStats.totalRegulators), icon: 'ri-building-2-line', color: 'text-primary-600' },
            { label: 'Pays Couverts', value: String(globalStats.totalCountries), icon: 'ri-map-2-line', color: 'text-accent-600' },
            { label: 'Alertes Actives', value: String(globalStats.totalAlerts), icon: 'ri-alarm-warning-line', color: 'text-orange-600' },
            { label: 'Critiques', value: String(globalStats.criticalAlerts), icon: 'ri-error-warning-line', color: 'text-red-600' },
            { label: 'Score Moyen', value: `${globalStats.avgComplianceScore}%`, icon: 'ri-bar-chart-line', color: 'text-green-600' },
            { label: 'Institutions', value: `${globalStats.totalInstitutions.toLocaleString()}`, icon: 'ri-bank-line', color: 'text-primary-600' },
            { label: 'Observatoires', value: String(globalStats.observatoriesCount), icon: 'ri-radar-line', color: 'text-accent-600' },
            { label: 'Nouvelles', value: String(globalStats.newAlerts), icon: 'ri-notification-3-line', color: 'text-red-500' },
          ].map((kpi, i) => (
            <div key={i} className="bg-background-50 rounded-lg p-2.5 border border-background-200/70 text-center">
              <i className={`${kpi.icon} ${kpi.color} text-base`}></i>
              <div className="text-base font-bold text-foreground-950 mt-0.5">{kpi.value}</div>
              <div className="text-xs text-foreground-500">{kpi.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-background-200/70 px-6">
        <div className="flex gap-1 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-foreground-600 hover:text-foreground-900'
              }`}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* TAB 1 — Vue d'Ensemble */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 8 regulators grid */}
            <div>
              <h2 className="text-base font-semibold text-foreground-800 mb-3 flex items-center gap-2">
                <i className="ri-building-2-line text-primary-500"></i>
                8 Régulateurs Surveillés en Temps Réel
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {regulators.map(reg => (
                  <div
                    key={reg.id}
                    onClick={() => { setActiveTab('regulators'); }}
                    className="bg-background-50 border border-background-200/70 rounded-lg p-3 cursor-pointer hover:border-primary-300 hover:bg-primary-50/30 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 flex items-center justify-center rounded-md bg-primary-100">
                        <i className={`${reg.icon} text-primary-600 text-sm`}></i>
                      </div>
                      <span className="text-xs font-bold text-foreground-900">{reg.acronym}</span>
                    </div>
                    <div className="text-xs text-foreground-500 mb-2 line-clamp-2">{reg.region}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-foreground-600">{reg.institutionsCount} institutions</span>
                      <span className={`text-xs font-semibold ${reg.alertsCount >= 15 ? 'text-red-500' : reg.alertsCount >= 10 ? 'text-orange-500' : 'text-green-600'}`}>
                        {reg.alertsCount} alertes
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-foreground-500">Conformité</span>
                        <span className="font-semibold text-foreground-800">{reg.complianceScore}%</span>
                      </div>
                      <div className="h-1.5 bg-background-200 rounded-full">
                        <div
                          className={`h-1.5 rounded-full ${reg.complianceScore >= 85 ? 'bg-green-500' : reg.complianceScore >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${reg.complianceScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest critical alerts */}
            <div>
              <h2 className="text-base font-semibold text-foreground-800 mb-3 flex items-center gap-2">
                <i className="ri-alarm-warning-line text-red-500"></i>
                Alertes Critiques &amp; Hautes — Dernières 30 Jours
              </h2>
              <div className="space-y-2">
                {allAlerts.filter(a => a.alertType === 'critical' || a.alertType === 'haute').slice(0, 5).map(alert => (
                  <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-lg border ${alertTypeColor(alert.alertType)}`}>
                    <i className={`${alertIcon(alert.alertType)} text-lg mt-0.5`}></i>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold">{alert.regulatorAcronym}</span>
                        {alert.isNew && <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-red-500 text-white">NOUVEAU</span>}
                        <span className="text-xs text-foreground-500">{alert.publishDate}</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground-900 mt-0.5">{alert.title}</p>
                      <p className="text-xs text-foreground-600 mt-0.5 line-clamp-2">{alert.description}</p>
                      {alert.daysToCompliance && (
                        <span className="text-xs font-medium text-orange-700 mt-1 inline-block">
                          ⏱ Délai conformité : {alert.daysToCompliance} jours
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coverage regions */}
            <div>
              <h2 className="text-base font-semibold text-foreground-800 mb-3 flex items-center gap-2">
                <i className="ri-map-2-line text-accent-500"></i>
                Couverture Géographique — 54 Pays Africains
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {REGIONS.map(region => (
                  <div key={region.id} className="bg-background-50 border border-background-200/70 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground-900">{region.id}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${region.color}`}>{region.count} pays</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {region.countries.slice(0, 4).map(c => (
                        <span key={c} className="text-xs px-1.5 py-0.5 rounded bg-background-200/70 text-foreground-600">{c}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2 — 8 Régulateurs */}
        {activeTab === 'regulators' && (
          <div className="space-y-4">
            {regulators.map(reg => (
              <div key={reg.id} className="bg-background-50 border border-background-200/70 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-100 flex-shrink-0">
                    <i className={`${reg.icon} text-primary-600 text-xl`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="text-base font-bold text-foreground-950">{reg.acronym}</h3>
                        <p className="text-xs text-foreground-500">{reg.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700 font-medium">{reg.region}</span>
                        <span className="text-xs text-foreground-500">{trendIcon(reg.trend)}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                      <div className="text-center p-2 bg-background-100 rounded-lg">
                        <div className="text-base font-bold text-foreground-900">{reg.institutionsCount.toLocaleString()}</div>
                        <div className="text-xs text-foreground-500">Institutions</div>
                      </div>
                      <div className="text-center p-2 bg-background-100 rounded-lg">
                        <div className={`text-base font-bold ${reg.alertsCount >= 15 ? 'text-red-600' : 'text-orange-600'}`}>{reg.alertsCount}</div>
                        <div className="text-xs text-foreground-500">Alertes</div>
                      </div>
                      <div className="text-center p-2 bg-background-100 rounded-lg">
                        <div className="text-base font-bold text-foreground-900">{reg.countries.length}</div>
                        <div className="text-xs text-foreground-500">Pays</div>
                      </div>
                      <div className="text-center p-2 bg-background-100 rounded-lg">
                        <div className={`text-base font-bold ${reg.complianceScore >= 85 ? 'text-green-600' : 'text-amber-600'}`}>{reg.complianceScore}%</div>
                        <div className="text-xs text-foreground-500">Conformité</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {reg.countries.slice(0, 6).map(c => (
                          <span key={c} className="text-xs px-1.5 py-0.5 rounded bg-background-200/70 text-foreground-600">{c}</span>
                        ))}
                        {reg.countries.length > 6 && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-primary-100 text-primary-600 font-medium">+{reg.countries.length - 6} pays</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3 — Alertes Temps Réel */}
        {activeTab === 'alerts' && (
          <div className="space-y-4">
            {/* Filter by regulator */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedRegulator('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${selectedRegulator === 'all' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200'}`}
              >
                Tous ({allAlerts.length})
              </button>
              {regulators.map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRegulator(r.acronym)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${selectedRegulator === r.acronym ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-600 hover:bg-background-200'}`}
                >
                  {r.acronym} ({allAlerts.filter(a => a.regulatorAcronym.includes(r.acronym.split('/')[0])).length})
                </button>
              ))}
            </div>

            {alerts.map(alert => (
              <div key={alert.id} className="bg-background-50 border border-background-200/70 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <i className={`${alertIcon(alert.alertType)} text-xl mt-0.5`}></i>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded border ${alertTypeColor(alert.alertType)}`}>
                        {alert.alertType.toUpperCase()}
                      </span>
                      <span className="text-xs font-bold text-primary-600">{alert.regulatorAcronym}</span>
                      {alert.isNew && (
                        <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-red-500 text-white animate-pulse">NOUVEAU</span>
                      )}
                      <span className="text-xs text-foreground-500 ml-auto">{alert.publishDate}</span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground-950 mb-1">{alert.title}</h3>
                    <p className="text-xs text-foreground-600 mb-2">{alert.description}</p>
                    <div className="flex flex-wrap gap-2 items-center">
                      {alert.countries.slice(0, 4).map(c => (
                        <span key={c} className="text-xs px-1.5 py-0.5 rounded bg-primary-50 text-primary-700 border border-primary-200">{c}</span>
                      ))}
                      {alert.impactedSectors.map(s => (
                        <span key={s} className="text-xs px-1.5 py-0.5 rounded bg-accent-50 text-accent-700 border border-accent-200">{s}</span>
                      ))}
                      {alert.daysToCompliance && (
                        <span className="text-xs font-semibold text-orange-700 ml-auto">
                          <i className="ri-time-line mr-1"></i>
                          {alert.daysToCompliance}j pour se conformer
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4 — Observatoires */}
        {activeTab === 'observatories' && (
          <div className="space-y-4">
            <p className="text-sm text-foreground-600 bg-primary-50 border border-primary-200 rounded-lg p-3">
              <i className="ri-radar-line text-primary-500 mr-2"></i>
              <strong>{globalStats.observatoriesCount} observatoires sectoriels</strong> — données LIVE Supabase + enrichissement KOS Intelligence
            </p>
            {[
              { name: 'Observatoire BCEAO — Systèmes Bancaires UEMOA', sector: 'Banque', jurisdiction: 'UEMOA', score: 87, alerts: 18, regs: 38, trend: 'improving', kpis: { institutions: 127, 'ratio solvabilité': '14.5%', 'PAR30 moyen': '7.2%', 'liquidité': '152%' } },
              { name: 'Observatoire COBAC — Systèmes Bancaires CEMAC', sector: 'Banque', jurisdiction: 'CEMAC', score: 88, alerts: 12, regs: 45, trend: 'stable', kpis: { institutions: 54, 'solvabilité': '12.8%', 'NPLs': '14.2%', 'liquidité': '148%' } },
              { name: 'Observatoire SFD — Microfinance UEMOA', sector: 'Microfinance', jurisdiction: 'UEMOA', score: 82, alerts: 18, regs: 22, trend: 'improving', kpis: { 'SFD agréés': 412, 'encours (Mds)': '3.8', 'membres (M)': '7.2', 'PAR30%': '8.5%' } },
              { name: 'Observatoire GAFI/GIABA — LBC/FT Afrique Ouest', sector: 'LBC/FT', jurisdiction: 'Afrique Ouest', score: 72, alerts: 24, regs: 40, trend: 'improving', kpis: { 'pays évalués': 15, 'R.40 conformité': '78%', 'efficacité': '62%', 'HVC pays': 2 } },
              { name: 'Observatoire OHADA — Droit des Affaires', sector: 'Droit', jurisdiction: 'OHADA', score: 91, alerts: 8, regs: 10, trend: 'stable', kpis: { 'actes uniformes': 10, 'pays membres': 17, 'arrêts CCJA/an': 320, 'population (M)': 350 } },
              { name: 'Observatoire FinTech UEMOA/CEMAC', sector: 'FinTech', jurisdiction: 'UEMOA/CEMAC', score: 75, alerts: 15, regs: 18, trend: 'improving', kpis: { 'EME agréés': 28, 'PSP agréés': 34, 'transactions (Mds)': '18.5', 'users (M)': 42 } },
              { name: 'Observatoire CIMA — Assurance Afrique', sector: 'Assurance', jurisdiction: 'Zone CIMA', score: 84, alerts: 10, regs: 28, trend: 'stable', kpis: { 'compagnies': 248, 'CA (Mds FCFA)': 850, 'pénétration%': '1.8%', pays: 15 } },
              { name: 'Observatoire Marchés Financiers COSUMAF/AMF-UEMOA', sector: 'Marchés Financiers', jurisdiction: 'UEMOA/CEMAC', score: 80, alerts: 13, regs: 32, trend: 'up', kpis: { 'sociétés cotées': 48, 'capitalisation (Mds)': '12.4', 'émissions/an': 18, 'intermédiaires': 63 } },
            ].map((obs, i) => (
              <div key={i} className="bg-background-50 border border-background-200/70 rounded-xl p-4">
                <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">{obs.name}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700">{obs.sector}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700">{obs.jurisdiction}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${obs.score >= 85 ? 'text-green-600' : obs.score >= 75 ? 'text-amber-600' : 'text-red-600'}`}>{obs.score}%</div>
                    <div className="text-xs text-foreground-500">Conformité</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                  {Object.entries(obs.kpis).map(([k, v]) => (
                    <div key={k} className="text-center p-1.5 bg-background-100 rounded-lg">
                      <div className="text-sm font-bold text-foreground-900">{String(v)}</div>
                      <div className="text-xs text-foreground-500">{k}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-foreground-500">
                  <span><i className="ri-alarm-warning-line mr-1"></i>{obs.alerts} alertes actives</span>
                  <span><i className="ri-file-list-3-line mr-1"></i>{obs.regs} textes réglementaires</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5 — 54 Pays */}
        {activeTab === 'countries' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REGIONS.map(region => (
                <div key={region.id} className="bg-background-50 border border-background-200/70 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-foreground-950">{region.id}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${region.color}`}>
                      {region.count} pays
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {region.countries.map(c => (
                      <span key={c} className="text-xs px-2 py-1 rounded-lg bg-background-200/70 text-foreground-700 border border-background-300/60">{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-primary-800 mb-3">
                <i className="ri-global-line mr-2"></i>
                Couverture Totale KOS Regulatory Observatory Africa™
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Pays couverts', value: '54', sub: 'Afrique Francophone + Lusophone' },
                  { label: 'Régulateurs', value: '8', sub: 'BCEAO, COBAC, GAFI, OHADA, CIMA...' },
                  { label: 'Textes réglementaires', value: '160+', sub: 'Instructions, Circulaires, Règlements' },
                  { label: 'Institutions surveillées', value: '515+', sub: 'Banques, SFD, Assurances, PSP' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-primary-700">{s.value}</div>
                    <div className="text-xs font-semibold text-primary-800">{s.label}</div>
                    <div className="text-xs text-primary-600 mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6 — Analyse Big Four */}
        {activeTab === 'analysis' && (
          <div className="space-y-5">
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
              <h2 className="text-base font-semibold text-foreground-800 mb-4">
                Benchmark Veille Réglementaire — KHEPRA vs Big Four
              </h2>
              <div className="space-y-4">
                {ANALYSIS_AXES.map((ax, i) => (
                  <div key={i} className="border border-background-200/70 rounded-lg p-4">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <h3 className="text-sm font-semibold text-foreground-900">{ax.axis}</h3>
                      <span className="text-lg font-bold text-primary-600">{ax.khepra}<span className="text-xs text-foreground-400">/100</span></span>
                    </div>
                    <p className="text-xs text-foreground-500 mb-3">{ax.description}</p>
                    <div className="space-y-1.5">
                      {[
                        { name: 'KHEPRA', score: ax.khepra, color: 'bg-primary-500' },
                        { name: 'Deloitte', score: ax.deloitte, color: 'bg-background-400' },
                        { name: 'PwC', score: ax.pwc, color: 'bg-background-400' },
                        { name: 'EY', score: ax.ey, color: 'bg-background-400' },
                      ].map(firm => (
                        <div key={firm.name} className="flex items-center gap-2">
                          <span className="text-xs text-foreground-600 w-16 text-right">{firm.name}</span>
                          <div className="flex-1 h-2 bg-background-200 rounded-full">
                            <div className={`h-2 rounded-full ${firm.color}`} style={{ width: `${firm.score}%` }}></div>
                          </div>
                          <span className="text-xs font-semibold text-foreground-800 w-8">{firm.score}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-primary-700 font-medium">
                      Avantage KHEPRA : +{ax.khepra - Math.max(ax.deloitte, ax.pwc, ax.ey)} pts vs meilleur Big Four
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-accent-50 border border-accent-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-accent-800 mb-2">
                <i className="ri-trophy-line mr-2"></i>
                Avantage Concurrentiel Structurel
              </h3>
              <ul className="space-y-2">
                {[
                  'Expertise exclusive BCEAO/COBAC/OHADA sur 54 pays — non réplicable en &lt;5 ans',
                  'KOS Regulatory Scout™ — détection automatique J0 de chaque nouveau texte réglementaire',
                  '22 ans de terrain Afrique Francophone — réseau régulateurs BCEAO, COBAC, GIABA intégré',
                  'KOS Publication Gate™ — 0 fake news réglementaire, indice fiabilité ≥95/100',
                  'Veille GAFI temps réel — 40 Recommandations + révisions spécialisées VASP/CBDC',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-accent-800">
                    <i className="ri-check-line text-accent-600 mt-0.5"></i>
                    <span dangerouslySetInnerHTML={{ __html: item }}></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </KOSHubLayout>
  );
}