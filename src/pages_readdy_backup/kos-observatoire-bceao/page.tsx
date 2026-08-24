import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useObservatoireBCEAO } from '@/hooks/useObservatoireBCEAO';

type TabId = 'overview' | 'instructions' | 'countries' | 'inspections' | 'compliance';

function scoreColor(score: number): string {
  if (score >= 95) return '#86BC25';
  if (score >= 90) return '#0D7B5F';
  if (score >= 80) return '#E8C547';
  if (score >= 70) return '#E8943A';
  return '#DC2626';
}

export default function observatoireBCEAOPage() {
  const { overview, instructions, countries, inspections, alerts, dimensions, bigFour, loading, error, dataSource } = useObservatoireBCEAO();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [expandedInstruction, setExpandedInstruction] = useState<string | null>(null);
  const [instructionFilter, setInstructionFilter] = useState<string>('all');

  const tabs: { id: TabId; label: string; icon: string; sub: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', sub: `${overview.complianceScore}/100` },
    { id: 'instructions', label: '22 Instructions', icon: 'ri-file-list-3-line', sub: `${overview.verifiedInstructions} vérifiées` },
    { id: 'countries', label: '8 Pays UEMOA', icon: 'ri-map-pin-line', sub: `${countries.length} pays` },
    { id: 'inspections', label: 'Inspections', icon: 'ri-search-line', sub: `${inspections.filter(i => i.status === 'En cours').length} en cours` },
    { id: 'compliance', label: 'Conformité', icon: 'ri-scales-3-line', sub: `${overview.isoCompliance}% ISO` },
  ];

  const filteredInstructions = instructionFilter === 'all'
    ? instructions
    : instructions.filter(i => i.impact === instructionFilter);

  return (
    <hubLayout hubId={131}>
      <SeoHead
        title="KOS Observatoire BCEAO UEMOA™ — 22 Instructions Vérifiées, 8 Pays, Inspections Prudentielles | KHEPRA EXPERTS"
        description="Observatoire réglementaire BCEAO niveau Big Four. 22 instructions vérifiées, 8 pays UEMOA, 8 inspections timeline, 4 alertes actives. Conformité 96/100. ISO 100%."
        keywords="BCEAO, UEMOA, observatoire réglementaire, instructions BCEAO, inspection prudentielle, SFD, microfinance, conformité bancaire"
        canonicalPath="/kos-observatoire-bceao"
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600/30 border border-emerald-500/40 backdrop-blur-sm">
                  <i className="ri-bank-line text-emerald-400 text-sm" />
                  <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                    KOS Observatoire BCEAO UEMOA™
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
                Observatoire BCEAO UEMOA
                <span className="block text-emerald-400 mt-2">22 Instructions Vérifiées. 8 Pays. 96% Conformité.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
                <strong className="text-white">{overview.verifiedInstructions} instructions</strong> vérifiées ·{' '}
                <strong className="text-white">{countries.length} pays UEMOA</strong> ·{' '}
                <strong className="text-white">{overview.banks} banques</strong> ·{' '}
                <strong className="text-white">{overview.sfd} SFD</strong> ·{' '}
                Score conformité : <strong className="text-emerald-400">{overview.complianceScore}/100</strong>.
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-64 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Score BCEAO</span>
              <div className="text-4xl font-bold text-emerald-400 font-heading mt-3">{overview.bceaoScore}</div>
              <span className="text-[9px] text-gray-400">/100</span>
              <div className="mt-3 text-[10px] text-gray-400">
                ISO Conformité {overview.isoCompliance}%
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
              { label: 'Instructions', value: `${overview.verifiedInstructions}`, icon: 'ri-file-list-3-line', color: '#86BC25' },
              { label: 'Circulaires', value: `${overview.activeCirculars}`, icon: 'ri-file-paper-line', color: '#0D7B5F' },
              { label: 'Directives', value: `${overview.activeDirectives}`, icon: 'ri-file-shield-line', color: '#6366F1' },
              { label: 'Pays', value: `${countries.length}`, icon: 'ri-map-pin-line', color: '#E8C547' },
              { label: 'Banques', value: `${overview.banks}`, icon: 'ri-bank-line', color: '#0D7B5F' },
              { label: 'SFD', value: `${overview.sfd}`, icon: 'ri-building-2-line', color: '#86BC25' },
              { label: 'Alertes', value: `${overview.alertesActives}`, icon: 'ri-alert-line', color: '#DC2626' },
              { label: 'Inspections', value: `${inspections.filter(i => i.status === 'En cours').length}`, icon: 'ri-search-line', color: '#EA580C' },
              { label: 'KHEPRA', value: `${overview.khepraImplicated}`, icon: 'ri-shield-check-line', color: '#059669' },
              { label: 'ISO', value: `${overview.isoCompliance}%`, icon: 'ri-award-line', color: '#8B5CF6' },
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
            {/* Alertes actives */}
            <div className="mb-8">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Alertes Actives — {alerts.length}</h3>
              <div className="space-y-3">
                {alerts.map(a => {
                  const sevColor = a.severity === 'Critique' ? '#DC2626' : a.severity === 'Haute' ? '#EA580C' : '#E8C547';
                  return (
                    <div key={a.id} className="rounded-xl bg-white border border-background-200 p-4">
                      <div className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 animate-pulse" style={{ backgroundColor: sevColor }} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-foreground-950">{a.title}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${sevColor}15`, color: sevColor, border: `1px solid ${sevColor}40` }}>{a.severity}</span>
                          </div>
                          <p className="text-xs text-foreground-600 mb-1">{a.action}</p>
                          <div className="flex gap-3 text-[10px] text-foreground-400">
                            <span><i className="ri-calendar-line mr-1" />Deadline: {a.deadline}</span>
                            <span><i className="ri-building-line mr-1" />{a.affected}</span>
                            <span className="text-emerald-600 font-bold"><i className="ri-shield-check-line mr-1" />{a.khepraOffer}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5 dimensions conformité */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {dimensions.map(d => {
                const c = scoreColor(d.score);
                return (
                  <div key={d.dimension} className="rounded-2xl bg-white border border-background-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-foreground-950">{d.dimension}</h3>
                      <span className="text-sm font-bold" style={{ color: c }}>{d.score}/100</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-background-100 overflow-hidden mb-3">
                      <div className="h-full rounded-full" style={{ width: `${d.score}%`, backgroundColor: c }} />
                    </div>
                    <div className="flex gap-3 text-[10px] text-foreground-500">
                      <span>Poids {d.weight}%</span>
                      <span className="text-foreground-400">Cible {d.target}</span>
                      <span className={d.trend === 'up' ? 'text-emerald-600' : 'text-amber-600'}>
                        {d.trend === 'up' ? '↑ En amélioration' : '→ Stable'}
                      </span>
                    </div>
                    {d.gaps.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {d.gaps.map(g => (
                          <span key={g} className="text-[9px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{g}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Big Four Analysis */}
            <div className="rounded-2xl bg-white border border-background-200 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Analyse Big Four — KHEPRA vs Concurrents</h3>
              <div className="space-y-4">
                {bigFour.map(b => (
                  <div key={b.dimension}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-foreground-950">{b.dimension}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">+{b.advantage} pts KHEPRA</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        { label: 'KHEPRA', value: b.khepra, color: '#059669' },
                        { label: 'Deloitte', value: b.deloitte, color: '#6366F1' },
                        { label: 'PwC', value: b.pwc, color: '#8B5CF6' },
                        { label: 'EY', value: b.ey, color: '#EA580C' },
                        { label: 'KPMG', value: b.kpmg, color: '#DC2626' },
                      ].map(firm => (
                        <div key={firm.label} className="text-center">
                          <div className="w-full h-16 rounded-lg bg-background-100 flex flex-col items-center justify-center mb-1">
                            <span className="text-lg font-bold font-heading" style={{ color: firm.color }}>{firm.value}</span>
                          </div>
                          <span className="text-[9px] text-foreground-500">{firm.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* INSTRUCTIONS */}
      {activeTab === 'instructions' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950">{instructions.length} Instructions BCEAO Vérifiées</h2>
              <div className="flex gap-2">
                {['all', 'Critique', 'Haute', 'Moyenne'].map(f => (
                  <button
                    key={f}
                    onClick={() => setInstructionFilter(f)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                      instructionFilter === f ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-600 border border-background-200'
                    }`}>
                    {f === 'all' ? 'Tous' : f}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {filteredInstructions.map(inst => {
                const isExpanded = expandedInstruction === inst.id;
                const impactColor = inst.impact === 'Critique' ? '#DC2626' : inst.impact === 'Haute' ? '#EA580C' : '#E8C547';
                return (
                  <div key={inst.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedInstruction(isExpanded ? null : inst.id)} className="w-full p-4 text-left flex items-center gap-4 cursor-pointer">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${impactColor}15` }}>
                        <span className="text-[9px] font-bold" style={{ color: impactColor }}>{inst.type}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-bold text-foreground-950 block">{inst.title}</span>
                        <span className="text-[10px] text-foreground-500">{inst.reference} · {inst.category} · {inst.date}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] px-2 py-1 rounded-full font-bold" style={{ backgroundColor: `${impactColor}15`, color: impactColor, border: `1px solid ${impactColor}40` }}>{inst.impact}</span>
                        <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">{inst.khepraStatus}</span>
                        <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400`} />
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-background-100 pt-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                          <div className="rounded-lg bg-background-50 p-3 text-center">
                            <span className="text-[9px] text-foreground-400 block">Référence</span>
                            <span className="text-sm font-bold text-foreground-700">{inst.reference}</span>
                          </div>
                          <div className="rounded-lg bg-background-50 p-3 text-center">
                            <span className="text-[9px] text-foreground-400 block">Type</span>
                            <span className="text-sm font-bold text-foreground-700">{inst.type}</span>
                          </div>
                          <div className="rounded-lg bg-background-50 p-3 text-center">
                            <span className="text-[9px] text-foreground-400 block">Date</span>
                            <span className="text-sm font-bold text-foreground-700">{inst.date}</span>
                          </div>
                          <div className="rounded-lg bg-background-50 p-3 text-center">
                            <span className="text-[9px] text-foreground-400 block">Impact</span>
                            <span className="text-sm font-bold" style={{ color: impactColor }}>{inst.impact}</span>
                          </div>
                        </div>
                        <p className="text-xs text-foreground-500 mb-1"><strong className="text-foreground-700">Applicabilité :</strong> {inst.applicability}</p>
                        <p className="text-xs text-foreground-500"><strong className="text-foreground-700">Notes :</strong> {inst.notes}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* COUNTRIES */}
      {activeTab === 'countries' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">{countries.length} Pays UEMOA Cartographiés</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {countries.map(c => {
                const csc = scoreColor(c.conformityScore);
                const khepraColor = c.khepraStatus === 'Forte' ? '#059669' : c.khepraStatus === 'Croissance' ? '#E8C547' : '#6366F1';
                return (
                  <div key={c.code} className="rounded-xl bg-white border border-background-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-foreground-950">{c.name}</h4>
                      <span className="text-lg font-bold font-heading" style={{ color: csc }}>{c.conformityScore}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-background-100 overflow-hidden mb-3">
                      <div className="h-full rounded-full" style={{ width: `${c.conformityScore}%`, backgroundColor: csc }} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[10px] mb-3">
                      <span className="text-foreground-500"><i className="ri-bank-line mr-1" />{c.banks}</span>
                      <span className="text-foreground-500"><i className="ri-building-2-line mr-1" />{c.sfd}</span>
                      <span className="text-foreground-500"><i className="ri-building-4-line mr-1" />{c.emf}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${khepraColor}15`, color: khepraColor, border: `1px solid ${khepraColor}40` }}>{c.khepraStatus}</span>
                      <span className="text-[9px] text-foreground-400">{c.alertes} alertes</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* INSPECTIONS */}
      {activeTab === 'inspections' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">{inspections.length} Inspections BCEAO — Timeline</h2>
            </div>
            <div className="space-y-3">
              {inspections.map(ins => {
                const statusColor = ins.status === 'Terminée' ? '#86BC25' : ins.status === 'En cours' ? '#E8C547' : '#6366F1';
                return (
                  <div key={ins.id} className="rounded-xl bg-white border border-background-200 p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${statusColor}20`, border: `2px solid ${statusColor}50` }}>
                      <i className={`text-sm ${ins.status === 'Terminée' ? 'ri-check-line' : ins.status === 'En cours' ? 'ri-loader-4-line' : 'ri-time-line'}`} style={{ color: statusColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-foreground-950">{ins.bank}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${statusColor}15`, color: statusColor, border: `1px solid ${statusColor}40` }}>{ins.status}</span>
                      </div>
                      <div className="flex gap-3 text-[10px] text-foreground-500">
                        <span>{ins.country}</span>
                        <span>{ins.type}</span>
                        <span>{ins.date}</span>
                        <span className="text-emerald-600 font-bold">{ins.khepraRole}</span>
                      </div>
                    </div>
                    {ins.score !== null && (
                      <span className="text-lg font-bold font-heading" style={{ color: scoreColor(ins.score) }}>{ins.score}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* COMPLIANCE */}
      {activeTab === 'compliance' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Conformité ISO — {overview.isoCompliance}%</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'ISO 9001:2015', value: '100%', color: '#86BC25' },
                { label: 'ISO 27001:2022', value: '100%', color: '#0D7B5F' },
                { label: 'ISO 31000:2018', value: '100%', color: '#6366F1' },
                { label: 'ISO 22301:2019', value: '100%', color: '#8B5CF6' },
                { label: 'ISO 37001:2016', value: '100%', color: '#E8C547' },
                { label: 'ISO 42001:2023', value: '100%', color: '#059669' },
                { label: 'BCEAO Accréditation', value: 'Actif', color: '#EA580C' },
                { label: 'Conformité Globale', value: `${overview.complianceScore}%`, color: '#DC2626' },
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

      {/* Cross-Links */}
      <section className="py-10 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center font-heading text-xl font-bold text-foreground-950 mb-6">Écosystème Réglementaire BCEAO</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Observatoire COBAC', path: '/kos-observatoire-cobac', icon: 'ri-bank-line', color: '#059669' },
              { label: 'Regulatory Africa', path: '/kos-regulatory-observatory-africa', icon: 'ri-globe-line', color: '#6366F1' },
              { label: 'Africa Intelligence', path: '/kos-africa-intelligence-command', icon: 'ri-radar-line', color: '#EA580C' },
              { label: 'Enterprise Risk', path: '/kos-enterprise-risk-resilience', icon: 'ri-shield-flash-line', color: '#DC2626' },
              { label: 'Compliance Factory', path: '/kos-compliance-factory-engine', icon: 'ri-tools-line', color: '#86BC25' },
              { label: 'ISO Big Four', path: '/kos-iso-bigfour-total-compliance-control', icon: 'ri-award-line', color: '#8B5CF6' },
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



