import { useState } from 'react';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import {
  analysisAxes,
  outputFormats,
  editorialStats,
  editorialPrinciples,
} from '@/mocks/editorialHub';

const themeColors = {
  primary: {
    light: 'bg-primary-50',
    border: 'border-primary-200/70',
    text: 'text-primary-700',
    badge: 'bg-primary-100 text-primary-800',
    icon: 'bg-primary-100',
    iconText: 'text-primary-600',
    highlight: 'bg-primary-500',
    highlightText: 'text-background-50',
  },
  accent: {
    light: 'bg-accent-50',
    border: 'border-accent-200/70',
    text: 'text-accent-700',
    badge: 'bg-accent-100 text-accent-800',
    icon: 'bg-accent-100',
    iconText: 'text-accent-600',
    highlight: 'bg-accent-500',
    highlightText: 'text-background-50',
  },
};

function ExpandIcon({ expanded }: { expanded: boolean }) {
  return expanded
    ? <i className="ri-arrow-up-s-line text-foreground-400 ml-auto transition-transform" />
    : <i className="ri-arrow-down-s-line text-foreground-400 ml-auto transition-transform" />;
}

export default function EditorialHubPage() {
  const [expandedAxis, setExpandedAxis] = useState<string | null>(null);
  const [expandedFormat, setExpandedFormat] = useState<string | null>(null);
  const [activeFormatTab, setActiveFormatTab] = useState<string>('all');

  const toggleAxis = (id: string) => {
    setExpandedAxis(expandedAxis === id ? null : id);
  };

  const toggleFormat = (id: string) => {
    setExpandedFormat(expandedFormat === id ? null : id);
  };

  const filteredFormats = activeFormatTab === 'all'
    ? outputFormats
    : outputFormats.filter(f => f.theme === activeFormatTab);

  return (
    <div className="min-h-screen bg-background-50">
      <Navigation />

      <main id="main-content">
        {/* ============================================================
            HERO — Centre Éditorial
        ============================================================ */}
        <section className="relative bg-foreground-950 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #c4a235 0%, transparent 70%)' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-primary-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">
                  Direction Éditoriale
                </span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Centre Éditorial{' '}
                <span className="block text-primary-400">KHEPRA EXPERTS</span>
              </h1>
              <p className="text-body-lg text-foreground-400 leading-relaxed mb-8 max-w-2xl">
                Production de contenus éducatifs, institutionnels et stratégiques destinés aux dirigeants, administrateurs, régulateurs, investisseurs, institutions financières et partenaires techniques. Standard Big Four — rigueur, neutralité, référencement.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#matrice" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5 bg-primary-500 text-background-50">
                  <i className="ri-grid-line" />
                  Explorer la matrice
                </a>
                <a href="#formats" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5 border border-accent-400/50 text-accent-400 bg-accent-500/10">
                  <i className="ri-file-list-3-line" />
                  Voir les formats
                </a>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="relative border-t border-foreground-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                {[
                  { value: editorialStats.publicationsAnnuelles, label: 'Publications / an', icon: 'ri-book-open-line' },
                  { value: editorialStats.formatsActifs, label: 'Formats actifs', icon: 'ri-file-list-3-line' },
                  { value: editorialStats.axesAnalyse, label: 'Axes d\'analyse', icon: 'ri-radar-line' },
                  { value: editorialStats.audiencesCibles, label: 'Audiences cibles', icon: 'ri-group-line' },
                  { value: editorialStats.paysCouverts, label: 'Pays couverts', icon: 'ri-global-line' },
                  { value: editorialStats.scoreQualite + '/10', label: 'Score qualité', icon: 'ri-star-line' },
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

        {/* ============================================================
            PRINCIPES ÉDITORIAUX
        ============================================================ */}
        <section className="py-16 md:py-20 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 mb-3">
                Nos Standards
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-4">
                Principes Éditoriaux
              </h2>
              <p className="text-body-md text-foreground-600 max-w-2xl mx-auto">
                Six piliers qui garantissent la qualité, la fiabilité et l'impact de chaque contenu produit par le Centre Éditorial KHEPRA EXPERTS.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {editorialPrinciples.map((principle) => (
                <div
                  key={principle.id}
                  className="group p-6 rounded-xl bg-background-100 border border-background-200/70 hover:border-primary-200/60 transition-all duration-300 hover:-translate-y-1 cursor-default"
                >
                  <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-primary-100 mb-4 group-hover:bg-primary-200 transition-colors">
                    <i className={`${principle.icon} text-xl text-primary-600`} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground-900 mb-2">{principle.title}</h3>
                  <p className="text-sm text-foreground-600 leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            MATRICE 8×8
        ============================================================ */}
        <section id="matrice" className="py-16 md:py-20 bg-background-100 border-y border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 mb-3">
                Le Framework
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-4">
                Matrice Éditoriale 8×8
              </h2>
              <p className="text-body-md text-foreground-600 max-w-3xl mx-auto">
                Chaque croisement de cette matrice représente un contenu spécifique, calibré pour un public et un format précis. Le standard Big Four est appliqué à chaque intersection.
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                <div className="grid grid-cols-[180px_repeat(8,1fr)] gap-0.5">
                  <div className="p-2 flex items-end">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground-400">Axes ↓ / Formats →</span>
                  </div>
                  {outputFormats.map((format) => (
                    <div key={format.id} className="p-2 text-center">
                      <span className="block text-[11px] font-bold text-foreground-800 whitespace-nowrap">{format.title}</span>
                    </div>
                  ))}

                  {analysisAxes.map((axis) => (
                    <div key={axis.id} className="contents">
                      <div className="p-2 flex items-center gap-1.5 bg-background-50 rounded-l">
                        <span className="text-[10px] font-bold text-foreground-400 w-5">{axis.number}</span>
                        <span className="text-[11px] font-semibold text-foreground-800 whitespace-nowrap">{axis.title}</span>
                      </div>
                      {outputFormats.map((format) => (
                        <div
                          key={`${axis.id}-${format.id}`}
                          className={`p-2 text-center rounded transition-colors cursor-default ${
                            format.theme === axis.theme
                              ? 'bg-primary-500/15 hover:bg-primary-500/25'
                              : 'bg-background-200/30 hover:bg-background-200/50'
                          }`}
                        >
                          <div className={`w-4 h-4 mx-auto rounded-full ${
                            format.theme === axis.theme ? 'bg-primary-500' : 'bg-accent-500/50'
                          }`} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-6 mt-8 text-xs text-foreground-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary-500" />
                <span>Alignement primaire (vert)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent-500/50" />
                <span>Alignement secondaire (or)</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            LES 8 AXES D'ANALYSE
        ============================================================ */}
        <section className="py-16 md:py-20 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 mb-3">
                Analyse Structurée
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-4">
                Les 8 Axes d'Analyse
              </h2>
              <p className="text-body-md text-foreground-600 max-w-2xl mx-auto">
                Chaque sujet traité par le Centre Éditorial est analysé selon ces huit dimensions, garantissant une couverture exhaustive et une profondeur d'analyse de niveau Big Four.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysisAxes.map((axis) => {
                const colors = themeColors[axis.theme as keyof typeof themeColors];
                const isExpanded = expandedAxis === axis.id;
                return (
                  <div
                    key={axis.id}
                    className={`rounded-xl border transition-all duration-300 cursor-pointer ${
                      isExpanded ? colors.border + ' shadow-sm' : 'border-background-200/70 hover:border-primary-200/40'
                    } ${colors.light}`}
                    onClick={() => toggleAxis(axis.id)}
                  >
                    <div className="p-5 flex items-start gap-4">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0 ${colors.icon}`}>
                        <i className={`${axis.icon} text-lg ${colors.iconText}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-foreground-400">{axis.number}</span>
                          <h3 className="font-heading text-base font-bold text-foreground-900">{axis.title}</h3>
                          <ExpandIcon expanded={isExpanded} />
                        </div>
                        <p className="text-sm text-foreground-600 leading-relaxed">{axis.description}</p>
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-background-200/70 animate-fade-in">
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {axis.keywords.map((kw) => (
                                <span key={kw} className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>{kw}</span>
                              ))}
                            </div>
                            <div>
                              <span className="text-xs font-semibold uppercase text-foreground-400 tracking-wider">Livrables types :</span>
                              <ul className="mt-2 space-y-1.5">
                                {axis.deliverables.map((d) => (
                                  <li key={d} className="flex items-center gap-2 text-sm text-foreground-700">
                                    <i className={`ri-check-line text-xs ${colors.iconText}`} />
                                    {d}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            LES 8 FORMATS DE PRODUCTION
        ============================================================ */}
        <section id="formats" className="py-16 md:py-20 bg-background-100 border-y border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 mb-3">
                Production
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-4">
                Les 8 Formats de Production
              </h2>
              <p className="text-body-md text-foreground-600 max-w-2xl mx-auto">
                Chaque format est conçu pour un public spécifique, avec une structure rigoureuse et des templates standardisés.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-center gap-2 mb-10">
              {[
                { key: 'all', label: 'Tous les formats' },
                { key: 'primary', label: 'Formats Primaires' },
                { key: 'accent', label: 'Formats Secondaires' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveFormatTab(tab.key)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${
                    activeFormatTab === tab.key
                      ? 'bg-primary-500 text-background-50'
                      : 'bg-background-200/70 text-foreground-600 hover:bg-background-300/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredFormats.map((format) => {
                const colors = themeColors[format.theme as keyof typeof themeColors];
                const isExpanded = expandedFormat === format.id;
                return (
                  <div
                    key={format.id}
                    className={`rounded-xl border transition-all duration-300 ${
                      isExpanded ? colors.border + ' shadow-sm' : 'border-background-200/70 hover:border-accent-200/40'
                    } bg-background-50`}
                  >
                    <div
                      className="p-5 flex items-start gap-4 cursor-pointer"
                      onClick={() => toggleFormat(format.id)}
                    >
                      <div className={`w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0 ${colors.icon}`}>
                        <i className={`${format.icon} text-xl ${colors.iconText}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.badge}`}>{format.number}</span>
                          <h3 className="font-heading text-base font-bold text-foreground-900">{format.title}</h3>
                          <ExpandIcon expanded={isExpanded} />
                        </div>
                        <p className="text-xs text-foreground-500 italic mb-2">{format.subtitle}</p>
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="block text-foreground-400 font-medium">Public</span>
                            <span className="text-foreground-700">{format.audience}</span>
                          </div>
                          <div>
                            <span className="block text-foreground-400 font-medium">Longueur</span>
                            <span className="text-foreground-700">{format.length}</span>
                          </div>
                          <div>
                            <span className="block text-foreground-400 font-medium">Fréquence</span>
                            <span className="text-foreground-700">{format.frequency}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-0 border-t border-background-200/70 animate-fade-in">
                        <div className="mt-4 mb-4">
                          <span className="text-xs font-semibold uppercase text-foreground-400 tracking-wider">Structure :</span>
                          <div className="mt-2 space-y-1">
                            {format.structure.map((step, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm text-foreground-700">
                                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-background-200 text-[10px] font-bold text-foreground-500 flex-shrink-0">{i + 1}</span>
                                {step}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4">
                          <span className="text-xs font-semibold uppercase text-foreground-400 tracking-wider">Template :</span>
                          <div className="mt-2 rounded-lg bg-foreground-950 text-foreground-300 p-4 overflow-x-auto max-h-[400px] overflow-y-auto">
                            <pre className="text-[11px] leading-relaxed font-mono whitespace-pre-wrap">{format.template}</pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            CTA COMMERCIAL
        ============================================================ */}
        <section className="py-16 md:py-20 bg-foreground-950 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #c4a235 0%, transparent 70%)' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px bg-primary-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">
                Passez à l'action
              </span>
              <div className="w-8 h-px bg-primary-500" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Votre contenu mérite le standard Big Four
            </h2>
            <p className="text-body-md text-foreground-400 max-w-2xl mx-auto mb-8">
              Confiez votre production éditoriale à une équipe qui comprend les enjeux de votre secteur, maîtrise les référentiels réglementaires et sait parler à vos décideurs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/contact/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5 bg-primary-500 text-background-50">
                <i className="ri-calendar-line" />
                Demander une consultation éditoriale
              </a>
              <a href="/publications/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5 border border-accent-400/50 text-accent-400 bg-accent-500/10">
                <i className="ri-book-open-line" />
                Voir nos publications
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}



