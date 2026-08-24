import { useKOSAgrementOSModule1 } from '@/hooks/useKOSAgrementOSModule1';
import { SeoHead } from '@/components/feature/SeoHead';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const criticiteBadge: Record<string, string> = {
  Bloquant: 'bg-red-100 text-red-800 border-red-200',
  Majeur: 'bg-amber-100 text-amber-800 border-amber-200',
  Mineur: 'bg-background-100 text-foreground-600 border-background-200',
};

const docStatutBadge: Record<string, { label: string; classe: string; icone: string }> = {
  ok: { label: 'OK', classe: 'bg-accent-100 text-accent-900', icone: 'ri-check-line' },
  warning: { label: 'Attention', classe: 'bg-amber-100 text-amber-800', icone: 'ri-error-warning-line' },
  error: { label: 'Erreur', classe: 'bg-red-100 text-red-800', icone: 'ri-close-line' },
  pending: { label: 'En attente', classe: 'bg-background-100 text-foreground-600', icone: 'ri-time-line' },
};

function ProgressCircle({ value, size = 70, strokeWidth = 6, colorClass = 'text-primary-500', children }: { value: number; size?: number; strokeWidth?: number; colorClass?: string; children?: React.ReactNode }) {
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
        {children || <span className="font-bold text-foreground-950">{value}%</span>}
      </div>
    </div>
  );
}

