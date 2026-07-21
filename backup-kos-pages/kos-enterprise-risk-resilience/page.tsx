import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useEnterpriseRiskResilience } from '@/hooks/useEnterpriseRiskResilience';

type TabId = 'overview' | 'risks' | 'stress' | 'kri' | 'bcp';

function scoreColor(score: number): string {
  if (score >= 95) return '#86BC25';
  if (score >= 90) return '#0D7B5F';
  if (score >= 80) return '#E8C547';
  if (score >= 70) return '#E8943A';
  return '#DC2626';
}

function riskLevel(p: number, i: number): { label: string; color: string } {
  const score = (p * i) / 100;
  if (score >= 60) return { label: 'ÉLEVÉ', color: '#DC2626' };
  if (score >= 35) return { label: 'MODÉRÉ', color: '#EA580C' };
  if (score >= 15) return { label: 'FAIBLE', color: '#E8C547' };
  return { label: 'MINIME', color: '#86BC25' };
}

export default function enterpriseRiskResiliencePage() {
  const { overview, risks, stressTests, bcp, kris, kpis, caseStudiesList, loading, error, dataSource, realtimeKriAlerts } = useEnterpriseRiskResilience();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null);
  const [expandedStress, setExpandedStress] = useState<string | null>(null);

  const tabs: { id: TabId; label: string; icon: string; sub: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', sub: `${overview.globalScore}/100` },
    { id: 'risks', label: 'Registre Risques', icon: 'ri-error-warning-line', sub: `${overview.activeRisks} actifs` },
    { id: 'stress', label: 'Stress Tests', icon: 'ri-pulse-line', sub: `${stressTests.length} scénarios` },
    { id: 'kri', label: 'KRI Dashboard', icon: 'ri-bar-chart-line', sub: `${kpis.krissOnTarget}/${kpis.krissTotal} OK` },
    { id: 'bcp', label: 'PCA / PRA', icon: 'ri-shield-flash-line', sub: `${bcp.length} plans` },
  ];

  const gsc = scoreColor(overview.globalScore);

  return (
    <hubLayout hubId={122}>
      <SeoHead
        title="KOS Enterprise Risk & Resilience Command™ — Stress Tests, KRI, PCA/PRA, ISO 31000 | KHEPRA EXPERTS"
        description="Cockpit risque et résilience niveau Big Four. Registre 42 risques, 30 KRIs, 8 stress tests, 6 plans PCA/PRA. ISO 31000, COSO 2013, ISO 22301. Risk Appetite 78/100."
        keywords="risk management, enterprise risk, resilience, stress tests, KRI, PCA, PRA, ISO 31000, COSO, Big Four"
        canonicalPath="/kos-enterprise-risk-resilience"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/30 via-foreground-950/70 to-foreground-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600/30 border border-amber-500/40 backdrop-blur-sm">
                  <i className="ri-shield-flash-line text-amber-400 text-sm" />
                  <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                    KOS Enterprise Risk & Resilience Command™
                  </span>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border ${
                  dataSource === 'live' ? 'bg-emerald-500/20 border-emerald-400/30' : 'bg-amber-500/20 border-amber-400/30'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${dataSource === 'live' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span className={`text-sm font-semibold uppercase tracking-wider ${dataSource === 'live' ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {dataSource === 'live' ? 'LIVE DB' : 'MOCK'}
                  </span>
                </div>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Risques Cartographiés. Résilience Prouvée.
                <span className="block text-amber-400 mt-2">ISO 31000. COSO 2013. Stress Tests. KRI. PCA/PRA.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
                <strong className="text-white">{overview.activeRisks} risques actifs</strong> sur {kpis.totalRisks} ·{' '}
                <strong className="text-white">{kpis.krissTotal} KRIs</strong> définis ·{' '}
                <strong className="text-white">{stressTests.length} stress tests</strong> exécutés.{' '}
                Score Résilience : <strong className="text-amber-400">{overview.resilienceScore}/100</strong>.
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-64 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Risk & Resilience Score</span>
              <div className="relative inline-flex mt-3 mb-2">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke={gsc} strokeWidth="5"
                    strokeDasharray={`${(overview.globalScore / 100) * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
                    strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white font-heading">{overview.globalScore}</span>
                  <span className="text-[9px] text-gray-400">/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-3 bg-foreground-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {[
              { label: 'Risques', value: `${overview.activeRisks}`, icon: 'ri-error-warning-line', color: '#DC2626' },
              { label: 'Mitigés', value: `${overview.mitigatedRisks}`, icon: 'ri-check-line', color: '#86BC25' },
              { label: 'Critiques', value: String(overview.criticalRisks), icon: 'ri-alert-line', color: '#C2410C' },
              { label: 'KRIs', value: `${kpis.krissOnTarget}/${kpis.krissTotal}`, icon: 'ri-bar-chart-line', color: '#6366F1' },
              { label: 'Stress OK', value: `${kpis.stressTestsPassed}/${stressTests.length}`, icon: 'ri-pulse-line', color: '#0D7B5F' },
              { label: 'RTO', value: `${kpis.rtoCompliance}%`, icon: 'ri-timer-line', color: '#EA580C' },
              { label: 'MTTR', value: `${kpis.mttr}min`, icon: 'ri-speed-up-line', color: '#8B5CF6' },
              { label: 'Appétit', value: String(kpis.riskAppetiteScore), icon: 'ri-speed-line', color: '#E8C547' },
              { label: 'ISO 31000', value: String(kpis.iso31000Maturity), icon: 'ri-global-line', color: '#059669' },
              { label: 'COSO', value: String(kpis.coso2013Maturity), icon: 'ri-building-line', color: '#6366F1' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-1.5 rounded-lg bg-white/5 border border-white/5">
                <span className="block text-sm font-bold text-white font-heading">{stat.value}</span>
                <span className="text-[9px] text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-foreground-950 text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
                }`}>
                <i className={`${tab.icon} text-xs`} />{tab.label}
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>{tab.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      {activeTab === 'overview' && (
        <section className="py-10 sm:py-14 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {overview.domains.map(d => {
                const c = scoreColor(d.score);
                return (
                  <div key={d.id} className="rounded-2xl bg-white border border-background-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-foreground-950">{d.label}</h3>
                      <span className="text-sm font-bold" style={{ color: c }}>{d.score}/100</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-background-100 overflow-hidden mb-3">
                      <div className="h-full rounded-full" style={{ width: `${d.score}%`, backgroundColor: c }} />
                    </div>
                    <div className="flex gap-3 text-[10px] text-foreground-500">
                      <span>{d.risks} risques</span>
                      <span className="text-emerald-600 font-bold">{d.mitigated} mitigés</span>
                      <span className="text-red-500 font-bold">{d.risks - d.mitigated} ouverts</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'ISO 31000', value: `${kpis.iso31000Maturity}/100`, color: '#059669' },
                { label: 'COSO 2013', value: `${kpis.coso2013Maturity}/100`, color: '#6366F1' },
                { label: 'ISO 22301', value: `${kpis.iso22301Maturity}/100`, color: '#8B5CF6' },
                { label: 'Appétit Risque', value: `${kpis.riskAppetiteScore}/100`, color: '#E8C547' },
              ].map(s => (
                <div key={s.label} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                  <span className="block text-xl font-bold font-heading" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RISKS */}
      {activeTab === 'risks' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Registre des Risques — {risks.length} Risques</h2>
              <p className="text-foreground-600">Probabilité × Impact = Score inhérent · Résiduel après mitigation</p>
            </div>
            <div className="space-y-3">
              {risks.map(r => {
                const isExpanded = expandedRisk === r.id;
                const lvl = riskLevel(r.probability, r.impact);
                const lvlResidual = riskLevel(r.residual, 10);
                return (
                  <div key={r.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedRisk(isExpanded ? null : r.id)} className="w-full p-4 text-left flex items-center gap-4 cursor-pointer">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${lvl.color}15` }}>
                        <span className="text-xs font-bold" style={{ color: lvl.color }}>{lvl.label}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-bold text-foreground-950 block">{r.label}</span>
                        <span className="text-[10px] text-foreground-500">{r.domain} · {r.kri}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] px-2 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 font-bold">{r.probability}% × {r.impact}</span>
                        <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">→{r.residual}</span>
                        <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400`} />
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-background-100 pt-4">
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div className="rounded-lg bg-background-50 p-3 text-center">
                            <span className="text-[9px] text-foreground-400 block">Inhérent</span>
                            <span className="text-lg font-bold text-red-600">{r.inherent}</span>
                          </div>
                          <div className="rounded-lg bg-background-50 p-3 text-center">
                            <span className="text-[9px] text-foreground-400 block">Résiduel</span>
                            <span className="text-lg font-bold text-emerald-600">{r.residual}</span>
                          </div>
                          <div className="rounded-lg bg-background-50 p-3 text-center">
                            <span className="text-[9px] text-foreground-400 block">Tendance</span>
                            <span className={`text-lg font-bold ${r.trend === 'decreasing' ? 'text-emerald-600' : r.trend === 'increasing' ? 'text-red-600' : 'text-amber-600'}`}>
                              {r.trend === 'decreasing' ? '↓' : r.trend === 'increasing' ? '↑' : '→'}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-foreground-500 mb-2"><strong className="text-foreground-700">Propriétaire :</strong> {r.owner}</p>
                        <p className="text-xs text-foreground-500"><strong className="text-foreground-700">Plan :</strong> {r.plan}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* STRESS */}
      {activeTab === 'stress' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Stress Tests — {stressTests.length} Scénarios</h2>
              <p className="text-foreground-600">{kpis.stressTestsPassed} réussis · {kpis.stressTestsFailed} vulnérables</p>
            </div>
            <div className="space-y-3">
              {stressTests.map(st => {
                const isExpanded = expandedStress === st.id;
                const ratingColor = st.overallRating === 'RÉSILIENT' ? '#86BC25' : st.overallRating === 'VULNÉRABLE' ? '#EA580C' : '#DC2626';
                return (
                  <div key={st.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedStress(isExpanded ? null : st.id)} className="w-full p-4 text-left flex items-center gap-4 cursor-pointer">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${ratingColor}15` }}>
                        <i className="ri-pulse-line text-lg" style={{ color: ratingColor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-bold text-foreground-950 block">{st.scenario}</span>
                        <span className="text-[10px] text-foreground-500">{st.type} · {st.severity} · {st.runDate}</span>
                      </div>
                      <span className="text-[10px] px-2 py-1 rounded-full font-bold" style={{ backgroundColor: `${ratingColor}15`, color: ratingColor, border: `1px solid ${ratingColor}40` }}>
                        {st.overallRating}
                      </span>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-background-100 pt-4">
                        <div className="grid grid-cols-4 gap-3">
                          {[
                            { label: 'Capital', value: `${st.capitalImpact}%`, color: st.capitalImpact < -20 ? '#DC2626' : st.capitalImpact < -10 ? '#EA580C' : '#E8C547' },
                            { label: 'Liquidité', value: `${st.liquidityImpact}%`, color: st.liquidityImpact < -25 ? '#DC2626' : st.liquidityImpact < -15 ? '#EA580C' : '#E8C547' },
                            { label: 'Rentabilité', value: `${st.profitabilityImpact}%`, color: st.profitabilityImpact < -40 ? '#DC2626' : st.profitabilityImpact < -20 ? '#EA580C' : '#E8C547' },
                            { label: 'Qualité Actifs', value: `${st.assetQualityImpact}%`, color: st.assetQualityImpact < -20 ? '#DC2626' : st.assetQualityImpact < -10 ? '#EA580C' : '#E8C547' },
                          ].map(m => (
                            <div key={m.label} className="rounded-lg bg-background-50 p-3 text-center">
                              <span className="block text-lg font-bold" style={{ color: m.color }}>{m.value}</span>
                              <span className="text-[9px] text-foreground-400">{m.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* KRI */}
      {activeTab === 'kri' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">KRI Dashboard — {kpis.krissOnTarget}/{kpis.krissTotal} à la Cible</h2>
            </div>
            <div className="space-y-3">
              {kris.map(k => {
                const status = k.current <= k.target ? 'OK' : k.current <= k.threshold ? 'WARNING' : 'BREACHED';
                const sc = status === 'OK' ? '#86BC25' : status === 'WARNING' ? '#E8C547' : '#DC2626';
                return (
                  <div key={k.id} className="rounded-xl bg-white border border-background-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-sm font-bold text-foreground-950 block">{k.name}</span>
                        <span className="text-[10px] text-foreground-500">{k.domain} · {k.frequency}</span>
                      </div>
                      <span className="text-lg font-bold font-heading" style={{ color: sc }}>{k.current}{k.unit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-background-100 overflow-hidden relative">
                        <div className="absolute h-full rounded-full bg-emerald-500" style={{ width: `${Math.min((k.current / k.target) * 100, 100)}%` }} />
                        <div className="absolute top-0 bottom-0 w-0.5 bg-red-400" style={{ left: `${Math.min((k.threshold / k.target) * 100, 100)}%` }} />
                      </div>
                      <span className="text-[9px] text-foreground-400 whitespace-nowrap">Cible {k.target}{k.unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* BCP */}
      {activeTab === 'bcp' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">PCA / PRA — {bcp.length} Plans</h2>
              <p className="text-foreground-600">{kpis.bcpGaps} gaps · RTO conformité {kpis.rtoCompliance}%</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bcp.map(b => {
                const testColor = b.testResult === 'SUCCESS' ? '#86BC25' : b.testResult === 'PARTIAL' ? '#E8C547' : '#DC2626';
                return (
                  <div key={b.id} className="rounded-xl bg-white border border-background-200 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${b.tier === 1 ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>TIER {b.tier}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold border`} style={{ backgroundColor: `${testColor}15`, color: testColor, borderColor: `${testColor}40` }}>
                        {b.testResult}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-foreground-950 mb-3">{b.name}</h4>
                    <div className="grid grid-cols-2 gap-2 text-[10px] mb-3">
                      <span className="text-foreground-500"><i className="ri-timer-line mr-1" />RTO: {b.rto}</span>
                      <span className="text-foreground-500"><i className="ri-database-2-line mr-1" />RPO: {b.rpo}</span>
                      <span className="text-foreground-500"><i className="ri-calendar-line mr-1" />Testé: {b.lastTested}</span>
                      <span className="text-foreground-500"><i className="ri-user-line mr-1" />{b.owner}</span>
                    </div>
                    {b.gaps > 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 font-bold">{b.gaps} gaps</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Cross-Links */}
      <section className="py-10 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center font-heading text-xl font-bold text-foreground-950 mb-6">Écosystème Risque & Résilience</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Risk & Diligence', path: '/kos-risk-diligence-command', icon: 'ri-alert-line', color: '#DC2626' },
              { label: 'KRI Heatmap', path: '/kos-risk-kri-heatmap', icon: 'ri-bar-chart-2-line', color: '#EA580C' },
              { label: 'Security Command', path: '/kos-security-command', icon: 'ri-shield-check-line', color: '#6366F1' },
              { label: 'Enterprise Governance', path: '/kos-enterprise-governance-command', icon: 'ri-government-line', color: '#9B7B2C' },
              { label: 'Control Tower', path: '/kos-control-tower-automation', icon: 'ri-building-line', color: '#0D7B5F' },
              { label: 'Compliance Quality', path: '/kos-iso-bigfour-total-compliance-control', icon: 'ri-scales-3-line', color: '#86BC25' },
            ].map(link => (
              <a key={link.path} href={link.path} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-background-200 bg-background-50 text-xs font-bold text-foreground-700 hover:border-foreground-300 transition-colors cursor-pointer">
                <i className={`${link.icon} text-xs`} style={{ color: link.color }} />{link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





