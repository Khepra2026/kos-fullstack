import { useKOSFullSeedCockpit } from '@/hooks/useKOSFullSeedCockpit';
import { SeoHead } from '@/components/feature/SeoHead';

export default function fullSeedCockpitPage() {
  const {
    data, activeCommande, resultatCommande, loading,
    selectedDomaine, showIsoDetails,
    scoreGlobalISO, scoreGlobalBigFour,
    domainesSeeded, totalDomaines, totalRecords,
    setSelectedDomaine, setShowIsoDetails, setResultatCommande,
    executerCommande,
  } = useKOSFullSeedCockpit();

  const formatISO = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'seeded': return 'bg-primary-100 text-primary-800 border-primary-200';
      case 'pending': return 'bg-background-100 text-foreground-600 border-background-300';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-background-100 text-foreground-600 border-background-300';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-primary-600';
    if (score >= 85) return 'text-accent-600';
    return 'text-secondary-600';
  };

  return (
    <>
      <SeoHead
        title="KOS Full Seed Cockpit — Production Réelle Big Four ISO"
        description="Cockpit de monitoring du Full Seed Orchestrator — 12 domaines, 0 donnée générique, 100% Big Four, 100% ISO. Auto-correction et auto-healing en temps réel."
        keywords="KOS, Full Seed, Big Four, ISO 27001, auto-healing, production"
      />

      <div className="min-h-screen bg-background-50">
        {/* Header */}
        <header className="bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
                    <i className="ri-database-2-line text-background-50 text-lg" />
                  </span>
                  <h1 className="text-xl font-heading text-foreground-950">{data.titre}</h1>
                </div>
                <p className="text-sm text-foreground-600">{data.baseline}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-xs font-medium">
                  {data.vueEnsemble.certification}
                </span>
                <span className="px-3 py-1 rounded-full bg-accent-100 text-accent-800 text-xs font-medium">
                  Mode Réel
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
          {/* Vue d'Ensemble */}
          <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { label: 'Mocks Production', value: `${data.vueEnsemble.mocksEnProduction}/${data.vueEnsemble.totalMocks}`, icon: 'ri-file-copy-line', color: 'primary' },
              { label: 'Domaines Seedés', value: `${domainesSeeded}/${totalDomaines}`, icon: 'ri-stack-line', color: 'accent' },
              { label: 'Records Insérés', value: String(totalRecords), icon: 'ri-database-line', color: 'primary' },
              { label: 'Score ISO', value: `${scoreGlobalISO}/100`, icon: 'ri-shield-check-line', color: 'accent' },
              { label: 'Score Big Four', value: `${scoreGlobalBigFour}/100`, icon: 'ri-medal-line', color: 'primary' },
              { label: 'Auto-Healing', value: 'Actif', icon: 'ri-heart-pulse-line', color: 'accent' },
              { label: 'Taux Réussite', value: '100%', icon: 'ri-check-double-line', color: 'primary' },
            ].map((s) => (
              <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-6 h-6 rounded bg-${s.color}-100 flex items-center justify-center`}>
                    <i className={`${s.icon} text-${s.color}-600 text-xs`} />
                  </span>
                  <span className="text-xs text-foreground-600">{s.label}</span>
                </div>
                <p className="text-lg font-heading text-foreground-950">{s.value}</p>
              </div>
            ))}
          </section>

          {/* Commandes */}
          <section>
            <h2 className="text-sm font-heading text-foreground-700 mb-3 flex items-center gap-2">
              <i className="ri-terminal-box-line text-primary-500" /> Commandes Orchestrator
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.commandes.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => executerCommande(cmd.action)}
                  disabled={loading}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all cursor-pointer
                    ${loading && activeCommande === cmd.action
                      ? 'bg-background-200 text-foreground-500'
                      : `bg-${cmd.couleur}-500 text-background-50 hover:bg-${cmd.couleur}-600`
                    }`}
                >
                  {loading && activeCommande === cmd.action ? (
                    <i className="ri-loader-4-line animate-spin" />
                  ) : (
                    <i className={cmd.icone} />
                  )}
                  {cmd.label}
                </button>
              ))}
            </div>
            {resultatCommande && (
              <div className="mt-3 relative">
                <button
                  onClick={() => setResultatCommande(null)}
                  className="absolute top-2 right-2 w-6 h-6 rounded flex items-center justify-center bg-background-100 hover:bg-background-200 cursor-pointer"
                >
                  <i className="ri-close-line text-foreground-600 text-xs" />
                </button>
                <pre className="bg-foreground-950 text-background-50 p-4 rounded-lg text-xs overflow-auto max-h-60 font-mono">
                  {resultatCommande}
                </pre>
              </div>
            )}
          </section>

          {/* Domaines */}
          <section>
            <h2 className="text-sm font-heading text-foreground-700 mb-3 flex items-center gap-2">
              <i className="ri-layout-grid-line text-primary-500" /> Domaines Seedés — {domainesSeeded}/{totalDomaines}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.domaines.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDomaine(selectedDomaine === d.id ? null : d.id)}
                  className={`text-left bg-background-50 border rounded-lg p-4 transition-all cursor-pointer
                    ${selectedDomaine === d.id
                      ? 'border-primary-300 bg-primary-50/50'
                      : 'border-background-200/70 hover:border-background-300'
                    }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                        <i className={`${d.icone} text-primary-600 text-sm`} />
                      </span>
                      <div>
                        <p className="text-sm font-heading text-foreground-950">{d.nom}</p>
                        <p className="text-xs text-foreground-600">{d.table}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatutBadge(d.statut)}`}>
                      {d.statut === 'seeded' ? 'Seedé' : d.statut === 'pending' ? 'En attente' : 'Erreur'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div>
                      <p className="text-xs text-foreground-600">Records</p>
                      <p className="text-sm font-heading text-foreground-950">{d.records}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground-600">ISO</p>
                      <p className={`text-sm font-heading ${getScoreColor(d.scoreISO)}`}>{d.scoreISO}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground-600">Big Four</p>
                      <p className={`text-sm font-heading ${getScoreColor(d.scoreBigFour)}`}>{d.scoreBigFour}</p>
                    </div>
                    <div className="flex-1">
                      <div className="w-full h-1.5 rounded-full bg-background-200">
                        <div
                          className="h-full rounded-full bg-primary-500 transition-all"
                          style={{ width: `${d.progression}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* ISO Certifications */}
          <section>
            <button
              onClick={() => setShowIsoDetails(!showIsoDetails)}
              className="w-full text-left flex items-center justify-between bg-background-50 border border-background-200/70 rounded-lg p-4 cursor-pointer hover:border-background-300 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center">
                  <i className="ri-award-line text-accent-600 text-sm" />
                </span>
                <div>
                  <p className="text-sm font-heading text-foreground-950">Certifications ISO — 6 frameworks</p>
                  <p className="text-xs text-foreground-600">ISO 27001 / 9001 / 42001 / 37301 / 31000 / ISAE 3402</p>
                </div>
              </div>
              {showIsoDetails ? (
                <i className="ri-arrow-up-s-line text-foreground-600" />
              ) : (
                <i className="ri-arrow-down-s-line text-foreground-600" />
              )}
            </button>
            {showIsoDetails && (
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.isoCertifications.map((iso) => (
                  <div key={iso.framework} className="bg-background-50 border border-background-200/70 rounded-lg p-3">
                    <p className="text-sm font-heading text-foreground-950">{iso.framework}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        iso.status === 'in_progress'
                          ? 'bg-accent-100 text-accent-800'
                          : 'bg-background-100 text-foreground-600'
                      }`}>
                        {iso.status === 'in_progress' ? 'En cours' : 'Planifié'}
                      </span>
                      <span className="text-xs text-foreground-600">{iso.auditor}</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-foreground-600 mb-0.5">
                        <span>Score</span>
                        <span>{iso.score}/100</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-background-200">
                        <div
                          className="h-full rounded-full bg-accent-500"
                          style={{ width: `${iso.score}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-foreground-600 mt-1">Cible : {iso.dateCible}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Auto-Healing */}
          <section>
            <h2 className="text-sm font-heading text-foreground-700 mb-3 flex items-center gap-2">
              <i className="ri-heart-pulse-line text-accent-500" /> Auto-Healing — Toutes les 60s
            </h2>
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {data.autoHealing.criteres.map((c) => (
                  <div key={c.critere} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${c.conforme ? 'bg-primary-500' : 'bg-red-500'}`} />
                    <div>
                      <p className="text-xs text-foreground-600">{c.critere}</p>
                      <p className="text-sm font-heading text-foreground-950">
                        {c.actuel} <span className="text-xs text-foreground-600">/ {c.cible}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-background-200/70">
                <p className="text-xs text-foreground-600">
                  Dernier scan : {formatISO(data.autoHealing.dernierScan)}
                </p>
                <p className="text-xs text-foreground-600">
                  Prochain : {formatISO(data.autoHealing.prochainScan)}
                </p>
              </div>
            </div>
          </section>

          {/* Checklist Big Four */}
          <section>
            <h2 className="text-sm font-heading text-foreground-700 mb-3 flex items-center gap-2">
              <i className="ri-check-double-line text-primary-500" /> Checklist Big Four — {data.checklistBigFour.filter(c => c.statut).length}/{data.checklistBigFour.length}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {data.checklistBigFour.map((c) => (
                <div key={c.critere} className="bg-background-50 border border-background-200/70 rounded-lg p-3 flex items-start gap-3">
                  <span className={`w-5 h-5 mt-0.5 rounded-full flex items-center justify-center shrink-0 ${c.statut ? 'bg-primary-100' : 'bg-background-200'}`}>
                    <i className={`${c.statut ? 'ri-check-line text-primary-600' : 'ri-time-line text-foreground-600'} text-xs`} />
                  </span>
                  <div>
                    <p className="text-sm font-heading text-foreground-950">{c.critere}</p>
                    <p className="text-xs text-foreground-600">{c.preuve}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Logs */}
          <section>
            <h2 className="text-sm font-heading text-foreground-700 mb-3 flex items-center gap-2">
              <i className="ri-history-line text-primary-500" /> Audit Trail — ISAE 3402
            </h2>
            <div className="bg-background-50 border border-background-200/70 rounded-lg divide-y divide-background-200/70">
              {data.logs.map((log, i) => (
                <div key={i} className="p-3 flex items-start gap-3">
                  <span className="w-2 h-2 mt-1.5 rounded-full bg-primary-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-heading text-foreground-950">{log.action}</p>
                      <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                        {log.statut}
                      </span>
                    </div>
                    <p className="text-xs text-foreground-600 mt-0.5">{log.detail}</p>
                  </div>
                  <p className="text-xs text-foreground-600 whitespace-nowrap">{formatISO(log.timestamp)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-6">
            <p className="text-xs text-foreground-600">{data.disclaimer}</p>
            <a href="/kos-ultimate-cockpit" className="text-xs text-primary-600 hover:text-primary-700 mt-1 inline-block">
              ← Retour à l'Ultimate Cockpit
            </a>
          </footer>
        </main>
      </div>
    </>
  );
}





