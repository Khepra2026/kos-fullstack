import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { useKOSAgentAutoDevelopment } from '@/hooks/useKOSAgentAutoDevelopment';
import type { AgentCompetencyProfile, AgentLearningCycle, AgentContinuousDevelopment, AgentSynergyLink, LivePDCACycle } from '@/mocks/kosAgentAutoDevelopment';

type TabId = 'seeding' | 'learning' | 'continuous' | 'synergy';

const TABS: { id: TabId; label: string; icon: string; desc: string }[] = [
  { id: 'seeding', label: 'Seeding Compétences', icon: 'ri-seedling-line', desc: 'Audit Financier · Régulation · ESG · Gouvernance' },
  { id: 'learning', label: 'Auto-Apprentissage', icon: 'ri-brain-line', desc: 'Conseil Stratégique · Intelligence Économique' },
  { id: 'continuous', label: 'Développement Continu', icon: 'ri-loop-left-line', desc: 'Performance · Qualité Totale · ISO · PDCA' },
  { id: 'synergy', label: 'Cross-Agent Synergy', icon: 'ri-node-tree', desc: '8 synergies · Renforcement mutuel' },
];

const DOMAIN_COLORS: Record<string, string> = {
  'Audit Financier': '#4F46E5',
  'Régulation': '#C2410C',
  'ESG': '#0D7B5F',
  'Gouvernance': '#9B7B2C',
  'Conseil Stratégique': '#0891B2',
  'Intelligence Économique': '#7C3AED',
  'Performance': '#DC2626',
  'Qualité Totale': '#059669',
};

