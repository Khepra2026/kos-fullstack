import { useKOSBig4KhepraArchitect } from '@/hooks/useKOSBig4KhepraArchitect';
import { SeoHead } from '@/components/feature/SeoHead';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const axeLabels: Record<string, string> = {
  plateforme: 'Plateforme',
  outils: 'Outils SaaS',
  gouvernance: 'Gouvernance',
  assurance: 'Assurance',
};

const axeIcons: Record<string, string> = {
  plateforme: 'ri-stack-line',
  outils: 'ri-tools-line',
  gouvernance: 'ri-government-line',
  assurance: 'ri-shield-check-line',
};

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

function BadgeSeverite({ severite }: { severite: string }) {
  const styles: Record<string, string> = {
    blocker: 'bg-red-100 text-red-800 border-red-200',
    major: 'bg-amber-100 text-amber-800 border-amber-200',
    minor: 'bg-background-100 text-foreground-600 border-background-200',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${styles[severite] || styles.minor}`}>
      {severite === 'blocker' ? '🔴 Bloquant' : severite === 'major' ? '🟡 Majeur' : '⚪ Mineur'}
    </span>
  );
}

export default function big4KhepraArchitectPage() {
  const {
    data,
    activeAxe,
    setActiveAxe,
    axeActif,
    progressGlobal,
    expandedProduit,
    toggleProduit,
    expandedNiveau,
    toggleNiveau,
    showMermaid,
    toggleMermaid,
    bigFourScore,
  } = useKOSBig4KhepraArchitect();

  return (
    <>
      <SeoHead
        title="KOS-BIG4-KHEPRA v1.0 — Knowledge Platform Architecture"
        description="Industrialisation de la base de connaissances Khepraexperts.com aux standards Big Four. 4 axes : Plateforme, Outils SaaS, Gouvernance, Assurance. Partner Knowledge & Innovation KHEPRA."
        keywords="KOS, Big Four, knowledge platform, KHEPRA, architecture, OHADA, BCEAO, COBAC, ISAE 3000"
      />

      <div className="min-h-screen bg-background-50">
        {/* Hero */}
        <section className="relative bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-500 text-background-50">
                    <i className="ri-brain-line text-lg"></i>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">KOS-Architect v1.0</span>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-foreground-950 leading-tight">
                  KOS-BIG4-KHEPRA
                </h1>
                <p className="text-base md:text-lg text-foreground-600 mt-2 max-w-2xl">
                  Partner Knowledge & Innovation — Industrialisation de la base de connaissances aux standards Big Four
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-3 bg-background-100 rounded-xl px-4 py-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-500">{progressGlobal}%</div>
                    <div className="text-xs text-foreground-600">Progression</div>
                  </div>
                  <div className="w-px h-10 bg-background-200/70"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-500">{bigFourScore}%</div>
                    <div className="text-xs text-foreground-600">Conformité Big Four</div>
                  </div>
                </div>
              </div>
            </div>
            <BigFourSubtitleBar text="KOS-BIG4-KHEPHA v1.0 — Knowledge Platform Architecture — 4 Axes — Standards Deloitte/EY/PwC/KPMG" />
          </div>
        </section>

        {/* Navigation Axes */}
        <nav className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-sm border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex overflow-x-auto gap-1 py-2">
              {data.axes.map((axe) => (
                <button
                  key={axe.id}
                  onClick={() => setActiveAxe(axe.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                    activeAxe === axe.id
                      ? 'bg-primary-500 text-background-50'
                      : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-950'
                  }`}
                >
                  <i className={`${axe.icone} text-base`}></i>
                  {axeLabels[axe.id]}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeAxe === axe.id ? 'bg-background-50/20 text-background-50' : 'bg-background-100 text-foreground-600'
                  }`}>
                    {axe.progress}%
                  </span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Contenu Principal */}
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
          {/* AXE 1 : Plateforme */}
          {activeAxe === 'plateforme' && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl border border-background-200/70 p-6 md:p-8">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground-950">KHEPRA Knowledge OS</h2>
                    <p className="text-foreground-600 mt-1">« PwC Viewpoint » + « EY Atlas » — Portail self-service UEMOA/CEMAC</p>
                  </div>
                  <button
                    onClick={toggleMermaid}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary-500 text-background-50 text-sm font-medium whitespace-nowrap hover:bg-secondary-600 transition-all cursor-pointer"
                  >
                    {showMermaid ? <i className="ri-arrow-up-s-line text-base"></i> : <i className="ri-arrow-down-s-line text-base"></i>}
                    {showMermaid ? 'Masquer' : 'Voir'} schéma d'architecture
                  </button>
                </div>
                <ProgressBar value={axeActif.progress} label="Déploiement plateforme" colorClass="bg-primary-500" />

                {/* Schéma Mermaid */}
                {showMermaid && (
                  <div className="mt-6 bg-background-50 rounded-lg border border-background-200/70 p-4 md:p-6 overflow-x-auto">
                    <pre className="text-xs md:text-sm text-foreground-700 font-mono whitespace-pre leading-relaxed">
{`┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ Portail  │  │ Widgets  │  │   API    │  │ SCORM    │        │
│  │ FR/EN    │  │          │  │ REST/QL  │  │ e-learn  │        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
├───────┼──────────────┼─────────────┼─────────────┼───────────────┤
│       │         GATEWAY LAYER       │             │               │
│  ┌────┴─────────────────────────────┴─────────────┴────┐        │
│  │  SSO (Authentik) · Rate Limiter · WAF · CDN         │        │
│  └────┬─────────────────────────────────────────────────┘        │
├───────┼───────────────────────────────────────────────────────────┤
│       │         APPLICATION LAYER                                  │
│  ┌────┴──────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│  │Réglement. │ │Méthodos │ │  REX    │ │Benchmark│ │ Academy │ │
│  │137+84 txt │ │LIC/DD/EG│ │100 cas  │ │AVCA/FMI │ │12 mod.  │ │
│  └────┬──────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ │
├───────┼──────────────┼──────────┼──────────┼──────────┼──────────┤
│       │              AI LAYER   │          │          │          │
│  ┌────┴──────────────┴──────────┴──────────┴──────────┴────┐    │
│  │ Semantic Search · LLM RAG (Llama.cpp) · BGE-M3 · DocGen │    │
│  └────┬─────────────────────────────────────────────────────┘    │
├───────┼───────────────────────────────────────────────────────────┤
│       │         DATA LAYER                                        │
│  ┌────┴─────────────────────────────────────────────────────┐    │
│  │ Directus CMS · PostgreSQL · pgvector/Qdrant · S3/Docs   │    │
│  └────┬─────────────────────────────────────────────────────┘    │
├───────┼───────────────────────────────────────────────────────────┤
│       │         GOVERNANCE LAYER                                  │
│  ┌────┴─────────────────────────────────────────────────────┐    │
│  │ Versioning Git-like · Peer Review · ISAE 3402 Trail      │    │
│  │ ISAE 3000 Engine · Hash SHA256 · QR Verification         │    │
│  └──────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘`}
                    </pre>
                  </div>
                )}

                {/* Stack technique */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-foreground-950 uppercase tracking-wide mb-3">Stack Technique</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {Object.entries(axeActif.stack).map(([key, val]) => (
                      <div key={key} className="bg-background-50 rounded-lg p-3 border border-background-200/70">
                        <div className="text-xs text-foreground-600 uppercase tracking-wide">{key}</div>
                        <div className="text-sm font-medium text-foreground-950 mt-1">{val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modules */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-foreground-950 uppercase tracking-wide mb-3">5 Modules</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {axeActif.modules.map((mod) => (
                      <div key={mod.nom} className="bg-background-50 rounded-lg p-4 border border-background-200/70 hover:border-primary-300 transition-all cursor-pointer">
                        <h4 className="font-semibold text-foreground-950">{mod.nom}</h4>
                        <p className="text-xs text-foreground-600 mt-1 line-clamp-2">{mod.description}</p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {mod.fonctions.map((f) => (
                            <span key={f} className="text-xs bg-secondary-100 text-secondary-900 px-2 py-0.5 rounded-full">{f}</span>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-background-200/70">
                          <span className="text-xs text-primary-500 font-medium">Widget : {mod.widget}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AXE 2 : Outils SaaS */}
          {activeAxe === 'outils' && (
            <div className="space-y-8">
              {axeActif.produits.map((produit) => (
                <div key={produit.id} className="bg-white rounded-xl border border-background-200/70 overflow-hidden">
                  <button
                    onClick={() => toggleProduit(produit.id)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-background-50/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-500 text-background-50 flex-shrink-0">
                        <i className={`${produit.id === 'agrement-os' ? 'ri-building-4-line' : produit.id === 'dd-os' ? 'ri-search-eye-line' : 'ri-leaf-line'} text-xl`}></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground-950">{produit.nom}</h3>
                        <p className="text-sm text-foreground-600 mt-1">Basé sur {produit.methodeSource}</p>
                        <p className="text-xs text-foreground-600 mt-0.5">{produit.perimetre}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-background-100 text-foreground-600 px-2 py-1 rounded-full whitespace-nowrap">{produit.userStories} user stories</span>
                      {expandedProduit === produit.id ? <i className="ri-arrow-up-s-line text-foreground-600 text-lg"></i> : <i className="ri-arrow-down-s-line text-foreground-600 text-lg"></i>}
                    </div>
                  </button>

                  {expandedProduit === produit.id && (
                    <div className="border-t border-background-200/70 p-6 md:p-8 space-y-6">
                      {/* Fonctionnalités */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground-950 uppercase tracking-wide mb-3">Fonctionnalités clés</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {produit.fonctionnalites.map((f, i) => (
                            <div key={i} className="flex items-start gap-3 bg-background-50 rounded-lg p-3 border border-background-200/70">
                              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-accent-100 text-accent-900 flex-shrink-0 mt-0.5">
                                <i className="ri-check-line text-sm"></i>
                              </div>
                              <span className="text-sm text-foreground-700">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Erreurs types (pour Agrément OS) */}
                      {produit.id === 'agrement-os' && produit.erreursTypes && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground-950 uppercase tracking-wide mb-3">Check Erreurs Types (extrait)</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-background-200/70">
                                  <th className="text-left py-2 px-3 text-foreground-600 font-medium">Code</th>
                                  <th className="text-left py-2 px-3 text-foreground-600 font-medium">Description</th>
                                  <th className="text-left py-2 px-3 text-foreground-600 font-medium">Sévérité</th>
                                </tr>
                              </thead>
                              <tbody>
                                {produit.erreursTypes.map((err) => (
                                  <tr key={err.code} className="border-b border-background-100 hover:bg-background-50/50">
                                    <td className="py-2 px-3 font-mono text-xs text-foreground-950">{err.code}</td>
                                    <td className="py-2 px-3 text-foreground-700">{err.description}</td>
                                    <td className="py-2 px-3"><BadgeSeverite severite={err.severite} /></td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Primes pays (pour DD OS) */}
                      {produit.id === 'dd-os' && produit.primesPays && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground-950 uppercase tracking-wide mb-3">Primes Pays DCF OHADA (Réf. KHEPRA)</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-background-200/70">
                                  <th className="text-left py-2 px-3 text-foreground-600 font-medium">Pays</th>
                                  <th className="text-left py-2 px-3 text-foreground-600 font-medium">Secteur Financier</th>
                                  <th className="text-left py-2 px-3 text-foreground-600 font-medium">Secteur Industriel</th>
                                  <th className="text-left py-2 px-3 text-foreground-600 font-medium">Secteur Services</th>
                                </tr>
                              </thead>
                              <tbody>
                                {produit.primesPays.map((p) => (
                                  <tr key={p.pays} className="border-b border-background-100 hover:bg-background-50/50">
                                    <td className="py-2 px-3 font-medium text-foreground-950">{p.pays}</td>
                                    <td className="py-2 px-3 text-foreground-700">{p.secteurFinancier}</td>
                                    <td className="py-2 px-3 text-foreground-700">{p.secteurIndustriel}</td>
                                    <td className="py-2 px-3 text-foreground-700">{p.secteurServices}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Tables BDD */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground-950 uppercase tracking-wide mb-3">Schéma BDD</h4>
                        <div className="flex flex-wrap gap-2">
                          {produit.tablesBdd.map((t) => (
                            <span key={t} className="text-xs font-mono bg-background-100 text-foreground-700 px-3 py-1.5 rounded-lg border border-background-200/70">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* AXE 3 : Gouvernance */}
          {activeAxe === 'gouvernance' && (
            <div className="space-y-8">
              {/* Comités */}
              <div className="bg-white rounded-xl border border-background-200/70 p-6 md:p-8">
                <h3 className="text-lg font-bold text-foreground-950 mb-4">Comités Techniques — RACI</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-background-200/70">
                        <th className="text-left py-3 px-3 text-foreground-600 font-medium">Comité</th>
                        <th className="text-left py-3 px-3 text-foreground-600 font-medium">Responsable</th>
                        <th className="text-left py-3 px-3 text-foreground-600 font-medium">Accountable</th>
                        <th className="text-left py-3 px-3 text-foreground-600 font-medium">Fréquence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {axeActif.comites.map((c) => (
                        <tr key={c.nom} className="border-b border-background-100 hover:bg-background-50/50">
                          <td className="py-3 px-3 font-medium text-foreground-950">{c.nom}</td>
                          <td className="py-3 px-3 text-foreground-700">{c.responsable}</td>
                          <td className="py-3 px-3 text-foreground-700">{c.accountable}</td>
                          <td className="py-3 px-3">
                            <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                              c.frequence === 'Mensuel' ? 'bg-accent-100 text-accent-900' :
                              c.frequence === 'Trimestriel' ? 'bg-primary-100 text-primary-700' :
                              'bg-secondary-100 text-secondary-900'
                            }`}>{c.frequence}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Checklist ISAE 3000 */}
              <div className="bg-white rounded-xl border border-background-200/70 p-6 md:p-8">
                <h3 className="text-lg font-bold text-foreground-950 mb-4">Checklist ISAE 3000 — 9 Critères par Livrable</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {axeActif.checklistIsae3000.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-background-50 rounded-lg p-4 border border-background-200/70">
                      <div className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold">{i + 1}</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground-950">{item.critere}</div>
                        <div className="text-xs text-foreground-600 mt-0.5">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* REX */}
              <div className="bg-white rounded-xl border border-background-200/70 p-6 md:p-8">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground-950">Capitalisation REX</h3>
                    <p className="text-sm text-foreground-600 mt-1">Objectif : {axeActif.rexStats.objectifAnnuel} cas/an — {axeActif.rexStats.capitalises} capitalisés, {axeActif.rexStats.enCours} en cours</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-primary-500">{axeActif.rexStats.capitalises}</div>
                      <div className="text-xs text-foreground-600">Capitalisés</div>
                    </div>
                    <div className="w-px h-10 bg-background-200/70"></div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-accent-500">{axeActif.rexStats.enCours}</div>
                      <div className="text-xs text-foreground-600">En cours</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {axeActif.rexRecents.map((rex) => (
                    <div key={rex.id} className="flex items-center justify-between bg-background-50 rounded-lg p-4 border border-background-200/70 hover:border-primary-200 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-semibold bg-primary-100 text-primary-700 px-2 py-1 rounded">{rex.id}</span>
                        <div>
                          <div className="text-sm font-medium text-foreground-950">{rex.titre}</div>
                          <div className="text-xs text-foreground-600 mt-0.5">{rex.pays} · {rex.secteur} · {rex.date}</div>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-foreground-600"></i>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AXE 4 : Assurance */}
          {activeAxe === 'assurance' && (
            <div className="space-y-6">
              {axeActif.niveaux.map((n) => (
                <div key={n.niveau} className="bg-white rounded-xl border border-background-200/70 overflow-hidden">
                  <button
                    onClick={() => toggleNiveau(n.niveau)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-background-50/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-xl text-background-50 ${
                        n.niveau === 1 ? 'bg-secondary-500' : n.niveau === 2 ? 'bg-primary-500' : 'bg-accent-500'
                      }`}>
                        <span className="text-lg font-bold">{n.niveau}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground-950">{n.nom}</h3>
                        <p className="text-sm text-foreground-600">{n.tarif} · RC {n.rc} · Signé : {n.signature}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-background-100 text-foreground-600 px-2 py-1 rounded-full whitespace-nowrap">{n.usage.split(',')[0]}</span>
                      {expandedNiveau === n.niveau ? <i className="ri-arrow-up-s-line text-foreground-600 text-lg"></i> : <i className="ri-arrow-down-s-line text-foreground-600 text-lg"></i>}
                    </div>
                  </button>

                  {expandedNiveau === n.niveau && (
                    <div className="border-t border-background-200/70 p-6 md:p-8 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground-950 uppercase tracking-wide mb-2">Usage</h4>
                        <p className="text-sm text-foreground-700">{n.usage}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground-950 uppercase tracking-wide mb-2">Disclaimer</h4>
                        <div className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                          <p className="text-sm text-foreground-700 italic leading-relaxed">{n.disclaimer}</p>
                        </div>
                      </div>
                      {n.annexes && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground-950 uppercase tracking-wide mb-2">5 Annexes Obligatoires</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {n.annexes.map((a, i) => (
                              <div key={i} className="flex items-center gap-2 bg-background-50 rounded-lg p-3 border border-background-200/70">
                                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-accent-100 text-accent-900 flex-shrink-0">
                                  <span className="text-xs font-bold">{i + 1}</span>
                                </div>
                                <span className="text-sm text-foreground-700">{a}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Checklist Big Four — toujours visible en bas */}
          <div className="mt-10 bg-white rounded-xl border border-background-200/70 p-6 md:p-8">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <h3 className="text-lg font-bold text-foreground-950">Checklist Conformité Big Four</h3>
              <div className="flex items-center gap-2 bg-accent-100 text-accent-900 px-3 py-1.5 rounded-lg">
                <i className="ri-check-double-line"></i>
                <span className="text-sm font-semibold">{bigFourScore}% — {data.checklistBigFour.filter(c => c.statut).length}/{data.checklistBigFour.length} critères validés</span>
              </div>
            </div>
            <div className="space-y-3">
              {data.checklistBigFour.map((item) => (
                <div key={item.critere} className="flex items-start gap-3 bg-background-50 rounded-lg p-4 border border-background-200/70">
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 ${item.statut ? 'bg-accent-100 text-accent-900' : 'bg-red-100 text-red-800'}`}>
                    <i className={`text-sm ${item.statut ? 'ri-check-line' : 'ri-close-line'}`}></i>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground-950">{item.critere}</div>
                    <div className="text-xs text-foreground-600 mt-0.5">{item.preuve}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contraintes */}
          <div className="mt-8 bg-background-50 rounded-xl border border-background-200/70 p-6 md:p-8">
            <h3 className="text-lg font-bold text-foreground-950 mb-3">Contraintes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-4 border border-background-200/70">
                <div className="text-xs text-foreground-600 uppercase tracking-wide">Réglementaires</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {data.contraintes.reglementaires.map((r) => (
                    <span key={r} className="text-xs bg-secondary-100 text-secondary-900 px-2 py-0.5 rounded-full">{r}</span>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-background-200/70">
                <div className="text-xs text-foreground-600 uppercase tracking-wide">Marchés</div>
                <div className="text-sm font-medium text-foreground-950 mt-2">{data.contraintes.marches}</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-background-200/70">
                <div className="text-xs text-foreground-600 uppercase tracking-wide">Primes Pays DCF</div>
                <div className="text-sm font-medium text-foreground-950 mt-2">{data.contraintes.primesPays}</div>
              </div>
            </div>
            <div className="mt-3 flex gap-3">
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-200 flex-1">
                <div className="flex items-center gap-2">
                  <i className="ri-error-warning-line text-amber-600"></i>
                  <span className="text-sm font-medium text-amber-800">Hors scope</span>
                </div>
                <p className="text-xs text-amber-700 mt-1">{data.contraintes.horsScope}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-3 border border-red-200 flex-1">
                <div className="flex items-center gap-2">
                  <i className="ri-alert-line text-red-600"></i>
                  <span className="text-sm font-medium text-red-800">Restriction</span>
                </div>
                <p className="text-xs text-red-700 mt-1">{data.contraintes.conformite}</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-8 bg-primary-500 rounded-xl p-6 md:p-8 text-background-50">
            <h3 className="text-lg font-bold mb-4">Next Steps — Exécution J+7 / J+30 / J+90</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.nextSteps.map((step, i) => (
                <div key={i} className="bg-background-50/10 rounded-lg p-4 border border-background-50/20">
                  <div className="text-2xl font-bold text-background-50">{step.echeance}</div>
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
          </div>
        </main>
      </div>
    </>
  );
}





