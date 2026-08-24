import { useKOSAgrementOS } from '@/hooks/useKOSAgrementOS';
import { SeoHead } from '@/components/feature/SeoHead';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const moduleLabels: Record<string, string> = {
  'maturity-scan': 'Maturity Scan',
  'file-builder': 'File Builder',
  'regulator-hub': 'Regulator Hub',
  'opening-os': 'Opening OS',
  'khepra-architect': 'KHEPRA Architect',
};

const modulePhases: Record<string, string> = {
  'maturity-scan': 'J0-J15',
  'file-builder': 'J15-J75',
  'regulator-hub': 'J75-J120',
  'opening-os': 'J120-J270',
  'khepra-architect': 'Transversal',
};

const statutBadge: Record<string, { label: string; classe: string }> = {
  complete: { label: 'Terminé', classe: 'bg-accent-100 text-accent-900 border-accent-200' },
  in_progress: { label: 'En cours', classe: 'bg-primary-100 text-primary-700 border-primary-200' },
  pending: { label: 'À venir', classe: 'bg-background-100 text-foreground-600 border-background-200' },
};

const criticiteBadge: Record<string, string> = {
  Bloquant: 'bg-red-100 text-red-800 border-red-200',
  Majeur: 'bg-amber-100 text-amber-800 border-amber-200',
  Mineur: 'bg-background-100 text-foreground-600 border-background-200',
};

const risqueBadge: Record<string, string> = {
  Faible: 'bg-accent-100 text-accent-900',
  Moyen: 'bg-amber-100 text-amber-800',
  Élevé: 'bg-red-100 text-red-800',
  Critique: 'bg-red-500 text-background-50',
};

function ProgressCircle({ value, size = 80, strokeWidth = 6, colorClass = 'text-primary-500', children }: { value: number; size?: number; strokeWidth?: number; colorClass?: string; children?: React.ReactNode }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-background-100" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className={`${colorClass} transition-all duration-700 ease-out`} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children || <span className="text-sm font-bold text-foreground-950">{value}%</span>}
      </div>
    </div>
  );
}

