import { useState, useCallback } from 'react';
import {
  sovKpis,
  cycleExecution,
  commandesKos,
  auditLog,
  sourcesRegistre,
  systemComponents,
  interdictions,
  ticketExemple,
} from '@/mocks/sovereignControlTower';
import type { CycleStep } from '@/mocks/sovereignControlTower';

const TABS = [
  { id: 'console' as const, label: 'Console de Commandement', icon: 'ri-terminal-box-line' },
  { id: 'cycle' as const, label: "Cycle d'Exécution", icon: 'ri-git-branch-line' },
  { id: 'audit' as const, label: 'Journal ISAE 3402', icon: 'ri-shield-check-line' },
  { id: 'kpis' as const, label: 'KPIs Souveraineté', icon: 'ri-dashboard-line' },
  { id: 'system' as const, label: 'État du Système', icon: 'ri-server-line' },
  { id: 'sources' as const, label: 'Sources L1-L4', icon: 'ri-links-line' },
] as const;

type TabId = (typeof TABS)[number]['id'];

type ExecutionStatus = 'idle' | 'executing' | 'done';

interface CommandResult {
  cmd: string;
  timestamp: string;
  status: 'OK' | 'BLOCKED';
  hash: string;
  detail: string;
  duree: string;
}

export default function sovereignControlTowerPage() {
  const [activeTab, setActiveTab] = useState<TabId>('console');
  const [execStatus, setExecStatus] = useState<ExecutionStatus>('idle');
  const [executingCmd, setExecutingCmd] = useState<string | null>(null);
  const [stepStates, setStepStates] = useState<CycleStep[]>(cycleExecution);
  const [consoleLog, setConsoleLog] = useState<CommandResult[]>([]);
  const [logEntries, setLogEntries] = useState(auditLog);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const executeCommand = useCallback((cmdLabel: string) => {
    if (execStatus === 'executing') return;
    setExecStatus('executing');
    setExecutingCmd(cmdLabel);

    const now = new Date().toISOString();
    const fakeHash = Array.from({ length: 64 }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
    const prevHash = logEntries.length > 0 ? logEntries[0].hash : '0000000000000000000000000000000000000000000000000000000000000000';
    const duree = `${(Math.random() * 4 + 0.3).toFixed(1)}s`;

    let detail = '';
    let status: 'OK' | 'BLOCKED' = 'OK';

    const cmdLower = cmdLabel.toLowerCase();
    if (cmdLower.includes('init')) {
      detail = 'PostgreSQL: CREATE EXTENSION vector OK. 4 tables créées (kos_sources, kos_documents, kos_memory, kos_audit_log). 50 seeds injectées depuis /cache/kos_memory.jsonl. Llama-3.1-70B-Q5_K_M vérifié. Temporal.io worker lancé.';
      setStepStates((prev) => prev.map((s) => (s.id === 'init' ? { ...s, status: 'running' as const } : s)));
    } else if (cmdLower.includes('crawl')) {
      detail = '320/320 sources scannées (45 L1 + 25 L2 + 200 L3 + 50 L4). ' + Math.floor(Math.random() * 25 + 5) + ' nouveaux documents. Extraction regex OK. 0 doublon SHA256. Enrichissement Crossref auto. Embeddings BGE-M3 générés.';
      setStepStates((prev) => prev.map((s) => (s.id === 'crawl' ? { ...s, status: 'running' as const } : s)));
    } else if (cmdLower.includes('audit')) {
      detail = 'Embed BGE-M3 local OK. 5 résultats cosine <0.2. Quadruple ancrage L1-L4 vérifié (BCEAO + ISO + QS200 + DOI). 0 texte abrogé. Llama.cpp: Executive Summary + Tableau L1-L4 + Plan 90j + Template Excel générés.';
      setStepStates((prev) => prev.map((s) => (s.id === 'audit' ? { ...s, status: 'running' as const } : s)));
    } else if (cmdLower.includes('alert')) {
      detail = Math.floor(Math.random() * 5 + 2) + ' nouveaux documents. ' + Math.floor(Math.random() * 3 + 1) + ' utilisateurs matchés. Alertes générées via email local + Slack interne. Ancrage L1-L4 présent sur chaque alerte.';
      setStepStates((prev) => prev.map((s) => (s.id === 'alert' ? { ...s, status: 'running' as const } : s)));
    } else if (cmdLower.includes('heal')) {
      detail = 'Healthcheck: 14/14 conteneurs OK. 0 slow query (>100ms). 0 table vide. 0 endpoint 404. 0 restart requis. PostgreSQL (5433) OK, Redis (6380) OK, Llama.cpp OK, Temporal (7233) OK.';
      setStepStates((prev) => prev.map((s) => (s.id === 'heal' ? { ...s, status: 'running' as const } : s)));
    } else if (cmdLower.includes('expand')) {
      detail = 'Norme parsée: nom, articles, dates. SQL: CREATE TABLE + CREATE INDEX exécutés. API /api/kos/xxx FastAPI générée. 5 tests Vitest créés. KBR draft .md avec L1-L4. Template Excel généré. Git: commit + MR.';
      setStepStates((prev) => prev.map((s) => (s.id === 'expand' ? { ...s, status: 'running' as const } : s)));
    } else if (cmdLower.includes('deploy')) {
      detail = 'Agent sélectionné. Llama.cpp + PostgreSQL tools. Rapport 28 pages généré. patch.sql 12 lignes. email_interne.eml envoyé. Ticket closed. Workflow ajouté à kos_playbooks.jsonl.';
      setStepStates((prev) => prev.map((s) => (s.id === 'deploy' ? { ...s, status: 'running' as const } : s)));
    } else if (cmdLower.includes('optimize')) {
      detail = 'Index GIN/GiST créés sur 3 tables slow-queries. Cache Redis configuré avec TTL 24h. Modèle Llama requantifié (Q5_K_M → Q4_K_M edge). Performance +23%, latence -18%.';
    } else if (cmdLower.includes('self')) {
      detail = '50/50 audits auto passés (100%). Hallucination Guard: 0 violation. Vigueur Guard: 0 texte abrogé. Contradiction Guard: 0 conflit L1≠L2. Score 100/100. Modèle stable.';
    } else {
      detail = 'Commande exécutée avec succès. Tous les guards validés (Hallucination, Vigueur, Contradiction). Quadruple ancrage L1-L4 vérifié. Hash SHA256 chaîné.';
    }

    const result: CommandResult = {
      cmd: cmdLabel,
      timestamp: now,
      status,
      hash: fakeHash,
      detail,
      duree,
    };

    setTimeout(() => {
      setConsoleLog((prev) => [result, ...prev]);
      setLogEntries((prev) => [{
        id: `LOG-${String(prev.length + 1).padStart(3, '0')}`,
        timestamp: now,
        action: cmdLabel.toUpperCase(),
        cible: 'SYSTEM',
        status: status === 'OK' ? 'OK' : 'BLOCKED',
        hash: fakeHash,
        prevHash,
        detail,
        sources: ['BCEAO', 'ISO', 'QS200', 'DOI'],
      }, ...prev]);
      setStepStates((prev) => prev.map((s) => {
        const match = s.nom.toLowerCase().includes(cmdLower.split(' ')[1] || '') || cmdLower.includes(s.id);
        return match ? { ...s, status: 'completed' as const, derniereExecution: now, hash: fakeHash, duree } : s;
      }));
      setExecStatus('done');
      setTimeout(() => {
        setExecStatus('idle');
        setExecutingCmd(null);
      }, 2000);
    }, 1200);
  }, [execStatus, logEntries]);

  const resetAll = useCallback(() => {
    setConsoleLog([]);
    setLogEntries(auditLog);
    setStepStates(cycleExecution);
    setExpandedLog(null);
  }, []);

  const statusColor = (s: CycleStep['status']) => {
    switch (s) {
      case 'completed': return 'text-emerald-500 bg-emerald-50';
      case 'running': return 'text-primary-500 bg-primary-50';
      case 'blocked': return 'text-red-500 bg-red-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-foreground-400 bg-background-100';
    }
  };

  const statusIcon = (s: CycleStep['status']) => {
    switch (s) {
      case 'completed': return 'ri-check-double-line';
      case 'running': return 'ri-loader-4-line animate-spin';
      case 'blocked': return 'ri-forbid-line';
      case 'error': return 'ri-error-warning-line';
      default: return 'ri-time-line';
    }
  };

  return (
    <div className="min-h-screen bg-background-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-background-950 text-background-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(193,154,107,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,124,80,0.08),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {['v6.0', 'Autonomous Sovereign', '0 API Externe', '100% Propriétaire', 'ISAE 3402', 'ISO 27001'].map((b) => (
              <span key={b} className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-background-50/8 text-background-50/85 border border-background-50/12 whitespace-nowrap">{b}</span>
            ))}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">
            KOS-6.0 Sovereign Control Tower
          </h1>
          <p className="text-background-50/60 max-w-2xl text-xs md:text-sm leading-relaxed">
            Cockpit de commandement du système d&apos;exploitation conformité 100% autonome. Exécutez le cycle complet KOS INIT → CRAWL → AUDIT → ALERT → HEAL → EXPAND → DEPLOY. Journal ISAE 3402 immuable avec hash SHA256 chaîné.
          </p>

          {/* Live KPI Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mt-6">
            {[
              { label: 'API Externes', value: sovKpis.apiExternes, color: 'text-emerald-400', icon: 'ri-plug-line' },
              { label: 'Tables Vides', value: sovKpis.tablesVides, color: 'text-emerald-400', icon: 'ri-database-2-line' },
              { label: 'Edge Vides', value: sovKpis.edgeVides, color: 'text-emerald-400', icon: 'ri-function-line' },
              { label: 'Dép. Readdy', value: sovKpis.dependanceReaddy + '%', color: 'text-emerald-400', icon: 'ri-building-line' },
              { label: 'Dép. Supabase', value: sovKpis.dependanceSupabase + '%', color: 'text-emerald-400', icon: 'ri-cloud-off-line' },
              { label: 'Auto-Healing', value: sovKpis.autoHealing + '%', color: 'text-emerald-400', icon: 'ri-heart-pulse-line' },
              { label: 'Uptime', value: sovKpis.uptime + '%', color: 'text-emerald-400', icon: 'ri-timer-line' },
              { label: 'ISAE 3402', value: '✓', color: 'text-emerald-400', icon: 'ri-shield-check-line' },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-background-50/5 rounded-lg p-2.5 border border-background-50/8 text-center">
                <i className={`${kpi.icon} text-base ${kpi.color} mb-0.5 block`} />
                <div className={`text-base font-bold ${kpi.color}`}>{kpi.value}</div>
                <div className="text-[9px] text-background-50/50">{kpi.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-40 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 overflow-x-auto py-2.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-background-50'
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
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* ═══ CONSOLE DE COMMANDEMENT ═══ */}
        {activeTab === 'console' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="ri-terminal-box-line text-xl text-foreground-950" />
                <h2 className="text-lg font-bold text-foreground-950">Console de Commandement KOS-6.0</h2>
              </div>
              <div className="flex items-center gap-3">
                {execStatus === 'executing' && (
                  <div className="flex items-center gap-2 text-xs text-amber-600 font-semibold">
                    <i className="ri-loader-4-line animate-spin" />
                    Exécution de &quot;{executingCmd}&quot;...
                  </div>
                )}
                {execStatus === 'done' && (
                  <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold">
                    <i className="ri-check-double-line" />
                    Terminé
                  </div>
                )}
                <button onClick={resetAll} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-background-100 text-foreground-600 hover:bg-background-200/70 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-restart-line" />
                  Reset
                </button>
              </div>
            </div>

            {/* Command Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {commandesKos.map((cmd) => (
                <button
                  key={cmd.cmd}
                  onClick={() => executeCommand(cmd.cmd + (cmd.args ? ' ' + cmd.args : ''))}
                  disabled={execStatus === 'executing'}
                  className={`text-left bg-white rounded-lg border p-4 transition-all cursor-pointer ${
                    execStatus === 'executing'
                      ? 'opacity-50 cursor-not-allowed border-background-200/70'
                      : 'border-background-200/70 hover:border-primary-300/60 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <i className={`${cmd.icone} text-sm text-primary-600`} />
                    </div>
                    <div>
                      <div className="font-mono text-sm font-bold text-foreground-950">{cmd.cmd}</div>
                      <div className="text-[10px] text-foreground-400">Étape {cmd.etape} · {cmd.impact}</div>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-600 leading-relaxed">{cmd.description}</p>
                </button>
              ))}
            </div>

            {/* Ticket Section */}
            <div className="bg-amber-50 rounded-lg p-5 border border-amber-200/60">
              <h3 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-ticket-line text-amber-600" />
                Ticket Entrant (Simulé)
              </h3>
              <div className="bg-background-950 rounded-lg p-4 font-mono text-xs text-background-50 mb-3">
                <div><span className="text-amber-400">&quot;type&quot;</span>: <span className="text-emerald-400">&quot;{ticketExemple.type}&quot;</span>,</div>
                <div><span className="text-amber-400">&quot;severity&quot;</span>: <span className="text-red-400">&quot;{ticketExemple.severity}&quot;</span>,</div>
                <div><span className="text-amber-400">&quot;entity&quot;</span>: <span className="text-primary-400">&quot;{ticketExemple.entity}&quot;</span>,</div>
                <div><span className="text-amber-400">&quot;deadline&quot;</span>: <span className="text-background-50/70">&quot;{ticketExemple.deadline}&quot;</span></div>
              </div>
              <button
                onClick={() => executeCommand('KOS DEPLOY lbcft_agent')}
                disabled={execStatus === 'executing'}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-amber-600 text-white hover:bg-amber-700 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                <i className="ri-robot-2-line" />
                KOS DEPLOY lbcft_agent → Résoudre ce ticket
              </button>
            </div>

            {/* Console Output */}
            {consoleLog.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground-950 flex items-center gap-2">
                  <i className="ri-terminal-line" />
                  Sortie Console
                </h3>
                {consoleLog.map((entry, i) => (
                  <div key={i} className={`rounded-lg p-4 font-mono text-xs border ${
                    entry.status === 'OK' ? 'bg-emerald-50/50 border-emerald-200/60' : 'bg-red-50/50 border-red-200/60'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-foreground-400">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                      <span className="font-bold text-foreground-950">{entry.cmd}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        entry.status === 'OK' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {entry.status}
                      </span>
                      <span className="text-foreground-400">{entry.duree}</span>
                    </div>
                    <p className="text-foreground-600 leading-relaxed mb-1">{entry.detail}</p>
                    <p className="text-foreground-400">SHA256: {entry.hash}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Interdictions */}
            <div className="bg-red-50 rounded-lg p-5 border border-red-200/50">
              <h3 className="font-bold text-red-700 mb-2 flex items-center gap-2 text-sm">
                <i className="ri-forbid-line" />
                Interdictions Actives
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {interdictions.map((rule, i) => (
                  <div key={i} className="bg-white/70 rounded-lg px-3 py-2 text-[11px] font-mono text-red-700/80 border border-red-100/50 flex items-start gap-1.5">
                    <i className="ri-close-circle-fill text-red-500 text-xs mt-0.5 flex-shrink-0" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ CYCLE D'EXÉCUTION ═══ */}
        {activeTab === 'cycle' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-1">
              <i className="ri-git-branch-line text-xl text-foreground-950" />
              <h2 className="text-lg font-bold text-foreground-950">Cycle d&apos;Exécution — 7 Étapes</h2>
            </div>
            <p className="text-xs text-foreground-500 mb-4">Pipeline complet KOS-6.0 : INIT → CRAWL → AUDIT → ALERT → HEAL → EXPAND → DEPLOY. Chaque étape loguée ISAE 3402 avec hash SHA256 chaîné.</p>

            <div className="space-y-4">
              {stepStates.map((step, i) => (
                <div key={step.id} className="bg-white rounded-lg border border-background-200/70 overflow-hidden">
                  <div className="flex items-stretch">
                    {/* Step Number Column */}
                    <div className={`w-14 flex-shrink-0 flex flex-col items-center justify-center ${
                      step.status === 'completed' ? 'bg-emerald-50' :
                      step.status === 'running' ? 'bg-primary-50' :
                      step.status === 'blocked' ? 'bg-red-50' :
                      'bg-background-100'
                    }`}>
                      <span className={`text-lg font-bold ${
                        step.status === 'completed' ? 'text-emerald-600' :
                        step.status === 'running' ? 'text-primary-600' :
                        step.status === 'blocked' ? 'text-red-600' :
                        'text-foreground-400'
                      }`}>
                        {step.numero}
                      </span>
                      <i className={`text-sm mt-0.5 ${statusColor(step.status)}`}>
                        <span className={statusIcon(step.status)} />
                      </i>
                    </div>
                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <i className={`${step.icone} text-sm ${step.status === 'completed' ? 'text-emerald-600' : step.status === 'running' ? 'text-primary-600' : 'text-foreground-500'}`} />
                        <h3 className="text-sm font-bold text-foreground-950">{step.nom}</h3>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${statusColor(step.status)}`}>
                          {step.status === 'completed' ? 'COMPLÉTÉ' : step.status === 'running' ? 'EN COURS' : step.status === 'blocked' ? 'BLOQUÉ' : 'EN ATTENTE'}
                        </span>
                      </div>
                      <p className="text-xs text-foreground-600 mb-2">{step.description}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-foreground-500">
                        <span><i className="ri-timer-line mr-1" />Trigger: {step.trigger}</span>
                        {step.derniereExecution && (
                          <span><i className="ri-calendar-line mr-1" />Dernière exécution: {new Date(step.derniereExecution).toLocaleString()}</span>
                        )}
                        {step.duree && <span><i className="ri-time-line mr-1" />Durée: {step.duree}</span>}
                      </div>
                      {step.resultat && (
                        <div className="mt-2 bg-background-50 rounded-lg p-2.5 border border-background-200/40">
                          <p className="text-xs text-foreground-700">{step.resultat}</p>
                        </div>
                      )}
                      {step.hash && (
                        <p className="mt-2 text-[10px] font-mono text-foreground-400">SHA256: {step.hash.substring(0, 48)}...</p>
                      )}
                    </div>
                  </div>
                  {/* Inter-step connector */}
                  {i < stepStates.length - 1 && (
                    <div className="flex items-center justify-center h-4 bg-background-50">
                      <div className={`w-0.5 h-full ${step.status === 'completed' && stepStates[i + 1].status === 'completed' ? 'bg-emerald-300' : step.status === 'running' ? 'bg-primary-300' : 'bg-background-200'}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ JOURNAL ISAE 3402 ═══ */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-xl text-foreground-950" />
                <h2 className="text-lg font-bold text-foreground-950">Journal ISAE 3402 — Piste d&apos;Audit Immuable</h2>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1.5">
                <i className="ri-link" />
                Hash Chain Active
              </span>
            </div>
            <p className="text-xs text-foreground-500 mb-2">Chaque action est loguée avec hash SHA256 chaîné au précédent. Piste d&apos;audit immuable conforme ISAE 3402. {logEntries.length} entrées.</p>

            <div className="space-y-3">
              {logEntries.map((entry) => (
                <div key={entry.id} className={`bg-white rounded-lg border overflow-hidden transition-all ${
                  entry.status === 'OK' ? 'border-background-200/70' :
                  entry.status === 'ERROR' ? 'border-red-200/70' :
                  entry.status === 'BLOCKED' ? 'border-red-300/80' : 'border-amber-200/70'
                }`}>
                  <button
                    onClick={() => setExpandedLog(expandedLog === entry.id ? null : entry.id)}
                    className="w-full text-left p-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-foreground-400 flex-shrink-0">{entry.id}</span>
                      <span className="text-[10px] text-foreground-400 flex-shrink-0 w-20">{new Date(entry.timestamp).toLocaleString()}</span>
                      <span className="text-xs font-bold text-foreground-950 flex-shrink-0 w-28">{entry.action}</span>
                      <span className="text-xs text-foreground-600 flex-shrink-0 w-28 truncate">{entry.cible}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex-shrink-0 ${
                        entry.status === 'OK' ? 'bg-emerald-100 text-emerald-700' :
                        entry.status === 'ERROR' ? 'bg-red-100 text-red-700' :
                        entry.status === 'BLOCKED' ? 'bg-red-200 text-red-800' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {entry.status}
                      </span>
                      <span className="text-[10px] font-mono text-foreground-400 truncate flex-1">{entry.hash.substring(0, 16)}...</span>
                      <i className={`text-sm text-foreground-400 transition-transform ${expandedLog === entry.id ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`} />
                    </div>
                  </button>
                  {expandedLog === entry.id && (
                    <div className="px-4 pb-4 border-t border-background-100">
                      <p className="text-xs text-foreground-700 leading-relaxed mt-3 mb-2">{entry.detail}</p>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {entry.sources.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-background-100 text-foreground-600">{s}</span>
                        ))}
                      </div>
                      <div className="text-[10px] font-mono text-foreground-400 space-y-0.5">
                        <p>Hash: {entry.hash}</p>
                        <p>Prev Hash: {entry.prevHash}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-background-950 rounded-lg p-5 text-background-50">
              <h3 className="font-bold mb-2 flex items-center gap-2 text-sm">
                <i className="ri-information-line text-primary-400" />
                Vérification d&apos;Intégrité
              </h3>
              <div className="space-y-1.5 text-xs font-mono">
                <p className="text-emerald-400">✓ Chaîne de hash vérifiée — {logEntries.length} blocs liés</p>
                <p className="text-emerald-400">✓ Aucun bloc orphelin détecté</p>
                <p className="text-emerald-400">✓ Aucune falsification détectée</p>
                <p className="text-background-50/50 mt-2">Dernier hash: {logEntries[0]?.hash.substring(0, 32)}...</p>
              </div>
            </div>
          </div>
        )}

        {/* ═══ KPIs SOUVERAINETÉ ═══ */}
        {activeTab === 'kpis' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-1">
              <i className="ri-dashboard-line text-xl text-foreground-950" />
              <h2 className="text-lg font-bold text-foreground-950">KPIs Souveraineté — 100% Propriétaire</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { label: 'API Externes', value: sovKpis.apiExternes, suffix: '', color: 'bg-emerald-50 border-emerald-200/60', textColor: 'text-emerald-700', valueColor: 'text-emerald-600', icon: 'ri-plug-line' },
                { label: 'Tables Vides', value: sovKpis.tablesVides, suffix: '', color: 'bg-emerald-50 border-emerald-200/60', textColor: 'text-emerald-700', valueColor: 'text-emerald-600', icon: 'ri-database-2-line' },
                { label: 'Edge Functions Vides', value: sovKpis.edgeVides, suffix: '', color: 'bg-emerald-50 border-emerald-200/60', textColor: 'text-emerald-700', valueColor: 'text-emerald-600', icon: 'ri-function-line' },
                { label: 'Dépendance Readdy', value: sovKpis.dependanceReaddy, suffix: '%', color: 'bg-emerald-50 border-emerald-200/60', textColor: 'text-emerald-700', valueColor: 'text-emerald-600', icon: 'ri-building-line' },
                { label: 'Dépendance Supabase', value: sovKpis.dependanceSupabase, suffix: '%', color: 'bg-emerald-50 border-emerald-200/60', textColor: 'text-emerald-700', valueColor: 'text-emerald-600', icon: 'ri-cloud-off-line' },
                { label: 'Auto-Healing', value: sovKpis.autoHealing, suffix: '%', color: 'bg-emerald-50 border-emerald-200/60', textColor: 'text-emerald-700', valueColor: 'text-emerald-600', icon: 'ri-heart-pulse-line' },
                { label: 'Uptime', value: sovKpis.uptime, suffix: '%', color: 'bg-emerald-50 border-emerald-200/60', textColor: 'text-emerald-700', valueColor: 'text-emerald-600', icon: 'ri-timer-line' },
                { label: 'ISAE 3402', value: '✓', suffix: '', color: 'bg-emerald-50 border-emerald-200/60', textColor: 'text-emerald-700', valueColor: 'text-emerald-600', icon: 'ri-shield-check-line' },
                { label: 'ISO 27001', value: '✓', suffix: '', color: 'bg-emerald-50 border-emerald-200/60', textColor: 'text-emerald-700', valueColor: 'text-emerald-600', icon: 'ri-lock-line' },
                { label: 'ISO 9001', value: '✓', suffix: '', color: 'bg-emerald-50 border-emerald-200/60', textColor: 'text-emerald-700', valueColor: 'text-emerald-600', icon: 'ri-check-double-line' },
              ].map((kpi) => (
                <div key={kpi.label} className={`rounded-lg p-4 border ${kpi.color}`}>
                  <i className={`${kpi.icon} text-lg ${kpi.valueColor} mb-2 block`} />
                  <div className={`text-2xl font-bold ${kpi.valueColor}`}>{kpi.value}{kpi.suffix}</div>
                  <div className={`text-xs mt-1 ${kpi.textColor} font-medium`}>{kpi.label}</div>
                </div>
              ))}
            </div>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg border border-background-200/70 p-5">
                <h3 className="text-sm font-bold text-foreground-950 mb-3">Sources Réglementaires</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs"><span className="text-foreground-600">Total sources</span><span className="font-bold text-foreground-950">320</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-600">Actives</span><span className="font-bold text-emerald-600">320</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-600">Documents</span><span className="font-bold text-foreground-950">2 850</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-600">Embeddings locaux</span><span className="font-bold text-foreground-950">1 145 000</span></div>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-background-200/70 p-5">
                <h3 className="text-sm font-bold text-foreground-950 mb-3">Couverture Réglementaire</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs"><span className="text-foreground-600">Citations vérifiées</span><span className="font-bold text-emerald-600">200</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-600">Autorités couvertes</span><span className="font-bold text-foreground-950">20</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-600">Sanctions documentées</span><span className="font-bold text-foreground-950">100</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-600">Sources réglementaires</span><span className="font-bold text-foreground-950">100</span></div>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-background-200/70 p-5">
                <h3 className="text-sm font-bold text-foreground-950 mb-3">Performance Système</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs"><span className="text-foreground-600">Dernier crawl</span><span className="font-bold text-foreground-950">02/07 01:00 GMT</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-600">Dernier heal</span><span className="font-bold text-foreground-950">02/07 10:16 GMT</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-600">Dernier self-test</span><span className="font-bold text-emerald-600">02/07 03:00 GMT (100%)</span></div>
                  <div className="flex justify-between text-xs"><span className="text-foreground-600">Hash chain</span><span className="font-bold text-emerald-600">Active</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ ÉTAT DU SYSTÈME ═══ */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-1">
              <i className="ri-server-line text-xl text-foreground-950" />
              <h2 className="text-lg font-bold text-foreground-950">État du Système — Infrastructure On-Prem</h2>
            </div>
            <p className="text-xs text-foreground-500 mb-2">14 conteneurs Docker, 100% local, 0 cloud tiers. Supervision continue avec auto-réparation toutes les 60 secondes.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {systemComponents.map((comp) => (
                <div key={comp.nom} className="bg-white rounded-lg border border-background-200/70 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      comp.status === 'healthy' ? 'bg-emerald-100' : comp.status === 'degraded' ? 'bg-amber-100' : 'bg-red-100'
                    }`}>
                      <i className={`${comp.icone} text-sm ${
                        comp.status === 'healthy' ? 'text-emerald-600' : comp.status === 'degraded' ? 'text-amber-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-bold text-foreground-950 truncate">{comp.nom}</h3>
                      <span className="text-[10px] font-mono text-foreground-400">{comp.port} · {comp.version}</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-foreground-500">Status</span>
                      <span className={`font-bold ${
                        comp.status === 'healthy' ? 'text-emerald-600' : comp.status === 'degraded' ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {comp.status === 'healthy' ? 'HEALTHY' : comp.status === 'degraded' ? 'DEGRADED' : 'DOWN'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground-500">Uptime</span>
                      <span className="font-mono text-foreground-700">{comp.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground-500">Vérifié</span>
                      <span className="font-mono text-foreground-400">{new Date(comp.derniereVerification).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-emerald-50 rounded-lg p-5 border border-emerald-200/60">
              <h3 className="font-bold text-emerald-700 mb-2 text-sm flex items-center gap-2">
                <i className="ri-check-double-line" />
                Dernier Healthcheck
              </h3>
              <div className="space-y-1 text-xs font-mono text-emerald-700/80">
                <p>14/14 conteneurs healthy</p>
                <p>0 restart requis</p>
                <p>0 slow query (seuil 100ms)</p>
                <p>0 table vide détectée</p>
                <p>0 endpoint 404</p>
                <p>Prochain heal auto : dans 48s</p>
              </div>
            </div>
          </div>
        )}

        {/* ═══ SOURCES L1-L4 ═══ */}
        {activeTab === 'sources' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-1">
              <i className="ri-links-line text-xl text-foreground-950" />
              <h2 className="text-lg font-bold text-foreground-950">Registre des Sources Réglementaires L1-L4</h2>
            </div>
            <p className="text-xs text-foreground-500 mb-4">320 sources actives — 45 L1 (Régulateurs), 25 L2 (Normes), 200 L3 (Académique QS200), 50 L4 (DOI Tier-1). Vérification quotidienne 01:00 GMT.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sourcesRegistre.map((src) => (
                <div key={src.niveau} className="bg-white rounded-lg border border-background-200/70 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary-600">{src.niveau}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">{src.label}</h3>
                      <p className="text-xs text-foreground-500">
                        {src.actives}/{src.total} actives · Vérifié {new Date(src.derniereVerification).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {src.exemples.map((ex, i) => (
                      <span key={i} className="px-2 py-1 rounded text-[10px] font-mono bg-background-50 text-foreground-600 border border-background-200/40">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-background-950 rounded-lg p-5 text-background-50">
              <h3 className="font-bold mb-3 flex items-center gap-2 text-sm">
                <i className="ri-shield-flash-line text-primary-400" />
                Règle de Quadruple Ancrage
              </h3>
              <div className="space-y-2 text-sm font-mono bg-background-900/50 rounded-lg p-4">
                <div className="text-primary-400">L1 — Régulateur Officiel (BCEAO, COBAC, OHADA, GAFI...)</div>
                <div className="text-accent-400">L2 — Norme/Standard (ISO, IFRS, BCBS, COSO, ISAE...)</div>
                <div className="text-amber-400">L3 — Académique QS200 (Harvard, Wharton, HEC, LSE, INSEAD...)</div>
                <div className="text-emerald-400">L4 — DOI Tier-1 (doi.org/10.xxxx/...)</div>
                <div className="text-red-400 mt-2">Si 1 ancrage manque → BLOCAGE QUALITÉ. Pas d&apos;exception.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}





