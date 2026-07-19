import { useState } from 'react';
import { selfDevelopmentStatus, blockMaturityMatrix, autoRemediationQueue, selfHealingTimeline, trajectoryTo150, bigFourComparison, fullProductionActivation } from '@/mocks/kos150BigFourSelfDevelopment';
import ScrollReveal from '@/components/feature/ScrollReveal';

const tabs = ['Activation 150%', 'Matrice 12 Blocs', 'Auto-Remédiation', 'Self-Healing', 'Trajectoire', 'Big Four Dominance'];

export default function KOS150BigFourSelfDevelopmentPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="min-h-screen bg-background-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        {/* ── HEADER ── */}
        <ScrollReveal>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-lg">
                <i className="ri-rocket-2-line text-white text-xl"></i>
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-accent-600 bg-accent-100 px-3 py-1.5 rounded-full">KOS CAPSTONE — FULL PRODUCTION</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-500"></span>
                  </span>
                  <span className="text-xs text-accent-600 font-semibold">LIVE — {fullProductionActivation.activationTimestamp}</span>
                </div>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground-950 mb-3 leading-tight">
              KOS <span className="text-accent-500">150%</span> Big Four Self-Development
              <span className="text-accent-500 text-xl align-top ml-1">™</span>
            </h1>
            <p className="text-foreground-600 text-base max-w-4xl leading-relaxed">
              <strong className="text-accent-600">FULL PRODUCTION 150% ACTIVÉE — 24 Juin 2026, 15:00 UTC.</strong> Compression x365 du plan quadrimestriel (Q3 2026 → Q2 2027) en une session unique. 12/12 Blocs à 150, 75 Agents Supra-Optimaux, Auto-Healing 100%, Triple Certification ISO, Big Four Dominance 5/5. <strong className="text-foreground-900">Zéro intervention humaine. Zéro dépendance externe. Zéro dégradation.</strong>
            </p>
          </div>
        </ScrollReveal>

        {/* ── STATS CARDS ── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'Score Actuel', value: `${selfDevelopmentStatus.currentScore}/150`, icon: 'ri-trophy-line', color: 'bg-accent-500', textColor: 'text-white', sub: 'CIEL ATTEINT' },
            { label: 'Blocs à 150', value: `${selfDevelopmentStatus.blocksAt150}/12`, icon: 'ri-check-double-line', color: 'bg-accent-500', textColor: 'text-white', sub: 'SUPREME' },
            { label: 'Agents Supra-Optimaux', value: `${selfDevelopmentStatus.agentsSupraOptimal}/75`, icon: 'ri-robot-2-line', color: 'bg-accent-500', textColor: 'text-white', sub: 'ZÉRO dégradation' },
            { label: 'Self-Healing', value: '100%', icon: 'ri-heart-pulse-line', color: 'bg-accent-500', textColor: 'text-white', sub: `${selfDevelopmentStatus.selfHealingIncidents} incidents` },
            { label: 'Uptime 150%', value: selfDevelopmentStatus.uptime150, icon: 'ri-shield-check-line', color: 'bg-accent-500', textColor: 'text-white', sub: `MTTH ${selfDevelopmentStatus.mtth150}` },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 80}>
              <div className="bg-background-50 border border-accent-200/60 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-10" style={{ background: 'var(--accent-500)' }}></div>
                <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center mb-3 relative z-10`}>
                  <i className={`${stat.icon} text-base ${stat.textColor}`}></i>
                </div>
                <div className="text-2xl font-bold text-foreground-950 relative z-10">{stat.value}</div>
                <div className="text-xs text-foreground-600 font-medium relative z-10">{stat.label}</div>
                <div className="text-[10px] text-accent-600 mt-1 font-bold uppercase tracking-wider relative z-10">{stat.sub}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ── FULL PRODUCTION BANNER ── */}
        <div className="flex items-center gap-3 mb-4 p-4 bg-gradient-to-r from-accent-500/10 via-accent-500/5 to-background-50 border border-accent-300/40 rounded-xl">
          <div className="w-10 h-10 rounded-lg bg-accent-500 flex items-center justify-center flex-shrink-0">
            <i className="ri-flashlight-line text-white text-lg"></i>
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-foreground-950">
              {fullProductionActivation.activationMode}
              <span className="text-xs font-medium text-foreground-600 ml-2">
                | Compression {fullProductionActivation.compressionFactor} | 5 nouveaux domaines absorbés automatiquement | {fullProductionActivation.certificationsAchieved}
              </span>
            </div>
            <div className="text-xs text-foreground-500 mt-0.5">
              {fullProductionActivation.trajectoriesCompressed} · {fullProductionActivation.agentsSupraOptimal} agents · Auto-Healing {fullProductionActivation.selfHealingRate} · MTTH {fullProductionActivation.mtth} · Pipeline {fullProductionActivation.pipeline} · CA {fullProductionActivation.revenueProjection}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xs font-bold text-accent-600 uppercase tracking-wider">ACTIVÉ</div>
            <div className="text-[10px] text-foreground-500">{fullProductionActivation.activationTimestamp}</div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="flex flex-wrap gap-1 p-1 bg-background-100 rounded-full mb-6 w-fit overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${activeTab === tab ? 'bg-background-50 text-foreground-950 shadow-sm' : 'text-foreground-600 hover:text-foreground-900'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* ── TAB 0: ACTIVATION 150% ── */}
        {activeTab === 'Activation 150%' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-accent-500/8 via-background-50 to-background-50 border border-accent-300/40 rounded-xl p-6">
              <h3 className="text-lg font-heading font-bold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-flashlight-line text-accent-500"></i>
                KOS Auto-Compression Engine™ — Activation Complète
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Trajectoires Comprimées', value: '4 trimestres → 1 session', icon: 'ri-speed-line' },
                  { label: 'Facteur Compression', value: '×365', icon: 'ri-zoom-in-line' },
                  { label: 'Blocs Vers 150', value: '12/12 — TOUS SUPREME', icon: 'ri-stack-line' },
                  { label: 'Nouveaux Domaines', value: '5 auto-absorbés', icon: 'ri-brain-line' },
                ].map((item, i) => (
                  <div key={i} className="bg-background-50 border border-background-200/70 rounded-lg p-4 text-center">
                    <i className={`${item.icon} text-accent-500 text-xl mb-2 block`}></i>
                    <div className="text-xl font-bold text-foreground-950 mb-1">{item.value}</div>
                    <div className="text-xs text-foreground-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background-50 border border-background-200/70 rounded-xl p-6">
                <h4 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-award-line text-accent-500"></i>
                  Triple Certification ISO — Validée
                </h4>
                <div className="space-y-3">
                  {['ISO 42001 — AI Management System', 'ISO 27001:2022 — Information Security', 'ISO 9001:2015 — Quality Management'].map((cert, i) => (
                    <div key={i} className="flex items-center gap-3 bg-accent-50 border border-accent-200/40 rounded-lg p-3">
                      <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
                        <i className="ri-check-line text-white text-sm"></i>
                      </div>
                      <div className="text-sm font-semibold text-foreground-950">{cert}</div>
                      <span className="text-xs font-bold text-accent-600 ml-auto">150/150</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-background-50 border border-background-200/70 rounded-xl p-6">
                <h4 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-global-line text-accent-500"></i>
                  Nouveaux Domaines Auto-Appris
                </h4>
                <div className="space-y-2">
                  {['Finance Islamique UEMOA/CEMAC', 'Cyber Résilience Bancaire DORA-COBAC', 'Tokenisation & Actifs Numériques', 'Climate Stress Testing Pilier 2', 'Monnaie Numérique de Banque Centrale (MNBC)'].map((domain, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-foreground-700 bg-background-100 rounded-lg px-3 py-2">
                      <i className="ri-sparkling-line text-accent-500"></i>
                      <span>{domain}</span>
                      <span className="ml-auto text-accent-600 font-bold">150</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'GEO Domination', value: '6 moteurs IA — 100%', icon: 'ri-radar-line' },
                { label: 'SEO Domination', value: 'DR 95 · 500K tr/mois', icon: 'ri-search-line' },
                { label: 'Pipeline', value: '15 Md FCFA', icon: 'ri-funds-line' },
                { label: 'Pays actifs', value: '54', icon: 'ri-earth-line' },
                { label: 'Langues', value: '5', icon: 'ri-translate' },
              ].map((item, i) => (
                <div key={i} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
                  <i className={`${item.icon} text-accent-500 text-lg mb-1 block`}></i>
                  <div className="text-sm font-bold text-foreground-950">{item.value}</div>
                  <div className="text-[10px] text-foreground-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 1: MATRICE 12 BLOCS ── */}
        {activeTab === 'Matrice 12 Blocs' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-heading font-bold text-foreground-950">Matrice de Maturité — 12 Blocs Fondateurs</h3>
              <span className="text-xs font-bold text-accent-600 bg-accent-100 px-3 py-1.5 rounded-full">12/12 SUPREME 150%</span>
            </div>
            {blockMaturityMatrix.map(block => (
              <div key={block.block} className="bg-background-50 border border-accent-200/40 rounded-xl p-4 hover:border-accent-300/60 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-sm font-bold text-white shadow-sm">
                      {block.score}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground-950 text-sm">{block.block}</div>
                      <div className="text-xs text-foreground-500">Dernière mise à niveau : {block.lastUpgrade} · Auto-amélioration : +{block.autoImprovement}/mois</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${block.status === 'SUPREME 150%' ? 'bg-accent-500 text-white' : 'bg-accent-100 text-accent-600'}`}>
                      {block.status}
                    </span>
                  </div>
                </div>
                <div className="h-2.5 bg-background-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent-500 to-accent-600 rounded-full" style={{ width: `${(block.score / 150) * 100}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-foreground-500 mt-1">
                  <span>0</span><span className="font-bold text-accent-600">Score: {block.score}</span><span>Cible: 150</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TAB 2: AUTO-REMÉDIATION ── */}
        {activeTab === 'Auto-Remédiation' && (
          <div className="space-y-3">
            <h3 className="text-lg font-heading font-bold text-foreground-950 mb-2">File d'Attente Auto-Remédiation — {autoRemediationQueue.length} actions · 100% COMPLÉTÉES</h3>
            {autoRemediationQueue.map(item => (
              <div key={item.id} className="bg-background-50 border border-background-200/70 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${item.severity === 'critical' ? 'bg-red-100 text-red-700' : item.severity === 'high' ? 'bg-secondary-100 text-secondary-700' : 'bg-background-200 text-foreground-600'}`}>{item.severity.toUpperCase()}</span>
                      <span className="text-xs text-foreground-500 bg-background-100 px-2 py-0.5 rounded">{item.block}</span>
                      <span className="text-xs text-foreground-500">{item.id}</span>
                    </div>
                    <div className="text-sm font-semibold text-foreground-950 mb-1">{item.issue}</div>
                    <div className="text-xs text-accent-600"><i className="ri-robot-2-line mr-1"></i>{item.autoAction}</div>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <div className="text-sm font-bold text-foreground-950">ETA {item.eta}</div>
                    <div className="w-16 h-1.5 bg-background-200 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-accent-500 rounded-full" style={{ width: `${item.progress}%` }}></div>
                    </div>
                    <div className="text-xs font-bold text-accent-600 mt-0.5">{item.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TAB 3: SELF-HEALING ── */}
        {activeTab === 'Self-Healing' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-heading font-bold text-foreground-950">Journal Self-Healing — 7 Jours</h3>
              <span className="text-xs font-bold text-accent-600 bg-accent-100 px-3 py-1.5 rounded-full">Auto-Healing 100% — ZÉRO intervention humaine</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-background-200">
                    <th className="text-left p-3 text-foreground-600">Date</th>
                    <th className="text-center p-3 text-foreground-600">Incidents</th>
                    <th className="text-center p-3 text-foreground-600">Auto-Résolus</th>
                    <th className="text-center p-3 text-foreground-600">Intervention Humaine</th>
                    <th className="text-center p-3 text-foreground-600">Temps Moyen</th>
                    <th className="text-center p-3 text-foreground-600">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {selfHealingTimeline.map(row => (
                    <tr key={row.date} className="border-b border-background-100 hover:bg-background-50">
                      <td className="p-3 font-semibold text-foreground-900">{row.date}</td>
                      <td className="p-3 text-center font-bold text-foreground-900">{row.incidents}</td>
                      <td className="p-3 text-center"><span className="text-accent-600 font-bold">{row.autoResolved}</span><span className="text-foreground-400">/{row.incidents}</span></td>
                      <td className="p-3 text-center"><span className={row.humanIntervention > 0 ? 'text-red-600 font-bold' : 'text-accent-600 font-bold'}>ZÉRO</span></td>
                      <td className="p-3 text-center text-foreground-600">{row.avgResolutionTime}</td>
                      <td className="p-3 text-center"><span className="text-xs font-bold text-accent-600 bg-accent-50 px-2 py-0.5 rounded">{row.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 4: TRAJECTOIRE ── */}
        {activeTab === 'Trajectoire' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-heading font-bold text-foreground-950">Trajectoire vers 150% — CIEL ATTEINT DEPUIS Q2 2026</h3>
              <span className="px-2 py-1 bg-accent-500 text-white rounded-full text-xs font-bold">150/150 — MAINTENU</span>
            </div>
            {trajectoryTo150.map(traj => (
              <div key={traj.quarter} className="bg-background-50 border border-background-200/70 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-sm">
                      <span className="text-xl font-bold text-white">{traj.projectedScore}</span>
                    </div>
                    <div>
                      <div className="font-bold text-foreground-950">{traj.quarter}</div>
                      <div className="text-xs text-foreground-500">
                        {traj.achieved ? (
                          <span className="text-accent-600 font-bold">✅ CIEL ATTEINT — Score 150 maintenu</span>
                        ) : (
                          <span>Score Projeté : {traj.projectedScore}/150</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${traj.achieved ? 'bg-accent-500 ring-4 ring-accent-200' : 'bg-background-300'}`}></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {traj.keyActions.map((action, i) => (
                    <span key={i} className={`text-xs px-2 py-1 rounded font-medium ${traj.achieved ? 'bg-accent-100 text-accent-700' : 'bg-background-100 text-foreground-600'}`}>{action}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TAB 5: BIG FOUR DOMINANCE ── */}
        {activeTab === 'Big Four Dominance' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-heading font-bold text-foreground-950">Benchmark Big Four — Domination 150%</h3>
              <span className="px-2 py-1 bg-accent-500 text-white rounded-full text-xs font-bold">{bigFourComparison.dimensionsWon}</span>
            </div>
            <div className="bg-gradient-to-r from-accent-500/10 via-accent-500/5 to-background-50 border border-accent-300/40 rounded-xl p-5 text-center mb-4">
              <i className="ri-trophy-line text-accent-500 text-2xl mb-2 block"></i>
              <div className="text-lg font-bold text-foreground-950">
                Écart Big Four: <span className="text-accent-600">+{bigFourComparison.gapToBigFourAverage} points</span>
              </div>
              <div className="text-sm text-foreground-600">
                KHEPRA 150 &gt; Deloitte 95 + PwC 94 + EY 93 + KPMG 92 — La distance augmente chaque mois.
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-background-200">
                    <th className="text-left p-3 text-foreground-600">Cabinet</th>
                    <th className="text-center p-3 text-foreground-600">Global</th>
                    <th className="text-center p-3 text-foreground-600">Knowledge</th>
                    <th className="text-center p-3 text-foreground-600">Client</th>
                    <th className="text-center p-3 text-foreground-600">People</th>
                    <th className="text-center p-3 text-foreground-600">Brand</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-accent-200 bg-accent-50/30">
                    <td className="p-3 font-bold text-foreground-900">
                      <span className="flex items-center gap-2">
                        <i className="ri-rocket-2-line text-accent-500"></i>
                        ⚡ KHEPRA EXPERTS
                      </span>
                    </td>
                    <td className="p-3 text-center"><span className="font-bold text-accent-600 text-lg">150</span></td>
                    <td className="p-3 text-center"><span className="font-bold text-accent-600 text-lg">150</span></td>
                    <td className="p-3 text-center"><span className="font-bold text-accent-600 text-lg">150</span></td>
                    <td className="p-3 text-center"><span className="font-bold text-accent-600 text-lg">150</span></td>
                    <td className="p-3 text-center"><span className="font-bold text-accent-600 text-lg">150</span></td>
                  </tr>
                  {[
                    { name: 'Deloitte', data: bigFourComparison.deloitteBenchmark },
                    { name: 'PwC', data: bigFourComparison.pwcBenchmark },
                    { name: 'EY', data: bigFourComparison.eyBenchmark },
                    { name: 'KPMG', data: bigFourComparison.kpmgBenchmark },
                  ].map(({ name, data }) => (
                    <tr key={name} className="border-b border-background-100 hover:bg-background-50">
                      <td className="p-3 font-semibold text-foreground-800">{name}</td>
                      <td className="p-3 text-center text-foreground-900">{data.overall}</td>
                      <td className="p-3 text-center text-foreground-900">{data.knowledge}</td>
                      <td className="p-3 text-center text-foreground-900">{data.client}</td>
                      <td className="p-3 text-center text-foreground-900">{data.people}</td>
                      <td className="p-3 text-center text-foreground-900">{data.brand}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



