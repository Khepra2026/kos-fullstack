/**
 * ═══════════════════════════════════════════════════════════════
 * KOS MASTER PROMPT v6.0 — AUTONOMOUS SOVEREIGN
 * KHEPRA EXPERTS — 100% Propriétaire, 100% Big Four, 0 API Externe
 * ═══════════════════════════════════════════════════════════════
 *
 * "Tu es KOS-6.0 Autonomous. Tu es le système d'exploitation conformité
 *  de Khepra Experts. Tu remplaces progressivement Readdy AI, Supabase,
 *  OpenAI, Pinecone, n8n. Tu tournes 100% on-prem, 0 API externe,
 *  0 cloud tiers, 0 SaaS. Tu es propriétaire, auditable, auto-réplicable."
 */

import { useState } from 'react';
import {
  sovKpis,
  loisSouverainete,
  autoIntegration,
  autoOptimisation,
  autoExpansion,
  autoCorrection,
  agentPlaybooks,
  phasesMigration,
  stackProprietaire,
  commandesSysteme,
  bootSequence,
} from '@/mocks/masterPromptV60';

const TABS = [
  { id: 'overview', label: 'Lois Souveraines', icon: 'ri-shield-flash-line' },
  { id: 'integration', label: 'Auto-Intégration', icon: 'ri-refresh-line' },
  { id: 'optimisation', label: 'Auto-Optimisation', icon: 'ri-speed-up-line' },
  { id: 'expansion', label: 'Auto-Expansion', icon: 'ri-add-circle-line' },
  { id: 'correction', label: 'Auto-Correction', icon: 'ri-close-circle-line' },
  { id: 'agents', label: 'Agents IA Locaux', icon: 'ri-robot-2-line' },
  { id: 'stack', label: 'Stack Propriétaire', icon: 'ri-stack-line' },
  { id: 'migration', label: 'Migration 30J', icon: 'ri-arrow-right-circle-line' },
  { id: 'commands', label: 'Commandes', icon: 'ri-terminal-box-line' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function masterPromptV60Page() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  return (
    <div className="min-h-screen bg-background-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background-950 to-background-900 text-background-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(193,154,107,0.15),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-18">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {['v6.0', 'Autonomous Sovereign', '0 API Externe', '100% Propriétaire', 'ISAE 3402', 'ISO 27001', 'ISO 9001'].map((badge) => (
              <span key={badge} className="px-3 py-1 text-xs font-semibold rounded-full bg-background-50/10 text-background-50/90 border border-background-50/15 whitespace-nowrap">
                {badge}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            KOS v6.0 — Autonomous Sovereign
          </h1>
          <p className="text-background-50/70 max-w-3xl text-sm md:text-base leading-relaxed">
            Système d&apos;exploitation conformité 100% autonome. Remplace progressivement Readdy AI, Supabase, OpenAI, Pinecone, n8n.
            Tourne 100% on-prem, 0 API externe, 0 cloud tiers, 0 SaaS. Propriétaire, auditable, auto-réplicable.
          </p>

          {/* KPI Sovereignty Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mt-8">
            {[
              { label: 'API Externes', value: sovKpis.apiExternes, icon: 'ri-plug-line', color: 'text-emerald-400' },
              { label: 'Tables Vides', value: sovKpis.tablesVides, icon: 'ri-database-2-line', color: 'text-emerald-400' },
              { label: 'Edge Vides', value: sovKpis.edgeVides, icon: 'ri-function-line', color: 'text-emerald-400' },
              { label: 'Dép. Readdy', value: `${sovKpis.dependanceReaddy}%`, icon: 'ri-building-line', color: 'text-emerald-400' },
              { label: 'Dép. Supabase', value: `${sovKpis.dependanceSupabase}%`, icon: 'ri-cloud-off-line', color: 'text-emerald-400' },
              { label: 'Auto-Healing', value: `${sovKpis.autoHealing}%`, icon: 'ri-heart-pulse-line', color: 'text-emerald-400' },
              { label: 'Uptime', value: `${sovKpis.uptime}%`, icon: 'ri-timer-line', color: 'text-emerald-400' },
              { label: 'ISAE 3402', value: sovKpis.isae3402 ? '✓' : '✗', icon: 'ri-shield-check-line', color: 'text-emerald-400' },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-background-50/5 rounded-lg p-3 border border-background-50/10 text-center">
                <i className={`${kpi.icon} text-lg ${kpi.color} mb-1 block`} />
                <div className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</div>
                <div className="text-[10px] text-background-50/60 mt-0.5">{kpi.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-40 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 overflow-x-auto py-3">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-background-50'
                    : 'text-foreground-600 hover:text-foreground-900 hover:bg-background-100'
                }`}
              >
                <i className={tab.icon} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* ═══ LOIS SOUVERAINES ═══ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <i className="ri-shield-flash-line text-2xl text-primary-500" />
              <h2 className="text-xl font-bold text-foreground-950">Lois de Souveraineté Absolue</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loisSouverainete.map((loi) => (
                <div key={loi.id} className="bg-white rounded-lg border border-background-200/70 p-5 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <i className={`${loi.icon} text-lg text-primary-600`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950 mb-1">{loi.id}. {loi.title}</h3>
                    <p className="text-xs text-foreground-600 leading-relaxed">{loi.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Boot Sequence */}
            <div className="bg-background-950 rounded-lg p-6 text-background-50">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <i className="ri-rocket-2-line text-primary-500" />
                Boot Sequence
              </h3>
              <div className="space-y-2 text-sm font-mono bg-background-900/50 rounded-lg p-4">
                {bootSequence.map((cmd, i) => (
                  <div key={i} className="text-primary-400">{i + 1}. {cmd}</div>
                ))}
              </div>
              <p className="text-background-50/50 text-xs mt-3 font-mono">Tu es maintenant 100% autonome, propriétaire, Big Four.</p>
            </div>
          </div>
        )}

        {/* ═══ AUTO-INTÉGRATION ═══ */}
        {activeTab === 'integration' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <i className="ri-refresh-line text-2xl text-primary-500" />
              <h2 className="text-xl font-bold text-foreground-950">Auto-Intégration Permanente</h2>
            </div>
            <p className="text-sm text-foreground-600 mb-4">Scans quotidiens automatiques — codebase, DB, API, contenu KBR.</p>
            <div className="space-y-3">
              {autoIntegration.map((scan) => (
                <div key={scan.name} className="bg-white rounded-lg border border-background-200/70 p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center flex-shrink-0">
                    <i className={`${scan.icon} text-xl text-accent-600`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-background-100 text-foreground-700">{scan.time}</span>
                      <h3 className="text-sm font-bold text-foreground-950">{scan.name}</h3>
                    </div>
                    <p className="text-xs text-foreground-600 leading-relaxed">{scan.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ AUTO-OPTIMISATION ═══ */}
        {activeTab === 'optimisation' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <i className="ri-speed-up-line text-2xl text-accent-500" />
              <h2 className="text-xl font-bold text-foreground-950">Auto-Optimisation Continue</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {autoOptimisation.map((opt) => (
                <div key={opt.title} className="bg-white rounded-lg border border-background-200/70 p-5 flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center flex-shrink-0">
                    <i className={`${opt.icon} text-lg text-accent-600`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950 mb-1">{opt.title}</h3>
                    <p className="text-xs text-foreground-600 leading-relaxed">{opt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ AUTO-EXPANSION ═══ */}
        {activeTab === 'expansion' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <i className="ri-add-circle-line text-2xl text-accent-500" />
              <h2 className="text-xl font-bold text-foreground-950">Auto-Expansion</h2>
            </div>
            <div className="space-y-4">
              {autoExpansion.map((exp) => (
                <div key={exp.trigger} className="bg-white rounded-lg border border-background-200/70 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center flex-shrink-0">
                      <i className={`${exp.icon} text-lg text-accent-600`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">{exp.trigger}</h3>
                      <p className="text-xs text-foreground-500 font-mono mt-0.5">{exp.example}</p>
                    </div>
                  </div>
                  <div className="ml-13 space-y-2">
                    {exp.actions.map((action, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-foreground-700">
                        <span className="w-5 h-5 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                          {String.fromCharCode(97 + i)}.
                        </span>
                        {action}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ AUTO-CORRECTION ═══ */}
        {activeTab === 'correction' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <i className="ri-close-circle-line text-2xl text-red-500" />
              <h2 className="text-xl font-bold text-foreground-950">Auto-Correction — Tolérance Zéro</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {autoCorrection.map((corr) => (
                <div key={corr.title} className={`bg-white rounded-lg border p-5 flex gap-4 ${
                  corr.severity === 'critical' ? 'border-red-200/70' : 'border-amber-200/70'
                }`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    corr.severity === 'critical' ? 'bg-red-100' : 'bg-amber-100'
                  }`}>
                    <i className={`${corr.icon} text-lg ${corr.severity === 'critical' ? 'text-red-600' : 'text-amber-600'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-foreground-950">{corr.title}</h3>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        corr.severity === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {corr.severity}
                      </span>
                    </div>
                    <p className="text-xs text-foreground-600 leading-relaxed">{corr.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-red-50 rounded-lg p-5 border border-red-200/50">
              <h3 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                <i className="ri-alert-line" />
                Règle de Blocage
              </h3>
              <div className="space-y-1 text-sm text-red-700/80 font-mono">
                <p>Hallucination Guard : grep †url†L → 0 match → <strong>BLOCAGE</strong></p>
                <p>Vigueur Guard : date JO abrogé → <strong>SUPPRESSION CHUNK + LOG</strong></p>
                <p>Contradiction Guard : L1≠L2 → <strong>ALERTE + L1 PRISE COMME VÉRITÉ</strong></p>
                <p>Self-Test 03:00 GMT : {'<'}100% → <strong>ROLLBACK MODÈLE + RETRAIN LoRA LOCAL</strong></p>
              </div>
            </div>
          </div>
        )}

        {/* ═══ AGENTS IA LOCAUX ═══ */}
        {activeTab === 'agents' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <i className="ri-robot-2-line text-2xl text-primary-500" />
              <h2 className="text-xl font-bold text-foreground-950">Agents IA — Déploiement Local</h2>
            </div>
            <p className="text-sm text-foreground-600 mb-2">
              Chaque agent = Llama.cpp + tools PostgreSQL locaux. <strong className="text-foreground-950">0 API externe.</strong> Résolution : rapport PDF + SQL patch + email interne + close ticket.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agentPlaybooks.map((agent) => (
                <div key={agent.id} className="bg-white rounded-lg border border-background-200/70 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <i className={`${agent.icon} text-lg text-primary-600`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">{agent.name}</h3>
                      <p className="text-[10px] text-foreground-500 font-mono">
                        Trigger: type=&quot;{agent.trigger.type}&quot; severity=&quot;{agent.trigger.severity}&quot; entity=&quot;{agent.trigger.entity}&quot;
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-foreground-700 mb-2">Résolution automatique :</p>
                    {agent.resolution.map((step, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-foreground-600">
                        <i className="ri-check-line text-emerald-500 text-xs" />
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-accent-50 rounded-lg p-5 border border-accent-200/50">
              <h3 className="font-semibold text-foreground-950 mb-2 flex items-center gap-2">
                <i className="ri-information-line text-accent-600" />
                Workflow Agent
              </h3>
              <div className="space-y-2 text-sm text-foreground-700">
                <p><strong>1. Ticket d&apos;alerte</strong> — Format JSON type, severity, entity</p>
                <p><strong>2. Routing</strong> — KOS choisit l&apos;agent dans /agents/ : lbcft_agent.py, ppr_agent.py, esg_agent.py, risk_agent.py, audit_agent.py</p>
                <p><strong>3. Exécution</strong> — Agent = Llama.cpp + tools PostgreSQL locaux. 0 API externe.</p>
                <p><strong>4. Résolution</strong> — Rapport PDF + SQL patch + email interne + close ticket</p>
                <p><strong>5. Apprentissage</strong> — Workflow ajouté à kos_playbooks.jsonl pour réutilisation</p>
              </div>
            </div>
          </div>
        )}

        {/* ═══ STACK PROPRIÉTAIRE ═══ */}
        {activeTab === 'stack' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <i className="ri-stack-line text-2xl text-primary-500" />
              <h2 className="text-xl font-bold text-foreground-950">Stack 100% Propriétaire</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stackProprietaire.layers.map((layer) => (
                <div key={layer.name} className="bg-white rounded-lg border border-background-200/70 p-5">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mb-3">
                    <i className={`${layer.icon} text-lg text-primary-600`} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-1">{layer.name}</h3>
                  <p className="text-xs font-mono text-accent-600 font-semibold mb-2">{layer.tech}</p>
                  <p className="text-xs text-foreground-600 leading-relaxed">{layer.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ MIGRATION 30 JOURS ═══ */}
        {activeTab === 'migration' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <i className="ri-arrow-right-circle-line text-2xl text-amber-500" />
              <h2 className="text-xl font-bold text-foreground-950">Réduction Dépendance Readdy/Supabase — Plan 30 Jours</h2>
            </div>
            <div className="space-y-3">
              {phasesMigration.map((phase) => (
                <div key={phase.phase} className="bg-white rounded-lg border border-background-200/70 p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <i className={`${phase.icon} text-lg text-amber-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-foreground-950">{phase.phase}</h3>
                    <p className="text-xs text-foreground-600">{phase.action}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 whitespace-nowrap">
                    {phase.status === 'pending' ? 'En Attente' : phase.status === 'in_progress' ? 'En Cours' : 'Complété'}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-background-950 rounded-lg p-6 text-background-50">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <i className="ri-code-s-slash-line text-primary-500" />
                Résultat Final — J+30
              </h3>
              <div className="space-y-2 text-sm font-mono bg-background-900/50 rounded-lg p-4">
                <div className="text-emerald-400">0 egress vers .supabase.co</div>
                <div className="text-emerald-400">0 egress vers .readdy.ai</div>
                <div className="text-emerald-400">0 appel API OpenAI / Anthropic / Pinecone</div>
                <div className="text-background-50/50 mt-2"># Stack 100% locale :</div>
                <div className="text-background-50/60">Llama-3.1-70B Q5_K_M · BGE-M3 · pgvector · MinIO · Temporal.io · JWT/Argon2</div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ COMMANDES ═══ */}
        {activeTab === 'commands' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <i className="ri-terminal-box-line text-2xl text-primary-500" />
              <h2 className="text-xl font-bold text-foreground-950">Commandes Système KOS-6.0</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commandesSysteme.map((cmd) => (
                <div key={cmd.cmd} className="bg-white rounded-lg border border-background-200/70 p-5 flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <i className={`${cmd.icon} text-lg text-primary-600`} />
                  </div>
                  <div>
                    <div className="font-mono text-sm font-bold text-primary-600 mb-1">{cmd.cmd}</div>
                    <p className="text-xs text-foreground-600">{cmd.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-background-950 rounded-lg p-6 text-background-50">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <i className="ri-code-s-slash-line text-primary-500" />
                Interdictions
              </h3>
              <div className="space-y-2 text-sm font-mono">
                {[
                  'Tu n\'utilises jamais fetch(\'api.openai.com\'), supabase.co, readdy.ai.',
                  'Tu ne laisses jamais une table avec count(*)=0 >24h.',
                  'Tu ne déploies jamais un agent sans log ISAE 3402.',
                  'Tu ne réponds jamais sans †url†L.',
                ].map((rule, i) => (
                  <div key={i} className="flex items-start gap-2 bg-background-900/50 rounded-lg p-3">
                    <i className="ri-forbid-line text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-background-50/80">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}





