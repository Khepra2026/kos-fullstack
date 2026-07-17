import { useState, useEffect, useCallback, useRef } from 'react';
import { SYSTEM_SCAN_PHASES, SYSTEM_SCAN_SUMMARY, SCAN_QUICK_STATS } from '@/mocks/kosSystemScanResults';
import type { SystemScanPhase, SystemScanFinding } from '@/mocks/kosSystemScanResults';

interface SystemScanOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

function getSeverityStyle(severity: string) {
  switch (severity) {
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500', label: 'CRITIQUE' };
    case 'major': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'MAJEUR' };
    case 'minor': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', dot: 'bg-slate-400', label: 'MINEUR' };
    case 'info': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'INFO' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', dot: 'bg-gray-400', label: 'N/A' };
  }
}

function getHealthColor(score: number): string {
  if (score >= 90) return '#86BC25';
  if (score >= 75) return '#E8C547';
  if (score >= 60) return '#E8943A';
  return '#C2410C';
}

function PhaseCard({ phase, isActive, isCompleted }: { phase: SystemScanPhase; isActive: boolean; isCompleted: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`rounded-2xl border-2 transition-all duration-500 ${
      isActive ? 'border-amber-300 bg-amber-50/30 shadow-lg shadow-amber-100/50' :
      isCompleted ? 'border-background-200 bg-white' :
      'border-background-100 bg-background-50 opacity-60'
    }`}>
      <button
        onClick={() => isCompleted && setExpanded(!expanded)}
        className="w-full p-5 flex items-center gap-4 text-left cursor-pointer"
      >
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 relative" style={{ backgroundColor: `${phase.color}15` }}>
          <i className={`${phase.icon} text-xl`} style={{ color: phase.color }} />
          {isActive && (
            <div className="absolute inset-0 rounded-2xl border-2 border-amber-400 animate-ping opacity-30" style={{ borderColor: phase.color }} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-foreground-950 font-heading">{phase.phaseName}</h3>
            {isActive && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 border border-amber-200 text-amber-700 text-[9px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                SCAN EN COURS
              </span>
            )}
            {isCompleted && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-[9px] font-bold">
                <i className="ri-check-line text-[10px]" />
                OK
              </span>
            )}
          </div>
          <p className="text-xs text-foreground-500">{phase.systemsCount} systèmes • {phase.duration}</p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-3">
          {isActive && (
            <div className="w-20 h-1.5 rounded-full bg-background-200 overflow-hidden">
              <div className="h-full rounded-full bg-amber-500 animate-pulse transition-all duration-300" style={{ width: `${phase.progress}%` }} />
            </div>
          )}
          {isCompleted && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-red-600">{phase.findings.filter(f => f.severity === 'critical').length}</span>
              <span className="text-[10px] text-foreground-400">critiques</span>
              <span className="text-xs font-bold text-amber-600">{phase.findings.filter(f => f.severity === 'major').length}</span>
              <span className="text-[10px] text-foreground-400">majeurs</span>
            </div>
          )}
          {isCompleted && (
            <i className={`ri-${expanded ? 'arrow-up-s' : 'arrow-down-s'}-line text-foreground-400`} />
          )}
        </div>
      </button>
      {expanded && isCompleted && (
        <div className="px-5 pb-5 border-t border-background-200 pt-4">
          <div className="space-y-3">
            {phase.findings.map((finding) => {
              const sev = getSeverityStyle(finding.severity);
              return (
                <div key={finding.findingId} className={`p-3 rounded-xl border ${sev.bg} ${sev.border}`}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <span className={`inline-block w-2 h-2 rounded-full ${sev.dot}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-bold ${sev.bg} ${sev.border} ${sev.text}`}>
                          {sev.label}
                        </span>
                        <span className="text-[9px] text-foreground-400">{finding.system}</span>
                        {finding.autoFixAvailable && (
                          <span className="text-[8px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full">AUTO-FIX</span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-foreground-800 mb-1">{finding.title}</p>
                      <p className="text-[10px] text-foreground-500 mb-2">{finding.description}</p>
                      <div className="flex items-center gap-4 text-[9px]">
                        <span className="text-foreground-400">
                          <span className="font-bold text-red-600">{finding.currentValue}</span>
                          {' '}→{' '}
                          <span className="font-bold text-emerald-600">{finding.targetValue}</span>
                        </span>
                        <span className="text-foreground-400">
                          <i className="ri-robot-line mr-0.5" />{finding.agentAssigned}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SystemScanOverlay({ isOpen, onClose }: SystemScanOverlayProps) {
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'completed'>('idle');
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(-1);
  const [progressValues, setProgressValues] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [showResults, setShowResults] = useState(false);
  const scanStartedRef = useRef(false);

  const startScan = useCallback(() => {
    if (scanStartedRef.current) return;
    scanStartedRef.current = true;
    setPhase('scanning');
    setShowResults(false);

    const phases = SYSTEM_SCAN_PHASES;
    let currentIdx = 0;

    const advancePhase = () => {
      if (currentIdx >= phases.length) {
        setPhase('completed');
        setTimeout(() => setShowResults(true), 500);
        return;
      }

      setCurrentPhaseIndex(currentIdx);

      // Animate progress from 0 to 100
      let prog = 0;
      const interval = setInterval(() => {
        prog += Math.random() * 15 + 5;
        if (prog >= 100) {
          prog = 100;
          clearInterval(interval);
          setProgressValues(prev => {
            const next = [...prev];
            next[currentIdx] = 100;
            return next;
          });
          currentIdx++;
          setTimeout(advancePhase, 300);
        } else {
          setProgressValues(prev => {
            const next = [...prev];
            next[currentIdx] = Math.min(prog, 100);
            return next;
          });
        }
      }, 200);
    };

    advancePhase();
  }, []);

  useEffect(() => {
    if (isOpen && !scanStartedRef.current) {
      const timer = setTimeout(startScan, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, startScan]);

  useEffect(() => {
    if (!isOpen) {
      scanStartedRef.current = false;
      setPhase('idle');
      setCurrentPhaseIndex(-1);
      setProgressValues([0, 0, 0, 0, 0, 0]);
      setShowResults(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const overallHealthColor = getHealthColor(SYSTEM_SCAN_SUMMARY.overallHealthScore);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-8 pb-8">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-foreground-950/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-foreground-950 px-6 py-8">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://readdy.ai/api/search-image?query=abstract%20dark%20technological%20background%20with%20subtle%20grid%20lines%20and%20glowing%20circuit%20patterns%20in%20deep%20charcoal%20and%20dark%20gray%20tones%20representing%20enterprise%20system%20diagnostics%20scanning%20visualization%20with%20faint%20pulsing%20nodes%20no%20text%20minimalist%20premium%20corporate%20technology%20aesthetic&width=1200&height=400&seq=kos-scan-header&orientation=landscape"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  phase === 'scanning' ? 'bg-amber-500/20' : phase === 'completed' ? 'bg-emerald-500/20' : 'bg-white/10'
                }`}>
                  <i className={`text-xl ${
                    phase === 'scanning' ? 'ri-radar-line text-amber-400 animate-spin' :
                    phase === 'completed' ? 'ri-check-double-line text-emerald-400' :
                    'ri-radar-line text-white/60'
                  }`} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-heading">
                    {phase === 'scanning' ? 'SCAN COMPLET EN COURS...' :
                     phase === 'completed' ? 'SCAN COMPLET TERMINÉ' :
                     'SCAN COMPLET SYSTÈMES KOS REGTECH AI'}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {phase === 'scanning' ? `${SYSTEM_SCAN_PHASES.length} phases · ${currentPhaseIndex + 1}/${SYSTEM_SCAN_PHASES.length} complétées` :
                     phase === 'completed' ? `${SYSTEM_SCAN_SUMMARY.totalSystems} systèmes scannés · ${SYSTEM_SCAN_SUMMARY.totalDuration}` :
                     'Diagnostic intégral de l\'écosystème KOS REGTECH AI'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-white text-lg" />
              </button>
            </div>

            {/* Quick Stats Bar */}
            {phase === 'completed' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mt-4">
                {[
                  { label: 'Agents', value: SCAN_QUICK_STATS.agentsScanned, icon: 'ri-robot-line' },
                  { label: 'Edge Functions', value: SCAN_QUICK_STATS.edgeFunctionsScanned, icon: 'ri-function-line' },
                  { label: 'Tables', value: SCAN_QUICK_STATS.tablesScanned, icon: 'ri-database-2-line' },
                  { label: 'Cron Jobs', value: SCAN_QUICK_STATS.cronJobsScanned, icon: 'ri-timer-line' },
                  { label: 'Pages', value: SCAN_QUICK_STATS.pagesScanned, icon: 'ri-file-text-line' },
                  { label: 'Sécurité', value: `${SCAN_QUICK_STATS.securityScore}%`, icon: 'ri-shield-line' },
                  { label: 'Conformité', value: `${SCAN_QUICK_STATS.complianceScore}%`, icon: 'ri-scales-line' },
                  { label: 'Performance', value: `${SCAN_QUICK_STATS.performanceScore}%`, icon: 'ri-speed-line' },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-2 rounded-xl bg-white/5 border border-white/10">
                    <i className={`${stat.icon} text-white/50 text-xs mb-1 block`} />
                    <span className="block text-lg font-bold text-white font-heading">{stat.value}</span>
                    <span className="text-[9px] text-white/40">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scan Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {phase === 'scanning' && (
            <div className="text-center py-8 mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center">
                <i className="ri-radar-line text-3xl text-amber-500 animate-spin" />
              </div>
              <p className="text-sm text-foreground-600 font-body">
                Analyse en cours — ne fermez pas cette fenêtre
              </p>
            </div>
          )}

          {/* Phase Cards */}
          <div className="space-y-3">
            {SYSTEM_SCAN_PHASES.map((scanPhase, idx) => (
              <PhaseCard
                key={scanPhase.phaseId}
                phase={{ ...scanPhase, progress: progressValues[idx] }}
                isActive={currentPhaseIndex === idx}
                isCompleted={phase === 'completed' || progressValues[idx] >= 100}
              />
            ))}
          </div>

          {/* Results Summary */}
          {showResults && (
            <div className="mt-8 space-y-6">
              {/* Score Card */}
              <div className="rounded-2xl border-2 border-background-200 bg-background-50 p-6">
                <h3 className="text-sm font-bold text-foreground-950 font-heading mb-4">RÉSUMÉ DU SCAN</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-xl bg-white border border-background-200">
                    <div className="text-3xl font-bold font-heading mb-1" style={{ color: overallHealthColor }}>
                      {SYSTEM_SCAN_SUMMARY.overallHealthScore}%
                    </div>
                    <span className="text-xs text-foreground-500">Score Santé Global</span>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white border border-background-200">
                    <div className="text-3xl font-bold font-heading mb-1" style={{ color: getHealthColor(SYSTEM_SCAN_SUMMARY.overallBigFourScore) }}>
                      {SYSTEM_SCAN_SUMMARY.overallBigFourScore}%
                    </div>
                    <span className="text-xs text-foreground-500">Score Big Four</span>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white border border-background-200">
                    <div className="text-3xl font-bold font-heading mb-1 text-red-600">{SYSTEM_SCAN_SUMMARY.criticalFindings}</div>
                    <span className="text-xs text-foreground-500">Problèmes Critiques</span>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white border border-background-200">
                    <div className="text-3xl font-bold font-heading mb-1 text-emerald-600">{SYSTEM_SCAN_SUMMARY.autoFixableFindings}</div>
                    <span className="text-xs text-foreground-500">Auto-Fixables</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs text-emerald-700 font-bold">{SYSTEM_SCAN_SUMMARY.systemsHealthy} systèmes sains</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="text-xs text-amber-700 font-bold">{SYSTEM_SCAN_SUMMARY.systemsWarning} en avertissement</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-200">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-xs text-red-700 font-bold">{SYSTEM_SCAN_SUMMARY.systemsCritical} systèmes critiques</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/kos-global-agent-performance"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-flashlight-line" />
                  Corriger TOUT en bloc
                </a>
                <a
                  href="/kos-performance-seo-command"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-foreground-950 hover:bg-foreground-900 text-white text-sm font-bold transition-all cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-speed-up-line" />
                  Plan Correctif Performance
                </a>
                <button
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-background-200 text-foreground-600 hover:text-foreground-900 hover:border-foreground-300 text-sm font-bold transition-all cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-close-line" />
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}