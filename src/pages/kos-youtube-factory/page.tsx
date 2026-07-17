import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { Link } from 'react-router-dom';
import { useKOSYouTubeFactory } from '@/hooks/useKOSYouTubeFactory';

type TabId = 'pipeline' | 'calendar' | 'scripts' | 'seo' | 'slots' | 'kpis';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'pipeline', label: 'Pipeline Contenu', icon: 'ri-git-branch-line' },
  { id: 'calendar', label: 'Calendrier Éditorial', icon: 'ri-calendar-line' },
  { id: 'scripts', label: 'Scripts & Production', icon: 'ri-file-text-line' },
  { id: 'seo', label: 'SEO & Distribution', icon: 'ri-share-line' },
  { id: 'slots', label: 'Formats', icon: 'ri-stack-line' },
  { id: 'kpis', label: 'KPIs Chaîne', icon: 'ri-line-chart-line' },
];

export default function KOSYouTubeFactoryPage() {
  const [activeTab, setActiveTab] = useState<TabId>('pipeline');
  const factory = useKOSYouTubeFactory();
  const stats = factory.getStats();

  return (
    <KOSHubLayout hubId={99} activeTab="YouTube Factory" tabLabel="YouTube Factory™">
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FF0000] text-white font-body tracking-wide">
                      {stats.channelName}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700 font-body">
                      <i className="ri-film-line text-xs"></i>
                      {stats.totalVideos} vidéos
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 font-body">
                      <i className="ri-bar-chart-line text-xs"></i>
                      {stats.totalWatchTimeHours.toLocaleString()} h visionnées
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-2 font-heading">
                    KOS YouTube Factory™ — @KHEPRAEXPERTS
                  </h1>
                  <p className="text-sm text-foreground-600 max-w-2xl font-body">
                    Usine YouTube autonome. Pipeline automatisé 7 étapes : recherche → script → miniature → vidéo → description & chapitrage → hashtags → publication. Shorts quotidiens, vidéos hebdomadaires, podcasts hebdomadaires, masterclass mensuelles. Croissance abonnés, temps de visionnage, engagement, autorité sectorielle.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 flex-shrink-0">
                  {[
                    { label: 'Abonnés', value: stats.totalSubscribers.toLocaleString(), icon: 'ri-user-add-line', color: 'text-[#FF0000]' },
                    { label: 'Étapes auto', value: `${stats.optimizedSteps}/${stats.pipelineSteps}`, icon: 'ri-git-branch-line', color: 'text-accent-500' },
                    { label: 'Maturité', value: `${stats.maturityScore}/100`, icon: 'ri-medal-line', color: 'text-secondary-500' },
                  ].map(s => (
                    <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-xl p-3 text-center min-w-[90px]">
                      <i className={`${s.icon} ${s.color} text-lg`}></i>
                      <p className="text-xl font-bold text-foreground-950 mt-1">{s.value}</p>
                      <p className="text-xs text-foreground-500">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Governance Banner */}
        <div className="bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">
            <div className="flex items-center gap-2 text-xs text-foreground-500">
              <i className="ri-git-branch-line text-accent-500"></i>
              <span><strong className="text-foreground-700">Gouvernance :</strong> {stats.governanceStatus}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-md border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-1 overflow-x-auto py-2">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#FF0000] text-white'
                      : 'text-foreground-600 hover:bg-background-100'
                  }`}
                >
                  <i className={`${tab.icon} text-sm`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          {activeTab === 'pipeline' && <PipelineTab factory={factory} />}
          {activeTab === 'calendar' && <CalendarTab factory={factory} />}
          {activeTab === 'scripts' && <ScriptsTab factory={factory} />}
          {activeTab === 'seo' && <SEOTab factory={factory} />}
          {activeTab === 'slots' && <SlotsTab factory={factory} />}
          {activeTab === 'kpis' && <KPIsTab factory={factory} />}
        </div>

        {/* Cross-Links Footer */}
        <section className="py-12 bg-foreground-950">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white mb-2">Écosystème YouTube KHEPRA</h2>
                <p className="text-gray-400 text-sm">YouTube Factory → Video Factory → Voice Factory → Canva Factory. La chaîne complète de production vidéo institutionnelle pour @KHEPRAEXPERTS.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/kos-video-factory" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-background-50 text-foreground-950 font-bold text-sm hover:bg-background-100 cursor-pointer whitespace-nowrap">
                  <i className="ri-film-line" />Video Factory
                </Link>
                <Link to="/kos-voice-factory" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-accent-500 text-white font-bold text-sm hover:bg-accent-600 cursor-pointer whitespace-nowrap">
                  <i className="ri-mic-fill" />Voice Factory
                </Link>
                <Link to="/kos-canva-factory" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                  <i className="ri-palette-line" />Canva Factory
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </KOSHubLayout>
  );
}

// ============================================================================
// TAB 1: PIPELINE CONTENU
// ============================================================================
function PipelineTab({ factory }: { factory: ReturnType<typeof useKOSYouTubeFactory> }) {
  const pipeline = factory.pipeline;
  const pStats = factory.pipelineStats;

  return (
    <div className="space-y-8">
      {/* Automation Banner */}
      <ScrollReveal>
        <div className="bg-[#FF0000]/5 border border-[#FF0000]/20 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center flex-shrink-0">
              <i className="ri-git-branch-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Pipeline Autonome — {pStats.automationRate}% Automatisé</h3>
              <p className="text-sm text-foreground-600 mt-1">
                <strong className="text-foreground-800">{pStats.optimized}/{pStats.totalSteps} étapes</strong> entièrement automatisées. Le contenu passe de la recherche réglementaire à la publication YouTube sans intervention humaine. Chaque étape inclut un <strong className="text-foreground-800">quality gate</strong> automatique.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Pipeline Flow */}
      <div className="relative">
        {/* Connecting line */}
        <div className="hidden lg:block absolute left-[39px] top-12 bottom-12 w-0.5 bg-background-200/70"></div>

        <div className="space-y-6">
          {pipeline.map((step, i) => (
            <ScrollReveal key={step.id}>
              <div className="relative flex gap-5">
                {/* Step number circle */}
                <div className="hidden lg:flex w-20 flex-shrink-0 items-start justify-center pt-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 font-bold text-sm ${
                    step.status === 'optimized' ? 'bg-emerald-500 text-white' :
                    step.status === 'manual' ? 'bg-amber-500 text-white' : 'bg-background-200 text-foreground-500'
                  }`}>
                    {step.stepNumber}
                  </div>
                </div>

                {/* Step card */}
                <div className={`flex-1 bg-background-50 border rounded-xl overflow-hidden ${
                  step.status === 'optimized' ? 'border-emerald-200/60' :
                  step.status === 'manual' ? 'border-amber-200/60' : 'border-background-200/70'
                }`}>
                  <div className="p-5 border-b border-background-200/40">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center lg:hidden bg-emerald-100 text-emerald-700">
                          <span className="text-sm font-bold">{step.stepNumber}</span>
                        </div>
                        <div className={`w-10 h-10 rounded-lg hidden lg:flex items-center justify-center ${
                          step.status === 'optimized' ? 'bg-emerald-100 text-emerald-700' :
                          step.status === 'manual' ? 'bg-amber-100 text-amber-700' : 'bg-background-100 text-foreground-500'
                        }`}>
                          <i className={`${step.icon} text-lg`}></i>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="text-sm font-bold text-foreground-950">{step.name}</h3>
                            <span className={`px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                              step.status === 'optimized' ? 'bg-emerald-100 text-emerald-700' :
                              step.status === 'manual' ? 'bg-amber-100 text-amber-700' : 'bg-background-100 text-foreground-500'
                            }`}>
                              {step.status === 'optimized' ? 'AUTOMATISÉ' : step.status === 'manual' ? 'MANUEL' : 'EN DÉVELOPPEMENT'}
                            </span>
                          </div>
                          <span className="text-xs text-foreground-500">{step.duration}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-foreground-600 mt-3">{step.description}</p>
                  </div>

                  <div className="p-5 space-y-3">
                    {/* Tools */}
                    <div>
                      <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1">Outils</h4>
                      <div className="flex flex-wrap gap-1">
                        {step.tools.map(t => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-600">{t}</span>
                        ))}
                      </div>
                    </div>
                    {/* Quality Gate */}
                    <div>
                      <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1">
                        <i className="ri-shield-check-line mr-0.5 text-emerald-500"></i>Quality Gate
                      </h4>
                      <p className="text-xs text-foreground-600 bg-background-100 rounded-lg p-2.5">{step.qualityGate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TAB 2: CALENDRIER ÉDITORIAL
// ============================================================================
function CalendarTab({ factory }: { factory: ReturnType<typeof useKOSYouTubeFactory> }) {
  const scripts = factory.scripts;
  const byStatus = (status: string) => scripts.filter(s => s.status === status);

  return (
    <div className="space-y-8">
      {/* Pipeline Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Publiées', value: factory.scriptStats.published, icon: 'ri-check-double-line', color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Planifiées', value: factory.scriptStats.scheduled, icon: 'ri-calendar-check-line', color: 'text-primary-500', bg: 'bg-primary-50' },
            { label: 'En production', value: factory.scriptStats.inProduction, icon: 'ri-loader-4-line', color: 'text-amber-500', bg: 'bg-amber-50' },
            { label: 'Brouillons', value: factory.scriptStats.drafts, icon: 'ri-draft-line', color: 'text-foreground-400', bg: 'bg-background-100' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} border border-background-200/70 rounded-lg p-3 text-center`}>
              <i className={`${s.icon} ${s.color} text-lg`}></i>
              <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Content Queue by status */}
      {(['published', 'scheduled', 'in_production', 'draft'] as const).map(status => {
        const items = byStatus(status);
        if (items.length === 0) return null;
        const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
          published: { label: 'PUBLIÉES', color: 'text-emerald-600', bg: 'bg-emerald-100' },
          scheduled: { label: 'PLANIFIÉES', color: 'text-primary-600', bg: 'bg-primary-100' },
          in_production: { label: 'EN PRODUCTION', color: 'text-amber-600', bg: 'bg-amber-100' },
          draft: { label: 'BROUILLONS', color: 'text-foreground-500', bg: 'bg-background-100' },
        };
        const sl = statusLabels[status];

        return (
          <div key={status} className="space-y-3">
            <h3 className={`text-xs font-semibold uppercase tracking-wider ${sl.color}`}>
              <span className={`inline-block px-2 py-0.5 rounded-full ${sl.bg} ${sl.color}`}>{sl.label} ({items.length})</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map(script => (
                <ScrollReveal key={script.id}>
                  <div className="bg-background-50 border border-background-200/70 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        script.format === 'short' ? 'bg-[#FF0000]/10 text-[#FF0000]' :
                        script.format === 'video' ? 'bg-primary-100 text-primary-700' :
                        script.format === 'podcast' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                      }`}>
                        {script.format === 'short' ? 'SHORT' : script.format === 'video' ? 'VIDÉO' : script.format === 'podcast' ? 'PODCAST' : 'MASTERCLASS'}
                      </span>
                      <span className="text-xs text-foreground-400">{script.duration}</span>
                      <span className="text-xs text-foreground-400">{script.date}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 mb-1">{script.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-foreground-500">
                      <span className="flex items-center gap-1"><i className="ri-folder-line"></i>{script.domain}</span>
                      <span className="flex items-center gap-1"><i className="ri-user-voice-line"></i>{script.voiceTalent}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {script.seoKeywords.slice(0, 4).map(k => (
                        <span key={k} className="text-xs px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{k}</span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// TAB 3: SCRIPTS & PRODUCTION
// ============================================================================
function ScriptsTab({ factory }: { factory: ReturnType<typeof useKOSYouTubeFactory> }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const scripts = factory.scripts;

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="bg-accent-50 border border-accent-200/60 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
              <i className="ri-file-text-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">KOS Script Engine — YouTube</h3>
              <p className="text-sm text-foreground-600 mt-1">
                <strong className="text-foreground-800">{scripts.length} scripts</strong> en base — {factory.scriptStats.published} publiés, {factory.scriptStats.scheduled} planifiés, {factory.scriptStats.inProduction} en production. Couvre {factory.scriptStats.domains.length} domaines réglementaires et {factory.scriptStats.formats.length} formats.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="space-y-4">
        {scripts.map(script => (
          <ScrollReveal key={script.id}>
            <button
              onClick={() => setExpanded(expanded === script.id ? null : script.id)}
              className="w-full text-left bg-background-50 border border-background-200/70 rounded-xl overflow-hidden cursor-pointer hover:border-foreground-200 transition-colors"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        script.format === 'short' ? 'bg-[#FF0000]/10 text-[#FF0000]' :
                        script.format === 'video' ? 'bg-primary-100 text-primary-700' :
                        script.format === 'podcast' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                      }`}>
                        {script.format.toUpperCase()}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        script.status === 'published' ? 'bg-emerald-100 text-emerald-700' :
                        script.status === 'scheduled' ? 'bg-primary-100 text-primary-700' :
                        script.status === 'in_production' ? 'bg-amber-100 text-amber-700' : 'bg-background-100 text-foreground-500'
                      }`}>
                        {script.status === 'published' ? 'PUBLIÉ' : script.status === 'scheduled' ? 'PLANIFIÉ' : script.status === 'in_production' ? 'EN PRODUCTION' : 'BROUILLON'}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground-950">{script.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-foreground-500 mt-1 flex-wrap">
                      <span><i className="ri-time-line mr-0.5"></i>{script.duration}</span>
                      <span><i className="ri-folder-line mr-0.5"></i>{script.domain}</span>
                      <span><i className="ri-user-voice-line mr-0.5"></i>{script.voiceTalent}</span>
                      <span><i className="ri-image-line mr-0.5"></i>{script.thumbnailVariant}</span>
                    </div>
                  </div>
                  {expanded === script.id ? (
                    <i className="ri-arrow-up-s-line text-foreground-400"></i>
                  ) : (
                    <i className="ri-arrow-down-s-line text-foreground-400"></i>
                  )}
                </div>
              </div>

              {/* Expanded Sections */}
              {expanded === script.id && (
                <div className="border-t border-background-200/40 px-5 pb-5 pt-4 space-y-3">
                  {script.sections.map((section, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-background-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-foreground-500">{i + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-xs font-semibold text-foreground-800">{section.name}</h4>
                          <span className="text-xs text-foreground-400">{section.duration}</span>
                        </div>
                        <p className="text-xs text-foreground-600 leading-relaxed">{section.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </button>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 4: SEO & DISTRIBUTION
// ============================================================================
function SEOTab({ factory }: { factory: ReturnType<typeof useKOSYouTubeFactory> }) {
  const configs = factory.distributionConfigs;
  const dStats = factory.distributionStats;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Canaux', value: dStats.totalChannels, icon: 'ri-share-line', color: 'text-primary-500' },
            { label: 'Actifs', value: dStats.active, icon: 'ri-check-double-line', color: 'text-emerald-500' },
            { label: 'Plateformes', value: dStats.platforms.length, icon: 'ri-global-line', color: 'text-accent-500' },
            { label: 'Tips SEO', value: dStats.totalTips, icon: 'ri-lightbulb-flash-line', color: 'text-secondary-500' },
          ].map(s => (
            <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
              <i className={`${s.icon} ${s.color} text-lg`}></i>
              <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Distribution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {configs.map(config => (
          <ScrollReveal key={config.id}>
            <div className={`bg-background-50 border rounded-xl overflow-hidden h-full ${
              config.active ? 'border-emerald-200/60' : 'border-background-200/70 opacity-60'
            }`}>
              <div className="p-5 border-b border-background-200/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FF0000]/10 flex items-center justify-center">
                      <i className={`${config.icon} text-[#FF0000] text-lg`}></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950 capitalize">{config.platform}</h3>
                      <span className={`text-xs font-semibold ${config.active ? 'text-emerald-600' : 'text-foreground-400'}`}>
                        {config.active ? 'ACTIF' : 'INACTIF'}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-foreground-600">{config.description}</p>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1">Tips d'optimisation</h4>
                  <ul className="space-y-0.5">
                    {config.optimizationTips.map((tip, i) => (
                      <li key={i} className="text-xs text-foreground-600 flex items-start gap-1">
                        <i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0"></i>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-background-100 rounded-lg p-2.5">
                    <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1">Stratégie Hashtags</h4>
                    <p className="text-xs text-foreground-600">{config.hashtagStrategy}</p>
                  </div>
                  <div className="bg-background-100 rounded-lg p-2.5">
                    <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1">Cross-Posting</h4>
                    <p className="text-xs text-foreground-600">{config.crossPosting}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 5: FORMATS
// ============================================================================
function SlotsTab({ factory }: { factory: ReturnType<typeof useKOSYouTubeFactory> }) {
  const slots = factory.contentSlots;
  const calStats = factory.calendarStats;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Formats', value: calStats.totalSlots, icon: 'ri-stack-line', color: 'text-primary-500' },
            { label: 'Total produits', value: calStats.totalProduced.toLocaleString(), icon: 'ri-film-line', color: 'text-accent-500' },
            { label: 'Vues moyennes', value: calStats.totalAvgViews.toLocaleString(), icon: 'ri-eye-line', color: 'text-secondary-500' },
            { label: 'Best performer', value: calStats.bestPerforming?.type.toUpperCase() || '-', icon: 'ri-trophy-line', color: 'text-foreground-500' },
          ].map(s => (
            <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
              <i className={`${s.icon} ${s.color} text-lg`}></i>
              <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Slot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slots.map(slot => (
          <ScrollReveal key={slot.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden h-full">
              <div className="p-5 border-b border-background-200/40">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${slot.color}15` }}>
                    <i className={`${slot.icon} text-2xl`} style={{ color: slot.color }}></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950 capitalize">{slot.type}</h3>
                    <span className="text-xs text-foreground-500">{slot.frequency}</span>
                  </div>
                </div>
                <p className="text-xs text-foreground-600">{slot.description}</p>
              </div>

              <div className="p-5 space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-background-100 rounded-lg p-2 text-center">
                    <p className="text-xs text-foreground-400">Durée</p>
                    <p className="text-xs font-semibold text-foreground-800 mt-0.5">{slot.duration}</p>
                  </div>
                  <div className="bg-background-100 rounded-lg p-2 text-center">
                    <p className="text-xs text-foreground-400">Jour</p>
                    <p className="text-xs font-semibold text-foreground-800 mt-0.5">{slot.bestDay}</p>
                  </div>
                  <div className="bg-background-100 rounded-lg p-2 text-center">
                    <p className="text-xs text-foreground-400">Heure</p>
                    <p className="text-xs font-semibold text-foreground-800 mt-0.5">{slot.bestTime}</p>
                  </div>
                </div>

                <div className="bg-background-100 rounded-lg p-3">
                  <p className="text-xs text-foreground-500 mb-1">Audience cible</p>
                  <p className="text-xs text-foreground-700">{slot.targetAudience}</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <p className="text-xs text-foreground-400">Streak</p>
                    <p className="text-sm font-bold text-foreground-950">{slot.currentStreak}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-foreground-400">Produits</p>
                    <p className="text-sm font-bold text-foreground-950">{slot.totalProduced}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-foreground-400">Vues moy.</p>
                    <p className="text-sm font-bold text-foreground-950">{slot.avgViews.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-foreground-500">
                    <i className="ri-bar-chart-line text-primary-500"></i>
                    KPI 1 : {slot.kpiPrimary}
                  </span>
                  <span className="flex items-center gap-1 text-foreground-500">
                    <i className="ri-line-chart-line text-accent-500"></i>
                    KPI 2 : {slot.kpiSecondary}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TAB 6: KPIs CHAÎNE
// ============================================================================
function KPIsTab({ factory }: { factory: ReturnType<typeof useKOSYouTubeFactory> }) {
  const kpis = factory.channelKpis;
  const stats = factory.getStats();
  const trends = factory.kpiTrends;

  return (
    <div className="space-y-6">
      {/* Maturity Score */}
      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-center sm:col-span-1">
            <p className="text-xs text-foreground-500 uppercase tracking-wider mb-2">Maturité YouTube Factory</p>
            <p className="text-5xl font-bold text-[#FF0000] font-heading">{stats.maturityScore}</p>
            <p className="text-xs text-foreground-400 mt-1">/100 — Cible {stats.targetMaturity}</p>
            <div className="w-full h-2 bg-background-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-[#FF0000] rounded-full" style={{ width: `${stats.maturityScore}%` }}></div>
            </div>
          </div>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 sm:col-span-2">
            <h3 className="text-sm font-semibold text-foreground-950 mb-3">Performance Globale @KHEPRAEXPERTS</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Abonnés', value: stats.totalSubscribers.toLocaleString(), sub: `+${trends.avgGrowth}% croissance` },
                { label: 'Heures visionnées', value: stats.totalWatchTimeHours.toLocaleString(), sub: 'Total cumulé' },
                { label: 'CTR moyen', value: `${stats.avgCTR}%`, sub: 'Taux de clic' },
                { label: 'Rétention', value: `${stats.avgRetention}%`, sub: 'Taux moyen' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-xs text-foreground-500 mb-0.5">{s.label}</p>
                  <p className="text-xl font-bold text-foreground-950">{s.value}</p>
                  <p className="text-xs text-foreground-400">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kpis.map(kpi => (
          <ScrollReveal key={kpi.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    kpi.color === 'primary' ? 'bg-[#FF0000]/10 text-[#FF0000]' :
                    kpi.color === 'accent' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                  }`}>
                    <i className={`${kpi.icon} text-sm`}></i>
                  </div>
                  <span className="text-sm font-semibold text-foreground-950">{kpi.name}</span>
                </div>
                <span className={`text-xs font-medium ${
                  kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-foreground-400'
                }`}>
                  {kpi.current.toLocaleString()}{kpi.unit}
                  {kpi.trend === 'up' && <i className="ri-arrow-up-line ml-0.5"></i>}
                  {kpi.trend === 'down' && <i className="ri-arrow-down-line ml-0.5"></i>}
                  {kpi.trend === 'stable' && <i className="ri-subtract-line ml-0.5"></i>}
                </span>
              </div>

              <div className="flex items-end gap-1 h-16 mb-2">
                {kpi.history.map((h, i) => {
                  const maxVal = Math.max(...kpi.history.map(hh => hh.value), kpi.target);
                  const heightPct = (h.value / maxVal) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="w-full relative" style={{ height: '48px' }}>
                        <div
                          className="absolute bottom-0 w-full rounded-sm transition-all bg-[#FF0000]"
                          style={{ height: `${heightPct}%` }}
                        ></div>
                      </div>
                      <span className="text-[9px] text-foreground-400">{h.month}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-foreground-500">
                <span>Précédent: {kpi.previous.toLocaleString()}{kpi.unit}</span>
                <span>Cible: {kpi.target.toLocaleString()}{kpi.unit}</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}