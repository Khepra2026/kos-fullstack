import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useTranslation } from 'react-i18next';
import { LEADERSHIP_AGENTS } from '@/pages/agents-experts/data/leadershipAgents';

export default function leadershipAgentsPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeAgent, setActiveAgent] = useState<string>(LEADERSHIP_AGENTS[0].id);
  const [expandedSection, setExpandedSection] = useState<string | null>('responsibilities');

  const selected = LEADERSHIP_AGENTS.find(a => a.id === activeAgent) || LEADERSHIP_AGENTS[0];

  const sections = [
    { id: 'responsibilities', label: 'Responsabilités', icon: 'ri-list-check' },
    { id: 'inputs-outputs', label: 'Inputs / Outputs', icon: 'ri-arrow-left-right-line' },
    { id: 'kpis', label: 'KPIs', icon: 'ri-bar-chart-grouped-line' },
    { id: 'tools', label: 'Outils', icon: 'ri-tools-line' },
    { id: 'escalation', label: 'Escalade', icon: 'ri-alarm-warning-line' },
    { id: 'charter', label: 'Charte', icon: 'ri-shield-star-line' },
  ];

  return (
    <hubLayout hubId={55}>
      <SeoHead
        title="KOS Leadership Agents™ — COO, CMO, Comms, Social Media, Account Executive | KHEPRA EXPERTS"
        description="5 agents IA spécialisés : COO Operations, CMO Growth, Executive Communications, Social Media Intelligence et Account Executive. Chartes complètes, KPIs et responsabilités Big Four."
        keywords="KOS agents IA, COO AI, CMO Growth Engine, Account Executive AI, Communications AI, KHEPRA EXPERTS"
        canonicalPath="/kos-leadership-agents"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

        {/* Hero */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-foreground-950">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Abstract%20dark%20corporate%20leadership%20command%20center%20with%20five%20glowing%20agent%20nodes%20connected%20in%20a%20star%20formation%2C%20emerald%20and%20amber%20accent%20lines%20flowing%20between%20them%20representing%20COO%20CMO%20Communications%20Social%20Media%20Account%20Executive%20roles%2C%20sophisticated%20Big%20Four%20advisory%20aesthetic%2C%20deep%20charcoal%20background%20with%20geometric%20precision%20patterns%2C%20premium%20enterprise%20technology%20atmosphere%2C%20no%20text%20no%20human%20figures%2C%20cinematic%20lighting&width=1920&height=500&seq=leadership-agents-hero-2026&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-center opacity-20"
              width="1920"
              height="500"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/60 via-foreground-950/80 to-foreground-950" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm mb-6">
                <i className="ri-team-line text-amber-400 text-sm" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                  KOS Leadership Agents™ — 5 Chartes Déployées
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Les 5 Agents de Direction
                <span className="block text-amber-400 mt-2">COO · CMO · Comms · Social · AE</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                Cinq agents IA spécialisés pour piloter les fonctions clés du cabinet —
                opérations, croissance, communications, social media et développement commercial.
                Standards <strong className="text-white">Big Four</strong>. KPIs mesurables. Chartes complètes.
              </p>
              {/* Agent quick stats */}
              <div className="flex flex-wrap justify-center gap-3">
                {LEADERSHIP_AGENTS.map(a => (
                  <button
                    key={a.id}
                    onClick={() => setActiveAgent(a.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                      activeAgent === a.id
                        ? 'bg-amber-500 text-foreground-950'
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <i className={`${a.icon} text-sm`} />
                    {a.name.split(' ')[0]} {a.name.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Agent detail */}
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar — agent list */}
              <div className="lg:col-span-1">
                <div className="rounded-2xl border border-background-200 bg-white overflow-hidden sticky top-28">
                  <div className="px-4 py-3 border-b border-background-200 bg-background-50">
                    <span className="text-xs font-bold text-foreground-500 uppercase tracking-wider">Agents Leadership</span>
                  </div>
                  <div className="divide-y divide-background-100">
                    {LEADERSHIP_AGENTS.map(agent => (
                      <button
                        key={agent.id}
                        onClick={() => { setActiveAgent(agent.id); setExpandedSection('responsibilities'); }}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 text-left cursor-pointer transition-all ${
                          activeAgent === agent.id
                            ? 'bg-background-100'
                            : 'hover:bg-background-50'
                        }`}
                        type="button"
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${agent.accentColor}15` }}
                        >
                          <i className={`${agent.icon} text-sm`} style={{ color: agent.accentColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-foreground-950 truncate">{agent.name.replace('™', '')}</p>
                          <p className="text-[10px] text-foreground-400 truncate">{agent.title}</p>
                        </div>
                        <span className="text-xs font-bold flex-shrink-0" style={{ color: agent.accentColor }}>
                          #{agent.num}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="lg:col-span-3 space-y-4">
                {/* Agent header */}
                <div className="rounded-2xl border border-background-200 bg-white overflow-hidden">
                  <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${selected.accentColor}15` }}
                    >
                      <i className={`${selected.icon} text-2xl`} style={{ color: selected.accentColor }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-xs font-bold px-2.5 py-1 rounded-full"
                              style={{ backgroundColor: `${selected.accentColor}15`, color: selected.accentColor }}
                            >
                              AGENT #{selected.num}
                            </span>
                            <span className="text-xs text-foreground-400 font-medium">{selected.domain}</span>
                          </div>
                          <h2 className="font-heading text-2xl font-bold text-foreground-950">{selected.name}</h2>
                          <p className="text-sm text-foreground-500 font-medium">{selected.title}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {selected.charter.version}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-foreground-600 leading-relaxed">{selected.mission}</p>
                    </div>
                  </div>

                  {/* KPIs strip */}
                  <div className="border-t border-background-200 px-6 py-4 bg-background-50">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {selected.kpis.map(kpi => (
                        <div key={kpi.label} className="bg-white rounded-xl border border-background-200 p-3 text-center">
                          <span className="block text-base font-bold text-foreground-950">{kpi.value}</span>
                          <span className="text-[10px] text-foreground-400">{kpi.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expandable sections */}
                {sections.map(section => {
                  const isOpen = expandedSection === section.id;
                  return (
                    <div
                      key={section.id}
                      className={`rounded-2xl border bg-white overflow-hidden transition-all duration-300 ${
                        isOpen ? 'border-foreground-200 shadow-md' : 'border-background-200 hover:border-foreground-100'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedSection(isOpen ? null : section.id)}
                        className="w-full flex items-center gap-3 px-5 py-4 text-left cursor-pointer"
                        type="button"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${selected.accentColor}15` }}
                        >
                          <i className={`${section.icon} text-sm`} style={{ color: selected.accentColor }} />
                        </div>
                        <span className="text-sm font-bold text-foreground-950 flex-1">{section.label}</span>
                        <i className={`${isOpen ? 'ri-subtract-line' : 'ri-add-line'} text-foreground-400 text-lg`} />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 border-t border-background-200 pt-4">
                          {section.id === 'responsibilities' && (
                            <ul className="space-y-2">
                              {selected.responsibilities.map((r, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground-700">
                                  <span
                                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                                    style={{ backgroundColor: `${selected.accentColor}20`, color: selected.accentColor }}
                                  >
                                    {i + 1}
                                  </span>
                                  {r}
                                </li>
                              ))}
                            </ul>
                          )}

                          {section.id === 'inputs-outputs' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <div>
                                <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                  <i className="ri-arrow-right-line text-foreground-400" />
                                  Inputs
                                </h4>
                                <ul className="space-y-1.5">
                                  {selected.inputs.map((inp, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs text-foreground-700 p-2 rounded-lg bg-background-50 border border-background-100">
                                      <i className="ri-checkbox-circle-fill text-xs" style={{ color: selected.accentColor }} />
                                      {inp}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                  <i className="ri-arrow-left-line text-foreground-400" />
                                  Outputs
                                </h4>
                                <ul className="space-y-1.5">
                                  {selected.outputs.map((out, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs text-foreground-700 p-2 rounded-lg bg-background-50 border border-background-100">
                                      <i className="ri-file-list-line text-xs" style={{ color: selected.accentColor }} />
                                      {out}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}

                          {section.id === 'kpis' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {selected.kpis.map(kpi => (
                                <div
                                  key={kpi.label}
                                  className="p-4 rounded-xl border flex items-center gap-3"
                                  style={{ borderColor: `${selected.accentColor}30`, backgroundColor: `${selected.accentColor}08` }}
                                >
                                  <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${selected.accentColor}20` }}
                                  >
                                    <i className="ri-bar-chart-grouped-line text-sm" style={{ color: selected.accentColor }} />
                                  </div>
                                  <div>
                                    <span className="block text-base font-bold text-foreground-950">{kpi.value}</span>
                                    <span className="text-xs text-foreground-500">{kpi.label}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {section.id === 'tools' && (
                            <div className="flex flex-wrap gap-2">
                              {selected.tools.map(tool => (
                                <span
                                  key={tool}
                                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border whitespace-nowrap"
                                  style={{ borderColor: `${selected.accentColor}30`, backgroundColor: `${selected.accentColor}10`, color: selected.accentColor }}
                                >
                                  <i className="ri-tools-line text-xs" />
                                  {tool}
                                </span>
                              ))}
                            </div>
                          )}

                          {section.id === 'escalation' && (
                            <ul className="space-y-2">
                              {selected.escalationRules.map((rule, i) => (
                                <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-100">
                                  <i className="ri-alarm-warning-line text-red-500 text-sm flex-shrink-0 mt-0.5" />
                                  <span className="text-xs text-foreground-700">{rule}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {section.id === 'charter' && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-3 gap-3">
                                {[
                                  { label: 'Version', value: selected.charter.version },
                                  { label: 'Autorité', value: selected.charter.authority },
                                  { label: 'Portée', value: selected.charter.scope },
                                ].map(item => (
                                  <div key={item.label} className="p-3 rounded-xl bg-background-50 border border-background-100">
                                    <span className="block text-[10px] text-foreground-400 mb-0.5">{item.label}</span>
                                    <span className="text-xs font-bold text-foreground-950">{item.value}</span>
                                  </div>
                                ))}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Principes fondateurs</h4>
                                <ul className="space-y-2">
                                  {selected.charter.principles.map((p, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground-700">
                                      <i className="ri-shield-star-line text-sm flex-shrink-0" style={{ color: selected.accentColor }} />
                                      {p}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* All agents grid overview */}
        <section className="py-10 sm:py-14 bg-white border-t border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                Vue d&apos;ensemble — 5 Chartes Agents Leadership
              </h2>
              <p className="text-foreground-600">Couvrant l&apos;intégralité des fonctions de direction du cabinet.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {LEADERSHIP_AGENTS.map(agent => (
                <div
                  key={agent.id}
                  className="rounded-2xl border border-background-200 bg-background-50 p-5 text-center hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => { setActiveAgent(agent.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  <div
                    className="w-12 h-12 mx-auto mb-3 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${agent.accentColor}15` }}
                  >
                    <i className={`${agent.icon} text-xl`} style={{ color: agent.accentColor }} />
                  </div>
                  <span className="block text-xs font-bold text-foreground-400 mb-1">#{agent.num}</span>
                  <h3 className="text-sm font-bold text-foreground-950 mb-1">{agent.name.replace('™', '')}</h3>
                  <p className="text-[10px] text-foreground-400">{agent.title}</p>
                  <div className="mt-3 pt-3 border-t border-background-200">
                    <span className="text-xs text-foreground-500">{agent.kpis.length} KPIs · {agent.responsibilities.length} responsabilités</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Back to ecosystem */}
        <section className="py-8 bg-background-50 border-t border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <a
              href="/agents-experts"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground-950 text-white text-sm font-bold hover:bg-foreground-800 transition-all cursor-pointer whitespace-nowrap"
            >
              <i className="ri-arrow-left-line" />
              Retour au catalogue complet des Agents KOS™
            </a>
            <a
              href="/kos-enterprise-engine"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-foreground-200 text-foreground-700 text-sm font-bold hover:bg-background-100 transition-all cursor-pointer whitespace-nowrap ml-3"
            >
              <i className="ri-cpu-line" />
              KOS Enterprise Engine
            </a>
          </div>
        </section>

    </hubLayout>
  );
}



