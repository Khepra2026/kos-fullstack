import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import {
  dataCatalog,
  documentClassifications,
  versioningRules,
  auditJournal,
  retentionPolicies,
  dataGovernanceKPIs,
  dataQualityMetrics,
  dataLineageExamples,
} from '@/mocks/dataGovernance';

type Tab = 'catalog' | 'classification' | 'versioning' | 'journal' | 'retention' | 'quality';

export default function dataGovernancePage() {
  const [activeTab, setActiveTab] = useState<Tab>('catalog');
  const [selectedCatalog, setSelectedCatalog] = useState(dataCatalog[0]);
  const filteredLogs = auditJournal.slice(0, 8); // auditJournal has 12 entries

  const getClassificationBadge = (level: string) => {
    const map: Record<string, string> = {
      'Public': 'bg-green-50 text-green-700 border-green-200',
      'Interne': 'bg-teal-50 text-teal-700 border-teal-200',
      'Restreint': 'bg-amber-50 text-amber-700 border-amber-200',
      'Confidentiel': 'bg-rose-50 text-rose-700 border-rose-200',
      'Secret': 'bg-red-50 text-red-700 border-red-200',
    };
    return map[level] || 'bg-background-100 text-foreground-600 border-background-200';
  };

  const getQualityColor = (score: number) => {
    if (score >= 95) return 'bg-emerald-500';
    if (score >= 90) return 'bg-green-500';
    if (score >= 85) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'catalog', label: 'Catalogue de Données', icon: 'ri-database-2-line', count: dataCatalog.length },
    { id: 'classification', label: 'Classification', icon: 'ri-shield-check-line', count: documentClassifications.length },
    { id: 'versioning', label: 'Versioning', icon: 'ri-git-branch-line', count: versioningRules.length },
    { id: 'journal', label: 'Journalisation', icon: 'ri-file-list-3-line', count: auditJournal.length },
    { id: 'retention', label: 'Rétention & Archivage', icon: 'ri-archive-line', count: retentionPolicies.length },
    { id: 'quality', label: 'Qualité & Traçabilité', icon: 'ri-bar-chart-2-line', count: dataQualityMetrics.length },
  ];

  return (
    <hubLayout hubId={64}>
      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-semibold mb-4">
                <i className="ri-database-2-line"></i>AXE 9 — KOS Big Four Maturity Accelerator
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                Data Governance Framework
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Catalogue de données, classification documentaire, versioning, journalisation, politique de conservation —
                le socle de conformité ISO 27001, ISO 42001, RGPD et EU AI Act pour l'ensemble du patrimoine informationnel KOS.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xl font-bold text-foreground-950">{dataGovernanceKPIs.classification_coverage_pct}%</div>
                <div className="text-xs text-foreground-500">Classification</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xl font-bold text-cyan-600">{dataGovernanceKPIs.versioning_coverage_pct}%</div>
                <div className="text-xs text-foreground-500">Versioning</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-xl font-bold text-amber-600">{dataGovernanceKPIs.traceability_score_pct}%</div>
                <div className="text-xs text-foreground-500">Traçabilité</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
                <span className="text-xs opacity-60">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ===== TAB 1 : DATA CATALOG ===== */}
        {activeTab === 'catalog' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-100 text-cyan-700">
                  <i className="ri-database-2-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">KOS Data Catalog™</h3>
                  <p className="text-xs text-foreground-500">{dataCatalog.length} datasets catalogués · {dataCatalog.reduce((s, d) => s + d.entities, 0).toLocaleString('fr-FR')} entités</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="p-2 rounded-lg bg-cyan-50/70 border border-cyan-100 text-center">
                  <div className="text-sm font-bold text-cyan-700">{dataCatalog.length}</div>
                  <div className="text-[10px] text-foreground-500">Datasets</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-100 text-center">
                  <div className="text-sm font-bold text-amber-700">{dataCatalog.filter(d => d.classification === 'Confidentiel').length}</div>
                  <div className="text-[10px] text-foreground-500">Confidentiels</div>
                </div>
                <div className="p-2 rounded-lg bg-red-50/70 border border-red-100 text-center">
                  <div className="text-sm font-bold text-red-700">{dataCatalog.filter(d => !d.lineage_complete).length}</div>
                  <div className="text-[10px] text-foreground-500">Sans Lignage</div>
                </div>
              </div>
              {dataCatalog.map((ds) => (
                <div
                  key={ds.id}
                  onClick={() => setSelectedCatalog(ds)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedCatalog.id === ds.id ? 'border-cyan-300 bg-cyan-50/50' : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{ds.domain}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getClassificationBadge(ds.classification)}`}>{ds.classification}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950 line-clamp-1">{ds.dataset_name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-foreground-500">{ds.entities.toLocaleString('fr-FR')} entités</span>
                    <span className="text-xs font-bold text-foreground-950">{ds.quality_score}/100</span>
                  </div>
                  <div className="mt-1.5 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${getQualityColor(ds.quality_score)}`} style={{ width: `${ds.quality_score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{selectedCatalog.domain}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getClassificationBadge(selectedCatalog.classification)}`}>{selectedCatalog.classification}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 font-medium">{selectedCatalog.category}</span>
                  {!selectedCatalog.lineage_complete && <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-700 font-medium">Lignage incomplet</span>}
                </div>
                <h2 className="text-lg font-bold text-foreground-950 mb-2">{selectedCatalog.dataset_name}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-cyan-600">{selectedCatalog.entities.toLocaleString('fr-FR')}</div>
                    <div className="text-xs text-foreground-500">Entités</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedCatalog.tables}</div>
                    <div className="text-xs text-foreground-500">Tables Supabase</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{selectedCatalog.quality_score}/100</div>
                    <div className="text-xs text-foreground-500">Score Qualité</div>
                  </div>
                  <div className="p-3 bg-background-100 rounded-lg text-center">
                    <div className="text-lg font-bold text-foreground-950">{Math.floor(selectedCatalog.retention_days / 365)} ans</div>
                    <div className="text-xs text-foreground-500">Rétention</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-cyan-50/50 rounded-lg border border-cyan-100">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-2">Propriétaire</h4>
                    <p className="text-sm text-foreground-700">{selectedCatalog.owner}</p>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg">
                    <h4 className="text-xs font-semibold text-foreground-950 mb-2">Dernière Mise à Jour</h4>
                    <p className="text-sm text-foreground-600">{new Date(selectedCatalog.last_updated).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${selectedCatalog.lineage_complete ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-xs text-foreground-600">
                    Lignage {selectedCatalog.lineage_complete ? 'complet' : 'incomplet'} — {selectedCatalog.lineage_complete ? 'Source → Transformation → Destination documentée' : 'Documentation partielle'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB 2 : DOCUMENT CLASSIFICATION ===== */}
        {activeTab === 'classification' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <i className="ri-shield-check-line text-cyan-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">KOS Document Classification™</h3>
                  <p className="text-xs text-gray-400">{dataGovernanceKPIs.classified_documents} documents classifiés · {dataGovernanceKPIs.classification_coverage_pct}% couverture · 5 niveaux</p>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-3 text-center">
                {documentClassifications.map((cls) => (
                  <div key={cls.id} className="p-4 rounded-xl bg-white/8 border border-white/10">
                    <i className={`${cls.icon} text-2xl mb-2 block opacity-70`}></i>
                    <span className="block text-lg font-bold">{cls.documents_count}</span>
                    <span className="text-[10px] text-gray-400">{cls.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documentClassifications.map((cls) => (
                <div key={cls.id} className={`rounded-xl border p-5 ${cls.color.replace('text-', 'border-').replace('700', '200')} bg-${cls.color.split(' ')[0]}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-background-50">
                      <i className={`${cls.icon} text-xl text-foreground-950`}></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">{cls.label}</h4>
                      <span className="text-xs text-foreground-500">{cls.documents_count} documents</span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-600 leading-relaxed">{cls.description}</p>
                  <div className="mt-3 pt-3 border-t border-background-200/50">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-foreground-500">Niveau d'accès</span>
                      <span className="font-bold">{cls.level}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h4 className="text-sm font-bold text-foreground-950 mb-4">Distribution par Niveau de Classification</h4>
              <div className="flex h-8 rounded-full overflow-hidden mb-4">
                <div className="bg-green-400 flex items-center justify-center text-[10px] font-bold text-white" style={{ width: `${(dataGovernanceKPIs.classification_breakdown.public / dataGovernanceKPIs.classified_documents) * 100}%` }}>Public</div>
                <div className="bg-teal-400 flex items-center justify-center text-[10px] font-bold text-white" style={{ width: `${(dataGovernanceKPIs.classification_breakdown.interne / dataGovernanceKPIs.classified_documents) * 100}%` }}>Interne</div>
                <div className="bg-amber-400 flex items-center justify-center text-[10px] font-bold text-white" style={{ width: `${(dataGovernanceKPIs.classification_breakdown.restreint / dataGovernanceKPIs.classified_documents) * 100}%` }}>Restreint</div>
                <div className="bg-rose-400 flex items-center justify-center text-[10px] font-bold text-white" style={{ width: `${(dataGovernanceKPIs.classification_breakdown.confidentiel / dataGovernanceKPIs.classified_documents) * 100}%` }}>Confidentiel</div>
                <div className="bg-red-500 flex items-center justify-center text-[10px] font-bold text-white" style={{ width: `${(dataGovernanceKPIs.classification_breakdown.secret / dataGovernanceKPIs.classified_documents) * 100}%` }}>Secret</div>
              </div>
              <div className="grid grid-cols-5 gap-2 text-center text-[10px] text-foreground-500">
                <span>{dataGovernanceKPIs.classification_breakdown.public} docs</span>
                <span>{dataGovernanceKPIs.classification_breakdown.interne} docs</span>
                <span>{dataGovernanceKPIs.classification_breakdown.restreint} docs</span>
                <span>{dataGovernanceKPIs.classification_breakdown.confidentiel} docs</span>
                <span>{dataGovernanceKPIs.classification_breakdown.secret} docs</span>
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB 3 : VERSIONING ===== */}
        {activeTab === 'versioning' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <i className="ri-git-branch-line text-green-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">KOS Versioning System™</h3>
                  <p className="text-xs text-gray-400">{versioningRules.length} règles de versioning · {dataGovernanceKPIs.versioned_documents} documents versionnés · {dataGovernanceKPIs.versioning_coverage_pct}% couverture</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {versioningRules.map((rule) => (
                <div key={rule.id} className="rounded-xl bg-background-50 border border-background-200/70 p-5 hover:border-background-300/60 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">{rule.rule_name}</h4>
                      <p className="text-xs text-foreground-500">{rule.version_pattern}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 font-bold">{rule.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="p-3 bg-background-100 rounded-lg">
                      <span className="block text-lg font-bold text-foreground-950 break-all">{rule.current_version}</span>
                      <span className="text-[10px] text-foreground-500">Version actuelle</span>
                    </div>
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <span className="block text-sm font-medium text-foreground-700">{rule.author}</span>
                      <span className="text-[10px] text-foreground-500">Auteur</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-background-200/50">
                    <p className="text-xs text-foreground-500 mb-1">Dernier changement ({new Date(rule.last_modified).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })})</p>
                    <p className="text-xs text-foreground-600 leading-relaxed">{rule.change_summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== TAB 4 : AUDIT JOURNAL ===== */}
        {activeTab === 'journal' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <i className="ri-file-list-3-line text-amber-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">KOS Audit Journal™</h3>
                  <p className="text-xs text-gray-400">{auditJournal.length} entrées · {dataGovernanceKPIs.journal_entries_30d} entrées/30j · Traçabilité {dataGovernanceKPIs.traceability_score_pct}%</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Horodatage</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Acteur</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Action</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Ressource</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Détails</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Classification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="border-t border-background-100 hover:bg-background-50">
                        <td className="px-4 py-3 text-xs text-foreground-500 whitespace-nowrap">{new Date(log.timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                        <td className="px-4 py-3 text-xs font-medium text-foreground-950 max-w-[180px] truncate">{log.actor}</td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-bold whitespace-nowrap">{log.action}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-foreground-600 max-w-[160px] truncate">{log.resource_id}</td>
                        <td className="px-4 py-3 text-xs text-foreground-600 max-w-[280px] truncate">{log.details}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${getClassificationBadge(log.classification)}`}>{log.classification}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB 5 : RETENTION & ARCHIVING ===== */}
        {activeTab === 'retention' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                  <i className="ri-archive-line text-rose-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">KOS Retention & Archiving Policy™</h3>
                  <p className="text-xs text-gray-400">{retentionPolicies.length} politiques · {dataGovernanceKPIs.retention_compliance_pct}% conformité · {dataGovernanceKPIs.compliance_frameworks.length} frameworks</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {dataGovernanceKPIs.compliance_frameworks.map((fw) => (
                  <span key={fw} className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10">{fw}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {retentionPolicies.map((pol) => (
                <div key={pol.id} className="rounded-xl bg-background-50 border border-background-200/70 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-sm font-bold text-foreground-950">{pol.data_category}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${pol.compliance_status.includes('Conforme') ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>{pol.compliance_status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="p-3 bg-rose-50/50 rounded-lg border border-rose-100 text-center">
                      <span className="block text-lg font-bold text-rose-600">{pol.retention_years} ans</span>
                      <span className="text-[10px] text-foreground-500">Rétention</span>
                    </div>
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <span className="block text-xs font-medium text-foreground-700 leading-tight">{pol.legal_basis}</span>
                      <span className="text-[10px] text-foreground-500">Base légale</span>
                    </div>
                  </div>
                  <div className="space-y-2 pt-3 border-t border-background-200/50">
                    <div className="flex items-start gap-2">
                      <i className="ri-inbox-archive-line text-xs text-foreground-400 mt-0.5"></i>
                      <p className="text-xs text-foreground-600">{pol.archival_rule}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <i className="ri-delete-bin-line text-xs text-foreground-400 mt-0.5"></i>
                      <p className="text-xs text-foreground-600">{pol.destruction_method}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== TAB 6 : QUALITY & TRACEABILITY ===== */}
        {activeTab === 'quality' && (
          <div className="space-y-6">
            {/* Quality Dimensions */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <i className="ri-bar-chart-2-line text-accent-400 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Data Quality Scorecard™</h3>
                  <p className="text-xs text-gray-400">Score global {dataGovernanceKPIs.data_quality_score}/100 · {dataGovernanceKPIs.compliance_frameworks.length} frameworks · Audit {new Date(dataGovernanceKPIs.last_full_audit).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dataQualityMetrics.map((dim) => (
                <div key={dim.dimension} className="rounded-xl bg-background-50 border border-background-200/70 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-foreground-950">{dim.dimension}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      dim.trend === 'improving' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-background-100 text-foreground-600 border-background-200'
                    }`}>
                      {dim.trend === 'improving' ? '▲' : '→'} {dim.trend === 'improving' ? 'En progression' : 'Stable'}
                    </span>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-bold text-foreground-950">{dim.score}</span>
                    <span className="text-xs text-foreground-400 mb-1">/100 · Cible {dim.target}</span>
                  </div>
                  <div className="h-2 bg-background-200/70 rounded-full overflow-hidden mb-2">
                    <div className={`h-full rounded-full ${getQualityColor(dim.score)}`} style={{ width: `${dim.score}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-foreground-400">
                    <span>{dim.issues} issues</span>
                    <span>Écart cible : {dim.target - dim.score} pts</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Data Lineage */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-100 text-cyan-700">
                  <i className="ri-flow-chart text-lg"></i>
                </div>
                <h4 className="text-sm font-bold text-foreground-950">Data Lineage — Traçabilité des Flux de Données</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Source</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Transformation</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Destination</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Dernière Synchro</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Fréquence</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataLineageExamples.map((lin) => (
                      <tr key={lin.id} className="border-t border-background-100">
                        <td className="px-4 py-3 text-xs font-medium text-foreground-950 max-w-[180px] truncate">{lin.source}</td>
                        <td className="px-4 py-3 text-xs text-foreground-600 max-w-[160px] truncate">{lin.transformation}</td>
                        <td className="px-4 py-3 text-xs text-foreground-600 max-w-[160px] truncate">{lin.destination}</td>
                        <td className="px-4 py-3 text-xs text-foreground-500 whitespace-nowrap">{new Date(lin.last_sync).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                        <td className="px-4 py-3 text-xs text-foreground-500 whitespace-nowrap">{lin.sync_frequency}</td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 font-bold">{lin.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer KPIs */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Indicateurs Clés — Data Governance Framework</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Datasets Catalogués</div>
              <div className="text-lg font-bold text-cyan-600">{dataGovernanceKPIs.cataloged_datasets}</div>
              <div className="text-[10px] text-foreground-400 mt-2">{dataCatalog.reduce((s, d) => s + d.entities, 0).toLocaleString('fr-FR')} entités</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Classification</div>
              <div className="text-lg font-bold text-green-600">{dataGovernanceKPIs.classification_coverage_pct}%</div>
              <div className="text-[10px] text-foreground-400 mt-2">{dataGovernanceKPIs.classified_documents} documents</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Versioning</div>
              <div className="text-lg font-bold text-amber-600">{dataGovernanceKPIs.versioning_coverage_pct}%</div>
              <div className="text-[10px] text-foreground-400 mt-2">{dataGovernanceKPIs.versioned_documents} docs versionnés</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Traçabilité</div>
              <div className="text-lg font-bold text-teal-600">{dataGovernanceKPIs.traceability_score_pct}%</div>
              <div className="text-[10px] text-foreground-400 mt-2">{dataGovernanceKPIs.journal_entries_30d} entrées/30j</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Rétention</div>
              <div className="text-lg font-bold text-rose-600">{dataGovernanceKPIs.retention_compliance_pct}%</div>
              <div className="text-[10px] text-foreground-400 mt-2">{retentionPolicies.length} politiques</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Qualité Données</div>
              <div className="text-lg font-bold text-accent-600">{dataGovernanceKPIs.data_quality_score}/100</div>
              <div className="text-[10px] text-foreground-400 mt-2">6 dimensions</div>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





