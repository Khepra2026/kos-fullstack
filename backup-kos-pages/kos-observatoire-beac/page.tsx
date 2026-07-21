import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useObservatoireBEAC } from '@/hooks/useObservatoireBEAC';

type TabId = 'overview' | 'texts' | 'countries' | 'inspections' | 'compliance' | 'bigfour';

const IMPACT_BADGE: Record<string, string> = {
  critique: 'bg-red-500 text-white',
  élevé: 'bg-orange-500 text-white',
  moyen: 'bg-amber-100 text-amber-800',
  faible: 'bg-background-200 text-foreground-600',
};
const IMPACT_LABEL: Record<string, string> = { critique: 'Critique', élevé: 'Élevé', moyen: 'Moyen', faible: 'Faible' };
const STATUS_BADGE: Record<string, string> = {
  en_cours: 'bg-primary-100 text-primary-800',
  planifiée: 'bg-amber-100 text-amber-800',
  terminée: 'bg-emerald-100 text-emerald-800',
  alerte: 'bg-red-100 text-red-800',
};
const STATUS_LABEL: Record<string, string> = { en_cours: 'En cours', planifiée: 'Planifiée', terminée: 'Terminée', alerte: 'Alerte' };
const INSP_STATUS: Record<string, string> = {
  en_cours: 'bg-primary-500 text-white',
  planifiée: 'bg-amber-400 text-white',
  terminée: 'bg-emerald-500 text-white',
};

