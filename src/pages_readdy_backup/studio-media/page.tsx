import { useState } from 'react';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import {
  studioStats,
  podcastFramework,
  youtubeFramework,
  geoFramework,
  businessDevFramework,
} from '@/mocks/studioMedia';
import ContentGenerationAgent from '';
import ProductionDashboard from '';

// ─── Expand/Collapse icon ───
function ExpandIcon({ expanded }: { expanded: boolean }) {
  return expanded
    ? <i className="ri-arrow-up-s-line text-foreground-400 ml-auto transition-transform" />
    : <i className="ri-arrow-down-s-line text-foreground-400 ml-auto transition-transform" />;
}

// ─── Color themes ───
const t = {
  primary: {
    light: 'bg-primary-50',
    border: 'border-primary-200/70',
    badge: 'bg-primary-100 text-primary-800',
    icon: 'bg-primary-100',
    iconText: 'text-primary-600',
    hoverBorder: 'hover:border-primary-200/60',
  },
  accent: {
    light: 'bg-accent-50',
    border: 'border-accent-200/70',
    badge: 'bg-accent-100 text-accent-800',
    icon: 'bg-accent-100',
    iconText: 'text-accent-600',
    hoverBorder: 'hover:border-accent-200/60',
  },
};

type FrameworkId = 'podcast' | 'youtube' | 'geo' | 'business-dev';

