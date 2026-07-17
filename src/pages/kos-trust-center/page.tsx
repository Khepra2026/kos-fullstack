import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import {
  trustCertifications,
  trustReferences,
  trustQualityIndicators,
  trustMethodologies,
  trustKPIs,
} from '@/mocks/kosTrustCenter';

type Tab = 'methodologies' | 'certifications' | 'references' | 'quality';

export default function KOSTrustCenterPage() {
  const [activeTab, setActiveTab] = useState<Tab>('methodologies');
  const [expandedMethodology, setExpandedMethodology] = useState<string | null>(null);

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'methodologies', label: 'Méthodologies', icon: 'ri-book-open-line', count: trustMethodologies.length },
    { id: 'certifications', label: 'Certifications', icon: 'ri-verified-badge-line', count: trustCertifications.length },
    { id: 'references', label: 'Références', icon: 'ri-double-quotes-l', count: trustReferences.length },
    { id: 'quality', label: 'Indicateurs Qualité', icon: 'ri-bar-chart-line', count: trustQualityIndicators.length },
  ];

  const getScoreColor = (score: number, threshold: number = 80) => {
    if (score >= threshold) return 'text-green-600';
    if (score >= threshold - 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      active: 'bg-green-100 text-green-700 border-green-200',
      in_progress: 'bg-amber-100 text-amber-700 border-amber-200',
      planned: 'bg-slate-100 text-slate-600 border-slate-200',
    };
    return map[status] || map.planned;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return 'ri-arrow-up-line text-green-600';
    if (trend === 'down') return 'ri-arrow-down-line text-red-600';
    return 'ri-arrow-right-line text-foreground-400';
  };

  return (
    <KOSHubLayout hubId={64}>
      <SeoHead
        title="Trust Center™ — Méthodologies, Certifications & Références | KHEPRA EXPERTS"
        description="Centre de confiance institutionnelle KHEPRA EXPERTS : 10 méthodologies propriétaires niveau Big Four, 8 certifications internationales (ISO 9001, ISO 37000, ISO 20700, GAFI, RGPD), références clients, 10 indicateurs qualité temps réel."
        keywords="Trust Center KHEPRA, méthodologies Big Four, certifications ISO, références conseil Afrique, qualité institutionnelle, KHEPRA EXPERTS"
        canonicalPath="/kos-trust-center"
      />

      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold mb-4">
                <i className="ri-medal-line"></i>
                KOS Enterprise — BLOC 8
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                Trust Center™
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Méthodologies propriétaires, certifications internationales, références clients et indicateurs qualité — 
                la confiance institutionnelle KHEPRA EXPERTS, vérifiable et transparente.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{trustKPIs.total_certifications}</div>
                <div className="text-xs text-foreground-500">Certifications</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{trustKPIs.missions_completed}</div>
                <div className="text-xs text-foreground-500">Missions</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{trustKPIs.countries_covered}</div>
                <div className="text-xs text-foreground-500">Pays</div>
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
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-background-50'
                    : 'text-foreground-600 hover:bg-background-100'
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
        {/* Methodologies Tab */}
        {activeTab === 'methodologies' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              {trustMethodologies.map((meth) => (
                <button
                  key={meth.id}
                  onClick={() => setExpandedMethodology(expandedMethodology === meth.id ? null : meth.id)}
                  className={`w-full text-left p-4 rounded-lg border cursor-pointer transition-colors ${
                    expandedMethodology === meth.id
                      ? 'border-accent-300 bg-accent-50/50'
                      : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                      <i className={`${meth.icon} text-sm`}></i>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">
                      {meth.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{meth.title}</h4>
                  <p className="text-xs text-foreground-500 mt-1 line-clamp-1">{meth.subtitle}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-foreground-400">
                    <span>{meth.sections_count} sections</span>
                    <span>·</span>
                    <span>{meth.deliverables_count} livrables</span>
                    <span>·</span>
                    <span>{meth.standards.length} standards</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="lg:col-span-2">
              {expandedMethodology ? (
                (() => {
                  const meth = trustMethodologies.find((m) => m.id === expandedMethodology)!;
                  return (
                    <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-medium">
                          {meth.category}
                        </span>
                        <span className="text-sm text-foreground-400">{meth.sections_count} sections · {meth.deliverables_count} livrables</span>
                      </div>
                      <h2 className="text-lg font-bold text-foreground-950 mb-1">{meth.title}</h2>
                      <p className="text-sm text-foreground-600 mb-6">{meth.subtitle}</p>

                      <div className="mb-5">
                        <h4 className="text-sm font-semibold text-foreground-950 mb-2 flex items-center gap-2">
                          <i className="ri-file-list-3-line text-accent-500"></i>
                          Standards & Référentiels
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {meth.standards.map((s, i) => (
                            <span key={i} className="text-xs px-2 py-1 rounded-full bg-accent-50 border border-accent-200 text-accent-700">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-5">
                        <h4 className="text-sm font-semibold text-foreground-950 mb-2 flex items-center gap-2">
                          <i className="ri-check-double-line text-green-600"></i>
                          Niveaux de Maturité
                        </h4>
                        <div className="space-y-2">
                          {[
                            { level: 'Niveau 1 — Non conforme', desc: 'Absence de dispositif structuré. Écarts critiques.' },
                            { level: 'Niveau 2 — Partiellement conforme', desc: 'Dispositif existant mais lacunaire. Actions correctives requises.' },
                            { level: 'Niveau 3 — Conforme', desc: 'Dispositif robuste. Documentation complète.' },
                            { level: 'Niveau 4 — Excellent', desc: 'Dispositif de référence. Pratiques exemplaires reconnues.' },
                          ].map((m, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-background-100 rounded-lg">
                              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-foreground-950 text-background-50 flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold">{i + 1}</span>
                              </div>
                              <div>
                                <span className="text-xs font-semibold text-foreground-900">{m.level}</span>
                                <p className="text-xs text-foreground-500 mt-0.5">{m.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-foreground-950 mb-2 flex items-center gap-2">
                          <i className="ri-folder-line text-amber-600"></i>
                          Livrables Types
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {Array.from({ length: meth.deliverables_count }).map((_, i) => (
                            <span key={i} className="text-xs px-2 py-1 rounded-full bg-background-100 border border-background-200 text-foreground-600">
                              Livrable {i + 1}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="flex items-center justify-center h-full min-h-[300px] bg-background-50 rounded-lg border border-background-200/70">
                  <div className="text-center">
                    <i className="ri-book-open-line text-5xl text-foreground-200 mb-4 block"></i>
                    <p className="text-foreground-500 text-sm">Sélectionnez une méthodologie pour voir le détail</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-green-600">{trustKPIs.active_certifications}</div>
                <div className="text-xs text-foreground-500">Actives</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-amber-600">{trustKPIs.in_progress_certifications}</div>
                <div className="text-xs text-foreground-500">En Cours</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-foreground-950">{trustKPIs.avg_certification_score}%</div>
                <div className="text-xs text-foreground-500">Score Moyen</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-accent-500">{trustKPIs.total_certifications}</div>
                <div className="text-xs text-foreground-500">Total</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trustCertifications.map((cert) => (
                <div key={cert.id} className="bg-background-50 rounded-lg border border-background-200/70 p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent-100 text-accent-700 flex-shrink-0">
                      <i className={`${cert.issuer_logo} text-xl`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-foreground-950">{cert.name}</h3>
                      <p className="text-xs text-foreground-500 mt-0.5">{cert.issuer}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium border whitespace-nowrap ${getStatusBadge(cert.status)}`}>
                      {cert.status === 'active' ? 'Active' : cert.status === 'in_progress' ? 'En Cours' : 'Planifiée'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground-400">Score de conformité</span>
                    <span className={`text-lg font-bold ${getScoreColor(cert.score)}`}>{cert.score}/100</span>
                  </div>
                  <div className="w-full h-2 bg-background-200/70 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full transition-all ${cert.score >= 90 ? 'bg-green-500' : cert.score >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${cert.score}%` }}
                    />
                  </div>

                  <p className="text-xs text-foreground-600 mb-2 line-clamp-2">{cert.description}</p>
                  <div className="flex items-center gap-3 text-xs text-foreground-400">
                    <span><i className="ri-global-line mr-1"></i>{cert.scope}</span>
                  </div>
                  {cert.valid_until !== '—' && (
                    <div className="text-xs text-foreground-400 mt-1">
                      <i className="ri-calendar-line mr-1"></i>Valide jusqu'au {cert.valid_until}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References Tab */}
        {activeTab === 'references' && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-foreground-950">{trustKPIs.total_references}</div>
                <div className="text-xs text-foreground-500">Références</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-accent-500">{trustKPIs.missions_completed}</div>
                <div className="text-xs text-foreground-500">Missions Totales</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-foreground-950">{trustKPIs.countries_covered}</div>
                <div className="text-xs text-foreground-500">Pays Couverts</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-2xl font-bold text-green-600">{trustKPIs.client_retention}%</div>
                <div className="text-xs text-foreground-500">Rétention Client</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trustReferences.map((ref) => (
                <div key={ref.id} className="bg-background-50 rounded-lg border border-background-200/70 p-5">
                  <div className="flex items-start gap-2 mb-3">
                    <i className="ri-double-quotes-l text-2xl text-accent-300 flex-shrink-0"></i>
                    <div>
                      <p className="text-sm text-foreground-700 italic leading-relaxed">« {ref.testimonial} »</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-medium">{ref.sector}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{ref.country}</span>
                    <span className="text-xs text-foreground-400">{ref.year}</span>
                  </div>

                  <h3 className="text-sm font-bold text-foreground-950 mb-1">{ref.client_name}</h3>
                  <p className="text-xs text-foreground-500 mb-3">{ref.contact_role}</p>

                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200">
                    <span className="text-xs text-foreground-400">{ref.impact_metric}</span>
                    <span className="text-sm font-bold text-green-700">{ref.impact_value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quality Indicators Tab */}
        {activeTab === 'quality' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trustQualityIndicators.map((kpi) => (
                <div key={kpi.id} className="bg-background-50 rounded-lg border border-background-200/70 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                      <i className={`${kpi.icon} text-lg`}></i>
                    </div>
                    <div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{kpi.category}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground-950 mb-3">{kpi.name}</h3>

                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <span className="text-3xl font-bold text-foreground-950">
                        {kpi.current_value}{kpi.id === 'kpi-quality' ? '/10' : kpi.id === 'kpi-certification' || kpi.id === 'kpi-missions' || kpi.id === 'kpi-countries' ? '' : '%'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <i className={getTrendIcon(kpi.trend)}></i>
                      <span className="text-foreground-400">Cible: {kpi.target_value}{kpi.id === 'kpi-quality' ? '/10' : kpi.id === 'kpi-certification' || kpi.id === 'kpi-missions' || kpi.id === 'kpi-countries' ? '' : '%'}</span>
                    </div>
                  </div>

                  <div className="w-full h-2 bg-background-200/70 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all ${kpi.current_value >= kpi.target_value * 0.95 ? 'bg-green-500' : kpi.current_value >= kpi.target_value * 0.8 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min((kpi.current_value / kpi.target_value) * 100, 100)}%` }}
                    />
                  </div>

                  <p className="text-xs text-foreground-500 mb-1">{kpi.description}</p>
                  <p className="text-xs text-foreground-400">{kpi.period}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer stats bar */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-4">Indice de Confiance Institutionnelle</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { label: 'Certifications', value: trustKPIs.active_certifications + '/' + trustKPIs.total_certifications, icon: 'ri-verified-badge-line' },
              { label: 'Score NPS', value: trustKPIs.avg_nps + '%', icon: 'ri-emotion-happy-line' },
              { label: 'Satisfaction', value: trustKPIs.avg_csat + '%', icon: 'ri-star-line' },
              { label: 'Rétention', value: trustKPIs.client_retention + '%', icon: 'ri-user-heart-line' },
              { label: 'Recommandation', value: trustKPIs.referral_rate + '%', icon: 'ri-share-forward-line' },
              { label: 'Missions', value: String(trustKPIs.missions_completed), icon: 'ri-briefcase-line' },
              { label: 'Pays', value: String(trustKPIs.countries_covered), icon: 'ri-global-line' },
              { label: 'Méthodologies', value: String(trustKPIs.total_methodologies), icon: 'ri-book-open-line' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-3 bg-background-50 rounded-lg border border-background-200/70">
                <i className={`${stat.icon} text-sm text-foreground-400 mb-1 block`}></i>
                <div className="text-lg font-bold text-foreground-950">{stat.value}</div>
                <div className="text-xs text-foreground-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}