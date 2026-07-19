import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useBusinessOpportunityIntelligence } from '@/hooks/useBusinessOpportunityIntelligence';
import type { BusinessIntelAgent, BusinessIntelKPI } from '@/hooks/useBusinessOpportunityIntelligence';

function formatFCFA(value: number): string {
  if (value >= 1000000000) return (value / 1000000000).toFixed(1) + ' Md';
  if (value >= 1000000) return (value / 1000000).toFixed(0) + ' M';
  if (value >= 1000) return (value / 1000).toFixed(0) + ' K';
  return String(value);
}

function formatNumber(value: number): string {
  if (value >= 1000000000) return (value / 1000000000).toFixed(1) + 'B';
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
  if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
  return String(value);
}

export default function businessOpportunityIntelligencePage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const {
    agents,
    monitoredEntities,
    validationLevels,
    businessKPIs,
    globalMetrics,
    livrableStandards,
    isLive,
    loading,
    error,
    refetch,
  } = useBusinessOpportunityIntelligence();

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [kpiView, setKpiView] = useState<string>('all');

  const deployedAgents = agents.filter(a => a.status === 'deployed').length;
  const inProgressAgents = agents.filter(a => a.status === 'in_progress').length;
  const avgMaturity = Math.round(agents.reduce((sum, a) => sum + a.maturity, 0) / agents.length);

  const kpiCategories = useMemo(() => {
    const cats = [...new Set(businessKPIs.map(k => k.category))];
    return cats;
  }, [businessKPIs]);

  const filteredKPIs = kpiView === 'all' ? businessKPIs : businessKPIs.filter(k => k.category === kpiView);

  const kpiCategoryLabels: Record<string, { label: string; icon: string }> = {
    opportunites: { label: 'Opportunités', icon: 'ri-file-search-line' },
    partenariats: { label: 'Partenariats', icon: 'ri-team-line' },
    marketing: { label: 'Marketing', icon: 'ri-megaphone-line' },
    geo: { label: 'GEO/IA', icon: 'ri-robot-2-line' },
    dev_commercial: { label: 'Dev. Commercial', icon: 'ri-money-dollar-circle-line' },
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Déployé' };
      case 'in_progress': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'En cours' };
      case 'planned': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', dot: 'bg-slate-400', label: 'Planifié' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', dot: 'bg-gray-500', label: 'N/A' };
    }
  };

  return (
    <hubLayout hubId={65}>
      <SeoHead
        title="KOS Business Opportunity Intelligence™ — Master Prompt Big Four | KHEPRA EXPERTS"
        description="Plateforme d'intelligence économique et de développement commercial KOS. 10 agents autonomes : AO/AMI, partenariats stratégiques, recrutement experts, marketing digital, GEO visibility, social intelligence, veille financière, investisseurs, bailleurs ONU, expansion internationale. Standards McKinsey, BCG, Deloitte, PwC."
        keywords="KOS business intelligence, développement commercial Afrique, appels d'offres, partenariats stratégiques, recrutement experts, GEO visibility, veille financière BCEAO, expansion internationale, KHEPRA EXPERTS"
        canonicalPath="/kos-business-opportunity-intelligence"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-18 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20global%20business%20intelligence%20network%20visualization%20with%20interconnected%20glowing%20nodes%20representing%20market%20opportunities%20across%20Africa%20continent%20silhouette%2C%20warm%20amber%20gold%20and%20deep%20emerald%20green%20gradients%2C%20elegant%20data%20flow%20streams%20between%20corporate%20towers%20and%20financial%20institutions%2C%20sophisticated%20McKinsey%20BCG%20consulting%20firm%20aesthetic%2C%20clean%20minimalist%20dark%20composition%20with%20strategic%20opportunity%20mapping%2C%20no%20text%20no%20human%20figures&width=1920&height=600&seq=kos-business-opportunity-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-15"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/50 via-foreground-950/75 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <i className="ri-award-line text-amber-400 text-sm" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                  Master Prompt Big Four™
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
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Chaque opportunité détectée avant les concurrents.
              <span className="block text-amber-400 mt-2">Chaque décision éclairée par 10 agents autonomes.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              Programme d'intelligence économique et de développement commercial.{' '}
              <strong className="text-white">{globalMetrics.totalAgents} agents KOS</strong> déployés sur{' '}
              <strong className="text-white">{formatNumber(globalMetrics.organizationsMonitored)}+ organisations</strong> surveillées,{' '}
              <strong className="text-white">500+ plateformes d'AO</strong> scannées.{' '}
              <strong className="text-white">{globalMetrics.opportunitiesDetected} opportunités</strong> détectées par mois,{' '}
              <strong className="text-white">{formatNumber(globalMetrics.revenueGenerated)} FCFA</strong> générés.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="text-sm text-emerald-300 font-semibold">{deployedAgents}/10 agents déployés</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <span className="text-sm text-amber-300 font-semibold">{inProgressAgents} en progression</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="text-sm text-emerald-300 font-semibold">Maturité {avgMaturity}%</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="text-sm text-emerald-300 font-semibold">{formatNumber(globalMetrics.organizationsMonitored)}+ entités surveillées</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Metrics Bar */}
      <section className="py-3 bg-foreground-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { label: 'AO Détectés/mois', value: String(globalMetrics.opportunitiesDetected), icon: 'ri-file-search-line', color: '#E07B39' },
              { label: 'Leads Générés/mois', value: String(globalMetrics.leadsGenerated), icon: 'ri-user-add-line', color: '#10B981' },
              { label: 'Partenaires Qualifiés', value: String(globalMetrics.partnersQualified), icon: 'ri-team-line', color: '#3B82F6' },
              { label: 'Propositions/mois', value: String(globalMetrics.proposalsSubmitted), icon: 'ri-file-text-line', color: '#14B8A6' },
              { label: 'Contrats Gagnés/mois', value: String(globalMetrics.contractsWon), icon: 'ri-trophy-line', color: '#F97316' },
              { label: 'CA Généré/mois', value: formatFCFA(globalMetrics.revenueGenerated), icon: 'ri-money-dollar-circle-line', color: '#059669' },
              { label: 'Citations IA/mois', value: formatNumber(globalMetrics.geoCitations), icon: 'ri-robot-2-line', color: '#10A37F' },
              { label: 'Maturité Moy.', value: `${globalMetrics.avgMaturity}/100`, icon: 'ri-medal-line', color: '#EC4899' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-2 rounded-lg bg-white/5 border border-white/5">
                <i className={`${stat.icon} text-sm mb-1 block`} style={{ color: stat.color }} />
                <span className="block text-base font-bold text-white font-heading">{stat.value}</span>
                <span className="text-[10px] text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <section className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider whitespace-nowrap mr-1">Agents</span>
            {agents.map(agent => {
              const badge = getAgentStatusColor(agent.status);
              return (
                <button
                  key={agent.id}
                  onClick={() => scrollToSection(`agent-${agent.id}`)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                    activeSection === `agent-${agent.id}`
                      ? 'bg-foreground-950 text-white'
                      : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
                  }`}
                >
                  <span>{agent.number}</span>
                  <span className="hidden sm:inline">{agent.name.replace('™', '')}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                </button>
              );
            })}
            <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider whitespace-nowrap mx-1">|</span>
            <button
              onClick={() => scrollToSection('methodology')}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${
                activeSection === 'methodology' ? 'bg-foreground-950 text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
              }`}
            >
              Méthodo
            </button>
            <button
              onClick={() => scrollToSection('kpi-dashboard')}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${
                activeSection === 'kpi-dashboard' ? 'bg-foreground-950 text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
              }`}
            >
              KPIs
            </button>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-background-200 border-t-amber-500 rounded-full animate-spin" />
            <p className="text-sm text-foreground-500">Chargement du programme Business Opportunity Intelligence...</p>
          </div>
        </section>
      )}

      {/* Error State */}
      {!loading && error && (
        <section className="py-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100">
              <i className="ri-error-warning-line text-red-600 text-2xl" />
            </div>
            <p className="text-sm text-foreground-700 font-medium">Erreur de chargement</p>
            <p className="text-xs text-foreground-500">{error}</p>
            <button onClick={refetch} className="px-5 py-2.5 rounded-full bg-foreground-950 text-background-50 text-sm font-medium hover:bg-foreground-800 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-refresh-line mr-2" />Réessayer
            </button>
          </div>
        </section>
      )}

      {!loading && !error && (
        <>
          {/* Monitored Entities Overview */}
          <section className="py-10 sm:py-14 bg-background-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                  Surveillance Continue — {formatNumber(globalMetrics.organizationsMonitored)}+ Entités
                </h2>
                <p className="text-foreground-500">KOS scanne en permanence l'écosystème business mondial pour détecter chaque opportunité.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {monitoredEntities.map(entity => (
                  <div key={entity.type} className="rounded-2xl bg-white border border-background-200 p-5 text-center hover:shadow-md transition-all cursor-default">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${entity.color}12` }}>
                      <i className={`${entity.icon} text-xl`} style={{ color: entity.color }} />
                    </div>
                    <span className="block text-2xl font-bold font-heading text-foreground-950">{formatNumber(entity.count)}+</span>
                    <span className="text-xs text-foreground-500">{entity.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Agent Sections */}
          {agents.map((agent: BusinessIntelAgent, idx: number) => {
            const isEven = idx % 2 === 0;
            const statusBadge = getAgentStatusColor(agent.status);
            return (
              <section key={agent.id} id={`agent-${agent.id}`} className={`py-10 sm:py-14 scroll-mt-28 ${isEven ? 'bg-white' : 'bg-background-50'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl font-bold font-heading" style={{ color: agent.color }}>{agent.number}</span>
                    <div className="flex-1">
                      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">{agent.name}</h2>
                      <p className="text-foreground-500 text-sm">{agent.mission}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${statusBadge.bg} ${statusBadge.border} ${statusBadge.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />{statusBadge.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
                    {/* Description */}
                    <div className="lg:col-span-1 rounded-2xl border border-background-200 p-5" style={{ backgroundColor: `${agent.color}04` }}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${agent.color}15` }}>
                          <i className={`${agent.icon} text-lg`} style={{ color: agent.color }} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-foreground-950">Mission</h3>
                          <span className="text-xs text-foreground-500">Maturité {agent.maturity}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-foreground-600 leading-relaxed">{agent.description}</p>
                      <div className="mt-3 w-full h-1.5 rounded-full bg-background-200 overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${agent.maturity}%`, backgroundColor: agent.color }} />
                      </div>
                    </div>

                    {/* Sources */}
                    <div className="rounded-2xl bg-background-50 border border-background-200 p-5">
                      <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <i className="ri-radar-line" style={{ color: agent.color }} />Sources prioritaires
                      </h4>
                      <div className="space-y-1.5">
                        {agent.sources.map(src => (
                          <div key={src} className="flex items-center gap-2 text-xs text-foreground-700 py-1">
                            <i className="ri-checkbox-circle-line flex-shrink-0 text-xs" style={{ color: agent.color }} />
                            {src}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tools */}
                    <div className="rounded-2xl bg-background-50 border border-background-200 p-5">
                      <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <i className="ri-tools-line" style={{ color: agent.color }} />IA & Outils mobilisés
                      </h4>
                      <div className="space-y-1.5">
                        {agent.tools.map(tool => (
                          <div key={tool} className="flex items-center gap-2 text-xs text-foreground-700 py-1">
                            <i className="ri-cpu-line flex-shrink-0 text-xs" style={{ color: agent.color }} />
                            {tool}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Deliverables & KPIs */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="rounded-2xl bg-background-50 border border-background-200 p-5">
                      <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <i className="ri-file-list-3-line" style={{ color: agent.color }} />Livrables
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {agent.deliverables.map((d, j) => (
                          <div key={j} className="flex items-start gap-2 py-1.5 px-2 rounded-lg bg-white border border-background-100 text-xs text-foreground-700">
                            <i className="ri-check-line flex-shrink-0 mt-0.5 text-emerald-500" />
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-background-50 border border-background-200 p-5">
                      <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <i className="ri-bar-chart-2-line" style={{ color: agent.color }} />KPI Agent
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {agent.kpis.map(kpi => (
                          <div key={kpi.label} className="py-2 px-3 rounded-lg bg-white border border-background-100">
                            <div className="flex items-center gap-1.5 text-xs text-foreground-400 mb-1">
                              <i className={`${kpi.icon} text-[10px]`} style={{ color: agent.color }} />
                              {kpi.label}
                            </div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-base font-bold font-heading text-foreground-950">{kpi.value}</span>
                              <span className="text-[10px] text-foreground-400">/ {kpi.target}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}

          {/* Validation Methodology */}
          <section id="methodology" className="py-12 sm:py-16 bg-background-50 border-t border-background-200 scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
                  <i className="ri-shield-check-line text-amber-600 text-sm" />
                  <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">Méthodologie de Validation Big Four</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                  5 Niveaux de Validation avant Toute Recommandation
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Processus de validation inspiré des standards McKinsey, BCG, Deloitte, PwC, EY et KPMG.
                </p>
              </div>
              <div className="relative">
                <div className="hidden lg:block absolute top-10 left-[5%] right-[5%] h-0.5 bg-background-200" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {validationLevels.map(lvl => (
                    <div key={lvl.level} className="relative rounded-2xl bg-white border border-background-200 p-5 text-center">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: lvl.color }}>
                        {lvl.level}
                      </div>
                      <div className="w-16 h-16 mx-auto mt-2 mb-3 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${lvl.color}10` }}>
                        <i className={`${lvl.icon} text-2xl`} style={{ color: lvl.color }} />
                      </div>
                      <h3 className="text-sm font-bold text-foreground-950 mb-1.5">Niveau {lvl.level} — {lvl.name}</h3>
                      <p className="text-xs text-foreground-600 leading-relaxed mb-2">{lvl.description}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${lvl.color}10`, color: lvl.color }}>{lvl.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* KPI Dashboard */}
          <section id="kpi-dashboard" className="py-12 sm:py-16 bg-white scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                  <i className="ri-dashboard-3-line text-emerald-600 text-sm" />
                  <span className="text-sm font-bold text-emerald-700 uppercase tracking-wider">KPI de Performance KOS</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                  Mesure Mensuelle de l'Impact Commercial
                </h2>
                <p className="text-foreground-600">5 axes · 11 indicateurs · Dashboard temps réel avec projections.</p>
              </div>

              {/* KPI Category Toggle */}
              <div className="flex justify-center mb-6 overflow-x-auto">
                <div className="inline-flex rounded-full bg-background-200 p-1">
                  <button onClick={() => setKpiView('all')} className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${kpiView === 'all' ? 'bg-white text-foreground-950 shadow-sm' : 'text-foreground-500 hover:text-foreground-700'}`}>
                    <i className="ri-apps-2-line mr-1.5" />Tous ({businessKPIs.length})
                  </button>
                  {kpiCategories.map(cat => (
                    <button key={cat} onClick={() => setKpiView(cat)} className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${kpiView === cat ? 'bg-white text-foreground-950 shadow-sm' : 'text-foreground-500 hover:text-foreground-700'}`}>
                      <i className={`${kpiCategoryLabels[cat]?.icon || 'ri-bar-chart-line'} mr-1.5`} />{kpiCategoryLabels[cat]?.label || cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredKPIs.map((kpi: BusinessIntelKPI) => {
                  const pct = Math.round((kpi.current / kpi.target) * 100);
                  const barColor = pct >= 90 ? '#10B981' : pct >= 60 ? '#F59E0B' : '#EF4444';

                  return (
                    <div key={kpi.id} className="rounded-2xl border border-background-200 p-5 bg-background-50">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}12` }}>
                          <i className={`${kpi.icon} text-sm`} style={{ color: kpi.color }} />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-foreground-900 leading-tight">{kpi.name}</h3>
                          <span className="text-[10px] text-foreground-400">{kpiCategoryLabels[kpi.category]?.label || kpi.category}</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold font-heading mb-1" style={{ color: barColor }}>
                        {kpi.id === 'ca-genere' ? formatFCFA(kpi.current) : formatNumber(kpi.current)}
                        <span className="text-xs text-foreground-400 ml-1">{kpi.unit}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-foreground-400 mb-2">
                        <span>Cible : {kpi.id === 'ca-genere' ? formatFCFA(kpi.target) : formatNumber(kpi.target)} {kpi.unit}</span>
                        <span className={kpi.trend > 0 ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>
                          {kpi.trend > 0 ? '+' : ''}{kpi.id === 'ca-genere' ? formatFCFA(kpi.trend) : formatNumber(kpi.trend)}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-background-200 overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: barColor }} />
                      </div>
                      {kpi.subMetrics && (
                        <div className="mt-3 pt-3 border-t border-background-100 space-y-1">
                          {kpi.subMetrics.map(sub => (
                            <div key={sub.label} className="flex items-center justify-between text-[10px]">
                              <span className="text-foreground-500">{sub.label}</span>
                              <span className="font-bold text-foreground-700">
                                {formatNumber(sub.value)}
                                <span className="text-foreground-400 font-normal"> / {formatNumber(sub.target)}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Livrable Final */}
          <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-4">
                  <i className="ri-star-line text-amber-600 text-sm" />
                  <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">Livrable Final Attendu</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-3">
                  KOS — Système Autonome de Business Intelligence
                </h2>
                <p className="text-foreground-600 max-w-3xl mx-auto">
                  Fonctionnant selon un standard de qualité comparable aux meilleures organisations mondiales de conseil et d'intelligence économique.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {livrableStandards.map((item, i) => (
                  <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center hover:shadow-md transition-all cursor-default">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}12` }}>
                      <i className={`${item.icon} text-lg`} style={{ color: item.color }} />
                    </div>
                    <p className="text-xs font-bold text-foreground-900 leading-tight">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Cross-link Ecosystem */}
          <section className="py-12 sm:py-16 bg-white border-t border-background-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                  Écosystème KOS — Business Intelligence & Développement
                </h2>
                <p className="text-foreground-600">Accès rapide aux hubs connexes de l'écosystème commercial KOS.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Business Opportunity Intelligence', path: '/kos-business-opportunity-intelligence', icon: 'ri-rocket-2-line', color: '#E07B39', current: true },
                  { label: 'Tender Intelligence', path: '/kos-tender-intelligence', icon: 'ri-file-search-line', color: '#F59E0B' },
                  { label: 'Market Intelligence Command', path: '/kos-market-intelligence-command', icon: 'ri-line-chart-line', color: '#0EA5E9' },
                  { label: 'Strategic Intelligence', path: '/kos-strategic-intelligence', icon: 'ri-mind-map', color: '#6366F1' },
                  { label: 'Growth Intelligence Command', path: '/kos-growth-intelligence-command', icon: 'ri-seedling-line', color: '#10B981' },
                  { label: 'Institutional Visibility', path: '/kos-institutional-visibility', icon: 'ri-building-4-line', color: '#059669' },
                  { label: 'Consulting Mission Factory', path: '/kos-consulting-mission-factory', icon: 'ri-briefcase-line', color: '#8B5CF6' },
                  { label: 'Managing Partner Office', path: '/kos-managing-partner-office', icon: 'ri-vip-crown-line', color: '#DC2626' },
                ].map(link => (
                  <a key={link.path} href={link.path} className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${
                    link.current ? 'border-amber-300 bg-amber-50/40 ring-2 ring-amber-400' : 'border-background-200 bg-background-50 hover:border-foreground-200'
                  }`}>
                    <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}12` }}>
                      <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                    </div>
                    <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                    {link.current && (
                      <span className="block text-[10px] text-amber-700 font-bold mt-1">Vous êtes ici</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </hubLayout>
  );
}



