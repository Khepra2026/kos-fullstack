import { useKOSRexTemplate } from '@/hooks/useKOSRexTemplate';
import { SeoHead } from '@/components/feature/SeoHead';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const criticiteBadge: Record<string, string> = {
  Critique: 'bg-red-100 text-red-800 border-red-200',
  Élevée: 'bg-red-100 text-red-800 border-red-200',
  Majeure: 'bg-amber-100 text-amber-800 border-amber-200',
  Modérée: 'bg-background-100 text-foreground-600 border-background-200',
};

function ProgressCircle({ value, size = 60, strokeWidth = 5, colorClass = 'text-primary-500' }: { value: number; size?: number; strokeWidth?: number; colorClass?: string }) {
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
        <span className="text-xs font-bold text-foreground-950">{value}%</span>
      </div>
    </div>
  );
}

export default function KOSRexTemplatePage() {
  const {
    data,
    showRules,
    toggleRules,
    expandedPhase,
    togglePhase,
    bigFourScore,
    redFlagsCount,
  } = useKOSRexTemplate();

  const { rex } = data;

  return (
    <>
      <SeoHead
        title="Template REX KHEPRA v1.0 — CM-EMF-024 | Retour d'Expérience Agrément EMF COBAC"
        description="Template REX Big Four KHEPRA : Cas CM-EMF-024 — Agrément EMF Catégorie 2 Cameroun. 7 sections : Métadonnées, Contexte, Red Flags, Actions, Résultats, Leçons Apprises, Capitalisation. Standard KPMG Clara / Deloitte Omnia."
        keywords="REX, retour expérience, KHEPRA, agrément EMF, COBAC, AUSCGIE, microfinance, Cameroun, CEMAC, capitalisation, Big Four, case study"
      />

      <div className="min-h-screen bg-background-50">
        {/* Hero */}
        <section className="relative bg-white border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary-500 text-background-50">
                    <i className="ri-folder-history-line text-lg"></i>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-secondary-500">Template REX KHEPRA v{data.version}</span>
                    <h1 className="text-xl md:text-3xl font-bold text-foreground-950 leading-tight">{data.titre}</h1>
                  </div>
                </div>
                <p className="text-sm md:text-base text-foreground-600 mt-1 max-w-3xl">{data.baseline}</p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <a href={data.navigationRetour.url} className="flex items-center gap-2 text-sm text-foreground-600 hover:text-primary-500 transition-colors bg-background-50 rounded-xl px-4 py-2 border border-background-200/70 cursor-pointer whitespace-nowrap">
                  <i className="ri-arrow-left-line"></i>
                  {data.navigationRetour.label}
                </a>
              </div>
            </div>

            <BigFourSubtitleBar text="REX KHEPRA — Standard KPMG Clara · Deloitte Omnia · EY Canvas · PwC Viewpoint — Capitalisation Big Four" />
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* 1. MÉTADONNÉES */}
          <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-foreground-950 text-background-50">
                <span className="text-xs font-bold">1</span>
              </div>
              <h2 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Métadonnées</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                <div className="text-[10px] text-foreground-600 uppercase tracking-wide mb-1">ID REX</div>
                <div className="text-sm font-bold text-foreground-950 font-mono">{rex.id}</div>
                <div className="text-[10px] text-foreground-600 mt-0.5">Code pays-secteur-incrément</div>
              </div>
              <div className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                <div className="text-[10px] text-foreground-600 uppercase tracking-wide mb-1">Méthodo KHEPRA</div>
                <div className="text-sm font-bold text-primary-500">{rex.methodeKhepra}</div>
                <div className="text-[10px] text-foreground-600 mt-0.5">LICENSE™ / DD™ / ESG™</div>
              </div>
              <div className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                <div className="text-[10px] text-foreground-600 uppercase tracking-wide mb-1">Secteur SASB</div>
                <div className="text-sm font-bold text-foreground-950">{rex.secteurSASB}</div>
                <div className="text-[10px] text-foreground-600 mt-0.5">77 industries SASB</div>
              </div>
              <div className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                <div className="text-[10px] text-foreground-600 uppercase tracking-wide mb-1">Pays UEMOA/CEMAC</div>
                <div className="text-sm font-bold text-foreground-950">{rex.paysISO}</div>
                <div className="text-[10px] text-foreground-600 mt-0.5">ISO 3166</div>
              </div>
              <div className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                <div className="text-[10px] text-foreground-600 uppercase tracking-wide mb-1">Durée mission</div>
                <div className="text-sm font-bold text-foreground-950">{rex.dureeMission}</div>
                <div className="text-[10px] text-foreground-600 mt-0.5">Jours calendaires</div>
              </div>
              <div className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                <div className="text-[10px] text-foreground-600 uppercase tracking-wide mb-1">Niveau confidentialité</div>
                <span className="inline-block text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">{rex.niveauConfidentialite}</span>
                <div className="text-[10px] text-foreground-600 mt-0.5">Public / Interne / Restreint</div>
              </div>
              <div className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                <div className="text-[10px] text-foreground-600 uppercase tracking-wide mb-1">Validé par</div>
                <div className="text-sm font-bold text-accent-500">{rex.validePar}</div>
                <div className="text-[10px] text-foreground-600 mt-0.5">Partner + Comité technique</div>
              </div>
              <div className="bg-background-50 rounded-lg p-4 border border-background-200/70 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[10px] text-foreground-600 uppercase tracking-wide mb-1">Date génération</div>
                  <div className="text-sm font-bold text-foreground-950">{data.dateGeneration}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. CONTEXTE CLIENT ANONYMISÉ */}
          <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-foreground-950 text-background-50">
                <span className="text-xs font-bold">2</span>
              </div>
              <h2 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Contexte Client Anonymisé</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-background-50 rounded-lg p-4 border border-background-200/70 lg:col-span-1">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-user-line text-primary-500"></i>
                  <span className="text-xs font-bold text-foreground-950 uppercase tracking-wide">Profil</span>
                </div>
                <p className="text-sm text-foreground-700 leading-relaxed">{rex.contexteClient.profil}</p>
              </div>
              <div className="bg-background-50 rounded-lg p-4 border border-background-200/70 lg:col-span-1">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-crosshair-line text-accent-500"></i>
                  <span className="text-xs font-bold text-foreground-950 uppercase tracking-wide">Objectif</span>
                </div>
                <p className="text-sm text-foreground-700 leading-relaxed">{rex.contexteClient.objectif}</p>
              </div>
              <div className="bg-background-50 rounded-lg p-4 border border-background-200/70 lg:col-span-1">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-alert-line text-red-500"></i>
                  <span className="text-xs font-bold text-foreground-950 uppercase tracking-wide">Complexité initiale</span>
                </div>
                <p className="text-sm text-foreground-700 leading-relaxed">{rex.contexteClient.complexiteInitiale}</p>
              </div>
            </div>
          </div>

          {/* 3. SITUATION INITIALE & RED FLAGS */}
          <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500 text-background-50">
                <span className="text-xs font-bold">3</span>
              </div>
              <h2 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Situation Initiale & Red Flags — {redFlagsCount}/{rex.redFlags.length} cochés</h2>
            </div>
            <div className="space-y-3">
              {rex.redFlags.map((rf, i) => (
                <div key={i} className={`rounded-lg p-4 border ${rf.coche ? 'bg-red-50/50 border-red-200' : 'bg-background-50 border-background-200/70'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 flex items-center justify-center rounded flex-shrink-0 mt-0.5 ${rf.coche ? 'bg-red-100 text-red-700' : 'bg-background-100 text-foreground-600'}`}>
                      <i className={`text-sm ${rf.coche ? 'ri-checkbox-circle-fill' : 'ri-checkbox-blank-circle-line'}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold bg-red-100 text-red-800 px-2 py-0.5 rounded-full">{rf.categorie}</span>
                        <span className="text-sm font-semibold text-foreground-950">{rf.description}</span>
                      </div>
                      <div className="mt-1.5 flex items-start gap-2">
                        <i className="ri-error-warning-line text-red-600 text-sm mt-0.5 flex-shrink-0"></i>
                        <p className="text-xs text-red-700">{rf.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. ACTIONS KHEPRA DÉPLOYÉES */}
          <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-500 text-background-50">
                <span className="text-xs font-bold">4</span>
              </div>
              <h2 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Actions KHEPRA Déployées — 4 Phases KHEPRA LICENSE™</h2>
            </div>
            <div className="space-y-3">
              {rex.actionsKhepra.map((action) => (
                <div key={action.phase} className="bg-background-50 rounded-lg border border-background-200/70 overflow-hidden">
                  <button
                    onClick={() => togglePhase(action.phase)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-background-100/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${expandedPhase === action.phase ? 'bg-primary-500' : 'bg-background-300'}`}></div>
                      <div>
                        <div className="text-sm font-semibold text-foreground-950">{action.phase}</div>
                        <div className="text-xs text-foreground-600">Délai réel : {action.delaiReel}</div>
                      </div>
                    </div>
                    <i className={`text-foreground-600 text-lg transition-transform ${expandedPhase === action.phase ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}></i>
                  </button>
                  {expandedPhase === action.phase && (
                    <div className="border-t border-background-200/70 p-4 space-y-3">
                      <div>
                        <div className="text-xs font-bold text-foreground-950 uppercase tracking-wide mb-1">Actions menées</div>
                        <p className="text-sm text-foreground-700 leading-relaxed">{action.actions}</p>
                      </div>
                      <div className="bg-accent-50 rounded-lg p-3 border border-accent-200">
                        <div className="text-xs font-bold text-accent-800 uppercase tracking-wide mb-1">Livrables</div>
                        <p className="text-sm text-accent-800">{action.livrables}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 5. RÉSULTATS & IMPACT MESURABLE */}
          <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-500 text-background-50">
                <span className="text-xs font-bold">5</span>
              </div>
              <h2 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Résultats & Impact Mesurable</h2>
            </div>

            {/* KPIs Principaux */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                <div className="text-[10px] text-accent-600 uppercase tracking-wide mb-1">KPI Réglementaire</div>
                <div className="text-sm font-bold text-accent-800">{rex.resultats.agrement}</div>
              </div>
              <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                <div className="text-[10px] text-primary-600 uppercase tracking-wide mb-1">KPI Financier</div>
                <div className="text-sm font-bold text-primary-800">{rex.resultats.gainFinancier}</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <div className="text-[10px] text-red-600 uppercase tracking-wide mb-1">KPI Risque</div>
                <div className="text-sm font-bold text-red-800">{rex.resultats.redFlagsClotures}</div>
              </div>
              <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
                <div className="text-[10px] text-secondary-600 uppercase tracking-wide mb-1">Taux Succès</div>
                <div className="text-sm font-bold text-secondary-800">{rex.resultats.tauxSucces}</div>
              </div>
            </div>

            {/* KPIs supplémentaires */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {rex.resultats.kpiSupplementaires.map((kpi, i) => (
                <div key={i} className="bg-background-50 rounded-lg p-3 border border-background-200/70 text-center">
                  <div className="text-[10px] text-foreground-600 uppercase tracking-wide">{kpi.label}</div>
                  <div className="text-lg font-bold text-foreground-950 mt-1">{kpi.valeur}</div>
                  <div className="text-xs font-semibold text-accent-500">{kpi.delta}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. LEÇONS APPRISES */}
          <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-foreground-950 text-background-50">
                <span className="text-xs font-bold">6</span>
              </div>
              <h2 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Leçons Apprises & Erreurs à Éviter — Format Big Four « Lessons Learned »</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              {/* Ce qui a marché */}
              <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                <div className="flex items-center gap-2 mb-3">
                  <i className="ri-thumb-up-line text-accent-600"></i>
                  <span className="text-xs font-bold text-accent-800 uppercase tracking-wide">Ce qui a marché</span>
                </div>
                <ul className="space-y-2">
                  {rex.leconsApprises.ceQuiAMarche.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent-500 mt-0.5 flex-shrink-0"><i className="ri-check-line text-xs"></i></span>
                      <span className="text-xs text-accent-800 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Points de vigilance */}
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <div className="flex items-center gap-2 mb-3">
                  <i className="ri-error-warning-line text-amber-600"></i>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Points de vigilance</span>
                </div>
                <ul className="space-y-2">
                  {rex.leconsApprises.pointsVigilance.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5 flex-shrink-0"><i className="ri-alert-line text-xs"></i></span>
                      <span className="text-xs text-amber-800 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommandations KOS */}
              <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                <div className="flex items-center gap-2 mb-3">
                  <i className="ri-lightbulb-line text-primary-600"></i>
                  <span className="text-xs font-bold text-primary-800 uppercase tracking-wide">Recommandations KOS</span>
                </div>
                <ul className="space-y-2">
                  {rex.leconsApprises.recommandationsKOS.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary-500 mt-0.5 flex-shrink-0"><i className="ri-arrow-right-line text-xs"></i></span>
                      <span className="text-xs text-primary-800 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 7. CAPITALISATION KOS */}
          <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary-500 text-background-50">
                <span className="text-xs font-bold">7</span>
              </div>
              <h2 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Capitalisation KOS</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-git-branch-line text-primary-500"></i>
                  <span className="text-xs font-bold text-foreground-950 uppercase tracking-wide">Mise à jour Méthodo</span>
                </div>
                <p className="text-xs text-foreground-700 leading-relaxed">{rex.capitalisation.majMethodo}</p>
              </div>
              <div className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-bar-chart-line text-accent-500"></i>
                  <span className="text-xs font-bold text-foreground-950 uppercase tracking-wide">Benchmark</span>
                </div>
                <p className="text-xs text-foreground-700 leading-relaxed">{rex.capitalisation.benchmark}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-graduation-cap-line text-secondary-500"></i>
                  <span className="text-xs font-bold text-foreground-950 uppercase tracking-wide">Academy</span>
                </div>
                <p className="text-xs text-foreground-700 leading-relaxed">{rex.capitalisation.academy}</p>
              </div>
              <div className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-file-copy-line text-primary-500"></i>
                  <span className="text-xs font-bold text-foreground-950 uppercase tracking-wide">Assets Réutilisables</span>
                </div>
                <ul className="space-y-1.5">
                  {rex.capitalisation.assetReutilisable.map((asset, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary-500 mt-0.5 flex-shrink-0"><i className="ri-file-text-line text-xs"></i></span>
                      <span className="text-xs text-foreground-700">{asset}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RÈGLES D'OR BIG FOUR */}
          <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6 mb-6">
            <button onClick={toggleRules} className="w-full flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-800">
                  <i className="ri-star-line text-sm"></i>
                </div>
                <h2 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Règles d'Or Big Four pour REX</h2>
              </div>
              <i className={`text-foreground-600 text-lg ${showRules ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}></i>
            </button>
            {showRules && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-background-200/70">
                {data.reglesOrBigFour.map((regle) => (
                  <div key={regle.regle} className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700 flex-shrink-0">
                        <i className={`${regle.icone} text-sm`}></i>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-amber-800">{regle.regle}</div>
                        <p className="text-xs text-amber-700 mt-1 leading-relaxed">{regle.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 sm:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700 flex-shrink-0">
                      <i className="ri-book-open-line text-sm"></i>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-amber-800">Livrable prêt</div>
                      <p className="text-xs text-amber-700 mt-1 leading-relaxed">Copie ce template en Notion/Coda/SharePoint. Crée 1 page par mission. Au bout de 20 REX, tu as une base de données « KPMG Clara » version CEMAC.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CHECKLIST CONFORMITÉ BIG FOUR */}
          <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-foreground-950 text-background-50">
                  <i className="ri-check-double-line text-sm"></i>
                </div>
                <h2 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Checklist Conformité Big Four</h2>
              </div>
              <div className="flex items-center gap-3">
                <ProgressCircle value={bigFourScore} size={48} strokeWidth={4} colorClass="text-accent-500" />
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${bigFourScore === 100 ? 'bg-accent-100 text-accent-900' : 'bg-amber-100 text-amber-800'}`}>
                  {bigFourScore}% — {data.checklistBigFour.filter(c => c.statut).length}/{data.checklistBigFour.length} critères
                </span>
              </div>
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

          {/* FOOTER CITATION */}
          <div className="bg-foreground-950 rounded-xl p-5 md:p-6 text-background-50 text-center">
            <p className="text-sm italic opacity-80">
              « Un REX non capitalisé est une erreur qui se reproduira. Un REX capitalisé est un actif stratégique qui rend l'organisation plus intelligente chaque trimestre. »
            </p>
            <p className="text-xs opacity-60 mt-2">— Principe KOS #14 : Capitalisation Continue • KHEPRA Knowledge Operating System</p>
          </div>
        </main>
      </div>
    </>
  );
}