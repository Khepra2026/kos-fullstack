import { useState, useCallback, useEffect, useRef } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import {
  SOVEREIGN_INIT_PHASES,
  INIT_SEQUENCE,
  SOVEREIGN_INIT_STATS,
  type InitPhase,
} from '@/mocks/kosSovereignInit';

type ExecutionState = 'idle' | 'executing' | 'complete';

export default function KOSSovereignInitPage() {
  const [phases, setPhases] = useState<InitPhase[]>(() => SOVEREIGN_INIT_PHASES.map(p => ({ ...p, status: 'pending' as const, logLines: [] as string[] })));
  const [execState, setExecState] = useState<ExecutionState>('idle');
  const [currentPhase, setCurrentPhase] = useState(0);
  const [selectedPhase, setSelectedPhase] = useState<number>(0);
  const [showFullLog, setShowFullLog] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const activePhase = phases[currentPhase];
  const displayPhase = phases[selectedPhase];

  const runAll = useCallback(async () => {
    if (execState === 'executing') return;
    setExecState('executing');
    setTerminalOutput(['$ kos-sovereign init --mode production', '']);

    const allPhases = [...SOVEREIGN_INIT_PHASES];
    for (let i = 0; i < allPhases.length; i++) {
      setCurrentPhase(i);
      setPhases(prev => prev.map((p, idx) => idx === i ? { ...allPhases[idx], status: 'running' as const } : p));

      // Add command line
      setTerminalOutput(prev => [...prev, `$ ${allPhases[i].command}`, '']);

      // Stream log lines
      const lines = allPhases[i].logLines;
      for (let j = 0; j < lines.length; j++) {
        await new Promise(r => setTimeout(r, 30 + Math.random() * 60));
        // Append to the phase's visible log
        setPhases(prev => {
          const np = [...prev];
          const currentLog = [...(np[i].logLines || []), lines[j]];
          np[i] = { ...np[i], logLines: currentLog };
          return np;
        });
        setTerminalOutput(prev => [...prev, lines[j]]);
      }

      await new Promise(r => setTimeout(r, 300));
      setPhases(prev => prev.map((p, idx) => idx === i ? { ...p, status: 'completed' as const } : p));
      setTerminalOutput(prev => [...prev, '', `✅ Phase ${i + 1} COMPLETE — ${allPhases[i].duration}`, '']);
    }

    setTerminalOutput(prev => [...prev, '', '════════════════════════════════════════', '🎉 KOS SOVEREIGN INIT: GENESIS COMPLETE', '   Dette: ZÉRO · ISO: ALL · Big Four: 150%', '   Mode: SOVEREIGN · API externes: 0', '════════════════════════════════════════', '']);
    setExecState('complete');
  }, [execState]);

  const reset = useCallback(() => {
    setPhases(SOVEREIGN_INIT_PHASES.map(p => ({ ...p, status: 'pending' as const, logLines: [] as string[] })));
    setExecState('idle');
    setCurrentPhase(0);
    setTerminalOutput([]);
    setShowFullLog(false);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const statusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'running': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'failed': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-background-100 text-foreground-500 border-background-200';
    }
  };

  const statusDot = (status: string): string => {
    switch (status) {
      case 'completed': return 'ri-check-double-fill text-emerald-500';
      case 'running': return 'ri-loader-4-fill animate-spin text-amber-500';
      case 'failed': return 'ri-close-circle-fill text-red-500';
      default: return 'ri-checkbox-blank-circle-line text-foreground-300';
    }
  };

  return (
    <KOSHubLayout hubId={126}>
      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(8,145,178,0.06),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {['Genesis Block', '100% Souverain', '0 API Externe', '8×H100', 'LLaMA 405B', '50M Vectors', 'ISO ALL'].map(b => (
              <span key={b} className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-background-50/8 text-background-50/80 border border-background-50/10 whitespace-nowrap">{b}</span>
            ))}
          </div>
          <h1 className="text-2xl md:text-4xl font-heading font-bold text-background-50 tracking-tight">
            KOS Sovereign Init — Genesis Block
          </h1>
          <p className="text-sm md:text-base text-foreground-400 mt-3 max-w-3xl leading-relaxed">
            Séquence d&apos;initialisation souveraine du Knowledge Operating System.
            Déploiement GPU 8×H100, LLaMA 405B fine-tuné Khepra, 50M vecteurs MEMEX,
            Swarm 25 agents, vérification dette zéro et certification Big Four 150%.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mt-6">
            {[
              { label: 'GPUs', value: '8× H100', icon: 'ri-cpu-line', color: 'text-amber-400' },
              { label: 'Modèle', value: 'LLaMA 405B', icon: 'ri-brain-line', color: 'text-cyan-400' },
              { label: 'Vecteurs', value: '50M', icon: 'ri-database-2-line', color: 'text-violet-400' },
              { label: 'Agents', value: '25', icon: 'ri-group-line', color: 'text-rose-400' },
              { label: 'Domaines', value: '5', icon: 'ri-stack-line', color: 'text-emerald-400' },
              { label: 'ISO', value: 'ALL', icon: 'ri-shield-check-line', color: 'text-green-400' },
              { label: 'Dette', value: 'ZÉRO', icon: 'ri-forbid-line', color: 'text-green-400' },
              { label: 'Big Four', value: '150%', icon: 'ri-medal-line', color: 'text-amber-400' },
            ].map(s => (
              <div key={s.label} className="bg-foreground-900/60 rounded-lg p-2.5 border border-foreground-800 text-center">
                <i className={`${s.icon} text-base ${s.color} mb-0.5 block`} />
                <div className={`text-sm font-bold ${s.color}`}>{s.value}</div>
                <div className="text-[9px] text-foreground-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main grid: Phases + Terminal */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Left: Phase Cards */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground-950 flex items-center gap-2">
                <i className="ri-terminal-box-line"></i>5 Phases d&apos;Initiation
              </h3>
              <div className="flex items-center gap-2">
                {execState === 'executing' && (
                  <span className="text-xs text-amber-600 font-semibold flex items-center gap-1.5">
                    <i className="ri-loader-4-line animate-spin"></i>
                    Phase {currentPhase + 1}/5 — {activePhase?.name}
                  </span>
                )}
                {execState === 'complete' && (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                    <i className="ri-check-double-line"></i>
                    Genesis Complete
                  </span>
                )}
                <button
                  onClick={execState === 'complete' ? reset : runAll}
                  disabled={execState === 'executing'}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    execState === 'complete'
                      ? 'bg-background-100 text-foreground-600 hover:bg-background-200/70'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <i className={execState === 'complete' ? 'ri-restart-line' : 'ri-play-fill'}></i>
                  {execState === 'complete' ? 'Reset' : 'INIT SOVEREIGN'}
                </button>
              </div>
            </div>

            {phases.map((phase, i) => (
              <div
                key={phase.id}
                onClick={() => setSelectedPhase(i)}
                className={`rounded-lg border overflow-hidden cursor-pointer transition-all ${
                  selectedPhase === i
                    ? 'border-foreground-300 ring-2 ring-foreground-200'
                    : phase.status === 'running'
                      ? 'border-amber-300 bg-amber-50/30'
                      : phase.status === 'completed'
                        ? 'border-emerald-200 bg-emerald-50/30'
                        : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                }`}
              >
                <div className="flex items-stretch">
                  {/* Phase number */}
                  <div
                    className="w-12 flex-shrink-0 flex flex-col items-center justify-center"
                    style={{ backgroundColor: phase.status === 'completed' ? '#ecfdf5' : phase.status === 'running' ? '#fffbeb' : '#f9fafb' }}
                  >
                    <span className="text-lg font-bold" style={{ color: phase.color }}>
                      {phase.phase}
                    </span>
                    <i className={`text-xs mt-0.5 ${statusDot(phase.status)}`}></i>
                  </div>
                  {/* Content */}
                  <div className="flex-1 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-foreground-950">Phase {phase.phase}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium border ${statusColor(phase.status)}`}>
                        {phase.status === 'completed' ? 'COMPLÉTÉ' : phase.status === 'running' ? 'EN COURS' : 'EN ATTENTE'}
                      </span>
                      <span className="text-[10px] text-foreground-400 font-mono ml-auto">{phase.duration}</span>
                    </div>
                    <div className="font-mono text-xs text-emerald-700 bg-foreground-950 text-emerald-400 rounded px-2 py-1.5 mb-1.5 overflow-x-auto whitespace-pre-wrap break-all">
                      $ {phase.command}
                    </div>
                    <p className="text-[11px] text-foreground-500 leading-relaxed">{phase.description}</p>
                    {/* Mini log preview when running */}
                    {(phase.status === 'running' || phase.status === 'completed') && phase.logLines && phase.logLines.length > 0 && (
                      <div className="mt-2 bg-foreground-950 rounded-md p-2 font-mono text-[10px] text-emerald-400 max-h-20 overflow-y-auto">
                        {phase.logLines.slice(-4).map((line, lIdx) => (
                          <div key={lIdx} className="leading-relaxed">{line}</div>
                        ))}
                        {phase.logLines.length > 4 && (
                          <div className="text-foreground-500 mt-0.5">... {phase.logLines.length - 4} more lines</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Detail Panel + Terminal */}
          <div className="lg:col-span-2 space-y-4">
            {/* Phase Detail */}
            {displayPhase && (
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${displayPhase.color}15` }}>
                    <i className={`${displayPhase.icon} text-lg`} style={{ color: displayPhase.color }}></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">Phase {displayPhase.phase}</h3>
                    <p className="text-xs text-foreground-500">{displayPhase.name}</p>
                  </div>
                  <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-medium border ${statusColor(displayPhase.status)}`}>
                    {displayPhase.status === 'completed' ? 'COMPLÉTÉ' : displayPhase.status === 'running' ? 'EN COURS' : 'EN ATTENTE'}
                  </span>
                </div>

                <p className="text-xs text-foreground-600 leading-relaxed mb-4">{displayPhase.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {displayPhase.metrics.map(m => (
                    <div key={m.label} className="p-2 bg-background-100 rounded-lg">
                      <div className="text-sm font-bold text-foreground-950">{m.value}</div>
                      <div className="text-[10px] text-foreground-500">{m.label}</div>
                      <div className="text-[10px] text-foreground-400 mt-0.5 leading-tight">{m.detail}</div>
                    </div>
                  ))}
                </div>

                {/* Hardware specs */}
                {displayPhase.hardware && (
                  <div className="mb-4">
                    <div className="text-[11px] font-semibold text-foreground-700 mb-2 flex items-center gap-1.5">
                      <i className="ri-server-line text-foreground-500"></i>Hardware
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {displayPhase.hardware.map(h => (
                        <div key={h.label} className="text-[11px]">
                          <span className="text-foreground-400">{h.label}: </span>
                          <span className="text-foreground-700 font-medium">{h.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sequence Steps */}
                {INIT_SEQUENCE[displayPhase.phase - 1] && (
                  <div>
                    <div className="text-[11px] font-semibold text-foreground-700 mb-2 flex items-center gap-1.5">
                      <i className="ri-list-check-2 text-foreground-500"></i>Étapes
                    </div>
                    <div className="space-y-1">
                      {INIT_SEQUENCE[displayPhase.phase - 1].steps.map((st, sIdx) => {
                        const stepStatus = displayPhase.status === 'running'
                          ? (sIdx * 2 < (displayPhase.logLines?.length || 0) ? 'ok' : 'pending')
                          : displayPhase.status === 'completed' ? 'ok' : 'pending';
                        return (
                          <div key={st.step} className="flex items-start gap-2 text-[11px]">
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              stepStatus === 'ok' ? 'bg-emerald-100 text-emerald-600' : 'bg-background-100 text-foreground-400'
                            }`}>
                              {stepStatus === 'ok' ? '✓' : st.step}
                            </span>
                            <div>
                              <span className="text-foreground-700 font-medium">{st.label}</span>
                              <span className="text-foreground-400 ml-1">— {st.detail}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Terminal */}
            <div className="bg-foreground-950 rounded-lg border border-foreground-800 overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-foreground-900 border-b border-foreground-800">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="ml-3 text-[10px] text-foreground-500 font-mono">kos-terminal — sovereign@genesis</span>
                {execState === 'executing' && (
                  <span className="ml-auto text-[10px] text-amber-400 font-mono flex items-center gap-1">
                    <i className="ri-loader-4-line animate-spin"></i>executing
                  </span>
                )}
                {execState === 'complete' && (
                  <span className="ml-auto text-[10px] text-emerald-400 font-mono">genesis complete</span>
                )}
              </div>
              <div
                ref={terminalRef}
                className="p-4 font-mono text-[11px] leading-relaxed max-h-[400px] overflow-y-auto space-y-0.5"
              >
                {terminalOutput.length === 0 ? (
                  <div className="text-foreground-600">
                    <div className="text-foreground-500">$ _</div>
                    <div className="text-foreground-700 mt-2">Prêt pour l&apos;initialisation souveraine.</div>
                    <div className="text-foreground-700">Cliquez sur <span className="text-emerald-400 font-semibold">INIT SOVEREIGN</span> pour lancer.</div>
                  </div>
                ) : (
                  terminalOutput.map((line, i) => (
                    <div
                      key={i}
                      className={
                        line.startsWith('$') ? 'text-cyan-400' :
                        line.startsWith('✅') ? 'text-emerald-400 font-semibold' :
                        line.startsWith('═══') ? 'text-amber-400 font-semibold' :
                        line.startsWith('🎉') ? 'text-amber-300 font-bold text-sm' :
                        line.startsWith('  ↳') ? 'text-foreground-500' :
                        line.startsWith('DOMAINE:') ? 'text-rose-400 font-semibold' :
                        line.startsWith('  Dette') || line.startsWith('  ISO') || line.startsWith('  Big Four') ? 'text-foreground-400' :
                        'text-emerald-400/80'
                      }
                    >
                      {line || '\u00A0'}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Toggle full log */}
            {execState === 'complete' && (
              <button
                onClick={() => setShowFullLog(!showFullLog)}
                className="w-full text-center text-xs text-foreground-500 hover:text-foreground-700 cursor-pointer py-2"
              >
                {showFullLog ? 'Masquer les logs complets' : 'Afficher les logs complets'}
              </button>
            )}
          </div>
        </div>

        {/* Complete Logs (expandable) */}
        {showFullLog && execState === 'complete' && (
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-bold text-foreground-950 flex items-center gap-2">
              <i className="ri-file-list-3-line"></i>Logs Complets d&apos;Exécution
            </h3>
            {phases.map((phase, i) => (
              <div key={phase.id} className="bg-foreground-950 rounded-lg border border-foreground-800 overflow-hidden">
                <div className="px-4 py-2.5 bg-foreground-900 border-b border-foreground-800 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold" style={{ color: phase.color }}>
                    PHASE {phase.phase} — {phase.name} <span className="text-foreground-500 font-normal ml-2">({phase.duration})</span>
                  </span>
                  <span className="text-[10px] text-emerald-500 font-mono">{phase.status === 'completed' ? 'COMPLÉTÉ' : ''}</span>
                </div>
                <div className="p-4 font-mono text-[11px] text-emerald-400/80 leading-relaxed space-y-0.5 max-h-80 overflow-y-auto">
                  <div className="text-cyan-400 mb-1">$ {phase.command}</div>
                  {phase.logLines && phase.logLines.map((line, lIdx) => (
                    <div key={lIdx}>{line}</div>
                  ))}
                  <div className="text-emerald-400 font-semibold mt-2">✅ PHASE {phase.phase} COMPLETE</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completion Banner */}
        {execState === 'complete' && (
          <div className="mt-8 bg-emerald-50 rounded-xl border border-emerald-200 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
              <i className="ri-check-double-line text-3xl text-emerald-600"></i>
            </div>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-emerald-800 mb-2">
              GENESIS COMPLETE — KOS SOVEREIGN ACTIVE
            </h2>
            <p className="text-sm text-emerald-700 max-w-xl mx-auto leading-relaxed">
              5 phases exécutées en {SOVEREIGN_INIT_STATS.totalDuration}. Infrastructure GPU déployée, 6 boucles auto-dev actives,
              50M vecteurs seedés, Swarm 25 opérationnel, dette technique ZÉRO, certification ISO ALL & Big Four 150% confirmée.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 max-w-xl mx-auto">
              {[
                { label: 'Dette', value: 'ZÉRO', icon: 'ri-forbid-line', color: 'text-emerald-600' },
                { label: 'ISO 27001', value: '97/100', icon: 'ri-lock-line', color: 'text-emerald-600' },
                { label: 'ISO 42001', value: '95/100', icon: 'ri-robot-2-line', color: 'text-emerald-600' },
                { label: 'ISO 9001', value: '100/100', icon: 'ri-check-double-line', color: 'text-emerald-600' },
                { label: 'Big Four', value: '150%', icon: 'ri-medal-line', color: 'text-emerald-600' },
              ].map(k => (
                <div key={k.label} className="bg-white rounded-lg p-3 border border-emerald-100 text-center">
                  <i className={`${k.icon} text-lg ${k.color} mb-1 block`}></i>
                  <div className={`text-base font-bold ${k.color}`}>{k.value}</div>
                  <div className="text-[10px] text-emerald-700">{k.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </KOSHubLayout>
  );
}