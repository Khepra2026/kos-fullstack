import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useCyberSecurityAutomates } from '@/hooks/useCyberSecurityAutomates';
import type { cyberSecurityAutomate } from '@/hooks/useCyberSecurityAutomates';

function getStatusBadge(status: string) {
  switch (status) {
    case 'deployed': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Déployé', dot: 'bg-emerald-500' };
    case 'partial': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Partiel', dot: 'bg-amber-500' };
    case 'mock': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', label: 'Mock', dot: 'bg-slate-400' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Critique', dot: 'bg-red-500' };
    case 'high': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Haute', dot: 'bg-amber-500' };
    case 'medium': return { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', label: 'Moyenne', dot: 'bg-teal-500' };
    case 'low': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-500', label: 'Basse', dot: 'bg-slate-400' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

export default function cyberSecurityAutomatesPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const { automates, categories, kpis, isLive, loading, error, refetch } = useCyberSecurityAutomates();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredAutomates = useMemo(() => {
    let list = automates;
    if (categoryFilter !== 'all') list = list.filter(a => a.category === categoryFilter);
    if (statusFilter !== 'all') list = list.filter(a => a.status === statusFilter);
    return list;
  }, [automates, categoryFilter, statusFilter]);

  const categoryStats = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      count: automates.filter(a => a.category === cat.id).length,
      deployed: automates.filter(a => a.category === cat.id && a.status === 'deployed').length,
      partial: automates.filter(a => a.category === cat.id && a.status === 'partial').length,
    }));
  }, [automates, categories]);

  const totalDeployed = automates.filter(a => a.status === 'deployed').length;
  const totalPartial = automates.filter(a => a.status === 'partial').length;

  const highRiskCategories = ['network-security', 'app-security', 'data-security'];

  return (
    <hubLayout hubId={52}>
      <SeoHead
        title="KOS Cyber Security Automates™ — Bouclier Numérique | KHEPRA EXPERTS"
        description="Registre des 24 automates cybersécurité KOS : réseau, AppSec, cloud, incident response, data security, IAM, conformité, threat intelligence. 85,240+ tâches. Firewall, SAST/DAST, DLP, SIEM, SOC."
        keywords="KOS Cyber Security Automates, cybersécurité automatisée, firewall orchestrator, AppSec SAST DAST, SIEM, DLP, IAM, conformité ISO 27001, threat intelligence, KHEPRA EXPERTS"
        canonicalPath="/kos-cyber-security-automates"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=abstract%20dark%20cybersecurity%20command%20center%20visualization%20with%20glowing%20network%20defense%20grid%20and%20threat%20detection%20matrix%2C%20warm%20crimson%20and%20deep%20emerald%20security%20orchestration%20layers%2C%20sophisticated%20SOC%20operations%20aesthetic%20with%20geometric%20firewall%20patterns%20and%20data%20protection%20shield%20visualization%2C%20premium%20infosec%20atmosphere%20with%20encrypted%20data%20flow%20streams%20and%20zero%20trust%20architecture%20nodes%2C%20no%20text%20no%20human%20figures%2C%20clean%20professional%20cyber%20defense%20composition&width=1920&height=600&seq=kos-cybersec-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-18"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/60 via-foreground-950/80 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                <i className="ri-shield-cross-line text-red-400 text-sm" />
                <span className="text-sm font-semibold text-red-300 uppercase tracking-wider">
                  KOS Cyber Security Automates™
                </span>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm ${
                isLive ? 'bg-emerald-500/20 border border-emerald-400/30' : 'bg-amber-500/20 border border-amber-400/30'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span className={`text-sm font-semibold uppercase tracking-wider ${isLive ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {isLive ? 'DONNÉES LIVE — SUPABASE' : 'DONNÉES MOCK — DÉMO'}
                </span>
              </div>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Votre bouclier numérique.
              <span className="block text-red-400 mt-2">24 automates cybersécurité.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              <strong className="text-white">{kpis.total_agents} automates</strong> répartis sur <strong className="text-white">{kpis.categories} domaines</strong> de cybersécurité.{' '}
              Protection périmétrique, sécurité applicative, réponse aux incidents, conformité et threat intelligence.{' '}
              <strong className="text-white">{kpis.total_tasks.toLocaleString()}+ tâches</strong> complétées.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm text-emerald-300 font-semibold">{totalDeployed} Déployés</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-sm text-amber-300 font-semibold">{totalPartial} Partiels</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                <i className="ri-robot-line text-red-400" />
                <span className="text-sm text-red-300 font-semibold">{kpis.auto_enabled} Auto</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-400/30 backdrop-blur-sm">
                <span className="text-sm text-teal-300 font-semibold">{kpis.avg_success_rate}% succès</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/20 border border-rose-400/30 backdrop-blur-sm">
                <i className="ri-error-warning-line text-rose-400" />
                <span className="text-sm text-rose-300 font-semibold">{kpis.critical_agents} Critiques</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-4 bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-10 gap-3">
            {[
              { label: 'Total', value: String(kpis.total_agents), icon: 'ri-shield-cross-line', color: '#DC2626' },
              { label: 'Déployés', value: String(kpis.deployed), icon: 'ri-checkbox-circle-line', color: '#86BC25' },
              { label: 'Partiels', value: String(kpis.partial), icon: 'ri-time-line', color: '#E8C547' },
              { label: 'Auto', value: String(kpis.auto_enabled), icon: 'ri-refresh-line', color: '#EA580C' },
              { label: 'Tâches', value: (kpis.total_tasks / 1000).toFixed(0) + 'K', icon: 'ri-task-line', color: '#BE123C' },
              { label: 'Critiques', value: String(kpis.critical_agents), icon: 'ri-error-warning-line', color: '#DC2626' },
              { label: 'Vulns bloquées', value: (kpis.vulns_blocked / 1000).toFixed(0) + 'K', icon: 'ri-shield-check-line', color: '#059669' },
              { label: 'Incidents', value: (kpis.incidents_mitigated / 1000).toFixed(1) + 'K', icon: 'ri-alert-line', color: '#EA580C' },
              { label: 'Menaces', value: (kpis.threats_detected / 1000).toFixed(1) + 'K', icon: 'ri-spy-line', color: '#BE123C' },
              { label: 'Catégories', value: String(kpis.categories), icon: 'ri-stack-line', color: '#9B7B2C' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-2 rounded-lg bg-white/5 border border-white/5">
                <i className={`${stat.icon} text-sm mb-1 block`} style={{ color: stat.color }} />
                <span className="block text-lg font-bold text-white font-heading">{stat.value}</span>
                <span className="text-[10px] text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category & Status Filters */}
      <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider whitespace-nowrap">Domaine</span>
            <div className="flex gap-1 overflow-x-auto w-full flex-wrap">
              <button onClick={() => setCategoryFilter('all')} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${categoryFilter === 'all' ? 'bg-foreground-950 text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'}`}>
                Tout ({kpis.total_agents})
              </button>
              {categoryStats.map(cat => (
                <button key={cat.id} onClick={() => setCategoryFilter(cat.id)} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${categoryFilter === cat.id ? 'text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'}`} style={categoryFilter === cat.id ? { backgroundColor: cat.color } : {}}>
                  <i className={`${cat.icon} mr-1`} />{cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider whitespace-nowrap self-center">Statut</span>
            <button onClick={() => setStatusFilter('all')} className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${statusFilter === 'all' ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600'}`}>Tous</button>
            <button onClick={() => setStatusFilter('deployed')} className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${statusFilter === 'deployed' ? 'bg-emerald-600 text-white' : 'bg-white border border-background-200 text-foreground-600'}`}>Déployés ({totalDeployed})</button>
            <button onClick={() => setStatusFilter('partial')} className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${statusFilter === 'partial' ? 'bg-amber-600 text-white' : 'bg-white border border-background-200 text-foreground-600'}`}>Partiels ({totalPartial})</button>
          </div>
        </div>
      </section>

      {/* Category Overview Grid */}
      <section className="py-8 sm:py-10 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              8 Domaines — Défense Cyber Complète
            </h2>
            <p className="text-foreground-600">Du périmètre réseau à la threat intelligence, chaque couche de sécurité est automatisée et monitorée en continu.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryStats.map(cat => {
              const deployPct = cat.count > 0 ? Math.round((cat.deployed / cat.count) * 100) : 0;
              const isCritical = highRiskCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => { setCategoryFilter(cat.id); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                  className="rounded-2xl bg-white border border-background-200 p-5 text-center hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
                >
                  {isCritical && (
                    <div className="absolute top-3 right-3">
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold border border-red-200">CRITIQUE</span>
                    </div>
                  )}
                  <div className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                    <i className={`${cat.icon} text-2xl`} style={{ color: cat.color }} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-1 font-heading">{cat.name}</h3>
                  <p className="text-xs text-foreground-500 line-clamp-3 mb-3">{cat.description}</p>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span style={{ color: '#86BC25' }} className="font-bold">{cat.deployed} déployés</span>
                    {cat.partial > 0 && (
                      <>
                        <span className="text-foreground-300">·</span>
                        <span style={{ color: '#E8C547' }} className="font-bold">{cat.partial} partiels</span>
                      </>
                    )}
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-background-100 mt-2 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${deployPct}%` }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Automates Grid */}
      <section className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-background-200 border-t-red-500 rounded-full animate-spin" />
              <p className="text-sm text-foreground-500">Chargement des 24 automates cybersécurité...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100">
                <i className="ri-error-warning-line text-red-600 text-2xl" />
              </div>
              <p className="text-sm text-foreground-700 font-medium">Erreur de chargement</p>
              <p className="text-xs text-foreground-500 max-w-md text-center">{error}</p>
              <button onClick={refetch} className="px-5 py-2.5 rounded-full bg-foreground-950 text-background-50 text-sm font-medium hover:bg-foreground-800 transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-refresh-line mr-2" />Réessayer
              </button>
              <p className="text-xs text-foreground-400 mt-2">Affichage des données mock en secours</p>
            </div>
          )}

          {/* Data */}
          {!loading && !error && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold text-foreground-950">
                  {filteredAutomates.length} Automate{filteredAutomates.length > 1 ? 's' : ''}
                  {categoryFilter !== 'all' && <span className="text-foreground-400 font-normal"> — {categories.find(c => c.id === categoryFilter)?.name}</span>}
                </h2>
                <span className="text-xs text-foreground-400">{kpis.total_tasks.toLocaleString()} tâches cumulées</span>
              </div>

              {filteredAutomates.length === 0 ? (
                <div className="text-center py-16">
                  <i className="ri-inbox-line text-5xl text-foreground-200 mb-4 block" />
                  <p className="text-foreground-400">Aucun automate ne correspond aux filtres.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredAutomates.map((automate: cyberSecurityAutomate) => {
                    const badge = getStatusBadge(automate.status);
                    const priorityB = getPriorityBadge(automate.priority);
                    const isExpanded = expandedId === automate.id;
                    const scoreColor = automate.success_rate >= 90 ? '#86BC25' : automate.success_rate >= 75 ? '#E8C547' : '#C2410C';

                    return (
                      <div key={automate.id} className={`rounded-2xl border transition-all duration-300 ${
                        isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200 hover:shadow-md'
                      }`}>
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : automate.id)}
                          className="w-full p-5 text-left cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${automate.color}15` }}>
                              <i className={`${automate.icon} text-lg`} style={{ color: automate.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="text-sm font-bold text-foreground-950">{automate.name}</h3>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${badge.bg} ${badge.border} ${badge.text}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                                  {badge.label}
                                </span>
                                {automate.priority === 'critical' && (
                                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold flex-shrink-0 ${priorityB.bg} ${priorityB.border} ${priorityB.text}`}>
                                    <span className={`w-1 h-1 rounded-full ${priorityB.dot}`} />
                                    {priorityB.label}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-foreground-600 line-clamp-2">{automate.description}</p>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {automate.tech_stack.slice(0, 4).map(tech => (
                                  <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{tech}</span>
                                ))}
                                {automate.tech_stack.length > 4 && (
                                  <span className="text-[10px] text-foreground-400">+{automate.tech_stack.length - 4}</span>
                                )}
                              </div>
                              <div className="flex items-center justify-between mt-3 text-xs">
                                <div className="flex items-center gap-3">
                                  <span className="flex items-center gap-1">
                                    <span className="font-bold font-heading" style={{ color: scoreColor }}>{automate.success_rate}%</span>
                                    <span className="text-foreground-400">succès</span>
                                  </span>
                                  <span className="text-foreground-400">{automate.tasks_completed.toLocaleString()} tâches</span>
                                </div>
                                <span className={`flex items-center gap-1 ${automate.auto_enabled ? 'text-emerald-600' : 'text-foreground-300'}`}>
                                  <i className={`text-xs ${automate.auto_enabled ? 'ri-refresh-fill' : 'ri-refresh-line'}`} />
                                  {automate.auto_enabled ? 'Auto' : 'Manuel'}
                                </span>
                              </div>
                            </div>
                            <div className="flex-shrink-0 pt-2">
                              <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                            </div>
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-5 pb-5 border-t border-background-200 pt-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              {/* Capabilities */}
                              <div>
                                <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Capacités</h5>
                                <div className="flex flex-wrap gap-1.5">
                                  {automate.capabilities.map(cap => (
                                    <span key={cap} className="text-[10px] px-2 py-1 rounded-full bg-background-100 text-foreground-600 border border-background-200">{cap}</span>
                                  ))}
                                </div>
                              </div>

                              {/* KPIs */}
                              {automate.kpis.length > 0 && (
                                <div>
                                  <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">KPIs</h5>
                                  <div className="space-y-1.5">
                                    {automate.kpis.map((kpi, j) => (
                                      <div key={j} className="flex items-center justify-between p-2 rounded-lg bg-background-50 border border-background-100">
                                        <div className="flex items-center gap-1.5">
                                          <i className={`${kpi.icon} text-[10px]`} style={{ color: automate.color }} />
                                          <span className="text-[10px] text-foreground-600">{kpi.label}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-foreground-950">{kpi.current}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="mt-3 flex items-center gap-4 text-[10px] text-foreground-400 pt-3 border-t border-background-100">
                              <span><i className="ri-git-branch-line mr-1" />{automate.version}</span>
                              {automate.last_execution && (
                                <span><i className="ri-time-line mr-1" />{new Date(automate.last_execution).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Defense-in-Depth Architecture */}
      <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              Architecture Defense-in-Depth — 8 Couches de Protection
            </h2>
            <p className="text-foreground-600">Chaque couche est automatisée, monitorée et corrélée pour une défense cyber holistique.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[
              { id: 'network-security', label: 'Périmètre Réseau', icon: 'ri-radar-line', color: '#059669', desc: 'Firewall · IDS/IPS · DDoS' },
              { id: 'app-security', label: 'Sécurité Applicative', icon: 'ri-code-s-slash-line', color: '#DC2626', desc: 'SAST · DAST · SCA/SBOM' },
              { id: 'cloud-security', label: 'Sécurité Cloud', icon: 'ri-cloud-off-line', color: '#0D7B5F', desc: 'CSPM · Conteneurs · API' },
              { id: 'incident-response', label: 'Détection & Réponse', icon: 'ri-alert-line', color: '#EA580C', desc: 'SIEM · SOC · Forensics' },
              { id: 'data-security', label: 'Protection Données', icon: 'ri-lock-password-line', color: '#8B3040', desc: 'DLP · Crypto · DB Monitor' },
              { id: 'iam', label: 'Gestion des Accès', icon: 'ri-user-settings-line', color: '#9B7B2C', desc: 'MFA · PAM · Access Review' },
              { id: 'compliance-audit', label: 'Conformité', icon: 'ri-file-list-3-line', color: '#C05A3A', desc: 'ISO 27001 · SOC2 · Veille' },
              { id: 'threat-intel', label: 'Threat Intelligence', icon: 'ri-spy-line', color: '#BE123C', desc: 'CTI · Dark Web · TTPs' },
            ].map(layer => {
              const count = automates.filter(a => a.category === layer.id).length;
              const deployed = automates.filter(a => a.category === layer.id && a.status === 'deployed').length;
              return (
                <div key={layer.id} className="rounded-2xl bg-white border border-background-200 p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: layer.color }} />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${layer.color}15` }}>
                    <i className={`${layer.icon} text-xl`} style={{ color: layer.color }} />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-foreground-950 mb-1">{layer.label}</h3>
                  <p className="text-xs text-foreground-500 mb-3">{layer.desc}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold" style={{ color: '#86BC25' }}>{deployed}/{count}</span>
                    <span className="text-foreground-400">déployés</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-link */}
      <section className="py-12 sm:py-16 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              Écosystème KOS — Sécurité & Opérations
            </h2>
            <p className="text-foreground-600">Accès rapide aux modules connexes de sécurité et d'automatisation.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Cyber Security Automates', path: '/kos-cyber-security-automates', icon: 'ri-shield-cross-line', color: '#DC2626', current: true },
              { label: 'Security Command', path: '/kos-security-command', icon: 'ri-shield-check-line', color: '#059669' },
              { label: 'Fullstack Dev Automates', path: '/kos-fullstack-dev-automates', icon: 'ri-terminal-box-line', color: '#4F46E5' },
              { label: 'Web Ops Automates', path: '/kos-web-ops-automates', icon: 'ri-server-line', color: '#0D7B5F' },
              { label: 'Correction Engine', path: '/kos-correction-engine', icon: 'ri-tools-line', color: '#C05A3A' },
              { label: 'AI Governance & Ethics', path: '/kos-ai-governance-ethics', icon: 'ri-scales-line', color: '#9B7B2C' },
              { label: 'Enterprise Brain OS', path: '/kos-enterprise-brain-os', icon: 'ri-brain-line', color: '#8B3040' },
              { label: 'Control Tower Automation', path: '/kos-control-tower-automation', icon: 'ri-radar-line', color: '#EA580C' },
            ].map(link => (
              <a key={link.path} href={link.path} className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${
                link.current ? 'border-red-300 bg-red-50/40 ring-2 ring-red-400' : 'border-background-200 bg-background-50 hover:border-foreground-200'
              }`}>
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                {link.current && (
                  <span className="block text-[10px] text-red-600 font-bold mt-1">Vous êtes ici</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}



