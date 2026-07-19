import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useAISovereigntyEthics } from '@/hooks/useAISovereigntyEthics';

type TabId = 'overview' | 'agents' | 'ethics' | 'sovereignty' | 'hallucinations' | 'roadmap';

function statusColor(score: number): string {
  if (score >= 95) return '#86BC25';
  if (score >= 85) return '#0D7B5F';
  if (score >= 75) return '#E8C547';
  if (score >= 65) return '#E8943A';
  return '#DC2626';
}

export default function aISovereigntyEthicsPage() {
  const { overview, agents, reviews, sovereignty, hallucinations, roadmap, kpis, loading, error, dataSource } = useAISovereigntyEthics();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  const tabs: { id: TabId; label: string; icon: string; sub: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', sub: `${overview.globalScore}/100` },
    { id: 'agents', label: 'Agents IA', icon: 'ri-robot-line', sub: `${agents.length} agents` },
    { id: 'ethics', label: 'Revues Éthiques', icon: 'ri-scales-3-line', sub: `${kpis.ethicsReviewsCompleted}/${reviews.length}` },
    { id: 'sovereignty', label: 'Souveraineté', icon: 'ri-shield-star-line', sub: `${overview.sovereignIndex}/100` },
    { id: 'hallucinations', label: 'Anti-Hallucination', icon: 'ri-brain-line', sub: `${kpis.hallucinations36m} en 36m` },
    { id: 'roadmap', label: 'Roadmap', icon: 'ri-road-map-line', sub: `${roadmap.filter(r => r.status === 'Complété').length}/${roadmap.length}` },
  ];

  const gsc = statusColor(overview.globalScore);

  return (
    <hubLayout hubId={124}>
      <SeoHead
        title="KOS AI Sovereignty & Autonomous Governance™ — ISO 42001, EU AI Act, Anti-Hallucination | KHEPRA EXPERTS"
        description="Gouvernance IA autonome et souveraineté. 75 agents enregistrés, ISO 42001 84%, EU AI Act 78%. Anti-hallucination : 0 en 36 mois. Souveraineté locale TF-IDF + Cosine Similarity."
        keywords="AI sovereignty, AI governance, ISO 42001, EU AI Act, anti-hallucination, gouvernance IA, éthique IA"
        canonicalPath="/kos-ai-sovereignty-ethics"
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/30 border border-indigo-500/40 backdrop-blur-sm">
                  <i className="ri-robot-line text-indigo-400 text-sm" />
                  <span className="text-sm font-semibold text-indigo-300 uppercase tracking-wider">
                    KOS AI Sovereignty & Autonomous Governance™
                  </span>
                </div>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                IA Souveraine. Éthique. Vérifiable.
                <span className="block text-indigo-400 mt-2">ISO 42001. EU AI Act. Zéro Hallucination.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
                <strong className="text-white">{overview.agentsSupraOptimaux}/{overview.agentsRegistered} agents Supra-Optimaux</strong> ·{' '}
                <strong className="text-white">{overview.agentsCritiques}</strong> agents critiques ·{' '}
                ISO 42001 <strong className="text-indigo-400">{overview.iso42001Maturity}%</strong> ·{' '}
                <strong className="text-white">0 hallucination</strong> en 36 mois.
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-64 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">AI Governance Score</span>
              <div className="text-4xl font-bold text-indigo-400 font-heading mt-3">{overview.globalScore}</div>
              <span className="text-[9px] text-gray-400">/100</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-3 bg-foreground-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-2">
            {[
              { label: 'Agents', value: `${overview.agentsSupraOptimaux}/75`, color: '#86BC25' },
              { label: 'ISO 42001', value: `${overview.iso42001Maturity}%`, color: '#0D7B5F' },
              { label: 'EU AI Act', value: `${overview.euAiActCompliance}%`, color: '#6366F1' },
              { label: 'Souveraineté', value: `${overview.sovereignIndex}%`, color: '#E8C547' },
              { label: 'Hallucinations', value: '0', color: '#86BC25' },
              { label: 'Temps Correct', value: `${kpis.meanTimeToCorrect}h`, color: '#EA580C' },
              { label: 'Vérification', value: `${kpis.verificationRate}%`, color: '#8B5CF6' },
              { label: 'RPO Local', value: kpis.resilienceRPO < 60 ? '< 1h' : `${kpis.resilienceRPO}min`, color: '#059669' },
            ].map((s, i) => (
              <div key={i} className="text-center py-1.5 rounded-lg bg-white/5 border border-white/5">
                <span className="block text-sm font-bold text-white font-heading">{s.value}</span>
                <span className="text-[9px] text-gray-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-foreground-950 text-white' : 'bg-background-50 border border-background-200 text-foreground-600'
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
        <section className="py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Agents Supra-Optimaux', value: `${overview.agentsSupraOptimaux}/75`, color: '#86BC25' },
                { label: 'ISO 42001 Maturité', value: `${overview.iso42001Maturity}%`, color: '#0D7B5F' },
                { label: 'EU AI Act', value: `${overview.euAiActCompliance}%`, color: '#6366F1' },
                { label: 'Souveraineté', value: `${overview.sovereignIndex}%`, color: '#E8C547' },
              ].map(s => (
                <div key={s.label} className="rounded-xl bg-white border border-background-200 p-5 text-center">
                  <span className="block text-2xl font-bold font-heading" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AGENTS */}
      {activeTab === 'agents' && (
        <section className="py-8 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">{agents.length} Agents Gouvernés</h2>
            </div>
            <div className="space-y-3">
              {agents.map(a => {
                const isExpanded = expandedAgent === a.id;
                const sc = statusColor(a.complianceScore);
                const riskColor = a.risk === 'Élevé' ? '#DC2626' : a.risk === 'Moyen' ? '#EA580C' : '#86BC25';
                return (
                  <div key={a.id} className={`rounded-xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white'}`}>
                    <button onClick={() => setExpandedAgent(isExpanded ? null : a.id)} className="w-full p-4 text-left flex items-center gap-4 cursor-pointer">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${sc}15` }}>
                        <i className="ri-robot-line text-lg" style={{ color: sc }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-bold text-foreground-950 block">{a.name}</span>
                        <span className="text-[10px] text-foreground-500">{a.type} · {a.sovereignty} · {a.lastAudit}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-1 rounded-full font-bold" style={{ backgroundColor: `${riskColor}15`, color: riskColor, border: `1px solid ${riskColor}40` }}>{a.risk}</span>
                        <span className="text-sm font-bold" style={{ color: sc }}>{a.complianceScore}</span>
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-background-100 pt-4">
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="rounded-lg bg-background-50 p-3">
                            <span className="text-[9px] text-foreground-400 block">Compliance</span>
                            <span className="text-lg font-bold" style={{ color: statusColor(a.complianceScore) }}>{a.complianceScore}</span>
                          </div>
                          <div className="rounded-lg bg-background-50 p-3">
                            <span className="text-[9px] text-foreground-400 block">Éthique</span>
                            <span className="text-lg font-bold" style={{ color: statusColor(a.ethicsScore) }}>{a.ethicsScore}</span>
                          </div>
                          <div className="rounded-lg bg-background-50 p-3">
                            <span className="text-[9px] text-foreground-400 block">Statut</span>
                            <span className="text-lg font-bold text-emerald-600">{a.status}</span>
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
      )}

      {/* ETHICS */}
      {activeTab === 'ethics' && (
        <section className="py-8 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Revues Éthiques — {kpis.ethicsReviewsCompleted} complétées</h2>
            </div>
            <div className="space-y-3">
              {reviews.map(r => {
                const sc = statusColor(r.score);
                return (
                  <div key={r.id} className="rounded-xl bg-white border border-background-200 p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${sc}15` }}>
                        <span className="text-xs font-bold" style={{ color: sc }}>{r.score}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-foreground-950">{r.agent}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{r.reviewType}</span>
                        </div>
                        <p className="text-xs text-red-600 mb-1"><strong>Issue :</strong> {r.issue}</p>
                        <p className="text-xs text-emerald-600"><strong>Action :</strong> {r.action}</p>
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-foreground-400">
                          <span>Réviseur : {r.reviewer}</span>
                          <span className={`px-1.5 py-0.5 rounded-full font-bold ${r.status === 'Complété' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{r.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SOVEREIGNTY */}
      {activeTab === 'sovereignty' && (
        <section className="py-8 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Souveraineté — {overview.sovereignIndex}%</h2>
            </div>
            <div className="rounded-2xl bg-white border border-background-200 p-6 mb-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Embeddings Locaux', value: String(sovereignty.embeddingsLocaux), color: '#86BC25' },
                  { label: '% Local', value: `${(sovereignty.pourcentageLocal * 100).toFixed(2)}%`, color: '#DC2626' },
                  { label: 'Cible', value: `${sovereignty.cibleLocal}%`, color: '#6366F1' },
                  { label: 'RPO Local', value: sovereignty.rpoLocal, color: '#0D7B5F' },
                ].map(s => (
                  <div key={s.label} className="rounded-lg bg-background-50 p-3 text-center">
                    <span className="block text-lg font-bold" style={{ color: s.color }}>{s.value}</span>
                    <span className="text-[10px] text-foreground-400">{s.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-foreground-500">
                Vector Store Local : <strong>{sovereignty.vectorStoreLocal}</strong> · Supabase : <strong>{sovereignty.vectorStoreSupabase}</strong>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* HALLUCINATIONS */}
      {activeTab === 'hallucinations' && (
        <section className="py-8 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Anti-Hallucination — {kpis.hallucinations36m} en 36 mois</h2>
            </div>
            <div className="space-y-3">
              {hallucinations.map(h => {
                const sevColor = h.severity === 'Haute' ? '#DC2626' : h.severity === 'Moyenne' ? '#EA580C' : '#E8C547';
                return (
                  <div key={h.id} className="rounded-xl bg-white border border-background-200 p-4">
                    <div className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: sevColor }} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-foreground-950">{h.source}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${sevColor}15`, color: sevColor }}>{h.severity}</span>
                        </div>
                        <p className="text-xs text-foreground-600 mb-1"><strong>Claim :</strong> {h.claim}</p>
                        <p className="text-xs text-emerald-600"><strong>Correction :</strong> {h.correction}</p>
                        <span className="text-[10px] text-foreground-400 mt-1 block">Corrigé le {h.correctedAt}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ROADMAP */}
      {activeTab === 'roadmap' && (
        <section className="py-8 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Roadmap Souveraineté — {roadmap.filter(r => r.status === 'Complété').length}/{roadmap.length} complétés</h2>
            </div>
            <div className="space-y-3">
              {roadmap.map(r => {
                const sc = r.status === 'Complété' ? '#86BC25' : r.status === 'En cours' ? '#E8C547' : '#6366F1';
                return (
                  <div key={r.id} className="rounded-xl bg-white border border-background-200 p-4 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${sc}20`, border: `2px solid ${sc}50` }}>
                      <i className={`text-sm ${r.status === 'Complété' ? 'ri-check-line' : 'ri-time-line'}`} style={{ color: sc }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-bold text-foreground-950 block">{r.milestone}</span>
                      <span className="text-[10px] text-foreground-500">{r.deadline}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-2 rounded-full bg-background-100 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${r.progress}%`, backgroundColor: sc }} />
                      </div>
                      <span className="text-xs font-bold" style={{ color: sc }}>{r.progress}%</span>
                    </div>
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
          <h3 className="text-center font-heading text-xl font-bold text-foreground-950 mb-6">Écosystème IA & Souveraineté</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'AI Governance', path: '/kos-ai-governance-ethics', icon: 'ri-scales-3-line', color: '#6366F1' },
              { label: 'Automaton Engine', path: '/kos-automaton', icon: 'ri-robot-line', color: '#86BC25' },
              { label: 'Enterprise Brain', path: '/kos-enterprise-brain-os', icon: 'ri-brain-line', color: '#8B5CF6' },
              { label: 'Global Agent Scan', path: '/kos-global-agent-performance', icon: 'ri-radar-line', color: '#EA580C' },
              { label: 'AI Compliance', path: '/kos-ai-compliance-fraud-intelligence', icon: 'ri-shield-check-line', color: '#0D7B5F' },
              { label: 'Self Evolution', path: '/kos-self-evolution', icon: 'ri-loop-right-line', color: '#E8C547' },
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