function JalonTimeline({ jalons }: { jalons: { jalon: string; action: string; statut: string; date: string }[] }) {
  return (
    <div className="relative">
      <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-background-200/70"></div>
      <div className="space-y-4">
        {jalons.map((j, i) => (
          <div key={i} className="flex items-start gap-3 relative">
            <div className={`w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 z-10 ${j.statut === 'complete' ? 'bg-accent-500 text-background-50' : 'bg-background-100 text-foreground-600'}`}>
              <i className={`text-xs ${j.statut === 'complete' ? 'ri-check-line' : 'ri-time-line'}`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-bold whitespace-nowrap ${j.statut === 'complete' ? 'text-accent-600' : 'text-foreground-600'}`}>{j.jalon}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap ${j.statut === 'complete' ? 'bg-accent-100 text-accent-900' : 'bg-background-100 text-foreground-600'}`}>{j.date}</span>
              </div>
              <p className="text-sm text-foreground-700 mt-0.5">{j.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function agrementOSModule1Page() {
  const {
    data,
    activeSection,
    setActiveSection,
    sectionLabels,
    expandedPrompt,
    togglePrompt,
    filtreCriticite,
    selectFilter,
    erreursBloquantes,
    gapsFiltres,
    scoreGlobal,
  } = useKOSAgrementOSModule1();

  const sectionKeys = Object.keys(sectionLabels);

  return (
    <>
      <SeoHead
        title="KHEPRA Agrément OS — Module 1 Maturity Scan | Diagnostic J0-J15 BCEAO/COBAC"
        description="Module 1 Maturity Scan Go-Live : Questionnaire 50 pts, IA scan documents, scoring maturité, gap list priorisée. 50 cas rejetés entraînés, précision 94.2%. ISO 27001 certifié."
        keywords="KHEPRA, Agrément OS, Maturity Scan, diagnostic, BCEAO, COBAC, AUSCGIE, microfinance, UEMOA, CEMAC, ISO 27001"
      />

      <div className="min-h-screen bg-background-50">
        {/* Header */}
        <section className="relative bg-white border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 md:py-7">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-500 text-background-50">
                    <i className="ri-radar-line text-lg"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">Module 1 — Maturity Scan</span>
                      <span className="text-[10px] bg-accent-100 text-accent-900 px-2 py-0.5 rounded-full font-semibold">{data.statut}</span>
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold text-foreground-950 leading-tight">{data.produit}</h1>
                  </div>
                </div>
                <p className="text-sm text-foreground-600 mt-1 max-w-3xl">{data.baseline}</p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <a href="/kos-agrement-os" className="flex items-center gap-1.5 text-xs font-medium text-foreground-600 hover:text-primary-500 bg-background-50 hover:bg-background-100 border border-background-200/70 rounded-lg px-3 py-2 transition-all cursor-pointer whitespace-nowrap">
                  <i className="ri-arrow-left-line"></i> Cockpit Agrément OS
                </a>
                <div className="flex items-center gap-2 bg-background-50 rounded-xl px-3 py-2 border border-background-200/70">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary-500">{data.projetActif.avancement}%</div>
                    <div className="text-[10px] text-foreground-600">Avancement</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicateurs clés */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-foreground-600">
              <span className="flex items-center gap-1"><i className="ri-user-line"></i> {data.projetActif.client}</span>
              <span className="flex items-center gap-1"><i className="ri-price-tag-3-line"></i> {data.projetActif.categorie}</span>
              <span className="flex items-center gap-1"><i className="ri-map-pin-line"></i> {data.projetActif.pays}</span>
              <span className="flex items-center gap-1"><i className="ri-bank-line"></i> {data.projetActif.regulateur}</span>
              <span className="flex items-center gap-1"><i className="ri-calendar-line"></i> J+{data.projetActif.jourActuel} — Prochain jalon : {data.projetActif.prochainJalon}</span>
            </div>

            <BigFourSubtitleBar text="KHEPRA Agrément OS Module 1 — IA Erreurs AUSCGIE · 50 cas rejetés · Précision 94.2% · ISO 27001 Certifié — Standard Big Four" />
          </div>
        </section>

        {/* Jalons Timeline */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 mt-5">
          <div className="bg-white rounded-xl border border-background-200/70 p-4 md:p-5">
            <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Exécution KOS — J+7 / J+30 / J+90</h3>
            <JalonTimeline jalons={data.jalons} />
            <div className="mt-4 pt-4 border-t border-background-200/70 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-accent-50 rounded-lg p-3 border border-accent-200">
                <div className="text-xs text-accent-600 uppercase tracking-wide font-semibold mb-1">J+7 — Wireframe Validé</div>
                <div className="text-sm text-foreground-950">2 clients pilotes : {data.validationWireframe.pilotes.map(p => p.nom).join(', ')}</div>
                <div className="text-xs text-foreground-600 mt-1">Score satisfaction moyen : {(data.validationWireframe.pilotes.reduce((a, p) => a + p.scoreSatisfaction, 0) / 2).toFixed(1)}/5</div>
              </div>
              <div className="bg-primary-50 rounded-lg p-3 border border-primary-200">
                <div className="text-xs text-primary-600 uppercase tracking-wide font-semibold mb-1">J+30 — Vector DB Live</div>
                <div className="text-sm text-foreground-950">5 sources · {data.vectorDB.sources.reduce((a, s) => a + s.articles, 0)} articles indexés</div>
                <div className="text-xs text-foreground-600 mt-1">IA : Précision {data.vectorDB.casRejetesIA.precision} · F1 {data.vectorDB.casRejetesIA.f1Score}</div>
              </div>
              <div className="bg-accent-50 rounded-lg p-3 border border-accent-200">
                <div className="text-xs text-accent-600 uppercase tracking-wide font-semibold mb-1">J+90 — Go-Live + ISO 27001</div>
                <div className="text-sm text-foreground-950">Certifié Bureau Veritas · Conformité {data.certificationISO.conformite}</div>
                <div className="text-xs text-foreground-600 mt-1">REX #CM-024 publié — <a href="/kos-rex-template" className="text-primary-500 hover:underline">Consulter</a></div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation sections */}
        <nav className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-sm border-b border-background-200/70 mt-5">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex overflow-x-auto gap-1 py-2">
              {sectionKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                    activeSection === key
                      ? 'bg-primary-500 text-background-50'
                      : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-950'
                  }`}
                >
                  {sectionLabels[key]}
                  {key === 'erreurs' && erreursBloquantes > 0 && (
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  )}
                </button>
              ))}
              <button onClick={togglePrompt} className={`ml-auto flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${expandedPrompt ? 'bg-primary-100 text-primary-700' : 'text-foreground-600 hover:bg-background-100'}`}>
                <i className="ri-robot-line text-sm"></i> Prompt IA
              </button>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* Prompt IA dépliable */}
          {expandedPrompt && (
            <div className="mb-6 bg-white rounded-xl border border-background-200/70 overflow-hidden">
              <div className="p-4 md:p-5 bg-primary-50 border-b border-background-200/70">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                    <i className="ri-robot-line text-base"></i>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground-950">{data.promptDiagnostic.titre}</div>
                    <div className="text-xs text-foreground-600">{data.promptDiagnostic.role} — {data.promptDiagnostic.description}</div>
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-5">
                <pre className="text-xs text-foreground-700 bg-background-50 rounded-lg p-4 border border-background-200/70 whitespace-pre-wrap font-mono leading-relaxed">{data.promptDiagnostic.prompt}</pre>
              </div>
            </div>
          )}

          {/* SECTION : Questionnaire */}
          {activeSection === 'questionnaire' && (
            <div className="space-y-6">
              {/* Score Global */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex items-center gap-4">
                    <ProgressCircle value={scoreGlobal} size={90} strokeWidth={7} colorClass="text-primary-500">
                      <div className="text-center">
                        <span className="text-lg font-bold text-foreground-950">{scoreGlobal}</span>
                        <span className="text-[10px] text-foreground-600 block">/100</span>
                      </div>
                    </ProgressCircle>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Score de Maturité Global</h3>
                      <p className="text-xs text-foreground-600 mt-1">Questionnaire {data.questionnaire.repondu}/{data.questionnaire.totalPoints} points répondus — {data.questionnaire.progression}%</p>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-5 gap-2">
                    {data.questionnaire.sections.map((s) => (
                      <div key={s.id} className="text-center bg-background-50 rounded-lg p-3 border border-background-200/70">
                        <div className="text-xs text-foreground-600 mb-1">{s.nom}</div>
                        <div className="text-lg font-bold text-foreground-950">{s.score}</div>
                        <div className="text-[10px] text-foreground-600">{s.repondues}/{s.questions} q.</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Détail par section */}
              {data.questionnaire.sections.map((s) => (
                <div key={s.id} className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-foreground-950">{s.nom}</h4>
                    <span className="text-xs bg-background-100 text-foreground-600 px-2 py-1 rounded-full">{s.repondues}/{s.questions} questions</span>
                  </div>
                  <div className="w-full h-2.5 bg-background-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        s.score >= 70 ? 'bg-accent-500' : s.score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${s.score}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-foreground-600">Score {s.score}/100 · {s.score >= 70 ? 'Conforme' : s.score >= 50 ? 'Partiellement conforme' : 'Non conforme'}</div>
                </div>
              ))}

              {/* Clients Pilotes — J+7 */}
              <div className="bg-accent-50 rounded-xl border border-accent-200 p-5 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-900">
                    <i className="ri-user-voice-line"></i>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">J+7 — Wireframe Validé par 2 Clients Pilotes</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.validationWireframe.pilotes.map((p) => (
                    <div key={p.nom} className="bg-white rounded-lg p-4 border border-accent-200">
                      <div className="text-sm font-semibold text-foreground-950">{p.nom}</div>
                      <div className="text-xs text-foreground-600 mt-0.5">{p.pays} · {p.categorie}</div>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`text-xs ${i < Math.floor(p.scoreSatisfaction) ? 'ri-star-fill text-amber-400' : 'ri-star-line text-foreground-600'}`}></i>
                        ))}
                        <span className="text-xs text-foreground-600 ml-1">{p.scoreSatisfaction}/5</span>
                      </div>
                      <p className="text-xs text-foreground-600 mt-2 italic">"{p.feedback}"</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 space-y-1">
                  {data.validationWireframe.actionsCorrectives.map((a, i) => (
                    <div key={i} className="text-xs text-accent-800 flex items-center gap-1.5">
                      <i className="ri-check-line text-accent-600"></i> {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION : Documents */}
          {activeSection === 'documents' && (
            <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Documents Uploadés — Analyse IA</h3>
                <span className="text-xs bg-background-100 text-foreground-600 px-2 py-1 rounded-full">{data.documents.length} documents</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-background-200/70">
                      <th className="text-left py-2 px-3 text-foreground-600 font-medium text-xs">Document</th>
                      <th className="text-left py-2 px-3 text-foreground-600 font-medium text-xs">Score IA</th>
                      <th className="text-left py-2 px-3 text-foreground-600 font-medium text-xs">Statut</th>
                      <th className="text-left py-2 px-3 text-foreground-600 font-medium text-xs">Date</th>
                      <th className="text-left py-2 px-3 text-foreground-600 font-medium text-xs">Alertes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.documents.map((doc) => (
                      <tr key={doc.id} className="border-b border-background-100 hover:bg-background-50/50">
                        <td className="py-2 px-3 text-foreground-950 text-xs font-medium">{doc.nom}</td>
                        <td className="py-2 px-3">
                          {doc.scoreIA !== null ? (
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-1.5 bg-background-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${doc.scoreIA >= 80 ? 'bg-accent-500' : doc.scoreIA >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${doc.scoreIA}%` }}></div>
                              </div>
                              <span className="text-xs font-semibold text-foreground-950">{doc.scoreIA}</span>
                            </div>
                          ) : (
                            <span className="text-xs text-foreground-600">-</span>
                          )}
                        </td>
                        <td className="py-2 px-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1 w-fit ${docStatutBadge[doc.statut]?.classe || ''}`}>
                            <i className={`${docStatutBadge[doc.statut]?.icone || ''} text-[10px]`}></i>
                            {docStatutBadge[doc.statut]?.label || doc.statut}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-xs text-foreground-600">{doc.date || '-'}</td>
                        <td className="py-2 px-3">
                          {doc.alertes.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {doc.alertes.map((a, i) => (
                                <span key={i} className="text-[10px] bg-red-50 text-red-700 px-1.5 py-0.5 rounded border border-red-200">{a}</span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs text-accent-600">Aucune</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION : Gap List */}
          {activeSection === 'gaps' && (
            <div className="space-y-4">
              {/* Filtres criticité */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-foreground-600">Filtrer par criticité :</span>
                {['Bloquant', 'Majeur', 'Mineur'].map((c) => (
                  <button
                    key={c}
                    onClick={() => selectFilter(c)}
                    className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                      filtreCriticite === c ? criticiteBadge[c] + ' font-semibold' : 'bg-background-50 text-foreground-600 border-background-200/70 hover:bg-background-100'
                    }`}
                  >
                    {c}
                  </button>
                ))}
                {filtreCriticite && (
                  <button onClick={() => selectFilter(null)} className="text-xs text-foreground-600 hover:text-foreground-950 cursor-pointer">
                    <i className="ri-close-line"></i> Effacer
                  </button>
                )}
              </div>

              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Gap List Priorisée — {gapsFiltres.length} écarts</h3>
                  <span className="text-xs bg-background-100 text-foreground-600 px-2 py-1 rounded-full">{data.gaps.length} total</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-background-200/70">
                        <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs w-12">ID</th>
                        <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Axe</th>
                        <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Description</th>
                        <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Criticité</th>
                        <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Action</th>
                        <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Délai</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gapsFiltres.map((gap) => (
                        <tr key={gap.id} className="border-b border-background-100 hover:bg-background-50/50">
                          <td className="py-2 px-2 text-xs font-mono text-foreground-600">{gap.id}</td>
                          <td className="py-2 px-2 text-xs text-foreground-950">{gap.axe}</td>
                          <td className="py-2 px-2 text-xs text-foreground-700">{gap.description}</td>
                          <td className="py-2 px-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${criticiteBadge[gap.criticite] || ''}`}>{gap.criticite}</span>
                          </td>
                          <td className="py-2 px-2 text-xs text-foreground-600">{gap.action}</td>
                          <td className="py-2 px-2 text-xs font-semibold text-foreground-950 whitespace-nowrap">{gap.delai}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION : Erreurs AUSCGIE */}
          {activeSection === 'erreurs' && (
            <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Détection IA Erreurs AUSCGIE</h3>
                  <p className="text-xs text-foreground-600 mt-0.5">Modèle entraîné sur {data.vectorDB.casRejetesIA.total} cas rejetés — Précision {data.vectorDB.casRejetesIA.precision} · Rappel {data.vectorDB.casRejetesIA.rappel}</p>
                </div>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-semibold">{erreursBloquantes} bloquants ouverts</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-background-200/70">
                      <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Code</th>
                      <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Description</th>
                      <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Article</th>
                      <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Criticité</th>
                      <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Correction</th>
                      <th className="text-left py-2 px-2 text-foreground-600 font-medium text-xs">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.erreursAuscgie.map((err) => (
                      <tr key={err.code} className={`border-b border-background-100 hover:bg-background-50/50 ${err.statut === 'ouvert' && err.criticite === 'Bloquant' ? 'bg-red-50/50' : ''}`}>
                        <td className="py-2 px-2 font-mono text-xs text-foreground-950">{err.code}</td>
                        <td className="py-2 px-2 text-xs text-foreground-700">{err.description}</td>
                        <td className="py-2 px-2 text-xs text-foreground-600 whitespace-nowrap">{err.article}</td>
                        <td className="py-2 px-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${criticiteBadge[err.criticite] || ''}`}>{err.criticite}</span>
                        </td>
                        <td className="py-2 px-2 text-xs text-foreground-600 max-w-[250px]">{err.correction}</td>
                        <td className="py-2 px-2">
                          <span className={`text-xs font-medium ${err.statut === 'corrige' ? 'text-accent-600' : 'text-red-600'}`}>
                            <i className={`text-[10px] ${err.statut === 'corrige' ? 'ri-check-line' : 'ri-close-circle-line'}`}></i>
                            {' '}{err.statut === 'corrige' ? 'Corrigé' : 'Ouvert'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION : Base Entraînement */}
          {activeSection === 'casRejetes' && (
            <div className="space-y-6">
              {/* Top erreurs */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Top 8 Erreurs — {data.casRejetesStats.total} Cas Rejetés COBAC</h3>
                <div className="space-y-2">
                  {data.casRejetesStats.topErreurs.map((err) => (
                    <div key={err.erreur} className="flex items-center gap-3">
                      <span className="text-xs text-foreground-700 w-72 flex-shrink-0">{err.erreur}</span>
                      <div className="flex-1 h-4 bg-background-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400 rounded-full transition-all duration-700 ease-out" style={{ width: `${err.pourcentage}%` }}></div>
                      </div>
                      <span className="text-xs font-semibold text-foreground-950 w-12 text-right">{err.occurrences}</span>
                      <span className="text-xs text-foreground-600 w-10 text-right">{err.pourcentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Par pays */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Répartition par Pays</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {data.casRejetesStats.parPays.map((p) => (
                    <div key={p.pays} className="bg-background-50 rounded-lg p-3 border border-background-200/70 text-center">
                      <div className="text-lg font-bold text-foreground-950">{p.nombre}</div>
                      <div className="text-xs text-foreground-600">{p.pays}</div>
                      <div className="text-[10px] text-foreground-600">{p.pourcentage}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vector DB */}
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                    <i className="ri-database-2-line text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Base Vectorielle — {data.vectorDB.status}</h3>
                    <p className="text-xs text-foreground-600">{data.vectorDB.sources.length} sources réglementaires indexées · {data.vectorDB.sources.reduce((a, s) => a + s.articles, 0)} articles</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.vectorDB.sources.map((src) => (
                    <div key={src.nom} className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                      <div className="text-sm font-medium text-foreground-950">{src.nom}</div>
                      <div className="text-xs text-foreground-600 mt-0.5">{src.articles} articles · <span className="text-accent-600 font-semibold">{src.status}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION : ISO 27001 */}
          {activeSection === 'certification' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent-500 text-background-50">
                    <i className="ri-shield-check-line text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Certification ISO 27001 — Modules 1-2</h3>
                    <p className="text-xs text-foreground-600">Audité par {data.certificationISO.auditeur} · Obtenu le {data.certificationISO.dateObtention}</p>
                  </div>
                  <span className="ml-auto text-xs bg-accent-100 text-accent-900 px-3 py-1 rounded-full font-semibold">{data.certificationISO.status}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="bg-accent-50 rounded-lg p-3 border border-accent-200 text-center">
                    <div className="text-lg font-bold text-accent-900">{data.certificationISO.pointsControle}</div>
                    <div className="text-xs text-accent-600">Points contrôlés</div>
                  </div>
                  <div className="bg-accent-50 rounded-lg p-3 border border-accent-200 text-center">
                    <div className="text-lg font-bold text-accent-900">{data.certificationISO.conformite}</div>
                    <div className="text-xs text-accent-600">Conformité</div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 border border-amber-200 text-center">
                    <div className="text-lg font-bold text-amber-800">{data.certificationISO.nonConformites}</div>
                    <div className="text-xs text-amber-600">Non-conformités</div>
                  </div>
                  <div className="bg-background-50 rounded-lg p-3 border border-background-200/70 text-center">
                    <div className="text-lg font-bold text-foreground-950">{data.certificationISO.perimetre}</div>
                    <div className="text-xs text-foreground-600">Périmètre</div>
                  </div>
                </div>
                <h4 className="text-xs font-bold text-foreground-950 uppercase tracking-wide mb-2">Actions correctives</h4>
                <div className="space-y-1.5">
                  {data.certificationISO.actionsCorrectives.map((ac, i) => (
                    <div key={i} className="text-xs text-foreground-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-200 flex items-center gap-2">
                      <i className="ri-error-warning-line text-amber-600"></i>
                      {ac}
                    </div>
                  ))}
                </div>
              </div>

              {/* REX */}
              <div className="bg-secondary-50 rounded-xl border border-secondary-200 p-5 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-900">
                    <i className="ri-folder-history-line"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">REX #CM-024 — Publié</h3>
                    <p className="text-xs text-foreground-600">{data.rex.titre}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <span className="text-xs bg-accent-100 text-accent-900 px-2 py-1 rounded-full">{data.rex.impact}</span>
                  <a href={data.rex.url} className="flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg px-3 py-2 transition-all cursor-pointer whitespace-nowrap">
                    <i className="ri-arrow-right-line"></i> Consulter le REX
                  </a>
                </div>
              </div>
            </div>
          )}

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
      </div>
    </>
  );
}