const DOMAIN_BG: Record<string, string> = {
  'Audit Financier': 'bg-primary-50 text-primary-700 border-primary-200',
  'Régulation': 'bg-red-50 text-red-700 border-red-200',
  'ESG': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Gouvernance': 'bg-amber-50 text-amber-700 border-amber-200',
  'Conseil Stratégique': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Intelligence Économique': 'bg-purple-50 text-purple-700 border-purple-200',
  'Performance': 'bg-rose-50 text-rose-700 border-rose-200',
  'Qualité Totale': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export default function KOSAgentAutoDevelopmentPage() {
  const [activeTab, setActiveTab] = useState<TabId>('seeding');
  const engine = useKOSAgentAutoDevelopment();

  return (
    <KOSHubLayout hubId={119}>
      <SeoHead
        title="KOS Agent Auto-Development™ — Auto-Développement des Agents KHEPRA EXPERTS"
        description="Programme d'auto-développement des agents KOS. 3 axes : Seeding de compétences (Audit, Régulation, ESG, Gouvernance), Auto-Apprentissage (Conseil Stratégique, Intelligence Économique), Développement Continu (Performance, Qualité Totale)."
        keywords="KOS auto-développement agents, seeding compétences IA, auto-apprentissage agents, développement continu qualité, KHEPRA EXPERTS Big Four"
        canonicalPath="/kos-agent-auto-development"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-32 pb-10 sm:pt-40 sm:pb-14 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20visualization%20of%20autonomous%20AI%20agents%20learning%20and%20evolving%20interconnected%20neural%20pathways%20with%20glowing%20golden%20and%20teal%20energy%20flows%20dark%20technological%20background%20self-developing%20artificial%20intelligence%20systems%20with%20organic%20growth%20patterns%20cinematic%20volumetric%20lighting%20ultra%20detailed%20no%20text%20no%20human%20figures&width=1920&height=700&seq=kos-agent-auto-dev-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-12"
            width="1920"
            height="700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/30 via-foreground-950/60 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 border border-primary-400/30 backdrop-blur-sm">
              <i className="ri-seedling-line text-primary-400 text-sm" />
              <span className="text-sm font-semibold text-primary-300 uppercase tracking-wider">AXE 1 — SEEDING</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 border border-accent-400/30 backdrop-blur-sm">
              <i className="ri-brain-line text-accent-400 text-sm" />
              <span className="text-sm font-semibold text-accent-300 uppercase tracking-wider">AXE 2 — AUTO-APPRENTISSAGE</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
              <i className="ri-loop-left-line text-emerald-400 text-sm" />
              <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">AXE 3 — DÉVELOPPEMENT CONTINU</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
              <i className="ri-node-tree text-amber-400 text-sm" />
              <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">AXE 4 — CROSS-AGENT SYNERGY</span>
            </div>
            {engine.isLive && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">LIVE — SUPABASE</span>
              </div>
            )}
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Les agents KOS s'auto-développent.
            <span className="block text-primary-400 mt-2">Seeding × Apprentissage × Amélioration Continue × Synergie.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6 max-w-3xl">
            <strong className="text-white">AXE 1</strong> — Les agents reçoivent des compétences certifiées Big Four en Audit Financier, Régulation, ESG et Gouvernance.{' '}
            <strong className="text-white">AXE 2</strong> — Auto-apprentissage continu en Conseil Stratégique et Intelligence Économique via cycles de feedback.{' '}
            <strong className="text-white">AXE 3</strong> — Développement continu selon les normes ISO et les standards de performance mondiale.{' '}
            <strong className="text-white">AXE 4</strong> — Synergie cross-agent : les agents s'enrichissent mutuellement, créant un écosystème d'intelligence collective.
          </p>
        </div>
      </section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <section className="py-3 bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {engine.loading && (
            <div className="flex items-center justify-center gap-2 mb-2 text-xs text-foreground-400">
              <i className="ri-loader-4-line animate-spin" />
              <span>Connexion Supabase...</span>
            </div>
          )}
          {engine.error && (
            <div className="flex items-center justify-center gap-2 mb-2 text-xs text-red-500">
              <i className="ri-error-warning-line" />
              <span>{engine.error}</span>
              <button onClick={engine.refetch} className="underline cursor-pointer hover:text-red-700">Réessayer</button>
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-10 gap-2">
            {[
              { label: 'Agents Seedés', value: engine.stats.totalAgentsSeeded, icon: 'ri-seedling-line', color: 'text-primary-500' },
              { label: 'Compétences', value: `${engine.stats.competenciesMastered}/${engine.stats.totalCompetencies}`, icon: 'ri-award-line', color: 'text-accent-500' },
              { label: 'Score Moyen', value: `${engine.stats.avgCompetencyScore}%`, icon: 'ri-medal-line', color: 'text-secondary-500' },
              { label: 'Cycles App.', value: engine.stats.totalLearningCycles, icon: 'ri-loop-left-line', color: 'text-cyan-500' },
              { label: 'Connaissances', value: `${(engine.stats.totalKnowledgeAbsorbed / 1000).toFixed(0)}k`, icon: 'ri-book-open-line', color: 'text-purple-500' },
              { label: 'Gain Perf.', value: `+${engine.stats.avgPerformanceGain}%`, icon: 'ri-arrow-up-line', color: 'text-emerald-500' },
              { label: 'Score Qualité', value: `${engine.stats.avgQualityScore}%`, icon: 'ri-shield-check-line', color: 'text-rose-500' },
              { label: 'ISO Déployés', value: engine.stats.isoStandardsDeployed, icon: 'ri-verified-badge-line', color: 'text-foreground-600' },
              { label: 'Synergies', value: `${engine.synergyStats.activeSynergies}/${engine.synergyStats.totalSynergies}`, icon: 'ri-node-tree', color: 'text-amber-500' },
              { label: 'Gain Croisé', value: `+${engine.synergyStats.cumulativeQualityGain}%`, icon: 'ri-exchange-line', color: 'text-orange-500' },
            ].map((s, i) => (
              <div key={i} className="text-center py-1.5 rounded-lg bg-white border border-background-100">
                <i className={`${s.icon} ${s.color} text-xs mb-0.5 block`} />
                <span className="block text-base font-bold text-foreground-950 font-heading">{s.value}</span>
                <span className="text-[9px] text-foreground-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TABS ═══════════ */}
      <div className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-white'
                    : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
                }`}
              >
                <i className={`${tab.icon} text-base`} />
                <div className="text-left">
                  <div>{tab.label}</div>
                  <div className="text-[9px] opacity-60 font-normal">{tab.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ TAB CONTENT ═══════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'seeding' && <SeedingTab engine={engine} />}
        {activeTab === 'learning' && <LearningTab engine={engine} />}
        {activeTab === 'continuous' && <ContinuousTab engine={engine} />}
        {activeTab === 'synergy' && <SynergyTab engine={engine} />}
      </div>

      {/* ═══════════ CROSS-LINKS ═══════════ */}
      <section className="py-12 bg-background-50 border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="font-heading text-xl font-bold text-foreground-950 mb-1">Écosystème Agent KOS</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Self-Evolution', path: '/kos-self-evolution', icon: 'ri-loop-left-line', color: '#F59E0B' },
              { label: 'Auto-Learning', path: '/kos-auto-learning-agentic', icon: 'ri-brain-line', color: '#8B5CF6' },
              { label: 'Global Agents', path: '/kos-global-agent-performance', icon: 'ri-radar-line', color: '#14B8A6' },
              { label: 'Multi-Agent', path: '/kos-multi-agent-orchestration', icon: 'ri-robot-2-line', color: '#6366F1' },
              { label: 'Quality Innovation', path: '/kos-quality-innovation', icon: 'ri-shield-check-line', color: '#059669' },
              { label: 'Enterprise Brain', path: '/kos-enterprise-brain-os', icon: 'ri-shake-hands-line', color: '#DC2626' },
            ].map(link => (
              <a key={link.path} href={link.path} className="rounded-xl border border-background-200 bg-white p-4 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-xs font-bold text-foreground-800">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}

// ═══════════════════════════════════════════════
// AXE 1 — SEEDING DE COMPÉTENCES
// ═══════════════════════════════════════════════

function SeedingTab({ engine }: { engine: ReturnType<typeof useKOSAgentAutoDevelopment> }) {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="bg-gradient-to-r from-primary-50 to-background-50 border border-primary-200/50 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
              <i className="ri-seedling-line text-primary-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Principe du Seeding</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Chaque agent KOS reçoit un <strong className="text-foreground-800">package de compétences certifiées</strong> dans son domaine d'expertise. Ces compétences sont issues des standards Big Four (ISA, COSO, IFRS), des corpus réglementaires (BCEAO, COBAC, GAFI, OHADA), des normes ESG (ISSB, GRI) et des cadres de gouvernance internationaux (G20/OCDE, ISO 37000).
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Agents Grid */}
      <div className="space-y-5">
        {engine.competencyProfiles.map(profile => (
          <ScrollReveal key={profile.agentId}>
            <div className="bg-white border border-background-200 rounded-2xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${DOMAIN_COLORS[profile.domain]}15` }}>
                      <i className={`text-2xl ${
                        profile.domain === 'Audit Financier' ? 'ri-search-line text-primary-500' :
                        profile.domain === 'Régulation' ? 'ri-scales-3-line text-red-500' :
                        profile.domain === 'ESG' ? 'ri-seedling-line text-emerald-500' :
                        'ri-government-line text-amber-500'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-heading text-lg font-bold text-foreground-950">{profile.agentName}</h3>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${DOMAIN_BG[profile.domain]}`}>{profile.domain}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          profile.seedingStatus === 'seeded' ? 'bg-emerald-100 text-emerald-700' :
                          profile.seedingStatus === 'in_progress' ? 'bg-amber-100 text-amber-700' : 'bg-background-100 text-foreground-500'
                        }`}>
                          {profile.seedingStatus === 'seeded' ? 'SEEDÉ' : profile.seedingStatus === 'in_progress' ? 'EN COURS' : 'EN ATTENTE'}
                        </span>
                      </div>
                      <p className="text-xs text-foreground-500">Certification : {profile.certificationPath}</p>
                      <p className="text-xs text-foreground-400 mt-0.5">Dernier seeding : {profile.lastSeeded}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="w-20 h-20 relative">
                      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="34" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                        <circle cx="40" cy="40" r="34" fill="none" stroke={DOMAIN_COLORS[profile.domain]} strokeWidth="6"
                          strokeDasharray={`${(profile.currentLevel / 100) * 214} 214`} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-lg font-bold text-foreground-950 font-heading">{profile.currentLevel}</span>
                        <span className="text-[9px] text-foreground-400">/ {profile.targetLevel}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Competency bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-foreground-500">Niveau de maîtrise</span>
                    <span className="font-bold text-foreground-950">{profile.currentLevel}% / {profile.targetLevel}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-background-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{
                      width: `${(profile.currentLevel / profile.targetLevel) * 100}%`,
                      backgroundColor: DOMAIN_COLORS[profile.domain],
                    }} />
                  </div>
                </div>

                <button
                  onClick={() => setExpandedAgent(expandedAgent === profile.agentId ? null : profile.agentId)}
                  className="text-xs font-bold text-foreground-500 hover:text-foreground-800 cursor-pointer transition-colors flex items-center gap-1"
                >
                  {expandedAgent === profile.agentId ? (
                    <><i className="ri-arrow-up-s-line" /> Masquer les compétences</>
                  ) : (
                    <><i className="ri-arrow-down-s-line" /> Voir les {profile.competencies.length} compétences ({profile.competencies.filter(c => c.mastered).length} maîtrisées)</>
                  )}
                </button>

                {expandedAgent === profile.agentId && (
                  <div className="mt-4 pt-4 border-t border-background-100 space-y-3">
                    {profile.competencies.map(comp => (
                      <div key={comp.name} className="flex items-center gap-3 p-3 rounded-xl bg-background-50 border border-background-100">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          comp.mastered ? 'bg-emerald-100 text-emerald-600' : 'bg-background-200 text-foreground-400'
                        }`}>
                          <i className={`${comp.mastered ? 'ri-check-double-line' : 'ri-time-line'} text-sm`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-semibold text-foreground-800">{comp.name}</span>
                            <span className="text-xs font-bold text-foreground-950">{comp.score}%</span>
                          </div>
                          <p className="text-xs text-foreground-500">{comp.description}</p>
                          <div className="w-full h-1.5 bg-background-200 rounded-full mt-1 overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{
                              width: `${comp.score}%`,
                              backgroundColor: comp.mastered ? '#10B981' : DOMAIN_COLORS[profile.domain],
                            }} />
                          </div>
                        </div>
                        {!comp.mastered && (
                          <button
                            onClick={() => engine.seedCompetency(profile.agentId, comp.name)}
                            className="px-3 py-1.5 rounded-lg bg-primary-500 text-white text-xs font-bold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
                          >
                            <i className="ri-seedling-line mr-1" />Seeder
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// AXE 2 — AUTO-APPRENTISSAGE
// ═══════════════════════════════════════════════

function LearningTab({ engine }: { engine: ReturnType<typeof useKOSAgentAutoDevelopment> }) {
  const [expandedMetrics, setExpandedMetrics] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="bg-gradient-to-r from-accent-50 to-background-50 border border-accent-200/50 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
              <i className="ri-brain-line text-accent-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Mécanisme d'Auto-Apprentissage</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Les agents exécutent des <strong className="text-foreground-800">cycles d'apprentissage autonomes</strong> : ils absorbent la connaissance du Knowledge Repository, découvrent des patterns d'exécution, et améliorent leurs compétences sans intervention humaine. Chaque cycle produit un gain de performance mesurable.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Self-Learning Metrics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {engine.selfLearningMetrics.map(metrics => (
          <ScrollReveal key={metrics.agentId}>
            <div className="bg-white border border-background-200 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${DOMAIN_COLORS[metrics.domain]}15` }}>
                    <i className={`text-xl ${metrics.domain === 'Conseil Stratégique' ? 'ri-lightbulb-flash-line text-cyan-500' : 'ri-radar-line text-purple-500'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading text-base font-bold text-foreground-950">{metrics.agentName}</h3>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${DOMAIN_BG[metrics.domain]}`}>{metrics.domain}</span>
                    </div>
                    <p className="text-xs text-foreground-500">Prochain jalon : {metrics.nextMilestone}</p>
                  </div>
                </div>
                <button
                  onClick={() => engine.triggerLearningCycle(metrics.agentId)}
                  className="px-4 py-2 rounded-full bg-accent-500 text-white text-xs font-bold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-play-circle-line mr-1" />Lancer Cycle {metrics.totalCycles + 1}
                </button>
              </div>

              {/* Autonomy gauge */}
              <div className="mb-5">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground-500">Niveau d'Autonomie</span>
                  <span className="font-bold text-foreground-950">{metrics.currentAutonomyLevel}%</span>
                </div>
                <div className="w-full h-3 bg-background-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{
                    width: `${metrics.currentAutonomyLevel}%`,
                    backgroundColor: DOMAIN_COLORS[metrics.domain],
                  }} />
                </div>
              </div>

              {/* KPIs grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Cycles', value: metrics.totalCycles, icon: 'ri-loop-left-line' },
                  { label: 'Connaissances/cycle', value: metrics.avgKnowledgePerCycle, icon: 'ri-book-open-line' },
                  { label: 'Patterns', value: metrics.totalPatternsDiscovered, icon: 'ri-bubble-chart-line' },
                ].map(kpi => (
                  <div key={kpi.label} className="bg-background-50 border border-background-100 rounded-xl p-3 text-center">
                    <i className={`${kpi.icon} text-foreground-400 text-sm mb-1 block`} />
                    <span className="block text-base font-bold text-foreground-950 font-heading">{kpi.value.toLocaleString()}</span>
                    <span className="text-[9px] text-foreground-500">{kpi.label}</span>
                  </div>
                ))}
              </div>

              {/* Cumulative gain */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-foreground-500">Gain cumulé :</span>
                <span className="font-bold text-emerald-600">+{metrics.cumulativeGain}%</span>
                <div className="flex-1 h-1.5 bg-background-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(metrics.cumulativeGain, 100)}%` }} />
                </div>
              </div>

              {/* Expand cycles */}
              <button
                onClick={() => setExpandedMetrics(expandedMetrics === metrics.agentId ? null : metrics.agentId)}
                className="text-xs font-bold text-foreground-500 hover:text-foreground-800 cursor-pointer transition-colors mt-3 flex items-center gap-1"
              >
                {expandedMetrics === metrics.agentId ? (
                  <><i className="ri-arrow-up-s-line" /> Masquer l'historique</>
                ) : (
                  <><i className="ri-arrow-down-s-line" /> Historique des cycles</>
                )}
              </button>

              {expandedMetrics === metrics.agentId && (
                <div className="mt-3 pt-3 border-t border-background-100 space-y-2">
                  {engine.getCyclesByAgent(metrics.agentId).filter(c => c.status === 'completed').slice(0, 5).map(cycle => (
                    <div key={cycle.id} className="flex items-center justify-between p-2.5 rounded-lg bg-background-50 border border-background-100 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">{cycle.cycleNumber}</span>
                        <div>
                          <span className="text-foreground-700 font-medium">Cycle {cycle.cycleNumber}</span>
                          <span className="text-foreground-400 ml-2">{new Date(cycle.completedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-foreground-500">{cycle.knowledgeAbsorbed} unités</span>
                        <span className="text-foreground-500">{cycle.patternsDiscovered} patterns</span>
                        <span className="text-emerald-600 font-bold">+{cycle.performanceGain}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Active learning cycles */}
      {engine.activeLearningCycles.length > 0 && (
        <ScrollReveal>
          <div className="bg-accent-50 border border-accent-200/50 rounded-2xl p-5">
            <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent-500 animate-pulse" />
              Cycles d'Apprentissage Actifs
            </h3>
            {engine.activeLearningCycles.map(cycle => (
              <div key={cycle.id} className="flex items-center gap-4 p-3 rounded-xl bg-white border border-accent-100 mb-2 last:mb-0">
                <div className="w-8 h-8 rounded-full border-2 border-accent-400 border-t-transparent animate-spin flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-sm font-semibold text-accent-700">{cycle.agentName}</span>
                  <span className="text-xs text-accent-500 ml-2">Cycle {cycle.cycleNumber} — {cycle.domain}</span>
                </div>
                <span className="text-xs text-accent-600 font-medium">En cours...</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// AXE 3 — DÉVELOPPEMENT CONTINU
// ═══════════════════════════════════════════════

function ContinuousTab({ engine }: { engine: ReturnType<typeof useKOSAgentAutoDevelopment> }) {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="bg-gradient-to-r from-emerald-50 to-background-50 border border-emerald-200/50 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <i className="ri-loop-left-line text-emerald-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Cycle d'Amélioration Continue (PDCA)</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Chaque agent suit un <strong className="text-foreground-800">cycle Plan-Do-Check-Act</strong> intégré aux normes ISO. Les améliorations sont tracées, mesurées et certifiées. La Qualité Totale est atteinte par l'accumulation systématique de micro-améliorations.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* LIVE PDCA Cycles from self_improvement_engine_v2 */}
      {engine.livePDCACycles.length > 0 && (
        <ScrollReveal>
          <div className="bg-gradient-to-r from-amber-50 to-background-50 border border-amber-200/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-heading text-lg font-bold text-foreground-950">
                  Cycles PDCA LIVE — self_improvement_engine_v2
                </h3>
              </div>
              <span className="text-xs text-foreground-400 bg-white px-3 py-1 rounded-full border border-amber-200">
                {engine.livePDCACycles.length} cycles détectés
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {engine.livePDCACycles.map((cycle: LivePDCACycle) => (
                <div key={cycle.id} className="bg-white border border-amber-100 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-foreground-950 mb-0.5">{cycle.improvement_area}</h4>
                      <p className="text-xs text-foreground-500 line-clamp-1">{cycle.improvement_actions}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                      cycle.status?.toLowerCase().includes('complété') ? 'bg-emerald-100 text-emerald-700' :
                      cycle.status?.toLowerCase().includes('en cours') ? 'bg-amber-100 text-amber-700' : 'bg-background-100 text-foreground-500'
                    }`}>
                      {cycle.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-foreground-400 mb-3">
                    <span><i className="ri-calendar-line mr-1" />Dernier cycle : {new Date(cycle.last_cycle).toLocaleDateString('fr-FR')}</span>
                    <span className="text-emerald-600 font-bold">{cycle.progress_pct}% complété</span>
                  </div>
                  {/* Performance gauge */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-foreground-500">Perf</span>
                    <div className="flex-1 h-2 bg-background-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${Math.min(parseFloat(cycle.current_performance) / parseFloat(cycle.target_performance) * 100, 100)}%` }} />
                    </div>
                    <span className="font-bold text-foreground-950">{cycle.current_performance}/{cycle.target_performance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {engine.continuousDevelopment.map(dev => (
          <ScrollReveal key={dev.agentId}>
            <div className="bg-white border border-background-200 rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${DOMAIN_COLORS[dev.dimension]}15` }}>
                  <i className={`text-2xl ${dev.dimension === 'Performance' ? 'ri-speed-up-line text-rose-500' : 'ri-shield-check-line text-emerald-500'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-heading text-lg font-bold text-foreground-950">{dev.agentName}</h3>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${DOMAIN_BG[dev.dimension]}`}>{dev.dimension}</span>
                  </div>
                  <p className="text-xs text-foreground-500 mb-2">
                    Normes : {dev.isoStandards.join(' · ')}
                  </p>
                  {/* Certifications */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {dev.certifications.map(cert => (
                      <span key={cert} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">{cert}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="w-20 h-20 relative">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                      <circle cx="40" cy="40" r="34" fill="none" stroke={DOMAIN_COLORS[dev.dimension]} strokeWidth="6"
                        strokeDasharray={`${(dev.currentScore / 100) * 214} 214`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-bold text-foreground-950 font-heading">{dev.currentScore}</span>
                      <span className="text-[9px] text-foreground-400">/ {dev.targetScore}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly trend mini chart */}
              <div className="mb-5">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground-500">Progression mensuelle</span>
                  <span className="font-bold text-foreground-950">{dev.currentScore}% / {dev.targetScore}% cible</span>
                </div>
                <div className="flex items-end gap-1.5 h-14">
                  {dev.monthlyTrend.map((val, i) => {
                    const heightPct = (val / Math.max(dev.targetScore, ...dev.monthlyTrend)) * 100;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                        <div className="w-full relative" style={{ height: '40px' }}>
                          <div
                            className="absolute bottom-0 w-full rounded-sm transition-all"
                            style={{ height: `${heightPct}%`, backgroundColor: DOMAIN_COLORS[dev.dimension] }}
                          />
                        </div>
                        <span className="text-[8px] text-foreground-400">{['Jan','Fév','Mar','Avr','Mai','Juin'][i]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Improvements list */}
              <div>
                <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3">
                  Actions d'Amélioration ({dev.improvements.filter(i => i.status === 'completed').length}/{dev.improvements.length} complétées)
                </h4>
                <div className="space-y-2">
                  {dev.improvements.map(imp => (
                    <div key={imp.id} className={`flex items-start gap-3 p-3 rounded-xl border ${
                      imp.status === 'completed' ? 'bg-emerald-50 border-emerald-200' :
                      imp.status === 'in_progress' ? 'bg-amber-50 border-amber-200' : 'bg-background-50 border-background-100'
                    }`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        imp.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                        imp.status === 'in_progress' ? 'bg-amber-100 text-amber-600' : 'bg-background-200 text-foreground-400'
                      }`}>
                        <i className={`text-xs ${
                          imp.status === 'completed' ? 'ri-check-line' :
                          imp.status === 'in_progress' ? 'ri-loader-4-line animate-spin' : 'ri-time-line'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-semibold text-foreground-800">{imp.action}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                            imp.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                            imp.status === 'in_progress' ? 'bg-amber-100 text-amber-700' : 'bg-background-100 text-foreground-500'
                          }`}>
                            {imp.status === 'completed' ? 'COMPLÉTÉ' : imp.status === 'in_progress' ? 'EN COURS' : 'PLANIFIÉ'}
                          </span>
                        </div>
                        <p className="text-xs text-foreground-500 mb-1">{imp.impact}</p>
                        <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                          <span>Impact : +{imp.scoreImpact} points</span>
                          <span>Échéance : {imp.completionDate}</span>
                        </div>
                      </div>
                      {imp.status === 'in_progress' && (
                        <button
                          onClick={() => engine.completeImprovement(dev.agentId, imp.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-check-line mr-1" />Valider
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// AXE 4 — CROSS-AGENT SYNERGY
// ═══════════════════════════════════════════════

const SYNERGY_TYPE_CONFIG: Record<string, { label: string; icon: string; color: string; bg: string }> = {
  'knowledge_feed': { label: 'Flux de Connaissance', icon: 'ri-book-read-line', color: '#0891B2', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  'output_input': { label: 'Output → Input', icon: 'ri-arrow-left-right-line', color: '#7C3AED', bg: 'bg-purple-50 text-purple-700 border-purple-200' },
  'validation_loop': { label: 'Boucle de Validation', icon: 'ri-check-double-line', color: '#0D7B5F', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  'escalation': { label: 'Escalade', icon: 'ri-alert-line', color: '#DC2626', bg: 'bg-red-50 text-red-700 border-red-200' },
};

const SYNERGY_DOMAIN_COLORS: Record<string, string> = {
  'Audit Financier': '#4F46E5',
  'Régulation': '#C2410C',
  'ESG': '#0D7B5F',
  'Gouvernance': '#9B7B2C',
  'Conseil Stratégique': '#0891B2',
  'Intelligence Économique': '#7C3AED',
  'Performance': '#DC2626',
  'Qualité Totale': '#059669',
};

function SynergyTab({ engine }: { engine: ReturnType<typeof useKOSAgentAutoDevelopment> }) {
  const [expandedSynergy, setExpandedSynergy] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="bg-gradient-to-r from-amber-50 to-background-50 border border-amber-200/50 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <i className="ri-node-tree text-amber-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground-950 text-sm">Intelligence Collective par Synergie</h3>
              <p className="text-sm text-foreground-600 mt-1">
                Les agents KOS ne fonctionnent pas en silos. Ils forment un <strong className="text-foreground-800">écosystème interconnecté</strong> où chaque agent enrichit les autres via 4 mécanismes : flux de connaissance, output→input, boucle de validation, et escalade. La valeur totale du système dépasse la somme de ses parties.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Synergy Network Map */}
      <ScrollReveal>
        <div className="bg-white border border-background-200 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-bold text-foreground-950 mb-1">Carte du Réseau Synergique</h3>
          <p className="text-xs text-foreground-500 mb-5">8 connexions actives — {engine.activeSynergies.length} actives, {engine.synergyLinks.filter(s => s.status === 'enhancing').length} en renforcement</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {engine.synergyLinks.map(link => {
              const typeConf = SYNERGY_TYPE_CONFIG[link.synergyType];
              const isExpanded = expandedSynergy === link.id;
              return (
                <div key={link.id} className={`rounded-xl border p-4 transition-all ${
                  link.status === 'active' ? 'border-background-200 bg-white' :
                  link.status === 'enhancing' ? 'border-amber-200 bg-amber-50/50' : 'border-background-100 bg-background-50'
                }`}>
                  {/* Source → Target flow */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${SYNERGY_DOMAIN_COLORS[link.sourceDomain]}15` }}>
                          <i className={`text-sm ${
                            link.sourceDomain === 'Audit Financier' ? 'ri-search-line text-primary-500' :
                            link.sourceDomain === 'Régulation' ? 'ri-scales-3-line text-red-500' :
                            link.sourceDomain === 'ESG' ? 'ri-seedling-line text-emerald-500' :
                            link.sourceDomain === 'Gouvernance' ? 'ri-government-line text-amber-500' :
                            link.sourceDomain === 'Conseil Stratégique' ? 'ri-lightbulb-flash-line text-cyan-500' :
                            link.sourceDomain === 'Intelligence Économique' ? 'ri-radar-line text-purple-500' :
                            link.sourceDomain === 'Performance' ? 'ri-speed-up-line text-rose-500' :
                            'ri-shield-check-line text-emerald-500'
                          }`} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-foreground-800">{link.sourceAgentName}</span>
                          <span className="text-[9px] text-foreground-400 ml-1">{link.sourceDomain}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center px-3">
                      <i className={`${typeConf.icon} text-lg`} style={{ color: typeConf.color }} />
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${typeConf.bg}`}>{typeConf.label}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 justify-end">
                        <div>
                          <span className="text-xs font-bold text-foreground-800">{link.targetAgentName}</span>
                          <span className="text-[9px] text-foreground-400 ml-1">{link.targetDomain}</span>
                        </div>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${SYNERGY_DOMAIN_COLORS[link.targetDomain]}15` }}>
                          <i className={`text-sm ${
                            link.targetDomain === 'Audit Financier' ? 'ri-search-line text-primary-500' :
                            link.targetDomain === 'Régulation' ? 'ri-scales-3-line text-red-500' :
                            link.targetDomain === 'ESG' ? 'ri-seedling-line text-emerald-500' :
                            link.targetDomain === 'Gouvernance' ? 'ri-government-line text-amber-500' :
                            link.targetDomain === 'Conseil Stratégique' ? 'ri-lightbulb-flash-line text-cyan-500' :
                            link.targetDomain === 'Intelligence Économique' ? 'ri-radar-line text-purple-500' :
                            link.targetDomain === 'Performance' ? 'ri-speed-up-line text-rose-500' :
                            'ri-shield-check-line text-emerald-500'
                          }`} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KPIs row */}
                  <div className="flex items-center gap-4 mb-2 text-[10px]">
                    <div className="flex items-center gap-1">
                      <span className="text-foreground-400">Impact :</span>
                      <span className="font-bold text-foreground-950">{link.impactScore}/100</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-foreground-400">Gain Qualité :</span>
                      <span className="font-bold text-emerald-600">+{link.qualityGain}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-foreground-400">Métriques :</span>
                      <span className="font-bold text-foreground-950">{link.metricsExchanged.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        link.status === 'active' ? 'bg-emerald-400 animate-pulse' :
                        link.status === 'enhancing' ? 'bg-amber-400' : 'bg-background-400'
                      }`} />
                      <span className="text-foreground-400">{link.status === 'active' ? 'Actif' : link.status === 'enhancing' ? 'En renforcement' : 'Planifié'}</span>
                    </div>
                  </div>

                  {/* Progress bar for impact */}
                  <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden mb-2">
                    <div className="h-full rounded-full" style={{
                      width: `${link.impactScore}%`,
                      backgroundColor: typeConf.color,
                    }} />
                  </div>

                  {/* Frequency & last exchange */}
                  <div className="flex items-center justify-between text-[10px] text-foreground-400 mb-2">
                    <span><i className="ri-time-line mr-1" />{link.frequency}</span>
                    <span>Dernier échange : {new Date(link.lastExchange).toLocaleDateString('fr-FR')}</span>
                  </div>

                  <button
                    onClick={() => setExpandedSynergy(isExpanded ? null : link.id)}
                    className="text-[10px] font-bold text-foreground-500 hover:text-foreground-800 cursor-pointer transition-colors flex items-center gap-1"
                  >
                    {isExpanded ? (
                      <><i className="ri-arrow-up-s-line" /> Masquer le flux</>
                    ) : (
                      <><i className="ri-arrow-down-s-line" /> Détail du flux de données</>
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-background-100 space-y-3">
                      <div>
                        <span className="text-[10px] font-bold text-foreground-400 uppercase">Description</span>
                        <p className="text-xs text-foreground-600 mt-1 leading-relaxed">{link.description}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-foreground-400 uppercase">Flux de données</span>
                        <div className="mt-1 p-2.5 rounded-lg bg-background-50 border border-background-100">
                          <code className="text-[11px] text-foreground-700 font-mono">{link.dataFlow}</code>
                        </div>
                      </div>
                      {link.status !== 'active' && (
                        <button
                          onClick={() => engine.activateSynergy(link.id)}
                          className="px-4 py-2 rounded-lg bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors cursor-pointer"
                        >
                          <i className="ri-play-circle-line mr-1" />Activer cette synergie
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Synergy Stats Summary */}
      <ScrollReveal>
        <div className="bg-gradient-to-r from-amber-100/50 to-background-50 border border-amber-200/40 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Résumé des Synergies</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Synergies Totales', value: engine.synergyStats.totalSynergies, icon: 'ri-node-tree', color: '#F59E0B' },
              { label: 'Actives', value: engine.synergyStats.activeSynergies, icon: 'ri-flashlight-line', color: '#10B981' },
              { label: 'Impact Moyen', value: `${engine.synergyStats.avgImpactScore}/100`, icon: 'ri-bar-chart-line', color: '#6366F1' },
              { label: 'Gain Qualité Cumulé', value: `+${engine.synergyStats.cumulativeQualityGain}%`, icon: 'ri-arrow-up-circle-line', color: '#059669' },
              { label: 'Métriques Échangées', value: engine.synergyStats.totalMetricsExchanged.toLocaleString(), icon: 'ri-exchange-line', color: '#0891B2' },
              { label: 'Top Synergie', value: engine.synergyStats.topSynergyPair, icon: 'ri-trophy-line', color: '#DC2626', fullWidth: true },
              { label: '4 Mécanismes', value: 'knowledge_feed · output_input · validation_loop · escalation', icon: 'ri-settings-3-line', color: '#7C3AED', fullWidth: true },
            ].map((s, i) => (
              <div key={i} className={`bg-white border border-background-100 rounded-xl p-4 ${s.fullWidth ? 'col-span-2' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                    <i className={`${s.icon} text-sm`} style={{ color: s.color }} />
                  </div>
                  <span className="text-[10px] font-bold text-foreground-400 uppercase">{s.label}</span>
                </div>
                <span className={`font-heading font-bold text-foreground-950 ${s.fullWidth ? 'text-sm' : 'text-xl'}`}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}