export default function StudioMediaPage() {
  const [activeFramework, setActiveFramework] = useState<FrameworkId>('podcast');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedLivrable, setExpandedLivrable] = useState<string | null>(null);
  const [expandedGeo, setExpandedGeo] = useState<string | null>(null);
  const [expandedEtape, setExpandedEtape] = useState<string | null>(null);

  const frameworks = [
    {
      id: 'podcast' as FrameworkId,
      label: 'Podcast',
      icon: 'ri-mic-line',
      theme: 'primary',
    },
    {
      id: 'youtube' as FrameworkId,
      label: 'YouTube',
      icon: 'ri-video-line',
      theme: 'accent',
    },
    {
      id: 'geo' as FrameworkId,
      label: 'GEO/SEO',
      icon: 'ri-search-line',
      theme: 'primary',
    },
    {
      id: 'business-dev' as FrameworkId,
      label: 'Business Dev',
      icon: 'ri-line-chart-line',
      theme: 'accent',
    },
  ];

  const getFramework = () => {
    switch (activeFramework) {
      case 'podcast': return podcastFramework;
      case 'youtube': return youtubeFramework;
      case 'geo': return geoFramework;
      case 'business-dev': return businessDevFramework;
      default: return podcastFramework;
    }
  };

  const activeFw = getFramework();

  return (
    <div className="min-h-screen bg-background-50">
      <Navigation />

      <main id="main-content">
        {/* ═══════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════ */}
        <section className="relative bg-foreground-950 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #c4a235 0%, transparent 70%)' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-primary-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">
                  Production Média
                </span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Studio Média{' '}
                <span className="block text-primary-400">KHEPRA EXPERTS</span>
              </h1>
              <p className="text-body-lg text-foreground-400 leading-relaxed mb-8 max-w-2xl">
                Production industrialisée de contenus médias — podcasts, vidéos YouTube, optimisation GEO et conversion commerciale. Chaque contenu est une machine à générer de l'autorité, de la visibilité et des missions.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#frameworks" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5 bg-primary-500 text-background-50">
                  <i className="ri-tools-line" />
                  Explorer les frameworks
                </a>
                <a href="/contact/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5 border border-accent-400/50 text-accent-400 bg-accent-500/10">
                  <i className="ri-calendar-line" />
                  Demander une production
                </a>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="relative border-t border-foreground-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                {[
                  { value: studioStats.episodesProduits, label: 'Contenus produits / an', icon: 'ri-movie-line' },
                  { value: studioStats.frameworksActifs, label: 'Frameworks actifs', icon: 'ri-stack-line' },
                  { value: studioStats.formatsDeclines, label: 'Formats déclinés', icon: 'ri-file-list-3-line' },
                  { value: studioStats.audiencesCibles, label: 'Audiences cibles', icon: 'ri-group-line' },
                  { value: studioStats.tauxConversionMoyen, label: 'Taux de conversion moyen', icon: 'ri-percent-line' },
                  { value: studioStats.paysCouverts, label: 'Pays couverts', icon: 'ri-global-line' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="w-9 h-9 mx-auto flex items-center justify-center rounded-lg bg-foreground-800/60 mb-2">
                      <i className={`${stat.icon} text-base text-primary-400`} />
                    </div>
                    <div className="font-heading text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-foreground-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FRAMEWORK TABS
        ═══════════════════════════════════════════ */}
        <section id="frameworks" className="py-16 md:py-20 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 mb-3">
                Production Industrialisée
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-4">
                Les 4 Frameworks du Studio
              </h2>
              <p className="text-body-md text-foreground-600 max-w-3xl mx-auto">
                Quatre machines de production indépendantes, chacune conçue pour transformer l'expertise KHEPRA EXPERTS en contenu média à haute valeur ajoutée.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {frameworks.map((fw) => (
                <button
                  key={fw.id}
                  onClick={() => {
                    setActiveFramework(fw.id);
                    setExpandedSection(null);
                    setExpandedLivrable(null);
                    setExpandedGeo(null);
                    setExpandedEtape(null);
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all ${
                    activeFramework === fw.id
                      ? 'bg-primary-500 text-background-50'
                      : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                  }`}
                >
                  <i className={`${fw.icon} text-base`} />
                  {fw.label}
                </button>
              ))}
            </div>

            {/* Framework header */}
            <div className="mb-10">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${activeFramework === 'podcast' || activeFramework === 'geo' ? 'bg-primary-100 text-primary-700' : 'bg-accent-100 text-accent-700'}`}>
                <i className={`${activeFw.icon} text-sm`} />
                {activeFw.title}
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-3">
                {activeFw.subtitle}
              </h3>
              <p className="text-body-md text-foreground-600 max-w-3xl">
                {activeFw.description}
              </p>
            </div>

            {/* ─── FRAMEWORK: PODCAST ─── */}
            {activeFramework === 'podcast' && (
              <div className="space-y-3">
                {podcastFramework.sections.map((section) => {
                  const colors = section.duree === section.sections?.[0]?.duree ? t.primary : (section.number === '04' || section.number === '08' ? t.primary : t.accent);
                  const isExpanded = expandedSection === section.id;
                  const theme = parseInt(section.number) % 2 === 1 ? t.primary : t.accent;
                  return (
                    <div
                      key={section.id}
                      className={`rounded-xl border transition-all duration-300 cursor-pointer bg-background-50 ${
                        isExpanded ? theme.border + ' shadow-sm' : `border-background-200/70 ${theme.hoverBorder}`
                      }`}
                    >
                      <div className="p-5 flex items-start gap-4" onClick={() => setExpandedSection(isExpanded ? null : section.id)}>
                        <div className={`w-11 h-11 flex items-center justify-center rounded-lg flex-shrink-0 ${theme.icon}`}>
                          <span className={`font-heading text-sm font-bold ${theme.iconText}`}>{section.number}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-heading text-base font-bold text-foreground-900">{section.title}</h4>
                            <span className="text-xs text-foreground-400 bg-background-100 px-2 py-0.5 rounded-full">{section.duree}</span>
                            <ExpandIcon expanded={isExpanded} />
                          </div>
                          <p className="text-sm text-foreground-600 leading-relaxed">{section.description}</p>
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="px-5 pb-5 border-t border-background-200/70 animate-fade-in">
                          <div className="mt-4 mb-3">
                            <span className="text-xs font-semibold uppercase text-foreground-400 tracking-wider">Conseils de production :</span>
                            <ul className="mt-2 space-y-1">
                              {section.conseils.map((c, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                                  <i className={`ri-check-line text-xs ${theme.iconText} mt-0.5 flex-shrink-0`} />
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-4">
                            <span className="text-xs font-semibold uppercase text-foreground-400 tracking-wider">Script type :</span>
                            <div className="mt-2 rounded-lg bg-foreground-950 text-foreground-300 p-4 overflow-x-auto max-h-[350px] overflow-y-auto">
                              <pre className="text-[11px] leading-relaxed font-mono whitespace-pre-wrap">{section.template}</pre>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ─── FRAMEWORK: YOUTUBE ─── */}
            {activeFramework === 'youtube' && (
              <div className="space-y-3">
                {youtubeFramework.livrables.map((livrable) => {
                  const theme = livrable.theme === 'primary' ? t.primary : t.accent;
                  const isExpanded = expandedLivrable === livrable.id;
                  return (
                    <div
                      key={livrable.id}
                      className={`rounded-xl border transition-all duration-300 cursor-pointer bg-background-50 ${
                        isExpanded ? theme.border + ' shadow-sm' : `border-background-200/70 ${theme.hoverBorder}`
                      }`}
                    >
                      <div className="p-5 flex items-start gap-4" onClick={() => setExpandedLivrable(isExpanded ? null : livrable.id)}>
                        <div className={`w-11 h-11 flex items-center justify-center rounded-lg flex-shrink-0 ${theme.icon}`}>
                          <i className={`${livrable.icon} text-lg ${theme.iconText}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.badge}`}>{livrable.number}</span>
                            <h4 className="font-heading text-base font-bold text-foreground-900">{livrable.title}</h4>
                            <ExpandIcon expanded={isExpanded} />
                          </div>
                          <p className="text-sm text-foreground-600 leading-relaxed">{livrable.description}</p>
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="px-5 pb-5 border-t border-background-200/70 animate-fade-in">
                          <div className="mt-4 mb-3">
                            <span className="text-xs font-semibold uppercase text-foreground-400 tracking-wider">Conseils :</span>
                            <ul className="mt-2 space-y-1">
                              {livrable.conseils.map((c, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                                  <i className={`ri-check-line text-xs ${theme.iconText} mt-0.5 flex-shrink-0`} />
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-4">
                            <span className="text-xs font-semibold uppercase text-foreground-400 tracking-wider">Template :</span>
                            <div className="mt-2 rounded-lg bg-foreground-950 text-foreground-300 p-4 overflow-x-auto max-h-[400px] overflow-y-auto">
                              <pre className="text-[11px] leading-relaxed font-mono whitespace-pre-wrap">{livrable.template}</pre>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ─── FRAMEWORK: GEO ─── */}
            {activeFramework === 'geo' && (
              <div>
                {/* 5 Optimisations */}
                <h4 className="font-heading text-lg font-bold text-foreground-900 mb-4 flex items-center gap-2">
                  <i className="ri-focus-3-line text-primary-500" />
                  Les 5 Optimisations
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                  {geoFramework.optimisations.map((opt) => {
                    const theme = opt.theme === 'primary' ? t.primary : t.accent;
                    const isExpanded = expandedGeo === opt.id;
                    return (
                      <div
                        key={opt.id}
                        className={`rounded-xl border transition-all duration-300 bg-background-50 ${
                          isExpanded ? theme.border + ' shadow-sm' : `border-background-200/70 ${theme.hoverBorder}`
                        }`}
                      >
                        <div className="p-5 cursor-pointer" onClick={() => setExpandedGeo(isExpanded ? null : opt.id)}>
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${theme.icon}`}>
                              <i className={`${opt.icon} text-lg ${theme.iconText}`} />
                            </div>
                            <h5 className="font-heading text-sm font-bold text-foreground-900 flex-1">{opt.title}</h5>
                            <ExpandIcon expanded={isExpanded} />
                          </div>
                          <p className="text-xs text-foreground-600 leading-relaxed mb-3">{opt.description}</p>
                          {isExpanded && (
                            <div className="pt-3 border-t border-background-200/70 animate-fade-in">
                              <span className="text-[10px] font-semibold uppercase text-foreground-400 tracking-wider">Livrables :</span>
                              <ul className="mt-2 space-y-1.5">
                                {opt.deliverables.map((d, i) => (
                                  <li key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                                    <i className={`ri-check-line text-[10px] ${theme.iconText} mt-0.5 flex-shrink-0`} />
                                    {d}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 9 Livrables Globaux */}
                <h4 className="font-heading text-lg font-bold text-foreground-900 mb-4 flex items-center gap-2">
                  <i className="ri-stack-line text-accent-500" />
                  Les 9 Livrables Transversaux
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {geoFramework.livrablesGlobaux.map((liv) => {
                    const theme = liv.theme === 'primary' ? t.primary : t.accent;
                    return (
                      <div key={liv.id} className={`p-5 rounded-xl border border-background-200/70 bg-background-50 ${theme.hoverBorder} transition-colors group cursor-default`}>
                        <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${theme.icon} mb-3 group-hover:scale-105 transition-transform`}>
                          <i className={`${liv.icon} text-lg ${theme.iconText}`} />
                        </div>
                        <h5 className="font-heading text-sm font-bold text-foreground-900 mb-1">{liv.title}</h5>
                        <p className="text-xs text-foreground-600 leading-relaxed">{liv.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── FRAMEWORK: BUSINESS DEV ─── */}
            {activeFramework === 'business-dev' && (
              <div className="space-y-3">
                {businessDevFramework.etapes.map((etape) => {
                  const theme = etape.theme === 'primary' ? t.primary : t.accent;
                  const isExpanded = expandedEtape === etape.id;
                  return (
                    <div
                      key={etape.id}
                      className={`rounded-xl border transition-all duration-300 cursor-pointer bg-background-50 ${
                        isExpanded ? theme.border + ' shadow-sm' : `border-background-200/70 ${theme.hoverBorder}`
                      }`}
                    >
                      <div className="p-5 flex items-start gap-4" onClick={() => setExpandedEtape(isExpanded ? null : etape.id)}>
                        <div className={`w-11 h-11 flex items-center justify-center rounded-lg flex-shrink-0 ${theme.icon}`}>
                          <span className={`font-heading text-sm font-bold ${theme.iconText}`}>{etape.number}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <i className={`${etape.icon} text-base ${theme.iconText}`} />
                            <h4 className="font-heading text-base font-bold text-foreground-900">{etape.title}</h4>
                            <ExpandIcon expanded={isExpanded} />
                          </div>
                          <p className="text-sm text-foreground-600 leading-relaxed">{etape.description}</p>
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="px-5 pb-5 border-t border-background-200/70 animate-fade-in">
                          <div className="mt-4">
                            <span className="text-xs font-semibold uppercase text-foreground-400 tracking-wider">Template / Référentiel :</span>
                            <div className="mt-2 rounded-lg bg-foreground-950 text-foreground-300 p-4 overflow-x-auto max-h-[450px] overflow-y-auto">
                              <pre className="text-[11px] leading-relaxed font-mono whitespace-pre-wrap">{etape.template}</pre>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            KOS AUTOMATON — CONTENT GENERATION AGENT
        ═══════════════════════════════════════════ */}
        <ContentGenerationAgent />

        {/* ═══════════════════════════════════════════
            PRODUCTION DASHBOARD
        ═══════════════════════════════════════════ */}
        <ProductionDashboard />

        {/* ═══════════════════════════════════════════
            CTA — DEMANDE DE PRODUCTION
        ═══════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-foreground-950 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #c4a235 0%, transparent 70%)' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px bg-primary-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">
                Passez à l'Action
              </span>
              <div className="w-8 h-px bg-primary-500" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              De l'expertise au contenu, du contenu à la mission
            </h2>
            <p className="text-body-md text-foreground-400 max-w-2xl mx-auto mb-8">
              Le Studio Média KHEPRA EXPERTS transforme votre capital intellectuel en machine de croissance. Podcasts, vidéos, optimisation GEO et conversion commerciale — un écosystème intégré au service de votre développement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/kos-production-package-factory/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5 bg-accent-500 text-background-50">
                <i className="ri-folder-open-line" />
                Production Package Factory
              </a>
              <a href="/contact/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5 bg-primary-500 text-background-50">
                <i className="ri-mic-line" />
                Lancer une production
              </a>
              <a href="/centre-editorial/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5 border border-accent-400/50 text-accent-400 bg-accent-500/10">
                <i className="ri-arrow-left-line" />
                Centre Éditorial
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}



