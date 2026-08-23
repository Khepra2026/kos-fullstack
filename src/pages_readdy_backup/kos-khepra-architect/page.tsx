import { useKOSKhepraArchitect } from '@/hooks/useKOSKhepraArchitect';
import { SeoHead } from '@/components/feature/SeoHead';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const modeColors: Record<string, string> = {
  primary: 'bg-primary-500 text-background-50',
  accent: 'bg-accent-500 text-background-50',
  secondary: 'bg-secondary-500 text-background-50',
};

const modeColorsLight: Record<string, string> = {
  primary: 'bg-primary-50 text-primary-700 border-primary-200',
  accent: 'bg-accent-50 text-accent-700 border-accent-200',
  secondary: 'bg-secondary-50 text-secondary-700 border-secondary-200',
};

const prioriteBadge: Record<string, string> = {
  H: 'bg-red-100 text-red-800 border-red-200',
  M: 'bg-amber-100 text-amber-800 border-amber-200',
  L: 'bg-background-100 text-foreground-600 border-background-200',
};

export default function khepraArchitectPage() {
  const {
    data,
    modeActif,
    setModeActif,
    modeActifData,
    showRegles,
    toggleRegles,
    expandedExemple,
    toggleExemple,
    useCaseExpand,
    toggleUseCase,
    showMasterPrompts,
    setShowMasterPrompts,
    toggleMasterPrompts,
    activePromptId,
    setActivePromptId,
    activePrompt,
    expandedPromptCode,
    togglePromptCode,
    copiedId,
    copyPromptCode,
  } = useKOSKhepraArchitect();

  return (
    <>
      <SeoHead
        title="KHEPRA Architect v2.0 — IA Stratège Khepra Experts | Knowledge Upgrade System"
        description="KHEPRA Architect : IA stratège qui transforme les connaissances brutes en actifs intellectuels structurés, actionnables et monétisables. 4 modes : AUDIT, UPGRADE, ARCHITECTURE, RESSOURCE. Standard Big Four."
        keywords="KHEPRA Architect, IA, knowledge upgrade, audit, contenu, formation, lead magnet, Big Four, UEMOA, CEMAC"
      />

      <div className="min-h-screen bg-background-50">
        {/* Header */}
        <section className="relative bg-white border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 md:py-7">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-500 text-background-50">
                    <i className="ri-brain-line text-lg"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">KHEPRA Architect v{data.version}</span>
                      <span className="text-[10px] bg-accent-100 text-accent-900 px-2 py-0.5 rounded-full font-semibold">Module 5 — Agrément OS</span>
                    </div>
                    <h1 className="text-xl md:text-3xl font-bold text-foreground-950 leading-tight">{data.produit}</h1>
                  </div>
                </div>
                <p className="text-sm text-foreground-600 mt-1 max-w-3xl">{data.baseline}</p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <a href="/kos-agrement-os" className="flex items-center gap-1.5 text-xs font-medium text-foreground-600 hover:text-primary-500 bg-background-50 hover:bg-background-100 border border-background-200/70 rounded-lg px-3 py-2 transition-all cursor-pointer whitespace-nowrap">
                  <i className="ri-arrow-left-line"></i> Cockpit Agrément OS
                </a>
              </div>
            </div>

            {/* Audience */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-foreground-600">
              <span className="flex items-center gap-1"><i className="ri-user-line"></i> {data.audienceCible.profils.join(', ')}</span>
              <span className="flex items-center gap-1"><i className="ri-global-line"></i> {data.audienceCible.zone}</span>
              <span className="flex items-center gap-1"><i className="ri-bar-chart-line"></i> {data.audienceCible.niveau}</span>
              <span className="flex items-center gap-1"><i className="ri-voiceprint-line"></i> {data.audienceCible.ton}</span>
            </div>

            <BigFourSubtitleBar text="KHEPRA Architect — IA Stratège · 4 Modes d'Action · Standard Big Four — Knowledge Upgrade System" />
          </div>
        </section>

        {/* Navigation Modes */}
        <nav className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-sm border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex overflow-x-auto gap-1 py-2">
              {data.modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setModeActif(mode.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                    modeActif === mode.id
                      ? modeColors[mode.couleur]
                      : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-950'
                  }`}
                >
                  <i className={`${mode.icone} text-base`}></i>
                  {mode.nom}
                </button>
              ))}
              <button
                onClick={() => setShowMasterPrompts(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  showMasterPrompts
                    ? 'bg-accent-500 text-background-50'
                    : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-950'
                }`}
              >
                <i className="ri-terminal-box-line text-base"></i>
                Master Prompts
                <span className="text-[10px] bg-background-50/20 px-1.5 py-0.5 rounded-full">7</span>
              </button>
              {showMasterPrompts && (
                <button
                  onClick={() => setShowMasterPrompts(false)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer text-foreground-600 hover:bg-background-100"
                >
                  <i className="ri-arrow-left-line text-sm"></i> Modes
                </button>
              )}
              <button onClick={toggleRegles} className={`ml-auto flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${showRegles ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'text-foreground-600 hover:bg-background-100'}`}>
                <i className="ri-file-text-line text-sm"></i> Règles d'écriture
              </button>
            </div>
          </div>
        </nav>

        {!showMasterPrompts ? (
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* Règles d'écriture */}
          {showRegles && (
            <div className="mb-6 bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
              <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Règles d'écriture KHEPRA — 6 Commandements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.reglesEcriture.map((r, i) => (
                  <div key={i} className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">{i + 1}</span>
                      <span className="text-xs font-semibold text-foreground-950">{r.regle}</span>
                    </div>
                    <p className="text-xs text-foreground-600">{r.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* En-tête Mode Actif */}
          <div className={`rounded-xl p-5 md:p-6 mb-6 ${modeColorsLight[modeActifData.couleur]}`}>
            <div className="flex items-center gap-4 mb-3">
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${modeColors[modeActifData.couleur]}`}>
                <i className={`${modeActifData.icone} text-xl`}></i>
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground-950">{modeActifData.nom}</h2>
                <p className="text-sm text-foreground-600">{modeActifData.tagline}</p>
              </div>
              <span className="ml-auto text-xs bg-background-50/80 text-foreground-600 px-3 py-1 rounded-full font-mono border border-background-200/70 whitespace-nowrap">{modeActifData.promptCommand}</span>
            </div>
            <p className="text-sm text-foreground-700">{modeActifData.description}</p>
            <div className="mt-3 bg-background-50 rounded-lg p-3 border border-background-200/70">
              <span className="text-xs text-foreground-600">Sortie : </span>
              <span className="text-xs font-mono font-semibold text-foreground-950">{modeActifData.sortie}</span>
            </div>
          </div>

          {/* MODE AUDIT */}
          {modeActif === 'audit' && (
            <div className="space-y-6">
              {/* Critères */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Grille d'Analyse — 4 Critères</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {modeActifData.criteres.map((c) => (
                    <div key={c.nom} className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700 mb-2">
                        <i className={`${c.icone} text-sm`}></i>
                      </div>
                      <div className="text-sm font-semibold text-foreground-950">{c.nom}</div>
                      <div className="text-xs text-foreground-600 mt-1">{c.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exemple */}
              <div className="bg-white rounded-xl border border-background-200/70 overflow-hidden">
                <button onClick={() => toggleExemple('audit')} className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-background-50/50 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                      <i className="ri-play-circle-line text-base"></i>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground-950">Exemple d'interaction</div>
                      <div className="text-xs text-foreground-600">{modeActifData.exempleInteraction.input}</div>
                    </div>
                  </div>
                  <i className={`text-foreground-600 text-lg ${expandedExemple === 'audit' ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}></i>
                </button>
                {expandedExemple === 'audit' && (
                  <div className="border-t border-background-200/70 p-4 md:p-5">
                    <div className="text-xs text-foreground-600 mb-3 bg-background-50 rounded-lg p-3 border border-background-200/70">
                      <span className="font-semibold">Input : </span>{modeActifData.exempleInteraction.input}
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-background-200/70">
                            <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Section</th>
                            <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Statut</th>
                            <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Action</th>
                            <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Priorité</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modeActifData.exempleInteraction.outputTable.map((row, i) => (
                            <tr key={i} className="border-b border-background-100 hover:bg-background-50/50">
                              <td className="py-2 px-2 text-xs font-medium text-foreground-950">{row.section}</td>
                              <td className="py-2 px-2">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${row.statut === 'OK' ? 'bg-accent-100 text-accent-900' : row.statut === 'Lacune' ? 'bg-red-100 text-red-800' : row.statut === 'Redondance' ? 'bg-amber-100 text-amber-800' : row.statut === 'Opportunité' ? 'bg-primary-100 text-primary-700' : 'bg-background-100 text-foreground-600'}`}>
                                  {row.statut}
                                </span>
                              </td>
                              <td className="py-2 px-2 text-xs text-foreground-700">{row.action}</td>
                              <td className="py-2 px-2">
                                <span className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${prioriteBadge[row.priorite] || ''}`}>{row.priorite}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Use Case */}
              <div className="text-xs text-foreground-600 bg-background-50 rounded-lg p-3 border border-background-200/70">
                <span className="font-semibold text-foreground-950">Cas d'usage : </span>{modeActifData.useCase}
              </div>
            </div>
          )}

          {/* MODE UPGRADE */}
          {modeActif === 'upgrade' && (
            <div className="space-y-6">
              {/* Composants */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Fiche Expert Khepra — 7 Composants</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {modeActifData.composants.map((c) => (
                    <div key={c.nom} className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700 mb-2">
                        <i className={`${c.icone} text-sm`}></i>
                      </div>
                      <div className="text-sm font-semibold text-foreground-950">{c.nom}</div>
                      <div className="text-xs text-foreground-600 mt-1">{c.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exemple */}
              <div className="bg-white rounded-xl border border-background-200/70 overflow-hidden">
                <button onClick={() => toggleExemple('upgrade')} className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-background-50/50 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                      <i className="ri-play-circle-line text-base"></i>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground-950">Exemple d'interaction</div>
                      <div className="text-xs text-foreground-600">{modeActifData.exempleInteraction.input}</div>
                    </div>
                  </div>
                  <i className={`text-foreground-600 text-lg ${expandedExemple === 'upgrade' ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}></i>
                </button>
                {expandedExemple === 'upgrade' && (
                  <div className="border-t border-background-200/70 p-4 md:p-5">
                    <div className="text-xs text-foreground-600 mb-3 bg-background-50 rounded-lg p-3 border border-background-200/70">
                      <span className="font-semibold">Input : </span>{modeActifData.exempleInteraction.input}
                    </div>
                    <div className="space-y-3">
                      {Object.entries(modeActifData.exempleInteraction.outputFiche).map(([key, val]) => (
                        <div key={key} className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                          <div className="text-[10px] text-foreground-600 uppercase tracking-wide mb-1">{key}</div>
                          {Array.isArray(val) ? (
                            <ul className="space-y-1">
                              {val.map((item, i) => (
                                <li key={i} className="text-xs text-foreground-700 flex items-start gap-1.5">
                                  <i className="ri-close-circle-line text-red-500 text-xs mt-0.5"></i>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="text-sm text-foreground-950">{val}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-xs text-foreground-600 bg-background-50 rounded-lg p-3 border border-background-200/70">
                <span className="font-semibold text-foreground-950">Cas d'usage : </span>{modeActifData.useCase}
              </div>
            </div>
          )}

          {/* MODE ARCHITECTURE */}
          {modeActif === 'architecture' && (
            <div className="space-y-6">
              {/* Niveaux */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Arborescence — 3 Niveaux</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {modeActifData.niveaux.map((n) => (
                    <div key={n.niveau} className="bg-secondary-50 rounded-lg p-4 border border-secondary-200 text-center">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary-100 text-secondary-700 mx-auto mb-2">
                        <i className={`${n.icone} text-lg`}></i>
                      </div>
                      <div className="text-xs font-semibold text-secondary-700 mb-1">{n.niveau}</div>
                      <div className="text-sm font-bold text-foreground-950">{n.nom}</div>
                      <div className="text-xs text-foreground-600 mt-1">{n.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exemple */}
              <div className="bg-white rounded-xl border border-background-200/70 overflow-hidden">
                <button onClick={() => toggleExemple('architecture')} className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-background-50/50 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700">
                      <i className="ri-play-circle-line text-base"></i>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground-950">Exemple — Structure Formation</div>
                      <div className="text-xs text-foreground-600">{modeActifData.exempleInteraction.input}</div>
                    </div>
                  </div>
                  <i className={`text-foreground-600 text-lg ${expandedExemple === 'architecture' ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}></i>
                </button>
                {expandedExemple === 'architecture' && (
                  <div className="border-t border-background-200/70 p-4 md:p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
                      {modeActifData.exempleInteraction.outputArborescence.piliers.map((p) => (
                        <div key={p.nom} className="bg-secondary-50 rounded-lg p-3 border border-secondary-200 text-center">
                          <div className="text-sm font-bold text-foreground-950">{p.nom}</div>
                          <div className="text-xs text-foreground-600 mt-1">{p.modules} modules</div>
                          <div className="text-xs text-foreground-600">{p.actifs} assets</div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-primary-50 rounded-lg p-3 border border-primary-200 flex items-center justify-between flex-wrap gap-3">
                      <span className="text-xs text-primary-700"><span className="font-bold">{modeActifData.exempleInteraction.outputArborescence.totalModules}</span> modules</span>
                      <span className="text-xs text-primary-700"><span className="font-bold">{modeActifData.exempleInteraction.outputArborescence.totalAssets}</span> assets</span>
                      <span className="text-xs text-primary-700"><span className="font-bold">{modeActifData.exempleInteraction.outputArborescence.dureeTotale}</span></span>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-xs text-foreground-600 bg-background-50 rounded-lg p-3 border border-background-200/70">
                <span className="font-semibold text-foreground-950">Cas d'usage : </span>{modeActifData.useCase}
              </div>
            </div>
          )}

          {/* MODE RESSOURCE */}
          {modeActif === 'ressource' && (
            <div className="space-y-6">
              {/* Formats */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Formats de Livrables</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {modeActifData.formats.map((f) => (
                    <div key={f.nom} className="bg-primary-50 rounded-lg p-3 border border-primary-200 text-center">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700 mx-auto mb-2">
                        <i className={`${f.icone} text-sm`}></i>
                      </div>
                      <div className="text-sm font-semibold text-foreground-950">{f.nom}</div>
                      <div className="text-xs text-foreground-600 mt-0.5">{f.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exemple */}
              <div className="bg-white rounded-xl border border-background-200/70 overflow-hidden">
                <button onClick={() => toggleExemple('ressource')} className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-background-50/50 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                      <i className="ri-play-circle-line text-base"></i>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground-950">Exemple — Lead Magnet</div>
                      <div className="text-xs text-foreground-600">{modeActifData.exempleInteraction.input}</div>
                    </div>
                  </div>
                  <i className={`text-foreground-600 text-lg ${expandedExemple === 'ressource' ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}></i>
                </button>
                {expandedExemple === 'ressource' && (
                  <div className="border-t border-background-200/70 p-4 md:p-5">
                    <div className="space-y-3">
                      {Object.entries(modeActifData.exempleInteraction.outputRessource).map(([key, val]) => (
                        <div key={key} className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                          <div className="text-[10px] text-foreground-600 uppercase tracking-wide mb-1">{key}</div>
                          {Array.isArray(val) ? (
                            <ul className="space-y-1">
                              {val.map((item, i) => (
                                <li key={i} className="text-xs text-foreground-700 flex items-start gap-1.5">
                                  <i className="ri-check-line text-accent-500 text-xs mt-0.5"></i>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="text-sm text-foreground-950">{val}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-xs text-foreground-600 bg-background-50 rounded-lg p-3 border border-background-200/70">
                <span className="font-semibold text-foreground-950">Cas d'usage : </span>{modeActifData.useCase}
              </div>
            </div>
          )}

          {/* Use Cases Grid */}
          <div className="mt-8">
            <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Cas d'Usage — Comment utiliser KHEPRA Architect</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.useCases.map((uc) => (
                <div key={uc.titre} className="bg-white rounded-xl border border-background-200/70 p-4 md:p-5">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-100 text-primary-700 mb-3">
                    <i className={`${uc.icone} text-lg`}></i>
                  </div>
                  <div className="text-sm font-bold text-foreground-950 mb-1">{uc.titre}</div>
                  <p className="text-xs text-foreground-600 mb-3">{uc.description}</p>
                  <div className="space-y-1.5">
                    {uc.etapes.map((e, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="text-[10px] font-bold text-primary-500 bg-primary-50 w-4 h-4 flex items-center justify-center rounded-full flex-shrink-0">{i + 1}</span>
                        <span className="text-xs text-foreground-700">{e}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-amber-50 rounded-xl border border-amber-200 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <i className="ri-error-warning-line text-amber-600 text-lg mt-0.5"></i>
              <div>
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">Disclaimer niveau Big Four</div>
                <p className="text-sm text-amber-800 mt-1 leading-relaxed">{data.disclaimer}</p>
              </div>
            </div>
          </div>
        </main>
        ) : (
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* Header Master Prompts */}
          <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6 mb-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent-500 text-background-50">
                  <i className="ri-terminal-box-line text-xl"></i>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground-950">Bibliothèque Master Prompts Agents</h2>
                  <p className="text-sm text-foreground-600 max-w-2xl">7 Master Prompts calibrés Big Four prêts à être copiés-collés dans les 75 Agents IA KOS. 0 nouvelle table, 0 nouvelle Edge Function, 100% GEO+SEO+FAQ+EEAT, 100% ISO 30401.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-semibold">335 tables</span>
                <span className="text-[10px] bg-accent-100 text-accent-700 px-2 py-1 rounded-full font-semibold">101 Edge Functions</span>
                <span className="text-[10px] bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full font-semibold">75 Agents</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-semibold">Big Four Grade</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar — Liste des 7 Master Prompts */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="bg-white rounded-xl border border-background-200/70 overflow-hidden sticky top-24">
                <div className="p-3 border-b border-background-200/70 bg-background-50">
                  <span className="text-xs font-bold text-foreground-950 uppercase tracking-wide">7 Master Prompts</span>
                </div>
                <div className="divide-y divide-background-100">
                  {data.masterPrompts.map((mp) => (
                    <button
                      key={mp.id}
                      onClick={() => setActivePromptId(mp.id)}
                      className={`w-full text-left p-3 transition-all cursor-pointer ${
                        activePromptId === mp.id
                          ? 'bg-accent-50 border-l-3 border-l-accent-500'
                          : 'hover:bg-background-50 border-l-3 border-l-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 flex items-center justify-center rounded-lg ${activePromptId === mp.id ? 'bg-accent-500 text-background-50' : 'bg-background-100 text-foreground-600'}`}>
                          <i className={`${mp.icone} text-xs`}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-xs font-semibold truncate ${activePromptId === mp.id ? 'text-accent-700' : 'text-foreground-950'}`}>
                            MP{mp.numero} — {mp.nom}
                          </div>
                          {mp.badges[0] !== 'À venir — Prochain envoi KOS' ? (
                            <span className="text-[10px] text-accent-600">Actif</span>
                          ) : (
                            <span className="text-[10px] text-foreground-600">À venir</span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Contenu du Master Prompt actif */}
            <div className="flex-1 min-w-0">
              {activePrompt && (
                <div className="space-y-5">
                  {/* En-tête MP */}
                  <div className={`rounded-xl p-5 md:p-6 ${activePrompt.badges[0] !== 'À venir — Prochain envoi KOS' ? 'bg-white border border-background-200/70' : 'bg-background-50/50 border border-dashed border-background-300/60'}`}>
                    <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${activePrompt.couleur === 'primary' ? 'bg-primary-500 text-background-50' : activePrompt.couleur === 'accent' ? 'bg-accent-500 text-background-50' : 'bg-secondary-500 text-background-50'}`}>
                          <i className={`${activePrompt.icone} text-lg`}></i>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold uppercase tracking-widest text-foreground-600">Master Prompt #{activePrompt.numero}</span>
                            {activePrompt.badges.map((b, i) => (
                              <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                b === 'À venir — Prochain envoi KOS' ? 'bg-background-100 text-foreground-600' :
                                b.includes('ISO') ? 'bg-secondary-100 text-secondary-700' :
                                b.includes('GEO') ? 'bg-accent-100 text-accent-700' :
                                b.includes('Big Four') ? 'bg-amber-100 text-amber-800' :
                                'bg-primary-100 text-primary-700'
                              }`}>{b}</span>
                            ))}
                          </div>
                          <h2 className="text-xl font-bold text-foreground-950 mt-1">{activePrompt.nom}</h2>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground-600">{activePrompt.tagline}</p>

                    {/* Métadonnées */}
                    {activePrompt.badges[0] !== 'À venir — Prochain envoi KOS' && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                          <div className="text-[10px] text-foreground-600 uppercase tracking-wide">Usage</div>
                          <div className="text-xs text-foreground-950 font-semibold mt-0.5">{activePrompt.usage}</div>
                        </div>
                        <div className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                          <div className="text-[10px] text-foreground-600 uppercase tracking-wide">Hubs</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {activePrompt.hubs.map((h) => (
                              <span key={h} className="text-[10px] bg-background-100 text-foreground-700 px-1.5 py-0.5 rounded">{h}</span>
                            ))}
                          </div>
                        </div>
                        <div className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                          <div className="text-[10px] text-foreground-600 uppercase tracking-wide">Conformité</div>
                          <div className="text-xs text-foreground-950 font-semibold mt-0.5">{activePrompt.conformite}</div>
                        </div>
                        <div className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                          <div className="text-[10px] text-foreground-600 uppercase tracking-wide">KPI Qualité</div>
                          <div className="grid grid-cols-2 gap-x-2 gap-y-0 mt-0.5">
                            {activePrompt.kpi.qualityScore && (
                              <span className="text-[10px] text-foreground-700">Quality: <strong className="text-primary-700">{activePrompt.kpi.qualityScore}</strong></span>
                            )}
                            {activePrompt.kpi.seoScore && (
                              <span className="text-[10px] text-foreground-700">SEO: <strong className="text-accent-700">{activePrompt.kpi.seoScore}</strong></span>
                            )}
                            {activePrompt.kpi.citationIndice && (
                              <span className="text-[10px] text-foreground-700">Citation: <strong className="text-secondary-700">{activePrompt.kpi.citationIndice}</strong></span>
                            )}
                            {activePrompt.kpi.bigfourChecks && (
                              <span className="text-[10px] text-foreground-700">Big Four: <strong className="text-amber-700">{activePrompt.kpi.bigfourChecks}</strong></span>
                            )}
                            {activePrompt.kpi.precisionBenchmark && (
                              <span className="text-[10px] text-foreground-700">Benchmark: <strong className="text-primary-700">{activePrompt.kpi.precisionBenchmark}</strong></span>
                            )}
                            {activePrompt.kpi.isoCoverage && (
                              <span className="text-[10px] text-foreground-700">ISO: <strong className="text-secondary-700">{activePrompt.kpi.isoCoverage}</strong></span>
                            )}
                            {activePrompt.kpi.domainesCouverts && (
                              <span className="text-[10px] text-foreground-700">Domaines: <strong className="text-accent-700">{activePrompt.kpi.domainesCouverts}</strong></span>
                            )}
                            {activePrompt.kpi.tempsExecution && (
                              <span className="text-[10px] text-foreground-700">Temps: <strong className="text-amber-700">{activePrompt.kpi.tempsExecution}</strong></span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contenu détaillé MP1 */}
                  {activePrompt.badges[0] !== 'À venir — Prochain envoi KOS' ? (
                    <>
                      {/* ROLE */}
                      <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                            <i className="ri-user-star-line text-sm"></i>
                          </div>
                          <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Rôle de l'Agent</h3>
                        </div>
                        <p className="text-sm text-foreground-700 leading-relaxed">{activePrompt.role}</p>
                      </div>

                      {/* Contexte Système */}
                      <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700">
                            <i className="ri-database-2-line text-sm"></i>
                          </div>
                          <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Contexte Système KOS</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                            <div className="text-[10px] text-foreground-600 uppercase tracking-wide mb-2">Tables existantes utilisées</div>
                            <div className="flex flex-wrap gap-1.5">
                              {activePrompt.contexte.tables.map((t) => (
                                <code key={t} className="text-[10px] bg-secondary-50 text-secondary-700 px-2 py-1 rounded font-mono border border-secondary-200">{t}</code>
                              ))}
                            </div>
                          </div>
                          <div className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                            <div className="text-[10px] text-foreground-600 uppercase tracking-wide mb-2">Edge Functions appelées</div>
                            <div className="flex flex-wrap gap-1.5">
                              {activePrompt.contexte.edgeFunctions.map((ef) => (
                                <code key={ef} className="text-[10px] bg-primary-50 text-primary-700 px-2 py-1 rounded font-mono border border-primary-200">{ef}</code>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* PROCESS / CHECKLIST — Conditionnel */}
                      {activePrompt.process.length > 0 && (
                      <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                            <i className={`text-sm ${activePrompt.id === 'mp3' ? 'ri-check-double-line' : 'ri-flow-chart'}`}></i>
                          </div>
                          <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">
                            {activePrompt.id === 'mp3' ? 'CHECKLIST 0 DÉFAUT AVANT PUBLISH — 5 Axes' : 'PROCESS 0 ERREUR — 6 Étapes'}
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {activePrompt.process.map((step) => (
                            <div key={step.etape} className={`rounded-lg p-4 border ${
                              step.couleur === 'primary' ? 'bg-primary-50 border-primary-200' :
                              step.couleur === 'accent' ? 'bg-accent-50 border-accent-200' :
                              'bg-secondary-50 border-secondary-200'
                            }`}>
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold ${
                                  step.couleur === 'primary' ? 'bg-primary-500 text-background-50' :
                                  step.couleur === 'accent' ? 'bg-accent-500 text-background-50' :
                                  'bg-secondary-500 text-background-50'
                                }`}>{step.etape}</span>
                                <div className="flex items-center gap-1.5">
                                  <i className={`${step.icone} text-xs ${step.couleur === 'primary' ? 'text-primary-600' : step.couleur === 'accent' ? 'text-accent-600' : 'text-secondary-600'}`}></i>
                                  <span className="text-xs font-bold text-foreground-950">{step.nom}</span>
                                </div>
                              </div>
                              <p className="text-xs text-foreground-600 leading-relaxed">{step.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      )}

                      {/* RÈGLES NON-NÉGOCIABLES — MP4 */}
                      {activePrompt.reglesNonNegociables && activePrompt.reglesNonNegociables.length > 0 && (
                      <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-100 text-red-700">
                            <i className="ri-scales-3-line text-sm"></i>
                          </div>
                          <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">RÈGLES NON-NÉGOCIABLES — Politique KM v1 — 6 Règles</h3>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                          {activePrompt.reglesNonNegociables.map((r) => (
                            <div key={r.numero} className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-100 text-red-700 text-xs font-bold flex-shrink-0">{r.numero}</span>
                                <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-600 flex-shrink-0">
                                  <i className={`${r.icone} text-sm`}></i>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-black text-red-800">{r.regle}</span>
                                  <span className="text-[10px] font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded">{r.clauseISO}</span>
                                </div>
                              </div>
                              <p className="text-xs text-foreground-700 leading-relaxed ml-13">{r.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      )}

                      {/* CHECKLIST DÉTAILLÉE — MP3 */}
                      {activePrompt.checklist && (
                        <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                              <i className="ri-list-check-3 text-sm"></i>
                            </div>
                            <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Checklist Détaillée — 5 Axes × Sous-critères</h3>
                          </div>
                          <div className="space-y-4">
                            {activePrompt.checklist.map((cl, i) => (
                              <div key={cl.axe} className={`rounded-lg p-4 border ${
                                cl.couleur === 'primary' ? 'bg-primary-50/50 border-primary-200' :
                                cl.couleur === 'accent' ? 'bg-accent-50/50 border-accent-200' :
                                'bg-secondary-50/50 border-secondary-200'
                              }`}>
                                <div className="flex items-center gap-2 mb-3">
                                  <span className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold ${
                                    cl.couleur === 'primary' ? 'bg-primary-500 text-background-50' :
                                    cl.couleur === 'accent' ? 'bg-accent-500 text-background-50' :
                                    'bg-secondary-500 text-background-50'
                                  }`}>{i + 1}</span>
                                  <div className={`w-6 h-6 flex items-center justify-center rounded-lg ${
                                    cl.couleur === 'primary' ? 'bg-primary-100 text-primary-700' :
                                    cl.couleur === 'accent' ? 'bg-accent-100 text-accent-700' :
                                    'bg-secondary-100 text-secondary-700'
                                  }`}>
                                    <i className={`${cl.icone} text-xs`}></i>
                                  </div>
                                  <span className="text-sm font-bold text-foreground-950">{cl.axe}</span>
                                  <span className="text-[10px] text-foreground-600 bg-background-100 px-1.5 py-0.5 rounded-full">{cl.items.length} critères</span>
                                </div>
                                <ul className="space-y-1.5 ml-11">
                                  {cl.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-2 text-xs text-foreground-700">
                                      <i className={`text-[10px] mt-0.5 ${
                                        cl.couleur === 'primary' ? 'ri-checkbox-circle-line text-primary-500' :
                                        cl.couleur === 'accent' ? 'ri-checkbox-circle-line text-accent-500' :
                                        'ri-checkbox-circle-line text-secondary-500'
                                      }`}></i>
                                      <span className="leading-relaxed">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* KPI COMPARATIFS BIG FOUR — MP2 */}
                      {activePrompt.kpiComparatifs && (
                        <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                              <i className="ri-contrast-2-line text-sm"></i>
                            </div>
                            <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Benchmark Big Four 2026 — 6 KPIs Comparatifs</h3>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-background-200/70">
                                  <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">KPI</th>
                                  <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Seuil Big Four 2026</th>
                                  <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Format</th>
                                  <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Domaine</th>
                                </tr>
                              </thead>
                              <tbody>
                                {activePrompt.kpiComparatifs.map((k, i) => (
                                  <tr key={i} className="border-b border-background-100 hover:bg-background-50/50">
                                    <td className="py-2.5 px-2 text-xs font-medium text-foreground-950">{k.kpi}</td>
                                    <td className="py-2.5 px-2">
                                      <span className="text-xs font-bold text-accent-700 bg-accent-50 px-2 py-0.5 rounded border border-accent-200 whitespace-nowrap">{k.seuilBigFour}</span>
                                    </td>
                                    <td className="py-2.5 px-2 text-xs text-foreground-600">{k.format}</td>
                                    <td className="py-2.5 px-2 text-xs text-foreground-600">{k.domaine}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* MAPPING ISO 30401 — MP2 */}
                      {activePrompt.mappingISO && (
                        <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700">
                              <i className="ri-file-check-line text-sm"></i>
                            </div>
                            <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Mapping ISO 30401 — Traçabilité Clause → KPI</h3>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {activePrompt.mappingISO.map((m, i) => (
                              <div key={i} className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xs font-black text-secondary-700 bg-secondary-100 px-2 py-0.5 rounded">{m.clause}</span>
                                  <span className="text-xs font-semibold text-foreground-950">{m.titre}</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {m.kpis.map((kpi, j) => (
                                    <span key={j} className="text-[10px] bg-white text-secondary-700 px-2 py-0.5 rounded-full border border-secondary-200">{kpi}</span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* RÈGLE 0 GAP — MP2 */}
                      {activePrompt.zeroGap && (
                        <div className="bg-red-50 rounded-xl border-2 border-red-300 p-5 md:p-6">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500 text-background-50 flex-shrink-0">
                              <i className="ri-alert-line text-sm"></i>
                            </div>
                            <div>
                              <div className="text-sm font-black text-red-800 uppercase tracking-wide mb-1">RÈGLE 0 GAP — NON NÉGOCIABLE</div>
                              <p className="text-sm text-red-800 font-semibold leading-relaxed">{activePrompt.zeroGap}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 7 GATES — Conditionnel */}
                      {activePrompt.septGates && activePrompt.septGates.length > 0 && (
                      <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                            <i className="ri-git-pull-request-line text-sm"></i>
                          </div>
                          <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Pipeline 7 Gates — Score 100/100 Requis</h3>
                        </div>
                        <div className="space-y-2">
                          {activePrompt.septGates.map((g, i) => (
                            <div key={g.gate} className="flex items-center justify-between bg-background-50 rounded-lg p-3 border border-background-200/70">
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold text-foreground-600 w-5 text-center">{i + 1}</span>
                                <div>
                                  <span className="text-sm font-semibold text-foreground-950">{g.gate}</span>
                                  <span className="text-xs text-foreground-600 ml-2">{g.description}</span>
                                </div>
                              </div>
                              <span className="text-sm font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded whitespace-nowrap">{g.points} pts</span>
                            </div>
                          ))}
                          <div className="flex items-center justify-between bg-primary-50 rounded-lg p-3 border border-primary-200">
                            <span className="text-sm font-bold text-primary-700">TOTAL — Score Minimum Requis</span>
                            <span className="text-lg font-black text-primary-600">100/100</span>
                          </div>
                        </div>
                      </div>
                      )}

                      {/* REFUS SI — MP3 */}
                      {activePrompt.refusSi && (
                        <div className="bg-red-50 rounded-xl border-2 border-red-300 p-5 md:p-6">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500 text-background-50 flex-shrink-0">
                              <i className="ri-stop-circle-line text-sm"></i>
                            </div>
                            <div>
                              <div className="text-sm font-black text-red-800 uppercase tracking-wide mb-1">REFUS AUTOMATIQUE — CONDITIONS BLOQUANTES</div>
                              <p className="text-sm text-red-800 font-semibold leading-relaxed">{activePrompt.refusSi}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* STRUCTURE OBLIGATOIRE BIG FOUR — MP5 */}
                      {activePrompt.structureBigFour && activePrompt.structureBigFour.length > 0 && (
                      <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                            <i className="ri-layout-masonry-line text-sm"></i>
                          </div>
                          <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">STRUCTURE OBLIGATOIRE BIG FOUR — 7 Sections PwC/EY</h3>
                        </div>
                        <div className="space-y-3">
                          {activePrompt.structureBigFour.map((s) => (
                            <div key={s.section} className={`rounded-lg p-4 border ${
                              s.couleur === 'primary' ? 'bg-primary-50/40 border-primary-200/70' :
                              s.couleur === 'accent' ? 'bg-accent-50/40 border-accent-200/70' :
                              'bg-secondary-50/40 border-secondary-200/70'
                            }`}>
                              <div className="flex items-start gap-3">
                                <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-black flex-shrink-0 ${
                                  s.couleur === 'primary' ? 'bg-primary-500 text-background-50' :
                                  s.couleur === 'accent' ? 'bg-accent-500 text-background-50' :
                                  'bg-secondary-500 text-background-50'
                                }`}>{s.section}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <span className="text-sm font-bold text-foreground-950">{s.nom}</span>
                                    <span className="text-[10px] text-foreground-600 bg-background-100 px-1.5 py-0.5 rounded-full whitespace-nowrap">{s.livrable}</span>
                                  </div>
                                  <p className="text-xs text-foreground-600 leading-relaxed">{s.description}</p>
                                </div>
                                <div className={`w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 ${
                                  s.couleur === 'primary' ? 'bg-primary-100 text-primary-600' :
                                  s.couleur === 'accent' ? 'bg-accent-100 text-accent-600' :
                                  'bg-secondary-100 text-secondary-600'
                                }`}>
                                  <i className={`${s.icone} text-sm`}></i>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      )}

                      {/* RÈGLES KOS — MP5 */}
                      {activePrompt.reglesKos && activePrompt.reglesKos.length > 0 && (
                      <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                            <i className="ri-scales-line text-sm"></i>
                          </div>
                          <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">RÈGLES KOS — 4 Règles Fondamentales de Génération</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {activePrompt.reglesKos.map((r, i) => (
                            <div key={i} className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700 flex-shrink-0">
                                  <i className={`${r.icone} text-sm`}></i>
                                </div>
                                <span className="text-sm font-bold text-foreground-950">{r.regle}</span>
                              </div>
                              <p className="text-xs text-foreground-600 leading-relaxed ml-9">{r.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      )}

                      {/* 12/12 KPI CHECKS — MP5 */}
                      {activePrompt.kpiChecks && activePrompt.kpiChecks.length > 0 && (
                      <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                            <i className="ri-check-double-line text-sm"></i>
                          </div>
                          <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Contrôle Qualité — 12/12 Checks Big Four Obligatoires</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {activePrompt.kpiChecks.map((c, i) => (
                            <div key={i} className="bg-accent-50/40 rounded-lg p-3 border border-accent-200/70 flex items-start gap-2.5">
                              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-accent-500 text-background-50 flex-shrink-0 mt-0.5">
                                <i className={`${c.icone} text-[10px]`}></i>
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-xs font-bold text-foreground-950 block">{c.check}</span>
                                <span className="text-[10px] text-foreground-600 leading-relaxed">{c.description}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 bg-accent-50 rounded-lg p-3 border border-accent-200 flex items-center justify-between">
                          <span className="text-xs font-bold text-accent-700">TOTAL CHECKS BIG FOUR</span>
                          <span className="text-lg font-black text-accent-600">12/12</span>
                        </div>
                      </div>
                      )}

                      {/* 4 ANGLES — MP6 */}
                      {activePrompt.angles && activePrompt.angles.length > 0 && (
                      <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                            <i className="ri-compasses-2-line text-sm"></i>
                          </div>
                          <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">4 ANGLES DE CONTENU — Un angle par persona</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {activePrompt.angles.map((a, i) => (
                            <div key={a.angle} className={`rounded-lg p-4 border ${
                              a.couleur === 'primary' ? 'bg-primary-50/40 border-primary-200/70' :
                              a.couleur === 'accent' ? 'bg-accent-50/40 border-accent-200/70' :
                              'bg-secondary-50/40 border-secondary-200/70'
                            }`}>
                              <div className="flex items-center gap-2 mb-2">
                                <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                                  a.couleur === 'primary' ? 'bg-primary-500 text-background-50' :
                                  a.couleur === 'accent' ? 'bg-accent-500 text-background-50' :
                                  'bg-secondary-500 text-background-50'
                                }`}>
                                  <i className={`${a.icone} text-sm`}></i>
                                </div>
                                <span className="text-sm font-black text-foreground-950">{a.angle}</span>
                              </div>
                              <div className="text-[10px] text-foreground-600 font-medium uppercase tracking-wide mb-1.5">{a.cible}</div>
                              <p className="text-xs text-foreground-700 leading-relaxed">{a.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      )}

                      {/* 4 FORMATS — MP6 */}
                      {activePrompt.formats && activePrompt.formats.length > 0 && (
                      <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700">
                            <i className="ri-layout-masonry-line text-sm"></i>
                          </div>
                          <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">4 FORMATS DE POSTS — Optimisés LinkedIn Algorithm 2026</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {activePrompt.formats.map((f, i) => (
                            <div key={f.format} className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700 mb-2">
                                <i className={`${f.icone} text-base`}></i>
                              </div>
                              <div className="text-sm font-bold text-foreground-950 mb-1">{f.format}</div>
                              <p className="text-xs text-foreground-600 mb-2 leading-relaxed">{f.description}</p>
                              <span className="text-[10px] font-medium bg-secondary-50 text-secondary-700 px-2 py-0.5 rounded border border-secondary-200 whitespace-nowrap">{f.specs}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      )}

                      {/* CHECKLIST 0 GAP — MP7 */}
                      {activePrompt.auditChecklist && activePrompt.auditChecklist.length > 0 && (
                      <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-100 text-red-700">
                            <i className="ri-search-eye-line text-sm"></i>
                          </div>
                          <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">CHECKLIST 0 GAP — Audit {activePrompt.conformite.split('+')[0].trim()}</h3>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                          {activePrompt.auditChecklist.map((c) => (
                            <div key={c.numero} className={`rounded-lg p-4 border ${
                              c.couleur === 'primary' ? 'bg-primary-50/40 border-primary-200/70' :
                              c.couleur === 'accent' ? 'bg-accent-50/40 border-accent-200/70' :
                              'bg-secondary-50/40 border-secondary-200/70'
                            }`}>
                              <div className="flex items-start gap-3">
                                <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-black flex-shrink-0 ${
                                  c.couleur === 'primary' ? 'bg-primary-500 text-background-50' :
                                  c.couleur === 'accent' ? 'bg-accent-500 text-background-50' :
                                  'bg-secondary-500 text-background-50'
                                }`}>{c.numero}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <div className={`w-6 h-6 flex items-center justify-center rounded-lg ${
                                      c.couleur === 'primary' ? 'bg-primary-100 text-primary-600' :
                                      c.couleur === 'accent' ? 'bg-accent-100 text-accent-600' :
                                      'bg-secondary-100 text-secondary-600'
                                    }`}>
                                      <i className={`${c.icone} text-xs`}></i>
                                    </div>
                                    <span className={`text-sm font-black ${
                                      c.couleur === 'primary' ? 'text-primary-800' :
                                      c.couleur === 'accent' ? 'text-accent-800' :
                                      'text-secondary-800'
                                    }`}>{c.nom}</span>
                                  </div>
                                  <p className="text-xs text-foreground-600 leading-relaxed ml-9">{c.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      )}

                      {/* RAG OUTPUT — MP7 */}
                      {activePrompt.ragOutput && (
                      <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                            <i className="ri-traffic-light-line text-sm"></i>
                          </div>
                          <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">OUTPUT — Rapport Audit RAG — 3 Niveaux</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-emerald-50/60 rounded-xl p-5 border border-emerald-200/70 flex flex-col items-center text-center">
                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-500 text-background-50 mb-3">
                              <i className="ri-checkbox-circle-line text-xl"></i>
                            </div>
                            <div className="text-sm font-black text-emerald-800 mb-1">{activePrompt.ragOutput.vert.label}</div>
                            <p className="text-xs text-emerald-700 leading-relaxed">{activePrompt.ragOutput.vert.description}</p>
                          </div>
                          <div className="bg-amber-50/60 rounded-xl p-5 border border-amber-200/70 flex flex-col items-center text-center">
                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-500 text-background-50 mb-3">
                              <i className="ri-error-warning-line text-xl"></i>
                            </div>
                            <div className="text-sm font-black text-amber-800 mb-1">{activePrompt.ragOutput.ambre.label}</div>
                            <p className="text-xs text-amber-700 leading-relaxed">{activePrompt.ragOutput.ambre.description}</p>
                          </div>
                          <div className="bg-red-50/60 rounded-xl p-5 border-2 border-red-300/70 flex flex-col items-center text-center">
                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-500 text-background-50 mb-3">
                              <i className="ri-close-circle-line text-xl"></i>
                            </div>
                            <div className="text-sm font-black text-red-800 mb-1">{activePrompt.ragOutput.rouge.label}</div>
                            <p className="text-xs text-red-700 leading-relaxed">{activePrompt.ragOutput.rouge.description}</p>
                          </div>
                        </div>
                      </div>
                      )}

                      {/* OUTPUT + INTERDICTIONS */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                              <i className="ri-file-list-2-line text-sm"></i>
                            </div>
                            <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Output — {activePrompt.output.sections.length} Livrables</h3>
                          </div>
                          <ul className="space-y-2">
                            {activePrompt.output.sections.map((s, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                                <i className="ri-checkbox-circle-line text-accent-500 text-sm mt-0.5"></i>
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-red-50 rounded-xl border border-red-200 p-5 md:p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-100 text-red-700">
                              <i className="ri-forbid-line text-sm"></i>
                            </div>
                            <h3 className="text-sm font-bold text-red-800 uppercase tracking-wide">INTERDICTIONS</h3>
                          </div>
                          <ul className="space-y-2">
                            {activePrompt.interdictions.map((d, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                                <i className="ri-close-circle-line text-red-500 text-sm mt-0.5"></i>
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CODE PROMPT */}
                      <div className="bg-white rounded-xl border border-background-200/70 overflow-hidden">
                        <button
                          onClick={() => togglePromptCode(activePrompt.id)}
                          className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-background-50/50 transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-foreground-950 text-background-50">
                              <i className="ri-code-s-slash-line text-sm"></i>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-foreground-950">Code Prompt Complet — Copier-Coller dans l'Agent</div>
                              <div className="text-xs text-foreground-600">Prompt prêt à l'emploi pour injection dans les 75 Agents IA KOS</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); copyPromptCode(activePrompt.id, activePrompt.codePrompt); }}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                                copiedId === activePrompt.id
                                  ? 'bg-accent-500 text-background-50'
                                  : 'bg-background-100 text-foreground-700 hover:bg-accent-100 hover:text-accent-700'
                              }`}
                            >
                              <i className={`text-xs ${copiedId === activePrompt.id ? 'ri-check-line' : 'ri-clipboard-line'}`}></i>
                              {copiedId === activePrompt.id ? 'Copié !' : 'Copier'}
                            </button>
                            <i className={`text-foreground-600 text-lg ${expandedPromptCode === activePrompt.id ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}></i>
                          </div>
                        </button>
                        {expandedPromptCode === activePrompt.id && (
                          <div className="border-t border-background-200/70 p-4 md:p-5">
                            <pre className="bg-foreground-950 text-background-50 rounded-lg p-4 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[600px] overflow-y-auto">
                              {activePrompt.codePrompt}
                            </pre>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="bg-white rounded-xl border border-dashed border-background-300/60 p-10 text-center">
                      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-background-100 text-foreground-600 mx-auto mb-4">
                        <i className="ri-hourglass-line text-2xl"></i>
                      </div>
                      <h3 className="text-base font-bold text-foreground-950 mb-2">Master Prompt #{activePrompt.numero} — En attente</h3>
                      <p className="text-sm text-foreground-600 max-w-md mx-auto">
                        Ce master prompt est en cours de transmission par KOS. Il sera intégré dès réception avec le même niveau de détail : processus 0 erreur, 7 gates, EEAT, GEO+SEO, KPIs Big Four.
                      </p>
                      <div className="mt-4 inline-flex items-center gap-2 bg-accent-50 text-accent-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-accent-200">
                        <i className="ri-send-plane-line"></i> Prochain envoi KOS
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Disclaimer Big Four */}
          <div className="mt-8 bg-amber-50 rounded-xl border border-amber-200 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <i className="ri-error-warning-line text-amber-600 text-lg mt-0.5"></i>
              <div>
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">Contrainte Master Prompts — 0 Nouvelle Table, 0 Nouvelle Edge Function</div>
                <p className="text-sm text-amber-800 mt-1 leading-relaxed">Tous les Master Prompts exploitent exclusivement l'infrastructure existante : 335 tables, 101 Edge Functions, 120 Hubs, Global Knowledge Graph (2 847 nœuds), RAG (1.1M embeddings). Conformes ISO 30401 §7.5 et Big Four Grade. Les prompts sont prêts à être injectés dans les 75 Agents IA KOS sans aucune modification d'infrastructure.</p>
              </div>
            </div>
          </div>
        </main>
        )}
      </div>
    </>
  );
}



