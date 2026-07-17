import { useState, useEffect, useRef } from 'react';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { platformArchitecture } from '@/mocks/kosPlatformArchitecture';

function SectionHeading({ overline, title, subtitle, align = 'center' }: { overline: string; title: string; subtitle: string; align?: 'center' | 'left' }) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}>
      <div className="flex items-center gap-3 mb-4 justify-center">
        <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">{overline}</span>
        <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, #86BC25)' }} />
      </div>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-3">{title}</h2>
      <p className="text-foreground-600 text-body-sm max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
    </div>
  );
}

function AnimatedNumber({ target, suffix = '' }: { target: string; suffix?: string }) {
  return (
    <span className="font-heading font-bold text-foreground-950">
      {target}{suffix}
    </span>
  );
}

export default function PlatformRegtechPage() {
  const data = platformArchitecture;
  const [activeCore, setActiveCore] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background-50">
      <Navigation />

      <main id="main-content">
        {/* ═══════════════════════════════════════════════════════
            HERO — Architecture visuelle de la plateforme
            ════════════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative overflow-hidden bg-foreground-950 min-h-[680px] flex items-center">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #c4a235 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />
            <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/30 via-foreground-950/10 to-foreground-950/30" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Gauche : Texte */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: 'rgba(134,188,37,0.1)', border: '1px solid rgba(134,188,37,0.25)' }}>
                  <i className="ri-shield-star-line text-sm text-primary-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-400">KOS REGTECH AI</span>
                </div>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
                  L&apos;intelligence réglementaire
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400">
                    qui transforme la conformité
                  </span>
                  <br />
                  en avantage compétitif
                </h1>
                <p className="text-body-md text-foreground-300 leading-relaxed mb-8 max-w-lg" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
                  Plateforme souveraine d&apos;intelligence réglementaire augmentée. Conçue pour les institutions financières, régulateurs et entreprises opérant en zone UEMOA, CEMAC et OHADA.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/diagnostic-flash/" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 cursor-pointer" style={{ background: 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)', color: '#0a0a0a' }}>
                    <i className="ri-flashlight-line" />
                    Diagnostic gratuit
                  </a>
                  <a href="/contact/" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 cursor-pointer" style={{ border: '1px solid rgba(134,188,37,0.4)', color: '#86BC25' }}>
                    <i className="ri-calendar-line" />
                    Demander une démo
                  </a>
                </div>
              </div>

              {/* Droite : Arbre architectural */}
              <div className="hidden lg:block">
                <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                    <i className="ri-cpu-line text-lg text-primary-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground-400">Architecture Plateforme</span>
                  </div>
                  <div className="space-y-3 font-mono text-xs">
                    {/* Root */}
                    <div className="flex items-center gap-2 text-primary-400 font-bold">
                      <i className="ri-git-repository-line" />
                      <span>KOS REGTECH AI PLATFORM</span>
                    </div>
                    {/* Level 1 */}
                    <div className="pl-4 space-y-1.5 border-l border-white/10">
                      <div className="flex items-center gap-2 text-accent-400">
                        <span className="text-white/30">├──</span>
                        <i className="ri-database-2-line" />
                        <span>Ingestion</span>
                        <span className="text-white/30">regulator_feed &lt;2h + 1.2M kb_docs</span>
                      </div>
                      <div className="flex items-center gap-2 text-amber-400">
                        <span className="text-white/30">├──</span>
                        <i className="ri-brain-line" />
                        <span>Intelligence</span>
                        <span className="text-white/30">Llama-70B + BGE-M3 + Reranker</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <span className="text-white/30">├──</span>
                        <i className="ri-grid-line" />
                        <span>Cores</span>
                        <span className="text-white/30">RegTech | GRC | Legal | ESG | Risk | Audit | Knowledge</span>
                      </div>
                      <div className="flex items-center gap-2 text-cyan-400">
                        <span className="text-white/30">├──</span>
                        <i className="ri-lightbulb-flash-line" />
                        <span>Think Tank</span>
                        <span className="text-white/30">LLM génération livres blancs</span>
                      </div>
                      <div className="flex items-center gap-2 text-teal-400">
                        <span className="text-white/30">├──</span>
                        <i className="ri-radar-line" />
                        <span>Observatoires</span>
                        <span className="text-white/30">15 secteurs temps réel</span>
                      </div>
                      <div className="flex items-center gap-2 text-rose-400">
                        <span className="text-white/30">├──</span>
                        <i className="ri-user-star-line" />
                        <span>Executive</span>
                        <span className="text-white/30">Notes CA/Comité &lt;90s</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <span className="text-white/30">├──</span>
                        <i className="ri-file-list-3-line" />
                        <span>Output</span>
                        <span className="text-white/30">Rapports | TDB | Matrices | Feuilles route</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <span className="text-white/30">└──</span>
                        <i className="ri-link" />
                        <span>Audit Trail</span>
                        <span className="text-white/30">KOS-Chain 100% traçable</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            STATS BAR
            ════════════════════════════════════════════════════ */}
        <section className="bg-background-100 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {data.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-heading text-xl md:text-2xl font-bold text-foreground-950"><AnimatedNumber target={stat.value} /></div>
                  <div className="text-xs text-foreground-500 mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            INGESTION & INTELLIGENCE
            ════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading overline="Architecture" title="Ingestion & Intelligence" subtitle="Des données réglementaires brutes à l'intelligence actionnable — un pipeline 100% souverain, zéro dépendance externe." />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Ingestion */}
              <div className="rounded-2xl p-6 md:p-8 bg-background-100 border border-background-200/70">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: 'rgba(196,162,53,0.12)', border: '1px solid rgba(196,162,53,0.2)' }}>
                    <i className="ri-database-2-line text-lg text-accent-500" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground-950">{data.ingestion.title}</h3>
                    <p className="text-xs text-foreground-500">{data.ingestion.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {data.ingestion.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-background-50 border border-background-200/50">
                      <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl text-center" style={{ background: 'rgba(196,162,53,0.08)' }}>
                        <span className="font-heading text-lg font-bold text-accent-600">{item.value}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground-900 mb-0.5">{item.label}</p>
                        <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intelligence */}
              <div className="rounded-2xl p-6 md:p-8 bg-background-100 border border-background-200/70">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: 'rgba(134,188,37,0.12)', border: '1px solid rgba(134,188,37,0.2)' }}>
                    <i className="ri-brain-line text-lg text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground-950">{data.intelligence.title}</h3>
                    <p className="text-xs text-foreground-500">{data.intelligence.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {data.intelligence.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-background-50 border border-background-200/50">
                      <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl text-center" style={{ background: 'rgba(134,188,37,0.08)' }}>
                        <span className="font-heading text-sm font-bold text-primary-600 leading-tight">{item.value}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground-900 mb-0.5">{item.label}</p>
                        <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            7 CŒURS MÉTIER
            ════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading overline="Domaines d'expertise" title="7 Cœurs Métier Interconnectés" subtitle="Chaque cœur est un moteur IA autonome, spécialisé dans son domaine réglementaire, interconnecté au Knowledge Graph KOS." />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {data.cores.items.slice(0, 4).map((core, i) => {
                const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
                  primary: { bg: 'rgba(134,188,37,0.06)', border: 'rgba(134,188,37,0.2)', text: 'primary-700', iconBg: 'rgba(134,188,37,0.12)' },
                  accent: { bg: 'rgba(196,162,53,0.06)', border: 'rgba(196,162,53,0.2)', text: 'accent-700', iconBg: 'rgba(196,162,53,0.12)' },
                  secondary: { bg: 'rgba(107,114,128,0.06)', border: 'rgba(107,114,128,0.2)', text: 'foreground-700', iconBg: 'rgba(107,114,128,0.10)' },
                };
                const c = colorMap[core.color] || colorMap.primary;
                return (
                  <div
                    key={i}
                    className="rounded-xl p-5 border transition-all duration-300 cursor-pointer hover:-translate-y-1"
                    style={{ background: c.bg, borderColor: c.border }}
                    onMouseEnter={() => setActiveCore(i)}
                    onMouseLeave={() => setActiveCore(null)}
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg mb-3" style={{ background: c.iconBg }}>
                      <i className={`${core.icon} text-lg text-${c.text}`} />
                    </div>
                    <h4 className="font-heading text-base font-bold text-foreground-950 mb-2">{core.name}</h4>
                    <p className="text-xs text-foreground-500 leading-relaxed">{core.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
              {data.cores.items.slice(4).map((core, i) => {
                const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
                  primary: { bg: 'rgba(134,188,37,0.06)', border: 'rgba(134,188,37,0.2)', text: 'primary-700', iconBg: 'rgba(134,188,37,0.12)' },
                  accent: { bg: 'rgba(196,162,53,0.06)', border: 'rgba(196,162,53,0.2)', text: 'accent-700', iconBg: 'rgba(196,162,53,0.12)' },
                  secondary: { bg: 'rgba(107,114,128,0.06)', border: 'rgba(107,114,128,0.2)', text: 'foreground-700', iconBg: 'rgba(107,114,128,0.10)' },
                };
                const c = colorMap[core.color] || colorMap.primary;
                return (
                  <div
                    key={i}
                    className="rounded-xl p-5 border transition-all duration-300 cursor-pointer hover:-translate-y-1"
                    style={{ background: c.bg, borderColor: c.border }}
                    onMouseEnter={() => setActiveCore(i + 4)}
                    onMouseLeave={() => setActiveCore(null)}
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg mb-3" style={{ background: c.iconBg }}>
                      <i className={`${core.icon} text-lg text-${c.text}`} />
                    </div>
                    <h4 className="font-heading text-base font-bold text-foreground-950 mb-2">{core.name}</h4>
                    <p className="text-xs text-foreground-500 leading-relaxed">{core.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            THINK TANK & OBSERVATOIRES
            ════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Think Tank */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.2)' }}>
                    <i className="ri-lightbulb-flash-line text-lg" style={{ color: '#06b6d4' }} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground-950">{data.thinkTank.title}</h3>
                    <p className="text-xs text-foreground-500">{data.thinkTank.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {data.thinkTank.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-background-100 border border-background-200/70">
                      <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-xl" style={{ background: 'rgba(6,182,212,0.08)' }}>
                        <span className="font-heading text-xl font-bold" style={{ color: '#06b6d4' }}>{item.value}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground-900 mb-0.5">{item.label}</p>
                        <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Observatoires */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.2)' }}>
                    <i className="ri-radar-line text-lg" style={{ color: '#14b8a6' }} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground-950">{data.observatoires.title}</h3>
                    <p className="text-xs text-foreground-500">{data.observatoires.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {data.observatoires.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-background-100 border border-background-200/70">
                      <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-xl" style={{ background: 'rgba(20,184,166,0.08)' }}>
                        <span className="font-heading text-xl font-bold" style={{ color: '#14b8a6' }}>{item.value}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground-900 mb-0.5">{item.label}</p>
                        <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            EXECUTIVE ENGINE
            ════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading overline="Aide à la décision" title="Executive Engine" subtitle="Des notes pour le Conseil d'Administration et les Comités spécialisés générées en moins de 90 secondes. 280 KPIs exécutifs en temps réel." />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.executive.items.map((item, i) => (
                <div key={i} className="rounded-xl p-6 text-center bg-background-50 border border-background-200/70 hover:border-primary-300/50 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-4" style={{ background: 'rgba(244,63,94,0.08)', border: '2px solid rgba(244,63,94,0.15)' }}>
                    <span className="font-heading text-2xl font-bold text-foreground-950">{item.value}</span>
                  </div>
                  <h4 className="font-heading text-lg font-bold text-foreground-950 mb-2">{item.label}</h4>
                  <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            OUTPUT FACTORY
            ════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading overline="Livrables" title="Output Factory" subtitle="Rapports, tableaux de bord, matrices et feuilles de route — 100% automatisés, niveau Big Four." />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {data.output.items.map((item, i) => (
                <div key={i} className="rounded-xl p-6 text-center bg-background-100 border border-background-200/70 hover:border-accent-300/50 transition-all duration-300 group">
                  <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl mb-4 group-hover:scale-110 transition-transform" style={{ background: 'rgba(196,162,53,0.1)' }}>
                    <i className={`${item.icon} text-xl text-accent-600`} />
                  </div>
                  <h4 className="font-heading text-base font-bold text-foreground-950 mb-2">{item.label}</h4>
                  <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            KOS-CHAIN — AUDIT TRAIL
            ════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-foreground-950 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center gap-3 mb-4 justify-center">
                <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, #10b981)' }} />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Traçabilité</span>
                <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #10b981, transparent)' }} />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">{data.auditTrail.title}</h2>
              <p className="text-foreground-400 text-body-sm max-w-2xl mx-auto leading-relaxed">{data.auditTrail.subtitle}</p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
              {data.auditTrail.items.map((item, i) => (
                <div key={i} className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
                  <div className="rounded-2xl p-6 text-center w-full lg:w-64" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-4" style={{ background: 'rgba(16,185,129,0.12)' }}>
                      <span className="font-heading text-xl font-bold text-emerald-400">{item.value}</span>
                    </div>
                    <h4 className="font-heading text-base font-bold text-white mb-2">{item.label}</h4>
                    <p className="text-xs text-foreground-400 leading-relaxed">{item.desc}</p>
                  </div>
                  {i < data.auditTrail.items.length - 1 && (
                    <div className="hidden lg:flex items-center text-emerald-600/30 text-2xl">
                      <i className="ri-arrow-right-line" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chain visual */}
            <div className="mt-12 flex justify-center">
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <i className="ri-shield-check-line text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300">KOS-Chain™ — Piste d&apos;audit immuable — 100% traçable — 0 donnée orpheline</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CTA FINAL
            ════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-background-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center gap-3 mb-5 justify-center">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">Prêt à transformer votre conformité ?</span>
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, #86BC25)' }} />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-4">
              Découvrez la puissance de KOS REGTECH AI
            </h2>
            <p className="text-foreground-600 text-body-sm max-w-xl mx-auto mb-8 leading-relaxed">
              Planifiez une démonstration personnalisée de la plateforme. Nos experts analyseront votre contexte réglementaire et vous montreront comment KOS peut transformer votre conformité en avantage compétitif.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact/" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 cursor-pointer" style={{ background: 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)', color: '#0a0a0a' }}>
                <i className="ri-calendar-line" />
                Demander une démo
              </a>
              <a href="/diagnostic-flash/" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 cursor-pointer bg-background-50 border border-background-300/60 text-foreground-900">
                <i className="ri-flashlight-line" />
                Diagnostic gratuit
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}