function ProgressBar({ value, label, colorClass = 'bg-primary-500' }: { value: number; label?: string; colorClass?: string }) {
  return (
    <div className="w-full">
      {label && <div className="flex justify-between items-center mb-1"><span className="text-xs text-foreground-600">{label}</span><span className="text-xs font-semibold text-foreground-950">{value}%</span></div>}
      <div className="w-full h-2 bg-background-100 rounded-full overflow-hidden">
        <div className={`h-full ${colorClass} rounded-full transition-all duration-700 ease-out`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function agrementOSPage() {
  const {
    data,
    activeModule,
    setActiveModule,
    moduleActif,
    expandedPrompt,
    togglePrompt,
    showGantt,
    toggleGantt,
    showPrompts,
    togglePrompts,
    showRex,
    toggleRex,
    alertesNonLues,
    marquerAlerteLue,
    bigFourScore,
    erreursBloquantes,
  } = useKOSAgrementOS();

  return (
    <>
      <SeoHead
        title="KHEPRA Agrément OS v1.0 — Pilotage Agrément IMF/EMF BCEAO-COBAC J0-J270"
        description="SaaS workflow KHEPRA Agrément OS : Data room COBAC, IA erreurs AUSCGIE, Gantt auto, simulateur entretiens régulateur. 4 modules, 4 phases KHEPRA LICENSE™. Standard Big Four."
        keywords="KHEPRA, Agrément OS, agrément IMF, agrément EMF, COBAC, BCEAO, AUSCGIE, microfinance, UEMOA, CEMAC, data room, SaaS conformité"
      />

      <div className="min-h-screen bg-background-50">
        {/* Hero — Dashboard Header */}
        <section className="relative bg-white border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-500 text-background-50">
                    <i className="ri-building-4-line text-lg"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">KHEPRA Agrément OS v1.0</span>
                      <span className="text-[10px] bg-accent-100 text-accent-900 px-2 py-0.5 rounded-full font-semibold">J+90 — Go-Live</span>
                    </div>
                    <h1 className="text-xl md:text-3xl font-bold text-foreground-950 leading-tight">{data.produit}</h1>
                  </div>
                </div>
                <p className="text-sm md:text-base text-foreground-600 mt-1 max-w-3xl">{data.baseline}</p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 bg-background-50 rounded-xl px-3 py-2 border border-background-200/70">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary-500">{data.projetActif.avancement}%</div>
                    <div className="text-[10px] text-foreground-600">Avancement</div>
                  </div>
                  <div className="w-px h-8 bg-background-200/70"></div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground-950">J+{data.projetActif.jourActuel}</div>
                    <div className="text-[10px] text-foreground-600">/{data.projetActif.echeanceSoumission}</div>
                  </div>
                  <div className="w-px h-8 bg-background-200/70"></div>
                  <div className="text-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${risqueBadge[data.projetActif.risque] || risqueBadge.Moyen}`}>
                      Risque {data.projetActif.risque}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alerte IA */}
            <div className="mt-3 flex items-start gap-3 flex-wrap">
              {data.projetActif.alertesIA.filter(a => !a.lu).map(alerte => (
                <div key={alerte.id} className={`flex items-start gap-2 rounded-lg p-3 border text-sm max-w-lg ${alerte.type === 'blocker' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                  <i className={`text-base mt-0.5 ${alerte.type === 'blocker' ? 'ri-close-circle-fill text-red-600' : 'ri-error-warning-fill text-amber-600'}`}></i>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground-950 font-medium text-xs leading-relaxed">{alerte.message}</p>
                    <p className="text-xs text-foreground-600 mt-0.5">{alerte.correction}</p>
                  </div>
                  <button onClick={() => marquerAlerteLue(alerte.id)} className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full hover:bg-background-200/70 transition-all cursor-pointer">
                    <i className="ri-close-line text-foreground-600 text-xs"></i>
                  </button>
                </div>
              ))}
            </div>

            {/* Infos client */}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-foreground-600">
              <span className="flex items-center gap-1"><i className="ri-user-line"></i> {data.projetActif.client}</span>
              <span className="flex items-center gap-1"><i className="ri-price-tag-3-line"></i> {data.projetActif.categorie}</span>
              <span className="flex items-center gap-1"><i className="ri-map-pin-line"></i> {data.projetActif.pays}</span>
              <span className="flex items-center gap-1"><i className="ri-bank-line"></i> Régulateur : {data.projetActif.regulateur}</span>
              <span className="flex items-center gap-1"><i className="ri-team-line"></i> {data.projetActif.responsable} + {data.projetActif.coResponsable}</span>
            </div>

            <BigFourSubtitleBar text="KHEPRA Agrément OS — Data Room COBAC · IA Erreurs AUSCGIE · Gantt Auto · Simulateur Entretiens — Standard Big Four" />
          </div>
        </section>

        {/* Navigation Modules */}
        <nav className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-sm border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex overflow-x-auto gap-1 py-2">
              {data.modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                    activeModule === mod.id
                      ? 'bg-primary-500 text-background-50'
                      : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-950'
                  }`}
                >
                  <i className={`${mod.icone} text-base`}></i>
                  {moduleLabels[mod.id]}
                  <span className={`text-[10px] font-medium ${activeModule === mod.id ? 'text-background-50/80' : 'text-foreground-600'}`}>{modulePhases[mod.id]}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeModule === mod.id ? 'bg-background-50/20 text-background-50' : 'bg-background-100 text-foreground-600'
                  }`}>{mod.progression}%</span>
                  {mod.id === 'file-builder' && erreursBloquantes > 0 && (
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  )}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-2">
                <button onClick={toggleGantt} className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${showGantt ? 'bg-accent-100 text-accent-900' : 'text-foreground-600 hover:bg-background-100'}`}>
                  <i className="ri-bar-chart-line text-sm"></i> Gantt
                </button>
                <button onClick={togglePrompts} className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${showPrompts ? 'bg-primary-100 text-primary-700' : 'text-foreground-600 hover:bg-background-100'}`}>
                  <i className="ri-robot-line text-sm"></i> Prompts IA
                </button>
                <button onClick={toggleRex} className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${showRex ? 'bg-secondary-100 text-secondary-900' : 'text-foreground-600 hover:bg-background-100'}`}>
                  <i className="ri-folder-history-line text-sm"></i> REX
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Gantt Panel */}
        {showGantt && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 mt-4">
            <div className="bg-white rounded-xl border border-background-200/70 p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Diagramme Gantt — J0 → J270</h3>
                <span className="text-xs text-foreground-600">KHEPRA LICENSE™ — 4 Phases</span>
              </div>
              <div className="space-y-3">
                {data.gantt.map((bar) => (
                  <div key={bar.phase} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-foreground-950 w-28 flex-shrink-0">{bar.phase}</span>
                    <div className="flex-1 h-6 bg-background-50 rounded-full overflow-hidden relative">
                      <div
                        className={`absolute inset-y-0 left-0 rounded-full ${bar.couleur} flex items-center justify-end pr-2 transition-all duration-700 ease-out`}
                        style={{ width: `${Math.max((bar.progression / 100) * (bar.fin === 'J270' ? 100 : (parseInt(bar.fin.slice(1)) / 270) * 100), 4)}%` }}
                      >
                        {bar.progression > 0 && <span className="text-[10px] font-bold text-background-50">{bar.progression}%</span>}
                      </div>
                    </div>
                    <span className="text-[10px] text-foreground-600 w-24 flex-shrink-0 text-right">{bar.debut} → {bar.fin}</span>
                  </div>
                ))}
                <div className="relative h-4 mt-2">
                  <div className="absolute left-[5.5%] text-[10px] text-foreground-600">J0</div>
                  <div className="absolute left-[30%] text-[10px] text-foreground-600">J75</div>
                  <div className="absolute left-[55%] text-[10px] text-foreground-600">J120</div>
                  <div className="absolute left-[100%] text-[10px] text-foreground-600 -translate-x-full">J270</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REX Panel */}
        {showRex && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 mt-4">
            <div className="bg-white rounded-xl border border-background-200/70 p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-900">
                  <i className="ri-folder-history-line"></i>
                </div>
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">{data.rex.titre}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                  <div className="text-xs text-foreground-600 uppercase tracking-wide mb-1">Contexte</div>
                  <p className="text-sm text-foreground-950">{data.rex.contexte}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <div className="text-xs text-red-600 uppercase tracking-wide mb-1">Erreurs détectées</div>
                  <p className="text-sm text-red-800">{data.rex.erreurs}</p>
                </div>
                <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                  <div className="text-xs text-primary-600 uppercase tracking-wide mb-1">Actions KHEPRA</div>
                  <p className="text-sm text-primary-800">{data.rex.actionsKhepra}</p>
                </div>
                <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                  <div className="text-xs text-accent-600 uppercase tracking-wide mb-1">Impact</div>
                  <p className="text-sm text-accent-800">{data.rex.impact}</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-background-200/70 flex items-center justify-between">
                <span className="text-xs text-foreground-600">Template REX complet avec 7 sections standard Big Four</span>
                <a href="/kos-rex-template" className="flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-600 transition-colors bg-primary-50 hover:bg-primary-100 rounded-lg px-3 py-2 cursor-pointer whitespace-nowrap">
                  <i className="ri-arrow-right-line"></i> Voir le REX complet
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Prompts IA Panel */}
        {showPrompts && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 mt-4">
            <div className="space-y-3">
              {data.promptsIA.map((prompt) => (
                <div key={prompt.id} className="bg-white rounded-xl border border-background-200/70 overflow-hidden">
                  <button onClick={() => togglePrompt(prompt.id)} className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-background-50/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                        <i className="ri-robot-line text-base"></i>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground-950">{prompt.titre}</div>
                        <div className="text-xs text-foreground-600">{prompt.role} — {prompt.description}</div>
                      </div>
                    </div>
                    <i className={`text-foreground-600 text-lg ${expandedPrompt === prompt.id ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}></i>
                  </button>
                  {expandedPrompt === prompt.id && (
                    <div className="border-t border-background-200/70 p-4 md:p-5">
                      <pre className="text-xs text-foreground-700 bg-background-50 rounded-lg p-4 border border-background-200/70 whitespace-pre-wrap font-mono leading-relaxed">{prompt.prompt}</pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contenu Module Actif */}
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* En-tête module */}
          <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6 mb-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-${moduleActif.couleur}-500 text-background-50 flex-shrink-0`}>
                  <i className={`${moduleActif.icone} text-xl`}></i>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg md:text-xl font-bold text-foreground-950">Module {moduleActif.numero} : {moduleActif.nom}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${statutBadge[moduleActif.statut]?.classe || statutBadge.pending.classe}`}>
                      {statutBadge[moduleActif.statut]?.label || 'À venir'}
                    </span>
                  </div>
                  <p className="text-sm text-foreground-600">{moduleActif.phaseKhepra}</p>
                  <p className="text-xs text-foreground-600 mt-1">{moduleActif.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ProgressCircle value={moduleActif.progression} size={60} strokeWidth={5} colorClass="text-primary-500" />
                <div className="text-xs text-foreground-600">
                  <div className="font-semibold text-foreground-950">Livrable</div>
                  <div className="mt-0.5 max-w-[200px]">{moduleActif.livrable}</div>
                </div>
              </div>
            </div>
            <ProgressBar value={moduleActif.progression} colorClass="bg-primary-500" />
          </div>

          {/* MODULE 1 : Maturity Scan */}
          {activeModule === 'maturity-scan' && (
            <div className="space-y-6">
              {/* Lien Module 1 Go-Live */}
              <div className="bg-accent-500 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-background-50/20 text-background-50">
                    <i className="ri-check-double-line"></i>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-background-50">Module 1 Go-Live — J+90 ✓</div>
                    <div className="text-xs text-background-50/80">ISO 27001 certifié · IA entraînée sur 50 cas rejetés · Précision 94.2%</div>
                  </div>
                </div>
                <a href="/kos-agrement-os-module-1" className="flex items-center gap-1.5 text-xs font-semibold bg-background-50 text-accent-600 hover:bg-background-50/90 rounded-lg px-4 py-2.5 transition-all cursor-pointer whitespace-nowrap">
                  <i className="ri-radar-line"></i> Module 1 complet
                </a>
              </div>
              {/* Scores */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Scoring Maturité — 62/100</h3>
                <div className="space-y-3">
                  {moduleActif.scores && moduleActif.scores.map((score) => (
                    <div key={score.axe} className="flex items-center gap-3">
                      <span className="text-xs font-medium text-foreground-950 w-36 flex-shrink-0">{score.axe}</span>
                      <div className="flex-1 h-3 bg-background-100 rounded-full overflow-hidden">
                        <div className={`h-full ${score.couleur} rounded-full transition-all duration-700 ease-out`} style={{ width: `${(score.score / score.max) * 100}%` }}></div>
                      </div>
                      <span className="text-xs font-semibold text-foreground-950 w-10 text-right">{score.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fonctionnalités */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Checklist Diagnostic</h3>
                <div className="space-y-2">
                  {moduleActif.fonctionnalites.map((fn) => (
                    <div key={fn.nom} className="flex items-start gap-3 bg-background-50 rounded-lg p-3 border border-background-200/70">
                      <div className={`w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 ${fn.done ? 'bg-accent-100 text-accent-900' : 'bg-background-100 text-foreground-600'}`}>
                        <i className={`text-xs ${fn.done ? 'ri-check-line' : 'ri-time-line'}`}></i>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground-950">{fn.nom}</div>
                        <div className="text-xs text-foreground-600 mt-0.5">{fn.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Documents Uploadés — 10 docs DD™</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-background-200/70">
                        <th className="text-left py-2 px-3 text-foreground-600 font-medium text-xs">Document</th>
                        <th className="text-left py-2 px-3 text-foreground-600 font-medium text-xs">Statut</th>
                        <th className="text-left py-2 px-3 text-foreground-600 font-medium text-xs">Date</th>
                        <th className="text-left py-2 px-3 text-foreground-600 font-medium text-xs">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moduleActif.docsUploades && moduleActif.docsUploades.map((doc) => (
                        <tr key={doc.nom} className="border-b border-background-100 hover:bg-background-50/50">
                          <td className="py-2 px-3 text-foreground-950 text-xs">{doc.nom}</td>
                          <td className="py-2 px-3">
                            {doc.statut === 'ok' ? <span className="text-xs bg-accent-100 text-accent-900 px-2 py-0.5 rounded-full">OK</span>
                              : doc.statut === 'warning' ? <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Attention</span>
                              : doc.statut === 'error' ? <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">Erreur</span>
                              : <span className="text-xs bg-background-100 text-foreground-600 px-2 py-0.5 rounded-full">En attente</span>}
                          </td>
                          <td className="py-2 px-3 text-xs text-foreground-600">{doc.date || '-'}</td>
                          <td className="py-2 px-3 text-xs text-foreground-600">{doc.note || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 2 : File Builder */}
          {activeModule === 'file-builder' && (
            <div className="space-y-6">
              {/* Erreurs AUSCGIE */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Check Erreurs AUSCGIE — 8 erreurs bloquantes COBAC</h3>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-semibold">{erreursBloquantes} bloquants ouverts</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-background-200/70">
                        <th className="text-left py-2 px-3 text-foreground-600 font-medium text-xs">Code</th>
                        <th className="text-left py-2 px-3 text-foreground-600 font-medium text-xs">Description</th>
                        <th className="text-left py-2 px-3 text-foreground-600 font-medium text-xs">Article</th>
                        <th className="text-left py-2 px-3 text-foreground-600 font-medium text-xs">Criticité</th>
                        <th className="text-left py-2 px-3 text-foreground-600 font-medium text-xs">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moduleActif.erreursAuscgie && moduleActif.erreursAuscgie.map((err) => (
                        <tr key={err.code} className="border-b border-background-100 hover:bg-background-50/50">
                          <td className="py-2 px-3 font-mono text-xs text-foreground-950">{err.code}</td>
                          <td className="py-2 px-3 text-xs text-foreground-700">{err.description}</td>
                          <td className="py-2 px-3 text-xs text-foreground-600">{err.article}</td>
                          <td className="py-2 px-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${criticiteBadge[err.criticite] || criticiteBadge.Mineur}`}>{err.criticite}</span>
                          </td>
                          <td className="py-2 px-3">
                            <span className={`text-xs font-medium ${err.statut === 'corrige' ? 'text-accent-600' : 'text-red-600'}`}>
                              {err.statut === 'corrige' ? '✓ Corrigé' : '○ Ouvert'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fonctionnalités Builder */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Livrables en cours</h3>
                <div className="space-y-2">
                  {moduleActif.fonctionnalites.map((fn) => (
                    <div key={fn.nom} className="flex items-start gap-3 bg-background-50 rounded-lg p-3 border border-background-200/70">
                      <div className={`w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 ${fn.done ? 'bg-accent-100 text-accent-900' : 'bg-background-100 text-foreground-600'}`}>
                        <i className={`text-xs ${fn.done ? 'ri-check-line' : 'ri-loader-4-line'}`}></i>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground-950">{fn.nom}</div>
                        <div className="text-xs text-foreground-600 mt-0.5">{fn.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Plan */}
              {moduleActif.bpFinance && (
                <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Business Plan 5 ans — {moduleActif.bpFinance.capitalInitial.toLocaleString()} {moduleActif.bpFinance.devise}</h3>
                    <span className="text-xs bg-background-100 text-foreground-600 px-2 py-1 rounded-full">WACC {moduleActif.bpFinance.wacc.total}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-background-50 rounded-lg p-3 border border-background-200/70 text-center">
                      <div className="text-xs text-foreground-600">Taux sans risque</div>
                      <div className="text-sm font-bold text-foreground-950">{moduleActif.bpFinance.wacc.tauxSansRisque}</div>
                    </div>
                    <div className="bg-background-50 rounded-lg p-3 border border-background-200/70 text-center">
                      <div className="text-xs text-foreground-600">Prime Pays</div>
                      <div className="text-sm font-bold text-foreground-950">{moduleActif.bpFinance.wacc.primePays}</div>
                    </div>
                    <div className="bg-background-50 rounded-lg p-3 border border-background-200/70 text-center">
                      <div className="text-xs text-foreground-600">Prime Secteur</div>
                      <div className="text-sm font-bold text-foreground-950">{moduleActif.bpFinance.wacc.primeSecteur}</div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-background-200/70">
                          <th className="text-left py-2 px-2 text-foreground-600 font-medium"></th>
                          {moduleActif.bpFinance.projections.map((p) => (
                            <th key={p.annee} className="text-right py-2 px-2 text-foreground-600 font-medium">{p.annee}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-background-100">
                          <td className="py-1.5 px-2 text-foreground-600">PNB</td>
                          {moduleActif.bpFinance.projections.map((p) => (
                            <td key={p.annee} className="text-right py-1.5 px-2 text-foreground-950 font-mono">{p.pnb.toLocaleString()}</td>
                          ))}
                        </tr>
                        <tr className="border-b border-background-100">
                          <td className="py-1.5 px-2 text-foreground-600">Charges</td>
                          {moduleActif.bpFinance.projections.map((p) => (
                            <td key={p.annee} className="text-right py-1.5 px-2 text-foreground-950 font-mono">{p.charges.toLocaleString()}</td>
                          ))}
                        </tr>
                        <tr className="border-b border-background-100">
                          <td className="py-1.5 px-2 text-foreground-600">Résultat</td>
                          {moduleActif.bpFinance.projections.map((p) => (
                            <td key={p.annee} className={`text-right py-1.5 px-2 font-mono font-semibold ${p.resultat < 0 ? 'text-red-600' : 'text-accent-600'}`}>{p.resultat.toLocaleString()}</td>
                          ))}
                        </tr>
                        <tr className="border-b border-background-100">
                          <td className="py-1.5 px-2 text-foreground-600">BFR</td>
                          {moduleActif.bpFinance.projections.map((p) => (
                            <td key={p.annee} className="text-right py-1.5 px-2 text-foreground-950 font-mono">{p.bfr.toLocaleString()}</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {moduleActif.bpFinance.stressTest && (
                    <div className="mt-3 bg-amber-50 rounded-lg p-3 border border-amber-200">
                      <span className="text-xs font-semibold text-amber-800">Stress Test : {moduleActif.bpFinance.stressTest.scenario}</span>
                      <span className="text-xs text-amber-700 ml-3">Impact PNB {moduleActif.bpFinance.stressTest.impactPnb}</span>
                      <span className="text-xs text-amber-700 ml-3">Impact Résultat {moduleActif.bpFinance.stressTest.impactResultat}</span>
                      <span className="text-xs text-amber-700 ml-3">Viabilité : {moduleActif.bpFinance.stressTest.viabilite}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* MODULE 3 : Regulator Hub */}
          {activeModule === 'regulator-hub' && (
            <div className="space-y-6">
              {/* Data Room Info */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-900">
                    <i className="ri-database-2-line text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Data Room COBAC — ISO 27001</h3>
                    <p className="text-xs text-foreground-600">Chiffrement AES-256 · Double authentification · Piste d'audit ISAE 3402</p>
                  </div>
                </div>
                <div className="bg-background-50 rounded-lg p-4 border border-background-200/70 text-center">
                  <i className="ri-lock-line text-3xl text-foreground-600"></i>
                  <p className="text-sm text-foreground-600 mt-2">Data room accessible après soumission du dossier (J+75)</p>
                </div>
              </div>

              {/* Simulateur */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Simulateur Entretiens COBAC — 20 questions</h3>
                <div className="space-y-2">
                  {moduleActif.questionsSimulateur && moduleActif.questionsSimulateur.map((q) => (
                    <div key={q.id} className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-primary-500 bg-primary-100 px-1.5 py-0.5 rounded">{q.id}</span>
                        <div className="text-sm font-medium text-foreground-950">{q.question}</div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                        <div className="bg-red-50 rounded p-2 border border-red-200">
                          <div className="text-[10px] text-red-600 uppercase tracking-wide">Piège</div>
                          <div className="text-xs text-red-800">{q.piege}</div>
                        </div>
                        <div className="bg-accent-50 rounded p-2 border border-accent-200">
                          <div className="text-[10px] text-accent-600 uppercase tracking-wide">Réponse attendue</div>
                          <div className="text-xs text-accent-800">{q.reponseAttendue}</div>
                        </div>
                        <div className="bg-background-100 rounded p-2 border border-background-200/70">
                          <div className="text-[10px] text-foreground-600 uppercase tracking-wide">Doc preuve</div>
                          <div className="text-xs text-foreground-700">{q.docPreuve}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fonctionnalités */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Fonctionnalités</h3>
                <div className="space-y-2">
                  {moduleActif.fonctionnalites.map((fn) => (
                    <div key={fn.nom} className="flex items-start gap-3 bg-background-50 rounded-lg p-3 border border-background-200/70">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 bg-background-100 text-foreground-600">
                        <i className="ri-time-line text-xs"></i>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground-950">{fn.nom}</div>
                        <div className="text-xs text-foreground-600 mt-0.5">{fn.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODULE 4 : Opening OS */}
          {activeModule === 'opening-os' && (
            <div className="space-y-6">
              {/* Checklist Ouverture */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Checklist Ouverture — 30 Points COBAC</h3>
                <div className="space-y-2">
                  {moduleActif.checklistOuverture && moduleActif.checklistOuverture.map((item) => (
                    <div key={item.point} className="flex items-center gap-3 bg-background-50 rounded-lg p-3 border border-background-200/70">
                      <span className="text-xs font-mono font-bold text-foreground-600 w-6">{item.point}</span>
                      <span className="text-sm text-foreground-950 flex-1">{item.item}</span>
                      {item.obligatoire && <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full">Obligatoire</span>}
                      <span className="text-xs bg-background-100 text-foreground-600 px-2 py-0.5 rounded-full">À faire</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fonctionnalités */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Fonctionnalités</h3>
                <div className="space-y-2">
                  {moduleActif.fonctionnalites.map((fn) => (
                    <div key={fn.nom} className="flex items-start gap-3 bg-background-50 rounded-lg p-3 border border-background-200/70">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 bg-background-100 text-foreground-600">
                        <i className="ri-time-line text-xs"></i>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground-950">{fn.nom}</div>
                        <div className="text-xs text-foreground-600 mt-0.5">{fn.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODULE 5 : KHEPRA Architect */}
          {activeModule === 'khepra-architect' && (
            <div className="space-y-6">
              {/* Bannière présentation */}
              <div className="bg-primary-500 rounded-xl p-5 md:p-6 text-background-50">
                <div className="flex items-start gap-4 flex-wrap">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-background-50/20 text-background-50 flex-shrink-0">
                    <i className="ri-brain-line text-2xl"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold uppercase tracking-wide">IA Stratège — Knowledge Upgrade System</h3>
                    <p className="text-sm text-background-50/90 mt-1">Transforme les connaissances brutes de Khepra Experts en actifs intellectuels structurés, actionnables et monétisables. 4 modes d'action au standard Big Four.</p>
                  </div>
                  <a href="/kos-khepra-architect" className="flex items-center gap-1.5 text-xs font-semibold bg-background-50 text-primary-600 hover:bg-background-50/90 rounded-lg px-4 py-2.5 transition-all cursor-pointer whitespace-nowrap self-center">
                    <i className="ri-rocket-line"></i> Lancer KHEPRA Architect
                  </a>
                </div>
              </div>

              {/* Les 4 Modes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-background-200/70 p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                      <i className="ri-search-eye-line text-sm"></i>
                    </div>
                    <span className="text-sm font-bold text-foreground-950">MODE AUDIT</span>
                  </div>
                  <p className="text-xs text-foreground-600 mb-2">Analyse contenu brut — Lacunes, Redondances, Opportunités, Niveau de preuve</p>
                  <div className="bg-background-50 rounded-lg p-2 border border-background-200/70">
                    <code className="text-xs font-mono text-foreground-700">Sortie : Tableau | Section | Statut | Action | Priorité H/M/L</code>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-background-200/70 p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                      <i className="ri-arrow-up-circle-line text-sm"></i>
                    </div>
                    <span className="text-sm font-bold text-foreground-950">MODE UPGRADE</span>
                  </div>
                  <p className="text-xs text-foreground-600 mb-2">Transformation en Fiche Expert Khepra — 7 composants standardisés</p>
                  <div className="bg-background-50 rounded-lg p-2 border border-background-200/70">
                    <code className="text-xs font-mono text-foreground-700">Sortie : Fiche Expert — Titre + Contexte + Mécanisme + Cas + Outil</code>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-background-200/70 p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700">
                      <i className="ri-stack-line text-sm"></i>
                    </div>
                    <span className="text-sm font-bold text-foreground-950">MODE ARCHITECTURE</span>
                  </div>
                  <p className="text-xs text-foreground-600 mb-2">Arborescence complète — Piliers → Modules 90min → Assets (Vidéo + PDF + Quiz)</p>
                  <div className="bg-background-50 rounded-lg p-2 border border-background-200/70">
                    <code className="text-xs font-mono text-foreground-700">Sortie : Markdown — TDM cliquable — 3 niveaux avec liens croisés</code>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-background-200/70 p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                      <i className="ri-download-cloud-line text-sm"></i>
                    </div>
                    <span className="text-sm font-bold text-foreground-950">MODE RESSOURCE</span>
                  </div>
                  <p className="text-xs text-foreground-600 mb-2">Livrables client-ready — SOP, Playbook, Dashboard, Script, Email Séquence</p>
                  <div className="bg-background-50 rounded-lg p-2 border border-background-200/70">
                    <code className="text-xs font-mono text-foreground-700">Sortie : Livrable signé Méthode Khepra® + Copyright</code>
                  </div>
                </div>
              </div>

              {/* Use Cases rapides */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Cas d'Usage</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                    <div className="text-xs font-semibold text-foreground-950 mb-1">
                      <i className="ri-database-2-line text-primary-500 mr-1"></i> Knowledge Base
                    </div>
                    <p className="text-xs text-foreground-600">Colle ton article ou process, reçois un tableau d'actions H/M/L</p>
                  </div>
                  <div className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                    <div className="text-xs font-semibold text-foreground-950 mb-1">
                      <i className="ri-attachment-2 text-accent-500 mr-1"></i> Lead Magnet
                    </div>
                    <p className="text-xs text-foreground-600">Crée une checklist ou un template en 2 minutes</p>
                  </div>
                  <div className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                    <div className="text-xs font-semibold text-foreground-950 mb-1">
                      <i className="ri-graduation-cap-line text-secondary-500 mr-1"></i> Formation
                    </div>
                    <p className="text-xs text-foreground-600">Structure ton offre en piliers, modules et assets</p>
                  </div>
                  <div className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                    <div className="text-xs font-semibold text-foreground-950 mb-1">
                      <i className="ri-arrow-up-circle-line text-primary-500 mr-1"></i> Upgrade
                    </div>
                    <p className="text-xs text-foreground-600">Transforme un ancien contenu en Fiche Expert Big Four</p>
                  </div>
                </div>
              </div>

              {/* Règles d'écriture */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Règles d'écriture KHEPRA</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  <div className="text-xs text-foreground-700 bg-amber-50 rounded-lg p-2 border border-amber-200">Aucun em dash — remplacer par virgule, deux-points</div>
                  <div className="text-xs text-foreground-700 bg-amber-50 rounded-lg p-2 border border-amber-200">Phrases 20 mots max — varie le rythme</div>
                  <div className="text-xs text-foreground-700 bg-amber-50 rounded-lg p-2 border border-amber-200">Idée clé d'abord — pas de "Voici"</div>
                  <div className="text-xs text-foreground-700 bg-amber-50 rounded-lg p-2 border border-amber-200">Mécanisme avant opinion — explique le pourquoi</div>
                  <div className="text-xs text-foreground-700 bg-amber-50 rounded-lg p-2 border border-amber-200">Exemples chiffrés UEMOA/CEMAC réalistes</div>
                  <div className="text-xs text-foreground-700 bg-amber-50 rounded-lg p-2 border border-amber-200">Terminer par 1 action concrète dans les 48h</div>
                </div>
              </div>

              {/* Fonctionnalités */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Fonctionnalités</h3>
                <div className="space-y-2">
                  {moduleActif.fonctionnalites.map((fn) => (
                    <div key={fn.nom} className="flex items-start gap-3 bg-background-50 rounded-lg p-3 border border-background-200/70">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 bg-accent-100 text-accent-900">
                        <i className="ri-check-line text-xs"></i>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground-950">{fn.nom}</div>
                        <div className="text-xs text-foreground-600 mt-0.5">{fn.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Checklist Big Four */}
          <div className="mt-8 bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Checklist Conformité Big Four</h3>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${bigFourScore === 100 ? 'bg-accent-100 text-accent-900' : 'bg-amber-100 text-amber-800'}`}>
                {bigFourScore}% — {data.checklistBigFour.filter(c => c.statut).length}/{data.checklistBigFour.length} critères
              </span>
            </div>
            <div className="space-y-2">
              {data.checklistBigFour.map((item) => (
                <div key={item.critere} className="flex items-start gap-3 bg-background-50 rounded-lg p-3 border border-background-200/70">
                  <div className={`w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 ${item.statut ? 'bg-accent-100 text-accent-900' : 'bg-red-100 text-red-800'}`}>
                    <i className={`text-xs ${item.statut ? 'ri-check-line' : 'ri-close-line'}`}></i>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground-950">{item.critere}</div>
                    <div className="text-xs text-foreground-600 mt-0.5">{item.preuve}</div>
                  </div>
                  {!item.statut && <span className="text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded-full whitespace-nowrap ml-auto">À valider</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 bg-amber-50 rounded-xl border border-amber-200 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <i className="ri-error-warning-line text-amber-600 text-lg mt-0.5"></i>
              <div>
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">Disclaimer niveau Big Four</div>
                <p className="text-sm text-amber-800 mt-1 leading-relaxed">{data.disclaimer}</p>
              </div>
            </div>
          </div>

          {/* Next Steps — J+90 Exécutés */}
          <div className="mt-8 bg-accent-500 rounded-xl p-5 md:p-6 text-background-50">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wide">KOS Exécuté — J+7 / J+30 / J+90 ✓</h3>
              <span className="text-xs bg-background-50/20 text-background-50 px-3 py-1 rounded-full font-semibold">100% Complété</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.nextSteps.map((step, i) => (
                <div key={i} className="bg-background-50/10 rounded-lg p-4 border border-background-50/20">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-lg font-bold text-background-50">{step.echeance}</div>
                    <i className="ri-check-double-line text-background-50 text-lg"></i>
                  </div>
                  <div className="text-sm font-semibold text-background-50 mt-2">{step.action}</div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs bg-background-50/20 text-background-50 px-2 py-1 rounded-full">{step.responsable}</span>
                  </div>
                  <div className="text-xs text-background-50/80 mt-2">
                    <i className="ri-file-text-line mr-1"></i>{step.livrable}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-background-50/20 flex flex-wrap items-center gap-4">
              <a href="/kos-agrement-os-module-1" className="flex items-center gap-1.5 text-xs font-semibold bg-background-50 text-accent-600 hover:bg-background-50/90 rounded-lg px-4 py-2.5 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-radar-line"></i> Module 1 — Maturity Scan Go-Live
              </a>
              <a href="/kos-rex-template" className="flex items-center gap-1.5 text-xs font-semibold bg-background-50/10 text-background-50 hover:bg-background-50/20 rounded-lg px-4 py-2.5 border border-background-50/30 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-folder-history-line"></i> REX #CM-024 Publié
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}