export default function observatoireBEACPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const {
    overview, kpis, texts, countries, inspections, bigFour,
    selectedCountry, setSelectedCountry,
    selectedTextType, setSelectedTextType,
    selectedImpact, setSelectedImpact,
    selectedInspectionStatus, setSelectedInspectionStatus,
    dataSource, loading,
  } = useObservatoireBEAC();

  const TABS: { id: TabId; label: string; icon: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
    { id: 'texts', label: '18 Textes BEAC', icon: 'ri-file-shield-2-line' },
    { id: 'countries', label: '6 Pays CEMAC', icon: 'ri-map-pin-line' },
    { id: 'inspections', label: 'Inspections COBAC', icon: 'ri-search-line' },
    { id: 'compliance', label: 'Conformité', icon: 'ri-shield-check-line' },
    { id: 'bigfour', label: 'Analyse Big Four', icon: 'ri-building-4-line' },
  ];

  return (
    <hubLayout hubId={132}>
      {/* Header */}
      <div className="bg-background-100 border-b border-background-200/70 px-6 py-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-500 text-white">
              <i className="ri-bank-fill text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground-950 font-heading">
                KOS Observatoire BEAC/COBAC™
              </h1>
              <p className="text-sm text-foreground-600">18 textes BEAC vérifiés · 6 pays CEMAC · Timeline inspections COBAC · Miroir BCEAO</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${dataSource === 'live' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
            <i className={`ri-${dataSource === 'live' ? 'wifi-line' : 'database-line'} mr-1`}></i>
            {dataSource === 'live' ? 'LIVE DB' : 'MOCK'}
          </span>
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
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === tab.id ? 'border-primary-500 text-primary-700' : 'border-transparent text-foreground-500 hover:text-foreground-700'}`}
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
            {/* BEAC Banner */}
            <div className="bg-primary-500 text-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold">Observatoire BEAC/COBAC CEMAC — Miroir de l'Observatoire BCEAO</h2>
                  <p className="text-sm text-white/80 mt-1">18 textes BEAC vérifiés, 6 pays CEMAC, timeline inspections COBAC — standards Big Four</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{overview.verifiedTexts}</div>
                  <div className="text-sm text-white/80">textes vérifiés</div>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-4 text-center">
                <div className="bg-white/20 rounded-lg p-3"><div className="text-2xl font-bold">{overview.banks}</div><div className="text-xs text-white/70">banques</div></div>
                <div className="bg-white/20 rounded-lg p-3"><div className="text-2xl font-bold">{overview.sfd}</div><div className="text-xs text-white/70">SFD</div></div>
                <div className="bg-white/20 rounded-lg p-3"><div className="text-2xl font-bold">{overview.inspectionsActive}</div><div className="text-xs text-white/70">inspections en cours</div></div>
                <div className="bg-white/20 rounded-lg p-3"><div className="text-2xl font-bold">{overview.activeAlerts}</div><div className="text-xs text-white/70">alertes actives</div></div>
                <div className="bg-white/20 rounded-lg p-3"><div className="text-2xl font-bold">{overview.avgComplianceScore}/100</div><div className="text-xs text-white/70">score moyen</div></div>
              </div>
            </div>

            {/* Countries Grid */}
            <div>
              <h3 className="text-base font-semibold text-foreground-900 mb-3">
                <i className="ri-map-pin-line mr-2 text-primary-500"></i>
                6 Pays CEMAC — Scores BEAC/COBAC
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {countries.map(c => (
                  <div key={c.id} className="bg-white rounded-lg border border-background-200/70 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700 font-bold text-xs">{c.countryCode}</div>
                        <div>
                          <div className="font-semibold text-foreground-900 text-sm">{c.name}</div>
                          <div className="text-xs text-foreground-400">{c.capital}</div>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${STATUS_BADGE[c.inspectionStatus]}`}>
                        {STATUS_LABEL[c.inspectionStatus]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 bg-background-100 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${c.complianceScore >= 70 ? 'bg-emerald-500' : c.complianceScore >= 50 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${c.complianceScore}%` }}></div>
                      </div>
                      <span className="text-sm font-bold text-foreground-950 w-8">{c.complianceScore}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs text-foreground-500">
                      <span><i className="ri-bank-line mr-1"></i>{c.banksCount} banques</span>
                      <span><i className="ri-community-line mr-1"></i>{c.sfdCount} SFD</span>
                      <span><i className="ri-alarm-warning-line mr-1"></i>{c.activeAlerts} alertes</span>
                      {c.beacPresence ? <span className="text-emerald-600 font-semibold"><i className="ri-check-line mr-1"></i>BEAC présente</span> : <span className="text-orange-500"><i className="ri-error-warning-line mr-1"></i>BEAC distante</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inspections summary */}
            <div>
              <h3 className="text-base font-semibold text-foreground-900 mb-3">
                <i className="ri-calendar-todo-line mr-2 text-primary-500"></i>
                Timeline Inspections COBAC — Récentes &amp; Planifiées
              </h3>
              <div className="space-y-2">
                {inspections.slice(0, 5).map(insp => (
                  <div key={insp.id} className="flex items-center gap-4 bg-white rounded-lg border border-background-200/70 p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap ${INSP_STATUS[insp.status]}`}>
                      {insp.status === 'en_cours' ? 'En cours' : insp.status === 'planifiée' ? 'Planifiée' : 'Terminée'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-foreground-900 truncate">{insp.bankName}</span>
                        <span className="text-xs text-foreground-400">{insp.country}</span>
                      </div>
                      <div className="text-xs text-foreground-500">{insp.inspectionType}</div>
                    </div>
                    <div className="text-xs text-foreground-500 text-right">
                      {insp.findingsCount > 0 && <span className={`font-semibold ${insp.criticalFindings > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{insp.criticalFindings} critiques / {insp.findingsCount}</span>}
                      {insp.khepraInvolved && <span className="block text-primary-600 font-semibold">KHEPRA</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-links */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                { label: 'Observatoire COBAC', path: '/kos-observatoire-cobac', icon: 'ri-government-line' },
                { label: 'Observatoire BCEAO', path: '/kos-observatoire-bceao', icon: 'ri-bank-line' },
                { label: 'Africa Intelligence', path: '/kos-africa-intelligence-command', icon: 'ri-radar-line' },
                { label: 'Enterprise Risk', path: '/kos-enterprise-risk-resilience', icon: 'ri-shield-flash-line' },
                { label: 'ISO Big Four', path: '/kos-iso-bigfour-total-compliance-control', icon: 'ri-award-line' },
              ].map(link => (
                <a key={link.path} href={link.path} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-background-200 bg-background-50 text-xs font-semibold text-foreground-700 hover:border-foreground-300 transition-colors cursor-pointer">
                  <i className={`${link.icon} text-xs`}></i>{link.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ======== 18 TEXTES BEAC ======== */}
        {activeTab === 'texts' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex rounded-lg border border-background-200 overflow-hidden">
                {['all', 'Règlement', 'Instruction', 'Circulaire', 'Directive', 'Note'].map(t => (
                  <button key={t} onClick={() => setSelectedTextType(t)}
                    className={`px-3 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${selectedTextType === t ? 'bg-primary-500 text-white' : 'bg-white text-foreground-600 hover:bg-background-100'}`}>
                    {t === 'all' ? 'Tous' : t}
                  </button>
                ))}
              </div>
              <div className="flex rounded-lg border border-background-200 overflow-hidden">
                {['all', 'critique', 'élevé', 'moyen', 'faible'].map(i => (
                  <button key={i} onClick={() => setSelectedImpact(i)}
                    className={`px-3 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${selectedImpact === i ? 'bg-primary-500 text-white' : 'bg-white text-foreground-600 hover:bg-background-100'}`}>
                    {i === 'all' ? 'Tous' : IMPACT_LABEL[i]}
                  </button>
                ))}
              </div>
              <span className="text-sm text-foreground-500 self-center">{texts.length} texte(s)</span>
            </div>
            <div className="space-y-3">
              {texts.map(t => (
                <div key={t.id} className="bg-white rounded-xl border border-background-200/70 overflow-hidden">
                  <div className={`px-4 py-2 flex items-center gap-2 border-b ${t.impactLevel === 'critique' ? 'bg-red-50 border-red-100' : t.impactLevel === 'élevé' ? 'bg-orange-50 border-orange-100' : 'bg-background-50 border-background-200'}`}>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${IMPACT_BADGE[t.impactLevel]}`}>{IMPACT_LABEL[t.impactLevel]}</span>
                    <span className="text-xs font-mono text-foreground-400">{t.reference}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white text-foreground-600 border border-background-200">{t.type}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white text-foreground-600 border border-background-200">{t.year}</span>
                    {t.verified && <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold"><i className="ri-check-line mr-1"></i>Vérifié</span>}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground-900 mb-1">{t.title}</h4>
                    <p className="text-sm text-foreground-600 mb-3">{t.summary}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {t.countryScope.map(c => <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{c}</span>)}
                    </div>
                    <div className="bg-primary-50 rounded-lg p-3 text-sm text-primary-800 border border-primary-100">
                      <i className="ri-briefcase-line mr-2"></i>
                      <strong>Actions KHEPRA :</strong> {t.clientActions.join(' · ')}
                    </div>
                    <div className="mt-2 flex gap-3 text-xs text-foreground-400">
                      <span><i className="ri-bookmark-line mr-1"></i>{t.citationCount} citations</span>
                      <span><i className="ri-calendar-check-line mr-1"></i>Vérifié le {t.lastVerified}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======== 6 PAYS ======== */}
        {activeTab === 'countries' && (
          <div className="grid grid-cols-3 gap-4">
            {countries.map(c => (
              <div key={c.id} className="bg-white rounded-xl border border-background-200/70 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700 font-bold text-sm">{c.countryCode}</div>
                    <div>
                      <div className="font-semibold text-foreground-900">{c.name}</div>
                      <div className="text-xs text-foreground-400">{c.capital}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${STATUS_BADGE[c.inspectionStatus]}`}>{STATUS_LABEL[c.inspectionStatus]}</span>
                </div>
                <div className="text-3xl font-bold text-primary-600 mb-1">{c.complianceScore}</div>
                <div className="text-xs text-foreground-500 mb-3">Score conformité /100</div>
                <div className="space-y-1.5 text-xs text-foreground-500">
                  {[
                    ['Banques', c.banksCount],
                    ['SFD', c.sfdCount],
                    ['Alertes actives', c.activeAlerts],
                  ].map(([label, val]) => (
                    <div key={String(label)} className="flex justify-between bg-background-50 rounded px-2 py-1.5">
                      <span>{label}</span>
                      <span className="font-semibold">{val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between bg-background-50 rounded px-2 py-1.5">
                    <span>Présence BEAC</span>
                    <span className={`font-semibold ${c.beacPresence ? 'text-emerald-600' : 'text-orange-500'}`}>{c.beacPresence ? 'Directe' : 'Distante'}</span>
                  </div>
                  {c.nextInspection && (
                    <div className="flex justify-between bg-background-50 rounded px-2 py-1.5">
                      <span>Prochaine inspection</span>
                      <span className="font-semibold text-primary-600">{c.nextInspection}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ======== INSPECTIONS ======== */}
        {activeTab === 'inspections' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {['all', 'en_cours', 'planifiée', 'terminée'].map(s => (
                <button key={s} onClick={() => setSelectedInspectionStatus(s)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${selectedInspectionStatus === s ? 'bg-primary-500 text-white' : 'bg-white text-foreground-600 border border-background-200 hover:bg-background-100'}`}>
                  {s === 'all' ? 'Toutes' : STATUS_LABEL[s]}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {inspections.map(insp => (
                <div key={insp.id} className="bg-white rounded-xl border border-background-200/70 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground-900">{insp.bankName}</span>
                        <span className="text-xs text-foreground-400">{insp.country}</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{insp.inspectionType}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${INSP_STATUS[insp.status]}`}>
                      {insp.status === 'en_cours' ? 'En cours' : insp.status === 'planifiée' ? 'Planifiée' : 'Terminée'}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-foreground-500 mb-3">
                    <span><i className="ri-calendar-line mr-1"></i>{insp.startDate || 'Non défini'} → {insp.endDate || '?'}</span>
                    <span><i className="ri-file-list-line mr-1"></i>{insp.findingsCount} constatations</span>
                    <span className={`font-semibold ${insp.criticalFindings > 0 ? 'text-red-600' : 'text-emerald-600'}`}><i className="ri-error-warning-line mr-1"></i>{insp.criticalFindings} critiques</span>
                    <span className="text-foreground-400"><i className="ri-user-line mr-1"></i>{insp.inspector}</span>
                  </div>
                  {insp.actionPlan && (
                    <div className="p-2 bg-primary-50 rounded-lg text-xs text-primary-800">
                      <i className="ri-todo-line mr-1"></i><strong>Plan d'action :</strong> {insp.actionPlan}
                    </div>
                  )}
                  {insp.khepraInvolved && (
                    <div className="mt-2 p-2 bg-accent-50 rounded-lg text-xs text-accent-800">
                      <i className="ri-briefcase-line mr-1"></i><strong>KHEPRA impliquée</strong>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======== CONFORMITÉ ======== */}
        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-background-200/70 p-6">
              <h3 className="font-semibold text-foreground-900 mb-4">Score de Conformité par Pays CEMAC</h3>
              <div className="space-y-4">
                {countries.map(c => (
                  <div key={c.id}>
                    <div className="flex justify-between text-sm text-foreground-700 mb-1">
                      <span className="font-medium">{c.name}</span>
                      <span className={`font-semibold ${c.complianceScore >= 70 ? 'text-emerald-600' : c.complianceScore >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{c.complianceScore}/100</span>
                    </div>
                    <div className="bg-background-100 rounded-full h-3">
                      <div className={`h-3 rounded-full ${c.complianceScore >= 70 ? 'bg-emerald-500' : c.complianceScore >= 50 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${c.complianceScore}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-background-200/70 p-5">
                <h4 className="font-semibold text-foreground-900 mb-3">Conformité BEAC vs COBAC</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background-50 rounded-lg">
                    <span className="text-sm text-foreground-700">Score moyen BEAC</span>
                    <span className="font-bold text-primary-600">{overview.avgConformityBEAC}/100</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background-50 rounded-lg">
                    <span className="text-sm text-foreground-700">Score moyen COBAC</span>
                    <span className="font-bold text-accent-600">{overview.avgConformityCOBAC}/100</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background-50 rounded-lg">
                    <span className="text-sm text-foreground-700">KHEPRA impliquée</span>
                    <span className="font-bold text-emerald-600">{overview.khepraInvolvedInspections} inspections</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-background-200/70 p-5">
                <h4 className="font-semibold text-foreground-900 mb-3">Impact des Textes</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Critique', count: texts.filter(t => t.impactLevel === 'critique').length, color: 'bg-red-500' },
                    { label: 'Élevé', count: texts.filter(t => t.impactLevel === 'élevé').length, color: 'bg-orange-400' },
                    { label: 'Moyen', count: texts.filter(t => t.impactLevel === 'moyen').length, color: 'bg-amber-400' },
                    { label: 'Faible', count: texts.filter(t => t.impactLevel === 'faible').length, color: 'bg-background-300' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm text-foreground-600 flex-1">{item.label}</span>
                      <span className="text-sm font-semibold text-foreground-900">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======== BIG FOUR ======== */}
        {activeTab === 'bigfour' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-background-200/70 p-6">
              <h3 className="font-semibold text-foreground-900 mb-6">KHEPRA vs Big Four — Compétences BEAC/COBAC CEMAC</h3>
              <div className="space-y-6">
                {bigFour.map(b => (
                  <div key={b.dimension}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-foreground-950">{b.dimension}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">+{b.advantage} pts KHEPRA</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        { label: 'KHEPRA', value: b.khepra, color: '#059669' },
                        { label: 'Deloitte', value: b.deloitte, color: '#6366F1' },
                        { label: 'PwC', value: b.pwc, color: '#8B5CF6' },
                        { label: 'EY', value: b.ey, color: '#EA580C' },
                        { label: 'KPMG', value: b.kpmg, color: '#DC2626' },
                      ].map(firm => (
                        <div key={firm.label} className="text-center">
                          <div className="w-full h-20 rounded-lg bg-background-100 flex flex-col items-center justify-center mb-1">
                            <span className="text-xl font-bold font-heading" style={{ color: firm.color }}>{firm.value}</span>
                          </div>
                          <span className="text-xs text-foreground-500">{firm.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-sm text-emerald-800">
                  <strong>KHEPRA EXPERTS</strong> dispose d'un avantage concurrentiel de <strong>+16 à +33 points</strong> sur les Big Four sur les 5 dimensions clés BEAC/COBAC CEMAC.
                  Cet avantage repose sur une connaissance réglementaire profonde, une réactivité supérieure et une présence terrain dans les 6 pays CEMAC.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </hubLayout>
  );
}





